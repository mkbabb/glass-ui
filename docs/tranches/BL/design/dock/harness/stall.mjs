// ST · the stall row (H3-4, pass-3/H3.md). ONE tool every build uses: a 1.2 s main-thread
// block against the dock's warm expand, at five timings, read from the screencast.
//
//   node stall.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>] [--cells <re>]
//
// Arms (cells stall·<arm>), each in its own context, each after a warm cycle (expand, rest,
// collapse, rest) through the scene hooks, so the first-expand endpoint (W-6) is not the subject:
//   same-task   __scene.expand(); block                    (the flip and the block in one task)
//   1raf        __scene.expand(); rAF → block
//   2raf        __scene.expand(); rAF → rAF → block        (a compositor carrier's animations committed)
//   100ms       __scene.expand(); setTimeout 100 → block
//   mid-flight  __scene.expand(); rAF poll → block once the extent has travelled MID_FRAC of its travel
// The extent per frame is the plate's painted main length (probe paint "plate", magenta on white):
// the longest magenta row of a 100 px band around the dock's centre row in the screencast (lib.mjs
// screencast, 25 fps), in both engines, so every build is read by the same instrument (REGISTRY
// P2-3: the pass-2 cost row compared a rAF log against a screencast). Playwright WebKit's video
// paints the page scaled (about 0.98: a grey border right and below), so every length is divided
// by the video's own scale, the plate's painted cross extent over its DOM cross extent.
//
// Alignment is read from the video, never the wall clock: two black markers on the cropped row,
// A shown two painted frames before the trigger (then the trigger runs in a new task) and B shown
// in the task that ends the block, so B appears on the first frame painted after the block. Frame
// times are the video's own presentation timestamps (ffprobe), so a frame the encoder dropped under
// load is a longer dt, not a mis-timed step.
//
// RECORD (per cell): D, the time the extent first leaves its rest, the travel inside the block
// window (A to B), the time it lands. ONE gated check:
//   leap   no one-frame step of the painted length, from marker A to the landing, above the
//          continuity bound on the pinned rung at that frame's own dt: K_JITTER · v̂max · D · dt
//          + LEAP_SLACK_PX. A carrier that freezes and then covers the travel in one frame fails;
//          one that moves through the block, or resumes on its own clock, passes. `travel` fails
//          when the extent never travels ≥ 20 px (the trigger did not run: nothing is judged).
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, engines, openTarget, launch, makeReport, outDir, engineTag, screencast, readFrame, magentaCoverage, interiorGreen, probeMode, waitRest, extentNow, pinnedRung, springSpec, K_JITTER, r2 } from "./lib.mjs";

export const ARMS = ["same-task", "1raf", "2raf", "100ms", "mid-flight"];
export const BLOCK_MS = 1200, FRAME_MS = 40, MID_FRAC = 0.35;
/** VP8 noise on a static stadium's length reaches ~2 px (pass-2/H2.md §1); the bound's floor. */
export const LEAP_SLACK_PX = 2.0;
/** the video's static rests against the DOM's: the screencast's static-length noise (~2 px) plus margin */
export const REST_AGREE_PX = 4.0;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "ST");
const rep = makeReport("ST", target);
const RUNG = await pinnedRung(target);
const SPEC = springSpec(RUNG);
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const arm of ARMS) {
            await rep.guard(engine, ["stall·" + arm + tag], async () => {
                const dir = path.join(out, `cast-${engine}-${arm}`);
                let rest = null, big = null, marks = null;
                const cast = await screencast(browser, target, "morph", { ctx: { deviceScaleFactor: 1 }, dir, crop: () => ({ x: 0, y: Math.max(0, Math.floor((rest.t + rest.b) / 2) - 50), width: 1440, height: 100 }) }, async (page, mark) => {
                    await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 500, cap: 7000 });
                    big = await extentNow(page);
                    await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 500, cap: 7000 });
                    rest = await extentNow(page);
                    await probeMode(page, "plate");
                    await page.evaluate((y) => { for (const [id, x] of [["hp-mark-a", 2], ["hp-mark-b", 24]]) { const m = document.createElement("div"); m.id = id; m.style.cssText = `position:fixed;left:${x}px;top:${y - 3}px;width:18px;height:6px;background:#000;z-index:2147483647;visibility:hidden;`; document.body.appendChild(m); } }, Math.floor((rest.t + rest.b) / 2));
                    await page.waitForTimeout(400);
                    await page.evaluate(() => new Promise((r) => { document.getElementById("hp-mark-a").style.setProperty("visibility", "visible", "important"); requestAnimationFrame(() => requestAnimationFrame(r)); }));
                    mark("go");
                    marks = await page.evaluate(({ arm, BLOCK, frac, Lc, Le }) => new Promise((res) => {
                        const P = window.__dockProbe;
                        const t0 = performance.now();
                        const block = () => { const b0 = performance.now(); while (performance.now() - b0 < BLOCK) { /* busy */ } document.getElementById("hp-mark-b").style.setProperty("visibility", "visible", "important"); res({ t0, b0, b1: performance.now() }); };
                        window.__scene.expand();
                        if (arm === "same-task") return block();
                        if (arm === "1raf") return requestAnimationFrame(block);
                        if (arm === "2raf") return requestAnimationFrame(() => requestAnimationFrame(block));
                        if (arm === "100ms") return setTimeout(block, 100);
                        const poll = () => { const e = P.extent(); if ((e.r - e.l) - Lc >= frac * (Le - Lc) || performance.now() - t0 > 3000) block(); else requestAnimationFrame(poll); };
                        requestAnimationFrame(poll);
                    }), { arm, BLOCK: BLOCK_MS, frac: MID_FRAC, Lc: rest.w, Le: big.w });
                    mark("blockEnd");
                    await page.waitForTimeout(1800);   // the probe paint stays on to the end of the video: its last frames are the landed rest
                });
                // the video's own frame times (s → ms), one per decoded frame (lib.mjs decodes with -vsync 0)
                let T = [];
                try { T = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "frame=pts_time", "-of", "csv=p=0", cast.video], { encoding: "utf8" }).trim().split("\n").map((v) => 1000 * parseFloat(v)); } catch { }
                if (T.length !== cast.frames.length) T = cast.frames.map((_, i) => i * FRAME_MS);
                const reads = cast.frames.map((f) => {
                    const img = readFrame(f); const cov = magentaCoverage(img, interiorGreen(img));
                    let best = 0, cross = 0;
                    for (let y = 0; y < img.h; y++) { let s = 0; for (let x = 0; x < img.w; x++) s += cov[y * img.w + x]; best = Math.max(best, s); }
                    for (let x = 60; x < img.w; x++) { let s = 0; for (let y = 0; y < img.h; y++) s += cov[y * img.w + x]; cross = Math.max(cross, s); }
                    const dark = (x0) => { let lo = 255; for (let y = 0; y < img.h; y++) { let sum = 0; for (let x = x0; x < x0 + 10; x++) { const i = (y * img.w + x) * 4; sum += (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; } lo = Math.min(lo, sum / 10); } return lo < 90; };
                    return { Lv: best, cross, a: dark(5), b: dark(28) };
                });
                // a video opens on black frames before the first paint: a marker counts only once the page has painted it light
                const lit = reads.findIndex((r) => !r.a && !r.b);
                const goF = reads.findIndex((r, i) => i > lit && r.a), endF = reads.findIndex((r, i) => i > goF && goF >= 0 && r.b);
                if (goF < 0 || endF < 0) throw new Error(`the video shows no ${goF < 0 ? "trigger" : "block-end"} marker`);
                // the video's scale, from the frames after the trigger marker only: before it the page spends the
                // warm cycle in its own colours (no probe paint), and under load those frames outnumber the rest
                // (the median then read a 12 px "cross" and a scale of 0.2: pass-3/H3.md §3.0)
                const crosses = reads.slice(goF).map((r) => r.cross).filter((v) => v > 10);
                const scale = crosses.length ? med(crosses) / (rest.b - rest.t) : 1;
                const L = reads.map((r) => r.Lv / scale);
                const tAt = (i) => r2(T[i] - T[goF]);
                const pre = L.slice(Math.max(0, goF - 6), goF + 1).filter((v) => v > 0);
                const L0 = med(pre), L1 = med(L.slice(-6));
                const D = Math.abs(L1 - L0);
                const i0 = L.findIndex((v, i) => i > goF && Math.abs(v - L0) > 2);
                let iLand = L.length - 1; while (iLand > goF && Math.abs(L[iLand - 1] - L1) <= 1) iLand--;
                let worst = { step: 0, at: null, bound: LEAP_SLACK_PX, ratio: 0 };
                for (let i = goF + 1; i <= Math.min(L.length - 1, iLand + 2); i++) {
                    const bound = K_JITTER * SPEC.vmaxNorm * D * ((T[i] - T[i - 1]) / 1000) + LEAP_SLACK_PX, st = Math.abs(L[i] - L[i - 1]);
                    if (st / bound > worst.ratio) worst = { step: st, at: i, bound, ratio: st / bound };
                }
                const bound = worst.bound;
                const inBlock = L.slice(goF, endF);
                const travelInBlock = inBlock.length ? Math.max(...inBlock) - Math.min(...inBlock) : 0;
                // the instrument read itself: the video's two rests must be the DOM's (± REST_AGREE_PX) and its
                // scale near 1, or the video is not a reading of this dock (a truncated or blank tail under load
                // read scale 0.196 and a 0 px rest in the H3 self-test): UNMEASURED, re-run, never judged
                const instrumentOk = Math.abs(scale - 1) <= 0.1 && Math.abs(L0 - rest.w) <= REST_AGREE_PX && Math.abs(L1 - big.w) <= REST_AGREE_PX;
                const checks = { travel: D >= 20, leap: D >= 20 && worst.ratio <= 1 };
                const failed = instrumentOk ? Object.entries(checks).filter(([, v]) => !v).map(([k]) => k) : [];
                rep.add({ engine, cell: "stall·" + arm + tag, pass: instrumentOk && !failed.length, unmeasured: instrumentOk ? undefined : true, failed, videoScale: +scale.toFixed(4), D: r2(D), rests: [r2(L0), r2(L1)], restsDom: [r2(rest.w), r2(big.w)], blockMs: marks ? r2(marks.b1 - marks.b0) : null, callToBlockMs: marks ? r2(marks.b0 - marks.t0) : null,
                    blockEndMs: tAt(endF), firstMoveMs: i0 < 0 ? null : tAt(i0), landMs: tAt(iLand), travelInBlockPx: r2(travelInBlock), worstStepPx: r2(worst.step), worstStepAtMs: worst.at != null ? tAt(worst.at) : null, worstStepDtMs: worst.at != null ? r2(T[worst.at] - T[worst.at - 1]) : null, boundPx: r2(bound), ratio: r2(worst.ratio),
                    trace: L.slice(Math.max(0, goF - 2), Math.min(L.length, iLand + 3)).map((v, k) => [tAt(Math.max(0, goF - 2) + k), r2(v)]),
                    summary: `${instrumentOk ? "" : `UNMEASURED (the video's rests ${r2(L0)} / ${r2(L1)} px against the DOM's ${r2(rest.w)} / ${r2(big.w)} px, scale ${scale.toFixed(3)}: re-run) · `}${arm}: a ${marks ? Math.round(marks.b1 - marks.b0) : "?"} ms block ${marks ? r2(marks.b0 - marks.t0) : "?"} ms after the flip (video: trigger marker → block-end marker ${tAt(endF)} ms); D ${r2(D)} px (${r2(L0)} → ${r2(L1)}); first leaves its rest at ${i0 < 0 ? "never" : tAt(i0) + " ms"}, travels ${r2(travelInBlock)} px before the block-end marker, lands at ${tAt(iLand)} ms (RECORD; video scale ${scale.toFixed(3)}); worst one-frame step ${r2(worst.step)} px at ${worst.at != null ? tAt(worst.at) + " ms" : "-"} (dt ${worst.at != null ? r2(T[worst.at] - T[worst.at - 1]) : "-"} ms) vs bound ${r2(bound)} px (×${r2(worst.ratio)})${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
