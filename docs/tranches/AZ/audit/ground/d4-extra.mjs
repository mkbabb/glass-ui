import { chromium } from "playwright";
const BASE = "http://localhost:5199";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground/";
const ROUTES = [
  ["compositions/math-paper", "d4-suf-math-paper-grid"],
  ["foundations/paper-glass", "d4-suf-paper-glass-hero"],
  ["data/metric-stack", "d4-suf-metric-stack-grid"],
  ["compositions/configurator", "d4-thin-configurator"],
  ["containers/accordion", "d4-thin-accordion"],
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
async function park(){ await page.evaluate(()=>{Object.defineProperty(document,"hidden",{value:true,configurable:true});document.dispatchEvent(new Event("visibilitychange"));}); }
for (const [route,name] of ROUTES){
  try{
    await page.goto(`${BASE}/${route}`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForTimeout(1400); await park(); await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}${name}.png`, fullPage: true });
    console.log("OK "+route);
  }catch(e){ console.log("ERR "+route+": "+e.message); }
}
await browser.close(); console.log("DONE");
