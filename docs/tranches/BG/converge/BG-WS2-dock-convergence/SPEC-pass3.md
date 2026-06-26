# BG-WS2 · Dock convergence — pass-3 spec (the landing-geometry frontier RESOLVED)

> **Status:** pass-3. The pass-1/pass-2 converged specs remain the AUTHORITATIVE 11-wave set + base
> mechanism (M1–M11 + F-ARM-1/2/4/5 build-proven). THIS document ADVANCES the ONE arm pass-2 left
> falsifiable — **F-ARM-3 the in-place landing geometry** — by resolving the THREE new falsifiers the
> pass-3 risk fleet surfaced + HEAD-verified, and it makes the corresponding goo + cap-scroll mechanism
> corrections. It does NOT restart the wave-set; it does NOT re-open any build-proven arm.
>
> **Read pass-2-converged** for the settled F-ARM-1 (analytic-velocity squish, Δ=6.4e-5), F-ARM-5
> (two-surface `useDockSpring`, build-proven), F-ARM-4 (C-SAFARI close-time), and the gate-lockstep
> blockers; **read THIS** for the landing-geometry resolution + the goo re-anchor + the cap-scroll
> cross-axis honesty + the persistent-cut coordination + the prototype set that falsifies them.
>
> **What pass-3 ADDS (each HEAD-verified at synthesis, branch `tranche/BG` @ `c8c30aa6`):**
> 1. **THE BOTTOM-BAR COLLISION (R1, the headline falsifier pass-2 MISSED).** `.demo-bottom-dock` is
>    `position:fixed; inset-block-end; justify-content:center` — a floating story-nav capsule present on
>    EVERY route at ALL widths (only `.demo-sidebar-rail` is hidden ≤767px; NOTHING hides the bottom dock
>    ≥768px). Pass-2's "morphed-horizontal SidebarDock leaves flow → bottom-bar" lands the CATEGORY dock
>    on top of the always-present STORY dock → two stacked bottom bars, different content → reads broken.
>    **RESOLVED: the morphed-horizontal dock lands TOP-LEADING, not bottom** (§F-ARM-3).
> 2. **THE CENTERED-MERGE GOO CANNOT OCCLUDE A SCREEN-TRANSLATION (R2).** `.dock-morph-bridge-goo` is
>    screen-centered (`top/left:50%; translate:-50% -50%`, `morph-bridge.css:51-54`); its two plates merge
>    at a SHARED CENTER. A left-column→top-bar travel is a screen translation the centered neck does not
>    cover. **RESOLVED: re-anchor the bridge to the REAL DOCK's own box + pin the morph at the shared
>    top-leading corner (minimal travel)** (§F-ARM-2).
> 3. **THE GOO CHARACTER CHANGES ON 3 AXES, NOT 1 (R3).** modal `#shell-dock-morph-goo` = blur 7 / slope
>    20 / offset −9; canonical `#dock-morph-goo` = blur 16 / slope 14 / offset −7. Pass-2 framed it as
>    "2.3× alpha-bleed (blur)". It is softer+wider on ALL THREE axes. **RESOLVED: tune `--morph-neck-frac`
>    UP + the plate spans at blur 16 (geometry, NOT the static filter graph); P2 captures coherence.**
> 4. **THE CAP-SCROLL CROSS-AXIS PIN IS A LATENT NO-OP (R8).** `overflow.css:44,69` declares
>    `overflow-x: visible` on the scroll cross-axis — but CSS Overflow §3 forces a single-axis
>    `overflow-y:auto` sibling `visible`→`auto`, so the pin is COMPUTED AWAY. The real lozenge guard is
>    the 80%-of-cell `--dock-control-safe-inset` plate (0.8 × 1.1-hover = 0.88 < 1, never exceeds the
>    cell). **RESOLVED: replace the no-op `visible` with the correct escape `overflow-x: clip` +
>    `overflow-clip-margin`; re-point `proof:dock-plate-clearance` off the impossible cross-axis-visible
>    assertion** (§F-ARM-6, NEW).
> 5. **PERSISTENT-CUT is a TWO-PART coordinated edit (R5).** The `c.id !== "foundations"` filter
>    (`SidebarDock.vue:84`) excludes Foundations from the nav loop PRECISELY because the ℱ `#persistent`
>    control is its sole affordance. A naive "delete the ℱ slot" half-does it and silently kills
>    Foundations nav. **RESOLVED: the cut is ONE coordinated diff** (§PERSISTENT-CUT).
>
> **The honest gate (unchanged from pass-2):** C-SAFARI has ZERO HEAD verification; the AZ slow-Metal box
> stays UNMEASURED; the painted-goo coherence at blur 16 + the TOP-LEADING landing build-proof are
> P1/P2 deliverables with born-RED gate flips. The mechanism + wave-set are converged; the real-paint
> product proofs are execution-bound.

---

## GESTALT GOAL (unchanged)

The dock is "the hallmark." After WS2: ONE spring (`useDockSpring`), ONE morph engine (the orchestrator;
`useLayerTransition` folded+deleted), ONE busy signal; the V↔H morph is a BUTTON IN THE DOCK that flips
the REAL nav dock IN PLACE (liquid teardrop, no modal, esc moot, NO `startViewTransition` in the V↔H path);
no persistent ℱ egg (Foundations rejoins category nav); a capped axis ALWAYS scrolls; the dock blur is a
WS3 peer; the motion reads weighty (arcs + follow-through + overshoot, not a flat blend). The cardinal bar
is REAL paint, both modes, **Chrome AND Safari**, PRM seats synchronously (no 10×74 sliver).

---

## MECHANISM (the pass-3 advances; the pass-2 arms F-ARM-1/4/5 stand verbatim)

### F-ARM-3 (RE-RESOLVED) · The in-place landing geometry — TOP-LEADING, dock-anchored, corner-pinned

**The pass-2 resolution is FALSIFIED by R1 + R2 and is RE-RESOLVED here in-spec (not deferred to paint).**
The two new HEAD facts force the change:

- **R1 (collision).** The bottom-center is the STORY dock's permanent home (`.demo-bottom-dock`,
  `dock-nav.css:151-160`, `position:fixed`, every route, every width ≥768px). The morphed-horizontal
  CATEGORY dock cannot land there.
- **R2 (occlusion).** The goo neck is at the bridge's own center; a left-column→bottom-center travel is an
  L-shaped screen translation the centered neck does not cover.

**THE RESOLUTION — left-column → TOP-LEADING bar, the spatially-coherent 90° flip:**

1. **Vertical resting = the HEAD in-flow left column** (`.demo-sidebar-rail { flex-shrink:0 }`,
   `dock-nav.css:40`) — BYTE-UNCHANGED.
2. **Horizontal resting = a fixed-floating capsule pinned TOP-LEADING** (the mirror of the BottomDock
   floating bottom-center: `position:fixed; inset-block-start: var(--demo-nav-top-inset); inset-inline-start:
   <rail-inset>`). TOP-LEADING is chosen DELIBERATELY over top-center: the vertical left column and the
   horizontal top bar **share the top-leading corner** — the morph reshapes AROUND that pinned corner, so
   the travel the goo must occlude is MINIMAL (the corner never moves; only the opposite extent grows/shrinks).
   Top-center would mirror the BottomDock symmetrically but costs a left→center translation the goo cannot
   cover. **Collision-free** (a floating top toolbar + a floating bottom toolbar reads as a legit two-bar
   layout; two BOTTOM bars do not). **iOS-faithful** (`.sidebarAdaptable` sidebar→floating-bar — the bar
   FLOATS over content, per the reference angle's R-1 nuance, it does NOT consume flow).
3. **The morph is a fixed-floating, corner-pinned reshape — NOT an L-travel.** At press the dock LIFTS to a
   fixed-position layer at its CURRENT visual position (the left column's top-leading corner). It morphs
   V→H AS a fixed element (already out of flow — no per-frame reflow), `transform-origin: top left`, the
   top-leading corner the pinned invariant. The 296px-tall × ~58px-wide vertical plate reshapes to a ~332px-
   wide × ~58px-tall horizontal capsule AROUND that corner; the bottom ~240px of the column footprint
   vanishes UNDER the goo (the Dynamic-Island / `GlassEffectContainer` merge-then-reshape model).
4. **The `<main>` gutter reflow is ONE static-reserve commit at the gesture boundaries (CLS-bounded, never
   animated).** The aside collapses (the dock left flow) → `<main>` reclaims the 82px column. This is a
   STATIC reserve toggle (`display:none`/`inline-size:0` on `.demo-sidebar-rail` via a shell-level
   `data-shell-dock-orientation="horizontal"` attribute committed at SETTLE), NOT a `@keyframes`/`transition`
   height (`proof:no-layout-animation` holds). The reflow fires at most twice per full cycle — at the
   gesture START (lift, dock leaves flow) and at a vertical SETTLE (re-enter flow) — NEVER per-frame and
   NEVER on a mid-flight interruptible reversal (the reserve commits on `onSettle`, not on the live 0.5
   crossing, so a rapid V→H→V wiggle nets ZERO reflow). When horizontal, `<main>` carries a top reserve for
   the floating top dock (the `pt` mirror of the existing `pb-28` bottom reserve) via the same data-attr.
   **The dead-gutter alternative (reserve the empty 82px column when horizontal) is REJECTED** (it reads
   broken — pass-2 was right on this).
5. **The DISCRETE orientation flip is a LOCAL `t≥0.5` computed (`boundOrientation`), the goo occludes it.**
   The web platform cannot interpolate a flex column→row topology (AX.W42 fold-7). At t<0.5 the dock is
   vertical-oriented, at t≥0.5 horizontal-oriented; the flip is hidden in the goo neck. `boundOrientation`
   stays a LOCAL computed inside the in-place adapter — NOT a published-API addition (the two-DOM-dock
   morph-showcase owns its own eager-orientation ref; the published `useDockOrientationMorph` surface is
   unchanged). It is a pure function of `t`, so a mid-flight reversal just re-crosses 0.5 cleanly.
6. **Focus / a11y (DISSOLVED by the single-flip, unchanged from pass-2).** The ONE real dock flips its OWN
   `orientation` (no overlay+placeholder). During the ~0.7s flight the dock's nav controls are `inert`
   (a focused nav RouterLink at toggle → focus falls back to the morph BUTTON the user pressed, which is
   never inert); on settle `inert` clears. NO `role=dialog`, NO focus-trap, NO `aria-hidden` husk — the
   in-place flip is NOT a modal (esc moot = no dismiss affordance). The morph button carries `aria-pressed`
   + `aria-label` (NEVER on the presentational dock root div, `proof:dock-a11y`).
7. **V↔H-vs-collapse serialization (unchanged).** The orientation morph and the collapse/expand morph are
   MUTUALLY-EXCLUSIVE episodes through the ONE orchestrator-owned `morphing` ref (M3); a V↔H toggle while
   collapsed first seats/expands the collapse; the guard REJECTS a second deformation start while one is
   live (a debounced press). The collapse anchor stays center-out (`layers.css transform-origin:center`);
   the V↔H anchor is top-leading — the two must not fight (proven on the real shell dock).
8. **P1 ESCALATION GATE (unchanged shape, NEW target).** Build-prove the TOP-LEADING landing reads coherent
   on the REAL in-flow SidebarDock against the ALWAYS-PRESENT BottomDock (no collision; the corner-pinned
   reshape; the one-time gutter reflow bounded). If it does NOT read coherent — if the top-leading capsule
   crowds the page header, or the lift-at-press `<main>` widen is jarring, or the two-bar layout reads
   cluttered — **ESCALATE before INPLACE-MORPH builds** (the fallback chain is: top-CENTER with a
   path-following bridge re-geometry; then the two-form crossfade; VT stays FORBIDDEN).

**SHELL-DOCK-DRY re-scope (unchanged from pass-2 F11).** The desktop SidebarDock ↔ mobile BottomDock is a
CSS media-query SWAP (`dock-nav.css:179`), a SEPARATE axis from the user-driven V↔H morph. Do NOT merge
them into one orientation ref (the morph must not fight the 768px breakpoint). The DRY folds ONLY the
shared category-nav loop + the morph-button wiring into a `useShellNavDock` composable over two thin SFCs;
the responsive swap stays a pure media query; P1 proves the morph state does not collide at 768px.

**The in-place case COMPOSES `useDockSpring` (NOT a new spring).** ADD the LOCAL `boundOrientation` +
neck/opacity output computeds onto the EXISTING `useDockOrientationMorph` (which already owns the
eager-orientation-ref-vs-scalar-`t` split). The in-dock `ArrowLeftRight` `<DockIconButton>` (already
imported, `SidebarDock.vue:32`) drives a DIRECT ref toggle (delete the window-event triple-hop). The
`__shellDockMorph` window seam (`AppShell.vue:151-187` — the π/Playwright determinism arm) is PRESERVED +
re-pointed onto the real shell-dock flip (open/close become no-ops or are removed; `setMorphT`/`toggle`/
`morphTo` drive the real dock's `t`/orientation).

### F-ARM-2 (RE-ANCHORED) · The teardrop budget — dock-anchored bridge, corner-pinned, 3-axis goo

The pass-2 surgical fix (filter STATIC, opacity-gated, graph never rebuilds — architecturally verified on
real Metal) STANDS. Pass-3 corrects the bridge GEOMETRY for the in-place (non-modal) case:

1. **Re-anchor the bridge to the REAL DOCK's own box (the R2 fix).** `morph-bridge.css:51-54`
   `.dock-morph-bridge-goo` is screen-centered (it was a centered modal stage). The in-place rework
   re-parents `.dock-morph-bridge` to OVERLAY the real dock's fixed box (positioned relative to the dock
   root, top-leading-anchored), so the goo NECK travels WITH the dock and covers the reshape wherever the
   dock is. Combined with the corner-pinned reshape (§F-ARM-3.3 — the travel is ~zero), the union-sized
   bridge covers both silhouettes by construction. The `contain: paint` container is sized to the UNION of
   the V(296×58) / H(332×58) silhouettes ANCHORED AT THE TOP-LEADING CORNER (NOT a centered union, NOT a
   left-column→bottom-center travel union).
2. **The static-filter budget fix (pass-2, unchanged).** Bind `--dock-bridge-goo-filter: url(#dock-morph-goo)`
   STATIC (the graph never rebuilds); gate `--dock-bridge-opacity` to the smootherstep `t∈0.18..0.82`
   midpoint (0 at the endpoints, by readback). DO NOT seed the proto's `filter:none↔url()` TOGGLE (the
   exact graph-rebuild hitch). The filter graph stays STATIC (stdDeviation + matrix never animate; only
   `transform`/`opacity`/`clip-path` on the plates).
3. **THE F6 GOO-ID RE-POINT (born-RED gate, unchanged).** Delete the `#shell-dock-morph-goo` inline filter
   (`AppShell.vue:619`) + its computed (`:123`) with the modal. The in-place teardrop references the
   canonical `GooFilter` mount `#dock-morph-goo` (`GooFilter.vue:56`, blur 16 / slope 14 / offset −7,
   mounted ONCE at the AppShell root). Gate: grep ZERO `#shell-dock-morph-goo` after the delete + the
   in-place teardrop references `#dock-morph-goo` + a LIVE `filter-resolves` π (the mount survives, the
   resource resolves).
4. **THE 3-AXIS GOO-CHARACTER TUNE (R3, the pass-3 correction to the "2.3× blur" framing).** The canonical
   `#dock-morph-goo` is softer+wider on ALL THREE axes vs the modal's blur 7 / slope 20 / offset −9: blur
   7→16 (2.3× alpha-bleed), slope 20→14 (softer threshold shoulder → MORE fusion), offset −9→−7 (lower
   alpha cut → MORE fusion). `--morph-neck-frac: 0.62` (`morph-bridge.css:119,150`) was tuned at blur 7 /
   slope 20 to prevent the "296px circles → lone white dot" over-fusion (`:115`). At blur 16 / slope 14 the
   waist risks collapsing to that lone dot. **P2 tunes `--morph-neck-frac` UP (a WIDER waist) + the plate
   spans so the merge stays TWO-pills-fusing-into-ONE** (the reference R-2 coherence bar: a smooth concave
   catenoid neck at t≈0.5, both endpoints two-distinct-docks, never a lone over-fused dot) — a GEOMETRY
   tune (neck-frac / plate spans), the `feGaussianBlur stdDeviation` / `feColorMatrix` STAY STATIC (no fork
   of the canonical graph — the BD.W-MORPH-FIELD-WELD one-mount canon).
5. **The painted-goo coherence capture (P2 deliverable, unchanged).** `getComputedStyle().filter` RESOLVING
   is NOT the merge LOOKING RIGHT. P2 CAPTURES the PAINTED teardrop at blur 16 over the corner-pinned
   reshape and confirms it reads as a coherent fused teardrop (re-tune neck-frac/spans if it over-fuses).
6. **Occlusion adequacy — BOTH directions, the corner-pinned geometry (F8, corrected).** Capture EVERY
   midpoint frame V→H AND H→V; confirm the dock-anchored bridge covers the corner-pinned reshape (the
   bottom ~240px column-footprint collapse / the right ~270px row-footprint growth). Endpoint frames
   `t∈[0,0.18]` / `[0.82,1]` (bridge `opacity:0`) show the real docks alone cover the reflow. PRM
   single-paint: `--dock-bridge-opacity:0` under reduce → zero neck frame.
7. **The slow-box honesty (unchanged).** The M5-Max timing is NON-INFORMATIVE for the slow-GPU class
   (fastest available GPU, rAF detects only dropped frames). State the architectural-win evidence (the
   graph never rebuilds) ONLY; the AZ failure-class box stays UNMEASURED; FORBID any "RESOLVED/VALIDATED"
   verb on it. The clip-path waist is the SANCTIONED cross-engine floor (the `@supports not (filter:url())`
   degrade, `morph-field.css:222`); VT survival is FORBIDDEN.

### F-ARM-6 (NEW) · CAP-SCROLLS cross-axis honesty — the `overflow-x: clip` escape

**The HEAD `overflow-x: visible` cross-axis pin is a LATENT NO-OP.** `overflow.css:44` (horizontal scroll)
and `:69` (vertical scroll) declare `overflow-x: visible` / on the cross axis, but CSS Overflow Module L3 §3
forces a single-axis scroll sibling: when one of `overflow-x`/`overflow-y` is a scroll value (`auto`) and
the other is `visible`, the `visible` COMPUTES to `auto`. So the pin is computed away — at HEAD, an opted-in
`.dock-scroll-y` vertical dock has its cross axis clipping (computed `auto`); the only reason the plate does
NOT lozenge is the GEOMETRIC inset (the 80%-of-cell `--dock-control-safe-inset` plate: 0.8 × 1.1-hover =
0.88 < 1, never exceeds the cell). The mechanism is sound by the inset, the CSS pin is decorative.

**THE RESOLUTION (clean-break, mechanically honest):**

1. **Retire the `overflow="scroll"` opt-in (NO-LEGACY).** `useDockShellProps.ts:107`
   `overflow?: "grow" | "wrap" | "scroll"` → drop `"scroll"` (collapses to `"grow" | "wrap"`). A capped axis
   (content exceeds `--dock-max-block-size` / `--dock-max-inline-size`) is INTRINSICALLY a scroll axis —
   `scrollClass` arms whenever the layout-axis content exceeds the cap, independent of any prop. The
   `--dock-max-block-size`/`--dock-max-inline-size` cap is the ONLY knob; the scroll port is automatic.
   SidebarDock sets `--dock-max-block-size` to a viewport anchor so 1280×600 caps + scrolls.
2. **Replace the no-op `visible` with the CORRECT escape.** The cross axis becomes `overflow-x: clip`
   (vertical scroll) / `overflow-y: clip` (horizontal scroll) + `overflow-clip-margin:
   var(--dock-control-safe-inset)`. `clip` is NOT a scroll value, so §3 does NOT force it to `auto` (the
   sibling-degrade rule only fires on `visible`); `clip` establishes NO scroll container; and
   `overflow-clip-margin` extends the clip region outward by the inset budget so the 1.1× hover plate paints
   without clipping. This is the mechanically-honest cross-axis un-clip the `visible` pin only PRETENDED to
   be. The geometric inset stays the primary guard (the clip-margin is belt-and-suspenders).
3. **The rounded-pill clip + the soft edge-fade stay.** `.dock-layers` KEEPS its clip (the rounded pill
   masks the scroll edge, `overflow.css:24-27`); OVERFLOW-FADE adds the soft edge-fade via the `FadingScroll`
   `mask-image` mechanism (sequenced immediately after CAP-SCROLLS, not independently shippable). The Safari
   `mask-image` + `backdrop-filter` compositing fragility on the scroll port is a born-RED C-SAFARI close
   gate (F-ARM-4).
4. **Re-point `proof:dock-plate-clearance` off the impossible cross-axis-visible assertion.** The G2
   "cross-axis is `overflow: visible`" assert is a latent no-op (computed to `auto`); re-point it to
   "cross-axis is `clip` (NOT forced to `auto`) with `overflow-clip-margin` ≥ the inset budget" PLUS the
   surviving geometric guard (resolved painted-plate × `--scale-hover-dock` ≤ the cell, the 0.88 < 1
   inequality per density rung). Test across ALL SidebarDock control types (not `.first()`). Rewrite
   `GlassDock.scroll-overflow.test.ts` (the 8 vitest asserts that break when the vertical-scroll union
   member + the `overflow="scroll"` value drop) + the MIGRATION row.
5. **The UTILITY-REACH bar (1280×600, the binding π).** SidebarDock (post-ℱ-cut: Foundations + N categories
   + facet rail + morph + gear): scrollHeight > clientHeight AND overflow-y:auto AND every trailing utility
   control hit-tests to ITSELF AND the cross-axis inset plate NOT clipped AND `overscroll-behavior: contain`
   (the momentum-trap does not eat page scroll).

### F-ARM-1 / F-ARM-4 / F-ARM-5 — UNCHANGED (the pass-2 build-proven arms stand verbatim)

- **F-ARM-1 (12-laws weight, BUILD-PROVEN).** The analytic-velocity squish: emit `--dock-morph-v =
  clamp(0,|velocity|/V_NORM,1)` off the `SpringProgress (value,velocity)` callback; the additive
  `useLiquidFlex.drive(t, velocity?)` overload (no-velocity path BYTE-IDENTICAL); re-source `--stretch` +
  `--motion-weight` off the analytic velocity (no `|Δt|` channel survives); `--dock-live` BYTE-UNTOUCHED
  (the `clamp(0,--dock-morph-t,1)` anti-detonation cap). Frame-rate independent (Δ=6.4e-5 60/120Hz).
  `pin()` verifies ONLY the squish-free ENDPOINTS; the in-flight weight signature (stretch-at-launch /
  thin-at-arrival / micro-swell at +7.3% overshoot) is the live-GPU close-time π.
- **F-ARM-4 (C-SAFARI, CLOSE-TIME).** Every binding π carries a per-arm WebKit/Metal capture, born-RED
  each, highest-risk first: (1) the teardrop drive + no screen flash (the backdrop-filter dock root under
  per-frame transform — the open WebKit flicker risk; the goo GRAPH is WebKit-correct: regular `filter:url`
  + `color-interpolation-filters:sRGB`, NOT `backdrop-filter:url`); coordinate with WS3 (a lower unified
  dock blur directly reduces the Safari repaint cost — verify the two together). (2) OVERFLOW-FADE
  `mask-image` + backdrop-filter on the scroll port. (3) the facet `--glass-accent` rim. Both modes.
- **F-ARM-5 (useDockSpring + dockLayerFlip, BUILD-PROVEN).** The two-surface factory: `playTo(from,to,
  {onFrame,onSettle})` self-dispose (preserves the always-recreate sites) + the lazy-persistent drag guard;
  parameterized `(response,ζ)`; passes `(value,velocity)`; NO `firstSeat` field-tick. Exactly ONE
  `new SpringProgress` in the dock dir. The gate-lockstep re-points (F3/F1/orchestrator-single
  fold-and-DELETE `useLayerTransition`, born-RED→GREEN in the SAME diff, full `proof:*` suite). F13 fixes
  the stale DOCK_SPRING `0.32/0.7`→`0.68/0.64` in CLAUDE.md:679 + motion-canon.md:195 + tunable-anim.md:63
  (HEAD-confirmed; the reference angle flags a 4th — `useLayerTransition.ts:30` — which evaporates with the
  file delete; ALSO grep `glass.css` + `drawer/constants.ts` for the prose-reference recurrence the
  tranche-history names).

---

## PERSISTENT-CUT (the precise coordinated edit — R5)

The cut is ONE coordinated diff across BOTH docks + the egg chain + the dead leaf — a half-edit silently
kills Foundations nav:

1. **SidebarDock.vue:** delete the ℱ `#persistent` wordmark slot (`:269-296`) + its home separator
   (`:298-312`) + the egg trigger (`fireRedraw` `:177`, `wordmarkPress`/`redrawFired` `:180`, the
   `@dblclick`/`@pointer*` handlers `:279-283`, the `useLongPress` import `:38`).
2. **DROP the `c.id !== "foundations"` filter clause** (`SidebarDock.vue:84`) so Foundations REJOINS the
   roving category tablist (`:386-398`) — ONE tab-stop, `aria-current`, no duplicate (the ℱ-as-Foundations
   dedup intent at `:77-84` must not regress — Foundations is now a normal category chip).
3. **The egg dead-chain:** `FRedrawOverlay.vue` (`AppShell.vue:45` import, `:64-66` `onFRedraw`/`showFRedraw`,
   `:488` markup, the `glass-ui-demo:f-redraw` listener if present), and `demo/eggs/useLongPress.ts`
   (grep-confirmed ONLY consumer is SidebarDock — delete the now-zero-consumer leaf). KEEP `fGlyphPoints.ts`
   (shared with the substrates band).
4. **BottomDock #persistent is KEPT (the directive's "atop BOTH docks" is imprecise).** BottomDock has NO
   ℱ — its `#persistent` is the `PanelLeft` category-Sheet trigger (`BottomDock.vue:210-221`), load-bearing
   mobile nav. Do NOT touch it.
5. **Paint-verify Foundations is reachable in the category nav** (the binding π — a delete-the-slot-only
   edit silently kills it).

The reference angle grounds the cut in the iOS-26 HIG: "glass is the floating NAVIGATION layer, never
content" — the persistent ℱ brand egg is the vanity the content-first tab bar avoids.

---

## FISSION-WIRE / CUT (the DECIDE, not a blind delete — R7 + R-A)

- **`useDockFission` (604L) is WIRED, not dead (A-dock-arch's "1 consumer" CUT proposal is STALE/OVERRULED).**
  HEAD: 5 demo consumers + `GlassDock :splittable` + the published `/dock` + root-barrel export.
  **`BG.W-DOCK-FISSION-WIRE` is a DECIDE** (wire-≥2-real-or-formally-retire, the BB.W-NDA-DECIDE shape), NOT
  a delete. If it cannot reach real ≥2-binary-consumer PAINT this cut, RETIRE-with-rationale (inv-11) — do
  NOT re-book a 4th time (the tranche-history's CHRONIC-1: BE built it, BF specced `DockNowPlaying` which
  never shipped; FISSION-WIRE is the THIRD attempt). Route its spring through `useDockSpring` (keep the
  `proof-dock-fission.mjs:270` self-test grep-shape). Lift `railProjection.ts` `fadeMinAlpha: 0`→a legible
  whisper floor (~0.2) regardless (the C-DOCK "rail facets fade to 0" defect — the receding φ-tier facets
  must stay readable; the reference R-7 macOS-Dock-stack model: all items visible, receding by tier, never
  to 0 alpha).
- **`BG.W-DOCK-CUT` shrinks to `useDockContextSilhouette` (551L, dead — only an `AppSwitcher.vue` COMMENT
  references it; it imports `useBloomUp`) + `useDockMorphWindow` (118L, vestigial).** R7 BLOCKING: WS6/Siri
  must confirm `useDockContextSilhouette` is NOT the contextual-silhouette substrate it wants BEFORE the CUT
  deletes it; if WS6 claims it, route to a wire (≥2 real consumers), else retire `proof:dock-context` + its
  test in the SAME diff as the engine delete (the dead-gate re-point burden — the tranche-history's
  CHRONIC-5: every dock cut reds a registered gate).
- **The 7-wide morph thicket (F14) is NAMED, not built here.** `useMorphField`(468L, LIVE: GooFilter +
  useDockFission), `useGooMorph`(460L, LIVE: CarouselContent + PagerDots + deck), `useLiquidMorph`(462L,
  DEAD — only `manifest.ts`). FISSION-WIRE (a) names the `useMorphField`/`useGooMorph` disposition WITH WS4
  (the n-ary morph-theory dedup is WS4 territory — do NOT bless a duplicate), and (b) makes "no
  carousel/pager goo regression" a PAINT-π (the shared `GooFilter` feeds `CarouselContent.vue:216` +
  `PagerDots`), NOT a grep. `useLiquidMorph` is a clean WS4 cut.

---

## FILES TOUCHED (pass-3 deltas; all pass-1/pass-2 §FILES rows stand)

| File | Arm | Change |
|---|---|---|
| `demo/layout/dock-nav.css` (`.demo-sidebar-rail` + a NEW `[data-shell-dock-orientation="horizontal"]` block + `--demo-nav-top-inset`) | F-ARM-3 | the horizontal resting state = fixed-floating TOP-LEADING; the static-reserve gutter toggle (aside collapse + `<main>` top-reserve), CLS-bounded, committed at settle |
| `demo/layout/AppShell.vue` | F-ARM-3 + F-ARM-2 + INPLACE-MORPH | DELETE the modal stage (`role=dialog` `:501`, `@keydown.esc` `:505`, `morphStageOpen` `:80`, the synthetic two-dock `morphEntries`/`vtOrientation`/`liquidPreview`/`startViewTransition`-wrap `:108-136`, the `#shell-dock-morph-goo` inline filter `:619`, the `:497-720` markup); PRESERVE+re-point the `__shellDockMorph` window seam onto the real shell flip; KEEP the route VT `:220` + the help Dialog |
| `demo/layout/SidebarDock.vue` + `BottomDock.vue` → `demo/composables/useShellNavDock.ts` | F-ARM-3 + PERSISTENT-CUT | DRY the shared nav-loop + morph-button wiring; the in-dock `<DockIconButton>` flip; the ℱ + egg cut + Foundations-rejoin; the responsive swap stays a media query |
| `src/styles/dock/morph-bridge.css` (`.dock-morph-bridge` re-anchor + `--morph-neck-frac` re-tune) | F-ARM-2 | re-parent the bridge to OVERLAY the real dock box (top-leading-anchored), not screen-center; size `contain:paint` to the corner-anchored V/H union; `--morph-neck-frac` UP + plate spans at blur 16 IFF over-fuses |
| `src/styles/dock/overflow.css` (`.dock-scroll-y`/`.dock-scroll-x` cross-axis) | F-ARM-6 | replace the no-op `overflow-x/y: visible` with `overflow-x/y: clip` + `overflow-clip-margin: var(--dock-control-safe-inset)`; cap⟹scroll intrinsic |
| `src/components/custom/dock/composables/useDockShellProps.ts` | F-ARM-6 | retire the `overflow="scroll"` value (→`"grow"|"wrap"`); `scrollClass` arms on the cap crossing, not the prop |
| `scripts/proof-dock-plate-clearance.mjs` (G2) | F-ARM-6 | re-point off the impossible cross-axis-`visible` assert → `clip` + `overflow-clip-margin` ≥ inset + the geometric 0.88<1 guard, per rung, all control types |
| `src/components/custom/dock/composables/railProjection.ts` | FISSION-WIRE | `fadeMinAlpha: 0`→~0.2 (legible whisper floor) |
| `demo/eggs/FRedrawOverlay.vue` + `demo/eggs/useLongPress.ts` (DELETE) | PERSISTENT-CUT | zero-consumer after the ℱ cut |
| `composables/useDockSpring.ts` (NEW) + the F3/F1/orchestrator-single gate re-points + `useLayerTransition.ts` (DELETE) | F-ARM-5 | (pass-2, unchanged) the two-surface factory; born-RED→GREEN in the SAME diff; full `proof:*` suite |
| `scripts/proof-dock-morph-insitu.mjs` (M2/M4) | INPLACE-MORPH | INVERT M2 (`startViewTransition`+`vtOrientation` = shipped default) → teardrop-only no-modal no-VT; RETIRE M4 (no perf-gated ship decision); IN LOCKSTEP with the AppShell VT-crossfade delete |
| `CLAUDE.md:679` · `motion-canon.md:195` · `tunable-anim.md:63` (+ grep `glass.css`/`drawer/constants.ts`) | MORPH-UNIFY | DOCK_SPRING `0.32/0.7`→`0.68/0.64` |

---

## WAVE BREAKDOWN (the 11-wave sequence is UNCHANGED; pass-3 re-binds three arms)

UNIFY → BUSY-SINGLE → CUT → DECOMPOSE → FISSION-WIRE → PERSISTENT-CUT → CAP-SCROLLS → OVERFLOW-FADE →
SHELL-DOCK-DRY → **INPLACE-MORPH** → STORY-MODULARIZE (`BG.W-DOCK-UTILITY-REACH` stays FOLDED as the
1280×600 reachability arm of CAP-SCROLLS). Pass-3 attaches:

- **`BG.W-DOCK-CAP-SCROLLS`** gains the F-ARM-6 cross-axis honesty: retire the `overflow="scroll"` opt-in;
  cross axis = `clip` + `overflow-clip-margin` (NOT the no-op `visible`); re-point `proof:dock-plate-clearance`
  off the impossible G2 assertion; the 1280×600 UTILITY-REACH π. **OVERFLOW-FADE sequences immediately after**
  (the soft edge-fade is not independently shippable to the bar; the Safari mask+backdrop close gate).
- **`BG.W-DOCK-PERSISTENT-CUT`** gains the precise coordinated-diff shape (the ℱ slot + the foundations-filter
  drop + the egg chain + the `useLongPress.ts` delete + the BottomDock-#persistent KEEP) — one diff, Foundations
  paint-verified reachable.
- **`BG.W-DOCK-INPLACE-MORPH`** (headline) gains: the F-ARM-3 TOP-LEADING landing (corner-pinned reshape,
  static-reserve gutter toggle, no bottom-bar collision) + the P1 ESCALATION gate against the always-present
  BottomDock; the F-ARM-2 dock-anchored bridge re-parent + the 3-axis goo tune + the F6 goo-id re-point
  born-RED gate + the P2 painted-coherence capture; the F-ARM-1 analytic-velocity squish; the F-ARM-4 Safari
  close gate. It flips `proof:dock-morph-insitu` M2/M4 born-RED→teardrop-only IN LOCKSTEP with the AppShell
  VT-crossfade delete (the `:220` route VT STAYS — the grep must not collateral it).

No new waves are minted.

---

## ACCEPTANCE / REAL-PAINT-π BAR (pass-3 additions; the pass-1/pass-2 bars stand in full)

**Grep / structural (CI, device-free):**
- F-ARM-6: `overflow="scroll"` value GONE from `useDockShellProps`; the cross axis is `clip` +
  `overflow-clip-margin` (NOT `visible`); `proof:dock-plate-clearance` re-pointed off the cross-axis-visible
  assertion; `GlassDock.scroll-overflow.test.ts` rewritten; MIGRATION row.
- PERSISTENT-CUT: zero ℱ `#persistent` in SidebarDock; the `c.id !== "foundations"` filter GONE; `useLongPress.ts`
  + `FRedrawOverlay.vue` DELETED (zero remaining consumers); BottomDock `#persistent` PanelLeft KEPT.
- F-ARM-2: zero `#shell-dock-morph-goo`; the in-place teardrop references `#dock-morph-goo`; the bridge is
  dock-anchored (not screen-centered) in the in-place path; `--morph-neck-frac` ≥ 0.62 (the static graph
  untouched); `proof:morph-showcase` M2/M5 + `proof:metaball-bridge2` B5/B6 GREEN.
- `railProjection` `fadeMinAlpha` ≥ ~0.2.
- (pass-2, unchanged) one `new SpringProgress` in the dock dir; F3/F1/orchestrator-single re-pointed in the
  SAME diff; `useLayerTransition.ts` fold-and-DELETED; `proof:dock-morph-insitu` M2/M4 flipped teardrop-only
  in lockstep with the VT-crossfade delete; zero `startViewTransition` in the V↔H path (the `:220` route VT
  survives); DOCK_SPRING note `0.68/0.64` everywhere.

**Live π (real GPU, the binding paint):**
- **In-place landing (P1, the headline):** the morphed-horizontal SidebarDock lands TOP-LEADING as a
  fixed-floating capsule, NO collision with the always-present bottom story dock; the corner-pinned reshape
  reads coherent on the REAL in-flow SidebarDock; the one-time `<main>` gutter reflow is CLS-bounded (static
  reserve, no animated height); the V↔H travel anchor distinct from the collapse center-out anchor; the
  V↔H-vs-collapse serialization shows no double-deform; the nav is `inert` during flight + the morph button
  retains focus; the morph state does not fight the 768px breakpoint. **ESCALATE if it does NOT read coherent.**
- **Teardrop budget (P2):** the dock-anchored bridge occludes the corner-pinned reshape BOTH directions; the
  PAINTED goo at blur 16 reads as a COHERENT FUSED teardrop (not the lone-dot over-fusion — re-tune
  neck-frac/spans if it is); the endpoint frames `t∈[0,0.18]`/`[0.82,1]` show the real docks alone cover the
  reflow; PRM single-paint (zero neck frame); the M5-Max timing framed ARCHITECTURAL-only, the AZ slow-box
  UNMEASURED (never "RESOLVED").
- **CAP-SCROLLS (1280×600):** SidebarDock scrollHeight > clientHeight AND overflow-y:auto AND every trailing
  utility hit-tests to itself AND the cross-axis inset plate NOT clipped (cross-axis is `clip` not forced
  `auto`) AND `overscroll-behavior:contain`; the soft edge-fade reads.
- **12-laws weight (close-time):** the LIVE-spring V↔H frame-series — `--stretch` tracks `--dock-morph-v`,
  stretch-at-launch / thin-at-arrival / micro-swell at +7.3% overshoot, identical 60/120Hz.
- **Paint identity (M1/M2):** collapse + layer-swap byte-identical both modes; PRM synchronous seat (no
  10×74 sliver); a rapid mid-morph re-press shows no scalar-write gap on the `playTo` dispose+recreate.
- **C-SAFARI (every arm):** WebKit/Metal capture for the morph (drives, no flash, reads as liquid glass —
  the backdrop-filter dock root under per-frame transform), the cap-scroll soft-edge, the facet rim — both
  modes, born-RED each.

---

## FOLDED DEFERRED ITEMS (no silent drop; all pass-1/pass-2 items stand)

- **The TOP-LEADING landing (NEW):** chosen over top-center for goo-occlusion safety (shared top-leading
  corner → minimal travel). Top-center (symmetric with the BottomDock) is the P1 visual-polish alternative
  IF the corner-pinned occlusion proves robust AND the build-proof shows top-leading reads cluttered — but
  it requires a path-following bridge re-geometry (the centered/corner neck cannot cover a left→center
  translation), so it is a fallback, not the default.
- **The `<main>` reflow model (NEW):** static-reserve toggle on `[data-shell-dock-orientation]`, committed
  at SETTLE (not the live 0.5 crossing), so a mid-flight interruptible reversal nets ZERO reflow; CLS-bounded
  by static reserves (never animated height). The dead-gutter alternative is REJECTED.
- **The 3-axis goo character (NEW):** blur 7→16 AND slope 20→14 AND offset −9→−7 — not "blur only";
  neck-frac + plate-span tune at blur 16, the static graph untouched.
- **The cross-axis-pin no-op (NEW):** `overflow-x: visible` is computed to `auto` (CSS Overflow §3); the
  honest escape is `clip` + `overflow-clip-margin`; the geometric 80%-inset plate is the primary guard.
- **The PERSISTENT-CUT coordination (NEW):** the foundations-filter drop is the load-bearing half a
  slot-only delete misses.
- **FISSION-WIRE is a DECIDE, not a blind delete (R-A):** wire-≥2-real-or-retire-with-rationale (inv-11),
  no 4th re-book; `fadeMinAlpha` floor lifted regardless; the 7-wide thicket disposition named WITH WS4.
- **All pass-1/pass-2 §FOLDED DEFERRED items stand** (V_NORM build-time constant; the no-velocity `drive(t)`
  fence; the clip-path fallback framing; the `containerName`-freezes-morph clamp; the DOCK_SPRING byte-fence;
  the cross-WS blur/cast/n-ary-dedup hand-offs; R7 WS6-sign-off blocking the CUT; the file-count ~24 is
  DIRECTIONAL not a hard bar).

---

## OPEN RISKS (pass-3 residual)

- **R1 (the headline, can falsify) — the TOP-LEADING landing is RESOLVED IN-SPEC but BUILD-UNPROVEN.** The
  corner-pinned top-leading reshape + the static-reserve gutter toggle is the committed resolution; P1
  build-proves it reads coherent against the always-present BottomDock. If it does NOT (top-leading crowds
  the page header / the lift-at-press `<main>` widen is jarring / two-bar reads cluttered), ESCALATE BEFORE
  INPLACE-MORPH builds (top-center + path-following bridge, then crossfade; VT forbidden).
- **R2 (the unmeasurable box) — the AZ slow-Metal box stays UNMEASURED.** Architecturally sound (graph never
  rebuilds, M5-Max verified); the slow-box timing is unmeasurable on this Mac. The clip-path floor is the
  only sanctioned fallback if it meaningfully misses (VT forbidden), triggering the dir-wide dual-path
  decision.
- **R3 (goo coherence at blur 16) — the 3-axis softening could over-fuse.** P2 captures + re-tunes;
  neck-frac/plate-spans only, the static graph stays.
- **R6 (C-SAFARI, cardinal) — zero HEAD verification.** Per-arm WebKit/Metal capture at close; the
  backdrop-filter blur under per-frame repaint is the open flicker risk; coordinate with WS3 (lower unified
  dock blur reduces the cost).
- **R4 — concurrency:** the dock dir is the densest shared surface; serialize dock-dir ownership (one agent
  at a time). `AppShell.vue` is co-owned with WS1 (route VT `:220` STAYS; only the modal VT `:131` deletes).
- **R7 — the gate-lockstep multi-fact born-RED set** (F3 both loop entries, F1 three facts,
  orchestrator-single + its detect.test + public-surface ×2): enumerate ALL facts up front; run the FULL
  `proof:*` suite before any % is claimed; a missed fact is a silent red.

---

## PASS-3 PROTOTYPE FRONTIER (what must be build/design-proven before the spec is trusted)

| Prototype | Falsifies | Mode |
|---|---|---|
| **P1 — TOP-LEADING landing vs the always-present BottomDock** | R1 (the headline collision) | implement |
| **P2 — dock-anchored goo bridge at blur 16 over the corner-pinned reshape** | R2 + R3 (occlusion + 3-axis) | implement |
| **P3 — CAP-SCROLLS `overflow-x: clip` + clip-margin at 1280×600** | R8 (cross-axis honesty + reach) | implement |
| **P4 — useDockSpring 5→1 + the gate-lockstep re-points, FULL `proof:*` suite** | R7 (the gate blocker) | implement |
| **P5 — PERSISTENT-CUT coordinated diff (Foundations rejoins + egg cut + useLongPress delete)** | R5 (the half-edit) | spec |

Each falsifies a load-bearing pass-3 resolution. P1 is the headline (it can ESCALATE the whole headline
wave); P2 is the deeper occlusion falsifier; P3/P4 are the mechanism blockers; P5 de-risks the
coordination-fragile cut. C-SAFARI + the live-GPU weight signature stay close-time (the harness cannot run
real-Metal/WebKit).
