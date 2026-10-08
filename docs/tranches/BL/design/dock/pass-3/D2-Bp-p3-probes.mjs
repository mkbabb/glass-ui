// D2-Bp-p3-probes.mjs: the D2-B′ prototype's own arms (D2 pass 3). They read DOM, layout,
// timing and pixels only; they never edit source. Run on a build through
// adapter-floor-v2.mjs.
//
//   node D2-Bp-p3-probes.mjs --build <build> --adapter ../pass-3/adapter-floor-v2.mjs \
//        --arm retarget|hit|trough|subpx|recheck|all --engine chromium|webkit|all --out <json> [--reps N]
//
// Arms
//   retarget  a swap retargeted mid-flight to a third face (scene swap&three=1): setFace("long"),
//             then after 40 / 80 / 120 ms setFace("mid"). Per frame (startLog seats + ink): the H3
//             rows `seatRow` (overlap) and `leavingRow` over the whole strip, `blankRow` from the
//             frame before the retarget (before it, the face `mid` has not been asked for, and the
//             first leg is W3 `swap-long`'s), and
//             `vanish`: for every seat painting ≥ 0.5 of its box at the retarget, the largest
//             one-frame drop of its own ink (opacity × clipped ∩ plate / box) after it. A drop
//             > 0.5 in one frame is a seat that left the glass at the retarget instead of
//             leaving with it (the pass-3 DockCrossfade change: every face that still paints
//             goes out from what it paints). Bound: vanish ≤ 0.5.
//   hit       Q-7 (hit follows paint) on the prototype, in flight: a warm collapse and a warm
//             expand of the morph dock, sampled on 6 frames each. On each frame, for every seat:
//             elementFromPoint at the centre of its painted (clipped) rect hits that seat when
//             the painted rect is ≥ 4 × 4 px (`paintHit`); at the centre of its layout box when
//             nothing of it paints there (`ghostHit`, the clipped-away part), it does not.
//             Recorded beside: what is hit on the painted plate just outside the root box (a
//             collapse paints the plate wider than the root) and inside the root box just
//             outside the painted plate (an expand).
//   trough    REGISTRY P2-4 §4.3 "Both": how much content the glass shows through a transition.
//             Per frame, the painted seat ink inside the plate, Σ opacity × |clipped rect ∩ plate|
//             (CSS px²). Transitions: swap-long, swap-short (scene swap), warm-collapse,
//             warm-expand (scene morph). Reported: the lowest moving-frame ink over the lower of
//             the two rests (`trough`; a near-blank trough reads near 0), and for the warm
//             collapse the ink 40 ms and 80 ms after the trigger over the ink at rest (`kept40`,
//             `kept80`; a collapse that clears its content first reads near 0). Recorded; the
//             gated rows are W3's `blank` and `leaving`.
//   subpx     W3 `lattice`'s Playwright WebKit `seatStep` (one seat steps 0.99 px when the window
//             opens). The lattice transition (aria-current moved One → Two on the expanded morph
//             dock), sampled every rAF: for every run seat its integer layout offset (offsetLeft
//             summed to the root), its painted left (rect − root rect) and the translate the scene
//             wrote. Reported: the largest one-frame painted step of a seat, with the offset, the
//             sub-pixel layout (painted − translate) and the translate on both sides of it. The
//             reading names the cause when the step equals the change in (offset − sub-pixel
//             layout), the rounding the integer offsets leave out of the model.
//   recheck   a dock its container shrinks (the morph scene with its run filled to 40 seats, wider
//             than the 1440 px viewport): over a warm expand and a seat prepended, the
//             getComputedStyle calls per frame (the scene's check reads every box's computed
//             size). The check runs at the trigger; a scene whose own flow margins resize the
//             dock re-checks on every frame of the morph. A check reads every box (over 300 calls
//             at 40 seats); other readers make a handful (6 calls on one frame here). Bound:
//             no frame from the third after the trigger to the landing with more than 20 calls.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, startLog, stopLog, mark, blankRow, seatRow, leavingRow, springSpec, DOCK_RUNG } from "../harness/lib.mjs";

const args = parseArgs();
const arms = (args.arm ?? "all") === "all" ? ["retarget", "hit", "trough"] : String(args.arm).split(",");
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const reps = +(args.reps ?? 1);
const target = await openTarget(args);
const out = { probe: "D2-Bp-p3-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const add = (c) => { c.load = loadAvg(); out.cells.push(c); console.log(JSON.stringify(c)); };
const area4 = (l, t, r, b) => Math.max(0, r - l) * Math.max(0, b - t);
const isect4 = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];

// ── retarget ─────────────────────────────────────────────────────────────────
async function retarget(browser, engine) {
    const spec = springSpec(DOCK_RUNG);
    for (const after of [40, 80, 120]) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        const ax = await s.page.evaluate(() => window.__dockProbe.axis());
        await startLog(s.page, { seats: true, ink: true }); await s.page.waitForTimeout(150);
        await mark(s.page, "r");
        await s.page.evaluate(() => window.__scene.setFace("long"));
        const tRetarget = await s.page.evaluate(async (ms) => { await new Promise((f) => setTimeout(f, ms)); window.__scene.setFace("mid"); return performance.now(); }, after);
        await waitRest(s.page, { quiet: 500 });
        const fr = (await stopLog(s.page)).filter((f) => f.mk === "r");
        const i0 = fr.findIndex((f) => f.t >= tRetarget);
        const blank = blankRow(i0 > 0 ? fr.slice(i0 - 1) : fr, ax);
        const seat = seatRow(fr, ax, spec);
        const moving = fr.filter((f, i) => i && (Math.abs(f.e[0] - fr[i - 1].e[0]) > 0.25 || Math.abs(f.e[2] - fr[i - 1].e[2]) > 0.25));
        const lengthMs = moving.length ? moving.at(-1).t - fr[0].t : 300;
        const leave = leavingRow(fr, lengthMs);
        // vanish: seats painting ≥ 0.5 at the retarget frame, their largest one-frame ink drop after it
        const inkOwn = (q, e) => { const bb = area4(q[1], q[2], q[3], q[4]); return bb < 1 ? 0 : q[9] * area4(...isect4([q[5], q[6], q[7], q[8]], e)) / bb; };
        let vanish = { drop: 0 };
        if (i0 > 0) {
            const at = new Map((fr[i0 - 1].s ?? []).map((q) => [q[0], inkOwn(q, fr[i0 - 1].e)]));
            for (const [id, ink0] of at) {
                if (ink0 < 0.5) continue;
                let prev = ink0;
                for (let i = i0; i < fr.length; i++) {
                    const q = (fr[i].s ?? []).find((x) => x[0] === id);
                    const ink = q ? inkOwn(q, fr[i].e) : 0;
                    if (prev - ink > vanish.drop) vanish = { drop: +(prev - ink).toFixed(3), seat: id, from: +prev.toFixed(3), to: +ink.toFixed(3), atMs: +(fr[i].t - tRetarget).toFixed(1) };
                    prev = ink;
                }
            }
        }
        const pass = blank.ok && seat.overlap.ok && leave.ok && vanish.drop <= 0.5 && !s.errors.length;
        add({ arm: "retarget", engine: LABEL[engine], afterMs: after, rep: k, pass, frames: fr.length, retargetFrame: i0, blank: { ok: blank.ok, why: blank.why }, overlap: seat.overlap, leaving: { ok: leave.ok, why: leave.why }, vanish, pageErrors: s.errors.length,
            summary: `retarget at ${after} ms: blank ${blank.why}; overlap ${seat.overlap.frames} frame(s); leaving ${leave.why}; vanish worst one-frame drop ${vanish.drop}${vanish.seat ? ` (seat ${vanish.seat} ${vanish.from} → ${vanish.to} at +${vanish.atMs} ms)` : ""} (bound 0.5)` });
        await s.close();
    }
}

// ── hit ──────────────────────────────────────────────────────────────────────
async function hit(browser, engine) {
    for (const dir of ["collapse", "expand"]) {
        const s = await openScene(browser, target, "morph");
        if (dir === "collapse") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 }); }
        else { await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 400 }); }
        const r = await s.page.evaluate(async (dir) => {
            const P = window.__dockProbe, hp = window.__hp, root = P.root();
            const raf = () => new Promise((f) => requestAnimationFrame(f));
            const rows = [];
            if (dir === "collapse") window.__scene.collapse(); else window.__scene.expand();
            for (let n = 0; n < 6; n++) {
                await raf(); await raf();
                if (!P.morphing()) break;
                const e = P.extent(), rr = root.getBoundingClientRect();
                const cy = (e.t + e.b) / 2;
                const owner = (x, y) => { const el = document.elementFromPoint(x, y); return el; };
                const name = (el) => !el ? "null" : el.closest("[data-dock-seat]") ? "seat" : el.closest(".glass-dock") ? "dock" : el.tagName.toLowerCase();
                let paintHit = 0, paintN = 0, ghostHit = 0, ghostN = 0; const misses = [];
                for (const seat of P.seats()) {
                    const c = hp.paintedRect(seat), b = seat.getBoundingClientRect();
                    const op = hp.visibleOpacity(seat);
                    const cw = Math.min(c.r, e.r) - Math.max(c.l, e.l), ch = Math.min(c.b, e.b) - Math.max(c.t, e.t);
                    if (op > 0.05 && cw >= 4 && ch >= 4) {
                        paintN++;
                        const x = (Math.max(c.l, e.l) + Math.min(c.r, e.r)) / 2, y = (Math.max(c.t, e.t) + Math.min(c.b, e.b)) / 2;
                        const el = owner(x, y);
                        if (el && seat.contains(el)) paintHit++; else misses.push({ kind: "paint", seat: hp.label(seat), at: [+x.toFixed(1), +y.toFixed(1)], got: el ? hp.label(el) : "null" });
                    }
                    // the clipped-away part: a point of its layout box that paints nothing of it
                    const bx = (b.left + b.right) / 2, by = (b.top + b.bottom) / 2;
                    const paintsThere = op > 0.05 && bx >= Math.max(c.l, e.l) && bx <= Math.min(c.r, e.r) && by >= Math.max(c.t, e.t) && by <= Math.min(c.b, e.b);
                    if (!paintsThere && b.width > 0) {
                        ghostN++;
                        const el = owner(bx, by);
                        if (el && seat.contains(el)) { ghostHit++; misses.push({ kind: "ghost", seat: hp.label(seat), at: [+bx.toFixed(1), +by.toFixed(1)] }); }
                    }
                }
                const plateOutsideRoot = e.l < rr.left - 6 ? name(owner(e.l + 3, cy)) : null;
                const rootOutsidePlate = rr.left < e.l - 6 ? name(owner(rr.left + 3, cy)) : null;
                rows.push({ n, plate: [+e.l.toFixed(1), +e.r.toFixed(1)], root: [+rr.left.toFixed(1), +rr.right.toFixed(1)], paintN, paintHit, ghostN, ghostHit, plateOutsideRoot, rootOutsidePlate, misses: misses.slice(0, 4) });
            }
            return rows;
        }, dir);
        const paintN = r.reduce((a, x) => a + x.paintN, 0), paintHit = r.reduce((a, x) => a + x.paintHit, 0);
        const ghostN = r.reduce((a, x) => a + x.ghostN, 0), ghostHit = r.reduce((a, x) => a + x.ghostHit, 0);
        const pass = r.length > 0 && paintHit === paintN && ghostHit === 0;
        add({ arm: "hit", engine: LABEL[engine], dir, pass, frames: r.length, paintN, paintHit, ghostN, ghostHit, rows: r,
            summary: `warm ${dir}, ${r.length} in-flight frame(s): painted seat centres hit their seat ${paintHit}/${paintN}; clipped-away box centres hit their seat ${ghostHit}/${ghostN} (bound 0); plate outside the root → ${[...new Set(r.map((x) => x.plateOutsideRoot).filter(Boolean))].join("/") || "n/a"}; root outside the plate → ${[...new Set(r.map((x) => x.rootOutsidePlate).filter(Boolean))].join("/") || "n/a"} (recorded)` });
        await s.close();
    }
}

// ── trough ───────────────────────────────────────────────────────────────────
async function trough(browser, engine) {
    const runs = [["swap", "swap-long", null, (p) => p.evaluate(() => window.__scene.setFace("long"))],
        ["swap", "swap-short", (p) => p.evaluate(() => window.__scene.setFace("long")), (p) => p.evaluate(() => window.__scene.setFace("short"))],
        ["morph", "warm-collapse", (p) => p.evaluate(() => window.__scene.expand()), (p) => p.evaluate(() => window.__scene.collapse())],
        ["morph", "warm-expand", async (p) => { await p.evaluate(() => window.__scene.expand()); await waitRest(p, { quiet: 400 }); await p.evaluate(() => window.__scene.collapse()); }, (p) => p.evaluate(() => window.__scene.expand())]];
    for (const [scene, cell, pre, go] of runs) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, scene);
        if (pre) { await pre(s.page); await waitRest(s.page, { quiet: 400 }); }
        await startLog(s.page, { seats: true }); await s.page.waitForTimeout(150);
        await mark(s.page, "t");
        const t0 = await s.page.evaluate(() => performance.now());
        await go(s.page);
        await waitRest(s.page, { quiet: 500 });
        const fr = (await stopLog(s.page)).filter((f) => f.mk === "t");
        const ink = (f) => (f.s ?? []).reduce((a, q) => a + (q[9] > 0.05 ? q[9] * area4(...isect4([q[5], q[6], q[7], q[8]], f.e)) : 0), 0);
        const series = fr.map((f) => ({ t: f.t - t0, ink: ink(f), e: f.e }));
        const rest0 = series.filter((x) => x.t < 0).at(-1)?.ink ?? series[0].ink, rest1 = series.at(-1).ink;
        const moving = series.filter((x, i) => i && x.t >= 0 && (Math.abs(x.e[0] - series[i - 1].e[0]) > 0.25 || Math.abs(x.e[2] - series[i - 1].e[2]) > 0.25));
        const low = moving.length ? moving.reduce((m, x) => (x.ink < m.ink ? x : m)) : null;
        const at = (ms) => series.find((x) => x.t >= ms)?.ink ?? null;
        const row = { arm: "trough", engine: LABEL[engine], cell, rep: k, frames: fr.length, movingFrames: moving.length, rest0: Math.round(rest0), rest1: Math.round(rest1),
            trough: low ? +(low.ink / Math.max(1, Math.min(rest0, rest1))).toFixed(3) : null, troughAtMs: low ? +low.t.toFixed(1) : null };
        if (cell === "warm-collapse") { row.kept40 = +((at(40) ?? 0) / Math.max(1, rest0)).toFixed(3); row.kept80 = +((at(80) ?? 0) / Math.max(1, rest0)).toFixed(3); }
        row.summary = `${cell}: lowest moving-frame ink ${row.trough} of the lower rest (at ${row.troughAtMs} ms; rests ${row.rest0} / ${row.rest1} px²)${cell === "warm-collapse" ? `; kept at 40 ms ${row.kept40}, at 80 ms ${row.kept80}` : ""} (recorded)`;
        add(row);
        await s.close();
    }
}

// ── subpx ────────────────────────────────────────────────────────────────────
async function subpx(browser, engine) {
    for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "morph");
        await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 });
        await s.page.evaluate(() => window.__dockProbe.root().querySelector("[aria-label=One]").setAttribute("aria-current", "page"));
        await s.page.waitForTimeout(300); await waitRest(s.page, { quiet: 600, cap: 7000 }); await s.page.waitForTimeout(300);
        const r = await s.page.evaluate(async () => {
            const P = window.__dockProbe, root = P.root();
            const seats = [...root.querySelectorAll(".dock-run [data-dock-seat]")];
            const off = (el) => { let x = 0; for (let e = el; e && e !== root; e = e.offsetParent) x += e.offsetLeft; return x; };
            const tr = (el) => { let x = 0; for (let e = el; e && e !== root; e = e.parentElement) { const t = getComputedStyle(e).translate; if (t && t !== "none") x += parseFloat(t) || 0; } return x; };
            const read = () => { const rl = root.getBoundingClientRect().left; return seats.map((el) => { const p = el.getBoundingClientRect().left - rl, t = tr(el); return { off: off(el), p: +p.toFixed(3), t: +t.toFixed(3), lay: +(p - t).toFixed(3) }; }); };
            const frames = [];
            let stop = false;
            const tick = () => { frames.push({ t: performance.now(), m: root.hasAttribute("data-morphing"), s: read() }); if (!stop) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
            await new Promise((f) => setTimeout(f, 120));
            root.querySelector("[aria-label=One]").removeAttribute("aria-current"); root.querySelector("[aria-label=Two]").setAttribute("aria-current", "page");
            await new Promise((f) => setTimeout(f, 1200)); stop = true;
            let worst = { step: 0 };
            for (let i = 1; i < frames.length; i++) for (let j = 0; j < seats.length; j++) {
                const a = frames[i - 1].s[j], b = frames[i].s[j], step = Math.abs(b.p - a.p);
                if (step > worst.step) worst = { step: +step.toFixed(3), seat: j, label: seats[j].getAttribute("aria-label") ?? seats[j].textContent.trim().slice(0, 12), atMs: +(frames[i].t - frames[0].t).toFixed(1), morphing: [frames[i - 1].m, frames[i].m], before: a, after: b,
                    residual: +(((b.off - b.lay) - (a.off - a.lay))).toFixed(3) };
            }
            const still = seats.map((_, j) => { const ps = frames.map((f) => f.s[j].p); return +(Math.max(...ps) - Math.min(...ps)).toFixed(3); });
            // per seat: its largest one-frame step, with both sides of it (the seats the exchange does not move)
            const perSeat = seats.map((el, j) => {
                let w = { step: 0 };
                for (let i = 1; i < frames.length; i++) { const a = frames[i - 1].s[j], b = frames[i].s[j], step = Math.abs(b.p - a.p); if (step > w.step) w = { step: +step.toFixed(3), atMs: +(frames[i].t - frames[0].t).toFixed(1), morphing: [frames[i - 1].m, frames[i].m], before: a, after: b, residual: +(((b.off - b.lay) - (a.off - a.lay))).toFixed(3) }; }
                return { seat: j, label: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0, 12), ...w };
            });
            return { frames: frames.length, worst, spanBySeat: still, perSeat };
        });
        add({ arm: "subpx", engine: LABEL[engine], rep: k, ...r, summary: `largest one-frame painted step ${r.worst.step} px (seat ${r.worst.seat} ${r.worst.label}, +${r.worst.atMs} ms, window ${r.worst.morphing?.join("→")}); offset ${r.worst.before?.off} → ${r.worst.after?.off}, sub-pixel layout ${r.worst.before?.lay} → ${r.worst.after?.lay}, translate ${r.worst.before?.t} → ${r.worst.after?.t}; change in (offset − layout) ${r.worst.residual} px (recorded)` });
        await s.close();
    }
}

// ── recheck ──────────────────────────────────────────────────────────────────
async function recheck(browser, engine) {
    for (const mode of ["expand", "lead"]) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "morph");
        await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 });
        await s.page.evaluate(() => { const run = window.__dockProbe.root().querySelector(".dock-run"); const src = [...run.querySelectorAll("[data-dock-seat]")]; let i = 0; while (run.querySelectorAll("[data-dock-seat]").length < 40) { const c = src[i++ % src.length].cloneNode(true); c.removeAttribute("data-testid"); run.appendChild(c); } });
        await waitRest(s.page, { quiet: 400 });
        if (mode === "expand") { await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 500 }); }
        const r = await s.page.evaluate(async (mode) => {
            const root = window.__dockProbe.root();
            const host = root.parentElement.getBoundingClientRect().width, own = root.getBoundingClientRect().width;
            let gcs = 0; const o = window.getComputedStyle; window.getComputedStyle = function (...a) { gcs++; return o.apply(this, a); };
            const per = []; let last = 0; let stop = false; const morph = [];
            const tick = () => { per.push(gcs - last); last = gcs; morph.push(root.hasAttribute("data-morphing")); if (!stop) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
            if (mode === "expand") window.__scene.expand();
            else { const run = root.querySelector(".dock-run"); const c = run.querySelector("[data-dock-seat]").cloneNode(true); c.removeAttribute("data-testid"); run.prepend(c); }
            await new Promise((f) => setTimeout(f, 700)); stop = true; window.getComputedStyle = o;
            const lastMorph = morph.lastIndexOf(true);
            const late = per.slice(3, Math.max(3, lastMorph + 1));
            return { host: +host.toFixed(1), own: +own.toFixed(1), frames: per.length, morphFrames: morph.filter(Boolean).length, total: gcs, lateFrames: late.filter((n) => n > 20).length, lateCalls: late.reduce((a, b) => a + b, 0), perFrame: per.slice(0, 24).join(",") };
        }, mode);
        const pass = r.morphFrames > 0 && r.lateFrames === 0;
        add({ arm: "recheck", engine: LABEL[engine], mode, rep: k, pass, ...r, summary: `${mode}, 40 seats (dock ${r.own} px in a ${r.host} px container): ${r.total} getComputedStyle calls over ${r.frames} frames, ${r.lateFrames} morph frame(s) after the third with a check (> 20 calls; ${r.lateCalls} calls in all on those frames; bound 0); per frame ${r.perFrame}` });
        await s.close();
    }
}

for (const engine of engs) {
    const browser = await launch(engine);
    for (const arm of arms) {
        try {
            if (arm === "retarget") await retarget(browser, engine);
            else if (arm === "hit") await hit(browser, engine);
            else if (arm === "trough") await trough(browser, engine);
            else if (arm === "subpx") await subpx(browser, engine);
            else if (arm === "recheck") await recheck(browser, engine);
        } catch (e) { add({ arm, engine: LABEL[engine], error: String(e).slice(0, 400) }); }
    }
    await browser.close();
}
out.finished = new Date().toISOString();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 1)); }
await target?.close?.();
process.exit(0);
