// Consumer values on a built harness: load one cell in a scheme, add a real
// consumer's token overrides as a style tag (its own tokens written as the
// literals it declares), act on the cell, and record whether the page aborts.
// The cases are the overrides probe/exposure.mjs found in consumer source.
// One browser per run, a new context per case, both closed in finally; the
// static server is stopped on exit.
//
// usage: node consumers.mjs <dist> <out.json> [case-name-prefix]
import { webkit } from "playwright";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const [DIST, OUT, ONLY] = process.argv.slice(2);

// value.js demo/styles/foundation.css:707 (under .dark), :968 and :971 (more contrast).
const VALUEJS_SHADOW = ".dark { --shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background)); }";
const VALUEJS_CONTRAST = ":root, .dark { --border: color-mix(in oklab, var(--foreground) 78%, var(--background)); --muted-foreground: color-mix(in oklab, var(--foreground) 88%, var(--background)); }";
// hassio-config frontend: tiles/css/plate.css:77 sets the card's accent to
// styles/tokens.css:103, a mix whose first arm is itself a mix.
const HASSIO_ACCENT = '[data-target="card"] { --glass-accent: color-mix(in oklab, color-mix(in oklab, #2e9d5b 70%, #1c1917) 62%, transparent); --glass-accent-strength: 100%; }';
// hassio-config styles/tokens.css:156-167 (.switch, unchecked bits) and :174 (.choose-bit).
const HASSIO_SWITCH = '[data-target="switch-checked"] { --control-checked-bg: color-mix(in oklab, var(--foreground) 40%, transparent); --card: oklch(0.95 0.01 80); }';
const HASSIO_BIT = '[data-target="checkbox-unchecked"] { --control-bit-fill: color-mix(in oklab, var(--foreground) 14%, transparent); --shadow-md: 0 1px 3px color-mix(in oklab, var(--foreground) 18%, transparent); }';
const HASSIO_CHOOSE = '[data-target="checkbox-checked"], [data-target="radio-checked"] { --control-checked-bg: color-mix(in srgb, var(--foreground) 88%, var(--glass-plate-floating)); }';
// slides styles/deck.css:173-175 (light) and :805-807 (dark), its cream ink as the literal.
const SLIDES_BORDERS = ":root { --glass-border-quiet: color-mix(in srgb, var(--foreground) 18%, transparent); --glass-border-resting: color-mix(in srgb, var(--foreground) 28%, transparent); --glass-border-floating: color-mix(in srgb, var(--foreground) 32%, transparent); } .dark { --glass-border-quiet: color-mix(in srgb, hsl(45 30% 92%) 14%, transparent); --glass-border-resting: color-mix(in srgb, hsl(45 30% 92%) 22%, transparent); --glass-border-floating: color-mix(in srgb, hsl(45 30% 92%) 28%, transparent); }";
// parkway src/style.css:108 (light ink) and :152 (dark card), its paper and ink as literals.
const PARKWAY = ":root:not(.dark) { --glass-veil-ink: color-mix(in oklab, #e6e9dc 35%, white); } .dark { --card: color-mix(in oklab, #0d1a1b 88%, #928f84); }";
// A card that is a mix under the light-backdrop ink flip (ladder.css), the
// form speedtest's survey card reaches for (its own is self-referential).
const CARD_MIX_LIGHT_BACKDROP = ":root, .dark { --glass-backdrop: light; --card: color-mix(in oklab, white 92%, transparent); }";

// Values no consumer sets today, for the shapes the self-mix sweep and the
// exposure probe still name on the cure: an ink that is a mix (both endpoints of
// four declarations reach it), and an accent that is a mix on a surface whose
// border rung is glass's own mix.
const WHATIF_INK = ":root, .dark { --foreground: color-mix(in oklab, #1c1917 90%, #7c2d12); }";
const WHATIF_ACCENT = '[data-target="bare-dock-icon-button"] { --glass-accent: color-mix(in oklab, #2e9d5b 62%, transparent); --glass-accent-strength: 100%; }';

const CASES = [];
const add = (name, css, cells, modes = ["light", "dark"]) => {
    if (ONLY && !name.startsWith(ONLY)) return;
    for (const [cell, action] of cells) for (const mode of modes) CASES.push({ name, css, cell, mode, action });
};
add("valuejs-shadow", VALUEJS_SHADOW, [["blob", "hover"], ["blob-prm", null], ["card", "hover"], ["bare-control-surface", "hover"]]);
add("valuejs-contrast", VALUEJS_CONTRAST, [["select-trigger", "hover"], ["bare-segmented-tab", "hover"], ["card", "hover"], ["input-invalid", "hover"]]);
add("hassio-accent", HASSIO_ACCENT, [["card", "hover"]]);
add("hassio-switch", HASSIO_SWITCH, [["switch-checked", "press"]]);
add("hassio-bit", HASSIO_BIT, [["checkbox-unchecked", "press"]]);
add("hassio-choose", HASSIO_CHOOSE, [["checkbox-checked", "press"], ["radio-checked", "press"]]);
add("slides-borders", SLIDES_BORDERS, [["bare-dock-plate", null], ["card", "hover"], ["select-trigger", "hover"], ["bare-dock-icon-button", "press"]]);
add("parkway", PARKWAY, [["bare-control-surface", "hover"], ["card", "hover"], ["checkbox-checked", "press"], ["bare-dock-icon-button", "press"], ["bare-glass-well", null], ["bare-segmented-tab", "hover"]]);
add("what-if-ink-mix", WHATIF_INK, [["bare-segmented-tab", "hover"], ["checkbox-checked", "press"], ["checkbox-unchecked", "hover"], ["bare-dock-plate", null], ["card", "hover"], ["bare-control-surface", "hover"]]);
add("what-if-accent-mix", WHATIF_ACCENT, [["bare-dock-icon-button", "press"]]);
add("card-mix-light-backdrop", CARD_MIX_LIGHT_BACKDROP, [["card", "hover"], ["bare-glass-well", null], ["checkbox-checked", "press"], ["bare-segmented-tab", "hover"], ["bare-dock-icon-button", "press"], ["bare-configurator-loading", null], ["bare-control-surface", "hover"]]);

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
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
const within = (p, ms) => Promise.race([p, sleep(ms).then(() => { throw new Error("timeout"); })]);

const rows = [];
let browser;
try {
    browser = await webkit.launch({ headless: true });
    for (const c of CASES) {
        const target = c.cell.replace(/-prm$/, "");
        const context = await browser.newContext({ viewport: { width: 900, height: 700 }, reducedMotion: c.cell.endsWith("-prm") ? "reduce" : "no-preference" });
        const row = { ...c, css: undefined, crashed: false, at: null, read: null };
        try {
            const page = await context.newPage();
            let crashed = false;
            page.on("crash", () => (crashed = true));
            try {
                await page.goto(`http://127.0.0.1:${port}/index.html?only=${target}&mode=${c.mode}`);
                await page.waitForFunction(() => window.__ready === true, null, { timeout: 6000 });
                await page.addStyleTag({ content: c.css });
                await sleep(400);
                if (crashed) row.at = "override";
                if (!crashed && c.action === "hover") {
                    await within(page.hover(`[data-target="${target}"]`, { timeout: 4000, force: true }), 6000);
                    await sleep(400);
                    if (crashed) row.at = "hover";
                }
                if (!crashed && c.action === "press") {
                    await within(page.hover(`[data-target="${target}"]`, { timeout: 4000, force: true }), 6000);
                    await page.mouse.down();
                    await sleep(400);
                    if (crashed) row.at = "press";
                    else await page.mouse.up();
                }
                if (!crashed)
                    row.read = await within(page.evaluate((t) => {
                        const el = document.querySelector(`[data-target="${t}"]`);
                        if (!el) return { missing: true };
                        const cs = getComputedStyle(el);
                        return { bg: cs.backgroundColor, border: cs.borderTopColor, filter: cs.filter === "none" ? undefined : cs.filter.slice(0, 120) };
                    }, target), 6000);
            } catch (e) {
                row.error = String(e.message || e).split("\n")[0];
            }
            row.crashed = crashed;
        } finally {
            await within(context.close(), 8000).catch(() => {});
        }
        rows.push(row);
        console.log(`${row.crashed ? "CRASH" : "ok   "} ${c.name.padEnd(24)} ${c.cell.padEnd(26)} ${c.mode.padEnd(5)} ${row.at ?? ""} ${JSON.stringify(row.read ?? row.error ?? "").slice(0, 130)}`);
    }
    writeFileSync(OUT, JSON.stringify({ engine: "webkit", version: browser.version(), dist: DIST, at: new Date().toISOString(), cases: Object.fromEntries(CASES.map((c) => [c.name, c.css])), rows }, null, 1));
} finally {
    if (browser) await within(browser.close(), 15000).catch(() => {});
    server.close();
}
process.exit(0);
