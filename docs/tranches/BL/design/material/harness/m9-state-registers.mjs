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
//   node m9-state-registers.mjs <capdir> [--gate chromium[,webkit]] [--dim-max 0.1] [--bank <dir>]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { cli, loadCapture, gateEngines, report, region, mean3, dE, lch, hex, f, tag, THEMES, SCENE_GROUNDS, PNG } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const REQUIRED = ["active", "hover", "checked", "selected"];
const a = cli({ "dim-max": { type: "string" }, bank: { type: "string" } }), cap = loadCapture(a._[0]), gate = gateEngines(a);
const dimMax = a["dim-max"] != null ? +a["dim-max"] : null;
const depth = [];   // H5-1: { engine, theme, ground, dL, cell, probe }
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.state, scenes: ["state"] });
const t = tally(); t.add(true, false, missing);
const inset = ([x, y, w, h], k) => [x + w * k, y + h * k, w * (1 - 2 * k), h * (1 - 2 * k)];
const inside = ([x, y, w, h], X, Y) => X >= x && X < x + w && Y >= y && Y < y + h;
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
    const ok = dL <= -0.02; t.add(gated, ok); parts.push(`focus veil ${hex(off)} → ${hex(on)} ΔL ${dL >= 0 ? "+" : ""}${f(dL, 3)} (dims ≥ 0.02)${ok ? "" : dL > 0 ? " brightens ✗" : " ✗"}`);
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
report(cap, { id: "M-9", title: `state registers (active, hover, checked and selected fills differ from their surface by ΔE_OK ≥ 0.02; the focus veil dims, both themes; its depth over every ground ${dimMax == null ? "REPORTED" : `gated at |ΔL| ≤ ${dimMax}`})`, lines, ...t, gate });
