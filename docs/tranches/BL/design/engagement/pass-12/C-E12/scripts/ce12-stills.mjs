#!/usr/bin/env node
// C-E12 owner-glance stills (REPORT, grade nothing): the library's own Dialog (presented scene, a Slider in the plate), the slider
// keyboard-engaged; still 1 before a 40 px block is inserted above the slider inside the plate; still 2 the mutation's frame with every
// running animation on the slider's root paused at its start (the glide's first painted frame). And the same pair for a card under
// `rotate: 10deg` (origin 0 0) with the block inserted before the card. Each still prints the root's painted centre. One browser, a
// context per still pair, closed in a finally (the harness lib's witness).
//   node ce12-stills.mjs --build <dir> --label <l> --frames <dir> [--engine webkit]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
const { witness, openPage, center, f } = await import(`${H}/lib.mjs`);
await witness("C-E12 stills", "the host glide's first frame in the library's Dialog and under a rotated card, a still pair each", async ({ a, E, T, cell, guard, idx, engine }) => {
  const dir = a.frames; fs.mkdirSync(dir, { recursive: true }); const label = a.label ?? "c";
  const pause = (R) => new Promise((ok) => requestAnimationFrame(() => { for (const x of document.querySelector(R).getAnimations()) { x.pause(); x.currentTime = 0; } const q = document.querySelector(R).getBoundingClientRect(); ok({ x: q.left + q.width / 2, y: q.top + q.height / 2 }); }));
  const at = (R) => { const q = document.querySelector(R).getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; };
  for (const [sc, m] of Object.entries(idx).filter(([, x]) => x.dlg)) {
    const D = m.dlg; const name = `CE12 still · dialog · insert above`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { q: D.q ?? {} });
      try { const { page } = P;
        await page.focus(D.from); await page.keyboard.press(engine === "webkit" ? "Alt+Tab" : "Tab"); await page.waitForTimeout(800);
        const p0 = await page.evaluate(at, D.root); await page.screenshot({ path: `${dir}/${label}-${engine}-dialog-before.png` });
        await page.evaluate((R) => { const b = document.createElement("div"); b.style.height = "40px"; document.querySelector(R).closest('[data-t="dlg-slider"]').before(b); }, D.root);
        const p1 = await page.evaluate(pause, D.root); await page.screenshot({ path: `${dir}/${label}-${engine}-dialog-mutation.png` });
        return { p0, p1 };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `root centre before ${f(r.p0.x, 1)}, ${f(r.p0.y, 1)} · on the mutation's frame (glide paused at 0) ${f(r.p1.x, 1)}, ${f(r.p1.y, 1)} · off ${f(Math.hypot(r.p1.x - r.p0.x, r.p1.y - r.p0.y), 2)} px · ${label}-${engine}-dialog-{before,mutation}.png`);
    break;
  }
  for (const [sc, m] of Object.entries(idx).filter(([s, x]) => s !== "__index" && x.loupe && !x.clip).slice(0, 1)) {
    const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]'; const name = `CE12 still · rotate 10deg · outside`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try { const { page } = P;
        await page.evaluate((R) => { const root = document.querySelector(R), C = root.parentElement; document.documentElement.style.overflowAnchor = "none"; const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "230px"; mn.style.paddingBottom = "1600px"; C.style.rotate = "10deg"; C.style.transformOrigin = "0 0"; const b = root.getBoundingClientRect(); scrollBy(0, b.top + b.height / 2 - innerHeight / 2 + 60); }, R);
        await page.waitForTimeout(250); const k = await center(page, thumb); await page.mouse.move(k.x, k.y); await page.mouse.down();
        try { await page.waitForTimeout(900);
          const p0 = await page.evaluate(at, R); await page.screenshot({ path: `${dir}/${label}-${engine}-rotate10-before.png` });
          await page.evaluate((R) => { const C = document.querySelector(R).parentElement; const b = document.createElement("div"); b.style.height = "40px"; C.parentElement.insertBefore(b, C); }, R);
          const p1 = await page.evaluate(pause, R); await page.screenshot({ path: `${dir}/${label}-${engine}-rotate10-mutation.png` });
          return { p0, p1 };
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `root centre before ${f(r.p0.x, 1)}, ${f(r.p0.y, 1)} · on the mutation's frame (glide paused at 0) ${f(r.p1.x, 1)}, ${f(r.p1.y, 1)} · moved ${f(r.p1.x - r.p0.x, 2)}, ${f(r.p1.y - r.p0.y, 2)} px (the block moves the card 40 px down, so a glide from where it was painted reads 0, 0) · ${label}-${engine}-rotate10-{before,mutation}.png`);
  }
});
