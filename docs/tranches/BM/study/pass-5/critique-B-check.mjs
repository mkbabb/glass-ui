// BM pass 5, Critic B: four cells only a browser can settle. Headless Chromium, which is not Safari and draws no GPU;
// every cell reads the cascade, layout or the page's own script, never paint.
// Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-5/critique-B-check.mjs
// One browser for the run, one context per cell, everything closed in finally.
//
//  1. load    Does a stylesheet linked by file:// apply in a page built by page.setContent (the method of
//             pass-5/mark/forced-colors.mjs), against the same page opened by page.goto(file://)?
//  2. focus   §7.6's outline ring (pass-5/mark/sketch/mark.next.css) beside the library's forced-colours focus ring
//             (src/styles/utilities/a11y-overrides.css:118-137): is the chosen option's focused outline
//             distinguishable from its unfocused one, under forced-colors: active and under prefers-contrast: more?
//  3. grid    §7.1's Q15 finding: the pill strip's `grid-auto-columns: 1fr` (segmented.css) in a container narrower
//             than n x its widest option. Are the columns still equal?
//  4. commit  P5-mark strip 1: grab the chosen option at its left edge, slide right, release with the finger over the
//             right half of the next option. Which option commits, and which was under the finger (§7.2: "the option
//             under the finger is chosen")?
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../..");
const seg = readFileSync(path.join(ROOT, "src/components/tabs/styles/segmented.css"), "utf8");
const mark = readFileSync(path.join(ROOT, "docs/tranches/BM/study/pages/P5-mark.html"), "utf8");
const out = { at: new Date().toISOString(), engine: "playwright chromium headless", cells: {} };
const scratch = mkdtempSync(path.join(tmpdir(), "bm-p5-cb-"));

const browser = await chromium.launch({ headless: true });
const cell = async (name, opts, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...opts });
  try { out.cells[name] = await fn(await ctx.newPage()); } catch (e) { out.cells[name] = { error: String(e) }; } finally { await ctx.close(); }
};
try {
  // 1. load
  const css = path.join(scratch, "probe.css"); writeFileSync(css, "#p{outline:3px solid rgb(1,2,3)}");
  const doc = `<!doctype html><link rel="stylesheet" href="file://${css}"><div id="p">x</div>`;
  const htmlFile = path.join(scratch, "probe.html"); writeFileSync(htmlFile, doc);
  const readOutline = () => getComputedStyle(document.getElementById("p")).outlineColor;
  await cell("load_setContent", {}, async (p) => { await p.setContent(doc, { waitUntil: "load" }); return p.evaluate(readOutline); });
  await cell("load_goto_file", {}, async (p) => { await p.goto("file://" + htmlFile); return p.evaluate(readOutline); });

  // 2. focus
  const strip = (extra) => `<!doctype html><style>
    .opt{border:0;padding:8px 12px;font:15px system-ui}
    @media (forced-colors: active){ .focus-ring:focus-visible{outline:2px solid Highlight;outline-offset:2px} }
    ${extra}</style>
    <div role="tablist"><button class="opt focus-ring" role="tab" aria-selected="true" data-active id="a">All</button><button class="opt focus-ring" role="tab" aria-selected="false" id="b">Shared</button></div>`;
  const sketch = `@media (forced-colors: active){.opt[data-active]{outline:2px solid Highlight;outline-offset:-2px}}
    @media (prefers-contrast: more){.opt[data-active]{outline:1px solid color-mix(in oklab, CanvasText 50%, transparent);outline-offset:-1px}}`;
  const ring = (id) => { const s = getComputedStyle(document.getElementById(id)); return `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} @${s.outlineOffset}`; };
  for (const [name, opts] of [["focus_forced", { forcedColors: "active" }], ["focus_more_contrast", { contrast: "more" }]]) {
    await cell(name, opts, async (p) => {
      await p.setContent(strip(sketch));
      const chosen_unfocused = await p.evaluate(ring, "a");
      await p.keyboard.press("Tab"); // focus enters the tablist on the chosen tab
      const focused = await p.evaluate(() => document.activeElement?.id);
      const chosen_focused = await p.evaluate(ring, "a");
      return { focused, chosen_unfocused, chosen_focused, distinguishable: chosen_unfocused !== chosen_focused };
    });
  }

  // 3. grid
  await cell("grid_constrained", {}, async (p) => {
    await p.setContent(`<!doctype html><style>${seg}</style>
      <div style="width:${200}px"><div class="segmented-tabs" id="s">
      <button class="segmented-tab">All</button><button class="segmented-tab">Shared</button><button class="segmented-tab">Favourites</button></div></div>
      <div style="width:600px;margin-top:20px"><div class="segmented-tabs" id="w">
      <button class="segmented-tab">All</button><button class="segmented-tab">Shared</button><button class="segmented-tab">Favourites</button></div></div>`);
    const widths = (id) => [...document.querySelectorAll(`#${id} .segmented-tab`)].map((b) => Math.round(b.getBoundingClientRect().width * 10) / 10);
    return { in_200px: await p.evaluate(widths, "s"), in_600px: await p.evaluate(widths, "w") };
  });

  // 4. commit
  await cell("p5_drag_commit", { hasTouch: false }, async (p) => {
    await p.setContent(`<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1">${mark}`);
    await p.waitForTimeout(200);
    const tabs = await p.evaluate(() => [...document.querySelectorAll('section[data-q="hold"] .strip:not(.seats) .tab')].map((t) => { const r = t.getBoundingClientRect(); return [r.left, r.right, r.top + r.height / 2, t.textContent]; }));
    const [l0, , y] = tabs[0], [l1, r1] = tabs[1];
    const from = l0 + 2, to = l1 + 0.8 * (r1 - l1);
    await p.mouse.move(from, y); await p.mouse.down();
    for (let i = 1; i <= 12; i++) { await p.mouse.move(from + ((to - from) * i) / 12, y); await p.waitForTimeout(16); }
    await p.mouse.up(); await p.waitForTimeout(500);
    const committed = await p.evaluate(() => document.querySelector('section[data-q="hold"] .strip:not(.seats) .tab[aria-selected="true"]').textContent);
    return { under_finger_at_release: tabs[1][3], committed };
  });
} finally {
  await browser.close();
  rmSync(scratch, { recursive: true, force: true });
}
writeFileSync(path.join(HERE, "critique-B-check.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
