# BC codebase deep-audit — glass primitives · dock · tabs (current state)

Branch `tranche/BB`, live demo `:5199` (confirmed up, GPU-capable). Every finding below is grounded in a file:line OR a live `getComputedStyle`/`getBoundingClientRect` measurement taken 2026-06-18. The headline: **the BB source is architecturally sophisticated — it is NOT a naive flat reimplementation** — but a handful of root mechanisms produce the visual breaks the user reported. Two of the most-cited defects (grey-slab, transition:all) are PARTIALLY mis-stated in DEFECT-LEDGER; the real roots are pinned here.

---

## PART 1 — GLASS

### 1.1 The grey-slab is ALREADY FIXED at the content-tier floor (the e1b4b44c pre-fix landed)

The DEFECT-LEDGER D1 grey-slab root (unconditional 20%-AA darken) **has been pre-fixed in source**. Live probe of a real glass card at `/display/card`:
- card bg = `oklab(0.934369 0.00151814 0.00643545 / 0.664)` — a **warm-cream plate at L 0.934, 66% alpha** (NOT grey).
- `--glass-tint-strength` resolves **`4%`** at root (the sub-perceptual floor), NOT 20%.

Roots, in source:
- `src/styles/glass/ladder.css:253-258` — the content-tier `:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)` block now sets `--glass-tint-strength: var(--glass-tint-strength-floor)` (4%), with the inline `BC.W-AUDIT` comment recording the scope-7 completion.
- `src/styles/glass/ladder.css:212-222` — the overlay band `:where(.glass-floating,.glass-overlay)` ALSO joined the floor (`--glass-tint-strength-floor`), with the full-AA darken moved to the `@container style(--glass-backdrop: light)` bucket only (`ladder.css:146-164`).
- `src/styles/dock/morph.css:428-441` — the dock `:where(.glass-dock)` joined the floor too.

**BC consequence:** the grey-slab ROOT is closed; BC.W-GLASS-IDENTITY should VERIFY-and-harden (not re-fix), and own the remaining grey reads which are now (a) the **busy-aurora-behind-translucent-cream** read (a 66%-α cream over a colored field reads desaturated-grey on some backdrops) and (b) the bright-bucket darken which still snaps to 20% AA when the (currently-dead) observer or a consumer engages it. The token to re-examine: `--glass-tint-strength-floor` (4%) vs `--glass-tint-strength-aa` (20%) — live values confirmed.

### 1.2 THE BLACK BAR (D2) — the per-rung border is a dark warm-ink hairline (LIVE-GROUNDED)

This is **the live root of "wtf is this black bar."** Live probe, same card:
- `border-top-color` = **`oklab(0.216128 0.00350075 0.00518669 / 0.16)`** — a dark warm-ink at **L 0.216, 16% alpha**, 1px.
- It resolves from `--glass-border-quiet` = `color-mix(in srgb, light-dark(hsl(24 10% 10%), …) 13%, transparent)` (`tokens/glass.css:192`), where `--foreground: hsl(24 10% 10%)` is the warm-DARK ink (oklab L 0.216).

The mechanism: `tokens/glass.css:191-196` authors the per-rung borders as `color-mix(in srgb, var(--foreground) 11-22%, transparent)` — the BA.W-NO-GRAY "warm rim that carves the silhouette" device. But `--foreground` is the near-black warm ink, so over a near-white cream plate the **full-perimeter border reads as a dark hairline**, worst at the TOP edge where the white `--glass-material-rim` catch-light (`inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)`, `glass/rim.css:74`) sits just inside it — the dark-border-over-white-catch-light contrast IS the black bar. Confirmed live: `boxShadow` carries `oklab(0.999994 … / 0.18) 0px 0px 0px 0.75px inset` (the white rim) AND the dark `border-top`.

**BC root-fix (Band 1, the D2 home):** the iOS-27 rim is a LIGHT catch-light, not a dark ink hairline. Either (a) re-point `--glass-border-*` to read the WHITE/light edge-light register (the rim already speaks `--glass-edge-light` = `hsl(0 0% 100% / 0.18)`), making the silhouette a bright highlight not a dark rim, OR (b) gradient the border so the TOP carries the light catch-light and the BOTTOM the warm under-shadow (the real glass-thickness model — light rims the top, shadow the bottom). The BA.W-NO-GRAY "warm rim carves the silhouette" intent is preserved by the under-shadow, NOT the top border.

### 1.3 The adaptive observer is DECORATIVE — confirmed by live probe (BC.W-ADAPTIVE-RECONCILE)

Two-part finding, both grounded:

**(a) `--glass-backdrop-luma` has ZERO CSS consumers.** `grep -rn 'var(--glass-backdrop-luma' src/` → exit 1 (empty). The token is WRITTEN at `src/composables/glass/useGlassBackdropLuminance.ts:311` (`el.style.setProperty("--glass-backdrop-luma", value.toFixed(3))`) and declared at `tokens/glass-fx.css:123` (`--glass-backdrop-luma: ;`) but no `.css` rule reads it. The composable's own header (`useGlassBackdropLuminance.ts:31`) even calls it "its FIRST real consumer" — but that consumer never materialized. It is a pure write-with-no-reader = decorative.

**(b) The observer NEVER FIRES on the live dock.** Live probe of the dock root inline style at `/dock/overview`: `style="view-transition-name: glass-dock-v-0;"` — and `dock.style.getPropertyValue('--glass-backdrop-luma')` = `""`, `dock.style.getPropertyValue('--glass-backdrop')` = `""`. The observer is wired ON by default (`GlassDock.vue:77-81`), but writes NEITHER the luma NOR the discrete bucket inline. The bucket value the dock reads (`--glass-backdrop: light`) is the STATIC `:root`-less default from `shell.css:78`, NOT observer-derived. Root cause candidates (in `useGlassBackdropLuminance.ts:161-184` `sampleStatic`): the dock floats over the aurora `<canvas>` which is transparent-walked, so `elementsFromPoint` finds no opaque backdrop layer (`rgba[3] < 0.5` → skip, line 175), falls to `body` luminance, OR the IntersectionObserver gate parks it before the mount sample. Either way: the live dynamic darken the user asked for ("darken DYNAMICALLY like iOS 27 so we can actually see these elements") DOES NOT HAPPEN.

**BC root-fix (Band 1):** close the loop. Two real moves: (1) make `--glass-backdrop-luma` LOAD-BEARING — drive a CONTINUOUS `--glass-tint-strength` off it (`calc(...)` interpolating floor→AA as luma rises) instead of the discrete light/dark bucket, so the darken tracks the field continuously (the iOS-27 model); (2) FIX the sample so it actually fires over the aurora canvas — the animated-canvas `drawImage+getImageData` path (`sampleAnimated`, line 100) is the correct one for a dock-over-aurora but requires `backgroundCanvas` to be passed (`GlassDock.vue:79` passes `props.backgroundCanvas ?? null` — and the DockStage demos never pass it, so the dock falls to the dead static path). Either pass the aurora canvas through, or (better) sample the COMPOSITED region via a periodic `html2canvas`-free DOM read. This is the single highest-value Band-1 wave.

### 1.4 The glass-duplication census — FOUR overlapping registers (BC.W-GLASS-PRUNE)

The user's "why so many glass duplicates? prune to Glass CARDS + Glass MATERIALS." The census, grounded:

| register | home | what it is | overlap |
|---|---|---|---|
| **The 5-rung ladder** | `glass/ladder.css:41-125` (`.glass-{wash,quiet,resting,floating,overlay}`) | the MATERIAL — bg/blur/border/rim per rung | the canonical material |
| **`.glass-material` atom** | `glass/material.css:36-49` | the shared `::before` specular + rim wiring across all rungs + Card + dock controls | composes WITH the ladder (not a dup, but a 3rd selector group) |
| **`<GlassPanel>`** | `custom/glass-panel/GlassPanel.vue` | a PARALLEL COMPONENT that re-implements the 5-rung ladder via `VARIANT_CLASS` (maps `wash→glass-wash` etc) PLUS its own `--svg`/`--fallback` branches + an svg-filter renderer (`useGlassRenderer`) | **TRUE DUPLICATE of Card** — it has `variant` (the 5-rung), `tier` (the renderer), AND `surface` ({glass·veil·opaque}); Card has tier+surface. GlassPanel adds the svg-displacement filter Card lacks. |
| **`<Card>`** | `ui/card/Card.vue` | the tier-aware glass card (tier maps to `.glass-{rung}`, surface decoration via `surfaceClass`) | the canonical CARD |
| **The surface-axis** | `glass/surface-axis.css` + `_shared/useSurfaceAxis.ts` | the {glass·veil·opaque} DECORATION axis, threaded through 11 surfaces | orthogonal axis, NOT a dup, but adds 2 more selectors (`[data-surface=veil]`/`[data-surface=opaque]`) |
| **`.glass-deep`** | `glass/deep.css` + `tokens/glass-deep.css` | the OPT-IN maximal-iOS tier (16px blur, saturate 1.5) | a 6th blur family the ladder never reads |
| **`.glass-lens`/`.glass-refract`** | `glass/material.css:287-299` (the swell retired) + glass-refract.css | the SVG displacement refraction axis | a 7th axis (currently baked, the `:active` swell retired DDR-LENS-BAKE) |

**The prune to Glass CARDS + Glass MATERIALS:**
- **Glass MATERIALS** = the `.glass-{rung}` ladder (the 5 rungs) + the `.glass-material` atom (specular/rim) + deep + lens as TIER/AXIS modifiers of the ONE material. This is the `/substrates/glass-panel` surface — it demonstrates the MATERIAL.
- **Glass CARDS** = `<Card>` (the component that wraps a material in a card chassis with padding/header/footer). 
- **RETIRE `<GlassPanel>`** onto `<Card>` + the material — its only unique facility is the `useGlassRenderer` svg-displacement filter, which is the `.glass-lens`/`.glass-refract` axis already; fold the svg renderer onto the material's refract axis. `/substrates/glass-panel` becomes the MATERIALS gallery (the 5 rungs + the axes), distinct from `/display/card` (the CARDS gallery). This is a clean break (no alias — `GlassPanel` consumers re-point to `<Card>` or the bare `.glass-{rung}` class). The 11 surface-axis enrollees stay (the decoration axis is correct); the `surface` prop sprawl (GlassPanel has variant+tier+surface) collapses to the Card grammar (tier+surface).

### 1.5 The dialog IS glassy in source — it reads muddy over the grey, not flat

Live source read (`DialogContent.vue:106` `variantClasses`): the dialog composes `surfaceClass(props.surface, 'floating')` = `.glass-floating` (the 80%-α heavy-blur tier) + `.glass-reveal` (the liquid-enter recipe) — it IS the glass register. The user's "NOT glassy at all" is a COMPOSITE read: (a) the overlay band's bright-bucket darken (if engaged) greys it, (b) `floating` at 80% α is the LEAST transparent ladder rung (the modal wants MORE transparency per the user, not less), (c) the dark border-bar (1.2) rings it. **BC.W-DIALOG-GLASS:** drop the dialog to a MORE-transparent tier (the iOS-27 control-center modal is ~60% not 80%), kill the dark rim (1.2), and ensure the overlay band does NOT auto-darken over the (unknown but usually content-light) backdrop unless the observer says bright. The `surface="glass"` default + `.glass-reveal` are correct; the TIER and the rim are the fix.

### 1.6 Button glass-morphism (BC.W-BUTTON-GLASS-IOS)

`tokens/glass.css:118-127` — the glass-variant buttons already lift onto `--glass-blur-btn` (8px quiet-tier blur + saturate 1.05 brightness 1.02). The user wants MORE. The lever is the new `.glass-deep` tier (`tokens/glass-deep.css`, 16px/saturate 1.5) — route the hero CTA buttons (`default`/`primary-audacious`) onto a deep-glass press register. The press machinery (`useSpringPress` + `--glass-btn-press-t`) is already wired (`Button.vue` is consumer #1). The increase is a tier swap + the rim→catch-light fix from 1.2.

---

## PART 2 — DOCK

### 2.1 The "transition:all" jank root is MIS-STATED — the source is already compositor-bound

`grep -rn 'transition:\s*all\|transition-property:\s*all' src/ demo/` → **EMPTY**. There is NO `transition: all` anywhere. The DEFECT-LEDGER D3 claim is imprecise. The actual morph mechanism (`morph.css` + `layers.css`) is **already a single-scalar compositor transform**:
- `layers.css:59-74` — the box morph is `transform: scaleX(var(--dock-morph-scale))` over a RESERVED `inline-size: var(--dock-morph-to)` footprint (ONE layout solve, NOT a per-frame lerp), `will-change: transform`. The CDP Layout track is flat by design.
- `morph.css:79-84` — the chrome morphs off `--dock-expand-t` (a registered scalar), NOT a CSS transition.

**So the dock morph is NOT janky for the reason claimed.** The real jank/blur roots (below) are different and BC must target THEM, not a phantom `transition: all`.

### 2.2 The morph-WHITE / morph-invisible root (D5) — scaleX(0) on a `to:0` measurement

`layers.css:61-71`: `--dock-morph-ratio = from / max(to, 1px)`, `--dock-morph-scale = ratio + (1-ratio)·t`. When the measured `--dock-morph-to` is **0** (the BA-VJS-1 nested-group bug where the outer `.dock-layers` measured the inner stack still pinned collapsed — documented in CLAUDE.md as `from:40 → to:≈242, never 0` but the guard is `max(to,1px)`), the scale runs `scaleX(0)` at `t=0` → **the box is invisible (zero-width) = the "white/invisible" morph.** The `max(to,1px)` guard prevents a divide-by-zero but `scaleX(near-0)` still paints nothing. Combined with `overflow: clip` (shell.css:179) the content behind the zero-width aperture is fully clipped = a white/empty box mid-morph.

**BC.W-LIQUID-MORPH root-fix:** (1) the measurement-ordering fix (CLAUDE.md says it landed via `dockMorphContext.onSwap` forcing nested `max-content` — VERIFY it actually fires on the live nested docks, since the user still reports white morph); (2) a floor on the scale (`max(scale, 0.05)`) so a degenerate measurement never paints a zero-width box; (3) the morph-bridge.css teardrop (the V↔H showcase) animates `width`/`height` PER FRAME (`morph-bridge.css:91-113`) — that IS layout-triggering jank, but it's the perf-gated preview (not the default VT crossfade). For the arbitrary-shape morph the user wants, this needs the clip-path/scale approach, never per-frame width.

### 2.3 The vertical-dock click-deadness (D — "ENTIRE vertical dock NOT CLICKABLE")

Root candidates, grounded:
- `GlassDock.vue:435-437` — the `dock-layer--full` carries `:inert="!expanded || undefined"`. The `inert` reads the RAW `expanded` ref, NOT `visualExpanded`. For a collapsible vertical dock where `expanded` is false but a control should still be reachable (or during the morph window where `expanded` lags `visualExpanded`), the full layer is `inert` → every control inside is non-interactive. The `--summary` layer carries the inverse `:inert="expanded"`.
- `layers.css:170-175` — an inactive layer (`:not(.is-active):not(.is-leaving)`) gets `pointer-events: none` + `visibility: hidden`. If the vertical dock's `visualExpanded` computes wrong (e.g. `always-expanded` not set but `startCollapsed` true, so the full layer is `.is-active: false`), the full pane is pointer-dead.
- `layers.css:86-92` — the vertical morph does `scaleY(var(--dock-morph-scale))` with `transform-origin: center top`. A `scaleY` near 0 collapses the clickable area to a sliver even though the layer is technically active.

The live probe at `/dock/overview` showed the SidebarDock (vertical) renders `59x631` and visible, NOT collapsed — so the deadness is likely STATE-dependent (a collapsed vertical dock, or one mid-morph) rather than always-on. **BC.W-DOCK-VERTICAL-FIX** must: (1) gate `inert` on `visualExpanded` not `expanded`; (2) ensure a vertical dock's active layer is never `scaleY(0)`/`pointer-events:none` while a control should be live; (3) live-verify click integrity on a COLLAPSED vertical dock (tap-to-expand-then-click — the `useDockClickIntegrity` + `useTouchGate` path, `GlassDock.vue:299-324`).

### 2.4 The shrunken-dock-is-a-blurry-mess (D — "when SHRUNKEN it's a blurry mess")

Two stacked blur sources on a collapsed dock:
- `morph.css:79-84` — the dock carries a RESTING decongest `filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t,1))))`, `--dock-reveal-blur: 3px`. At `--dock-expand-t: 0` (collapsed) this is `blur(3px)` on the dock's OWN pixels (the W-LIQUID-REVEAL bloom). A COLLAPSED (resting) dock therefore carries a 3px self-blur permanently — the "blurry mess" when shrunken. The PRM bracket zeros it (`morph.css:487-491`) but at rest non-PRM it's live.
- `shell.css:149` + `tokens/glass.css:92` — the `backdrop-filter: blur(9px)` on the dock plate.

Combined: a small collapsed pill (live `59px` wide) carrying a 3px content-blur + 9px backdrop-blur reads muddy. **BC.W-DOCK-SHRINK-BLUR:** the resting decongest blur should be ZERO at the collapsed endpoint (it's meant to be a TRANSIENT bloom-in, not a resting state) — gate `--dock-reveal-blur` to only apply during `[data-morphing]`, OR drop it to ~1px at rest. The `--dock-expand-t: 0` collapsed state should be CRISP.

### 2.5 The rail (D — "the rail = macOS hover-expand stack")

`rail-extend.css` + `GlassDock.vue:354-462`: the rail is a SIBLING of `.glass-dock` inside `.glass-dock-frame` (escaping `contain: paint`). The current rail is a divider-seam hairline + chip strip (`<DockRail>`/`<DockSection>`). The user wants the **macOS hover-expand STACK** — extend-beyond, hover-expand, 3-configurable, scrollable, n-stack. The current rail is the divider-seam re-conception (BA.W-DOCK-SECTIONS), NOT the macOS stack. **BC.W-DOCK-STACK-RAIL** is a from-scratch rail rebuild (the hover-expand dock-icon stack), distinct from the current hairline-rail. The `.glass-dock-frame` escape mechanism (the non-clipping positioning context) is the correct chassis to build on — that part stays.

### 2.6 The black-bar on the dock (recurs from 1.2)

The dock border is `border: 1.5px solid var(--glass-border-dock, var(--glass-border-resting))` (`shell.css:150`), `--glass-border-dock = color-mix(in srgb, var(--foreground) 14%, transparent)` (`tokens/glass.css:196`) — the SAME dark-warm-ink hairline as the card (1.2). The dock's top edge reads as a dark bar for the identical reason. The fix is the same rim→catch-light fix.

---

## PART 3 — TABS

### 3.1 The squared-pills (D — "PROPER SMALL PILLS, not squared")

Live probe at `/navigation/tabs`:
- track `border-radius: 8px`, indicator `border-radius: 6px`.
- Source: `segmented-tabs.css:38-39` — `--bouncy-track-radius: 0.4375rem` (7px), `--bouncy-slider-radius: 0.3125rem` (5px), bumped to 8px/6px at the `min-width:640px` breakpoint.

A 6px-radius indicator on a ~28-32px-tall pill reads as a ROUNDED-RECTANGLE, not an iOS pill. iOS-27 segmented pills are near-stadium (radius ≈ half the height). **BC.W-TABS-IOS:** the indicator radius should be `var(--radius-pill)` (9999px, capped to half-height) for the iOS register, OR a much larger fixed radius (~half the track height). The track radius should follow. The user's reference ("like the current value.js demo") is near-stadium pills.

### 3.2 The active pill barely differentiates — low-contrast glass (D — "all glassy, NOT reka/shadcn-like")

Live probe:
- track bg = `color(srgb 0.9844 0.97288 0.9556 / 0.5)` — warm-cream at 50% α.
- indicator bg = `color(srgb 0.9844 0.97288 0.9556 / 0.8)` — the **SAME warm-cream hue at 80% α**.

The active pill is the same hue, only +30% alpha → over a glass content tier the differentiation is **barely perceptible** (a faint brightness step). This is why it reads "not glassy / reka-like" — there's no clear material FORWARD-ness. Source: `segmented-tabs.css:48` (track `--glass-bg-quiet`) + `segmented-tabs.css:80` (indicator `--glass-bg-floating`). Both are the warm-cream ladder rungs.

**BC.W-TABS-IOS / W-LIQUID-TAB:** the iOS-27 selected pill reads as a DISTINCT lifted glass plate — it needs a real material step (a brighter/whiter fill + a stronger catch-light rim + the under-shadow that lifts it OFF the track), not a +30%-alpha-same-hue. The W-REGISTER-IOS "selected reads as glass" model is right in principle but the floating-over-quiet delta is too small. Pair it with the deep-glass tier (1.6) for the selected plate.

### 3.3 The abrupt spring (D — "the springs too slow" / UNDERLINE-TUNE "spring curve EASED, not abrupt")

Grounded in the token: `--spring-snappy` (`scheme-motion.css:221`) is a `linear()` curve that **hits 1.0 by 12.245% and PEAKS at 1.068 (16.327%)**, then settles to a dead-flat `1.00000` from ~46% onward. The `--tab-indicator-duration = --spring-snappy-duration = 0.34s` (`scale-paper.css:61`, `scheme-motion.css:243`). 

So the perceptual motion COMPLETES in ~16% × 0.34s ≈ **55ms** (the curve reaches its peak), then runs DEAD-FLAT for the remaining ~285ms. Result: the indicator SNAPS to position in 55ms and the 0.34s clock is wasted tail — reading as an ABRUPT jump, NOT a smooth glide. The squish (`useTabIndicator.ts`, `INDICATOR_RELEASE_AT_ARRIVAL = 0.82`, `constants.ts:23`) releases at 82% of the clock (~280ms) — so the squish lingers AFTER the position has snapped (a desync: position done at 55ms, squish releasing at 280ms).

**BC.W-UNDERLINE-TUNE / W-SPRING-EASE:** the indicator needs a curve whose perceptual travel fills MORE of the clock — either a slower `--spring-snappy` (a lower ζ that overshoots-and-settles over the whole 340ms) OR a shorter clock matched to the 55ms travel (~120ms). The user wants "squishy/quick/coupled-fade, eased not abrupt" — the right answer is a spring whose POSITION and SQUISH both fill the same window (the desync is the abruptness). The value.js/keyframes.js spring should be re-derived so the 2%-settle clock matches the perceptual-travel time (the W-GLASS-CAL per-spring-clock generator at `scripts/regen-spring-tokens.mjs` is the home).

### 3.4 The liquid-tab pull-morph (D — "pull an active tab → morphs, squishes, to location")

`SegmentedTabs.vue:34` imports `useTabDragMorph` (the BB.W-DRAG-MORPH `:draggable` axis). The mechanism exists (`useDragMorph` composing kf `Draggable` + `useLiquidFlex`) but it's ADDITIVE default-OFF (`draggable` prop defaults false). The user wants the iOS-27 pull-morph as the DEFAULT tab interaction. **BC.W-LIQUID-TAB:** wire `:draggable` ON for the pill tabs by default (or make the pull the primary affordance), and verify the squish reads (the `--tab-indicator-max-stretch: 1.08` cap is LOW per `constants.ts` — the user wants a visible gel-squish, so the cap may need lifting to ~1.15).

---

## CROSS-CUTTING ROOT SUMMARY (for the planning iterations)

1. **The dark warm-ink border** (`--glass-border-* = color-mix(--foreground N%, transparent)`) is the SINGLE root of the "black bar" on BOTH cards AND docks (`tokens/glass.css:191-196`). Fix once → fixes D2 everywhere. The rim should be a LIGHT catch-light (top) + warm under-shadow (bottom), not a dark full-perimeter hairline.
2. **The grey-slab is closed** at the 4% floor; the residual grey is the cream-over-busy-aurora read + the dead observer. Verify-and-harden, don't re-fix.
3. **The adaptive observer is dead** (luma unread + never fires) — close the loop with a CONTINUOUS luma→strength driver + a sample path that fires over the aurora canvas.
4. **The glass duplication** prunes to Glass MATERIALS (the ladder + atom + axes) and Glass CARDS (`<Card>`); retire `<GlassPanel>` onto Card + the refract axis.
5. **The dock morph is compositor-bound already** — the breaks are scaleX(0) morph-white (degenerate measurement), the resting 3px self-blur (shrunken-mess), and inert/pointer-dead vertical layers (click-deadness). NO `transition: all` exists.
6. **The tabs are too-square + too-low-contrast + spring-desynced** — pill radius to near-stadium, a real selected-material step, and a spring whose position+squish fill ONE matched window.

All values above are live-measured 2026-06-18 on `:5199` (GPU-capable Playwright session) or read from source at the cited file:line.