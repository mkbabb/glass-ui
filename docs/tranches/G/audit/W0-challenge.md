# W0 — Challenge synthesis

**Wave**: G.W0 close.
**Date**: 2026-05-04.
**Authority**: orchestrator (synthesis of α/β/γ outputs); resolutions bind W1–W5.
**Inputs**: `audit/W0-gap-classification.md` (lane α), `audit/W0-design-md-drift.md` + `audit/W0-silent-failures.md` (lane β), `audit/W0-baseline-drift.md` (lane γ).

This challenge log accepts, narrows, or rejects every claim cluster the lanes surfaced. Per `docs/precepts/instructions/tranche/CHALLENGE.md`, the orchestrator does not invent gaps — challenges only narrow the basis for the plan.

---

## A. Gap classification (lane α)

Lane α classified 47 gap rows: 45 accepted (some narrowed), 2 rejected (gap 8 skeuo-bevel and gap 34 brand-uniform-display per user-direction overlay). All accepts pass through to W1–W5 amendments. Risk-flagged accepts are dispositioned in §C below.

**Accepted as-is**: gaps 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17 (narrowed — `<SplitPane>` to risk register), 18, 19, 20, 21, 23 (narrowed — single-lane evidence), 24, 25, 26, 28, 29, 30, 31, 35, 36, 37, 38, 40, 41, 42, 43, 47.

**Accepted with explicit ship decision** (gaps under ≥2 live-site bar, reasoned into scope):
- Gap 22 `<Toast variant="inverse">` — ship as 5-line CVA branch. Cheap; second prospective consumer (speedtest "Saved" pattern + words "Word added" pattern) clears bar via prospective-from-stories rule.
- Gap 27 `ToggleGroupItem variant="card"` — ship as CVA branch. Speedtest's `FlowSelector` + words' `prefs-toggle` are the two anchors.
- Gap 32 `.confetti-piece` — ship in W2 alongside `--rainbow-*` token alignment. D ReviewSessionComplete + W4 `confetti` story clears bar.
- Gap 33 `.text-prose-lettrine` — ship as a one-line `@utility` exposing Fraunces ss01. The 14 prospective sites in D and the W4 prose-block story clear bar.
- Gap 39 `GlassDock position="fixed"` safe-area-inset — bundle with Lane E in W3 (single-line fix, the per-W3 spec already authorizes this).
- Gap 44 `useMonacoTheme()` — ship as ~15-line composable in `src/composables/monaco/`. Single live consumer (bbnf) accepted per user-direction Q22.
- Gap 45 `<PipelineFlow>` — ship per user-direction Q21.
- Gap 46 `<LiveSnippet>` — ship per user-direction Q21.

**Rejected (binding)**:
- Gap 8 `--shadow-skeuo-{raised,pressed}` + `.glass-skeuo` + `Switch/Toggle variant="skeuo"` — out of scope per G invariant 7 + user-direction overlay #3. Modern-skeuo axis delivered via gap 2 (`--shadow-cartoon-accent` + `--shadow-cartoon-lg`).
- Gap 34 `brand-uniform-display` preset — out of scope per user-direction overlay #8.

---

## B. Hygiene + DESIGN.md drift (lane β)

Lane β catalogued 57 DESIGN.md drift rows. All 57 are accepted as W1 docs-sync work (not source changes). The accept list is mechanical; the substantive challenge is on the retirement targets (R1–R7).

### B.1 Retirement-target challenge dispositions

The synthesis user-direction overlay said: "Orphan accent retirement: `--accent-pink`, `--section-heading`, `--accent-red` all retired in W1." Lane β's grep verification at HEAD contradicts this premise for two of the three. Per `docs/precepts/instructions/ORCHESTRATION.md` scope-reveal protocol — *default to absorb* — the orchestrator absorbs the contradicted scope as follows:

| Token | Synthesis claim | β verified | Disposition | Rationale |
|---|---|---|---|---|
| **R1** `--shadow:` (alias) | orphan; retire | 2 src + 8 consumer (bbnf) call sites | **KEEP** (do NOT retire). Document in DESIGN.md as the canonical foreground-shadow primitive. | Retiring breaks `theme.css:84` (`--color-shadow` `@theme` alias) + `utilities.css:74` (`.depth-text`) + 8 bbnf-lang sites. Synthesis claim (A axis 1.5) was wrong about call-site count. |
| **R2** `--accent-pink` | orphan; retire | 0 src + 4 fourier-analysis component sites + 3 fourier preset-override sites | **KEEP** (do NOT retire). Document role and fold fourier preset cleanup into W5 ledger. | The 4 component sites in `MorphShapePreview.vue`, `MorphPhaseConfig.vue`, `EditorControlsDock.vue` are live, and fourier's `fourier-overrides.css` redeclares it locally — meaning canon currently provides the truth, and the consumer's redundant redeclaration is the actual W5 cleanup target. |
| **R3** `--section-heading` | orphan; retire | 0 src + 0 consumer component sites; only the consumer-override file (`fourier-overrides.css`) declares-and-uses it locally | **RETIRE in W1**. | Truly orphan. Consumer's redeclare-locally pattern proves canon presence is unused. fourier W5 ledger notes the redeclaration row as already-handled. |
| **R4** `--accent-red` | orphan (consumer brand only); retire | 0 src + **16** consumer sites: 12 fourier-analysis component-source + 6 keyframes preset + 4 bbnf preset | **KEEP** (do NOT retire). Document as the canonical alert/destructive accent (sibling to `--destructive`). | Heavily used by fourier-analysis (12 component sites). Synthesis (G.md:96) framed this as keyframes consumer brand; β proves otherwise. Retirement requires a fourier W5 component migration that the synthesis did not scope. |
| **R5** `:root[data-typography-preset="brand-uniform-sans"]` | orphan; retire | 0 active selector usage anywhere (1 comment-only reference in speedtest tokens) | **RETIRE in W1**. | True orphan. G.md:97 and user-direction overlay #8 confirmed. |
| **R6** `.depth-text` | dead; repurpose | 1 self + 4 consumer sites (keyframes + words; words shadows the rule with local rgba override) | **KEEP**. Document as canonical engraved-text utility; W3 surfaces via `<DisplayHero>`. Words consumer cleanup → W5 ledger. | Synthesis (A axis 1.5/2.1) was almost right — dead in src/ but live in 2 consumers. Repurpose-not-retire is the right move. |
| **R7** `--shadow-skeuo-*` + `.glass-skeuo` | out-of-scope (no bevel vocabulary) | 0 references anywhere | **STAY OUT** (no W1 declaration). | Confirmed zero references; G invariant 7 binds. |

**Net retirement set for W1**: `--section-heading` (R3) + `:root[data-typography-preset="brand-uniform-sans"]` (R5). The synthesis-listed retirement of `--accent-pink` and `--accent-red` is **rescinded** here on evidence grounds — those tokens stay canonical.

### B.2 DESIGN.md phantom utilities

Two cases where DESIGN.md describes utilities that the source doesn't generate:

| Drift row | Disposition |
|---|---|
| Row 39 `.dock-label` (DESIGN.md:344, 511) | **Drop the claim from DESIGN.md in W1**. No consumer references the class; no rule is emitted; the DESIGN.md prose was speculative. Lane G fold-in already routes the only adjacent need (bbnf `.dock-badge`) into `<MetricBadge size="sm">` per gap 26. |
| Row 40 `.icon-{xs..xl}` (DESIGN.md:637) | **W2 ships generated `.icon-{xs..mega}` utilities** (gap 7); W1 docs-sync re-claims with the expanded scale. |

### B.3 Silent-failure resolutions (lane β S1–S7)

All seven rows accepted with the decisions lane β proposed. Two cross-row clarifications:

| Issue | Resolution |
|---|---|
| **Family naming** (S1 vs S7) — synthesis renames `.gold-shimmer` → `.text-shimmer-gold`; lane G adds `.blue-shimmer` literal name. | **Family is `.text-shimmer-{gold,blue,vivid,pastel}`**. W2 ships all four with consistent naming. W1 declares `--shimmer-blue-{dark,mid,light}` tokens (sibling to existing `--gold-{,light,dark}`). |
| **S2 `.well-dashed` ≥2 bar** — single consumer (value.js) with 2 sites. | **Ship in W2; W4 ships a `.well-dashed` story** (a dashed-border drop-zone or empty-state pattern). The W4 story is the second site that clears `feedback_overfitting_audit` ≥2 bar. |
| **S3 `.stagger-children`** — single consumer, 1 active site. | **W5 migration only**. Direct value.js to `useStaggerReveal` composable (already canonical). No W2 utility lands. |

### B.4 Lane β risks for the orchestrator

Lane β flagged five "verify" rows where it didn't have time to read the source: rows 53 (`.glass-pill`), 54 (`pop` transition), 55 (`.btn-pill` transition), 56 (BouncyTabs/UnderlineTabs/BouncyToggle component existence). These are routed to W1's docs-sync agent — the agent reads the canonical source and either confirms the claim or fixes DESIGN.md. Not a wave-level scope reveal.

---

## C. Risk roll-up across all three lanes

The following accepted-but-narrowed gaps survive into implementation; each carries an audit-trigger so W3 closes against the same bar:

| Gap | Live sites | Trigger |
|---|---|---|
| 22 Toast inverse | 1 (E AnimationControls) + W4 story site | overfitting audit at W5 close confirms ≥2 |
| 27 ToggleGroupItem card | 1 (B FlowSelector) + W4 story site | overfitting audit at W5 close confirms ≥2 |
| 32 confetti-piece | 1 (D ReviewSessionComplete) + W4 story site | overfitting audit at W5 close confirms ≥2 |
| 33 text-prose-lettrine | 0 live + 14 prospective in D + W4 story | overfitting audit at W5 close confirms ≥2 (W4 story + 1 of 14 prospective fan-out) |
| 39 GlassDock fixed safe-area | 1 (E AnimationMenuBar) + 1 prospective (B mobile) | bundle with Lane E in W3 |
| 44 useMonacoTheme | 1 (bbnf) + 2 prospective (D latex-paper, E Monaco demo) | accept per user-direction Q22 |
| 45 PipelineFlow | 1 (bbnf) | accept per user-direction Q21 |
| 46 LiveSnippet | 1 (bbnf) | accept per user-direction Q21 |
| 16 Input/Select/NumberField cartoon | 5+ (C only) | watch — overfitting audit at W5 catches no second consumer; promote to risk register at W5 close if still single-consumer |

---

## D. Measured baseline (lane γ) — W5 ground truth

Pinned baselines for W5 hard-gate delta calculation. Two parallel views per consumer because lane reports counted some rows once across axes (unique) while γ counted them under each axis they touched (axis-row). W5 ledger tables pin against **unique-row** for migration accounting and **axis-row** for axis-coverage hard gates.

| Consumer | Unique-row | Axis-row |
|---|---:|---:|
| speedtest | 23 | 23 |
| fourier-analysis/web | 49 | 69 |
| words/frontend | 38 | 62 |
| keyframes.js | 42 | 42 |
| value.js | 61 | 66 |
| bbnf-lang/playground | 58 | 62 |
| **Σ** | **271** | **324** |

Variance flags: fourier (+41% axis-row vs unique) and words (+63%) — flagged for orchestrator. W5 ledger explicitly cites both columns when computing post-migration deltas; the variance is structural (multi-axis rows), not error.

Glass-ui canon at audit time: master @ `badc536` (v0.5.0). Working tree is on branch `o-w2_7-instrument-chassis` with the `instrument-chassis` + `glyph-face` primitives ahead of master.

---

## E. Decisions binding W1–W5

1. **Net retirement set in W1**: `--section-heading` token (root + dark + `@theme` alias) + `brand-uniform-sans` typography preset block. Synthesis-listed retirement of `--accent-pink` and `--accent-red` is rescinded (β audit found them live in 4 + 16 consumer sites respectively). The `--shadow:` alias also stays (β found 10 live sites).
2. **DESIGN.md sync** runs as docs-only edits in W1: 56 row fixes per `audit/W0-design-md-drift.md` plus the row 39 `.dock-label` claim drop and the row 40 `.icon-{xs..mega}` re-claim. Five "verify" rows (53–56) are read-and-confirm tasks for the W1 agent; not blocking.
3. **Shimmer family**: W1 declares `--shimmer-blue-{dark,mid,light}` tokens. W2 ships `.text-shimmer-{gold,blue,vivid,pastel}` family. W5 ledger names the `.gold-shimmer` → `.text-shimmer-gold` and `blue-shimmer` → `.text-shimmer-blue` migrations across S1 + S7 consumers.
4. **`.well-dashed` ≥2 bar**: W2 ships the utility; W4 adds a story (drop-zone or empty-state pattern) as the second site.
5. **`.stagger-children`**: no W2 utility. W5 ledger directs value.js to `useStaggerReveal` composable.
6. **`.active-scale` / `.disabled-base`**: not re-added. W5 ledger names words/frontend migration (≥7 active sites + 4 string-template references).
7. **Phantom utilities**: DESIGN.md drops the `.dock-label` claim in W1; no source rule lands.
8. **W5 ground-truth baselines**: 271 unique-row / 324 axis-row totals across six consumers. W5 hard gate computes deltas against these numbers (not synthesis arithmetic).
9. **Sub-tranche β**: Wβ0 closed via orchestrator absorb (the dispatched agent stalled at the post-validator write step). The reference shader passes runtime-static validation; the playground HTML is committed; SPEC.md consistency confirmed; Wβ1–Wβ3 amendments landed; value.js ledger pre-loaded. Wβ1 opens after W1 close.
10. **Risk-flagged gaps** stay in scope per §C; W5 overfitting audit is the trigger that demotes any that still don't meet ≥2 bar.

---

## F. Rejected claims and why

| Claim | Source | Rejection rationale |
|---|---|---|
| Synthesis preamble's "≤25 canonical replacements" headline | 00-synthesis.md:9 | Lane α counted 47 gap rows post-fold-in, of which 45 accepted. The "≤25" was a coalescing target, not a binding count. |
| Synthesis A axis 1.5 — `--shadow:` is orphan | 00-synthesis.md (Theme 3) | β found 10 live sites. Rejected. |
| Synthesis G.md:96 — `--accent-red` is keyframes consumer brand | G.md:96 | β found 12 fourier component sites. Rejected. |
| Synthesis G.md:96 — `--accent-pink` is orphan | G.md:96 | β found 4 fourier component sites. Rejected. |
| Lane α's "library-orphan" framing of `.depth-text` | A axis 2.1 | β found 4 consumer sites (keyframes + words). Repurpose, not retire. |

Per `feedback_no_backwards_compat`, retirement is a clean break; per `feedback_overfitting_audit`, retirement requires *no* live consumers OR a same-tranche migration. The rescinded retirements honour both rules: the rescinded tokens have live consumers, so they stay; the kept retirements (R3 + R5) have no live consumers, so they go.

---

## G. Synthesis update note

The orchestrator does not edit `research/00-synthesis.md` retroactively. The synthesis preamble's user-direction overlay #13 (orphan accent retirement) is recorded in this challenge log as **partially rescinded on evidence grounds** — the directional intent (clean orphans) is preserved, but the specific token list is reduced from 3 to 1.

The synthesis's "23 risk-register entries" is unchanged — the consumer-territory list (B–G lane risk registers) was not contradicted by lane β's audit; β only contradicted the *canon-side* retirement claims.

---

## H. W1–W5 amendment manifest (orchestrator's next step)

Amendments to land in `waves/W1.md` through `waves/W5.md` reflecting the above:

- **W1.md**: drop `--accent-pink` / `--accent-red` from retirement list; add `--shimmer-blue-{dark,mid,light}`; add the 57-row DESIGN.md drift sync explicitly (rows 1–8 z-index, 9–13 radius, 14–28 shadow + glass blur/opacity, 29–38 typography table, 39–48 phantom + token-name + heatmap, 49–57 retirement + glass-btn + verify); confirm `--shadow-cartoon-lg` is the existing token rung, not a new one (β audit verified canon already declares `--shadow-cartoon-lg` at `tokens.css:269-271` — W1 only updates DESIGN.md to document it).
- **W2.md**: add `.text-shimmer-{gold,blue,vivid,pastel}` family + `.code-badge` + `.blue-shimmer` resolution; remove `.glass-skeuo` (already out per invariant); confirm `.well-dashed` ships with W4-story counterpart; remove `.active-scale`/`.disabled-base` re-add line (already absent).
- **W3.md**: confirm Lane D' carries `useMonacoTheme`/`<PipelineFlow>`/`<LiveSnippet>`; confirm Lane E carries `GlassDock` safe-area; confirm Toast inverse, ToggleGroupItem card, confetti-piece (W2 utility), text-prose-lettrine (W2 utility) all routed; no skeuo variants.
- **W4.md**: explicit story sites for the gap-22/27/32/33 ≥2 bar trigger (Toast inverse, ToggleGroupItem card, confetti, prose-lettrine); a `.well-dashed` story; a design-fidelity gate per G.md.
- **W5.md**: pin baselines (271/324 totals); `--accent-pink` / `--accent-red` migration rows reframed as fourier-analysis preset cleanup (drop redundant redeclarations) rather than canon-side retirement.
