// W8 · every dock motion, sharp and at frame rate (O-66 §2, owner 2026-09-24: "the dock
// animations in all apps are poor and need to be fixed in the glass-ui root").
//
//   node w8-motion.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>] [--headed]
//
// The battery O-66 §2 names, and where each motion is judged:
//   expand / collapse          W3 warm pair, W6 form·expand / form·collapse (O-65)
//   content-width morph        W3 content-add / -remove, lead-add / -remove, swaps (O-56, O-64 R-2)
//   first-expand endpoint      W3 first-expand (O-64 R-1)
//   scroll compact             W4 compact cells (O-55)
//   unclipped seat states      W2 ring and reach (O-63)
//   one clock, no settle ring  W3 window, landing, trajectory (O-64 R-3, R-4); R-6 in r6-probe.mjs
// This witness adds the two judgements those do not make, over the same motions:
//   sharp    0 frames in which a painting seat sits under a non-identity scale or a blur filter
//            anywhere on its chain (O-64 R-4 "text under a non-identity scale"; "blurry"). DOM
//            computed style, so it gates headless.
//   60 fps   p95 frame interval ≤ 20 ms and ≤ 1 frame over 33.4 ms, judged HEADED ON A REAL GPU.
//            Headless, the verdict is UNMEASURED; the headless pacing is recorded as `pacing`
//            (≤ 1 frame over 40 ms), which proves the judge can see a stall (the `jank` plant).
// Consumer docks (value.js, keyframes, fourier): UNMEASURED here, see the consumer rows.
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, mark, waitRest, dockCenter, extentNow, scrollSource, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W8");
const rep = makeReport("W8", target);
if (args.headed) throw new Error("OWNER-RUN: headed browsers are banned under the machine law (2026-10-16); the headed real-GPU cell is the owner's to run");
const HEADED = false;

async function waitChange(page, cap = 7000) {
    const b = await extentNow(page); const t0 = Date.now();
    while (Date.now() - t0 < cap) { const e = await extentNow(page); const m = await page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return; await page.waitForTimeout(16); }
}
async function gpu(page) {
    return page.evaluate(() => { try { const c = document.createElement("canvas"); const gl = c.getContext("webgl"); const x = gl.getExtension("WEBGL_debug_renderer_info"); return x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER); } catch (e) { return "none (" + e.message + ")"; } });
}
function judge(engine, name, frames, renderer) {
    const moving = frames.filter((f) => f.m);
    const fr = moving.length >= 3 ? moving : frames;
    const dts = fr.slice(1).map((f, i) => f.t - fr[i].t).sort((a, b) => a - b);
    const p95 = dts.length ? dts[Math.min(dts.length - 1, Math.floor(dts.length * 0.95))] : 0;
    const over33 = dts.filter((d) => d > 33.4).length, over40 = dts.filter((d) => d > 40).length;
    const unsharp = fr.filter((f) => f.us > 0);
    const real = HEADED && !/swiftshader|llvmpipe|software/i.test(renderer);
    const checks = { sharp: unsharp.length === 0, pacing: over40 <= 1 };
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    const fps = real ? (p95 <= 20 && over33 <= 1 ? "PASS" : "FAIL") : "UNMEASURED (headless; O-66 §2 is judged headed on a real GPU)";
    rep.add({ engine, cell: name + engineTag(target, engine), pass: failed.length === 0 && (!real || fps === "PASS"), failed, frames: fr.length, p95: r2(p95), over33, over40, unsharpFrames: unsharp.length, unsharpFirst: unsharp[0]?.usWho, fps, renderer,
        summary: `${fr.length} motion frames: unsharp ${unsharp.length}${unsharp.length ? " (" + unsharp[0].usWho + ")" : ""} (bound 0); pacing p95 ${r2(p95)} ms, ${over33} > 33.4 ms, ${over40} > 40 ms (headless bound: ≤ 1 over 40); 60 fps: ${fps}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
}

for (const engine of engines(args)) {
    const browser = HEADED ? await (await import("./lib.mjs")).playwright[engine].launch({ headless: false }) : await launch(engine);
    browser.__engine = engine;
    const tag = engineTag(target, engine);
    try {
        await rep.guard(engine, ["expand", "collapse", "content-add"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "morph");
            const renderer = await gpu(s.page);
            await startLog(s.page, { sharp: true }); await s.page.waitForTimeout(150);
            const c = await dockCenter(s.page);
            await mark(s.page, "expand"); await s.page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            await mark(s.page, "collapse"); await s.page.mouse.move(4, 4); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            const c2 = await dockCenter(s.page); await mark(s.page, "x"); await s.page.mouse.move(c2.x, c2.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            await mark(s.page, "content-add"); await s.page.evaluate(() => window.__scene.setExtra(true)); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            const frames = await stopLog(s.page);
            for (const k of ["expand", "collapse", "content-add"]) judge(engine, k, frames.filter((f) => f.mk === k), renderer);
            await s.close();
        });
        await rep.guard(engine, ["swap" + tag], async () => {
            const s = await openScene(browser, target, "swap");
            const renderer = await gpu(s.page);
            await startLog(s.page, { sharp: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "swap"); await s.page.evaluate(() => window.__scene.setFace("long")); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            judge(engine, "swap", (await stopLog(s.page)).filter((f) => f.mk === "swap"), renderer);
            await s.close();
        });
        await rep.guard(engine, ["compact" + tag], async () => {
            const s = await openScene(browser, target, "compact");
            const has = await s.page.evaluate(() => !!window.__dockProbe.compact?.());
            if (!has) { rep.add({ engine, cell: "compact" + tag, pass: false, absent: true, summary: "absent: no compact-on-scroll rung (W4)" }); await s.close(); return; }
            const renderer = await gpu(s.page);
            await startLog(s.page, { sharp: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "compact"); await scrollSource(s.page, 900); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            judge(engine, "compact", (await stopLog(s.page)).filter((f) => f.mk === "compact"), renderer);
            await s.close();
        });
        await rep.guard(engine, ["form-expand" + tag], async () => {
            const s = await openScene(browser, target, "form");
            const renderer = await gpu(s.page);
            await startLog(s.page, { sharp: true }); await s.page.waitForTimeout(150);
            const c = await dockCenter(s.page);
            await mark(s.page, "form-expand"); await s.page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            judge(engine, "form-expand", (await stopLog(s.page)).filter((f) => f.mk === "form-expand"), renderer);
            await s.close();
        });
    } finally {
        await browser.close();
    }
}
for (const [who, why] of [
    ["value.js", "value.js has a live session: this seat builds and runs nothing there (fence)"],
    ["keyframes", "headed real-GPU runs of keyframes' served dock were not made by this seat (headless only)"],
    ["fourier", "headed real-GPU runs of fourier's docks were not made by this seat (headless only)"],
]) rep.add({ engine: "consumer", cell: `consumer·${who}`, pass: false, unmeasured: true, summary: `UNMEASURED: ${why}. O-66 §2 judges every dock motion there at 60 fps, headed, on a real GPU` });
await target.close();
rep.finish(out);
