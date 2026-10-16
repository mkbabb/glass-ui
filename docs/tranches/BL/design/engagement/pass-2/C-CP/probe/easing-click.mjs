#!/usr/bin/env node
// easing-click.mjs · C-CP: does an unreadable easing token on the Button break its click? (CK-21 follow-up)
// The plant: `--ease-standard: nonsense` on the Button; one click; read the scene's click count (__e.state()) and errors.
//   node easing-click.mjs --build <dir> --label <l> --engine chromium|webkit
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs } from "../../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
await acquireLock(); const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
try {
  for (const plant of [false, true]) {
    const P = await openPage(E, T, "button", { theme: "light" });
    await P.page.waitForTimeout(300);
    if (plant) await P.page.evaluate(() => document.querySelector(".button").style.setProperty("--ease-standard", "nonsense"));
    const c0 = await P.page.evaluate(() => window.__e.state());
    await P.page.click(".button"); await P.page.waitForTimeout(300);
    const c1 = await P.page.evaluate(() => window.__e.state());
    const commit = await P.page.evaluate(() => document.querySelector(".button").getAttribute("data-commit"));
    console.log(`  ${a.label} ${engine} ${plant ? "PLANT --ease-standard: nonsense" : "clean"} · clicks ${c0}→${c1} · data-commit ${commit} · errors ${P.errors.length} [${P.errors.join(" | ").slice(0, 160)}] · load ${load()}`);
    await P.close();
  }
} finally { await E.close(); T.close(); }
