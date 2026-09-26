// D2-G prototype · the filmstrip (REGISTRY §7.3 "Both"): the first expand, the warm pair
// (collapse, expand), a face swap and a content change, as the compositor painted them.
//
// Each sequence runs in its own context under the context's screencast (lib.mjs
// `screencast`: recordVideo, one video px per CSS px, frames 40 ms apart). The strip is the
// frames from the trigger to 520 ms after it, cropped to the dock with 24 px of page around it
// and stacked top to bottom (ffmpeg `tile`), one PNG per sequence and engine. Real page
// colours (no probe paint): this is the read a person makes.
//
//   node D2-G-proto-filmstrip.mjs --build <dir> --adapter <adapter.mjs> --label <name> --out <dir> [--engine chromium,webkit]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { openTarget, launch, screencast, readFrame, extentNow } from "../harness/lib.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const build = arg("build"), adapter = arg("adapter"), label = arg("label", "build"), out = arg("out");
const engineList = arg("engine", "chromium,webkit").split(",");
const FRAMES = 14; // 14 × 40 ms = 560 ms from the trigger

const SEQ = [
    { name: "first-expand", scene: "morph", go: [["expand"]] },
    { name: "warm-collapse", scene: "morph", pre: [["expand"]], go: [["collapse"]] },
    { name: "warm-expand", scene: "morph", pre: [["expand"], ["collapse"]], go: [["expand"]] },
    { name: "swap-grow", scene: "swap", go: [["setFace", "long"]] },
    { name: "swap-shrink", scene: "swap", pre: [["setFace", "long"]], go: [["setFace", "short"]] },
    { name: "content-add", scene: "morph", pre: [["expand"]], go: [["setExtra", true]] },
];

const target = await openTarget({ build, adapter: path.resolve(adapter) });
const index = [];
for (const engine of engineList) {
    const browser = await launch(engine);
    for (const q of SEQ) {
        const dir = path.join(out, `${label}-${engine}-${q.name}`);
        let box = null, goAt = null;
        const { frames } = await screencast(browser, target, q.scene, {
            ctx: { deviceScaleFactor: 1 }, dir,
            crop: () => box,
        }, async (page, mark) => {
            for (const [fn, a] of q.pre ?? []) { await page.evaluate(([fn, a]) => window.__scene[fn](a), [fn, a]); await page.waitForTimeout(1200); }
            // the crop holds the dock's widest rest in this sequence: read both ends
            const e0 = await extentNow(page);
            await page.waitForTimeout(300);
            mark("go");
            for (const [fn, a] of q.go) await page.evaluate(([fn, a]) => window.__scene[fn](a), [fn, a]);
            await page.waitForTimeout(1400);
            const e1 = await extentNow(page);
            const l = Math.min(e0.l, e1.l) - 24, r = Math.max(e0.r, e1.r) + 24, t = Math.min(e0.t, e1.t) - 24, b = Math.max(e0.b, e1.b) + 24;
            box = { x: l, y: t, width: r - l, height: b - t };
        });
        index.push({ engine, name: q.name, frames: frames.length, dir });
    }
    await browser.close();
}
await target.close();

// Stack the frames from the trigger on. The dock is the only thing that moves on the scene
// page, so the sequence's motion is the last run of changing frames before the landed tail.
const diff = (a, b) => { let n = 0; for (let i = 0; i < a.data.length; i += 4) if (Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]) > 30) n++; return n; };
for (const it of index) {
    const files = fs.readdirSync(it.dir).filter((f) => /^f\d+\.png$/.test(f)).sort();
    // walk back from the end: the last still run before the final motion is the pre-trigger rest
    const imgs = files.map((f) => readFrame({ file: path.join(it.dir, f), origin: { x: 0, y: 0 } }));
    let end = imgs.length - 1;
    // A frame "moves" when more than NOISE pixels change (the VP8 encoder flickers a few
    // pixels on a still page, more under load).
    const NOISE = 40;
    while (end > 0 && diff(imgs[end], imgs[end - 1]) <= NOISE) end--;       // landed tail
    let start = end;
    while (start > 0 && diff(imgs[start], imgs[start - 1]) > NOISE) start--; // back through the motion
    const pick = files.slice(Math.max(0, start - 1), Math.max(0, start - 1) + FRAMES);
    const list = path.join(it.dir, "strip.txt");
    fs.writeFileSync(list, pick.map((f) => `file '${path.join(it.dir, f)}'`).join("\n"));
    const png = path.join(out, `strip-${label}-${it.engine}-${it.name}.png`);
    execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-vf", `tile=1x${pick.length}:padding=2:color=red`, "-frames:v", "1", png]);
    it.strip = png; it.motionFrames = [start, end]; it.picked = pick.length;
    console.log(`${it.engine} ${it.name}: motion frames ${start}..${end} (${(end - start + 1) * 40} ms), strip ${png}  [load ${os.loadavg()[0].toFixed(2)}]`);
}
fs.writeFileSync(path.join(out, `filmstrip-${label}.json`), JSON.stringify(index, null, 1));
