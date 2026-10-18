// H4 probe (not a witness): E-1's `rest (ambient)` move read, verbatim in method, on the two ambient scenes, so the
// constellation scene's claim ("paints a pointer move in a headless engine") is a measurement. Light; normal and PRM.
//   node ambient-probe.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, center, load, f } from "../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
console.log(`# ambient-probe ${E.name} · load ${load()} at start`);
try {
  for (const sc of ["ambient", "constellation"]) for (const prm of [false, true]) {
    const Q = await openPage(E, T, sc, { prm });
    try {
      await Q.page.waitForTimeout(600);
      const limit = await Q.page.evaluate(() => window.__e.limit?.() ?? null);
      const sub = await Q.page.evaluate(() => document.querySelector("[data-aurora-substrate]")?.getAttribute("data-aurora-substrate") ?? "-");
      const bx = (await center(Q.page, '[data-e~="target"]')).bx; const clip = { x: Math.max(0, bx.x), y: Math.max(0, bx.y), width: bx.width, height: bx.height };
      await Q.page.mouse.move(bx.x + bx.width * 0.2, bx.y + bx.height * 0.3); await Q.page.waitForTimeout(250);
      const A = await Q.page.screenshot({ clip }); await Q.page.waitForTimeout(300); const B = await Q.page.screenshot({ clip });
      for (let i = 1; i <= 6; i++) { await Q.page.mouse.move(bx.x + bx.width * (0.2 + 0.1 * i), bx.y + bx.height * (0.3 + 0.07 * i)); await Q.page.waitForTimeout(25); }
      await Q.page.waitForTimeout(150); const C = await Q.page.screenshot({ clip });
      const d = await Q.page.evaluate(async (bufs) => {
        const img = async (b64) => { const i = new Image(); i.src = `data:image/png;base64,${b64}`; await i.decode(); const cv = document.createElement("canvas"); cv.width = i.width; cv.height = i.height; const x = cv.getContext("2d"); x.drawImage(i, 0, 0); return x.getImageData(0, 0, i.width, i.height).data; };
        const [p, q, r] = await Promise.all(bufs.map(img)); const md = (u, v) => { let s = 0; for (let j = 0; j < u.length; j++) if (j % 4 !== 3) s += Math.abs(u[j] - v[j]); return s / (u.length * 0.75); };
        return { drift: md(p, q), move: md(q, r) };
      }, [A, B, C].map((x) => x.toString("base64")));
      const pass = d.move >= 0.5 && d.move >= 2 * d.drift;
      console.log(`  ${limit ? "LIMIT" : pass ? "PAINTS" : "STILL"} ${sc} prm=${prm} · substrate ${sub} · move ${f(d.move, 2)} levels against drift ${f(d.drift, 2)} (E-1 bound ≥ 0.5 and ≥ 2×) · limit ${limit ? limit.slice(0, 120) : "none"} · load ${load()}`);
    } finally { await Q.close(); }
  }
} finally { await E.close(); T.close(); }
