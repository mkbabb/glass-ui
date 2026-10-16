// diag.mjs · D2-B′ pass 4: one swap (or morph) strip, printed per frame: the plate's edges, each painting seat's
// box|painted span and glyph advance (lib.mjs startLog `seats`, `ink`, `lanes`), and the frame's lane cancels.
//   node diag.mjs --engine chromium --build <dir> --adapter <a> --scene swap|morph [--two 1] [--pre <js>] --go <js>
// --two 1 opens the two-face swap scene W3's swap-long/short use; without it, `swap&three=1` (W3's retarget cells).
import { parseArgs, openTarget, launch, openScene, startLog, stopLog, waitRest } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const browser = await launch(args.engine ?? "chromium");
const scene = args.scene ?? "swap";
try {
  const s = await openScene(browser, target, scene, { query: scene === "swap" && !args.two ? { three: "1" } : {} });
  if (args.pre) { await s.page.evaluate(args.pre); await waitRest(s.page, { quiet: 400 }); }
  await s.page.evaluate(() => { globalThis.__bpTrace = []; });
  await startLog(s.page, { seats: true, ink: true, lanes: true });
  await s.page.evaluate(args.go);
  await s.page.waitForTimeout(700);
  const L = await stopLog(s.page);
  const fr = L.frames ?? L; const t0 = fr[0].t;
  const labels = await s.page.evaluate(() => window.__dockProbe.seats({ all: true }).map((e) => (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 8)));
  console.log("seats", labels.join(","));
  for (const r of (await s.page.evaluate(() => globalThis.__cl ?? []))) console.log("CL", JSON.stringify(r));
  console.log("TRACE", JSON.stringify(await s.page.evaluate(() => globalThis.__bpTrace)));
  for (const x of fr.slice(0, 40)) console.log((x.t - t0).toFixed(0), x.m ? "M" : " ", "plate", x.e.map((v) => v.toFixed(0)).join(","), (x.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.5).map((q) => `s${q[0]}:${q[1].toFixed(0)}-${q[3].toFixed(0)}|${q[5].toFixed(1)}-${q[7].toFixed(1)}a${(q[10]??0).toFixed(1)}`).join(" "), "K", (x.k ?? []).filter((k) => k.length >= 11 && k[4] > 0.05 && k[2] - k[0] > 0.5).map((k) => `${k[6].toFixed(0)}-${k[8].toFixed(0)}|${k[0].toFixed(1)}-${k[2].toFixed(1)}a${k[10].toFixed(1)}`).join(" "), "LC", JSON.stringify(x.lc ?? ""));
} finally { await browser.close(); await target.close(); }
