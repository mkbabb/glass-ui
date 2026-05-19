# Q.W4 Lane F — Fleet-wide phantom-class consumer sweep

**Lane**: Q.W4 Lane F (Q-cos-7 + Q-cos-23; cluster C2 + the `.cartoon-card` phantom).
**Date**: 2026-05-18.
**Scope**: two consumer repos — `words/frontend` (APPLY; clean tree) and
`fourier-analysis` (PATCH + SPEC deliverable; ~100-file in-flight WIP tree).
**Mode**: read-only git in both repos. `words/frontend/src/` written directly;
`fourier-analysis` NOT written — patch deliverable instead.

---

## 1 — Charter

Two phantom-class families dangle across the consumer fleet — the canonical
N-class audit blind-spot: a glass-ui class deleted, consumer references left,
the surface silently absent.

- **F.1 — `.glass-{subtle,medium}`** (cluster C2). 13 sites: 9 fourier + 4
  words. `.glass-subtle` retired at the v0.8.0 ladder rename (`eb9c44c`);
  `.glass-medium` was never a canonical tier name. The surviving ladder is
  `wash / quiet / resting / floating / overlay`.
- **F.2 — `.cartoon-card`** (round-5 Qψ). 20 sites, all fourier, across 10
  files. The glass-ui `.cartoon-card` recipe was deleted at C.W5 (`304ac78`).
  Migration target at glass-ui HEAD: `<Card surface="cartoon">` for genuine
  card surfaces; the `@utility cartoon-surface` (`src/styles/cards.css`) for
  cartoon decoration layered on a non-card element.

Per-consumer split: words/frontend is a clean tree → apply + orchestrator
commits. fourier-analysis carries the fourier team's uncommitted WIP → no tree
write; a unified-diff patch + per-site spec is the deliverable.

### Tier-mapping (confirmed from Qκ §3)

| Phantom class | Canonical replacement | Rationale |
|---|---|---|
| `.glass-subtle` | `.glass-wash` | Qκ F-1: direct v0.8.0 rename per MIGRATION.md. Lightest rung. |
| `.glass-medium` | `.glass-quiet` | Qκ F-2 / W-1: the four sites are popover/dropdown-tier surfaces; `quiet` is the canonical home for the popover ladder rung. |

---

## 2 — Part 1: words/frontend (APPLIED)

Clean `frontend/src/` tree. 4 `.glass-medium` sites — all popover/dropdown-tier
floating chrome (`z-dropdown` / `z-popover`). Migrated `glass-medium → glass-quiet`.

| # | File | Line | Surface | Before | After |
|---|------|------|---------|--------|-------|
| 1 | `src/components/custom/definition/components/ThemeSelector.vue` | 92 | theme dropdown (`z-dropdown`, `rounded-lg`, `shadow-cartoon-lg`) | `glass-medium` | `glass-quiet` |
| 2 | `src/components/custom/definition/components/ThemeSelector.vue` | 126 | provider-version flyout (`z-dropdown`, `w-96`) | `glass-medium` | `glass-quiet` |
| 3 | `src/components/custom/definition/components/WordLookupPopover.vue` | 8 | floating "Define" pill (`z-popover`, `rounded-full`) | `glass-medium` | `glass-quiet` |
| 4 | `src/components/custom/definition/components/WordLookupPopover.vue` | 21 | mini-definition popover panel (`z-popover`, `w-64`) | `glass-medium` | `glass-quiet` |

All four are translucent popover-class surfaces; `quiet` (~0.50α) is the
faithful replacement for the dropdown ladder rung — consistent with the words
M.W0 batch that already moved this consumer's `glass-subtle → glass-wash`.

### Verification — words/frontend

```
grep -rn 'glass-\(subtle\|medium\)' words/frontend/src   → 0 hits (exit 1)
npm run build  (= vue-tsc --noEmit && vite build)        → GREEN, built in 3.21s
```

Build emits the full dist bundle; vue-tsc typecheck passes. No regressions.

---

## 3 — Part 2: fourier-analysis (PATCH + SPEC)

### 3.1 Apply-base divergence (read first)

The orchestrator brief specified "patch against fourier HEAD". That is
**infeasible** and the brief's assumption is stale:

- The Qκ/Qψ research ran against fourier HEAD `4df1a06`. Current fourier HEAD
  is `926ca6a` — the tree has moved on.
- The 9 `.glass-{subtle,medium}` phantom-glass sites exist **only in the
  fourier team's uncommitted WIP working tree** — `git grep` at HEAD `926ca6a`
  returns zero. One file (`ConvergenceLegend.vue`) does not exist at HEAD at
  all. A HEAD-targeted patch literally cannot reach these lines.
- Every one of the 17 affected files carries substantial uncommitted WIP
  (`git diff --stat HEAD` shows 2–29 changed lines each).
- fourier HEAD additionally carries a **local** `.cartoon-card` recipe in
  `web/src/style.css:515` (4 rules) — added after the Qψ scan, which reported
  fourier defined no local recipe. So fourier's 20 cartoon sites currently
  render via that local recipe, not as dead CSS — but the recipe is a
  consumer-local duplication of a deleted glass-ui class; the idiomatic close
  is still to migrate the call-sites to `<Card surface="cartoon">` /
  `cartoon-surface` and let fourier delete the local block.

**Resolution** (idiomatic, no workaround): the patch is computed against the
fourier **working tree** — the WIP HEAD-to-be — which is the real apply-base
the fourier team has in hand. The fourier team commits their WIP first, then
applies the patch with `git apply --recount --3way`. Verified clean with
`git apply --check --recount` against the worktree at Q.W4 — all 22 files,
all hunks apply.

### 3.2 F.1 — phantom-glass per-site spec (9 sites, 7 files)

All straight template class renames; no import changes.

| # | File:line | Element | Before | After |
|---|-----------|---------|--------|-------|
| 1 | `paper/PaperView.vue:335` | `.overlay-page` page-indicator chip | `glass-subtle` | `glass-wash` |
| 2 | `paper/MobileFloatingToc.vue:94` | `.floating-toc-bar--search` (search mode) | `glass-medium` | `glass-quiet` |
| 3 | `paper/MobileFloatingToc.vue:101` | `.floating-toc-bar` (normal mode `<button>`) | `glass-medium` | `glass-quiet` |
| 4 | `paper/MobileFloatingToc.vue:117` | `.floating-toc-dropdown` | `glass-medium` | `glass-quiet` |
| 5 | `visualization/FullscreenViewer.vue:54` | `.fs-close` `<button>` | `glass-subtle` | `glass-wash` |
| 6 | `visualization/EquationPanel.vue:67` | `.eq-panel` root | `glass-subtle` | `glass-wash` |
| 7 | `visualization/gallery/GallerySearchBar.vue:74` | `.filter-panel` filter drawer | `glass-medium` | `glass-quiet` |
| 8 | `equation/convergence/ConvergenceLegend.vue:17` | `.legend-overlay` root | `glass-subtle` | `glass-wash` |
| 9 | `equation/EquationModeToggle.vue:8` | `.eq-toggle` root | `glass-subtle` | `glass-wash` |

`subtle → wash` (5): all are lightweight inline chrome (page chip, close
button, panel surface, legend overlay, toggle housing) — `wash` (~0.30α) is
the faithful lightest-rung replacement. `medium → quiet` (4): all are
popover/dropdown-class floating surfaces (TOC bars + dropdown, filter drawer)
— `quiet` (~0.50α), matching the words W-1 mapping.

### 3.3 F.2 — cartoon-card per-site spec (20 sites, 10 files)

Per-site judgement: card surface → `<Card surface="cartoon">`; decoration on a
non-card element → `cartoon-surface` utility class. The dead `cartoon-card`
token is dropped from every class list; layout/size utilities and local
size-extension classes (`eq-card`, `levels-card`, `config-card`,
`canvas-container`, `morph-button`) are preserved via the `class` passthrough
(`cn()` merges them).

| # | File:line | Element today | Verdict | Migration | Import added |
|---|-----------|---------------|---------|-----------|--------------|
| 1 | `visualization/ContourSettings.vue:187` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | `Card` into existing `@mkbabb/glass-ui` block |
| 2 | `visualization/BasisSelector.vue:109` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` |
| 3 | `visualization/BasisCanvas.vue:478` | `.canvas-container` canvas host `<div>` (overflow-hidden, mouse handlers) | **decoration** | `class="canvas-container cartoon-surface"` | none |
| 4 | `visualization/EditorToolsPanel.vue:18` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` |
| 5 | `visualization/ImageUpload.vue:38` | `<div>` drop-zone wrapping content (drag handlers) | card surface | `<Card surface="cartoon" class="px-3 py-2 relative">` (drag listeners forward through Primitive) | new `import { Card }` |
| 6 | `visualization/ContourPreview.vue:33` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` |
| 7 | `visualization/CoefficientsPanel.vue:40` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` |
| 8 | `visualization/VisualizationView.vue:160` | `<div>` workspace-error card | card surface | `<Card surface="cartoon" class="mx-auto max-w-md p-6 text-center space-y-3">` | new `import { Card }` |
| 9 | `equation/EqCoefficientsPanel.vue:40` | `<div>` wrapping `CollapsibleSection` | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` |
| 10 | `equation/InfoCard.vue:17` | `<div>` tier-info card | card surface | `<Card surface="cartoon" class="px-3 py-2 space-y-2">` | new `import { Card }` |
| 11 | `equation/EquationView.vue:228` | `<div>` "Computation failed" error card | card surface | `<Card surface="cartoon" class="p-4 max-w-md text-center">` | new `import { Card }` (one site, shared) |
| 12 | `equation/EquationView.vue:237` | `<div v-if="computing">` recompute status banner | card surface (small) | `<Card v-if="computing" surface="cartoon" class="px-3 py-2 …">` | (shared import) |
| 13 | `equation/EquationView.vue:241` | `<div v-else-if="error">` error status banner | card surface (small) | `<Card v-else-if="error" surface="cartoon" class="px-3 py-2 … border-red-500/30 bg-red-500/5 …">` — local `border-red-*` overrides ride the `class` passthrough | (shared import) |
| 14 | `equation/EquationView.vue:249` | `<div ref="eqCardRef" class="cartoon-card relative eq-card">` equation card | card surface | `<Card ref="eqCardRef" surface="cartoon" class="relative eq-card">` — `ref` + mouse handlers forward through Primitive; local `.eq-card` preserved | (shared import) |
| 15 | `equation/EquationView.vue:303` | `<div>` convergence-plot card | card surface | `<Card surface="cartoon" class="px-3 py-2 flex-1 min-h-0 flex flex-col">` | (shared import) |
| 16 | `equation/FunctionInput.vue:92` | `<div>` "Function" panel | card surface | `<Card surface="cartoon" class="px-3 py-2">` | new `import { Card }` (one site, shared) |
| 17 | `equation/FunctionInput.vue:170` | `<div>` "Controls" panel | card surface | `<Card surface="cartoon" class="px-3 py-2">` | (shared import) |
| 18 | `morph/MorphShapePreview.vue:4` | `.morph-button` `<button>` (bespoke hover recipe, `:disabled`, `@click`) | **decoration** | `class="morph-button cartoon-surface"` — keep the `<button>`; `cartoon-surface`'s `:hover:not(:disabled)` lift coexists with the local hover rule | none |
| 19 | `morph/HarmonicLevelGrid.vue:2` | `.levels-card` `<div>` | card surface | `<Card surface="cartoon" class="levels-card">` — local `.levels-card` size class preserved | new `import { Card }` (script block is after the template) |
| 20 | `morph/MorphPhaseConfig.vue:2` | `.config-card` `<div>` | card surface | `<Card surface="cartoon" class="config-card">` — local `.config-card` size class preserved | `Card` into existing `@mkbabb/glass-ui` block |

**Decoration verdict (sites 3, 18)**: `BasisCanvas`'s `canvas-container` is a
canvas viewport host (`position:relative; overflow:hidden`), not a content
card — `cartoon-surface` is the decoration utility, no component wrap.
`MorphShapePreview`'s `morph-button` is an interactive `<button>` with its own
`:hover` / `:active` / `:disabled` recipe — keeping the native `<button>` and
applying `cartoon-surface` preserves element semantics; wrapping it in `<Card>`
(a `<div>` Primitive by default) would lose the button. Both are the
`@utility cartoon-surface` path per the W3 Lane B re-model.

**Card surface verdict (the other 18)**: each is a `<div>` whose visible chrome
*is* the cartoon surface (border + offset shadow + hover-lift) wrapping panel
content — the idiomatic `<Card surface="cartoon">` component-over-class form
(J invariant 2). `surface="cartoon"` resolves `glass-resting` (default tier) +
the `cartoon-surface` decoration; `shadow` default is suppressed for
`surface!=='glass'`, so the offset-stamp shadow comes from `cartoon-surface`
alone — no double shadow.

EquationView sites 11–15 share a single `import { Card }` line. FunctionInput
sites 16–17 share one import. The other card-surface files each gain one
import; the two decoration sites gain none.

### 3.4 Patch deliverable — handoff note

The unified diff is written to:

```
docs/tranches/Q/audit/W4-Lane-F-fourier.patch
```

22 files, 29 sites (9 phantom-glass + 20 cartoon-card). Validated:

```
git apply --check --recount  →  CLEAN — all 22 files, all hunks apply
```

**Handoff to the fourier team** (the orchestrator relays this):

1. The patch is computed against the fourier **working tree** at Q.W4, NOT
   committed HEAD `926ca6a` — because the 9 phantom-glass sites exist only in
   the fourier team's in-flight WIP. Commit the WIP first.
2. Apply: `git apply --recount --3way docs/.../W4-Lane-F-fourier.patch`.
   `--recount` tolerates hand-authored hunk line-counts; `--3way` resolves any
   residual drift against blob context.
3. **Follow-up cleanup (fourier-owned, not in this patch)**: after the patch
   lands, the local `.cartoon-card` recipe in `web/src/style.css` (the
   `.cartoon-card` / `.dark .cartoon-card` / `:hover` / `.dark :hover` block,
   ~20 lines) is dead — zero remaining references. fourier should delete it.
   Leaving it is harmless but is local-recipe debt duplicating a class
   glass-ui deleted at C.W5.
4. No glass-ui-side change is required. `<Card surface="cartoon">` and the
   `@utility cartoon-surface` both exist at glass-ui HEAD (v1.9.0, W3 close);
   fourier consumes them via the already-imported `@mkbabb/glass-ui` /
   `@mkbabb/glass-ui/styles`.

---

## 4 — glass-ui doc-comment check (W3 Lane H cohort)

The brief flagged a stale `.cartoon-card` doc-comment in glass-ui's
`src/styles/index.css`. **Confirmed already retargeted** — `index.css:39` now
reads:

```
 *   7. cards.css             — .cartoon-surface, .paper-texture.
```

W3 Lane H landed this in the W3 close commit `511146f`
(`feat(tranche-q/W3): core-feature cohesion + substrate REVERTs + component
DEMOTE (v1.9.0)`). No action in this lane. `cards.css` itself (line 2) also
correctly documents the C.W5 removal of `.cartoon-card` + `.elevated-card`.

---

## 5 — Verification

| Check | Result |
|-------|--------|
| `grep -rn 'glass-\(subtle\|medium\)' words/frontend/src` | 0 hits (exit 1) — PASS |
| `npm run build` in words/frontend (vue-tsc + vite) | GREEN — typecheck clean, dist built |
| fourier patch `git apply --check --recount` | CLEAN — all 22 files apply — PASS |
| fourier spec coverage | 29/29 sites (9 phantom-glass + 20 cartoon-card) — complete |
| fourier patch site count vs Qκ/Qψ research | 9 phantom-glass (Qκ F-1+F-2) + 20 cartoon-card (Qψ) — exact match |
| glass-ui `index.css:39` doc-comment | already `.cartoon-surface, .paper-texture` (W3 Lane H, `511146f`) — PASS |

---

## 6 — Verdict

**PASS.** Lane F complete.

- **words/frontend**: 4 `.glass-medium` sites migrated to `.glass-quiet`,
  applied to the clean tree; build + typecheck GREEN. Ready for the
  orchestrator to commit.
- **fourier-analysis**: 29-site migration (9 phantom-glass + 20 cartoon-card,
  22 files) authored as a verified unified-diff patch + complete per-site
  spec. No fourier tree write — patch deliverable handed off for the fourier
  team to apply after committing their WIP.
- The patch apply-base is the fourier working tree, not HEAD — a documented,
  forced divergence from the brief because the phantom-glass corpus lives only
  in fourier's uncommitted WIP. The divergence is recorded in §3.1 and the
  patch header.
- glass-ui needs no source change in this lane; the W3 Lane H doc-comment fix
  already landed.

Fleet phantom-class corpus after this lane: words/frontend = zero;
fourier-analysis = zero once the patch is applied. This closes the consumer
side of W4 hard-gate (g) for both repos.
