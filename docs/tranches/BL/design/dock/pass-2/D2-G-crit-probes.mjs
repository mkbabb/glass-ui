// D2-G-crit-probes.mjs: the D2-G critic's own arms (D2 pass 2). They read DOM, layout,
// timing and pixels only; they never edit source. Run on a build through adapter-G.mjs (or
// the floor adapter on the floor control build).
//
//   node D2-G-crit-probes.mjs --build <build> --adapter <adapter.mjs> --arm vagree|stall|seam|ghosts|all \
//        --engine chromium|webkit|all --out <json> [--reps N]
//
// Arms
//   vagree   D2-G-proto open gap 3 ("W1 vmorph·warm-collapse `agree` 1.11 px in Playwright
//            WebKit, cause not established"). Lossless page screenshots IN FLIGHT, probe paint
//            "plate", each bracketed by two extent() reads. The painted main length (the
//            magenta coverage summed along the plate's centre line, CSS px) is compared with
//            [pre, post] ± 0 px: a positive `outPx` is paint outside what the DOM model says
//            at that moment. WebKit's page.screenshot does not complete a WAAPI transform
//            (D2-G-block §2.2), so in-flight shots are real frames. Cells: vmorph and morph,
//            warm collapse and warm expand, repeated `reps` times to gather samples.
//   stall    the compositor claim where it is weakest: a main-thread block that starts in the
//            SAME task as the posture call (no rAF in between), and 1 rAF after it. The
//            extent is read from the screencast (probe paint "plate", centre row), as
//            D2-G-cost.mjs does; reported: extent when the block starts / ends, travel inside
//            the block, longest still run. The prototype measured 2 rAFs, 60 ms and 100 ms.
//   seam     D2-G-proto open gap 5 (a faint vertical line at the window centre in the VP8
//            filmstrip). Lossless screenshots of the expanded morph dock at rest, real page
//            colours, DPR 2: per column, the mean of the drop-shadow band just above and just
//            below the plate (and, separately, the plate interior row band); reported is the
//            worst |column − mean of its ±3 px neighbours| at the window centre against the
//            worst anywhere else along the straights. Run on the floor build as the control.
//   ghosts   the compact rung (scene compact, active=b): per frame, every leaving seat's
//            visible opacity (the original) AND the carrier's clones in .dock-ghosts (their
//            count and highest visible opacity), so a clone's fade is not read as a pop.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs, openTarget, launch, openScene, waitRest, probeMode, shoot, magentaCoverage, extentNow, screencast, readFrame, scrollSource } from "../harness/lib.mjs";

const args = parseArgs();
const arms = (args.arm ?? "all") === "all" ? ["vagree", "stall", "seam", "ghosts"] : String(args.arm).split(",");
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const reps = +(args.reps ?? 4);
const target = await openTarget(args);
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const load = () => +os.loadavg()[0].toFixed(2);
const out = { probe: "D2-G-crit-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const add = (c) => { c.load = load(); out.cells.push(c); console.log(JSON.stringify(c)); };

/** Painted main length along the plate's centre line, CSS px (sub-pixel from coverage). */
function paintedLen(img, ax) {
    const cov = magentaCoverage(img);
    let best = 0;
    if (ax === "y") {
        // the column with the most coverage is the centre line
        for (let x = 0; x < img.w; x++) { let s = 0; for (let y = 0; y < img.h; y++) s += cov[y * img.w + x]; best = Math.max(best, s); }
    } else {
        for (let y = 0; y < img.h; y++) { let s = 0; for (let x = 0; x < img.w; x++) s += cov[y * img.w + x]; best = Math.max(best, s); }
    }
    return best / img.dsf;
}

async function vagree(browser, engine) {
    for (const [scene, dir] of [["vmorph", "collapse"], ["vmorph", "expand"], ["morph", "collapse"], ["morph", "expand"]]) {
        const s = await openScene(browser, target, scene);
        const page = s.page;
        await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 500 });
        const big = await extentNow(page);
        await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 500 });
        const small = await extentNow(page);
        const ax = big.axis;
        const L = (e) => (ax === "y" ? e.h : e.w);
        const clip = { x: Math.min(big.l, small.l) - 24, y: Math.min(big.t, small.t) - 24, width: Math.max(big.w, small.w) + 48 + Math.abs(big.l - small.l), height: Math.max(big.h, small.h) + 48 + Math.abs(big.t - small.t) };
        await probeMode(page, "plate");
        const samples = [];
        for (let r = 0; r < reps; r++) {
            // start at the far end of the move
            if (dir === "collapse") { await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 400 }); }
            else { await page.evaluate(() => window.__scene.collapse()); await waitRest(page, { quiet: 400 }); }
            const t0 = Date.now();
            await page.evaluate((d) => { d === "collapse" ? window.__scene.collapse() : window.__scene.expand(); }, dir);
            while (Date.now() - t0 < 450) {
                const pre = L(await extentNow(page));
                const img = await shoot(page, clip);
                const post = L(await extentNow(page));
                const len = paintedLen(img, ax);
                const lo = Math.min(pre, post), hi = Math.max(pre, post);
                const outPx = len < lo ? lo - len : len > hi ? len - hi : 0;
                samples.push({ rep: r, ms: Date.now() - t0, pre: +pre.toFixed(2), post: +post.toFixed(2), painted: +len.toFixed(2), outPx: +outPx.toFixed(2), inflight: Math.abs(pre - post) > 0.25 || (pre > L(small) + 0.5 && pre < L(big) - 0.5) });
            }
            await waitRest(page, { quiet: 300 });
        }
        const infl = samples.filter((x) => x.inflight);
        const rest = samples.filter((x) => !x.inflight);
        add({ arm: "vagree", engine: LABEL[engine], cell: `${scene}·${dir}`, restLen: [+L(small).toFixed(2), +L(big).toFixed(2)], samples: samples.length, inflight: infl.length,
            worstOutInflight: Math.max(0, ...infl.map((x) => x.outPx)), worstOutRest: Math.max(0, ...rest.map((x) => x.outPx)), rows: samples });
        await s.context?.close?.(); await s.page.close().catch(() => {});
    }
}

async function stall(browser, engine) {
    for (const when of ["same-task", "1raf"]) {
        for (let r = 1; r <= reps; r++) {
            const dir = path.join(path.dirname(path.resolve(args.out)), `.stall-${engine}-${when}-${r}`);
            let rest = null, marks = null;
            const { frames, marks: markTimes } = await screencast(browser, target, "morph", {
                ctx: { deviceScaleFactor: 1 }, dir,
                crop: () => ({ x: 0, y: (rest.t + rest.b) / 2 - 2, width: 1440, height: 4 }),
            }, async (page, mark) => {
                rest = await extentNow(page);
                await probeMode(page, "plate");
                await page.waitForTimeout(400);
                mark("go");
                marks = await page.evaluate((when) => new Promise((res) => {
                    const block = () => { const b0 = performance.now(); while (performance.now() - b0 < 1200) { /* busy */ } return b0; };
                    const t0 = performance.now();
                    if (when === "same-task") { window.__scene.expand(); const b0 = block(); res({ t0, b0, b1: performance.now() }); return; }
                    window.__scene.expand();
                    requestAnimationFrame(() => { const b0 = block(); res({ t0, b0, b1: performance.now() }); });
                }), when);
                mark("blockEnd");
                await page.waitForTimeout(900);
            });
            // extent per frame: the magenta run on the centre row (D2-G-cost.mjs's read). Frame i
            // sits at i·40 ms from the page's creation, the timebase of mark() (lib.mjs screencast).
            const ext = frames.map((f) => { const img = readFrame(f); const y = Math.floor(img.h / 2); let l = -1, rr = -1; for (let x = 0; x < img.w; x++) { const i = (y * img.w + x) * 4; if (img.data[i] > 180 && img.data[i + 1] < 110 && img.data[i + 2] > 180) { if (l < 0) l = x; rr = x; } } return l < 0 ? 0 : rr - l + 1; });
            const from = ext.find((w) => w > 0) ?? 0;
            const firstOff = ext.findIndex((w) => w > 0 && Math.abs(w - from) > 2);
            const goF = Math.floor(markTimes.go / 40), endF = Math.ceil(markTimes.blockEnd / 40);
            const inBlock = ext.slice(goF, endF + 1);
            add({ arm: "stall", engine: LABEL[engine], cell: when, rep: r, restW: +rest.w.toFixed(2), blockMs: marks ? +(marks.b1 - marks.b0).toFixed(0) : null, callToBlockMs: marks ? +(marks.b0 - marks.t0).toFixed(1) : null,
                goMs: markTimes.go, blockEndMs: markTimes.blockEnd, firstOffRestMs: firstOff < 0 ? null : firstOff * 40,
                movedBeforeBlockEnd: firstOff >= 0 && firstOff * 40 < markTimes.blockEnd - 40,
                travelInBlockWindow: inBlock.length ? Math.max(...inBlock) - Math.min(...inBlock) : null, widthsGoToEnd: inBlock, widthsAfter: ext.slice(endF + 1, endF + 10) });
            fs.rmSync(dir, { recursive: true, force: true });
        }
    }
}

async function seam(browser, engine) {
    const s = await openScene(browser, target, "morph", { ctx: { deviceScaleFactor: 2 } });
    const page = s.page;
    await page.evaluate(() => window.__scene.expand()); await waitRest(page, { quiet: 600 });
    await page.mouse.move(5, 5); await page.waitForTimeout(300);
    const e = await extentNow(page);
    const clip = { x: e.l - 10, y: e.t - 24, width: e.w + 20, height: e.h + 48 };
    const img = await shoot(page, clip);
    const d = img.dsf, cx = Math.round(((e.l + e.r) / 2 - img.clip.x) * d);
    const lum = (x, y) => { const i = (y * img.w + x) * 4; return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; };
    const band = (y0, y1) => { const col = []; for (let x = 0; x < img.w; x++) { let t = 0; for (let y = y0; y < y1; y++) t += lum(x, y); col.push(t / (y1 - y0)); } return col; };
    const top = Math.round((e.t - img.clip.y) * d), bot = Math.round((e.b - img.clip.y) * d);
    const rows = { shadeAbove: band(Math.max(0, top - 10 * d), top - 2 * d), shadeBelow: band(bot + 2 * d, Math.min(img.h, bot + 14 * d)), plate: band(top + 4 * d, bot - 4 * d) };
    const res = {};
    const lo = Math.round((e.l + 40 - img.clip.x) * d), hi = Math.round((e.r - 40 - img.clip.x) * d);
    for (const [k, col] of Object.entries(rows)) {
        const dev = (x) => Math.abs(col[x] - (col[x - 3 * d] + col[x + 3 * d]) / 2);
        let atC = 0; for (let x = cx - d; x <= cx + d; x++) atC = Math.max(atC, dev(x));
        let elsewhere = 0; for (let x = lo; x < hi; x++) if (Math.abs(x - cx) > 3 * d) elsewhere = Math.max(elsewhere, dev(x));
        res[k] = { atCentre: +atC.toFixed(2), elsewhere: +elsewhere.toFixed(2) };
    }
    fs.writeFileSync(path.join(path.dirname(path.resolve(args.out)), `seam-${target?.label ?? "b"}-${engine}.png`), img.png);
    add({ arm: "seam", engine: LABEL[engine], cell: "expanded-rest·dpr2", extent: e, ...res });
    await s.close();
}

async function ghosts(browser, engine) {
    const s = await openScene(browser, target, "compact", { query: { active: "b" } });
    await scrollSource(s.page, 0); await s.page.waitForTimeout(80); await waitRest(s.page, { quiet: 400 });
    const r = await s.page.evaluate(async () => {
        const hp = window.__hp, P = window.__dockProbe, root = P.root(), run = root.querySelector(".dock-run");
        const seats = [...run.querySelectorAll("[data-dock-seat], .dock-separator")].filter((el) => !el.parentElement.closest("[data-dock-seat]"));
        const who = seats.map((el) => el.getAttribute("aria-label") ?? (el.classList.contains("dock-separator") ? "sep" : el.textContent.trim().slice(0, 10)));
        const op = (el) => (el.isConnected && el.getClientRects().length ? hp.visibleOpacity(el) : 0);
        const log = []; let stop = false;
        const tick = (now) => {
            const g = [...root.querySelectorAll(".dock-ghosts > *")];
            const e = P.extent();
            log.push({ t: +now.toFixed(1), w: +(e.r - e.l).toFixed(1), o: seats.map((el) => +op(el).toFixed(3)), gN: g.length, gMax: +Math.max(0, ...g.map(op)).toFixed(3), gOps: g.map((x) => +op(x).toFixed(3)) });
            if (!stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 60));
        window.__scene?.scrollTo ? window.__scene.scrollTo(900) : window.scrollTo(0, 900);
        await new Promise((f) => setTimeout(f, 900)); stop = true;
        const t0 = log.findIndex((f, i) => i > 0 && Math.abs(f.w - log[i - 1].w) > 0.25);
        return { who, t0, frames: log.slice(Math.max(0, t0 - 3), t0 + 24) };
    });
    add({ arm: "ghosts", engine: LABEL[engine], ...r });
    await s.close();
}

for (const engine of engs) {
    const browser = await launch(engine);
    for (const arm of arms) {
        try { if (arm === "vagree") await vagree(browser, engine); else if (arm === "stall") await stall(browser, engine); else if (arm === "seam") await seam(browser, engine); else if (arm === "ghosts") await ghosts(browser, engine); }
        catch (e) { add({ arm, engine: LABEL[engine], error: String(e?.stack ?? e).slice(0, 600) }); }
    }
    await browser.close();
}
fs.writeFileSync(args.out, JSON.stringify(out, null, 1));
await target?.close?.();
process.exit(0);
