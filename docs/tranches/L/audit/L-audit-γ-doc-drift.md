# L.W8 Lane γ — Doc-Drift Audit

**HEAD**: `59b7b56` (refactor(tranche-l/w7): keyframes lift + aurora chrome Option-A unification).
**Date**: 2026-05-12.
**Scope**: every documentation file walked against current source state.
**File bounds**: READ-ONLY everywhere except this proof doc.

---

## § Per-doc walk

### Methodology

For each documentation claim about source state, I verified against the source. Walks: `CLAUDE.md` → `README.md` → `DESIGN.md` → `CHANGELOG.md` → `MIGRATION.md` → `docs/tranches/L/PROGRESS.md` → `docs/tranches/L/L.md` → `docs/tranches/L/waves/W{0..8}.md` → `package.json` exports → `src/index.ts` → `src/api/index.ts`.

### Drift table

| Doc | Drift item | Evidence | Severity |
|---|---|---|---|
| `CLAUDE.md:73` | `aurora/` package note claims `useAuroraStudio` is "demo-private at `demo/stories/aurora/useAuroraStudio.ts`" — but `useAuroraStudio` was RETIRED at L.W7 Lane B. File no longer exists at HEAD. | `find demo/stories/aurora -name "useAuroraStudio*"` returns nothing; `git show v1.0.0:demo/stories/aurora/useAuroraStudio.ts` exists, current tree does not | **P1** |
| `CLAUDE.md:149` (`animations.css` line) | Lists `@keyframes: dialog-in/out, floating-panel-in, collapsible, tooltip, shimmer, sparkle-sweep` — does NOT list `pulse-dot-bounce`, `pulse-ring-spin`, `typewriter-blink` lifted at L.W7 Lane A. animations.css now has 18 @keyframes. | `grep -c "@keyframes" src/styles/animations.css` = 18; lines 177/187/196 are the W7 additions | **P2** |
| `CLAUDE.md:242` | "v1.0 ships **38 flat subpaths** plus `/styles` and `/api`" — actual count is 37 JS subpaths (incl. `/api`) plus `/styles` (CSS) = 38 total exports keys (minus `.`); `/api` is COUNTED inside the 38 not separate. | `grep -oE '"\./[a-z-]+":' package.json \| sort -u \| wc -l` = 38 (incl. `./styles`, `./api`); 37 JS + 1 CSS | **P2** |
| `CLAUDE.md` structure block (lines 26 / 72 / 114) | Comments say `# barrel: all ui/ exports`, `# barrel: ui/ + custom/`, `└── index.ts                    # barrel: ui/ + custom/`. But `src/components/index.ts`, `src/components/ui/index.ts`, and `src/components/custom/index.ts` DO NOT EXIST at HEAD — root barrel uses explicit per-package re-exports (`src/index.ts:83-134`) since L.W1 Lane A. | `ls src/components/ui/index.ts src/components/custom/index.ts src/components/index.ts` all fail | **P1** |
| `CLAUDE.md:167` | "It re-exports the **40** vueuse-free `ui/` package barrels" — actual ui/ packages re-exported from `src/index.ts` is 39 (count of `export * from "./components/ui/..."` lines = 39: 83-121 inclusive; 4 vueuse-bearing skipped, _shared has no barrel). 44 ui packages exist, 4 are vueuse-bearing (input/textarea/combobox/carousel), `_shared` is internal. 44 − 4 − 1 = 39. | `grep -c '"./components/ui/' src/index.ts` = 39 | **P2** |
| `README.md:7` | "44 shadcn-vue / reka-ui base components plus **28** custom composites" — actual custom-package count is 30 directories (`src/components/custom/*`). v1.0 still has 30. | `ls src/components/custom \| wc -l` = 30 | **P2** |
| `README.md:101` | Same as above — `# 28 custom composites` in structure block. | as above | **P2** |
| `README.md:159 / 190` | "**38 flat per-package subpaths**" — actual is 37 JS subpaths (`/api` + `/dark` + `/keyboard` + `/carousel` + `/forms` + 32 others) + `/styles`. The "38" includes `/styles` so the wording is misleading; if the count is "flat per-package" it's 37 not 38. | `package.json` exports count | **P3** |
| `DESIGN.md:1082` | API discovery layer "ships **32 canonical public symbols (24 types + 8 constants)**" — actual breakdown is 28 types + 4 constants = 32 total. Total matches but split is wrong. | `src/api/index.ts` enumerates 12 Aurora types + 3 Aurora constants + 4 Configurator types + 1 Metaball type + 1 Metaball constant + 3 Surface enums + 8 CVA variants = 28 types + 4 constants | **P2** |
| `DESIGN.md:770` | Composable registry table lists `useOffsetPagination` as if active (`pagination` domain). RETIRED at L.W3 Lane A. | line 770 in active table; lines 1020-1021 + 1116-1117 correctly note the retirement | **P1** |
| `CHANGELOG.md:3` | v1.0 header still says "**unreleased**" — but `v1.0.0` tag was pushed at commit `d1de94b` (L.W1 close). Should be dated. | `git show v1.0.0 --no-patch` shows tag on `d1de94b`; CHANGELOG.md:3 says "unreleased" | **P1** |
| `CHANGELOG.md` v1.0 section | **No W7 entry** — W7 landed two consumer-visible changes: (1) `useConfiguratorState<T>` `cloneMode` option (additive); (2) `useAuroraStudio` retired (demo-private; not breaking). Both are in MIGRATION.md (lines 431-449) but neither in CHANGELOG.md. Also W7 keyframes lift unmentioned (internal). | `grep -E '^##\|^###' CHANGELOG.md` shows no W7 heading; MIGRATION.md:431-449 has the cloneMode addition | **P1** |
| `CHANGELOG.md` v1.0 BREAKING — Lane A | The Lane A (root-barrel Phase 2) BREAKING removals are **only enumerated in the preamble** (lines 5-13) — the canonical "### BREAKING — Lane A" subsection enumerating each removed symbol (Input/Textarea/Combobox\*/Carousel\*/useGlobalDark/useKeyboardShortcuts/useCarousel/registerShortcut/...) does not exist. The Lane A reservation comment at line 38 is for W3 absorption, not W1. Consumers reading CHANGELOG cannot see Lane A breaks itemised. MIGRATION.md §1.1-1.4 carries this load alone. | line 38 HTML comment placeholder; no `### BREAKING — Lane A (root-barrel curation)` section exists | **P1** |
| `MIGRATION.md:30 + 399 + 422` | "32 canonical public symbols (24 types + 8 runtime constants)" + "all 24 type aliases erase + only the 4 constants" — total matches but breakdown wrong (28 types + 4 constants). The mention of "4 constants" at line 423 IS correct; "24 type aliases" earlier in same sentence is wrong. | as above | **P2** |
| `MIGRATION.md:386` | Composables-restructure tree shows `└── index.ts (sub-tree re-exports)` — exists; matches. | `src/composables/index.ts` exists | OK |
| `docs/tranches/L/PROGRESS.md:27-34` | Every CLOSED row says `(TBD commit)` instead of the actual commit hash. W0 = `b75ebb2`, W1 = `d1de94b`, W2 = `aace84e`, W3 = `f481ba2`, W4 = `1c1788f`, W5 = `efb802a`, W6 = `ae4cad5`, W7 = `59b7b56`. The PROGRESS.md tracking table is the canonical reference; "TBD" forfeits traceability. | `git log --oneline -20` enumerates the commits | **P1** |
| `docs/tranches/L/waves/W0.md:6 + W1.md:6 + W2-W4.md:6 + W6.md:6` | All "Status" lines say `CLOSED (TBD orchestrator commit)`. None carry a real hash post-W5-bump. The "Status-line bumped at L.W5 Lane A" note implies a content sweep but commit hashes weren't filled in. | each wave-spec status line | **P1** |
| `docs/tranches/L/waves/W5.md:6` | Status says **`IN FLIGHT 2026-05-11`** — but W5 closed at `efb802a` (`docs(tranche-l/w5): v1.0 doc cohort + MIGRATION.md + production-demo-build decision`). Status is STALE. | `git log --oneline` line for W5 close | **P0** |
| `docs/tranches/L/waves/W7.md:6` | Status says **`pending W3 + W4 + W5 + W6`** — but W7 closed at `59b7b56`. Status is STALE. | `git log --oneline` HEAD itself | **P0** |
| `docs/tranches/L/L.md:46` | Invariant 2 — "ι integrity-sweep lane re-runs at L W8 close" — currently in progress (this audit lane is one of the 7). Not drift. | this proof | OK |

### Items verified clean (no drift)

- `MIGRATION.md` covers every CHANGELOG break (and more — see Symmetry check).
- `DESIGN.md` Configurator section (lines 655-678) correctly reflects W7's cloneMode addition and Option-B-rationale retirement.
- 6 research deliverables Rα-Rζ all findable at expected filenames (`docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md`).
- `package.json:exports` resolves the canonical surface; `typesVersions["*"]` mirrors it.
- `src/api/index.ts` shape matches the discovery-layer description (32 symbols total).
- `src/composables` sub-tree count matches CLAUDE.md "8 coherent sub-trees" (`dark/`, `keyboard/`, `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`, `sidebar/`).
- `useStoryDemo` correctly demoted to `demo/composables/useStoryDemo.ts` (CLAUDE.md:309 — verified).
- `<DockShowcaseFrame>` retirement reflected in CLAUDE.md:311 + MIGRATION.md §4.1 + CHANGELOG v1.0 BREAKING — Lane B; absent from demo at HEAD.

---

## § Symmetry check — CHANGELOG.md ↔ MIGRATION.md

Every break must appear in BOTH documents (per L invariant 11: "CHANGELOG.md + MIGRATION.md align with HEAD at L close").

### v1.0 break inventory + cross-doc presence

| Break | CHANGELOG v1.0 | MIGRATION.md | Symmetry |
|---|:---:|:---:|---|
| Root-barrel vueuse-bearing symbols removed (Input/Textarea/Combobox\* → `/forms`) | preamble only (no `### BREAKING — Lane A` section) | §1.1 | **ASYMMETRIC** (CHANGELOG incomplete) |
| Carousel\* + useCarousel → `/carousel` | preamble + `### ADDED — Lane C` line 28-37 (frames as ADDED — break is implicit) | §1.2 | **ASYMMETRIC** (CHANGELOG frames as ADDED; consumer-facing break of root-barrel re-export not enumerated) |
| useGlobalDark → `/dark` | preamble only | §1.3 | **ASYMMETRIC** |
| useKeyboardShortcuts + registerShortcut + ... → `/keyboard` | preamble only | §1.4 | **ASYMMETRIC** |
| Nested `/composables/dark` retired (v0.9.4 transitional) → flat `/dark` | `### BREAKING — Lane C` line 17-21 | §2.1 | OK |
| Nested `/composables/keyboard` retired → flat `/keyboard` | `### BREAKING — Lane C` line 22-23 | §2.2 | OK |
| `useOffsetPagination` removed | `### BREAKING — W3 Lane A` line 46 | §3.1 | OK |
| `useVirtualSectionWindow` removed | line 50 | §3.2 | OK |
| `useWindowedStore` removed | line 53 | §3.3 | OK |
| `virtualSectionLayout` helpers removed | line 55 | §3.4 | OK |
| `/pagination` subpath removed | line 60 | §3.1 | OK |
| `/virtual` subpath removed | line 63 | §3.2 | OK |
| `<DockShowcaseFrame>` retired (demo-private) | `### BREAKING — W3 Lane B` line 86 | §4.1 | OK |
| `useConfiguratorState<T>` `cloneMode` option (additive) | **MISSING** | §"useConfiguratorState gained cloneMode option" (line 431-449) | **ASYMMETRIC** |
| `useAuroraStudio` retired (demo-private) | **MISSING** | line 449 (under cloneMode section) | **ASYMMETRIC** |
| Pulse + Typewriter inline keyframes lifted to animations.css (internal, no public-surface delta) | **MISSING** (no W7 section) | not mentioned (internal) | symmetric-by-absence (P3 — both should at least note it for full audit trail) |
| Production demo build formal retire | `### Production demo build — formal retire` line 117 | §"Production demo build — formal retire" line 521 | OK |
| Composables restructure (internal moves) | `### L.W2 — Composables restructure` line 135 | §5 line 352 | OK |

### Symmetry verdict

- **CHANGELOG.md is consumer-facing thin** for Lane A: the four W1 BREAKING removals (form primitives, carousel family, dark, keyboard) are described only in the v1.0 preamble (lines 5-13); there is no `### BREAKING — Lane A` enumeration block. A consumer reading CHANGELOG.md must follow the cross-reference to MIGRATION.md to find them itemised. Per L invariant 11 "CHANGELOG.md aligned with HEAD" this is asymmetric.
- **W7 is invisible in CHANGELOG.md**: no `### W7` section. MIGRATION.md has it but at the "Recommended new surfaces" tier, not BREAKING (correct — cloneMode is additive). CHANGELOG.md should at least mention the W7 changes for ledger continuity.
- All W3 retirements + Lane C subpath flatten are symmetric. Production-demo-build retire is symmetric.

---

## § Severity summary

| Severity | Count | Definition |
|---|---:|---|
| **P0** | 2 | Wave-spec STALE — W5 says "IN FLIGHT", W7 says "pending" — both closed. |
| **P1** | 7 | (a) CLAUDE.md `useAuroraStudio` claim wrong; (b) CLAUDE.md structure-block barrel files don't exist; (c) DESIGN.md still lists `useOffsetPagination` as active; (d) CHANGELOG v1.0 says "unreleased" but tagged; (e) CHANGELOG v1.0 missing W7 section; (f) CHANGELOG v1.0 missing Lane A BREAKING enumeration; (g) PROGRESS.md + 5 wave specs say "(TBD commit)" instead of hashes. |
| **P2** | 6 | Count drifts: CLAUDE.md 40 vs 39 ui packages; README.md 28 vs 30 custom; CLAUDE.md 38 subpaths phrasing; DESIGN.md + MIGRATION.md "24 types + 8 constants" vs actual "28 + 4"; animations.css keyframes list incomplete (W7 additions not listed). |
| **P3** | 1 | README.md "38 flat per-package" phrasing imprecise (incl. /styles). |

Total drift items: **16**. P0 + P1 weight = 9. Below the K W8 ι integrity-sweep precedent (which flagged 5 P0 silent misses).

---

## § Verdict

**FAIL-WITH-FIXES-REQUIRED**.

The doc cohort is substantially correct but two classes of drift block a clean L close:

1. **Two P0 wave-spec status lines are STALE** (`W5.md` says IN FLIGHT, `W7.md` says pending — both closed). Direct contradiction of L invariant 11 + ι integrity-sweep precedent.
2. **CHANGELOG.md v1.0 is incomplete**: missing the `### BREAKING — Lane A` enumeration block (the four root-barrel removals — the L HEADLINE itself), missing a `### W7` section, and still says "unreleased" despite the `v1.0.0` tag being pushed. A v1.0 changelog that omits the headline-wave's symbol-level removals is a documentation defect, not a stylistic miss.

The P1 cohort also includes a hot-path doc bug (`DESIGN.md:770` lists `useOffsetPagination` as if active) and a stale CLAUDE.md claim (`useAuroraStudio` file path that doesn't exist). Both are reach-for-and-fail consumer experiences.

P2 count-drifts (38 vs 39, 28 vs 30, "24 types + 8 constants" vs "28 + 4") are cosmetic but the same pattern across CLAUDE/README/DESIGN/MIGRATION suggests the count was authored once and propagated without re-verification. Worth a single audit pass.

**Recommendation**: orchestrator absorbs the P0 + P1 items into the W8 close ceremony BEFORE FINAL.md is authored. P2/P3 may carry to a minor docs patch (v1.0.1 or as part of a M-tranche grooming).

### Specific fix list (handoff)

1. `docs/tranches/L/waves/W5.md:6` → status to `CLOSED efb802a`.
2. `docs/tranches/L/waves/W7.md:6` → status to `CLOSED 59b7b56`.
3. `docs/tranches/L/waves/W{0,1,2,3,4,6}.md` Status lines → replace `(TBD orchestrator commit)` with actual hashes (`b75ebb2`, `d1de94b`, `aace84e`, `f481ba2`, `1c1788f`, `ae4cad5`).
4. `docs/tranches/L/PROGRESS.md:27-34` → same hash substitution + add W7 row.
5. `CHANGELOG.md:3` → `## v1.0.0 — 2026-05-11` (the tag date).
6. `CHANGELOG.md` → insert `### BREAKING — Lane A (root-barrel curation)` section enumerating the four symbol cohorts removed from root (forms, carousel, dark, keyboard).
7. `CHANGELOG.md` → insert `### W7 — Substrate cohesion` section: keyframes lift + cloneMode addition + useAuroraStudio retire.
8. `CLAUDE.md:73` → strike the `useAuroraStudio` parenthetical; W7 retired it.
9. `CLAUDE.md` lines 71-72-114 + `src/components/index.ts`-class claims → remove "barrel: ui/ + custom/" comments OR re-instate the barrels (the former is the L.W1 idiomatic choice — strike the comments).
10. `DESIGN.md:770` → strike the `useOffsetPagination` row.
11. `CLAUDE.md` + `README.md` + `DESIGN.md` + `MIGRATION.md` → s/24 types + 8 constants/28 types + 4 constants/ where applicable.
12. `CLAUDE.md:167` → s/40 vueuse-free ui\/ package barrels/39/.
13. `README.md:7 + 101` → s/28 custom composites/30/.
14. `CLAUDE.md` + `README.md` animations.css description → append `pulse-dot-bounce`, `pulse-ring-spin`, `typewriter-blink`.

End audit.
