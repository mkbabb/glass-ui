# TIMELINE greenfield — Lens C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

> Redesign the TIMELINE primitive (`<GlassTimeline>` + the three variants
> scrubber / segmented / continuous + `TimelineSegment` + the `#detail` slot) from
> first principles, for **maximum 1940s-technicolor FLOW & PUNCH** — anticipation,
> exaggeration, follow-through, overlapping action, arcs, real squash & stretch with
> weight & inertia — while staying idiomatic, cross-engine, and a UNION with the
> shipped timeline + the shared glass register (the warm-floor + page-background
> field, the `useDragMorph` / `useLiquidFlex` / `useLiquidMorph` engines, the
> `--ease-cartoon-punch` / `--motion-weight` substrate). NO re-fork. KISS.

---

## 0. The live-interrogation findings (measured, both modes, painted-pixel)

Chrome-devtools-mcp over `:5173/data/timeline` + `…-segmented` + `…-continuous`,
getComputedStyle + a real `pointerdown→pointermove→pointerup` scrub-drag + a manual
sRGB→OKLab composite of the painted track over its section. The SOURCE-VERIFIED
status quo (the bar to BEAT, not anchored on):

| # | Question | Measured truth | Verdict |
|---|---|---|---|
| 1 | **3 variants coherent / well-differentiated?** | **NO — a mismatched set.** Scrubber = a long flat beige bar with a 6px gray rectangle thumb (`--surface-tint-25`, opacity 0 until hover). Segmented = a **flat, fully-saturated** progress bar (raw `linear-gradient(90deg, var(--chart-ping), var(--chart-ping))` — solid blue/red, NO glass, NO transmission, reads like a 2010 `<progress>`). Continuous = the pill-rail variant, but the `/data/timeline-continuous` route **renders the segmented markup**, not the continuous pill — the variants are conflated in the demo. | The scrubber whispers, the segmented shouts in a different visual language, the continuous is absent. No shared silhouette, no shared material, no shared motion clock. |
| 2 | **Warm transmissive glass?** | **NO — luminance-only gray wash, both modes.** Light: track bg = `color(srgb 0.11 0.098 0.09 / 0.06)` — a near-black ink at 6% over section `rgb(253,245,236)`. The painted COMPOSITE is `oklab L 0.934 / **C 0.0142** / hue 70.6` — the section itself is only C 0.0147, so the track **does not measurably warm its surround; it only darkens L**. Dark: track = `srgb(0.979 0.965 0.951 / 0.06)` (a light ink at 6%) over section `rgb(53,42,34)` — a chroma-0 LIFT, no warmth added. | §3 BOTH root causes confirmed: **#1 flat-field** (section C ≈0.014, below the 0.018 transmissive floor — nothing warm to transmit) + **#2 dormant-tint** (`--surface-tint-*` is a neutral `hsl(24 10% 10%)` ink, chroma≈0 — a dilutant, never a warm contributor). Born-RED is honest here. |
| 3 | **Scrub liquid/weighty?** | **STIFF.** The thumb only animates `opacity`/`width`/`height` on CSS `:hover`. During a real drag the transform is **constant** — no scale, no squish, no velocity coupling, no anticipation, no fling-settle. `--ease-cartoon-punch` resolves **EMPTY** (grep-confirmed not in `src/styles`). | The single most dead surface in the set. A YouTube-1990 scrubber. The Band-0 liquid-weight law is wholly absent. |
| 4 | **Segments + `#detail` + a11y?** | a11y is **fit** (the one fit leg): `role=slider`+arrow-step on scrubber; `role=group`+per-dot `<button>` with composed `aria-label` + 44×44 `::before` halo on segmented; the continuous Option-C split (`progressbar` rail / `list` markers) + HoverPopover debounce. The `#detail` slot contract (`{segment, source, currentKey, hoveredKey}` + `<Transition out-in>`) is well-modelled — but it is **continuous-only and not surfaced** on any live route. | KEEP the a11y contract verbatim. The `#detail` slot is a good idea starved of a stage. |
| 5 | **Cross-engine (Safari)?** | The current surface uses only `backdrop-filter: blur()/saturate()` + CSS transitions — Safari-safe but inert. Nothing audacious to fail yet. | Clean slate for the WebKit fence. |

**Gestalt verdict (both-mode screenshots):** three primitives that share a name and
nothing else — a gray scrubber, a flat-saturated progress bar, and an absent pill.
No warm glass, a dead scrub, no cartoon punch anywhere. The a11y skeleton is sound.
**The redesign is a re-unification, not a patch.**

---

## 1. The core idea — THE LIQUID FILMSTRIP

**One sentence:** the three variants become ONE warm-glass **filmstrip** — a single
recessed, transmissive, warm-cream channel (the §3 field read straight through it)
that the three variants differently INHABIT: the scrubber rides it with a **draggable
metaball play-head** (`useDragMorph`: grab → follow → velocity-squish → fling-snap),
the segmented lights it with **glass-tinted technicolor cels** (translucent phase
plates that the warm field bleeds through, each cel a squash-on-fill cartoon beat),
and the continuous fuses them — **one pill, N tinted regions, the play-head doubling
as the live-progress reader** that drives the `#detail` slot — so all three read as
the *same physical object* filmed at three exposures, all on ONE `--ease-cartoon-punch`
clock, all seated in ONE `.glass-timeline-channel` register, all compositor-only.

The unifying metaphor is a **strip of film over a lightbox**: the channel is the
warm-glowing lightbox (the field transmitted, inset:0), the segments are the frames
(tinted-glass cels, never opaque), the play-head is the gate (a weighty metaball that
squashes as it travels and pops as it lands). One material, three exposures.

### The single BOLDEST move

**THE METABALL PLAY-HEAD that necks to the channel.** Drop the dead 6px rectangle.
The scrubber thumb becomes a **liquid-glass droplet that is goo-CONNECTED to the fill
edge by a static-SVG metaball filter** (the shipped `DockGooFilter` sRGB technique —
Safari-safe, NO `backdrop-filter:url`): as you drag, the droplet **stretches a neck
back toward the track origin** (the fill "reaches" to hold its head), the head
**squashes along the travel axis by drag velocity** (`useDragMorph` volume-preserving
`tanh` squish, capped ≤1.12), **anticipates** (a sub-pixel dip back the instant you
grab, `--ease-cartoon-punch`'s negative leg), and on release **flings
velocity-continuously to the nearest event marker and OVERSHOOTS** (ζ<1) before
settling — the neck snapping thin then bubbling back to a round bead with a one-shot
**accent-flood** rippling down the fill from the new position. The play-head is a
metaball that *belongs* to the rail, not a widget sitting on top of it. This is the
v3 dock-fission necking law, re-aimed at a scrubber — the boldest, most alive
scrubber in the set, and a pure UNION of three shipped engines (`useDragMorph` +
`DockGooFilter` + `useLiquidFlex`) with zero new physics.

---

## 2. The material — `.glass-timeline-channel` (the §3 transmissive warm floor)

A single factored register all three variants mount, so the channel is **identical**
across them (the coherence fix). It is a UNION of the shared glass-material waves, not
a new tier.

### 2.1 The channel (the recessed lightbox)

```css
/* src/styles/timeline.css — NEW factored register */
.glass-timeline-channel {
    position: relative;
    border-radius: var(--radius-pill);
    /* (#2 dormant-tint FIX) — a REAL warm floor, not a neutral ink wash.
       Compose the shared warm-glass capsule floor; over the BD.W-GLASS-FIELD
       warm field this transmits warm, both modes. */
    background: var(--glass-bg-capsule, var(--glass-bg-floating));
    /* (#1 flat-field FIX) — TRANSMIT the field through, inset:0. The channel
       is a window, not a plate: deeper blur than the wash so the warm field
       behind reads AS the lightbox glow. */
    backdrop-filter: var(--glass-blur-channel);   /* 12-14px band (deep, not 1px wash) */
    /* the recess: an inset top-shadow seats the strip in a sunken well so the
       play-head/cels read as LIFTED off a channel floor (depth, not a flat bar).
       Per-mode arms only (the light-dark inset-shadow trap — NO light-dark() here). */
    box-shadow: var(--glass-channel-recess);
}
.dark .glass-timeline-channel { box-shadow: var(--glass-channel-recess-dark); }
```

- `--glass-bg-capsule` / the warm floor: **BUILD-DAG dep on the glass-material register**
  (`.glass-capsule` warm-floor decl + `BD.W-AMBIENT-TINT` ≤8% hue bias). Depend-on, do
  not re-mint. Until it lands, fall back to `--glass-bg-floating` (the extant W55
  adaptive seam, grep-verified `glass.css:264`).
- `--glass-blur-channel`: a NEW token in `§16 TIMELINE` in the 12–14px band (cf. the
  scrubber's current 1px `--glass-blur-wash` — the transmissive read needs DEPTH). Reuses
  the existing `@property`-typed blur machinery; no new compositing seam.
- **The field is the load-bearing dep:** `BD.W-GLASS-FIELD` mounts `<PaperBackdrop field>`
  behind the data band (`BD.W-DATA-BAND-GLASS` already re-threads `data/timeline*.vue` onto
  the glass tier). The channel transmits warmth ONLY because the field exists — Lens-C does
  not re-solve the field; it CONSUMES it and is born-RED honestly until it lands.

### 2.2 The cels (segmented + continuous regions) — tinted glass, never flat

The current segmented band is `linear-gradient(90deg, var(--chart-ping), var(--chart-ping))`
— a **solid opaque** color. Greenfield: each cel is a **translucent tinted-glass plate**
so the warm channel glows through and the cels read as *colored film*, not paint.

```css
.timeline-cel {
    /* the phase color at GLASS strength — the field + channel warmth composite
       UP through it. oklab mix so the tint is a hue event over the warm floor,
       never a flat fill. */
    background: color-mix(in oklab, var(--cel-accent) 38%, transparent);
    /* the cel is glass-on-glass: it carries its own micro-rim so it reads lifted
       off the channel (the nested-glass tier, T8). */
    box-shadow: inset 0 1px 0 var(--glass-rim-top);
}
```

`--cel-accent` resolves the per-segment `gradient`/state (the existing `gradientFor`
geometry, kept). The **default** is the de-RED'd neutral warm lift (presets-in-consumers:
the consumer supplies `ping/download/upload` chart accents; the library default is warm
glass). This is the §3 read applied per-cel: a colorful FIELD behind glass + a defined
edge (the seam divider stays, `--timeline-continuous-seam-opacity`).

---

## 3. The motion — the cartoon FILMSTRIP register (one clock, four beats)

All three variants share ONE motion grammar so they read as the same object. Built on
the SHIPPED engines — `useDragMorph` (grab/follow/squish/fling-snap), `useLiquidFlex`
(volume-preserving `tanh` velocity-squish), `useLiquidMorph` — and the §L2/§L4 substrate
`--ease-cartoon-punch` + `--motion-weight` (BUILD-DAG dep on `BD.W-CARTOON-PUNCH` /
`BD.W-MOTION-WEIGHT`; grep-confirmed EMPTY today — born-RED, depend-on).

### Beat 1 — ANTICIPATION (the grab)
On `pointerdown` the play-head dips back ~2px against travel (the `--ease-cartoon-punch`
negative leg) and the channel recess deepens a hair — the strip "winds up." `useDragMorph`
seeds the drag spring; the head is now grabbed.

### Beat 2 — FOLLOW + SQUISH (the drag) — *overlapping action + arcs*
The head follows the pointer ~1:1 (compositor `transform: translate`, NEVER `left`).
`useLiquidFlex` stretches it along the travel axis by drag VELOCITY (volume-preserving:
`scaleX 1.12 / scaleY 0.89` at speed, reciprocal, center-pinned), capped LOW (≤1.12 — it
swells, never taffy-pulls). The **metaball neck** to the fill edge thins as the head
pulls ahead (overlapping action — the fill trails the head with `--motion-weight` lag,
an arc not a rigid line). The fill width tracks the head on the **same punch clock**, so
the fill "chases" with weight.

### Beat 3 — FLING-SNAP + OVERSHOOT (the release) — *follow-through + exaggeration*
On `pointerup`, `useDragMorph` flings velocity-continuously to the **nearest event
marker** (the snap math = the shipped `Draggable` `handleUp` arm) and **overshoots**
(ζ<1, the bouncy register) — the head sails past the marker, the neck snaps thin to a
metaball waist, then bubbles back as the head settles into a round bead. This is the
follow-through the dead rectangle never had.

### Beat 4 — THE ACCENT-FLOOD (the landing) — *EFFECTS trail SPATIAL*
A one-shot technicolor wash ripples down the fill from the landed position (`plus-lighter`
off the landed marker's `--cel-accent`), then clears — the v3 f006 crimson-flood, re-aimed.
Trails the spatial settle (the EFFECTS-after-SPATIAL ordering). PRM-static (instant, no
ripple). The landed event row in the `#detail` slot scale-pops (~1.06 → 1, IconChip-reveal
precedent) as the flood arrives — overlapping action across the surface boundary.

### The variants exercise the same four beats differently
- **Scrubber:** the play-head IS the actor (all four beats on drag).
- **Segmented:** each cel FILLS with a beat-2 squash (the band grows with a `--motion-weight`
  velocity-squish on `scaleX`, the fill "pours in" with weight, not a linear width tween),
  and a beat-4 accent-flood on phase-advance.
- **Continuous:** the play-head reads live progress across the fused pill, driving the
  `#detail` slot — beats 1–4 on scrub, plus per-region beat-2 fill on state-change. The
  `#detail` swap is the beat-4 scale-pop, on `<Transition out-in>` (the canonical two-keyed
  shape, kept verbatim).

---

## 4. The cross-engine (Chrome + Safari) approach

- **The metaball neck** uses the SHIPPED `DockGooFilter` static-SVG `filter:url()`
  technique with **sRGB color-interpolation** — NOT `backdrop-filter:url` (the WebKit
  fence). The goo is mounted on the head+neck layer (an opaque-alpha sandwich), never on
  the backdrop. Safari-verified by construction (it is the dock's already-shipped filter).
- **All motion is compositor-only** — `transform`/`opacity`/`filter` on the head, fill, and
  cels; NEVER `width`/`left`/`inline-size` (the `proof:no-layout-animation` fence). The fill
  "width" is a `transform: scaleX` on a pre-sized region (compositor-safe), not a layout
  width animation.
- **The channel `backdrop-filter`** is a STATIC per-tier blur (set once), never a per-frame
  re-blur (the §7 Safari cost). The transmissive read is steady-state, not animated.
- **`--ease-cartoon-punch`** is a raw `linear()` curve (the BD.W-CARTOON-PUNCH form) — a
  declarative ease, fully cross-engine; no JS-driven anticipation.

## 5. The a11y / PRM carve

- **KEEP the entire shipped a11y contract verbatim** — it is the one fit leg. `role=slider`
  + arrow/shift-step on scrubber (the drag is an ADDITIVE pointer affordance; keyboard model
  unchanged); `role=group` + per-dot `<button>` + composed `aria-label` + the 44×44
  `::before` halo on segmented; the continuous Option-C `progressbar`/`list` split + the
  HoverPopover debounce; `aria-valuenow = Number(modelValue ?? 0)`.
- **The metaball neck + accent-flood are `aria-hidden` decoration** — they carry no state;
  the slider value is the truth surface.
- **PRM (`prefers-reduced-motion: reduce`):** all four beats collapse — the play-head jumps
  to position (no fling/overshoot/neck), the cels fill instantly, the accent-flood is
  instant-on-instant-off (no ripple), the channel drift freezes. The shipped `0.01ms`
  collapse pattern, extended to the new tracks. The play-head still reads warm-glass (static).
- **`prefers-reduced-transparency`:** the channel falls to the warm-but-opaque floor
  (`--card` + blur 0), the cels to solid tints — warmth kept, transmission dropped (the
  W54 `.glass-opaque` endpoint via the ONE `--glass-level` path).

---

## 6. The DELTA-ASSAY → wave amendment (reconcile vs the 116-wave set; NO dup)

The shipped timeline + the shared register cover most of the material; this lens adds the
MOTION + the cel-glass + the play-head. Reconciled against the on-disk waves:

| Need | Existing wave (DEPEND-ON, no dup) | This-lens DELTA |
|---|---|---|
| Warm field behind the channel | `BD.W-GLASS-FIELD` (`<PaperBackdrop field>`) | consume; born-RED until it lands |
| ≤8% ambient hue bias on the channel | `BD.W-AMBIENT-TINT` (widen the `.liquid-stage` re-point to glass tiers) | the channel is an enrolled tier |
| Demo card on glass tier | `BD.W-DATA-BAND-GLASS` (re-threads `data/timeline*.vue`) | consume; also FIX the route-conflation (continuous route must render the continuous variant) |
| `--ease-cartoon-punch` + `--motion-weight` | `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` | consume the live substrate |
| Drag/squish/fling engines | `useDragMorph` + `useLiquidFlex` + `DockGooFilter` (all shipped) | COMPOSE on the scrubber — no new engine |

**NEW WAVE (the only net-new) → `BD.W-TIMELINE-FILMSTRIP`** (band: BD Band B — core
component): factor `.glass-timeline-channel` + `.timeline-cel` (the warm-glass channel +
tinted-glass cels, both modes, §3 field-aware) into `src/styles/timeline.css`; mint
`--glass-blur-channel` + `--glass-channel-recess{,-dark}` in `§16 TIMELINE`; wire
`useDragMorph` + `useLiquidFlex` + `DockGooFilter` onto `ScrubberTimeline` (the metaball
play-head, four beats) and the velocity-squish fill onto Segmented/Continuous; reconcile
the three demo routes so each surfaces its OWN variant. ONE engine each, no fork.

**Gate (the CRITICAL painted-pixel bar):** over the REAL `:5173/data/timeline*` page with
`BD.W-GLASS-FIELD` mounted — (a) the channel composite OKLab reads **C ≥ 0.02, hue ∈
[45,88]** (warm, both modes) — born-RED on today's C 0.0142; (b) a real scrub-drag
frame-series shows the head `scaleX ≠ scaleY` mid-flight (squash) + a settle overshoot
(follow-through) + the neck waist at the goo midpoint — born-RED on today's constant
transform; (c) the cel composite is translucent (channel warmth measurable THROUGH it),
not the opaque `chart-*` fill — born-RED on today's solid band; (d) BOTH engines
(chromium + webkit). An honest born-RED over the flat/dead condition is correct.

---

## 7. Aristotelian proportion (the golden-ratio carve)

- Channel height : play-head diameter = φ (the head reads as a bead seated in the strip,
  not filling it). Scrubber rail lifts from the dead 24px flat to a φ-proportioned channel.
- The accent-flood travel duration : the fling-settle duration = φ (the EFFECTS leg trails
  the SPATIAL leg by a golden interval — the overlapping-action cadence).
- The cel tint strength (38%) sits at ~1/φ² of full — present but transmissive.
- The anticipation dip : the overshoot amplitude = 1 : φ (a small wind-up, a bold pop).

---

## 8. Survival-of-the-fittest summary

- **KEEP (fit):** the entire a11y contract; the `TimelineSegment` data shape; the `#detail`
  slot contract + the two-keyed `<Transition out-in>`; the `gradientFor`/`fillFor` geometry;
  the dispatcher SFC shape.
- **REFINE (weak):** the channel material (gray wash → warm transmissive `.glass-timeline-channel`);
  the cels (opaque fill → tinted glass); the dot/marker (kept, but seated in the channel with
  a micro-rim).
- **RE-INVENT (broken):** the scrub interaction (dead rectangle → metaball play-head, four
  cartoon beats); the variant coherence (three languages → one filmstrip, three exposures);
  the demo route conflation.
- **NO new physics, NO second spring family, NO re-fork** — the play-head is `useDragMorph` +
  `useLiquidFlex` + `DockGooFilter`, all shipped; the material is the shared glass register,
  depended-on.
