// census.mjs <tree> <w> <names...>: per audit page, the buttons and slots, to write the specs.
import { withBrowser, cell, gotoComp, saveJson } from "./lib.mjs";
const [tree, w, ...names] = process.argv.slice(2);
const out = {};
await withBrowser("chromium", async (b) => {
  for (const n of names) await cell(b, "chromium", { w: +w, h: 900, touch: +w < 600 }, async (P) => {
    try { await gotoComp(P, tree, n); } catch (e) { out[n] = { error: String(e) }; return; }
    out[n] = await P.page.evaluate(() => ({
      buttons: [...document.querySelectorAll("button,[role=button],[data-testid]")].slice(0, 40).map((b) => [b.getAttribute("data-testid"), b.getAttribute("data-slot"), (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 40)].join(" | ")),
    }));
  });
});
console.log(JSON.stringify(out, null, 1));
