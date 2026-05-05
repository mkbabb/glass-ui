# G — Retrospective

**Tranche**: G — Design-Language Vocabulary Expansion.
**Closed**: 2026-05-04.

## Thesis fulfillment

G's opening thesis was to crystallize the implicit eleven-axis design language (glassmorphic + paper + cream + colorful flourishes + mathematical + modern skeuomorphic with shadowing + bold + audacious + large typography + large/audacious iconography + mascot grammar) into named, exposed, story-documented primitives. **Fulfilled.** Every axis lands as canon vocabulary:

- **Cream** is now `--cream-*` tokens + `<CreamSurface>` + `Card variant="cream"`.
- **Paper tier** is `--paper-bg-{1..4}` + `.paper-{1..4}` + `<Card variant="paper">` + `.paper-card` + `.paper-rule`.
- **Colorful flourishes** are `.bg-rainbow{,-vivid,-pastel}` + `.text-rainbow-pastel` + `.text-shimmer-{gold,blue,vivid,pastel}` family + `.divider-flourish-{gold,rainbow,section-0..12}` + `.flourish-stripe-*` + `<FlourishDivider>` + `<RainbowGradientDef>`.
- **Mathematical** is `math.css` (default-included) + `--type-formula` + `--space-phi-{1..4}` + `<MathSurface>` + `<MathFormula>` + `<MathGlyph>` + `.production-rule` + `.perf-number/-unit`.
- **Modern skeuomorphic shadowing** is delivered by extending the existing cartoon-shadow family with `--shadow-cartoon-accent` recipe + `--cartoon-accent-color/-mix` hooks; no bevel vocabulary (rejected per user direction Q3).
- **Bold/audacious large typography** is `--type-display-mega` (φ⁵) + `--type-display-ultra` (φ⁶) + per-rung Fraunces axes + `<DisplayHero>` + `.text-display-stat` + `.text-prose-lettrine`.
- **Large/audacious iconography** is `--icon-{2xl,3xl,mega}` + generated `.icon-{xs..mega}` utilities + `<IconStamp>` + the 17-package primitive expansion.
- **Mascot grammar** is the `<Blob>` primitive (sub-tranche β) — five moods, eleven parameters, instance-local WebGL2 renderer, Canvas2D fallback, deterministic mulberry32 seeding, full a11y contracts (PRM/PRT/PCM).

## Numbers

- **Drift rows** at W0: 271 unique-row / 324 axis-row across six consumers.
- **Gap inventory**: 47 deduped gaps post bbnf-fold-in; 45 accepted, 2 rejected (skeuo-bevel pair + brand-uniform-display preset, both per user direction).
- **Net delivered**: 17 new custom packages + 14 CVA branches + 4 composables + 3 slot-class props + 1 factory + 5 runtime helpers + 49 utility classes + 11 token namespaces + 4 keyframes + 1 transition pair + 25 stories.
- **Diff vs master**: 3,065 insertions / 515 deletions across 59 files.
- **Tranche document set**: 22 wave/audit files + 6 W5 ledger files + 4 sub-tranche β specs + BLOB-FINAL.md + this retro + FINAL.md.
- **Lines retired projection across consumers**: ≥1,349 from value.js (BLOB sub-tranche) + ~390 from fourier-analysis/web (ledger §1) + words/frontend / speedtest / keyframes.js / bbnf-lang/playground migrations sum to **≥3,000 lines retired** at consumer adoption.
- **Projected post-migration drift residual** (sum of W5 ledger projections): ≤25 unique-row across all six consumers (down from 271). Each consumer's follow-up tranche has a hard-gate target ≤5 unique-row.

## What worked

- **Seven parallel research lanes (A–G).** The bidirectional audit (each consumer + glass-ui itself) surfaced 215 drift rows + 43 gaps in a single dispatch wave. The lane-by-lane discipline meant the synthesis was already structured before the orchestrator touched it.
- **W0 challenge as the disambiguation gate.** Lane β's audit at HEAD contradicted the synthesis claim that `--accent-pink`/`--accent-red`/`--shadow:` were orphan; the orchestrator absorbed by rescinding the retirement + adding consumer-ledger cleanup rows for the redundant preset redeclarations. Without W0 challenge, retirement would have broken 16 fourier-analysis component sites.
- **Pinned baselines as W5 ground truth.** W0.γ's 271 unique-row / 324 axis-row totals replaced the synthesis's "215+ drift rows" guess with measured numbers. W5 ledger deltas pin to those baselines, not arithmetic estimates.
- **Sub-tranche β discipline.** The Blob primitive's spec (473 lines) was load-bearing across all four sub-tranche waves. Five §11 user locks (instance-local GL, CSS-var chromatic aberration, Blob-owned cast shadow, Web Worker deferred, `:tap-mood` prop) held end-to-end with zero drift. The pre-Wβ0 spec lock was the single biggest scope-decision saving in the tranche.
- **W4 design-fidelity gate.** Each story landed a deliberate <2-second design-language commitment. Stories that "could be from any UI library" failed the gate; the bold-maximalist commitment held across 25 stories.
- **Disjoint write paths enabled deep parallelism.** At peak the tranche ran 8 agents in flight (3 Wβ1 + 5 W3 lanes); per-lane file bounds prevented merge conflicts.
- **Frontend-design lens applied at the spec layer (G.md Design POV) AND at the story layer (W4 design-fidelity audit).** The bold-maximalist commitment was both upfront-principled and post-verified.

## What changed under contact

- **`useRafLoop` → `useRAFLoop` naming.** Spec named the rAF driver `useRafLoop`; the implementing agent landed `useRAFLoop` (capital RAF — idiomatic acronym capitalization). Orchestrator reconciled by aligning all consumers to the implementation's name. Non-load-bearing.
- **Wβ0 absorbed by orchestrator after agent stall.** Dispatched agent stalled at the watchdog 600s past the post-validator file-write step. Orchestrator absorbed remaining work directly per scope-reveal default.
- **W3 + Wβ1 had multiple watchdog stalls.** All seven dispatched agents (Lane 1 / 2 / 3 / 4 / 5 + Wβ1 I / II / III) stalled at 600s near build-verify, despite being substantially complete on disk. Residual-recovery dispatches finished the missing pieces. The orchestrator absorbed roughly 30% of the W3 work directly (including all Lane F runtime tokens + barrel coordination + the four W3 Lane 3/4/5 residual completions).
- **Lane 4 residual `git stash` regression.** A residual agent's `git stash` / `git stash pop` round-trip silently reverted all W1+W2 orchestrator-direct edits to tokens.css/typography.css/theme.css/tokens.ts/cards.css/paper.css/utilities.css/index.css/package.json/DESIGN.md. Orchestrator detected post-close (`grep -c '\\-\\-cream' tokens.css → 0`) and recovered every reverted addition. The DESIGN.md docs sync remains residual at close (R1 — re-dispatch when agent capacity returns).
- **W5 + Wβ3 + DESIGN.md-resync agents hit org API limit.** Wβ3 landed `primitives/blob.vue` + `_internal/blob-stress.vue` before cutoff; orchestrator absorbed audit docs + BLOB-FINAL.md. DESIGN.md re-sync agent didn't write before cutoff; deferred to R1. All five W5 ledger agents completed before the limit fully bit (lucky timing).

## Process precepts to add

Per the LESSONS-LEARNED format (`docs/precepts/instructions/LESSONS-LEARNED.md`):

- **Never use `git stash` / `git checkout HEAD --` / `git reset` as agent recovery.** When a build fails mid-edit, agents must revert their own edits via the Edit tool surgically. The Lane 4 residual incident wiped ~165 lines of W1+W2 orchestrator-direct work that was never committed. Future tranche dispatch prompts should include a binding "no destructive git as recovery" clause.
- **Run typecheck/build EARLIER in agent workflows.** All seven W3+Wβ1 agents stalled at the 600s watchdog near final build verification; the substantive work was done. Dispatching with "run typecheck after each major file group" instead of "at the end" would leave disk in more recoverable state on stall.
- **Orchestrator commits at wave close.** Uncommitted state is fragile under agent dispatch. After each wave closes green, orchestrator should commit the changes (with user permission per CLAUDE.md). The Lane 4 stash regression would not have happened against committed state.

## Authority

Tranche G closes clean per W0/Wβ0/W1/W2/W3/Wβ1/Wβ2/Wβ3/W4 hard gates. W5 close ceremony complete: self-audit + overfitting audit + residuals (≤5) + retro + FINAL.md. Consumer-repo edits land in each consumer's own follow-up tranche per G invariant 12 (proof-by-ledger).
