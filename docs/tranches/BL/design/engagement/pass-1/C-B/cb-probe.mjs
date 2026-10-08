#!/usr/bin/env node
// C-B probe · D5 pass 1, the critic of family B. Reads the battery and pb-probe do not make:
//   kbdpaint   Tab into the slider: what the library's own `[data-held]` CSS paints on keyboard focus (the range's
//              transform, the root's cursor), against a pointer hold. B writes `data-held="key"`; grasp.css says
//              "THE HAND IS A POINTER HOLD, AND ONLY THAT"
//   modifier   after a pointer drag and release, a modifier key alone (Shift, Meta, Escape): does it engage?
//   unreadable the commit with `--scale-commit-pop: 1` on the host: console errors, animations, `data-commit`
//   carryvis   E-4's slider fling (the same drive: down, 120 ms, 3 moves of 40 px at 16 ms, up), read per frame for
//              1000 ms: the thumb E-4 measures (its opacity and width) against the range's leading edge, the visible handle
//   shots      the slider keyboard-focused, light and dark, 2x (`--shots <dir>`)
//   node cb-probe.mjs --build <dir> [--engine webkit] [--label pb] [--shots <dir>] [--only kbdpaint,modifier,unreadable,shots]
import path from "node:path";
import { witness, INIT, center, f, tabKey } from "../../harness/lib.mjs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => (x.startsWith("--") ? [...acc, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const only = typeof a.only === "string" ? a.only.split(",") : ["kbdpaint", "modifier", "unreadable", "carryvis", "shots"];
const label = typeof a.label === "string" ? a.label : "pb";
const shots = typeof a.shots === "string" ? a.shots : null;

async function open(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: o.dpr ?? 1, reducedMotion: "no-preference", colorScheme: o.theme === "dark" ? "dark" : "light" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.addInitScript(INIT);
  await page.goto(`${T.url}?${new URLSearchParams({ scene, theme: o.theme ?? "light" })}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  return { page, errors, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]) };
}
const readSlider = (P) => P.page.evaluate(() => {
  const root = document.querySelector(".glass-slider"); const range = document.querySelector(".slider-range");
  const m = new DOMMatrixReadOnly(getComputedStyle(range).transform === "none" ? undefined : getComputedStyle(range).transform);
  return { held: root.getAttribute("data-held"), rangeHeld: range.getAttribute("data-held"), cursor: getComputedStyle(root).cursor, sx: m.a, sy: m.d, eng: document.querySelectorAll("[data-engaged]").length };
});
const fmt = (r) => `data-held ${JSON.stringify(r.held)} (range ${JSON.stringify(r.rangeHeld)}) · range scale ${f(r.sx)} × ${f(r.sy)} · cursor ${r.cursor} · [data-engaged] ${r.eng}`;

await witness("C-B", `family B critic probe (${label})`, async ({ E, T, cell, guard, engine }) => {
  if (only.includes("kbdpaint")) {
    for (const theme of ["light", "dark"]) {
      const r = await guard(`kbdpaint ${theme}`, async () => {
        const P = await open(E, T, "slider", { theme });
        try {
          const out = {};
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600); out.tab = await readSlider(P);
          await P.page.keyboard.press("ArrowRight"); await P.page.waitForTimeout(600); out.arrow = await readSlider(P);
          await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600); out.out = await readSlider(P);
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(600); out.hand = await readSlider(P);
          await P.page.mouse.up(); await P.page.waitForTimeout(600); out.released = await readSlider(P);
          return out;
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`kbdpaint ${theme}`, "FAIL", r.line); continue; }
      const squished = Math.abs(r.tab.sx - 1) > 0.002 || Math.abs(r.tab.sy - 1) > 0.002 || Math.abs(r.arrow.sx - 1) > 0.002 || Math.abs(r.arrow.sy - 1) > 0.002;
      cell(`kbdpaint ${theme} tab`, squished || r.tab.cursor === "grabbing" ? "FAIL" : "PASS", `keyboard focus paints the hand's register? ${fmt(r.tab)}`);
      cell(`kbdpaint ${theme} arrow`, "REPORT", fmt(r.arrow));
      cell(`kbdpaint ${theme} tab-out`, "REPORT", fmt(r.out));
      cell(`kbdpaint ${theme} pointer-held`, "REPORT", fmt(r.hand));
      cell(`kbdpaint ${theme} released`, "REPORT", fmt(r.released));
    }
  }
  if (only.includes("modifier")) {
    for (const key of ["Shift", "Meta", "Escape"]) {
      const r = await guard(`modifier ${key}`, async () => {
        const P = await open(E, T, "slider");
        try {
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
          for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); }
          await P.page.mouse.up(); await P.page.waitForTimeout(600);
          const before = await readSlider(P);
          await P.page.keyboard.down(key); await P.page.waitForTimeout(400);
          const during = await readSlider(P);
          await P.page.keyboard.up(key); await P.page.waitForTimeout(400);
          const after = await readSlider(P);
          return { before, during, after };
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`modifier ${key}`, "FAIL", r.line); continue; }
      cell(`modifier ${key}`, r.during.held === "key" ? "FAIL" : "PASS", `after a drag: before ${JSON.stringify(r.before.held)} · ${key} down ${JSON.stringify(r.during.held)} (range ${f(r.during.sx)} × ${f(r.during.sy)}) · ${key} up ${JSON.stringify(r.after.held)}`);
    }
  }
  if (only.includes("unreadable")) {
    const r = await guard("unreadable", async () => {
      const P = await open(E, T, "switch");
      try {
        const out = await P.page.evaluate(async () => {
          const h = document.querySelector('[role="switch"]'); h.style.setProperty("--scale-commit-pop", "1");
          const reads = [];
          for (let i = 0; i < 2; i++) {
            window.__e.commit(); await new Promise((r) => requestAnimationFrame(r));
            reads.push({ anims: h.getAnimations().filter((x) => x.playState === "running" && String(x.effect?.getKeyframes?.()[1]?.transform ?? "").includes("scale")).length, commit: h.hasAttribute("data-commit"), state: h.getAttribute("data-state") });
            await new Promise((r) => setTimeout(r, 700));
          }
          return reads;
        });
        return { out, errors: P.errors.filter((e) => e.includes("useEngage")) };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("unreadable", "FAIL", r.line);
    else cell("unreadable", r.errors.length >= 1 && r.out.every((x) => x.anims === 0) ? "PASS" : "FAIL", `crest token 1 on the host: commits ${r.out.map((x) => `state ${x.state}, crest animations ${x.anims}, data-commit ${x.commit}`).join(" | ")} · useEngage console errors ${r.errors.length} over 2 commits`);
  }
  if (only.includes("carryvis")) {
    for (const still of [false, true]) {
      const r = await guard(`carryvis ${still ? "still" : "fling"}`, async () => {
        const P = await open(E, T, "slider");
        try {
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
          for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
          if (still) await P.page.waitForTimeout(250);
          const pr = P.page.evaluate(() => new Promise((res) => {
            const out = []; const t0 = performance.now();
            const tick = () => {
              const th = document.querySelector('[role="slider"]'); const rg = document.querySelector(".slider-range");
              const a = th.getBoundingClientRect(); const b = rg.getBoundingClientRect(); const cs = getComputedStyle(th);
              out.push({ t: performance.now() - t0, thumb: a.x + a.width / 2, w: a.width, op: +cs.opacity, edge: b.right });
              if (performance.now() - t0 < 1000) requestAnimationFrame(tick); else res(out);
            };
            requestAnimationFrame(tick);
          }));
          await P.page.mouse.up();
          return { fr: await pr };
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(`carryvis ${still ? "still" : "fling"}`, "FAIL", r.line); continue; }
      const fr = r.fr, t0 = fr[0].thumb, e0 = fr[0].edge;
      const tc = Math.max(...fr.map((x) => x.thumb - t0)), ec = Math.max(...fr.map((x) => x.edge - e0));
      const tEnd = fr.at(-1).thumb - t0, eEnd = fr.at(-1).edge - e0;
      cell(`carryvis ${still ? "still" : "fling"}`, "REPORT", `thumb (E-4's body): carry ${f(tc, 2)} px, settles ${f(tEnd, 2)} px, opacity ${f(Math.max(...fr.map((x) => x.op)), 2)} max, width ${f(Math.max(...fr.map((x) => x.w)), 2)} px max · range leading edge (the visible handle): carry ${f(ec, 2)} px, settles ${f(eEnd, 2)} px · ${fr.length} frames`);
    }
  }
  if (only.includes("shots") && shots) {
    for (const theme of ["light", "dark"]) {
      await guard(`shots ${theme}`, async () => {
        const P = await open(E, T, "slider", { theme, dpr: 2 });
        try {
          const box = await P.page.evaluate(() => { const r = document.querySelector(".glass-slider").getBoundingClientRect(); return { x: r.x - 24, y: r.y - 24, width: r.width + 48, height: r.height + 48 }; });
          await P.page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-slider-1-rest.png`), clip: box });
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(700);
          await P.page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-slider-2-keyboard.png`), clip: box });
        } finally { await P.close(); }
      });
      cell(`shots ${theme}`, "REPORT", `${label}-${engine}-${theme}-slider-{1-rest,2-keyboard}.png`);
    }
  }
});
