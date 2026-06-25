# GLASS ATOMS — greenfield brainstorm (lens-a)

> Badge (+ metric-badge) · Slider · IconChip · StackedIconGroup — the trivial glass atoms
> that all consume ONE shared warm-glass register. Designed GREENFIELD from iOS-27 first
> principles; the status-quo source was read to know what to keep/refine/re-invent, never to
> anchor. Live-inspected 2026-06-24 on Chrome :5173, painted-pixel + getComputedStyle, the real
> demo routes. The shared register is honestly a BUILD-DAG dependency (grep-verified below), NOT
> extant — this design DEPENDS-ON the primitive waves and never claims-extant.

---

## 0. THE LIVE READ (honest, painted-pixel, born-RED conditions)

`getComputedStyle` over the real routes + screenshots (`scratchpad` captures, since deleted).
Field count behind every atom: **`document.querySelectorAll('[data-paper-field]').length === 0`** —
the §3 flat-field root-cause #1 is live: 0 colorful fields behind the glass, so a translucent
plate transmits a flat `--neutral-0` and reads gray.

| atom | route | LIVE resolved (real paint) | the defect |
|---|---|---|---|
| **Badge** (all variants) | `/display/badge` | `backdrop: none`, `box-shadow: none` on **every** variant; `default` = solid `oklch(0.552 0.192 359.8)` opaque crimson; `secondary` = solid `rgb(237 230 222)` opaque sand; section-tone ramp = **solid saturated jewel pills** | **ZERO glass.** Pure flat shadcn plates. No transmission, no warm-cream register, no defined glass edge, no cartoon cast. The loudest atom is the least glassy. |
| **metric-badge** | `/display/metric-badge` | `background: --glass-bg-quiet` (`color-mix … light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) …`), `backdrop: blur(9px) saturate(1.4) brightness(1.02)`, hover `box-shadow: --shadow-cartoon-sm` | **The ONLY truly-glass atom** — warm-cream plate, real blur. But over the flat (0-field) page it composites toward gray (§3 #1), and its hover cartoon cast suffers **K5**: `--shadow-cartoon-md` resolves `… light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 12% …` → in dark the ink FLIPS to near-white `hsl(30 14% 90%)` = the iOS-7 sticker-glow. |
| **Slider** (standard) | `/forms/slider` | track `color(srgb 0.963 0.953 0.937 / 0.5)` (faint cream, 20px, pill); **range fill `oklab(0.216 0.0035 0.0052 / 0.88)`** = near-black, chroma ≈ 0.006 = **GRAY/BLACK**, `blur(8px) saturate(1.4)` | The filled cylinder is the dark `--primary` over a flat field → reads a **flat black bar**, NOT warm liquid glass. The drag/press machinery (keep-dock-open, touch-gate, invisible-thumb) is RIGHT and stays; the MATERIAL of the fill is wrong. |
| **StackedIconGroup** | `/display/stacked-icons` | flat opaque colored discs (`bg-[color]`, `border-2 border-background`); `+N` overflow = `bg-background` + `shadow-cartoon-sm` (the lone cartoon-shadow consumer) | The icon discs are flat color, no glass; congruent with NOTHING in the chip family. The `+N` chip inherits K5 in dark. |
| **IconChip** (source) | `icon-chip.css` | `--icon-chip-plate-color` backplate, `color-mix(in srgb, …)` brand-overlay plate, **no `backdrop-filter`**, owned radius | A deliberate `in srgb` brand-pop plate (fence AW.W26) — NOT a glass lens. Distinct register from toggle-chip/selectable-chip. |

**Register tokens — grep-verified existence (`src/` only):**

| token | files | status |
|---|---|---|
| `--glass-fill-tint` / `-strength` | minted `glass.css:399` | **EXTANT** (the per-instance plate-fill tint axis; the chip family is its ≥Nth consumer) |
| `--glass-bg-quiet` `--glass-border-quiet` `--glass-highlight` `--glass-blur-quiet` `--glass-material-rim` | 6–13 each | **EXTANT** |
| `--shadow-cartoon-{sm,md,lg}` | shadow.css | **EXTANT** but K5-broken (light-dark sticker-glow + 12% gray ink) |
| `--radius-control` (= `--radius-pill`) `--radius-badge` `--radius-pill` | 1 / 2 / 17 | **EXTANT** |
| `.accent-tone` / `useAccentTone` | accent-tone.css | **EXTANT** |
| `--section-color-N` `--surface-tint-15` `--scale-press-btn` | 9 / 6 / 4 | **EXTANT** |
| `--glass-capsule` / `.glass-capsule` / `--glass-capsule-fill` | **0** (`--glass-capsule-fill` resolves EMPTY live) | **NOT EXTANT — DAG dep** (tabs §6 EXTRACT) |
| `--motion-weight` | **0** (EMPTY on `:root` live) | **NOT EXTANT — DAG dep** (`BD.W-MOTION-WEIGHT`) |
| `--ease-cartoon-punch` | **0** (EMPTY on `:root` live) | **NOT EXTANT — DAG dep** (`BD.W-CARTOON-PUNCH`) |
| `--cartoon-ink` (warm cel ink) | 0 | **NOT EXTANT — DAG dep** (`BD.W-CARTOON-CEL-INK`) |
| `.paper-field` / warm-floor decl | 0 | **NOT EXTANT — DAG dep** (`BD.W-GLASS-FIELD` mounts the field; the chassis, not the atom, owns it) |

So the warm read of every atom is **field-dependent** (root cause #1: the field must be TRANSMITTED behind the plate at `inset:0`) AND **floor-dependent** (root cause #2: a real warm-floor declaration so a dormant/idle plate carries chroma even before the field paints). Neither lives in these atoms; both are sibling-greenfield primitives. This wave-amendment is born-RED until they merge to `src/`.

---

## 1. THE CORE IDEA — ONE warm-glass lens recipe, three consume-shapes, zero per-atom fork

The four atoms are not four problems. They are **three faces of one lens** plus **one loud exception**:

1. **The translucent warm-glass capsule** — the SAME `.glass-capsule` lozenge (DEPENDed from tabs §6) that the chip family, tabs, buttons, and select all wear: a backdrop-transmitting α<1 body + the keyed directional rim (`--glass-material-rim`, DEPENDed from `BD.W-GLASS-KEY-EDGE`) + the warm floor. It is tinted per-instance through the **EXTANT `--glass-fill-tint`** axis. This is the body of: **metric-badge** (already 90% there — it is the reference shape), the **glass Badge** (`<Badge surface="glass">`), the **slider fill cylinder**, and the **glass IconChip** (`<IconChip surface="glass">`, the CROSS-LINK to `BD.W-ICONCHIP-GLASS`).
2. **The cartoon cel-stamp** — the SAME warm-ink `--cartoon-ink` 0-blur layered-offset cast (DEPENDed from `BD.W-CARTOON-CEL-INK`, which kills K5 at the token) that the metric-badge hover + the `+N` overflow chip already reach for. By fixing the ink ONCE upstream, every atom's cartoon cast de-sticker-glows in dark for free.
3. **The liquid-weight motion law** — press-squish + hover-lift + drag inertia driven by the SAME `--motion-weight` × `--ease-cartoon-punch` register (DEPENDed) that drives cards/tabs/buttons. The slider drag is the headline liquid consumer (it already keeps-the-dock-open; it now gets a weighty thumb-give and a fill that morphs-more on move).
4. **The loud opaque exception** — the DEFAULT Badge and the StackedIcon discs are LOUD identity pills/dots: a saturated section-tone fill is the ONE color event, and it stays opaque-on-purpose (a `success` badge that you can see THROUGH is a worse badge). The greenfield move is NOT to glass-ify the loud pill — it is to give the loud pill the **same warm rim + cartoon cast + press-squish** so it reads as a member of the family, and to add a `surface="glass"` opt-in for the quiet/contextual placements. Survival-of-the-fittest: the loud solid fill is FIT (keep); the missing rim/cast/squish is WEAK (refine); nothing is broken enough to re-invent except the slider fill material.

**The recipe is `.glass-atom` — ONE `@layer components` class, three data-shaped consume-points, zero per-atom CSS fork.** It declares ZERO own glass tokens (no inline `backdrop-filter`/`--glass-bg-*`/rim — the no-fork fence); it COMPOSES `.glass-capsule` + `.accent-tone` + the `--glass-fill-tint` axis + the cartoon cast + the motion register. metric-badge's existing recipe is the seed it generalizes from (it already proves the shape ships); Badge/Slider-fill/IconChip-glass become the 2nd/3rd/4th consumers — clearing the ≥2-site overfit bar by construction.

---

## 2. THE SINGLE BOLDEST MOVE — the slider fill is a TINTED warm-glass capsule, and the drag THICKENS it (liquid displacement)

Today the standard slider fill is a flat black `--primary` cylinder. The boldest greenfield reinterpretation: **the filled portion of the slider IS a `.glass-atom` capsule** — the exact same warm-glass lozenge the badge and chip wear, tinted via `--glass-fill-tint` to the section accent, transmitting the field behind it. The track is the empty lens; the fill is the lens FILLED with warm tinted glass. One material, the whole slider.

And the drag is **liquid displacement, not a position swap**: as the user drags, the leading edge of the fill cylinder doesn't merely translate — it **bulges (squash-&-stretch with real `--motion-weight` inertia) at the grab point and trails a fading meniscus**, like pulling a column of liquid glass. On press the whole cylinder squishes (non-uniform `scale: 1.02 0.96`, widen-X compress-Y, NOT the current uniform 0.97 shrink); on release it overshoots via `--ease-cartoon-punch` and settles. The value-edge is the handle (the user's invisible-thumb contract stays); the felt response is a weighted liquid column that **morphs MORE the faster you move it** (the displacement amplitude reads `--motion-weight × pointer-velocity`, the §L4 overlapping-action principle made literal). Keep-dock-open, touch-gate, a11y/keyboard all stay native on the mounted reka thumb — the liquid is a compositor-only `transform`/`scale` skin over the existing fill, never a paint-bound box-shadow throw, Safari-safe by construction. This turns the most utilitarian atom into the most legibly LIQUID one — the slider becomes the demo that PROVES the liquid-weight-universal law on a control everyone underestimates.

---

## 3. PER-ATOM SPEC (the three consume-shapes + the loud exception)

### A. BADGE (`/display/badge` + `/display/metric-badge`)

**Geometry (golden √φ, congruent).** `badgeVariants` keeps its CVA shape but its radius resolves `--radius-badge` (pill) invariant across rungs; the three size rungs ride the √φ comfort ladder already present (`--control-text-sm`/`--control-text`/body). No re-fork of the CVA — a clean break only on the radius grab-bag if any rung drifts.

**Two registers, ONE family:**
- **LOUD (default identity).** The `default`/`destructive`/`success`/`warning`/`info`/section-tone pills STAY opaque saturated fills (the color IS the event — a status badge must not be see-through). The greenfield ADD: each loud pill gains the warm keyed rim (`--glass-material-rim`, DEPEND `BD.W-GLASS-KEY-EDGE`) so the pill has a DEFINED edge over a cream card (today `border: transparent` melts a sand `secondary` into a cream panel), the `--cartoon-ink` cel-cast on hover (warm, K5-fixed), and the press-squish on `:active`. The section-tone ramp tints its rim/cast off the SAME `--section-color-N` it fills with — the loud pill reads as a cartoon sticker, not a flat chip.
- **QUIET (`<Badge surface="glass">`, NEW opt-in).** For contextual/dense placements: the `.glass-atom` translucent capsule — `.glass-capsule` body + `--glass-fill-tint` tinted to the variant/section hue + the warm floor, transmitting the field. This is the metric-badge shape generalized onto the CVA badge. The two coexist: loud is the default identity; glass is the quiet opt-in. No `tone` axis is invented on the CVA (design.md §867 fence — the section ramp stays a consumer recipe via `--section-color-N`, not a 13-rung CVA enum).

**metric-badge** is already the `.glass-atom` reference. It REFINES to: (1) consume `.glass-atom` instead of its bespoke `.metric-badge` glass decl (DRY — it stops being a one-off and becomes consume-point #1); (2) its hover cartoon cast is the K5-fixed warm `--cartoon-ink` (inherited from `BD.W-CARTOON-CEL-INK` — no metric-badge edit needed for the dark fix, it just stops flipping white); (3) the hover-lift `--metric-badge-hover-translate` rides `--motion-weight` so the value-lift carries weight. The **cartoon K5 metric-badge defect is fixed UPSTREAM at the token, not patched at the atom** — the deft cure.

### B. SLIDER (`/forms/slider`) — see §2 for the bold move

- **Track** = the EMPTY `.glass-atom` lens: the faint cream translucent capsule (keep `--slider-track-bg` ~`--glass-bg-quiet`), now with the keyed rim so the empty track has a defined glass edge.
- **Fill** = a TINTED `.glass-atom` capsule via `--glass-fill-tint` (the section accent), transmitting the field — REPLACES the flat black `--primary` cylinder. Tints warm by construction; the gray defect dies because the fill is a warm-tinted lens over the warm field, not an opaque dark bar.
- **Drag** = the §2 liquid-displacement skin: press-squish (non-uniform), velocity-scaled bulge/meniscus (`--motion-weight` × pointer-velocity), `--ease-cartoon-punch` release-overshoot. All compositor-only `transform`/`scale`; box-shadow set once per state-flip (the §L7 paint-fence). PRM → `--motion-weight: 0` zeroes the displacement + squish; the fill stays warm + tinted (the calm legible floor).
- **keep-dock-open + touch-gate + invisible-thumb** = KEPT verbatim (the AX.W03 native-listener fix, the contain-alignment, the `data-held` halo). These are FIT; the greenfield touches only the fill MATERIAL + the drag FEEL, not the event plumbing. The `data-held` halo now intensifies the fill's rim via the warm register (already its pattern).
- **spectrum** variant keeps its visible squircle thumb (the color-picker idiom) — its thumb gains the press-squish + the warm rim; the gradient track is its own fill (untouched).

### C. ICONCHIP + STACKED-ICONS (`/display/stacked-icons`)

- **IconChip** — geometry converges (`--radius-control`/φ), and gains `<IconChip surface="glass">` (the CROSS-LINK to `BD.W-ICONCHIP-GLASS`): the `.glass-atom` translucent lens tinted via `--glass-fill-tint` to the section/tone. The DEFAULT IconChip KEEPS its `in srgb` brand-overlay plate (fence AW.W26 — it is NOT forced through `.accent-tone`'s `in oklab` mix; only geometry + the glass-fill opt-in converge). So IconChip has two registers exactly like Badge: the loud `in srgb` brand pop (default, FIT, keep) + the quiet glass lens (opt-in). This makes IconChip congruent with the chip family (toggle-chip/selectable-chip) WITHOUT regressing its deliberate pop.
- **StackedIconGroup** — the icon discs adopt the SAME two-register choice via the `icon` slot (the group is layout-only; the disc register is the consumer's IconChip/avatar). The group's OWN chrome (the `+N` overflow chip) becomes a `.glass-atom`: today it is `bg-background` + `shadow-cartoon-sm` (a flat white chip with the K5-prone cast). Greenfield: the `+N` chip is a quiet glass capsule with the K5-fixed warm cartoon cast + the press-squish, so the overflow reads as a member of the same lens family as the discs it summarizes. The overlap/expand-on-hover stays (it is FIT), but the hover-expand rides `--motion-weight` × `--ease-cartoon-punch` for liquid weight (today `ease-spring-snappy` — too tight). The expand becomes a weighted fan, not a snap.

---

## 4. THE MECHANISM (tokens / recipes / composables — deft, DRY, no re-fork)

**`.glass-atom` (`src/styles/glass/glass-atom.css`, `@layer components`):** the ONE shared recipe. Composes — declares ZERO own glass tokens:
```
.glass-atom {
  /* body: the DEPENDed translucent lozenge (tabs §6 EXTRACT) */
  /* → composes .glass-capsule  (backdrop-transmit α<1 body + warm floor) */
  /* tint: the EXTANT per-instance plate-fill axis */
  background-image: ...;            /* via --glass-fill-tint / -strength (HEAD axis) */
  /* edge: the DEPENDed keyed directional rim */
  box-shadow: var(--glass-material-rim);   /* BD.W-GLASS-KEY-EDGE re-point */
  border-radius: var(--radius-control);    /* EXTANT, = --radius-pill */
  /* the warm idle floor: max(accent-fill-strength, --atom-tint-floor) */
  /* PLAIN per-mode pair (12% light / 15% dark), NEVER light-dark() */
}
.glass-atom:hover  { box-shadow: var(--glass-material-rim), var(--shadow-cartoon-sm); }  /* warm K5-fixed cast */
.glass-atom:active { scale: 1.02 0.96; transition: scale var(--dur) var(--ease-cartoon-punch); }  /* non-uniform squash */
```
- **DEPEND (HARD — RED until merged to `src/`):** `BD.W-TAB-IOS-CAPSULE` (the `.glass-capsule`/`-hover` + warm-floor + `--glass-capsule-fill` EXTRACT) · `BD.W-GLASS-FIELD` (the warm field the chassis mounts — root cause #1) · `BD.W-GLASS-KEY-EDGE` (the keyed rim — root cause #2's defined edge) · `BD.W-CARTOON-CEL-INK` (the warm `--cartoon-ink`, K5 fix) · `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (the motion register). **Before these merge, the gate arms ERROR (no-such-token), not fail — the honest born-RED-over-flat condition.**
- **CONSUME (EXTANT, no re-mint):** `--glass-fill-tint`/`-strength` (glass.css:399) · `--glass-bg-quiet`/`-border-quiet`/`-highlight`/`-material-rim`/`-blur-quiet` · `.accent-tone`/`useAccentTone` · `--radius-control`/`-badge`/`-pill` · `--section-color-N` · `--scale-press-btn`/`--surface-tint-15`.
- **Composables:** the slider already wires `useDockHold` + `useTouchGate` (KEEP). The liquid-displacement drag skin reads the EXTANT `usePointerVelocityField` (a renderer Ref field; the same primitive the dock fission uses) → a thin `--atom-drag-v` custom prop the fill's `transform` reads, gated to the drag window only (no steady-state loop). NO new composable for the press/hover core (pure CSS + the motion register); the velocity-skin is labeled an opt-in (`:liquidDrag`, default on for slider) — honest about the one new DOM bridge, mirroring the cartoon-caster's deferred drag-track discipline.

**Cross-engine (Chrome + Safari):** the whole recipe is `backdrop-filter` (the calm glass blur, already Safari-shipped per the glass tiers) + `box-shadow` rim/cast (plain, no `cos()/sin()` trig, no conic-from-calc — the K5 fix is the warm `--cartoon-ink` token, cross-engine-safe) + compositor `transform`/`scale`/`opacity` for all motion. **NO `backdrop-filter:url`, NO SVG goo, NO metaball in any atom** (these are flat/capsule lenses, not blobs — no merge surface). The squircle on the spectrum thumb keeps its `@supports (corner-shape: superellipse(2))` gate with the generous-radius round fallback (already shipped). The warm floor is a PLAIN per-mode pair (the `light-dark()` inset-shadow trap is avoided by construction — the K5 defect IS that trap, fixed upstream).

**a11y / PRM carve:** PRM → `--motion-weight: 0` zeroes squash/displacement/overshoot/expand-lag in ONE assignment (the §L5 cascade); the warm tint + rim + static cast persist (legibility floor). `prefers-reduced-transparency` → the glass body floors to the opaque escape (`--glass-level: 0` flattens blur with the band) but the warm floor stays (warm-but-static). `prefers-contrast: more` → the cartoon ink + rim α floor UP (the inked edge is a legibility asset). Slider keyboard/focus/drag stay native on the reka thumb; the loud Badge keeps its AA-ratified dark-destructive deepening (AY.W-PRIM-POLISH D4). The `+N` chip stays a real focusable summary.

---

## 5. THE DELTA-ASSAY → ONE wave-amendment (reconciled vs the 116-wave set; no dup; build-DAG cited)

**Disposition:** **1 NEW wave + 4 AUGMENT (one-line consumer enrollments) + 1 CROSS-LINK + 6 DEPENDs.** Zero new glass material, zero new motion register, zero new field, zero new cartoon ink — every atom is the deft ≥Nth consumer of axes the union already ships or has booked.

| action | wave | why |
|---|---|---|
| **NEW** | `BD.W-GLASS-ATOM-REGISTER` (Band 7) | the `.glass-atom` shared recipe (consume-only) + the 4 atoms' two-register reconcile + the slider liquid-fill + the Badge `surface="glass"` opt-in + the `+N` glass chip. Born-RED: badge `backdrop:none`/`shadow:none` (live), slider fill gray `oklab(0.216 0.0035 …)` (live), 0 fields (live), metric-badge K5 dark flip (live). RED-ERRORS until DEPENDs merge. |
| **AUGMENT** | `BD.W-TAB-IOS-CAPSULE` | +1 line to its `.glass-capsule` consumer list: the glass atoms (Badge-glass, slider track+fill, IconChip-glass, `+N` chip) are recorded consumers (the ≥5th+ after tab indicator + 3 button sites + chip family). No new capsule work. |
| **AUGMENT** | `BD.W-TINTED-CHIP` | +1 line to the `--glass-fill-tint` ≥2-consumer ledger: the glass atoms tint via the axis. Strengthens, never forks it. |
| **AUGMENT** | `BD.W-CARTOON-CEL-INK` | +1 line: metric-badge hover + the `+N` overflow chip are recorded `--cartoon-ink` consumers — the K5 metric-badge dark sticker-glow is FIXED by this wave's token re-point (no metric-badge SFC edit). |
| **AUGMENT** | `BD.W-CARTOON-PUNCH` | +1 line: the `.glass-atom:active` squash + the slider release-overshoot + the `+N` expand are recorded `--ease-cartoon-punch`/`--motion-weight` consumers (the loud-register guard's concrete subjects). |
| **CROSS-LINK** | `BD.W-ICONCHIP-GLASS` | no edit — the IconChip glass arm IS that wave's register; this wave adds only the radius/φ congruence + the StackedIcon `+N`/disc reconcile. The `in srgb` brand plate stays owned there. |
| **DEPEND** | `BD.W-GLASS-FIELD` · `BD.W-GLASS-KEY-EDGE` · `BD.W-TAB-IOS-CAPSULE` · `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` · `BD.W-CARTOON-CEL-INK` | the build-DAG: RED-ERRORS (no-such-token) until all merged to `src/`. This is the §3 honesty: the register is NOT extant; the warm read is field- + floor- + edge-dependent, all sibling primitives. |
| **PRUNE / EXCISE** | none | nothing in the atoms is broken beyond the slider fill MATERIAL (re-invented) + Badge's missing rim/cast (refined). The drag plumbing, the CVA shape, the `in srgb` plate, the metric-badge structure are all FIT — kept. |

**Gate — `proof:glass-atom` + `tests-visual/glass-atom.spec.ts` (born-RED, painted-pixel, chromium + webkit, both modes):**
- **A1 warm-not-gray** — each atom's PAINTED composite over a REAL field (canvas `drawImage`+`getImageData`, NOT `getComputedStyle().backgroundColor` over a hardcoded field — the recurring fraud) reads C ≥ FIELD_FLOOR warm, H ∈ [45,85]. Born-RED: badge `backdrop:none`, slider fill C ≈ 0.006 gray (live). The self-test arm MUST fail on a flat-base field and pass on the gradient field (proves it reads the chroma layer).
- **A2 defined-edge** — each atom resolves a non-flat keyed rim + the rim's lit-edge vs host ΔL clears WCAG 1.4.11 (≥3:1). Born-RED: badge `border: transparent` melts on cream (live).
- **A3 cartoon-cast-not-white** — the hover/idle cartoon cast resolves warm `--cartoon-ink` (chroma ≥ 0.09, 0-blur) in light AND a VISIBLE warm offset (|L_ink − L_host| ≥ 0.12, NOT near-white) in dark. Born-RED: metric-badge `--shadow-cartoon-md` dark = `hsl(30 14% 90%)` near-white (live — the K5 captured defect).
- **A4 liquid-drag** — mid-drag the slider host `scaleX ≠ scaleY` (non-uniform squash) AND the fill displacement magnitude > rest AND the release `transform` track CROSSES PAST target (overshoot, sampled across rAF on the REAL pointer drive — not a discrete-class spike); a monotonic settle = FAIL. Paint-fence: NO `box-shadow` value change per-frame during drag. Born-RED: today the fill scale is uniform 0.97, no displacement.
- **A5 PRM** — under PRM the displacement/squash hold at rest (zero) while the warm tint + rim + static cast persist.
- Run BOTH engines; a Chrome-only pass is not a pass.

**The build-DAG fence (the §3 honesty, stated):** this amendment never claims the register is extant. The warm read has BOTH root causes — #1 the flat field needs `BD.W-GLASS-FIELD` to TRANSMIT a colorful field at `inset:0` behind the plate; #2 the dormant tint needs `BD.W-GLASS-KEY-EDGE` + the warm-floor decl (a real `--atom-tint-floor`) so an idle plate carries chroma before the field paints. Both are sibling-greenfield SPECS. The gate is born-RED over the flat condition today and ERRORS (not fails) on the glass/punch arms until the four DEPENDs land — the correct, honest sequencing.

---

## 6. THE GESTALT BAR (each atom: warm glass + congruent + liquid, both modes)

- **Warm glass:** every atom either IS a `.glass-atom` capsule (metric-badge, glass-Badge, slider track+fill, glass-IconChip, `+N` chip) tinted warm via `--glass-fill-tint` over the transmitted field, OR a loud opaque pill/disc that wears the SAME warm rim + warm cartoon cast (default Badge, section ramp, IconChip brand plate, StackedIcon discs). No gray anywhere — the slider's black fill and the badge's flat plate both die.
- **Congruent:** ONE `--radius-control` stadium, ONE `.glass-capsule` body, ONE `--glass-fill-tint` axis, ONE `--cartoon-ink` cast, ONE `--motion-weight` law across all four atoms AND the chip family AND tabs/buttons/select — a true union, the deft ≥Nth consumer, never a parallel fork.
- **Liquid:** the slider drag is weighted liquid displacement (the headline); every atom presses with a non-uniform squash + `--ease-cartoon-punch` overshoot; the StackedIcon expand is a weighted fan. PRM collapses all of it to a static warm-glass floor — both modes legible, both engines painted.

The slider — the most underestimated atom — becomes the clearest proof of the liquid-weight-universal law: a column of warm tinted glass you pull, that bulges where you grab it and overshoots when you let go. That is the boldest, most iOS-27-faithful reinterpretation in the batch.
