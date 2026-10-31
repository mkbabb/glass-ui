#!/usr/bin/env node
// H11 glance (REGISTRY §P10-5, §P10-8.3 wave 1): the side change under a zoomed card, as stills for the owner's eye: above (held,
// before the carry), mid (the travel paused at 0.15 of its clock, or the first frame after the side changed where no travel runs),
// below (450 ms after it resumes). The card's scroller under `zoom: 1.25` (and `none` beside it), the harness's clipstale row,
// a fine hold. REPORT only; no mid-film screenshot of a running film (the travel is paused for the still).
//   node glance-zoom.mjs --build <dir> --label <l> --frames <dir> [--engine webkit]
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f, sideSetup } = await import(`${H}/lib.mjs`);
await witness("H11 glance", "the side change under a zoomed card, stills", async ({ a, E, T, cell, guard, idx, engine }) => {
  const frames = a.frames; const label = a.label ?? "x"; fs.mkdirSync(frames, { recursive: true });
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && x.clip); const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]';
  for (const tf of ["zoom125", "none"]) {
    const name = `glance side · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        await sideSetup(m, tf)(P.page, "carry"); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        const shot = (n) => P.page.screenshot({ path: path.join(frames, `${label}-${engine}-side-${tf}-${n}.png`), animations: "allow" });
        try {
          await P.page.waitForTimeout(900); await shot("above");
          const hit = await P.page.evaluate(([B, Lens, Tr]) => new Promise((ok) => { const b = document.querySelector(B), l = document.querySelector(Lens), t = document.querySelector(Tr); const zb = b.currentCSSZoom ?? 1; let top = Number.parseFloat(b.style.top) || 0, n = 0; const side = () => { const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); return a1.top + a1.height / 2 > d.top + d.height / 2; }; const s0 = side();
            const tick = () => { const an = l.getAnimations().find((x) => !x.transitionProperty && x.playState === "running"); if (an) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.15; ok({ n, paused: true }); return; } if (side() !== s0) { ok({ n, paused: false }); return; } if (++n > 400) { ok({ n, paused: false, never: true }); return; } top -= 2 / zb; b.style.top = `${top}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [m.clip.box, L.lens, L.track]);
          await P.page.waitForTimeout(60); await shot("mid");
          const g = await P.page.evaluate(([Lens, Tr]) => { const a1 = document.querySelector(Lens).getBoundingClientRect(), d = document.querySelector(Tr).getBoundingClientRect(); return { lt: a1.top, lb: a1.bottom, tt: d.top, tb: d.bottom }; }, [L.lens, L.track]);
          await P.page.evaluate((Lens) => { for (const an of document.querySelector(Lens).getAnimations()) if (!an.transitionProperty) an.play(); }, L.lens);
          await P.page.waitForTimeout(450); await shot("below");
          const g2 = await P.page.evaluate(([Lens, Tr]) => { const a1 = document.querySelector(Lens).getBoundingClientRect(), d = document.querySelector(Tr).getBoundingClientRect(); return { lt: a1.top, lb: a1.bottom, tt: d.top, tb: d.bottom }; }, [L.lens, L.track]);
          return { hit, g, g2 };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `stills ${label}-${engine}-side-${tf}-{above,mid,below}.png · ${r.hit.paused ? `the travel paused at 0.15 of its clock after ${r.hit.n} frames` : r.hit.never ? "no side change in 400 frames" : `no travel ran: the side changed after ${r.hit.n} frames`} · mid: lens ${f(r.g.lt, 1)}..${f(r.g.lb, 1)} px, track ${f(r.g.tt, 1)}..${f(r.g.tb, 1)} px · below: lens ${f(r.g2.lt, 1)}..${f(r.g2.lb, 1)}, track ${f(r.g2.tt, 1)}..${f(r.g2.tb, 1)}`);
  }
});
