#!/usr/bin/env node
// P-E10's owner-glance stills for CK-25 (the side change and the exit under scale), on the harness's own app and its lib: stills, not a witness.
// Every graded read is E-10's and E-13's. Nothing here is a cell of record: each line is REPORT, printing what the still shows.
//   node glance-side.mjs --build <dir> --engine chromium|webkit --frames <dir> --label <l>
// A fine hold on the `clipstale` scene, the scroller carried 2 px a frame to the line (as E-10's `carry` drive). Stills: `above` (before the change), `mid` (the travel
// paused about half way), `below` (settled). `exit`: a separate page, released, the lens's own clocks paused 60 ms in (the frame C-E9 §1.3 kept).
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);

await witness("GLANCE", "CK-25 stills: the lens's side change, its exit under scale", async ({ a, E, T, cell, guard, idx, engine }) => {
  const dir = String(a.frames); const label = String(a.label ?? "cand10"); fs.mkdirSync(dir, { recursive: true });
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && x.clip);
  const L = m.loupe; const thumb = m.thumb ?? '[data-e~="thumb"]';
  const setup = (page, css) => page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${170 - y}px`; }, [m.clip.box, m.clip.rest, css]);
  const read = (page) => page.evaluate((L) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return null; const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const rel = a1.top + a1.height / 2 - (d.top + d.height / 2); return { rel, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, op: getComputedStyle(l).opacity, travel: l.getAnimations().filter((x) => !x.transitionProperty).length }; }, L);
  const shot = (P, name) => P.page.screenshot({ path: path.join(dir, `${label}-${engine}-${name}.png`), animations: "allow" });
  for (const [tf, css] of [["none", null], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
    const nameS = `GLANCE side · ${tf}`;
    const r = await guard(nameS, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setup(P.page, css); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try {
          await P.page.waitForTimeout(900);
          await shot(P, `side-${tf}-above`); const above = await read(P.page);
          // carry to the change, each frame; pause the travel the frame it appears, then step it about half way
          const hit = await P.page.evaluate(([B, Lens]) => new Promise((ok) => { const b = document.querySelector(B), l = document.querySelector(Lens); let top = Number.parseFloat(b.style.top) || 0, n = 0;
            const tick = () => { const an = l.getAnimations().find((x) => !x.transitionProperty); if (an) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.3; ok({ n, frac: 0.3 }); return; } if (++n > 400) { ok({ n, none: true }); return; } top -= 2; b.style.top = `${top}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), [m.clip.box, L.lens]);
          await P.page.waitForTimeout(80); await shot(P, `side-${tf}-mid`); const mid = await read(P.page);
          await P.page.evaluate((Lens) => { for (const an of document.querySelector(Lens).getAnimations()) if (!an.transitionProperty) an.play(); }, L.lens);
          await P.page.waitForTimeout(500); await shot(P, `side-${tf}-below`); const below = await read(P.page);
          return { above, mid, below, hit };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(nameS, "FAIL", r.line); continue; }
    cell(nameS, "REPORT", `stills ${label}-${engine}-side-${tf}-{above,mid,below}.png · centre against the track ${f(r.above?.rel, 1)} → ${f(r.mid?.rel, 1)} (travel paused at ${r.hit?.none ? "NONE" : r.hit?.frac} of its clock) → ${f(r.below?.rel, 1)} px · pinned edge above ${f(r.above?.pin, 1)}, below ${f(r.below?.pin, 1)} px`);
    const nameE = `GLANCE exit · ${tf}`;
    const x = await guard(nameE, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await setup(P.page, css); await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        await P.page.waitForTimeout(900);
        await P.page.mouse.up();
        const frozen = await P.page.evaluate((Lens) => new Promise((ok) => { const l = document.querySelector(Lens); const t0 = performance.now(); const tick = () => { if (!l.isConnected) { ok(null); return; } if (performance.now() - t0 >= 60) { const an = l.getAnimations(); an.forEach((y) => y.pause()); ok(an.length); return; } requestAnimationFrame(tick); }; requestAnimationFrame(tick); }), L.lens);
        await P.page.waitForTimeout(80); await shot(P, `exit-${tf}-60ms`);
        return { frozen, ...(await read(P.page)) };
      } finally { await P.close(); }
    }, 60000);
    if (x.crashed) { cell(nameE, "FAIL", x.line); continue; }
    cell(nameE, "REPORT", `still ${label}-${engine}-exit-${tf}-60ms.png · ${x.frozen} animations paused 60 ms after the release · opacity ${x.op}, pinned edge ${f(x.pin, 1)} px`);
  }
});
