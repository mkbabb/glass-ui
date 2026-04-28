# A.D.research.05 — Tranche D Plan Draft (by A5)

This is the **draft plan** for D produced by sub-agent A5; the orchestrator's synthesis (in `D.md` proper at tranche-open) may diverge based on cross-fold-in from A1/A2/A3/A4/A6 findings. Saved here as the canonical research artefact.

---

# D — Demo Wiring + Library Cleanup

Tranche document for Phase 4 of the glass-ui storybook reform. Adapted to the bbnf-lang tranche spec.

## Opening

C closed at tag `c-close` with seven dead-code items swept and 101 library-orphan candidates plus 21 generalize candidates forwarded as cross-tranche debt. C's audit deliberately conservative: its grep patterns missed cross-package internal imports (sortable-list, timeline, infinite-scroll all have demo stories yet showed as orphans), the auto-keep-on-public-surface rule masked half the signal until refined mid-execution, and the 63-composable count is acknowledged as an upper bound. **D triages each candidate against a hardened audit re-run, wires what should ship as a real storybook story, deletes what shouldn't and removes the deletes from `src/index.ts` re-exports, generalizes the named-but-one-shot utilities with a forward-compat doc, resolves the `src/components/custom/sidebar/composables/` vs `src/composables/` structural conflict, and folds in C-retro's three lessons.** D closes when a re-run of the canned overfitting audit reports ≤ 5 actionable items.

## Architectural thesis

Every public-surface symbol earns its export through a Playwright-walked story or a forward-compat doc naming the consumer roadmap entry. A library that exports a primitive its own demo cannot exercise is not a library — it is debt accumulating against §Invariant 5. The audit's verdict is the work's input, not its output: D's hard gates close on the post-D re-run actionable count, not on count of items processed. Sidebar's split structure is two violations of "concerns live where the import path says": fix it once, structurally. Audit claims do not survive contact with `rg`; every wire-or-delete decision re-grounds with a fresh runtime check.

## Invariants

Cross-tranche preserved (1-6 from C); D-specific:

7. **Re-grounded audit, not C's ledger.** Every wire/delete decision references a fresh `rg` against current master.
8. **Deletes remove from `src/index.ts`.** Half-deletes don't pass; gate closes only when `git diff src/index.ts` shows symbol removed AND `npm run build` exits 0.
9. **Wires are Playwright-walked.** A "wired" story whose route 404s, throws on mount, or renders empty `<main>` does not count.
10. **Forward-compat docs name the consumer.** `generalize` verdict closes only with a `docs/forward-compat/<name>.md` containing a named consumer roadmap entry.
11. **Agent budgets calibrated at dispatch.** Each prompt declares tool-call budget per the wave's measured-scope-per-call rate from C.W4 (~4-5 routes per Playwright budget call).

## Wave schedule

| Wave | Title | Agents | Mode | Hard gate |
|---|---|---|---|---|
| W0 | Audit re-run + triage classification | 5 | parallel | hardened-audit ledger present; every C-forwarded candidate re-grepped; per-candidate verdict ∈ {wire, generalize, delete}; sidebar restructure decision recorded |
| W1 | Wire pass — orphan packages with demo stories | 5 | parallel | every `wire`-verdict has story file + manifest entry; route renders non-empty `<main>` with zero console errors |
| W2 | Delete pass + sidebar restructure + index.ts sweep | 4 | parallel | named symbols removed from `src/index.ts`; CLAUDE.md reconciled; sidebar restructured per W0 decision; `npm run build` exit 0 |
| W3 | Generalize pass — forward-compat docs | 2 | parallel | `docs/forward-compat/*.md` exists per `generalize`; each cites named consumer |
| W4 | Folded velocity + library-substrate (sibling A3/A4 fold-ins) | 2-4 | parallel | A3/A4 findings landed OR explicitly forwarded with destination |
| W5 | Re-audit + close ceremony | 4 + orchestrator | parallel | re-run audit's actionable count ≤ 5; FINAL.md + retro committed; tag `d-close` |

## Phases

### D.W0 — Audit re-run + triage classification (5 parallel)

#### D.W0.A — Hardened audit re-run
Re-run canned prompt with two refinements: (1) for composables, also `rg <symbol> src/` separately from import grep (C's regex missed re-export-chain consumers); (2) for components, `rg '<ComponentName' src/ demo/` (Vue tag form) catches `<GlassTimeline>`-style template references.

**Sub-gate**: integrated 4-agent table covers C's 335-row baseline; per-row `c-w0-verdict` vs `d-w0-verdict` with `delta` column; expected delta count ≥ 10.

#### D.W0.B — Triage classification per candidate
Synthesize 4-agent table into single triage MD: `candidate | def-site | actual-site-count-rerun | proposed-action ∈ {wire, generalize, delete} | rationale-with-rg | budget-estimate-tool-calls`.

**Wire-vs-delete cutoff**: candidate is `wire` iff a single-page demo story can be authored in ≤ 1 day demo work (≤ 80 SLoC `<template>` + ≤ 40 SLoC `<script setup>`, no new library code, no new utilities). Otherwise → `generalize` or `delete`.

**Sub-gate**: every C-forwarded candidate has row OR documented in `audit/W0-already-resolved.md`. Sum = 101.

#### D.W0.C — Sidebar structural decision
Three options: (i) move composables to `src/composables/sidebar/`, (ii) keep current + remove re-export shim, (iii) split (composables move, types stay). Decision criterion: fewest cross-file edits + best convention match.

**Sub-gate**: decision document names option, enumerates files to move, names W2 sub-phase that executes.

#### D.W0.D — Plan critical-files audit
Verify every file in §Critical files exists; demo paths correct; W1 allow-lists disjoint; W2 delete-list disjoint from W1 wire-list.

**Sub-gate**: zero overlapping allow-lists; W1/W2 disjointness intersection = ∅.

#### D.W0.E — Sibling-fold-in stub
A3 + A4 outputs land at `audit/W0-fold-A3.md` + `W0-fold-A4.md`. If absent, record "no findings forwarded" + name destination tranche.

**Sub-gate**: both files exist; substantive findings OR explicit "no findings; forwarded to {E,F}".

**Hard gate (W0)**: 5 audit docs landed; triage covers every C-forwarded candidate; sidebar decision recorded; file-bounds disjoint; A3/A4 fold-in declared.

### D.W1 — Wire pass (5 parallel)

#### D.W1.A — Search package wiring
`demo/stories/data/search.vue`: textbox bound to `useFuzzySearch` over 50-row sample dataset; results in `<Card>`; `buildIndex`/`searchIndex`/`fuzzyMatch`/`clearSearchCache` exercised via story controls.
**Sub-gate**: Playwright at `/data/search`: route loads; `<main>.children.length > 0`; typing changes results count; zero console errors.

#### D.W1.B — Sortable + Glass-carousel coverage
Verify existing `data/sortable-list.vue` covers `SortableHandle` + `SORTABLE_CONTEXT`; extend if needed. Author `containers/glass-carousel.vue` exercising `GlassCarousel` + `Item` + `useGlassCarousel`.
**Sub-gate**: drag-handle visible; reorder moves DOM; carousel pages on click; `useGlassCarousel`'s active index reactive.

#### D.W1.C — Sidebar story (composable-driven)
`demo/stories/navigation/progressive-sidebar.vue` exercising `ProgressiveSidebar` + 5 sidebar composables + `buildTreeIndex`/`isActive`/`isInActiveChain` helpers. Tree of mock sections; sidebar tracks scroll; click navigates.
**Sub-gate**: scroll updates active-row class within 500ms; tree expand/collapse works; zero errors.

#### D.W1.D — Dock subset coverage
Extend `navigation/dock.vue` + `navigation/dock-layers.vue` with sections demoing `DockPopover`, `DockSelectTrigger`, `DockDropdownTrigger`, `DockIconButton`, `DockLayerGroup`. No fresh routes — gestalt: dock primitives belong together.
**Sub-gate**: every named subcomponent in DOM; each interactive subcomponent's basic action fires.

#### D.W1.E — Singleton orphans wiring
Triage from W0.B determines per-singleton action. Wire candidates extend existing category stories (Pulse/StatusDot → feedback; ToggleChip → primitives/buttons; ConfirmDialog → containers/dialog; TypewriterText/StackedIconGroup → compositions). New routes only when no fit.
**Sub-gate**: Playwright walk over modified routes; every wired component in DOM; manifest row growth ≤ 2.

**Hard gate (W1)**: every `wire`-verdict has Playwright-rendered story; typecheck + build clean; full route walk zero console errors.

### D.W2 — Delete pass + sidebar restructure (4 parallel)

#### D.W2.A — Delete unwired components
For each `delete`-verdict component: `rm -rf src/components/custom/<package>/`; remove from `src/components/custom/index.ts`; remove from `src/index.ts` if direct; remove row from `CLAUDE.md`.
**Sub-gate**: typecheck exit 0; build exit 0; `git diff src/components/custom/index.ts` shows exports removed; bundle size shrinks.

#### D.W2.B — Delete unwired composables + restructure sidebar
Delete sweep + execute W0.C's sidebar decision via `git mv` and `src/composables/index.ts` rewrites.
**Sub-gate**: typecheck + build exit 0; `rg 'from "@/components/custom/sidebar/composables"' src/ demo/` empty; consumer build smoke clean.

#### D.W2.C — Delete unwired CSS classes
Remove `@utility <name>` blocks or `.class` rules per W0.B. Expected small (W0.A's re-run; most styles rows verdicted `generalize`).
**Sub-gate**: full route walk produces zero "missing utility" warnings.

#### D.W2.D — `src/index.ts` reconciliation + CLAUDE.md sync
Orchestrator-led consolidation post-W2.A/B/C cherry-picks. Verify cascade resolves; deleted package absent; update CLAUDE.md structure tree and component/composable counts.
**Sub-gate**: build exit 0; `dist/index.d.ts` doesn't contain deleted symbol names; CLAUDE.md counts match `find` reality.

**Hard gate (W2)**: typecheck + build clean; bundle strictly smaller than c-close; three consumer builds clean; CLAUDE.md counts match filesystem.

### D.W3 — Generalize pass — forward-compat docs (2 parallel)

#### D.W3.A — Per-`generalize` doc creation
Create `docs/forward-compat/<artefact>.md` per W0.B `generalize` verdict. Each: artefact path, current single-consumer site, **named roadmap consumer (project + use case)**, keep rationale, re-audit-immunity clause. No "future use" hand-waves — no roadmap entry → flip to `delete`.
**Sub-gate**: every `generalize` verdict has doc; each has ≥ 5-line "named roadmap consumer" section citing specific consumer repo path; no doc body contains "future use" / "may be useful" / "TBD".

#### D.W3.B — Index + invariant binding
Create `docs/forward-compat/README.md` with table (artefact | doc | consumer | added-in-tranche). Update `docs/audits/overfitting-audit.md` verdict precedence: "before assigning `library-orphan`, check `docs/forward-compat/`; if doc names artefact, verdict is `keep` with citation."
**Sub-gate**: README row count = W3.A doc count; canned prompt's verdict precedence references forward-compat directory.

**Hard gate (W3)**: `ls docs/forward-compat/*.md | wc -l` = `generalize` count + 1 (README); each non-README passes named-consumer grep.

### D.W4 — Folded velocity + library-substrate (conditional)

- A3 surfaced reka-ui/@vueuse redundancy → D.W4.A wires the collapse.
- A4 surfaced Vitest/three-tier/script changes → D.W4.B lands the tooling.
- Neither → declare `rationale-satisfied`; forward to E with named destination.

**Hard gate (W4)**: substantive landings OR explicit rationale-satisfied close with named destination. Silent omission forbidden.

### D.W5 — Re-audit + close ceremony

#### D.W5.A — Re-run hardened audit
Re-dispatch 4-agent audit (now with verdict-precedence forward-compat lookup from W3.B). Compute actionable count.
**Sub-gate**: actionable count ≤ 5. **5 < count ≤ 15**: declare D-II per SPEC §"Multi-pass tranche split". **count > 15**: stop, dispatch research+plan+redress per §Diagnostic-loop relinquish.

#### D.W5.B — Final QA sweep
Playwright walks every route in light + dark (drop reduced-motion per C.W4 Playwright MCP limitation; forwarded to E). Three consumer builds.
**Sub-gate**: light + dark zero errors; consumer builds clean; bundle strictly smaller than c-close.

#### D.W5.C — FINAL.md
Per-wave commit hashes; hard-gate verification with artefact paths; deferred ledger naming destinations.

#### D.W5.D — Retro
Lessons covering: audit-claim-hardening discipline; agent-budget calibration; sidebar restructure scope-reveal; gestalt scope-reveals.

#### D.W5.E (orchestrator) — tag `d-close`

**Hard gate (W5)**: re-audit actionable count ≤ 5 (or D-II declared); FINAL.md + retro committed; tag placed.

## Critical files

(Full table in source plan; abridged here.)

| Path | Owner | Access |
|---|---|---|
| `docs/tranches/D/audit/W0-*.md` (5 files) | D.W0 | create |
| `demo/stories/data/search.vue` | D.W1.A | create |
| `demo/stories/containers/glass-carousel.vue` | D.W1.B | create |
| `demo/stories/navigation/progressive-sidebar.vue` | D.W1.C | create |
| `demo/stories/navigation/dock*.vue` | D.W1.D | modify |
| `demo/stories/manifest.ts` | D.W1.A-E | modify-disjoint-hunks |
| `src/components/custom/<deleted>/**` | D.W2.A | delete |
| `src/composables/sidebar/**` | D.W2.B | create+rename |
| `src/index.ts`, `CLAUDE.md` | D.W2.D | modify-orchestrator-consolidation |
| `docs/forward-compat/*.md` (×21+) | D.W3.A | create |
| `docs/audits/overfitting-audit.md` | D.W3.B | modify |
| `docs/tranches/D/audit/W5-*.md` (5 files) | D.W5.A | create |
| `docs/tranches/D/FINAL.md` | D.W5.C | create |

## Hard gates summary

Every gate closes on runtime/artefact evidence: `npm run build` exit, Playwright DOM eval, bundle size delta, file existence + content. No grep-only "is the export gone" gates.

### Gate floor-check (W5.A)

C.W0 was 108 actionable; D wires N (~30-50), deletes M (~20-40), generalizes K (~21+). Conservative conversion (75% wire success, 95% delete, 100% generalize) → residual 5-15. **≤ 5 gate is achievable but tight; 5 < count ≤ 15 fallback declares D-II** per SPEC §"Multi-pass tranche split" — explicitly named so gate isn't structurally unreachable.

## Cross-tranche debt

**Inherited from C**: 101 library-orphans (W0.A re-run flips ~10-15 to `keep`); 21 generalize (resolved at W3); 4 already-deleted (D verifies cascade); velocity gap (D.W4 absorbs A4); reduced-motion emulation (forwarded to E).

**Forwarded to E or beyond**: reduced-motion visual emulation; A3/A4 findings if W4 doesn't absorb; consumer adoption push (F per C-FINAL); deeper a11y sweep.

## Escape clause

- **Absorb-mode default**: if W1 wire reveals candidate needs new library code (not just demo SLoC), flip to `delete` mid-W1 and route through W2.
- **D-II split**: 5 < W5 actionable ≤ 15 → D-II opens with residual triage. > 15 → halt + triumvirate.
- **Sibling-fold-in absence**: A3/A4 absent at W0.E is not a blocker; W4 declares `rationale-satisfied` with named destination.
- **Diagnostic-loop relinquish**: 3+ iterations without commit → halt; orchestrator dispatches research+plan+redress.

## Ground rules

Inherited from bbnf-lang SPEC: no workarounds, no legacy code, no silent deferrals, no grep-only gates, no god modules, substrate-with-consumer, frequent commit, master clean before each wave, indefatigability, idiomatic gestalt approach. Plus D-specific: audit-claim hardening (re-grep before action), agent-budget calibration at dispatch.
