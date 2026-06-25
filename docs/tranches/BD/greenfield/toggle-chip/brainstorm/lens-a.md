# TOGGLE-CHIP — lens-a (PURE iOS-27 FIDELITY greenfield)

> The CHIP family — `ToggleChip` (chip · cell) + `SelectableChip` + `IconChip` (+ the
> `toggle-group`) — re-imagined from first principles as ONE congruent, rounded, warm-glass
> register. The user's verbatim: *"none of these are styled CONGRUENTLY — should be more
> ROUNDED and GLASSY."* The lens: the canonical iOS-27 segmented/filter chip — a stadium
> pill that is a warm-glass lens at rest, a tonal-flooded lens when on, with a weighty liquid
> on↔off transition. **A UNION** with `.accent-tone` + the tabs `.glass-capsule` register;
> no re-fork, no fourth chip recipe. KISS: the family shares ONE recipe + ONE size axis.

---

## 0. SOURCE-VERIFIED status quo — the honest live read (the bar to BEAT, not anchor on)

Grep of `src/` + a **painted-pixel** interrogation of `/forms/toggle-chip` +
`/forms/selectable-chip` in Chrome, light mode, 2026-06-24 (getComputedStyle for geometry;
the bg/field read is the REAL composite over the actual flat page — see the gate caveat §8).

### 0a. CONGRUENCE — the verdict is the user's: a mismatched grab-bag

| variant (live sample) | radius | padding | idle bg | active bg | glass? |
|---|---|---|---|---|---|
| `ToggleChip` **chip** | **4px** (`rounded-sm`, reads SQUARE) | `2px 8px` | `--accent-fill` warm 8% | `--accent-band` 18% | flat, no lens |
| `ToggleChip` **cell** | **0px** (`rounded-[0.625rem]` NOT resolving — broken) | `10px 8px` | transparent | `--accent-band` | flat, no lens |
| `SelectableChip` **md** | `6px` (`rounded-md`) | `12px·4px` | `--accent-fill` | `--accent-band` | flat, no lens |
| `SelectableChip` **lg** | **9999px** (pill) | `4px` | `--accent-fill` | `--accent-band` | flat; selected reads **GRAY** |
| `IconChip` | **9999px** (pill) | n/a (size-driven) | tone-mixed plate | n/a (not a toggle) | bloom/duotone, own CSS |

**Three families, FIVE radii (0 / 4 / 6 / 9999), THREE padding languages, ZERO shared glass
lens.** The pill rung (`lg`, `IconChip`) is already stadium — the chip/cell/md rungs are
square rounded-rects. The user's "more ROUNDED" is literally true: the small rungs are
4–6px square. The `cell` variant's `rounded-[0.625rem]` arbitrary value computes to **0px**
live (a real defect). This is the verbatim "not styled congruently."

### 0b. GLASSY — the §3 BOTH root causes, confirmed PAINTED

- **#1 flat-field.** Live: `paper-field` count = **0** on both chip routes. The chips sit over
  `rgb(251,250,248)` (the flat cream-gray `--neutral-0`, OKLab **C 0.0029**, near-achromatic).
  *A warm-tinted fill over a flat cool page composites toward gray* — exactly the glass-material
  GOLDEN §0 diagnosis. The `lg` selected "Recent" pill reads visibly **gray**, not warm.
- **#2 dormant tint / no lens.** Every chip variant paints a SOLID `color-mix` fill
  (`--accent-fill`/`--accent-band`) — **no `backdrop-filter`, no rim, no shadow**. The chip is
  a flat tinted rectangle, not a *lens*. There is no warm-glass register on any chip: the
  `.glass-capsule` material (tabs GOLDEN) is NOT consumed. `--glass-tint-strength` is dormant
  because there is nothing behind to transmit.

**Verdict: the FIT parts** — `.accent-tone` (the contrast-floored 3-channel tonal register,
`src/styles/glass/accent-tone.css`, verified) is a genuinely good colour spine; the reka
`Toggle` semantics (`aria-pressed`, keyboard) are correct; `useAccentTone` (the value.js
contrast-safe ink) is sound. **The BROKEN parts** — the radius/padding grab-bag, the
`rounded-[0.625rem]→0px` cell defect, the absent glass lens, the no-field gray composite.
**The WEAK part** — the on↔off transition is a `--duration-fast` colour cross-fade with a
scale-press; no liquid WEIGHT, no cartoon punch. GREENFIELD **refines** `.accent-tone`,
**re-invents** the geometry into ONE pill register + ONE size axis, **unions** the
`.glass-capsule` lens onto the chip, and **mints** the weighty on↔off transition.

---

## 1. THE GOLDEN IDEA — one sentence

**A chip is a stadium-pill warm-glass LENS whose tonal identity floods through it on toggle:**
the whole family (chip · cell · selectable · icon) composes ONE recipe — `.glass-chip` =
`.glass-capsule` (the tabs warm-transmissive lozenge, transmitting `.paper-field` warm both
modes) × `.accent-tone` (the contrast-floored tonal channels) — on the `--radius-control`
STADIUM, with ONE size axis (`sm · md · lg` → height/padding/text on a φ ladder), and the
on↔off flip rides the Band-0 `--ease-cartoon-punch` so the tonal flood **anticipates,
overshoots, and settles** with real liquid weight. Selection is a tonal flood through a warm
lens, not a flat rectangle swap.

```
┌─ GEOMETRY ─ ONE pill register: --radius-control STADIUM + ONE φ size axis (sm·md·lg)   ← ALL four
├─ MATERIAL ─ .glass-capsule warm lens (transmits .paper-field) × .accent-tone tonal flood ← chip·cell·selectable
├─ MOTION ─── on↔off tonal flood on --ease-cartoon-punch (anticipate→overshoot→settle)    ← chip·cell·selectable
└─ COMMIT ─── a one-shot accent-bloom ::after on toggle-ON (the .glass-capsule flood)      ← opt-in
```

---

## 2. GEOMETRY — "more ROUNDED": the STADIUM, golden-laddered (§L6)

The user wants rounder. The library already has the answer and the small rungs simply do not
consume it: **`--radius-control: var(--radius-pill)`** (`theme/radius.css:56`, verified) — the
BC.W-CONTROL-SMOOTH decision that *"the small-inline-control corner rung is a STADIUM, not a
fixed small px… the radius SCALES with the control (clamped to half-height)."* The pill clamps
to half-height on a short box → a true end-cap at EVERY size. This is the iOS-27 chip
silhouette exactly.

**The fix is DRY and already-decided: every chip rung resolves `--radius-control` (= stadium
pill).** This retires `rounded-sm` (chip), the broken `rounded-[0.625rem]` (cell), and
`rounded-md`/`rounded-lg` (selectable `sm/md`) in ONE rung. The `lg`/`IconChip` already-pill
rungs are unchanged (no regression). The `cell` (square icon+label TILE) is the ONE exception —
it keeps `--radius-card` (the large glass surface squircle, `theme/radius.css:105`
`--corner-shape-card: round` at small, so it stays round) because a 56px square tile is a
*card*, not an inline pill — but it now composes the SAME `.glass-chip` material + motion. One
geometry language, one documented exception.

**The φ size axis (§L6 golden proportion)** — ONE axis the whole family shares, height-driven
so the pill clamps proportionally. The rung heights climb the √φ rung (φ ≈ 1.618, √φ ≈ 1.272):

| rung | height | px pad-x | text | tap floor |
|---|---|---|---|---|
| `sm` | 28px | `--radius-control` → 14px end-cap | `--text-caption` | hit-slop to ≥44px (§L3 `tap-floor`) |
| `md` | 36px (28·√φ·…) | stadium | `--text-small` | ≥44px effective |
| `lg` | 44px | stadium | `--text-base` | native ≥44px |

Pad-x derives from height × 1/φ (the golden inset), so the pill reads balanced at every rung
(the iOS chip's pad-x ≈ 0.6× its height). The `cell` TILE is `--radius-card` at a √φ-square
footprint. **One size axis, golden by construction** — the `selectableChipVariants` `size` and
the `toggleChipVariants` `variant` collapse into ONE shared `chipVariants({ size, shape })`.

---

## 3. MATERIAL — "GLASSY": the warm-glass LENS, both root causes fixed

### 3a. The chip becomes a `.glass-capsule` lens (union, not a fourth recipe)

The chip's idle/active fill is TODAY a solid `color-mix` rectangle. GREENFIELD makes the chip a
**warm-transmissive lens** by composing the tabs GOLDEN register verbatim:

```
.glass-chip  ≙  .glass-capsule          /* warm lifted lozenge: --glass-bg-floating-tinted */
              + .glass-capsule-hover     /* specular catch-light + scale on hover, press-snap */
              + .accent-tone             /* the tonal channels — idle fill / active band / ink */
```

`.glass-capsule` (tabs GOLDEN §2b) brings the W55 `--glass-bg-floating-tinted` adaptive fill
(warm both modes, never gray), the six-layer composite (`--glass-rim-top` catch-light +
`--glass-rim-bottom` under-shadow + `--glass-shadow-floating` lift + `--glass-blur-floating`),
on `--radius-pill`. **The chip stops being a flat tinted rectangle and becomes a lifted warm
lens.** This is the user's "GLASSY" — the same register the tabs/buttons/cards consume, ZERO
new material (DRY; ≥4th consumer of `.glass-capsule`, clears the overfitting bar).

The tonal channels compose ON the lens — the two seams are designed to coexist (accent-tone.css
header: *"the rim from `--glass-accent`, the fill from `--accent-tone`… they COMPOSE on a chip
that is both a glass surface and a tonal control"*). The chip is exactly that union:

- **IDLE (off)** — `.glass-capsule` warm lens at the QUIET tier (low lift) + `--accent-fill` as a
  faint tonal wash bled INTO the glass fill (`color-mix(in oklab, var(--glass-bg-floating-tinted),
  var(--tone) var(--accent-fill-strength))`), floored ≥3:1. A legible, warm-glass, faintly-toned
  pill. The tonal hue tints the GLASS, not a separate opaque layer.
- **ON (selected)** — the lens lifts to the FLOATING tier (more `--glass-shadow-floating`, brighter
  `--glass-rim-top`) AND the `--accent-band` floods the fill + `--accent-edge` lights the rim +
  the contrast-safe `--accent-ink` label. The selected chip *lifts off the field as a lit, tonal,
  warm-glass lozenge* — the iOS-27 selected-chip read.
- **HOVER** — `.glass-capsule-hover`: `--glass-specular: 0.14` catch-light + `scale: 1.015` lift
  (the "ready to receive" read, currently absent on chips).

### 3b. Root cause #1 — the FIELD behind (the no-gray prerequisite, glass-material GOLDEN leg b)

A lens transmits a field; **the chip routes have NO field** (live: 0 `.paper-field`). The chip's
warm lens composites to gray over the flat page exactly as the glass-material GOLDEN proved. The
fix is NOT a chip change — it is the **demo-chassis `paper-field` contract** (glass-material
GOLDEN §3, `W-GLASS-FIELD`): the chip demo routes mount `.paper-field` (warm-amber → terracotta →
sand plenum) so the chip lens has a warm field to transmit. The chip greenfield **depends on**
`W-GLASS-FIELD`; it does not duplicate it. Over the field, the chip's `saturate(1.4–1.6)`
concentrates the warm chroma → the chip reads warm-glass, not gray.

### 3c. Root cause #2 — the TRANSMITTED-through inset:0 (select-forms GOLDEN), not a halo

The chip's tonal fill must be a field-transmitted lens, not an opaque halo painted over the
field. The chip's `.glass-capsule` `backdrop-filter` sits on the chip's OWN layer (the §L1
"glass cannot sample glass" trap avoided — the chip is OVER the field, not nested in another
blur). The accent flood (§4) is an `inset:0` `::after` INSIDE the lens (transmitted-through, the
select-forms idiom), `border-radius: inherit`, `mix-blend-mode: plus-lighter` — additive over
the warm fill, never a separate opaque plate that would re-introduce the flat read. The edge is
the `.glass-capsule` `--glass-rim-top` + `--accent-edge` on ON — a DEFINED edge (glass-material
leg c), so the chip reads as a discrete shape even over a flat-page fallback.

### 3d. The OKLab warm-not-gray read (both modes)

Over `.paper-field`, the chip lens composited OKLab must read **C ≥ 0.018 warm** (H ∈ [45,85]) —
the glass-material F2 bar. Light: the warm `--glass-bg-floating-tinted` × `--accent-fill` over the
amber field. Dark: the warm-dark field (L 0.28–0.34) glows through the warm-dark plate — luminous,
never charcoal. This is gate-locked (§8) as a REAL painted-pixel read over the REAL field — NOT a
getComputedStyle parse over a hardcoded purple (the §8 fraud fence).

---

## 4. MOTION — the on↔off tonal flood, LIQUID & WEIGHTY (Band-0 `--ease-cartoon-punch`)

Today the toggle is a `--duration-fast` colour cross-fade + a scale-press. GREENFIELD makes the
**state flip a liquid event** on the Band-0 cartoon-punch register (minted by tabs GOLDEN §3a as
the §L2/§L4 substrate — `--ease-cartoon-punch` + `--motion-weight: 0.62`; the chip CONSUMES it,
does not re-mint).

**The 3-beat tonal flood (on the ONE existing `scale` write + a registered flood scalar):**

1. **Anticipation** — on toggle-ON the chip dips a hair (the `--ease-cartoon-punch` pre-dip < 0,
   scaled by `--motion-weight`) — the recoil-back before the flood. The curve carries it; no JS.
2. **Flood + overshoot** — the `--accent-band` floods the fill while the lens area over-inflates
   to ~1.06× (a `--chip-flood-t` registered scalar driving a `scale` + the `::after` bloom) — the
   tonal colour *washes through the lens* bigger than its footprint, then…
3. **Settle** — the punch curve's ζ<1 give lands the chip soft at 1.0, tonal fill resolved, rim
   lit, ink crisp. The OFF→ON is a flood-in; ON→OFF is the inverse (flood drains, lens calms),
   NO overshoot-past-gone.

```css
@property --chip-flood-t { syntax: "<number>"; inherits: false; initial-value: 0; }

.glass-chip {
  /* the ONE scale write — press × the on-flood overshoot, volume-preserving, center-pinned */
  scale: calc(1 + 0.06 * var(--chip-flood-t) * var(--motion-weight));
  transform-origin: center;
  transition: scale var(--ease-cartoon-punch-duration) var(--ease-cartoon-punch),
              background-color var(--duration-fast) var(--ease-standard),
              border-color var(--duration-fast) var(--ease-standard),
              color var(--duration-fast) var(--ease-standard);
}
.glass-chip[data-state="on"] { --chip-flood-t: 1; }
@media (prefers-reduced-motion: reduce) { .glass-chip { --motion-weight: 0; transition: none; } }
```

The flood `::after` (the COMMIT layer, §4 of tabs GOLDEN, parameterized) blooms the `--accent-band`
through the lens a beat AFTER the colour settles (EFFECTS-trails-SPATIAL), then clears — the iOS-27
selected-chip "ink-flood" T4 read at chip scale. **PRM → `--motion-weight: 0`** zeroes
anticipation + overshoot + bloom in ONE assignment; the colour still cross-fades (selection always
legible), the lens lift (static) remains. **No second spring, no rAF, no `@keyframes`** — the punch
curve + the registered scalar carry the whole envelope, compositor-only (Chrome == Safari).

### The toggle-GROUP (the exclusive-selection sibling)

The `toggle-group` (the reka `ToggleGroup` wrapper) gets the SAME `.glass-chip` children +,
optionally, the tabs `useTabIndicator` GLIDING indicator when `type="single"` (a single-select
chip group IS a segmented control — the indicator travels between chips with the 5-beat liquid
punch). This is a DEFT union: a single-select chip group becomes the SegmentedTabs register with
chip children, ZERO new engine. Multi-select groups keep per-chip flood (no traveling indicator —
multiple can be on). The chip family and the tab family converge on ONE motion soul.

---

## 5. THE UNION LEDGER (deft · KISS · DRY — no re-fork)

| need | reused primitive (verified on disk) | new surface |
|---|---|---|
| tonal colour identity | `.accent-tone` (`glass/accent-tone.css`) + `useAccentTone` | bleed `--accent-fill` INTO the glass fill (the union mix) |
| warm-glass lens | `.glass-capsule` + `.glass-capsule-hover` (tabs GOLDEN) | chip composes it (≥4th consumer) |
| stadium radius | `--radius-control` (`theme/radius.css:56`, = pill) | every rung resolves it (retires 4 ad-hoc radii) |
| the field behind | `.paper-field` (glass-material GOLDEN `W-GLASS-FIELD`) | chip routes mount it (chassis contract) |
| weighty flip | `--ease-cartoon-punch` + `--motion-weight` (tabs GOLDEN Band-0) | `--chip-flood-t` registered scalar + the 3-beat |
| reka semantics | `Toggle` / `ToggleGroup` (`aria-pressed`, roving tabindex) | UNCHANGED |
| traveling indicator (single-select group) | `useTabIndicator` (SegmentedTabs) | opt-in on `toggle-group type=single` |
| size axis | the φ ladder (§L6) | ONE `chipVariants({ size, shape })` replaces 2 CVAs |
| commit bloom | `.glass-capsule` `::after` flood (tabs GOLDEN §4) | parameterized on the chip, opt-in |

**ONE recipe (`.glass-chip`), ONE size axis, ONE motion register.** `toggleChipVariants` +
`selectableChipVariants` COLLAPSE into one `chipVariants` (clean break, no alias — the no-legacy
law). `ToggleChip` / `SelectableChip` / the cell remain DISTINCT SFCs (distinct ergonomics — bool
toggle vs tonal picker vs icon tile) but render the SAME class register. `IconChip` keeps its own
CSS (it is a non-toggle decorative glyph plate) but adopts `--radius-control` + the `.glass-capsule`
lens for visual congruence. No fourth chip, no parallel glass fork.

---

## 6. CROSS-ENGINE (Chrome + Safari) — §L7

Every channel is compositor-only + Safari-native by construction:
- **Lens fill** — `.glass-capsule` `backdrop-filter: blur() saturate()` on the chip's OWN layer
  (WebKit since 9); the chip is OVER the field, not nested in a blur.
- **Stadium radius** — `border-radius: 9999px` clamp: cross-engine.
- **Flood / overshoot** — `scale` on the chip's own box + `@property --chip-flood-t` interpolation
  (Safari-26 Baseline; `initial-value: 0` is the safe rest on a gap engine — slides without flood,
  never broken).
- **Accent bloom `::after`** — `plus-lighter` blend + opacity: Safari-safe, sRGB.
- **NO `backdrop-filter:url`, NO SVG goo, NO WebGL** — the chip is a CSS lens, not a metaball. The
  goo/meatball register is the disjoint dock-fission viz; the chip never touches it.

Acceptance is a **paired-engine π** (chromium + webkit), both light/dark, never `reducedMotion`
on the flood arm.

---

## 7. A11Y / PRM carve

- **PRM `reduce`** → `--motion-weight: 0` zeroes anticipation + overshoot + bloom; the colour
  cross-fade + the static lens lift remain (selection always present + legible). Vestibular-safe.
- **`prefers-reduced-transparency`** → `.glass-capsule` falls to the opaque-tier escape (the
  `--glass-level` machinery); the lens goes solid warm, the `--accent-edge` rim + `--accent-fill`
  keep the chip a discrete, toned shape. Warm-cream, never gray, transparency off.
- **`prefers-contrast: more`** → the `--accent-edge` rim α + the rim catch floor UP; the
  `--accent-ink` is already value.js contrast-safe (`useAccentTone`).
- **Semantics UNTOUCHED** — reka `Toggle`/`ToggleGroup` `aria-pressed` + roving tabindex +
  keyboard are the contract; this is a surface/motion layer.
- **Tap target** — every rung hit-slops to ≥44px (§L3 `tap-floor`); `lg` is native 44px.
- **Focus** — `.focus-ring` (verified `utilities/base.css`) composes `--focus-ring-shadow` on
  `:focus-visible`, unchanged.
- **Contrast floor** — `.accent-tone`'s idle `--accent-fill` ≥3:1 floor is PRESERVED; over the warm
  glass fill the floor is re-measured (the union mix must not drop the idle below 3:1 — a gate arm).

---

## 8. THE GATE (born-RED — the HONEST painted read, the fraud fence)

`tests-visual/glass-chip.spec.ts`, **chromium + webkit**, both modes, over the LIVE `.paper-field`.
The chroma arm is a **REAL screenshot pixel read** of the actual chip over the actual page —
NOT `getComputedStyle` composited over a HARDCODED field (the recurring fraud: parse-oklab-as-sRGB
over a hardcoded purple → a gray chip passes). A born-RED reporting the HONEST gray over today's
NO-field flat page is CORRECT.

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **C1 congruence** | `ToggleChip.chip`, `SelectableChip.md`, the `lg` row resolve the SAME computed `border-radius` (all = `--radius-control` stadium) + the SAME pad ratio + the SAME `.glass-capsule` fill token | 4px vs 6px vs 9999px today | the family shares one recipe |
| **C2 rounder** | every chip rung's radius clamps to half-height (a true stadium end-cap), not a 4–6px square corner | the 4px chip / 0px cell | `--radius-control` everywhere |
| **C3 GLASSY (painted)** | the chip lens SCREENSHOT-sampled over the REAL `.paper-field` reads OKLab **C ≥ 0.018 warm** (H ∈ [45,85]), BOTH modes; a `.glass-*` chip with NO `.paper-field` ancestor is a FAIL (F4) | the gray composite over today's 0-field flat page | the field mounts + the lens transmits |
| **C4 defined edge** | the chip carries a non-flat rim (`.glass-capsule` `--glass-rim-top` / ON `--accent-edge`) + a non-`none` lift cast — a cut shape, not a cream smudge | the flat tinted rectangle | the lens composites |
| **C5 weighty flip** | toggle-ON: the chip center pre-dips OPPOSITE then the area overshoots ≥1.04× then settles to 1.0 (frame-series); a `--motion-weight:0` control shows zero pre-dip/overshoot | the colour-only cross-fade | the cartoon-punch flood |
| **C6 idle floor** | the union idle fill (`--accent-fill` bled into the glass) re-measures ≥3:1 over the lens | — (preserve) | the floor holds post-union |
| **C7 PRM** | one static frame at rest, no overshoot/bloom, colour + lens-lift present | — | `--motion-weight:0` carves cleanly |

**Detector self-test bites:** a chip reading `getComputedStyle` over a hardcoded field (not a
screenshot) RED (the fraud fence); a 4px/6px square radius surviving RED; a chip with no
`.paper-field` ancestor RED; the cell's `rounded-[0.625rem]→0px` defect RED; a flood firing WITH
(not after) the colour leg RED; a `--motion-weight:0` killing anticipation RED; a gray chip
(`meanChroma < 0.018`) over the real field RED.

> **The born-RED truth, stated honestly:** TODAY, on the real flat-page routes (0 `.paper-field`),
> the chip composites GRAY. The gate is born-RED on C1–C5 on HEAD. This is not a failure to hide —
> it is the HONEST read of the current flat condition, and it goes GREEN only when the field mounts +
> the lens + the stadium + the punch land TOGETHER (the glass-material §3 RELATIONSHIP, at chip scale).

---

## 9. THE SPIKE (de-risk the boldest mechanism, throwaway, greenfield-dir)

`brainstorm/spike.html` (to build at golden synthesis) mirrors the EXACT shipping write — the
`.glass-chip` = `.glass-capsule` × `.accent-tone` union over a warm `.paper-field`, the on↔off
`--chip-flood-t` flood on `--ease-cartoon-punch`, the stadium pill at three φ rungs — and reads
back: (1) all rungs share the stadium radius; (2) the chip lens over the field reads OKLab
C ≥ 0.018 warm both modes (the painted gate, not a parse); (3) the on-flip pre-dips then overshoots
≥1.04× then settles to 1.0; (4) `CSS.supports` confirms `backdrop-filter: blur() saturate()` +
`@property` — no `backdrop-filter:url`, no SVG. Proves the union renders + composes warm BEFORE any
`src/` change.

---

## 10. DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the 116-wave set; no dup vs tabs/buttons)

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **W-CHIP-CONGRUENT** | collapse `toggleChipVariants` + `selectableChipVariants` → ONE `chipVariants({ size, shape })`; every rung resolves `--radius-control` (stadium) + the φ size axis; `ToggleChip`/`SelectableChip`/cell render the shared register; `IconChip` adopts `--radius-control` + the lens | C1·C2 | NEW — the chip-family geometry/recipe unification; no tab/button overlap |
| **W-CHIP-GLASS-LENS** | `.glass-chip` composes `.glass-capsule` + `.glass-capsule-hover` + `.accent-tone` (the union mix bleeding `--accent-fill` into the glass fill) | C3·C4·C6 | DEPENDS-ON tabs `.glass-capsule` (consume, not re-fork); DEPENDS-ON glass-material `W-GLASS-FIELD` (chip routes mount `.paper-field`) — no dup, a CONSUMER of both |
| **W-CHIP-FLOOD-PUNCH** | the on↔off tonal flood on `--ease-cartoon-punch` + `--chip-flood-t` registered scalar + the opt-in `::after` accent-bloom (EFFECTS-trails-SPATIAL) | C5·C7 | CONSUMES tabs Band-0 `--ease-cartoon-punch`/`--motion-weight` (no re-mint); distinct from the tab indicator (a per-chip flood, not a traveling indicator) |
| **W-CHIP-GROUP-INDICATOR** (opt-in) | `toggle-group type=single` adopts `useTabIndicator` (a single-select chip group = a segmented control with chip children) | tab gate | CONSUMES `useTabIndicator`; multi-select keeps per-chip flood (no indicator) |

**HELD / FROZEN (union law):** `.accent-tone` channels + strengths (byte-untouched — the colour
spine is FIT); `useAccentTone` + value.js ink; the reka `Toggle`/`ToggleGroup` semantics;
`--radius-control` (consume, don't re-mint); `.glass-capsule` (consume from tabs); `.paper-field`
(consume from glass-material); `--ease-cartoon-punch`/`--motion-weight` (consume from Band-0). The
chip greenfield is a CONSUMER of four landed/specced registers + ONE new union recipe + ONE
collapsed CVA. **No legacy, no alias, no fourth chip, no parallel glass fork.**

---

## 11. ACCEPTANCE (the gestalt bar — live-judge AS A USER, both modes, both engines)

On a FRESH capture of `/forms/toggle-chip` + `/forms/selectable-chip`, BOTH modes AND both engines:

1. **CONGRUENT** — chip · cell · selectable · icon read as ONE family: same stadium radius, same
   pad rhythm, same warm-glass lens, same tonal language. No grab-bag. [C1]
2. **ROUNDED** — every chip is a true stadium pill (half-height end-caps), not a 4–6px square. [C2]
3. **GLASSY (painted)** — the chip is a warm-transmissive LENS over a visible warm field; the
   selected chip lifts off the field as a lit tonal lozenge; NO chip reads gray. [C3·C4]
4. **WEIGHTY** — the on↔off flip anticipates, the tonal colour FLOODS through the lens with
   overshoot, and settles soft. Liquid, not a snap. [C5]
5. **Both modes** warm-luminous; dark GLOWS through the lens, never charcoal.
6. **A11y intact** — `aria-pressed` + keyboard + ≥44px tap + ≥3:1 idle + value.js-safe ink; PRM
   carves to a legible static chip.
7. **No-legacy / DRY** — ONE recipe, ONE size axis, ONE motion register; consumes four extant
   registers; zero fork.
