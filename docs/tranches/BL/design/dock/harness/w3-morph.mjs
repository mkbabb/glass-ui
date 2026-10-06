// W3 · the extent morph (H2, revised by H3: pass-3/H3.md). Continuous, lands dead (or bounces by design), follows
// the pinned rung's analytic spring, closes its window on the rung's own clock, keeps
// every face inside the plate (read from pixels), moves every seat continuously with
// no collision or double exposure, and never has two running owners of one property.
// The O-64 rows R-1..R-5 are its sub-checks; R-6 is r6-probe.mjs.
//
//   node w3-morph.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Pass 1 · the strip. A per-rAF frame strip (lib.mjs startLog: extent, window, seat
// row, owners) across these transitions:
//   morph     first-expand · warm-collapse · warm-expand · content-add · content-remove ·
//             lead-add · lead-remove (a seat inserted at the START, B CX-1) · reversal
//             (a collapse retargeted back to expanded at 35 % of its travel, H-3c)
//   swap      swap-long · swap-short
//   morph&anchor=end   anchor-end·warm-collapse · anchor-end·warm-expand (K-11: the right edge holds)
//   morph&wide=1       wide·warm-expand (K-5; its collapsed rest is read in pass 2)
//   hidden    hidden-shown (B CX-4: appears at its rest, never grows from a degenerate box)
//   fit       viewport-resize (B CX-5: a resize does not morph a dock whose content fits)
//   tick      ticking (C CX-7: a seat whose text changes every 180 ms)
//   seatgrow  seat-transition (K-13, C seattransition: a seat's own CSS width transition)
// Pass 2 · faces from pixels (H-3). The same posture, content and swap transitions run
// again under the "faces" probe (plate magenta, seat glyphs green): Chromium samples
// with screenshots, Playwright WebKit with the screencast (PF-1). The farthest face
// ink beyond the plate's painted box is the `faces` sub-check; the adapter's
// paintingSeats() is never read.
//
// H3 (pass-3/H3.md):
//   H3-1  `blank` on every strip cell with seats: the paint floor under faces/seatStep/seatOverlap
//   H3-3  `leaving` on every strip cell with seats (removal, swap, collapse) and the `compaction`
//         cell: the gap-free leaving-seat rule, whoever paints the seat (lib.mjs leavingRow)
//   H3-2  `lattice` (aria-current moves One → Two: each cell's own width, `seatWidth`, plus the
//         strip) and `infanim` (an infinite size animation in a seat: `errors`, `window`)
//   H3-5  `vagree·{morph,vmorph}·warm-{collapse,expand}`: lossless in-flight screenshots, each
//         bracketed by two extent() reads (the paint the DOM rows stand for)
//   H3-6  `stretch·lead-add`: a seat prepended to a run that does not change size
//   H3-7  `neighbour·warm-{collapse,expand}`: an in-flow neighbour beside the dock, per frame
//   H3-10 `viewport-resize`: 0 window frames and the new rest reached (`window`, `rest`); the
//         length span is recorded, not bounded
//   H3-11 a cell whose ONLY failure is `window`, and whose window holds under Q-4's lenient
//         reading (lib.mjs Q4_DOCK_CLOCK_MS), is OWNER-BLOCKED (Q-4), not FAIL
//
// Bounds: lib.mjs analyseMorph (continuity, landing, window on the pinned clock,
// trajectory, terminal, owners, seat row, blank, leaving) and FACES_PX / FACES_PX_SCREENCAST below.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, mark, waitRest, dockCenter, extentNow, probeMode, shoot, facesRead, FACE_DOM_SCREENCAST, screencast, readFrame, interiorGreen, pinnedRung, analyseMorph, morphChecks, morphSummary, springSpec, r2, K_JITTER, STEP_SLACK_PX, magentaCoverage, scrollSource, blankRow, leavingRow } from "./lib.mjs";

/** Faces: 0.5 px (W-7) plus one device pixel of edge anti-aliasing at DSF 2. */
export const FACES_PX = 1.0;
/** In the screencast one pixel is one CSS pixel and VP8 halves chroma resolution: 2 px. */
export const FACES_PX_SCREENCAST = 2.0;
/** H3-5 · a lossless in-flight screenshot's painted main length lies within its two bracketing
 *  extent() reads ± (VAGREE_PX + one device pixel): W1's AGREE_PX, plus each of the two main edges
 *  snapping by up to half a device pixel in paint (the fixture reads 1.01 px at DSF 2 in Chromium,
 *  pass-3/H3.md §2 H3-5). */
export const VAGREE_PX = 1.0;
/** H3-6 · the stretch: the root held this much wider than its natural width. */
export const STRETCH_PX = 160;
/** the strip options every seat-bearing W3 cell logs (H3-1, H3-3 read the ink leaves) */
const STRIP = { seats: true, owners: true, ink: true };
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W3");
const rep = makeReport("W3", target);
const RUNG = await pinnedRung(target);
const SPEC = springSpec(RUNG);

async function waitChange(page, cap = 7000) {
    const b = await extentNow(page);
    const t0 = Date.now();
    while (Date.now() - t0 < cap) {
        const e = await extentNow(page);
        const m = await page.evaluate(() => window.__dockProbe.morphing());
        if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return Date.now() - t0;
        await page.waitForTimeout(16);
    }
    return null;
}
async function step(page, name, trigger, segs) {
    await mark(page, name);
    await trigger();
    await waitChange(page);
    await waitRest(page, { quiet: 500, cap: 7000 });
    await page.waitForTimeout(200);
    segs.push(name);
}
const lenOf = (e, ax) => ax === "y" ? e.h : e.w;
/** Collapse, then at `frac` of the travel retarget back to expanded, from inside the page (frame-exact). */
async function reversal(page, frac, Lcol) {
    await mark(page, "reversal");
    const r = await page.evaluate(({ frac, Lcol }) => new Promise((res) => {
        const P = window.__dockProbe, ax = P.axis();
        const len = () => { const e = P.extent(); return ax === "y" ? e.b - e.t : e.r - e.l; };
        const L0 = len(); window.__scene.collapse();
        const t0 = performance.now();
        const tick = () => { const d = L0 - len(); if (d >= frac * (L0 - Lcol)) { window.__hpLog.mark = "reversal-back"; window.__scene.expand(); res({ ok: true, L0, at: len() }); } else if (performance.now() - t0 > 3000) res({ ok: false, L0, at: len() }); else requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    }), { frac, Lcol });
    await waitRest(page, { quiet: 500, cap: 7000 });
    await page.waitForTimeout(200);
    return r;
}
function segment(frames, names, name) {
    const i0 = frames.findIndex((f) => names(f.mk) === name);
    const fr = frames.filter((f) => names(f.mk) === name);
    if (i0 > 0) fr.unshift(frames[i0 - 1]);
    return fr;
}
function dump(engine, name, fr, ax) {
    fs.writeFileSync(`${out}/${engine}-${name}.json`, JSON.stringify(fr.map((f) => ({ t: r2(f.t - fr[0].t), len: r2(ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]), e: f.e, m: f.m, dup: f.dup }))));
}

// ── pass 2 · faces from pixels ───────────────────────────────────────────────
function dockBand(e, vp) {
    return e.axis === "y" ? { x: Math.max(0, e.l - 40), y: 0, width: Math.min(vp.width, e.w + 400), height: vp.height } : { x: 0, y: Math.max(0, e.t - 40), width: vp.width, height: Math.min(vp.height - Math.max(0, e.t - 40), e.h + 80) };
}
/** Chromium: screenshot the band continuously from the trigger until the dock rests. Each read
 *  carries the adapter's main length just before its shot, so the verdict knows how many reads
 *  saw the morph in flight (a screenshot at load 27 can outlast a 278 ms spring). */
const FACES_START_MS = 4000;
async function facesByShots(page, trigger) {
    await probeMode(page, "faces");
    const e0 = await extentNow(page); const vp = page.viewportSize();
    const main = (e) => (e.axis === "y" ? e.h : e.w);
    const band = dockBand(e0, vp);
    const reads = [];
    const shot = async () => { const L = main(await extentNow(page)); const img = await shoot(page, band); const f = facesRead(img, img.dsf); if (!f.empty) reads.push({ ...f, L }); };
    await shot();
    await trigger();
    // stillness counts only once the change has begun (a hover-out delay must not end the loop
    // before the morph starts), or after FACES_START_MS with no change at all. That is the strip
    // pass's own start cap (waitChange, 4 s): the dock's hover-out delay is 3.6 s
    // (DOCK_COLLAPSE_DELAY_MS), and a 1.5 s cutoff left the Chromium warm pair UNMEASURED on
    // every build (D2-Bp-proto.md §3.3)
    const t0 = Date.now(); let still = 0, last = "", started = false;
    while (Date.now() - t0 < FACES_START_MS + 2500) {
        await shot();
        const e = await extentNow(page); const k = `${e.w.toFixed(1)}x${e.h.toFixed(1)}`; const m = await page.evaluate(() => window.__dockProbe.morphing());
        if (m || Math.abs(e.w - e0.w) > 0.25 || Math.abs(e.h - e0.h) > 0.25) started = true;
        still = k === last && !m ? still + 1 : 0; last = k;
        if (still >= 3 && (started || Date.now() - t0 > FACES_START_MS)) break;
    }
    await probeMode(page, null);
    const L1 = main(await extentNow(page));
    reads.endpoints = [main(e0), L1];
    return reads;
}
export const INFLIGHT_MIN = 2;
/** ok: true | false | null (null: the sampler saw fewer than INFLIGHT_MIN in-flight reads of a
 *  ≥ 20 px travel, so the faces were not judged in flight: UNMEASURED, never PASS). A read that
 *  already fails still fails. */
function facesVerdict(reads, bound, how) {
    if (!reads.length) return { ok: false, why: "no faces read (no plate painted)", n: 0 };
    const worst = reads.reduce((m, r) => r.outside > m.outside ? r : m, reads[0]);
    let inflight = null, starved = false;
    if (how === "screenshot" && reads.endpoints) {
        const [a, b] = reads.endpoints, lo = Math.min(a, b) + 0.5, hi = Math.max(a, b) - 0.5;
        inflight = reads.filter((r) => r.L > lo && r.L < hi).length;
        starved = Math.abs(b - a) >= 20 && inflight < INFLIGHT_MIN;
    }
    const ok = worst.outside > bound ? false : starved ? null : true;
    return { ok, max: worst.outside, n: reads.length, inflight, travel: reads.endpoints ? r2(Math.abs(reads.endpoints[1] - reads.endpoints[0])) : null, bound, how, why: `${ok === null ? "UNMEASURED (sampler starved: " + inflight + " in-flight read(s)) · " : ""}${worst.outside} px of face ink beyond the plate over ${reads.length} ${how} sample(s)${inflight != null ? ` (${inflight} in flight)` : ""} (bound ${bound})` };
}

// The posture/content/swap sequences, shared by both passes.
const MORPH_SEQ = [
    ["first-expand", (p, c) => p.mouse.move(c.x, c.y, { steps: 3 })],
    ["warm-collapse", (p) => p.mouse.move(4, 4)],
    ["warm-expand", async (p) => { const c = await dockCenter(p); await p.mouse.move(c.x, c.y, { steps: 3 }); }],
    ["content-add", (p) => p.evaluate(() => window.__scene.setExtra(true))],
    ["content-remove", (p) => p.evaluate(() => window.__scene.setExtra(false))],
    ["lead-add", (p) => p.evaluate(() => window.__scene.setLead(true))],
    ["lead-remove", (p) => p.evaluate(() => window.__scene.setLead(false))],
];
const SWAP_SEQ = [
    ["swap-long", (p) => p.evaluate(() => window.__scene.setFace("long"))],
    ["swap-short", (p) => p.evaluate(() => window.__scene.setFace("short"))],
];
const WIDE_SEQ = [
    ["wide·warm-expand", (p, c) => p.mouse.move(c.x, c.y, { steps: 3 })],
    ["wide·warm-collapse", (p) => p.mouse.move(4, 4)],
];

async function facesPass(browser, engine) {
    const res = {};
    const plan = [["morph", {}, MORPH_SEQ], ["swap", {}, SWAP_SEQ], ["morph", { wide: "1" }, WIDE_SEQ]];
    for (const [scene, query, seq] of plan) {
        if (engine === "webkit") {
            const dir = path.join(out, `cast-${engine}-${scene}${query.wide ? "-wide" : ""}`);
            let names = [];
            const cast = await screencast(browser, target, scene, { query, dir, crop: (vp) => ({ x: 0, y: 0, width: vp.width, height: vp.height }) }, async (page, markT) => {
                await probeMode(page, "faces"); await page.waitForTimeout(300);
                markT("rest");
                const c = await dockCenter(page);
                for (const [name, trig] of seq) { markT(name); names.push(name); await trig(page, c); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 }); await page.waitForTimeout(200); }
                markT("end");
            });
            const order = ["rest", ...names, "end"];
            for (let k = 1; k < order.length - 1; k++) {
                const a = cast.marks[order[k]], b = cast.marks[order[k + 1]];
                const reads = cast.frames.filter((f) => f.t >= a - 40 && f.t <= b).map((f) => { const img = readFrame(f); return facesRead(img, 1, interiorGreen(img), FACE_DOM_SCREENCAST); }).filter((r) => !r.empty);
                res[order[k]] = facesVerdict(reads, FACES_PX_SCREENCAST, "screencast");
            }
            if (query.wide) {   // the wide collapsed face at rest, before anything moves
                const reads = cast.frames.filter((f) => f.t >= cast.marks.rest - 200 && f.t < cast.marks[order[1]]).map((f) => { const img = readFrame(f); return facesRead(img, 1, interiorGreen(img), FACE_DOM_SCREENCAST); }).filter((r) => !r.empty);
                res["wide·collapsed-rest"] = facesVerdict(reads, FACES_PX_SCREENCAST, "screencast");
            }
        } else {
            const s = await openScene(browser, target, scene, { query });
            if (query.wide) {
                await probeMode(s.page, "faces");
                const e = await extentNow(s.page); const img = await shoot(s.page, dockBand(e, s.page.viewportSize()));
                await probeMode(s.page, null);
                res["wide·collapsed-rest"] = facesVerdict([facesRead(img, img.dsf)].filter((r) => !r.empty), FACES_PX, "screenshot");
            }
            const c = await dockCenter(s.page);
            for (const [name, trig] of seq) { res[name] = facesVerdict(await facesByShots(s.page, () => trig(s.page, c)), FACES_PX, "screenshot"); await waitRest(s.page, { quiet: 400, cap: 7000 }); }
            await s.close();
        }
    }
    return res;
}

function addMorphCell(engine, name, a, extra = {}) {
    const all = { ...morphChecks(a), ...extra.checks };
    const checks = extra.only ? Object.fromEntries(extra.only.map((k) => [k, all[k]])) : all;
    const pass = Object.values(checks).every(Boolean);
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    // H3-11: the only failure is the window, and Q-4's lenient reading holds → OWNER-BLOCKED (Q-4)
    const ownerBlocked = !pass && failed.length === 1 && failed[0] === "window" && a.window?.q4 === true ? "Q-4" : undefined;
    rep.add({ engine, cell: name + engineTag(target, engine), pass, failed, ownerBlocked, ...a, ...extra.data, summary: `${morphSummary(a)}${extra.note ? "; " + extra.note : ""}${failed.length ? `  ⟶ ${ownerBlocked ? "OWNER-BLOCKED (" + ownerBlocked + ")" : "FAILED"}: ` + failed.join(", ") : ""}` });
}
/** The worst one-frame step of a series of main-axis values against the continuity bound of its own travel. */
function seriesStep(fr, vals) {
    const D = Math.max(0, ...vals.map((v) => Math.abs(v - vals[0])));
    let worst = { ratio: 0, step: 0, bound: STEP_SLACK_PX };
    for (let i = 1; i < fr.length; i++) {
        const dt = fr[i].t - fr[i - 1].t; const bound = K_JITTER * SPEC.vmaxNorm * D * (dt / 1000) + STEP_SLACK_PX;
        const st = Math.abs(vals[i] - vals[i - 1]);
        if (st / bound > worst.ratio) worst = { ratio: r2(st / bound), step: r2(st), bound: r2(bound), atMs: r2(fr[i].t - fr[0].t) };
    }
    return { D: r2(D), distinct: new Set(vals.map((v) => v.toFixed(2))).size, ...worst };
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    let faces = {};
    let rungOk = true, rungWhy = "";
    try {
        // ── pass 1 · the strips ─────────────────────────────────────────────
        const MORPH_CELLS = [...MORPH_SEQ.map(([n]) => n), "reversal"];
        await rep.guard(engine, MORPH_CELLS.map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "morph");
            const declared = await s.page.evaluate(() => window.__dockProbe.rung());
            if (!declared) throw new Error("adapter rung() returned null");
            if (declared.response !== RUNG.response || declared.dampingFraction !== RUNG.dampingFraction || declared.settleBand !== RUNG.settleBand) { rungOk = false; rungWhy = `rung() declares (${declared.response}, ${declared.dampingFraction}, ${declared.settleBand}) against the pinned (${RUNG.response}, ${RUNG.dampingFraction}, ${RUNG.settleBand})`; }
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            const Lcol = lenOf(await extentNow(s.page), ax);
            await startLog(s.page, STRIP);
            await s.page.waitForTimeout(150);
            const segs = [];
            const c = await dockCenter(s.page);
            for (const [name, trig] of MORPH_SEQ) await step(s.page, name, () => trig(s.page, c), segs);
            const rv = await reversal(s.page, 0.35, Lcol);
            const frames = await stopLog(s.page);
            for (const name of segs) {
                const fr = segment(frames, (m) => m, name); dump(engine, name, fr, ax);
                if (fr.length < 3) { rep.add({ engine, cell: name + tag, pass: false, summary: `only ${fr.length} frames logged` }); continue; }
                addMorphCell(engine, name, analyseMorph(fr, RUNG, { ax, paintFloor: true }), { checks: { rung: rungOk }, note: rungOk ? "" : rungWhy });
            }
            const rfr = segment(frames, (m) => m === "reversal-back" ? "reversal" : m, "reversal"); dump(engine, "reversal", rfr, ax);
            if (!rv.ok || rfr.length < 3) rep.add({ engine, cell: "reversal" + tag, pass: false, summary: `the collapse never travelled 35 % (${r2(rv.L0)} → ${r2(rv.at)} px, collapsed ${r2(Lcol)})` });
            else addMorphCell(engine, "reversal", analyseMorph(rfr, RUNG, { ax, reversal: { mark: "reversal-back", to1: Lcol }, paintFloor: true }), { checks: { rung: rungOk }, note: `retargeted at ${r2(rv.at)} px` });
            await s.close();
        });
        await rep.guard(engine, SWAP_SEQ.map(([n]) => n + tag), async () => {
            const s = await openScene(browser, target, "swap");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, STRIP); await s.page.waitForTimeout(150);
            const segs = [];
            for (const [name, trig] of SWAP_SEQ) await step(s.page, name, () => trig(s.page), segs);
            const frames = await stopLog(s.page);
            for (const name of segs) { const fr = segment(frames, (m) => m, name); dump(engine, name, fr, ax); if (fr.length < 3) { rep.add({ engine, cell: name + tag, pass: false, summary: `only ${fr.length} frames` }); continue; } addMorphCell(engine, name, analyseMorph(fr, RUNG, { ax, paintFloor: true }), { checks: { rung: rungOk } }); }
            await s.close();
        });
        // K-11 · the right-anchored dock keeps its right edge
        await rep.guard(engine, ["anchor-end·warm-expand", "anchor-end·warm-collapse"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "morph", { query: { anchor: "end" } });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            const c = await dockCenter(s.page);
            await s.page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });   // the first expand is not this cell's subject
            await s.page.mouse.move(4, 4); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            const segs = [];
            await step(s.page, "anchor-end·warm-expand", async () => { const c2 = await dockCenter(s.page); await s.page.mouse.move(c2.x, c2.y, { steps: 3 }); }, segs);
            await step(s.page, "anchor-end·warm-collapse", () => s.page.mouse.move(4, 4), segs);
            const frames = await stopLog(s.page);
            for (const name of segs) {
                const fr = segment(frames, (m) => m, name);
                const anchorEdge = (f) => ax === "y" ? f.e[3] : f.e[2];
                const drift = Math.max(...fr.map((f) => Math.abs(anchorEdge(f) - anchorEdge(fr[0]))));
                addMorphCell(engine, name, analyseMorph(fr, RUNG, { ax, seats: false }), { checks: { rung: rungOk, anchor: drift <= 0.5 }, data: { anchorDriftPx: r2(drift) }, note: `anchored edge drift ${r2(drift)} px (bound 0.5)` });
            }
            await s.close();
        });
        // B CX-4 · a dock mounted hidden appears at its rest when shown
        await rep.guard(engine, ["hidden-shown" + tag], async () => {
            const s = await openScene(browser, target, "hidden");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "show"); await s.page.evaluate(() => window.__scene.show());
            await s.page.waitForTimeout(300); await waitRest(s.page, { quiet: 500 });
            const fr = (await stopLog(s.page)).filter((f) => f.mk === "show" && f.e[2] - f.e[0] > 0.5 && f.e[3] - f.e[1] > 0.5);
            if (!fr.length) { rep.add({ engine, cell: "hidden-shown" + tag, pass: false, summary: "the dock never painted after show()" }); }
            else {
                const fin = fr.at(-1); const cross = ax === "y" ? fin.e[2] - fin.e[0] : fin.e[3] - fin.e[1];
                const minLen = Math.min(...fr.map((f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]));
                const off = Math.max(...fr.map((f) => Math.max(...f.e.map((v, k) => Math.abs(v - fin.e[k])))));
                const pass = minLen >= cross - 0.5 && off <= 0.5;
                rep.add({ engine, cell: "hidden-shown" + tag, pass, frames: fr.length, minLen: r2(minLen), cross: r2(cross), maxOffsetPx: r2(off), summary: `${fr.length} painted frame(s) after show(): shortest main extent ${r2(minLen)} px (cross ${r2(cross)}), farthest edge from its rest ${r2(off)} px (bound 0.5: it appears at its rest)` });
            }
            await s.close();
        });
        // B CX-5 · a viewport resize does not morph a dock whose content fits both widths
        await rep.guard(engine, ["viewport-resize" + tag], async () => {
            const s = await openScene(browser, target, "fit");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "resize"); await s.page.setViewportSize({ width: 1200, height: 900 });
            await s.page.waitForTimeout(600); const rest = await waitRest(s.page, { quiet: 400 });
            const fr = (await stopLog(s.page));
            const Ls = fr.map((f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]).filter((v) => v > 0.5);
            const span = Math.max(...Ls) - Math.min(...Ls);
            const win = fr.filter((f) => f.mk === "resize" && f.m).length;
            // H3-10: judged on what the route owns. The scene's fluid font moves every build's rest
            // (6.09 px, B′-spec P-6), so the delta is recorded, never bounded
            const checks = { window: win === 0, rest: rest.ok };
            const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
            rep.add({ engine, cell: "viewport-resize" + tag, pass: !failed.length, failed, lengthSpanPx: r2(span), restDeltaPx: r2(Ls.length ? Ls.at(-1) - Ls[0] : 0), windowFrames: win, restMs: rest.ms, summary: `1440 → 1200 px viewport: ${win} morph-window frame(s) (bound 0); the new rest ${rest.ok ? "reached" : "NOT reached"} (${rest.ms} ms); main extent span ${r2(span)} px, rest delta ${r2(Ls.length ? Ls.at(-1) - Ls[0] : 0)} px (recorded)${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
            await s.close();
        });
        // C CX-7 · a ticking-text seat
        await rep.guard(engine, ["ticking" + tag], async () => {
            const s = await openScene(browser, target, "tick");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "tick"); await s.page.evaluate(() => window.__scene.startTick());
            await s.page.waitForTimeout(1600); await s.page.evaluate(() => window.__scene.stopTick());
            await waitRest(s.page, { quiet: 500 });
            const fr = (await stopLog(s.page)).filter((f) => f.mk === "tick");
            const log = await s.page.evaluate(() => window.__scene.tickLog());
            const span = log.length ? Math.max(...log) - Math.min(...log) : 0;
            let worst = { ratio: 0 };
            for (let i = 1; i < fr.length; i++) {
                const dt = fr[i].t - fr[i - 1].t; const bound = K_JITTER * SPEC.vmaxNorm * span * (dt / 1000) + 0.5;
                const L = (f) => ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0];
                const st = Math.abs(L(fr[i]) - L(fr[i - 1]));
                if (st / bound > worst.ratio) worst = { ratio: r2(st / bound), step: r2(st), bound: r2(bound) };
            }
            const dup = fr.filter((f) => f.dup).length;
            const winFrames = fr.filter((f) => f.m).length;
            rep.add({ engine, cell: "ticking" + tag, pass: worst.ratio <= 1 && dup === 0, ticks: log.length, spanPx: r2(span), continuity: worst, ownerFrames: dup, windowFrames: winFrames, summary: `${log.length} ticks over a ${r2(span)} px content span; worst step ${worst.step ?? 0} px vs bound ${worst.bound ?? "-"} (×${worst.ratio}); two-owner frames ${dup}; window open ${winFrames}/${fr.length} frames (recorded)` });
            await s.close();
        });
        // K-13 · a seat's own CSS width transition: the extent has one owner
        await rep.guard(engine, ["seat-transition" + tag], async () => {
            const s = await openScene(browser, target, "seatgrow");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            const segs = [];
            await step(s.page, "seat-transition", () => s.page.evaluate(() => window.__scene.grow(true)), segs);
            const fr = segment(await stopLog(s.page), (m) => m, "seat-transition"); dump(engine, "seat-transition", fr, ax);
            addMorphCell(engine, "seat-transition", analyseMorph(fr, RUNG, { ax, seats: false }), { checks: { rung: rungOk } });
            await s.close();
        });
        // ── H3 cells ────────────────────────────────────────────────────────
        const hoverExpand = async (page) => { const c = await dockCenter(page); await page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 }); };
        // H3-2 · the open-seat exchange: aria-current moves One → Two on an expanded dock
        await rep.guard(engine, ["lattice" + tag], async () => {
            const s = await openScene(browser, target, "morph");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await hoverExpand(s.page);
            await s.page.evaluate(() => window.__dockProbe.root().querySelector("[aria-label=One]").setAttribute("aria-current", "page"));
            await s.page.waitForTimeout(300); await waitRest(s.page, { quiet: 600, cap: 7000 }); await s.page.waitForTimeout(300);
            await startLog(s.page, { ...STRIP, cellsOf: ["[aria-label=One]", "[aria-label=Two]"] }); await s.page.waitForTimeout(150);
            await mark(s.page, "lattice");
            await s.page.evaluate(() => { const r = window.__dockProbe.root(); r.querySelector("[aria-label=One]").removeAttribute("aria-current"); r.querySelector("[aria-label=Two]").setAttribute("aria-current", "page"); });
            await s.page.waitForTimeout(900); await waitRest(s.page, { quiet: 500, cap: 7000 });
            const fr = segment(await stopLog(s.page), (m) => m, "lattice"); dump(engine, "lattice", fr, ax);
            const ok = fr.filter((f) => f.cw && f.cw.every((v) => v != null));
            const cells = [0, 1].map((k) => seriesStep(ok, ok.map((f) => f.cw[k])));
            const moved = cells.filter((c) => c.D >= 0.5);
            const seatWidth = moved.length > 0 && moved.every((c) => c.ratio <= 1);
            const a = analyseMorph(fr, RUNG, { ax, paintFloor: true });
            addMorphCell(engine, "lattice", a, { checks: { rung: rungOk, seatWidth, errors: s.errors.length === 0 }, data: { cellWidths: cells, pageErrors: s.errors.slice(0, 3) },
                note: `the open-seat exchange: One ${cells[0].D} px over ${cells[0].distinct} distinct widths, worst step ${cells[0].step} px vs bound ${cells[0].bound} (×${cells[0].ratio}); Two ${cells[1].D} px over ${cells[1].distinct}, worst ${cells[1].step} px vs ${cells[1].bound} (×${cells[1].ratio})${moved.length ? "" : " — NO cell changed width: the exchange did not run"}; page errors ${s.errors.length}${s.errors[0] ? " (" + s.errors[0].slice(0, 90) + ")" : ""}` });
            await s.close();
        });
        // H3-2 · an infinite size animation on a seat (a level meter): no page error, no window held open
        await rep.guard(engine, ["infanim" + tag], async () => {
            const s = await openScene(browser, target, "morph");
            await hoverExpand(s.page);
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "infanim");
            await s.page.evaluate(() => {
                const st = document.createElement("style");
                st.textContent = "@keyframes h3meter { from { width: 6px } to { width: 30px } } .h3-meter { display: inline-block; height: 6px; background: currentColor; animation: h3meter 0.6s ease-in-out infinite alternate; }";
                document.head.appendChild(st);
                const m = document.createElement("span"); m.className = "h3-meter";
                window.__dockProbe.root().querySelector("[data-testid=play]").appendChild(m);
            });
            await s.page.waitForTimeout(2000);
            const fr = (await stopLog(s.page)).filter((f) => f.mk === "infanim");
            const F = Math.max(16.7, fr.length > 2 ? (fr.at(-1).t - fr[0].t) / (fr.length - 1) : 16.7);
            const winFrames = fr.filter((f) => f.m).length, allowFrames = Math.ceil((SPEC.settleS * 1000 + 2 * F) / F);
            const Ls = fr.map((f) => f.e[2] - f.e[0]);
            const checks = { errors: s.errors.length === 0, window: winFrames <= allowFrames };
            const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
            rep.add({ engine, cell: "infanim" + tag, pass: !failed.length, failed, frames: fr.length, windowFrames: winFrames, allowFrames, pageErrors: s.errors.slice(0, 3), extentSpanPx: r2(Math.max(...Ls) - Math.min(...Ls)), distinctExtents: new Set(Ls.map((v) => v.toFixed(1))).size,
                summary: `a seat with an infinite width animation over 2 s: page errors ${s.errors.length}${s.errors[0] ? " (" + s.errors[0].slice(0, 90) + ")" : ""} (bound 0); window open ${winFrames}/${fr.length} frames (bound ${allowFrames}: one clock + 2 frames); extent span ${r2(Math.max(...Ls) - Math.min(...Ls))} px over ${new Set(Ls.map((v) => v.toFixed(1))).size} distinct extents (recorded)${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
            await s.close();
        });
        // H3-6 · a seat prepended to a run held wider than its natural width (the run does not change size)
        await rep.guard(engine, ["stretch·lead-add" + tag], async () => {
            const s = await openScene(browser, target, "morph");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await hoverExpand(s.page);
            await s.page.evaluate((px) => window.__scene.stretch(px), STRETCH_PX);
            await s.page.waitForTimeout(300); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(200);
            const w0 = await s.page.evaluate(() => window.__dockProbe.root().getBoundingClientRect().width);
            await startLog(s.page, STRIP); await s.page.waitForTimeout(150);
            await mark(s.page, "stretch·lead-add");
            await s.page.evaluate(() => window.__scene.setLead(true));
            await s.page.waitForTimeout(900); await waitRest(s.page, { quiet: 500, cap: 7000 });
            const w1 = await s.page.evaluate(() => window.__dockProbe.root().getBoundingClientRect().width);
            const fr = segment(await stopLog(s.page), (m) => m, "stretch·lead-add"); dump(engine, "stretch-lead-add", fr, ax);
            addMorphCell(engine, "stretch·lead-add", analyseMorph(fr, RUNG, { ax, paintFloor: true }), { checks: { rung: rungOk }, data: { rootWidth: [r2(w0), r2(w1)] }, note: `root held ${STRETCH_PX} px wide of its natural width: ${r2(w0)} → ${r2(w1)} px across the insertion${Math.abs(w1 - w0) > 0.5 ? " (the premise did not hold: the root changed size)" : ""}` });
            await s.close();
        });
        // H3-7 · an in-flow neighbour beside the dock, read per frame
        await rep.guard(engine, ["neighbour·warm-collapse", "neighbour·warm-expand"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "morph", { query: { neighbour: "1" } });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await hoverExpand(s.page);
            await startLog(s.page, { owners: true, neighbour: true }); await s.page.waitForTimeout(150);
            const segs = [];
            await step(s.page, "neighbour·warm-collapse", () => s.page.mouse.move(4, 4), segs);
            await step(s.page, "neighbour·warm-expand", async () => { const c2 = await dockCenter(s.page); await s.page.mouse.move(c2.x, c2.y, { steps: 3 }); }, segs);
            const frames = await stopLog(s.page);
            for (const name of segs) {
                const fr = segment(frames, (m) => m, name).filter((f) => f.nb);
                if (fr.length < 3) { rep.add({ engine, cell: name + tag, pass: false, summary: `only ${fr.length} frames with a neighbour` }); continue; }
                const nb = seriesStep(fr, fr.map((f) => ax === "y" ? f.nb[1] : f.nb[0]));
                const Dext = r2(Math.abs((fr.at(-1).e[2] - fr.at(-1).e[0]) - (fr[0].e[2] - fr[0].e[0])));
                const pass = nb.ratio <= 1;
                rep.add({ engine, cell: name + tag, pass, failed: pass ? [] : ["neighbour"], neighbour: nb, extentD: Dext,
                    summary: `the in-flow neighbour travels ${nb.D} px over ${nb.distinct} distinct positions (the extent ${Dext} px); worst one-frame step ${nb.step} px vs bound ${nb.bound} (×${nb.ratio}) at ${nb.atMs ?? "-"} ms${pass ? "" : "  ⟶ FAILED: neighbour"}` });
            }
            await s.close();
        });
        // H3-5 · paint against the DOM model in flight: lossless screenshots bracketed by extent() reads
        const VAGREE = [["morph", "warm-collapse"], ["morph", "warm-expand"], ["vmorph", "warm-collapse"], ["vmorph", "warm-expand"]];
        await rep.guard(engine, VAGREE.map(([sc, k]) => `vagree·${sc}·${k}` + tag), async () => {
            for (const [scene, k] of VAGREE) {
                const s = await openScene(browser, target, scene);
                const page = s.page;
                const L = (e) => (e.axis === "y" ? e.h : e.w);
                await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 500, cap: 7000 });
                const big = await extentNow(page);
                await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 500, cap: 7000 });
                const small = await extentNow(page);
                const ax = big.axis;
                const clip = { x: Math.min(big.l, small.l) - 24, y: Math.min(big.t, small.t) - 24, width: Math.max(big.r, small.r) - Math.min(big.l, small.l) + 48, height: Math.max(big.b, small.b) - Math.min(big.t, small.t) + 48 };
                const lo = Math.min(L(big), L(small)) + 0.5, hi = Math.max(L(big), L(small)) - 0.5;
                await probeMode(page, "plate");
                const rows = [];
                for (let rep_ = 0; rep_ < 3; rep_++) {
                    await page.evaluate((k) => (k === "warm-collapse" ? window.__scene.expand() : window.__scene.collapse()), k); await waitRest(page, { quiet: 400, cap: 7000 });
                    const t0 = Date.now();
                    await page.evaluate((k) => (k === "warm-collapse" ? window.__scene.collapse() : window.__scene.expand()), k);
                    while (Date.now() - t0 < 500) {
                        const pre = L(await extentNow(page)); const img = await shoot(page, clip); const post = L(await extentNow(page));
                        const cov = magentaCoverage(img); let best = 0;
                        if (ax === "y") { for (let x = 0; x < img.w; x++) { let sum = 0; for (let y = 0; y < img.h; y++) sum += cov[y * img.w + x]; best = Math.max(best, sum); } }
                        else { for (let y = 0; y < img.h; y++) { let sum = 0; for (let x = 0; x < img.w; x++) sum += cov[y * img.w + x]; best = Math.max(best, sum); } }
                        const painted = best / img.dsf, a = Math.min(pre, post), b = Math.max(pre, post);
                        rows.push({ rep: rep_, dsf: img.dsf, ms: Date.now() - t0, pre: r2(pre), post: r2(post), painted: r2(painted), outPx: r2(painted < a ? a - painted : painted > b ? painted - b : 0), inflight: pre > lo && pre < hi && post > lo && post < hi });
                    }
                    await waitRest(page, { quiet: 300, cap: 7000 });
                }
                await probeMode(page, null);
                const infl = rows.filter((x) => x.inflight), worst = Math.max(0, ...infl.map((x) => x.outPx)), restOut = Math.max(0, ...rows.filter((x) => !x.inflight).map((x) => x.outPx));
                const judged = infl.length >= 2;
                const vb = VAGREE_PX + 1 / (rows[0]?.dsf ?? 1);
                const ok = worst <= vb;
                rep.add({ engine, cell: `vagree·${scene}·${k}` + tag, pass: judged && ok, unmeasured: judged ? undefined : (ok ? true : undefined), failed: ok ? [] : ["vagree"], samples: rows.length, inflight: infl.length, worstOutInflightPx: r2(worst), worstOutRestPx: r2(restOut), rests: [r2(L(small)), r2(L(big))], rows,
                    summary: `${judged ? "" : ok ? "UNMEASURED (fewer than 2 lossless shots in flight) · " : ""}${rows.length} lossless shot(s), ${infl.length} in flight (both bracketing reads strictly between the rests ${r2(L(small))} / ${r2(L(big))} px): painted main length outside [pre, post] by ${r2(worst)} px in flight (bound ${r2(vb)}: ${VAGREE_PX} + 1 device px), ${r2(restOut)} px otherwise (recorded)${ok ? "" : "  ⟶ FAILED: vagree"}` });
                await s.close();
            }
        });
        // H3-3 · compaction's leaving seats (and the paint floor) on the opt-in compact rung
        await rep.guard(engine, ["compaction" + tag], async () => {
            const s = await openScene(browser, target, "compact", { query: { active: "b" } });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            const has = await s.page.evaluate(() => !!window.__dockProbe.compact?.());
            if (!has) { rep.add({ engine, cell: "compaction" + tag, pass: false, failed: ["leaving", "blank"], summary: "the dock has no compact rung (compact() is false): nothing compacts, so nothing leaves on it  ⟶ FAILED: leaving, blank" }); await s.close(); return; }
            await scrollSource(s.page, 0); await s.page.waitForTimeout(100); await waitRest(s.page, { quiet: 400 });
            await startLog(s.page, STRIP); await s.page.waitForTimeout(150);
            await mark(s.page, "compaction"); await scrollSource(s.page, 900);
            await waitChange(s.page, 3000); await waitRest(s.page, { quiet: 500, cap: 7000 });
            const fr = segment(await stopLog(s.page), (m) => m, "compaction"); dump(engine, "compaction", fr, ax);
            addMorphCell(engine, "compaction", analyseMorph(fr, RUNG, { ax, paintFloor: true }), { only: ["leaving", "blank"], note: "judged: leaving, blank (the rest recorded)" });
            await s.close();
        });
        // K-5 · the wide collapsed face (its motion strip; faces in pass 2)
        await rep.guard(engine, ["wide·warm-expand" + tag], async () => {
            const s = await openScene(browser, target, "morph", { query: { wide: "1" } });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { seats: true, owners: true }); await s.page.waitForTimeout(150);
            const segs = []; const c = await dockCenter(s.page);
            await step(s.page, "wide·warm-expand", () => s.page.mouse.move(c.x, c.y, { steps: 3 }), segs);
            const fr = segment(await stopLog(s.page), (m) => m, "wide·warm-expand");
            rep.cells.push({ engine, cell: "__wide-strip", strip: analyseMorph(fr, RUNG, { ax }) });
            await s.close();
        });
        // ── pass 2 · faces from pixels ──────────────────────────────────────
        const FACE_CELLS = [...MORPH_SEQ, ...SWAP_SEQ, ...WIDE_SEQ].map(([n]) => n + tag).concat(["wide·collapsed-rest" + tag]);
        await rep.guard(engine, FACE_CELLS, async () => { faces = await facesPass(browser, engine); });
    } finally {
        await browser.close();
    }
    // merge the pixel faces into the strip cells; the wide cells are faces-only (+ the wide strip)
    for (const c of rep.cells.filter((c) => c.engine === engine)) {
        const base = c.cell.replace(tag, "");
        if (faces[base] && c.continuity) {
            // the faces pass must have seen the transition the strip measured
            if (faces[base].ok === true && faces[base].travel != null && Math.abs(c.D) >= 20 && faces[base].travel < 20) faces[base] = { ...faces[base], ok: null, why: `UNMEASURED (the faces pass saw ${faces[base].travel} px of travel; the strip measured D ${c.D} px) · ${faces[base].why}` };
            c.faces = faces[base];
            if (faces[base].ok === false) { c.pass = false; c.failed = [...(c.failed ?? []), "faces"]; }
            else if (faces[base].ok === null && c.pass) { c.pass = false; c.unmeasured = true; c.unjudged = ["faces"]; }
            c.summary += `; faces ${faces[base].why}${faces[base].ok === false ? "  ⟶ FAILED: faces" : ""}`;
            console.log(`${c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : "FAIL"}  W3  (faces merged)  ${c.cell}  faces ${faces[base].why}`);
        }
    }
    const strip = rep.cells.find((c) => c.engine === engine && c.cell === "__wide-strip");
    if (strip) rep.cells.splice(rep.cells.indexOf(strip), 1);
    const onlyRe = args.cells ? new RegExp(String(args.cells)) : null;
    for (const name of ["wide·collapsed-rest", "wide·warm-expand", "wide·warm-collapse"]) {
        if (onlyRe && !onlyRe.test(name + tag)) continue;
        const f = faces[name];
        if (!f) { if (!rep.cells.some((c) => c.engine === engine && c.cell === name + tag)) rep.add({ engine, cell: name + tag, pass: false, summary: "faces not measured (the faces pass did not reach this cell)" }); continue; }
        const extra = name === "wide·warm-expand" && strip ? { ...strip.strip } : {};
        rep.add({ engine, cell: name + tag, pass: f.ok === true, unmeasured: f.ok === null, failed: f.ok === false ? ["faces"] : [], faces: f, ...extra, summary: `faces ${f.why}${f.ok === false ? "  ⟶ FAILED: faces" : ""}` });
    }
}
await target.close();
rep.finish(out);
