#!/usr/bin/env node
// H13-complete (D5 pass 13, c1): follow-up engine facts to facts13c's first WebKit read, LIBRARY-FREE. Not a witness.
//   node facts13d.mjs <chromium|webkit>
//   F1d · a refused form read through P-E13's registered read (tokenOf: write var(<token>) inline on the element, read the computed value,
//         remove it), in four histories: (a) a fresh element that never held the token; (b) the same element read before with the token at
//         999ms / 9.99 / 99px; (c) as (b) with the read property never removed between reads; (d) the library's shape: the token on <html>,
//         read on a child host, read once at the valid value and then with <html>'s token changed to the refused form (a runtime theme write).
//         A refused form must read the initial (-1 of the unit); any other value is the earlier read handed back silently
//   F4d · a running linear transition at 1 px/ms (1000 px over 1000 ms): its sampled value in a rAF callback and in a task posted from it,
//         before the next frame (60 samples): the difference in ms of animation time, and whether document.timeline.currentTime moved
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
console.log(`# facts13d ${engine} · ${new Date().toISOString()} · load ${L()}`);
const browser = await pw[engine].launch({ headless: true });
const cell = async (name, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  try { const page = await ctx.newPage(); await page.setContent(BASE); console.log(`## ${name} · load ${L()}`); console.log(await page.evaluate(fn)); }
  catch (e) { console.log(`## ${name} ERROR ${String(e).slice(0, 300)}`); }
  finally { await ctx.close(); }
};
try {
  console.log(`# browser ${browser.version()}`);
  await cell("F1d refused forms by history", () => {
    const READ = { ms: "--engage-read-time", number: "--engage-read-number", px: "--engage-read-length" };
    const PRIOR = { ms: "999ms", number: "9.99", px: "99px" };
    const REF = {
      ms: ["initial", "210ms, 1s", "210", "21%", "nonsense", "1px"],
      number: ["initial", "1.06, 2", "106%", "nonsense", "1px"],
      px: ["initial", "16px 2px", "16", "5%", "nonsense", "1s"],
    };
    const rd = (el, u, keep) => { el.style.setProperty(READ[u], "var(--tok)"); const v = getComputedStyle(el).getPropertyValue(READ[u]).trim(); if (!keep) el.style.removeProperty(READ[u]); return v; };
    const out = [];
    for (const [u, list] of Object.entries(REF)) for (const f of list) {
      const a = document.createElement("div"); document.body.append(a); a.style.setProperty("--tok", f); const va = rd(a, u); a.remove();
      const b = document.createElement("div"); document.body.append(b); b.style.setProperty("--tok", PRIOR[u]); const pb = rd(b, u); b.style.setProperty("--tok", f); const vb = rd(b, u); b.remove();
      const c = document.createElement("div"); document.body.append(c); c.style.setProperty("--tok", PRIOR[u]); const pc = rd(c, u, true); c.style.setProperty("--tok", f); const vc = rd(c, u, true); c.remove();
      const host = document.createElement("div"); document.body.append(host); document.documentElement.style.setProperty("--tok", PRIOR[u]); const pd = rd(host, u); document.documentElement.style.setProperty("--tok", f); const vd = rd(host, u); host.remove(); document.documentElement.style.removeProperty("--tok");
      out.push(`F1d ${u} | ${JSON.stringify(f)} | (a) fresh "${va}" · (b) after "${pb}" -> "${vb}" · (c) kept after "${pc}" -> "${vc}" · (d) <html> token after "${pd}" -> "${vd}"`);
    }
    return out.join("\n");
  });
  await cell("F4d transition sample, rAF vs posted task, 1 px/ms", () => new Promise((ok) => {
    document.body.innerHTML = `<div id="t" style="width:20px;height:20px;background:#36c;translate:0 0;transition:translate 1000ms linear"></div>`;
    const t = document.getElementById("t"); const px = () => parseFloat(getComputedStyle(t).translate) || 0;
    const ds = []; let n = 0, tmoved = 0, raced = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      t.style.translate = "1000px 0";
      const tick = () => {
        let frames = 0; requestAnimationFrame(() => { frames++; });
        const tA = document.timeline.currentTime, vA = px();
        const ch = new MessageChannel();
        ch.port1.onmessage = () => {
          const tB = document.timeline.currentTime, vB = px();
          if (frames) raced++; if (tA !== tB) tmoved++;
          if (vA > 0 && vA < 990) ds.push(vB - vA);
          n++; if (n < 60) requestAnimationFrame(tick);
          else { const s = [...ds].sort((x, y) => x - y); const nz = ds.filter((d) => Math.abs(d) > 0.01).length;
            ok(`F4d ${n} samples (${ds.length} mid-flight) · timeline moved ${tmoved}/${n} · a frame between ${raced}/${n} · task − rAF sample, ms of animation time at 1 px/ms: nonzero ${nz}/${ds.length}, min ${s[0]?.toFixed(3)}, median ${s[Math.floor(s.length / 2)]?.toFixed(3)}, max ${s[s.length - 1]?.toFixed(3)}`); }
        };
        ch.port2.postMessage(0);
      };
      requestAnimationFrame(tick);
    }));
  }));
} finally { await browser.close(); console.log(`# end · load ${L()}`); }
