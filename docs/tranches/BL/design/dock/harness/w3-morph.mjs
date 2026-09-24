// W3 · the extent morph is continuous, lands dead (or bounces by design), closes its
// window on the rung's own clock, keeps every face inside the plate, and never has
// two running owners of one animated property. The O-64 rows R-1..R-5 are its sub-checks.
//
//   node w3-morph.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// A per-rAF frame strip (lib.mjs startLog) records the painted extent, the morph
// window, the worst face overhang and the ownership census across seven transitions:
//   first-expand     the FIRST expand after load (R-1)
//   warm-collapse    pointer leaves, the collapse dwell runs out
//   warm-expand
//   content-add      a label seat joins an expanded dock (R-2)
//   content-remove   and leaves it
//   swap-long        a layer swap to the wider face
//   swap-short       and back
//
// Per transition, with D = |target − start| and the rung's spring from the adapter
// (rung(): response, ζ, settle band, clockMs; HEAD reads springPreset("dock") via the
// scene and --spring-dock-duration from the cascade):
//   continuity  every frame's step of the extent length and of both main-axis edges
//               ≤ 1.5 · v̂max · D · dt + 0.5 px, where v̂max is the spring's peak
//               normalised velocity (lib.mjs springSpec). A one-frame jump of D fails
//               at any D; the 1.5 covers frame-time jitter and the time-normalised
//               curve's 1/x(T) factor; the 0.5 px is LayoutUnit rounding.
//   faces       no painting seat beyond the painted extent by more than 0.5 px (W-7).
//   landing     overshoot past target o ≤ 0.05 px (dead), or a designed bounce: the
//               spring's first peak M = exp(−ζπ/√(1−ζ²)) exceeds its settle band (LAW 0,
//               springPresets.ts:13-18) and o is within max(1 px, 0.5·M·D) of M·D.
//               0.05 < o < 1 px is the O-64 R-3 sub-pixel ring.
//   window      a change of D ≥ 0.5 px opens a window (R-2 has none); it lasts at most
//               clockMs + 2·F + the longest frame inside the window (R-4): one frame from
//               the input to the spring's first frame, one to observe the close, and one
//               headless-timer stall, with F = max(median dt, 16.7 ms). Counted in frames,
//               it closes no earlier than one frame before the extent lands (within
//               0.5 px, for good) and no later than two frames after it.
//   owners      0 frames where one element·pseudo·property has two running owners:
//               two animations, or an animation plus sustained JS inline writes (R-5).
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, mark, waitRest, dockCenter, extentNow, springSpec, r2 } from "./lib.mjs";

export const K_JITTER = 1.5;
export const STEP_SLACK_PX = 0.5;
export const OVERHANG_PX = 0.5;
export const DEAD_PX = 0.05;
export const SUBPX_PX = 1.0;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W3");
const rep = makeReport("W3", target);

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

function analyse(frames, rung) {
    const spec = springSpec(rung);
    const len = (f) => f.ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0];
    const edges = (f) => f.ax === "y" ? [f.e[1], f.e[3]] : [f.e[0], f.e[2]];
    const L = frames.map(len);
    const start = L[0], tgt = L.at(-1), D = Math.abs(tgt - start), dir = Math.sign(tgt - start) || 1;
    const dts = frames.slice(1).map((f, i) => f.t - frames[i].t).sort((a, b) => a - b);
    const F = Math.max(16.7, dts.length ? dts[Math.floor(dts.length / 2)] : 16.7);
    const ax = frames[0].ax;
    // continuity
    let worst = { ratio: 0 };
    for (let i = 1; i < frames.length; i++) {
        const dt = frames[i].t - frames[i - 1].t;
        const bound = K_JITTER * spec.vmaxNorm * D * (dt / 1000) + STEP_SLACK_PX;
        const steps = [Math.abs(L[i] - L[i - 1]), ...edges(frames[i]).map((v, k) => Math.abs(v - edges(frames[i - 1])[k]))];
        const step = Math.max(...steps);
        if (step / bound > worst.ratio) worst = { ratio: step / bound, step, bound, t: frames[i].t - frames[0].t, dt };
    }
    // faces
    const oh = Math.max(0, ...frames.map((f) => f.oh ?? 0));
    const ohWho = frames.find((f) => f.oh === oh)?.ohWho;
    // landing
    const iStart = L.findIndex((v) => Math.abs(v - start) > 0.5);
    const o = iStart < 0 ? 0 : Math.max(0, ...L.slice(iStart).map((v) => (v - tgt) * dir));
    let rev = 0, lastSign = 0;
    for (let i = Math.max(1, iStart); i < L.length; i++) { const d = L[i] - L[i - 1]; if (Math.abs(d) < 0.01) continue; const sg = Math.sign(d); if (lastSign && sg !== lastSign) rev++; lastSign = sg; }
    const designed = spec.M > spec.settleBand;
    let landing;
    if (o <= DEAD_PX) landing = { ok: true, why: "dead" };
    else if (o < SUBPX_PX) landing = { ok: false, why: `sub-pixel ring ${r2(o)} px (O-64 R-3)` };
    else if (designed && Math.abs(o - spec.M * D) <= Math.max(1, 0.5 * spec.M * D)) landing = { ok: true, why: `designed bounce ${r2(o)} px ≈ M·D ${r2(spec.M * D)}` };
    else landing = { ok: false, why: `undesigned overshoot ${r2(o)} px (spring M·D = ${r2(spec.M * D)} px, M ${spec.M.toExponential(2)} vs band ${spec.settleBand})` };
    // window
    const iLand = (() => { for (let i = L.length - 1; i >= 0; i--) if (Math.abs(L[i] - tgt) > 0.5) return i + 1; return 0; })();
    const iOpen = frames.findIndex((f) => f.m);
    const iClose = iOpen < 0 ? -1 : frames.findIndex((f, i) => i > iOpen && !f.m);
    const t = (i) => i < 0 || i >= frames.length ? null : frames[i].t - frames[0].t;
    const win = { open: t(iOpen), close: t(iClose), land: t(iLand), motionStart: t(iStart), clockMs: rung.clockMs, frameMs: r2(F) };
    let windowOk = true, windowWhy = "";
    if (D >= 0.5 && iOpen < 0) { windowOk = false; windowWhy = "no window opened for the change (O-64 R-2)"; }
    else if (iOpen >= 0) {
        const end = iClose < 0 ? frames.length - 1 : iClose;
        const dur = frames[end].t - frames[iOpen].t;
        const stall = Math.max(0, ...frames.slice(iOpen + 1, end + 1).map((f, k) => f.t - frames[iOpen + k].t));
        const allow = rung.clockMs + 2 * F + stall;
        win.duration = r2(dur); win.allowMs = r2(allow);
        if (iClose < 0) { windowOk = false; windowWhy = "window never closed"; }
        else if (dur > allow) { windowOk = false; windowWhy = `window ${r2(dur)} ms > clock ${r2(rung.clockMs)} + 2×${r2(F)} + stall ${r2(stall)} = ${r2(allow)} ms (O-64 R-4)`; }
        if (windowOk && D >= 0.5 && iClose >= 0) {
            const gapFrames = iClose - iLand;
            win.closeMinusLandFrames = gapFrames;
            if (gapFrames < -1) { windowOk = false; windowWhy = `window closed ${-gapFrames} frames before the extent landed`; }
            else if (gapFrames > 2) { windowOk = false; windowWhy = `window closed ${gapFrames} frames (${r2(frames[iClose].t - frames[iLand].t)} ms) after the extent landed (W-8)`; }
        }
    }
    // owners
    const dupFrames = frames.filter((f) => f.dup);
    const owners = { ok: dupFrames.length === 0, frames: dupFrames.length, first: dupFrames[0]?.dup };
    const cont = { ok: worst.ratio <= 1, ...worst };
    const faces = { ok: oh <= OVERHANG_PX, max: r2(oh), who: ohWho };
    return {
        D: r2(D), start: r2(start), target: r2(tgt), frames: frames.length, travelMs: win.land != null && win.motionStart != null ? r2(win.land - win.motionStart) : null,
        continuity: { ok: cont.ok, ratio: r2(cont.ratio), step: r2(cont.step), bound: r2(cont.bound), atMs: r2(cont.t), dt: r2(cont.dt) },
        faces, landing: { ...landing, overshoot: r2(o), reversals: rev }, window: { ok: windowOk, why: windowWhy, ...win }, owners,
        spec: { vmaxNorm: r2(spec.vmaxNorm), M: +spec.M.toExponential(3), band: spec.settleBand },
    };
}

function addCell(engine, name, a) {
    const checks = { continuity: a.continuity.ok, faces: a.faces.ok, landing: a.landing.ok, window: a.window.ok, owners: a.owners.ok };
    const pass = Object.values(checks).every(Boolean);
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    rep.add({ engine, cell: name + engineTag(target, engine), pass, failed, ...a,
        summary: `D ${a.D} px (${a.start}→${a.target}); max step ${a.continuity.step} px vs bound ${a.continuity.bound} (×${a.continuity.ratio} at ${a.continuity.atMs} ms); faces out ${a.faces.max} px; ${a.landing.why}, ${a.landing.reversals} reversal(s); window ${a.window.duration ?? "none"} ms (allow ${a.window.allowMs ?? "-"}, clock ${r2(a.window.clockMs)})${a.window.why ? " — " + a.window.why : ""}; travel ${a.travelMs ?? "-"} ms; two-owner frames ${a.owners.frames}${a.owners.first ? " (" + a.owners.first[0] + ")" : ""}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
}

async function run(page, engine, name, trigger, store) {
    await mark(page, name);
    await trigger();
    const began = await waitChange(page);
    await waitRest(page, { quiet: 500, cap: 7000 });
    await page.waitForTimeout(200);
    store.push({ name, began });
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    try {
        for (const scene of ["morph", "swap"]) {
            const s = await openScene(browser, target, scene);
            const rung = await s.page.evaluate(() => window.__dockProbe.rung());
            if (!rung) throw new Error("adapter rung() returned null");
            await s.page.evaluate(() => { window.__hpAxis = window.__dockProbe.axis(); });
            await startLog(s.page, { faces: true, owners: true });
            await s.page.waitForTimeout(150);
            const segs = [];
            if (scene === "morph") {
                const c = await dockCenter(s.page);
                await run(s.page, engine, "first-expand", () => s.page.mouse.move(c.x, c.y, { steps: 3 }), segs);
                await run(s.page, engine, "warm-collapse", () => s.page.mouse.move(4, 4), segs);
                const c2 = await dockCenter(s.page);
                await run(s.page, engine, "warm-expand", () => s.page.mouse.move(c2.x, c2.y, { steps: 3 }), segs);
                await run(s.page, engine, "content-add", () => s.page.evaluate(() => window.__scene.setExtra(true)), segs);
                await run(s.page, engine, "content-remove", () => s.page.evaluate(() => window.__scene.setExtra(false)), segs);
            } else {
                await run(s.page, engine, "swap-long", () => s.page.evaluate(() => window.__scene.setFace("long")), segs);
                await run(s.page, engine, "swap-short", () => s.page.evaluate(() => window.__scene.setFace("short")), segs);
            }
            const axis = await s.page.evaluate(() => window.__hpAxis);
            const frames = (await stopLog(s.page)).map((f) => ({ ...f, ax: axis }));
            for (const seg of segs) {
                const i0 = frames.findIndex((f) => f.mk === seg.name);
                const fr = frames.filter((f) => f.mk === seg.name);
                if (i0 > 0) fr.unshift(frames[i0 - 1]);   // the segment starts from the last frame before its trigger
                fs.writeFileSync(`${out}/${engine}-${seg.name}.json`, JSON.stringify(fr.map((f) => ({ t: r2(f.t - fr[0].t), len: r2(axis === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]), e: f.e, m: f.m, oh: f.oh, dup: f.dup }))));
                if (fr.length < 3) { rep.add({ engine, cell: seg.name + engineTag(target, engine), pass: false, summary: `only ${fr.length} frames logged` }); continue; }
                const a = analyse(fr, rung);
                a.beganAfterMs = seg.began;
                addCell(engine, seg.name, a);
            }
            await s.close();
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
