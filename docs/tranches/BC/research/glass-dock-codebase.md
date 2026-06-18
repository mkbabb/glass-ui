# BC codebase deep-audit — glass primitives · dock · tabs (CURRENT state, re-verified 2026-06-18)

Branch `tranche/BB`, live demo `:5199` (confirmed `200`, GPU-capable Playwright session). Every finding below is grounded in a **file:line** OR a **live `getComputedStyle`/`getBoundingClientRect` measurement** taken fresh 2026-06-18 (re-verifying the prior `research/glass-dock-codebase.md` corpus + deepening it). The headline holds: **the BB source is architecturally sophisticated, NOT a naive flat reimplementation** — a handful of root mechanisms produce every visual break the user reported. Two DEFECT-LEDGER claims (grey-slab, `transition:all`) are MIS-STATED; the real roots are pinned here. This corpus supersedes/extends the prior with fresh live values + 4 new roots (the GlassPanel SVG-renderer overlap, the dialog contrast-color-to-black flip, the inert-on-raw-`expanded`, the spring/squish desync quantified).

---

## PART 1 — GLASS (Band 1)

### 1.1 The grey-slab is ALREADY CLOSED at the 4% floor — VERIFY-and-harden, do NOT re-fix

DEFECT-LEDGER D1 ("glass too dark + grey; the dock/overlay band darken 20%-AA UNCONDITIONALLY") is **stale**. Live probe of a real glass card at `/display/card` (2026-06-18):
- card `bg = oklab(0.934369 0.00151814 0.00643545 / 0.664)` — **warm-cream plate at L 0.934, 66% alpha** (NOT grey).
- `--glass-tint-strength` resolves **`4%`** (the floor), `--glass-tint-strength-floor: 4%`, `--glass-tint-strength-aa: 20%`.

The fix landed in source:
- `src/styles/glass/ladder.css:253-258` — content tiers `:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)` set `--glass-tint-strength: var(--glass-tint-strength-floor)` (4%), with the inline `BC.W-AUDIT` comment.
- `src/styles/glass/ladder.css:212-222` — the overlay band `:where(.glass-floating,.glass-overlay)` ALSO joined the floor; full-AA darken moved to `@container style(--glass-backdrop: light)` only (ladder.css:146-164).
- `src/styles/dock/morph.css:428-441` — the dock `:where(.glass-dock)` joined the floor (live: dock `--glass-tint-strength` = `4%`).

**BC consequence (BC.W-GLASS-IDENTITY):** VERIFY-and-harden, NOT re-fix. The residual grey is now (a) **cream-over-busy-aurora** (a 66%-α warm-cream plate over a saturated colored field reads desaturated-grey on some backdrops — the iOS-27 answer is the DYNAMIC darken, which needs the observer closed §1.3) and (b) the bright-bucket snap to 20% AA when the dead observer or a consumer engages it. The token to re-examine: floor 4% vs AA 20% — and whether a CONTINUOUS luma-driven strength (§1.3) replaces the discrete jump.

### 1.2 THE BLACK BAR (D2) — the per-rung border is a dark warm-ink hairline (THE single highest-value root)

This is **the live root of "wtf is this black bar."** Live probe, same card:
- `border-top-color = oklab(0.216128 0.00350075 0.00518669 / 0.16)` — a **dark warm-ink at L 0.216, 16% alpha, 1px.**
- It resolves from `--glass-border-resting = color-mix(in srgb, light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 16%, transparent)` (`tokens/glass.css:193`), where `--foreground = hsl(24 10% 10%)` is the warm-DARK ink (oklab L 0.216).

The mechanism: **`tokens/glass.css:191-196`** authors EVERY per-rung border as `color-mix(in srgb, var(--foreground) 11-22%, transparent)`:
```
--glass-border-wash:     color-mix(in srgb, var(--foreground) 11%, transparent);
--glass-border-quiet:    color-mix(in srgb, var(--foreground) 13%, transparent);
--glass-border-resting:  color-mix(in srgb, var(--foreground) 16%, transparent);
--glass-border-floating: color-mix(in srgb, var(--foreground) 19%, transparent);
--glass-border-overlay:  color-mix(in srgb, var(--foreground) 22%, transparent);
--glass-border-dock:     color-mix(in srgb, var(--foreground) 14%, transparent);
```
This is the BA.W-NO-GRAY "warm rim that carves the silhouette" intent, but `--foreground` is the near-black warm ink, so over a near-white cream plate the **full-perimeter border reads as a dark hairline**, WORST at the top edge where the white `--glass-material-rim` catch-light (`inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)`, **`glass/rim.css:73-74`**) sits just inside it. Confirmed live: the card `box-shadow` carries `oklab(0.999994 … / 0.18) 0px 0px 0px 0.75px inset` (the white rim) **AND** the dark `border-top` — the dark-border-over-white-catch-light contrast IS the black bar.

THE KEY ASYMMETRY: the rim INK is correct (`--glass-rim-ink: hsl(0 0% 100% / 0.18)`, rim.css:73 — a LIGHT catch-light), but the BORDER is the dark ink. The two are at war: a bright rim AND a dark border on the same edge.

**BC root-fix (BC.W-BLACK-BAR, the D2 home):** the iOS-27 rim is a LIGHT catch-light + a warm UNDER-shadow, never a dark full-perimeter ink hairline. Two viable moves:
- **(a)** re-point `--glass-border-*` to read the WHITE/light edge-light register (`--glass-edge-light = hsl(0 0% 100% / 0.18)`) so the silhouette is a bright highlight not a dark rim; the warm-ink "carve" intent moves to the bottom under-shadow only.
- **(b)** GRADIENT the border so the TOP carries the light catch-light and the BOTTOM the warm under-shadow (the real glass-thickness physics — light rims the top, shadow the bottom; `border-image: linear-gradient(...)` or a layered box-shadow). This is the SOTA iOS-27 model.
**Fix once at `tokens/glass.css:191-196` → fixes D2 on cards AND docks (the dock reads `--glass-border-dock` from the same source, §2.6).**

### 1.3 The adaptive observer is DECORATIVE-DEAD — confirmed by TWO live probes (BC.W-ADAPTIVE-RECONCILE)

**(a) `--glass-backdrop-luma` has ZERO CSS consumers.** `grep -rn 'var(--glass-backdrop-luma' src/` → **exit 1 (empty).** The token is WRITTEN at `src/composables/glass/useGlassBackdropLuminance.ts:311` (`el.style.setProperty("--glass-backdrop-luma", value.toFixed(3))`) and declared at `tokens/glass-fx.css:123` (`--glass-backdrop-luma: ;`) but no `.css` rule reads it. The composable's own header (line 31) calls it "its FIRST real consumer" — **that consumer never materialized.** A pure write-with-no-reader = decorative.

**(b) The observer NEVER FIRES on the live dock — even over a live aurora.** Live probe of the SidebarDock at `/substrates/aurora` (which HAS a live aurora canvas to sample): `dock.style.getPropertyValue('--glass-backdrop-luma')` = `""` AND `dock.style.getPropertyValue('--glass-backdrop')` = `""`. The observer is wired ON by default (`GlassDock.vue:77-81`) but writes NEITHER inline. So the `write()` (`useGlassBackdropLuminance.ts:307-318`, which DOES set both `--glass-backdrop` bucket AND the luma) is NEVER REACHED.

ROOT (in `useGlassBackdropLuminance.ts`):
- `sampleAnimated` (line 219) needs `options.backgroundCanvas` — but `GlassDock.vue:79` passes `props.backgroundCanvas ?? null`, and the DockStage/shell demos **never pass it**, so `resolveSourceCanvas(null)` returns no source → `sampleAnimated` returns null → falls to `sampleStatic`.
- `sampleStatic` (line 280-304) does an `elementsFromPoint` stack-walk: the dock floats over the transparent-walked aurora `<canvas>`, so every layer reads `rgba[3] < 0.5` → `continue` (line 294) → falls to `document.body` luminance. The body bg may be a near-transparent or the same `--background`, and the IntersectionObserver gate (`useIntersectionPause`, line 343) may park the loop before the mount sample lands.
- Net: the live DYNAMIC darken the user asked for ("darken DYNAMICALLY like iOS 27 so we can actually see these elements") **DOES NOT HAPPEN** — the dock paints at the static 4% floor over whatever's behind it.

**BC root-fix (BC.W-ADAPTIVE-RECONCILE, the single highest-value Band-1 wave):** close the loop, two real moves:
1. **Make `--glass-backdrop-luma` LOAD-BEARING:** drive a CONTINUOUS `--glass-tint-strength: calc(...)` off it (interpolating floor 4% → AA 20% as luma rises past ~0.6), so the darken tracks the field CONTINUOUSLY (the iOS-27 model), replacing the binary discrete `light`/`dark` bucket.
2. **FIX the sample so it fires over the aurora canvas:** thread the aurora `<canvas>` through `props.backgroundCanvas` (the DockStage/aurora hosts pass it), OR (more robust) sample the COMPOSITED region. The `sampleAnimated` `drawImage + getImageData` path is the correct one for a dock-over-aurora but is dead without the canvas ref.

### 1.4 The glass-duplication census — SEVEN overlapping registers → prune to Glass CARDS + Glass MATERIALS (BC.W-GLASS-PRUNE)

The user: "why so many glass duplicates? prune to Glass CARDS + Glass MATERIALS." The complete census, grounded:

| register | home | what it is | overlap verdict |
|---|---|---|---|
| **The 5-rung ladder** | `glass/ladder.css:41-125` (`.glass-{wash,quiet,resting,floating,overlay}`) | the MATERIAL — bg/blur/border/rim per rung | the canonical MATERIAL |
| **`.glass-material` atom** | `glass/material.css:36-49` + `::before` 65-76 | the shared specular `::before` + rim wiring across all rungs + Card + dock controls | composes WITH the ladder (the atom layer, not a dup) |
| **`<GlassPanel>`** | `custom/glass-panel/GlassPanel.vue` | a PARALLEL COMPONENT re-implementing the 5-rung ladder via `VARIANT_CLASS` (`wash→glass-wash` …, line 32-38) PLUS `tier` (svg-filter/css/fallback) AND `surface` ({glass·veil·opaque}) | **TRUE DUPLICATE of Card** — it has `variant`+`tier`+`surface`; Card has `tier`+`surface`. Only unique facility = `useGlassRenderer` SVG displacement filter (`createGlassFilter`, `useGlassRenderer.ts:147-235` — `feDisplacementMap` in `backdrop-filter`), which IS the `.glass-lens`/`#glass-refract` axis already (below). |
| **`<Card>`** | `ui/card/Card.vue` + `.glass-card` (`surfaces.css:12-38`) | the tier-aware glass card (tier→`.glass-{rung}`, surface decoration via `surfaceClass`) | the canonical CARD |
| **The surface-axis** | `glass/surface-axis.css` + `_shared/useSurfaceAxis.ts` | the {glass·veil·opaque} DECORATION axis, threaded through 11 surfaces | orthogonal axis, NOT a dup (correct), but adds 2 selectors (`[data-surface=veil]`/`[data-surface=opaque]`) |
| **`.glass-deep`** | `glass/deep.css:41-42` + `tokens/glass-deep.css` | the OPT-IN maximal-iOS tier (16px blur, saturate 1.5); re-points `--glass-blur-floating: var(--glass-blur-deep)` | a TIER modifier of the ONE material (keep as a depth axis, not a dup) |
| **`.glass-lens`/`.glass-refract`** | `surfaces.css:249-273` + glass-refract.css (`#glass-refract` SVG filter) | the SVG `feDisplacementMap` refraction axis | a refraction AXIS — **IDENTICAL mechanism to GlassPanel's `useGlassRenderer`** |

**The prune to Glass CARDS + Glass MATERIALS:**
- **Glass MATERIALS** = the `.glass-{rung}` ladder (5 rungs) + the `.glass-material` atom (specular/rim) + `.glass-deep` (depth) + `.glass-lens` (refraction) as TIER/AXIS modifiers of the ONE material. This IS the `/substrates/glass-panel` surface — it demonstrates the MATERIAL.
- **Glass CARDS** = `<Card>` (the component wrapping a material in a card chassis with padding/header/footer).
- **RETIRE `<GlassPanel>`** onto `<Card>` + the bare `.glass-{rung}` class (clean break, no alias — its only demo consumer is `substrates/glass-panel.vue`, the MATERIALS gallery). Its `useGlassRenderer` SVG-displacement filter folds onto `.glass-lens`/`.glass-refract` (the SAME `feDisplacementMap`-in-`backdrop-filter` mechanism). The 11 surface-axis enrollees stay; GlassPanel's `variant+tier+surface` sprawl collapses to the Card grammar (`tier`+`surface`). `/substrates/glass-panel` becomes the MATERIALS gallery (5 rungs + axes), distinct from `/display/card` (the CARDS gallery).

### 1.5 The dialog IS glassy in source — it reads muddy, too-opaque, and rung'd by a dark border + a black-ink flip (BC.W-DIALOG-GLASS)

Live probe (open dialog at `/containers/dialog`, 2026-06-18):
- dialog `bg = oklab(0.942574 0.00149538 0.00644966 / 0.808)` — **80.8% alpha** (`.glass-floating` is the LEAST-transparent ladder rung; `--glass-opacity-floating: 0.80`, `tokens/glass.css:57`). The user wants the modal MORE transparent (the iOS-27 control-center ~60%, not 80%).
- `borderColor = oklab(0.216128 … / 0.19)` — the dark warm-ink black bar at **19%** (the floating rung, even darker than the card's 16% — §1.2 recurs).
- `backdropFilter = blur(13px) saturate(1.18)` — correct heavy blur, the glass IS there.
- `color = rgb(0, 0, 0)` — **PURE BLACK ink.** The overlay band self-engages the `contrast-color()` flip UNCONDITIONALLY (`ladder.css:302-306`: `:where(.glass-floating, .glass-overlay) { color: contrast-color(var(--card)); --foreground: contrast-color(var(--card)); --muted-foreground: contrast-color(var(--card)); }`), and on a translucent cream-over-light plate `contrast-color(--card)` resolves to pure black — harsh on the cream, AND `--muted-foreground` resolves to `contrast-color(...)` (live confirmed) so captions go black too (no muted register).

So "NOT glassy at all" is a COMPOSITE: (a) 80% opacity is too opaque (the modal wants more transparency), (b) the dark border bar rings it (§1.2), (c) the unconditional contrast-color flip blackens all ink. The `surfaceClass(props.surface, 'floating')` + `.glass-reveal` are CORRECT (`DialogContent.vue:107-108`); the fix is the TIER (drop to a more-transparent rung), the rim (§1.2), and the over-eager contrast-color flip (only flip ink where the plate ACTUALLY darkens, not on the calm floor).

### 1.6 Button glass-morphism (BC.W-BUTTON-GLASS-IOS)

`tokens/glass.css:118-127` — the glass-variant buttons already lift onto `--glass-blur-btn` (= quiet-tier 8px blur + saturate 1.05 brightness 1.02). The user wants MORE. The lever is `.glass-deep` (`tokens/glass-deep.css`, 16px / saturate 1.5) — route the hero CTA buttons (`default`/`primary-audacious`) onto a deep-glass press register. The press machinery (`useSpringPress` + `--glass-btn-press-t`) is already wired (Button.vue is consumer #1). The increase = a tier swap + the §1.2 rim fix.

---

## PART 2 — DOCK (Band 2)

### 2.1 The "transition:all" jank root is a PHANTOM — the source is already compositor-bound (DEFECT-LEDGER D3 MIS-STATED)

`grep -rn 'transition:\s*all\|transition-property:\s*all\|transition: all' src/ demo/` → **EMPTY (exit 0, zero matches).** There is NO `transition: all` anywhere. The DEFECT-LEDGER D3 root ("the shell docks carry `transition: all`") is **wrong.** The actual morph mechanism is already a single-scalar compositor transform:
- `layers.css:59-74` — the box morph is `transform: scaleX(var(--dock-morph-scale))` over a RESERVED `inline-size: var(--dock-morph-to)` footprint (ONE layout solve, NOT a per-frame lerp), `will-change: transform`. The CDP Layout track is flat by design.
- `morph.css:79-84` — the chrome morphs off `--dock-expand-t` (a registered scalar), NOT a CSS transition.
- The only `transition` legs on the dock are scoped + correct: `morph.css:382-386` (the held-state bg/border/box-shadow on `--duration-fast`), `shell.css:308-311` (the vertical rail's box-shadow/transform/scale — decorative polish, not morph chrome).

**So the dock morph is NOT janky for the ledger's reason.** BC must target the REAL roots (2.2-2.4), not the phantom. The user's "stutter / not buttery smooth" reads come from the spring CURVE (the same front-loaded `--spring-snappy` that abrupts the tabs §3.3 — it hits its peak at ~16% then runs dead-flat; the DOCK_SPRING is the value.js-fenced clock but the MORPH paints its travel in the first ~half then sits) AND the resting self-blur (§2.4).

### 2.2 The morph-WHITE / morph-invisible root (D5) — scaleX(0) on a `to:0`/`from:0` measurement (NO floor)

`layers.css:61-71`:
```
--dock-morph-ratio: calc(var(--dock-morph-from, 0px) / max(var(--dock-morph-to, 1px), 1px));
--dock-morph-scale: calc(var(--dock-morph-ratio) + (1 - var(--dock-morph-ratio)) * var(--dock-morph-t, 0));
...
transform: scaleX(var(--dock-morph-scale));
```
When the measured `--dock-morph-to` is **0** (the BA-VJS-1 nested-group bug: the outer `.dock-layers` measured the inner stack still pinned collapsed; CLAUDE.md claims a `dockMorphContext.onSwap` fix lands `from:40 → to:≈242, never 0` but the guard is only `max(to,1px)` — a divide-by-zero guard, NOT a scale floor), the scale runs **`scaleX(0)` at `t=0` → the box is zero-width = invisible.** Combined with `overflow: clip` (`shell.css:179`) the content behind the zero-width aperture is fully clipped = a **white/empty box mid-morph** (the "morph turns white/invisible"). Same for `from:0` → ratio 0 → `scaleX(0)`.

**BC root-fix (BC.W-LIQUID-MORPH):** (1) VERIFY the `dockMorphContext.onSwap` nested-`max-content` measurement-ordering fix actually fires on the live nested docks (the user STILL reports white morph, so it may not); (2) add a SCALE FLOOR — `max(var(--dock-morph-scale), 0.05)` — so a degenerate measurement never paints a zero-width box; (3) the morph-bridge.css teardrop (the V↔H showcase, `morph-bridge.css:91-113`) animates `width`/`height` PER FRAME — that IS layout-triggering jank, but it's the perf-gated preview, not the default VT crossfade. For the arbitrary-shape morph the user wants (BC.W-DOCK-ARBITRARY), use clip-path/scale, NEVER per-frame width.

### 2.3 The vertical-dock click-deadness — `inert` reads the RAW `expanded` ref, not `visualExpanded` (D — "ENTIRE vertical dock NOT CLICKABLE")

`GlassDock.vue:434-446`:
```
<div :class="['dock-layer dock-layer--full', { 'is-active': visualExpanded }]"
     :inert="!expanded || undefined">   <!-- line 436 -->
```
The `is-active` class reads `visualExpanded` (`= alwaysExpanded.value || expanded.value`, line 123) but `inert` reads the RAW `expanded` ref (line 436). **For an `always-expanded` vertical dock where `expanded` is false** (the morph state hasn't flipped `expanded`, or `useDockState` keeps `expanded` false for an always-expanded surface), the full pane is `is-active: true` (visible + painted) BUT `inert: !expanded = true` → **every control inside is non-interactive** = the whole vertical dock is dead. The `--summary` pane carries the inverse `:inert="expanded"` (line 442).

Other contributing candidates:
- `layers.css:170-175` — an inactive layer (`:not(.is-active):not(.is-leaving)`) gets `pointer-events: none` + `visibility: hidden`; if `visualExpanded` computes wrong the full pane is pointer-dead.
- `layers.css:86-92` — the vertical morph does `scaleY(var(--dock-morph-scale))` with `transform-origin: center top`; `scaleY(near-0)` collapses the clickable area to a sliver.

The live SidebarDock at `/dock/layers` measured `expanded always-expanded` BOTH present (59×631, visible) — so on THAT config `expanded` IS true and it works; the deadness is **STATE-DEPENDENT** (a collapsible vertical, or one whose `expanded` lags `visualExpanded`, or mid-morph).

**BC root-fix (BC.W-DOCK-VERTICAL-FIX):** (1) gate `inert` on `visualExpanded` not the raw `expanded` (the one-line root — `:inert="!visualExpanded || undefined"`); (2) ensure a vertical dock's active layer is never `scaleY(0)`/`pointer-events:none` while a control should be live; (3) live-verify click integrity on a COLLAPSED vertical dock (tap-to-expand-then-click — the `useDockClickIntegrity` + `useTouchGate` path, `GlassDock.vue:299-324`).

### 2.4 The shrunken-dock-is-a-blurry-mess — the resting 3px self-blur is LIVE at the collapsed endpoint (D)

`morph.css:79-84`:
```
.glass-dock {
    --dock-reveal-blur: 3px;
    filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t, 1))));
}
```
At `--dock-expand-t: 0` (collapsed) this is `blur(3px)` on the dock's OWN pixels (the W-LIQUID-REVEAL bloom). A COLLAPSED (resting) dock therefore carries a **3px self-blur PERMANENTLY** — the "blurry mess when shrunken." Live confirmed: the SidebarDock (expanded, expand-t 1) measured `filter: blur(0px)` (correct at expansion) but `--dock-reveal-blur: 3px` is live — so a collapsed dock at expand-t 0 carries `blur(3px)`. STACKED with the `backdrop-filter: blur(9px)` plate (`tokens/glass.css:92`, `--glass-blur-dock-radius: 9px`), a small collapsed pill (~54-59px) reading a 3px content-blur + 9px backdrop-blur is muddy. The PRM bracket zeros it (`morph.css:487-491`) but at rest non-PRM it's live.

**BC root-fix (BC.W-DOCK-SHRINK-BLUR):** the resting decongest blur is meant to be a TRANSIENT bloom-in, not a resting state. Gate `--dock-reveal-blur` to apply ONLY during `[data-morphing]` (so the collapsed REST is crisp), OR drop the collapsed endpoint to ~1px. The `--dock-expand-t: 0` collapsed state must be CRISP.

### 2.5 The rail — the current divider-seam hairline is NOT the macOS hover-expand stack (D, BC.W-DOCK-STACK-RAIL)

`rail-extend.css` + `GlassDock.vue:460-462` (the `#rail` slot escapes `contain: paint` via the `.glass-dock-frame` → `.dock-hairline-slot` `position: absolute` shell, lines 451-462). The CURRENT rail is the BA.W-DOCK-SECTIONS divider-seam hairline + chip strip (`<DockRail>`/`<DockSection>`). The user wants the **macOS hover-expand STACK** — extend-beyond, hover-expand, 3-configurable, scrollable, n-stack. The divider-seam re-conception is NOT that. **BC.W-DOCK-STACK-RAIL** is a from-scratch rail rebuild (the hover-expand dock-icon stack), distinct from the hairline-rail. The `.glass-dock-frame` escape (the non-clipping positioning context) is the correct chassis to build on — that part STAYS.

### 2.6 The black-bar on the dock (recurs from §1.2)

`shell.css:150` — `border: 1.5px solid var(--glass-border-dock, var(--glass-border-resting))`, `--glass-border-dock = color-mix(in srgb, var(--foreground) 14%, transparent)` (`tokens/glass.css:196`). Live confirmed: dock `borderColor = srgb(0.11 0.098 0.09 / 0.14)` — the dark-warm-ink hairline, the SAME root as the card. The dock's top edge reads as a dark bar for the identical reason; the `box-shadow: var(--glass-edge-light), ...` (shell.css:154) is the white rim sitting just inside the dark border (same war as §1.2). **Fixed by the §1.2 rim→catch-light fix at the token source.**

### 2.7 The morph chrome is sound, the topology limit is respected — what to KEEP

For the planning iterations: the dock morph is NOT a from-scratch rebuild. KEEP: the single-scalar `--dock-morph-t` clock, the reserved-footprint-`scale()` compositor transform (layers.css:59-92), the `overflow: clip` aperture (shell.css:178-199), the V↔H topology-occlusion via VT crossfade (the AX.W42 fold-7 limit). The BC dock work is targeted ROOTS: the scale floor (§2.2), the resting blur gate (§2.4), the inert fix (§2.3), the rail rebuild (§2.5), the rim fix (§2.6), and the spring-curve re-derive (the same as §3.3 — a curve that fills the clock, not front-loads it).

---

## PART 3 — TABS (Band 3)

### 3.1 The squared-pills — 6px radius on a 23px pill = 0.26 of height (D — "PROPER SMALL PILLS, not squared")

Live probe at `/navigation/tabs` (2026-06-18):
- track `border-radius: 8px` on a **39px-tall** track; indicator `border-radius: 6px` on a **23px-tall** pill, 79px wide.
- `6px / 23px = 0.26` of the pill height → reads as a ROUNDED-RECTANGLE, NOT an iOS pill. A near-stadium iOS-27 segmented pill needs radius ≈ half-height (11.5px) — i.e. `--radius-pill` (9999px) capped to half.
- Source: `segmented-tabs.css:38-40` (`--bouncy-track-radius: 0.4375rem` = 7px, `--bouncy-slider-radius: 0.3125rem` = 5px) bumped to 8px/6px at `min-width:640px` (lines 167-170).

**BC root-fix (BC.W-TABS-IOS):** the indicator radius → `var(--radius-pill)` (capped to half-height) for the iOS stadium register, OR a fixed radius ≈ half the track height. The track radius follows. The user's reference ("like the current value.js demo") is near-stadium pills.

### 3.2 The active pill barely differentiates — SAME hue +30%α (D — "all glassy, NOT reka/shadcn-like")

Live probe:
- track `bg = color(srgb 0.9844 0.97288 0.9556 / 0.5)` — warm-cream at **50% α** (`--glass-bg-quiet`, segmented-tabs.css:53).
- indicator `bg = color(srgb 0.9844 0.97288 0.9556 / 0.8)` — the **SAME warm-cream hue at 80% α** (`--glass-bg-floating`, segmented-tabs.css:83).

The active pill is the SAME hue, only +30% alpha → over a glass content tier the differentiation is **barely perceptible** (a faint brightness step). This is why it reads "not glassy / reka-like" — no clear material FORWARD-ness. The W-REGISTER-IOS "selected reads as glass" model is right in principle but `floating`-over-`quiet` is too small a delta.

**BC root-fix (BC.W-TABS-IOS / W-LIQUID-TAB):** the iOS-27 selected pill is a DISTINCT lifted glass plate — a real material step: a brighter/whiter fill + a stronger catch-light rim + an under-shadow that lifts it OFF the track (NOT +30%-alpha-same-hue). Pair it with `.glass-deep` (§1.6) for the selected plate. The box-shadow on the indicator (segmented-tabs.css:89-91, `0 1px 3px rgba(0,0,0,0.08)` + a 30%-border ring) is too weak to lift.

### 3.3 The abrupt spring + the position/squish DESYNC (D — UNDERLINE-TUNE "spring curve EASED, not abrupt"; "springs too slow")

Grounded in the token: `--spring-snappy` (`scheme-motion.css:221`) is a `linear()` curve that **hits 1.0 by 12.245% and PEAKS at 1.068 (16.327%)**, then settles to dead-flat `1.00000` from ~49% onward (verified — the curve string runs `1.00000` from 48.980% to 97.959%). `--tab-indicator-duration = --spring-snappy-duration = 0.34s` (live confirmed, both 0.34s).

So the perceptual motion COMPLETES in ~16% × 0.34s ≈ **55ms** (the curve reaches its peak), then runs DEAD-FLAT for the remaining ~285ms. The indicator SNAPS to position in 55ms and the 0.34s clock is wasted tail — reading as an **ABRUPT jump, NOT a smooth glide.**

THE DESYNC (new, quantified): the squish (`useTabIndicator.ts:200-255`) releases at `INDICATOR_RELEASE_AT_ARRIVAL = 0.82` (`constants.ts:23`) × `clockMs` = 0.82 × 340 = **~280ms**. So the POSITION is done at ~55ms but the SQUISH releases at ~280ms — a 225ms desync where the indicator has already arrived but is still mid-stretch. This is the "abrupt-yet-laggy" read.

**BC root-fix (BC.W-UNDERLINE-TUNE / W-SPRING-EASE):** the indicator needs a curve whose perceptual TRAVEL fills MORE of the clock — either (a) a slower `--spring-snappy` (a lower ζ that overshoots-and-settles over the whole ~340ms), OR (b) a shorter clock matched to the 55ms travel (~120ms). The right answer: a spring whose POSITION and SQUISH both fill the SAME window (the desync IS the abruptness). Re-derive via the W-GLASS-CAL per-spring-clock generator (`scripts/regen-spring-tokens.mjs`) so the 2%-settle clock matches the perceptual-travel time. The user wants "squishy/quick/coupled, eased not abrupt" — that is a spring whose travel fills the clock, not a front-loaded snap.

### 3.4 The liquid-tab pull-morph exists but is default-OFF (D — "pull an active tab → morphs, squishes, to location")

`SegmentedTabs.vue:34` imports `useTabDragMorph` (the BB.W-DRAG-MORPH `:draggable` axis — `useDragMorph` composing kf `Draggable` + `useLiquidFlex`). The mechanism EXISTS but is ADDITIVE default-OFF (`draggable` prop defaults false). The user wants the iOS-27 pull-morph as a primary affordance. **BC.W-LIQUID-TAB:** wire `:draggable` ON for the pill tabs by default (or make the pull a primary affordance), and verify the squish reads (the `--tab-indicator-max-stretch: 1.08` cap is LOW per `constants.ts:12` — the user wants a VISIBLE gel-squish, so the cap may need lifting to ~1.15). Pair the squish cap lift with the §3.3 spring re-derive so the pull reads liquid.

---

## CROSS-CUTTING ROOT SUMMARY (for the planning iterations)

1. **THE BLACK BAR = `--glass-border-* = color-mix(--foreground N%, transparent)`** (`tokens/glass.css:191-196`) — the SINGLE root of "wtf is this black bar" on BOTH cards AND docks. Fix once (rim→light-catch-light-top + warm-under-shadow-bottom) → fixes D2 everywhere. **Highest-value single fix.** (Band 1 — BC.W-BLACK-BAR.)
2. **The grey-slab is CLOSED** at the 4% floor (live: card oklab L0.934/66%α). Residual grey = cream-over-busy-aurora + the dead observer. VERIFY-and-harden, don't re-fix. (BC.W-GLASS-IDENTITY.)
3. **The adaptive observer is DECORATIVE-DEAD** — luma unread (grep exit 1) AND never writes inline (`--glass-backdrop` empty on the live dock even over aurora). Close the loop: CONTINUOUS luma→strength driver + a sample path that fires over the aurora canvas. **The single highest-value Band-1 wave.** (BC.W-ADAPTIVE-RECONCILE.)
4. **Glass duplication** prunes to Glass MATERIALS (the ladder + atom + deep + lens axes) and Glass CARDS (`<Card>`); RETIRE `<GlassPanel>` (variant+tier+surface dup) onto Card + the refract axis (its `useGlassRenderer` IS the `.glass-lens`/`#glass-refract` mechanism). (BC.W-GLASS-PRUNE.)
5. **The dialog is glassy in source but too-opaque (80%α) + dark-bordered + black-ink-flipped** (`color: rgb(0,0,0)` from the unconditional overlay-band contrast-color flip, ladder.css:302-306). Drop the tier to more-transparent, fix the rim, gate the contrast-color flip to actually-darkened plates. (BC.W-DIALOG-GLASS.)
6. **NO `transition: all` exists** (grep empty) — the DEFECT-LEDGER D3 dock-jank root is a PHANTOM. The real dock roots: `scaleX(0)` morph-white (no scale floor, layers.css:61-71), the resting 3px self-blur (shrunken-mess, morph.css:79-84), the inert-on-raw-`expanded` (vertical click-deadness, GlassDock.vue:436), the macOS-stack rail rebuild (rail-extend.css), the dock black-bar (shell.css:150). (Band 2.)
7. **The tabs are too-square (6px/23px = 0.26 of height) + too-low-contrast (same hue +30%α) + spring-desynced** (position done ~55ms, squish releases ~280ms over a wasted 340ms clock). Pill radius → near-stadium, a real selected-material step, a spring whose position+squish fill ONE matched window, and `:draggable` ON. (Band 3.)

All values live-measured 2026-06-18 on `:5199` (GPU-capable Playwright) or read from source at the cited file:line. The grep negatives (`transition:all` empty, `var(--glass-backdrop-luma` empty) are exit-code-verified.