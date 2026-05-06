# H — Post-Close Audit Lane γ (Doc Drift)

**Date**: 2026-05-05.
**Owner**: read-only audit agent (Lane γ of the 4-agent post-close challenge per `docs/precepts/instructions/tranche/SPEC.md` §Close).
**Scope**: walk DESIGN.md + CLAUDE.md + PROGRESS.md + each H wave-spec status line + H.md + H-pre-close.md against the actual source state at HEAD (`13ca1c3 feat(tranche-h/w5): stress runtime profile capture (R2)`); surface stale claims, missing claims, conflicting status, and undeclared brittleness windows.
**Method**: per-doc verification against source artefacts (`src/styles/tokens.css`, `src/tokens.ts`, `src/components/custom/*`, `src/composables/*`, `src/index.ts`, `vite.library.ts`); cross-checked git log against PROGRESS.md commit hashes; compared wave-spec `Status:` lines against PROGRESS.md status table.
**Boundaries**: read-only, no destructive git, no source modifications.

---

## Per-doc findings

### DESIGN.md

| # | Section / Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| D1 | §Z-Index Stack 104–122 | Z-tokens at canon values (overlay 50→120 jump; 120/130/140/150/160/999/9999/99999) | `src/styles/tokens.css:93–109` matches exactly | **clean** |
| D2 | §Glass Surfaces table 218–221 | subtle 82%/90% blur 1px; default 50%/58% blur 3px; medium 65%/72% blur 3px; elevated 80%/88% blur 4px | `tokens.css:299–319` + dark `:root` `tokens.css:634–637` matches | **clean** |
| D3 | §Glass Surfaces 232 | `--glass-blur-dock = blur(1px) saturate(1.025)` | `tokens.css:322` `--glass-blur-dock: blur(var(--glass-blur-dock-radius)) saturate(1.025)` with `--glass-blur-dock-radius: 1px` (`tokens.css:314`) matches | **clean** |
| D4 | §Tranche G additions 1042 | `--cartoon-accent-mix` retired with literal `15%` light / `18%` dark | `tokens.css` grep returns zero hits for `--cartoon-accent-mix`; retirement claim correct | **clean** |
| D5 | §Tranche G additions 1073, 1099 | `--type-formula` retired; math sizes off `--type-subheading` | `tokens.css` grep returns zero hits for `--type-formula`; retirement claim correct | **clean** |
| D6 | §Tranche G additions 1132, 1163–1167 | `--shimmer-blue-{dark,mid,light}` + `.text-shimmer-blue` retired; `--paper-bg/-shadow/-border-{1..4}` (12) retired and inlined; per-rung Fraunces axes for display-3..ultra retired and inlined | All four token families absent at `tokens.css`; retirement notes correct | **clean** |
| D7 | §Tranche G additions Runtime tokens 1147–1152 | `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER` survive; `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` retired in H.W1 | `src/tokens.ts:11–48` exports exactly the surviving five; retired four absent | **clean** |
| D8 | §Component Catalog 832–834 | custom packages enumerated (`animation` listed first) | `ls src/components/custom/` returns 40 dirs; `animation/` is **absent** at HEAD (never existed at this path per `git log -- src/components/custom/animation`); DESIGN.md row claims `animation · aurora · …` includes a non-existent dir | **stale claim** |
| D9 | §Component Catalog 832–834 | enumerated set matches HEAD inventory | HEAD has `dock-group/`, `disco-glyph/`, `glyph-face/`, `instrument-chassis/`, `paper-backdrop/`, `pulse/`, `status-dot/`, `metric-badge/`, `confirm-dialog/`, `expandable-container/`, `icon-tooltip/`, `labeled-field/`, `stacked-icons/`, `tabs/`, `typewriter/` — DESIGN.md catalog includes most but **misses** `paper-backdrop`, `swatch` (line 834 claims it but spelling matches at end), `dock-group` (called out in 485 but missing from §828 paragraph) | **partial — re-verify required** |
| D10 | §Composables 859–861 | composable inventory | `ls src/composables/` returns `blob/`, `glass/`, `motion/`, `pagination/`, `sidebar/`, `sortable/`, `utils/`, `virtual/`, `__tests__/`, plus 5 top-level `useGlobalDark.ts` / `useInterval.ts` / `useKeyboardShortcuts.ts` / `useTimer.ts` / `useTouchGate.ts`; DESIGN.md names a coherent subset; no false positives | **clean** |
| D11 | §Component specs Skeleton 838 | `<Skeleton variant="pulse" \| "shimmer">` | not re-verified in this audit (out of scope for H drift) | **out of scope** |

DESIGN.md verdict: **clean on every H.W1 retirement claim** + **W2 close gate-(a) drift rows resolved**, but the §Component Catalog enumeration (832–834) carries one phantom (`animation`) and at least one verify-row miss (`paper-backdrop` family).

### CLAUDE.md

| # | Line | Claim | Source check | Verdict |
|---|---|---|---|---|
| C1 | 18 | `ui/` has 39 shadcn-vue base packages | `ls src/components/ui/` returns 40 entries, of which 1 is `index.ts` → 39 packages | **clean** |
| C2 | 59 | `custom/` has "43+ custom package dirs (post-G)" | `ls src/components/custom/` returns 40 dirs at HEAD; the "43+" claim was authored pre-W1 retirement | **stale claim** (post-H.W1: 17 G-additions − 4 retired/inlined = 13 net new G dirs; pre-G base + 13 = 40) |
| C3 | 60–101 | enumerated tree of `custom/` subdirs | Compared against `ls src/components/custom/`. **6 phantom claims**: `animation/`, `form/`, `keyboard-shortcuts-modal/`, `like-button/`, `svg-filters/`, `tier-badge/` — none exist at HEAD. The W1 retirements (`keyboard-shortcuts-modal`, `like-button`, `svg-filters`, `tier-badge`) were never scrubbed from CLAUDE.md per H invariant 2 wire-or-retire close-out. `animation/` and `form/` never existed (CLAUDE.md was speculative) | **6 stale claims** |
| C4 | 60–101 | enumerated tree of `custom/` subdirs | **14 missing claims**: `confirm-dialog/`, `disco-glyph/`, `dock-group/`, `expandable-container/`, `glyph-face/`, `icon-tooltip/`, `instrument-chassis/`, `labeled-field/`, `metric-badge/`, `paper-backdrop/`, `pulse/`, `stacked-icons/`, `status-dot/`, `typewriter/` — all present at HEAD; CLAUDE.md tree silently omits them | **14 missing claims** |
| C5 | 118 | `glass.css ... .glass-card, .glass-pill, .glass-btn` | `grep "\.glass-pill" src/styles/glass.css` returns **zero hits**; W2 audit row 53 confirmed `.glass-pill` is absent. CLAUDE.md still claims it | **stale claim** |
| C6 | 124 | `utilities.css ... rainbow-text, touch-gate, etc.` | not re-verified in detail for this audit | **out of scope** |
| C7 | 113 | `composables/` directory listing (`glass/`, `motion/`, `pagination/`, `sidebar/`, `sortable/`, `virtual/`) | `ls src/composables/` ALSO has `blob/`, `utils/`, `__tests__/`, plus the 5 top-level `useGlobalDark.ts` / `useInterval.ts` / `useKeyboardShortcuts.ts` / `useTimer.ts` / `useTouchGate.ts` | **partial** (CLAUDE.md tree elides `blob/`, `utils/`, `useInterval.ts`, `useTimer.ts`, `useTouchGate.ts`) |
| C8 | 141 | "`src/index.ts` ... Runtime tokens (`chartHeights`, `chartColors`, `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `NAMED_EASING_BEZIER`, `goldenShimmer`) ship under the `@mkbabb/glass-ui/tokens` subpath" | `src/tokens.ts` exports `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER` only — H.W1 retired `chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer` per `audit/W1-reconciliation-result.md:43`. CLAUDE.md still names the four retirees as live exports | **stale claim — actively misleads** |
| C9 | 141 | "43+ custom packages via individual `./components/custom/<pkg>` barrels" | Same as C2 — count is 40 at HEAD | **stale claim** |
| C10 | 141 | "composable export groups (`./composables/{glass,motion,sortable,blob,color,monaco,utils}` etc.)" | `composables/color/` and `composables/monaco/` were retired in H.W1 Lane B (`audit/W1-reconciliation-result.md:18`); only `glass`, `motion`, `sortable`, `blob`, `utils`, `pagination`, `sidebar`, `virtual` survive | **stale claim — actively misleads** |
| C11 | 113 (line) | "9 top-level public export groups" | `src/composables/index.ts` re-exports 12 surfaces (sortable, useGlobalDark, useInterval, useKeyboardShortcuts, useTimer, useTouchGate, glass, motion, pagination, virtual, infinite-scroll/composables, sidebar) | **stale count** |

CLAUDE.md verdict: **multiple actively-misleading stale claims**. The runtime-token list and `composables/{color,monaco}` references both name retired surfaces as live exports — a future reader importing from the documented paths would hit module-not-found errors at HEAD.

### PROGRESS.md

| # | Reference | Claim | Source check | Verdict |
|---|---|---|---|---|
| P1 | 20 | `c7ff69f feat(tranche-g/honest-close)` is G's accumulated state | `git log -1 c7ff69f` matches | **clean** |
| P2 | 21 | `bbdd896 chore(tranche-h/open)` lands H plan + wave specs | `git log -1 bbdd896` matches | **clean** |
| P3 | 47 | "W0 close commit: `e6f1411`" + Status table line 107 says W0 commit `97c825e` | Both `e6f1411` and `97c825e` exist as separate commits with **identical** subject (`feat(tranche-h/w0): reconciliation audit + binding precept updates`); only `97c825e` is reachable from HEAD (`git log --oneline c7ff69f..HEAD`); `e6f1411` is dangling. PROGRESS.md cites both in different paragraphs without resolving the duplication | **internal contradiction** |
| P4 | 85 | "W1 close commit: `4a3da38`" + Status table line 108 cites `4a3da38` | `git log --oneline c7ff69f..HEAD` shows W1 commit on HEAD chain is `68e4097` (timestamp 03:57:12 — 78 sec after `4a3da38`'s 03:55:54); both commits carry identical subject. `4a3da38` is dangling at HEAD. H-pre-close.md:20 explicitly notes "also `68e4097` post-PROGRESS-amend"; PROGRESS.md never updates the cited hash | **stale commit hash — drift between PROGRESS.md and HEAD chain** |
| P5 | 47 | "Submodule pointer 458c2d1 → cc57c91" (lane II precept commit) | `git cat-file -t cc57c91` returns "fatal: ambiguous argument 'cc57c91'"; the cited submodule SHA is not resolvable from this repo (it lives in the precepts submodule, which is fine). **However** PROGRESS.md and H-pre-close present this hash as primary evidence without naming the submodule path explicitly | **clean** (submodule SHA unverifiable from parent repo, but legitimate per `docs/precepts/instructions/` being a git submodule) |
| P6 | 99–101 | "W2 close commit: `b4927ae`. W3 close commit: `f3caa9f`. W4 close commit: `28e6c6a`." | `git log --oneline` confirms each | **clean** |
| P7 | 127 | "W5 close commit: `13ca1c3`" | `git log -1 13ca1c3` matches | **clean** |
| P8 | 87 | Notes the `e2ad404` interlude commit ("docs(DESIGN): reconcile post-P glass-ui surface — DockGroup, GlyphFace cap knob, DiscoGlyph") | `git log -1 e2ad404` matches; commit lands between W0 close (97c825e) and W1 close (68e4097) | **clean — disclosed** |
| P9 | 113 | "W6 \| open (close ceremony in progress) \| —" | Matches HEAD state (no W6 commit, no FINAL.md) | **clean** |
| P10 | 105–113 | Status table | Per P3 + P4, the W0 + W1 hashes shown have known-stale cousins; the table itself reads consistently if `4a3da38` is treated as the orchestrator's then-cited hash and `68e4097` as the post-amend hash that actually rides HEAD | **stale — needs amend before FINAL.md** |
| P11 | 112 | line 102 records nothing about commit `4a2b382 docs(tranche-h): record W2/W3/W4 close + R-NEW-1 residual` | `git log -1 4a2b382` exists between `28e6c6a` (W4) and `13ca1c3` (W5); PROGRESS.md never names this commit, but its content is the W2/W3/W4 close-record paragraph already in PROGRESS.md, so the body is documented even if the hash is not | **trivial omission** (the commit's diff IS the content currently visible in PROGRESS.md lines 89–101; naming the hash would tighten the trail) |

PROGRESS.md verdict: **two stale commit hashes** (W0 close + W1 close) with reachable cousins on HEAD chain. The disclosure trail — "(also 68e4097 post-PROGRESS-amend)" in H-pre-close — is honest but PROGRESS.md never reconciled. A reader running `git show 4a3da38` finds the right tree, but `git log --oneline c7ff69f..HEAD` does not surface it.

### Wave specs

| # | File | Claimed Status | HEAD reality | Verdict |
|---|---|---|---|---|
| WS1 | `waves/W0.md:6` | `**Status**: open.` | W0 closed per PROGRESS.md:107 + commit `97c825e` | **stale status line** |
| WS2 | `waves/W1.md:6` | `**Status**: pending W0.` | W1 closed per PROGRESS.md:108 + commit `68e4097` | **stale status line** |
| WS3 | `waves/W2.md:6` | `**Status**: pending W0.` | W2 closed per PROGRESS.md:109 + commit `b4927ae` | **stale status line** |
| WS4 | `waves/W3.md:6` | `**Status**: pending W1.` | W3 closed per PROGRESS.md:110 + commit `f3caa9f` | **stale status line** |
| WS5 | `waves/W4.md:6` | `**Status**: pending W1.` | W4 closed per PROGRESS.md:111 + commit `28e6c6a` | **stale status line** |
| WS6 | `waves/W5.md:6` | `**Status**: pending W4.` | W5 closed per PROGRESS.md:112 + commit `13ca1c3` | **stale status line** |
| WS7 | `waves/W6.md:6` | `**Status**: pending W2 + W3 + W4 + W5.` | W6 in progress (close ceremony running); not yet closed | **partially stale** (predecessors closed; W6 itself open) |

Tampering check: `git log -- docs/tranches/H/waves/W{0..6}.md` shows W3 was edited at the W1 close commit `68e4097` (per H.W1 Lane D scope-reveal, disclosed in PROGRESS.md:74); every other wave spec carries a single creation commit `bbdd896`. **No retroactive scope tampering detected** — the W3 amendment is the disclosed scope-reveal, not silent narrowing.

Wave-specs verdict: **all 7 status lines are stale**. None updated to `closed` after their respective close commits. Per SPEC.md §Waves "Every wave updates docs at close" — this is a process-discipline gap that the H invariant 10 (per-wave commits) was meant to enforce but didn't extend to the wave-spec status field.

### H.md

| # | Reference | Claim | Source check | Verdict |
|---|---|---|---|---|
| H1 | 53–62 (Wave Schedule table) | Status column for all 7 rows: `open` / `pending W0` / `pending W1` / `pending W4` / `pending W2 + W3 + W4 + W5` | All 6 H waves closed (W0–W5); W6 in progress per PROGRESS.md:113 | **stale** (entire Status column unreconciled) |
| H2 | 86 | "**R4** `<HarmonicLevelGrid>` / Filmstrip — stays out of scope per ≥2-bar; consumer territory. No destination opened." | H-pre-close.md:52 corroborates ("out of scope (consumer territory; ≥2-bar fail)"); no source-side check needed | **clean** |
| H3 | 87 | "**R5** Blob Web Worker for state machine — stays deferred per SPEC.md §11.4; trigger is 8+ multi-instance use cases" | H-pre-close.md:53 corroborates | **clean** |
| H4 | 88 | "**R6 surviving artefacts that have a consumer follow-up tranche IN PROGRESS** — keep-current with evidence docs" | H-pre-close.md:54 marks R6 as **closed** in W1+W4 (W1 retired the orphans; W4 authored the slider-glass-track story for the W3-shipped variant). H.md cross-tranche-debt section frames R6 as a residual, but H-pre-close treats it as closed. **Internal disagreement** between H.md (residual carries) and H-pre-close (closed) | **partial drift — semantic** (H.md described R6 as residual at H open; H execution closed it; H.md was never updated to reflect closure) |
| H5 | (none) | H.md does not mention **R-NEW-1** (41 pre-G stories needing aesthetic uplift) | R-NEW-1 originates at H.W4 (per PROGRESS.md:97 + H-pre-close.md:56). H.md's cross-tranche-debt + out-of-scope sections were never amended to add the new residual | **missing claim — material** (a future reader of H.md alone would not learn R-NEW-1 exists) |

H.md verdict: **wave-table Status column is 100% stale** + **R6 residual claim is now obsolete (closed in execution)** + **R-NEW-1 absent from cross-tranche debt**. None of these are scope tampering — they are routine "doc updates at close" that the close ceremony did not absorb into the plan doc.

### H-pre-close.md

| # | Reference | Claim | Source check | Verdict |
|---|---|---|---|---|
| HPC1 | 19 | W0 commit `97c825e` (parent) + `cc57c91` (precepts submodule) | matches HEAD | **clean** |
| HPC2 | 20 | W1 commit `4a3da38` (also `68e4097` post-PROGRESS-amend) | matches dual-hash reality; honest disclosure | **clean** |
| HPC3 | 21 | "(interlude) post-P DESIGN.md sync — `e2ad404` — unattributed-but-benign cross-repo doc reconcile" | matches HEAD; honestly framed | **clean** |
| HPC4 | 22–25 | W2/W3/W4/W5 commit hashes | matches HEAD | **clean** |
| HPC5 | 28 | "7 waves landed (counting the open commit + interlude noted but not part of any wave). 6 commits are H-tagged" | git log shows: `bbdd896` (open) + `97c825e` (W0) + `e2ad404` (interlude) + `68e4097` (W1) + `b4927ae` (W2) + `f3caa9f` (W3) + `28e6c6a` (W4) + `4a2b382` (PROGRESS amend) + `13ca1c3` (W5) = **9 commits since `c7ff69f`**, of which 6 are wave-tagged (W0..W5). H-pre-close says "7 waves" but it means "7 distinct events" — slight prose ambiguity | **trivial — phrasing** (the count is consistent with intent) |
| HPC6 | 70–74 | "Brittleness window: None opened during H." | Wave specs verified above show no `breaking_changes_during_wave` declarations; build was green at every wave close per PROGRESS.md gate-(a) entries | **clean** |

H-pre-close.md verdict: **clean**. This is the only H-tier doc that walks all the H commits honestly + names the dual-hash W0/W1 + interlude.

---

## Critical findings

The doc-vs-source drift that materially misleads a reader at HEAD:

### CRIT-1 — CLAUDE.md runtime-tokens line names retired exports as live (CLAUDE.md:141)

CLAUDE.md asserts `Runtime tokens (chartHeights, chartColors, chartNeutrals, vizColorsHex, spectrumColor, NAMED_EASING_BEZIER, goldenShimmer) ship under the @mkbabb/glass-ui/tokens subpath`. Four of those (`chartNeutrals`, `vizColorsHex`, `spectrumColor`, `goldenShimmer`) were retired in H.W1 Lane E (`audit/W1-reconciliation-result.md:43`). A consumer importing per the documented surface hits a compile-time module-not-found. **This is the single highest-severity drift in the H corpus** because the claim is on the entry-point description and a reader is likely to copy it.

### CRIT-2 — CLAUDE.md `composables/{color,monaco}` references retired packages (CLAUDE.md:141)

The same paragraph: "composable export groups (`./composables/{glass,motion,sortable,blob,color,monaco,utils}` etc.)". Both `composables/color/` and `composables/monaco/` were retired in H.W1 Lane B (the `useContrastSafeAccent` and `useMonacoTheme` retirements). `src/composables/index.ts` no longer re-exports them. A consumer following the documented set hits the same module-not-found.

### CRIT-3 — CLAUDE.md custom-package tree retains 4 H.W1-retired dirs (CLAUDE.md:93–100)

CLAUDE.md still enumerates `keyboard-shortcuts-modal/`, `tier-badge/`, `like-button/`, `svg-filters/` in the `custom/` tree. All four were retired in H.W1 Lane A per `audit/W1-A-proof.md` + `audit/W1-reconciliation-result.md:11–13`. The H thesis ("substrate honest", invariant 2 wire-or-retire) is contradicted by the doc surface that names the retired packages as if extant. The W2 lane bounds explicitly excluded CLAUDE.md, so no wave was responsible for the scrub — that responsibility falls on W6 absorb.

### CRIT-4 — PROGRESS.md cites W1 close hash `4a3da38` but HEAD chain rides `68e4097`

PROGRESS.md line 85 + Status table line 108 both cite `4a3da38` as the W1 close commit. `git log --oneline c7ff69f..HEAD` shows the W1 commit on HEAD's chain is `68e4097`. `4a3da38` exists as a separate commit with the identical subject but is not reachable from HEAD. H-pre-close.md disclosed the dual-hash situation; PROGRESS.md never reconciled. A reader running `git show <PROGRESS-cited-hash>` lands on a tree that diverges from HEAD by the e2ad404-note paragraph that 68e4097 introduced.

### CRIT-5 — Every H wave-spec `Status:` line is stale (`waves/W{0..6}.md:6`)

W0 says `open`; W1 says `pending W0`; W2 says `pending W0`; W3 says `pending W1`; W4 says `pending W1`; W5 says `pending W4`; W6 says `pending W2 + W3 + W4 + W5`. PROGRESS.md Status table contradicts every one of these (W0–W5 closed; W6 open). The SPEC.md §Waves rule "Every wave updates docs at close" was met for PROGRESS.md and the per-wave audit reports but not for the wave specs' own Status lines. While PROGRESS.md is the canonical source of truth, the wave-spec staleness creates a contradiction inside `docs/tranches/H/`.

### CRIT-6 — H.md wave-table Status column is 100% stale + R-NEW-1 absent (H.md:53–62, 84–88)

The plan-time Wave Schedule table never updated its Status column. Six rows still read `open` / `pending W0` / `pending W1` / `pending W4` instead of `closed`. The Cross-tranche debt section (lines 84–88) lists R4/R5/R6 but does not name R-NEW-1 (41 pre-G stories needing aesthetic uplift), introduced at H.W4 per PROGRESS.md:97 and carried as a named-destination residual per H-pre-close.md:56. H.md is the closing tranche-plan doc; readers expect its residual table to be authoritative at close.

(Findings D8/D9, C5, P3, P11 are real but do not meet the "actively misleads" bar — they are tightening opportunities rather than blockers.)

---

## Doc-update recommendations for W6 absorb

The W6 close ceremony should perform a single docs-only commit before FINAL.md is authored. Suggested edit set, ordered by severity:

1. **CLAUDE.md:141 (runtime-tokens line)** — replace the 7-name list with the live 5: `chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `NAMED_EASING_BEZIER`. (Closes CRIT-1.)
2. **CLAUDE.md:141 (composable groups line)** — drop `color` and `monaco` from the brace expansion; replace with the live set: `{glass, motion, sortable, blob, utils, pagination, sidebar, virtual}`. (Closes CRIT-2.)
3. **CLAUDE.md:60–101 (custom tree)** — delete the 4 H.W1-retired entries (`keyboard-shortcuts-modal/`, `tier-badge/`, `like-button/`, `svg-filters/`); also delete the 2 phantom entries (`animation/`, `form/` — never existed at HEAD); also add the 14 missing entries (`confirm-dialog/`, `disco-glyph/`, `dock-group/`, `expandable-container/`, `glyph-face/`, `icon-tooltip/`, `instrument-chassis/`, `labeled-field/`, `metric-badge/`, `paper-backdrop/`, `pulse/`, `stacked-icons/`, `status-dot/`, `typewriter/`). After both passes, update the count claim from "43+" to the actual `40` at HEAD. (Closes CRIT-3.)
4. **CLAUDE.md:118 (`glass.css` comment)** — remove `.glass-pill` from the inline class enumeration. (Trivial, but matches the W2 §53 disposition.)
5. **CLAUDE.md:113 (`composables/` tree)** — add `blob/`, `utils/`, `useInterval.ts`, `useTimer.ts`, `useTouchGate.ts` rows. Update the "9 top-level public export groups" claim to the actual 12 in `src/composables/index.ts`.
6. **PROGRESS.md:85 + 108 (W1 commit hash)** — change `4a3da38` to `68e4097` (HEAD-reachable hash); add a one-line footnote naming `4a3da38` as the pre-amend predecessor for trail completeness. (Closes CRIT-4.)
7. **PROGRESS.md:47 + 107 (W0 commit hash)** — pick `97c825e` (HEAD-reachable) as the single canonical hash; mention `e6f1411` as a dangling predecessor only if needed for the close-trail trace.
8. **`waves/W{0..5}.md:6`** — change every `Status:` line to `closed (commit <hash>)`. **`waves/W6.md:6`** — change to `in progress (close ceremony, audit returning)`. (Closes CRIT-5.)
9. **H.md:53–62 (Wave Schedule Status column)** — replace each `open` / `pending` with `closed` (W0–W5) + `in progress` (W6). (Closes the stale-table half of CRIT-6.)
10. **H.md:84–88 (Cross-tranche debt)** — append an `**R-NEW-1**` bullet with the H.W4 origin + the named destination per H-pre-close.md:56. Also amend the **R6** bullet to "**closed in W1 + W4** (was: residual)". (Closes the missing-claim half of CRIT-6.)
11. **DESIGN.md:832–834 (Component Catalog enumeration)** — add `paper-backdrop` to the package list; remove `animation` (phantom); cross-check spelling against `ls src/components/custom/`.
12. **PROGRESS.md** — add a one-line entry for `4a2b382 docs(tranche-h): record W2/W3/W4 close + R-NEW-1 residual` so the commit trail is contiguous.

The full absorb is **docs-only** (no source change, no test change, no build implications). Every edit closes a finding with a verified before-state and after-state.

---

## Brittleness-window check

Per the new SPEC.md §Brittleness ("An undeclared brittleness window — for instance, a stash-induced regression discovered post-close — is a hard-gate violation"):

- **No `breaking_changes_during_wave: yes` declaration** appears in any of `waves/W{0..6}.md`. (Verified by grep.)
- **No suspended gates** appear in any wave spec. (Verified by grep.)
- **Build state at every wave close** was reported green per PROGRESS.md gate (a) entries: W0 (line 50), W1 (line 80), W2 (implicit at H-pre-close.md:11 — "build green at HEAD verified at every wave close"), W3 (PROGRESS.md:93 — "build green at 25s"), W4 (per W4-design-fidelity-rerun), W5 (W5-stress-baseline.md FPS PASS).
- **The W2 audit's gate-(e) note** flagged a typecheck failure scoped to `demo/stories/primitives/slider-glass-track.vue` "missing `_slider_dock_bridge.vue` import" — but explicitly framed as W3 work-in-progress state, not a regression in W2's bounds. W3 then shipped the variant; PROGRESS.md:93 confirms W3's build green at 25s. The transient typecheck miss was a forward-dependency artefact, not an undeclared brittleness window — it lived inside the W2→W3 dispatch boundary and resolved at W3 close.
- **The `e2ad404` interlude** — a docs-only commit with no source impact — is disclosed in PROGRESS.md:87 + H-pre-close.md:21 + recommended for plan-vs-actual lane note. Not a brittleness event.
- **Dual-hash W0 + W1** (P3 + P4) — both predecessor commits and HEAD-chain commits carry green builds; the dual-hash is a recovery-trail artefact, not a regression. No suspended gate.

**Verdict**: no undeclared brittleness window detected at HEAD. Every wave closed against a green build; no gate was suspended without restoration. The H-pre-close.md framing ("None opened during H. H opened against a green build... and closes against a green build") holds.

---

## Summary

- **DESIGN.md**: largely clean (W2's 57/57 drift rows applied + H.W1 retirement notes correct); 1–2 catalog enumeration tightening opportunities.
- **CLAUDE.md**: 6 critical drift findings (CRIT-1 through CRIT-3 + .glass-pill + composables tree + count claim).
- **PROGRESS.md**: 2 stale commit hashes (W0 + W1); both have HEAD-reachable cousins; H-pre-close partially reconciled but PROGRESS.md never updated.
- **Wave specs**: 7-of-7 Status lines stale.
- **H.md**: wave-table Status column 100% stale; R-NEW-1 missing from cross-tranche debt; R6 residual claim is obsolete.
- **H-pre-close.md**: clean (the most accurate snapshot of HEAD state in the H corpus).

W6 absorb is straightforward: one docs-only commit lands the recommended edits and FINAL.md can author honestly. No source changes, no test re-runs, no build implications. Brittleness-window check returns clean.
