#!/usr/bin/env node
// LIT · H5-2 (pass 5): the lighting literals the census cannot see. `pass-4/lighting-census.mjs` (W-0.11 appendix A)
// reads `--shadow-*` tokens only, and W-0.11 G4 pins its exact summary line on the published 10.1.0 tokens, so it is
// not extended: this is a separate witness (REGISTRY P4-5 H5-2). Two arms, both REPORTED (the findings are inherited,
// not added: row 22 stays on the census). `--strict` gates every finding, for the self-test and for a ruled cure.
//   static   every .css file under src and every .vue <style> block (lib.mjs cssRules). Per declaration of box-shadow,
//            text-shadow, filter or -webkit-filter, and per custom property holding shadow layers whose name is not
//            `--shadow-*` (the census's own):
//              HALO     a literal non-inset layer at zero offset with a blur (a glow), e.g. `0 0 8px` (card focus)
//              NEAR     a literal non-inset layer whose offset is under a quarter of its blur, e.g. `0 2px 30px`: a glow
//                       with a token offset, which escapes the census's zero-offset test. `--shadow-*` tokens are read
//                       for NEAR too (the census reads them for HALO and STACKED only)
//              STACKED  two or more blurred non-inset layers in one box-shadow (a var() to a shadow, cast or glow token
//                       counts as one; the cartoon stamp family is exempt, as in the census)
//              CHAIN    two or more drop-shadow() in one filter (Blob.vue's ambient + contact pair)
//   frames   W-0.11 §6's halo leg, read on the captured dock: `dock` in the state scene (paper, c1) and `dock-collapsed`
//            in the held scene (black, white, c1), both themes, every engine captured. Per side (the middle half of
//            each edge), ΔL_OK(full − raw) on the 2 px ring at 4, 8 and 16 px outside the dock's box, less the same
//            side's ring at 32 px (so a uniform overlay, the focus veil's dim, cancels). A HALO row: at some distance
//            the top and bottom both move by ≥ 0.003 the same way and the smaller is ≥ half the larger (a cast falls
//            mostly below; a glow sits on every side)
//   node lighting-literals.mjs [<capdir>] [--root <tree>] [--strict] [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, cssRules, splitTop, varRefs, staticRoot, region, mean3, oklab, f, tag } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli({ root: { type: "string" }, strict: { type: "boolean" } }), strict = !!a.strict, root = staticRoot(a);
const cap = a._[0] ? loadCapture(a._[0]) : null, gate = gateEngines(a);
const t = tally(), lines = [];
// ── static ─────────────────────────────────────────────────────────────────────────────────────────────
const LEN = /^-?(\d*\.)?\d+(px|rem|em)?$/;
const px = (v) => { const n = parseFloat(v); return /rem|em$/.test(v) ? n * 16 : n; };
function layer(l) {
  const parts = splitTop(l.replace(/\s+/g, ",").replace(/,+/g, ",")).filter(Boolean);   // whitespace tokens, parens kept
  const inset = parts.includes("inset"), nums = parts.filter((p) => p !== "inset").filter((p) => LEN.test(p)).slice(0, 4);
  if (/^var\(/.test(l.trim()) && nums.length < 3) return { ref: varRefs(l)[0] || null };
  if (nums.length < 3) return null;
  const [x, y, blur] = nums.map(px);
  return { inset, x, y, blur, text: l.trim() };
}
const counts = { HALO: 0, NEAR: 0, STACKED: 0, CHAIN: 0 };
const find = (kind, where, what) => { counts[kind]++; lines.push(`${kind} ${where} ${what}${strict ? " ✗" : ""}`); if (strict) t.add(true, false); };
if (root) {
  const { files, rules } = cssRules(root);
  let read = 0;
  for (const r of rules) for (const d of r.decls) {
    const where = `${r.file}:${d.line}`, token = d.prop.startsWith("--"), census = d.prop.startsWith("--shadow-");
    if (/^(-webkit-)?filter$/.test(d.prop)) {
      const drops = [...d.value.matchAll(/drop-shadow\(/g)].length;
      if (drops >= 2) find("CHAIN", where, `${r.sels[0]} { ${d.prop}: ${d.value.slice(0, 90)} } (${drops} drop-shadow)`);
      for (const m of d.value.matchAll(/drop-shadow\(((?:[^()]|\([^()]*\))*)\)/g)) {
        const L = layer(m[1]); if (L && !L.ref && L.blur > 0 && L.x === 0 && L.y === 0) find("HALO", where, `drop-shadow(${m[1]})`);
      }
      read++; continue;
    }
    if (!token && !/^(box|text)-shadow$/.test(d.prop)) continue;
    const ls = splitTop(d.value).map((l) => ({ l, L: layer(l) }));
    if (token && !ls.some(({ L }) => L && !L.ref)) continue;   // a custom property with no literal shadow layer
    read++;
    for (const { L } of ls) {
      if (!L || L.ref || L.inset || !(L.blur > 0)) continue;
      if (L.x === 0 && L.y === 0) { if (!census) find("HALO", where, `${r.sels[0] || ""} { ${d.prop}: … ${L.text.slice(0, 60)} }`); }
      else if (Math.max(Math.abs(L.x), Math.abs(L.y)) * 4 < L.blur) find("NEAR", where, `${token ? "" : (r.sels[0] || "") + " "}{ ${d.prop}: … ${L.text.slice(0, 60)} } (offset ${Math.max(Math.abs(L.x), Math.abs(L.y))}px under a quarter of blur ${L.blur}px)`);
    }
    if (!census && d.prop === "box-shadow") {
      const blurred = ls.filter(({ L }) => L && ((L.ref && /shadow|cast|glow/.test(L.ref) && !/^--shadow-cartoon/.test(L.ref)) || (!L.ref && !L.inset && L.blur > 0)));
      if (blurred.length >= 2) find("STACKED", where, `${r.sels[0] || ""} { box-shadow: ${d.value.slice(0, 90)} } (${blurred.length} blurred layers)`);
    }
  }
  lines.push(`static: tree ${root} · ${files} files · ${read} shadow and filter declarations read · LIGHTING-LITERALS halo=${counts.HALO} near=${counts.NEAR} stacked=${counts.STACKED} chain=${counts.CHAIN} open=${counts.HALO + counts.NEAR + counts.STACKED + counts.CHAIN}`);
} else lines.push("static: no tree (pass --root, or a capture whose worktree is on disk): not read");
// ── frames ─────────────────────────────────────────────────────────────────────────────────────────────
const D = [4, 8, 16], FAR = 32, MIN = 0.003;
let frameRows = 0, frameHalo = 0;
if (cap) {
  const sets = [["state", ["paper", "aurora"], "dock"], ["held", ["black", "white", "aurora"], "dock-collapsed"]];
  for (const [scene, grounds, id] of sets) {
    const n = need(cap, gate, { themes: ["light", "dark"], grounds, scenes: [scene] });
    if (strict) t.add(true, false, n.missing); lines.push(...n.lines);
    for (const { cell, gated } of n.have) {
      const s = cell.specs.find((x) => x.id === id);
      if (!s) { if (strict) t.add(gated, false); lines.push(`halo ${tag(cell)}: ${id} not found${strict ? " ✗" : ""}`); continue; }
      const full = cap.img(cell, "full"), raw = cap.img(cell, "raw"), [x, y, w, h] = s.rect;
      const others = cell.specs.filter((o) => o !== s && o.rect).map((o) => o.rect);
      const clear = (X, Y) => !others.some(([ox, oy, ow, oh]) => X >= ox - 2 && X < ox + ow + 2 && Y >= oy - 2 && Y < oy + oh + 2);
      const ring = (side, d) => {
        const pts = [];
        for (let k = 0; k < 2; k++) {
          if (side === "top" || side === "bottom") { const Y = Math.round(side === "top" ? y - d - 1 - k : y + h + d + k); for (let X = Math.round(x + w / 4); X < Math.round(x + (3 * w) / 4); X++) pts.push([X, Y]); }
          else { const X = Math.round(side === "left" ? x - d - 1 - k : x + w + d + k); for (let Y = Math.round(y + h / 4); Y < Math.round(y + (3 * h) / 4); Y++) pts.push([X, Y]); }
        }
        const ok = pts.filter(([X, Y]) => X >= 0 && Y >= 0 && X < full.width && Y < full.height && clear(X, Y));
        if (ok.length < 4) return null;
        const L = (png) => oklab(mean3(ok.map(([X, Y]) => region(png, [X, Y, 1, 1])[0])))[0];
        return L(full) - L(raw);
      };
      const read = {};
      for (const side of ["top", "bottom", "left", "right"]) { const far = ring(side, FAR); read[side] = D.map((d) => { const v = ring(side, d); return v == null || far == null ? null : v - far; }); }
      let halo = false;
      D.forEach((_, i) => { const tp = read.top[i], bt = read.bottom[i]; if (tp == null || bt == null) return; if (Math.sign(tp) === Math.sign(bt) && Math.min(Math.abs(tp), Math.abs(bt)) >= MIN && Math.min(Math.abs(tp), Math.abs(bt)) >= 0.5 * Math.max(Math.abs(tp), Math.abs(bt))) halo = true; });
      frameRows++; if (halo) frameHalo++;
      if (strict) t.add(gated, !halo);
      const fmt = (v) => v.map((z) => (z == null ? "—" : (z >= 0 ? "+" : "") + f(z, 4))).join("/");
      lines.push(`halo ${tag(cell)} ${id}${gated ? "" : " [info]"}: ΔL at ${D.join("/")} px less ${FAR} px · top ${fmt(read.top)} · bottom ${fmt(read.bottom)} · left ${fmt(read.left)} · right ${fmt(read.right)} · ${halo ? "HALO (top and bottom move alike)" : "no symmetric halo"}${halo && strict ? " ✗" : ""}`);
    }
  }
  lines.push(`frames: ${frameHalo} of ${frameRows} dock rings read a symmetric halo`);
}
const summary = `LIGHTING-LITERALS halo=${counts.HALO} near=${counts.NEAR} stacked=${counts.STACKED} chain=${counts.CHAIN} open=${counts.HALO + counts.NEAR + counts.STACKED + counts.CHAIN} frames-halo=${frameHalo}/${frameRows}`;
lines.push(summary);
if (!strict) { lines.push(`REPORTED (inherited findings, not a gate; --strict gates them)`); t.gateRows = 1; t.gateFails = 0; }
else if (!t.gateRows) { t.gateRows = 1; t.gateFails = 0; }   // --strict with nothing found: one clean row
const title = `lighting literals (static: halo, near-halo, stacked and chained shadows outside the --shadow-* census; frames: the dock's luma ring at 4, 8, 16 px)${strict ? "; gated (--strict)" : "; REPORTED"}`;
if (cap) report(cap, { id: "LIT", title, lines, ...t, gate });
else { console.log(`LIT · ${title}`); for (const l of lines) console.log("  " + l); const pass = !t.gateFails; console.log(pass ? `PASS (${t.gateRows} gated rows)` : `FAIL (${t.gateFails} of ${t.gateRows} gated rows)`); process.exitCode = pass ? 0 : 1; }
