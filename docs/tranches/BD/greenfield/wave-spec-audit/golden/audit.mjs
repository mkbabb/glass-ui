#!/usr/bin/env node
// wave-spec-audit GOLDEN spike — the corpus-as-graph linter.
// Treats the 116 union waves + the greenfield WAVE-AMENDMENTs as a build-DAG + a precept matrix.
// Deterministic, re-runnable, default-RED. Convergence = `2-consecutive-clean` from THIS script,
// not a fleet of readers (the structural twin of the paint-arm chroma gate).
//
// Usage:  node audit.mjs            # full report, exit 1 if any lint fires
//         node audit.mjs --json     # machine artefacts to stdout
//
// NO new runtime dep — pure node + the corpus on disk.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BD = join(HERE, "..", "..", ".."); // .../docs/tranches/BD
const UNION = join(BD, "union", "waves");
const WAVES = join(BD, "waves");
const GF = join(BD, "greenfield");

const RED = "\x1b[31m", GRN = "\x1b[32m", AMB = "\x1b[33m", DIM = "\x1b[2m", RST = "\x1b[0m";

// ---- corpus load -----------------------------------------------------------
const onDisk = new Set();
const diskScope = {}; // slug -> 'union' | 'waves'
for (const [dir, scope] of [[UNION, "union"], [WAVES, "waves"]]) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const slug = f.replace(/\.md$/, "");
    onDisk.add(slug);
    diskScope[slug] = scope;
  }
}

const amendments = [];
if (existsSync(GF)) {
  for (const d of readdirSync(GF)) {
    const p = join(GF, d, "WAVE-AMENDMENT.md");
    if (existsSync(p)) amendments.push({ item: d, path: p, text: readFileSync(p, "utf8") });
  }
}

// de-wrap line-broken slugs before tokenizing (lens-b 2d: `BD.W-\n FOO` is one node)
const dewrap = (t) => t.replace(/\n\s+/g, " ");

// a slug is authored/minted by an amendment if it appears after a NEW/MINT/AUTHOR/CO-MINT verb
const MINT_RE = /\b(?:NEW|MINT|AUTHORS?|CO-MINT)\b[^\n]*?\b(BD\.W-[A-Z0-9-]+|W-[A-Z0-9-]+)/g;
const REF_RE = /\b(BD\.W-[A-Z0-9-]+|W-[A-Z0-9-]+)\b/g;
const CROSS_RE = /\b(B[CE]\.W-[A-Z0-9-]+)\b/g; // valid cross-tranche refs (whitelisted)

const authoredBy = {}; // slug -> [items]
const citedBy = {}; // slug -> Set(items)
const crossTranche = new Set();

for (const a of amendments) {
  const t = dewrap(a.text);
  for (const m of t.matchAll(MINT_RE)) {
    const s = m[1];
    (authoredBy[s] ??= []).push(a.item);
  }
  for (const m of t.matchAll(REF_RE)) {
    (citedBy[m[1]] ??= new Set()).add(a.item);
  }
  for (const m of t.matchAll(CROSS_RE)) crossTranche.add(m[1]);
}

// known declined / NON-NODE slugs (recorded so the walk doesn't re-flag them) — lens-b 2c
const NON_NODE = new Set(["BD.W-MOTION-WEIGHT-CANON"]);

// truncation/wrap false-positives that survive (defensive) — lens-b 2d
const TRUNC = new Set([
  "BD.W-BLOB-", "BD.W-PAGE-", "BD.W-FIELD-AURORA-", "BD.W-WAVE-FIELD-",
]);

// ---- PASS 1 — the slug graph + 5 lints ------------------------------------
const cited = new Set(Object.keys(citedBy));
const lints = { phantom: [], dupMint: [], danglingPrefix: [], scopeBleed: [], nonNodeCited: [] };

for (const s of cited) {
  if (NON_NODE.has(s)) { lints.nonNodeCited.push(s); continue; }
  if (TRUNC.has(s)) continue;
  if (s.endsWith("-")) continue; // wrap artefact

  const minted = authoredBy[s]?.length > 0;
  const disk = onDisk.has(s);

  // phantom: DEPENDED ∧ ¬authored ∧ ¬onDisk
  if (!minted && !disk) lints.phantom.push(s);

  // scope-bleed: cited but the only on-disk copy is in BD/waves/ not union/waves/
  if (disk && diskScope[s] === "waves") lints.scopeBleed.push(s);
}

// dup-mint: a slug authored/co-minted by >1 amendment AND not flagged as a MERGE in either body.
for (const [s, items] of Object.entries(authoredBy)) {
  const uniq = [...new Set(items)];
  if (uniq.length < 2) continue;
  const merged = uniq.some((it) => {
    const a = amendments.find((x) => x.item === it);
    return a && /\bMERGE\b/.test(a.text) && a.text.includes(s);
  });
  if (!merged) lints.dupMint.push({ slug: s, items: uniq });
}

// prefix-straddle: a `BD.W-X` cited whose disk reality is `W-X` (or vice versa) — lens-a/b FLAG-1
for (const s of cited) {
  if (onDisk.has(s)) continue;
  const alt = s.startsWith("BD.") ? s.slice(3) : "BD." + s;
  if (onDisk.has(alt)) lints.danglingPrefix.push({ cited: s, onDisk: alt });
}

// ---- PASS 2 — the 7-axis precept matrix (consistency gate) -----------------
// GREEN = item cites the ONE canonical source token for the axis where the precept applies.
const AXES = {
  GLASS: /\.glass-capsule|--glass-(?:bg-floor|tint|key)|warm.?floor/i,
  PAPER: /paper-field|--paper-grain|--field-h|paper.?morph/i,
  AURORA: /aurora|--field-h|sectionHue|warmFieldHue|§3|vivid/i,
  RADII: /--radius-concentric|√φ|concentric|sqrt.?phi/i,
  CARTOON: /\.cartoon-cast|--shadow-cartoon|cel-ink|inert.?child/i,
  MOTION: /--motion-weight|--ease-cartoon-punch|liquid.?weight/i,
  REGISTER: /DEPEND|CONSUME|sibling|re-?use|no.?(?:re-?)?fork|no.?(?:re-?)?mint/i,
};
const matrix = [];
let green = 0, total = 0;
for (const a of amendments) {
  const row = { item: a.item };
  for (const [axis, re] of Object.entries(AXES)) {
    const hit = re.test(a.text);
    row[axis] = hit ? "G" : "—";
    total++;
    if (hit) green++;
  }
  matrix.push(row);
}

// ---- PASS 3 — the cross-engine forbidden-literal floor ---------------------
// flags WebKit/perf traps that ride invisibly through amendments (lens-b pass 3).
const FORBIDDEN = [
  { name: "ungated backdrop url()", re: /backdrop-filter:\s*url\(#/i, guard: /@supports/i },
  { name: "naive raw -58deg leak", re: /linear-gradient\(\s*-58deg/i },
  { name: "animated box-shadow", re: /animation:[^;]*box-shadow|box-shadow[^;]*\d+ms/i },
];
const xengine = [];
for (const a of amendments) {
  for (const f of FORBIDDEN) {
    if (f.re.test(a.text) && (!f.guard || !f.guard.test(a.text))) {
      xengine.push({ item: a.item, hit: f.name });
    }
  }
  // every motion/goo/glass-refract amendment should name a §L7 / Safari / @supports arm
  const isEngine = /goo|morph|glass|refract|aurora|filter|blur/i.test(a.text);
  const hasArm = /§L7|Safari|WebKit|@supports|sRGB|prefers-reduced/i.test(a.text);
  if (isEngine && !hasArm) xengine.push({ item: a.item, hit: "engine amendment missing §L7 arm" });
}

// ---- BORN-RED foundation gate (the load-bearing precondition) ---------------
// the whole Band-0 foundation must be UNBUILT in src/ at spec time (tranche-DEV truth).
// This gate is RED while the foundation is unbuilt — it is the build-DAG's tier-0 truth.
const SRC = join(BD, "..", "..", "..", "src");
const foundationTokens = ["glass-capsule", "paper-field", "motion-weight", "ease-cartoon-punch"];
const grepSrc = (needle) => {
  if (!existsSync(SRC)) return 0;
  let n = 0;
  const walk = (d) => {
    for (const f of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.(ts|css|vue|js)$/.test(f.name) && readFileSync(p, "utf8").includes(needle)) n++;
    }
  };
  try { walk(SRC); } catch {}
  return n;
};
const foundation = Object.fromEntries(foundationTokens.map((t) => [t, grepSrc(t)]));

// ---- REPORT ----------------------------------------------------------------
const lintTotal =
  lints.phantom.length + lints.dupMint.length + lints.danglingPrefix.length +
  lints.scopeBleed.length + xengine.length;

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({
    corpus: { onDisk: onDisk.size, amendments: amendments.length },
    lints, matrix, xengine, foundation,
    convergence: { precept: +(green / total).toFixed(3), lints: lintTotal },
  }, null, 2));
  process.exit(lintTotal ? 1 : 0);
}

const hdr = (s) => console.log(`\n${s}\n${"─".repeat(s.length)}`);
console.log(`wave-spec-audit GOLDEN linter — corpus: ${onDisk.size} on-disk waves, ${amendments.length} amendments`);

hdr("PASS 1 — slug graph");
const r1 = (label, arr, fmt = (x) => x) =>
  console.log(`  ${arr.length ? RED + "RED " : GRN + "ok  "}${RST}${label}: ${arr.length}` +
    (arr.length ? `  ${DIM}${arr.slice(0, 6).map(fmt).join(", ")}${arr.length > 6 ? " …" : ""}${RST}` : ""));
r1("phantom (cited ∧ ¬authored ∧ ¬disk)", lints.phantom);
r1("dup-mint (≥2 authors, no MERGE)", lints.dupMint, (x) => x.slug);
r1("prefix-straddle (BD.W- ↔ W-)", lints.danglingPrefix, (x) => `${x.cited}→${x.onDisk}`);
r1("scope-bleed (only in BD/waves/)", lints.scopeBleed);
console.log(`  ${DIM}NON-NODE (declined, recorded): ${[...NON_NODE].join(", ") || "none"}${RST}`);
console.log(`  ${DIM}cross-tranche refs whitelisted: ${crossTranche.size}${RST}`);

hdr("PASS 2 — precept matrix (consistency gate)");
console.log("  item".padEnd(34) + Object.keys(AXES).join(" "));
for (const r of matrix) {
  console.log("  " + r.item.padEnd(32) + Object.keys(AXES).map((a) => ` ${r[a] === "G" ? GRN + "G" + RST : DIM + "—" + RST} `).join(""));
}
console.log(`  ${DIM}green-cells ${green}/${total} = ${(100 * green / total).toFixed(0)}% (axes are applicability-sparse; RED only where a precept is OWED)${RST}`);

hdr("PASS 3 — cross-engine forbidden-literal floor");
r1("forbidden-literal / missing §L7 arm", xengine, (x) => `${x.item}:${x.hit}`);

hdr("BORN-RED foundation gate (tier-0 truth)");
for (const [t, n] of Object.entries(foundation)) {
  console.log(`  ${n === 0 ? RED + "RED " : GRN + "BUILT" }${RST} src/ hits for ${t}: ${n} ${n === 0 ? DIM + "(unbuilt — spec-only, correct for tranche-DEV)" + RST : ""}`);
}

hdr("VERDICT");
console.log(`  structural lints firing: ${lintTotal ? RED + lintTotal + RST : GRN + "0 — CLEAN" + RST}`);
console.log(`  → run twice clean (2-consecutive) = the consolidation is converged.`);
process.exit(lintTotal ? 1 : 0);
