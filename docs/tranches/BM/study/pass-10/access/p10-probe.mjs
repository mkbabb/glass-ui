// BM pass 10 (DESIGN §8.3, §9, §6.2, §10): one headless Chromium run over pass 10's three pages and over BL's real
// slider sheet with C spliced in. Chromium is not Safari, has no GPU here, and says nothing about threads.
//   1. counts: animations started 40 ms after a mouse rests past the 120 ms dwell, and after a press, for A, B and C on
//      P10-slider's three sliders (document.getAnimations(), declared transitions that start).
//   2. C's geometry frame by frame through a touch press and its release (P10-slider, default md): the ground's
//      half-height from its clip, against the band's; the hover's opening; Reduce Motion.
//   3. the real sheet: BL's `fe30f9882` slider sheet over the 11.1.0 dist's tokens, as built (A) and with C spliced in,
//      on the component's own DOM. For rest, hover, held and Tab: the shell's clip, its background, the track's
//      background and outline, the knob's scale, the animations a change starts; then under Reduce Motion, forced
//      colours and more contrast.
//   4. keyboard and the accessibility tree: Tab order and names over P10-toggle and P10-plate; the toggle's
//      aria-pressed and the legs a click starts; under Reduce Motion, the legs again.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-10/access/p10-probe.mjs
// One browser for the run, one context per cell, everything closed in finally. Writes p10-probe.json.
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), STUDY = path.resolve(HERE, "../.."), REPO = path.resolve(STUDY, "../../../..");
const page = (f) => readFileSync(path.join(STUDY, "pages", f + ".html"), "utf8");
const wrap = (body, head = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}
<style>:root{color-scheme:light}body{margin:0;font:14px system-ui,sans-serif}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;
const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist/styles/index.css";
const raw = execFileSync("git", ["-C", REPO, "show", "fe30f9882:src/components/slider/styles.css"], { encoding: "utf8" });
const b = raw.indexOf("THE EXPANDED VIEW (`expand`)"), s0 = raw.lastIndexOf("/*", b), s1 = raw.indexOf("/* Forced colours (last");
const sketch = (f) => readFileSync(path.join(STUDY, "pass-10/slider/sketch", f), "utf8");
const SHEETS = { A: raw, C: raw.slice(0, s0) + sketch("slider-expand-c.css") + raw.slice(s1) + "\n" + sketch("slider-expand-c.fc.css") };
const tokens = readFileSync(DIST, "utf8") + ["scheme-motion", "scheme-spring"].map((f) => execFileSync("git", ["-C", REPO, "show", `master:src/styles/tokens/${f}.css`], { encoding: "utf8" })).join("\n");
const fixture = (sheet) => wrap(`<div style="padding:60px 40px;max-width:360px">
<div class="glass-slider" id="s" data-expand data-size="md" style="--slider-track-height:20px">
<span class="slider-shell" aria-hidden="true"></span>
<span class="slider-track track-well"><span class="slider-lane"><span class="slider-range"></span></span></span>
<span class="slider-thumb" role="slider" tabindex="0" aria-label="Volume" aria-valuenow="62" style="--slider-p:0.62;position:absolute;left:60%"></span>
</div></div>`, `<style>${tokens}</style><style>${sheet}</style>`);

const out = { at: new Date().toISOString(), engine: "playwright chromium headless (no GPU); not Safari", cells: {} };
const browser = await chromium.launch({ headless: true });
const cell = async (name, opts, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ...opts });
  try { const p = await ctx.newPage(); const errors = []; p.on("pageerror", (e) => errors.push(e.message)); out.cells[name] = await fn(p); if (errors.length) out.cells[name].errors = errors; }
  catch (e) { out.cells[name] = { failed: String(e && e.message || e) }; }
  finally { await ctx.close(); }
};
const animsIn = (sel) => document.getAnimations().filter((a) => a.effect && a.effect.target && document.querySelector(sel).contains(a.effect.target))
  .map((a) => `${(a.effect.target.className && a.effect.target.className.baseVal !== undefined ? a.effect.target.className.baseVal : a.effect.target.className) || a.effect.target.tagName}${a.effect.pseudoElement || ""} ${a.transitionProperty || a.animationName || "?"}`);
try {
  // 1. counts on P10-slider
  for (const letter of ["a", "b", "c"]) for (const [which, idx] of [["default", 0], ["knob", 1], ["gold", 2]]) for (const how of ["hover", "press"]) {
    await cell(`count ${letter.toUpperCase()} ${which} ${how}`, {}, async (p) => {
      await p.setContent(wrap(page("P10-slider")), { waitUntil: "load" }); await p.waitForTimeout(150);
      const sel = `.letter[data-v="${letter}"] .sl:nth-of-type(${idx + 1})`;
      const box = await p.evaluate((i) => { const s = document.querySelectorAll(`.letter[data-v="${i[0]}"] .sl`)[i[1]]; s.id = "probe"; s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width * 0.3, y: r.top + r.height / 2 }; }, [letter, idx]);
      await p.mouse.move(5, 5); await p.waitForTimeout(100);
      await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
      if (how === "hover") { await p.mouse.move(box.x, box.y); await p.waitForTimeout(160); } else { await p.mouse.move(box.x, box.y); await p.mouse.down(); await p.waitForTimeout(40); }
      const a = await p.evaluate(animsIn, "#probe");
      if (how === "press") await p.mouse.up();
      return { count: a.length, animations: a };
    });
  }
  // 2. C's geometry, by touch, at 390
  for (const reduced of [false, true]) await cell(`geometry C default md${reduced ? ", Reduce Motion" : ""}`, { viewport: { width: 390, height: 844 }, hasTouch: true, reducedMotion: reduced ? "reduce" : "no-preference" }, async (p) => {
    await p.setContent(wrap(page("P10-slider")), { waitUntil: "load" }); await p.waitForTimeout(200);
    const box = await p.evaluate(() => { const s = document.querySelector('.letter[data-v="c"] .sl'); s.id = "probe"; s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.evaluate(() => {
      const s = document.getElementById("probe"), sh = s.querySelector(".shell"), H = 20, g = 8; window.__fr = []; window.__rec = true;
      const inset = (v) => { const m = /inset\((-?[\d.]+)px/.exec(v || ""); return m ? +m[1] : 0; };
      const f = () => { const i = inset(getComputedStyle(sh).clipPath); window.__fr.push({ ground: H / 2 + g - i, band: H / 2, on: s.classList.contains("on") }); if (window.__rec) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    const cdp = await p.context().newCDPSession(p);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x, y: box.y }] });
    await p.waitForTimeout(340);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await p.waitForTimeout(260);
    const fr = await p.evaluate(() => { window.__rec = false; return window.__fr; });
    const held = Math.max(...fr.map((x) => x.ground)), least = Math.min(...fr.map((x) => x.ground - x.band));
    return { frames: fr.length, heldGroundHalf: +held.toFixed(2), heldOuter: +(2 * held).toFixed(2), leastRingPx: +least.toFixed(2), endGroundHalf: +fr[fr.length - 1].ground.toFixed(2) };
  });
  await cell("hover opening C (mouse rest)", {}, async (p) => {
    await p.setContent(wrap(page("P10-slider")), { waitUntil: "load" }); await p.waitForTimeout(150);
    const box = await p.evaluate(() => { const s = document.querySelector('.letter[data-v="c"] .sl'); s.id = "probe"; s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.mouse.move(box.x, box.y); await p.waitForTimeout(600);
    return await p.evaluate(() => ({ shellClip: getComputedStyle(document.querySelector("#probe .shell")).clipPath, knobScale: getComputedStyle(document.querySelector("#probe .thumb"), "::before").scale }));
  });
  // 3. the real sheet, A and C
  for (const [L, sheet] of Object.entries(SHEETS)) for (const media of ["plain", "reduce", "forced", "more"]) {
    const opts = media === "reduce" ? { reducedMotion: "reduce" } : media === "forced" ? { forcedColors: "active" } : media === "more" ? { contrast: "more" } : {};
    await cell(`real sheet ${L} ${media}`, opts, async (p) => {
      await p.setContent(fixture(sheet), { waitUntil: "load" }); await p.waitForTimeout(150);
      const read = () => { const s = document.getElementById("s"), q = (c) => s.querySelector(c), cs = (n, ps) => getComputedStyle(n, ps);
        return { shellClip: cs(q(".slider-shell")).clipPath, shellBg: cs(q(".slider-shell")).backgroundColor, shellOpacity: cs(q(".slider-shell")).opacity, shellBorder: cs(q(".slider-shell")).borderTopWidth + " " + cs(q(".slider-shell")).borderTopColor,
          trackBg: cs(q(".slider-track")).backgroundColor, trackOutline: cs(q(".slider-track")).outlineStyle + " " + cs(q(".slider-track")).outlineColor + " +" + cs(q(".slider-track")).outlineOffset,
          knobScale: cs(q(".slider-thumb"), "::before").scale, rootOutline: cs(s).outlineStyle }; };
      const res = {};
      for (const [state, attrs] of [["rest", []], ["hover", ["data-hover"]], ["held", ["data-held"]], ["tab", ["data-focus-key"]]]) {
        await p.evaluate((at) => { const s = document.getElementById("s"); ["data-hover", "data-held", "data-focus-key"].forEach((x) => s.removeAttribute(x)); document.getAnimations().forEach((a) => a.finish()); at.forEach((x) => s.setAttribute(x, "")); }, attrs);
        await p.waitForTimeout(30);
        const started = await p.evaluate(animsIn, "#s");
        await p.waitForTimeout(450);
        res[state] = { ...(await p.evaluate(read)), started };
      }
      return res;
    });
  }
  // 4. keyboard, the tree, the toggle
  for (const f of ["P10-toggle", "P10-plate", "P10-slider"]) await cell(`tab order ${f}`, {}, async (p) => {
    await p.setContent(wrap(page(f)), { waitUntil: "load" }); await p.waitForTimeout(150);
    const order = [];
    for (let i = 0; i < 40; i++) { await p.keyboard.press("Tab"); const n = await p.evaluate(() => { const e = document.activeElement; return e && e !== document.body ? `${e.getAttribute("role") || e.tagName.toLowerCase()}: ${e.getAttribute("aria-label") || e.textContent.trim().slice(0, 24)}` : null; }); if (!n || order.includes(n)) break; order.push(n); }
    const tree = await p.locator("main").ariaSnapshot();
    return { order, tree: tree.split("\n").slice(0, 40) };
  });
  for (const reduced of [false, true]) await cell(`toggle B click${reduced ? ", Reduce Motion" : ""}`, { reducedMotion: reduced ? "reduce" : "no-preference" }, async (p) => {
    await p.setContent(wrap(page("P10-toggle")), { waitUntil: "load" }); await p.waitForTimeout(200);
    await p.evaluate(() => { document.documentElement.dataset.theme = "light"; document.getAnimations().forEach((a) => a.finish()); });
    await p.waitForTimeout(300);
    const before = await p.evaluate(() => document.querySelector('.tg[data-v="b"]').getAttribute("aria-pressed"));
    await p.focus('.tg[data-v="b"]'); await p.keyboard.press("Enter"); await p.waitForTimeout(30);
    const legs = await p.evaluate(() => document.getAnimations().filter((a) => a.effect && a.effect.target && document.querySelector('.tg[data-v="b"]').contains(a.effect.target)).map((a) => `${a.effect.target.getAttribute("class") || a.effect.target.tagName} ${a.transitionProperty}`));
    await p.waitForTimeout(500);
    const after = await p.evaluate(() => { const t = document.querySelector('.tg[data-v="b"]'), r = t.querySelector(".rays"), n = t.querySelector(".night"); return { pressed: t.getAttribute("aria-pressed"), raysScale: getComputedStyle(r).scale, raysOpacity: getComputedStyle(r).opacity, nightTranslate: getComputedStyle(n).translate, nightOpacity: getComputedStyle(n).opacity, ink: getComputedStyle(t).color }; });
    return { before, legs, after };
  });
} finally { await browser.close(); }
writeFileSync(path.join(HERE, "p10-probe.json"), JSON.stringify(out, null, 1));
console.log(Object.entries(out.cells).map(([k, v]) => `${k}: ${v.failed ? "FAILED " + v.failed : v.count !== undefined ? v.count + " " + v.animations.join(", ") : JSON.stringify(v).slice(0, 300)}`).join("\n"));
