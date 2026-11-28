// Checks the rows of WEBKIT-REPORT.md: each value on its own one-element page,
// applied on load (or on hover), and records whether the page process aborts.
// One browser per run, a new context per row, both closed in finally.
//
// usage: [PW=<path to a playwright-core index.mjs>] node report-rows.mjs <reduced.html> <out.json> [webkit|chromium]
// PW picks the Playwright, and so the WebKit build, to drive; the default is glass's own.
const { webkit, chromium } = await import(process.env.PW ?? "playwright");
import { readFileSync, writeFileSync } from "node:fs";

const [REDUCED, OUT, ENG] = process.argv.slice(2);
const ENGINE = ENG === "chromium" ? chromium : webkit;
const M = "color-mix(in srgb, red, blue)";
const M2 = "color-mix(in srgb, green, white)";
const X = `color-mix(in oklab, ${M}, ${M2})`;
const C = "oklch(0.3 0.03 70)";

const bg = (v) => `.box { background-color: ${v}; }`;
const ROWS = [
    ["abort", "both arms a mix", bg(X)],
    ["abort", "translucent arms", bg(`color-mix(in oklab, color-mix(in srgb, rgb(255 0 0 / .5), blue), color-mix(in srgb, green, rgb(255 255 255 / .5)))`)],
    ["abort", "transparent arms", bg(`color-mix(in oklab, color-mix(in srgb, red, transparent), color-mix(in srgb, green, transparent))`)],
    ["abort", "currentcolor arms", bg(`color-mix(in oklab, color-mix(in srgb, currentcolor, blue), color-mix(in srgb, currentcolor, white))`)],
    ["abort", "both arms the same mix", bg(`color-mix(in oklab, ${M}, ${M})`)],
    ["abort", "outer in srgb", bg(`color-mix(in srgb, ${M}, ${M2})`)],
    ["abort", "outer in oklch", bg(`color-mix(in oklch, ${M}, ${M2})`)],
    ["abort", "one arm a mix of a mix", bg(`color-mix(in oklab, ${M}, color-mix(in srgb, ${M} 50%, transparent))`)],
    ["abort", "mix + relative of mix", bg(`color-mix(in oklab, ${M}, oklch(from ${M} l c h) 35%)`)],
    ["abort", "relative of mix both", bg(`color-mix(in oklab, oklch(from ${M} l c h), oklch(from ${M} l c h) 35%)`)],
    ["abort", "light-dark holding a mix both", bg(`color-mix(in oklab, light-dark(${M}, red), light-dark(${M2}, blue) 35%)`)],
    ["render", "one arm a mix", bg(`color-mix(in oklab, ${M}, red 35%)`)],
    ["render", "mix and transparent", bg(`color-mix(in oklab, ${M} 50%, transparent)`)],
    ["render", "three levels one mixed arm each", bg(`color-mix(in oklab, color-mix(in oklab, ${M} 50%, transparent) 50%, transparent)`)],
    ["render", "two relative colours of a plain colour", bg(`color-mix(in oklab, oklch(from ${C} l c h / 0.1), oklch(from ${C} l c h / 0.14) 35%)`)],
    ["render", "relative of mix + plain", bg(`color-mix(in oklab, oklch(from ${M} l c h), red 35%)`)],
    ["render", "two plain light-dark", bg(`color-mix(in oklab, light-dark(red, blue), light-dark(green, white) 35%)`)],
    ["render", "mix + plain light-dark", bg(`color-mix(in oklab, ${M}, light-dark(red, blue) 35%)`)],
    ["abort", "color", `.box { color: ${X}; }`],
    ["abort", "border-top-color", `.box { border-top: 2px solid ${X}; }`],
    ["abort", "outline-color", `.box { outline: 2px solid ${X}; }`],
    ["abort", "box-shadow", `.box { box-shadow: 0 0 4px ${X}; }`],
    ["abort", "text-shadow", `.box { text-shadow: 0 0 2px ${X}; }`],
    ["abort", "filter drop-shadow", `.box { filter: drop-shadow(0 0 2px ${X}); }`],
    ["abort", "gradient stop", `.box { background-image: linear-gradient(${X}, red); }`],
    ["abort", "svg fill", `.box circle { fill: ${X}; }`],
    ["abort", "two registered colour arms", `@property --a { syntax: "<color>"; inherits: false; initial-value: transparent; } @property --b { syntax: "<color>"; inherits: false; initial-value: transparent; } .box { --a: ${M}; --b: ${M2}; background-color: color-mix(in oklab, var(--a), var(--b)); }`],
    ["render", "one registered colour arm + plain", `@property --a { syntax: "<color>"; inherits: false; initial-value: transparent; } .box { --a: ${M}; background-color: color-mix(in oklab, var(--a), red); }`],
    ["abort-hover", "on hover", `.box:hover { background-color: ${X}; }`],
];

const page = (css) => `<!doctype html><html><head><style>.box { width: 200px; height: 60px; } ${css}</style></head><body><div class="box">text<svg width="20" height="20"><circle cx="10" cy="10" r="8"/></svg></div></body></html>`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
let browser;
try {
    browser = await ENGINE.launch({ headless: true });
    const cells = [["abort", "reduced.html", null, readFileSync(REDUCED, "utf8")], ...ROWS.map((r) => [...r, page(r[2])])];
    for (const [expect, name, , html] of cells) {
        const context = await browser.newContext();
        const row = { expect, name, crashed: false, read: null };
        try {
            const p = await context.newPage();
            let crashed = false;
            p.on("crash", () => (crashed = true));
            try {
                await p.setContent(html, { timeout: 6000 });
                await sleep(300);
                if (!crashed && expect === "abort-hover") { await p.hover(".box", { timeout: 4000 }); await sleep(300); }
                if (!crashed) row.read = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector(".box")); return cs.backgroundColor; });
            } catch (e) { row.error = String(e.message || e).split("\n")[0]; }
            row.crashed = crashed;
        } finally {
            await context.close().catch(() => {});
        }
        row.matches = row.expect.startsWith("abort") ? row.crashed : !row.crashed;
        rows.push(row);
        console.log(`${row.matches ? "as-report" : "DIFFERS  "} ${row.crashed ? "abort " : "render"} ${name} ${row.read ?? ""}`);
    }
    writeFileSync(OUT, JSON.stringify({ engine: ENGINE.name(), version: browser.version(), rows }, null, 1));
} finally {
    if (browser) await browser.close().catch(() => {});
}
process.exit(0);
