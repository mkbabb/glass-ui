#!/usr/bin/env node
// P-E13-complete (D5 pass 13, wave c2): the two predicted paints of REGISTRY §P13-5, captured as stills and read in numbers on a built
// candidate. REPORT only (c3's critics grade them). The harness's own scene app and lib, the E-13 `slider` scene (its card is the slider's
// parent, as C-E11's setupPage dresses it): one browser per run, a fresh context per cell, every page and context closed in a finally.
//   lens · none|rotate10    §P13-2 row 2: the held slider's loupe on a card at rest and under `rotate: 10deg`; the lens's painted box over its
//                           layout box per axis, `--lens-sy` and `--lens-sx` as computed; stills <label>-<engine>-lens-<tf>.png
//   carry · still|script    §P13-2 row 1: the card moved by a page loop writing its inline `translate` every frame (a 30 px sine, period
//                           600 ms, the shape of a JS spring or `CarouselContent.vue:65-66`'s inline write), held 1.2 s: the held slider's
//                           centre against the card's centre, per frame, as its offset from the rest offset (0 means it moves with its card);
//                           `still` is the same hold with no loop (the control). Still <label>-<engine>-carry-script.png at +700 ms
//   usage: node paint13.mjs --build <dir> --label <l> --engine chromium|webkit --out <dir> --frames <dir>
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
import fs from "node:fs";
import path from "node:path";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
await witness("E13c paint", "the two predicted paints of REGISTRY §P13-5 on the built candidate, REPORT only", async ({ a, E, T, cell, guard, idx, engine }) => {
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip);
  const TH = m.thumb ?? '[role="slider"]'; const ROOT = m.root ?? ".glass-slider"; const L = m.loupe;
  const label = typeof a.label === "string" ? a.label : "c"; const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const dress = (page, css) => page.evaluate(([root, css]) => { const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "200px"; mn.style.paddingBottom = "1200px"; const card = document.querySelector(root).parentElement; if (css) Object.assign(card.style, css); }, [ROOT, css]);
  const press = async (P) => { const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); };
  for (const [tf, css] of [["none", null], ["rotate10", { rotate: "10deg" }]]) {
    const name = `lens · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await dress(P.page, css); await P.page.waitForTimeout(300); await press(P); await P.page.waitForTimeout(700);
        try {
          const v = await P.page.evaluate(([L]) => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l) return { none: true }; const a = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const cs = getComputedStyle(l); return { bw: a.width, bh: a.height, ow: l.offsetWidth, oh: l.offsetHeight, tw: d.width, th: d.height, sx: cs.getPropertyValue("--lens-sx").trim(), sy: cs.getPropertyValue("--lens-sy").trim(), scale: cs.scale, eng: !!document.querySelector("[data-engaged]") }; }, [L]);
          if (frames) await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-lens-${tf}.png`) });
          return v;
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed || r.none) { cell(name, "REPORT", r.line ?? "NO LOUPE on the hold"); continue; }
    cell(name, "REPORT", `${label} · lens painted ${f(r.bw, 1)} x ${f(r.bh, 1)} px over layout ${r.ow} x ${r.oh} (x${f(r.bw / r.ow, 4)}, y x${f(r.bh / r.oh, 4)}) · track painted ${f(r.tw, 1)} x ${f(r.th, 1)} · --lens-sx "${r.sx}" --lens-sy "${r.sy}" · scale ${r.scale} · engaged ${r.eng}${frames ? ` · still ${label}-${engine}-lens-${tf}.png` : ""}`);
  }
  for (const mode of ["still", "script"]) {
    const name = `carry · ${mode}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        await dress(P.page, null); await P.page.waitForTimeout(300);
        const d0 = await P.page.evaluate((root) => { const s = document.querySelector(root), c = s.parentElement; const a = s.getBoundingClientRect(), b = c.getBoundingClientRect(); return a.top + a.height / 2 - (b.top + b.height / 2); }, ROOT);
        if (mode === "script") await P.page.evaluate((root) => { const c = document.querySelector(root).parentElement; const t0 = performance.now(); const tick = () => { if (window.__stopCarry) return; c.style.translate = `0 ${(30 * Math.sin(((performance.now() - t0) / 600) * 2 * Math.PI)).toFixed(2)}px`; requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, ROOT);
        await P.page.waitForTimeout(300); await press(P);
        try {
          const film = P.page.evaluate(([root, d0]) => new Promise((ok) => { const s = document.querySelector(root), c = s.parentElement; const out = []; const ch = new MessageChannel(); const t0 = performance.now();
            ch.port1.onmessage = () => { const a = s.getBoundingClientRect(), b = c.getBoundingClientRect(); out.push({ t: performance.now() - t0, off: a.top + a.height / 2 - (b.top + b.height / 2) - d0, eng: !!document.querySelector("[data-engaged]") }); };
            const tick = () => { ch.port2.postMessage(0); if (performance.now() - t0 < 1200) requestAnimationFrame(tick); else setTimeout(() => ok(out), 30); }; requestAnimationFrame(tick); }), [ROOT, d0]);
          await P.page.waitForTimeout(700); if (frames && mode === "script") await P.page.screenshot({ path: path.join(frames, `${label}-${engine}-carry-script.png`) });
          const out = await film; await P.page.evaluate(() => { window.__stopCarry = true; });
          return { out };
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const S = r.out.filter((x) => x.eng); const offs = S.map((x) => Math.abs(x.off)); const mx = offs.length ? Math.max(...offs) : NaN; const s = [...offs].sort((p, q) => p - q);
    cell(name, "REPORT", `${label} · ${S.length} engaged frames of ${r.out.length} · the held slider's centre off its card's by: max ${f(mx, 2)} px, median ${f(s[s.length >> 1], 2)} px, frames over 2 px ${offs.filter((x) => x > 2).length}${frames && mode === "script" ? ` · still ${label}-${engine}-carry-script.png` : ""}`);
  }
});
