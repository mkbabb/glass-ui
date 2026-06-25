# TOGGLE-CHIP — lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> GREENFIELD redesign of **the CHIP family** — ToggleChip (`chip`/`cell`) +
> SelectableChip (`sm`/`md`/`lg`) + IconChip + the toggle-group — through the 1940s-
> technicolor FLOW & PUNCH lens. The user's verbatim: *"/forms/toggle-chip — none of
> these are styled CONGRUENTLY — should be more ROUNDED and GLASSY."* The fix is DRY:
> ONE shared chip register across the family, **welded onto the already-greenfielded
> `.glass-capsule` (tabs GOLDEN) + `.accent-tone` (live) + `--ease-cartoon-punch`
> (Band-0)** — a UNION, never a fork. TRANCHE-DEV only; the spike is the de-risk.
>
> Every cited token/composable was grep-verified on disk (§0). The born-RED is a
> **live painted-pixel composite over the real flat page** (§0) — NOT getComputedStyle
> over a hardcoded field (the fenced fraud).

---

## 0. THE HONEST BORN-RED — live-interrogated, both the computed census AND the painted pixel

Live `/forms/toggle-chip` + `/forms/selectable-chip`, chrome-devtools, real `getComputedStyle`
+ the **honest composite of each chip's live `background-color` over the live `elementFromPoint`
backdrop pixel** (the fenced no-fraud method). Light mode measured; dark sampled.

### 0a. CONGRUENCE — a radius/glass GRAB-BAG (the user's #1 complaint, confirmed)

| variant | radius (computed) | padding | height | backdrop | box-shadow | verdict |
|---|---|---|---|---|---|---|
| **ToggleChip `chip`** | **4px** (`rounded-sm`) | `2px 8px` | 24px | **none** | **none** | flat rect, sharpest corner |
| **ToggleChip `cell`** | **10px** (`0.625rem`) | `10px 8px` | 56px | none | none | square-ish card |
| **SelectableChip `sm`** | **4px** | `2px 8px` | ~22px | none | none | — |
| **SelectableChip `md`** | **6px** | `4px 12px` | 32px | none | none | — |
| **SelectableChip `lg`** | **10px** | `6px 16px` | 37px | none | none | — |
| **IconChip** | **9999px** (`--radius-pill`) | — | 48px | none | (plate only) | the ONLY round one |

**Five different radii across one family — 4px / 6px / 10px / 0.625rem / pill — and a
ZERO-glass register everywhere** (`backdrop-filter: none`, `box-shadow: none` on every
chip). The user is exactly right: there is no shared chip recipe. IconChip is pill; the
toggle/selectable chips are squared rounded-rects; the cell is a square card. Padding,
font-weight (idle 400 / active 500), and text-size each track a *separate* per-variant CVA
literal. **It is a mismatched grab-bag, not a register.**

### 0b. GLASSY — the §3 BOTH root causes, painted-pixel honest

Composited each chip's live fill over the live page pixel, oklab chroma read (warm-floor = C ≥ 0.02):

| chip | state | composited oklab C | warm-not-gray? |
|---|---|---|---|
| React | **on** (band) | **0.027** | yes (just clears) |
| Svelte | **on** | **0.044** | yes |
| Qwik | **on** | **0.032** | yes |
| Vue | **off** (idle fill) | **0.018** | **NO — gray** |
| Solid | **off** (idle fill) | **0.013** | **NO — gray** |
| Angular | off | 0.0275 | borderline |

- **Root #1 (flat-field — needs the field behind).** The chips sit on the flat warm-cream
  page; there is **no colorful field transmitted through** them — they are opaque tinted
  paint, not glass. `backdrop-filter: none` everywhere: the §3 "COLORFUL FIELD behind glass"
  is structurally absent. A chip cannot read transmissive-warm because nothing transmits.
- **Root #2 (`--glass-tint-strength: 0%` dormant — needs the warm floor).** The **idle**
  `--accent-fill` at the `8%` strength desaturates toward gray over the warm-cream surface
  — the off-chips composite at **C 0.013–0.018, BELOW the 0.02 warm floor** (a born-RED gray
  at rest). The ACTIVE band is warm (C 0.027–0.044); the IDLE fill is the dormant-tint gray
  the §3 warm-floor exists to cure. The "warm read is FIELD-DEPENDENT" — the idle fill has no
  field to warm against and no floor to guarantee it.

**The chip family is NOT broken — it is INCONGRUENT, FLAT, and IDLE-GRAY.** The `.accent-tone`
register is fit (the active band is genuinely warm + contrast-safe ink). The fix is a UNION:
adopt the `.glass-capsule` material (so the chip becomes real transmissive glass with a field
behind it), unify the radius onto the stadium `--radius-control` ladder (the user's "more
rounded"), floor the idle tint warm, and ride the cartoon punch on the on↔off flip. **An
AUGMENT + UNIFY, never a rebuild.**

### 0c. MOTION — the on↔off flip is calm, no punch

Both ToggleChip + SelectableChip already ride the §6 `--spring-smooth` scale-lift on hover/press
(`scale-(--scale-hover-btn)` / `scale-(--scale-press-btn)`) — REAL but calm, ≤10% overshoot.
The **state transition** (off→on band swap) is a flat `background-color var(--duration-fast)
var(--ease-standard)` color-snap — **no anticipation, no overshoot, no weight**. The select
of a chip is a driver motion (the user's finger caused it) and per §L4 it must carry the
liquid weight — currently it does not.

---

## 1. THE GOLDEN IDEA (one sentence)

The chip family is **ONE warm-glass capsule recipe** — a transmissive `.glass-capsule` lozenge
on the stadium `--radius-control` rung, tinted by `.accent-tone`, with a warm idle FLOOR so it
is never gray — and selecting it is a **CARTOON PUNCH**: the chip *anticipates* (a real pre-dip
below rest), **over-inflates past its footprint as a squish-blob** while the accent band floods
in and the warm-cartoon under-shadow throws opposite the squish, then **settles and shrinks to
fit** with an overlapping glyph-pop — every channel compositor-only (Chrome == Safari), every
primitive a UNION with the shipped ecosystem (zero new component, zero new engine).

### The single boldest move — **THE CHIP THAT PUNCHES WHEN YOU PICK IT**

A chip is the smallest control in the library, and today it dies the flattest death: a color-
snap. The boldest move turns the **on↔off toggle into the cartoon-register keystone** — on
select, the chip plays the full 5-beat punch (anticipation pre-dip → over-inflate blob →
accent-flood wash → cartoon-shadow throw → shrink-to-fit + glyph-pop), and on de-select it
plays it **in reverse** (the shadow snaps back UNDER, the blob deflates inward, the flood drains).
A row of filter chips becomes a row of little technicolor pop-toys — each one *jubilantly*
commits and *reluctantly* releases — while staying golden-restrained at `--motion-weight: 0.62`
and one token (`--motion-weight: 0`) from dead-calm under PRM. **The same `.glass-capsule` +
`--ease-cartoon-punch` the tabs indicator rides, now miniaturized onto the toggle flip** — the
chip is the tab indicator's little sibling, and they finally read as one family.

---

## 2. THE MATERIAL LAYER — ONE chip register (`.glass-chip`), congruent + rounded + glassy

### 2a. The radius UNIFICATION — stadium `--radius-control` (the user's "more ROUNDED")

The grab-bag (4/6/10px) collapses onto the **already-shipped stadium rung** `--radius-control:
var(--radius-pill)` (theme/radius.css:56, BC.W-CONTROL-SMOOTH — *"the small-inline-control corner
rung is a STADIUM, not a fixed small px… a 16px control reads an 8px-radius pill — soft at every
size"*). This is the DRY win: the chip family adopts the SAME rung Checkbox + base Tabs already
sit on, so the whole control family reads ONE geometry. The inline chip + selectable chip become
**stadium pills** (radius clamps to half-height → a true end-cap at every size); the `cell`
variant — a large square glass TILE, not a small inline control — keeps `--radius-card` (the
`1rem` squircle, per the BC.W-CONTROL-SMOOTH carve that already exempts the card toggle tile).
IconChip is already pill — it now MATCHES by construction instead of by accident.

> Result: inline chips = stadium pill (rounder than any current variant), cell = soft squircle
> card, iconchip = pill. ONE radius language, the user's "more rounded" satisfied, the §L6
> concentric/φ proportion honored (the stadium is the φ-extreme rung).

### 2b. `.glass-chip` — the shared chip register (composes `.glass-capsule`, the tabs extract)

`src/styles/chip.css`, `@layer components`, ONE recipe, **≥3 consumers** (ToggleChip chip+cell,
SelectableChip, IconChip backplate) — clears the overfitting bar by construction. It **composes
the `.glass-capsule` family** the tabs GOLDEN extracts (the user's literal "glassy, like our
tabs facility") rather than re-forking a chip-glass:

```css
@layer components {
  /* The chip is a glass-capsule (transmissive warm lozenge) tinted by accent-tone. */
  .glass-chip {
    /* MATERIAL — the tabs extract: warm-transmissive lift, a real field BEHIND the glass */
    /* composes .glass-capsule (background: --glass-bg-floating-tinted; rim-top/-bottom;     */
    /* shadow-floating; blur-floating) — applied via @apply or class-compose at the SFC.     */

    /* GEOMETRY — the unified stadium rung (§2a) */
    border-radius: var(--radius-control);          /* stadium pill, soft at every size */

    /* TINT — the live accent-tone channels, but the IDLE fill now rides a WARM FLOOR (§2c) */
    background-color: var(--chip-fill);            /* idle: warm-floored accent-fill        */
    border: 1px solid var(--chip-edge);

    /* MOTION — the §6 lift register (kept) + the cartoon-punch flip leg (§3)               */
    transition:
      scale var(--spring-smooth-duration) var(--spring-smooth),
      background-color var(--duration-fast) var(--ease-standard),
      border-color var(--duration-fast) var(--ease-standard),
      color var(--duration-fast) var(--ease-standard);
    scale: 1;
  }
  .glass-chip:hover  { scale: var(--scale-hover-btn); }
  .glass-chip:active { scale: var(--scale-press-btn); }

  /* ACTIVE — the bolder band + active edge + contrast-safe ink (accent-tone, kept) */
  .glass-chip[data-state="on"] {
    background-color: var(--accent-band);
    border-color: var(--accent-edge);
    color: var(--accent-ink);
    font-weight: 500;
  }
}
```

The chip becomes a `.glass-capsule` whose FILL is the accent-tone tint instead of the neutral
floating-tinted plate — the two registers COMPOSE exactly as accent-tone.css §header documents
(*"the rim from `--glass-accent`, the fill from `--accent-tone`; they never fork"*). The
six-layer composite (rim-top catch-light + rim-bottom warm under-shadow + shadow-floating lift +
`backdrop-filter: blur` so the field transmits) is inherited from `.glass-capsule` — **that is
the "glassy" fix: a real transmissive plate with a field behind it, not opaque tinted paint.**

### 2c. The WARM IDLE FLOOR (§3 root #2 — cure the idle-gray)

The born-RED §0b: idle chips composite at C 0.013–0.018 (gray). The cure is the SAME pattern
the select-forms GOLDEN mints — a bounded warm admit-floor on the idle fill so it stays warm-
cream even with no vibrant field behind it:

```css
.accent-tone {
  /* RAISE the idle floor so the resting fill clears the 0.02 warm-floor over warm-cream.    */
  /* The live 8% desaturates to gray; floor the tone admixture so idle reads warm-not-gray.   */
  --accent-fill: color-mix(in oklab,
    var(--surface, var(--card)),
    var(--tone, var(--primary)) max(var(--accent-fill-strength), var(--chip-tint-floor)));
}
/* PLAIN per-mode pair — NEVER a light-dark() fragment (the binding inset-shadow trap). */
/* tokens/glass.css (light) */   --chip-tint-floor: 11%;   /* lifts idle composited C ≥ 0.02 */
/* tokens/dark-arm.css (dark) */ --chip-tint-floor: 14%;   /* dark needs more warm-lift       */
```

`max(strength, floor)` is a FLOOR not a clamp — a consumer who raises the global strength still
wins. This is a ONE-line widen of the EXISTING accent-tone recipe, not a new register. AND
because `.glass-chip` now has `backdrop-filter`, over a vibrant surface (an Aurora demo field)
the idle fill ALSO transmits the field's hue — the warm read becomes field-dependent-AND-floored:
floored over flat (the guarantee), vibrant over a field (the song). The §3 BOTH root causes
closed: field behind (the glass) + warm floor (the idle).

> **The honest gate note (the fenced anti-fraud):** the §0b idle-gray RED was measured by
> compositing the live fill over the REAL flat page, NOT by parsing oklab-as-sRGB over a
> hardcoded purple. A born-RED reporting C 0.013 over the real flat condition is CORRECT; the
> floor must move it ≥ 0.02 over that SAME real condition, re-measured the same way.

### 2d. Congruence by construction — the family now shares ONE recipe

| axis | before (grab-bag) | after (`.glass-chip` register) |
|---|---|---|
| radius | 4/6/10px + 0.625rem + pill | **stadium `--radius-control`** (cell = `--radius-card` squircle) |
| material | flat opaque tint, no glass | **`.glass-capsule`** transmissive six-layer, field behind |
| idle tint | gray (C 0.013–0.018) | **warm-floored** (C ≥ 0.02) |
| active band | warm accent-tone | warm accent-tone (kept) |
| ink | contrast-safe (kept) | contrast-safe (kept) |
| hover/press | §6 spring-smooth lift (kept) | §6 lift (kept) + glass specular (§2e) |
| size axis | 3 per-variant CVAs | ONE φ-padding ladder (§2f) |

### 2e. The glass HOVER register — `.glass-capsule-hover` (the tabs extract, adopted)

The chip adopts `.glass-capsule-hover` (the tabs GOLDEN's NEW glass-hover): a specular catch-
light lift (`--glass-specular: 0.14`) + the press-ready `scale: 1.015` on the fast bezier, +
`scale: 0.97` press-snap — so an idle chip *lifts a hint of glass* on hover (the iOS "ready to
receive" read) instead of color-snapping flat. DRY: the chip emulates the tabs hover the user
praised, via the SAME class buttons adopt.

### 2f. The size axis — ONE φ-padding ladder (§L6 proportion)

Collapse the three per-variant size literals onto a √φ padding ladder that shares its proportion
with the corner (the stadium clamps radius to half-height, so padding *is* the size dial):

```
sm: px-2.5 py-1   text-caption   (≈ base)
md: px-3.5 py-1.5 text-small     (≈ base·√φ)
lg: px-5   py-2   text-base      (≈ base·φ)
```

The tonal channels are size-invariant (accent-tone owns colour); the ladder scales only the
chassis. The cell variant keeps its stacked-glyph proportion. One ladder, φ-derived, the §L6
selection rule honored.

---

## 3. THE MOTION LAYER — the CARTOON PUNCH on the on↔off flip (the boldest move)

The chip select is a driver motion; per §L4 it carries liquid weight. The on↔off flip plays the
5-beat cartoon punch — MINIATURIZED from the tabs indicator onto the chip's own box, scaled by
`--motion-weight` (rest `0.62`, PRM → `0`). **Reuses `--ease-cartoon-punch` + a registered blob
scalar — no new engine, no second timer, no `@keyframes`.**

### 3a. Reuse the Band-0 cartoon substrate (verified phantoms → minted)

`--ease-cartoon-punch` + `--motion-weight` are the Band-0 mint (tabs GOLDEN §3a; verified 0
`src/styles` hits today → minted there). The chip `var()`s them, never re-mints. A registered
blob scalar so the CSS *interpolates* it (the `@property` precedent, property-regs.css §18):

```css
@property --chip-punch { syntax: "<number>"; inherits: false; initial-value: 1; }
@property --chip-flood-t { syntax: "<number>"; inherits: false; initial-value: 0; }
```

### 3b. The 5-beat select punch (CSS-only, on the `data-state` flip)

```css
@media (prefers-reduced-motion: no-preference) {
  .glass-chip {
    /* the punch leg rides the cartoon curve; the blob composes into the ONE scale write */
    transition:
      scale var(--ease-cartoon-punch-duration) var(--ease-cartoon-punch),
      background-color var(--duration-fast) var(--ease-standard),
      border-color var(--duration-fast) var(--ease-standard),
      color var(--duration-fast) var(--ease-standard);
    /* volume-preserving over-inflation: both axes by --chip-punch, scaled by --motion-weight */
    scale: calc(1 + (var(--chip-punch) - 1) * var(--motion-weight));
    transform-origin: center;
  }
  .glass-chip[data-state="on"]  { --chip-punch: 1.12; --chip-flood-t: 1; }  /* over-inflate + flood */
}
```

The five beats (the `--ease-cartoon-punch` `linear()` carries beats 1+4 for free — no JS):

1. **Anticipation** — the curve's pre-dip (−4%, × `--motion-weight`) recoils the chip a beat
   BEFORE it grows. A flat spring cannot express this; the keyframe does.
2. **Grow + overshoot** — `--chip-punch` drives `scale` toward **1.12×** (cap, the anti-taffy
   bar — a chip is tiny, 12% over-inflate reads as a satisfying *pop*, more would be rubbery).
3. **Accent-flood** — `--chip-flood-t` 0→1→0 washes the `--accent-band` across the plate via a
   `::after` `plus-lighter` radial (the tabs/dock commit-flood, §3c) — the band *pours in*.
4. **Cartoon-shadow throw** — the warm `--shadow-cartoon-sm` (verified, warm `color-mix`, NEVER
   raw black) on a `::before` caster `transform`s opposite the squish, deepening on the over-
   inflate then snapping back — the chip *lifts off its shadow* as it pops (§3d).
5. **Shrink-to-fit + glyph-pop** — `--chip-punch` settles to 1 (the curve's ζ<1 give lands
   soft); the label scale-pops AFTER the plate (overlapping action, §3e).

**De-select plays it in REVERSE** — `[data-state="off"]` runs the same transition the other way:
the blob deflates inward, the flood drains, the shadow snaps back UNDER. A row of filter chips
becomes a row of pop-toys — jubilant commit, reluctant release — the "FLOW & PUNCH" soul.

### 3c. The accent-flood `::after` (T4 commit-flood, miniaturized)

```css
.glass-chip::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(120% 140% at 50% 50%,
    color-mix(in oklab, var(--accent-band) 60%, transparent), transparent 72%);
  mix-blend-mode: plus-lighter;     /* additive bloom, sRGB-safe, Safari-native */
  opacity: var(--chip-flood-t, 0);
  transition: opacity var(--duration-base) var(--ease-out);  /* trails the SPATIAL leg */
}
```

EFFECTS-trails-SPATIAL (the flood eases on a slower clock so it *follows* the over-inflate). PRM
→ `--chip-flood-t` static 0 (no flood). Default tone neutral → provable no-op until a consumer
sets `:tone`.

### 3d. The moving cartoon-shadow (the 1940s-technicolor cast, opt-in loud)

For a `cartoon`-loud chip (and the default chip at a restrained share): a `::before` shadow-
caster reads `--shadow-cartoon-sm` (warm, verified shadow.css:92) and `transform`s the offset
OPPOSITE the punch — **never an animated `box-shadow`** (paint-bound; §L7). As the chip over-
inflates the cast slides out (the cel's light stays fixed, the object lifts); on settle it snaps
back. Scaled by `--motion-weight`. PRM → static cast.

### 3e. The glyph/label pop (overlapping action / follow-through)

The label (and the IconChip glyph) settles AFTER the plate — the child trails the parent:

```css
.glass-chip > * { transition: scale var(--spring-snappy-duration) var(--spring-snappy) 50ms; }
.glass-chip[data-state="on"] > * { scale: calc(1 + 0.07 * var(--motion-weight)); }  /* 0 under PRM */
```

The 50ms delay makes the glyph-pop OVERLAP the plate arrival (T4 per-glyph scale-pop). IconChip's
existing reveal-bloom (the `--spring-smooth` GROW) is the SAME register — the chip family shares
the pop.

### 3f. Calibration

Chip over-inflate cap `--chip-punch: 1.12` (a chip is small — 12% is a satisfying pop, ≤ the
anti-taffy fence; the tabs indicator runs ~1.10–1.12, the chip matches). `--motion-weight: 0.62`
default (lively, golden-restrained); a `cartoon`-loud variant scales up. Total deformation
(punch × the curve overshoot) stays legible. A consumer/demo tunable (presets-in-consumers).

---

## 4. THE TOGGLE-GROUP — congruent by inheritance + a gliding sibling indicator (optional)

The `ui/toggle-group` wraps N chips. Two moves, both DRY:

1. **Congruence by inheritance** — every grouped chip IS a `.glass-chip`; the group is a
   `.glass-capsule-track` (the recessed warm channel from the tabs extract) so the chips sit in
   a sunken well, exactly like the segmented-tab strip. ONE material language across tabs +
   toggle-group + chip rows.
2. **(opt-in) the gliding indicator** — for an EXCLUSIVE toggle-group, the selected chip can ride
   the SAME `useTabIndicator` glide+squish the tabs use (a single lozenge that *travels* between
   chips with the area-blob) instead of N independent plate-swaps. This is a pure COMPOSITION of
   the shipped tabs engine — no new primitive. NON-exclusive groups keep the per-chip punch
   (each chip pops independently). The group decides; the chip recipe is invariant.

---

## 5. THE UNION LEDGER (deft, KISS, DRY — no re-fork)

| need | reused primitive (verified on disk) | new surface |
|---|---|---|
| transmissive glass material | `.glass-capsule` (tabs GOLDEN extract) | `.glass-chip` composes it |
| recessed group channel | `.glass-capsule-track` (tabs extract) | toggle-group adopts |
| glass hover | `.glass-capsule-hover` (tabs extract) | chip adopts |
| tonal fill + safe ink | `.accent-tone` + `useAccentTone` (live, `accent-tone.css`) | idle-floor widen (§2c) |
| stadium radius | `--radius-control` = `--radius-pill` (theme/radius.css:56) | family adopts the rung |
| cartoon punch curve | `--ease-cartoon-punch` (Band-0 mint, tabs §3a) | chip `var()`s it |
| cartoon dial | `--motion-weight` (Band-0 mint) | chip `var()`s it |
| over-inflate scalar | `@property` precedent (property-regs.css §18) | `--chip-punch` / `--chip-flood-t` reg |
| commit flood | `--accent-band` + `plus-lighter` (tabs/dock precedent) | `::after` flood layer |
| warm cartoon shadow | `--shadow-cartoon-sm` (shadow.css:92, warm) | `::before` caster transform |
| §6 lift register | `--scale-hover-btn` / `--scale-press-btn` / `--spring-smooth` (live) | kept verbatim |
| glide indicator (group) | `useTabIndicator` + `useLiquidFlex` (live) | group composes (opt-in) |

ZERO new component, ZERO new engine, ZERO new spring/rAF/timer. The chip family collapses from
**three divergent CVAs + an inline CSS recipe** onto **ONE `.glass-chip` register** that composes
the tabs material + the live accent-tone + the Band-0 cartoon substrate. "Style them congruently,
more rounded and glassy" = adopt `.glass-capsule` on `--radius-control` with a warm idle floor.

---

## 6. CROSS-ENGINE (Chrome + Safari) — §L7

Every channel compositor-only + Safari-native by construction:
- **Material** — `.glass-capsule`'s `backdrop-filter` on the chip's OWN layer (the chip sits OVER
  the page/track, not nested inside a blur → the §L1 "glass cannot sample glass" trap avoided).
- **Punch** — `scale` on the chip's own box: compositor, identical on WebKit. `--ease-cartoon-
  punch` is a `linear()` on `transform` only — both engines.
- **`@property --chip-punch`/`--chip-flood-t`** — Safari-26 Baseline; on a gap engine the
  `initial-value: 1`/`0` is the safe rest (snaps without inflation/flood, never broken).
- **Flood** — `plus-lighter` blend + opacity: Safari-safe, sRGB.
- **Cartoon shadow** — `transform` on a `::before` caster (never animated `box-shadow`); the
  `color-mix(in srgb …)` warm token is Safari-native.
- **Idle floor** — `color-mix(in oklab …)` + the PLAIN per-mode `--chip-tint-floor` pair (NEVER
  `light-dark()` — the inset-shadow trap fence, even though no inset here, the per-mode discipline
  holds). NO goo, NO `backdrop-filter: url()`, NO WebGL — the chip is a plain glass capsule.

Acceptance is a **paired-engine π** (chromium + webkit), both light/dark, NEVER `reducedMotion`
on the punch arm.

---

## 7. A11Y / PRM CARVE

- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes anticipation, over-inflate,
  glyph-pop, shadow-throw; `--chip-flood-t` static 0; the on↔off swap is an instant band change.
  The glass material + idle warm-floor + contrast-safe ink (all static) remain — a chip needs no
  motion to read selected.
- **`prefers-reduced-transparency`** → `.glass-capsule` falls to the opaque-tier escape (the
  extant `--glass-level` machinery); the fill goes solid, the warm floor + edge survive as
  legibility anchors.
- **`prefers-contrast: more`** → the active edge + the cartoon-shadow opacity floor UP (the inked
  edge is a legibility asset).
- **Semantics** — reka `Toggle` `aria-pressed` / `data-state` is UNTOUCHED (this is a surface +
  motion layer under the toggle); the contrast-safe `--accent-ink` (value.js `safeAccentColor`)
  keeps the label ≥ AA on the band.
- **Tap target** — the φ-padding ladder keeps the ≥44px effective hit on `md`/`lg` (§L3); `sm`
  is a dense-row opt-in with the documented carve.
- **Focus** — the chip composes `--focus-ring-shadow` on `:focus-visible` (the `.glass-capsule-
  hover` focus arm); roving-tabindex in the group is untouched.

---

## 8. THE ACCEPTANCE BAR + the born-RED gate

The π MUST drive the REAL toggle gesture and judge **painted pixels** — no arithmetic, no
computed-over-hardcoded (the fenced fraud). `tests-visual/chip-family.spec.ts`, **chromium +
webkit**, both modes, over a LIVE field where applicable:

1. **CONGRUENCE** — sample all three chip variants' computed `border-radius`: ALL resolve the
   SAME stadium rung (`--radius-control`); the cell resolves `--radius-card`. Born-RED on HEAD
   (4/6/10px grab-bag).
2. **ROUNDED** — the inline chip radius ≥ half its height (a true stadium end-cap). Born-RED on
   HEAD (4px on a 24px chip = square).
3. **GLASSY** — each chip's computed `backdrop-filter` is NON-none (real glass). Born-RED on HEAD
   (`none` everywhere).
4. **WARM IDLE (the honest no-gray)** — the IDLE chip fill, **composited over the REAL flat page
   pixel** (live `elementFromPoint`, NOT a hardcoded field), reads oklab **C ≥ 0.02** BOTH modes.
   Born-RED on HEAD (idle C 0.013–0.018 measured §0b). A control compositing oklab-as-sRGB over a
   hardcoded purple is a FORBIDDEN gate shape (the bite below catches it).
5. **PUNCH** — drive a real `select(chip)` (a click that flips `data-state`); frame-series the
   chip bbox AREA → it EXCEEDS its footprint at peak (~1.10–1.12×) then DE-INFLATES to fit at
   arrival. A `--motion-weight: 0` control never exceeds → born-RED.
6. **ANTICIPATION** — the chip scale dips BELOW 1.0 for ≥1 frame before growing. A spring-only
   control shows zero pre-dip → born-RED.
7. **FLOOD** — the accent band's plate luminance blooms then clears, TRAILING the SPATIAL over-
   inflate (EFFECTS-after-SPATIAL frame-ordering).
8. **GLYPH-POP** — the label scale peaks AFTER the plate settles (frame-ordering).
9. **DE-SELECT REVERSE** — toggling off plays the punch in reverse (deflate-inward, flood drain).
10. **PRM** — one static frame at fit, `--chip-punch: 1`, no flood, glass + warm floor present.

**Detector self-test bites:** a chip radius that resolves a fixed px (not `--radius-control`) RED;
a chip with `backdrop-filter: none` RED; an idle fill measured over a HARDCODED field (not the
live page pixel) RED (the fraud fence); an idle fill C < 0.02 over the real flat page RED; a punch
that opens-but-never-shrinks RED; a `--motion-weight: 0` killing anticipation+punch+flood RED; a
flood firing WITH (not after) the spatial leg RED; an animated `box-shadow` (not a `::before`
caster transform) RED; a `light-dark()` `--chip-tint-floor` fragment RED.

---

## 9. THE SPIKE — live-verify the boldest mechanism

`golden/spike.html` (throwaway, greenfield-dir, no `src/` touched). A self-contained page that
mirrors the EXACT shipping write — a row of `.glass-chip` capsules on `--radius-control`, the
warm idle floor over a flat warm page AND over a vibrant aurora swatch, the on↔off punch
(`scale: calc(1 + (--chip-punch − 1) × --motion-weight)` on `--ease-cartoon-punch`, the `::after`
accent-flood, the `::before` cartoon-shadow throw, the glyph-pop). The gate readback
(`window.__gate()`) measures:

| assertion | target |
|---|---|
| GROW past footprint (peak/baseArea) | > 1.04 (expect ~1.12) |
| SHRINK to fit (end fitDelta) | < 0.06 (expect ~0) |
| anticipation pre-dip (min scale before grow) | < 1.0 (a real dip) |
| idle fill warm over FLAT page (composited oklab C) | ≥ 0.02 (the floor works) |
| idle fill warm over VIBRANT field (composited C) | ≥ 0.02 + hue-shifted (field transmits) |
| de-select plays reverse | deflate trace mirrors |

Artefacts: `golden/spike.html`, `golden/spike-light.png`, `golden/spike-dark.png` (the chip row
over a purple/teal field, both modes — proving warm-not-gray idle AND the punch). The boldest
mechanism (the on↔off cartoon punch on a warm-floored glass-capsule chip) proven sound BEFORE any
`src/` change.

---

## 10. THE WAVE-AMENDMENT (reconcile vs the 116-wave set; no dup vs tabs/buttons)

Proposed **`BD.W-CHIP-CONGRUENCE`** (the chip-family union). Reconciliation:

- **Depends on (consumes, never re-mints):** `BD.W-TABS-*` (the `.glass-capsule` / `-track` /
  `-hover` extract + the Band-0 `--ease-cartoon-punch` / `--motion-weight` mint). The chip wave
  is DOWNSTREAM of the tabs material extract — it adopts, it does not fork.
- **No dup vs `BD.W-TABS-LIQUID`** — tabs owns the gliding indicator + the 5-beat on the *strip*;
  the chip owns the 5-beat on the *individual toggle flip* (a distinct gesture: per-chip commit,
  not an indicator travel). The toggle-group's opt-in glide (§4) is a COMPOSITION of the tabs
  engine, not a second copy.
- **No dup vs `BD.W-*-BUTTON-GLASS`** — buttons compose `.glass-capsule` for a press control; the
  chip composes it for a *toggle* control (accent-tone fill + on↔off punch). Same material, distinct
  state-machine — the union the tabs GOLDEN §2c envisioned ("≥3 consumers").
- **Folds:** the `--radius-control` adoption is the BC.W-CONTROL-SMOOTH rung extended onto the chip
  family (the wave already minted the stadium; the chip wave consumes it). The idle warm-floor is
  the select-forms `--overlay-tint-floor` pattern applied to `--accent-fill` (one floor idiom).
- **Reconcile with `W-CAROUSEL-CADENCE` (T13):** NOT contradicted — the chip select is a DRIVER
  motion (the user's finger), so it carries the punch; the observer carve is untouched.

**THE BOLDEST MOVE restated:** the chip that PUNCHES when you pick it — the smallest control in the
library, today the flattest, becomes the cartoon-register keystone: one warm-glass capsule on a
stadium pill that anticipates → over-inflates → floods → throws its warm shadow → shrinks-to-fit on
select and plays it all in reverse on release, golden-restrained at `1/φ` and one token from
dead-calm. Congruent (ONE recipe), rounded (the stadium), glassy (the tabs capsule + warm floor),
and ALIVE — the chip family finally reads as one technicolor pop-toy family, both modes.
