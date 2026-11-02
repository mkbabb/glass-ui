#!/usr/bin/env node
// H12 glance (REGISTRY §P11-8.3 wave 1): the host's re-render glide under a scaled card, as a still pair for the owner's eye: before
// (held 900 ms, before the mutation) and the mutation's frame (a 40 px block inserted before the card C; the root's translate glide,
// once the mutation observer has run, paused at currentTime 0, the place the glide starts from). The card C `scale: 0.8` (origin 0 0)
// and `none` beside it, on E-10's page row (the loupe row without a clip), a fine hold. REPORT only: the stills, and the root's
// painted centre in each (a glide that starts where the root was painted shows the same centre in both).
//   node glance-glide.mjs --build <dir> --label <l> --frames <dir> [--engine webkit]
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
await witness("H12 glance", "the host glide under a scaled card, stills", async ({ a, E, T, cell, guard, idx, engine }) => {
  const frames = a.frames; const label = a.label ?? "x"; fs.mkdirSync(frames, { recursive: true });
  const [sc, m] = scenesFor(idx, "E-10").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
  for (const tf of ["scale08", "none"]) {
    const name = `glance hostglide · outside · ${tf === "none" ? "none" : "scale 0.8"}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        await P.page.evaluate(([R, tf]) => { const root = document.querySelector(R), C = root.parentElement; document.documentElement.style.overflowAnchor = "none";
          const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px";
          if (tf === "scale08") Object.assign(C.style, { scale: "0.8", transformOrigin: "0 0" });
          const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60); }, [R, tf]);
        await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        const shot = (n) => P.page.screenshot({ path: path.join(frames, `${label}-${engine}-hostglide-${tf}-${n}.png`), animations: "allow" });
        const at = () => P.page.evaluate((R) => { const b = document.querySelector(R).getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; }, R);
        try {
          await P.page.waitForTimeout(900); const p0 = await at(); await shot("before");
          const g = await P.page.evaluate(async (R) => { const root = document.querySelector(R), C = root.parentElement, G = C.parentElement;
            const isCss = (a) => (typeof CSSTransition !== "undefined" && a instanceof CSSTransition) || (typeof CSSAnimation !== "undefined" && a instanceof CSSAnimation);
            const blk = document.createElement("div"); blk.style.height = "40px"; blk.setAttribute("data-t", "h12-block"); G.insertBefore(blk, C);
            await Promise.resolve(); await Promise.resolve(); // the mutation observer's callback runs first (queued at the mutation)
            const an = root.getAnimations().filter((a) => !isCss(a) && Object.keys(a.effect.getKeyframes()[0] ?? {}).includes("translate"));
            for (const a of an) { a.pause(); a.currentTime = 0; }
            return { n: an.length, ms: an.map((a) => a.effect.getTiming().duration) }; }, R);
          await P.page.waitForTimeout(60); const p1 = await at(); await shot("mutation");
          return { p0, p1, g };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `stills ${label}-${engine}-hostglide-${tf}-{before,mutation}.png · the root's painted centre before ${f(r.p0.x, 1)}, ${f(r.p0.y, 1)} · on the mutation's frame (${r.g.n ? `the glide paused at 0 of its ${r.g.ms.map((x) => f(x, 0)).join(",")} ms` : "no glide ran"}) ${f(r.p1.x, 1)}, ${f(r.p1.y, 1)}: ${f(Math.hypot(r.p1.x - r.p0.x, r.p1.y - r.p0.y), 2)} px from where it was painted`);
  }
});
