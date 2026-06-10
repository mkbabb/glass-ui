// LANE A3 reverify capture helper (READ-ONLY audit; captures only under AZ/audit/ground/).
// Usage: node _a3-cap.mjs <route> <outName> [waitMs] [selectorToProbe]
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";

const route = process.argv[2] ?? "/";
const outName = process.argv[3] ?? "a3-capture";
const waitMs = Number(process.argv[4] ?? 1500);

const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=metal"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => errors.push("GOTO: " + e.message));
await page.waitForTimeout(Math.min(waitMs, 2500));
// Park any live WebGL surface before the long wait (aurora/blob lag-safe).
await page.evaluate(() => {
    try {
        Object.defineProperty(document, "hidden", { value: true, configurable: true });
        document.dispatchEvent(new Event("visibilitychange"));
    } catch {}
}).catch(() => {});
await page.waitForTimeout(500);

const out = resolve(HERE, `${outName}.png`);
await page.screenshot({ path: out, fullPage: false });

// Optional DOM probe via env PROBE (a JS expression returning a serializable value).
let probe = null;
if (process.env.PROBE) {
    probe = await page.evaluate(process.env.PROBE).catch((e) => "PROBE_ERR: " + e.message);
}
console.log(JSON.stringify({ route, out, errors, probe }, null, 2));
await browser.close();
