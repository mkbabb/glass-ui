import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5199/substrates/blob", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// 1) Static swatch edge zoom (the "top blobs" the user calls pixelated)
const swatch = await page.evaluate(() => {
  // the static blob swatches: svg or div in "THE LIT CONTAINED DROPLET" row
  const svgs = Array.from(document.querySelectorAll("svg")).filter(s=>{const r=s.getBoundingClientRect();return r.width>80&&r.height>80;});
  const watercolor = Array.from(document.querySelectorAll("[class*='watercolor'],[class*='blob']")).filter(e=>{const r=e.getBoundingClientRect();return r.width>80&&r.height>80&&r.y<500;});
  const pick = (svgs[0]||watercolor[0]);
  if(!pick) return null;
  const r=pick.getBoundingClientRect();
  return {tag:pick.tagName, cls:pick.className?.toString?.().slice(0,60), x:r.x,y:r.y,w:r.width,h:r.height,
    isSvg: pick.tagName==='svg', filter: getComputedStyle(pick).filter, html: pick.outerHTML.slice(0,200)};
});
console.log("STATIC SWATCH:", JSON.stringify(swatch, null, 2));
if (swatch && swatch.w>0) {
  // zoom the left EDGE of the first swatch at high mag
  await page.screenshot({ path: `${GROUND}/F2-r3-9-static-swatch-edge.png`,
    clip: { x: Math.max(0,swatch.x-4), y: Math.max(0,swatch.y+swatch.h*0.2), width: Math.min(120,swatch.w*0.5), height: 120 } });
}

// 2) Find the WebGL studio canvas, scroll to it, capture + measure
await page.evaluate(()=>{ const c=document.querySelector("canvas.goo-blob-canvas"); c?.scrollIntoView({block:"center"}); });
await page.waitForTimeout(1500);
const canv = await page.evaluate(()=>{
  const c=document.querySelector("canvas.goo-blob-canvas"); if(!c) return null;
  const r=c.getBoundingClientRect();
  return {x:r.x,y:r.y,w:r.width,h:r.height,bufW:c.width,bufH:c.height,
    ratio:(c.width/r.width).toFixed(3), imageRendering:getComputedStyle(c).imageRendering};
});
console.log("STUDIO CANVAS:", JSON.stringify(canv,null,2));
if (canv && canv.w>0 && canv.y>=0) {
  await page.screenshot({ path:`${GROUND}/F2-r3-9-studio-canvas.png`, clip:{x:Math.max(0,canv.x),y:Math.max(0,canv.y),width:canv.w,height:canv.h} });
  // 3x zoom on the metaball body edge to inspect pixelation/banding
  await page.screenshot({ path:`${GROUND}/F2-r3-9-studio-edge-zoom.png`, clip:{x:Math.max(0,canv.x+canv.w*0.35),y:Math.max(0,canv.y+canv.h*0.1),width:canv.w*0.3,height:canv.h*0.3} });
}

// 3) Check for satellite blobs: count distinct blob bodies / metaball nuclei over time
const satellites = await page.evaluate(async ()=>{
  // sample the canvas pixels at two times; detect multiple disconnected ink regions (satellites)
  const c=document.querySelector("canvas.goo-blob-canvas"); if(!c) return null;
  // Check the GooBlob component for a satellite/nuclei count exposure isn't reliable; instead
  // sample a horizontal scanline across the canvas image to count ink transitions.
  function scan(){
    const gl = c.getContext("webgl2")||c.getContext("webgl");
    const w=c.width,h=c.height;
    // read a band of pixels mid-height
    const px=new Uint8Array(w*4);
    const fb=gl?null:null;
    try{ gl.readPixels(0, Math.floor(h/2), w, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);}catch(e){return {err:e.message};}
    // count alpha/ink transitions
    let trans=0, inInk=false, maxRun=0, run=0;
    for(let i=0;i<w;i++){ const a=px[i*4+3]; const ink=a>40;
      if(ink){run++;maxRun=Math.max(maxRun,run);} else run=0;
      if(ink!==inInk){trans++;inInk=ink;} }
    return {transitions:trans, inkRegions:Math.floor(trans/2), maxRun, w};
  }
  const t0=scan(); await new Promise(r=>setTimeout(r,600)); const t1=scan();
  return {t0,t1};
});
console.log("SATELLITE SCAN:", JSON.stringify(satellites,null,2));
await browser.close();
console.log("DONE");
