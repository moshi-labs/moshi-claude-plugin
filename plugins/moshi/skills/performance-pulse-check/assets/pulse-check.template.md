# the pulse-check report template

The page for the pulse-check report. To render it, copy everything inside the fenced block below, exactly as it is, into a new HTML artifact. Then replace only the `const DATA = {...};` block, as SKILL.md describes. Leave the rest of the page as it is.

````html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Moshi Pulse Check</title>
<style>
:root{--bg:light-dark(oklch(.965 .005 250),oklch(.175 .008 262));--surface:light-dark(oklch(1 0 0),oklch(.23 .003 250));--surface-2:light-dark(oklch(.955 .008 250),oklch(.295 .005 250));--border:light-dark(oklch(.92 .005 250),oklch(.34 .005 250));--border-strong:light-dark(oklch(.85 .008 250),oklch(.42 .005 250));--text:light-dark(oklch(.25 .025 250),oklch(.96 .003 250));--text-2:light-dark(oklch(.48 .02 250),oklch(.74 .005 250));--primary:light-dark(oklch(.42 .24 264),oklch(.58 .22 264));--accent-soft:light-dark(oklch(.96 .04 264),oklch(.28 .08 264));--accent-strong:light-dark(oklch(.36 .27 264),oklch(.78 .2 264));--mint:oklch(.7 .16 155);--mint-soft:light-dark(oklch(.95 .04 155),oklch(.26 .025 155));--mint-strong:light-dark(oklch(.42 .12 155),oklch(.78 .1 155));--rose:oklch(.55 .22 18);--rose-soft:light-dark(oklch(.96 .03 18),oklch(.26 .025 18));--warning:oklch(.78 .15 70);--mb:light-dark(oklch(1 0 0),oklch(.15 .01 285));--m1:light-dark(oklch(.95 .02 220),oklch(.25 .02 220));--m2:light-dark(oklch(.91 .03 330),oklch(.27 .03 330));--m3:light-dark(oklch(.91 .04 230),oklch(.26 .04 230));--m4:light-dark(oklch(.92 .05 285),oklch(.28 .05 285));--m5:light-dark(oklch(.91 .05 340),oklch(.27 .05 340));--m6:light-dark(oklch(.87 .03 290),oklch(.23 .03 290));--r:10px;--r-lg:12px;--r-pill:999px;--shadow:0 1px 2px oklch(0 0 0/.08),0 4px 12px oklch(0 0 0/.04);
--hd:-apple-system,"SF Pro Display","SF Pro Rounded","Geist",sans-serif;--mono:"Geist Mono",ui-monospace,monospace;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark}}
:root[data-theme="dark"]{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 Geist,system-ui,sans-serif}
.mesh{position:fixed;inset:0;z-index:-1;background-color:var(--mb);background-image:radial-gradient(at 40% 20%,var(--m1) 0px,transparent 50%),radial-gradient(at 80% 0%,var(--m2) 0px,transparent 50%),radial-gradient(at 0% 50%,var(--m3) 0px,transparent 50%),radial-gradient(at 80% 50%,var(--m4) 0px,transparent 50%),radial-gradient(at 0% 100%,var(--m5) 0px,transparent 50%),radial-gradient(at 80% 100%,var(--m6) 0px,transparent 50%)}
.wrap{max-width:880px;margin:0 auto;padding:20px 16px 56px;display:grid;gap:16px}
h1,h2,h3{font-family:var(--hd);margin:0;letter-spacing:-.01em;text-wrap:balance}
h1{font-size:clamp(26px,5vw,38px);line-height:1.12;font-weight:700}
h2{font-size:19px;font-weight:650}
h3{font-size:15px;font-weight:600}
p{margin:0}
.num,.bar .v{font-family:var(--mono);font-variant-numeric:tabular-nums} .tv{font-variant-numeric:tabular-nums}
.glass{border-radius:var(--r-lg);padding:20px;display:grid;gap:14px;min-width:0;background:color-mix(in oklab,var(--surface) 48%,transparent);border:1px solid color-mix(in oklab,var(--border-strong) 55%,transparent);box-shadow:inset 0 1px 0 color-mix(in oklab,var(--surface) 95%,transparent),0 1px 2px color-mix(in oklab,var(--text) 5%,transparent),0 6px 28px color-mix(in oklab,var(--text) 7%,transparent),0 20px 64px color-mix(in oklab,var(--accent-strong) 9%,transparent);backdrop-filter:blur(28px) saturate(150%)}
.card{border-radius:var(--r);border:1px solid var(--border-strong);background:var(--surface);box-shadow:var(--shadow)}
.pill{display:inline-flex;align-items:center;gap:4px;border-radius:var(--r-pill);padding:3px 8px;font:500 11px/1.25 Geist,sans-serif;background:var(--surface-2);color:var(--text-2);white-space:nowrap;vertical-align:middle}
.pill.mint{background:var(--mint-soft);color:var(--mint-strong)}.pill.acc{background:var(--accent-soft);color:var(--accent-strong)}.pill.rose{background:var(--rose-soft);color:var(--rose)}
.sub,.ts,.meta,.rn,small,.tl{color:var(--text-2);font-size:13px}
.hd{display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px}
.hd .mn{font:600 15px/1.2 var(--hd)}.hd .pl{display:flex;flex-wrap:wrap;gap:6px;margin-left:auto}
.hero{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;padding:12px 2px 4px}
.hero p{margin-top:10px;max-width:62ch;font-size:16px}
.av{width:96px;height:116px;overflow:hidden}.av div{height:115px}.av.reading div{height:96px;margin-top:24px}.av div{position:relative}.av img{position:absolute;inset:0;width:96px;height:100%}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.tile{padding:12px 14px;display:grid;gap:2px}.tv{font-size:22px;font-weight:500}
.st{display:grid;grid-template-columns:minmax(0,12rem) minmax(0,1fr);gap:4px 20px;align-items:start;padding:2px 0 12px}.st+.st{border-top:1px solid var(--border);padding-top:10px}
.stl{display:flex;flex-wrap:wrap;gap:4px 8px;align-items:center;padding-top:24px}
.now{position:relative;height:28px;font-size:12px}.now span{position:absolute;bottom:9px;left:var(--l);transform:translateX(calc(var(--p) * -1));white-space:nowrap}.now i{position:absolute;bottom:0;left:var(--l);width:1px;height:8px;background:var(--text)}
.sgs,.gl{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2px}
.sg{height:14px;border:1px solid var(--border-strong);border-radius:3px;overflow:hidden}.sg.on{border-color:var(--primary)}
.gl{font-size:11px;line-height:1.3;color:var(--text-2)}.gl div{border-left:1px solid var(--border-strong);padding:4px 0 0 5px;min-width:0;overflow-wrap:anywhere}.gl b{color:var(--text);font-weight:600}.gl .cur{color:var(--text)}.gl .rs{border-left:2px solid var(--primary)}
canvas.dv{display:block;image-rendering:pixelated;max-width:100%}
.cw{min-width:0}
ul.l{margin:0;padding:0;list-style:none;display:grid;gap:10px}
.dot{display:inline-block;width:8px;height:8px;border-radius:2px;background:var(--text-2);margin-right:6px}.dot.moshi{background:var(--primary)}
.bar{display:grid;grid-template-columns:minmax(0,11rem) minmax(0,1fr) 6.5rem;gap:4px 12px;align-items:center;font-size:14px}
.bar .v{text-align:right;white-space:nowrap}
.cmp{display:grid;gap:8px;padding:12px 0;border-top:1px solid var(--border)}
.nh{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.hero p.dek{font:600 19px/1.35 var(--hd)}.hl{color:var(--accent-strong)}
.wb{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.wb>div{border:1px solid var(--border);border-radius:var(--r);padding:10px 12px;background:var(--accent-soft);display:grid;gap:2px;align-content:start}.wb b{font:700 26px/1.2 var(--hd);color:var(--accent-strong)}
.reach{padding:12px 14px;border-radius:var(--r);background:var(--mint-soft);font-size:14px}
.whl{display:grid;gap:6px}.whr{display:grid;grid-template-columns:minmax(0,1fr) 4.5rem 6rem 30px;gap:10px;align-items:center;font-size:13px;min-height:38px;padding:0 6px;border-bottom:1px solid var(--border)}.whr>:nth-child(n+2){text-align:right;justify-self:end}.whr.x{font-size:11px;color:var(--text-2);min-height:0;border:0}.whr.hi{background:var(--accent-soft);border-radius:6px;font-weight:600}
.who{display:flex;align-items:center;gap:8px;min-width:0}.who>span:nth-child(2){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ca{position:relative;flex:none;width:26px;height:26px;border-radius:50%;overflow:hidden;background:var(--accent-soft);color:var(--accent-strong);display:grid;place-items:center;font-size:11px;font-weight:600}.ca img,.adc img{width:100%;object-fit:cover}.ca img{position:absolute;inset:0;height:100%}
.vb{display:inline-grid;place-items:center;flex:none;width:14px;height:14px;border-radius:50%;background:var(--primary);color:#fff;font-size:9px}
.msgb{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;color:var(--primary);background:var(--accent-soft)}.msgb:hover{background:var(--primary);color:#fff}
.adg{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,260px));gap:12px}.adc{padding:12px;display:grid;gap:8px;align-content:start}.adc img{aspect-ratio:4/5;border-radius:8px}
.al{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:10px;font-size:13px;align-items:baseline}.al.me span:first-child{font-weight:600}.al i{grid-column:2/-1;color:var(--text-2)}
.cvr{display:flex;gap:14px;align-items:center}.cvr>b{font:700 34px/1 var(--hd)}.cvr small{display:block}
.cbtn{justify-self:start;padding:10px 16px;border-radius:var(--r-pill);background:var(--primary);color:#fff;font-weight:600;text-decoration:none}
.tw{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--border);vertical-align:top}th{color:var(--text-2);font-weight:500}
.nocv canvas.dv{display:none}
.ban{border-radius:var(--r-lg);padding:14px 16px;background:var(--rose-soft);color:var(--text);border:1px solid var(--rose)}.ban ul{margin:6px 0 0;padding-left:18px;font-size:14px}
.hero p.sub{font-size:13px}.ov{display:grid;gap:10px}
:focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:4px}
@media (max-width:560px){.bar{grid-template-columns:minmax(0,1fr) 6.5rem}.bar .cw{grid-column:1/-1;grid-row:2}.whr{grid-template-columns:minmax(0,1fr) 3.5rem 4.5rem 30px;gap:6px}.hero{grid-template-columns:1fr}.st{grid-template-columns:minmax(0,1fr)}.stl{padding-top:0}.hd .pl{margin-left:0}.glass{padding:16px}}
</style>
</head>
<body>
<div class="mesh"></div>
<main class="wrap" id="app"></main>
<script>
const AV={};AV.s={delight:"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",reading:"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"};
</script>
<script>
const LOGO="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAARVBMVEX////X2+3T1+vMyt7P1ui2yui4yN3V2uylveSHm8abt+KUrdLb4+7p6u+EcY9pUHKol8qwtdZTMlqrn7XLu9vj2OrUvOEMye+YAAAAAXRSTlMAQObYZgAAAcxJREFUOMuN1du2qyAMBVAxgVrvqdL//9STEEBU7NlrtKM8zMZAKTRNJYbT/CGmBUQb4trf33hBhDH4eqZ4prbj97vewKVq0F1nsdKMudPEb720apE7QSzb6bretld7z5N+YTVhAW3X92UnBvGH5tKDPWYJFzNysg64t/UmxiNJ96xT2zVX6FB6cLHwWHNJx8rD0KbCT9RFzPYdSpubmfg1yWBe1oCJ7bs3oYtDTeOURjyA5TODda6TwhxZtyxzRv0OMnaMSTExLiTgwSU0r+gSXs8YlhlOWJYz4oFWMmF+UdDns4UBbvMWsVjGRLSugnOrPCHFtCzbUZg1wa64mNi+eW0CsLCOHABpG1MtakExD3bFzViligEchE/6P9bNpZbC0sFTH/FHl8IyRxLcTs9J3YQVCdvuCfqidWtJ/1n4YL1PnYsm0M1ff36wcZpcOR0HY72uP5aEdzWmE+Ze15d1A87nDE7n7ewvdeVMOw4ZaTFbr9aXh81YHKUvLcaZfI6sguwPqXs67Fp/jayXhi1cjtErzhYs7rc7Ij8c0w+hcdA2txiolN13gPqdVbTy3QVyamXzBeDhK9lV/qChmZYfLvrL8i/XrDEP9/E/o404WUmLPLUAAAAASUVORK5CYII=";
const B=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],DY=864e5,GATES=[4,8,15,31];
const STG=[['Learning','day 1–3'],['Early read','day 4–7'],['First fair read','day 8–14'],['Fatigue watch','day 15–30'],['Full verdict','day 31+']];
const MET=['spend','impressions','linkClicks','ctr','cpc','cpm','conversations','costPerConversation','purchases','purchaseValue','roas','cpa','frequency','ads'],AGE=['age','stage','nextGate','nextGateDate'];
const MON=['spend','cpc','cpm','costPerConversation','purchaseValue','cpa','costPerChat','provenRevenue','closerRevenue'],LOW=['cpc','costPerConversation','cpa'];
const LBL={ctr:'CTR',cpc:'CPC',costPerConversation:'Cost per conversation',cpa:'CPA',roas:'ROAS'};
// Changes that restart Meta's learning, so the stage clock (changes[] is read for these only).
const RK=['significant_edit','budget_major','new_ad','targeting','optimization'];
// get_leads furthestStageName, in words.
const CHS={click_through:'clicked a link',product_view:'product view',cart:'cart',checkout:'checkout',purchase:'bought'};
const PLANE='<svg viewBox="0 0 24 24" width=16 height=16 fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden=true><path d="M22 3 9.2 10.1"/><path d="M22 3 15 21l-5.8-10.9L2 7.5 22 3Z"/></svg>';
// Meta purchase figures always show the attribution window of the ad sets behind them.
const PM=['purchases','purchaseValue','roas','cpa'],NR='Meta’s default for this ad set (not reported)';
const N0=()=>Object.create(null);
let CMPS=[],D,W,REF,AO,CUR='USD',TZ='UTC',ERR=[],CH=[],INK={},T=0,MOV,RUN,SH,ACT=0,VIS=new Set(),BADF,IX={c:N0(),s:N0(),a:N0()},FULL,MC=[],COV=[],PR=null,MA={},CA={},OV={a:new Set,s:new Set,c:new Set};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pd=s=>Date.parse(s+'T00:00:00Z'),ds=n=>new Date(n).toISOString().slice(0,10),dd=(a,b)=>Math.round((pd(a)-pd(b))/DY),addD=(s,n)=>ds(pd(s)+n*DY);
const isD=s=>typeof s=='string'&&/^\d{4}-\d\d-\d\d$/.test(s)&&!isNaN(pd(s))&&ds(pd(s))==s;
// Check 8: a date field must be YYYY-MM-DD. A bad one becomes null; the caller drops the row or entry that holds it.
function dOK(o,k,path,req){const v=o[k];if(v==null&&!req||isD(v))return 1;bad(8,`${path} is not a YYYY-MM-DD date`);o[k]=null;return 0}
// A timestamp's YYYY-MM-DD date in the account timezone, or null.
function lD(t){try{const p={};new Intl.DateTimeFormat('en-US',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(t||NaN)).forEach(x=>p[x.type]=x.value);const s=`${p.year}-${p.month}-${p.day}`;return isD(s)?s:null}catch(e){return null}}
const fD=s=>s?new Date(pd(s)).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'}):'—',wd=o=>fD(o.start)+' – '+fD(o.end);
const fT=s=>{try{return s?new Date(s).toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZone:TZ,timeZoneName:'short'}):'—'}catch(e){return s}};
const ok=v=>v!=null&&isFinite(v);
const fM=v=>{if(!ok(v))return'—';const a=Math.abs(v);if(!CUR)return v.toLocaleString('en-US',{maximumFractionDigits:a>=100?0:2});try{return new Intl.NumberFormat('en-US',{style:'currency',currency:CUR,notation:a>=1e6?'compact':'standard',maximumFractionDigits:a>=1e6?1:a>=100?0:2}).format(v)}catch(e){return v.toFixed(2)+' '+String(CUR).replace(/\W/g,'')}};
const fN=v=>ok(v)?Math.round(v).toLocaleString('en-US'):'—',fP=v=>ok(v)?(v*100).toFixed(2)+'%':'—',s1=n=>n==1?'':'s';
// Follower counts: 861, 3.6k, 168k, 1.2M. Order values drop a .00.
const fK=v=>ok(v)?v.toLocaleString('en-US',{notation:'compact',maximumFractionDigits:v<1e4||v>=1e6?1:0}).replace('K','k'):'—',fO=v=>fM(v).replace(/\.00$/,'');
// Check 14: a link must be https (an image may also be a data:image URI). A bad one is dropped.
const url=(v,path,img)=>v==null||v===''?null:typeof v=='string'&&(/^https:\/\/[^\s"<>]+$/i.test(v)||img&&/^data:image\/[\w+.-]+;base64,[\w+/=]+$/.test(v))?v:bad(14,`${path} is not an https link`);
function fmt(k,v){if(!ok(v))return'—';if(MON.includes(k))return fM(v);if(k=='ctr')return fP(v);if(k=='roas')return v.toFixed(2)+'x';if(k=='frequency')return v.toFixed(2);return fN(v)}
const adsOf=e=>e.daily?[e]:e.ads?e.ads:e.adsets?e.adsets.flatMap(s=>s.ads):[];
const rowsOf=es=>es.flatMap(adsOf).flatMap(a=>a.daily||[]);
const inW=r=>r.date>=W.start&&r.date<=W.end;
// A day's frequency: impressions ÷ that day's reach. A row from before reach replaced frequency keeps its own.
const frq=r=>r.frequency!=null?r.frequency:r.reach>0&&r.impressions!=null?r.impressions/r.reach:null;
function agg(rows,n){const S=k=>rows.reduce((t,r)=>r[k]==null?t:(t||0)+r[k],null);const sp=S('spend'),im=S('impressions'),lc=S('linkClicks'),cv=S('conversations'),pu=S('purchases'),pv=S('purchaseValue');
let fw=0,fi=0;rows.forEach(r=>{const f=frq(r);if(f!=null&&r.impressions){fw+=f*r.impressions;fi+=r.impressions}});
const q=(a,b,m=1)=>a==null||!b?null:a/b*m;
return{spend:sp,impressions:im,linkClicks:lc,conversations:cv,purchases:pu,purchaseValue:pv,ctr:q(lc,im),cpc:q(sp,lc),cpm:q(sp,im,1e3),costPerConversation:q(sp,cv),cpa:q(sp,pu),roas:q(pv,sp),frequency:fi?fw/fi:null,ads:n}}
// Day 1 is the later of the startTime (an ad set's own, else its campaign's) and the entity's first row with impressions (a.r1):
// Moshi publishes ads paused, so delivery can start days after start_time. A first row within a day of the 30-day read's start
// means the read cut the history off, so day 1 stays the startTime. No rows: the startTime, then moshi.firstLaunch for a Moshi entity.
const first=e=>{const c=camp(e),s=e.startTime||c.startTime,r=adsOf(e).map(a=>a.r1).filter(Boolean).sort()[0],x=r&&dd(AO||REF,r);return(r&&!(s&&(r<=s||x>=28&&x<=31))?r:s)||(c.owner=='moshi'&&D.moshi&&D.moshi.firstLaunch)||null};
const camp=e=>e.c||e;
// The latest learning reset after day 1. An ad set: its lastLearningReset, or a significant Meta change on it, its campaign or its ads.
// A campaign: the latest of its ad sets' resets, or a significant Meta change on the campaign.
function resetOf(e){const f=first(e),ids=e.adsets?[e.id]:[e.id,e.c.id,...e.ads.map(a=>a.id)];let r=e.adsets?e.adsets.map(resetOf).filter(Boolean).sort().pop():e.lastLearningReset;
D.changes.forEach(x=>{if(x.source=='meta'&&RK.includes(x.kind)&&ids.includes(x.entityId)&&(!r||x.date>r))r=x.date});return f&&r&&r>f?r:null}
// The clock: d is the last reset, or day 1 (f). Age, stage and gates count to today (asOf), even when the window ends earlier:
// a gate is a date ahead of the reader.
const clk=e=>{const f=first(e);return f?{d:resetOf(e)||f,f}:null};
function stg(s){if(!s||!REF)return null;const age=dd(AO||REF,s.d)+1,g=GATES.find(x=>x>age)??null;return{age,s,i:age<4?0:age<8?1:age<15?2:age<31?3:4,g,gd:g?addD(s.d,g-1):null}}
const stage=e=>stg(clk(e));
function gateTxt(g,c){return g==4?'cost per chat and first carts':g==8?(c.objective=='sales'?'first fair CPA and ROAS read':c.objective=='engagement'?'first fair cost-per-chat read':'first fair cost read'):g==15?'fatigue and frequency read':g==31?'full verdict: scale, iterate or cut':'full verdict window'}
const bad=(code,msg)=>{const s=`Check ${code}: ${msg}`;if(!ERR.includes(s))ERR.push(s);return null};
const ageV=(k,g)=>!g?[k,null]:k=='age'?['s','day '+g.age]:k=='stage'?['s',STG[g.i][0]]:k=='nextGate'?['s',g.g?'day '+g.g:'none']:['s',fD(g.gd)];
// The ad sets behind a campaign, an ad set or an ad.
const setsOf=e=>e.adsets||(e.daily?[e.s]:[e]);
// Check 12: a Meta purchase figure needs the attribution window of the ad sets behind it that have purchases (all of them when
// none has); null prints as Meta's default.
function lab(es){const al=[...new Set(es.flatMap(setsOf))],ps=al.filter(s=>rowsOf([s]).some(r=>r.purchases>0)),ss=ps.length?ps:al,u=ss.find(s=>!('attributionSetting'in s));if(u)throw[12,`ad set ${u.id} has no attributionSetting, so its purchases would show with no window`];return[...new Set(ss.map(s=>s.attributionSetting||NR))].join('; ')}
// Spend in the window for ranking campaigns. An ad that failed check 10 counts each of its dates once (a.d0).
const ev=e=>setsOf(e).some(s=>/engaged/i.test(s.attributionSetting||'')),rw=c=>adsOf(c).flatMap(a=>a.d0||a.daily),spW=c=>agg(rw(c).filter(inW),0).spend||0;
// A merchant campaign, ad set or ad named in a Moshi ad's creativeOverlap.
const ovx=e=>(e.daily?OV.a:e.adsets?OV.c:OV.s).has(e.id);
// Check 13: the headline is about the primary campaign. A campaign tied with it on spend passes.
const hd=(C,t)=>{if(C.owner=='moshi'&&PR&&C!=PR&&spW(C)<spW(PR)-.005)throw[13,`the headline cites ${C.name} (${t}), not the primary campaign ${PR.name}`]};
// Cost per ad chat, on Meta's count: the spend of the Moshi campaigns that started chats ÷ Meta's chats started on them (CA).
// A Moshi campaign that sends shoppers to the site starts no chats, so its spend stays out. When Meta reports no chats on any
// Moshi campaign, and in moshi_only mode, it is Moshi's count: Moshi's spend ÷ chatsFromAds. The tile names the count.
const cpChat=()=>{const m=D.moshi||{},dc=FULL&&MC.find(c=>c.dup);if(dc)throw[10,dc.dup];return FULL&&CA.conversations?(ok(CA.spend)?CA.spend/CA.conversations:null):ok(m.spend)&&ok(m.chatsFromAds)&&m.chatsFromAds?m.spend/m.chatsFromAds:null};
// x: 'h' for the verdict headline, 'b' for its body. Returns [metric, value, attribution window or 0].
function val(p,b,x){if(p=='cmp'){const[i,k]=b.split('.'),c=CMPS[+i];if(!c||!/^\d+$/.test(i)||!['moshi','merchant','note'].includes(k))throw[3,`{cmp:${b}} points to nothing`];if(!c.ok)throw c.err||[2,`{cmp:${b}} cites a failed comparison`];if(x=='h')hd(c.mc,`{cmp:${b}}`);return k=='note'?['s',c.note]:[c.metric,c.v[k=='moshi'?0:1],c.lab&&c.lab[k=='moshi'?0:1]]}
if(p=='m'){const m=D.moshi||{};if(AGE.includes(b)){if(b[0]!='n'){const rs=D.campaigns.filter(c=>c.owner=='moshi'&&resetOf(c));if(rs.length)throw[7,`{m:${b}} ignores the learning reset; cite {c:${rs[0].id}.${b}}`]}const g=b[0]=='n'?mGate():mStage();if(!g&&BADF)throw[8,`{m:${b}} needs a valid moshi.firstLaunch`];return ageV(b,g)}if(b=='firstLaunch'){if(!m[b])throw BADF?[8,`{m:${b}} needs a valid moshi.firstLaunch`]:[9,`{m:${b}} has no value`];return['s',fD(m[b])]}if(b=='costPerChat')return['costPerChat',cpChat()];if(Object.hasOwn(m,b)&&b!='cpa'&&b!='roas')return[b,m[b]];throw[3,`{m:${b}} points to nothing`]}
const i=b.lastIndexOf('.'),id=b.slice(0,i),k=b.slice(i+1);let es;
if((k=='roas'||k=='cpa')&&D.mode=='moshi_only')throw[1,`{${p}:${b}} would show ${k.toUpperCase()} in moshi_only mode`];
if(p=='all'){if(id!='moshi'&&id!='merchant')throw[3,`{all:${b}} points to nothing`];es=D.campaigns.filter(c=>c.owner==id);const pc=es.find(c=>pulled(c)!='all');if(pc)throw[6,`{all:${b}} includes ${pc.name}, which has adsPulled "${pulled(pc)}"`];if(!es.length)throw id=='merchant'?[6,`{all:${b}} has no merchant campaign`]:[3,`{all:${b}} has no Moshi campaign`]}
else{const e=p.length==1&&'csa'.includes(p)&&IX[p][id];if(!e)throw[3,`{${p}:${b}} points to nothing`];es=[e]}
if(!MET.includes(k)&&!(AGE.includes(k)&&'cs'.includes(p)&&p.length==1))throw[3,`{${p}:${b}} uses unknown metric "${k}"`];
if(p.length==1&&'cs'.includes(p)&&part(es[0]))throw[6,`{${p}:${b}} cites ${p=='c'?'a campaign':'an ad set'} with only its top ads pulled`];
if(x&&p=='all'&&es.some(e=>e.owner=='merchant'&&(ovx(e)||e.adsets.some(ovx))))throw[11,`{${p}:${b}} covers your campaigns that run Moshi’s creative`];
if(x&&p!='all'){const e=es[0],C=camp(e);if(x=='h')hd(C,`{${p}:${b}}`);if(!AGE.includes(k)&&C.owner=='merchant'&&ovx(e))throw[11,`{${p}:${b}} cites your ad, ad set or campaign that runs Moshi’s creative`]}
// Age tokens skip check 10: day 1 reads a.r1, which a duplicate row does not change.
if(AGE.includes(k))return ageV(k,stage(es[0]));
const de=es.find(e=>e.dup);if(de)throw[10,de.dup];
return[k,agg(rowsOf(es).filter(inW),es.reduce((n,e)=>n+(e.daily?1:e.adsets?nAds(e):nA(e)),0))[k],PM.includes(k)&&lab(es)]}
// The first Meta purchase figure for each window in a string gets the window after it ("12 purchases (7-day click)").
function tok(str,x){let fail=0,mal=0,o='';const seen=new Set,P=String(str).split(/(\{[a-z]+:[^{}]+\})/);
for(let j=0;j<P.length;j++){const s=P[j];if(!(j&1)){if(/[{}]/.test(s))mal=1;o+=esc(s);continue}const[,p,b]=s.match(/^\{([a-z]+):(.+)\}$/);
try{const[k,v,l]=val(p,b,x);if(k!='s'&&!ok(v))throw[9,`${s} has no value`];o+='<span class=num>'+esc(k=='s'?v:fmt(k,v))+'</span>';
if(l&&!seen.has(l)){seen.add(l);const w=k=='purchases'&&/^ purchases?\b/.exec(P[j+1]||'');if(w){o+=w[0];P[j+1]=P[j+1].slice(w[0].length)}o+=` <small>(${esc(l.replace(' (not reported)',', not reported'))})</small>`}}catch(e){fail=1;bad(e[0]||3,e[1]||String(e))}}
if(mal){bad(3,`"${String(str).slice(0,48)}…" has a malformed token`);return null}return fail?null:o}
// Check 4: a chatter's username or name is shown as typed, so it must not hold an email or a phone number.
const badQ=q=>/[^\s@]+@[^\s@]+\.[a-z]/i.test(q)?'an email':/^\+?[\d\s().-]{7,}$/.test(q.trim())?'a phone number':null;
function cv(fn,h,label){return`<canvas class=dv ${label?`role="img" tabindex=0 aria-label="${esc(label)}"`:'aria-hidden="true"'} data-k="${CH.push(fn)-1}" data-h="${h}" style="height:${h}px"></canvas>`}
function tbl(head,rows){return`<div class=tw><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
const sec=(t,sub,body)=>`<section class=glass><div><h2>${t}</h2>${sub?`<p class=sub>${sub}</p>`:''}</div>${body}</section>`;
const pill=(t,c='')=>`<span class="pill ${c}">${esc(t)}</span>`,oN=o=>o=='engagement'?'Engagement':o=='sales'?'Sales':'Other';
const bud=e=>e.adsets?e.budgetType=='CBO'?e.dailyBudget:(a=>a.length?a.reduce((x,y)=>x+y,0):null)(e.adsets.map(s=>s.dailyBudget).filter(v=>v!=null)):e.dailyBudget??null;
const nA=s=>s.adCount??s.ads.length,nAds=c=>c.adsets.reduce((n,s)=>n+nA(s),0),mStage=()=>D.moshi&&D.moshi.firstLaunch?stg({d:D.moshi.firstLaunch,f:D.moshi.firstLaunch}):null;
// The earliest next gate among the Moshi campaigns the report covers, each on its own reset clock; from firstLaunch when none has a stage.
const mGate=()=>{const ss=COV.map(stage).filter(Boolean);return ss.length?ss.filter(g=>g.g).sort((a,b)=>a.gd<b.gd?-1:1)[0]||ss[0]:mStage()};
// adsPulled: "all", "top" (only some ads) or "none". A campaign without it: "all" for Moshi, "top" with ads, else "none".
// An ad set without it takes its campaign's "all" or "none"; under a "top" campaign, "top" with ads, else "none".
const pulled=e=>e.adsets?(e.adsPulled??(e.owner=='moshi'?'all':adsOf(e).length?'top':'none')):(e.adsPulled??(x=>x!='top'?x:e.ads.length?'top':'none')(pulled(e.c))),part=e=>pulled(e)=='top';
function barFn(f,k,win){return(P,w,h)=>{const L=Math.max(1,Math.round(f*(w-4)));P.r(0,0,w,h,INK.g,.07,0);P.r(0,1,L,h-2,INK[k],.55);P.s(L-1,1,1,h-2,INK[k]);if(win)P.s(L+1,2,2,h-4,INK.m)}}
function barRow(name,v,f,k,extra='',win){return`<div class=bar><div>${name}${win?' '+pill('ahead','mint'):''}</div><div class=cw>${cv(barFn(f,k,win),16,'')}</div><div class=v>${v}${extra}</div></div>`}
// A comparison: a Moshi campaign against a merchant launch (a campaign, or an ad set by merchantAdsetId), each over its own days 1–N.
// running: true compares its CTR over the window with your running campaigns: each campaign of yours with its objective that has
// window totals (adsets[].totals, from T7), its link clicks ÷ impressions, weighted by its spend. Your ad sets that run Moshi's
// creative share its auctions (check 11), so they stay out. Nothing is left out by its name.
function cmpOf(x){const R=x.running,mc=IX.c[x.moshiCampaignId],S=x.merchantAdsetId!=null,yc=R?mc:S?IX.s[x.merchantAdsetId]:IX.c[x.merchantCampaignId],Y=yc&&camp(yc),u=S?'ad set':'campaign',M=String(x.metric).toUpperCase(),e=r=>(bad(2,`comparison ${x.metric} ${R?'running':'day '+x.day}: ${r}`),{ok:0});
if(!mc||!yc)return e(`a ${S?'campaign or ad set':'campaign'} id is not in campaigns`);if(mc.owner!='moshi'||!R&&Y.owner!='merchant')return e('owners do not match the id fields');
let v,L=0,t,yn,note;
if(R){if(x.metric!='ctr')return e('running campaigns compare on CTR only');if(mc.dup)return(bad(10,mc.dup),{ok:0,err:[10,mc.dup]});
const a=agg(rowsOf([mc]).filter(inW),0),C=D.campaigns.filter(c=>c.owner=='merchant'&&c.objective==mc.objective).map(c=>c.adsets.map(s=>s.totals).filter((o,i)=>o&&ok(o.spend)&&ok(o.linkClicks)&&o.impressions>0&&!OV.s.has(c.adsets[i].id))).filter(o=>o.length).map(o=>{const T=k=>o.reduce((n,z)=>n+z[k],0);return[T('spend'),T('linkClicks')/T('impressions')]}),sp=C.reduce((n,c)=>n+c[0],0);
if(!a.impressions)return e(`${mc.name} has no impressions in the window`);if(!sp)return e(`no ${oN(mc.objective)} campaign of yours has link clicks in the window`);
v=[a.ctr,C.reduce((n,c)=>n+c[0]*c[1],0)/sp];t='CTR, '+wd(W);yn=`Your ${C.length} running ${oN(mc.objective)} campaign${s1(C.length)}`;note=`Weighted by each campaign’s spend on these dates: yours ${fM(sp)}, Moshi’s ${fM(a.spend)}.`}else{
// Check 11: your ad set that runs Moshi's creative shares its auctions, so it is shown side by side (Same ads), never head to head.
if(ovx(yc)){const r=`comparison ${x.metric} day ${x.day}: your ${u} ${yc.name} runs Moshi’s creative, so they share auctions`;bad(11,r);return{ok:0,err:[11,r]}}
const dc=mc.dup||yc.dup;if(dc)return(bad(10,dc),{ok:0,err:[10,dc]});
if(mc.objective!=Y.objective)return e(`objectives differ (${mc.objective} vs ${Y.objective})`);if(Y.retargeting||yc.retargeting)return e(`your ${u} is retargeting`);if(pulled(yc)!='all')return e(`your ${u} has adsPulled "${pulled(yc)}"; a comparison needs "all"`);
if(!Object.keys(LBL).includes(x.metric))return e('unknown metric');if(!Number.isInteger(x.day)||x.day<1||x.day>14)return e('day must be a whole number from 1 to 14');
const st=yc.startTime||Y.startTime;if(!st)return e(`your ${u} has no start date, so it may not be a launch`);if(dd(AO||REF,st)>90)return e(`your ${u} started more than 90 days ago`);
if(x.metric=='roas'||x.metric=='cpa'){if(mc.objective!='sales')return e(`${M} needs a Sales campaign`);
const g=clk(mc),ra=g&&dd(REF,g.d)+1;if(!g||ra<8)return e(`Moshi is on day ${g?ra:'—'} since its last reset; ${M} needs day 8`);if(x.day<8)return e(`${M} needs at least 8 days; day is ${x.day}`)}
for(const c of[mc,yc]){const f=first(c),k=f?new Set(rowsOf([c]).filter(r=>r.impressions>0&&r.date>=f&&r.date<addD(f,x.day)).map(r=>r.date)).size:0;if(k<x.day)return e(`${c.name} has rows for only ${k} of the first ${x.day} days`)}
// Moshi's days 1–N end by the window's last day: in a baseline window, N stops before the new ad set.
if(addD(first(mc),x.day-1)>REF)return e(`Moshi’s day ${x.day} is after the window`);
if(PM.includes(x.metric))try{L=[lab([mc]),lab([yc])]}catch(r){bad(...r);return{ok:0,err:r}}
v=[mc,yc].map(c=>{const f=first(c);return agg(rowsOf([c]).filter(r=>r.date>=f&&r.date<addD(f,x.day)),0)[x.metric]});
const bm=bud(mc),by=bud(yc),am=nAds(mc),ay=S?nA(yc):nAds(yc);
let edge=ok(bm)&&ok(by)&&bm!=by?(bm>by?`Moshi had ${(bm/by).toFixed(1)}x your budget here, so weigh this lightly.`:`Your ${u} has ${(by/bm).toFixed(1)}x Moshi’s budget.`):am>ay?'Moshi ran more ads here, so weigh this lightly.':'';
const fb=v=>ok(v)?fM(v)+'/day':'budget not reported';note=`Your ${u}: ${ay} ads, ${fb(by)} · Moshi: ${am} ads, ${fb(bm)}. ${edge}${L&&ev(yc)&&!ev(mc)?' Not the same basis: yours also counts engaged-view purchases.':''}`.trim();
t=`${LBL[x.metric]}, first ${x.day} day${x.day>1?'s':''}`;yn=esc(yc.name)}
const mx=Math.max(...v.filter(ok),1e-9),lo=LOW.includes(x.metric),wi=ok(v[0])&&ok(v[1])&&v[0]!=v[1]?((v[0]<v[1])==lo?0:1):-1;
return{ok:1,mc,metric:x.metric,v,lab:L,note,html:`<div class=cmp><h3>${t}${lo?' <small>lower is better</small>':''}</h3>
${barRow('<span class="dot moshi"></span>'+esc(mc.name),fmt(x.metric,v[0]),ok(v[0])?v[0]/mx:0,'p','',wi==0)}
${barRow('<span class=dot></span>'+yn,fmt(x.metric,v[1]),ok(v[1])?v[1]/mx:0,'g','',wi==1)}
<p class=rn>${esc(note)}${L?`<br>Counted on: Moshi ${esc(L[0])} · yours ${esc(L[1])}`:''}</p></div>`}}
const banner=()=>`<div class=ban role=alert><b>Data check</b>: ${ERR.length} problem${ERR.length>1?'s':''} found. The affected parts are hidden.<ul>${ERR.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>`;
function render(){const app=document.getElementById('app');let done;
try{done=build(app)}catch(e){bad(0,`the report could not render: ${e&&e.message||e}`);app.innerHTML=banner()}window.ERRORS=ERR;if(done)boot()}
function build(app){
try{D=DATA}catch(e){D=null}
if(!D||typeof D!='object'){bad(0,'the DATA block is missing or did not parse');app.innerHTML=banner();return}
if(D.schemaVersion!==1)bad(5,`schemaVersion is ${D.schemaVersion}; this template reads 1`);
D.campaigns=D.campaigns||[];W=D.window||{};CUR=(D.merchant||{}).currency||null;TZ=(D.merchant||{}).timezone||'UTC';
if(!dOK(W,'start','window.start',1)+!dOK(W,'end','window.end',1))W.start=W.end=null;REF=W.end;
AO=lD(D.asOf);
// Moshi's own counts and the chatters cover moshiWindow (get_ad_performance's window), labelled when it differs from the report window.
const MW=D.moshiWindow&&dOK(D.moshiWindow,'start','moshiWindow.start',1)&dOK(D.moshiWindow,'end','moshiWindow.end',1)?D.moshiWindow:W,ml=wd(MW)!=wd(W)?wd(MW):'';
if(D.moshi&&!dOK(D.moshi,'firstLaunch','moshi.firstLaunch'))BADF=1;
D.changes=(D.changes||[]).filter((x,i)=>dOK(x,'date',`changes[${i}].date`,1));
const full=FULL=D.mode!='moshi_only',m=D.moshi||{},h=[];
D.campaigns.forEach((c,i)=>{IX.c[c.id]=c;dOK(c,'startTime',`campaigns[${i}].startTime`);(c.adsets=c.adsets||[]).forEach((s,j)=>{s.c=c;IX.s[s.id]=s;['startTime','lastLearningReset'].forEach(k=>dOK(s,k,`campaigns[${i}].adsets[${j}].${k}`));
(s.ads=s.ads||[]).forEach((a,k)=>{a.c=c;a.s=s;IX.a[a.id]=a;a.daily=(a.daily||[]).filter((r,n)=>dOK(r,'date',`campaigns[${i}].adsets[${j}].ads[${k}].daily[${n}].date`,1));
a.r1=a.daily.filter(r=>r.impressions>0).map(r=>r.date).sort()[0];
// Check 10: one row per ad per date. An ad with two rows for a date loses its rows. The ad, its ad set and its campaign get
// a dup flag here; tokens, tiles, the stage tracker, the fatigue chart and comparisons read only these flags.
const dts=a.daily.map(r=>r.date),dupI=dts.findIndex((d,i)=>dts.indexOf(d)!=i);if(dupI>=0){a.dup=s.dup=c.dup=`ad ${a.id} has two rows for ${dts[dupI]}`;bad(10,a.dup);a.d0=a.daily.filter((r,i)=>dts.indexOf(r.date)==i);a.daily=[]}})})});
MC=D.campaigns.filter(c=>c.owner=='moshi');const YC=D.campaigns.filter(c=>c.owner=='merchant');
const recent=REF&&dd(AO||REF,REF)<=7,dM=MC.some(c=>c.dup),CC=MC.filter(c=>{const r=rowsOf([c]).filter(r=>inW(r)&&r.impressions>0);return r.length&&2*r.filter(x=>x.conversations>0).length>=r.length});MA=dM?{}:agg(rowsOf(MC).filter(inW),0);CA=dM?{}:agg(rowsOf(CC).filter(inW),0);
// The primary campaign: the Moshi campaign with the largest spend in the window (the first listed on a tie). A campaign with 25%+
// of Moshi's spend that delivered in the last 7 days shows beside it. Every other Moshi campaign gets one footnote line.
const lastD=c=>rw(c).filter(r=>r.impressions>0).map(r=>r.date).sort().pop(),tot=MC.reduce((t,c)=>t+spW(c),0);
PR=MC.reduce((p,c)=>spW(c)>(p?spW(p)+.005:0)?c:p,null);COV=PR?MC.filter(c=>c==PR||spW(c)/tot>=.25&&(l=>l&&dd(REF,l)<7)(lastD(c))):MC;
// Check 16: window.before names the Moshi ad set whose launch ends the window: a Moshi ad set in its first 7 days, the newest one
// that delivered, with Moshi delivering in the 7 days before it, and the window those 7 days. moshiWindow must date Moshi's own
// counts, which its tools cannot cut to a past week. A failure drops the line.
const WB=W.before!=null&&IX.s[W.before],WL=WB&&WB.c.owner=='moshi'&&first(WB),NW=WL&&MC.flatMap(c=>c.adsets).find(s=>first(s)>WL);let wbl='';
if(W.before!=null){const e=!WL?'names no Moshi ad set':dd(AO||REF,WL)>6?`names ${WB.name}, past its first 7 days`:W.start!=addD(WL,-7)||W.end!=addD(WL,-1)?`needs the window ${fD(addD(WL,-7))} – ${fD(addD(WL,-1))}`:NW?`names ${WB.name}, but ${NW.name} launched later`:!PR?`names ${WB.name}, but no Moshi ad ran before`:MW==W&&'needs a valid moshiWindow';
if(e)bad(16,'window.before '+e);else wbl=`<p class=sub>The 7 days before Moshi launched <b>${esc(WB.name)}</b> on ${fD(WL)}: how things ran before that change.</p>`}
let VH=0;if(full&&PR){const i=D.primaryCampaignId,pc=i!=null&&IX.c[i];if(!(pc&&pc.owner=='moshi'&&spW(pc)>=spW(PR)-.005)){bad(13,i==null?`primaryCampaignId is missing; the primary campaign is ${PR.name}`:`primaryCampaignId ${i} is not the largest-spend Moshi campaign, ${PR.name}`);VH=1}}
// Overlap: a Moshi ad and your ads that share its creative (creativeOverlap), on the days both delivered in the window.
MC.forEach(c=>adsOf(c).forEach(a=>(a.creativeOverlap||[]).forEach(o=>{OV.a.add(o.adId);OV.s.add(o.adsetId);OV.c.add(o.campaignId)})));
const OR=[];if(full)COV.forEach(c=>adsOf(c).forEach(a=>{const ol=a.creativeOverlap||[];if(!ol.length)return;
const os=[...new Set(ol.map(o=>o.adId))].map(i=>IX.a[i]).filter(o=>o&&o.c.owner=='merchant'),md={},yd={};if(a.dup||os.some(o=>o.dup))return;a.daily.forEach(r=>{if(inW(r)&&r.impressions>0)md[r.date]=r.impressions});
os.forEach(o=>o.daily.forEach(r=>{if(md[r.date]&&inW(r)&&r.impressions>0)yd[r.date]=(yd[r.date]||0)+r.impressions}));
const S=Object.keys(yd);OR.push({a,n:S.length,mi:S.reduce((t,d)=>t+md[d],0),yi:S.reduce((t,d)=>t+yd[d],0)})}));
CMPS=full?(D.comparisons||[]).map(cmpOf):[];
// 1 header
h.push(`<header class=hd><img src="${LOGO}" alt="Moshi" width=28 height=28><div><div class=mn>${esc((D.merchant||{}).name)}</div><div class=meta>Moshi pulse check${(D.merchant||{}).timezone?'':' · dates in UTC, no timezone reported'}${CUR?'':' · no currency reported'}</div></div><div class=pl>${pill('As of '+fT(D.asOf))}${pill(wd(W)+(W.partial?', so far':''),'acc')}${full?pill('Meta read '+fT(D.metaSyncedAt)):''}</div></header>${wbl}`);
if(!full)h.push(`<p class=sub>Moshi data only. Connect your Meta ad account in Moshi for comparisons and account checks.</p>`);
// 2 issues, first: the overlap callout, then accountIssues
const sh=o=>o.mi/(o.mi+o.yi),ovs=OR.filter(o=>o.n).sort((x,y)=>sh(x)-sh(y)),pc=v=>v>0&&v<.01?'<1%':v<1&&v>.99?'>99%':Math.round(v*100)+'%',ai=full?D.accountIssues||[]:[];
let iss=ovs.length?`<div class=ov><div class=nh>${pill('Worth fixing','rose')}<h3>Moshi’s ads reuse creatives from your live ads</h3></div>
<p>Meta won’t show one person two ads from the same advertiser in one auction. When ad sets aim at similar people, it enters the one with the best performance history and holds the others back (Meta’s overlapping-audiences rule). On the days both ran, impressions split like this:</p>
${tbl(['Creative','Days both ran','Moshi impressions','Your copies’ impressions','Moshi’s share'],ovs.map(o=>[esc(o.a.angle||o.a.name),o.n,fN(o.mi),fN(o.yi),`<b>${pc(sh(o))}</b>`]))}
<p><b>This is not a fair Moshi-vs-merchant test.</b> To make it one, run it as a Meta A/B test (Experiments in Ads Manager), pause or exclude your overlapping ad while Moshi’s runs, or aim Moshi at a different audience. A re-uploaded or different creative alone isn’t enough.</p>
<p class=sub>Matched by copy history, image or video. Recropped or edited copies may not be detected.</p></div>`:'';
if(ai.length)iss+=`<ul class=l>${ai.map(i=>`<li>${pill(i.severity=='warn'?'Worth fixing':'Note',i.severity=='warn'?'rose':'')} ${esc(i.text)}</li>`).join('')}</ul>`;
if(iss)h.push(sec('Things in your account affecting results',null,iss));
// 3 verdict, about the primary campaign: the title (else the headline) as the h1, the headline under it; the other Moshi campaigns in one footnote line
const V=D.verdict||{},vt=VH||!V.title?null:tok(V.title,'h'),vh=VH?null:tok(V.headline||'','h'),vb=VH?null:tok(V.body||'','b'),h1=vt??vh;
const mood=D.mood=='delight'?'delight':'reading',ft=full&&PR?MC.filter(c=>!COV.includes(c)&&spW(c)>0).map(c=>{const l=lastD(c);return`Also ran: ${esc(c.name)}, ${fM(spW(c))}, ${dd(AO||REF,l)<2?'still delivering':'stopped on '+fD(l)}.`}).join(' '):'';
h.push(`<section class=hero><div class="av ${mood}" aria-hidden=true><div><img src="data:image/webp;base64,${AV.s[mood]}" alt></div></div><div>${h1!=null?`<h1>${h1}</h1>`:''}${vt!=null&&vh!=null?`<p class=dek>${vh}</p>`:''}${vb!=null?`<p>${vb}</p>`:''}${ft?`<p class=sub>${ft}</p>`:''}</div></section>`);
// 4 What messaging ads tell you: the people who messaged in the window (chatters.people), one row each, from Moshi's own
// profile copies. The tiles count them; the lists show every buyer (orderValue > 0) and the largest 1k+ accounts that did not buy.
const CHT=D.chatters||{},PE=(CHT.people||[]).filter((p,i)=>{if(!p||typeof p!='object')return 0;const q=[p.username,p.name].map(x=>badQ(String(x??''))).find(Boolean);
if(q)return bad(4,`chatters.people[${i}] holds ${q}; the row is hidden`),0;p.pic=url(p.profilePic,`chatters.people[${i}].profilePic`,1);p.link=url(p.threadUrl,`chatters.people[${i}].threadUrl`);p.ms=p.channel=='messenger';['followers','orderValue'].forEach(k=>p[k]=ok(p[k])?+p[k]:null);return 1});
if(PE.length){const n=PE.length,TT=ok(CHT.total)&&CHT.total>n?CHT.total:n;if(ok(CHT.total)&&CHT.total<n)bad(15,`chatters.total is ${CHT.total}, but ${n} people are listed`);
const ig=PE.filter(p=>!p.ms),big=PE.filter(p=>p.followers>=1e3),fo=ig.filter(p=>typeof p.followsYou=='boolean'),buy=PE.filter(p=>p.orderValue>0),bb=buy.filter(p=>p.followers>=1e3),nb=big.filter(p=>!(p.orderValue>0));
const sum=a=>a.reduce((t,p)=>t+p.followers,0),fs=a=>a.sort((x,y)=>(y.followers??-1)-(x.followers??-1)),wt=(b,s)=>`<div><b>${b}</b><small>${s}</small></div>`;
// A Messenger row shows the first name and last initial; an Instagram row the @username.
const lbl=p=>p.ms?(w=>w[0]+(w[1]?' '+w[1][0]+'.':''))(String(p.name||p.username||'?').trim().split(/\s+/))+' (Messenger)':'@'+(p.username||p.name||'?');
const hdr=t=>`<div class="whr x"><span></span><span>Followers</span><span>${t}</span><span></span></div>`;
const row=(p,v,hi)=>{const l=lbl(p);return`<div class="whr${hi?' hi':''}"><span class=who><span class=ca>${esc(l.replace('@','')[0].toUpperCase())}${p.pic?`<img src="${esc(p.pic)}" alt loading=lazy>`:''}</span><span>${esc(l)}</span>${p.verified?'<span class=vb title="Verified">✓</span>':''}</span><span class=num>${fK(p.followers)}</span>${v}${p.link?`<a class=msgb href="${esc(p.link)}" target=_blank rel=noopener aria-label="Open your conversation with ${esc(l)}">${PLANE}</a>`:'<span></span>'}</div>`};
const L1=buy.length?`<div class=whl><h3>Who bought ${pill(fN(buy.length),'acc')}</h3>${bb.length?`<p class=sub>Highlighted: <b>${fN(bb.length)} with 1k+ followers</b>, ${fO(bb.reduce((t,p)=>t+p.orderValue,0))} of orders.</p>`:''}${hdr('Order')}${fs(buy).map(p=>row(p,`<span class=num>${fO(p.orderValue)}</span>`,p.followers>=1e3)).join('')}</div>`:'';
const L2=nb.length?`<div class=whl><h3>Big accounts that haven’t bought yet</h3><p class=sub><b>${fN(nb.length)} with 1k+ followers</b> messaged and didn’t buy, ${fK(sum(nb))} followers combined.${nb.length>8?' The biggest 8:':''}</p>${hdr('Got as far as')}${fs(nb).slice(0,8).map(p=>row(p,`<span>${CHS[p.stage]||'messaged'}</span>`)).join('')}</div>`:'';
h.push(sec('What messaging ads tell you','Things you only learn because a shopper messaged instead of clicking through.',`<p style="max-width:64ch">A click to your website is anonymous. A message isn’t: every shopper who DMs arrives with a real profile, so you learn who they are, how big their audience is, and whether they already knew you.</p>
<div class=wb>${wt(fN(TT),`people messaged${ig.length<n?` (${fN(ig.length)} on Instagram)`:''}`)}${wt(fN(big.length),`${big.length==1?'has':'have'} 1,000+ followers${big.length?`, ${fK(sum(big))} combined`:''}`)}${fo.length?wt(Math.round(fo.filter(p=>!p.followsYou).length/fo.length*100)+'%',`didn’t follow ${esc((D.merchant||{}).name||'you')} yet`):''}${ig.length?(v=>wt(fN(v),'verified account'+s1(v)))(PE.filter(p=>p.verified).length):''}${ok(m.contactsCaptured)?wt(fN(m.contactsCaptured),`emails and phones shared${ok(m.contactsEmail)&&ok(m.contactsPhone)?` (${fN(m.contactsEmail)} email${s1(m.contactsEmail)}, ${fN(m.contactsPhone)} phone${s1(m.contactsPhone)})`:''}`):''}</div>
${TT>n?`<p class=sub>Counts cover ${fN(n)} of the ${fN(TT)} people who messaged.</p>`:''}${L1||L2?`<div class=reach><b>You can message these people yourself.</b> Every one of them already messaged you, so the thread is already in your inbox${PE.some(p=>p.link)?': tap the <b>paper-plane</b> on a row to open it':''}. A personal note or a gifted product to a 10k+ account costs little and can turn a shopper into a creator. Moshi’s chat history shows what each person asked about, so you know where to start.</div>`:''}${L1}${L2}
<p class=sub>${wd(MW)}. Follower counts are from Instagram${PE.some(p=>p.ms)?'; Messenger doesn’t share them':''}.</p>`))}
// 5 comparisons: your launches on their own first days, your running campaigns on the window's dates
if(full)h.push(sec('Moshi against your own ads',`Same objective. A launch on its first days, retargeting left out; your running campaigns on the same dates.${OV.s.size?' Your ad sets that run Moshi’s creatives are left out.':''}`,(cs=>cs.length?cs.join(''):'<p class=sub>None of your launches match Moshi’s objective and age yet.</p>')(CMPS.filter(x=>x.ok).map(x=>x.html))));
// 6 stage tracker
const st=full?COV.map(c=>[c.name,stage(c),c]).filter(x=>x[1]):D.moshi&&D.moshi.firstLaunch&&mStage()?[['Moshi ads',mStage(),{objective:null,adsets:[]}]]:[];
if(!st.length)h.push(sec('Where each campaign stands',null,`<p class=sub>${full?'No Moshi campaign delivered in this window.':'The stage needs the date of the first Moshi launch.'}</p>`));
else{const SB=[1,...GATES,61],pos=a=>{const i=a<4?0:a<8?1:a<15?2:a<31?3:4;return i+Math.min(1,(a-SB[i]+.5)/(SB[i+1]-SB[i]))};
const seg=(t,j)=>(P,w,h)=>{const f=Math.max(0,Math.min(1,t-j)),L=Math.round(f*w);if(L){P.r(0,0,L,h,INK.p,.7,0);if(f<1)P.s(L-1,0,1,h,INK.p)}};
const track=([n,g,c])=>{const t=pos(g.age),j=Math.floor(t),a=t/5,rs=g.s.f!=g.s.d,vf=c.adsets.filter(s=>!s.dup).map(s=>[s,rowsOf([s]).filter(r=>dd(AO||REF,r.date)<7).reduce((t,r)=>t+((c.objective=='engagement'?r.conversations:r.purchases)||0),0)]).filter(z=>z[1]<50);return`<div class=st><div class=stl><b>${esc(n)}</b>${c.objective?pill(oN(c.objective)):''}</div><div>
<div class=now style="--l:calc((100% - 8px) * ${a.toFixed(4)} + ${2*Math.min(j,4)}px);--p:${(a*100).toFixed(1)}%"><span>Today · day ${g.age}</span><i></i></div>
<div class=sgs>${STG.map((_,k)=>`<div class="sg${k<=j?' on':''}">${k<=j?cv(seg(t,k),12,''):''}</div>`).join('')}</div>
<div class=gl>${STG.map(([nm],k)=>{const d=(k?'':rs?'reset ':'')+fD(k?addD(g.s.d,SB[k]-1):g.s.d).replace(' ','&nbsp;');return`<div${!k&&rs?' class=rs':''}>${SB[k]==g.g?`<b>${d}</b>`:d}<br><span${k==g.i?' class=cur':''}>${nm}</span></div>`}).join('')}</div>
<p class=sub>${rs?`Clock restarted ${fD(g.s.d)} after a learning reset. `:''}${g.g?`Next gate: day ${g.g} on <b>${fD(g.gd)}</b>, ${gateTxt(g.g,c)}.`:'Full verdict window.'}${vf.length&&c.objective!='other'?` ${esc(vf[0][0].name)}: ${vf[0][1]} of ~50 ${c.objective=='engagement'?'conversations':'purchases'} in 7 days, so cost reads stay directional.`:''}</p></div></div>`};
h.push(sec('Where each campaign stands','Days since launch. Each stage allows the next fair read.',st.map(track).join('')))}
// 7 tiles. A Moshi ad with duplicate rows hides the Meta numbers.
const SA=dM?{}:agg(rowsOf(MC.filter(c=>c.objective=='sales')).filter(inW),0);let cpc=null,attr='';try{cpc=cpChat()}catch(e){}
const tile=(l,v,s)=>`<div class="card tile"><div class=tl>${l}</div><div class=tv>${v}</div>${s?`<div class=ts>${s}</div>`:''}</div>`;
// The window's ROAS is too early to judge when no Sales campaign had reached day 8 by the window's last day.
const SG=MC.filter(c=>c.objective=='sales').map(stage),early=SG.length&&SG.every(g=>!g||addD(g.s.d,7)>REF),r8=SG.filter(Boolean).map(g=>addD(g.s.d,7)).sort()[0];
// The window of Meta's purchases in the funnel: the Moshi ad sets that delivered in the window (lab keeps those with purchases).
if(full&&!dM)try{attr=lab(MC.flatMap(c=>c.adsets).filter(s=>rowsOf([s]).some(inW)))}catch(e){bad(...e);attr=null}
h.push(`<div class=tiles>${tile('Spend',fM(full?MA.spend:m.spend),full?'Moshi campaigns, Meta':'Moshi-managed')}${full?tile('CTR',fP(MA.ctr),'link clicks ÷ impressions'):''}${tile('Cost per ad chat',fM(cpc),full&&CA.conversations?`Meta’s count: ${fN(CA.conversations)} chats started${CC.length<MC.length?', on the campaigns that start chats':''}`:'Moshi’s count of chats from ads'+(ml&&', '+ml))}${tile('Chats',fN(m.chats),[ok(m.chatsFromAds)&&fN(m.chatsFromAds)+' from ads',ml].filter(Boolean).join(', '))}${tile('Contacts captured',fN(m.contactsCaptured),'emails and phones'+(ml&&', '+ml))}</div>`);
// Use the report window, including when the campaign has no chat funnel.
if(full){
const rows=[];
for(const c of MC){
 if(c.dup||pulled(c)!='all')continue;
 const metrics=agg(rowsOf([c]).filter(inW),0);
 if(!(metrics.purchases>0))continue;
 const sets=c.adsets.filter(s=>rowsOf([s]).some(r=>inW(r)&&r.purchases>0));
 const unique=values=>[...new Set(values)].join('; ');
 const goals=unique(sets.map(s=>s.optimizationGoal?String(s.optimizationGoal).toLowerCase().replaceAll('_',' '):'goal not reported'));
 let windowLabel;
 try{windowLabel=lab(sets)}catch(error){bad(...error);continue}
 const g=stage(c),early=!g||addD(g.s.d,7)>REF;
 const judgment=[c.objective=='engagement'?'judged on cost per conversation':c.objective!='sales'?'no CPA or ROAS verdict':early?'':'Sales campaign',early?'too early to judge':''].filter(Boolean).join(' · ');
 rows.push(tile(esc(c.name),fN(metrics.purchases)+' purchases',esc(goals)+' · '+esc(windowLabel)+' · '+judgment+' · '+fM(metrics.cpa)+' CPA · '+fmt('roas',metrics.roas)+' ROAS'));
}
if(rows.length)h.push(sec('Meta pixel purchases',wd(W),rows.join('')));
}
// 8 Same ads: each Moshi ad (primary campaign, and any shown beside it) with the ad of yours it was cloned from (clonedFrom), over
// the window. One card per original; Moshi's copies of it add up (a copy that failed check 10 hides its card). Cards where Moshi's
// CTR is the higher come first, then by Moshi's CTR.
// An original with no rows in the window did not run then (T6 reads every original; DATA drops clonedFrom when T6 could not).
const SM=new Map;if(full)COV.forEach(c=>adsOf(c).forEach(a=>{const f=a.clonedFrom,o=f&&IX.a[f.adId];if(!f||o&&(o.dup||o.c.owner!='merchant'))return;
const g=SM.get(f.adId)||{a,o,r:[]};g.d|=!!a.dup;g.r.push(...a.daily.filter(inW));SM.set(f.adId,g)}));
const cd=[...SM.values()].map(g=>({...g,m:agg(g.r,0),y:agg(g.o?g.o.daily.filter(inW):[],0)})).filter(g=>!g.d&&g.m.impressions>0).map(g=>({...g,w:ok(g.y.ctr)&&g.m.ctr>g.y.ctr})).sort((x,y)=>y.w-x.w||(y.m.ctr||0)-(x.m.ctr||0));
const al=(l,v,me)=>`<div class="al${me?' me':''}"><span>${l}</span>${v.impressions>0?`<span class=num>${fM(v.spend)}</span><span class=num>${fP(v.ctr)} CTR</span>`:'<i>didn’t run these days</i>'}</div>`;
if(cd.length)h.push(sec('Same ads: Moshi’s copy vs your original',`Spend and click-through rate, ${wd(W)}. Each pair runs one creative and can share auctions, so read them side by side.`,`<div class=adg>${cd.map(g=>{const t=[g.a,g.o].map(x=>x&&url(x.thumbnailUrl,`ad ${x.id} thumbnailUrl`,1)).find(Boolean);
return`<div class="card adc">${t?`<img src="${esc(t)}" alt loading=lazy>`:''}<h3>${esc(g.a.angle||g.a.name)}</h3>${al('Moshi’s copy',g.m,1)}${al('Your original',g.y)}</div>`}).join('')}</div>`));
// 9 From conversation to purchase: Moshi's funnel over the window with Meta's purchases on Moshi's campaigns beside it (two sources,
// never added). Then, from each campaign's Meta totals over metaWindow (metaSpend, metaPurchases, metaPurchaseValue, on every
// campaign or the part is left out): chat order size against your other campaigns (day 8+), and Moshi's share of your spend.
if(ok(m.chats)&&m.chats>0){const fq=v=>Math.min(1,v/m.chats),mb=full&&attr!=null&&!dM&&ok(MA.purchases),cr=CA.linkClicks>0?CA.conversations/CA.linkClicks:null;
const sm=(cs,k)=>cs.reduce((t,c)=>t+c[k],0),hv=k=>D.campaigns.every(c=>ok(c[k])),g8=PR&&(g=>g&&g.age>=8)(stage(PR)),mwd=wd(D.metaWindow||{});
const oP=hv('metaPurchases')&&hv('metaPurchaseValue')?sm(YC,'metaPurchases'):0,oA=oP>0?sm(YC,'metaPurchaseValue')/oP:null,cA=m.provenOrders>0&&ok(m.provenRevenue)?m.provenRevenue/m.provenOrders:null,mx=Math.max(cA,oA);
const Ms=sm(MC,'metaSpend'),Os=sm(YC,'metaSpend'),sp=Ms/(Ms+Os),mR=MC.every(c=>c.objective=='sales')&&g8&&hv('metaPurchaseValue')?sm(MC,'metaPurchaseValue')/Ms:null,oR=hv('metaPurchaseValue')?sm(YC,'metaPurchaseValue')/Os:null;
h.push(sec('From conversation to purchase','Moshi’s chat funnel, with Meta’s purchase count beside it.',`${cr!=null?`<div class=cvr><b>${Math.round(cr*100)}%</b><div><h3>Conversation rate</h3><small>Link clicks on Moshi’s chat ads that started a conversation: ${fN(CA.conversations)} of ${fN(CA.linkClicks)}, Meta’s count</small></div></div>`:''}
<div style="display:grid;gap:8px">${[['Had a conversation',m.chats],['Viewed a product',m.productViews],['Reached cart',m.carts],['Reached checkout',m.checkouts]].filter(r=>ok(r[1])).map(([l,v])=>barRow(l,fN(v),fq(v),'p',` <small>${Math.round(v/m.chats*100)}%</small>`)).join('')}${ok(m.provenOrders)?barRow('Moshi-proven orders',fN(m.provenOrders),fq(m.provenOrders),'p',` <small>${fM(m.provenRevenue)}</small>`):''}${mb?barRow('Meta-credited purchases',fN(MA.purchases),fq(MA.purchases),'a',` <small>${fM(MA.purchaseValue)}</small>`):''}</div>
<p class=sub>Moshi’s own count, ${wd(MW)}. Two sources, never added: Moshi-proven orders are matched to a chat thread, so they’re a floor${m.closerRecoveries>0?`; Closer recoveries: ${fN(m.closerRecoveries)}, ${fM(m.closerRevenue)}`:''}.${mb?` Meta’s count${ml&&', '+wd(W)+','} is its pixel estimate for Moshi’s campaigns${attr?` (${esc(attr)})`:''}${MC.some(c=>c.objective=='sales')?`, ${fmt('roas',SA.roas)} ROAS on the Sales campaigns${early?`, too early to judge${r8>AO?', first read '+fD(r8):''}`:''}`:''}.${recent?' Meta may still add purchases to recent days.':''}`:''}</p>
${ok(m.delayedOrders)?`<p class=sub><b class=num>${fN(m.delayedOrders)}</b> proven orders came 1+ days after the chat.</p>`:''}
${full&&g8&&oA&&cA?(d=>`<div class=cmp><h3>Chat orders are <span class=hl>${d?Math.abs(d)+'% '+(d>0?'bigger':'smaller'):'about the same size'}</span></h3>${barRow(`<span class=hl>Moshi chat orders</span> <small>· ${fN(m.provenOrders)} order${s1(m.provenOrders)}</small>`,fM(cA),cA/mx,'p')}${barRow(`Your other ads <small>· ${fN(oP)} order${s1(oP)}</small>`,fM(oA),oA/mx,'g')}<p class=sub>Average order value. Moshi: orders matched to a chat, ${wd(MW)}. Your other ads: Meta-credited purchases on your campaigns, ${mwd}, each ad set’s own attribution window.</p></div>`)(Math.round((cA/oA-1)*100)):''}
${full&&hv('metaSpend')&&Ms>0&&Os>0?`<div class=cmp><h3>Moshi is <span class=hl>${sp<.001?'&lt;0.1':sp<.1?(sp*100).toFixed(1):Math.round(sp*100)}%</span> of your ad spend</h3>${barRow('<span class=hl>Moshi</span>'+(mR!=null?` <small>· ${fmt('roas',mR)} ROAS</small>`:''),fM(Ms),sp,'p')}${barRow('Your other campaigns'+(oR!=null?` <small>· ${fmt('roas',oR)} ROAS</small>`:''),fM(Os),1-sp,'g')}<p class=sub>${mwd}, Meta’s numbers.${oR!=null?' ROAS is Meta-credited purchase value ÷ spend, each ad set’s own attribution window.':''}</p></div>`:''}`))}
// 10 Respond to your Closers: the org's Closer page, {dashboardUrl}/closer.
const cu=url(D.dashboardUrl,'dashboardUrl');
if(cu)h.push(sec('Respond to your Closers',null,`<p style="max-width:62ch">Some shoppers reach a cart in chat and then go quiet. Moshi drafts a personal follow-up for each one, called a Closer, to bring them back to checkout. Take a quick look, edit anything that doesn’t sound like you, and send.</p><a class=cbtn href="${esc(cu.replace(/\/+$/,''))}/closer" target=_blank rel=noopener>Review your Closers →</a>`));
if(ERR.length)h.unshift(banner());
app.innerHTML=h.join('\n');return 1}
function inks(){const p=document.createElement('canvas').getContext('2d'),q=document.body.appendChild(document.createElement('i'));['p:primary','g:text-2','m:mint','a:accent-strong'].forEach(z=>{const[k,n]=z.split(':');p.clearRect(0,0,1,1);q.style.color=`var(--${n})`;p.fillStyle='#888';p.fillStyle=getComputedStyle(q).color;p.fillRect(0,0,1,1);INK[k]=[...p.getImageData(0,0,1,1).data]});q.remove()}
function paint(c){if(!c._x||!c.width)return;const w=c.width,h=c.height,im=c._x.createImageData(w,h),d=im.data;
const px=(X,Y,k)=>{if(X<0||Y<0||X>=w||Y>=h)return;const i=(Y*w+X)*4;d[i]=k[0];d[i+1]=k[1];d[i+2]=k[2];d[i+3]=255};
const P={r(x,y,ww,hh,k,v,s=1){const x0=Math.round(x),y0=Math.round(y),x1=Math.round(x+ww),y1=Math.round(y+hh);for(let Y=y0;Y<y1;Y++)for(let X=x0;X<x1;X++){const t=v+(s&&SH?.06*Math.sin(T+X*.3-Y*.5):0);if(t*16>B[(Y&3)*4+(X&3)])px(X,Y,k)}},s(x,y,ww,hh,k){this.r(x,y,ww,hh,k,2,0)}};
c._f(P,w,h);c._x.putImageData(im,0,0)}
const all=()=>document.querySelectorAll('canvas.dv');
function size(){all().forEach(c=>{const w=Math.floor(c.parentElement.clientWidth/2),hh=Math.floor(c.dataset.h/2);if(c.width!=w||c.height!=hh){c.width=w;c.height=hh;c.style.width=w*2+'px';c.style.height=hh*2+'px'}paint(c)})}
// Canvases draw static once. The shimmer runs at 8 fps only on canvases in the viewport, while the tab is visible,
// motion is allowed, and the pointer moved in the last 10 s. When it stops, the visible canvases repaint static.
function tick(){RUN=0;SH=MOV&&!document.hidden&&VIS.size>0&&Date.now()-ACT<1e4;T=Date.now()/900;VIS.forEach(paint);if(SH){RUN=1;setTimeout(tick,125)}}
const wake=()=>{if(MOV&&!RUN)tick()};
function boot(){const cs=all();let good=cs.length>0;
try{cs.forEach(c=>{c._f=CH[c.dataset.k];c._x=c.getContext('2d');if(!c._x)good=false});if(good)inks()}catch(e){good=false}
if(cs.length&&!good){document.documentElement.classList.add('nocv');return}
const rm=matchMedia('(prefers-reduced-motion: reduce)');MOV=!rm.matches;ACT=Date.now();
const io=new IntersectionObserver(es=>{es.forEach(x=>x.isIntersecting?VIS.add(x.target):VIS.delete(x.target));wake()});cs.forEach(c=>io.observe(c));
['pointermove','pointerdown'].forEach(n=>addEventListener(n,()=>{ACT=Date.now();wake()},{passive:true}));
const re=()=>{inks();size()};new ResizeObserver(()=>requestAnimationFrame(size)).observe(document.body);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',re);new MutationObserver(re).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
rm.addEventListener('change',()=>{MOV=!rm.matches;wake()});
document.addEventListener('visibilitychange',wake);size()}
// A picture that fails to load (Meta's image links expire) is removed: the initial or the card's text shows instead.
addEventListener('error',e=>{if(e.target.tagName=='IMG')e.target.remove()},true);
addEventListener('DOMContentLoaded',render);
</script>
<script>
const DATA = {
schemaVersion: 1,
merchant: { name: "Brindle Chili Works", currency: "USD", timezone: "America/Los_Angeles" },
asOf: "2026-10-06T18:40:00Z",
window: { start: "2026-09-29", end: "2026-10-05", partial: false, before: "as_202" },
metaSyncedAt: "2026-10-06T18:09:00Z",
metaWindow: { start: "2026-09-07", end: "2026-10-06" },
moshiWindow: { start: "2026-09-22", end: "2026-10-06" },
mode: "full",
mood: "delight",
primaryCampaignId: "cm_101",
verdict: {
  title: "Hot start, and Meta is still learning",
  headline: "Chat to Cart clicked at {cmp:0.moshi} in week one, against {cmp:0.merchant} for Fall Launch.",
  body: "Chats cost {m:costPerChat} each, and {m:provenOrders} orders came straight from those threads. Its first fair CPA read lands {c:cm_101.nextGateDate}."
},
campaigns: [
{ id: "cm_101", name: "Moshi · Chat to Cart", owner: "moshi", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 300, status: "ACTIVE", startTime: "2026-09-22", adsPulled: "all", retargeting: false, metaSpend: 2077, metaPurchases: 21, metaPurchaseValue: 924.4,
  adsets: [{ id: "as_201", name: "Broad US 25–54", startTime: "2026-09-22", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "learning", adCount: 2, lastLearningReset: "2026-09-30", attributionSetting: "7-day click, 1-day view",
    ads: [{ id: "ad_301", name: "Heat ladder reel", angle: "Taste test", daily: [
{date:"2026-09-22",spend:89.7,impressions:6013,linkClicks:128,conversations:10,purchases:1,purchaseValue:44.1,reach:5727},
{date:"2026-09-23",spend:91.7,impressions:6644,linkClicks:148,conversations:10,purchases:1,purchaseValue:46.5,reach:5986},
{date:"2026-09-24",spend:125.7,impressions:8976,linkClicks:168,conversations:15,purchases:1,purchaseValue:41,reach:7672},
{date:"2026-09-25",spend:137.4,impressions:9306,linkClicks:188,conversations:17,purchases:1,purchaseValue:48.1,reach:7566},
{date:"2026-09-26",spend:132.9,impressions:10185,linkClicks:201,conversations:14,purchases:1,purchaseValue:44.4,reach:7895},
{date:"2026-09-27",spend:157.7,impressions:10670,linkClicks:201,conversations:17,purchases:2,purchaseValue:83.3,reach:7904},
{date:"2026-09-28",spend:152.1,impressions:10262,linkClicks:193,conversations:16,purchases:2,purchaseValue:85.4,reach:7278},
{date:"2026-09-29",spend:131.1,impressions:8973,linkClicks:187,conversations:14,purchases:2,purchaseValue:83.4,reach:6104},
{date:"2026-09-30",spend:154.6,impressions:11500,linkClicks:214,conversations:15,purchases:2,purchaseValue:83.1,reach:7516},
{date:"2026-10-01",spend:147.8,impressions:9793,linkClicks:168,conversations:17,purchases:1,purchaseValue:45.3,reach:6159},
{date:"2026-10-02",spend:170.5,impressions:12058,linkClicks:215,conversations:19,purchases:2,purchaseValue:94,reach:7308},
{date:"2026-10-03",spend:147.8,impressions:10159,linkClicks:183,conversations:18,purchases:1,purchaseValue:40.8,reach:5941},
{date:"2026-10-04",spend:139.7,impressions:10551,linkClicks:200,conversations:18,purchases:2,purchaseValue:94.3,reach:5961},
{date:"2026-10-05",spend:161.1,impressions:11608,linkClicks:212,conversations:17,purchases:1,purchaseValue:42.7,reach:6343},
{date:"2026-10-06",spend:137.2,impressions:10091,linkClicks:173,conversations:14,purchases:1,purchaseValue:48,reach:5339}] }] }] },
{ id: "cm_102", name: "Moshi · Ask the Chili Nerd", owner: "moshi", objective: "engagement", metaObjective: "OUTCOME_ENGAGEMENT", budgetType: "ABO", dailyBudget: null, status: "ACTIVE", startTime: "2026-10-06", adsPulled: "all", retargeting: false, metaSpend: 61.4, metaPurchases: 0, metaPurchaseValue: 0,
  adsets: [{ id: "as_202", name: "Messenger + IG DM", startTime: "2026-10-06", optimizationGoal: "CONVERSATIONS", dailyBudget: 80, learning: null, adCount: 1, lastLearningReset: null, attributionSetting: "1-day click",
    ads: [{ id: "ad_303", name: "Which sauce for tacos?", angle: "Pairing quiz", daily: [
{date:"2026-10-06",spend:61.4,impressions:5658,linkClicks:93,conversations:9,purchases:0,purchaseValue:0,reach:5440}] }] }] },
{ id: "cm_401", name: "Fall Launch", owner: "merchant", objective: "sales", metaObjective: "OUTCOME_SALES", budgetType: "CBO", dailyBudget: 1400, status: "ACTIVE", startTime: "2026-09-29", adsPulled: "all", retargeting: false, metaSpend: 4289.5, metaPurchases: 103, metaPurchaseValue: 4661.6,
  adsets: [{ id: "as_501", name: "Advantage+ audience", startTime: "2026-09-29", optimizationGoal: "OFFSITE_CONVERSIONS", dailyBudget: null, learning: "success", adCount: 1, lastLearningReset: null, attributionSetting: "7-day click, 1-day view",
    totals: { spend: 4289.5, impressions: 226256, linkClicks: 2806, conversations: 0, purchases: 103, purchaseValue: 4661.6 },
    ads: [{ id: "ad_601", name: "Smoked habanero UGC", angle: "Heat reaction", daily: [
{date:"2026-09-29",spend:602,impressions:32128,linkClicks:449,conversations:0,purchases:18,purchaseValue:799.2,reach:29207},
{date:"2026-09-30",spend:663.7,impressions:33615,linkClicks:461,conversations:0,purchases:12,purchaseValue:536.2,reach:27781},
{date:"2026-10-01",spend:647.9,impressions:34975,linkClicks:452,conversations:0,purchases:25,purchaseValue:1135.2,reach:26496},
{date:"2026-10-02",spend:670.5,impressions:32677,linkClicks:370,conversations:0,purchases:13,purchaseValue:564.2,reach:22851},
{date:"2026-10-03",spend:616.8,impressions:34246,linkClicks:433,conversations:0,purchases:13,purchaseValue:623.3,reach:22238},
{date:"2026-10-04",spend:528,impressions:27738,linkClicks:307,conversations:0,purchases:10,purchaseValue:466.1,reach:16811},
{date:"2026-10-05",spend:560.6,impressions:30877,linkClicks:334,conversations:0,purchases:12,purchaseValue:537.4,reach:17544}] }] }] }
],
moshi: { firstLaunch: "2026-09-22", spend: 2138.4, chats: 318, chatsFromAds: 284, contactsCaptured: 71, contactsEmail: 52, contactsPhone: 19, productViews: 149, carts: 46, checkouts: 27, provenOrders: 14, provenRevenue: 768.5, delayedOrders: 5, closerRecoveries: 3, closerRevenue: 141 },
comparisons: [{ metric: "ctr", day: 7, moshiCampaignId: "cm_101", merchantCampaignId: "cm_401" }, { metric: "ctr", running: true, moshiCampaignId: "cm_101" }],
changes: [{ date: "2026-09-30", what: "Meta restarted learning after a significant edit", kind: "significant_edit", source: "meta", entityId: "as_201" },
  { date: "2026-10-06", what: "Moshi launched Messenger + IG DM", kind: "new_ad", source: "moshi", entityId: "as_202" }],
accountIssues: [],
chatters: { total: 318, people: [
  { username: "salsa.sam", followers: 48200, verified: true, followsYou: false, orderValue: 58 },
  { username: "heatseekr", followers: 2300, followsYou: true, orderValue: 44.5 },
  { username: "taco.jo", followers: 640, followsYou: false, orderValue: 89 },
  { name: "Dana Ruiz", channel: "messenger", orderValue: 41 },
  { username: "bbq.dad", followers: 21500, followsYou: false, stage: "cart" },
  { username: "chili.lab", followers: 9100, verified: true, followsYou: false, stage: "product_view" },
  { username: "mild.mo", followers: 310, followsYou: true }
] },
dashboardUrl: "https://brindle.moshi.ai",
flags: [{ source: "moshi", code: "order_match_pending", text: "Oct 6 orders still matching." }]
};
</script>
</body>
</html>
````
