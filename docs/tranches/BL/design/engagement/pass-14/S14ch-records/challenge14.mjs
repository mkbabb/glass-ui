#!/usr/bin/env node
// S14 CHALLENGE (D5 pass 14, wave 1b): library-free engine reads that attack S14's construction (P-E14.md §S14-b..§S14-e).
// No glass-ui byte is loaded: every page is set by setContent. Not a witness and not a candidate cell.
// One browser per run, a fresh context per cell, every context and the browser closed in a finally.
//   node challenge14.mjs <chromium|webkit> [cell,cell,...]
//   X1  the layout key K under a transform onset / end on a NON-positioned ancestor, and a link-size change below the host
//   X2  a position:sticky ancestor under a scroll: does the chain change with the scroll (b.4 attributes S to the "step")
//   X3  scroll anchoring whose adjustment leaves the host's chain unchanged (the anchor node in a sibling column)
//   X4  a scroll-snap re-snap after a layout change that leaves the host's chain unchanged (center alignment)
//   X5  an !important translate on the host: does a paused composite-add translate probe (F2) still move the box
//   X6  a consumer CSS transition on the host's translate (or all): does the probe or the glide start a CSS transition
//   X7  another ResizeObserver's write in the same resize step: created after the stage's, and in a second round
//   X8  a changing CSS zoom on an ancestor and on a sibling above (M22, "unread")
//   X9  the union read (<time> | stage-unset) when its declaring class arrives after first style, under transition: all [allow-discrete]
//   X10 a slow layout-property animation: frames whose integer chain is unchanged while the paint moves (M10 / b.6)
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
// in-page helpers
window.K = (el) => { const links = []; let x = 0, y = 0; for (let e = el; e; e = e.offsetParent) { links.push((e.id || e.tagName) + "(" + e.offsetLeft + "," + e.offsetTop + "," + e.offsetWidth + "x" + e.offsetHeight + ")"); x += e.offsetLeft; y += e.offsetTop; } return { key: links.join(">"), sum: x + "," + y }; };
window.top_ = (el) => el.getBoundingClientRect().top;
window.left_ = (el) => el.getBoundingClientRect().left;
window.raf = () => new Promise((r) => requestAnimationFrame(() => r()));
window.wait = (ms) => new Promise((r) => setTimeout(r, ms));
</script>`;
console.log(`# challenge14 ${engine} · ${new Date().toISOString()} · load ${L()}`);
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

  await cell("X1 the layout key under a transform onset or end on a non-positioned ancestor, and a link-size change below the host", async () => {
    const out = [];
    const scene = (extra = "") => {
      document.body.innerHTML = `<style>@keyframes ent { from { translate: 0 -40px } to { translate: 0 0 } } ${extra}</style>
        <div id=g style="position:absolute;left:100px;top:50px;width:600px"><div style="height:40.5px"></div>
        <div id=c style="padding:10.25px;transform-origin:50% 0"><div style="height:30.5px"></div><div id=h style="height:20px;width:100px"></div><div id=below></div></div></div>`;
      return { c: document.getElementById("c"), h: document.getElementById("h") };
    };
    const row = (tag, s, k0, p0) => { const k1 = K(s.h); const p1 = top_(s.h); return `${tag}: key ${k1.key === k0.key ? "SAME" : "CHANGED"} · sum ${k0.sum} → ${k1.sum} · painted top ${p0.toFixed(3)} → ${p1.toFixed(3)} (Δ ${(p1 - p0).toFixed(3)})\n    before ${k0.key}\n    after  ${k1.key}`; };
    // (a) an instant scale about the card's top (the M15 / D9 member, a card scaled during the hold)
    let s = scene(); await raf(); let k0 = K(s.h), p0 = top_(s.h);
    s.c.style.scale = "1.25"; await raf();
    out.push(row("(a) instant scale 1.25 on the card", s, k0, p0));
    // (b) the first frame of a rotate transition from none (a carrier, M7's kind)
    s = scene(); s.c.style.transition = "rotate 300ms linear"; await raf(); k0 = K(s.h); p0 = top_(s.h);
    s.c.style.rotate = "10deg"; await raf(); await raf();
    out.push(row("(b) rotate transition, 2 frames in", s, k0, p0));
    // (c) an @keyframes entrance with no fill: during, then after its end (the ancestor leaves the chain)
    s = scene(); await raf(); s.c.style.animation = "ent 150ms linear"; await raf(); await raf(); k0 = K(s.h); p0 = top_(s.h);
    await wait(300); await raf();
    out.push(row("(c) @keyframes entrance: mid-run → after its end", s, k0, p0));
    // (d) will-change: transform with no transform value
    s = scene(); await raf(); k0 = K(s.h); p0 = top_(s.h);
    s.c.style.willChange = "transform"; await raf();
    out.push(row("(d) will-change: transform added", s, k0, p0));
    // (e) an insert BELOW the host inside a positioned card: the host's place is unchanged, a link's size is not
    s = scene(); s.c.style.position = "relative"; await raf(); k0 = K(s.h); p0 = top_(s.h);
    const d = document.createElement("div"); d.style.height = "30px"; document.getElementById("below").append(d); await raf();
    out.push(row("(e) 30 px insert below the host (positioned card)", s, k0, p0));
    return out.join("\n");
  });

  await cell("X2 a sticky ancestor under a scroll (in a scroller, and on the page)", async () => {
    const out = [];
    for (const where of ["scroller", "page"]) {
      if (where === "scroller") {
        document.body.innerHTML = `<div id=s style="position:relative;height:300px;overflow:auto;width:400px"><div style="height:100px"></div>
          <div id=st style="position:sticky;top:0;height:50px"><div style="height:10px"></div><div id=h style="height:20px;width:100px"></div></div><div style="height:2000px"></div></div>`;
      } else {
        document.body.innerHTML = `<div style="height:100px"></div><div id=st style="position:sticky;top:0;height:50px"><div style="height:10px"></div><div id=h style="height:20px;width:100px"></div></div><div style="height:3000px"></div>`;
      }
      const sc = where === "scroller" ? document.getElementById("s") : document.scrollingElement;
      const h = document.getElementById("h");
      let k0 = K(h), p0 = top_(h), t0 = sc.scrollTop;
      for (const to of [50, 90, 150, 250]) {
        sc.scrollTop = to; await raf();
        const k1 = K(h), p1 = top_(h);
        const dS = sc.scrollTop - t0, dP = p1 - p0;
        const [, y0] = k0.sum.split(",").map(Number), [, y1] = k1.sum.split(",").map(Number);
        out.push(`${where}: scrollTop ${t0} → ${sc.scrollTop} (ΔS ${dS}) · chain ${k1.key === k0.key ? "SAME" : "CHANGED"} (Δsum y ${y1 - y0}) · painted Δ ${dP.toFixed(3)} · ${k1.key !== k0.key && Math.abs(dP) > 0.5 ? "S14 b.4 reads a STEP and glides " + dP.toFixed(1) + " px of the asked-for scroll" : k1.key === k0.key ? "S14 carries" : "S14 reads a step, s≈0"}`);
        k0 = k1; p0 = p1; t0 = sc.scrollTop;
      }
    }
    return out.join("\n");
  });

  await cell("X3 scroll anchoring whose adjustment leaves the host's chain unchanged (the anchor in a sibling column)", async () => {
    const out = [];
    for (const where of ["scroller", "page"]) {
      const cols = `<div style="display:flex;align-items:flex-start;gap:20px"><div id=Lc style="width:200px"><div id=ins></div>${'<div style="height:50px">l</div>'.repeat(40)}</div>
        <div id=Rc style="width:200px"><div style="height:600px"></div><div id=h style="height:20px;width:100px">h</div><div style="height:1500px"></div></div></div>`;
      document.body.innerHTML = where === "scroller" ? `<div id=s style="position:relative;height:300px;overflow:auto;width:500px">${cols}</div>` : cols;
      const sc = where === "scroller" ? document.getElementById("s") : document.scrollingElement;
      const h = document.getElementById("h");
      sc.scrollTop = 500; await raf(); await raf();
      const k0 = K(h), p0 = top_(h), t0 = sc.scrollTop, H0 = sc.scrollHeight;
      const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d);
      await raf();
      const k1 = K(h), p1 = top_(h), t1 = sc.scrollTop, H1 = sc.scrollHeight;
      out.push(`${where}: 40 px insert at the top of the other column · scrollTop ${t0} → ${t1} · range ${H0 - sc.clientHeight} → ${H1 - sc.clientHeight} · host chain ${k1.key === k0.key ? "SAME" : "CHANGED"} · host painted Δ ${(p1 - p0).toFixed(3)} · ${k1.key === k0.key && t1 !== t0 && Math.abs(p1 - p0) > 0.5 ? "S14 b.4 reads 'a scroll asked for' and CARRIES an engine adjustment: a " + Math.abs(p1 - p0).toFixed(1) + " px cut" : "no cut"}`);
    }
    return out.join("\n");
  });

  await cell("X4 a scroll-snap re-snap after a layout change that leaves the host's chain unchanged", async () => {
    const out = [];
    for (const align of ["center", "start"]) {
      document.body.innerHTML = `<div id=s style="position:relative;height:300px;overflow:auto;width:400px;scroll-snap-type:y mandatory">
        ${[0, 1, 2, 3, 4].map((i) => `<div id=i${i} style="height:300px;scroll-snap-align:${align}">${i === 2 ? '<div style="height:20px"></div><div id=h style="height:20px;width:100px">h</div><div id=grow></div>' : ""}</div>`).join("")}</div>`;
      const sc = document.getElementById("s"), h = document.getElementById("h");
      sc.scrollTop = 600; await raf(); await raf(); await wait(100);
      const k0 = K(h), p0 = top_(h), t0 = sc.scrollTop;
      // the snapped item grows below the host: item 2's own size changes, nothing above the host moves
      document.getElementById("i2").style.height = "400px";
      await raf(); await raf(); await wait(150); await raf();
      const k1 = K(h), p1 = top_(h), t1 = sc.scrollTop;
      out.push(`align ${align}: item 2 grows 300 → 400 px below the host · scrollTop ${t0} → ${t1} · host chain ${k1.key === k0.key ? "SAME" : "CHANGED"} · painted Δ ${(p1 - p0).toFixed(3)} · ${k1.key === k0.key && t1 !== t0 ? "re-snapped with the chain unchanged: S14 b.4 CARRIES it, a " + Math.abs(p1 - p0).toFixed(1) + " px cut" : t1 === t0 ? "no re-snap" : "chain changed"}`);
    }
    return out.join("\n");
  });

  await cell("X5 an !important translate on the host against the paused composite-add probe (F2)", async () => {
    const out = [];
    const probe = (el, x, y) => { const r0 = el.getBoundingClientRect(); const a = el.animate({ translate: [`${x}px ${y}px`, `${x}px ${y}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); const r1 = el.getBoundingClientRect(); a.cancel(); return [r1.left - r0.left, r1.top - r0.top]; };
    for (const [name, css, inline] of [
      ["no translate (control)", "", null],
      ["sheet translate 10px 0 (not important)", "#h { translate: 10px 0 }", null],
      ["sheet translate 10px 0 !important", "#h { translate: 10px 0 !important }", null],
      ["inline translate 10px 0 !important", "", ["translate", "10px 0"]],
      ["sheet transform rotate(10deg) !important", "#h { transform: rotate(10deg) !important }", null],
      ["sheet translate none !important", "#h { translate: none !important }", null],
    ]) {
      document.body.innerHTML = `<style>${css}</style><div style="padding:100px"><div id=h style="height:20px;width:100px"></div></div>`;
      const h = document.getElementById("h");
      if (inline) h.style.setProperty(inline[0], inline[1], "important");
      const [dx, dy] = probe(h, 40, 0);
      const g = h.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1000, composite: "add" });
      await raf(); await raf();
      const r = h.getBoundingClientRect();
      g.cancel(); await raf();
      const r2 = h.getBoundingClientRect();
      out.push(`${name}: probe (40, 0) moves the box (${dx.toFixed(3)}, ${dy.toFixed(3)}) · a running add glide of 40 px paints ${(r.left - r2.left).toFixed(3)} px · ${Math.abs(dx) < 0.01 ? "PROBE AND GLIDE INERT (map singular)" : "probe applies"}`);
    }
    return out.join("\n");
  });

  await cell("X6 a consumer CSS transition on the host's translate (or all) against the probe and the glide", async () => {
    const out = [];
    for (const tr of ["translate 300ms linear", "all 300ms linear", "none"]) {
      document.body.innerHTML = `<div style="padding:100px"><div id=h style="height:20px;width:100px;translate:0 0;transition:${tr}"></div></div>`;
      const h = document.getElementById("h");
      await raf(); await raf();
      const x0 = left_(h);
      // (i) the probe: create, read, cancel, all in one task (as S14 b.1 step 4)
      const a = h.animate({ translate: ["40px 0", "40px 0"] }, { duration: 1, fill: "both", composite: "add" }); a.pause();
      const xp = left_(h); a.cancel(); const xc = left_(h);
      const kinds1 = document.getAnimations().map((x) => x.constructor.name).join("+") || "none";
      await raf(); const xf1 = left_(h); await wait(60); const xf2 = left_(h);
      // (ii) the glide: a 150 ms add animation [40px, 0], then the frames after it ends
      const g = h.animate({ translate: ["40px 0", "0 0"] }, { duration: 150, composite: "add" });
      await raf(); const xg = left_(h) - x0;
      await g.finished; const kinds2 = document.getAnimations().map((x) => x.constructor.name).join("+") || "none";
      const after = []; for (let i = 0; i < 6; i++) { await raf(); after.push((left_(h) - x0).toFixed(2)); }
      out.push(`transition: ${tr} · probe paints ${(xp - x0).toFixed(3)}, after cancel ${(xc - x0).toFixed(3)}, animations then: ${kinds1}, next frame ${(xf1 - x0).toFixed(3)}, +60 ms ${(xf2 - x0).toFixed(3)} · glide frame 1 at ${xg.toFixed(2)}; at its end animations: ${kinds2}; 6 frames after: ${after.join(" ")}`);
    }
    return out.join("\n");
  });

  await cell("X7 another ResizeObserver's write in the same resize step, against the stage's read", async () => {
    const out = [];
    const run = async (mode) => {
      document.body.innerHTML = `<div style="position:absolute;left:100px;top:50px;width:400px"><div id=ins></div><div id=h style="height:20px;width:100px">h</div><div id=t1 style="width:50px;height:5px"></div><div id=deep><div id=t2 style="width:50px;height:5px"></div></div></div>`;
      const h = document.getElementById("h"), t1 = document.getElementById("t1"), t2 = document.getElementById("t2");
      let frame = 0; const reads = [];
      const make = (cb) => new ResizeObserver(cb);
      let stage, other;
      const stageCb = () => { reads.push({ frame, stage: top_(h) }); };
      const otherCb = (entries) => {
        if (mode === "round2") { if (frame === 5 && entries.some((e) => e.target === t1)) t2.style.width = "60px"; if (entries.some((e) => e.target === t2) && t2.style.width === "60px" && !document.getElementById("ins").firstChild) { const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d); } }
        else if (frame === 5 && !document.getElementById("ins").firstChild) { const d = document.createElement("div"); d.style.height = "40px"; document.getElementById("ins").append(d); }
      };
      if (mode === "other-first") { other = make(otherCb); stage = make(stageCb); } else { stage = make(stageCb); other = make(otherCb); }
      if (mode === "round2") { other.observe(t2); }
      const tick = () => { frame++; stage.unobserve(h); stage.observe(h); other.unobserve(t1); other.observe(t1); if (frame < 9) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      const painted = [];
      const watch = () => { painted.push({ frame, top: top_(h) }); if (frame < 9) requestAnimationFrame(watch); };
      requestAnimationFrame(watch);
      await wait(400);
      stage.disconnect(); other.disconnect();
      const at = (f) => reads.filter((r) => r.frame === f).map((r) => r.stage.toFixed(1)).join("/");
      const nextRaf = painted.find((p) => p.frame === 6)?.top.toFixed(1);
      out.push(`${mode}: the stage's resize-step read(s) at frame 5: ${at(5)} · at frame 6: ${at(6)} · the next frame's rAF read ${nextRaf} · ${at(5).split("/").pop() === "90.0" ? "the stage SEES the write on its frame" : "the stage MISSES the write on the frame it lays out and paints (a cut, then a glide back from the pre-write place)"}`);
    };
    for (const m of ["other-first", "stage-first", "round2"]) await run(m);
    return out.join("\n");
  });

  await cell("X8 a changing CSS zoom on an ancestor and on a sibling above (M22)", async () => {
    const out = [];
    for (const where of ["ancestor", "sibling above"]) {
      document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:50px;width:400px"><div id=sib style="height:40px">s</div><div id=c style="padding:10px"><div style="height:30px"></div><div id=h style="height:20px;width:100px">h</div></div></div>`;
      const h = document.getElementById("h");
      await raf();
      const k0 = K(h), p0 = top_(h), l0 = left_(h), z0 = h.currentCSSZoom;
      (where === "ancestor" ? document.getElementById("c") : document.getElementById("sib")).style.zoom = "1.25";
      await raf();
      const k1 = K(h), p1 = top_(h), l1 = left_(h);
      out.push(`${where} zoom 1 → 1.25: chain ${k1.key === k0.key ? "SAME" : "CHANGED"} · sum ${k0.sum} → ${k1.sum} · painted (Δx ${(l1 - l0).toFixed(3)}, Δy ${(p1 - p0).toFixed(3)}) · currentCSSZoom ${z0} → ${h.currentCSSZoom}\n    before ${k0.key}\n    after  ${k1.key}`);
    }
    return out.join("\n");
  });

  await cell("X9 the union read when its declaring class arrives after first style, under transition: all", async () => {
    const out = [];
    for (const tr of ["all 300ms linear allow-discrete", "all 300ms linear", "none"]) {
      document.body.innerHTML = `<style>.m { --u-time: 0.21s; }</style><div id=h style="transition:${tr}">h</div>`;
      const h = document.getElementById("h");
      await raf(); getComputedStyle(h).getPropertyValue("--u-time");
      h.classList.add("m");
      const r = [];
      const t0 = performance.now();
      r.push(`+0 ${getComputedStyle(h).getPropertyValue("--u-time").trim()}`);
      for (const ms of [100, 200, 400]) { await wait(ms - (performance.now() - t0)); await raf(); r.push(`+${Math.round(performance.now() - t0)} ${getComputedStyle(h).getPropertyValue("--u-time").trim()}`); }
      out.push(`transition: ${tr} · class added after first style · --u-time ${r.join(" · ")}`);
    }
    return out.join("\n");
  });

  await cell("X10 a slow layout-property animation: frames whose integer chain is unchanged while the paint moves", async () => {
    const out = [];
    for (const [px, ms] of [[12, 1000], [40, 1000], [100, 1000]]) {
      document.body.innerHTML = `<div id=g style="position:absolute;left:100px;top:50px;width:400px"><div id=m style="height:0.5px"></div><div id=h style="height:20px;width:100px">h</div></div>`;
      const m = document.getElementById("m"), h = document.getElementById("h");
      await raf();
      let prevK = K(h).sum, prevP = top_(h);
      const t0 = performance.now();
      const rows = [];
      while (performance.now() - t0 < ms + 50) {
        const t = Math.min(1, (performance.now() - t0) / ms);
        m.style.marginTop = `${(px * t).toFixed(3)}px`;
        await raf();
        const k = K(h).sum, p = top_(h);
        rows.push({ same: k === prevK, dp: p - prevP });
        prevK = k; prevP = p;
      }
      const moving = rows.filter((r) => Math.abs(r.dp) > 0.01);
      const hidden = moving.filter((r) => r.same);
      // S14 b.6 on these frames: a K-changed frame right after a K-unchanged one glides |s - 0| if > 0.5 (s₋₁ reset by the still frame)
      let glides = 0, glidePx = 0, prevSame = true;
      for (const r of rows) { if (!r.same && prevSame && Math.abs(r.dp) > 0.5) { glides++; glidePx += Math.abs(r.dp); } prevSame = r.same; }
      out.push(`${px} px over ${ms} ms (${(px / ms * 16.7).toFixed(2)} px a frame): ${rows.length} frames, ${moving.length} with paint moving, ${hidden.length} of them with the integer chain UNCHANGED (max painted Δ on such a frame ${hidden.reduce((a, r) => Math.max(a, Math.abs(r.dp)), 0).toFixed(3)} px) · b.6's rule on this trace: ${glides} onset glides, ${glidePx.toFixed(2)} px glided in all`);
    }
    return out.join("\n");
  });
  await cell("X11 the exit-clock wait (cand13 leave(): every subtree animation with a finite endTime, awaited): does it end", async () => {
    const out = [];
    for (const [name, css] of [
      ["a finite running CSS animation (control)", "animation: kf 300ms linear"],
      ["a finite CSS animation, animation-play-state: paused", "animation: kf 300ms linear; animation-play-state: paused"],
      ["a finite CSS animation with a view() timeline", "animation: kf linear both; animation-timeline: view()"],
      ["a 3-iteration 1 s CSS animation", "animation: kf 1s linear 3"],
    ]) {
      document.body.innerHTML = `<style>@keyframes kf { from { opacity: 0.5 } to { opacity: 1 } }</style><div id=h style="height:20px"><i id=k style="display:block;height:4px;${css}"></i></div><div style="height:3000px"></div>`;
      await raf();
      const h = document.getElementById("h");
      const t0 = performance.now();
      const running = h.getAnimations({ subtree: true }).filter((a) => a.effect?.getComputedTiming().endTime !== Infinity);
      const ends = running.map((a) => a.effect.getComputedTiming().endTime);
      let settled = false;
      Promise.all(running.map((a) => a.finished.catch(() => undefined))).then(() => { settled = true; });
      await wait(1500);
      out.push(`${name}: ${running.length} awaited (endTime ${ends.map((e) => Number(e).toFixed(0)).join("/")}) · settled within 1.5 s: ${settled ? "yes, at " + (performance.now() - t0 > 0 ? "≤1.5 s" : "") : "NO (the released host never leaves the stage; under S14 b.8 the frame read keeps running)"}`);
    }
    return out.join("\n");
  });
} finally {
  await browser.close();
  console.log(`# closed · load ${L()}`);
}
