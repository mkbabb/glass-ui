#!/usr/bin/env node
// H13-complete (D5 pass 13, c1): the second follow-up to facts13c, LIBRARY-FREE. Not a witness.
//   node facts13e.mjs <chromium|webkit>
//   F6 · the consumer's fragments (C-A13 calcctx's members) through P-E13's registered read on a FRESH element with no transition on it:
//        does the read take `0.1s + 110ms`, `105ms * 2`, `2 * 105ms`, `1 + 0.06`, `2 * 0.53` (C-A13 recorded WebKit taking the time
//        fragments on an element that also carried the consumer's transition-duration, so a running `transition: all`)?
//   F7 · a transition on the element read, and the read's history: an element with `transition-duration: 210ms` (transition-property at
//        its default, all) and, separately, Tailwind's `transition-all` shape (`transition-property: all; transition-duration: 150ms`):
//        read a valid token (999ms), then a refused one (nonsense), then a valid one (210ms), each in the same task, then again 400 ms later.
//        A refused form must read -1s; a valid one its value. Any earlier value handed back is a silent read
const GLASS = "/Users/mkbabb/Programming/glass-ui";
const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
const os = await import("node:os");
const engine = process.argv[2] ?? "chromium";
const L = () => os.loadavg().map((x) => x.toFixed(2)).join("/");
const BASE = `<!doctype html><meta charset=utf-8><style>
@property --engage-read-time { syntax: "<time>"; inherits: false; initial-value: -1s; }
@property --engage-read-number { syntax: "<number>"; inherits: false; initial-value: -1; }
html, body { margin: 0; } </style><body></body>`;
console.log(`# facts13e ${engine} · ${new Date().toISOString()} · load ${L()}`);
const browser = await pw[engine].launch({ headless: true });
const cell = async (name, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 800 } });
  try { const page = await ctx.newPage(); await page.setContent(BASE); console.log(`## ${name} · load ${L()}`); console.log(await page.evaluate(fn)); }
  catch (e) { console.log(`## ${name} ERROR ${String(e).slice(0, 300)}`); }
  finally { await ctx.close(); }
};
try {
  console.log(`# browser ${browser.version()}`);
  await cell("F6 consumer fragments, fresh element", () => {
    const out = [];
    for (const [u, prop, f] of [["ms", "--engage-read-time", "0.1s + 110ms"], ["ms", "--engage-read-time", "105ms * 2"], ["ms", "--engage-read-time", "2 * 105ms"], ["ms", "--engage-read-time", "calc(0.1s + 110ms)"], ["number", "--engage-read-number", "1 + 0.06"], ["number", "--engage-read-number", "2 * 0.53"], ["number", "--engage-read-number", "calc(1 + 0.06)"]]) {
      const el = document.createElement("div"); document.body.append(el); el.style.setProperty("--tok", f);
      el.style.setProperty(prop, "var(--tok)"); const v = getComputedStyle(el).getPropertyValue(prop).trim(); el.remove();
      const c = document.createElement("div"); document.body.append(c); c.style.cssText = `--tok: ${f}; --motion-tempo: 1;`;
      const cons = u === "ms" ? (c.style.setProperty("transition-duration", "calc(var(--tok) * var(--motion-tempo))"), getComputedStyle(c).transitionDuration) : (c.style.setProperty("scale", "calc(1 + (var(--tok) - 1) * 1)"), getComputedStyle(c).scale); c.remove();
      out.push(`F6 ${u} | ${JSON.stringify(f)} | registered read (fresh, no transition) "${v}" | the library's consumer computes "${cons}"`);
    }
    return out.join("\n");
  });
  await cell("F3b anchoring as getBoundingClientRect reads it in the MutationObserver callback (no scroll query first)", () => new Promise((ok) => {
    const out = [];
    const run = (name, order, k) => {
      document.body.innerHTML = `<div id="pre" style="height:40px"></div><div style="height:900px"></div><div id="tgt" style="height:40px;background:#36c"></div><div style="height:1400px"></div>`;
      const sc = document.scrollingElement; const tgt = document.getElementById("tgt"); sc.scrollTop = 840;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const t0 = tgt.getBoundingClientRect().top, s0 = sc.scrollTop;
        const mo = new MutationObserver(() => { mo.disconnect();
          const r = order === "rect first" ? [`rect ${tgt.getBoundingClientRect().top.toFixed(2)}`, `scrollTop ${sc.scrollTop}`, `rect ${tgt.getBoundingClientRect().top.toFixed(2)}`] : [`scrollTop ${sc.scrollTop}`, `rect ${tgt.getBoundingClientRect().top.toFixed(2)}`];
          requestAnimationFrame(() => requestAnimationFrame(() => { out.push(`F3b ${name} (${order}): before scrollTop ${s0} rect ${t0.toFixed(2)} · callback ${r.join(", ")} · two frames later scrollTop ${sc.scrollTop} rect ${tgt.getBoundingClientRect().top.toFixed(2)}`); k(); }));
        });
        mo.observe(document.body, { childList: true, subtree: true });
        const d = document.createElement("div"); d.style.height = "40px"; document.body.prepend(d);
      }));
    };
    run("page insert above", "rect first", () => run("page insert above", "rect first", () => run("page insert above", "scrollTop first", () => ok(out.join("\n")))));
  }));
  await cell("F7 a transition on the element read, by history", async () => {
    const out = [];
    for (const css of ["transition-duration: 210ms", "transition-property: all; transition-duration: 150ms", "transition: none"]) {
      const el = document.createElement("div"); el.style.cssText = css; document.body.append(el); getComputedStyle(el).opacity;
      const rd = (tok) => { el.style.setProperty("--tok", tok); el.style.setProperty("--engage-read-time", "var(--tok)"); const v = getComputedStyle(el).getPropertyValue("--engage-read-time").trim(); el.style.removeProperty("--engage-read-time"); return v; };
      const a = rd("999ms"), b = rd("nonsense"), c = rd("210ms");
      await new Promise((r) => setTimeout(r, 400));
      const d = rd("nonsense"), e = rd("210ms"), f = rd("999ms");
      out.push(`F7 ${css}: same task 999ms "${a}" · nonsense "${b}" · 210ms "${c}" | 400 ms later nonsense "${d}" · 210ms "${e}" · 999ms "${f}" · animations on it ${el.getAnimations().length}`);
      el.remove();
    }
    return out.join("\n");
  });
} finally { await browser.close(); console.log(`# end · load ${L()}`); }
