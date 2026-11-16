// Critic 7 probe: the merged dock's mark, where no witness has read it since the merge.
//   cnav-*    a collapsible dock: opened, the current seat changed while it is closed,
//             opened again, then changed while open (a #collapsed glyph, and the persistent face)
//   tick-*    a seat BEFORE the current one changes its label (a count that ticks), and a
//             seat is added at the front: the mark (magenta) against the current seat's plate
//   sep-*     separators, #persistent and #persistent-end beside a marked run; and under a
//             host's --radius-dock: 1rem
//   radius-*  a consumer's own box with class rounded-dock / var(--radius-dock)
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const ONLY = (process.env.ONLY ?? "").split(",").filter(Boolean);
const engine = engineName === "webkit" ? webkit : chromium;
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const PATH = "/docs/release-11.1.0/critic-10/probe10/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function shot(page, name, sel = '[data-probe="nav"]', pad = 8) {
    const nav = await page.locator(sel).first().boundingBox();
    const vp = page.viewportSize();
    const x = Math.max(0, Math.floor(nav.x - pad)), y = Math.max(0, Math.floor(nav.y - pad));
    const clip = { x, y, width: Math.min(Math.ceil(nav.width + 2 * pad), vp.width - x), height: Math.min(Math.ceil(nav.height + 2 * pad), vp.height - y) };
    return { clip, png: PNG.sync.read(await page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip })) };
}
const MAGENTA = (r, g, b) => r > 200 && b > 200 && g < 90;
function bbox(png, clip, is) {
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (is(png.data[i], png.data[i + 1], png.data[i + 2])) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { x: x0 + clip.x, y: y0 + clip.y, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
const seatRead = () => {
    const s = document.querySelector('[aria-current="page"]');
    const run = document.querySelector(".dock-run");
    const dock = document.querySelector(".glass-dock");
    const mark = run?.querySelector(":scope > .dock-run-mark");
    const out = { dock: dock ? { cls: dock.className.replace(/\s+/g, " ").slice(0, 160), morphing: dock.hasAttribute("data-morphing"), fits: dock.hasAttribute("data-run-fits") } : null, markEl: !!mark, vars: run ? ["x", "y", "w", "h", "r"].map((k) => run.style.getPropertyValue(`--dock-run-mark-${k}`)).join(" ") : "" };
    if (!s || !run) return out;
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s), port = run.getBoundingClientRect();
    const p = cs.backgroundClip === "content-box" ? [cs.paddingLeft, cs.paddingTop, cs.paddingRight, cs.paddingBottom].map(parseFloat) : [0, 0, 0, 0];
    const plate = { x: r.left + p[0], y: r.top + p[1], w: r.width - p[0] - p[2], h: r.height - p[1] - p[3] };
    const x0 = Math.max(plate.x, port.left), x1 = Math.min(plate.x + plate.w, port.right), y0 = Math.max(plate.y, port.top), y1 = Math.min(plate.y + plate.h, port.bottom);
    const fix = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, +v.toFixed(1)]));
    return { ...out, plate: fix(plate), visible: x1 > x0 && y1 > y0 ? fix({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 }) : null, seatBg: cs.backgroundColor };
};
const near = (a, b, tol = 1.5) => !!a && !!b && ["x", "y", "w", "h"].every((k) => Math.abs(a[k] - b[k]) <= tol);
async function open(page, how) {
    await page.goto(`${base}${PATH}?${how}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
}
async function cell(name, [width, theme], body) {
    if (ONLY.length && !ONLY.some((o) => name.startsWith(o))) return;
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "no-preference" });
    try { const page = await context.newPage(); cells.push({ cell: name, ...(await body(page)) }); }
    catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); }
    finally { await context.close(); }
}
async function step(page, name, tag, centre = true) {
    if (centre) { await page.evaluate(() => document.querySelector('[aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" })); await page.waitForTimeout(900); }
    const seat = await page.evaluate(seatRead);
    const s = await shot(page, `${name}-${tag}`);
    const paint = bbox(s.png, s.clip, MAGENTA);
    return { tag, ...seat, paint, on: near(paint, seat.visible) };
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        const t = `${width}-${theme}`;
        for (const face of ["slot", "persistent"]) for (const shape of ["tab", "icon"]) await cell(`cnav-${face}-${shape}-${t}`, [width, theme], async (page) => {
            const name = `cnav-${face}-${shape}-${t}`;
            await open(page, `scene=cnav&theme=${theme}&shape=${shape}&face=${face}&n=4`);
            const steps = [];
            const doOpen = () => page.evaluate(() => { window.__docks.nav.expand(); window.__docks.nav.keepOpen(); });
            const doClose = () => page.evaluate(() => { window.__docks.nav.release(); window.__docks.nav.collapse(); });
            await doOpen(); await page.waitForTimeout(3000);
            steps.push(await step(page, name, "open-0"));
            await doClose(); await page.waitForTimeout(2200);
            await page.evaluate(() => window.__select(2)); await page.waitForTimeout(900);
            await doOpen(); await page.waitForTimeout(3000);
            steps.push(await step(page, name, "open-after-closed-select"));
            await page.evaluate(() => window.__select(3)); await page.waitForTimeout(2500);
            steps.push(await step(page, name, "select-3"));
            // Select and open in one task: the route changes as the dock opens.
            await doClose(); await page.waitForTimeout(2200);
            await page.evaluate(() => { window.__select(0); window.__docks.nav.expand(); window.__docks.nav.keepOpen(); }); await page.waitForTimeout(3500);
            steps.push(await step(page, name, "select-with-open"));
            return { steps, allOn: steps.every((s) => s.on) };
        });
        for (const n of [8, 4]) await cell(`tick-n${n}-${t}`, [width, theme], async (page) => {
            const name = `tick-n${n}-${t}`;
            await open(page, `scene=tick&theme=${theme}&cur=${n === 8 ? 3 : 2}&n=${n}`);
            const steps = [];
            steps.push(await step(page, name, "load"));
            await page.evaluate(() => window.__label(0, "Overview (128)")); await page.waitForTimeout(2000);
            steps.push(await step(page, name, "longer", false));
            await page.evaluate(() => window.__label(0, "O")); await page.waitForTimeout(2000);
            steps.push(await step(page, name, "shorter", false));
            await page.evaluate(() => window.__insert()); await page.waitForTimeout(2000);
            steps.push(await step(page, name, "inserted", false));
            return { steps, allOn: steps.every((s) => s.on) };
        });
        for (const bar of [0, 1]) for (const shape of ["tab", "icon"]) await cell(`sep-${shape}-${bar ? "bar" : "stadium"}-${t}`, [width, theme], async (page) => {
            const name = `sep-${shape}-${bar ? "bar" : "stadium"}-${t}`;
            await open(page, `scene=sep&theme=${theme}&shape=${shape}&bar=${bar}&cur=1`);
            const steps = [];
            steps.push(await step(page, name, "load"));
            await page.evaluate(() => window.__select(3)); await page.waitForTimeout(2500);
            steps.push(await step(page, name, "select-3"));
            await page.evaluate(() => window.__select(2)); await page.waitForTimeout(2500);
            steps.push(await step(page, name, "select-2"));
            const plate = await page.evaluate(() => { const p = document.querySelector(".dock-plate"), d = document.querySelector(".glass-dock"); const a = getComputedStyle(p), b = getComputedStyle(d); return { plateRadius: a.borderTopLeftRadius, dockRadius: b.borderTopLeftRadius, h: p.getBoundingClientRect().height }; });
            return { steps, plate, allOn: steps.every((s) => s.on) };
        });
        for (const o of ["horizontal", "vertical"]) await cell(`centre-${o}-${t}`, [width, theme], async (page) => {
            await open(page, `scene=cnav&theme=${theme}&shape=icon&face=slot&n=4&orientation=${o}`);
            await page.waitForTimeout(1200);
            const read = await page.evaluate(() => { const d = document.querySelector(".glass-dock").getBoundingClientRect(), g = document.querySelector(".dock-layer--summary svg").getBoundingClientRect(), s = document.querySelector(".dock-layer--summary"), sb = s.getBoundingClientRect(), cs = getComputedStyle(s); return { dock: [d.width, d.height].map((v) => +v.toFixed(1)), glyphOffCentre: [+(g.left + g.width / 2 - d.left - d.width / 2).toFixed(1), +(g.top + g.height / 2 - d.top - d.height / 2).toFixed(1)], summary: [sb.width, sb.height].map((v) => +v.toFixed(1)), summaryOffCentre: [+(sb.left + sb.width / 2 - d.left - d.width / 2).toFixed(1), +(sb.top + sb.height / 2 - d.top - d.height / 2).toFixed(1)], justify: cs.justifyContent, align: cs.alignItems, display: cs.display }; });
            await shot(page, `centre-${o}-${t}`);
            return { read };
        });
        await cell(`radius-${t}`, [width, theme], async (page) => {
            await open(page, `scene=radius&theme=${theme}`);
            const read = await page.evaluate(() => ({ util: getComputedStyle(document.querySelector("#util")).borderTopLeftRadius, viaVar: getComputedStyle(document.querySelector("#var")).borderTopLeftRadius, token: getComputedStyle(document.documentElement).getPropertyValue("--radius-dock") }));
            await shot(page, `radius-${t}`, "#app", 0);
            return { read };
        });
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}${ONLY.length ? "-" + ONLY.join("+") : ""}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 1));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
for (const c of cells) {
    if (c.error) console.log(c.cell, "ERROR", c.error);
    else if (c.steps) console.log(c.cell, c.allOn ? "on" : "OFF", c.steps.map((s) => `${s.tag}: plate ${b(s.visible)} paint ${b(s.paint)}${s.on ? "" : " <<"}`).join(" | "), c.plate ? JSON.stringify(c.plate) : "");
    else console.log(c.cell, JSON.stringify(c.read));
}
const judged = cells.filter((c) => c.steps);
console.log(`VERDICT ${label} ${engineName} ${judged.filter((c) => !c.error && c.allOn).length}/${judged.length} on, ${cells.filter((c) => c.error).length} errors`);
