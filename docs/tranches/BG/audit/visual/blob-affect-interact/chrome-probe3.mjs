// Chrome probe 3 — clean measurements (full-settle timing).
//  (A) enumerate canvases (class/size/parent) — resolve the "3 webgpu" count.
//  (B) clean per-MOOD motion character: drive the Mood select through idle/happy/curious/
//      sleepy/excited, wait 3.5s each (full cross-fade incl. sleepy 2500ms), park pointer,
//      measure ambient orbit-drift over 400ms + central hue. This is the ≥4-distinct
//      affect A/B in PAINT (motion character, not just hue).
//  (C) clean click-deform settle on the settled CALM bead — read the decay to confirm
//      the deform SETTLES (no sustained jitter).
import { chromium } from "playwright";
import { inflateSync } from "node:zlib";
function decodeRGBA(buf){let p=8,w=0,h=0,bd=0,ct=0;const idat=[];while(p<buf.length){const len=buf.readUInt32BE(p);const type=buf.toString("ascii",p+4,p+8);const data=buf.subarray(p+8,p+8+len);if(type==="IHDR"){w=data.readUInt32BE(0);h=data.readUInt32BE(4);bd=data[8];ct=data[9];}else if(type==="IDAT")idat.push(data);else if(type==="IEND")break;p+=12+len;}const ch=ct===6?4:ct===2?3:1;if(bd!==8)throw new Error("bd"+bd);const raw=inflateSync(Buffer.concat(idat));const stride=w*ch;const out=Buffer.alloc(w*h*4);const prev=Buffer.alloc(stride);let ri=0;for(let y=0;y<h;y++){const f=raw[ri++];const line=Buffer.alloc(stride);for(let x=0;x<stride;x++){const rb=raw[ri++];const a=x>=ch?line[x-ch]:0;const b=prev[x];const c=x>=ch?prev[x-ch]:0;let v;switch(f){case 0:v=rb;break;case 1:v=rb+a;break;case 2:v=rb+b;break;case 3:v=rb+((a+b)>>1);break;case 4:{const pa=Math.abs(b-c),pb=Math.abs(a-c),pc=Math.abs(a+b-2*c);v=rb+(pa<=pb&&pa<=pc?a:pb<=pc?b:c);break;}default:v=rb;}line[x]=v&0xff;}line.copy(prev);for(let x=0;x<w;x++){const s=x*ch,d=(y*w+x)*4;out[d]=line[s];out[d+1]=ch>=3?line[s+1]:line[s];out[d+2]=ch>=3?line[s+2]:line[s];out[d+3]=ch===4?line[s+3]:255;}}return{w,h,data:out};}
function meanAbsDelta(a,b){const A=decodeRGBA(a),B=decodeRGBA(b);const w=Math.min(A.w,B.w),h=Math.min(A.h,B.h);let s=0,n=0;const st=5;for(let y=0;y<h;y+=st)for(let x=0;x<w;x+=st){const dA=(y*A.w+x)*4,dB=(y*B.w+x)*4;const lA=0.299*A.data[dA]+0.587*A.data[dA+1]+0.114*A.data[dA+2];const lB=0.299*B.data[dB]+0.587*B.data[dB+1]+0.114*B.data[dB+2];s+=Math.abs(lA-lB);n++;}return +(s/n).toFixed(3);}
function meanRGBcentral(buf){const{w,h,data}=decodeRGBA(buf);let r=0,g=0,b=0,n=0;const cx=w/2,cy=h/2,rad=Math.min(w,h)*0.28,r2=rad*rad;const st=4;for(let y=0;y<h;y+=st)for(let x=0;x<w;x+=st){const dx=x-cx,dy=y-cy;if(dx*dx+dy*dy>r2)continue;const d=(y*w+x)*4;r+=data[d];g+=data[d+1];b+=data[d+2];n++;}return{r:Math.round(r/n),g:Math.round(g/n),b:Math.round(b/n)};}

const CDP=process.env.CDP_URL||"http://localhost:9333";
async function pollReady(page){const t0=Date.now();while(Date.now()-t0<15000){if(await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break;await page.waitForTimeout(150);}}

const browser=await chromium.connectOverCDP(CDP);
const ctx=browser.contexts()[0]||await browser.newContext();
const page=await ctx.newPage();
await page.setViewportSize({width:1440,height:900});
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/substrates/blob")}&mode=light`,{waitUntil:"load",timeout:30000});
await pollReady(page);

// (A) enumerate canvases WITHOUT taking a context (read attrs only).
const canvases=await page.evaluate(()=>Array.from(document.querySelectorAll("canvas")).map(c=>({
  cls:c.className||"(none)", w:c.width, h:c.height,
  cssW:Math.round(c.getBoundingClientRect().width), cssH:Math.round(c.getBoundingClientRect().height),
  parentCls:(c.parentElement&&(c.parentElement.className.baseVal!==undefined?c.parentElement.className.baseVal:c.parentElement.className))||"(none)",
})));

await page.evaluate(()=>document.querySelector(".goo-blob-wrapper")?.scrollIntoView({block:"center"}));
await page.waitForTimeout(300);
const rect=await page.evaluate(()=>{const w=document.querySelector(".goo-blob-wrapper");if(!w)return null;const r=w.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,cx:r.x+r.width/2,cy:r.y+r.height/2};});
const vw=1440,vh=900;const cx0=Math.max(0,Math.min(vw-1,rect.x)),cy0=Math.max(0,Math.min(vh-1,rect.y));
const clip={x:cx0,y:cy0,width:Math.max(1,Math.min(vw-cx0,rect.w)),height:Math.max(1,Math.min(vh-cy0,rect.h))};
const shot=()=>page.screenshot({clip});

// (B) drive the Mood select through the 5 moods. The LabeledSelect trigger sits in the
// "Mood" ConfiguratorRow. Find it by its tooltip/label text neighbourhood.
async function setMood(mood){
  // Open the mood select: the trigger is a button/combobox in the Mood row.
  const opened=await page.evaluate((m)=>{
    // find the row whose label text is "Mood", then its select trigger
    const rows=Array.from(document.querySelectorAll("*")).filter(e=>e.getAttribute&&e.getAttribute("aria-label")==="Mood");
    for(const r of rows){ if(r.tagName==="BUTTON"||r.getAttribute("role")==="combobox"){ r.click(); return "clicked:"+r.tagName; } }
    // fallback: any combobox trigger showing a mood value
    const triggers=Array.from(document.querySelectorAll('[role="combobox"],button[aria-haspopup="listbox"],.control-surface'));
    return "triggers:"+triggers.length;
  },mood);
  await page.waitForTimeout(250);
  // click the option with the mood text
  const picked=await page.evaluate((m)=>{
    const opts=Array.from(document.querySelectorAll('[role="option"]'));
    for(const o of opts){ if(o.textContent.trim().toLowerCase()===m){ o.click(); return true; } }
    return false;
  },mood);
  return {opened,picked};
}

const moods=["idle","happy","curious","sleepy","excited"];
const moodInfo=[];
for(const m of moods){
  const r=await setMood(m);
  await page.mouse.move(4,4);           // park pointer — measure AMBIENT motion, no lean
  await page.waitForTimeout(3500);       // full cross-fade settle (sleepy transition 2500ms)
  const f0=await shot();
  await page.waitForTimeout(120);const f1=await shot();
  await page.waitForTimeout(120);const f2=await shot();
  await page.waitForTimeout(120);const f3=await shot();
  const d1=meanAbsDelta(f0,f1),d2=meanAbsDelta(f1,f2),d3=meanAbsDelta(f2,f3);
  moodInfo.push({mood:m, set:r, ambientDrift_avg120ms:+(((d1+d2+d3)/3).toFixed(3)), driftSeries:[d1,d2,d3], centralRGB:meanRGBcentral(f0)});
}

// (C) clean click-deform settle: select CALM preset, settle, park, confirm low ambient,
// then click and read the decay to near-ambient.
const tabs=await page.$$('[role="tab"]');
if(tabs[0]) await tabs[0].click();          // Calm
await page.mouse.move(4,4);
await page.waitForTimeout(3500);
const a0=await shot();await page.waitForTimeout(120);const a1=await shot();
const ambient=meanAbsDelta(a0,a1);
await page.mouse.move(rect.cx,rect.cy);await page.waitForTimeout(400);
const pre=await shot();
await page.mouse.down();await page.mouse.up();
await page.waitForTimeout(60);const p60=await shot();
await page.waitForTimeout(140);const p200=await shot();
await page.waitForTimeout(300);const p500=await shot();
await page.waitForTimeout(500);const p1000=await shot();
await page.mouse.move(4,4);await page.waitForTimeout(600);
const post0=await shot();await page.waitForTimeout(120);const post1=await shot();
const settle={
  ambientBefore:ambient,
  peak_pre_to_60ms:meanAbsDelta(pre,p60),
  peak_pre_to_200ms:meanAbsDelta(pre,p200),
  decay_200_to_500:meanAbsDelta(p200,p500),
  decay_500_to_1000:meanAbsDelta(p500,p1000),
  postSettleAmbient:meanAbsDelta(post0,post1),
};
console.log(JSON.stringify({canvases,moodInfo,settle},null,2));
await page.close();await browser.close();
