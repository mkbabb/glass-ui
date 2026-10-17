// rt.mjs (D2-G pass 4, development): W3's H4-5 retarget cell (scene swap&three=1, setFace long then mid
// `after` ms later, scheduled in the page), its strip kept whole for reading a verdict by hand, with the
// same rows W3 reads (blank, seatOverlap, leaving, splice).
//   node rt.mjs --build <dir> --adapter <a> --engine chromium [--after 40,80,120] [--reps 1] --out <dir>
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, startLog, stopLog, mark, waitRest, pinnedRung, springSpec, blankRow, seatRow, leavingRow, spliceRow } from "../../harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const SPEC = springSpec(await pinnedRung(target));
const afters = String(args.after ?? "40,80,120").split(",").map(Number);
const reps = Number(args.reps ?? 1);
fs.mkdirSync(args.out, { recursive: true });
const browser = await launch(args.engine ?? "chromium");
try {
    for (const after of afters) for (let k = 0; k < reps; k++) {
        const s = await openScene(browser, target, "swap", { query: { three: "1" } });
        try {
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, { seats: true, ink: true }); await s.page.waitForTimeout(150);
            await mark(s.page, "r");
            await s.page.evaluate((ms) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("mid"); }, ms); }, after);
            await s.page.waitForTimeout(after + 60);
            await waitRest(s.page, { quiet: 500, cap: 7000 });
            const tR = await s.page.evaluate(() => window.__hpRetarget ?? null);
            const all = await stopLog(s.page);
            const i0a = all.findIndex((f) => f.mk === "r");
            const fr = all.filter((f) => f.mk === "r"); if (i0a > 0) fr.unshift(all[i0a - 1]);
            const i0 = fr.findIndex((f) => f.t >= tR);
            const blank = blankRow(i0 > 0 ? fr.slice(i0 - 1) : fr, ax);
            const seat = seatRow(fr, ax, SPEC);
            const moving = fr.filter((f, i) => i && (Math.abs(f.e[0] - fr[i - 1].e[0]) > 0.25 || Math.abs(f.e[2] - fr[i - 1].e[2]) > 0.25));
            const lengthMs = moving.length ? moving.at(-1).t - fr[0].t : SPEC.settleS * 1000;
            const leave = leavingRow(fr, lengthMs), splice = spliceRow(fr, ax);
            const name = `rt-${after}-${k}`;
            fs.writeFileSync(`${args.out}/${name}.raw.json`, JSON.stringify(fr.map((f) => ({ ...f, t: f.t - fr[0].t }))));
            console.log(`${name}: retarget at ${(tR - fr[0].t).toFixed(1)} ms (frame ${i0}); blank ${blank.ok} (${blank.why}); seatOverlap ${seat.overlap.ok} ${JSON.stringify(seat.overlap.first ?? "")}; leaving ${leave.ok} (${leave.why}); splice ${splice.ok} (${splice.why})`);
        } finally { await s.close(); }
    }
} finally { await browser.close(); await target.close(); }
