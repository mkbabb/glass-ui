#!/usr/bin/env node
// M-9 · State registers (H-6). A painted state fill must read as a state, and the focus veil must dim.
//   Fills: in the state scene (a resting plate carrying a checked Checkbox and a SegmentedTabs whose selected
//   indicator is [data-fill="selected"]; a dock with its active tab [data-fill="active"] and a hovered inactive tab
//   [data-fill="hover"], the capture's pointer resting on it), over paper and the c1 aurora, both themes: the mean
//   noink colour inside each fill (inset 25% per side, text and icons removed) differs from the surface right around
//   it (the ring 3-6 px outside the fill, inside its surface, outside every other fill) by ΔE_OK ≥ 0.02. A fill that
//   is not painted or not found is a FAIL row. This catches a plate-as-fill reader under a --card pole, which turns
//   a pill into a same-hue no-op (PF-9).
//   Veil (signed, both themes; H3-4 adds dark): an engaged .glass-focus-veil centred on an empty page region
//   ([data-veil-probe]): OKLab L inside the probe with the veil (full) is at least 0.02 below the same pixels without it
//   (raw); a veil that brightens is a FAIL. Pass 2 read the dark veil over paper at ΔL +0.006 (Chromium): it did not dim
//   and nothing reddened.
//   H5-1 (pass 5): the upper bound, REPORTED. The veil's depth is read over every ground of the state scene (paper and
//   the c1 aurora) and laid beside the depth on the page, the ground the dim is solved on: "veil depth … (k× the
//   page's)". Not gated: a gate needs a bound the owner has not given (REGISTRY P4-5 H5-1). `--dim-max <ΔL>` gates
//   |ΔL| ≤ that bound on every veil row, for the self-test and for the day the owner rules one. `--bank <dir>` writes
//   the cited frames: each state cell's `full` capture over a ground that is not paper, and one pair PNG per such cell
//   (raw | full, 240 × 160 around the probe, 2×), with each file's sha256 in the log.
//   H12-1 (pass 12, REGISTRY P11-5, R-32): the veil's colour, printed and gated on the dark arm's own words. Every veil
//   row also prints OKLCH L, C and h of the raw and the veiled probe (the mean colour under it), every theme and ground.
//   R-32 reads the DARK arm on two grounds per engine: the aurora focus spot (the state scene's c1 ground, frame 1's
//   ground) and the dark page (its paper ground). Under `--r32` it gates (i) hue held, |Δh| ≤ 3° on the spot; (ii) chroma
//   kept, C_veiled ≥ 0.95 × C_raw on the spot; (iii) it dims, ΔL < 0 on the spot and on the page. A dark spot or page
//   cell that was not read is a FAIL row under `--r32` (E-2). The spot's and the page's ΔL print beside R-2's −0.225
//   and are never gated: "quieter, not brown" is the owner's eye (R-32). Hue and chroma are not read on the page: at
//   C ≈ 0.003 its hue is noise (one 8-bit step moves it by tens of degrees). Without `--r32` the rows print REPORTED.
//   The light arm is printed, not read by R-32 (Q-14's light arm stands, O-103a).
//   H13-1 (pass 13, R-38): R-32 (iii) reads ΔL rounded to 3 decimals, as printed, before the sign. A spot or page that
//   prints −0.000 is not dimmed and FAILs (iii). No threshold is added: M-9's ≤ −0.02 stays row 12's.
//   H13-4 (pass 13, R-37, O-103b): the Playwright WebKit dark-veil legs (M-9's dims rows and R-32 (iii), dark spot and
//   dark page) are REPORTS only while the same capture shows that engine painting no veil: every probe pixel of `full`
//   equals `raw`, to the bit, on the dark spot AND the dark page. One veiled ≠ raw pixel on either, or a spot or page not
//   read, and every one of those legs is a gate again (O-103b's last clause) and a red counts. Chromium is never
//   reported this way. The `R-37` line prints the engine fact and the legs it reports.
//   node m9-state-registers.mjs <capdir> [--gate chromium[,webkit]] [--dim-max 0.1] [--bank <dir>] [--r32]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { cli, loadCapture, gateEngines, report, region, mean3, dE, lch, hex, f, tag, hueDiff, THEMES, SCENE_GROUNDS, PNG } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const REQUIRED = ["active", "hover", "checked", "selected"];
const a = cli({ "dim-max": { type: "string" }, bank: { type: "string" }, r32: { type: "boolean" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const dimMax = a["dim-max"] != null ? +a["dim-max"] : null;
const depth = [];   // H5-1: { engine, theme, ground, dL, cell, probe }
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.state, scenes: ["state"] });
const t = tally(); t.add(true, false, missing);
const inset = ([x, y, w, h], k) => [x + w * k, y + h * k, w * (1 - 2 * k), h * (1 - 2 * k)];
const inside = ([x, y, w, h], X, Y) => X >= x && X < x + w && Y >= y && Y < y + h;
// H13-4 (R-37): the engine fact, per Playwright WebKit engine in the capture, read before any veil leg is tallied.
const bits = (cell) => { let n = 0, d = 0; const raw = cap.img(cell, "raw"), ful = cap.img(cell, "full");
  for (const p of cell.veil || []) { const r = region(raw, p), v = region(ful, p); n += r.length; for (let i = 0; i < r.length; i++) if (r[i].some((x, k) => x !== v[i][k])) d++; }
  return { n, d }; };
const fact = {};
for (const engine of new Set(have.map((h) => h.cell.engine))) if (engine === "webkit") {
  const at = (ground) => have.find((h) => h.cell.engine === engine && h.cell.theme === "dark" && h.cell.ground === ground)?.cell;
  const spot = at("aurora") && bits(at("aurora")), page = at("paper") && bits(at("paper"));
  fact[engine] = { spot, page, ok: !!(spot && page && spot.n && page.n && !spot.d && !page.d), legs: 0 };
}
const reported = (cell) => cell.theme === "dark" && (cell.ground === "aurora" || cell.ground === "paper") && !!fact[cell.engine]?.ok;
const r3 = (dL) => +f(dL, 3);   // H13-1 (R-38): the printed 3-decimal value; −0.000 reads as −0, which is not < 0
for (const { cell, gated } of have) {
  const noink = cap.img(cell, "noink"), parts = [];
  const fills = cell.specs.flatMap((s) => s.fills.map((fl) => ({ ...fl, spec: s })));
  for (const id of REQUIRED) {
    const fl = fills.find((x) => x.id === id);
    if (!fl) { t.add(gated, false); parts.push(`${id} not found ✗`); continue; }
    const fill = mean3(region(noink, inset(fl.rect, 0.25)));
    const [x, y, w, h] = fl.rect, ring = [];
    for (let Y = Math.round(y - 6); Y <= Math.round(y + h + 6); Y++) for (let X = Math.round(x - 6); X <= Math.round(x + w + 6); X++) {
      const dx = Math.max(x - X, X - (x + w), 0), dy = Math.max(y - Y, Y - (y + h), 0), d = Math.max(dx, dy);
      if (d < 3 || d > 6 || !inside(fl.spec.rect, X, Y) || fills.some((o) => o !== fl && inside(o.rect, X, Y))) continue;
      ring.push(region(noink, [X, Y, 1, 1])[0]);
    }
    if (!ring.length) { t.add(gated, false); parts.push(`${id} has no surface around it ✗`); continue; }
    const around = mean3(ring), d = dE(fill, around), ok = d >= 0.02;
    t.add(gated, ok);
    parts.push(`${id} ${hex(fill)} on ${hex(around)} ΔE ${f(d, 3)}${ok ? "" : " ✗"}`);
  }
  for (const probe of cell.veil || []) {
    const on = mean3(region(cap.img(cell, "full"), probe)), off = mean3(region(cap.img(cell, "raw"), probe));
    const dL = lch(on)[0] - lch(off)[0];
    const ok = dL <= -0.02, rep = reported(cell);
    if (rep) fact[cell.engine].legs++; else t.add(gated, ok);
    parts.push(`focus veil ${hex(off)} → ${hex(on)} ΔL ${dL >= 0 ? "+" : ""}${f(dL, 3)} (dims ≥ 0.02)${rep ? " · REPORT (R-37)" : ok ? "" : dL > 0 ? " brightens ✗" : " ✗"}`);
    depth.push({ engine: cell.engine, theme: cell.theme, ground: cell.ground, dL, off, on, cell, probe, gated });
  }
  if (!(cell.veil || []).length) { t.add(gated, false); parts.push("focus veil probe not found ✗"); }
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
// H5-1: the upper bound. Each veil's depth beside the page's depth in the same engine and theme; REPORTED unless --dim-max.
for (const d of depth) {
  const page = depth.find((x) => x.engine === d.engine && x.theme === d.theme && x.ground === "paper");
  const k = page && page.dL < 0 ? d.dL / page.dL : null;
  const over = dimMax != null && -d.dL > dimMax;
  if (dimMax != null) t.add(d.gated, !over);
  lines.push(`veil depth ${tag(d.cell)}${d.gated ? "" : " [info]"}: ${hex(d.off)} → ${hex(d.on)} ΔL ${f(d.dL, 3)}${d.ground === "paper" ? " (the page: the ground the dim is solved on)" : k != null ? ` (${f(k, 1)}× the page's ${f(page.dL, 3)})` : ""} · ${dimMax == null ? "REPORTED (no owner bound)" : `bound |ΔL| ≤ ${dimMax}${over ? " ✗" : ""}`}`);
}
// H12-1: OKLCH raw → veiled for every veil, then R-32 on the dark arm's spot and page, per engine.
const ok3 = (c) => { const [L, C, h] = lch(c); return `L ${f(L, 3)} C ${f(C, 3)} h ${f(h, 1)}°`; };
for (const d of depth) lines.push(`oklch ${tag(d.cell)}${d.gated ? "" : " [info]"}: raw ${hex(d.off)} ${ok3(d.off)} → veiled ${hex(d.on)} ${ok3(d.on)}`);
const R2_SPOT_DL = -0.225;   // R-2's ΔL on the spot, the record's reference (REGISTRY P11-0 finding 4, P11-2.2 R-32)
const R32_DH = 3, R32_C = 0.95;
const r32 = !!a.r32, how = (gated) => (!r32 ? " · REPORTED (gated under --r32)" : gated ? "" : " [info]");
for (const engine of [...new Set([...gate, ...depth.map((d) => d.engine)])]) {
  const gated = gate.includes(engine);
  const spot = depth.find((d) => d.engine === engine && d.theme === "dark" && d.ground === "aurora");
  const page = depth.find((d) => d.engine === engine && d.theme === "dark" && d.ground === "paper");
  for (const [what, d] of [["spot (the aurora focus spot, frame 1's ground)", spot], ["page (the dark page)", page]]) {
    if (d) continue;
    if (r32) t.add(gated, false);
    lines.push(`R-32 ${engine} dark ${what}: not read${r32 ? " ✗" : ""}${how(gated)}`);
  }
  if (spot) {
    const [Lr, Cr, hr] = lch(spot.off), [Lv, Cv, hv] = lch(spot.on);
    const dh = hueDiff(hr, hv), k = Cr > 0 ? Cv / Cr : null, dL = Lv - Lr;
    const g1 = dh <= R32_DH, g2 = k != null && k >= R32_C, g3 = r3(dL) < 0, rep = reported(spot.cell);
    if (r32) { t.add(spot.gated, g1); t.add(spot.gated, g2); if (rep) fact[engine].legs++; else t.add(spot.gated, g3); }
    const x = (ok) => (r32 && !ok ? " ✗" : "");
    lines.push(`R-32 ${tag(spot.cell)} (the spot)${how(spot.gated)}: raw ${ok3(spot.off)} → veiled ${ok3(spot.on)} · (i) hue held |Δh| ${f(dh, 1)}° ≤ ${R32_DH}°${x(g1)} · (ii) chroma kept C ${f(Cv, 3)}/${f(Cr, 3)} = ${f(k, 3)} × raw ≥ ${R32_C}${x(g2)} · (iii) dims ΔL ${f(dL, 3)} < 0${r32 && rep ? " · REPORT (R-37)" : x(g3)}`);
  }
  if (page) {
    const dL = lch(page.on)[0] - lch(page.off)[0], g3 = r3(dL) < 0, rep = reported(page.cell);
    if (r32) { if (rep) fact[engine].legs++; else t.add(page.gated, g3); }
    lines.push(`R-32 ${tag(page.cell)} (the page)${how(page.gated)}: raw ${ok3(page.off)} → veiled ${ok3(page.on)} · (iii) dims ΔL ${f(dL, 3)} < 0${r32 && rep ? " · REPORT (R-37)" : r32 && !g3 ? " ✗" : ""} (hue and chroma not read: the page is near-neutral)`);
  }
  if (spot || page) {
    const dl = (d) => (d ? f(lch(d.on)[0] - lch(d.off)[0], 3) : "—");
    lines.push(`R-32 ${engine} dark ΔL, reported, never gated: spot ${dl(spot)} · page ${dl(page)} · beside R-2's spot ${R2_SPOT_DL} (the owner's eye decides "quieter, not brown")${gated ? "" : " [info]"}`);
  }
}
// H13-4 (R-37): the engine fact as read, and what it did to the dark-veil legs.
for (const [engine, x] of Object.entries(fact)) {
  const side = (what, b) => (!b ? `${what} not read` : `${what} ${b.n - b.d}/${b.n} px raw = veiled`);
  lines.push(x.ok
    ? `R-37 ${engine} dark veil: raw = veiled to the bit, ${side("spot", x.spot)}, ${side("page", x.page)} → REPORT (O-103b): "WebKit headless paints no backdrop-filter; raw = veiled ${x.legs}/${x.legs}" (Chromium gates the arm)`
    : `R-37 ${engine} dark veil: ${side("spot", x.spot)}${x.spot?.d ? ` (${x.spot.d} px veiled ≠ raw)` : ""}, ${side("page", x.page)}${x.page?.d ? ` (${x.page.d} px veiled ≠ raw)` : ""} → GATE: the engine fact does not hold in this capture, so every dark-veil leg is gated and a red counts (O-103b's last clause)`);
}
if (a.bank) {
  const dir = path.resolve(a.bank); fs.mkdirSync(dir, { recursive: true });
  const sha = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  for (const d of depth.filter((x) => x.ground !== "paper")) {
    const name = `${d.engine}-${d.theme}-${d.ground}-state`, full = path.join(cap.capdir, d.cell.files.full), raw = cap.img(d.cell, "raw"), fu = cap.img(d.cell, "full");
    const fout = path.join(dir, `${name}-full.png`); fs.copyFileSync(full, fout);
    const [px, py, pw, ph] = d.probe, cx = Math.round(px + pw / 2 - 120), cy = Math.round(py + ph / 2 - 80), S = 2, W = 240, Hh = 160;
    const pair = new PNG({ width: 2 * W * S + 8, height: Hh * S });
    pair.data.fill(255);
    for (const [k, src] of [[0, raw], [1, fu]]) for (let y = 0; y < Hh * S; y++) for (let x = 0; x < W * S; x++) {
      const X = Math.max(0, Math.min(src.width - 1, cx + Math.floor(x / S))), Yy = Math.max(0, Math.min(src.height - 1, cy + Math.floor(y / S)));
      const i = (src.width * Yy + X) * 4, o = (pair.width * y + x + k * (W * S + 8)) * 4;
      pair.data[o] = src.data[i]; pair.data[o + 1] = src.data[i + 1]; pair.data[o + 2] = src.data[i + 2]; pair.data[o + 3] = 255;
    }
    const pout = path.join(dir, `${name}-veil-raw-vs-full.png`); fs.writeFileSync(pout, PNG.sync.write(pair));
    lines.push(`banked ${path.basename(fout)} sha256 ${sha(fout)} · ${path.basename(pout)} sha256 ${sha(pout)} (raw | full, crop ${cx},${cy} 240×160, probe ${d.probe.map(Math.round).join(",")})`);
  }
}
report(cap, { id: "M-9", title: `state registers (active, hover, checked and selected fills differ from their surface by ΔE_OK ≥ 0.02; the focus veil dims, both themes; its depth over every ground ${dimMax == null ? "REPORTED" : `gated at |ΔL| ≤ ${dimMax}`}; R-32 on the dark spot and page ${r32 ? "gated" : "REPORTED"})`, lines, ...t, gate });
