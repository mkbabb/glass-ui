// P-A3 probe: what the indicator reads for --tab-indicator-duration (one context, closed in finally).
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
try { const P = await openPage(E, T, "tabs", { theme: "light" });
  try { console.log(await P.page.evaluate(() => { const i = document.querySelector(".segmented-indicator"); const cs = getComputedStyle(i); return JSON.stringify({ tab: cs.getPropertyValue("--tab-indicator-duration"), dock: cs.getPropertyValue("--spring-dock-duration"), td: cs.transitionDuration }); }), "load", load()); } finally { await P.close(); }
} finally { await E.close(); T.close(); }
