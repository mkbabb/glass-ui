#!/usr/bin/env node
// H9 exploration (not a witness): C-E8's anc read under three visibility measures, to find one an in-place body reads 1 on
// under rotation (C-E8 read ×0.79-0.81 in place in Chromium on fine and touch; explore-rotate shows the press lands, the
// value unchanged, the control engaged). Measures over the card's painted region, engaged and released, each against the
// region with the control hidden: abs Σ|Δ| (C-E8's), blur Σ|Δ| after a 5×5 box blur of both images (a resampled
// composited layer keeps its ink, loses its edge contrast), signed |ΣΔ|.
//   node explore-anc.mjs --build <dir> [--engine webkit] [--kinds none,rotate] [--modes fine,keyboard]
import fs from "node:fs";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, tabKey, f, GLASS } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const blur = (x, r = 2) => { const { w, h, o } = x; const t = new Float32Array(o.length), u = new Float32Array(o.length);
  for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) { let s = 0, n = 0; for (let d = -r; d <= r; d++) { const k = i + d; if (k >= 0 && k < w) { s += o[y * w + k]; n++; } } t[y * w + i] = s / n; }
  for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) { let s = 0, n = 0; for (let d = -r; d <= r; d++) { const k = y + d; if (k >= 0 && k < h) { s += t[k * w + i]; n++; } } u[y * w + i] = s / n; }
  return { w, h, o: u }; };
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', ROOT = '[data-t="slider-a"] .glass-slider', THUMB = '[data-t="slider-a"] [role="slider"]';
const KINDS = { none: {}, opacity: { opacity: "0.5" }, filter: { filter: "invert(1)" }, clippath: { clipPath: "inset(0 45% 0 0)" }, rotate: { rotate: "3deg" } };
await witness("H9-explore-anc", "the anc read under three measures", async ({ a, E, T, cell, guard, engine }) => {
  const kinds = typeof a.kinds === "string" ? a.kinds.split(",") : Object.keys(KINDS);
  const modes = typeof a.modes === "string" ? a.modes.split(",") : ["keyboard", "touch", "fine"];
  const res = {};
  for (const mode of modes) for (const kind of kinds) {
    const r = await guard(`${kind} ${mode}`, async () => {
      const P = mode === "touch" ? await openTouchPage(E, T, "clipstale") : await openPage(E, T, "clipstale");
      try {
        const { page } = P; const shot = (clip) => (P.shot ? P.shot(clip) : page.screenshot({ clip }));
        await page.evaluate((s) => { const st = document.createElement("style"); st.textContent = `${s} { visibility: hidden !important; }`; document.head.appendChild(st); }, `.glass-focus-veil, .fx-veil${mode !== "keyboard" ? ", .glass-loupe, .fx-loupe" : ""}`);
        await page.evaluate(([B, css]) => Object.assign(document.querySelector(B).style, css), [BOX, KINDS[kind]]);
        await page.evaluate(([B, Q]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 40)) / k; }, [BOX, REST]);
        await page.waitForTimeout(250);
        const reg = await page.evaluate((B) => { const r = document.querySelector(B).getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, BOX);
        const clip = { x: Math.max(0, Math.floor(reg.x) - 8), y: Math.max(0, Math.floor(reg.y) - 8), width: Math.ceil(reg.w) + 16, height: Math.ceil(reg.h) + 16 };
        await page.evaluate((Q) => { document.querySelector(Q).style.visibility = "hidden"; }, REST); await page.waitForTimeout(120);
        const empty = luma(await shot(clip));
        await page.evaluate((Q) => { document.querySelector(Q).style.visibility = ""; }, REST); await page.waitForTimeout(150);
        let eng = null, engBuf = null, st = null; const root = '[data-e~="root"]';
        const during = async () => { engBuf = await shot(clip); eng = luma(engBuf); st = await page.evaluate((R) => { const h = document.querySelector(R); return { eng: h.matches("[data-engaged], [data-held], [data-kbd]"), prom: h.matches(":popover-open") }; }, root); };
        if (mode === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); await during(); await page.keyboard.press("Escape"); }
        else { const c = await center(page, THUMB); if (mode === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(700); await during(); await page.mouse.up(); } else await P.holdAt(c.x, c.y, [700], during); }
        await page.waitForTimeout(800);
        const relBuf = await shot(clip); const rel = luma(relBuf);
        if (typeof a.frames === "string") { fs.mkdirSync(a.frames, { recursive: true }); fs.writeFileSync(`${a.frames}/${engine}-${kind}-${mode}-released.png`, relBuf); fs.writeFileSync(`${a.frames}/${engine}-${kind}-${mode}-engaged.png`, engBuf); }
        return { empty, eng, rel, st };
      } finally { await P.close(); }
    }, 120000);
    if (r.crashed) { cell(`anc ${kind} · ${mode}`, "REPORT", r.line); continue; }
    const absV = (x, e) => { let s = 0; for (let i = 0; i < x.o.length; i++) s += Math.abs(x.o[i] - e.o[i]); return s; };
    const sgnV = (x, e) => { let s = 0; for (let i = 0; i < x.o.length; i++) s += x.o[i] - e.o[i]; return Math.abs(s); };
    const be = blur(r.empty), bg = blur(r.eng), br = blur(r.rel);
    const m = { abs: absV(r.eng, r.empty) / absV(r.rel, r.empty), blur: absV(bg, be) / absV(br, be), sgn: sgnV(r.eng, r.empty) / sgnV(r.rel, r.empty) };
    res[`${kind}|${mode}`] = m; const b0 = res[`none|${mode}`];
    cell(`anc ${kind} · ${mode}`, "REPORT", `engaged ${r.st.eng} promoted ${r.st.prom} · engaged/released abs ×${f(m.abs, 3)} blur ×${f(m.blur, 3)} signed ×${f(m.sgn, 3)}${b0 && kind !== "none" ? ` · over none: abs ${f(m.abs / b0.abs, 3)} blur ${f(m.blur / b0.blur, 3)} signed ${f(m.sgn / b0.sgn, 3)}` : ""}`);
  }
});
