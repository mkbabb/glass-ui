// W4 · the state inputs: the opt-in compact-on-scroll rung (compacts past the
// threshold; hover, keyboard focus and scroll-to-top expand it; no threshold bounce),
// reduced motion, and coarse pointers (a tap latches no hover paint, a coarse tap
// on a collapsed dock pins it without activating the control under the finger, and
// the dock never collapses under its own open menu).
//
//   node w4-state.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Cells whose rung HEAD has no API for (the compact rung) FAIL as "absent": RED by
// absence, with the prop surface that was checked.
//
// BOUNDS and their sources:
//   compacts         the compact extent is at least 1 px shorter than the rest extent, and
//                    posture() reads "compact" (O-55 R-1, portfolio §0 item 4).
//   expands          hover, keyboard focus and scroll-to-top each return the extent to
//                    within 0.5 px of rest (the reference's gate: useSearchBarScroll.ts:36-97).
//   no bounce        the enter threshold located to 1 px from below; then 12 scroll
//                    oscillations of ±4 px around it flip the posture at most once, i.e. a
//                    hysteresis band wider than 8 px (O-55 R-1 "no threshold bounce").
//   reduced motion   0 frames strictly between start and target (both > 0.5 px away) on a
//                    posture morph and on compaction (motion canon P6: spatial legs seat
//                    at their endpoint; fades keep).
//   hover latch      1.5 s after a coarse tap the tapped seat's scale, transform, translate,
//                    box-shadow and background equal their untouched values (F-77, W-3t,
//                    portfolio floor row 3: paint-bearing :hover sits under (hover: hover)).
//   tap pins         a coarse tap on the collapsed face leaves posture() "pinned" and fires
//                    0 clicks on any seat (W-11, R4-01-15, floor row 3 "a coarse press pins").
//   menu holds       with the dock's own menu opened by coarse taps, 5.5 s later (HEAD's
//                    3.6 s collapse dwell + 1.9 s) the menu is open and the dock not collapsed.
import fs from "node:fs";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, waitRest, dockCenter, extentNow, r2 } from "./lib.mjs";

const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W4");
const rep = makeReport("W4", target);
const COARSE = { viewport: { width: 430, height: 848 }, hasTouch: true, isMobile: true };

const len = (e) => (e.axis === "y" ? e.h : e.w);
const posture = (page) => page.evaluate(() => window.__dockProbe.posture());
async function scrollTo(page, y) { await page.evaluate((y) => window.scrollTo(0, y), y); }
async function settle(page) { await page.waitForTimeout(80); await waitRest(page, { quiet: 350, cap: 5000 }); }

function intermediate(frames) {
    if (frames.length < 2) return { between: 0 };
    const L = frames.map((f) => (f.ax === "y" ? f.e[3] - f.e[1] : f.e[2] - f.e[0]));
    const a = L[0], b = L.at(-1);
    const between = L.filter((v) => Math.abs(v - a) > 0.5 && Math.abs(v - b) > 0.5).length;
    return { between, from: r2(a), to: r2(b) };
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        // ── the compact-on-scroll rung ────────────────────────────────────────
        {
            const s = await openScene(browser, target, "compact");
            const api = await s.page.evaluate(() => ({ has: !!window.__dockProbe.compact?.(), props: window.__scene?.dockPropNames ?? null }));
            if (!api.has) {
                const why = `absent: no compact-on-scroll rung${api.props ? `; GlassDock declares [${api.props.join(", ")}], none takes a scroll source` : ""}`;
                for (const c of ["compact·compacts", "compact·engagement-expands", "compact·no-threshold-bounce", "prm·compact"]) rep.add({ engine, cell: c + tag, pass: false, absent: true, summary: why });
            } else {
                const p = s.page;
                await scrollTo(p, 0); await settle(p);
                const E0 = len(await extentNow(p));
                await scrollTo(p, 900); await settle(p);
                const E1 = len(await extentNow(p)); const p1 = await posture(p);
                rep.add({ engine, cell: "compact·compacts" + tag, pass: E1 < E0 - 1 && p1 === "compact", rest: r2(E0), compact: r2(E1), posture: p1, summary: `rest ${r2(E0)} px → past threshold ${r2(E1)} px, posture ${p1}` });
                // engagement: hover, focus, scroll-to-top
                const res = {};
                const c = await dockCenter(p);
                await p.mouse.move(c.x, c.y, { steps: 2 }); await settle(p); res.hover = r2(len(await extentNow(p)));
                await p.mouse.move(4, 4); await p.waitForTimeout(250); await settle(p); res.afterLeave = r2(len(await extentNow(p)));
                await p.keyboard.press("Shift");
                await p.evaluate(() => window.__dockProbe.seats({ all: true })[0].focus()); await settle(p); res.focus = r2(len(await extentNow(p)));
                await p.evaluate(() => document.activeElement?.blur()); await p.waitForTimeout(250); await settle(p); res.afterBlur = r2(len(await extentNow(p)));
                await scrollTo(p, 0); await settle(p); res.top = r2(len(await extentNow(p)));
                const ok = Math.abs(res.hover - E0) <= 0.5 && Math.abs(res.focus - E0) <= 0.5 && Math.abs(res.top - E0) <= 0.5 && res.afterLeave < E0 - 1 && res.afterBlur < E0 - 1;
                rep.add({ engine, cell: "compact·engagement-expands" + tag, pass: ok, rest: r2(E0), ...res, summary: `rest ${r2(E0)}; hover ${res.hover}, leave ${res.afterLeave}, focus ${res.focus}, blur ${res.afterBlur}, top ${res.top} px` });
                // threshold: ramp to find enter/exit, then oscillate around enter
                await scrollTo(p, 0); await settle(p);
                const ramp = await p.evaluate(async () => {
                    const P = window.__dockProbe; const f = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    let enter = null, exit = null;
                    for (let y = 0; y <= 900; y += 4) { window.scrollTo(0, y); await f(); if (P.posture() === "compact") { enter = y; break; } }
                    if (enter != null) {   // refine to 1 px from below
                        window.scrollTo(0, 0); await f(); await f();
                        for (let y = Math.max(0, enter - 8); y <= enter; y++) { window.scrollTo(0, y); await f(); if (P.posture() === "compact") { enter = y; break; } }
                    }
                    window.scrollTo(0, 900); await f();
                    for (let y = 900; y >= 0; y -= 4) { window.scrollTo(0, y); await f(); if (P.posture() !== "compact") { exit = y; break; } }
                    let flips = 0, last = P.posture();
                    if (enter != null) for (let k = 0; k < 12; k++) for (const y of [enter + 4, enter - 4]) { window.scrollTo(0, y); await f(); await f(); const q = P.posture(); if (q !== last) { flips++; last = q; } }
                    return { enter, exit, flips };
                });
                rep.add({ engine, cell: "compact·no-threshold-bounce" + tag, pass: ramp.enter != null && ramp.flips <= 1, ...ramp, summary: `enter at ${ramp.enter} px, exit at ${ramp.exit} px (band ${ramp.enter != null && ramp.exit != null ? ramp.enter - ramp.exit : "-"} px); 24 moves of ±4 px around enter flipped the posture ${ramp.flips} time(s) (bound 1)` });
            }
            await s.close();
            if (api.has) {
                const r = await openScene(browser, target, "compact", { ctx: { reducedMotion: "reduce" } });
                await startLog(r.page); await r.page.waitForTimeout(100);
                await scrollTo(r.page, 900); await settle(r.page);
                const iv = intermediate((await stopLog(r.page)).map((f) => ({ ...f, ax: "x" })));
                rep.add({ engine, cell: "prm·compact" + tag, pass: iv.between === 0 && iv.to < iv.from - 1, ...iv, summary: `reduced motion: ${iv.from} → ${iv.to} px with ${iv.between} intermediate frame(s) (bound 0)` });
                await r.close();
            }
        }
        // ── reduced motion on the posture morph ────────────────────────────────
        {
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
        }
        // ── coarse pointer: no hover latch ─────────────────────────────────────
        {
            const s = await openScene(browser, target, "fit", { ctx: COARSE });
            const p = s.page;
            const read = () => p.evaluate(() => { const el = window.__dockProbe.seats().at(-1); const cs = getComputedStyle(el); return { scale: cs.scale, transform: cs.transform, translate: cs.translate, shadow: cs.boxShadow, bg: cs.backgroundColor, hover: el.matches(":hover") }; });
            const media = await p.evaluate(() => ({ hover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches }));
            const rest = await read();
            const b = await p.evaluate(() => { const r = window.__dockProbe.seats().at(-1).getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
            await p.touchscreen.tap(b[0], b[1]);
            await p.waitForTimeout(300); const at300 = await read();
            await p.waitForTimeout(1200); const at1500 = await read();
            const diff = ["scale", "transform", "translate", "shadow", "bg"].filter((k) => at1500[k] !== rest[k]);
            rep.add({ engine, cell: "coarse·no-hover-latch" + tag, pass: diff.length === 0, media, rest, at300, at1500, summary: `(hover: hover) ${media.hover}, (pointer: coarse) ${media.coarse}; 1.5 s after a tap the seat ${diff.length ? "still differs in " + diff.map((k) => `${k} ${rest[k]} → ${at1500[k]}`).join("; ") : "is back to rest"}; :hover ${at1500.hover}` });
            await s.close();
        }
        // ── coarse pointer: a tap on the collapsed face pins, activates nothing ─
        {
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
        }
        // ── coarse pointer: the dock holds open under its own menu ─────────────
        {
            const s = await openScene(browser, target, "menu", { ctx: COARSE });
            const p = s.page;
            const c = await dockCenter(p);
            await p.touchscreen.tap(c.x, c.y); await p.waitForTimeout(900);
            const m = await p.evaluate(() => { const el = document.querySelector("[data-testid=menu]"); if (!el) return null; const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width > 0]; });
            let opened = false;
            if (m && m[2]) { await p.touchscreen.tap(m[0], m[1]); await p.waitForTimeout(500); }
            const menuOpen = () => p.evaluate(() => { const el = document.querySelector("[data-testid=menu-content]"); if (!el) return false; const r = el.getBoundingClientRect(); return !el.hidden && r.width > 0 && getComputedStyle(el).visibility !== "hidden"; });
            opened = await menuOpen();
            const postOpen = await posture(p);
            await p.waitForTimeout(5500);
            const stillOpen = await menuOpen(); const later = await posture(p); const e = await extentNow(p);
            const pass = opened && stillOpen && later !== "collapsed";
            rep.add({ engine, cell: "coarse·menu-holds" + tag, pass, opened, stillOpen, postOpen, later, summary: `menu ${opened ? "opened" : "NEVER OPENED"} (posture ${postOpen}); 5.5 s later menu ${stillOpen ? "open" : "closed"}, posture ${later}, extent ${r2(len(e))} px` });
            await s.close();
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
