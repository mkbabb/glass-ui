# Greenfield — the CORE liquid DOCK · LENS C (audacious 1940s-technicolor FLOW & PUNCH)

> The brief: redesign GlassDock + its collapse/expand morph, the icon-buttons, the
> section/rail model, the triggers, from first principles, through the boldest cartoon
> register — and make the morph GENUINELY right, not just metric-right. The cardinal trap
> is mechanism-vs-gestalt: JUDGE-3 said PASS, the user still rejects it. This lens
> live-reproduced the user's exact gesture, defaulted to BROKEN, and judged the GESTALT.

---

## 0. LIVE RE-VERIFY — what the orchestrator/JUDGE-3 metric MISSED (the smoking gun)

I drove the REAL hover-to-expand gesture on `/dock/overview` dock[1] ("Collapsible (hover
to expand)"), the real auto-margin-centred dock, via chrome-devtools-mcp (real CDP pointer
hover, not synthetic dispatch), recording a per-frame `getBoundingClientRect` series.

**A3 grow-from-centre — the metric PASSES, the gestalt FAILS.**
- `cxExcursion: 0px` — the centroid held **765.5 every frame**. This is exactly what JUDGE-3
  measured and passed. The centre IS pinned.
- BUT the **WIDTH path is non-monotonic and inverted**. One clean expand frame-series:
  `w 64.9 (t0) → 90.4 (t.74) → 31.1 (t1.073, the overshoot PEAK) → 44.9 → … → 224 settled`.
  At the spring's overshoot peak (`--dock-morph-t = 1.073`), where the pill should be at its
  WIDEST (~overshoot past 224), the width **collapses to 31px**. A second capture caught the
  width ballooning to **2451px then snapping to 2.6px** mid-flight.
- The user SEES the pill lurch wider, then SHRINK back through the middle of its own expand,
  then pop to full. The centre is pinned, so the metric is green — but the motion reads as a
  stutter/double-take, the opposite of a confident liquid grow. **THIS is "still broken."**

**Root cause (live-traced + source-confirmed).** I caught `--dock-root-morph-to: 12.96px`
on a real read while `--dock-root-morph-from: 59px`. The measure pipeline
(`dockMorphMeasure.ts measureAndArmMorph`) produced a **degenerate `to` SMALLER than `from`**.
The reserve/floor guards only catch `measuredTo === 0` (`morphMinFloorPx`), NOT a degenerate
`to < from`. So `--dock-root-ratio = from/to = 59/13 ≈ 4.5`, and the center-out scale
`ratio + (1−ratio)·t` with the overshoot `t = 1.073` evaluates to `4.5 + (1−4.5)·1.073 ≈ 0.74`
— a scale BELOW 1 at the moment it should overshoot ABOVE 1. The width inverts. The whole
edifice — `measureAndArmMorph` + `seatTargetSync` + the nested-`max-content` ordering + the
root-pin lift/restore + 3 floor guards — is a **per-swap FLIP-measure** that is intrinsically
race-prone: it measures `max-content` across a layer swap, in a rAF, while siblings re-pin, and
ONE bad read poisons the ratio for the whole morph. The mechanism is too clever to be reliably
correct, and the gate only checks the centroid the bad ratio happens to preserve.

**What IS clean (CONFIRM-and-keep, do NOT re-litigate):**
- Live nav docks (`/display/buttons`, the bottom nav-dock here): warm-cream, 0 broken-rail
  artefacts, clean pill. RESOLVED. ✔
- Collapsed REST state: a clean 59×59 warm-cream circle, Home glyph centred. ✔ (A5 at rest)
- Vertical pill (`/dock/rail`): clean warm-cream rounded capsule, lifted active glass tier,
  generous padding. ✔ (A11 at rest)
- `--glass-blur-dock-radius: 9px` calm. ✔ (A4) · warm-not-gray both modes. ✔ (S1)
- A7/A8 trigger unify + no-recolor verified by JUDGE-3 and source-present. ✔

**The verdict that matters: the MORPH PATH is the broken thing, and it is broken because the
per-swap measure-and-arm is the wrong mechanism.** A2/A6/A5-in-motion all ride the same path.

---

## 1. CORE IDEA — "the SHADE that PULLS OPEN": a ratio-FREE, measure-once, one-scalar morph

Replace the entire per-swap FLIP-measure-and-arm machinery with a **single proportion the dock
owns at rest**, driven by ONE spring scalar, with the OVERSHOOT carried by a SEPARATE squash
channel that is volume-preserving and therefore can never invert the box. The dock stops being
a thing that measures itself every swap; it becomes a thing that KNOWS its two footprints
(collapsed pill ⇄ expanded plate) and **scales between them like a window shade pulled open** —
center-out by construction, with cartoon weight stacked on top as deformation, never as size.

The three structural moves:

### (a) ONE proportion, measured ONCE, off the inner content — `--dock-fill`
The dock has exactly two states a user cares about: collapsed (a pill the size of the summary
glyph) and expanded (the natural width of the full content row). Instead of re-measuring
`max-content` across every swap, the dock measures its expanded content width **once on mount /
on ResizeObserver** (the content row already lays out at its natural size behind the clip — we
read it directly, no `max-content` forcing, no nested ordering dance) and stores it as
`--dock-expanded-px`. The collapsed size is the summary control's own box (`--dock-collapsed-px`,
also content-derived). The morph is then a pure scalar:

```
--dock-fill: 0 → 1          /* the ONE spring-driven scalar (was --dock-morph-t) */
--dock-live-px: calc(var(--dock-collapsed-px) + (var(--dock-expanded-px) - var(--dock-collapsed-px)) * var(--dock-fill));
```

This is **monotonic by construction** — `live-px` is a convex blend of two POSITIVE measured
footprints, so it can NEVER go below the smaller or invert, regardless of spring overshoot,
because **the overshoot does not live on this channel** (see (c)). No `from/to` ratio, no
`from > to` degeneracy possible, no floor guards needed (the two endpoints are the floors).
The box reserves `--dock-expanded-px` (ONE layout solve, CDP-Layout-flat, the good property of
the current design KEPT) and the visible size rides `scale: calc(var(--dock-live-px) / var(--dock-expanded-px))` from `transform-origin: center` — **container-justify-agnostic, center-out by
construction** (the one genuinely good idea in the current code, KEPT and SIMPLIFIED). A
ResizeObserver re-reads `--dock-expanded-px` when content changes; that's the ENTIRE measure
surface — no per-swap rAF race.

### (b) the spring rides a 0→1 scalar with **NO overshoot on the SIZE channel**
`--dock-fill` is driven by `--spring-dock` BUT clamped to its monotone envelope for the size
blend: the size channel uses the spring's **position toward 1 without the >1 excursion**
feeding the px blend (a `clamp(0, fill, 1)` on the size term). The audacious overshoot the user
WANTS is not gone — it moves to the squash channel (c), where it deforms instead of resizing.
This is the single most important correctness move: **a spring that overshoots its target is
correct for a TRANSFORM (a 1.07 scale settling to 1.0 reads as bounce) but catastrophic for a
SIZE BLEND with a bad ratio (it drives the box past/through its own endpoints).** Separate the
two and the inversion class is structurally impossible.

### (c) the PUNCH lives on `--dock-squash` — volume-preserving, can't change footprint
The cartoon weight (anticipation dip, overshoot bounce, the §L4 squash-and-stretch) rides a
SECOND scalar `--dock-squash` driven by `--ease-cartoon-punch` (the real ~4% pre-dip + ~22%
overshoot `linear()` token, source-verified at `scheme-motion`/design.md §Easing), composed as
a **volume-preserving** `scale: (1+s) (1/(1+s))` along the morph axis (the `useLiquidFlex`
X·Y≈1 recipe the dock already imports via `--stretch`). Because it is reciprocal, it deforms
the pill — stretches it along travel, pinches it across — WITHOUT moving its footprint or its
centroid. The overshoot is now a SQUISH you can see (the pill overshoots by getting *taut and
thin* then settling plump), not a width that lurches. This is the boldest cartoon register
expressed on the ONE channel that is mathematically safe to exaggerate. `--motion-weight`
(rest `1/φ`, dock pushes toward `0.85`) co-scales the squash depth + the anticipation pull +
the cartoon-shadow travel together (design.md §L4), so the whole deformation reads as one
proportioned punch.

> **Net:** size = a monotone convex blend of two measured endpoints (correct, boring, bulletproof).
> punch = a volume-preserving reciprocal squash with cartoon overshoot (audacious, safe, visible).
> The two NEVER cross channels, so the gestalt is a confident liquid grow-from-centre with a
> real bounce — and the inversion the user keeps rejecting is gone by construction.

---

## THE SINGLE BOLDEST MOVE

**Kill the per-swap FLIP-measure-and-arm pipeline entirely (`measureAndArmMorph` +
`seatTargetSync` + the nested-`max-content` ordering + the root-pin lift/restore + all three
floor guards) and replace it with ONE rest-measured proportion `--dock-fill` blending two
positive endpoints, while the audacious cartoon OVERSHOOT is exiled to a SEPARATE
volume-preserving `--dock-squash` channel that can deform the pill but mathematically cannot
resize it.** The dock stops measuring itself mid-gesture (the race that produces the degenerate
`to:12.96px` → inverted ratio → the width that shrinks during its own expand) and instead pulls
open like a window shade between two known footprints — center-out by construction — with the
1940s PUNCH stacked on top as a visible squash-and-stretch that can never touch the size. The
trap dies because correctness and audacity are split onto orthogonal channels: the boring
channel can't be exciting, and the exciting channel can't be wrong.

---

## 2. THE FULL SPEC (visual · motion · interaction · mechanism)

### 2.1 The morph — "pull the shade" (A2/A3/A5/A6 — the user's motion complaints)

| Defect | Greenfield resolution | Mechanism |
|---|---|---|
| **A3 grow-from-centre** | `scale: live-px/expanded-px` from `transform-origin:center` over a reserved `expanded-px` box. Center-out by construction, any container justify. | layers.css simplified: ONE scale, `--dock-fill` blend, NO ratio. |
| **A2 longer hover window** | `--dock-collapse-delay` (rest ~`φ·240ms ≈ 388ms`) before the collapse spring fires; the expand fires immediately on hover-enter. Asymmetric by design — easy to enter, forgiving to leave (the iOS dwell). `useDockHold` already models keep-open; extend it to own the leave-debounce. | `useDockMorphWindow` owns the enter(0ms)/leave(delay) asymmetry. |
| **A5 collapsed icon align** | The collapsed pill IS the summary control's box; the glyph is centred in its own button (already clean at rest — KEEP). The fix is that it STAYS centred THROUGH the morph because the morph is now a uniform center-scale, not a content reflow. | The summary layer + full layer crossfade on `--dock-fill` (opacity = smoothstep), both centred in the same grid cell. |
| **A6 synced icon morph (icons don't bounce out of sync)** | The icons do NOT animate their OWN size during the morph — they ride the parent's `--dock-fill` scale as ONE rigid group, then a SINGLE staggered reveal (`useStaggerReveal`, per-glyph delay × `--motion-weight`, outer→inner) plays the follow-through. Because the parent scale is monotone and center-origin, the children inherit a synced inertial arrival FROM CENTRE — there is no per-child width math to desync. | The icon row is `scale`-inherited; the only per-child motion is the opacity/scale-pop reveal stagger, which is follow-through (§L4 #5), not a competing size morph. |

The morph SPRING: `--spring-dock` (0.66s, source-verified, the weighty iOS-27 linear() that
overshoots to 1.07 at 14%) drives `--dock-fill` BUT the **size blend clamps `fill` to [0,1]**;
the overshoot >1 is routed into `--dock-squash` (the punch). On collapse, the squash plays the
INVERSE (anticipation-dip then settle, NO overshoot-past-gone — the §L4 P2 exit rule).

### 2.2 The cartoon register — 1940s technicolor FLOW & PUNCH (the lens)

- **Anticipation (§L4 #2):** on hover-enter the pill DIPS `--dock-squash` ~−4% (pinches in)
  for ~1 frame before the shade pulls open — the cartoon wind-up. `--ease-cartoon-punch`'s real
  sub-origin pre-dip carries it (source-verified token, NOT a spring — springs can't dip below
  origin). PRM zeroes it.
- **Squash & stretch (§L4 #1):** the pull-open stretches the pill along travel + pinches across
  (reciprocal, vol-preserving). The faster the morph (velocity-coupled via `useLiquidFlex`), the
  MORE it deforms — `--motion-weight` 0.85 makes the dock one of the loudest squashers in the lib.
- **Follow-through / overlap (§L4 #5):** the icon glyphs settle AFTER the plate (`useStaggerReveal`
  per-glyph delay × weight, outer→inner cascade, reversed on collapse — the README's documented
  cascade, KEPT). The active-item accent label cross-fades TRAILING the glide (T4).
- **Arcs (§L4 #7):** the dragged item (A12) follows a subtle arc, not a straight line, via a
  `translateY = -sin(progress·π)·--motion-weight·6px` lift on the drag transform.
- **The MOVING cartoon cast (design.md §Shadows · `.shadow-cartoon-*`):** the dock opts into the
  cartoon-shadow register — a bold layered-offset ink cast on a `::after` caster that travels
  OPPOSITE the morph (the cel-light-fixed law), deepens as the pill pulls open (lifts off its
  shadow), snaps back on collapse. `transform` on the caster, never animated `box-shadow`
  (§L7 compositor law). This is the single most "1940s" visual — the bold drop-shadow that
  slides as the object moves. PRM → static cast. `prefers-contrast:more` → cast opacity floors up.

### 2.3 Triggers — unified + aligned (A7/A8, already PASS — KEEP, harden)

`DockSelectTrigger` / `DockDropdownTrigger` / `DockPopoverTrigger` all wear the byte-identical
`.dock-trigger` recipe (padding 4px 8px · radius 9999px · gap 4px — source-confirmed) and ride
the `keepOpen` + `data-glass-dock-portal` teleport contract (so a menu teleports OUT — Apple's
no-glass-on-glass rule, the page documents it). **A7 (no recolor):** the plate bg is invariant
on open because the menu teleports to its OWN sampling region, never paints a second glass plate
inside the dock. KEEP this; the greenfield CONFIRMS it stays clean. The only addition: the
trigger's active/open state rides the SAME `--dock-control-active` glass-tier lift as a nav tab
(DRY — one active recipe), so an open dropdown reads as a lifted control, not a recolored dock.

### 2.4 Draggable + reorderable items (A12 — make it real on the ICONS, not just the rail)

`useDockItemDrag` (source-present) wires onto the dock ICON CONTROLS (opt-in `:draggable`,
roving-tabindex preserved, the SegmentedTabs `:draggable` precedent). The gesture is the full
1940s cartoon: **grab → squish (`--stretch` gel-pinch, vol-preserving, capped) → pull (follows
pointer on a compositor `translate`, with the arc lift) → fling → settle-reorder** with the
neighbours sliding to make room on `--spring-dock`. JUDGE-3 confirmed the reorder commits; the
greenfield KEEPS the engine and ensures the grabbed item rides the cartoon cast (it lifts off
its shadow while grabbed — the deepest cast in the dock). PRM → instant reorder, no fling arc.

### 2.5 The vertical pill + rail (A11 — clean at rest, KEEP; unify the axis)

The vertical dock is ONE orientation axis of the SAME GlassDock (`orientation="vertical"`, no
fork — confirmed clean at rest). The morph is the inverse-axis twin: `--dock-fill` blends
block-size, the squash is `scale: (1/(1+s)) (1+s)` (Y-stretch). The "rail" is the legitimate
`DockLayerGroup` layer-switcher hairline (NOT the deleted broken facets carousel) — KEEP. Bigger
padding is `--dock-pad-block` at `φ`-derived rungs (design.md §L6 proportion). The active item
is a lifted glass tier via `aria-pressed` (no hand-rolled active class — the page documents it).

### 2.6 The fission (A13 / T2) — the iOS Apple-Music goo-split (engine ships, KEEP)

`useDockFission` + `DockGooFilter` (Safari-safe `filter:url()` SVG metaball, NOT
`backdrop-filter:url`) + `fission-bridge.css` ship and JUDGE-3 confirmed the split fires with
weighty inertial `--island-t`. This lens does NOT re-fork it; it notes the assembly gap
(`useScrollChrome → useDockFission` on the real shell, the highest-value WIRING wave per
IOS27-REFERENCE T2) as a SEPARATE assembly, and ensures the split's necks ride the SAME
`--motion-weight` + cartoon cast for register consistency. The split is the boldest TOPOLOGY
move; the morph-fix above is the boldest CORRECTNESS move — they compose (a fissioned sub-dock
is just another GlassDock that pulls-the-shade open).

---

## 3. CROSS-ENGINE (Chrome + Safari) + a11y/PRM carve (§L5/§L7)

- **Compositor-only:** the morph is `scale` + `transform-origin` + reciprocal `scale` squash +
  `translate` drag — all compositor channels, both engines. The reserved-footprint `inline-size`
  is ONE layout solve (not per-frame), CDP-Layout-flat. NO `backdrop-filter:url` anywhere (the
  Safari-breaker — confirmed absent on the dock routes; the goo is `filter:url()` on a static SVG
  graph with sRGB color-interpolation).
- **`--ease-cartoon-punch` + `--spring-dock`** are plain CSS `linear()`/easing tokens — both
  engines parse them. The `light-dark()` inset-shadow trap (MEMORY) is avoided: the cartoon cast
  uses plain per-mode `.dark` arms, no inset fragment inside `light-dark()`.
- **PRM (`prefers-reduced-motion`):** `--motion-weight → 0` (one assignment zeroes squash,
  overshoot, anticipation, arc, stagger — design.md §L5). The morph collapses to an instant
  state swap (the size blend snaps `fill` 0→1, opacity crossfades on the 0.1s shortened cadence).
  Drag reorder commits instantly, no fling. Fission → instant topology swap, zero neck frames.
- **`prefers-reduced-transparency`:** `--glass-blur-dock → none` (token already maps it); the
  warm-cream plate floors to an opaque warm fill (NEVER gray — BA.W-NO-GRAY floor). The cartoon
  cast SURVIVES (opaque ink, a legibility bonus — design.md §Shadows).
- **`prefers-contrast:more`:** cast opacity floors UP; the rim hairline stays literal 1px.

---

## 4. DEFT INTEGRATION — what is KEPT, REFINED, RE-INVENTED (survival of the fittest)

**KEEP (live-verified fit):** the warm-cream six-layer plate + `--glass-blur-dock` 9px calm;
the collapsed-rest circle + vertical pill rest geometry; `--spring-dock`/`--ease-cartoon-punch`/
`--motion-weight` tokens; the `.dock-trigger` unify + teleport contract (A7/A8); `useDockItemDrag`
+ the reorder commit (A12); `useDockFission`/`DockGooFilter`/`fission-bridge.css` (A13);
`useStaggerReveal` cascade; the `aria-pressed` active-tier; the `transform-origin:center`
center-out IDEA; the reserved-footprint (ONE layout solve) IDEA; `useDockHold` keep-open.

**REFINE (weak):** the collapse window → asymmetric enter(0)/leave(`φ·240ms`) via
`useDockMorphWindow`; the active-trigger state → DRY onto the nav-tab `--dock-control-active`
lift; the vertical padding → `φ`-rung `--dock-pad-block`; the icon follow-through → confirm
outer→inner stagger reads synced-from-centre (it does, once the parent scale is monotone).

**RE-INVENT (broken — the live-reproduced inversion):** DELETE `measureAndArmMorph`,
`seatTargetSync`, `rebaseSiblingSpans`, the nested-`max-content` ordering, the root-pin
lift/restore, and all three floor guards (`morphMinFloorPx` × 2 + the `||` measure-failure
degrade). REPLACE with: a ResizeObserver that writes `--dock-expanded-px`/`--dock-collapsed-px`
ONCE per content change; the `--dock-fill` convex-blend size channel (clamped [0,1]); the
`--dock-squash` cartoon channel (the spring's >1 overshoot routed here, vol-preserving). The
`dockMorphContext` orchestrator keeps ONE `SpringProgress` writing `--dock-fill`; it stops
owning a measure pipeline.

**Wave amendment (DELTA-ASSAY vs the 116 union waves + dock-core refine):** this is NOT a new
fission/trigger/material wave (those ship + verify). It is a targeted RE-INVENT of the
collapse/expand SIZE mechanism — amend `BD.W-DOCK-CORE` (the dock-core refine wave) with a
`W-DOCK-MORPH-RATIOFREE` move: "replace per-swap FLIP-measure-and-arm with a rest-measured
two-endpoint convex blend + a separated vol-preserving overshoot channel." No dup with
`W-DOCK-SCROLL-FISSION` (assembly, orthogonal), `W-DOCK-TAB-INDICATOR` (tabs, orthogonal), or
`W-DOCK-DEEP-TRANSMIT` (material, orthogonal). The GATE is a π **frame-series proving the width
path is MONOTONE through the overshoot** (born-RED on today's `w 65→90→31→45→224` inversion;
GREEN only when `live-px` is monotone non-decreasing on expand AND the squash channel carries a
visible vol-preserving overshoot), reproduced on the REAL auto-margin dock, BOTH modes, as a
USER gesture — not a cx-only metric. The gestalt is the bar.
