// H4 exploration (not a witness): what the new scenes render, before E-12 is written.
//   node explore.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const log = (...x) => console.log(...x, `· load ${load()}`);
try {
  for (const coarse of [false, true]) {
    const P = await openPage(E, T, "docktrig", { coarse });
    try {
      const rd = () => P.page.evaluate(() => [...document.querySelectorAll('[data-t^="dt-"]')].map((e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e, "::after"); return `${e.dataset.t} ${e.className.slice(0, 80)} face ${r.width.toFixed(1)}x${r.height.toFixed(1)} after ${s.content} ${s.display} ${s.width}x${s.height} pe ${s.pointerEvents}`; }));
      log(`docktrig coarse=${coarse} fc=off`, JSON.stringify(await rd()), `unrendered ${await P.page.evaluate(() => document.querySelectorAll('[data-t="unrendered"]').length)}`);
      await P.page.emulateMedia({ forcedColors: "active" }); await P.page.waitForTimeout(200);
      log(`docktrig coarse=${coarse} fc=on`, JSON.stringify(await rd()));
    } finally { await P.close(); }
  }
  for (const sc of ["restloop", "passive", "gallery"]) {
    const P = await openPage(E, T, sc);
    try {
      await P.page.waitForTimeout(800);
      log(sc, JSON.stringify(await P.page.evaluate(() => document.querySelector("main").getAnimations({ subtree: true }).filter((x) => x.playState === "running").map((x) => `${x.effect?.target?.className?.baseVal ?? x.effect?.target?.className}`.slice(0, 50) + ` ${x.animationName ?? x.constructor.name} it=${x.effect.getTiming().iterations}`))));
    } finally { await P.close(); }
  }
  for (const sc of ["ambient", "constellation"]) {
    const P = await openPage(E, T, sc);
    try { await P.page.waitForTimeout(400); log(sc, "limit:", await P.page.evaluate(() => window.__e.limit?.())); } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
