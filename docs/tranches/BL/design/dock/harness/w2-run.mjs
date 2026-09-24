// W2 · the run is not a scroll container unless its seats exceed the budget, across
// all four arming routes, and no seat's focus ring, selected ring or hover shadow is
// clipped in the cross (block) axis.
//
//   node w2-run.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// "Scroll container" is the CSS definition: computed overflow-x or -y of auto,
// scroll or hidden. The witness reads every scroll container that is an ancestor
// of a seat, inside the dock, on every frame of each route (lib.mjs startLog).
// "Seats exceed the budget" is read once at rest, transform-free: the union of the
// seats' boxes plus the run's main-axis padding against the adapter's budget().
//
//   route 1  long run (seats genuinely exceed): a scroll container is allowed; the ring check runs
//   route 2  collapsed layer: the collapsed dock at rest, inactive faces included
//   route 3  hover inline-size: routed seats (aria-current) hovered and re-selected in turn
//   route 4  hover scale transform: a hover sweep over every seat, parked on the last
//
// The paint check puts one seat in its fullest paint (keyboard focus + selected +
// hovered), paints only that seat on white (probe "seat"), and reads how far its
// paint reaches past its box on both cross-axis sides; then it lifts every clip on
// the seat's ancestors inside the dock ([data-hp-unclip]: overflow visible,
// clip-path/contain/mask none), re-hovers, and reads again. The cut is the reach
// the clip removed.
//
// BOUNDS: 0 frames with a scroll container and 0 frames with a scroll range
// (> 0.5 px, the LayoutUnit-rounding floor) on a run that fits; a cut of at most
// 0.5 CSS px (1 device px) on either side. Ink threshold 12/255 from white,
// identical for both shots, so faint shadow tails cancel.
import { parseArgs, engines, openTarget, launch, openScene, probeMode, shoot, inkCoverage, makeReport, outDir, engineTag, startLog, stopLog, r2 } from "./lib.mjs";

export const RANGE_FLOOR_PX = 0.5;
export const CUT_BOUND_PX = 0.5;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W2");
const rep = makeReport("W2", target);

async function genuine(page) {
    return page.evaluate(() => {
        const P = window.__dockProbe, hp = window.__hp;
        const seats = P.seats({ all: true });
        const u = hp.union(seats);
        let run = seats[0].parentElement;
        while (run && !seats.every((s) => run.contains(s))) run = run.parentElement;
        const cs = getComputedStyle(run); const x = P.axis() === "x";
        const pad = x ? parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) : parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const needed = (x ? u.r - u.l : u.b - u.t) + pad;
        const budget = P.budget();
        return { needed: +needed.toFixed(2), budget: +budget.toFixed(2), exceeds: needed > budget + 0.5, run: hp.label(run) };
    });
}

function frameVerdict(frames) {
    const withSc = frames.filter((f) => f.sc?.length);
    const withRange = frames.filter((f) => f.sc?.some((s) => s.rx > RANGE_FLOOR_PX || s.ry > RANGE_FLOOR_PX));
    const maxRange = Math.max(0, ...frames.flatMap((f) => (f.sc ?? []).map((s) => Math.max(s.rx, s.ry))));
    const who = [...new Set(withSc.flatMap((f) => f.sc.map((s) => `${s.id}(${s.ox}/${s.oy})`)))].slice(0, 3);
    return { frames: frames.length, framesWithScroller: withSc.length, framesWithRange: withRange.length, maxRange: r2(maxRange), who };
}

/** The ring/shadow cut for one seat (selector evaluated in page). */
async function ringCut(page, pick) {
    const readSeat = () => page.evaluate((pick) => {
        const P = window.__dockProbe; const el = (0, eval)(pick)(P);
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, fv: el.matches(":focus-visible"), hov: el.matches(":hover"), axis: P.axis(), sel: el.matches("[aria-pressed=true],[aria-current],[data-active],.glass-capsule") };
    }, pick);
    await page.keyboard.press("Shift");
    await page.evaluate((pick) => { const P = window.__dockProbe; const el = (0, eval)(pick)(P); el.scrollIntoView({ block: "nearest", inline: "nearest" }); el.focus({ preventScroll: true }); el.setAttribute("data-hp-seat", ""); }, pick);
    await page.waitForTimeout(250);
    let s = await readSeat();
    await page.mouse.move(s.x + s.w / 2, s.y + s.h / 2);
    await page.waitForTimeout(700);
    const shot = async () => {
        s = await readSeat();
        const M = 20;
        const clip = s.axis === "x" ? { x: s.x, y: s.y - M, width: s.w, height: s.h + 2 * M } : { x: s.x - M, y: s.y, width: s.w + 2 * M, height: s.h };
        await probeMode(page, "seat");
        await page.waitForTimeout(80);
        const img = await shoot(page, clip);
        await probeMode(page, null);
        const cov = inkCoverage(img);
        // reach beyond the seat's box on each cross side (CSS px)
        const dsf = img.dsf; const lead = [], trail = [];
        const offX = (clip.x - img.clip.x) * dsf, offY = (clip.y - img.clip.y) * dsf;
        const edgeA = s.axis === "x" ? offY + M * dsf : offX + M * dsf;           // seat's leading cross edge in device px
        const edgeB = s.axis === "x" ? offY + (M + s.h) * dsf : offX + (M + s.w) * dsf;
        let reachA = 0, reachB = 0;
        for (let y = 0; y < img.h; y++) for (let x = 0; x < img.w; x++) {
            if (cov[y * img.w + x] < 12 / 255) continue;
            const c = s.axis === "x" ? y + 0.5 : x + 0.5;
            if (c < edgeA) reachA = Math.max(reachA, (edgeA - c) / dsf);
            if (c > edgeB) reachB = Math.max(reachB, (c - edgeB) / dsf);
        }
        return { reachA: r2(reachA), reachB: r2(reachB), fv: s.fv, hov: s.hov, sel: s.sel, png: img.png };
    };
    const clipped = await shot();
    await page.evaluate((pick) => { const P = window.__dockProbe; const el = (0, eval)(pick)(P); for (let a = el.parentElement; a; a = a.parentElement) { a.setAttribute("data-hp-unclip", ""); if (a === P.root()) break; } }, pick);
    await page.waitForTimeout(250);
    s = await readSeat();
    await page.mouse.move(s.x + s.w / 2 + 1, s.y + s.h / 2);
    await page.waitForTimeout(700);
    const free = await shot();
    const cutA = r2(Math.max(0, free.reachA - clipped.reachA)), cutB = r2(Math.max(0, free.reachB - clipped.reachB));
    return { clipped, free, cutA, cutB, pass: cutA <= CUT_BOUND_PX && cutB <= CUT_BOUND_PX };
}

async function sweep(page, dwell = 35) {
    const seats = await page.evaluate(() => window.__dockProbe.seats().map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width, r.height]; }));
    for (const [x, y, w, h] of seats) for (let k = -2; k <= 2; k++) { await page.mouse.move(x + (w / 5) * k, y + (h / 5) * k * 0); await page.waitForTimeout(dwell); }
    return seats;
}

const fs = await import("node:fs");
for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        // route 1 · long runs (horizontal and vertical): scrolling allowed, rings must paint whole
        for (const [scene, pick, name] of [["long", "(P) => P.seats()[2]", "route1·long-run-h"], ["rail", "(P) => P.seats()[2]", "route1·long-run-v"]]) {
            const s = await openScene(browser, target, scene);
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true });
            await s.page.waitForTimeout(300);
            const fr = frameVerdict(await stopLog(s.page));
            const rc = await ringCut(s.page, pick);
            fs.writeFileSync(`${out}/${engine}-${name}-clipped.png`, rc.clipped.png); fs.writeFileSync(`${out}/${engine}-${name}-free.png`, rc.free.png);
            const scOk = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            rep.add({ engine, cell: name + tag, pass: scOk && rc.pass, genuine: g, frames: fr, ring: { cutA: rc.cutA, cutB: rc.cutB, clipped: [rc.clipped.reachA, rc.clipped.reachB], free: [rc.free.reachA, rc.free.reachB], focusVisible: rc.free.fv, hovered: rc.free.hov, selected: rc.free.sel },
                summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "EXCEED: scrolling allowed" : "fit"}); scroller frames ${fr.framesWithScroller}/${fr.frames}; ring reach clipped ${rc.clipped.reachA}/${rc.clipped.reachB} vs free ${rc.free.reachA}/${rc.free.reachB} px → cut ${rc.cutA}/${rc.cutB} (bound ${CUT_BOUND_PX}); focus-visible ${rc.free.fv}, hovered ${rc.free.hov}, selected ${rc.free.sel}` });
            await s.close();
        }
        // route 2 · the collapsed layer at rest
        {
            const s = await openScene(browser, target, "morph");
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true });
            await s.page.waitForTimeout(600);
            const fr = frameVerdict(await stopLog(s.page));
            const pass = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            rep.add({ engine, cell: "route2·collapsed-layer" + tag, pass, genuine: g, frames: fr, summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range > ${RANGE_FLOOR_PX}px ${fr.framesWithRange} (max ${fr.maxRange}px); ${fr.who.join(", ") || "none"}` });
            await s.close();
        }
        // route 3 · routed seats: aria-current moves while hovered
        {
            const s = await openScene(browser, target, "fit", { query: { routed: "1" } });
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true });
            for (const id of ["t2", "t3", "t1"]) {
                const b = await s.page.evaluate((id) => { const r = document.querySelector(`[data-testid=${id}]`).getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; }, id);
                for (let k = 0; k <= 4; k++) { await s.page.mouse.move(b[0] + b[2] * (k / 4), b[1] + b[3] / 2); await s.page.waitForTimeout(35); }
                await s.page.mouse.click(b[0] + b[2] / 2, b[1] + b[3] / 2);
                await s.page.waitForTimeout(450);
            }
            const fr = frameVerdict(await stopLog(s.page));
            const pass = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            rep.add({ engine, cell: "route3·aria-current" + tag, pass, genuine: g, frames: fr, summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range ${fr.framesWithRange} (max ${fr.maxRange}px); ${fr.who.join(", ") || "none"}` });
            await s.close();
        }
        // route 4 · hover scale sweep, then the ring check on the selected label seat
        {
            const s = await openScene(browser, target, "fit");
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true });
            const seats = await sweep(s.page);
            const last = seats.at(-1); await s.page.mouse.move(last[0], last[1]); await s.page.waitForTimeout(700);
            const fr = frameVerdict(await stopLog(s.page));
            await s.page.mouse.move(4, 4); await s.page.waitForTimeout(400);
            const rc = await ringCut(s.page, "(P) => P.seats()[0]");
            fs.writeFileSync(`${out}/${engine}-route4-clipped.png`, rc.clipped.png); fs.writeFileSync(`${out}/${engine}-route4-free.png`, rc.free.png);
            const scOk = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            rep.add({ engine, cell: "route4·hover-scale" + tag, pass: scOk && rc.pass, genuine: g, frames: fr, ring: { cutA: rc.cutA, cutB: rc.cutB, clipped: [rc.clipped.reachA, rc.clipped.reachB], free: [rc.free.reachA, rc.free.reachB], focusVisible: rc.free.fv, hovered: rc.free.hov, selected: rc.free.sel },
                summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range ${fr.framesWithRange} (max ${fr.maxRange}px) ${fr.who.join(", ") || ""}; ring cut ${rc.cutA}/${rc.cutB} px (clipped ${rc.clipped.reachA}/${rc.clipped.reachB}, free ${rc.free.reachA}/${rc.free.reachB}); focus-visible ${rc.free.fv}, hovered ${rc.free.hov}, selected ${rc.free.sel}` });
            await s.close();
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
