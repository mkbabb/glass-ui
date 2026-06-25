# BG Audit A — the DOCK SYSTEM: KISS/DRY/encapsulation forensic + re-modularization

Auditor scope: `src/components/custom/dock/` — 33 files (12 SFCs + 18 composables + constants +
README), **6772 LOC of TS/Vue** + **4080 LOC of `src/styles/dock/*.css`** = the single largest
accreted feature in the library. Verified against HEAD (4.2.0). Default-broken skepticism applied.

---

## FINDINGS — the file inventory (LOC · responsibility · consumer reality)

### Components (`dock/*.vue`, 2012 LOC)

| File | LOC | Responsibility | Real consumers (non-barrel) |
|---|---|---|---|
| `GlassDock.vue` | **711** | the root SFC — collapse/morph + fission split + item-drag + touch-gate + click-integrity + luminance-observer + rail-slot + persistent-slot + search-slot, all wired in one `<script setup>` | every dock route |
| `DockLayerGroup.vue` | **417** | layer stack + switcher rail + peak-reserve + drag-to-switch + VT-name + dual morph-engine fork | overview/layers/liquid-playground |
| `DockStack.vue` | 238 | the rail `stack`/`facets` carousel | SidebarDock·BottomDock·rail·liquid-playground |
| `DockIconButton.vue` | 128 | the icon control | every dock |
| `DockSection.vue` | 115 | declarative tripartite section chassis | SidebarDock·BottomDock·sections.vue |
| `DockLayer.vue` | 81 | named pane in a group | groups |
| `DockSeparator.vue` | 80 | axis-aware divider | shells |
| `DockBackgroundToggle.vue` | 70 | WCAG-2.2.2 pause/play | substrates |
| `DockTabButton.vue` | 50 | tab control | layers |
| `DockSelectTrigger.vue` | 42 | reka Select anchor | — |
| `DockPopoverTrigger.vue` | 41 | reka Popover anchor | — |
| `DockDropdownTrigger.vue` | 39 | reka Dropdown anchor | — |

### Composables (`dock/composables/*.ts`, 4497 LOC)

| File | LOC | Responsibility | `new SpringProgress`? | Real consumers |
|---|---|---|---|---|
| `useDockFission.ts` | **604** | n-ary detach orchestrator (`splittable`) | ✅ #1 | **1 demo** (`examples/TabBar.vue`) |
| `useDockContextSilhouette.ts` | **551** | declarative context→silhouette FLIP state machine | — (rAF) | **0** (DEAD) |
| `useDockState.ts` | 454 | the 3-state machine + hover-hysteresis + click-away | — | GlassDock (load-bearing) |
| `useLayerTransition.ts` | 385 | the **standalone** FLIP morph engine | ✅ #2 | DockLayerGroup (fallback path) + `/dock` public export |
| `useDockShellProps.ts` | 317 | prop shape + resolved computeds | — | GlassDock |
| `useDockOrientationMorph.ts` | 307 | V↔H morph driver (two synthetic docks) | ✅ #3 | AppShell + shell docks (the **modal** stage) + morph-showcase |
| `useDockItemDrag.ts` | 302 | grab-and-pull reorder (`draggableItems`) | ✅ #4 | **1 demo** (`overview.vue`) |
| `dockMorphContext.ts` | 302 | the **orchestrator** morph engine (the OTHER one) | ✅ #5 | GlassDock + DockLayerGroup |
| `useDockSearch.ts` | 285 | dock-as-search-bar seam | — | **1 demo** (`dock-search.vue`) |
| `useDockClickIntegrity.ts` | 202 | the tap/morph-race click guard | — | GlassDock |
| `dockMorphMeasure.ts` | 188 | `useDockExpandedSize` convex-blend endpoints | — | GlassDock |
| `useDockHold.ts` | 140 | keep-dock-open on continuous gesture | — | **Slider.vue** (production!) |
| `railProjection.ts` | 133 | pure φ-tier ring carousel math | — | DockStack |
| `useDockMorphWindow.ts` | 118 | the `isTransitioning` flag lifecycle | — | GlassDock (near-vestigial — see RC4) |
| `dockContext.ts` | 65 | typed DI for the dock | — | many |
| `dockLayerContext.ts` | 53 | typed DI for the group | — | DockLayer |
| `isTeleportedTarget.ts` | 18 | portal click-away helper | — | useDockState |
| `constants.ts` | 125 | `DOCK_SPRING` + labels + descriptor types | — | all |

### The two headline numbers
- **FIVE separate `new SpringProgress(...)` engines** (`dockMorphContext`, `useLayerTransition`,
  `useDockOrientationMorph`, `useDockItemDrag`, `useDockFission`), ALL reading the same
  `DOCK_SPRING` register. The library's own canon ("ONE spring, ONE clock, the whole box" —
  `useLayerTransition.ts:7`) is violated five ways in its own directory.
- **~1460 LOC of composables + ~700 LOC of CSS serve features with ≤1 demo consumer**
  (`useDockContextSilhouette` 551 + dead; `useDockFission` 604 + `fission-bridge.css` 552 + 1 demo;
  `useDockItemDrag` 302 + 1 demo; `useDockOrientationMorph` 307 + the V↔H modal the user wants
  removed). This is the J-inv-10 "≥2-consumer or formally retired" bar failing at scale.

---

## ROOT CAUSES (gestalt, first-principles)

### RC1 — TWO morph engines coexist; the documented fold never landed (the load-bearing duplication)
`dockMorphContext.ts` (the orchestrator) and `useLayerTransition.ts` (the standalone engine) are
**near-duplicate FLIP-pin-measure-arm springs**. `useLayerTransition.ts:37-48` admits it verbatim:
> "BOOKED: AY.W-GOD1 — the FLIP-engine FOLD. This standalone engine is a near-duplicate of the
> orchestrator's FLIP-pin-measure-arm dance ... W-DOCK2 found the duplication ... and BOOKED the
> fold to W-GOD1."

W-GOD1 never ran. `DockLayerGroup.vue:224-256` branches at runtime: if nested in a `<GlassDock>` it
`registerGroup` on the orchestrator; if standalone it mints `useLayerTransition`. So a `<DockLayerGroup>`
has TWO code paths producing the SAME crossfade — one path gated only on a `provide` being present.
Both keep a `proof:dock-orchestrator-single` "drift-guard" alive to assert the two byte-faithful
copies stay byte-faithful — a gate whose existence IS the smell. **Two engines, one job.**

### RC2 — `GlassDock.vue` (711) is a god-SFC: SEVEN orthogonal facilities in one `<script setup>`
The SFC wires, side by side, with no sub-component boundary: (a) collapse/morph (state machine +
orchestrator + measure + morph-window + click-integrity), (b) the `splittable` fission engine +
`registerSplittablePieces` + drag-to-split pointer state + `split/merge/toggleSplit` (L341-522,
~180 LOC for a 1-demo feature), (c) `draggableItems` item-drag, (d) the touch-gate tap discrimination
(L274-339), (e) the luminance observer wire, (f) the `#rail`/`#persistent`/`#search`/`#split` slot
plumbing + the `.glass-dock-frame` non-clipping escape, (g) the `cartoon-cast` punch caster. The
CONTEXT.md confirmed defect #3 ("red/maroon shadow-cast aliasing bleeding around docks") traces
straight to the `<span class="cartoon-cast">` child (GlassDock.vue:606) reading `--shadow-cartoon-*`
that mis-tunes to a red drop-shadow — a paint concern bolted into the structural SFC. The fission
template (L671-696) renders an island+neck bridge as a frame sibling for a feature ONE demo uses.

### RC3 — `useDockContextSilhouette.ts` (551) is DEAD CODE
ZERO consumers. The only reference is a COMMENT in `examples/AppSwitcher.vue:3` that explicitly says
the silhouette engine is **"overkill for a single pill→grid morph, so the honest reuse is the
bloom"** — i.e. the author looked at it, judged it over-engineered, and used `useBloomUp` instead.
It is not even re-exported from `composables/index.ts`. 551 lines of FLIP-diff-detach-bloom-fuse
state machine + the exported `diffSilhouetteSlots`/`detachVector` "pure for the unit test" helpers,
serving nothing. **Delete outright.**

### RC4 — `useDockMorphWindow.ts` (118) is vestigial — it resolves on transitions that don't exist
Its own header (L31-39) states the morph is now spring-driven (`--dock-morph-t`), NOT a CSS
transition, "so the root carries no `width`/`padding` transition whose `transitionend` would
resolve." Yet `onDockTransitionDone` (L104) + `RESIZE_MORPH_PROPS` (constants:95) still listen for
`transitionend` on `width`/`height`/`padding`/`transform` — events the spring path never fires. The
flag is now driven only by the fallback `setTimeout`. The `@transitionend`/`@transitioncancel`
bindings on `.glass-dock` (GlassDock.vue:581-582) are dead wiring. The whole `isTransitioning`
generation machine duplicates concern with `[data-morphing]` (which `dockMorphContext` owns) and
the click-integrity guard's settle window. Three overlapping "is the dock busy?" signals.

### RC5 — FIVE springs, FIVE PRM probes, FIVE `disposeSpring()`, FIVE interruptible re-base bodies
Every one of the five engines hand-rolls: the `inheritedVelocity` re-base, the `prefersReducedMotion()`
matchMedia probe (copy-pasted verbatim 5×: `dockMorphContext:173`, `useLayerTransition:182`,
`useDockOrientationMorph:179`, `useDockItemDrag:46`, `useDockFission:326`), the `disposeSpring`
helper, and the `play(cb)` settle. This is the exact AV.W1 two-copy class the codebase elsewhere
condemns — here it is FIVE-copy. There is no shared `useDockSpring` primitive; each feature re-derives
the interruptible-spring contract. (Note the canonical `SpringProgress` lives in `@mkbabb/keyframes.js`
and already owns `respectReducedMotion`; the dock wraps it 5× anyway.)

### RC6 — the V↔H orientation morph is a MODAL of two SYNTHETIC docks (CONTEXT defect #13)
`useDockOrientationMorph.ts:9-19` renders **two real DOM docks** (a vertical one collapsing height +
a horizontal one growing width) crossfaded under a goo bridge — it cannot morph a REAL shell dock in
place. `AppShell.vue:80-185` consumes it as `morphStageOpen` → a `<Transition name="morph-stage-fade">`
OVERLAY (L497-571) with `@keydown.esc` on the overlay div (L505) — exactly the "modal demo, esc
doesn't work" the user reported (the esc binding requires the overlay to hold focus, which a
non-autofocused div does not). The CONTEXT mandate: a BUTTON IN THE DOCK that morphs the actual
vertical dock into horizontal in place. The current driver's two-synthetic-dock architecture
structurally cannot do that — it must be replaced by re-orienting the real dock's own
flex-axis + box morph on the ONE scalar.

### RC7 — `useDockFission` (604) + `useDockItemDrag` (302) + `useDockSearch` (285) are ≤1-consumer substrate
Per J-inv-10 a primitive ships only with ≥2 consumers or is formally retired. `useDockFission` has
ONE demo (`examples/TabBar.vue`) + 552 LOC of `fission-bridge.css`; `useDockItemDrag` ONE
(`overview.vue`); `useDockSearch` ONE (`dock-search.vue`). These are bolt-on "facilities" gated
behind additive props (`splittable`/`draggableItems`/`search`) that EACH add a code path,
template branch, pointer-handler, and prop to the god-SFC. The 4.2.0 redesign accreted them without
proving the consumer bar. Per "no legacy / KISS": the dock's JOB is collapse/expand + layer-switch +
hold; fission/item-drag/search are speculative add-ons that should be CUT (or, if a Siri-island/
search need is real in BG, re-derived once as a single coherent seam — NOT three bolt-ons).

### RC8 — overlapping "busy"/timing state: `isTransitioning` vs `[data-morphing]` vs `settleDeadline`
`useDockMorphWindow` owns `isTransitioning` (timer-based). `dockMorphContext`/`useLayerTransition`
own `[data-morphing]` (spring-based). `useDockClickIntegrity` owns `settleDeadline` +
`MORPH_SETTLE_MS` (a SECOND timer backstop). `useDockState` reads `isTransitioning` for click-away
suppression AND independently re-checks `[data-morphing]` in `isMorphingEdgeSweep`. Four mechanisms
answer "is the dock mid-morph?" — they can disagree. ONE reactive `morphing` ref (the orchestrator's)
should be the single source every consumer reads.

### RC9 — the `containerName`-freezes-morph trap is DOCUMENTED, not fixed (latent)
`useDockShellProps.ts:241-265` + the `container-type: inline-size` co-apply clamps the box and
FREEZES the morph on a collapsible dock — the team chose to DOCUMENT this rather than gate it. It is
a live foot-gun a BG re-architecture should design out (resolve the container subject without
`container-type` clamping, e.g. by measuring off a non-containing ancestor).

---

## PROPOSED WAVES

### BG.W-DOCK-MORPH-UNIFY — collapse the five springs into ONE dock-spring primitive + ONE morph engine
- **Intent.** Make the library's own "ONE spring, ONE clock" canon TRUE in the dock dir.
- **Approach (idiomatic).** Mint `useDockSpring(target, opts)` — the SINGLE wrapper over
  `SpringProgress` owning the interruptible velocity re-base, the cached-matchMedia PRM probe, the
  `disposeSpring`, and the `play(cb)` settle (the body copy-pasted 5× today). Then DELETE
  `useLayerTransition.ts` outright (land the long-booked W-GOD1 fold) and make `dockMorphContext`'s
  orchestrator the SOLE morph engine — `DockLayerGroup` always `registerGroup`s, no standalone
  fallback, no runtime branch, no `proof:dock-orchestrator-single` drift-guard. Every remaining
  spring consumer (orientation-morph, item-drag if kept) composes `useDockSpring`.
- **Files.** DELETE `useLayerTransition.ts`; rewrite `dockMorphContext.ts` (drop the dual-path
  rationale), `DockLayerGroup.vue` (single morph path), new `composables/useDockSpring.ts`; drop the
  `/dock` `useLayerTransition` re-export (`index.ts:51-61`) + the dead `proof:dock-orchestrator-single`.
- **π / acceptance.** One `new SpringProgress` site remains in the dock dir (grep-asserted). Layer
  swap + collapse morph paint-verified identical on real demo, both modes; PRM seats synchronously.
- **Folds.** RC1, RC5; closes the AY.W-GOD1 chronic.

### BG.W-DOCK-DECOMPOSE — split `GlassDock.vue` (711) into a colocated sub-component tree
- **Intent.** No god-SFC; one structural concern per file (the 500-line bound + KISS).
- **Approach.** Carve `GlassDock.vue` into a feature dir: the root SFC keeps ONLY the box +
  morph-region + slot plumbing (~200 LOC). Extract `components/DockMorphRegion.vue` (the
  `.dock-layers` full/summary/search panes), `components/DockRailSlot.vue` (the `.glass-dock-frame`
  escape + `#rail`/`#persistent` plumbing). The touch-gate stays a thin composable
  (`useDockTouchGate`). The `cartoon-cast` punch caster moves to CSS-only or a tiny `<DockCast>`
  presentational child — and its red drop-shadow mis-tune is FIXED here (CONTEXT defect #3).
- **Files.** `GlassDock.vue` + new `dock/components/*`, `dock/composables/useDockTouchGate.ts`.
- **π.** Root SFC < 300 LOC; defect-#3 red halo gone (paint-verified, both modes); card-corner +
  bottom-left dock aliasing resolved.
- **Folds.** RC2; the CONTEXT.md defect-#3 red/maroon cast.

### BG.W-DOCK-CUT — delete the dead + speculative-substrate composables (NO legacy)
- **Intent.** Remove ~1500 LOC of TS + ~700 LOC CSS that serve a dead or ≤1-consumer feature.
- **Approach (clean break, no alias).** DELETE outright: `useDockContextSilhouette.ts` (551, ZERO
  consumers — RC3), `useDockMorphWindow.ts` (118, vestigial — RC4; fold its surviving
  `isTransitioning` role into the orchestrator's `morphing` ref). RETIRE the `splittable` facility:
  delete `useDockFission.ts` (604), `dock/styles/fission-bridge.css` (552), the GlassDock fission
  template + handlers (L341-522, 671-696), the `splittable`/`splitContext`/`splitPlacement` props,
  and `examples/TabBar.vue`'s split demo. RETIRE `useDockItemDrag.ts` (302) + the `draggableItems`
  prop unless a real ≥2-consumer need surfaces in BG. Each removal is a registry-consumer-probed,
  formally-retired prune (inv-11).
- **Files.** the deletions above + `index.ts`/`composables/index.ts`/`api/index.ts` export pruning.
- **π.** `proof:overfitting`/consumer-evidence green; the dock dir drops ~33→~22 files; no broken
  import; demo builds.
- **Folds.** RC3, RC4, RC7.

### BG.W-DOCK-INPLACE-MORPH — the V↔H morph is a BUTTON IN THE DOCK, in place (no modal, no synthetic docks)
- **Intent.** Deliver CONTEXT defect #13 verbatim: a dock button that morphs the real vertical dock
  into horizontal (and back) IN PLACE — not a demo, not a modal, no crossfade variant.
- **Approach (first-principles).** Re-orient the dock's OWN flex axis + box on the ONE
  `--dock-morph-t` scalar (the orchestrator's spring), the same way collapse already morphs the box.
  The topology jump (column→row) is occluded by the liquid-teardrop goo bridge at the t≈0.5 midpoint
  (KEEP the teardrop — the user said "only the liquid teardrop works"; DELETE the View-Transition
  crossfade variant). DELETE `useDockOrientationMorph.ts`'s two-synthetic-dock architecture; the
  morph is a property of the real dock instance, toggled by a `DockIconButton` in the shell dock's
  utility group. Remove the `AppShell` `morphStage` overlay + `@keydown.esc` modal entirely.
- **Files.** rewrite/retire `useDockOrientationMorph.ts`; `GlassDock.vue` (in-place axis morph);
  `AppShell.vue` (drop the modal stage L80-185, 497-571); `SidebarDock.vue`/`BottomDock.vue` (the
  in-dock morph button); the morph-bridge CSS.
- **π.** Click the dock button → the real shell dock re-orients V→H in place under the teardrop,
  bidirectional, esc-free (there is no modal); both modes; PRM = instant seat. No `morph-stage`
  overlay in the DOM.
- **Folds.** RC6; CONTEXT defect #13.

### BG.W-DOCK-REMOVE-BRAND — delete the persistent ℱ brand section atop both shell docks
- **Intent.** CONTEXT defect #8 ("the persistent ℱ brand section atop BOTH docks is useless → REMOVE").
- **Approach.** Remove the `#persistent` ℱ wordmark home control + its separator from
  `SidebarDock.vue` (L253-305) and `BottomDock.vue` (L206-249) + the Fourier-epicycle long-press
  easter egg. Demo-layer only (no `src/` paint), but the `#persistent` slot may then prove
  consumer-less — probe and, if so, retire it from `GlassDock` too (RC2 carve already touches it).
- **Files.** `demo/layout/SidebarDock.vue`, `demo/layout/BottomDock.vue`; conditionally
  `GlassDock.vue` persistent-slot.
- **π.** No ℱ brand atop either dock; nav unbroken; if the slot is pruned, no dock references it.
- **Folds.** CONTEXT defect #8.

### BG.W-DOCK-BUSY-SINGLE — ONE "is the dock mid-morph?" source of truth
- **Intent.** Collapse the four overlapping busy/timing signals (RC8) into one reactive `morphing`.
- **Approach.** The orchestrator's `morphing` ref (already the reactive twin of `[data-morphing]`)
  becomes the SOLE busy signal. `useDockState` reads it for click-away suppression (drop the
  separate `isTransitioning` prop + the independent `isMorphingEdgeSweep` attr re-check). Fold the
  click-integrity guard's `settleDeadline`/`MORPH_SETTLE_MS` backstop onto the same `morphing` ref +
  a single settle window owned by the orchestrator. `isTransitioning` + `RESIZE_MORPH_PROPS` + the
  `@transitionend`/`@transitioncancel` dead bindings are removed (folds W-DOCK-CUT's morph-window delete).
- **Files.** `dockMorphContext.ts`, `useDockState.ts`, `useDockClickIntegrity.ts`, `constants.ts`,
  `GlassDock.vue`.
- **π.** One busy-signal symbol; collapsed-tap + morph-race click integrity preserved (the slides
  defect class stays fixed); no `transitionend` dead wiring.
- **Folds.** RC8, RC4 (the surviving morph-window concern), RC9 (resolve `containerName` without
  `container-type` clamping while here).

---

## The minimal coherent dock module shape (post-BG)

```
dock/
├─ GlassDock.vue                 # ~200 LOC — box + morph-region + slots only
├─ components/
│  ├─ DockMorphRegion.vue        # full/summary/search panes (the morph aperture)
│  └─ DockRailSlot.vue           # .glass-dock-frame escape + #rail/#persistent
├─ DockLayerGroup.vue · DockLayer.vue · DockIconButton.vue · DockTabButton.vue
├─ DockSection.vue · DockSeparator.vue · DockBackgroundToggle.vue
├─ DockStack.vue                 # rail stack/facets (railProjection colocated)
├─ Dock{Select,Dropdown,Popover}Trigger.vue
├─ composables/
│  ├─ useDockSpring.ts           # the ONE spring primitive (5→1)
│  ├─ dockMorphContext.ts        # the ONE morph engine (orchestrator)
│  ├─ dockMorphMeasure.ts        # convex-blend endpoints
│  ├─ useDockState.ts            # 3-state machine (reads the one `morphing` ref)
│  ├─ useDockClickIntegrity.ts   # tap/race guard (one settle window)
│  ├─ useDockShellProps.ts · useDockTouchGate.ts · useDockHold.ts
│  ├─ dockContext.ts · dockLayerContext.ts · isTeleportedTarget.ts · railProjection.ts
│  └─ index.ts
└─ constants.ts
```

**DELETED (no legacy):** `useDockContextSilhouette.ts`, `useLayerTransition.ts`,
`useDockMorphWindow.ts`, `useDockFission.ts` + `fission-bridge.css`, `useDockItemDrag.ts`,
`useDockOrientationMorph.ts` (replaced by the in-place axis morph). Net: ~33 files → ~24,
**5 springs → 1**, **2 morph engines → 1**, **4 busy-signals → 1**, ~2200 LOC of TS+CSS removed.
