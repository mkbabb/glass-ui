# CHIP FAMILY — greenfield, lens B (cross-engine / perf-first)

> ToggleChip · SelectableChip · IconChip (+ the toggle-group), redesigned from first
> principles so they read CONGRUENT, ROUNDED, and WARM-GLASS in both modes — Chrome AND
> Safari. The user's verbatim: *"none of these are styled CONGRUENTLY — should be more
> ROUNDED and GLASSY."*

---

## 0. LIVE ASSAY — the honest born-RED (chrome-devtools, painted-pixel, both modes)

Sampled `/forms/toggle-chip` + `/forms/select`, getComputedStyle + screenshot, on the
real page over the real warm field (`ancestorBg rgb(253,245,236)` = the warm-cream card),
light AND dark. The chroma reads below are computed from the **actual resolved oklab()**
the chip paints — NOT parse-oklab-as-sRGB, NOT composited over a hardcoded purple. A
near-gray idle is reported HONESTLY as a born-RED, not laundered.

### 0.1 CONGRUENCE — three different radii, three different registers (the grab-bag)

| element | variant | radius (live) | padding (live) | bg register | glass? |
|---|---|---|---|---|---|
| **ToggleChip** | `chip` | **4px** (`rounded-sm`) | `px-2 py-0.5` | `.accent-tone` fill | NO backdrop, NO rim |
| **ToggleChip** | `cell` | `0.625rem` (10px) | `px-2 py-2.5` | `.accent-tone` band | NO backdrop, NO rim |
| **SelectableChip** | `sm` | 4px | `px-2 py-0.5` | `.accent-tone` fill | NO backdrop, NO rim |
| **SelectableChip** | `md` | **6px** | `4px 12px` | `.accent-tone` fill | NO backdrop, NO rim |
| **SelectableChip** | `lg` | **10px** | `6px 16px` | `.accent-tone` fill | NO backdrop, NO rim |
| **IconChip** | (all) | **9999px** (pill) | (square, glyph-floored) | `--icon-chip-plate` `srgb 25%` | NO backdrop |
| *neighbour:* dock-tab | — | **9999px** | — | glass | yes (capsule) |

Three radii in ONE family (4 / 6-10 / 9999), and the family sits one row above a 9999px
dock-tab pill — the eye reads four corner languages at once. The user is right: it is a
mismatched grab-bag. **NONE of the chips paint a backdrop-filter, a rim, a specular, or a
shadow — they are FLAT FILLS.** "Glassy" is simply absent across the entire family. This is
the headline defect, not a nuance.

### 0.2 ROUNDED — every chip is a squared rounded-rect

`--radius-control` resolved to `--radius-pill` (BC.W-CONTROL-SMOOTH) for Checkbox + base
Tabs, but the chip family never adopted it. A 4-10px radius on a 32-38px-tall chip is
0.12-0.31-of-height — a rounded-rect, not the soft iOS-27 capsule the user asked for. The
sibling dock-tab is already a stadium pill; the chips are the laggards.

### 0.3 GLASSY / warm-not-gray — the idle fill is near-GRAY both modes (HONEST RED)

The `.accent-tone` `--accent-fill` mixes the tone into `--card` at only `8%`, so the IDLE
read is dominated by the warm-cream `--card` (good) but the **tone contribution is too
faint to clear chroma 0.02**:

| chip | mode | live bg (oklab, painted) | computed chroma √(a²+b²) | verdict |
|---|---|---|---|---|
| Vue (off/idle) | light | `oklab(0.940 -0.0017 0.0137)` | **0.0138** | < 0.02 → near-GRAY |
| Solid (off/idle) | light | `oklab(0.935 0.0042 -0.0004)` | **0.0042** | < 0.02 → GRAY |
| React (on/active) | light | `oklab(0.894 0.0285 -0.0106)` | 0.0304 | ≥ 0.02 → warm OK |
| Vue (off/idle) | dark | `oklab(0.336 0.0019 0.0182)` | **0.0183** | < 0.02 → near-GRAY |
| React (on/active) | dark | `oklab(0.377 0.027 -0.0009)` | 0.0270 | ≥ 0.02 → warm OK |

The ACTIVE band clears the warm floor; the IDLE fill does NOT (both modes). At rest — which
is how the user sees most chips most of the time — the family reads gray. Root cause #1
(flat-field) is moot here (the field IS warm-cream and transmits since there is no opaque
fill seam), but root cause #2 (the `--glass-tint-strength`-style dormant tint) bites: the
idle tone-admit is 8%, below the warm read. **Born-RED:** idle chip meanChroma < 0.02 both
modes over the real field.

### 0.4 STATE transition — no liquid weight

The shipped chip transitions are the §6 register (scale on `--spring-smooth`, surface legs
on `--ease-standard`). That is the correct CALM register but there is no on↔off PUNCH — the
selection flip is a color cross-fade with a scale settle, no anticipation, no overshoot, no
flood. The user's "liquid/weighty" ask (Band-0 cartoon-punch) is unmet on the state change.

---

## 1. THE CORE IDEA — ONE chip register: `.glass-chip`, a warm-glass capsule, three sizes, one accent seam

Survival of the fittest: `.accent-tone` (BC, the contrast-floored tonal seam) is FIT — keep
it as the COLOUR identity. `.glass-material` (AW.W22, the shared backdrop+rim+specular atom
that Switch/Button/Dialog already compose) is FIT — it is the missing GLASS the chips never
got. `--radius-control = --radius-pill` (BC.W-CONTROL-SMOOTH, the stadium for small inline
controls) is FIT — it is the ROUNDED the chips never adopted.

The redesign is a **union, not a fork**: mint ONE `.glass-chip` register
(`glass/glass-chip.css`) that COMPOSES the three extant fit primitives into the single chip
recipe the whole family shares. Every chip — ToggleChip(chip), ToggleChip(cell),
SelectableChip(sm/md/lg), IconChip — applies `.glass-chip` + `.accent-tone`. The chassis
(radius, padding, glass material, rim, motion) lives ONCE; only the SIZE rung and the
content layout (inline label vs stacked icon+label vs square glyph) differ per call site.

```
.glass-chip  =  .glass-material (backdrop + rim + specular, the warm-glass body)
              + .accent-tone    (the contrast-floored idle-fill / active-band / ink seam)
              + --radius-control (= --radius-pill → the stadium capsule)
              + the warm-floor admit (idle tone-admit lifted so chroma ≥ 0.02 both modes)
              + the cartoon state-flip (on↔off punch on --ease-cartoon-overshoot)
```

This is DRY (one register, N call sites), KISS (compose, do not invent a 4th glass path),
and DEFT (every cited primitive already ships — `.glass-material` material.css:36,
`.accent-tone` accent-tone.css:34, `--radius-control` radius.css:56,
`--glass-rim-top`/`--glass-rim-bottom` glass-fx.css:94-95, `--glass-tint-source: var(--card)`
glass-fx.css:122).

### 1.1 The shared chassis (the ONE recipe)

```css
/* glass/glass-chip.css — the single chip register the family shares. */
@layer components {
  .glass-chip {
    /* GLASS BODY — compose the shared atom, do not re-roll backdrop/rim/specular. */
    /* (apply .glass-material alongside; this register adds the chip-specific knobs) */

    /* ROUNDED — the stadium capsule. Small inline controls already round to
       --radius-control (= --radius-pill); the chip family adopts the SAME rung so a
       chip, a checkbox, a small tab, and a dock-tab share ONE corner language. The
       stadium clamps to half-height on a short box → a true end-cap at every size. */
    border-radius: var(--radius-pill);

    /* WARM-FLOOR (root-cause #2 fix) — the idle tone-admit is lifted from 8% to the
       warm-read floor so the resting chip clears chroma 0.02 over --card BOTH modes.
       The accent-tone register's idle strength is retuned ON the chip scope (a scope
       override, NOT a new channel — the accent-tone family stays canonical). The floor
       compose toward --glass-tint-source (= --card, the warm-cream) keeps the warmth
       FIELD-DEPENDENT, never a hardcoded hue spike. */
    --accent-fill-strength: 14%;   /* was 8% → clears 0.02 (de-risked vs the live read) */

    /* RIM — the iOS-27 directional edge: a bright top catch-light + a faint warm
       under-shadow. Reads from the shared glass-fx tokens; transmitted-through inset:0,
       NOT a halo. The defined edge §3 asks for. */
    box-shadow: var(--glass-rim-top), var(--glass-rim-bottom);

    /* MOTION — the calm §6 register (scale on --spring-smooth) for hover/press STAYS;
       the on↔off SELECTION flip gets the cartoon punch (§1.3). */
    transition:
      background-color var(--duration-fast) var(--ease-standard),
      border-color     var(--duration-fast) var(--ease-standard),
      box-shadow       var(--duration-fast) var(--ease-standard),
      color            var(--duration-fast) var(--ease-standard),
      scale            var(--spring-smooth-duration) var(--spring-smooth);
    scale: 1;
  }
  .glass-chip:hover  { scale: var(--scale-hover-btn); }   /* 1.05 lift  */
  .glass-chip:active { scale: var(--scale-press-btn); }   /* 0.97 settle */
}
```

The chip COMPOSES `.glass-material` so it gets the backdrop-filter (`--glass-blur-quiet`,
the same warm-glass blur the segmented-tab track rides), the grain/specular `::before`, and
the a11y-fallback (`.glass-material` is already in the `@supports not (backdrop-filter)`
flatten list — material.css / a11y-fallback.css). **No new glass path, no new fallback to
author.**

### 1.2 The SIZE axis — the ONLY thing that varies per call site

The CVAs collapse to a single shared `chipSize` scale (proportion is golden, not arbitrary):
padding rungs on the φ ladder, the radius is INVARIANT (always `--radius-pill` — the stadium
re-rounds itself at every height). The IconChip is the square degenerate (its content is the
glyph, so it floors at `glyph × ratio` and the pill clamps to a circle — already correct).

| rung | inline padding | text | use |
|---|---|---|---|
| `sm` | `px-2 py-0.5` | `text-caption` | dense filter rows (ToggleChip chip, SelectableChip sm) |
| `md` | `px-3 py-1` | `text-small` | default tag/tool pickers (SelectableChip md) |
| `lg` | `px-4 py-1.5` | `text-base` | prominent category chips (SelectableChip lg) |
| `cell` | `px-2 py-2.5` stacked | `text-micro` | square icon+label tile (ToggleChip cell) |
| `icon` | square, glyph-floored | — | IconChip (the pill clamps to a circle) |

Radius is `--radius-pill` for ALL rungs (the cell tile keeps `--radius-card`'s squircle ONLY
if it is a large glass surface ≥ `--radius-xl`; a small inline cell rounds to pill — congruent).

### 1.3 THE BOLDEST MOVE — the on↔off **liquid metaball selection flip** (the goo-fill, cross-engine)

Today the selection state is a flat color cross-fade. The boldest move: the active fill does
not fade in — it **floods in as a single liquid metaball** that wells up from the chip's
press-point (or center) and merges to fill the capsule, then the rim catch-light snaps. On
DESELECT it recedes the same way (squash & stretch, real weight). This is the iOS-27
"liquid-weight universal" applied to the most-toggled atom in the library, and it is the
goo-morph idiom the tranche already ships — REUSED, not re-forked.

**The cross-engine mechanism (KISS, compositor-only, Safari-perfect):**

- The flood is a `::after` pseudo carrying the `--accent-band` fill, clipped to the capsule
  (`inset: 0; border-radius: inherit; overflow: clip` on the host). It is driven by ONE
  scalar `--chip-flood-t: 0→1` on the `data-[state=on]` flip.
- The metaball WELL is a `radial-gradient` whose radius is `calc(var(--chip-flood-t) * 150%)`
  centered at `--chip-flood-x/y` (the press point, set once on pointerdown; defaults 50% 50%
  for keyboard). The gradient's hard-ish stop reads as a liquid blob filling the pill — NO
  SVG goo filter needed for a single-blob fill (the goo filter is for MULTI-blob merges; one
  blob welling into a rounded container is a gradient-radius animation, the simplest
  mechanism that hits the bar — KISS).
- The scalar rides **`--ease-cartoon-overshoot`** (Band-0 cartoon-punch token — see §4
  reconciliation; it must EXIST, currently only `--motion-ease-overshoot` ships) so the
  flood overshoots ~108% then settles — anticipation + follow-through, real liquid weight.
  The label/ink color cross-fades a beat AFTER the flood crests (EFFECTS trail SPATIAL, the
  v3 f006→f007 ordering).
- **Safari fence:** the whole flood is `background`/`transform`/`opacity` on a pseudo —
  compositor-only, sRGB gradient interpolation (NOT oklch in the gradient — Safari's
  oklch-gradient banding), NO `backdrop-filter: url()`, NO per-frame filter. It paints
  identically on WebKit. The `@media (prefers-reduced-motion: reduce)` arm sets
  `--chip-flood-t` to the END state instantly (no well, a hard fill) — the static floor.
- Offscreen-pause is free: the flood only animates on the `data-state` transition (a
  one-shot, not a loop), so there is no steady-state cost to pause.

This is the single move that turns the most boring atom (a flat toggle) into the signature
liquid-glass gesture — and it composes the extant goo/flood idiom (the dock accent-flood
`--dock-accent-flood-t` precedent, IOS27-REFERENCE.md:67) rather than inventing a new engine.

### 1.4 The CELL + ICON degenerates (no fork)

- **ToggleChip `cell`** = `.glass-chip` + stacked `flex-col` content + the `icon` slot. Same
  glass, same flood, same accent seam; only the layout axis differs. The square tile rounds
  to `--radius-pill` (small) → a superellipse-free soft squircle.
- **IconChip** = `.glass-chip` in its `icon` rung — the backplate it paints today
  (`--icon-chip-plate` `srgb 25%`) is RE-EXPRESSED as the `.accent-tone` idle fill so the
  whole family shares ONE plate recipe (the `in srgb` brand-overlay keep for IconChip is
  preserved as a per-scope `--accent-fill-space: srgb` override if proof:suffuse's byte
  target demands it — recorded, not silently switched). The pill clamp makes it a circle for
  free. Its reveal/bloom motion COMPOSES the same `--chip-flood-t` engine for the
  `data-active` glyph-pop.

---

## 2. CROSS-ENGINE (Chrome + Safari) + PERF

- **Glass body:** `.glass-material` already ships the `@supports not (backdrop-filter)` and
  `@supports (-webkit-backdrop-filter)` arms + the `prefers-contrast` WHC flatten +
  `forced-colors` — inherited for FREE. No new fallback surface to author.
- **Flood:** compositor-only (gradient-radius via a CSS var + transform/opacity), sRGB
  interp, single-blob (no SVG goo filter, no `filter:url()` on the live element). Static-floor
  on PRM. This is the simplest mechanism that hits the liquid bar — KISS over a WebGL/SVG
  metaball rig that a single-container fill does not need.
- **Rim:** `inset` box-shadow pair (`--glass-rim-top`/`--glass-rim-bottom`) — paints
  identically both engines, no light-dark() inset trap (plain per-mode arms via the dark-arm
  token override, MEMORY: lightdark_inset_shadow).
- **No steady-state cost:** chips are static at rest; the flood is a one-shot transition;
  `will-change: transform` is set on the flood pseudo ONLY during the transition window (added
  on pointerdown/state-flip, removed on transitionend) — never a permanent compositor layer.
- **GPU-only where it is a viz:** the chip is NOT a viz — no canvas, no rAF loop. The
  metaball is a CSS gradient. Zero JS animation frames.

---

## 3. A11Y / PRM CARVE

- ToggleChip + SelectableChip keep the reka-ui `Toggle` root → `aria-pressed` + keyboard +
  focus semantics UNCHANGED (the fit foundation, kept). The cell/icon variants are still a
  `Toggle`.
- `.accent-tone` keeps the contrast-floored ink (`--accent-ink`, value.js `safeAccentColor`)
  so the label clears AA over the resolved active band — the warm-floor lift to 14% idle is
  re-checked against the ≥3:1 idle floor (proof:accent-tone A4) so a LOUDER idle does not
  break the rest-state legibility.
- `prefers-reduced-motion: reduce` → flood is instant (hard fill, no well), hover/press scale
  drops to the no-overshoot bezier. The selection is NEVER conveyed by motion alone (the
  band + ink + rim are the state).
- `forced-colors` / WHC → `.glass-material`'s a11y-fallback flattens the glass to a system
  surface + the WHC edge; the chip stays a legible bordered toggle.
- `focus-ring` utility (already applied) → the visible focus ring is unchanged.

---

## 4. DELTA-ASSAY → WAVE AMENDMENT (reconcile vs the 116-wave set, no dup vs tabs/buttons)

**Token verification (grep'd, exists):** `.glass-material` ✓ (material.css:36),
`.accent-tone` ✓ (accent-tone.css:34), `--radius-control = --radius-pill` ✓ (radius.css:56),
`--radius-pill` ✓ (radius.css:25), `--glass-rim-top`/`--glass-rim-bottom` ✓ (glass-fx.css:94-95),
`--glass-tint-source: var(--card)` ✓ (glass-fx.css:122), `--card: hsl(30 85% 96%)` warm ✓,
`--accent-fill-strength: 8%` ✓ (accent-tone.css:39), `--scale-hover-btn`/`--scale-press-btn` ✓,
`--spring-smooth` ✓ (scheme-motion.css:236).

**Tokens that do NOT yet exist (must be DEPENDED, not silently cited):**
- `--ease-cartoon-overshoot` / the Band-0 cartoon-punch ease — **only `--motion-ease-overshoot`
  ships** (scheme-motion.css). The chip flood DEPENDS on the Band-0 cartoon-punch ease token;
  if Band-0 mints `--ease-cartoon-punch`, the chip flood points at it (the dock/cards floods
  share it — no chip-private ease).
- `.glass-capsule` / `.glass-capsule-hover` — **PROPOSED in tabs WAVE-AMENDMENT** (rename of
  `.glass-tab-capsule`), not yet on disk. If the tabs amendment lands the `.glass-capsule`
  warm-floor register, **the chip register SHOULD compose `.glass-capsule` instead of
  re-declaring the warm body** (one ≥3-consumer capsule: segmented pill · dock-tab · Button ·
  **chip**). This is the DRY convergence — the chip is the 4th consumer of the SAME capsule.
  Until it lands, `.glass-chip` composes `.glass-material` directly (the fallback path).

**The amendment (no new duplicative wave — AUGMENT the chip waves + DEPEND the shared register):**

1. **AUGMENT** the chip family onto ONE `.glass-chip` register (`glass/glass-chip.css`)
   composing `.glass-material` + `.accent-tone` + `--radius-pill`. Collapse the three CVAs
   (`toggleChipVariants`, `selectableChipVariants`, the icon-chip CSS) onto the shared
   `chipSize` axis — radius INVARIANT (`--radius-pill`), only padding/text/layout vary.
   **Clean break, no alias** (no-legacy): the 4px/6px/10px radii are DELETED.

2. **DEPEND** `.glass-capsule` (tabs WAVE-AMENDMENT clause 1-2). The chip register is the
   4th consumer — when the capsule warm-floor lands, `.glass-chip` re-points onto it (drop the
   chip-local `box-shadow`/blur, inherit the capsule's). Cross-link, no re-mint.

3. **DEPEND** the Band-0 `--ease-cartoon-punch` ease for the flood. The dock accent-flood
   (`--dock-accent-flood-t`, IOS27-REFERENCE.md:67) and the cards keyed-cel flood are the
   precedents — the chip flood is the SAME flood idiom on the toggle atom, ONE engine.

4. **GATE `proof:glass-chip`** (born-RED on HEAD), all over a LIVE field, both modes, painted
   pixel (NOT getComputedStyle-over-hardcoded — the cardinal fraud fence):
   - **C1 CONGRUENT** — all chip variants resolve the SAME radius (`--radius-pill` → stadium).
     Born-RED on HEAD: live radii are 4/6/10/9999 (four languages).
   - **C2 ROUNDED** — every chip radius clamps to half-height (a true end-cap, ≥ height/2).
     Born-RED on HEAD: 4-10px on a 32-38px chip.
   - **C3 GLASSY** — every chip paints a non-`none` `backdrop-filter` (the warm-glass blur) +
     the rim box-shadow. Born-RED on HEAD: `backdrop: none`, `box-shadow: none` on ALL chips.
   - **C4 WARM-NOT-GRAY** — the IDLE chip's resolved fill over the real `--card` field reads
     meanChroma ≥ 0.02 BOTH modes, measured from the PAINTED oklab (screenshot read or
     getComputedStyle of the real chip over the real page, NOT composited over a hardcoded
     purple). Born-RED on HEAD: idle Vue `oklab(0.940 -0.0017 0.0137)` → chroma 0.0138 light /
     `oklab(0.336 0.0019 0.0182)` → 0.0183 dark, BOTH < 0.02. Self-test bite: an 8% idle
     strength → C4 RED; the 14% warm-floor → GREEN.
   - **C5 LIQUID-FLIP** — the on↔off transition runs the `--chip-flood-t` flood on the
     cartoon ease (a paired chromium+webkit π asserts the flood paints identically + is
     compositor-only — no `filter:url()` on the live element, no per-frame backdrop re-blur).
   - **C6 PRM** — `prefers-reduced-motion: reduce` → flood instant, state conveyed by
     band+ink+rim (never motion alone).

5. **RESOLVE vs tabs/buttons (no dup):** the chip does NOT re-declare the capsule warm body
   or the specular-lift — it COMPOSES `.glass-capsule` + `.glass-capsule-hover` (the tabs
   amendment's shared primitives). The chip's UNIQUE contribution is (a) the `.accent-tone`
   tonal fill seam (chips are tonal, tabs are neutral-glass) and (b) the `--chip-flood-t`
   liquid selection flip. No overlap with the buttons greenfield (buttons are not toggles;
   they share only `.glass-material`).

---

## 5. SUMMARY

The chip family is three radii (4/6/10px) and ZERO glass — flat tonal fills, idle near-gray
both modes, sitting next to a 9999px dock-tab pill. The fix is ONE register, `.glass-chip`,
that COMPOSES three already-fit primitives — `.glass-material` (the warm-glass backdrop+rim
the chips never got), `.accent-tone` (the contrast-floored tonal seam, kept), and
`--radius-pill` (the stadium, adopted) — with the idle tone-admit lifted (8%→14%) so the
resting chip clears chroma 0.02 over the warm `--card` field both modes. Every chip
(ToggleChip chip/cell, SelectableChip sm/md/lg, IconChip) becomes the same warm-glass capsule
that varies ONLY in size/layout. **The boldest move:** the on↔off selection is no longer a
flat color fade — the active band FLOODS in as a single liquid metaball welling from the
press-point and merging to fill the pill (a compositor-only `radial-gradient`-radius scalar on
the Band-0 cartoon-punch ease, sRGB interp, no SVG goo filter, PRM-static), turning the most-
toggled atom in the library into the signature iOS-27 liquid-glass gesture — reusing the dock
accent-flood engine, never re-forking it.
