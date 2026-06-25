# GOLDEN — the CORE liquid DOCK (canonical reference)

The single coherent design synthesized from lens-a (pure iOS-27 fidelity), lens-b
(cross-engine / perf-first), lens-c (audacious 1940s technicolor). All three lenses
**independently live-reproduced the SAME root cause** and converge on the SAME cure;
this doc resolves the three tensions (audacity ↔ correctness ↔ cross-engine) into ONE
mechanism and proves it with a live spike.

Binding law: DESIGN.md (the iOS-27 canon, §3 colorful-field-behind-glass, §L4 cartoon
motion, §L6 golden proportion, §Easing `--ease-cartoon-punch`, §L5 PRM, §L7 cross-engine)
+ `docs/tranches/BD/GREENFIELD-HARDENING-PLAN.md` §1 + `IOS27-REFERENCE.md` (T1–T16).

> **HARDENING BANNER (challenge-folded + delta-assayed — read with `DELTA-ASSAY.md`).** The
> CORRECTNESS spine (ratio-free measure-ONCE convex blend, center-out by construction) SURVIVED
> all three challenges and is **live-proven**: the orchestrator reproduced the born-RED seizure on
> the REAL `/dock/overview` dock (collapse **maxW 2451.7px**, expand **59→198.6→33.2→44.7→224**,
> **cxRange 0**). The AUDACITY spine took FIVE binding folds, carried in `DELTA-ASSAY.md` §2 +
> `WAVE-AMENDMENT.md` (do NOT build the golden's §1c/§2 verbatim): **(1)** the punch CANNOT ride
> `SpringProgress` (monotone, no anticipation dip) → a SEPARATE one-shot WAAPI/transition driver on
> `--ease-cartoon-punch`, honestly NOT "one clock" (challenge 1·R1/2·R1); **(2)** the punch CANNOT
> share `--stretch` (6 JS owners + the `--dock-morph-max-stretch:1.14` cap + a fission-mid-collapse
> clobber) → a DEDICATED CSS-only `@property --dock-punch-stretch`, three factors on one `scale:`
> (challenge 1·R1/3·R1/3·R4); **(3)** the punch must RETURN to 1 at settle, never latch +16%
> (challenge 2·R1); **(4)** the cartoon cast uses the real `--shadow-cartoon-md/lg` rung on a NEW
> kinetic caster, not the invisible `/0.10` drop (challenge 1·R4/2·R5); **(5)** the measure-ONCE
> endpoint needs a freshness guard (challenge 3·R2). Token names: keep `--dock-morph-t` (NO rename —
> challenge 1·R5/2·R6); `--motion-weight`/`--ease-cartoon-punch` are BOOKED by Band-0
> `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` → DEPEND, the golden's `BD.W-MOTION-WEIGHT-CANON` is
> DROPPED as redundant.

---

## 0. THE CARDINAL FINDING (all three lenses, live-traced, source-confirmed)

The dock's collapse/expand morph has PASSED every prior judge (cx-excursion 0, OKLab
chroma, byte-identical trigger geometry) and the user STILL rejects it. The judges
measured the **centroid** and never the **width**. Reproducing the REAL hover gesture
on `/dock/overview` (the auto-margin centred dock), the width path is a seizure:

```
lens-a:  w 59 → 200 → 33 → 41        (balloon then implode)
lens-b:  collapse paints w 2452px     (--dock-root-scale resolves to 55.72)
lens-c:  w 65 → 90 → 31 → 45 → 224    (inverts BELOW 1 at the overshoot peak)
```

**Root cause (source-confirmed, `src/styles/dock/layers.css:130-160` +
`dockMorphMeasure.ts`):** the morph drives the visible size by an **unbounded `from/to`
ratio** measured per-swap by a FLIP pipeline (`measureAndArmMorph` → `seatTargetSync` →
the nested-`max-content` ordering → root-pin lift/restore → three floor guards). The
pipeline races the content layout and produces a degenerate `--dock-root-morph-to` (12.96px
/ 4.02px — *smaller than `from`*). Then:

```css
--dock-root-ratio: calc(var(--dock-root-morph-from) / max(var(--dock-root-morph-to), 1px));
--dock-root-scale: max(calc(ratio + (1 - ratio) * t), 0.06);  /* FLOOR only — NO CEILING */
```

`ratio = 59/13 ≈ 4.5` (or `224/4 ≈ 55`) → at the spring overshoot peak `t=1.073` the
scale evaluates `4.5 + (1−4.5)·1.073 ≈ 0.74` (inverts) or, on collapse, `scaleX(55)` =
2452px (detonates). The `max(…,0.06)` floor masks a bad measurement; it does not remove
the **dependence on a per-swap measurement that races the content**.

Two binding-law tokens the directive cites are **unshipped** (grep `src/` = 0 hits):
`--motion-weight` and `--ease-cartoon-punch`. DESIGN.md §L4/§Easing declare them as LAW
(`--ease-cartoon-punch` verbatim `linear()` at §Easing; `--motion-weight` rest `1/φ`, dock
pushes toward 1) — they live only as prose. The dock's `--spring-dock` overshoots a polite
**+7.3%** (peak 1.073), which by definition can never express **anticipation** (a damped
spring approaches monotonically from one side — DESIGN.md §L2). The cartoon register the
edicts demand needs a real sub-origin dip the spring cannot give.

**What is CLEAN — CONFIRM-and-keep, do not re-litigate** (all three lenses live-verified):
A1 live nav docks (0 broken-rail), A4 self-blur (1.25px, clears by t≈0.5; 9px backdrop
calm), A5 collapsed warm circle + centred glyph, A7 plate-invariant-on-open
(`changed:false`), A8 unified `.dock-trigger` (3× byte-identical), A11 vertical warm pill,
A12 `useDockItemDrag` (real reorder), the warm-cream both modes (light `srgb .944/.903/.865`,
dark `.350/.295/.249`, R>G>B never gray), `useDockFission`+`DockGooFilter`+`fission-bridge.css`
(Safari-safe metaball, shipped).

---

## 1. THE GOLDEN MECHANISM — "pull the shade": ratio-FREE size + a SEPARATE squish channel

The single resolution of all three lenses. The dock stops measuring itself mid-gesture and
**morphs between two known footprints like a window-shade pulled open** — center-out by
construction — with the audacious cartoon PUNCH stacked on an **orthogonal volume-preserving
channel** that can deform the pill but mathematically cannot resize it.

> **The split that kills the trap (lens-c's keystone, reconciled with lens-b's bound):**
> SIZE = a monotone convex blend of two POSITIVE measured endpoints (correct, boring,
> bulletproof). PUNCH = a volume-preserving reciprocal squish carrying the cartoon overshoot
> (audacious, safe, visible). The two NEVER cross channels — the boring channel can't be
> exciting and the exciting channel can't be wrong.

### (a) ONE proportion, measured ONCE off the content — `--dock-expanded-px`

Delete the per-swap FLIP measure. The dock measures its expanded content width **once on
mount + on `ResizeObserver`** (the row already lays out at natural width behind the clip —
read it directly; no `max-content` forcing, no nested ordering, no rAF race) and stores
`--dock-expanded-px`. The collapsed size is the summary control's own box,
`--dock-collapsed-px` (≈ the icon square). That is the ENTIRE measure surface.

```css
--dock-live: calc(var(--dock-collapsed-px) +
   (var(--dock-expanded-px) - var(--dock-collapsed-px)) * clamp(0, var(--dock-t), 1));
--dock-size-scale: calc(var(--dock-live) / var(--dock-expanded-px));
```

`--dock-live` is a **convex blend of two positive endpoints**, so it can NEVER exceed the
larger or invert below the smaller — **regardless of spring overshoot** — because the
overshoot does not live on this channel (the `clamp(0, t, 1)` caps the size term; the >1
excursion is routed to the squish). No `from/to` ratio, no `from>to` degeneracy, no floor
guards needed (the two endpoints ARE the floors). The box RESERVES `--dock-expanded-px`
(ONE layout solve, CDP-Layout-flat — the one genuinely-good idea in the current code, KEPT)
and the visible size rides `scale: var(--dock-size-scale)` from `transform-origin: center`
— **container-justify-agnostic, center-out by construction** (left-anchored / centred /
auto-margin docks ALL grow center-out, no justify detection, no translate to double-count).

### (b) the spring drives a 0→1 scalar; the SIZE channel clamps `t` to [0,1]

`--dock-t` (the ONE registered `@property` scalar — already exists, `src/styles/dock.css:83`)
is driven by `SpringProgress` (the shipped orchestrator, ONE clock). The size blend uses
`clamp(0, var(--dock-t), 1)` so the spring's >1 overshoot is invisible on size. The
audacious overshoot is NOT discarded — it is **routed to the squish (c)**, where it deforms.

### (c) the PUNCH lives on `--dock-squish` — volume-preserving, can't change footprint

The cartoon weight (anticipation dip, overshoot bounce, §L4 squash-and-stretch) rides a
SECOND `@property` scalar `--dock-squish` driven by **`--ease-cartoon-punch`** (the real
~4% pre-dip + ~22% overshoot `linear()` — newly shipped, §2), composed as a
**volume-preserving** reciprocal scale on the morph axis — the EXISTING `--stretch`
machinery in `shape.css:126-133` (`useLiquidFlex` X·Y≈1), which the dock already imports:

```css
/* shape.css — the squish ALREADY multiplies onto the same `scale:` property. KEEP. */
.glass-dock[data-morphing]:not(.vertical) {
  scale: calc(var(--stretch, 1) * var(--dock-size-scale, 1))  /* size × squish on ONE channel */
         calc(1 / var(--stretch, 1));                          /* reciprocal cross-axis */
}
```

Because it is reciprocal, it stretches the pill along travel and pinches across **without
moving the footprint or the centroid**. The overshoot is now a SQUISH you can SEE (the pill
overshoots by getting taut-and-thin then settling plump), not a width that lurches.
`--motion-weight` (rest `1/φ`, **dock rests at `1`** per §L4) co-scales the squish depth +
the anticipation pull + the cartoon-shadow travel together so the deformation reads as ONE
proportioned punch.

### Why this is a UNION, not a fork (survival of the fittest)

- **KEEP (fit, live-verified):** `morph.css` plate/padding/border interp on `--dock-expand-t`;
  the `.dock-layer` `.is-active`/`.is-leaving` 3-state hit-test contract (the a11y-006 anchor);
  the `@property --dock-morph-t` scalar (renamed conceptually to the ONE `--dock-t`); the
  `shape.css` reciprocal `--stretch` squish (the punch channel ALREADY exists); the
  `transform-origin: center` center-out IDEA; the reserved-footprint (ONE layout solve) IDEA;
  the symmetric center-out child stagger (`layers.css:406-433`); `SpringProgress` + the `dock`
  spring preset row; `DockGooFilter`/`useDockFission`/`fission-bridge.css`; `useDockItemDrag`;
  `useDockHold`; the `.dock-trigger` unify + teleport contract.
- **RE-INVENT (the broken half ONLY):** DELETE `measureAndArmMorph`, `seatTargetSync`,
  `rebaseSiblingSpans`, `forceNestedMaxContent`/`nestedTargetsWithin`/`measureTo`,
  `armRootMorphSpan`/`clearRootMorphSpan`, `--dock-root-morph-from/to/ratio/scale`, the
  `max(…,0.06)` floors, `morphMinFloorPx`, the rAF measure-defer, the per-target generation
  gating. REPLACE with: a `ResizeObserver` writing `--dock-expanded-px`/`--dock-collapsed-px`
  ONCE per content change; the `--dock-live` convex blend; the clamped size term; the squish
  channel. The orchestrator shrinks to: arm `[data-morphing]`, run ONE `SpringProgress`
  writing `--dock-t` (+ `--dock-squish` on the punch curve), clear on settle. **~120 lines of
  measure pipeline deleted; ~30 lines of CSS + a ResizeObserver added.**

---

## 2. THE BOLDEST MOVE — ship `--motion-weight` + `--ease-cartoon-punch` as REAL tokens

The dock is the FIRST consumer of DESIGN.md's unshipped motion law (lens-a's headline,
reconciled with lens-b/c's source-verify caveat that they are currently phantom).

- **`--ease-cartoon-punch`** — the verbatim DESIGN.md §Easing `linear()` keyframe (a real
  ~4% anticipation dip below origin, ~22% overshoot, settle). Ships as a plain `--ease-*`
  custom property in `src/styles/tokens/scheme-motion.css` — NOT a `SPRING_PRESETS` row
  (the ≤10% spring invariant stays intact), NOT a `MOTION_CURVES` entry (`MotionCurveKind`
  is the closed `spring|bezier` union). Value:
  ```
  linear(0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%, 1.18,
         1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1)
  ```
- **`--motion-weight`** (`@property <number>`, rest `0.62 ≈ 1/φ`) — ONE scalar co-scaling
  the squish depth, the overshoot share, the anticipation pull-back, and the cartoon-shadow
  travel. Ships in `scheme-motion.css`. The dock scope sets `--motion-weight: 1` (push to max
  cartoon, §L4). PRM zeroes it (one §L5 assignment kills squish + overshoot + anticipation +
  shadow-travel + stagger).

The collapse/expand morph, the V↔H morph, and the fission split (the DRIVER motions) drive
`--dock-squish` through `--ease-cartoon-punch`, so the pill **anticipates** (a hair of
squish-in before the iris opens) then **overshoots** past full then settles. Content-carousel
snaps stay on the calm `dock` spring (the driver-vs-observer carve, §L4 — never bounce on
observer snaps). The shipped `--shadow-cartoon` cast (`::after` caster, `transform`-only,
never animated `box-shadow`) gets its travel wired to `--motion-weight` so the bold offset
shadow slides OPPOSITE the morph — paper morphism made kinetic, the most "1940s" read.

This single move (a) lands the unshipped DESIGN.md law, (b) gives the dock genuine cartoon
punch, (c) is the lever every other greenfield band (cards, sheets, celebration) inherits —
the dock is the proving ground for the universal liquid-weight law.

---

## 3. THE FULL SURFACE (deft union — KEEP / REFINE / RE-INVENT)

| Item | Disposition | Mechanism |
|---|---|---|
| **A3 size morph** | **RE-INVENT** | the ratio-free `--dock-live` blend + clamped size term (§1) — the ONLY true break |
| A3 centroid | KEEP | `transform-origin: center` (center-out by construction) |
| A2 hover window | REFINE | asymmetric enter(0ms)/leave(`φ·240ms ≈ 388ms`) via `useDockMorphWindow`; `useDockHold` keep-open; re-entry mid-collapse reverses velocity-continuous on `--dock-t` (interruptible) |
| A4 self-blur | KEEP | 1.25px front-loaded, clears by t≈0.5; 9px backdrop calm |
| A5 collapsed align | KEEP | summary glyph centred in its own cell; STAYS centred through morph (uniform center-scale, no reflow) |
| A6 synced icons | REFINE | children ride the parent `--dock-t` scale as ONE rigid group; the only per-child motion is the center-out reveal stagger (`--child-reveal` off the SAME scalar — already shipped `layers.css:373-433`), which is follow-through, not a competing size morph → desync impossible by construction |
| A7 dropdown recolor | KEEP | plate invariant on open (menu teleports to its own region) |
| A8 unified triggers | KEEP | `.dock-trigger` byte-identical; open state rides the SAME `--dock-control-active` lift (DRY) |
| A11 vertical pill | KEEP + unify | one `orientation="vertical"` axis of the same dock; `--dock-live` blends block-size; squish is `scale: (1/s) (s)`; `φ`-rung `--dock-pad-block`; `aria-pressed` active tier |
| A12 draggable items | KEEP + WIRE | `useDockItemDrag` onto nav-dock items by default (roving-tabindex preserved); grab→squish→arc-pull→fling→settle-reorder; grabbed item rides the deepest cartoon cast; drag-past-threshold COMMITS a fission split (the drag IS the split gesture) |
| A13 fission assembly | RIDE | compose `useScrollChrome`→`useDockFission` on the shell `GlassDock` (opt-in `:fissionOnScroll`, the **media** lateral signature); `DockGooFilter` mounted ONCE at shell root; the split spring shares the re-tuned register (no second clock) |
| no-gray | KEEP | warm-chromatic `--glass-tint-ink-dock`; the §3 colorful field is the route's aurora/blob substrate; the plate transmits it |

---

## 4. CROSS-ENGINE / a11y / PRM carve (§L5 / §L7)

- **Compositor-only throughout:** `scale` (size×squish folded on ONE property), `transform-origin`,
  `opacity`, `translate` (drag), `filter:url()` (goo) — both engines. The reserved
  `inline-size` is ONE layout solve, not per-frame → `proof:no-layout-animation` GREEN by
  construction. NO `inline-size`/`width` animates; NO `backdrop-filter:url` anywhere (the
  WebKit-breaker, bug 245510 — the goo is `filter:url()` on a static SVG graph with
  `color-interpolation-filters="sRGB"`, non-zero host, `-50%/200%` region).
- **`@property --dock-t`/`--dock-squish`/`--motion-weight`** are Baseline (Chrome 85+, Safari
  16.4+, FF 128+). `--ease-cartoon-punch` is a plain `linear()` token (both engines parse it).
- **PRM (`prefers-reduced-motion: reduce`):** `--motion-weight → 0` (one §L5 assignment zeroes
  squish, overshoot, anticipation, arc, stagger, shadow-travel); the size blend snaps `--dock-t`
  0→1; the opacity crossfade survives on the shortened cadence; the morph still CONFIRMS. Drag
  reorder commits instantly; fission → instant topology swap, zero neck frames.
- **`prefers-reduced-transparency`:** `--glass-blur-dock → none`; the warm-cream plate floors
  to an opaque warm fill (NEVER gray — BA.W-NO-GRAY); the cartoon cast SURVIVES (opaque ink,
  a legibility bonus).
- **`prefers-contrast: more`:** cast opacity floors UP; the rim hairline stays literal 1px.
- The `light-dark()` inset-shadow trap (MEMORY) is avoided: the cartoon cast uses plain
  per-mode `.dark` arms, no inset fragment inside `light-dark()`.

---

## 5. FILES (the exact edit surface — a union, no parallel fork)

| File | Change |
|---|---|
| `src/styles/tokens/scheme-motion.css` | **ADD** `--ease-cartoon-punch` (verbatim §Easing) + `--motion-weight` (rest `1/φ`); register `@property --motion-weight`, `@property --dock-squish` |
| `src/styles/dock/layers.css` | **DELETE** the `--dock-root-ratio`/`--dock-root-scale`/`--dock-root-morph-*` rules (130-160) + the inner `--dock-morph-ratio`/`-scale` (60-94); **REPLACE** with the `--dock-live` convex blend + clamped `--dock-size-scale`. KEEP the crossfade + stagger (216-507). |
| `src/styles/dock/shape.css` | **RE-POINT** the folded `scale:` from `--dock-root-scale` to `--dock-size-scale` (126-133); wire `--dock-squish` × `--motion-weight` into `--stretch` depth; set dock scope `--motion-weight: 1` |
| `src/components/custom/dock/composables/dockMorphMeasure.ts` | **DELETE** `measureAndArmMorph`, `seatTargetSync`, `rebaseSiblingSpans`, `forceNestedMaxContent`, `nestedTargetsWithin`, `measureTo`, `armRootMorphSpan`, `clearRootMorphSpan`, `morphMinFloorPx`; **ADD** a `useDockExpandedSize` ResizeObserver writing `--dock-expanded-px`/`--dock-collapsed-px` |
| `src/components/custom/dock/composables/dockMorphContext.ts` | shrink to: arm `[data-morphing]`, run ONE `SpringProgress` writing `--dock-t` + `--dock-squish` (punch curve), clear on settle. No measure pipeline. |
| `src/components/custom/dock/composables/useDockMorphWindow.ts` | own the asymmetric enter(0)/leave(`φ·240ms`) leave-debounce |
| `src/styles/dock/shape.css` (cast) | wire the `--shadow-cartoon` `::after` caster travel to `--motion-weight` (opposite-morph slide) |
| `tests-visual/dock-core.spec.ts` | the born-RED gate (§6) |

DELTA-ASSAY (vs the 116 union waves + dock-core refine): **AMENDS `BD.W-DOCK-MORPH-FAMILY`
/ `BD.W-DOCK-CORE`** (supersede the measure→FLIP→ratio→scale WIDTH leg with the ratio-free
blend; the plate/stagger/V↔H/centroid legs KEPT). **NEW `BD.W-MOTION-WEIGHT-CANON`** (ship
`--motion-weight`+`--ease-cartoon-punch`; dock is first consumer; cards/sheets/celebration
inherit). **RIDES `BD.W-DOCK-SCROLL-FISSION`** (assembly unchanged; split shares the
re-tuned register). No dup: the spring re-tune is the existing `dock` row, the fission is the
shipped engine, the cartoon-punch is a raw `--ease-*`, the squish is the existing `--stretch`.

---

## 6. THE BORN-RED GATE (the gestalt bar — anti mechanism-vs-gestalt)

`tests-visual/dock-core.spec.ts` — the π must fire the EXACT user hover gesture on the REAL
auto-margin dock (`/dock/overview`), default-to-BROKEN, and judge **WIDTH**, not just cx:

1. **`dock-morph-size-monotone`** (THE born-RED bite): drive a real hover→expand; frame-sample
   `getBoundingClientRect().width` every rAF **with `--motion-weight: 0`** (the SIZE channel in
   isolation, squish off). Assert `width` is **monotone non-decreasing** from
   `--dock-collapsed-px` to `--dock-expanded-px` (`maxBackstep ≤ 1px`) AND `max(width) ≤
   expanded + 1px` (no detonation). **Born-RED on HEAD** (the 59→200→33→41 / 2452px / inverted
   paths); GREEN only with the ratio-free blend. *The size channel must be measured WITHOUT the
   squish — the squish is intended volume-preserving deformation, not a monotonicity violation
   (the spike proved measuring them together false-fails: the punch's 16% overshoot inflates
   the bbox by design).*
2. **`dock-morph-squish-present`** (the audacity bar): with `--motion-weight: 1`, assert the
   bounding box **overshoots** (`max(width) > expanded`) DURING travel then settles to exactly
   `expanded` — the visible cartoon punch. Born-RED on a squish-less flat morph.
3. **`dock-morph-anticipation`** (the cartoon dip): assert `--dock-squish` (or the painted
   cross-axis) dips BELOW rest before blooming — the §L4 anticipation. Born-RED on the
   monotone spring (which cannot dip below origin).
4. **`dock-morph-cx-pinned`** (anti-regress): cx excursion ≤ 4px across the morph.
5. **`dock-morph-icons-synced`**: every child's reveal-ramp `t`-offset within one frame of the
   box `t` (one scalar, one easing → synced by construction).
6. **BOTH modes**, Chromium + (manual) Safari 26 capture; PRM → instant. The judge watches the
   SCREEN-RECORDING gestalt, defaults to broken — a green cx with a broken width is an automatic
   FAIL.

---

## 7. LIVE-VERIFIED SPIKE (the boldest mechanism de-risked)

`docs/tranches/BD/greenfield/dock-core/golden/morph-spike.html` (throwaway; not src/).
Run live in Chrome (chrome-devtools-mcp, file://), the auto-margin centred dock.

**SIZE channel (squish off) — the correctness claim, proven by construction:**
```
3-point static:  w 60 → 164 → 268   (collapsed → mid → expanded)
                 cx 720 → 720 → 720  (pinned every step)
                 monotone_3pt: true   cx_pinned_3pt: true
per-frame:       widthMonotonic true · maxBackstep 0 · widthBounded true · maxWidth = expanded (268)
                 cxPinned true · cxExcursion 0
```
The ratio-free convex blend is **monotone + bounded + center-pinned by construction** — the
59→200→33→41 / 2452px / inverted seizure is mathematically unreachable.

**Combined (squish on) — the diagnostic that validates the gate's channel split:** driving
size + squish through the SAME punch curve, the bbox reads `maxWidth 320 > expanded 268`
(`maxBackstep 9.94`). This is NOT a regression — it is the squish's intended 16%
volume-preserving overshoot inflating the bbox, then relaxing. **This proved the gate must
measure the SIZE channel with `--motion-weight: 0` (§6.1) and assert the overshoot
SEPARATELY (§6.2)** — the keystone spec lesson the spike surfaced.

Screenshot `golden/spike-expanded.png`: warm-cream pill over the colorful field (warm pink +
cool blue), the cartoon offset cast lower-right, the rim hairline, five revealed icon-buttons
— the GOLDEN gestalt confirmed in paint.

**Verdict:** the mechanism is correct, bounded, audacious, and cross-engine-safe. The spike
de-risked the boldest move (ratio-free size + orthogonal squish) AND surfaced the gate's
channel-split requirement before a single src/ line is touched.
