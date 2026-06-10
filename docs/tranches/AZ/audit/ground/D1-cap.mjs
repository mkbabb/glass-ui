// LANE D1 full-content capture — expands the inner scroll <main> so a full-page shot
// shows the whole page hierarchy. READ-ONLY audit; captures only under AZ/audit/ground/.
// Usage: node D1-cap.mjs <route> <outName> [waitMs]
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";
const route = process.argv[2] ?? "/";
const outName = process.argv[3] ?? "D1-capture";
const waitMs = Number(process.argv[4] ?? 1600);

const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => errors.push("GOTO: " + e.message));
await page.waitForTimeout(Math.min(waitMs, 2500));
await page.evaluate(() => {
    try { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); } catch {}
}).catch(() => {});
await page.waitForTimeout(300);

// Expand the inner scroll <main> to its full content height so the screenshot captures everything.
const dims = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return { ok: false };
    const sh = main.scrollHeight;
    main.style.overflow = "visible";
    main.style.height = "auto";
    main.style.maxHeight = "none";
    main.style.minHeight = sh + "px";
    // Also let the body grow.
    document.documentElement.style.height = "auto";
    return { ok: true, sh };
}).catch(() => ({ ok: false }));
await page.waitForTimeout(250);

const out = resolve(HERE, `${outName}.png`);
await page.screenshot({ path: out, fullPage: true });

const probe = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const pick = (el) => {
        const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
        return { tag: el.tagName.toLowerCase(), cls: (el.className||"").toString().slice(0,50),
            fs: parseFloat(cs.fontSize), fw: cs.fontWeight, color: cs.color,
            y: Math.round(r.y), w: Math.round(r.width), txt: (el.textContent||"").trim().slice(0,40) };
    };
    const heads = [...main.querySelectorAll("h1,h2,h3,h4,h5,h6")].slice(0,40).map(pick);
    return { headings: heads, nHead: main.querySelectorAll("h1,h2,h3,h4,h5,h6").length };
}).catch((e) => ({ err: e.message }));

console.log(JSON.stringify({ route, out, sh: dims.sh, errors, probe }, null, 2));
await browser.close();
