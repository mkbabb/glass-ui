#!/usr/bin/env node
// S14 (D5 pass 14, part S): the engine facts S14's formulation adds, LIBRARY-FREE (a page set by setContent, no glass-ui).
// Not a witness and not a candidate cell. Each cell is a fresh context; one browser per run; everything closed in a finally.
//   node facts14.mjs <chromium|webkit> [cell,cell,...]
//   N1  the layout read: paused composite-replace WAAPI animations of transform/translate/rotate/scale on the host and every
//       ancestor give getBoundingClientRect() the host's untransformed layout box, in the same task, under each carrier kind;
//       0 mutation records; cancel restores paint and leaves every running animation's time unchanged
//   N1c the same read inside a scroller scrolled to its end whose scrollable overflow a transform extends: does the offset clamp
//   N2  the resize step (a ResizeObserver re-observed each frame from the stage's rAF) runs after every rAF callback of the frame,
//       those requested before the stage's and after it, and sees moves with no record (a <link> sheet, a shadow edit, a
//       field-sizing value, an insertRule) on the frame they first lay out
//   N3  scroll offsets: fractional or not; anchoring and the clamp as the resize step reads them
//   N4  a registered read DECLARED in the stylesheet (no inline write) under `transition: all` in each engine, at load and after the
//       token changes at runtime; beside the inline write (F7's form)
//   N5  a union syntax `<time> | stage-unset` (ident initial): accepted; math taken; refusal reads the ident, never a time
//   N6  getComputedTiming().progress under a linear() easing equals the painted offset's fraction (the glide's current offset)
//   N7  the consumer's expression for --scale-engage, declared as the read, against the consumer's own `scale`
//   N9  a root-substituted clock: --d: calc(var(--s) * var(--t)) on :root, an ancestor overriding --s and --t; the host's
//       transition-duration, the declared read of var(--d), and the read of var(--s) × the host's --t; tempo 0 and -1
//   N11 a step outside a projective carrier: true Newton (the map re-asked each iteration) against the chord step, residual per
//       iteration; and a step inside it compensated by −Δ (in-frame)
//   N8  axis lengths of the probe map against the bounding-box ratio, rotate/skew/scale, on two track aspects
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const only = process.argv[3] ? new Set(process.argv[3].split(",")) : null;
const L = () => os.loadavg().map((x) => x.toFixed(2)).join("/");
const DOCK = "linear(0, 0.00382 2.041%, 0.03097 6.122%, 0.10587 12.245%, 0.20383 18.367%, 0.31051 24.490%, 0.41651 30.612%, 0.51599 36.735%, 0.60570 42.857%, 0.68419 48.980%, 0.75118 55.102%, 0.80717 61.224%, 0.85309 67.347%, 0.89012 73.469%, 0.91947 79.592%, 0.94237 85.714%, 0.95993 91.837%, 0.97317 97.959%, 1)";
const BASE = `<!doctype html><meta charset=utf-8><style>
@property --r-time { syntax: "<time>"; inherits: false; initial-value: -1s; }
@property --r-num { syntax: "<number>"; inherits: false; initial-value: -1; }
@property --u-time { syntax: "<time> | stage-unset"; inherits: false; initial-value: stage-unset; }
@property --u-num { syntax: "<number> | stage-unset"; inherits: false; initial-value: stage-unset; }
@property --u-len { syntax: "<length> | stage-unset"; inherits: false; initial-value: stage-unset; }
@property --g { syntax: "<number>"; inherits: false; initial-value: 0; }
html, body { margin: 0; } </style><body></body>`;
console.log(`# facts14 ${engine} · ${new Date().toISOString()} · load ${L()}`);
const browser = await pw[engine].launch({ headless: true });
const cell = async (name, fn, arg) => {
  if (only && !only.has(name.split(" ")[0])) return;
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  try {
    const page = await ctx.newPage();
    await page.setContent(BASE);
    console.log(`## ${name} · load ${L()}`);
    console.log(await page.evaluate(fn, arg));
  } catch (e) {
    console.log(`## ${name} ERROR ${String(e).slice(0, 400)}`);
  } finally {
    await ctx.close();
  }
  console.log(`## end ${name.split(" ")[0]} · load ${L()}`);
};
try {
  console.log(`# browser ${browser.version()}`);

  await cell("N1 layout read by paused replace animations, per carrier kind", async () => {
    const f = (v) => v.toFixed(3);
    const ctr = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
    const neutral = (el) => {
      const out = [];
      for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
        const a = e.animate({ transform: ["none", "none"], translate: ["none", "none"], rotate: ["none", "none"], scale: ["none", "none"] }, { duration: 1, fill: "both" });
        a.pause();
        out.push(a);
      }
      return () => out.forEach((a) => a.cancel());
    };
    const scene = (carrier, extraCss = "") => {
      document.body.innerHTML = `<style>@keyframes kf { from { translate: 0 -40px } to { translate: 0 0 } } ${extraCss}</style>
        <div id=g style="position:absolute;left:100px;top:100px;width:420px;height:320px">
          <div id=c style="margin:20px;padding:10px;width:300px;height:200px;${carrier}">
            <div style="height:30.5px"></div><div id=h style="width:120.25px;height:20px;margin-left:40.4px"></div></div></div>`;
      return { g: document.getElementById("g"), c: document.getElementById("c"), h: document.getElementById("h") };
    };
    // control: the same scene with no carrier, read plain
    let s = scene("");
    const ctrl = ctr(s.h);
    const kinds = [
      ["none", "", null],
      ["rotate 10deg (sheet)", "rotate: 10deg", null],
      ["inline translate", "", (s) => { s.c.style.translate = "30px 12.5px"; }],
      ["perspective(400px) rotateX(40deg) origin 50% 0", "transform: perspective(400px) rotateX(40deg); transform-origin: 50% 0", null],
      ["css transition scale mid-flight", "transition: scale 2s linear", async (s) => { s.c.getBoundingClientRect(); s.c.style.scale = "0.8"; await new Promise((r) => setTimeout(r, 300)); }],
      ["@keyframes translate running", "animation: kf 2s linear", async () => { await new Promise((r) => setTimeout(r, 300)); }],
      ["waapi add translate running", "", async (s) => { s.c.animate({ translate: ["0 0", "50px 0"] }, { duration: 2000, composite: "add" }); await new Promise((r) => setTimeout(r, 300)); }],
      ["nested: g rotate 15deg, c scale 0.8", "scale: 0.8", (s) => { s.g.style.rotate = "15deg"; }],
      ["host own scale 1.06 + add translate (a glide)", "", (s) => { s.h.style.scale = "1.06"; s.h.animate({ translate: ["12px 7px", "0 0"] }, { duration: 2000, composite: "add" }); }],
      ["!important sheet transform", "", null, "#c { transform: rotate(10deg) !important; }"],
      ["inline !important rotate", "", (s) => { s.c.style.setProperty("rotate", "10deg", "important"); }],
    ];
    const out = [`control (no carrier) host centre ${f(ctrl.x)},${f(ctrl.y)}`];
    for (const [name, css, setup, extra] of kinds) {
      s = scene(css, extra ?? "");
      if (setup) await setup(s);
      const recs = [];
      const mo = new MutationObserver((r) => recs.push(...r));
      mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
      const anims = document.getAnimations();
      const times0 = anims.map((a) => a.currentTime);
      const before = ctr(s.h);
      const undo = neutral(s.h);
      const lay = ctr(s.h);
      undo();
      const after = ctr(s.h);
      const times1 = anims.map((a) => a.currentTime);
      const n1 = document.getAnimations().length;
      recs.push(...mo.takeRecords());
      mo.disconnect();
      const d = Math.hypot(lay.x - ctrl.x, lay.y - ctrl.y);
      out.push(`${name}: painted ${f(before.x)},${f(before.y)} · neutralized ${f(lay.x)},${f(lay.y)} · |neutralized − control| ${f(d)} ${d <= 0.01 ? "EQUAL" : "DIFFERS"} · restored ${f(Math.hypot(after.x - before.x, after.y - before.y))} · records ${recs.length} · anims ${anims.length}→${n1} · times ${times0.map((t) => f(Number(t))).join("/")}→${times1.map((t) => f(Number(t))).join("/")}`);
    }
    return out.join("\n");
  });

  await cell("N1c the layout read inside a scroller at its end whose overflow a transform extends", async () => {
    const out = [];
    const neutral = (el) => {
      const out = [];
      for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
        const a = e.animate({ transform: ["none", "none"], translate: ["none", "none"], rotate: ["none", "none"], scale: ["none", "none"] }, { duration: 1, fill: "both" });
        a.pause();
        out.push(a);
      }
      return () => out.forEach((a) => a.cancel());
    };
    for (const [name, css] of [["translate 0 300px", "translate: 0 300px"], ["scale 2 origin top", "scale: 2; transform-origin: 50% 0"], ["rotate 30deg", "rotate: 30deg"]]) {
      for (const anchor of ["auto", "none"]) {
        document.body.innerHTML = `<div id=s style="position:absolute;left:50px;top:50px;width:300px;height:200px;overflow:auto;overflow-anchor:${anchor}">
          <div style="height:600px"></div><div id=c style="height:100px;${css}"><div id=h style="height:20px;width:100px"></div></div></div>`;
        const sc = document.getElementById("s");
        const h = document.getElementById("h");
        sc.scrollTop = sc.scrollHeight;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const t0 = sc.scrollTop, H0 = sc.scrollHeight;
        let ev = 0;
        sc.addEventListener("scroll", () => ev++);
        const undo = neutral(h);
        h.getBoundingClientRect();
        const t1 = sc.scrollTop, H1 = sc.scrollHeight;
        undo();
        h.getBoundingClientRect();
        const t2 = sc.scrollTop, H2 = sc.scrollHeight;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const t3 = sc.scrollTop;
        out.push(`${name} · overflow-anchor ${anchor}: scrollTop ${t0} (scrollHeight ${H0}) → during ${t1} (${H1}) → after cancel ${t2} (${H2}) → two frames later ${t3} · scroll events ${ev} · ${t3 === t0 ? "UNMOVED" : "MOVED " + (t3 - t0)}`);
      }
    }
    return out.join("\n");
  });

  await cell("N2 the resize step against rAF callbacks before and after the stage's, and moves with no record", async () => {
    document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:40px;width:500px">
      <div id=c style="padding:10px"><div id=top></div><div id=h style="height:20px;width:200px"></div>
      <textarea id=ta style="field-sizing:content;font:16px/20px monospace;width:200px;padding:0;border:0">x</textarea>
      <div id=sh></div><div id=ln class=ln></div><div id=om class=om></div></div></div>`;
    const h = document.getElementById("h");
    const c = document.getElementById("c");
    const root = document.getElementById("sh").attachShadow({ mode: "open" });
    root.innerHTML = `<div style="height:10px"></div>`;
    const below = document.getElementById("ta");
    const y = (el) => el.getBoundingClientRect().top;
    const log = [];
    let frame = 0;
    const order = [];
    const ro = new ResizeObserver(() => { order.push(`RO${frame}`); log[frame] = { ...(log[frame] ?? {}), ro: y(h), roBelow: y(document.getElementById("om")) }; });
    const A = () => { order.push(`A${frame + 1}`); if (frame + 1 === 4) c.style.translate = "0 10px"; if (frame + 1 < 30) requestAnimationFrame(A); };
    const S = () => {
      frame += 1;
      order.push(`S${frame}`);
      log[frame] = { ...(log[frame] ?? {}), s: y(h), sBelow: y(document.getElementById("om")) };
      ro.unobserve(h); ro.observe(h);
      if (frame < 30) requestAnimationFrame(S);
    };
    const B = () => { order.push(`B${frame}`); if (frame === 7) { const d = document.createElement("div"); d.style.height = "25px"; document.getElementById("top").append(d); } if (frame < 30) requestAnimationFrame(B); };
    requestAnimationFrame(A);
    requestAnimationFrame(S);
    requestAnimationFrame(B);
    // tasks between frames: moves with no record on h's subtree below h (they move the #om marker, which sits below them)
    const at = (n, fn) => { const t = () => (frame >= n ? fn() : setTimeout(t, 4)); setTimeout(t, 4); };
    at(10, () => { below.value = "x\ny\nz\nw"; });
    at(14, () => { root.firstElementChild.style.height = "50px"; });
    at(18, () => { const u = URL.createObjectURL(new Blob([".ln { height: 40px }"], { type: "text/css" })); const l = document.createElement("link"); l.rel = "stylesheet"; l.href = u; document.head.append(l); });
    at(22, () => { document.styleSheets[0].insertRule(".om { margin-top: 30px }", 0); });
    await new Promise((r) => setTimeout(r, 1500));
    ro.disconnect();
    const rows = [];
    for (let k = 1; k < log.length; k++) {
      const e = log[k];
      if (!e) continue;
      const prev = log[k - 1] ?? e;
      const tag = [];
      if (e.s !== prev.ro) tag.push(`h moved before S (${(e.s - prev.ro).toFixed(2)})`);
      if (e.ro !== e.s) tag.push(`h moved between S and RO (${(e.ro - e.s).toFixed(2)})`);
      if (e.sBelow !== prev.roBelow) tag.push(`marker moved before S (${(e.sBelow - prev.roBelow).toFixed(2)})`);
      if (e.roBelow !== e.sBelow) tag.push(`marker moved between S and RO (${(e.roBelow - e.sBelow).toFixed(2)})`);
      if (tag.length) rows.push(`frame ${k}: ${tag.join("; ")}`);
    }
    const ord = order.slice(0, 40).join(" ");
    const roAfterAll = log.every((e, k) => !e || k === 0 || order.indexOf(`RO${k}`) > Math.max(order.indexOf(`A${k}`), order.indexOf(`B${k}`)));
    return `order (first 40): ${ord}\nRO after every rAF callback of its frame: ${roAfterAll}\n${rows.join("\n")}`;
  });

  await cell("N3 scroll offsets, anchoring and the clamp at the resize step", async () => {
    const out = [];
    document.body.innerHTML = `<div id=s style="width:300px;height:200px;overflow:auto"><div style="height:2000px"></div></div>`;
    const sc = document.getElementById("s");
    sc.scrollTo(0, 100.5);
    out.push(`scrollTo(0, 100.5) → scrollTop ${sc.scrollTop}`);
    sc.scrollTop = 33.25;
    out.push(`scrollTop = 33.25 → ${sc.scrollTop}`);
    for (const act of ["insert above (anchoring)", "remove below (clamp)"]) {
      document.body.innerHTML = `<div id=s style="width:300px;height:300px;overflow:auto;overflow-anchor:auto"><div id=a style="height:500px"></div><div id=h style="height:20px"></div><div id=b style="height:300px"></div></div>`;
      const s = document.getElementById("s");
      const h = document.getElementById("h");
      s.scrollTop = act.startsWith("insert") ? 420 : s.scrollHeight;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const top0 = h.getBoundingClientRect().top, st0 = s.scrollTop, sh0 = s.scrollHeight;
      let seen = null;
      const ro = new ResizeObserver(() => { seen = { top: h.getBoundingClientRect().top, st: s.scrollTop, sh: s.scrollHeight }; });
      await new Promise((r) => requestAnimationFrame(() => {
        if (act.startsWith("insert")) { const d = document.createElement("div"); d.style.height = "40px"; s.insertBefore(d, document.getElementById("a")); }
        else document.getElementById("b").style.height = "260px";
        ro.observe(h);
        requestAnimationFrame(r);
      }));
      ro.disconnect();
      out.push(`${act}: before top ${top0} scrollTop ${st0} scrollHeight ${sh0} · at the resize step top ${seen?.top} scrollTop ${seen?.st} scrollHeight ${seen?.sh}`);
    }
    return out.join("\n");
  });

  await cell("N4 a declared registered read under transition: all, at load and after a runtime token change", async () => {
    const out = [];
    for (const tr of ["none", "all 300ms linear", "transition-property: all; transition-duration: 150ms"]) {
      const trCss = tr.startsWith("transition-property") ? tr : `transition: ${tr}`;
      document.documentElement.style.setProperty("--tok", "0.21s");
      document.body.innerHTML = `<style>.h { --u-time: var(--tok); ${trCss}; }</style><div class=h id=h></div><div id=i style="${trCss}"></div>`;
      const h = document.getElementById("h");
      const i = document.getElementById("i");
      const rd = () => getComputedStyle(h).getPropertyValue("--u-time").trim();
      const inl = () => { i.style.setProperty("--u-time", "var(--tok)"); const v = getComputedStyle(i).getPropertyValue("--u-time").trim(); i.style.removeProperty("--u-time"); return v; };
      const r = [`load ${rd()} (inline write ${inl()})`];
      await new Promise((res) => setTimeout(res, 60));
      r.push(`+60ms ${rd()}`);
      document.documentElement.style.setProperty("--tok", "0.5s");
      r.push(`token → 0.5s: +0 ${rd()} (inline ${inl()})`);
      await new Promise((res) => setTimeout(res, 100));
      r.push(`+100 ${rd()}`);
      await new Promise((res) => setTimeout(res, 400));
      r.push(`+500 ${rd()}`);
      out.push(`${trCss}: ${r.join(" · ")}`);
    }
    return out.join("\n");
  });

  await cell("N5 the union syntax with an ident initial: accepted, math, refusal", async () => {
    const forms = ["0.21s", "210ms", "calc(0.1s + 110ms)", "0.1s + 110ms", "-0.21s", "calc(0.21s * -1)", "0s", "nonsense", "1", "initial"];
    const out = [];
    for (const f of forms) {
      document.documentElement.style.setProperty("--tok", f);
      document.body.innerHTML = `<style>.h { --u-time: var(--tok); --r-time: var(--tok); }</style><div class=h id=h></div>`;
      const cs = getComputedStyle(document.getElementById("h"));
      out.push(`${f}: union ${JSON.stringify(cs.getPropertyValue("--u-time").trim())} · plain <time> ${JSON.stringify(cs.getPropertyValue("--r-time").trim())}`);
    }
    document.documentElement.style.setProperty("--tok", "1 + 0.06");
    document.body.innerHTML = `<style>.h { --u-num: calc(1 + (var(--tok) - 1) * 1); --u-len: var(--nope); }</style><div class=h id=h></div>`;
    const cs = getComputedStyle(document.getElementById("h"));
    out.push(`<number> | ident, calc(1 + (1 + 0.06 - 1) * 1): ${JSON.stringify(cs.getPropertyValue("--u-num").trim())} · <length> | ident of an unset var: ${JSON.stringify(cs.getPropertyValue("--u-len").trim())}`);
    return out.join("\n");
  });

  await cell("N6 the glide's current offset from getComputedTiming().progress under the dock easing", async (DOCK) => {
    document.body.innerHTML = `<div id=e style="width:10px;height:10px"></div>`;
    const e = document.getElementById("e");
    const a = e.animate({ translate: ["40px 0", "0 0"] }, { duration: 1000, easing: DOCK, composite: "add" });
    a.pause();
    const out = [];
    let worst = 0;
    for (const t of [0, 50, 100, 250, 400, 600, 800, 950, 999]) {
      a.currentTime = t;
      const p = a.effect.getComputedTiming().progress;
      const tx = Number.parseFloat(getComputedStyle(e).translate);
      const rect = e.getBoundingClientRect().left;
      const d = Math.abs(40 * (1 - p) - rect);
      worst = Math.max(worst, d);
      out.push(`t ${t}: progress ${p.toFixed(5)} · 40·(1−p) ${(40 * (1 - p)).toFixed(3)} · painted left ${rect.toFixed(3)} · computed translate ${tx}`);
    }
    a.cancel();
    return `${out.join("\n")}\nworst |40·(1−progress) − painted| ${worst.toFixed(4)} px`;
  }, DOCK);

  await cell("N7 the consumer's expression for --scale-engage declared as the read, against the consumer's scale", async () => {
    const out = [];
    for (const f of ["1.06", "calc(1.06)", "1 + 0.06", "2 * 0.53", "106%", "abs(-1.06)", "nonsense", "0.95"]) {
      document.documentElement.style.setProperty("--scale-engage", f);
      document.body.innerHTML = `<style>.h { --g: 1; scale: calc(1 + (var(--scale-engage) - 1) * var(--g)) calc(1 + (var(--scale-engage) - 1) * var(--g)); --u-num: calc(1 + (var(--scale-engage) - 1) * 1); }
        .p { --u-num: var(--scale-engage); }</style><div class=h id=h></div><div class=p id=p></div>`;
      const cs = getComputedStyle(document.getElementById("h"));
      out.push(`${f}: consumer scale ${JSON.stringify(cs.scale)} · declared read of the consumer's expression ${JSON.stringify(cs.getPropertyValue("--u-num").trim())} · read of the bare token ${JSON.stringify(getComputedStyle(document.getElementById("p")).getPropertyValue("--u-num").trim())}`);
    }
    return out.join("\n");
  });

  await cell("N9 a root-substituted clock, an ancestor override, tempo 0 and -1", async () => {
    const out = [];
    for (const [rootT, ancCss] of [["1", ""], ["1", "--s: 0.5s; --t: 2;"], ["0", ""], ["-1", ""], ["2", "--t: 1;"]]) {
      document.documentElement.style.cssText = `--s: 0.21s; --t: ${rootT}; --d: calc(var(--s) * var(--t));`;
      document.body.innerHTML = `<style>.h { transition: opacity linear; transition-duration: var(--d); --u-time: var(--d); --r-time: var(--s); }</style>
        <div style="${ancCss}"><div class=h id=h></div></div>`;
      const cs = getComputedStyle(document.getElementById("h"));
      const t = getComputedStyle(document.getElementById("h")).getPropertyValue("--t").trim();
      out.push(`root --t ${rootT}, ancestor {${ancCss}}: host transition-duration ${cs.transitionDuration} · declared read of var(--d) ${JSON.stringify(cs.getPropertyValue("--u-time").trim())} · read of var(--s) ${cs.getPropertyValue("--r-time").trim()} × host --t ${t}`);
    }
    return out.join("\n");
  });

  await cell("N11 a step outside and inside a projective carrier: Newton per iteration against the chord step", async () => {
    const ctr = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
    const probe = (el, x, y) => { const a = el.animate({ translate: [`${x}px ${y}px`, `${x}px ${y}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return ctr(el); } finally { a.cancel(); } };
    const jac = (el, tx, ty) => { const p = probe(el, tx, ty), px = probe(el, tx + 1, ty), py = probe(el, tx, ty + 1); return { p, a: px.x - p.x, b: py.x - p.x, c: px.y - p.y, d: py.y - p.y }; };
    const solve = (J, dx, dy) => { const det = J.a * J.d - J.b * J.c; return { x: (J.d * dx - J.b * dy) / det, y: (-J.c * dx + J.a * dy) / det }; };
    const out = [];
    let worst = { in: 0, chord: 0, n1: 0, n2: 0, n3: 0, n4: 0 };
    for (const P of [200, 400, 600]) for (const th of [25, 40, 60]) for (const M of [40, 120, 200]) for (const off of [-150, 0, 150]) {
      document.body.innerHTML = `<div style="position:absolute;left:150px;top:${60}px;width:600px"><div id=above></div>
        <div id=c style="transform: perspective(${P}px) rotateX(${th}deg); transform-origin: 50% 0; padding-top:${200 + off}px; height:500px">
          <div id=in></div><div id=h style="width:160px;height:24px;margin-left:200px"></div></div></div>`;
      const h = document.getElementById("h");
      const was = ctr(h);
      // outside: M px inserted above the card
      const d = document.createElement("div"); d.style.height = `${M}px`; document.getElementById("above").append(d);
      const now = ctr(h);
      const J0 = jac(h, 0, 0);
      const t0 = solve(J0, was.x - now.x, was.y - now.y);
      const q0 = probe(h, t0.x, t0.y);
      const r0 = solve(J0, was.x - q0.x, was.y - q0.y);
      const chord = probe(h, t0.x + r0.x, t0.y + r0.y);
      const res = [];
      let t = { x: 0, y: 0 };
      for (let k = 1; k <= 4; k++) {
        const J = jac(h, t.x, t.y);
        const s = solve(J, was.x - J.p.x, was.y - J.p.y);
        t = { x: t.x + s.x, y: t.y + s.y };
        const q = probe(h, t.x, t.y);
        res.push(Math.hypot(q.x - was.x, q.y - was.y));
      }
      const chordRes = Math.hypot(chord.x - was.x, chord.y - was.y);
      d.remove();
      // inside: M px inserted in the card above the host, compensated by −M in the host's own translate
      const was2 = ctr(h);
      const e = document.createElement("div"); e.style.height = `${M}px`; document.getElementById("in").append(e);
      const q2 = probe(h, 0, -M);
      const inRes = Math.hypot(q2.x - was2.x, q2.y - was2.y);
      worst = { in: Math.max(worst.in, inRes), chord: Math.max(worst.chord, chordRes), n1: Math.max(worst.n1, res[0]), n2: Math.max(worst.n2, res[1]), n3: Math.max(worst.n3, res[2]), n4: Math.max(worst.n4, res[3]) };
      out.push(`P ${P} θ ${th} M ${M} host ${off}: outside step ${Math.hypot(was.x - now.x, was.y - now.y).toFixed(2)} px · chord ${chordRes.toFixed(3)} · Newton k1..4 ${res.map((v) => v.toFixed(3)).join(" / ")} · inside −Δ ${inRes.toFixed(3)}`);
    }
    return `${out.join("\n")}\nWORST: inside −Δ ${worst.in.toFixed(3)} · chord ${worst.chord.toFixed(3)} · Newton k1 ${worst.n1.toFixed(3)} k2 ${worst.n2.toFixed(3)} k3 ${worst.n3.toFixed(3)} k4 ${worst.n4.toFixed(3)}`;
  });

  await cell("N8 the probe map's axis lengths against the bounding-box ratio, per carrier and track aspect", async () => {
    const ctr = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
    const probe = (el, x, y) => { const a = el.animate({ translate: [`${x}px ${y}px`, `${x}px ${y}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return ctr(el); } finally { a.cancel(); } };
    const out = [];
    for (const [w, hh] of [[300, 6], [140, 76], [20, 20]]) for (const tr of ["none", "rotate(10deg)", "rotate(10deg) scale(0.8)", "skewX(15deg)", "rotate(90deg)", "perspective(400px) rotateX(40deg)", "scale(1.25)"]) {
      document.body.innerHTML = `<div style="position:absolute;left:300px;top:300px;transform:${tr}"><div id=t style="width:${w}px;height:${hh}px"></div></div>`;
      const t = document.getElementById("t");
      const p = ctr(t), px = probe(t, 40, 0), py = probe(t, 0, 40);
      const ax = Math.hypot(px.x - p.x, px.y - p.y) / 40, ay = Math.hypot(py.x - p.x, py.y - p.y) / 40;
      const r = t.getBoundingClientRect();
      out.push(`${w}×${hh} ${tr}: axis lengths ${ax.toFixed(4)} / ${ay.toFixed(4)} · bbox ratio ${(r.width / w).toFixed(4)} / ${(r.height / hh).toFixed(4)}`);
    }
    return out.join("\n");
  });

  await cell("N12 the offset chain: offsetParent under a transformed card, transforms ignored, scroll, sub-pixel", async () => {
    const out = [];
    const sum = (el) => { let x = 0, y = 0, chain = []; for (let e = el; e; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; chain.push(e.id || e.tagName); } return { x, y, chain: chain.join(">") }; };
    for (const [name, card] of [["static card", ""], ["rotate 10deg card", "rotate: 10deg"], ["transform perspective card", "transform: perspective(400px) rotateX(40deg)"], ["translate card", "translate: 30px 12px"], ["positioned card", "position: relative"]]) {
      document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:50px;width:600px"><div id=s style="height:300px;overflow:auto"><div style="height:40.5px"></div>
        <div id=c style="padding:10.25px;${card}"><div style="height:30.5px"></div><div id=h style="height:20px;width:100px"></div></div><div style="height:2000px"></div></div></div>`;
      const h = document.getElementById("h");
      const a = sum(h);
      document.getElementById("s").scrollTop = 50;
      const b = sum(h);
      const r = h.getBoundingClientRect();
      out.push(`${name}: offsetParent chain ${a.chain} · sum ${a.x},${a.y} · after scrollTop 50 ${b.x},${b.y} · rect ${r.left.toFixed(3)},${r.top.toFixed(3)} · h.offsetParent ${h.offsetParent?.id || h.offsetParent?.tagName}`);
    }
    return out.join("\n");
  });

  await cell("N13 a write in the resize step is laid out in the same rendering update (a second observation round before the next frame)", async () => {
    document.body.innerHTML = `<div id=p style="width:200px"><div id=c style="height:10px"></div></div>`;
    const p = document.getElementById("p"), c = document.getElementById("c");
    let frame = 0;
    const log = [];
    let did = false;
    const ro = new ResizeObserver((es) => {
      for (const e of es) log.push(`f${frame}:${e.target.id}:${Math.round(e.contentRect.height)}`);
      if (!did && frame >= 3) { did = true; c.style.height = "37px"; log.push(`f${frame}:wrote c 37px in the resize step`); }
    });
    const tick = () => { frame += 1; if (frame === 3) { ro.unobserve(p); ro.observe(p); } if (frame < 8) requestAnimationFrame(tick); };
    ro.observe(p);
    ro.observe(c);
    requestAnimationFrame(tick);
    await new Promise((r) => setTimeout(r, 400));
    ro.disconnect();
    return log.join(" · ");
  });

  await cell("N14 a paused translate probe or glide on the last box of a scroller at its end, toward the start: does the offset clamp", async () => {
    const out = [];
    for (const [kind, dy] of [["probe", -40], ["probe", 40], ["glide first keyframe", -40]]) {
      document.body.innerHTML = `<div id=s style="width:300px;height:200px;overflow:auto"><div style="height:600px"></div><div id=h style="height:20px;width:100px"></div></div>`;
      const s = document.getElementById("s"), h = document.getElementById("h");
      s.scrollTop = s.scrollHeight;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const t0 = s.scrollTop;
      let a;
      if (kind === "probe") { a = h.animate({ translate: [`0 ${dy}px`, `0 ${dy}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); h.getBoundingClientRect(); const t1 = s.scrollTop; a.cancel(); h.getBoundingClientRect(); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); out.push(`${kind} ${dy}px: scrollTop ${t0} → during ${t1} → after ${s.scrollTop}`); }
      else { a = h.animate({ translate: [`0 ${dy}px`, "0 0"] }, { duration: 200, composite: "add" }); h.getBoundingClientRect(); const t1 = s.scrollTop; await a.finished; await new Promise((r) => requestAnimationFrame(r)); out.push(`${kind} ${dy}px: scrollTop ${t0} → at start ${t1} → after the glide ${s.scrollTop}`); }
    }
    return out.join("\n");
  });
} finally {
  await browser.close();
  console.log(`# end · load ${L()}`);
}
