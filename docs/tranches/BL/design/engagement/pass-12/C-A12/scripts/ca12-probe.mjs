#!/usr/bin/env node
// C-A12 adversarial probe (D5 pass 12, a fresh critic of HEAD + pass-12/P-E12.patch). Not a witness: each cell is scored in C-A12.md against
// the CK row it would break, or placed as a next-pass class. CK-20's frame family and move family PAST H12's enumeration and P-E12's origin
// cells. Same drive and read as H12's E-10 `hostglide` (harness/e10-continuity.mjs, copied in substance): the loupe row without a clip, C the
// root's parent and G C's parent; main padded 230 px top and 1600 px bottom, the root brought to mid-viewport; a fine hold, +900 ms; then
// filmed per frame in a task posted from requestAnimationFrame, stamped with the document timeline; on frame 8 the act; the root's painted
// centre read every frame. PASS when the root's painted centre on the act's frame is <= 0.5 px from where it was painted the frame before,
// its largest move over any 16.7 ms <= the move x dock's one-frame peak 0.139 + 1 px (H11's printed bound), and a glide ran if it moved
// >= 0.5 px. Scroll anchoring is off (`overflow-anchor: none` on <html>, H12's setup) except where a cell names it.
//   xf · <place> · <card>     a 40 px block inserted (childList) inside C (its first child), outside C (before C) or nested (before G, the
//                              transform on G); cards past H12's: rotate 10deg, rotate 10deg + scale 0.8 (origin 0 0), skewY(8deg),
//                              perspective(600px) rotateX(25deg), zoom 0.5, zoom 2.5, scale 1.25 (origin 0 0), zoom 1.25 on <html>;
//                              controls none and scale 0.8 (origin 0 0), H12's own
//   kind · <kind> · <card>     a move by a mutation kind other than an inserted node, outside C, card none or scale 0.8: `vshow` (an
//                              existing 40 px block display:none -> block, a style attribute write, Vue's v-show); `class` (a block whose
//                              class toggles its height 0 -> 40 px); `text` (a paragraph's text node data grown by two lines, 20 px each:
//                              characterData); `remove` (a 40 px block removed, childList, the move -40 px)
//   anchor · on|off · top|outside|inside · <card>   a 40 px block inserted at the top of main (above the viewport), before C, or inside C,
//                              with scroll anchoring on (the engine's
//                              default, `overflow-anchor: auto`) or off. With anchoring on, an engine that anchors keeps the viewport's
//                              content where it was painted, so the root does not move in paint: a glide of the layout move is then itself
//                              a jump
//   still · <tag>             REPORT: a still pair for the owner's eye, held 900 ms (before), then the act and the next frame with the
//                              root's glide paused where it stood (after): anchor on, rotate 10deg, v-show, and the plain insert beside them
//   errs · <scene>             every E-2 scene on default tokens, Tab in and commit: console errors raised (must be 0)
//   node ca12-probe.mjs --build <dir> [--engine webkit] [--only xf,kind,anchor,still] [--frames <dir> --label <l>]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
const PEAK = 0.139, NOM = 1000 / 60;
const XF = {
  none: null, "scale 0.8": { scale: "0.8", transformOrigin: "0 0" },
  "rotate 10deg": { rotate: "10deg" }, "rotate 10deg + scale 0.8": { rotate: "10deg", scale: "0.8", transformOrigin: "0 0" },
  "skewY 8deg": { transform: "skewY(8deg)" }, "perspective rotateX 25deg": { transform: "perspective(600px) rotateX(25deg)" },
  "zoom 0.5": { zoom: "0.5" }, "zoom 2.5": { zoom: "2.5" }, "scale 1.25": { scale: "1.25", transformOrigin: "0 0" }, "html zoom 1.25": { __html: "1.25" },
};
const argv = process.argv; const oi = argv.indexOf("--only"); const ONLY = oi > 0 ? new Set(argv[oi + 1].split(",")) : null; const want = (k) => !ONLY || ONLY.has(k);
const CELLS = [];
if (want("xf")) for (const card of Object.keys(XF)) for (const place of ["inside", "outside", "nested"]) { if (card === "html zoom 1.25" && place !== "outside") continue; CELLS.push({ fam: "xf", place, card, kind: "child" }); }
if (want("kind")) for (const kind of ["vshow", "class", "text", "remove"]) for (const card of ["none", "scale 0.8"]) CELLS.push({ fam: "kind", place: "outside", card, kind });
if (want("anchor")) for (const place of ["top", "outside", "inside"]) for (const anc of ["on", "off"]) for (const card of ["none", "scale 0.8"]) CELLS.push({ fam: "anchor", place, card, kind: "child", anc });
if (want("still")) for (const c of [{ fam: "still", place: "top", card: "none", kind: "child", anc: "on" }, { fam: "still", place: "outside", card: "rotate 10deg", kind: "child" }, { fam: "still", place: "outside", card: "none", kind: "vshow" }, { fam: "still", place: "outside", card: "none", kind: "child" }]) CELLS.push(c);
const ai = argv.indexOf("--frames"); const FR = ai > 0 ? argv[ai + 1] : null; const ei = argv.indexOf("--engine"); const ENG = ei > 0 ? argv[ei + 1] : "chromium"; const li = argv.indexOf("--label"); const LBL = li > 0 ? argv[li + 1] : "build";
const setup = ([R, c, css]) => { const root = document.querySelector(R), C = root.parentElement, G = C.parentElement;
  document.documentElement.style.overflowAnchor = c.anc === "on" ? "auto" : "none";
  const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
  if (css?.__html) document.documentElement.style.zoom = css.__html; else if (css) Object.assign((c.place === "nested" ? G : C).style, css);
  // the act's subject, laid before the hold so the act is one mutation of its kind
  const at = (b) => { if (c.place === "inside") C.insertBefore(b, C.firstChild); else if (c.place === "outside") G.insertBefore(b, C); else if (c.place === "nested") G.parentElement.insertBefore(b, G); else mn.insertBefore(b, mn.firstChild); };
  if (c.kind === "vshow") { const b = document.createElement("div"); b.style.cssText = "height:40px;display:none"; b.id = "c12s"; at(b); }
  if (c.kind === "class") { const st = document.createElement("style"); st.textContent = ".c12b{height:0;overflow:hidden}.c12b.on{height:40px}"; document.head.appendChild(st); const b = document.createElement("div"); b.className = "c12b"; b.id = "c12s"; at(b); }
  if (c.kind === "text") { const p = document.createElement("p"); p.style.cssText = "margin:0;width:120px;font:16px/20px monospace;white-space:normal;overflow-wrap:anywhere"; p.id = "c12s"; p.appendChild(document.createTextNode("x")); at(p); }
  if (c.kind === "remove") { const b = document.createElement("div"); b.style.height = "40px"; b.id = "c12s"; at(b); }
  const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60);
  return { scrollY, mainTop: mn.getBoundingClientRect().top, anchor: getComputedStyle(document.documentElement).overflowAnchor };
};
const film = ([R, c]) => new Promise((ok) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const mn = document.querySelector("main") ?? document.body;
  const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
  const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0;
  ch.port1.onmessage = () => { const q = root.getBoundingClientRect(); out.push({ n, t: T() - t0, x: q.left + q.width / 2, y: q.top + q.height / 2, sy: scrollY, held: root.dataset.held !== undefined,
    an: root.getAnimations().filter((a) => !isCss(a) && a.playState === "running" && Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate")).length }); };
  const s = document.getElementById("c12s");
  const blk = () => { const b = document.createElement("div"); b.style.height = "40px"; return b; };
  const act = () => {
    if (c.kind === "vshow") s.style.display = "block";
    else if (c.kind === "class") s.classList.add("on");
    else if (c.kind === "text") s.firstChild.data = "x".repeat(36);
    else if (c.kind === "remove") s.remove();
    else if (c.place === "inside") C.insertBefore(blk(), C.firstChild); else if (c.place === "outside") G.insertBefore(blk(), C); else if (c.place === "nested") G.parentElement.insertBefore(blk(), G); else mn.insertBefore(blk(), mn.firstChild);
  };
  const tick = () => { n++; if (n === 8) act(); ch.port2.postMessage(0); if (n < 50) requestAnimationFrame(tick); else setTimeout(() => ok({ out, h: s ? s.getBoundingClientRect().height : null }), 40); };
  requestAnimationFrame(tick);
});
await witness("C-A12 probe", "CK-20's frame and move families past H12's enumeration", async ({ E, T, cell, guard, idx }) => {
  // errs · <scene>: a clean page of every E-2 scene on the library's DEFAULT tokens, Tab in, the commit (a stateless scene's click), +600 ms:
  // every console error raised. On default tokens a loud read must stay silent: an error here names a token the script refuses although
  // the stylesheet reads it (CK-21's class: the script's grammar against its consumer's)
  if (want("errs")) for (const [esc, em] of scenesFor(idx, "E-2")) {
    const name = `CA12 errs · ${esc}`;
    const r = await guard(name, async () => { const P = await openPage(E, T, esc); try {
      await P.page.waitForTimeout(200); await P.page.focus('[data-sentinel="before"]').catch(() => {}); await P.page.keyboard.press(E.name === "webkit" ? "Alt+Tab" : "Tab"); await P.page.waitForTimeout(300);
      await P.page.evaluate((st) => { const t = document.querySelector('[data-e~="target"]'); if (st) t?.click(); else window.__e.commit?.(); }, !!em.stateless).catch(() => {});
      await P.page.waitForTimeout(600); return { errs: [...P.errors] }; } finally { await P.close(); } }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    cell(name, r.errs.length ? "FAIL" : "PASS", `default tokens, Tab in and commit · console errors ${r.errs.length}${r.errs.length ? `: ${[...new Set(r.errs)].map((x) => x.slice(0, 110)).join(" | ")}` : ""}`);
  }
  const [sc, m] = scenesFor(idx, "E-10").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
  for (const c of CELLS) {
    if (c.fam === "still") {
      const tag = `${c.kind}-${c.card.replace(/\W+/g, "")}${c.anc === "on" ? "-anchor" : ""}`; const name = `CA12 still · ${tag}`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, sc);
        try {
          await P.page.evaluate(setup, [R, c, XF[c.card]]); await P.page.waitForTimeout(250);
          const k = await center(P.page, thumb); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
          try {
            await P.page.waitForTimeout(900); const fs = await import("node:fs"); fs.mkdirSync(FR, { recursive: true });
            const y0 = await P.page.evaluate((R) => { const q = document.querySelector(R).getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; }, R);
            await P.page.screenshot({ path: `${FR}/${LBL}-${ENG}-${tag}-before.png` });
            const y1 = await P.page.evaluate(async ([R, c]) => { const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const s = document.getElementById("c12s");
              const b = document.createElement("div"); b.style.height = "40px";
              if (c.kind === "vshow") s.style.display = "block"; else if (c.place === "top") { const mn = document.querySelector("main") ?? document.body; mn.insertBefore(b, mn.firstChild); } else G.insertBefore(b, C);
              await new Promise((ok) => requestAnimationFrame(() => setTimeout(ok, 0)));
              for (const a of root.getAnimations()) if (Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate")) a.pause();
              const q = root.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2, sy: scrollY }; }, [R, c]);
            await P.page.screenshot({ path: `${FR}/${LBL}-${ENG}-${tag}-act.png` });
            return { y0, y1 };
          } finally { await P.page.mouse.up(); }
        } finally { await P.close(); }
      }, 60000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      cell(name, "REPORT", `the root's painted centre ${f(r.y0.x, 1)}, ${f(r.y0.y, 1)} before; ${f(r.y1.x, 1)}, ${f(r.y1.y, 1)} on the frame after the act, its glide paused where it stood (${f(Math.hypot(r.y1.x - r.y0.x, r.y1.y - r.y0.y), 2)} px off; scrollY then ${f(r.y1.sy, 1)}) · ${LBL}-${ENG}-${tag}-{before,act}.png`);
      continue;
    }
    const name = c.fam === "xf" ? `CA12 xf · ${c.place} · ${c.card}` : c.fam === "kind" ? `CA12 kind · ${c.kind} · ${c.card}` : `CA12 anchor · ${c.anc} · ${c.place} · ${c.card}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        const st = await P.page.evaluate(setup, [R, c, XF[c.card]]); await P.page.waitForTimeout(250);
        const k = await center(P.page, thumb); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(900); return { ...(await P.page.evaluate(film, [R, c])), st, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= 8); const pre = S[i0 - 1], first = S[i0], end = S.at(-1);
    if (!pre || !first) { cell(name, "FAIL", `no frame before or on the act's (${S.length})`); continue; }
    if (!pre.held) { cell(name, "UNMEASURED", `NOT DRIVEN: the root is not held before the act (thumb off the page?) · setup ${JSON.stringify(r.st)}`); continue; }
    const jump = Math.hypot(first.x - pre.x, first.y - pre.y), moved = Math.hypot(end.x - pre.x, end.y - pre.y), bound = moved * PEAK + 1;
    const W = S.slice(i0 - 1); const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const a = W[i - 1], b = W[i]; return a[k] + ((b[k] - a[k]) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return W.at(-1)[k]; };
    let step = 0; for (const x of W) if (x.t - W[0].t >= NOM) step = Math.max(step, Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")));
    const glided = S.slice(i0).some((x) => x.an > 0); let worst = 0; for (const x of S.slice(i0)) worst = Math.max(worst, Math.hypot(x.x - end.x, x.y - end.y));
    const ok = jump <= 0.5 && step <= bound && (moved < 0.5 || glided);
    cell(name, ok ? "PASS" : "FAIL", `the root's painted centre moved ${f(end.x - pre.x, 2)}, ${f(end.y - pre.y, 2)} px (scrollY ${f(pre.sy, 1)} -> ${f(end.sy, 1)}); on the act's frame ${f(first.x - pre.x, 2)}, ${f(first.y - pre.y, 2)} = ${f(jump, 2)} px (bound 0.5); largest move over 16.7 ms ${f(step, 2)} px (bound ${f(bound, 2)}); farthest from its landing after the act ${f(worst, 2)} px; glide ${glided ? "ran" : "none"}; subject height after ${r.h == null ? "-" : f(r.h, 1)} · errors ${r.errs.length}${r.errs[0] ? `: ${r.errs[0].slice(0, 100)}` : ""}`);
  }
});
