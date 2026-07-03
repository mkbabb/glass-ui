// BG.W-MOTION-SPINE — reveal bloom re-frame: the useLiquidReveal surface sits BELOW the
// 900px fold, so the first pass's viewport frames missed it. Scroll the bloom trigger into
// view, click, and capture the FLIP-inversion bloom (scale 0.7->1, opacity 0.6->1,
// blur 1.5->0) IN-FRAME across the morph.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-MOTION-SPINE-assets";
const PORT = 9478;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const udd = mkdtempSync(join(tmpdir(), "chrome-bloom-"));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, `--user-data-dir=${udd}`, "--no-first-run", "--no-default-browser-check", "--window-size=1600,1000", "http://localhost:5200/"], { stdio: "ignore" });
let browser = null;
for (let i = 0; i < 40; i++) { try { browser = await chromium.connectOverCDP(`http://localhost:${PORT}`); break; } catch { await wait(500); } }
if (!browser) { console.error("CDP FAILED"); process.exit(2); }

for (const mode of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: mode });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/motion/reveal")}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
  await page.waitForTimeout(500);
  // scroll the bloom trigger into view (it's in the 2nd StorySection, below the fold)
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Bloom from here/i.test(x.textContent||"")); b&&b.scrollIntoView({block:"center"}); });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/reveal-bloom-chrome-${mode}-rest.png` });
  await page.evaluate(() => { const b=[...document.querySelectorAll("button")].find(x=>/Bloom from here/i.test(x.textContent||"")); b&&b.click(); });
  const stamps = [120, 300, 560];
  let prev = 0;
  for (const at of stamps) { await wait(at - prev); prev = at; await page.screenshot({ path: `${OUT}/reveal-bloom-chrome-${mode}-${at}ms.png` }); }
  await wait(1000);
  await page.screenshot({ path: `${OUT}/reveal-bloom-chrome-${mode}-settled.png` });
  await ctx.close();
  console.log(`[bloom-reframe] ${mode} done`);
}
await browser.close(); proc.kill("SIGTERM"); console.log("DONE");
