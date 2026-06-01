# AP.W3 — consumer-contract completion + control-flow derivation

W3 is AP's real headline (W2's cascade-reclaim premise was refuted by measurement; see
`W2-cascade-derivation.md`). It closes the zero-deferral gap (the two under-folded speedtest-AQ
items R0G-6 + R0G-7), derives the aurora run-state from a suspend-source set (T3), and fixes a
confirmed DockLayerGroup vertical-overflow bug. Every gate verified.

## R0G-7 — the `/motion` keyframes-free leaf carve (the architectural keystone)

The `/motion` flat barrel `export *`-rolled all twelve leaves as one SCC, so a consumer importing
the cheap `useIntersectionPause` statically reached the keyframes-bearing leaves' module-eval
`import … from "@mkbabb/keyframes.js"` — speedtest measured ~125 KB of keyframes engine on every
route's eager graph through a zero-keyframes path. The carve breaks the SCC:

- **New flat `/motion-core` subpath** (sibling to `/motion`, the L.W1 Lane C flat-sibling-per-
  heavy-peer shape) re-exports the six keyframes-FREE leaves: `constants`, `useStaggerReveal`,
  `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `useStagger`. The leaf `.ts` files
  did not move; the barrels re-point.
- **`/motion` keeps the keyframes-BEARING set**: `useSpring`/`useSpringMount`/`useSpringPress`,
  `useNumericTransition`, `useAnimatedNumber`/`useAnimatedNumberMap` + `constants` (duplicate-
  exported on both — pure data, benign).
- **`installDarkModeSync` relocated to `/dark`** — it is keyframes-free but VUEUSE-bearing (imports
  `useGlobalDark`), so it cannot ride the vueuse-free `/motion-core`; `/dark` is its vueuse home.
- **No alias on `/motion`** for the relocated symbols (inv 47) — consumers rename at the call site;
  the rename table is in MIGRATION.md + CHANGELOG.md.
- Wiring: `vite.library.ts` `motion-core` entry, `package.json` `exports` + `typesVersions`,
  `src/composables/index.ts` (internal barrel re-exports `./motion/core`), `src/dark.ts` +
  `dark/index.ts` (re-export installDarkModeSync). Root barrel `src/index.ts` UNCHANGED (the motion
  sub-tree was already off-root).

**Gate — engine-free, PROVEN:**
- `dist/motion-core.js` (5.86 KiB / 2.19 KiB gz): `grep keyframes` → 0, `grep vueuse` → 0, no
  static heavy-peer imports at all (self-contained).
- `dist/motion.js`: keyframes present (engine stays on `/motion`).
- `verify-export-types` → "All package export targets and type resolutions are valid" (incl
  `/motion-core`); `proof:resolution` PASS; `proof:package` packed-fixture resolves `/motion-core`.
- inv 47: `src/composables/motion/index.ts` re-exports NONE of the six relocated symbols (the grep
  hits are comments).
- The carve's relocation broke five internal call sites (demo stories + two `__tests__` + the
  surface-manifest spec) that imported the free leaves from the `/motion` BARREL — all renamed to
  `/motion-core` (and the manifest's `installDarkModeSync` moved to `/dark`), per inv 47. The
  surface-contract spec now asserts the new homes. `vitest` 523/523.

speedtest's exact migration: `useAuroraPolicy`'s `useIntersectionPause` import renames
`/motion` → `/motion-core`. That single rename moves it off the engine.

## R0G-6 — the DockIconButton 44px coarse-pointer floor (orchestrator-overridden shape)

W1.2 §B.2 PROVED the v1.4.0 coarse floor (`dock.css` `.glass-dock { --dock-control-size: 2.75rem }`,
specificity (0,1,0)) is SHADOWED by the always-present density selector
`.glass-dock[data-density="comfortable"]` ((0,2,0), GlassDock defaults `density="comfortable"` and
renders `data-density`) — both in `@layer components`, so the density setter wins → the button
resolves 2.5rem/40px on coarse. That is the measured 40×40.

**The orchestrator OVERRODE W1.2's `::before` hit-area shape** with a cleaner fix: a `::before`
expands the hit area but does NOT lift the button's `getBoundingClientRect` box (it would risk
failing the "rendered box ≥44px" gate). Instead, **raise the coarse floor's specificity to win**:
change the coarse block selector from `.glass-dock` to `.glass-dock[data-density]` (attribute-
presence, (0,2,0) — IDENTICAL to the density setters, so it wins by SOURCE ORDER since the coarse
block is later). This lifts `--dock-control-size` to 2.75rem/44px on coarse, which BOTH the button
box AND the dock width-math read → the button measures 44px AND the dock reserves 44px slots (no
overflow), AND every dock control gets the floor.

**Gate:** the built `dist/styles/dock.css` carries `@media (pointer: coarse){ .glass-dock[data-density]{ --dock-control-size: var(--dock-touch-target,2.75rem) … } }`. Verified the only
`--dock-control-size` SETTERS are the four density blocks (all (0,2,0)) + this block (now (0,2,0),
later) — none at >(0,2,0), so it cannot be re-shadowed. Fine-pointer rendering byte-identical (the
whole block is inside `@media (pointer: coarse)`).

## T3 — the aurora suspend-source set (control-flow derivation; a correctness fix, not a byte play)

`runtime.ts`: the `running` boolean is replaced by a `Set<SuspendReason>`
(`"tab-hidden"|"off-screen"|"manual"`); the loop runs IFF the set is empty (`isRunning()=size===0`).
`suspend(reason)`/`resume(reason)` add/remove a reason key and toggle the RAF only on the
empty↔non-empty transition. The `visibilitychange` listener is lifted out of `arm()` to own ONLY
`"tab-hidden"`; the wrapper's `useIntersectionPause` (`pauseWhenHidden:false`, so the runtime is the
sole visibility owner) owns `"off-screen"`; the public pause/resume use `"manual"`. The two
visibility-reconciliation comment blocks retired.

**Gate — resume-while-suspended structurally unreachable (4-step trace):** off-screen →
`{off-screen}`; tab away → `{off-screen, tab-hidden}`; tab back → `resume("tab-hidden")` →
`{off-screen}`, `isRunning()` still false so the RAF stays parked; only `resume("off-screen")`
empties the set. A reason-keyed resume cannot clear a reason it did not set. `prefers-reduced-motion`
still draws one static frame then parks (`reducedMotion` is NOT a suspend reason — the gate in
`needsAnimation`/`tick` is untouched). `drawFrame` / the WebGL draw is BYTE-IDENTICAL (0 draw-line
diffs) — T3 is control-flow only.

## DockLayerGroup vertical-overflow — CONFIRMED BUG, fixed (correctness, not promotion)

The investigation confirmed a real primitive defect: `.dock-layer-stack` + `useLayerTransition` are
axis-aware, but `.dock-layer-item-host` was hardcoded to a centered no-wrap ROW with
`width: max-content` and no vertical analogue — forcing a `vertical` group's content onto one
horizontal line that could not grow down (BETA's "vertical overflow fight" that made bbnf-buddy's
`LeftToolsDock` tear out the grid chain). Fixed minimally: `.dock-layer-group.vertical
.dock-layer-item-host` stacks in a column, stretches cross-axis, wraps; `.is-active` block-sizes to
the height the stack animates. Horizontal groups byte-identical. This is correctness — the
1-consumer panel-host pattern stays watched (J inv 10; AP promotes nothing), but a confirmed bug in
the existing multi-layer grid is independently AP-eligible.

## Gate matrix

| Gate | Status | Evidence |
|---|---|---|
| `typecheck` + `build` exit 0 | MET | 0 errors; build ok; `dist/motion-core.{js,d.ts}` emitted |
| R0G-7 engine-free + no-alias | MET | motion-core 0 keyframes/0 vueuse; motion has keyframes; `verify-export-types` green; inv 47 grep clean |
| R0G-6 44px floor on the rendered box, fine-pointer unchanged | MET | `.glass-dock[data-density]` wins; button + dock-math read `--dock-control-size`; `@media coarse` isolated |
| T3 resume-while-suspended unreachable; `drawFrame` byte-identical | MET | 4-step trace; 0 draw-line diffs; reduced-motion gate untouched |
| DockLayerGroup investigation recorded with disposition | MET | confirmed bug, fixed; horizontal byte-identical |
| Tests green | MET | `vitest` 523/523 |
| Proofs | MET | `proof:resolution`/`proof:package`/`proof:runtime`/`proof:theme` pass |
| Budget | MET | CSS draw 75303 gz / 91.3% (the +308 vs baseline is the real R0G-6+DockLayerGroup rules); `dist/motion-core.js` 2.19 KiB [NEW] — W4 adopts the D5 baseline |

## Notes for W4 / W5

- `dist/motion-core.js` is a [NEW] entry chunk with no D5 drift baseline — W4 (which owns the D5
  baseline split) adopts it into the committed baseline.
- The pre-existing dirty proof-baseline JSONs (`docs/tranches/F/audit/*.json` etc.) + the precepts
  submodule are untouched by W3 — they are the ι-sweep's concern at W5.
