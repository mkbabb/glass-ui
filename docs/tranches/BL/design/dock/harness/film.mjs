// FM · the filmstrip (H3-8, pass-3/H3.md): the first expand, the warm pair, both swaps and a
// content change, as the compositor painted them, in real page colours, for the B2 gestalt read.
//
//   node film.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>] [--cells <re>]
//
// Every sequence is driven by the scene hooks (__scene.expand / collapse / setFace / setExtra),
// never by a hover whose out-delay the tool would have to outwait (B′ V-1: 11 identical tiles,
// a 900 ms wait against a 3.6 s delay). Each runs in its own context under the screencast
// (lib.mjs screencast: 25 fps, one video px per CSS px). The trigger is ALIGNED on the video
// itself, in both engines, as stall.mjs does: a small black marker (MARK_PX square at the viewport's
// top-left corner, where the video's own scale moves nothing: Playwright WebKit paints its video
// scaled by 0.98-1.0, which moved a marker placed beside the plate off its expected pixels) is shown
// in the same task as the trigger hooks, so the first video frame that shows it is the first frame
// painted after the trigger. It is read from a second decode of the corner alone. The strip starts
// one frame before it. The wall-clock mark misplaced Playwright WebKit's strips in pass 2, and a
// search for "the first frame that differs" let a page still settling after load pass as a
// trigger (a planted dead trigger passed two WebKit strips that way in the H3 self-test draft).
//
// One gated check per strip:
//   tiles   the strip COUNTS only when its tiles differ: ≥ 2 distinct
//           consecutive tiles from the marker frame on. A strip of identical tiles is not a strip
//           (the trigger did nothing) and fails, so it is re-run, never read.
// RECORD: the strip PNG (<out>/runs/FM-*/strip-<engine>-<seq>.png), the tiles that differ, the
// motion span in frames.
// H4-6 (pass-4/H4.md): theme-aware. The marker square is placed RED when the page has settled and turns
// black in the trigger's task; the strip starts at the first black frame after a red one. A dark page
// never paints the corner light, so the pass-3 rule (light corner, then black) found no trigger there
// (Chromium dark 6/6 "no trigger marker"); and a white armed state is not enough, because Playwright
// WebKit's video opens on white frames before the page paints dark. Pure red is neither.
// H5-3 (pass-5/H5.md): the film read is promoted to a gated check. While the strip records, the in-page logger reads
// every glyph (lib.mjs startLog `glyphs`) and the strip's cell carries `stub` (lib.mjs stubRow): no glyph above 0.5
// opacity cut by a clip edge inside the plate to 10-90 % of its ink, the class B2's gestalt read found by eye.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, engines, openTarget, launch, makeReport, outDir, engineTag, screencast, readFrame, waitRest, extentNow, r2, startLog, stopLog, stubRow } from "./lib.mjs";

export const TILES = 14, NOISE_PX = 40, MARK_PX = 8, FRAME_MS = 40;
export const SEQ = [
    { name: "first-expand", scene: "morph", go: [["expand"]] },
    { name: "warm-collapse", scene: "morph", pre: [["expand"]], go: [["collapse"]] },
    { name: "warm-expand", scene: "morph", pre: [["expand"], ["collapse"]], go: [["expand"]] },
    { name: "swap-long", scene: "swap", go: [["setFace", "long"]] },
    { name: "swap-short", scene: "swap", pre: [["setFace", "long"]], go: [["setFace", "short"]] },
    { name: "content-add", scene: "morph", pre: [["expand"]], go: [["setExtra", true]] },
];
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "FM");
const rep = makeReport("FM", target);
/** pixels that differ by > 30 (sum of RGB), outside the rect `skip` ({x, y, w, h} in frame px) */
const diff = (a, b, skip = null) => { let n = 0; for (let y = 0; y < a.h; y++) for (let x = 0; x < a.w; x++) { if (skip && x >= skip.x && x < skip.x + skip.w && y >= skip.y && y < skip.y + skip.h) continue; const i = (y * a.w + x) * 4; if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 30) n++; } return n; };
/** the marker shows: its square's mean luminance is dark */
const lum = (img, m) => { let sum = 0, n = 0; for (let y = m.y + 2; y < m.y + m.h - 2; y++) for (let x = m.x + 2; x < m.x + m.w - 2; x++) { const i = (y * img.w + x) * 4; sum += (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; n++; } return n > 0 ? sum / n : 0; };
const marked = (img, m) => lum(img, m) < 60;
const armed = (img, m) => { let r = 0, g = 0, b = 0, n = 0; for (let y = m.y + 2; y < m.y + m.h - 2; y++) for (let x = m.x + 2; x < m.x + m.w - 2; x++) { const i = (y * img.w + x) * 4; r += img.data[i]; g += img.data[i + 1]; b += img.data[i + 2]; n++; } return n > 0 && r / n > 180 && g / n < 80 && b / n < 80; };
const hook = (page, [fn, a]) => page.evaluate(([fn, a]) => window.__scene[fn](a), [fn, a]);   // the pre hooks; the go hooks run in the marker's task

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const q of SEQ) {
            await rep.guard(engine, ["film·" + q.name + tag], async () => {
                const dir = path.join(out, `cast-${engine}-${q.name}`);
                let box = null, mk = null, strip = null;
                const cast = await screencast(browser, target, q.scene, { ctx: { deviceScaleFactor: 1 }, dir, crop: () => box }, async (page, mark) => {
                    for (const h of q.pre ?? []) { await hook(page, h); await page.waitForTimeout(200); await waitRest(page, { quiet: 500, cap: 7000 }); }
                    await page.waitForTimeout(400);
                    const e0 = await extentNow(page);
                    mk = { x: 0, y: 0 };
                    await page.evaluate(({ x, y, s }) => { const m = document.createElement("div"); m.id = "hp-film-mark"; m.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:#f00;z-index:2147483647;pointer-events:none;`; document.body.appendChild(m); }, { ...mk, s: MARK_PX });
                    await page.waitForTimeout(300);
                    await startLog(page, { seats: true, ink: true, glyphs: true }); await page.waitForTimeout(100);
                    mark("go");
                    await page.evaluate((go) => { window.__hpLog.mark = "go"; document.getElementById("hp-film-mark").style.setProperty("background", "#000", "important"); for (const [fn, a] of go) window.__scene[fn](a); }, q.go);
                    await page.waitForTimeout(1200); await waitRest(page, { quiet: 400, cap: 7000 });
                    const fr = await stopLog(page); const i0 = fr.findIndex((f) => f.mk === "go");
                    strip = i0 > 0 ? fr.slice(i0 - 1) : fr;
                    const e1 = await extentNow(page);
                    const vp = page.viewportSize();
                    const l = Math.max(0, Math.min(e0.l, e1.l) - 24), t = Math.max(0, Math.min(e0.t, e1.t) - 24), r = Math.min(vp.width, Math.max(e0.r, e1.r) + 24), b = Math.min(vp.height, Math.max(e0.b, e1.b) + 24);
                    box = { x: l, y: t, width: r - l, height: b - t };
                });
                const imgs = cast.frames.map((f) => readFrame(f));
                const goF = Math.max(0, Math.floor(cast.marks.go / FRAME_MS));
                // the marker corner, decoded on its own (the same -vsync 0 decode, so frame k is frame k)
                const mdir = path.join(dir, "mark"); fs.mkdirSync(mdir, { recursive: true });
                execFileSync("ffmpeg", ["-v", "error", "-i", cast.video, "-vsync", "0", "-vf", `crop=${MARK_PX}:${MARK_PX}:0:0`, path.join(mdir, "m%05d.png")]);
                const mk_ = fs.readdirSync(mdir).filter((f) => /^m\d+\.png$/.test(f)).sort().map((f) => readFrame({ file: path.join(mdir, f), origin: { x: 0, y: 0 } }));
                if (mk_.length !== imgs.length) throw new Error(`the marker decode has ${mk_.length} frames against ${imgs.length}`);
                const m = { x: 0, y: 0, w: MARK_PX, h: MARK_PX };
                const skip = null;
                // the marker counts only after its own red (armed) state has painted (H4-6: in any theme)
                const lit = mk_.findIndex((img) => armed(img, m));
                const start = lit < 0 ? -1 : mk_.findIndex((img, i) => i > lit && marked(img, m));
                if (start < 0) throw new Error("the video shows no trigger marker");
                const s0 = Math.max(0, start - 1);
                const pick = cast.frames.slice(s0, s0 + TILES);
                let distinct = pick.length ? 1 : 0; for (let i = 1; i < pick.length; i++) if (diff(imgs[s0 + i], imgs[s0 + i - 1], skip) > NOISE_PX) distinct++;
                let end = start; for (let i = start + 1; i < imgs.length; i++) if (diff(imgs[i], imgs[i - 1], skip) > NOISE_PX) end = i;
                const moved = diff(imgs[s0], imgs.at(-1), skip) > NOISE_PX || end > start;
                const png = path.join(out, `strip-${engine}-${q.name}.png`);
                const list = path.join(dir, "strip.txt");
                fs.writeFileSync(list, pick.map((f) => `file '${f.file}'`).join("\n"));
                execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-vf", `tile=1x${pick.length}:padding=2:color=red`, "-frames:v", "1", png]);
                const counted = distinct >= 2 && moved;
                const z = strip?.at(-1), ax = z && z.e[3] - z.e[1] > z.e[2] - z.e[0] ? "y" : "x";
                const stub = strip ? stubRow(strip, ax) : null;
                const failed = [...(counted ? [] : ["tiles"]), ...(stub && !stub.ok ? ["stub"] : [])];
                const pass = counted && !!stub && stub.ok;
                rep.add({ engine, cell: "film·" + q.name + tag, pass, failed, stub, strip: png, tiles: pick.length, distinctTiles: distinct, markerFrame: start, wallClockFrame: goF, alignShiftMs: (start - goF) * FRAME_MS, motionFrames: end - start + 1,
                    summary: `${pick.length} tiles from frame ${s0} (the trigger marker first shows on frame ${start}, ${(start - goF) * FRAME_MS} ms from the wall-clock mark), ${distinct} distinct; motion to frame ${end} (${(end - start + 1) * FRAME_MS} ms); strip ${path.basename(png)}; stub ${stub ? stub.why : "NOT READ (no glyph strip)"}${counted ? "" : "  ⟶ FAILED: tiles (the strip does not count)"}${stub && !stub.ok ? "  ⟶ FAILED: stub" : ""}` });
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
