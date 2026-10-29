#!/usr/bin/env node
// H9 exploration (not a witness): why C-E8's in-place `anc rotate · fine|touch` read ×0.79-0.81 in Chromium on the
// in-place probe. Reads, under the card's rotate 3deg, the slider's value and the thumb's painted box before the press,
// during the hold and after the release, for a press at the thumb's bounding-box centre.
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, f } = await import(`${H}/lib.mjs`);
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', THUMB = '[data-t="slider-a"] [role="slider"]', ROOT = '[data-t="slider-a"] .glass-slider';
await witness("H9-explore", "rotate in place: where the press lands", async ({ a, E, T, cell, guard }) => {
  for (const mode of ["fine", "touch"]) for (const rot of ["0deg", "3deg"]) {
    const r = await guard(`${mode} ${rot}`, async () => {
      const P = mode === "fine" ? await openPage(E, T, "clipstale") : await openTouchPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, rot]) => { document.querySelector(B).style.rotate = rot; }, [BOX, rot]);
        await page.evaluate(([B, Q]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + 40); }, [BOX, REST]);
        await page.waitForTimeout(200);
        const rd = () => page.evaluate(([T, R]) => { const t = document.querySelector(T), h = document.querySelector(R); const q = t.getBoundingClientRect(); return { v: t.getAttribute("aria-valuenow"), tx: +(q.left + q.width / 2).toFixed(1), ty: +(q.top + q.height / 2).toFixed(1), eng: h.matches("[data-engaged]"), hit: (() => { const e = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); return e ? (e.getAttribute("role") || e.className || e.tagName).toString().slice(0, 30) : null; })() }; }, [THUMB, ROOT]);
        const r0 = await rd(); const c = await center(page, THUMB); let r1;
        if (mode === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(700); r1 = await rd(); await page.mouse.up(); }
        else { [r1] = await P.holdAt(c.x, c.y, [700], rd); }
        await page.waitForTimeout(800); const r2 = await rd();
        return { c: { x: +c.x.toFixed(1), y: +c.y.toFixed(1) }, r0, r1, r2 };
      } finally { await P.close(); }
    }, 90000);
    cell(`explore ${mode} rotate ${rot}`, "REPORT", JSON.stringify(r));
  }
});
