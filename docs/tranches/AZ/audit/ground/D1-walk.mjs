// LANE D1-hierarchy walk harness (READ-ONLY audit; captures only under AZ/audit/ground/).
// Walks the demo IA, captures full-page hierarchy screenshots + probes heading/label/body proportions.
// Usage: node D1-walk.mjs <route> <outName> [fullPage=1] [waitMs]
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";

const route = process.argv[2] ?? "/";
const outName = process.argv[3] ?? "D1-capture";
const fullPage = (process.argv[4] ?? "1") === "1";
const waitMs = Number(process.argv[5] ?? 1800);

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
await page.waitForTimeout(400);

const out = resolve(HERE, `${outName}.png`);
await page.screenshot({ path: out, fullPage });

// Hierarchy probe: collect the type-scale of the main content region — every heading,
// the section labels, body text — to detect orphaned headings / competing focal points / proportion breaks.
const probe = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const pick = (el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const txt = (el.textContent || "").trim().slice(0, 48);
        return {
            tag: el.tagName.toLowerCase(),
            cls: (el.className || "").toString().slice(0, 60),
            fs: parseFloat(cs.fontSize),
            fw: cs.fontWeight,
            lh: cs.lineHeight,
            color: cs.color,
            mt: parseFloat(cs.marginTop),
            mb: parseFloat(cs.marginBottom),
            x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
            txt,
        };
    };
    // headings + likely "section label" elements (small caps / uppercase / muted)
    const heads = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].slice(0, 30).map(pick);
    const labels = [...main.querySelectorAll("[class*='label'],[class*='eyebrow'],[class*='caption'],.text-xs,.uppercase")]
        .filter((e) => (e.textContent || "").trim().length > 0 && (e.textContent || "").trim().length < 40)
        .slice(0, 20).map(pick);
    // page title region (first big text in main)
    const allText = [...main.querySelectorAll("h1,h2,h3,p,span,div")].filter(e => {
        const t = (e.textContent||"").trim();
        return t.length > 1 && e.children.length === 0;
    });
    const fontSizes = allText.map(e => parseFloat(getComputedStyle(e).fontSize)).filter(n=>n>0);
    fontSizes.sort((a,b)=>b-a);
    const docTitle = document.title;
    return {
        docTitle,
        scrollH: document.documentElement.scrollHeight,
        viewH: window.innerHeight,
        topFontSizes: fontSizes.slice(0, 8),
        headings: heads,
        labels: labels.slice(0, 12),
    };
}).catch((e) => ({ err: "PROBE_ERR: " + e.message }));

console.log(JSON.stringify({ route, out, errors, probe }, null, 2));
await browser.close();
