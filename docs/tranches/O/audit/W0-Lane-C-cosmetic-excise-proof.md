# O.W0 Lane C—Cosmetic legacy excise (Rα E1-E4 + K7 + K8 + K9 verify)

**Status**: landed.
**Lane mode**: orchestrator-direct (no agent dispatch; ≤ 10-line per-file edits, no worktree warranted).
**Files touched**: 7 (one in-file alias retire + 1 metaballs comment rename + 5 docstring rewords + 1 Section.vue rephrase).

## § Disposition (per-finding verdict)

Per W0.md Lane C cohort + Rα E1-E4 + KEEP-with-rename K7-K9:

| ID | File | Disposition | Evidence |
|---|---|---|---|
| **E1** | `src/components/custom/metaballs/useMetaballs.ts:105-106` | RETIRED | `probeWebGLSupport` local alias deleted; 2 remaining references (line 121 callsite + line 156 comment) renamed to `isWebGLSupported`. Source-of-truth function at line 94 (unchanged). Grep verifies zero `probeWebGLSupport` references at HEAD. |
| **E2** | `src/composables/index.ts:6-8` | TRIMMED | L.W2 closure-history prose collapsed from 13 lines to 8 lines; cross-link to `docs/tranches/L/FINAL.md` for full history. No semantic change to the barrel structure. |
| **E3** | `src/freshness.ts:13-15` | REWRITTEN | Docstring no longer claims "dynamic import + tiny pure-TS fallback that matches the script's algorithm"—actual impl is a single pure-TS walk. New prose cites `docs/tranches/O/research/Repsilon-pipeline-orchestration.md` for the duplication tracking + O.W5 Lane C for DRY extract. |
| **E4** | `src/components/custom/timeline/GlassTimeline.vue:52, :547` | REPHRASED | Two "backward-compatible" cite-sites rephrased: line 52 prop docstring → `/** Variant—default scrubber. */`; line 547 SFC comment → `<!-- Scrubber variant (default) -->`. |
| **K7** | `src/components/custom/pulse/Pulse.vue:8` + `src/components/ui/progress/Progress.vue:48, :51` | REPHRASED | Three "back-compat" cite-sites rephrased: `(default; back-compat)` → `(default)` at Pulse:8; `(back-compat)` → trailing period removed at Progress:48; `Same back-compat shape from v1.0.x` → `Default variant from v1.0.x` at Progress:51. |
| **K8** | `src/components/custom/labeled-field/LabeledField.vue:23` | REPHRASED | `stay intact for back-compat (per the B5 §5.5 keep-wrappers path)` → `stay intact for API ergonomics (per the B5 §5.5 keep-wrappers path)`. The 4-wrapper preservation is intentional API-tier ergonomics, not legacy compat. |
| **K9** | `src/components/ui/section/Section.vue:23-25` | KEEP-with-rephrase | `.section-label` utility itself preserved per O11/a verification (10 word-frontend consumer sites). Docstring wording rephrased from "back-compat utility" → "direct consumption (10 word-frontend consumer sites; L invariant 8)". |

## § File changes summary

```
$ git diff --stat src/
 src/components/custom/labeled-field/LabeledField.vue |  2 +-
 src/components/custom/metaballs/useMetaballs.ts      |  7 ++-----
 src/components/custom/pulse/Pulse.vue                |  2 +-
 src/components/custom/timeline/GlassTimeline.vue     |  4 ++--
 src/components/ui/progress/Progress.vue              |  4 ++--
 src/components/ui/section/Section.vue                |  4 ++--
 src/composables/index.ts                             | 10 ++--------
 src/freshness.ts                                     | 15 +++++----------
 8 files changed, 17 insertions(+), 31 deletions(-)
```

Net −14 LOC; comment normalization only (no semantic / runtime change).

## § Verification

```
$ grep -rn 'back-compat\|backward-compat\|Backwards-compatible' src/
src/styles/tokens.css:198:       Semantic aliases re-point into the scale—no back-compat shims.
src/styles/utilities.css:355:       sibling selector preserves single-slot back-compat: when a consumer
```

Two remaining mentions, both intentional explanatory prose about design choices (no shims kept; sibling-selector technique preserves single-slot pattern). Satisfies W0 hard gate (`post-Lane-C count should be ≤ 2`).

```
$ grep -n 'probeWebGLSupport' src/components/custom/metaballs/useMetaballs.ts
(zero matches)

$ grep -n 'isWebGLSupported' src/components/custom/metaballs/useMetaballs.ts
88: * Synchronous WebGL availability probe. Exported as `isWebGLSupported` so
94:export function isWebGLSupported(): boolean {
121:    const isSupported = ref(isWebGLSupported());
156:        // isWebGLSupported() already gated on getContext; the in-init
```

Function definition (line 94) + export (line 88 docstring) + 2 callsites (lines 121 + 156 comment). Zero stale references.

```
$ npx vue-tsc --noEmit
(exit 0; no output—clean)
```

## § Open questions for orchestrator

- The two surviving `back-compat` mentions (`styles/tokens.css:198`, `styles/utilities.css:355`) are intentional design statements—should we additionally rephrase to remove the term entirely (anti-`legacy-vocabulary` posture)? The W0 hard gate accepts ≤ 2 intentional mentions; leaving them is plan-correct. Folding the rephrase into a doc-tier wave at O.W4 if surfaced.

## § Worktree diff verification

This lane is orchestrator-direct (no worktree). All edits applied directly to the main tree at `/Users/mkbabb/Programming/glass-ui/src/...`. The W0 close commit captures the 8 file diffs alongside the precept submodule pointer bump (Lane B) and the AB plan folder (Lane A).
