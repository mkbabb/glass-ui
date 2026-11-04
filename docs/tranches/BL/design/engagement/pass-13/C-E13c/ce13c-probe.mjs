#!/usr/bin/env node
// C-E13-complete (D5 pass 13, wave c3): `C-E13/held-battery.txt` §3 on a built candidate, each member a cell with its numbers.
// The harness's own scene app and lib (one browser per run, a fresh context per cell, every page and context closed in a finally;
// WebKit retires its browser at 60 navigations, lib.mjs NAV_CAP). A cell's film is one rAF chain requested after the stage's own, each
// frame read in a message posted from it (after the frame's callbacks, h13Film's form). No screenshot inside a film.
//   --only d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,stills   (default: all but d10, which is Chromium CDP only)
// The held control is the E-13 slider scene's root (its card the root's parent), keyboard-engaged (the sentinel, then Tab) unless a cell
// says otherwise, so no pointer rides the card. A "glide" is a non-CSS animation on the root whose keyframes carry `translate` (the
// stage's `glide`, stage.ts:301-307); "glides" counts the distinct ones seen.
//   usage: node ce13c-probe.mjs --build <dir> --label <l> --engine chromium|webkit --out <dir> [--frames <dir>] [--only …]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import path from "node:path";
const { witness, openPage, scenesFor, center, f, tabKey, rowsOf, rowFacts, load } = await import(`${H}/lib.mjs`);

const FILM = ([R, N, hooks]) => new Promise((ok) => {
  const HK = hooks.map(([n, src]) => [n, new Function("root", "card", "ctx", src)]);
  const root = document.querySelector(R), card = root.parentElement;
  const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
  const seen = new Set(); const out = []; const ch = new MessageChannel(); let n = 0; const ctx = window.__ctx ?? (window.__ctx = {}); const t0 = document.timeline.currentTime;
  ch.port1.onmessage = () => { const r = root.getBoundingClientRect(), c = card.getBoundingClientRect();
    const g = root.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate")); for (const a of g) seen.add(a);
    out.push({ n, t: document.timeline.currentTime - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, rr: r.right, w: r.width, cx: c.left + c.width / 2, cy: c.top + c.height / 2, cl: c.left, ct: c.top,
      run: g.filter((a) => a.playState === "running").length, glides: seen.size, durs: [...new Set(g.map((a) => a.effect.getTiming().duration))], eng: root.hasAttribute("data-engaged"), stage: root.hasAttribute("data-engage-stage"), v: ctx.v ?? null }); };
  const tick = () => { n++; for (const [k, fn] of HK) if (k === n) fn(root, card, ctx); ch.port2.postMessage(0); if (n < N) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); };
  requestAnimationFrame(tick);
});
const errsOf = (P) => P.errors.filter((e) => /\[glass-ui\]|pageerror/i.test(e));
const stats = (xs) => { const s = [...xs].sort((p, q) => p - q); return { max: s.length ? s.at(-1) : NaN, med: s.length ? s[s.length >> 1] : NaN }; };

await witness("C-E13c", "held-battery.txt §3 on the built candidate", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : new Set(["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "stills"]);
  const label = typeof a.label === "string" ? a.label : "c"; const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? ".glass-slider"; const TH = m.thumb ?? '[role="slider"]';
  console.log(`# held control: scene ${sc} root ${R} thumb ${TH}; label ${label}`);
  // common dress: room above and below, anchoring off unless asked, the root centred in the viewport
  const dress = (page, o = {}) => page.evaluate(([R, o]) => { const root = document.querySelector(R), card = root.parentElement; const mn = document.querySelector("main") ?? document.body;
    if (!o.anchor) document.documentElement.style.overflowAnchor = "none"; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
    if (o.cardCss) Object.assign(card.style, o.cardCss); if (o.rootCss) Object.assign(root.style, o.rootCss);
    if (o.style) { const st = document.createElement("style"); st.textContent = o.style; document.head.appendChild(st); }
    if (o.src) new Function("root", "card", o.src)(root, card);
    const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2);
    const q = root.getBoundingClientRect(), c = card.getBoundingClientRect(); return { off: q.top + q.height / 2 - (c.top + c.height / 2), offx: q.left + q.width / 2 - (c.left + c.width / 2), rx: q.left + q.width / 2 - c.left, ry: q.top + q.height / 2 - c.top, w: q.width, l: q.left, iw: innerWidth }; }, [R, o]);
  const kbd = async (P) => { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); return P.page.evaluate((R) => document.querySelector(R).hasAttribute("data-engaged"), R); };
  const film = (P, N, hooks) => P.page.evaluate(FILM, [R, N, hooks]);
  const rows = async (P) => (await P.page.evaluate(rowsOf)).map(rowFacts);
  const dock = (rs) => rs.find((x) => x.n === "dock");

  // ── D1 · a script-animated ancestor (CK-20; C-E13 D1) ──────────────────────────────────────────────────────────────────────
  if (only.has("d1")) for (const k of ["raf-translate", "scroll-parallax", "member-scale", "inline-scale"]) {
    const name = `D1 ${k}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const cardCss = k === "member-scale" ? { scale: "var(--member-scale, 1)", transformOrigin: "0 0" } : k === "inline-scale" ? { transformOrigin: "0 0" } : null;
        const d0 = await dress(P.page, { cardCss });
        // the page's writer, requested BEFORE the hold (so it runs before the stage's callback in every later frame)
        await P.page.evaluate(([k]) => { const card = document.querySelector("main [role=slider]")?.closest(".glass-slider")?.parentElement; const C = card; const ctx = window.__ctx = window.__ctx ?? {};
          if (k === "scroll-parallax") { const y0 = scrollY; addEventListener("scroll", () => { C.style.translate = `0 ${(0.3 * (scrollY - y0)).toFixed(2)}px`; }, { passive: true }); return; }
          const tick = () => { const g = ctx.go; const t = g ? Math.min(1, (performance.now() - g) / (k === "raf-translate" ? 500 : 200)) : 0;
            if (k === "raf-translate") C.style.translate = `0 ${(80 * t).toFixed(2)}px`; else { ctx.v = 1 - 0.15 * t; if (k === "member-scale") C.style.setProperty("--member-scale", ctx.v.toFixed(4)); else C.style.scale = ctx.v.toFixed(4); }
            requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [k]);
        await P.page.waitForTimeout(150);
        const eng = await kbd(P);
        const hooks = k === "scroll-parallax" ? Array.from({ length: 30 }, (_, i) => [6 + i, "scrollBy(0, 8)"]) : [[6, "ctx.go = performance.now()"]];
        const out = await film(P, 60, hooks);
        return { out, d0, eng, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", `NOT DRIVEN: the root was not engaged by the keyboard`); continue; }
    const S = r.out.filter((x) => x.eng); const sc_ = (x) => x.v ?? 1; const offs = S.map((x) => Math.hypot(x.x - x.cl - r.d0.rx * sc_(x), x.y - x.ct - r.d0.ry * sc_(x))); const st = stats(offs);
    const cardMoved = Math.max(Math.hypot(S.at(-1).cx - S[0].cx, S.at(-1).cy - S[0].cy), Math.hypot(r.d0.rx, r.d0.ry) * Math.abs(1 - sc_(S.at(-1)))); const glides = S.at(-1).glides;
    const ok = st.max <= 0.5 && glides === 0;
    cell(name, cardMoved < 5 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${label} · the card moved ${f(cardMoved, 1)} px over ${S.length} engaged frames · the held root's centre off where its card carries it (its rest offset, × the card's scale): max ${f(st.max, 2)} px, median ${f(st.med, 2)} px, frames over 2 px ${offs.filter((x) => x > 2).length} · stage glides started ${glides} · errors ${r.errs.length} (bound: ≤ 0.5 px every frame, 0 glides)${r.note ? ` · ${r.note}` : ""}`);
  }

  // ── D2 · the early animation-frame callback (CK-20; C-E13 D2) ──────────────────────────────────────────────────────────────
  if (only.has("d2")) for (const [k, writer] of [["insert", true], ["insert", false], ["card-scale", true], ["card-scale", false]]) {
    const name = `D2 ${k} · ${writer ? "page loop writing a text node every frame" : "no page loop (control)"}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const cardCss = k === "card-scale" ? { transformOrigin: "0 0", transition: "scale 600ms linear" } : null;
        await dress(P.page, { cardCss });
        if (writer) await P.page.evaluate(() => { const p = document.createElement("p"); p.setAttribute("data-t", "ce13-writer"); p.style.cssText = "position:fixed;left:0;bottom:0;margin:0;font:10px monospace"; const t = document.createTextNode("0"); p.appendChild(t); document.body.appendChild(p); let n = 0; const tick = () => { t.data = String(++n); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
        await P.page.waitForTimeout(120);
        const eng = await kbd(P); const rs = await rows(P);
        const act = k === "insert" ? "const b = document.createElement('div'); b.style.height = '40px'; b.setAttribute('data-t','ce13-block'); card.insertBefore(b, root);" : "card.style.scale = '0.9';";
        const out = await film(P, 50, [[8, act]]);
        return { out, eng, rs, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged by the keyboard"); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= 8); const pre = S[i0 - 1], first = S[i0], end = S.at(-1);
    const jump = Math.hypot(first.x - pre.x, first.y - pre.y); const glides = end.glides; const dk = dock(r.rs);
    // when the paint settles: the last frame more than 0.5 px from where it ends
    let last = i0; for (let i = i0; i < S.length; i++) if (Math.hypot(S[i].x - end.x, S[i].y - end.y) > 0.5) last = i; const settle = S[last].t - pre.t;
    if (k === "insert") {
      const ok = jump <= 0.5 && glides === 1 && settle <= (dk?.ms ?? 210) + 17;
      cell(name, ok ? "PASS" : "FAIL", `${label} · a 40 px insert above the held root on frame 8 · the root's paint moved ${f(Math.hypot(end.x - pre.x, end.y - pre.y), 1)} px in all by the film's end (+${f(end.t - pre.t, 0)} ms) · on the act's frame ${f(jump, 2)} px from where it was painted (≤ 0.5) · stage glides started ${glides} (bound 1) · the paint settles ${f(settle, 1)} ms after the frame before the act (bound: the dock clock ${f(dk?.ms, 1)} ms + 17) · durations ${[...new Set(S.flatMap((x) => x.durs))].map((d) => f(d, 1)).join(",") || "none"} · errors ${r.errs.length}${r.note ? ` · ${r.note}` : ""}`);
    } else {
      cell(name, glides === 0 ? "PASS" : "FAIL", `${label} · the card's 600 ms scale transition 1 → 0.9 from frame 8 · stage glides started ${glides} (bound 0) · the root's paint moved ${f(Math.hypot(end.x - pre.x, end.y - pre.y), 1)} px with its card · errors ${r.errs.length}${r.note ? ` · ${r.note}` : ""}`);
    }
  }

  // ── D3 · a released host on its exit clock (CK-20; C-E13 D3) ───────────────────────────────────────────────────────────────
  if (only.has("d3")) for (const k of ["card-scale + unrelated append", "card-scale alone (control)"]) {
    const name = `D3 ${k}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await dress(P.page, { cardCss: { transformOrigin: "0 0", transition: "scale 600ms linear" } });
        const eng = await kbd(P);
        // the release: focus leaves the control (Tab on), then at once the film
        await P.page.keyboard.press(tabKey(engine));
        const hooks = [[1, "ctx.rel = !root.hasAttribute('data-engaged'); ctx.onstage = root.hasAttribute('data-engage-stage'); card.style.scale = '0.9';"]];
        if (k.startsWith("card-scale +")) hooks.push([5, "const d = document.createElement('div'); d.setAttribute('data-t','ce13-unrelated'); document.body.appendChild(d); ctx.onstage5 = root.hasAttribute('data-engage-stage');"]);
        const out = await film(P, 40, hooks); const st = await P.page.evaluate(() => ({ rel: window.__ctx.rel, onstage: window.__ctx.onstage, onstage5: window.__ctx.onstage5 }));
        return { out, eng, st, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng || !r.st.rel) { cell(name, "UNMEASURED", `NOT DRIVEN: engaged ${r.eng}, released at the film's start ${r.st.rel}`); continue; }
    const glides = r.out.at(-1).glides;
    cell(name, glides === 0 ? "PASS" : "FAIL", `${label} · released, then the card's 600 ms scale 1 → 0.9 and ${k.startsWith("card-scale +") ? "an unrelated node appended at frame 5" : "no record"} · the root on the stage at the act: ${r.st.onstage}${r.st.onstage5 === undefined ? "" : ` / at frame 5: ${r.st.onstage5}`} · stage glides started ${glides} (bound 0) · errors ${r.errs.length}${r.note ? ` · ${r.note}` : ""}`);
  }

  // ── D4 · a projective map past the 40 px cell (CK-20; C-E13 D4, C-A13 §2.1) ─────────────────────────────────────────────────
  if (only.has("d4")) for (const tf of ["perspective(400px) rotateX(40deg)", "perspective(600px) rotateX(25deg)"]) for (const y0 of [-200, 0, 150]) for (const mv of [40, 120, 200]) {
    const name = `D4 ${tf} · host ${y0} px from the origin · insert ${mv} px`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await dress(P.page, { src: `const rr = root.getBoundingClientRect(), cc = card.getBoundingClientRect(); card.style.transformOrigin = '50% ' + (rr.top + rr.height / 2 - cc.top - (${y0})) + 'px'; card.style.transform = '${tf}';` });
        const eng = await kbd(P);
        const out = await film(P, 40, [[8, `const b = document.createElement('div'); b.style.height = '${mv}px'; b.setAttribute('data-t','ce13-block'); card.insertBefore(b, root);`]]);
        return { out, eng, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged"); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= 8); const pre = S[i0 - 1], first = S[i0], end = S.at(-1);
    const jump = Math.hypot(first.x - pre.x, first.y - pre.y), moved = Math.hypot(end.x - pre.x, end.y - pre.y);
    cell(name, jump <= 0.5 ? "PASS" : "FAIL", `${label} · the root's paint moved ${f(moved, 1)} px in all · on the act's frame ${f(first.x - pre.x, 2)}, ${f(first.y - pre.y, 2)} = ${f(jump, 2)} px from where it was painted (bound ≤ 0.5) · glides ${end.glides} · errors ${r.errs.length}${r.note ? ` · ${r.note}` : ""}`);
  }

  // ── D5 · the host's own content resize: a scrubbed NumberField 9 → 10 (CK-20; C-E13 D5) ───────────────────────────────────
  if (only.has("d5")) for (const row of ["flex-start", "center"]) {
    const name = `D5 NumberField scrub 9 → 10 · ${row} row · field-sizing content`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "gallery", {});
      try {
        const ok0 = await P.page.evaluate((row) => { const f = document.querySelector(".number-field"); if (!f) return null; const inp = f.querySelector("input"); const w = f.parentElement;
          document.documentElement.style.overflowAnchor = "none"; w.style.display = "flex"; w.style.justifyContent = row; w.style.width = "400px"; w.style.outline = "1px dashed #999";
          inp.style.fieldSizing = "content"; inp.style.width = "auto"; inp.style.minWidth = "0"; f.style.width = "auto"; f.style.flex = "none";
          f.scrollIntoView({ block: "center" }); const r = f.getBoundingClientRect(); return { fs: CSS.supports("field-sizing", "content"), w: r.width, v: inp.value }; }, row);
        if (!ok0) return { none: true };
        const c = await center(P.page, ".number-field input");
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        const ch = await P.page.evaluate(() => getComputedStyle(document.querySelector(".number-field input")).getPropertyValue("--scrub-pitch").trim() || "1ch");
        const pf = P.page.evaluate(() => new Promise((ok) => { const fe = document.querySelector(".number-field"), inp = fe.querySelector("input"); const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
          const seen = new Set(); const out = []; const mc = new MessageChannel(); let n = 0; const t0 = performance.now();
          mc.port1.onmessage = () => { const r = fe.getBoundingClientRect(); const g = fe.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect?.getKeyframes()[0] ?? {}).includes("translate")); for (const a of g) seen.add(a); out.push({ n, t: performance.now() - t0, l: r.left, rr: r.right, ol: fe.offsetLeft, ow: fe.offsetWidth, v: inp.value, glides: seen.size, eng: fe.hasAttribute("data-engaged") }); };
          const tick = () => { n++; mc.port2.postMessage(0); if (performance.now() - t0 < 2600) requestAnimationFrame(tick); else setTimeout(() => ok(out), 40); }; requestAnimationFrame(tick); }));
        // travel past the slop, then one glyph cell at a time (about 9 px a cell here), slowly, to 10 and past
        for (let i = 1; i <= 50; i++) { await P.page.mouse.move(c.x + i * 3, c.y); await P.page.waitForTimeout(30); }
        const out = await pf; await P.page.mouse.up();
        return { out, ok0, ch, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.none) { cell(name, "UNMEASURED", "NOT DRIVEN: no NumberField in the gallery scene"); continue; }
    const S = r.out; const k = S.findIndex((x, i) => i > 0 && S[i - 1].v === "9" && x.v === "10"); const vals = [...new Set(S.map((x) => x.v))].join(" → ");
    if (k < 0) { cell(name, "UNMEASURED", `NOT DRIVEN: the value never went 9 → 10 (values ${vals}; engaged on ${S.filter((x) => x.eng).length} frames; field-sizing ${r.ok0.fs})`); continue; }
    const pre = S[k - 1], W = S.slice(k, k + 20); const lead = Math.max(...W.map((x) => Math.abs(x.l - pre.l))); const lay = W.at(-1).ol - pre.ol; const grew = W.at(-1).ow - pre.ow;
    const glides = W.at(-1).glides - pre.glides; const engaged = pre.eng;
    // in a left-aligned row the leading edge is still in layout (lay = 0): its paint must not move; centred, the paint must follow layout with no glide
    const ok = engaged && glides === 0 && (row !== "flex-start" || lead <= 0.5);
    cell(name, !engaged ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${label} · values ${vals} · at 9 → 10 the field grew ${f(grew, 1)} px in layout, its leading edge moved ${f(lay, 1)} px in layout and up to ${f(lead, 2)} px in paint over the next 20 frames · stage glides started at the change ${glides} · engaged ${engaged} · field-sizing ${r.ok0.fs} · pitch ${r.ch} · errors ${r.errs.length}${r.note ? ` · ${r.note}` : ""}`);
  }

  // ── D6 · `transition: all` reaching the registered read (CK-21; C-E13 D6, H13-complete F7) ────────────────────────────────────
  const TALL = ".ce13-tall { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms }";
  if (only.has("d6")) {
    const [bsc, bm] = Object.entries(idx).find(([k]) => k === "button") ?? [];
    for (const k of ["button commit", "button commit (control: no transition-all)", "held slider"]) {
      const name = `D6 ${k}${k.includes("control") ? "" : " · a consumer's transition-all on the host"} · default tokens`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, k === "held slider" ? sc : bsc, {});
        try {
          if (k === "held slider") {
            await dress(P.page, { style: TALL, src: "root.classList.add('ce13-tall')" });
            const rest = await P.page.evaluate((R) => document.querySelector(R).getBoundingClientRect().width, R);
            const eng = await kbd(P); const v = await P.page.evaluate((R) => { const e = document.querySelector(R); const cs = getComputedStyle(e); return { w: e.getBoundingClientRect().width, tp: cs.transitionProperty.slice(0, 60), td: cs.transitionDuration.slice(0, 40), reach: cs.getPropertyValue("--stage-reach").trim() }; }, R);
            return { eng, rest, v, errs: errsOf(P) };
          }
          const BR = bm?.root ?? "button";
          if (!k.includes("control")) await P.page.evaluate(([BR, TALL]) => { const st = document.createElement("style"); st.textContent = TALL; document.head.appendChild(st); document.querySelector(BR).classList.add("ce13-tall"); }, [BR, TALL]);
          const v0 = await P.page.evaluate((BR) => { const e = document.querySelector(BR); const cs = getComputedStyle(e); return { w: e.getBoundingClientRect().width, tp: cs.transitionProperty.slice(0, 60), td: cs.transitionDuration.slice(0, 40) }; }, BR);
          const pops = [];
          for (let i = 0; i < 3; i++) {
            const fp = P.page.evaluate((BR) => new Promise((ok) => { const e = document.querySelector(BR); const ws = []; const t0 = performance.now(); const tick = () => { const sc = (cs) => { const v = cs.scale; if (!v || v === "none") return 1; return parseFloat(v.split(" ")[0]); }; ws.push(Math.max(...[e, ...e.querySelectorAll("*")].flatMap((x) => [sc(getComputedStyle(x)), sc(getComputedStyle(x, "::before")), sc(getComputedStyle(x, "::after"))].map((q) => Math.abs(q - 1) * e.offsetWidth)))); if (performance.now() - t0 < 600) requestAnimationFrame(tick); else ok(ws); }; requestAnimationFrame(tick); }), BR);
            await P.page.waitForTimeout(30); const c = await center(P.page, BR); await P.page.mouse.click(c.x, c.y); const ws = await fp; pops.push(Math.max(...ws)); await P.page.mouse.move(5, 5); await P.page.waitForTimeout(500);
          }
          return { v0, pops, errs: errsOf(P), BR };
        } finally { await P.close(); }
      }, 60000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const eng = r.errs.filter((e) => /engage/.test(e));
      if (k === "held slider") {
        if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged"); continue; }
        const g = r.v.w / r.rest;
        cell(name, eng.length === 0 && g >= 1.03 ? "PASS" : "FAIL", `${label} · host transition-property "${r.v.tp}" duration "${r.v.td}" · engaged inline ×${f(g, 4)} (--stage-reach "${r.v.reach}") · engage errors ${eng.length}${eng.length ? `: ${eng[0].slice(0, 150)}` : ""} (bound: 0 errors, ×≥ 1.03)`);
      } else {
        const popped = r.pops.filter((x) => x > 0.8).length;
        cell(name, eng.length === 0 ? "PASS" : "FAIL", `${label} · ${r.BR} transition-property "${r.v0.tp}" duration "${r.v0.td}" · 3 clicks, the largest scale excursion of the button, its descendants and their ::before/::after, × its width: ${r.pops.map((x) => f(x, 2)).join(", ")} px (pop > 0.8) · engage errors ${eng.length}${eng.length ? `: ${eng[0].slice(0, 150)}` : ""} (bound: 0 engage errors over 3 pointer commits; the pop itself is E-2's paint read, and this computed-scale read is a REPORT that sees no scale channel on either build)`);
      }
    }
  }

  // ── D7 · --motion-tempo ≤ 0 (CK-21; C-E13 D7) ──────────────────────────────────────────────────────────────────────────────
  if (only.has("d7")) for (const tempo of ["1", "0", "-1"]) for (const path_ of ["re-render glide", "release carry"]) {
    const name = `D7 --motion-tempo ${tempo} · ${path_}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { plant: ["--motion-tempo", tempo] });
      try {
        await dress(P.page, {});
        const css = await P.page.evaluate((R) => { const p = document.createElement("div"); document.querySelector(R).parentElement.appendChild(p); p.style.transitionDuration = "var(--spring-dock-duration)"; const d = getComputedStyle(p).transitionDuration; const t = getComputedStyle(document.documentElement).getPropertyValue("--motion-tempo").trim(); p.remove(); return { d, t }; }, R);
        if (path_ === "re-render glide") {
          const eng = await kbd(P);
          const out = await film(P, 40, [[8, "const b = document.createElement('div'); b.style.height = '40px'; b.setAttribute('data-t','ce13-block'); card.insertBefore(b, root);"]]);
          return { css, eng, durs: [...new Set(out.flatMap((x) => x.durs))], glides: out.at(-1).glides, errs: errsOf(P) };
        }
        // the release carry: a fast drag of the thumb, released; every non-CSS animation under the root read 20 ms after the release
        const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300);
        for (let i = 1; i <= 6; i++) { await P.page.mouse.move(c.x + i * 25, c.y); await P.page.waitForTimeout(16); }
        await P.page.mouse.up(); await P.page.waitForTimeout(20);
        const an = await P.page.evaluate((R) => { const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation); return document.querySelector(R).getAnimations({ subtree: true }).filter((a) => !isCss(a)).map((a) => Math.round(a.effect.getTiming().duration)); }, R);
        return { css, eng: true, durs: [...new Set(an)], glides: an.length, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged"); continue; }
    const cssMs = /ms/.test(r.css.d) ? parseFloat(r.css.d) : parseFloat(r.css.d) * 1000; const loud = r.errs.filter((e) => /motion-tempo|spring-dock/.test(e));
    const agree = r.durs.length === 0 ? cssMs === 0 : r.durs.every((d) => Math.abs(d - cssMs) <= 1);
    const ok = agree || loud.length > 0;
    cell(name, path_ === "release carry" && r.durs.length === 0 && cssMs > 0 ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${label} · --motion-tempo computes "${r.css.t}" · CSS's --spring-dock-duration ${r.css.d} · the stage's ${path_} ran ${r.durs.length ? r.durs.map((d) => `${f(d, 1)} ms`).join(", ") : "nothing"} · errors naming the tempo or the dock row ${loud.length}${loud.length ? `: ${loud[0].slice(0, 120)}` : ""} (bound: the clock CSS runs, or loud by name)`);
  }

  // ── D8 · a context-relative gutter (CK-21; C-E13 D8) ────────────────────────────────────────────────────────────────────────
  if (only.has("d8")) for (const k of ["2em, host 14px, page 16px", "4cqi, host in a 400 px container"]) {
    const name = `D8 --space-section ${k}`;
    const r = await guard(name, async () => {
      const tok = k.startsWith("2em") ? "2em" : "4cqi"; const room = k.startsWith("2em") ? 34 : 30;
      const P = await openPage(E, T, sc, { plant: ["--space-section", tok] });
      try {
        const g = await dress(P.page, { src: `const mn = document.querySelector('main') ?? document.body; const W = innerWidth - ${2 * room}; root.style.width = W + 'px'; root.style.maxWidth = 'none'; ${tok === "2em" ? "root.style.fontSize = '14px';" : "card.style.containerType = 'inline-size'; card.style.width = '400px';"}
          const l = root.getBoundingClientRect().left; root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (${room} - l) + 'px';
          const c = document.createElement('div'); c.setAttribute('data-t','ce13-gutter'); c.style.paddingInline = 'var(--space-section)'; mn.appendChild(c); window.__gutter = parseFloat(getComputedStyle(c).paddingLeft);` });
        const pre = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); return { l: r.left, r: innerWidth - r.right, w: r.width, sm: getComputedStyle(e).shapeMargin, fs: getComputedStyle(e).fontSize }; }, R);
        const eng = await kbd(P); await P.page.waitForTimeout(250);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); return { l: r.left, r: innerWidth - r.right, w: r.width, reach: getComputedStyle(e).getPropertyValue("--stage-reach").trim(), sm: getComputedStyle(e).shapeMargin, gutter: window.__gutter, iw: innerWidth }; }, R);
        return { pre, v, eng, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged"); continue; }
    const gap = Math.min(r.v.l, r.v.r); const capped = r.v.w / r.pre.w < 1.0599; const off = gap - r.v.gutter;
    cell(name, !capped ? "UNMEASURED" : Math.abs(off) <= 1 ? "PASS" : "FAIL", `${label} · rest ${f(r.pre.w, 1)} px wide, ${f(r.pre.l, 1)} / ${f(r.pre.r, 1)} px from the viewport's edges (font ${r.pre.fs}) · engaged ${f(r.v.w, 1)} px (×${f(r.v.w / r.pre.w, 4)}, --stage-reach "${r.v.reach}"), ${f(r.v.l, 1)} / ${f(r.v.r, 1)} px from the edges · the host's shape-margin ${r.v.sm} · the page's padding consumer lays the gutter at ${f(r.v.gutter, 1)} px · the held box stops ${f(off, 2)} px off it (bound ±1)${capped ? "" : " · NOT DRIVEN: the reach did not cap"} · errors ${r.errs.length}`);
  }

  // ── D9 · a card scaled about the held control, then a scroll (CK-04's phone clause; C-E13 D9) ─────────────────────────────────
  if (only.has("d9")) for (const when of ["scaled during the hold", "scaled before the hold (control)"]) {
    const name = `D9 card scale 1 → 1.25 about the held root · ${when}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await dress(P.page, { style: ".ce13-big { scale: 1.25 }", src: `const gc = document.createElement('div'); gc.style.paddingInline = 'var(--space-section)'; card.appendChild(gc); const g = parseFloat(getComputedStyle(gc).paddingLeft); gc.remove(); const W = Math.round((innerWidth - 2 * g * 1.25 - 20) / 1.25); root.style.width = W + 'px'; root.style.maxWidth = 'none'; const rr = root.getBoundingClientRect(); root.style.marginLeft = (parseFloat(getComputedStyle(root).marginLeft) || 0) + (innerWidth / 2 - (rr.left + rr.width / 2)) + 'px';
          const q = root.getBoundingClientRect(), cc = card.getBoundingClientRect(); card.style.transformOrigin = (q.left + q.width / 2 - cc.left) + 'px ' + (q.top + q.height / 2 - cc.top) + 'px'; card.style.transition = 'scale 300ms linear';` });
        if (when.startsWith("scaled before")) { await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("ce13-big"), R); await P.page.waitForTimeout(450); }
        const eng = await kbd(P);
        if (when.startsWith("scaled during")) { await P.page.evaluate((R) => document.querySelector(R).parentElement.classList.add("ce13-big"), R); await P.page.waitForTimeout(450); }
        await P.page.evaluate(() => scrollBy(0, 30)); await P.page.waitForTimeout(350);
        const v = await P.page.evaluate((R) => { const e = document.querySelector(R), r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const c = document.createElement("div"); c.style.paddingInline = "var(--space-section)"; e.parentElement.appendChild(c); const g = parseFloat(getComputedStyle(c).paddingLeft); c.remove();
          const p = r.left + r.width / 2; const a = e.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const q = e.getBoundingClientRect(); a.cancel(); const fx = (q.left + q.width / 2 - p) / 40;
          return { l: r.left, r: innerWidth - r.right, w: r.width, ow: e.offsetWidth, reach: cs.getPropertyValue("--stage-reach").trim(), g, fx }; }, R);
        return { v, eng, errs: errsOf(P) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (!r.eng) { cell(name, "UNMEASURED", "NOT DRIVEN: the root was not engaged"); continue; }
    const gap = Math.min(r.v.l, r.v.r); const need = r.v.g * r.v.fx;
    cell(name, gap >= need - 1 ? "PASS" : "FAIL", `${label} · after the scroll the held box paints ${f(r.v.w, 1)} px (layout ${r.v.ow}, frame ×${f(r.v.fx, 4)}, --stage-reach "${r.v.reach}"), ${f(r.v.l, 1)} / ${f(r.v.r, 1)} px from the viewport's edges · the gutter ${f(r.v.g, 1)} px, ${f(need, 1)} px as the card paints it (bound: ≥ that − 1) · errors ${r.errs.length}`);
  }

  // ── D10 · forced work during a held drag (CK-23; C-E13 D10), Chromium CDP only ───────────────────────────────────────────────
  if (only.has("d10")) {
    if (engine !== "chromium") cell("D10 drag work", "REPORT", "Chromium CDP only; not read in WebKit");
    else for (let round = 1; round <= 2; round++) {
      const name = `D10 drag work · round ${round}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc, {});
        try {
          await dress(P.page, {}); const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable");
          const met = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
          const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(400);
          const a0 = await met(); for (let i = 1; i <= 60; i++) { await P.page.mouse.move(c.x + 60 * Math.sin(i / 6), c.y); await P.page.waitForTimeout(16); } const a1 = await met();
          await P.page.mouse.up();
          return { lay: a1.LayoutCount - a0.LayoutCount, rec: a1.RecalcStyleCount - a0.RecalcStyleCount, lms: (a1.LayoutDuration - a0.LayoutDuration) * 1000, rms: (a1.RecalcStyleDuration - a0.RecalcStyleDuration) * 1000, sms: (a1.ScriptDuration - a0.ScriptDuration) * 1000 };
        } finally { await P.close(); }
      }, 60000);
      if (r.crashed) { cell(name, "REPORT", r.line); continue; }
      cell(name, "REPORT", `${label} · 60 pointer moves of a held thumb over ~1.2 s: layouts ${r.lay}, style recalcs ${r.rec}, layout ${f(r.lms, 1)} ms, recalc ${f(r.rms, 1)} ms, script ${f(r.sms, 1)} ms`);
    }
  }

  // ── stills (CK-25): the held slider under a script-moved card, and a projective insert, each with its motion paused ───────────
  if (only.has("stills") && frames) for (const k of ["d1-raf-translate", "d4-perspective400-120"]) {
    const name = `still ${k}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        if (k === "d1-raf-translate") {
          await dress(P.page, { cardCss: { outline: "1px solid #8a8a8a", outlineOffset: "6px", borderRadius: "10px" } }); await P.page.evaluate((R) => { const C = document.querySelector(R).parentElement; const ctx = window.__ctx = window.__ctx ?? {}; const tick = () => { if (ctx.stop) return; const g = ctx.go; const t = g ? Math.min(1, (performance.now() - g) / 500) : 0; C.style.translate = `0 ${(80 * t).toFixed(2)}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, R);
          await P.page.waitForTimeout(150); await kbd(P);
          await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-${k}-before.png`) });
          const v = await P.page.evaluate((R) => new Promise((ok) => { const ctx = window.__ctx; ctx.go = performance.now(); let n = 0; const root = document.querySelector(R), card = root.parentElement; const tick = () => { if (++n === 15) { ctx.stop = true; for (const a of document.getAnimations()) a.pause(); const r = root.getBoundingClientRect(), c = card.getBoundingClientRect(); ok({ off: r.top + r.height / 2 - (c.top + c.height / 2), cardTranslate: card.style.translate, rootTop: r.top, cardTop: c.top }); return; } requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), R);
          await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-${k}-act.png`) });
          return { v };
        }
        await dress(P.page, { cardCss: { outline: "1px solid #8a8a8a" }, src: "const rr = root.getBoundingClientRect(), cc = card.getBoundingClientRect(); card.style.transformOrigin = '50% ' + (rr.top + rr.height / 2 - cc.top - 150) + 'px'; card.style.transform = 'perspective(400px) rotateX(40deg)';" });
        await kbd(P); await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-${k}-before.png`) });
        const v = await P.page.evaluate((R) => new Promise((ok) => { const root = document.querySelector(R), card = root.parentElement; const p = root.getBoundingClientRect(); const b = document.createElement("div"); b.style.height = "120px"; card.insertBefore(b, root);
          requestAnimationFrame(() => { for (const a of document.getAnimations()) a.pause(); const q = root.getBoundingClientRect(); ok({ jump: Math.hypot(q.left + q.width / 2 - (p.left + p.width / 2), q.top + q.height / 2 - (p.top + p.height / 2)) }); }); }), R);
        await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-${k}-act.png`) });
        return { v };
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `${label} · ${JSON.stringify(r.v)} · stills ${label}-${engine}-${k}-{before,act}.png`);
  }
});
