# R-dock-layer-anim — SOTA dock + layer-switch animation (DK7 lag)

**Lane** SOTA-RESEARCH · **Severity** research · **Consumed by** AX.W05 (spring vocab) +
AX.W45 (dock region-model) + a dock-layer-anim wave (NET-NEW — see Dedup) · **Defects**
DK7 (layers laggy/delayed), DK1 (collapsed icon "does not appear for a while"), DK6 (layer
switching should be FIRST-CLASS + animated).

---

## 1. The SOTA corpus (what Apple actually ships)

### 1.1 The iOS-17+ spring authoring surface — `(duration, bounce)`

Apple **deprecated** the raw `(response, dampingFraction)` dial for `(duration, bounce)`
where `duration` is a PERCEPTUAL duration (time-to-the-meaningful-part, held constant as
bounce changes) and `bounce ∈ [-1, 1]` is the overshoot dial. The closed-form map (Apple
Dev docs / WWDC23 "Animate with springs"):

- `bounce = 1 − dampingFraction` (= `1 − ζ`), for `bounce ≥ 0`.
- `stiffness = (2π / duration)²` (mass = 1).
- `damping = (1 − bounce) · 4π / duration` (for `bounce ≥ 0`).

The three SHIPPED SwiftUI presets — Apple ships LITERALLY THREE — are:

| Preset | duration | bounce | ζ (dampingFraction) | overshoot | use |
|---|---|---|---|---|---|
| **`.smooth`** | 0.30–0.35 s | 0.0 | 1.0 (critical) | 0% (no overshoot) | settle, no liveliness |
| **`.snappy`** | 0.25–0.30 s | 0.15 | ~0.85 | small (~+5–7%) | system controls, the WORKHORSE |
| **`.bouncy`** | 0.35–0.5 s | 0.30 | ~0.70 | clear (~+18–20%) | playful one-shots only |

The default `Animation.spring` (legacy) is `response 0.55, dampingFraction 0.825` (~+1.5%
overshoot — barely-bouncy, the "default balanced" curve). The macOS **dock magnification**
icon-scale spring (the buildui/Framer-Motion canonical port) is `mass 0.1, stiffness 170,
damping 12` — a STIFF, light, near-critically-damped spring (ζ ≈ `12/(2·√(170·0.1))` ≈ 1.46,
slightly overdamped) so the magnify tracks the cursor with NO ring (a magnification follow
must not overshoot or it reads as jelly).

**glass-ui already speaks this.** `--spring-dock` is `(response 0.32, dampingFraction 0.7,
~+4.6% overshoot)` — squarely between snappy and the dock-magnify spring, an appropriate
system-control register. The `--spring-*` linear() cohort (smooth/snappy/bouncy/dock) IS the
SOTA three-preset set plus the dock register. **The spring CURVES are not the DK7 defect.**

### 1.2 Interruptible interactive springs — velocity-continuity on retarget (WWDC24 §10145)

The load-bearing SOTA technique for a NON-laggy layer switch: during a gesture use
`.interactiveSpring`; each change event RETARGETS the previous spring; on gesture-end a final
`.spring` inherits the carried velocity. The system captures velocity automatically and
carries it into the continuation — "interactive spring animations can be continuously created
and retargeted, with a final non-interactive spring using the velocity from the interactive
springs to carry the animation forward." A re-toggle mid-flight re-bases from the CURRENT
velocity, never snaps from rest.

**glass-ui already implements this** — `dockMorphContext.ts:205-241` (`ensureSpringRunning`)
re-seats the live `SpringProgress` from `spring.velocity` on a mid-flight retarget, and
`useLayerTransition.ts:160-167` carries `inheritedVelocity`. The SIZE morph is SOTA.

### 1.3 The smoothness/non-laggy practices (WWDC24 §10145 + CSS-compositor SOTA)

Apple's UIKit non-lag rules and the CSS-compositor analogue:

1. **Be ready for a transition to start ANYTIME** — never gate on "transition in progress".
2. **Keep temporary transition state minimal** — fewer dependencies, less cleanup.
3. **One concern → one owner.** Apple's functional model: the system owns velocity; you do
   not run a parallel manual timer.
4. **CSS-compositor SOTA:** animate ONLY `transform` + `opacity` (compositor-only, never a
   reflow); fixed-duration CSS `transition` clocks decoupled from the physics driver are the
   classic "two clocks drift" lag; `will-change`/layer-promotion just before, removed after.

### 1.4 The shared-element / zoom transition (WWDC24 §10145)

The iOS app-switcher / Stage-Manager idiom is `matchedTransitionSource` + `.zoom(sourceID:)`
— a SHARED-ELEMENT FLIP keyed on a STABLE identifier (pass a closure returning the view, not
the view itself, to survive cell reuse). Width/height/origin/transform/opacity animate
together on ONE spring (~0.5 s default for the React-Native shared-element analogue). The
single-spring-drives-every-axis model is exactly the glass-ui FLIP (`--dock-morph-from/to` px
span × ONE `--dock-morph-t` scalar).

---

## 2. Where the DK7 lag ACTUALLY comes from (source-level root cause)

The dock SIZE morph is SOTA (one spring, FLIP, velocity-continuity). **The lag is NOT the
size morph — it is THREE decoupled clocks the architecture left running BESIDE the spring.**
The codebase even claims "one authority per concern: size = the spring scalar, opacity = the
CSS crossfade, visibility = the delayed-hold fork" (`dock.css:855`) — but **that very split
IS the bug**: a layer switch's opacity and visibility run on FIXED-DURATION timers that do
NOT track the live spring, so they drift out of lockstep with the size morph the user sees.

### Root cause A — the opacity crossfade is a SECOND CLOCK (the headline)

`dock.css:805-810`:
```css
.dock-layer, .dock-layer-item-host {
    transition:
        opacity var(--dock-motion-resize),          /* = 0.3s on --spring-dock easing */
        visibility 0s linear var(--duration-normal); /* = held 0.3s */
}
```
`--dock-motion-resize` (`dock.css:49`) = `var(--duration-normal) var(--dock-resize-spring)`
= **`0.3s` × `--spring-dock`** (`tokens.css:1456` → `--spring-dock` linear). This is a
FIXED-DURATION CSS transition. The SIZE morph runs on the LIVE `SpringProgress` ODE whose
real settle time is **velocity-dependent** — an interrupted/short-span morph settles in well
under 0.3 s; a fresh large-span one can run longer. So opacity (0.3 s fixed) and size (live
spring) settle at DIFFERENT times. The crossfade either finishes BEFORE the box (a flash) or
LINGERS after (the ghost/lag the user reads as "laggy/delayed"). **Two clocks for one
gesture** — the exact pathology W01/W02 excised for SIZE but left for OPACITY.

### Root cause B — visibility is HELD a hardcoded 0.3s regardless of spring settle

`visibility 0s linear var(--duration-normal)` (`dock.css:809`) holds the LEAVING layer
`visible` for a hardcoded 0.3 s. If the spring settles in 0.18 s (a fast/interrupted swap),
the just-replaced layer keeps PAINTING for ~0.12 s past the morph — a visible ghost over the
settled box. This is the DK7 "delayed" read on a snappy switch: the old pane outstays the
motion.

### Root cause C — the child stagger pushes the LAST item to ~0.95 of the morph (DK1)

`dock.css:100-102`: `--dock-stagger-step: 0.08`, `--dock-stagger-window-size: 0.55`. The
per-child onsets (`dock.css:939-957`) cap at `step × 5 = 0.40` (child 6+). A child reveals
over `[onset, onset + window]` of `--dock-expand-t`, so child 6+ finishes at
`0.40 + 0.55 = 0.95` of the morph — it does not fully appear until 95% through. On EXPAND
that is a graceful cascade; on COLLAPSE→the shrunken summary glyph, the summary icon is a
LATE child of the summary pane, so it reveals near the morph's tail = **DK1's "the shrunken
icon does not appear for a while."** The stagger window (0.55) + max onset (0.40) sum to 0.95
— there is almost no headroom; the iOS idiom front-loads the persistent/summary glyph (onset
≈ 0) and staggers only the EXPANDING detail controls.

### Root cause D — `requestAnimationFrame` measurement defer adds a frame of dead-time

`useLayerTransition.ts:226` / `dockMorphContext.ts:324`: the to-size measurement is deferred
ONE rAF after the class flip, with the box PINNED at `from` (t=0) through the gap. That is
architecturally necessary (the shrink-wrap target only exists post-flush), but it means the
morph does not START until ~16 ms after the gesture — and the pin holds the box motionless
for that frame. On a slow device or under layout pressure this single-frame pin reads as a
hitch at the start of every switch. SOTA (the zoom-transition) measures the source geometry
SYNCHRONOUSLY at gesture-start from the stable identifier's CURRENT rect — no deferred
re-measure. The glass-ui defer is a consequence of measuring the TARGET pane's intrinsic
shrink-wrap rather than caching it.

---

## 3. The SOTA recipe to adopt (the gestalt fix)

The fix is the W01/W02 thesis FINISHED: **drive opacity AND visibility off the SAME live
`--dock-morph-t` scalar the size rides — one clock, every axis — never a parallel
fixed-duration CSS `transition`.**

### 3.1 Crossfade on the scalar, not a CSS clock (root cause A + B)

Replace the `opacity var(--dock-motion-resize)` CSS transition with a `calc()` read off
`--dock-morph-t` (exactly how SIZE and the child stagger already work):
- Leaving layer: `opacity: calc(1 - var(--dock-morph-t))` (gated on `[data-morphing]`).
- Entering/active layer: revealed by the clip aperture (already opacity:1, KEEP — the
  W2 clip-reveal contract).
- Visibility: derive the hit-test/paint cutoff from the scalar crossing a threshold
  (`--dock-morph-t > 0.99`) rather than a hardcoded `var(--duration-normal)` delay, OR keep
  `visibility` purely as the a11y hit-test toggle flipped on spring-settle by the driver
  (the driver already fires a settle callback — flip `is-leaving` there, not on a CSS timer).

This collapses the two opacity/visibility clocks onto the ONE spring. An interrupted morph
now carries the crossfade WITH it (the opacity is a pure function of the same `t` the box
reads) — the ghost and the flash both vanish because there is no second timer to drift.

### 3.2 Front-load the persistent/summary glyph, stagger only detail (root cause C / DK1)

Two coupled tunes:
- The SUMMARY/persistent glyph (the shrunken collapsed icon) gets `--dock-stagger-onset: 0`
  and a SHORT window — it appears IMMEDIATELY with the box, not at the tail. This is the
  W45 `#persistent` region's natural home: the persistent rail is in-flow in BOTH states and
  is NEVER staggered. DK1's "shrunken icon appears with no added delay" is then structural —
  the persistent glyph is not a late stagger child at all.
- Cap the cumulative stagger so the LAST detail child finishes by ~0.7–0.75 of the morph, not
  0.95 — i.e. tighten `--dock-stagger-step` (0.08 → ~0.05) and/or the window so
  `max_onset + window ≤ 0.75`. Emil Kowalski's 30–60 ms stagger band (the dock.css:95
  citation) over a ~0.32 s morph is `0.094–0.19` per beat in normalized t; the current 0.08
  step is INSIDE that band but the 0.55 WINDOW is too wide — narrow the window, keep the step.

### 3.3 The dock-magnify register for the icon hover-scale (DK2 adjacency)

The macOS dock-magnify spring (`mass 0.1, stiffness 170, damping 12`, ζ ≈ 1.46 — near
critical, no ring) is the SOTA register for an icon HOVER/MAGNIFY follow (it must track the
pointer with zero overshoot). glass-ui's `--spring-dock` (~+4.6% overshoot) is correct for
the box MORPH but slightly overshooty for a magnify-follow. If the dock-layer-anim wave
touches the icon hover-scale (DK2), the follow should ride a near-critical register (the
`--spring-smooth` linear, 0% overshoot) not the bouncy/dock register — a magnify that
overshoots reads as jelly. (This is a NOTE for the DK2 wave, not this lane's core.)

### 3.4 Synchronous source measurement where cacheable (root cause D)

The rAF-deferred TARGET-pane measurement is architecturally load-bearing (the shrink-wrap
only exists post-flush), so it stays — BUT the FROM-size is already read synchronously and
the per-pane intrinsic to-size could be CACHED after first measure (panes rarely resize), so
a repeat switch arms the spring SYNCHRONOUSLY on the gesture with no dead pin-frame. This is
the zoom-transition "measure from the stable identifier's current rect" idiom: cache the
pane's intrinsic extent keyed on its id, invalidate on ResizeObserver. Optional/secondary —
the opacity-clock fix (3.1) is the dominant lag source.

---

## 4. Concrete values table (the recipe, for the consuming wave)

| Axis | SOTA value | glass-ui today | Action |
|---|---|---|---|
| Box-morph spring | snappy↔dock band, ζ 0.7–0.85, ~+5–7% | `--spring-dock` (0.32, 0.7, +4.6%) | KEEP — already SOTA |
| Crossfade clock | the SAME spring scalar (one clock) | fixed `0.3s × --spring-dock` CSS transition | **FIX — `calc(1 - --dock-morph-t)`** |
| Visibility hold | spring-settle callback / scalar threshold | hardcoded `var(--duration-normal)` 0.3s delay | **FIX — driver-settle flip** |
| Summary/persistent glyph onset | 0 (front-loaded, no stagger) | late stagger child (~0.40 onset) | **FIX — onset 0 / #persistent region** |
| Detail stagger step | 30–60ms beat (Kowalski) | `--dock-stagger-step: 0.08` ✓ in band | KEEP step |
| Detail stagger window | tighten so max-onset+window ≤ 0.75 | window 0.55, max-onset 0.40 → sum 0.95 | **FIX — narrow window** |
| Icon magnify-follow (DK2) | mass 0.1/stiff 170/damp 12, ζ≈1.46, 0% ring | n/a (hover-scale on box transition) | NOTE for DK2 wave — near-critical |
| Layer FLIP | shared single spring, all axes | ✓ size on spring | KEEP — extend to opacity |

---

## 5. DEDUP — which wave consumes this

The DK7 lag root cause (parallel opacity/visibility CSS clocks beside the live spring) is
**NOT cleanly owned by any existing planned wave** — but it is ONE small surgical CSS fix on
the SAME files W45 already opens. The verdict:

- **AX.W45 (dock region-model) is the natural HOME for §3.1 + §3.2.** W45 already rewrites the
  layer-region model in `GlassDock.vue` + `dock.css`, introduces the `#persistent` region
  (which structurally fixes DK1's late-summary-glyph, §3.2), and the crossfade/visibility
  rules (`dock.css:805-857`) sit in the SAME `dock.css` region W45 reauthors. **AUGMENT W45**
  with: "drive the `.dock-layer` opacity off `--dock-morph-t` (`calc(1 - t)`) instead of the
  `opacity var(--dock-motion-resize)` fixed-duration transition; flip `visibility`/
  `is-leaving` on the spring-settle callback, not the hardcoded `--duration-normal` delay —
  ONE clock for opacity AS WELL AS size; front-load the persistent glyph at stagger-onset 0."
  This is the W01/W02 "one clock" thesis EXTENDED from size to opacity — squarely W45's
  region-model remit, and it discharges DK7 + DK1 + DK6 in the wave that owns the layer model.

- **AX.W05 (spring vocabulary) is NOT the owner of DK7** — W05 governs the spring REGISTER
  cohort, and the registers are already SOTA. The ONLY W05-adjacent NOTE: §3.3's
  magnify-follow register (near-critical for a hover-magnify) is a DK2 concern; if W05's
  `--spring-*` census mints a near-critical register need, record it there — but DK7 itself is
  a CLOCK-COUPLING defect, not a register defect. **W05 ≠ DK7 owner.**

- **§3.4 (synchronous/cached source measurement) is the ONE part that touches `W01-owned`
  driver internals** (`useLayerTransition.ts` / `dockMorphContext.ts`). It is OPTIONAL and
  secondary (the opacity-clock fix is the dominant lag). If pursued, it is a W01/W02
  follow-on (the morph-driver owners), NOT W45 (W45 is `OUT of bounds` on the driver per its
  FileBounds). Record as a deferred driver-tune NOTE; do NOT bundle into W45.

**Net:** AUGMENT W45 with the opacity-on-scalar + front-loaded-summary fix (the dominant DK7
remediation, on the files W45 already owns). The spring CURVES need no change (W05 SOTA-clean).
The driver-measurement micro-tune (§3.4) is a deferred W01/W02 NOTE, not net-new.

---

## Sources

- [WWDC24 §10145 — Enhance your UI animations and transitions](https://developer.apple.com/videos/play/wwdc2024/10145/) (interactive→spring retarget, velocity-continuity, zoom shared-element, non-lag practices)
- [SwiftUI Animation.spring(duration:bounce:)](https://developer.apple.com/documentation/SwiftUI/Animation/spring(duration:bounce:blendDuration:)) + [nilcoalescing — Animation timing in SwiftUI](https://nilcoalescing.com/blog/AnimationTimingInSwiftUI/) (smooth/snappy/bouncy preset characteristics)
- [buildui — Magnified dock recipe](https://buildui.com/recipes/magnified-dock) (`mass 0.1, stiffness 170, damping 12`; SCALE 2.25; DISTANCE 110px; NUDGE 40px)
- [Smashing Magazine — CSS GPU animation, doing it right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/) + [Ekioh — will-change](https://www.ekioh.com/devblog/smooth-animations-with-css-will-change/) (transform/opacity compositor-only; fixed-duration-clock drift)
