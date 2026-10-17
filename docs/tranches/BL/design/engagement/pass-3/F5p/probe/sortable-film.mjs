// F5' probe (from pass-2 F5's): the sortable fling's landing, filmed per frame; --all prints every frame from the release. Reads the ghost and the landed row "a" separately
// (their tops in the page frame, opacity), so the hand-off from one to the other is visible.
//   node sortable-film.mjs --build <dir> [--engine chromium]
import { Engine, serveTarget, openPage, parseArgs, center, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget(a);
try {
  const P = await openPage(E, T, "sortable");
  try {
    const c = await center(P.page, '[data-sortable-id="a"] [data-sortable-handle]');
    const film = P.page.evaluate(() => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => {
      const g = document.querySelector(".sortable-ghost"), r = document.querySelector('[data-sortable-id="a"]');
      const rg = g?.getBoundingClientRect(), rr = r?.getBoundingClientRect();
      fr.push({ t: +(performance.now() - t0).toFixed(1), ghost: rg ? +rg.top.toFixed(1) : null, gop: g ? +getComputedStyle(g).opacity : null, row: rr ? +rr.top.toFixed(1) : null, rop: r ? +getComputedStyle(r).opacity : null, rtf: r ? getComputedStyle(r).transform : null, vac: r?.hasAttribute("data-sortable-vacancy") ?? null });
      if (performance.now() - t0 < 2400) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); }));
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x, c.y + 40 * k); await P.page.waitForTimeout(16); }
    const tRel = await P.page.evaluate(() => performance.now()); await P.page.mouse.up();
    const fr = await film; let prev = null; const t0r = tRel - (await P.page.evaluate(() => 0));
    for (const x of fr) { const body = x.ghost ?? x.row; const step = prev == null || body == null ? 0 : body - prev; prev = body;
      if (a.all || Math.abs(step) > 8 || x === fr[0]) console.log(JSON.stringify({ ...x, step: +step.toFixed(1) })); }
    console.log(`load ${load()}`);
  } finally { await P.close(); }
} finally { await E.close(); T.close(); }
