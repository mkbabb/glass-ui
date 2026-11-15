// carousel.mjs <tree> <engine> <cellset>: the Carousel's snap reversed. A drag of 150 px
// released (the strip snaps to the next card); at 25, 50 and 75 % of the snap's travel a
// second drag the other way catches it. Reads the first card's x every frame.
import { withBrowser, cell, gotoComp, rec, mark, stop, series, reversal, frameStats, box, touch, sleep, save } from "./lib.mjs";
const [tree = "11.1.0", engine = "chromium", cellset = "touch390"] = process.argv.slice(2);
const C = { fine: { w: 1440, h: 900 }, touch390: { w: 390, h: 844, touch: true } }[cellset];
const ITEM = "[data-testid=carousel-0] .carousel-item";
const out = { tree, engine, cellset, results: [] };
async function drag(P, from, dx, ms = 200) {
    const n = Math.round(ms / 16.7);
    if (C.touch && P.cdp) {
        await touch(P, "touchStart", from[0], from[1]);
        for (let k = 1; k <= n; k++) {
            await touch(P, "touchMove", from[0] + (dx * k) / n, from[1]);
            await sleep(16);
        }
        await touch(P, "touchEnd", 0, 0);
    } else {
        await P.page.mouse.move(from[0], from[1]);
        await P.page.mouse.down();
        for (let k = 1; k <= n; k++) {
            await P.page.mouse.move(from[0] + (dx * k) / n, from[1]);
            await sleep(16);
        }
        await P.page.mouse.up();
    }
}
await withBrowser(engine, async (b) => {
    for (const f of [null, 0.25, 0.5, 0.75]) {
        await cell(b, engine, C, async (P) => {
            await gotoComp(P, tree, "carousel");
            await P.page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), ITEM);
            await sleep(400);
            const st = await box(P, "[data-testid=carousel-0] .carousel-strip");
            const x0 = (await box(P, ITEM)).x;
            await rec(P, [{ as: "el", sel: ITEM }, { as: "content", sel: ITEM + " .carousel-item-content" }]);
            await sleep(100);
            await mark(P, "drag1");
            await drag(P, [st.x + st.w * 0.7, st.cy], -150);
            if (f == null) {
                await sleep(1500);
            } else {
                // wait until the first card has gone f of the way to its next rest (one card pitch)
                const pitch = await P.page.evaluate((s) => { const l = document.querySelectorAll(s); return l[1].getBoundingClientRect().x - l[0].getBoundingClientRect().x; }, ITEM);
                const t0 = Date.now();
                while (Date.now() - t0 < 2000) {
                    const x = (await box(P, ITEM)).x;
                    if ((x0 - x) / pitch >= f) break;
                    await sleep(4);
                }
                await mark(P, `rev-${Math.round(f * 100)}`);
                await drag(P, [st.x + st.w * 0.3, st.cy], 120, 150);
                await sleep(1500);
            }
            const res = await stop(P);
            const s = series(res, "el", "x");
            const r = { f, x0, end: s[s.length - 1].v, stats: frameStats(res) };
            if (f != null) r.rev = reversal(s, `rev-${Math.round(f * 100)}`, 10, 300);
            else {
                const vals = s.map((x) => x.v);
                r.travel = +(vals[0] - vals[vals.length - 1]).toFixed(1);
            }
            out.results.push(r);
            console.log(JSON.stringify({ f, end: r.end, verdict: r.rev && r.rev.verdict, worst: r.rev && r.rev.worst, travel: r.travel }));
            save(`logs/motion/rows/carousel-drag.${tree}.${engine}.${cellset}.${f}.json`, s.map((x) => [x.i, +x.t.toFixed(1), x.v, x.marks.join(",")]));
        });
    }
});
save(`logs/motion/carousel.${tree}.${engine}.${cellset}.json`, out);
