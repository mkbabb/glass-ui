// revtrace.mjs (D2 pass 13, BUILDER of D2-B′, REGISTRY §P12c-7.3 item 1): the reversal stub and its sibling, read edge by edge.
// Drives W3's own sequences verbatim (harness/w3-morph.mjs: MORPH_SEQ with step(), then reversal() at 35 %; the swap scene's
// `swap-long`; `retarget·N` on swap&three=1, scheduled in the page) under W3's own strip log (startLog STRIP, so every frame
// carries the witness's own glyph-stub read, lib.mjs stubRow unchanged), and beside it, in a rAF registered after the log's,
// an EDGE recorder: on every frame of the cell, for every glyph under the root that paints, every edge that lies across its ink
// on the main axis, each with its source:
//   own   the glyph element's own clip-path inset edge          anc   an ancestor's clip (overflow or clip-path), by label
//   mask  a mask layer's 10→90 % transition (its width)          plate the plate's own painted edge (the probe's extent)
// and per frame the extent, the body frame count (window.__dockFrames, lanetrace builds) to join the scene's own write record
// (window.__laneTrace, lanetrace.py --units + edgetrace.py), and each unit's clip/mask as the scene last wrote them.
//   node revtrace.mjs --build <dir> --adapter <a> --engine chromium|webkit [--theme dark] --cell reversal|swap-long|retarget·N
//        --runs N --json <f>
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness";
const { parseArgs, openTarget, launch, openScene, startLog, stopLog, mark, waitRest, dockCenter, extentNow, stubRow, loadAvg, r2 } = await import(H + "/lib.mjs");
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine; const theme = args.theme === "dark" ? "dark" : null;
const runs = +(args.runs || 1); const cell = args.cell || "reversal";
const STRIP = { seats: true, owners: true, ink: true, lanes: true, glyphs: true };
const MORPH_SEQ = [
    ["first-expand", (p, c) => p.mouse.move(c.x, c.y, { steps: 3 })],
    ["warm-collapse", (p) => p.mouse.move(4, 4)],
    ["warm-expand", async (p) => { const c = await dockCenter(p); await p.mouse.move(c.x, c.y, { steps: 3 }); }],
    ["content-add", (p) => p.evaluate(() => window.__scene.setExtra(true))],
    ["content-remove", (p) => p.evaluate(() => window.__scene.setExtra(false))],
    ["lead-add", (p) => p.evaluate(() => window.__scene.setLead(true))],
    ["lead-remove", (p) => p.evaluate(() => window.__scene.setLead(false))],
];
async function waitChange(page, cap = 7000) {
    const b = await extentNow(page); const t0 = Date.now();
    while (Date.now() - t0 < cap) { const e = await extentNow(page); const m = await page.evaluate(() => window.__dockProbe.morphing()); if (m || Math.abs(e.w - b.w) > 0.25 || Math.abs(e.h - b.h) > 0.25) return; await page.waitForTimeout(16); }
}
async function step(page, name, trigger) { await mark(page, name); await trigger(); await waitChange(page); await waitRest(page, { quiet: 500, cap: 7000 }); await page.waitForTimeout(200); }
const lenOf = (e, ax) => ax === "y" ? e.h : e.w;

// the in-page edge recorder (reads only: getBoundingClientRect, getComputedStyle, Range rects, canvas measure)
const EDGE_SRC = () => {
    const P = window.__dockProbe, hp = window.__hp, root = P.root(), ax = P.axis();
    const cv = document.createElement("canvas").getContext("2d"); const gc = new Map();
    const E = window.__edgeLog = { frames: [], stop: false, on: false };
    const M0 = ax === "y" ? "top" : "left", M1 = ax === "y" ? "bottom" : "right";
    const rng = document.createRange();
    const tick = (ts) => {
        if (E.stop) return;
        requestAnimationFrame(tick);
        if (!E.on) return;
        const e = P.extent(); const pm0 = ax === "y" ? e.t : e.l, pm1 = ax === "y" ? e.b : e.r;
        const f = { ts, n: window.__dockFrames ?? null, mk: window.__hpLog?.mark ?? null, pm: [+pm0.toFixed(2), +pm1.toFixed(2)], g: [], u: [] };
        // every element under the root with a clip-path or a mask the scene or CSS wrote
        for (const el of root.querySelectorAll("*")) {
            const st = el.style; if (!st || (!st.clipPath && !st.maskImage)) continue;
            const r = el.getBoundingClientRect();
            f.u.push([hp.label(el), (el.textContent || "").trim().slice(0, 12), +r[M0].toFixed(2), +r[M1].toFixed(2), st.clipPath || null, st.maskImage ? st.maskImage.slice(0, 400) : null, +parseFloat(getComputedStyle(el).opacity).toFixed(3)]);
        }
        const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const ancClips = new Map();
        for (let t = tw.nextNode(); t; t = tw.nextNode()) {
            const el = t.parentElement; const s = t.textContent;
            if (!el || !s.trim() || el.closest("svg")) continue;
            const op = hp.visibleOpacity(el); if (op <= 0.05) continue;
            const cs = getComputedStyle(el); const font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
            const q = el.getBoundingClientRect(); const L = ax === "y" ? el.offsetHeight : el.offsetWidth; const k = L ? (ax === "y" ? q.height : q.width) / L : 1;
            // the edge sources of this element: its own inset, each ancestor clip, each mask layer on it or an ancestor
            const srcs = [];
            const own = hp.insetOf(el, el.offsetWidth, el.offsetHeight);
            if (own) { const sc = L ? k : 1; srcs.push(["own " + hp.label(el), ax === "y" ? q.top + own[0] * sc : q.left + own[3] * sc, ax === "y" ? q.bottom - own[2] * sc : q.right - own[1] * sc]); }
            for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
                if (!ancClips.has(a)) ancClips.set(a, hp.clipRectOf(a));
                const c = ancClips.get(a); const c0 = ax === "y" ? c.t : c.l, c1 = ax === "y" ? c.b : c.r;
                if (Number.isFinite(c0) || Number.isFinite(c1)) srcs.push(["anc " + hp.label(a), c0, c1]);
            }
            const masks = [];
            for (let a = el; a && a !== document.documentElement; a = a.parentElement) { const m = hp.maskOf(a, ax); if (m) masks.push([hp.label(a), m]); }
            for (let i = 0; i < s.length; i++) {
                const ch = s[i]; if (!/\S/.test(ch)) continue;
                rng.setStart(t, i); rng.setEnd(t, i + 1);
                const rr = rng.getBoundingClientRect(); if (rr.width * rr.height <= 0) continue;
                const key = font + "|" + ch; let m = gc.get(key);
                if (!m) { cv.font = font; const x = cv.measureText(ch); m = { l: x.actualBoundingBoxLeft || 0, r: x.actualBoundingBoxRight || x.width, a: x.actualBoundingBoxAscent || 0, d: x.actualBoundingBoxDescent || 0, fa: x.fontBoundingBoxAscent || 0 }; gc.set(key, m); }
                const g0 = ax === "y" ? rr.top + (m.fa - m.a) * k : rr.left - m.l * k, g1 = ax === "y" ? rr.top + (m.fa + m.d) * k : rr.left + m.r * k;
                if (g1 - g0 < 0.5) continue;
                const edges = [];
                // a clip edge's ink just inside it (the product of every mask there, 0.3 px in): near 1 is a hard edge
                const inside = (x) => { let a = 1; for (const [, mm] of masks) { if (mm.unread) return null; a *= mm.at(x); } return +a.toFixed(3); };
                for (const [lab, c0, c1] of srcs) { if (c0 > g0 && c0 < g1) edges.push([lab + " start", +c0.toFixed(2), inside(c0 + 0.3)]); if (c1 > g0 && c1 < g1) edges.push([lab + " end", +c1.toFixed(2), inside(c1 - 0.3)]); }
                for (const [lab, mm] of masks) {
                    if (mm.unread) { edges.push(["mask " + lab + " UNREAD " + mm.unread, null]); continue; }
                    // the 10→90 % transitions of this mask across the glyph, sampled at 0.25 px
                    const N = Math.max(8, Math.ceil((g1 - g0) / 0.25)), dx = (g1 - g0) / N; let prev = mm.at(g0), lo = null;
                    for (let j = 1; j <= N; j++) { const x = g0 + j * dx, a = mm.at(x); if ((prev - 0.5) * (a - 0.5) < 0) edges.push(["mask " + lab + (a > prev ? " rise" : " fall"), +x.toFixed(2)]); prev = a; }
                }
                if (!edges.length) continue;
                // the glyph's painted share (alpha across it, as stubRow's judge: clip × masks), and the hard transitions
                const c = hp.paintedRect(el), c0 = ax === "y" ? c.t : c.l, c1 = ax === "y" ? c.b : c.r;
                const N = Math.max(8, Math.ceil((g1 - g0) / 0.25)), dx = (g1 - g0) / N; const as = []; let sum = 0, unread = false;
                for (let j = 0; j <= N; j++) { const x = g0 + j * dx; let a = x < c0 || x > c1 ? 0 : 1; for (const [, mm] of masks) { if (mm.unread) { unread = true; break; } a *= mm.at(x); } as.push(a); if (j < N) sum += a; }
                f.g.push([hp.label(el), (el.textContent || "").trim().slice(0, 12), ch, +g0.toFixed(2), +g1.toFixed(2), unread ? null : +(sum / N).toFixed(3), +op.toFixed(3), edges, [+c0.toFixed(2), +c1.toFixed(2)]]);
            }
        }
        E.frames.push(f);
    };
    requestAnimationFrame(tick);
};

const browser = await launch(engine);
const res = { engine, theme: theme || "light", build: target.label, cell, runs: [] };
try {
    for (let k = 1; k <= runs; k++) {
        const L0 = loadAvg();
        const isSwap = cell !== "reversal";
        const s = await openScene(browser, target, isSwap ? "swap" : "morph", { ...(cell.startsWith("retarget") || cell.startsWith("swrev") ? { query: { three: "1" } } : {}), ...(theme ? { theme } : {}) });
        try {
            await s.page.evaluate(() => { window.__laneTrace = []; });
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            const Lcol = lenOf(await extentNow(s.page), ax);
            await startLog(s.page, STRIP);
            await s.page.evaluate(EDGE_SRC);
            await s.page.waitForTimeout(150);
            let note = null, tRet = null;
            if (cell === "reversal") {
                const c = await dockCenter(s.page);
                for (const [name, trig] of MORPH_SEQ) await step(s.page, name, () => trig(s.page, c));
                await s.page.evaluate(() => { window.__edgeLog.on = true; });
                await mark(s.page, "reversal");
                note = await s.page.evaluate(({ frac, Lcol }) => new Promise((res) => {
                    const P = window.__dockProbe, ax = P.axis();
                    const len = () => { const e = P.extent(); return ax === "y" ? e.b - e.t : e.r - e.l; };
                    const L0 = len(); window.__scene.collapse();
                    const t0 = performance.now();
                    const tick = () => { const d = L0 - len(); if (d >= frac * (L0 - Lcol)) { window.__hpLog.mark = "reversal-back"; window.__hpRetarget = performance.now(); window.__scene.expand(); res({ ok: true, L0, at: len() }); } else if (performance.now() - t0 > 3000) res({ ok: false, L0, at: len() }); else requestAnimationFrame(tick); };
                    requestAnimationFrame(tick);
                }), { frac: 0.35, Lcol });
                await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(200);
            } else if (cell === "swap-long") {
                await s.page.evaluate(() => { window.__edgeLog.on = true; });
                await mark(s.page, "swap-long");
                await s.page.evaluate(() => window.__scene.setFace("long"));
                await waitChange(s.page); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(200);
            } else if (cell.startsWith("swrev")) {
                // swrev.mjs's sequence (pass-11 critic): setFace("long"), AT ms later setFace("short") (the reversal), THEN ms
                // after that setFace("mid") (the retarget onto the reversed swap); cell = swrev:AT:THEN
                const [, at, then] = cell.split(":").map(Number);
                await s.page.evaluate(() => { window.__edgeLog.on = true; });
                await mark(s.page, "r");
                await s.page.evaluate(([ms, tw]) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("short"); if (tw) setTimeout(() => { window.__hpRetarget2 = performance.now(); window.__scene.setFace("mid"); }, tw); }, ms); }, [at, then]);
                await s.page.waitForTimeout(at + 60 + then);
                await waitRest(s.page, { quiet: 500, cap: 7000 });
            } else {
                const after = +cell.split("·")[1];
                await s.page.evaluate(() => { window.__edgeLog.on = true; });
                await mark(s.page, "r");
                await s.page.evaluate((ms) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("mid"); }, ms); }, after);
                await s.page.waitForTimeout(after + 60);
                await waitRest(s.page, { quiet: 500, cap: 7000 });
            }
            tRet = await s.page.evaluate(() => window.__hpRetarget ?? null);
            const tRet2 = await s.page.evaluate(() => window.__hpRetarget2 ?? null);
            const rootBox = await s.page.evaluate(() => { const r = window.__dockProbe.root().getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; });
            const frames = await stopLog(s.page);
            const edge = await s.page.evaluate(() => { window.__edgeLog.stop = true; return window.__edgeLog.frames; });
            const trace = await s.page.evaluate(() => window.__laneTrace ?? []);
            const seg = cell === "reversal" ? (m) => m === "reversal" || m === "reversal-back" : cell === "swap-long" ? (m) => m === "swap-long" : (m) => m === "r";
            const i0 = frames.findIndex((f) => seg(f.mk));
            const fr = i0 > 0 ? [frames[i0 - 1], ...frames.filter((f) => seg(f.mk))] : frames.filter((f) => seg(f.mk));
            const st = stubRow(fr, ax);
            const T0 = fr[0]?.t ?? 0;
            const stubFrames = fr.filter((f) => f.st?.length).map((f) => ({ t: r2(f.t - T0), ts: f.t, st: f.st, e: f.e }));
            // every frame from the retarget (or the trigger) to +150 ms: the glyph-crossing edges, the scene's write records
            const tA = tRet ?? fr[1]?.t ?? T0;
            const span = cell.startsWith("swrev") ? 230 : 150;
            const win = edge.filter((x) => x.ts >= tA - 20 && x.ts <= tA + span);
            const writes = trace.filter((x) => x.k === "w" && x.ts >= tA - 40 && x.ts <= tA + span + 10);
            res.runs.push({ run: k, load: L0, loadEnd: loadAvg(), T0, tRet, tRet2, rootBox, note, seats: fr.map((f) => ({ t: r2(f.t - T0), ts: f.t, e: f.e, s: (f.s ?? []).filter((q) => q[9] > 0.05).map((q) => [q[0], q[1], q[3], q[5], q[7], q[9]]) })), splice: (await import(H + "/lib.mjs")).spliceRow(fr, ax), stub: st, stubFrames, edges: win, writes, checks: trace.filter((x) => x.k !== "w" && x.ts >= tA - 40 && x.ts <= tA + 400) });
            const spl = res.runs.at(-1).splice; console.log(`${engine} ${theme || "light"} ${cell} r${k} load ${L0}: splice ${spl.spliceFrames}${spl.firstSplice ? " " + spl.firstSplice.units.join("|") + " gap " + spl.firstSplice.gapPx + " at " + spl.firstSplice.atMs : ""}; stub ${st?.stubFrames ?? "?"}${st?.first ? ` "${st.first.ch}" ${st.first.frac} at ${st.first.edgePx} px +${st.first.atMs} ms (w ${st.first.edgeWidthPx})` : ""}; retarget ${tRet == null ? "-" : r2(tRet - T0)} ms; edge frames ${win.length}, writes ${writes.length}`);
        } finally { await s.close(); }
    }
} finally { await browser.close(); await target.close(); }
fs.writeFileSync(args.json, JSON.stringify(res));
