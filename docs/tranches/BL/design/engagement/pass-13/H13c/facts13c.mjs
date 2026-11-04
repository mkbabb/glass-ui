#!/usr/bin/env node
// H13-complete (D5 pass 13, wave c1): C-E13's engine facts F1-F5 (pass-13/C-E13/held-battery.txt §1), LIBRARY-FREE (a page set by
// setContent, no glass-ui), read as of record in each engine. Not a witness. Arithmetic copied from P-E13.patch's settle.ts (tokenOf's
// registered read and valueOf's CANON) and stage.ts (probe: a paused composite:"add" translate).
//   node facts13c.mjs <chromium|webkit>
//   F1 · every (b) form of a <time>, <number>, <length>: the consumer's computed value; the registered read (the property P-E13 registers,
//        written var(--tok) inline, read back, removed); valueOf's number (NaN = refused, loud)
//   F2 · a paused composite:"add" translate (40px 0 and 0 40px): does getBoundingClientRect move by it in the same task (no frame),
//        under none, scale 0.8, rotate 10deg, perspective(600px) rotateX(25deg)
//   F3 · anchoring and the clamp before a MutationObserver callback reads (facts13.mjs A is the full read; here the callback read only)
//   F4 · document.timeline.currentTime and a running CSS transition's sampled value in a rAF callback of frame N and in a task posted from
//        it, before frame N+1 (30 samples): equal or not
//   F5 · `transition: all 150ms` (and `transition-property: all`) on the element read: does the registered read return its initial -1?
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const L = () => os.loadavg().map((x) => x.toFixed(2)).join("/");
const BASE = `<!doctype html><meta charset=utf-8><style>
@property --engage-read-time { syntax: "<time>"; inherits: false; initial-value: -1s; }
@property --engage-read-number { syntax: "<number>"; inherits: false; initial-value: -1; }
@property --engage-read-length { syntax: "<length>"; inherits: false; initial-value: -1px; }
html, body { margin: 0; } </style><body></body>`;
console.log(`# facts13c ${engine} · ${new Date().toISOString()} · load ${L()}`);
const browser = await pw[engine].launch({ headless: true });
const cell = async (name, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  try { const page = await ctx.newPage(); await page.setContent(BASE); console.log(`## ${name} · load ${L()}`); console.log(await page.evaluate(fn)); }
  catch (e) { console.log(`## ${name} ERROR ${String(e).slice(0, 300)}`); }
  finally { await ctx.close(); }
};
try {
  console.log(`# browser ${browser.version()}`);
  await cell("F1 registered read per form", () => {
    const NUM = String.raw`[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?`;
    const CANON = { ms: new RegExp(`^(${NUM})(ms|s)$`, "i"), number: new RegExp(`^(${NUM})$`, "i"), px: new RegExp(`^(${NUM})px$`, "i") };
    const READ = { ms: "--engage-read-time", number: "--engage-read-number", px: "--engage-read-length" };
    const CONS = { ms: ["transition-duration", "var(--tok)"], number: ["scale", "var(--tok)"], px: ["padding-left", "var(--tok)"] };
    const DEF = { ms: "210ms", number: "1.06", px: "16px" };
    const valueOf = (t, u) => { const m = CANON[u].exec(t); return m ? Number(m[1]) * (m[2]?.toLowerCase() === "s" ? 1000 : 1) : NaN; };
    const F = {
      ms: ["210ms", "0.21s", "210MS", "2.1e2ms", "+0.21s", "/* c */ 210ms", "calc(0.1s + 110ms)", "calc(105ms * 2)", "min(210ms, 1s)", "max(210ms, 1ms)", "clamp(1ms, 210ms, 1s)", "round(nearest, 214ms, 10ms)", "mod(1210ms, 1000ms)", "rem(1210ms, 1000ms)", "abs(-210ms)", "calc(0.21s * sign(1s))", "calc(0.21s * pi / pi)", "calc(0.21s * e / e)", "calc(infinity * 1s)", "calc(var(--nope, 210ms))", "var(--nope, 210ms)", "inherit", "initial", "unset", "210ms, 1s", "210", "21%"],
      number: ["1.06", "1.06E0", "+1.06", "/* c */ 1.06", "calc(1 + 0.06)", "min(1.06, 2)", "max(1.06, 1)", "clamp(1, 1.06, 2)", "round(1.06, 0.01)", "mod(3.06, 2)", "rem(3.06, 2)", "abs(-1.06)", "calc(sign(1) * 1.06)", "calc(1.06 * pi / pi)", "calc(1.06 * e / e)", "calc(infinity)", "calc(var(--nope, 1.06))", "var(--nope, 1.06)", "inherit", "initial", "unset", "1.06, 2", "106%"],
      px: ["16px", "16PX", "1.6e1px", "+16px", "/* c */ 16px", "calc(8px + 8px)", "min(16px, 99px)", "max(16px, 1px)", "clamp(1px, 16px, 99px)", "round(16.4px, 1px)", "mod(36px, 20px)", "rem(36px, 20px)", "abs(-16px)", "calc(16px * sign(1px))", "calc(16px * pi / pi)", "calc(16px * e / e)", "calc(infinity * 1px)", "calc(var(--nope, 16px))", "var(--nope, 16px)", "inherit", "initial", "unset", "1rem", "1em", "2vw", "5%", "16px 2px", "16"],
    };
    const out = [];
    const par = document.createElement("div"); par.style.cssText = "font-size: 16px; width: 800px"; document.body.append(par);
    const el = document.createElement("div"); el.style.cssText = "font-size: 14px"; par.append(el);
    for (const [u, list] of Object.entries(F)) {
      par.style.setProperty("--tok", DEF[u]);
      for (const f of list) {
        el.style.setProperty("--tok", f);
        el.style.setProperty(READ[u], "var(--tok)");
        const text = getComputedStyle(el).getPropertyValue(READ[u]).trim();
        el.style.removeProperty(READ[u]);
        el.style.setProperty(CONS[u][0], CONS[u][1]);
        const cons = getComputedStyle(el).getPropertyValue(CONS[u][0]).trim();
        el.style.removeProperty(CONS[u][0]);
        const v = valueOf(text, u);
        out.push(`F1 ${u} | ${JSON.stringify(f)} | registered "${text}" -> ${Number.isFinite(v) && v >= 0 ? v : "REFUSED"} | consumer ${CONS[u][0]} "${cons}"`);
      }
    }
    return out.join("\n");
  });
  await cell("F2 paused composite add translate, same task", () => {
    const out = [];
    for (const [n, css] of [["none", ""], ["scale 0.8", "scale: 0.8"], ["rotate 10deg", "rotate: 10deg"], ["perspective(600px) rotateX(25deg)", "transform: perspective(600px) rotateX(25deg)"]]) {
      document.body.innerHTML = `<div style="height:200px"></div><div id="c" style="${css};width:400px;padding:40px;margin-left:100px"><div id="h" style="width:120px;height:24px;background:#36c"></div></div>`;
      const h = document.getElementById("h");
      const ctr = () => { const r = h.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
      const p0 = ctr();
      const probe = (x, y) => { const a = h.animate({ translate: [`${x}px ${y}px`, `${x}px ${y}px`] }, { duration: 1, fill: "both", composite: "add" }); a.pause(); try { return ctr(); } finally { a.cancel(); } };
      const px = probe(40, 0), py = probe(0, 40);
      h.style.translate = "40px 0"; const sx = ctr(); h.style.translate = "0 40px"; const sy = ctr(); h.style.translate = "";
      const d = (q) => `(${(q[0] - p0[0]).toFixed(3)}, ${(q[1] - p0[1]).toFixed(3)})`;
      out.push(`F2 ${n}: probe 40px 0 moves ${d(px)}, probe 0 40px moves ${d(py)} · inline translate 40px 0 ${d(sx)}, 0 40px ${d(sy)} · after cancel ${d(ctr())}`);
    }
    return out.join("\n");
  });
  await cell("F3 anchoring and clamp at the MutationObserver callback", () => new Promise((ok) => {
    const out = [];
    const run = (name, setup, act, k) => {
      document.body.innerHTML = `<div id="pre" style="height:40px"></div><div style="height:600px"></div><div id="tgt" style="height:40px;background:#36c"></div><div id="tail" style="height:${setup === "end" ? 200 : 1200}px"></div><div id="end" style="height:40px"></div>`;
      const sc = document.scrollingElement; const tgt = document.getElementById("tgt");
      sc.scrollTop = setup === "end" ? sc.scrollHeight : 540;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const b = { st: sc.scrollTop, top: tgt.getBoundingClientRect().top };
        const mo = new MutationObserver(() => { mo.disconnect(); out.push(`F3 ${name}: before st ${b.st} top ${b.top.toFixed(2)} · callback st ${sc.scrollTop} top ${tgt.getBoundingClientRect().top.toFixed(2)}`); k(); });
        mo.observe(document.documentElement, { childList: true, subtree: true });
        act();
      }));
    };
    run("page insert above", "top", () => { const d = document.createElement("div"); d.style.height = "40px"; document.body.prepend(d); }, () =>
      run("page remove above", "top", () => document.getElementById("pre").remove(), () =>
        run("page clamp remove below", "end", () => document.getElementById("end").remove(), () => ok(out.join("\n")))));
  }));
  await cell("F4 timeline time and a running transition, rAF vs a task posted from it", () => new Promise((ok) => {
    document.body.innerHTML = `<div id="t" style="width:100px;height:20px;background:#36c;translate:0 0;transition:translate 2000ms linear"></div>`;
    const t = document.getElementById("t"); const out = []; let n = 0, eqT = 0, eqV = 0, raced = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      t.style.translate = "400px 0";
      const tick = () => {
        let frames = 0; const fr = () => { frames++; };
        const tA = document.timeline.currentTime; const vA = getComputedStyle(t).translate;
        requestAnimationFrame(fr);
        const ch = new MessageChannel();
        ch.port1.onmessage = () => {
          const tB = document.timeline.currentTime; const vB = getComputedStyle(t).translate;
          const race = frames > 0; if (race) raced++;
          if (tA === tB) eqT++; if (vA === vB) eqV++;
          if (n < 6 || tA !== tB || vA !== vB) out.push(`F4 sample ${n}: rAF t ${tA?.toFixed?.(3)} translate ${vA} · task t ${tB?.toFixed?.(3)} translate ${vB}${race ? " · a frame ran between (race)" : ""}`);
          n++; if (n < 30) requestAnimationFrame(tick); else { out.push(`F4 summary: ${n} samples · timeline time equal ${eqT}/${n} · transition value equal ${eqV}/${n} · a frame between ${raced}/${n}`); ok(out.join("\n")); }
        };
        ch.port2.postMessage(0);
      };
      requestAnimationFrame(tick);
    }));
  }));
  await cell("F5 transition all on the element read", () => {
    const out = [];
    for (const css of ["transition: all 150ms", "transition: all 300ms linear", "transition-property: all; transition-duration: 150ms", "transition: --engage-read-time 150ms", "transition: opacity 150ms", "transition: none"]) {
      document.body.innerHTML = `<div id="e" style="${css}; --settle: 0.21s; --scale: 1.06; --gut: 16px"></div>`;
      const e = document.getElementById("e"); getComputedStyle(e).opacity;
      const rd = (prop, tok) => { e.style.setProperty(prop, `var(${tok})`); const v = getComputedStyle(e).getPropertyValue(prop).trim(); e.style.removeProperty(prop); return v; };
      const a = rd("--engage-read-time", "--settle"), b = rd("--engage-read-number", "--scale"), c = rd("--engage-read-length", "--gut");
      const a2 = rd("--engage-read-time", "--settle");
      out.push(`F5 ${css}: time "${a}" (second read "${a2}") · number "${b}" · length "${c}" · animations after ${e.getAnimations().length}`);
    }
    return out.join("\n");
  });
} finally { await browser.close(); console.log(`# end · load ${L()}`); }
