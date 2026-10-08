#!/usr/bin/env node
// R-E · (reads the stage veil element when one exists, else the host; the first runs read the host's ::backdrop) · films the promoted slider's ::backdrop (opacity, transition) and its scale for 2 s after a pointer hold, per
// engine, on the glance page; then the release. node stage-backdrop-film.mjs --build <out>/glance/<label>
const L = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
const { serveTarget, Engine, openPage, center, load, parseArgs, acquireLock } = await import(L);
const a = parseArgs(); await acquireLock();
const T = await serveTarget({ build: a.build });
const film = (ms) => `(async () => { const e = document.querySelector('[data-g="slider-a"]'); const out = []; const t0 = performance.now();
  for (const t of [0, 100, 200, 300, 450, 700, 1000, 2000].filter((x) => x <= ${ms})) { while (performance.now() - t0 < t) await new Promise((r) => requestAnimationFrame(r));
    const b = getComputedStyle(document.querySelector('.glass-focus-veil') ?? e); out.push(t + 'ms op ' + (+b.opacity).toFixed(2) + ' sc ' + getComputedStyle(e).scale + ' open ' + e.matches(':popover-open')); }
  return out.join(' | ') + ' || backdrop transition: ' + getComputedStyle(document.querySelector('.glass-focus-veil') ?? e).transition.slice(0, 90); })()`;
for (const name of ["chromium", "webkit"]) {
  const E = new Engine(name); await E.browser();
  const P = await openPage(E, T, "glance", { vp: { width: 900, height: 640 } });
  const c = await center(P.page, '[data-g="slider-a"] [role=slider]');
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
  console.log(name, "hold   ", await P.page.evaluate(film(2000)), "· load", load());
  await P.page.mouse.move(c.x + 60, c.y, { steps: 4 });
  await P.page.mouse.up();
  console.log(name, "release", await P.page.evaluate(film(1000)), "· focus-visible", await P.page.evaluate(() => document.activeElement?.matches(":focus-visible") + " on " + document.activeElement?.getAttribute("role")), "· load", load());
  await E.close();
}
T.close();
