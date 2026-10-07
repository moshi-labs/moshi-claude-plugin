# Builds av.js (the embedded Moshi avatar) from the frontend's .lottie files.
# usage: python3 -I make.py <frontend public/animations dir>
# Needs Pillow. Writes av.js next to this file and prints byte counts.
import json, sys, os, io, base64, gzip, zipfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1]
DISP = 96  # display width in CSS px; rasters keep 2x this
Q = 70     # WebP quality
# One variant per mood: the DarkBG files have no background layer, read
# cleanly on both page themes, and are smaller than the LightBG ones.
MOODS = {
    'delight': ('dark/260308_Moshi_04_Delight_DarkBG_v01.lottie', 196),  # play once, hold the last frame
    'reading': ('dark/260308_Moshi_02B_Idle_Book_DarkBG_v01.lottie', None),  # loop all of it
}
DROP = {'nm', 'mn', 'ix', 'cix', 'np', 'cl', 'ln', 'meta', 'markers', 'props'}
DEF0 = {'ddd', 'ao', 'bm', 'hd', 'hasMask'}  # keys lottie-web reads as falsy defaults


def rnd(v):
    if isinstance(v, float):
        r = round(v, 3 if abs(v) < 2 else 2 if abs(v) < 20 else 1)
        return int(r) if r == int(r) else r
    return v


def clean(o):
    if isinstance(o, dict):
        o = {k: v for k, v in o.items() if k not in DROP and not (k in DEF0 and not v)}
        if 'ef' in o:  # lottie-web ignores Posterize Time (ty 5)
            o['ef'] = [e for e in o['ef'] if e.get('ty') != 5]
            if not o['ef']:
                del o['ef']
        return {k: clean(v) for k, v in o.items()}
    if isinstance(o, list):
        return [clean(x) for x in o]
    return rnd(o)


def smax(l):
    s = l.get('ks', {}).get('s', {})
    k = s.get('k', [100])
    vals = [kf['s'][0] for kf in k if isinstance(kf, dict) and 's' in kf] if s.get('a') else [k[0] if isinstance(k, list) else k]
    return max([abs(v) for v in vals] or [100]) / 100


IMG, stats = {}, {}
blob = {}
for mood, (path, op) in MOODS.items():
    z = zipfile.ZipFile(os.path.join(SRC, path))
    name = [n for n in z.namelist() if n.startswith('animations/')][0]
    raw_json = z.read(name)
    j = json.loads(raw_json)
    raw_total = os.path.getsize(os.path.join(SRC, path))
    if op:
        j['op'] = op
    keep = lambda ls: [l for l in ls if not l.get('hd') and l.get('ip', 0) < min(l.get('op', 1e9), j['op'] if ls is j['layers'] else 1e9)]
    j['layers'] = keep(j['layers'])
    A = {a['id']: a for a in j['assets']}
    for a in j['assets']:
        if 'layers' in a:
            a['layers'] = keep(a['layers'])
    eff = {}

    def visit(ls, f):
        for l in ls:
            r = l.get('refId')
            if r is None:
                continue
            e = f * smax(l)
            eff[r] = max(eff.get(r, 0), e)
            if 'layers' in A[r]:
                visit(A[r]['layers'], e)
    visit(j['layers'], 1)
    j['assets'] = [a for a in j['assets'] if a['id'] in eff]
    img_in = img_out = 0
    for a in j['assets']:
        if 'p' not in a:
            continue
        data = z.read('images/' + a['p'])
        img_in += len(data)
        im = Image.open(io.BytesIO(data)).convert('RGBA')
        tw = max(8, round(a['w'] * eff[a['id']] * DISP / j['w'] * 2))
        if tw < im.width:
            im = im.resize((tw, max(1, round(im.height * tw / im.width))), Image.LANCZOS)
        # Share visually identical rasters across moods (the orb body is reused).
        me = im.resize((24, 24)).tobytes()
        for k, (sig, _) in IMG.items():
            if len(sig) == len(me) and max(abs(x - y) for x, y in zip(sig, me)) < 24:
                key = k
                break
        else:
            b = io.BytesIO()
            im.save(b, 'WEBP', quality=Q, method=6, alpha_quality=80)
            key = 'i%d' % len(IMG)
            IMG[key] = (me, base64.b64encode(b.getvalue()).decode())
            img_out += len(b.getvalue())
        a['p'], a['u'], a['e'] = key, '', 1
    j = clean(j)
    blob[mood] = j
    vec = json.dumps(j, separators=(',', ':'))
    stats[mood] = (raw_total, len(raw_json), img_in, len(vec), img_out)

js = json.dumps(blob, separators=(',', ':')).encode()
gz = base64.b64encode(gzip.compress(js, 9, mtime=0)).decode()
out = 'const AV={i:{%s},z:"%s"};' % (','.join('%s:"%s"' % (k, v[1]) for k, v in IMG.items()), gz)
open(os.path.join(HERE, 'av.js'), 'w').write(out)
for m, (rz, rj, ii, v, io_) in stats.items():
    print(f'{m}: .lottie {rz} B (json {rj} + images {ii}) -> json {v} min, new images {io_} B')
print(f'av.js {len(out)} B (gzip+base64 json {len(gz)}, {len(IMG)} images)')
