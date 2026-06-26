# BG-WS2 · Dock convergence — pass-2 CONVERGED spec (frontier resolved + critiques folded)

> **Status:** pass-2 converged. The pass-1 converged spec (`SPEC-pass1-converged.md`) remains the
> AUTHORITATIVE 11-wave set + base mechanism; THIS document HARDENS the five frontier arms with the
> pass-2 prototype findings (all four BUILD-PROVEN, build=true) and FOLDS every critique mustFix
> (the four `refine` verdicts: 58% / 61% / 50% / 64%). It does NOT restart the wave-set.
>
> **Read pass-1-converged** for the settled mechanism (M1–M11), the FILES-TOUCHED table, the wave
> sequence; **read THIS** for the frontier resolution + the corrections it forces.
>
> **What pass-2 LOCKS (each build-proven or HEAD-verified at synthesis):**
> 1. **The 12-laws weight is BUILD-PROVEN as the analytic-velocity squish** — frame-rate independence
>    (the falsifier) PASSED against the REAL built `useLiquidFlex` driven by the REAL `SpringProgress`:
>    NEW path peak stretch **1.12897 (60Hz) vs 1.12903 (120Hz), Δ=6.4e-5** (≈identical; residual is
>    discrete sampling missing the exact peak instant). The OLD `|Δt|` path is frame-rate-coupled.
>    `--dock-live` is BYTE-UNTOUCHED (its `clamp(0,--dock-morph-t,1)` is the BD.W-DOCK-CORE
>    anti-detonation cap; the weight rides the ORTHOGONAL `--dock-morph-v`/`--stretch`/`--motion-weight`).
> 2. **The surgical teardrop budget fix is ARCHITECTURALLY VERIFIED on real Metal** (ANGLE Metal
>    Renderer, Apple M5 Max — NOT SwiftShader): `filter:url(#dock-morph-goo)` STATIC + the pure-CSS
>    smootherstep `--dock-bridge-opacity` midpoint-gate PARSES, COMPUTES, and eliminates the
>    118–184ms `filter:none↔url()` graph-rebuild hitch BY CONSTRUCTION. The goo-id re-point to
>    `#dock-morph-goo` is born-RED gated.
> 3. **The two-surface `useDockSpring` factory is BUILD-PROVEN** — `vue-tsc --noEmit` exit 0,
>    `npm run build` exit 0 (`dock.js` 65.4kB), grep bar MET (exactly ONE `new SpringProgress` in the
>    dock dir, `useDockSpring.ts:111`), the factory stays INTERNAL (off the `/dock` barrel).
> 4. **The in-place flip extends the published composable cleanly** (vue-tsc 0, build 0) — BUT the
>    CRITICAL NEW HEAD FINDING corrects the spec: **the SidebarDock is IN-FLOW, NOT `position:fixed`**
>    (`dock-nav.css:40` `.demo-sidebar-rail { flex-shrink:0; display:flex }` — a flex-shrink:0 column
>    in a flex row). The pass-2 spec's "position:fixed left, transform-origin at the pinned edge"
>    assumption is WRONG; the landing semantics is re-resolved below (§F-ARM-3, RESOLVED IN-SPEC, not
>    A/B-at-execution).
>
> **The honest gate:** all four prototypes earned `refine`; C-SAFARI has ZERO HEAD verification (the
> cardinal cross-engine bar); the AZ failure-class slow-Metal box stays UNMEASURED; the painted-goo
> coherence at blur 16 + the in-place landing-semantics build-proof are P1/P2 deliverables. The
> mechanism + wave-set are converged + internally consistent; the real-paint product proofs are
> legitimately execution-bound with born-RED gate flips.

---

## GESTALT GOAL (unchanged)

The dock is "the hallmark." After WS2: ONE spring, ONE morph engine, ONE busy signal; the V↔H morph is
a BUTTON IN THE DOCK that flips the REAL nav dock in place (liquid teardrop, no modal, esc moot, NO
`startViewTransition` in the V↔H path); no persistent ℱ egg; a capped axis ALWAYS scrolls; the dock blur
is a WS3 peer; the motion reads weighty (arcs + follow-through + overshoot, not a flat blend). The
cardinal bar is REAL paint, both modes, **Chrome AND Safari**, PRM seats synchronously (no 10×74 sliver).

| Arm | Pass-1 | Pass-2 CONVERGED |
|---|---|---|
| **R3 — 12-laws weight** | build=false, 35% | **BUILD-PROVEN** (analytic-velocity squish, frame-rate-independent; `--dock-live` untouched). Critique 58% mustFixes folded. Residual: the live-spring iOS-weight-signature π is real-GPU close-time. |
| **R2 — teardrop budget** | 42%, surgical fix unmeasured | **ARCHITECTURALLY VERIFIED on real Metal** (graph never rebuilds). Critique 61% mustFixes folded. Residual: painted-goo coherence at blur 16 + the AZ slow-box stays UNMEASURED (honest bound only). |
| **R1 — in-place placement** | 52%, fixed-anchor assumed | **LANDING SEMANTICS RESOLVED IN-SPEC** (single-real-dock-flip + leave-flow→bottom-bar + one-time CLS-bounded settle). The in-flow-not-fixed finding corrects the spec. Critique 50% mustFixes folded. Residual: P1 build-proof. |
| **R6 — C-SAFARI** | 0% | **CLOSE-TIME** per-arm WebKit/Metal capture, born-RED each. Unchanged (legitimately execution-bound). |
| **M1/M2 — paint identity** | 62%, static sound | **FACTORY BUILD-PROVEN**; gate-lockstep re-points are now BLOCKERS. Critique 64% mustFixes folded. Residual: real-GPU collapse+layer-swap+mid-press identity. |

---

## MECHANISM (the frontier arms, hardened)

### F-ARM-1 · The 12-laws weight — the analytic-velocity squish (R3, BUILD-PROVEN; critique 58% folded)

**The build-proof (LOCKED — the decisive falsifier passed).** The re-prototype drove the REAL built
`useLiquidFlex` off the REAL `SpringProgress` (DOCK_SPRING, HEAD-confirmed `response 0.68 / ζ 0.64 /
+7.3% overshoot`, `springPresets.ts:101-104`). The NEW analytic-velocity squish reads peak stretch
**1.12897 at 60Hz vs 1.12903 at 120Hz (Δ=6.4e-5)** — frame-rate-INDEPENDENT. The OLD `|Δt|` path reads
HALF the squish at 120Hz (the defect that inverted its own intent). The mechanism is sound and built.

**The mechanism (concrete):**

1. **`--dock-live` is BYTE-UNTOUCHED.** `layers.css:72-79` = `collapsed + (expanded−collapsed)·clamp(0,
   --dock-morph-t,1)`. The `clamp` is the load-bearing BD.W-DOCK-CORE anti-detonation cap (`layers.css:58-61`:
   the >1 spring excursion is DELIBERATELY routed to the orthogonal `--dock-punch-stretch` so an unbounded
   overshoot cannot blow the size term to `scaleX(56)`). Pass-1's "replace the linear blend with the spring
   weld" is REJECTED (it would un-clamp + re-detonate). The weight rides the ORTHOGONAL channels.
2. **Emit `--dock-morph-v` per frame.** The `SpringProgress` frame callback is
   `(value: number, velocity: number)` (`keyframes.d.ts:3427`); today `useDockOrientationMorph.ts:215`
   destructures only `value`. Destructure `(value, velocity)` and write a SECOND custom property
   `--dock-morph-v = clamp(0, |velocity| / V_NORM, 1)`. **`V_NORM` is a BUILD-TIME constant** = the
   closed-form damped-harmonic analytic peak |v| for a 0→1 launch at DOCK_SPRING (0.68/0.64), pinned once
   (a DOCK_SPRING re-tune is byte-fenced/forbidden, so V_NORM never drifts). NOT wall-clock, NOT
   runtime-sampled. This is the ONLY new per-frame property.
3. **Why a property, not `calc(g(--dock-morph-t))`:** the ζ0.64 overshoot makes velocity DOUBLE-VALUED in
   position (each `--dock-morph-t` is visited twice, rising +v / falling −v) → no function of the
   position scalar yields the sign-flipping velocity. (The F2 falsifier; "pure-f(t)" means function-of-time,
   reachable ONLY via the analytic-velocity callback — not function-of-the-position-scalar.)
4. **The squish reads `--dock-morph-v`, NOT `|Δt|`.** Extend `useLiquidFlex` with an ADDITIVE
   `drive(t, velocity?)` overload: when `velocity` is supplied, drive the `"tanh"` squish off the PROVIDED
   analytic velocity (`1 + tanh(|velocity|·squishK)·(max−1)`); cap LOW at `--dock-morph-max-stretch`
   (≤1.08, the kept envelope). **The no-velocity `drive(t)` path is BYTE-IDENTICAL** — the critique-verified
   fence: `useDragMorph`, `useLiquidMorph`, `useMorphField`, the Carousel-goo, and the tabs-indicator
   `"travel"`/`liquidBlob` consumers are ALL on the no-velocity path and BYTE-UNTOUCHED. (Grep-asserted:
   `drive(t)` no-arg call-sites unchanged; only the dock's morph play-callback passes `velocity`.)
5. **`--motion-weight` re-sources off the SAME analytic velocity in lockstep.** `writeVelocityWeight`
   (`useDockOrientationMorph.ts:160-167`, BD.W-MOTION-WEIGHT) today writes `--motion-weight` off the SAME
   `|Δt|`-coupled `flexVel` — a SECOND coupled channel pass-1 missed. Re-source it off `|velocity|/V_NORM`
   so NO `|Δt|` channel survives in the dock morph.
6. **The determinism CONTRACT changes — update the doc + gate in lockstep (born-RED→GREEN).**
   `useLiquidFlex`'s header ("determinism = f(per-`drive` `|Δt|` history)") and any `|Δt|`-history
   assertion re-point to "the squish is a pure function of the spring's analytic `(t, velocity)`,
   frame-rate independent." `proof:morph-showcase` M5 (asserts the bridge CSS reads `var(--stretch)`)
   STRUCTURALLY SURVIVES — it checks the CSS reads `--stretch`, which still holds; only the header
   doc-basis re-points.

**The `morph.pin` capture seam is PRESERVED by construction (F4 — but its scope is corrected).** `pin()`
(`useDockOrientationMorph.ts:111`) disposes the spring → velocity 0 → `--dock-morph-v = 0` → `tanh(0)=0`
→ stretch 1 → the squish-free at-rest silhouette (the double-`writeScalar` zero trick still works, and the
analytic path AGREES: zero velocity ⇒ zero squish). **The consequence (do NOT overclaim):** `pin()`
verifies ONLY the squish-free ENDPOINTS. The in-flight WEIGHT is verifiable ONLY by a LIVE-spring real-GPU
frame-series. The acceptance bar SPLITS: `pin()` = deterministic endpoint reproducibility (the capture
seam); a SEPARATE live frame-series = the in-flight weight. Do not claim `pin()` verifies the swell.

**The iOS weight SIGNATURE (the live-π target):** STRETCH-during-launch (|v| peaks just after t=0 →
anticipation→action), THINS-to-fit at arrival (|v|→0 → follow-through), micro-SWELLS at the +7.3%
overshoot (the sign-flip → secondary action). The π is a LIVE-spring V↔H frame-series where `--stretch`
tracks `--dock-morph-v`, identical at 60/120Hz, NOT a flat monotonic size.

**Channels touched (all orthogonal to `--dock-live`):** `--dock-morph-v` (NEW), `--stretch` (re-sourced
on the velocity overload), `--motion-weight` (re-sourced). The clamp-capped `--dock-live` size term, the
center-out ring stagger (already-shipped overlapping-action — do NOT re-derive), and the
`--dock-punch-stretch` cartoon channel are byte-untouched. Compositor-only (`proof:no-layout-animation`).

### F-ARM-2 · The teardrop budget — surgical fix + goo-id re-point (R2, ARCHITECTURALLY VERIFIED; critique 61% folded)

**The fix is architecturally verified on REAL Metal (graph never rebuilds, sound by construction).** The
recorded AZ-class Metal miss (`W-DOCK-MORPH-INSITU-DELTA.md:146-154`, p50 13.7–15.1ms) is the
`filter:none↔url()` TOGGLE rebuilding the filter graph (118–184ms hitch), NOT the goo render. Keep
`filter: url(#dock-morph-goo)` ALWAYS applied; gate the bridge `opacity` to the occluded midpoint. HEAD
seam: `morph-bridge.css:60` `filter: var(--dock-bridge-goo-filter, none)` is the toggle target;
`--dock-bridge-opacity` (`:41`) is the gate; the plate opacities ramp on `--dock-morph-t` (`:128,:159`);
the PRM block (`:167-170`) zeroes `--dock-bridge-opacity`.

**Mechanism:**
- Bind `--dock-bridge-goo-filter: url(#dock-morph-goo)` STATIC (always-on; the graph never rebuilds — the
  M5-Max trace confirmed the nested pure-CSS smootherstep PARSES + COMPUTES the exact polynomial).
- Gate the bridge presence via `--dock-bridge-opacity` = the smootherstep midpoint window
  (`t ∈ 0.18..0.82` → 1, else 0), driven by the consumer (replacing the filter-toggle computed). The proto
  confirmed `--dock-bridge-opacity` is **0 at the endpoints** by readback.
- **THE F6 RE-POINT (born-RED gate — the prototype shipped no gate; this LOCKS it):** the AppShell in-place
  computed reads `#shell-dock-morph-goo` (`AppShell.vue:123`), a SECOND inline `<filter>` (`:619`) INSIDE
  the modal stage INPLACE-MORPH deletes (`:497-720`). After the delete it resolves to NOTHING — the exact
  "fission url→none demo-broken" defect being fixed. The in-place teardrop MUST reference the canonical
  `GooFilter` mount `#dock-morph-goo` (`GooFilter.vue:56`, **blur 16 / slope 14 / offset -7**, mounted at
  the AppShell root). **The born-RED gate (NEW, the critique's hard mustFix):** grep ZERO
  `#shell-dock-morph-goo` after the modal delete + the in-place teardrop references `#dock-morph-goo` + a
  LIVE `filter-resolves` π (the `<GooFilter>` mount survives, the filter resource resolves).
- **THE PAINTED-GOO-COHERENCE CHECK (NEW P2 deliverable — the critique's hard mustFix):** the in-place
  path moves from the modal `blur 7` to the canonical `#dock-morph-goo` `blur 16` — a **2.3× alpha-bleed**.
  `getComputedStyle().filter` RESOLVING is NOT the merge LOOKING RIGHT (the headless-green trap).
  P2 must CAPTURE the actual PAINTED goo teardrop at blur 16 and confirm it reads as a COHERENT FUSED
  teardrop — NOT the 296px→lone-dot over-fusion the `--morph-neck-frac: 0.62` waist
  (`morph-bridge.css:119,150`) was tuned at blur 7 to prevent. **If blur 16 over-fuses, RE-TUNE
  `--morph-neck-frac` / the plate spans** (a goo-coherence tune, NOT a graph edit — the
  `feGaussianBlur stdDeviation`/`feColorMatrix` stay STATIC).
- The filter graph stays STATIC (stdDeviation + matrix never animate; only `transform`/`opacity`/`clip-path`
  on the plates — `morph-bridge.css:95-98` already compositor/paint-only). `contain: paint` on
  `.dock-morph-bridge-goo` scopes the repaint.
- **KEEP the two-plate goo waist** (`--morph-neck-frac: 0.62`) — `proof:morph-showcase` M2 (both
  `--vertical` AND `--horizontal` plates), M5 (`filter:url(#dock-morph-goo)`), `proof:metaball-bridge2`
  B5/B6, `proof:liquid-morph` M4 ALL STAY GREEN (born-GREEN, no silent red).

**Build-time P2 (the HONEST measurement — the critique's framing correction):**
- Launch HEADED Google Chrome (NOT playwright/MCP headless = SwiftShader = the recorded false-green trap),
  `--remote-debugging-port`, drive via the ~55-line CDP/WebSocket driver (Node global `WebSocket`,
  renderer confirmed "ANGLE Metal Renderer: Apple M5 Max"). Trace the surgical fix across the morph.
- **The M5-Max number is NON-INFORMATIVE for the slow-GPU class (the critique's hard correction).** The
  proto's "p50 8.3ms / 0 dropped frames" is the **120Hz vsync interval** (the rAF proxy detects only
  DROPPED frames, not paint margin) on the FASTEST available GPU — the OPPOSITE of the AZ slow-box.
  **State it as the architectural-win evidence (the graph never rebuilds, sound by construction) ONLY;
  label the timing measurement NON-INFORMATIVE for the slow-GPU class.** The AZ failure-class box (p50
  13.7–15.1ms) is UNMEASURABLE on this Mac. **FORBID any "RESOLVED/VALIDATED" verb on the unmeasured box**
  (the 3×-shipped cardinal-lesson inflation). The morph is a ONE-SHOT ~0.7s gesture, goo active ~0.4 of
  it; a brief transient near-budget on a deliberate press is acceptable where a continuous animation
  would not be.
- **Occlusion adequacy — BOTH directions, the IN-FLOW travel geometry (F8, corrected for in-flow).** The
  modal-geometry "two-plate goo spans the full extent" argument DOES NOT TRANSFER (the modal was
  center-anchored; the real dock is in-flow → leaves-flow → bottom-bar, §F-ARM-3). Capture EVERY midpoint
  frame V→H AND H→V on the REAL in-place dock; confirm the goo covers the real-dock reflow (V 296px tall /
  H 332px wide). Size the `contain:paint` bridge container to the UNION of both silhouettes ANCHORED ON
  THE MORPH TRAVEL PATH (the left-column → bottom-bar travel), NOT a centered union.
- **Endpoint occlusion (NEW — the critique's mustFix):** frame-CAPTURE the COMPOSITED morph at
  `t∈[0,0.18]` and `[0.82,1]` where the bridge is `opacity:0` — confirm the REAL DOCKS ALONE cover the
  reflow there (the old path left bridge plates at opacity 1 across all t; an opacity-number readback at
  the endpoints is NOT a composited-frame capture).
- **PRM single-paint:** `--dock-bridge-opacity:0` under reduce → zero neck frame (assert explicitly; the
  parent `.dock-morph-bridge` `opacity:var(--dock-bridge-opacity,1)` survives and multiplies down).
- The clip-path/mask wipe stays a FRAMED-HONEST FALLBACK ONLY (per-frame `O(paint_area)` repaint, NOT
  compositor-only; `will-change:clip-path` does not promote), requiring explicit lockstep re-point
  authorization for `proof:morph-showcase`+`proof:metaball-bridge2`, and triggering the dir-wide dual-path
  decision (M6 = both-goo). **VT survival is FORBIDDEN.**

### F-ARM-3 · The in-place placement — LANDING SEMANTICS RESOLVED IN-SPEC (R1, critique 50% folded)

**THE CRITICAL HEAD CORRECTION (re-frames the whole arm).** The pass-2 spec assumed `position:fixed`;
the prototype HEAD-verified the OPPOSITE: **the SidebarDock is IN-FLOW** — `dock-nav.css:40`
`.demo-sidebar-rail { flex-shrink:0; display:flex }` is a flex-shrink:0 column in the AppShell flex row,
rendered ONLY at ≥768px (below 768px the BottomDock swaps in via media query). A column→row flip of an
IN-FLOW dock is a LAYOUT-ARCHITECTURE change, not a free-floating transform. The "transform-origin at the
pinned edge" detail is moot; the real question is the COMMITTED RESTING STATE.

**THE RESOLUTION (the critique's hard mustFix: "resolve it in the spec, do not A/B at execution"):**

1. **The single-real-dock-flip is the DEFAULT** (directive-faithful D13 "the REAL dock in place" + KISS).
   The ONE real SidebarDock flips its own `orientation` prop at the goo-occluded `t≈0.5` midpoint — a
   DISCRETE flip hidden inside the goo neck (the web platform cannot interpolate a flex column→row
   topology; Apple hides exactly this reflow inside the merge — the `GlassEffectContainer` +
   `.sidebarAdaptable` model). **The two-form crossfade is the FALLBACK ONLY** if P1 real paint shows the
   discrete flip snaps visibly through the goo. No synthetic two-dock overlay in the default path.
2. **The committed HORIZONTAL resting state (the real headline falsifier — RESOLVED, not picked-by-paint).**
   A 72px (4.5rem) IN-FLOW sidebar column morphing to a ~332px horizontal form CANNOT stay in flow (a
   332px-tall row would shove `<main>` catastrophically). **The morphed-horizontal dock LEAVES THE FLOW and
   pins to the BOTTOM edge** (faithful to `.sidebarAdaptable`'s sidebar→bottom-tab model — the cited Apple
   reference). The freed 72px column gutter is reclaimed by a SINGLE one-time CLS-bounded `<main>` settle
   reflow — a DELIBERATE layout commit at the morph's end (the user's deliberate press authorizes it; the
   goo midpoint occludes the discrete orientation+flow flip; the settle is ONE commit, NOT a per-frame
   reflow). **The dead-gutter alternative is REJECTED** (reserving a 72px empty column when the dock has
   moved to the bottom reads broken). H→V reverses: the dock leaves the bottom, re-enters flow as the
   left column, `<main>` settles once. P1 build-proves this reads coherent on real paint; if it does NOT,
   ESCALATE before INPLACE-MORPH builds (do not ship an incoherent flip to satisfy a grep bar).
3. **Focus management (the critique's a11y mustFix — DISSOLVED by the single-flip resolution).** Because
   the default is the SINGLE real dock flipping its OWN `orientation` (NOT promoting a live dock into a
   separate overlay+placeholder), the two-form overlay's focus-restoration problem DOES NOT ARISE. During
   the ~0.7s flight the dock is mid-deform + non-interactive: set the dock's nav controls `inert` while
   `morphing` is live (a focused nav RouterLink at toggle-time → focus falls back to the morph BUTTON the
   user just pressed, which stays focusable); on settle, `inert` clears and the nav is interactive at the
   new orientation. The morph BUTTON retains focus throughout (it is the press target, never inert). NO
   overlay role, NO placeholder focus-restore — the single-flip is a11y-simpler by construction.
4. **`boundOrientation` is a LOCAL computed, NOT a published-API addition (the critique's justify-or-cut).**
   The discrete orientation flip + the `inert` gate bind off a LOCAL `t.value >= 0.5` computed inside the
   in-place adapter (it IS observably correct-and-different: at t<0.5 the dock is still vertical-oriented
   pre-flip, at t≥0.5 horizontal-oriented post-flip, the flip hidden in the goo). Do NOT add
   `boundOrientation` to the published `useDockOrientationMorph` surface — the two-DOM-dock morph-showcase
   fence does not need it (it owns its own eager-orientation-ref). Keep the published surface unchanged.
5. **The collapse anchor is DISTINCT (do not conflate the two morphs).** The COLLAPSE/expand morph is
   center-out (`layers.css` transform-origin:center, the WS2-02 "grow from center, no right→left bounce"
   directive). The V↔H morph travels left-column→bottom-bar. Prove BOTH on the real shell dock; the two
   must not fight.
6. **The V↔H-vs-collapse SERIALIZATION (compose cleanly or reject — the critique's mustFix).** The shell
   dock COLLAPSES (`--dock-morph-t`/`--stretch`/`scale:`) AND the V↔H morph deforms the same root. SERIALIZE
   through the ONE orchestrator-owned `morphing` ref (M3): orientation morph and collapse morph are
   MUTUALLY EXCLUSIVE episodes — a V↔H toggle while collapsed first seats/expands the collapse; the
   `morphing` guard REJECTS a second deformation start while one is live (a debounced press, NOT a second
   overlapping spring). The π is a frame-series showing no double-deform.
7. **DO NOT seed the proto's filter-TOGGLE into the build (the critique's mustFix).** The proto's
   compile-proof used `--dock-bridge-goo-filter: none↔url(#dock-morph-goo)` — the EXACT graph-rebuild hitch
   F-ARM-2 forbids. The shipped in-place teardrop binds the filter STATIC `url(#dock-morph-goo)` and gates
   `--dock-bridge-opacity` at the `t∈0.18..0.82` midpoint. Flagged so a builder does not carry the
   anti-pattern forward.

**SHELL-DOCK-DRY is RE-SCOPED (F11 — the two axes are orthogonal).** The desktop SidebarDock ↔ mobile
BottomDock is a CSS media-query SWAP (`dock-nav.css:179`), NOT two instances of one morphable dock. The
user-driven V↔H morph is a SEPARATE axis from the responsive breakpoint. **Do NOT merge them into one
orientation ref** — a user-morphed-horizontal desktop dock and the responsive-mobile BottomDock are
different states on different axes; one ref risks the morph FIGHTING the media query at the 768px boundary.
The DRY folds ONLY the shared category-nav loop + the morph-button wiring into a `useShellNavDock`
composable over two thin SFCs; the responsive swap stays a pure media query; P1 proves the morph state does
not collide with the breakpoint at 768px.

**The in-place case COMPOSES `useDockSpring` (NOT a new spring).** ADD the LOCAL `boundOrientation` +
neck/opacity output computeds onto the EXISTING `useDockOrientationMorph` (which already owns the
eager-orientation-ref-vs-scalar-`t` split). The two-dock showcase and the one-dock in-place become THIN
adapters over the ONE `useDockSpring`-backed scalar core. The in-dock `ArrowLeftRight` `<DockIconButton>`
(already imported, `SidebarDock.vue:32`) drives a DIRECT ref toggle (delete the window-event triple-hop).
The button carries `aria-pressed` + `aria-label` (NEVER on the presentational dock root div).

### F-ARM-4 · C-SAFARI — per-arm WebKit/Metal capture at close (R6, CLOSE-TIME, unchanged)

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

### F-ARM-5 · useDockSpring / dockLayerFlip real-GPU paint identity (M1/M2, BUILD-PROVEN; critique 64% folded)

**The factory is BUILD-PROVEN + TWO explicit surfaces (F12 — the drag does NOT share the morph shape).**
The proto built it: `vue-tsc --noEmit` exit 0, `npm run build` exit 0 (`dock.js` 65.4kB), exactly ONE
`new SpringProgress` in the dock dir (`useDockSpring.ts:111`), INTERNAL (off the `/dock` barrel). The 4
morph callers (`dockMorphContext:176`, `useDockOrientationMorph:204`, `useLayerTransition:259` [deleted by
M2], `useDockFission:484`) are fresh-per-episode `play(onFrame)` with internal velocity-snapshot re-base.
The drag (`useDockItemDrag:104`) is a LAZY persistent reused spring (`ensureSpring()` + `subscribe()` +
empty `play(()=>{})` rAF-keepalive + work-in-callback + the `zero-spring-when-never-dragged` invariant) —
**HEAD-confirmed lazy-persistent, NOT self-disposing** (the F-ARM-5 spec text is CORRECTED here per the
critique). Do NOT force one leaky abstraction. `useDockSpring` exposes:
- **`playTo(from, to, { onFrame, onSettle })`** — the fresh-episode surface (the morph callers + each drag
  fling = a fresh 0→1), with the interruptible velocity-rebase + self-dispose-on-settle
  (`if (spring === s) dispose()`) + `respectReducedMotion` synchronous seat. **This PRESERVES the
  always-recreate semantics** of `dockMorphContext` + `useDockFission` (each episode is a fresh `playTo` —
  the idempotent-target-trap comment STAYS true and is preserved verbatim, NOT silently reconciled away).
- a **lazy-construct guard** so a never-dragged surface constructs ZERO spring (the drag's invariant). The
  drag keeps its LAZY-PERSISTENT reused-spring + keepalive shape via this guard, NOT a per-fling `playTo`.
- **PARAMETERIZED `(response, dampingFraction)`** — `useDockItemDrag:104` destructures `springPreset("dock")`,
  the morph callers read DOCK_SPRING; both resolve 0.68/0.64 but the factory ACCEPTS the pair, never
  hardcodes DOCK_SPRING (DOCK_SPRING stays byte-fenced; the factory READS it for the morph callers).
- **NO `firstSeat` field-tick contrivance (the critique's mustFix).** Do NOT fold a synchronous
  onFrame-from-seat into the factory (it spuriously ticks the seam-tension velocity field at
  `useDockFission.ts:519`). Each site OWNS its pre-play seat as a DIRECT STYLE WRITE (the
  `dockMorphContext`/`useLayerTransition` precedent) — or the factory exposes the seat as a
  direct-style-write hook DISTINCT from `onFrame`.

The play callback passes `(value, velocity)` through to `onFrame` (the F-ARM-1 analytic-velocity seam
rides this).

**GATE-LOCKSTEP RE-POINTS (the critique's BLOCKER — born-RED→GREEN in the SAME diff; the
BB.W-CARVE4/`proof:webgl-substrate-single` "asserts follow the composition into the carved leaf"
precedent):**
- **`proof:dock-morph-family` F3** (`proof-dock-morph-family.mjs:237`): the
  `/new\s+SpringProgress\(\s*\{[\s\S]*?respectReducedMotion:\s*true/` regex over `dockMorphContext.ts` +
  `useLayerTransition.ts` must FOLLOW the construction into `useDockSpring.ts` (where the ONE
  `new SpringProgress({ ...respectReducedMotion: true })` now lives). HEAD-verified the regex shape.
- **`proof:dock-fission` F1** (`proof-dock-fission.mjs:76`): `importsSpringProgress` (the
  `import { SpringProgress } from "@mkbabb/keyframes.js"` regex over `useDockFission.ts`) must re-point to
  assert `useDockFission` COMPOSES `useDockSpring` (the construction follows into the leaf). The
  `readsDockSpring`/`writesSplitT` facts stay on the fission file.
- **`proof:dock-orchestrator-single`: FOLD-AND-DELETE `useLayerTransition`** (the pass-1 plan — the
  critique's "do not leave a surviving second-engine file with its drift-guard silently retired"). The
  static drift-guard (keeping two byte-faithful copies faithful) evaporates HONESTLY because the second
  file is GONE. Re-home its RUNTIME invariant (`engineCount==1` + the one-clock-onset deferral π) onto
  `useDockSpring` (a `proof:dock-spring-single` successor or the existing job re-pointed); fix the
  importing `dock-orchestrator-single.detect.test.ts`.
- **Run the FULL `proof:*` suite, not just `vue-tsc`+`vite`** before claiming any %.
- **Verify `proof:motion-one-clock` `detectOffSpine` (PRONG A)** does not false-flag the de-kf'd
  composables (they drop the kf import AND the integrator — likely safe; confirm), and confirm
  `useDockSpring` itself is recognized on-spine.
- **F13 — fix the stale DOCK_SPRING note in ALL THREE places** (HEAD-confirmed): `CLAUDE.md:679`,
  `docs/precepts/motion-canon.md:195`, `docs/precepts/tunable-anim.md:63` all read `0.32 / 0.7`; the live
  value is `0.68 / 0.64`. Fix all three or the byte-fence + `proof:spring-tokens-synced` anchor claim is
  undermined.

**dockLayerFlip leaf (M2, F3 re-affirmed):** `dockMorphContext.ts` STAYS MEASURE-FREE (F3's negative regex
FORBIDS `measureAndArmMorph`/`seatTargetSync`/`forceNestedMaxContent`/`rebaseSiblingSpans` in the
orchestrator — BD.W-DOCK-CORE law). The standalone FLIP-measure/seatSync/deferReposition/directionTypes/
VT-native-layer-swap deltas extract to a NEW colocated `dockLayerFlip.ts`; standalone `DockLayerGroup`
mints its own orchestrator + composes the leaf. **Document/guard the `springEl`-drop one-spring-per-container
assumption (the critique's mustFix):** the factory drops `useLayerTransition`'s `springEl===el` guard on
an unenforced invariant; ASSERT the one-spring-per-container invariant (or keep the guard) so a future
`DockLayerGroup` driving 2 containers through one transition instance cannot bleed velocity.

**The paint-identity bar (real-GPU, NAMED born-RED — NOT a tickDt proxy):** collapse + layer-swap
byte-identical light + dark; PRM synchronous seat (no 10×74 sliver, zero motion frames); a rapid mid-morph
re-press frame-series shows NO 1-frame scalar-write gap / flash / allocation hitch on the `playTo`
dispose+recreate lifecycle (the live-rAF mid-flight reset is a NAMED real-GPU verification, the critique's
mustFix — the reuse-when-live framing is a BEHAVIORAL change to the always-recreate sites, verified on
paint, not asserted by construction).

---

## FILES TOUCHED (frontier deltas beyond the pass-1 table; all pass-1 §FILES rows stand)

| File | Arm | Change |
|---|---|---|
| `useDockOrientationMorph.ts:215` (play callback) | F-ARM-1 | destructure `(value, velocity)`; emit `--dock-morph-v = clamp(0,|velocity|/V_NORM,1)`; re-source `--stretch`+`--motion-weight` off analytic velocity |
| `src/composables/motion/useLiquidFlex.ts` | F-ARM-1 | additive `drive(t, velocity?)` overload (the no-velocity path BYTE-IDENTICAL — drag/morph-field/carousel/tabs untouched); update the determinism header doc to the `(t,velocity)` analytic basis |
| `scripts/proof-morph-showcase.mjs` (M5 doc-basis) | F-ARM-1 | re-point the `|Δt|`-history clause → `(t,velocity)` analytic basis (M5 structurally survives; born-RED→GREEN) |
| `src/styles/dock/morph-bridge.css:60` + the consumer opacity-gate | F-ARM-2 | `--dock-bridge-goo-filter: url(#dock-morph-goo)` STATIC; gate `--dock-bridge-opacity` at the smootherstep `t∈0.18..0.82` midpoint; `--morph-neck-frac` re-tune IFF blur-16 over-fuses |
| `demo/layout/AppShell.vue:123,619` | F-ARM-2 + INPLACE-MORPH | DELETE the `#shell-dock-morph-goo` inline filter + computed; the in-place teardrop references the canonical `GooFilter` `#dock-morph-goo` |
| `morph-bridge.css` `contain:paint` container sizing | F-ARM-2 | size to the UNION of V(296)/H(332) silhouettes ALONG THE left-column→bottom-bar TRAVEL (NOT a centered union — the in-flow correction) |
| `demo/layout/SidebarDock.vue` + `BottomDock.vue` → `useShellNavDock` | F-ARM-3 | DRY the shared nav-loop + morph-wiring ONLY; the morphed dock LEAVES FLOW → bottom-bar + one-time CLS-bounded `<main>` settle; responsive swap stays a media query |
| `useDockOrientationMorph.ts` (LOCAL `boundOrientation`/neck/opacity computeds in the in-place adapter) | F-ARM-3 | the in-place adapter over the ONE `useDockSpring` scalar; LOCAL `t≥0.5` flip + `inert` gate (NOT a published-API addition); serialize V↔H vs collapse via `morphing` |
| `composables/useDockSpring.ts` (NEW) | F-ARM-5 | two-surface factory: `playTo(from,to,{onFrame,onSettle})` self-dispose (preserves always-recreate) + lazy-persistent drag guard; parameterized `(response,ζ)`; passes `(value,velocity)`; NO `firstSeat` field-tick |
| `proof-dock-morph-family.mjs` (F3) · `proof-dock-fission.mjs` (F1) · `proof-dock-orchestrator-single.mjs` + `dock-orchestrator-single.detect.test.ts` | F-ARM-5 | re-point the SpringProgress-construction asserts to FOLLOW the composition into `useDockSpring.ts`, born-RED→GREEN in the SAME diff; fold-and-DELETE `useLayerTransition` so the drift-guard retirement is honest |
| `CLAUDE.md:679` · `docs/precepts/motion-canon.md:195` · `docs/precepts/tunable-anim.md:63` | MORPH-UNIFY | fix the stale DOCK_SPRING `0.32/0.7` → `0.68/0.64` in ALL THREE (F13) |
| `tests-visual/*` Safari arm + `gestalt-roster` dock row | F-ARM-4 | per-arm WebKit/Metal capture, born-RED; re-earn the dock gestalt row on a fresh content+dimension+freshness-verified capture |

---

## WAVE BREAKDOWN (the pass-1 11-wave sequence is UNCHANGED; pass-2 binds the frontier onto three waves)

The 11 waves + order carry over verbatim from pass-1-converged §WAVE BREAKDOWN: UNIFY → BUSY-SINGLE →
CUT → DECOMPOSE → FISSION-WIRE → PERSISTENT-CUT → CAP-SCROLLS → OVERFLOW-FADE → SHELL-DOCK-DRY →
**INPLACE-MORPH** → STORY-MODULARIZE. (`BG.W-DOCK-UTILITY-REACH` stays FOLDED as the 1280×600
trailing-reachability acceptance arm of CAP-SCROLLS.) Pass-2 attaches:

- **`BG.W-DOCK-MORPH-UNIFY`** gains: the F-ARM-5 two-surface factory (the drag's LAZY-PERSISTENT surface
  explicit, NO firstSeat contrivance) + the F-ARM-1 `(value,velocity)` play-callback plumbing + the
  GATE-LOCKSTEP re-points (F3/F1/orchestrator-single fold-and-delete, born-RED→GREEN in the same diff,
  full `proof:*` suite run) + the F13 three-place CLAUDE/precepts fix.
- **`BG.W-SHELL-DOCK-DRY`** gains: the F11 re-scope (responsive swap ⟂ morph axis; DRY only the nav-loop)
  + the in-flow-not-fixed correction + the P1 landing-semantics build-proof gate (single-flip default +
  leave-flow→bottom-bar + one-time CLS-bounded settle, ESCALATE-if-incoherent).
- **`BG.W-DOCK-INPLACE-MORPH`** (headline) gains: the F-ARM-1 analytic-velocity squish (`--dock-morph-v`
  on `--stretch`/`--motion-weight`, `--dock-live` UNTOUCHED, no-velocity `drive(t)` byte-fenced); the
  F-ARM-2 surgical budget fix (filter STATIC, opacity-gated) + the F6 goo-id re-point (born-RED gate) +
  the painted-goo-coherence-at-blur-16 P2 capture + the honest slow-box framing; the F-ARM-3
  landing-semantics resolution + focus-inert + V↔H-vs-collapse serialize; the F-ARM-4 Safari close gate.
  It flips `proof:dock-morph-insitu` M2/M4 born-RED→teardrop-only IN LOCKSTEP with the AppShell
  VT-crossfade delete (C1 — `proof-dock-morph-insitu.mjs:142` currently MANDATES the
  `startViewTransition`+`vtOrientation` the delete removes; a silent red is forbidden). The
  `startViewTransition` at `AppShell.vue:220` (the ROUTE-category crossfade, co-owned with WS1) STAYS —
  the "zero startViewTransition in the V↔H path" grep must NOT collateral it.

No new waves are minted. The frontier is build-time/close-time work BOUND onto the existing waves.

---

## ACCEPTANCE / REAL-PAINT-π BAR (the frontier additions; the pass-1-converged bar stands in full)

**Grep / structural (CI, device-free):**
- `--dock-live` BYTE-UNTOUCHED (the `clamp(0,--dock-morph-t,1)` anti-detonation cap intact); the 12-laws
  weight rides `--dock-morph-v`/`--stretch`/`--dock-punch-stretch`/`--motion-weight` ONLY.
- `useLiquidFlex.drive(t)` (no-velocity) byte-identical (the drag/morph-field/carousel/tabs consumers
  untouched); the `(t, velocity)` overload is additive.
- Exactly ONE `new SpringProgress` in the dock dir (`useDockSpring.ts`); `proof:dock-morph-family` F3 +
  `proof:dock-fission` F1 + `proof:dock-orchestrator-single` re-pointed to FOLLOW the construction into
  the leaf, born-RED→GREEN in the SAME diff; the FULL `proof:*` suite green.
- `useLayerTransition.ts` fold-and-DELETED (the drift-guard retirement honest); the 6 gate + 2 test
  by-file reads re-pointed FIRST; MIGRATION row present; `public-surface.spec.ts` ×2 + `api/index.ts`
  updated.
- Zero `#shell-dock-morph-goo` after the modal delete; the in-place teardrop references `#dock-morph-goo`;
  the `GooFilter` mount survives (a live `filter-resolves` assert).
- `proof:morph-showcase` M2/M5 + `proof:metaball-bridge2` B5/B6 + `proof:liquid-morph` M4 GREEN (two-plate
  goo waist + static graph kept).
- `proof:dock-morph-insitu` M2/M4 flipped teardrop-only IN THE SAME DIFF as the VT-crossfade delete;
  zero `startViewTransition` in the V↔H path (the `:220` route VT survives).
- CLAUDE.md + motion-canon.md + tunable-anim.md DOCK_SPRING note reads `0.68/0.64` (all three).

**Live π (real GPU, the binding paint):**
- **12-laws weight:** a LIVE-spring V↔H frame-series where `--stretch` tracks `--dock-morph-v` —
  STRETCH-at-launch, THIN-at-arrival, micro-swell at the +7.3% overshoot — NOT a flat monotonic size;
  identical at 60Hz and 120Hz (build-proven Δ=6.4e-5). `pin()` writes the squish-free endpoint silhouette
  deterministically (the capture seam); the in-flight weight is the SEPARATE live frame-series (pin does
  NOT verify the swell).
- **Teardrop budget (P2):** the surgical fix traced on REAL headed Chrome/Metal (ANGLE Metal Renderer,
  NOT SwiftShader); framed as ARCHITECTURAL evidence (the graph never rebuilds) — the M5-Max timing
  NON-INFORMATIVE for the slow-GPU class, the AZ failure-class box stated as "UNMEASURED" (never
  "RESOLVED"); the PAINTED goo teardrop at blur 16 captured + confirmed COHERENT (not over-fused, re-tune
  `--morph-neck-frac` if it is); occlusion covers V296/H332 BOTH directions along the left-column→bottom-bar
  travel; the endpoint frames `t∈[0,0.18]`/`[0.82,1]` (bridge opacity:0) show the real docks alone cover
  the reflow; PRM single-paint (zero neck frame).
- **In-place placement (P1):** the LANDING SEMANTICS resolved (single real dock flips `orientation` at the
  goo-occluded midpoint; the morphed-horizontal form LEAVES FLOW → bottom-bar; the freed gutter settles in
  ONE CLS-bounded `<main>` reflow) on the REAL in-flow SidebarDock with real paint, reads COHERENT
  (ESCALATE if not); the V↔H travel anchor distinct from the collapse center-out anchor; the
  V↔H-vs-collapse serialization frame-series shows no double-deform; the nav is `inert` during flight +
  the morph button retains focus; the morph state does not fight the 768px responsive breakpoint.
- **Paint identity (M1/M2):** collapse + layer-swap byte-identical both modes; PRM synchronous seat (no
  10×74 sliver); a rapid mid-morph re-press shows no scalar-write gap on the `playTo` dispose+recreate
  (a NAMED real-GPU mid-press stress, not a tickDt proxy).
- **C-SAFARI (every arm):** WebKit/Metal capture for the morph (drives, no flash, reads as liquid glass),
  the cap-scroll + soft-edge fade, the facet rim — both modes, born-RED each.

---

## FOLDED DEFERRED ITEMS (no silent drop — pass-2 additions; all pass-1-converged items stand)

- **F-ARM-1 `V_NORM` constant:** the analytic peak |v| for a 0→1 launch at DOCK_SPRING (0.68/0.64),
  closed-form damped-harmonic, BUILD-TIME, NOT wall-clock. Pin once; the byte-fence forbids a re-derive.
- **The no-velocity `drive(t)` fence (NEW):** `useDragMorph`/`useLiquidMorph`/`useMorphField`/Carousel-goo/
  the tabs-indicator `"travel"` are ALL on the byte-identical no-velocity path. Grep-assert no `velocity`
  arg leaks onto their call-sites.
- **The painted-goo coherence at blur 16 (NEW P2):** the in-place path's 2.3× alpha-bleed vs the modal's
  blur 7 — capture the merge, re-tune `--morph-neck-frac`/plate spans if it over-fuses (a coherence tune,
  NOT a STATIC-graph edit).
- **The in-flow-not-fixed correction (NEW):** the SidebarDock is `flex-shrink:0` in-flow, not
  `position:fixed`; the F8 occlusion union + the landing semantics are re-derived on the
  left-column→bottom-bar travel, not a centered modal geometry.
- **The morph-engine thicket is 7-wide, not 2 (F14).** Beyond `dockMorphContext`+`useLayerTransition`:
  `useDockOrientationMorph`, `useDockFission`, `useMorphField`(468L, LIVE: GooFilter+useDockFission),
  `useGooMorph`(460L), `useLiquidMorph`(462L, DEAD). FISSION-WIRE must (a) name the disposition of
  `useMorphField`/`useGooMorph` explicitly with WS4 (the "2 near-duplicate" undercounts), and (b) make
  "no carousel/pager goo regression" a PAINT-π, not a grep (the shared `GooFilter` is depended on by
  `CarouselContent.vue` + `PagerDots.vue`).
- **File-count ~24 is DIRECTIONAL, not a hard bar (F15).** The >500-line split (useDockFission 604L,
  GlassDock 711L) net-ADDS files; the HARD bars are the grep invariants (one `new SpringProgress` per
  ownership model, zero broken import, `RATCHET_BASELINES == {}`). The literal `~33→~24` is dropped from
  the convergence framing.
- **R7 (BLOCKING the CUT wave):** WS6 must confirm `useDockContextSilhouette` is NOT the
  contextual-silhouette substrate it wants before `BG.W-DOCK-CUT` deletes it (verified dead on consumer
  grounds — only an `AppSwitcher.vue` COMMENT references it; it imports `useBloomUp`).
- **All pass-1-converged §FOLDED DEFERRED ITEMS stand** (the clip-path fallback framing, the
  `useDockSearch`/`useDockItemDrag` ≥2-consumer audit, the `containerName`-freezes-morph clamp design-out,
  the DOCK_SPRING byte-fence, the cross-WS blur/cast/n-ary-dedup hand-offs).

---

## OPEN RISKS (pass-2 — the residual that survives the frontier resolution)

- **R1 (UX-design, can falsify the headline) — the LANDING SEMANTICS is RESOLVED IN-SPEC but
  BUILD-UNPROVEN.** The single-flip + leave-flow→bottom-bar + one-time CLS-bounded settle is the committed
  resolution; P1 build-proves it reads coherent on the REAL in-flow SidebarDock. If it does NOT, ESCALATE
  BEFORE INPLACE-MORPH builds (the two-form crossfade is the only fallback; VT is forbidden).
- **R2 (the unmeasurable box) — the AZ failure-class slow-Metal box stays UNMEASURED.** The surgical fix
  is architecturally sound (graph never rebuilds, verified on M5-Max); the slow-box timing is unmeasurable
  on this Mac. State it honestly; the clip-path fallback is the only sanctioned floor if it meaningfully
  misses (VT forbidden), triggering the dir-wide dual-path decision.
- **R3 (12-laws weight) — BUILD-PROVEN, close-time live-π owed.** The analytic-velocity squish is built +
  frame-rate-independent; the iOS-weight-signature live frame-series (stretch-at-launch / thin-at-arrival /
  micro-swell) is the real-GPU close-time bar (the `morph.pin` endpoint capture is intact, but pin does
  NOT verify the in-flight swell).
- **R6 (C-SAFARI, cardinal) — zero HEAD verification.** Every binding π carries a per-arm WebKit/Metal
  capture at close; the backdrop-filter blur under per-frame repaint is the open WebKit flicker risk.
- **R4 — concurrency:** the dock dir is the densest shared surface; serialize dock-dir ownership (one
  agent at a time on the refactor). `AppShell.vue` is co-owned with WS1 (route VT at `:220` STAYS; only the
  modal VT at `:131` deletes).
- **R5 — useDockSpring two-surface honesty:** the factory is build-proven with the explicit two-surface
  shape (`playTo` self-dispose + the lazy-persistent drag guard). The grep bar is "one `new SpringProgress`
  per ownership model" — a documented two-surface factory is still ONE construction site.

---

## THE PASS-2 PROTOTYPE FRONTIER (the build-or-design-proven status; what remains execution-bound)

| Prototype | Build | Critique | Status after this synthesis |
|---|---|---|---|
| **P3 — analytic-velocity squish** | ✅ build=true (88% proto) | 58% refine | **MECHANISM CONVERGED + built**; frame-rate independence PASSED (Δ=6.4e-5). Owed: the live-GPU iOS-weight-signature π (close-time). |
| **P2 — surgical teardrop budget + goo-id** | ✅ build=true (88% proto) | 61% refine | **ARCHITECTURE CONVERGED + verified on real Metal**. Owed: the painted-goo-coherence-at-blur-16 capture + the F8 travel-union occlusion + the born-RED gate (build-time P2). |
| **P1 — in-place fixed-anchor + serialize** | ✅ build=true (62% proto) | 50% refine | **LANDING SEMANTICS RESOLVED IN-SPEC** (single-flip + leave-flow→bottom-bar + CLS-bounded settle); the in-flow correction folded. Owed: P1 build-proof reads coherent (ESCALATE if not) + focus-inert verify. |
| **P-FACTORY — two-surface useDockSpring** | ✅ build=true (82% proto) | 64% refine | **BUILD-PROVEN**; the gate-lockstep re-points are now BLOCKERS in the wave. Owed: the real-GPU collapse+layer-swap+mid-press identity + the full `proof:*` suite run. |

Each remaining deliverable is build-time (P1/P2) or close-time (Safari, the live-GPU weight signature, the
paint identity) — legitimately execution-bound because the synthesis harness cannot run real-Metal/Safari.
The spec names each with a born-RED gate flip. No prototype is unbuilt; no critique mustFix is unfolded.
