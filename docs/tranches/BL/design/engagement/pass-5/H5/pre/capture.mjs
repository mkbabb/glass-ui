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
//           engagement; a coarse pointer has no keyboard), on the touch page (Chromium: the long-tap gesture, lib.mjs
//           openTouchPage; WebKit: the raw driver's touch and its Page.snapshotRect). H3 (pass 3): committed (90 ms after)
//           and released (900 ms after) are a SHORT TAP on a fresh coarse page (Playwright's touchscreen tap, hasTouch;
//           isMobile in Chromium), the tap E-2's coarse cell commits with. Pass 2 shot them after the 1200 ms long
//           touch's touch-up, which commits neither the Switch nor the accordion (C-CP §4.3, C-A2 §3; C-CP's short tap
//           read LIT 12/12)
// H3: every committed frame carries the scene's state (window.__e.state()) before the gesture and at the frame. A
// scene with a state whose gesture changed nothing is labelled NOT COMMITTED on the sheet and FAILs its cell (`CAP
// <scene> <pointer> <theme> committed`): a frame is never shown as a commit that did not happen. A scene that is not a
// CK-02 commit member (no E-2 gate: passive, field, ambient, presented, the slider) is REPORT. The run ends in a verdict line and exits 0/1/3 like a witness, so the self-test
// runs it on the fixture with its plant (`cap-nocommit`).
//   node capture.mjs --build <dir> --label <l> --frames <dir> --sheets <dir> [--engines chromium,webkit | --engine e]
//                    [--pointers fine,coarse] [--themes light,dark] [--scenes button,switch,…]
//   node capture.mjs --fixture [--fault cap-nocommit] [--engine e] [--out <dir>]   (pop, light, both pointers, no sheets)
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, openTouchPage, acquireLock, load, parseArgs, center, tabKey, f, browserCensus, isClosed, sceneApp } from "./lib.mjs";

const a = parseArgs();
const fixture = !!a.fixture;
const label = typeof a.label === "string" ? a.label : fixture ? `fixture${a.fault ? `-${a.fault}` : ""}` : "head";
const outBase = typeof a.out === "string" ? path.resolve(a.out) : null;
const framesDir = path.resolve(a.frames ?? (outBase ? path.join(outBase, "capture-frames") : "frames")); const sheetsDir = path.resolve(a.sheets ?? (outBase ? path.join(outBase, "capture-sheets") : "sheets"));
const engines = typeof a.engines === "string" ? a.engines.split(",") : typeof a.engine === "string" ? [a.engine] : ["chromium", "webkit"];
const pointers = typeof a.pointers === "string" ? a.pointers.split(",") : ["fine", "coarse"];
const themes = typeof a.themes === "string" ? a.themes.split(",") : fixture ? ["light"] : ["light", "dark"];
// one exemplar scene per class (the CK-19 scenes); a route's declaration may name other exemplars, passed by --scenes
const CLASSES = { pressed: "button", chosen: "switch", held: "slider", dragged: "sortable", disclosed: "accordion", presented: "presented", field: "field", ambient: "ambient", static: "passive" };
const scenes = typeof a.scenes === "string" ? a.scenes.split(",") : fixture ? ["pop"] : Object.values(CLASSES);
const sheets = !fixture && !a["no-sheets"];
const STATES = ["rest", "pressed", "held", "engaged", "committed", "released"];
fs.mkdirSync(framesDir, { recursive: true }); if (sheets) fs.mkdirSync(sheetsDir, { recursive: true });
const waited = await acquireLock();
const T = await serveTarget(a);
const loadStart = load();
console.log(`# capture · ${label} · ${fixture ? `fixture${a.fault ? ` fault ${a.fault}` : ""}` : `${a.build} · scene app: ${sceneApp(a.build)}`} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${loadStart} at start`);
const clipOf = (P) => P.page.evaluate(() => {
  const els = ['[data-e~="target"]', '[data-e~="root"]', '[data-e~="grip"]'].map((s) => document.querySelector(s)).filter(Boolean);
  if (!els.length) return null;
  const rs = els.map((e) => e.getBoundingClientRect()); const x0 = Math.min(...rs.map((r) => r.left)), y0 = Math.min(...rs.map((r) => r.top)), x1 = Math.max(...rs.map((r) => r.right)), y1 = Math.max(...rs.map((r) => r.bottom));
  const x = Math.max(0, x0 - 48), y = Math.max(0, y0 - 48);
  return { x, y, width: Math.min(innerWidth - x, x1 - x0 + 96), height: Math.min(innerHeight - y, y1 - y0 + 96) };
});
const scaleOf = (P) => P.page.evaluate(() => { const e = document.querySelector('[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); return e ? window.__eff(e).s : NaN; });
// the state as a string (a closed accordion's model is null, which is a state); a scene that is not a CK-02 commit
// member (no E-2 gate: passive, field, ambient, presented, slider) has no commit to show and reads REPORT
const stateOf = (P) => P.page.evaluate(() => (window.__e?.index?.[window.__e.scene]?.gates ?? []).includes("E-2") ? JSON.stringify(window.__e.state?.() ?? null) : null);
const index = []; const cells = [];
const cell = (name, status, line) => { cells.push({ name, status }); console.log(`  ${status.padEnd(10)} ${name} · ${line} · load ${load()}`); };
for (const engine of engines) {
  const E = new Engine(engine); await E.browser();
  console.log(`# ${engine} ${E.version}${engine === "webkit" ? " (Playwright WebKit, not Safari; real Safari UNMEASURED (owner's safaridriver checkbox))" : ""}`);
  for (const pointer of pointers) for (const theme of themes) for (const sc of scenes) {
    const base = `${label}-${engine}-${pointer}-${theme}-${sc}`;
    const shots = {}; let commit = null;
    // one row under the witnesses' guard (lib.mjs witness): 90 s, and an engine that closes or hangs is killed,
    // relaunched and the row run once more. Without it the WebKit accordion row (PF-1: the page closes or hangs on
    // pointer entry over the trigger) stalled the whole capture for 17 min (pass-2/H2.md §2.1)
    const row = async () => {
      const P = pointer === "fine" ? await openPage(E, T, sc, { theme }) : await openTouchPage(E, T, sc, { theme });
      let C = null;
      try {
        if (pointer === "coarse" && !P.modeOk) throw new Error(`MODE NOT APPLIED ${P.modeLine}`);
        await P.page.waitForTimeout(300);
        const clip = await clipOf(P); if (!clip) throw new Error("no target to frame");
        const shoot = async (Q, st) => {
          const s = await scaleOf(Q); const file = path.join(framesDir, `${base}-${st}.png`);
          const buf = Q.shot ? await Q.shot(clip) : await Q.page.screenshot({ clip, animations: "allow" });
          fs.writeFileSync(file, buf); shots[st] = { file, s };
        };
        const at = await P.page.evaluate(() => ['[data-e~="grip"]', '[data-e~="thumb"]', '[data-e~="target"]'].find((s) => document.querySelector(s)));
        const c = await center(P.page, at);
        if (pointer === "fine") {
          await P.page.mouse.move(2, 2); await P.page.waitForTimeout(200); await shoot(P, "rest");
          const s0 = await stateOf(P);
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120); await shoot(P, "pressed");
          await P.page.waitForTimeout(330); await shoot(P, "held");
          await P.page.mouse.up(); await P.page.waitForTimeout(90); await shoot(P, "committed");
          commit = { s0, s1: await stateOf(P), how: "pointer release after a 450 ms hold" };
          await P.page.mouse.move(2, 2); await P.page.waitForTimeout(810); await shoot(P, "released");
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); await shoot(P, "engaged");
        } else {
          await shoot(P, "rest");
          const order = ["pressed", "held", "engaged"]; let k = 0;
          await P.holdAt(c.x, c.y, [120, 450, 1200], () => shoot(P, order[k++]));
          // the commit: a short tap on a fresh coarse page (E-2's coarse tap), its frames from that page
          C = await openPage(E, T, sc, { theme, coarse: true });
          if (!C.modeOk) throw new Error(`MODE NOT APPLIED on the tap page ${C.modeLine}`);
          await C.page.waitForTimeout(300);
          const cc = await center(C.page, at); const s0 = await stateOf(C);
          await C.page.touchscreen.tap(cc.x, cc.y); await C.page.waitForTimeout(90); await shoot(C, "committed");
          commit = { s0, s1: await stateOf(C), how: "short tap" };
          await C.page.waitForTimeout(810); await shoot(C, "released");
        }
      } finally { await P.close(); await C?.close(); }
    };
    const once = () => { let timer; return Promise.race([row(), new Promise((_, rej) => { timer = setTimeout(() => rej(new Error("CELL TIMEOUT 90 s")), 90000); })]).finally(() => clearTimeout(timer)); };
    const msg = (e) => String(e?.message ?? e).split("\n")[0].slice(0, 100);
    const nm = `CAP ${sc} ${pointer} ${theme} committed`;
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
      if (commit.s0 === null) cell(nm, "REPORT", `${engine}: not a CK-02 commit member (${commit.how}); the committed frame shows the gesture, not a commit`);
      else cell(nm, commit.s0 !== commit.s1 ? "PASS" : "FAIL", `${engine}: ${commit.how}, state ${commit.s0} → ${commit.s1}${commit.s0 === commit.s1 ? ": NOT COMMITTED, the frame is labelled so" : ""}`);
    } catch (e) {
      console.log(`  ${base} · UNREAD (${String(e.message ?? e).split("\n")[0].slice(0, 140)}) · load ${load()}`);
      cell(nm, "FAIL", `${engine}: UNREAD (${msg(e)})`);
    }
    index.push({ engine, pointer, theme, scene: sc, shots, commit });
  }
  for (const n of E.notes) console.log(`  note ${n}`);
  await E.close();
}
// the contact sheets: one per engine × pointer, drawn in Chromium
if (sheets) {
  const E = new Engine("chromium"); const b = await E.browser();
  try {
    for (const engine of engines) for (const pointer of pointers) {
      const rows = index.filter((r) => r.engine === engine && r.pointer === pointer);
      const lab = (r, s) => (s === "committed" && r.commit && r.commit.s0 !== null ? (r.commit.s0 === r.commit.s1 ? `<br><b class="no">NOT COMMITTED (${r.commit.s0})</b>` : `<br><b>${r.commit.s0} → ${r.commit.s1}</b>`) : "");
      const img = (r, s) => { const p = r.shots[s]; return p && fs.existsSync(p.file) ? `<img src="data:image/png;base64,${fs.readFileSync(p.file).toString("base64")}"><b>×${f(p.s)}</b>${lab(r, s)}` : `<i>unread</i>`; };
      const html = `<!doctype html><meta charset="utf-8"><style>body{margin:12px;font:11px system-ui;background:#fff;color:#111}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px;vertical-align:top;text-align:center}td img{display:block;max-width:240px;max-height:160px;margin:0 auto}td b{font-weight:500;color:#555}td b.no{color:#b00020}th{background:#f3f3f3}.dark{background:#222;color:#ddd}.dark th{background:#333}</style>
<h3>${label} · ${engine === "webkit" ? "Playwright WebKit (not Safari)" : "Chromium"} · ${pointer} pointer · CK-25 owner-glance set · ${pointer === "coarse" ? "committed/released: a short tap · " : ""}real Safari UNMEASURED (owner's safaridriver checkbox)</h3>
<table><tr><th>class · scene · theme</th>${STATES.map((s) => `<th>${s}</th>`).join("")}</tr>${rows.map((r) => `<tr class="${r.theme}"><th>${Object.entries(CLASSES).find(([, v]) => v === r.scene)?.[0] ?? ""}<br>${r.scene}<br>${r.theme}</th>${STATES.map((s) => `<td>${img(r, s)}</td>`).join("")}</tr>`).join("")}</table>`;
      const ctx = await b.newContext({ viewport: { width: 1700, height: 900 }, deviceScaleFactor: 1 });
      try { const page = await ctx.newPage(); await page.setContent(html); await page.waitForTimeout(200); const file = path.join(sheetsDir, `${label}-${engine}-${pointer}.png`); await page.screenshot({ path: file, fullPage: true }); console.log(`# sheet ${file} · ${rows.length} rows`); }
      finally { await ctx.close(); }
    }
  } finally { await E.close(); }
  fs.writeFileSync(path.join(sheetsDir, `${label}-index.json`), JSON.stringify(index.map((r) => ({ ...r, shots: Object.fromEntries(Object.entries(r.shots).map(([k, v]) => [k, { file: path.basename(v.file), s: v.s }])) })), null, 1));
}
T.close();
const gating = cells.filter((c) => c.status !== "REPORT"); const nf = gating.filter((c) => c.status === "FAIL").length, np = gating.filter((c) => c.status === "PASS").length;
const verdict = nf ? "FAIL" : np ? "PASS" : "UNMEASURED";
console.log(`# capture done · load ${load()} at end`);
console.log(`CAP ${engines.join("+")} ${verdict} · ${np} pass, ${nf} fail, 0 unmeasured of ${gating.length} gating cells (${cells.length - gating.length} reported) · load ${loadStart} at start, ${load()} at end`);
process.exit(verdict === "FAIL" ? 1 : verdict === "PASS" ? 0 : 3);
