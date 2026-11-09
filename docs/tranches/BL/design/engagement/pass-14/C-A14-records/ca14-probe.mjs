#!/usr/bin/env node
// C-A14 (D5 pass 14, wave 4): S14 attacked past H14's cells. The page-side dress, the film, the run wrapper and the graders are
// harness/e14-s14.mjs lines 18-113, copied unchanged but for the import path and the witness id; the cells (A1-A13) are this seat's.
//   node ca14-probe.mjs --build <dir> [--engine webkit] [--only A1,A5,…] [--out <dir>]
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

await witness("C-A14", "S14 attacked past H14's ranges (C-A14, D5 pass 14 wave 4)", async ({ a, E, T, cell, guard, idx, engine }) => {
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
  // ══ C-A14's attack cells: each a member of an S14 family past H14's cells (E-14), graded by E-14's own graders where the family has one ══
  // ids: A<n>. Each cell names the S14 row it attacks. A cell run on cand12 / cand13 beside cand14 is the reference / plant (class 2).
  const NOMF = NOM;
  const sine = (A, per, prop = "translate") => `const tick = () => { const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; ctx.v = ${A} * Math.sin(2 * Math.PI * t); C.style.${prop} = ${prop === "rotate" ? "ctx.v.toFixed(3) + 'deg'" : "'0 ' + ctx.v.toFixed(2) + 'px'"}; requestAnimationFrame(tick); }; requestAnimationFrame(tick);`;
  // the painted top edge on the act's frame (b.5's reference-point attack): a bespoke step grade on the edge, not the centre
  const edgeStep = (r, k = "tp") => { const { S, i0, pre, first, end } = around(r); if (!pre || !first) return ["FAIL", "no frames around the act"]; const j = first[k] - pre[k]; const g = end.glides; const sg = pre.w / Math.max(1, pre.ow); const share = (Math.abs(pre.h - first.h) / 2) * (sg - 1) / sg; const bd = 0.5 + share;
    return [Math.abs(j) <= bd ? "PASS" : "FAIL", `the root's painted ${k === "tp" ? "top" : "bottom"} edge on the act's frame moved ${f(j, 2)} px (bound ≤ ${f(bd, 2)} = 0.5 + the grow ×${f(sg, 4)}'s share of the size change: the block-flow edge is the point the layout keeps, the insert's step glided) · its centre ${f(first.y - pre.y, 2)} px · height ${f(pre.h, 1)} → ${f(first.h, 1)} · glides ${g} · path(top) [${S.slice(Math.max(0, i0 - 1), i0 + 4).map((x) => f(x.tp - pre.tp, 1)).join(" ")}] · errors ${r.errs.length}`]; };

  // ── A1 · M2/M3 past range: the transformed link sits in a SHADOW TREE (a custom element wrapping its slot in a scaled or rotated div). The
  //    host's offsetParent chain is retargeted past the shadow-internal div, so K may see no transformed link; a step above the shadow host
  //    then takes the chain path (−Δ), which is exact only below the transform. S14 b.1 step 4: "below the nearest link that carries a transform".
  const shadow = (css, mode = "open") => `if (!customElements.get('ca14-wrap-${mode}')) customElements.define('ca14-wrap-${mode}', class extends HTMLElement { constructor() { super(); const s = this.attachShadow({ mode: '${mode}' }); s.innerHTML = '<div style="${css}"><slot></slot></div>'; } });
    const X = document.createElement('ca14-wrap-${mode}'); X.style.display = 'block'; G.insertBefore(X, C); X.appendChild(C); ctx.X = X; ctx.ref = C;`;
  if (want("A1")) for (const [nm, css, mode, where] of [
    ["scale 0.5 (origin 0 0) in an open shadow root · 40 px insert above the shadow host", "scale:0.5;transform-origin:0 0", "open", "above"],
    ["scale 0.5 (origin 0 0) in a closed shadow root · 40 px insert above the shadow host", "scale:0.5;transform-origin:0 0", "closed", "above"],
    ["rotate 20deg in an open shadow root · 40 px insert above the shadow host", "rotate:20deg", "open", "above"],
    ["scale 0.5 in an open shadow root · 40 px insert inside the card above the root (control: below the transform)", "scale:0.5;transform-origin:0 0", "open", "inside"]]) {
    const name = `A1 (M2/M3) a transformed link inside a shadow tree · ${nm}`;
    const r = await run(name, { setup: shadow(css, mode), mag: true, hooks: [[8, where === "above" ? `ctx.X.before(${blk(40)})` : `C.insertBefore(${blk(40)}, root)`]], read: "const ch = []; for (let e = root; e; e = e.offsetParent) ch.push((e.tagName || '').toLowerCase() + (e.getAttribute && e.getAttribute('data-t') ? '[' + e.getAttribute('data-t') + ']' : '')); return { chain: ch.join(' > ') };" });
    emit(name, r, (x) => { const [v, line] = gradeStep(x); return [v, `${line} · the offsetParent chain ${x.extra?.chain}`]; });
  }

  // ── A2 · M3/M6 past range: a STYLESHEET percentage transform on the card with a size-independent origin. The card's size change moves it by
  //    half the change (translateY(-50%)), a step painted through the carrier (S14 a.3 last item; b.1 step 3.5: "a transform-carrying link's
  //    size change: a place step measured on paint"). The bytes read a percentage only in the computed `translate` or the inline `transform`.
  if (want("A2")) for (const [nm, css, origin] of [
    ["stylesheet transform: translateY(-50%), transform-origin 0 0", "transform: translateY(-50%)", "0 0"],
    ["stylesheet transform: translate(-50%, -50%), transform-origin top center (the drop-down's scale-in origin)", "transform: translate(-50%, -50%)", "top center"],
    ["stylesheet transform: translateY(-50%), default origin (control: the origin moves with the size)", "transform: translateY(-50%)", null],
    ["stylesheet translate: 0 -50%, transform-origin 0 0 (control: the computed translate keeps the %)", "translate: 0 -50%", "0 0"]]) {
    const name = `A2 (M3/M6) ${nm} · a 40 px insert inside the card above the root`;
    const setup = `const st = document.createElement('style'); st.textContent = '.ca14pc { ${css}; ${origin ? `transform-origin: ${origin};` : ""} position: relative; left: 50%; top: 0 }'; document.head.appendChild(st); C.classList.add('ca14pc'); C.style.marginTop = '240px'; ctx.ref = C;`;
    emit(name, await run(name, { setup, mag: true, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]] }), (r) => gradeStep(r));
  }

  // ── A3 · M11 past its cells: the host's own size change and an insert above it in the same frame, where the insert is between a quarter and
  //    three quarters of the shrink, so b.5's least-moved point is the centre while block flow keeps the top edge (the error is not monotone:
  //    it is a coincidence band, so the sweep's corners do not bound it).
  if (want("A3")) for (const [ins, h0, h1] of [[20, 80, 40], [15, 80, 40], [10, 80, 40]]) {
    const name = `A3 (M11) the root's height ${h0} → ${h1} px and a ${ins} px insert above it in one frame${ins <= (h0 - h1) / 4 ? " (control: outside the band)" : ""}`;
    const setup = `root.style.boxSizing = 'border-box'; root.style.height = '${h0}px'; root.style.minHeight = '0'; root.style.maxHeight = 'none';`;
    emit(name, await run(name, { setup, hooks: [[8, `C.insertBefore(${blk(ins)}, root); root.style.height = '${h1}px';`]] }), (r) => edgeStep(r));
  }

  // ── A4 · M1/M9 past range: multi-column flow. A 60 px insert above the card pushes it across the column break, a diagonal step of ~500 px.
  if (want("A4")) {
    const name = "A4 (M9/M13) a 60 px insert above the card pushes it across a column break (columns: 2, column-fill: auto)";
    const setup = `const W = document.createElement('div'); W.style.cssText = 'columns:2;column-fill:auto;height:520px;column-gap:40px;width:1000px'; G.insertBefore(W, C); const sp = document.createElement('div'); sp.setAttribute('data-t','ca14-sp'); W.appendChild(sp); W.appendChild(C); C.style.breakInside = 'avoid'; const ch = C.offsetHeight; sp.style.height = Math.max(0, 520 - ch - 30) + 'px'; ctx.sp = sp;`;
    const r = await run(name, { setup, hooks: [[8, `ctx.sp.before(${blk(60)})`]], read: "return { l: root.getBoundingClientRect().left };" });
    emit(name, r, (x) => gradeStep(x));
  }

  // ── A5 · M5 past range: a script-written ROTATE carrier (M5 lists translate, scale, a custom property, parallax), and a sine past 80 px/200 ms.
  if (want("A5")) {
    let name = "A5 (M5) a script-written rotate on C, ±20deg / 300 ms, about C's centre · carried";
    let r = await run(name, { setup: sine(20, 300, "rotate"), hooks: [[6, "ctx.go = performance.now()"]], N: 60, read: null });
    emit(name, r, (x) => { const S = x.out.filter((y) => y.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`]; const d0 = Math.hypot(S[0].x - S[0].cx, S[0].y - S[0].cy); const dev = S.map((y) => Math.abs(Math.hypot(y.x - y.cx, y.y - y.cy) - d0)); const g = S.at(-1).glides; const mx = Math.max(...dev);
      const ang = S.map((y) => Math.atan2(y.y - y.cy, y.x - y.cx)); const span = (Math.max(...ang) - Math.min(...ang)) * 180 / Math.PI;
      return [mx <= 0.5 && g === 0 ? "PASS" : "FAIL", `the root's distance from C's painted centre (invariant under a rotation about it) off its first engaged value: max ${f(mx, 2)} px (bound ≤ 0.5) · the carrier turned the root through ${f(span, 1)}° · glides started ${g} (bound 0) · errors ${x.errs.length}`]; });
    for (const [A, per] of [[160, 150], [200, 120]]) {
      name = `A5 (M5) a script-written translate sine ${A} px / ${per} ms on C (past 80 px / 200 ms) · carried`;
      r = await run(name, { setup: sine(A, per), hooks: [[6, "ctx.go = performance.now()"]], N: 60 });
      emit(name, r, (x) => gradeCarry(x));
    }
  }

  // ── A6 · M27 past its cells: a train every third frame, and an uneven train (40, 8, 40 px); S14: "a place that steps with still frames
  //    between its steps is glided at each step"
  if (want("A6")) for (const [nm, steps] of [["40 px every third frame, 6 steps", [0, 3, 6, 9, 12, 15].map((d) => [d, 40])], ["40 px every fourth frame, 4 steps", [0, 4, 8, 12].map((d) => [d, 40])], ["40, 8, 40, 8 px every second frame", [[0, 40], [2, 8], [4, 40], [6, 8]]]]) {
    const name = `A6 (M27) a train of inserts above the root · ${nm}`;
    const hooks = steps.map(([d, px]) => [8 + d, `C.insertBefore(${blk(px)}, root)`]);
    const r = await run(name, { hooks, N: 50 });
    emit(name, r, (x) => { const S = x.out; const g = S.at(-1).glides; const brk = hooks.map(([n]) => { const i = S.findIndex((y) => y.n >= n); if (i < 3) return NaN; const vel = (a, b) => { const k = NOMF / Math.max(1, b.t - a.t); return [(b.x - a.x) * k, (b.y - a.y) * k]; }; const v1 = vel(S[i - 1], S[i]), v0 = vel(S[i - 2], S[i - 1]), vm = vel(S[i - 3], S[i - 2]); return Math.max(0, Math.hypot(v1[0] - v0[0], v1[1] - v0[1]) - Math.hypot(v0[0] - vm[0], v0[1] - vm[1])); });
      const ok = g >= hooks.length && brk.every((s) => s <= 0.5); return [ok ? "PASS" : "FAIL", `glides ${g} (bound ≥ ${hooks.length}: each step glided) · on each insert's frame the break of the root's own motion, less the running glide's own change of velocity, [${brk.map((s) => f(s, 2)).join(" ")}] px (bound ≤ 0.5 each; E-14 M27's measure) · errors ${x.errs.length}`]; });
  }

  // ── A7 · M15 past range: the card scaled about the held control 1 → 1.5 and 1 → 0.6 during the hold (CK-04's frame; M15's range 0.8-1.25)
  if (want("A7") && !fixture) for (const s1 of [1.5, 0.6]) {
    const name = `A7 (M15) card scale 1 → ${s1} about the held root · during the hold, then a 30 px scroll`;
    const sb = Math.max(1, s1);
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(SETUP, [R, `const st = document.createElement('style'); st.textContent = '.ca14big { scale: ${s1} }'; document.head.appendChild(st); const gc = document.createElement('div'); gc.style.paddingInline = 'var(--space-section)'; C.appendChild(gc); const g = parseFloat(getComputedStyle(gc).paddingLeft); gc.remove(); const W = Math.round((innerWidth - 2 * g * ${sb} - 20) / ${sb}); root.style.width = W + 'px'; root.style.maxWidth = 'none'; const rr = root.getBoundingClientRect(); root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (innerWidth / 2 - (rr.left + rr.width / 2)) + 'px'; const q = root.getBoundingClientRect(), cc = C.getBoundingClientRect(); C.style.transformOrigin = (q.left + q.width / 2 - cc.left) + 'px ' + (q.top + q.height / 2 - cc.top) + 'px'; C.style.transition = 'scale 300ms linear';`, {}]);
        const eng = await kbd(P);
        await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("ca14big"), R); await P.page.waitForTimeout(450);
        await P.page.evaluate(() => scrollBy(0, 30)); await P.page.waitForTimeout(350);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); const c = document.createElement("div"); c.style.paddingInline = "var(--space-section)"; e.parentElement.appendChild(c); const g = parseFloat(getComputedStyle(c).paddingLeft); c.remove();
          const p = r.left + r.width / 2; const a = e.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const q = e.getBoundingClientRect(); a.cancel(); return { l: r.left, r: innerWidth - r.right, w: r.width, g, fx: (q.left + q.width / 2 - p) / 40 }; }, R);
        return { v, eng, st: { vis: true }, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { const gap = Math.min(x.v.l, x.v.r), need = x.v.g * x.v.fx; return [gap >= need - 1 ? "PASS" : "FAIL", `the held box paints ${f(x.v.w, 1)} px, ${f(x.v.l, 1)} / ${f(x.v.r, 1)} px from the viewport's edges · the gutter ${f(x.v.g, 1)} px × the frame ${f(x.v.fx, 4)} = ${f(need, 1)} px (bound ≥ that − 1; E-14 M15's grade) · errors ${x.errs.length}`]; });
  }

  // ── A8 · M14 past range: a 400 px removal below at the page's scroll end (M14: 20-200 px)
  if (want("A8")) for (const h of [400]) {
    const name = `A8 (M14) the clamp · page · ${h} px removed below at the scroll end`;
    const setup = `mn.insertBefore(${blk(800, "e14-spacer")}, mn.firstChild); mn.appendChild(${blk(h, "e14-subject")}); ctx.sc = document.scrollingElement; ctx.noCentre = true; ctx.after = 'scrollTo(0, document.scrollingElement.scrollHeight);';`;
    emit(name, await run(name, { setup, o: { noPad: true }, hooks: [[8, "document.querySelector('[data-t=\"e14-subject\"]').remove()"]] }), (r) => gradeStep(r));
  }

  // ── A9 · M22 past range: G's zoom 1 → 2 and 1 → 0.5 (M22: 0.8-1.5); E-14 M22's grade (the act's frame ≤ 0.5 + the size's own share)
  if (want("A9")) for (const z of ["2", "0.5"]) {
    const name = `A9 (M22) a zoom change during the hold · G's zoom 1 → ${z}`;
    emit(name, await run(name, { hooks: [[8, `G.style.zoom = '${z}'`]] }), (r) => { const { pre, first } = around(r); if (!pre || !first) return ["FAIL", "no frames"]; const grow = Math.abs(first.h - pre.h) / 2 + Math.abs(first.w - pre.w) / 2; return gradeStep(r, { jumpBound: 0.5 + grow }); });
  }

  // ── A10 · M4 past range: the lens under a projective map (perspective rotateX), rotate 180deg, skewY 30deg; the subject's axis lengths read
  //     by a probe of the subject itself (b.9: "the subject's axis lengths from its probe map")
  if (want("A10") && m.loupe) for (const [nm, css] of [["perspective(300px) rotateX(50deg)", "C.style.transform = 'perspective(300px) rotateX(50deg)';"], ["rotate 180deg", "C.style.rotate = '180deg';"], ["skewY 30deg", "C.style.transform = 'skewY(30deg)';"], ["none (control)", ""]]) {
    const name = `A10 (M4) the lens · card ${nm}`;
    const L = m.loupe;
    const r = await run(name, { setup: css, drive: "pointer", N: 6, read: `const L = ${JSON.stringify(L)}; const lens = document.querySelector(L.lens), tr = document.querySelector(L.track) ?? root; if (!lens) return null; const sub = document.querySelector('[data-engage-lens-subject]') ?? tr;
      const pr = (el, t) => { const a = el.animate([{ translate: t }, { translate: t }], { duration: 1e6, composite: 'add' }); a.pause(); const q = el.getBoundingClientRect(); a.cancel(); return [q.left + q.width / 2, q.top + q.height / 2]; };
      const p0 = pr(sub, '0px 0px'), px = pr(sub, '10px 0px'), py = pr(sub, '0px 10px'); const ax = [Math.hypot(px[0] - p0[0], px[1] - p0[1]) / 10, Math.hypot(py[0] - p0[0], py[1] - p0[1]) / 10];
      const a = lens.getBoundingClientRect(), t = tr.getBoundingClientRect(); return { ax, h: a.height, w: a.width, oh: lens.offsetHeight, ow: lens.offsetWidth, tt: t.top, tb: t.bottom, at: a.top, b: a.bottom, tl: t.left, trr: t.right, al: a.left, ar: a.right };` });
    emit(name, r, (x) => { const v = x.extra; if (!v) return ["FAIL", "NO LENS on a pointer hold"]; const ry = v.h / (v.oh * v.ax[1]), rx = v.w / (v.ow * v.ax[0]); const gapA = Math.abs(v.b - v.tt), gapB = Math.abs(v.at - v.tb); const side = gapA <= gapB ? "above" : "below";
      const ok = ry >= 0.85 && ry <= 1.18 && rx >= 0.85 && rx <= 1.18 && Math.min(gapA, gapB) <= 6; return [ok ? "PASS" : "FAIL", `the lens paints ${f(v.w, 1)} × ${f(v.h, 1)} px against its CSS ${v.ow} × ${v.oh} × the subject's probed axis lengths ${f(v.ax[0], 4)} / ${f(v.ax[1], 4)}: ×${f(rx, 4)} / ×${f(ry, 4)} (bound 0.85..1.18 each; E-14 M4's grade) · ${side}: ${f(Math.min(gapA, gapB), 1)} px from the track's painted ${side === "above" ? "top" : "bottom"} (bound ≤ 6) · track box ${f(v.tl, 0)}..${f(v.trr, 0)} × ${f(v.tt, 0)}..${f(v.tb, 0)}, lens ${f(v.al, 0)}..${f(v.ar, 0)} × ${f(v.at, 0)}..${f(v.b, 0)} · errors ${x.errs.length}`]; });
  }

  // ── A11 · M16/b.8 past range: the released host on its exit clock with (a) a 40 px insert above it at exit frame 4 (b.8: on the stage, a step
  //     is glided), (b) C's translate transition with an unrelated record at exit frame 20 (M16: records at frames 1-10)
  if (want("A11")) for (const [nm, css, hooks, grade] of [
    ["a 40 px insert above the root at exit frame 4", "", [[4, `C.insertBefore(${blk(40)}, root)`]], "step"],
    ["C's translate 0 → 80 px (600 ms) at exit frame 1 + an unrelated append at exit frame 20", "C.style.transition = 'translate 600ms linear';", [[1, "C.style.translate = '0 80px'"], [20, "const d = document.createElement('div'); d.setAttribute('data-t','ca14-unrelated'); document.body.appendChild(d);"]], "count"]]) {
    const name = `A11 (M16/b.8) released, then ${nm}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const st = await P.page.evaluate(SETUP, [R, css, {}]); await P.page.waitForTimeout(200); const rows = await P.page.evaluate(rowsOf);
        const eng = await kbd(P); await P.page.keyboard.press(tabKey(engine));
        const out = await P.page.evaluate(FILM, [R, ENG, 45, [[1, `ctx.rel = !(root.matches(${JSON.stringify(ENG)}) || !!root.closest(${JSON.stringify(ENG)}));`], ...hooks]]); const rel = await P.page.evaluate(() => window.__ctx.rel);
        return { out, st, rows, eng, rel, errs: errsOf(P), AT: hooks[0][0], drove: "keyboard" };
      } finally { await P.close(); }
    }, 60000);
    emit(name, r, (x) => { if (!x.rel) return ["UNMEASURED", "NOT DRIVEN: not released at the film's start"]; if (grade === "count") return [x.out.at(-1).glides === 0 ? "PASS" : "FAIL", `released · glides started ${x.out.at(-1).glides} (bound 0: the carrier is carried, the late unrelated record moves no offset) · errors ${x.errs.length}`];
      const [v, line] = gradeStep(x); const stageAt = x.out.find((y) => y.n >= 4)?.stage; return [v, `released; on the stage at the act's frame ${stageAt} · ${line}`]; });
  }

  // ── A12 · M18 past its cells: CSS transitions of a layout property on the card itself (C position: relative, `top` 0 → 120 px), linear and
  //     eased. S14 b.6: the velocity carried, the onset and each departure past the resolution glided. Read: the root apart from its own
  //     card (CE13c §3's failure), the glides, and the largest painted step over 16.7 ms against the card's own.
  if (want("A12")) for (const [nm, tf] of [["linear", "linear"], ["ease", "ease"], ["ease-in-out", "ease-in-out"]]) {
    const name = `A12 (M18) C's own top 0 → 120 px, a 400 ms ${nm} CSS transition, during the hold`;
    const r = await run(name, { setup: `C.style.position = 'relative'; C.style.top = '0px'; C.style.transition = 'top 400ms ${tf}';`, hooks: [[6, "C.style.top = '120px'"]], N: 50 });
    emit(name, r, (x) => { const S = x.out.filter((y) => y.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`]; const z = S[0]; const off = S.map((y) => Math.hypot(y.x - y.cx - (z.x - z.cx), y.y - y.cy - (z.y - z.cy))); const g = S.at(-1).glides; const mx = Math.max(...off);
      return [mx <= 0.5 && g === 0 ? "PASS" : "FAIL", `the card moved ${f(S.at(-1).cy - z.cy, 1)} px · the root's centre apart from its card's: max ${f(mx, 2)} px, frames over 2 px ${off.filter((y) => y > 2).length} (bound ≤ 0.5: the held control never comes apart from its card, S14 a.4) · glides started ${g} · errors ${x.errs.length}`]; });
  }

  // ── A13 · M12's stated limit, sustained: a programmatic scroll 8 px a frame for 30 frames while a box below the root grows 10 px a frame
  //     (the root scroller's range changes on every scroll frame: b.1 step 3.6 takes each as the engine's and glides it). REPORT: the limit
  //     has no frame-count bound in S14; the read is how far the held control comes apart from the page it scrolls with.
  if (want("A13")) {
    const name = "A13 (M12 limit) a scroll 8 px a frame for 30 frames while a box below the root grows 10 px a frame · STATED LIMIT, sustained";
    const setup = `const gr = document.createElement('div'); gr.setAttribute('data-t','ca14-grow'); gr.style.height = '0px'; mn.appendChild(gr); ctx.gr = gr;`;
    const hooks = Array.from({ length: 30 }, (_, i) => [6 + i, `scrollBy(0, 8); ctx.gr.style.height = (${(i + 1) * 10}) + 'px';`]);
    emit(name, await run(name, { setup, hooks, N: 50 }), (x) => { const [v, line] = gradeCarry(x, { viewport: true }); return ["REPORT", `(${v} on E-14's carry grade) ${line}`]; });
    const name2 = "A13 control: the same scroll with no range change (M12's carried cell)";
    emit(name2, await run(name2, { hooks: Array.from({ length: 30 }, (_, i) => [6 + i, "scrollBy(0, 8)"]), N: 50 }), (x) => gradeCarry(x, { viewport: true }));
  }

  // ══ A14-A18: added 2026-11-06 18:1x by this seat's second holder, before CR-1 and WK-1 start (planned, not in flight). They run ONLY when
  //    `--only` names them (want2), so the stages of CQ.q / WQ.q that name no `--only` read exactly the cells they read before (A1-A13).
  //    Each drives an S14 family H14's cells drive only inside S14's range (M7, M8, M13, M23, M24), past that range, with E-14's own grader.
  const want2 = (m) => !!only && only.has(m);
  const rotGrade = (x) => { const S = x.out.filter((y) => y.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`]; const d0 = Math.hypot(S[0].x - S[0].cx, S[0].y - S[0].cy); const dev = S.map((y) => Math.abs(Math.hypot(y.x - y.cx, y.y - y.cy) - d0)); const g = S.at(-1).glides; const mx = Math.max(...dev);
    const ang = S.map((y) => Math.atan2(y.y - y.cy, y.x - y.cx)); const span = (Math.max(...ang) - Math.min(...ang)) * 180 / Math.PI;
    return [span < 1 ? "UNMEASURED" : mx <= 0.5 && g === 0 ? "PASS" : "FAIL", `${span < 1 ? "NOT DRIVEN: the carrier turned < 1° · " : ""}the root's distance from C's painted centre off its first engaged value: max ${f(mx, 2)} px (bound ≤ 0.5) · the carrier turned the root through ${f(span, 1)}° · glides started ${g} (bound 0) · errors ${x.errs.length}`]; };
  const LOOP = "const p = document.createElement('p'); p.style.cssText = 'position:fixed;left:0;bottom:0;margin:0;font:10px monospace'; const t = document.createTextNode('0'); p.appendChild(t); document.body.appendChild(p); let k = 0; const tick = () => { t.data = String(++k); requestAnimationFrame(tick); }; requestAnimationFrame(tick);";
  // ── A14 · M7 past range (translate 0-80 px, scale 0.8-1.2, 200-600 ms): record-started @keyframes of rotate, of a 160 px translate over
  //     900 ms, of scale 0.5 → 1 on G; a C scale transition 1 → 0.6 under a page loop. S14: transform values, carried (no glide)
  if (want2("A14")) for (const [nm, css, hook, grade] of [
    ["a class on C starts @keyframes rotate 20deg → 0 (900 ms), origin centre", "@keyframes ca14r { from { rotate: 20deg } to { rotate: 0deg } } .ca14k { animation: ca14r 900ms linear }", "C.classList.add('ca14k')", "rot"],
    ["a class on C starts @keyframes translate 0 -160px → 0 (900 ms ease-in-out)", "@keyframes ca14t { from { translate: 0 -160px } to { translate: 0 0 } } .ca14k { animation: ca14t 900ms ease-in-out }", "C.classList.add('ca14k')", "carry"],
    ["a class on G starts @keyframes scale 0.5 → 1 (900 ms), origin 0 0", "@keyframes ca14s { from { scale: 0.5 } to { scale: 1 } } .ca14k { animation: ca14s 900ms linear; transform-origin: 0 0 }", "G.classList.add('ca14k')", "carry"],
    ["C's 900 ms scale transition 1 → 0.6 under a page loop writing a text node every frame", null, "C.style.scale = '0.6'", "carry"]]) {
    const name = `A14 (M7) ${nm}`;
    const setup = css ? `const st = document.createElement('style'); st.textContent = ${JSON.stringify(css)}; document.head.appendChild(st);` : `C.style.transformOrigin = '0 0'; C.style.transition = 'scale 900ms linear'; ${LOOP}`;
    emit(name, await run(name, { setup, hooks: [[6, hook]], N: 50 }), (r) => (grade === "rot" ? rotGrade(r) : gradeCarry(r)));
  }
  // ── A15 · M8 past range (inserts 20-200 px; a text-node loop): a 400 px insert under an early loop; an early loop writing an ATTRIBUTE on C
  //     every frame (a record on the host's own chain every frame), then a 40 px insert. E-14 M8's grade: one step, one glide, it lands
  if (want2("A15")) for (const [nm, loop, ins] of [
    ["a page loop writing a text node every frame, requested before the hold · a 400 px insert above the root", LOOP, 400],
    ["a page loop writing data-k on C every frame, requested before the hold · a 40 px insert above the root", "let k = 0; const tick = () => { C.setAttribute('data-k', String(++k)); requestAnimationFrame(tick); }; requestAnimationFrame(tick);", 40]]) {
    const name = `A15 (M8) ${nm}`;
    const r = await run(name, { setup: loop, hooks: [[8, `C.insertBefore(${blk(ins)}, root)`]], N: 50 });
    emit(name, r, (x) => { const [v, line, d] = gradeStep(x); const { pre, end } = around(x); const mv = Math.hypot(end.x - pre.x, end.y - pre.y); const landed = mv >= ins * 0.9 - 1; const ok = v === "PASS" && d.glides === 1 && landed;
      return [ok ? "PASS" : "FAIL", `${line} · glides ${d.glides} (bound 1) · landed ${landed} (moved ${f(mv, 1)} of ${ins} px by +${f(end.t - pre.t, 0)} ms)`]; });
  }
  // ── A16 · M13 past range (inserts 20-200 px): scroll anchoring on the host's chain, overflow-anchor auto, 400 px inserted and removed above
  //     the viewport on the page, and 400 px inserted above in a scroller. S14: a step with s = 0 (the engine anchors; the paint does not move)
  if (want2("A16")) for (const [where, ins, kind] of [["page", 400, "insert"], ["page", 400, "remove"], ["scroller", 400, "insert"]]) {
    const name = `A16 (M13) anchoring on the chain · ${where} · ${kind} ${ins} px above · overflow-anchor auto`;
    const setup = where === "page" ? `const sp = ${blk(1200, "e14-spacer")}; mn.insertBefore(sp, mn.firstChild); ${kind === "remove" ? `mn.insertBefore(${blk(ins, "e14-subject")}, sp);` : ""} ctx.sc = document.scrollingElement;`
      : `G.style.overflow = 'auto'; G.style.padding = '0px'; G.style.boxSizing = 'border-box'; G.style.height = '300px'; const sp = ${blk(900, "e14-spacer")}; G.insertBefore(sp, G.firstChild); G.appendChild(${blk(900, "e14-tail")}); ctx.sc = G; ctx.after = "G.scrollTop += C.getBoundingClientRect().top - G.getBoundingClientRect().top - 60; scrollBy(0, G.getBoundingClientRect().top - 120);";`;
    const hook = kind === "remove" ? "document.querySelector('[data-t=\"e14-subject\"]').remove()" : where === "page" ? `mn.insertBefore(${blk(ins)}, mn.firstChild)` : `G.insertBefore(${blk(ins)}, G.firstChild)`;
    emit(name, await run(name, { setup, o: { anchor: true }, hooks: [[8, hook]] }), (r) => gradeStep(r));
  }
  // ── A17 · M23 past range (scroll deltas 1-400 px a frame): G sticky top 0, scrolled 600 px a frame (page) and 500 px a frame (scroller)
  //     across the stick and past the containing block's end. S14: carried (the rule takes at most |ΔS| of the sticky link's change)
  if (want2("A17")) for (const [where, d, k] of [["page", 600, 3], ["scroller", 500, 2]]) {
    const name = `A17 (M23) G sticky top 0 · ${where} scrolled ${d} px a frame for ${k} frames across the stick`;
    const setup = where === "page" ? "G.style.position = 'sticky'; G.style.top = '0px'; G.style.background = '#fff'; G.style.zIndex = '1'; ctx.ref = G; ctx.noCentre = true; ctx.after = 'scrollTo(0, G.getBoundingClientRect().top + scrollY - 60);';"
      : `const s = document.createElement('div'); s.style.cssText = 'height:450px;overflow:auto;position:relative'; G.before(s); s.appendChild(${blk(150, "e14-pre")}); s.appendChild(G); s.appendChild(${blk(1200, "e14-tail")}); G.style.position = 'sticky'; G.style.top = '0px'; G.style.background = '#fff'; ctx.ref = G; ctx.sc = s; ctx.noCentre = true; ctx.after = 'scrollBy(0, ctx.sc.getBoundingClientRect().top - 20);';`;
    const hooks = Array.from({ length: k }, (_, i) => [8 + i, where === "page" ? `scrollBy(0, ${d})` : `ctx.sc.scrollTop += ${d}`]);
    emit(name, await run(name, { setup, hooks, N: 30 }), (r) => gradeCarry(r));
  }
  // ── A18 · M24 past range (the snapped item's size change 50-200 px): y mandatory, align center and end, the snapped item grows 300 → 700 px
  //     below the root. S14: the re-snap follows a range change, a step on paint (glided)
  if (want2("A18")) for (const al of ["center", "end"]) {
    const name = `A18 (M24) scroll-snap y mandatory, align ${al}: the snapped item grows 300 → 700 px below the root`;
    const setup = `const s = document.createElement('div'); s.style.cssText = 'position:relative;height:300px;overflow:auto;width:600px;scroll-snap-type:y mandatory'; G.before(s); const items = [0, 1, 2, 3, 4].map((i) => { const d = document.createElement('div'); d.style.cssText = 'height:300px;scroll-snap-align:${al}'; s.appendChild(d); return d; }); items[2].appendChild(${blk(20, "e14-pad")}); G.style.padding = '0px'; items[2].appendChild(G); ctx.it = items[2]; ctx.sc = s; ctx.after = 'ctx.sc.scrollTop = 600; scrollBy(0, ctx.sc.getBoundingClientRect().top - 100);'; ctx.noCentre = true;`;
    emit(name, await run(name, { setup, settle: 350, hooks: [[8, "ctx.it.style.height = '700px'"]] }), (r) => gradeStep(r));
  }
}, 3600);
