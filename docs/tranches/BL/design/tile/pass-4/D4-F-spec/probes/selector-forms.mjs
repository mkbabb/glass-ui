// D4-F pass 4 · which spelling of the anatomy writer reaches its own group's items through
// consumer wrappers (K2's section > div, V1's family div) and stops at a nested group.
// Pure CSS, a static page, no library: the writer forms below set --t on the group; every
// group resets it to none. Reads each group's computed --t, statically and after a row is
// appended and removed (`:has()` invalidation). Chromium and Playwright WebKit, headless.
// usage: node selector-forms.mjs [chromium|webkit]
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/node_modules/");
const pw = require("playwright");

const ROW = ":is(.media, .meta)";
const FORMS = {
  desc: `.tg:has(.it > ${ROW}) { --t: flush; }`,
  child: `.tg:has(> .it > ${ROW}) { --t: flush; }`,
  scope: `@scope (.tg) to (.tg) { :scope:has(.it > ${ROW}) { --t: flush; } }`,
  notnested: `.tg:has(.it > ${ROW}):not(:has(.tg .it > ${ROW})) { --t: flush; }`,
  // the nearest group: an item and every wrapper between it and the group is not a group
  // the row's own group: a row inside a nested group has one more group above it. A group at
  // the top counts rows under exactly one group; a nested group counts rows under exactly two.
  // Unbounded in wrappers, bounded in group nesting (two levels; a radiogroup inside a
  // radiogroup is already outside ARIA's model)
  depth2: `.tg:has(.it > ${ROW}:not(.tg .tg *)), .tg .tg:has(.it > ${ROW}:not(.tg .tg .tg *)) { --t: flush; }`,
  chain3: `.tg:has(> .it > ${ROW}, > :not(.tg) > .it > ${ROW}, > :not(.tg) > :not(.tg) > .it > ${ROW}, > :not(.tg) > :not(.tg) > :not(.tg) > .it > ${ROW}) { --t: flush; }`,
};

// each case: markup, and the --t each [data-g] must read
const it = (row) => `<button class="it">label${row ? `<span class="${row}">x</span>` : ""}</button>`;
const CASES = {
  direct: { html: `<div class="tg" data-g="g">${it("meta")}${it("")}</div>`, want: { g: "flush" } },
  k2wrap: {
    html: `<div class="tg" data-g="g"><section><h3>fam</h3><div class="grid">${it("media")}${it("media")}</div></section></div>`,
    want: { g: "flush" },
  },
  v1wrap: { html: `<div class="tg" data-g="g"><div class="fam"><span>e</span><div class="tiles">${it("media")}</div></div></div>`, want: { g: "flush" } },
  contents: { html: `<div class="tg" data-g="g"><div style="display:contents">${it("meta")}</div></div>`, want: { g: "flush" } },
  none: { html: `<div class="tg" data-g="g">${it("")}${it("")}</div>`, want: { g: "none" } },
  tileInPill: {
    html: `<div class="tg" data-g="outer">${it("")}${it("")}<div class="wrap"><div class="tg" data-g="inner">${it("meta")}</div></div></div>`,
    want: { outer: "none", inner: "flush" },
  },
  tileInPillDirect: {
    html: `<div class="tg" data-g="outer">${it("")}<div class="tg" data-g="inner">${it("meta")}</div></div>`,
    want: { outer: "none", inner: "flush" },
  },
  pillInTile: {
    html: `<div class="tg" data-g="outer">${it("meta")}<div class="wrap"><div class="tg" data-g="inner">${it("")}${it("")}</div></div></div>`,
    want: { outer: "flush", inner: "none" },
  },
  bothTiles: {
    html: `<div class="tg" data-g="outer"><div class="wrap">${it("meta")}</div><div class="wrap"><div class="tg" data-g="inner">${it("meta")}</div></div></div>`,
    want: { outer: "flush", inner: "flush" },
  },
  deepWrap: {
    html: `<div class="tg" data-g="g"><div><div><div><div><section>${it("meta")}</section></div></div></div></div></div>`,
    want: { g: "flush" },
  },
  nest3: {
    // reported: a tile group three groups deep
    html: `<div class="tg" data-g="a">${it("")}<div class="tg" data-g="b">${it("")}<div class="w"><div class="tg" data-g="c">${it("meta")}</div></div></div></div>`,
    want: { a: "none", b: "none", c: "flush" },
  },
  rowInContent: {
    // a row class inside slotted content, not a direct child of the item: not anatomy
    html: `<div class="tg" data-g="g"><button class="it"><span>label<span class="meta">nested</span></span></button></div>`,
    want: { g: "none" },
  },
};

const engine = process.argv[2] || "chromium";
const load = () => (require("node:os").loadavg()[0]).toFixed(2);
const b = engine === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch();
let pass = 0, total = 0;
const out = [];
console.log(`# selector-forms · ${engine} ${b.version()} · load ${load()} · ${new Date().toISOString()}`);
try {
  for (const [form, rule] of Object.entries(FORMS)) {
    const ctx = await b.newContext();
    try {
      const page = await ctx.newPage();
      let fp = 0, ft = 0;
      for (const [name, c] of Object.entries(CASES)) {
        await page.setContent(`<style>.tg{--t:none}${rule}</style><main>${c.html}</main>`);
        const read = () => page.evaluate(() => Object.fromEntries([...document.querySelectorAll("[data-g]")].map((g) => [g.dataset.g, getComputedStyle(g).getPropertyValue("--t").trim()])));
        const got = await read();
        const ok = Object.entries(c.want).every(([g, v]) => got[g] === v);
        ft++; total++; if (ok) { fp++; pass++; }
        out.push(`${ok ? "PASS" : "FAIL"} ${engine} ${form} ${name} · got ${JSON.stringify(got)} want ${JSON.stringify(c.want)}`);
      }
      // dynamic: a row appended to a wrapped item after load, then removed
      await page.setContent(`<style>.tg{--t:none}${rule}</style><main><div class="tg" data-g="g"><section><div>${it("")}${it("")}</div></section></div></main>`);
      const g = () => page.evaluate(() => getComputedStyle(document.querySelector("[data-g]")).getPropertyValue("--t").trim());
      const before = await g();
      await page.evaluate(() => { const s = document.createElement("span"); s.className = "meta"; s.textContent = "y"; document.querySelector(".it").append(s); });
      await page.waitForTimeout(50);
      const added = await g();
      await page.evaluate(() => document.querySelector(".it .meta").remove());
      await page.waitForTimeout(50);
      const removed = await g();
      const dok = before === "none" && added === "flush" && removed === "none";
      ft++; total++; if (dok) { fp++; pass++; }
      out.push(`${dok ? "PASS" : "FAIL"} ${engine} ${form} dynamic-k2wrap · ${before} → ${added} → ${removed} (want none → flush → none)`);
      out.push(`== ${engine} ${form}: ${fp}/${ft}`);
    } finally {
      await ctx.close();
    }
  }
} finally {
  await b.close();
}
console.log(out.join("\n"));
console.log(`# ${engine} total ${pass}/${total} · load ${load()} · ${new Date().toISOString()}`);
