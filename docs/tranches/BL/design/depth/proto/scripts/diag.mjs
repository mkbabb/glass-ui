// Which part of the dark arm crashes Playwright WebKit: one load per process.
import { webkit } from "playwright";
const [url, scheme = "light", mask = ""] = process.argv.slice(2);
const b = await webkit.launch();
try {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const p = await c.newPage();
  if (mask) await p.route(/demo\.css/, async (r) => { const resp = await r.fetch(); let body = await resp.text(); body = body.replace(/@import[^;]*depth[^;]*;/g, ""); if (mask === "nodepth") body = body.replaceAll(".depth", ".xdepth").replaceAll("[data-depth", "[data-xdepth"); await r.fulfill({ response: resp, body }); });
  try { await p.goto(url, { waitUntil: "load" }); await p.waitForTimeout(2500); console.log("OK", url, scheme, mask); }
  catch (e) { console.log("CRASH", url, scheme, mask, String(e).split("\n")[0]); }
  await c.close();
} finally { await b.close(); }
