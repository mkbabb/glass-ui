// P-A4 probe (not a witness): the Radio's faces before and after a programmatic commit, both themes, read as computed
// style (the face fill, the light layer's opacity and fill, the item state), to place E-2's dark zero. One browser, a
// page per cell, closed in finally.   node radioread.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
console.log(`# radioread engine ${E.name} load ${load()}`);
try {
  for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, "radio", { theme });
    try {
      const rd = () => P.page.evaluate(() => [...document.querySelectorAll('[role="radio"]')].map((r, i) => { const f = r.querySelector(".control-bit__face"); const l = r.querySelector("[data-engage-light]"); const cf = getComputedStyle(f), cl = l && getComputedStyle(l); const tgt = r.matches('[role="radio"]:nth-of-type(2)'); return `#${i}${tgt ? "*" : ""} ${r.getAttribute("data-state")} face ${cf.backgroundColor} light op ${cl?.opacity} ${cl?.backgroundColor} ground ${getComputedStyle(document.querySelector("main") ?? document.body).backgroundColor}`; }).join(" | "));
      await sleep(300); console.log(`  ${theme} before · ${await rd()}`);
      await P.page.evaluate(() => window.__e.commit());
      for (const t of [30, 60, 120, 900]) { await sleep(t === 900 ? 780 : 30); console.log(`  ${theme} +${t} · ${await rd()}`); }
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
