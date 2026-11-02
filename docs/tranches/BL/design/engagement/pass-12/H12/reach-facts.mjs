#!/usr/bin/env node
// H12 reach facts (REPORT only): what the library's stage writes for the reach under a card zoom, beside what the page paints. The same
// setup as E-10's `reach` cell (390 × 700, the card on C, the root cleared 6 painted px inside the gutter and centred), a fine hold,
// +1100 ms, then on the root: currentCSSZoom (root, C), offsetWidth against the painted width, and the stage's custom properties as the
// root's computed style carries them (every `--stage-*`). Written for the pass-11 candidate's WebKit-only reach read (H12.md §3).
//   node reach-facts.mjs --build <dir> [--engine webkit]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
const TF = { none: null, zoom08: { zoom: "0.8" }, zoom125: { zoom: "1.25" }, zoom2: { zoom: "2" }, scale: { scale: "0.8", transformOrigin: "0 0" } };
await witness("H12 reach facts", "the stage's reach terms under a card zoom", async ({ E, T, cell, guard, idx }) => {
  const [sc, m] = scenesFor(idx, "E-10").find(([, x]) => x.loupe && !x.clip); const R = m.root ?? '[data-e~="root"]', thumb = m.thumb ?? '[data-e~="thumb"]';
  for (const tf of Object.keys(TF)) {
    const name = `reach facts · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { vp: { width: 390, height: 700 } });
      try {
        await P.page.evaluate(([R, css]) => { const root = document.querySelector(R), C = root.parentElement; const mn = document.querySelector("main") ?? document.body; mn.style.paddingTop = "200px"; document.documentElement.style.overflowAnchor = "none"; if (css) Object.assign(C.style, css);
          const pr = document.createElement("div"); pr.style.cssText = "position:absolute;height:1px;width:var(--space-section)"; C.appendChild(pr); const gP = pr.getBoundingClientRect().width; pr.remove();
          const vw = innerWidth; root.style.boxSizing = "border-box"; root.style.position = "relative"; root.style.left = "0px"; let k = root.getBoundingClientRect().width / root.offsetWidth; root.style.width = `${(vw - 2 * (gP + 6)) / k}px`;
          for (let i = 0; i < 3; i++) { const q = root.getBoundingClientRect(); k = q.width / root.offsetWidth; root.style.left = `${Number.parseFloat(root.style.left) + (vw / 2 - (q.left + q.width / 2)) / k}px`; } }, [R, TF[tf]]);
        await P.page.waitForTimeout(250);
        const c = await center(P.page, thumb); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        try {
          await P.page.waitForTimeout(1100);
          return await P.page.evaluate((R) => { const root = document.querySelector(R), C = root.parentElement; const q = root.getBoundingClientRect(); const cs = getComputedStyle(root); const st = {};
            for (const el of [root, C]) for (let i = 0; i < el.style.length; i++) { const p = el.style[i]; if (p.startsWith("--stage")) st[`${el === root ? "root" : "C"}${p}`] = el.style.getPropertyValue(p).trim(); }
            for (const p of ["--stage-room", "--stage-w", "--stage-reach", "--stage-x", "--stage-f"]) { const v = cs.getPropertyValue(p).trim(); if (v) st[`computed${p}`] = v; }
            return { zr: root.currentCSSZoom, zc: C.currentCSSZoom, ow: root.offsetWidth, pw: q.width, pl: q.left, pr: innerWidth - q.right, st, scale: cs.scale, transform: cs.transform.slice(0, 60) }; }, R);
        } finally { await P.page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : `currentCSSZoom root ${r.zr} C ${r.zc} · offsetWidth ${r.ow} painted ${f(r.pw, 1)} (left ${f(r.pl, 1)}, right ${f(r.pr, 1)}) · scale ${r.scale} · ${Object.entries(r.st).map(([k, v]) => `${k}=${v}`).join(" ") || "no --stage-* on the root or C"}`);
  }
});
