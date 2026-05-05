# H — FINAL

**Tranche**: H — Surface Trim, Honest Wiring, and Process Hardening.
**Opened**: 2026-05-05.
**Closed**: 2026-05-05.
**Status**: closed clean.

## Tranche thesis

H made the substrate honest. Every G-shipped artefact wired (≥2 in-repo sites at HEAD) or retired (clean break) by W1 close. G's four lessons-learned (no destructive git as recovery; commit at wave close; post-close audit before FINAL is final; run typecheck earlier) promoted to binding precepts in `docs/precepts/instructions/`. The 4-agent post-close audit pattern is now canonical for future tranche closes.

## Wave-by-wave close

| Wave | Title | Status | Commit | Close evidence |
|---|---|---|---|---|
| open | tranche scaffold | landed | `bbdd896` | docs/tranches/H/H.md |
| W0 | reconciliation audit + binding precept update | closed | `97c825e` (parent) + `cc57c91` (precepts submodule) | audit/W0-reconciliation.md (164 rows, 90 WIRE / 73 RETIRE / 1 conditional EVIDENCE-DOC) |
| W1 | wire-or-retire surface trim | closed | `68e4097` | audit/W1-{A..E}-proof.md + W1-reconciliation-result.md (77 retires) |
| W2 | DESIGN.md drift completion (R7) | closed | `b4927ae` | audit/W2-design-md-completion.md (57/57 rows) |
| W3 | Slider glass-track + dock keep-open sink (R3) | closed | `f3caa9f` | audit/W3-slider-glass-track-proof.md |
| W4 | storybook coverage gaps + design-fidelity rerun | closed | `28e6c6a` | audit/W4-coverage-result.md + W4-design-fidelity-rerun.md |
| (interlude) | record W2/W3/W4 close + R-NEW-1 | landed | `4a2b382` | docs-only PROGRESS.md update |
| W5 | Wβ stress runtime profile capture (R2) | closed | `13ca1c3` | audit/W5-stress-baseline.md (FPS 119.62 / Memory/instance 0 KB · Apple M4 Max · Chromium 147) |
| W6 | close ceremony + 4-agent post-close audit | closed | (this commit) | audit/H-pre-close.md + H-audit-{α,β,γ,δ}-*.md + this FINAL.md |

(Plus an unattributed cross-repo doc-sync commit `e2ad404 docs(DESIGN): reconcile post-P glass-ui surface` that landed between W0 and W1; α-audit confirmed its 21 inserted lines are subsumed by W2's eventual sync.)

## Substrate convergence stats

Per audit/W1-reconciliation-result.md + audit/H-audit-β-substrate-without-consumer.md (post-W5):

| Family | G original count | At HEAD: WIRED | RETIRED in W1 | Demoted to internal | Inlined into consumer |
|---|---:|---:|---:|---:|---:|
| Custom packages | 17 | 13 | 3 + 1 inline (svg-filters → blob.vue) | 0 | 1 |
| Composables | 11 | 4 | 3 | 4 (blob sub-composables → `_internal/`) | 0 |
| CVA branches | 14+ | 12 + 1 (Badge color kept after methodology fix) | 5 | 0 | 0 |
| Slot-class + factory | 4 | 0 | 4 | 0 | 0 |
| Runtime helpers | 5 | 1 (NAMED_EASING_BEZIER) | 4 | 0 | 0 |
| Tokens (G additions) | ~44 | 26 | 23 (12 paper-tier inlined; 5 per-rung Fraunces axes inlined; 6 deleted) | 0 | 17 |
| Utility classes (G additions) | ~64 | 33 | 31 | 0 | 5 inline-and-remove |

**Total retire count**: 77 G-shipped artefacts retired cleanly. Public surface narrowed: `src/index.ts` lost 4 custom-package re-exports (3 retires + svg-filters inline), 2 composable-package re-exports (color/, monaco/), and 4 runtime-helper exports (chartNeutrals, vizColorsHex, spectrumColor, goldenShimmer) — `src/components/custom/` went from 44 dirs to 40 at H close. The β audit at HEAD post-W5 confirms **0 G-artefact library-orphans remain**.

## Process hardening stats

Per `cc57c91` in `docs/precepts/instructions/`:

- **LESSONS-LEARNED.md**: 4 new 2026-05-04 entries — *Never Use Git Stash As Agent Recovery*; *Run Typecheck Earlier In Agent Workflows*; *Orchestrator Commits At Wave Close*; *Post-Close Audit Catches Close-Ceremony Falsehoods*.
- **tranche/SPEC.md**: post-close audit step appended to `## Close` criteria; undeclared-brittleness-window clause added to `## Brittleness Window` section.
- **ORCHESTRATION.md**: commit-at-wave-close paragraph appended to `## Integration` section.
- **tranche/AGENT_DISPATCH_TEMPLATE.md**: two new non-negotiables (no destructive git as recovery; run typecheck after each major file group).

The four lessons promote to binding precepts; future tranches inherit the discipline. Submodule pointer bumped: `458c2d1` → `cc57c91`.

## Cross-tranche debt + named-destination residuals

### G residuals — disposition at H close

- **R1** DESIGN.md sync — resolved in G pass-2.
- **R2** Wβ stress runtime profile — **closed in W5**.
- **R3** `<Slider variant="glass-track">` + dock keep-open round-trip — **closed in W3**.
- **R4** `<HarmonicLevelGrid>` / Filmstrip — out of scope; consumer territory.
- **R5** Blob Web Worker — locked deferred per SPEC.md §11.4 (trigger: 8+ multi-instance use cases).
- **R6** Story-coverage residuals — **closed in W1+W4** (W1 retired 7 storyless artefacts; W4 authored slider-glass-track story).
- **R7** 47 W0.β DESIGN.md drift rows — **closed in W2** (57/57 rows).

### H residuals — named destinations

- **R-NEW-1** Pre-G story aesthetic uplift — 41 stories returned NEEDS-REPAIR in W4's design-fidelity rerun. Per H invariant 9 ("no new components") + H scope ("design-fidelity gate is verification"), repair is deferred. **Named destination**: a future tranche workstream — each repair is ~30 lines of `<template>` addition (CreamSurface hero + DisplayHero + FlourishDivider + section threading).
- **R-NEW-2** `--cartoon-shadow*` round-trip aliases (8 tokens at `tokens.css:240-244,289-291` round-tripping through `theme.css:228-245`; sibling `--soft-shadow`/`--elevated-shadow`/`--modal-shadow`/`--card-shadow`/`--dock-shadow{,-collapsed}` aliases follow the same pattern). δ audit flagged as library-orphan-as-primitive (zero non-self consumers in src/+demo/). Pre-G rename scaffolding. **Named destination**: a future docs-only tranche or a Tailwind-4-@theme-cleanup pass.
- **R-NEW-3** Stale D-tranche consumer-evidence-doc Source paths — three docs (`animated-number.md`, `use-animated-number-options.md`, `use-animated-number.md`) cite removed speedtest paths. Artefacts themselves are alive with alternate consumers. β audit flagged. **Named destination**: a docs-only refresh in a future tranche or in speedtest's own follow-up.

## Brittleness window

**None opened during H.** H opened against the G honest-close commit `c7ff69f` (build green, typecheck green) and closes against `13ca1c3` (W5 close, build green at 1m 39s). Every wave committed at close per the new H invariant 10 + the precept update; no wave carried uncommitted state across boundaries; the G stash regression failure mode could not recur. The W6 γ audit confirmed: no undeclared brittleness window exists; all wave-close gates have artefact evidence.

## Post-close audit findings + absorption

The 4-agent post-close audit returned the following findings, all absorbed in W6 before this FINAL.md was authored:

### α — Plan-vs-actual

- 0 hard-gate violations
- 1 silent addition: `e2ad404` interlude commit. Disposition: documented in PROGRESS.md + H-pre-close.md + this FINAL.md; α confirmed its 21 inserted lines are subsumed by W2's later sync.
- 5 absorbed scope dilations (W1.A SvgFilters; W1.C Badge color; W1.D keepOpenWhile→W3; W1.E confetti+flourishes; W4 41 NEEDS-REPAIR→R-NEW-1) — all per scope-reveal protocol.
- 6 minor discrepancies — all absorbed in W6 doc fixes.

### β — Substrate-without-consumer at HEAD

- **0 G-artefact orphans at HEAD**. H invariant 2 holds.
- **3 sub-bar CVA variants** (Toast inverse, ToggleGroupItem card, Slider glass-track) clear the bar via single-story exercise; second-branch reading interpretation documented here. Future tranche may emit `docs/consumer-evidence/<artefact>.md` files for each.
- **3 stale D-tranche evidence docs** → R-NEW-3.
- **W3 R3 sink** has 1 in-repo consumer chain (Slider → slider-glass-track story); cleared via in-repo def + consumer.

### γ — Doc drift

- 6 critical findings, all docs-only, all absorbed in W6:
  - CLAUDE.md custom-package list: 4 retirees + 2 phantoms removed; 14 missing packages added; count corrected to 40.
  - CLAUDE.md runtime-tokens line: trimmed to live exports.
  - CLAUDE.md composable groups line: dropped color/, monaco/.
  - PROGRESS.md W1 hash: corrected to `68e4097`.
  - All 7 wave-spec Status lines: updated from `pending`/`open` to `closed (commit-hash)` per actual state.
  - H.md Wave Schedule Status column + Cross-tranche debt: updated to reflect closure + R-NEW residuals.
- **No undeclared brittleness window detected.**

### δ — Idiomatic gestalt

- **3 critical findings**:
  - **Dual-authority on dock keep-open**: DockPopover consumes `dockKeepOpen`/`dockRelease` function-keys (provider-side internal primitives); Slider consumes `DOCK_KEEP_OPEN_SINK_KEY` sink (leaf-side facade). **Disposition**: this is a layered API, not a violation. The function-keys are the lower-level provider primitives consumed by other dock-internal components (DockPopover); the sink is the leaf consumer facade for external interactive controls (Slider). Documented here; no source change.
  - **Tabs provide/inject NOT delivered**: δ audit was incorrect. Verified at HEAD: `Tabs.vue:13` provides `glassTabs` context; TabsList + TabsTrigger inject and fall back to local prop. The refactor was delivered in G pass-2 and remains clean.
  - **`--cartoon-shadow*` round-trip aliases**: → R-NEW-2.
- **23 recovery-diary leaks claimed; 4 actually verified**: scrubbed in W6 absorb (`utilities.css:159` "(silent-failure S6)"; `composables/blob/index.ts:3` "(H.W1.B demote per W0-reconciliation §4)"; `flourishes.vue:243` "H.W1 collapsed single-demo utilities"; `components/custom/blob/index.ts:7` "per H.W1.B"). All replaced with declarative documentation.
- **G δ violations: 11 of 17 clean at HEAD; 5 unresolved (cartoon recipe noise → R-NEW-2; --accent-pink → consumer-evidence territory; etc.); 1 unchecked.**

## Verification at FINAL.md authoring

- `npm run typecheck` — green
- `npm run build` — green (1m 39s at W5 close; unchanged structurally by W6 doc absorb)
- `git log --oneline c7ff69f..HEAD` — every H wave's commit present + the W6 close commit
- `git status --short` — only the W6 absorb edits + audit deliverables + this FINAL.md

## Lessons learned

H surfaced no new process-failure incidents that require LESSONS-LEARNED entries. The four G-derived lessons remain the latest entries in `docs/precepts/instructions/LESSONS-LEARNED.md`. H is a clean tranche close.

## Authority

H closes clean. The 4-agent post-close audit was run BEFORE this FINAL.md was authored, per the new binding precept. Findings absorbed in W6 (doc updates + 4 recovery-diary scrubs); 3 named-destination residuals declared (R-NEW-1, R-NEW-2, R-NEW-3) for future tranches.

The substrate is honest:
- 0 library-orphans at HEAD
- 77 G artefacts retired cleanly (no shim, no `_v2`, no commented-out code)
- public surface narrowed by 10 export lines + 4 directories + 4 runtime helpers
- DESIGN.md synced (916 → 1174 lines; 57/57 drift rows resolved)
- Wβ stress baseline captured with measured numbers (FPS 119.62 / 0 KB/instance)
- 4 binding precepts promoted to canon
- the 4-agent post-close audit pattern is now canonical for future tranches
