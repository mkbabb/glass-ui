# PASS-1 PROTOTYPE-AUGMENTED SPEC — P-CLAUDE-DELETE

**Item:** "The BH CLAUDE.md-delete safety: structure.md parser rewrite + accumulation discipline + ENOENT-crasher guard"
**Pass:** 1 · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `6369ad6e` (re-verified live)
**Author fence:** READ-MOSTLY. Verified every claim on disk at `6369ad6e`; wrote ONLY this file under `RESPEC/`. No `src/demo/styles/scripts` edits. `verify-siblings-intact --quiet` exit 0 before + after.
**Supersedes-and-extends:** `pass-1-proto-P4.md` (the prior census/auditCanonHomes proto). This pass CORRECTS P4's load-bearing error (it labelled the 4 §Structure readers "regex unchanged" — they are a **per-reader parser rewrite/retarget**, the single biggest unscoped item) and ADDS the accumulation discipline + the CANON_TOKENS drift resolution the synthesis flagged OPEN.

**Feasibility verdict: FEASIBLE (high confidence).** Every dependency exists on disk: the `canon-doc.mjs` seam (`readCanon` strict/soft), the GENERATED `docs/canon/structure.md` (regen-structure already emits it), the colocated-README pattern, the `regen-structure --check` byte-exact drift check. The parser rewrite resolves to a DELEGATION (structure-sync → regen-check) + a small flat-bullet helper (split-chars/accent-tone) + a DEPS-table re-home (doc-consistency). The 2 ENOENT-crashers swap `readFileSync`→`readCanon` strict. The accumulation hole closes with a `canonAccumulationSound()` scan over the live CLAUDE.md. The chain B4b-content → `auditCanonHomes()` GREEN → B5c re-point → `rg=0` → B4f delete is buildable and provably ordered by the C3 last-act backstop.

**The headline this pass nails:** the structure.md migration is NOT a path swap. `regen-structure.mjs` emits **flat bullets** (`## src/components/custom (50 dirs)` + `- name/`), while all 4 §Structure readers parse a **CLAUDE.md ASCII box-drawing tree** (`│   │   ├── name/`). The box-drawing regexes match ZERO lines in the generated file. Re-pointing the `readFileSync` path WITHOUT rewriting the parser produces a SILENT VACUOUS PASS (0 dirs parsed → set-equality trivially "matches" an empty doc, or the single-dir check silently fails-soft) — the exact close-class lie the BH migration exists to kill.

---

## 0. VERIFIED GROUND TRUTH (this agent's disk checks at `6369ad6e`)

| Check | Command | Result |
|---|---|---|
| siblings intact | `node scripts/verify-siblings-intact.mjs --quiet` | **exit 0** (before + after) |
| generated structure.md format | `cat docs/canon/structure.md` | **FLAT BULLETS** — `## src/components/custom (50 dirs)\n\n- animated-digit/\n- aurora/…`. NO box-drawing chars. |
| the 4 §Structure readers (box-drawing) | `grep -ln '├──\|└──\|│' scripts/*.mjs` | `proof-claude-structure-sync` · `proof-doc-consistency` · `proof-accent-tone` · `proof-split-chars` |
| `auditCanonHomes()` live | `node -e 'import…'` | **1 absent: `component:instrument-chassis`** (the dangling key); `CANON_HOMES` = **15 keys** |
| instrument-chassis README | `ls src/.../instrument-chassis/README.md` | **ABSENT** (P4's §3 authored content stands) |
| `auditCanonHomes` wired? | `grep -rln 'from.*canon-doc' scripts/*.mjs` | **0 importers** — still an UNWIRED dead export (P4 finding holds) |
| canon stubs | `ls -la docs/canon/` | 9 cross-cutting + README; **604–2555 B raw** (skeleton size — the MIN_CANON_BYTES=200 floor never bites) |
| 2 ENOENT-crashers | `proof-claude-structure-sync:74` · `proof-doc-consistency:197` | raw `readFileSync(CLAUDE_MD,"utf8")` **no fallback** → THROW on delete |
| `useBloomUp` consumers | `grep -rl useBloomUp src/ demo/` | **18 files** (published via `motion/index.ts:61`) → 15-consumer published primitive → **KEEP-IN-PLACE** (B2.4a relocate premise is BACKWARDS) |
| `regen-structure` import safety | `regen-structure.mjs:68,93` | top-level `generateStructureMd()` + `process.stdout.write` run **ON IMPORT** (no main-guard) — a blocker for the structure-sync delegation (§1a) |

---

## 1. HAZARD 1 — THE structure.md PARSER REWRITE (the load-bearing deliverable)

The 4 §Structure readers parse CLAUDE.md's box-drawing tree. After B4f the tree is gone; the generated `docs/canon/structure.md` is flat bullets. Each reader needs a per-reader retarget — NOT a path swap. The exact current parse + the exact rewrite per reader:

### 1.0. The exact box-drawing regexes today (what breaks)

| reader | site | current regex (box-drawing) | matches in flat structure.md? |
|---|---|---|---|
| `proof-claude-structure-sync` | `parseDoc()` `:76` header, `:96` dirs | header `/^│\s+├──\s+custom\/\s+#.*custom package dirs/` ; dir `/^│\s+│\s+├──\s+([a-z0-9][a-z0-9-]*)\/(?:\s\|$)/` | **NO** (0 dirs → `doc.found=false` → "parse anchor drifted" violation, OR if header re-pointed, set-equality over an EMPTY dir list REDs every disk dir) |
| `proof-doc-consistency` | `citedCustomDirs()` `:89,97` | header `/^(\s*│?\s*)[├└]──\s*custom\/\s/` ; dir `/[├└]──\s+([a-z0-9][a-z0-9-]*)\/(?:\s\|$)/` | **NO** (0 cited dirs → DIRS arm vacuous-green; DEPS arm reads the §Dependencies table — also gone) |
| `proof-split-chars` | `:289` | `/│\s+│\s+├──\s+split-chars\//` | **NO** → `inClaudeStructure=false` → **HARD SP6 violation** (`:309`) |
| `proof-accent-tone` | `:353` | `/│\s+│\s+├──\s+selectable-chip\//` | **NO** → `inClaudeStructure=false` (soft fact, not a violation — recorded only) |

### 1a. `proof:claude-structure-sync` — DELEGATE to the generator (NO parser survives)

structure.md is GENERATED from disk by the SAME colocated-barrel glob (`readTree`). The STRONGEST possible "enumeration ≡ disk" check is therefore "is the generated file byte-fresh?" — which `regen-structure --check` already is, and it is byte-exact (a strict superset of the old set-equality). So structure-sync DROPS its box-drawing `parseDoc()` entirely and delegates:

```js
// proof-claude-structure-sync.mjs (B5c rewrite — the box-drawing parseDoc DELETED)
import { generateStructureMd } from "./regen-structure.mjs";   // ← requires §1a-fix below
import { canonDoc } from "./lib/canon-doc.mjs";

function run() {
    const violations = [];
    const home = canonDoc("structure");                 // docs/canon/structure.md
    if (!existsSync(home)) {
        violations.push("docs/canon/structure.md ABSENT — run `node scripts/regen-structure.mjs --write`");
    } else {
        const onDisk = readFileSync(home, "utf8");
        const fresh = generateStructureMd();             // re-derive from disk
        if (onDisk !== fresh)
            violations.push("docs/canon/structure.md STALE vs disk — a custom/ui/composable dir drifted; run `node scripts/regen-structure.mjs --write`");
    }
    // … the png-integrity arm SPLITS OUT (§1a-png below) …
}
```

This eliminates the parser rewrite for the largest reader AND makes the check stronger (byte-exact, covers ui/ + composable/ too, not just custom/). Two required co-edits:

- **§1a-fix — guard `regen-structure.mjs`'s CLI block.** Today lines 68 + 93 run `generateStructureMd()` + `process.stdout.write` AT TOP LEVEL on import (verified). Importing it from structure-sync would print the whole file to stdout. B5c MUST wrap the CLI block behind the house main-check before exporting the function for import:

  ```js
  // regen-structure.mjs — the CLI block moves inside the main-guard
  import { pathToFileURL } from "node:url";
  export function generateStructureMd() { /* unchanged */ }
  if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
      const generated = generateStructureMd();
      // WRITE / CHECK / print — the existing CLI body, moved in here
  }
  ```

- **§1a-png — split the png-integrity arm to `proof:visual-png-tracked`** (the BH plan B5c names this split). structure-sync's `untrackedVisualPngs()` git-arm (`:47–57`) is ORTHOGONAL to the structure check — it asserts every un-ignored visual png is git-tracked. Carve it to a new `proof-visual-png-tracked.mjs` (same `tags`, the git-ls-files body byte-moved), so the delete of the box-drawing parser does not strand the png assert. Both gates register in `gates.mjs`.

### 1b. `proof:doc-consistency` — drop DIRS, re-home DEPS (with a parseable table)

The gate's two arms are DIRS (cited `custom/<dir>` resolves) + DEPS (Dependencies-table package resolves in package.json). After migration:

- **DIRS arm — DROP it.** A dangling-citation is STRUCTURALLY IMPOSSIBLE in a generated-from-disk structure.md (every bullet is `existsSync`-true by construction; `regen --check` is the freshness guarantee). The DIRS arm is fully superseded by §1a's delegation. Removing it is the clean-break (no orphan box-drawing parser).
- **DEPS arm — re-home to `readCanon("dependencies")`.** The §Dependencies table moves to `docs/canon/dependencies.md` at B4b-content. **PRECONDITION (content):** B4b-content MUST author the deps as a PARSEABLE markdown table (the current stub `docs/canon/dependencies.md` is PROSE — `vue · reka-ui · @vueuse/core …` — which `citedDeps()`'s `| `pkg` |` parser cannot read). The B4b-content deps table must mirror CLAUDE.md's `| Package | Role |` form so `citedDeps()` parses it UNCHANGED:

  ```markdown
  ## Dependencies
  | Package | Role |
  |---------|------|
  | `vue` ^3.5 | Framework |
  | `@mkbabb/keyframes.js` ^5.0.0 | Spring/keyframe runtime |
  …
  ```

  Then `proof-doc-consistency.mjs:197`:
  ```js
  const depsCanon = readCanon("dependencies");          // strict — REDs loud if absent
  const { facts, violations } = detectConsistency({
      claudeMd: depsCanon,     // only the DEPS arm reads it now
      packageJson,
      dirExists: () => true,   // DIRS arm retired — no cited dirs to resolve
  });
  ```
  Cleaner: refactor `detectConsistency` to a DEPS-only `detectDeps({ depsDoc, packageJson })`, and update the vitest fixture (`scripts/__tests__/proof-doc-consistency.test.ts` — currently a box-drawing tree fixture, line 28–31) to the table form. **The test rewrite is part of the deliverable** (the fixture asserts the box-drawing parse today; it must move to the table parse or the unit test fails after the rewrite).

### 1c. `proof:split-chars` (SP6, HARD) + `proof:accent-tone` (a6, soft) — the flat-bullet helper

Both assert "is dir X enumerated in §Structure?" via a single-dir box-drawing regex. Re-home to a flat-bullet membership check over `readCanon("structure")`. Mint ONE shared helper in `canon-doc.mjs` so the two readers do not re-fork:

```js
// scripts/lib/canon-doc.mjs — additive
/** Is `<name>/` a flat-bullet line in the GENERATED structure.md body? */
export function structureEnumerates(structureMd, name) {
    return new RegExp(`^- ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/$`, "m").test(structureMd);
}
```

- **split-chars (`:289` HARD):** `const inClaudeStructure = /│\s+│\s+├──\s+split-chars\//.test(claudeMd);` → `const inStructure = structureEnumerates(readCanon("structure"), "split-chars");`. The SP6 violation message re-points to "the GENERATED docs/canon/structure.md (run regen-structure --write)". Because structure.md is generated-from-disk, this assert is now a guaranteed-green smoke check — KEEP it for the documented intent (a 3rd-party witness the regen ran), or DROP the sub-clause entirely (regen --check via §1a owns enumeration soundness). **Recommend: keep, flat-bullet form** (cheap, preserves the gate's self-documenting clause; zero false-red risk on a generated file).
- **accent-tone (`:353` soft):** `const inClaudeStructure = /│\s+│\s+├──\s+selectable-chip\//.test(claudeMd);` → `structureEnumerates(readCanon("structure","soft"), "selectable-chip")`. Soft mode preserves the WARN-degrade; the fact stays recorded-not-violated.

### 1d. Census of the structure-readers' fate (the §1 closure)

| reader | before (box-drawing) | after (B5c) | parser? |
|---|---|---|---|
| claude-structure-sync | `parseDoc()` set-equality + count | **delegate** to `regen-structure --check` (byte-exact) | parser DELETED |
| doc-consistency | `citedCustomDirs()` DIRS + `citedDeps()` DEPS | DIRS DROPPED; DEPS → `dependencies.md` table | DIRS parser DELETED; DEPS parser KEPT (now over the table home) |
| split-chars | single-dir box regex (HARD) | `structureEnumerates()` flat-bullet | parser SWAPPED (shared helper) |
| accent-tone | single-dir box regex (soft) | `structureEnumerates(…,"soft")` | parser SWAPPED (shared helper) |

**The decision the synthesis demanded ("rewrite each OR make regen emit a tree"):** REWRITE/RETARGET each — NOT emit a redundant tree. Emitting a box-drawing tree into the generated file would (a) duplicate the enumeration in two formats inside one generated file, (b) couple the generator to the exact CLAUDE.md indentation the readers happen to match, (c) preserve dead parsers. The retarget is cleaner: structure-sync delegates (no parser), doc-consistency drops DIRS, the two single-dir readers share ONE 1-line flat-bullet helper.

---

## 2. HAZARD 2 — THE accumulation discipline + the CANON_TOKENS drift resolution

### 2a. The hole (re-stated precisely)

CLAUDE.md is the LIVE canon, mutated by EVERY BG wave carrying a `claudeMdNote` (15 BG specs append; WS5/WS6/WS8/WS9 mint NEW contracts). `auditCanonHomes()` C1 is a HEAD-snapshot manifest (`CANON_TOKENS` frozen at the B4b-skeleton authoring instant). A contract minted by a LATER wave that appends to CLAUDE.md has NO `CANON_TOKENS` entry and NO home → at B4f it is SILENTLY LOST with the gate green. The synthesis: "the deepest hole."

### 2b. The CANON_TOKENS drift contradiction (resolve it)

P4's §2a declared `CANON_TOKENS` ("declared once, cannot drift") but §5 kept each gate's own inline regex ("regexes unchanged"). **These contradict.** Resolution — make CANON_TOKENS the SINGLE SOURCE the re-pointed gates IMPORT:

```js
// the re-pointed gate runs the MANIFEST patterns, not an inline copy
import { readCanon, CANON_TOKENS } from "./lib/canon-doc.mjs";
const body = readCanon("component:instrument-chassis");
for (const re of CANON_TOKENS["component:instrument-chassis"])
    if (!re.test(body)) violations.push(`canon home missing contract token /${re.source}/`);
```

- **CANON_TOKENS holds the SHARED MINIMUM contract token(s) per home** — the patterns `auditCanonHomes()` checks AND the re-pointed gate asserts (ONE definition, two consumers — §5 ≥2-consumer bar).
- **A gate that asserts a SUPERSET keeps its extra asserts, clearly scoped** (e.g. `surface-axis` asserts BOTH `Toast surface=` AND `Button surface=`; the manifest holds the shared "surface=" anchor, the gate keeps the two doc-honesty sub-asserts as gate-local). The "declared once" claim is SCOPED to the home-presence token, NOT every gate's full assertion surface. Record this scope in the canon-doc.mjs header.
- **Drop P4's "regexes unchanged" line** (it was the contradiction). The gate's CANON token-check IS the manifest import; only a gate's gate-local SUPERSET asserts stay inline.

### 2c. The per-wave discipline (the prevention) + the machine lock (the detection)

**Discipline (DOC — added to the canon-doc.mjs header + the BH execution prompt):** a wave that carries a `claudeMdNote` (mints/edits a contract) MUST in the SAME diff (1) author/append the contract prose into its canon home, AND (2) add the contract's anchor token to `CANON_TOKENS[home]`. "claudeMdNote → canon home + CANON_TOKENS entry" is the wave's done-bar, not just the CLAUDE.md append.

**Machine lock — `canonAccumulationSound()` (added to canon-doc.mjs, consumed by the B4f gate's C1):** while CLAUDE.md STILL EXISTS (pre-B4f), scan it for the tranche-minted contract anchors and assert each is covered by some canon home. Scope to the THIS-TRANCHE tags so the scan is tractable (CLAUDE.md has 100s of legacy headings; only the new ones are the accumulation risk):

```js
// scripts/lib/canon-doc.mjs — additive
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const CLAUDE_MD = resolve(ROOT, "CLAUDE.md");
// The tranche-minted contract anchors: `### … (BG.W-X)` / `**… (BH.B…)**` /
// `(BG.W-FOO)` tags appended this tranche. A contract minted late carries one.
const TRANCHE_TAG = /\b(BG\.W-[A-Z0-9-]+|BH\.B[0-9][0-9a-z.-]*)\b/g;

/**
 * Accumulation guard. While CLAUDE.md is present, every tranche-minted contract
 * anchor it carries must appear in SOME canon home (the home that re-homes it).
 * Returns the list of un-homed tags (empty = every minted contract has a home).
 * After CLAUDE.md is gone the scan is vacuously empty (the contracts already moved).
 */
export function canonAccumulationSound() {
    if (!existsSync(CLAUDE_MD)) return { unhomed: [], claudePresent: false };
    const claude = readFileSync(CLAUDE_MD, "utf8");
    const minted = new Set();
    for (const m of claude.matchAll(TRANCHE_TAG)) minted.add(m[1]);
    // The union of every canon home body (the redistribution targets).
    const homeBodies = Object.values(CANON_HOMES)
        .map((rel) => { const p = resolve(ROOT, rel); return existsSync(p) ? readFileSync(p, "utf8") : ""; })
        .join("\n");
    const unhomed = [...minted].filter((tag) => !homeBodies.includes(tag));
    return { unhomed, claudePresent: true, mintedCount: minted.size };
}
```

The accumulation guard is the load-bearing answer to "a WS8 contract appended to CLAUDE.md silently lost": if WS8 appends `### The X register (BG.W-X)` to CLAUDE.md but never re-homes it, the tag `BG.W-X` is in `minted` but in no home body → `unhomed:["BG.W-X"]` → C1 RED. The migration cannot complete until every minted tag has a home. (Tractable scope; the legacy non-tagged canon is covered by the per-home CANON_TOKENS anchors. A late-wave contract WITHOUT a tag is the residual gap — the per-wave discipline DOC + code review is the backstop; record it.)

---

## 3. HAZARD 3 — THE 2 ENOENT-crashers (guard FIRST)

`proof-claude-structure-sync.mjs:74` + `proof-doc-consistency.mjs:197` both call raw `readFileSync(CLAUDE_MD,"utf8")` with NO fallback. After B4f → ENOENT THROW → the gate CRASHES (no JSON artifact written; the harness mis-reads; a throw in `--run full` can ABORT the whole battery — strictly WORSE than a RED). These two are also the gates whose ENTIRE PURPOSE is the §Structure/§Dependencies read, so they do not "re-home a contract" — they RETARGET (§1a/§1b) AND swap to the fail-explicit seam:

- **structure-sync:** the `readFileSync(CLAUDE_MD)` is DELETED outright (§1a delegates to `regen-structure --check` + `canonDoc("structure")`). No raw read survives.
- **doc-consistency:** `readFileSync(CLAUDE_MD)` → `readCanon("dependencies")` (strict). `readCanon` THROWS a NAMED, intentional error ("home for X is ABSENT … re-home before re-pointing") — but that is the FAIL-EXPLICIT contract the seam ships for, fired ONLY if the dependencies home was never authored (a B4b-content slip the close gate §5 C1 already catches BEFORE B5c re-points). After B4b-content authors `dependencies.md`, `readCanon` returns the body, no throw.

**The guard ordering (load-bearing):** B5c re-points these 2 crashers in the SAME wave that re-points the 12 RED-ers (no partial). The B4f gate's C2 (§5) scans the LIVE tree for any surviving raw-`readFileSync(…CLAUDE…)` site → if B5c forgets either crasher, C2 RED holds the delete. An undercount of 2 (the plan's named failure mode) is mechanically impossible: C2 is a tree scan, not a hand-list.

---

## 4. CONTENT-REAL `auditCanonHomes()` (corrected byte-floor)

P4's §2a form stands — a per-key CANON_TOKENS check (present AND non-trivial AND carrying its contract token). TWO corrections this pass:

- **Drop/raise the dead `MIN_CANON_BYTES=200` floor.** Verified: the canon stubs are 604–2555 B RAW (skeleton), so a 200-byte non-ws floor NEVER bites (every skeleton clears it). The CONTENT-real check is the TOKEN-presence, not a byte count. Decision: **the token-presence IS the content gate; keep a byte floor only as a generous backstop set ABOVE skeleton size.** The skeletons strip to ~400–2000 non-ws B; set `MIN_CANON_BYTES = 400` and document it as "a backstop below which even a token-present home is a stub" — OR drop it entirely and rely on tokens (cleaner; a token-bearing home that is too short is implausible). Recommend: **drop the byte floor, keep tokens as the sole content gate** (no misleading dead constant; the synthesis's preference).

```js
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

- **WIRE it.** P4's finding holds at `6369ad6e`: `auditCanonHomes` has ZERO importers — it REDs no close today. The B4f gate (§5) is its FIRST consumer. "Content-real" without "wired" is still inert.

The manifest IS the B4b-content completion oracle: while CLAUDE.md is the live source, the stubs miss their tokens → `auditCanonHomes()` returns ~14 `missing-token` rows + 1 `absent` (instrument-chassis) → the B4f gate is born-RED. Each B4b-content redistribution clears one row. `auditCanonHomes() === []` is the measurable `15 → 0` drain — "~15% done" becomes a number.

---

## 5. THE B4f GATE — `proof:claude-deletable` (the single delete-precondition oracle)

ONE born-RED gate, GREEN exactly when the delete is safe. Pure-detector house pattern (mirrors `proof:precept-current` / `proof:ship-attestation`'s born-RED-tag-blocker shape). Script: `scripts/proof-claude-deletable.mjs`; `tags:["local","ci"]`; registered in `gates.mjs`.

### 5a. The clauses

- **C1 — content-real canon homes + accumulation.** `auditCanonHomes() === []` (§4 — every home present + token-bearing) AND `canonTokensSound().ok` (1:1 home↔token, no token-less home) AND `canonAccumulationSound().unhomed === []` (§2c — every tranche-minted CLAUDE.md contract has a home). *(Born-RED at HEAD: ~14 missing-token + 1 absent + N un-homed late tags.)*
- **C2 — zero surviving hard CLAUDE.md readers.** A scoped scan of `scripts/**.mjs` for a READ of the CLAUDE.md path = 0. Distinguish a READ from a DEFINED-BUT-UNREAD path constant (the `proof-expandable-part:66` false-positive). Operational floor: `rg -n '(readFileSync|safeRead|readRel|\brd|\bread)\([^)]*CLAUDE' scripts/*.mjs` returns nothing AND every file defining `CLAUDE_MD: resolve(...,"CLAUDE.md")` either deletes the key or never passes it to a reader. *(Born-RED at HEAD: 16 content-reads.)*
- **C3 — the file is the LAST act.** While `existsSync(CLAUDE.md)` the gate STAYS RED (`claudePresent:true`). It cannot pre-green: incremental B4b-content (amendment #5) drains C1 EARLY, but C3 holds RED until B4f flips it. After B5c re-points all readers AND B4b-content fills all homes, the gate is GREEN-but-for-C3; the delete flips C3 → whole gate GREEN, proving the delete was safe at the instant it happened.

### 5b. The ≥2-consumer accounting (the manifest + the helper)

- **`CANON_TOKENS`** is consumed by (1) `auditCanonHomes()` (the home-audit) AND (2) each re-pointed reader gate that imports `CANON_TOKENS[key]` (§2b). Two binary consumers, declared once — the ≥2 bar met by construction.
- **`structureEnumerates()`** (§1c) is consumed by `proof-split-chars` AND `proof-accent-tone`. Two consumers.
- **`canonDoc("structure")` / `regen-structure --check`** is consumed by `proof-claude-structure-sync` AND the `proof:visual-png-tracked` split sibling reads the same root. The generated-home is the single structure source for all four ex-readers.

### 5c. The self-test bites (forgery-proof — the house discipline)

1. a synthetic canon home missing its token → **C1 REDs** (proves content-real, not existence-only);
2. a synthetic `### Foo (BG.W-PHANTOM)` appended to a CLAUDE.md fixture with no home → **C1 `canonAccumulationSound` REDs** (proves the accumulation guard has teeth — the deepest-hole bite);
3. a synthetic surviving `safeRead(P.CLAUDE_MD)` reader in a fixture → **C2 REDs** (proves the reader scan bites);
4. a synthetic `CLAUDE_MD: resolve(...)` defined-but-unread fixture → **C2 does NOT red** (proves the dead-constant false-positive is excluded — the proof-expandable-part class);
5. a dangling `CANON_HOMES` key whose home is absent → **C1 REDs `reason:"absent"`** (the instrument-chassis class);
6. a synthetic box-drawing-only structure.md (no flat bullets) fed to `structureEnumerates` → returns false → **the parser-rewrite regression bite** (proves §1c is the flat-bullet form, not the dead box-drawing form).

### 5d. The ordered close chain (what gates what)

```
B4b-content   redistribute each CLAUDE.md contract → its canon home (incremental,
              per owning wave: motion-system after WS2, glass-system+READMEs after
              WS3/WS8, handmark after WS9, de-shadcn after WS10; author the ~28
              missing component READMEs)
   └─ oracle: auditCanonHomes() drains 15 → 0  +  canonAccumulationSound clean   (C1)
B5c           re-point all readers THROUGH canon-doc.mjs:
              · structure-sync → regen-check delegation (parser DELETED, §1a) + png split
              · doc-consistency → DIRS dropped, DEPS → dependencies.md table (§1b)
              · split-chars/accent-tone → structureEnumerates() flat-bullet (§1c)
              · the 12 RED-ers → readCanon("<key>") strict, run CANON_TOKENS[key]
              · the 2 ENOENT-crashers → readFileSync DELETED/→readCanon strict (§3)
              · re-emit ci.yml (gates:emit-ci) — proof:gen-ci-fresh GREEN
   └─ oracle: zero hard readers (rg=0, dead-constant excluded)                    (C2)
B4f           rm CLAUDE.md — the irreversible act, ABSOLUTE LAST
   └─ oracle: file absent + C1 + C2 still green → proof:claude-deletable GREEN    (C3)
```

The de-risk guarantee: B4f is mechanically blocked until C1 (every contract re-homed + token-present + no un-homed late tag) and C2 (every reader re-pointed, both crashers killed) are green. The C3 last-act backstop makes incremental B4b-content (amendment #5) SAFE — early home authoring cannot pre-green the delete.

### 5e. `gates.mjs` registration (drop-in)

```js
{
    id: "proof:claude-deletable",
    cmd: "proof:claude-deletable",
    tags: ["local", "ci"],
    closeDisease: false,  // it is the delete-oracle, not a clobberable meta-gate
    note: "BH.B4f — the CLAUDE.md hard-delete precondition oracle (born-RED the whole tranche → GREEN only at the delete commit; the proof:ship-attestation born-RED-tag-blocker shape). C1 content-real canon homes: auditCanonHomes()==[] (every CANON_HOMES home present + carrying its CANON_TOKENS contract token — the existence-only hole closed) AND canonTokensSound() (1:1 home↔token) AND canonAccumulationSound() (every tranche-minted BG.W-/BH.B contract in CLAUDE.md has a canon home — the 110-wave accumulation hole closed). C2 zero surviving hard CLAUDE.md readers: the scoped scripts/**.mjs scan == 0, distinguishing a read from a defined-but-unread path constant (proof-expandable-part excluded). C3 the file is the LAST act: while CLAUDE.md exists the gate STAYS RED. 6 self-test bites: token-less home REDs C1, an un-homed BG.W- tag REDs C1, a synthetic reader REDs C2, a dead-constant does NOT red C2, an absent CANON_HOMES key REDs C1, a box-drawing structure.md fails structureEnumerates. Bite: re-introduce a readFileSync(CLAUDE.md), leave a home token-less, append a contract to CLAUDE.md without a home, or delete CLAUDE.md before C1∧C2 → RED.",
}
```

---

## 6. THE useBloomUp KEEP-IN-PLACE CORRECTION (B2.4a premise reversed)

The plan's B2.4a calls `useBloomUp.ts` "audit-then-relocate (AppSwitcher-only signal → likely single-consumer relocate)." **BACKWARDS — verified.** `useBloomUp` lives at `src/composables/motion/useBloomUp.ts`, is published via `motion/index.ts:61` (`export * from "./useBloomUp"` → the `/motion` subpath barrel), and has **18 referencing files / 15+ real consumers** (8 demo dock stories + `AppShell.vue` + 2 css + `api/types-extra.ts` + the motion barrel + `dock/README.md` + `useDockContextSilhouette.ts`). It is a 15-consumer PUBLISHED primitive → **KEEP-IN-PLACE**. Relocating it would (a) break the `/motion` public surface (a consumer break with no migration), (b) churn 18 import sites for zero benefit.

This is NOT in `proof:claude-deletable`'s assert surface (it is a carve-discipline fact, not a doc-migration fact), but it is a PRECONDITION the close chain must honour: the doc migration must NOT collaterally relocate `useBloomUp` while re-homing the dock/motion canon prose. Record the KEEP in the B2.4a wave verdict + the dock README (which already references it). The B4b-content motion-system home documents `useBloomUp` as a published `/motion` primitive (it inherits the existing motion-barrel mention — no relocate).

---

## 7. THE VERIFICATION PROTOCOL (the π-equivalent — no pixels; gate-integrity)

This is a DOC/GATE-integrity wave (no painted surface) — the binding verification is a STAGED DRY-RUN in a THROWAWAY `/tmp` worktree (NEVER `~/Programming` — the foreign-tree fence), proving the delete does not crash the battery and surfaces no 7th red:

```
git worktree add /tmp/bg-claude-delete-verify HEAD     # throwaway, /tmp only
cd /tmp/bg-claude-delete-verify
# 1. author all canon homes (B4b-content) + the instrument-chassis README (P4 §3)
# 2. re-point all readers (B5c §1/§3) + add proof-claude-deletable.mjs + CANON_TOKENS/
#    canonAccumulationSound/structureEnumerates to canon-doc.mjs
# 3. confirm GREEN-but-for-C3:
node scripts/proof-claude-deletable.mjs          # C1∧C2 green, C3 RED (file present)
# 4. the irreversible act:
rm CLAUDE.md
# 5. the binding assert — NO ENOENT throw, the whole battery completes, no new red:
node scripts/gates.mjs --run full 2>&1 | tee /tmp/claude-delete-fullrun.log
#    PASS criteria:
#    · NO "ENOENT"/"no such file" in the log (the 2 crashers killed)
#    · proof:claude-deletable GREEN (C3 flipped)
#    · the 4 §Structure readers GREEN (parser rewrite sound, non-vacuous)
#    · proof:gen-ci-fresh GREEN (ci.yml re-emitted)
#    · the close red count == the pre-delete count (no 7th red introduced)
git worktree remove --force /tmp/bg-claude-delete-verify   # clean up the throwaway
```

The 6 self-test bites (§5c) are the per-clause forgery proofs; the `--run full` /tmp dry-run is the integration proof that the delete is SAFE (the cardinal "device-free green ≠ correct" lesson applied to the gate layer — the dry-run is the real act, not a report claim).

---

## 8. FEASIBILITY + RESIDUAL RISK + CONVERGENCE

**Feasible — every dependency is on disk at `6369ad6e`:**
- `canon-doc.mjs` seam + `readCanon` strict/soft exist; `regen-structure.mjs` emits + `--check`s `docs/canon/structure.md` (the generated home is wired);
- the colocated-README pattern is established (spa-view/easing/handmark/dock); the instrument-chassis README (P4 §3) follows it;
- the parser rewrite resolves to a DELEGATION + a 1-line helper + a DEPS re-home — no novel parsing machinery;
- the accumulation guard + content-real audit + the B4f gate are small additive `canon-doc.mjs`/pure-detector changes.

**Residual risks the execution must own:**
1. **`regen-structure.mjs` import side-effect (§1a-fix) is a HARD prerequisite** — without the main-guard, importing `generateStructureMd` from structure-sync prints the file to stdout and pollutes the gate output. Flagged; one-line fix.
2. **B4b-content must author `dependencies.md` as a PARSEABLE TABLE** (§1b), not the current prose stub — else `citedDeps()` reads zero deps and the DEPS arm passes vacuously. The CANON_TOKENS dependencies anchors (`@mkbabb/keyframes.js`, `^5.0.0`) catch presence but not table-parseability; add a `citedDeps(depsDoc).size >= N` non-vacuity assert.
3. **The accumulation guard's tag-scope leaves an UNtagged-late-contract residual** (§2c) — a late wave that appends prose WITHOUT a `BG.W-`/`BH.B` tag escapes the scan. The per-wave discipline DOC + code review is the backstop; record it as the named residual (low — the tranche convention tags every contract).
4. **The doc-consistency vitest fixture rewrite** (`scripts/__tests__/proof-doc-consistency.test.ts`, box-drawing tree → DEPS-table) is part of the deliverable; the unit test fails after the parser rewrite unless co-moved.
5. **Cross-cutting CANON_TOKENS anchors are author-controlled** (conventions/design-axes/motion-system/exports-subpaths are not gate-asserted by a reader today) — pick STABLE anchors B4b-content guarantees, else C1 reds on a home no reader gates. Low risk.
6. **`proof:readme-meta-clean` is the one multi-home reader** (peer line → dependencies; phantom-name negatives → cross-canon scan; luma RESERVE → glass-system) — its re-point is not a 1:1 home swap; verify at B5c (P4 §6.3 holds).

**Convergence:** the WHAT (the flat-vs-box parser break verified on disk; the 4 readers' exact fate; the 2 ENOENT-crashers; the unwired content-real audit; the accumulation hole + its tag-scan lock; the useBloomUp 18-consumer keep) is fully disk-verified — **~95%**. The HOW (the delegation + flat-bullet helper + DEPS re-home + `canonAccumulationSound` + the `proof:claude-deletable` C1/C2/C3 + 6 bites + the /tmp dry-run protocol) is specified to drop-in code — **~88%** (the cross-cutting anchor choices + the readme-meta multi-home split + the untagged-late-contract residual are the open ~12%). **passConvergencePct (this item): 90.**
