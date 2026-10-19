// diag.mjs · D2-G pass 5 (B′ pass-5 probes/diag5.mjs, unchanged but for this line): one strip printed per frame (after pass-4 probes/diag.mjs): the plate's main edges, the
// flag, and per painting seat its label, box, painted span, opacity and own ink (opacity × painted share of its box),
// plus H5-3's stubs (startLog glyphs). One browser, one context, closed in finally.
//   node diag5.mjs --engine chromium|webkit --build <dir> --adapter <a> [--scene swap] [--three 1] [--pre <js>] [--hover 1: expand by hover first] --go <js> [--ms 700] [--n 40]
import { parseArgs, openTarget, launch, openScene, startLog, stopLog, waitRest } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const browser = await launch(args.engine ?? "chromium");
const scene = args.scene ?? "swap";
try {
  const query = scene === "swap" && args.three !== "0" ? { three: "1" } : {};
  if (args.query) Object.assign(query, JSON.parse(args.query));
  const s = await openScene(browser, target, scene, { query });
  try {
    if (args.pre) { await s.page.evaluate(args.pre); await waitRest(s.page, { quiet: 400 }); }
    if (args.hover) { const c = await s.page.evaluate(() => { const r = window.__dockProbe.root().getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); await s.page.mouse.move(c.x, c.y, { steps: 3 }); await waitRest(s.page, { quiet: 400 }); }
    await startLog(s.page, { seats: true, ink: true, lanes: true, glyphs: true });
    await s.page.waitForTimeout(60);
    if (args.mouse) { const c = await s.page.evaluate(() => { const r = window.__dockProbe.root().getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); await s.page.mouse.move(c.x, c.y, { steps: 3 }); }
    else await s.page.evaluate(args.go);
    await s.page.waitForTimeout(+(args.ms ?? 700));
    const L = await stopLog(s.page);
    const fr = L.frames ?? L; const t0 = fr[0].t;
    const labels = await s.page.evaluate(() => { const m = {}; let i = 0; return window.__dockProbe.seats({ all: true }).map((e) => (e.getAttribute("aria-label") || e.textContent).trim().slice(0, 8)); });
    console.log("load", (await import("node:os")).loadavg()[0].toFixed(2), "seats(dom order)", labels.join(","));
    const area = (l, t, r, b) => Math.max(0, r - l) * Math.max(0, b - t);
    for (const x of fr.slice(0, +(args.n ?? 40))) {
      const segs = (x.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.5).map((q) => {
        const bb = area(q[1], q[2], q[3], q[4]); const ink = bb < 1 ? 0 : q[9] * area(Math.max(q[5], x.e[0]), Math.max(q[6], x.e[1]), Math.min(q[7], x.e[2]), Math.min(q[8], x.e[3])) / bb;
        return `s${q[0]}:${q[1].toFixed(0)}-${q[3].toFixed(0)}|${q[5].toFixed(1)}-${q[7].toFixed(1)}o${q[9].toFixed(2)}i${ink.toFixed(2)}`;
      });
      console.log((x.t - t0).toFixed(0).padStart(4), x.m ? "M" : " ", "plate", x.e[0].toFixed(1), x.e[2].toFixed(1), segs.join(" "), x.st ? "STUB " + JSON.stringify(x.st) : "", x.lc ? "LC " + JSON.stringify(x.lc) + " LN " + JSON.stringify(x.ln) : "");
    }
  } finally { await s.close(); }
} finally { await browser.close(); await target.close?.(); }
