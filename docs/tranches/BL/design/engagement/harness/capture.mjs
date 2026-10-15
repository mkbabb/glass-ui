#!/usr/bin/env node
// capture.mjs · CK-25: the owner-glance capture set (REGISTRY round-0 §2.5; pass 2 adds the COARSE set and every
// non-slider held and released frame, which pass 1 lacked, C-A §4, C-B §4). Per declared class's exemplar scene, the
// states rest, pressed, held, engaged, committed, released; light and dark; fine and coarse; Chromium and Playwright
// WebKit. Frames are PNG clips of the exemplar (its target and root, 48 px around, so a held control that grows or raises a handle stays in frame); each engine × pointer gets one
// contact sheet (rows: scene × theme, columns: the six states), each frame labelled with the target's measured
// effective scale. Real Safari: UNMEASURED (owner's safaridriver checkbox). It renders frames; the judgement
// ("iOS-27 grade or not", each claim tied to a frame) is a seat that did not build the route.
//   fine    rest (pointer away) · pressed (pointer down 120 ms) · held (450 ms) · committed (90 ms after the release:
//           the commit in flight) · released (900 ms after) · engaged (Tab in from the sentinel, 450 ms)
//   coarse  rest · pressed (touch held 120 ms) · held (450 ms) · engaged (the same touch at 1200 ms: the sustained
//           engagement; a coarse pointer has no keyboard) · committed (90 ms after touch-up) · released (900 ms after).
//           Chromium: the long-tap gesture (lib.mjs openTouchPage); WebKit: the raw driver's touch and its
//           Page.snapshotRect
//   node capture.mjs --build <dir> --label <l> --frames <scratch dir> --sheets <dir> [--engines chromium,webkit]
//                    [--pointers fine,coarse] [--themes light,dark] [--scenes button,switch,…]
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, openTouchPage, acquireLock, load, parseArgs, center, tabKey, f, browserCensus, isClosed } from "./lib.mjs";

const a = parseArgs();
const label = typeof a.label === "string" ? a.label : "head";
const framesDir = path.resolve(a.frames ?? "frames"); const sheetsDir = path.resolve(a.sheets ?? "sheets");
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
const pointers = typeof a.pointers === "string" ? a.pointers.split(",") : ["fine", "coarse"];
const themes = typeof a.themes === "string" ? a.themes.split(",") : ["light", "dark"];
// one exemplar scene per class (the CK-19 scenes); a route's declaration may name other exemplars, passed by --scenes
const CLASSES = { pressed: "button", chosen: "switch", held: "slider", dragged: "sortable", disclosed: "accordion", presented: "presented", field: "field", ambient: "ambient", static: "passive" };
const scenes = typeof a.scenes === "string" ? a.scenes.split(",") : Object.values(CLASSES);
const STATES = ["rest", "pressed", "held", "engaged", "committed", "released"];
fs.mkdirSync(framesDir, { recursive: true }); fs.mkdirSync(sheetsDir, { recursive: true });
const waited = await acquireLock();
const T = await serveTarget({ build: a.build });
console.log(`# capture · ${label} · ${a.build} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const clipOf = (P) => P.page.evaluate(() => {
  const els = ['[data-e~="target"]', '[data-e~="root"]', '[data-e~="grip"]'].map((s) => document.querySelector(s)).filter(Boolean);
  if (!els.length) return null;
  const rs = els.map((e) => e.getBoundingClientRect()); const x0 = Math.min(...rs.map((r) => r.left)), y0 = Math.min(...rs.map((r) => r.top)), x1 = Math.max(...rs.map((r) => r.right)), y1 = Math.max(...rs.map((r) => r.bottom));
  const x = Math.max(0, x0 - 48), y = Math.max(0, y0 - 48);
  return { x, y, width: Math.min(innerWidth - x, x1 - x0 + 96), height: Math.min(innerHeight - y, y1 - y0 + 96) };
});
const scaleOf = (P) => P.page.evaluate(() => { const e = document.querySelector('[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); return e ? window.__eff(e).s : NaN; });
const index = [];
for (const engine of engines) {
  const E = new Engine(engine); await E.browser();
  console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
  for (const pointer of pointers) for (const theme of themes) for (const sc of scenes) {
    const base = `${label}-${engine}-${pointer}-${theme}-${sc}`;
    const shots = {};
    // one row under the witnesses' guard (lib.mjs witness): 90 s, and an engine that closes or hangs is killed,
    // relaunched and the row run once more. Without it the WebKit accordion row (PF-1: the page closes or hangs on
    // pointer entry over the trigger) stalled the whole capture for 17 min (pass-2/H2.md §2.1)
    const row = async () => {
      const P = pointer === "fine" ? await openPage(E, T, sc, { theme }) : await openTouchPage(E, T, sc, { theme });
      try {
        if (pointer === "coarse" && !P.modeOk) throw new Error(`MODE NOT APPLIED ${P.modeLine}`);
        await P.page.waitForTimeout(300);
        const clip = await clipOf(P); if (!clip) throw new Error("no target to frame");
        const shoot = async (st) => {
          const s = await scaleOf(P); const file = path.join(framesDir, `${base}-${st}.png`);
          const buf = P.shot ? await P.shot(clip) : await P.page.screenshot({ clip, animations: "allow" });
          fs.writeFileSync(file, buf); shots[st] = { file, s };
        };
        const at = await P.page.evaluate(() => ['[data-e~="grip"]', '[data-e~="thumb"]', '[data-e~="target"]'].find((s) => document.querySelector(s)));
        const c = await center(P.page, at);
        if (pointer === "fine") {
          await P.page.mouse.move(2, 2); await P.page.waitForTimeout(200); await shoot("rest");
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120); await shoot("pressed");
          await P.page.waitForTimeout(330); await shoot("held");
          await P.page.mouse.up(); await P.page.waitForTimeout(90); await shoot("committed");
          await P.page.mouse.move(2, 2); await P.page.waitForTimeout(810); await shoot("released");
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); await shoot("engaged");
        } else {
          await shoot("rest");
          const order = ["pressed", "held", "engaged"]; let k = 0;
          await P.holdAt(c.x, c.y, [120, 450, 1200], () => shoot(order[k++]));
          await P.page.waitForTimeout(90); await shoot("committed");
          await P.page.waitForTimeout(810); await shoot("released");
        }
      } finally { await P.close(); }
    };
    const once = () => { let timer; return Promise.race([row(), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error("CELL TIMEOUT 90 s")), 90000); })]).finally(() => clearTimeout(timer)); };
    const msg = (e) => String(e?.message ?? e).split("\n")[0].slice(0, 100);
    try {
      let note = "";
      try { await once(); } catch (e1) {
        if (!isClosed(e1)) throw e1;
        await E.kill();
        try { await once(); note = ` · NOT-REPRODUCED: engine closed on the first run (${msg(e1)})`; } catch (e2) {
          if (!isClosed(e2)) throw e2;
          await E.kill();
          throw new Error(`ENGINE CLOSED, REPRODUCED 2/2 (${msg(e1)}; then ${msg(e2)})`);
        }
      }
      console.log(`  ${base} · ${STATES.map((st) => `${st} ×${f(shots[st]?.s)}`).join(" · ")}${note} · load ${load()}`);
    } catch (e) {
      console.log(`  ${base} · UNREAD (${String(e.message ?? e).split("\n")[0].slice(0, 140)}) · load ${load()}`);
    }
    index.push({ engine, pointer, theme, scene: sc, shots });
  }
  for (const n of E.notes) console.log(`  note ${n}`);
  await E.close();
}
// the contact sheets: one per engine × pointer, drawn in Chromium
const E = new Engine("chromium"); const b = await E.browser();
for (const engine of engines) for (const pointer of pointers) {
  const rows = index.filter((r) => r.engine === engine && r.pointer === pointer);
  const img = (p) => (p && fs.existsSync(p.file) ? `<img src="data:image/png;base64,${fs.readFileSync(p.file).toString("base64")}"><b>×${f(p.s)}</b>` : `<i>unread</i>`);
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:12px;font:11px system-ui;background:#fff;color:#111}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px;vertical-align:top;text-align:center}td img{display:block;max-width:240px;max-height:160px;margin:0 auto}td b{font-weight:500;color:#555}th{background:#f3f3f3}.dark{background:#222;color:#ddd}.dark th{background:#333}</style>
<h3>${label} · ${engine === "webkit" ? "Playwright WebKit (not Safari)" : "Chromium"} · ${pointer} pointer · CK-25 owner-glance set · real Safari UNMEASURED (owner's safaridriver checkbox)</h3>
<table><tr><th>class · scene · theme</th>${STATES.map((s) => `<th>${s}</th>`).join("")}</tr>${rows.map((r) => `<tr class="${r.theme}"><th>${Object.entries(CLASSES).find(([, v]) => v === r.scene)?.[0] ?? ""}<br>${r.scene}<br>${r.theme}</th>${STATES.map((s) => `<td>${img(r.shots[s])}</td>`).join("")}</tr>`).join("")}</table>`;
  const ctx = await b.newContext({ viewport: { width: 1700, height: 900 }, deviceScaleFactor: 1 }); const page = await ctx.newPage();
  await page.setContent(html); await page.waitForTimeout(200);
  const file = path.join(sheetsDir, `${label}-${engine}-${pointer}.png`);
  await page.screenshot({ path: file, fullPage: true }); await ctx.close();
  console.log(`# sheet ${file} · ${rows.length} rows`);
}
await E.close(); T.close();
fs.writeFileSync(path.join(sheetsDir, `${label}-index.json`), JSON.stringify(index.map((r) => ({ ...r, shots: Object.fromEntries(Object.entries(r.shots).map(([k, v]) => [k, { file: path.basename(v.file), s: v.s }])) })), null, 1));
console.log(`# capture done · load ${load()} at end`);
