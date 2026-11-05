#!/usr/bin/env node
// S14 FOLD (D5 pass 14, part S, the fold): library-free engine reads for the facts the folded S14 rests on.
// No glass-ui byte is loaded: every page is set by setContent. Not a witness and not a candidate cell.
// One browser per run, a fresh context per cell, every context and the browser closed in a finally.
//   node fold14.mjs <chromium|webkit> [cell,cell,...]
//   Y1  the place Q (offset chain + each offsetParent's client edge) under an offsetParent membership change: |ΔQ| ≤ links changed?
//   Y2  a changing CSS zoom: does currentCSSZoom on the chain show it on the frame it lays out
//   Y3  sticky under a scroll: the sticky link's offset change against the scroll delta, per frame (stick, stuck, unstick, block end)
//   Y4  re-snap (center): does the scroll range change on the re-snap frame; anchoring in a sibling column with the host focused
//   Y5  the declared read on the host's ::before: class arrival under transition: all allow-discrete, a runtime token change under transition: all
//   Y6  the in-frame compensation −Δ under a moving carrier in the same frame (an insert inside an animated card)
//   Y7  b.6 restated on X10's ramps and on step trains: the velocity carried across a still frame below the chain's resolution
//   Y8  b.6 on the chain's integer step (the in-frame measure −Δ), with the chain's resolution as the tolerance
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const only = process.argv[3] ? new Set(process.argv[3].split(",")) : null;
const L = () => os.loadavg().map((x) => x.toFixed(2)).join("/");
const BASE = `<!doctype html><meta charset=utf-8><style>
@property --u-time { syntax: "<time> | stage-unset"; inherits: false; initial-value: stage-unset; }
html, body { margin: 0; } </style><body></body>
<script>
// the chain: links from the host up its offsetParent chain; the raw sum; Q = the raw sum plus each offsetParent's client edge
window.chain = (el) => { const links = []; let x = 0, y = 0, qx = 0, qy = 0; for (let e = el; e; e = e.offsetParent) { links.push(e); x += e.offsetLeft; y += e.offsetTop; qx += e.offsetLeft; qy += e.offsetTop; const p = e.offsetParent; if (p && p !== document.body) { qx += p.clientLeft; qy += p.clientTop; } } return { links, raw: [x, y], q: [qx, qy] }; };
window.ids = (c) => c.links.map((e) => e.id || e.tagName).join(">");
window.changed = (a, b) => { const A = new Set(a.links), B = new Set(b.links); let n = 0; for (const e of A) if (!B.has(e)) n++; for (const e of B) if (!A.has(e)) n++; return n; };
window.top_ = (el) => el.getBoundingClientRect().top;
window.raf = () => new Promise((r) => requestAnimationFrame(() => r()));
window.wait = (ms) => new Promise((r) => setTimeout(r, ms));
</script>`;
console.log(`# fold14 ${engine} · ${new Date().toISOString()} · load ${L()}`);
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

  await cell("Y1 the place Q under an offsetParent membership change (X1's scene, the card bordered 3px)", async () => {
    const out = [];
    for (const frac of [true, false]) {
      const scene = (extra = "") => {
        const a = frac ? "40.5px" : "40px", b = frac ? "30.5px" : "30px", pd = frac ? "10.25px" : "10px";
        document.body.innerHTML = `<style>@keyframes ent { from { translate: 0 -40px } to { translate: 0 0 } } ${extra}</style>
          <div id=g style="position:absolute;left:100px;top:50px;width:600px;border:2px solid"><div style="height:${a}"></div>
          <div id=c style="padding:${pd};border:3px solid;transform-origin:50% 0"><div id=ins></div><div style="height:${b}"></div><div id=h style="height:20px;width:100px"></div></div></div>`;
        return { c: document.getElementById("c"), h: document.getElementById("h") };
      };
      const row = (tag, s, c0, p0) => {
        const c1 = chain(s.h), p1 = top_(s.h), n = changed(c0, c1);
        const dq = [c1.q[0] - c0.q[0], c1.q[1] - c0.q[1]], dr = [c1.raw[0] - c0.raw[0], c1.raw[1] - c0.raw[1]];
        const ok = Math.abs(dq[0]) <= n && Math.abs(dq[1]) <= n;
        return `${frac ? "fractional" : "integer"} · ${tag}: links ${ids(c0)} → ${ids(c1)} (${n} changed) · raw Δ (${dr}) · Q Δ (${dq}) · painted Δ ${(p1 - p0).toFixed(3)} · |ΔQ| ≤ links changed: ${ok ? "yes" : "NO"}`;
      };
      const kinds = [
        ["(a) instant scale 1.25", (c) => { c.style.scale = "1.25"; }],
        ["(d) will-change: transform", (c) => { c.style.willChange = "transform"; }],
        ["(e) contain: paint", (c) => { c.style.contain = "paint"; }],
        ["(f) filter: blur(1px)", (c) => { c.style.filter = "blur(1px)"; }],
        ["(g) perspective: 400px", (c) => { c.style.perspective = "400px"; }],
        ["(h) offset-path: path('M0,0 L10,0')", (c) => { c.style.offsetPath = "path('M0,0 L10,0')"; }],
        ["(i) position: relative (control)", (c) => { c.style.position = "relative"; }],
      ];
      for (const [tag, f] of kinds) { const s = scene(); await raf(); const c0 = chain(s.h), p0 = top_(s.h); f(s.c); await raf(); out.push(row(tag, s, c0, p0)); }
      // (b) a rotate transition, two frames in; (c) a keyframes entrance mid-run → after its end
      { const s = scene(); s.c.style.transition = "rotate 300ms linear"; await raf(); const c0 = chain(s.h), p0 = top_(s.h); s.c.style.rotate = "10deg"; await raf(); await raf(); out.push(row("(b) rotate transition, 2 frames in", s, c0, p0)); }
      { const s = scene(); await raf(); s.c.style.animation = "ent 150ms linear"; await raf(); await raf(); const c0 = chain(s.h), p0 = top_(s.h); await wait(300); await raf(); out.push(row("(c) keyframes entrance mid-run → after its end", s, c0, p0)); }
      // a real step in the same frame as the onset: scale 1.25 and a 40 px insert inside the card above the host
      { const s = scene(); await raf(); const c0 = chain(s.h), p0 = top_(s.h); s.c.style.scale = "1.25"; const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d); await raf(); out.push(row("(j) scale onset + 40 px insert above the host, same frame", s, c0, p0) + " (expected ΔQ y 40 ± links changed)"); }
    }
    return out.join("\n");
  });

  await cell("Y2 a changing CSS zoom: currentCSSZoom on the chain on the frame it lays out", async () => {
    const out = [];
    document.body.innerHTML = `<div id=g style="position:absolute;left:10px;top:10px;width:600px"><div id=sib style="height:40px"></div><div id=z><div style="height:30px"></div><div id=h style="height:20px;width:100px">h</div></div></div>`;
    const h = document.getElementById("h"), z = document.getElementById("z"), sib = document.getElementById("sib");
    const zs = (c) => c.links.map((e) => e.currentCSSZoom ?? "n/a").join(",");
    await raf();
    let c0 = chain(h), p0 = top_(h), z0 = zs(c0);
    z.style.zoom = "1.25"; await raf();
    let c1 = chain(h), p1 = top_(h);
    out.push(`ancestor zoom 1 → 1.25: currentCSSZoom on the chain ${z0} → ${zs(c1)} · Q (${c0.q}) → (${c1.q}) · painted Δ ${(p1 - p0).toFixed(3)} · zoom change seen on its frame: ${z0 !== zs(c1) ? "yes" : "NO"}`);
    z.style.zoom = ""; await raf(); c0 = chain(h); p0 = top_(h); z0 = zs(c0);
    sib.style.zoom = "1.25"; await raf(); c1 = chain(h); p1 = top_(h);
    out.push(`sibling above zoom 1 → 1.25: currentCSSZoom on the chain ${z0} → ${zs(c1)} (unchanged: ${z0 === zs(c1) ? "yes" : "NO"}) · Q (${c0.q}) → (${c1.q}) · painted Δ ${(p1 - p0).toFixed(3)}`);
    return out.join("\n");
  });

  await cell("Y3 sticky under a scroll: the sticky link's offset change against the scroll delta, per frame", async () => {
    const out = [];
    for (const [where, side] of [["scroller", "top"], ["page", "top"], ["scroller", "bottom"], ["scroller", "top+end"]]) {
      const stick = side === "bottom" ? "bottom:0" : "top:0";
      const inner = `<div id=st style="position:sticky;${stick};height:50px"><div style="height:10px"></div><div id=h style="height:20px;width:100px"></div></div>`;
      const body = side === "bottom" ? `<div style="height:2000px"></div>${inner}<div style="height:100px"></div>`
        : side === "top+end" ? `<div style="height:100px"></div><div id=cb style="height:400px">${inner}</div><div style="height:2000px"></div>`
        : `<div style="height:100px"></div>${inner}<div style="height:2000px"></div>`;
      document.body.innerHTML = where === "scroller" ? `<div id=s style="position:relative;height:300px;overflow:auto;width:400px">${body}</div>` : `${body}<div style="height:1000px"></div>`;
      const sc = where === "scroller" ? document.getElementById("s") : document.scrollingElement;
      const h = document.getElementById("h"), st = document.getElementById("st");
      const steps = side === "bottom" ? [1500, 1650, 1720, 1760, 1800, 1900] : side === "top+end" ? [50, 90, 150, 300, 420, 480, 600] : [50, 90, 150, 250];
      sc.scrollTop = steps[0]; await raf(); await raf();
      let c0 = chain(h), p0 = top_(h), t0 = sc.scrollTop, so0 = st.offsetTop;
      const r = [];
      for (const to of steps.slice(1)) {
        sc.scrollTop = to; await raf();
        const c1 = chain(h), p1 = top_(h), dS = sc.scrollTop - t0, dSt = st.offsetTop - so0;
        const dq = c1.q[1] - c0.q[1], others = dq - dSt;
        const within = Math.sign(dSt) * Math.sign(dS) >= 0 && Math.abs(dSt) <= Math.abs(dS);
        r.push(`ΔS ${dS} · sticky Δ ${dSt} · other links Δ ${others} · painted Δ ${(p1 - p0).toFixed(3)} · sticky Δ within the scroll's (same sign, ≤ |ΔS|): ${within ? "yes → carried" : "NO"}`);
        c0 = c1; p0 = p1; t0 = sc.scrollTop; so0 = st.offsetTop;
      }
      out.push(`${where} ${side}:\n    ${r.join("\n    ")}`);
    }
    // an insert above an unstuck sticky box, no scroll: the sticky link's change is layout
    document.body.innerHTML = `<div id=s style="position:relative;height:300px;overflow:auto;width:400px"><div id=ins></div><div style="height:100px"></div><div id=st style="position:sticky;top:0;height:50px"><div style="height:10px"></div><div id=h style="height:20px;width:100px"></div></div><div style="height:2000px"></div></div>`;
    const h = document.getElementById("h"), st = document.getElementById("st"); await raf();
    const so0 = st.offsetTop, p0 = top_(h); const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d); await raf();
    out.push(`insert 40 px above an unstuck sticky box, no scroll: ΔS 0 · sticky Δ ${st.offsetTop - so0} · painted Δ ${(top_(h) - p0).toFixed(3)} · excess over |ΔS| = layout: ${st.offsetTop - so0 !== 0 ? "yes → a step" : "NO"}`);
    return out.join("\n");
  });

  await cell("Y4 re-snap: the scroll range on the re-snap frame; anchoring in a sibling column with the host focused", async () => {
    const out = [];
    for (const align of ["center", "end", "start"]) {
      document.body.innerHTML = `<div id=s style="position:relative;height:300px;overflow:auto;width:400px;scroll-snap-type:y mandatory">
        ${[0, 1, 2, 3, 4].map((i) => `<div id=i${i} style="height:300px;scroll-snap-align:${align}">${i === 2 ? '<div style="height:20px"></div><div id=h style="height:20px;width:100px">h</div>' : ""}</div>`).join("")}</div>`;
      const sc = document.getElementById("s"), h = document.getElementById("h");
      sc.scrollTop = 600; await raf(); await raf(); await wait(100);
      const t0 = sc.scrollTop, R0 = sc.scrollHeight - sc.clientHeight, c0 = chain(h), p0 = top_(h);
      document.getElementById("i2").style.height = "400px";
      const frames = [];
      for (let i = 0; i < 6; i++) { await raf(); frames.push(`${sc.scrollTop}/${sc.scrollHeight - sc.clientHeight}`); }
      await wait(150); await raf();
      const c1 = chain(h), p1 = top_(h);
      out.push(`align ${align}: scrollTop ${t0} → ${sc.scrollTop} · range ${R0} → ${sc.scrollHeight - sc.clientHeight} · per frame (top/range) ${frames.join(" ")} · Q y Δ ${c1.q[1] - c0.q[1]} · painted Δ ${(p1 - p0).toFixed(3)}`);
    }
    for (const [tag, hostHtml] of [["div tabindex=0, focused", `<div id=h tabindex=0 style="height:20px;width:100px">h</div>`], ["input type=range, focused", `<input id=h type=range style="display:block;height:20px;width:100px">`], ["div, not focused (X3's control)", `<div id=h style="height:20px;width:100px">h</div>`]]) {
      const cols = `<div style="display:flex;align-items:flex-start;gap:20px"><div style="width:200px"><div id=ins></div>${'<div style="height:50px">l</div>'.repeat(40)}</div>
        <div style="width:200px"><div style="height:600px"></div>${hostHtml}<div style="height:1500px"></div></div></div>`;
      document.body.innerHTML = `<div id=s style="position:relative;height:300px;overflow:auto;width:500px">${cols}</div>`;
      const sc = document.getElementById("s"), h = document.getElementById("h");
      sc.scrollTop = 500; await raf(); await raf();
      if (!tag.includes("not focused")) h.focus({ preventScroll: true });
      await raf();
      const t0 = sc.scrollTop, p0 = top_(h), act = document.activeElement === h;
      const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d); await raf();
      out.push(`anchoring, insert 40 px in the sibling column, host ${tag} (active ${act}): scrollTop ${t0} → ${sc.scrollTop} · host painted Δ ${(top_(h) - p0).toFixed(3)}`);
    }
    return out.join("\n");
  });

  await cell("Y5 the declared read on the host's ::before, against the same read on the host", async () => {
    const out = [];
    const rd = (h) => `host ${getComputedStyle(h).getPropertyValue("--u-time").trim() || "''"} / ::before ${getComputedStyle(h, "::before").getPropertyValue("--u-time").trim() || "''"} / consumer ${getComputedStyle(h).transitionDuration.split(",").pop().trim()}`;
    for (const tr of ["all 300ms linear allow-discrete", "all 300ms linear", "none"]) {
      // class arrival after first style (X9's member)
      document.body.innerHTML = `<style>:root { --d: 0.21s } .m, .m::before { --u-time: var(--d); } .m { --cons: var(--d) }</style><div id=h style="transition:${tr}">h</div>`;
      const h = document.getElementById("h");
      await raf(); rd(h);
      h.classList.add("m");
      const r = [], t0 = performance.now();
      r.push(`+0 ${rd(h)}`);
      for (const ms of [116, 216]) { await wait(ms - (performance.now() - t0)); await raf(); r.push(`+${Math.round(performance.now() - t0)} ${rd(h)}`); }
      out.push(`class arrival, host transition: ${tr} · ${r.join(" · ")}`);
    }
    for (const tr of ["all 300ms linear", "all 300ms linear allow-discrete"]) {
      // a runtime token change (N4's member): the consumer is the host's own transition-duration list item var(--d)
      document.body.innerHTML = `<style>:root { --d: 0.21s } .m, .m::before { --u-time: var(--d); } .m { transition: ${tr}; transition-duration: 300ms, var(--d); transition-property: all, outline-color; transition-behavior: ${tr.includes("discrete") ? "allow-discrete" : "normal"} }</style><div id=h class=m>h</div>`;
      const h = document.getElementById("h"); await raf(); await raf();
      document.documentElement.style.setProperty("--d", "0.5s");
      const r = [], t0 = performance.now();
      r.push(`+0 ${rd(h)}`);
      for (const ms of [100, 216, 500]) { await wait(ms - (performance.now() - t0)); await raf(); r.push(`+${Math.round(performance.now() - t0)} ${rd(h)}`); }
      out.push(`token 0.21s → 0.5s at runtime, host transition: ${tr} · ${r.join(" · ")}`);
    }
    // a host with a generated ::before that carries its own transition: all (a consumer member)
    document.body.innerHTML = `<style>:root { --d: 0.21s } #h::before { content: ""; transition: all 300ms linear allow-discrete } .m, .m::before { --u-time: var(--d); }</style><div id=h>h</div>`;
    { const h = document.getElementById("h"); await raf(); rd(h); h.classList.add("m"); const r = [`+0 ${rd(h)}`]; const t0 = performance.now(); await wait(116); await raf(); r.push(`+${Math.round(performance.now() - t0)} ${rd(h)}`); out.push(`a generated ::before with its own transition: all … allow-discrete · ${r.join(" · ")}`); }
    return out.join("\n");
  });

  await cell("Y6 the in-frame compensation −Δ under a carrier moving between the two reads (twin cards, one gets the insert)", async () => {
    const out = [];
    for (const [tag, cardCss] of [
      ["card translate animation 0 → (80, 30) px, 200 ms alternate", "animation: car 200ms linear infinite alternate"],
      ["card rotate animation 0 → 20deg, 200 ms alternate", "animation: rot 200ms linear infinite alternate"],
      ["card perspective(400px) rotateX(40deg) + translate animation", "transform: perspective(400px) rotateX(40deg); animation: car 200ms linear infinite alternate"],
    ]) {
      const card = (id) => `<div style="position:absolute;left:${id === "A" ? 100 : 560}px;top:150px;width:400px"><div id=c${id} style="${cardCss};transform-origin:50% 0"><div id=mk${id} style="height:4px;width:4px"></div><div id=ins${id}></div><div style="height:30px"></div><div id=h${id} style="height:20px;width:100px">h</div></div></div>`;
      document.body.innerHTML = `<style>@keyframes car { from { translate: 0 0 } to { translate: 80px 30px } } @keyframes rot { from { rotate: 0deg } to { rotate: 20deg } }</style>${card("A")}${card("B")}<div id=tick style="position:absolute;top:0;left:0;height:1px;width:1px"></div>`;
      const $ = (i) => document.getElementById(i);
      const rel = (x) => { const a = $("h" + x).getBoundingClientRect(), b = $("mk" + x).getBoundingClientRect(); return [a.left - b.left, a.top - b.top]; };
      await raf(); await raf();
      // both cards' animations share one start time, so the carriers are equal at every frame
      const ta = $("cA").getAnimations()[0]?.startTime, tb = $("cB").getAnimations()[0]?.startTime;
      const errs = [];
      for (const ins of [40, 120]) {
        $("hA").style.translate = ""; $("insA").innerHTML = ""; await raf(); await raf();
        const res = await new Promise((resolve) => {
          let y0 = null, n = 0;
          const ro = new ResizeObserver(() => {
            n++;
            if (y0 === null) { y0 = $("hA").offsetTop; setTimeout(() => { const d = document.createElement("div"); d.style.height = `${ins}px`; $("insA").append(d); }, 0); tick(); return; }
            const dy = $("hA").offsetTop - y0;
            if (dy === 0 && n < 6) { tick(); return; }
            ro.disconnect();
            const unc = rel("A"), ctl = rel("B");
            $("hA").style.translate = `0 ${-dy}px`;
            const cmp = rel("A");
            resolve({ dy, before: Math.hypot(unc[0] - ctl[0], unc[1] - ctl[1]), err: Math.hypot(cmp[0] - ctl[0], cmp[1] - ctl[1]) });
          });
          const tick = () => requestAnimationFrame(() => { $("tick").style.width = $("tick").style.width === "1px" ? "2px" : "1px"; });
          ro.observe($("tick"));
        });
        errs.push(`insert ${ins}: Δ ${res.dy} · A against its twin B: ${res.before.toFixed(3)} px uncompensated, ${res.err.toFixed(3)} px after −Δ`);
      }
      out.push(`${tag} (start times equal: ${ta === tb}): ${errs.join(" · ")}`);
    }
    return out.join("\n");
  });
  await cell("Y7 b.6 restated: the velocity carried across a still frame below the chain's resolution", async () => {
    const out = [];
    // the rule applied to a trace of frames { same: chain unchanged, dp: painted change of the place }
    const rules = (rows) => {
      // S14 as written: a still frame resets s₋₁; glide |s − s₋₁| > 0.5 on a step frame
      let g0 = 0, p0 = 0, sm = 0;
      for (const r of rows) { if (r.same) { sm = 0; continue; } const d = r.dp - sm; if (Math.abs(d) > 0.5) { g0++; p0 += Math.abs(d); } sm = r.dp; }
      // the fold: a still frame resets the velocity only when |s₋₁| ≥ 1 px (a motion the integer chain would have shown)
      let g1 = 0, p1 = 0, v = 0;
      for (const r of rows) { if (r.same) { if (Math.abs(v) >= 1) v = 0; continue; } const d = r.dp - v; if (Math.abs(d) > 0.5) { g1++; p1 += Math.abs(d); } v = r.dp; }
      // the fold, per unit of the frame's own time: the expected step is v · dt (dt the rAF timestamp delta), so an uneven frame is not a departure
      let g2 = 0, p2 = 0, vt = 0;
      for (const r of rows) { if (r.same) { if (Math.abs(vt * r.dt) >= 1) vt = 0; continue; } const d = r.dp - vt * r.dt; if (Math.abs(d) > 0.5) { g2++; p2 += Math.abs(d); } vt = r.dp / r.dt; }
      return `as written ${g0} glides, ${p0.toFixed(2)} px · folded per frame ${g1} glides, ${p1.toFixed(2)} px · folded per time ${g2} glides, ${p2.toFixed(2)} px`;
    };
    for (const [px, ms] of [[12, 1000], [40, 1000], [100, 1000], [200, 1000]]) {
      document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:50px;width:400px"><div id=m style="height:0.5px"></div><div id=h style="height:20px;width:100px">h</div></div>`;
      const m = document.getElementById("m"), h = document.getElementById("h");
      await raf();
      let prevK = chain(h).q.join(), prevP = top_(h), prevT = await new Promise((r) => requestAnimationFrame(r));
      const t0 = prevT, rows = [];
      while (prevT - t0 < ms + 50) {
        const t = Math.min(1, (prevT - t0) / ms);
        m.style.marginTop = `${(px * t).toFixed(3)}px`;
        const ts = await new Promise((r) => requestAnimationFrame(r));
        const k = chain(h).q.join(), p = top_(h);
        rows.push({ same: k === prevK, dp: p - prevP, dt: ts - prevT });
        prevK = k; prevP = p; prevT = ts;
      }
      const moving = rows.filter((r) => Math.abs(r.dp) > 0.01).length;
      const dts = rows.map((r) => r.dt), mean = dts.reduce((a, b) => a + b, 0) / dts.length;
      out.push(`ramp ${px} px / ${ms} ms: ${rows.length} frames (dt mean ${mean.toFixed(2)} ms, max ${Math.max(...dts).toFixed(2)}), ${moving} moving · ${rules(rows)} (the onset frame is one glide by design)`);
    }
    // step trains, by the rule alone: a 16 px line every frame, and every second frame, 30 frames
    const every = Array.from({ length: 30 }, () => ({ same: false, dp: 16, dt: 16.7 }));
    const second = Array.from({ length: 30 }, (_, i) => (i % 2 ? { same: true, dp: 0, dt: 16.7 } : { same: false, dp: 16, dt: 16.7 }));
    out.push(`train, 16 px every frame (30 frames): ${rules(every)}`);
    out.push(`train, 16 px every second frame (30 frames): ${rules(second)}`);
    return out.join("\n");
  });
  await cell("Y8 b.6 on the chain's integer step (the in-frame measure −Δ): ramps and step trains", async () => {
    const out = [];
    // rows of integer Q changes per frame. As written: a still frame resets v; glide |Δ − v| > 0.5.
    // Folded: the chain's resolution is 1 layout px, so a departure is glided only when |Δ − v| > 1, and a still frame resets v only when |v| > 1.
    const rules = (ds) => {
      let g0 = 0, p0 = 0, v0 = 0, g1 = 0, p1 = 0, v1 = 0;
      for (const d of ds) {
        if (d === 0) { v0 = 0; if (Math.abs(v1) > 1) v1 = 0; continue; }
        if (Math.abs(d - v0) > 0.5) { g0++; p0 += Math.abs(d - v0); } v0 = d;
        if (Math.abs(d - v1) > 1) { g1++; p1 += Math.abs(d - v1); } v1 = d;
      }
      return `as written ${g0} glides, ${p0} px · folded ${g1} glides, ${p1} px`;
    };
    for (const [px, ms] of [[12, 1000], [40, 1000], [100, 1000], [200, 1000], [400, 1000]]) {
      document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:50px;width:400px"><div id=m style="height:0.5px"></div><div id=h style="height:20px;width:100px">h</div></div>`;
      const m = document.getElementById("m"), h = document.getElementById("h");
      await raf();
      let prevQ = chain(h).q[1];
      const t0 = performance.now(), ds = [];
      while (performance.now() - t0 < ms + 50) {
        m.style.marginTop = `${(px * Math.min(1, (performance.now() - t0) / ms)).toFixed(3)}px`;
        await raf();
        const q = chain(h).q[1]; ds.push(q - prevQ); prevQ = q;
      }
      const hist = {}; for (const d of ds) hist[d] = (hist[d] ?? 0) + 1;
      out.push(`ramp ${px} px / ${ms} ms: ${ds.length} frames, integer steps ${JSON.stringify(hist)} · ${rules(ds)} (the onset is one glide by design)`);
    }
    out.push(`train, 16 px every frame (30): ${rules(Array(30).fill(16))}`);
    out.push(`train, 16 px every second frame (30): ${rules(Array.from({ length: 30 }, (_, i) => (i % 2 ? 0 : 16)))}`);
    out.push(`one 1 px insert, then still, then a 40 px insert: ${rules([1, 0, 0, 0, 40, 0])}`);
    return out.join("\n");
  });
} finally {
  await browser.close();
  console.log(`# closed · load ${L()}`);
}
