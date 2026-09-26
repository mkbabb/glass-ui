// D2-Bp-filmstrip.mjs: filmstrips of a D2-B′ prototype build for the gestalt critic
// (D2-Bp-spec.md §4 "Filmstrip gestalt"): the first expand, the warm pair, a swap and a
// content change. Each transition is screencast in Chromium (25 fps, one frame per
// 40 ms), cropped to the dock's band, and tiled top to bottom into one PNG per
// transition, the first tile being the last frame before the trigger. It reads pixels
// only; it never edits source.
//
//   node D2-Bp-filmstrip.mjs --build <prototype build> --adapter adapter-floor.mjs --out <dir>
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, openTarget, launch, screencast, waitRest, dockCenter, loadAvg } from "../harness/lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = path.resolve(args.out ?? "D2-Bp-records");
fs.mkdirSync(out, { recursive: true });
const TILES = 10;                      // 400 ms from the trigger
const crop = (vp) => ({ x: vp.width / 2 - 360, y: vp.height - 24 - 56 - 24, width: 720, height: 104 });
const browser = await launch("chromium");
const rows = [];

async function strip(name, scene, query, setup, trigger) {
    const dir = path.join(out, `.film-${name}`);
    const { frames, marks } = await screencast(browser, target, scene, { query, crop, dir }, async (page, mark) => {
        await setup(page);
        await waitRest(page, { quiet: 500 });
        await page.waitForTimeout(300);
        mark("trigger");
        await trigger(page);
        await page.waitForTimeout(900);
    });
    // the video's frame i is at ≈ i·40 ms from the context's start; the trigger mark is in the same clock
    const i0 = Math.max(0, Math.floor(marks.trigger / 40) - 1);
    const pick = frames.slice(i0, i0 + TILES + 1).map((f) => f.file);
    const file = path.join(out, `filmstrip-${name}.png`);
    execFileSync("ffmpeg", ["-v", "error", "-y", ...pick.flatMap((f) => ["-i", f]), "-filter_complex", `vstack=inputs=${pick.length}`, file]);
    fs.rmSync(dir, { recursive: true, force: true });
    rows.push({ name, file: path.basename(file), tiles: pick.length, msPerTile: 40, fromFrame: i0, load: loadAvg() });
    console.log(JSON.stringify(rows.at(-1)));
}

const hover = async (page) => { const c = await dockCenter(page); await page.mouse.move(c.x, c.y, { steps: 3 }); };
await strip("first-expand", "morph", {}, async () => {}, hover);
await strip("warm-collapse", "morph", {}, hover, (page) => page.mouse.move(4, 4));
await strip("warm-expand", "morph", {}, async (page) => { await hover(page); await waitRest(page, { quiet: 500 }); await page.mouse.move(4, 4); }, hover);
await strip("swap-long", "swap", {}, async () => {}, (page) => page.evaluate(() => window.__scene.setFace("long")));
await strip("content-add", "morph", {}, (page) => page.evaluate(() => window.__scene.expand()), (page) => page.evaluate(() => window.__scene.setExtra(true)));
fs.writeFileSync(path.join(out, "filmstrips.json"), JSON.stringify({ probe: "D2-Bp-filmstrip", build: target.label, when: new Date().toISOString(), rows }, null, 1));
await browser.close();
await target.close?.();
process.exit(0);
