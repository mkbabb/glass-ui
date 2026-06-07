# AW.W3 - Dock layering, rail, and wrap polish

## State

**Name**: W3 - Dock layering, rail, and wrap polish
**Opens after**: AW.W2 (the typed-VT, stagger, and hover-scale folds layer onto the unified one-clock motion)
**Agents**: 2 parallel (W3.a motion-physics surface · W3.b layout/wrap/slider surface)
**Hard gate**: a Playwright `proof:dock-layering-polish` asserts directional asymmetry (the expand and collapse VT carry distinct `:active-view-transition-type` curves), the expand item-stagger reveals children over a spring-keyed cascade (not a fixed-ms timer), the collapsed-hover scale rides the dock spring vocabulary, the `overflow="wrap"` row reflow MORPHS rather than snapping at the `--dock-overflow-bp` boundary, and an in-dock `<Slider>` drag holds the dock open (the `dockKeepOpen` token is acquired for the gesture's duration).
**Status**: planned

## Goal criterion

This wave succeeds if the dock's expand, layer-switch, hover, wrap, AND in-dock
slider interaction all read as ONE motion language: items cascade in on the shared
spring's progress, the expand/collapse and forward/back swaps carry
direction-specific curves via typed View-Transitions, the collapsed→expand gesture
is one continuous spring (not ease-then-spring), a multi-row wrap glides instead of
jump-cutting, and dragging a `<Slider>` inside a `<GlassDock>` holds the dock open
through the gesture (the idle-collapse is suppressed while the thumb is held). No
new public primitive ships unless it has ≥2 consumers; the work is additive token +
CSS + the existing `startViewTransition` substrate (gaining a `types` argument) +
the existing `dockKeepOpen` token seam (no new dock API).

## Scope

1. **Typed directional View-Transitions.** Extend `startViewTransition` in
   `src/composables/motion/useViewTransition.ts` with an optional
   `{ types?: string[] }` argument (passed through to
   `document.startViewTransition({ update, types })`, feature-detected — Firefox
   144 lacks types, degrade to the single symmetric curve). Thread `["dock-expand"]`
   vs `["dock-collapse"]` (and `["layer-forward"]` vs `["layer-back"]` for the
   `DockLayerGroup` swap) from `useLayerTransition.ts`. Author
   `:active-view-transition-type(dock-expand)` / `(dock-collapse)` blocks in
   `view-transition.css` with asymmetric iOS-style curves sourced from the existing
   `--spring-*` tokens (snappier exit, softer overshoot on entry) — no
   keyframes.js change, pure token + CSS (Lane 4 γ).
2. **Spring-progress-keyed item stagger.** Reveal the expanded layer's child
   controls on a cascade KEYED to the shared spring's progress (each child crosses
   its opacity threshold at a fraction of the morph), reversed on collapse
   (outer→in expand, in→outer collapse — the Motion `staggerDirection:-1` idiom).
   Because it rides the physical morph, a fast flick and a slow hover-open both
   choreograph correctly and an interrupted morph carries the cascade with it (no
   orphaned `setTimeout`s). Drive it off the W2 normalized progress, not a fixed
   `ms` delay (Lane 3 F4/γ).
3. **Hover-scale unification.** Move `.glass-dock.collapsed:hover { scale:
   var(--dock-collapsed-hover-scale) }` (`dock.css:386`) onto the dock spring
   vocabulary so a collapsed→hover→expand gesture reads as one continuous spring
   rather than a `scale`-ease handed off to a width-spring (Lane 1 ε, Lane 1
   finding 4). The hover scale and the press squish (`--scale-press-dock`) become
   one register on the dock surface.
4. **Graceful multi-row wrap.** The `overflow="wrap"` recipe flips `flex-wrap` +
   `border-radius` at the `--dock-overflow-bp` `@media` boundary (`dock.css:919`)
   with no morph — a jump-cut. Sequence the row reflow through a `min-height`
   settle on the retuned `--spring-dock` curve so wrap/unwrap MORPHS, gated to snap
   under `prefers-reduced-motion` (snap is correct there). Stylize the multi-row
   pill per the warm-cream-glass + iOS-26 idiom (the rounded `--radius-2xl`
   multi-row shell stays; the row-gap reflow gains the spring) (Lane 1 ζ, Lane 3 ζ).
5. **Reduced-motion single-audit.** Confirm the three PRM paths (VT CSS, the JS
   fast-path at `useLayerTransition.ts:219`, the spring's `respectReducedMotion`)
   agree across the new stagger + wrap + hover folds: bounce/stagger/wrap-morph
   suppressed, the state change still completing instantly (NN/g: bounce on
   user-initiated only, PRM kills bounce not function — Lane 1 η).
6. **In-dock slider keepDockOpen fix** (charter D-3, §2 W3 row). Restore the
   bidirectional `<Slider keepDockOpen>` contract on the cross-substrate
   composition: a `<Slider>` dragged inside a `<GlassDock>` acquires the
   `dockKeepOpen` token for the gesture's duration (suppressing idle-collapse) and
   reflects the dock's `dockHeld` computed via `data-held` for thumb-halo
   intensification. The seam already exists (`Slider.vue:17-91`, the `dockKeepOpen`
   inject + acquire/release; `GlassDock.vue:179` provides the typed token); the
   3.3.0 break is the acquire not firing / not releasing on a drag inside the dock
   (RECAP D-3). Diagnose against the `demo/stories/compositions/dock-with-slider.vue`
   proof story and fix the acquire/release wiring — NO new dock API, the existing
   `dockKeepOpen` token only (KISS). If the proof story does not exercise an
   idle-collapse-during-drag, extend it so the gate can sample the hold.

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the file bounds expand beyond the listed paths — in particular if the typed-VT
  thread requires per-item `view-transition-name` assignment on dock buttons
  (the nested-group lockstep, Lane 4 α), which is a Chrome-140-only,
  not-yet-Baseline surface and a NET-NEW progressive-enhancement tier that must be
  its own planned wave, not folded here;
- `proof:dock-layering-polish` shows the spring-keyed stagger introduces an
  orphaned-timer leak on a rapid interrupt (the exact failure the spring-keying is
  meant to eliminate);
- the third iteration of the wrap morph cannot land a `min-height` settle that
  does not fight the `@media` `flex-wrap` flip — escalate to a re-plan of the wrap
  recipe rather than widening the morph window.

## File Bounds

| File | Access |
|---|---|
| `src/composables/motion/useViewTransition.ts` | modify |
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify |
| `src/styles/view-transition.css` | modify |
| `src/styles/dock.css` | modify-carve |
| `src/components/ui/slider/Slider.vue` | modify (the `dockKeepOpen` acquire/release wiring — scope 6; NO new prop/API) |
| `scripts/proof-dock-layering-polish.mjs` | create |
| `tests/components/custom/dock/dock-layering-polish.detect.test.ts` | create |
| `demo/stories/navigation/dock.vue` | modify (the wrap + hover showcase — and the `overflow="wrap"` recipe the gate samples, which the story does NOT have today and W3.b must ADD before the wrap probe has a target) |
| `demo/stories/compositions/dock-with-slider.vue` | modify (extend the proof story to exercise an idle-collapse-during-drag so the keepDockOpen gate can sample the hold) |

Do NOT touch: `tokens.css` / `regen-spring-tokens.mjs` (the spring curve is
AW.W2's — W3 CONSUMES the retuned `--spring-dock`, never re-tunes it),
`GlassDock.vue` collapse mechanism (AW.W1), the dock visibility 3-state fork
markers, `dockContext.ts` / `dockLayerContext.ts` (the DI seam is unchanged — the
slider fix consumes the EXISTING `dockKeepOpen` token, it does not alter the seam).

## Disjointness

Two parallel agent units split by surface:

- **W3.a** writes `useViewTransition.ts`, `useLayerTransition.ts`,
  `view-transition.css` (the motion-physics surface: typed-VT, stagger, the PRM
  audit) + the gate + detector test.
- **W3.b** writes `dock.css` (modify-carve: the hover-scale rule + the wrap
  recipe), `Slider.vue` (the `dockKeepOpen` acquire/release fix — scope 6),
  `demo/stories/navigation/dock.vue` (the wrap/hover showcase, adding the
  `overflow="wrap"` recipe), and `demo/stories/compositions/dock-with-slider.vue`
  (the slider-hold proof story extension).

The two units share NO `modify` path. `useLayerTransition.ts` is W3.a-only;
`dock.css`, `Slider.vue`, and both demo stories are W3.b-only (the `dock.css`
carve is the hover + wrap rules, disjoint from the opacity/visibility rules W2
demoted). The gate (`proof:dock-layering-polish.mjs`) is W3.a-owned and reads all
surfaces at runtime.

## Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W3.a | `/Users/mkbabb/Programming/glass-ui-aw-w3a` | n/a (Node/Vite — no Cargo) |
| AW.W3.b | `/Users/mkbabb/Programming/glass-ui-aw-w3b` | n/a (Node/Vite — no Cargo) |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch, or
commits W2 first so both units branch from a clean shared main. (No Rust target
dir — the per-agent column is n/a for this Vite/Node repo.)

## Agent Units

### AW.W3.a Directional intent + spring-keyed stagger + PRM audit

- Goal: expand/collapse and forward/back carry distinct curves, items cascade on
  the spring's progress, and the three PRM paths agree.
- Mechanism: add the optional `types` arg to `startViewTransition`
  (feature-detected); thread direction types from `useLayerTransition`; author the
  `:active-view-transition-type(...)` asymmetric-curve blocks in
  `view-transition.css`; reveal children on a progress-keyed threshold cascade in
  the spring callback (reversed on collapse); audit the PRM fast-path + VT-CSS +
  spring `respectReducedMotion` for agreement.
- Files: `useViewTransition.ts`, `useLayerTransition.ts`, `view-transition.css`,
  `proof-dock-layering-polish.mjs`, `dock-layering-polish.detect.test.ts`
- Sub-gate: `proof:dock-layering-polish` asserts ≥2 distinct
  `::view-transition` type curves run (expand vs collapse), the child reveal
  timeline is monotone in the spring's progress (no fixed-ms plateau), and a
  PRM-forced expand shows 0 stagger frames + an instant completed state.

### AW.W3.b Hover-scale unification + graceful wrap + slider keepDockOpen

- Goal: the collapsed-hover scale is one spring vocabulary with the press squish,
  the `overflow="wrap"` reflow morphs, and an in-dock slider drag holds the dock
  open.
- Mechanism: move the `.collapsed:hover` scale onto the dock spring timing (carve
  the rule to consume the retuned `--spring-dock` register, not the base
  transition); add a `min-height` spring settle to the `.dock-overflow-wrap` row
  reflow at the `--dock-overflow-bp` boundary, PRM-gated to snap; stylize the
  multi-row pill; FIRST add an `overflow="wrap"` showcase to the demo dock story
  (it has none today — the wrap probe has no target without it), then extend it
  with the hover showcase. For the slider arm: diagnose + fix the `dockKeepOpen`
  acquire/release in `Slider.vue` (scope 6) so a drag inside a `<GlassDock>` holds
  the dock open, and extend `dock-with-slider.vue` to exercise an
  idle-collapse-during-drag.
- Files: `dock.css` (modify-carve), `Slider.vue`,
  `demo/stories/navigation/dock.vue`, `demo/stories/compositions/dock-with-slider.vue`
- Sub-gate: `proof:dock-layering-polish` rAF-samples the hover scale rising over
  ≥3 frames on the dock spring curve, the wrap-row `min-height` morphing over
  ≥3 frames at a resize crossing `--dock-overflow-bp` (a snap is `<= 1` frame →
  RED unless PRM is forced), AND an in-dock `<Slider>` pointer-drag holds the dock
  expanded for the gesture (the dock does NOT idle-collapse mid-drag; release
  re-arms the idle timer).

## Hard Gate

1. `npm run proof:dock-layering-polish` (new Playwright gate, harness-gated SKIP
   like `proof:dock-animation-live`) — on `/navigation/dock` (and the
   `dock-with-slider` composition for (f)):
   (a) an expand and a collapse run DISTINCT `::view-transition` type animations
   (directional asymmetry present);
   (b) the expand child-reveal is a spring-progress-keyed cascade (the per-child
   opacity onset times are monotone in the morph progress, not clustered at a
   fixed offset);
   (c) the collapsed-hover scale rises over ≥3 frames on the dock spring curve;
   (d) the `overflow="wrap"` row reflow `min-height` morphs over ≥3 frames at a
   `--dock-overflow-bp` crossing — this PREREQUIRES W3.b having ADDED an
   `overflow="wrap"` showcase to `demo/stories/navigation/dock.vue` (the story has
   none at HEAD; without it the probe has nothing to sample, so the showcase is a
   gate precondition, not an afterthought);
   (e) under forced `prefers-reduced-motion: reduce`, (b)/(c)/(d) all collapse to
   an instant completed state (0 stagger/scale/wrap morph frames) while the state
   still toggles;
   (f) an in-dock `<Slider>` pointer-drag (on the `dock-with-slider` composition)
   holds the dock open — the dock stays `expanded` through the synthetic drag and
   does NOT idle-collapse mid-gesture, and a release re-arms the idle collapse.
   The 3.3.0 build shows the dock idle-collapsing under the held thumb → born-RED;
   GREEN after the `dockKeepOpen` acquire/release fix.
2. `npx vitest run tests/components/custom/dock/dock-layering-polish.detect.test.ts`
   — the pure detectors (monotone-cascade, distinct-type-curves, PRM-zero) over
   synthetic timelines.
3. `npm run proof:dock-animation-live` + `proof:dock-opacity-lockstep` +
   `proof:dock-motion-parity` + `proof:spring-tokens-synced` stay GREEN (W1/W2
   contracts intact — the polish does not regress the morph or the curve sync).
4. `npm run proof:dock-a11y-contract` GREEN (the rail a11y test — the typed-VT +
   stagger do not break the switcher-rail roles).
5. `npm run typecheck` clean; `npm run build` green;
   `npm run proof:offscreen-pause` GREEN (the new motion honors the substrate park).
6. BORN-RED CAPTURE (mirroring W1/W2). `proof:dock-layering-polish` SKIPs fail-open
   on a harnessless runner (no Playwright on CI), so it cannot be the falsifiable
   RED-on-HEAD witness the charter inv-27 / π-lane demand UNLESS the wave runs it in
   the MCP/dev env. The born-RED `W3-layering-polish.json` (the symmetric-curve, the
   fixed-ms-cluster stagger, the jump-cut wrap, the idle-collapse-under-drag) is
   CAPTURED in the Playwright env on the 3.3.0 build BEFORE the fix and the GREEN
   artefact AFTER — both saved to the W3 artefact. A deliberate-inject reddening
   (revert one fold) confirms each sub-assert bites.

## Format And Lint Cadence

`npm run typecheck` after each unit's integration batch. Prettier over the new
`.mjs` gate + `.test.ts` + the `.vue` story. `git diff --check`. The proof gates
above run before close. Both worktree units run `typecheck` + their sub-gate
before the orchestrator integrates.

## Verification Artefacts

- `docs/tranches/AW/audit/W3-layering-polish.json` — the gate artefact: the
  directional-type curves, the spring-keyed cascade timeline, the hover + wrap
  morph series, the PRM-zero confirmation.
- `docs/tranches/AW/audit/W3-wrap-before-after.png` — a screenshot pair of the
  multi-row wrap morph (jump-cut 3.3.0 vs the glided morph).
- The born-RED + GREEN `dockKeepOpen` slider-hold timeline (gate (f)): the dock
  `expanded` state across the synthetic in-dock drag, 3.3.0 (collapses mid-drag)
  vs post-fix (held), captured in the Playwright env.
- The vitest run log for `dock-layering-polish.detect.test.ts`.

## Commit Plan

- `feat(motion): add typed View-Transitions argument to startViewTransition` —
  the `useViewTransition.ts` signature extension (body: the `types` pass-through,
  the Firefox-144 feature-detect degrade).
- `feat(dock): directional expand/collapse curves + spring-keyed item stagger` —
  the `useLayerTransition.ts` + `view-transition.css` fold (W3.a).
- `feat(dock): unify collapsed-hover scale + graceful multi-row wrap morph` — the
  `dock.css` carve + the demo story `overflow="wrap"` showcase (W3.b).
- `fix(slider): restore dockKeepOpen acquire/release on in-dock drag` — the
  `Slider.vue` wiring + the `dock-with-slider` proof story (W3.b; body: the 3.3.0
  idle-collapse-under-drag break, the existing-token reuse, no new dock API).
- `test(dock): proof:dock-layering-polish + detector unit` — the gate + vitest.
- `docs(AW): W3 close — layering-polish artefact + status`.

## Dependencies

- **Depends on**: AW.W2 (the typed-VT, stagger, hover-scale, and wrap morph all
  consume the unified one-clock motion + the retuned `--spring-dock`).
- **Blocks**: the AW close wave (the dock README — one of the four research-backed
  READMEs — documents the finished dock animation language; the README is the
  close wave's deliverable, NOT a numbered `AW.W23` which does not exist — the
  convergence cluster owns the close wave's final number); slides H.W1 / H-dock
  consumption (a dock whose wrap + layering read as one language).

## Archaeology

- AV.W9 fixed the `DockLayerGroup` multi-pane switch but left expand/collapse and
  forward/back on the identical symmetric curve — iOS-feel motion is asymmetric
  (snappier exit, softer entry), which a single curve cannot express (Lane 4
  finding 3). The typed-VT fold is the first direction-aware dock motion.
- The `overflow="wrap"` reflow has always been a `@media` `flex-wrap` jump-cut
  (`dock.css:919`) with no morph — flagged "not correct, better stylized" (RECAP
  :43). W3.b is its first motion-aware reflow.
- The collapsed-hover scale (`dock.css:386`) rode the base transition while expand
  rode the spring — two motion languages on one gesture (Lane 1 finding 4). W3.b
  unifies them.
- RESTORED scope: the charter (D-3, §2 W3 row) assigns W3 the dock-with-slider
  `keepDockOpen` interaction fix; the prior W3 draft silently DROPPED it (zero
  slider mention). Scope 6 restores it — the `dockKeepOpen` token seam already
  exists (`Slider.vue:17-91`, `GlassDock.vue:179`); the 3.3.0 break is the
  acquire/release not firing on an in-dock drag, so the dock idle-collapses under
  the held thumb.
- New guardrail: `proof:dock-layering-polish` is the FIRST gate to assert
  directional asymmetry, a spring-keyed (not fixed-ms) cascade, a wrap MORPH, AND
  the in-dock slider hold — the prior gate fleet only proved the symmetric
  size+opacity lockstep, so the jump-cut wrap, the timer-based stagger, and the
  dropped slider-hold had no falsifiable bar.
