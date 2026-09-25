// W6 · DOCK-COLLAPSED-FORM (O-65, owner 2026-09-24: "the dock when collapsed is not
// correct"). The collapsed dock is one glass form: the one plate wraps every element
// the collapsed rung keeps (face, progress track, count); a dismiss is a seat inside
// the plate; collapsed and expanded share the one morph.
//
//   node w6-collapsed-form.mjs --build <dir> | --fixture pass|<fault>  [--engine …] [--out <dir>]
//
// Scene `form`: a collapsed dock whose collapsed rung keeps a face (▶), a track, a count
// ("1") and a dismiss (×) — at HEAD the face in #collapsed and the rest in
// #persistent-end, the routing Q-10's default (a) gives actionable content.
//   form·collapsed-rest  wraps: 0 px of form ink beyond the plate (pixels, faces probe on the
//                        four form elements; bound 1 px); present: each form element paints;
//                        dismiss-seat: the dismiss is one of seats(); one-plate: exactly one
//                        painting element (or pseudo) in the dock carries a backdrop-filter, and
//                        it is plate()
//   form·expanded-rest   one-plate; samePlate: plate() is the very element that was plate() collapsed
//                        (identity, marked before the expand, never compared by label); wraps
//                        (present is recorded, not judged)
//   form·expand, form·collapse  the shared morph: lib.mjs analyseMorph on the frame strip, plus
//                        wraps on every sampled frame (screenshots in Chromium, the screencast
//                        in Playwright WebKit, as W3)
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, makeReport, outDir, engineTag, startLog, stopLog, mark, waitRest, dockCenter, extentNow, probeMode, shoot, facesRead, FACE_DOM_SCREENCAST, screencast, readFrame, interiorGreen, pinnedRung, analyseMorph, morphChecks, morphSummary, r2 } from "./lib.mjs";

const FORM = ["[data-testid=form-face]", "[data-testid=form-track]", "[data-testid=form-count]", "[data-testid=form-dismiss]"];
export const WRAP_PX = 1.0, WRAP_PX_SCREENCAST = 2.0, INFLIGHT_MIN = 2;
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W6");
const rep = makeReport("W6", target);
const RUNG = await pinnedRung(target);

async function waitChange(page, cap = 7000) {
    const b = await extentNow(page); const t0 = Date.now();
    while (Date.now() - t0 < cap) { const e = await extentNow(page); const m = await page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return; await page.waitForTimeout(16); }
}
const band = (e, vp) => ({ x: 0, y: Math.max(0, e.t - 40), width: vp.width, height: Math.min(vp.height - Math.max(0, e.t - 40), e.h + 80) });
async function wrapShot(page) { await probeMode(page, "faces", { faceSel: FORM }); const e = await extentNow(page); const img = await shoot(page, band(e, page.viewportSize())); await probeMode(page, null); return facesRead(img, img.dsf); }
async function structure(page) {
    return page.evaluate((FORM) => {
        const P = window.__dockProbe, hp = window.__hp, root = P.root();
        const present = FORM.map((sel) => { const el = document.querySelector(sel); if (!el) return { sel, ok: false, why: "missing" }; const q = hp.paintedRect(el); return { sel, ok: hp.visibleOpacity(el) > 0.05 && q.r - q.l > 0.5 && q.b - q.t > 0.5 }; });
        const dismiss = document.querySelector(FORM[3]);
        const isSeat = !!dismiss && P.seats({ all: true }).some((s) => s === dismiss || s.contains(dismiss) || dismiss.contains(s));
        const plates = [];
        for (const e of [root, ...root.querySelectorAll("*")]) for (const pse of [null, "::before", "::after"]) {
            const cs = getComputedStyle(e, pse); if (pse && (cs.content === "none" || cs.content === "normal")) continue;
            const bf = cs.backdropFilter || cs.webkitBackdropFilter || "none";
            if (bf === "none") continue;
            const q = pse ? e.getBoundingClientRect() : hp.paintedRect(e);
            if (hp.visibleOpacity(e) <= 0.05 || q.r - q.l < 1 || q.b - q.t < 1) continue;
            plates.push({ who: hp.label(e) + (pse ?? ""), isPlate: e === P.plate() && !pse });
        }
        return { present, isSeat, plates, plateId: hp.label(P.plate()), marked: P.plate()?.getAttribute("data-hp-plate-mark") === "collapsed" };
    }, FORM);
}
function restCell(engine, name, w, st, extra = {}) {
    const checks = { wraps: !w.empty && w.outside <= WRAP_PX, onePlate: st.plates.length === 1 && st.plates[0].isPlate, ...extra.checks };
    // the collapsed rung's elements must paint when collapsed; expanded, the collapsed face may go (recorded)
    if (name.endsWith("collapsed-rest")) { checks.present = st.present.every((p) => p.ok); checks.dismissSeat = st.isSeat; }
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    rep.add({ engine, cell: name + engineTag(target, engine), pass: failed.length === 0, failed, wraps: w, structure: st,
        summary: `form ink beyond the plate ${w.empty ? "NO PLATE" : w.outside + " px"} (bound ${WRAP_PX}); present ${st.present.filter((p) => p.ok).length}/4${st.present.some((p) => !p.ok) ? " (missing " + st.present.filter((p) => !p.ok).map((p) => p.sel).join(", ") + ")" : ""}; dismiss is a seat: ${st.isSeat}; backdrop plates ${st.plates.length} [${st.plates.map((p) => p.who).join(", ")}]${extra.note ? "; " + extra.note : ""}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        await rep.guard(engine, ["form·collapsed-rest", "form·expanded-rest", "form·expand", "form·collapse"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "form");
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            // samePlate is element identity, never a label: a swapped plate with the same classes must fail
            const st0 = await s.page.evaluate(() => { const p = window.__dockProbe.plate(); p.setAttribute("data-hp-plate-mark", "collapsed"); return { plate: window.__hp.label(p) }; });
            restCell(engine, "form·collapsed-rest", await wrapShot(s.page), await structure(s.page));
            await startLog(s.page, { owners: true }); await s.page.waitForTimeout(150);
            const c = await dockCenter(s.page);
            await mark(s.page, "form·expand"); await s.page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 }); await s.page.waitForTimeout(200);
            await mark(s.page, "rest");
            const st1 = await structure(s.page);
            await mark(s.page, "form·collapse"); await s.page.mouse.move(4, 4); await waitChange(s.page); await waitRest(s.page, { quiet: 500 }); await s.page.waitForTimeout(200);
            const frames = await stopLog(s.page);
            // expanded rest read after the strip (the strip must not carry screenshots)
            const c2 = await dockCenter(s.page); await s.page.mouse.move(c2.x, c2.y, { steps: 3 }); await waitChange(s.page); await waitRest(s.page, { quiet: 500 });
            restCell(engine, "form·expanded-rest", await wrapShot(s.page), st1, { checks: { samePlate: st1.marked }, note: `plate ${st1.plateId} (collapsed ${st0.plate}); the same element: ${st1.marked}` });
            await s.close();
            // the shared morph: wraps sampled in paint
            const wraps = {};
            if (engine === "webkit") {
                const cast = await screencast(browser, target, "form", { dir: path.join(out, `cast-${engine}`), crop: (vp) => ({ x: 0, y: 0, width: vp.width, height: vp.height }) }, async (page, markT) => {
                    await probeMode(page, "faces", { faceSel: FORM }); await page.waitForTimeout(300);
                    const cc = await dockCenter(page);
                    markT("form·expand"); await page.mouse.move(cc.x, cc.y, { steps: 3 }); await waitChange(page); await waitRest(page, { quiet: 500 });
                    markT("form·collapse"); await page.mouse.move(4, 4); await waitChange(page); await waitRest(page, { quiet: 500 });
                    markT("end");
                });
                for (const [k, n] of [["form·expand", "form·collapse"], ["form·collapse", "end"]]) {
                    const reads = cast.frames.filter((f) => f.t >= cast.marks[k] - 40 && f.t <= cast.marks[n]).map((f) => { const img = readFrame(f); return facesRead(img, 1, interiorGreen(img), FACE_DOM_SCREENCAST); }).filter((r) => !r.empty);
                    wraps[k] = { max: Math.max(0, ...reads.map((r) => r.outside)), n: reads.length, bound: WRAP_PX_SCREENCAST, how: "screencast" };
                }
            } else {
                const s2 = await openScene(browser, target, "form");
                for (const [k, trig] of [["form·expand", async (p) => { const cc = await dockCenter(p); await p.mouse.move(cc.x, cc.y, { steps: 3 }); }], ["form·collapse", (p) => p.mouse.move(4, 4)]]) {
                    await probeMode(s2.page, "faces", { faceSel: FORM });
                    const e0 = await extentNow(s2.page); const bb = band(e0, s2.page.viewportSize());
                    const reads = [];
                    await trig(s2.page);
                    const t0 = Date.now(); let still = 0, last = "", started = false;
                    while (Date.now() - t0 < 5000) { const L = (await extentNow(s2.page)).w; const img = await shoot(s2.page, bb); const r = facesRead(img, img.dsf); if (!r.empty) reads.push({ ...r, L }); const e = await extentNow(s2.page); const kk = e.w.toFixed(1); const m = await s2.page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - e0.w) > 0.25) started = true; still = kk === last && !m && reads.length > 3 ? still + 1 : 0; last = kk; if (still >= 3 && (started || Date.now() - t0 > 1500)) break; }
                    await probeMode(s2.page, null);
                    // in flight: reads whose adapter width lay strictly between the endpoints; fewer than
                    // INFLIGHT_MIN on a ≥ 20 px travel leaves `wraps` in flight UNMEASURED (W3's rule)
                    const L1 = (await extentNow(s2.page)).w, lo = Math.min(e0.w, L1) + 0.5, hi = Math.max(e0.w, L1) - 0.5;
                    const inflight = reads.filter((r) => r.L > lo && r.L < hi).length;
                    wraps[k] = { max: Math.max(0, ...reads.map((r) => r.outside)), n: reads.length, inflight, starved: Math.abs(L1 - e0.w) >= 20 && inflight < INFLIGHT_MIN, bound: WRAP_PX, how: "screenshot" };
                    await waitRest(s2.page, { quiet: 400 });
                }
                await s2.close();
            }
            for (const k of ["form·expand", "form·collapse"]) {
                const i0 = frames.findIndex((f) => f.mk === k); const fr = frames.filter((f) => f.mk === k); if (i0 > 0) fr.unshift(frames[i0 - 1]);
                if (fr.length < 3) { rep.add({ engine, cell: k + tag, pass: false, summary: `only ${fr.length} frames` }); continue; }
                const a = analyseMorph(fr, RUNG, { ax, seats: false });
                const W = wraps[k], wrapOk = W.n > 0 && W.max <= W.bound;
                a.faces = { ok: wrapOk && W.starved ? null : wrapOk, why: `${wrapOk && W.starved ? `UNMEASURED (sampler starved: ${W.inflight} in-flight read(s)) · ` : ""}${W.max} px of form ink beyond the plate over ${W.n} ${W.how} sample(s)${W.inflight != null ? ` (${W.inflight} in flight)` : ""} (bound ${W.bound})` };
                const checks = morphChecks(a); const unjudged = checks.faces === null ? ["faces"] : []; if (unjudged.length) delete checks.faces;
                const failed = Object.entries(checks).filter(([, v]) => !v).map(([x]) => x);
                const unmeasured = failed.length === 0 && unjudged.length > 0;
                rep.add({ engine, cell: k + tag, pass: failed.length === 0 && !unmeasured, unmeasured, unjudged, failed, ...a, summary: morphSummary(a) + (failed.length ? "  ⟶ FAILED: " + failed.join(", ") : "") });
            }
        });
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
