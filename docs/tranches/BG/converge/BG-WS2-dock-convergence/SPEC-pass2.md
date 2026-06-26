# BG-WS2 · Dock convergence — pass-2 spec (the frontier-advancing layer)

> **Status:** pass-2. The pass-1 converged spec (`SPEC-pass1-converged.md`) is the AUTHORITATIVE
> wave-set + mechanism for the 11 waves; this document does NOT restart it. Pass-2 ADVANCES the five
> unconverged frontier arms (R1/R2/R3/R6 + M1/M2 paint-identity) with concrete, build-or-design-proven
> mechanisms, and FOLDS the risk-fleet falsifiers (F1–F17) that re-aim three of them. Read pass-1 for
> the settled mechanism; read THIS for the frontier resolution + the corrections it forces.
>
> **What pass-2 changes vs pass-1 (the load-bearing corrections, each HEAD-verified):**
> 1. **The 12-laws weight is RE-AIMED off `--dock-live`.** Pass-1 said "replace the `--dock-live` LINEAR
>    blend with the spring weld." That is mechanically WRONG: `layers.css:58-61` proves the
>    `clamp(0,--dock-morph-t,1)` is the BD.W-DOCK-CORE anti-detonation cap (un-clamping → `scaleX(56)`
>    width-detonation). The weight rides the ORTHOGONAL `--stretch` + `--dock-punch-stretch` +
>    `--motion-weight` channels; `--dock-live` is byte-untouched.
> 2. **The squish reads a NEW per-frame `--dock-morph-v`, not a function of the position scalar.** The
>    spring overshoots (ζ0.64, +7.3%), so each `--dock-morph-t` value is visited twice (rising +v /
>    falling −v) → velocity is not single-valued in position → no CSS `calc(g(--dock-morph-t))` squish is
>    possible. Emit `--dock-morph-v` = normalized analytic velocity from the spring play-callback.
> 3. **The in-place teardrop re-points to the SURVIVING goo mount.** AppShell's `#shell-dock-morph-goo`
>    (a SECOND inline filter, `AppShell.vue:619`) DIES with the modal delete; the in-place teardrop must
>    reference the canonical `GooFilter` `#dock-morph-goo` (`GooFilter.vue:56`) — born-RED gated.
> 4. **The fixed-anchor LANDING SEMANTICS is an open UX question P1 must RESOLVE, not a transform-origin
>    detail** (F9/F10/F11): does the flipped-horizontal SidebarDock land top-left, or translate to a
>    bottom-bar? This can falsify the headline.

---

## GESTALT GOAL (unchanged from pass-1, restated for the frontier)

The dock is "the hallmark." After WS2 it is ONE spring, ONE morph engine, ONE busy signal; the V↔H
morph is a BUTTON IN THE DOCK that flips the REAL nav dock in place (liquid teardrop, no modal, esc
moot, no `startViewTransition` in the V↔H path); no persistent ℱ egg; a capped axis ALWAYS scrolls; the
dock blur is a WS3 peer; the motion reads weighty (arcs + follow-through + overshoot), not a flat blend.
The cardinal bar is REAL paint, both modes, **Chrome AND Safari**, PRM seats synchronously (no 10×74
sliver).

Pass-2's frontier is EMPIRICAL/build-time + ONE re-prototype. The five arms:

| Arm | Pass-1 status | Pass-2 resolution |
|---|---|---|
| **R3 — 12-laws weight** | build=false, 35%, defective `|Δt|` squish | **RE-AIMED + design-proven here** (`--dock-morph-v` analytic velocity on `--stretch`, NOT `--dock-live`); RE-PROTOTYPE = P3 |
| **R2 — teardrop real-Metal budget** | 42%, surgical fix specified, unmeasured | **BUILD-TIME P2** — trace filter-always-on + opacity-gate on headed Metal; goo-id re-point; AZ box stated honestly |
| **R1 — fixed-anchor in-place** | 52%, free-floating flip proven | **BUILD-TIME P1** — resolve LANDING SEMANTICS + anchor on real `position:fixed` dock + V↔H-vs-collapse serialize |
| **R6 — C-SAFARI** | 0% (zero HEAD verification) | **CLOSE-TIME** per-arm WebKit/Metal capture, born-RED each |
| **M1/M2 — paint identity** | 62%, static collapse sound | **BUILD-TIME** — useDockSpring two-surface factory, collapse+layer-swap+drag byte-identical, PRM seat, mid-press stress |

---

## MECHANISM (the frontier arms, concrete)

### F-ARM-1 · The 12-laws weight — RE-AIMED off `--dock-live` onto the analytic-velocity squish (R3, the RE-PROTOTYPE)

**HEAD-verified diagnosis (the pass-1 framing is corrected here):**

- DOCK_SPRING is `response 0.68 / ζ 0.64 / +7.3% overshoot` (`springPresets.ts:101-104`) — already the
  weighty iOS signature. The spring is NOT the culprit.
- `--dock-live` (`layers.css:72-79`) = `collapsed + (expanded−collapsed)·clamp(0,--dock-morph-t,1)`. The
  `clamp` is the **load-bearing BD.W-DOCK-CORE anti-detonation cap** (`layers.css:58-61` documents it: the
  >1 spring excursion is DELIBERATELY routed to the orthogonal `--dock-punch-stretch` channel so an
  unbounded overshoot cannot blow the size term to `scaleX(56)`≈2451px). **`--dock-live` is byte-untouched
  by this wave.** Pass-1's "replace the linear blend with a spring weld" would un-clamp it and re-detonate.
- The overlapping-action texture is ALREADY SHIPPED: the `layers.css` center-out ring stagger
  (BD.W-DOCK-CORE, the 0/±1/±2-ring `animation-delay` off `--dock-stagger-step`) is working follow-through
  off the single scalar. **Do NOT re-derive it.**
- The genuine gap is the SQUISH: it flows through `useLiquidFlex.drive(t)`, which computes its own
  per-`drive` travel `|Δt|` internally (`useLiquidFlex.ts:30-33` "SQUISH DETERMINISM = pure function of the
  per-`drive` travel `Δt`") — **frame-rate-coupled** (120Hz reads HALF the squish of 60Hz; the prototype's
  defective fix inverted its own intent). `writeVelocityWeight` (`useDockOrientationMorph.ts:160-167`,
  BD.W-MOTION-WEIGHT) writes `--motion-weight` off the SAME `|Δt|`-coupled `flexVel` — a SECOND coupled
  channel the pass-1 spec did not name.

**The re-derivation (design-proven below; the squish reads analytic velocity, frame-rate-independent):**

1. **The analytic velocity IS reachable.** `SpringProgress`'s frame callback is
   `SpringFrameCallback = (value: number, velocity: number)` (`keyframes.d.ts:3427`); the closed-form
   damped-harmonic v(t) is a pure function of time, frame-rate-independent. Today
   `useDockOrientationMorph.ts:215` destructures only `value` (`active.play((value) => …)`); the velocity
   is right there in the callback (and on the `spring.velocity` getter the re-base already reads at `:201`).
2. **Emit `--dock-morph-v` per frame.** In the play-callback, write a SECOND custom property
   `--dock-morph-v` = `clamp(0, |velocity| / V_NORM, 1)` (a normalization constant `V_NORM` = the spring's
   analytic peak |v| for a 0→1 launch at DOCK_SPRING, a build-time constant, NOT wall-clock). This is the
   ONLY new per-frame property. **Why a property and not `calc(f(--dock-morph-t))`:** the ζ0.64 overshoot
   makes velocity double-valued in position — there is no function of `--dock-morph-t` that yields the
   sign-flipping velocity. (This is the F2 falsifier; the pass-1 "pure-f(t)" wording conflated
   function-of-time with function-of-the-position-scalar — only the former is possible.)
3. **The squish reads `--dock-morph-v`, not `|Δt|`.** Extend `useLiquidFlex` with an additive
   `drive(t, velocity?)` overload: when `velocity` is supplied it drives the `"tanh"` squish off the
   PROVIDED analytic velocity (`1 + tanh(|velocity|·squishK)·(max−1)`) instead of the internally-computed
   `|Δt|`. The existing `drive(t)` (no velocity) is UNCHANGED — the tabs-indicator `"travel"` law and the
   in-shader metaball consumer are byte-untouched. Cap LOW at `--dock-morph-max-stretch` (≤1.08, the kept
   envelope). `--motion-weight` (`writeVelocityWeight`) re-derives off the SAME analytic velocity in
   lockstep (no second `|Δt|` channel survives).
4. **The squish DETERMINISM contract changes — update the gate in lockstep.** `useLiquidFlex`'s header
   ("determinism = f(per-`drive` `|Δt|` history)") and `proof:morph-showcase` M5 (which asserts the bridge
   reads `var(--stretch)`) must move to the `(t, velocity)`-pair reproducibility basis. M5 structurally
   survives (it checks the CSS reads `--stretch`, which still holds); the header doc + any `|Δt|`-history
   assertion re-point to "the squish is a pure function of the spring's analytic `(t, v)`, frame-rate
   independent." Born-RED on the old `|Δt|` contract → GREEN on the analytic basis.

**The iOS weight SIGNATURE is the π target (the reference bar):** the surface reads STRETCH-during-launch
(analytic |v| peaks just after t=0 → anticipation→action), THINS-to-fit at arrival (|v|→0 →
follow-through), micro-swells at the +7.3% overshoot (the sign-flip → secondary action). The π is a
LIVE-spring frame-series where `--stretch` tracks `--dock-morph-v`, NOT a flat monotonic size.

**The `morph.pin` capture seam is PRESERVED by construction (F4).** `pin()` (`useDockOrientationMorph.ts:111`)
disposes the spring → velocity 0 → `--dock-morph-v = 0` → `tanh(0) = 0` → stretch 1 → the existing
squish-free at-rest silhouette (the double-`writeScalar` zero-`|Δt|` trick still works, and now the analytic
path agrees: zero velocity ⇒ zero squish). **The consequence pass-1 understated:** `pin()` therefore
verifies ONLY the squish-free ENDPOINTS; the in-flight WEIGHT is verifiable ONLY by a live-spring
real-GPU frame-series. The acceptance bar SPLITS: pin() = deterministic endpoint reproducibility (the
capture seam); a separate live frame-series = the in-flight weight. Do not claim pin() verifies the swell.

**Channels touched (all orthogonal to `--dock-live`):** `--dock-morph-v` (NEW), `--stretch` (re-sourced),
`--motion-weight` (re-sourced). The clamp-capped `--dock-live` size term, the center-out stagger, and the
`--dock-punch-stretch` cartoon channel are byte-untouched. Compositor-only (`proof:no-layout-animation`
holds).

### F-ARM-2 · The teardrop real-Metal budget — the surgical fix + the goo-id re-point (R2, BUILD-TIME P2)

**The surgical fix (pass-1, re-affirmed + the F6 correction):** the recorded Metal miss (p50 13.7-15.1ms,
`W-DOCK-MORPH-INSITU-DELTA.md:146-154`) is the `filter:none↔url()` TOGGLE rebuilding the filter graph
(118-184ms hitch), NOT the goo render. Keep `filter: url(#dock-morph-goo)` ALWAYS applied; gate the bridge
`opacity` to the occluded midpoint instead. HEAD-verified seam: `morph-bridge.css:60`
`filter: var(--dock-bridge-goo-filter, none)` is the toggle target; `--dock-bridge-opacity` (`:41`) is the
existing gate; the plate opacities already ramp on `--dock-morph-t` (`:128,:159`); the PRM block
(`:167-170`) zeroes `--dock-bridge-opacity`.

**Mechanism:**
- Bind `--dock-bridge-goo-filter: url(#dock-morph-goo)` STATIC (always-on; the graph never rebuilds).
- Gate the bridge presence via `--dock-bridge-opacity` = a smootherstep midpoint window
  (`t ∈ 0.18..0.82` → 1, else 0), driven by the consumer (replacing today's filter-toggle computed).
- **THE F6 RE-POINT (born-RED gate):** the AppShell in-place computed today reads `#shell-dock-morph-goo`
  (`AppShell.vue:123`), whose mount is a SECOND inline `<filter id="shell-dock-morph-goo">`
  (`AppShell.vue:619`) INSIDE the modal stage that INPLACE-MORPH deletes (`:497-720`). After the delete it
  resolves to NOTHING — the exact "fission url→none demo-broken" defect being fixed. The in-place teardrop
  MUST reference the canonical `GooFilter` mount `#dock-morph-goo` (`GooFilter.vue:56`, blur 16 / slope 14
  / offset -7, already mounted at the AppShell root via `<GooFilter>`). Assert a live `filter-resolves`
  π + a grep bar: zero `#shell-dock-morph-goo` after the modal delete, the teardrop references
  `#dock-morph-goo`, the mount survives.
- The filter graph stays STATIC (stdDeviation + matrix never animate; only `transform`/`opacity`/`clip-path`
  on the plates — `morph-bridge.css:95-98` already compositor/paint-only). `contain: paint` on
  `.dock-morph-bridge-goo` scopes the repaint to a tight box.
- KEEP the two-plate goo waist (`--morph-neck-frac: 0.62`, `morph-bridge.css:119,150`) — `proof:morph-showcase`
  M2 (both `--vertical` AND `--horizontal` plates), M5 (`filter:url(#dock-morph-goo)`),
  `proof:metaball-bridge2` B5/B6, `proof:liquid-morph` M4 ALL STAY GREEN.

**Build-time P2 (the honest measurement):**
- Launch HEADED Google Chrome (NOT playwright/MCP headless = SwiftShader = the recorded false-green
  trap), `--remote-debugging-port`, drive via the ~50-line CDP/WebSocket driver the pass-1 prototype
  validated (Node global `WebSocket`, confirmed live renderer "ANGLE Metal Renderer"). Trace the
  per-frame cost of the surgical fix across the morph.
- **The AZ failure-class slow box (p50 13.7-15.1ms) is UNMEASURABLE on this Mac** (a faster GPU will not
  reproduce it). State the number on the available Metal GPU + an EXPLICIT "the AZ-class box remains
  UNMEASURED." **Forbid any "RESOLVED/VALIDATED" verb on the unmeasured box** (the 3×-shipped
  cardinal-lesson inflation). The morph is a ONE-SHOT ~0.7s gesture with goo active ~0.4 of it; a brief
  transient near-budget on a deliberate press is acceptable where a continuous animation would not be.
- **Occlusion adequacy (both directions):** capture every midpoint frame V→H AND H→V; confirm the
  two-plate goo (full extent) covers the real-dock reflow (V 296px tall / H 332px wide). Size the
  `contain:paint` bridge container to the UNION of both silhouettes ANCHORED AT THE PINNED EDGE (F8 — the
  free-floating prototype never exercised the fixed-corner union; a vertical-extent-only bridge leaks the
  horizontal reflow).
- **Assert PRM single-paint:** `--dock-bridge-opacity:0` under reduce → zero neck frame.
- The clip-path/mask wipe stays a FRAMED-HONEST FALLBACK ONLY (per-frame `O(paint_area)` repaint, NOT
  compositor-only; `will-change:clip-path` does not promote), requiring explicit lockstep re-point
  authorization for `proof:morph-showcase`+`proof:metaball-bridge2`, and triggering the dir-wide dual-path
  decision (M6 = both-goo). **VT survival is FORBIDDEN.**

### F-ARM-3 · The fixed-anchor in-place placement + V↔H-vs-collapse serialize (R1, BUILD-TIME P1)

**The unproven half (F9/F10/F11 — promoted from a detail to the gating UX question):** the pass-1
prototype flipped a FREE-FLOATING story (vertical 67×373 → horizontal 381×59 in place); the REAL
SidebarDock is `position:fixed` left, rendered ONLY at ≥768px (`dock-nav.css:179` — below 768px the
BottomDock swaps in via media query). P1 must RESOLVE, not assume:

1. **The LANDING SEMANTICS (the open UX question that can falsify the headline).** Pass-1 specified the
   horizontal form lands "at the corner the vertical occupied, NOT re-centered" = TOP-LEFT. But the cited
   Apple model is `.sidebarAdaptable` (sidebar → BOTTOM tab-bar), and a 332px-wide bar pinned top-left is
   NOT that — it floats at an awkward corner over content. P1 build-proves BOTH candidates and picks by
   real paint:
   - **(a) pinned-edge `transform-origin`** — the horizontal form grows/shrinks about the dock's
     fixed top-left corner (the BB.W-DOCK-MORPH-FAMILY pinned-edge precedent). Coherent IF the design
     wants a top-left horizontal island.
   - **(b) translate-to-bottom + reflow** — the dock TRANSLATES from the left edge to a bottom-bar
     position as it reflows column→row (faithful to `.sidebarAdaptable`'s sidebar→bottom-tab model). The
     transform-origin is then the travel path, not a fixed corner.
   - If (a) reads incoherent on real paint, the headline mechanism is FALSIFIED at P1 — ESCALATE before
     INPLACE-MORPH builds (do not ship an awkward top-left island to satisfy a grep bar).
2. **The collapse anchor is DISTINCT (the reference distinguishes two anchors — do not conflate).** The
   COLLAPSE/expand morph is center-out (`layers.css` transform-origin:center, the WS2-02 "grow from
   center, no right→left bounce" directive binds the COLLAPSE). The V↔H morph anchors at the PINNED edge
   (or the travel path). Prove BOTH on the real shell dock; the two must not fight.
3. **The V↔H-vs-collapse serialization (compose cleanly or reject).** The shell dock COLLAPSES (the
   `--dock-morph-t`/`--stretch`/`scale:` channels) AND the V↔H morph deforms the same root. A mid-collapse
   V↔H composes two uncoordinated deformations. **Serialize through the ONE orchestrator-owned `morphing`
   ref (M3):** orientation morph and collapse morph are MUTUALLY EXCLUSIVE episodes — a V↔H toggle while
   collapsed first seats/expands the collapse; the `morphing` guard rejects a second deformation start
   while one is live (debounced press, not a second overlapping spring). The π is a frame-series showing
   no double-deform.

**SHELL-DOCK-DRY is RE-SCOPED (F11 — the two axes are orthogonal).** The desktop SidebarDock ↔ mobile
BottomDock is a CSS media-query SWAP (`dock-nav.css:179`), NOT two instances of one morphable dock. The
user-driven V↔H morph is a SEPARATE axis from the responsive breakpoint. **Do NOT merge them into one
orientation ref** — a user-morphed-horizontal desktop dock and the responsive-mobile BottomDock are
different states on different axes; one ref risks the morph FIGHTING the media query at the 768px boundary.
The DRY folds ONLY the shared category-nav loop + the morph-button wiring into a `useShellNavDock`
composable over two thin SFCs; the responsive swap stays a pure media query; P1 proves the morph state
does not collide with the breakpoint at 768px.

**The in-place case COMPOSES `useDockSpring` (NOT a new spring).** ADD `boundOrientation = computed(() =>
t.value >= 0.5)` + the neck/opacity output computeds onto the EXISTING `useDockOrientationMorph` (which
already owns the eager-orientation-ref-vs-scalar-t split). The two-dock showcase and the one-dock in-place
become THIN adapters over the ONE `useDockSpring`-backed scalar core. The in-dock `ArrowLeftRight`
`<DockIconButton>` (already imported, `SidebarDock.vue:32`) drives a DIRECT ref toggle (delete the
window-event triple-hop). The button carries `aria-pressed` + `aria-label` (NEVER on the presentational
dock root div).

### F-ARM-4 · C-SAFARI — per-arm WebKit/Metal capture at close (R6, CLOSE-TIME)

Zero Safari verification exists at HEAD; source-green/visually-broken shipped 3×. Every binding π carries
a WebKit/Metal capture, sequenced as PER-ARM born-RED close gates (highest risk first):
1. **The teardrop drive + no screen flash** — animated `transform`/`opacity` on a backdrop-filter dock
   root is the classic WebKit compositing flicker the C-SAFARI "flashes the screen" names. The goo GRAPH
   is WebKit-correct (regular `filter:url` + `color-interpolation-filters:sRGB`, NOT `backdrop-filter:url`
   — WebKit bug 245510 stays avoided). The open risk is the backdrop-filter blur under per-frame repaint.
   Mitigate with `will-change: backdrop-filter` + `transform: translateZ(0)` GPU-layer hints; verify it
   DRIVES (not flashes), reads as liquid glass (not a flat sliding pill).
2. **OVERFLOW-FADE `mask-image` + backdrop-filter on the scroll port** — Safari has no production
   scroll-timeline → the `useFadingScroll` JS rAF fallback runs, and `mask-image` on a scroll port that is
   a child of the backdrop-filter dock has known WebKit mask+backdrop-filter compositing fragility.
3. **The facet `--glass-accent` rim** (`mode="facets"`, the WS2-04 fission-wire surface).
Both modes, each born-RED. Chrome-only is the trap.

### F-ARM-5 · useDockSpring / dockLayerFlip real-GPU paint identity (M1/M2, BUILD-TIME)

**The factory is TWO explicit surfaces (F12 — the drag does NOT share the morph callers' shape).** The 4
morph callers (`dockMorphContext:176`, `useDockOrientationMorph:204`, `useLayerTransition:259`,
`useDockFission:484`) are fresh-per-episode `play(onFrame)` with internal velocity-snapshot re-base. The
drag (`useDockItemDrag:106`) is a LAZY persistent reused spring + `subscribe()` + empty `play(() => {})`
(rAF-keepalive) + work-in-the-callback + the `zero-spring-when-never-dragged` invariant. **Do NOT force
one leaky abstraction.** `useDockSpring` exposes:
- `playTo(from, to, { onFrame, onSettle })` — the fresh-episode surface (the 4 morph callers + each drag
  fling = a fresh 0→1), with the interruptible velocity-rebase + self-dispose-on-settle
  (`if (spring === s) dispose()`) + `respectReducedMotion` synchronous seat.
- a lazy-construct guard so a never-dragged surface constructs ZERO spring (the drag's invariant).
- **PARAMETERIZED `(response, dampingFraction)`** — `useDockItemDrag:106` reads `springPreset("dock")`
  (destructured), the morph callers read DOCK_SPRING; both resolve to 0.68/0.64 but the factory must
  ACCEPT the pair, never hardcode DOCK_SPRING (or it breaks any future drag register). DOCK_SPRING stays
  byte-fenced (the factory READS it for the morph callers).

The grep bar is honest as "exactly one `new SpringProgress` in the dock dir" — but if the drag's fold
adds net complexity, the fallback grep is "one `new SpringProgress` per ownership model" (a documented
two-surface factory is still ONE construction site). The play callback now passes `(value, velocity)`
through to `onFrame` (the F-ARM-1 analytic-velocity seam rides this).

**dockLayerFlip leaf (M2, unchanged from pass-1, F3 re-affirmed):** `dockMorphContext.ts` STAYS
MEASURE-FREE (`proof:dock-morph-family` F3's negative regex FORBIDS `measureAndArmMorph`/`seatTargetSync`/
`forceNestedMaxContent`/`rebaseSiblingSpans` in the orchestrator — BD.W-DOCK-CORE law). The standalone
FLIP-measure/seatSync/deferReposition/directionTypes/VT-native-layer-swap deltas extract to a NEW colocated
`dockLayerFlip.ts`; standalone `DockLayerGroup` mints its own orchestrator + composes the leaf.

**The paint-identity bar:** collapse + layer-swap byte-identical light + dark; PRM synchronous seat (no
10×74 collapsed-from sliver, zero motion frames); a rapid mid-morph re-press frame-series shows NO 1-frame
scalar-write gap / flash / allocation hitch on the `playTo` dispose+recreate lifecycle.

---

## FILES TOUCHED (frontier deltas beyond the pass-1 table)

| File | Arm | Change |
|---|---|---|
| `useDockOrientationMorph.ts:215` (play callback) | F-ARM-1 | destructure `(value, velocity)`; emit `--dock-morph-v` = `clamp(0,|velocity|/V_NORM,1)`; re-source `--stretch` + `--motion-weight` off the analytic velocity |
| `src/composables/motion/useLiquidFlex.ts` | F-ARM-1 | additive `drive(t, velocity?)` overload (the no-velocity path UNCHANGED — tabs-indicator/metaball byte-untouched); update the determinism header doc |
| `useDockOrientationMorph.ts` (`writeVelocityWeight`) | F-ARM-1 | re-source `--motion-weight` off analytic velocity (lockstep with `--stretch`) |
| `scripts/proof-morph-showcase.mjs` (M5 doc-basis) + `useLiquidFlex` header | F-ARM-1 | re-point the `|Δt|`-history determinism clause → the `(t,velocity)` analytic basis (born-RED→GREEN) |
| `src/styles/dock/morph-bridge.css:60` + the consumer opacity-gate | F-ARM-2 | `--dock-bridge-goo-filter: url(#dock-morph-goo)` STATIC; gate `--dock-bridge-opacity` at the t∈0.18..0.82 midpoint |
| `demo/layout/AppShell.vue:123,619` | F-ARM-2 + INPLACE-MORPH | DELETE the `#shell-dock-morph-goo` inline filter + computed; the in-place teardrop references the canonical `GooFilter` `#dock-morph-goo` |
| `morph-bridge.css` `contain:paint` container sizing | F-ARM-2 | size to the UNION of V(296)/H(332) silhouettes anchored at the pinned edge (F8) |
| `demo/layout/SidebarDock.vue` + `BottomDock.vue` → `useShellNavDock` | F-ARM-3 | DRY the shared nav-loop + morph-wiring ONLY; responsive swap stays a media query (NOT merged with the morph axis) |
| `useDockOrientationMorph.ts` (`boundOrientation`/neck/opacity computeds) | F-ARM-3 | the in-place adapter over the ONE `useDockSpring` scalar; serialize V↔H vs collapse via `morphing` |
| `composables/useDockSpring.ts` (NEW) | F-ARM-5 | two-surface factory: `playTo(from,to,{onFrame,onSettle})` + lazy-construct guard; parameterized `(response,ζ)`; passes `(value,velocity)` to `onFrame` |
| `CLAUDE.md` (the stale DOCK_SPRING note) | MORPH-UNIFY | fix `{response:0.32, dampingFraction:0.7}` → the live `0.68/0.64` (F13) so the byte-fence + `proof:spring-tokens-synced` anchor on the real value |
| `tests-visual/*` Safari arm + `gestalt-roster` dock row | F-ARM-4 | per-arm WebKit/Metal capture, born-RED; re-earn the dock gestalt row on a fresh content+dimension+freshness-verified capture |

(All pass-1 §FILES TOUCHED rows stand. The above are the frontier-specific additions/corrections.)

---

## WAVE BREAKDOWN (the pass-1 11-wave sequence is UNCHANGED; pass-2 binds the frontier deliverables onto three waves)

The 11 waves + their order (UNIFY → BUSY-SINGLE → CUT → DECOMPOSE → FISSION-WIRE → PERSISTENT-CUT →
CAP-SCROLLS → OVERFLOW-FADE → SHELL-DOCK-DRY → **INPLACE-MORPH** → STORY-MODULARIZE) carry over verbatim
from pass-1 §WAVE BREAKDOWN. Pass-2 attaches:

- **`BG.W-DOCK-MORPH-UNIFY`** gains the F-ARM-5 two-surface factory (the drag's persistent-subscribe
  surface is explicit) + the F-ARM-1 `(value,velocity)` play-callback plumbing + the F13 CLAUDE.md fix.
- **`BG.W-SHELL-DOCK-DRY`** gains the F11 re-scope (responsive swap ⟂ morph axis; DRY only the nav-loop)
  + the P1 build-proof gate (the LANDING SEMANTICS resolution).
- **`BG.W-DOCK-INPLACE-MORPH`** (headline) gains: the F-ARM-1 analytic-velocity squish (`--dock-morph-v`
  on `--stretch`/`--motion-weight`, `--dock-live` UNTOUCHED — the RE-PROTOTYPE landed); the F-ARM-2
  surgical budget fix + the F6 goo-id re-point (born-RED) + the P2 Metal trace; the F-ARM-3 fixed-anchor
  resolution + V↔H-vs-collapse serialize; the F-ARM-4 Safari close gate. It still flips
  `proof:dock-morph-insitu` M2/M4 born-RED→teardrop-only in LOCKSTEP with the AppShell VT-crossfade delete
  (C1 — `proof-dock-morph-insitu.mjs:142` currently MANDATES the `startViewTransition`+`vtOrientation` the
  delete removes; a silent red is forbidden).

No new waves are minted. The frontier is build-time/close-time work BOUND onto the existing waves.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the frontier additions to the pass-1 bar)

The pass-1 §ACCEPTANCE bar stands in full. Pass-2 ADDS:

**Grep / structural (CI, device-free):**
- `--dock-live` is BYTE-UNTOUCHED (the `clamp(0,--dock-morph-t,1)` anti-detonation cap intact); the
  12-laws weight rides `--dock-morph-v`/`--stretch`/`--dock-punch-stretch`/`--motion-weight` ONLY.
- `useLiquidFlex.drive(t)` (no-velocity) is byte-identical; the `(t, velocity)` overload is additive.
- Zero `#shell-dock-morph-goo` after the modal delete; the in-place teardrop references `#dock-morph-goo`;
  the `GooFilter` mount survives (a live `filter-resolves` assert).
- `proof:morph-showcase` M2/M5 + `proof:metaball-bridge2` B5/B6 + `proof:liquid-morph` M4 GREEN (two-plate
  goo waist + static graph kept).
- `proof:dock-morph-insitu` M2/M4 flipped teardrop-only IN THE SAME DIFF as the VT-crossfade delete (no
  dangling green gate).
- CLAUDE.md DOCK_SPRING note reads `0.68/0.64`.

**Live π (real GPU, the binding paint):**
- **12-laws weight (the RE-PROTOTYPE):** a LIVE-spring V↔H frame-series where `--stretch` tracks
  `--dock-morph-v` — STRETCH-at-launch, THIN-at-arrival, micro-swell at the +7.3% overshoot — NOT a flat
  monotonic size. The squish is identical at 60Hz and 120Hz (frame-rate-independent). `pin()` writes the
  squish-free endpoint silhouette deterministically (the capture seam intact); the in-flight weight is the
  separate live frame-series (pin does NOT verify the swell).
- **Teardrop budget (P2):** the surgical fix (filter-always-on + opacity-gate) traced on REAL headed
  Chrome/Metal (ANGLE Metal Renderer, NOT SwiftShader); the per-frame cost stated as a NUMBER; the AZ
  failure-class box stated as "UNMEASURED" (never "RESOLVED"); occlusion covers V296/H332 BOTH directions
  with the bridge sized to the pinned-edge union; PRM single-paint (`--dock-bridge-opacity:0`, zero neck
  frame).
- **Fixed-anchor in-place (P1):** the LANDING SEMANTICS RESOLVED (a or b) on the REAL `position:fixed`
  SidebarDock with real paint; the V↔H anchor distinct from the collapse center-out anchor; the
  V↔H-vs-collapse serialization frame-series shows no double-deform; the morph state does not fight the
  768px responsive breakpoint.
- **Paint identity (M1/M2):** collapse + layer-swap byte-identical both modes; PRM synchronous seat (no
  10×74 sliver); a rapid mid-morph re-press shows no scalar-write gap on the `playTo` dispose+recreate.
- **C-SAFARI (every arm):** WebKit/Metal capture for the morph (drives, no flash, reads as liquid glass),
  the cap-scroll + soft-edge fade, the facet rim — both modes, born-RED each.

---

## FOLDED DEFERRED ITEMS (no silent drop — pass-2 additions)

- **F-ARM-1 `V_NORM` constant:** the analytic peak |v| for a 0→1 launch at DOCK_SPRING (0.68/0.64) is a
  BUILD-TIME constant computed from the closed-form damped-harmonic velocity, NOT a wall-clock or
  runtime-sampled value. Pin it once; a DOCK_SPRING re-tune (forbidden — byte-fenced) would re-derive it.
- **The morph-engine thicket is 7-wide, not 2 (F14).** Beyond `dockMorphContext`+`useLayerTransition`,
  there are `useDockOrientationMorph`, `useDockFission`, `useMorphField`(468L, LIVE consumers:
  GooFilter+useDockFission), `useGooMorph`(460L), `useLiquidMorph`(462L, DEAD). FISSION-WIRE's
  "DRY the goo onto ONE GooFilter" touches the shared `GooFilter` that carousel/CarouselContent.vue +
  pager-dots/PagerDots.vue depend on — WIDER than a 2-way WS2↔WS4 coordination. FISSION-WIRE must (a)
  name the disposition of `useMorphField`/`useGooMorph` explicitly with WS4 (the spec's "2 near-duplicate"
  undercounts them), and (b) make "no carousel/pager goo regression" a PAINT-π, not just a grep.
- **File-count ~24 is DIRECTIONAL, not a hard bar (F15).** The >500-line split law (useDockFission 604L,
  GlassDock 711L) net-ADDS files; the HARD bars are the grep invariants (one `new SpringProgress` per
  ownership model, zero broken import, `RATCHET_BASELINES == {}`). Drop the literal `~33→~24` from the
  convergence framing.
- **R7 (BLOCKING the CUT wave):** WS6 must confirm `useDockContextSilhouette` is NOT the
  contextual-silhouette substrate it wants before `BG.W-DOCK-CUT` deletes it (verified dead on consumer
  grounds — only an AppSwitcher.vue COMMENT references it; it imports `useBloomUp`).
- **All pass-1 §FOLDED DEFERRED ITEMS stand** (the clip-path fallback framing, the `useDockSearch`/
  `useDockItemDrag` ≥2-consumer audit, the `containerName`-freezes-morph clamp design-out, the DOCK_SPRING
  byte-fence, the cross-WS blur/cast/n-ary-dedup hand-offs).

---

## OPEN RISKS (pass-2 — the residual that survives the frontier resolution)

- **R1 (UX-design, can falsify the headline) — the LANDING SEMANTICS.** If neither candidate (top-left
  pinned-edge / translate-to-bottom) reads coherent on real paint at P1, the in-place V↔H is falsified
  and escalates BEFORE INPLACE-MORPH builds. This is now a design decision, not a transform-origin detail.
- **R2 (the unmeasurable box) — the AZ failure-class slow Metal box stays UNMEASURED.** P2 measures the
  surgical fix on the available Metal GPU and states the AZ box honestly as unmeasured. The clip-path
  fallback is the only sanctioned floor if the surgical fix still meaningfully misses (VT forbidden), and
  it triggers the dir-wide dual-path decision.
- **R3 (the RE-PROTOTYPE) — the analytic-velocity squish is design-proven here, build-unproven.** P3 must
  build it (the `(t,velocity)` overload + `--dock-morph-v` emit) and prove the iOS weight signature on a
  live frame-series AT BOTH 60Hz/120Hz, with the `morph.pin` endpoint reproducibility intact. The squish
  magnitude must track `--dock-morph-v`, not wall-clock.
- **R6 (C-SAFARI, cardinal) — zero HEAD verification.** Every binding π carries a per-arm WebKit/Metal
  capture at close; the backdrop-filter blur under per-frame repaint is the open WebKit flicker risk.
- **R4 — concurrency:** the dock dir is the densest shared surface; serialize dock-dir ownership (one
  agent at a time on the refactor). AppShell.vue is co-owned with WS1 (route VT at `:220` STAYS; only the
  modal VT at `:131` deletes) — the "zero startViewTransition in the V↔H path" grep must NOT collateral
  the `:220` route VT.
- **R5 — useDockSpring two-surface honesty:** if folding the drag into the factory adds net complexity,
  the honest KISS endpoint may be 4→1 (morph) + the drag's own construction; the grep bar becomes "one
  `new SpringProgress` per ownership model." Re-judge at P-prototype.

---

## THE PASS-2 PROTOTYPE FRONTIER (what MUST be build-or-design-proven before the spec is trustable)

Each falsifies the spec if it fails. P1/P2/P3 are build-time (the harness cannot run real-Metal/Safari at
synthesis); P-DESIGN is the design-sketch the build consumes.

1. **P3 (the RE-PROTOTYPE, lowest arm — INPLACE-MORPH cannot close without it):** build the
   analytic-velocity squish. Add `useLiquidFlex.drive(t, velocity?)`; emit `--dock-morph-v` from the
   `useDockOrientationMorph` play callback; re-source `--stretch`+`--motion-weight`. Prove on a live
   frame-series: stretch-at-launch / thin-at-arrival / micro-swell-at-overshoot, identical at 60/120Hz,
   `--dock-live` byte-untouched, `pin()` squish-free endpoint intact.
2. **P2 (the Metal budget trace):** the surgical filter-always-on + opacity-gate fix + the `#dock-morph-goo`
   re-point, traced on REAL headed Chrome/Metal via the CDP/WebSocket driver; the number stated, the AZ
   box stated honestly, occlusion covered both directions, PRM single-paint.
3. **P1 (the fixed-anchor + serialize):** the in-place flip on the REAL `position:fixed` SidebarDock with
   the LANDING SEMANTICS resolved + the goo bridge sized to the V/H pinned-edge union + `#dock-morph-goo`
   resolving after the modal delete + clean V↔H-vs-collapse serialization.
4. **P-FACTORY (the two-surface useDockSpring):** paint-identical on collapse + layer-swap + drag-fling,
   PRM synchronous seat, rapid mid-press dispose/recreate with no scalar-write gap, the
   zero-spring-when-never-dragged invariant intact.
