#!/usr/bin/env node
// historical-recap GOLDEN spike — the PROMPT-corpus-as-build-graph oracle.
// The prompt-corpus twin of wave-spec-audit/golden/audit.mjs: it models the WHOLE
// de-duplicated user-ask corpus (recap.manifest.json) as a coverage graph and RE-DERIVES
// each row's coverState FROM DISK, overwriting the typed hint. A row claiming `addressed`
// whose carriers are absent on disk auto-downgrades to GAP and the script exits 1.
// Default-RED, recency-weighted, re-runnable. Convergence = a COMPUTED fraction, never a
// judge's word — the documentation analogue of the paint-arm chroma π.
//
// Usage:  node recap.mjs            # full report, exit 1 if any GAP or false-green survives
//         node recap.mjs --json     # machine artefact to stdout
//         node recap.mjs --emit     # ALSO write ../HISTORICAL-RECAP.md (the rendered human view)
//
// NO new runtime dep — pure node + the corpus on disk.

import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));            // .../historical-recap/golden
const RECAP_DIR = join(HERE, "..");                              // .../historical-recap
const BD = join(HERE, "..", "..", "..");                        // .../docs/tranches/BD
const GF = join(BD, "greenfield");
const REFINE = join(BD, "viz", "refine");
const UNION = join(BD, "union", "waves");
const WAVES = join(BD, "waves");

const RED = "\x1b[31m", GRN = "\x1b[32m", AMB = "\x1b[33m", DIM = "\x1b[2m", RST = "\x1b[0m";

// ---- corpus load -----------------------------------------------------------
const manifest = JSON.parse(readFileSync(join(HERE, "recap.manifest.json"), "utf8"));
const rows = manifest.rows;
const bands = manifest.recencyBands;

// disk reality (carrier existence) ------------------------------------------
const dirSet = (root) => existsSync(root)
  ? new Set(readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name))
  : new Set();
const waveSet = () => {
  const s = new Set();
  for (const root of [UNION, WAVES]) {
    if (!existsSync(root)) continue;
    for (const f of readdirSync(root)) if (f.endsWith(".md")) s.add(f.replace(/\.md$/, ""));
  }
  return s;
};

const onDisk = {
  greenfield: dirSet(GF),
  refine: dirSet(REFINE),
  wave: waveSet(),
  foldLedger: existsSync(join(BD, "FOLD-LEDGER.md")) ? new Set(["FOLD-LEDGER"]) : new Set(),
};

// a greenfield dir only counts as a REAL carrier if it has converged to delta (DELTA-ASSAY.md).
// (a bare brainstorm dir is NOT proof — the documentation form of "born-RED on absent proof".)
const greenfieldConverged = new Set(
  [...onDisk.greenfield].filter((d) => existsSync(join(GF, d, "DELTA-ASSAY.md")))
);

// stale-prune residue: a wave file that lives on disk but was PRUNED/EXCISED/SUPERSEDED by an
// amendment. Citing it as a live carrier is a false-green (the W-BLURRED-IMAGE-BG / W-DOCK-HUB-API
// trap). Detect the SUBJECT slug of a disposition — the FIRST slug on the line after the verb,
// NOT a later "folded into NEW <successor>" fold-target (which is a live mint, never pruned).
const prunedSlugs = new Set();
// amendment-authored slugs: a wave NAMED + MINTED inside a WAVE-AMENDMENT.md body (verb NEW/MINT/
// AUTHOR/CO-MINT). These are REAL carriers spec'd in a converged amendment but whose wave FILE is
// not yet materialized — the union with audit.mjs's `authoredBy` + its §7 materialization gap. A
// cited slug that is authoredBy an amendment is a LIVE-but-unmaterialized carrier (state: authored),
// distinct from a phantom (cited ∧ ¬authored ∧ ¬disk = a genuine typo/dangling ref).
const authoredSlugs = new Set();
if (existsSync(GF)) {
  for (const d of readdirSync(GF)) {
    const p = join(GF, d, "WAVE-AMENDMENT.md");
    if (!existsSync(p)) continue;
    const raw = readFileSync(p, "utf8");
    for (const m of raw.replace(/\n\s+/g, " ").matchAll(/\b(?:NEW|MINT|AUTHORS?|CO-MINT)\b[^\n]*?\b(BD\.W-[A-Z0-9-]+|W-[A-Z0-9-]+)/g)) {
      authoredSlugs.add(m[1]);
    }
    for (const line of raw.split("\n")) {
      const m = /\b(?:PRUNE|EXCISE|SUPERSEDE)\b[^\n]*?\b(BD\.W-[A-Z0-9-]+|W-[A-Z0-9-]+)/.exec(line);
      if (!m) continue;
      // ignore the fold-target: a slug introduced by "into/→ NEW <slug>" later on the same line.
      const subj = m[1];
      const foldTarget = /(?:into|→|folded into)\s+(?:NEW\s+)?`?(BD\.W-[A-Z0-9-]+|W-[A-Z0-9-]+)/.exec(line);
      if (foldTarget && foldTarget[1] === subj) continue; // the verb's object is the successor, skip
      prunedSlugs.add(subj);
    }
  }
}

// ---- the JOIN — re-derive coverState from disk -----------------------------
// each carrier resolves to one of: LIVE (a converged greenfield / refine dir / materialized wave /
// fold-ledger), AUTHORED (a wave spec'd+minted in a converged amendment but not yet a file — a real
// carrier, materialization OWED, the union with audit.mjs §7), STALE (a pruned wave still on disk —
// false-green), or PHANTOM (cited ∧ ¬disk ∧ ¬authored — a typo/dangling ref, the hard fail).
const carrierState = (kind, name) => {
  if (kind === "greenfield") return greenfieldConverged.has(name) ? "live"
    : (onDisk.greenfield.has(name) ? "authored" : "phantom"); // dir exists but no DELTA = authored
  if (kind === "refine") return onDisk.refine.has(name) ? "live" : "phantom";
  if (kind === "foldLedger") return onDisk.foldLedger.has(name) ? "live" : "phantom";
  if (kind === "wave") {
    if (prunedSlugs.has(name) && onDisk.wave.has(name)) return "stale";
    if (onDisk.wave.has(name)) return "live";
    if (authoredSlugs.has(name)) return "authored"; // spec'd in an amendment, file un-materialized
    if (/^B[BCEF]\.W-/.test(name)) return "live";    // cross-tranche prior-art wave (whitelisted, like audit.mjs CROSS_RE)
    return "phantom";
  }
  return "phantom";
};

const findings = [];   // per-row { row, live, authored, missing(phantom), staleCited, derived }
for (const r of rows) {
  const covers = r.covers || {};
  const live = [], authored = [], missing = [], staleCited = [];
  for (const [kind, names] of Object.entries(covers)) {
    for (const name of names) {
      const st = carrierState(kind, name);
      const tag = `${kind}:${name}`;
      if (st === "live") live.push(tag);
      else if (st === "authored") authored.push(tag);
      else if (st === "stale") staleCited.push(tag);
      else missing.push(tag); // phantom
    }
  }
  const hasCarrier = Object.keys(covers).length > 0;
  // DERIVE (strict, disk-true):
  //   gap      = no carrier at all, OR zero live/authored carrier.
  //   deferred = legal terminal (held wave) with ≥1 live/authored carrier.
  //   addressed= ≥1 LIVE carrier ∧ no phantom ∧ all wave-carriers materialized-or-authored ∧ ¬typed-partial.
  //   partial  = ≥1 live/authored carrier but (a phantom, OR only authored-not-live, OR typed-partial).
  // An AUTHORED-only wave carrier keeps the row partial (materialization owed) — the honest
  // distinction the wave-spec-audit §7 makes: spec-converged ≠ file-materialized.
  let derived;
  const anyCarrier = live.length + authored.length > 0;
  if (!hasCarrier || !anyCarrier) derived = "gap";
  else if (r.coverState === "deferred") derived = "deferred";
  else if (missing.length > 0) derived = "partial";        // a phantom carrier ⇒ partial (cite-fix owed)
  else if (live.length === 0) derived = "partial";          // only authored carriers ⇒ materialization owed
  else if (r.coverState === "partial") derived = "partial"; // honest typed-partial (assembly owed)
  else derived = "addressed";

  const mismatch = derived !== r.coverState;
  findings.push({ r, live, authored, missing, staleCited, derived, mismatch });
}

// ---- recency-weighted convergence (the COMPUTED fraction) ------------------
const W = (band) => bands[band]?.weight ?? 1;
const score = { addressed: 1.0, partial: 0.5, deferred: 1.0, gap: 0.0 }; // deferred-with-trigger counts as discharged
let num = 0, den = 0;
for (const f of findings) {
  const w = W(f.r.band);
  num += w * score[f.derived];
  den += w;
}
const convergence = den ? num / den : 0;

// ---- no-silent-drop attestation --------------------------------------------
// every recurrence id across every row must be ACCOUNTED (it is an origin of some canonical row).
const allRecurrence = new Set();
for (const r of rows) for (const id of (r.recurrence || [])) allRecurrence.add(id);
const canonicalIds = new Set(rows.map((r) => r.id));
const orphanOrigins = [...allRecurrence].filter((id) =>
  !id.startsWith("mem:") && !canonicalIds.has(id) &&
  // an origin id is OK if it is listed in SOME row's recurrence (it is, by construction) — this
  // fence catches a canonical row whose own id is missing from its recurrence (a self-drop).
  !rows.some((r) => (r.recurrence || []).includes(id)));

const selfDrops = rows.filter((r) => !(r.recurrence || []).includes(r.id)).map((r) => r.id);

// ---- gate accounting -------------------------------------------------------
const gaps = findings.filter((f) => f.derived === "gap");
const falseGreens = findings.filter((f) => f.mismatch && f.derived === "gap" && f.r.coverState !== "gap");
const phantomCites = findings.filter((f) => f.missing.length > 0);     // cited a typo/dangling slug
const staleResidue = findings.filter((f) => f.staleCited.length > 0);
const deferred = findings.filter((f) => f.derived === "deferred");

const lintTotal = gaps.length + falseGreens.length + phantomCites.length + staleResidue.length + selfDrops.length + orphanOrigins.length;

// ---- JSON mode -------------------------------------------------------------
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({
    corpus: { rows: rows.length, greenfieldDirs: onDisk.greenfield.size, greenfieldConverged: greenfieldConverged.size, refineDirs: onDisk.refine.size, waves: onDisk.wave.size, authoredSlugs: authoredSlugs.size, prunedSlugs: [...prunedSlugs] },
    convergence: +(convergence).toFixed(4),
    counts: { gaps: gaps.length, falseGreens: falseGreens.length, phantomCites: phantomCites.length, staleResidue: staleResidue.length, selfDrops: selfDrops.length, orphanOrigins: orphanOrigins.length },
    gaps: gaps.map((f) => ({ id: f.r.id, verbatim: f.r.verbatim, note: f.r.coverNote })),
    falseGreens: falseGreens.map((f) => ({ id: f.r.id, typed: f.r.coverState, derived: f.derived, missing: f.missing })),
    phantomCites: phantomCites.map((f) => ({ id: f.r.id, missing: f.missing })),
    staleResidue: staleResidue.map((f) => ({ id: f.r.id, cited: f.staleCited })),
    rows: findings.map((f) => ({ id: f.r.id, band: f.r.band, typed: f.r.coverState, derived: f.derived, live: f.live, authored: f.authored, missing: f.missing })),
  }, null, 2));
  process.exit(lintTotal ? 1 : 0);
}

// ---- emit the human view (rendered FROM the manifest, never hand-typed) ----
if (process.argv.includes("--emit")) {
  const byBand = {};
  for (const f of findings) (byBand[f.r.band] ??= []).push(f);
  let md = `# HISTORICAL RECAP — the BD prompt-corpus coverage ledger (GENERATED — do not hand-edit)\n\n`;
  md += `> Rendered by \`golden/recap.mjs --emit\` from \`golden/recap.manifest.json\`. The coverage %\n`;
  md += `> is a COMPUTED, recency-weighted fraction re-derived from disk; every \`addressed\` row's\n`;
  md += `> carrier is verified to exist. This file is the standing-recap home (it absorbs + retires\n`;
  md += `> the phantom \`BD-CONTINUATION-PROMPT.md\`). Re-run \`recap.mjs\` to regenerate.\n\n`;
  md += `**Recency-weighted convergence: ${(100 * convergence).toFixed(1)}%** `;
  md += `(${rows.length} de-duplicated asks · ${gaps.length} GAP · ${deferred.length} deferred-with-trigger · ${staleResidue.length} stale-residue)\n\n`;
  for (const band of Object.keys(bands)) {
    const fs = byBand[band] || [];
    if (!fs.length) continue;
    md += `## ${band} — ${bands[band].label} (weight ${bands[band].weight})\n\n`;
    md += `| id | ask | state | carriers (disk-verified · \`·auth\`=spec'd, file un-materialized) |\n|---|---|---|---|\n`;
    for (const f of fs) {
      const parts = [...f.live, ...f.authored.map((a) => `${a}·auth`)];
      const carriers = parts.length ? parts.join(", ") : (f.derived === "gap" ? "**— NO CARRIER (GAP)**" : "—");
      const v = f.r.verbatim.length > 90 ? f.r.verbatim.slice(0, 88) + "…" : f.r.verbatim;
      md += `| ${f.r.id} | ${v.replace(/\|/g, "/")} | ${f.derived.toUpperCase()} | ${carriers.replace(/\|/g, "/")} |\n`;
    }
    md += `\n`;
  }
  if (gaps.length) {
    md += `## GAP REPORT (born-RED until each gains a carrier)\n\n`;
    for (const f of gaps) md += `- **${f.r.id}** — ${f.r.verbatim}\n  - ${f.r.coverNote || "no disposition note"}\n`;
    md += `\n`;
  }
  writeFileSync(join(RECAP_DIR, "HISTORICAL-RECAP.md"), md);
  console.log(`${GRN}emitted${RST} ${join(RECAP_DIR, "HISTORICAL-RECAP.md")}`);
}

// ---- REPORT ----------------------------------------------------------------
const hdr = (s) => console.log(`\n${s}\n${"─".repeat(s.length)}`);
console.log(`historical-recap GOLDEN oracle — ${rows.length} de-duplicated asks · ${onDisk.greenfield.size} greenfield dirs (${greenfieldConverged.size} converged) · ${onDisk.refine.size} refine dirs · ${onDisk.wave.size} waves on disk`);

hdr("PASS 1 — carrier JOIN (re-derive coverState from disk)");
for (const f of findings) {
  const tag = f.derived === "gap" ? RED + "GAP " : f.derived === "partial" ? AMB + "PART" : f.derived === "deferred" ? AMB + "DEFR" : GRN + "ADDR";
  const carriers = [...f.live, ...f.authored.map((a) => a + AMB + "·auth" + RST)].join(", ").slice(0, 72) || "—";
  const why = f.derived === "partial"
    ? (f.missing.length ? `  ${RED}phantom-cite${RST}` : f.live.length === 0 ? `  ${AMB}materialization-owed${RST}` : `  ${DIM}assembly-owed${RST}`)
    : "";
  console.log(`  ${tag}${RST} ${f.r.id.padEnd(14)} ${DIM}${carriers}${RST}${why}`);
}

hdr("PASS 2 — the GAP report (asks with NO live carrier)");
if (!gaps.length) console.log(`  ${GRN}ok  ${RST} 0 gaps`);
for (const f of gaps) console.log(`  ${RED}GAP ${RST} ${f.r.id}: ${f.r.verbatim.slice(0, 80)}…`);

hdr("PASS 3 — false-green + phantom-cite + stale-prune residue (the anti-inflation fence)");
console.log(`  ${falseGreens.length ? RED + "RED " : GRN + "ok  "}${RST}false-green (typed addressed, derived gap): ${falseGreens.length}` +
  (falseGreens.length ? `  ${DIM}${falseGreens.map((f) => f.r.id).join(", ")}${RST}` : ""));
console.log(`  ${phantomCites.length ? RED + "RED " : GRN + "ok  "}${RST}phantom-cite (carrier ¬disk ∧ ¬authored — typo/dangling): ${phantomCites.length}` +
  (phantomCites.length ? `  ${DIM}${phantomCites.map((f) => `${f.r.id}→${f.missing.join("")}`).join(", ")}${RST}` : ""));
console.log(`  ${staleResidue.length ? RED + "RED " : GRN + "ok  "}${RST}stale-prune residue cited: ${staleResidue.length}` +
  (staleResidue.length ? `  ${DIM}${staleResidue.map((f) => `${f.r.id}→${f.staleCited.join("")}`).join(", ")}${RST}` : ""));
console.log(`  ${DIM}amendment-authored (un-materialized) slugs: ${authoredSlugs.size} · pruned slugs: ${prunedSlugs.size}${RST}`);

hdr("PASS 4 — no-silent-drop attestation");
console.log(`  ${selfDrops.length ? RED + "RED " : GRN + "ok  "}${RST}rows missing their own id in recurrence (self-drop): ${selfDrops.length}` +
  (selfDrops.length ? `  ${DIM}${selfDrops.join(", ")}${RST}` : ""));
console.log(`  ${orphanOrigins.length ? RED + "RED " : GRN + "ok  "}${RST}orphaned origin ids (unaccounted): ${orphanOrigins.length}`);

hdr("CONVERGENCE — the computed fraction");
console.log(`  recency-weighted: ${AMB}${(100 * convergence).toFixed(1)}%${RST}  ${DIM}(Σ w·score / Σ w; addressed=1 partial=.5 deferred=1 gap=0)${RST}`);
console.log(`  ${gaps.length} GAP · ${findings.filter((f) => f.derived === "partial").length} partial · ${deferred.length} deferred-with-trigger · ${findings.filter((f) => f.derived === "addressed").length} addressed`);

hdr("VERDICT");
console.log(`  born-RED lints firing: ${lintTotal ? RED + lintTotal + RST : GRN + "0 — CLEAN" + RST}` +
  `  ${DIM}(${gaps.length} gap + ${falseGreens.length} false-green + ${phantomCites.length} phantom-cite + ${staleResidue.length} stale + ${selfDrops.length} self-drop + ${orphanOrigins.length} orphan)${RST}`);
console.log(`  → drive every GAP to a carrier on disk, then run 2-consecutive-clean = the recap is converged + nothing lost.`);
process.exit(lintTotal ? 1 : 0);
