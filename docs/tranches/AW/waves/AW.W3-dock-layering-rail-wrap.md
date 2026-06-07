# AW.W3 - Dock layering, rail, and slider polish

## State

**Name**: W3 - Dock layering, rail, and slider polish
**Opens after**: AW.W2 (the typed-VT, stagger, and hover-scale folds layer onto the clip-reveal
one-clock motion; the stagger keys off the SINGLE size spring's progress)
**Agents**: 2 parallel (W3.a motion-physics surface · W3.b hover/slider surface)
**Hard gate**: a Playwright `proof:dock-layering-polish` asserts directional asymmetry (the expand
and collapse VT carry distinct `:active-view-transition-type` curves), the expand item-stagger
reveals children over a spring-keyed cascade (keyed off the SINGLE size spring's progress, not a
fixed-ms timer), the collapsed-hover scale rides the dock spring vocabulary, and an in-dock
`<Slider>` drag holds the dock open (the `dockKeepOpen` token is acquired for the gesture); PLUS
`proof:dock-a11y-contract` is extended with a focus-orphan assert against the EXISTING post-swap
focus re-home in `DockLayer.vue`.
**Status**: REWRITTEN (wrap-morph moved to the deferred W3b; focus-after-swap downgraded to a gate
extension — it is already shipped)

## Goal criterion

This wave succeeds if the dock's expand, layer-switch, hover, AND in-dock slider interaction all
read as ONE motion language: items cascade in on the SINGLE size spring's progress, the
expand/collapse and forward/back swaps carry direction-specific curves via typed View-Transitions,
the collapsed→expand gesture is one continuous spring (not ease-then-spring), and dragging a
`<Slider>` inside a `<GlassDock>` holds the dock open through the gesture (the idle-collapse is
suppressed while the thumb is held). The post-swap focus re-home is verified (it is already shipped
in `DockLayer.vue:46-67` — this wave only adds the gate that proves it bites). No new public
primitive ships; the work is additive token + CSS + the existing `startViewTransition` substrate
(gaining a `types` argument) + the existing `dockKeepOpen` token seam (no new dock API).

**Scope changes from the prior draft** (see `docs/tranches/AW/audit/dock-perfection-plan.md` §5):
- The graceful multi-row wrap MOVES to the deferred big-dock wave **AW.W3b** — the wrap radius-morph
  is part of the card/grid radius story, not the layering-polish story; W3 should not own both the
  flex-wrap recipe AND the new grid recipe.
- The focus-after-swap a11y is ALREADY IMPLEMENTED (`DockLayer.vue:46-67`, AU.W8.4f — the identical
  `el.closest("[inert]")` orphan guard + `hostEl.value?.focus()` re-home + `tabindex="-1"` host).
  It is NOT new component code. W3 adds the `proof:dock-a11y-contract` focus-orphan ASSERT against
  the existing implementation (the synthesis's proposed `W3c` code wave is DROPPED).

## Scope

1. **Typed directional View-Transitions.** Extend `startViewTransition` in
   `src/composables/motion/useViewTransition.ts` with an optional `{ types?: string[] }` argument
   (passed through to `document.startViewTransition({ update, types })`, feature-detected — Firefox
   144 lacks types, degrade to the single symmetric curve). Thread `["dock-expand"]` vs
   `["dock-collapse"]` (and `["layer-forward"]` vs `["layer-back"]` for the `DockLayerGroup` swap)
   from `useLayerTransition.ts`. Author `:active-view-transition-type(dock-expand)` / `(dock-collapse)`
   blocks in `view-transition.css` with asymmetric iOS-style curves sourced from the existing
   `--spring-*` tokens (snappier exit, softer overshoot on entry) — no keyframes.js change, pure
   token + CSS.

2. **Spring-progress-keyed item stagger, keyed off the SINGLE size spring.** Reveal the expanded
   layer's child controls on a cascade KEYED to the size spring's progress (each child crosses its
   opacity threshold at a fraction of the morph), reversed on collapse (outer→in expand, in→outer
   collapse). Because it rides the physical morph, a fast flick and a slow hover-open both
   choreograph correctly and an interrupted morph carries the cascade with it (no orphaned
   `setTimeout`s). Under the clip-reveal one-clock model this is CLEANER than the prior draft
   assumed — there is exactly ONE clock to key off (the size spring's normalized progress), not a
   size spring + an opacity companion. The stagger is a per-child opacity onset INSIDE the active
   pane (the active pane as a whole is `opacity:1`, revealed by the aperture; the stagger is an
   intra-pane child reveal, not an active-pane fade — it does not reintroduce an active-pane opacity
   animation on the PANE, only on its children, and is suppressed under PRM).

3. **Hover-scale unification.** Move `.glass-dock.collapsed:hover { scale:
   var(--dock-collapsed-hover-scale) }` (`dock.css:395-400`) onto the dock spring vocabulary so a
   collapsed→hover→expand gesture reads as one continuous spring rather than a `scale`-ease handed
   off to a width-spring. The hover scale and the press squish (`--scale-press-dock`) become one
   register on the dock surface. (The hover scale rides the dock root, which carries `scale:1` at
   rest to mint the stacking context — `dock.css:67`; the W2 `proof:dock-clip-reveal` regression
   assert already confirms the portaled-popover-above-dock guarantee survives the clip during this
   hover scale.)

4. **Reduced-motion single-audit.** Confirm the three PRM paths (VT CSS, the JS fast-path at
   `useLayerTransition.ts:219-228`, the spring's `respectReducedMotion`) agree across the new
   stagger + hover folds: bounce/stagger suppressed, the state change still completing instantly
   (PRM kills bounce not function). Note: under the clip-reveal model the PRM synchronous swap
   instantly reveals the full aperture (fine), and the LEAVING-pane opacity transition is NOT
   stripped by the global PRM gate (`utilities.css` strips width/transform from
   transition-property, not opacity) — so under PRM the leaving pane still fades over
   `--dock-motion-resize` while the box snaps. This is acceptable (a fade is not motion-sickness
   spatial motion); the PRM audit confirms the STAGGER + SCALE collapse to 0 frames while the
   leaving fade is allowed to persist.

5. **In-dock slider keepDockOpen fix.** Restore the bidirectional `<Slider keepDockOpen>` contract:
   a `<Slider>` dragged inside a `<GlassDock>` acquires the `dockKeepOpen` token for the gesture's
   duration (suppressing idle-collapse) and reflects the dock's `dockHeld` computed via `data-held`
   for thumb-halo intensification. The seam already exists (`Slider.vue` the `dockKeepOpen` inject +
   acquire/release; `GlassDock.vue` provides the typed token via `provideDockContext`); the 3.3.0
   break is the acquire not firing / not releasing on a drag inside the dock. Diagnose against the
   `demo/stories/compositions/dock-with-slider.vue` proof story and fix the acquire/release wiring —
   NO new dock API, the existing `dockKeepOpen` token only. If the proof story does not exercise an
   idle-collapse-during-drag, extend it so the gate can sample the hold.

6. **Focus-orphan gate extension (NOT new code).** The post-swap focus re-home is ALREADY shipped
   (`DockLayer.vue:46-67` — the `watch(isActive)` orphan guard: if `document.activeElement` is null,
   body, or inside an `[inert]` ancestor when this layer becomes active, route focus to the revealed
   `tabindex="-1"` host). W3 extends `proof:dock-a11y-contract` with a focus-orphan ASSERT: born-RED
   = after a layer swap, focus is orphaned inside the now-inert leaving pane; GREEN = focus is
   re-homed to the active host. This is a GATE addition against existing code — no `DockLayer.vue` /
   `DockLayerGroup.vue` change.

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the file bounds expand beyond the listed paths — in particular if the typed-VT thread requires
  per-item `view-transition-name` assignment on dock buttons (the nested-group lockstep), which is a
  Chrome-140-only, not-yet-Baseline surface and a NET-NEW progressive-enhancement tier that must be
  its own planned wave, not folded here;
- `proof:dock-layering-polish` shows the spring-keyed stagger introduces an orphaned-timer leak on a
  rapid interrupt (the exact failure the spring-keying is meant to eliminate);
- the stagger's per-child opacity onset reintroduces an active-PANE opacity animation (regressing the
  W2 clip-reveal contract that the active pane is statically opacity:1) — escalate rather than let the
  stagger leak onto the pane.

## File Bounds

| File | Access |
|---|---|
| `src/composables/motion/useViewTransition.ts` | modify (the `types` arg) |
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify (thread direction types; the spring-keyed stagger off the SINGLE size spring's progress) |
| `src/styles/view-transition.css` | modify (the `:active-view-transition-type` asymmetric curves) |
| `src/styles/dock.css` | modify-carve (the hover-scale rule onto the dock spring vocabulary — disjoint from the W2 clip/opacity carve) |
| `src/components/ui/slider/Slider.vue` | modify (the `dockKeepOpen` acquire/release wiring — scope 5; NO new prop/API) |
| `scripts/proof-dock-layering-polish.mjs` | create |
| `scripts/proof-dock-a11y-contract` (the existing `vitest` gate target) | the focus-orphan assert lands in the dock a11y test below |
| `tests/components/custom/dock/dock-layering-polish.detect.test.ts` | create |
| `tests/components/custom/dock/DockLayerRail.a11y.test.ts` | modify (add the focus-orphan assert — scope 6, against the EXISTING `DockLayer.vue` re-home) |
| `demo/stories/navigation/dock.vue` | modify (the hover showcase) |
| `demo/stories/compositions/dock-with-slider.vue` | modify (extend the proof story to exercise an idle-collapse-during-drag so the keepDockOpen gate can sample the hold) |

Do NOT touch: `tokens.css` / `regen-spring-tokens.mjs` (the spring curve is settled — W3 CONSUMES
the `--spring-dock`, never re-tunes it), the `overflow="wrap"` recipe in `dock.css` (MOVED to the
deferred W3b — W3 does NOT touch the wrap rules), `GlassDock.vue` collapse mechanism (AW.W1) + the
clip-reveal shell (AW.W2), `DockLayer.vue` / `DockLayerGroup.vue` (the focus re-home is shipped —
W3 adds only the gate assert), the dock visibility 3-state fork markers, `dockContext.ts` /
`dockLayerContext.ts` (the DI seam is unchanged — the slider fix consumes the EXISTING `dockKeepOpen`
token).

## Disjointness

Two parallel agent units split by surface:

- **W3.a** writes `useViewTransition.ts`, `useLayerTransition.ts`, `view-transition.css` (the
  motion-physics surface: typed-VT, the spring-keyed stagger off the single size spring, the PRM
  audit) + the `proof:dock-layering-polish` gate + the detector test.
- **W3.b** writes `dock.css` (modify-carve: the hover-scale rule ONLY — disjoint from the W2
  clip/opacity carve and the deferred W3b wrap rules), `Slider.vue` (the `dockKeepOpen` fix),
  `DockLayerRail.a11y.test.ts` (the focus-orphan assert), `demo/stories/navigation/dock.vue` (the
  hover showcase), and `demo/stories/compositions/dock-with-slider.vue` (the slider-hold proof
  story).

The two units share NO `modify` path. `useLayerTransition.ts` is W3.a-only; `dock.css`, `Slider.vue`,
the a11y test, and both demo stories are W3.b-only. The `dock.css` carve is the hover rule, disjoint
from the W2 clip/opacity rules and the deferred W3b wrap rules.

## Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W3.a | `/Users/mkbabb/Programming/glass-ui-aw-w3a` | n/a (Node/Vite — no Cargo) |
| AW.W3.b | `/Users/mkbabb/Programming/glass-ui-aw-w3b` | n/a (Node/Vite — no Cargo) |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch, or commits W2 first
so both units branch from a clean shared main.

## Agent Units

### AW.W3.a Directional intent + spring-keyed stagger + PRM audit

- Goal: expand/collapse and forward/back carry distinct curves, items cascade on the SINGLE size
  spring's progress, and the three PRM paths agree.
- Mechanism: add the optional `types` arg to `startViewTransition` (feature-detected); thread
  direction types from `useLayerTransition`; author the `:active-view-transition-type(...)`
  asymmetric-curve blocks in `view-transition.css`; reveal children on a progress-keyed threshold
  cascade in the size spring's `play()` callback (reversed on collapse) — a per-CHILD opacity onset
  inside the active pane, NOT a pane-level fade (the pane is statically opacity:1 under W2); audit
  the PRM fast-path + VT-CSS + spring `respectReducedMotion` for agreement.
- Files: `useViewTransition.ts`, `useLayerTransition.ts`, `view-transition.css`,
  `proof-dock-layering-polish.mjs`, `dock-layering-polish.detect.test.ts`
- Sub-gate: `proof:dock-layering-polish` asserts ≥2 distinct `::view-transition` type curves run
  (expand vs collapse), the child reveal timeline is monotone in the size spring's progress (no
  fixed-ms plateau), a PRM-forced expand shows 0 stagger frames + an instant completed state, AND
  the active PANE's opacity stays 1 throughout (the W2 clip-reveal contract is not regressed by the
  child stagger).

### AW.W3.b Hover-scale unification + slider keepDockOpen + focus-orphan gate

- Goal: the collapsed-hover scale is one spring vocabulary with the press squish, an in-dock slider
  drag holds the dock open, and the shipped post-swap focus re-home is proven by a born-RED gate.
- Mechanism: move the `.collapsed:hover` scale onto the dock spring timing; diagnose + fix the
  `dockKeepOpen` acquire/release in `Slider.vue` so a drag inside a `<GlassDock>` holds the dock
  open, and extend `dock-with-slider.vue` to exercise an idle-collapse-during-drag; add the
  focus-orphan assert to `DockLayerRail.a11y.test.ts` against the EXISTING `DockLayer.vue` re-home.
- Files: `dock.css` (modify-carve), `Slider.vue`, `DockLayerRail.a11y.test.ts`,
  `demo/stories/navigation/dock.vue`, `demo/stories/compositions/dock-with-slider.vue`
- Sub-gate: `proof:dock-layering-polish` rAF-samples the hover scale rising over ≥3 frames on the
  dock spring curve, AND an in-dock `<Slider>` pointer-drag holds the dock expanded for the gesture
  (no idle-collapse mid-drag; release re-arms the idle timer); `proof:dock-a11y-contract` is GREEN
  with the new focus-orphan assert (born-RED if the `DockLayer.vue` re-home is reverted).

## Hard Gate

1. `npm run proof:dock-layering-polish` (new Playwright gate, harness-gated SKIP) — on
   `/navigation/dock` (and the `dock-with-slider` composition for (e)):
   (a) an expand and a collapse run DISTINCT `::view-transition` type animations (directional
   asymmetry present);
   (b) the expand child-reveal is a spring-progress-keyed cascade (the per-child opacity onset times
   are monotone in the morph progress, not clustered at a fixed offset) AND the active PANE opacity
   stays 1 throughout (W2 clip-reveal not regressed);
   (c) the collapsed-hover scale rises over ≥3 frames on the dock spring curve;
   (d) under forced `prefers-reduced-motion: reduce`, (b)/(c) collapse to an instant completed state
   (0 stagger/scale morph frames) while the state still toggles (the leaving-pane fade is allowed to
   persist — it is not spatial motion);
   (e) an in-dock `<Slider>` pointer-drag (on the `dock-with-slider` composition) holds the dock open
   — the dock stays `expanded` through the synthetic drag and does NOT idle-collapse mid-gesture, and
   a release re-arms the idle collapse. The 3.3.0 build shows the dock idle-collapsing under the held
   thumb → born-RED; GREEN after the `dockKeepOpen` acquire/release fix.
2. `npm run proof:dock-a11y-contract` (extended) — the existing rail-role asserts stay GREEN, PLUS a
   focus-orphan assert: born-RED if after a layer swap `document.activeElement` is orphaned inside the
   now-inert leaving pane; GREEN = focus is re-homed to the revealed active host (`tabindex=-1`) by
   the EXISTING `DockLayer.vue:46-67` watch. A deliberate revert of that watch reddens the assert.
3. `npx vitest run tests/components/custom/dock/dock-layering-polish.detect.test.ts` — the pure
   detectors (monotone-cascade, distinct-type-curves, PRM-zero) over synthetic timelines.
4. `npm run proof:dock-clip-reveal` + `proof:dock-animation-live` + `proof:dock-opacity-lockstep` +
   `proof:dock-motion-parity` + `proof:spring-tokens-synced` stay GREEN (W1/W2 contracts intact — the
   polish does not regress the clip-reveal morph, the leaving-fade lockstep, or the curve sync).
5. `npm run typecheck` clean; `npm run build` green; `npm run proof:offscreen-pause` GREEN.
6. BORN-RED CAPTURE (mirroring W1/W2). `proof:dock-layering-polish` SKIPs fail-open on a harnessless
   runner, so the born-RED `W3-layering-polish.json` (the symmetric-curve, the fixed-ms-cluster
   stagger, the idle-collapse-under-drag, the orphaned-focus) is CAPTURED in the MCP/dev Playwright
   env on the 3.3.0 build BEFORE the fix and the GREEN artefact AFTER. A deliberate-inject reddening
   (revert one fold) confirms each sub-assert bites.

## Format And Lint Cadence

`npm run typecheck` after each unit's integration batch. Prettier over the new `.mjs` gate + the
`.test.ts` + the `.vue` stories. `git diff --check`. The proof gates above run before close. Both
worktree units run `typecheck` + their sub-gate before the orchestrator integrates.

## Verification Artefacts

- `docs/tranches/AW/audit/W3-layering-polish.json` — the gate artefact: the directional-type curves,
  the spring-keyed cascade timeline (monotone in the SINGLE size spring's progress), the hover morph
  series, the PRM-zero confirmation, the active-pane-opacity==1 regression check.
- The born-RED + GREEN `dockKeepOpen` slider-hold timeline: the dock `expanded` state across the
  synthetic in-dock drag, 3.3.0 (collapses mid-drag) vs post-fix (held), captured in the Playwright
  env.
- The born-RED + GREEN focus-orphan series (gate 2): focus inside the inert leaving pane (3.3.0 with
  the watch reverted) vs re-homed to the active host (HEAD).
- The vitest run log for `dock-layering-polish.detect.test.ts` + the extended
  `DockLayerRail.a11y.test.ts`.

## Commit Plan

- `feat(motion): add typed View-Transitions argument to startViewTransition` — the
  `useViewTransition.ts` signature extension (body: the `types` pass-through, the Firefox-144
  feature-detect degrade).
- `feat(dock): directional expand/collapse curves + spring-keyed child stagger` — the
  `useLayerTransition.ts` + `view-transition.css` fold (W3.a; body: the stagger keys off the SINGLE
  size spring's progress, a per-child reveal inside the opacity:1 active pane, not a pane fade).
- `feat(dock): unify collapsed-hover scale onto the dock spring vocabulary` — the `dock.css` carve
  (W3.b).
- `fix(slider): restore dockKeepOpen acquire/release on in-dock drag` — the `Slider.vue` wiring + the
  `dock-with-slider` proof story (W3.b; body: the 3.3.0 idle-collapse-under-drag break, the
  existing-token reuse, no new dock API).
- `test(dock): proof:dock-layering-polish + the focus-orphan a11y assert + detector unit` — the gate
  + the a11y-test extension (body: the focus re-home is shipped at DockLayer.vue:46-67; this proves it
  bites).
- `docs(AW): W3 close — layering-polish artefact + status`.

## Dependencies

- **Depends on**: AW.W2 (the typed-VT, stagger, hover-scale all consume the clip-reveal one-clock
  motion + the SINGLE size spring's progress).
- **Blocks**: the AW close wave (the dock README documents the finished dock animation language);
  slides H.W1 / H-dock consumption.

## Archaeology

- AV.W9 fixed the `DockLayerGroup` multi-pane switch but left expand/collapse and forward/back on
  the identical symmetric curve — iOS-feel motion is asymmetric (snappier exit, softer entry). The
  typed-VT fold is the first direction-aware dock motion.
- The collapsed-hover scale (`dock.css:395-400`) rode the base transition while expand rode the
  spring — two motion languages on one gesture. W3.b unifies them.
- The dock-with-slider `keepDockOpen` interaction: the `dockKeepOpen` token seam already exists
  (`Slider.vue`, `GlassDock.vue` `provideDockContext`); the 3.3.0 break is the acquire/release not
  firing on an in-dock drag, so the dock idle-collapses under the held thumb. Scope 5 fixes the
  wiring.
- The post-swap focus re-home is ALREADY shipped (`DockLayer.vue:46-67`, AU.W8.4f — the orphan guard
  + `tabindex="-1"` re-home). The synthesis proposed a NEW `W3c` code wave duplicating it; that is
  DROPPED (it would create a second focus-routing owner, violating the one-owner invariant). W3 adds
  only the `proof:dock-a11y-contract` focus-orphan assert that the shipped code bites.
- MOVED OUT: the graceful multi-row wrap (the prior draft's scope 4) is now the deferred big-dock
  wave **AW.W3b** — the wrap radius-morph is part of the card/grid radius-morph story, and W3 should
  not own both the flex-wrap recipe and the grid recipe. W3 sheds the `dock.css` wrap rules entirely.
- New guardrail: `proof:dock-layering-polish` is the first gate to assert directional asymmetry, a
  spring-keyed (not fixed-ms) cascade, the in-dock slider hold, AND (via the a11y extension) the
  focus re-home — the prior gate fleet proved only the symmetric size+opacity lockstep.
