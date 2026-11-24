// Witness: mount glass's own surfaces from a tree's built harness, act on each
// (load, hover, press) in light and dark, and record whether the page process
// aborts. One browser per run, a new context per cell, both closed in finally;
// the static server is stopped on exit.
//
// usage: node witness.mjs <dist-dir> <out.json> [webkit|chromium] [cell,cell...]
import { webkit, chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const DIST = process.argv[2];
const OUT = process.argv[3];
const ENGINE = process.argv[4] === "chromium" ? chromium : webkit;
const PICK = process.argv[5] ? new Set(process.argv[5].split(",")) : null;

const CELLS = [
    ["select-trigger", ["hover"]],
    ["toggle-item", ["hover", "press"]],
    ["accordion-trigger", ["hover"]],
    ["checkbox-checked", ["hover", "press"]],
    ["checkbox-unchecked", ["hover", "press"]],
    ["checkbox-disabled-checked", ["hover"]],
    ["radio-checked", ["hover", "press"]],
    ["switch-checked", ["hover", "press"]],
    ["button-destructive", ["hover", "press"]],
    ["input-invalid", ["hover"]],
    ["blob", ["hover"]],
    ["bare-control-surface", ["hover"]],
    ["bare-feedback-tone", ["hover"]],
    ["bare-dock-icon-button", ["hover", "press"]],
    ["bare-dock-icon-button-active", ["hover"]],
    ["bare-dock-tab-button", ["hover", "press"]],
    ["bare-dock-trigger", ["hover", "press"]],
    ["bare-sheet-halo", []],
    ["bare-focus-veil", []],
    ["bare-glass-capsule", ["hover", "press"]],
    ["bare-ghost-slot", ["hover"]],
].filter(([id]) => !PICK || PICK.has(id));

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
    let file = join(DIST, path || "index.html");
    if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) file = join(DIST, "index.html");
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const PORT = server.address().port;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const within = (p, ms) => Promise.race([p, sleep(ms).then(() => { throw new Error("timeout"); })]);

const rows = [];
let browser;
try {
    browser = await ENGINE.launch({ headless: true });
    const version = browser.version();
    for (const mode of ["light", "dark"]) {
        for (const [id, actions] of CELLS) {
            const context = await browser.newContext({ viewport: { width: 900, height: 700 } });
            const row = { mode, cell: id, steps: [], crashed: false, crashedAt: null };
            let crashed = false;
            try {
                const page = await context.newPage();
                page.on("crash", () => { crashed = true; });
                const step = async (name, fn) => {
                    if (crashed) return;
                    let note = null;
                    try {
                        note = await within(fn(), 8000);
                    } catch (e) {
                        note = "error: " + String(e.message || e).split("\n")[0];
                    }
                    await sleep(350);
                    if (crashed) {
                        row.crashed = true;
                        row.crashedAt = name;
                    }
                    row.steps.push({ step: name, crashed, note });
                };
                const read = () => page.evaluate((cid) => {
                    const el = document.querySelector(`[data-target="${cid}"]`);
                    if (!el) return { missing: true };
                    const cs = getComputedStyle(el);
                    return { bg: cs.backgroundColor, filter: cs.filter === "none" ? undefined : cs.filter.slice(0, 160), errors: window.__errors };
                }, id);
                await step("load", async () => {
                    await page.goto(`http://127.0.0.1:${PORT}/index.html?only=${id}&mode=${mode}`);
                    await page.waitForFunction(() => window.__ready === true, null, { timeout: 6000 });
                    return read();
                });
                for (const a of actions) {
                    if (a === "hover") await step("hover", async () => { await page.hover(`[data-target="${id}"]`, { timeout: 4000, force: true }); await sleep(150); return read(); });
                    if (a === "press") await step("press", async () => { await page.mouse.down(); await sleep(200); const r = await read(); await page.mouse.up(); return r; });
                }
            } finally {
                await within(context.close(), 8000).catch(() => {});
            }
            rows.push(row);
            const last = row.steps[row.steps.length - 1];
            console.log(`${row.crashed ? "CRASH" : "ok   "} ${mode.padEnd(5)} ${id.padEnd(30)} ${row.crashed ? "at " + row.crashedAt : JSON.stringify(last?.note).slice(0, 140)}`);
        }
    }
    writeFileSync(OUT, JSON.stringify({ engine: ENGINE.name(), version, dist: DIST, at: new Date().toISOString(), rows }, null, 1));
} finally {
    if (browser) await within(browser.close(), 15000).catch(() => {});
    server.close();
}
process.exit(0);
