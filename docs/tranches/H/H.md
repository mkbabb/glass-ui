# H — Surface Trim, Honest Wiring, and Process Hardening

H is the convergence-and-honesty tranche. G shipped the eleven-axis design language across 17 new custom packages, 14 CVA branches, 4 composables, 7 blob composables, 49 utility classes, 11 token namespaces, 25 stories, and 6 consumer migration ledgers — but G's post-close audit found ~50 artefacts shipping as library-orphans (zero in-repo consumers, only consumer-ledger projections), 47 individual DESIGN.md drift rows still unfixed, three named residuals (R2/R3/R5) deferred to consumer-CI / a maintenance pass / a §11.4 trigger, and four process-failure incidents that eroded close-ceremony trust. H closes the residuals, retires every artefact that fails the ≥2-call-site bar, and promotes G's lessons-learned to binding precepts so the next tranche cannot suffer the same pathologies.

## Prelude

H opens against G's close state at HEAD: build/typecheck green; tranche G `FINAL.md` (v1) + `G-FINAL-II.md` (post-audit honest re-close) both present; four post-close audit reports under `docs/tranches/G/audit/G-audit-{α,β,γ,δ}-*.md`; six consumer migration ledgers under `docs/tranches/G/audit/W5-{consumer}-migration.md`. Total G diff vs master: 3,134 insertions / 533 deletions across 60 files.

H reads G's audit findings as the load-bearing input — there is no open design space, no new research wave, no challenge wave. The work is mechanical reconciliation against a known evidence trail.

## Thesis

H makes the substrate honest. Every artefact added in G must clear the `feedback_overfitting_audit` ≥2-call-site bar with **in-repo evidence** (story sites + same-tranche consumers) — not with consumer-ledger projections that the consumer's follow-up tranche has not yet opened. Per `feedback_overfitting_audit`'s Refined-D verdict precedence, an artefact with only ledger-projection evidence is `library-orphan` until it has a `docs/consumer-evidence/<artefact>.md` file naming a fresh consumer-grep proof.

The two halves of H:

1. **Substrate convergence**: address every G-residual + library-orphan from the audit; each artefact either WIRES (gains a real same-tranche consumer or W4-style story) OR RETIRES (clean break per `feedback_no_backwards_compat`). No keep-by-projection-alone.
2. **Process hardening**: promote G's lessons-learned (no destructive git as recovery; commit at wave close; post-close audit before FINAL.md is final; run typecheck earlier in agent workflows) to binding precepts in `docs/precepts/instructions/`, so future tranches inherit the discipline.

H is intentionally smaller than G — no new vocabulary, no new design language axes. The work is closure.

## Binding Invariants

1. C, D, D-II, E, F, G precepts still bind: KISS, no quick fixes, no workarounds, no legacy codepaths, no silent deferrals, consumed substrate, evidence over claims.
2. **Wire-or-retire is binary**. Every G-shipped artefact must either (a) have ≥2 in-repo call sites by H close (story + at least one same-tranche consumer or two stories that exercise distinct shapes), or (b) carry a `docs/consumer-evidence/<artefact>.md` that names a consumer follow-up tranche IN PROGRESS with a fresh-grep proof citation, or (c) be retired in H. No projection-only keeps.
3. **No destructive git as agent recovery**. All dispatched-agent prompts include the binding clause; orchestrator commits at every wave close. The G stash regression cannot recur.
4. **Post-close audit runs BEFORE FINAL.md is final**. The 4-agent challenge pattern (plan-vs-actual + substrate-without-consumer + doc-drift + idiomatic-gestalt) is part of the close ceremony, not an after-the-fact pass.
5. **Idiomatic gestalt > artefact preservation**. When a G-shipped artefact violates KISS / one-path / single-authority (e.g., Tabs requiring variant on both List + Trigger before its provide/inject refactor; ToggleGroupItem variant=card as separate CVA outlier), refactor to canonical even if that means breaking a now-private API.
6. **Consumer-evidence docs are now first-class**. `docs/consumer-evidence/<artefact>.md` files become the canonical mechanism for cross-consumer evidence. Each file carries the artefact name + the consumer file:line that exercises it + the `rg` invocation that produces the proof. Stale evidence docs (whose grep no longer finds the consumer) demote artefacts to retirement candidates.
7. **DESIGN.md is documentation-of-source, not specification**. Drift rows are docs-only edits; no source change flows from a DESIGN.md fix.
8. **Stress runtime profile is a hard gate, not a deferral**. R2 closes when actual measured numbers from the `_internal/blob-stress.vue` story land in `audit/W5-stress-baseline.md`, captured under headless WebGL2 (Playwright + Chromium) at the SPEC.md §9 thresholds.
9. **No new public components or composables**. H ships nothing new; it only wires-or-retires and refactors.
10. **Per-wave commits at wave close**. Orchestrator commits each wave's diff under a single tranche-letter-tagged commit (`feat(tranche-h/wN): ...`) at wave close. The G regression mode (uncommitted state across waves) cannot recur.

## Sub-tranche structure

H has no sub-tranches. Tranche G's sub-tranche β (Blob primitive) is closed; its residual R5 (Web Worker for state machine) remains deferred per SPEC.md §11.4 lock and re-opens only on 8+ multi-instance trigger evidence.

## Critical Files (initial)

| Concern | Path |
|---|---|
| Tranche plan | `docs/tranches/H/H.md` (this file) |
| Wave specs | `docs/tranches/H/waves/W{0..6}.md` |
| Audit reports | `docs/tranches/H/audit/W{N}-*.md` |
| Consumer evidence (NEW canon) | `docs/consumer-evidence/<artefact>.md` |
| Lessons learned (precept update) | `docs/precepts/instructions/LESSONS-LEARNED.md` |
| Tranche close criteria (precept update) | `docs/precepts/instructions/tranche/SPEC.md` |
| Orchestration discipline (precept update) | `docs/precepts/instructions/ORCHESTRATION.md` |
| Agent dispatch template (precept update) | `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md` |

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Reconciliation audit + binding precept update | 2 | parallel: reconciliation audit lane + precept-update lane | reconciliation-audit names every wire-or-retire decision; LESSONS-LEARNED.md + SPEC.md + ORCHESTRATION.md + AGENT_DISPATCH_TEMPLATE.md updated with G's four lessons; orchestrator commits W0 close | closed (`97c825e`) |
| W1 | Wire-or-retire surface trim | 5 | parallel implementation: components / composables / utilities-and-tokens / CVA-branches-and-slot-class / runtime-tokens | every library-orphan reaches verdict (wire / retire / consumer-evidence-doc); typecheck + build green; orchestrator commits W1 close | closed (`68e4097`) — 77 retires |
| W2 | DESIGN.md drift completion (R7) | 1 | docs-only on DESIGN.md | 47 remaining W0.β drift rows applied; verify rows 53-56 against current source; orchestrator commits W2 close | closed (`b4927ae`) — 57/57 rows |
| W3 | Slider glass-track + dock-keep-open round-trip (R3) | 1 (combined) | combined-lane: dock-keep-open sink + Slider variant ship | `<Slider variant="glass-track">` mounts with `:keep-dock-open` prop wired through `dockKeepOpenSink`; build + typecheck green; orchestrator commits W3 close | closed (`f3caa9f`) |
| W4 | Storybook coverage gaps + design-fidelity gate re-run | 1 | implementation on `demo/stories/primitives/slider-glass-track.vue` | new story authored; design-fidelity gate rerun (36 PASS / 41 NEEDS-REPAIR / 0 FAIL → R-NEW-1); orchestrator commits W4 close | closed (`28e6c6a`) |
| W5 | Wβ stress runtime profile capture (R2) | 1 | implementation on `scripts/stress/` + `.github/workflows/stress.yml` | Playwright + Chromium captures actual SPEC.md §9 numbers; `audit/W5-stress-baseline.md` records baselines; CI workflow lands; orchestrator commits W5 close | closed (`13ca1c3`) — FPS 119.62 / Mem/instance 0 KB |
| W6 | Close ceremony + post-close audit | 1 (orchestrator) + 4 audit lanes | implementation on `audit/H-{retro,FINAL}.md` + 4-agent post-close audit | post-close audit returns; FINAL.md authored AFTER audit findings absorbed; LESSONS-LEARNED + close criteria reconciled; tranche commits closed | in progress |

Total wave count: 7. Wave concurrency: W2 + W3 + W4 + W5 can run in parallel after W1 close (only orchestration ordering is W0 → W1 → {W2 ‖ W3 ‖ W4 ‖ W5} → W6).

## Hard gates

A wave closes only when all of:
1. typecheck + build green
2. wave proof doc (`audit/W{N}-*.md`) records every accepted finding's resolution
3. orchestrator commits the wave's diff (per invariant 10) — never carry uncommitted state across waves
4. PROGRESS.md status table reflects the close

Tranche H closes only when all of:
1. every wave closed per above
2. zero library-orphans remaining post-W1 (verified by re-running the β-style overfitting audit)
3. R2 hard-gate baseline captured (per W5)
4. R3 reachable per W3
5. R7 docs-only edit landed per W2
6. R4 + R5 + R6 carry named-destination residuals (no silent deferrals)
7. **Post-close audit runs and returns clean** before FINAL.md is final (per invariant 4)
8. binding precept updates landed in `docs/precepts/`

## Cross-tranche debt and explicit deferrals

### G residuals — disposition at H close

- **R1** DESIGN.md sync — resolved in G pass-2 (916 → 1073 lines). Closed.
- **R2** Wβ stress runtime profile — **closed in W5** (`13ca1c3`). Local M4 Max baseline + CI workflow + Playwright capture script all landed. FPS 119.62 / Memory per instance 0 KB.
- **R3** `<Slider variant="glass-track">` + dock keep-open round-trip — **closed in W3** (`f3caa9f`). `dockKeepOpenSink` ships as the canonical leaf-side primitive (replacing the retired `keepOpenWhile` Ref-prop).
- **R4** `<HarmonicLevelGrid>` / Filmstrip — stays out of scope per ≥2-bar; consumer territory. No destination opened.
- **R5** Blob Web Worker for state machine — stays deferred per SPEC.md §11.4; trigger is 8+ multi-instance use cases, not a date.
- **R6** Story-coverage residuals — **closed in W1+W4**. W1 retired the 7 G storyless artefacts (KeyboardShortcutsModal, TierBadge, LikeButton, useCollapse, useContrastSafeAccent, useMonacoTheme, defineDockActionBar); W4 authored the slider-glass-track story for the W3-shipped variant.
- **R7** 47 W0.β DESIGN.md drift rows — **closed in W2** (`b4927ae`). 57/57 rows resolved (W2 expanded the row scope to include G's pass-2 carryover).

### H residuals — named destinations

- **R-NEW-1** Pre-G story aesthetic uplift — 41 stories returned NEEDS-REPAIR in W4's design-fidelity rerun (pre-G primitive specimen sheets + containers + motion + foundations stories lack the bold-maximalist commitment). Per H invariant 9 ("no new public components or composables") + H scope ("design-fidelity gate is verification, not new commitment"), repair is deferred. **Named destination**: a future tranche workstream — each repair is ~30 lines of `<template>` addition (CreamSurface hero + DisplayHero + FlourishDivider + section threading).

- **R-NEW-2** `--cartoon-shadow*` round-trip aliases (8 tokens at `tokens.css:240-244,289-291` round-tripping through `theme.css:228-245`) — δ audit flagged as library-orphan-as-primitive (zero non-self consumers in src/+demo/). Same pattern applies to sibling `--soft-shadow`, `--elevated-shadow`, `--modal-shadow`, `--card-shadow`, `--dock-shadow{,-collapsed}` aliases. Pre-G rename scaffolding. **Named destination**: a future docs-only tranche or a Tailwind-4-@theme-cleanup pass — retiring the alias direction without breaking @theme's utility-class generation requires a careful pass that's out of H's wire-or-retire scope.

- **R-NEW-3** Stale D-tranche consumer-evidence-doc Source paths — three docs (`animated-number.md`, `use-animated-number-options.md`, `use-animated-number.md`) cite removed speedtest paths (`MetricPillCluster.vue`, `SpeedtestResults.vue`). Artefacts themselves are alive with alternate consumers. β audit flagged. **Named destination**: a docs-only refresh in a future tranche or in speedtest's own follow-up.

## Brittleness window

None planned. H opens against a green build and closes against a green build; no work shortens the substrate. If a wave reveals a regression that requires a brittleness window (e.g., the dock-keep-open round-trip in W3 momentarily breaks dock interactions), the wave spec declares it explicitly with a restoration wave per `tranche/SPEC.md` Brittleness Window protocol.

## Out of scope (explicit)

- Plugin extraction — still deferred (F left this; G left this).
- Bundle / CSS size floors as hard gates — measurements only.
- New design-language axes — G shipped the eleven-axis vocabulary; H does not extend.
- Consumer-repo edits — H does not touch consumer trees. Consumer migrations land in each consumer's own follow-up tranche per G invariant 12.
- New public subpath — runtime additions stay under existing `@mkbabb/glass-ui/tokens` per G invariant 13.
- New Web Worker / blob shared-compositor — locked deferred per SPEC.md §11.4.
- New CVA variants beyond Slider glass-track (R3) — H does not extend G's vocabulary; only closes its residuals.
- New stories beyond the gap-fill set required by W4 — design-fidelity gate is verification, not new commitment.
