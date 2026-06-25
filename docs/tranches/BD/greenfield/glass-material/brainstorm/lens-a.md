# GREENFIELD — Glass Material System (Lens A: pure iOS-27 fidelity)

> The 7-tier ladder + the six-layer optical composite + the BA.W-NO-GRAY warm floor +
> the transmissive read + the §3 colorful-field/defined-edge requirement, re-derived from
> first principles, then UNIONED with the landed gray-glass triumvirate
> (`docs/tranches/BD/viz/refine/glass-abrogate-gray/`). Tranche-dev only.

---

## 0 — THE LIVE TRUTH (measured 2026-06-24, both modes, `getComputedStyle`→OKLab)

The triumvirate's **token retunes ARE landed in HEAD** — I verified the source, not the spec:

| token / surface | HEAD value | resolved OKLab | verdict |
|---|---|---|---|
| light `--card` | `hsl(30 85% 96%)` | L 0.974 · **C 0.0148** · H 67.7 | FIX-A landed (warm-amber) |
| dark `--card` | `hsl(26 22% 17%)` | L 0.295 · **C 0.0216** · H 57.8 | FIX-C landed (warm-dark) |
| `--glass-saturate-*` content/floating | `1.4 / 1.6` | — | FIX-D landed |
| **`.glass-resting` card, composited over page** | `oklab(0.763 .005 .0114/0.72)` | L 0.949 · **C 0.0104** · H 75.4 | clears the 0.010 floor — *just* |
| **`.glass-dock`, composited over page** | `srgb(.944 .903 .865/0.52)` | L 0.957 · **C 0.0103** · H 69.9 | clears — *just* |

**The gate is GREEN. The eye still reads a flat warm-cream-on-gray scene** (screenshot
captured: `/forms/select` light — the page is a flat `#e8e8e6`, the card a flat cream
slab, the Select triggers near-invisible cream-on-cream). This is **NOT** the
source-green/visually-broken hole the triumvirate already closed (the chroma DOES clear
0.010 now). It is the **next, deeper** root cause the triumvirate's own §3 already named
but did NOT build:

> **The single behind-glass element on every demo route is `paper-underpaint fixed
> inset-0 -z-10 bg-background` — a FLAT near-white plate. There is NO colorful field.
> The blur has nothing chromatic to bend, so the transmissive plate carries ONLY its own
> intrinsic ~0.010 chroma — at the floor, with zero transmissive lift. Glass-first +
> flat-background = warm-cream-gray.**

So the proven three-fold fix splits cleanly into *what is done* and *what is not*:

- **(a) WARM the glass** — DONE (the triumvirate; C clears 0.010 both modes). KEEP, never re-fork.
- **(b) a COLORFUL FIELD behind every glass demo** — **NOT BUILT. Load-bearing. This lens's headline.**
- **(c) a DEFINED-EDGE floor** so a control reads as a shape over a calm backdrop —
  **WEAK** (the Select trigger melts into the card; `--control-surface-border` is a 5%α
  `--glass-border-floating` whisper that vanishes cream-on-cream). Refine, don't re-fork.

This lens designs (b) and (c) as the GESTALT completion of (a), and re-derives the
material ladder so the three compose into one coherent iOS-27 read.

---

## 1 — THE CORE IDEA: glass is a *relationship*, not a plate

iOS-27 Liquid Glass is never shown over white. Every Apple reference (the Maps card, the
dock over album art, Control Center over the live app) puts glass over a **vibrant,
moving, chromatic field**, and the glass EARNS its identity by *bending that field*. The
warm-cream tint is the plate's intrinsic floor; the **transmission of a colorful backdrop
is what makes it read as glass and not as paper.** Our system warmed the plate (a) but
left it floating over flat cream — so it can only ever read as warm paper, never as glass.

**The re-derivation: the material is a THREE-BODY composite, and all three must be present
on every demo, by construction.**

```
   COLORFUL FIELD  →  [ blur · saturate · warm-tint · TRANSMISSION ]  →  DEFINED EDGE
   (the backdrop)        (the six-layer plate)                          (the rim that
    the plate bends                                                      cuts the shape)
```

Today we ship the middle body beautifully and starve the two outer bodies. The greenfield
mandates **all three as a single, non-optional composition** — the `<GlassStage>` /
`.glass-field` contract (§3) guarantees a field behind glass the way the six-layer recipe
guarantees the plate.

---

## 2 — THE WARM-CREAM TRANSMISSIVE LUMINOUS MATERIAL SPEC (the golden, per tier, both modes)

This UNIONS the triumvirate's landed tokens — it does not re-declare them. It SPECIFIES
the *composited target* each tier must hit **over the new colorful field** (§3), which is
strictly richer than the over-flat-page floor the triumvirate gate asserts.

### 2.1 — The intrinsic plate floor (over a calm/flat backdrop — KEEP as landed)

| tier | α (light) | composited C floor | the role |
|---|---|---|---|
| wash | 0.30 | ≥ 0.006 (thin) | veil — input chrome, hover bg |
| quiet | 0.50 | ≥ 0.009 | inline chrome, the control-surface rest |
| resting | 0.65 | ≥ 0.010 | the default card plate |
| floating | 0.80 | ≥ 0.011 | popover / dropdown panel |
| overlay | 0.95 | ≥ 0.012 | dialog / action sheet |
| dock | 0.50 | ≥ 0.010 | translucent chrome over backdrop motion |
| chassis | 0.28 | ≥ 0.008 | instrument substrate |

These are the triumvirate's floors — **frozen, not re-touched.** The hue stays H ∈ [62,78]
(warm-amber `--foreground` family); L stays luminous (≥ 0.93 light / lifted-dark). This
lens adds NO new source-token edit on the calm-page axis — that axis is solved.

### 2.2 — The TRANSMISSIVE target (over the §3 colorful field — the NEW richer bar)

Over a chromatic field, the plate must *lift* measurably toward the field's hue. The
mechanism already 90% ships (`useGlassBackdropLuminance` + the `--glass-ambient-hue` /
`--glass-ambient-strength` axes registered in `glass.css`) — it samples luminance but the
HUE term is wired only on the dock. The golden GENERALIZES the ambient-hue sample to every
glass tier over a field, BOUNDED:

| axis | target | mechanism (extant, generalized) |
|---|---|---|
| transmissive ΔC over field | composited C ≥ 0.018 (≈ field-hue bleeds through) | `--glass-ambient-hue` at `--glass-ambient-strength` ≤ 8%, fed by the luminance observer's NEW dominant-hue term (T7 `W-DOCK-DEEP-TRANSMIT` — generalize past the dock) |
| transmissive ΔH | the plate hue rotates ≤ 12° toward the field's dominant hue | the bounded `in oklab` ambient mix — a HUE EVENT, never the field's full saturation |
| the read | the field is VISIBLE through the plate, tinted warm — the Maps-card read | blur (10–13px content / 9px dock) + `saturate(1.4–1.6)` already concentrate it |

This is the "warm-cream LUMINOUS TRANSMISSIVE" half §2.1 of the target spec named — it is
*latent in HEAD* (the axes exist) and just needs the field (§3) plus the hue-sample
generalization (T7) to READ.

### 2.3 — DARK mode (luminous-warm-dark that GLOWS, not charcoal)

Dark `--card` is now C 0.0216 (warm). The dark arm's `saturate(1.22–1.35)
brightness(1.06–1.18)` companions make it GLOW where the field transmits. Over the §3
field, the dark plate picks up the field's hue (same ambient mechanism, the dark
`--glass-tint-strength-aa: 12%` already lifts warm). Bar: dark composited C ≥ 0.014 warm,
the edge rim (α 0.22) the primary silhouette. KEEP the dark arm; it is correct in shape.

---

## 3 — THE BOLDEST MOVE: `.glass-field` — a colorful field is STRUCTURALLY GUARANTEED behind every glass surface

**This is the single load-bearing greenfield.** Today a demo author can drop a `.glass-card`
over a flat page and the framework says nothing — the result is the gray slab the user
keeps reporting. The greenfield makes that **impossible by construction**, exactly as the
six-layer recipe makes a flat plate impossible.

### 3.1 — The contract

A new **`.glass-field`** utility + a **`<GlassStage>`** demo-chassis primitive that renders,
behind its slot, a **calm, compositor-cheap, chromatic, slowly-drifting field** — the
backdrop the glass bends. It is NOT a heavyweight per-card GL aurora (the one-GL-per-route
budget forbids N live cards). It is the cheap living-artwork register the IOS27-REFERENCE
T11/`W-LIVING-ARTWORK` already proposes, promoted to **the default substrate of every
glass demo page**:

```
.glass-field {
  /* a slow CSS conic/radial mesh of the section-accent + two analogous warm hues,
     drifting on a PRM-static @keyframes (transform/opacity only — compositor-cheap).
     The warm-cream paper-underpaint stays as the BASE; the field is an additive
     chromatic veil ABOVE it, so the page is still warm-cream where the field thins. */
  background:
    radial-gradient(120% 90% at 18% 12%, var(--field-a) 0%, transparent 55%),
    radial-gradient(110% 80% at 82% 78%, var(--field-b) 0%, transparent 50%),
    conic-gradient(from 210deg at 50% 50%, var(--field-c), transparent 40%);
  /* drift: a 40s @keyframes translate/scale, PRM → frozen, offscreen-park via the suite */
}
```

The `--field-a/b/c` are derived from the route's **section-accent** (presets-in-consumers:
the consumer/section sets ONE accent hue; the field derives an analogous warm triad). Over
a near-neutral page the default field is a faint warm-amber → terracotta → sand drift —
*chromatic but calm*, so the glass has a real backdrop to bend WITHOUT the page becoming a
garish aurora. A route that WANTS the full living mesh opts into `<Aurora>` (the one-GL
register) — `.glass-field` is the cheap universal floor.

### 3.2 — Why this is the gestalt fix, not a workaround

- **It builds the proven §3 leg (b)** the triumvirate named as "load-bearing, mandatory"
  but did not implement — the literal cause of the live gray read I captured.
- **It makes the transmissive material (§2.2) READ.** The ambient-hue sample (T7) has
  nothing to sample over a flat page; over `.glass-field` it lifts the plate toward the
  field hue — the Maps-card transmission becomes real, not latent.
- **It is DEFT / DRY / no-fork.** It reuses the `auroraFallbackGround` static-mesh idiom
  (T11) + the existing `paper-underpaint` base + the suite's park/PRM/pause discipline. No
  new GL context, no new compositing seam — a CSS gradient layer + a drift keyframe.
- **It is a DEMO-CHASSIS contract, not a library-API burden.** `<GlassStage>` is the
  storybook page wrapper (band-C scope); `.glass-field` is the utility a consumer opts a
  section into. The library's glass primitives are UNCHANGED — they simply finally have a
  backdrop worthy of them. This is the "end-to-end: the demo/storybook chassis is in scope"
  mandate (HARDENING-PLAN §1).

### 3.3 — The gate

Extend `proof:no-gray`'s π arm (`tests-visual/no-gray.spec.ts`): the composited glass-plate
chroma is asserted **over `.glass-field`, not over a flat page** — born-RED on the current
flat-page demo (the plate reads ≤ 0.011 with no transmissive lift), GREEN when the field is
present AND the ambient-hue sample lifts the plate to C ≥ 0.018. A new
`field-behind-glass` structural assert: every `<GlassStage>` route has a non-flat
backdrop behind its glass slot (born-RED on today's `bg-background` flat plate).

---

## 4 — THE DEFINED-EDGE FLOOR (leg c — refine, don't re-fork)

The live capture's worst surface is the **Select trigger**: a `control-surface` whose
`--control-surface-border` is `--glass-border-floating` (5%α warm-ink) — a whisper that
*vanishes* cream-on-cream. The user's "these toggle buttons so grey" / "buttons should not
be gray glass" is partly THIS: a control with no defined edge over a low-contrast plate
reads as a gray smudge, not a tappable shape.

**The fix (refine the extant `--control-surface-border` + add a structural floor):**

1. **A `--glass-edge-floor` token** — a per-mode minimum edge contrast the control rim must
   clear against its OWN plate (not the perimeter-border BC.W-BLACK-BAR retired). It composes
   the EXISTING directional rim (`--glass-rim-top` catch-light + `--glass-rim-bottom`
   under-shadow) — the catch-light is what cuts the shape, the under-shadow grounds it. On a
   control over a same-hue plate, the rim α floors UP so the shape is always legible. This is
   a 1-token refine of the rim α on the *control* tier only, NOT a new border.
2. **The control's resting plate steps ONE rung off its host.** A `control-surface` on a
   `resting` card should read as `quiet`-over-`resting` — a real tier delta (the
   "glass-on-glass nested" T8 read), so the trigger is a forward shape, not a same-tier
   smudge. This is already the intent (`--control-surface-bg: var(--glass-bg-quiet)`); the
   golden VERIFIES the host card is `resting`+ so the delta exists, and the edge floor (1)
   guarantees the cut even when host and control collapse to the same tier.
3. **Over the §3 field**, the control's edge is trivially defined (the field provides
   contrast) — so the edge floor is the *flat-page insurance*, and the field is the primary
   shape-definer. The two legs reinforce.

No new control component, no fork — a rim-α floor token + a tier-delta verification.

---

## 5 — THE SIX-LAYER COMPOSITE, RE-RATIFIED (all six, both modes, over the field)

| # | layer | HEAD state | greenfield |
|---|---|---|---|
| 1 | backdrop blur + saturate | `blur(10–13) saturate(1.4–1.6)` — landed | KEEP; over the field the saturate finally has chroma to concentrate |
| 2 | surface tint (warm fill) | `--card` warmed — landed | KEEP; the intrinsic floor |
| 3 | edge rim | directional `--glass-rim-*` | REFINE: the `--glass-edge-floor` (§4) on controls |
| 4 | inner catch-light | `::before` specular, pointer-tracked | KEEP |
| 5 | drop shadow | per-tier `--glass-shadow-*` | KEEP; elevate toward the Cartoon offset register on loud surfaces (cross-precept §L4) |
| 6 | grain | `--glass-grain 2.5%` / paper 8% | KEEP (paper-morphism visible) |
| **+** | **TRANSMISSION** | **latent — no field to transmit** | **§3 field makes layers 1+2 READ as glass — the missing 7th read** |

The insight: the six layers are all *present*; the **field (§3) is what makes layers 1, 2
and the saturate of 1 actually do their job.** Glass without a field is paper with a rim.

---

## 6 — MOTION / LIQUID-WEIGHT (verify, mint nothing)

The field DRIFTS with weight (a slow 40s ease, not a linear loop — the liquid-weight law on
the backdrop too). The dropdown blooms with `.glass-reveal` (verified shipped). The ambient
hue lifts on a spring when the field's dominant hue shifts (not a hard swap) — rides the
existing `--glass-tint-strength` transition. All compositor-only (transform/opacity/filter
+ the bounded `in oklab` ambient mix), PRM-carved (field freezes, ambient holds the calm
floor), Safari-safe (CSS gradients + `backdrop-filter: blur() saturate()` — the cross-engine
base; NO `backdrop-filter: url()`; the ambient mix is plain `color-mix(in oklab)`).

---

## 7 — A11Y / PRM / SAFARI

- **AA.** The §4 edge floor and the §3 field both only ADD contrast/definition — text AA
  (light 16.3:1 / dark 12.2:1 fg over plate, landed) is preserved; the on-glass-fg family
  re-resolves over the now-richer plate (warmer, not darker). The field is BEHIND the glass,
  never under text directly.
- **PRM** → field freezes (static mesh), ambient hue holds its calm floor, no drift.
- **`prefers-reduced-transparency`** → `--glass-level: 0` collapses to solid warm `--card`
  over the field's static frame; the field stays (it is paint, not transparency) so the
  opaque escape still reads warm-over-chromatic, not gray-on-white.
- **Safari** → the field is CSS gradients (universal); the transmission rides
  `backdrop-filter: blur() saturate()` (WebKit since 9); the ambient `in oklab` mix is
  cross-engine. The Chrome-only `.glass-refract` lens stays the §L7 progressive enhancement,
  never load-bearing on the warm/field read.

---

## 8 — DELTA-ASSAY → WAVE AMENDMENT (reconcile against the 116 union waves, no dup)

The triumvirate's `W-GLASS-ABROGATE-GRAY` is **landed** (tokens A/C/D in HEAD). This lens
does NOT re-open it — it AUGMENTS with the two legs it left unbuilt:

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **AUGMENT `W-GLASS-ABROGATE-GRAY`** with leg (b): the `.glass-field` / `<GlassStage>` mandatory colorful field | NEW — band-C demo chassis + a `.glass-field` utility (composes the T11 `W-LIVING-ARTWORK` static-mesh idiom) | extend `proof:no-gray` π to assert over the field + a `field-behind-glass` structural assert | folds T11 `W-LIVING-ARTWORK` (LOW) UP into the no-gray-completion — they are the SAME mechanism; no new wave, a union |
| **AUGMENT** with leg (c): `--glass-edge-floor` control rim-α floor + tier-delta verify | REFINE `control-surfaces.css` + `rim.css` | a control-edge contrast π over a same-hue plate | distinct from BC.W-BLACK-BAR (that retired the *perimeter* border; this floors the *directional rim* on controls only) |
| **GENERALIZE** the ambient-hue transmission past the dock (T7) | composes `W-DOCK-DEEP-TRANSMIT` — extend `useGlassBackdropLuminance` dominant-hue term to every glass tier over `.glass-field` | the §2.2 transmissive-ΔC π | T7 already proposed for the dock; this widens its scope — augment, not a new wave |

**No new tier. No new compose recipe. No source-token re-edit on the calm axis.** The three
amendments compose EXISTING seams (`--glass-ambient-*`, `--glass-rim-*`, the static-mesh
fallback, the `proof:no-gray` gate) into the gestalt the triumvirate's chroma-only fix could
not reach alone.

---

## 9 — ACCEPTANCE (the gestalt bar — live-judge AS A USER, both modes)

The wave closes only when, on a FRESH capture of `/forms/select`, `/forms/toggle-chip`,
`/display/buttons`, a cards page, `/foundations/intro` in BOTH modes:

1. **A colorful field is visibly behind every glass surface** (the page is not flat cream/gray).
2. **The glass TRANSMITS the field tinted warm** — composited C ≥ 0.018 over the field (born-RED on today's flat-page ~0.010).
3. **Every control reads as a DEFINED SHAPE** — the Select trigger has a cut edge, not a cream smudge.
4. **No surface reads gray/muddy** — the headline; a single gray plate is a FAIL regardless of the chroma metric.
5. **Text AA holds** (landed ratios preserved).
6. **Both modes** read warm-luminous; dark glows, never charcoal.
7. **Liquid-weight un-regressed**; Safari-parity on the field + transmission.
8. **No-legacy / DRY** — augments the landed triumvirate, composes extant seams, zero fork.
