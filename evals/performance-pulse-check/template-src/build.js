const fs=require('fs'),S=__dirname;
// Plain attribute values need no quotes in HTML (class=sub is class="sub", alt is alt=""), which saves about 175 bytes of the size line.
const t=fs.readFileSync(S+'/tpl.html','utf8').replace(/<script>\n(const LOGO[\s\S]*?)<\/script>/,(m,c)=>'<script>\n'+c.replace(/ (class|role|aria-hidden|loading|target|rel|width|height|tabindex)="([\w-]+)"/g,' $1=$2').replace(/ alt=""/g,' alt')+'</script>').replace('%%LOGO%%',()=>fs.readFileSync(S+'/logo/logo64q.png.b64','utf8').trim()).replace('%%AV%%',()=>fs.readFileSync(S+'/avatar/av.js','utf8').trim().replace(/;$/,'')+';AV.s={delight:"'+fs.readFileSync(S+'/avatar/still-delight.webp.b64','utf8').trim()+'",reading:"'+fs.readFileSync(S+'/avatar/still-reading.webp.b64','utf8').trim()+'"};');
// Function replacers keep $&, $' and $` in inserted text literal.
const cp=require('child_process'),NM=process.env.NM_BIN||'npx --yes ';
let o=t.replace(/<style>([\s\S]*?)<\/style>/,(m,c)=>'<style>'+cp.execSync(NM+'esbuild --loader=css --minify --target=chrome123,safari17.5,firefox120 --log-level=warning',{input:c}).toString().trim()+'</style>');
o=o.replace(/<script>\n(const LOGO[\s\S]*?)<\/script>/,(m,c)=>{fs.writeFileSync(S+'/code.js',c);return'<script>'+cp.execSync(NM+'terser '+S+'/code.js --toplevel -m -c passes=2 --ecma 2020').toString().trim()+'</script>'});
// The shipped template carries no data: the skill replaces `const DATA = null;` with its own DATA block (SKILL.md step 9).
// --sample previews it with the sample DATA (sample.js); a <data.js> file puts that file's DATA block in instead.
const a=process.argv.slice(2),[out,raw,file]=a.filter(x=>x!='--sample');
fs.writeFileSync(out,(raw?t:o).replace('%%DATA%%',()=>file?fs.readFileSync(file,'utf8'):a.includes('--sample')?require('./sample.js').data:'const DATA = null;'));
