#!/usr/bin/env node
// coarse-commit.mjs · C-CP: the coarse COMMIT frames the CK-25 capture set does not hold. capture.mjs drives coarse
// "committed" as touch-up after a 1200 ms long-tap, which commits nothing on the switch or the accordion (their state is
// unchanged in every coarse frame of CP/glance, both builds). Here: a short coarse tap (page.touchscreen.tap: Chromium
// isMobile + hasTouch, WebKit hasTouch), the seat's light P filmed, and a frame shot at +90 ms (the capture set's
// "committed" offset) and +900 ms ("released"), cropped to the scene. Also prints the state before and after.
//   node coarse-commit.mjs --build <dir> --label <l> --engine chromium|webkit --frames <dir> --out <dir>
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, acquireLock, browserCensus, load, f, parseArgs, isClosed } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const label = a.label ?? "build";
const frames = path.resolve(a.frames); fs.mkdirSync(frames, { recursive: true });
const SC = {
  switch: { target: '[role="switch"]', seat: '[role="switch"] [data-engage-light]', pseudo: null, attr: "data-state" },
  accordion: { target: ".disclosure-trigger", seat: ".disclosure-trigger", pseudo: "::after", attr: "data-state" },
  button: { target: ".button", seat: ".button", pseudo: "::after", attr: "data-commit" },
};
const res = [];
await acquireLock();
console.log(`# C-CP coarse-commit ${label} · ${engine} · ${browserCensus()} · load ${load()}`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine); await E.browser();
try {
  for (const theme of ["light", "dark"]) for (const [scene, sc] of Object.entries(SC)) {
    for (let k = 0; k < 2; k++) {
      let P;
      try {
        P = await openPage(E, T, scene, { theme, coarse: true });
        if (!P.modeOk) { console.log(`  UNMEASURED ${theme} ${scene} · MODE NOT APPLIED ${P.modeLine}`); await P.close(); break; }
        await P.page.waitForTimeout(400);
        const box = await P.page.locator(sc.target).first().boundingBox();
        const clip = { x: Math.max(0, box.x - 60), y: Math.max(0, box.y - 40), width: Math.min(700, box.width + 120), height: box.height + 80 };
        const s0 = await P.page.evaluate((sc) => document.querySelector(sc.target).getAttribute(sc.attr), sc);
        const film = P.page.evaluate((sc) => new Promise((ok) => {
          const seat = document.querySelector(sc.seat); let pk = 0; const t0 = performance.now();
          const tick = () => { const cs = getComputedStyle(seat, sc.pseudo); const c = window.__rgba(cs.backgroundColor); pk = Math.max(pk, +cs.opacity * (c ? c[3] : 0)); if (performance.now() - t0 < 700) requestAnimationFrame(tick); else ok(pk); };
          requestAnimationFrame(tick);
        }), sc);
        await P.page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await P.page.waitForTimeout(90);
        const f90 = path.join(frames, `${label}-${engine}-coarse-${theme}-${scene}-tap-committed.png`); await P.page.screenshot({ path: f90, clip });
        const pk = await film;
        await P.page.waitForTimeout(800);
        const f900 = path.join(frames, `${label}-${engine}-coarse-${theme}-${scene}-tap-released.png`); await P.page.screenshot({ path: f900, clip });
        const s1 = await P.page.evaluate((sc) => document.querySelector(sc.target).getAttribute(sc.attr), sc);
        const st = s0 === s1 ? "NOT COMMITTED" : pk >= 0.005 ? "LIT" : "DARK";
        console.log(`  ${st.padEnd(13)} ${theme} ${scene} coarse tap · state ${s0}→${s1} · seat peak P ${f(pk, 4)} · frames ${path.basename(f90)} · load ${load()}`);
        res.push({ theme, scene, s0, s1, pk, st, load: load() });
        await P.close(); break;
      } catch (e) { try { await P?.close(); } catch {} if (isClosed(e) && k === 0) { console.log(`  # engine closed; relaunch, re-run once`); await E.kill(); continue; } throw e; }
    }
  }
} finally {
  await E.close(); T.close();
  if (a.out) { fs.mkdirSync(a.out, { recursive: true }); fs.writeFileSync(path.join(a.out, `coarse-${label}-${engine}.json`), JSON.stringify(res, null, 1)); }
  console.log(`# end · load ${load()}`);
}
