// BM pass 10, critique A: four checks on pass 10's pages and sketches, in headless Chromium (no GPU; not Safari, and
// nothing here is a reading of the blur or of a thread). Each cell is a fact a page or sketch states about itself.
//   1. toggle-carve: P10-toggle's B and C, and the sketch (DarkModeToggle.next.vue + dark-mode-toggle.next.css), in
//      dark: the night circle's computed fill inside the mask, and the pixel where the night should carve the disc,
//      against the page's ground and the drawn crescent (an alpha estimate of what the mask lets through).
//   2. readout-leave: P10-slider's C default slider (md, with its readout): the readout's scale and opacity on each
//      frame after a press is released.
//   3. ring-leave: P10-slider's C default slider focused by Tab, then Tab away: the track's outline offset and colour
//      on each frame; and the same on the sketch's own rule (slider-expand-c.css) by removing `data-focus-key`.
//   4. plate-hover: P10-plate's C, a seat with a colour of its own and one without: the animations a mouse rest starts.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-10/critique-A-check.mjs
// One browser, one context per cell, everything closed in finally. Writes critique-A-check.json.
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), STUDY = path.resolve(HERE, ".."), REPO = path.resolve(STUDY, "../../../..");
const page = (f) => readFileSync(path.join(STUDY, "pages", f + ".html"), "utf8");
const wrap = (body, head = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">${head}</head><body>${body}</body></html>`;
const master = (f) => execFileSync("git", ["-C", REPO, "show", `master:${f}`], { encoding: "utf8" });
const out = { at: new Date().toISOString(), engine: "playwright chromium headless (no GPU); not Safari", cells: {} };
const browser = await chromium.launch({ headless: true });
const cell = async (name, opts, fn) => {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2, ...opts });
  try { out.cells[name] = await fn(await ctx.newPage()); } catch (e) { out.cells[name] = { error: String(e) }; } finally { await ctx.close(); }
};
// Sample a pixel of an element's screenshot at a point given in its svg viewBox units (24 × 24).
const carve = async (pg, svgSel, groundSel) => {
  const info = await pg.evaluate(([svgSel, groundSel]) => {
    const svg = document.querySelector(svgSel), r = svg.getBoundingClientRect(), night = svg.querySelector("mask circle");
    const g = document.querySelector(groundSel).getBoundingClientRect();
    const at = (u, v) => ({ x: r.left + (u / 24) * r.width, y: r.top + (v / 24) * r.height });
    return { nightFill: getComputedStyle(night).fill, color: getComputedStyle(svg).color, carved: at(14, 10), crescent: at(8, 14), ground: { x: g.left + 6, y: g.top + 6 } };
  }, [svgSel, groundSel]);
  const shot = await pg.screenshot({ type: "png", fullPage: false });
  const px = await pg.evaluate(async ([b64, pts]) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const k = img.width / innerWidth;
    return Object.fromEntries(Object.entries(pts).map(([n, p]) => [n, [...x.getImageData(Math.round(p.x * k), Math.round(p.y * k), 1, 1).data].slice(0, 3)]));
  }, [shot.toString("base64"), { carved: info.carved, crescent: info.crescent, ground: info.ground }]);
  const lum = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  const alpha = +((lum(px.carved) - lum(px.ground)) / (lum(px.crescent) - lum(px.ground))).toFixed(3);
  return { nightFill: info.nightFill, glyphColor: info.color, px, carvedShowsAtAlpha: alpha };
};
// A rAF sampler started before an action, resolved after `ms`.
const sampler = (pg, fn, ms) => pg.evaluate(([fn, ms]) => new Promise((res) => {
  const f = new Function("return (" + fn + ")()"), t0 = performance.now(), rows = [];
  const tick = () => { rows.push([+(performance.now() - t0).toFixed(1), ...f()]); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(rows); };
  requestAnimationFrame(tick);
}), [fn.toString(), ms]);
try {
  // 1. The toggle's carve, on the page (B and C) and on the sketch.
  await cell("toggle-carve page B and C, dark", { colorScheme: "dark" }, async (pg) => {
    await pg.setContent(wrap(page("P10-toggle")), { waitUntil: "load" });
    await pg.waitForTimeout(600);
    return { B: await carve(pg, '.tg.big[data-v="b"] svg', ".letter:nth-of-type(2)"), C: await carve(pg, '.tg.big[data-v="c"] svg', ".letter:nth-of-type(3)") };
  });
  await cell("toggle-carve sketch, html.dark", { colorScheme: "dark" }, async (pg) => {
    const vue = readFileSync(path.join(HERE, "toggle/sketch/DarkModeToggle.next.vue"), "utf8");
    const svg = vue.slice(vue.indexOf("<svg"), vue.indexOf("</svg>") + 6).replace(':id="nightId"', 'id="n1"').replace(':mask="`url(#${nightId})`"', 'mask="url(#n1)"');
    const css = master("src/components/dark-mode-toggle/dark-mode-toggle.css").replace(/\.toggle-sun,[\s\S]*?translateX\(-15%\);\s*}\s*}/, "}")
      + readFileSync(path.join(HERE, "toggle/sketch/dark-mode-toggle.next.css"), "utf8");
    const tokens = `:root{--section-color-5:oklch(0.530 0.124 69.6);--section-color-2:oklch(0.484 0.163 265.5);--spring-present-duration:200ms;--spring-present:cubic-bezier(0.197,0,0.124,0.808);--foreground:#111;--radius-circle:50%}
      .dark{--section-color-5:oklch(0.813 0.109 78.2);--section-color-2:oklch(0.718 0.107 268.4);--foreground:#eee}
      body{margin:0;background:#141210} #g{padding:40px;background:#141210}`;
    await pg.setContent(wrap(`<div id="g"><button class="dark-mode-toggle-button" data-size="lg" style="--dark-mode-toggle-size:120px;--dark-mode-toggle-padding:24px">${svg}</button></div>`,
      `<style>${tokens}</style><style>${css}</style>`).replace("<html", '<html class="dark"'), { waitUntil: "load" });
    await pg.waitForTimeout(600);
    return carve(pg, ".dark-mode-toggle-button svg", "#g");
  });
  // 2. The readout's leave on P10-slider's C.
  await cell("readout-leave P10-slider C default md", {}, async (pg) => {
    await pg.setContent(wrap(page("P10-slider")), { waitUntil: "load" });
    await pg.waitForTimeout(200);
    const sel = '.letter[data-v="c"] .sl[data-size="md"]';
    const b = await pg.evaluate((sel) => { const s = document.querySelector(sel); s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width * 0.3, y: r.top + r.height / 2 }; }, sel);
    await pg.mouse.move(b.x, b.y); await pg.mouse.down(); await pg.waitForTimeout(500);
    const p = sampler(pg, () => { const s = document.querySelector('.letter[data-v="c"] .sl[data-size="md"]'), r = s.querySelector(".readout"), cs = getComputedStyle(r); return [s.classList.contains("on"), cs.scale, +(+cs.opacity).toFixed(3)]; }, 220);
    await pg.mouse.up();
    return { columns: ["ms", "held", "readout scale", "readout opacity"], rows: (await p).slice(0, 12) };
  });
  // 3a. The focus ring's leave on P10-slider's C.
  await cell("ring-leave P10-slider C default md", {}, async (pg) => {
    await pg.setContent(wrap(page("P10-slider")), { waitUntil: "load" });
    await pg.waitForTimeout(200);
    for (let i = 0; i < 11; i++) await pg.keyboard.press("Tab");
    const name = await pg.evaluate(() => document.activeElement.getAttribute("aria-label"));
    await pg.waitForTimeout(500);
    const p = sampler(pg, () => { const s = document.querySelector('.letter[data-v="c"] .sl[data-size="md"]'), cs = getComputedStyle(s.querySelector(".track")); return [s.classList.contains("key"), cs.outlineOffset, cs.outlineColor]; }, 220);
    await pg.keyboard.press("Tab");
    return { focused: name, columns: ["ms", "key", "outline-offset", "outline-color"], rows: (await p).slice(0, 12) };
  });
  // 3b. The same rule on the sketch, BL's sheet at fe30f9882 with C spliced in (as p10-probe.mjs builds it).
  await cell("ring-leave sketch (real sheet C)", {}, async (pg) => {
    const raw = execFileSync("git", ["-C", REPO, "show", "fe30f9882:src/components/slider/styles.css"], { encoding: "utf8" });
    const b0 = raw.indexOf("THE EXPANDED VIEW (`expand`)"), s0 = raw.lastIndexOf("/*", b0), s1 = raw.indexOf("/* Forced colours (last");
    const C = raw.slice(0, s0) + readFileSync(path.join(HERE, "slider/sketch/slider-expand-c.css"), "utf8") + raw.slice(s1);
    const tokens = ["scheme-motion", "scheme-spring"].map((f) => master(`src/styles/tokens/${f}.css`)).join("\n");
    await pg.setContent(wrap(`<div style="padding:60px 40px;max-width:360px"><div class="glass-slider" id="s" data-expand data-focus-key data-size="md" style="--slider-track-height:20px;--ring:#c60">
<span class="slider-shell" aria-hidden="true"></span><span class="slider-track track-well"><span class="slider-lane"><span class="slider-range"></span></span></span>
<span class="slider-thumb" role="slider" tabindex="0" aria-label="Volume" style="--slider-p:0.62;position:absolute;left:60%"></span></div></div>`, `<style>${tokens}</style><style>${C}</style>`), { waitUntil: "load" });
    await pg.waitForTimeout(500);
    const p = sampler(pg, () => { const s = document.getElementById("s"), t = getComputedStyle(s.querySelector(".slider-track")), sh = getComputedStyle(s.querySelector(".slider-shell")); return [s.hasAttribute("data-focus-key"), t.outlineOffset, t.outlineColor, sh.clipPath]; }, 220);
    await pg.evaluate(() => document.getElementById("s").removeAttribute("data-focus-key"));
    return { columns: ["ms", "data-focus-key", "outline-offset", "outline-color", "shell clip"], rows: (await p).slice(0, 12) };
  });
  // 4. The plate's hover on P10-plate's C.
  await cell("plate-hover P10-plate C", {}, async (pg) => {
    await pg.setContent(wrap(page("P10-plate")), { waitUntil: "load" });
    await pg.waitForTimeout(200);
    const res = {};
    for (const [label, sel] of [["seat in the text's colour", '.letter[data-v="c"] .run:not(.tinted) .seat:nth-child(2)'], ["seat with a colour of its own", '.letter[data-v="c"] .run.tinted .seat:nth-child(2)']]) {
      await pg.mouse.move(2, 2); await pg.waitForTimeout(400);
      const b = await pg.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
      await pg.mouse.move(b.x, b.y); await pg.waitForTimeout(40);
      res[label] = await pg.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").map((a) => {
        const t = a.effect.target, pe = a.effect.pseudoElement || ""; return `${t.className || t.tagName}${pe} ${a.transitionProperty || a.animationName}`;
      }));
    }
    return res;
  });
} finally {
  await browser.close();
}
writeFileSync(path.join(HERE, "critique-A-check.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
