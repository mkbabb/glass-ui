#!/usr/bin/env node
// C-E12 adversarial probe (D5 pass 12, a fresh critic of HEAD + pass-12/P-E12.patch). Not a witness: every line is scored in C-E12.md
// against the CK row it would break, or placed as a next-pass class. It drives the frame family of the host's re-render glide PAST
// H12's enumeration (other transform kinds, other move places, other mutation kinds, the page's own scroll anchoring) with H12's own
// reading (e10-continuity.mjs `hostglide`: the root's painted centre per frame from a task posted in requestAnimationFrame, after that
// frame's paint; a 40 px move on frame 8; PASS when the root's painted centre on the mutation's frame is <= 0.5 px from where it was
// painted the frame before and its largest move over any 16.7 ms of the timeline is <= the painted move x the glide's row's one-frame
// peak + 1 px; a glide must run when the root's paint moved >= 5 px). It also drives the reach's own tokens (`--space-section`,
// `--scale-engage`) past P-E12's list. The harness's own scene app and lib: one browser per run, a fresh context per cell, every page
// and context closed in a finally, the browser closed by witness(); WebKit retires its browser every NAV_CAP navigations.
//   --only hg,dlg,gutter    the parts;  --cases a,b  narrows hg to those case keys
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, center, f, rowsOf, rowFacts, rodeRow } = await import(`${H}/lib.mjs`);
const NOM = 1000 / 60;

// Each case: where the 40 px move happens and what the card C (the root's parent) or G (C's parent) carries.
//   place: inside (the block C's first child) | outside (before C) | nested (before G) | below (after the root inside C: C grows under
//   the root, which moves only through a centred transform) | none (an unrelated append after C: nothing should glide)
//   css: on C (G for nested); gcss: on G; html: on <html>; anchor: leave the page's scroll anchoring on (H12 turns it off);
//   scroller: G becomes a scrolled overflow box (anchoring on); kind: how the move is made (insert | remove | attr | hidden | text);
//   anim: a running ancestor animation across an unrelated mutation (css-scale: a CSS transition of C's scale 0.8 -> 1; waapi-translate:
//   a WAAPI translate of C)
const S08 = { scale: "0.8", transformOrigin: "0 0" };
const CASES = {
  "control · outside · none": { place: "outside" },
  "control · outside · scale 0.8": { place: "outside", css: S08 },
  "anchor · outside · none": { place: "outside", anchor: true },
  "anchor · outside · scale 0.8": { place: "outside", anchor: true, css: S08 },
  "anchor · inside · none": { place: "inside", anchor: true },
  "anchor · scroller · none": { place: "outside", scroller: true },
  "rotate 10deg · outside": { place: "outside", css: { rotate: "10deg", transformOrigin: "0 0" } },
  "rotate 10deg · nested": { place: "nested", css: { rotate: "10deg", transformOrigin: "0 0" } },
  "rotate 10deg · inside": { place: "inside", css: { rotate: "10deg", transformOrigin: "0 0" } },
  "rotate 10deg centred · below": { place: "below", css: { rotate: "10deg", transformOrigin: "50% 50%" } },
  "skewX 15deg · outside": { place: "outside", css: { transform: "skewX(15deg)", transformOrigin: "0 0" } },
  "matrix 0.8 · outside": { place: "outside", css: { transform: "matrix(0.8, 0, 0, 0.8, 0, 0)", transformOrigin: "0 0" } },
  "perspective · outside": { place: "outside", gcss: { perspective: "400px" }, css: { transform: "translateZ(-50px)", transformOrigin: "50% 50%" } },
  "translate 0 -50% · inside": { place: "inside", css: { translate: "0 -50%" } },
  "translate -50% -50% · inside": { place: "inside", css: { translate: "-50% -50%", position: "relative", left: "50%" } },
  "zoom 0.5 · outside": { place: "outside", css: { zoom: "0.5" } },
  "zoom 2.5 · outside": { place: "outside", css: { zoom: "2.5" } },
  "zoom 0.5 + scale 0.8 · nested": { place: "nested", css: { zoom: "0.5", scale: "0.8", transformOrigin: "0 0" } },
  "html zoom 1.25 · outside": { place: "outside", html: "1.25" },
  "remove · outside · scale 0.8": { place: "outside", kind: "remove", css: S08 },
  "attr (style height) · outside · none": { place: "outside", kind: "attr" },
  "attr (style height) · outside · scale 0.8": { place: "outside", kind: "attr", css: S08 },
  "hidden attr · outside · none": { place: "outside", kind: "hidden" },
  "text (characterData) · outside · none": { place: "outside", kind: "text" },
  "css-transition scale · animating · out": { place: "none", anim: "css-scale" },
  "waapi translate · animating · out": { place: "none", anim: "waapi-translate" },
};

const hgSetup = ([R, c]) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement;
  if (!c.anchor && !c.scroller) document.documentElement.style.overflowAnchor = "none";
  if (c.html) document.documentElement.style.zoom = c.html;
  const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
  if (c.css) Object.assign((c.place === "nested" ? G : C).style, c.css);
  if (c.gcss) Object.assign(G.style, c.gcss);
  if (c.anim === "css-scale") { C.style.transformOrigin = "0 0"; C.style.scale = "0.8"; C.style.transition = "scale 600ms linear"; }
  // a pre-placed block for the remove / attr / hidden / text kinds, before C
  const pre = document.createElement("div"); pre.setAttribute("data-t", "ce12-pre");
  if (c.kind === "remove") pre.style.height = "40px";
  else if (c.kind === "attr") pre.style.height = "0px";
  else if (c.kind === "hidden") { pre.style.height = "40px"; pre.hidden = true; }
  else if (c.kind === "text") { pre.style.cssText = "width: 40px; font: 16px/20px monospace; overflow-wrap: anywhere; margin: 0; padding: 0"; pre.appendChild(document.createTextNode("x")); }
  if (c.kind) (c.place === "nested" ? G.parentElement : G).insertBefore(pre, c.place === "nested" ? G : C);
  if (c.scroller) {
    // G a scroller with room both ways; scrolled so C straddles G's top edge (C, partly visible, is the scroll anchor)
    G.style.overflow = "auto"; G.style.height = "260px"; G.style.overflowAnchor = "auto";
    const sp = document.createElement("div"); sp.style.height = "300px"; sp.setAttribute("data-t", "ce12-spacer"); G.insertBefore(sp, G.firstChild);
    const sp2 = document.createElement("div"); sp2.style.height = "600px"; sp2.setAttribute("data-t", "ce12-spacer2"); G.appendChild(sp2);
  }
  const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60);
  if (c.scroller) G.scrollTop += C.getBoundingClientRect().top - G.getBoundingClientRect().top + 5;
  // the page's own scroll anchoring: scrolled so C straddles the viewport's top edge, so C (partly visible) is the anchor
  if (c.anchor) scrollBy(0, C.getBoundingClientRect().top + 5);
  const r2 = root.getBoundingClientRect(); return { y: r2.top + r2.height / 2, sy: scrollY, gst: G.scrollTop };
};
const hgFilm = ([R, c]) => new Promise((ok) => {
  const root = document.querySelector(R), C = root.parentElement, G = C.parentElement;
  const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
  const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0, anim = null; const AT = c.anim ? 14 : 8;
  ch.port1.onmessage = () => { const r = root.getBoundingClientRect(), cr = C.getBoundingClientRect();
    const an = root.getAnimations().filter((a) => !isCss(a) && a.playState === "running" && Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate")).map((a) => a.effect.getTiming().duration);
    out.push({ n, t: T() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, cx: cr.left, ct: cr.top, cs: cr.height / (C.offsetHeight || 1), an, sy: scrollY, gst: G.scrollTop }); };
  const blk = () => { const b = document.createElement("div"); b.style.height = "40px"; b.setAttribute("data-t", "ce12-block"); return b; };
  const pre = document.querySelector('[data-t="ce12-pre"]');
  const act = () => {
    if (c.place === "none") { G.insertBefore(blk(), C.nextSibling); return; }
    if (c.kind === "remove") { pre.remove(); return; }
    if (c.kind === "attr") { pre.style.height = "40px"; return; }
    if (c.kind === "hidden") { pre.hidden = false; return; }
    if (c.kind === "text") { pre.firstChild.data = "xxxxxxxxxxxx"; return; }
    if (c.place === "inside") C.insertBefore(blk(), C.firstChild);
    else if (c.place === "outside") G.insertBefore(blk(), C);
    else if (c.place === "below") root.after(blk());
    else G.parentElement.insertBefore(blk(), G);
  };
  const tick = () => { n++;
    if (n === 2 && c.anim === "css-scale") C.style.scale = "1";
    if (n === 2 && c.anim === "waapi-translate") anim = C.animate({ translate: ["0 0", "0 60px"] }, { duration: 600, easing: "linear" });
    if (n === AT) act(); ch.port2.postMessage(0); if (n < 60) requestAnimationFrame(tick); else setTimeout(() => { anim?.cancel(); ok({ out, AT }); }, 40); };
  requestAnimationFrame(tick);
});

// the reach's own tokens, past P-E12's list: each value set on the card C before the hold (the page row, a 390 x 700 viewport, the root
// sized to clear the default gutter by 6 painted px a side, as H12's reach cell does). Read: console errors naming the token, the
// engaged painted inline and block grow, and CSS's own reading of the token as a length on a probe in C (what a consumer's padding gets)
const GUTTER = [["--space-section", "nonsense"], ["--space-section", "5%"], ["--space-section", "-1rem"], ["--space-section", "calc(-1rem)"], ["--space-section", "calc(1rem + 4px)"], ["--space-section", "2.5vw"], ["--space-section", "0px"], ["--scale-engage", "nonsense"], ["--scale-engage", "1.06abc"], ["--scale-engage", "calc(1 + 0.06)"]];

await witness("C-E12 probe", "C-E12's adversarial cells on the candidate's stage: the host's re-render glide past H12's frame family, the reach's tokens", async ({ a, E, T, cell, guard, idx }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const caseSel = typeof a.cases === "string" ? new Set(a.cases.split(";")) : null;
  const pageRows = Object.entries(idx).filter(([s, x]) => s !== "__index" && x.loupe && !x.clip);
  if (want("hg")) for (const [sc, m] of pageRows) for (const [key, c] of Object.entries(CASES)) {
    if (caseSel && !caseSel.has(key)) continue;
    const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
    const name = `CE12 ${sc} hg · ${key}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        const set = await P.page.evaluate(hgSetup, [R, c]); await P.page.waitForTimeout(250);
        const rows = await P.page.evaluate(rowsOf);
        const k = await center(P.page, thumb); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(900); return { ...(await P.page.evaluate(hgFilm, [R, c])), set, rows, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const pre = S[i0 - 1], first = S[i0];
    if (!pre || !first) { cell(name, "FAIL", `no frame before or on the mutation's (${S.length} frames)`); continue; }
    const after = S.slice(i0); const durs = [...new Set(after.flatMap((x) => x.an))]; const end = S.at(-1);
    const scr = `scrollY ${f(pre.sy, 1)} → ${f(first.sy, 1)} → ${f(end.sy, 1)}, G.scrollTop ${f(pre.gst, 1)} → ${f(end.gst, 1)}`;
    if (c.anim) {
      const glides = after.slice(0, 6).filter((x) => x.an.length).length; const rel = (x) => (x.y - x.ct) / x.cs; const drift = Math.abs(rel(first) - rel(pre));
      const inFlight = c.anim === "css-scale" ? Math.abs(first.cs - pre.cs) > 1e-4 : Math.abs(first.ct - pre.ct) > 0.05;
      cell(name, !inFlight ? "UNMEASURED" : !glides && drift <= 0.5 ? "PASS" : "FAIL", `${inFlight ? "" : "NOT DRIVEN: the ancestor animation was not in flight across the mutation · "}C runs ${c.anim} (C top ${f(pre.ct, 2)} → ${f(first.ct, 2)}, C scale ${f(pre.cs, 4)} → ${f(first.cs, 4)} across the mutation's frame); an unrelated block appended after C on frame ${r.AT} · translate glides on the root in the next 6 frames ${glides}${durs.length ? ` (clock ${durs.map((x) => f(x, 0)).join(",")} ms)` : ""} (bound 0) · the root's place in C's frame moved ${f(drift, 2)} px across the mutation (bound 0.5) · errors ${r.errs.length}`);
      continue;
    }
    const moved = Math.hypot(end.x - pre.x, end.y - pre.y), jump = Math.hypot(first.x - pre.x, first.y - pre.y);
    const facts = r.rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null); const rode = rodeRow(durs, r.rows); const row = rode ?? fastest;
    const bound = moved * (row?.peak ?? 0) + 1;
    const W = S.slice(i0 - 1); const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const p = W[i - 1], q = W[i]; return p[k] + ((q[k] - p[k]) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return W.at(-1)[k]; };
    let step = 0, stepAt = NaN; for (const x of W) if (x.t - W[0].t >= NOM) { const d = Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")); if (d > step) { step = d; stepAt = x.t - pre.t; } }
    const glided = durs.length > 0; const needGlide = moved >= 5;
    const ok = jump <= 0.5 && step <= bound && (!needGlide || glided);
    const path = S.slice(Math.max(0, i0 - 1), i0 + 5).map((x) => `${f(x.x - pre.x, 1)},${f(x.y - pre.y, 1)}`).join(" ");
    cell(name, ok ? "PASS" : "FAIL", `a 40 px ${c.kind ?? "insert"} ${c.place} on frame ${r.AT} · the root's paint moved ${f(end.x - pre.x, 1)}, ${f(end.y - pre.y, 1)} px in all (${f(moved, 2)}); on the mutation's frame ${f(jump, 2)} px from where it was painted (bound 0.5) · largest move over any 16.7 ms ${f(step, 1)} px at +${f(stepAt, 0)} ms (bound ${f(bound, 1)} = ${f(moved, 1)} × ${row?.n ?? "?"} ${f(row?.peak, 3)} + 1) · glide ${glided ? `ran (clock ${durs.map((x) => f(x, 0)).join(",")} ms${rode ? `, row ${rode.n}` : ""})` : "none"}${needGlide && !glided ? " (the paint moved ≥ 5 px with no glide)" : ""} · path from the frame before [${path}] · ${scr} · errors ${r.errs.length}${r.errs[0] ? ` (${r.errs[0].slice(0, 100)})` : ""}`);
  }
  // the library's own Dialog (the presented scene, a Slider in the plate, `&slider=1`): DialogContent is centred by `translate: -50% -50%`
  // (components/dialog/styles.css), so content inserted above the slider inside the plate grows the plate and moves the slider by half
  // the insert. Keyboard engagement (Tab from the plate's button, as E-10's dlg cells), +700 ms, then the same film and reading as hg
  const dRows = Object.entries(idx).filter(([, x]) => x.dlg);
  if (want("dlg")) for (const [sc, m] of dRows) for (const kind of ["insert", "remove"]) {
    const D = m.dlg; const name = `CE12 ${sc} dlg · ${kind} above the slider inside the plate`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { q: D.q ?? {} });
      try {
        const { page } = P; if (!(await page.$(D.root))) return { absent: true };
        const rows = await page.evaluate(rowsOf);
        await page.focus(D.from); await page.keyboard.press(a.engine === "webkit" ? "Alt+Tab" : "Tab"); await page.waitForTimeout(700);
        const eng = await page.evaluate(([R, e]) => document.querySelector(R).matches(e) || !!document.querySelector(R).closest(e), [D.root, D.engaged ?? "[data-engaged]"]);
        const film = await page.evaluate(([R, kind]) => new Promise((ok) => {
          const root = document.querySelector(R); const wrap = root.closest('[data-t="dlg-slider"]'); const plate = root.closest('[role="dialog"]');
          const isCss = (x) => (typeof CSSTransition !== "undefined" && x instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && x instanceof CSSAnimation);
          const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0; const AT = 8;
          ch.port1.onmessage = () => { const q = root.getBoundingClientRect(), pr = plate.getBoundingClientRect(); const an = root.getAnimations().filter((x) => !isCss(x) && x.playState === "running" && Object.keys(x.effect.getKeyframes()[0] ?? {}).includes("translate")).map((x) => x.effect.getTiming().duration); out.push({ n, t: T() - t0, x: q.left + q.width / 2, y: q.top + q.height / 2, pt: pr.top, ph: pr.height, an }); };
          const act = () => { if (kind === "insert") { const b = document.createElement("div"); b.style.height = "40px"; b.setAttribute("data-t", "ce12-block"); wrap.before(b); } else { const p = plate.querySelector("p"); if (p) p.remove(); } };
          const tick = () => { n++; if (n === AT) act(); ch.port2.postMessage(0); if (n < 60) requestAnimationFrame(tick); else setTimeout(() => ok({ out, AT, tr: getComputedStyle(plate).translate }), 40); };
          requestAnimationFrame(tick); }), [D.root, kind]);
        return { ...film, rows, eng, errs: [...P.errors] };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.absent) { cell(name, "FAIL", `NOT DRIVEN: no ${D.root}`); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= r.AT); const pre = S[i0 - 1], first = S[i0], end = S.at(-1);
    const after = S.slice(i0); const durs = [...new Set(after.flatMap((x) => x.an))];
    const moved = Math.hypot(end.x - pre.x, end.y - pre.y), jump = Math.hypot(first.x - pre.x, first.y - pre.y);
    const facts = r.rows.map(rowFacts).filter((x) => Number.isFinite(x.peak)); const fastest = facts.reduce((p, x) => (!p || x.peak > p.peak ? x : p), null); const rode = rodeRow(durs, r.rows); const row = rode ?? fastest; const bound = moved * (row?.peak ?? 0) + 1;
    const W = S.slice(i0 - 1); const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const p = W[i - 1], q = W[i]; return p[k] + ((q[k] - p[k]) * (t - p.t)) / Math.max(1e-6, q.t - p.t); } return W.at(-1)[k]; };
    let step = 0; for (const x of W) if (x.t - W[0].t >= NOM) step = Math.max(step, Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")));
    const glided = durs.length > 0; const ok = r.eng && jump <= 0.5 && step <= bound && (moved < 5 || glided);
    const path = S.slice(Math.max(0, i0 - 1), i0 + 5).map((x) => `${f(x.x - pre.x, 1)},${f(x.y - pre.y, 1)}`).join(" ");
    cell(name, !r.eng ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${r.eng ? "" : "NOT DRIVEN: the slider was not engaged · "}keyboard-engaged slider in the presented Dialog (the plate's translate "${r.tr}"); a 40 px ${kind === "insert" ? "block inserted above the slider" : "paragraph removed above the slider"} inside the plate on frame ${r.AT} · the plate's top ${f(pre.pt, 1)} → ${f(end.pt, 1)}, height ${f(pre.ph, 1)} → ${f(end.ph, 1)} · the root's paint moved ${f(end.x - pre.x, 1)}, ${f(end.y - pre.y, 1)} px in all; on the mutation's frame ${f(jump, 2)} px from where it was painted (bound 0.5) · largest move over any 16.7 ms ${f(step, 1)} px (bound ${f(bound, 1)} = ${f(moved, 1)} × ${row?.n ?? "?"} ${f(row?.peak, 3)} + 1) · glide ${glided ? `ran (clock ${durs.map((x) => f(x, 0)).join(",")} ms)` : "none"} · path from the frame before [${path}] · errors ${r.errs.length}${r.errs[0] ? ` (${r.errs[0].slice(0, 100)})` : ""}`);
  }
  if (want("gutter")) for (const [sc, m] of pageRows) for (const [tok, val] of GUTTER) {
    const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
    const name = `CE12 ${sc} gutter · ${tok}: ${val}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { vp: { width: 390, height: 700 } });
      try {
        const rest = await P.page.evaluate(([R, tok, val]) => { const root = document.querySelector(R), C = root.parentElement; const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "200px"; document.documentElement.style.overflowAnchor = "none";
          const pr = document.createElement("div"); pr.style.cssText = "position:absolute;height:1px;width:var(--space-section)"; C.appendChild(pr); const g0 = pr.getBoundingClientRect().width;
          const vw = innerWidth; root.style.boxSizing = "border-box"; root.style.position = "relative"; root.style.left = "0px"; root.style.width = `${vw - 2 * (g0 + 6)}px`;
          for (let i = 0; i < 3; i++) { const q = root.getBoundingClientRect(); root.style.left = `${Number.parseFloat(root.style.left) + (vw / 2 - (q.left + q.width / 2))}px`; }
          C.style.setProperty(tok, val);
          const gP = pr.getBoundingClientRect().width; const pad = document.createElement("div"); pad.style.cssText = "position:absolute;height:1px;width:0;padding-left:var(--space-section)"; C.appendChild(pad); const gPad = pad.getBoundingClientRect().width; pad.remove(); pr.remove();
          const q = root.getBoundingClientRect(); return { g0, gP, gPad, vw, l: q.left, r: q.right, w: q.width, h: q.height, tokC: getComputedStyle(C).getPropertyValue(tok).trim(), cssEng: getComputedStyle(root).getPropertyValue("--scale-engage").trim() }; }, [R, tok, val]);
        await P.page.waitForTimeout(250);
        const k = await center(P.page, thumb); await P.page.mouse.move(k.x, k.y); await P.page.mouse.down();
        try { await P.page.waitForTimeout(1100); const eng = await P.page.evaluate((R) => { const e = document.querySelector(R); const q = e.getBoundingClientRect(); return { l: q.left, r: q.right, w: q.width, h: q.height, reach: e.style.getPropertyValue("--stage-reach"), engaged: e.hasAttribute("data-engaged") || !!e.querySelector("[data-engaged]") }; }, R); return { rest, eng, errs: [...P.errors] }; } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const { rest, eng } = r; const named = r.errs.filter((e) => !e.startsWith("pageerror") && e.includes(tok)); const uncaught = r.errs.filter((e) => e.startsWith("pageerror"));
    const xi = eng.w / rest.w, xb = eng.h / rest.h; const room = Math.min(rest.l, rest.vw - rest.r); const fig = Math.min(xb, 1 + (2 * Math.max(0, room - rest.gPad)) / rest.w);
    cell(name, "REPORT", `the token on C computes "${rest.tokC}" · CSS lays --space-section as a width ${f(rest.gP, 2)} px and as a padding ${f(rest.gPad, 2)} px (default ${f(rest.g0, 2)}) · the stage wrote --stage-reach "${eng.reach}" · engaged ${eng.engaged} · painted inline ×${f(xi, 4)} (${f(eng.w, 1)} px of ${f(rest.w, 1)}), block ×${f(xb, 4)} · the rule with CSS's padding gutter ×${f(fig, 4)} (${f(eng.w - fig * rest.w, 2)} px off) · console errors naming the token ${named.length}${named[0] ? ` ("${named[0].slice(0, 110)}")` : ""}, uncaught ${uncaught.length}, all ${r.errs.length}`);
  }
});
