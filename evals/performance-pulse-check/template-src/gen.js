// synthetic daily rows, deterministic
let s=7;const R=()=>{s=(s*9301+49297)%233280;return s/233280};
const day=(d,n)=>new Date(Date.parse(d+'T00:00:00Z')+n*864e5).toISOString().slice(0,10);
function rows(start,n,o){const out=[];for(let i=0;i<n;i++){const j=0.85+R()*0.3;
 const sp=+(o.sp*j*(o.ramp?Math.min(1,0.6+i*0.1):1)).toFixed(1);const ctr=o.ctr*(1-(o.fat||0)*i)*(0.9+R()*0.2);
 const im=Math.round(sp/o.cpm*1000*(0.92+R()*0.16));const lc=Math.round(im*ctr);
 const pu=o.pu==null?null:Math.round(sp*o.pu*(0.6+R()*0.8));
 out.push({date:day(start,i),spend:sp,impressions:im,linkClicks:lc,conversations:o.cv==null?0:Math.round(sp/o.cv*(0.85+R()*0.3)),purchases:pu,purchaseValue:pu==null?null:+(pu*o.aov*(0.9+R()*0.2)).toFixed(1),reach:Math.round(im/(o.f0+i*o.fi))})}return out}
const fmt=a=>a.map(r=>'            '+JSON.stringify(r).replace(/"(\w+)":/g,'$1:')).join(',\n');
const out={
 a301:rows('2026-09-22',15,{sp:150,ctr:.021,cpm:14,cv:null,pu:.009,aov:44,f0:1.05,fi:.06,fat:.012,ramp:1}),
 a303:rows('2026-10-06',1,{sp:72,ctr:.017,cpm:11,cv:6.2,pu:.004,aov:41,f0:1.04,fi:.05}),
 a601:rows('2026-09-29',8,{sp:610,ctr:.013,cpm:19,cv:null,pu:.03,aov:48,f0:1.1,fi:.11,fat:.022}),
};
for(const k in out)console.log('//'+k+'\n'+fmt(out[k]));
let sp=0;for(const k of ['a301','a303'])out[k].forEach(r=>{if(r.date>='2026-09-22')sp+=r.spend});console.log('//moshi spend',sp.toFixed(2));
