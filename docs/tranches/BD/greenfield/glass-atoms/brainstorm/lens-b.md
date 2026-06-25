# GLASS ATOMS — greenfield (LENS B: cross-engine / perf-first)

> Badge (+ metric-badge) · Slider · IconChip · StackedIconGroup — the small glass
> atoms that all consume the SHARED warm-glass register. ONE recipe, no per-atom
> fork. Designed through the **flawless-Chrome-AND-Safari + performance** lens:
> the simplest mechanism that hits the bar (KISS), compositor-only, offscreen-pause,
> @supports/PRM floors, NO `backdrop-filter:url`, sRGB color-interp where a goo path
> would otherwise be needed.
>
> **HONEST BUILD-DAG STANCE (grep-verified, NOT extant):** the register these atoms
> consume is a SPEC, not shipped. Verified live + by grep on `src/`:
> `.glass-capsule`=0, `warm-floor`=1 (a comment), `--motion-weight`=0,
> `--ease-cartoon-punch`=0, `.paper-field`=0. These are sibling-greenfield waves
> (`glass-material`, `toggle-chip`, `cartoon-shadow`, `motion-spring-register`,
> `page-background`, `tabs`) whose union-wave files are **not yet on-disk** in
> `docs/tranches/BD/union/waves/` (only `W-GLASS-ABROGATE-GRAY.md` is). So this
> wave-amendment **DEPENDS-ON** those primitives and is BORN-RED until they land —
> it never claims them extant. What IS extant + consumed deftly: `--glass-fill-tint`/
> `--glass-fill-strength` (`glass.css:399`, HEAD-minted), `--radius-badge`/
> `--radius-control` = `--radius-pill` (`radius.css:56-57`), `--shadow-cartoon-{sm,md,lg}`
> (`bridges.css:314` → `cartoon-shadow` dark-arm), `--section-color-N` ramp,
> `.accent-tone` (`glass/accent-tone.css`), the spring `linear()` register
> (`--spring-smooth` 0.45s / `--spring-bouncy`), the icon-chip `in srgb` plate.

---

## 0. THE LIVE DELTA-ASSAY (painted-pixel, real page, both modes — the born-RED witness)

Sampled `getComputedStyle` over the REAL routes on `localhost:5173` (NOT a hardcoded
field — the recurring fraud). This is the honest BORN-RED condition over the flat page.

| atom / route | LIGHT painted state | DARK painted state | verdict |
|---|---|---|---|
| **Badge** `/display/badge` `default` | bg `oklch(0.552 0.192 359.8)` (loud red-magenta plate), border `rgba(0,0,0,0)`, **`box-shadow: none`**, radius `9999px` | — | OPAQUE loud plate; NO glass, NO warm-floor, NO cartoon cast. The brand plate is fine for the LOUD variant but the NEUTRAL/`outline`/`secondary` badges have no warm-glass body |
| **field behind** | `rgb(251,250,248)` + paper SVG — warm but **near-achromatic** (the §3 flat-field root #1) | — | the badge/metric float over a flat cream; glass has nothing to transmit |
| **metric-badge** `/display/metric-badge` | bg `oklab(0.974 0.006 0.014 / 0.5)` warm-translucent ✓, backdrop `blur(8px) saturate(1.35) brightness(1.16)` ✓ | bg `oklab(0.974 …/0.5)`, **hover shadow = `--shadow-cartoon-sm`** | the metric glass body is healthy; the **hover cast is the K5 defect** |
| **`--shadow-cartoon-sm`** (the cast) | `color(srgb 0.11 0.098 0.09 / 0.1)` — chroma≈0 grey, 1px blur | `color(srgb **0.914 0.9 0.886** / 0.1)` — **near-WHITE L≈0.90, chroma≈0** | **K5 CONFIRMED**: the dark cartoon ink flips to a near-white sticker-GLOW (not a bold offset); both modes are achromatic (not technicolor) |
| **Slider** `/forms/slider` track | `srgb 0.963 0.953 0.937 / 0.5` (translucent, warm-ish, very light) | — | track reads as a faint cream capsule (low chroma) |
| **Slider** range fill | `oklab(0.216 0.0035 0.0052 / 0.88)` (**near-BLACK**) + `blur(8px) saturate(1.4)` + rim | — | the filled glass cylinder reads as a DARK bar, NOT a warm-glass fill; the `--primary` tint resolves dark |
| **Slider** thumb | width `0px`, opacity `0`, transition `transform 0.2s --spring-smooth` | — | invisible-thumb (standard recipe ✓); press is a uniform `scale(0.97)` — NO vol-preserving squish |
| **StackedIconGroup** overflow `+N` | bg `rgb(248,113,113)` (red-400 hardcode), border `rgb(251,250,248)`, **`box-shadow: none`** | — | **off-register**: a flat red `+N` chip, NO glass, NO warm-floor, NO congruence with the chip family; uses `shadow-cartoon-sm` only on hover (→ K5) |

**The two §3-gray root causes, both confirmed live:**
- **#1 flat-field** — the field behind every atom is `rgb(251,250,248)`, near-achromatic;
  the warm READ is field-dependent and there is no colorful field TRANSMITTED `inset:0`
  behind the atoms. This is the `BD.W-GLASS-FIELD` dependency (the chassis must mount
  `<PaperBackdrop field>`).
- **#2 dormant-tint** — there is no real warm-FLOOR decl on the atoms' bodies; the
  neutral badge / `+N` chip / slider track default to the achromatic base. This is the
  `--chip-tint-floor` / `.accent-tone` warm-floor widen (the `toggle-chip` dependency).

**The cartoon K5 defect** (its own root): `--shadow-cartoon-sm` is achromatic in BOTH
modes and FLIPS to near-white in dark — the `cartoon-shadow` sibling's `BD.W-CARTOON-CEL-INK`
re-points the ink to a warm chromatic figure-ground form. The atoms (metric-badge hover,
`+N` hover) are CONSUMERS of that fix; they do not re-author it.

---

## 1. THE CORE IDEA — ONE warm-glass register, FOUR consumers, ZERO fork

The four atoms are not four problems; they are **four faces of one tinted-glass lozenge**.
The library already ships the seam (`--glass-fill-tint` over a translucent capsule) and
the radius (`--radius-pill`); the siblings are landing the field, the warm-floor, the
cartoon cel-ink, and the motion-weight curve. This lens's job is to make all four atoms
**deft consumers** of that ONE register — and to make the consume **cross-engine flawless
and cheap** (the part the other lenses under-weight).

The register, named once:

```
.glass-atom  (the shared lozenge — declares ZERO own glass tokens; composes the DEPENDED capsule)
  ├─ radius          : --radius-control (= --radius-pill)          [EXTANT]
  ├─ body fill       : --glass-fill-tint @ --glass-fill-strength   [EXTANT axis, DEPENDED ladder]
  ├─ warm floor      : max(local-strength, --atom-tint-floor)      [DEPENDED toggle-chip floor]
  ├─ edge            : --glass-key keyed two-stop rim + warm border [DEPENDED glass-key-edge]
  ├─ cast (opt-in)   : --shadow-cartoon-* (warm cel-ink, 0-blur)   [EXTANT util, DEPENDED cel-ink fix]
  ├─ field behind    : <PaperBackdrop field> at the chassis        [DEPENDED glass-field]
  └─ motion          : --motion-weight × --ease-cartoon-punch       [DEPENDED motion register]
```

Each atom is a **specialization** of `.glass-atom`, differing ONLY in geometry + which
optional legs it lights:

| atom | body | floor | cast | motion specialization |
|---|---|---|---|---|
| **Badge** (neutral/status) | tinted-glass lozenge | warm-floor ON | cast OFF (calm) | hover lift only |
| **Badge** (loud: default/destructive/success…) | OPAQUE brand plate (kept) | n/a | cast OFF | hover lift |
| **metric-badge** | tinted-glass lozenge | warm-floor ON | **cast ON** (value-lift sticker) | hover squish-lift + cel cast |
| **IconChip** | `in srgb` brand plate (KEPT) OR `surface=glass` tinted lozenge | plate-strength / warm-floor | cast OFF | reveal-bloom + hover-grow (extant clock) |
| **StackedIconGroup `+N`** | tinted-glass lozenge (congruent w/ IconChip) | warm-floor ON | cast OFF | expand-on-hover translate+grow |
| **Slider** track | translucent warm capsule | warm-floor ON | n/a | — |
| **Slider** range | tinted-glass cylinder (warm, not dark) | n/a | n/a | press = vol-preserving SQUISH |

**DRY proof:** every atom resolves the SAME four tokens (`--radius-control`,
`--glass-fill-tint`, `--atom-tint-floor`, `--glass-key`) and the SAME cast util +
motion register. No atom mints a glass token, a radius, or a spring. The fork count is
ZERO — the difference is which legs are lit, set by `data-*` / variant, not by a parallel
CSS file. This is the chip-family amendment's `.glass-chip` discipline, GENERALIZED across
the badge + slider + stacked-icons (which that amendment scopes out).

---

## 2. PER-ATOM SPEC (visual · motion · mechanism)

### (A) BADGE — the warm-glass lozenge (neutral) keeps the loud brand plate (loud)

**The defect:** the `default` badge is a loud opaque plate (correct for a status pill),
but the **neutral / `outline` / `secondary`** badges have no warm-glass body and no
warm-floor — they read flat over the flat field (§3-gray #2). And NO badge carries a
defined edge over a cream host (§3 #1, the same melt-into-host the Select trigger has).

**Greenfield:**
- **Two registers, by variant tone, no third path:**
  1. **LOUD** (`default`/`destructive`/`success`/`warning`/`info`) — KEEP the opaque
     brand plate (a status pill MUST be loud + AA-legible; the de-RED'd default
     `oklch(0.552 0.192 359.8)` + the dark-destructive deepen are correct, FROZEN). These
     carry the keyed rim + a calm warm cast OPT-IN, nothing else changes.
  2. **QUIET** (`secondary`/`outline` + a new `glass` variant) — the `.glass-atom` lozenge:
     `--glass-fill-tint` body over the capsule, warm-floor ON, keyed rim, α<1 so the field
     transmits. This is where the warm-not-gray read is won.
- **Geometry:** radius `--radius-badge` (= pill, EXTANT). φ padding rungs (the √φ ladder,
  the size axis already rides `--control-text-{sm}`/`--ui-scale` — KEEP).
- **Motion:** hover lifts to the resting glass rung (extant); a calm cel cast is OPT-IN
  (`data-cast` / a `surface="cartoon"` parallel) — the loud status pill does NOT cast by
  default (a status badge is INFORMATION, not a card; the cast is the metric-badge's
  affordance).
- **Mechanism:** `badgeVariants` gains a `glass` variant + a tone-routed body; the QUIET
  arms compose `.glass-atom`. ZERO new glass token.

### (B) metric-badge — the value-lift STICKER (the cast register's flagship; K5-cured)

**The defect:** the body glass is healthy (witnessed: `oklab(0.974 …/0.5)` warm +
`blur(8px) saturate(1.35)`), but the hover cast = `--shadow-cartoon-sm` which is the K5
near-white-in-dark sticker-GLOW. The cast carries no warm cel register and FLIPS.

**Greenfield (the cast is a CONSUMER of the cured ink, plus a real squish):**
- **The cast** rides the DEPENDED `BD.W-CARTOON-CEL-INK` re-pointed `--shadow-cartoon-sm`
  (warm chromatic ink, 0-blur, figure-ground dark arm). The metric-badge does NOT touch
  the token — when cel-ink lands, the hover cast becomes a bold warm offset in BOTH modes;
  the K5 white-flip is gone by construction (the fix is upstream, the badge inherits).
- **The hover is a vol-preserving SQUISH-LIFT, not a uniform scale.** Today: `translate
  -2px` + `scale 1.04` (uniform). Greenfield: `scale: 1.05 0.96` (widen X, compress Y — the
  cartoon squash) + `translate -2px`, eased by `--ease-cartoon-punch` × `--motion-weight`
  (DEPENDED). The press is the inverse: `scale: 0.96 1.04` (the rebound). The cast lags
  the host by ~1.15× (follow-through) — the sticker peels up a frame behind the body.
- **`data-just-resolved` catch-light** (the speedtest phase-finish streak) is KEPT — it's
  a quiet specular, congruent.
- **Mechanism:** the existing `.metric-badge` utility (`components.css:66`) — re-point the
  hover `scale` to non-uniform + add the `--ease-cartoon-punch`/`--motion-weight` legs.
  No new component.

### (C) SLIDER — the WARM track + WARM fill (not a dark bar) + a real press-squish

**The defect:** the range fill resolves `oklab(0.216 …/0.88)` — a near-BLACK bar (the
`--primary` tint is dark), so the "filled glass cylinder" reads as a dark stripe, not warm
glass. The press is a uniform `scale(0.97)` (no squish, no weight — violates the Band-0
motion law + the liquid-weight-universal precept).

**Greenfield:**
- **The track** stays the translucent warm capsule (witnessed `srgb 0.963 0.953 0.937 / 0.5`
  — fine), but its body floor reads `--atom-tint-floor` so it is warm-not-grey over a flat
  host (the §3 #2 cure, DEPENDED).
- **The fill (range)** is the `.glass-atom` lozenge tinted by `--glass-fill-tint` — a WARM
  glass cylinder, not the dark `--primary` bar. A consumer who wants a brand-colored fill
  sets `--slider-range-bg`; the DEFAULT identity is the warm-glass fill (presets-in-consumers:
  the loud brand color is the consumer's choice, the lib's default is the warm material).
  This is the single visual re-point that fixes "the fill reads dark/grey not warm."
- **The drag is liquid + weighty** (the Band-0 law + the keep-dock-open contract, both
  EXTANT + KEPT): the press gives the WHOLE continuous track a **vol-preserving squish** —
  `scale: 0.98 1.03` on `:active` (compress along-axis, bulge cross-axis — a real liquid
  give), eased by `--spring-smooth` (the press register, NOT bouncy — a slider press settles).
  The `data-held` halo (dock-keep-open) intensifies the rim (EXTANT). The `keepDockOpen`
  + `useDockHold` + `useTouchGate` arbitration are UNTOUCHED (device-proven, AX.W03).
- **Mechanism:** re-point `.slider-range` default background to `--glass-fill-tint` over the
  capsule; re-point the `:active` transform to the non-uniform squish. The invisible-thumb
  standard recipe + the spectrum recipe are KEPT.

### (D) IconChip + StackedIconGroup — congruent with the chip family

**The defect:** IconChip is healthy (the `in srgb` section-color plate — a deliberate,
recorded brand-overlay register, KEEP). But **StackedIconGroup's `+N` overflow chip is
off-register**: flat `rgb(248,113,113)` red-400 hardcode, `box-shadow:none`, no glass, no
warm-floor, no congruence — it looks like a different library.

**Greenfield:**
- **IconChip** keeps its `in srgb` brand plate (fence AW.W26 — do NOT force it through
  `.accent-tone`'s `in oklab` mix, which would shift the pop). It adopts ONLY: the
  `--radius-control` congruence (already pill) + (for `surface="glass"`) the
  `--glass-fill-tint` axis from `BD.W-ICONCHIP-GLASS` (DEPENDED, cross-linked). The reveal
  + hover-bloom ride the extant `--spring-snappy`/`--spring-smooth` clock (KEEP — it's
  already alive). No re-author.
- **StackedIconGroup `+N`** is RE-POINTED onto `.glass-atom`: tinted-glass lozenge (congruent
  with IconChip's geometry + the chip family), warm-floor ON, `--radius-control`. The
  hardcoded `bg-[red-400]` / `bg-background` is REMOVED (no-legacy). The `expand-on-hover`
  translate+grow is KEPT (it's the StackedIcon affordance) but the chip's BODY now reads
  warm glass, and the hover cast (if opted) rides the cured cel-ink. The icon slots
  themselves remain consumer-provided (the slot API is fine).
- **Mechanism:** swap the `+N` chip's inline Tailwind plate for the `.glass-atom` class;
  the `shadow-cartoon-*` already in use becomes correct once cel-ink lands. ZERO new token.

---

## 3. THE CROSS-ENGINE / PERF SPEC (the lens's load-bearing contribution)

These atoms are CHEAP — there is no goo, no metaball, no GPU here. The cross-engine bar is
about the glass + cast + motion being flawless on WebKit and never paint-bound. The rules:

1. **NO `backdrop-filter:url()` anywhere in the atom path.** The atom body uses
   `backdrop-filter: blur() saturate() brightness()` ONLY (the metric-badge already does —
   witnessed `blur(8px) saturate(1.35) brightness(1.16)`, Safari-native). No SVG goo filter
   is needed (these atoms don't merge/morph). This is automatically Safari-safe.
2. **The cast is a `box-shadow`, set ONCE per state-flip — NEVER animated per-frame** (the
   §L7 paint-fence). The cast's MOVEMENT rides `translate`/`scale` (compositor channels), not
   an animated `box-shadow` value. This is the `cartoon-caster` discipline: the ink-plate is
   a static `box-shadow`, the plate TRANSLATES. Cross-engine identical.
3. **All motion is compositor-only** — `transform` (scale/translate) + `opacity` + the
   `box-shadow` flip. No `width`/`height`/`top`/`left` animation (the slider invisible-thumb
   value-follow is reka's inline inset, owned). `proof:no-layout-animation` holds.
4. **sRGB / oklab color-interp** — the warm-floor `color-mix` is `in oklab` (the perceptual
   warm mix, the no-gray discipline); the IconChip brand plate is `in srgb` (the recorded
   brand-overlay keep). Neither path needs `in lch`/hue-interp (no rainbow sweep here), so
   there is no Safari gamut-interp surprise. The cel-ink uses `oklch(from …)` with an
   `@supports` sRGB-literal floor (DEPENDED — the cel-ink wave owns the floor).
5. **`@supports`/PRM floors:**
   - `prefers-reduced-motion: reduce` → `--motion-weight: 0` (zeroes the squish/lift/cast-lag
     in ONE assignment, DEPENDED) + the cast stays a STATIC bold stamp (legibility kept).
   - `prefers-reduced-transparency: reduce` → the glass body floors toward the opaque escape
     (`--glass-level: 0` path, EXTANT) — the warm tint stays (warm-but-static), the blur
     drops to 0. The atoms inherit the band's behavior; no atom-specific carve.
   - `corner-shape: superellipse(2)` is `@supports`-gated for the squircle-curve REFINE (the
     slider spectrum thumb already does this, AX.W56) — the round pill is the honest base on
     the ~35% without it.
6. **Offscreen-pause / park** — N/A for these atoms (no rAF, no canvas, no GPU context). The
   motion is CSS transition-driven (event-gated: hover/active/reveal), so an offscreen atom
   costs ZERO — no loop to park. This is the KISS win: the cheapest mechanism that hits the
   liquid-weight bar is a CSS transition on a compositor channel, not a JS rAF clock. (The
   IconChip reveal IS a one-shot directive-driven clock, already park-safe.)
7. **The field is CSS `radial-gradient` + `oklch()` + `transform` drift** (DEPENDED
   `BD.W-GLASS-FIELD`) — Chrome+Safari native, no `backdrop-filter:url`, no SVG. The atoms
   transmit it through their own `backdrop-filter: blur()` — the transmission is the browser's
   native blur sampling the field behind, identical on both engines.

**The performance net:** the entire atom register adds ZERO new rAF clocks, ZERO new GPU
contexts, ZERO per-frame paint. Every "liquid" beat is a compositor transition on an
event. This is the perf-first lens's verdict: the atoms are the place to PROVE that
liquid-weight does NOT require a JS spring loop — a `--ease-cartoon-punch` `linear()`
transition on `transform` is weighty, gooey, cross-engine, and free.

---

## 4. THE BOLDEST MOVE

**Collapse the four atoms onto ONE `.glass-atom` lozenge class whose ONLY job is to be
the deft consumer of the warm-glass register — and prove, on these trivial atoms, that
the entire iOS-27 liquid-weight feel (squish, weight, cel-cast, warm transmission) is
achievable with ZERO JavaScript, ZERO GPU, ZERO per-frame paint — a single
`--ease-cartoon-punch` `linear()` transition on `transform` + a once-per-flip warm
`box-shadow`.** The atoms become the library's PROOF that liquid-weight is a token
contract, not an engine. The badge `+N`-chip / slider-fill / metric-sticker all read warm
glass + congruent + liquid in both modes — by inheriting four tokens, not by forking four
recipes. The single most legible re-point: **the slider range fill flips from the dark
`--primary` bar to the warm `--glass-fill-tint` glass cylinder** — the one change that
turns "the slider reads as a grey/dark control" into "a warm-glass instrument," with the
brand color demoted to a consumer override (presets-in-consumers).

---

## 5. THE WAVE-AMENDMENT (ONE wave, all atoms; reconciled vs the 116-wave set; build-DAG cited)

### NEW — `BD.W-GLASS-ATOMS-CONGRUENT` (Band 7 — controls/glass-for-every-element)

ONE wave covering Badge(+metric) · Slider · StackedIcon `+N`; IconChip is a CROSS-LINK
(its glass register is owned by `BD.W-ICONCHIP-GLASS`).

- **DEPENDS (HARD — the build-DAG; RED-as-ERROR until each lands in `src/`):**
  - `BD.W-GLASS-FIELD` (the chassis mounts `<PaperBackdrop field>` — the §3 #1 flat-field
    cure; **NOT extant**, sibling-greenfield)
  - the warm-floor decl (`--atom-tint-floor`, the `toggle-chip` `--chip-tint-floor` pattern
    GENERALIZED — the §3 #2 dormant-tint cure; **NOT extant**)
  - `BD.W-TINTED-CHIP` (the `--glass-fill-tint` ladder CONSUME-wire; the axis is HEAD-minted
    at `glass.css:399`, the wire is DEPENDED)
  - `BD.W-GLASS-KEY-EDGE` (the keyed rim + warm border — the defined-edge; **NOT extant**)
  - `BD.W-CARTOON-CEL-INK` (the warm 0-blur chromatic cast that CURES K5 — the metric-badge
    hover + `+N` hover cast consume it; **NOT extant**)
  - `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (`--motion-weight`/`--ease-cartoon-punch` —
    the squish/lift/follow-through; **NOT extant**)
  - `BD.W-TAB-IOS-CAPSULE` (AUGMENTed to EXTRACT `.glass-capsule`/`-hover` — the lozenge
    body; **NOT extant as a shipped class**)
- **CROSS-LINK:** `BD.W-ICONCHIP-GLASS` (IconChip's glass register + `in srgb` plate keep —
  this wave adds geometry congruence only, no re-author).
- **Scope:**
  1. **`.glass-atom` shared lozenge** (`src/styles/glass/glass-atom.css`, `@layer components`):
     composes the DEPENDED `.glass-capsule` + `.accent-tone` + the warm-floor widen
     (`max(local, --atom-tint-floor)`, PLAIN per-mode pair 12%/15%, NEVER `light-dark()`),
     tints body via `--glass-fill-tint`, radius `--radius-control`. Declares ZERO own glass
     token (the no-fork fence). This IS the chip-family's `.glass-chip` GENERALIZED — if the
     chip wave lands first, `.glass-atom` may simply BE `.glass-chip` re-used (verify at
     build; prefer reuse over a sibling class).
  2. **Badge** (`badgeVariants` + `Badge.vue`): add a `glass` variant + route
     `secondary`/`outline` through `.glass-atom` (QUIET register); the LOUD status variants
     keep the opaque brand plate (FROZEN) + gain the keyed rim. φ/size axis UNTOUCHED.
  3. **metric-badge** (`components.css`): re-point hover `scale` → non-uniform squish-lift
     (`1.05 0.96`) on `--ease-cartoon-punch`×`--motion-weight`; the cast inherits the cured
     `--shadow-cartoon-sm`. `data-just-resolved` catch-light KEPT.
  4. **Slider** (`Slider.vue` scoped CSS): re-point `.slider-range` default bg →
     `--glass-fill-tint` over the capsule (warm fill, not dark `--primary` bar; `--slider-range-bg`
     stays the consumer override); re-point `:active` transform → vol-preserving squish
     (`0.98 1.03`) on `--spring-smooth`. The `keepDockOpen`/`useDockHold`/`useTouchGate`/
     invisible-thumb/spectrum recipes are UNTOUCHED.
  5. **StackedIconGroup** (`StackedIconGroup.vue`): swap the `+N` chip's inline
     `bg-[red-400]`/`bg-background`/`border-background` plate for `.glass-atom` (warm-glass,
     congruent); the `expand-on-hover` translate+grow KEPT. Remove the hardcode (no-legacy).
- **GATE — `proof:glass-atoms` + `tests-visual/glass-atoms.spec.ts` (born-RED, Chromium +
  WebKit, both modes; painted-pixel over a REAL field, NOT getComputedStyle over a hardcoded
  field):**
  - **A1 warm-not-gray** — each atom's PAINTED composite over the real field reads
    C ≥ FIELD_FLOOR warm, H ∈ [45,85]. Born-RED on the live flat-field state (badge `box-shadow:none`
    + flat field, slider dark fill, `+N` red plate).
  - **A2 defined-edge** — each atom carries the keyed rim (non-flat) + border α ≥ 8% warm;
    ΔL vs host ≥ 3:1 (WCAG 1.4.11). Born-RED (badge/`+N` `box-shadow:none` live).
  - **A3 cast-cured (K5)** — the metric-badge + `+N` hover cast oklch chroma ≥ 0.09, 0-blur,
    AND in DARK |L_ink − L_card| ≥ 0.12 (figure-ground, NOT the white-flip). Born-RED:
    live `--shadow-cartoon-sm` dark = `srgb 0.914 0.9 0.886` (L≈0.90 white-flip, chroma≈0).
  - **A4 slider-fill-warm** — the range default bg resolves C ≥ warm-floor (NOT the dark
    `oklab(0.216 …)` bar). Born-RED live.
  - **A5 liquid-squish** — mid-press, scaleX ≠ scaleY (vol-preserving squish, NOT a uniform
    scale) on metric-badge + slider. Born-RED: live press is uniform `scale(0.97)`/`1.04`.
  - **A6 paint-fence** — NO per-frame `box-shadow` value change during press/hover
    (compositor-only). Self-test bite: a planted animated-box-shadow MUST red.
  - **A7 cross-engine** — run BOTH engines; a Chrome-only pass is not a pass. The atoms have
    no goo path, so WebKit parity is the `backdrop-filter: blur()` + `box-shadow` + `transform`
    set — all Safari-native (the spec asserts no `backdrop-filter:url` appears in the atom CSS).
  - **A8 PRM/PRT** — under PRM the squish/cast-lag hold at rest, the static bold stamp +
    warm tint persist; under PRT the blur drops, the warm tint stays.
  - **Self-test guard** — A1/A4 MUST fail on a flat-base field + a dark fill, PASS on the warm
    field + warm fill (proving they read the chroma layer, not the achromatic base — the
    `getComputedStyle().backgroundColor` fraud guard).
- **Overfit bar:** `.glass-atom` has 4+ consumers (badge-quiet · metric · slider · `+N`),
  clearing the ≥2-site rule by construction.

### AUGMENT — `BD.W-TINTED-CHIP` (one-line consumer-ledger)
Add the glass-atoms (`.glass-atom`: badge-quiet, metric, slider-range, `+N`) to the
`--glass-fill-tint` consumer-evidence ledger. No `--glass-fill-tint` edit (the atoms read
the axis, define none).

### AUGMENT — `BD.W-CARTOON-CEL-INK` (one-line consumer-list)
Add the metric-badge hover cast + the StackedIcon `+N` hover cast as recorded
`--shadow-cartoon-*` consumers (the cure's beneficiaries). No token edit.

### CROSS-LINK — `BD.W-ICONCHIP-GLASS`
No edit. IconChip's glass register + `in srgb` plate keep are owned there; this wave adds
only the geometry congruence note (already `--radius-pill`).

### PRUNE / EXCISE
- **PRUNE: none.** No existing wave removed.
- **EXCISE from this design's scope:** any "the register is shipped" claim — every glass/
  floor/edge/cast/motion leg is DEPENDED (grep-verified absent); the wave is born-RED and
  ERRORS (no-such-token) before the upstreams land. The only EXTANT seams consumed:
  `--glass-fill-tint` (axis), `--radius-control`, `--shadow-cartoon-*` (util), `--spring-smooth`,
  the icon-chip `in srgb` plate.

### NET
**1 NEW wave (`BD.W-GLASS-ATOMS-CONGRUENT`) + 2 one-line AUGMENTs + 1 CROSS-LINK + 7 HARD
DEPENDs.** ZERO new glass material, ZERO new motion register, ZERO new field, ZERO new cast
token, ZERO parallel atom system. The four atoms become the deft ≥4-consumer face of the
ONE warm-glass register — warm, congruent, liquid, both modes, flawless + free on Chrome AND
Safari — by inheriting tokens, not forking recipes.

---

## 6. RECONCILE NOTE (vs the 116-wave set + the IOS27-REFERENCE bar)

- This does NOT dup the dock/fission/drawer/dotflow work (T1–T17) — the atoms are the
  TRIVIAL glass tier, downstream of Band-0 + the chip/tabs/glass-material siblings.
- It UNIONS with `BD.W-TINTED-CHIP` / `BD.W-ICONCHIP-GLASS` / `BD.W-CHIP-CONGRUENT-GLASS`
  (the chip family) — the chip wave scopes ToggleChip/SelectableChip/IconChip; THIS wave
  extends the SAME `.glass-atom`/`.glass-chip` register to the three atoms that wave scopes
  OUT (badge, slider, stacked-icons). If `.glass-chip` lands first, `.glass-atom` reuses it
  (verify; prefer reuse).
- The IOS27 bar these atoms must clear: warm transmissive glass (NEVER gray, both modes,
  the BA.W-NO-GRAY floor) + the cartoon cel-cast (technicolor, K5-cured) + liquid-weight
  squish on EVERY press (the universal law) + √φ proportion (the size ladder, EXTANT) —
  all met by the consume, none re-authored.
