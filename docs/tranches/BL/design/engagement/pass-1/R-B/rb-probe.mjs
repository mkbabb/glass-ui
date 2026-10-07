#!/usr/bin/env node
// R-B probe · D5 pass 1, family B (one engage primitive). Four reads the battery does not make, on any build of the
// harness scene app (../../harness/build.mjs):
//   census    Q-1 in census form: each exemplar scene mounted with globalThis.__glassEngageCensus defined; one row per
//             component directory that mounts the primitive (its parts, or its exemption reason)
//   commits   the commit edge counted per commit (a `data-commit` attribute added to the host), per path: keyboard,
//             programmatic, pointer; a model written A→B→A in one task; the mount cases: the model changed in the same
//             task as the mount (before the first paint) and two frames after it (the async-arrival case)
//   veil      the modal's veil: computed opacity while the dialog is open (the E-7 split must keep its paint)
//   captures  owner-glance PNGs per engine and theme: the trio at rest, pressed, held, committed mid-flight, released
//             mid-carry, plus one contact sheet per engine and theme
//   node rb-probe.mjs --build <dir> [--engine webkit] [--label rb] [--shots <dir>] [--only census,commits,veil,captures]
import fs from "node:fs";
import path from "node:path";
import { witness, INIT, center, f } from "../../harness/lib.mjs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => (x.startsWith("--") ? [...acc, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const only = typeof a.only === "string" ? a.only.split(",") : ["census", "commits", "veil", "captures"];
const label = typeof a.label === "string" ? a.label : "rb";
const shots = typeof a.shots === "string" ? a.shots : null;

async function open(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({ viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: o.dpr ?? 1, reducedMotion: o.prm ? "reduce" : "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light" });
  const page = await ctx.newPage();
  await page.addInitScript(INIT);
  await page.addInitScript(() => {
    globalThis.__glassEngageCensus = new Map();
    // every data-commit edge added to any element, with its time
    window.__commits = [];
    new MutationObserver((rs) => { for (const r of rs) if (r.attributeName === "data-commit" && r.target.hasAttribute("data-commit") && r.oldValue === null) window.__commits.push({ t: performance.now(), on: r.target.getAttribute("data-slot") ?? r.target.tagName }); })
      .observe(document, { attributes: true, attributeFilter: ["data-commit"], attributeOldValue: true, subtree: true });
  });
  const q = new URLSearchParams({ scene, theme: o.theme ?? "light", ...(o.q ?? {}) });
  await page.goto(`${T.url}?${q}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  return { page, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]) };
}
const n = (P) => P.page.evaluate(() => window.__commits.length);
const settle = (P, ms = 700) => P.page.waitForTimeout(ms);

await witness("R-B", `family B probe (${label})`, async ({ E, T, cell, guard, engine }) => {
  if (only.includes("census")) {
    const rows = {};
    for (const sc of ["switch", "accordion", "slider", "passive", "modal"]) {
      const r = await guard(`census ${sc}`, async () => { const P = await open(E, T, sc); try { return await P.page.evaluate(() => Object.fromEntries(globalThis.__glassEngageCensus)); } finally { await P.close(); } });
      Object.assign(rows, r);
    }
    const dirs = ["switch", "accordion", "slider", "separator", "skeleton", "dialog"];
    for (const d of dirs) {
      const r = rows[d];
      cell(`census ${d}`, r ? (r.exempt ? (r.exempt.trim() ? "PASS" : "FAIL") : r.parts.length ? "PASS" : "FAIL") : "FAIL", r ? (r.exempt ? `exempt: "${r.exempt}"` : `parts [${r.parts.join(", ")}]`) : "no row: the directory mounted no engage primitive on its exemplar");
    }
  }
  if (only.includes("commits")) {
    for (const [sc, sel, key] of [["switch", '[role="switch"]', "Space"], ["accordion", ".disclosure-trigger", "Enter"]]) {
      const r = await guard(`commits ${sc}`, async () => {
        const out = {};
        let P = await open(E, T, sc);
        try {
          await P.page.focus(sel); await P.page.keyboard.press(key); await settle(P); out.keyboard = await n(P);
          await P.page.evaluate(() => window.__e.commit()); await settle(P); out.programmatic = (await n(P)) - out.keyboard;
          const before = await n(P);
          await P.page.evaluate(() => { window.__e.commit(); window.__e.commit(); }); await settle(P); out.flipflop = (await n(P)) - before;
          const b2 = await n(P);
          if (!(engine === "webkit" && sc === "accordion")) { const c = await center(P.page, sel); await P.page.mouse.click(c.x, c.y); await settle(P); out.pointer = (await n(P)) - b2; }
          else out.pointer = "not driven (PF-1: WebKit closes the page on pointer entry over the trigger)";
        } finally { await P.close(); }
        P = await open(E, T, sc, { q: { defer: "1" } });
        try { out.mountSameTask = await P.page.evaluate(async () => { await window.__e.mount(); window.__e.commit(); await new Promise((r) => setTimeout(r, 700)); return window.__commits.length; }); } finally { await P.close(); }
        P = await open(E, T, sc, { q: { defer: "1" } });
        try { out.mountTwoFrames = await P.page.evaluate(async () => { await window.__e.mount(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); window.__e.commit(); await new Promise((r) => setTimeout(r, 700)); return window.__commits.length; }); } finally { await P.close(); }
        return out;
      });
      if (r.crashed) { cell(`commits ${sc}`, "FAIL", r.line); continue; }
      const ok = r.keyboard === 1 && r.programmatic === 1 && r.flipflop === 0 && (typeof r.pointer !== "number" || r.pointer === 1) && r.mountSameTask === 0;
      cell(`commits ${sc}`, ok ? "PASS" : "FAIL", `edges per commit: keyboard ${r.keyboard}, programmatic ${r.programmatic}, pointer ${r.pointer}, model A→B→A in one task ${r.flipflop} · mount then commit in the same task ${r.mountSameTask} · commit two frames after mount ${r.mountTwoFrames} (REPORT: the async-arrival case)`);
    }
  }
  if (only.includes("veil")) {
    const r = await guard("veil", async () => { const P = await open(E, T, "modal"); try { await settle(P, 600); return await P.page.evaluate(() => { const v = document.querySelector(".glass-focus-veil"); return v ? { op: getComputedStyle(v).opacity, eng: v.hasAttribute("data-engaged"), parent: v.parentElement?.getAttribute("data-state") } : null; }); } finally { await P.close(); } });
    cell("veil modal open", r && +r.op > 0.99 ? "PASS" : "FAIL", r ? `opacity ${r.op} · data-engaged ${r.eng} · overlay data-state ${r.parent}` : "no veil");
  }
  if (only.includes("captures") && shots) {
    fs.mkdirSync(shots, { recursive: true });
    for (const theme of ["light", "dark"]) {
      const made = [];
      const shot = async (P, name, sel, pad = 28) => {
        const bx = sel ? await P.page.locator(sel).first().boundingBox() : null;
        const clip = bx ? { x: Math.max(0, bx.x - pad), y: Math.max(0, bx.y - pad), width: bx.width + 2 * pad, height: bx.height + 2 * pad } : undefined;
        const file = path.join(shots, `${engine}-${theme}-${name}.png`);
        await P.page.screenshot({ path: file, clip }); made.push([name, file]);
      };
      const trio = [
        ["switch", '[role="switch"]', "Space"],
        ["accordion", ".disclosure-trigger", "Enter"],
      ];
      for (const [sc, sel, key] of trio) {
        await guard(`captures ${sc} ${theme}`, async () => {
          let P = await open(E, T, sc, { theme, dpr: 2 });
          try {
            await shot(P, `${sc}-1-rest`, sel);
            const c = await center(P.page, sel);
            if (engine === "webkit" && sc === "accordion") { await P.page.focus(sel); await P.page.keyboard.down("Space"); }
            else { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); }
            await P.page.waitForTimeout(260); await shot(P, `${sc}-2-pressed`, sel);
            if (engine === "webkit" && sc === "accordion") await P.page.keyboard.up("Space"); else await P.page.mouse.up();
            await P.page.waitForTimeout(500); await shot(P, `${sc}-4-committed`, sel);
          } finally { await P.close(); }
          // the commit mid-flight, programmatic (the peak of the impulse sits near 70 ms on the panel row)
          P = await open(E, T, sc, { theme, dpr: 2 });
          try { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(60); await shot(P, `${sc}-3-commit-peak`, sel); } finally { await P.close(); }
        });
      }
      await guard(`captures slider ${theme}`, async () => {
        let P = await open(E, T, "slider", { theme, dpr: 2 });
        try {
          await shot(P, "slider-1-rest", ".glass-slider");
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
          await shot(P, "slider-2-held", null);
          for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
          await P.page.mouse.up(); await P.page.waitForTimeout(40);
          await shot(P, "slider-3-release-carry", ".glass-slider");
          await P.page.waitForTimeout(800); await shot(P, "slider-4-settled", ".glass-slider");
        } finally { await P.close(); }
      });
      // the contact sheet: every capture of this engine and theme on one page
      const b = await E.browser(); const ctx = await b.newContext({ viewport: { width: 1200, height: 900 }, colorScheme: theme });
      const pg = await ctx.newPage();
      const cells = made.map(([nm, file]) => `<figure><img src="data:image/png;base64,${fs.readFileSync(file).toString("base64")}"><figcaption>${nm}</figcaption></figure>`).join("");
      await pg.setContent(`<style>body{margin:16px;font:12px system-ui;background:${theme === "dark" ? "#111" : "#f4f4f4"};color:${theme === "dark" ? "#ddd" : "#222"}}main{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}figure{margin:0}img{max-width:100%;display:block;border:1px solid #8884}h1{font-size:14px}</style><h1>R-B (family B) · ${label} · ${engine}${engine === "webkit" ? " (Playwright WebKit, not Safari)" : ""} · ${theme}</h1><main>${cells}</main>`);
      await pg.screenshot({ path: path.join(shots, `sheet-${engine}-${theme}.png`), fullPage: true });
      await ctx.close();
      cell(`captures ${theme}`, "REPORT", `${made.length} PNGs + sheet-${engine}-${theme}.png in ${shots}`);
    }
  }
});
