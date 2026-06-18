# iOS-26/27 Safari Tab Switcher + the iOS-27 Tab/Segmented Model — Web-SOTA Research

> Assignment (BC, ios27-tab-switcher): deep web-SOTA research on the iOS-26/27 Safari TAB SWITCHER and
> the iOS-27 tab / segmented-control model. Pin TWO registers — (DEFAULT) the full iOS-27 glass tab
> system, (PILL VARIANT) the simpler segmented-control look the user pinned in the screenshot — plus the
> eased spring/morph target params (the user: the current tab spring is "too abrupt").
>
> Scope: this doc is the FOCUSED tab-switcher companion to `research/apple-ios27.md` (the broad Band-1/3/7
> corpus). It does NOT re-derive the glass MATERIAL math (kube.io squircle n=1.5, lensing, the D2 rim) —
> that lives in apple-ios27.md §1. It goes DEEP on the two tab registers + the morph engine + the eased
> spring, the inputs `BC.W-TABS-IOS` / `BC.W-LIQUID-TAB` / `BC.W-LIQUID-MORPH` / `BC.W-SPRING-EASE` /
> `BC.W-UNDERLINE-TUNE` bake.

---

## 0 — The headline (what changed, iOS 26 → iOS 27, and the user's two pins)

Apple shipped the Liquid-Glass tab/segmented system in iOS 26 (June 2025), then COURSE-CORRECTED it in
iOS 26.1 + iOS 27 (the 2026 cut) toward LEGIBILITY + PERSISTENCE. The net SOTA the user is pointing at:

1. **The DEFAULT register — the full iOS-27 GLASS tab system.** A floating Liquid-Glass capsule; the
   active tab is a glass PLATE that SLIDES + MORPHS between positions (never a fade); a tab-SWITCHER grid
   view fans the tabs into glass cards with a source-rect bloom; the bar scroll-minimizes (iOS 26) but is
   now PERSISTENT by default (iOS 27 — the collapse-to-icon retired, "two taps is worse than one").
2. **The PILL VARIANT — the simpler segmented control the user pinned (the value.js-demo small pill).**
   A rounded-PILL glass TRACK with the ACTIVE tab as a LIGHT / near-white RAISED rounded-pill PLATE bearing
   the (serif, in the user's pin) label; the inactive labels MUTED. This is the `UISegmentedControl`
   "sliding highlight pill" register — the calmer, smaller, two-to-five-segment chooser.

Both ride the SAME engine (one glass material, one spring family, one morph) — two registers, not two
systems. This mirrors glass-ui's existing BA.W-TABS grammar (`pill` = glass material, `underline` = paper
material) — the iOS-27 work UPGRADES the `pill` material + adds the switcher-grid + drag-morph.

**The user's "too abrupt" spring** is the THIRD pin: the current glide front-loads (snappy hits ~90% in
the first ~16% of its clock, then a dead-flat tail), reading as a hard jerk-to-place. The eased target is
a curve whose PERCEPTUAL arrival (~100-120ms, the quick read) is preserved while the travel FILLS the
clock — coupled scale+fade, the settle clock NOT truncated.

---

## 1 — REGISTER A (DEFAULT): the full iOS-27 GLASS tab system

### 1.1 The floating capsule (the bar shape)

- **Floating, inset, capsule-shaped.** The iOS 26 tab bar "isn't visually glued to the bottom edge
  anymore; it floats over content, is semi-transparent, and reacts to the background and lighting."
  Tab bars are "capsule-shaped and inset from the screen edges" — a stadium track, not an edge-to-edge bar.
  (9to5Mac; tomsguide; macobserver.)
- **Edge-to-edge content under it.** Web pages "extend edge to edge, reaching all the way to the bottom of
  the screen to maximize usable space" — the glass floats ABOVE live content (the glass-over-content
  identity; glass-ui's analogue is the dock/overlay self-darken over an unknown backdrop). (9to5Mac.)
- **The webpage WARPS around + inside the glass.** "You can see the webpage warp around and inside the
  glassy tab bar and buttons" — the lensing/refraction (apple-ios27.md §1.2, kube.io squircle n=1.5) is
  the load-bearing device, not a flat blur. (9to5Mac.)

### 1.2 The active tab is a MORPHING glass PLATE (not a fade)

The signature iOS-26 tab behavior (the user's headline): **"The glass doesn't just fade; it physically
morphs from one shape to another, maintaining the translucent material throughout the animation."** The
active pill MORPHS to the tapped tab's location, staying glass the whole way. (Donny Wals.)

**The morph ENGINE (the SwiftUI primitive, transposed to the web idiom):**
- `GlassEffectContainer(spacing:)` groups the glass shapes into ONE shared sampling region — "glass cannot
  sample other glass," so nested glass must share one container (apple-ios27.md §1.1, the glass-on-glass
  rule). The `spacing` value is the MERGE threshold: when two glass shapes get within `spacing`, they
  "visually blend and morph together" (the liquid merge). (arshtechpro; diskcleankit; Donny Wals.)
- `@Namespace` + `.glassEffectID(_:in:)` on each shape is the morph-identity mechanism — iOS 26 REPLACED
  `matchedGeometryEffect` with this glass-aware morph: "SwiftUI uses the spacing provided to the effect
  container along with the geometry of the shapes themselves to determine when and which shapes to morph
  into and out of." (search digest; conor.fyi.)
- The morph is driven by `withAnimation(.bouncy(duration: 0.35))` / `.bouncy(duration: 0.4)` in Apple's own
  examples (the tab/segment morph clock — §3 below). (Donny Wals; arshtechpro; conor.fyi.)

**Web transposition (what glass-ui already has):** glass-ui does NOT need `GlassEffectContainer` — the
active-pill morph is the `useTabIndicator` FLIP (the indicator translates+squishes between button rects on
`--spring-snappy` at `--tab-indicator-duration`). The "maintains translucent material throughout" is met
by construction (the indicator IS one persistent glass plate that moves, never two plates cross-fading).
The merge-when-close is the `useDragMorph` rubber-band fling (BC.W-LIQUID-TAB). The gap is the MATERIAL
(the pill must read as iOS glass — stadium + distinct lifted plate + bright catch-light rim, BC.W-TABS-IOS)
+ the eased SPRING (§3).

### 1.3 The tab-SWITCHER grid view (the overview)

The Safari tab switcher (the "show all tabs" overview) in iOS 26:
- **Swipe-up reveal.** "You can swipe up on the address bar to reveal the tab overview" — the bar morphs
  UP into the grid (a source-rect bloom from the bar, not a separate screen). (macobserver.)
- **A grid of glass CARDS.** Each tab is a thumbnail glass card; "long-press a thumbnail to close other
  tabs or drag to reorder." The cards carry the glass material (the thumbnail is the content, the chrome
  is glass). (macobserver; 9to5Mac.)
- **The color BLEEDS over the page.** Tapping the bar reveals controls "through a new Liquid-Glass-style
  animation and behavior, bleeding over the colors and elements of the webpage underneath" — the
  materialization (apple-ios27.md §1.1: "objects materialize in and out by gradually modulating the light
  bending and lensing"). The grid blooms FROM the bar's rect (the source-rect bloom). (9to5Mac.)

**glass-ui mapping (BC):** the tab-switcher-grid is the `useLiquidReveal` source-rect bloom
(BB.W-LIQUID-REVEAL — `ElementMorph(settledRect, triggerRect)` driven by the spring 1→0, transform-origin
at the trigger) fanning a SET of glass cards. It is NOT a Band-3-core requirement (the user's primary tab
ask is the capsule + pill + drag-morph); the grid is a DEMO/showcase composition over the shipped bloom
leaf + the `<Card surface="glass">` set. Recorded as the iOS-27 reference for the switcher-grid demo, the
booked source-rect-bloom-over-card-set composition — no new primitive (the bloom + the card both exist).

### 1.4 Scroll-minimize → iOS-27 PERSISTENT (the course correction)

- **iOS 26: scroll-minimize.** `.tabBarMinimizeBehavior(.onScrollDown)` — on scroll-down the bar "shrinks
  into a compact floating capsule," giving content room; expands on scroll-up ("tab bars fluidly expand
  when users scroll up — a lively experience"). (Donny Wals; macobserver; createwithswift.)
- **iOS 27: the collapse is RETIRED.** iOS 27 "removes the collapsing behavior introduced in iOS 26,
  making the full navigation bar persistent and restoring one-tap access." The design principle named:
  **"two taps is always worse than one, no matter how elegant the animation between them."** Apple also
  "refines the implementation — addressing shadows, opacity, and transparency quirks." (aprenderhub;
  macrumors; gearpatrol.)

**glass-ui mapping (BC):** the scroll-minimize is a tab-bar facility glass-ui does NOT currently expose on
SegmentedTabs (it has a `:responsive` collapse-to-`<Select>`, a different mechanic). Per the iOS-27 course
correction, the scroll-minimize is NOT a default (persistence won); a scroll-shrink tab bar is a BOOKED
opt-in (the `<ScrollCard>` scroll-timeline + a `scroll(self)`-driven `--tab-bar-minimize-t` would be the
native-CSS path — no JS scroll lib, the W-SCROLL-MOTION fence). Recorded; NOT a Band-3-core requirement —
the user's pins are the capsule/pill/drag-morph/eased-spring, not scroll-minimize.

### 1.5 The legibility course-correction (the binding lesson)

iOS 26's glass controls FAILED on contrast (NN/g): "anything placed on top of something else becomes
harder to see"; tab bars "split between navigation and search" became hard to parse; "Liquid Glass makes
UI elements translucent and bubbly. The result is light, airy — and often invisible." iOS 26.1 added the
**Clear ↔ Tinted** global preference (a frosted/firm escape) and iOS 27 firms the default. The lesson
(verbatim Apple, WWDC §219): **"The amount of tint and the dynamic range shift to always ensure buttons
remain legible, while letting as much of the content through as possible."** (NN/g; digitaltrends;
macrumors.)

**The binding tab rule:** the active-vs-inactive SEPARATION must be STRONG (the active plate reads clearly
forward; the inactive label is muted but legible). The glass-morphism INCREASES, legibility INCREASES with
it — the user's "iOS-27 = increased glass-morphism WHILE increasing legibility" is Apple's own correction.
This maps to glass-ui's W55 adaptive-tint seam (the pill darkens-over-bright to stay legible) + the AA
contrast contract (the active label ≥4.5:1 over the composited pill, BC.W-TABS-IOS T5).

---

## 2 — REGISTER B (PILL VARIANT): the segmented-control the user pinned

The user's screenshot pin is the SIMPLER register — the iOS / value.js-demo segmented control:
**a rounded-PILL glass TRACK with the ACTIVE segment as a LIGHT/near-white RAISED rounded-pill PLATE
bearing the label, the inactive labels MUTED.** This is the `UISegmentedControl` "sliding highlight pill"
(SOTA confirmed): "Segmented Glass Controls feature a sliding highlight pill for toggling views
(Day/Week/Month), replacing standard radio buttons"; "a gorgeous floating glass tab bar with a sliding
selection indicator … via UISegmentedControl with a beautiful `glassEffect(.regular.interactive())`
capsule." (liquid-glass-web; berkaypng; search digests.)

### 2.1 The anatomy (the four parts the user pinned)

| part | iOS / value.js-demo look | glass-ui register (existing) |
|---|---|---|
| **track** | a thin rounded-pill glass capsule (stadium ends), quiet / low-opacity translucent | `--glass-bg-quiet` + `--glass-blur-quiet`; radius → `--radius-tab` = `--radius-pill` (BC.W-TABS-IOS T1) |
| **active plate** | a LIGHT / near-white RAISED rounded-pill, a DISTINCT lifted glass plate forward of the track (bright top catch-light + a soft under-shadow lifting it ~1-3px off) | `--glass-bg-floating` tinted + the directional rim (`--glass-rim-top`/`-bottom`) + a real under-shadow (BC.W-TABS-IOS move 2) |
| **active label** | the label ON the raised plate, FULL ink (the user's pin: a serif label) | `--foreground`, ≥4.5:1 over the pill (T5) |
| **inactive label** | MUTED (a quiet gray-warm), no plate | `--muted-foreground` / `--on-glass-muted` |

**The "raised near-white plate" is the load-bearing differentiator** (the user's pin, and the iOS lesson):
the active segment is NOT a same-hue +30%-alpha brightness step (the glass-ui HEAD defect — track 50% α,
pill 80% α SAME warm-cream hue → barely perceptible). It is a DISTINCT material step — a brighter/whiter
fill + a catch-light rim + a lift shadow — so the plate reads FORWARD of the track. apple-ios27.md §3.3
names this exact gap ("active pill → a DISTINCT lifted glass plate — a brighter/whiter fill + a stronger
catch-light rim + an under-shadow that lifts it OFF the track — NOT +30%-alpha-same-hue").

### 2.2 The "small pills, not squared" pin (the radius)

The user's verbatim: **"PROPER SMALL PILLS, not squared (like the current value.js demo)."** The iOS
register is a STADIUM (fully-rounded ends, `border-radius: 9999px` clamping to half-height): "the
characteristic glass morphism aesthetic … blends signature Liquid Distortion with 'Squircle' geometry"
— corners are `.capsule` (stadium) or `.containerConcentric` (radius follows the container, never an
arbitrary corner). (liquid-glass-web; diskcleankit; Donny Wals.)

The glass-ui HEAD measured defect (glass-dock-codebase.md §3.1, re-stated for grounding): indicator
`border-radius: 6px` on a 23px-tall pill = 0.26 of half-height → reads as a rounded-RECTANGLE. A stadium
needs radius ≈ half-height (~11.5px on a 23px pill), i.e. `--radius-pill` clamped to half by the box.
BC.W-TABS-IOS T1 mints `--radius-tab: var(--radius-pill)` (the role-bearing pill register, the value.js
DESIGN.md "avoid hand-rolling rounded-full when the role-bearing token applies" idiom) and the TRACK
follows at the concentric proportion (pill radius + the trim inset — Apple's `.containerConcentric`).

### 2.3 The PILL-vs-DEFAULT relationship (the two registers, one engine)

- **PILL (Register B)** is the CALM, small, two-to-five-segment chooser — the value.js-demo look, the
  user's screenshot. The active plate is a quiet lifted glass pill; no drag-morph required (a tap snaps
  the pill over). This is glass-ui's `<SegmentedTabs variant="pill">` UPGRADED to the iOS material.
- **DEFAULT (Register A)** is the FULL iOS-27 glass tab SYSTEM — the same capsule + plate material, PLUS
  the drag-morph (BC.W-LIQUID-TAB pull-an-active-tab), the source-rect-bloom switcher-grid (demo), and the
  deeper glass (the active plate optionally reaches `.glass-deep` for the richest selected register, the
  `:deep-pill` opt-in BC.W-TABS-IOS move 2 books).

They share: the `--radius-tab` stadium, the directional rim (no dark D2 bar), the W55 adaptive tint, the
eased spring (§3), the `useTabIndicator` glide+squish engine. The DEFAULT is the PILL + the drag-morph +
the switcher-grid; the PILL is the DEFAULT minus the drag/grid. ONE material, two registers.

### 2.4 The serif label (the user's pin) — a CONSUMER preset, not a library token

The user's pinned screenshot shows a SERIF label on the active pill. Per presets-in-consumers
(MEMORY) + the warm-cream identity fence: the library's tab label inherits the page font register (the
glass-ui type ladder — sans/mono), NOT a baked serif. A consumer who wants a serif label sets it on its
own surface (`font-family` on the tab strip in the consumer repo). Recorded so the serif is NOT mistaken
for a library tab-font change — the value.js demo's serif is the value.js demo's preset. The library
register is the GLASS material + the stadium + the lifted plate; the font is the consumer's.

---

## 3 — The eased SPRING/MORPH (the user: "the current tab spring is too abrupt")

### 3.1 The defect — the front-load (measured)

glass-ui `--spring-snappy` (response 0.35 / ζ 0.65, the tab glide curve) hits **1.01073 at 12.245%**,
peaks **1.06804 at 16.327%**, is back under 1.006 by **26.531%**, and is dead-flat `1.00000` from
**48.980% onward** (the emitted `linear()` stop list, scheme-motion.css). So the PERCEPTUAL travel is over
by ~16% of the clock; the remaining ~84% is an invisible sub-pixel tail. On a SHORT glide it reads crisp;
on a LONGER travel (a big-distance pill move, a drag-fling) the eye sees a hard JERK-to-place then nothing
— the "too abrupt" the user named. The 2%-band clock is 0.34s but the visible motion lives in the first
~55ms. (glass-dock-codebase.md §3.3; springPresets.ts; the existing BC.W-SPRING-EASE starting-state.)

### 3.2 The Apple spring family (the SOTA target — confirmed)

The three SwiftUI presets ALL default `duration: 0.5s` and differ only by `extraBounce`; the
`interactiveSpring` is the press/drag register:

| preset | duration (response) | extraBounce | ζ = 1 − bounce | overshoot | use |
|---|---|---|---|---|---|
| `.smooth` | 0.5s | 0.0 | 1.0 (critically damped) | 0% | entrances, fades, scale-ins |
| `.snappy` | 0.5s | **0.15** | ≈0.85 | small (~5-7%) | crisp control morphs — **the tab/segment register** |
| `.bouncy` | 0.5s | 0.30 | ≈0.70 | clear (~15%) | emphatic one-shots — **the tab MORPH clock** (`withAnimation(.bouncy(duration: 0.35))`) |
| `.interactiveSpring` | response 0.15s | — | 0.86 (blendDuration 0.25) | tiny | press/drag, mid-gesture |

**The bounce↔damping facts (confirmed, the binding formulas):**
- **ζ = 1 − bounce** (Apple's official, corrected on the Developer Forum; apple-ios27.md §2.2). SwiftUI
  "duration" ≈ "response" (the perceptual settle axis, "chosen to be predictable and not move around even
  as other spring parameters change"). (nilcoalescing; createwithswift.)
- **`bounce = 0.15` is "brisk and not bouncy"** (Amos Gyamfi, verbatim) — the snappy target: a small
  overshoot, lively but controlled. **`bounce ≥ 0.3` is "a larger overshoot"** (the bouncy register).
  `bounce = 0` is critically damped (smooth, no overshoot). (Amos Gyamfi manifesto.)
- The morph is `withAnimation(.bouncy(duration: 0.35))` / `.bouncy(duration: 0.4)` in Apple's own tab
  examples — so the iOS tab MORPH rides a ~0.35-0.4s clock with the bouncy ~15% overshoot, NOT a hard
  snap. (Donny Wals; conor.fyi; arshtechpro.)

### 3.3 The "perceptual arrival ~100-120ms" target (the user's pin, grounded)

The user's pin: the eased snappy curve has a perceptual arrival ~100-120ms, coupled scale+fade, settle
clock NOT truncated. The physics:
- Apple's `.snappy` (response 0.5 / ζ 0.85) reaches ~90% of travel at roughly **20-25% of the perceptual
  duration** (≈100-125ms of a 0.5s response) — the QUICK read — while the SETTLE (the 2%-band, where the
  `linear()` flattens) runs the full clock. The overshoot is small (bounce 0.15), so the arrival reads
  decisive without a jerk. This is the "quick BUT eased" the user wants: arrival ~100-120ms, the travel
  FILLING the clock (no dead-flat tail at 49%).
- The glass-ui HEAD `snappy` (0.35/0.65) arrives FASTER (~55ms) but DEAD-FLATTENS at 49% — the front-load.
  The eased fix SPREADS the travel so 90%-arrival lands later (~100-120ms = ~25-30% of clock) and the curve
  stays in motion to ~55-70% of the clock — the perceptual-arrival quick read PLUS a filled clock.

### 3.4 The eased TARGET params (what BC.W-SPRING-EASE bakes — grounded, π-pinned)

The retune is the ONE `SPRING_PRESETS` table (springPresets.ts) → `regen-spring-tokens.mjs` (CSS
`linear()`) + `curves.ts` (JS twins), drift-proof. SURGICAL — two curves eased, one minted, three kept:

1. **`snappy` — fill the clock (the abrupt fix).** Move toward Apple `.snappy` (response **0.5** / ζ
   **0.85**) OR a measured middle (**response ~0.42 / ζ ~0.78**) that keeps it QUICK (perceptual arrival
   ~100-120ms) while spreading the travel so the analytic **90%-travel fraction lands in [0.55, 0.70] of
   the 2%-settle clock** (NOT ≤0.20 = the front-load). The exact pair is π-determined (the 90%-travel
   fraction is computable from (response, ζ) BEFORE any paint — pin the pair landing in [0.55, 0.70]).
   Keep the small overshoot (≤+7%, the Apple `.snappy`/bounce-0.15 band) — quick + a whisper of life, no
   dead tail. **This is the TAB GLIDE curve** (`--tab-indicator-duration` = `--spring-snappy-duration`).
2. **`bouncy` — ease the over-spring to the Apple band.** HEAD ζ 0.45 (overshoot +20.5%, reads "ringy")
   → **ζ 0.60** (overshoot ~+14%, the Apple 12-18% band; ζ 0.60 ≈ bounce 0.40 — more playful than Apple's
   0.30 but controlled). response stays 0.5. **This is the tab MORPH / dialog enter clock** (matches
   Apple's `withAnimation(.bouncy(duration: 0.35))` tab morph register).
3. **MINT the iOS `press` register** (response **0.15** / ζ **0.86** — Apple `interactiveSpring`). The
   press SCALE magnitude (`--scale-press: 0.96`) is unchanged; this adds the missing PHYSICS. The tab
   pill's drag-fling (BC.W-LIQUID-TAB) + the button press read it.
4. **`smooth` / `dock` / `gentle` UNCHANGED** (recorded keeps): `smooth` ζ 0.86 (deliberate sub-perceptual
   alive-peak); `dock` 0.32/0.7 (value.js/kf-fenced); `gentle` 0.7/1.0.
5. **The COUPLED fade (P3) is verified, not re-built.** The opacity rides the SAME spring scalar as the
   transform on the SAME `--spring-<name>-duration` clock (motion-canon P3 fade-coupled-to-transform). The
   tab pill materializes as ONE coupled liquid layer — never a fast-color-snap-then-slow-spring desync.
6. **The clock is NEVER truncated** (motion-canon ratify-note + W-GLASS-CAL): the "quick" read is the
   spring's EARLY arrival (~100-120ms), NOT a shorter clock. The fix is the CURVE SHAPE (fill the clock);
   the `--spring-*-duration` clocks re-derive analytically from the new (response, ζ). Truncating
   re-introduces the W-GLASS-CAL tail-jank.

### 3.5 The tab MORPH spring (the drag-pull / fling — Register A)

The iOS pull-tab (the user's BC.W-LIQUID-TAB ask): pull an active tab → it morphs + squishes to the drop
slot. The iOS model: the pill follows the finger ~1:1, stretches along travel by VELOCITY (volume-
preserving squish, capped LOW), and on release flings velocity-continuously to the NEAREST tab, settling
with a small overshoot. (Donny Wals; the iOS interactive drag model.)

glass-ui maps this to `useDragMorph` (BB.W-DRAG-MORPH) + the `:draggable` SegmentedTabs axis — the
architecture EXISTS. The fling SPRING reuses a SPRING_PRESETS row (the `snappy` register post-ease, the
iOS drag clock) — NOT a new clock. The squish caps at `--tab-indicator-max-stretch` (1.08, ≈+8%,
release-at-arrival `INDICATOR_RELEASE_AT_ARRIVAL = 0.82`) — SOTA-correct (Material/iOS release-at-arrival),
UNCHANGED. The gap is the MATERIAL (the dragged pill reads as iOS glass) + the paint, not the engine.

---

## 4 — The bake table (the numbers the BC tab/spring waves consume)

### Register A — the iOS-27 glass tab system (BC.W-TABS-IOS + BC.W-LIQUID-TAB)
| param | glass-ui HEAD | iOS-27 / SOTA target | wave |
|---|---|---|---|
| track radius | 8px on 39px track (rounded-rect) | `--radius-tab` = `--radius-pill` (stadium), track concentric | W-TABS-IOS T1 |
| active pill radius | 6px on 23px pill (0.26 half-height — squared) | ≈ half-height (`9999px` clamps) — true stadium | W-TABS-IOS T1 |
| active pill fill | `--glass-bg-floating` raw, +30% same-hue α | oklab-tinted floating (W55 seam), brighter/whiter distinct step | W-TABS-IOS T2 |
| active pill rim | uniform warm-ink ring + weak `0 1px 3px /0.08` | directional rim (`--glass-rim-top` catch-light / `-bottom` shadow) + real under-shadow (lift ~1-3px) | W-TABS-IOS T2 + W-BLACK-BAR |
| dark D2 bar | warm-ink top hairline reads dark | NO dark on top — bright catch-light top only | W-TABS-IOS T3 + W-BLACK-BAR |
| active label contrast | (varies) | ≥4.5:1 over composited pill, both modes (iOS legibility mandate) | W-TABS-IOS T5 |
| glide spring | snappy 0.35/0.65 (front-loads, dead-flat @49%) | eased snappy (90%-travel ∈ [0.55,0.70] of clock; arrival ~100-120ms) | W-SPRING-EASE S1 |
| morph clock | `--tab-indicator-duration` = `--spring-snappy-duration` | matches Apple `.bouncy(0.35)` tab morph (eased bouncy ζ 0.60) | W-SPRING-EASE S2 |
| squish cap / release | 1.08 (+8%) / 0.82 release-at-arrival | keep (SOTA-correct) | (UNCHANGED) |
| drag-morph | `useDragMorph` + `:draggable` (exists) | iOS pull-morph-squish, fling-to-nearest; reuse snappy row | W-LIQUID-TAB |
| switcher-grid | (none) | source-rect bloom (`useLiquidReveal`) over a `<Card surface="glass">` set | demo (booked, no new primitive) |
| scroll-minimize | (none; `:responsive`→Select) | booked opt-in (native `scroll(self)` `--tab-bar-minimize-t`); NOT default (iOS-27 persistence) | booked |

### Register B — the segmented-control PILL (the user's screenshot pin)
| param | target | source |
|---|---|---|
| track | thin rounded-pill glass capsule, quiet/translucent | iOS `UISegmentedControl` glass capsule |
| active plate | LIGHT/near-white RAISED rounded-pill, distinct lifted glass (bright top, soft under-shadow) | the value.js-demo pin + iOS sliding-highlight-pill |
| active label | full ink on the plate (serif = CONSUMER preset, not library) | the user's pin + presets-in-consumers |
| inactive label | muted (`--muted-foreground` / `--on-glass-muted`), no plate | iOS + NN/g legibility (clear active/inactive separation) |
| shape | stadium (`.capsule`), small proportioned pad | iOS `.capsule` / `.containerConcentric` |
| relationship to A | = Register A minus drag-morph + switcher-grid | one material, two registers |

### Springs (BC.W-SPRING-EASE — the ONE `SPRING_PRESETS` table)
| preset | HEAD (resp/ζ) | TARGET (resp/ζ) | overshoot | note |
|---|---|---|---|---|
| smooth | 0.5 / 0.86 | KEEP | ≤2% | deliberate alive-peak |
| snappy | 0.35 / 0.65 | **~0.42-0.5 / ~0.78-0.85** (π-pinned, 90%-travel ∈ [0.55,0.70]) | ≤+7% | the abrupt fix — fill the clock, arrival ~100-120ms |
| bouncy | 0.5 / 0.45 | **0.5 / 0.60** | ~+14% | ease the over-spring to the Apple band; the tab-morph clock |
| press (NEW) | — | **0.15 / 0.86** | tiny | Apple `interactiveSpring` — press/drag/fling |
| dock | 0.32 / 0.7 | KEEP (value.js/kf-fenced) | ~+4.6% | iOS-control settled morph |
| gentle | 0.7 / 1.0 | KEEP | 0% | patient critically-damped |
| — | — | **ζ = 1 − bounce** | — | the binding formula the generator honors |

---

## 5 — The fences (the iOS-27 work must NOT violate)

- **One material, two registers** — Register A (full glass tab system) is Register B (the pill) + drag-morph
  + switcher-grid. NOT two CSS recipes; the pill material is the ONE source both read (the substitution-
  over-redeclaration discipline; BA.W-TABS two-material grammar holds — `pill` = glass, `underline` =
  paper, byte-untouched here).
- **The engine is INVIOLATE** (BC.W-TABS-IOS) — `useTabIndicator` (the glide/squish), `useTabDragMorph`,
  `constants.ts` (`MAX_STRETCH 1.08`, `RELEASE_AT_ARRIVAL 0.82`) are byte-untouched by the MATERIAL wave;
  the SPRING is eased at the `SPRING_PRESETS` table (BC.W-SPRING-EASE), not at the engine.
- **The spring is the ONE table** — edit `SPRING_PRESETS`, re-run `regen-spring-tokens.mjs`, both CSS +
  JS twins re-derive (no second authority, no hand-edited `linear()` string; `proof:spring-tokens-synced`).
- **The clock is NEVER truncated** — "quick" is the early perceptual arrival (~100-120ms), not a shorter
  settle clock; the `--spring-*-duration` clocks re-derive analytically (motion-canon ratify-note).
- **Legibility increases WITH glass** (the iOS-27 course correction, the binding mandate) — the brighter/
  tinted active plate LIFTS legibility (the W55 darken-over-bright reaches the pill); the active label
  reads ≥4.5:1, never less. A prettier pill that buries its own label fails (the material-over-legibility
  trap).
- **Cross-engine** — the pill material is `backdrop-filter: blur()+saturate()` + a plain `box-shadow` rim
  (NO `backdrop-filter: url()` on the load-bearing path — the lens is Chrome-only progressive enhancement,
  apple-ios27.md §6). The stadium + catch-light + AA label paint identically on WebKit.
- **Presets-in-consumers** — the serif label, any consumer hue, the value.js-demo's exact pad are CONSUMER
  presets; the library register is the GLASS material + the stadium + the lifted plate. No consumer hue/
  font enters a library token.
- **No D2 dark bar** — neither the track nor the pill writes a dark warm-ink top hairline; both read the
  directional rim (BC.W-BLACK-BAR). The top edge is a bright catch-light, never a dark line.

---

## 6 — Sources

- [9to5Mac — Safari gets the iOS 26 treatment with new Liquid Glass interface](https://9to5mac.com/2025/06/09/safari-gets-the-ios-26-treatment-with-new-liquid-glass-interface/) (the Safari tab bar warp / color-bleed / edge-to-edge / scroll-shrink)
- [macobserver — Safari Tabs in iOS 26 Explained](https://www.macobserver.com/tips/ios-26-safari-tabs/) (the swipe-up tab overview grid, long-press close, drag-reorder)
- [tomsguide — iOS 26 Safari lets you pick your own tab design](https://www.tomsguide.com/phones/iphones/ios-26-safari-lets-you-pick-your-own-tab-design-heres-how-to-do-it) (Compact / Bottom / Top layouts; capsule float)
- [9to5Mac — iOS 26: How to change Safari toolbar design (Compact)](https://9to5mac.com/2025/09/15/iphone-ios-26-safari-new-compact-design/) (the Compact default, scroll-shrink/bounce)
- [Donny Wals — Exploring tab bars on iOS 26 with Liquid Glass](https://www.donnywals.com/exploring-tab-bars-on-ios-26-with-liquid-glass/) (`tabBarMinimizeBehavior(.onScrollDown)`, the morph-not-fade, the active-pill morph, `.glassEffect(.regular.interactive())`)
- [aprenderhub — iOS 27 Tab Bar Fix: Apple's Liquid Glass Course Correction](https://www.aprenderhub.com/2026/05/ios-27-tab-bar-fix-liquid-glass.html) (iOS 27 persistence, collapse retired, "two taps worse than one", shadow/opacity refinement)
- [MacRumors — iOS 26 Liquid Glass guide](https://www.macrumors.com/guide/ios-26-liquid-glass/) (Clear/Tinted, frosted-glass tab/nav bars)
- [NN/g — Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/) (the legibility/contrast failures, active/inactive separation lesson)
- [DEV (arshtechpro) — Understanding GlassEffectContainer in iOS 26](https://dev.to/arshtechpro/understanding-glasseffectcontainer-in-ios-26-2n8p) (the `spacing` merge threshold, `glassEffectID`/`@Namespace` morph, `withAnimation(.bouncy)`)
- [DEV (diskcleankit) — Liquid Glass official best practices for iOS 26 / macOS Tahoe](https://dev.to/diskcleankit/liquid-glass-in-swift-official-best-practices-for-ios-26-macos-tahoe-1coo) (`.regular`/`.clear`, `.interactive()`, `.glassProminent`.tint for the selected segment, `.capsule`, `GlassEffectContainer(spacing:)`)
- [liquid-glass-web (itch.io) — Liquid Glass iOS26 UI Kit, IOS Components](https://liquid-glass-web.itch.io/liquid-glass-ui-kit-modern-tailwind-components-for-websites-apps/devlog/1279073/149-ios-components) (the sliding-highlight-pill segmented control, the `glassEffect(.regular.interactive())` capsule)
- [Amos Gyamfi — The Meaning, Maths, and Physics of SwiftUI Spring Animation (manifesto)](https://medium.com/@amosgyamfi/the-meaning-maths-and-physics-of-swiftui-spring-animation-amos-gyamfis-manifesto-0044755da208) (`bounce=0.15` "brisk not bouncy", `bounce≥0.3` larger overshoot, `damping = 1−4π×bounce÷duration`)
- [nilcoalescing — SwiftUI animation timing](https://nilcoalescing.com/blog/AnimationTimingInSwiftUI/) (perceptual duration vs settling time; `.snappy` slightly underdamped, small overshoot, more lively than smooth)
- [createwithswift — Understanding Spring Animations in SwiftUI](https://www.createwithswift.com/understanding-spring-animations-in-swiftui/) (response/dampingFraction; perceptual duration "predictable, does not move around")
- [createwithswift — Making the tab bar collapse while scrolling](https://www.createwithswift.com/making-the-tab-bar-collapse-while-scrolling/) (the scroll-minimize mechanic)
- [conor.fyi / GitHub conorluddy/LiquidGlassReference — iOS 26 Liquid Glass SwiftUI Reference](https://github.com/conorluddy/LiquidGlassReference) (`withAnimation(.bouncy(duration: 0.4))`, the glass morph idiom)
- companion corpus: `docs/tranches/BC/research/apple-ios27.md` (the broad Band-1/3/7 glass-material + spring-table source this doc goes deep ON; §1.2 refraction math, §2.2 spring table, §3 tabs gap-table)
