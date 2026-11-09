#!/usr/bin/env node
// D5 pass 15 · P-E15 part S, THE FOLD of the S15 challenge: library-free engine-fact cells that test the fold's own
// treatments before S15 states them. No glass-ui byte is loaded: each page is served by page.route on a fake origin.
// One browser per run, a fresh context per cell, every page, context and the browser closed in a finally. WebKit
// restarts every 60 page loads (H3-1). Usage: node fold15.mjs chromium|webkit [V1,V2,V3]
//   V1  F-5's treatment: the challenge's X9 scenes with the glide's keyframes re-derived on each frame the carrier's
//       computed map changed, t(τ) = −J(τ)⁻¹ · L₍>i₎(τ) · Δ, against the step's own path; linear and eased glides
//   V2  F-10's ceiling against the library's own Disclosure: a block above the host opening its height on
//       --spring-present over --spring-present-duration (0.2 s), paused and seeked per 16.67 ms frame
//   V3  F-2's detector: J from the chain's computed values (the offsetParent chain and S15's flat-tree walk) against
//       the probe map, for open and closed roots, and the painted-size trigger for a closed carrier changing after the hold
import { createRequire } from "node:module";
import os from "node:os";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright");

const engine = process.argv[2] ?? "chromium";
const only = process.argv[3] ? new Set(process.argv[3].split(",")) : null;
const want = (c) => !only || only.has(c);
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const log = (...a) => console.log(...a);
const ORIGIN = "http://s15f.test";
// the library's token, copied verbatim from src/styles/tokens/scheme-spring.css (HEAD) so no library byte loads
const SPRING_PRESENT = "linear(0, 0.00629 2.041%, 0.02330 4.082%, 0.04860 6.122%, 0.08016 8.163%, 0.11629 10.204%, 0.15561 12.245%, 0.19697 14.286%, 0.23945 16.327%, 0.28231 18.367%, 0.32495 20.408%, 0.36689 22.449%, 0.40777 24.490%, 0.44732 26.531%, 0.48534 28.571%, 0.52169 30.612%, 0.55626 32.653%, 0.58902 34.694%, 0.61994 36.735%, 0.64904 38.776%, 0.67633 40.816%, 0.70186 42.857%, 0.72570 44.898%, 0.74790 46.939%, 0.76853 48.980%, 0.78768 51.020%, 0.80541 53.061%, 0.82182 55.102%, 0.83696 57.143%, 0.85094 59.184%, 0.86381 61.224%, 0.87565 63.265%, 0.88654 65.306%, 0.89653 67.347%, 0.90570 69.388%, 0.91411 71.429%, 0.92181 73.469%, 0.92885 75.510%, 0.93529 77.551%, 0.94117 79.592%, 0.94655 81.633%, 0.95145 83.673%, 0.95592 85.714%, 0.95999 87.755%, 0.96371 89.796%, 0.96708 91.837%, 0.97016 93.878%, 0.97296 95.918%, 0.97550 97.959%, 1)";

let browser = await pw[engine].launch({ headless: true });
let loads = 0;
log(`# S15 fold facts · ${engine} ${browser.version()} · playwright ${require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/package.json").version} · load ${load()} at start`);
let ok = 0, err = 0;
async function cell(name, html, fn) {
  if (engine === "webkit" && loads >= 60) { await browser.close(); browser = await pw[engine].launch({ headless: true }); loads = 0; log(`# webkit restarted after 60 page loads (H3-1) · load ${load()}`); }
  const ctx = await browser.newContext({ viewport: { width: 800, height: 700 }, deviceScaleFactor: 1 });
  try {
    const page = await ctx.newPage();
    try {
      await page.route(`${ORIGIN}/**`, (r) => r.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><meta charset=utf-8><style>html,body{margin:0}body{font:16px/20px sans-serif}</style>${html}` }));
      loads++;
      await page.goto(`${ORIGIN}/`);
      const out = await fn(page);
      log(`${name} · load ${load()}\n${typeof out === "string" ? out : JSON.stringify(out)}`);
      ok++;
    } finally {
      await page.close();
    }
  } catch (e) {
    err++;
    log(`${name} · ERROR ${String(e?.message ?? e).split("\n")[0]} · load ${load()}`);
  } finally {
    await ctx.close();
  }
}

try {
  // ── V1 · F-5's treatment: re-derive the glide on each frame the carrier's computed map changed ─────────────
  if (want("V1")) for (const [nm, cst, kf, inside, ease] of [
    ["card scale 0.5 → 1, linear glide", "transform-origin:0 0", { scale: ["0.5", "1"] }, false, "linear"],
    ["card scale 0.25 → 1, linear glide", "transform-origin:0 0", { scale: ["0.25", "1"] }, false, "linear"],
    ["card scale 0.1 → 1 (a scale-in), linear glide", "transform-origin:0 0", { scale: ["0.1", "1"] }, false, "linear"],
    ["card rotate 0 → 90deg, linear glide", "transform-origin:50% 50%", { rotate: ["0deg", "90deg"] }, false, "linear"],
    ["card scale 0.25 → 1, eased glide (ease-out)", "transform-origin:0 0", { scale: ["0.25", "1"] }, false, "ease-out"],
    ["card rotate 0 → 90deg + scale 0.5 → 1.25, eased glide", "transform-origin:50% 50%", { rotate: ["0deg", "90deg"], scale: ["0.5", "1.25"] }, false, "ease-out"],
    ["CONTROL: the step inside the card (flow-root), scale 0.25 → 1, linear", "transform-origin:0 0;display:flow-root", { scale: ["0.25", "1"] }, true, "linear"],
  ]) await cell(`V1 ${nm}`,
    `<div id=W style="position:absolute;left:150px;top:120px;width:400px"><div id=S style="height:0"></div><div id=C style="width:300px;height:200px;background:#eee;${cst}">${inside ? `<div id=S2 style="height:0"></div>` : ""}<div id=H style="position:relative;left:50px;top:40px;width:60px;height:20px;background:#09c"></div></div></div>`,
    (p) => p.evaluate(({ kf, inside, ease }) => {
      const C = document.getElementById("C"), H = document.getElementById("H");
      const card = C.animate(kf, { duration: 210, fill: "both", easing: "linear" }); card.pause(); card.currentTime = 0;
      const ctr = () => { const r = H.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      const lin = () => { const cs = getComputedStyle(C); let m = new DOMMatrix(); if (cs.rotate !== "none") m = m.rotate(parseFloat(cs.rotate)); if (cs.scale !== "none") { const s = cs.scale.split(/\s+/).map(Number); m = m.scale(s[0], s[1] ?? s[0]); } return [m.m11, m.m21, m.m12, m.m22]; };
      const D = 40;
      // L₍>i₎·Δ: the card's own step has nothing above it (I); the step inside the card sits under the card's map (J)
      const tOf = () => { const J = lin(); const det = J[0] * J[3] - J[1] * J[2]; const Ji = [J[3] / det, -J[1] / det, -J[2] / det, J[0] / det]; const LD = inside ? [J[1] * D, J[3] * D] : [0, D]; return [-(Ji[0] * LD[0] + Ji[1] * LD[1]), -(Ji[2] * LD[0] + Ji[3] * LD[1])]; };
      const old = ctr();
      document.getElementById(inside ? "S2" : "S").style.height = `${D}px`;
      let t = tOf();
      const g = H.animate({ translate: [`${t[0]}px ${t[1]}px`, "0px 0px"] }, { duration: 210, fill: "both", composite: "add", easing: ease }); g.pause();
      const act = (() => { g.currentTime = 0; const pa = ctr(); return Math.hypot(pa[0] - old[0], pa[1] - old[1]); })();
      let worst = 0, worstOnce = 0, rewrites = 0, last = lin().join(); const out = [];
      for (let tau = 0; tau <= 210; tau += 1000 / 60) {
        card.currentTime = tau;
        // the treatment: on a frame the carrier's computed map changed, rewrite the glide's keyframes, progress kept
        const now = lin().join();
        if (now !== last) { t = tOf(); g.effect.setKeyframes({ translate: [`${t[0]}px ${t[1]}px`, "0px 0px"] }); rewrites++; last = now; }
        g.currentTime = tau;
        const pa = ctr(); g.currentTime = 210; const pn = ctr(); g.currentTime = tau;
        const e = [pa[0] - pn[0], pa[1] - pn[1]];
        const J = lin(); const ep = g.effect.getComputedTiming().progress; const k = 1 - ep;
        const es = inside ? [-J[1] * D * k, -J[3] * D * k] : [0, -D * k];
        worst = Math.max(worst, Math.hypot(e[0] - es[0], e[1] - es[1]));
        if (Math.round(tau) % 70 === 0 || tau > 209) out.push(`τ ${tau.toFixed(0)} p ${ep.toFixed(3)}: glide ${e[0].toFixed(2)},${e[1].toFixed(2)} vs own ${es[0].toFixed(2)},${es[1].toFixed(2)}`);
      }
      // the same scene with the glide written once (S15 as written; the challenge's X9), for the delta in the same run
      { card.currentTime = 0; const t0 = (() => { const J = lin(); const det = J[0] * J[3] - J[1] * J[2]; const Ji = [J[3] / det, -J[1] / det, -J[2] / det, J[0] / det]; const LD = inside ? [J[1] * D, J[3] * D] : [0, D]; return [-(Ji[0] * LD[0] + Ji[1] * LD[1]), -(Ji[2] * LD[0] + Ji[3] * LD[1])]; })();
        g.effect.setKeyframes({ translate: [`${t0[0]}px ${t0[1]}px`, "0px 0px"] });
        for (let tau = 0; tau <= 210; tau += 1000 / 60) { card.currentTime = tau; g.currentTime = tau; const pa = ctr(); g.currentTime = 210; const pn = ctr(); g.currentTime = tau; const e = [pa[0] - pn[0], pa[1] - pn[1]]; const J = lin(); const k = 1 - g.effect.getComputedTiming().progress; const es = inside ? [-J[1] * D * k, -J[3] * D * k] : [0, -D * k]; worstOnce = Math.max(worstOnce, Math.hypot(e[0] - es[0], e[1] - es[1])); } }
      return `  act's frame ${act.toFixed(2)} px · re-derived: largest departure from the step's own path ${worst.toFixed(2)} px over ${rewrites} keyframe rewrites (13 frames) · written once (S15 as written): ${worstOnce.toFixed(2)} px\n  ${out.join(" · ")}`;
    }, { kf, inside, ease }));

  // ── V2 · F-10's ceiling against the library's own Disclosure profile ────────────────────────────────────
  if (want("V2")) for (const Hpx of [40, 100, 200, 300]) await cell(`V2 a block above the host opens 0 → ${Hpx} px on --spring-present over 200 ms (the Disclosure's open)`,
    `<div id=A style="height:0;overflow:hidden;background:#eee"></div><div id=H style="width:60px;height:20px;background:#09c"></div>`,
    (p) => p.evaluate(({ Hpx, ease }) => {
      const A = document.getElementById("A"), H = document.getElementById("H");
      const a = A.animate({ height: ["0px", `${Hpx}px`] }, { duration: 200, fill: "both", easing: ease }); a.pause();
      const ys = [];
      for (let f = 0; f <= 14; f++) { a.currentTime = Math.min(200, f * 1000 / 60); ys.push(H.getBoundingClientRect().top); }
      const d = ys.slice(1).map((y, i) => y - ys[i]);
      const above = d.filter((x) => Math.abs(x) > 4).length;
      const dd = d.slice(1).map((x, i) => x - d[i]);
      return `  per-frame displacement px: ${d.map((x) => x.toFixed(2)).join(" ")} · peak ${Math.max(...d.map(Math.abs)).toFixed(2)} · frames above 4 px: ${above} of ${d.length} · largest second difference ${Math.max(...dd.map(Math.abs)).toFixed(2)} px`;
    }, { Hpx, ease: SPRING_PRESENT }));

  // ── V3 · F-2's detector: computed J (chain + flat-tree walk) against the probe map; the painted-size trigger ──
  if (want("V3")) for (const [nm, mode, cardCss, later] of [
    ["open root, card scale 0.8", "open", "scale:0.8;transform-origin:0 0", null],
    ["closed root, card scale 0.8", "closed", "scale:0.8;transform-origin:0 0", null],
    ["closed root, card rotate 20deg", "closed", "rotate:20deg", null],
    ["closed root, card scale -1 1 (a reflection)", "closed", "scale:-1 1", null],
    ["closed root, no carrier (control)", "closed", "", null],
    ["closed root, card scale 1 at the hold, 0.8 after (a carrier that starts later)", "closed", "transform-origin:0 0", "0.8"],
  ]) await cell(`V3 ${nm}`,
    `<div id=X style="position:absolute;left:100px;top:100px"><div id=H style="width:80px;height:20px;background:#09c"></div></div>`,
    (p) => p.evaluate(({ mode, cardCss, later }) => {
      const X = document.getElementById("X"), H = document.getElementById("H");
      const root = X.attachShadow({ mode });
      root.innerHTML = `<div id=card style="padding:10px;width:200px;${cardCss}"><slot></slot></div>`;
      const card = root.getElementById("card");
      const ctr = () => { const r = H.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      // the probe map, mapAt's form: two paused 4 px probes on the host's translate, cancelled before return
      const probeMap = () => { const p0 = ctr(); const col = (t) => { const a = H.animate({ translate: [`${t[0]}px ${t[1]}px`, `${t[0]}px ${t[1]}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const q = ctr(); a.cancel(); return [(q[0] - p0[0]) / 4, (q[1] - p0[1]) / 4]; }; const a = col([4, 0]), b = col([0, 4]); return [a[0], b[0], a[1], b[1]]; };
      const linOf = (e) => { const cs = getComputedStyle(e); let m = new DOMMatrix(); if (cs.rotate !== "none") m = m.rotate(parseFloat(cs.rotate)); if (cs.scale !== "none") { const s = cs.scale.split(/\s+/).map(Number); m = m.scale(s[0], s[1] ?? s[0]); } if (cs.transform !== "none") m = m.multiply(new DOMMatrix(cs.transform)); return m; };
      // J from the offsetParent chain's links (S14's K) and from S15's flat-tree walk (assignedSlot → parentNode → host)
      const chainJ = () => { let m = new DOMMatrix(); for (let e = H.offsetParent; e; e = e.offsetParent) m = linOf(e).multiply(m); return m; };
      const flatJ = () => { let m = new DOMMatrix(); let e = H.assignedSlot ?? H.parentNode; while (e && e !== document) { if (e instanceof Element) m = linOf(e).multiply(m); e = e instanceof ShadowRoot ? e.host : (e.assignedSlot ?? e.parentNode); } return m; };
      const diff = (P, m) => Math.max(Math.abs(P[0] - m.a), Math.abs(P[1] - m.c), Math.abs(P[2] - m.b), Math.abs(P[3] - m.d));
      const P = probeMap();
      const cj = chainJ(), fj = flatJ();
      const row = `probe [${P.map((x) => x.toFixed(4)).join(" ")}] · offsetParent ${H.offsetParent?.nodeName} · chain J diff ${diff(P, cj).toFixed(4)} · flat-tree J diff ${diff(P, fj).toFixed(4)} → detector ${diff(P, fj) > 1e-3 ? "FIRES (unseen carrier)" : "quiet"}`;
      if (!later) return `  ${row}`;
      // the hold read J; then the closed carrier changes: does the painted size disagree with computed J × layout size?
      const sizeAt = () => { const r = H.getBoundingClientRect(); return [r.width, r.height]; };
      const J0 = fj; const pred = (m) => [Math.abs(m.a) * H.offsetWidth + Math.abs(m.c) * H.offsetHeight, Math.abs(m.b) * H.offsetWidth + Math.abs(m.d) * H.offsetHeight];
      card.style.scale = later;
      const s1 = sizeAt(), p1 = pred(flatJ());
      return `  at the hold: ${row}\n  after the closed carrier's scale → ${later}: painted ${s1.map((x) => x.toFixed(2)).join("×")} · computed J × layout ${p1.map((x) => x.toFixed(2)).join("×")} · |Δ| ${Math.max(Math.abs(s1[0] - p1[0]), Math.abs(s1[1] - p1[1])).toFixed(2)} px → trigger ${Math.max(Math.abs(s1[0] - p1[0]), Math.abs(s1[1] - p1[1])) > 0.5 ? "FIRES (re-ask the map)" : "quiet"} · J at the hold diag ${J0.a.toFixed(2)}`;
    }, { mode, cardCss, later }));
} finally {
  await browser.close();
  log(`# done · ${ok} cells, ${err} errors · load ${load()}`);
}
