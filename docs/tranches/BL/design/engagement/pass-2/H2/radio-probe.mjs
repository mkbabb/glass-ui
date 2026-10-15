#!/usr/bin/env node
// radio-probe.mjs · why E-2's `radio commit·keyboard(ArrowDown)` reads NOT DRIVEN in Chromium at HEAD (4/4 runs) and
// drives in WebKit. Tab in from the sentinel as E-2 does, then one key, and print the focused radio and the model.
//   node radio-probe.mjs --build <dir> [--engine webkit]
import { witness, openPage, tabKey } from "../../harness/lib.mjs";
await witness("RADIO", "probe: what a key does on the focused RadioGroup", async ({ T, E, cell, engine }) => {
  for (const key of ["ArrowDown", "ArrowRight", "Space"]) {
    const P = await openPage(E, T, "radio", { theme: "light" });
    try {
      const read = () => P.page.evaluate(() => ({ state: window.__e.state(), focus: document.activeElement?.getAttribute("value") ?? document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.tagName, checked: [...document.querySelectorAll('[role="radio"]')].map((r) => r.getAttribute("aria-checked")).join(",") }));
      await P.page.focus('[data-sentinel="before"]');
      await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300);
      const a = await read();
      await P.page.keyboard.press(key); await P.page.waitForTimeout(600);
      const z = await read();
      cell(`RADIO ${key}`, "REPORT", `after Tab ${JSON.stringify(a)} · after ${key} ${JSON.stringify(z)}`);
    } finally { await P.close(); }
  }
});
