#!/usr/bin/env node
// W-A · D3-A's witness (A′, the null route, in pass 2): a guarantee with no signal. Nothing reads the field back or
// drives the glass per frame, every chrome level clears M-2 over black and white and every content level over its
// declared band, and the thinnest rung of each band sits on the bound the cascade computes.
//   Leg 1 (behavioural, H-3; the same leg as M-5 leg 1, rows.mjs signalLeg): in every live window of a gate engine, 0
//          readbacks and no custom property written in 3 or more frames, whatever its name or writer. (The pass-1
//          leg grepped src for one property name; a renamed or indirected writer evaded it, A-crit §3 plants B, C.)
//   Leg 2: chrome levels (floating, overlay, dialog-rung, dock, popover, the real Dialog): every text run clears
//          4.5 on the 1 px ring over black and white, both themes.
//   Leg 3: content levels (wash, quiet, resting, card): every text run clears 4.5 over their declared band, the
//          fields the library itself ships (paper, the aurora at ceilings 1 and 0.5), both themes.
//   Leg 4 (H-4): per band (content: wash quiet resting card; chrome: floating overlay dialog-rung dock popover and
//          the real Dialog), the thinnest rung's painted α (from its composites over black and white) lies in
//          [bound, bound + 0.03], where bound is the number the cascade computes on that plate (lib.mjs BOUND_PROP,
//          FL-5's one source of record), never a literal. "α ≥ bound" on every rung is not asked: legs 2-3 imply it.
//          A plate with no computed bound is a FAIL row. The analytic bound over the captured paint is printed as
//          information (its composite leaves blur and saturate out); the self-test calibrates fixture A from it.
//          H5-4 (pass 5): leg 4 follows Q-11's text, as M-1x does (H4-2). With no ruling, or under (a) or (c), every
//          band stays on the bound. Under (b) ("the light chrome goes opaque, a card everywhere") the LIGHT chrome
//          band's thinnest rung must paint α = 1 (≥ 0.995, the same 0.005 paint-read noise); content and dark stay on
//          the bound. (d) is unresearched: the check refuses (exit 2) until the harness is revised for it.
//   node wa-no-signal.mjs <capdir> [--gate chromium[,webkit]] [--q11 a|b|c]
import { cli, loadCapture, gateEngines, report, paintedAlpha, region, cr, pct, f, hex, tag, pick, THEMES, CONTENT, BOUND_PROP, CELLS, VARIANT } from "./lib.mjs";
import { need, tally, inkRows, signalLeg } from "./rows.mjs";

const a = cli({ q11: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const q11 = a.q11 || null;
if (q11 && !["a", "b", "c"].includes(q11)) { console.log(`W-A · Q-11 ruling "${q11}" is not built into this check: revise the harness first`); process.exit(2); }
const opaqueChrome = (theme, band) => q11 === "b" && theme === "light" && band === "chrome";   // H5-4
const t = tally(), lines = [];
// Leg 1
signalLeg(cap, t, lines, gate);
// Legs 2 and 3
const CH = ["floating", "overlay", "dialog-rung", "dock", "popover", "dialog"];
const legs = [["chrome", CH, ["black", "white"]], ["content", CONTENT, ["paper", "aurora", "aurora50"]]];
for (const [band, ids, grounds] of legs) {
  const n = need(cap, gate, { themes: THEMES, grounds, scenes: ["ladder", "dialog"] });
  t.add(true, false, n.missing); lines.push(...n.lines);
  for (const { cell, gated } of n.have) {
    const rows = inkRows(cap, cell).filter((r) => ids.includes(r.spec));
    if (!rows.length) continue;
    const bad = rows.filter((r) => !(r.p05 >= 4.5));
    for (const r of rows) t.add(gated, r.p05 >= 4.5);
    const w = rows.reduce((x, y) => ((y.p05 ?? 0) < (x.p05 ?? 0) ? y : x));
    lines.push(`${band} ${tag(cell)}${gated ? "" : " [info]"}: ${rows.length - bad.length}/${rows.length} runs ≥ 4.5 · worst ${w.spec}·${w.ink} ${f(w.p05)}${bad.length ? " ✗" : ""}`);
  }
}
// Leg 4: the thinnest rung of each band on the computed bound; the analytic bound printed as information.
const solve = (ok) => { for (let x = 0; x <= 1.0001; x += 0.005) if (ok(x)) return +x.toFixed(3); return null; };
const mix = (P, G, x) => P.map((p, i) => x * p + (1 - x) * G[i]);
for (const engine of [...new Set(cap.cells.map((c) => c.engine))]) for (const theme of THEMES) {
  const gated = gate.includes(engine), band = { content: [], chrome: [] };
  for (const scene of ["ladder", "dialog"]) {
    if (CELLS && !CELLS.test(`${engine} ${theme} black ${scene}`)) continue;
    const B = pick(cap, { engine, theme, ground: "black", scene, variant: VARIANT })[0], W = pick(cap, { engine, theme, ground: "white", scene, variant: VARIANT })[0];
    if (!B || !W || B.crashed || W.crashed) { if (gated) { t.add(true, false); lines.push(`α ${engine} ${theme} ${scene}: black or white cell missing ✗`); } continue; }
    const parts = [];
    for (const s of B.specs.filter((s) => s.sample && s.id !== "opaque")) {
      const { alpha, pole } = paintedAlpha(cap, B, W, s);
      if (CONTENT.includes(s.id)) band.content.push({ id: s.id, alpha, bound: s.bound }); else if (CH.includes(s.id)) band.chrome.push({ id: s.id, alpha, bound: s.bound });
      const inks = new Map();   // ink id → the painted glyph-core colour
      for (const r of [...inkRows(cap, B), ...inkRows(cap, W)]) if (r.spec === s.id && !r.well && r.rgb && !inks.has(r.ink)) inks.set(r.ink, r.rgb);
      let an = null;
      if (pole && inks.size) {
        if (CH.includes(s.id)) an = solve((x) => [[0, 0, 0], [255, 255, 255]].every((G) => [...inks.values()].every((i) => cr(i, mix(pole, G, x)) >= 4.5)));
        else {
          // Each ink over the raw field under its OWN text box (the pixels its ring sees), across the declared band.
          const fields = ["paper", "aurora", "aurora50"].map((g) => pick(cap, { engine, theme, ground: g, scene, variant: VARIANT })[0]).filter((c) => c && !c.crashed);
          const under = new Map([...inks.keys()].map((id) => [id, fields.flatMap((c) => {
            const box = c.specs.find((z) => z.id === s.id)?.inks.find((i) => i.id === id)?.box;
            return box ? region(cap.img(c, "raw"), box).filter((_, k) => k % 3 === 0) : [];
          })]));
          an = solve((x) => [...inks].every(([id, i]) => { const px = under.get(id); return px.length > 0 && pct(px.map((g) => cr(i, mix(pole, g, x))), 0.05) >= 4.5; }));
        }
      }
      parts.push(`${s.id} α ${f(alpha, 3)} pole ${pole ? hex(pole) : "—"} bound ${an == null ? "none" : f(an, 3)}`);
    }
    lines.push(`analytic α ${engine} ${theme} ${scene} [information]: ${parts.join(" · ")}`);
  }
  for (const [name, rows] of Object.entries(band)) {
    if (!rows.length) continue;
    const thin = rows.reduce((x, y) => (y.alpha < x.alpha ? y : x));
    if (opaqueChrome(theme, name)) {   // H5-4: Q-11 (b)'s text, the light chrome opaque
      const ok = thin.alpha >= 0.995;
      t.add(gated, ok);
      lines.push(`α ${engine} ${theme} ${name}${gated ? "" : " [info]"}: thinnest ${thin.id} painted α ${f(thin.alpha, 3)} · Q-11 (b): light chrome opaque, α = 1 (≥ 0.995)${ok ? "" : " ✗"} · computed ${BOUND_PROP} ${thin.bound == null ? "absent" : f(thin.bound, 3)} [information] · rungs ${rows.map((r) => `${r.id} ${f(r.alpha, 3)}`).join(" ")}`);
      continue;
    }
    const ok = thin.bound != null && thin.alpha >= thin.bound - 0.005 && thin.alpha <= thin.bound + 0.03;
    t.add(gated, ok);
    lines.push(`α ${engine} ${theme} ${name}${gated ? "" : " [info]"}: thinnest ${thin.id} painted α ${f(thin.alpha, 3)} · computed ${BOUND_PROP} ${thin.bound == null ? "absent (FL-5 not built)" : f(thin.bound, 3)}${thin.bound == null ? "" : ` · α − bound ${thin.alpha - thin.bound >= 0 ? "+" : ""}${f(thin.alpha - thin.bound, 3)} (on the bound: [0, +0.03])`}${ok ? "" : " ✗"} · rungs ${rows.map((r) => `${r.id} ${f(r.alpha, 3)}`).join(" ")}`);
  }
}
report(cap, { id: "W-A", title: `A′ · a guarantee with no signal (no readback or recurring writer; chrome M-2 over black/white; content M-2 over its band; the thinnest rung on the computed bound${q11 === "b" ? ", the light chrome opaque under Q-11 (b)" : ""}); Q-11 ${q11 ? "ruled (" + q11 + ")" : "unruled: the default (a)"}`, lines, ...t, gate });
