// D2-G-crit-probes.mjs: the pass-3 D2-G critic's own arms (D2-G-critique.md). Reads DOM, hit
// testing and screencast pixels only; never edits source. Run through pass-3/adapter-G-p3.mjs
// (or pass-3/adapter-floor-v2.mjs for the floor-v2 base).
//
//   node D2-G-crit-probes.mjs --build <build> --adapter <adapter> --arm lunec,flowblock,edgeblock
//        --engine chromium|webkit|all --out <json> [--reps N] [--cast <scratch dir>]
//
// lunec      R5 (Q-7 at the arc). pass-3/D2-Bp-crit-probes.mjs `lune` takes R from the PLATE's
//            border-radius; G's plate is square (the doors round it), so that arm's gate counts
//            0 rows on G. This arm takes R from the corner that paints, the larger of the plate's
//            and the first `.dock-door`'s computed radius (the adapter names no door; this is a
//            DOM read of the route's own corner, used only to place points). Points per corner:
//            `edge` 1.5 px inside the box on the diagonal, `mid` halfway between the box corner
//            and the arc on the diagonal (depth R(1-1/√2)/2), both outside the arc when R > 5.2.
//            At rest (collapsed, expanded) and on EVERY rAF frame of a warm expand and a warm
//            collapse until the window closes. elementFromPoint must not return an element of
//            the dock (root.contains). The plate centre must.
// flowblock  The in-flow neighbour (scene morph&neighbour=1, H3-7) under a 1.2 s main-thread
//            block. Warm expand (after a warm cycle), block at `2raf` and at `mid-flight` (the
//            extent has travelled 0.35 of its travel), as harness/stall.mjs times them. Read from
//            the screencast (25 fps), plate magenta (probe "plate"), the neighbour kept visible
//            in its own blue: per frame on the dock's centre row, the plate's right edge and the
//            neighbour's right edge. RECORD: the worst overlap of the plate over the neighbour's
//            box (its right edge minus its 80 px width, in video px divided by the video's own
//            scale, read from the neighbour's rest width), and the neighbour's worst one-frame
//            step. A carrier whose glass and flow ride one clock overlaps 0 at every frame.
// edgeblock  The same block timings on the plain morph scene (centred, justify-content: center)
//            and on morph&anchor=end (K-11, the right edge holds). harness/stall.mjs reads the
//            plate's painted LENGTH only; this reads both painted edges per screencast frame and
//            RECORDS the anchored quantity's worst deviation from its rest (the centre for the
//            centred scene, the right edge for anchor-end), in the block window and after it.
// retdiag    Why pass-3/D2-Bp-p3-probes.mjs `retarget` dies in Chromium on G ("Execution context
//            was destroyed"): the same sequence (swap&three=1, setFace long, then mid after 40/80/
//            120 ms) with every navigation, crash, console error and page error recorded.
// retdiag2   Narrows retdiag: each step in its own evaluate, a liveness ping (evaluate 1) every
//            25 ms for 1.5 s after it, page.url(), and the same with three=0 (no third face) and
//            with setFace("long") alone, so the step that loses the context is named.
// retdiag3   The retarget arm's own shape: setFace("long"), then ONE evaluate that awaits an in-page
//            setTimeout (80 ms) and (variant) calls setFace("mid") or returns 1; and the same with the
//            frame logger (harness startLog, as the arm runs it) installed first.
// swaplag    (critic seat 2) the swap's seam against the glass: scene swap, setFace("long"). Per rAF:
//            the extent's main length, data-morphing, and for every seat painting after the swap the
//            computed clip-path and opacity of the seat and its ancestors up to the dock root. RECORD:
//            the frame the extent lands (within 0.5 px of its last value), the frame the window flag
//            clears, and the last frame any entering seat is still cut (a clip-path other than none on
//            its chain) or under 0.95 opacity, in ms after the trigger. A lossless shot of the dock 600 ms
//            after rest is saved under --cast, and the Tools seat's own clip is listed per frame through 10
//            frames after the flag clears (does the seam's last cut ease or snap at the hand-off?). Reads only.
// retarget2  pass-3/D2-Bp-p3-probes.mjs `retarget` with one change: the retarget to `mid` is
//            scheduled in the page (setTimeout, fire and forget) and its time read back after the
//            landing, instead of awaited inside one evaluate (which Chromium rejects on G, retdiag3).
//            The rows (blankRow, seatRow, leavingRow, vanish) and their bounds are the arm's, unchanged.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, screencast, readFrame, probeMode, extentNow } from "../harness/lib.mjs";

const args = parseArgs();
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const arms = String(args.arm ?? "lunec,flowblock").split(",");
const reps = +(args.reps ?? 1);
const target = await openTarget(args);
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const out = { probe: "D2-G-crit-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const add = (c) => { c.load = loadAvg(); out.cells.push(c); console.log(JSON.stringify(c)); };
const castRoot = path.resolve(args.cast ?? path.join(process.env.TMPDIR ?? "/tmp", "d2g-crit-cast"));

// ── lunec ────────────────────────────────────────────────────────────────────
const sample = () => {
    const P = window.__dockProbe, hp = window.__hp, plate = P.plate(), root = P.root();
    const e = P.extent();
    const door = root.querySelector(".dock-door");
    const R = Math.max(parseFloat(getComputedStyle(plate).borderTopLeftRadius) || 0, door ? parseFloat(getComputedStyle(door).borderTopLeftRadius) || 0 : 0);
    const r = Math.min(R, (e.r - e.l) / 2, (e.b - e.t) / 2);
    const inDock = (el) => !!el && root.contains(el);
    const mid = (r * (1 - Math.SQRT1_2)) / 2;
    const pts = [];
    for (const [d, kind] of [[1.5, "edge"], [mid, "mid"]]) pts.push([e.l + d, e.t + d, kind], [e.r - d, e.t + d, kind], [e.r - d, e.b - d, kind], [e.l + d, e.b - d, kind]);
    const lunes = pts.map(([x, y, kind]) => { const el = document.elementFromPoint(x, y); return { kind, at: [+x.toFixed(1), +y.toFixed(1)], dock: inDock(el), got: el ? hp.label(el) : "null" }; });
    const core = document.elementFromPoint((e.l + e.r) / 2, (e.t + e.b) / 2);
    return { t: performance.now(), plate: [+e.l.toFixed(1), +e.t.toFixed(1), +e.r.toFixed(1), +e.b.toFixed(1)], R: +r.toFixed(2), morphing: P.morphing(), luneHit: lunes.filter((x) => x.dock).length, lunes, coreHit: inDock(core), core: core ? hp.label(core) : "null" };
};
async function lunec(browser, engine) {
    for (const cell of ["rest-collapsed", "rest-expanded", "warm-expand", "warm-collapse"]) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "morph");
        // a warm cycle first (the first-expand endpoint is not the subject)
        await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500 });
        await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 500 });
        if (cell === "rest-expanded" || cell === "warm-collapse") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 500 }); }
        let rows;
        if (cell.startsWith("rest")) rows = [await s.page.evaluate(sample)];
        else rows = await s.page.evaluate(async ([dir, src]) => {
            const f = new Function(`return (${src})`)();
            const raf = () => new Promise((r) => requestAnimationFrame(r));
            if (dir === "expand") window.__scene.expand(); else window.__scene.collapse();
            const rs = []; const t0 = performance.now();
            await raf();
            for (let n = 0; n < 90; n++) { await raf(); const r = f(); rs.push(r); if (n > 3 && !r.morphing && performance.now() - t0 > 200) break; }
            return rs;
        }, [cell === "warm-expand" ? "expand" : "collapse", sample.toString()]);
        const big = rows.filter((r) => r.R > 5.2);
        const pts = big.flatMap((r) => r.lunes);
        const luneHit = pts.filter((p) => p.dock).length;
        const coreOk = rows.every((r) => r.coreHit);
        const inFlight = rows.filter((r) => r.morphing).length;
        add({ arm: "lunec", engine: LABEL[engine], cell, rep: k, pass: luneHit === 0 && coreOk && big.length > 0, luneHit, luneN: pts.length, edgeHit: pts.filter((p) => p.dock && p.kind === "edge").length, midHit: pts.filter((p) => p.dock && p.kind === "mid").length, coreOk, frames: rows.length, inFlight,
            Rs: [...new Set(rows.map((r) => r.R))].slice(0, 12), got: [...new Set(pts.filter((p) => p.dock).map((p) => p.got))],
            summary: `${cell}: corner points outside the arc hit the dock ${luneHit}/${pts.length} (edge ${pts.filter((p) => p.dock && p.kind === "edge").length}, mid ${pts.filter((p) => p.dock && p.kind === "mid").length}; bound 0) over ${rows.length} frame(s), ${inFlight} in the window; centre hits the dock ${coreOk ? "every" : "NOT every"} frame; R ${[...new Set(rows.map((r) => r.R))].slice(0, 6).join("/")} px` });
        await s.close();
    }
}

// ── flowblock ────────────────────────────────────────────────────────────────
const BLOCK_MS = 1200, MID_FRAC = 0.35, NB_W = 80;
const isMag = (r, g, b) => r > 170 && b > 170 && g < 110;
const isBlue = (r, g, b) => b > 170 && r < 130 && g < 150 && b - r > 90;
function rowRuns(img, y) {
    let magR = -1, magL = -1, bluL = -1, bluR = -1;
    for (let x = 0; x < img.w; x++) {
        const i = (y * img.w + x) * 4, r = img.data[i], g = img.data[i + 1], b = img.data[i + 2];
        if (isMag(r, g, b)) { if (magL < 0) magL = x; magR = x; }
        if (isBlue(r, g, b)) { if (bluL < 0) bluL = x; bluR = x; }
    }
    return { magL, magR, bluL, bluR };
}
async function flowblock(browser, engine) {
    for (const arm of ["2raf", "mid-flight"]) for (let k = 0; k < reps; k++) {
        const dir = path.join(castRoot, `${target.label.replace(/[^\w.@-]/g, "_")}-${engine}-${arm}-${k}`);
        let rest = null, big = null, marks = null, dom = null;
        const cast = await screencast(browser, target, "morph", { query: { neighbour: "1" }, ctx: { deviceScaleFactor: 1 }, dir, crop: () => ({ x: 0, y: Math.floor((rest.t + rest.b) / 2) - 2, width: 1440, height: 5 }) }, async (page) => {
            await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 500, cap: 7000 });
            big = await extentNow(page);
            await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 500, cap: 7000 });
            rest = await extentNow(page);
            dom = await page.evaluate(() => { const q = document.querySelector("[data-testid=neighbour]").getBoundingClientRect(); return { l: q.left, r: q.right }; });
            await probeMode(page, "plate");
            await page.addStyleTag({ content: `html[data-hp] body [data-testid=neighbour] { visibility: visible !important; background: #2040ff !important; }` });
            await page.waitForTimeout(500);
            marks = await page.evaluate(({ arm, BLOCK, frac, Lc, Le }) => new Promise((res) => {
                const P = window.__dockProbe; const t0 = performance.now();
                const block = () => { const b0 = performance.now(); while (performance.now() - b0 < BLOCK) { /* busy */ } res({ t0, b0, b1: performance.now() }); };
                window.__scene.expand();
                if (arm === "2raf") return requestAnimationFrame(() => requestAnimationFrame(block));
                const poll = () => { const e = P.extent(); if ((e.r - e.l) - Lc >= frac * (Le - Lc) || performance.now() - t0 > 3000) block(); else requestAnimationFrame(poll); };
                requestAnimationFrame(poll);
            }), { arm, BLOCK: BLOCK_MS, frac: MID_FRAC, Lc: rest.w, Le: big.w });
            await waitRest(page, { quiet: 600, cap: 7000 });
            await page.waitForTimeout(300);
        });
        const rows = cast.frames.map((f) => { const img = readFrame(f); return rowRuns(img, 2); });
        const ok = rows.filter((r) => r.magR >= 0 && r.bluR >= 0);
        // the video's own scale: the neighbour's blue width at the first frames (fully visible at rest) over its DOM width
        const restW = ok.slice(0, 5).map((r) => r.bluR - r.bluL + 1).sort((a, b) => a - b)[2] ?? NB_W;
        const sc = restW / (dom.r - dom.l);
        let worst = { ov: -Infinity }, step = { px: 0 };
        const per = [];
        for (let i = 0; i < ok.length; i++) {
            const r = ok[i];
            const nbL = r.bluR + 1 - NB_W * sc; // the neighbour's own left edge, from its right edge (the plate may cover its left part)
            const ov = (r.magR + 1 - nbL) / sc;
            per.push([+(r.magR / sc).toFixed(1), +(r.bluR / sc).toFixed(1), +ov.toFixed(1)]);
            if (ov > worst.ov) worst = { ov: +ov.toFixed(2), frame: i, plateR: +(r.magR / sc).toFixed(1), nbR: +(r.bluR / sc).toFixed(1) };
            if (i && Math.abs(r.bluR - ok[i - 1].bluR) / sc > step.px) step = { px: +(Math.abs(r.bluR - ok[i - 1].bluR) / sc).toFixed(2), frame: i };
        }
        const plateTravel = (Math.max(...ok.map((r) => r.magR)) - Math.min(...ok.map((r) => r.magR))) / sc;
        add({ arm: "flowblock", engine: LABEL[engine], cell: arm, rep: k, frames: rows.length, readable: ok.length, scale: +sc.toFixed(4), restGapPx: +(dom.l - rest.r).toFixed(2), plateTravelPx: +plateTravel.toFixed(1), worstOverlapPx: worst.ov, worst, nbWorstStepPx: step, blockMs: marks ? +(marks.b1 - marks.b0).toFixed(0) : null, per,
            summary: `${arm}: block ${marks ? (marks.b1 - marks.b0).toFixed(0) : "?"} ms; the plate travels ${plateTravel.toFixed(1)} px; worst overlap of the plate over the neighbour's box ${worst.ov} px at video frame ${worst.frame} (plate right ${worst.plateR}, neighbour right ${worst.nbR}); the neighbour's worst one-frame step ${step.px} px (rest gap ${(dom.l - rest.r).toFixed(1)} px)` });
    }
}

async function retdiag(browser, engine) {
    for (const after of [40, 80, 120]) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        const ev = [];
        const t0 = Date.now();
        s.page.on("framenavigated", (f) => { if (f === s.page.mainFrame()) ev.push({ ms: Date.now() - t0, nav: f.url().slice(-80) }); });
        s.page.on("crash", () => ev.push({ ms: Date.now() - t0, crash: true }));
        s.page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") ev.push({ ms: Date.now() - t0, console: m.type(), text: m.text().slice(0, 200) }); });
        s.page.on("pageerror", (e) => ev.push({ ms: Date.now() - t0, pageerror: String(e).slice(0, 200) }));
        let res = null, err = null;
        try {
            await s.page.waitForTimeout(150);
            await s.page.evaluate(() => window.__scene.setFace("long"));
            res = await s.page.evaluate(async (ms) => { await new Promise((f) => setTimeout(f, ms)); window.__scene.setFace("mid"); return performance.now(); }, after);
            await waitRest(s.page, { quiet: 500 });
            res = { ok: true, posture: await s.page.evaluate(() => window.__dockProbe.posture()) };
        } catch (e) { err = String(e).slice(0, 300); }
        add({ arm: "retdiag", engine: LABEL[engine], afterMs: after, res, err, events: ev, summary: `retarget at ${after} ms: ${err ? "ERROR " + err.slice(0, 120) : "ran"}; ${ev.length} event(s): ${ev.map((x) => JSON.stringify(x)).join(" ").slice(0, 400)}` });
        await s.close();
    }
}

async function retdiag2(browser, engine) {
    for (const v of [{ three: "1", seq: ["long", "mid"] }, { three: "1", seq: ["long"] }, { three: "0", seq: ["long"] }, { three: "1", seq: ["mid"] }]) {
        const q = v.three === "1" ? { three: "1" } : {};
        const s = await openScene(browser, target, "swap", { query: q });
        const steps = [];
        const t0 = Date.now();
        s.page.on("crash", () => steps.push({ ms: Date.now() - t0, crash: true }));
        s.page.on("close", () => steps.push({ ms: Date.now() - t0, close: true }));
        s.page.on("framenavigated", (f) => steps.push({ ms: Date.now() - t0, nav: f === s.page.mainFrame() ? "main" : "sub", url: f.url().slice(-60) }));
        s.page.on("console", (m) => steps.push({ ms: Date.now() - t0, console: m.type(), text: m.text().slice(0, 160) }));
        const before = await s.page.evaluate(() => ({ faces: [...document.querySelectorAll(".dock-layer, [data-layer-id]")].length, url: location.href.slice(-60) }));
        for (const face of v.seq) {
            let err = null;
            try { await s.page.evaluate((f) => { window.__scene.setFace(f); return true; }, face); } catch (e) { err = String(e).slice(0, 160); }
            steps.push({ ms: Date.now() - t0, setFace: face, err });
            let dead = null;
            for (let i = 0; i < 60; i++) {
                try { await s.page.evaluate(() => 1); } catch (e) { dead = { at: i * 25, err: String(e).slice(0, 120) }; break; }
                await new Promise((r) => setTimeout(r, 25));
            }
            steps.push({ ms: Date.now() - t0, after: face, alive: !dead, dead, url: s.page.url().slice(-60), probe: await s.page.evaluate(() => !!window.__dockProbe).catch((e) => "ERR " + String(e).slice(0, 60)) });
            if (dead) break;
        }
        add({ arm: "retdiag2", engine: LABEL[engine], variant: v, before, steps, summary: `three=${v.three} seq ${v.seq.join("→")}: ${steps.map((x) => JSON.stringify(x)).join(" ").slice(0, 600)}` });
        await s.close();
    }
}

async function retdiag3(browser, engine) {
    const { startLog, stopLog } = await import("../harness/lib.mjs");
    for (const v of [{ log: false, mid: false }, { log: false, mid: true }, { log: true, mid: false }, { log: true, mid: true }]) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        const out1 = { v };
        try {
            if (v.log) { await startLog(s.page, { seats: true, ink: true }); await s.page.waitForTimeout(150); }
            await s.page.evaluate(() => window.__scene.setFace("long"));
            out1.wait = await s.page.evaluate(async (mid) => { await new Promise((f) => setTimeout(f, 80)); if (mid) window.__scene.setFace("mid"); return performance.now(); }, v.mid).then(() => "ok", (e) => "ERR " + String(e).slice(0, 100));
            await s.page.waitForTimeout(800);
            out1.alive = await s.page.evaluate(() => 1).then(() => true, (e) => "ERR " + String(e).slice(0, 80));
            if (v.log) out1.stop = await stopLog(s.page).then((f) => `${f.length} frames`, (e) => "ERR " + String(e).slice(0, 100));
        } catch (e) { out1.err = String(e).slice(0, 160); }
        add({ arm: "retdiag3", engine: LABEL[engine], ...out1, summary: JSON.stringify(out1) });
        await s.close();
    }
}

async function retarget2(browser, engine) {
    const L = await import("../harness/lib.mjs");
    const spec = L.springSpec(L.DOCK_RUNG);
    const area4 = (l, t, r, b) => Math.max(0, r - l) * Math.max(0, b - t);
    const isect4 = (a, b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
    for (const after of [40, 80, 120]) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        const ax = await s.page.evaluate(() => window.__dockProbe.axis());
        await L.startLog(s.page, { seats: true, ink: true }); await s.page.waitForTimeout(150);
        await L.mark(s.page, "r");
        await s.page.evaluate((ms) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("mid"); }, ms); }, after);
        await s.page.waitForTimeout(after + 60);
        await waitRest(s.page, { quiet: 500 });
        const tRetarget = await s.page.evaluate(() => window.__hpRetarget);
        const fr = (await L.stopLog(s.page)).filter((f) => f.mk === "r");
        const i0 = fr.findIndex((f) => f.t >= tRetarget);
        const blank = L.blankRow(i0 > 0 ? fr.slice(i0 - 1) : fr, ax);
        const seat = L.seatRow(fr, ax, spec);
        const moving = fr.filter((f, i) => i && (Math.abs(f.e[0] - fr[i - 1].e[0]) > 0.25 || Math.abs(f.e[2] - fr[i - 1].e[2]) > 0.25));
        const lengthMs = moving.length ? moving.at(-1).t - fr[0].t : 300;
        const leave = L.leavingRow(fr, lengthMs);
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
        const pass = blank.ok && seat.overlap.ok && leave.ok && vanish.drop <= 0.5 && !s.errors.length && i0 > 0;
        add({ arm: "retarget2", engine: LABEL[engine], afterMs: after, rep: k, pass, frames: fr.length, retargetFrame: i0, blank: { ok: blank.ok, why: blank.why }, overlap: seat.overlap, leaving: { ok: leave.ok, why: leave.why }, vanish, pageErrors: s.errors.length,
            summary: `retarget at ${after} ms (frame ${i0}): blank ${blank.why}; overlap ${seat.overlap.frames} frame(s); leaving ${leave.why}; vanish worst one-frame drop ${vanish.drop}${vanish.seat ? ` (seat ${vanish.seat} ${vanish.from} → ${vanish.to} at +${vanish.atMs} ms)` : ""} (bound 0.5)` });
        await s.close();
    }
}

async function edgeblock(browser, engine) {
    for (const scene of ["centred", "anchor-end"]) for (const arm of ["2raf", "mid-flight"]) for (let k = 0; k < reps; k++) {
        const dir = path.join(castRoot, `${target.label.replace(/[^\w.@-]/g, "_")}-${engine}-edge-${scene}-${arm}-${k}`);
        let rest = null, big = null, marks = null;
        const query = scene === "anchor-end" ? { anchor: "end" } : {};
        const cast = await screencast(browser, target, "morph", { query, ctx: { deviceScaleFactor: 1 }, dir, crop: () => ({ x: 0, y: Math.floor((rest.t + rest.b) / 2) - 2, width: 1440, height: 5 }) }, async (page) => {
            await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 500, cap: 7000 });
            big = await extentNow(page);
            await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 500, cap: 7000 });
            rest = await extentNow(page);
            await probeMode(page, "plate");
            await page.waitForTimeout(500);
            marks = await page.evaluate(({ arm, BLOCK, frac, Lc, Le }) => new Promise((res) => {
                const P = window.__dockProbe; const t0 = performance.now();
                const block = () => { const b0 = performance.now(); while (performance.now() - b0 < BLOCK) { /* busy */ } res({ t0, b0, b1: performance.now() }); };
                window.__scene.expand();
                if (arm === "2raf") return requestAnimationFrame(() => requestAnimationFrame(block));
                const poll = () => { const e = P.extent(); if ((e.r - e.l) - Lc >= frac * (Le - Lc) || performance.now() - t0 > 3000) block(); else requestAnimationFrame(poll); };
                requestAnimationFrame(poll);
            }), { arm, BLOCK: BLOCK_MS, frac: MID_FRAC, Lc: rest.w, Le: big.w });
            await waitRest(page, { quiet: 600, cap: 7000 });
            await page.waitForTimeout(300);
        });
        const rows = cast.frames.map((f) => rowRuns(readFrame(f), 2)).filter((r) => r.magR >= 0);
        const w0 = rows.slice(0, 4).map((r) => r.magR - r.magL + 1).sort((a, b) => a - b)[1];
        const sc = w0 / rest.w;
        const q = (r) => scene === "anchor-end" ? (r.magR + 1) / sc : (r.magL + r.magR + 1) / 2 / sc;
        const q0 = q(rows[0]);
        const qEnd = q(rows.at(-1));
        let worst = { dev: 0 };
        const per = rows.map((r, i) => { const d = q(r) - q0; if (Math.abs(d) > Math.abs(worst.dev)) worst = { dev: +d.toFixed(2), frame: i, len: +((r.magR - r.magL + 1) / sc).toFixed(1) }; return [+(r.magL / sc).toFixed(1), +((r.magR + 1) / sc).toFixed(1)]; });
        add({ arm: "edgeblock", engine: LABEL[engine], cell: `${scene}·${arm}`, rep: k, frames: rows.length, scale: +sc.toFixed(4), restLen: +rest.w.toFixed(2), bigLen: +big.w.toFixed(2), anchored: scene === "anchor-end" ? "right edge" : "centre", worstDevPx: worst.dev, worst, endDevPx: +(qEnd - q0).toFixed(2), blockMs: marks ? +(marks.b1 - marks.b0).toFixed(0) : null, per,
            summary: `${scene}·${arm}: block ${marks ? (marks.b1 - marks.b0).toFixed(0) : "?"} ms; the ${scene === "anchor-end" ? "right edge" : "centre"} moves at worst ${worst.dev} px from its rest (video frame ${worst.frame}, painted length ${worst.len} px), ends ${(qEnd - q0).toFixed(2)} px off (lengths ${rest.w.toFixed(1)} → ${big.w.toFixed(1)})` });
    }
}

// ── swaplag ──────────────────────────────────────────────────────────────────
async function swaplag(browser, engine) {
    for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "swap");
        await waitRest(s.page, { quiet: 500 });
        const rows = await s.page.evaluate(async () => {
            const P = window.__dockProbe, root = P.root();
            const raf = () => new Promise((r) => requestAnimationFrame(r));
            const chain = (el) => { const out = []; for (let e = el; e && e !== root.parentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.clipPath !== "none" || +cs.opacity < 0.999) out.push({ cls: (e.className && e.className.baseVal === undefined ? e.className : "").toString().slice(0, 40), clip: cs.clipPath.slice(0, 60), o: +(+cs.opacity).toFixed(3) }); } return out; };
            const t0 = performance.now(); window.__scene.setFace("long"); const rs = []; let after = -1;
            for (let n = 0; n < 120; n++) {
                await raf(); const e = P.extent(); const len = P.axis() === "x" ? e.r - e.l : e.b - e.t;
                const seats = P.seats().filter((x) => !x.closest(".dock-ghost")).map((x) => ({ name: x.getAttribute("aria-label") || x.textContent.trim().slice(0, 12), c: chain(x), o: (() => { let o = 1; for (let q = x; q && q !== root.parentElement; q = q.parentElement) o *= +getComputedStyle(q).opacity; return +o.toFixed(3); })() }));
                rs.push({ t: +(performance.now() - t0).toFixed(1), len: +len.toFixed(2), m: P.morphing(), seats });
                if (!P.morphing() && rs.length > 3 && rs.at(-2).m) after = 0;
                if (after >= 0 && ++after > 10) break;
            }
            return rs;
        });
        const lenEnd = rows.at(-1).len;
        const land = rows.find((r, i) => rows.slice(i).every((q) => Math.abs(q.len - lenEnd) <= 0.5));
        const flag = rows.find((r, i) => i > 0 && !r.m && rows[i - 1].m) ?? null;
        const vis = rows.at(-1).seats.filter((x) => x.o > 0.95).map((x) => x.name);
        const own = (x) => (x.c.find((c) => !/100000px/.test(c.clip) && c.clip !== "none") ?? null);
        const tools = rows.map((r) => { const t = r.seats.find((x) => x.name === "Tools"); const c = t && own(t); return [r.t, r.m ? 1 : 0, c ? c.clip : "none"]; });
        let lastCut = null;
        for (const r of rows) { const cut = r.seats.filter((x) => vis.includes(x.name) && (x.o < 0.95 || x.c.some((c) => c.clip !== "none"))); if (cut.length) lastCut = { t: r.t, who: cut.map((x) => `${x.name}:${x.o}:${x.c.map((c) => c.clip).join("|")}`).slice(0, 3) }; }
        await waitRest(s.page, { quiet: 600 }); await s.page.waitForTimeout(600);
        const box = await s.page.evaluate(() => { const e = window.__dockProbe.extent(); return { x: e.l - 8, y: e.t - 8, width: e.r - e.l + 16, height: e.b - e.t + 16 }; });
        fs.mkdirSync(castRoot, { recursive: true });
        const shot = path.join(castRoot, `swaplag-${engine}-${k}.png`);
        await s.page.screenshot({ path: shot, clip: box });
        add({ arm: "swaplag", engine: LABEL[engine], rep: k, landMs: land?.t ?? null, flagClearMs: flag?.t ?? null, lastEnteringCutMs: lastCut?.t ?? null, lastCut, tools, finalSeats: vis, shot,
            summary: `swap-long: the extent lands at ${land?.t ?? "?"} ms, the window flag clears at ${flag?.t ?? "never"} ms; the last frame an entering seat is still cut or under 0.95: ${lastCut ? lastCut.t + " ms (" + lastCut.who.join(", ") + ")" : "none"}; Tools' own clip by frame [ms, window, clip]: ${tools.slice(-14).map((x) => x.join(" ")).join(" · ")}` });
        await s.close();
    }
}

for (const engine of engs) {
    const browser = await launch(engine);
    try {
        for (const a of arms) {
            try { if (a === "lunec") await lunec(browser, engine); else if (a === "flowblock") await flowblock(browser, engine); else if (a === "edgeblock") await edgeblock(browser, engine); else if (a === "retdiag") await retdiag(browser, engine); else if (a === "retdiag2") await retdiag2(browser, engine); else if (a === "retdiag3") await retdiag3(browser, engine); else if (a === "retarget2") await retarget2(browser, engine); else if (a === "swaplag") await swaplag(browser, engine); }
            catch (e) { add({ arm: a, engine: LABEL[engine], error: String(e).slice(0, 400) }); }
        }
    } finally { await browser.close(); }
}
out.finished = new Date().toISOString();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 1)); }
await target?.close?.();
process.exit(0);
