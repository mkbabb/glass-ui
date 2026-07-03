// BG.W-MOTION-SPINE — cta-receive re-frame: scroll the dock/target into center, click
// "Add to dock", capture the CTA in flight (fly+reshape+fade+congest ONTO the dock seat).
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-MOTION-SPINE-assets";
const PORT = 9479;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = mkdtempSync(join(tmpdir(), "chrome-cta-"));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${udd}`, "--no-first-run", "--no-default-browser-check", "--window-size=1600,1100", "http://localhost:5200/"], { stdio: "ignore" });
let browser = null;
for (let i = 0; i < 40; i++) { try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; } catch { await wait(500); } }
if (!browser) { console.error("CDP FAILED"); process.exit(2); }
for (const mode of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: mode });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/dock/cta-receive")}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
  await page.waitForTimeout(500);
  await page.evaluate(() => { const t=document.querySelector(".dock-stage-tile"); t&&t.scrollIntoView({block:"center"}); });
  await page.waitForTimeout(300);
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Add to dock/i.test(x.textContent||"")); b&&b.click(); });
  for (const at of [90, 220, 420]) { await wait(at); await page.screenshot({ path: `${OUT}/cta-flight-chrome-${mode}-t${at}.png` }); }
  await wait(1200);
  await page.screenshot({ path: `${OUT}/cta-flight-chrome-${mode}-received.png` });
  await ctx.close();
  console.log(`[cta-reframe] ${mode} done`);
}
await browser.close(); proc.kill("SIGTERM"); console.log("DONE");
