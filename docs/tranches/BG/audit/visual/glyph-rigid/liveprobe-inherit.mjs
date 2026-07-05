import { chromium } from "playwright-core";
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
const browser=await chromium.connectOverCDP("http://127.0.0.1:9222");
const ctx=browser.contexts()[0]||await browser.newContext();
const page=await ctx.newPage();
await page.setViewportSize({width:1440,height:900});
await page.goto("http://localhost:5200/?capture=%2Fdock%2Foverview&mode=light",{waitUntil:"load"});
for(let i=0;i<120;i++){if(await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break;await sleep(100);}
const idx=await page.evaluate(()=>{const ds=[...document.querySelectorAll(".glass-dock")];for(let i=0;i<ds.length;i++){const d=ds[i];if(d.querySelector(".dock-persistent")&&!d.classList.contains("vertical")&&d.getBoundingClientRect().width<300)return i;}return -1;});
const c=await page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};},idx);
// hover on, leave -> auto-collapse; in-page rAF loop grabs computed values during morph
await page.mouse.move(c.x,c.y); await sleep(60); await page.mouse.move(30,860);
const frames = await page.evaluate(async (i)=>{
  const d=[...document.querySelectorAll(".glass-dock")][i];
  const p=d.querySelector(".dock-persistent");
  const g=p?p.querySelector("svg"):null;
  const out=[]; const start=performance.now();
  return await new Promise((res)=>{
    function tick(){
      const now=performance.now();
      const csd=getComputedStyle(d), csp=getComputedStyle(p);
      const gr=g?g.getBoundingClientRect():null;
      const morph=d.getAttribute("data-morphing"), punch=d.getAttribute("data-punching");
      if(morph!=null||punch!=null){
        out.push({
          t:+(now-start).toFixed(0), morphing:morph, punching:punch,
          rootScale:csd.scale, childScale:csp.scale,
          root_punch:csd.getPropertyValue("--dock-punch-stretch").trim(),
          child_punch:csp.getPropertyValue("--dock-punch-stretch").trim(),
          root_size:csd.getPropertyValue("--dock-size-scale").trim(),
          child_size:csp.getPropertyValue("--dock-size-scale").trim(),
          glyphAsp:gr?+(gr.width/gr.height).toFixed(4):null
        });
      }
      // stop after we have collected some morph frames AND morph ended, or after 8s
      const done = (out.length>0 && morph==null && punch==null && now-start>500) || now-start>9000;
      if(done) res(out); else requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
},idx);
// print the worst (max |glyphAsp-1|) frame + a punch-active frame
const withAsp = frames.filter(f=>f.glyphAsp!=null);
const worst = withAsp.reduce((a,b)=> Math.abs(b.glyphAsp-1)>Math.abs(a.glyphAsp-1)?b:a, withAsp[0]||{glyphAsp:1});
console.log("MORPH FRAMES:", frames.length, "  worst glyphAsp:", worst&&worst.glyphAsp);
console.log("WORST FRAME:", JSON.stringify(worst));
// find a frame where root_punch differs from 1 to show the inheritance gap
const punchFrame = frames.find(f=> f.root_punch && Math.abs(parseFloat(f.root_punch)-1)>0.02) || worst;
console.log("PUNCH-ACTIVE FRAME (root vs child --dock-punch-stretch):", JSON.stringify(punchFrame));
await page.close(); await browser.close();
