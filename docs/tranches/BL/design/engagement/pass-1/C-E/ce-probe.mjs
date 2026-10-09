#!/usr/bin/env node
// C-E probe · D5 pass 1, the critic's reads of family E's prototype that P-E's probe does not make:
//   valuept  E-4's drive (P-E's, unchanged), read on the VALUE POINT (the range's leading edge, the slider's visible
//            handle) and the control's trailing edge, page frame, fling − still. Right fling and left fling
//   handoff  scene slider2: Tab into slider A (keyboard-engaged), +600 ms, Tab to slider B; film A's scale, the
//            veil opacity and B's scale per frame for 900 ms. A snap is a one-frame scale drop ≥ 0.02 on A; a dip
//            is the veil's minimum between the two engagements
//   regrab   scene slider2: drag slider A briefly, release, +40 ms press slider B and hold; the same film on A
//   charkey  scene slider: a pointer drag and release, +1500 ms, then the key "k" (a slider does not act on it)
//   progfocus scene slider: `element.focus()` by script on the thumb, +450 ms: is the world frosted?
//   dialog   scene sliderdlg: what holds focus at open; Tab to the slider; Escape: is the dialog still open, is the
//            slider still on the stage
//   node ce-probe.mjs --build <dir> [--engine webkit] [--only valuept,handoff,regrab,charkey,progfocus,dialog]
import { witness, INIT, center, f, tabKey, load } from "../../harness/lib.mjs";

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, x, i, arr) => (x.startsWith("--") ? [...acc, [x.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), []));
const only = typeof a.only === "string" ? a.only.split(",") : ["valuept", "handoff", "regrab", "charkey", "progfocus", "dialog"];

async function open(E, T, scene, o = {}) {
  const b = await E.browser();
  const ctx = await b.newContext({ viewport: { width: 700, height: 600 }, reducedMotion: "no-preference", colorScheme: "light" });
  const page = await ctx.newPage();
  await page.addInitScript(INIT);
  await page.goto(`${T.url}?${new URLSearchParams({ scene, theme: "light" })}`);
  await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
  return { page, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]) };
}

// the value-point film: range leading edge (right for a right fling, left for a left one), control trailing edge
const filmVP = (P, ms) => P.page.evaluate((ms) => new Promise((res) => {
  const out = []; const t0 = performance.now();
  const tick = () => {
    const root = document.querySelector(".glass-slider"); const rg = root.querySelector(".slider-range");
    const fp = document.querySelector(".engage-footprint");
    const r = root.getBoundingClientRect(); const q = rg.getBoundingClientRect(); const p = fp ? fp.getBoundingClientRect() : r;
    out.push({ t: performance.now() - t0, rL: r.left, rR: r.right, fL: p.left, fR: p.right, gL: q.left, gR: q.right, stage: root.matches(":popover-open"), value: document.querySelector('[role="slider"]').getAttribute("aria-valuenow") });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(out);
  };
  requestAnimationFrame(tick);
}), ms);

// two-slider film: A's and B's computed scale (x), their stage state, the veil opacity
const film2 = (P, ms) => P.page.evaluate((ms) => new Promise((res) => {
  const out = []; const t0 = performance.now();
  const sx = (el) => { const s = getComputedStyle(el).scale; if (s === "none") return 1; const n = Number(s.split(" ")[0]); return Number.isFinite(n) ? n : 1; };
  const tick = () => {
    const [A, B] = document.querySelectorAll(".glass-slider"); const v = document.querySelector(".glass-focus-veil");
    out.push({ t: performance.now() - t0, a: sx(A), b: sx(B), aStage: A.matches(":popover-open"), bStage: B.matches(":popover-open"), veil: v ? +getComputedStyle(v).opacity : 0, veilOpen: v ? v.matches(":popover-open") : false, aw: A.getBoundingClientRect().width });
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(out);
  };
  requestAnimationFrame(tick);
}), ms);

const state = (P) => P.page.evaluate(() => {
  const root = document.querySelector(".glass-slider"); const v = document.querySelector(".glass-focus-veil");
  if (!root) return { stage: null, eng: document.querySelectorAll("[data-engaged]").length, veil: v ? +getComputedStyle(v).opacity : null, scale: "no slider", focus: document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName, dialog: !!document.querySelector('[role="dialog"]') };
  const s = getComputedStyle(root).scale;
  return { stage: root.matches(":popover-open"), eng: document.querySelectorAll("[data-engaged]").length, veil: v ? +getComputedStyle(v).opacity : null, scale: s, focus: document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName, dialog: !!document.querySelector('[role="dialog"]') };
});
const fs = (s) => `stage ${s.stage} · [data-engaged] ${s.eng} · veil ${f(s.veil, 2)} · scale ${s.scale} · focus ${s.focus}${"dialog" in s ? ` · dialog ${s.dialog}` : ""}`;

await witness("C-E", "critic probe for family E", async ({ E, T, cell, guard, engine }) => {
  if (only.includes("valuept")) {
    for (const dir of [1, -1]) {
      const res = {};
      for (const still of [false, true]) {
        const name = `valuept ${dir > 0 ? "right" : "left"} ${still ? "still" : "fling"}`;
        const r = await guard(name, async () => {
          const P = await open(E, T, "slider");
          try {
            const c = await center(P.page, '[role="slider"]');
            await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
            for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + dir * 40 * k, c.y); await P.page.waitForTimeout(16); }
            if (still) await P.page.waitForTimeout(250);
            const pr = filmVP(P, 1500);
            await P.page.mouse.up();
            return { fr: await pr };
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const fr = r.fr; const f0 = fr[0];
        // value point: the range's leading edge, displaced from its first-frame position, in the fling's direction
        const vp = fr.map((x) => dir * ((dir > 0 ? x.gR : x.gL) - (dir > 0 ? f0.gR : f0.gL)));
        // control leading edge past the footprint, and trailing edge past the footprint (against the fling)
        const lead = fr.map((x) => dir * ((dir > 0 ? x.rR : x.rL) - (dir > 0 ? x.fR : x.fL)));
        const trail = fr.map((x) => -dir * ((dir > 0 ? x.rL : x.rR) - (dir > 0 ? x.fL : x.fR)));
        res[still ? "still" : "fling"] = { vp: Math.max(...vp), lead: Math.max(...lead), trail: Math.max(...trail), v0: f0.value, v1: fr.at(-1).value, n: fr.length };
        const q = res[still ? "still" : "fling"];
        cell(name, "REPORT", `value point max ${f(q.vp, 2)} px past its release position · control leading edge past footprint max ${f(q.lead, 2)} px · trailing edge past footprint max ${f(q.trail, 2)} px · value ${q.v0} → ${q.v1} · ${q.n} frames · load ${load()}`);
      }
      if (res.fling && res.still) {
        const d = res.fling.vp - res.still.vp; const dl = res.fling.lead - res.still.lead; const dt = res.fling.trail - res.still.trail;
        cell(`valuept ${dir > 0 ? "right" : "left"} differential`, d >= 4 ? "PASS" : "FAIL", `value point fling − still ${f(d, 2)} px (bound ≥ 4, E-4's TRAVEL) · control leading edge fling − still ${f(dl, 2)} px · trailing edge fling − still ${f(dt, 2)} px (a stretch holds it: ≈ 0) · load ${load()}`);
      }
    }
  }
  if (only.includes("handoff")) {
    const r = await guard("handoff", async () => {
      const P = await open(E, T, "slider2");
      try {
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(600);
        const pr = film2(P, 900);
        await P.page.waitForTimeout(32);
        await P.page.keyboard.press(tabKey(engine));
        return { fr: await pr };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("handoff", "FAIL", r.line);
    else {
      const fr = r.fr; const i0 = fr.findIndex((x) => x.bStage);
      const drops = fr.slice(1).map((x, k) => fr[k].a - x.a); const snap = Math.max(...drops);
      const after = fr.slice(Math.max(0, fr.findIndex((x, k) => k > 0 && x.a < fr[0].a - 0.001) - 1));
      const vmin = Math.min(...after.map((x) => x.veil));
      cell("handoff A snap", snap < 0.02 ? "PASS" : "FAIL", `Tab A → B · A scale at Tab ${f(fr[0].a)} · largest one-frame drop on A ${f(snap)} (bound < 0.02: A springs home, it does not snap) · A stage at B's promotion ${i0 >= 0 ? fr[i0].aStage : "n/a"} · load ${load()}`);
      cell("handoff veil", vmin >= 0.5 ? "PASS" : "FAIL", `veil min across the hand-off ${f(vmin, 2)} (bound ≥ 0.5: the world stays receded between two engagements) · end: B scale ${f(fr.at(-1).b)}, veil ${f(fr.at(-1).veil, 2)} · ${fr.length} frames · load ${load()}`);
    }
  }
  if (only.includes("regrab")) {
    const r = await guard("regrab", async () => {
      const P = await open(E, T, "slider2");
      try {
        const [ca, cb] = await P.page.evaluate(() => [...document.querySelectorAll('[role="slider"]')].map((e) => { const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; }));
        await P.page.mouse.move(ca.x, ca.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
        for (let k = 1; k <= 3; k++) { await P.page.mouse.move(ca.x + 10 * k, ca.y); await P.page.waitForTimeout(60); }
        await P.page.waitForTimeout(200);
        const pr = film2(P, 900);
        await P.page.mouse.up(); await P.page.waitForTimeout(40);
        await P.page.mouse.move(cb.x, cb.y); await P.page.mouse.down(); await P.page.waitForTimeout(500); await P.page.mouse.up();
        return { fr: await pr };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("regrab", "FAIL", r.line);
    else {
      const fr = r.fr; const drops = fr.slice(1).map((x, k) => fr[k].a - x.a); const snap = Math.max(...drops); const k = drops.indexOf(snap);
      cell("regrab A snap", snap < 0.02 ? "PASS" : "FAIL", `release A, +40 ms press B · A scale at release ${f(fr[0].a)} · largest one-frame drop on A ${f(snap)} at ${f(fr[k + 1]?.t, 0)} ms (from ${f(fr[k].a)} to ${f(fr[k + 1].a)}) (bound < 0.02) · B promoted ${fr.some((x) => x.bStage)} · load ${load()}`);
    }
  }
  if (only.includes("charkey")) {
    const r = await guard("charkey", async () => {
      const P = await open(E, T, "slider");
      try {
        const c = await center(P.page, '[role="slider"]');
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
        for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); }
        await P.page.mouse.up(); await P.page.waitForTimeout(1500);
        const before = await state(P);
        await P.page.keyboard.press("k"); await P.page.waitForTimeout(450);
        return { before, after: await state(P) };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("charkey", "FAIL", r.line);
    else cell("charkey k", !r.after.stage ? "PASS" : "FAIL", `after a drag, +1500 ms: ${fs(r.before)} | "k" (a key the slider does not act on), +450 ms: ${fs(r.after)} (bound: not engaged) · load ${load()}`);
  }
  if (only.includes("progfocus")) {
    const r = await guard("progfocus", async () => {
      const P = await open(E, T, "slider");
      try {
        await P.page.evaluate(() => document.querySelector('[role="slider"]').focus()); await P.page.waitForTimeout(450);
        return { s: await state(P) };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("progfocus", "FAIL", r.line);
    else cell("progfocus", "REPORT", `element.focus() by script, +450 ms: ${fs(r.s)} · load ${load()}`);
  }
  if (only.includes("dialog")) {
    const r = await guard("dialog", async () => {
      const P = await open(E, T, "sliderdlg");
      try {
        const atOpen = await state(P);
        let tabs = 0; let s = atOpen;
        while (s.focus !== "slider" && tabs < 6) { await P.page.keyboard.press(tabKey(engine)); tabs++; await P.page.waitForTimeout(150); s = await state(P); }
        await P.page.waitForTimeout(450); const engaged = await state(P);
        await P.page.keyboard.press("Escape"); await P.page.waitForTimeout(700);
        return { atOpen, tabs, engaged, esc: await state(P) };
      } finally { await P.close(); }
    });
    if (r.crashed) cell("dialog", "FAIL", r.line);
    else {
      cell("dialog open", "REPORT", `at open: ${fs(r.atOpen)}`);
      cell("dialog tab to slider", "REPORT", `${r.tabs} Tab(s), +450 ms: ${fs(r.engaged)}`);
      cell("dialog escape", "REPORT", `Escape, +700 ms: ${fs(r.esc)} · load ${load()}`);
    }
  }
});
