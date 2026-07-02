# KS-API-COLOCATION — corpus grounding (disk-truth + settled grammar + wave debt)

Verified on disk `tranche/BG` HEAD `f6fa1767`, 2026-07-01. This is the disk-true state, every SETTLED
grammar decision (D4 + BH B3 + BH PLAN B2/B2.1-grammar, reconciled), and exactly what each lane wave still
owes. The grammar is already DESIGNED (D4-api-redesign + B3-encapsulation); this hardens it against disk.

Lane waves: **F6.1** `BH.W-AXIS-GRAMMAR` · **F6.2** `BH.W-SIZE-UNIFY` · **F6.3** `BH.W-MOTION-AXIS` ·
**F6.5** `BG.W-GOD-MODULE-STRUCTURAL` · `BG.W-COLOCATE` · `BG.W-DEAD-SWEEP` · `BG.W-DESHADCN` ·
`BH.B2-export-reshape` · `BH.B2-leaf-verify` (+ the `/axes` types-only subpath).

---

## 1. AS-BUILT disk truth (the ground every wave stands on)

### 1a. The export machinery — regen mechanism LANDED (`c98ac8c8`, row 1.6 DONE)

- `scripts/lib/subpath-policy.mjs` — the **SINGLE-SOURCE** fail-CLOSED classification leaf. Feeds BOTH
  `libraryEntries()` (vite entry map, `libraryEntryMap()`) AND `regen-exports.mjs`, so entry-NAME set and
  export-KEY set cannot drift from one hand-list. Three exhaustive maps: `UI_CLASS` (25 PUBLISH / 18
  INTERNAL of 43 ui dirs), `CUSTOM_CLASS` (47 PUBLISH / 3 INTERNAL of 50), `CURATED` (11) +
  `COMPOSABLE_SUBPATHS` (7). Every disk dir MUST carry an explicit bucket → HARD ERROR (exit 1) else.
- `scripts/regen-exports.mjs` — the generator. Check-mode (default) = `proof:subpath-classify`; `--write`
  is the B2.1-swap re-pin capability, **never invoked by the gate**. Proves 3 layers: fail-closed
  classification · symbol-fidelity EXISTENCE (`verify-export-types` proves the SET post-build) ·
  EXACT_REPRODUCTION (regen reproduces `exports`+`typesVersions`, 0 drift).
- **Still on disk (the 3-layer redundancy B2 collapses):** `src/subpaths/*.ts` = **79** mirror barrels;
  `src/api/` = 2 files (`index.ts` 505L + `types-extra.ts` ~349L, the 203-symbol aggregator); **10** flat
  `src/*.ts` barrels (`carousel·dark·forms·index·infinite-scroll·keyboard·motion-core·motion·sidebar·tokens`
  — B2.3 relocates all but `index.ts` → `src/entries/`, which does NOT yet exist on disk).
- `package.json` = **277 `"./` lines** (~95 subpaths + CSS/font/root entries). B3-F6 flags CLAUDE.md prose
  ("76/73/72") as stale by ~20 — the count trails disk. `verify-export-types` + `proof:subpath-enumeration`
  are the source of truth.
- `regen-api-migration.mjs` + the **203-row `/api` map** (199 types + 4 consts) are RAN prototypes under
  `docs/tranches/BH/research/proto/`, NOT yet standing gates. Re-derived post-WS12 (residual §5.1).

### 1b. `axes.ts` does NOT exist yet — F6.1's whole deliverable

`src/components/ui/_shared/` = `ModalOverlay.vue · index.ts · menuItemVariants.ts · useControlSize.ts ·
useStalePropWarning.ts · useSurfaceAxis.ts`. **No `axes.ts`.** The ONE axis done right is
`useSurfaceAxis.ts` — `Surface = "glass"|"veil"|"opaque"|"clear"` (4 rungs on disk, line 42) + `SurfaceTier
= wash|quiet|resting|floating|overlay` (line 52) + `surfaceClass(surface, tier)`. It is the TEMPLATE F6.1
copies, KEEP VERBATIM (D4-6). The stale "three-rung" doc-drift D4-5 names is NOT in `useSurfaceAxis.ts`
(its header already says four rungs) — the drift lives in **CLAUDE.md §Shared surface-decoration axis**
prose (`glass|veil|opaque`, 3-member) only. F6.1's doc-fix target is CLAUDE.md, not the leaf.

### 1c. The prop-grammar fragmentation, EXACT disk unions (F6.1/F6.2/F6.3 fix these)

**Surface axis — 5 divergent spellings (F2/D4-2):**
| surface | union / shape | source |
|---|---|---|
| canonical | `Surface = glass·veil·opaque·clear` | `useSurfaceAxis.ts:42` |
| Card | `CardSurface = glass·cartoon·veil` (missing opaque+clear, adds cartoon) | `card/Card.vue:61` |
| Skeleton | `SkeletonSurface = glass·opaque` (2-member subset) | `skeleton/Skeleton.vue:38` |
| Badge | `BadgeVariants['surface']` = `loud·quiet·glass` (CVA-derived) | `badge/index.ts:67` |
| TabsIndicator | `surface?: boolean` (NAME homonym — "paint the plate", not the material axis) | `tabs/TabsIndicator.vue:17` |

**The Card↔GlassPanel homonym inversion (F1 — the single clearest defect):**
| concept | Card | GlassPanel |
|---|---|---|
| visual-elevation rung | `tier?: CardTier` (`Card.vue:100`) | `variant?: GlassPanelVariant` (`GlassPanel.vue:50`) |
| render backend | — | `tier?: GlassTier` = `svg-filter·css·fallback` (`GlassPanel.vue:42`, from `useGlassRenderer.ts:3`) |
| material decoration | `surface?: CardSurface` (`Card.vue:108`) | `surface?: Surface` (`GlassPanel.vue`) |

So `tier` is a homonym (visual rung on Card / render backend on GlassPanel) and the visual-rung concept has
THREE names (`CardTier`, `GlassPanelVariant`, and the unused-by-props `SurfaceTier`).

**Size axis — three-way collision + ≥5 shapes (F4/D4-1):**
| component(s) | prop | union | middle rung | source |
|---|---|---|---|---|
| Button | `size` (CVA) | `default·xs·sm·lg·icon·icon-sm` | **default** | `button/index.ts:182-201` |
| Input/Switch/Textarea/NumberFieldInput | `size` = `ControlSize` | `sm·default·lg` | **default** | `_shared/useControlSize.ts:34` |
| Slider | `size` (CVA) | `sm·md·lg` (default already `md` ✓) | **md** | `slider/index.ts:53-74` |
| SelectableChip/ToggleChip | `size` | `sm·md·lg·cell` | **md** | `selectable-chip/chipVariants.ts:54-64` |
| GlassDock | `density` | `compact·comfortable·spacious·audacious` | **comfortable** | `dock/composables/useDockShellProps.ts:21` |
| Configurator | `density` | `mobile·compact·comfortable·spacious` | **comfortable** | `configurator/density.ts:19` |
| MetricPill | `density` | `comfortable·spacious` (2-member) | — | `ui/metric-pill/MetricPill.vue` (B3-F3; NOT under custom/) |

`default`/`md`/`comfortable` are the SAME physical rung with no shared name. The two `density` unions are
DIFFERENT SETS (dock `audacious`, config `mobile`). Ground truth: `useControlSize.ts` header already states
the prop SELECTS a rung of the `--control-h-*` token cohort — the token vocabulary IS `xs/sm/md/lg`; the
prop layer just refuses to speak it.

**Motion opt-in scatter (F4/D4-4) — 6 files carry the booleans:**
`draggable` (SegmentedTabs, DockLayerGroup) · `pressable` (Card) · `spring` (DialogContent, SheetContent) ·
`liquidDrag` (Slider). Verified via `grep draggable\?:|pressable\?:|liquidDrag\?:|spring\?:` →
`card/Card.vue · slider/Slider.vue · dialog/DialogContent.vue · sheet/SheetContent.vue ·
tabs/SegmentedTabs.vue · dock/DockLayerGroup.vue`. The genuine gesture CONTRACTS (`keepDockOpen`,
`dragDismiss`, `responsive`) are DISTINCT — they stay (over-unifying them is the inverse smell, D4 §fences).

**Orientation (F6.1 factor, zero value change):** `13` src files carry the inline `"horizontal"|"vertical"`
literal (grep count) — values consistent, no factored `Orientation` type. Pure mechanical move into
`axes.ts`.

### 1d. The god-module ratchet — DISK DIVERGES FROM `RATCHET_BASELINES` (F6.5 disk-truth)

`RATCHET_BASELINES` (`proof-no-god-module.mjs:138-172`) = **16 keyed entries**. Live disk `wc -l >500`
(src, non-`__tests__`) = **18 files**. The DELTA is the F6.5 disk-truth:

- **2 un-baselined live-RED violations** (present >500, NO baseline row) = **`styles/glass/ladder.css`
  (527)** and **`styles/dock/shell.css` (510)** — these are the "2 live-RED CSS carves in the SAME wave"
  the F6.5 row names. They are the reason the gate is not currently green-by-construction; F6.5 carves them
  <500.
- The 16 baselined: `liquid-morph.css` 850 · `GlassDock.vue` 711 · `createCanvasLifecycle.ts` 695 ·
  `useWebGPUCanvas.ts` 606 · `useDockFission.ts` 604 · `property-regs.css` 566(→548 disk, shrank) ·
  `fission-bridge.css` 552 · `useDockContextSilhouette.ts` 551 · `useGlassBackdropLuminance.ts` 542(→534) ·
  `useBlobSatellites.ts` 533 · `metaball.wgsl.ts` 529 · `flow-field.glsl.ts` 517 · `SegmentedTabs.vue` 512 ·
  `metaball.frag.ts` 510 · `useGooDotMatrix.ts` 508 · `api/index.ts` 505.
- **4 ratchet-EXEMPT** (not carve targets): 3 shader-literals (`metaball.wgsl`/`flow-field.glsl`/
  `metaball.frag` — `*.{wgsl,glsl,frag,vert}.ts` exemption) + `property-regs.css` (`css-registration-manifest`
  STRICT shape check, declaration-list only).
- **Owner routing** (the drain chain, NOT all F6.5's): `api/index.ts`→B2.2 (folded, deleted).
  `useDockContextSilhouette.ts:551`→**DELETED by BG WS2** (row 10.5 / `useDockContextSilhouette`
  DEFINITION-ABSENT per B2.5, NOT carved). Canvas/webgpu/luma/tabs leaves→`BG.W-COLOCATE`. Dock leaves
  (`GlassDock`/`useDockFission`)→`BG.W-DOCK-DECOMPOSE` (row 4.4) coordinated with F6.5. `liquid-morph.css`
  (850, the largest)→WS8 deep-morphism owner. Close-state precondition (`BG.W-CUT`): `violations == [] AND
  RATCHET_BASELINES == {}`.

### 1e. de-shadcn / `--ring` rename (F6.5 `BG.W-DESHADCN`)

`--ring` readers in `src/` = **7 files**; `--focus-ring-color` already present in `src/styles/`. The
rename `--ring`→`--focus-ring-color` is a clean break (fallback-first `var(--focus-ring-color, var(--ring))`
landing note), rides the 233-file de-shadcn sweep, and generates a MIGRATION row + the atlas B7 by-name ask
(row 3, `migrate-ring-to-focus-ring-color`).

---

## 2. The SETTLED grammar (binding decisions — reconciled D4 + B3 + BH PLAN)

The grammar is DECIDED; the waves EXECUTE it. Minted ONCE in `_shared/axes.ts`, adopted by CLEAN BREAK (no
aliases — no-legacy law), riding the 5.0.0 cut so the structural breaks land as ONE major.

**Axis 1 — SURFACE (formalize; near-zero change).** `Surface = glass|veil|opaque|clear` STAYS.
`cartoon` moves OFF the surface union → Card-local decoration (it is orthogonal to shadow/grain, admitted
`Card.vue:67-73`). Fold `CardSurface`/`SkeletonSurface`/`BadgeVariants['surface']` onto `Surface`.
`TabsIndicator` boolean `surface`→**`plate`** (kill the name homonym). `GlassPanel variant`→**`tier`**
(visual rung) and its render-backend `tier`→**`renderTier`/`backend`** (kill the F1 homonym). Fix the
CLAUDE.md 3-rung→4-rung doc drift (D4-5/B3-F2 rider).

**Axis 2 — SIZE (the headline unification, clean break).** `Size = xs|sm|md|lg` (default `md`), rung names
EQUAL the `--control-h-*` token cohort. Every middle rung `default`→`md`, `comfortable`→`md`. Component
sub-ranges are LEGAL restrictions of the ONE union, NOT new unions. Split the two conflations OFF size:
Button `icon`/`icon-sm` → orthogonal `iconOnly` boolean (icon-only is a SHAPE); chip `cell` → a `shape`
flag (a 72px tile is a silhouette, not a size rung). `ControlSize` type → `Size`.

**Axis 3 — DENSITY folds onto SIZE.** Dock `density`→`size` (`compact→sm · comfortable→md · spacious→lg ·
audacious→xl` — extend the ONE union to `xs|sm|md|lg|xl` if a 5th rung is genuinely needed, NEVER a
parallel set). Configurator `density`→`size`, **DROP `mobile`** — it is a `@media(pointer:coarse)`
RESPONSIVE token state, never a chosen rung. `ConfiguratorDensity`/`DockDensity` types DELETED. (B3-FC1
proposed a `DensityScale` Extract-subset alternative; D4/BH PLAN chose the FOLD-onto-`Size` path — the
FOLD is binding.)

**Axis 4 — ORIENTATION (pure factor).** `Orientation = horizontal|vertical` (default `horizontal`), move
the 13 inline copies into `axes.ts`, zero value change.

**Axis 5 — MOTION (opt-DOWN, not opt-in).** `Motion = full|reduced|off` (default `full` — physics is the
DEFAULT per liquid-weight-universal). Collapse `draggable`/`pressable`/`spring`/`liquidDrag` onto it. KEEP
`keepDockOpen`/`dragDismiss`/`responsive` as distinct contracts. `prefers-reduced-motion` still forces
`full`→`reduced` at the CSS layer; the prop is the consumer's MANUAL override.

**The a11y-role canon (defer-honest — record, no wave).** Role is DERIVED from variant/type
(SegmentedTabs `pill`→group / `underline`→tablist; ToggleGroup `single`→radiogroup; StatusDot `role=img`
iff `aria-label`), NEVER a separate `role` prop. One design-idiom line, folds into F6.1's canon doc.
Publish the `data-part` seam as a type (`ExpandableContainerPart`) — B3-FC3, folds into F6.1.

**The import story (post-reshape ideal).** Three honest tiers: root barrel (curated vueuse-free) · flat
per-family kebab subpaths (payload tier — no naming asymmetry, `/dark`/`/keyboard`/`/carousel` sit beside
`/dock`) · **`/api` DIES**, its value survives as per-family co-located types (`import type { CardTier }
from ".../card"` — strictly better, no aggregator to drift) PLUS the 4 grammar unions published on a
types-only **`/axes`** subpath (the honest `/api` discovery successor, scoped to 4 axis types not 203
grab-bag symbols). ONE regen source of truth: `axes.ts` registered in `subpath-policy.mjs` so `/axes` is
GENERATED, never hand-listed.

---

## 3. What each wave still OWES (deltas over the folded rows)

- **F6.1 `BH.W-AXIS-GRAMMAR`** `[C]`, after B2.1-mech (landed), BEFORE B2.1-swap. NEW file `_shared/axes.ts`
  (`Size`/`Orientation`/`Motion` + re-export `Surface`). Homonym kills: GlassPanel `variant`→`tier` +
  backend-`tier`→`renderTier`; TabsIndicator `surface`→`plate`; fold Card/Skeleton/Badge surface onto
  `Surface`; `cartoon` off the axis. Factor 13 orientation copies. Publish 4 types on root barrel + register
  `axes.ts` in `subpath-policy.mjs` for the GENERATED `/axes` (amends B2.2). Fix CLAUDE.md 3→4 rung drift.
  Fold the a11y-role canon line + `ExpandableContainerPart` type. **Gate arm:** `proof:encapsulation`/
  `axis-grammar` (no private surface/tier/density union outside `axes.ts`; `Surface` 4-member; no prop
  homonym), born-RED. **paint:** none (renames — byte-identical π).
- **F6.2 `BH.W-SIZE-UNIFY`** after F6.1 AND after F6.5 (decompose dock before density→size). Rename all
  middle rungs →`md`; fold dock+config `density`→`size`; delete `ConfiguratorDensity`/`DockDensity`; split
  Button `icon*`→`iconOnly`, chip `cell`→`shape`, drop config `mobile`. **Gate arm:** `size-grammar` (NO
  `density` prop; NO `size` union with `default`/`comfortable`/synonyms; every rung ∈ `Size`), born-RED.
  **Precond:** coordinate the dock rename with the `--dock-scale` BG neighborhood (avoid double-touch).
- **F6.3 `BH.W-MOTION-AXIS`** after F6.1, independent of F6.2 (different props). **VISUAL.** Collapse the 4
  booleans onto `motion`. **Gate arm:** `motion-axis`, born-RED. **paint:** `tests-visual/motion-axis.spec.ts`
  (press/drag gestalt Card/Tab/Slider/Dialog, `full` vs `reduced`, both modes, Chromium+WebKit); **Fable
  arm** the interactive-gesture card set; DesignSync surface.
- **F6.5 `BG.W-GOD-MODULE-STRUCTURAL`** BEFORE F6.2. Decompose ONCE + harden `proof:no-god-module` in place.
  Carve the **2 live-RED** un-baselined CSS (`ladder.css` 527, `shell.css` 510) + `GlassDock.vue` (711) <500
  in this wave (coordinate `GlassDock`/`useDockFission` with row 4.4 `W-DOCK-DECOMPOSE`). Harden: a new
  baseline needs a companion carve-successor wave-id OR caps; shader + `property-regs.css` exemptions;
  make the 16-baseline drain chain VISIBLE as a cut gate. **NOT** F6.5's: `api/index.ts` (B2.2),
  `useDockContextSilhouette` (BG WS2 delete), `liquid-morph.css` (WS8).
- **`BG.W-COLOCATE`** after WS5(viz). 3 dir moves + carve `createCanvasLifecycle`(695)+`useWebGPUCanvas`(606)
  →10.12, `useGlassBackdropLuminance`(534)→10.13, `SegmentedTabs`(512), timeline/Slider partials, std140
  builder. `[data-size]` inline KEPT. Reader gates FOLLOW into leaves. Absorbs `BH.B2-leaf-verify` (11.1).
- **`BG.W-DEAD-SWEEP`** runs FIRST (net-negative). Cut `--corner-shape-card/-pill`; delete
  `selectableChipVariants.ts` (alias-kill) + MIGRATION row. Gate: `proof:squircle-language` negative-guard.
- **`BG.W-DESHADCN`** after WS4-W0 + 3.5. de-shadcn HEAD-mode + no-shadcn-default 233-file sweep +
  tailwind-v4-idiom + `--ring`→`--focus-ring-color` break (7 readers, fallback-first) + binding-sweep.
- **`BH.B2-export-reshape`** `[WS12]` — the SOLE final `package.json` writer. B2.1-swap (delete
  `src/subpaths/`, regen against LANDED post-WS12 surface, re-author `flatten-subpath-types.mjs`, Stage-B
  `public-surface.spec`) + B2.2 (`/api` fold: drop `./api`, 3 orphan re-homes Surface→/card ·
  MenuItemVariants→/command · ControlSize→/forms, 203-row map arm, ~9 fixture-gate re-points) + B2.3 (flat
  barrels→`src/entries/`, key-preserving) + B2.6 (9-sheet styles colocation). Peer bumps (the ONLY site): kf
  `^5.0.0→^5.1.0`, value.js `^1.0.0→^1.1.1` (NEVER `^1.2.0`). `goo-blob→blob` rename LINE + MIGRATION row.
  Closes the WS7→WS12 `proof:peer-conformance` born-RED window. Gate: net-indirection LOC must DROP.
- **`BH.B2-leaf-verify`** `[WS2·WS4·WS5]` — verify GlassDock/fission/canvas/tabs/luma/blob/goo-dot leaves;
  re-point BH reader-gates IFF BG's landed leaf diverged. Zero carve.

---

## 4. Fences + residuals (binding)

- **KEEP VERBATIM:** `useSurfaceAxis.ts` (the model, D4-6); the `--control-h-*`/`--dock-scale` token cohorts
  (the grammar RESOLVES them — do NOT re-mint a size register; `useControlSize`'s "prop selects a rung,
  token holds the magnitude" is why the migration is SMALL); the gesture contracts `keepDockOpen`/
  `dragDismiss`/`responsive`; the specular 4-symbol family (B3-FC5 defer-honest — legit delivery seam).
- **Un-dogfooded import story (B3-F5, RECORD as fold-candidate, not a self-inserted row):** the 156-page
  demo imports ZERO from `@mkbabb/glass-ui/*` — all via `@glass` raw-src alias into deep internals. The B2
  reshape's consumer-coherence is asserted by GATES only, never by use. B3-FC2 proposes `W-DEMO-DOGFOODS-
  SURFACE` (re-point a representative demo slice onto the published subpaths). This is a NEW-WAVE fold
  candidate for the orchestrator — flagged here, not inserted (wave set is frozen).
- **Residuals accepted:** the 203-row `/api` map + fail-closed classification + `proof:subpath-enumeration`
  baseline are 4.2.0 SNAPSHOTS — re-derived post-WS12 against the LANDED surface (WS6 +1 `/siri-island`;
  WS5 viz deletes/renames; `goo-blob→blob`) via the proven generators (gate-FORCED mechanical re-run).
  Symbol-set fidelity binds only post-build (`verify-export-types`). `flatten-subpath-types.mjs` re-author
  owed at B2.1. The regen still hard-codes `CSS_FONT_EXPORTS` + the `./api` `TYPES_OVERRIDE` (manual
  removal at B2.2). `words/frontend/glass-ui/` = vendored d6 fork, owes no ask (inv-11 disposition note).
