# GLASS ATOMS — GOLDEN reference

> **Badge** (+ metric-badge) · **Slider** · **IconChip** · **StackedIconGroup** — the small
> glass atoms that ALL consume ONE shared warm-glass register. The single canonical design,
> synthesized from lens-a (deft-integration + slider liquid-fill), lens-b (cross-engine /
> perf-first KISS), lens-c (audacious cartoon-technicolor punch + weight-train + arc). Born
> GREENFIELD from the iOS-27 reference; the status-quo source was read to know what to
> keep/refine/re-invent, never to anchor. Live-grounded 2026-06-24 (`getComputedStyle` +
> grep over `src/`). NO LEGACY. Survival of the fittest.

---

## 0. THE GOLDEN VERDICT (what survives from each lens)

All three lenses CONVERGE on the load-bearing architecture — that convergence IS the proof:

- **ONE recipe, four consumers, ZERO per-atom fork** (all three). The four atoms are the same
  object at four sizes — a warm transmissive glass puck with a single cel keystone.
- **Two registers, never a third path** (all three): LOUD opaque identity pill (kept, frozen,
  AA) vs QUIET transmissive glass lozenge (the `surface="glass"` opt-in). A status `success`
  badge MUST NOT be see-through.
- **Build-DAG honesty** (all three, grep-verified identically): the register is a SPEC, not
  shipped. `.glass-capsule`=0, `--motion-weight`=0, `--ease-cartoon-punch`=0, `--cartoon-ink`=0,
  `paper-field`=0. EXTANT + consumed: `--glass-fill-tint`/`-strength` (`glass.css:399/408`),
  `--radius-control`=`--radius-pill` (`radius.css:56`), `--shadow-cartoon-{sm,md,lg}`
  (`shadow.css:92`), `accent-tone.css`, `--section-color-N`, the motion composables
  (`useDragMorph`, `useLiquidFlex`, `usePointerVelocityField`, `useDockHold`, `useTouchGate`).
- **The §3-gray cure is two-legged, neither leg inside the atom** (all three): #1 flat-field →
  the chassis mounts the warm plenum (`BD.W-GLASS-FIELD`); #2 dormant-tint → a warm-floor decl
  on the atom body. Either alone is born-RED.

**Where the lenses diverge — the GOLDEN resolutions:**

| tension | lens-a | lens-b | lens-c | **GOLDEN** |
|---|---|---|---|---|
| recipe name | `.glass-atom` | `.glass-atom` (reuse `.glass-chip`) | `.cel-puck` | **`.glass-atom`** — the neutral, scope-true name; **reuse `.glass-chip` verbatim if the chip wave lands first** (lens-b's KISS reuse beats a sibling class). `.cel-puck` is too cute + scopes-narrow. |
| cast default | hover-on | **opt-in** (status = info, not a card) | on (loud register) | **OPT-IN** (lens-b). The loud status pill casts only on `data-cast`/hover; the metric-badge + `+N` light it by default (they ARE the cast flagships). A `success` badge is information, not a sticker. |
| slider drag | liquid-displacement (bulge+meniscus) | vol-preserving squish (KISS) | **full weight-train** (anticipation→smear→follow-through) | **the WEIGHT-TRAIN** (lens-c) gated behind `:liquidDrag` (default on), with **lens-b's perf floor**: compositor-only, the displacement is one `transform`/`scale` skin, box-shadow set once per state-flip, PRM zeroes it to lens-b's plain squish. Audacity WITH the perf discipline. |
| stack fan-out | weighted fan | translate+grow | **arc + overlapping-action stagger** | **the ARC** (lens-c) — per-index `transition-delay` stagger + a hair of `rotate`, on `--ease-cartoon-punch`. The cluster breathes apart like a dealt hand. |
| velocity bridge | opt-in `--atom-drag-v` | (none — pure CSS) | extant field, honest bridge | **one honestly-named composable** if the renderer-field can't drive a CSS var directly; default to the EXTANT `usePointerVelocityField`; gated to the drag window only (no steady-state loop) — lens-a + lens-c's honesty + lens-b's no-idle-cost. |

> **HARDENING FOLD (challenges 1–3, applied).** Three load-bearing corrections to the prose below:
> **(R1/R2, the velocity bridge)** the slider weight-train requires ONE *new* small composable
> `useDragVelocity` (drag-window-gated rAF → `--atom-drag-v`, torn down on `pointerup`). It does NOT
> "compose the extant `usePointerVelocityField`" — that one is a no-own-rAF push-API with no CSS-var
> output and no slider frame loop. The §0/§5 "zero new composable" headline is corrected: the
> press/hover core is pure CSS; the slider train is the ONE honest bridge. **(R1/R3, the cast carrier)**
> the cel cast rides the inert `.cartoon-cast` child owned + cross-engine-spiked by `BD.W-CARTOON-CASTER`
> (sibling deliverable); the glass-atoms `spike.html` is motion-CURVE de-risk only, NOT the shipped
> `::after`. **(R3, the slider)** the fill is REFINED (one default-tint flip) — its blur/rim/color-mix
> are extant; only the default `--primary` tint flips to the warm floor. **(R3, R4)** the smear
> SATURATES (`tanh`/clamp ~0.7) and the stack arc is a FIXED total sweep ≤18° regardless of N. See
> `DELTA-ASSAY.md` §4 + `WAVE-AMENDMENT.md` for the full fold.

**The single boldest move (all three name the slider; GOLDEN adopts lens-c's full form):** the
slider fill is a warm-tinted `.glass-atom` cylinder (not the dark `--primary` bar), and the drag
is a **liquid weight-train** — anticipation dip on grab, overlapping-action smear while pulling
(the cel cast lags by `--motion-weight × velocity`), follow-through overshoot-and-settle on
release. The most-underestimated atom becomes the clearest atom-scale proof of the
liquid-weight-universal law — and it composes ONLY extant engines, zero new core composable.

---

## 1. THE CORE — `.glass-atom`, ONE recipe, four consume-shapes

The four atoms are **three faces of one lens + one loud exception**:

1. **The translucent warm-glass capsule** — the SAME `.glass-capsule` lozenge the chip family,
   tabs, buttons, select wear: a backdrop-transmitting α<1 body + the keyed directional rim
   (`--glass-material-rim`) + the warm floor, tinted per-instance through the EXTANT
   `--glass-fill-tint` axis. Body of: metric-badge (the reference, already 90% there),
   `<Badge surface="glass">`, the slider fill cylinder, `<IconChip surface="glass">`, the `+N`
   chip.
2. **The cartoon cel-stamp** — the SAME warm `--cartoon-ink` 0-blur layered-offset cast (K5-fixed
   upstream at the token). OPT-IN: the metric-badge hover + the `+N` overflow light it by
   default; the loud status badge does not (status = information).
3. **The liquid-weight motion law** — press-squish + hover-lift + drag inertia on the SAME
   `--motion-weight × --ease-cartoon-punch` register that drives cards/tabs/buttons. The slider
   weight-train is the headline.
4. **The loud opaque exception** — the DEFAULT Badge + the StackedIcon discs are LOUD identity
   pills/dots: a saturated `--section-color-N` fill is the ONE color event, opaque-on-purpose.
   The greenfield move is NOT to glass-ify the loud pill — it is to give it the SAME warm keyed
   rim + cel cast (opt-in) + press-squish so it reads as a family member, plus a `surface="glass"`
   opt-in for quiet/contextual placements.

**`.glass-atom` declares ZERO own glass tokens** (no inline `backdrop-filter`/`--glass-bg-*`/rim —
the no-fork fence). It COMPOSES `.glass-capsule` + `.accent-tone` + the `--glass-fill-tint` axis +
the cartoon cast + the motion register. metric-badge is the seed it generalizes from (it already
ships); Badge-glass / slider-fill / IconChip-glass / `+N` are consumers #2–#5 — clearing the
≥2-site overfit bar by construction.

---

## 2. PER-ATOM SPEC (the three consume-shapes + the loud exception)

### A. BADGE (`/display/badge` + `/display/metric-badge`)

**Geometry (golden √φ, congruent).** `badgeVariants` keeps its CVA shape; radius resolves
`--radius-badge` (pill) invariant across rungs; the three size rungs ride the existing √φ comfort
ladder. No CVA re-fork; a clean break only on any radius grab-bag that drifts.

**Two registers, ONE family:**
- **LOUD (default identity).** `default`/`destructive`/`success`/`warning`/`info`/section-tone
  STAY opaque saturated fills. ADD: the warm keyed rim (`--glass-material-rim`) so the pill has a
  DEFINED edge over a cream card (today `border:transparent` melts a sand `secondary` into a cream
  panel); the press-squish on `:active`; the `--cartoon-ink` cel-cast **opt-in** via `data-cast`
  (a status pill is information, not a card — it casts only when the consumer asks). The
  section-tone ramp tints its rim/cast off the SAME `--section-color-N` it fills with.
- **QUIET (`<Badge surface="glass">`, NEW opt-in).** The `.glass-atom` translucent capsule —
  `.glass-capsule` body + `--glass-fill-tint` tinted to the variant/section hue + the warm floor,
  transmitting the field. The metric-badge shape generalized onto the CVA badge. `secondary` /
  `outline` route through the quiet register (where the warm-not-gray read is won). No `tone` axis
  is invented on the CVA (design.md §867 fence — the section ramp stays a consumer recipe via
  `--section-color-N`, not a 13-rung CVA enum).

**metric-badge** is the `.glass-atom` reference. REFINES to: (1) consume `.glass-atom` instead of
its bespoke glass decl (DRY — consume-point #1); (2) hover cast = the K5-fixed warm `--cartoon-ink`
(inherited from `BD.W-CARTOON-CEL-INK` — NO metric-badge edit for the dark fix, it just stops
flipping white); (3) hover = a **vol-preserving squash-lift** (`scale: 1.05 0.96` + `translate
-2px`, NOT the uniform `scale 1.04`) on `--ease-cartoon-punch × --motion-weight`, the cast lagging
~1.15× (follow-through). `data-just-resolved` catch-light KEPT. The K5 defect is fixed UPSTREAM at
the token, not patched at the atom — the deft cure.

### B. SLIDER (`/forms/slider`) — the WEIGHT-TRAIN (the boldest move)

- **Track** = the EMPTY `.glass-atom` lens: keep the faint cream translucent capsule (the live
  `srgb 0.963 0.953 0.937 / 0.5`), now with the keyed rim (defined glass edge) and the warm-floor
  read so it is warm-not-grey over a flat host.
- **Fill** = a TINTED `.glass-atom` cylinder via `--glass-fill-tint` — a WARM glass cylinder, not
  the dark `oklab(0.216 …)` `--primary` bar (the live defect). The brand color is DEMOTED to the
  consumer override `--slider-range-bg` (already wired, `Slider.vue:225`) — presets-in-consumers:
  the lib default is the warm material, the loud brand is the consumer's choice. This is the single
  most legible re-point in the batch.
- **Drag = the WEIGHT-TRAIN** (`:liquidDrag`, default on), composing EXTANT engines only:
  1. **ANTICIPATION (grab).** On `pointerdown`, before the value moves, the fill leading edge dips
     back ~2px against the pull (the wind-up) + compresses Y (`scale 1 0.92`) — the object loads.
  2. **OVERLAPPING-ACTION SMEAR (pull).** While dragging, the leading edge LEADS and the cel cast
     LAGS by `--motion-weight × velocity` (`usePointerVelocityField` → a thin `--atom-drag-v` CSS
     var the fill `transform` + cast `translate` read, both compositor-only). The fill stretches in
     the drag axis (vol-preserving X·Y≈1) — morph MORE the faster you move. **The track does NOT
     move — only the fill + cast deform** (the box-INVIOLATE rail discipline).
  3. **FOLLOW-THROUGH (release).** On `pointerup` the fill overshoots the final value by the punch
     curve ~22% then settles; the cel cast recoils LATE (1.15× lag) and re-seats. A monotonic
     settle = FAIL — real inertia.
- **PRM floor (lens-b):** `--motion-weight: 0` zeroes anticipation/smear/follow-through; the fill
  collapses to lens-b's plain vol-preserving press-squish (`scale: 0.98 1.03`), then the calm warm
  legible floor. The fill stays warm + tinted.
- **keep-dock-open + touch-gate + invisible-thumb = KEPT verbatim** (AX.W03 native-listener,
  contain-alignment, `data-held` halo). FIT — the greenfield touches only the fill MATERIAL + the
  drag FEEL, never the event plumbing. The `data-held` halo now ALSO reads velocity (held + fast =
  intensified cel cast). **spectrum** keeps its `@supports(corner-shape)` squircle thumb + gradient
  track; the thumb gains the press-squish + the warm rim.

### C. ICONCHIP + STACKED-ICONS (`/display/stacked-icons`)

- **IconChip** — geometry converges (`--radius-control`/√φ glyph ladder), gains
  `<IconChip surface="glass">` (CROSS-LINK to `BD.W-ICONCHIP-GLASS`): the `.glass-atom` lens tinted
  via `--glass-fill-tint`. The DEFAULT IconChip KEEPS its `in srgb` brand-overlay plate (fence
  AW.W26 — NOT forced through `.accent-tone`'s `in oklab` mix; only geometry + the glass opt-in
  converge). Two registers exactly like Badge: loud `in srgb` brand pop (default, FIT, keep) +
  quiet glass lens (opt-in). The reveal + hover-bloom ride the extant `--spring-snappy`/`-smooth`
  clock (KEEP — already alive, `icon-chip.css:131`).
- **StackedIconGroup** — discs adopt the two-register choice via the `icon` slot (the group is
  layout-only; the disc register is the consumer's IconChip/avatar). The `+N` overflow chip becomes
  a `.glass-atom`: today `bg-[color-mix(...background...)]` + `shadow-cartoon-sm` (flat,
  K5-prone). Greenfield: a quiet glass capsule with the K5-fixed warm cast + press-squish (REMOVE
  the hardcode — no-legacy). **The fan-out becomes an ARC (lens-c):** today a flat
  `translate-x-1.5 scale-105` on `ease-spring-snappy` (a stiff slide, too tight). Greenfield: each
  puck's `translate` + a hair of `rotate` traces a shallow curve, with a per-index
  `transition-delay` stagger so the back pucks FOLLOW the front (overlapping action), each casting
  its own cel shadow as it lifts off — the cluster breathes apart like a dealt hand of cards, on
  `--motion-weight × --ease-cartoon-punch`.

---

## 3. THE MECHANISM (tokens / recipes / composables — deft, DRY, no fork)

**`.glass-atom` (`src/styles/glass/glass-atom.css`, `@layer components`):** the ONE shared recipe.
Composes — declares ZERO own glass tokens. **If `.glass-chip` (the chip-family wave) lands first,
`.glass-atom` IS `.glass-chip` re-used (verify at build; prefer reuse over a sibling class).**

```css
.glass-atom {
  /* body: the DEPENDed transmissive lozenge (tabs §6 EXTRACT) */
  /*   → composes .glass-capsule  (backdrop-transmit α<1 body + warm floor) */
  /* tint: the EXTANT per-instance plate-fill axis */
  background-image: ...;                 /* via --glass-fill-tint / -strength (HEAD axis) */
  /* edge: the DEPENDed keyed directional rim */
  box-shadow: var(--glass-material-rim); /* BD.W-GLASS-KEY-EDGE re-point */
  border-radius: var(--radius-control);  /* EXTANT, = --radius-pill */
  /* the warm idle floor — #2 cure. NON-self-referential (challenge #1 R8: a property that
     reads ITSELF resolves to guaranteed-invalid → the max() drops). A separate INPUT var. */
  --accent-fill-strength: max(var(--accent-fill-strength-in, 0%), var(--atom-tint-floor));
  /* PLAIN per-mode pair (12% light / 15% dark) — NEVER light-dark() (the inset-shadow trap) */
  transition:
    background var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard),
    scale var(--motion-weight-dur, var(--spring-smooth-duration)) var(--ease-cartoon-punch),
    translate var(--motion-weight-dur, var(--spring-smooth-duration)) var(--ease-cartoon-punch);
}
.glass-atom { --atom-tint-floor: 12%; }
.dark .glass-atom { --atom-tint-floor: 15%; }
/* the PUNCH — non-uniform squash, NOT a shrink */
.glass-atom:active:not([data-disabled]) { scale: 1.04 0.94; } /* widen X, compress Y */
/* the cel cast — OPT-IN, set per state-flip, NEVER animated per-frame */
.glass-atom[data-cast]:hover { box-shadow: var(--glass-material-rim), var(--shadow-cartoon-sm); }
```

**The follow-through cast rides an inert `aria-hidden` `.cartoon-cast` child** (the cartoon-shadow
H2 lesson — `::before`/`::after` are OCCUPIED by the glass catch-light + grain). The atoms emit it
only in the loud register; the calm register skips it.

- **DEPEND (HARD — RED until merged to `src/`):** `BD.W-TAB-IOS-CAPSULE` (the `.glass-capsule`/
  `-fill` EXTRACT) · `BD.W-GLASS-FIELD` (the warm field the chassis mounts — #1 cure) ·
  `BD.W-GLASS-KEY-EDGE` (the keyed rim — the defined edge) · `BD.W-CARTOON-CEL-INK` (the warm
  `--cartoon-ink`, K5 fix) · `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (the motion register).
  Before these merge, the gate arms ERROR (no-such-token), not fail — the honest born-RED-over-flat
  condition.
- **CONSUME (EXTANT, no re-mint):** `--glass-fill-tint`/`-strength` (`glass.css:399/408`) ·
  `--glass-bg-quiet`/`-border-quiet`/`-highlight`/`-material-rim`/`-blur-quiet` ·
  `.accent-tone`/`useAccentTone` · `--radius-control`/`-badge`/`-pill` · `--section-color-N` ·
  `--scale-press-btn`/`--surface-tint-15` · `--shadow-cartoon-{sm,md,lg}` · `--slider-range-bg`.
- **Composables:** the slider already wires `useDockHold` + `useTouchGate` (KEEP). The weight-train
  composes EXTANT `useDragMorph` + `useLiquidFlex` + `usePointerVelocityField` → a thin
  `--atom-drag-v` CSS var the fill `transform` + cast lag read, gated to the drag window only (no
  steady-state loop). NO new composable for the press/hover core (pure CSS + the motion register).
  The velocity-skin is labeled `:liquidDrag` (default on for slider) — honest about the one DOM
  bridge. If the renderer-field cannot drive a CSS var directly, ONE honestly-named small bridge
  composable is the ceiling.

**Cross-engine (Chrome + Safari) — lens-b's load-bearing contribution:** the whole recipe is
`backdrop-filter: blur() saturate() brightness()` (the calm glass blur, already Safari-shipped per
the metric-badge live read) + `box-shadow` rim/cast (PLAIN, no `cos()/sin()` trig, no
conic-from-calc — the K5 fix is the warm `--cartoon-ink` token, cross-engine-safe) + compositor
`transform`/`scale`/`opacity` for all motion. **NO `backdrop-filter:url`, NO SVG goo, NO metaball
in any atom** — these are flat/capsule lenses, not blobs; no merge surface, so WebKit parity is the
`backdrop-filter: blur()` + `box-shadow` + `transform` set, all Safari-native. The cast is 0-blur
(no per-frame re-blur — Safari pays no blur cost on the cast). The squircle on the spectrum thumb
keeps its `@supports (corner-shape: superellipse(2))` gate with the generous-radius round fallback.
The warm floor is a PLAIN per-mode pair (the `light-dark()` inset-shadow trap avoided by
construction — the K5 defect IS that trap, fixed upstream). The box-shadow cast is set per
STATE-FLIP, NEVER animated per-frame (the §L7 paint-fence); its MOVEMENT rides
`translate`/`scale`.

**Perf net (lens-b):** the entire atom register adds ZERO new rAF clocks, ZERO new GPU contexts,
ZERO per-frame paint at idle — every "liquid" beat is a compositor transition on an event; the only
rAF is the drag-window velocity read, gated open by `pointerdown` and torn down on `pointerup`. An
offscreen atom costs ZERO. This is the KISS proof: liquid-weight is a token contract, not an engine.

**a11y / PRM carve:** PRM → `--motion-weight: 0` zeroes squash/displacement/overshoot/expand-lag
in ONE assignment (the §L5 cascade); the warm tint + rim + static cel STAMP persist (legibility
floor — a STILL frame, never a frozen mid-animation). `prefers-reduced-transparency` → the glass
body floors to the opaque escape (`--glass-level: 0` flattens blur with the band) but the warm
floor stays (warm-but-static), the cast goes UP (the only edge cue without glass).
`prefers-contrast: more` → the cel ink + rim α floor UP to clear WCAG 1.4.11 (≥3:1 non-text). Slider
keyboard/focus/drag stay native on the reka thumb; the value still tracks under PRM (it just doesn't
smear). The loud Badge keeps its AA-ratified dark-destructive deepening (AY.W-PRIM-POLISH D4). The
`+N` chip stays a real focusable summary.

---

## 4. THE DELTA-ASSAY → ONE wave-amendment (reconciled vs the 116-wave set; no dup; build-DAG cited)

**Disposition:** **1 NEW wave + 3 AUGMENT (one-line consumer enrollments) + 1 CROSS-LINK + 6
DEPENDs.** Zero new glass material, zero new motion register, zero new field, zero new cartoon ink —
every atom is the deft ≥Nth consumer of axes the union already ships or has booked.

| action | wave | why |
|---|---|---|
| **NEW** | `BD.W-GLASS-ATOM-REGISTER` (Band 7) | the `.glass-atom` shared recipe (consume-only; reuse `.glass-chip` if it lands first) + the 4 atoms' two-register reconcile + the slider weight-train fill + the Badge `surface="glass"` opt-in + the `+N` glass chip + the StackedIcon arc fan-out. Born-RED: badge `backdrop:none`/`shadow:none` (live), slider fill gray `oklab(0.216 …)` (live), 0 fields (live), metric-badge K5 dark flip (live), `+N` flat plate (live). RED-ERRORS until DEPENDs merge. |
| **AUGMENT** | `BD.W-TINTED-CHIP` | +1 line to the `--glass-fill-tint` ≥2-consumer ledger: the glass atoms (badge-glass, slider track+fill, IconChip-glass, `+N`) tint via the axis. Strengthens, never forks it. |
| **AUGMENT** | `BD.W-CARTOON-CEL-INK` | +1 line: metric-badge hover + the `+N` overflow are recorded `--cartoon-ink`/`--shadow-cartoon-*` consumers — the K5 metric-badge dark sticker-glow is FIXED by this wave's token re-point (no metric-badge SFC edit). |
| **AUGMENT** | `BD.W-CARTOON-PUNCH` | +1 line: the `.glass-atom:active` squash + the slider release-overshoot + the `+N`/arc expand are recorded `--ease-cartoon-punch`/`--motion-weight` consumers. |
| **CROSS-LINK** | `BD.W-ICONCHIP-GLASS` | no edit — the IconChip glass arm IS that wave's register; this wave adds only the radius/√φ congruence + the StackedIcon `+N`/disc reconcile. The `in srgb` brand plate stays owned there. |
| **DEPEND** | `BD.W-GLASS-FIELD` · `BD.W-GLASS-KEY-EDGE` · `BD.W-TAB-IOS-CAPSULE` · `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` · `BD.W-CARTOON-CEL-INK` | the build-DAG: RED-ERRORS (no-such-token) until all merged to `src/`. The §0 honesty: the register is NOT extant; the warm read is field- + floor- + edge-dependent, all sibling primitives. |
| **PRUNE / EXCISE** | none | nothing is broken beyond the slider fill MATERIAL (re-invented) + Badge's missing rim/cast (refined) + the `+N` hardcode (excised). The drag plumbing, the CVA shape, the `in srgb` plate, the metric-badge structure, the `useDockHold`/`useTouchGate` are FIT — kept. EXCISE from scope: any `::before`/`::after` cast (occupied — use the inert child) + any new core drag composable. |

### GATE — `proof:glass-atom` + `tests-visual/glass-atom.spec.ts`

Born-RED, painted-pixel, **chromium + webkit, both modes** (a Chrome-only pass is not a pass):

- **A1 warm-not-gray** — each atom's PAINTED composite over a REAL field (canvas `drawImage` +
  `getImageData`, NOT `getComputedStyle().backgroundColor` over a hardcoded field — the recurring
  fraud) reads C ≥ FIELD_FLOOR warm, H ∈ [45,85]. Born-RED: badge `backdrop:none`, slider fill C ≈
  0.006 gray, track C ≈ 0.003 (live). **Self-test:** MUST fail on a flat-base field, PASS on the
  gradient field (proves it reads the chroma layer).
- **A2 defined-edge** — each atom resolves a non-flat keyed rim + cast non-`none` + border α ≥ 8%
  warm-ink; the rim's lit-edge vs host ΔL clears WCAG 1.4.11 (≥3:1). Born-RED: badge
  `border:transparent` melts on cream, metric-badge 4%-α border (live).
- **A3 cartoon-cast-not-white (K5)** — the hover/idle cel cast resolves warm `--cartoon-ink`
  (oklch chroma ≥ 0.09, 0-blur) in light AND a VISIBLE warm offset (|L_ink − L_host| ≥ 0.12, NOT
  near-white) in dark. Born-RED: metric-badge `--shadow-cartoon-sm` dark = `srgb 0.914 0.9 0.886`
  L≈0.90 near-white, chroma≈0 (live — the K5 captured defect).
- **A4 slider-fill-warm** — the range default bg resolves C ≥ warm-floor (NOT the dark `oklab(0.216
  …)` bar). Born-RED live.
- **A5 weight-train (slider)** — mid-drag the fill `scaleX ≠ scaleY` (non-uniform smear) AND the
  displacement magnitude > rest AND the release `transform` track CROSSES PAST target (overshoot,
  sampled across rAF on the REAL pointer ramp — not a discrete-class spike); a monotonic settle =
  FAIL. The cast lags the leading edge mid-drag. **Paint-fence:** NO `box-shadow` value change
  per-frame during drag. Born-RED: today the fill scale is uniform `0.97`, no displacement.
- **A6 squash-not-shrink** — mid-press scaleX ≠ scaleY on metric-badge + slider (a uniform scale =
  a shrink = FAIL). Born-RED: live press uniform `scale(0.97)`/`1.04`.
- **A7 arc (stack)** — hover fan-out traces a non-zero `rotate` + a per-index `transition-delay`
  stagger (overlapping action); a flat translate = FAIL. Born-RED: live `translate-x-1.5 scale-105`
  flat on `ease-spring-snappy`.
- **A8 paint-fence** — NO box-shadow value change per-frame during any beat (compositor-only).
  Self-test bite: a planted animated-box-shadow MUST red.
- **A9 cross-engine** — run BOTH engines; the atoms have no goo path, so WebKit parity is the
  `backdrop-filter: blur()` + `box-shadow` + `transform` set; the spec asserts no
  `backdrop-filter:url` appears in the atom CSS.
- **A10 PRM/PRT + keep-dock-open** — under PRM the displacement/squash/cast-lag hold at rest (zero)
  while the warm tint + rim + static cast persist; under PRT the blur drops, the warm tint stays;
  `useDockHold` still acquires on slider `pointerdown` (the contract byte-preserved), the
  weight-train does not break the hold.

**The build-DAG fence (the §0 honesty, stated):** this amendment never claims the register is
extant. Both root causes: #1 the flat field needs `BD.W-GLASS-FIELD` to TRANSMIT a colorful field
at `inset:0` behind the plate; #2 the dormant tint needs `BD.W-GLASS-KEY-EDGE` + the warm-floor
decl (`--atom-tint-floor`) so an idle plate carries chroma before the field paints. Both are
sibling-greenfield SPECS. The gate is born-RED over the flat condition today and ERRORS (not fails)
on the glass/punch arms until the DEPENDs land — the correct, honest sequencing.

**Overfit bar:** `.glass-atom` has 5 consumers (badge-quiet · metric · slider track+fill ·
IconChip-glass · `+N`) — clears the ≥2-site rule by construction.

---

## 5. THE GESTALT BAR (each atom: warm glass + congruent + liquid, both modes)

- **Warm glass:** every atom either IS a `.glass-atom` capsule (metric-badge, glass-Badge, slider
  track+fill, glass-IconChip, `+N`) tinted warm via `--glass-fill-tint` over the transmitted field,
  OR a loud opaque pill/disc that wears the SAME warm rim + warm cel cast (default Badge, section
  ramp, IconChip brand plate, StackedIcon discs). No gray anywhere — the slider's black fill and the
  badge's flat plate both die.
- **Congruent:** ONE `--radius-control` stadium, ONE `.glass-capsule` body, ONE `--glass-fill-tint`
  axis, ONE `--cartoon-ink` cast, ONE `--motion-weight` law across all four atoms AND the chip
  family AND tabs/buttons/select — a true union, the deft ≥Nth consumer, never a parallel fork.
- **Liquid:** the slider drag is the weight-train (anticipation → smear → follow-through, the
  headline); every atom presses with a non-uniform squash + `--ease-cartoon-punch` overshoot; the
  StackedIcon expand is an arc with overlapping-action stagger. PRM collapses all of it to a static
  warm-glass floor — both modes legible, both engines painted.

The slider — the most underestimated atom — becomes the clearest proof of the liquid-weight-universal
law: a column of warm tinted glass you pull, that loads when you grab it, smears toward where you
drag, and overshoots when you let go. The most iOS-27-faithful reinterpretation in the batch, and it
costs ZERO new material + ZERO new motion register — the deft Nth consumer of the shared register.
