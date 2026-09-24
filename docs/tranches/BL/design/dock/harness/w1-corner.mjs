// W1 · the plate corner is a circle of radius = half the cross-axis extent,
// at rest and at every sampled morph frame, in both orientations.
//
//   node w1-corner.mjs --build <dir> | --fixture pass|<fault>  [--engine chromium|webkit|all] [--out <dir>]
//
// The read is pixels, not computed style, so it holds for any family (border-radius,
// clip-path, shape(), SVG): probe paint makes the plate the only painted thing,
// opaque magenta on white, keeping every clip and transform on its chain. The
// silhouette's sub-pixel edges come from the middle row and column; every
// well-conditioned boundary point of each corner is measured against the circle
// of radius r = cross/2 centred r in from both edges (lib.mjs cornerRead).
//
// BOUND: every sampled boundary point within 1.0 CSS px (2 device px at DSF 2) of
// that circle. Source (HARNESS.md §W1): the stadium fixture reads at most 0.11 px
// (Chromium) and 0.07 px (Playwright WebKit); Playwright WebKit's pixel snapping
// of a plate at a fractional x reads 0.49 px on HEAD's true-stadium rests. 1.0 px
// is twice the larger, and the smallest real defect measured at HEAD (a squashed
// collapsed corner) reads 4.62 px.
import { parseArgs, engines, openTarget, launch, openScene, probeMode, shoot, magentaCoverage, cornerRead, makeReport, outDir, engineTag, waitRest, dockCenter, extentNow } from "./lib.mjs";

export const BOUND_PX = 1.0;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W1");
const rep = makeReport("W1", target);

async function silhouette(page) {
    const e = await extentNow(page);
    const vp = page.viewportSize();
    const clip = e.axis === "x"
        ? { x: 0, y: Math.max(0, e.t - 24), width: vp.width, height: Math.min(vp.height - Math.max(0, e.t - 24), e.h + 48) }
        : { x: Math.max(0, e.l - 24), y: 0, width: Math.min(vp.width - Math.max(0, e.l - 24), e.w + 48), height: vp.height };
    const img = await shoot(page, clip);
    const read = cornerRead(magentaCoverage(img), img.w, img.h, img.dsf, e.axis);
    return { ...read, adapter: { w: +e.w.toFixed(2), h: +e.h.toFixed(2) }, img };
}

function cellOf(engine, name, samples, note = "") {
    const bad = samples.filter((s) => s.empty || s.maxErr > BOUND_PX);
    const worst = samples.reduce((m, s) => (s.maxErr ?? 0) > (m?.maxErr ?? -1) ? s : m, null);
    const pass = samples.length > 0 && bad.length === 0;
    return {
        engine, cell: name + engineTag(target, engine), pass,
        samples: samples.length, failing: bad.length, boundPx: BOUND_PX,
        worst: worst && { maxErr: worst.maxErr, corner: worst.worstCorner, w: worst.w, h: worst.h, rExpected: worst.rExpected, rMean: worst.corners?.[worst.worstCorner]?.rMean },
        summary: `${samples.length} sample(s), worst ${worst?.maxErr ?? "n/a"} px at ${worst?.worstCorner ?? "-"} (plate ${worst?.w}x${worst?.h}, r=${worst?.rExpected}, measured mean r ${worst?.corners?.[worst?.worstCorner]?.rMean}); bound ${BOUND_PX} px${note}`,
    };
}

async function atRest(page, engine, name, fs) {
    await probeMode(page, "plate");
    await page.waitForTimeout(120);
    const s = await silhouette(page);
    await probeMode(page, null);
    const dA = Math.max(Math.abs(s.w - s.adapter.w), Math.abs(s.h - s.adapter.h));
    fs.writeFileSync(`${out}/${engine}-${name}.png`, s.img.png);
    delete s.img;
    const c = cellOf(engine, name, [s], `; adapter extent vs pixels Δ ${dA.toFixed(2)} px`);
    c.adapterDeltaPx = +dA.toFixed(2);
    rep.add(c);
}

/** Trigger, then screenshot continuously until the plate is still. */
async function sampleMorph(page, engine, name, trigger) {
    await probeMode(page, "plate");
    const before = await extentNow(page);
    await trigger();
    const t0 = Date.now();
    // wait for motion to start (hover intent, collapse dwell)
    for (;;) {
        const e = await extentNow(page);
        const m = await page.evaluate(() => window.__dockProbe.morphing());
        if (m || Math.abs(e.w - before.w) > 0.25 || Math.abs(e.h - before.h) > 0.25) break;
        if (Date.now() - t0 > 7000) break;
        await page.waitForTimeout(10);
    }
    const samples = [];
    const tStart = Date.now();
    let still = 0, last = null;
    while (Date.now() - tStart < 2500) {
        const s = await silhouette(page);
        s.tMs = Date.now() - tStart;
        delete s.img;
        samples.push(s);
        const k = `${s.w}x${s.h}`;
        still = k === last ? still + 1 : 0; last = k;
        const m = await page.evaluate(() => window.__dockProbe.morphing());
        if (still >= 3 && !m) break;
    }
    await probeMode(page, null);
    const moved = samples.length && new Set(samples.map((s) => `${s.w}x${s.h}`)).size;
    const c = cellOf(engine, name, samples, `; ${moved} distinct extents sampled over ${samples.at(-1)?.tMs ?? 0} ms`);
    c.frames = samples.map((s) => ({ t: s.tMs, w: s.w, h: s.h, maxErr: s.maxErr, corner: s.worstCorner }));
    rep.add(c);
}

const fs = await import("node:fs");
for (const engine of engines(args)) {
    const browser = await launch(engine);
    try {
        // horizontal fit-content dock (chicago C-2)
        {
            const s = await openScene(browser, target, "fit");
            await atRest(s.page, engine, "fit·rest", fs);
            // hover sweep, pointer parked on the trailing seat: the hover rung at rest
            const seats = await s.page.evaluate(() => window.__dockProbe.seats().map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width]; }));
            for (const [x, y, w] of seats) for (let k = -2; k <= 2; k++) { await s.page.mouse.move(x + (w / 5) * k, y); await s.page.waitForTimeout(35); }
            await s.page.waitForTimeout(700);
            await atRest(s.page, engine, "fit·hovered-rest", fs);
            await s.close();
        }
        // the demo SidebarDock (vertical), and the capped vertical rail at both scroll ends
        {
            const s = await openScene(browser, target, "sidebar", { settle: 1800 });
            await atRest(s.page, engine, "sidebar·rest", fs);
            await s.close();
        }
        {
            // a 600px-tall viewport: the demo rail (653px at 900) must scroll, the owner's F-18 case
            const s = await openScene(browser, target, "sidebar", { settle: 1800, ctx: { viewport: { width: 1440, height: 600 } }, query: { h: "480" } });
            await atRest(s.page, engine, "sidebar·short-viewport", fs);
            await s.close();
        }
        {
            const s = await openScene(browser, target, "rail");
            await atRest(s.page, engine, "rail·rest", fs);
            await s.page.evaluate(() => { const P = window.__dockProbe; P.seats().at(-1).scrollIntoView({ block: "end", inline: "end" }); });
            await s.page.waitForTimeout(500);
            await atRest(s.page, engine, "rail·scrolled-end", fs);
            await s.close();
        }
        // the extent morph, horizontal and vertical: every sampled frame
        for (const scene of ["morph", "vmorph"]) {
            const s = await openScene(browser, target, scene);
            await atRest(s.page, engine, `${scene}·collapsed-rest`, fs);
            const c = await dockCenter(s.page);
            await sampleMorph(s.page, engine, `${scene}·first-expand`, () => s.page.mouse.move(c.x, c.y, { steps: 3 }));
            await atRest(s.page, engine, `${scene}·expanded-rest`, fs);
            await sampleMorph(s.page, engine, `${scene}·warm-collapse`, () => s.page.mouse.move(4, 4));
            await waitRest(s.page);
            const c2 = await dockCenter(s.page);
            await sampleMorph(s.page, engine, `${scene}·warm-expand`, () => s.page.mouse.move(c2.x, c2.y, { steps: 3 }));
            await s.close();
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
