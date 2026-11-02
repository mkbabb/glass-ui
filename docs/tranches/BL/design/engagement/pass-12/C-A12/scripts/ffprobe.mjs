#!/usr/bin/env node
// C-A12 Firefox probe (not a witness, no CK cell: Firefox is not an engine of record). The harness serves the build (lib serveTarget) and
// this script drives Playwright Firefox itself, one browser, a fresh context per scene, every page/context/browser closed in a finally.
// Per build: on the loupe row without a clip (the slider), a fine hold of the thumb for 900 ms: console errors raised, the host's inline
// --stage-reach and data-engaged, its painted inline grow (engaged width over rest width), whether a lens shows; then released. Also the
// E-11 travel drive's side change is not driven here. Read beside the same drive in Chromium for the same build.
//   node ffprobe.mjs --build <dir> [--engine firefox|chromium]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { pw, serveTarget, INIT, parseArgs, center } = await import(`${H}/lib.mjs`);
const a = parseArgs(); const engine = a.engine ?? "firefox";
const T = await serveTarget(a);
const b = await pw[engine].launch({ headless: true });
try {
  const idxCtx = await b.newContext(); const ip = await idxCtx.newPage();
  let idx; try { await ip.addInitScript(INIT); await ip.goto(`${T.url}?scene=__index`); await ip.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 }); idx = await ip.evaluate(() => window.__e.index); } finally { await ip.close(); await idxCtx.close(); }
  const rows = Object.entries(idx).filter(([s, m]) => s !== "__index" && (m.gates ?? []).includes("E-10") && m.loupe && !m.clip);
  console.log(`# ${engine} ${b.version()} · build ${a.build} · scenes ${rows.map(([s]) => s).join(",")}`);
  for (const [sc, m] of rows.slice(0, 1)) {
    const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1 }); const page = await ctx.newPage();
    const errors = []; page.on("console", (x) => { if (x.type() === "error") errors.push(x.text().slice(0, 160)); }); page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message ?? e).slice(0, 160)}`));
    try {
      await page.addInitScript(INIT); await page.goto(`${T.url}?scene=${sc}`); await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 }); await page.waitForTimeout(300);
      const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[data-e~="thumb"]';
      const rest = await page.evaluate((R) => document.querySelector(R).getBoundingClientRect().width, R); const e0 = errors.length;
      const c = await center(page, TH); await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(900);
      const held = await page.evaluate((R) => { const r = document.querySelector(R); const lens = r.querySelector(":scope > [data-engage-lens]"); return { w: r.getBoundingClientRect().width, engaged: r.hasAttribute("data-engaged"), reach: r.style.getPropertyValue("--stage-reach"), inline: r.getAttribute("style"), lens: lens ? +getComputedStyle(lens).opacity : null }; }, R);
      await page.mouse.up(); await page.waitForTimeout(400);
      console.log(`slider hold · ${sc} · data-engaged ${held.engaged} · inline --stage-reach ${JSON.stringify(held.reach)} · painted inline grow x${(held.w / rest).toFixed(4)} (rest ${rest.toFixed(1)} px) · lens opacity ${held.lens} · console errors during the hold ${errors.length - e0}, on the page ${errors.length}`);
      for (const e of [...new Set(errors)].slice(0, 12)) console.log(`  error: ${e}`);
    } finally { await page.close(); await ctx.close(); }
  }
} finally { await b.close(); T.close?.(); }
process.exit(0);
