// BM pass 10, Critic B's check (not a design page; changes no design, page or source). Three claims of pass 10 that only a
// run can judge, read in headless Chromium (no GPU) and in Playwright WebKit (an engine build, not Safari; it draws no
// backdrop blur, which no cell here needs). Neither engine is an iPhone reading.
//  1. DESIGN §3 / §10.7: "the rounded clip bounds the ::before's hit area". pass-10/access/window-hit.mjs's four points all
//     lie outside the ::before's own box or its own corner, so none of them tests the window's clip. Two points are added
//     inside the ::before's box but outside the window's clip: its rectangular part (300, 126) and its rounded end
//     (250, 102). The four original points are kept.
//  2. DESIGN §10.7 / §13.9 A8: "The slider's grown ground takes no pointer (pointer-events: none on the shell). The root's
//     box is the hit region at every state." The sketch (`slider/sketch/slider-expand-c.css`) gives the shell
//     `pointer-events: auto` while hovered, held or keyed. Read on p10-probe's own fixture (BL fe30f9882's sheet with C
//     spliced in, over the same dist tokens), with a neighbour button 4 px left of the slider: which element takes a
//     point 2 px and 6 px outside the root's left edge, at rest, hovered, held and keyed.
//  3. DESIGN §9 / §10.1: "a press starts two legs, the rays and the night", and the glyph's night carves by a CSS
//     `translate` on a circle inside an SVG <mask>. On P10-toggle (B, large): the animations a theme flip starts on the
//     toggle, and the glyph's ink area with every animation paused at 0, 60, 120, 180 and 260 ms, so a mask that does not
//     follow its child's transition shows as a flat or jumping series. At the dark end state, three pixels (the bite at
//     the night's centre, the disc outside it, the card) as built and with the night filled black: the sketch sets
//     `fill: currentColor` on the svg, which the mask's circle inherits, and a luminance mask cuts only as much as the
//     fill is dark.
// Run, one engine per guarded call:
//   ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-10/critique-B-check.mjs chromium
//   ~/.claude/guard/guarded --exclusive webkit --timeout 10 -- node docs/tranches/BM/study/pass-10/critique-B-check.mjs webkit
// One browser per run, one context per cell, everything closed in finally. Writes critique-B-check-<engine>.json.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ENGINE = process.argv[2];
if (!["chromium", "webkit"].includes(ENGINE)) throw new Error("engine: chromium | webkit");
const HERE = path.dirname(new URL(import.meta.url).pathname), STUDY = path.resolve(HERE, ".."), REPO = path.resolve(STUDY, "../../../..");
const wrap = (body, head = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;

// 1. the window (verbatim from window-hit.mjs, with two points added)
const windowPage = (cure) => `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin: 0 }
.capsule-window { position: fixed; left: 200px; top: 100px; width: 236px; height: 52px; --from: 184px;
  border-radius: calc(infinity * 1px); overflow: clip; translate: calc(-1 * var(--from)) 0; ${cure ? "pointer-events: none;" : ""} }
.capsule-window::before { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #888;
  translate: var(--from) 0; ${cure ? "pointer-events: auto;" : ""} }
.under { position: fixed; left: 40px; top: 100px; width: 120px; height: 52px; background: #eee; }
</style></head><body><button class="under" id="under">neighbour</button><nav class="capsule-window" id="dock"></nav></body></html>`;
const POINTS = {
  disc_centre: [226, 126], over_neighbour_100: [100, 126], gap_between_180: [180, 126], disc_corner_outside_203_102: [203, 102],
  inside_before_outside_clip_300_126: [300, 126], inside_before_outside_round_clip_250_102: [250, 102],
};

// 2. the slider fixture (p10-probe.mjs's, plus a neighbour)
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist/styles/index.css";
const raw = execFileSync("git", ["-C", REPO, "show", "fe30f9882:src/components/slider/styles.css"], { encoding: "utf8" });
const b = raw.indexOf("THE EXPANDED VIEW (`expand`)"), s0 = raw.lastIndexOf("/*", b), s1 = raw.indexOf("/* Forced colours (last");
const sketch = (f) => readFileSync(path.join(HERE, "slider/sketch", f), "utf8");
const sheetC = raw.slice(0, s0) + sketch("slider-expand-c.css") + raw.slice(s1) + "\n" + sketch("slider-expand-c.fc.css");
const tokens = readFileSync(DIST, "utf8") + ["scheme-motion", "scheme-spring"].map((f) => execFileSync("git", ["-C", REPO, "show", `master:src/styles/tokens/${f}.css`], { encoding: "utf8" })).join("\n");
const sliderPage = wrap(`<div style="position:relative;padding:60px 40px;max-width:360px">
<button id="nb" style="position:absolute;left:0;top:60px;width:36px;height:20px;padding:0;border:0;background:#ddd">n</button>
<div class="glass-slider" id="s" data-expand data-size="md" style="--slider-track-height:20px">
<span class="slider-shell" aria-hidden="true"></span>
<span class="slider-track track-well"><span class="slider-lane"><span class="slider-range"></span></span></span>
<span class="slider-thumb" role="slider" tabindex="0" aria-label="Volume" aria-valuenow="62" style="--slider-p:0.62;position:absolute;left:60%"></span>
</div></div>`, `<style>${tokens}</style><style>${sheetC}</style>`);

// 3. the toggle page, as p10-probe wraps it
const togglePage = wrap(readFileSync(path.join(STUDY, "pages/P10-toggle.html"), "utf8"));
const inkCount = (buf) => {
  const png = PNG.sync.read(buf), { width: w, height: h, data: d } = png, bg = [d[0], d[1], d[2]];
  let n = 0;
  for (let i = 0; i < w * h * 4; i += 4) if (Math.abs(d[i] - bg[0]) + Math.abs(d[i + 1] - bg[1]) + Math.abs(d[i + 2] - bg[2]) > 60) n++;
  return { ink: n, of: w * h };
};

// Pixels at the end state of the big toggle (120 px, padding 24, a 72 px svg on a 24-unit viewBox, 3 px a unit): the
// bite (the night's centre, 15.5 8.5, inside the disc), the disc outside the bite (12 15), and the corner (the card).
const px = (buf, ux, uy) => { const png = PNG.sync.read(buf), x = Math.round(24 + ux * 3), y = Math.round(24 + uy * 3), i = (y * png.width + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
const samples = (buf) => ({ bite_15_5_8_5: px(buf, 15.5, 8.5), disc_12_15: px(buf, 12, 15), card_corner: px(buf, -7.5, -7.5) });
const out = { engine: ENGINE, at: new Date().toISOString(), note: "headless; not Safari, not an iPhone reading", cells: {} };
const browser = await (ENGINE === "webkit" ? webkit : chromium).launch({ headless: true });
out.version = browser.version();
const cell = async (name, opts, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 480, height: 320 }, deviceScaleFactor: 1, ...opts });
  try { out.cells[name] = await fn(await ctx.newPage()); } catch (e) { out.cells[name] = { error: String(e && e.message || e) }; } finally { await ctx.close(); }
};
try {
  for (const cure of [false, true]) await cell(`window ${cure ? "pass5_cure" : "as_written"}`, {}, async (p) => {
    await p.setContent(windowPage(cure));
    return p.evaluate((pts) => Object.fromEntries(Object.entries(pts).map(([k, [x, y]]) => { const e = document.elementFromPoint(x, y); return [k, e ? e.id || e.tagName : null]; })), POINTS);
  });

  await cell("slider hit, C on the real sheet", {}, async (p) => {
    await p.setContent(sliderPage, { waitUntil: "load" }); await p.waitForTimeout(150);
    const res = {};
    for (const [state, attrs] of [["rest", []], ["hover", ["data-hover"]], ["held", ["data-held"]], ["tab", ["data-focus-key"]]]) {
      await p.evaluate((at) => { const s = document.getElementById("s"); ["data-hover", "data-held", "data-focus-key"].forEach((x) => s.removeAttribute(x)); at.forEach((x) => s.setAttribute(x, "")); document.getAnimations().forEach((a) => a.finish()); }, attrs);
      await p.waitForTimeout(450);
      await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
      res[state] = await p.evaluate(() => {
        const s = document.getElementById("s"), r = s.getBoundingClientRect(), nb = document.getElementById("nb").getBoundingClientRect();
        const sh = s.querySelector(".slider-shell"), cs = getComputedStyle(sh);
        const y = r.top + r.height / 2, who = (x) => { const e = document.elementFromPoint(x, y); return e ? (e.id || e.className || e.tagName) : null; };
        return { root: [Math.round(r.left), Math.round(r.right)], neighbourRight: Math.round(nb.right), shellPointer: cs.pointerEvents, shellClip: cs.clipPath,
          at_2px_outside_root: who(r.left - 2), at_6px_outside_root_over_neighbour: who(r.left - 6), at_root_inside: who(r.left + 4) };
      });
    }
    return res;
  });

  await cell("toggle B, a theme flip", { viewport: { width: 1280, height: 900 } }, async (p) => {
    await p.setContent(togglePage, { waitUntil: "load" }); await p.waitForTimeout(200);
    const el = p.locator('.tg.big[data-v="b"]');
    await el.evaluate((t) => t.scrollIntoView({ block: "center" }));
    await p.evaluate(() => { document.documentElement.dataset.theme = "light"; document.querySelectorAll(".tg").forEach((t) => t.setAttribute("aria-pressed", "false")); });
    await p.waitForTimeout(400);
    await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
    await p.waitForTimeout(100);
    const before = await el.evaluate((t) => ({ theme: document.documentElement.dataset.theme, night: getComputedStyle(t.querySelector(".night")).translate, rays: getComputedStyle(t.querySelector(".rays")).scale }));
    await el.evaluate((t) => t.click()); // a click with no pointer: no hover, no focus ring, no press plate
    await p.waitForTimeout(16);
    const legs = await el.evaluate((t) => document.getAnimations().filter((a) => a.effect && a.effect.target && t.contains(a.effect.target))
      .map((a) => `${a.effect.target.getAttribute("class") || a.effect.target.tagName}${a.effect.pseudoElement || ""} ${a.transitionProperty || a.animationName}`));
    const docAnimations = await p.evaluate(() => document.getAnimations().length);
    await p.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
    const series = [];
    for (const t of [0, 60, 120, 180, 260]) {
      await p.evaluate((ms) => document.getAnimations().forEach((a) => { a.currentTime = ms; }), t);
      await p.waitForTimeout(40);
      const style = await el.evaluate((tg) => ({ night: getComputedStyle(tg.querySelector(".night")).translate, rays: getComputedStyle(tg.querySelector(".rays")).scale, color: getComputedStyle(tg).color }));
      series.push({ t, ...style, ...inkCount(await el.screenshot()) });
    }
    await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
    await p.waitForTimeout(60);
    const end = await el.evaluate((tg) => ({ night: getComputedStyle(tg.querySelector(".night")).translate, rays: getComputedStyle(tg.querySelector(".rays")).scale }));
    const shot = await el.screenshot();
    return { before, legs, docAnimations, series, end: { ...end, ...inkCount(shot), ...samples(shot) } };
  });

  // The control: the same page with the night's fill set to black, as a luminance mask needs, so the bite is fully cut.
  await cell("toggle B, dark end state; control with the night filled black", { viewport: { width: 1280, height: 900 } }, async (p) => {
    const res = {};
    for (const [name, extra] of [["as_built", ""], ["night_fill_black", "<style>.night{fill:#000}</style>"]]) {
      await p.setContent(togglePage.replace("</head>", extra + "</head>"), { waitUntil: "load" }); await p.waitForTimeout(150);
      const el = p.locator('.tg.big[data-v="b"]');
      await el.evaluate((t) => t.scrollIntoView({ block: "center" }));
      await p.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
      await p.waitForTimeout(400);
      await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
      await p.waitForTimeout(100);
      const shot = await el.screenshot();
      res[name] = { nightFill: await el.evaluate((t) => getComputedStyle(t.querySelector(".night")).fill), ...inkCount(shot), ...samples(shot) };
    }
    return res;
  });
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, `critique-B-check-${ENGINE}.json`), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
