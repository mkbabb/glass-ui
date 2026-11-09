#!/usr/bin/env node
// D5 pass 15 · S15 (P-E15 part S): library-free engine-fact cells, one browser per run, a fresh context per cell,
// every page, context and the browser closed in a finally. No library byte is loaded. Usage: node facts15.mjs chromium|webkit [cells]
// Cells (each named in P-E15.md §S15-d):
//   K1  M28's mechanism: an empty spacer's margin in a translated, unpositioned card collapses through the card's top edge
//   K2  the composed linear map from computed values against the engine's probe map (affine carriers, nested, zoomed)
//   K3  zoom units: offsets and currentCSSZoom against the painted box, a zoom change on the host, an ancestor, a box before
//   K4  late loads: where a <link> sheet and an image decode land against the frame's resize step
//   K5  the gutter read in the held control's own context (::before) against the consumer's expression
//   K6  Typed OM: computed (not resolved) transform values keep their percentages
//   K7  a transformed link inside a shadow tree the host is slotted through: offsetParent and the offsets
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright");
import { readFileSync } from "node:fs";
import os from "node:os";

const engine = process.argv[2] ?? "chromium";
const only = process.argv[3] ? new Set(process.argv[3].split(",")) : null;
const want = (c) => !only || only.has(c);
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const log = (...a) => console.log(...a);
const ORIGIN = "http://s15.test";
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64");

const browser = await pw[engine].launch({ headless: true });
log(`# S15 facts · ${engine} ${browser.version()} · playwright ${require("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/package.json").version} · load ${load()} at start`);
let pass = 0;
async function cell(name, html, fn, routes = {}) {
  const ctx = await browser.newContext({ viewport: { width: 800, height: 700 }, deviceScaleFactor: 1 });
  try {
    const page = await ctx.newPage();
    try {
      await page.route(`${ORIGIN}/**`, async (r) => {
        const u = new URL(r.request().url()).pathname;
        if (u === "/") return r.fulfill({ status: 200, contentType: "text/html", body: `<!doctype html><meta charset=utf-8><style>html,body{margin:0}body{font:16px/20px sans-serif}</style>${html}` });
        const rt = routes[u];
        if (!rt) return r.fulfill({ status: 404, body: "" });
        if (rt.delay) await new Promise((ok) => setTimeout(ok, rt.delay));
        return r.fulfill({ status: 200, contentType: rt.type, body: rt.body });
      });
      await page.goto(`${ORIGIN}/`);
      const out = await fn(page);
      log(`${name} · load ${load()}\n${typeof out === "string" ? out : JSON.stringify(out, null, 0)}`);
      pass++;
    } finally {
      await page.close();
    }
  } catch (e) {
    log(`${name} · ERROR ${String(e?.message ?? e).split("\n")[0]} · load ${load()}`);
  } finally {
    await ctx.close();
  }
}

try {
  // ── K1 · M28's mechanism ───────────────────────────────────────────────────────────────────────────────
  if (want("K1")) for (const [nm, cstyle] of [
    ["C translated, no padding, no border (E-14 M28's C)", "translate: 0 12px;"],
    ["C translated, padding-top 1px", "translate: 0 12px; padding-top: 1px;"],
    ["C translated, display flow-root", "translate: 0 12px; display: flow-root;"],
    ["C position relative, no padding", "position: relative;"],
  ]) await cell(`K1 ${nm}`, `<div id=G style="padding-top:100px"><p style="margin:0;height:30px">above</p><div id=C style="${cstyle}"><div id=sp></div><div id=H style="height:20px;background:#09c"></div></div></div>`, (p) => p.evaluate(() => {
    const G = document.getElementById("G"), C = document.getElementById("C"), sp = document.getElementById("sp"), H = document.getElementById("H");
    const rd = () => ({ op: H.offsetParent === C ? "C" : H.offsetParent?.id || H.offsetParent?.tagName, hTop: H.offsetTop, cTop: C.offsetTop, cH: C.offsetHeight, paintTop: Math.round(H.getBoundingClientRect().top * 100) / 100 });
    const rows = [];
    for (const m of [0, 10, 40]) { sp.style.marginTop = m + "px"; rows.push({ m, ...rd() }); }
    return rows.map((r) => `  margin ${r.m}: H.offsetParent ${r.op} · H.offsetTop ${r.hTop} · C.offsetTop ${r.cTop} · C.offsetHeight ${r.cH} · H painted top ${r.paintTop}`).join("\n");
  }));

  // ── K2 · the composed linear map from computed values against the probe map ─────────────────────────────
  const K2 = [
    ["none", "", ""],
    ["C rotate 10deg", "rotate: 10deg;", ""],
    ["C scale 0.8", "scale: 0.8;", ""],
    ["C scale 0.8 1.25", "scale: 0.8 1.25;", ""],
    ["C transform rotate(10deg) scale(0.8) skewX(15deg)", "transform: rotate(10deg) scale(0.8) skewX(15deg);", ""],
    ["C transform matrix(0.9,0.2,-0.3,1.1,7,9)", "transform: matrix(0.9,0.2,-0.3,1.1,7,9);", ""],
    ["C translate -50% -50% + rotate 30deg + transform scale(1.2)", "translate: -50% -50%; rotate: 30deg; transform: scale(1.2);", ""],
    ["C rotate 10deg, origin 0 0", "rotate: 10deg; transform-origin: 0 0;", ""],
    ["C rotate 10deg inside G scale 1.25 inside A rotate -25deg", "rotate: 10deg;", "scale: 1.25;"],
    ["C rotateZ via transform rotate3d(0,0,1,20deg)", "transform: rotate3d(0,0,1,20deg);", ""],
    ["C rotateX(40deg) (flattened, no perspective)", "transform: rotateX(40deg);", ""],
    ["C zoom 1.25 + rotate 10deg", "zoom: 1.25; rotate: 10deg;", ""],
    ["G zoom 1.5, C scale 0.8", "scale: 0.8;", "zoom: 1.5;"],
    ["host's own scale 1.06 (excluded: translate composes outside it)", "", "", "scale: 1.06;"],
  ];
  if (want("K2")) for (const [nm, cs, gs, hs = ""] of K2) await cell(`K2 ${nm}`, `<div id=A style="margin:120px 0 0 200px;${nm.includes("inside A") ? "rotate:-25deg;" : ""}"><div id=G style="${gs}"><div id=C style="width:300px;padding:20px;${cs}"><div id=H style="width:120px;height:30px;background:#09c;${hs}"></div></div></div></div>`, (p) => p.evaluate(() => {
    const H = document.getElementById("H");
    const ctr = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    const probe = (t) => { const v = `${t[0]}px ${t[1]}px`; const a = H.animate({ translate: [v, v] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return ctr(H); } finally { a.cancel(); } };
    const P0 = probe([0, 0]), PX = probe([4, 0]), PY = probe([0, 4]);
    const J = [(PX[0] - P0[0]) / 4, (PY[0] - P0[0]) / 4, (PX[1] - P0[1]) / 4, (PY[1] - P0[1]) / 4]; // a b c d: [a b; c d]
    // the composed linear part from computed values: per ancestor, rotate · scale · transform (translate has no linear part), outermost first
    const mul = (m, n) => [m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3], m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3]];
    const lin = (el) => {
      const c = getComputedStyle(el); let L = [1, 0, 0, 1];
      if (c.rotate !== "none") { const parts = c.rotate.split(" "); const ang = parseFloat(parts.at(-1)) * (parts.at(-1).endsWith("rad") ? 180 / Math.PI : parts.at(-1).endsWith("turn") ? 360 : 1); const axisZ = parts.length === 1 || (parts.length === 2 && parts[0] === "z") || (parts.length === 4 && parseFloat(parts[2]) > 0 && !parseFloat(parts[0]) && !parseFloat(parts[1])); if (!axisZ) return null; const r = (ang * Math.PI) / 180; L = mul(L, [Math.cos(r), -Math.sin(r), Math.sin(r), Math.cos(r)]); }
      if (c.scale !== "none") { const s = c.scale.split(" ").map(Number.parseFloat); L = mul(L, [s[0], 0, 0, s[1] ?? s[0]]); }
      if (c.transform !== "none") { const m = new DOMMatrixReadOnly(c.transform); if (m.m34 !== 0 || m.m14 !== 0 || m.m24 !== 0) return null; L = mul(L, [m.a, m.c, m.b, m.d]); }
      return L;
    };
    let K = [1, 0, 0, 1], proj = false;
    for (let e = H.parentElement; e && e !== document.documentElement; e = e.parentElement) { const L = lin(e); if (!L) { proj = true; break; } K = mul(L, K); }
    const z = H.currentCSSZoom ?? 1; const Jc = K.map((x) => x * z);
    const err = Math.max(...J.map((x, i) => Math.abs(x - Jc[i])));
    const f = (a) => a.map((x) => x.toFixed(4)).join(" ");
    return `  probe J [${f(J)}] · computed z·ΠL [${f(Jc)}] (host zoom ${z}) · max |diff| ${proj ? "n/a (projective)" : err.toFixed(5)}`;
  }));

  // ── K3 · zoom units ────────────────────────────────────────────────────────────────────────────────────
  if (want("K3")) for (const [nm, act] of [
    ["the host's own zoom 1 → 1.5", "H.style.zoom = '1.5'"],
    ["the host's own zoom 1 → 0.75", "H.style.zoom = '0.75'"],
    ["an ancestor's zoom 1 → 1.25", "A.style.zoom = '1.25'"],
    ["a box before the host 1 → 1.25", "B.style.zoom = '1.25'"],
    ["an ancestor at 1.25, the host 1 → 1.5", "A.style.zoom = '1.25'; void H.offsetTop; window.__pre = window.__rd(); H.style.zoom = '1.5'"],
  ]) await cell(`K3 ${nm}`, `<div id=A style="position:relative;margin:80px 0 0 40px;padding:10px;border:3px solid #ccc"><div id=B style="height:40px">before</div><div id=H style="position:relative;margin-left:30px;width:200px;height:20px;background:#09c"><span id=I style="display:block;margin:4px 0 0 6px;width:10px;height:6px"></span></div></div>`, (p) => p.evaluate((act) => {
    const A = document.getElementById("A"), B = document.getElementById("B"), H = document.getElementById("H"), I = document.getElementById("I");
    const chain = (el) => { const out = []; for (let e = el; e; e = e.offsetParent) out.push(e); return out; };
    window.__rd = () => {
      const L = chain(I); const z = L.map((e) => e.currentCSSZoom ?? 1);
      const lv = L.map((e) => { const p = e.offsetParent; const cx = !p || p === document.body ? 0 : p.clientLeft, cy = !p || p === document.body ? 0 : p.clientTop; return [e.offsetLeft + cx, e.offsetTop + cy]; });
      const own = lv.reduce((s, x, i) => [s[0] + x[0] * z[i], s[1] + x[1] * z[i]], [0, 0]);
      // S15's Q in root px: each link's offset × its own zoom, plus its offsetParent's client edge × that parent's zoom
      const rootpx = L.reduce((s, e, i) => { const p = e.offsetParent; const pz = p ? (p.currentCSSZoom ?? 1) : 1; const cx = !p || p === document.body ? 0 : p.clientLeft * pz, cy = !p || p === document.body ? 0 : p.clientTop * pz; return [s[0] + e.offsetLeft * z[i] + cx, s[1] + e.offsetTop * z[i] + cy]; }, [0, 0]);
      const par = lv.reduce((s, x, i) => [s[0] + x[0] * (z[i + 1] ?? 1), s[1] + x[1] * (z[i + 1] ?? 1)], [0, 0]);
      const hostu = lv.reduce((s, x, i) => [s[0] + (x[0] * z[i]) / z[0], s[1] + (x[1] * z[i]) / z[0]], [0, 0]);
      const r = I.getBoundingClientRect(), rh = H.getBoundingClientRect();
      return { z: z.map((x) => +x.toFixed(4)), lv, own, rootpx, par, hostu, paint: [r.left, r.top], hostPaint: [rh.left, rh.top, rh.width, rh.height], hostOff: [H.offsetLeft, H.offsetTop, H.offsetWidth, H.offsetHeight] };
    };
    window.__pre = window.__rd();
    new Function("A", "B", "H", act)(A, B, H);
    const post = window.__rd(), pre = window.__pre;
    const d = (k) => [post[k][0] - pre[k][0], post[k][1] - pre[k][1]].map((x) => +x.toFixed(3));
    const tr = (() => { const a = I.animate({ translate: ["10px 0px", "10px 0px"] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const x = I.getBoundingClientRect().left; a.cancel(); return +(x - I.getBoundingClientRect().left).toFixed(3); })();
    return `  (probe point: a span inside the host) zoom chain ${JSON.stringify(pre.z)} → ${JSON.stringify(post.z)}\n  painted Δ ${JSON.stringify(d("paint"))} · Σ lv×own zoom Δ ${JSON.stringify(d("own"))} · Σ lv×parent's zoom Δ ${JSON.stringify(d("par"))} · cand14's host-unit Q Δ ${JSON.stringify(d("hostu"))} · **S15 root-px Q Δ ${JSON.stringify(d("rootpx"))}**\n  absolute: painted ${JSON.stringify(post.paint.map((x) => +x.toFixed(2)))}, Σ lv×own zoom ${JSON.stringify(post.own.map((x) => +x.toFixed(2)))}, Σ lv×parent's zoom ${JSON.stringify(post.par.map((x) => +x.toFixed(2)))}, S15 root-px Q ${JSON.stringify(post.rootpx.map((x) => +x.toFixed(2)))}\n  the host: offsets ${JSON.stringify(pre.hostOff)} → ${JSON.stringify(post.hostOff)} · painted box ${JSON.stringify(pre.hostPaint.map((x) => +x.toFixed(2)))} → ${JSON.stringify(post.hostPaint.map((x) => +x.toFixed(2)))}\n  a 10px translate on the span paints ${tr} px (span zoom ${post.z[0]})`;
  }, act));

  // ── K4 · late loads against the frame's resize step ────────────────────────────────────────────────────
  for (const [nm, inject, routes] of [
    ["a <link> sheet inserted at frame 6 (served after 25 ms) that grows a block above the target by 40 px", "const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/s.css'; l.onload = () => mark('link load event'); document.head.append(l);", { "/s.css": { delay: 25, type: "text/css", body: "#X{height:40px}" } }],
    ["a <link> sheet served after 70 ms", "const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = '/s.css'; l.onload = () => mark('link load event'); document.head.append(l);", { "/s.css": { delay: 70, type: "text/css", body: "#X{height:40px}" } }],
    ["an <img> with no size above the target, served after 25 ms (40 px tall by CSS once it has an intrinsic size)", "const i = new Image(); i.onload = () => mark('img load event'); i.src = '/i.png'; i.style.cssText = 'display:block;height:auto;width:40px'; X.append(i);", { "/i.png": { delay: 25, type: "image/png", body: PNG } }],
  ]) if (want("K4")) await cell(`K4 ${nm}`, `<div style="height:120px"></div><div id=X></div><div id=T style="height:20px;background:#09c"></div>`, (p) => p.evaluate((inject) => new Promise((ok) => {
    const T = document.getElementById("T"), X = document.getElementById("X"); const ev = []; let n = 0;
    const mark = (s) => ev.push(`${s} (between frames ${n} and ${n + 1}; T.offsetTop then ${T.offsetTop})`);
    const ro = new ResizeObserver(() => ev.push(`f${n} resize-step read T.offsetTop ${T.offsetTop}`));
    const ch = new MessageChannel(); ch.port1.onmessage = () => ev.push(`f${n} task after the frame T.offsetTop ${T.offsetTop}`);
    const tick = () => { n++; ev.push(`f${n} rAF (start) T.offsetTop ${T.offsetTop}`); ro.unobserve(T); ro.observe(T); if (n === 6) new Function("X", "mark", inject)(X, mark); ch.port2.postMessage(0); if (n < 22) requestAnimationFrame(tick); else setTimeout(() => { ro.disconnect(); ok(ev); }, 30); };
    requestAnimationFrame(tick);
  }), inject).then((ev) => {
    // the first read that sees the move, and the kind of read it was
    const first = ev.find((x) => /T\.offsetTop (16\d|17\d|180)/.test(x) || /offsetTop 160/.test(x));
    const seen = ev.filter((x) => /offsetTop 160/.test(x));
    return `  first read that sees the move: ${seen[0] ?? "none"}\n  the reads around it: ${ev.slice(Math.max(0, ev.indexOf(seen[0]) - 3), ev.indexOf(seen[0]) + 3).join(" | ")}`;
  }), routes);

  // ── K5 · the gutter read in the held control's own context ─────────────────────────────────────────────
  const REG = `<style>@property --g { syntax: "<length-percentage> | g-unset"; inherits: false; initial-value: g-unset; } .held::before { --g: calc(var(--space-section)); } :root::before { --g: calc(var(--space-section)); } :root { --space-section: 2rem; } .held { padding-inline-start: var(--space-section); }</style>`;
  if (want("K5")) for (const [nm, html] of [
    ["the token on :root (2rem)", `<div><div class=held id=H>x</div></div>`],
    ["2em on the host (font 14px)", `<div><div class=held id=H style="font-size:14px;--space-section:2em">x</div></div>`],
    ["2em on an ancestor (font 20px), the host 14px", `<div style="font-size:20px;--space-section:2em"><div class=held id=H style="font-size:14px">x</div></div>`],
    ["4cqi on an ancestor, an inline-size container of 500px above", `<div style="container-type:inline-size;width:500px"><div style="--space-section:4cqi"><div class=held id=H>x</div></div></div>`],
    ["4cqi, the host itself an inline-size container of 300px inside a 500px one", `<div style="container-type:inline-size;width:500px"><div class=held id=H style="--space-section:4cqi;container-type:inline-size;width:300px">x</div></div>`],
    ["1.5lh on the host (line-height 30px)", `<div><div class=held id=H style="line-height:30px;--space-section:1.5lh">x</div></div>`],
    ["5% on the host", `<div><div class=held id=H style="--space-section:5%">x</div></div>`],
    ["clamp(1rem, 3vw, 3rem) on the host", `<div><div class=held id=H style="--space-section:clamp(1rem, 3vw, 3rem)">x</div></div>`],
  ]) await cell(`K5 ${nm}`, REG + html, (p) => p.evaluate(() => {
    const H = document.getElementById("H");
    const own = getComputedStyle(H, "::before").getPropertyValue("--g").trim();
    const root = getComputedStyle(document.documentElement, "::before").getPropertyValue("--g").trim();
    const consumer = getComputedStyle(H).paddingInlineStart;
    return `  the consumer's padding-inline-start ${consumer} · the read on the host's ::before ${own} · the read on :root::before ${root}`;
  }));

  // ── K6 · Typed OM keeps percentages in computed transform values ───────────────────────────────────────
  if (want("K6")) await cell("K6 computed vs resolved transform values", `<div id=C style="width:200px;height:100px;transform:translate(-50%,-50%) rotate(10deg);translate:-25% 10%;transform-origin:50% 50%">c</div>`, (p) => p.evaluate(() => {
    const C = document.getElementById("C"); const has = typeof C.computedStyleMap === "function";
    const cs = getComputedStyle(C);
    let tom = "computedStyleMap absent";
    if (has) { const m = C.computedStyleMap(); const t = m.get("transform"); const tr = m.get("translate"); tom = `computedStyleMap transform ${t?.toString?.()} (${t?.constructor?.name}; first component ${t?.[0]?.constructor?.name} x ${t?.[0]?.x?.toString?.()}) · translate ${tr?.toString?.()} (${tr?.constructor?.name})`; }
    return `  getComputedStyle transform ${cs.transform} · translate ${cs.translate} · transform-origin ${cs.transformOrigin}\n  ${tom}`;
  }));

  // ── K7 · a transformed link inside a shadow tree the host is slotted through ───────────────────────────
  if (want("K7")) for (const mode of ["open", "closed"]) await cell(`K7 shadow ${mode}`, `<div id=SH style="margin:100px 0 0 50px"><div id=H style="height:20px;background:#09c"></div></div><script>const s = document.getElementById('SH').attachShadow({ mode: '${mode}' }); s.innerHTML = '<div id=c style="scale:0.8;transform-origin:0 0;padding:6px"><div id=pad style="height:0"></div><slot></slot></div>'; window.__pad = s.getElementById('pad'); window.__c = s.getElementById('c');</script>`, (p) => p.evaluate(() => {
    const H = document.getElementById("H"); const op = H.offsetParent;
    const rd = () => ({ op: op === null ? "null" : op === window.__c ? "the shadow-internal card" : op.id || op.tagName, top: H.offsetTop, left: H.offsetLeft, paint: +H.getBoundingClientRect().top.toFixed(3) });
    const a = rd(); window.__pad.style.height = "40px"; const b = rd();
    return `  before: offsetParent ${a.op}, offsetTop ${a.top}, painted top ${a.paint} · after a 40 px insert inside the shadow card above the slot: offsetParent ${b.op}, offsetTop ${b.top} (Δ ${b.top - a.top}), painted Δ ${(b.paint - a.paint).toFixed(3)} (the card's scale 0.8)`;
  }));
} finally {
  await browser.close();
  log(`# end · ${pass} cells written · load ${load()}`);
}
