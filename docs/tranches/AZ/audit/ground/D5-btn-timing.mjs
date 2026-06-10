import { chromium } from "playwright-core";
const BASE = "http://localhost:5199";
const b = await chromium.launch({ headless: true });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(`${BASE}/display/buttons`, { waitUntil: "domcontentloaded" });
await page.evaluate(() => { try{Object.defineProperty(document,"hidden",{value:true,configurable:true});document.dispatchEvent(new Event("visibilitychange"));}catch{} });
await page.waitForTimeout(700);
const res = await page.evaluate(() => {
  const sample = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const cs = getComputedStyle(el);
    const props = cs.transitionProperty.split(",").map(s=>s.trim());
    const tims = cs.transitionTimingFunction.split(/,(?![^()]*\))/).map(s=>s.trim());
    const map = props.map((p,i)=>`${p}=${tims[i]||tims[0]}`);
    return { sel, map };
  };
  // find a default button + a glass button + the audacious CTA
  const out = {};
  // default button: first .btn-pill
  const def = document.querySelector("button");
  if (def) { const cs=getComputedStyle(def); out.firstButtonFull = { props: cs.transitionProperty, tims: cs.transitionTimingFunction, classes: def.className.slice(0,160) }; }
  // hunt explicitly for a button with 'scale' in its transition and report the scale leg's timing
  let scaleLeg = null;
  for (const el of document.querySelectorAll("button")) {
    const cs = getComputedStyle(el);
    const props = cs.transitionProperty.split(",").map(s=>s.trim());
    const idx = props.indexOf("scale");
    if (idx >= 0) {
      const tims = cs.transitionTimingFunction.split(/,(?![^()]*\))/).map(s=>s.trim());
      scaleLeg = { classes: el.className.slice(0,120), scaleTiming: tims[idx] || tims[0], allProps: props.join("|"), allTims: tims.join(" || ") };
      break;
    }
  }
  out.scaleLeg = scaleLeg;
  // resolve the spring token to compare
  out.springSmooth = getComputedStyle(document.documentElement).getPropertyValue("--spring-smooth").trim().slice(0,40);
  return out;
});
await b.close();
console.log(JSON.stringify(res, null, 2));
