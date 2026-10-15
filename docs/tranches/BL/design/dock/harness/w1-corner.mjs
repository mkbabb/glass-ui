// W1 · the plate corner (H2). The plate is a stadium of radius = cross/2 (a card: one
// finite radius on all four corners) at rest and at every sampled morph frame, in both
// orientations; the painted silhouette IS the adapter's extent and covers the dock box
// and its seats (H-1); a morph that paints nothing new is not a morph (H-1); Playwright
// WebKit's morph frames come from the screencast (H-1b, PF-1); the rail's end is
// reached by focus() as well as scrollIntoView (H-1b).
//
//   node w1-corner.mjs --build <dir> | --fixture pass|<fault>  [--engine chromium|webkit|all] [--out <dir>]
//
// BOUNDS
//   corner       every sampled boundary point within 1.0 CSS px of the circle (screenshots);
//                2.5 px in Playwright WebKit screencast frames (VP8 noise; pass-2/H2.md §1)
//   agree        at rest the silhouette's main extent is the adapter's extent() within 1 px;
//                in a Chromium morph sample it lies within [pre, post] adapter reads ± 1 px
//   cover        at rest the silhouette's box contains the dock root's box and every painting
//                seat's box, within 1 px (E cbwill: a 1.8 px plate)
//   moves        a morph whose adapter extent travels ≥ 20 px shows ≥ 3 distinct painted
//                extents (D pB: a morph that never moves; F pW1: a WebKit shot that completes it)
//   card         the fitted corner radius is equal on all four corners and the same in every
//                frame as at rest, within the corner bound
//                (Playwright WebKit screencast: 2.5 px against the rest radius read from the
//                same video's landed tail; calibrate.mjs CAST measures the codec's spread on a static card)
//   rail end     the last seat is fully inside the plate when the end is read
// H3 (pass-3/H3.md):
//   H3-5   a Playwright WebKit screencast `agree` is calibrated at the static rest: the video's
//          static head (painted main length before the trigger) minus the rAF strip's first
//          extent() is subtracted from every frame before [range ± 1 px] is judged, when that
//          offset is within the screencast corner bound (a larger offset is not calibrated away;
//          the lossless rest cell judges it)
//   H3-11  a card cell whose ONLY failure is `card`, whose two lossless rest radii differ, and
//          whose every frame's fitted radius lies between them (± the bound) is OWNER-BLOCKED
//          (Q-12: does a card's corner change with its posture?), never FAIL; a radius outside
//          the two rests fails
// H4 (pass-4/H4.md):
//   H4-7   one card rule in both engines (judgeMorph): every frame's fitted r between the two rests read by
//          the cell's own instrument ± its bound; `card` needs the lossless rests to agree; OB (Q-12) when
//          they differ and every frame lies between them. Plant `cardstep` (26 → 16 px in one step at mid
//          extent) reads OWNER-BLOCKED in both engines
//   H4-9   `ran`: a dynamic cell's extent must travel ≥ 20 px (the hover reached the dock). Fixture PASS
//          variant `hitpair` (the press surface is a hit element the adapter names in hit()) passes; plant
//          `hitpairunnamed` (the same page, hit() not named: the probe hides the press surface) fails `ran`
import fs from "node:fs";
import path from "node:path";
import { parseArgs, engines, openTarget, launch, openScene, probeMode, shoot, magentaCoverage, cornerRead, makeReport, outDir, engineTag, waitRest, dockCenter, extentNow, screencast, readFrame, interiorGreen, startLog, stopLog, r2 } from "./lib.mjs";

export const BOUND_PX = 1.0;
// Screencast bound. Playwright 1.61.1 encodes MJPEG → VP8 at 1 Mb/s, `-deadline realtime -speed 8`,
// so the codec's corner noise varies with machine load. One fixed bound, set from runs of this
// seat (pass-2/H2.md §1, pass-2/H2-records/w1-screencast-reads.json): the reference fixture and
// its PASS variant read ≤ 1.69 px in every Playwright WebKit morph frame (≤ 2.00 px in earlier
// runs at load 21-45; a static stadium reads ≤ 1.92 px, calibrate.json), and the shape plant
// nearest the bound (cssbend) read ≥ 2.93 px in its targeted cells. The margin is ~0.5 px each side.
// No per-video lift: a bound that moves with the video's own noise let a squashed rest lift its
// own bound (pass-2 first draft, squash plant UNMEASURED instead of FAIL).
export const BOUND_SCREENCAST_PX = 2.5;
export const CARD_SCREENCAST_PX = 2.5;
export const AGREE_PX = 1.0;
export const MOVES_MIN = 3;
export const INFLIGHT_MIN = 2;
export const VIDEO_SCALE_MAX = 0.05;   // a video more than 5 % off 1:1 is not read
const args = parseArgs();
const target = await openTarget(args);
const out = outDir(args, "W1");
const rep = makeReport("W1", target);

function band(e, vp) {
    return e.axis === "x"
        ? { x: 0, y: Math.max(0, e.t - 24), width: vp.width, height: Math.min(vp.height - Math.max(0, e.t - 24), e.h + 48) }
        : { x: Math.max(0, e.l - 24), y: 0, width: Math.min(vp.width - Math.max(0, e.l - 24), e.w + 48), height: vp.height };
}
async function silhouette(page, fitR) {
    const e = await extentNow(page);
    const img = await shoot(page, band(e, page.viewportSize()));
    const read = cornerRead(magentaCoverage(img), img.w, img.h, img.dsf, e.axis, { fitR });
    if (read.bbox) read.bbox = { l: read.bbox.l + img.clip.x, t: read.bbox.t + img.clip.y, r: read.bbox.r + img.clip.x, b: read.bbox.b + img.clip.y };
    return { ...read, adapter: e, img };
}
const mainLen = (s, ax) => ax === "x" ? s.w : s.h;
/** Wait until the extent starts to change or a morph window opens (a consumer hover-out delay
 *  must not end a segment before its morph begins: HEAD's warm pair read 0 px of travel otherwise). */
async function waitChange(page, cap = 4000) {
    const b = await extentNow(page); const t0 = Date.now();
    while (Date.now() - t0 < cap) { const e = await extentNow(page); const m = await page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return true; await page.waitForTimeout(16); }
    return false;
}

async function atRest(page, engine, name, { fitR = false, extra = null } = {}) {
    await probeMode(page, "plate");
    await page.waitForTimeout(120);
    const s = await silhouette(page, fitR);
    await probeMode(page, null);
    const boxes = await page.evaluate(() => { const P = window.__dockProbe, hp = window.__hp; const r = P.root().getBoundingClientRect();
        return { root: { l: r.left, t: r.top, r: r.right, b: r.bottom }, seats: P.seats({ all: true }).map((el) => ({ o: hp.visibleOpacity(el), q: hp.paintedRect(el), who: el.getAttribute("aria-label") ?? el.textContent.trim().slice(0, 12) })).filter((x) => x.o > 0.05 && x.q.r - x.q.l > 0.5 && x.q.b - x.q.t > 0.5) }; });
    fs.writeFileSync(`${out}/${engine}-${name}.png`, s.img.png);
    delete s.img;
    if (s.empty) { rep.add({ engine, cell: name + engineTag(target, engine), pass: false, summary: "no plate painted" }); return null; }
    const ax = s.adapter.axis;
    const dA = Math.abs(mainLen(s, ax) - (ax === "x" ? s.adapter.w : s.adapter.h));
    const outBy = (q) => Math.max(s.bbox.l - q.l, q.r - s.bbox.r, s.bbox.t - q.t, q.b - s.bbox.b, 0);
    const rootOut = outBy(boxes.root);
    const seatOut = boxes.seats.reduce((m, x) => { const o = outBy(x.q); return o > m.o ? { o, who: x.who } : m; }, { o: 0, who: "" });
    const checks = { corner: s.maxErr <= BOUND_PX, agree: dA <= AGREE_PX, cover: rootOut <= 1 && seatOut.o <= 1, ...(extra?.checks ?? {}) };
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    rep.add({ engine, cell: name + engineTag(target, engine), pass: failed.length === 0, failed, worst: { maxErr: s.maxErr, corner: s.worstCorner, w: s.w, h: s.h, rExpected: s.rExpected }, adapterDeltaPx: r2(dA), rootOutPx: r2(rootOut), seatOutPx: r2(seatOut.o), ...(extra?.data ?? {}),
        summary: `plate ${s.w}x${s.h}, r ${s.rExpected}${fitR ? " (fitted)" : ""}, worst ${s.maxErr} px at ${s.worstCorner} (bound ${BOUND_PX}); silhouette vs extent() Δ ${r2(dA)} px (bound ${AGREE_PX}); root outside the silhouette ${r2(rootOut)} px, seats ${r2(seatOut.o)} px${seatOut.who ? " (" + seatOut.who + ")" : ""} (bound 1)${extra?.note ? "; " + extra.note : ""}${failed.length ? "  ⟶ FAILED: " + failed.join(", ") : ""}` });
    return s;
}

/** A screencast segment's static head and tail: [{L, err, r}] medians, or null where the segment has none. */
function staticEnds(ok, ax) {
    const med = (xs) => { const s = [...xs].sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
    const end = (fr) => { if (!fr.length) return null; const L0 = mainLen(fr[0], ax); const run = []; for (const s of fr) { if (Math.abs(mainLen(s, ax) - L0) > 0.5) break; run.push(s); } return run.length >= 2 ? { L: L0, err: med(run.map((s) => s.maxErr)), r: med(run.map((s) => s.rExpected)) } : null; };
    return { head: end(ok), tail: end([...ok].reverse()) };
}

function judgeMorph(engine, name, samples, { bound, fitR, restR = null, restPairR = null, adapterRange = null, endpoints = null, how, restTrue = null, logInflight = null, videoScale = null, headOffset = null, mustMove = true }) {
    const ok = samples.filter((s) => !s.empty);
    const ax = samples[0]?.ax ?? "x";
    // H3-5: the screencast's static-rest offset (painted − extent() at the rest before the trigger)
    const cal = headOffset != null && Math.abs(headOffset) <= BOUND_SCREENCAST_PX ? headOffset : 0;
    // screencast: the video's trusted static head and tail give the card's reference radius
    let ends = null, unjudged = [];
    const boundAt = () => bound;
    if (how === "screencast") {
        ends = staticEnds(ok, ax);
        // an end counts only if the lossless screenshot of that rest passed its corner check
        const trust = (e) => e && restTrue && (Math.abs(e.L - restTrue.cL) <= 1 ? restTrue.c : Math.abs(e.L - restTrue.eL) <= 1 ? restTrue.e : false);
        if (ends.head && !trust(ends.head)) ends.head = null;
        if (ends.tail && !trust(ends.tail)) ends.tail = null;
    }
    const worst = ok.reduce((m, s) => (s.maxErr - boundAt(s) > (m ? m.maxErr - boundAt(m) : -Infinity) ? s : m), null);
    const distinct = new Set(ok.map((s) => Math.round(mainLen(s, ax)))).size;
    // travel from the endpoints (before the trigger, after rest), never from the samples alone:
    // a sampler that only sees the end state must not waive `moves`
    const travel = adapterRange ? adapterRange[1] - adapterRange[0] : endpoints ? Math.abs(endpoints[1] - endpoints[0]) : 0;
    const disagree = ok.map((s) => {
        const L = mainLen(s, ax);
        if (s.pre != null) { const lo = Math.min(s.pre, s.post) - AGREE_PX, hi = Math.max(s.pre, s.post) + AGREE_PX; return L < lo ? lo - L : L > hi ? L - hi : 0; }
        if (adapterRange) { const Lc = L - cal; const lo = adapterRange[0] - AGREE_PX, hi = adapterRange[1] + AGREE_PX; return Lc < lo ? lo - Lc : Lc > hi ? Lc - hi : 0; }
        return 0;
    });
    const worstDis = Math.max(0, ...disagree);
    // card: the reference radius comes from the same video, interpolated by main length between its
    // trusted static head and tail (the codec's fitted-r bias grows with the plate's width: 16.05 px
    // at 56 px, 19.29 px at 377 px on one static card, H2.md §1), so it cancels. That interpolation
    // is honest only if the true radius is one value, so the two lossless rest radii must agree
    // (restTrue.rc, restTrue.re) or `card` fails: a card whose radius changes with its size cannot
    // hide in the interpolation.
    let restPair = null;
    if (fitR && how === "screencast" && restTrue?.rc != null && restTrue?.re != null) restPair = Math.abs(restTrue.rc - restTrue.re);
    if (fitR && how !== "screencast" && restPairR && restPairR.every((v) => v != null)) restPair = Math.abs(restPairR[0] - restPairR[1]);
    // H4-7 · ONE card rule in both engines. The rests are read by the cell's own instrument: Chromium's
    // lossless rest radii; Playwright WebKit's trusted static head and tail of the same video (the codec's
    // fitted-r bias grows with width, H2.md §1, so a video frame is compared with that video's rests, never
    // a lossless one). `between`: every frame's fitted r within [min, max] of those two ± the instrument's
    // bound. `card` = the two LOSSLESS rest radii agree (≤ BOUND_PX) and `between`. OWNER-BLOCKED (Q-12) =
    // `card` is the only failure, the lossless rests differ, and `between` holds. Same rule, same verdict
    // class in both engines (pass 3: B′ light read OB in Chromium and FAIL in Playwright WebKit).
    const lossPair = how === "screencast" ? [restTrue?.rc, restTrue?.re] : restPairR;
    // the rests: the screencast's own trusted rest frames; where a video rest is untrusted, the lossless rest
    // pair (restTrue) joins them (the union, so a biased video rest and the true rest both bound the frames)
    const vidRests = [ends?.head?.r, ends?.tail?.r];
    const instRests = how === "screencast" ? [...vidRests.filter((v) => v != null), ...(vidRests.some((v) => v == null) ? (lossPair ?? []).filter((v) => v != null) : [])] : (restPairR ?? []).filter((v) => v != null);
    const cardBoundI = how === "screencast" ? CARD_SCREENCAST_PX : bound;
    const rLo = instRests.length ? Math.min(...instRests) - cardBoundI : null, rHi = instRests.length ? Math.max(...instRests) + cardBoundI : null;
    const rOut = (s) => (rLo == null ? 0 : s.rExpected < rLo ? rLo - s.rExpected : s.rExpected > rHi ? s.rExpected - rHi : 0);
    const rSpread = fitR ? Math.max(0, ...ok.map(rOut)) : 0;
    const between = fitR && instRests.length > 0 && rSpread <= 0;
    if (fitR && !instRests.length) unjudged.push("card");
    if (fitR && how !== "screencast" && (!restPairR || restPairR.some((v) => v == null))) unjudged.push("card");
    // moves: judged only when the sampler saw the morph in flight. A screenshot sample is in flight
    // when its bracketing adapter reads lie strictly between the endpoints. Under load a screenshot
    // can take longer than the whole morph (a first sample at 452 ms of a 278 ms spring, load 31):
    // then `moves` is UNMEASURED, never PASS, and the cell is re-run (HARNESS.md §1 "Load").
    const inflight = how === "screenshot" && endpoints ? ok.filter((s) => { const lo = Math.min(...endpoints) + 0.5, hi = Math.max(...endpoints) - 0.5; return [s.pre, s.post].some((v) => v > lo && v < hi); }).length : null;
    // starved = the rAF log shows the extent in flight on ≥ 2 frames, yet < 2 shots caught it; a
    // log with < 2 in-between frames is a jump, and `moves` is judged (and fails) on it
    // H4 (pass-4/H4.md §2.3): three distinct painted extents can be demanded only of a sampler that took
    // three shots in flight. Two bracketing reads in flight with two distinct extents is a starved sampler
    // (Chromium `card·first-expand`, 5 shots, 2 in flight, load 89-145, 2 of 3 runs), not a dead morph.
    const movesJudged = travel < 20 || how !== "screenshot" || inflight >= MOVES_MIN || distinct >= MOVES_MIN || (logInflight ?? Infinity) < INFLIGHT_MIN;
    if (!movesJudged) unjudged.push("moves");
    // H4-9 · `ran`: a cell that asked for a posture change must see the extent travel ≥ 20 px. A hover
    // that never reached the dock (a probe that hid its press surface: G-proto §3.4, every W1 dynamic cell
    // green at "adapter travel 0 px") is a FAIL, never a vacuous pass of `moves`
    const checks = { corner: (ok.length > 0 && ok.every((s) => s.maxErr <= boundAt(s))), agree: worstDis <= 0, moves: !movesJudged || travel < 20 || distinct >= MOVES_MIN };
    if (mustMove) checks.ran = travel >= 20;
    const cardBound = cardBoundI;
    if (fitR) checks.card = unjudged.includes("card") || (between && restPair != null && restPair <= BOUND_PX);
    const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
    const unmeasured = failed.length === 0 && unjudged.length > 0;
    // H3-11 · Q-12: the card corner moves between its two rest radii and nowhere else
    const pair = fitR ? lossPair : null;
    let ownerBlocked;
    if (failed.length === 1 && failed[0] === "card" && pair && pair.every((v) => v != null) && Math.abs(pair[0] - pair[1]) > BOUND_PX && between) ownerBlocked = "Q-12";
    const calNote = how === "screencast" && headOffset != null ? `; static-rest offset ${r2(headOffset)} px${cal ? " (calibrated)" : " (not calibrated: beyond the bound)"}` : "";
    const liftNote = how === "screencast" && ends ? `; video static ends head ${ends.head ? r2(ends.head.err) : "untrusted"} / tail ${ends.tail ? r2(ends.tail.err) : "untrusted"} px; video scale ${videoScale != null ? videoScale.toFixed(4) : "-"}` : "";
    rep.add({ engine, cell: name + engineTag(target, engine), pass: failed.length === 0 && !unmeasured, unmeasured, ownerBlocked, restPairR: pair ?? undefined, headOffsetPx: headOffset != null ? r2(headOffset) : undefined, failed, unjudged, videoScale: videoScale != null ? +videoScale.toFixed(4) : undefined, samples: ok.length, how, distinctExtents: distinct, inflight, logInflight, adapterTravelPx: r2(travel), worst: worst && { maxErr: worst.maxErr, bound: r2(boundAt(worst)), corner: worst.worstCorner, w: worst.w, h: worst.h, rExpected: worst.rExpected }, disagreePx: r2(worstDis), rSpread: r2(rSpread), restPairPx: restPair != null ? r2(restPair) : undefined, noise: ends ? { head: ends.head, tail: ends.tail } : undefined,
        frames: ok.map((s) => ({ t: s.tMs, w: s.w, h: s.h, maxErr: s.maxErr, r: s.rExpected, pre: s.pre != null ? r2(s.pre) : undefined, post: s.post != null ? r2(s.post) : undefined })),
        summary: `${unmeasured ? "UNMEASURED " + unjudged.join(", ") + ": " : ""}${ok.length} ${how} sample(s)${inflight != null ? ` (${inflight} in flight; rAF log ${logInflight ?? "-"} frames in flight)` : ""}, ${distinct} distinct painted extents over an adapter travel of ${r2(travel)} px (moves: ≥ ${MOVES_MIN} when ≥ 20 px); worst corner ${worst?.maxErr ?? "n/a"} px at ${worst?.worstCorner ?? "-"} (plate ${worst?.w}x${worst?.h}, r ${worst?.rExpected}; bound ${worst ? r2(boundAt(worst)) : bound})${liftNote}; silhouette outside the adapter's extent by ${r2(worstDis)} px${calNote}${fitR ? `; fitted r outside the rests' range [${rLo != null ? r2(rLo) : "-"}, ${rHi != null ? r2(rHi) : "-"}] by ${r2(rSpread)} px (rests ${instRests.map(r2).join(" / ")} by this instrument ± ${cardBound})${restPair != null ? `, lossless rest radii differ by ${r2(restPair)} px (bound ${BOUND_PX})` : ""}` : ""}${failed.length ? `  ⟶ ${ownerBlocked ? "OWNER-BLOCKED (" + ownerBlocked + ", rest radii " + pair.map(r2).join(" / ") + " px)" : "FAILED"}: ` + failed.join(", ") : ""}` });
}

/** Chromium: screenshot continuously from the trigger until the plate is still, bracketing each shot with adapter reads. */
async function sampleByShots(page, engine, name, trigger, opts = {}) {
    await probeMode(page, "plate");
    const before = await extentNow(page);
    await startLog(page, {});
    await trigger();
    const t0 = Date.now();
    for (;;) {
        const e = await extentNow(page);
        const m = await page.evaluate(() => window.__dockProbe.morphing());
        if (m || Math.abs(e.w - before.w) > 0.25 || Math.abs(e.h - before.h) > 0.25) break;
        if (Date.now() - t0 > 7000) break;
        await page.waitForTimeout(10);
    }
    const samples = []; const tStart = Date.now(); let still = 0, last = null;
    while (Date.now() - tStart < 2500) {
        const pre = await extentNow(page);
        const s = await silhouette(page, opts.fitR);
        const post = await extentNow(page);
        delete s.img;
        s.tMs = Date.now() - tStart; s.ax = pre.axis;
        s.pre = pre.axis === "x" ? pre.w : pre.h; s.post = post.axis === "x" ? post.w : post.h;
        samples.push(s);
        const k = `${s.w}x${s.h}`; const m = await page.evaluate(() => window.__dockProbe.morphing());
        still = k === last && !m ? still + 1 : 0; last = k;
        if (still >= 3) break;
    }
    await probeMode(page, null);
    const after = await extentNow(page), main = (e) => (e.axis === "x" ? e.w : e.h);
    // the rAF log says whether the extent had in-between frames at all (a jump has none)
    const lo = Math.min(main(before), main(after)) + 0.5, hi = Math.max(main(before), main(after)) - 0.5;
    const logInflight = (await stopLog(page)).filter((f) => { const L = before.axis === "x" ? f.e[2] - f.e[0] : f.e[3] - f.e[1]; return L > lo && L < hi; }).length;
    return (extra = {}) => judgeMorph(engine, name, samples, { bound: BOUND_PX, fitR: opts.fitR, restR: opts.restR, endpoints: [main(before), main(after)], how: "screenshot", logInflight, ...extra });
}

/** Playwright WebKit: one screencast per scene, the rests read by screenshot between transitions. */
async function webkitScene(browser, engine, scene, query, prefix, fitR) {
    const dir = path.join(out, `cast-${engine}-${prefix}`);
    const restR = {};
    let ax = "x", strip = [];
    const cast = await screencast(browser, target, scene, { query, dir, crop: (vp) => ({ x: 0, y: 0, width: vp.width, height: vp.height }) }, async (page, markT) => {
        ax = await page.evaluate(() => window.__dockProbe.axis());
        const r0 = await atRest(page, engine, `${prefix}·collapsed-rest`, { fitR }); restR.c = r0?.rExpected; restR.cOk = !!r0 && r0.maxErr <= BOUND_PX; restR.cL = r0 ? mainLen(r0, ax) : null; restR.cX = r0 ? (ax === "x" ? r0.h : r0.w) : null;
        await startLog(page, {});
        await probeMode(page, "plate"); await page.waitForTimeout(200);
        const c = await dockCenter(page);
        markT("first-expand"); await page.evaluate(() => { window.__hpLog.mark = "first-expand"; }); await page.mouse.move(c.x, c.y, { steps: 3 }); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 });
        markT("rest1"); await probeMode(page, null);
        const r1 = await atRest(page, engine, `${prefix}·expanded-rest`, { fitR }); restR.e = r1?.rExpected; restR.eOk = !!r1 && r1.maxErr <= BOUND_PX; restR.eL = r1 ? mainLen(r1, ax) : null; restR.eX = r1 ? (ax === "x" ? r1.h : r1.w) : null;
        await probeMode(page, "plate"); await page.waitForTimeout(200);
        markT("warm-collapse"); await page.evaluate(() => { window.__hpLog.mark = "warm-collapse"; }); await page.mouse.move(4, 4); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 });
        const c2 = await dockCenter(page);
        markT("warm-expand"); await page.evaluate(() => { window.__hpLog.mark = "warm-expand"; }); await page.mouse.move(c2.x, c2.y, { steps: 3 }); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 });
        markT("end");
        strip = await stopLog(page);
    });
    cast.strip = strip;
    return { cast, ax, restR };
}
function webkitJudge(engine, prefix, w, fitR, only = null) {
    const order = ["first-expand", "rest1", "warm-collapse", "warm-expand", "end"];
    for (const [k, next] of [["first-expand", "rest1"], ["warm-collapse", "warm-expand"], ["warm-expand", "end"]]) {
        if (only && !only.includes(k)) continue;
        const a = w.cast.marks[k], b = w.cast.marks[next];
        const strip = (w.cast.strip ?? []).filter((f) => f.mk === k).map((f) => w.ax === "x" ? f.e[2] - f.e[0] : f.e[3] - f.e[1]);
        const range = strip.length ? [Math.min(...strip), Math.max(...strip)] : null;
        const raw = w.cast.frames.filter((f) => f.t >= a && f.t <= b).map((f) => {
            const img = readFrame(f); const s = cornerRead(magentaCoverage(img, interiorGreen(img)), img.w, img.h, 1, w.ax, { fitR });
            return { ...s, tMs: f.t - a, ax: w.ax };
        });
        const R = w.restR;
        // the video's own scale: Playwright WebKit's screencast is not always 1 video px = 1 CSS px
        // (one run painted the 377×56 plate at 369×55). The plate's cross axis is constant through
        // the morph, so video cross ÷ lossless cross is the scale; every length is divided by it.
        const crossOf = (x) => (w.ax === "x" ? x.h : x.w);
        const vc = raw.filter((x) => !x.empty).map(crossOf).sort((p, q) => p - q);
        const lc = R.cX ?? R.eX;
        const scale = vc.length && lc ? vc[Math.floor(vc.length / 2)] / lc : 1;
        const samples = raw.map((x) => x.empty ? x : { ...x, w: x.w / scale, h: x.h / scale, maxErr: x.maxErr / scale, rExpected: x.rExpected / scale });
        if (Math.abs(scale - 1) > VIDEO_SCALE_MAX) {
            rep.add({ engine, cell: `${prefix}·${k}` + engineTag(target, engine), pass: false, unmeasured: true, unjudged: ["scale"], videoScale: r2(scale), summary: `UNMEASURED: the video's scale is ${scale.toFixed(4)} (cross ${vc[Math.floor(vc.length / 2)]} px against ${lc} px lossless; bound ±${VIDEO_SCALE_MAX})` });
            continue;
        }
        if (R.cL != null && R.eL != null && Math.abs(R.eL - R.cL) >= 20 && (!range || range[1] - range[0] < 20)) {
            rep.add({ engine, cell: `${prefix}·${k}` + engineTag(target, engine), pass: false, unmeasured: true, unjudged: ["segment"], summary: `UNMEASURED: the segment missed its transition (rAF strip travel ${range ? r2(range[1] - range[0]) : "none"} px; the lossless rests differ by ${r2(Math.abs(R.eL - R.cL))} px)` });
            continue;
        }
        const restTrue = { c: R.cOk, e: R.eOk, cL: R.cL, eL: R.eL, rc: fitR ? R.c : null, re: fitR ? R.e : null };
        // H3-5: the static head's painted main length (the frames before the plate first moves)
        // against the strip's first extent() read
        let headOffset = null;
        if (strip.length) {
            const okS = samples.filter((x) => !x.empty); const L0 = okS.length ? mainLen(okS[0], w.ax) : null; const head = [];
            for (const x of okS) { if (Math.abs(mainLen(x, w.ax) - L0) > 0.5) break; head.push(mainLen(x, w.ax)); }
            if (head.length >= 2) { head.sort((p, q) => p - q); headOffset = head[Math.floor(head.length / 2)] - strip[0]; }
        }
        judgeMorph(engine, `${prefix}·${k}`, samples, { bound: BOUND_SCREENCAST_PX, fitR, adapterRange: range, how: "screencast", restTrue, videoScale: scale, headOffset });
    }
    void order;
}

for (const engine of engines(args)) {
    const browser = await launch(engine);
    const tag = engineTag(target, engine);
    try {
        await rep.guard(engine, ["fit·rest", "fit·hovered-rest"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "fit");
            await atRest(s.page, engine, "fit·rest");
            const seats = await s.page.evaluate(() => window.__dockProbe.seats().map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, r.width]; }));
            for (const [x, y, w] of seats) for (let k = -2; k <= 2; k++) { await s.page.mouse.move(x + (w / 5) * k, y); await s.page.waitForTimeout(35); }
            await s.page.waitForTimeout(700);
            await atRest(s.page, engine, "fit·hovered-rest");
            await s.close();
        });
        if (target.kind === "fixture" || fs.existsSync(path.join(path.resolve(args.build), "demo", "index.html"))) {
            await rep.guard(engine, ["sidebar·rest" + tag], async () => { const s = await openScene(browser, target, "sidebar", { settle: 1800 }); await atRest(s.page, engine, "sidebar·rest"); await s.close(); });
            await rep.guard(engine, ["sidebar·short-viewport" + tag], async () => { const s = await openScene(browser, target, "sidebar", { settle: 1800, ctx: { viewport: { width: 1440, height: 600 } }, query: { h: "480" } }); await atRest(s.page, engine, "sidebar·short-viewport"); await s.close(); });
        }
        await rep.guard(engine, ["rail·rest", "rail·scrolled-end", "rail·focus-end"].map((n) => n + tag), async () => {
            const s = await openScene(browser, target, "rail");
            await atRest(s.page, engine, "rail·rest");
            const endRead = async (how) => {
                const inside = await s.page.evaluate(() => { const P = window.__dockProbe, hp = window.__hp; const last = P.seats().at(-1); const q = last.getBoundingClientRect(); const e = P.extent(); return { inside: q.top >= e.t - 0.5 && q.bottom <= e.b + 0.5 && q.left >= e.l - 0.5 && q.right <= e.r + 0.5, q: [q.top, q.bottom], e: [e.t, e.b] }; });
                return { checks: { end: inside.inside }, data: { lastSeatInside: inside.inside }, note: `${how}: the last seat is ${inside.inside ? "" : "NOT "}inside the plate (seat ${r2(inside.q[0])}-${r2(inside.q[1])}, plate ${r2(inside.e[0])}-${r2(inside.e[1])})` };
            };
            await s.page.evaluate(() => { const P = window.__dockProbe; P.seats().at(-1).scrollIntoView({ block: "end", inline: "end" }); });
            await s.page.waitForTimeout(500);
            await atRest(s.page, engine, "rail·scrolled-end", { extra: await endRead("scrollIntoView") });
            await s.page.evaluate(() => window.__dockProbe.seats()[0].scrollIntoView({ block: "start", inline: "start" })); await s.page.waitForTimeout(400);
            await s.page.keyboard.press("Shift");
            await s.page.evaluate(() => window.__dockProbe.seats().at(-1).focus());
            await s.page.waitForTimeout(600);
            await atRest(s.page, engine, "rail·focus-end", { extra: await endRead("focus()") });
            await s.close();
        });
        for (const [scene, query, prefix, fitR] of [["morph", {}, "morph", false], ["vmorph", {}, "vmorph", false], ["morph", { shape: "card" }, "card", true]]) {
            const names = ["collapsed-rest", "first-expand", "expanded-rest", "warm-collapse", "warm-expand"].map((k) => `${prefix}·${k}${tag}`);
            await rep.guard(engine, names, async () => {
                if (engine === "webkit") {
                    const w = await webkitScene(browser, engine, scene, query, prefix, fitR);
                    webkitJudge(engine, prefix, w, fitR);
                    return;
                }
                const s = await openScene(browser, target, scene, { query });
                const r0 = await atRest(s.page, engine, `${prefix}·collapsed-rest`, { fitR });
                const c = await dockCenter(s.page);
                const j1 = await sampleByShots(s.page, engine, `${prefix}·first-expand`, () => s.page.mouse.move(c.x, c.y, { steps: 3 }), { fitR, restR: r0?.rExpected });
                const r1 = await atRest(s.page, engine, `${prefix}·expanded-rest`, { fitR });
                const pair = { restPairR: fitR ? [r0?.rExpected ?? null, r1?.rExpected ?? null] : null };
                j1(pair);
                (await sampleByShots(s.page, engine, `${prefix}·warm-collapse`, () => s.page.mouse.move(4, 4), { fitR, restR: r1?.rExpected }))(pair);
                await waitRest(s.page);
                const c2 = await dockCenter(s.page);
                (await sampleByShots(s.page, engine, `${prefix}·warm-expand`, () => s.page.mouse.move(c2.x, c2.y, { steps: 3 }), { fitR, restR: r1?.rExpected }))(pair);
                await s.close();
            });
        }
    } finally {
        await browser.close();
    }
}
await target.close();
rep.finish(out);
