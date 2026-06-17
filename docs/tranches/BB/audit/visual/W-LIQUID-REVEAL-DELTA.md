# W-LIQUID-REVEAL — DELTA (the iOS-27 bloom-from-source liquid open)

**Wave**: BB.W-LIQUID-REVEAL
**Capture date**: 2026-06-17 (authored at impl; the binding live-π capture rides W-REFLECT3 on a real-GPU/CDP dev-box per the AY W-LIVE1 split)
**HEAD sha at authorship**: 2928da41 (BB.W-METAL-SHIMMER) + this wave
**Dev-box / origin**: the `:5199` demo vite server (`tests-visual/liquid-reveal.spec.ts`, both Playwright projects)

## The charge (re-grounded at HEAD)

glass-ui owned every INGREDIENT of the iOS-27 liquid app-open / control-centre bloom and composed NONE into the headline primitive:

- the kf `flipShared` + `springTimingFunction` + `ElementMorph` substrate ships UNCONSUMED on the `/motion` surface (`suite.ts:41,42,52`, ZERO glass-ui consumer — the J-inv-10 substrate-without-consumer state);
- the reka portaled overlays (Dialog/Popover/Tooltip/HoverCard/DropdownMenu/ContextMenu/Combobox/Select + the custom HoverPopover) all rode `popover-animate` (`utilities/animate.css:10-15`) — a fixed-bezier `zoom-in-95` + `fade-in-0` over the SAME `--duration-normal` wall clock for every surface ("presses spring, reveals don't");
- the native `.glass-top-layer` `@starting-style` grammar threaded `--spring-bouncy` + `--spring-bouncy-duration` (W-GLASS-CAL Unit 3) but had NO blur-settle decongest (the iOS "light-bending modulation" arrival), and the reka overlays did NOT ride it (the dialect split was live);
- the dock collapsed→expanded morph had no coupled bloom beat.

## The fix (this wave is the ACTIVATING consumer — wiring, not a net-new engine)

### `useLiquidReveal` (the source-rect bloom leaf — `/motion`, keyframes-bearing)
`src/composables/motion/useLiquidReveal.ts`. Composes the dormant kf `ElementMorph` (the core `flipShared` wraps — the §scope-1-sanctioned "equivalent forward ElementMorph over the trigger→surface rect delta") + `springTimingFunction({response, dampingFraction})` (the typed `{fn, css}` pair, sampled from the SAME `SPRING_PRESETS` row the `--spring-*` CSS tokens generate from — never a hand `(response, ζ)`). The bloom is the FLIP INVERSION: `ElementMorph(settledRect, triggerRect)` driven by the spring curve from 1 (looks like the trigger — small, offset to the source) to 0 (identity — the settled rect), with `transform-origin` anchored at the trigger so the surface scales FROM the source point (the control-centre feel), NOT a center-scale. THREE coupled channels — `transform` (the bloom, SPATIAL, the spring overshoot interior), `opacity 0→1` (EFFECTS, coupled), `filter: blur(4px)→0` (the light-bending decongest on the surface's OWN pixels — NOT `backdrop-filter`, so the resting glass-tier plate blur is never clobbered). COMPOSITOR-ONLY (transform/opacity/filter, never a layout property — the W-MOTION-CANON `proof:no-layout-animation` floor). PRM-snap (under reduce: snap to settled identity + opacity 1 in ONE step, zero transform/blur frames, the fade survives). Published on `@mkbabb/glass-ui/motion` (the SCC-trap discipline — keyframes-bearing, never the root barrel). Mirrors the `useDragMorph` sibling shape exactly.

### `.glass-reveal` (the zero-JS LIQUID-ENTER recipe — the top-layer default)
`src/styles/glass/reveal.css` (`@import`-ed in `glass.css` cascade order, own `@layer components`). The spring-clocked data-state recipe the reka portaled overlays compose (they cannot ride `@starting-style`). The SPATIAL legs (scale/translate) ride `--spring-snappy` + `--spring-snappy-duration` (the per-spring clock — NOT the generic `--duration-normal` that re-timed every spring to one wall clock); the EFFECTS legs (opacity/filter blur-settle) ride the no-overshoot `--ease-out`. `transform-origin: var(--reka-popper-transform-origin, center)` so it blooms from the popper anchor edge. `data-[state=open]` → the bloomed-in state; `data-[state=closed]` → the EXIT leg (`--ease-out`, NO `--spring-*` token — a closing surface must not overshoot past gone, §6/W-MOTION-CANON P2). The directional `slide-in-from-side` folds onto `.glass-reveal`'s `data-side` compositor `translate` leg. The BASE never writes `translate`, so a center-anchored Dialog keeping its `-translate-x-1/2 -translate-y-1/2` centering is never clobbered. PRM carve: zeroes `scale`/`translate`/`filter`, keeps the opacity fade.

### `.glass-top-layer` blur-settle (the native top-layer light-bending decongest)
`src/styles/animations.css` — the `@supports (overlay: auto)` enter gains a coupled `filter: blur(--top-layer-enter-blur)` → `blur(0)` on the SAME `--spring-bouncy` clock the scale rides (the `filter` on the surface's own pixels, so the resting glass plate `backdrop-filter` survives). The `@starting-style` interpolates from the blurred value.

### `popover-animate` RETIRED (clean break, no alias — BB inv-7)
`src/styles/utilities/animate.css` — the `@utility popover-animate` (the bezier zoom-95) AND `@utility slide-in-from-side` are DELETED. The ≥9 enrolled surfaces re-point onto `.glass-reveal`: DialogContent (default path), PopoverContent (×2), TooltipContent, HoverCardContent, DropdownMenuContent, DropdownMenuSubContent, ContextMenuContent, ContextMenuSubContent, ComboboxList, SelectContent, HoverPopover (the custom 11th). ZERO live `popover-animate` consumer remains.

### The dock-expand bloom beat (DOCK-EXPAND-CONSUMER)
`src/styles/dock/morph.css` — a coupled `filter: blur(--dock-reveal-blur * (1 - --dock-expand-t))` decongest reading the SAME `--dock-expand-t` directional scalar W-DOCK-MORPH-FAMILY owns (the morph mechanism is UNTOUCHED — a SURFACE arm, not a morph-axis edit). Collapsed = blurred, expanded = clear, so the dock pill blooms open. PRM zeroes `--dock-reveal-blur`. NO `dockMorphContext.ts` edit (the 575 baseline held — the `--dock-expand-t` scalar is already written purely in CSS).

### The Dialog `spring` reconcile (preserved)
`DialogContent.vue` — the `spring` opt-in's `useSpringMount` drag-dismiss entrance is UNTOUCHED (a legitimate iOS-physics variant). When `spring` is set the inline transform suppresses `.glass-reveal`; when unset the default path composes `.glass-reveal`. No second drag-dismiss engine; the `useSpringMount` `position`/re-target machinery is byte-untouched.

## The π binding readback (clause 6 — LOCAL-ONLY, rides W-REFLECT3)

`tests-visual/liquid-reveal.spec.ts` (enrolled-by-disk in the visual runner, both Playwright projects, `:5199` origin):

- **(a) bloom frame-series** — `/containers/popover` + `/containers/dialog` + `/dock/overview`: at t≈60ms the surface is mid-bloom (scale < 1, blurred, opacity ramping); at t≈450ms it is settled (scale identity, opacity > 0.95, blur cleared). The resolved `transitionTimingFunction` names the spring `linear()` curve, NOT a tw-animate-css `animation` keyframe. `data-side` slide for the side-anchored popovers; center-scale for the Dialog.
- **(b) ≥9-surface rendered enter** — each enrolled surface carries `.glass-reveal` and NOT `popover-animate` (asserted on the resolved className + the spring transition), captured over the live backdrop, BOTH modes.
- **(c) PRM single-paint** — under `emulateMedia({reducedMotion: "reduce"})` the open is a single-paint fade: `scale` resolves `none`/`1` (no in-between transform frame), `filter` carries `blur(0)`/`none` (no blur frame), the opacity fade survives.

Capture files: `liquid-reveal-popover-open-{mobile,desktop}.png`, `liquid-reveal-dialog-{light,dark}-{mobile,desktop}.png`, `liquid-reveal-dock-expand-{mobile,desktop}.png`, `liquid-reveal-popover-prm-{mobile,desktop}.png`.

## The `proof:ba-gestalt` overlay-band verdict (clause 7)

The whole overlay band (Dialog/Popover/Menu/Command/Tooltip blooming open over their real backdrop + the dock expand) is judged whole-page, both modes, at W-REFLECT3: "does the chrome OPEN as liquid glass — blooming from source, coupled fade + light-bending settle, springy + quick — as a page?" Per-mechanism R1-R5 greens do NOT close this visual wave alone; the gestalt verdict must be operative-PASS. **VERDICT: deferred to W-REFLECT3 (the authorized verdict-flipper) on a fresh capture.**

## Gate evidence

`scripts/proof-liquid-reveal.mjs` — born-RED (26 clauses) at HEAD pre-wave → GREEN (R1-R5 + the inline self-test bite). Sibling motion gates stay GREEN: `proof:no-layout-animation` (44 keyframes + 235 transition legs + 33 `<Transition>` legs, 0 off-allowlist), `proof:animation-coherence` (one motion source), `proof:spring-tokens-synced` (0 stale). `npm run typecheck` clean; `tests/components/ui/dialog/dialog-spring.test.ts` updated for the clean break (4/4 pass).
