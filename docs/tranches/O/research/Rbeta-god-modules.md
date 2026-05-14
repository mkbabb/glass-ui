# Rβ — God Modules Audit (O tranche)

Read-only sweep of every file >500 lines in `src/`, `scripts/`, `demo/composables/`,
`demo/configurator/`, `demo/layout/`. Per O7: split-by-decomposition when sub-modules
emerge, COHERENT-LARGE when the file is a single genre artefact. Per N invariant 23 —
splits must improve coherence, not satisfy a line-count threshold.

## 1. Angle summary

Nine files cross the 500-line bar. Headline:

- **3 SPLIT-CANDIDATE** — `GlassTimeline.vue` (1049, three variants in one SFC),
  `scripts/profile-aurora.mjs` (884, embedded 433-line browser harness string),
  `demo/configurator/usePresetEditor.ts` (657, persistence + migration + CSS writer +
  store rolled together).
- **4 COHERENT-LARGE** — `aurora.frag.ts` (799, single GLSL shader; genre artefact),
  `tokens.css` (905, 8 numbered token sections, intrinsically cohesive),
  `dock.css` (913, dock-family style authority; one substrate), `utilities.css` (638,
  37 utility classes — borderline, see §3).
- **2 BORDERLINE** — `useSortable.ts` (607, one composable + ghost DOM helper;
  acceptable but a `dragGhost.ts` extraction is mechanical and lossless),
  `scripts/proof-runtime.mjs` (585, CDP runtime probe; functions cluster cleanly).

No `demo/composables/` or `demo/layout/` file exceeds 500 lines.

## 2. Evidence — file size sweep

```
1049 src/components/custom/timeline/GlassTimeline.vue
 913 src/styles/dock.css
 905 src/styles/tokens.css
 884 scripts/profile-aurora.mjs
 799 src/components/custom/aurora/shaders/aurora.frag.ts
 657 demo/configurator/usePresetEditor.ts
 638 src/styles/utilities.css
 607 src/composables/sortable/useSortable.ts
 585 scripts/proof-runtime.mjs
```

Next-largest files (<500 lines, not in scope): `typewriter/composables/useTypewriter.ts`
(413), `tabs/BouncyToggle.vue` (406), `progress/Progress.vue` (398) — all cohesive
single-primitive SFCs.

## 3. Findings — per-file cohesion verdicts

| File | LOC | Verdict | Concerns identified | Proposed sub-modules |
|------|-----|---------|---------------------|----------------------|
| `timeline/GlassTimeline.vue` | 1049 | **SPLIT-CANDIDATE** | 3 variants (scrubber, segmented, continuous) + HoverPopover-portal `<style>` block + geometry utils + a11y wiring all in one SFC | See §3.1 |
| `styles/dock.css` | 913 | COHERENT-LARGE | Dock family style authority; consumers expect one CSS path per CLAUDE.md | Genre artefact; keep |
| `styles/tokens.css` | 905 | COHERENT-LARGE | 8 numbered §-blocks (duration/easing/z/radius/shadows/glass/paper/colors); the index header `§1-§10` is the cohesion contract | Genre artefact; keep |
| `scripts/profile-aurora.mjs` | 884 | **SPLIT-CANDIDATE** | 240-line CDP harness wrapper + 433-line embedded browser-side `harnessSource()` template string + artifact writer | See §3.2 |
| `aurora/shaders/aurora.frag.ts` | 799 | COHERENT-LARGE | Single GLSL fragment shader (verbatim port of Claude Design bundle per file header); split would fork the design source-of-truth | Genre artefact; keep |
| `demo/configurator/usePresetEditor.ts` | 657 | **SPLIT-CANDIDATE** | 5 concerns: types/defaults, CSS prop writers, persistence + 2-version migration, preset stylesheet swap, singleton store | See §3.3 |
| `styles/utilities.css` | 638 | COHERENT-LARGE (borderline) | 1 `@layer components` block with 37 utility classes + 3 `@utility` blocks + reduced-motion media | Optional: extract `@utility btn-audacious` (50 lines) to `src/styles/btn-audacious.css` since it's named in CLAUDE.md as K W6 HEADLINE substrate. Not load-bearing. |
| `composables/sortable/useSortable.ts` | 607 | COHERENT-LARGE (borderline) | One `useSortable` factory + 4 internal subsystems (drag-ghost DOM, cross-list resolver, drop-index hit-test, per-row binding) | Optional: extract `createGhost`/`updateGhost`/`destroyGhost` (≈80 lines) to `./dragGhost.ts`. Mechanical; loss-less. |
| `scripts/proof-runtime.mjs` | 585 | COHERENT-LARGE | CDP client + per-route assertion suite (`dockAssertions`, `auroraAssertions`, `checkRoute`); concerns are sequential, not layered | Keep — single-purpose proof script |

### 3.1 GlassTimeline.vue — split plan

The SFC ships three structurally-distinct variants behind one `variant` prop:
`scrubber` (pre-Z.W2 single-track, pointer-capture + keyboard a11y), `segmented`
(N adjacent gradient cells with boundary dots), `continuous` (one rail + N
absolute-positioned regions + sibling marker `<ul>` + HoverPopover-wrapped buttons).
The `<template>` runs `v-if="variant === 'continuous'"` → `v-else-if=
"variant === 'segmented'"` → `v-else` — three disjoint render trees. Scoped CSS
similarly splits into three named-prefix clusters (`.glass-track`/`.timeline-caret`;
`.segmented-*`; `.continuous-*`). The non-scoped `<style>` (lines 1002-1049)
exists ONLY because HoverCardPortal escapes scoped CSS — that's a continuous-variant
concern, not a shared one.

Proposed:
```
src/components/custom/timeline/
├── GlassTimeline.vue          # dispatcher SFC — props + variant routing only
├── ScrubberTimeline.vue       # variant="scrubber" branch + .glass-track CSS
├── SegmentedTimeline.vue      # variant="segmented" branch + .segmented-* CSS
├── ContinuousTimeline.vue     # variant="continuous" branch + .continuous-* CSS
│                              # + the non-scoped .timeline-popover styles
├── geometry.ts                # totalWeight/regionLeft/regionWidth/boundaryX/
│                              # fillFor/gradientFor/continuousAriaValueNow
└── types.ts                   # (existing) TimelineSegment + TimelineSegmentGradient
```
Public surface stays one component (`<GlassTimeline variant=…>`); the three
sub-SFCs are internal to the package. Risk: the popover non-scoped CSS portals out
of any consuming SFC, so it must remain in *some* component that participates in
the timeline render path — `ContinuousTimeline.vue` is the right home. Wire-before-
retire: the dispatcher SFC re-exports the variants explicitly so per-variant
imports become available for tree-shaking-conscious consumers.

### 3.2 profile-aurora.mjs — split plan

Lines 1-240: CDP/Chrome wrapper + arg parsing + lifecycle.
Lines 241-673: `harnessSource()` — a `String.raw` template that contains the
ENTIRE browser-side instrumentation (frame summarizer, config cloner, harness
mount/unmount, draw-call sampler). 433 lines of JavaScript-inside-a-string.
Lines 674-884: Chrome args + per-case driver + `main()`.

Proposed:
```
scripts/aurora-profile/
├── index.mjs              # CDP wrapper + main() — ≈ 250 lines
├── harness-browser.mjs    # the harnessSource() body, READ as a UTF-8 file at runtime
└── case-driver.mjs        # liveCaseExpression + thumbnailBatchExpression + writeArtifact
```
The 433-line embedded harness should live in its own `.mjs` file and be read with
`fs.readFileSync` + injected into the page via `Runtime.evaluate`. Browser-side
syntax errors surface in the editor instead of inside a string template; the
harness becomes lintable.

### 3.3 demo/configurator/usePresetEditor.ts — split plan

Five concerns, currently flat:

1. Types + defaults + FONT_OPTIONS + DEFAULT_CONFIG (lines 1-130)
2. CSS prop writers — `writeField` + `writeFontSlot` + DENSITY_SCALE table (lines 130-196)
3. Persistence + 2-version migration — `parseDelta` + `migrateFullSnapshotToDelta` +
   `loadPersisted` + `persist` (lines 197-328)
4. Preset stylesheet `<link>` toggling — `ensurePresetLink` + `applyPresetStylesheet` (lines 329-365)
5. Singleton store — `applyDelta` + `removeWritten` + `usePresetEditor` (lines 366-657)

Proposed:
```
demo/configurator/
├── usePresetEditor.ts            # singleton store only — ≈ 250 lines
├── presetEditor.types.ts         # Density, FontSlots, ConfigBaseline, ConfigDelta
├── presetEditor.defaults.ts      # FONT_OPTIONS, DEFAULT_CONFIG, DENSITY_SCALE
├── presetEditor.cssWriter.ts     # writeField + writeFontSlot + FIELD_CSS_VARS
├── presetEditor.persistence.ts   # parseDelta + migrate + loadPersisted + persist
└── presetEditor.stylesheet.ts    # ensurePresetLink + applyPresetStylesheet
```
Demo-private; no public-API drift. The split lets the persistence migration test
(if/when one lands) target a single ≈ 130-line module.

## 4. Proposed plan implications

- **O.W?-timeline-decompose** — `GlassTimeline.vue` → 4 SFCs + `geometry.ts`. Largest
  HEAD god-module. Touches the popover-portal CSS contract; AB.W2.T2/T3/T4 documentation
  in the file header is the inheritance map. Demo stories already differentiate variant.
- **O.W?-aurora-harness-extract** — `profile-aurora.mjs` → `scripts/aurora-profile/`. Pure
  refactor; no shape change. Unlocks linting + IDE jump-to-definition for the embedded
  harness. Highest value-to-risk ratio of the three splits.
- **O.W?-preset-editor-decompose** — `demo/configurator/usePresetEditor.ts` → 6 files.
  Demo-private, so cheapest. Pairs naturally with any future demo-configurator audit.
- **Optional µ-splits** (low priority, mechanical):
  - `useSortable.ts` → extract `dragGhost.ts` (≈80 lines).
  - `utilities.css` → extract `btn-audacious.css` (≈50 lines, CLAUDE.md HEADLINE).

## 5. Risks

- **Consumer imports** — none of the three primary splits change a public subpath.
  `GlassTimeline.vue` stays the package entry; the variant SFCs are internal.
  `profile-aurora.mjs` is invoked via `npm run profile:aurora` not imported.
  `usePresetEditor.ts` is demo-private and the named exports survive.
- **CSS portal contract** (timeline) — the non-scoped `.timeline-popover-*` block
  MUST live in a component that participates in continuous-variant rendering,
  otherwise HoverCardPortal lands on bare DOM. `ContinuousTimeline.vue` satisfies
  this naturally; do not move the block to a shared `.css` file unless the demo
  proof story for the continuous variant is re-verified.
- **Bundle-budget** (timeline) — splitting into 4 SFCs may yield 4 dist chunks under
  per-subpath builds; profile against `npm run profile:budget` after wiring.
- **Wire-before-retire** (N invariant 23) — the dispatcher pattern (one public
  component fans out to per-variant SFCs) preserves the public contract during the
  transition; the legacy variants are not retired, only relocated.
- **Genre artefacts** — explicitly do NOT split `aurora.frag.ts` (single shader, design
  source-of-truth per file header) or `tokens.css` (numbered §-block index is the
  cohesion contract). Splitting these would fragment the canonical truth.
- **No backwards compat** (user feedback) — splits are clean breaks for downstream
  internal imports; demo + library internal call sites update in the same commit.
