#!/usr/bin/env node
// E-5 · a held touch answers through a press rung, not leaked hover (W-I.3's touch rows, `W-I.3.md:61`).
// Per scene gated "E-5", light and dark:
//   hover-only set   fine pointer, the mouse over the control 500 ms, no press: the paint properties that change
//   touch set        a coarse page (lib.mjs openTouchPage: (hover: none) and (pointer: coarse) verified), a touch held
//                    350 ms on the control. Chromium: the long-tap gesture; WebKit: Input.dispatchTouchEvent through
//                    wktouch.mjs (H-4). Both set `:active` and a sticky `:hover` (PORTFOLIO §1.3 item 8)
//   press            PASS when |Δscale| ≥ 0.01 under the touch, or ≥ 1 paint property changes under the touch that
//                    hover does not paint (the press-only set: changed from rest, and to a value other than the hover
//                    state's). A control whose only touch answer is its hover paint FAILS
//   press-light(PRM) H-9: the same touch under reduced motion. The spatial leg retires there (E-9), so the answer must
//                    be light: ≥ 1 press-only paint property
//   sustain          CK-06 (pass 2; `engageEnvelopes.ts:10-12`: a held engagement "SUSTAINS for the hold's entire
//                    multi-second life"): the same held touch read at +200 ms and +1200 ms. The press-only properties
//                    at +200 ms are measured as their distance from rest (a colour as its RGBA distance, a number as
//                    its difference, any other value 1 when it differs); PASS when the distance at +1200 ms is ≥ 0.95×
//                    the distance at +200 ms. Read normally and under reduced motion (sustain(PRM))
//   H4 (pass 4), the three-read rule (CK-06; REGISTRY §P3-8.3): each held touch is taken THREE times, on three fresh
//                    touch pages, and `sustain` passes only when all three reads pass. Pass 3 read sustain once and the
//                    critics found it failing on some member on 3 of 3 Chromium reads (C-A3 §0.4) and on 2 of 5
//                    (C-E3 §0.4): one read passes a press light that sags on one hold in three (fixtures.mjs
//                    `e5-flaky`). `press` and `press-light(PRM)` are read on the first hold
//   H5 (pass 5), the onset (CK-06 × CK-27; REGISTRY §P4-7 item 3): the hold is also read every 25 ms from +25 to
//                    +200 ms. Over the press-only set the press has at +1200 ms (its landed set), each read's distance
//                    from rest is taken; `sustain` also FAILs a press that has not LANDED by its +200 ms reference: the
//                    distance at +200 ms must be ≥ 0.9× the distance at +1200 ms. The line prints the onset (the first
//                    read at half the landed distance). The +200 ms reference sat inside a late attack: C-A4's plant P7
//                    (the ToggleGroupItem's press back on `:active`, which Chromium sets 175-200 ms after touch-down) read
//                    3/3 sustain "rising from a late attack" (×1.05-×1.39). Plants: `e5-late` (the press mark written
//                    190 ms after the touch, both engines) and `e5-active` (the press on `:active` alone: Chromium's
//                    late `:active`; WebKit's raw touch sets `:active` at touchStart, so the plant has no input there)
//   H7 (pass 7; CK-06, REGISTRY §P6-7 item 14, P-E6 §3): in Chromium every onset and sustain read is timed from the FIRST
//                    TOUCH EVENT the page receives (lib.mjs holdAt), not from the gesture's send; the line prints each
//                    hold's send → touchstart lag. WebKit's raw driver sends touchStart itself and its clock starts there
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e5-touch.mjs --build <dir> | --fixture [--fault e5-hover] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, paintDiff, f } from "./lib.mjs";

const READS = 3;
// H5: the onset reads (ms from touch-down), the +200 ms reference, and the landed bound
const ONSET = [25, 50, 75, 100, 125, 150, 175, 200], LANDED = 0.9;

await witness("E-5", "a held touch answers through a press rung, and sustains (CK-06)", async ({ E, T, cell, guard, idx }) => {
  for (const [sc, m] of scenesFor(idx, "E-5")) {
    const sel = m.touch ?? '[data-e~="target"]';
    const snap = (P) => P.page.evaluate((s) => { const e = document.querySelector(s); return { p: window.__paint(s), s: window.__eff(e).s, act: e.matches(":active") }; }, sel);
    for (const theme of ["light", "dark"]) {
      // H4: the hover read and each touch hold are guarded one by one (90 s each), so a WebKit touch page that stalls
      // re-runs that hold on a fresh browser, not the cell's seven pages (one 240 s guard over all seven hung HEAD twice)
      const hv = await guard(`${sc} ${theme} hover`, async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          await P.page.waitForTimeout(250); const c = await center(P.page, sel); const h0 = await snap(P);
          await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(500); return { h0, h1: await snap(P) };
        } finally { await P.close(); }
      });
      if (hv.crashed) { cell(`E-5 ${sc} press ${theme}`, "FAIL", `hover read: ${hv.line}`); continue; }
      const { h0, h1 } = hv;
      const touch = async (prm) => {
        const Q = await openTouchPage(E, T, sc, { theme, prm });
        try {
          if (!Q.modeOk) return { mode: Q.modeLine };
          await Q.page.waitForTimeout(250); const p0 = await snap(Q);
          const c = await center(Q.page, sel);
          const xs = await Q.holdAt(c.x, c.y, [...ONSET, 350, 1200], async (el) => ({ ...(await snap(Q)), el }));
          const pa = xs[ONSET.length - 1], p1 = xs[ONSET.length], pz = xs[ONSET.length + 1];
          // press-only: a property the touch changes to a value the hover state does not have (leaked hover paints the
          // hover value; a press rung paints its own)
          const onlyAt = (p) => paintDiff(p0.p, p.p).filter((k) => p.p[k] !== h1.p[k]);
          // CK-06: the press light's distance from rest at +200 ms and at +1200 ms, over the +200 ms press-only set
          const keys = onlyAt(pa);
          // H5: the landed set (press-only at +1200 ms) and every onset read's distance from rest over it
          const keysZ = onlyAt(pz);
          const dist = await Q.page.evaluate(([keys, keysZ, r, a, z, on]) => {
            const one = (u, v) => { const cu = window.__rgba(u), cv = window.__rgba(v); if (cu && cv && /^(rgb|oklab|oklch|color|lab|lch|hsl|#)/.test(u.trim())) return Math.hypot(...cu.map((x, i) => x - cv[i])); const nu = parseFloat(u), nv = parseFloat(v); if (Number.isFinite(nu) && Number.isFinite(nv) && String(nu) === u.trim() && String(nv) === v.trim()) return Math.abs(nu - nv); return u === v ? 0 : 1; };
            const sum = (p, ks = keys) => ks.reduce((s, k) => s + one(r[k], p[k]), 0);
            return { a: sum(a), z: sum(z), dz: sum(z, keysZ), on: on.map((p) => sum(p, keysZ)) };
          }, [keys, keysZ, p0.p, pa.p, pz.p, xs.slice(0, ONSET.length).map((x) => x.p)]);
          const on = xs.slice(0, ONSET.length).map((x, i) => ({ at: ONSET[i], el: x.el, d: dist.on[i] }));
          const half = on.find((x) => dist.dz > 0 && x.d >= 0.5 * dist.dz);
          const land = { keysZ, dz: dist.dz, d200: dist.on.at(-1), el200: on.at(-1).el, landed: dist.dz > 0 && dist.on.at(-1) >= LANDED * dist.dz - 1e-9, onset: half ? `+${half.at} ms (read at +${half.el})` : "not by +200 ms", trace: on.map((x) => `+${x.at} ${dist.dz > 0 ? f(x.d / dist.dz, 2) : "-"}`).join(" ") };
          return { t: paintDiff(p0.p, p1.p), only: onlyAt(p1), ds: p1.s - p0.s, act: p1.act, lag: Q.lastLag, sus: { keys, a: dist.a, z: dist.z, actZ: pz.act, land } };
        } finally { await Q.close(); }
      };
      // a hold whose engine closed twice (REPRODUCED) ends that mode's reads: the cell fails on it, and the remaining
      // holds would only repeat the same close (PF-1's WebKit toggle and accordion pages)
      const holds = async (prm) => {
        const xs = [];
        for (let k = 0; k < READS; k++) {
          const y = await guard(`${sc} ${theme} hold ${k + 1}${prm ? " PRM" : ""}`, () => touch(prm));
          xs.push(y); if (y.crashed) break;
        }
        return xs;
      };
      const r = { h: paintDiff(h0.p, h1.p), on: await holds(false), prm: await holds(true) };
      for (const [k, xs] of [["press", r.on], ["press-light(PRM)", r.prm]]) {
        const x = xs[0];
        if (x.crashed) { cell(`E-5 ${sc} ${k} ${theme}`, "FAIL", `hold 1: ${x.line}`); cell(`E-5 ${sc} sustain${k === "press" ? "" : "(PRM)"} ${theme}`, "FAIL", `hold 1: ${x.line} (reads 2-3 not taken)`); continue; }
        if (xs.some((y) => y.mode)) { cell(`E-5 ${sc} ${k} ${theme}`, "FAIL", `MODE NOT APPLIED ${xs.find((y) => y.mode).mode}`); continue; }
        // the three-read rule: every read drives (a press-only property at +200 ms) and every read sustains
        const sn = `E-5 ${sc} sustain${k === "press" ? "" : "(PRM)"} ${theme}`;
        // H5: a read sustains only if the press has also LANDED by the +200 ms reference (the onset rule)
        const one = (y) => {
          if (y.crashed) return { ok: false, t: y.line };
          const L = y.sus.land;
          if (!L.keysZ.length) return { ok: false, t: "NOT DRIVEN (no press-only property at +1200 ms)" };
          const landTxt = `${L.landed ? "landed" : "NOT LANDED"} by +200 ms (read at +${L.el200}: ${f(L.d200, 3)} of the landed ${f(L.dz, 3)} = ×${f(L.d200 / L.dz, 2)}, bound ≥ ×${LANDED}; onset at half ${L.onset}; [${L.trace}])`;
          if (!y.sus.keys.length) return { ok: false, t: `NOT DRIVEN (no press-only property at +200 ms) · ${landTxt}` };
          return { ok: L.landed && y.sus.z >= 0.95 * y.sus.a - 1e-9, t: `${f(y.sus.a, 3)} → ${f(y.sus.z, 3)} ${y.sus.a ? `×${f(y.sus.z / y.sus.a, 2)}` : "(rising from 0)"}${y.sus.actZ ? "" : " (:active lost)"} · ${landTxt}${y.lag != null ? ` · clock from the first touchstart, ${f(y.lag, 1)} ms after the send` : ""}${y.note ? ` (${y.note.slice(0, 60)})` : ""}` };
        };
        const reads = xs.map(one); while (reads.length < READS) reads.push({ ok: false, t: "not taken" }); const nOk = reads.filter((y) => y.ok).length;
        cell(sn, nOk === reads.length ? "PASS" : "FAIL", `${nOk} of ${reads.length} reads sustain (the three-read rule: all must) · the press light's distance from rest at +200 ms → +1200 ms over [${x.sus.keys.join(", ").slice(0, 100)}]: ${reads.map((y, i) => `read ${i + 1} ${y.t}`).join(" · ")} (bound ≥ ×0.95 on every read, and landed by +200 ms on every read)`);
        const only = x.only;
        const pass = k === "press" ? Math.abs(x.ds) >= 0.01 || only.length > 0 : only.length > 0;
        cell(`E-5 ${sc} ${k} ${theme}`, pass ? "PASS" : "FAIL", `:active ${x.act} · Δscale ${f(x.ds)} · touch-changed [${x.t.join(", ")}] · hover-changed [${r.h.join(", ")}] · press-only [${only.join(", ")}]${k === "press" ? "" : " (bound ≥ 1 press-only property under reduce)"}${x.note ? ` · ${x.note}` : ""}`);
      }
    }
  }
}, 4800); // H4: three holds per cell, each guarded; WebKit's PF-1 page closes re-run once on a fresh browser
