# RESEARCH-dock-layer-anim — the dock LAYER-SWAP animation SOTA, red-teamed to perfection

**Lane** RESEARCH-dock-layer-anim (hardening challenge) · **HEAD** `89edffc` (3.8.0 + conv-1/2 +
W45 DEVELOPED + pass-3 ledger) · **Mode** read-only PLANNING / RESEARCH (no code) ·
**Date** 2026-06-09 · **Verdict** WEAK

Scope: the dock LAYER-SWAP MOTION ITSELF — the pane-to-pane transition inside a
`<DockLayerGroup>` (and the outer collapse↔expand) — measured against the Apple app-switcher /
shared-element / iOS dock-morph SOTA. NOT the rail mechanics (that is the sibling lane
`DOCK-layers-rail.md` L1-L9: phantom indicator, rail clock, collapse dead-end, FLIP-engine drift,
same-size cut, APG, order). This lane asks the orthogonal question: **the layer swap is a
symmetric one-clock CROSSFADE + size-morph — is that the PERFECTED swap, or is the SOTA a
DIRECTIONAL / SHARED-ELEMENT / parallax-depth model the tranche has nowhere planned?**

The answer: the current swap is a competent crossfade but it is NOT the SOTA. The
`directionTypes` forward/back computation is **dead plumbing**; there is NO directional travel, NO
shared-element continuity, NO depth/parallax; and — the headline — **no AX wave researches or owns
the layer-swap AS A MOTION**. Every disposition treats it as crossfade-and-resize. The recipe for
the perfected swap is below.

---

## The current model (what HEAD actually does)

A pane swap inside `<DockLayerGroup>` runs ONE thing visually:

1. **Box size-morph** — `useLayerTransition.ts` / `dockMorphContext.ts` measure the from→to
   shrink-wrapped size (the one-time FLIP), pin, and drive `--dock-morph-t` 0→1 on one
   `SpringProgress`. CSS interpolates `inline-size`/`block-size` off the scalar
   (`dock.css` `--dock-morph-size`).
2. **Opacity crossfade** — the leaving pane fades `opacity: calc(1 - var(--dock-morph-t))`
   (`dock.css:1011-1014`), the arriving pane is statically `opacity:1` and **revealed by the clip
   aperture** (the box growing uncovers it). No directional motion on either pane.
3. **Child stagger** — the arriving pane's direct children ramp opacity+`translate-y` off
   `--dock-expand-t` with per-child onsets (`dock.css:1072-1122`).

So a swap from layer A to layer B reads as: A fades out in place, the box resizes on a spring, B is
uncovered behind the aperture, B's children stagger up. **Symmetric** — A→B looks identical
whether B is "to the right of" or "to the left of" A in the rail. There is no spatial direction,
no element that persists across the swap, no depth.

---

## CHALLENGES THAT FOUND A WEAKNESS (falsifiable, source-grounded)

### R1 — `directionTypes` is DEAD PLUMBING. The forward/back direction is COMPUTED and then explicitly DISCARDED. The swap is provably non-directional.
`DockLayerGroup.vue:109-113` computes a real directional hint:
```js
directionTypes: (from, to) => {
    const fromIdx = layers.value.findIndex((l) => l.id === from);
    const toIdx = layers.value.findIndex((l) => l.id === to);
    return [toIdx < fromIdx ? "layer-back" : "layer-forward"];
}
```
But `useLayerTransition.ts:50-54` states verbatim that the option is **"accepted and ignored"**:
> *"The single-scalar morph runs ONE symmetric spring on every engine, so the direction hint is no
> longer a curve fork — it is accepted and ignored. Kept so the call sites need no edit."*

And the nested path (`dockMorphContext.ts`) does not even accept a `directionTypes` parameter —
`DockMorphGroupRegistration` (`:41-48`) has only `containerEl`/`activeLayer`/`axis`. So a nested
`DockLayerGroup` (the COMMON case, inside a `<GlassDock>`) has NO direction signal at all, and the
standalone case computes one and throws it away. **Falsifiable:** `grep -rn 'layer-forward\|layer-back'
src/` → the strings appear ONLY at the dead `DockLayerGroup.vue:112` producer site;
`grep -rn 'directionTypes' src/` → declared in the interface (`useLayerTransition.ts:54`), passed
once (`DockLayerGroup.vue:109`), consumed NOWHERE. This is a CHRONIC dead-plumbing smell: a direction
type system that was authored, retired (the W01 VT-collapse retirement at `view-transition.css:47-58`),
and never deleted — it survives as a comment-justified no-op the overfitting audit should have caught.
**HARDENING:** either DELETE `directionTypes` (it is overfit dead substrate) or — the correct
gestalt — make it LOAD-BEARING by driving a directional swap off it (R5 below). It must not stay a
no-op the call site pays for.

### R2 — The swap is SYMMETRIC where the SOTA is DIRECTIONAL. There is no spatial mental model: A→B and B→A read identically, so the rail order conveys nothing.
The iOS/macOS idiom for a horizontal switcher (segmented control panels, app-switcher cards, Music
"now playing" pages) is **directional travel**: moving to a later panel slides the new content in
from the trailing edge while the old slides out the leading edge; moving back reverses it. The
direction is the spatial anchor — it tells the user *where* the new content came from and reinforces
the rail's left-to-right ordering. The dock swap has none of this: the leaving pane fades in place
and the arriving pane is uncovered by the box growing, identically in both directions. So a rail
with tabs `[Assets | Layers | Libs]` gives the user no motion cue that Libs is "to the right of"
Assets — the swap is a dissolve regardless. This is a real expressiveness gap vs the named SOTA
(the App Store/Music shared-namespace transitions, the iOS segmented-control matched-geometry slide).
**Source for the SOTA:** CSS View Transitions L2 ships directional types — assign `forwards` when
transitioning to a higher index and `backwards` for a lower one, each customizable in CSS to slide
opposite directions, with a `--direction: 1 | -1` variable feeding the transform sign
([web.dev SPA view-transitions]; [csswg VT-2]). The dock COMPUTES exactly this index delta (R1) and
discards it. **HARDENING:** drive a directional inline/block translate on the leaving + arriving
panes off the `layer-forward`/`layer-back` sign × `--dock-morph-t`, so the swap reads as the panes
SLIDING in the rail's direction, not dissolving. The size-morph stays on the spring (it is correct);
the directional translate is ADDITIVE on the same scalar (still ONE clock).

### R3 — There is NO shared-element / matched-geometry continuity. An icon/label that exists in BOTH the leaving and arriving pane HARD-CUTS instead of flowing. The keyframes-dock "selected element" model is unmet for the swap.
The defining SOTA primitive — SwiftUI `matchedGeometryEffect` / `glassEffectID`, and its web
transposition `view-transition-name: match-element` / a per-element `view-transition-name`
([createwithswift matched-geometry]; [Chrome element-scoped VT]; [MDN view-transition-name]) — is
that an element present in both states FLOWS between its old and new geometry (the App Store card →
detail, the Music thumbnail → full art, the segmented-control selected pill). The dock has ZERO
shared-element machinery for the pane swap: each pane is an independent grid cell, the leaving one
fades, the arriving one is uncovered. If two panes share a header icon, a metric badge, or a "now
playing" glyph, it disappears and reappears rather than gliding. This is precisely the
keyframes-dock "the selected element is the model" register the user named (USER-DEFECTS pass-3:13)
— but at HEAD it is wired only for the dock-CONTROL active fill (W61's concern), never for an
element that PERSISTS ACROSS A LAYER SWAP. **Falsifiable:** `grep -rn 'view-transition-name\|match-element\|matchedGeometry\|glassEffectID\|shared.element' src/components/custom/dock/` → only the
ROUTE-morph seam on the GlassDock ROOT (`GlassDock.vue` `rootVtStyle`, for a whole-dock page/route
geometry-morph) and the stack-level `gl-dock-stack-${id}` group name (`DockLayerGroup.vue:128-135`,
gated `supportsVT` but UNUSED by the active FLIP path) — NOTHING at the per-element pane-content
level. **HARDENING:** add an opt-in shared-element seam — a `DockLayer` (or a child) marks an
element with a stable cross-pane id; on swap, that element flows from its leaving-pane geometry to
its arriving-pane geometry (FLIP-measured, on the same `--dock-morph-t` spring, OR a scoped View
Transition for the element-level case). This is the W42 `morphId` bifurcation applied to the LAYER
SWAP, which W42 does not currently name as a consumer.

### R4 — The View-Transitions path was RETIRED for the BOX morph (correctly) but the retirement CONFLATED it with the PANE-CONTENT swap — throwing out the one primitive the swap actually wants.
`view-transition.css:47-58` retired the dock VT recipe with sound reasoning: *"VT crossfades
RASTERIZED snapshots — the wrong primitive for a layout morph (the 'taffy'-stretch + text-blur +
uncaptured-animating-ancestor desync + the co-mounted-docks snapshot-DROP)."* That is correct FOR
THE BOX SIZE-MORPH — a continuously-resizing container must be a live layout interpolation (the
spring + FLIP), not a snapshot stretch. **But the retirement deleted the
`:active-view-transition-type(layer-forward|layer-back)` ASYMMETRIC CURVE FORK along with it** —
and the directional pane-CONTENT slide is exactly the case VT (or a scoped equivalent) is built
for and the spring-FLIP is NOT. The box and the content are TWO transitions with DIFFERENT correct
primitives: the box wants live-resize (spring), the content swap wants directional travel /
shared-element (the retired VT types, or an equivalent translate off the scalar). By retiring both
under one "VT is wrong for layout morph" verdict, W01 left the content swap as a bare crossfade with
no directional or shared-element expression — the baby with the bathwater. The
`stackVtStyle`/`gl-dock-stack` name (`DockLayerGroup.vue:128-135`) is a vestige of this — it sets a
`view-transition-name` on the stack but the active FLIP path never calls `startViewTransition`, so
it is dead decoration. **Falsifiable:** `stackVtStyle` is computed + bound (`:230`) but no
`startViewTransition` call exists in `useLayerTransition.ts` / `dockMorphContext.ts` (`grep -n
startViewTransition src/components/custom/dock/` → 0). **HARDENING:** keep the box on the spring
(correct), but re-introduce the directional pane-content expression — NOT via VT-snapshot
(rasterization is real), but via a directional `translate` on the live panes off the
`layer-forward/back` sign × `--dock-morph-t` (R2), so the content slides directionally while the box
resizes on the same scalar. Delete the dead `stackVtStyle` if the element-level shared seam (R3)
does not adopt it.

### R5 — The "one symmetric spring on every engine" thesis (W01) OVER-ROTATED: it killed the directional curve fork to fix a multi-clock desync, but a directional TRANSLATE is not a second CLOCK — it is one more `calc()` off the SAME scalar. The simplification threw out a feature it did not have to.
W01's correct insight was ONE CLOCK (`--dock-morph-t`) for every axis — the box, the crossfade, the
stagger all read the one scalar, so an interrupted/retargeted swap carries everything in lockstep
(`useLayerTransition.ts:5-35`). The W01 reasoning then concluded the direction hint "is no longer a
curve fork — accepted and ignored" (`:50-54`). **But conflating "no second CLOCK" with "no
DIRECTION" is the over-rotation.** A directional slide is `translate: calc(var(--dir) * (1 -
var(--dock-morph-t)) * var(--swap-travel))` on the arriving pane and the mirror on the leaving pane
— a pure FUNCTION of the SAME `--dock-morph-t` scalar, ONE clock, fully interruptible (the retarget
carries the translate exactly as it carries the crossfade). The `--dir` is the `layer-forward/back`
sign R1 already computes. So the directional swap costs ZERO extra clocks and ZERO extra engines —
it is one CSS variable (`--dir`, set per-swap) and two `calc()`s. W01 was right to kill the
parallel CSS-transition clock; it was wrong to infer that direction itself had to go. **HARDENING:**
the perfected swap is the W01 single-scalar discipline KEPT, with `--dir` threaded as a per-swap
sign the leaving/arriving translates read — the simplification preserved, the expressiveness
restored.

### R6 — No DEPTH / PARALLAX dimension on the swap. The iOS app-switcher and Liquid-Glass layer model is multi-plane (cards at different z, a subtle scale/blur on the outgoing layer); the dock swap is flat (single plane, opacity only).
The iOS app-switcher SOTA the lane names is explicitly a DEPTH transition: the outgoing card scales
down + recedes (a z-translate / scale + a slight blur) while the incoming comes forward, giving the
swap a stacked-plane feel rather than a flat dissolve ([designcode parallax-rotation-3D];
[medium 3D-parallax SwiftUI]). The dock swap has NO depth axis: both panes live on grid-area 1/1 at
the same plane, the only differentiator is opacity. For the dock's smaller scale a full 3D card
recede is overkill, but a **subtle scale-recede on the leaving pane** (`scale: calc(1 - (1 -
var(--dock-morph-t)) * var(--swap-recede, 0.04))`) — again a pure `calc()` off the one scalar — would
give the swap the iOS "the old layer drops back as the new comes forward" read at near-zero cost.
This is the Liquid-Glass "selected tile lifts a glass tier" register (W61) applied as MOTION rather
than a static fill. **HARDENING:** add an optional `--swap-recede` depth scalar (off `--dock-morph-t`,
PRM-gated) so the leaving pane recedes subtly as the arriving advances — the multi-plane read the
flat crossfade lacks. Token-gated default-low (≈4%) so it is a garnish, not a gimmick.

### R7 — The whole concern is UN-OWNED. No AX wave researches or builds the layer-swap as a motion. §19.2 was dispositioned to W02 as "crossfade + size FLIP"; W42 is self-reshape; W61 is composition. The directional/shared-element/depth gap falls through every wave's bounds.
The headline structural finding. Tracing every wave that touches the layer swap:
- **§19.2 → W02** (`dock-facilities-corpus`, DOCK-FACILITIES.md:23): the disposition is *"single-
  orchestrator fold"* with the GO criterion *"the leaving pane fades cleanly under the arriving"* —
  i.e. the swap is canonically a CROSSFADE + size FLIP. W02 is DONE (`W02-orchestrator-fold.json`).
  It made the swap one-clock; it did not make it directional/shared/depth and was never scoped to.
- **W42 (liquid-morph substrate)** — `AX.W42:157-161` BIFURCATES the matched-geometry seam:
  spring+FLIP for an element's OWN reshape, VT `morphId` for a shared-element/ROUTE morph. But its
  named second consumer (Open Q2, `:577-585`) is a tab-indicator glide OR a card→detail expand —
  NOT the dock LAYER SWAP. W42 generalizes the engine; it does not name the pane-to-pane directional
  or shared-element swap as a consumer, and `useLayerTransition` is lifted as a thin wrapper that
  PRESERVES the symmetric crossfade (`:218`, *"re-derive as a thin dock-flavored wrapper"* — same
  behaviour, new substrate).
- **W61 (dock-unify-root)** — composition, collapsed-pill size, glass-first SELECTED FILL. Zero
  swap-motion scope (the glass-first is a static fill, not a transition).
- **W06** — rail mechanics + CSS carve + story content. The rail INDICATOR travel, not the pane swap.

So the directional/shared-element/depth swap-motion gap is owned by NO wave. The
`dock-facilities-corpus` even names "matched-geometry" — but ONLY in the §19.11/W42 SELF-RESHAPE
sense (pill↔card↔circle), explicitly narrowed away from "matched-geometry into anything," and NEVER
applied to the LAYER SWAP. **Falsifiable:** `grep -rn 'directional\|shared-element\|app-switcher\|
slide' docs/tranches/AX/waves/` → no wave spec scopes a directional or shared-element LAYER-SWAP;
the only "slide" hit is the W42 gloss. **HARDENING:** mint the wave (R-action 1).

---

## CHRONIC DEFERRALS / MISSES (slip-history)

- **CHRONIC-R1 — the directional layer transition has been authored-then-retired-then-orphaned
  across FOUR tranches without ever being DELETED or made load-bearing.** The `directionTypes` /
  `layer-forward`/`layer-back` system was authored at **AW.W3** (`DockLayerGroup.vue:105-113` comment
  "AW.W3 — typed directional intent"), wired into a VT `:active-view-transition-type` curve fork
  (the retired `view-transition.css` recipe), then **AX.W01** retired the VT path and made the hint
  "accepted and ignored" (`useLayerTransition.ts:50-54`), and at HEAD it is STILL computed +
  discarded. Four tranches (AW author → AX.W01 retire → W02 fold → HEAD) and the dead producer site
  survives, the consumer never returned. This is the classic overfit-dead-substrate the overfitting
  audit precept targets ("every src/ artefact has ≥2 sites or is exported or is private demo helper")
  — `directionTypes` has ONE producer site, ZERO consumers, and is not exported. It should have been
  deleted at W01 (clean break) OR restored as load-bearing; instead it limps as a no-op the call site
  still pays a closure for.

- **CHRONIC-R2 — the dock VT seam is a SHIPPED-BUT-DEAD decoration (the `stackVtStyle` /
  `gl-dock-stack` name).** `DockLayerGroup.vue:120-135` computes a `view-transition-name` +
  `view-transition-class: gl-dock-layer` on the stack, gated `supportsVT`, "so the FLIP fallback
  path keeps its plain box." But the active FLIP path NEVER calls `startViewTransition` — so the
  name is set on an element the dock never transitions via VT. It is a vestige of the retired VT
  recipe (the AQ.W6 "on a View-Transitions engine the layer-stack size morph is owned by the
  browser" comment at `:120-124` describes a code path that no longer exists post-W01). A
  `view-transition-name` with no `startViewTransition` is inert. This is the same dead-decoration
  class as CHRONIC-R1 — VT scaffolding the W01 retirement left standing. Slip: shipped on the
  publish surface since AQ.W6, never cleaned at W01/W02.

- **CHRONIC-R3 — the swap-motion quality has NO captured live DELTA, ever.** There is no
  `audit/visual/` capture of a layer swap (the sibling `DOCK-layers-rail.md` CHRONIC-L4 confirms the
  same for the rail). W02 closed on `W02-orchestrator-fold.json` + `W02-DELTA.md`, but a DELTA of a
  ONE-CLOCK crossfade is not a DELTA of swap-MOTION QUALITY — it proves the box+crossfade co-settle,
  not that the swap reads as a directional/spatial transition (it does not, by construction). So the
  swap motion has been marked sound across W02→W45 with zero captured evidence of its
  expressiveness — the cardinal-lesson inflation, applied to a feature that was never actually
  built (you cannot DELTA-capture a directional swap that does not exist). The slip is structural:
  the swap was judged "complete" against a crossfade bar, not the SOTA bar this lane sets.

---

## HARDENING ACTIONS (to PERFECT the dock layer swap — PLANNING, no code)

1. **MINT a wave: `dock-layer-swap-SOTA` (the directional + shared-element + depth layer
   transition).** No wave owns it (R7). Scope, all on the W01 single-scalar discipline (ZERO new
   clocks/engines):
   - **(a) Directional slide.** Make `directionTypes`/`layer-forward`/`layer-back` LOAD-BEARING:
     set a per-swap `--dir: 1 | -1` (the index sign R1 computes) on the morph root, and add a
     directional `translate` on the leaving + arriving panes — `translate: calc(var(--dir) * (1 -
     var(--dock-morph-t)) * var(--dock-swap-travel))` (mirror sign on the leaving pane). One `calc()`
     off the existing scalar, one new token. Thread the sign into the NESTED path too (add `--dir`
     to `DockMorphGroupRegistration` — the nested case has NO direction signal at HEAD, R1).
   - **(b) Fixed-anchor rule.** Per the SOTA ([web.dev SPA]): the box CHROME / the rail / any
     persistent header must NOT translate with the panes — only the swapping CONTENT slides, so the
     user keeps a spatial anchor. The clip aperture already pins the box; ensure the directional
     translate is scoped to `.is-active`/`.is-leaving` pane content, not the container.
   - **(c) Shared-element seam (the keyframes-dock model for the swap).** An opt-in per-element
     cross-pane id; an element present in both panes FLIPs from its leaving to its arriving geometry
     on the same `--dock-morph-t` spring (the W42 `morphId` bifurcation applied to the layer swap —
     name the LAYER SWAP as a W42 consumer, which it currently is NOT).
   - **(d) Optional depth recede.** `--dock-swap-recede` (default ≈0.04): the leaving pane
     `scale: calc(1 - (1 - var(--dock-morph-t)) * var(--dock-swap-recede))` — the iOS multi-plane
     read (R6). PRM-gated (no translate/scale/recede under reduce — the swap collapses to the current
     instant crossfade, which is the correct PRM degrade).
   - All four are `calc()`s off the ONE scalar — the W01 thesis PRESERVED, the expressiveness
     RESTORED. Close on a real-device paired-π DELTA of A→B AND B→A (proving they now differ
     directionally), a shared-element flow capture, and a PRM-snap capture.

2. **Delete OR adopt the dead VT scaffolding (CHRONIC-R1/R2).** Either DELETE `directionTypes` +
   `stackVtStyle` + `gl-dock-stack` (clean break — they are overfit dead substrate) OR — if action 1
   lands — make `directionTypes` the `--dir` source and the shared-element seam the `stackVtStyle`
   consumer. No middle ground: a no-op the call site pays for is the anti-pattern. Recommend ADOPT
   (action 1 makes them load-bearing); fall back to DELETE if action 1 is deferred. Route through
   the overfitting audit (the precept that should have caught this).

3. **Prototype the directional swap to de-risk the "is one extra translate a second-driver race?"
   question (it is not — but PROVE it).** A 30-line π-lane spike: a 3-pane `DockLayerGroup`, a
   directional translate off `--dir × --dock-morph-t`, a mid-flight A→B→C retarget. Confirm the
   translate carries velocity-continuous WITH the crossfade + box (one clock, no desync) — the same
   `proof:dock-animation-live` deterministic-FLIP harness, extended to assert the directional travel
   sign flips on a back-swap and lands flush. This proves R5's "ZERO extra clocks" claim before the
   wave drives.

4. **Name the LAYER SWAP as a W42 second-consumer candidate (or the dedicated wave's).** W42's
   bifurcated matched-geometry seam (`:157-161`) is the exact substrate the shared-element swap needs,
   but W42's named consumers (tab-indicator / card→detail) do NOT include the dock pane swap. Either
   add the layer swap to W42's consumer list (it exercises the `morphId` seam genuinely) OR have the
   dedicated swap wave compose the W42 substrate. Coordinate so the shared-element flow is ONE
   facility, not a dock-private re-roll (the W42 thesis).

5. **Capture the binding paired-π DELTA the swap has NEVER had (CHRONIC-R3).** A→B vs B→A
   (directional difference), a shared-element-present pane pair (the element flows, not cuts), a
   same-size pane pair (re-checking the sibling-lane L5 hard-cut under the new model), and a
   collapse-while-swapping, at ≥2 viewports × light/dark, to `audit/visual/`. The DELTA must show the
   swap reads as a SPATIAL transition, not a dissolve — the bar this lane sets.

---

## dockPerfection (gap-to-PERFECTION, layer-swap motion)

The layer-swap engine has SOTA BONES — one spring, one clock, FLIP, velocity-continuity, the W02
single-orchestrator fold, the DK7 scalar-driven crossfade. But the SWAP AS A MOTION is NOT perfect;
it falls short of the named app-switcher / shared-element / iOS dock-morph SOTA on SIX concrete axes:
(1) `directionTypes` is dead plumbing — the forward/back sign is computed and explicitly discarded,
so the swap is provably non-directional (R1); (2) the swap is a SYMMETRIC crossfade where the SOTA
is a DIRECTIONAL slide — A→B and B→A read identically, so the rail order conveys no spatial model
(R2); (3) there is NO shared-element / matched-geometry continuity — an element in both panes
hard-cuts instead of flowing, the keyframes-dock "selected element" model unmet for the swap (R3);
(4) the VT directional curve fork was retired ALONGSIDE the (correctly-retired) box-snapshot morph,
conflating two transitions with different correct primitives and throwing out the content-swap
expression (R4); (5) the "one symmetric spring" thesis over-rotated — a directional translate is one
`calc()` off the SAME scalar, NOT a second clock, so the simplification killed a feature it did not
have to (R5); (6) the swap is FLAT — single-plane opacity-only, no depth/parallax recede, where the
iOS app-switcher is multi-plane (R6); and structurally, the whole concern is UN-OWNED — no AX wave
researches or builds the layer-swap as a motion (R7). To PERFECT: mint the directional +
shared-element + depth swap wave (every axis a `calc()` off the existing `--dock-morph-t`, the W01
single-clock discipline PRESERVED), make `directionTypes` load-bearing (or delete it), name the
layer swap as a W42 shared-element consumer, prototype the directional translate to prove zero extra
clocks, and capture the paired-π DELTA the swap has never had — A→B differing from B→A as the proof
the swap finally reads as a spatial transition, not a dissolve.

---

## SOTA references (the corpus this recipe is grounded in)

- **Directional view-transition types + `--direction` sign + the fixed-anchor rule** — the
  forwards/backwards type system, the `--direction: 1 | -1` transform variable, and the "the header
  must not move so the user keeps a spatial anchor" rule: [web.dev — View transitions for SPAs];
  [CSS View Transitions Module L2, csswg drafts].
- **Shared-element / matched-geometry** — `view-transition-name` per matched element + `match-element`
  for list items; SwiftUI `matchedGeometryEffect` (the Music/App Store hero transition) and its
  `glassEffectID` Liquid-Glass analog: [MDN — view-transition-name]; [Chrome — element-scoped view
  transitions]; [createwithswift — Matched Geometry Effect]; [nilcoalescing — matched geometry in a
  custom segmented control].
- **Depth / parallax multi-plane swap** — the app-switcher recede + scale + subtle blur stacked-plane
  read: [Design+Code — Parallax and Rotation 3D]; [Medium — 3D Parallax in SwiftUI].
- **Baseline status (Dec 2025)** — same-document view transitions + `view-transition-class` are
  Baseline Newly Available (Chrome 111+, Safari 18+/iOS 18+, Firefox 144+) — but the recipe above
  drives the directional + depth axes via `calc()` off the spring scalar (NOT VT-snapshot, which
  rasterizes — R4), reserving VT/scoped-VT only for the OPT-IN element-level shared seam where its
  snapshot model is correct.

Sources: [web.dev SPA view-transitions](https://web.dev/learn/css/view-transitions-spas) ·
[Chrome element-scoped VT](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions) ·
[MDN view-transition-name](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name) ·
[csswg VT-2](https://drafts.csswg.org/css-view-transitions-2/) ·
[createwithswift matched-geometry](https://www.createwithswift.com/create-an-animated-transition-with-matched-geometry-effect-in-swiftui/) ·
[nilcoalescing segmented control](https://nilcoalescing.com/blog/CustomSegmentedControlWithMatchedGeometryEffect/) ·
[designcode parallax-rotation-3D](https://designcode.io/swiftui-ios15-part2-parallax-rotation-3d/) ·
[medium 3D parallax SwiftUI](https://medium.com/@dhavaljasoliya8/how-to-create-a-3d-parallax-effect-in-swiftui-e7b0a67dedc2)
