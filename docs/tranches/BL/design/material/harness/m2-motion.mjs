#!/usr/bin/env node
// M-2m · Text contrast on the moving field (H-11; M-2's motion leg). The frozen cells cannot see what motion does:
// a static solve erodes as the field moves (C-crit §5: dark card muted 5.98 frozen, 5.01 moving), and a ground change
// opens a window in which the ink or the veil lags (PF-11). Q-8's pass-2 default (c) is asymmetric: thicken or
// re-solve at once, thin on the spring, so contrast never dips.
// The capture's motion windows (--motion; the ladder scene over the aurora at ceilings 1 and 0.5, both themes,
// motion on) hold whole frames. Each frame is read FRAME-LOCKED: the glyph cores and the ring come from the same
// frame, so ink and ground are one instant. Glyph coverage comes from the frozen cell's mask pair (geometry only);
// the witness first checks that every surface and ink box sits where the frozen cell measured it. The ring is R 1,
// restricted to pixels of zero coverage (≤ 0.02), so no antialiased ink fringe enters it.
//   Leg 1 (motion): every ink's p05 ≥ 4.5 in every `motion` frame (12, spread over the moving field).
//   Leg 2 (ground step): every ink's p05 ≥ 4.5 in every `step` frame, from 200 ms before the ceiling steps
//          (1 → 0.5, 0.5 → 1) to 1.5 s after. The dock's sample-region L per frame is printed (the veil's trajectory).
//   Leg 3 (drift, H3-12; PF-11's 100 s): every ink's p05 ≥ 4.5 in every `drift` frame, one frame every 2 s for 100 s
//          over the moving c1 field, both themes (capture --drift). A drift window needs ≥ 45 frames spanning ≥ 95 s.
//          Pass 2 ran 60 s (90 s exhausted the node heap: the screencast kept every frame); the drift pass streams one
//          frame at a time to disk.
// Chromium frames are the compositor's own (CDP screencast); Playwright WebKit frames are a screenshot loop, sparser,
// and informational unless --gate names webkit. A window with too few frames is a FAIL row (≥ 6 motion frames; ≥ 10
// step frames in Chromium, ≥ 5 in Playwright WebKit).
//   node m2-motion.mjs <capdir> [--gate chromium[,webkit]] [--verbose]
import fs from "node:fs";
import path from "node:path";
import { PNG, cli, loadCapture, gateEngines, report, glyphCoverage, ringRead, region, mean3, lch, pick, f, THEMES, FIELD_GROUNDS, CELLS, VARIANT } from "./lib.mjs";
import { tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const t = tally(), lines = [];
const same = (p, q) => p && q && p.every((v, i) => Math.abs(v - q[i]) <= 1);
const engines = [...new Set([...gate, ...(cap.motion || []).map((m) => m.engine)])];
for (const engine of engines) for (const theme of THEMES) for (const ground of FIELD_GROUNDS) {
  if (CELLS && !CELLS.test(`${engine} ${theme} ${ground} ladder`)) continue;
  const gated = gate.includes(engine), m = (cap.motion || []).find((x) => x.engine === engine && x.theme === theme && x.ground === ground && (x.variant || "base") === VARIANT);
  const lab = `${engine}${m?.shim ? "+shim" : ""} ${theme} ${ground}`;
  if (!m || m.error) { if (gated) { t.add(true, false); lines.push(`motion ${lab}: ${m ? "ERROR " + m.error : "MISSING (capture with --motion)"} ✗`); } continue; }
  const cell = pick(cap, { engine, theme, ground, scene: "ladder", variant: VARIANT })[0];
  if (!cell || cell.crashed) { t.add(gated, false); lines.push(`motion ${lab}: no frozen ladder cell for the masks ✗`); continue; }
  const moved = m.specs.filter((s) => { const c = cell.specs.find((z) => z.id === s.id); return !c || !same(s.rect, c.rect) || s.inks.some((i) => !same(i.box, c.inks.find((z) => z.id === i.id)?.box)); });
  if (moved.length) { t.add(gated, false); lines.push(`motion ${lab}: layout differs from the frozen cell (${moved.map((s) => s.id).join(", ")}) ✗`); continue; }
  const A = cap.img(cell, "maskA"), B = cap.img(cell, "maskB");
  const inks = cell.specs.flatMap((s) => s.inks.map((i) => ({ spec: s.id, ink: i.id, cov: glyphCoverage(A, B, i.box, 1) })));
  const dock = cell.specs.find((s) => s.id === "dock");
  const byKind = { motion: [], step: [] };
  for (const fr of m.frames) {
    const png = PNG.sync.read(fs.readFileSync(path.join(cap.capdir, fr.file)));
    if (png.width !== 1280 || png.height !== 900) { byKind[fr.kind].push({ t: fr.t, bad: `${png.width}×${png.height}` }); continue; }
    const vals = inks.map((k) => ringRead(k.cov, png, png, 1, 0.02).p05);
    byKind[fr.kind].push({ t: fr.t, vals, L: dock?.sample ? lch(mean3(region(png, dock.sample)))[0] : null });
  }
  const minN = { motion: 6, step: engine === "chromium" ? 10 : 5 };
  for (const kind of ["motion", "step"]) {
    const frs = byKind[kind].filter((x) => x.vals), bad = byKind[kind].filter((x) => x.bad);
    if (bad.length) { t.add(gated, false); lines.push(`${kind} ${lab}: ${bad.length} frames at ${bad[0].bad}, not 1280×900 ✗`); }
    if (frs.length < minN[kind]) { t.add(gated, false); lines.push(`${kind} ${lab}: ${frs.length} frames (need ≥ ${minN[kind]}) ✗`); continue; }
    const worst = inks.map((k, j) => { const v = frs.map((x) => x.vals[j]); const lo = v.some((x) => x == null) ? null : Math.min(...v); const at = frs[v.indexOf(lo)]?.t; return { ...k, lo, at, ok: lo != null && lo >= 4.5 }; });
    for (const w of worst) t.add(gated, w.ok);
    const bad2 = worst.filter((w) => !w.ok), lo = worst.reduce((x, y) => ((y.lo ?? -1) < (x.lo ?? -1) ? y : x));
    const span = frs.length ? `${f(frs[0].t, 0)}…${f(frs[frs.length - 1].t, 0)} ms` : "";
    lines.push(`${kind} ${lab}${gated ? "" : " [info]"} (${frs.length} frames, ${span}${kind === "step" ? `, ceiling → ${m.to}` : ""}): ${inks.length - bad2.length}/${inks.length} inks ≥ 4.5 in every frame · worst ${lo.spec}·${lo.ink} ${f(lo.lo)} at ${f(lo.at, 0)} ms${bad2.length ? ` · under: ${bad2.slice(0, 5).map((w) => `${w.spec}·${w.ink} ${f(w.lo)}`).join(", ")}${bad2.length > 5 ? " …" : ""} ✗` : ""}`);
    if (kind === "step" && dock) { const Ls = frs.filter((x) => x.L != null); lines.push(`    dock sample L per frame: ${Ls.filter((_, i) => i % Math.max(1, Math.floor(Ls.length / 12)) === 0).map((x) => `${f(x.t, 0)}ms ${f(x.L, 3)}`).join(" · ")}`); }
    if (a.verbose) for (const w of worst) lines.push(`    ${w.spec}·${w.ink} min ${f(w.lo)} at ${f(w.at, 0)} ms`);
  }
}
// Leg 3: the drift windows (one frame every 2 s for 100 s over c1).
for (const engine of [...new Set([...gate, ...(cap.drift || []).map((m) => m.engine)])]) for (const theme of THEMES) {
  const ground = "aurora";
  if (CELLS && !CELLS.test(`${engine} ${theme} ${ground} ladder`)) continue;
  const gated = gate.includes(engine), m = (cap.drift || []).find((x) => x.engine === engine && x.theme === theme && x.ground === ground && (x.variant || "base") === VARIANT);
  const lab = `${engine}${m?.shim ? "+shim" : ""} ${theme} ${ground}`;
  if (!m || m.error) { if (gated) { t.add(true, false); lines.push(`drift ${lab}: ${m ? "ERROR " + m.error : "MISSING (capture with --drift)"} ✗`); } continue; }
  const cell = pick(cap, { engine, theme, ground, scene: "ladder", variant: VARIANT })[0];
  if (!cell || cell.crashed) { t.add(gated, false); lines.push(`drift ${lab}: no frozen ladder cell for the masks ✗`); continue; }
  const moved = m.specs.filter((s) => { const c = cell.specs.find((z) => z.id === s.id); return !c || !same(s.rect, c.rect) || s.inks.some((i) => !same(i.box, c.inks.find((z) => z.id === i.id)?.box)); });
  if (moved.length) { t.add(gated, false); lines.push(`drift ${lab}: layout differs from the frozen cell (${moved.map((s) => s.id).join(", ")}) ✗`); continue; }
  const A = cap.img(cell, "maskA"), B = cap.img(cell, "maskB");
  const inks = cell.specs.flatMap((s) => s.inks.map((i) => ({ spec: s.id, ink: i.id, cov: glyphCoverage(A, B, i.box, 1) })));
  const frs = m.frames.map((fr) => { const png = PNG.sync.read(fs.readFileSync(path.join(cap.capdir, fr.file))); return { t: fr.t, vals: inks.map((k) => ringRead(k.cov, png, png, 1, 0.02).p05) }; });
  const spanS = frs.length ? (frs[frs.length - 1].t - frs[0].t) / 1000 : 0;
  if (frs.length < 45 || spanS < 95) { t.add(gated, false); lines.push(`drift ${lab}: ${frs.length} frames over ${f(spanS, 1)} s (need ≥ 45 over ≥ 95 s) ✗`); continue; }
  const worst = inks.map((k, j) => { const v = frs.map((x) => x.vals[j]); const lo = v.some((x) => x == null) ? null : Math.min(...v); return { ...k, lo, at: frs[v.indexOf(lo)]?.t, ok: lo != null && lo >= 4.5 }; });
  for (const w of worst) t.add(gated, w.ok);
  const bad = worst.filter((w) => !w.ok), lo = worst.reduce((x, y) => ((y.lo ?? -1) < (x.lo ?? -1) ? y : x));
  lines.push(`drift ${lab}${gated ? "" : " [info]"} (${frs.length} frames over ${f(spanS, 1)} s, load at end ${(m.load || []).join(" ") || "—"}): ${inks.length - bad.length}/${inks.length} inks ≥ 4.5 in every frame · worst ${lo.spec}·${lo.ink} ${f(lo.lo)} at ${f((lo.at ?? 0) / 1000, 1)} s${bad.length ? ` · under: ${bad.slice(0, 5).map((w) => `${w.spec}·${w.ink} ${f(w.lo)} at ${f((w.at ?? 0) / 1000, 1)} s`).join(", ")}${bad.length > 5 ? " …" : ""} ✗` : ""}`);
}
report(cap, { id: "M-2m", title: "text contrast on the moving field, through a ground step and over a 100 s drift (frame-locked R 1 ring, p05 ≥ 4.5 in every frame)", lines, ...t, gate,
  extra: ["frames: Chromium, the CDP screencast (every composited frame); Playwright WebKit, a screenshot loop (sparse, +shim); drift, a screenshot every 2 s in both engines"] });
