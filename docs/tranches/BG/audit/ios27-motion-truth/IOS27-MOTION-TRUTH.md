# IOS27-MOTION-TRUTH — the frame-by-frame motion verdict (BG · 2026-07-03)

The binding frame-level diff between the iOS-27 reference frame ladders (`ref/`) and the
live glass-ui frame series (`live/`, tranche/BG HEAD demo-dist @ `:5200`, real on-screen
Chrome 149/Metal, CDP screencast 60–110fps). This doc is the fold target the cursor
names for **F5.2 `W-LIQUID-WEIGHT-DEFAULT`** and **17.4 `W-ANIMATION-CONGRUENCE`**
(both HELD awaiting it) and supplies the cross-page criteria for **17.6
`W-PAGE-COMPONENT-AUDIT`**. Judge: Fable motion judge, frames read directly
(montaged crops under `_judge/`; annotated strips under `live/_strips/`).

READING THE GAPS: screencast frames emit only on repaint — a post-settle gap is idle.
Only a gap DURING an active gesture window is a stall. A multi-hundred-ms animation
that emits ZERO intermediate frames is **not painting**, full stop — the scalar moving
in a DELTA probe does not make paint true (the headless-green/visually-broken class,
twice re-caught below).

**Verdict ledger: 5 BORKED · 2 ROUGH · 1 CLOSE · 0 MATCHES.** The user's gestalt
("the majority read borked, not smooth, not iOS-27") is frame-confirmed.

---

## §1 · The reference register — the iOS-27 numbers (60fps ground truth)

Distilled from the 14 reference ladders (corrected timings; the 5fps-sampling artifacts
of earlier audits are struck):

| Channel | The iOS-27 number | Source clip |
|---|---|---|
| SPATIAL slot-crossing (tab lens, 206px) | 33–67ms (2–4 frames); slowest observed 150ms | tab-indicator |
| Full gesture, all channels settled | 0.40–0.45s | tab-indicator |
| Mid-flight travel stretch | aspect ~1.30–1.35 : 1, re-rounds at arrival | tab-indicator |
| Arrival overshoot (lens centroid) | ≤1px (~0.5% travel) — critically damped | tab-indicator |
| Arrival glyph scale-pop | dip-then-recover +12% pixel-count (~+6% linear) over ~6 frames | tab-indicator |
| EFFECTS trail SPATIAL | old-label tint fade ≈ 370–400ms AFTER the spatial leg lands | tab-indicator |
| Sheet bloom (FLIP art, pill→sheet) | 330ms to <1%, seated ~230ms + sub-pixel tail; **ZERO overshoot** (monotonic decel-expo) | sheet-bloom-open, triad-bloom |
| Scrim engage | 70–80ms, COUPLED to launch, transmissive (page reads through at ~60–65% luma) | sheet-bloom-open |
| Sheet collapse (drag-assisted) | ~0.6s tracked + 0.3–0.35s ballistic settle, no overshoot; page behind FULLY painted every frame | sheet-collapse-livebehind |
| Dock fission (scroll-driven split) | 0.45–0.50s total: carve 0–70ms → capsule liquefy (alpha dips 30–50%) + descend → re-opacify; fused waist only 2–3 frames | dock-fission-split |
| Dock re-merge (tap-driven) | 0.25–0.30s — the tap direction is ~2× faster than the scroll split | triad-collapse-remerge |
| Press → morph onset | 4–6 frames (67–100ms); press fills the puck with a bright warm accent | triad-collapse-remerge f044 |
| Module entrance (CC) | 0.35–0.47s total, top→bottom stagger 60–120ms/band, scale-in from 0.85–0.90, overshoot **+2–5%** (small, graceful — NOT +10%) | cc-entrance |
| Module exit (CC) | ~130ms squish+fade — exits FASTER than entrances, zero overshoot-past-gone | cc-dismiss |
| Backdrop blur engage | GESTURE-COUPLED: ≤33ms on a flick, up to ~0.77s on a slow pull — never a fixed tween | cc-engage-music, spotlight-engage |
| The ONE animated (non-gesture) blur leg | cc-dismiss de-blur: ~300ms expo, TRAILING the module exit | cc-dismiss |
| NavStack push (drill-in) | ~0.3s lateral, old exits left + new enters right CO-PRESENT, decelerating, no overshoot; top chrome buds fade-in-place ~0.2s | drillin-context |
| App-open bloom | 0.35–0.40s zoom-from-icon, decel-expo, no overshoot; home recedes+blurs COUPLED | app-open-bloom |
| Glyph rigidity | plates morph/liquefy; **glyphs NEVER distort** — they glide, fade, or scale-pop as rigid bodies | all dock clips |
| Content crossfade under a moving plate | 50–80ms | tab-indicator (page swap) |

**Overshoot assignment (binding):** overshoot belongs to SMALL-element entrances
(modules +2–5%, tab-arrival glyph pop ~+6%) — **sheets, blooms, drawer seats, and
carousel snaps are critically damped / monotonic** in every reference clip. A +9–12%
overshoot anywhere in the sheet/bloom class EXCEEDS the reference (wrong as a
match-bar; see §5 calibration).

---

## §2 · Per-facility verdicts

### 2.1 dock-collapse-expand — **BORKED**

Reference twins: dock-fission carve/settle (glyphs rigid, plate morphs, active glyph
lens-carried), the collapsed-floor circle canon (AY.W-DOCK-NAV B4).

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Glyph integrity mid-morph | rigid always | **scaleX-squished** — all 4 glyphs distort with the plate (expand ~t2302–2401); home glyph a vertical sliver through the collapse |
| Collapsed REST paint | clean 1:1 circle + rigid glyph | **horizontally-compressed glyph SLIVER inside a rounded square — a standing paint bug at rest** (t1219→t2241, every settled frame) |
| Outgoing content fade | fades in place WHILE the plate carves (0–70ms of a 250ms topology) | gone in ~50ms (t942→992) of a ~500ms morph → **wide near-EMPTY pill for ~100ms** |
| Gesture answer (hover→first morph paint) | 67–100ms (press→onset 4–6 frames) | **~280ms** (hover-enter marker t2018 → first visible change t2302; jankGaps empty — the paint simply didn't change) |
| Morph clock | 0.25–0.5s, weighty, no content lie | ~500ms collapse / ~215ms visible expand — the clock itself is fine |

**Frame diagnosis.** The BD.W-DOCK-CORE mechanism (`layers.css` reserves
`inline-size: var(--dock-expanded-px)`; `shape.css` composes `scale:
--dock-size-scale × --stretch × --dock-punch-stretch` on the dock ROOT along the
morph axis) scales the **content with the plate** — there is no content
counter-scale, so glyphs compress by construction, and at collapsed rest the box is
still the expanded footprint scaled down (the sliver is permanent, not transient).
iOS morphs the PLATE while the glyphs stay rigid (fission f013–f026: the plate
contracts around in-place-fading glyphs; the active glyph glides undistorted).

**Jank classes:** no-squish (inverted — squish of the WRONG thing: content
distortion), discontinuous-handoff (content gone at onset / pops back squished),
wrong-clock (gesture-answer latency).

**Fix vocabulary.** (a) Content rigidity: an inner content layer carrying the FLIP
inverse (`scale: calc(1 / max(var(--dock-size-scale), 0.06)) 1` on the morph axis,
compositor-only) so the plate scales and the glyphs do not — or the clip-APERTURE
form (plate reshapes via `clip-path` inset over the reserved footprint, content
byte-rigid; the aperture is what `overflow:clip` was supposed to read as). (b) At
settle, DROP the transform and seat the true collapsed box (`transform/scale: none`
at rest; the residual scale may live only under `[data-morphing]`) — the collapsed
rest must paint the B4 1:1 circle + rigid glyph. (c) The outgoing glyph fade rides
`--ease-out` COUPLED to the box travel window (P3), not `calc(1 − t)` against a
spring that spends its travel early — the pill must never read empty. (d) The
summary glyph is lens-carried: rigid, cross-fading only at the ends. (e) Hover→first
morph paint ≤100ms (intent-dwell 60ms + ≤2 frames).

**Owning wave:** NEW clause — **`W-DOCK-GLYPH-RIGID`** (§4.5 draft). Numbers bound
into the F5.2 Fable sweep.

### 2.2 dock-layer-switch — **ROUGH**

Reference twins: page-content crossfade under a moving plate (50–80ms), fission
plate morph (box monotonic between real topologies).

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Crossfade shape | overlapped — surfaces co-present, 50–80ms content swap | **SEQUENTIAL: out-fade → blank glass plate ~100–150ms → in-fade** (switch-2: root at t2103 → near-empty small plate t2126–2217 → legible t2276) |
| Box trajectory | monotonic A→B glide | **dips BELOW both endpoints mid-swap** — the plate shrink-wraps a near-empty pane then re-grows (t2126 plate ≪ either pane) |
| Ghosting | none (crisp swap under the glide) | double-exposure label ghost (outgoing + incoming text superposed at low alpha, t2194–2276) |
| Clock | one spring | one `--dock-morph-t` scalar — correct (17.4-clean) |
| Stalls | — | 119/95ms gaps at t360/479 sit inside the switch-1 window (attribution shared with the pre-click auto-scroll; switch-2 is stall-free) |

**Jank classes:** discontinuous-handoff (sequential fades + blank dead-zone),
layout-thrash-adjacent box dip (mid-flight re-measure through an empty stack).

**Fix vocabulary.** (a) OVERLAP the crossfade on the ONE scalar: leaving pane
`opacity: 1 − clamp(0, t/0.6, 1)`, entering `clamp(0, (t − 0.15)/0.5, 1)` (or
equivalent) so both panes are co-present mid-swap — no window where neither reads;
content swap perceptually ≤120ms under the `--spring-dock` box glide. (b) The box
FLIP interpolates between the two PRE-MEASURED endpoints monotonically — never
re-measure mid-flight through the emptying stack; assert `min(A,B) − ε ≤ box(t) ≤
max(A,B) + overshoot` for every frame. (c) The ghost dies with the overlap fix (the
outgoing is gone before the incoming passes ~50% alpha at its position, or the
incoming pane is opacity-ramped as a UNIT on its own plate).

**Owning wave:** NEW clause — **`W-DOCK-PANE-OVERLAP`** (§4.5 draft); the one-clock
fact is 17.4's to re-verify (already clean).

### 2.3 shell-vh-morph — **BORKED**

Reference twin: there is no iOS V↔H topology flip — the nearest grammar is the
fission split (0.45–0.5s carve→liquefy→settle) + the P5 rule that a topology reflow
hides at an occluded midpoint. glass-ui's own 4.10 claim IS the bar.

| Measure | claim / reference grammar | glass-ui live |
|---|---|---|
| Painted travel frames | `--dock-morph-t` over 23 frames + teardrop bridge at midpoint (4.10 DELTA) | **ZERO painted travel frames** — leg 1: ~1.3s no visible change (incl. a 295ms stall right after toggle), then a SINGLE-FRAME hard swap (bottom dock → left rail + content re-margin in the same frame, 53ms stall at the flip); leg 2 hard-swaps within ~300ms |
| Topology reflow | hidden at the occluded midpoint | **naked** — the whole layout jumps in one frame |
| In-gesture stalls | none | 295ms + 53ms |

**Frame diagnosis.** The 4.10 DELTA verified the SCALAR (23 distinct
`--dock-morph-t` frames, `--stretch` peak 1.227, goo mounted) — my capture on
`/foundations/colors` via `window.__shellDockMorph.toggle()` shows the PAINT: no
travelling plate, no squish, no teardrop, one hard reflow. The scalar spring runs;
nothing visible reads it on this route. This is the headless-green/visually-broken
class landing on the morph axis — the acceptance measured custom-property frames,
not painted pixels.

**Jank classes:** discontinuous-handoff (single-frame topology swap) + layout-thrash
(the flip is one giant synchronous reflow; the 295ms stall is the measure storm).

**Fix vocabulary.** The travelling PLATE must paint: the aside/dock plate visibly
reshapes across ≥12 intermediate frames on the `--dock-morph-t` scalar (the
`.dock-morph-bridge--inplace` teardrop legible in the 0.18 < t < 0.82 window), the
content re-margin lands INSIDE the occluded midpoint (one discrete reclaim, not the
opening frame), no in-gesture stall >100ms (pre-warm the endpoint measures off the
gesture path). π is a SCREENCAST frame-series (CDP `Page.startScreencast`, not a
settled capture, not a scalar probe), born-RED on the current paint, on BOTH shell
routes (a dock story route AND a content route like `/foundations/colors`).

**Owning wave:** re-opens 4.10's paint claim → NEW clause **`W-SHELL-MORPH-PAINT-REPAIR`**
(§4.5 draft; 4.10 itself is UNTOUCHABLE-DONE, so the repair is a new row). 17.6's
480-capture MUST include this gesture as a frame-series, not a still.

### 2.4 tabs-indicator-glide — **CLOSE** (the only near-match)

| Measure | iOS-27 (tab lens) | glass-ui live |
|---|---|---|
| Slot crossing | 33–67ms (slowest 150ms); full gesture 0.40–0.45s | glide ~200–250ms, settle within the snappy clock — full-gesture parity OK, crossing ~3× slower |
| Travel stretch | aspect ~1.30–1.35 | cap `--tab-indicator-max-stretch: 1.11` → aspect ≈1.23 (volume-preserving s·1/s) |
| Arrival | ≤1px overshoot + glyph scale-pop ~+6% linear over ~6 frames | overshoot fine (release-at-arrival squish reads); **glyph pop ABSENT** |
| EFFECTS trail | old-label tint fades 370–400ms AFTER arrival | label ink flips with the travel — **no trailing EFFECTS leg** |
| Register | ~200px refractive LENS (content bows at the rim, covered glyph red-tints) | opaque-ish glass plate — the lens register is absent (a surpass successor, not a jank) |
| Smoothness | — | no pops, no in-gesture dropped frames — the cleanest facility of the set |

**Jank classes:** wrong-clock (mild — crossing slower than the lens), stagger-absent
on the EFFECTS trail, missing arrival glyph pop. No janks proper.

**Fix vocabulary.** Calibration only: (a) `--tab-indicator-max-stretch` 1.11 → ~1.15
(aspect ≈1.32; requires an EXPLICIT recorded amendment of the BD anti-taffy composed-
bbox ≤1.14 fence — the reference's own mid-flight bbox grows ~1.22×, so the fence as
written under-shoots the reference; amend, don't silently exceed). (b) The arrival
glyph scale-pop: the newly-active tab glyph rides a one-shot ~+6% dip-recover on the
`press`/`snappy` register (the IconChip reveal precedent), PRM-static. (c) The
old-label ink cross-fades on `--ease-out` ~370ms TRAILING the spatial arrival (P1
EFFECTS leg — one clock per channel, two channels). (d) The refractive-lens
indicator (content displacement + covered-glyph accent tint) stays the NAMED
successor (BD T4 `W-DOCK-TAB-INDICATOR` vocabulary) — surpass, not match-bar.

**Owning wave:** **F5.2** (the sweep binds these numbers as its tabs row).

### 2.5 dialog-glass-reveal — **BORKED**

Reference twins: sheet-bloom (scrim coupled 70–80ms), cc-entrance (module
materialize 0.35–0.47s, scale 0.85–0.9 + fade + blur coupled).

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Enter | ≥0.3s coupled scale+fade+(blur) materialize | **fully-formed in ONE ~44ms frame step** (t202 absent → t246 complete at full size/opacity) — zero intermediate frames, `.glass-reveal` enter not painting |
| Scrim | dims WITH the launch, 70–80ms | dims over ~400ms AFTER the panel is already seated (t246→t899 still darkening) |
| Exit | ~130ms squish+fade, scrim released together | panel vanishes in ONE step (t1500→t1625); scrim trails ~600ms (t1625→t2294) |

**Frame diagnosis.** The `.glass-reveal` data-state recipe never composites a
from-state: reka mounts the portaled content already `data-state="open"` at first
paint, so the `[data-state="closed"]` → `[data-state="open"]` transition has no
prior computed style and never runs (the recipe's own header assumed reka flips
across a paint — it does not). The exit unmount races the transition the same way
(reka presence does not hold for a CSS transition here). Meanwhile the F5.1
`useLiquidReveal` JS leaf DOES paint (the W-MOTION-SPINE DELTA frame-series is
real) — the defect is confined to the zero-JS CSS path the Dialog actually rides.
The scrim runs its own longer clock, decoupled both ways.

**Jank classes:** opacity-pop + blur-pop (the whole enter/exit snaps),
discontinuous-handoff + inverted stagger on the scrim (surface then scrim; iOS is
scrim-with-launch).

**Fix vocabulary.** (a) Give the enter a real from-state: an `@starting-style` block
for `.glass-reveal[data-state="open"]` (the §TOP-LAYER `.glass-top-layer` grammar —
`@starting-style` binds the before-first-paint style for a newly-inserted element
regardless of data-state timing), keeping the closed rule as the exit snapshot — OR
arm the F5.1 `useElementMorph`/`useLiquidReveal` leaf on `DialogContent` by default
(driver-lock already ships). (b) Hold the exit: the panel must paint ≥4 exit frames
before unmount (transition-aware presence or the JS leaf's onSettle→unmount). (c)
Couple the scrim to the SAME window: overlay opacity reaches ≥80% of its dim within
~100ms of panel launch on `--ease-out`, released with the exit (one clock, 17.4's
axis). Enter spec: scale 0.88→1 (the `--glass-reveal-enter-scale` authority) + blur
4→0 + opacity coupled, ≥6 intermediate frames on the snappy clock.

**Owning wave:** NEW clause — **`W-OVERLAY-ENTER-PAINT`** (§4.5 draft; F5.1 is DONE
so the repair is new). Swept at F5.2 (overlay row); the scrim/panel one-clock is
17.4's congruence row.

### 2.6 route-page-build — **BORKED**

Reference twins: drillin-context push (~0.3s, both surfaces co-present), app-open
bloom (0.35–0.4s + receding old surface), cc-entrance stagger (60–120ms bands).

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Old surface | exits left / recedes+blurs, CO-PRESENT with the enter | unmounted atomically — no exit leg paints (by design, 2.1's wedge-avoidance) |
| New surface | enters as a decelerating spatial beat | **fully placed in ONE frame** ~150ms after push (69+53ms route-chunk stalls eat the entrance window); the `gl-route-enter` 12px rise is not readable in paint |
| Stagger | chrome→hero→body bands 60–120ms | only the h1 opacity fade (~500ms) + hero field fade (~1s) read; the StoryHeader 3-stage cluster reads as a plain text fade |
| First-frame integrity | never the settled layout | the first painted frame of the new route IS the settled layout |

**Frame diagnosis.** 2.1 `W-ROUTE-TRANSITION` landed the atomic keyed swap + an
on-mount `gl-route-enter` (translateY 0.75rem + fade, snappy, `backwards` fill). In
paint the beat is EATEN: the dynamic-import stalls (~120ms) land INSIDE the
animation clock (the animation start-time is style-resolve, the first composited
frame arrives ~120ms later — past snappy's half-clock arrival), and the surviving
tail of a 12px rise is sub-perceptual. No exit surface, no cascade.

**Jank classes:** discontinuous-handoff (hard cut), wrong-clock (the entrance clock
starts before first paint — stall-eaten), stagger-absent.

**Fix vocabulary.** (a) Start the entrance clock at FIRST PAINT of the new route:
pre-resolve the route chunk BEFORE the swap (`router.beforeResolve` awaiting the
import — the stall then precedes the swap instead of eating the beat) and/or arm the
animation from a first-frame rAF so frame 0 paints the `from` state. (b) Lift the
rise to a perceptible 16–24px (still `--spring-snappy` + `backwards`, P2/P4; PRM
keeps the fade drops the rise). (c) The reading-order cascade must READ: the
StoryHeader eyebrow→title→blurb stagger at 60–120ms/band with a real translateY leg
(the cc-entrance band grammar), body sections trailing on their `view()` cascade.
(d) An exit READ without re-introducing the wedge: a ~50–80ms fade-through snapshot
of the outgoing route (compositor-only overlay) is the reference-faithful minimum —
optional, but the enter beats (a–c) are binding. π: ≥8 painted frames of the rise;
the first painted frame after the swap must NOT equal the settled layout.

**Owning wave:** **17.6** (the cross-page capture owns the gesture read) + NEW
clause **`W-ROUTE-ENTER-VISIBLE`** on 2.1's landed shape (§4.5 draft). F7.1
`W-DEMO-IA-REDESIGN` re-authors the pages — the redesigned StoryPage carries these
beats through (F7.x rider).

### 2.7 drawer-snap-drag — **BORKED** (the worst of the set)

Reference twins: maps-sheet-detent (drag 1:1 + ~0.3s overshoot-free release settle),
maps-sheet-full (detent material coupling), sheet-collapse-livebehind.

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Open at Half | sheet seats at the 50% detent | **seats FULL-viewport** — `--glass-drawer-t` stays at its CSS fallback `1`, transform identity |
| Drag | 1:1 finger tracking | **ZERO sheet translation** mid-drag (t=1, identity throughout) |
| Release | ~0.3s exponential snap, no overshoot | the MODEL snaps (activeSnapPoint 0.5→0.12, DOM-probed) — **the sheet never moves** |
| Open animation | drag-coupled / ~0.3s settle | none — the sheet is just there |

**Frame diagnosis.** The model↔paint SEVER: `useDrawerSnap.writeScalar` (which
writes `--glass-drawer-t` inline on `contentEl` + `--stage-t` at `:root`) never
fires on the live demo — the snap engine's spring, the DRAWER_SNAP register
(0.4/0.82), and the detent ladder all work at model level while the
`translateY(calc((1 − t) · 100%))` inline transform reads the never-written scalar's
fallback `1`. The 10.2 settled-frame paint pass (`capture.css animation:none` +
fallback `1` = full open) structurally could not see this — a settled capture of a
dead binding looks identical to a settled capture of a live one. The wiring seam
(the `contentEl` ref binding and/or the `[data-glass-drawer-handle]` pointer-capture
attach and/or `ensureSpring` never invoked on open) must be repaired at the source.

**Jank classes:** discontinuous-handoff in its terminal form — a dead paint binding
(model animates, paint frozen).

**Fix vocabulary.** (a) Repair the `writeScalar → contentEl → inline translateY`
binding on the live `/compositions/drawer-live-behind` demo (ref wiring + handle
pointer-capture + open-seat write). (b) Then the already-specced layers land in
order: F5.1's KF-6 clause (`useLiquidFlex` fling-squish off DRAWER_SNAP's per-frame
value) and BD `W-DRAWER-DETENT-GLASS` (detent-fraction → glass-level/scrim/page
coupling, the T6 gap). (c) π is a LIVE-GESTURE frame-series, never a settled
capture: open-at-half paints `translateY(50%) ± 2%`; mid-drag translate tracks the
pointer 1:1 (±5%); release paints ≥6 snap-trajectory frames on DRAWER_SNAP with NO
overshoot past the seat (the maps-sheet ζ≈0.85–1.0 read); born-RED on the current
tree.

**Owning wave:** NEW clause — **`W-DRAWER-PAINT-BIND`** (§4.5 draft). 17.6's capture
must include the drawer gesture series.

### 2.8 dock-hover-press — **ROUGH**

Reference twins: triad-collapse-remerge f044 (press = bright warm accent fill +
luminance lift, press→morph onset 4–6 frames), the press register row (0.2/0.8).

| Measure | iOS-27 | glass-ui live |
|---|---|---|
| Hover plate | — (pointer hover is a glass-ui superset) | fades in smoothly 200–250ms — good |
| Press | accent fill + luminance lift, alive rebound | darken register paints (t1241–1393); **NO spring squish/bounce — the CSS `:active` floor only** |
| Press physics | interruptible, sub-200ms answer, tiny rebound (+1.5% press row) | none — the interruptible spring-press is not bound on dock controls (W-PRESS-UNIFY's booked third consumer, never landed) |
| Smoothness | — | three isolated ~52ms gaps, otherwise clean |

**Jank classes:** missing-spring (the press), plus a register question: the
reference press LIGHTENS the puck (accent fill); ours darkens (the deliberate
AZ.W-REGISTER-IOS darken+shrink). Recorded as a calibration question for the F5.2
Fable sweep, not a mandate.

**Fix vocabulary.** Bind `useLiquidPress` (the `press` SPRING_PRESETS row via
`springPreset("press")`, squish capped LOW ~1.04, interruptible velocity-continuous
re-seat) on `DockIconButton`/the dock control families — the booked consumer #3 —
writing a `--dock-press-t` drive so the darken/specular leg couples to the physics
(P3, one drive two legs); the CSS `:active` floor stays the no-JS fallback; PRM
snaps.

**Owning wave:** **F5.2** (the transition-register inversion is exactly this — the
interactive atoms gain the spring default; the dock control is its named row).

---

## §3 · The defect register (deduped)

| # | Defect class | Facilities | The one-line cure |
|---|---|---|---|
| D1 | **Dead paint binding** (model animates, paint frozen) | drawer-snap-drag; shell-vh-morph (scalar runs, nothing paints it on the shell route) | repair the scalar→paint seam; π = live-gesture screencast frame-series, born-RED |
| D2 | **Enter/exit never composites** (one-frame pop) | dialog-glass-reveal; route-page-build (stall-eaten) | `@starting-style` / JS-leaf arm / clock-starts-at-first-paint |
| D3 | **Content distorts with the plate** | dock-collapse-expand | content counter-scale or clip-aperture; transform:none at rest |
| D4 | **Sequential instead of overlapped handoff** | dock-layer-switch; dialog scrim; route swap | co-present surfaces; EFFECTS coupled to the SPATIAL window |
| D5 | **Box trajectory lies** (dip below endpoints / single-frame topology swap) | dock-layer-switch; shell-vh-morph | monotonic FLIP between pre-measured endpoints; reflow only at the occluded midpoint |
| D6 | **In-gesture stalls** (>100ms main-thread holds inside the gesture window) | shell-vh-morph (295ms); route-page-build (69+53ms); dock-layer-switch (119/95ms, shared attribution) | pre-warm measures + pre-resolve chunks off the gesture path |
| D7 | **Missing spring on press** | dock-hover-press | `useLiquidPress` on the dock control (booked #3) |
| D8 | **EFFECTS trail absent** | tabs (label), dialog (scrim inverted) | the trailing `--ease-out` EFFECTS leg (P1/P3) |
| D9 | **Stagger absent** | route-page-build; dock-collapse-expand (glyph cascade) | 60–120ms band stagger (cc-entrance grammar) |
| D10 | **Settled-capture blind spot** (acceptance passed on stills/scalars while the gesture is broken) | drawer (10.2), shell morph (4.10) | every motion facility's π is a frame-SERIES over a live gesture — binding for 17.6 |

---

## §4 · Binding criteria per forthcoming wave

### 4.1 F5.2 `W-LIQUID-WEIGHT-DEFAULT` — the storybook weight sweep (HELD → this fold)

The Fable sweep verdict IS the gate. The sweep must include THESE facilities at
THESE numbers (each a frame-series read over the live demo, both modes; PRM arm =
fade-keeps/transform-drops):

1. **tabs-indicator-glide**: travel stretch aspect ≥1.30 mid-flight (cap 1.11→~1.15
   + the recorded anti-taffy fence amendment), re-rounds at arrival ≤1px overshoot;
   arrival glyph pop ~+6% linear over ~6 frames; old-label ink fade TRAILS
   ~370–400ms on `--ease-out`; full gesture ≤0.45s. **Pass bar: CLOSE→MATCHES.**
2. **dock-hover-press**: press answers ≤2 frames, squish ≤1.04 volume-preserving on
   the `press` row, interruptible (a mid-release re-press re-seats velocity-
   continuous), rebound reads (+1–2%); the darken/specular leg couples to
   `--dock-press-t`. **Pass bar: ROUGH→MATCHES.**
3. **dialog-glass-reveal** (after W-OVERLAY-ENTER-PAINT): enter ≥6 intermediate
   frames (scale 0.88→1 + blur 4→0 + opacity coupled), exit ≥4 frames ≤150ms with
   zero overshoot-past-gone, scrim ≥80% dim within 100ms of launch.
4. **dock-collapse-expand** (after W-DOCK-GLYPH-RIGID): zero glyph aspect distortion
   in ANY frame (mid-morph AND rest — assert per-frame glyph bbox aspect within ±5%
   of rest); no frame where the pill is >30% travel with zero legible content;
   hover→first-paint ≤100ms.
5. **The weight-default inversion itself**: every base interactive spatial leg reads
   the spring-derived `linear()` (`--transition-liquid-spatial`), `.motion-calm` the
   opt-out — verified by the before/after sweep reading a WEIGHT delta on ≥N
   surfaces, with NO sheet/bloom-class surface gaining overshoot (§1 assignment).

The sweep files one verdict row per facility (BORKED|ROUGH|CLOSE|MATCHES); the wave
closes only with zero BORKED and the four rows above at their pass bars.

### 4.2 17.4 `W-ANIMATION-CONGRUENCE` — the one-clock sweep (HELD → this fold)

The A9 lock (`proof:motion-one-clock`) gains the CHANNEL-COUPLING arm this doc
grounds:

1. **One gesture, one clock family**: for every facility above, all channels of one
   gesture derive from ONE driver — panel+scrim (dialog: the scrim may not run a
   ~400ms clock decoupled from a 44ms panel), box+content (dock layer switch: both
   ride `--dock-morph-t` — verified clean, keep it locked), sheet+scrim+page-recede
   (drawer: `--glass-drawer-t`/`--stage-t` single-writer — the writer must PAINT, D1).
2. **EFFECTS trails SPATIAL, never leads and never decouples**: the trailing leg is
   `--ease-*` within the same gesture window (tab label ~370–400ms; scrim coupled at
   launch; blur gesture-coupled — a fixed blur tween where a gesture drives is a RED).
3. **The split/merge asymmetry is a sanctioned two-clock case** (scroll-split
   0.45–0.5s vs tap-merge 0.25–0.3s — direction-keyed, recorded, not drift).
4. **Exit ≤ entrance** per surface class (cc-dismiss 130ms out vs 370ms in): an exit
   clock longer than its entrance reds.
5. **In-gesture stall budget**: no main-thread hold >100ms inside any gesture window
   (D6) — the congruence sweep records the screencast gap histogram per facility.

### 4.3 17.6 `W-PAGE-COMPONENT-AUDIT` — the cross-page 480-capture close

The harmonized-whole read must carry GESTURE frame-series, not stills (D10 is the
close-class this kills):

1. **route-page-build**: the push gesture across ≥3 route pairs — ≥8 painted
   entrance frames, first-frame-after-swap ≠ settled layout, the eyebrow→title→blurb
   bands read at 60–120ms, no in-gesture stall >100ms (chunk pre-resolved).
2. **shell-vh-morph**: both legs on a dock route AND a content route — ≥12 painted
   travel frames, teardrop legible mid-window, content re-margin at the occluded
   midpoint only.
3. **drawer-snap-drag**: the live-gesture series (open-at-half seat, 1:1 drag,
   release snap) per W-DRAWER-PAINT-BIND's π.
4. **dock facilities** (collapse/expand, layer-switch, hover-press): the §4.1/§4.5
   numbers re-read over the REDUCED page set post-F7.1.
5. Every capture row that involves motion records fps + gap histogram + the
   per-facility verdict; a still may only close a STATIC criterion.

### 4.4 F7.x riders (demo family)

- **F7.1 `W-DEMO-IA-REDESIGN`**: the redesigned StoryPage/section-landing carries
  the route-entrance beats (§2.6 a–c) — the IA rewrite must not re-author the
  entrance as a bare opacity fade; the chrome→hero→body reading-order stagger is a
  page-anatomy requirement, not a polish pass.
- **F7.2 `W-CHASSIS-ADOPT-OR-RETIRE`**: the unified header cel must not add a second
  entrance clock (one page-build driver; 17.4 sweeps it).
- **F7.4 Pass-E convergence**: the 7 category landings inherit the §4.1 facility
  bars for any dock/overlay/drawer specimen they stage.

### 4.5 NEW clauses (drafted here; the orchestrator seats them)

**`W-DOCK-GLYPH-RIGID`** (F3-adjacent repair; precond: none; pairs 4.4 carve)
> The dock morph paints RIGID content over a morphing plate. (a) An inner content
> layer carries the per-frame inverse of the root morph-axis scale (`scale:
> calc(1 / max(var(--dock-size-scale), 0.06)) 1`, compositor-only) — or the plate
> morph is re-expressed as a clip-aperture over the reserved footprint with content
> untransformed. (b) At settle the dock root drops to `scale: none` over the TRUE
> collapsed/expanded box; any residual scale lives only under `[data-morphing]`;
> the collapsed rest paints the B4 1:1 circle + an undistorted glyph. (c) The
> outgoing glyph fade rides `--ease-out` coupled to the box-travel window — no
> frame >30% travel with an empty pill; the summary glyph is carried rigid. (d)
> hover→first-morph-paint ≤100ms. Gate: `proof:dock` gains a `glyph-rigid` arm
> (per-frame glyph-bbox aspect ±5% of rest, screencast series, born-RED on HEAD) +
> the F5.2 sweep row. MIGRATION: none (paint repair, no API).

**`W-DOCK-PANE-OVERLAP`** (F3-adjacent repair)
> The DockLayerGroup pane swap is an OVERLAPPED crossfade on the ONE
> `--dock-morph-t`: entering opacity engages by t≈0.15 while leaving persists to
> t≈0.6 (both panes co-present; no window where neither reads >0.3 alpha); the box
> FLIP interpolates monotonically between the two pre-measured endpoints (never a
> mid-flight re-measure through the emptying stack) — per-frame assert
> `min(A,B)−ε ≤ box(t) ≤ max(A,B)+overshoot`. Gate: `proof:dock` `pane-overlap` arm
> + a screencast π (no blank-plate frame, no box dip), born-RED on HEAD.

**`W-SHELL-MORPH-PAINT-REPAIR`** (re-opens 4.10's paint claim; 4.10 stays verbatim)
> The in-place V↔H morph must be TRUE IN PAINT on every shell route: ≥12 painted
> intermediate frames of plate travel/reshape per leg, the teardrop bridge legible
> in the 0.18<t<0.82 window, the content re-margin hidden at the occluded midpoint
> (never the opening frame), no in-gesture stall >100ms (endpoint measures
> pre-warmed off the gesture path). π: CDP screencast frame-series on BOTH a dock
> route and a content route, both directions, born-RED on the current
> single-frame-swap paint. A scalar/custom-property probe may not stand in for the
> painted series (the D10 fence).

**`W-OVERLAY-ENTER-PAINT`** (post-F5.1 repair; overlay band)
> The zero-JS `.glass-reveal` enter composites a real from-state: an
> `@starting-style` block for `.glass-reveal[data-state="open"]` (the
> `.glass-top-layer` §TOP-LAYER grammar) OR the Dialog/Sheet/Popover content arms
> the F5.1 `useElementMorph` leaf by default; the exit paints ≥4 frames before
> unmount (transition-aware presence / onSettle→unmount). The scrim couples to the
> panel window: ≥80% dim within 100ms of launch, released with the exit — one
> gesture, one clock family (17.4). π: enter ≥6 intermediate frames (scale 0.88→1,
> blur 4→0, opacity coupled), exit ≥4 frames ≤150ms no overshoot-past-gone, both
> modes, born-RED on the one-frame pop.

**`W-ROUTE-ENTER-VISIBLE`** (on 2.1's landed atomic-swap shape)
> The route entrance is visible in paint: the route chunk pre-resolves BEFORE the
> swap (`router.beforeResolve` awaits the import — the load stall precedes the
> beat), the entrance clock starts at the new route's first paint, the rise is
> 16–24px on `--spring-snappy`+`backwards` (PRM: fade only), the StoryHeader bands
> stagger 60–120ms. π: ≥8 painted rise frames; first-frame-after-swap ≠ settled
> layout; born-RED on the current stall-eaten cut. Optional surpass: a 50–80ms
> compositor fade-through snapshot of the outgoing route (no wedge — no Vue
> `<Transition>`, a rasterized overlay only).

**`W-DRAWER-PAINT-BIND`** (P0 of the drawer chain; precedes F5.1-KF-6 + BD
`W-DRAWER-DETENT-GLASS`)
> Repair the model↔paint sever: `useDrawerSnap.writeScalar` must fire on the live
> demo (contentEl ref binding, `[data-glass-drawer-handle]` pointer-capture attach,
> open-seat write) so `--glass-drawer-t` drives the inline translateY. π (live
> gesture, born-RED): open-at-half paints `translateY(50%)±2%`; mid-drag translate
> tracks the pointer 1:1 (±5%); release paints ≥6 DRAWER_SNAP trajectory frames
> with no overshoot past the seat. The CSS fallback `1` is kept (SSR/no-JS safe)
> but a `data-glass-drawer-snap-points` sheet whose scalar was NEVER written by
> first interaction is a gate RED (the fallback may not mask a dead writer again).

---

## §5 · Calibration notes against SPRING_PRESETS (record, don't silently retune)

Observed reference physics vs the tuned register table (`springPresets.ts`,
BD.W-ANIM-IOS27-TUNE). NO constant moves here — a feel-change is an explicit
orchestrator fence-lift; these are the measured deltas the F5.2 sweep should weigh:

- **Sheet/bloom class**: every reference arrival is MONOTONIC (sheet-bloom 330ms,
  triad-bloom, app-open, maps detents ζ≈0.85–1.0). `snappy` (+3.2%) and `bouncy`
  (+9.5%) overshoots are ABOVE the sheet-class ground truth — overshoot belongs to
  small-element entrances (+2–5% at cc-entrance) and tab arrivals (glyph pop), not
  sheets/drawers/blooms. The per-surface ASSIGNMENT (which register rides which
  surface class), not the table, is where the reference is enforced.
- **DOCK (0.68/0.64, settle 0.66s, +7.3%)**: the observed fission split is
  0.45–0.5s near-critically-damped, and the tap-merge is 0.25–0.3s. The dock row
  reads slightly slower + more overshooting than the reference; ALSO the reference
  is direction-asymmetric (scroll-split slow, tap-merge fast) — one row cannot
  express both; a direction-keyed clock scale is the honest form if the sweep
  confirms the read.
- **DRAWER_SNAP (0.4/0.82)**: at/above the reference overshoot band (maps arrivals
  are overshoot-free); moot until W-DRAWER-PAINT-BIND makes it paint at all.
- **cc-entrance overshoot** is +2–5%, not +9–12% — module entrances should ride
  `smooth`/`snappy`, reserving `bouncy` for the emphatic one-shots it names.
- **Blur is gesture-coupled** (≤33ms flick → ~0.77s slow pull); the only sanctioned
  ANIMATED blur is the dismiss de-blur (~300ms expo, trailing). Any future
  `W-BACKDROP-BLUR-ENGAGE` work binds to the gesture t, never a fixed tween.
- **Fused-waist, not necks**: the fission waist is 2–3 frames (33–50ms) of shared
  translucency — a drawn thin-neck-then-snap EXCEEDS the reference (fine as surpass,
  wrong as match-bar).

---

## §6 · Provenance

- Live: `live/<facility>/frame-*.jpg` + `frames.json` (timestamps, markers, stall
  gaps) + `live/NOTES.md` (capture rig); annotated strips `live/_strips/`.
- Reference: `ref/<clip>/f*.jpg` per the input ladder measurements (59.94fps;
  corrected timings — the liquid-video "0.8–2.0s entrance" and the v3-f006
  "accent-flood" reads are struck as sampling artifacts per the ladder notes).
- Judge crops: `_judge/*.jpg` (dock collapse/expand montages, layer-switch switch-1/2
  montages, ref tab-indicator + fission montages).
- Source seams read (no edits): `src/styles/glass/reveal.css`,
  `src/components/ui/drawer/composables/useDrawerSnap.ts`,
  `src/components/ui/drawer/DrawerContent.vue`, `src/styles/dock/layers.css`,
  `src/styles/dock/shape.css`,
  `src/components/custom/dock/composables/dockMorphContext.ts`,
  `src/styles/transitions.css` (`.route-enter`), `demo/layout/AppShell.vue`,
  `src/composables/motion/springPresets.ts`, `docs/design/motion-canon.md`,
  `docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`, the BG amended gestalt
  plan + execution cursor (wave statuses: F5.1/4.10/2.1/10.2 DONE; F5.2/17.4 HELD
  on this fold; 17.6 PENDING).
