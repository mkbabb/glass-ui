import { chromium } from "playwright";
import { PNG } from "pngjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.goto("http://localhost:5200/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(3800);
await page.evaluate(() => document.querySelector(".goo-blob-canvas").scrollIntoView({ block: "center" }));
await page.waitForTimeout(1000);
const geo = await page.evaluate(() => {
  const hit = document.querySelector(".goo-blob-hit");
  const canv = document.querySelector(".goo-blob-canvas");
  const R = (el)=>{const b=el.getBoundingClientRect();return{x:b.x,y:b.y,w:b.width,h:b.height};};
  return { hit: R(hit), canv: R(canv), vh: innerHeight, vw: innerWidth };
});
const cx = Math.round(geo.hit.x + geo.hit.w/2), cy = Math.round(geo.hit.y + geo.hit.h/2);
const clip = { x: Math.max(0,Math.round(geo.canv.x)), y: Math.max(0,Math.round(geo.canv.y)),
  width: Math.min(geo.vw,Math.round(geo.canv.x+geo.canv.w))-Math.max(0,Math.round(geo.canv.x)),
  height: Math.min(geo.vh,Math.round(geo.canv.y+geo.canv.h))-Math.max(0,Math.round(geo.canv.y)) };
const shot = async (p)=> p ? await page.screenshot({clip, path: OUT+p}) : await page.screenshot({clip});
const mad=(a,b)=>{const pa=PNG.sync.read(a),pb=PNG.sync.read(b);const n=Math.min(pa.data.length,pb.data.length);let s=0,c=0;for(let i=0;i<n;i+=4){s+=Math.abs(pa.data[i]-pb.data[i])+Math.abs(pa.data[i+1]-pb.data[i+1])+Math.abs(pa.data[i+2]-pb.data[i+2]);c+=3;}return s/c;};

async function selectPreset(label) {
  await page.evaluate((lbl) => {
    const btns = [...document.querySelectorAll(".configurator-presets button, .configurator-presets [role='button'], .configurator-presets [role='radio']")];
    const el = btns.find(b => b.innerText.trim().toLowerCase().startsWith(lbl.toLowerCase()));
    if (el) el.click();
  }, label);
  await page.waitForTimeout(900); // let per-preset clone load + palette ramp
}

async function measure(label, save) {
  await selectPreset(label);
  await page.mouse.move(30, 30); await page.waitForTimeout(500);
  const rest = await shot(save ? `preset_${label}_rest.png` : null);
  // ambient noise
  await page.waitForTimeout(120); const amb = await shot();
  const ambD = mad(rest, amb);
  // move pointer into SDF centre — measure the lean/attract response
  await page.mouse.move(cx, cy, { steps: 2 }); await page.waitForTimeout(120);
  const lean = await shot(save ? `preset_${label}_lean.png` : null);
  const leanD = mad(rest, lean);
  // click impulse
  await page.mouse.click(cx, cy); await page.waitForTimeout(140);
  const click = await shot(save ? `preset_${label}_click.png` : null);
  const clickD = mad(lean, click);
  await page.mouse.move(30,30); await page.waitForTimeout(400);
  return { label, ambient:+ambD.toFixed(2), leanDelta:+leanD.toFixed(2), clickDelta:+clickD.toFixed(2), leanVsAmbient:+(leanD/Math.max(ambD,0.01)).toFixed(1) };
}

const results = [];
for (const p of ["Calm","Serene","Excited","Playful","Shy"]) results.push(await measure(p, true));
console.log(JSON.stringify(results, null, 2));
await page.close(); await b.close();
