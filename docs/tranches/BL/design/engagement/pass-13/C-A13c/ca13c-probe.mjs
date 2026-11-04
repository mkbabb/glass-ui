#!/usr/bin/env node
// C-A13-complete (D5 pass 13, wave c3): C-A13's §2 members driven on a BUILT candidate on the harness's own scene app, each graded, each
// beside a reference that reads the other verdict (cand12 or HEAD for a member cand13 fails; the easy member or a record-carried twin
// for one it passes). Not a witness of record: every cell is scored in C-A13-complete.md against the CK row it would break.
// The harness's lib and its E-10 `hg13` drive, copied in substance: the loupe row without a clip, C the root's parent, G C's parent;
// <html> overflow-anchor none; main padded 230 px top and 1600 px bottom, the root brought to mid-viewport; a fine hold, +900 ms; then
// filmed per frame in a task posted from requestAnimationFrame (after that frame's paint), stamped with the document timeline; the act on
// frame 8; 60 frames. One browser per run (witness()), a fresh context per cell, every page and context closed in a finally.
//   persp · P/θ/M        §2.1: C carries perspective(Ppx) rotateX(θ) about 50% 0; on frame 8 an M px block is inserted as C's first child
//                        (a childList record). PASS: the root's painted centre on the act's frame ≤ 0.5 px from where it was painted, its
//                        largest move over any 16.7 ms ≤ moved × the glide row's peak + 1 px, a glide ran if it moved ≥ 5 px (H13's grade)
//   animstart · C|G      §2.2: on frame 8 a class is added to C (or G) that starts `@keyframes { from { translate: 0 -40px } }` 600 ms linear.
//                        The root lies inside the animated box, so it must ride it: PASS when the root's painted offset from the animated
//                        box's painted centre moves ≤ 0.5 px over the film and no translate glide starts on the root
//   norec · shadow|fieldsizing|link   §2.3: a move with no record on <html>'s subtree, before C: an open shadow root's div 20 → 76 px; a
//                        `field-sizing: content` textarea's `value` set as a property (1 → 5 lines); a <link rel=stylesheet> (a blob URL)
//                        whose rule gives a block 40 px at load. Each beside its record-carried twin (rec · …): a light-DOM style write,
//                        the textarea's text node, a <style> element. PASS when the root's largest move over any 16.7 ms ≤ moved × peak
//                        + 1 px (a one-frame cut fails); NOT DRIVEN if the paint moved < 5 px
//   lens · <card>        §2.4: the held slider's loupe under C's card: none, rotate 10deg, rotate 10deg + scale 0.8 (origin 0 0), skewX
//                        15deg; the lens's --lens-sx/--lens-sy and painted box over its layout box. PASS (rotate cards) when each axis
//                        is within 0.01 of the unrotated hold's figure × the card's scale; skew REPORT. Still <label>-<engine>-lens-*.png
//   hostsize             §5 item 8 (C-E13 D5): the host's own box resizes (C's width 300 → 380 px, a style record on C; the root's
//                        width follows C). PASS when the root's painted left edge, fixed in layout, moves ≤ 0.5 px on every frame
//   tok · <token: form>  §2.6, C-E13 D7: the token planted on <html> before any page script; a hold, then the outside insert of 40 px on
//                        frame 8. Read: engage console errors naming the token, the glide's clock on the root, and the library's own
//                        consumer of the token computed on a probe (`calc(var(--spring-dock-settle) * var(--motion-tempo))` as a
//                        transition-duration; `calc(1 + (var(--scale-engage) - 1) * 1)` as a scale). PASS when the script takes what the
//                        consumer computes (no error naming the token; a settle's glide clock within 2 ms of the consumer's) or the
//                        consumer refuses it too and the script is loud
//   trans · <rule>       §2.7, F7: the rule on the root (the element `tokenOf` reads), then the hold and the outside insert. PASS when the
//                        hold raises 0 engage errors on default tokens and the glide runs on the dock clock (210 ms ± 2)
//   residue              §P13-7 item 10 (P-E13-complete §7 item 4): every element in the root's subtree and its ancestors that has no
//                        `style` attribute before the press; a hold 400 ms, release, +800 ms. PASS when none carries one after
//   node ca13c-probe.mjs --build <dir> --label <l> [--engine webkit] [--only persp,animstart,norec,lens,hostsize,tok,trans,residue] [--frames <dir>]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import path from "node:path";
const { witness, openPage, center, f, rowsOf, rowFacts, rodeRow } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;

await witness("C-A13c probe", "C-A13 §2 members on the built candidate (C-A13-complete)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const label = typeof a.label === "string" ? a.label : "build"; const FR = typeof a.frames === "string" ? a.frames : null; if (FR) fs.mkdirSync(FR, { recursive: true });
  const [sc, m] = Object.entries(idx).find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[data-e~="thumb"]', LP = m.loupe;

  // page side: the setup for a case (before the hold)
  const setup = ([R, c]) => {
    const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body;
    document.documentElement.style.overflowAnchor = "none"; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
    const blk = (h, t) => { const b = document.createElement("div"); b.style.height = `${h}px`; b.setAttribute("data-t", t); return b; };
    const st = (txt) => { const s = document.createElement("style"); s.setAttribute("data-t", "ca13-style"); s.textContent = txt; document.head.appendChild(s); };
    if (c.k === "persp") { C.style.transform = `perspective(${c.P}px) rotateX(${c.th}deg)`; C.style.transformOrigin = "50% 0"; }
    if (c.k === "animstart") st("@keyframes ca13drop { from { translate: 0 -40px } to { translate: 0 0 } } .ca13drop { animation: ca13drop 600ms linear }");
    if (c.k === "norec") {
      if (c.v === "shadow" || c.v === "rec-shadow") { const h = document.createElement("div"); h.setAttribute("data-t", "ca13-host"); const inner = document.createElement("div"); inner.style.height = "20px"; if (c.v === "shadow") { h.attachShadow({ mode: "open" }).appendChild(inner); } else h.appendChild(inner); window.__ca13inner = inner; G.insertBefore(h, C); }
      if (c.v === "fieldsizing" || c.v === "rec-fieldsizing") { const ta = document.createElement("textarea"); ta.setAttribute("data-t", "ca13-ta"); ta.style.cssText = "field-sizing:content;display:block;font:16px/20px monospace;width:200px;padding:0;border:0;margin:0;resize:none;overflow:hidden"; ta.rows = 1; ta.textContent = "x"; window.__ca13ta = ta; G.insertBefore(ta, C); }
      if (c.v === "link" || c.v === "rec-style") { const b = document.createElement("div"); b.className = "ca13l"; b.setAttribute("data-t", "ca13-l"); G.insertBefore(b, C); }
    }
    if (c.k === "lens" && c.css) Object.assign(C.style, c.css);
    if (c.k === "hostsize") { C.style.width = "300px"; C.style.marginRight = "auto"; }
    if (c.k === "trans" && c.css) Object.assign(root.style, c.css);
    const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60);
    const q = root.getBoundingClientRect(); return { y: q.top + q.height / 2, w: q.width, sty: root.getAttribute("style") };
  };
  // page side: the act, by name
  const act = ([R, c]) => {
    const root = document.querySelector(R), C = root.parentElement, G = C.parentElement;
    const blk = (h) => { const b = document.createElement("div"); b.style.height = `${h}px`; b.setAttribute("data-t", "ca13-block"); return b; };
    if (c.k === "persp") { C.insertBefore(blk(c.M), C.firstChild); return; }
    if (c.k === "animstart") { (c.on === "G" ? G : C).classList.add("ca13drop"); return; }
    if (c.k === "norec") {
      if (c.v === "shadow" || c.v === "rec-shadow") window.__ca13inner.style.height = "76px";
      if (c.v === "fieldsizing") window.__ca13ta.value = "x\nx\nx\nx\nx";
      if (c.v === "rec-fieldsizing") window.__ca13ta.textContent = "x\nx\nx\nx\nx";
      if (c.v === "link") { const l = document.createElement("link"); l.rel = "stylesheet"; l.setAttribute("data-t", "ca13-link"); l.href = URL.createObjectURL(new Blob([".ca13l { height: 40px }"], { type: "text/css" })); document.head.appendChild(l); }
      if (c.v === "rec-style") { const s = document.createElement("style"); s.setAttribute("data-t", "ca13-style"); s.textContent = ".ca13l { height: 40px }"; document.head.appendChild(s); }
      return;
    }
    if (c.k === "hostsize") { C.style.width = "380px"; return; }
    G.insertBefore(blk(40), C); // tok, trans: the outside insert
  };
  const film = ([R, c, AT, actSrc]) => new Promise((ok) => {
    const act = new Function(`return (${actSrc})`)();
    const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
    const A = c.on === "G" ? G : C; const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0;
    ch.port1.onmessage = () => { const r = root.getBoundingClientRect(), ar = A.getBoundingClientRect();
      const an = root.getAnimations().filter((x) => !isCss(x) && x.playState === "running" && Object.keys(x.effect.getKeyframes()[0] ?? {}).includes("translate")).map((x) => x.effect.getTiming().duration);
      out.push({ n, t: T() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, rt: r.right, w: r.width, ax: ar.left + ar.width / 2, ay: ar.top + ar.height / 2, an, held: root.dataset.held !== undefined || root.hasAttribute("data-engaged") }); };
    const tick = () => { n++; if (n === AT) act([R, c]); ch.port2.postMessage(0); if (n < 60) requestAnimationFrame(tick); else setTimeout(() => ok({ out, AT }), 40); };
    requestAnimationFrame(tick);
  });
  // the library's consumers of the planted tokens, computed on a probe element
  const consumers = () => { const p = document.createElement("div"); p.style.cssText = "position:absolute;left:-9999px;transition-property:opacity;transition-duration:calc(var(--spring-dock-settle) * var(--motion-tempo));scale:calc(1 + (var(--scale-engage) - 1) * 1)"; document.body.appendChild(p); const cs = getComputedStyle(p); const o = { dur: cs.transitionDuration, scale: cs.scale, dockDur: getComputedStyle(document.documentElement).getPropertyValue("--spring-dock-duration").trim() }; p.remove(); return o; };
  const run = async (c, o = {}) => guard(c.name, async () => {
    const P = await openPage(E, T, sc, o);
    try {
      const st = await P.page.evaluate(setup, [R, c]); await P.page.waitForTimeout(250);
      const rows = await P.page.evaluate(rowsOf); const cons = await P.page.evaluate(consumers);
      const k = await center(P.page, TH); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
      try { await P.page.waitForTimeout(900); const r = await P.page.evaluate(film, [R, c, 8, act.toString()]); return { ...r, rows, st, cons, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
    } finally { await P.close(); }
  }, 60000);
  const pre = (r) => r.out[r.out.findIndex((x) => x.n >= r.AT) - 1]; const atAct = (r) => r.out[r.out.findIndex((x) => x.n >= r.AT)];
  const grade = (r, { jumpGate = true } = {}) => {
    const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const p = S[i0 - 1], first = S[i0]; if (!p || !first) return { v: "FAIL", line: `no frame before or on the act's (${S.length})` };
    const durs = [...new Set(S.slice(i0).flatMap((x) => x.an))]; const end = S.at(-1);
    const moved = Math.hypot(end.x - p.x, end.y - p.y), jump = Math.hypot(first.x - p.x, first.y - p.y);
    const facts = r.rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((q, x) => (!q || x.peak > q.peak ? x : q), null); const rode = rodeRow(durs, r.rows); const row = rode ?? fastest; const bound = moved * (row?.peak ?? 0) + 1;
    const W = S.slice(i0 - 1); const at = (t, kk) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const u = W[i - 1], q = W[i]; return u[kk] + ((q[kk] - u[kk]) * (t - u.t)) / Math.max(1e-6, q.t - u.t); } return W.at(-1)[kk]; };
    let step = 0, stepAt = NaN; for (const x of W) if (x.t - W[0].t >= NOM) { const d = Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")); if (d > step) { step = d; stepAt = x.t - p.t; } }
    const glided = durs.length > 0; const need = moved >= 5;
    const ok = p.held && (!jumpGate || jump <= 0.5) && step <= bound && (!need || glided);
    const pth = S.slice(Math.max(0, i0 - 1), i0 + 4).map((x) => `${f(x.x - p.x, 1)},${f(x.y - p.y, 1)}`).join(" ");
    return { v: !p.held ? "UNMEASURED" : ok ? "PASS" : "FAIL", moved, jump, step, durs, line: `${p.held ? "" : "NOT DRIVEN: not held · "}paint moved ${f(end.x - p.x, 2)}, ${f(end.y - p.y, 2)} (${f(moved, 2)} px); on the act's frame ${f(jump, 2)} px from where painted${jumpGate ? " (bound ≤ 0.5)" : ""} · largest move over any 16.7 ms ${f(step, 1)} px at +${f(stepAt, 0)} ms (bound ${f(bound, 1)} = ${f(moved, 1)} × ${row ? `${row.n} ${f(row.peak, 3)}` : "?"} + 1) · glide ${glided ? `ran (${durs.map((x) => f(x, 0)).join(",")} ms)` : "none"} · path [${pth}] · errors ${r.errs.length}${r.errs[0] ? ` (${r.errs[0].slice(0, 110)})` : ""}` };
  };

  // §2.1 the perspective sweep
  if (want("persp")) for (const [P, th, M] of [[600, 25, 40], [600, 25, 160], [300, 45, 40], [300, 45, 160], [200, 60, 40], [200, 60, 120]]) {
    const c = { k: "persp", P, th, M, name: `persp · ${P}px / ${th}deg / ${M} px` }; const r = await run(c);
    if (r.crashed) { cell(c.name, "FAIL", r.line); continue; } const g = grade(r); cell(c.name, g.v, `${label} · ${g.line}`);
  }
  // §2.2 an animation the record itself starts
  if (want("animstart")) for (const on of ["C", "G"]) {
    const c = { k: "animstart", on, name: `animstart · class starts @keyframes translate 0 -40px → 0 on ${on}` }; const r = await run(c);
    if (r.crashed) { cell(c.name, "FAIL", r.line); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const p = S[i0 - 1]; const off = (x) => [x.x - x.ax, x.y - x.ay]; const o0 = off(p);
    let worst = 0, wAt = 0; for (const x of S.slice(i0)) { const o = off(x); const d = Math.hypot(o[0] - o0[0], o[1] - o0[1]); if (d > worst) { worst = d; wAt = x.n; } }
    const glides = S.slice(i0, i0 + 12).filter((x) => x.an.length).length; const aMove = Math.hypot(S[i0].ax - p.ax, S[i0].ay - p.ay);
    const driven = aMove > 1 || Math.abs(S[i0].ay - S[i0 + 3]?.ay) > 1;
    cell(c.name, !p.held ? "UNMEASURED" : !driven ? "UNMEASURED" : worst <= 0.5 && glides === 0 ? "PASS" : "FAIL", `${label} · ${driven ? "" : "NOT DRIVEN: the box did not animate · "}the animated box's painted centre moved ${f(S[i0].ay - p.ay, 2)} px on the act's frame · the root's offset from it moved up to ${f(worst, 2)} px (frame ${wAt}; bound ≤ 0.5) · translate glides on the root in 12 frames ${glides}${glides ? ` (${[...new Set(S.slice(i0, i0 + 12).flatMap((x) => x.an))].map((x) => f(x, 0)).join(",")} ms)` : ""} · root path [${S.slice(i0 - 1, i0 + 4).map((x) => f(x.y - p.y, 1)).join(" ")}] · errors ${r.errs.length}`);
  }
  // §2.3 moves with no record, each beside its record-carried twin
  if (want("norec")) for (const v of ["shadow", "rec-shadow", "fieldsizing", "rec-fieldsizing", "link", "rec-style"]) {
    const c = { k: "norec", v, name: `norec · ${v}` }; const r = await run(c);
    if (r.crashed) { cell(c.name, "FAIL", r.line); continue; } const g = grade(r, { jumpGate: false });
    cell(c.name, g.v === "PASS" || g.v === "FAIL" ? (g.moved < 5 ? "UNMEASURED" : g.v) : g.v, `${label} · ${g.moved < 5 ? "NOT DRIVEN: the paint moved < 5 px · " : ""}${g.line}`);
  }
  // §2.4 the lens under a rotated or skewed card
  if (want("lens")) {
    let base = null;
    for (const [tf, css, s] of [["none", null, 1], ["rotate 10deg", { rotate: "10deg" }, 1], ["rotate 10deg + scale 0.8", { rotate: "10deg", scale: "0.8", transformOrigin: "0 0" }, 0.8], ["skewX 15deg", { transform: "skewX(15deg)" }, null]]) {
      const name = `lens · ${tf}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc, {});
        try {
          await P.page.evaluate(setup, [R, { k: "lens", css }]); await P.page.waitForTimeout(300);
          const k = await center(P.page, TH); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
          try {
            await P.page.waitForTimeout(700);
            const v = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l) return { none: true }; const q = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const cs = getComputedStyle(l); return { bw: q.width, bh: q.height, ow: l.offsetWidth, oh: l.offsetHeight, tt: d.top, tb: d.bottom, lt: q.top, lb: q.bottom, sx: +cs.getPropertyValue("--lens-sx"), sy: +cs.getPropertyValue("--lens-sy") }; }, LP);
            if (FR) await P.page.screenshot({ path: path.join(FR, `${label}-${engine}-lens-${tf.replace(/[^a-z0-9]+/gi, "")}.png`) });
            return { v, errs: [...P.errors] };
          } finally { await P.page.mouse.up(); }
        } finally { await P.close(); }
      }, 60000);
      if (r.crashed || r.v?.none) { cell(name, "FAIL", r.line ?? "NO LOUPE on the hold"); continue; }
      const v = r.v; if (tf === "none") base = v;
      const dx = base ? Math.abs(v.sx - base.sx * (s ?? 1)) : NaN, dy = base ? Math.abs(v.sy - base.sy * (s ?? 1)) : NaN;
      const st = tf === "none" || s === null ? "REPORT" : !base ? "UNMEASURED" : dx <= 0.01 && dy <= 0.01 ? "PASS" : "FAIL";
      cell(name, st, `${label} · --lens-sx ${f(v.sx, 4)} --lens-sy ${f(v.sy, 4)}${base && s !== null && tf !== "none" ? ` against the level hold's × ${s} = ${f(base.sx * s, 4)}, ${f(base.sy * s, 4)} (off ${f(dx, 4)}, ${f(dy, 4)}; bound 0.01)` : ""} · lens painted ${f(v.bw, 1)} × ${f(v.bh, 1)} over layout ${v.ow} × ${v.oh} · lens top/bottom ${f(v.lt, 1)}/${f(v.lb, 1)} against the track's ${f(v.tt, 1)}/${f(v.tb, 1)} · errors ${r.errs.length}${FR ? ` · still ${label}-${engine}-lens-${tf.replace(/[^a-z0-9]+/gi, "")}.png` : ""}`);
    }
  }
  // §5 item 8 the host's own size change
  if (want("hostsize")) {
    const c = { k: "hostsize", name: "hostsize · C 300 → 380 px wide (a style record), the root's left edge fixed in layout" }; const r = await run(c);
    if (r.crashed) cell(c.name, "FAIL", r.line);
    else { const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const p = S[i0 - 1], end = S.at(-1); let worst = 0, wAt = 0; for (const x of S.slice(i0)) { const d = Math.abs(x.l - p.l); if (d > worst) { worst = d; wAt = x.n; } }
      const dw = end.w - p.w; const glides = [...new Set(S.slice(i0).flatMap((x) => x.an))];
      cell(c.name, !p.held ? "UNMEASURED" : Math.abs(dw) < 10 ? "UNMEASURED" : worst <= 0.5 ? "PASS" : "FAIL", `${label} · ${Math.abs(dw) < 10 ? "NOT DRIVEN: the root's width did not follow · " : ""}the root's width ${f(p.w, 1)} → ${f(end.w, 1)} px · its painted left edge moved up to ${f(worst, 2)} px (frame ${wAt}; bound ≤ 0.5), on the act's frame ${f(S[i0].l - p.l, 2)}, the centre ${f(S[i0].x - p.x, 2)} · glide ${glides.length ? `ran (${glides.map((x) => f(x, 0)).join(",")} ms)` : "none"} · left-edge path [${S.slice(i0 - 1, i0 + 5).map((x) => f(x.l - p.l, 1)).join(" ")}] · errors ${r.errs.length}`); }
  }
  // §2.6 the consumer's calc() fragments; C-E13 D7 the tempo
  if (want("tok")) for (const [tok, val, kind] of [["--spring-dock-settle", "0.1s + 110ms", "t"], ["--spring-dock-settle", "105ms * 2", "t"], ["--spring-dock-settle", "2 * 105ms", "t"], ["--spring-dock-settle", "calc(0.1s + 110ms)", "t"], ["--scale-engage", "1 + 0.06", "n"], ["--scale-engage", "2 * 0.53", "n"], ["--scale-engage", "calc(1 + 0.06)", "n"], ["--motion-tempo", "0", "t"], ["--motion-tempo", "-1", "t"], ["--motion-tempo", "2", "t"]]) {
    const c = { k: "tok", name: `tok · ${tok}: ${val}` }; const r = await run(c, { plant: [tok, val] });
    if (r.crashed) { cell(c.name, "FAIL", r.line); continue; }
    const named = r.errs.filter((e) => e.includes(tok) || (tok === "--motion-tempo" && /tempo|spring-dock/.test(e))); const g = grade(r);
    const cms = (() => { const m0 = /^([\d.e+-]+)(m?s)$/.exec(r.cons.dur.split(",")[0].trim()); return m0 ? +m0[1] * (m0[2] === "s" ? 1000 : 1) : NaN; })();
    let st, why;
    if (kind === "t") { const clk = g.durs.length ? g.durs[0] : 0; const consOk = Number.isFinite(cms);
      if (consOk && named.length === 0) { st = Math.abs(clk - cms) <= 2 ? "PASS" : "FAIL"; why = `the consumer computes ${f(cms, 0)} ms; the script's glide clock ${g.durs.length ? f(clk, 0) + " ms" : "none (instant)"}${st === "FAIL" ? ", with no error: script and stylesheet disagree on the clock" : ""}`; }
      else if (consOk && named.length) { st = "FAIL"; why = `the consumer computes ${f(cms, 0)} ms and the script refuses the token loud: a form its consumer takes`; }
      else { st = named.length ? "PASS" : "FAIL"; why = `the consumer refuses it (${r.cons.dur}); the script ${named.length ? "is loud" : "is silent"}`; } }
    else { const cs = parseFloat(r.cons.scale); const consOk = Number.isFinite(cs) && r.cons.scale !== "none";
      st = consOk ? (named.length ? "FAIL" : "PASS") : (named.length ? "PASS" : "FAIL"); why = `the consumer computes scale ${r.cons.scale}; the script ${named.length ? "refuses it loud" : "takes it (no error naming it)"}`; }
    cell(c.name, st, `${label} · ${why} · errors naming it ${named.length}${named[0] ? ` (${named[0].slice(0, 120)})` : ""} · all errors ${r.errs.length} · consumer transition-duration "${r.cons.dur}", scale "${r.cons.scale}", --spring-dock-duration "${r.cons.dockDur}" · glide ${g.durs.length ? g.durs.map((x) => f(x, 0)).join(",") + " ms" : "none"} · the root on the act's frame ${f(g.jump, 2)} px`);
  }
  // §2.7 F7: a transition on the element read
  if (want("trans")) for (const [nm, css] of [["none (reference)", null], ["transition-duration 210ms (property all)", { transitionDuration: "210ms" }], ["transition: all 300ms linear", { transition: "all 300ms linear" }], ["transition-property: all; 150ms (Tailwind transition-all)", { transitionProperty: "all", transitionDuration: "150ms" }]]) {
    const c = { k: "trans", css, name: `trans · ${nm}` }; const r = await run(c);
    if (r.crashed) { cell(c.name, "FAIL", r.line); continue; }
    const eng = r.errs.filter((e) => /engage/.test(e)); const g = grade(r); const clk = g.durs[0];
    cell(c.name, eng.length === 0 && g.durs.length && Math.abs(clk - 210) <= 2 ? "PASS" : "FAIL", `${label} · engage errors on default tokens ${eng.length}${eng[0] ? ` (${eng[0].slice(0, 130)})` : ""} · the outside insert's glide ${g.durs.length ? f(clk, 0) + " ms" : "none"} (the dock clock 210) · the root on the act's frame ${f(g.jump, 2)} px · root style "${(r.st.sty ?? "").slice(0, 80)}"`);
  }
  // §P13-7 item 10: style="" residue
  if (want("residue")) {
    const name = "residue · elements without a style attribute before the press that carry one after the release";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await P.page.evaluate(setup, [R, { k: "residue" }]); await P.page.waitForTimeout(300);
        const before = await P.page.evaluate((R) => { const root = document.querySelector(R); const els = [root, ...root.querySelectorAll("*")]; for (let e = root.parentElement; e; e = e.parentElement) els.push(e); window.__ca13els = els.filter((e) => !e.hasAttribute("style")); return { n: window.__ca13els.length, rootHas: root.hasAttribute("style"), rootSty: root.getAttribute("style") }; }, R);
        const k = await center(P.page, TH); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down(); await P.page.waitForTimeout(400); await P.page.mouse.up(); await P.page.waitForTimeout(800);
        const after = await P.page.evaluate(() => window.__ca13els.filter((e) => e.hasAttribute("style")).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 2).join(".")}="${e.getAttribute("style").slice(0, 40)}"`));
        return { before, after, errs: [...P.errors] };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else cell(name, r.after.length ? "FAIL" : "PASS", `${label} · ${r.before.n} elements without a style attribute before (the root ${r.before.rootHas ? `has one: "${String(r.before.rootSty).slice(0, 60)}"` : "has none"}) · carrying one 800 ms after the release: ${r.after.length}${r.after.length ? ` (${r.after.slice(0, 4).join("; ")})` : ""} · errors ${r.errs.length}`);
    // the commit hosts, which carry no style attribute of their own: every element of the document without one before a pointer commit
    for (const s2 of ["button", "switch", "checkbox"]) {
      const m2 = idx[s2]; if (!m2) continue; const nm2 = `residue · ${s2} · a pointer commit: elements without a style attribute before that carry one after`;
      const r2 = await guard(nm2, async () => {
        const P = await openPage(E, T, s2, {});
        try {
          const n0 = await P.page.evaluate((tg) => { window.__ca13els = [...document.querySelectorAll("*")].filter((e) => !e.hasAttribute("style")); const t = document.querySelector(tg); return { n: window.__ca13els.length, tHas: t ? t.hasAttribute("style") : null, tSty: t ? t.getAttribute("style") : null }; }, m2.target);
          const k = await center(P.page, m2.target); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down(); await P.page.waitForTimeout(150); await P.page.mouse.up(); await P.page.waitForTimeout(800);
          const after = await P.page.evaluate(() => window.__ca13els.filter((e) => e.hasAttribute("style")).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 2).join(".")}="${e.getAttribute("style").slice(0, 40)}"`));
          return { n0, after, errs: [...P.errors] };
        } finally { await P.close(); }
      }, 60000);
      if (r2.crashed) { cell(nm2, "FAIL", r2.line); continue; }
      const empty = r2.after.filter((x) => x.endsWith('=""')); if (r2.n0.tHas && r2.n0.tSty === "") empty.push("the target at load");
      cell(nm2, empty.length ? "FAIL" : "PASS", `${label} · ${r2.n0.n} elements without one before (the target ${r2.n0.tHas ? `has one at load: "${String(r2.n0.tSty).slice(0, 50)}"` : "has none"}) · carrying one 800 ms after: ${r2.after.length}, of them style="" ${empty.length}${r2.after.length ? ` (${r2.after.slice(0, 4).join("; ")})` : ""} · errors ${r2.errs.length}`);
    }
  }
});
