// BG.W-DARK-READABILITY-REPAIR — full-route dark legibility CENSUS (paint judge).
// Non-authoring: measures the PAINTED truth via engine-resolved computed styles.
//
// For each route, in a given mode, walk every VISIBLE text node and measure the
// COMPOSITED contrast between its resolved `color` and the real composited plate
// behind it (the ancestor background-color chain alpha-composited down to the page
// base — every oklab()/color-mix()/light-dark()/container-query bucket already
// RESOLVED by the real browser, i.e. NOT token math). Both witnesses:
//   - WCAG-2 AA  (ratio >= 4.5 body, >= 3.0 large per the WCAG large-text carve)
//   - APCA Lc    (|Lc| >= 60 body, >= 75 small)  — the exact paint-arm.mjs math.
// A node below EITHER floor is a census row. Small = fontPx < 16 (& not-bold) OR
// fontPx < 14; large-WCAG = fontPx >= 24 OR (fontPx >= 18.66 && bold).
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTES = JSON.parse(process.env.ROUTES_JSON || readFileSync(OUT + "routes.json", "utf8"));
const MODES = (process.env.MODES || "dark").split(",");
const LABEL = process.env.LABEL || "dark";

// The in-browser census — returns { nodes, violations:[{...}] } for the current page.
const CENSUS_FN = `() => {
  // ---- APCA (paint-arm.mjs constants, verbatim) ----
  const TRC=2.4,RCO=0.2126729,GCO=0.7151522,BCO=0.072175;
  const NBG=0.56,NTXT=0.57,RTXT=0.62,RBG=0.65,BLK_T=0.022,BLK_C=1.414;
  const SB=1.14,SW=1.14,OB=0.027,OW=0.027,DYMIN=0.0005,LOCLIP=0.1;
  const aY=(c)=>{const f=(x)=>Math.pow(Math.max(0,Math.min(255,x))/255,TRC);return RCO*f(c.r)+GCO*f(c.g)+BCO*f(c.b);};
  const apca=(txt,bg)=>{const ty=aY(txt),by=aY(bg);if(!isFinite(ty)||!isFinite(by))return 0;if(Math.min(ty,by)<0||Math.max(ty,by)>1.1)return 0;
    const Yt=ty>BLK_T?ty:ty+Math.pow(BLK_T-ty,BLK_C);const Yb=by>BLK_T?by:by+Math.pow(BLK_T-by,BLK_C);
    if(Math.abs(Yb-Yt)<DYMIN)return 0;let out;
    if(Yb>Yt){const s=(Math.pow(Yb,NBG)-Math.pow(Yt,NTXT))*SB;out=s<LOCLIP?0:s-OB;}
    else{const s=(Math.pow(Yb,RBG)-Math.pow(Yt,RTXT))*SW;out=s>-LOCLIP?0:s+OW;}
    return out*100;};
  // ---- WCAG-2 relative luminance + ratio ----
  const lin=(x)=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);};
  const wl=(c)=>0.2126*lin(c.r)+0.7152*lin(c.g)+0.0722*lin(c.b);
  const wcag=(a,b)=>{const l1=wl(a),l2=wl(b);const hi=Math.max(l1,l2),lo=Math.min(l1,l2);return (hi+0.05)/(lo+0.05);};
  // ---- resolved-color parse (rgb/rgba/color(srgb)/oklab/oklch) ----
  const parse=(str)=>{if(!str)return null;str=str.trim();
    if(/^transparent$/i.test(str))return{r:0,g:0,b:0,a:0};
    let m=str.match(/color\\(\\s*srgb\\s+(-?[\\d.]+)\\s+(-?[\\d.]+)\\s+(-?[\\d.]+)(?:\\s*\\/\\s*([\\d.]+%?))?\\s*\\)/i);
    if(m){const a=m[4]==null?1:(m[4].endsWith('%')?+m[4].slice(0,-1)/100:+m[4]);
      return{r:Math.round(Math.max(0,Math.min(1,+m[1]))*255),g:Math.round(Math.max(0,Math.min(1,+m[2]))*255),b:Math.round(Math.max(0,Math.min(1,+m[3]))*255),a};}
    m=str.match(/rgba?\\(\\s*([\\d.]+)[,\\s]+([\\d.]+)[,\\s]+([\\d.]+)(?:[,\\s\\/]+([\\d.]+%?))?\\s*\\)/i);
    if(m){const a=m[4]==null?1:(m[4].endsWith('%')?+m[4].slice(0,-1)/100:+m[4]);return{r:+m[1],g:+m[2],b:+m[3],a};}
    // Fallback: let the browser resolve via a probe element (handles oklab/oklch/named).
    return null;};
  // Canvas pixel resolution — bulletproof for oklch()/color-mix()/light-dark()/named/hex/rgb
  // (Chrome 149 returns oklch() as-authored in getComputedStyle, which the string parser cannot
  // read; painting the color to a 1x1 canvas over a known base recovers the true composited rgb+a).
  const _cv=document.createElement('canvas');_cv.width=_cv.height=1;const _cx=_cv.getContext('2d',{willReadFrequently:true});
  const canvasResolve=(str)=>{try{
    // alpha: paint over white then over black; recover a from the delta.
    _cx.clearRect(0,0,1,1);_cx.fillStyle='#fff';_cx.fillRect(0,0,1,1);_cx.fillStyle=str;_cx.fillRect(0,0,1,1);
    const w=_cx.getImageData(0,0,1,1).data;
    _cx.clearRect(0,0,1,1);_cx.fillStyle='#000';_cx.fillRect(0,0,1,1);_cx.fillStyle=str;_cx.fillRect(0,0,1,1);
    const b=_cx.getImageData(0,0,1,1).data;
    // over-white: c*a + 255*(1-a); over-black: c*a. a = 1 - (w.r - b.r)/255 averaged.
    const a=1-((w[0]-b[0])+(w[1]-b[1])+(w[2]-b[2]))/(3*255);
    if(a<=0.003)return{r:0,g:0,b:0,a:0};
    return{r:Math.round(b[0]/a),g:Math.round(b[1]/a),b:Math.round(b[2]/a),a:+a.toFixed(3)};
  }catch(e){return null;}};
  const resolve=(str)=>{const p=parse(str);if(p)return p;return canvasResolve(str);};
  const over=(o,b)=>{const a=o.a==null?1:Math.max(0,Math.min(1,o.a));return{r:Math.round(o.r*a+b.r*(1-a)),g:Math.round(o.g*a+b.g*(1-a)),b:Math.round(o.b*a+b.b*(1-a)),a:1};};
  // page base color
  const pageBg=(()=>{const b=resolve(getComputedStyle(document.body).backgroundColor)||{r:255,g:255,b:255,a:1};
    if(b.a>=1)return b;const h=resolve(getComputedStyle(document.documentElement).backgroundColor)||{r:255,g:255,b:255,a:1};
    return over(b,h.a>=1?h:{r:h.r,g:h.g,b:h.b,a:1});})();
  // composited plate behind an element: walk ancestors, collect bg-colors (+ bg-image note), composite over page base
  // scope="glass" when any ancestor plate is translucent (alpha<1) OR carries backdrop-filter (the
  // wave's on-glass target — neutral-5 collapses over glass); "opaque" otherwise (page-muted KEPT).
  const plateFor=(el)=>{const stack=[];let n=el;let hasImg=false;let glassy=false;
    while(n&&n!==document.documentElement){const cs=getComputedStyle(n);
      const bg=resolve(cs.backgroundColor);if(bg&&bg.a>0){stack.push(bg);if(bg.a<0.999)glassy=true;}
      if(cs.backdropFilter&&cs.backdropFilter!=='none')glassy=true;
      if(cs.backgroundImage&&cs.backgroundImage!=='none')hasImg=true;
      n=n.parentElement;}
    // composite from page base upward (outermost first)
    let acc={r:pageBg.r,g:pageBg.g,b:pageBg.b,a:1};
    for(let i=stack.length-1;i>=0;i--)acc=over(stack[i],acc);
    return{plate:acc,hasImg,scope:glassy?'glass':'opaque'};};
  // visible?
  const vis=(el)=>{const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;
    const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return false;
    if(r.bottom<0||r.right<0||r.top>document.documentElement.scrollHeight||r.left>document.documentElement.scrollWidth)return false;
    return true;};
  const results=[];const violations=[];let counted=0;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:(t)=>{
    if(!t.nodeValue||!t.nodeValue.trim())return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;}});
  const seen=new Set();
  while(walker.nextNode()){const t=walker.currentNode;const el=t.parentElement;if(!el||seen.has(el))continue;
    // group by parent element to avoid double-counting; but different text nodes share style
    if(!vis(el))continue;
    const cs=getComputedStyle(el);
    // gradient/background-clip text: color is transparent-ish but the ink is a bg-clip gradient — SKIP
    // (the paint judge reads these visually; the computed color is not the painted ink).
    const clip=(cs.webkitBackgroundClip||cs.backgroundClip||'');
    const fillT=(cs.webkitTextFillColor||'');
    const isClipText=/text/i.test(clip)||/rgba\(0, 0, 0, 0\)|transparent/i.test(fillT);
    const txt=resolve(fillT&&!/transparent|rgba\(0, 0, 0, 0\)/i.test(fillT)?fillT:cs.color);if(!txt)continue;
    const fpx=parseFloat(cs.fontSize)||16;const fw=parseInt(cs.fontWeight)||400;
    // skip pure icon glyphs / decorative (aria-hidden with no meaningful text handled by trim already)
    const {plate,hasImg,scope}=plateFor(el);
    if(isClipText){seen.add(el);continue;}
    const effTxt=txt.a<1?over(txt,plate):{r:txt.r,g:txt.g,b:txt.b,a:1};
    const ratio=wcag(effTxt,plate);
    const lc=Math.abs(apca(effTxt,plate));
    const bold=fw>=700;
    const largeW=fpx>=24||(fpx>=18.66&&bold);
    const small=fpx<14||(fpx<16&&!bold);
    const wcagFloor=largeW?3.0:4.5;
    const apcaFloor=small?75:60;
    counted++;
    const wcagFail=ratio<wcagFloor-0.05; // small tolerance for rounding
    const apcaFail=lc<apcaFloor-0.5;
    if(wcagFail||apcaFail){
      const sample=(t.nodeValue||'').trim().slice(0,40);
      violations.push({tag:el.tagName.toLowerCase(),cls:(el.className&&el.className.toString?el.className.toString():'').slice(0,50),
        sample,fpx:+fpx.toFixed(1),fw,ratio:+ratio.toFixed(2),lc:+lc.toFixed(1),
        wcagFloor,apcaFloor,wcagFail,apcaFail,hasImg,scope,
        txt:[effTxt.r,effTxt.g,effTxt.b],plate:[plate.r,plate.g,plate.b]});
    }
    seen.add(el);
  }
  return{counted,pageBg:[pageBg.r,pageBg.g,pageBg.b],violations};
}`;

async function pollReady(page) {
  const t0 = Date.now();
  while (Date.now() - t0 < 15000) {
    const ok = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
    if (ok) return Date.now() - t0;
    await page.waitForTimeout(150);
  }
  return -1;
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

const report = {};
for (const mode of MODES) {
  for (const route of ROUTES) {
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    let ready = -1, res = null, err = null;
    try {
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      ready = await pollReady(page);
      // let a couple frames settle for container-query buckets + fonts
      await page.waitForTimeout(400);
      res = await page.evaluate(new Function("return (" + CENSUS_FN + ")()"));
    } catch (e) { err = String(e).slice(0, 120); }
    const key = mode + " " + route;
    report[key] = { mode, route, ready, err, counted: res?.counted ?? 0, pageBg: res?.pageBg, violations: res?.violations ?? [] };
    const nv = res?.violations?.length ?? 0;
    process.stdout.write(`${mode} ${route.padEnd(38)} ready=${ready}ms nodes=${String(res?.counted ?? "?").padStart(4)} viol=${nv}${err ? " ERR:" + err : ""}\n`);
  }
}
await page.close();
await browser.close();
const outFile = OUT + `census-${LABEL}.json`;
writeFileSync(outFile, JSON.stringify(report, null, 1));
console.log("\nWROTE " + outFile);
