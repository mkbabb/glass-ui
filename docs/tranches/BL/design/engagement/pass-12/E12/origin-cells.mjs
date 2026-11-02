#!/usr/bin/env node
// P-E12 origin cells (D5 pass 12): the host's re-render glide past H12's enumeration, for the claim P-E12's header makes (a re-render
// that resizes a scaled box about a centred origin moves the place; other transform kinds). Same drive and read as H12's E-10
// `hostglide` (the loupe row without a clip; a fine hold, +900 ms; filmed per frame from a task posted from requestAnimationFrame,
// stamped with the document timeline; on frame 8 a 40 px block is inserted; the root's painted centre read every frame). Cards, each
// with the transform's DEFAULT origin (the box's centre) unless named:
//   scale c        C `scale: 0.8`                          transform c    C `transform: scale(0.8) translate(10px, 6px)`
//   aniso c        C `scale: 0.8 0.9`                      zs c           C `zoom: 1.25; scale: 0.8`
//   rotate         C `rotate: 0deg; scale: 0.8` (origin c)  none           C untransformed
// Places: above (a block C's first child, above the root), below (a block after the root inside C: the root does not move in layout;
// C's centre falls 20 px, which a scale s leaves (1 − s)·20 painted px of), outside (before C), nested (before G, the transform on G).
// PASS when the root's painted centre on the mutation's frame is ≤ 0.5 px from where it was painted the frame before, and its largest
// move over any 16.7 ms ≤ the move × dock's one-frame peak 0.139 + 1 px (H11's printed bound for the row). A move under 0.5 px needs
// no glide. Gating for this seat's claim; the critics' to drive past.
//   node origin-cells.mjs --build <dir> [--engine webkit] [--out <dir>]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
const CARDS = { "none": null, "scale c": { scale: "0.8" }, "transform c": { transform: "scale(0.8) translate(10px, 6px)" }, "aniso c": { scale: "0.8 0.9" }, "zs c": { zoom: "1.25", scale: "0.8" }, "rotate c": { rotate: "0deg", scale: "0.8" } };
const PLACES = ["above", "below", "outside", "nested"];
const PEAK = 0.139, NOM = 1000 / 60;
await witness("E12 origin", "the host glide under a centred origin and other transform kinds", async ({ E, T, cell, guard, idx }) => {
  const [sc, m] = scenesFor(idx, "E-10").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
  for (const card of Object.keys(CARDS)) for (const place of PLACES) {
    if (card === "none" && place !== "below" && place !== "above") continue;
    const name = `E12 origin · ${place} · ${card}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        await P.page.evaluate(([R, place, css]) => { const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; document.documentElement.style.overflowAnchor = "none";
          const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
          if (css) Object.assign((place === "nested" ? G : C).style, css);
          const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60); }, [R, place, CARDS[card]]);
        await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try {
          await P.page.waitForTimeout(900);
          return { ...(await P.page.evaluate(([R, place]) => new Promise((ok) => {
            const root = document.querySelector(R), C = root.parentElement, G = C.parentElement; const T = () => document.timeline.currentTime; const t0 = T(); const out = []; const ch = new MessageChannel(); let n = 0;
            const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
            ch.port1.onmessage = () => { const q = root.getBoundingClientRect(); out.push({ n, t: T() - t0, x: q.left + q.width / 2, y: q.top + q.height / 2, an: root.getAnimations().filter((a) => !isCss(a) && a.playState === "running" && Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate")).length }); };
            const blk = () => { const b = document.createElement("div"); b.style.height = "40px"; return b; };
            const act = () => { if (place === "above") C.insertBefore(blk(), C.firstChild); else if (place === "below") C.insertBefore(blk(), root.nextSibling); else if (place === "outside") G.insertBefore(blk(), C); else G.parentElement.insertBefore(blk(), G); };
            const tick = () => { n++; if (n === 8) act(); ch.port2.postMessage(0); if (n < 50) requestAnimationFrame(tick); else setTimeout(() => ok({ out }), 40); };
            requestAnimationFrame(tick); }), [R, place])), errs: [...P.errors] };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const S = r.out; const i0 = S.findIndex((x) => x.n >= 8); const pre = S[i0 - 1], first = S[i0], end = S.at(-1);
    if (!pre || !first) { cell(name, "FAIL", `no frame before or on the mutation's (${S.length})`); continue; }
    const jump = Math.hypot(first.x - pre.x, first.y - pre.y), moved = Math.hypot(end.x - pre.x, end.y - pre.y), bound = moved * PEAK + 1;
    const W = S.slice(i0 - 1); const at = (t, k) => { for (let i = 1; i < W.length; i++) if (W[i].t >= t) { const a = W[i - 1], b = W[i]; return a[k] + ((b[k] - a[k]) * (t - a.t)) / Math.max(1e-6, b.t - a.t); } return W.at(-1)[k]; };
    let step = 0; for (const x of W) if (x.t - W[0].t >= NOM) step = Math.max(step, Math.hypot(x.x - at(x.t - NOM, "x"), x.y - at(x.t - NOM, "y")));
    const glided = S.slice(i0).some((x) => x.an > 0);
    const ok = jump <= 0.5 && step <= bound && (moved < 0.5 || glided);
    cell(name, ok ? "PASS" : "FAIL", `a 40 px block ${place} · the root's painted centre moved ${f(end.x - pre.x, 2)}, ${f(end.y - pre.y, 2)} px; on the mutation's frame ${f(jump, 2)} px (bound 0.5); largest move over 16.7 ms ${f(step, 2)} px (bound ${f(bound, 2)}); glide ${glided ? "ran" : "none"} · errors ${r.errs.length}`);
  }
});
