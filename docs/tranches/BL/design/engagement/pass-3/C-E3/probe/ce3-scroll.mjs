#!/usr/bin/env node
// C-E3: the promoted control under scroll (CK-20). ce3-probe's `scroll pin` read a 30 px gap between a keyboard-engaged
// slider and its own footprint while the page scrolled in 30 px steps. This separates a stale read from a painted lag.
// For each scroll step it reads the gap (control centre vs ITS footprint centre, px):
//   sync   in the same task, right after the scroll (forced layout)
//   raf1   in the next requestAnimationFrame callback (before that frame's style/layout/paint)
//   post1  in a task posted from raf1 (MessageChannel): after frame 1 has rendered
//   raf2 / post2  the same, one frame later
// Two drives: `scrollBy` (script, 4 x 30 px) and `wheel` (page.mouse.wheel, 4 x 30 px, the user path). A gap > 1 px at
// post1 means frame 1 rendered the control off its footprint; a gap only at raf1 is a read before the anchor update.
//   node ce3-scroll.mjs --build <out>/builds/probe-<label> --engine chromium|webkit --label <label>
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };

const gapNow = () => {
  const e = document.querySelector('[data-t="slider-a"] .glass-slider');
  const fp = e.previousElementSibling?.classList.contains("engage-footprint") ? e.previousElementSibling : null;
  if (!fp || !e.matches(":popover-open")) return null;
  const r = e.getBoundingClientRect(), q = fp.getBoundingClientRect();
  return Math.hypot((r.left + r.right - q.left - q.right) / 2, (r.top + r.bottom - q.top - q.bottom) / 2);
};
// arm a reader for the frames after the next scroll; resolves to {raf1, post1, raf2, post2}
const armFrames = (gapSrc) => {
  const gap = new Function(`return (${gapSrc})()`);
  window.__ce3 = new Promise((ok) => {
    const res = {};
    const post = (k, then) => { const ch = new MessageChannel(); ch.port1.onmessage = () => { res[k] = gap(); then(); }; ch.port2.postMessage(0); };
    requestAnimationFrame(() => { res.raf1 = gap(); post("post1", () => requestAnimationFrame(() => { res.raf2 = gap(); post("post2", () => ok(res)); })); });
  });
};

await acquireLock();
console.log(`C-E3 scroll probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
const src = gapNow.toString();
try {
  for (const drive of ["scrollBy", "wheel"]) {
    for (const theme of ["light"]) {
      const P = await openPage(E, T, "slider2", { theme });
      try {
        const { page } = P;
        await page.evaluate(() => { document.body.style.minHeight = "2400px"; });
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
        const rows = [];
        for (let k = 0; k < 4; k++) {
          await page.evaluate(armFrames, src);
          let sync = null;
          if (drive === "scrollBy") sync = await page.evaluate((s) => { window.scrollBy(0, 30); return new Function(`return (${s})()`)(); }, src);
          else { const b = await page.evaluate(() => { const r = document.querySelector('[data-sentinel="after"]').getBoundingClientRect(); return { x: r.left + 4, y: Math.min(innerHeight - 4, r.top + 4) }; }); await page.mouse.move(b.x, b.y); await page.mouse.wheel(0, 30); }
          const r = await page.evaluate(() => window.__ce3);
          rows.push({ sync, ...r });
          await page.waitForTimeout(120);
        }
        const sy = await page.evaluate(() => window.scrollY);
        const promoted = rows.every((r) => r.post2 != null);
        const worst = (k) => Math.max(0, ...rows.map((r) => r[k] ?? 0));
        const v = !promoted || sy === 0 ? "FAIL NOT DRIVEN" : worst("post1") > 1 || worst("post2") > 1 ? "FAIL" : "PASS";
        cell(`scroll ${drive} ${theme}`, v, `scrolled to ${sy} px in 4 steps, A promoted ${promoted} · largest gap from its own footprint: sync ${f(worst("sync"), 1)} · raf1 ${f(worst("raf1"), 1)} · post1 ${f(worst("post1"), 1)} · raf2 ${f(worst("raf2"), 1)} · post2 ${f(worst("post2"), 1)} px (bound: post1 and post2 <= 1; raf1 is before the frame's layout) · per step ${rows.map((r) => [r.sync, r.raf1, r.post1, r.raf2, r.post2].map((x) => (x == null ? "-" : x.toFixed(1))).join("/")).join(" ; ")}`);
      } finally { await P.close(); }
    }
  }
  // ── nested scroller: A wrapped in a 64 px overflow:auto box, keyboard-engaged, the box wheel-scrolled 120 px so the
  // footprint leaves the box's clip. REPORT (P-E2 MIGRATION row 1 states the promoted control escapes ancestor clipping):
  // where the control paints and hit-tests against the box, and whether it still tracks its footprint.
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.evaluate(() => {
        const a = document.querySelector('[data-t="slider-a"]');
        const box = document.createElement("div"); box.id = "ce3box";
        box.style.cssText = "height:64px;overflow:auto;outline:1px solid red";
        const pad = () => { const d = document.createElement("div"); d.style.height = "200px"; return d; };
        a.before(box); box.append(pad(), a, pad());
        box.scrollTop = 200 - 20;
      });
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
      const read = () => page.evaluate(() => {
        const e = document.querySelector('[data-t="slider-a"] .glass-slider'); const box = document.getElementById("ce3box");
        const fp = e.previousElementSibling; const r = e.getBoundingClientRect(), q = fp?.getBoundingClientRect(), b = box.getBoundingClientRect();
        const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
        const inBox = cy >= b.top && cy <= b.bottom;
        const hit = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, cx)), Math.min(innerHeight - 1, Math.max(0, cy)));
        return { pop: e.matches(":popover-open"), cy: +cy.toFixed(1), boxTop: +b.top.toFixed(1), boxBottom: +b.bottom.toFixed(1), inBox,
          gap: q ? +Math.hypot((r.left + r.right - q.left - q.right) / 2, (r.top + r.bottom - q.top - q.bottom) / 2).toFixed(1) : null,
          hitsSelf: !!hit && e.contains(hit), st: box.scrollTop, fpTop: q ? +q.top.toFixed(1) : null, fpBottom: q ? +q.bottom.toFixed(1) : null, vis: getComputedStyle(e).visibility, pv: getComputedStyle(e).getPropertyValue("position-visibility") || "(unsupported)" };
      });
      const r0 = await read();
      const b = await page.evaluate(() => { const r = document.getElementById("ce3box").getBoundingClientRect(); return { x: r.left + 20, y: r.top + 10 }; });
      await page.mouse.move(b.x, b.y);
      for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 30); await page.waitForTimeout(80); }
      await page.waitForTimeout(300);
      const r1 = await read();
      // the wheel's target: over the promoted control (centre) against over the box away from it, which scrolls
      await page.evaluate(() => { document.body.style.minHeight = "2400px"; document.getElementById("ce3box").scrollTop = 190; window.scrollTo(0, 0); });
      await page.waitForTimeout(200);
      const wheelAt = async (pt) => { const s0 = await page.evaluate(() => [document.getElementById("ce3box").scrollTop, window.scrollY]); await page.mouse.move(pt.x, pt.y); await page.mouse.wheel(0, 30); await page.waitForTimeout(250); const s1 = await page.evaluate(() => [document.getElementById("ce3box").scrollTop, window.scrollY]); await page.evaluate((s) => { document.getElementById("ce3box").scrollTop = s[0]; window.scrollTo(0, s[1]); }, s0); await page.waitForTimeout(150); return `box +${s1[0] - s0[0]}, page +${s1[1] - s0[1]}`; };
      const pts = await page.evaluate(() => { const e = document.querySelector('[data-t="slider-a"] .glass-slider').getBoundingClientRect(); const b = document.getElementById("ce3box").getBoundingClientRect(); return { on: { x: (e.left + e.right) / 2, y: (e.top + e.bottom) / 2 }, off: { x: b.left + 20, y: e.bottom + 6 < b.bottom ? e.bottom + 6 : b.top + 4 }, boxB: b.bottom, eB: e.bottom }; });
      const wOn = await wheelAt(pts.on); const wOff = await wheelAt(pts.off);
      // the clip: the box scrolled by script until the footprint is wholly outside it
      await page.evaluate(() => { document.getElementById("ce3box").scrollTop = 360; });
      await page.waitForTimeout(400);
      const r2 = await read();
      cell("wheel over promoted control", "REPORT", `a 30 px wheel with the pointer on the engaged control: ${wOn} · with the pointer in the box off the control: ${wOff}`);
      cell("footprint clipped", "REPORT", `box scrollTop ${r2.st}, footprint y [${r2.fpTop}, ${r2.fpBottom}] against box [${r2.boxTop}, ${r2.boxBottom}] · control promoted ${r2.pop}, visibility ${r2.vis}, centre y ${r2.cy}, elementFromPoint(centre) is the control ${r2.hitsSelf}, position-visibility ${r2.pv}`);
      cell("nested scroller", "REPORT", `engaged in the box: promoted ${r0.pop}, centre y ${r0.cy} in box [${r0.boxTop}, ${r0.boxBottom}] ${r0.inBox} · after a 6 x 30 px wheel inside the box: scrollTop ${r0.st} → ${r1.st}, footprint y [${r1.fpTop}, ${r1.fpBottom}], promoted ${r1.pop}, visibility ${r1.vis}, centre y ${r1.cy}, inside the box's clip ${r1.inBox}, gap from footprint ${r1.gap} px, elementFromPoint(centre) is the control ${r1.hitsSelf} · position-visibility ${r1.pv}`);
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
console.log(`ce3-scroll ${label} ${engine} · ${out.length - fails} pass, ${fails} fail · load ${load()} at end`);
process.exit(fails ? 1 : 0);
