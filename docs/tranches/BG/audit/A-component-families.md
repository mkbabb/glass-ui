# A-component-families — KISS/DRY/encapsulation audit of the NON-DOCK component families

**Scope.** `src/components/ui/*` (41 shadcn families) + `src/components/custom/*` (50 dirs),
EXCEPT `dock/` (A-dock-arch owns it). The lens is FAMILY-LEVEL encapsulation: colocation
discipline, the `_shared/` factoring, cross-family DRY, over-engineering (KISS), and the gate
that is supposed to enforce all of it. Verified against HEAD = 998136b (4.2.0), 2026-06-25.

**Cross-refs.** A-component-splits owns the >500-line mechanical splits (carousel 577, tabs 512,
pager-dots 509). A-composables-colocation owns the composable LAYER (dead-engine trio, the morph
zoo, 9× uniformBridge DRY). This audit is the orthogonal FAMILY lens: the colocation-gate coverage
hole, the inline-CSS externalization debt at family granularity, and the family-level DRY that the
composable audit did not reach. Where I overlap (goo-barbell CSS) I defer to the existing wave and
add only the family framing.

---

## FINDINGS (HEAD-verified)

### F1 — The colocation gate is BLIND to 6 complex dirs (the README-as-marker coverage hole)

`proof:colocation` (`scripts/proof-colocation.mjs`) derives its TARGET set off the `README.md`
adoption marker — a dir is "a COMPLEX feature-dir bound by the convention IFF it carries a
`README.md`" (the gate's own comment, the §6 clause (d) self-derivation). The intent was
"coverage grows automatically when a dir adds its README." The reality is the inverse: **a complex
dir that never wrote a README is INVISIBLE to the gate forever**, and the convention it is supposed
to enforce silently does not apply.

The README-bound set (22 dirs): aurora, border-progress, completion-seal, concentric,
constellation, deck, dock, dot-flow-field, dot-matrix, easing, fading-scroll, fourier-field,
goo-blob, goo-dot-matrix, goo-filter, handmark, pager-dots, paper-grid, selectable-chip, spa-view,
split-chars, tabs.

The complex dirs that ESCAPE (>3 root files, NO README → gate never inspects them):

| Dir | root files | colocation violation present? |
|---|---|---|
| `configurator/` | 6 | **YES** — `useConfiguratorState.ts` + `density.ts` (a DI module) at ROOT, not `composables/` |
| `sortable-list/` | 5 | **YES** — `context.ts` (a `createStrictContext` DI module) at ROOT |
| `watercolor-dot/` | 4 | **YES** — `useWatercolorBlob.ts` + `prng.ts` at ROOT |
| `timeline/` | 9 | YES (structural) — 5 SFCs + `geometry.ts` + `types.ts` flat, no `composables/`, no `constants.ts` |
| `labeled-field/` | 6 | NO (5 sibling SFCs + index — genuinely flat, fine) |
| `search/` | 4 | NO (has `composables/`; `searchVariants.ts` is a CVA, correctly at root) |

Three of the six (configurator, sortable-list, watercolor-dot) are LIVE violations of the very
clause (a) the gate exists to enforce — `^use[A-Z]` / `*Context.ts` / `*context.ts` modules sitting
at the package root. They pass CI only because no README enrolled them. Evidence:
`configurator/useConfiguratorState.ts:1`, `configurator/density.ts` (`createOptionalContext`,
per A-composables F1), `sortable-list/context.ts:28` (`createStrictContext`),
`watercolor-dot/useWatercolorBlob.ts`.

This is a gate-soundness bug, not just an organization nit: the user's directive ("better
encapsulation across ALL components") cannot be machine-held while the enforcement is opt-in by an
unrelated doc file.

### F2 — `timeline/` is the un-encapsulated headline family (9 flat files, ~1300 lines inline CSS, no carve)

`timeline/` is the largest non-dock family by surface and the least encapsulated. Nine root files,
zero subdirs:

```
ContinuousMarkers.vue (444, style 264)   ContinuousRail.vue (style 138)
ContinuousTimeline.vue (351, style 315)  GlassTimeline.vue (orchestrator, style 213)
ScrubberTimeline.vue (405, style 180)    SegmentedTimeline.vue (302, style 189)
geometry.ts (10.7KB)  types.ts  index.ts
```

- **~1300 lines of inline scoped `<style>`** across the 5 timeline SFCs (264+315+138+213+180+189),
  none externalized to a `styles/timeline.css` partial (verified: no such partial exists). The five
  timelines share a rail/marker/segment vocabulary that is hand-re-spelled per SFC.
- `geometry.ts` is the shared math but sits at the dir ROOT beside the SFCs (not a `composables/`
  or a `core.ts` leaf), and there is no `constants.ts` (the family's magic numbers — tick spacing,
  marker radii — live inline in the SFCs).
- `GlassTimeline.vue` is a thin dispatcher over `ContinuousTimeline`/`ScrubberTimeline`/
  `SegmentedTimeline` (its imports prove it) — the family HAS the orchestrator shape, it just never
  got the colocated `composables/`/`constants/`/CSS-partial treatment its complexity warrants. It
  is the exact "complex dir bound by the convention" the gate would target — and it escapes F1.

### F3 — The inline-CSS externalization precedent (`segmented-tabs.css`) was applied to ONE family

`SegmentedTabs.vue` has **0 inline style** (512 script lines only) because its recipe lives in
`src/styles/segmented-tabs.css`. That is the house rule: a component's structural/shared recipe is a
`styles/` partial, not a scoped block. The rule was never back-applied. The heaviest inline-`<style>`
offenders at HEAD (non-dock):

| File | inline style LoC | partial exists? |
|---|---|---|
| `timeline/ContinuousTimeline.vue` | 315 | no |
| `ui/slider/Slider.vue` | 294 | no |
| `timeline/ContinuousMarkers.vue` | 264 | no |
| `ui/carousel/CarouselContent.vue` | 218 | no (DUP of pager — see F4) |
| `timeline/GlassTimeline.vue` | 213 | no |
| `metric-stack/MetricRow.vue` | 195 | no |
| `pager-dots/PagerDots.vue` | 193 | no (DUP of carousel — see F4) |
| `timeline/SegmentedTimeline.vue` | 189 | no |
| `timeline/ScrubberTimeline.vue` | 180 | no |

`Slider.vue` (style 294) is the heaviest single-SFC offender — the recessed-track/thumb-halo recipe
is entirely inline and has no `styles/slider.css` (A-component-splits flagged it as a watch). The
externalization precedent that produced `segmented-tabs.css`, `select.css`, `menu.css`,
`feedback-tone.css`, `border-progress.css`, `completion-seal.css` proves the pattern is house-blessed
and routine — these nine SFCs simply predate or were skipped by the discipline.

### F4 — The goo-barbell CSS is duplicated carousel ≡ pager (confirmed, deferred to existing wave)

`CarouselContent.vue` (style 218) and `PagerDots.vue` (style 193) inline the SAME barbell recipe
(`.goo-body`/`.goo-neck`, `scale: var(--stretch,1) calc(1/var(--stretch,1))` reciprocal squish, the
`#…-neck-throat` objectBoundingBox clipPath shape, the `@supports not (filter:url())` floor, the
PRM `display:none` drop). Verified by reading both `<style>` blocks: the structure is byte-congruent,
differing only in token VALUES (`--carousel-goo-*` vs `--pager-*`) and the cast `::before`.
A-component-splits already owns this as **BG.W-GOO-BARBELL-CSS** (the shared partial). I confirm it
and add the FAMILY framing: this is the same F3 debt with a DRY multiplier — the partial fix kills
the duplication AND drops both SFCs under 400.

### F5 — The chip family DRY is GENUINELY delivered (a positive — do not touch)

The BD.W-CHIP-CONGRUENT-GLASS collapse is REAL, not prose. `selectable-chip/chipVariants.ts` is the
ONE recipe; `selectableChipVariants` re-points to it (`selectableChipVariants.ts:13`); and
`toggle-chip/index.ts:28-40` composes it for real — `chip: chipVariants({ size: "md" })`,
`cell: chipVariants({ size: "cell" })`. ToggleChip carries only its `variant`→`size` ergonomic map
over the shared axis, no parallel CVA. This is the model the rest of the families should match: ONE
recipe, thin per-face re-points. Three CVA files exist (`chipVariants` + the two re-points +
`searchVariants`) but they are a 1-recipe + 2-aliases shape, not 3 forks. **Keep as-is.**

### F6 — The `_shared/` factoring is exemplary and well-adopted (a positive)

`ui/_shared/` (6 modules, 518 LoC) is the cross-family seam and it WORKS:
- `menuItemVariants.ts` → 13 consumers (every dropdown/context-menu/combobox/select/command item).
- `useSurfaceAxis.ts` (`surfaceClass`/`Surface`) → 20 consumers across ui/ AND custom/
  (Card, Dialog, Sheet, Drawer, Popover, Command, Toast, GlassPanel, ExpandableContainer, search).
- `useControlSize.ts` (`controlSizeClass`/`switchSizeClass`) → 8 consumers (Input/Textarea/
  NumberFieldInput/Switch + search).
- `ModalOverlay.vue` → 3 consumers (Dialog/Sheet content).

The ONE J-inv-10 smell: **`useStalePropWarning.ts` (82 LoC) has exactly 1 consumer** (`Card.vue`).
A "shared" module in `_shared/` with a single consumer is either mis-homed (inline it into Card) or
under-adopted (other primitives with renamed reka props should warn too — the
`feedback_glass_ui_binding_verification` memory names this as a recurring stale-prop class). Decide:
promote (wire ≥2) or demote (inline). Not a correctness bug.

### F7 — Two tab families coexist by design (NOT a fork — recorded so it is not "fixed")

`custom/tabs/` (`SegmentedTabs` — the public standardized family) and `ui/tabs/`
(`Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`/`TabsIndicator` — the reka substrate) are TWO dirs
but ONE design: per CLAUDE.md, `ui/Tabs` is INTERNAL substrate (the dock-rail consumer
`DockLayerGroup` + `<TabsIndicator :surface="false">`), `SegmentedTabs` is the public surface. This
is correct layering, not duplication. **Do not merge.** Flagged so a future sweep does not
mistake it for a fork. (The SegmentedTabs inline keyboard-roving + responsive residue is
A-component-splits' BG.W-TABS-KEYBOARD-LEAF; not re-proposed here.)

### F8 — The tiny single-SFC custom dirs are CORRECT colocation, not over-engineering (KISS check passes)

The prompt asks to flag "a simple wrapper that became a dir." I checked all 17 sub-200-line custom
dirs (animated-digit 103, color-swatch 98, confirm-dialog 87, icon-tooltip 42, status-dot 85,
toggle-chip 47, spa-view 100, paper-backdrop 81, …). Every one is a single SFC + an `index.ts`
package barrel — the DOCUMENTED idiom (`§Structure`: "every dir has a package barrel"). A flat
`icon-tooltip.vue` at `custom/` root would BREAK the per-package subpath convention. **These are not
over-engineered.** The honest KISS finding is the inverse — the COMPLEX dirs (timeline,
configurator, watercolor-dot) are UNDER-encapsulated, not the simple ones over-encapsulated. One
genuine doc-bloat nit (not structural): `icon-tooltip/IconTooltip.vue` is 42 lines, 25 of which are
a Q.W3/O.W6 history comment reciting a long-resolved wrap-span bug — trim to the 3-line "as-child
forwards onto the slotted child" fact.

### F9 — `geometry.ts`/`math.ts`/`presets.ts` at dir-root is INCONSISTENT vs the `composables/` idiom

Across the viz/complex families the "shared pure math leaf" lives in three different homes with no
rule: `timeline/geometry.ts` (root), `fourier-field/composables/` + `math.ts`/`presets.ts` (mixed),
`aurora/composables/color.ts` + `constants/` (the gold standard), `constellation/` (flat root —
`constellationField.ts`/`constellationTypes.ts`/`constellationInteraction.ts` all at root). The gate's
own comment admits fourier-field "carries NEITHER subdir (its domain lives in math.ts/presets.ts
FILES)" and was given a pass. The result: no consistent answer to "where does a family's pure math
go." This is the family-level twin of A-composables F10. The rule should be: pure non-reactive math
is a root `.ts` leaf (fine), but reactive `use*`/DI `*Context`/`*context` MUST be under
`composables/` — and the gate must bind EVERY complex dir, not the README-tagged subset (F1).

---

## ROOT CAUSES (gestalt, first-principles)

1. **RC-1 — The colocation gate enrolls by an unrelated marker (README), so the convention is
   opt-in.** A complex dir adopts the layout only if someone remembers to write a README; until
   then the gate never inspects it. The enforcement should derive off STRUCTURE (a dir with ≥N
   non-index source files, or a dir carrying ≥1 SFC + ≥1 `.ts` leaf), not off a doc artifact. The
   convention is the user's headline ask; tying it to a README is the reason configurator/
   sortable-list/watercolor-dot ship the exact violation the gate was built to stop.

2. **RC-2 — The CSS-externalization discipline was applied per-wave, never back-swept.** Each new
   family that got a `styles/*.css` partial (tabs, select, menu, feedback-tone, border-progress) did
   so in its own wave; the pre-existing timeline/slider/carousel/pager SFCs were never revisited, so
   ~1700 lines of structural recipe sit inline and (for carousel≡pager) duplicated. The precedent is
   the fix; what is missing is the sweep + a gate that flags "a structural recipe inline where a
   partial belongs."

3. **RC-3 — "the ONE recipe/family" is asserted in prose more often than it is built.** The chip
   family (F5) PROVES the right shape — one CVA, thin re-points — and it is genuinely wired. The
   contrast is the morph zoo (A-composables F4) and the geometry-leaf scatter (F9): the prose says
   "the ONE engine" but the construction is N peers. The family layer should be refactored ONTO the
   chip-family pattern: ONE recipe/leaf, thin per-consumer adapters.

4. **RC-4 — Simple dirs are correctly minimal; the over-engineering is concentrated in the complex
   families' MISSING carve, not in spurious dirs.** KISS here means "encapsulate the complex,
   leave the simple flat" — the opposite of the usual "a wrapper became a dir" smell.

---

## PROPOSED WAVES

### BG.W-COLOCATION-GATE-STRUCTURAL — bind the gate by STRUCTURE, fix the 3 live violations
- **Intent.** Close the README-as-marker coverage hole so every complex dir is enforced, and move
  the 3 root-level composables into `composables/`.
- **Approach.** Re-derive `proof:colocation`'s TARGET set off STRUCTURE (a `custom/` dir with ≥2
  non-`index`/non-CVA source files at root, OR ≥1 SFC + ≥1 reactive `use*`/`*Context` leaf), NOT off
  `README.md` presence (the README stays a clause (d) REQUIREMENT for an enrolled dir, never the
  ENROLLMENT key). Then fix the now-flagged violations: move `configurator/useConfiguratorState.ts`
  + `configurator/density.ts` → `configurator/composables/`; `sortable-list/context.ts` →
  `sortable-list/composables/`; `watercolor-dot/useWatercolorBlob.ts` → `watercolor-dot/composables/`
  (`prng.ts` is a pure leaf — stays root or moves with it). Add the missing READMEs (configurator,
  sortable-list, watercolor-dot, timeline, search). Clean break — re-point the package `index.ts`
  imports, no aliases.
- **Files.** `~scripts/proof-colocation.mjs`, `+configurator/composables/{useConfiguratorState,
  density}.ts`, `+sortable-list/composables/context.ts`, `+watercolor-dot/composables/
  useWatercolorBlob.ts`, the 4 package `index.ts` re-points, `+{configurator,sortable-list,
  watercolor-dot,timeline,search}/README.md`.
- **π/bar.** `proof:colocation` born-RED on HEAD (the 3 violations + the README-marker self-test
  bite: a synthetic complex dir with a root composable and NO README must now RED), GREEN post-fix;
  build + typecheck green; no SFC behavior change.
- **Folds.** The user's headline "better encapsulation across ALL components" ask, machine-held.

### BG.W-TIMELINE-ENCAPSULATE — carve the un-encapsulated timeline family
- **Intent.** Give `timeline/` (9 flat files, ~1300 inline CSS) the colocated shape its complexity
  warrants and externalize the shared rail/marker recipe.
- **Approach.** `+timeline/composables/` for any reactive leaf the SFCs share (the scrub/marker
  position readers); keep `geometry.ts` as a pure root leaf (or move to `timeline/core/geometry.ts`)
  + mint `timeline/constants.ts` (the tick/marker magic numbers pulled out of the SFCs). Externalize
  the SHARED rail/marker/segment recipe to `src/styles/timeline.css` (`@import`-ed into
  `styles/index.css`) parameterized on `--timeline-*` tokens — the `segmented-tabs.css` precedent
  exactly; each SFC keeps only its genuinely-local knobs. No `:deep()` (the shapes are the SFCs'
  own children). Add the README (covered by BG.W-COLOCATION-GATE-STRUCTURAL's enrollment).
- **Files.** `+styles/timeline.css`, `~styles/index.css`, `+timeline/constants.ts`,
  `+timeline/composables/*` (if a shared reactive leaf exists), the 5 timeline SFCs (style
  264/315/213/189/180 → slim local blocks).
- **π/bar.** the timeline π captures byte-identical both modes; each timeline SFC <300 LoC;
  `proof:colocation` (now binding timeline) green; zero duplicated rail/marker rule across the SFCs.

### BG.W-SFC-CSS-PARTIAL-SWEEP — externalize the remaining heavy inline-CSS SFCs (Slider + the family tail)
- **Intent.** Back-apply the `segmented-tabs.css` discipline to the heavy-inline-CSS SFCs that
  predate it; pair with A-component-splits' BG.W-GOO-BARBELL-CSS (carousel/pager) as siblings.
- **Approach.** Mint `src/styles/slider.css` (the recessed-track/thumb-halo recipe off
  `Slider.vue`'s 294-line block, tokenized on the existing `--slider-*` customs) and
  `src/styles/metric-stack.css` (MetricRow's 195). The Slider `[data-size]` scoped geometry stays in
  the SFC (per the BA.W-EMISSION structural-precompile rule — fully-arbitrary brackets must not ride
  a consumer's content-scan). A bare `<style>` partial-vs-inline gate clause (a structural recipe
  >120 lines inline where a `styles/*.css` partial is the house pattern) WATCHES against regression.
- **Files.** `+styles/{slider,metric-stack}.css`, `~styles/index.css`, `~ui/slider/Slider.vue`
  (style 294→~40), `~metric-stack/MetricRow.vue` (style 195→~50). Coordinate with
  BG.W-GOO-BARBELL-CSS (same `styles/motion/` neighborhood).
- **π/bar.** Slider + MetricRow π byte-identical both modes; each SFC's inline style <80 LoC;
  `proof:emission` green (the `[data-size]` brackets stay precompiled).

### BG.W-SHARED-STALE-PROP-DECIDE — resolve the 1-consumer `useStalePropWarning` (J-inv-10)
- **Intent.** A `_shared/` module with one consumer is either under-adopted or mis-homed; decide.
- **Approach.** Per the `feedback_glass_ui_binding_verification` memory (stale renamed-reka-prop
  bindings silently no-op and recur), the RIGHT call is PROMOTE: wire `useStalePropWarning` onto the
  ≥2 primitives most prone to the renamed-prop class (the reka compound wrappers that renamed an
  emit/prop — e.g. the Combobox `search-term`, the Toggle `pressed`). If no honest second consumer
  exists, DEMOTE: inline it into `Card.vue` and drop it from `_shared/`. No new primitive.
- **Files.** `~_shared/useStalePropWarning.ts` (+ ≥1 new consumer) OR delete + inline to `Card.vue`
  + `~_shared/index.ts`.
- **π/bar.** `useStalePropWarning` meets the ≥2-consumer bar OR is gone; build green.
- **Folds.** The J-inv-10 visual-load-bearing check for `_shared/`.

### BG.W-GEOMETRY-LEAF-CANON (low priority / doc) — record the "where does family math go" rule
- **Intent.** End the geometry/math-leaf scatter (root vs `composables/` vs `constants/`) with ONE
  recorded rule, consumed by BG.W-COLOCATION-GATE-STRUCTURAL.
- **Approach.** Canon (design-idioms.md + the gate): pure non-reactive math/presets are root `.ts`
  leaves (or `core.ts`); reactive `use*` + DI `*Context`/`*context` MUST be under `composables/`.
  Constellation's flat `constellationField/Interaction/Types.ts` (root) is COMPLIANT (pure leaves);
  the configurator/sortable/watercolor root composables are NOT (fixed in the gate wave). No code
  beyond the doc + the gate clause already in BG.W-COLOCATION-GATE-STRUCTURAL.
- **Files.** `~docs/precepts/design-idioms.md`, the gate clause (shared with the gate wave).
- **π/bar.** doc-only + the gate's structural clause; no π.

### BG.W-DOC-COMMENT-TRIM (trivial, fold) — trim the resolved-bug history comments
- **Intent.** `IconTooltip.vue` (25-of-42 lines are a resolved Q.W3/O.W6 wrap-span history) and the
  carousel/pager barbell headers recite long-closed bug narratives. Trim each to the load-bearing
  fact; point at CLAUDE.md/the wave doc for history (the A-component-splits BG.W-BLOOMUP-HEADER-TRIM
  precedent). Doc-only, zero behavior. Fold into whichever family wave touches the file.

---

## Summary table — the family encapsulation landscape

| Family | finding | wave |
|---|---|---|
| configurator, sortable-list, watercolor-dot | composable at dir ROOT, escapes gate | BG.W-COLOCATION-GATE-STRUCTURAL |
| timeline | 9 flat files, ~1300 inline CSS, no carve | BG.W-TIMELINE-ENCAPSULATE |
| slider, metric-stack | heavy inline CSS, no partial | BG.W-SFC-CSS-PARTIAL-SWEEP |
| carousel ≡ pager | duplicated barbell CSS | (A-component-splits) BG.W-GOO-BARBELL-CSS |
| `_shared/useStalePropWarning` | 1 consumer (J-inv-10) | BG.W-SHARED-STALE-PROP-DECIDE |
| chip family | DRY genuinely delivered — KEEP | — |
| `_shared/` (menu/surface/control) | exemplary — KEEP | — |
| ui/tabs vs custom/tabs | correct layering — KEEP | — |
| 17 tiny single-SFC dirs | correct colocation — KEEP | — |
