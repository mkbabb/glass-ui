#!/usr/bin/env node
// E-15 · S15's members at their folded ranges (H15, D5 pass 15; P-E15 §S15-a..§S15-i as folded by §S15-FOLD and §S15-FOLD2).
// CK-20 (continuity in paint), CK-21 (D8), CK-16 (the exit), CK-23 (cost). One cell per member at its range's named cells. The held control,
// the film (read after the frame's resize step, class 7), the class 8 re-read and the graders are film.mjs's (E-14's kit, one source).
// The plants are builds (REGISTRY §P14-8.2 wave 2): cand14 where S15 says it fails, cand12 or cand13 the passing reference, HEAD the
// control; the expectation of each cell, by build, is in HARNESS.md §2 E-15 and `pass-15/H15-records/sum15.py`. S15's named plants
// (`paintabove`, `glideonce`, `flat3d`, `zoomchain`, `pointcentre`, `lateread`, `hostgutter`, `noflat`, `nodetect`, `inlinepct`,
// `leastmoved`, `insetlevel`, `dockexit`) are S15's construction with one rule stepped back, so each is a build of S15 and is built by part
// B; until then the build that carries the stepped-back rule stands for it (cand14 for every one but `hostgutter`, which is cand13's read).
// Grades (each cell names its own; film.mjs's step and carry, plus):
//   path     (F-5) the root's painted residual from where its card carries it, against the step's own painted displacement under the current
//            map D(τ): the distance from the segment [−D(τ), 0] on every frame after the act (bound ≤ 1 px: 0.5 + the layout's rounding)
//   edge     (B3, A3, A5's host cell; class 3) a size change of the host graded on its layout-kept point: that point's paint on the act's
//            frame ≤ 0.5 + the grow's share, and no glide at the change
//   superpose (B1, F-10) as E-14's M27 (film.mjs)
//   node e15-s15.mjs --build <dir> [--engine webkit] [--only M28,F5,…] [--out <dir>]
import { witness, openPage, tabKey, f } from "./lib.mjs";
import { NOM, blk, SETUP, FILM, filmKit } from "./film.mjs";

await witness("E-15", "S15's members at their folded ranges (P-E15 §S15)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  // the fixture carries S14's stage, not S15's: E-15's plants and references are builds (REGISTRY §P14-8.2 wave 2), so it reads no fixture
  if (T.kind === "fixture") { cell("E-15 on the fixture", "UNMEASURED", "NOT READ: E-15 is read on builds only (the fixture carries S14's stage; S15's plants are builds)"); return; }
  const K = filmKit({ E, T, cell, guard, idx, engine });
  const { sc, R, TH, ENG, CLOCK, errsOf, kbd, run, around, step17, gradeStep, gradeCarry, superpose, emit } = K;
  console.log(`# held control: scene ${sc} root ${R} thumb ${TH} engaged ${ENG}; clock token ${CLOCK}; cells ${only ? [...only].join(",") : "all"}; film read after the frame's resize step (class 7)`);
  const glides = (x) => x.out.at(-1).glides;
  // the edge grade: the layout-kept point k ∈ {start, centre, end} on the axis, painted on the act's frame ≤ 0.5 + the grow's share
  const gradeEdge = (r, k, axis = "y", o = {}) => { const { S, i0, pre, first, end } = around(r); if (!pre || !first) return ["FAIL", "no frames around the act"];
    const at = (x) => axis === "y" ? (k === "start" ? x.tp : k === "end" ? x.b : x.y) : (k === "start" ? x.l : k === "end" ? x.rr : x.x);
    const sg = pre.ow > 0 ? pre.w / (pre.ow * (pre.z || 1)) : 1; const dsz = axis === "y" ? Math.abs(first.h - pre.h) : Math.abs(first.w - pre.w); const share = k === "centre" ? 0 : (dsz / 2) * Math.max(0, sg - 1) / sg; const bd = 0.5 + share;
    const j = at(first) - at(pre); const g = end.glides - pre.glides;
    return [Math.abs(j) <= bd && (o.stepGlided || g === 0) ? "PASS" : "FAIL", `the ${k} ${axis === "y" ? "block" : "inline"} point (kept in layout) moved ${f(j, 2)} px in paint on the act's frame (bound ≤ ${f(bd, 2)} = 0.5 + the grow ×${f(sg, 4)}'s share) · the centre ${f(first.y - pre.y, 2)}, ${f(first.x - pre.x, 2)} px · height ${f(pre.h, 1)} → ${f(first.h, 1)}, width ${f(pre.w, 1)} → ${f(first.w, 1)} · glides at the change ${g} (${o.stepGlided ? "the insert's step is glided: not bounded" : "bound 0"}) · path(${k}) [${S.slice(Math.max(0, i0 - 1), i0 + 4).map((x) => f(at(x) - at(pre), 1)).join(" ")}] · errors ${r.errs.length}`]; };
  const sine = (A, per, prop) => `const tick = () => { const t = ctx.go ? (performance.now() - ctx.go) / ${per} : 0; const s = Math.sin(2 * Math.PI * t); ${prop === "rotate" ? `C.style.rotate = (${A} * s).toFixed(3) + 'deg';` : prop === "scale" ? `C.style.scale = (1 - ${A} * (0.5 - 0.5 * Math.cos(2 * Math.PI * t))).toFixed(4);` : `C.style.translate = '0 ' + (${A} * s).toFixed(2) + 'px';`} ctx.v = s; requestAnimationFrame(tick); }; requestAnimationFrame(tick);`;

  // ── M28 (S15-a, class 1): a layout ramp × a script-written carrier on C, at three placements (inside the card, of the card itself by the
  //    empty spacer's margin collapse, above the card), carriers translate / rotate / scale, ramps 0.2-4 px a frame, origins. Treatment:
  //    carried after the onset, at most one glide. Reference cand12 (B2: 0 glides); plant cand14 (paintabove: rule 1 stepped back) ─────────
  if (want("M28")) {
    const place = { inside: "C.style.paddingTop = '1px'; const sp = document.createElement('div'); C.insertBefore(sp, root);", card: "const sp = document.createElement('div'); C.insertBefore(sp, root);", above: "const sp = document.createElement('div'); G.before(sp);" };
    const cells = [];
    for (const pl of ["inside", "card", "above"]) for (const [cn, A, per, prop] of [["translate sine 80 px / 600 ms", 80, 600, "translate"], ["translate sine 160 px / 100 ms", 160, 100, "translate"], ["rotate sine 20deg / 600 ms", 20, 600, "rotate"], ["scale 1 → 0.85 cosine / 600 ms", 0.15, 600, "scale"]]) cells.push([pl, cn, A, per, prop, 2, ""]);
    for (const rate of [0.2, 4]) cells.push(["card", "translate sine 80 px / 600 ms", 80, 600, "translate", rate, ""]);
    for (const [on, org] of [["origin 0 0", "C.style.transformOrigin = '0 0';"], ["origin top center", "C.style.transformOrigin = 'top center';"]]) cells.push(["card", `rotate sine 20deg / 600 ms, ${on}`, 20, 600, "rotate", 2, org]);
    for (const [pl, cn, A, per, prop, rate, org] of cells) {
      const name = `M28 a ${rate} px a frame margin ramp ${pl === "inside" ? "inside the card (padding-top 1px: the host's level)" : pl === "card" ? "of the card (an empty spacer's margin collapsing through C's top)" : "above the card (a block before G)"} · C: ${cn}`;
      const setup = `${org} ${sine(A, per, prop)} ${place[pl]} ctx.loop = (n) => { if (n >= 10 && n < 40) { ctx.m = (ctx.m ?? 0) + ${rate}; sp.style.marginTop = ctx.m.toFixed(2) + 'px'; } };`;
      emit(name, await run(name, { setup, hooks: [[4, "ctx.go = performance.now()"]], N: 50 }), (x) => { const g = glides(x); return [g <= 1 ? "PASS" : "FAIL", `glides ${g} (bound ≤ 1: carried after the onset, S15-a's treatment) · errors ${x.errs.length}`]; });
    }
    // M28 under an ancestor zoom (S15-b's route limit (i)): class 1's shape on paint, REPORT
    for (const z of ["1.25", "2"]) {
      const name = `M28 under G's zoom ${z} · a 2 px a frame ramp of the card · C translate sine 80 px / 600 ms · STATED LIMIT (S15-b (i)), REPORT`;
      const setup = `G.style.zoom = '${z}'; ${sine(80, 600, "translate")} ${place.card} ctx.loop = (n) => { if (n >= 10 && n < 40) { ctx.m = (ctx.m ?? 0) + 2; sp.style.marginTop = ctx.m + 'px'; } };`;
      emit(name, await run(name, { setup, hooks: [[4, "ctx.go = performance.now()"]], N: 50 }), (x) => ["REPORT", `glides ${glides(x)} (the limit: a step on a zoomed level is on paint and holds one frame of the carrier's motion) · errors ${x.errs.length}`]);
    }
  }

  // ── F5 (S15-a rule 4): a step at or above the card while the card's scale or rotate changes during the glide; the glide must stay on
  //    the step's own path under the current map. Plant glideonce (cand14: written once); control: the step inside the card ─────────────
  if (want("F5")) for (const [nm, s0, s1, th1, where, ins] of [["scale 0.5 → 1", 0.5, 1, 0, "above", 40], ["scale 0.25 → 1", 0.25, 1, 0, "above", 40], ["scale 1 → 1.25", 1, 1.25, 0, "above", 200], ["rotate 0 → 90deg", 1, 1, 90, "above", 40], ["rotate 0 → 90deg with scale 0.5 → 1.25", 0.5, 1.25, 90, "above", 40], ["scale 0.5 → 1, the step inside the card (control)", 0.5, 1, 0, "inside", 40]]) {
    const name = `F5 the glide under a changing carrier · C ${nm} over 240 ms from the act · a ${ins} px insert ${where === "above" ? "before C (at the card's level)" : "inside C above the root"}`;
    const setup = `C.style.scale = '${s0}'; C.style.rotate = '0deg'; ctx.v = [${s0}, 0]; ctx.loop = (n) => { if (ctx.go) { const p = Math.min(1, (performance.now() - ctx.go) / 240); const s = ${s0} + (${s1} - ${s0}) * p, th = ${th1} * p; C.style.scale = s.toFixed(5); C.style.rotate = th.toFixed(4) + 'deg'; ctx.v = [s, th]; } };`;
    const r = await run(name, { setup, hooks: [[8, `${where === "above" ? `G.insertBefore(${blk(ins)}, C)` : `C.insertBefore(${blk(ins)}, root)`}; ctx.go = performance.now();`]], N: 40 });
    emit(name, r, (x) => { const { S, i0, pre } = around(x); if (!pre) return ["FAIL", "no frames"];
      const M = (v) => { const [s, th] = v ?? [1, 0]; const c = Math.cos(th * Math.PI / 180), q = Math.sin(th * Math.PI / 180); return [[s * c, -s * q], [s * q, s * c]]; };
      const app = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; const inv = (A) => { const d = A[0][0] * A[1][1] - A[0][1] * A[1][0]; return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]]; };
      // the root's offset from C's centre at rest, in C's own (unmapped) frame, read on the frame before the act
      // inside the card the insert grows C by ins, so C's centre (its transform origin) moves ins/2 in layout and the root ins/2 from it
      const d0 = app(inv(M(pre.v)), [pre.x - pre.cx, pre.y - pre.cy]); const insLay = where === "above" ? [0, 0] : [0, ins / 2];
      let worst = 0, at = 0, maxr = 0; for (const y of S.slice(i0)) { const Mt = M(y.v); const carried = app(Mt, [d0[0] + insLay[0], d0[1] + insLay[1]]); const rr = [y.x - y.cx - carried[0], y.y - y.cy - carried[1]];
        const D = where === "above" ? [0, ins] : [0 + app(Mt, insLay)[0], ins / 2 + app(Mt, insLay)[1]]; const dd = D[0] * D[0] + D[1] * D[1]; const al = Math.max(-1, Math.min(0, (rr[0] * D[0] + rr[1] * D[1]) / dd)); const dist = Math.hypot(rr[0] - al * D[0], rr[1] - al * D[1]);
        if (dist > worst) { worst = dist; at = y.t - pre.t; } maxr = Math.max(maxr, Math.hypot(...rr)); }
      const first = S[i0]; const jump = Math.hypot(first.x - pre.x, first.y - pre.y - (where === "above" ? 0 : 0));
      return [worst <= 1 ? "PASS" : "FAIL", `the root's residual from where its card carries it, against the step's own painted path under the current map: largest distance ${f(worst, 2)} px at +${f(at, 0)} ms (bound ≤ 1) · the residual's largest size ${f(maxr, 2)} px (the step ${ins} px) · the act's frame moved ${f(jump, 2)} px · glides ${glides(x)} · errors ${x.errs.length}`]; });
  }

  // ── F3 (S15-a rule 2 (iv)): a step inside C in a 3D rendering context (X3's rows); plant flat3d (rule 1 inside the context) ─────────────
  if (want("F3")) for (const [nm, tg, tc] of [["G rotateY(50deg) preserve-3d · C rotateX(50deg)", "G.style.transform = 'rotateY(50deg)'; G.style.transformStyle = 'preserve-3d';", "C.style.transform = 'rotateX(50deg)';"], ["G rotateY(60deg) preserve-3d · C rotateY(-60deg)", "G.style.transform = 'rotateY(60deg)'; G.style.transformStyle = 'preserve-3d';", "C.style.transform = 'rotateY(-60deg)';"], ["G rotateZ(30deg) rotateX(60deg) preserve-3d · C rotateY(40deg)", "G.style.transform = 'rotateZ(30deg) rotateX(60deg)'; G.style.transformStyle = 'preserve-3d';", "C.style.transform = 'rotateY(40deg)';"], ["G rotate: x 55deg preserve-3d · C rotate: y 35deg", "G.style.rotate = 'x 55deg'; G.style.transformStyle = 'preserve-3d';", "C.style.rotate = 'y 35deg';"], ["G rotateY(50deg) flat · C rotateX(50deg) (control: no 3D context)", "G.style.transform = 'rotateY(50deg)';", "C.style.transform = 'rotateX(50deg)';"]]) {
    const name = `F3 a 40 px insert inside C above the root · ${nm}`;
    emit(name, await run(name, { setup: `${tg} ${tc}`, mag: true, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]] }), (r) => gradeStep(r));
  }

  // ── F10 (S15-a rule 5): the every-frame train against the superposition (B1's 40 px every frame, 4 steps; refs cand12, cand13; plant
  //    cand14), a 2 px a frame ramp (the carried control), and V2's Disclosure profile on paint (lag REPORT) ───────────────────────────────
  if (want("F10")) {
    for (const [px, every, n] of [[40, 1, 4], [16, 1, 12], [40, 2, 6]]) {
      const name = `F10 a train of ${px} px inserts every ${every === 1 ? "frame" : "second frame"}, ${n} steps, against one ${px} px step (superposition; ceiling 4 px a frame)`;
      const steps = Array.from({ length: n }, (_, i) => 8 + i * every);
      const one = await run(`${name} · the one step`, { hooks: [[8, `C.insertBefore(${blk(px)}, root)`]], N: 60 });
      const tr = await run(`${name} · the train`, { hooks: steps.map((k) => [k, `C.insertBefore(${blk(px)}, root)`]), N: 60 });
      if (one.crashed || tr.crashed) { cell(name, "FAIL", (one.line ?? "") + (tr.line ?? "")); continue; }
      if (one.unrepeatable || tr.unrepeatable) { cell(name, "UNMEASURED", [one.note, tr.note].filter(Boolean).join(" · ")); continue; }
      emit(name, tr, () => { const q = superpose(one, tr, steps); return [q.mx <= q.bound ? "PASS" : "FAIL", `the train's paint less the sum of the one step's paint shifted to each step's frame: on the steps' frames [${q.atSteps.map((x) => f(x, 2)).join(" ")}] px, max over the film ${f(q.mx, 2)} px (bound ≤ ${f(q.bound, 2)}) · glides ${q.glides} · the one step's act frame ${f(q.act, 2)} px · errors ${tr.errs.length}`]; });
    }
    let name = "F10 a 2 px a frame margin ramp above C for 40 frames (the carried control: under the ceiling)";
    emit(name, await run(name, { setup: "const sp = document.createElement('div'); G.insertBefore(sp, C); ctx.loop = (n) => { if (n >= 8 && n < 48) { ctx.m = (ctx.m ?? 0) + 2; sp.style.marginTop = ctx.m + 'px'; } };", N: 55 }), (x) => [glides(x) <= 1 ? "PASS" : "FAIL", `glides ${glides(x)} (bound ≤ 1: the onset; carried after it) · errors ${x.errs.length}`]);
    for (const h of [40, 300]) {
      name = `F10 a Disclosure-profile open above C: a block 0 → ${h} px on height 200 ms var(--spring-present) (V2), REPORT the lag`;
      const r = await run(name, { setup: "const d = document.createElement('div'); d.style.cssText = 'height:0;overflow:hidden;transition:height 200ms var(--spring-present, ease)'; G.insertBefore(d, C); ctx.d = d;", hooks: [[8, `ctx.d.style.height = '${h}px'`]], N: 40 });
      emit(name, r, (x) => { const { S, i0, pre, end } = around(x); const per = S.slice(i0).map((y, k) => Math.abs(y.y - (k ? S[i0 + k - 1].y : pre.y))); const [st] = step17(S.slice(i0 - 1), pre.t); let last = i0; for (let i = i0; i < S.length; i++) if (Math.abs(S[i].y - end.y) > 0.5) last = i;
        return ["REPORT", `moved ${f(end.y - pre.y, 1)} px · largest per-frame move ${f(Math.max(...per), 2)} px, largest over any 16.7 ms ${f(st, 2)} px · landed (within 0.5 px) at +${f(S[last].t - pre.t, 0)} ms (the panel's own 200 ms) · glides ${glides(x)} · errors ${x.errs.length}`]; });
    }
  }

  // ── M22 (S15-b as folded): the host's own zoom (B3, A5's host cell: graded on its layout-kept edge, class 3), B3 under an offsetParent
  //    zoom, A5's G cells (reference cand14, plant cand12), and X8's insert grid under offsetParent zooms ─────────────────────────────────
  if (want("M22")) {
    for (const [nm, hook, setup] of [["the root's own zoom 1 → 1.5 (B3)", "root.style.zoom = '1.5'", ""], ["the root's own zoom 1 → 0.75 (B3)", "root.style.zoom = '0.75'", ""], ["the root's own zoom 1 → 1.25 (A5's host cell)", "root.style.zoom = '1.25'", ""], ["the root's own zoom 1 → 2", "root.style.zoom = '2'", ""], ["the root's own height + 10 px (B3's control)", "root.style.height = (root.offsetHeight + 10) + 'px'", ""],
      ["the root's own zoom 1 → 1.5 under C (its offsetParent) at zoom 1.25 (F-8's cell)", "root.style.zoom = '1.5'", "C.style.position = 'relative'; C.style.zoom = '1.25';"], ["the root's own zoom 1 → 1.5 under C (its offsetParent) at zoom 2 (F-8's cell)", "root.style.zoom = '1.5'", "C.style.position = 'relative'; C.style.zoom = '2';"]]) {
      const name = `M22 ${nm} · graded on the top-left edge the layout keeps`;
      emit(name, await run(name, { setup, hooks: [[8, hook]], N: 40 }), (r) => { const [v1, l1] = gradeEdge(r, "start", "y"); const [v2, l2] = gradeEdge(r, "start", "x"); return [v1 === "PASS" && v2 === "PASS" ? "PASS" : "FAIL", `top: ${l1} · left: ${l2.split(" · ")[0]}`]; });
    }
    for (const [nm, z] of [["G's zoom 1 → 1.25, the root 300 px deep in G (A5)", "1.25"], ["G's zoom 1 → 0.8, the root 300 px deep in G (A5)", "0.8"]]) {
      const name = `M22 ${nm}`;
      emit(name, await run(name, { setup: `G.insertBefore(${blk(300, "e15-deep")}, C);`, hooks: [[8, `G.style.zoom = '${z}'`]] }), (r) => { const { pre, first } = around(r); const grow = Math.abs(first.h - pre.h) / 2 + Math.abs(first.w - pre.w) / 2; return gradeStep(r, { jumpBound: 0.5 + grow }); });
    }
    for (const [zA, zP, ins] of [[1, 1, 40], [1, 1.25, 40], [1, 2, 40], [2, 0.5, 40], [2, 0.75, 7.3], [2, 0.75, 40], [2, 2, 40], [1.25, 1.5, 200]]) {
      const name = `M22 X8 · G zoom ${zA}, C (the root's offsetParent) zoom ${zP} · a ${ins} px insert inside C above the root`;
      emit(name, await run(name, { setup: `G.style.zoom = '${zA}'; C.style.position = 'relative'; C.style.zoom = '${zP}';`, hooks: [[8, `C.insertBefore(${blk(ins)}, root)`]] }), (r) => gradeStep(r));
    }
  }

  // ── M9 (S15-c): the members E-14's M9 does not hold, graded as steps on the after-step film ──────────────────────────────────────
  if (want("M9")) for (const [nm, setup, hook] of [
    ["a sheet's media flips print → all", "const d = document.createElement('div'); d.className = 'e15m'; G.insertBefore(d, C); const st = document.createElement('style'); st.media = 'print'; st.textContent = '.e15m { height: 40px }'; document.head.appendChild(st); ctx.st = st;", "ctx.st.media = 'all'"],
    ["a CSSOM deleteRule", "const st = document.createElement('style'); st.textContent = '.e15d { height: 40px }'; document.head.appendChild(st); ctx.sh = st.sheet; const d = document.createElement('div'); d.className = 'e15d'; G.insertBefore(d, C);", "ctx.sh.deleteRule(0)"],
    ["a :has() restyle by an attribute below the block", "const st = document.createElement('style'); st.textContent = '.e15h { height: 0 } .e15h:has([data-on]) { height: 40px }'; document.head.appendChild(st); const d = document.createElement('div'); d.className = 'e15h'; d.innerHTML = '<i></i>'; G.insertBefore(d, C); ctx.i = d.firstChild;", "ctx.i.setAttribute('data-on', '')"],
    ["a <link> sheet served 60 ms after its insertion", "const d = document.createElement('div'); d.className = 'e15l'; G.insertBefore(d, C);", "const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/__h15/late.css?ms=60'; document.head.appendChild(l)"],
    ["an <img> with no size served 60 ms after its src", "const i = document.createElement('img'); i.style.display = 'block'; G.insertBefore(i, C); ctx.i = i;", "ctx.i.src = '/__h15/late.svg?ms=60'"]]) {
    const name = `M9 ${nm} · 40 px above the root`;
    emit(name, await run(name, { setup, hooks: [[8, hook]], N: 50, late: /served/.test(nm) }), (x) => gradeStep(x));
  }

  // ── M16b (S15-d4 branch (i)'s limit): an insert above a released host within its exit clock: the step paints as laid out, REPORT ──
  if (want("M16b")) for (const [ins, at] of [[40, 3], [200, 10]]) {
    const name = `M16b released, then a ${ins} px insert above the root at frame ${at} · STATED LIMIT (branch (i)), REPORT`;
    const r = await guard(name, async () => { const P = await openPage(E, T, sc, {}); try { const st = await P.page.evaluate(SETUP, [R, "", {}]); await P.page.waitForTimeout(200); const eng = await kbd(P); await P.page.keyboard.press(tabKey(engine));
      const out = await P.page.evaluate(FILM, [R, ENG, 40, [[at, `C.insertBefore(${blk(ins)}, root)`]]]); return { out, st, eng, errs: errsOf(P), AT: at }; } finally { await P.close(); } }, 60000);
    emit(name, r, (x) => { const { pre, first, end } = around(x); return ["REPORT", `on the insert's frame the root moved ${f(first.y - pre.y, 2)} px; in all ${f(end.y - pre.y, 2)} px of ${ins} · glides ${glides(x)} · still on the stage at the end ${end.stage} · errors ${x.errs.length}`]; });
  }

  // ── D8 (S15-e withdrawn; F-1): the reach's gutter against the PAGE consumer (CE13c's cell), four rows; hostgutter = cand13's host read ──
  if (want("D8")) for (const [nm, tok, how] of [["2em on :root, host 14 px (D8 row 1)", "2em", "font"], ["4cqi on :root, host in a 400 px container (D8 row 2)", "4cqi", "cq"], ["2rem (the library's default)", "2rem", "font"], ["2rem on :root, 2em on main", "2rem", "main2em"]]) {
    const name = `D8 --space-section ${nm} · against the page consumer`;
    const r = await guard(name, async () => { const room = how === "cq" ? 30 : 34; const P = await openPage(E, T, sc, { plant: ["--space-section", tok] });
      try { await P.page.evaluate(SETUP, [R, `ctx.noCentre = false; const W = innerWidth - ${2 * room}; root.style.width = W + 'px'; root.style.maxWidth = 'none'; ${how === "cq" ? "C.style.containerType = 'inline-size'; C.style.width = '400px';" : "root.style.fontSize = '14px';"} ${how === "main2em" ? "mn.style.setProperty('--space-section', '2em');" : ""}
          const l = root.getBoundingClientRect().left; root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (${room} - l) + 'px';
          const c = document.createElement('div'); c.setAttribute('data-t','e15-gutter'); c.style.paddingInline = 'var(--space-section)'; mn.appendChild(c); window.__gutter = parseFloat(getComputedStyle(c).paddingLeft);`, {}]);
        const pre = await P.page.evaluate((R) => { const r = document.querySelector(R).getBoundingClientRect(); return { l: r.left, r: innerWidth - r.right, w: r.width }; }, R);
        const eng = await kbd(P); await P.page.waitForTimeout(300);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); return { l: r.left, r: innerWidth - r.right, w: r.width, reach: getComputedStyle(e).getPropertyValue("--stage-reach").trim(), gutter: window.__gutter }; }, R);
        return { pre, v, eng, st: { vis: true }, errs: errsOf(P) }; } finally { await P.close(); } }, 60000);
    emit(name, r, (x) => { const gap = Math.min(x.v.l, x.v.r); const capped = x.v.w / x.pre.w < 1.0599; const off = gap - x.v.gutter; if (!capped) return ["UNMEASURED", `NOT DRIVEN: the reach did not cap (${f(x.pre.w, 1)} → ${f(x.v.w, 1)} px)`];
      return [Math.abs(off) <= 1 ? "PASS" : "FAIL", `rest ${f(x.pre.w, 1)} px, ${f(x.pre.l, 1)} / ${f(x.pre.r, 1)} from the edges · engaged ${f(x.v.w, 1)} px (×${f(x.v.w / x.pre.w, 4)}, --stage-reach "${x.v.reach}"), ${f(x.v.l, 1)} / ${f(x.v.r, 1)} · the page consumer's gutter ${f(x.v.gutter, 2)} px · the held box stops ${f(off, 2)} px off it (bound ±1) · errors ${x.errs.length}`]; });
  }

  // ── A1 (S15-h as folded, F-2): a transformed link inside a shadow tree the host is slotted through ───────────────────────────────
  // the card's style is read from data-css when the element connects (an element made by createElement has no attributes in its constructor)
  const shadow = (css, mode, lv = 1) => `const tag = 'e15-wrap-${mode}'; if (!customElements.get(tag)) customElements.define(tag, class extends HTMLElement { connectedCallback() { if (this.__s) return; this.__s = true; const s = this.attachShadow({ mode: '${mode}' }); s.innerHTML = '<div style="' + (this.getAttribute('data-css') ?? '') + '"><slot></slot></div>'; } });
    let inner = C; for (let i = 0; i < ${lv}; i++) { const X = document.createElement(tag); X.setAttribute('data-css', i === 0 ? '${css}' : ''); X.style.display = 'block'; inner.before(X); X.appendChild(inner); inner = X; } ctx.X = inner; ctx.ref = C;`;
  if (want("A1")) for (const [nm, css, mode, lv, where, late] of [
    ["scale 0.5 (origin 0 0), open root", "scale:0.5;transform-origin:0 0", "open", 1, "above", null], ["scale 0.5 (origin 0 0), closed root", "scale:0.5;transform-origin:0 0", "closed", 1, "above", null],
    ["rotate 20deg, open root", "rotate:20deg", "open", 1, "above", null], ["rotate 20deg, closed root", "rotate:20deg", "closed", 1, "above", null], ["scale 1.5 (origin 0 0), open root", "scale:1.5;transform-origin:0 0", "open", 1, "above", null],
    ["scale 0.5 (origin 0 0), open, two shadow levels", "scale:0.5;transform-origin:0 0", "open", 2, "above", null],
    ["a closed carrier that starts after the hold: scale 1 → 0.5 (origin 0 0) at frame 3", "transform-origin:0 0", "closed", 1, "above", "scale"],
    ["scale 0.5, open root · the insert inside the card above the root (control: below the transform)", "scale:0.5;transform-origin:0 0", "open", 1, "inside", null]]) {
    const name = `A1 a transformed link inside a shadow tree · ${nm}${where === "above" ? " · a 40 px insert above the shadow host" : ""}`;
    // the late carrier reaches a closed root's card through an inherited custom property set on the shadow host (no handle on the card)
    const r = await run(name, { setup: shadow(late ? "transform-origin:0 0;scale:var(--e15s, 1)" : css, mode, lv), mag: true, hooks: [...(late ? [[3, "ctx.X.style.setProperty('--e15s', '0.5')"]] : []), [8, where === "above" ? `ctx.X.before(${blk(40)})` : `C.insertBefore(${blk(40)}, root)`]] });
    emit(name, r, (x) => gradeStep(x));
  }

  // ── A2 (S15-h, F-7): a stylesheet percentage translate inside `transform`, with an origin; X4 row 1 (a mismatched-list transition) ──
  if (want("A2")) for (const [nm, css, origin, extra] of [
    ["transform: translateY(-50%), origin 0 0", "transform: translateY(-50%)", "0 0", ""], ["transform: translate(-50%, -50%), origin top center", "transform: translate(-50%, -50%)", "top center", ""],
    ["transform: translateY(-10%), origin 50% 50%", "transform: translateY(-10%)", "50% 50%", ""], ["transform: translate(-100%, -100%) rotate(10deg) scale(0.8), origin 0 0 (nested)", "transform: translate(-100%, -100%) rotate(10deg) scale(0.8)", "0 0", ""],
    ["transform: translateY(-50%), the default origin (control)", "transform: translateY(-50%)", null, ""], ["translate: 0 -50%, origin 0 0 (control)", "translate: 0 -50%", "0 0", ""],
    ["X4 row 1: transform translate(-50%, -50%) rotate(10deg) → scale(1.2) under a 20 s transition, at about 2 %", "transform: translate(-50%, -50%) rotate(10deg); transition: transform 20s linear", "0 0", "mid"]]) {
    const name = `A2 a stylesheet ${nm} · a 40 px insert inside the card above the root`;
    const setup = `const st = document.createElement('style'); st.textContent = '.e15pc { ${css}; ${origin ? `transform-origin: ${origin};` : ""} position: relative; left: 50%; top: 0 } .e15pc.e15to { transform: scale(1.2) }'; document.head.appendChild(st); C.classList.add('e15pc'); C.style.marginTop = '240px'; ctx.ref = C;${extra === "mid" ? " ctx.after = \"C.getBoundingClientRect(); C.classList.add('e15to');\";" : ""}`;
    emit(name, await run(name, { setup, mag: true, settle: extra === "mid" ? 400 : 200, hooks: [[8, `C.insertBefore(${blk(40)}, root)`]] }), (r) => gradeStep(r));
  }

  // ── A3 (S15-h as folded, F-6): the host's block size 80 → 40 px and an insert above it in one frame, at each alignment X5 names and at
  //    the forms S15 names unread. The point the engine keeps is READ first on each scene (the same size change with no insert, before
  //    the hold, read in layout), then the film grades that point (the edge grade) ─────────────────────────────────────────────────────
  if (want("A3")) for (const [nm, css, ins] of [
    ["block in flow (start)", "", 20], ["block in flow (start), a 10 px insert (outside the band: control)", "", 10],
    ["parent align-content: center (block)", "C.style.alignContent = 'center'; C.style.height = '200px';", 20], ["parent align-content: end (block)", "C.style.alignContent = 'end'; C.style.height = '200px';", 20],
    ["flex column-reverse", "C.style.display = 'flex'; C.style.flexDirection = 'column-reverse'; C.style.height = '200px'; C.style.alignItems = 'flex-start';", 20], ["grid align-content: end", "C.style.display = 'grid'; C.style.alignContent = 'end'; C.style.height = '200px';", 20],
    ["table-cell vertical-align: middle", "C.style.display = 'table-cell'; C.style.verticalAlign = 'middle'; C.style.height = '200px';", 20], ["abspos inset 0, margin auto", "C.style.position = 'relative'; C.style.height = '200px'; root.style.position = 'absolute'; root.style.inset = '0'; root.style.margin = 'auto';", 20],
    ["abspos bottom 10px", "C.style.position = 'relative'; C.style.height = '200px'; root.style.position = 'absolute'; root.style.bottom = '10px';", 20],
    ["flex column, justify-content: flex-end (unread form)", "C.style.display = 'flex'; C.style.flexDirection = 'column'; C.style.justifyContent = 'flex-end'; C.style.height = '200px'; C.style.alignItems = 'flex-start';", 20],
    ["table-cell vertical-align: bottom (unread form)", "C.style.display = 'table-cell'; C.style.verticalAlign = 'bottom'; C.style.height = '200px';", 20],
    ["vertical writing mode on C, block in flow (unread form)", "C.style.writingMode = 'vertical-rl'; C.style.height = '300px';", 20]]) {
    const name = `A3 the root's height 80 → 40 px and a ${ins} px insert above it in one frame · ${nm}`;
    const setup = `root.style.boxSizing = 'border-box'; root.style.height = '80px'; root.style.minHeight = '0'; root.style.maxHeight = 'none'; ${css}
      { const q0 = root.getBoundingClientRect(); root.style.height = '40px'; const q1 = root.getBoundingClientRect(); root.style.height = '80px';
        const d = { start: Math.abs(q1.top - q0.top), centre: Math.abs((q1.top + q1.bottom) / 2 - (q0.top + q0.bottom) / 2), end: Math.abs(q1.bottom - q0.bottom), lstart: Math.abs(q1.left - q0.left), lend: Math.abs(q1.right - q0.right) };
        ctx.kept = Object.entries({ start: d.start, centre: d.centre, end: d.end }).sort((a, b) => a[1] - b[1])[0][0]; ctx.keptD = d; }`;
    // in the vertical writing mode the insert is laid along the block axis (its width), so the step is horizontal: graded on the block-start
    // (right) edge as well as on the kept inline point
    const vert = /writing/.test(nm); const ins1 = vert ? `(() => { const b = document.createElement('div'); b.style.width = '${ins}px'; b.style.height = '10px'; return b; })()` : blk(ins);
    const r = await run(name, { setup, hooks: [[8, `C.insertBefore(${ins1}, root); root.style.height = '40px';`]], read: "return { kept: ctx.kept, d: ctx.keptD };" });
    emit(name, r, (x) => { const k = x.extra?.kept ?? "start"; const [v, line] = gradeEdge(x, k, "y", { stepGlided: true }); const [v2, l2] = vert ? gradeEdge(x, "end", "x", { stepGlided: true }) : ["PASS", ""];
      return [v === "PASS" && v2 === "PASS" ? "PASS" : "FAIL", `the engine keeps the ${k} point on this scene (read before the hold, no insert: Δ start ${f(x.extra?.d?.start, 2)}, centre ${f(x.extra?.d?.centre, 2)}, end ${f(x.extra?.d?.end, 2)} px) · ${line}${vert ? ` · the block-start (right) edge: ${l2.split(" · ")[0]}` : ""}`]; });
  }

  // ── A12 (S15-h, X6): a relatively positioned link's inset under a CSS transition is a carrier value; absolute is a level change (REPORT) ─
  if (want("A12")) for (const [nm, css, go, abs] of [
    ["C's top 0 → 120 px, 400 ms linear", "C.style.position = 'relative'; C.style.top = '0px'; C.style.transition = 'top 400ms linear';", "C.style.top = '120px'", false],
    ["C's top 0 → 120 px, 400 ms ease-in-out", "C.style.position = 'relative'; C.style.top = '0px'; C.style.transition = 'top 400ms ease-in-out';", "C.style.top = '120px'", false],
    ["C's top 0 → 200 px, 150 ms ease", "C.style.position = 'relative'; C.style.top = '0px'; C.style.transition = 'top 150ms ease';", "C.style.top = '200px'", false],
    ["C's left 0 → 120 px, 400 ms ease", "C.style.position = 'relative'; C.style.left = '0px'; C.style.transition = 'left 400ms ease';", "C.style.left = '120px'", false],
    ["C's inset-block-start 0 → 120 px, 600 ms on the dock row", "C.style.position = 'relative'; C.style.insetBlockStart = '0px'; C.style.transition = 'inset-block-start 600ms var(--spring-dock, ease)';", "C.style.insetBlockStart = '120px'", false],
    ["C's bottom auto → top: auto; bottom 0 → 60 px, 400 ms linear (X6's form)", "C.style.position = 'relative'; C.style.top = 'auto'; C.style.bottom = '0px'; C.style.transition = 'bottom 400ms linear';", "C.style.bottom = '60px'", false],
    ["C absolute, top 0 → 120 px, 400 ms linear · STATED LIMIT (a level change, b.6), REPORT", "G.style.position = 'relative'; G.style.minHeight = '400px'; C.style.position = 'absolute'; C.style.top = '0px'; C.style.transition = 'top 400ms linear';", "C.style.top = '120px'", true]]) {
    const name = `A12 ${nm}, during the hold`;
    const r = await run(name, { setup: css, hooks: [[6, go]], N: 50 });
    emit(name, r, (x) => { const S = x.out.filter((y) => y.eng); if (S.length < 5) return ["FAIL", `engaged on ${S.length} frames`]; const z = S[0]; const off = S.map((y) => Math.hypot(y.x - y.cx - (z.x - z.cx), y.y - y.cy - (z.y - z.cy))); const g = S.at(-1).glides; const mx = Math.max(...off);
      const line = `the card moved ${f(S.at(-1).cy - z.cy, 1)}, ${f(S.at(-1).cx - z.cx, 1)} px · the root's centre apart from its card's: max ${f(mx, 2)} px, frames over 2 px ${off.filter((y) => y > 2).length} (bound ≤ 0.5) · glides started ${g} (bound 0) · errors ${x.errs.length}`;
      return abs ? ["REPORT", line] : [mx <= 0.5 && g === 0 ? "PASS" : "FAIL", line]; });
  }

  // ── EXIT (S15-d4, F-11): a consumer settle of 0.08 s; the released host's painted size continuous across the hide frame (dockexit) ──
  if (want("EXIT")) for (const settle of ["0.08s", "0.21s"]) {
    const name = `EXIT --spring-dock-settle ${settle} on <html>: the released root's painted width across the stage's hide${settle === "0.21s" ? " (the library's settle: control)" : ""}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, sc, { plant: ["--spring-dock-settle", settle] }); try { const st = await P.page.evaluate(SETUP, [R, "", {}]); await P.page.waitForTimeout(200); const eng = await kbd(P); await P.page.waitForTimeout(300); await P.page.keyboard.press(tabKey(engine));
      const out = await P.page.evaluate(FILM, [R, ENG, 30, []]); return { out, st, eng, errs: errsOf(P), AT: 1 }; } finally { await P.close(); } }, 60000);
    emit(name, r, (x) => { const S = x.out; const dw = S.slice(1).map((y, k) => y.w - S[k].w); const hide = S.findIndex((y, k) => k > 0 && S[k - 1].stage && !y.stage); const jumpAt = hide > 0 ? Math.abs(S[hide].w - S[hide - 1].w) : 0;
      const ref = Math.max(0.5, ...dw.slice(Math.max(0, hide - 4), Math.max(0, hide - 1)).map(Math.abs));
      const ok = hide < 0 || jumpAt <= 2 * ref + 0.5; return [ok ? "PASS" : "FAIL", `width ${f(S[0].w, 1)} → ${f(S.at(-1).w, 1)} px over ${S.length} frames · the stage hid ${hide < 0 ? "before the film or never" : `on frame ${S[hide].n} (+${f(S[hide].t - S[0].t, 0)} ms)`} · the width's change on that frame ${f(jumpAt, 2)} px against the grow's own return just before it ${f(ref, 2)} px a frame (bound ≤ 2 × that + 0.5: continuous) · per-frame changes [${dw.slice(0, 16).map((d) => f(d, 1)).join(" ")}] · errors ${x.errs.length}`]; });
  }

  // ── COST (S15-g rules 3-4, Chromium CDP): forced layouts and recalcs per frame kind, REPORT (part B prices them against S15's bounds) ──
  if (want("COST")) {
    if (engine !== "chromium") cell("COST the stage's forced work by frame kind", "REPORT", "Chromium CDP only; not read in WebKit");
    else for (const [nm, setup, hooks] of [["held still, 30 frames", "", []], ["a carrier-only window: C translate sine 80 px / 600 ms, 30 frames", sine(80, 600, "translate"), [[1, "ctx.go = performance.now()"]]], ["an affine step window: a 40 px insert above the root, 14 frames", "", [[2, `C.insertBefore(${blk(40)}, root)`]]], ["a projective step window: C perspective(200px) rotateX(25deg), a 40 px insert inside C, 14 frames", "C.style.transform = 'perspective(200px) rotateX(25deg)';", [[2, `C.insertBefore(${blk(40)}, root)`]]]]) {
      const name = `COST ${nm}`; const N = nm.includes("30 frames") ? 30 : 14;
      const r = await guard(name, async () => { const P = await openPage(E, T, sc, {}); try { await P.page.evaluate(SETUP, [R, setup, {}]); await P.page.waitForTimeout(200); const eng = await kbd(P); const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); const met = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
        const a0 = await met(); const out = await P.page.evaluate(FILM, [R, ENG, N, hooks]); const a1 = await met(); return { eng, out, lay: a1.LayoutCount - a0.LayoutCount, rec: a1.RecalcStyleCount - a0.RecalcStyleCount, sms: (a1.ScriptDuration - a0.ScriptDuration) * 1000 }; } finally { await P.close(); } }, 60000);
      cell(name, "REPORT", r.crashed ? r.line : `engaged ${r.eng} · over ${N} frames: layouts ${r.lay}, style recalcs ${r.rec}, script ${f(r.sms, 1)} ms (the film's own read is one layout a frame: ${N}) · less the film's: ${r.lay - N} layouts`);
    }
  }
}, 3600);
