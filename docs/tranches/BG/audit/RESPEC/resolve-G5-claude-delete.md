# RESOLVE — G5 · CLAUDE-delete safety (the corrected-approach SPEC)

**Gap:** G5-claude-delete · **Mode:** spec (feasibility-spiked, READ-MOSTLY) · **Pass:** 2 · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `6369ad6e` (re-verified live this pass) · **pkg:** 4.2.0 → cut 5.0.0
**Author fence:** wrote ONLY this file under `RESPEC/`. No `src/demo/styles/scripts` edits. `verify-siblings-intact --quiet` exit 0 before + after.
**Supersedes-and-completes:** `pass-1-proto-P-CLAUDE-DELETE.md` (the 90%-proto). This pass CLOSES the 6 synthesis-flagged OPEN must-resolves with disk-verified concrete mechanism.
**Convergence (this gap): 90%** — `readyToDevelop: YES` for G5. The 6 open holes are resolved to drop-in code; the residual ~10% is the B4b-content *authoring labour* (writing 15 homes with verbatim tags) + the `readme-meta-clean` multi-home split, both bounded.

---

## 0. WHAT THIS RESOLVES (the 6 synthesis OPENs, each disk-grounded)

| # | Synthesis OPEN | Resolution | §  |
|---|---|---|---|
| 1 | the FULL 12-site reader census + per-gate re-home (8 non-§Structure readers unmapped) | EXACT census table: 12 readers, each `site → severity → re-home key`; expandable-part is the dead-constant false-positive | §1 |
| 2 | DEFINE `canonTokensSound()` (invoked in C1, DANGLING) | bijective manifest-soundness check (CANON_HOMES keyset ≡ CANON_TOKENS keyset, every token list non-empty) | §3 |
| 3 | BOUND/close the legacy-contract accumulation hole | WIDEN the scan from BG/BH-only to ALL **contract-DEFINING anchors** (76 heading + bold-lead tags, every letter) → close the legacy hole completely | §4 |
| 4 | the verbatim-tag-preservation contract | the re-home prose KEEPS the `(XX.W-TAG)` parenthetical; `homeBodies.includes(tag)` IS the machine lock (no new mechanism) | §4c |
| 5 | the README scope (15 manifest ≠ 28 owed) | the delete owes **5 component-README homes** (4 present + instrument-chassis absent); the 28-missing-README figure is the SEPARATE colocation backlog, NOT a delete precondition | §5 |
| 6 | DROP the vacuous `structureEnumerates` smoke-check | DROP the helper ENTIRELY + drop the structure sub-clause from split-chars/accent-tone; structure-enumeration soundness is owned SOLELY by structure-sync's regen-check delegation | §2c |

All 4 dangling symbols confirmed ABSENT on disk (`grep -rl` → 0 references): `canonTokensSound`, `canonAccumulationSound`, `structureEnumerates`, `CANON_TOKENS`. `auditCanonHomes` is defined but UNWIRED (1 reference = its own def). `proof:claude-deletable` not yet registered (born at B4f — correct).

---

## 1. THE FULL 12-SITE READER CENSUS (the unmapped-8 closed) — disk-verified at `6369ad6e`

`grep -rln 'readFileSync([^)]*CLAUDE\|safeRead([^)]*CLAUDE\|CLAUDE_MD' scripts/*.mjs` → **12 readers** (+ `proof-expandable-part` = the dead-constant non-reader). Each row carries its exact site, severity, read-style (CRASHER vs guarded), and the canon-home key it re-points to.

| # | Reader | Assert site | Severity | Read-style | After-delete behavior (today) | Re-home key | Fate |
|---|---|---|---|---|---|---|---|
| 1 | `proof:claude-structure-sync` | `:74` parse + count | structural (set-equality + count + png) | **CRASHER** (raw `readFileSync(CLAUDE_MD)` no guard) | **THROW** → can abort `--run full` | *(none — structure.md is GENERATED)* | **DELEGATE** to `regen-structure --check` (parser DELETED); png-arm SPLIT to `proof:visual-png-tracked` (§2a) |
| 2 | `proof:doc-consistency` | `:197` DIRS + DEPS | DIRS hard / DEPS hard | **CRASHER** (raw `readFileSync(CLAUDE_MD)` no guard) | **THROW** → can abort `--run full` | `dependencies` (DEPS arm only) | DIRS arm **DROPPED**; DEPS → `readCanon("dependencies")` table (§2b) |
| 3 | `proof:split-chars` | `:289`/`:309` SP6 box-regex | **HARD** violation | guarded (`safeRead`→"") | SP6 RED (vacuous on flat file) | *(none — sub-clause dropped)* | **DROP** the §Structure sub-clause (§2c); README/barrel/api asserts STAY |
| 4 | `proof:accent-tone` | `:353` a6 box-regex | soft (recorded-not-violated) | guarded (`safeRead`→"") | a6 fact flips false (no violation) | *(none — sub-clause dropped)* | **DROP** the §Structure sub-clause (§2c) |
| 5 | `proof:dock-rail-realize` | `:258`-`:278` R5 doc-reconcile | **HARD** (4 negative + 2 positive) | guarded (`readRel`→"") | R5 positives RED (`documentsDockRailRealize` false) | `component:dock` | re-point `readRel(CLAUDE_MD)` → `readCanon("component:dock")` (§2d) |
| 6 | `proof:handmark` | `:249`-`:252` W6 | **HARD** | guarded (`rd`→"") | W6 RED (`w6Recorded` false) | `component:handmark` | `rd("CLAUDE.md")` → `readCanon("component:handmark")` |
| 7 | `proof:dock-unify` | `:532`-`:554` F5 | **HARD** (3 sub-asserts) | guarded (`safeRead`→"") | F5 RED (nav-pattern absent) | `component:dock` | `safeRead(CLAUDE_MD)` → `readCanon("component:dock")` |
| 8 | `proof:dropdown-fix` | `:255`-`:259` D3 | **HARD** | guarded (`safeRead`→"") | D3 RED (gutter-stable absent) | `consumer-wiring` | `safeRead(P.CLAUDE_MD)` → `readCanon("consumer-wiring")` |
| 9 | `proof:easing-primitive` | `:270`-`:277` W5 | **HARD** | guarded (`safeRead`→"") | W5 RED (EasingPicker/boundary-law absent) | `component:easing` | `safeRead(P.CLAUDE_MD)` → `readCanon("component:easing")` |
| 10 | `proof:phase-palette` | `:197`-`:227` W4 | **HARD** | guarded (`safeRead`→"") | W4 RED (`--phase-complete-color` absent) | `component:instrument-chassis` | `safeRead(ROOT/CLAUDE.md)` → `readCanon("component:instrument-chassis")` |
| 11 | `proof:spa-view` | `:228`-`:233` W5 | **HARD** | guarded (`safeRead`→"") | W5 RED (SpaView absent) | `component:spa-view` | `safeRead(P.CLAUDE_MD)` → `readCanon("component:spa-view")` |
| 12 | `proof:surface-axis` | `:429`-`:465` W7 doc-honesty | **HARD** (Toast + Button) | guarded (`safeRead`→"") | W7 RED (`<Toast surface=` example absent) | `glass-system` | `safeRead(P.CLAUDE_MD)` → `readCanon("glass-system")` |
| — | `proof:expandable-part` | `:66` defines `CLAUDE_MD` const | n/a | **NEVER READS** (only `safeRead(P.SFC)` at `:363`) | no effect | n/a | **the dead-constant false-positive** — C2 must NOT flag it (§6 C2) |

### 1a. Census facts the table fixes (the synthesis's mutually-inconsistent counts reconciled)

The proto cited "12 RED-ers / 16 content-reads / 2 crashers" — these reconcile cleanly:
- **12 readers** that READ CLAUDE.md (the `grep` above): rows 1–12.
- **2 CRASHERS** (rows 1, 2): raw `readFileSync(CLAUDE_MD, "utf8")` with NO `existsSync` guard → ENOENT THROW → strictly WORSE than RED (a throw in `--run full` can abort the battery; no JSON artifact written). The other 10 are `safeRead`/`rd`/`readRel`-guarded → return `""` → the POSITIVE assert REDs (not crashes).
- **"16 content-reads"** was the proto's count of distinct `safeRead(…)` *call-sites* across the readers (multiple per file), NOT distinct files — a counting artifact, not 16 gates. The binding count is **12 readers, 2 crashers**.
- **`proof:expandable-part`** defines a `CLAUDE_MD` path constant (`:66`) it never passes to a reader — the dead-constant the C2 scan must EXCLUDE (the `:66` false-positive the proto named).

### 1b. The re-home key distribution (the 8 distinct canon homes the delete consumes)

| canon-home key | consuming reader(s) | present at HEAD? |
|---|---|---|
| `dependencies` | doc-consistency (DEPS) | stub present (PROSE — must become a TABLE, §2b) |
| `consumer-wiring` | dropdown-fix (D3) | stub present |
| `glass-system` | surface-axis (W7) | stub present |
| `component:dock` | dock-rail-realize (R5) + dock-unify (F5) | **present** (`src/components/custom/dock/README.md`) |
| `component:handmark` | handmark (W6) | **present** |
| `component:easing` | easing-primitive (W5) | **present** |
| `component:spa-view` | spa-view (W5) | **present** |
| `component:instrument-chassis` | phase-palette (W4) | **ABSENT** (the only missing component home — P4 §3 authored its content) |

The remaining 7 CANON_HOMES keys (`structure`, `readme`, `build-and-gates`, `conventions`, `design-axes`, `motion-system`, `exports-subpaths`) carry NO re-pointed reader at HEAD — they re-home prose for human/agent navigation, content-verified by `auditCanonHomes` + CANON_TOKENS (§3), not by a reader gate.

---

## 2. THE structure.md / DEPS PARSER REWRITE (the load-bearing deliverable)

The headline (verified on disk): `regen-structure.mjs` emits **flat bullets** (`## src/components/custom (50 dirs)\n\n- animated-digit/\n- aurora/…`), while the 4 §Structure readers parse a CLAUDE.md **box-drawing ASCII tree** (`│   │   ├── name/`). The box regexes match ZERO lines in the generated file → a path-swap-only re-point is a SILENT VACUOUS PASS. The fix RETARGETS each reader.

### 2a. `proof:claude-structure-sync` — DELEGATE to the generator (parser DELETED) + png split

structure.md is GENERATED from disk by the SAME colocated-barrel glob. The STRONGEST "enumeration ≡ disk" check is "is the generated file byte-fresh?" — which `regen-structure --check` ALREADY is (verified: `regen-structure.mjs:78-88`, exit 1 on STALE/ABSENT, byte-exact, covers ui/ + composable/ + custom/, a strict superset of the old custom-only set-equality). So structure-sync DROPS its box-drawing `parseDoc()` entirely:

```js
// proof-claude-structure-sync.mjs (B5c — parseDoc DELETED, the raw readFileSync GONE)
import { generateStructureMd } from "./regen-structure.mjs";   // ← §2a-fix REQUIRED
import { canonDoc } from "./lib/canon-doc.mjs";
function run() {
    const violations = [];
    const home = canonDoc("structure");
    if (!existsSync(home))
        violations.push("docs/canon/structure.md ABSENT — run `node scripts/regen-structure.mjs --write`");
    else if (readFileSync(home, "utf8") !== generateStructureMd())
        violations.push("docs/canon/structure.md STALE vs disk — run `node scripts/regen-structure.mjs --write`");
    // …
}
```

Two REQUIRED co-edits:
- **§2a-fix (HARD prerequisite) — guard `regen-structure.mjs`'s CLI block.** Verified: `regen-structure.mjs:68` runs `generateStructureMd()` + `:93` `process.stdout.write(generated)` AT TOP LEVEL on import. Importing it from structure-sync would print the whole file to stdout + pollute the gate output. B5c MUST wrap the CLI body behind the house main-guard before exporting:
  ```js
  import { pathToFileURL } from "node:url";
  export function generateStructureMd() { /* unchanged */ }
  if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
      const generated = generateStructureMd();    // the existing WRITE/CHECK/stdout body, moved IN
  }
  ```
- **§2a-png — split the png-integrity arm to `proof:visual-png-tracked`.** structure-sync's `untrackedVisualPngs()` git-arm is ORTHOGONAL to the structure check (it asserts every un-ignored visual png is git-tracked). Carve it to a new `proof-visual-png-tracked.mjs` (same `tags`, the git-ls-files body byte-moved) so the parser delete does not strand the png assert. Both register in `gates.mjs`.

### 2b. `proof:doc-consistency` — DROP DIRS, re-home DEPS to a PARSEABLE table

Two arms today: DIRS (cited `custom/<dir>` resolves) + DEPS (Dependencies-table package resolves in package.json).
- **DIRS arm — DROP.** A dangling-citation is STRUCTURALLY IMPOSSIBLE in a generated-from-disk structure.md (every bullet is `existsSync`-true; `regen --check` is the freshness guarantee). Fully superseded by §2a's delegation. The raw `readFileSync(CLAUDE_MD)` crasher (`:197`) DIES with the DIRS arm.
- **DEPS arm — re-home to `readCanon("dependencies")`.** **PRECONDITION (B4b-content):** `docs/canon/dependencies.md` MUST be authored as a `| Package | Role |` table mirroring CLAUDE.md's form (the current stub is PROSE — `vue · reka-ui · …` — which `citedDeps()`'s `| `pkg` |` parser reads as ZERO deps → vacuous-green). Add a `citedDeps(depsDoc).size >= N` non-vacuity assert (the table-parseability backstop the CANON_TOKENS anchors do not catch).
  ```js
  const depsCanon = readCanon("dependencies");   // strict — REDs loud if absent
  const { facts, violations } = detectDeps({ depsDoc: depsCanon, packageJson });   // DIRS-less
  ```
- **The vitest fixture rewrite is part of the deliverable:** `scripts/__tests__/proof-doc-consistency.test.ts` (a box-drawing tree fixture today) moves to the DEPS-table form, or the unit test fails after the rewrite. Refactor `detectConsistency` → DEPS-only `detectDeps({ depsDoc, packageJson })`.

### 2c. `proof:split-chars` (SP6 HARD) + `proof:accent-tone` (a6 soft) — DROP the structure sub-clause (resolves OPEN #6)

The proto's §1c minted a shared `structureEnumerates()` flat-bullet helper and KEPT the structure cross-check as "a guaranteed-green smoke check." **This pass DROPS it instead** (the synthesis's clean-break decision):

A second reader asserting "split-chars is in structure.md" over a generated-from-disk file is GUARANTEED green — the dir is on disk → it is in the generated bullets → the assert always passes. **A clause that cannot RED is the vacuous-smoke-check pattern BH kills.** Structure-enumeration soundness is owned SOLELY by §2a's regen-check delegation (byte-exact, covers EVERY dir). So:
- **split-chars** `:289` `inClaudeStructure` + `:309` SP6-structure violation: **DELETE the `inClaudeStructure` fact + the SP6 structure sub-violation.** The other SP6 asserts (README present, root-barrel ride, api publish — `:483`) STAY (those are REAL, non-vacuous). The README-present arm is the live colocation witness.
- **accent-tone** `:353` `inClaudeStructure` (soft, already recorded-not-violated): **DELETE the fact.** It contributes nothing once structure-sync owns enumeration.

**`structureEnumerates()` is NOT minted.** This removes the §1c deliverable, the `structureEnumerates` ≥2-consumer accounting, and self-test bite #6 — one fewer surface to build, and the ≥2-consumer bar rests entirely on CANON_TOKENS (§3.b), which is solid.

### 2d. The 8 non-§Structure readers — uniform `readCanon(<key>)` retarget (resolves OPEN #1)

Rows 5–12 each swap their guarded CLAUDE.md read for `readCanon(<re-home-key>)` (strict for HARD readers, the §1b key map). The reader's ASSERTION REGEX is otherwise UNCHANGED — it runs against the home body where the contract now lives. Two notes:
- **The negative asserts move with the prose.** dock-rail-realize's R5 negatives (`NO proof:rail3`, `NO tests-visual/rail3.spec.ts`, `NO --dock-rail-seam-offset`, `NO proof:rail-extend`) and surface-axis's W7 doc-honesty negatives run against `component:dock` / `glass-system` — the re-home prose must NOT carry the retired tokens (a clean re-home, not a copy-with-stale-refs).
- **`readCanon` strict is the FAIL-EXPLICIT seam.** If a home was never authored, `readCanon` THROWS a NAMED intentional error ("home for X is ABSENT … re-home before re-pointing") — fired ONLY on a B4b-content slip the close gate's C1 (§6) already catches BEFORE B5c re-points. After B4b-content authors the home, no throw.

### 2e. The census closure (the §1 fate table, distilled)

| reader | before | after (B5c) | parser? |
|---|---|---|---|
| claude-structure-sync | box `parseDoc()` set-equality + count | **delegate** to `regen-structure --check` (byte-exact) | parser DELETED |
| doc-consistency | DIRS + DEPS box-parse | DIRS DROPPED; DEPS → `dependencies.md` table | DIRS parser DELETED; DEPS parser KEPT (over the table) |
| split-chars | single-dir box regex (HARD) | structure sub-clause **DROPPED** | clause DELETED (vacuous) |
| accent-tone | single-dir box regex (soft) | structure fact **DROPPED** | clause DELETED (vacuous) |
| 8 non-§Structure (rows 5–12) | `safeRead(CLAUDE_MD)` + content regex | `readCanon(<key>)` + the SAME content regex | n/a (content-presence, not tree-parse) |

---

## 3. `auditCanonHomes()` CONTENT-REAL + `CANON_TOKENS` + `canonTokensSound()` (resolves OPEN #2)

### 3a. The CONTENT-real audit (replace the existence-only stub)

`auditCanonHomes()` today is existence-only (`!existsSync` filter). Make it CONTENT-real per-key via CANON_TOKENS, and DROP the dead `MIN_CANON_BYTES` floor (verified: stubs are 604–2555 B raw → a 200 B floor never bites; the token-presence IS the content gate):

```js
// scripts/lib/canon-doc.mjs — CONTENT-real
export function auditCanonHomes() {
    const out = [];
    for (const [key, rel] of Object.entries(CANON_HOMES)) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) { out.push({ key, rel, reason: "absent" }); continue; }
        const body = readFileSync(abs, "utf8");
        for (const re of CANON_TOKENS[key] ?? []) {
            if (!re.test(body)) { out.push({ key, rel, reason: `missing-token:${re.source.slice(0,40)}` }); break; }
        }
    }
    return out;   // [] = every home present AND carrying its contract token
}
```
At HEAD this returns ~14 `missing-token` rows + 1 `absent` (instrument-chassis) → the B4f gate is **born-RED**. Each B4b-content redistribution clears one row → `auditCanonHomes() === []` is the measurable `15 → 0` drain ("~15% done" becomes a NUMBER).

### 3b. `CANON_TOKENS` — the single-source contract-token manifest

```js
// scripts/lib/canon-doc.mjs — additive. One token-list per home; the SHARED MINIMUM anchor
// the re-pointed reader asserts AND auditCanonHomes checks (ONE def, two consumers — §6.b).
export const CANON_TOKENS = Object.freeze({
    // reader-gated homes — the anchor IS (a subset of) the reader's own assertion regex
    dependencies:                  [/@mkbabb\/keyframes\.js/, /\|\s*Package\s*\|\s*Role\s*\|/],
    "consumer-wiring":             [/scroll-gutter-stable/, /scrollbar-gutter:\s*stable/],
    "glass-system":                [/<Toast\s+surface\s*=/, /<Button\s+surface\s*=/],
    "component:dock":              [/nav-pattern/i, /--dock-control-active-bg/, /proof:dock-rail-realize/],
    "component:handmark":          [/three-underline/i, /paper-ink-mark/],
    "component:easing":            [/EasingPicker/, /boundary law/i],
    "component:spa-view":          [/SpaView/, /spa-view/],
    "component:instrument-chassis":[/--phase-complete-color/, /InstrumentChassis phase canon/],
    // reader-less homes — a STABLE structural anchor B4b-content guarantees (keeps the manifest
    // bijective so auditCanonHomes is content-real for EVERY home, not only the reader-gated ones)
    structure:                     [/^- /m],                 // ≥1 flat bullet (generated)
    readme:                        [/glass-ui/],
    "build-and-gates":             [/proof:/],
    conventions:                   [/import type/],
    "design-axes":                 [/Token-first/i],
    "motion-system":               [/--spring-/],
    "exports-subpaths":            [/@mkbabb\/glass-ui\//],
});
```
- The manifest holds the **shared MINIMUM home-presence token**, NOT every gate's full assertion surface. A reader that asserts a SUPERSET keeps its extra asserts gate-local (e.g. surface-axis's two doc-honesty sub-asserts stay inline; the manifest holds the shared `surface=` anchors). Record this scope in the `canon-doc.mjs` header.
- The reader-less homes' anchors are STABLE structural phrases (a flat bullet, an `import type` line, a `--spring-` token) the B4b-content author guarantees — so `auditCanonHomes` is content-real for all 15.

### 3c. `canonTokensSound()` — DEFINE the dangling function (the manifest meta-soundness)

The proto invokes `canonTokensSound().ok` in C1 but never defines it. It asserts the MANIFEST is structurally sound — distinct from `auditCanonHomes` (which checks homes CONTAIN their tokens). `canonTokensSound` checks the two maps are BIJECTIVE and no token list is empty:

```js
// scripts/lib/canon-doc.mjs — additive
/**
 * Manifest soundness: CANON_HOMES keyset ≡ CANON_TOKENS keyset (1:1, no token-less
 * home, no orphan token-set), and every token list is a non-empty RegExp[]. This is
 * the META-check that a half-authored manifest (a home added without a token, or a
 * token-set for a deleted home) REDs — distinct from auditCanonHomes (homes carry the token).
 */
export function canonTokensSound() {
    const homeKeys = new Set(Object.keys(CANON_HOMES));
    const tokKeys  = new Set(Object.keys(CANON_TOKENS));
    const tokenless = [...homeKeys].filter((k) => !tokKeys.has(k) || (CANON_TOKENS[k] ?? []).length === 0);
    const orphanTokens = [...tokKeys].filter((k) => !homeKeys.has(k));
    const nonRegex = Object.entries(CANON_TOKENS).flatMap(
        ([k, list]) => (list ?? []).every((r) => r instanceof RegExp) ? [] : [k]);
    return { ok: !tokenless.length && !orphanTokens.length && !nonRegex.length,
             tokenless, orphanTokens, nonRegex };
}
```
Born-RED at HEAD (CANON_TOKENS absent → tokenless = all 15). GREEN when the manifest is authored 1:1.

---

## 4. THE ACCUMULATION DISCIPLINE — WIDENED to close the legacy hole (resolves OPEN #3 + #4)

### 4a. The hole (re-stated)

CLAUDE.md carries **117 distinct tranche tags** (verified: BB=67, BA=47, BC=28, AZ=23, AY=6, BE=4, BG=1, BD=1) across **76 contract-DEFINING anchors** (33 `###` headings + 43 `**bold contract-leads** carrying a tag`). The proto's `canonAccumulationSound` scanned ONLY BG.W-/BH.B tags — so a LEGACY (BA/BB/BC/AZ) contract with no CANON_TOKENS anchor AND no home is **silently lost at delete with the gate green**. This is the synthesis's "deepest hole."

### 4b. The resolution — scan ALL contract-DEFINING anchors (every letter)

WIDEN the scan: a tag in a DEFINING position (a `###…(TAG)` heading line OR a `**…(TAG)**` bold contract-lead line) owns a contract and MUST appear in some canon home body. Inline cross-reference tags (mid-sentence) are NOT scanned (they are referenced from a homed contract, not lost). This closes the legacy hole completely + avoids the cross-ref false-positive:

```js
// scripts/lib/canon-doc.mjs — additive
const CLAUDE_MD = resolve(ROOT, "CLAUDE.md");
// A contract-DEFINING anchor: a heading or a bold contract-lead carrying an (XX.W-/XX.B) tag.
const DEFINING_LINE = /^(#{1,6}\s.*|\s*[-*]?\s*\*\*.*)\(([A-Z]{1,2}\.(?:W-[A-Z0-9-]+|B[0-9][0-9a-z.-]*))\)/gm;

/**
 * Accumulation guard. While CLAUDE.md is present, EVERY contract-defining anchor it
 * carries (any tranche letter — the legacy hole closed) must appear in SOME canon home
 * body (the home that re-homes it). Returns the un-homed tags (empty = no contract lost).
 * After CLAUDE.md is gone the scan is vacuously empty (the contracts already moved).
 */
export function canonAccumulationSound() {
    if (!existsSync(CLAUDE_MD)) return { unhomed: [], claudePresent: false };
    const claude = readFileSync(CLAUDE_MD, "utf8");
    const defining = new Set([...claude.matchAll(DEFINING_LINE)].map((m) => m[2]));
    const homeBodies = Object.values(CANON_HOMES)
        .map((rel) => { const p = resolve(ROOT, rel); return existsSync(p) ? readFileSync(p, "utf8") : ""; })
        .join("\n");
    const unhomed = [...defining].filter((tag) => !homeBodies.includes(tag));
    return { unhomed, claudePresent: true, definingCount: defining.size };
}
```
If WS8 appends `### The X register (BG.W-X)` to CLAUDE.md but never re-homes it, `BG.W-X` is in `defining` but in no home body → `unhomed:["BG.W-X"]` → C1 RED. The migration cannot complete until every defining anchor (legacy + new) has a home.

### 4c. The verbatim-tag-preservation contract (resolves OPEN #4)

`homeBodies.includes(tag)` requires the exact `(XX.W-TAG)` string to survive the re-home prose. **This is the DESIGN, not a flaw:** the tag is the contract's provenance identity; the re-home KEEPS the `(XX.W-TAG)` parenthetical. A re-home that drops the tag false-REDs → forces the author to keep it. NO new mechanism — `.includes(tag)` IS the machine lock. State the discipline in the `canon-doc.mjs` header + the BH execution prompt: *"re-homing `### Foo (XX.W-FOO)` carries the `(XX.W-FOO)` tag into the home body — the tag is the contract's identity, never stripped."*

### 4d. The per-wave discipline (prevention) + the residual

**Discipline (DOC):** a wave carrying a `claudeMdNote` (mints/edits a contract) MUST in the SAME diff (1) author the contract prose into its canon home WITH its verbatim tag, AND (2) add the contract's anchor to `CANON_TOKENS[home]` if it is reader-gated. "claudeMdNote → canon home (tagged) + CANON_TOKENS entry" is the wave's done-bar.

**Residual (recorded):** a late-wave contract appended WITHOUT a heading/bold-lead tag escapes `DEFINING_LINE`. The per-wave discipline DOC + code review is the backstop. LOW risk — the tranche convention tags every contract; the 76 defining anchors at HEAD all carry tags.

---

## 5. THE README SCOPE — 5 homes, not 28 (resolves OPEN #5)

Disk-verified: **50 custom dirs** (with `index.ts`), **22 carry a README**, **28 do not**. The G5 spec line's "~28 owed" CONFLATES two distinct concerns:

1. **The CLAUDE-delete oracle owes exactly 5 component-README homes** — the `component:*` keys in CANON_HOMES that hold a re-homed contract: `dock`, `easing`, `handmark`, `spa-view`, `instrument-chassis`. **4 present + instrument-chassis ABSENT** at HEAD (P4 §3 authored its content). The delete needs these 5 present + token-bearing — `auditCanonHomes` measures it.

2. **The 28-missing-README figure is the SEPARATE colocation backlog** — NOT a delete precondition. Verified: `proof:colocation` only forces a README on dirs that ADOPT the feature-dir layout (it derives its target-scan from README-bearing / composables/-bearing dirs — `proof-colocation.mjs:62,194-196`), AUTO-enrolling a dir the moment it adds its README. The 23 non-canon-home missing-README dirs (animated-digit, color-swatch, icon-chip, …) are simple wrappers that have NOT adopted the layout → NOT forced by proof:colocation, NOT owed by the CLAUDE-delete oracle.

**The explicit statement (the synthesis's ask):** `auditCanonHomes() 15→0` ≠ "all 28 component READMEs done." The delete owes the **15 CANON_HOMES** (9 cross-cutting incl. generated structure + 1 readme + 5 component), of which instrument-chassis README is the single absent home. The 23 other missing-README dirs are owned by `proof:colocation`'s auto-enroll discipline (they get a README IFF/WHEN they adopt the feature layout) — a separate, ongoing colocation-completeness concern with NO CLAUDE-delete dependency. Record this in the B4f gate note so a future agent does not read "15→0" as "all-28."

---

## 6. THE LOCKING GATE — `proof:claude-deletable` (the single delete-precondition oracle)

ONE born-RED gate, GREEN exactly when the delete is safe. Pure-detector house pattern (mirrors `proof:ship-attestation`'s born-RED-tag-blocker shape). Script `scripts/proof-claude-deletable.mjs`; `tags:["local","ci"]`; registered in `gates.mjs`.

### 6a. The clauses

- **C1 — content-real homes + accumulation.** `auditCanonHomes() === []` (§3a — every home present + token-bearing) AND `canonTokensSound().ok` (§3c — bijective manifest) AND `canonAccumulationSound().unhomed === []` (§4 — every contract-DEFINING anchor, any letter, has a home). *Born-RED at HEAD: ~14 missing-token + 1 absent + N un-homed defining tags.*
- **C2 — zero surviving hard CLAUDE.md readers.** A scoped scan of `scripts/**.mjs` for a READ of the CLAUDE.md path = 0. DISTINGUISH a READ from a DEFINED-BUT-UNREAD path constant (the `proof-expandable-part:66` false-positive). Operational floor: a file flags ONLY if it both defines `CLAUDE_MD: resolve(...,"CLAUDE.md")` (or a literal `"CLAUDE.md"`) AND passes it to a reader (`readFileSync|safeRead|readRel|rd(<that-var>)`). A defined-but-never-passed constant does NOT flag. *Born-RED at HEAD: 12 readers (2 crashers + 10 guarded); expandable-part excluded.*
- **C3 — the file is the LAST act.** While `existsSync(CLAUDE.md)` the gate STAYS RED (`claudePresent:true`). It cannot pre-green — incremental B4b-content drains C1 EARLY, but C3 holds RED until B4f flips it. After B5c re-points all readers AND B4b-content fills all homes, the gate is GREEN-but-for-C3; the delete flips C3 → whole gate GREEN, proving the delete was safe at the instant it happened.

### 6b. The ≥2-consumer accounting

- **`CANON_TOKENS`** — consumed by (1) `auditCanonHomes()` (the home-audit) AND (2) each re-pointed reader gate that imports `CANON_TOKENS[key]` for its home-presence anchor. Two binary consumers, declared once — the ≥2 bar met by construction.
- **`readCanon` / `canonDoc`** — consumed by ALL 8 re-pointed non-§Structure readers + the structure-sync delegation. Far exceeds ≥2.
- **`canonAccumulationSound` / `canonTokensSound`** — consumed by `proof:claude-deletable` C1 (the single delete-oracle). These are oracle-internal helpers (one consumer by design — the oracle is the home), NOT ≥2-bar primitives; recorded as such.

*(`structureEnumerates` is NOT minted — §2c — so it carries no accounting.)*

### 6c. The self-test bites (forgery-proof — now 5, the box-drawing bite #6 dropped with the helper)

1. a synthetic canon home missing its token → **C1 REDs** (content-real, not existence-only);
2. a synthetic `### Foo (BB.W-PHANTOM)` (a LEGACY-letter tag) appended to a CLAUDE.md fixture with no home → **C1 `canonAccumulationSound` REDs** (the WIDENED accumulation guard has teeth — the legacy-hole bite, §4b);
3. a synthetic surviving `safeRead(P.CLAUDE_MD)` reader in a fixture → **C2 REDs** (the reader scan bites);
4. a synthetic `CLAUDE_MD: resolve(...)` defined-but-unread fixture → **C2 does NOT red** (the dead-constant false-positive excluded — the expandable-part class);
5. a dangling `CANON_HOMES` key whose home is absent → **C1 REDs `reason:"absent"`** (the instrument-chassis class) + a token-less `CANON_TOKENS` manifest → **`canonTokensSound` REDs** (the manifest meta-soundness bite).

### 6d. The ordered close chain (what gates what)

```
B4b-content   redistribute each CLAUDE.md contract → its canon home WITH its verbatim
              (XX.W-TAG); author dependencies.md as a TABLE (§2b); author the
              instrument-chassis README (P4 §3); add CANON_TOKENS + canonTokensSound +
              canonAccumulationSound to canon-doc.mjs
   └─ oracle: auditCanonHomes() drains 15→0 + canonTokensSound().ok + canonAccumulationSound clean   (C1)
B5c           re-point all readers THROUGH canon-doc.mjs:
              · structure-sync → regen-check delegation (parser DELETED, §2a) + §2a-fix main-guard + png split
              · doc-consistency → DIRS dropped, DEPS → dependencies.md table (§2b) + vitest fixture rewrite
              · split-chars/accent-tone → structure sub-clause DROPPED (§2c)
              · the 8 non-§Structure readers → readCanon("<key>") strict (§2d)
              · the 2 ENOENT-crashers → raw readFileSync DELETED/→readCanon strict
              · re-emit ci.yml (gates:emit-ci) — proof:gen-ci-fresh GREEN
   └─ oracle: zero hard readers (C2 scan = 0, dead-constant excluded)                    (C2)
B4f           rm CLAUDE.md — the irreversible act, ABSOLUTE LAST
   └─ oracle: file absent + C1 + C2 still green → proof:claude-deletable GREEN          (C3)
```
B4f is mechanically blocked until C1 (every contract re-homed + token-present + no un-homed defining tag, legacy + new) and C2 (every reader re-pointed, both crashers killed) are green. The C3 last-act backstop makes incremental B4b-content SAFE — early home authoring cannot pre-green the delete.

### 6e. `gates.mjs` registration (drop-in)

```js
{
    id: "proof:claude-deletable",
    cmd: "proof:claude-deletable",
    tags: ["local", "ci"],
    closeDisease: false,   // it is the delete-oracle, not a clobberable meta-gate
    note: "BH.B4f — the CLAUDE.md hard-delete precondition oracle (born-RED the whole tranche → GREEN only at the delete commit; the proof:ship-attestation born-RED-tag-blocker shape). C1 content-real homes: auditCanonHomes()==[] (every CANON_HOMES home present + carrying its CANON_TOKENS contract token) AND canonTokensSound() (bijective manifest, no token-less home) AND canonAccumulationSound() (every CONTRACT-DEFINING anchor in CLAUDE.md — ANY tranche letter, the legacy hole closed — appears verbatim in some canon home, the verbatim-tag-preservation contract). C2 zero surviving hard CLAUDE.md readers: the scoped scripts/**.mjs scan==0, a read distinguished from a defined-but-unread path constant (proof-expandable-part:66 excluded). C3 the file is the LAST act: while CLAUDE.md exists the gate STAYS RED. NOTE: the delete owes the 15 CANON_HOMES (5 component READMEs — dock/easing/handmark/spa-view/instrument-chassis); the 28-missing-README colocation backlog is a SEPARATE proof:colocation auto-enroll concern, NOT a delete precondition. 5 self-test bites: token-less home REDs C1, a legacy-letter un-homed tag REDs C1, a synthetic reader REDs C2, a dead-constant does NOT red C2, an absent home + a token-less manifest RED C1.",
}
```

---

## 7. THE useBloomUp KEEP-IN-PLACE PRECONDITION (B2.4a premise reversed — confirmed)

`useBloomUp.ts` is published via `motion/index.ts:61` (`/motion` subpath) with **18 referencing files / 15+ consumers** — a published primitive → **KEEP-IN-PLACE.** The doc migration MUST NOT collaterally relocate it while re-homing the dock/motion canon prose (relocating breaks the `/motion` public surface + churns 18 import sites for zero benefit). NOT in `proof:claude-deletable`'s assert surface (a carve-discipline fact, not a doc-migration fact) — recorded as a precondition the close chain honours. The B4b-content `component:dock` / motion-system home documents `useBloomUp` as a published `/motion` primitive (inheriting the existing motion-barrel mention — no relocate).

---

## 8. THE VERIFICATION PROTOCOL (the π-equivalent — gate-integrity, no pixels)

This is a DOC/GATE-integrity wave (no painted surface). The binding verification is a STAGED DRY-RUN in a THROWAWAY `/tmp` worktree (NEVER `~/Programming` — the foreign-tree fence), proving the delete does not crash the battery + surfaces no 7th red:

```
node scripts/verify-siblings-intact.mjs --quiet                    # exit 0 BEFORE
git worktree add /tmp/bg-claude-delete-verify HEAD                 # throwaway, /tmp ONLY
cd /tmp/bg-claude-delete-verify
# 1. author all 15 canon homes (B4b-content, tagged) + instrument-chassis README + dependencies TABLE
# 2. re-point all readers (B5c §2) + add CANON_TOKENS/canonTokensSound/canonAccumulationSound
#    + the content-real auditCanonHomes to canon-doc.mjs + register proof-claude-deletable.mjs
# 3. confirm GREEN-but-for-C3:
node scripts/proof-claude-deletable.mjs                            # C1∧C2 green, C3 RED (file present)
# 4. the irreversible act:
rm CLAUDE.md
# 5. the binding assert — NO ENOENT throw, the whole battery completes, no NEW red:
node scripts/gates.mjs --run full 2>&1 | tee /tmp/claude-delete-fullrun.log
#    PASS criteria:
#    · NO "ENOENT"/"no such file" in the log (the 2 crashers killed)
#    · proof:claude-deletable GREEN (C3 flipped)
#    · the 4 ex-§Structure readers GREEN (delegation/drop sound, non-vacuous)
#    · proof:doc-consistency GREEN (DEPS over the table, DIRS dropped)
#    · proof:gen-ci-fresh GREEN (ci.yml re-emitted)
#    · the close red count == the pre-delete count (no 7th red introduced)
cd /Users/mkbabb/Programming/glass-ui
git worktree remove --force /tmp/bg-claude-delete-verify           # clean up the throwaway
node scripts/verify-siblings-intact.mjs --quiet                    # exit 0 AFTER
```
The 5 self-test bites (§6c) are the per-clause forgery proofs; the `--run full` /tmp dry-run is the integration proof the delete is SAFE (the cardinal "device-free green ≠ correct" lesson applied to the gate layer — the dry-run is the real act, not a report claim).

---

## 9. THE EXACT WAVE THAT PROVES IT DURING BUILD

| Phase | Wave | Deliverable | Oracle |
|---|---|---|---|
| author homes | **BH-B4b-content** (incremental, per owning WS) | redistribute each CLAUDE.md contract → its tagged canon home; author dependencies.md TABLE; instrument-chassis README; add CANON_TOKENS + canonTokensSound + canonAccumulationSound + content-real auditCanonHomes | `auditCanonHomes()` drains 15→0 + `canonTokensSound().ok` + `canonAccumulationSound` clean (C1) |
| re-point readers | **BH-B5c** [WS12] | structure-sync delegation + §2a-fix main-guard + png split; doc-consistency DEPS-table + vitest fixture; split-chars/accent-tone drop; 8 readers → `readCanon`; 2 crashers killed; ci.yml re-emit | C2 scan = 0 readers (dead-constant excluded) |
| the delete | **BH-B4f** (ABSOLUTE LAST act of the 5.0.0 cut, task #63) | `rm CLAUDE.md` | `proof:claude-deletable` flips C3 → GREEN; `--run full` /tmp dry-run = no ENOENT, no 7th red |

Sequenced AFTER WS12 (the last src/ paint mutation) so the accumulation scan sees every minted contract before the delete. The 5.0.0 tag (task #63) is USER-GATED; B4f follows the tag, the irreversible final act.

---

## 10. FEASIBILITY + RESIDUAL RISK + CONVERGENCE

**Feasible — every dependency on disk at `6369ad6e`:**
- `canon-doc.mjs` seam (`readCanon` strict/soft, `canonDoc`, `auditCanonHomes` existence-stub) + `regen-structure.mjs` (`--check` byte-exact, exit-1) exist;
- the colocated-README pattern is established (dock/easing/handmark/spa-view); instrument-chassis follows it (P4 §3 content);
- the parser rewrite resolves to a DELEGATION + a DEPS re-home + 8 uniform `readCanon` swaps + 2 clause DROPs — no novel parsing machinery, no `structureEnumerates` helper to mint;
- the accumulation guard + content-real audit + `canonTokensSound` + the B4f gate are small additive `canon-doc.mjs` / pure-detector changes.

**Residual risks the execution owns (each bounded):**
1. **§2a-fix main-guard is a HARD prerequisite** — without it, importing `generateStructureMd` prints the file to stdout + pollutes gate output. One-line fix, flagged.
2. **dependencies.md MUST be a PARSEABLE TABLE** (§2b) — else `citedDeps()` reads zero deps. Add the `citedDeps(depsDoc).size >= N` non-vacuity assert.
3. **The doc-consistency vitest fixture rewrite** (box-tree → DEPS-table) is part of the B5c deliverable; the unit test fails after the rewrite unless co-moved.
4. **`proof:readme-meta-clean` is the one multi-home reader** (peer line → dependencies; phantom-name negatives → cross-canon scan; luma RESERVE → glass-system) — its re-point is not a 1:1 home swap; verify at B5c. *(Recorded the ~10% residual.)*
5. **The untagged-late-contract residual** (§4d) — a late wave appending prose WITHOUT a heading/bold-lead tag escapes the scan. Per-wave discipline DOC + code review is the backstop. LOW (the convention tags every contract).
6. **Reader-less home anchors are author-controlled** (§3b — conventions/design-axes/motion-system/exports-subpaths) — pick STABLE anchors B4b-content guarantees, else C1 reds on a home no reader gates. LOW.

**Convergence:** the WHAT (12-site census exact + 2 crashers + 8 re-home keys + the legacy accumulation scope + the README 5-vs-28 resolution + useBloomUp keep) is fully disk-verified — **~96%**. The HOW (`auditCanonHomes` content-real + `CANON_TOKENS` + `canonTokensSound` defined + `canonAccumulationSound` widened + `proof:claude-deletable` C1/C2/C3 + 5 bites + the structureEnumerates DROP + the /tmp dry-run protocol) is specified to drop-in code — **~88%** (the readme-meta multi-home split + the reader-less anchor choices + the untagged residual are the open ~12%). **passConvergencePct (this gap): 90.**

**buildPhaseDeferred: TRUE** — the APPROACH is fully de-risked (every mechanism disk-grounded, every self-test bite runnable device-free NOW), but the BINDING integration proof (the `--run full` /tmp dry-run with ALL 15 homes authored + ALL 12 readers re-pointed + the actual `rm CLAUDE.md`) genuinely needs the full migration LANDED — it is a build-phase act by construction (B4f is "the absolute last act"). NOT hardware/Metal-deferred — migration-completeness-deferred.
