#!/usr/bin/env node
// P-E probe · D5 pass 1, family E's prototype (the stage on P-B's door). The reads the battery does not make:
//   kbd       Tab into the slider (keyboard engagement through the door's modality signal): at 450 ms the stage
//             promotes and grows it; the hand's register (`data-held`, the range squish, `cursor: grabbing`) stays
//             unpainted. ArrowRight keeps it engaged and moves the value; Escape disengages; Tab out leaves the stage
//   modifier  after a pointer drag and release, a modifier key alone (Shift, Meta, Control, Alt): nothing engages
//   fling     E-4's slider drive (down, 120 ms, 3 moves of 40 px at 16 ms, up; "still" waits 250 ms before up), read
//             per frame for 1500 ms in the PAGE frame: the promoted root's leading edge past its footprint's (the
//             visible stretch), the value, the top-layer exit. Differential fling − still. Also under reduce
//   shots     owner-glance frames: the slider keyboard-engaged, and a fling at +48 ms after release, light and dark, 2x
//   node pe-probe.mjs --build <dir> [--engine webkit] [--label pe] [--shots <dir>] [--only kbd,modifier,fling,shots]
import path from "node:path";
import { witness, INIT, center, f, tabKey, load } from "../../harness/lib.mjs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => (x.startsWith("--") ? [...acc, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const only = typeof a.only === "string" ? a.only.split(",") : ["kbd", "modifier", "fling", "shots"];
const label = typeof a.label === "string" ? a.label : "pe";
const shots = typeof a.shots === "string" ? a.shots : null;

async function open(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: o.dpr ?? 1, reducedMotion: o.prm ? "reduce" : "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light" });
  const page = await ctx.newPage();
  await page.addInitScript(INIT);
  await page.goto(`${T.url}?${new URLSearchParams({ scene, theme: o.theme ?? "light" })}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  return { page, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]) };
}
const read = (P) => P.page.evaluate(() => {
  const root = document.querySelector(".glass-slider"); const range = document.querySelector(".slider-range");
  const tr = getComputedStyle(range).transform; const m = new DOMMatrixReadOnly(tr === "none" ? undefined : tr);
  const sc = getComputedStyle(root).scale.split(" ").map(Number); const v = document.querySelector(".glass-focus-veil");
  return { held: root.getAttribute("data-held"), rangeHeld: range.getAttribute("data-held"), cursor: getComputedStyle(root).cursor, rsx: m.a, rsy: m.d,
    sx: Number.isFinite(sc[0]) ? sc[0] : 1, sy: Number.isFinite(sc[1]) ? sc[1] : Number.isFinite(sc[0]) ? sc[0] : 1,
    stage: root.matches(":popover-open"), eng: document.querySelectorAll("[data-engaged]").length, veil: v ? +getComputedStyle(v).opacity : null,
    value: document.querySelector('[role="slider"]').getAttribute("aria-valuenow"), focus: document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName };
});
const fmt = (r) => `scale ${f(r.sx)} × ${f(r.sy)} · stage ${r.stage} · [data-engaged] ${r.eng} · veil ${f(r.veil, 2)} · data-held ${JSON.stringify(r.held)} (range ${JSON.stringify(r.rangeHeld)}) · range ${f(r.rsx)} × ${f(r.rsy)} · cursor ${r.cursor} · value ${r.value} · focus ${r.focus}`;

async function drive(P, still) {
  const c = await center(P.page, '[role="slider"]');
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
  for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
  if (still) await P.page.waitForTimeout(250);
}
const film = (P, ms) => P.page.evaluate((ms) => new Promise((res) => {
  const out = []; const t0 = performance.now();
  const tick = () => {
    const root = document.querySelector(".glass-slider"); const fp = document.querySelector(".engage-footprint");
    const r = root.getBoundingClientRect(); const q = fp ? fp.getBoundingClientRect() : r;
    const v = document.querySelector(".glass-focus-veil");
    out.push({ t: performance.now() - t0, right: r.right, left: r.left, fpR: q.right, fpL: q.left, stage: root.matches(":popover-open"), fp: !!fp, veil: v ? +getComputedStyle(v).opacity : 0, value: document.querySelector('[role="slider"]').getAttribute("aria-valuenow"), anims: root.getAnimations().filter((x) => x.playState === "running").length });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(out);
  };
  requestAnimationFrame(tick);
}), ms);

await witness("P-E", `family E prototype probe (${label})`, async ({ E, T, cell, guard, engine }) => {
  if (only.includes("kbd")) {
    for (const theme of ["light", "dark"]) {
      const r = await guard(`kbd ${theme}`, async () => {
        const P = await open(E, T, "slider", { theme });
        try {
          const out = {};
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450); out.tab = await read(P);
          await P.page.keyboard.press("ArrowRight"); await P.page.waitForTimeout(450); out.arrow = await read(P);
          await P.page.keyboard.press("Escape"); await P.page.waitForTimeout(1500); out.esc = await read(P);
          await P.page.keyboard.press("ArrowRight"); await P.page.waitForTimeout(450); out.again = await read(P);
          await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(1500); out.out = await read(P);
          return out;
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`kbd ${theme}`, "FAIL", r.line); continue; }
      const hand = (x) => x.held !== null || x.rangeHeld !== null || x.cursor === "grabbing" || Math.abs(x.rsx - 1) > 0.002 || Math.abs(x.rsy - 1) > 0.002;
      cell(`kbd ${theme} tab`, r.tab.stage && r.tab.eng >= 1 && Math.max(r.tab.sx, r.tab.sy) >= 1.03 && !hand(r.tab) ? "PASS" : "FAIL", `Tab, +450 ms · ${fmt(r.tab)} (bound: promoted, ≥ ×1.03, no hand paint)`);
      cell(`kbd ${theme} arrow`, r.arrow.stage && r.arrow.value !== r.tab.value && !hand(r.arrow) ? "PASS" : "FAIL", `ArrowRight · ${fmt(r.arrow)}`);
      cell(`kbd ${theme} escape`, !r.esc.stage && r.esc.eng === 0 && Math.abs(r.esc.sx - 1) <= 0.002 ? "PASS" : "FAIL", `Escape, +1500 ms · ${fmt(r.esc)}`);
      cell(`kbd ${theme} key re-engages`, r.again.stage ? "PASS" : "FAIL", `ArrowRight after Escape · ${fmt(r.again)}`);
      cell(`kbd ${theme} tab-out`, !r.out.stage && r.out.eng === 0 && Math.abs(r.out.sx - 1) <= 0.002 ? "PASS" : "FAIL", `Tab out, +1500 ms · ${fmt(r.out)}`);
    }
  }
  if (only.includes("modifier")) {
    for (const key of ["Shift", "Meta", "Control", "Alt"]) {
      const r = await guard(`modifier ${key}`, async () => {
        const P = await open(E, T, "slider");
        try {
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
          for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); }
          await P.page.mouse.up(); await P.page.waitForTimeout(1500);
          const before = await read(P);
          await P.page.keyboard.down(key); await P.page.waitForTimeout(400);
          const during = await read(P);
          await P.page.keyboard.up(key); await P.page.waitForTimeout(400);
          const after = await read(P);
          return { before, during, after };
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`modifier ${key}`, "FAIL", r.line); continue; }
      const quiet = (x) => !x.stage && x.eng === 0 && x.held === null && Math.abs(x.sx - 1) <= 0.002;
      cell(`modifier ${key}`, quiet(r.before) && quiet(r.during) && quiet(r.after) ? "PASS" : "FAIL", `after a drag, +1500 ms: ${fmt(r.before)} | ${key} down: ${fmt(r.during)} | up: stage ${r.after.stage}, engaged ${r.after.eng}`);
    }
  }
  if (only.includes("fling")) {
    for (const prm of [false, true]) {
      const res = {};
      for (const still of [false, true]) {
        const name = `fling${prm ? " PRM" : ""} ${still ? "still" : "fling"}`;
        const r = await guard(name, async () => {
          const P = await open(E, T, "slider", { prm });
          try {
            await drive(P, still);
            const pr = film(P, 1500);
            await P.page.mouse.up();
            return { fr: await pr };
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const fr = r.fr;
        const ex = fr.map((x) => x.right - x.fpR);
        const exit = fr.find((x) => !x.stage);
        const last = fr.slice(-12);
        const restMove = Math.max(...last.map((x) => x.right)) - Math.min(...last.map((x) => x.right));
        res[still ? "still" : "fling"] = { ex: Math.max(...ex), min: Math.min(...ex), v0: fr[0].value, v1: fr.at(-1).value, exit: exit ? exit.t : null, restMove, veil: Math.max(...fr.map((x) => x.veil)), n: fr.length };
        const q = res[still ? "still" : "fling"];
        cell(name, "REPORT", `leading edge past footprint: max ${f(q.ex, 2)} px, min ${f(q.min, 2)} px · value ${q.v0} → ${q.v1} · leaves the top layer at ${q.exit == null ? "never (in 1500 ms)" : `${f(q.exit, 0)} ms`} · last 12 frames move ${f(q.restMove, 2)} px · veil max ${f(q.veil, 2)} · ${q.n} frames`);
      }
      if (res.fling && res.still) {
        const d = res.fling.ex - res.still.ex;
        if (!prm) cell("fling differential", d >= 4 && res.fling.restMove < 0.5 && res.fling.exit != null && res.fling.v0 === res.fling.v1 ? "PASS" : "FAIL", `visible leading edge, page frame: fling ${f(res.fling.ex, 2)} − still ${f(res.still.ex, 2)} = ${f(d, 2)} px (bound ≥ 4, E-4's TRAVEL) · fling at rest ${res.fling.restMove < 0.5}, value held ${res.fling.v0} → ${res.fling.v1}, top-layer exit ${f(res.fling.exit, 0)} ms`);
        else cell("fling PRM", res.fling.ex <= 0.5 && res.fling.restMove < 0.5 ? "PASS" : "FAIL", `reduce: leading edge past footprint max ${f(res.fling.ex, 2)} px (bound ≤ 0.5: no grow, no stretch) · at rest ${res.fling.restMove < 0.5} · veil max ${f(res.fling.veil, 2)} (the light answer stays)`);
      }
    }
  }
  if (only.includes("shots") && shots) {
    for (const theme of ["light", "dark"]) {
      await guard(`shots ${theme}`, async () => {
        const P = await open(E, T, "slider", { theme, dpr: 2 });
        try {
          const clip = { x: 0, y: 0, width: 700, height: 500 };
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600);
          await P.page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-slider-keyboard-engaged.png`), clip });
          await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(1500);
          await drive(P, false);
          await P.page.mouse.up(); await P.page.waitForTimeout(48);
          await P.page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-slider-fling-48ms.png`), clip });
          await P.page.waitForTimeout(1500);
          await P.page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-slider-fling-settled.png`), clip });
        } finally { await P.close(); }
      });
      cell(`shots ${theme}`, "REPORT", `${label}-${engine}-${theme}-slider-{keyboard-engaged,fling-48ms,fling-settled}.png · load ${load()}`);
    }
  }
});
