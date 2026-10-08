#!/usr/bin/env node
// P-B probe · D5 pass 1, family B's prototype (one engage primitive). The reads the battery does not make, on any
// build of the harness scene app (../../harness/build.mjs, with P-B's fork `scenes/App.vue`):
//   census    Q-1 in census form: each exemplar scene mounted with globalThis.__glassEngageCensus defined; one row per
//             component directory that mounts the primitive (its parts, or its exemption reason)
//   commits   `data-commit` edges counted per commit, per path (keyboard, programmatic, pointer), a model written
//             A→B→A in one task, and the mount cases (model changed in the mount's own task; two frames after it)
//   crest     the commit's crest, peak and trough of the target's transform scale per frame after a programmatic commit,
//             and what the peak is in pixels on that control
//   modality  the keyboard engaged signal on the slider: `data-held` after Tab entry, after a pointer drag (where reka
//             focuses the thumb by script and :focus-visible may match), after a key following that drag, after Tab
//             out. With a look rule injected (`.glass-slider[data-held] { scale: 1.06 }`, the probe's own, not source)
//             to show what an in-place recipe would read from the signal
//   captures  owner-glance PNGs: switch, accordion, button (rest, pressed, crest, committed), slider (rest, held,
//             release-carry, settled), light and dark, one contact sheet per engine and theme
//   node pb-probe.mjs --build <dir> [--engine webkit] [--label pb] [--shots <dir>] [--only census,commits,crest,modality,captures]
import fs from "node:fs";
import path from "node:path";
import { witness, INIT, center, f, tabKey } from "../../harness/lib.mjs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => (x.startsWith("--") ? [...acc, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const only = typeof a.only === "string" ? a.only.split(",") : ["census", "commits", "crest", "modality", "captures"];
const label = typeof a.label === "string" ? a.label : "pb";
const shots = typeof a.shots === "string" ? a.shots : null;

async function open(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({ viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: o.dpr ?? 1, reducedMotion: o.prm ? "reduce" : "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light" });
  const page = await ctx.newPage();
  await page.addInitScript(INIT);
  await page.addInitScript(() => {
    globalThis.__glassEngageCensus = new Map();
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
const TRIO = [["switch", '[role="switch"]', "Space"], ["accordion", ".disclosure-trigger", "Enter"], ["button", ".button", "Space"]];

await witness("P-B", `family B prototype probe (${label})`, async ({ E, T, cell, guard, engine }) => {
  if (only.includes("census")) {
    const rows = {};
    for (const sc of ["switch", "accordion", "slider", "button", "passive", "modal"]) {
      const r = await guard(`census ${sc}`, async () => { const P = await open(E, T, sc); try { return await P.page.evaluate(() => Object.fromEntries(globalThis.__glassEngageCensus)); } finally { await P.close(); } });
      Object.assign(rows, r);
    }
    for (const d of ["switch", "accordion", "slider", "button", "separator", "skeleton", "dialog"]) {
      const r = rows[d];
      cell(`census ${d}`, r ? (r.exempt ? (r.exempt.trim() ? "PASS" : "FAIL") : r.parts.length ? "PASS" : "FAIL") : "FAIL", r ? (r.exempt ? `exempt: "${r.exempt}"` : `parts [${r.parts.join(", ")}]`) : "no row: the directory mounted no engage primitive on its exemplar");
    }
  }
  if (only.includes("commits")) {
    for (const [sc, sel, key] of TRIO) {
      const r = await guard(`commits ${sc}`, async () => {
        const out = {};
        let P = await open(E, T, sc);
        try {
          await P.page.focus(sel); await P.page.keyboard.press(key); await settle(P); out.keyboard = await n(P);
          await P.page.evaluate(() => window.__e.commit()); await settle(P); out.programmatic = (await n(P)) - out.keyboard;
          const before = await n(P);
          await P.page.evaluate(() => { window.__e.commit(); window.__e.commit(); }); await settle(P); out.flipflop = (await n(P)) - before;
          const b2 = await n(P);
          const c = await center(P.page, sel); await P.page.mouse.click(c.x, c.y); await settle(P); out.pointer = (await n(P)) - b2;
        } finally { await P.close(); }
        P = await open(E, T, sc, { q: { defer: "1" } });
        try { out.mountSameTask = await P.page.evaluate(async () => { await window.__e.mount(); window.__e.commit(); await new Promise((r) => setTimeout(r, 700)); return window.__commits.length; }); } finally { await P.close(); }
        P = await open(E, T, sc, { q: { defer: "1" } });
        try { out.mountTwoFrames = await P.page.evaluate(async () => { await window.__e.mount(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); window.__e.commit(); await new Promise((r) => setTimeout(r, 700)); return window.__commits.length; }); } finally { await P.close(); }
        return out;
      });
      if (r.crashed) { cell(`commits ${sc}`, "FAIL", r.line); continue; }
      // a command has no model: two activations in one task are two commits, and a mount-time activation is one
      const stateless = sc === "button";
      const paths = r.keyboard === 1 && r.programmatic === 1 && r.pointer === 1;
      const ok = stateless ? paths && r.flipflop === 2 : paths && r.flipflop === 0 && r.mountSameTask === 0;
      cell(`commits ${sc}`, ok ? "PASS" : "FAIL", `edges per commit: keyboard ${r.keyboard}, programmatic ${r.programmatic}, pointer ${r.pointer}, ${stateless ? "two activations in one task" : "model A→B→A in one task"} ${r.flipflop} · commit in the mount's own task ${r.mountSameTask} · commit two frames after mount ${r.mountTwoFrames} (REPORT: the async-arrival case)${r.note ? ` · ${r.note}` : ""}`);
    }
  }
  if (only.includes("crest")) {
    for (const [sc, sel] of TRIO) {
      const r = await guard(`crest ${sc}`, async () => {
        const P = await open(E, T, sc);
        try {
          return await P.page.evaluate(async (sel) => {
            const el = document.querySelector(sel); const w = el.getBoundingClientRect().width; const h = el.getBoundingClientRect().height;
            const sx = () => { const m = new DOMMatrix(getComputedStyle(el).transform); return Math.hypot(m.a, m.b); };
            const fr = []; window.__e.commit(); const t0 = performance.now();
            await new Promise((done) => { const tick = () => { fr.push([performance.now() - t0, sx()]); if (performance.now() - t0 < 800) requestAnimationFrame(tick); else done(); }; requestAnimationFrame(tick); });
            let pk = 0; for (let k = 1; k < fr.length; k++) if (fr[k][1] > fr[pk][1]) pk = k;
            let tr = pk; for (let k = pk; k < fr.length; k++) if (fr[k][1] < fr[tr][1]) tr = k;
            const dts = fr.slice(1).map((x, k) => x[0] - fr[k][0]).sort((p, q) => p - q);
            return { w, h, peak: fr[pk][1], tPeak: fr[pk][0], trough: fr[tr][1], tTrough: fr[tr][0], end: fr[fr.length - 1][1], dt: dts[dts.length >> 1] };
          }, sel);
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`crest ${sc}`, "FAIL", r.line); continue; }
      cell(`crest ${sc}`, "REPORT", `box ${f(r.w, 1)}×${f(r.h, 1)} px · peak ×${f(r.peak, 4)} at ${f(r.tPeak, 0)} ms (+${f((r.peak - 1) * r.w, 2)} px wide) · trough ×${f(r.trough, 4)} at ${f(r.tTrough, 0)} ms · rest ×${f(r.end, 4)} · median frame ${f(r.dt, 1)} ms`);
    }
  }
  if (only.includes("modality")) {
    const r = await guard("modality slider", async () => {
      const P = await open(E, T, "slider");
      try {
        await P.page.addStyleTag({ content: ".glass-slider[data-held] { scale: 1.06; }" });
        const rd = () => P.page.evaluate(() => {
          const root = document.querySelector(".glass-slider"); const th = document.querySelector('[role="slider"]');
          return { held: root.getAttribute("data-held"), fv: th.matches(":focus-visible"), sc: getComputedStyle(root).scale, eng: document.querySelectorAll("[data-engaged]").length };
        });
        const out = {};
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300); out.tab = await rd();
        await P.page.keyboard.press("ArrowRight"); await P.page.waitForTimeout(300); out.arrow = await rd();
        await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300); out.tabOut = await rd();
        const c = await center(P.page, '[role="slider"]');
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300); out.hand = await rd();
        for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); }
        await P.page.waitForTimeout(250); await P.page.mouse.up(); await P.page.mouse.move(2, 2);
        let prev = 0; out.after = [];
        for (const t of [50, 600, 1500]) { await P.page.waitForTimeout(t - prev); prev = t; out.after.push([t, await rd()]); }
        await P.page.keyboard.press("ArrowLeft"); await P.page.waitForTimeout(300); out.keyAfterDrag = await rd();
        await P.page.mouse.click(2, 2); await P.page.waitForTimeout(300); out.blur = await rd();
        return { out };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("modality slider", "FAIL", r.line);
    else {
      const { out } = r; const s = (x) => `data-held ${x.held === null ? "absent" : JSON.stringify(x.held)} · thumb:focus-visible ${x.fv} · look ${x.sc} · [data-engaged] ${x.eng}`;
      cell("modality Tab entry", out.tab.held === "key" && out.tab.eng === 0 ? "PASS" : "FAIL", s(out.tab));
      cell("modality arrow key", out.arrow.held === "key" ? "PASS" : "FAIL", s(out.arrow));
      cell("modality Tab out", out.tabOut.held === null ? "PASS" : "FAIL", s(out.tabOut));
      cell("modality pointer held", out.hand.held === "" && out.hand.eng >= 1 ? "PASS" : "FAIL", s(out.hand));
      for (const [t, x] of out.after) cell(`modality after drag ${t} ms`, x.held === null ? "PASS" : "FAIL", s(x));
      cell("modality key after drag", out.keyAfterDrag.held === "key" ? "PASS" : "FAIL", s(out.keyAfterDrag));
      cell("modality blur", out.blur.held === null ? "PASS" : "FAIL", s(out.blur));
    }
  }
  if (only.includes("captures") && shots) {
    fs.mkdirSync(shots, { recursive: true });
    for (const theme of ["light", "dark"]) {
      const made = [];
      const shot = async (P, name, sel, pad = 28) => {
        const bx = sel ? await P.page.locator(sel).first().boundingBox() : null;
        const clip = bx ? { x: Math.max(0, bx.x - pad), y: Math.max(0, bx.y - pad), width: bx.width + 2 * pad, height: bx.height + 2 * pad } : undefined;
        const file = path.join(shots, `${label}-${engine}-${theme}-${name}.png`);
        await P.page.screenshot({ path: file, clip }); made.push([name, file]);
      };
      for (const [sc, sel] of TRIO) {
        const r = await guard(`captures ${sc} ${theme}`, async () => {
          let P = await open(E, T, sc, { theme, dpr: 2 });
          try {
            await shot(P, `${sc}-1-rest`, sel);
            const c = await center(P.page, sel);
            await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
            await P.page.waitForTimeout(260); await shot(P, `${sc}-2-pressed`, sel);
            await P.page.mouse.up(); await P.page.mouse.move(2, 2);
            await P.page.waitForTimeout(800); await shot(P, `${sc}-4-committed`, sel);
          } finally { await P.close(); }
          // the crest: c(t) passes 0.5 near 20 % of the panel clock (90 ms of 450)
          P = await open(E, T, sc, { theme, dpr: 2 });
          try { await P.page.evaluate(() => window.__e.commit()); await P.page.waitForTimeout(90); await shot(P, `${sc}-3-crest`, sel); } finally { await P.close(); }
          return {};
        });
        if (r?.crashed) cell(`captures ${sc} ${theme}`, "FAIL", r.line);
      }
      await guard(`captures slider ${theme}`, async () => {
        const P = await open(E, T, "slider", { theme, dpr: 2 });
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
      const b = await E.browser(); const ctx = await b.newContext({ viewport: { width: 1200, height: 900 }, colorScheme: theme });
      const pg = await ctx.newPage();
      const cells = made.map(([nm, file]) => `<figure><img src="data:image/png;base64,${fs.readFileSync(file).toString("base64")}"><figcaption>${nm}</figcaption></figure>`).join("");
      await pg.setContent(`<style>body{margin:16px;font:12px system-ui;background:${theme === "dark" ? "#111" : "#f4f4f4"};color:${theme === "dark" ? "#ddd" : "#222"}}main{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}figure{margin:0}img{max-width:100%;display:block;border:1px solid #8884}h1{font-size:14px}</style><h1>P-B (family B) · ${label} · ${engine}${engine === "webkit" ? " (Playwright WebKit, not Safari)" : ""} · ${theme}</h1><main>${cells}</main>`);
      await pg.screenshot({ path: path.join(shots, `sheet-${label}-${engine}-${theme}.png`), fullPage: true });
      await ctx.close();
      cell(`captures ${theme}`, "REPORT", `${made.length} PNGs + sheet-${label}-${engine}-${theme}.png`);
    }
  }
});
