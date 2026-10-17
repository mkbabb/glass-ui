// W2 · the run (H2). It is a scroll container only when its seats exceed the budget;
// no seat's focus ring, selected ring or hover shadow is clipped in the cross axis, and
// the ring must actually paint before a cut of 0 counts (H-2 paint floor); every seat is
// reachable by pointer, keyboard and AT (H-2); and the budget is the harness's, with a
// consumer width on the root (H-2), a seat row at depth (K-12) and a nested-scroller
// seat (C CX-8) as scenes (H-7).
//
//   node w2-run.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
//   route 1  long run (seats genuinely exceed): scrolling allowed; ring check + reach
//   route 2  collapsed layer at rest
//   route 3  routed seats (aria-current) hovered and re-selected
//   route 4  hover-scale sweep, then the ring check on the selected label seat
//   route 5  consumer width: the root carries `width: 240px`; the budget is the scene's
//            declared width, not the family's; the plate stays inside the root, faces inside
//            the plate (pixels), every seat reachable
//   route 6  seats at depth: a wrapper and a display: contents group; a fitting run, reach
//   route 7  a nested-scroller seat under a 360 px cap: the plate fits the cap, faces inside
//            the plate, every seat reachable
//
// BOUNDS: 0 scroll-container frames and 0 range frames (> 0.5 px) on a run that fits; a ring
// cut ≤ 0.5 CSS px on each cross side, with the unclipped ring reaching ≥ 1 px on each side
// (the paint floor); reach: every active seat hit by elementFromPoint at the centre of its
// clipped box after scrollIntoView, focused by Tab or arrow keys, and named in the ARIA snapshot.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, probeMode, shoot, inkCoverage, facesRead, makeReport, outDir, engineTag, startLog, stopLog, extentNow, r2 } from "./lib.mjs";

export const RANGE_FLOOR_PX = 0.5;
export const CUT_BOUND_PX = 0.5;
export const PAINT_FLOOR_PX = 1.0;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W2");
const rep = makeReport("W2", target);
const rootSel = (scene) => target.adapter ? target.adapter.rootSel(scene) : "[data-testid=dock]";

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
        const budget = Math.min(P.budget(), window.__scene?.consumerBudget ?? Infinity);   // H-2: the scene's declared width binds
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

/** The ring/shadow cut for one seat, with the paint floor. */
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
        const dsf = img.dsf;
        const offX = (clip.x - img.clip.x) * dsf, offY = (clip.y - img.clip.y) * dsf;
        const edgeA = s.axis === "x" ? offY + M * dsf : offX + M * dsf;
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
    await page.evaluate(() => document.querySelectorAll("[data-hp-unclip]").forEach((e) => e.removeAttribute("data-hp-unclip")));
    const cutA = r2(Math.max(0, free.reachA - clipped.reachA)), cutB = r2(Math.max(0, free.reachB - clipped.reachB));
    const painted = free.reachA >= PAINT_FLOOR_PX && free.reachB >= PAINT_FLOOR_PX;
    return { clipped, free, cutA, cutB, painted, pass: painted && cutA <= CUT_BOUND_PX && cutB <= CUT_BOUND_PX };
}
const ringText = (rc) => `ring reach clipped ${rc.clipped.reachA}/${rc.clipped.reachB} vs free ${rc.free.reachA}/${rc.free.reachB} px → cut ${rc.cutA}/${rc.cutB} (bound ${CUT_BOUND_PX}); ${rc.painted ? "" : `NO RING PAINTED (free reach < ${PAINT_FLOOR_PX} px, the paint floor); `}focus-visible ${rc.free.fv}, hovered ${rc.free.hov}, selected ${rc.free.sel}`;

/** H-2 reach: pointer, keyboard, AT, for every active seat. */
async function reach(page, scene) {
    const n = await page.evaluate(() => window.__dockProbe.seats().length);
    const names = await page.evaluate(() => window.__dockProbe.seats().map((el) => (el.getAttribute("aria-label") || el.textContent || "").trim()));
    const pointer = [];
    for (let i = 0; i < n; i++) {
        const r = await page.evaluate((i) => new Promise((res) => {
            const P = window.__dockProbe, hp = window.__hp; const el = P.seats()[i];
            el.scrollIntoView({ block: "nearest", inline: "nearest" });
            requestAnimationFrame(() => requestAnimationFrame(() => {
                const q = hp.paintedRect(el);
                if (q.r - q.l < 1 || q.b - q.t < 1 || hp.visibleOpacity(el) <= 0.05) return res({ ok: false, why: "no painted box" });
                const x = (q.l + q.r) / 2, y = (q.t + q.b) / 2;
                if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return res({ ok: false, why: "off screen" });
                const hit = document.elementFromPoint(x, y);
                res({ ok: !!hit && (hit === el || el.contains(hit)), why: hit ? hp.label(hit) : "nothing" });
            }));
        }), i);
        pointer.push(r);
    }
    await page.evaluate(() => { const P = window.__dockProbe; P.seats()[0].scrollIntoView({ block: "nearest", inline: "start" }); const b = document.createElement("button"); b.id = "hp-kb-start"; b.textContent = "start"; b.style.cssText = "position:fixed;left:0;top:0;opacity:0.01"; document.body.prepend(b); b.focus(); });
    const seen = new Set();
    const who = () => page.evaluate(() => { const P = window.__dockProbe; const a = document.activeElement; const s = P.seats(); const i = s.findIndex((x) => x === a || x.contains(a)); return i; });
    // WebKit (Safari's default) skips buttons on Tab; its keyboard user moves by Option-Tab.
    let eng = "chromium"; try { eng = page.context().browser().browserType().name(); } catch { eng = "safari"; }
    const TAB = eng === "chromium" ? "Tab" : "Alt+Tab";
    for (let k = 0; k < n + 6; k++) { await page.keyboard.press(TAB); const i = await who(); if (i >= 0) seen.add(i); }
    // H5-1 · every seat by a KEY. From the run's Tab stop (focus returns there by Shift+Tab when the walk ran past
    // it): the arrows back toward Seat 1, then Home, then the arrows forward to the end. A programmatic focus()
    // reaches nothing: the pass-4 walk focused Seat 1 by script and recorded only what the arrows reached after it,
    // so a run whose current seat was not the first never had Seat 1 pressed to (FLOOR-V3 §1.3: the product
    // reaches 11/11). A run whose ArrowUp clamps short of Seat 1 and has no Home still fails (plant `arrowclamp`)
    const axis = await page.evaluate(() => window.__dockProbe.axis());
    const [BACK, FWD] = axis === "x" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
    if ((await who()) < 0) { for (let k = 0; k < n + 6 && (await who()) < 0; k++) await page.keyboard.press("Shift+" + TAB); }
    const stop = await who();
    for (let k = 0; k < n + 2; k++) { await page.keyboard.press(BACK); const i = await who(); if (i >= 0) seen.add(i); }
    await page.keyboard.press("Home"); { const i = await who(); if (i >= 0) seen.add(i); }
    for (let k = 0; k < 2 * n + 2; k++) { await page.keyboard.press(FWD); const i = await who(); if (i >= 0) seen.add(i); }
    void stop;
    await page.evaluate(() => document.getElementById("hp-kb-start")?.remove());
    let snap = "";
    try { snap = await page.locator(rootSel(scene)).first().ariaSnapshot(); } catch (e) { snap = "ERR " + e.message; }
    const at = names.map((nm) => !!nm && snap.includes(`"${nm}"`));
    const miss = { pointer: pointer.map((p, i) => p.ok ? null : `${names[i]}(${p.why})`).filter(Boolean), keyboard: names.filter((_, i) => !seen.has(i)), at: names.filter((_, i) => !at[i]) };
    return { n, ok: !miss.pointer.length && !miss.keyboard.length && !miss.at.length, miss, tab: TAB };
}
const reachText = (r) => `reach ${r.n} seats: pointer ${r.n - r.miss.pointer.length}/${r.n}${r.miss.pointer.length ? " (missing " + r.miss.pointer.slice(0, 3).join(", ") + ")" : ""}, keyboard (${r.tab}, arrows) ${r.n - r.miss.keyboard.length}/${r.n}${r.miss.keyboard.length ? " (missing " + r.miss.keyboard.slice(0, 3).join(", ") + ")" : ""}, AT ${r.n - r.miss.at.length}/${r.n}${r.miss.at.length ? " (missing " + r.miss.at.slice(0, 3).join(", ") + ")" : ""}`;

/** Named sub-checks, so a plant is shown to fail the check it targets (not any check). */
const fails = (checks) => Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
const failedText = (f) => f.length ? "  ⟶ FAILED: " + f.join(", ") : "";
const ringChecks = (rc) => ({ paint: rc.painted, ring: rc.cutA <= CUT_BOUND_PX && rc.cutB <= CUT_BOUND_PX });
const reachChecks = (rr) => ({ pointer: !rr.miss.pointer.length, keyboard: !rr.miss.keyboard.length, at: !rr.miss.at.length });

async function facesAtRest(page) {
    await probeMode(page, "faces");
    const e = await extentNow(page); const vp = page.viewportSize();
    const band = e.axis === "y" ? { x: Math.max(0, e.l - 60), y: 0, width: e.w + 400, height: vp.height } : { x: 0, y: Math.max(0, e.t - 40), width: vp.width, height: e.h + 80 };
    const img = await shoot(page, band);
    await probeMode(page, null);
    return facesRead(img, img.dsf);
}
async function sweep(page, dwell = 35) {
    const seats = await page.evaluate(() => window.__dockProbe.seats().map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width, r.height]; }));
    for (const [x, y, w] of seats) for (let k = -2; k <= 2; k++) { await page.mouse.move(x + (w / 5) * k, y); await page.waitForTimeout(dwell); }
    return seats;
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        for (const [scene, pick, name] of [["long", "(P) => P.seats()[2]", "route1·long-run-h"], ["rail", "(P) => P.seats()[2]", "route1·long-run-v"]]) {
            await rep.guard(engine, [name + tag], async () => {
                const s = await openScene(browser, target, scene);
                const g = await genuine(s.page);
                await startLog(s.page, { scrollers: true }); await s.page.waitForTimeout(300);
                const fr = frameVerdict(await stopLog(s.page));
                const rc = await ringCut(s.page, pick);
                fs.writeFileSync(`${out}/${engine}-${name}-clipped.png`, rc.clipped.png); fs.writeFileSync(`${out}/${engine}-${name}-free.png`, rc.free.png);
                await s.page.mouse.move(4, 4);
                const rr = await reach(s.page, scene);
                const scOk = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
                const failed = fails({ scroller: scOk, ...ringChecks(rc), ...reachChecks(rr) });
                rep.add({ engine, cell: name + tag, pass: !failed.length, failed, genuine: g, frames: fr, ring: { cutA: rc.cutA, cutB: rc.cutB, painted: rc.painted, clipped: [rc.clipped.reachA, rc.clipped.reachB], free: [rc.free.reachA, rc.free.reachB] }, reach: rr,
                    summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "EXCEED: scrolling allowed" : "fit"}); scroller frames ${fr.framesWithScroller}/${fr.frames}; ${ringText(rc)}; ${reachText(rr)}${failedText(failed)}` });
                await s.close();
            });
        }
        await rep.guard(engine, ["route2·collapsed-layer" + tag], async () => {
            const s = await openScene(browser, target, "morph");
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true }); await s.page.waitForTimeout(600);
            const fr = frameVerdict(await stopLog(s.page));
            const pass = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            rep.add({ engine, cell: "route2·collapsed-layer" + tag, pass, failed: fails({ scroller: pass }), genuine: g, frames: fr, summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range > ${RANGE_FLOOR_PX}px ${fr.framesWithRange} (max ${fr.maxRange}px); ${fr.who.join(", ") || "none"}` });
            await s.close();
        });
        await rep.guard(engine, ["route3·aria-current" + tag], async () => {
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
            rep.add({ engine, cell: "route3·aria-current" + tag, pass, failed: fails({ scroller: pass }), genuine: g, frames: fr, summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range ${fr.framesWithRange} (max ${fr.maxRange}px); ${fr.who.join(", ") || "none"}` });
            await s.close();
        });
        await rep.guard(engine, ["route4·hover-scale" + tag], async () => {
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
            const failed4 = fails({ scroller: scOk, ...ringChecks(rc) });
            rep.add({ engine, cell: "route4·hover-scale" + tag, pass: !failed4.length, failed: failed4, genuine: g, frames: fr, ring: { cutA: rc.cutA, cutB: rc.cutB, painted: rc.painted, clipped: [rc.clipped.reachA, rc.clipped.reachB], free: [rc.free.reachA, rc.free.reachB] },
                summary: `seats need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); frames with a seat scroll container ${fr.framesWithScroller}/${fr.frames}, with range ${fr.framesWithRange} (max ${fr.maxRange}px) ${fr.who.join(", ") || ""}; ${ringText(rc)}${failedText(failed4)}` });
            await s.close();
        });
        // route 5 · a consumer width on the root
        await rep.guard(engine, ["route5·consumer-width" + tag], async () => {
            const s = await openScene(browser, target, "cwidth");
            const g = await genuine(s.page);
            const box = await s.page.evaluate(() => { const P = window.__dockProbe, hp = window.__hp; const r = P.root().getBoundingClientRect(); const p = hp.paintedRect(P.plate()); return { root: [r.left, r.right], plate: [p.l, p.r] }; });
            const plateOut = Math.max(0, box.root[0] - box.plate[0], box.plate[1] - box.root[1]);
            const f = await facesAtRest(s.page);
            const rr = await reach(s.page, "cwidth");
            const failed5 = fails({ plateOut: plateOut <= 0.5, faces: !f.empty && f.outside <= 1.0, ...reachChecks(rr) });
            rep.add({ engine, cell: "route5·consumer-width" + tag, pass: !failed5.length, failed: failed5, genuine: g, plateOutPx: r2(plateOut), faces: f, reach: rr, summary: `consumer width 240 px: seats need ${g.needed} px vs the scene's budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); plate outside the root ${r2(plateOut)} px (bound 0.5); face ink beyond the plate ${f.empty ? "NO PLATE" : f.outside + " px"} (bound 1); ${reachText(rr)}${failedText(failed5)}` });
            await s.close();
        });
        // route 6 · seats at depth (a wrapper, a display: contents group)
        await rep.guard(engine, ["route6·depth" + tag], async () => {
            const s = await openScene(browser, target, "depth");
            const g = await genuine(s.page);
            await startLog(s.page, { scrollers: true });
            await sweep(s.page); await s.page.waitForTimeout(300);
            const fr = frameVerdict(await stopLog(s.page));
            await s.page.mouse.move(4, 4);
            const rr = await reach(s.page, "depth");
            const scOk = g.exceeds || (fr.framesWithScroller === 0 && fr.framesWithRange === 0);
            const failed6 = fails({ scroller: scOk, ...reachChecks(rr) });
            rep.add({ engine, cell: "route6·depth" + tag, pass: !failed6.length, failed: failed6, genuine: g, frames: fr, reach: rr, summary: `seats at depth need ${g.needed} px vs budget ${g.budget} (${g.exceeds ? "exceed" : "fit"}); scroller frames ${fr.framesWithScroller}/${fr.frames} (${fr.who.join(", ") || "none"}); ${reachText(rr)}${failedText(failed6)}` });
            await s.close();
        });
        // route 7 · a nested-scroller seat under a cap
        await rep.guard(engine, ["route7·nested-scroller" + tag], async () => {
            const s = await openScene(browser, target, "nested");
            const g = await genuine(s.page);
            const e = await extentNow(s.page);
            const len = e.axis === "x" ? e.w : e.h;
            const f = await facesAtRest(s.page);
            const rr = await reach(s.page, "nested");
            const failed7 = fails({ fits: len <= g.budget + 0.5, faces: !f.empty && f.outside <= 1.0, ...reachChecks(rr) });
            rep.add({ engine, cell: "route7·nested-scroller" + tag, pass: !failed7.length, failed: failed7, genuine: g, extentPx: r2(len), faces: f, reach: rr, summary: `plate ${r2(len)} px under a ${g.budget} px budget (bound: fits); face ink beyond the plate ${f.empty ? "NO PLATE" : f.outside + " px"} (bound 1); ${reachText(rr)}${failedText(failed7)}` });
            await s.close();
        });
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
