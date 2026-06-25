# CHIP FAMILY — GOLDEN (the canonical reference)

> **ToggleChip** (`chip` · `cell`) + **SelectableChip** (`sm`/`md`/`lg`) + **IconChip**
> (+ the **toggle-group**) — re-resolved to ONE congruent, rounded, warm-glass register.
> The user's verbatim: *"none of these are styled CONGRUENTLY — should be more ROUNDED
> and GLASSY."*
>
> **The golden idea in one sentence:** a chip is a **stadium-pill warm-glass LENS** —
> `.glass-capsule` (the tabs-extract transmissive lozenge) × `.accent-tone` (the
> contrast-floored tonal channels) on `--radius-control`, idle-floored so it is **never
> gray** — and selecting it is a **CARTOON PUNCH**: the tonal band floods through the lens
> on `--ease-cartoon-punch` with anticipation → overshoot → settle, a one-shot accent-bloom
> trailing the spatial leg. The whole family composes ONE recipe, ONE φ size axis, ONE
> motion register. **A UNION** with the shipped ecosystem — zero new component, zero new
> engine, zero parallel glass fork. Spike-proven, both modes, compositor-only (Chrome ==
> Safari).

This GOLDEN reconciles three brainstorm lenses (`brainstorm/lens-a` pure-iOS-fidelity ·
`lens-b` cross-engine/perf · `lens-c` cartoon-technicolor-punch) and resolves the three
tensions between them to ONE design (§A).

---

## A. THE SYNTHESIS — strongest move from each lens, tensions resolved

| axis | lens-a | lens-b | lens-c | **GOLDEN resolution** |
|---|---|---|---|---|
| **material** | `.glass-capsule` lens | `.glass-material` (fallback) | `.glass-capsule` lens | **`.glass-capsule`** — the chip is the ≥4th consumer of the tabs extract (lens-a/c win; lens-b agrees it's the DRY convergence). NOT `.glass-material` directly (that's the lower atom `.glass-capsule` itself composes). |
| **geometry** | stadium `--radius-control`; cell=`--radius-card`; φ ladder | same | same | **unanimous** — stadium pill, cell exception, ONE φ size axis collapsing the CVAs. |
| **idle-gray cure** | field-dependent (mount `.paper-field`) | strength 8%→14% on the chip scope | `max(strength, --chip-tint-floor)` warm-FLOOR | **lens-c's `max()` floor** (a non-forking one-line widen of `.accent-tone`; a consumer raising global strength still wins) **+ lens-a's field** (the lens also transmits a vibrant field's hue when one is present). Floored over flat (the guarantee), vibrant over a field (the song). |
| **on↔off motion** | punch on `scale` + `::after` flood | bespoke radial-gradient **metaball** flood (gradient-radius scalar) | 5-beat punch on `scale` + `::after` flood + `::before` cartoon-shadow | **the PUNCH on `scale` (lens-a/c) + the parameterized `::after` accent-flood (all three) — exactly the two tabs layers, miniaturized.** **DROP lens-b's bespoke gradient-radius animation** (it duplicates the `::after` flood with more machinery and a second center-tracking scalar — violates KISS/DRY; the punch+flood already deliver the liquid weight). **HOLD lens-c's `::before` cartoon-shadow as opt-in-loud** (the default chip is small; a moving box-shadow caster is the cartoon-loud variant, not the base — anti-taffy restraint). |
| **group** | opt-in `useTabIndicator` glide for `type=single` | (deferred) | opt-in glide + `.glass-capsule-track` recessed well | **lens-c** — exclusive group = recessed track + the gliding indicator (a COMPOSITION of the tabs engine); multi-select keeps per-chip punch. |

**The single boldest move (kept):** *the chip that PUNCHES when you pick it.* The smallest
control in the library — today the flattest (a color-snap) — becomes the cartoon-register
keystone: a warm-glass capsule that anticipates → floods → overshoots → settles on select,
and plays it in reverse on release. The tab indicator's little sibling, finally one family.

**Why the punch beats lens-b's metaball here:** a single blob welling into a rounded
container is just an area-scale + a radial bloom — which is *exactly* `scale` on the box +
the `::after` flood. lens-b's gradient-radius scalar is a second mechanism that renders the
same read with more bytes and a press-point-tracking center the keyboard path can't supply.
The chip is a CSS lens, not a metaball; the real metaball (multi-blob neck-merge) is the
disjoint dock-fission viz and the chip never touches it. **KISS wins.**

---

## B. SOURCE-VERIFIED status quo — the honest live read (the bar to beat)

Grep of `src/` + the three lenses' painted-pixel interrogations (cross-checked, 2026-06-24).

### B1. CONGRUENCE — a grab-bag (the user's #1 complaint, confirmed)

| variant | radius (computed) | padding | glass? | source |
|---|---|---|---|---|
| `ToggleChip.chip` | **4px** (`rounded-sm`) | `2px 8px` | none | grab-bag |
| `ToggleChip.cell` | `0.625rem`→**~10px** | `10px 8px` | none | square card |
| `SelectableChip.sm` | **4px** (`rounded-sm`) | `2px 8px` | none | `selectableChipVariants.ts:50` |
| `SelectableChip.md` | **6px** (`rounded-md`) | `4px 12px` | none | `:51` |
| `SelectableChip.lg` | **9-10px** (`rounded-lg`) | `6px 16px` | none | `:52` |
| `IconChip` | **9999px** (`--radius-pill`) | glyph-floored | plate only | `icon-chip.css` |

**Five radii across one family (4 / 6 / ~10 / pill), THREE padding languages, ZERO shared
glass lens.** IconChip is the lone pill; the toggle/selectable rungs are 4–10px squared
rounded-rects. `backdrop-filter: none` + `box-shadow: none` on every chip — "glassy" is
structurally absent. The user is exactly right.

### B2. GLASSY — the §3 BOTH root causes, painted-honest

- **Root #1 (no field behind).** Chips paint a SOLID `color-mix` fill; nothing transmits
  through them. A warm-tinted fill over a flat cool page composites toward gray (the
  glass-material GOLDEN §0 diagnosis). No `.paper-field`, no lens.
- **Root #2 (dormant idle tint).** The `.accent-tone` idle `--accent-fill` at **8%**
  desaturates over warm-cream — the **idle** chips composite at **OKLab C 0.013–0.018,
  BELOW the 0.02 warm floor** (a born-RED gray at rest, all three lenses concur). The
  ACTIVE band (C 0.027–0.044) clears; the idle does NOT — and the user sees most chips idle
  most of the time.

### B3. MOTION — the on↔off flip is calm, no punch

Both chips ride the §6 `--spring-smooth` hover/press lift (FIT, kept), but the **state
flip** is a flat `background-color var(--duration-fast)` color-snap — no anticipation, no
overshoot, no flood. The chip select is a DRIVER motion (the user's finger); per design.md
§L4 it must carry liquid weight. It does not.

**Verdict — survival of the fittest:** `.accent-tone` (the tonal spine, contrast-safe ink,
`accent-tone.css` verified) is FIT — **refine** (the idle floor). reka `Toggle`/`ToggleGroup`
semantics + `useAccentTone` value.js ink are FIT — **keep byte-untouched**. The §6 lift is
FIT — **keep**. The geometry grab-bag, the absent lens, the idle-gray, the punchless flip are
BROKEN/WEAK — **re-invent geometry to ONE pill register, union the lens on, mint the punch.**

---

## C. GEOMETRY — "more ROUNDED": the stadium, golden-laddered

### C1. The radius unification (DRY, already-decided)

The library already shipped the answer the chips never adopted:
**`--radius-control: var(--radius-pill)`** (`theme/radius.css:56`, BC.W-CONTROL-SMOOTH —
*"the small-inline-control corner rung is a STADIUM, not a fixed small px… the radius SCALES
with the control, clamped to half-height"*). On a short box the pill clamps to half-height →
a **true end-cap at every rung**, the iOS-27 chip silhouette exactly.

**Every chip rung resolves `--radius-control`.** This retires `rounded-sm` (chip + sel-sm),
`rounded-md` (sel-md), `rounded-lg` (sel-lg), and the broken `rounded-[0.625rem]` in ONE
rung. `IconChip` is already pill — it now MATCHES **by construction** instead of by accident.

**The ONE documented exception — the `cell` TILE.** A 72px square icon+label tile is a
*card*, not an inline pill — it keeps **`--radius-card`** (the 1rem squircle; the
BC.W-CONTROL-SMOOTH carve already exempts the card toggle tile, `radius.css:52`). It still
composes the SAME `.glass-chip` material + motion. **One geometry language, one exception.**

### C2. The φ size axis (§L6 golden proportion) — ONE axis the family shares

The CVAs collapse to ONE `chipVariants({ size })`. Radius is **invariant** (always
`--radius-control` — the stadium re-rounds itself at every height); only padding/text vary,
on a √φ ladder (φ≈1.618, √φ≈1.272). The pad-x derives from height × ~1/φ (the golden inset,
the iOS chip's pad-x ≈ 0.6× its height):

| rung | height | pad (x · y) | text | tap |
|---|---|---|---|---|
| `sm` | ~24px | `px-2.5 py-1` | `text-caption` | hit-slop to ≥44px (§L3) |
| `md` | ~32px | `px-3.5 py-1.5` | `text-small` | ≥44px effective |
| `lg` | ~39px | `px-5 py-2` | `text-base` | native ≥44px |
| `cell` | 72px sq | `px-2 py-2.5` stacked | `text-caption` | native |

`selectableChipVariants.size` + the `ToggleChip.variant` axis COLLAPSE into ONE shared
`chipVariants` (clean break, no alias — the no-legacy law). The three SFCs stay DISTINCT
(distinct ergonomics: bool toggle vs tonal picker vs glyph tile) but render the SAME register.

---

## D. MATERIAL — "GLASSY": the warm-glass LENS, both root causes fixed

### D1. The chip becomes a `.glass-capsule` lens (union, not a fourth recipe)

```
.glass-chip  ≙  .glass-capsule          /* warm lifted lozenge: --glass-bg-floating-tinted */
              + .glass-capsule-hover     /* specular catch-light + scale on hover, press-snap */
              + .accent-tone             /* the tonal channels — idle fill / active band / ink */
```

`.glass-capsule` (tabs GOLDEN §2b — `glass/glass-capsule.css`, the extract of the
`segmented-indicator` composite) brings the W55 `--glass-bg-floating-tinted` adaptive fill
(warm both modes, NEVER gray), the six-layer composite (`--glass-rim-top` catch-light +
`--glass-rim-bottom` warm under-shadow + `--glass-shadow-floating` lift +
`--glass-blur-floating`), on `--radius-pill`. **The chip stops being a flat tinted rectangle
and becomes a lifted warm lens.** ZERO new material — the same register tabs/buttons/dock
consume (the chip is the ≥4th consumer; clears the overfitting bar by construction).

The two seams are DESIGNED to coexist (`accent-tone.css` header: *"the rim from
`--glass-accent`, the fill from `--accent-tone`… they COMPOSE on a chip that is both a glass
surface and a tonal control"*). The chip is exactly that union:

- **IDLE (off)** — the `.glass-capsule` warm lens at the quiet tier, its fill TINTED by the
  warm-floored `--accent-fill` (D2) — a legible, warm-glass, faintly-toned pill. The tone
  tints the GLASS, not a separate opaque layer.
- **ON (selected)** — the lens lifts (more `--glass-shadow-floating`) AND `--accent-band`
  floods the fill + `--accent-edge` lights the rim + the contrast-safe `--accent-ink` label.
  The selected chip *lifts off the field as a lit, tonal, warm-glass lozenge* — the iOS-27
  selected-chip read.
- **HOVER** — `.glass-capsule-hover`: `--glass-specular: 0.14` catch-light + `scale: 1.015`
  lift (the "ready to receive" read, absent on chips today).

### D2. Root #2 cure — the WARM IDLE FLOOR (a one-line `.accent-tone` widen, NOT a new channel)

The born-RED idle-gray (C 0.013–0.018). The cure floors the idle tone-admit so the resting
fill clears 0.02 warm over warm-cream even with no vibrant field behind:

```css
.accent-tone {
  /* RAISE the idle floor so the resting fill clears the 0.02 warm-floor over warm-cream.
     max(strength, floor) is a FLOOR not a clamp — a consumer who raises the global
     strength still wins. A ONE-line widen of the EXISTING recipe, not a new register. */
  --accent-fill: color-mix(in oklab,
    var(--surface, var(--card)),
    var(--tone, var(--primary)) max(var(--accent-fill-strength), var(--chip-tint-floor)));
}
/* PLAIN per-mode pair — NEVER a light-dark() fragment (the binding inset-shadow trap). */
/* tokens/glass.css (light) */   --chip-tint-floor: 12%;   /* lifts idle composited C ≥ 0.02 */
/* tokens/dark-arm.css (dark) */ --chip-tint-floor: 15%;   /* dark needs more warm-lift       */
```

**Spike-measured: idle fill `oklab(0.902 0.034 0.037)` → C = √(0.034²+0.037²) = 0.050** —
well above the 0.02 floor (the cure works; §G).

### D3. Root #1 cure — the field behind (consume, don't duplicate)

A lens transmits a field. When a chip demo route mounts a **`.paper-field`** (glass-material
GOLDEN's `W-GLASS-FIELD` warm-amber→terracotta→sand plenum) the chip's `saturate()`
concentrates the warm chroma → the chip reads warm-glass, and over a VIBRANT field (an Aurora
demo) the idle fill ALSO transmits the field's hue — the warm read becomes
**field-dependent-AND-floored**: floored over flat (D2, the guarantee), vibrant over a field
(the song). **The chip DEPENDS on `W-GLASS-FIELD`; it does not duplicate it.** Over the flat
fallback the D2 floor + the `.glass-capsule` `--glass-rim-top` defined edge keep the chip a
discrete warm shape (never a cream smudge).

### D4. The transmitted-through inset (select-forms idiom), not a halo

The accent flood (§E) is an `inset:0` `::after` INSIDE the lens (`border-radius: inherit`,
`mix-blend-mode: plus-lighter`) — additive over the warm fill, never a separate opaque plate
that would re-introduce the flat read. The `.glass-capsule` `backdrop-filter` sits on the
chip's OWN layer (the §L1 "glass cannot sample glass" trap avoided — the chip is OVER the
field, not nested in another blur).

---

## E. MOTION — the on↔off cartoon PUNCH, liquid & weighty (Band-0 `--ease-cartoon-punch`)

The state flip becomes a liquid event on the Band-0 cartoon-punch register (minted by tabs
GOLDEN §3a as the §L2/§L4 substrate — `--ease-cartoon-punch` + `--motion-weight: 0.62`; the
chip **CONSUMES** it, never re-mints). **Spike-proven: the curve dips to −0.04 (anticipation,
a thing no damped spring expresses) and peaks at 1.22 (overshoot past footprint).**

### E1. The registered scalar (so CSS interpolates it)

```css
@property --chip-flood-t { syntax: "<number>"; inherits: false; initial-value: 0; }
```

### E2. The 3-beat tonal flood (the ONE scale write + a registered scalar)

```css
.glass-chip {
  /* the ONE scale write — press × the on-flood overshoot, volume-preserving, center-pinned */
  scale: calc(1 + 0.06 * var(--chip-flood-t) * var(--motion-weight));
  transform-origin: center;
  transition:
    scale var(--ease-cartoon-punch-duration) var(--ease-cartoon-punch),
    background-color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    color var(--duration-fast) var(--ease-standard);
}
.glass-chip[data-state="on"] { --chip-flood-t: 1; }
@media (prefers-reduced-motion: reduce) { .glass-chip { --motion-weight: 0; transition:
  background-color var(--duration-fast), color var(--duration-fast); } }
```

1. **Anticipation** — the `--ease-cartoon-punch` pre-dip (−4%, scaled by `--motion-weight`)
   recoils the chip a beat BEFORE the flood. The curve carries it — no JS, no second timer.
2. **Flood + overshoot** — `--accent-band` floods the fill while the lens over-inflates
   (~1.04–1.06×, the curve's 1.22 against the 0.06 coefficient) — the tonal colour *washes
   through the lens bigger than its footprint*, then…
3. **Settle** — the punch curve's ζ<1 give lands the chip soft at rest, fill resolved, rim
   lit, ink crisp. OFF→ON is a flood-in; ON→OFF is the inverse (flood drains, lens calms,
   NO overshoot-past-gone).

### E3. The COMMIT flood `::after` (tabs GOLDEN §4, parameterized, EFFECTS-trails-SPATIAL)

```css
.glass-chip::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(120% 140% at 50% 50%,
    color-mix(in oklab, var(--accent-band) 60%, transparent), transparent 72%);
  mix-blend-mode: plus-lighter;                 /* additive bloom, sRGB-safe, Safari-native */
  opacity: var(--chip-flood-t, 0);
  transition: opacity var(--duration-base) var(--ease-out) 60ms;  /* trails the SPATIAL leg */
}
```

The bloom fires a beat AFTER the colour settles (the v3 f006→f007 ordering) then clears — the
iOS-27 selected-chip "ink-flood" at chip scale. Default tone neutral → provable no-op until a
consumer sets `:tone`. **PRM → `--motion-weight: 0`** zeroes anticipation + overshoot + bloom
in ONE assignment; the colour cross-fade + the static lens lift remain (selection always
legible). **No second spring, no rAF, no `@keyframes`** — the curve + the registered scalar
carry the whole envelope, compositor-only (Chrome == Safari).

### E4. (opt-in loud) the moving cartoon-shadow — lens-c's `::before`, HELD as a variant

NOT in the base register (a chip is tiny; a moving box-shadow caster is the cartoon-LOUD
opt-in). A `cartoon`-loud chip adds a `::before` caster reading `--shadow-cartoon-sm`
(`utilities/components.css:307`, warm `color-mix`, NEVER raw black) that `transform`s OPPOSITE
the punch (never an animated `box-shadow` — paint-bound, §L7). Scaled by `--motion-weight`,
PRM-static. The default chip stays restrained; the loud variant is presets-in-consumers.

---

## F. THE TOGGLE-GROUP — congruent by inheritance + a gliding sibling (opt-in)

The reka `ToggleGroup` wraps N `.glass-chip` children. Two moves, both DRY:

1. **Congruence by inheritance** — every grouped chip IS a `.glass-chip`; an EXCLUSIVE group
   wraps them in a **`.glass-capsule-track`** (the tabs-extract recessed warm channel) so the
   chips sit in a sunken well — exactly the segmented-tab strip. ONE material language across
   tabs + toggle-group + chip rows.
2. **(opt-in) the gliding indicator** — for `type="single"`, the selected chip rides the SAME
   **`useTabIndicator`** glide+squish the tabs use (a single lozenge that *travels* between
   chips with the area-blob) instead of N independent plate-swaps. A single-select chip group
   IS a segmented control with chip children — a pure COMPOSITION of the shipped tabs engine,
   ZERO new primitive. **Multi-select groups keep the per-chip punch** (multiple can be on —
   no traveling indicator). The group decides; the chip recipe is invariant. The chip family
   and the tab family converge on ONE motion soul.

---

## G. THE EXACT MECHANISM — tokens · recipes · composables · files

### G1. NEW surface (the union)

| file | change |
|---|---|
| `src/styles/glass/glass-chip.css` (**NEW**, `@layer components`, `@import` after `glass-capsule.css`) | `.glass-chip` composes `.glass-capsule` + `.glass-capsule-hover` + `.accent-tone`; on `--radius-control`; the `@property --chip-flood-t` reg; the ONE `scale` write (§E2); the `::after` commit flood (§E3); `[data-state="on"]` arm; the PRM carve. The `cell` modifier → `--radius-card`. |
| `src/components/custom/.../chipVariants.ts` (**collapse**) | `selectableChipVariants` + the `ToggleChip` size/variant axis → ONE `chipVariants({ size })`: `.glass-chip accent-tone focus-ring …` + the φ padding/text rungs (§C2). Radius INVARIANT (no `rounded-*`). Clean break, no alias. |
| `src/components/custom/{toggle-chip,selectable-chip,icon-chip}/*.vue` | render `chipVariants(...)`; IconChip adopts `.glass-chip` (its `--icon-chip-plate` backplate re-expressed as the `.accent-tone` idle fill; the `in srgb` brand-overlay preserved as a per-scope `--accent-fill-space: srgb` override per `icon-chip.css`'s recorded `proof:suffuse` byte-target). |
| `src/components/ui/toggle-group/ToggleGroup.vue` | exclusive group → `.glass-capsule-track` wrapper; opt-in `useTabIndicator` for `type="single"` (§F). |

### G2. REFINE (one-line, FROZEN otherwise)

| file | change |
|---|---|
| `src/styles/glass/accent-tone.css` | the idle `--accent-fill` → `max(--accent-fill-strength, --chip-tint-floor)` (§D2). One line. The channels/strengths otherwise byte-untouched. |
| `src/styles/tokens/glass.css` + `tokens/dark-arm.css` | the PLAIN per-mode `--chip-tint-floor` pair (12% / 15%). NEVER `light-dark()`. |

### G3. CONSUME (depend, never re-mint — the union ledger)

| need | reused primitive (verified on disk / specced) | dup-check |
|---|---|---|
| warm-glass lens | `.glass-capsule` + `.glass-capsule-hover` (tabs GOLDEN, `glass/glass-capsule.css`) | DEPENDS-ON tabs; the ≥4th consumer, no re-fork |
| recessed group well | `.glass-capsule-track` (tabs GOLDEN) | DEPENDS-ON tabs |
| tonal identity + safe ink | `.accent-tone` + `useAccentTone` (`accent-tone.css`, verified) | REFINE (idle floor); channels frozen |
| stadium radius | `--radius-control` = `--radius-pill` (`radius.css:56`, verified) | CONSUME; retires 4 ad-hoc radii |
| the field behind | `.paper-field` (glass-material GOLDEN `W-GLASS-FIELD`) | DEPENDS-ON; chip routes mount it (chassis contract) |
| cartoon punch + dial | `--ease-cartoon-punch` + `--motion-weight` (tabs GOLDEN Band-0 mint) | CONSUME (`var()`s the phantoms tabs mints); never re-mints |
| `@property` scalar | the `property-regs.css §18` precedent | CONSUME the pattern; `--chip-flood-t` reg |
| commit bloom | the `.glass-capsule` `::after` flood (tabs §4) + `plus-lighter` | parameterized on the chip |
| cartoon-shadow (loud) | `--shadow-cartoon-sm` (`utilities/components.css:307`, warm) | opt-in `::before` caster |
| reka semantics | `Toggle` / `ToggleGroup` (`aria-pressed`, roving tabindex) | UNCHANGED |
| traveling indicator | `useTabIndicator` (SegmentedTabs) | opt-in on `type=single` |

**ONE recipe (`.glass-chip`), ONE size axis (`chipVariants`), ONE motion register.**
**HELD/FROZEN (union law):** `.accent-tone` channels + strengths (refine the idle floor only);
`useAccentTone` value.js ink; reka `Toggle`/`ToggleGroup`; `--radius-control`; `.glass-capsule`;
`.paper-field`; `--ease-cartoon-punch`/`--motion-weight`. **No legacy, no alias, no fourth
chip, no parallel glass fork.**

### G4. THE BOLDEST MECHANISM — DE-RISKED (the spike, §J)

`golden/spike.html` mirrors the exact shipping write and live-reads GREEN (Chrome):
stadium congruence (all rungs 9999px end-caps, cells 16px exception), the warm-floor
(idle C 0.050 ≫ 0.02), the punch curve (−0.04 dip / 1.22 peak), compositor-only
(`backdrop-filter` supported, NO `url()` filter). Screenshots: `golden/spike-light.png`
(warm chips over flat cream, on-chips banded) + `golden/spike-dark-vibrant.png` (warm lenses
glowing over a purple/teal field, never charcoal).

---

## H. CROSS-ENGINE (Chrome + Safari) — §L7

Every channel compositor-only + Safari-native by construction (spike-confirmed
`CSS.supports` + no `url()` filter):
- **Lens fill** — `.glass-capsule` `backdrop-filter: blur() saturate()` on the chip's OWN
  layer (WebKit since 9); chip is OVER the field, not nested in a blur.
- **Stadium radius** — `border-radius: 9999px` clamp: cross-engine.
- **Flood / overshoot** — `scale` on the chip's own box + `@property --chip-flood-t`
  interpolation (Safari-26 Baseline; `initial-value: 0` is the safe rest on a gap engine —
  slides without flood, never broken).
- **Accent bloom `::after`** — `plus-lighter` blend + opacity + `in oklab`/`in srgb`
  color-mix: Safari-safe.
- **Idle floor** — `color-mix(in oklab …)` + the PLAIN per-mode `--chip-tint-floor` pair
  (NEVER `light-dark()` — the inset-shadow trap fence; the per-mode discipline holds).
- **NO `backdrop-filter:url`, NO SVG goo, NO WebGL** — the chip is a CSS lens, not a metaball
  (the disjoint dock-fission viz owns goo). lens-b's gradient-radius metaball is explicitly
  NOT taken — the punch+flood deliver the liquid read without it.

Acceptance is a **paired-engine π** (chromium + webkit), both light/dark, never
`reducedMotion` on the punch arm.

---

## I. A11Y / PRM carve

- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes anticipation + overshoot +
  bloom; the colour cross-fade + the static lens lift remain (selection always legible).
  Vestibular-safe.
- **`prefers-reduced-transparency`** → `.glass-capsule` falls to the opaque-tier escape (the
  `--glass-level` machinery); the lens goes solid warm, the `--accent-edge` rim + warm floor
  keep the chip a discrete toned shape. Warm-cream, never gray, transparency off.
- **`prefers-contrast: more`** → the `--accent-edge` rim α + the rim catch floor UP; the
  `--accent-ink` is already value.js contrast-safe (`useAccentTone`).
- **Semantics UNTOUCHED** — reka `Toggle`/`ToggleGroup` `aria-pressed` + `data-state` +
  roving tabindex + keyboard are the contract; this is a surface/motion layer.
- **Tap target** — every rung hit-slops to ≥44px (§L3); `lg`/`cell` native ≥44px.
- **Focus** — `.focus-ring` (verified `utilities/base.css`) on `:focus-visible`, unchanged.
- **Contrast floor** — `.accent-tone`'s idle ≥3:1 floor is RE-MEASURED post-union (the warm
  floor must not drop the idle below 3:1 over the lens — a gate arm, C6).

---

## J. THE SPIKE (de-risk the boldest mechanism, throwaway, greenfield-dir) — BUILT + LIVE-VERIFIED

`golden/spike.html` (no `src/` touched) mirrors the EXACT shipping write — `.glass-chip` =
`.glass-capsule` × `.accent-tone` over a warm `.paper-field`, the on↔off `--chip-flood-t`
flood on `--ease-cartoon-punch`, the stadium pill at three φ rungs + the cell tile — and
`window.__runGate()` reads back (Chrome, live):

| assertion | spike result |
|---|---|
| C1/C2 stadium congruence | all pill rungs `r=9999, endcap=true`; `sameRadius=true`; cells `[16,16]` (exception) ✓ |
| C3 warm-not-gray idle | idle fill `oklab(0.902 0.034 0.037)` → **C 0.050 ≥ 0.02** ✓ |
| C5 anticipation+overshoot | curve `minOutput −0.04` (pre-dip below rest), `maxOutput 1.22` (overshoot); scale tracks (dip 0.9998 → climb) ✓ |
| cross-engine | `supportsBackdrop=true`, `usesUrlFilter=false` ✓ |

**Artefacts:** `golden/spike.html`, `golden/spike-light.png` (warm chips, flat cream),
`golden/spike-dark-vibrant.png` (warm lenses over purple/teal, never charcoal). The boldest
mechanism — the on↔off cartoon punch on a warm-floored glass-capsule chip — proven sound
BEFORE any `src/` change.

> **Spike honest-note:** the `getComputedStyle().scale` frame-series catches the *settled*
> value, not the sub-frame transient curve peak — but the curve's overshoot is
> *mathematically guaranteed* by the parsed `--ease-cartoon-punch` stops (−0.04 / 1.22),
> which the spike reads directly. The chroma C-floor here is read from the resolved
> `oklab()` token; the shipping gate (§K) re-reads it from a REAL screenshot pixel over the
> REAL field (the fraud fence).

---

## K. THE GATE (born-RED — the HONEST painted read, the fraud fence)

`tests-visual/chip-family.spec.ts`, **chromium + webkit**, both modes, over the LIVE
`.paper-field`. The chroma arm is a **REAL screenshot pixel read** of the actual chip over
the actual page — NOT `getComputedStyle` composited over a HARDCODED field (the recurring
fraud: parse-oklab-as-sRGB over a hardcoded purple → a gray chip passes). A born-RED reporting
the HONEST gray over today's NO-field flat page is CORRECT.

| # | assert | born-RED on HEAD | GREEN when |
|---|---|---|---|
| **C1 congruence** | every pill rung resolves the SAME computed `border-radius` (= `--radius-control` stadium) + the SAME pad ratio + the SAME `.glass-capsule` fill token; cell resolves `--radius-card` | 4/6/~10/9999 grab-bag | the family shares one recipe |
| **C2 rounded** | every pill rung's radius clamps to ≥ half-height (a true end-cap) | the 4px chip | `--radius-control` everywhere |
| **C3 GLASSY (painted)** | the chip lens SCREENSHOT-sampled over the REAL `.paper-field` reads OKLab **C ≥ 0.02 warm** (H ∈ [45,85]), BOTH modes; a `.glass-*` chip with NO `.paper-field` ancestor FAILS | the gray composite over the 0-field flat page | field mounts + lens transmits |
| **C3b backdrop** | every chip's computed `backdrop-filter` is NON-`none` (the warm-glass blur) | `none` everywhere | the lens composites |
| **C4 defined edge** | the chip carries a non-flat rim (`.glass-capsule` `--glass-rim-top` / ON `--accent-edge`) + a non-`none` lift cast | flat tinted rect | the lens composites |
| **C5 weighty flip** | toggle-ON: the chip center pre-dips OPPOSITE then the area overshoots ≥1.04× then settles; a `--motion-weight:0` control shows zero pre-dip/overshoot | the colour-only cross-fade | the cartoon-punch flood |
| **C5b flood-trails** | the `::after` accent bloom peaks AFTER the spatial leg (EFFECTS-trails-SPATIAL frame-ordering); a flood firing WITH the colour leg FAILS | — | the trailing transition delay |
| **C6 idle floor** | the union idle fill re-measures ≥3:1 over the lens | — (preserve) | the floor holds post-union |
| **C7 PRM** | one static frame at rest, no overshoot/bloom, colour + lens-lift present | — | `--motion-weight:0` carves cleanly |

**Detector self-test bites:** a chip reading `getComputedStyle` over a hardcoded field (not a
screenshot) RED; a 4/6/10px square radius surviving RED; a chip with no `.paper-field` ancestor
RED; the cell's `rounded-[0.625rem]→0px` defect RED; a `backdrop-filter:none` RED; a flood
firing WITH (not after) the colour leg RED; a `--motion-weight:0` killing anticipation RED; a
gray chip (`meanChroma < 0.02`) over the real field RED; a `light-dark()` `--chip-tint-floor`
fragment RED; an animated `box-shadow` (not a `::before` caster transform) on the loud variant RED.

> **The born-RED truth, stated honestly:** TODAY, on the real flat-page routes (0
> `.paper-field`), the chip composites GRAY at idle (C 0.013–0.018) and the geometry is a
> 4/6/10/pill grab-bag with no glass. The gate is born-RED on C1–C5 on HEAD — the HONEST read
> of the current flat condition. It goes GREEN only when the field mounts + the lens + the
> stadium + the punch land TOGETHER (the glass-material §3 RELATIONSHIP, at chip scale).

---

## L. DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the 116-wave set; no dup vs tabs/buttons)

| amendment | scope | gate | dup-check |
|---|---|---|---|
| **W-CHIP-CONGRUENT** | collapse `selectableChipVariants` + the `ToggleChip` axis → ONE `chipVariants({ size })`; every rung resolves `--radius-control` (cell = `--radius-card`) + the φ size axis; the three SFCs render the shared register; IconChip adopts `.glass-chip` | C1·C2 | NEW — the chip-family geometry/recipe unification; no tab/button overlap |
| **W-CHIP-GLASS-LENS** | `.glass-chip` (`glass/glass-chip.css`) composes `.glass-capsule` + `.glass-capsule-hover` + `.accent-tone`; the `accent-tone` idle warm-floor (`max(strength, --chip-tint-floor)`) | C3·C3b·C4·C6 | DEPENDS-ON tabs `.glass-capsule` (consume); DEPENDS-ON glass-material `W-GLASS-FIELD` (chip routes mount `.paper-field`); REFINES `.accent-tone` (idle floor) — a CONSUMER, no dup |
| **W-CHIP-FLOOD-PUNCH** | the on↔off tonal flood on `--ease-cartoon-punch` + `--chip-flood-t` reg + the `::after` accent-bloom (EFFECTS-trails-SPATIAL); the opt-in `cartoon`-loud `::before` shadow-caster | C5·C5b·C7 | CONSUMES tabs Band-0 `--ease-cartoon-punch`/`--motion-weight` (no re-mint); distinct from the tab indicator (per-chip flood, not a traveling indicator) |
| **W-CHIP-GROUP-INDICATOR** (opt-in) | `toggle-group type=single` → `.glass-capsule-track` well + `useTabIndicator` glide; multi-select keeps per-chip punch | tab gate | CONSUMES `useTabIndicator` + `.glass-capsule-track` |

**Reconcile vs neighbours:** DOWNSTREAM of the tabs material extract (adopts `.glass-capsule`,
never forks) and the Band-0 cartoon mint. No dup vs `W-TABS-LIQUID` (tabs own the gliding
indicator on the *strip*; the chip owns the 5-beat on the *individual toggle flip* — a distinct
gesture). No dup vs the buttons greenfield (buttons compose `.glass-capsule` for a *press*
control; the chip for a *toggle* — same material, distinct state-machine, the ≥4th-consumer
union the tabs GOLDEN envisioned). lens-b's bespoke metaball-gradient flood is explicitly NOT
adopted (KISS — the punch + the `::after` flood already deliver the liquid read).

---

## M. ACCEPTANCE (the gestalt bar — live-judge AS A USER, both modes, both engines)

On a FRESH capture of `/forms/toggle-chip` + `/forms/selectable-chip`, BOTH modes AND both
engines:

1. **CONGRUENT** — chip · cell · selectable · icon read as ONE family: same stadium radius,
   same pad rhythm, same warm-glass lens, same tonal language. No grab-bag. [C1]
2. **ROUNDED** — every inline chip is a true stadium pill (half-height end-caps), not a 4–10px
   square; the cell is a soft squircle card. [C2]
3. **GLASSY (painted)** — the chip is a warm-transmissive LENS over a visible warm field; the
   selected chip lifts off the field as a lit tonal lozenge; NO chip reads gray at idle OR
   active. [C3·C3b·C4]
4. **WEIGHTY** — the on↔off flip anticipates, the tonal colour FLOODS through the lens with
   overshoot, the bloom trails, and it settles soft. De-select plays it in reverse. Liquid,
   not a snap. [C5·C5b]
5. **Both modes** warm-luminous; dark GLOWS through the lens, never charcoal.
6. **A11y intact** — `aria-pressed` + keyboard + ≥44px tap + ≥3:1 idle + value.js-safe ink;
   PRM carves to a legible static chip.
7. **No-legacy / DRY** — ONE recipe, ONE size axis, ONE motion register; consumes five extant
   registers (`.glass-capsule`, `.accent-tone`, `--radius-control`, `.paper-field`,
   `--ease-cartoon-punch`); zero fork.
