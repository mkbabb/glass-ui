#!/usr/bin/env node
// C-E14 attack (D5 pass 14, wave 4, critic): S14 driven past H14 E-14 cells. The framework (SETUP, FILM, MAG, run, the grades) is
// E-14 (harness/e14-s14.mjs lines 18-116) copied unchanged but for the import path, the witness name and one FILM filter: an animation
// with id "c14" is the consumer's own (A2), never counted as a glide. Cells A1..A14 below; each names the S14 row and range it passes.
import { witness, openPage, scenesFor, center, tabKey, f, rowsOf, rowFacts, rodeRow } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

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
    const g = root.getAnimations().filter((a) => !isCss(a) && a.id !== "c14" && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate")); for (const a of g) seen.add(a);
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

await witness("C-E14-atk", "C-E14: S14 attacked past H14 cells (D5 pass 14, wave 4)", async ({ a, E, T, cell, guard, idx, engine }) => {
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

  // ══ C-E14's attack: S14's families driven past H14's cells (each cell names the S14 row and the range it passes) ══════════════
  const loopSrc = (k, A, per, tgt = "C") => {
    const body = k === "ramp" ? `const t = ctx.go ? Math.min(1, (performance.now() - ctx.go) / ${per}) : 0; ctx.v = ${A} * t; ${tgt}.style.translate = '0 ' + ctx.v.toFixed(2) + 'px';`
      : k === "sine" ? `const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; ctx.v = ${A} * Math.sin(2 * Math.PI * t); ${tgt}.style.translate = '0 ' + ctx.v.toFixed(2) + 'px';`
      : `const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; ctx.v = ${A} * Math.sin(2 * Math.PI * t); ${tgt}.style.rotate = ctx.v.toFixed(3) + 'deg';`;
    return `const tick = () => { ${body} requestAnimationFrame(tick); }; requestAnimationFrame(tick);`;
  };
  // the root's centre where a rotation of C about C's centre carries it: c + R(θ)·d, d read on the first engaged frame at θ = ctx.v
  const gradeRot = (r) => { const S = r.out.filter((x) => x.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`];
    const z = S[0]; const th0 = (z.v ?? 0) * Math.PI / 180; const dx0 = z.x - z.cx, dy0 = z.y - z.cy; const c0 = Math.cos(-th0), s0 = Math.sin(-th0); const d = [dx0 * c0 - dy0 * s0, dx0 * s0 + dy0 * c0];
    const dev = S.map((x) => { const th = (x.v ?? 0) * Math.PI / 180; const ex = x.cx + d[0] * Math.cos(th) - d[1] * Math.sin(th), ey = x.cy + d[0] * Math.sin(th) + d[1] * Math.cos(th); return Math.hypot(x.x - ex, x.y - ey); });
    const mx = Math.max(...dev); const g = S.at(-1).glides; const amp = Math.max(...S.map((x) => Math.abs(x.v ?? 0)));
    return [amp < 1 ? "UNMEASURED" : mx <= 0.75 && g === 0 ? "PASS" : "FAIL", `C rotated up to ${f(amp, 2)}° over ${S.length} engaged frames · the root's centre off where C's rotation carries it: max ${f(mx, 2)} px, frames over 2 px ${dev.filter((x) => x > 2).length} (bound ≤ 0.75) · glides started ${g} (bound 0) · errors ${r.errs.length}`]; };
  const rel1 = (x, lim, what) => { const { S, i0, pre, first } = around(x); if (!pre || !first) return ["FAIL", "no frames around the act"]; const carrier = (first.v ?? 0) - (pre.v ?? 0); const rel = Math.hypot(first.x - pre.x, first.y - pre.y - carrier); const dt = first.t - pre.t;
    return [rel <= lim ? "PASS" : "FAIL", `${what} moved ${f(carrier, 2)} px on the act's frame (dt ${f(dt, 1)} ms) · the root's step on that frame less it: ${f(rel, 2)} px (bound ≤ ${f(lim, 2)}) · glides ${S.at(-1).glides} · errors ${x.errs.length}`]; };

  // A1 · M5 past its ranges (amplitude 0-80 px, period 200-600 ms, a translate on C): S14 says the classification reads no transform
  if (want("A1")) {
    for (const [nm, setup, ref] of [["sine 120 px / 150 ms on C", loopSrc("sine", 120, 150), null], ["ramp 200 px / 300 ms on G (C's parent)", loopSrc("ramp", 200, 300, "G"), "G"], ["sine 160 px / 100 ms on C", loopSrc("sine", 160, 100), null]]) {
      const name = `A1 (M5 past range) script-animated ancestor · ${nm}`;
      emit(name, await run(name, { setup: setup + (ref ? " ctx.ref = G;" : ""), hooks: [[6, "ctx.go = performance.now()"]], N: 60 }), (r) => gradeCarry(r));
    }
    let name = "A1 (M5 past range: a rotation loop) a script writing C's rotate ±8° / 400 ms about C's centre";
    emit(name, await run(name, { setup: loopSrc("rot", 8, 400), hooks: [[6, "ctx.go = performance.now()"]], N: 60 }), (r) => gradeRot(r));
    name = "A1 (M5 past range: offset-path) a CSS animation of C's offset-distance along path('M0 0 L0 60'), 400 ms alternate";
    emit(name, await run(name, { setup: "const st = document.createElement('style'); st.textContent = '@keyframes c14od { from { offset-distance: 0% } to { offset-distance: 100% } } .c14od { animation: c14od 400ms linear infinite alternate }'; document.head.appendChild(st); C.style.transformOrigin = '0 0'; C.style.offsetPath = \"path('M0 0 L0 60')\"; C.style.offsetRotate = '0deg';", hooks: [[6, "C.classList.add('c14od')"]], N: 60 }), (r) => gradeCarry(r));
  }
  // A2 · the host's OWN transform animated by the consumer (S14 a.2 lists the host's own transform-family values as carrier; M6 names
  // only ancestors): a WAAPI shake on the root's translate, y ±6 px / 120 ms; the act a 40 px insert above the root in C
  if (want("A2")) {
    const shake = "ctx.a = root.animate([{ translate: '0 -6px' }, { translate: '0 6px' }], { duration: 120, iterations: Infinity, direction: 'alternate', easing: 'linear' }); ctx.a.id = 'c14'; ctx.loop = () => { ctx.v = -6 + 12 * (ctx.a.effect.getComputedTiming().progress ?? 0); };";
    let name = "A2 (past M6: the host's own translate animated by the consumer) a 40 px insert above the root during a ±6 px / 120 ms shake";
    emit(name, await run(name, { setup: shake, hooks: [[16, `C.insertBefore(${blk(40)}, root)`]], AT: 16, N: 45 }), (x) => rel1(x, 0.5, "the consumer's own shake"));
    name = "A2 (control) the consumer's shake on the root, no act: no glide";
    emit(name, await run(name, { setup: shake, N: 40 }), (x) => { const g = x.out.at(-1).glides; return [g === 0 ? "PASS" : "FAIL", `glides started ${g} (bound 0: the host's own animation is a carrier) · errors ${x.errs.length}`]; });
    name = "A2 (past M6: a CSS @keyframes on the host's own translate) a 40 px insert above the root during a 200 ms y ±8 px entrance loop";
    emit(name, await run(name, { setup: "const st = document.createElement('style'); st.textContent = '@keyframes c14sh { from { translate: 0 -8px } to { translate: 0 8px } } .c14sh { animation: c14sh 200ms linear infinite alternate }'; document.head.appendChild(st); root.classList.add('c14sh'); ctx.loop = () => { const a = root.getAnimations().find((y) => y.animationName === 'c14sh'); ctx.v = a ? -8 + 16 * (a.effect.getComputedTiming().progress ?? 0) : 0; };", hooks: [[16, `C.insertBefore(${blk(40)}, root)`]], AT: 16, N: 45 }), (x) => rel1(x, 0.5, "the consumer's own CSS animation"));
  }
  // A4 · M1 past its range (P 200-600, θ 0-60°, insert 40-200): S14 says −Δ is exact under any non-singular map
  if (want("A4")) {
    const persp2 = (P, th, off, axis = "X") => `const rr = root.getBoundingClientRect(), cc = C.getBoundingClientRect(); C.style.transformOrigin = '50% ' + (rr.top + rr.height / 2 - cc.top - (${off})) + 'px'; C.style.transform = 'perspective(${P}px) rotate${axis}(${th}deg)';`;
    for (const [P, th, ins, off, axis, where] of [[150, 70, 300, -150, "X", "inside"], [150, 75, 40, 150, "X", "inside"], [120, 60, 200, -150, "X", "inside"], [400, 40, 120, 0, "Y", "inside"], [400, 40, 40, 0, "Y", "outside"]]) {
      const name = `A4 (M1/M2 past range) perspective ${where} · P ${P} rotate${axis} ${th} · insert ${ins} · host ${off} px from the origin`;
      emit(name, await run(name, { setup: persp2(P, th, off, axis), mag: true, hooks: [[8, where === "inside" ? `C.insertBefore(${blk(ins)}, root)` : `G.insertBefore(${blk(ins)}, C)`]] }), (r) => gradeStep(r));
    }
  }
  // A5 · M22 past H14's cells (S14's range names "on the host"; H14 drives G and a box before C): the host's own zoom; G's zoom with the
  // root 300 px deep in G (the painted move grows with the depth: 0.25 × 300 = 75 px uncompensated)
  if (want("A5")) {
    for (const [nm, setup, hook] of [["the root's own zoom 1 → 1.25", "", "root.style.zoom = '1.25'"], ["G's zoom 1 → 1.25, the root 300 px deep in G", `G.insertBefore(${blk(300, "c14-deep")}, C);`, "G.style.zoom = '1.25'"], ["G's zoom 1 → 0.8, the root 300 px deep in G", `G.insertBefore(${blk(300, "c14-deep")}, C);`, "G.style.zoom = '0.8'"]]) {
      const name = `A5 (M22 past H14) a zoom change during the hold · ${nm}`;
      emit(name, await run(name, { setup, hooks: [[8, hook]] }), (r) => { const { pre, first } = around(r); if (!pre || !first) return ["FAIL", "no frames"]; const grow = Math.abs(first.h - pre.h) / 2 + Math.abs(first.w - pre.w) / 2;
        // the root's own zoom: the least-moved point is its top-left (b.5); G's: the place step of the root's centre, less half its own growth
        if (nm.startsWith("the root")) { const jump = Math.hypot(first.l - pre.l, first.tp - pre.tp); const [, line] = gradeStep(r, { jumpBound: 0.5 + grow, noGlideOk: true }); return [jump <= 0.5 + (first.w / first.ow - 1) * (first.ow - pre.ow) / 2 + 0.6 ? "PASS" : "FAIL", `the top-left edge (fixed in layout) moved ${f(jump, 2)} px on the act's frame (bound 0.5 + the grow's share) · width ${f(pre.w, 1)} → ${f(first.w, 1)} · ${line}`]; }
        return gradeStep(r, { jumpBound: 0.5 + grow }); });
    }
  }
  // A6 · M27 past its range (trains of 8-40 px): the every-second-frame train at 80 px, 12 steps of 40 px, and every third frame
  if (want("A6")) for (const [nm, every, px, n] of [["80 px every second frame, 6 steps", 2, 80, 6], ["40 px every second frame, 12 steps", 2, 40, 12], ["40 px every third frame, 6 steps", 3, 40, 6], ["8 px every second frame, 6 steps (in range: the control)", 2, 8, 6]]) {
    const name = `A6 (M27 past range) a train of inserts above the root · ${nm}`;
    const hooks = Array.from({ length: n }, (_, i) => [8 + i * every, `C.insertBefore(${blk(px)}, root)`]);
    const r = await run(name, { hooks, N: 50 + n * every });
    emit(name, r, (x) => { const S = x.out; const g = S.at(-1).glides; const steps = hooks.map(([k]) => { const i = S.findIndex((y) => y.n >= k); if (i < 3) return NaN; const vel = (a, b) => { const q = NOM / Math.max(1, b.t - a.t); return [(b.x - a.x) * q, (b.y - a.y) * q]; }; const v1 = vel(S[i - 1], S[i]), v0 = vel(S[i - 2], S[i - 1]), vm = vel(S[i - 3], S[i - 2]); return Math.max(0, Math.hypot(v1[0] - v0[0], v1[1] - v0[1]) - Math.hypot(v0[0] - vm[0], v0[1] - vm[1])); });
      const ok = g >= n && steps.every((s) => s <= 0.5); return [ok ? "PASS" : "FAIL", `glides ${g} (bound ≥ ${n}: each step glided) · on each insert's frame the break of the root's own motion, less the running glide's change of velocity, [${steps.map((s) => f(s, 2)).join(" ")}] px (bound ≤ 0.5 each; E-14 M27's grade) · max ${f(Math.max(...steps), 2)} px · errors ${x.errs.length}`]; });
  }
  // A7 · M28 past its one cell: which construction resists the ramp inside C (a static transform on C, no transform, slower and faster ramps)
  if (want("A7")) for (const [nm, carrier] of [["C translated 0 20px, static (no carrier motion), 2 px a frame inside C", "C.style.translate = '0 20px';"], ["no transform on C (the control), 2 px a frame inside C", ""], ["sine 80 px / 600 ms on C, 1 px a frame inside C", loopSrc("sine", 80, 600)], ["sine 20 px / 600 ms on C, 2 px a frame inside C", loopSrc("sine", 20, 600)], ["C scaled 0.8, static, 2 px a frame inside C", "C.style.scale = '0.8'; C.style.transformOrigin = '0 0';"]]) {
    const name = `A7 (M28 past its cell) ${nm}`;
    const rate = /1 px a frame/.test(nm) ? 1 : 2;
    const setup = `${carrier} const sp = document.createElement('div'); C.insertBefore(sp, root); ctx.loop = (n) => { if (n >= 10 && n < 40) { ctx.m = (ctx.m ?? 0) + ${rate}; sp.style.marginTop = ctx.m + 'px'; } };`;
    emit(name, await run(name, { setup, hooks: [[4, "ctx.go = performance.now()"]], N: 50 }), (x) => { const g = x.out.at(-1).glides; return [g <= 2 ? "PASS" : "FAIL", `glides ${g} (bound ≤ 2: the ramp's onset and one uneven frame; E-14 M28's grade) · errors ${x.errs.length}`]; });
  }
  // A8 · M18's eased-transition limit (S14 b.6, "read owed in both engines"): a margin-top transition above C
  if (want("A8")) for (const [nm, tr, to] of [["ease 150 ms, 0 → 200 px (the extremal cell)", "margin-top 150ms ease", 200], ["linear 600 ms, 0 → 200 px", "margin-top 600ms linear", 200], ["the dock row's easing, 300 ms, 0 → 120 px", "margin-top 300ms var(--spring-dock, ease)", 120]]) {
    const name = `A8 (M18's stated limit, read) a margin transition on a box above C · ${nm}`;
    const r = await run(name, { setup: `const sp = document.createElement('div'); sp.style.transition = '${tr}'; G.insertBefore(sp, C); ctx.sp = sp;`, hooks: [[8, `ctx.sp.style.marginTop = '${to}px'`]], N: 70 });
    emit(name, r, (x) => { const S = x.out; const i0 = S.findIndex((y) => y.n >= 8); const W = S.slice(i0 - 1); const acc = W.slice(2).map((y, k) => { const a = W[k], b = W[k + 1]; return Math.abs((y.y - b.y) - (b.y - a.y)); }); const g = S.at(-1).glides; const moved = S.at(-1).y - W[0].y;
      return ["REPORT", `the root moved ${f(moved, 1)} px with its ancestor · glides ${g} · the largest frame-to-frame change of the root's step ${f(Math.max(0, ...acc), 2)} px (the limit: ≤ the run's largest |d|) · errors ${x.errs.length}`]; });
  }
  // A9 · b.8 past M16 (an unrelated record): the released host on its exit clock, a real step 3 frames after the release; and a script carrier
  if (want("A9")) for (const [nm, css, hooks0] of [["a 40 px insert above the root 3 frames after the release", "", [[3, `C.insertBefore(${blk(40)}, root)`]]], ["C's script sine 80 px / 200 ms running through the exit", loopSrc("sine", 80, 200), [[1, "ctx.go = performance.now()"]]]]) {
    const name = `A9 (b.8 past M16) released, then ${nm}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const st = await P.page.evaluate(SETUP, [R, css, {}]); await P.page.waitForTimeout(200);
        const eng = await kbd(P); await P.page.keyboard.press(tabKey(engine));
        const out = await P.page.evaluate(FILM, [R, ENG, 40, [[1, `ctx.rel = !(root.matches(${JSON.stringify(ENG)}) || !!root.closest(${JSON.stringify(ENG)}));`], ...hooks0]]); const rel = await P.page.evaluate(() => window.__ctx.rel);
        return { out, st, eng, rel, rows: await P.page.evaluate(rowsOf), errs: errsOf(P), AT: 3 };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.rel) { cell(name, "UNMEASURED", "NOT DRIVEN: not released at the film's start"); continue; }
    if (nm.includes("insert")) emit(name, r, (x) => { const [v, line] = gradeStep(x); return [v, `${line} · on the exit clock (b.8: the frame read continues for the released host)`]; });
    else emit(name, r, (x) => { const S = x.out.slice(0, 20); const g = x.out.at(-1).glides; const z = S[0]; const rx = (z.x - z.xl) / z.xw, ry = (z.y - z.xt) / z.xh; const dev = S.map((y) => Math.hypot(y.x - (y.xl + rx * y.xw), y.y - (y.xt + ry * y.xh))); return [g === 0 && Math.max(...dev) <= 0.5 ? "PASS" : "FAIL", `released; over the first 20 frames the root off where C carries it: max ${f(Math.max(...dev), 2)} px (bound ≤ 0.5) · glides ${g} (bound 0) · errors ${x.errs.length}`]; });
  }
  // A10 · M23 past its axis (Y3 read y only): a horizontal sticky G (left 0) in an x scroller, 8 px a frame across the stick
  if (want("A10")) {
    const name = "A10 (M23 past range: the x axis) G sticky left 0 in an x scroller, scrolled 8 px a frame across the stick";
    const setup = "const s = document.createElement('div'); s.style.cssText = 'display:flex;overflow-x:auto;overflow-y:hidden;width:640px;position:relative'; G.before(s); const pre = document.createElement('div'); pre.style.cssText = 'flex:none;width:150px;height:10px'; const tail = document.createElement('div'); tail.style.cssText = 'flex:none;width:1500px;height:10px'; s.append(pre, G, tail); G.style.cssText += ';position:sticky;left:0;flex:none;width:560px;background:#fff;padding:0'; C.style.width = '540px'; root.style.width = '500px'; root.style.maxWidth = 'none'; ctx.ref = G; ctx.sc = s;";
    emit(name, await run(name, { setup, hooks: Array.from({ length: 30 }, (_, i) => [6 + i, "ctx.sc.scrollLeft += 8"]), N: 45 }), (r) => gradeCarry(r));
  }
  // A11 · M24 past its axis: x-mandatory snap, align center, the snapped item grows 300 → 400 px wide (WebKit re-snaps center, Y4)
  if (want("A11")) for (const al of ["center", "end"]) {
    const name = `A11 (M24 past range: the x axis) scroll-snap x mandatory, align ${al}: the snapped item grows 300 → 400 px wide`;
    const setup = `const s = document.createElement('div'); s.style.cssText = 'display:flex;overflow-x:auto;overflow-y:hidden;width:600px;position:relative;scroll-snap-type:x mandatory'; G.before(s); const items = [0, 1, 2, 3, 4].map(() => { const d = document.createElement('div'); d.style.cssText = 'flex:none;width:300px;scroll-snap-align:${al}'; s.appendChild(d); return d; }); G.style.padding = '0px'; G.style.width = '280px'; C.style.width = '270px'; root.style.width = '250px'; root.style.maxWidth = 'none'; items[2].appendChild(G); ctx.it = items[2]; ctx.sc = s; ctx.after = "ctx.sc.scrollLeft = ${al === "center" ? 450 : 300}; scrollBy(0, ctx.sc.getBoundingClientRect().top - 100);"; ctx.noCentre = true;`;
    emit(name, await run(name, { setup, settle: 400, hooks: [[8, "ctx.it.style.width = '400px'"]] }), (r) => { const [v, line] = gradeStep(r); return [v, `${line} · scrollLeft ${f(r.out.find((y) => y.n >= 7)?.sst ?? NaN, 0)} → ${f(r.out.at(-1).sst, 0)}`]; });
  }
  // A12 · M30 graded on the clock (E-14 M30 grades errors only and prints the clock as REPORT): the glide's duration against the consumer's
  // var(clock) within 3 ms, under the host's transition. This is the cell the hostseat plant must fail in WebKit (Y5)
  if (want("A12")) for (const [nm, tcss, mode, lag] of [["transition: all 300ms linear · the clock token changed at runtime 60 ms before the act", "all 300ms linear", "runtime", 60], ["transition-property: all; 150ms · the clock token changed at runtime 40 ms before the act", "all 150ms linear", "runtime", 40], ["transition: all 300ms linear allow-discrete from load · the act 30 ms after the hold", "all 300ms linear allow-discrete", "hold", 30], ["no transition (control) · the token changed at runtime 60 ms before the act", "none", "runtime", 60]]) {
    const name = `A12 (M30 graded on its clock) the held root's ${nm}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '.c14t { transition: ${tcss} }'; document.head.appendChild(st); root.classList.add('c14t');`, {}]);
        await P.page.waitForTimeout(400);
        let eng;
        if (mode === "hold") { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(lag); eng = await P.page.evaluate(([R, ENG]) => { const q = document.querySelector(R); return q.matches(ENG) || !!q.closest(ENG); }, [R, ENG]); }
        else { eng = await kbd(P); await P.page.evaluate((tok) => document.documentElement.style.setProperty(tok, "0.5s"), CLOCK); await P.page.waitForTimeout(lag); }
        const want_ = await P.page.evaluate((tok) => { const p = document.createElement("div"); p.style.transitionDuration = `var(${tok})`; document.body.appendChild(p); const d = getComputedStyle(p).transitionDuration; p.remove(); return /ms/.test(d) ? parseFloat(d) : parseFloat(d) * 1000; }, CLOCK);
        const out = await P.page.evaluate(FILM, [R, ENG, 20, [[1, `C.insertBefore(${blk(40)}, root)`]]]);
        return { eng, st: { vis: true }, want: want_, durs: [...new Set(out.flatMap((x) => x.an))], errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { const near = x.durs.some((d) => Math.abs(d - x.want) <= 3); const ok = x.errs.length === 0 && near;
      return [ok ? "PASS" : "FAIL", `the glide ran [${x.durs.map((d) => f(d, 1)).join(",")}] ms; the consumer's var(${CLOCK}) computes ${f(x.want, 1)} ms (bound: within 3 ms) · errors ${x.errs.length}${x.errs[0] ? ` (${x.errs[0].slice(0, 140)})` : ""} (bound 0)`]; });
  }
  // A13 · CK-04's frame past M15's range (0.8-1.25): the card scaled 1 → 1.5 and → 0.6 about the held root during the hold, then a scroll
  if (want("A13") && !fixture) for (const [s1, when] of [[1.5, "during"], [0.6, "during"]]) {
    const name = `A13 (M15 past range) card scale 1 → ${s1} about the held root · ${when} the hold, then a 30 px scroll`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '.c14big { scale: ${s1} }'; document.head.appendChild(st); const gc = document.createElement('div'); gc.style.paddingInline = 'var(--space-section)'; C.appendChild(gc); const g = parseFloat(getComputedStyle(gc).paddingLeft); gc.remove(); const W = Math.round((innerWidth - 2 * g * ${Math.max(1, s1)} - 20) / ${Math.max(1, s1)}); root.style.width = W + 'px'; root.style.maxWidth = 'none'; const rr = root.getBoundingClientRect(); root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (innerWidth / 2 - (rr.left + rr.width / 2)) + 'px'; const q = root.getBoundingClientRect(), cc = C.getBoundingClientRect(); C.style.transformOrigin = (q.left + q.width / 2 - cc.left) + 'px ' + (q.top + q.height / 2 - cc.top) + 'px'; C.style.transition = 'scale 300ms linear';`, {}]);
        const eng = await kbd(P);
        await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("c14big"), R); await P.page.waitForTimeout(450);
        await P.page.evaluate(() => scrollBy(0, 30)); await P.page.waitForTimeout(350);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); const c = document.createElement("div"); c.style.paddingInline = "var(--space-section)"; e.parentElement.appendChild(c); const g = parseFloat(getComputedStyle(c).paddingLeft); c.remove();
          const p = r.left + r.width / 2; const a = e.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const q = e.getBoundingClientRect(); a.cancel(); return { l: r.left, r: innerWidth - r.right, w: r.width, ow: e.offsetWidth, g, fx: (q.left + q.width / 2 - p) / 40, sc: e.style.getPropertyValue("--stage-reach") }; }, R);
        return { v, eng, st: { vis: true }, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { const gap = Math.min(x.v.l, x.v.r), need = x.v.g * x.v.fx; const grow = x.v.w / (x.v.ow * s1); return [gap >= need - 1 ? "PASS" : "FAIL", `the held box paints ${f(x.v.w, 1)} px (×${f(grow, 4)} of its CSS width × the card), ${f(x.v.l, 1)} / ${f(x.v.r, 1)} px from the viewport's edges · the gutter ${f(x.v.g, 1)} px × the frame ${f(x.v.fx, 4)} = ${f(need, 1)} px (bound ≥ that − 1) · --stage-reach ${x.v.sc || "(none)"} · errors ${x.errs.length}`]; });
  }
  // A14 · the settle at 0 (E-11's three -0s cells; S14-e: a clock of 0 is the clock CSS runs): the consumer's own clock beside the stage
  if (want("A14")) for (const v of ["-0s", "0s", "0.001s"]) {
    const name = `A14 (E-11 -0s, read on the consumer) --spring-dock-settle: ${v} on <html> · a 40 px insert above the root`;
    const r = await run(name, { setup: `document.documentElement.style.setProperty('${CLOCK}', '${v}');`, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]], N: 30, read: "const p = document.createElement('div'); p.style.transitionDuration = 'var(--spring-dock-duration)'; document.body.appendChild(p); const d = getComputedStyle(p).transitionDuration; p.remove(); return { dock: d, host: getComputedStyle(root).transitionDuration.split(',').slice(0, 3).join(',') };" });
    emit(name, r, (x) => { const { pre, first } = around(x); return ["REPORT", `the consumer's --spring-dock-duration computes ${x.extra?.dock} (the host's transition-duration list starts ${x.extra?.host}) · on the act's frame the root moved ${f(Math.hypot(first.x - pre.x, first.y - pre.y), 2)} px · glides ${x.out.at(-1).glides} (${[...new Set(x.out.flatMap((y) => y.an))].map((d) => f(d, 1)).join(",") || "none"}) · errors ${x.errs.length}${x.errs[0] ? ` (${x.errs[0].slice(0, 120)})` : ""}`]; });
  }
}, 3600);
