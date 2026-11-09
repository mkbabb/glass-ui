// film.mjs · the film kit E-14 and E-15 share (H15, D5 pass 15): the scene dress, the film, the map's stretch, and the graders.
// One source (P-1): E-14's framework (H14, e14-s14.mjs lines 18-113 at 7e79063a4b00) moved here unchanged but for two cures by rule:
//   class 7 (REGISTRY §P14-5; S15-c): the film reads the root's place AFTER the frame's resize step, in a ResizeObserver callback the film
//            creates after the hold (so after the stage's own observer, which a build creates at the hold), on a beat element nested deeper
//            than any scene node, so its observation is delivered last in the step's first round and no later round re-delivers the
//            stage's host before it. It never reads in a message posted from rAF alone (that read can run after a load task and force a
//            layout no frame painted: K4, CA13c's `norec link`, H14's W-1).
//   class 8 (REGISTRY §P14-5): a WebKit cell graded on its act's frame whose film repeats a sample near the act (two reads < 4 ms apart, the
//            shape of WKR1's drift under load) is read again before it grades, up to two more reads; the first read with no repeat grades;
//            if every read repeats, the cell is UNMEASURED with its reads.
import { openPage, scenesFor, center, tabKey, f, rowsOf, rowFacts, rodeRow } from "./lib.mjs";

export const NOM = 1000 / 60;
export const blk = (h, t = "e14-block") => `(() => { const b = document.createElement('div'); b.style.height = '${h}px'; b.setAttribute('data-t', '${t}'); return b; })()`;
// the page side: the common dress, then the cell's own setup source (root, C, G, mn, ctx)
export const SETUP = ([R, src, o]) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body;
  if (!o.anchor) document.documentElement.style.overflowAnchor = "none";
  mn.style.paddingTop = "230px"; mn.style.paddingBottom = o.noPad ? "0px" : "1600px";
  const ctx = (window.__ctx = { errs0: 0 });
  // the film's beat (class 7), laid before the hold so no record of it falls inside one: a fixed box 48 levels deep whose width a WAAPI
  // animation changes on every frame (no DOM write), so the film's observer is delivered on every frame, last in the step's first round
  if (!window.__beat) { const h = document.createElement("div"); h.style.cssText = "position:fixed;left:0;top:0;width:0;height:0;overflow:visible;pointer-events:none;visibility:hidden"; h.setAttribute("data-t", "film-beat"); let b = h;
    for (let i = 0; i < 48; i++) { const d = document.createElement("div"); b.appendChild(d); b = d; } b.style.cssText = "width:1px;height:1px"; document.body.appendChild(h);
    b.animate([{ width: "1px" }, { width: "100001px" }], { duration: 100000, iterations: Infinity }); window.__beat = b; }
  new Function("root", "C", "G", "mn", "ctx", src)(root, C, G, mn, ctx);
  if (!ctx.noCentre) { const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2); }
  if (ctx.after) new Function("root", "C", "G", "mn", "ctx", ctx.after)(root, C, G, mn, ctx);
  const q = root.getBoundingClientRect(), g = G.getBoundingClientRect(); return { vis: q.bottom > 0 && q.top < innerHeight, y: q.top, sy: scrollY, gt: g.top, gb: g.bottom, gst: G.scrollTop, gsh: G.scrollHeight, gch: G.clientHeight };
};
// the film (class 7): the act and the page's loop run in the film's rAF callback; the read runs in the film's own resize observation of the
// same frame, after the stage's. `read` is the frame's whole sample; `t` the frame's timeline time.
export const FILM = ([R, ENG, N, hooks]) => new Promise((ok) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body; const ctx = window.__ctx ?? (window.__ctx = {});
  const HK = hooks.map(([n, src]) => [n, new Function("root", "C", "G", "mn", "ctx", src)]);
  const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
  const seen = new Set(); const out = []; let n = 0, done = false; const t0 = document.timeline.currentTime;
  const X = () => ctx.ref ? (typeof ctx.ref === "string" ? document.querySelector(ctx.ref) : ctx.ref) : C;
  const beat = window.__beat; if (!beat) throw new Error("the film's beat is laid by SETUP");
  const read = () => { const r = root.getBoundingClientRect(), c = C.getBoundingClientRect(), x = X()?.getBoundingClientRect?.() ?? c; const sc = ctx.sc ? (typeof ctx.sc === "string" ? document.querySelector(ctx.sc) : ctx.sc) : G;
    const g = root.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate")); for (const a of g) seen.add(a);
    out.push({ n, t: document.timeline.currentTime - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, rr: r.right, tp: r.top, b: r.bottom, w: r.width, h: r.height, ow: root.offsetWidth, z: root.currentCSSZoom ?? 1,
      cx: c.left + c.width / 2, cy: c.top + c.height / 2, xl: x.left, xt: x.top, xw: x.width, xh: x.height, sy: scrollY, sst: sc?.scrollTop ?? 0,
      glides: seen.size, an: g.filter((a) => a.playState === "running").map((a) => a.effect.getTiming().duration), eng: root.matches(ENG) || !!root.closest(ENG), stage: root.hasAttribute("data-engage-stage"), v: ctx.v ?? null }); };
  const end = () => { if (done) return; done = true; ro.disconnect(); setTimeout(() => ok(out), 40); };
  let last = -1; const ro = new ResizeObserver(() => { if (done || n === 0 || n === last) return; last = n; read(); if (n >= N) end(); });
  ro.observe(beat);
  const tick = () => { n++; for (const [k, fn] of HK) if (k === n) fn(root, C, G, mn, ctx); if (ctx.loop) ctx.loop(n); if (n < N) requestAnimationFrame(tick); else setTimeout(end, 1000); };
  requestAnimationFrame(tick);
});
// the painted path of a glide under a projective card is not uniform in its translate: the 16.7 ms bound takes the map's own stretch
// along that path, read on the page after the film: the translate that paints the root back at `pre` (Newton, the map re-asked, 8 steps),
// then the painted path P(λ·t) at λ = 0, 0.1 .. 1; the stretch is the largest tenth over the mean tenth (1 for an affine map)
export const MAG = ([R, pre]) => { const root = document.querySelector(R);
  const pr = (t) => { const a = root.animate([{ translate: t[0] + "px " + t[1] + "px" }, { translate: t[0] + "px " + t[1] + "px" }], { duration: 1e6, composite: "add" }); a.pause(); const q = root.getBoundingClientRect(); a.cancel(); return [q.left + q.width / 2, q.top + q.height / 2]; };
  let t = [0, 0]; for (let i = 0; i < 8; i++) { const p = pr(t), px = pr([t[0] + 2, t[1]]), py = pr([t[0], t[1] + 2]); const a = (px[0] - p[0]) / 2, b = (py[0] - p[0]) / 2, c = (px[1] - p[1]) / 2, d = (py[1] - p[1]) / 2; const r = [pre[0] - p[0], pre[1] - p[1]]; if (Math.hypot(...r) < 0.05) break; const det = a * d - b * c || 1; t = [t[0] + (d * r[0] - b * r[1]) / det, t[1] + (-c * r[0] + a * r[1]) / det]; }
  const P = Array.from({ length: 11 }, (_, k) => pr([t[0] * k / 10, t[1] * k / 10])); const seg = P.slice(1).map((q, k) => Math.hypot(q[0] - P[k][0], q[1] - P[k][1])); const tot = seg.reduce((x, y) => x + y, 0);
  return { m: tot > 0.5 ? Math.max(...seg) * 10 / tot : 1, res: Math.hypot(P[10][0] - pre[0], P[10][1] - pre[1]) }; };

// the witness side: the held control (the E-13 row with a loupe and no clip), its drives, one film cell, and the graders
export function filmKit({ E, T, cell, guard, idx, engine }) {
  const fixture = T.kind === "fixture";
  const found = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip); if (!found) throw new Error("no E-13 row with a loupe and no clip");
  // engaged: the row's selector, or the hand's register any build writes (HEAD's slider marks a pointer hold with data-held only)
  const [sc, m] = found; const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[data-e~="thumb"]', ENG = `${m.engaged ?? "[data-engaged]"}, [data-held]`;
  // the glide's clock token: the library's dock row (stage.ts glide), the fixture's travel row (fixtures.mjs travelOf)
  const CLOCK = fixture ? "--spring-press-settle" : "--spring-dock-settle";
  const errsOf = (P) => P.errors.filter((e) => /\[glass-ui\]|\[fixture\]|pageerror/i.test(e));
  const kbd = async (P) => { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); return P.page.evaluate(([R, ENG]) => { const r = document.querySelector(R); return r.matches(ENG) || !!r.closest(ENG); }, [R, ENG]); };
  const ptr = async (P) => { const k = await center(P.page, TH); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down(); await P.page.waitForTimeout(600); return P.page.evaluate(([R, ENG]) => { const r = document.querySelector(R); return r.matches(ENG) || !!r.closest(ENG); }, [R, ENG]); };
  // one film cell: setup → (pre) → engage → film; every page, context and the browser closed by the wrapper and guard
  const film1 = async (name, c) => guard(name, async () => {
    const P = await openPage(E, T, sc, c.open ?? {});
    try {
      // a late resource (S15-c's M9): /__h15/late.css and /__h15/late.svg, each served `ms` after its request; 40 px tall
      if (c.late) await P.page.route("**/__h15/**", async (rt) => { const u = new URL(rt.request().url()); await new Promise((ok) => setTimeout(ok, Number(u.searchParams.get("ms") ?? 0)));
        if (u.pathname.endsWith(".css")) await rt.fulfill({ status: 200, contentType: "text/css", body: ".e15l { height: 40px }" }); else await rt.fulfill({ status: 200, contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="40"/>' }); });
      const st = await P.page.evaluate(SETUP, [R, c.setup ?? "", c.o ?? {}]); await P.page.waitForTimeout(c.settle ?? 200);
      const rows = await P.page.evaluate(rowsOf);
      if (c.pre) await P.page.evaluate((src) => new Function("ctx", src)(window.__ctx), c.pre);
      let eng = c.drive === "pointer" ? await ptr(P) : await kbd(P); let drove = c.drive === "pointer" ? "pointer" : "keyboard";
      if (!eng && c.drive !== "pointer" && !c.kbdOnly) { eng = await ptr(P); drove = "pointer (the keyboard did not engage this build)"; c.drive = "pointer"; }
      if (c.post) await P.page.evaluate((src) => new Function("ctx", src)(window.__ctx), c.post);
      try {
        const out = await P.page.evaluate(FILM, [R, ENG, c.N ?? 50, c.hooks ?? []]);
        const extra = c.read ? await P.page.evaluate(([R, src]) => new Function("root", "ctx", src)(document.querySelector(R), window.__ctx), [R, c.read]) : null;
        let mag = null; if (c.mag) { const i0 = out.findIndex((x) => x.n >= (c.AT ?? 8)); const pre = out[i0 - 1]; if (pre) { await P.page.evaluate(() => { for (const a of document.getAnimations()) try { a.finish(); } catch {} }).catch(() => {}); mag = await P.page.evaluate(MAG, [R, [pre.x, pre.y]]); } }
        return { out, st, rows, eng, extra, mag, drove, errs: errsOf(P), AT: c.AT ?? 8 };
      } finally { if (c.drive === "pointer") await P.page.mouse.up(); }
    } finally { await P.close(); }
  }, 60000);
  // one film cell with class 8's rule: in WebKit a read that repeats a sample within two frames of the act's is read again (≤ 2 more)
  // before it grades; the first read with no repeat is the one graded, and if all three repeat the cell is UNMEASURED
  const run = async (name, c) => { let r = await film1(name, { ...c }); if (engine !== "webkit") return r; const notes = [];
    for (let k = 0; k < 2 && repeats(r, c.AT ?? 8); k++) { const S = r.out, i0 = S.findIndex((x) => x.n >= (c.AT ?? 8)); notes.push(`read ${k + 1} repeated a sample near the act (frame times ${S.slice(Math.max(0, i0 - 2), i0 + 3).map((x) => f(x.t, 1)).join(", ")} ms): read again (class 8)`); r = await film1(name, { ...c }); }
    if (repeats(r, c.AT ?? 8)) { r.unrepeatable = true; notes.push("read 3 repeated too: not graded (class 8)"); }
    if (notes.length && !r.crashed) r.note = [r.note, ...notes].filter(Boolean).join(" · "); return r; };
  // class 8: a sample within 4 ms of the one before it, within two frames of the act's (WebKit's repeated first sample under load)
  function repeats(r, AT) { if (!r?.out?.length) return false; const S = r.out; const i0 = S.findIndex((x) => x.n >= AT); if (i0 < 1) return false; for (let i = Math.max(1, i0 - 2); i <= Math.min(S.length - 1, i0 + 2); i++) if (S[i].t - S[i - 1].t < 4) return true; return false; }
  // ── grades ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  const notDriven = (r) => (!r.eng ? "NOT DRIVEN: the root was not engaged" : !r.st.vis ? `NOT DRIVEN: the root is not in the viewport after the setup (${JSON.stringify(r.st)})` : null);
  const around = (r) => { const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); return { S, i0, pre: S[i0 - 1], first: S[i0], end: S.at(-1) }; };
  const step17 = (W, from) => { const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const p = W[i - 1], q = W[i]; return p[k] + ((q[k] - p[k]) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return W.at(-1)[k]; };
    let st = 0, sa = NaN; for (const x of W) if (x.t - W[0].t >= NOM) { const d = Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")); if (d > st) { st = d; sa = x.t - from; } } return [st, sa]; };
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
  // M27 by superposition (class 3, REGISTRY §P14-4; C-E14's B1): the glides compose by `composite: add`, so a train's ideal paint is the
  // sum of one step's painted path shifted to each step's frame time. `one` films one step at frame 8, `tr` the train; the train's departure
  // from the prediction is read on every frame after the first step (bound ≤ 0.5 + the prediction's own interpolation error)
  const superpose = (one, tr, steps) => {
    const A = one.out, Bf = tr.out; const ia = A.findIndex((x) => x.n >= 8), ib = Bf.findIndex((x) => x.n >= 8); const a0 = A[ia - 1], b0 = Bf[ib - 1];
    const ts = A.slice(ia).map((x) => x.t - A[ia].t), ys = A.slice(ia).map((x) => x.y - a0.y);
    const gA = (tau) => { if (tau < 0) return 0; for (let i = 1; i < ts.length; i++) if (ts[i] >= tau) return ys[i - 1] + (ys[i] - ys[i - 1]) * (tau - ts[i - 1]) / Math.max(1e-6, ts[i] - ts[i - 1]); return ys.at(-1); };
    const T0 = Bf.filter((x) => steps.includes(x.n)).map((x) => x.t);
    const dev = Bf.slice(ib).map((x) => { const pred = T0.filter((t0) => x.t >= t0).reduce((s, t0) => s + gA(x.t - t0), 0); return { n: x.n, d: x.y - b0.y - pred }; });
    const atSteps = dev.filter((x) => steps.includes(x.n)).map((x) => Math.abs(x.d)); const mx = Math.max(...dev.map((x) => Math.abs(x.d)));
    const curv = Math.max(0, ...A.slice(ia + 1, ia + 20).map((x, k) => Math.abs((x.y - A[ia + k].y) - (A[ia + k].y - (ia + k - 1 >= 0 ? A[ia + k - 1].y : A[ia + k].y)))));
    return { mx, atSteps, curv, bound: 0.5 + curv / 4, glides: Bf.at(-1).glides, act: Math.abs(A[ia].y - a0.y) };
  };
  const emit = (name, r, grader) => { if (r.crashed) return cell(name, "FAIL", r.line); if (r.unrepeatable) return cell(name, "UNMEASURED", r.note); const nd = notDriven(r); if (nd) return cell(name, "UNMEASURED", nd); const [v, line] = grader(r); cell(name, v, `${r.drove && r.drove !== "keyboard" ? `drive ${r.drove} · ` : ""}${line}${r.note ? ` · ${r.note}` : ""}`); };
  return { fixture, sc, m, R, TH, ENG, CLOCK, errsOf, kbd, ptr, run, notDriven, around, step17, gradeStep, gradeCarry, superpose, repeats, emit };
}
