// Consumer shapes on a built harness: load one cell in a scheme, then add a
// consumer's token override as a style tag and record whether the page aborts.
// One browser per run, a new context per cell, both closed in finally.
// usage: node consumer.mjs <dist> <out.json>
import { webkit } from "playwright";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const [DIST, OUT] = process.argv.slice(2);
const CASES = [
    // value.js demo/styles/foundation.css:707, under .dark
    ["valuejs-dark-shadow-mix", "blob", "dark", ".dark { --shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background)); }", null],
    ["valuejs-dark-shadow-mix", "blob", "light", ".dark { --shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background)); }", null],
    // control: a plain dark shadow colour (daraksha's form)
    ["plain-shadow", "blob", "dark", ":root, .dark { --shadow-color: oklch(18% 0.03 356); }", null],
    // any consumer whose --shadow-color is a mix in light
    ["light-shadow-mix", "blob", "light", ":root { --shadow-color: color-mix(in oklab, var(--foreground) 60%, transparent); }", null],
    // hover with a consumer card that is a mix and an ink that is a mix
    ["card-and-ink-mix", "bare-control-surface", "light", ":root { --card: color-mix(in oklab, white, var(--background) 30%); --glass-veil-ink: color-mix(in oklab, black, var(--foreground) 40%); }", "hover"],
    ["card-mix-only", "bare-control-surface", "light", ":root { --card: color-mix(in oklab, white, var(--background) 30%); }", "hover"],
];
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const server = createServer((req, res) => {
    const p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
    let f = join(DIST, p || "index.html");
    if (!f.startsWith(DIST) || !existsSync(f) || statSync(f).isDirectory()) f = join(DIST, "index.html");
    res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" });
    res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
let browser;
try {
    browser = await webkit.launch({ headless: true });
    for (const [name, cell, mode, css, action] of CASES) {
        const context = await browser.newContext({ viewport: { width: 900, height: 700 } });
        const row = { name, cell, mode, action, crashed: false, at: null, read: null };
        try {
            const page = await context.newPage();
            let crashed = false;
            page.on("crash", () => (crashed = true));
            try {
                await page.goto(`http://127.0.0.1:${port}/index.html?only=${cell}&mode=${mode}`);
                await page.waitForFunction(() => window.__ready === true, null, { timeout: 6000 });
                await page.addStyleTag({ content: css });
                await sleep(400);
                if (crashed) row.at = "override";
                if (!crashed && action === "hover") {
                    await page.hover(`[data-target="${cell}"]`, { timeout: 4000, force: true });
                    await sleep(400);
                    if (crashed) row.at = "hover";
                }
                if (!crashed)
                    row.read = await page.evaluate((c) => {
                        const el = document.querySelector(`[data-target="${c}"]`);
                        const cs = getComputedStyle(el);
                        return { bg: cs.backgroundColor, filter: cs.filter.slice(0, 120), shadow: getComputedStyle(document.documentElement).getPropertyValue("--shadow-color").trim() };
                    }, cell);
            } catch (e) {
                row.error = String(e.message || e).split("\n")[0];
            }
            row.crashed = crashed;
        } finally {
            await context.close().catch(() => {});
        }
        rows.push(row);
        console.log(`${row.crashed ? "CRASH" : "ok   "} ${name.padEnd(26)} ${cell.padEnd(22)} ${mode.padEnd(5)} ${row.at ?? ""} ${JSON.stringify(row.read ?? row.error ?? "").slice(0, 150)}`);
    }
    writeFileSync(OUT, JSON.stringify({ engine: "webkit", version: browser.version(), dist: DIST, rows }, null, 1));
} finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
}
