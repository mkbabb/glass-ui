#!/usr/bin/env node
// E-14 · S14's members at their ranges (H14, D5 pass 14; P-E14 §S14-c M1-M30 and §S14-i, the challenge's X1-X11 folded into them).
// CK-20 (continuity in paint), CK-21 (the declared reads), CK-04 (the reach's frame), CK-16 (the stage leaves), CK-22/23 (residue, cost).
// One cell per member at its range's named cells (the extremal cell, or the corners when the error does not depend on the parameter).
// The held control is the E-13 slider row with a loupe and no clip (the library's Slider, the fixture's slider), C its parent (the card),
// G C's parent. Unless a cell says otherwise it is keyboard-engaged (the sentinel, then Tab), so no pointer rides the card. A cell's film is
// one rAF chain requested after the page's own, each frame read in a message posted from it (after that frame's callbacks and paint,
// h13Film's form). A "glide" is a non-CSS animation on the root whose keyframes carry `translate`. No screenshot inside a film.
// Grades (each cell names its own):
//   step     the act's frame ≤ 0.5 px from where the root was painted the frame before; the largest move over any 16.7 ms ≤ the painted
//            move × the glide row's peak + 1 px; a glide ran when the paint moved ≥ 5 px (E-10 hg13's clauses)
//   carry    the root's centre where the reference box (C, G, or the viewport for a scroll) carries it, ≤ 0.5 px on every engaged frame
//            (its rest offset in the box, × the box's painted size), and no glide started
//   limit    a stated limit of S14 (§S14-c): the cell reads the limit's own quantity and passes only within the stated bound, printed
//   count    a count against its bound (glides, errors, rAF/s)
// Each grade line prints the 1-minute load (the cell printer adds it). The member, its reference and its plant are in HARNESS.md §2 E-14.
//   node e14-s14.mjs --build <dir> | --fixture [--fault e14-…] [--engine webkit] [--only M1,M5,…] [--out <dir>]
import { witness, openPage, scenesFor, center, tabKey, f, rowsOf, rowFacts, rodeRow } from "./lib.mjs";

const NOM = 1000 / 60;
const blk = (h, t = "e14-block") => `(() => { const b = document.createElement('div'); b.style.height = '${h}px'; b.setAttribute('data-t', '${t}'); return b; })()`;
// the page side: the common dress, then the cell's own setup source (root, C, G, mn, ctx)
const SETUP = ([R, src, o]) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body;
  if (!o.anchor) document.documentElement.style.overflowAnchor = "none";
  mn.style.paddingTop = "230px"; mn.style.paddingBottom = o.noPad ? "0px" : "1600px";
  const ctx = (window.__ctx = { errs0: 0 });
  new Function("root", "C", "G", "mn", "ctx", src)(root, C, G, mn, ctx);
  if (!ctx.noCentre) { const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2); }
  if (ctx.after) new Function("root", "C", "G", "mn", "ctx", ctx.after)(root, C, G, mn, ctx);
  const q = root.getBoundingClientRect(), g = G.getBoundingClientRect(); return { vis: q.bottom > 0 && q.top < innerHeight, y: q.top, sy: scrollY, gt: g.top, gb: g.bottom, gst: G.scrollTop, gsh: G.scrollHeight, gch: G.clientHeight };
};
const FILM = ([R, ENG, N, hooks]) => new Promise((ok) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body; const ctx = window.__ctx ?? (window.__ctx = {});
  const HK = hooks.map(([n, src]) => [n, new Function("root", "C", "G", "mn", "ctx", src)]);
  const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
  const seen = new Set(); const out = []; const ch = new MessageChannel(); let n = 0; const t0 = document.timeline.currentTime;
  const X = () => ctx.ref ? (typeof ctx.ref === "string" ? document.querySelector(ctx.ref) : ctx.ref) : C;
  ch.port1.onmessage = () => { const r = root.getBoundingClientRect(), c = C.getBoundingClientRect(), x = X()?.getBoundingClientRect?.() ?? c; const sc = ctx.sc ? (typeof ctx.sc === "string" ? document.querySelector(ctx.sc) : ctx.sc) : G;
    const g = root.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate")); for (const a of g) seen.add(a);
    out.push({ n, t: document.timeline.currentTime - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, rr: r.right, tp: r.top, b: r.bottom, w: r.width, h: r.height, ow: root.offsetWidth,
      cx: c.left + c.width / 2, cy: c.top + c.height / 2, xl: x.left, xt: x.top, xw: x.width, xh: x.height, sy: scrollY, sst: sc?.scrollTop ?? 0,
      glides: seen.size, an: g.filter((a) => a.playState === "running").map((a) => a.effect.getTiming().duration), eng: root.matches(ENG) || !!root.closest(ENG), stage: root.hasAttribute("data-engage-stage"), v: ctx.v ?? null }); };
  const tick = () => { n++; for (const [k, fn] of HK) if (k === n) fn(root, C, G, mn, ctx); if (ctx.loop) ctx.loop(n); ch.port2.postMessage(0); if (n < N) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); };
  requestAnimationFrame(tick);
});

// the painted path of a glide under a projective card is not uniform in its translate: the 16.7 ms bound takes the map's own stretch
// along that path, read on the page after the film: the translate that paints the root back at `pre` (Newton, the map re-asked, 8 steps),
// then the painted path P(λ·t) at λ = 0, 0.1 .. 1; the stretch is the largest tenth over the mean tenth (1 for an affine map)
const MAG = ([R, pre]) => { const root = document.querySelector(R);
  const pr = (t) => { const a = root.animate([{ translate: t[0] + "px " + t[1] + "px" }, { translate: t[0] + "px " + t[1] + "px" }], { duration: 1e6, composite: "add" }); a.pause(); const q = root.getBoundingClientRect(); a.cancel(); return [q.left + q.width / 2, q.top + q.height / 2]; };
  let t = [0, 0]; for (let i = 0; i < 8; i++) { const p = pr(t), px = pr([t[0] + 2, t[1]]), py = pr([t[0], t[1] + 2]); const a = (px[0] - p[0]) / 2, b = (py[0] - p[0]) / 2, c = (px[1] - p[1]) / 2, d = (py[1] - p[1]) / 2; const r = [pre[0] - p[0], pre[1] - p[1]]; if (Math.hypot(...r) < 0.05) break; const det = a * d - b * c || 1; t = [t[0] + (d * r[0] - b * r[1]) / det, t[1] + (-c * r[0] + a * r[1]) / det]; }
  const P = Array.from({ length: 11 }, (_, k) => pr([t[0] * k / 10, t[1] * k / 10])); const seg = P.slice(1).map((q, k) => Math.hypot(q[0] - P[k][0], q[1] - P[k][1])); const tot = seg.reduce((x, y) => x + y, 0);
  return { m: tot > 0.5 ? Math.max(...seg) * 10 / tot : 1, res: Math.hypot(P[10][0] - pre[0], P[10][1] - pre[1]) }; };

await witness("E-14", "S14's members at their ranges (P-E14 §S14-c)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (m) => !only || only.has(m);
  const fixture = T.kind === "fixture";
  const found = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip); if (!found) throw new Error("no E-13 row with a loupe and no clip");
  // engaged: the row's selector, or the hand's register any build writes (HEAD's slider marks a pointer hold with data-held only)
  const [sc, m] = found; const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[data-e~="thumb"]', ENG = `${m.engaged ?? "[data-engaged]"}, [data-held]`;
  // the glide's clock token: the library's dock row (stage.ts glide), the fixture's travel row (fixtures.mjs travelOf)
  const CLOCK = fixture ? "--spring-press-settle" : "--spring-dock-settle";
  console.log(`# held control: scene ${sc} root ${R} thumb ${TH} engaged ${ENG}; clock token ${CLOCK}; cells ${only ? [...only].join(",") : "all"}`);
  const errsOf = (P) => P.errors.filter((e) => /\[glass-ui\]|\[fixture\]|pageerror/i.test(e));
  const kbd = async (P) => { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); return P.page.evaluate(([R, ENG]) => { const r = document.querySelector(R); return r.matches(ENG) || !!r.closest(ENG); }, [R, ENG]); };
  const ptr = async (P) => { const k = await center(P.page, TH); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down(); await P.page.waitForTimeout(600); return P.page.evaluate(([R, ENG]) => { const r = document.querySelector(R); return r.matches(ENG) || !!r.closest(ENG); }, [R, ENG]); };
  // one film cell: setup → (pre) → engage → film; every page, context and the browser closed by the wrapper and guard
  const run = async (name, c) => guard(name, async () => {
    const P = await openPage(E, T, sc, c.open ?? {});
    try {
      const st = await P.page.evaluate(SETUP, [R, c.setup ?? "", c.o ?? {}]); await P.page.waitForTimeout(c.settle ?? 200);
      const rows = await P.page.evaluate(rowsOf);
      if (c.pre) await P.page.evaluate((src) => new Function("ctx", src)(window.__ctx), c.pre);
      let eng = c.drive === "pointer" ? await ptr(P) : await kbd(P); let drove = c.drive === "pointer" ? "pointer" : "keyboard";
      if (!eng && c.drive !== "pointer" && !c.kbdOnly) { eng = await ptr(P); drove = "pointer (the keyboard did not engage this build)"; c.drive = "pointer"; }
      if (c.post) await P.page.evaluate((src) => new Function("ctx", src)(window.__ctx), c.post);
      try {
        const out = await P.page.evaluate(FILM, [R, ENG, c.N ?? 50, c.hooks ?? []]);
        const extra = c.read ? await P.page.evaluate(([R, src]) => new Function("root", "ctx", src)(document.querySelector(R), window.__ctx), [R, c.read]) : null;
        let mag = null; if (c.mag) { const i0 = out.findIndex((x) => x.n >= (c.AT ?? 8)); const pre = out[i0 - 1]; if (pre) { await P.page.evaluate(() => { for (const a of document.getAnimations()) a.finish?.(); }).catch(() => {}); mag = await P.page.evaluate(MAG, [R, [pre.x, pre.y]]); } }
        return { out, st, rows, eng, extra, mag, drove, errs: errsOf(P), AT: c.AT ?? 8 };
      } finally { if (c.drive === "pointer") await P.page.mouse.up(); }
    } finally { await P.close(); }
  }, 60000);
  // ── grades ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  const notDriven = (r) => (!r.eng ? "NOT DRIVEN: the root was not engaged" : !r.st.vis ? `NOT DRIVEN: the root is not in the viewport after the setup (${JSON.stringify(r.st)})` : null);
  const around = (r) => { const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); return { S, i0, pre: S[i0 - 1], first: S[i0], end: S.at(-1) }; };
  const step17 = (W, from) => { const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const p = W[i - 1], q = W[i]; return p[k] + ((q[k] - p[k]) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return W.at(-1)[k]; };
    let st = 0, sa = NaN; for (const x of W) if (x.t - W[0].t >= NOM) { const d = Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")); if (d > st) { st = d; sa = x.t - from; } } return [st, sa]; };
  // b.11's limit, for a move laid out after the stage's read of its frame: cut on the act's frame by at most the move, then on the next frame
  // painted back within 0.5 px of where it was, and glided home (H14 findings W-1, W-2: WebKit's late sheet, image decode and re-snap)
  const gradeCutBack = (r, why) => { const { S, i0, pre, first, end } = around(r); if (!pre || !first || !S[i0 + 1]) return ["FAIL", "the film holds no frames around the act's"];
    const moved = Math.hypot(end.x - pre.x, end.y - pre.y), jump = Math.hypot(first.x - pre.x, first.y - pre.y), back = Math.hypot(S[i0 + 1].x - pre.x, S[i0 + 1].y - pre.y); const glided = [...new Set(S.slice(i0).flatMap((x) => x.an))].length > 0;
    const ok = jump <= moved + 0.5 && back <= 0.5 && glided; return [ok ? "PASS" : "FAIL", `STATED LIMIT in ${engine} (${why}): cut on the act's frame ${f(jump, 2)} px (bound ≤ the move ${f(moved, 1)} + 0.5), the next frame ${f(back, 2)} px from where it was painted (bound ≤ 0.5), glided ${glided}`]; };
  const gradeStep = (r, o = {}) => {
    const { S, i0, pre, first, end } = around(r); if (!pre || !first) return ["FAIL", `the film holds no frame around the act's (${S.length} frames)`];
    const durs = [...new Set(S.slice(i0).flatMap((x) => x.an))]; const moved = Math.hypot(end.x - pre.x, end.y - pre.y), jump = Math.hypot(first.x - pre.x, first.y - pre.y);
    const facts = r.rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null); const row = rodeRow(durs, r.rows) ?? fastest;
    const m = r.mag?.m ?? 1; const bound = moved * (row?.peak ?? 0) * m + 1; const [st, sa] = step17(S.slice(i0 - 1), pre.t); const glided = durs.length > 0;
    const jb = o.jumpBound ?? 0.5; const ok = jump <= jb && st <= Math.max(bound, o.stepBound ?? 0) && (moved < 5 || glided || o.noGlideOk);
    return [ok ? "PASS" : "FAIL", `the act on frame ${r.AT} · paint moved ${f(end.x - pre.x, 1)}, ${f(end.y - pre.y, 1)} px in all; on the act's frame ${f(first.x - pre.x, 2)}, ${f(first.y - pre.y, 2)} = ${f(jump, 2)} px (bound ≤ ${f(jb, 2)}) · largest move over any 16.7 ms ${f(st, 1)} px at +${f(sa, 0)} ms (bound ${f(Math.max(bound, o.stepBound ?? 0), 1)}${r.mag ? ` = moved × peak × the map's stretch ${f(m, 3)} + 1` : ""}) · glides ${end.glides}${glided ? ` (${durs.map((x) => f(x, 0)).join(",")} ms)` : ""}${moved >= 5 && !glided && !o.noGlideOk ? " (moved ≥ 5 px, no glide)" : ""} · scrollY ${f(pre.sy, 0)} → ${f(first.sy, 0)} → ${f(end.sy, 0)}, scroller ${f(pre.sst, 0)} → ${f(first.sst, 0)} → ${f(end.sst, 0)} · path [${S.slice(Math.max(0, i0 - 1), i0 + 4).map((x) => `${f(x.x - pre.x, 1)},${f(x.y - pre.y, 1)}`).join(" ")}] · errors ${r.errs.length}`, { jump, st, moved, glided, glides: end.glides }];
  };
  const gradeCarry = (r, o = {}) => {
    const S = r.out.filter((x) => x.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`];
    const z = S[0]; const rx = (z.x - z.xl) / z.xw, ry = (z.y - z.xt) / z.xh; const vp = o.viewport;
    const dev = S.map((x) => (vp ? Math.hypot(x.x - z.x, x.y + x.sy - (z.y + z.sy)) : Math.hypot(x.x - (x.xl + rx * x.xw), x.y - (x.xt + ry * x.xh))));
    const mx = Math.max(...dev); const g = S.at(-1).glides - (o.g0 ?? 0); const moved = Math.max(...S.map((x) => Math.hypot(x.xl - z.xl, x.xt - z.xt, x.xw - z.xw)), vp ? Math.abs(S.at(-1).sy - z.sy) : 0);
    const ok = mx <= (o.bound ?? 0.5) && g <= (o.glides ?? 0);
    return [moved < (o.minMove ?? 3) ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${moved < (o.minMove ?? 3) ? "NOT DRIVEN: the carrier moved " + f(moved, 1) + " px · " : ""}scrollY ${f(z.sy, 0)} → ${f(S.at(-1).sy, 0)}, scroller ${f(z.sst, 0)} → ${f(S.at(-1).sst, 0)} · the carrier moved ${f(moved, 1)} px over ${S.length} engaged frames · the root's centre off where its ${vp ? "page" : "box"} carries it: max ${f(mx, 2)} px, frames over 2 px ${dev.filter((x) => x > 2).length} (bound ≤ ${f(o.bound ?? 0.5, 2)}) · glides started ${g} (bound ≤ ${o.glides ?? 0}) · errors ${r.errs.length}`, { mx, g }];
  };
  const emit = (name, r, grader) => { if (r.crashed) return cell(name, "FAIL", r.line); const nd = notDriven(r); if (nd) return cell(name, "UNMEASURED", nd); const [v, line] = grader(r); cell(name, v, `${r.drove && r.drove !== "keyboard" ? `drive ${r.drove} · ` : ""}${line}${r.note ? ` · ${r.note}` : ""}`); };

  // ── M1 · perspective, a step inside the tilted card; M2 · outside it (N11's corners) ───────────────────────────────────────
  const persp = (P, th, off) => `const rr = root.getBoundingClientRect(), cc = C.getBoundingClientRect(); C.style.transformOrigin = '50% ' + (rr.top + rr.height / 2 - cc.top - (${off})) + 'px'; C.style.transform = 'perspective(${P}px) rotateX(${th}deg)';`;
  if (want("M1")) for (const [P, th, ins, off] of [[200, 25, 200, -150], [200, 60, 200, -150], [600, 25, 200, -150], [600, 60, 200, -150], [200, 25, 40, 150], [200, 60, 40, 150], [600, 25, 40, 150], [600, 60, 40, 150]]) {
    const name = `M1 perspective inside · P ${P} θ ${th} · insert ${ins} · host ${off} px from the origin`;
    emit(name, await run(name, { setup: persp(P, th, off), mag: true, hooks: [[8, `C.insertBefore(${blk(ins)}, root)`]] }), (r) => gradeStep(r));
  }
  if (want("M2")) for (const [P, th, ins, off, lim] of [[200, 60, 200, -150, 42.5], [200, 60, 200, 150, "diverges"], [400, 60, 200, -150, 0.7], [600, 25, 40, -150, null], [600, 60, 200, 150, null], [200, 25, 200, 150, null]]) {
    const name = `M2 perspective outside · P ${P} θ ${th} · insert ${ins} · host ${off} px${lim ? ` · STATED LIMIT (N11: ${lim === "diverges" ? "Newton diverges" : `≤ ${lim} px after 4 iterations`})` : ""}`;
    const r = await run(name, { setup: persp(P, th, off), mag: true, hooks: [[8, `G.insertBefore(${blk(ins)}, C)`]] });
    // N11's corners are stated limits read on N11's library-free scene; on this scene the residual of 4 iterations is its own: REPORT, read in each engine
    if (lim) { emit(name, r, (x) => { const [, line] = gradeStep(x); return ["REPORT", `the limit's corner (N11 on its own scene: ${lim === "diverges" ? "diverges" : `${lim} px`}); this scene's read · ${line}`]; }); continue; }
    emit(name, r, (x) => gradeStep(x));
  }
  // ── M3 · the host's glide under the affine family's extremal cells ────────────────────────────────────────────────────────
  if (want("M3")) for (const [nm, css] of [["scale 0.5", "C.style.scale = '0.5'; C.style.transformOrigin = '0 0';"], ["skewX 30deg", "C.style.transform = 'skewX(30deg)'; C.style.transformOrigin = '0 0';"], ["rotate 180deg centre", "C.style.rotate = '180deg';"], ["matrix rotate 30 + scale 1.5", "C.style.transform = 'matrix(1.299, 0.75, -0.75, 1.299, 0, 0)'; C.style.transformOrigin = '0 0';"]]) {
    const name = `M3 the host's glide · outside · ${nm}`;
    emit(name, await run(name, { setup: css, hooks: [[8, `G.insertBefore(${blk(40)}, C)`]] }), (r) => gradeStep(r));
  }
  // ── M4 · the lens under rotation, skew and scale (b.9: axis lengths; laid level; its bottom centre on the track's top centre) ──
  if (want("M4") && m.loupe) for (const [nm, css, ax] of [["none (control)", "", [1, 1]], ["rotate 10deg", "C.style.rotate = '10deg';", [1, 1]], ["rotate 90deg", "C.style.rotate = '90deg';", [1, 1]], ["skewX 15deg", "C.style.transform = 'skewX(15deg)';", [1, 1 / Math.cos(Math.PI / 12)]], ["rotate 10deg + scale 0.8", "C.style.rotate = '10deg'; C.style.scale = '0.8';", [0.8, 0.8]], ["scale 1.5", "C.style.scale = '1.5';", [1.5, 1.5]]]) {
    const name = `M4 the lens · card ${nm}`;
    const L = m.loupe;
    const r = await run(name, { setup: css, drive: "pointer", N: 6, read: `const L = ${JSON.stringify(L)}; const lens = document.querySelector(L.lens), tr = document.querySelector(L.track) ?? root; if (!lens) return null; const a = lens.getBoundingClientRect(), t = tr.getBoundingClientRect(); return { h: a.height, w: a.width, oh: lens.offsetHeight, ow: lens.offsetWidth, cy: a.top + a.height / 2, ty: t.top + t.height / 2, tt: t.top, tb: t.bottom, at: a.top, b: a.bottom, cx: a.left + a.width / 2, tx: t.left + t.width / 2 };` });
    emit(name, r, (x) => { const v = x.extra; if (!v) return ["FAIL", "NO LENS on a pointer hold"]; const ry = v.h / (v.oh * ax[1]), rx = v.w / (v.ow * ax[0]); const gapA = Math.abs(v.b - v.tt), gapB = Math.abs(v.at - v.tb); const side = gapA <= gapB ? "above" : "below";
      // b.9: laid level at the subject's axis lengths, its bottom centre on the track's painted top centre (or, when the side rule turns it, its top on the bottom)
      const ok = ry >= 0.85 && ry <= 1.18 && rx >= 0.85 && rx <= 1.18 && Math.min(gapA, gapB) <= 6; return [ok ? "PASS" : "FAIL", `the lens paints ${f(v.w, 1)} × ${f(v.h, 1)} px against its CSS ${v.ow} × ${v.oh} × the subject's axis lengths ${f(ax[0], 4)} / ${f(ax[1], 4)}: ×${f(rx, 4)} / ×${f(ry, 4)} (bound 0.85..1.18 each: laid level at the subject's scale) · ${side}: its ${side === "above" ? "bottom" : "top"} ${f(side === "above" ? v.b : v.at, 1)} against the track's painted ${side === "above" ? "top" : "bottom"} ${f(side === "above" ? v.tt : v.tb, 1)} (bound ≤ 6 px: attached) · errors ${x.errs.length}`]; });
  }
  // ── M5 · script-animated ancestors: carried (D1's members over amplitude, period and the loop's order) ─────────────────────────
  const loopSrc = (k, A, per) => {
    if (k === "parallax") return "const y0 = scrollY; addEventListener('scroll', () => { C.style.translate = '0 ' + (0.3 * (scrollY - y0)).toFixed(2) + 'px'; ctx.v = 0.3 * (scrollY - y0); }, { passive: true });";
    const body = k === "ramp" ? `const t = ctx.go ? Math.min(1, (performance.now() - ctx.go) / ${per}) : 0; ctx.v = ${A} * t; C.style.translate = '0 ' + ctx.v.toFixed(2) + 'px';`
      : k === "sine" ? `const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; ctx.v = ${A} * Math.sin(2 * Math.PI * t); C.style.translate = '0 ' + ctx.v.toFixed(2) + 'px';`
      : k === "scale" ? `const t = ctx.go ? Math.min(1, (performance.now() - ctx.go) / ${per}) : 0; ctx.v = 1 - 0.15 * t; C.style.scale = ctx.v.toFixed(4);`
      : `const t = ctx.go ? Math.min(1, (performance.now() - ctx.go) / ${per}) : 0; ctx.v = 1 - 0.15 * t; C.style.setProperty('--member-scale', ctx.v.toFixed(4));`;
    return `const tick = () => { ${body} requestAnimationFrame(tick); }; requestAnimationFrame(tick);`;
  };
  if (want("M5")) for (const [k, A, per, order] of [["ramp", 80, 500, "before"], ["ramp", 80, 500, "after"], ["sine", 80, 200, "before"], ["sine", 80, 200, "after"], ["sine", 80, 600, "before"], ["sine", 20, 600, "before"], ["scale", 0, 200, "before"], ["member-scale", 0, 200, "before"], ["parallax", 0, 0, "before"]]) {
    const name = `M5 script-animated ancestor · ${k}${A ? ` ${A} px` : ""}${per ? ` / ${per} ms` : ""} · the page loop requested ${order} the hold`;
    const setup = (k === "member-scale" ? "C.style.scale = 'var(--member-scale, 1)'; C.style.transformOrigin = '0 0';" : k === "scale" ? "C.style.transformOrigin = '0 0';" : "") + (order === "before" ? loopSrc(k, A, per) : "");
    const hooks = k === "parallax" ? Array.from({ length: 30 }, (_, i) => [6 + i, "scrollBy(0, 8)"]) : [[6, "ctx.go = performance.now()"]];
    emit(name, await run(name, { setup, post: order === "after" ? `(${new Function("root", "C", "G", "mn", "ctx", loopSrc(k, A, per)).toString()})(document.querySelector(${JSON.stringify(R)}), document.querySelector(${JSON.stringify(R)}).parentElement, null, null, ctx)` : null, hooks, N: 60 }), (r) => gradeCarry(r));
  }
  // ── M6 · a carrier move in a step's frame: inside (−Δ, exact) and outside (on paint: the stated limit, one frame's carrier motion) ──
  if (want("M6")) for (const [place, per] of [["inside", 200], ["outside", 200], ["outside", 600]]) {
    const name = `M6 sine 80 px / ${per} ms on C + a 40 px insert ${place === "inside" ? "inside C (below the transformed link: −Δ)" : "before C (on paint: STATED LIMIT, ≤ one frame's carrier motion)"}`;
    const r = await run(name, { setup: loopSrc("sine", 80, per), hooks: [[4, "ctx.go = performance.now()"], [16, place === "inside" ? `C.insertBefore(${blk(40)}, root)` : `G.insertBefore(${blk(40)}, C)`]], AT: 16, N: 50 });
    emit(name, r, (x) => { const { S, i0, pre, first } = around(x); const pp = S[i0 - 2]; if (!pp || !pre || !first) return ["FAIL", "no frames around the act"];
      const carrier = (first.v ?? 0) - (pre.v ?? 0); const rel = Math.hypot(first.x - pre.x, first.y - pre.y - carrier) - (place === "outside" ? 0 : 0); const dt = first.t - pre.t;
      const vmax = (2 * Math.PI * 80) / (per / 1000); const lim = place === "inside" ? 0.5 : (vmax * dt) / 1000 + 0.5;
      return [rel <= lim ? "PASS" : "FAIL", `the carrier moved ${f(carrier, 2)} px on the act's frame (dt ${f(dt, 1)} ms) · the root's step on that frame less the carrier's: ${f(rel, 2)} px (bound ≤ ${f(lim, 2)}${place === "inside" ? "" : `: 2π·80/${per / 1000} s × dt + 0.5, the stated limit`}) · glides ${S.at(-1).glides} · errors ${x.errs.length}`]; });
  }
  // ── M7 · animations a record starts (on C, on G); a CSS transition under a page loop ───────────────────────────────────────────
  if (want("M7")) for (const [nm, setup, hook, ref] of [
    ["a class on C starts @keyframes translate 0 -40px → 0 (600 ms)", "const st = document.createElement('style'); st.textContent = '@keyframes e14k { from { translate: 0 -40px } to { translate: 0 0 } } .e14k { animation: e14k 600ms linear }'; document.head.appendChild(st);", "C.classList.add('e14k')", null],
    ["a class on G starts @keyframes translate 0 -40px → 0 (600 ms)", "const st = document.createElement('style'); st.textContent = '@keyframes e14k { from { translate: 0 -40px } to { translate: 0 0 } } .e14k { animation: e14k 600ms linear }'; document.head.appendChild(st); ctx.ref = G;", "G.classList.add('e14k')", "G"],
    ["C's 600 ms scale transition 1 → 0.9 under a page loop writing a text node every frame", "C.style.transformOrigin = '0 0'; C.style.transition = 'scale 600ms linear'; const p = document.createElement('p'); p.style.cssText = 'position:fixed;left:0;bottom:0;margin:0;font:10px monospace'; const t = document.createTextNode('0'); p.appendChild(t); document.body.appendChild(p); let k = 0; const tick = () => { t.data = String(++k); requestAnimationFrame(tick); }; requestAnimationFrame(tick);", "C.style.scale = '0.9'", null]]) {
    const name = `M7 ${nm}`;
    emit(name, await run(name, { setup, hooks: [[6, hook]], N: 45 }), (r) => gradeCarry(r));
  }
  // ── M8 · an early page loop, then an insert: one step, one glide, it lands ────────────────────────────────────────────────────
  if (want("M8")) for (const [order, ins] of [["before", 40], ["after", 40], ["before", 200], ["before", 20]]) {
    const name = `M8 a page loop writing a text node every frame, requested ${order} the hold · a ${ins} px insert above the root`;
    const loop = "const p = document.createElement('p'); p.style.cssText = 'position:fixed;left:0;bottom:0;margin:0;font:10px monospace'; const t = document.createTextNode('0'); p.appendChild(t); document.body.appendChild(p); let k = 0; const tick = () => { t.data = String(++k); requestAnimationFrame(tick); }; requestAnimationFrame(tick);";
    const r = await run(name, { setup: order === "before" ? loop : "", post: order === "after" ? loop : null, hooks: [[8, `C.insertBefore(${blk(ins)}, root)`]], N: 50 });
    emit(name, r, (x) => { const [v, line, d] = gradeStep(x); const { S, i0, pre, end } = around(x); let last = i0; for (let i = i0; i < S.length; i++) if (Math.hypot(S[i].x - end.x, S[i].y - end.y) > 0.5) last = i;
      const settle = S[last].t - pre.t; const clock = Math.max(0, ...S.flatMap((y) => y.an)); const landed = Math.hypot(end.x - pre.x, end.y - pre.y) >= ins * 0.9 - 1; const ok = v === "PASS" && d.glides === 1 && landed;
      return [ok ? "PASS" : "FAIL", `${line} · glides ${d.glides} (bound 1) · landed ${landed} (moved ${f(Math.hypot(end.x - pre.x, end.y - pre.y), 1)} of ${ins} px by +${f(end.t - pre.t, 0)} ms; settles ${f(settle, 0)} ms after the act, clock ${f(clock, 0)} ms)`]; });
  }
  // ── M9 · moves with no record (a shadow tree, field-sizing, a <link> sheet at load, an image decode, insertRule, a pseudo-class) ──
  if (want("M9")) for (const [nm, setup, hook] of [
    ["a shadow-tree edit", "const h = document.createElement('div'); h.setAttribute('data-t','e14-shadow'); G.insertBefore(h, C); const s = h.attachShadow({ mode: 'open' }); s.innerHTML = '<div style=\"height:0\"></div>'; ctx.s = s;", "ctx.s.firstChild.style.height = '40px'"],
    ["field-sizing: content, a textarea's value", "const t = document.createElement('textarea'); t.setAttribute('data-t','e14-fs'); t.style.cssText = 'field-sizing:content;display:block;font:16px/20px monospace;padding:0;border:0;resize:none;width:200px'; t.value = 'x'; t.tabIndex = -1; G.insertBefore(t, C); ctx.t = t;", "ctx.t.value = 'x\\nx\\nx'"],
    ["a <link> sheet applied after its record", "const d = document.createElement('div'); d.className = 'e14l'; d.setAttribute('data-t','e14-l'); G.insertBefore(d, C);", "const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'data:text/css,' + encodeURIComponent('.e14l{height:40px}'); document.head.appendChild(l)"],
    ["an image decoded after its record", "const i = document.createElement('img'); i.setAttribute('data-t','e14-img'); i.style.display = 'block'; G.insertBefore(i, C); ctx.i = i;", "ctx.i.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"40\"/>')"],
    ["a CSSOM insertRule", "const st = document.createElement('style'); document.head.appendChild(st); ctx.sh = st.sheet; const d = document.createElement('div'); d.className = 'e14r'; G.insertBefore(d, C);", "ctx.sh.insertRule('.e14r { height: 40px }')"],
    ["a pseudo-class restyle (:checked set through its IDL)", "const st = document.createElement('style'); st.textContent = '.e14p:has(input:checked) { height: 40px } .e14p { height: 0; overflow: hidden }'; document.head.appendChild(st); const d = document.createElement('div'); d.className = 'e14p'; d.innerHTML = '<input type=checkbox tabindex=-1>'; G.insertBefore(d, C); ctx.cb = d.firstChild;", "ctx.cb.checked = true"]]) {
    const name = `M9 a move with no record · ${nm}`;
    const late = engine === "webkit" && /<link> sheet|image decoded/.test(nm);
    emit(name, await run(name, { setup, hooks: [[8, hook]], N: 50 }), (r) => (late ? gradeCutBack(r, "W-1: laid out after the resize observation of its frame") : gradeStep(r)));
  }
  // ── M10 · a sub-pixel step (STATED LIMIT: ≤ 1 px, cut) and a link joining the chain (X1/Y1: carried, no glide) ────────────────
  if (want("M10")) {
    for (const [nm, frac] of [["0.4 px insert", false], ["0.4 px insert, fractional layout", true]]) {
      const name = `M10 a sub-pixel step · ${nm} · STATED LIMIT (≤ 1 px, no glide owed)`;
      emit(name, await run(name, { setup: frac ? "G.style.paddingTop = '0.25px';" : "", hooks: [[8, `C.insertBefore(${blk(0.4)}, root)`]] }), (r) => { const [, line, d] = gradeStep(r); return [d.jump <= 1 ? "PASS" : "FAIL", `${line} · the limit: the act's frame ≤ 1 px`]; });
    }
    for (const [nm, css, frac] of [["will-change: transform", "G.style.willChange = 'transform'", false], ["contain: paint", "G.style.contain = 'paint'", false], ["filter: blur(0)", "G.style.filter = 'blur(0px)'", false], ["perspective: 500px", "G.style.perspective = '500px'", false], ["will-change: transform, fractional layout", "G.style.willChange = 'transform'", true], ["offset-path: path('M0 0'), anchored at G's own top left so it places G where it stood (X1 (d))", "G.style.transformOrigin = '0 0'; G.style.offsetPath = \"path('M0 0')\"", false], ["will-change: transform, class-applied", "const st = document.createElement('style'); st.textContent = '.e14wc { will-change: transform }'; document.head.appendChild(st); G.classList.add('e14wc')", false],
      ["filter: blur(0), transition-applied (filter 200ms)", "G.style.transition = 'filter 200ms linear'; G.style.filter = 'blur(0px)'", false], ["filter: blur(0), class-applied, fractional layout", "const st = document.createElement('style'); st.textContent = '.e14fl { filter: blur(0px) }'; document.head.appendChild(st); G.classList.add('e14fl')", true],
      ["position: relative (control)", "G.style.position = 'relative'", false]]) {
      const name = `M10 a link joins the chain · ${nm} on a bordered G (X1, Y1)`;
      emit(name, await run(name, { setup: `G.style.border = '3px solid #8888'; G.style.position = 'static';${frac ? " G.style.paddingTop = '0.25px';" : ""}`, hooks: [[8, css]] }), (r) => { const [, line, d] = gradeStep(r, { noGlideOk: true }); const ok = d.jump <= 1 && d.glides === 0; return [ok ? "PASS" : "FAIL", `${line} · bound: ≤ 1 px on the act's frame (the rounding), no glide`]; });
    }
    // an onset that also moves G's own paint (a scale): the root is carried with G
    for (const [nm, css, frac] of [["an instant scale 0.9", "G.style.scale = '0.9'", false], ["an instant scale 0.9", "G.style.scale = '0.9'", true]]) {
      const name = `M10 a link joins the chain · ${nm} on a bordered G${frac ? ", fractional layout" : ""} (X1: carried with G)`;
      emit(name, await run(name, { setup: `G.style.border = '3px solid #8888'; G.style.position = 'static'; G.style.transformOrigin = '0 0'; ctx.ref = G;${frac ? " G.style.paddingTop = '0.25px';" : ""}`, hooks: [[8, css]], N: 30 }), (r) => gradeCarry(r));
    }
  }
  // ── M11 · the host's own size change: the least-moved point is fixed in layout, nothing glided beyond the grow's share ───────────
  if (want("M11")) for (const [al, mg] of [["start", "C.style.display = 'flex'; C.style.justifyContent = 'flex-start';"], ["centre", "C.style.display = 'flex'; C.style.justifyContent = 'center';"], ["end", "C.style.display = 'flex'; C.style.justifyContent = 'flex-end';"]]) {
    const name = `M11 the host's own width 300 → 380 · ${al}-aligned (b.5)`;
    const r = await run(name, { setup: `${mg} C.style.width = '520px'; root.style.width = '300px'; root.style.maxWidth = 'none'; root.style.flex = 'none';`, hooks: [[8, "root.style.width = '380px'"]] });
    emit(name, r, (x) => { const { S, i0, pre, first, end } = around(x); if (!pre || !first) return ["FAIL", "no frames"]; const s = pre.w / pre.ow; const share = ((s - 1) * 80) / 2;
      const e = al === "start" ? [pre.l, first.l] : al === "end" ? [pre.rr, first.rr] : [pre.x, first.x]; const jump = Math.abs(e[1] - e[0]); const g = end.glides - pre.glides; const bound = 0.5 + (al === "centre" ? 0 : share);
      return [jump <= bound && g === 0 ? "PASS" : "FAIL", `grow ×${f(s, 4)} · the ${al === "centre" ? "centre" : al + " edge"} (fixed in layout) moved ${f(jump, 2)} px in paint on the act's frame (bound ${f(bound, 2)} = 0.5 + the grow's share ${al === "centre" ? "0" : f(share, 2)}) · glides at the change ${g} (bound 0) · width ${f(pre.w, 1)} → ${f(first.w, 1)} → ${f(end.w, 1)} · errors ${x.errs.length}`]; });
  }
  // ── M12 · scroll during the hold (carried); a scroll in a step's frame (STATED LIMIT: glided with the step, the act's frame still) ──
  if (want("M12")) {
    let name = "M12 a programmatic scroll during the hold, 8 px a frame for 30 frames";
    emit(name, await run(name, { hooks: Array.from({ length: 30 }, (_, i) => [6 + i, "scrollBy(0, 8)"]), N: 45 }), (r) => gradeCarry(r, { viewport: true }));
    name = "M12 a 30 px scroll in a 40 px insert's frame · STATED LIMIT (the scroll glided with the step)";
    emit(name, await run(name, { hooks: [[8, `C.insertBefore(${blk(40)}, root); scrollBy(0, 30)`]] }), (r) => gradeStep(r));
  }
  // ── M13 · anchoring on the host's chain (a step with s = 0) and off it (STATED LIMIT: a cut of the insert) ──────────────────────
  if (want("M13")) {
    for (const [where, ins, kind] of [["page", 20, "insert"], ["page", 200, "insert"], ["page", 200, "remove"], ["scroller", 20, "insert"], ["scroller", 200, "insert"]]) {
      const name = `M13 anchoring on the chain · ${where} · ${kind} ${ins} px above · overflow-anchor auto`;
      const setup = where === "page" ? `const sp = ${blk(800, "e14-spacer")}; mn.insertBefore(sp, mn.firstChild); ${kind === "remove" ? `mn.insertBefore(${blk(ins, "e14-subject")}, sp);` : ""} ctx.sc = document.scrollingElement;`
        : `G.style.overflow = 'auto'; G.style.padding = '0px'; G.style.boxSizing = 'border-box'; G.style.height = '300px'; const sp = ${blk(600, "e14-spacer")}; G.insertBefore(sp, G.firstChild); G.appendChild(${blk(600, "e14-tail")}); ctx.after = "G.scrollTop += C.getBoundingClientRect().top - G.getBoundingClientRect().top - 60; scrollBy(0, G.getBoundingClientRect().top - 120);";`;
      const hook = kind === "remove" ? "document.querySelector('[data-t=\"e14-subject\"]').remove()" : where === "page" ? `mn.insertBefore(${blk(ins)}, mn.firstChild)` : `G.insertBefore(${blk(ins)}, G.firstChild)`;
      emit(name, await run(name, { setup, o: { anchor: true }, hooks: [[8, hook]] }), (r) => gradeStep(r));
    }
    for (const [where, ins, form] of [["scroller", 40, "flex column"], ["page", 40, "flex column"], ["scroller", 200, "flex column"], ["scroller", 40, "grid cell"]]) {
      const name = `M13 anchoring off the chain · ${where} · ${ins} px above the anchor in a sibling ${form} · STATED LIMIT (a cut ≤ the insert)`;
      const wrap = form === "grid cell" ? "display:grid;grid-template-columns:200px 400px;gap:20px;align-items:start" : "display:flex;align-items:flex-start;gap:20px";
      const setup = `const w = document.createElement('div'); w.style.cssText = '${wrap}'; const L = document.createElement('div'); L.style.width = '200px'; L.innerHTML = '<div data-t="e14-ins"></div>' + '<div style="height:50px">l</div>'.repeat(40); const Rc = document.createElement('div'); Rc.style.width = '400px'; Rc.appendChild(${blk(600, "e14-pad")}); G.insertBefore(w, C); Rc.appendChild(C); Rc.appendChild(${blk(1500, "e14-tail")}); w.append(L, Rc);
        ${where === "scroller" ? "const s = document.createElement('div'); s.style.cssText = 'position:relative;height:300px;overflow:auto;width:640px'; w.before(s); s.appendChild(w); ctx.sc = s; ctx.after = 'ctx.sc.scrollTop = 500; scrollBy(0, ctx.sc.getBoundingClientRect().top - 100);'; ctx.noCentre = true;" : "ctx.sc = document.scrollingElement;"}`;
      emit(name, await run(name, { setup, o: { anchor: true }, hooks: [[8, `document.querySelector('[data-t="e14-ins"]').append(${blk(ins)})`]] }), (r) => { const [, line, d] = gradeStep(r, { noGlideOk: true }); return [d.jump <= ins + 0.5 ? "PASS" : "FAIL", `${line} · the limit: a cut ≤ the insert (${ins} px) + 0.5`]; });
    }
  }
  // ── M14 · the clamp, page and scroller, removals 20 and 200 px below at the end ───────────────────────────────────────────────
  if (want("M14")) for (const [where, h] of [["page", 20], ["page", 200], ["scroller", 20], ["scroller", 200]]) {
    const name = `M14 the clamp · ${where} · ${h} px removed below at the scroll end`;
    const setup = where === "page" ? `mn.insertBefore(${blk(800, "e14-spacer")}, mn.firstChild); mn.appendChild(${blk(h, "e14-subject")}); ctx.sc = document.scrollingElement; ctx.noCentre = true; ctx.after = 'scrollTo(0, document.scrollingElement.scrollHeight);';`
      : `G.style.overflow = 'auto'; G.style.padding = '0px'; G.style.boxSizing = 'border-box'; G.style.height = '${300 + h}px'; G.insertBefore(${blk(600, "e14-spacer")}, G.firstChild); G.appendChild(${blk(h, "e14-subject")}); ctx.noCentre = true; ctx.after = 'G.scrollTop = G.scrollHeight; scrollBy(0, G.getBoundingClientRect().bottom - innerHeight);';`;
    emit(name, await run(name, { setup, o: { noPad: where === "page" }, hooks: [[8, "document.querySelector('[data-t=\"e14-subject\"]').remove()"]] }), (r) => gradeStep(r));
  }
  // ── M15 · CK-04: the card scaled about the held control during the hold, then a scroll: the reach clears the gutter as painted ───
  if (want("M15") && !fixture) for (const [s1, when] of [[1.25, "during"], [0.8, "during"], [1.25, "before (control)"]]) {
    const name = `M15 card scale 1 → ${s1} about the held root · ${when} the hold, then a 30 px scroll`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '.e14big { scale: ${s1} }'; document.head.appendChild(st); const gc = document.createElement('div'); gc.style.paddingInline = 'var(--space-section)'; C.appendChild(gc); const g = parseFloat(getComputedStyle(gc).paddingLeft); gc.remove(); const W = Math.round((innerWidth - 2 * g * 1.25 - 20) / 1.25); root.style.width = W + 'px'; root.style.maxWidth = 'none'; const rr = root.getBoundingClientRect(); root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (innerWidth / 2 - (rr.left + rr.width / 2)) + 'px'; const q = root.getBoundingClientRect(), cc = C.getBoundingClientRect(); C.style.transformOrigin = (q.left + q.width / 2 - cc.left) + 'px ' + (q.top + q.height / 2 - cc.top) + 'px'; C.style.transition = 'scale 300ms linear';`, {}]);
        if (when.startsWith("before")) { await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("e14big"), R); await P.page.waitForTimeout(450); }
        const eng = await kbd(P);
        if (when === "during") { await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("e14big"), R); await P.page.waitForTimeout(450); }
        await P.page.evaluate(() => scrollBy(0, 30)); await P.page.waitForTimeout(350);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); const c = document.createElement("div"); c.style.paddingInline = "var(--space-section)"; e.parentElement.appendChild(c); const g = parseFloat(getComputedStyle(c).paddingLeft); c.remove();
          const p = r.left + r.width / 2; const a = e.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const q = e.getBoundingClientRect(); a.cancel(); return { l: r.left, r: innerWidth - r.right, w: r.width, g, fx: (q.left + q.width / 2 - p) / 40 }; }, R);
        return { v, eng, st: { vis: true }, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { const gap = Math.min(x.v.l, x.v.r), need = x.v.g * x.v.fx; return [gap >= need - 1 ? "PASS" : "FAIL", `the held box paints ${f(x.v.w, 1)} px, ${f(x.v.l, 1)} / ${f(x.v.r, 1)} px from the viewport's edges · the gutter ${f(x.v.g, 1)} px × the frame ${f(x.v.fx, 4)} = ${f(need, 1)} px (bound ≥ that − 1) · errors ${x.errs.length}`]; });
  }
  // ── M16 · the released host on its exit clock under an ancestor's animation, with an unrelated record: nothing glided ─────────────
  if (want("M16")) for (const [nm, css, go] of [["scale 1 → 0.9 + an unrelated append at frame 5", "C.style.transformOrigin = '0 0'; C.style.transition = 'scale 600ms linear';", "C.style.scale = '0.9'"], ["translate 0 → 80 px + an unrelated append at frame 5", "C.style.transition = 'translate 600ms linear';", "C.style.translate = '0 80px'"], ["scale 1 → 1.2, no record (control)", "C.style.transformOrigin = '0 0'; C.style.transition = 'scale 600ms linear';", "C.style.scale = '1.2'"]]) {
    const name = `M16 released, then C's ${nm}`;
    const hooks = [[1, `ctx.rel = !(root.matches(${JSON.stringify(ENG)}) || !!root.closest(${JSON.stringify(ENG)})); ${go}`]]; if (!nm.includes("control")) hooks.push([5, "const d = document.createElement('div'); d.setAttribute('data-t','e14-unrelated'); document.body.appendChild(d);"]);
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const st = await P.page.evaluate(SETUP, [R, css, {}]); await P.page.waitForTimeout(200);
        const eng = await kbd(P); await P.page.keyboard.press(tabKey(engine)); // the release: focus leaves the control, then at once the film
        const out = await P.page.evaluate(FILM, [R, ENG, 40, hooks]); const rel = await P.page.evaluate(() => window.__ctx.rel);
        return { out, st, eng, rel, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => [!x.rel ? "UNMEASURED" : x.out.at(-1).glides === 0 ? "PASS" : "FAIL", `${x.rel ? "" : "NOT DRIVEN: not released at the film's start · "}released, then C's ${nm} · glides started ${x.out.at(-1).glides} (bound 0: the carrier is carried; the unrelated record moves no offset) · errors ${x.errs.length}`]);
  }
  // ── M18 · a layout-property animation: its velocity carried, its onset and its departures glided ─────────────────────────────────
  if (want("M18")) for (const [nm, rate, ins] of [["a constant margin ramp 200 px/s", 200, false], ["a constant margin ramp 1000 px/s", 1000, false], ["a constant margin ramp 200 px/s + a 40 px insert at frame 30", 200, true]]) {
    const name = `M18 ${nm} on a box above C`;
    const setup = `const sp = document.createElement('div'); sp.setAttribute('data-t','e14-ramp'); G.insertBefore(sp, C); ctx.sp = sp; ctx.loop = (n) => { if (n >= 8 && n < 50) { ctx.m = (ctx.m ?? 0) + ${rate} / 60; ctx.sp.style.marginTop = ctx.m.toFixed(2) + 'px'; } ctx.v = ctx.m ?? 0; };`;
    const r = await run(name, { setup, hooks: ins ? [[30, `C.insertBefore(${blk(40)}, root)`]] : [], N: 60, AT: ins ? 30 : 8 });
    emit(name, r, (x) => { const S = x.out; const after = S.filter((y) => y.n > 9 && y.n < 50); const g = S.at(-1).glides; const base = ins ? 2 : 1;
      let jumpIns = 0; if (ins) { const i = S.findIndex((y) => y.n >= 30); const pp = S[i - 2], pre = S[i - 1], first = S[i]; jumpIns = Math.abs((first.y - pre.y) - (pre.y - pp.y)); }
      const ok = g <= base + 1 && (!ins || jumpIns <= 1.5); return [ok ? "PASS" : "FAIL", `the ramp ran ${after.length} frames · glides ${g} (bound ≤ ${base + 1}: the onset${ins ? ", the insert" : ""}, one uneven frame) ${ins ? `· on the insert's frame the root's step departs from the ramp's by ${f(jumpIns, 2)} px (bound ≤ 1.5)` : ""} · errors ${x.errs.length}`]; });
  }
  // ── M21 · the probe's clamp hazard: a host whose own translate extends a scroller's overflow at its end (STATED LIMIT) ────────────
  if (want("M21")) {
    const name = "M21 a scroller at its end, the root's own translate 0 40px extending its overflow · a 40 px insert above the root";
    const r = await run(name, { setup: `G.style.overflow = 'auto'; G.style.padding = '0px'; G.style.boxSizing = 'border-box'; G.style.height = '260px'; G.insertBefore(${blk(400, "e14-spacer")}, C); root.style.translate = '0 40px'; ctx.after = 'G.scrollTop = G.scrollHeight; scrollBy(0, G.getBoundingClientRect().top - 120);';`, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]] });
    emit(name, r, (x) => { const { S, i0, pre, first, end } = around(x); const moves = S.slice(i0 + 1).filter((y, k) => y.sst !== S[i0 + k].sst).length; const [, line] = gradeStep(x); return [moves === 0 ? "PASS" : "FAIL", `${line} · the scroller's offset changed on ${moves} frame(s) after the act's (bound 0: no probe clamps it)`]; });
  }
  // ── M22 · a changing CSS zoom: on an ancestor (a step on paint) and on a box before the host (a step by Q) ───────────────────────
  if (want("M22")) for (const [nm, setup, hook, jb] of [["G's zoom 1 → 1.25", "", "G.style.zoom = '1.25'", null], ["a box before C, zoom 1 → 1.25", `const b = ${blk(40, "e14-z")}; G.insertBefore(b, C); ctx.b = b;`, "ctx.b.style.zoom = '1.25'", null]]) {
    const name = `M22 a zoom change during the hold · ${nm}`;
    emit(name, await run(name, { setup, hooks: [[8, hook]] }), (r) => { if (nm.startsWith("G's")) { const { pre, first } = around(r); const grow = Math.abs(first.h - pre.h) / 2 + Math.abs(first.w - pre.w) / 2; return gradeStep(r, { jumpBound: 0.5 + grow }); } return gradeStep(r); });
  }
  // ── M23 · a position: sticky link under a scroll (Y3): carried across the stick; an insert above an unstuck sticky box: a step ─────
  if (want("M23")) {
    for (const where of ["page", "scroller"]) {
      const name = `M23 G sticky top 0 · ${where} scrolled 8 px a frame across the stick`;
      const setup = where === "page" ? "G.style.position = 'sticky'; G.style.top = '0px'; G.style.background = '#fff'; G.style.zIndex = '1'; ctx.ref = G; ctx.noCentre = true; ctx.after = 'scrollTo(0, G.getBoundingClientRect().top + scrollY - 60);';"
        : `const s = document.createElement('div'); s.style.cssText = 'height:320px;overflow:auto;position:relative'; G.before(s); s.style.height = '450px'; s.appendChild(${blk(150, "e14-pre")}); s.appendChild(G); s.appendChild(${blk(1200, "e14-tail")}); G.style.position = 'sticky'; G.style.top = '0px'; G.style.background = '#fff'; ctx.ref = G; ctx.sc = s; ctx.noCentre = true; ctx.after = 'scrollBy(0, ctx.sc.getBoundingClientRect().top - 20);';`;
      const hooks = Array.from({ length: 24 }, (_, i) => [6 + i, where === "page" ? "scrollBy(0, 8)" : "ctx.sc.scrollTop += 8"]);
      emit(name, await run(name, { setup, hooks, N: 40 }), (r) => gradeCarry(r));
    }
    const name = "M23 an insert above an unstuck sticky G (layout, a step)";
    emit(name, await run(name, { setup: "G.style.position = 'sticky'; G.style.top = '0px'; const b = document.createElement('div'); G.insertBefore(b, C); ctx.b = b;", hooks: [[8, "ctx.b.style.height = '40px'"]] }), (r) => gradeStep(r));
  }
  // ── M24 · a re-snap after a layout change (Y4: WebKit re-snaps center and end; Chromium does not) ────────────────────────────────
  if (want("M24")) for (const al of ["center", "end", "start"]) {
    const name = `M24 scroll-snap y mandatory, align ${al}: the snapped item grows 300 → 400 px below the root`;
    const setup = `const s = document.createElement('div'); s.style.cssText = 'position:relative;height:300px;overflow:auto;width:600px;scroll-snap-type:y mandatory'; G.before(s); const items = [0, 1, 2, 3, 4].map((i) => { const d = document.createElement('div'); d.style.cssText = 'height:300px;scroll-snap-align:${al}'; s.appendChild(d); return d; }); items[2].appendChild(${blk(20, "e14-pad")}); G.style.padding = '0px'; items[2].appendChild(G); ctx.it = items[2]; ctx.sc = s; ctx.after = 'ctx.sc.scrollTop = 600; scrollBy(0, ctx.sc.getBoundingClientRect().top - 100);'; ctx.noCentre = true;`;
    emit(name, await run(name, { setup, settle: 350, hooks: [[8, "ctx.it.style.height = '400px'"]] }), (r) => gradeStep(r));
  }
  // ── M25 · another ResizeObserver's write in the same resize step (STATED LIMIT: cut on its frame, then glided back) ───────────────
  if (want("M25")) for (const order of ["created before the hold", "created after the hold", "created before the hold, writing in a second delivery round"]) {
    const name = `M25 another ResizeObserver, ${order}, inserts 40 px above the root in its callback · STATED LIMIT (cut ≤ the write)`;
    const mk = (order.includes("second") ? "ctx.ro2 = new ResizeObserver(() => { if (ctx.arm2) { ctx.arm2 = false; ctx.beat2.style.width = '3px'; } }); " : "") + "ctx.ro = new ResizeObserver(() => { if (ctx.arm) { ctx.arm = false; C.insertBefore((() => { const b = document.createElement('div'); b.style.height = '40px'; b.setAttribute('data-t','e14-ro'); return b; })(), root); } }); ctx.beat = document.createElement('span'); ctx.beat.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px'; document.body.appendChild(ctx.beat); ctx.ro.observe(ctx.beat);" + (order.includes("second") ? " ctx.beat3 = document.createElement('span'); ctx.beat3.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;display:block'; document.body.appendChild(ctx.beat3); ctx.beat2 = document.createElement('span'); ctx.beat2.style.cssText = 'display:block;width:1px;height:1px'; ctx.beat3.appendChild(ctx.beat2); ctx.ro.observe(ctx.beat2); ctx.ro2.observe(ctx.beat3);" : "");
    const r = await run(name, { setup: order.includes("before") ? mk : "", post: order.includes("after") ? `(${new Function("ctx", "C", "root", mk).toString()})(ctx, document.querySelector(${JSON.stringify(R)}).parentElement, document.querySelector(${JSON.stringify(R)}))` : null, hooks: [[8, order.includes("second") ? "ctx.arm2 = true; ctx.arm = true; ctx.beat3.style.width = '2px'" : "ctx.arm = true; ctx.beat.style.width = '2px'"]], AT: 8, N: 45 });
    emit(name, r, (x) => { const [, line, d] = gradeStep(x, { noGlideOk: true }); return [d.jump <= 40.5 ? "PASS" : "FAIL", `${line} · the limit: a cut ≤ the write (40 px) + 0.5`]; });
  }
  // ── M26 · an !important translate on the host: refused loud at the hold, once ──────────────────────────────────────────────────
  if (want("M26")) for (const [nm, setup, loud] of [["sheet translate: 10px 0 !important", "const st = document.createElement('style'); st.textContent = '.e14i { translate: 10px 0 !important }'; document.head.appendChild(st); root.classList.add('e14i');", true], ["inline translate: 0 0 !important", "root.style.setProperty('translate', '0px 0px', 'important');", true], ["translate: none !important", "const st = document.createElement('style'); st.textContent = '.e14i { translate: none !important }'; document.head.appendChild(st); root.classList.add('e14i');", true], ["transform: rotate(2deg) !important (control)", "const st = document.createElement('style'); st.textContent = '.e14i { transform: rotate(2deg) !important }'; document.head.appendChild(st); root.classList.add('e14i');", false]]) {
    const name = `M26 ${nm} on the held root`;
    const r = await run(name, { setup, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]], N: 30, read: "const a = root.animate([{ translate: '40px 0px' }, { translate: '40px 0px' }], { duration: 1e6, composite: 'add' }); a.pause(); const q0 = root.getBoundingClientRect().left; a.cancel(); const q1 = root.getBoundingClientRect().left; return { probe: q0 - q1 };" });
    emit(name, r, (x) => { const n = x.errs.filter((e) => /translate|important/i.test(e)).length; const blocks = Math.abs(x.extra?.probe ?? 0) < 0.01; const [sv, sline] = gradeStep(x); const ok = blocks ? (loud ? n === 1 : n === 0) : n === 0 && sv === "PASS";
      if (!blocks) return [ok ? "PASS" : "FAIL", `a (40, 0) probe on the held root moves it ${f(x.extra?.probe ?? NaN, 3)} px in ${engine}: the declaration does not block the animation here (H14 finding W-3), so no refusal is owed: errors ${n} (bound 0), and the step is glided · ${sline}`]; return [ok ? "PASS" : "FAIL", `errors naming the translate or !important at the hold: ${n} (bound ${loud ? "exactly 1: refused loud, once" : "0: the control's probe moves"}) · ${x.errs.slice(0, 1).map((e) => e.slice(0, 140)).join("") || "no error"} · glides ${x.out.at(-1).glides} · the hold's probe from a task moves the root ${f(x.extra?.probe ?? NaN, 3)} px (blocked: the step is cut, as b.10 states) · ${sline}`]; });
  }
  // ── M27 · step trains and slow ramps (b.6): a train every frame carried after its onset; every second frame glided at each step ────
  if (want("M27")) {
    for (const [nm, every, px] of [["16 px every frame for 12 frames", 1, 16], ["16 px every second frame, 6 steps", 2, 16], ["8 px every frame for 12 frames", 1, 8], ["40 px every second frame, 6 steps", 2, 40]]) {
      const name = `M27 a train of inserts above the root · ${nm}`;
      const hooks = Array.from({ length: every === 1 ? 12 : 6 }, (_, i) => [8 + i * every, `C.insertBefore(${blk(px)}, root)`]);
      const r = await run(name, { hooks, N: 50 });
      emit(name, r, (x) => { const S = x.out; const g = S.at(-1).glides; const steps = hooks.map(([n]) => { const i = S.findIndex((y) => y.n >= n); if (i < 3) return NaN; const vel = (a, b) => { const k = NOM / Math.max(1, b.t - a.t); return [(b.x - a.x) * k, (b.y - a.y) * k]; }; const v1 = vel(S[i - 1], S[i]), v0 = vel(S[i - 2], S[i - 1]), vm = vel(S[i - 3], S[i - 2]); return Math.max(0, Math.hypot(v1[0] - v0[0], v1[1] - v0[1]) - Math.hypot(v0[0] - vm[0], v0[1] - vm[1])); });
        const ok = every === 1 ? g <= 2 && steps[0] <= 0.5 : g >= 6 && steps.every((s) => s <= 0.5); return [ok ? "PASS" : "FAIL", `glides ${g} (bound ${every === 1 ? "≤ 2: the onset, carried after" : "≥ 6: each step glided"}) · on each insert's frame the break of the root's own motion, less the running glide's own change of velocity, [${steps.map((s) => f(s, 2)).join(" ")}] px (bound ${every === 1 ? "≤ 0.5 at the onset" : "≤ 0.5 each"}) · errors ${x.errs.length}`]; });
    }
    for (const rate of [0.2, 0.5, 1, 2]) {
      const name = `M27 a slow margin ramp above C · ${rate} px a frame`;
      const setup = `const sp = document.createElement('div'); sp.setAttribute('data-t','e14-ramp'); G.insertBefore(sp, C); ctx.loop = (n) => { if (n >= 8 && n < 50) { ctx.m = (ctx.m ?? 0) + ${rate}; sp.style.marginTop = ctx.m.toFixed(2) + 'px'; } };`;
      emit(name, await run(name, { setup, N: 55 }), (x) => { const g = x.out.at(-1).glides; return [g <= 2 ? "PASS" : "FAIL", `glides over the ramp ${g} (bound ≤ 2: the onset and one uneven frame; Y8 reads 0-1 at ≤ 200 px/s) · errors ${x.errs.length}`]; });
    }
  }
  // ── M28 · M5 × M18: a sine carrier with a ramp inside it (−Δ: no carrier acceleration glided) ─────────────────────────────────────
  if (want("M28")) {
    const name = "M28 sine 80 px / 600 ms on C with a 2 px a frame margin ramp inside C above the root";
    const setup = `${loopSrc("sine", 80, 600)} const sp = document.createElement('div'); C.insertBefore(sp, root); const lp = ctx.loop; ctx.loop = (n) => { if (n >= 10 && n < 40) { ctx.m = (ctx.m ?? 0) + 2; sp.style.marginTop = ctx.m + 'px'; } };`;
    emit(name, await run(name, { setup, hooks: [[4, "ctx.go = performance.now()"]], N: 50 }), (x) => { const g = x.out.at(-1).glides; return [g <= 2 ? "PASS" : "FAIL", `glides ${g} (bound ≤ 2: the ramp's onset and one uneven frame; the carrier's acceleration is not in −Δ) · errors ${x.errs.length}`]; });
  }
  // ── M29 · the released host's subtree holds animations that never settle: the stage leaves at its exit bound, the loop stops ───────
  if (want("M29")) for (const [nm, css] of [["a paused finite animation", "animation: e14p 2s linear infinite paused"], ["a view() timeline animation", "animation: e14p linear both; animation-timeline: view()"], ["a 10 s finite animation", "animation: e14p 10s linear"], ["nothing (control)", ""]]) {
    const name = `M29 the released host's subtree holds ${nm}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { init: [() => { const o = window.requestAnimationFrame.bind(window); window.__rafN = 0; window.requestAnimationFrame = (cb) => o((t) => { window.__rafN++; cb(t); }); }, null] });
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '@keyframes e14p { from { opacity: 1 } to { opacity: 0.99 } } .e14sub { ${css} }'; document.head.appendChild(st); const d = document.createElement('span'); d.className = 'e14sub'; d.textContent = '.'; root.appendChild(d);`, {}]);
        await P.page.waitForTimeout(400); const n0 = await P.page.evaluate(() => window.__rafN); await P.page.waitForTimeout(1000); const base = (await P.page.evaluate(() => window.__rafN)) - n0;
        const eng = await kbd(P); await P.page.keyboard.press(tabKey(engine));
        const clock = await P.page.evaluate((tok) => { const p = document.createElement("div"); p.style.transitionDuration = `var(${tok})`; document.body.appendChild(p); const d = getComputedStyle(p).transitionDuration; p.remove(); return /ms/.test(d) ? parseFloat(d) : parseFloat(d) * 1000; }, CLOCK);
        await P.page.waitForTimeout(Math.max(0, clock) + 700); const n1 = await P.page.evaluate(() => window.__rafN); await P.page.waitForTimeout(1000); const after = (await P.page.evaluate(() => window.__rafN)) - n1;
        const stage = await P.page.evaluate((R) => document.querySelector(R).hasAttribute("data-engage-stage"), R);
        return { eng, st: { vis: true }, base, after, clock, stage, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => [x.after <= x.base && !x.stage ? "PASS" : "FAIL", `rAF callbacks a second at rest before the hold ${x.base}, after release + the clock ${f(x.clock, 0)} ms + 700 ms: ${x.after} (bound ≤ the rest's) · the root still on the stage (data-engage-stage) ${x.stage} · errors ${x.errs.length}`]);
  }
  // ── M30 · the declared read under the host's transition: a class arriving under transition-all (allow-discrete), a token at runtime ──
  if (want("M30")) for (const [nm, tcss, mode] of [["transition: all 300ms linear allow-discrete · the class arrives 40 ms before the hold", "all 300ms linear allow-discrete", "arrive"], ["transition: all 300ms linear · the clock token changed at runtime 60 ms before the act", "all 300ms linear", "runtime"], ["transition-property: all; 150ms · the clock token changed at runtime", "all 150ms", "runtime"], ["no transition (control) · the clock token changed at runtime", "none", "runtime"]]) {
    const name = `M30 the held root's ${nm}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '.e14t { transition: ${tcss} }'; document.head.appendChild(st); ${mode === "runtime" ? "root.classList.add('e14t');" : ""}`, {}]);
        await P.page.waitForTimeout(200);
        if (mode === "arrive") { await P.page.evaluate((R) => document.querySelector(R).classList.add("e14t"), R); await P.page.waitForTimeout(40); }
        const eng = await kbd(P);
        if (mode === "runtime") { await P.page.evaluate((tok) => document.documentElement.style.setProperty(tok, "0.5s"), CLOCK); await P.page.waitForTimeout(60); }
        const want_ = await P.page.evaluate((tok) => { const p = document.createElement("div"); p.style.transitionDuration = `var(${tok})`; document.body.appendChild(p); const d = getComputedStyle(p).transitionDuration; p.remove(); return /ms/.test(d) ? parseFloat(d) : parseFloat(d) * 1000; }, CLOCK);
        const out = await P.page.evaluate(FILM, [R, ENG, 20, [[4, `C.insertBefore(${blk(40)}, root)`]]]);
        return { eng, st: { vis: true }, want: want_, durs: [...new Set(out.flatMap((x) => x.an))], errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { const ok = x.errs.length === 0 && x.durs.length > 0; const near = x.durs.some((d) => Math.abs(d - x.want) <= 2 || Math.abs(d - x.want * 1) <= 2);
      return [ok ? "PASS" : "FAIL", `errors ${x.errs.length}${x.errs[0] ? ` (${x.errs[0].slice(0, 140)})` : ""} (bound 0: no false refusal) · the glide ran [${x.durs.map((d) => f(d, 0)).join(",")}] ms; the consumer's var(${CLOCK}) computes ${f(x.want, 0)} ms${near ? "" : " (REPORT: the glide's clock is the row's, × the tempo where the build multiplies it)"}`]; });
  }
  // ── M30 · Chip's static ↔ selectable switch (X9): the re-mounted host's declared read at the next hold, within one transition ────
  // The chip scene opens static (?chipmode=static), switches to selectable through __e.chipMode, and is pressed and held 40 ms later
  // (inside any transition's duration). PASS: no error at the hold (no false loud refusal), and the press reaches the host (engaged or
  // pressed). Then the reverse switch, held after the chip is static again: no error (a static chip has no hold). Library only.
  if (want("M30") && !fixture && idx.chip) for (const [from, to] of [["static", "selectable"], ["selectable", "static"]]) {
    const name = `M30 Chip's ${from} → ${to} switch, held 40 ms after it (X9)`;
    const r = await guard(name, async () => { const P = await openPage(E, T, "chip", { q: { chipmode: from } });
      try { await P.page.waitForTimeout(200); await P.page.evaluate((m) => window.__e.chipMode(m), to); await P.page.waitForTimeout(40);
        const el = await P.page.$(".glass-chip"); if (!el) return { none: true };
        const c = await center(P.page, ".glass-chip"); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
        const hit = await P.page.evaluate(() => { const h = document.querySelector(".glass-chip"); return { tag: h.tagName.toLowerCase(), held: h.hasAttribute("data-held") || h.hasAttribute("data-engaged") || h.matches(":active") }; });
        await P.page.mouse.up(); await P.page.waitForTimeout(200); return { hit, errs: errsOf(P) }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.none) { cell(name, "UNMEASURED", "NOT DRIVEN: no chip after the switch"); continue; }
    const ok = r.errs.length === 0 && (to === "static" || r.hit.held);
    cell(name, ok ? "PASS" : "FAIL", `the host after the switch <${r.hit.tag}>, ${to === "selectable" ? `the press reached it: ${r.hit.held}` : "static (no hold owed)"} · errors ${r.errs.length}${r.errs[0] ? ` (${r.errs[0].slice(0, 140)})` : ""} (bound 0: no false loud refusal)`);
  }
  // ── M11 · the NumberField scrub 9 → 10, field-sizing content (CE13c D5; class 6 (e): the drive that did not engage in WebKit) ─────
  // Two drives, in order, the first that engages is graded and named: (1) Playwright's mouse, 3 px a step at 30 ms (CE13c's drive);
  // (2) pointer events dispatched on the input in the page (pointerdown / pointermove / pointerup, pointerId 1, buttons 1, isPrimary,
  // pointerType mouse), the same path at the same pace. The first drive leaves WebKit's mouse-down text selection to the engine; the second
  // does not depend on it. A build with no scrub (HEAD) is UNMEASURED, said so. Library only.
  if (want("M11") && !fixture) for (const row of ["flex-start", "center"]) {
    const name = `M11 the NumberField scrub 9 → 10 · ${row} row · field-sizing content (b.5; class 6 (e))`;
    const r = await guard(name, async () => {
      for (const drive of ["mouse", "dispatched pointer events"]) {
        const P = await openPage(E, T, "gallery", {});
        try {
          const ok0 = await P.page.evaluate((row) => { const f = document.querySelector(".number-field"); if (!f) return null; const inp = f.querySelector("input"); const w = f.parentElement;
            document.documentElement.style.overflowAnchor = "none"; w.style.display = "flex"; w.style.justifyContent = row; w.style.width = "400px";
            inp.style.fieldSizing = "content"; inp.style.width = "auto"; inp.style.minWidth = "0"; f.style.width = "auto"; f.style.flex = "none";
            f.scrollIntoView({ block: "center" }); return { fs: CSS.supports("field-sizing", "content"), v: inp.value, pitch: getComputedStyle(inp).getPropertyValue("--scrub-pitch").trim() }; }, row);
          if (!ok0) return { none: "no NumberField in the gallery scene" };
          if (!ok0.pitch) return { none: "this build has no scrub (no --scrub-pitch on the input)" };
          const c = await center(P.page, ".number-field input");
          const pf = P.page.evaluate(() => new Promise((ok) => { const fe = document.querySelector(".number-field"), inp = fe.querySelector("input"); const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
            const seen = new Set(); const out = []; const mc = new MessageChannel(); let n = 0; const t0 = performance.now();
            mc.port1.onmessage = () => { const r = fe.getBoundingClientRect(); for (const a of fe.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate"))) seen.add(a); out.push({ n, t: performance.now() - t0, l: r.left, ol: fe.offsetLeft, ow: fe.offsetWidth, v: inp.value, glides: seen.size, eng: fe.hasAttribute("data-held") || fe.hasAttribute("data-engaged") }); };
            const tick = () => { n++; mc.port2.postMessage(0); if (performance.now() - t0 < 2600) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }));
          if (drive === "mouse") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); for (let i = 1; i <= 50; i++) { await P.page.mouse.move(c.x + i * 3, c.y); await P.page.waitForTimeout(30); } }
          else { await P.page.evaluate(([x, y]) => { const inp = document.querySelector(".number-field input"); const ev = (t, X, b) => inp.dispatchEvent(new PointerEvent(t, { bubbles: true, cancelable: true, composed: true, pointerId: 1, isPrimary: true, pointerType: "mouse", button: t === "pointermove" ? -1 : 0, buttons: b, clientX: X, clientY: y }));
              ev("pointerdown", x, 1); let i = 0; window.__scrubT = setInterval(() => { i++; ev("pointermove", x + i * 3, 1); if (i >= 50) clearInterval(window.__scrubT); }, 30); }, [c.x, c.y]); await P.page.waitForTimeout(50 * 30 + 60); }
          const out = await pf;
          if (drive === "mouse") await P.page.mouse.up(); else await P.page.evaluate(([x, y]) => document.querySelector(".number-field input").dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1, isPrimary: true, pointerType: "mouse", button: 0, buttons: 0, clientX: x + 150, clientY: y })), [c.x, c.y]);
          const vals = [...new Set(out.map((x) => x.v))];
          if (out.some((x) => x.eng) && vals.includes("10")) return { out, ok0, drive, errs: errsOf(P), st: { vis: true }, eng: true };
          if (drive !== "mouse") return { undriven: `neither drive engaged the scrub (values ${vals.join(" → ")}; engaged on ${out.filter((x) => x.eng).length} frames; field-sizing ${ok0.fs})` };
        } finally { await P.close(); }
      }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.none) { cell(name, "UNMEASURED", `NOT DRIVEN: ${r.none}`); continue; }
    if (r.undriven) { cell(name, "UNMEASURED", `NOT DRIVEN: ${r.undriven} · the drive's limit, stated with its read`); continue; }
    const S = r.out; const k = S.findIndex((x, i) => i > 0 && S[i - 1].v === "9" && x.v === "10"); const vals = [...new Set(S.map((x) => x.v))].join(" → ");
    if (k < 0) { cell(name, "UNMEASURED", `NOT DRIVEN: drive ${r.drive} engaged but the value never went 9 → 10 (values ${vals})`); continue; }
    const pre = S[k - 1], W = S.slice(k, k + 20); const lead = Math.max(...W.map((x) => Math.abs(x.l - pre.l))); const lay = W.at(-1).ol - pre.ol; const grew = W.at(-1).ow - pre.ow; const glides = W.at(-1).glides - pre.glides;
    // b.5: a left-aligned row keeps its leading edge still in layout, so its paint holds; centred, the paint follows layout (the host's own size, not glided)
    const ok = pre.eng && glides === 0 && (row !== "flex-start" || lead <= 0.5);
    cell(name, ok ? "PASS" : "FAIL", `drive ${r.drive} · values ${vals} · at 9 → 10 the field grew ${f(grew, 1)} px in layout, its leading edge moved ${f(lay, 1)} px in layout and up to ${f(lead, 2)} px in paint over the next 20 frames (bound ≤ 0.5 left-aligned) · glides started at the change ${glides} (bound 0) · field-sizing ${r.ok0.fs} · pitch ${r.ok0.pitch} · errors ${r.errs.length}`);
  }
  // ── residue (class 3, CK-22 MIGRATION row 2): no style="" on any engagement host at load, against a never-mounted tree ──────────
  if (want("residue") && !fixture) for (const s of ["switch", "checkbox", "button", "tabs", "chip"]) {
    if (!idx[s]) continue; const name = `residue · ${s} · no style="" written by a read at load`;
    const r = await guard(name, async () => { const P = await openPage(E, T, s, {}); try { await P.page.waitForTimeout(300); return { st: { vis: true }, eng: true, v: await P.page.evaluate(() => [...document.querySelectorAll("main [style=''], [data-scene] [style='']")].map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(" ").slice(0, 2).join(".")}`)), errs: errsOf(P) }; } finally { await P.close(); } }, 30000);
    emit(name, r, (x) => [x.v.length === 0 ? "PASS" : "FAIL", `elements carrying an empty style attribute at load: ${x.v.length} (bound 0)${x.v.length ? ` · ${x.v.slice(0, 4).join(", ")}` : ""}`]);
  }
  // ── cost (class 4, CK-23; CE13c D10): the held drag's forced work, Chromium CDP only, REPORT ───────────────────────────────────
  if (want("cost")) {
    if (engine !== "chromium") cell("cost · the held drag's forced work", "REPORT", "Chromium CDP only; not read in WebKit");
    else for (let round = 1; round <= 2; round++) {
      const name = `cost · the held drag's forced work · round ${round}`;
      const r = await guard(name, async () => { const P = await openPage(E, T, sc, {}); try { await P.page.evaluate(SETUP, [R, "", {}]); const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); const met = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(400); const a0 = await met(); for (let i = 1; i <= 60; i++) { await P.page.mouse.move(c.x + 60 * Math.sin(i / 6), c.y); await P.page.waitForTimeout(16); } const a1 = await met(); await P.page.mouse.up();
        return { lay: a1.LayoutCount - a0.LayoutCount, rec: a1.RecalcStyleCount - a0.RecalcStyleCount, lms: (a1.LayoutDuration - a0.LayoutDuration) * 1000, rms: (a1.RecalcStyleDuration - a0.RecalcStyleDuration) * 1000, sms: (a1.ScriptDuration - a0.ScriptDuration) * 1000 }; } finally { await P.close(); } }, 60000);
      cell(name, "REPORT", r.crashed ? r.line : `60 pointer moves of a held thumb over ~1.2 s: layouts ${r.lay}, style recalcs ${r.rec}, layout ${f(r.lms, 1)} ms, recalc ${f(r.rms, 1)} ms, script ${f(r.sms, 1)} ms`);
    }
  }
}, 3600);
