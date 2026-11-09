// swpaint.mjs (D2 pass 14, RE-MEASURE seat of D2-B′, REGISTRY §P13-7.3 item 3, "`swrev` in paint"). A reading, enters no row.
// The pass-11 critic's swrev.mjs sequence with F2's arguments (setFace("long"), AT ms later setFace("short"), THEN ms after that
// setFace("mid"); --at 40 --then 0,16,32,64 --runs 2), one browser per run and a fresh context per cell, under W3's own strip
// log (startLog STRIP; lib.mjs spliceRow and stubRow unchanged) with the pass-13 builder's in-page EDGE recorder (revtrace.mjs,
// copied verbatim below: per frame, every painting glyph under the root, its painted share as stubRow's judge reads it, and the
// edges across it). At EVERY splice frame (spliceRow's own test, frame by frame) it records the two facing edges and every
// glyph whose ink lies between them or across either, with its painted share: BU §2 read that share 0 ("no ink cut"). One
// change to the copied recorder: every painting glyph is kept, not only those with an edge across them.
//   node swpaint.mjs --build <dir> --adapter <a> --engine chromium|webkit [--theme dark] [--at 40] [--then 0,16,32,64] [--runs 2] --json <f>
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness";
const { parseArgs, openTarget, launch, openScene, startLog, stopLog, mark, waitRest, extentNow, stubRow, spliceRow, loadAvg, r2 } = await import(H + "/lib.mjs");
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine; const theme = args.theme === "dark" ? "dark" : null;
const runs = +(args.runs || 2);
const AT = String(args.at ?? "40").split(",").map(Number), THEN = String(args.then ?? "0,16,32,64").split(",").map(Number);
const STRIP = { seats: true, owners: true, ink: true, lanes: true, glyphs: true };
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
                // pass 14: every painting glyph is recorded, with or without an edge across it, so a glyph whole between two
                // facing edges reads its share too (revtrace.mjs kept only glyphs with an edge across them)
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
const res = { engine, theme: theme || "light", build: target.label, at: AT, then: THEN, runs: [] };
try {
    for (let k = 1; k <= runs; k++) for (const at of AT) for (const then of THEN) {
        const L0 = loadAvg();
        const s = await openScene(browser, target, "swap", { query: { three: "1" }, ...(theme ? { theme } : {}) });
        try {
            const ax = await s.page.evaluate(() => window.__dockProbe.axis());
            await startLog(s.page, STRIP);
            await s.page.evaluate(EDGE_SRC);
            await s.page.waitForTimeout(150);
            await s.page.evaluate(() => { window.__edgeLog.on = true; });
            await mark(s.page, "r");
            await s.page.evaluate(([ms, tw]) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("short"); if (tw) setTimeout(() => { window.__hpRetarget2 = performance.now(); window.__scene.setFace("mid"); }, tw); }, ms); }, [at, then]);
            await s.page.waitForTimeout(at + 60 + then);
            await waitRest(s.page, { quiet: 500, cap: 7000 });
            const [tR, tR2] = await s.page.evaluate(() => [window.__hpRetarget ?? null, window.__hpRetarget2 ?? null]);
            const frames = await stopLog(s.page);
            const edge = await s.page.evaluate(() => { window.__edgeLog.stop = true; return window.__edgeLog.frames; });
            const i0 = frames.findIndex((f) => f.mk === "r");
            const fr = i0 > 0 ? [frames[i0 - 1], ...frames.filter((f) => f.mk === "r")] : frames.filter((f) => f.mk === "r");
            const T0 = fr[0]?.t ?? 0;
            const sp = spliceRow(fr, ax), st = stubRow(fr, ax);
            const M0 = ax === "y" ? 1 : 0, M1 = ax === "y" ? 3 : 2;
            const spl = [];
            for (let i = 1; i < fr.length; i++) {
                const one = spliceRow([fr[i - 1], fr[i]], ax); if (!one.spliceFrames) continue;
                const [ua, ub] = one.firstSplice.units; const qa = (fr[i].s ?? []).find((q) => "s" + q[0] === ua), qb = (fr[i].s ?? []).find((q) => "s" + q[0] === ub);
                const ea = qa ? (ax === "y" ? qa[8] : qa[7]) : null, eb = qb ? (ax === "y" ? qb[6] : qb[5]) : null;
                // the edge frame of the same rAF (the recorder's rAF runs after the log's on the same timestamp), else the nearest
                let ef = null, dt = Infinity; for (const x of edge) { const d = Math.abs(x.ts - fr[i].t); if (d < dt) { dt = d; ef = x; } }
                const lo = Math.min(ea, eb) - 0.01, hi = Math.max(ea, eb) + 0.01;
                const gl = (ef?.g ?? []).filter((g) => g[4] > lo && g[3] < hi).map((g) => ({ unit: g[0], text: g[1], ch: g[2], g0: g[3], g1: g[4], share: g[5], op: g[6], between: g[3] >= lo && g[4] <= hi, edges: g[7] }));
                const inGap = gl.filter((g) => g.between);
                spl.push({ atMs: r2(fr[i].t - T0), units: one.firstSplice.units, gapPx: one.firstSplice.gapPx, advPx: one.firstSplice.advPx, edgeA: ea, edgeB: eb, edgeFrameDtMs: +dt.toFixed(2), glyphs: gl, maxShareBetween: inGap.length ? Math.max(...inGap.map((g) => g.share ?? -1)) : null, maxShareAcross: gl.length ? Math.max(...gl.filter((g) => !g.between).map((g) => g.share ?? -1), -1) : null });
            }
            res.runs.push({ at, then, run: k, load: L0, loadEnd: loadAvg(), tR: tR == null ? null : r2(tR - T0), tR2: tR2 == null ? null : r2(tR2 - T0), frames: fr.length, edgeFrames: edge.length, splice: { n: sp.spliceFrames, sliver: sp.sliverFrames, first: sp.firstSplice }, stub: st ? { n: st.stubFrames, first: st.first } : null, spliceFrames: spl });
            console.log(`${engine} ${theme || "light"} at ${at} then ${then} r${k} load ${L0}: splice ${sp.spliceFrames}${spl.map((x) => ` [${x.units.join("|")} +${x.atMs} ms gap ${x.gapPx} glyphs between ${x.glyphs.filter((g) => g.between).map((g) => g.ch + "=" + g.share).join(",") || "none"}; across ${x.glyphs.filter((g) => !g.between).map((g) => g.ch + "=" + g.share).join(",") || "none"}]`).join("")}; stub ${st?.stubFrames ?? "?"}`);
        } finally { await s.close(); }
    }
} finally { await browser.close(); await target.close(); }
fs.writeFileSync(args.json, JSON.stringify(res));
