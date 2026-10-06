#!/usr/bin/env node
// E-8 · one clock authority; no rung literal (W-J.2 §3.2 item 6, G6). A hold line at round 0, read at runtime from
// the built page rather than the source text:
//   mirror    every ENGAGE_ENVELOPES row the build carries (window.__e.envelopes, imported from the library) equals
//             the computed `--engage-<role>-attack` / `-release` on :root, and :root carries no orphan `--engage-*`
//             token (exactly two per row)
//   literal   per scene gated "E-8", every animation and transition that runs on the scene during a press (pointer
//             down 250 ms, release) and a keyboard commit has a duration some clock token resolves to (every custom
//             property the page's CSSOM declares, resolved on the scene's own element as a transition-duration), or 0.
//             A CSS transition is read at its declared duration (the element's computed transition-duration for its
//             property), because a reversed transition runs a spec-shortened one (measured: WebKit 348 ms of 350).
//             A duration no token carries is a minted figure. Offenders are named (property or animation name).
// Light only: clocks do not change with the theme.
//   node e8-clock.mjs --build <dir> | --fixture [--fault e8-drift|e8-literal] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey } from "./lib.mjs";

const COLLECT = () => {
  window.__anims = new Map();
  const tick = () => {
    for (const a of document.getAnimations()) {
      if (window.__anims.has(a)) continue;
      const t = a.effect?.getTiming(); const tgt = a.effect?.target;
      if (!tgt || !document.querySelector("main")?.contains(tgt) && !tgt.closest?.("[data-engaged]")) continue;
      let dur = typeof t.duration === "number" ? t.duration : NaN;
      // a CSS transition reversed mid-flight runs a shortened duration (CSS Transitions §3.3, the reversing
      // shortening factor): read the DECLARED duration for its property, which is what the author spelled
      if (a.transitionProperty) {
        const cs = getComputedStyle(tgt, a.effect.pseudoElement ?? null);
        const props = cs.transitionProperty.split(",").map((s) => s.trim()); const durs = cs.transitionDuration.split(",").map((s) => s.trim());
        let i = props.indexOf(a.transitionProperty); if (i < 0) i = props.indexOf("all");
        if (i >= 0) { const v = durs[i % durs.length]; const m = v.match(/^([\d.]+)(m?s)$/); if (m) dur = +m[1] * (m[2] === "s" ? 1000 : 1); }
      }
      window.__anims.set(a, { kind: a.constructor.name, name: a.transitionProperty ?? a.animationName ?? (a.id || "script"), dur, el: tgt.className?.baseVal ?? tgt.className ?? tgt.tagName });
    }
    if (window.__collecting) requestAnimationFrame(tick);
  };
  window.__collecting = true; requestAnimationFrame(tick);
};
const CLOCKS = () => {
  const names = new Set();
  const walk = (rules) => { for (const r of rules) { if (r.style) for (let i = 0; i < r.style.length; i++) { const n = r.style[i]; if (n.startsWith("--")) names.add(n); } if (r.cssRules) walk(r.cssRules); } };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
  const host = document.querySelector('[data-e~="target"]')?.parentElement ?? document.body;
  const probe = document.createElement("i"); probe.style.display = "none"; host.appendChild(probe);
  const ms = new Map();
  for (const n of names) {
    probe.style.transitionDuration = ""; probe.style.transitionDuration = `var(${n})`;
    const v = getComputedStyle(probe).transitionDuration.split(",")[0].trim();
    const m = v.match(/^([\d.]+)(m?s)$/); if (m && probe.style.transitionDuration) { const x = +m[1] * (m[2] === "s" ? 1000 : 1); if (x > 0) ms.set(n, x); }
  }
  probe.remove();
  const root = getComputedStyle(document.documentElement);
  const engage = [...names].filter((n) => n.startsWith("--engage-") && root.getPropertyValue(n).trim() !== "");
  return { clocks: [...ms.entries()], engage: engage.map((n) => [n, root.getPropertyValue(n).trim()]) };
};

await witness("E-8", "one clock authority; no rung literal", async ({ E, T, cell, guard, idx, engine }) => {
  let mirrored = false;
  for (const [sc, m] of scenesFor(idx, "E-8")) {
    const r = await guard(sc, async () => {
      const P = await openPage(E, T, sc);
      try {
        const env = await P.page.evaluate(() => window.__e.envelopes ?? null);
        const ck = await P.page.evaluate(CLOCKS);
        await P.page.evaluate(COLLECT);
        const c = await center(P.page, '[data-e~="target"]');
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(250); await P.page.mouse.up(); await P.page.waitForTimeout(500);
        await P.page.mouse.move(2, 2); await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(150);
        await P.page.keyboard.press(m.key); await P.page.waitForTimeout(700);
        const anims = await P.page.evaluate(() => { window.__collecting = false; return [...window.__anims.values()]; });
        return { env, ck, anims };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(`E-8 literal ${sc}`, "FAIL", r.line); continue; }
    if (!mirrored) {
      mirrored = true;
      if (!r.env) cell("E-8 mirror", "FAIL", "the build exposes no envelope table (window.__e.envelopes)");
      else {
        const got = new Map(r.ck.engage);
        const bad = [];
        for (const row of r.env) for (const [leg, v] of [["attack", row.attackMs], ["release", row.releaseMs]]) {
          // compared in milliseconds: a minifier may respell 120ms as .12s (measured in the HEAD build)
          const n = `--engage-${row.role}-${leg}`; const g = got.get(n); const mm = g?.match(/^([\d.]+)(m?s)$/);
          const ms = mm ? +mm[1] * (mm[2] === "s" ? 1000 : 1) : NaN;
          if (!(Math.abs(ms - v) < 0.01)) bad.push(`${n} ${g ?? "absent"} ≠ ${v}ms`);
        }
        const orphans = [...got.keys()].filter((n) => !r.env.some((row) => n === `--engage-${row.role}-attack` || n === `--engage-${row.role}-release`));
        cell("E-8 mirror", bad.length || orphans.length ? "FAIL" : "PASS", `${r.env.length} rows, ${got.size} --engage-* tokens on :root · drift [${bad.join("; ")}] · orphans [${orphans.join(", ")}]`);
      }
    }
    const clockMs = r.ck.clocks.map(([, x]) => x);
    const off = r.anims.filter((x) => Number.isFinite(x.dur) && x.dur > 0 && !clockMs.some((c) => Math.abs(c - x.dur) <= 1));
    const seen = [...new Set(r.anims.map((x) => `${x.name}@${Math.round(x.dur)}ms`))];
    cell(`E-8 literal ${sc}`, off.length ? "FAIL" : "PASS", `${r.anims.length} animation(s) ran [${seen.join(", ").slice(0, 300)}] against ${r.ck.clocks.length} clock tokens · minted [${[...new Set(off.map((x) => `${x.kind} ${x.name} ${Math.round(x.dur)}ms on ${String(x.el).slice(0, 40)}`))].join("; ")}]${r.note ? ` · ${r.note}` : ""}`);
  }
});
