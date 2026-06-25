# TIMELINE — greenfield lens-a (PURE iOS-27 fidelity)

> GlassTimeline + the 3 variants (scrubber / segmented / continuous) + TimelineSegment +
> the `#detail` slot, re-thought from first principles against the iOS-27 Liquid-Glass
> language. Tranche-dev only. A UNION with the shipped timeline + the shared glass register
> (`.paper-field` + the `--glass-bg-*` warm tiers + `--glass-key` keyed edge) — BUILD-DAG
> deps, depend-on, no re-fork. KISS, DRY, no legacy.

---

## 0 — THE ONE TRUTH, MEASURED LIVE (both modes, real painted pixels, 2026-06-24)

Reproduced over the real pages (`/data/timeline`, `-segmented`, `-continuous`),
chrome-devtools, a REAL scrub-drag, OKLab over the live composite — NOT a hardcoded field.

| measured surface | live value | OKLab | verdict |
|---|---|---|---|
| scrubber `.glass-track` bg (light) | `color(srgb 0.11 0.098 0.09 / 0.06)` | the `--surface-tint-6` **black-ink** wash | **GRAY** — not warm glass |
| scrubber backdrop-filter | `blur(1px) saturate(1.4)` | the `--glass-blur-wash` sub-perceptual veil | **no real transmission** |
| page behind the rail | `rgb(251,250,248)` (`--neutral-0`) | L 0.985 · **C 0.0029** · H 84.6 | flat, near-achromatic |
| **track composited over page** | — | L 0.92 · **C ≈ 0.0002** · H 57.8 | **DEAD FLAT** — born-RED |
| `.paper-field` count, all 3 routes | **0** | — | NO colorful field behind ANY rail |
| segmented `.segmented-track` (dark) | `srgb 0.979 0.965 0.951 / 0.06` over `rgb(11,10,9)` | ~6% near-white on near-black | **invisible gray** track, no warm floor |
| scrub-drag thumb | `6×16px`, bg `--surface-tint-25` (black ink), transform `translate` only | transition `cubic-bezier(0.4,0,0.2,1)` (`--ease-standard`) | **STIFF** — no spring, no squish, no morph-on-move |

**The diagnosis is unanimous with the glass-material GOLDEN §3 and binding:**

1. **Warm-glass is field-dependent and there is NO field.** All three rails paint the
   `--surface-tint-6` *black-ink* wash (the sRGB gray fence) + a 1px `--glass-blur-wash` veil
   over the flat `--neutral-0` page → the §3 BOTH root causes are live: **#1 the flat-field**
   (a transmissive lens has nothing to transmit; `paperFieldCount: 0`) and **#2 the dormant-tint**
   (the substrate is gray ink, not a warm `--card` tier with a real warm floor). The composite
   C ≈ 0.0002 is the honest born-RED.
2. **The scrub is stiff, not liquid.** The thumb is a tiny gray bar that crossfades width on
   `--ease-standard` (plain Material) with a pure translate — zero spring, zero squish, zero
   `morph-more-on-move`. This violates the Band-0 liquid-weight law outright.
3. **The three variants are an incoherent set.** scrubber = thin gray pill + tiny dim dots;
   segmented = chunky gradient bands + boundary dots + a panel; continuous = chunky stitched
   gradient + the SAME dots + the same panel. The taxonomy (independent phases vs one
   progression vs a free scrub) is correct and orthogonal, but **the visual language does not
   communicate it** — segmented and continuous read as near-identical, and the scrubber reads as
   a different, weaker species. There is no shared substrate that says "these three are one
   primitive in three postures."

**The core idea, stated once:** *a timeline is ONE warm-glass rail viewed through three
postures.* The rail is the shared identity — a transmissive warm-cream capsule over the
colorful field, with a keyed lit edge and a paper grain. The three variants differ ONLY in what
rides INSIDE the rail (a free liquid thumb · independent phase cells · one stitched
progression) and how the marker dots seat (loose · boundary · rivet). Unify the substrate and
the set becomes coherent by construction; warm the substrate over the field and the gray
vanishes; spring the thumb and the scrub becomes liquid. One fix, three payoffs.

---

## 1 — THE SHARED SUBSTRATE: `.timeline-rail` (the boldest move — congruence by construction)

The single boldest move is to **delete the three private gray substrates and replace them with
ONE warm-glass rail recipe** every variant composes — `.timeline-rail`, a `quiet`-tier glass
capsule that is the literal shared identity of the primitive. This is what makes the three
variants congruent: they are the SAME capsule with different interiors.

```css
/* the ONE rail — composes the shipped warm tier + keyed edge, NOT --surface-tint-6 */
.timeline-rail {
  position: relative;
  border-radius: var(--radius-pill);
  /* leg #2 dormant-tint CURE: warm --card tier, NOT black-ink surface-tint-6 */
  background: var(--glass-bg-wash);                 /* extant: color-mix(--card, …) warm floor */
  backdrop-filter: var(--glass-blur-resting);       /* extant: real blur+saturate, NOT 1px wash */
  -webkit-backdrop-filter: var(--glass-blur-resting);
  /* leg (c) defined edge — the keyed conic rim + warm cast (glass-material GOLDEN §4) */
  /* composes .glass-material's ::before rim ring; depend-on W-GLASS-KEY-EDGE */
}
```

- **Field (leg #1):** the rail does NOT paint its own field — it transmits the route's
  `.paper-field` (depend-on `W-GLASS-FIELD`, the demo-chassis contract). Over the field the
  `saturate()` in `--glass-blur-resting` finally has chroma to concentrate; the rail reads warm
  transmissive cream, both modes (dark: the warm-dark GLOW, never the invisible 6%-on-black).
- **Edge (leg c):** the rail opts into the keyed lit rim + warm cast (`--glass-key`) so it reads
  as a discrete lit object lifted off the field — the §3 reduce-transparency / flat-page
  insurance, and the iOS-26 angle-varying specular in one.
- **Ambient transmit:** the rail enrolls in the generalized `--glass-ambient-hue` sample
  (depend-on `W-GLASS-AMBIENT-GENERAL`) so a rail over a teal field-region bends teal, a rail
  over an amber region bends amber — the "warm read is field-dependent" made dynamic.

Height is the ONE axis that legitimately differs per posture (the a11y-bearing scrub track wants
a fatter touch surface than a phase-progress echo); keep the three height tokens
(`--timeline-scrubber-height` etc.) but re-base them on a √φ ladder (§4). Everything else about
the capsule — fill, blur, rim, cast, radius, grain — is ONE recipe. **Survival of the fittest:**
the continuous variant's stitched-gradient windowing (`geometry.ts` `stitchedRailGradient` +
`stitchedRegionWindow`, the rounded fill caps, the seam machinery) is the FITTEST sub-engine in
the set — it is KEPT verbatim and simply paints INSIDE the warm rail instead of over a gray one.

---

## 2 — THE THREE VARIANTS, RE-DIFFERENTIATED (one capsule, three interiors + three dot-seats)

The taxonomy is right; the differentiation must become legible. Each variant is the shared rail
+ a distinct INTERIOR + a distinct DOT-SEAT, so the eye reads the posture instantly:

| variant | the question it answers | interior | marker seat | the iOS-27 read |
|---|---|---|---|---|
| **scrubber** | "where am I in a continuum?" | ONE warm-fill that tracks `t` + a **liquid lozenge thumb** | no phase dots; the thumb IS the marker | a single bright transmissive bead riding a warm lane (the iOS-27 video scrubber / volume bead) |
| **segmented** | "N independent phases, each its own status" | **gapped** cells (a hair of rail shows between) — each an independent gradient tile with its own fill | dots **float above** the boundary seams, loosely (independence) | a row of distinct lozenges, like the iOS battery/storage segmented bar |
| **continuous** | "ONE progression across N phases" | the **stitched** gradient (no gaps — hues cross-fade through boundaries; KEEP the shipped engine) | dots seat as **flush rivets** ON the rail (one bar, riveted at phase joints) | one filling pipeline bar (the speedtest ping→download→upload) |

The differentiators are deliberate and minimal:
- **gap vs stitch:** segmented inserts a `--timeline-segment-gap` (≈ 2px of rail showing) between
  cells so they read as *independent tiles*; continuous has zero gap and cross-fades hues so it
  reads as *one bar*. This ONE property (gap) does the heavy lifting of differentiating the two
  currently-confusable variants.
- **dot-seat:** segmented dots float ABOVE the rail with a gap + their own cast (independent
  markers); continuous dots are flush **rivets** — inset into the rail surface with an inner
  keyed-shadow so they read as pressed-in joints of one bar (the W3 raised-rivet intent, now
  real). Scrubber has no phase dots at all — the thumb is the only marker.
- **the thumb is scrubber-only and is the star** (§3).

`TimelineSegment` is UNCHANGED (the data shape is fit — `key/label/state/progress?/gradient?/
value?/weight?`). The `#detail` slot stays **continuous-only** (the taxonomy: only the "one
progression" posture has a single current-phase to narrate); the contract, the effective-segment
resolution (`hovered ?? current`), and the `<Transition mode="out-in">` recipe are KEPT verbatim
(fit). The slot body now also gets a keyed-cel card edge for free (it already reads as a panel;
depend-on the cards greenfield `keyed-cel`).

---

## 3 — THE LIQUID SCRUB (cure the stiff thumb — the Band-0 liquid-weight law, made literal)

The scrubber thumb is re-invented (it is broken). The new thumb is a **warm-glass liquid
lozenge** that squishes along its travel axis with pointer velocity and settles with a spring —
the iOS-27 scrub bead.

**Visual:** a `--glass-bg-floating` lozenge (warm, transmissive, the brightest tier — it reads
forward of the rail) with the keyed rim, ~16px tall, radius-pill, an inner specular catch
(`vSpecular`, shipping). At rest it is a calm bead; it is always visible (cure the
opacity:0-until-hover hide — the scrub affordance must be present).

**Motion (compose extant engines, mint nothing but the calibration):**
- **squish-on-move:** drive `useLiquidFlex` (shipping; the `--stretch` / `1/--stretch` reciprocal
  scale on the travel axis) off the scrub `Δt` per frame, so a fast drag visibly STRETCHES the
  lozenge along X and thins it on Y (vol-preserving), settling to a round bead on release — the
  `morph-more-on-move` law. Cap the stretch LOW-bouncy (`useLiquidFlex` is already the
  SegmentedTabs-indicator engine; reuse its discipline).
- **spring settle, not Material crossfade:** the fill front and the thumb position track the
  scalar on `--spring-snappy` (extant; the calm low-overshoot settle), NOT `--ease-standard`.
  The LOUD beat — the grab/release squash & the over-drag rubber-band — rides
  `--ease-cartoon-punch` (depend-on; the tabs greenfield mints it; the anticipation→exaggeration
  →follow-through curve).
- **press squish:** on pointer-down the thumb does a `useSpringPress` / `useLiquidPress` (shipping)
  squash (`--scale-press: 0.96` floor) — the grab has weight; the bead "takes hold."
- **the fill LAGS the thumb a hair** (the liquid-weight inertia): the warm fill catches up to the
  thumb on a slightly slower spring clock than the thumb itself, so the lane reads as liquid
  trailing the bead, not a rigid bar. Compositor-only (transform/clip), fade-coupled.
- **PRM:** the squish/spring collapse to an instant position set (the shipped PRM carve); the
  bead still moves, just without the deformation.

This is pure composition of shipped motion composables (`useLiquidFlex`, `useSpringPress`,
`usePointerVelocityField` for the velocity term) + the shipped spring tokens + the depend-on
`--ease-cartoon-punch`. **No new motion engine.**

---

## 4 — TYPE · PROPORTION · CARTOON SHADOW (audacious, golden-ratio, both modes)

- **√φ proportion:** re-base the three rail heights on the √φ (≈1.272) ladder so the postures
  relate by golden ratio: continuous (the loudest, the bar) = base h; segmented = h/√φ;
  scrubber track = h·√φ (the a11y scrub surface is the tallest — it bears the touch target).
  The thumb diameter, the rivet diameter, and the segment gap all derive from h by √φ steps
  (`--timeline-rivet: calc(var(--timeline-h) / var(--sqrt-phi))`), so nothing is an arbitrary px.
- **caret / detail type:** the scrubber caret and the `#detail` value read the audacious mono
  ladder (`fira-code`, the shipped `--type-*` scale) with the −1.5% Apple tracking; the detail
  panel's value is a hero-ish numeral (the "245.3 Mbps" already reads big — push it onto the
  display ladder).
- **cartoon shadow:** the thumb + the segmented floating dots carry the shipped
  `.shadow-cartoon-sm` bold layered-offset cast (depend-on the cartoon-shadow greenfield) so they
  pop off the rail with 1940s-cel weight; the cast offsets opposite `--glass-key` (coherent with
  the rim). The rivets carry an INNER keyed shadow (pressed-in, the inverse).

---

## 5 — A11Y · PRM · CROSS-ENGINE (verify, carve, mint nothing)

- **A11y contract is FIT — KEEP it verbatim.** scrubber `role="slider"` + `aria-valuemin/max/now`
  (the `Number(modelValue ?? 0)` coercion) + arrow/shift-arrow step; segmented `role="group"` +
  per-dot `<button aria-label="{label}: {state}">`; continuous Option-C structural split
  (`role="progressbar"` rail SIBLING to the `role="list"` marker overlay — the `nested-interactive`
  fix), the `data-current` stamp, the HoverPopover debounced hover cadence, the WCAG-2.5.5 44×44
  `::before` halo (+ the coarse-pointer recompute). None of this changes — the warm substrate is a
  paint swap UNDER the same DOM/ARIA. The keyed rim DOUBLES as the `prefers-contrast: more` and
  `prefers-reduced-transparency` legibility anchor (the rail stays a defined shape with
  transparency off — warm `--card`, never gray).
- **PRM:** the existing `0.01ms` collapse on band/region/dot transitions stays; ADD the thumb
  squish/spring → instant-set carve. The `.paper-field` drift freezes (warm stays). The cel
  degrades to a still cel.
- **Cross-engine (Chrome AND Safari):** every leg is on the cross-engine base — `--glass-bg-*`
  color-mix + `backdrop-filter: blur() saturate()` (WebKit since 9), the keyed conic rim via
  `mask-composite: exclude` / `-webkit-mask-composite: xor` (Safari-native, spike-confirmed in the
  glass-material golden), `linear()` springs + compositor transform/clip for the scrub. **NO
  `backdrop-filter:url`, NO SVG, NO goo** in the timeline path — the metaball register belongs to
  the dock-fission viz, never the rail. Acceptance is a PAIRED-engine π.

---

## 6 — DEFT INTEGRATION (the UNION — what is kept / refined / re-invented)

| sub-part | verdict | action |
|---|---|---|
| `GlassTimeline.vue` dispatcher + variant enum + event surface | **FIT** | KEEP verbatim (the public API is unchanged) |
| `TimelineSegment` data shape | **FIT** | KEEP verbatim |
| `geometry.ts` stitched-gradient windowing + rounded caps + seams | **FITTEST** | KEEP verbatim — it paints inside the warm rail now |
| continuous Option-C a11y split + `#detail` slot + HoverPopover cadence | **FIT** | KEEP verbatim |
| the three private `--surface-tint-6` + `--glass-blur-wash` substrates | **BROKEN (gray)** | RE-INVENT → the ONE `.timeline-rail` warm-glass recipe (§1) |
| the scrubber thumb (gray bar, Material ease, hidden-until-hover, no squish) | **BROKEN (stiff)** | RE-INVENT → the liquid warm-glass lozenge (§3) |
| segmented vs continuous visual confusion | **WEAK** | REFINE → gap-vs-stitch + float-vs-rivet dot-seat (§2) |
| the three heights as arbitrary px | **WEAK** | REFINE → √φ ladder off ONE base (§4) |

**BUILD-DAG depend-on (not extant — this design depends on them, does NOT re-fork them):**
`W-GLASS-FIELD` (`.paper-field` chassis mount), `W-GLASS-KEY-EDGE` (`--glass-key` rim + cast),
`W-GLASS-AMBIENT-GENERAL` (the dominant-hue sample past the dock), `--ease-cartoon-punch` (the
tabs greenfield mints it), the cartoon-shadow + cards keyed-cel greenfields. **Extant, composed
as-is:** `--glass-bg-wash/quiet/floating`, `--glass-blur-resting/floating`, `glass/material.css`,
`glass/rim.css`, `useLiquidFlex`, `useSpringPress`/`useLiquidPress`, `usePointerVelocityField`,
`--spring-snappy/-bouncy`, `--scale-press`, `vSpecular`, `.shadow-cartoon-*`, `<ScrollingText>`
(if a long detail label overflows).

---

## 7 — THE GATE (born-RED, real painted pixels over the real field, both modes, both engines)

Extend the timeline π — no new gate harness, the `no-gray` discipline applied to the rail:

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **R1 warm-rail** | each rail (all 3 variants) composited OVER the real `.paper-field` resolves OKLab **C ≥ 0.018 warm** (H ∈ [45,85]), both modes | the C ≈ 0.0002 flat composite measured §0 | the warm tier + field land |
| **R2 field-present** | each timeline route mounts a `.paper-field` ancestor (the F4 structural arm) | `paperFieldCount: 0` on all 3 routes | the chassis mounts the field |
| **R3 defined-edge** | each rail carries a non-flat keyed rim + a non-`none` warm cast; the thumb/rivet edge cuts | the 1px wash + no rim | the keyed edge wires |
| **R4 liquid-scrub** | a π frame-series of a real scrub-drag shows the thumb scale ≠ 1 mid-flight (squish) + X·Y ≈ 1 (vol-preserving) + a spring settle to 1.0; born-RED on the pure-translate Material thumb | the §0 stiff thumb (translate-only, `--ease-standard`) | the `useLiquidFlex` + spring land |
| **R5 congruence** | the three rails share ONE substrate recipe (same computed bg-token family + blur token); segmented gap > 0, continuous gap = 0, scrubber dot-count = 0 | the three divergent gray substrates | the unified `.timeline-rail` lands |

The π samples the LIVE composite over the real field in BOTH modes (Chromium AND WebKit) + writes
the captured DELTA frames + the scrub-drag frame-series. **Born-RED today on all five arms** —
the honest RED over the flat/stiff condition is correct.

---

## 8 — DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the 116-wave set; no dup)

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **W-TIMELINE-WARM-RAIL** | RE-INVENT the 3 private substrates as ONE `.timeline-rail` warm-glass recipe (`--glass-bg-wash` + `--glass-blur-resting` + keyed rim), transmitting the field; enroll in the ambient-hue sample | R1·R2·R3·R5 | rides `W-GLASS-FIELD`/`-KEY-EDGE`/`-AMBIENT-GENERAL` (depend-on, not dup — those build the register; this consumes it). NOT a dock/select wave. |
| **W-TIMELINE-LIQUID-SCRUB** | RE-INVENT the scrubber thumb as the warm liquid lozenge — compose `useLiquidFlex` squish + `useSpringPress` + `usePointerVelocityField` + `--spring-snappy` + `--ease-cartoon-punch`; fill lags thumb; always-visible bead | R4 | distinct from the SegmentedTabs `useTabIndicator` (that is a tab-strip indicator; this is a slider thumb) and from `W-DOCK-TAB-INDICATOR`. Reuses the SAME `useLiquidFlex` engine — no fork. |
| **W-TIMELINE-VARIANT-CONGRUENCE** | REFINE differentiation — segment gap vs stitch, float-dot vs flush-rivet seat, √φ height/rivet/gap ladder off ONE base | R5 | composition-only refine of the extant variant SFCs; no new component, no new engine |

**HELD / FROZEN (union law):** `GlassTimeline.vue` dispatcher + enum + events, `TimelineSegment`,
`geometry.ts` (the stitched windowing is the FITTEST sub-engine — byte-untouched), the continuous
Option-C a11y split, the `#detail` slot contract + resolution + `<Transition mode="out-in">`
recipe, the WCAG-2.5.5 halo, the HoverPopover cadence, the PRM `0.01ms` collapses, the
`--surface-tint-*` in-srgb fence (it is simply no longer the timeline's substrate). **No legacy,
no alias, no dual path** — the warm rail + liquid scrub + congruence are paint/motion swaps under
the unchanged DOM, API, data shape, and a11y contract.

---

## 9 — ACCEPTANCE (the gestalt bar — judge AS A USER, both modes, both engines)

On a FRESH capture of `/data/timeline`, `-segmented`, `-continuous` in BOTH modes AND both engines:

1. **The three variants read as ONE primitive in three postures** — a shared warm-glass rail;
   you can tell scrubber/segmented/continuous apart instantly (free bead · gapped tiles · one
   stitched bar) without reading the heading. [R5]
2. **Every rail reads warm transmissive glass over a colorful field** — not gray, not flat;
   composited C ≥ 0.018 warm, both modes; dark GLOWS. [R1·R2]
3. **Every rail/thumb/rivet reads as a defined lit shape** lifted off the field (keyed rim + warm
   cast). [R3]
4. **The scrub is liquid and weighty** — the bead squishes with the drag, springs to settle, the
   fill lags with inertia; never stiff, never a Material crossfade. [R4]
5. **The `#detail` slot + segment hover/click + the full a11y contract are un-regressed.**
6. **Type is audacious, proportion is √φ, the cartoon cast coheres with the one key-light.**
7. **PRM-carved + Safari-parity** on the warm rail, the keyed edge, and the liquid scrub; zero
   goo, zero `backdrop-filter:url` in the timeline path.
