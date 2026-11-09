#!/usr/bin/env node
// C-E14 attack, list 2 (D5 pass 14, wave 4, critic): B1 (M27 by superposition), B2 (M28 cause), B3 (the host own zoom). The framework is
// E-14 (harness/e14-s14.mjs lines 18-116) copied unchanged but for the import path, the witness name and the c14 glide filter, as ce14-attack.mjs.
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

await witness("C-E14-atk2", "C-E14: the second attack list (D5 pass 14, wave 4)", async ({ a, E, T, cell, guard, idx, engine }) => {
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

  // ══ C-E14's second attack list (written after ce14-attack.mjs read cand14 in Chromium): it adjudicates three of those reads ══════════
  const loopSrc = (A, per) => `const tick = () => { const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; ctx.v = ${A} * Math.sin(2 * Math.PI * t); C.style.translate = '0 ' + ctx.v.toFixed(2) + 'px'; requestAnimationFrame(tick); }; requestAnimationFrame(tick);`;
  // B1 · M27 by superposition (the glides compose by `composite: add`, so a train's ideal paint is the sum of one step's paint shifted
  // to each step's frame time): film one step, film the train, predict the train from the one step, and read the train's departure from
  // the prediction on each step's frame. This grades the stage, not the velocity-break estimate E-14's M27 grade uses
  if (want("B1")) for (const [px, every, n] of [[40, 2, 2], [40, 2, 6], [80, 2, 3], [40, 3, 3], [40, 1, 4]]) {
    const name = `B1 (M27 by superposition) ${px} px every ${every === 1 ? "frame" : every === 2 ? "second frame" : "third frame"}, ${n} steps, against one ${px} px step`;
    const one = await run(name + " · the one step", { hooks: [[8, `C.insertBefore(${blk(px)}, root)`]], N: 60 });
    const tr = await run(name + " · the train", { hooks: Array.from({ length: n }, (_, i) => [8 + i * every, `C.insertBefore(${blk(px)}, root)`]), N: 60 });
    if (one.crashed || tr.crashed) { cell(name, "FAIL", (one.line ?? "") + (tr.line ?? "")); continue; }
    const nd = notDriven(one) ?? notDriven(tr); if (nd) { cell(name, "UNMEASURED", nd); continue; }
    const A = one.out, Bf = tr.out; const ia = A.findIndex((x) => x.n >= 8), ib = Bf.findIndex((x) => x.n >= 8); const a0 = A[ia - 1], b0 = Bf[ib - 1];
    const ts = A.slice(ia).map((x) => x.t - A[ia].t), ys = A.slice(ia).map((x) => x.y - a0.y);
    const gA = (tau) => { if (tau < 0) return 0; for (let i = 1; i < ts.length; i++) if (ts[i] >= tau) return ys[i - 1] + (ys[i] - ys[i - 1]) * (tau - ts[i - 1]) / Math.max(1e-6, ts[i] - ts[i - 1]); return ys.at(-1); };
    const T0 = Bf.filter((x) => (x.n - 8) % every === 0 && x.n >= 8 && x.n < 8 + n * every).map((x) => x.t);
    const dev = Bf.slice(ib).map((x) => { const pred = T0.filter((t0) => x.t >= t0).reduce((s, t0) => s + gA(x.t - t0), 0); return { n: x.n, d: x.y - b0.y - pred }; });
    const atSteps = dev.filter((x) => (x.n - 8) % every === 0 && x.n < 8 + n * every).map((x) => Math.abs(x.d)); const mx = Math.max(...dev.map((x) => Math.abs(x.d)));
    // the prediction interpolates the one step's film at the train's frame times: its own error is bounded by the one step's largest per-frame curvature
    const curv = Math.max(0, ...A.slice(ia + 1, ia + 20).map((x, k) => Math.abs((x.y - A[ia + k].y) - (A[ia + k].y - (ia + k - 1 >= 0 ? A[ia + k - 1].y : A[ia + k].y)))));
    cell(name, mx <= 0.5 + curv / 4 ? "PASS" : "FAIL", `the train's paint less the sum of the one step's paint shifted to each step's frame: on the steps' frames [${atSteps.map((x) => f(x, 2)).join(" ")}] px, max over the film ${f(mx, 2)} px (bound ≤ 0.5 + the interpolation's own error ≤ ${f(curv / 4, 2)}) · glides ${Bf.at(-1).glides} · the one step's act frame ${f(Math.abs(A[ia].y - a0.y), 2)} px · errors ${tr.errs.length}`);
  }
  // B2 · M28's cause: a ramp inside a script-moved C, with C's transform-origin pinned 0 0 (so no origin resolves against C's size)
  if (want("B2")) for (const [nm, org, rate] of [["C's transform-origin 0 0", "C.style.transformOrigin = '0 0';", 1], ["C's transform-origin default (50% 50%: E-14 M28's form)", "", 1], ["C's transform-origin 0 0, 2 px a frame", "C.style.transformOrigin = '0 0';", 2]]) {
    const name = `B2 (M28's cause) sine 80 px / 600 ms on C, ${nm}, a ${rate} px a frame margin ramp inside C above the root`;
    const setup = `${org} ${loopSrc(80, 600)} const sp = document.createElement('div'); C.insertBefore(sp, root); ctx.loop = (n) => { if (n >= 10 && n < 40) { ctx.m = (ctx.m ?? 0) + ${rate}; sp.style.marginTop = ctx.m + 'px'; } };`;
    emit(name, await run(name, { setup, hooks: [[4, "ctx.go = performance.now()"]], N: 50 }), (x) => { const g = x.out.at(-1).glides; return [g <= 2 ? "PASS" : "FAIL", `glides ${g} (bound ≤ 2, E-14 M28's grade) · errors ${x.errs.length}`]; });
  }
  // B3 · the host's own zoom (S14 a.2 lists it as a place move; b.5 says a size change of the host glides nothing where a point is fixed)
  if (want("B3")) for (const [nm, hook, setup] of [["the root's own zoom 1 → 1.5", "root.style.zoom = '1.5'", ""], ["the root's own zoom 1 → 0.75", "root.style.zoom = '0.75'", ""], ["the root's own height 21 → 31 px (M11's block-axis analogue: the control)", "root.style.height = (root.offsetHeight + 10) + 'px'", ""]]) {
    const name = `B3 (M22 on the host) ${nm}`;
    emit(name, await run(name, { setup, hooks: [[8, hook]], N: 40 }), (r) => { const { S, i0, pre, first, end } = around(r); if (!pre || !first) return ["FAIL", "no frames"];
      const top = first.tp - pre.tp, left = first.l - pre.l, cy = first.y - pre.y; const late = Math.max(...S.slice(i0).map((x) => Math.abs(x.tp - first.tp))); const g = end.glides - pre.glides; const s = first.w / Math.max(1, first.ow);
      const share = Math.abs(first.h - pre.h) * 0.06 / 2 / 1.06 + 0.5; const ok = Math.abs(top) <= share && Math.abs(left) <= share + Math.abs(first.w - pre.w) * 0.06 / 2 && g === 0;
      return [ok ? "PASS" : "FAIL", `on the act's frame the top edge (fixed in layout) moved ${f(top, 2)} px and the left edge ${f(left, 2)} px (bound ≤ ${f(share, 2)}: 0.5 + the grow's share), the centre ${f(cy, 2)} px · the top edge then travels ${f(late, 2)} px more · height ${f(pre.h, 1)} → ${f(first.h, 1)}, width ${f(pre.w, 1)} → ${f(first.w, 1)} · glides at the change ${g} (bound 0) · errors ${r.errs.length}`]; });
  }
}, 3600);
