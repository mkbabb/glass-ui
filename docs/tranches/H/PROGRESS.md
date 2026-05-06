# H - Progress Log

## 2026-05-04 — Tranche open

H opens against the G honest-close state at HEAD: build/typecheck green; tranche G `FINAL.md` (v1) + `G-FINAL-II.md` (post-audit honest re-close) both present; four post-close audit reports under `docs/tranches/G/audit/G-audit-{α,β,γ,δ}-*.md`; six consumer migration ledgers under `docs/tranches/G/audit/W5-{consumer}-migration.md`. Total G diff vs master: 3,134 insertions / 533 deletions across 60 files.

H reads G's audit findings as the load-bearing input — no open design space, no new research wave, no challenge wave.

H thesis: substrate convergence + process hardening. Every G artefact wires-or-retires; G's four lessons-learned promote to binding precepts.

Wrote initial `H.md`, `waves/W0.md` through `W6.md`, this `PROGRESS.md`.

## 2026-05-05 — H opened against committed G state

Pre-W0 remediation: G's accumulated working-tree state (187 files / 21,993
ins / 409 del vs HEAD) was uncommitted at H open; per H invariant 10 +
G-FINAL-II Lesson 3 ("Orchestrator commits at wave close"), the
orchestrator landed two retrospective commits before opening W0:

- `c7ff69f feat(tranche-g/honest-close)` — G's accumulated state
- `bbdd896 chore(tranche-h/open)` — H plan + wave specs scaffold

This puts H's first wave on committed state; future destructive recovery
cannot reach pre-commit work.

## 2026-05-05 — W0 closed

W0 ran two parallel lanes (read-only audit + submodule precept update).

**Lane I deliverable**: `audit/W0-reconciliation.md` (310 lines, 164
artefact rows). Verdict distribution: **90 WIRE (already)** · **73
RETIRE** · **1 conditional EVIDENCE-DOC**. Consumer-evidence-doc invariant
verified at HEAD: zero G-artefact docs (24 entries, all D-tranche), so
projection-only support defaults to RETIRE per H invariant 2.

**Lane II deliverable**: submodule commit `cc57c91 feat(precepts):
promote G's four lessons to binding precepts` lands the four 2026-05-04
entries in `docs/precepts/instructions/`:

- LESSONS-LEARNED.md: 4 new entries (no destructive git as recovery; run
  typecheck earlier; orchestrator commits at wave close; post-close
  audit catches close-ceremony falsehoods).
- tranche/SPEC.md: post-close audit step + undeclared-window clarification.
- ORCHESTRATION.md: commit-at-wave-close paragraph.
- tranche/AGENT_DISPATCH_TEMPLATE.md: two new non-negotiables.

**W0 close commit**: `e6f1411 feat(tranche-h/w0): reconciliation audit +
binding precept updates`. Submodule pointer 458c2d1 → cc57c91.

Hard gate met: audit ledger landed; precept files updated; typecheck +
build green at HEAD; wave commit landed.

## 2026-05-05 — W1 closed

W1 ran 5 parallel lanes (custom components / composables / CVA / slot-class+factory / utilities+tokens). All 5 returned with substantial scope reveals; orchestrator absorbed at wave close.

**Final retire counts** (per `audit/W1-reconciliation-result.md`):

| Family | Retired | Kept (after methodology fix) | Inlined |
|---|---:|---:|---:|
| Tokens | 23 | — | 0 |
| Utilities | 31 | — | 5 single-demo as scoped CSS (in flourishes.vue + confetti.vue + others) |
| Components | 4 | — | SvgFilters/RainbowGradientDef inlined into blob.vue |
| Composables | 3 retired + 4 demoted | — | 0 |
| CVA branches | 5 | 1 (Badge `color` — 5 CVA-direct call sites) | 0 |
| Slot-class + factory | 3 | — | 0 |
| Runtime helpers | 4 | — | 0 |
| **Total** | **77** | **1** | **2 inline-and-remove paths** |

**Scope reveals absorbed at orchestrator level**:
1. `<SvgFilters>` + `<RainbowGradientDef>` had 1 demo consumer (blob.vue). Per overfitting-audit precedence (single-site = inline-and-remove), orchestrator inlined `<svg><defs>...</defs></svg>` directly into blob.vue's template; package directory deleted.
2. `<Badge variant="color">` had 5 CVA-direct sites (`badgeVariants({ variant: 'color' })`) in color-pill.vue — W0 grep methodology missed CVA-direct invocations. KEPT.
3. `keepOpenWhile` retired (Lane D); `W3.md` Lane I amended at W1 close to ship `dockKeepOpenSink` as the canonical and sole dock-keep-open primitive.
4. `flourishes.vue` had 8 dangling utility-class refs after Lane E retired global definitions; orchestrator added `<style scoped>` block restoring the 8 rules using surviving tokens + literal HSLs.
5. `@keyframes confetti-fall` orphan after `.confetti-piece` consumer-inlining; orchestrator deleted from animations.css.
6. Manifest prose mentions of retired classes updated.

**Hard gate met**:
- `npm run typecheck` — green
- `npm run build` — green (verified at wave close)
- `audit/W1-reconciliation-result.md` records every artefact's resolution
- Zero artefacts remain library-orphan post-W1 (verified by orchestrator-side fresh grep of all retired names)
- Every retire is a clean break (no shim, no `_v2`, no commented-out code)

**W1 close commit**: `68e4097`.

**Note**: an unattributed commit `e2ad404 docs(DESIGN): reconcile post-P glass-ui surface — DockGroup, GlyphFace cap knob, DiscoGlyph` landed between W0 close and W1 close (timestamp 03:23:29). The change is a benign cross-repo DESIGN.md sync from speedtest P.W5/close-3 (out of any H wave's bounds). Origin is unclear (possibly an agent commit despite the non-commit directive); per H invariant 3 (no destructive git as recovery), it stays in history. W6's α-audit confirmed the 21 inserted lines are subsumed by W2's eventual sync (W2 expanded DESIGN.md to 1174 lines, containing all e2ad404 content).

## 2026-05-05 — W2/W3/W4 closed in parallel

W2 (DESIGN.md drift completion) ran single-lane — 57/57 drift rows resolved; DESIGN.md 916 → 1174 lines.

W3 (Slider glass-track + dock keep-open sink) ran single combined-lane: `DockKeepOpenSink` imperative API (acquire/release tokens) provided by `<DockLayerGroup>`; `<Slider variant="glass-track">` ships with `:keep-dock-open` prop wired through pointer events; build green at 25s.

W4 (Storybook coverage gaps + design-fidelity rerun) ran single-lane: authored `demo/stories/primitives/slider-glass-track.vue` (3 sections — Hero / Three shapes / Dock round-trip); manifest entry added; design-fidelity rerun scored 77 stories at **36 PASS / 41 NEEDS-REPAIR / 0 FAIL**.

**Scope reveal — 41 NEEDS-REPAIR stories**: pre-G primitive specimen sheets + containers + motion + foundations stories lack the bold-maximalist design-language commitment. Per dispatch protocol W4 halted-and-reported. Per H invariant 9 ("no new public components or composables") + H scope ("design-fidelity gate is verification, not new commitment"), the 41 repair tasks become **R-NEW-1: pre-G story aesthetic uplift** — named-destination residual for a future tranche workstream. Each repair is ~30 lines of `<template>` addition (CreamSurface hero + DisplayHero + FlourishDivider + section threading).

**W2 close commit**: `b4927ae`.
**W3 close commit**: `f3caa9f`.
**W4 close commit**: `28e6c6a`.

## Status

| Wave | Status | Commit |
|---|---|---|
| W0 | closed | `97c825e` (lane II submodule: `cc57c91`) |
| W1 | closed | `68e4097` |
| W2 | closed | `b4927ae` |
| W3 | closed | `f3caa9f` |
| W4 | closed | `28e6c6a` |
| W5 | closed | `13ca1c3` |
| W6 | closed | (this commit) |

## 2026-05-05 — W6 closed (tranche H FINAL)

W6 ran in this order:

1. **Pre-close orchestrator pass**: build/typecheck green; per-wave commit ledger compiled at `audit/H-pre-close.md`.
2. **4-agent post-close audit dispatch**: α (plan-vs-actual), β (substrate-without-consumer), γ (doc-drift), δ (idiomatic-gestalt) ran in parallel. Each returned a deliverable at `audit/H-audit-{α,β,γ,δ}-*.md`.
3. **Findings absorb**: doc-only fixes applied in W6 (CLAUDE.md custom-package list + runtime helpers + composable groups; PROGRESS.md hash; all 7 wave-spec Status lines; H.md Wave Schedule + Cross-tranche debt; 4 recovery-diary leaks scrubbed). Three findings became named-destination residuals: R-NEW-1 (41 pre-G stories needing aesthetic uplift) + R-NEW-2 (`--cartoon-shadow*` round-trip aliases) + R-NEW-3 (3 stale D-tranche evidence-doc Source paths).
4. **FINAL.md authored** AFTER absorb completion, per the new binding precept (post-close audit returns clean before FINAL is final).
5. **Lessons-learned reconciliation**: H surfaced no new process-failure incidents; the four G-derived lessons remain the latest entries.
6. **W6 close commit** records the absorb + audit deliverables + FINAL.md.

The substrate is honest: 0 library-orphans at HEAD; 77 G artefacts retired cleanly; public surface narrowed; DESIGN.md synced; Wβ stress baseline captured; 4 binding precepts promoted to canon; the 4-agent post-close audit pattern is now canonical for future tranches.

## 2026-05-05 — W5 closed

W5 (stress runtime profile capture) ran single-lane. All five phases delivered:

- **Story extension** (one-line additive write at `demo/stories/_internal/blob-stress.vue:84-86`): `window.__blobStressMetrics = result` for headless extraction.
- **Capture script** (`scripts/stress/blob-stress-capture.mjs`): boots dev server, launches Playwright + Chromium with software WebGL, navigates to `_internal/blob-stress`, clicks Run profile, extracts metrics, writes baseline.
- **Playwright installed** (devDependency): playwright + @playwright/test + chromium browser binary.
- **CI workflow** (`.github/workflows/stress.yml`): pull_request + push + workflow_dispatch triggers; checkout/node22/npm ci/playwright install --with-deps/build/`STRESS_CI_RELAX=1 npm run stress`; uploads baseline artifact + posts PR comment; hard-fails on threshold violation.
- **Local baseline** (Apple M4 Max · 64 GB RAM · Chromium 147): FPS 119.62 (gate ≥ 30) PASS · Memory per instance 0 KB (gate ≤ 256 KB) PASS. Mean frame 8.36 ms / max 25.10 ms (informational).

Per H invariant 8 — stress runtime profile is a hard gate, not a deferral. R2 closes with measured numbers landed.

**W5 close commit**: `13ca1c3`.

## W1 dispatch input

W1 must retire 73 G-shipped artefacts cleanly + leave 90 WIRE-already
artefacts untouched. The W0 reconciliation ledger (Lane I deliverable)
is the load-bearing input for W1's lane decomposition. Per W1.md, lanes
split disjointly:

- **Lane A (custom components)**: retire `<KeyboardShortcutsModal>`,
  `<TierBadge>`, `<LikeButton>`, `<SvgFilters>` package + delete
  manifest entries + remove from `src/index.ts`.
- **Lane B (composables)**: retire `useCollapse`, `useContrastSafeAccent`,
  `useMonacoTheme`; demote 4 blob sub-composables to internal.
- **Lane C (CVA branches)**: retire 6 unused CVA branches.
- **Lane D (slot-class + factory)**: retire `closeIconClass`,
  `keepOpenWhile` (unless W3 wires), `defineDockActionBar`.
- **Lane E (utilities + tokens)**: retire 31 utility classes + 18 tokens
  + 4 runtime helpers in tokens.ts.
