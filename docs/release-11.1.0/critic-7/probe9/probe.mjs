// Critic 6 probe: ground fix 6 moved.
//   act-*      an `active` glyph control (no run mark): the fill's box (magenta) against what
//              the capsule still draws round it (the difference from the same control at rest)
//   cohort-*   a consumer's --dock-active-* cohort on a glyph control (class is-active): the
//              fill's box (magenta) against the border's box (green); a capture in a sibling
//              consumer's own values
//   seatdir-*  a run whose seats carry their own dir (a language switch): the mark (magenta)
//              against the current control's plate box, at load and after a change of seat
//   long-*     a run that scrolls at 390, loaded right to left, a far seat selected and
//              scrolled to; then a runtime flip; and a vertical dock flipped at runtime
// Fix 7 adds three judged gates (PASS/FAIL lines at the end):
//   seatdir   every step's plate on its control within 1.5 px (critique 6, finding 2)
//   pad0-*    the bordered cohort with `--dock-icon-padding: 0`: the fill meets the border
//             (no more than 1 px between them on each side; finding 3's remedy)
//   box-*     the mark's own element (orchestrator-note-mark-box.md): a marked run keeps
//             both reserve boxes at an unmarked run's sizes; the mark is one inert element
//             (aria-hidden, no tab stop, no snap, no pointer events, absolute) on its seat's
//             plate; the run that fits reads data-run-fits and scrollWidth = clientWidth
// The other cells are readings.
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
const PATH = "/docs/release-11.1.0/critic-7/probe9/harness/index.html";
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
const GREENISH = (r, g, b) => g > 140 && r < 110 && b < 110;
function bbox(png, clip, is) {
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
        const i = (y * png.width + x) * 4;
        if (is(png.data[i], png.data[i + 1], png.data[i + 2], x, y)) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    return x1 < 0 ? null : { x: x0 + clip.x, y: y0 + clip.y, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}
const seatRead = (i) => {
    const s = i === null ? document.querySelector('[aria-current="page"]') : document.querySelector(`[data-tab="${i}"]`);
    if (!s) return null;
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s);
    const p = cs.backgroundClip === "content-box" ? [cs.paddingLeft, cs.paddingTop, cs.paddingRight, cs.paddingBottom].map(parseFloat) : [0, 0, 0, 0];
    return { cell: { x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }, plate: { x: +(r.left + p[0]).toFixed(1), y: +(r.top + p[1]).toFixed(1), w: +(r.width - p[0] - p[2]).toFixed(1), h: +(r.height - p[1] - p[3]).toFixed(1) }, clip: cs.backgroundClip, shadow: cs.boxShadow.slice(0, 160), backdrop: cs.backdropFilter || cs.webkitBackdropFilter, border: cs.borderTopWidth + " " + cs.borderTopStyle, dir: cs.direction };
};
const near = (a, b, tol = 1.5) => !!a && !!b && ["x", "y", "w", "h"].every((k) => Math.abs(a[k] - b[k]) <= tol);
async function open(page, how) {
    await page.goto(`${base}${PATH}?${how}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900);
}
async function cell(name, [width, theme, dsf = 1], body) {
    if (ONLY.length && !ONLY.some((o) => name.startsWith(o))) return;
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "no-preference", deviceScaleFactor: dsf });
    try { const page = await context.newPage(); cells.push({ cell: name, ...(await body(page)) }); }
    catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); }
    finally { await context.close(); }
}

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const width of [390, 1440]) for (const theme of ["light", "dark"]) {
        const t = `${width}-${theme}`;
        // An `active` glyph control with no run mark (a pressed toggle).
        await cell(`act-${t}`, [width, theme], async (page) => {
            await open(page, `scene=act&theme=${theme}&mode=active&magenta=1`);
            const m = await shot(page, `act-${t}-magenta`);
            const fill = bbox(m.png, m.clip, MAGENTA);
            const seat = await page.evaluate(seatRead, 1);
            await open(page, `scene=act&theme=${theme}&mode=none`);
            const rest = await shot(page, `act-${t}-rest`);
            await open(page, `scene=act&theme=${theme}&mode=active`);
            const act = await shot(page, `act-${t}-plain`);
            // Every pixel the active control changes from rest, and its largest change by ring.
            const diffAt = (x, y) => { const i = (y * act.png.width + x) * 4; return Math.max(Math.abs(act.png.data[i] - rest.png.data[i]), Math.abs(act.png.data[i + 1] - rest.png.data[i + 1]), Math.abs(act.png.data[i + 2] - rest.png.data[i + 2])); };
            const changed = bbox(act.png, act.clip, (r, g, b, x, y) => diffAt(x, y) >= 3);
            const cx = Math.round(seat.cell.x + seat.cell.w / 2 - act.clip.x), cy = Math.round(seat.cell.y + seat.cell.h / 2 - act.clip.y);
            const row = []; for (let dx = 0; dx <= 26; dx++) row.push(diffAt(cx + dx, cy));
            const col = []; for (let dy = 0; dy <= 26; dy++) col.push(diffAt(cx, cy + dy));
            const up = []; for (let dy = 0; dy <= 26; dy++) up.push(diffAt(cx, cy - dy));
            return { fill, seat, changed, diffRight: row, diffDown: col, diffUp: up };
        });
        // The same at 2x for the eye.
        await cell(`act2x-${t}`, [width, theme, 2], async (page) => {
            await open(page, `scene=act&theme=${theme}&mode=active`);
            await shot(page, `act2x-${t}-plain`);
            return { captured: true };
        });
        // A consumer's --dock-active-* cohort.
        await cell(`cohort-${t}`, [width, theme], async (page) => {
            await open(page, `scene=cohort&theme=${theme}&paint=flat&expanded=1`);
            const s = await shot(page, `cohort-${t}-flat`);
            const seat = await page.evaluate(seatRead, 1), seat2 = await page.evaluate(seatRead, 2);
            const inSeat = (c) => (r, g, b, x, y) => x + s.clip.x >= c.x - 3 && x + s.clip.x <= c.x + c.w + 3;
            const fill = bbox(s.png, s.clip, (r, g, b, x, y) => MAGENTA(r, g, b) && inSeat(seat.cell)(r, g, b, x, y));
            const border = bbox(s.png, s.clip, (r, g, b, x, y) => GREENISH(r, g, b) && inSeat(seat.cell)(r, g, b, x, y));
            const fill2 = bbox(s.png, s.clip, (r, g, b, x, y) => MAGENTA(r, g, b) && inSeat(seat2.cell)(r, g, b, x, y));
            const border2 = bbox(s.png, s.clip, (r, g, b, x, y) => GREENISH(r, g, b) && inSeat(seat2.cell)(r, g, b, x, y));
            await open(page, `scene=cohort&theme=${theme}&paint=real`);
            await shot(page, `cohort-${t}-real`);
            return { isActive: { fill, border, cell: seat.cell, clip: seat.clip }, expanded: { fill: fill2, border: border2, cell: seat2.cell, clip: seat2.clip }, gap: fill && border ? (border.w - fill.w) / 2 : null };
        });
        await cell(`cohort2x-${t}`, [width, theme, 2], async (page) => {
            await open(page, `scene=cohort&theme=${theme}&paint=real`);
            await shot(page, `cohort2x-${t}-real`);
            return { captured: true };
        });
        // Seats that carry their own direction.
        for (const shape of ["tab", "icon"]) for (const pdir of ["ltr", "rtl"]) await cell(`seatdir-${shape}-${pdir}-${t}`, [width, theme], async (page) => {
            const steps = [];
            for (const cur of [1, 0, 2, 3]) {
                if (!steps.length) await open(page, `scene=seatdir&theme=${theme}&shape=${shape}&cur=${cur}${pdir === "rtl" ? "&dir=rtl" : ""}`);
                else { await page.evaluate((i) => window.__select(i), cur); await page.waitForTimeout(1600); }
                const seat = await page.evaluate(seatRead, null);
                // A seat the run's port cuts shows a cut plate (a run that scrolls at 390):
                // compare what lies inside the port (fix 7; the long-* cells already do).
                const port = await page.evaluate(() => { const b = document.querySelector(".dock-run").getBoundingClientRect(); return { left: b.left, right: b.right }; });
                const vis = seat ? (() => { const x0 = Math.max(seat.plate.x, port.left), x1 = Math.min(seat.plate.x + seat.plate.w, port.right); return x1 > x0 ? { x: x0, y: seat.plate.y, w: x1 - x0, h: seat.plate.h } : null; })() : null;
                const s = await shot(page, `seatdir-${shape}-${pdir}-${t}-cur${cur}`);
                const paint = bbox(s.png, s.clip, MAGENTA);
                steps.push({ cur, seatDir: seat?.dir, plate: seat?.plate, visiblePlate: vis, paint, on: near(paint, vis) });
            }
            return { steps, allOn: steps.every((s) => s.on) };
        });
        // The remedy the CHANGELOG names for a bordered active cohort.
        await cell(`pad0-${t}`, [width, theme], async (page) => {
            await open(page, `scene=cohort&theme=${theme}&paint=flat&expanded=1&pad0=1`);
            const s = await shot(page, `pad0-${t}-flat`);
            const seat = await page.evaluate(seatRead, 1);
            const inSeat = (c) => (r, g, b, x) => x + s.clip.x >= c.x - 3 && x + s.clip.x <= c.x + c.w + 3;
            const fill = bbox(s.png, s.clip, (r, g, b, x, y) => MAGENTA(r, g, b) && inSeat(seat.cell)(r, g, b, x, y));
            const border = bbox(s.png, s.clip, (r, g, b, x, y) => GREENISH(r, g, b) && inSeat(seat.cell)(r, g, b, x, y));
            const gap = fill && border ? Math.max(fill.x - border.x, fill.y - border.y, border.x + border.w - fill.x - fill.w, border.y + border.h - fill.y - fill.h) : null;
            return { fill, border, gap, pass: gap !== null && gap <= 1 };
        });
        // The mark's box: its own element, the reserve boxes untouched, no seat.
        await cell(`box-${t}`, [width, theme], async (page) => {
            const readRun = () => {
                const run = document.querySelector('[data-probe="nav"] .dock-run');
                const root = run.closest(".glass-dock");
                const b = getComputedStyle(run, "::before"), a = getComputedStyle(run, "::after");
                const mark = run.querySelector(":scope > .dock-run-mark");
                const ms = mark ? getComputedStyle(mark) : null;
                const r = mark?.getBoundingClientRect();
                return {
                    before: { content: b.content, position: b.position, w: b.width, ml: b.marginLeft, mr: b.marginRight },
                    after: { content: a.content, position: a.position, w: a.width, ml: a.marginLeft },
                    fits: root.hasAttribute("data-run-fits"), scrollWidth: run.scrollWidth, clientWidth: run.clientWidth,
                    seats: [...run.children].filter((c) => !c.classList.contains("dock-run-mark")).length,
                    tabStops: [...run.querySelectorAll("*")].filter((c) => c.tabIndex >= 0 && !c.closest(".dock-run-mark")).length,
                    toolbar: run.getAttribute("role"),
                    mark: mark ? { ariaHidden: mark.getAttribute("aria-hidden"), tabindex: mark.getAttribute("tabindex"), tabIndex: mark.tabIndex, snap: ms.scrollSnapAlign, pointer: ms.pointerEvents, position: ms.position, box: { x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } } : null,
                };
            };
            await open(page, `scene=fit&theme=${theme}&cur=-1`);
            const unmarked = await page.evaluate(readRun);
            await open(page, `scene=fit&theme=${theme}&cur=1`);
            const marked = await page.evaluate(readRun);
            const seat = await page.evaluate(seatRead, null);
            const s = await shot(page, `box-${t}`);
            const paint = bbox(s.png, s.clip, MAGENTA);
            const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
            const reserves = same(marked.before, unmarked.before) && same(marked.after, unmarked.after) && marked.before.position !== "absolute" && marked.before.content !== "none";
            const m = marked.mark;
            const inert = !!m && m.ariaHidden === "true" && m.tabindex === null && m.tabIndex < 0 && m.snap === "none" && m.pointer === "none" && m.position === "absolute";
            const onSeat = !!m && near(m.box, seat?.plate) && near(paint, seat?.plate);
            const seats = marked.seats === unmarked.seats && marked.tabStops === unmarked.tabStops && marked.toolbar === unmarked.toolbar;
            // The mark adds no scroll: a content-sized run that fits keeps 11.0.1's yield
            // remainder (the reserve stops at the ring's reach), so its overflow is compared
            // with the unmarked twin's, not with zero (v11.0.1 reads the same +4 px).
            const fits = marked.fits && unmarked.fits && marked.scrollWidth - marked.clientWidth === unmarked.scrollWidth - unmarked.clientWidth;
            return { unmarked, marked, plate: seat?.plate, paint, checks: { reserves, inert, onSeat, seats, fits }, pass: reserves && inert && onSeat && seats && fits };
        });
        // A long run: loaded right to left, a far seat, scrolled to; then flipped.
        for (const pdir of ["ltr", "rtl"]) await cell(`long-${pdir}-${t}`, [width, theme], async (page) => {
            await open(page, `scene=long&theme=${theme}&cur=1${pdir === "rtl" ? "&dir=rtl" : ""}`);
            const steps = [];
            const read = async (what) => {
                const seat = await page.evaluate(seatRead, null);
                const run = await page.evaluate(() => { const r = document.querySelector(".dock-run"); const b = r.getBoundingClientRect(); return { left: b.left, right: b.right, scrollLeft: r.scrollLeft, scrollWidth: r.scrollWidth, clientWidth: r.clientWidth }; });
                const s = await shot(page, `long-${pdir}-${t}-${what}`);
                const paint = bbox(s.png, s.clip, MAGENTA);
                // A seat cut by the run's edge shows a cut plate; compare what is inside the port.
                const vis = seat ? (() => { const x0 = Math.max(seat.plate.x, run.left), x1 = Math.min(seat.plate.x + seat.plate.w, run.right); return x1 > x0 ? { x: x0, y: seat.plate.y, w: x1 - x0, h: seat.plate.h } : null; })() : null;
                steps.push({ what, run, plate: seat?.plate, visiblePlate: vis, paint, on: vis ? near(paint, vis, 2.5) : paint === null });
            };
            await read("load");
            await page.evaluate(() => window.__select(6)); await page.waitForTimeout(1600);
            await page.evaluate(() => document.querySelector('[aria-current="page"]').scrollIntoView({ inline: "center", block: "nearest" })); await page.waitForTimeout(900);
            await read("far-scrolled");
            await page.evaluate((d) => window.__dir(d), pdir === "rtl" ? "ltr" : "rtl"); await page.waitForTimeout(1500);
            await page.evaluate(() => document.querySelector('[aria-current="page"]').scrollIntoView({ inline: "center", block: "nearest" })); await page.waitForTimeout(900);
            await read("flipped-scrolled");
            await page.evaluate(() => window.__select(4)); await page.waitForTimeout(1600);
            await page.evaluate(() => document.querySelector('[aria-current="page"]').scrollIntoView({ inline: "center", block: "nearest" })); await page.waitForTimeout(900);
            await read("flipped-next");
            return { steps, allOn: steps.every((s) => s.on) };
        });
        await cell(`vert-${t}`, [width, theme], async (page) => {
            await open(page, `scene=seatdir&theme=${theme}&shape=tab&cur=1&orientation=vertical`);
            const steps = [];
            for (const d of ["ltr", "rtl", "ltr"]) {
                if (steps.length) { await page.evaluate((v) => window.__dir(v), d); await page.waitForTimeout(1500); }
                const seat = await page.evaluate(seatRead, null);
                const s = await shot(page, `vert-${t}-${steps.length}-${d}`);
                const paint = bbox(s.png, s.clip, MAGENTA);
                steps.push({ d, plate: seat?.plate, paint, on: near(paint, seat?.plate) });
            }
            return { steps, allOn: steps.every((s) => s.on) };
        });
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}${ONLY.length ? "-" + ONLY.join("+") : ""}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 1));
const b = (o) => (o ? `${o.x},${o.y} ${o.w}x${o.h}` : "none");
for (const c of cells) {
    if (c.error) console.log(c.cell, "ERROR", c.error);
    else if (c.steps) console.log(c.cell, c.allOn ? "on" : "OFF", c.steps.map((s) => `${s.cur ?? s.what ?? s.d}${s.seatDir ? "(" + s.seatDir + ")" : ""}: plate ${b(s.visiblePlate ?? s.plate)} paint ${b(s.paint)}${s.on ? "" : " <<"}`).join(" | "));
    else if (c.isActive) console.log(c.cell, `is-active fill ${b(c.isActive.fill)} border ${b(c.isActive.border)} clip ${c.isActive.clip} | expanded fill ${b(c.expanded.fill)} border ${b(c.expanded.border)} | gap ${c.gap}`);
    else if (/^(pad0|box)-/.test(c.cell)) console.log(c.cell, c.pass ? "pass" : "FAIL", c.cell.startsWith("pad0") ? `fill ${b(c.fill)} border ${b(c.border)} gap ${c.gap}` : `plate ${b(c.plate)} paint ${b(c.paint)} mark ${b(c.marked.mark?.box)} before ${JSON.stringify(c.marked.before)}/${JSON.stringify(c.unmarked.before)} fits ${c.marked.fits} sw ${c.marked.scrollWidth}/${c.marked.clientWidth}`);
    else if (c.fill !== undefined) console.log(c.cell, `fill ${b(c.fill)} cell ${b(c.seat.cell)} changed ${b(c.changed)} clip ${c.seat.clip} right ${c.diffRight.join(",")} down ${c.diffDown.join(",")} up ${c.diffUp.join(",")} shadow ${c.seat.shadow}`);
    else console.log(c.cell, JSON.stringify(c));
}
console.log(label, engineName, `${cells.length} cells ${cells.filter((c) => c.error).length} errors`);
const gate = (c) => (c.cell.startsWith("seatdir-") ? c.allOn : c.pass);
const judged = cells.filter((c) => /^(seatdir|pad0|box)-/.test(c.cell));
for (const c of judged) console.log("GATE", c.cell, !c.error && gate(c) ? "PASS" : "FAIL", c.checks ? JSON.stringify(c.checks) : c.gap !== undefined ? `gap ${c.gap}` : "");
console.log(`VERDICT ${label} ${engineName} ${judged.filter((c) => !c.error && gate(c)).length}/${judged.length}`);
