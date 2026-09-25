// r6-probe.mjs · the O-64 R-6 confirm-or-refute probe (promised to value-js-30 on
// 2026-09-23). keyframes' reading: on its gh build, the 6 px ring outside the expanded
// Scene glyph (a select trigger in the dock) changes over 1 s while the glyph's box is
// still (diffOutside 0-531 px), with 0 running animations on the trigger; attributed to
// the plate (backdrop-filter, two running scroll-timeline animations) re-sampling what
// lies behind it, not proven.
//
//   node r6-probe.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// The check (it can pass and fail): with the page static, the ring beside the select
// trigger is still over 1 s: 0 ring pixels differ from the first shot by ≥ 8/255 across
// 11 shots 100 ms apart (`ring·static`). The fixture passes; the `backdropmotion` plant
// (a stripe animating behind a backdrop-filter plate) fails it.
// The probe's arms (build targets; each a RECORD):
//   A  as-is, static page                       does the ring move by itself?
//   B  a stripe animating behind the dock       does the plate re-sample what lies behind?
//   C  B with the plate's backdrop-filter off   is the plate's backdrop the carrier of B?
//   D  A with the plate's own animations cancelled   do the cap timelines move the ring?
// Readout: A = 0 with B > 0 and C = 0 confirms the mechanism "the plate re-samples what lies
// behind" and says the ring moves only when the backdrop moves. A > 0 refutes "static page".
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, dockCenter, waitRest, decodePng, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "R6");
const rep = makeReport("R6", target);
const RING = 6;

async function ringDiff(page) {
    const box = await page.evaluate(() => { const P = window.__dockProbe; const t = P.root().querySelector("[data-testid=sel], [data-testid=play]") ?? P.seats().at(-1); const r = t.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const clip = { x: Math.floor(box.x - RING), y: Math.floor(box.y - RING), width: Math.ceil(box.w + 2 * RING), height: Math.ceil(box.h + 2 * RING) };
    const shots = [];
    for (let k = 0; k <= 10; k++) { shots.push(decodePng(await page.screenshot({ clip, scale: "device" }))); await page.waitForTimeout(100); }
    const d = shots[0].w / clip.width;
    const inBox = (x, y) => { const cx = x / d + clip.x, cy = y / d + clip.y; return cx >= box.x && cx <= box.x + box.w && cy >= box.y && cy <= box.y + box.h; };
    let worst = 0;
    for (const s of shots.slice(1)) { let n = 0; for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { if (inBox(x + 0.5, y + 0.5)) continue; const i = (y * s.w + x) * 4; const diff = Math.max(Math.abs(s.data[i] - shots[0].data[i]), Math.abs(s.data[i + 1] - shots[0].data[i + 1]), Math.abs(s.data[i + 2] - shots[0].data[i + 2])); if (diff >= 8) n++; } worst = Math.max(worst, n); }
    const bboxDelta = await page.evaluate((b) => { const P = window.__dockProbe; const t = P.root().querySelector("[data-testid=sel], [data-testid=play]") ?? P.seats().at(-1); const r = t.getBoundingClientRect(); return Math.max(Math.abs(r.x - b.x), Math.abs(r.y - b.y), Math.abs(r.width - b.w), Math.abs(r.height - b.h)); }, box);
    return { diffOutside: worst, bboxDelta: r2(bboxDelta), devicePx: r2(d) };
}
async function expanded(page) { const c = await dockCenter(page); await page.mouse.move(c.x, c.y, { steps: 3 }); await page.waitForTimeout(400); await waitRest(page, { quiet: 500 }); await page.mouse.move(c.x, c.y - 200); await page.waitForTimeout(200); }

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        await rep.guard(engine, ["ring·static" + tag], async () => {
            const s = await openScene(browser, target, "morph");
            await expanded(s.page);
            // keep it expanded: hold the pointer on the plate's top edge, away from the trigger
            const e = await s.page.evaluate(() => { const r = window.__dockProbe.plate().getBoundingClientRect(); return { x: r.left + 20, y: r.top + 4 }; });
            await s.page.mouse.move(e.x, e.y); await s.page.waitForTimeout(600); await waitRest(s.page, { quiet: 400 });
            const a = await ringDiff(s.page);
            rep.add({ engine, cell: "ring·static" + tag, pass: a.diffOutside === 0, ...a, summary: `static page, expanded, trigger un-hovered: ${a.diffOutside} ring pixels changed over 1 s (bound 0); trigger box moved ${a.bboxDelta} px` });
            if (target.kind === "build") {
                const arms = {};
                arms.A = a;
                await s.page.evaluate(() => { const st = document.createElement("div"); st.id = "hp-r6-stripe"; st.style.cssText = "position:fixed;left:0;right:0;bottom:30px;height:44px;z-index:0;background:repeating-linear-gradient(90deg,#e2412f 0 40px,#3a53e6 40px 80px);animation:hpr6 1s linear infinite"; const k = document.createElement("style"); k.textContent = "@keyframes hpr6{to{background-position:80px 0}}"; document.head.append(k); document.body.prepend(st); });
                await s.page.waitForTimeout(300); arms.B = await ringDiff(s.page);
                await s.page.evaluate(() => { const p = window.__dockProbe.plate(); p.dataset.r6 = p.style.cssText; p.style.setProperty("backdrop-filter", "none", "important"); p.style.setProperty("-webkit-backdrop-filter", "none", "important"); });
                await s.page.waitForTimeout(300); arms.C = await ringDiff(s.page);
                await s.page.evaluate(() => { const p = window.__dockProbe.plate(); p.style.cssText = p.dataset.r6; document.getElementById("hp-r6-stripe").remove(); });
                const cancelled = await s.page.evaluate(() => { const p = window.__dockProbe.plate(); const as = p.getAnimations(); const names = as.map((x) => x.animationName || x.transitionProperty || "waapi"); as.forEach((x) => x.cancel()); return names; });
                await s.page.waitForTimeout(300); arms.D = await ringDiff(s.page);
                const verdict = arms.A.diffOutside === 0
                    ? (arms.B.diffOutside > 0 && arms.C.diffOutside === 0 ? "CONFIRMED as a mechanism: the ring moves only when what lies behind the plate moves, and only through the plate's backdrop-filter; a static page reads 0" : `A = 0; B ${arms.B.diffOutside}, C ${arms.C.diffOutside}: the re-sampling reading is not isolated`)
                    : `REFUTED for a static page: the ring moves by itself (A ${arms.A.diffOutside}); D (plate animations cancelled: ${cancelled.join(", ") || "none running"}) reads ${arms.D.diffOutside}`;
                rep.add({ engine, cell: "r6·arms" + tag, pass: true, record: true, arms, cancelled, verdict, summary: `A static ${arms.A.diffOutside} · B backdrop moving ${arms.B.diffOutside} · C B without backdrop-filter ${arms.C.diffOutside} · D plate animations cancelled (${cancelled.join(", ") || "none"}) ${arms.D.diffOutside} ⟶ ${verdict}. Headless; keyframes' reading was headed on a real GPU` });
            }
            await s.close();
        });
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
