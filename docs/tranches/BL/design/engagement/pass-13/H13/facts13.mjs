#!/usr/bin/env node
// H13 (D5 pass 13): the engine facts the derivation rests on, LIBRARY-FREE (a page set by setContent, no glass-ui). Not a witness.
//   node facts13.mjs <chromium|webkit>
//   A · scroll adjustments: when an engine's scroll anchoring (an insert or a removal above the viewport, page and inner scroller) and
//       its scrollTop clamp (a removal that shrinks the scrollable overflow, page and inner scroller) reach what script reads, read at
//       four points after the act: synchronously (a forced layout), in the MutationObserver callback, in the ResizeObserver step of the
//       same frame, and in a task posted after that frame's paint. Each prints the scroll offset and the target's painted top.
//   B · the token grammar per engine: for every value form of a <time>, a <number> and a <length>, and of an easing, what CSS computes
//       (on a consumer property through calc(var(--x) * 1) or var(--x)), what the custom property's computed text is, and what the Typed
//       OM (CSSNumericValue.parse(text).to(unit)) makes of that text; registered properties' computed text for math forms
//   C · paint maps: a translate written on a box under each card transform, read through getBoundingClientRect: whether the painted
//       move equals the card's linear part applied to the translate (rotate, skew, matrix, perspective), the fact a glide in the host's
//       own px rests on
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const L = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
console.log(`# facts13 ${engine} · load ${L()} · playwright ${pw.chromium ? "ok" : "?"}`);
const browser = await pw[engine].launch({ headless: true });
try {
  console.log(`# browser ${browser.version()}`);
  // ── A · scroll adjustments ──
  const scenes = {
    "anchor page insert above": { scroller: false, act: "insert-top", setup: "page" },
    "anchor page remove above": { scroller: false, act: "remove-top", setup: "page" },
    "anchor scroller insert above": { scroller: true, act: "insert-top", setup: "box" },
    "anchor scroller remove above": { scroller: true, act: "remove-top", setup: "box" },
    "clamp page remove below": { scroller: false, act: "remove-end", setup: "page-end" },
    "clamp scroller remove below": { scroller: true, act: "remove-end", setup: "box-end" },
  };
  for (const [name, s] of Object.entries(scenes)) {
    const ctx = await browser.newContext({ viewport: { width: 600, height: 500 } });
    try {
      const page = await ctx.newPage();
      const inner = `<div id="pre" style="height:40px;background:#ccc"></div><div id="sp" style="height:600px"></div><div id="tgt" style="height:40px;background:#36c"></div><div id="tail" style="height:${s.setup.endsWith("end") ? 60 : 1200}px"></div><div id="end" style="height:40px;background:#c63"></div>`;
      await page.setContent(s.scroller ? `<body style="margin:0"><div style="height:80px"></div><div id="box" style="overflow:auto;height:300px">${inner}</div><div style="height:1400px"></div></body>` : `<body style="margin:0">${inner}</body>`);
      const r = await page.evaluate(([s]) => new Promise((ok) => {
        const box = document.getElementById("box"); const sc = box ?? document.scrollingElement; const tgt = document.getElementById("tgt");
        if (s.setup.endsWith("end")) sc.scrollTop = sc.scrollHeight; else sc.scrollTop = 600 + 40 - 100;
        const rd = (at) => ({ at, st: +sc.scrollTop.toFixed(2), top: +tgt.getBoundingClientRect().top.toFixed(2) });
        const out = []; const beat = document.createElement("span"); beat.style.cssText = "position:fixed;width:1px;height:1px;left:0;top:0"; document.body.appendChild(beat);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          out.push(rd("before"));
          const mo = new MutationObserver(() => { out.push(rd("mutation callback")); mo.disconnect(); }); mo.observe(document.body, { childList: true, subtree: true });
          if (s.act === "insert-top") { const b = document.createElement("div"); b.style.height = "40px"; (box ?? document.body).insertBefore(b, (box ?? document.body).firstChild); }
          else if (s.act === "remove-top") document.getElementById("pre").remove(); else document.getElementById("end").remove();
          const ro = new ResizeObserver(() => { out.push(rd("resize step")); ro.disconnect(); }); queueMicrotask(() => { ro.observe(beat); });
          out.push(rd("sync (forced layout)"));
          requestAnimationFrame(() => { out.push(rd("next rAF")); const ch = new MessageChannel(); ch.port1.onmessage = () => { out.push(rd("after the next paint")); ok(out); }; ch.port2.postMessage(0); });
        }));
      }), [s]);
      console.log(`A ${name}: ${r.map((x) => `${x.at} st ${x.st} top ${x.top}`).join(" · ")}`);
    } finally { await ctx.close(); }
  }
  // ── B · the token grammar ──
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  try {
    await page.setContent(`<style>@property --rn { syntax: "<number>"; inherits: true; initial-value: 0; } @property --rl { syntax: "<length>"; inherits: true; initial-value: 0px; } @property --rt { syntax: "<time>"; inherits: true; initial-value: 0s; }</style><div id="p"></div>`);
    const TIME = ["210ms", "0.21s", "210MS", "0.21S", "2.1e2ms", "+0.21s", "/* c */ 210ms", "-0s", "210", "210ms, 0.3s", "inherit", "calc(0.1s + 110ms)", "calc(105ms * 2)", "min(210ms, 1s)", "max(210ms, 0.1s)", "clamp(100ms, 210ms, 1s)", "calc(var(--h13-undefined, 210ms))", "var(--h13-undefined, 210ms)", "calc(calc(105ms) * 2)", "round(nearest, 214ms, 10ms)", "abs(-210ms)", "calc(1s * 0.21)", "calc(infinity * 1s)", "1e-3s", "nonsense"];
    const NUM = ["1.06", "calc(1 + 0.06)", "min(1.06, 2)", "max(1.06, 1)", "clamp(1, 1.06, 2)", "calc(var(--h13-undefined, 1.06))", "1.06E0", "+1.06", "/* c */ 1.06", "1.06abc", "nonsense"];
    const LEN = ["16px", "1rem", "calc(0.5rem + 8px)", "max(16px, 1rem)", "clamp(0px, 16px, 2rem)", "min(16px, 5vw)", "calc(var(--h13-undefined, 16px))", "5%", "calc(-1rem)", "nonsense"];
    const EASE = ["ease-in", "EASE-IN-OUT", "linear(0, 0.5 50%, 1)", "steps(2, jump-none)", "step-end", "/* c */ ease-in", "var(--h13-undefined, ease-in)", "cubic-bezier(0, 2, 1, -1)", "cubic-bezier(1.5, 0, 0, 1)", "steps(0)", "ease, linear", "inherit", "nonsense"];
    const rows = await page.evaluate(([TIME, NUM, LEN, EASE]) => {
      const p = document.getElementById("p"); const out = [];
      const typed = (text, unit) => { if (typeof CSSNumericValue === "undefined") return "no CSSNumericValue"; try { return String(+CSSNumericValue.parse(text).to(unit).value.toFixed(4)); } catch (e) { return `THROWS ${String(e?.name ?? e)}`; } };
      for (const v of TIME) { p.style.cssText = ""; p.style.setProperty("--x", v); const raw = getComputedStyle(p).getPropertyValue("--x").trim(); p.style.setProperty("transition-duration", "calc(var(--x) * 1)"); const d = getComputedStyle(p).transitionDuration; p.style.setProperty("--rt", v); const reg = getComputedStyle(p).getPropertyValue("--rt").trim();
        out.push(`B time ${JSON.stringify(v)}: computed text ${JSON.stringify(raw)} · CSS transition-duration ${d} · Typed OM ${typed(raw, "ms")} · registered <time> ${JSON.stringify(reg)}`); }
      for (const v of NUM) { p.style.cssText = ""; p.style.setProperty("--x", v); const raw = getComputedStyle(p).getPropertyValue("--x").trim(); p.style.setProperty("scale", "var(--x)"); const s = getComputedStyle(p).scale; p.style.setProperty("--rn", v); const reg = getComputedStyle(p).getPropertyValue("--rn").trim();
        out.push(`B number ${JSON.stringify(v)}: computed text ${JSON.stringify(raw)} · CSS scale ${s} · Typed OM ${typed(raw, "number")} · registered <number> ${JSON.stringify(reg)}`); }
      for (const v of LEN) { p.style.cssText = "position:absolute;height:1px"; p.style.setProperty("--x", v); const raw = getComputedStyle(p).getPropertyValue("--x").trim(); p.style.setProperty("width", "var(--x)"); const w = getComputedStyle(p).width; p.style.setProperty("shape-margin", "var(--x)"); const sm = getComputedStyle(p).shapeMargin; p.style.setProperty("--rl", v); const reg = getComputedStyle(p).getPropertyValue("--rl").trim();
        out.push(`B length ${JSON.stringify(v)}: computed text ${JSON.stringify(raw)} · CSS width ${w} · shape-margin ${sm} · Typed OM ${typed(raw, "px")} · Typed OM of shape-margin ${typed(sm, "px")} · registered <length> ${JSON.stringify(reg)}`); }
      for (const v of EASE) { p.style.cssText = ""; p.style.setProperty("--x", v); const raw = getComputedStyle(p).getPropertyValue("--x").trim(); let ke; try { ke = `takes ${new KeyframeEffect(null, null, { easing: raw }).getTiming().easing}`; } catch (e) { ke = `refuses (${String(e?.name ?? e)})`; } p.style.setProperty("transition-timing-function", "var(--x)"); const tf = getComputedStyle(p).transitionTimingFunction;
        out.push(`B easing ${JSON.stringify(v)}: computed text ${JSON.stringify(raw)} · KeyframeEffect ${ke} · CSS transition-timing-function ${tf} · CSS.supports(animation-timing-function) ${CSS.supports("animation-timing-function", raw || "x")}`); }
      return out;
    }, [TIME, NUM, LEN, EASE]);
    for (const x of rows) console.log(x);
    // ── C · paint maps ──
    const CARDS = { "rotate 10deg": "rotate:10deg;transform-origin:0 0", "skewX 15deg": "transform:skewX(15deg);transform-origin:0 0", "skewY 8deg": "transform:skewY(8deg);transform-origin:0 0", "matrix rot+scale": "transform:matrix(0.788,0.139,-0.139,0.788,0,0);transform-origin:0 0", "perspective rotateX 25deg": "transform:perspective(600px) rotateX(25deg)", "translate 0 20%": "translate:0 20%" };
    for (const [n, css] of Object.entries(CARDS)) {
      const r = await page.evaluate((css) => { document.body.innerHTML = `<div style="height:200px"></div><div id="c" style="${css};width:300px;padding:40px"><div id="h" style="width:100px;height:20px;background:#36c"></div></div>`; const h = document.getElementById("h"); const ctr = () => { const q = h.getBoundingClientRect(); return [q.left + q.width / 2, q.top + q.height / 2]; };
        const a = ctr(); h.style.translate = "0 40px"; const b = ctr(); h.style.translate = "40px 0"; const c = ctr(); h.style.translate = ""; return { dy: [b[0] - a[0], b[1] - a[1]].map((x) => +x.toFixed(3)), dx: [c[0] - a[0], c[1] - a[1]].map((x) => +x.toFixed(3)) }; }, css);
      console.log(`C ${n}: a translate 0 40px on the host paints (${r.dy.join(", ")}); 40px 0 paints (${r.dx.join(", ")})`);
    }
  } finally { await ctx.close(); }
} finally { await browser.close(); console.log(`# end · load ${L()}`); }
