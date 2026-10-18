// C-A3 probe (D5 pass 3 critic of route A): cells the battery and P-A3's probe do not read.
//   node ca3-probe.mjs --build <dir> [--engine chromium|webkit] [--only fcslop,radio]
// One browser per run, a fresh context per cell, every page and context closed in a finally, the browser at the end.
//   fcslop  CK-14 × CK-13: the coarse dock trigger's 44 px hit-slop (`touch-floor.css`, an `::after`) under FORCED COLOURS.
//           engage.css's forced-colours arm sets `display: none` on every engage-chosen/pressed/disclosed `::after` with no
//           dock-trigger exclusion, so the slop may vanish. PASS when the slop is displayed and ≥ 44×44 px.
//           Control: the same element without forced colours must PASS (else the cell reads nothing).
//   radio   the Radio's commit seat in the dark theme (P-A3 §6 item 2): the seat's computed paint and the face's,
//           sampled through a programmatic commit, so the 0.0000 rise is explained by numbers, not guessed.
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";

const a = parseArgs();
const E = new Engine(a.engine ?? "chromium");
const T = await serveTarget({ build: a.build });
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const want = (k) => !only || only.has(k);
const out = [];
const cell = (verdict, name, line) => { const l = `  ${verdict.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(l); console.log(l); };
async function withPage(scene, o, fn) { const P = await openPage(E, T, scene, o); try { return await fn(P); } finally { await P.close(); } }

console.log(`# ca3-probe engine ${E.name} build ${a.build} load ${load()} at start`);
try {
  if (want("fcslop")) {
    const kinds = [
      ["dropdown", "menu__trigger engage-disclosed dock-trigger dock-dropdown-trigger"],
      ["select", "engage-disclosed dock-trigger dock-select-trigger"],
      ["popover", "engage-disclosed dock-trigger dock-dropdown-trigger"],
    ];
    for (const forced of [false, true]) for (const theme of ["light", "dark"]) for (const [k, cls] of kinds) {
      await withPage("button", { theme, coarse: true }, async (P) => {
        if (!P.modeOk) { cell("UNMEASURED", `fcslop ${k} ${theme} forced=${forced}`, `MODE NOT APPLIED ${P.modeLine}`); return; }
        if (forced) await P.page.emulateMedia({ forcedColors: "active" });
        const r = await P.page.evaluate(async (cls) => {
          const raf = () => new Promise((ok) => requestAnimationFrame(ok));
          const main = document.querySelector("main") ?? document.body;
          const b = document.createElement("button");
          b.className = cls; b.type = "button"; b.textContent = "⋯"; b.setAttribute("data-state", "closed");
          b.style.cssText = "inline-size: 32px; block-size: 24px; padding: 0; margin: 40px;";
          main.appendChild(b); await raf(); await raf();
          const cs = getComputedStyle(b, "::after"); const box = b.getBoundingClientRect();
          // hit test: a point 8 px above the face's top edge, inside a 44 px slop centred on a 24 px face
          const hx = box.left + box.width / 2, hy = box.top - 8;
          const hit = document.elementFromPoint(hx, hy);
          return { fc: matchMedia("(forced-colors: active)").matches, coarse: matchMedia("(pointer: coarse)").matches, display: cs.display, content: cs.content,
            w: parseFloat(cs.width) || 0, h: parseFloat(cs.height) || 0, face: [box.width, box.height], hitSelf: hit === b };
        }, cls);
        if (forced && !r.fc) { cell("UNMEASURED", `fcslop ${k} ${theme} forced`, "the engine does not apply (forced-colors: active) (engine limit)"); return; }
        const pass = r.display !== "none" && r.w >= 43.9 && r.h >= 43.9 && r.hitSelf;
        cell(pass ? "PASS" : "FAIL", `fcslop ${k} coarse ${theme} forced-colors=${r.fc}`, `::after display ${r.display}, content ${r.content}, slop ${r.w.toFixed(1)}×${r.h.toFixed(1)} px on a ${r.face.map((v) => v.toFixed(1)).join("×")} px face; a tap 8 px above the face hits the trigger: ${r.hitSelf} (pointer coarse ${r.coarse})`);
      });
    }
  }
  if (want("radio")) {
    for (const theme of ["light", "dark"]) {
      await withPage("radio", { theme }, async (P) => {
        const r = await P.page.evaluate(async () => {
          const raf = () => new Promise((ok) => requestAnimationFrame(ok));
          await raf(); await raf();
          const face = document.querySelector('[data-e~="face"]') ?? document.querySelector('[data-e~="target"]');
          const tgt = document.querySelector('[data-e~="target"]');
          const committedHost = () => document.querySelector('[data-e~="target"][data-state="checked"], [data-state="checked"] [data-engage-light]');
          const s0 = JSON.stringify(window.__e.state?.() ?? null);
          window.__e.commit();
          const film = []; const t0 = performance.now();
          while (performance.now() - t0 < 600) {
            await raf();
            const host = document.querySelector('[data-state="checked"]') ?? tgt;
            const L = host.querySelector("[data-engage-light]");
            const cl = L ? getComputedStyle(L) : null; const cf = getComputedStyle(host);
            film.push({ t: Math.round(performance.now() - t0), lop: cl?.opacity ?? null, lbg: cl?.backgroundColor ?? null, lsize: L ? `${L.getBoundingClientRect().width.toFixed(1)}×${L.getBoundingClientRect().height.toFixed(1)}` : null, hostBg: cf.backgroundColor, hostColor: cf.color, rungLight: cf.getPropertyValue("--rung-light").trim() });
          }
          return { s0, s1: JSON.stringify(window.__e.state?.() ?? null), film, hasLight: !!document.querySelector("[data-engage-light]"), faceTag: face?.className };
        });
        const pick = [0, 2, 5, 10, 20, r.film.length - 1].map((i) => r.film[Math.min(i, r.film.length - 1)]);
        cell("REPORT", `radio seat ${theme}`, `state ${r.s0} → ${r.s1}; light layer present ${r.hasLight}; ` + pick.map((f) => `t${f.t}: light op ${f.lop} bg ${f.lbg} ${f.lsize} · host bg ${f.hostBg} · --rung-light ${f.rungLight}`).join(" | "));
      });
    }
  }
} finally { await E.close(); T.close(); }
const n = (v) => out.filter((l) => l.trim().startsWith(v)).length;
console.log(`ca3-probe ${E.name} · ${n("PASS")} pass, ${n("FAIL")} fail, ${n("UNMEASURED")} unmeasured, ${n("REPORT")} report · load ${load()} at end`);
