#!/usr/bin/env node
// C-E3: a secondary-button press on a Slider thumb (§P2-7 class 12: `useHold` acquires on any button). ce3-probe read,
// in Playwright WebKit, the control still promoted and the veil up 900 ms after the button came up. This repeats the
// press 3 times on fresh pages and logs which pointer events reach the window, and the stage at +0.9 s and +3 s, then
// whether a primary click elsewhere and a window blur release it.
//   node ce3-rbutton.mjs --build <out>/builds/probe-<label> --engine chromium|webkit --label <label>
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const stage = () => {
  const v = document.querySelector("body > .glass-focus-veil"); const cs = v && getComputedStyle(v);
  return { promoted: document.querySelectorAll("[popover][data-engage-stage]").length, held: document.querySelectorAll('[data-t="slider-a"] [data-held]').length,
    veil: v ? `${v.matches(":popover-open") ? "open" : "closed"}/${cs.visibility}/${(+cs.opacity).toFixed(2)}` : "none" };
};
await acquireLock();
console.log(`C-E3 rbutton probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (let rep = 1; rep <= 3; rep++) {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.evaluate(() => { window.__ev = []; for (const t of ["pointerdown", "pointerup", "pointercancel", "contextmenu", "mouseup"]) window.addEventListener(t, (e) => window.__ev.push(`${t}:${e.button}`), true); });
      const c = await center(page, '[data-t="slider-a"] [role="slider"]');
      await page.mouse.move(c.x, c.y); await page.mouse.down({ button: "right" }); await page.waitForTimeout(300);
      await page.mouse.up({ button: "right" }); await page.waitForTimeout(900);
      const s1 = await page.evaluate(stage);
      await page.waitForTimeout(2100);
      const s3 = await page.evaluate(stage);
      const ev = await page.evaluate(() => window.__ev.join(","));
      const b = await center(page, '[data-sentinel="after"]');
      await page.mouse.click(b.x, b.y); await page.waitForTimeout(900);
      const sc = await page.evaluate(stage);
      const stuck = s3.promoted > 0 || s3.held > 0;
      cell(`right-button press rep ${rep}`, stuck ? "STUCK" : "RELEASED", `events [${ev}] · +0.9 s ${JSON.stringify(s1)} · +3 s ${JSON.stringify(s3)} · after a primary click elsewhere +0.9 s ${JSON.stringify(sc)}`);
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
console.log(`ce3-rbutton ${label} ${engine} · ${out.filter((l) => /STUCK/.test(l)).length} of ${out.length} stuck · load ${load()} at end`);
