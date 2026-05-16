# Constellation Manifest — `@mkbabb/*` ecosystem (AB+1 cohort baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: AB+1 cohort window (2026-05-14 18:52 → 22:08, single calendar day).
**Date**: authored retroactively at P.W0 Lane A (2026-05-16); reconstructs the multi-peer state at AB+1 execution time.
**Carries forward from**: O close `8e741ba` (v1.4.1).
**Closes into**: P open (HEAD `b201b03`; v1.7.0 untagged).

## §1 — Driving peer (speedtest AC tranche)

The AB+1 cohort was **driven entirely by speedtest's AC tranche**. Every glass-ui-side commit cites an `AC.W*` wave identifier in its subject; the library-side execution served as substrate provider for the consumer-side AC migration.

| Field | Value |
|---|---|
| Driving repo | `/Users/mkbabb/Programming/speedtest` |
| Driving tranche | AC (in-flight at AB+1 execution time; in-flight at P open) |
| Driving sub-waves | W6a + W6b + W6c + W6d + W8e (5 sub-waves absorbed into AB+1's 5 waves) |
| Glass-ui-side role | substrate provider (READER-ONLY of speedtest's tranche state; WRITER of own substrate) |
| Speedtest-side role | substrate consumer (driver of substrate-need; READER-ONLY of glass-ui internal state) |
| Coordination protocol | speedtest commits AC.W6* on its own branch; glass-ui orchestrator absorbs substrate needs into AB+1 commits citing the AC wave identifier verbatim |

## §2 — AC sub-wave → glass-ui commit mapping

Verbatim from `docs/tranches/P/coordination/CONSTELLATION.md §6` (P open synthesis):

| AC sub-wave | Glass-ui-side absorb | Glass-ui commit | Glass-ui tag | AB+1 wave |
|---|---|---|---|---|
| AC.W6a | Self-host font policy doc | `4660a0d` | (pre-tag) | W1 |
| AC.W6b | Fira Code + Plus Jakarta Sans OFL self-host | `2474440` + `8246e07` | v1.5.0 | W2 |
| AC.W6c | `--phase-color-label` cascade (WCAG label register) | `099910d` | v1.5.1 | W3 |
| AC.W6d (F2.I-04) | Timeline `::before inset -15px` (44×44 WCAG hit area) | `8bf51c4` | (rolled into v1.6.0) | W4 |
| AC.W6d (primitives) | MetricRow + MetricStack + AnimatedDigit | `bb1f15b` | v1.6.0 | W4 |
| AC.W6d (design) | Custom-prop cascade pattern + primitive catalog | `12e7f55` | (rolled into v1.6.0) | W4 |
| AC.W6d (ergonomics) | MetricStack `as` prop TransitionGroup support | `d813c63` | (rolled into v1.6.0) | W4 |
| AC.W6d (release) | v1.6.0 release ceremony | `e238862` | **v1.6.0** | W4 |
| AC.W6 (cross-ref) | CHANGELOG cross-reference header (v1.5.0/v1.5.1/v1.6.0 ↔ AC.W6b/c/d) | `7ddb260` | (rolled into v1.6.0) | W4 |
| AC.W8e | MetricCell + ResponsiveTabs + ToggleGroupItem card variant | `8dad58d` | v1.7.0 (UNTAGGED) | W5 |
| AC.W8e (release) | v1.7.0 release ceremony (package.json bump) | `b201b03` | v1.7.0 (UNTAGGED at HEAD) | W5 |

12 commits / 5 AC sub-waves / 5 AB+1 waves / 4 tag-points (3 placed; 1 deferred).

## §3 — Other peers in the constellation at AB+1 execution time

The AB+1 window touched no other consumer repo. All non-speedtest consumers (keyframes.js, value.js, words, fourier-analysis, bbnf-buddy) sat unmodified at their O-close pin (`file:../glass-ui` references to v1.4.1) throughout the AB+1 cohort.

| Repo | Path | Pin at AB+1 open | Activity during AB+1 | Status at AB+1 close |
|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (origin) | 12-commit cohort; 3 tags placed; 1 deferred | v1.7.0 package.json (untagged) |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | `file:../glass-ui` | driving peer; AC.W6b/c/d/W8e in-flight | AC tranche in-flight; consumer-side adoption status unaudited at AB+1 close |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | `file:../glass-ui` | NONE | unchanged on master at M.W1 pin |
| **value.js** | `/Users/mkbabb/Programming/value.js` | `file:../glass-ui` | NONE | unchanged at WIP branch `c0cc349` |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | `file:../../glass-ui` | NONE | builds at O O-pin per O11/a |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | `file:../../glass-ui` | NONE | mid-migration at O-pin |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | `file:../glass-ui` | NONE | stable at M.W1 pin |
| **precepts** (submodule) | `docs/precepts` | shared | NONE | unchanged at O.W0 advance `46ee7e9` |

No cross-repo writes landed during AB+1. The cohort was entirely glass-ui-internal substrate authoring; consumer adoption work belongs to P.W5 (cross-repo MULTI-WRITER batch).

## §4 — Writer-vs-reader boundary at AB+1 execution time

| Repo | AB+1 role | AB+1 orchestrator may write? |
|---|---|---|
| glass-ui | primary (own tranche, shadow-executed) | yes (the substrate WAS written) |
| speedtest | driving peer (own AC tranche in-flight) | READER-ONLY (per CONSTELLATION.md / O FINAL §5) |
| keyframes.js | own tranche stream | READER-ONLY |
| value.js | M.W1 still on WIP branch | READER-ONLY (user-WIP-ownership; PD-3) |
| words (frontend) | own consumer migration cohort | READER-ONLY |
| fourier-analysis (web) | mid-migration | READER-ONLY |
| bbnf-buddy | own consumer cohort | READER-ONLY |
| precepts (submodule) | shared | READER-ONLY at AB+1 (no precept advance during cohort window) |

The READER-ONLY policy held across the entire AB+1 window — no cross-repo writes; the substrate side stayed pure. Cross-repo CR-* items inherited from O carry intact into P.W5.

## §5 — Process observations (for P invariant 29 candidate)

The AB+1 cohort exhibits the third recurrence of the K-invariant-3 shadow-execution anti-pattern:

| Recurrence | Tranche | Window | Plan folder at execution? | Closure |
|---|---|---|---|---|
| 1st | V | 2026-05-06 → 2026-05-08 (68 commits / 5 releases / ~3 weeks elapsed) | NO | K.WV (2026-05-09) — `docs/tranches/V/V.md` |
| 2nd | AB | post-N close → pre-O open (∼ commits + tags) | NO | O.W0 Lane A — `docs/tranches/AB/` |
| 3rd | AB+1 | 2026-05-14 18:52 → 22:08 (12 commits / 3 tags + 1 untagged bump / 3.5h elapsed) | NO | P.W0 Lane A (this folder) — `docs/tranches/AB+1/` |

The recurrence pattern (V → AB → AB+1) establishes a binding precedent for P-level invariant 29 codification: when a substrate cohort lands ≥ 5 commits or ≥ 1 release tag under a tranche-letter identifier with no plan folder authored at execution time, the next-tranche open MUST author the retrospective in its W0 HEADLINE before any other lane dispatches.

## §6 — Hand-off to P

The AB+1 cohort closes at retrospective publish (P.W0 Lane A). The single library-side carry is the v1.7.0 ceremonial tag (P.W0 Lane B). Consumer-side adoption status across speedtest's AC tranche is reviewed read-only at P.W5 (CR-6 per P findings.md §2.2) — that review is speedtest's own AC tranche scope, not AB+1's.

ZERO cross-repo carries unique to AB+1. The O cross-repo carry-forward ledger (CR-1 through CR-7) inherits intact into P.W5 — none were touched during AB+1. CR-7 (Fira Code woff2 binary fetch) RESOLVED at AB+1.W2 per Pζ §2.2 verification.
