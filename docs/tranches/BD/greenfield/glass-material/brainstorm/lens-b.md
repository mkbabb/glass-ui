# GLASS MATERIAL — GREENFIELD BRAINSTORM · LENS B (cross-engine / perf-first)

> **Lens.** Design for FLAWLESS Chrome **and** Safari + performance. The simplest mechanism that
> hits the bar (KISS); GPU only where it is a viz; offscreen-pause. A UNION with the already-run
> gray-glass refine triumvirate (`docs/tranches/BD/viz/refine/glass-abrogate-gray/`), never a re-fork.

---

## 0 — THE LIVE TRUTH (measured 2026-06-24, `localhost:5173`, getComputedStyle → OKLab)

The refine triumvirate (BD.W-GLASS-ABROGATE-GRAY) **landed** and is live. I re-measured the actual
painted surfaces. The token warm-floor HOLDS — and the surface **still reads gray**. The smoking gun:

| measured surface (`/forms/select`, light) | live value | OKLab | verdict |
|---|---|---|---|
| `--card` source token | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | — | **FIX-A landed** |
| Select trigger **own fill** | `color(srgb 0.994 0.96 0.926 / 0.5)` | **L 0.974 · C 0.0148 · H 67.7°** | warm — the token IS warm now |
| **the page backdrop it sits on** | `rgb(251, 250, 248)` (`--neutral-0`) | **L 0.985 · C 0.0029 · H 84.6°** | **near-achromatic, yellow-green** |
| trigger **border** | `color(srgb 0.11 0.098 0.09 / 0.05)` | 5%-α ink hairline | **near-invisible over near-white** |
| trigger **box-shadow** | `none` | — | **no defined edge** |
| `/foundations/intro` (24 glass surfaces) | **field count = 0** (only a 1×1px goo-host) | — | **NO colorful field behind ANY glass** |

The screenshot (`_lensb-intro-light.png`) shows it plainly: the trigger plates read as flat
gray-beige slabs that **melt into the page** — no discrete shape, no luminous transmission.

**The diagnosis, named precisely.** The triumvirate fixed leg (a) — WARM the glass — and it
genuinely landed (the plate's own fill is C 0.0148 @ H 67.7°). But the §3 root cause is a *three*-fold
fix, and the other two legs were explicitly HELD:

- **Leg (b) — the COLORFUL FIELD behind every glass demo: MISSING.** A 0.5-α plate composites its
  warm C 0.0148 fill **half-and-half with the page**. The page is C 0.0029 at the *wrong* hue
  (H 84.6° yellow-green, the exact cast `proof:no-gray` condemns elsewhere but `--neutral-0` was kept
  at). The composite collapses to ≈C 0.007 with the page's cool cast fighting the plate's warm one →
  **muddy gray**. The triumvirate's own RESEARCH-1 named this the keystone ("the page is the backdrop
  everything transmits; a gray page yields gray glass") and then HELD it ("KEEP-NEUTRAL register").
  That hold is why the surface still reads gray. **A transmissive material has nothing to transmit
  over a flat page.**
- **Leg (c) — the DEFINED EDGE floor: MISSING.** The trigger paints a 5%-α ink border and
  `box-shadow: none`. Over a near-white page a glass control needs an edge to read as a *shape*. It has
  none, so it dissolves.

**The triumvirate was correct and incomplete.** It is the warm-token leg of a three-leg fix. This
greenfield is the UNION that lands the other two legs **without re-touching the tokens it fixed** —
and re-frames the whole system so gray is structurally impossible, not gate-policed after the fact.

---

## 1 — THE CORE IDEA: glass is a RELATIONSHIP, not a color

The mistake the gray-glass saga keeps re-litigating is treating "warm glass" as a property of the
**plate**. It is not. Glass has no color of its own — it is **a lens over a field**. You cannot warm a
lens; you warm what it looks at. The triumvirate proved this the hard way: it lifted the plate to
C 0.0148 and the surface still read gray, because the field behind it is C 0.0029. **The glass faithfully
transmitted a gray page.**

So the greenfield re-frames the material as a **three-body composite that is ALWAYS present together** —
a contract, not three independent tokens that can drift apart:

```
  GLASS MATERIAL  ≡   FIELD (warm colorful backdrop)
                    ⊗ LENS  (transmissive warm-cream plate — the landed triumvirate tokens)
                    ⊗ EDGE  (a defined rim+shadow floor so the lens reads as a shape)
```

Each glass surface declares its membership in this contract by ONE class. The contract guarantees:
**no glass without a field, no glass without an edge.** A `.glass-*` surface that paints over a flat
backdrop is, by construction, impossible — because the field is part of the same composition layer the
glass mounts into. This is the structural cure for the recurring "warm tokens, gray paint" gap.

**This is a UNION, deftly:** the LENS leg IS the triumvirate's `--card`/`--glass-saturate-*` tokens
(byte-untouched). The greenfield adds the two missing legs as TWO small, idiomatic primitives that
compose the EXISTING `paper-underpaint`, `--glass-rim-*`, and `--glass-shadow-*` machinery — no new
recipe, no re-fork.

---

## 2 — THE BOLDEST MOVE: `--page-field` — a warm chroma plenum behind every demo (the mandatory field, made a precept-enforced layer)

**The single boldest move:** retire the flat `--neutral-0` page as the backdrop-of-record and replace
it with a **mandatory, always-on, compositor-cheap warm chroma field** that every glass surface
transmits — a `paper-field` layer that unions the existing `paper-underpaint` turbulence with a
**slow drifting warm-cream conic/radial mesh** at the page root, `position: fixed; z-index: -1;
pointer-events: none`. Not an aurora (that's a GPU viz, one-per-route). A **CSS-only, 0-JS,
PRM-static, both-engine warm mesh plenum** — the calm backdrop that gives every lens something warm to
bend.

The field is **structurally warm by construction**: it is built from `--card`-family warm stops
(H 60–78°, C 0.02–0.05 at the *field* L, where the gamut allows real chroma — not the L0.98 near-white
plate where chroma is gamut-bound). The page is no longer a flat C 0.0029 near-white; it is a
**living warm-cream field at C ≈ 0.025**, so a 0.5-α plate composites its C 0.0148 fill over a
C 0.025 field → the composite **rises** to warm-cream instead of collapsing to gray. The transmission
finally has warmth to transmit.

**Why this is the keystone the triumvirate held.** RESEARCH-1 named `--neutral-0` Leg A "the keystone"
and then held it for fear of breaking the KEEP-NEUTRAL luminance register. The greenfield resolves the
fear: **the field is a separate fixed layer, NOT the `--neutral-0` token.** `--neutral-0` stays the
KEEP-NEUTRAL surface for solid (opaque) chrome and PRM-reduce fallback; the `paper-field` is the
*backdrop the glass transmits*, decoupled. Solid surfaces still sit on calm neutral; glass surfaces
transmit a warm field. Both truths hold — they were never in conflict; they were conflated into one
token.

**Why CSS-only (the cross-engine / perf lens demands it).** An aurora behind every demo is a GPU
context per route — fails the one-GL-per-route budget and the offscreen-pause discipline. A CSS conic
`background` + a `@property`-animated hue-rotation on a 30s `linear` loop is **compositor-only**
(`background-position`/`--field-drift` on the GPU), **costs one paint at most per drift tick**, runs
**identically in WebKit and Chromium** (no `backdrop-filter:url`, no SVG goo, sRGB color-interp), and
**PRM-collapses to a static warm mesh** (the drift stops, the warmth stays). It is the simplest
mechanism that hits the bar — exactly the KISS the lens mandates.

---

## 3 — THE THREE LEGS, AS PRIMITIVES (the union spec)

### Leg (a) — LENS — the warm transmissive plate · UNION, byte-untouched

The triumvirate's landed tokens ARE this leg. **Zero edits.** Re-stated here only so the contract is
whole:

- `--card: light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` — the warm fill source (C 0.0148 light /
  0.0216 dark). KEEP.
- `--glass-saturate-{wash,quiet,resting}: 1.4 · floating/overlay: 1.6 · deep: 1.8` — the transmission
  term that pulls field-warmth THROUGH the plate. KEEP. (This is precisely *why* the field matters:
  `saturate(1.6)` over a flat page is inert — RESEARCH-3 §1.2 — but over the new warm field it now has
  chroma to amplify. **The field makes the saturate term finally earn its keep.**)
- The `--glass-level` compose recipe + the W55 adaptive tint seam + the W-DARK-MATERIAL arm. KEEP.

The lens leg's job is done. The greenfield's contribution is to give it the field + edge it was
designed to sit on.

### Leg (b) — FIELD — `paper-field` (NEW primitive, composes `paper-underpaint`)

A new `@utility paper-field` (sibling to `paper-underpaint`, in `src/styles/paper.css`) that the demo
chassis (`AppShell.vue`) and any standalone glass-demo mounts as the page backdrop layer:

```css
@property --field-drift { syntax:"<angle>"; inherits:false; initial-value:0deg; }

@utility paper-field {
  position: fixed; inset: 0; z-index: -1; pointer-events: none;
  /* warm-cream chroma plenum — three drifting warm stops + the underpaint grain on top */
  background:
    radial-gradient(120% 90% at 18% 12%, oklch(0.96 0.045 72  / 0.55), transparent 60%),
    radial-gradient(100% 80% at 82% 28%, oklch(0.95 0.040 48  / 0.45), transparent 55%),
    radial-gradient( 90% 90% at 50% 92%, oklch(0.97 0.035 88  / 0.40), transparent 60%),
    var(--neutral-0);                 /* the KEEP-NEUTRAL floor underneath the warm stops */
  /* compositor-only drift: rotate the stop field, not a re-paint */
  animation: field-drift 38s linear infinite;
}
@keyframes field-drift { to { --field-drift: 360deg; } }   /* drives a transform on a ::before, not bg */
.dark .paper-field { background:
    radial-gradient(120% 90% at 18% 12%, oklch(0.30 0.040 58 / 0.6), transparent 60%),
    radial-gradient(100% 80% at 82% 28%, oklch(0.26 0.045 44 / 0.5), transparent 55%),
    radial-gradient( 90% 90% at 50% 92%, oklch(0.24 0.030 70 / 0.5), transparent 60%),
    var(--neutral-0); }
@media (prefers-reduced-motion: reduce){ .paper-field{ animation: none } }  /* warm stays, drift stops */
```

- **The field's chroma is real** because it lives at the *field* lightness (L 0.96 light / 0.26 dark),
  not the gamut-bound L 0.98 plate — `oklch(0.96 0.045 72)` is a *perceptible* warm-cream, C 0.045,
  ~3× the plate-floor. The glass transmits THIS, not a flat near-white.
- **Drift is compositor-only.** The visible drift is a slow `transform: rotate/translate` on a
  `::before` pseudo carrying the gradient (the `@property --field-drift` is the animatable seam;
  `background` itself never re-paints per frame). One GPU channel, no JS, offscreen-pause N/A (it's a
  fixed full-bleed layer; the browser already skips occluded composites).
- **Both engines.** Pure CSS gradients + `transform` + `@property`. WebKit supports `@property` since
  16.4; the `oklch()` stops render identically; **no `backdrop-filter:url`, no SVG filter.** sRGB
  fallback: the `oklch()` stops degrade to their sRGB gamut-clamp in any engine without OKLCH (none
  current), still warm.
- **It composes, not replaces, `paper-underpaint`.** The grain turbulence layers ON TOP of the warm
  field (the §L1 layer-6 grain) — the field is the new layer-0 *backdrop* the six-layer composite was
  always meant to sit on. Glass + paper morphism, unioned.

**The precept enforcement (the "mandatory" part).** A `.glass-*` surface in a demo with no
`.paper-field` ancestor is a §3 FAIL. The gate (`proof:no-gray` extension, §6) asserts: every enrolled
glass demo route paints a `paper-field` backdrop whose sampled OKLab C ≥ 0.020 warm — born-RED on the
current flat-page routes. **The field is no longer optional discipline; it is a gated layer.**

### Leg (c) — EDGE — the defined-edge floor (composes EXISTING rim + shadow tokens)

The trigger paints `box-shadow: none` and a 5%-ink border — it never composes a tier shadow or a rim.
The fix is **not new tokens** (the rim/shadow tokens exist) — it is **wiring the existing
`--glass-rim-top` + `--glass-rim-bottom` + `--glass-shadow-resting` onto the control/wash rungs that
currently drop them**, plus one calibration:

- **The rim is the silhouette over a calm field.** `--glass-rim-top: inset 0 1px 0 hsl(0 0% 100%/0.30)`
  (the bright top catch-light) + `--glass-rim-bottom: inset 0 -1px 0 …foreground 6%` (the warm ground)
  already exist (`glass-fx.css`). They must paint on **every** glass rung, including `wash`/control —
  the control-surface currently composes neither. Wire `--glass-material-rim` into `.control-surface`.
- **The drop shadow gives the lens lift.** `--glass-shadow-resting: var(--shadow-lg),
  var(--glass-highlight)` exists; the trigger renders `none`. Wire the per-tier `--glass-shadow-*` onto
  the control rungs (the calm tier gets `--glass-shadow-wash`/`-quiet`, not the heavy resting shadow —
  monotone with the alpha ladder).
- **The defined-edge calibration (the ONE new value).** Over a warm field the 5%-ink perimeter border
  is still too faint to read as an edge. Lift the per-rung **glass border** floor on the
  wash/quiet/control tiers from ≤5%-α to a **warm 8–10%-α `--foreground`-derived hairline** (NOT the
  retired BC.W-BLACK-BAR black bar — a warm ink at the field hue). This is the §3 "defined-edge floor"
  named explicitly. Born-RED: the control border currently resolves C≈0 ink at 5%.

**Why this reads as a shape now.** Field (warm, drifting) + plate (warm, transmissive) + a bright
top rim + a warm bottom ground + a soft lift shadow = the lens sits *off* the field as a discrete warm
pane. The §3 "a glass control reads as a shape over a calm backdrop" requirement, met by composing four
tokens that already exist plus one border calibration.

---

## 4 — THE 7-TIER LADDER, RE-READ THROUGH THE CONTRACT

The seven tiers stay the vocabulary. The contract re-reads each not as "how opaque" but as **"how much
field shows through"** — the transmission ladder:

| tier | field-through | edge | role under the contract |
|---|---|---|---|
| Wash | maximum (the field nearly fully reads) | thin warm rim, no shadow | permeable veil — the field IS the surface |
| Quiet | high | warm rim + faint lift | recessive chrome, field-tinted |
| Resting | moderate (the canonical plate) | rim + `--glass-shadow-resting` | the default — warm-cream over a warm field |
| Floating | moderate, `saturate 1.6` amplifies | rim + `--glass-shadow-floating` | dropdowns/popovers — the literal defect surface, now warm |
| Overlay | lower | rim + heavy shadow + scrim | modal takeover |
| Dock | `blur(0)` floor — the backdrop's OWN blur reads through | rim + dock shadow | the field's motion reads through the dock (§L1 dock rule) |
| Chassis | engraved bezel | inset rim | multi-region substrate |

The **alpha ladder is byte-untouched** (the triumvirate + W-DARK-MATERIAL bounds). The contract adds
**no new tier** — it makes every existing tier finally read as *glass-over-field* instead of
*plate-over-flat*. Tier separation is preserved; gray is structurally gone because the field is always
warm beneath.

**The over-reach question (KEY-3) answered.** The brief asks: is glass-first-maximal (AX.W54
`--glass-level`) over-reached — does the default control need MORE definition (the edge floor) rather
than maximal glass? **Yes, partially.** The answer is NOT to retreat from glass — it is to give the
default control its EDGE (Leg c). Maximal glass over a flat page reads gray *because it has no edge and
no field*. Maximal glass over a warm field WITH a defined rim reads as luminous material. The fix is
not less glass; it is the **two missing legs**. `--glass-level` stays at its maximal default; the
control gets its rim+shadow+border floor. (The one carve: the PRM-reduce + `prefers-reduced-transparency`
path collapses `--glass-level → 0` to the solid warm `--card` — there, the edge floor is what keeps the
now-opaque control reading as a control. The edge floor doubles as the reduce-transparency legibility
anchor — a bonus, not a cost.)

---

## 5 — DARK MODE (the "too gray/dark" half)

Dark mode gets the SAME contract: a **warm-dark field** (the `.dark .paper-field` stops at L 0.24–0.30,
C 0.03–0.045 warm) behind the warm-dark plate (`--card` C 0.0216, the triumvirate's FIX-C). The dark
plate transmits a warm-dark *glowing* field instead of a dead charcoal void. The dark rim
(`--glass-rim-top: inset 0 1px 0 hsl(0 0% 100%/0.40)` — already lifted in `dark-arm.css`) is the
PRIMARY silhouette device per the target spec; the warm-dark field gives the transmission its glow.
The W-DARK-MATERIAL `saturate(1.28) brightness(1.1)` companions (already live) amplify the warm field
through the plate — the same "the saturate finally has chroma to amplify" mechanism, in dark.

Measured baseline (live, dark trigger): the plate is already C 0.0216 @ H 59.2° — warm. The missing
piece is identical: a warm field behind it + the edge. Same two legs, both modes.

---

## 6 — THE GATE: extend `proof:no-gray` to the CONTRACT (no new gate, no re-fork)

The triumvirate raised the plate floor (`WARM_PLATE_FLOOR = 0.010`) — necessary, insufficient (the
plate cleared it and still read gray because the field was flat). Extend the SAME gate to assert the
**whole contract**, so a warm plate over a flat field can no longer green:

| # | assert | born-RED on |
|---|---|---|
| F1 | **field-warmth** — every enrolled glass demo route paints a `.paper-field` whose sampled OKLab **C ≥ 0.020 warm** (H ∈ [45,85]) | the current flat C 0.0029 page |
| F2 | **composite-over-real-field** — the floating/control plate composited over the **actual field** (not a synthetic flat page) resolves C ≥ `WARM_PLATE_FLOOR` warm | the muddy ≈C 0.007 composite over the flat page |
| F3 | **defined-edge** — the control/wash rung resolves a non-zero rim (`--glass-material-rim` painted) + a non-`none` `--glass-shadow-*` + a border α ≥ 8% warm-ink | the `box-shadow:none` / 5%-ink trigger |
| F4 | **no-flat-glass** — a `.glass-*` element with no `.paper-field` ancestor in the demo DOM is a FAIL (the precept made executable) | any current flat-page glass demo |

The π arm (`tests-visual/no-gray.spec.ts`) samples the LIVE composite over the real field in both modes
— the binding paint. The existing `WARM_PLATE_FLOOR`, hue gates, KEEP-NEUTRAL byte-asserts, and AA
re-ratification arms are **UNTOUCHED** (the field + edge are additive layers; the plate L is unmoved,
so every AA pair re-ratifies). This closes the source-green/visually-broken hole for good: the gate now
verifies the *relationship*, not just the plate.

---

## 7 — MOTION + CROSS-ENGINE + A11Y (the lens carve)

- **Field drift** — compositor-only `transform`/`@property` on a fixed layer, 38s `linear`, both
  engines, PRM → static warm. No JS, no GL, no offscreen worry (full-bleed, browser skips occluded).
- **Liquid-weight un-regressed** — the field is a backdrop; the glass-reveal bloom, press-squish, and
  spring register are untouched. The dropdown still blooms via `.glass-reveal` (verified wired). The
  field's *drift* carries the universal liquid-weight ambiently (the backdrop breathes).
- **Cross-engine (the hard gate)** — NO `backdrop-filter:url`, NO SVG goo in the material path. The
  field is CSS gradients + transform; the lens is `backdrop-filter: blur() saturate()` (WebKit since
  9/14); the edge is `box-shadow` + border. Every leg renders identically in Chromium and WebKit. The
  goo/meatball stays where it belongs — the dock-fission viz, sRGB static-SVG, never the material floor.
- **A11Y / AA** — plate L unmoved → every contrast pair re-ratifies (light fg 14.8:1, muted 4.6:1; dark
  fg 8.9:1). The warm field is *behind* the glass, never behind text directly — text sits on the plate.
  The defined-edge floor doubles as the `prefers-reduced-transparency` legibility anchor (§4).
- **`prefers-reduced-transparency`** — `--glass-level → 0` collapses the lens to solid warm `--card`
  over the (still warm, static) field; the edge floor keeps it a discrete control. Warm-cream, never
  gray, even with transparency off.

---

## 8 — THE DELTA-ASSAY → WAVE AMENDMENTS (reconciled against the 116 union waves)

This is a **UNION amendment to the landed `W-GLASS-ABROGATE-GRAY`**, not a new parallel wave. It lands
the two legs that wave HELD. No dup against the union waves (the dock-deep-transmit / aurora waves are
GPU viz fields for *specific* routes; this is the calm CSS field for *every* demo — orthogonal).

| amendment | what | composes |
|---|---|---|
| **W-GLASS-FIELD** (augments W-GLASS-ABROGATE-GRAY, Leg b) | `@utility paper-field` in `paper.css` + mount in `AppShell.vue` demo chassis + every standalone glass demo | the existing `paper-underpaint` + `--neutral-0` floor; 0-JS, both-engine |
| **W-GLASS-EDGE-FLOOR** (augments W-GLASS-ABROGATE-GRAY, Leg c) | wire `--glass-material-rim` + `--glass-shadow-*` onto control/wash rungs; lift the control border floor 5%→8–10% warm-ink | the existing `--glass-rim-*` / `--glass-shadow-*` / `glass-fx.css` tokens — no new token |
| **W-NO-GRAY gate ext** (augments `proof:no-gray`, §6) | F1–F4 field/composite/edge/no-flat-glass asserts + π over the real field, both modes | the existing `WARM_PLATE_FLOOR` + roster — extend in place |

**HELD / FROZEN (the union discipline):** the triumvirate's `--card`/`--glass-saturate-*`/dark-arm
tokens (byte-untouched — they ARE Leg a); the alpha + radius + tint-seam ladders; the `--surface-tint-*`
in-srgb fence; the spring/clock motion tokens; `--neutral-0` stays the KEEP-NEUTRAL *solid* floor
(decoupled from the field, never deleted). **No legacy, no alias, no dual path** — the field + edge are
additive layers on the existing composite; the lens leg is the triumvirate's, unmodified.

---

## 9 — WHY THIS IS THE GESTALT FIX (not a workaround, not a re-fork)

- **It cures the recurring gap structurally.** Every prior round fixed the plate and the surface stayed
  gray, because the field was flat. Make the field a mandatory warm layer and gray is *impossible by
  construction* — the lens has warmth to transmit and an edge to read as a shape.
- **It is a deft UNION.** Leg a = the landed triumvirate tokens, byte-untouched. Legs b/c = two small
  primitives composing `paper-underpaint`, `--glass-rim-*`, `--glass-shadow-*`, `--neutral-0` — all
  extant. One new utility, one wiring pass, one gate extension. KISS, DRY, no re-fork.
- **It is cross-engine + perf-first by design.** CSS gradients + compositor transform + `backdrop-filter:
  blur()saturate()` — identical in Chrome and Safari, one GPU channel for the field, zero JS, PRM-static.
  The GPU viz (aurora/goo) stays route-scoped; the material floor is cheap CSS everywhere.
- **It answers the brief's five KEY questions:** (1) the warm floor HOLDS at the plate but the *page*
  resolves wrong (C 0.0029 H 84.6° `--neutral-0`) — the field decouples + fixes it; (2) glass IS
  transmissive but had nothing warm to transmit — the field gives it warmth; (3) glass-first is NOT
  over-reached — the control needed its EDGE, not less glass; (4) the colorful field was MISSING on
  `/foundations/intro` (0 fields, 24 glass) — now mandatory + gated; (5) AA holds (plate L unmoved).
- **The gestalt is the bar.** As a user, in both modes: a warm-cream lens drifting over a warm field,
  edged and lifted — luminous material, never a gray plate. That is the close.
