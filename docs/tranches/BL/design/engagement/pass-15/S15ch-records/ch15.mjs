#!/usr/bin/env node
// D5 pass 15 · S15 CHALLENGE (§P14-8.2 wave 1b): library-free engine-fact cells that attack S15 (P-E15.md part S).
// No glass-ui byte is loaded: each page is served by page.route on a fake origin. One browser per run, a fresh
// context per cell, every page, context and the browser closed in a finally. WebKit restarts every 60 page loads
// (H3-1). Usage: node ch15.mjs chromium|webkit [X1,X2,...]
//   X1  S15-e: the gutter read on the held control's ::before against the PAGE consumer of record (CE13c D8's `main` div)
//   X2  S15-h A1: the flat-tree walk (assignedSlot → parentNode → root.host) across open and closed shadow roots
//   X3  S15-a rule 1: Π of per-link flattened linear parts against the painted map under transform-style: preserve-3d
//   X4  S15-h A2 / rule 3: Typed OM computed transform while a transition or animation interpolates percentages
//   X5  S15-h A3: which point a host's 80 → 40 px shrink keeps fixed, per alignment, against S15's table
//   X6  S15-h A12: what getComputedStyle / Typed OM report for a relative link's insets (`top: auto`, over-constrained)
//   X7  S15-d4 (both branches): an anchored top-layer lens against its anchor under the host's glide, a carrier, the grow
//   X8  S15-b (K3c, owed): root-px ΔQ against painted Δ across a zoom sweep 0.5-2 at the host and its offsetParent
//   X9  S15-a rule 1: a step at the transformed link compensated once on the host, under a carrier that changes during the glide
//   X10 S15-c: M9 members (font swap, timed insertRule, viewport media flip): the stage-form read against an after-step read
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import os from "node:os";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright");

const engine = process.argv[2] ?? "chromium";
const only = process.argv[3] ? new Set(process.argv[3].split(",")) : null;
const want = (c) => !only || only.has(c);
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const log = (...a) => console.log(...a);
const ORIGIN = "http://s15ch.test";
const FONT = readFileSync("/System/Library/Fonts/Supplemental/Zapfino.ttf");

let browser = await pw[engine].launch({ headless: true });
let loads = 0;
log(`# S15 challenge facts · ${engine} ${browser.version()} · playwright ${require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/package.json").version} · load ${load()} at start`);
let ok = 0, err = 0;
async function cell(name, html, fn, routes = {}, viewport = { width: 800, height: 700 }) {
  if (engine === "webkit" && loads >= 60) { await browser.close(); browser = await pw[engine].launch({ headless: true }); loads = 0; log(`# webkit restarted after 60 page loads (H3-1) · load ${load()}`); }
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  try {
    const page = await ctx.newPage();
    try {
      await page.route(`${ORIGIN}/**`, async (r) => {
        const u = new URL(r.request().url()).pathname;
        if (u === "/") return r.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><meta charset=utf-8><style>html,body{margin:0}body{font:16px/20px sans-serif}</style>${html}` });
        const rt = routes[u];
        if (!rt) return r.fulfill({ status: 404, body: "" });
        if (rt.delay) await new Promise((res) => setTimeout(res, rt.delay));
        return r.fulfill({ status: 200, contentType: rt.type, body: rt.body });
      });
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
  // ── X1 · S15-e against the page consumer of record ─────────────────────────────────────────────────────
  // CE13c's D8 (pass-13/C-E13c/ce13c-probe.mjs:253-261): the consumer is a div appended to `main` with
  // padding-inline: var(--space-section), the page gutter; the host's font is 14 px. S15-e's K5 compared the read to
  // the HOST's own padding instead.
  if (want("X1")) for (const [nm, rootTok, mainTok, hostInCard] of [
    ["2em on :root; main 16.6 px; host 14 px (CE13c D8 row 1)", "2em", "", false],
    ["4cqi on :root; host in a 400 px inline-size container; consumer in main (CE13c D8 row 2)", "4cqi", "", true],
    ["2rem on :root (the library default; control)", "2rem", "", false],
    ["2rem on :root, 2em on main (a nearer page override)", "2rem", "2em", false],
    ["clamp(1rem, 3vw, 3rem) on :root (control)", "clamp(1rem, 3vw, 3rem)", "", false],
  ]) await cell(`X1 ${nm}`,
    `<style>@property --rd{syntax:"<length-percentage> | g-unset";inherits:false;initial-value:0px}
     :root{--space-section:${rootTok}} main{font-size:16.6px;${mainTok ? `--space-section:${mainTok};` : ""}}
     #H{font-size:14px;width:120px} #H::before{content:"";--rd:calc(var(--space-section))} :root::before{content:"";--rd:calc(var(--space-section))}
     .card{container-type:inline-size;width:400px}</style>
     <main>${hostInCard ? `<div class=card><div id=H>host</div></div>` : `<div id=H>host</div>`}</main>`,
    (p) => p.evaluate(() => {
      const mn = document.querySelector("main");
      const g = document.createElement("div"); g.style.paddingInline = "var(--space-section)"; mn.appendChild(g);
      const page = parseFloat(getComputedStyle(g).paddingLeft);
      const H = document.getElementById("H");
      const own = document.createElement("div"); own.style.paddingInline = "var(--space-section)"; H.appendChild(own);
      const hostOwn = parseFloat(getComputedStyle(own).paddingLeft);
      const hb = getComputedStyle(H, "::before").getPropertyValue("--rd").trim();
      const rb = getComputedStyle(document.documentElement, "::before").getPropertyValue("--rd").trim();
      const f = (s) => (s.endsWith("px") ? (parseFloat(s) - page).toFixed(2) : "n/a");
      return `  page consumer (main div padding) ${page.toFixed(2)}px · host's own padding (K5's 'consumer') ${hostOwn.toFixed(2)}px · host ::before (S15-e) ${hb} (off the page ${f(hb)}) · :root::before (cand14) ${rb} (off the page ${f(rb)})`;
    }));

  // ── X2 · the flat-tree walk across open and closed shadow roots ─────────────────────────────────────────
  if (want("X2")) for (const mode of ["open", "closed"]) for (const depth of [1, 2]) await cell(`X2 ${mode} shadow root, depth ${depth}`,
    `<div id=SH></div>`,
    (p) => p.evaluate(({ mode, depth }) => {
      const SH = document.getElementById("SH");
      const r1 = SH.attachShadow({ mode });
      const truth = [];
      if (depth === 1) {
        r1.innerHTML = `<div class=card style="scale:.8;transform-origin:0 0;padding:4px"><div style="height:10px"></div><slot></slot></div>`;
        truth.push("card(scale .8) in SH's root");
      } else {
        r1.innerHTML = `<div class=c1 style="rotate:10deg"><x-inner id=SH2><slot></slot></x-inner></div>`;
        const SH2 = r1.getElementById("SH2");
        const r2 = SH2.attachShadow({ mode });
        r2.innerHTML = `<div class=card style="scale:.8;transform-origin:0 0"><slot></slot></div>`;
        truth.push("c1(rotate 10deg) in SH's root", "card(scale .8) in SH2's root");
      }
      const H = document.createElement("div"); H.id = "H"; H.textContent = "host"; H.style.cssText = "width:80px;height:20px"; SH.appendChild(H);
      // S15-h A1's walk, as written: assignedSlot, then parentNode, then a shadow root's host
      const found = []; const steps = [];
      let e = H, guard = 0;
      while (e && guard++ < 50) {
        let next;
        if (e.assignedSlot) { next = e.assignedSlot; steps.push("assignedSlot"); }
        else if (e.parentNode instanceof ShadowRoot) { next = e.parentNode.host; steps.push("root.host"); }
        else { next = e.parentNode; steps.push("parentNode"); }
        e = next;
        if (e instanceof Element) {
          const c = getComputedStyle(e);
          if (c.transform !== "none" || c.rotate !== "none" || c.scale !== "none" || c.translate !== "none") found.push(`${e.tagName.toLowerCase()}${e.className ? "." + e.className : ""}(${[c.rotate, c.scale].filter((v) => v !== "none").join(",")})`);
        }
        if (e === document.documentElement) break;
      }
      let cp = "";
      document.addEventListener("x", (ev) => { cp = ev.composedPath().map((n) => n.nodeName?.toLowerCase?.() ?? "?").join(">"); }, { once: true });
      H.dispatchEvent(new Event("x", { bubbles: true, composed: true }));
      const r = H.getBoundingClientRect();
      return `  H.assignedSlot ${H.assignedSlot ? "<slot>" : "null"} · H.offsetParent <${H.offsetParent?.tagName?.toLowerCase()}> · walk ${steps.slice(0, 6).join(">")} · carriers found ${found.length ? found.join(", ") : "NONE"} · carriers present ${truth.join(", ")} · painted width ${r.width.toFixed(2)} of offsetWidth ${H.offsetWidth} · composedPath from document ${cp}`;
    }, { mode, depth }));

  // ── X3 · Π of per-link flattened linear parts under preserve-3d ──────────────────────────────────────────
  if (want("X3")) for (const [nm, tp, tc] of [
    ["P none · C rotateX(50deg) (K2's flattened control)", "", "transform:rotateX(50deg)"],
    ["P rotateY(50deg) flat · C rotateX(50deg) (control: no preserve-3d)", "transform:rotateY(50deg)", "transform:rotateX(50deg)"],
    ["P rotateY(50deg) preserve-3d · C rotateX(50deg)", "transform:rotateY(50deg);transform-style:preserve-3d", "transform:rotateX(50deg)"],
    ["P rotateY(60deg) preserve-3d · C rotateY(-60deg) (cancels in 3D)", "transform:rotateY(60deg);transform-style:preserve-3d", "transform:rotateY(-60deg)"],
    ["P rotateZ(30deg) rotateX(60deg) preserve-3d · C rotateY(40deg)", "transform:rotateZ(30deg) rotateX(60deg);transform-style:preserve-3d", "transform:rotateY(40deg)"],
    ["P rotate: x 55deg preserve-3d · C rotate: y 35deg (individual properties)", "rotate:x 55deg;transform-style:preserve-3d", "rotate:y 35deg"],
  ]) await cell(`X3 ${nm}`,
    `<div id=P style="position:absolute;left:300px;top:250px;width:200px;height:120px;${tp}"><div id=C style="width:200px;height:120px;${tc}"><div id=H style="position:relative;left:60px;top:40px;width:40px;height:20px;background:#09c"></div></div></div>`,
    (p) => p.evaluate(() => {
      const lin = (el) => {
        const c = getComputedStyle(el);
        let m = new DOMMatrix();
        const rot = c.rotate;
        if (rot !== "none") {
          const t = rot.trim().split(/\s+/);
          const ang = parseFloat(t[t.length - 1]);
          const ax = t.length === 1 ? [0, 0, 1] : t[0] === "x" ? [1, 0, 0] : t[0] === "y" ? [0, 1, 0] : t[0] === "z" ? [0, 0, 1] : t.slice(0, 3).map(Number);
          m = m.rotateAxisAngle(ax[0], ax[1], ax[2], ang);
        }
        if (c.scale !== "none") { const s = c.scale.split(/\s+/).map(Number); m = m.scale(s[0], s[1] ?? s[0], s[2] ?? 1); }
        if (c.transform !== "none") m = m.multiply(new DOMMatrix(c.transform));
        return m;
      };
      const H = document.getElementById("H");
      const links = [document.getElementById("C"), document.getElementById("P")]; // inner to outer
      // S15 rule 1: J = Π over links of each link's own flattened 2×2 linear part (outer · inner)
      let J = [1, 0, 0, 1]; // [a b; c d] with (u,v) -> (a u + b v, c u + d v)
      const flags = [];
      for (const el of links) {
        const m = lin(el);
        flags.push(`m14 ${m.m14.toFixed(3)} m24 ${m.m24.toFixed(3)} m34 ${m.m34.toFixed(3)} m13 ${m.m13.toFixed(3)} m23 ${m.m23.toFixed(3)}`);
        const L = [m.m11, m.m21, m.m12, m.m22];
        J = [L[0] * J[0] + L[1] * J[2], L[0] * J[1] + L[1] * J[3], L[2] * J[0] + L[3] * J[2], L[2] * J[1] + L[3] * J[3]];
      }
      const centre = () => { const r = H.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      const probe = (t) => { const v = `${t[0]}px ${t[1]}px`; const a = H.animate({ translate: [v, v] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return centre(); } finally { a.cancel(); } };
      const p0 = probe([0, 0]), px = probe([4, 0]), py = probe([0, 4]);
      const M = [(px[0] - p0[0]) / 4, (py[0] - p0[0]) / 4, (px[1] - p0[1]) / 4, (py[1] - p0[1]) / 4];
      const d = Math.max(...J.map((v, i) => Math.abs(v - M[i])));
      // what a 40 px level step compensated by rule 1 would paint: t = -J^-1 · Δ (Δ = (0,40) painted under J) ... residual = (M J^-1 - I) Δ
      const det = J[0] * J[3] - J[1] * J[2];
      const Ji = [J[3] / det, -J[1] / det, -J[2] / det, J[0] / det];
      const D = [0, 40]; const t = [-(Ji[0] * D[0] + Ji[1] * D[1]), -(Ji[2] * D[0] + Ji[3] * D[1])];
      const res = [M[0] * t[0] + M[1] * t[1] + D[0], M[2] * t[0] + M[3] * t[1] + D[1]];
      const f = (a) => a.map((v) => v.toFixed(5)).join(" ");
      return `  S15 J (Π flattened links) [${f(J)}] · engine probe map [${f(M)}] · max |diff| ${d.toFixed(5)} · links C,P: ${flags.join(" | ")} · a 40 px painted step compensated by J: residual on the act's frame ${Math.hypot(res[0], res[1]).toFixed(2)} px`;
    }));

  // ── X4 · Typed OM while percentages interpolate ───────────────────────────────────────────────────────────
  if (want("X4")) for (const [nm, prop, from, to, how] of [
    ["transform transition, mismatched lists: translate(-50%,-50%) rotate(10deg) → scale(1.2), at 50 %", "transform", "translate(-50%, -50%) rotate(10deg)", "scale(1.2)", "transition"],
    ["transform transition, matched lists: translate(-50%,-50%) rotate(10deg) → translate(-20%,-50%) rotate(30deg), at 50 %", "transform", "translate(-50%, -50%) rotate(10deg)", "translate(-20%, -50%) rotate(30deg)", "transition"],
    ["transform transition, none → translate(-50%,-50%), at 50 %", "transform", "none", "translate(-50%, -50%)", "transition"],
    ["transform WAAPI, translate(-50%,-50%) → translateX(0) scale(2) (mismatched), at 50 %", "transform", "translate(-50%, -50%)", "translateX(0px) scale(2)", "waapi"],
    ["translate transition, -50% -50% → 10px 10px, at 50 %", "translate", "-50% -50%", "10px 10px", "transition"],
  ]) await cell(`X4 ${nm}`,
    `<div id=E style="position:absolute;left:300px;top:300px;width:200px;height:100px;background:#ccc"></div>`,
    (p) => p.evaluate(({ prop, from, to, how }) => {
      const E = document.getElementById("E");
      let a;
      if (how === "transition") {
        E.style.setProperty(prop, from); getComputedStyle(E).getPropertyValue(prop);
        E.style.transition = `${prop} 10s linear`; getComputedStyle(E).getPropertyValue(prop);
        E.style.setProperty(prop, to);
        getComputedStyle(E).getPropertyValue(prop);
        a = E.getAnimations()[0];
      } else {
        a = E.animate({ [prop]: [from, to] }, { duration: 10000, fill: "both" });
      }
      if (!a) return "  NO ANIMATION STARTED";
      a.pause(); a.currentTime = 5000;
      const gcs = getComputedStyle(E).getPropertyValue(prop);
      let tom = "computedStyleMap absent", kinds = "";
      if (E.computedStyleMap) {
        const v = E.computedStyleMap().get(prop);
        tom = String(v);
        kinds = v && typeof v[Symbol.iterator] === "function" ? [...v].map((c) => c.constructor.name).join(",") : v?.constructor?.name ?? "";
      }
      const r = E.getBoundingClientRect();
      return `  getComputedStyle ${gcs} · Typed OM ${tom} [${kinds}] · percentage kept by Typed OM: ${/%/.test(tom) ? "YES" : "NO"} · painted box ${r.left.toFixed(2)},${r.top.toFixed(2)} ${r.width.toFixed(2)}×${r.height.toFixed(2)}`;
    }, { prop, from, to, how }));

  // ── X5 · the fixed point of a host's own shrink, per alignment ───────────────────────────────────────────
  if (want("X5")) for (const [nm, parent, host, s15] of [
    ["block in flow (control)", "height:300px", "", "start (table: block-level in flow, block axis always start)"],
    ["block container align-content: center", "height:300px;align-content:center", "", "start (table: block-level in flow, block axis always start)"],
    ["block container align-content: end", "height:300px;align-content:end", "", "start (table: block-level in flow, block axis always start)"],
    ["flex column-reverse, justify-content normal", "height:300px;display:flex;flex-direction:column-reverse", "", "unnamed (no row names column-reverse) → S14 least-moved limit"],
    ["grid align-content: end", "height:300px;display:grid;align-content:end", "", "ambiguous ('end … forms' names no property)"],
    ["table-cell vertical-align: middle", "height:300px;display:table-cell;vertical-align:middle;width:300px", "", "unnamed → least-moved limit"],
    ["abspos inset:0 margin:auto (block-axis auto margins)", "height:300px;position:relative", "position:absolute;inset:0;margin:auto;width:100px", "unnamed (table names margin-inline:auto only) → least-moved limit"],
    ["abspos bottom: 10px", "height:300px;position:relative", "position:absolute;bottom:10px;left:0;width:100px", "unnamed → least-moved limit"],
  ]) await cell(`X5 ${nm}`,
    `<div style="position:absolute;left:100px;top:100px;width:300px"><div id=PA style="${parent}"><div id=H style="height:80px;width:100px;background:#09c;${host}"></div><div style="height:30px;background:#eee;width:50px"></div></div></div>`,
    (p) => p.evaluate((s15) => {
      const H = document.getElementById("H");
      const a = H.getBoundingClientRect();
      H.style.height = "40px";
      const b = H.getBoundingClientRect();
      const d = { start: b.top - a.top, centre: (b.top + b.bottom) / 2 - (a.top + a.bottom) / 2, end: b.bottom - a.bottom };
      const fixed = Object.entries(d).filter(([, v]) => Math.abs(v) < 0.01).map(([k]) => k).join("+") || "none";
      const least = Object.entries(d).reduce((m, x) => (Math.abs(x[1]) < Math.abs(m[1]) ? x : m))[0];
      return `  Δ start ${d.start.toFixed(2)} · Δ centre ${d.centre.toFixed(2)} · Δ end ${d.end.toFixed(2)} → the engine keeps: ${fixed} · S15's table: ${s15} · S14's least-moved (one frame, no insert): ${least}`;
    }, s15));

  // ── X6 · a relative link's insets as reported ─────────────────────────────────────────────────────────────
  if (want("X6")) for (const [nm, st] of [
    ["relative, top auto, bottom 20px", "position:relative;bottom:20px"],
    ["relative, top 10px, bottom 20px (over-constrained: bottom ignored)", "position:relative;top:10px;bottom:20px"],
    ["relative, top 10% of a 300 px containing block", "position:relative;top:10%"],
  ]) await cell(`X6 ${nm}`,
    `<div style="height:300px;position:relative"><div style="height:50px"></div><div id=R style="${st};height:40px;width:100px;background:#09c"></div></div>`,
    (p) => p.evaluate(() => {
      const R = document.getElementById("R");
      const c = getComputedStyle(R);
      let tom = "absent";
      if (R.computedStyleMap) { const m = R.computedStyleMap(); tom = `top ${m.get("top")} bottom ${m.get("bottom")}`; }
      return `  getComputedStyle top ${c.top} bottom ${c.bottom} · Typed OM ${tom} · offsetTop ${R.offsetTop} (laid out at 50)`;
    }));

  // ── X7 · an anchored top-layer lens against its anchor ───────────────────────────────────────────────────
  if (want("X7")) for (const [nm, wst, act] of [
    ["no transform (control)", "", ""],
    ["the host's glide: composite-add translate 0 40px → 0, held at progress 0.5", "", "glide"],
    ["a carrier: the host's ancestor scale: 0.8, origin 0 0", "scale:0.8;transform-origin:0 0", ""],
    ["a carrier: the host's ancestor translate: 30px -25px", "translate:30px -25px", ""],
    ["the grow: the host's own scale 1.06 1.3 about its centre", "", "grow"],
  ]) await cell(`X7 ${nm}`,
    `<div id=W style="position:absolute;left:150px;top:300px;width:400px;${wst}"><div id=HOST style="margin:20px;width:300px;height:40px;transform-origin:center"><div id=T style="anchor-name:--t;width:300px;height:8px;margin-top:16px;background:#09c"></div></div></div>
     <div id=L popover=manual style="position:fixed;position-anchor:--t;inset:auto;margin:0;padding:0;border:0;left:anchor(center);bottom:anchor(top);width:60px;height:30px;translate:-50% 0;background:#c90"></div>`,
    (p) => p.evaluate((act) => {
      const sup = typeof CSS !== "undefined" && CSS.supports("anchor-name: --t") && CSS.supports("position-anchor: --t");
      const L = document.getElementById("L"), T = document.getElementById("T"), HOST = document.getElementById("HOST");
      L.showPopover();
      if (act === "glide") { const a = HOST.animate({ translate: ["0 40px", "0 0"] }, { duration: 1000, composite: "add", fill: "both" }); a.pause(); a.currentTime = 500; }
      if (act === "grow") HOST.style.scale = "1.06 1.3";
      const l = L.getBoundingClientRect(), t = T.getBoundingClientRect();
      const dx = (l.left + l.width / 2) - (t.left + t.width / 2), dy = l.bottom - t.top;
      return `  anchor positioning supported ${sup} · lens bottom-centre minus the anchor's painted top-centre: ${dx.toFixed(2)}, ${dy.toFixed(2)} px (0 = laid on it with no correction)`;
    }, act));

  // ── X8 · root-px Q across a zoom sweep (K3c) ─────────────────────────────────────────────────────────────
  if (want("X8")) await cell(`X8 zoom sweep: S15-b's root-px Q against paint`,
    `<div id=A style="position:relative;margin:13.37px 0 0 21.61px;padding:7.3px;border:2.7px solid #ccc"><div id=B style="height:9.4px"></div><div id=P style="position:relative;margin-left:11.3px;padding:5.1px;border:1.9px solid #999"><div id=H style="position:relative;margin:3.7px 0 0 17.9px;width:50px;height:20px;background:#09c"></div></div></div>`,
    (p) => p.evaluate(() => {
      const A = document.getElementById("A"), P = document.getElementById("P"), H = document.getElementById("H"), B = document.getElementById("B");
      const Q = () => {
        let q = [0, 0];
        for (let e = H; e && e !== document.body; e = e.offsetParent) {
          const z = e.currentCSSZoom, op = e.offsetParent;
          const zp = op && op !== document.body ? op.currentCSSZoom : 1;
          const cx = op && op !== document.body ? op.clientLeft : 0, cy = op && op !== document.body ? op.clientTop : 0;
          q = [q[0] + e.offsetLeft * z + cx * zp, q[1] + e.offsetTop * z + cy * zp];
        }
        return q;
      };
      const paint = () => { const r = H.getBoundingClientRect(); return [r.left + window.scrollX, r.top + window.scrollY]; };
      const Z = [0.5, 0.75, 1, 1.25, 1.5, 1.875, 2];
      const lines = []; let worstStep = 0, worstZoom = 0, worstStepAt = "", worstZoomAt = "";
      for (const zA of [1, 1.25, 2]) for (const zP of Z) {
        A.style.zoom = String(zA); P.style.zoom = String(zP);
        const row = [];
        for (const zH of Z) {
          // a zoom change of the host 1 → zH: the TOP-LEFT (border-box start) move, Q against paint
          H.style.zoom = "1"; B.style.height = "9.4px";
          const q0 = Q(), p0 = paint();
          H.style.zoom = String(zH);
          const q1 = Q(), p1 = paint();
          const ez = Math.max(Math.abs(q1[0] - q0[0] - (p1[0] - p0[0])), Math.abs(q1[1] - q0[1] - (p1[1] - p0[1])));
          // an insert step of 7.3 px (unzoomed) before P's parent content, at this zoom: ΔQ against Δpaint
          B.style.height = "16.7px";
          const q2 = Q(), p2 = paint();
          const es = Math.max(Math.abs(q2[0] - q1[0] - (p2[0] - p1[0])), Math.abs(q2[1] - q1[1] - (p2[1] - p1[1])));
          B.style.height = "9.4px";
          row.push(`${zH}:${ez.toFixed(2)}/${es.toFixed(2)}`);
          if (ez > worstZoom) { worstZoom = ez; worstZoomAt = `zA ${zA} zP ${zP} zH 1→${zH}`; }
          if (es > worstStep) { worstStep = es; worstStepAt = `zA ${zA} zP ${zP} zH ${zH}`; }
        }
        lines.push(`  zA ${zA} zP ${zP} · per zH, |ΔQ−Δpaint| for the host's zoom 1→zH / for a 7.3 px insert: ${row.join(" ")}`);
      }
      lines.push(`  WORST host-zoom change ${worstZoom.toFixed(2)} px at ${worstZoomAt} · WORST insert step ${worstStep.toFixed(2)} px at ${worstStepAt} · glide floor 0.5 px`);
      return lines.join("\n");
    }));

  // ── X9 · a step at the transformed link, compensated once on the host, under a carrier changing during the glide
  if (want("X9")) for (const [nm, cst, kf, inside] of [
    ["the card's own step (40 px insert above it), card scale 0.5 → 1 during the 210 ms glide", "transform-origin:0 0", { scale: ["0.5", "1"] }, false],
    ["the card's own step, card scale 0.25 → 1", "transform-origin:0 0", { scale: ["0.25", "1"] }, false],
    ["the card's own step, card scale 0.1 → 1 (a scale-in)", "transform-origin:0 0", { scale: ["0.1", "1"] }, false],
    ["the card's own step, card rotate 0 → 90deg", "transform-origin:50% 50%", { rotate: ["0deg", "90deg"] }, false],
    ["CONTROL: the step inside the card (flow-root), card scale 0.25 → 1", "transform-origin:0 0;display:flow-root", { scale: ["0.25", "1"] }, true],
  ]) await cell(`X9 ${nm}`,
    `<div id=W style="position:absolute;left:150px;top:120px;width:400px"><div id=S style="height:0"></div><div id=C style="width:300px;height:200px;background:#eee;${cst}">${inside ? `<div id=S2 style="height:0"></div>` : ""}<div id=H style="position:relative;left:50px;top:40px;width:60px;height:20px;background:#09c"></div></div></div>`,
    (p) => p.evaluate(({ kf, inside }) => {
      const C = document.getElementById("C"), H = document.getElementById("H");
      const card = C.animate(kf, { duration: 210, fill: "both", easing: "linear" }); card.pause(); card.currentTime = 0;
      const top = () => { const r = H.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      const old = top();
      document.getElementById(inside ? "S2" : "S").style.height = "40px";
      // S15 rule 1 at the act's frame: t = −J⁻¹ · L₍>i₎ · Δ, J = the card's linear map now, L₍>i₎ = I (the card's own step) or J (inside)
      const cs = getComputedStyle(C);
      let m = new DOMMatrix();
      if (cs.rotate !== "none") m = m.rotate(parseFloat(cs.rotate));
      if (cs.scale !== "none") { const s = cs.scale.split(/\s+/).map(Number); m = m.scale(s[0], s[1] ?? s[0]); }
      const J = [m.m11, m.m21, m.m12, m.m22];
      const det = J[0] * J[3] - J[1] * J[2];
      const Ji = [J[3] / det, -J[1] / det, -J[2] / det, J[0] / det];
      const LD = inside ? [J[1] * 40, J[3] * 40] : [0, 40];
      const t = [-(Ji[0] * LD[0] + Ji[1] * LD[1]), -(Ji[2] * LD[0] + Ji[3] * LD[1])];
      const g = H.animate({ translate: [`${t[0]}px ${t[1]}px`, "0px 0px"] }, { duration: 210, fill: "both", composite: "add", easing: "linear" }); g.pause();
      const out = []; let worst = 0, peak = 0;
      for (const tau of [0, 35, 70, 105, 140, 175, 210]) {
        card.currentTime = tau; g.currentTime = tau;
        const pa = top();
        g.currentTime = 210; const pn = top(); g.currentTime = tau;
        const e = [pa[0] - pn[0], pa[1] - pn[1]];
        // the step as it paints in its own frame, glided linearly: −L₍>i₎(τ)·Δ·(1 − p); the card's own step: −Δ (nothing above the card)
        const cs2 = getComputedStyle(C);
        let m2 = new DOMMatrix();
        if (cs2.rotate !== "none") m2 = m2.rotate(parseFloat(cs2.rotate));
        if (cs2.scale !== "none") { const s = cs2.scale.split(/\s+/).map(Number); m2 = m2.scale(s[0], s[1] ?? s[0]); }
        const k = 1 - tau / 210;
        const es = inside ? [-m2.m21 * 40 * k, -m2.m22 * 40 * k] : [0, -40 * k];
        const dev = Math.hypot(e[0] - es[0], e[1] - es[1]);
        worst = Math.max(worst, dev); peak = Math.max(peak, Math.hypot(e[0], e[1]));
        out.push(`τ ${tau}: glide ${e[0].toFixed(2)},${e[1].toFixed(2)} vs the step's own ${es[0].toFixed(2)},${es[1].toFixed(2)}`);
      }
      const act = (() => { card.currentTime = 0; g.currentTime = 0; const pa = top(); return Math.hypot(pa[0] - old[0], pa[1] - old[1]); })();
      return `  act's frame: painted ${act.toFixed(2)} px from where it was (≤ 0.5 bound) · the glide's largest painted excursion ${peak.toFixed(2)} px for a 40 px step · largest departure from the step's own path ${worst.toFixed(2)} px\n  ${out.join(" · ")}`;
    }, { kf, inside }));

  // ── X10 · M9 members: the stage-form read against an after-step read, per frame ──────────────────────────
  if (want("X10")) for (const [nm, kind] of [
    ["a font swap (font-display: swap, served 60 ms after insertion)", "font"],
    ["an insertRule from a setTimeout task (25 ms)", "cssom"],
    ["a viewport media flip (setViewportSize during the hold)", "media"],
    ["CONTROL: another resize observer created after the stage's writes height (M25)", "m25"],
  ]) await cell(`X10 ${nm}`,
    `<style>@media (max-width: 760px){ #B { height: 80px !important } }</style><div id=B style="height:40px;font:40px/normal x-late, Courier, monospace">Wg</div><div id=T style="width:100px;height:20px;background:#09c">t</div><div id=O style="width:10px;height:10px"></div>`,
    async (p) => {
      await p.evaluate((kind) => {
        window.__rec = []; let f = 0;
        const T = document.getElementById("T"), O = document.getElementById("O");
        const stage = new ResizeObserver(() => { window.__rec.push([f, "stage", T.offsetTop]); });
        const after = new ResizeObserver(() => { window.__rec.push([f, "after", T.offsetTop]); });
        if (kind === "m25") { let n = 0; window.__m25 = new ResizeObserver(() => { if (++n === 12) document.getElementById("B").style.height = "70px"; }); }
        const tick = () => {
          f++;
          window.__rec.push([f, "rAF", T.offsetTop]);
          stage.unobserve(T); stage.observe(T);
          if (kind === "m25") { window.__m25.unobserve(O); window.__m25.observe(O); }
          after.unobserve(O); after.observe(O);
          const ch = new MessageChannel(); const ff = f; ch.port1.onmessage = () => window.__rec.push([ff, "msg", T.offsetTop]); ch.port2.postMessage(0);
          if (f < 60) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        if (kind === "font") setTimeout(() => { const s = document.createElement("style"); s.textContent = `@font-face{font-family:x-late;src:url(/late.ttf);font-display:swap}`; document.head.appendChild(s); document.getElementById("B").style.height = "auto"; }, 100);
        if (kind === "cssom") setTimeout(() => { const s = document.createElement("style"); document.head.appendChild(s); setTimeout(() => s.sheet.insertRule("#B{height:90px !important}"), 25); }, 100);
      }, kind);
      if (kind === "media") { await p.waitForTimeout(250); await p.setViewportSize({ width: 740, height: 700 }); }
      await p.waitForTimeout(1500);
      const rec = await p.evaluate(() => window.__rec);
      const by = {};
      for (const [f, k, v] of rec) (by[f] ??= {})[k] = v;
      const frames = Object.keys(by).map(Number).sort((a, b) => a - b);
      let mism = 0, firstMove = null, msgFirst = 0; const base = by[frames[0]].rAF;
      for (const f of frames) {
        const r = by[f];
        if (r.stage !== undefined && r.after !== undefined && r.stage !== r.after) mism++;
        if (firstMove === null && r.stage !== undefined && r.stage !== base) firstMove = f;
        if (r.msg !== undefined && r.msg !== base && (r.stage === base || r.stage === undefined) && (by[f + 1]?.rAF ?? base) !== base) msgFirst++;
      }
      const fm = firstMove === null ? "none" : `f${firstMove}: rAF ${by[firstMove].rAF} stage ${by[firstMove].stage} after ${by[firstMove].after} · f${firstMove - 1} msg ${by[firstMove - 1]?.msg}`;
      return `  frames ${frames.length} · frames where the stage-form read ≠ the after-step read: ${mism} · first frame the stage read sees a move: ${fm} · frames whose posted-message read saw a move the frame's own stage read did not: ${msgFirst}`;
    }, { "/late.ttf": { delay: 60, type: "font/ttf", body: FONT } });
} finally {
  await browser.close();
  log(`# done · ${ok} cells, ${err} errors · load ${load()}`);
}
