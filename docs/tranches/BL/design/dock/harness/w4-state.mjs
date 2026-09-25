// W4 · the state inputs (H2): the opt-in compact-on-scroll rung, reduced motion, and
// coarse pointers.
//
//   node w4-state.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Cells whose rung HEAD has no API for (the compact rung) FAIL as "absent": RED by
// absence, with the prop surface that was checked.
//
// BOUNDS and their sources:
//   compacts            the compact extent ≥ 1 px shorter than rest, posture() "compact" (O-55 R-1)
//   engagement-expands  hover, keyboard focus, scroll-to-top each return to rest within 0.5 px
//                       (useSearchBarScroll.ts:36-97)
//   no-threshold-bounce ≤ 1 posture flip in 24 moves of ±4 px around the located threshold
//   seat-scale          (H-4, C CX-1) at the compact rest no painting seat is scaled below the
//                       plate's own cross-axis ratio − 0.02 (compaction never compounds)
//   non-first-current   (H-4, B CX-2) with the second seat current, the seat row across compaction:
//                       no seat steps beyond the continuity bound, no overlap (lib.mjs seatRow)
//   late-getter         (H-4, C CX-3) the source is a getter whose element mounts 600 ms after the
//                       dock; scrolling it compacts the dock, scrolling back expands it
//   shared-scroller     (H-4, A X-1) two docks bound to one source; unmounting one leaves the other
//                       compacting and expanding with the source
//   press-then-scroll   (H-4, C CX-2) a coarse press on a seat, then a scroll: the dock compacts
//                       (a pointer-caused focus is not engagement)
//   prm·compact         (H-4, A prm·compact; canon P6 pending on scroll-scrubbed change) the scroll
//                       stepped in 25 px increments 0 → 900: 0 frames strictly between the rest and
//                       compact extents
//   prm·posture-morph   0 intermediate frames on the posture morph (canon P6)
//   coarse·no-hover-latch 1.5 s after a tap, the seat, its ::before/::after, and every descendant's
//                       ::before/::after equal their untouched paint (scale, transform, translate,
//                       box-shadow, background, opacity) (F-77; H-4, E ungated)
//   coarse·tap-pins     a tap on the collapsed face pins and fires 0 clicks (W-11, R4-01-15)
//   coarse·menu-holds   5.5 s after the dock's own menu opens by taps it is open and not collapsed
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, waitRest, dockCenter, extentNow, scrollSource, seatRow, springSpec, pinnedRung, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W4");
const rep = makeReport("W4", target);
const COARSE = { viewport: { width: 430, height: 848 }, hasTouch: true, isMobile: true };
const SPEC = springSpec(await pinnedRung(target));

const len = (e) => (e.axis === "y" ? e.h : e.w);
const posture = (page) => page.evaluate(() => window.__dockProbe.posture());
async function settle(page) { await page.waitForTimeout(80); await waitRest(page, { quiet: 350, cap: 5000 }); }
function intermediate(frames, ref = null) {
    if (frames.length < 2) return { between: 0 };
    const L = frames.map((f) => (f.ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]));
    const a = ref?.[0] ?? L[0], b = ref?.[1] ?? L.at(-1);
    const between = L.filter((v) => Math.abs(v - a) > 0.5 && Math.abs(v - b) > 0.5).length;
    return { between, from: r2(a), to: r2(b), last: r2(L.at(-1)) };
}
const COMPACT_CELLS = ["compact·compacts", "compact·engagement-expands", "compact·no-threshold-bounce", "compact·seat-scale", "compact·non-first-current", "compact·late-getter", "compact·shared-scroller", "coarse·press-then-scroll", "prm·compact"];
const PAINT_PROPS = ["scale", "transform", "translate", "boxShadow", "backgroundColor", "backgroundImage", "opacity"];

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        // ── the compact-on-scroll rung ────────────────────────────────────────
        let has = false;
        await rep.guard(engine, COMPACT_CELLS.slice(0, 4).map((c) => c + tag), async () => {
            const s = await openScene(browser, target, "compact");
            const api = await s.page.evaluate(() => ({ has: !!window.__dockProbe.compact?.(), props: window.__scene?.dockPropNames ?? null }));
            has = api.has;
            if (!api.has) {
                const why = `absent: no compact-on-scroll rung${api.props ? `; GlassDock declares [${api.props.join(", ")}], none takes a scroll source` : ""}`;
                for (const c of COMPACT_CELLS) rep.add({ engine, cell: c + tag, pass: false, absent: true, summary: why });
                await s.close();
                return;
            }
            const p = s.page;
            await scrollSource(p, 0); await settle(p);
            const E0 = len(await extentNow(p)); const cross0 = await p.evaluate(() => { const r = window.__dockProbe.plate().getBoundingClientRect(); return window.__dockProbe.axis() === "y" ? r.width : r.height; });
            await scrollSource(p, 900); await settle(p);
            const E1 = len(await extentNow(p)); const p1 = await posture(p);
            rep.add({ engine, cell: "compact·compacts" + tag, pass: E1 < E0 - 1 && p1 === "compact", rest: r2(E0), compact: r2(E1), posture: p1, summary: `rest ${r2(E0)} px → past threshold ${r2(E1)} px, posture ${p1}` });
            // seat scale at the compact rest (no compounding)
            const sc = await p.evaluate(() => { const P = window.__dockProbe, hp = window.__hp; const x = P.axis() === "x"; const pr = P.plate().getBoundingClientRect(); const pl = P.plate();
                const plateK = (x ? pr.height / pl.offsetHeight : pr.width / pl.offsetWidth) || 1;
                const seats = P.seats({ all: true }).filter((el) => hp.visibleOpacity(el) > 0.05).map((el) => { const r = el.getBoundingClientRect(); return { k: x ? r.height / (el.offsetHeight || 1) : r.width / (el.offsetWidth || 1), who: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0, 10) }; });
                return { plateK, seats }; });
            const minSeat = sc.seats.reduce((m, x) => x.k < m.k ? x : m, { k: Infinity, who: "" });
            rep.add({ engine, cell: "compact·seat-scale" + tag, pass: minSeat.k >= sc.plateK - 0.02, plateK: r2(sc.plateK), minSeatK: r2(minSeat.k), summary: `compact rest: plate cross-axis ratio ${r2(sc.plateK)}, smallest painting-seat scale ${r2(minSeat.k)} (${minSeat.who}); bound: no seat below the plate's ratio − 0.02 (cross ${r2(cross0)} px at rest)` });
            // engagement
            const res = {};
            const c = await dockCenter(p);
            await p.mouse.move(c.x, c.y, { steps: 2 }); await settle(p); res.hover = r2(len(await extentNow(p)));
            await p.mouse.move(4, 4); await p.waitForTimeout(250); await settle(p); res.afterLeave = r2(len(await extentNow(p)));
            await p.keyboard.press("Shift");
            await p.evaluate(() => window.__dockProbe.seats({ all: true })[0].focus()); await settle(p); res.focus = r2(len(await extentNow(p)));
            await p.evaluate(() => document.activeElement?.blur()); await p.waitForTimeout(250); await settle(p); res.afterBlur = r2(len(await extentNow(p)));
            await scrollSource(p, 0); await settle(p); res.top = r2(len(await extentNow(p)));
            const ok = Math.abs(res.hover - E0) <= 0.5 && Math.abs(res.focus - E0) <= 0.5 && Math.abs(res.top - E0) <= 0.5 && res.afterLeave < E0 - 1 && res.afterBlur < E0 - 1;
            rep.add({ engine, cell: "compact·engagement-expands" + tag, pass: ok, rest: r2(E0), ...res, summary: `rest ${r2(E0)}; hover ${res.hover}, leave ${res.afterLeave}, focus ${res.focus}, blur ${res.afterBlur}, top ${res.top} px` });
            await scrollSource(p, 0); await settle(p);
            const ramp = await p.evaluate(async () => {
                const P = window.__dockProbe; const S = window.__scene; const go = (y) => S?.scrollTo ? S.scrollTo(y) : window.scrollTo(0, y); const f = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                let enter = null, exit = null;
                for (let y = 0; y <= 900; y += 4) { go(y); await f(); if (P.posture() === "compact") { enter = y; break; } }
                if (enter != null) { go(0); await f(); await f(); for (let y = Math.max(0, enter - 8); y <= enter; y++) { go(y); await f(); if (P.posture() === "compact") { enter = y; break; } } }
                go(900); await f();
                for (let y = 900; y >= 0; y -= 4) { go(y); await f(); if (P.posture() !== "compact") { exit = y; break; } }
                let flips = 0, last = P.posture();
                if (enter != null) for (let k = 0; k < 12; k++) for (const y of [enter + 4, enter - 4]) { go(y); await f(); await f(); const q = P.posture(); if (q !== last) { flips++; last = q; } }
                return { enter, exit, flips };
            });
            rep.add({ engine, cell: "compact·no-threshold-bounce" + tag, pass: ramp.enter != null && ramp.flips <= 1, ...ramp, summary: `enter at ${ramp.enter} px, exit at ${ramp.exit} px (band ${ramp.enter != null && ramp.exit != null ? ramp.enter - ramp.exit : "-"} px); 24 moves of ±4 px around enter flipped the posture ${ramp.flips} time(s) (bound 1)` });
            await s.close();
        });
        if (!has && args.cells) { // the first block was skipped by --cells: read the rung's presence on its own
            const s = await openScene(browser, target, "compact"); has = await s.page.evaluate(() => !!window.__dockProbe.compact?.()); await s.close();
        }
        if (has) {
            await rep.guard(engine, ["compact·non-first-current" + tag], async () => {
                const s = await openScene(browser, target, "compact", { query: { active: "b" } });
                const ax = await s.page.evaluate(() => window.__dockProbe.axis());
                await startLog(s.page, { seats: true }); await s.page.waitForTimeout(100);
                await scrollSource(s.page, 900); await s.page.waitForTimeout(200); await settle(s.page);
                const frames = await stopLog(s.page);
                const sr = seatRow(frames, ax, SPEC);
                rep.add({ engine, cell: "compact·non-first-current" + tag, pass: sr.step.ok && sr.overlap.ok, seats: sr, summary: `compaction with the second seat current: worst seat step ×${sr.step.ratio}${sr.step.step != null ? ` (${sr.step.step} px vs ${sr.step.bound})` : ""}, overlap frames ${sr.overlap.frames}` });
                await s.close();
            });
            await rep.guard(engine, ["compact·late-getter" + tag], async () => {
                const s = await openScene(browser, target, "compact", { query: { source: "late" } });
                await s.page.waitForTimeout(900);
                const E0 = len(await extentNow(s.page));
                await scrollSource(s.page, 900); await s.page.waitForTimeout(300); await settle(s.page);
                const p1 = await posture(s.page); const E1 = len(await extentNow(s.page));
                await scrollSource(s.page, 0); await s.page.waitForTimeout(300); await settle(s.page);
                const p2 = await posture(s.page);
                const errors = await s.page.evaluate(() => window.__errors ?? 0);
                rep.add({ engine, cell: "compact·late-getter" + tag, pass: p1 === "compact" && E1 < E0 - 1 && p2 !== "compact", posture: [p1, p2], summary: `a source element mounted 600 ms late: scrolled → ${p1} (${r2(E0)} → ${r2(E1)} px), back → ${p2}; page errors ${errors}` });
                await s.close();
            });
            await rep.guard(engine, ["compact·shared-scroller" + tag], async () => {
                const s = await openScene(browser, target, "compact", { query: { twin: "1" } });
                await s.page.evaluate(() => window.__scene.dropA()); await s.page.waitForTimeout(200);
                const a = await posture(s.page);
                await scrollSource(s.page, 900); await s.page.waitForTimeout(300); await settle(s.page); const b = await posture(s.page);
                await scrollSource(s.page, 0); await s.page.waitForTimeout(300); await settle(s.page); const c = await posture(s.page);
                rep.add({ engine, cell: "compact·shared-scroller" + tag, pass: a !== "compact" && b === "compact" && c !== "compact", postures: [a, b, c], summary: `after the other dock on the same source unmounts: at 0 ${a}, at 900 ${b}, back at 0 ${c} (bound: not compact, compact, not compact)` });
                await s.close();
            });
            await rep.guard(engine, ["coarse·press-then-scroll" + tag], async () => {
                const s = await openScene(browser, target, "compact", { ctx: COARSE });
                const b = await s.page.evaluate(() => { const r = window.__dockProbe.seats()[1].getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
                await s.page.touchscreen.tap(b[0], b[1]); await s.page.waitForTimeout(300);
                await scrollSource(s.page, 900); await s.page.waitForTimeout(400); await settle(s.page);
                const p = await posture(s.page);
                rep.add({ engine, cell: "coarse·press-then-scroll" + tag, pass: p === "compact", posture: p, summary: `a coarse press on a seat, then a scroll to 900: posture ${p} (bound: compact)` });
                await s.close();
            });
            await rep.guard(engine, ["prm·compact" + tag], async () => {
                const r = await openScene(browser, target, "compact", { ctx: { reducedMotion: "reduce" } });
                const E0 = len(await extentNow(r.page));
                await startLog(r.page); await r.page.waitForTimeout(100);
                for (let y = 0; y <= 900; y += 25) { await scrollSource(r.page, y); await r.page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)))); }
                await settle(r.page);
                const E1 = len(await extentNow(r.page));
                const iv = intermediate((await stopLog(r.page)).map((f) => ({ ...f, ax: "x" })), [E0, E1]);
                rep.add({ engine, cell: "prm·compact" + tag, pass: iv.between === 0 && E1 < E0 - 1, ...iv, summary: `reduced motion, scroll stepped 25 px at a time to 900: ${r2(E0)} → ${r2(E1)} px with ${iv.between} frame(s) strictly between (bound 0; canon P6 on scroll-scrubbed change is pending the owner)` });
                await r.close();
            });
        }
        // ── reduced motion on the posture morph ────────────────────────────────
        await rep.guard(engine, ["prm·posture-morph" + tag], async () => {
            const s = await openScene(browser, target, "morph", { ctx: { reducedMotion: "reduce" } });
            const axis = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page); await s.page.waitForTimeout(100);
            const c = await dockCenter(s.page);
            await s.page.mouse.move(c.x, c.y, { steps: 2 });
            await s.page.waitForTimeout(200); await settle(s.page);
            const ex = intermediate((await stopLog(s.page)).map((f) => ({ ...f, ax: axis })));
            await startLog(s.page); await s.page.waitForTimeout(100);
            await s.page.mouse.move(4, 4);
            await s.page.waitForTimeout(6500);
            const co = intermediate((await stopLog(s.page)).map((f) => ({ ...f, ax: axis })));
            const pass = ex.between === 0 && co.between === 0 && Math.abs(ex.to - ex.from) > 1;
            rep.add({ engine, cell: "prm·posture-morph" + tag, pass, expand: ex, collapse: co, summary: `reduced motion: expand ${ex.from}→${ex.to} px with ${ex.between} intermediate frame(s); collapse ${co.from}→${co.to} px with ${co.between} (bound 0)` });
            await s.close();
        });
        // ── coarse pointer: no hover latch, pseudos and descendants included ───
        await rep.guard(engine, ["coarse·no-hover-latch" + tag], async () => {
            const s = await openScene(browser, target, "fit", { ctx: COARSE });
            const p = s.page;
            const read = () => p.evaluate((props) => { const el = window.__dockProbe.seats().at(-1); const outp = {};
                const nodes = [el, ...el.querySelectorAll("*")];
                nodes.forEach((n, i) => { for (const pse of [null, "::before", "::after"]) { if (i > 0 && pse === null) continue; const cs = getComputedStyle(n, pse); if (pse && (cs.content === "none" || cs.content === "normal")) continue; for (const k of props) outp[`${i}${pse ?? ""}.${k}`] = cs[k]; } });
                return { props: outp, hover: el.matches(":hover") }; }, PAINT_PROPS);
            const media = await p.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches }));
            const rest = await read();
            const b = await p.evaluate(() => { const r = window.__dockProbe.seats().at(-1).getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
            await p.touchscreen.tap(b[0], b[1]);
            await p.waitForTimeout(1500); const at1500 = await read();
            const diff = Object.keys(rest.props).filter((k) => at1500.props[k] !== rest.props[k]);
            rep.add({ engine, cell: "coarse·no-hover-latch" + tag, pass: diff.length === 0, media, differs: diff.slice(0, 6), summary: `(hover: hover) ${media.hover}, (pointer: coarse) ${media.coarse}; 1.5 s after a tap ${diff.length ? `${diff.length} paint value(s) still differ: ${diff.slice(0, 3).map((k) => `${k} ${rest.props[k]} → ${at1500.props[k]}`).join("; ")}` : "the seat, its pseudos and its descendants' pseudos are back to rest"}; :hover ${at1500.hover}` });
            await s.close();
        });
        await rep.guard(engine, ["coarse·tap-pins" + tag], async () => {
            const s = await openScene(browser, target, "morph", { ctx: COARSE });
            const p = s.page;
            await p.evaluate(() => { window.__clicks = []; for (const el of window.__dockProbe.seats({ all: true })) el.addEventListener("click", () => window.__clicks.push(window.__hp.label(el) + (el.getAttribute("aria-label") ? "[" + el.getAttribute("aria-label") + "]" : ""))); });
            const before = await posture(p);
            const b = await p.evaluate(() => { const el = window.__dockProbe.seats().at(-1); const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, el.getAttribute("aria-label") ?? el.textContent]; });
            await p.touchscreen.tap(b[0], b[1]);
            await p.waitForTimeout(700);
            const after = await posture(p);
            const clicks = await p.evaluate(() => window.__clicks);
            await p.waitForTimeout(4800);
            const later = await posture(p);
            rep.add({ engine, cell: "coarse·tap-pins" + tag, pass: after === "pinned" && clicks.length === 0, before, after, later, clicks, summary: `tap on the collapsed face's "${b[2]}": posture ${before} → ${after} (+0.7 s) → ${later} (+5.5 s); clicks fired ${clicks.length}${clicks.length ? " (" + clicks.join(", ") + ")" : ""} (bound: pinned, 0 clicks)` });
            await s.close();
        });
        await rep.guard(engine, ["coarse·menu-holds" + tag], async () => {
            const s = await openScene(browser, target, "menu", { ctx: COARSE });
            const p = s.page;
            const c = await dockCenter(p);
            await p.touchscreen.tap(c.x, c.y); await p.waitForTimeout(900);
            const m = await p.evaluate(() => { const el = document.querySelector("[data-testid=menu]"); if (!el) return null; const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width > 0]; });
            if (m && m[2]) { await p.touchscreen.tap(m[0], m[1]); await p.waitForTimeout(500); }
            const menuOpen = () => p.evaluate(() => { const el = document.querySelector("[data-testid=menu-content]"); if (!el) return false; const r = el.getBoundingClientRect(); return !el.hidden && r.width > 0 && getComputedStyle(el).visibility !== "hidden"; });
            const opened = await menuOpen();
            const postOpen = await posture(p);
            await p.waitForTimeout(5500);
            const stillOpen = await menuOpen(); const later = await posture(p); const e = await extentNow(p);
            const pass = opened && stillOpen && later !== "collapsed";
            rep.add({ engine, cell: "coarse·menu-holds" + tag, pass, opened, stillOpen, postOpen, later, summary: `menu ${opened ? "opened" : "NEVER OPENED"} (posture ${postOpen}); 5.5 s later menu ${stillOpen ? "open" : "closed"}, posture ${later}, extent ${r2(len(e))} px` });
            await s.close();
        });
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
