#!/usr/bin/env node
// capture.mjs · R-D owner-glance captures (REGISTRY §2.5, §3.3 item 5): the trio (Slider, Switch, Accordion trigger) and
// the passive atoms (Separator, Skeleton), per state, light and dark, in one engine. Element-region screenshots of the
// scene (padded), plus the slider's held state at full viewport (the veil is teleported to <body>).
// Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node capture.mjs <build dir> <label> <out dir> [chromium|webkit]
import fs from "node:fs"; import path from "node:path";
const H = new URL("../../harness/", import.meta.url).pathname;
const L = await import(`${H}lib.mjs`);
const [build, label, outDir, engine = "chromium"] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
await L.acquireLock();
const T = await L.serveTarget({ build }); const E = new L.Engine(engine); await E.browser();
console.log(`# capture ${label} · ${engine} ${E.version} · ${L.browserCensus()} · load ${L.load()} at start`);
const PAD = 28;
async function shot(P, name, full = false) {
  const file = path.join(outDir, `${label}-${engine}-${name}.png`);
  if (full) await P.page.screenshot({ path: file });
  else {
    const b = await P.page.evaluate(() => { const r = document.querySelector("[data-scene]").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const x = Math.max(0, b.x - PAD), y = Math.max(0, b.y - PAD);
    await P.page.screenshot({ path: file, clip: { x, y, width: Math.min(700 - x, b.w + 2 * PAD), height: Math.min(500 - y, b.h + 2 * PAD) } });
  }
  console.log(`  ${path.basename(file)} · load ${L.load()}`);
}
const tryDo = async (what, fn) => { try { await fn(); } catch (e) { console.log(`  ${what}: ${L.isClosed(e) ? "ENGINE CLOSED" : "ERROR"} ${String(e.message ?? e).split("\n")[0]} · load ${L.load()}`); await E.kill(); } };
for (const theme of ["light", "dark"]) {
  for (const [scene, sel, commit] of [["switch", '[data-e~="target"]', true], ["accordion", '[data-e~="target"]', true]]) {
    await tryDo(`${theme} ${scene}`, async () => {
      const P = await L.openPage(E, T, scene, { theme });
      try {
        await shot(P, `${theme}-${scene}-1rest`);
        const c = await L.center(P.page, sel);
        await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(250); await shot(P, `${theme}-${scene}-2hover`);
        await P.page.mouse.down(); await P.page.waitForTimeout(200); await shot(P, `${theme}-${scene}-3pressed`);
        await P.page.mouse.up(); await P.page.waitForTimeout(70); await shot(P, `${theme}-${scene}-4commit-swell`);
        await P.page.mouse.move(5, 5); await P.page.waitForTimeout(900); await shot(P, `${theme}-${scene}-5committed`);
      } finally { await P.close(); }
    });
  }
  await tryDo(`${theme} slider`, async () => {
    const P = await L.openPage(E, T, "slider", { theme });
    try {
      await shot(P, `${theme}-slider-1rest`);
      const c = await L.center(P.page, '[data-e~="thumb"]');
      await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
      await shot(P, `${theme}-slider-2held`); await shot(P, `${theme}-slider-2held-viewport`, true);
      await P.page.mouse.up(); await P.page.mouse.move(5, 5); await P.page.waitForTimeout(900); await shot(P, `${theme}-slider-3released`);
      await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(L.tabKey(engine)); await P.page.waitForTimeout(600); await shot(P, `${theme}-slider-4keyboard-focused`);
    } finally { await P.close(); }
  });
  await tryDo(`${theme} passive`, async () => {
    const P = await L.openPage(E, T, "passive", { theme });
    try { await shot(P, `${theme}-passive-1rest`); const c = await L.center(P.page, '[data-t="skel"]'); await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(300); await shot(P, `${theme}-passive-2pointer-over`); } finally { await P.close(); }
  });
}
console.log(`# load ${L.load()} at end`); await E.close(); process.exit(0);
