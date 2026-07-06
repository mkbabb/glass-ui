import { chromium } from "playwright";
import { PNG } from "pngjs";

const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 }); // taller viewport so the 768 canvas fits with room
await page.goto("http://localhost:5200/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(3500);

// scroll the STUDIO canvas to center
await page.evaluate(() => {
  const canv = document.querySelector(".goo-blob-canvas");
  canv.scrollIntoView({ block: "center", inline: "center" });
});
await page.waitForTimeout(1200);

const boxes = await page.evaluate(() => {
  const hit = document.querySelector(".goo-blob-hit");
  const canv = document.querySelector(".goo-blob-canvas");
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; };
  return { hit: r(hit), canv: r(canv), vw: innerWidth, vh: innerHeight };
});
const { hit, canv } = boxes;
const cx = Math.round(hit.x + hit.w / 2), cy = Math.round(hit.y + hit.h / 2);
const cornerX = Math.round(hit.x + 3), cornerY = Math.round(hit.y + 3);

// clip = intersection of canvas box with viewport
function vclip(box, vh, vw) {
  const x = Math.max(0, Math.round(box.x));
  const y = Math.max(0, Math.round(box.y));
  const x2 = Math.min(vw, Math.round(box.x + box.w));
  const y2 = Math.min(vh, Math.round(box.y + box.h));
  return { x, y, width: Math.max(1, x2 - x), height: Math.max(1, y2 - y) };
}
const clip = vclip(canv, boxes.vh, boxes.vw);

let SHOTN = 0;
async function shot(save) { const buf = await page.screenshot({ clip }); if (save) await page.screenshot({ clip, path: OUT + save }); return buf; }
function mad(a, b) {
  const pa = PNG.sync.read(a), pb = PNG.sync.read(b);
  const n = Math.min(pa.data.length, pb.data.length); let sum = 0, cnt = 0;
  for (let i = 0; i < n; i += 4) { sum += Math.abs(pa.data[i]-pb.data[i])+Math.abs(pa.data[i+1]-pb.data[i+1])+Math.abs(pa.data[i+2]-pb.data[i+2]); cnt += 3; }
  return sum / cnt;
}

const efp = await page.evaluate(({cx,cy,cornerX,cornerY}) => {
  const nm = (x,y) => { const e = document.elementFromPoint(x,y); return e ? String(e.className?.baseVal ?? e.className ?? e.tagName) : null; };
  const isHit = (x,y) => { const e = document.elementFromPoint(x,y); return !!(e && e.classList && e.classList.contains("goo-blob-hit")); };
  return { center: nm(cx,cy), centerIsHit: isHit(cx,cy), corner: nm(cornerX,cornerY), cornerIsHit: isHit(cornerX,cornerY) };
}, {cx,cy,cornerX,cornerY});

// ambient
await page.mouse.move(30, 30); await page.waitForTimeout(400);
const amb = []; for (let i=0;i<5;i++){ amb.push(await shot()); await page.waitForTimeout(90); }
const ambD = []; for (let i=1;i<amb.length;i++) ambD.push(mad(amb[i-1], amb[i]));
const ambMean = ambD.reduce((a,c)=>a+c,0)/ambD.length, ambMax = Math.max(...ambD);

// lean
await page.mouse.move(30,30); await page.waitForTimeout(300);
const preLean = await shot("rest.png");
await page.mouse.move(cx, cy, { steps: 2 });
await page.waitForTimeout(50);
const postLean = await shot("lean.png");
const leanDelta = mad(preLean, postLean);

// center click
await page.mouse.move(cx, cy); await page.waitForTimeout(250);
const preC = await shot("preclick.png");
await page.mouse.click(cx, cy);
const times=[40,110,220,380,600]; let prev=0; const cf=[];
for (const t of times){ await page.waitForTimeout(t-prev); prev=t; cf.push(await shot(`click_${t}.png`)); }
const cD = cf.map(f=>mad(preC,f)); const cMax=Math.max(...cD);

// corner click
await page.mouse.move(30,30); await page.waitForTimeout(300);
await page.mouse.move(cornerX, cornerY); await page.waitForTimeout(200);
const preK = await shot();
const cornerHitEl = await page.evaluate(({x,y}) => { const e=document.elementFromPoint(x,y); return e?String(e.className?.baseVal ?? e.className ?? e.tagName):null; }, {x:cornerX,y:cornerY});
await page.mouse.click(cornerX, cornerY);
prev=0; const kf=[]; for (const t of times){ await page.waitForTimeout(t-prev); prev=t; kf.push(await shot()); }
const kD=kf.map(f=>mad(preK,f)); const kMax=Math.max(...kD);

console.log(JSON.stringify({
  boxes, cx, cy, cornerX, cornerY, clip,
  fallThrough: efp, cornerClickHitEl: cornerHitEl,
  ambient: { deltas: ambD.map(x=>+x.toFixed(2)), mean:+ambMean.toFixed(2), max:+ambMax.toFixed(2) },
  lean: { delta:+leanDelta.toFixed(2) },
  centerClick: { deltas: cD.map(x=>+x.toFixed(2)), max:+cMax.toFixed(2) },
  cornerClick: { deltas: kD.map(x=>+x.toFixed(2)), max:+kMax.toFixed(2) },
}, null, 2));
await page.close(); await b.close();
