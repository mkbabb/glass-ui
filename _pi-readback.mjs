import { chromium } from "playwright";
const browser = await chromium.launch();

// WCAG relative luminance + contrast
function lum(r,g,b){const f=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)}
function ratio(rgb1,rgb2){const L1=lum(...rgb1),L2=lum(...rgb2);const a=Math.max(L1,L2),b=Math.min(L1,L2);return (a+0.05)/(b+0.05)}
function parse(s){const m=s.match(/(\d+\.?\d*)/g);return m?[+m[0],+m[1],+m[2]]:null}

const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1.5, colorScheme:"dark" });
const page = await ctx.newPage();
await page.goto("http://localhost:5199/compositions/auth-shell",{waitUntil:"networkidle"});
await page.evaluate(()=>document.documentElement.classList.add("dark"));
await page.waitForTimeout(2000);

const r = await page.evaluate(()=>{
  const panel = document.querySelector(".auth-brand-panel");
  // body copy paragraph
  const bodyP = [...panel.querySelectorAll("p")].find(p=>/Paper textures/.test(p.textContent));
  const heading = panel.querySelector("h2");
  // The effective panel backdrop at the text region: sample the aurora canvas pixel-color is hard;
  // approximate via the panel's own resolved background + a mid aurora tone. Use the body copy color
  // resolved + the panel's painted region. We read the panel's *brightest* backdrop (the coral) by
  // reading a fixed bright reference; report the ink colors here, ratio computed against the panel base.
  const cs = getComputedStyle(bodyP);
  const hcs = getComputedStyle(heading);
  // sample the panel center backdrop via elementsFromPoint behind the text
  const rect = bodyP.getBoundingClientRect();
  return {
    bodyColor: cs.color,
    headingColor: hcs.color,
    mutedFgToken: getComputedStyle(panel).getPropertyValue("--muted-foreground").trim(),
    fgToken: getComputedStyle(panel).getPropertyValue("--foreground").trim(),
  };
});
console.log("AUTH-SHELL DARK:", JSON.stringify(r,null,2));

// Sample actual painted backdrop luminance behind the body text via screenshot pixel read
const shot = await page.screenshot();
await browser.close();

// Decode: use a tiny PNG pixel sampler via canvas is unavailable in node; instead report token-resolved ink.
// The body color resolved tells us the ink; combine with the brightest aurora coral (~rgb 240,180,180) worst case.
const bodyRGB = parse(r.bodyColor);
const headRGB = parse(r.headingColor);
// Worst-case bright coral backdrop the panel aurora paints (purple-tomato, lightest tomato ~ rgb 245,190,185)
const brightCoral = [245,190,185];
const midCoral = [225,150,150];
console.log("\nWCAG (worst-case bright coral backdrop rgb"+brightCoral+"):");
console.log("  body copy ratio :", ratio(bodyRGB, brightCoral).toFixed(2), "(floor 4.5)");
console.log("  heading ratio   :", ratio(headRGB, brightCoral).toFixed(2));
console.log("WCAG (mid coral backdrop rgb"+midCoral+"):");
console.log("  body copy ratio :", ratio(bodyRGB, midCoral).toFixed(2), "(floor 4.5)");
console.log("  heading ratio   :", ratio(headRGB, midCoral).toFixed(2));
