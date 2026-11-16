// Critic 8 probe: the run's selected plate where the dock does not sit on the page at
// rest and at 1:1. The plate is painted magenta (--dock-control-active-bg) and its box is
// read from the screenshot against the current control's own plate box (viewport px).
//   zoom-*    an ancestor with CSS zoom 1.25 and 0.8
//   scale-*   an ancestor with a static transform: scale(0.8)
//   grow-*    an ancestor that grows in from scale(0.8) while the dock mounts
//   dialog-*  the dock inside the library's Dialog, which blooms in as it opens
//   tdialog-* a Table inside the library's Dialog: the container paints no plate
//   dynslot-* a collapsed dock with a #persistent control: the #collapsed slot comes after
//             mount, or goes; the summary is the "Expand dock" button exactly while it has content
// Each mark cell reads at rest, then after the current control changes.
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
const PATH = "/docs/release-11.1.0/fix-9/probe11/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

async function shot(page, name, sel = '[data-probe="nav"]', pad = 10) {
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
// The current control's plate box in viewport px: its border box, less its padding when
// its fill is clipped to the content box (a glyph control). The padding is scaled by the
// control's own visual scale (rect over layout box), so the read holds under zoom and scale.
const seatRead = () => {
    const s = document.querySelector('[data-probe="nav"] [aria-current="page"]');
    const run = document.querySelector('[data-probe="nav"] .dock-run');
    const mark = run?.querySelector(":scope > .dock-run-mark");
    const out = { markEl: !!mark, vars: run ? ["x", "y", "w", "h", "r"].map((k) => run.style.getPropertyValue(`--dock-run-mark-${k}`)).join(" ") : "" };
    if (!s || !run) return out;
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s), port = run.getBoundingClientRect();
    const k = s.offsetWidth ? r.width / s.offsetWidth : 1;
    const p = cs.backgroundClip === "content-box" ? [cs.paddingLeft, cs.paddingTop, cs.paddingRight, cs.paddingBottom].map((v) => parseFloat(v) * k) : [0, 0, 0, 0];
    const plate = { x: r.left + p[0], y: r.top + p[1], w: r.width - p[0] - p[2], h: r.height - p[1] - p[3] };
    const x0 = Math.max(plate.x, port.left), x1 = Math.min(plate.x + plate.w, port.right), y0 = Math.max(plate.y, port.top), y1 = Math.min(plate.y + plate.h, port.bottom);
    const fix = (o) => Object.fromEntries(Object.entries(o).map(([key, v]) => [key, +v.toFixed(1)]));
    return { ...out, k: +k.toFixed(3), layout: [s.offsetLeft, s.offsetTop, s.offsetWidth, s.offsetHeight], plate: fix(plate), visible: x1 > x0 && y1 > y0 ? fix({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 }) : null };
};
const near = (a, b, tol = 2) => !!a && !!b && ["x", "y", "w", "h"].every((key) => Math.abs(a[key] - b[key]) <= tol);
async function open(page, how) {
    await page.goto(`${base}${PATH}?${how}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
}
async function cell(name, [width, theme], body) {
    if (ONLY.length && !ONLY.some((o) => name.startsWith(o))) return;
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "no-preference" });
    try { const page = await context.newPage(); cells.push({ cell: name, ...(await body(page)) }); }
    catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); }
    finally { await context.close(); }
}
async function step(page, name, tag) {
    // Bring the current control into the run's port first (a phone-width run scrolls).
    await page.evaluate(() => document.querySelector('[data-probe="nav"] [aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest" }));
    await page.waitForTimeout(900);
    const seat = await page.evaluate(seatRead);
    const s = await shot(page, `${name}-${tag}`);
    const paint = bbox(s.png, s.clip, MAGENTA);
    return { tag, ...seat, paint, on: near(paint, seat.visible) };
}
async function markCell(name, vp, how, before) {
    await cell(name, vp, async (page) => {
        await open(page, `${how}&theme=${vp[1]}`);
        if (before) await before(page);
        await page.waitForTimeout(1600);
        const steps = [await step(page, name, "rest")];
        await page.evaluate(() => window.__select(3));
        await page.waitForTimeout(1400);
        steps.push(await step(page, name, "moved"));
        return { steps, allOn: steps.every((s) => s.on) };
    });
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        const t = `${width}-${theme}`, vp = [width, theme];
        for (const shape of ["tab", "icon"]) {
            const q = `shape=${shape}`;
            await markCell(`plain-${shape}-${t}`, vp, `scene=wrap&${q}`);
            await markCell(`zoom125-${shape}-${t}`, vp, `scene=wrap&${q}&z=1.25`);
            await markCell(`zoom080-${shape}-${t}`, vp, `scene=wrap&${q}&z=0.8`);
            await markCell(`scale-${shape}-${t}`, vp, `scene=wrap&${q}&sc=0.8`);
            await markCell(`grow-${shape}-${t}`, vp, `scene=wrap&${q}&grow=1`);
            await markCell(`dialog-${shape}-${t}`, vp, `scene=dialog&${q}`, async (page) => { await page.waitForTimeout(400); await page.evaluate(() => window.__open()); });
        }
        await cell(`tdialog-${t}`, vp, async (page) => {
            await open(page, `scene=tdialog&theme=${theme}`);
            await page.waitForTimeout(400);
            await page.evaluate(() => window.__open());
            await page.waitForTimeout(1500);
            const read = await page.evaluate(() => {
                const one = (probe) => {
                    const c = document.querySelector(`[data-probe="${probe}"] .table-container, [data-probe="${probe}"] [data-slot="table-container"]`);
                    if (!c) return null;
                    const cs = getComputedStyle(c);
                    return { background: cs.backgroundColor, image: cs.backgroundImage, shadow: cs.boxShadow, radius: cs.borderTopLeftRadius, overflow: cs.overflow };
                };
                const dlg = document.querySelector('[data-slot="dialog-content"]');
                return { page: one("page-table"), dialog: one("dialog-table"), dialogClass: dlg ? dlg.className.split(/\s+/).filter((c) => c.startsWith("glass")).join(" ") : null };
            });
            const clear = (x) => !!x && (x.background === "rgba(0, 0, 0, 0)" || x.background === "transparent") && x.image === "none" && x.shadow === "none";
            await shot(page, `tdialog-${t}`, '[data-slot="dialog-content"]', 12);
            return { read, pass: !!read.page && !clear(read.page) && clear(read.dialog) && parseFloat(read.dialog.radius) > 0 };
        });
        for (const dir of ["comes", "goes"]) {
            await cell(`dynslot-${dir}-${t}`, vp, async (page) => {
                await open(page, `scene=dynslot&theme=${theme}${dir === "goes" ? "&slot0=1" : ""}`);
                await page.waitForTimeout(900);
                const summary = () => { const s = document.querySelector(".dock-layer--summary"); const r = s.getBoundingClientRect(); return { role: s.getAttribute("role"), tabindex: s.getAttribute("tabindex"), label: s.getAttribute("aria-label"), kids: s.childNodes.length, box: [+r.width.toFixed(1), +r.height.toFixed(1)], dock: document.querySelector(".glass-dock").className.includes("collapsed") }; };
                const before = await page.evaluate(summary);
                await shot(page, `dynslot-${dir}-${t}-before`);
                await page.evaluate((v) => window.__slot(v), dir === "comes");
                await page.waitForTimeout(1200);
                const after = await page.evaluate(summary);
                await shot(page, `dynslot-${dir}-${t}-after`);
                const button = (x) => x.role === "button" && x.tabindex === "0" && !!x.label;
                const bare = (x) => x.role === null && x.tabindex === null && x.label === null;
                const pass = dir === "comes" ? bare(before) && button(after) : button(before) && bare(after);
                return { read: { before, after }, pass };
            });
        }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}${ONLY.length ? "-" + ONLY.join("+") : ""}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 1));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
let on = 0, judged = 0, errors = 0;
for (const c of cells) {
    if (c.error) { errors++; console.log(c.cell, "ERROR", c.error); }
    else if (c.steps) { judged++; if (c.allOn) on++; console.log(c.cell, c.allOn ? "on" : "OFF", c.steps.map((s) => `${s.tag}: plate ${b(s.visible)} paint ${b(s.paint)}${s.on ? "" : " <<"}`).join(" | ")); }
    else { judged++; if (c.pass) on++; console.log(c.cell, c.pass ? "pass" : "FAIL", JSON.stringify(c.read)); }
}
console.log(`VERDICT ${label} ${engineName} ${on}/${judged} on, ${errors} errors`);
