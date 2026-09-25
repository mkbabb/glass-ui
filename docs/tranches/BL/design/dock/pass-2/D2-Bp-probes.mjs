// D2-Bp-probes.mjs: the D2-B′ research probes on HEAD + floor (D2 pass 2, REGISTRY §7.3
// D2-B′). Each arm answers one open question the spec (D2-Bp-spec.md) rests on. It reads DOM,
// layout and timing only; it never edits source. Scene arms run on a floor build through the
// floor adapter; synthetic arms run on an inline page (no dock), to isolate a platform fact.
//
//   node D2-Bp-probes.mjs --build <floor build> --adapter adapter-floor.mjs \
//        --arm cost|block|hit|ro|trun|fluid|scroller|all --engine chromium|webkit|all --out <json>
//
// Arms
//   cost      per-frame cost of B′'s writes (plate inset + radius, N seat translates, one face
//             opacity) against the floor's own carrier and an idle baseline; N = 0, 10, 20, 40.
//             In-page: script ms (the writes) and style+layout ms (a forced read after them),
//             rAF interval. Chromium adds a trace (main-thread ms per frame by event) and a 4×
//             CPU-throttled column. REGISTRY §7.3 B′ item 2 (the BANK re-trigger)
//   block     a 1.2 s main-thread block 60 ms into a first expand: the floor carrier as built,
//             and B′'s body emulated in page (one analytic spring, dt clamped to 64 ms). Frame
//             gap, the first step after the block, the landing. §7.3 B′ item 9 (recorded, not gated)
//   hit       hit testing on a plate carried by px insets + radius (B′'s box mode) mid-morph:
//             outside the arc, a plate wider than the root (a collapse), a translated seat. Q-7 (a)
//   ro        ResizeObserver as the one geometry trigger: (a) a seat inserted into a stretched
//             run and observed from the MutationObserver's microtask is delivered in the same
//             frame, before paint; (b) re-observing an unchanged box forces one delivery (the
//             removal path); (c) inverse translates written in the RO callback raise no loop
//             error. §7.3 B′ item 5 (PF-5)
//   trun      K-13: a seat's own CSS width transition. `transitionrun` (capture, on the dock)
//             fires before any frame paints an intermediate width; finish() there hands the
//             change to one owner. §7.3 B′ item 8 (value.js X-11)
//   fluid     the fit dock at 1440 and 1200 px: which lengths change with the viewport (the
//             W3 viewport-resize cell's 6.09 px). §7.3 B′ item 4 (CX-5)
//   scroller  a translated seat inside a genuine scroller: does the translate change the
//             scroll range (seat FLIP on an overflowing run)
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, playwright } from "../harness/lib.mjs";

const args = parseArgs();
const arms = (args.arm ?? "all") === "all" ? ["fluid", "hit", "ro", "trun", "scroller", "block", "cost"] : String(args.arm).split(",");
const engs = (args.engine ?? "all") === "all" ? ["chromium", "webkit"] : String(args.engine).split(",");
const target = args.build ? await openTarget(args) : null;
const out = { probe: "D2-Bp-probes", started: new Date().toISOString(), build: target?.label ?? null, cells: [] };
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };
const add = (c) => { c.load = loadAvg(); out.cells.push(c); console.log(JSON.stringify(c)); };

// ── synthetic page helper ────────────────────────────────────────────────────
async function blankPage(browser, html) {
    const context = await browser.newContext({ viewport: { width: 1000, height: 600 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.setContent(`<!doctype html><html><body style="margin:0">${html}</body></html>`);
    return { page, close: () => context.close() };
}

// ── fluid ────────────────────────────────────────────────────────────────────
async function fluid(browser, engine) {
    const s = await openScene(browser, target, "fit");
    const read = () => s.page.evaluate(() => {
        const P = window.__dockProbe, root = P.root(), cs = getComputedStyle(root), run = root.querySelector(".dock-run");
        const rcs = getComputedStyle(run);
        return {
            vw: innerWidth, rootW: +root.getBoundingClientRect().width.toFixed(2), pad: cs.paddingLeft, gap: rcs.columnGap,
            seats: P.seats().map((e) => +e.getBoundingClientRect().width.toFixed(2)),
            fontSize: getComputedStyle(P.seats()[0]).fontSize, seat: cs.getPropertyValue("--dock-control-size").trim(),
            layerH: cs.getPropertyValue("--dock-layer-height").trim(),
        };
    });
    const a = await read();
    await s.page.setViewportSize({ width: 1200, height: 900 }); await s.page.waitForTimeout(700);
    const b = await read();
    add({ arm: "fluid", engine: LABEL[engine], at1440: a, at1200: b, deltaRootW: +(b.rootW - a.rootW).toFixed(2) });
    await s.close();
}

// ── hit ──────────────────────────────────────────────────────────────────────
async function hit(browser, engine) {
    const s = await openScene(browser, target, "morph");
    await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 });
    const r = await s.page.evaluate(async () => {
        const P = window.__dockProbe, root = P.root(), plate = P.plate();
        const rr = root.getBoundingClientRect();
        const cross = rr.height, rad = cross / 2;
        const who = (x, y) => { const e = document.elementFromPoint(x, y); if (!e) return "null"; return e === plate ? "plate" : e.closest(".glass-dock") ? (e.closest("[data-dock-seat]") ? "seat" : "dock:" + e.className.split(" ")[0]) : e.tagName.toLowerCase() + (e.id ? "#" + e.id : ""); };
        const res = {};
        // (1) mid-morph plate narrower than the root: inset 120 px each side, radius cross/2
        plate.style.inset = "0px 120px 0px 120px"; plate.style.borderRadius = `${rad}px`;
        await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
        const pr = plate.getBoundingClientRect();
        res.narrow = {
            plate: [pr.left, pr.width].map((v) => +v.toFixed(1)),
            insideCentreEdge: who(pr.left + rad, pr.top + cross / 2),
            outsideArcCorner: who(pr.left + 2, pr.top + 2),            // in the plate's box, outside its arc
            insideArcNearCorner: who(pr.left + rad * 0.3, pr.top + cross / 2),
            rootBeyondPlate: who(rr.left + 40, rr.top + cross / 2),     // inside the root, left of the plate
        };
        // (2) a collapse: the plate wider than the root (root already at its new layout)
        plate.style.inset = "0px -80px 0px -80px";
        await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
        const pw = plate.getBoundingClientRect();
        res.wide = { plate: [pw.left, pw.width].map((v) => +v.toFixed(1)), outsideRootOnPlate: who(rr.left - 40, rr.top + cross / 2), outsideArc: who(pw.left + 2, pw.top + 2) };
        plate.style.removeProperty("inset"); plate.style.removeProperty("border-radius");
        // (3) a seat translated 60 px left of its slot: hit follows the seat's paint
        const seat = P.seats().find((e) => e.closest(".dock-run"));
        const sr = seat.getBoundingClientRect();
        seat.style.translate = "-60px 0px";
        await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
        res.seat = { atPaint: who(sr.left - 60 + sr.width / 2, sr.top + sr.height / 2) === "seat", atSlotRight: who(sr.right - 4, sr.top + sr.height / 2) };
        seat.style.removeProperty("translate");
        return res;
    });
    add({ arm: "hit", engine: LABEL[engine], ...r });
    await s.close();
}

// ── ro ───────────────────────────────────────────────────────────────────────
async function ro(browser, engine) {
    const html = `<div id="row" style="display:flex;gap:8px;width:600px;padding:8px;background:#eee">${Array.from({ length: 6 }, (_, i) => `<div class="seat" style="width:48px;height:48px;background:#99c" id="s${i}"></div>`).join("")}</div>`;
    const s = await blankPage(browser, html);
    const r = await s.page.evaluate(async () => {
        const row = document.getElementById("row");
        const errs = []; window.addEventListener("error", (e) => errs.push(String(e.message)));
        const log = [];
        let frame = 0; const tick = () => { frame++; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
        const pos = new Map(); const rel = (el) => el.getBoundingClientRect().left - row.getBoundingClientRect().left;
        for (const el of row.children) pos.set(el, rel(el));
        const ro = new ResizeObserver((entries) => {
            const names = entries.map((e) => e.target.id || e.target.className);
            // B′'s check: read layout once, write each moved seat's inverse translate
            let moved = 0;
            for (const el of row.children) { const now = rel(el); const was = pos.get(el); if (was !== undefined && Math.abs(now - was) > 0.01) { el.style.translate = `${was - now}px 0px`; moved++; } pos.set(el, now); }
            log.push({ ev: "ro", frame, t: performance.now(), names, moved });
        });
        ro.observe(row);
        for (const el of row.children) ro.observe(el);
        await new Promise((f) => setTimeout(f, 300)); log.length = 0;
        const mo = new MutationObserver((recs) => {
            for (const rec of recs) {
                for (const n of rec.addedNodes) if (n.nodeType === 1) { ro.observe(n); log.push({ ev: "mo-add", frame, t: performance.now() }); }
                if (rec.removedNodes.length) { ro.observe(row); log.push({ ev: "mo-remove→reobserve", frame, t: performance.now() }); }
            }
            const f0 = frame;
            requestAnimationFrame(() => { log.push({ ev: "raf1", frame, t: performance.now() }); requestAnimationFrame(() => log.push({ ev: "raf2", frame, t: performance.now() })); });
        });
        mo.observe(row, { childList: true });
        // (a) insert at the start of a stretched run: nothing but the new seat changes size
        const n = document.createElement("div"); n.className = "seat"; n.id = "new"; n.style.cssText = "width:48px;height:48px;background:#c99";
        setTimeout(() => row.prepend(n), 0);
        await new Promise((f) => setTimeout(f, 250));
        const a = log.splice(0);
        const s1Translate = document.getElementById("s1").style.translate;
        for (const el of row.children) el.style.removeProperty("translate");
        await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
        for (const el of row.children) pos.set(el, rel(el)); log.length = 0;
        // (b) remove the first seat (equal size): only the re-observe can deliver
        setTimeout(() => n.remove(), 0);
        await new Promise((f) => setTimeout(f, 250));
        const b = log.splice(0);
        // (c) plain re-observe of an unchanged box, no mutation
        mo.disconnect();
        const f0 = frame; ro.observe(row);
        await new Promise((f) => setTimeout(f, 200));
        const c = log.splice(0);
        return { a, s1Translate, b, c: { reobserveDelivered: c.filter((x) => x.ev === "ro").length, names: c.map((x) => x.names) }, errs };
    });
    const order = (L) => L.map((x) => `${x.ev}@f${x.frame}${x.names ? "[" + x.names.join(",") + "]" : ""}${x.moved !== undefined ? " moved " + x.moved : ""}`).join(" → ");
    const sameFrame = (L) => { const r1 = L.find((x) => x.ev === "raf1"), r2 = L.find((x) => x.ev === "raf2"), rr = L.find((x) => x.ev === "ro"); return !!(r1 && rr && (!r2 || rr.t < r2.t) && rr.t >= r1.t); };
    add({ arm: "ro", engine: LABEL[engine], insert: { order: order(r.a), roBeforeNextFrame: sameFrame(r.a), s1Translate: r.s1Translate }, remove: { order: order(r.b), roBeforeNextFrame: sameFrame(r.b) }, plainReobserve: r.c, loopErrors: r.errs });
    await s.close();
}

// ── trun ─────────────────────────────────────────────────────────────────────
async function trun(browser, engine) {
    const html = `<div id="dock" style="display:inline-flex;gap:8px;padding:8px;background:#eee"><div style="width:48px;height:40px;background:#99c"></div><div id="grow" style="width:80px;height:40px;background:#9c9;transition:width .3s ease"></div><div style="width:48px;height:40px;background:#99c"></div></div>`;
    for (const handOff of [false, true]) {
        const s = await blankPage(browser, html);
        const r = await s.page.evaluate(async (handOff) => {
            const dock = document.getElementById("dock"), grow = document.getElementById("grow");
            const widths = []; const ev = []; const roLog = [];
            const SIZE = /^(width|height|inline-size|block-size|min-width|max-width|min-inline-size|max-inline-size|padding.*|margin.*)$/;
            dock.addEventListener("transitionrun", (e) => {
                ev.push({ ev: "transitionrun", prop: e.propertyName, w: grow.getBoundingClientRect().width, t: performance.now() });
                if (handOff && SIZE.test(e.propertyName)) for (const a of e.target.getAnimations()) if (a.transitionProperty === e.propertyName) a.finish();
            }, true);
            new ResizeObserver((es) => { for (const e of es) roLog.push(+e.borderBoxSize[0].inlineSize.toFixed(2)); }).observe(dock);
            let stop = false; const tick = () => { widths.push(+grow.getBoundingClientRect().width.toFixed(2)); if (!stop) requestAnimationFrame(tick); };
            await new Promise((f) => setTimeout(f, 200)); roLog.length = 0;
            requestAnimationFrame(tick);
            setTimeout(() => { grow.style.width = "160px"; }, 50);
            await new Promise((f) => setTimeout(f, 600)); stop = true;
            return { widths, ev, roLog };
        }, handOff);
        const distinct = [...new Set(r.widths)];
        add({ arm: "trun", engine: LABEL[engine], handOff, distinctWidths: distinct.length, intermediate: distinct.filter((w) => w > 80.01 && w < 159.99).length, firstFrames: r.widths.slice(0, 8), transitionrun: r.ev, roDockWidths: r.roLog.slice(0, 6) });
        await s.close();
    }
}

// ── scroller ─────────────────────────────────────────────────────────────────
async function scroller(browser, engine) {
    const html = `<div id="sc" style="display:flex;gap:8px;width:300px;overflow-x:auto;padding:4px;background:#eee">${Array.from({ length: 10 }, (_, i) => `<div style="flex:0 0 48px;height:40px;background:#99c" id="k${i}"></div>`).join("")}</div>`;
    const s = await blankPage(browser, html);
    const r = await s.page.evaluate(async () => {
        const sc = document.getElementById("sc"), last = document.getElementById("k9"), first = document.getElementById("k0");
        const f = () => new Promise((g) => requestAnimationFrame(() => requestAnimationFrame(g)));
        const base = sc.scrollWidth;
        last.style.translate = "100px 0px"; await f(); const endOut = sc.scrollWidth;
        last.style.removeProperty("translate");
        first.style.translate = "-100px 0px"; await f(); const startOut = sc.scrollWidth;
        first.style.removeProperty("translate");
        sc.scrollLeft = 9999; await f(); const endLeft = sc.scrollLeft;
        last.style.translate = "100px 0px"; await f(); const leftWhileOut = sc.scrollLeft; const maxWhileOut = sc.scrollWidth - sc.clientWidth;
        sc.scrollLeft = 9999; await f(); const pushed = sc.scrollLeft;
        last.style.removeProperty("translate"); await f(); const afterRemove = sc.scrollLeft;
        return { base, endOut, startOut, endLeft, leftWhileOut, maxWhileOut, pushed, afterRemove };
    });
    add({ arm: "scroller", engine: LABEL[engine], ...r });
    await s.close();
}

// ── in-page B′ body emulation (analytic spring, one rAF, dt clamped) ─────────
const BODY_SRC = `window.__bpBody = (function () {
  const RESP = 0.30, Z = 0.88, W0 = 2 * Math.PI / RESP, WD = W0 * Math.sqrt(1 - Z * Z), MAX_DT = window.__bpMaxDt ?? 64;
  return function run(onFrame, { from = 0, to = 1, eps = 0.5, travelPx = 1, onDone } = {}) {
    let x0 = from - to, v0 = 0, t = 0, last = performance.now(), done = false;
    const pos = (tt) => { const e = Math.exp(-Z * W0 * tt), A = x0, B = (v0 + Z * W0 * x0) / WD; return to + e * (A * Math.cos(WD * tt) + B * Math.sin(WD * tt)); };
    const step = (ts) => {
      // the clock: performance.now(), not the rAF timestamp (Chromium hands a pre-stall
      // timestamp to the first callback after a block; rafts arm)
      const now = window.__bpClock === "raf" ? ts : performance.now();
      const dt = Math.min(MAX_DT, Math.max(0, now - last)); last = now; t += dt / 1000;
      const s = pos(t);
      if (Math.abs(s - to) * travelPx <= eps) { onFrame(to); done = true; onDone?.(); return; }
      onFrame(s); requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => done;
  };
})();`;

// ── block ────────────────────────────────────────────────────────────────────
async function block(browser, engine) {
    for (const carrier of (args.carriers ?? "floor,bprime@64:raf,bprime@33.3:raf,bprime@33.3:now,bprime@16.7:now").split(",")) {
        const s = await openScene(browser, target, "morph");
        const [maxDt, clock] = carrier.startsWith("bprime") ? [+carrier.split("@")[1].split(":")[0], carrier.split(":")[1]] : [64, "raf"];
        await s.page.evaluate(([m, c]) => { window.__bpMaxDt = m; window.__bpClock = c; }, [maxDt, clock]);
        await s.page.addScriptTag({ content: BODY_SRC });
        const r = await s.page.evaluate(async (carrier) => {
            const P = window.__dockProbe, root = P.root(), plate = P.plate();
            const log = []; const t0 = performance.now(); let stop = false;
            const W = () => { const e = P.extent(); return e.r - e.l; };
            const tick = () => { log.push([+(performance.now() - t0).toFixed(1), +W().toFixed(2)]); if (!stop) requestAnimationFrame(tick); };
            const busy = () => setTimeout(() => { const e = performance.now() + 1200; while (performance.now() < e) { /* block */ } }, 60);
            if (carrier === "floor") {
                requestAnimationFrame(tick); window.__scene.expand(); busy();
                await new Promise((f) => setTimeout(f, 2400));
            } else {
                // B′: the root is already at the expanded layout; the plate lerps painted → layout by insets
                window.__scene.expand(); await new Promise((f) => setTimeout(f, 1500));
                const rr = root.getBoundingClientRect(); const full = rr.width, col = 102, d = (full - col) / 2;
                plate.style.inset = `0px ${d}px 0px ${d}px`;
                await new Promise((f) => requestAnimationFrame(() => requestAnimationFrame(f)));
                log.length = 0; requestAnimationFrame(tick);
                window.__bpBody((s) => { const k = d * (1 - s); plate.style.inset = `0px ${k}px 0px ${k}px`; }, { travelPx: full - col });
                busy();
                await new Promise((f) => setTimeout(f, 2400));
                plate.style.removeProperty("inset");
            }
            stop = true; return log;
        }, carrier);
        let gap = 0, gapAt = 0; for (let i = 1; i < r.length; i++) { const g = r[i][0] - r[i - 1][0]; if (g > gap) { gap = g; gapAt = i; } }
        const before = r[gapAt - 1], after = r[gapAt], next = r[gapAt + 1];
        const Wend = r[r.length - 1][1], Wstart = r[0][1], D = Math.abs(Wend - Wstart);
        let settleIdx = r.findIndex((f, i) => i >= gapAt && Math.abs(f[1] - Wend) <= 0.5);
        add({ arm: "block", engine: LABEL[engine], carrier, D: +D.toFixed(2), frameGapMs: +gap.toFixed(1), widthBeforeGap: before?.[1], widthAfterGap: after?.[1], stepAcrossGapPx: +(Math.abs((after?.[1] ?? 0) - (before?.[1] ?? 0))).toFixed(2), stepAcrossGapFracD: D ? +(Math.abs((after?.[1] ?? 0) - (before?.[1] ?? 0)) / D).toFixed(3) : null, nextStepPx: next ? +Math.abs(next[1] - after[1]).toFixed(2) : null, landedAtMs: settleIdx >= 0 ? r[settleIdx][0] : null, frames: r.length, around: r.slice(Math.max(0, gapAt - 3), gapAt + 6) });
        await s.close();
    }
}

// ── rafts: the rAF timestamp against performance.now() after a 1.2 s block ────
// (why the block arm's body leaps in Playwright WebKit: which clock a clamped dt reads)
async function rafts(browser, engine) {
    const s = await blankPage(browser, `<div id="x" style="width:10px;height:10px;background:#000"></div>`);
    const r = await s.page.evaluate(async () => {
        const log = []; let stop = false; const t0 = performance.now();
        const tick = (ts) => { log.push([+(ts - t0).toFixed(1), +(performance.now() - t0).toFixed(1)]); if (!stop) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        await new Promise((f) => setTimeout(f, 200));
        const e = performance.now() + 1200; while (performance.now() < e) { /* block */ }
        await new Promise((f) => setTimeout(f, 300)); stop = true;
        let gi = 0, g = 0; for (let i = 1; i < log.length; i++) { const d = log[i][1] - log[i - 1][1]; if (d > g) { g = d; gi = i; } }
        return log.slice(Math.max(0, gi - 2), gi + 8);
    });
    add({ arm: "rafts", engine: LABEL[engine], note: "[rAF timestamp, performance.now()] ms from t0, around the block", frames: r });
    await s.close();
}

// ── resize: the window `resize` event reaches script before the RO delivery of the
// box it resized, in the same frame (so a resize-caused extent change can be seated, not morphed)
async function resize(browser, engine) {
    const s = await blankPage(browser, `<div id="b" style="width:40vw;height:40px;background:#99c"></div>`);
    await s.page.evaluate(() => {
        window.__rz = []; let frame = 0; const tick = () => { frame++; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
        addEventListener("resize", () => window.__rz.push(["resize", frame, performance.now()]));
        new ResizeObserver((es) => window.__rz.push(["ro", frame, performance.now(), +es[0].borderBoxSize[0].inlineSize.toFixed(1)])).observe(document.getElementById("b"));
    });
    await s.page.waitForTimeout(200);
    await s.page.evaluate(() => { window.__rz.length = 0; });
    await s.page.setViewportSize({ width: 800, height: 600 });
    await s.page.waitForTimeout(300);
    const log = await s.page.evaluate(() => window.__rz);
    const rz = log.find((x) => x[0] === "resize"), ro = log.find((x) => x[0] === "ro");
    add({ arm: "resize", engine: LABEL[engine], order: log.map((x) => `${x[0]}@f${x[1]}${x[3] ? "(" + x[3] + ")" : ""}`).join(" → "), resizeBeforeRoSameUpdate: !!(rz && ro && ro[1] === rz[1] + 1 && rz[2] <= ro[2]), note: "the frame counter ticks in rAF; HTML's update-the-rendering runs the resize steps, then rAF, then ResizeObserver, so resize@fN → ro@fN+1 is one update" });
    await s.close();
}

// ── cost ─────────────────────────────────────────────────────────────────────
async function cost(browser, engine, { throttle = 1 } = {}) {
    const s = await openScene(browser, target, "morph");
    await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 });
    let cdp = null;
    if (engine === "chromium" && throttle > 1) { cdp = await s.context.newCDPSession(s.page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle }); }
    for (const mode of ["idle", "floor", "bp0", "bp10", "bp20", "bp40"]) {
        const N = mode.startsWith("bp") ? +mode.slice(2) : 0;
        // seats: clone run seats until N exist (a real DockControl's DOM and CSS)
        const seatCount = await s.page.evaluate((N) => {
            const P = window.__dockProbe, root = P.root(), run = root.querySelector(".dock-run");
            run.querySelectorAll("[data-bp-clone]").forEach((e) => e.remove());
            const src = [...run.querySelectorAll("[data-dock-seat]")];
            let k = 0; while (N && run.querySelectorAll("[data-dock-seat]").length < N) { const c = src[k++ % src.length].cloneNode(true); c.setAttribute("data-bp-clone", ""); run.appendChild(c); }
            return run.querySelectorAll("[data-dock-seat]").length;
        }, N);
        await waitRest(s.page, { quiet: 300 });
        if (mode === "floor") { await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 400 }); }
        if (mode === "bp0") { await s.page.evaluate(() => window.__scene.expand()); await waitRest(s.page, { quiet: 400 }); }
        const traceOn = engine === "chromium";
        if (traceOn) await browser.startTracing(s.page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
        const r = await s.page.evaluate(async ({ mode, N }) => {
            const P = window.__dockProbe, root = P.root(), plate = P.plate();
            const seats = [...root.querySelectorAll(".dock-run [data-dock-seat]")].slice(0, N);
            const face = root.querySelector(".dock-layer--summary");
            const rr = root.getBoundingClientRect(); const rad = rr.height / 2;
            const frames = []; let last = 0; let t0 = performance.now(); let stop = false;
            const tick = (now) => {
                const dt = last ? now - last : 0; last = now;
                const k = Math.min(1, (performance.now() - t0) / 600), s = 0.5 - 0.5 * Math.cos(k * 2 * Math.PI); // 0 → 1 → 0
                let w = 0, l = 0;
                if (mode.startsWith("bp")) {
                    const a = performance.now();
                    const ins = 140 * s;
                    plate.style.inset = `0px ${ins}px 0px ${ins}px`; plate.style.borderRadius = `${rad}px`;
                    for (let i = 0; i < seats.length; i++) seats[i].style.translate = `${(i % 2 ? -1 : 1) * 60 * s}px 0px`;
                    face.style.opacity = String(1 - s);
                    const b = performance.now(); plate.getBoundingClientRect(); if (seats[0]) seats[0].getBoundingClientRect(); const c = performance.now();
                    w = b - a; l = c - b;
                } else {
                    const b = performance.now(); plate.getBoundingClientRect(); const c = performance.now(); l = c - b;
                }
                if (dt) frames.push([dt, w, l]);
                if (performance.now() - t0 < 620 && !stop) requestAnimationFrame(tick);
            };
            if (mode === "floor") { t0 = performance.now(); requestAnimationFrame(tick); window.__scene.expand(); } // collapsed before the trace began
            else requestAnimationFrame(tick);
            await new Promise((f) => setTimeout(f, 800)); stop = true;
            plate.style.removeProperty("inset"); plate.style.removeProperty("border-radius"); face.style.removeProperty("opacity");
            for (const e of seats) e.style.removeProperty("translate");
            return frames;
        }, { mode, N });
        let trace = null;
        if (traceOn) {
            const buf = await browser.stopTracing();
            const ev = JSON.parse(buf.toString()).traceEvents;
            const names = {}; for (const e of ev) if (e.ph === "M" && e.name === "thread_name") names[e.pid + ":" + e.tid] = e.args.name;
            const main = new Set(Object.entries(names).filter(([, n]) => n === "CrRendererMain").map(([k]) => k));
            const sum = {}; let frames = 0;
            for (const e of ev) {
                const k = e.pid + ":" + e.tid; if (!main.has(k)) continue;
                if (e.name === "FireAnimationFrame") frames++;
                if (e.ph === "X" && ["UpdateLayoutTree", "Layout", "PrePaint", "Paint", "Layerize", "Commit", "FireAnimationFrame", "RunTask", "ThreadControllerImpl::RunTask"].includes(e.name)) sum[e.name] = (sum[e.name] || 0) + e.dur / 1000;
            }
            const task = sum["ThreadControllerImpl::RunTask"] ?? sum["RunTask"] ?? 0;
            trace = { rafFrames: frames, perFrameMs: Object.fromEntries(Object.entries(sum).map(([k, v]) => [k, +(v / Math.max(1, frames)).toFixed(3)])), mainTaskMsPerFrame: +(task / Math.max(1, frames)).toFixed(3) };
        }
        const q = (arr, p) => { const a = [...arr].sort((x, y) => x - y); return a.length ? +a[Math.min(a.length - 1, Math.floor(p * a.length))].toFixed(3) : null; };
        add({ arm: "cost", engine: LABEL[engine], throttle, mode, seats: N, seatsInRun: seatCount, frames: r.length, dtP50: q(r.map((f) => f[0]), 0.5), dtP95: q(r.map((f) => f[0]), 0.95), over16_7: r.filter((f) => f[0] > 16.7 * 1.5).length, writeMsP50: q(r.map((f) => f[1]), 0.5), writeMsP95: q(r.map((f) => f[1]), 0.95), styleLayoutMsP50: q(r.map((f) => f[2]), 0.5), styleLayoutMsP95: q(r.map((f) => f[2]), 0.95), trace });
    }
    await s.page.evaluate(() => document.querySelectorAll("[data-bp-clone]").forEach((e) => e.remove()));
    if (cdp) await cdp.detach();
    await s.close();
}

for (const engine of engs) {
    const browser = await launch(engine);
    for (const arm of arms) {
        try {
            if (arm === "fluid") await fluid(browser, engine);
            else if (arm === "hit") await hit(browser, engine);
            else if (arm === "ro") await ro(browser, engine);
            else if (arm === "trun") await trun(browser, engine);
            else if (arm === "scroller") await scroller(browser, engine);
            else if (arm === "block") await block(browser, engine);
            else if (arm === "rafts") await rafts(browser, engine);
            else if (arm === "resize") await resize(browser, engine);
            else if (arm === "cost") { await cost(browser, engine); if (engine === "chromium") await cost(browser, engine, { throttle: 4 }); }
        } catch (e) { add({ arm, engine: LABEL[engine], error: String(e).slice(0, 400) }); }
    }
    await browser.close();
}
out.finished = new Date().toISOString();
if (args.out) { fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true }); fs.writeFileSync(path.resolve(args.out), JSON.stringify(out, null, 1)); }
await target?.close?.();
process.exit(0);
