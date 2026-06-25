# BUTTONS — GREENFIELD lens-a (PURE iOS-27 fidelity)

> The Button CVA + `.glass-btn` + the variants + `DockIconButton` redesigned from first
> principles, then UNIONED onto the shipped ecosystem. The cardinal move: the buttons are NOT
> a new material — they are the THIRD consumer of the ONE `.glass-capsule` register the tabs
> greenfield extracts (segmented pill · dock-tab selected · **Button glass**). No button-glass
> fork. Every token/selector below is source-verified on disk; every defect below is
> live-measured on `:5173` this pass (Chrome, painted-pixel, OKLab).

---

## 0. LIVE-MEASURED status quo (the bar to BEAT — Chrome :5173, this session)

Sampled every Button variant on `/display/buttons` + the dock controls on `/dock/overview`,
painted `backgroundColor` → OKLab chroma (gray iff C < 0.02), both the rest fill and the
specular `::before`.

| Probe | Live measurement | Reading |
|---|---|---|
| `default`/`glass`/`secondary`/`outline`/`accent` rest fill | `oklab(0.882 0.0054 0.0127 / 0.328)` → **chroma 0.0052** | **DEEP NEAR-GRAY** — worse than the tabs capsule's 0.0128; the glass buttons are gray-by-default |
| `primary-audacious`/`gold-audacious` rest fill | same `oklab(… C 0.0052)` | the hero CTAs are the SAME gray plate (gold tint `bgImage:none` — the static gold gradient is not painting at rest here) |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | the warm source EXISTS, resolves warm both modes |
| `--glass-tint-strength` | **`0%`** | the warm-admit floor is **OFF** — the seam is a no-op at rest, so the wash card desaturates to gray |
| `--glass-bg-floating-tinted` at `:root` | **`(empty)`** | element-scoped (`surfaces.css:283 :where(.btn-glass,.segmented-indicator)`) — the rest fill reads the RAW `--glass-bg-wash`, OUTSIDE the tinted seam |
| `--glass-blur-btn` | `blur(13px) saturate(1.6) brightness(1.02)` | the real ~13px glass blur IS wired (AX.W52 fixed the 1px) — the BLUR is fit, the COLOR is not |
| default Button `::before` (specular) at rest | `opacity: 0`, `mix-blend: plus-lighter` | **NO gleam at rest** — lifts to 0.1 hover / 0.16 active (the cohort) — hover IS partial, but it is the only hover signal beyond the bg cross-fade |
| `.dock-icon-button` rest | `background: rgba(0,0,0,0)`, `backdrop-filter: none`, `box-shadow: none` | **NO glass at rest** — the dock button is a bare transparent hit-target; glass paints only on hover/active. NOT redolent of the glassy tab register |
| `.dock-tab-button[aria-current]` (selected) | `color(srgb 0.994 0.96 0.926 / 0.8)` → **chroma 0.0125** | **NEAR-GRAY** — the dock selected capsule IS the exact gray the tabs greenfield flagged (the two-dialect near-gray) |
| press register | `--scale-press-btn` (= `--scale-press-sm`) + `useSpringPress` reciprocal squish (Button.vue:90-141) | the squishy press SHIPS (response 0.25 ζ 0.7, `useLiquidFlex` maxStretch 1.04) — fit |
| `--ease-cartoon-punch` / `--motion-weight` on `:root` | absent on disk | phantom — BOOKED by the motion-spring-register greenfield (DEPEND, do not mint) |

**Visual gestalt (the read):** over the page field the glass buttons read as **flat translucent
gray pills** — the blur is real but the fill is colorless, so they look like frosted-acrylic
chips, not warm liquid glass. The dock icon buttons are INVISIBLE at rest (transparent). The
selected dock tab is a beige-gray slab. This IS precisely the "not glassy like the tabs"
register the user names — and it shares its root cause (the warm-admit floor at strength 0%)
with the tabs near-gray the tabs greenfield is already fixing.

**Net triage: REFINE-dominant, ONE re-invent (shared with tabs), ZERO new material.** The CVA
architecture, the `useSpringPress` squish, the `v-specular` auto-arm, the `--glass-blur-btn`,
the `.btn-pill`/`.tap-squish` motion split, the surface-axis cross-cut — ALL fit and survive.
The single load-bearing defect (the gray fill) is the SAME defect the tabs `.glass-capsule`
warm-floor RE-INVENT fixes. So the buttons greenfield is, almost in full, **"compose the
`.glass-capsule` + `.glass-capsule-hover` the tabs greenfield extracts, set `--glass-accent`,
done."** The tabs DELTA-ASSAY §3 already names this: *"the buttons row is RESOLVED by THIS
extraction — no parallel button-glass fork."* This lens makes that concrete.

---

## 1. The DELTA — KEEP / REFINE / RE-INVENT / ADD

### KEEP (fit — byte-untouched)
- **The Button CVA architecture** (`button/index.ts`) — the `variant` × `size` matrix, the
  `defaultVariants: { variant: 'default' }` (glass-is-default, AX.W54), the four-state contract,
  the de-shadcn glass reskin of `outline`/`secondary`/`accent` (BC.W-BUTTON-GLASS-IOS). The
  variant KEYS all stay (no public-prop break). KEEP.
- **The squishy interruptible press** — `useSpringPress` + `useLiquidFlex` (Button.vue:90-141),
  the volume-preserving reciprocal X/Y squish coupled with the `--scale-press-btn` shrink, the
  inline-`scale`-wins-while-pressed single-source. Live-confirmed wired. KEEP byte-for-byte —
  it is the §L3 squash & stretch the user's "liquid weight" demands, already correct.
- **The `v-specular` auto-arm** (Button.vue:187, DockIconButton.vue:111) — the pointer-anchored
  moving gleam armed at the tier root with ZERO call-site wiring, PRM-safe. KEEP — this IS the
  glass-hover lift channel the user wants; it only needs its REST + magnitude tuned (REFINE).
- **The `--glass-blur-btn` ~13px backdrop** (surfaces.css `.btn-glass`, AX.W52) — the real glass
  blur. The blur is fit; only the FILL color is broken. KEEP.
- **The `.btn-pill`/`.tap-squish` motion split** (surfaces.css:154, btn.css) — surface legs on
  the bezier `--ease-standard`, the `scale` leg on `--spring-smooth` (§6 doctrine, the ONE button
  scale register). KEEP — a colour cross-fade on a spring wobbles; the split is correct.
- **The surface-axis cross-cut** (`surface="veil|opaque|clear"`, Button.vue:59) — the orthogonal
  decoration on TOP of `variant`. KEEP.
- **Compositor-only / Safari floor** — `scale`/`box-shadow`/`backdrop-filter:blur` only; the
  `:liquid` `.glass-lens` is the `@supports`-gated Chromium refraction enhancement with the
  plain-blur WebKit fallback (§L7 sanctioned exception, already correct). KEEP.

### REFINE (weak → evolve, same primitives)
- **The rest gleam wakes a hair** — at rest the `::before` specular is `opacity: 0` (the
  intensity-rest cohort = 0). For a button the user poked-at, a *sub-perceptual* rest catch-light
  reads as "alive glass" without becoming a wired track. REFINE: the GLASS-register button reads
  a low rest intensity (`--glass-specular-intensity-rest` ~0.04 on the button scope ONLY, NOT the
  global cohort — a global rest lift would wake every idle Card). This is a button-scoped cohort
  override, one declaration. (Bare rungs/Cards stay 0 — the idle-track discipline holds.)
- **Calibrate the press shrink toward the iOS window** — the press already reads
  `useSpringPress` DEFAULTS (the ONE source); when BC.W-SPRING-EASE re-points the `press` preset
  onto Apple's `interactiveSpring` (0.15/0.86) the press answers in the sub-100ms iOS window with
  ZERO edit here (already booked, DEPEND). No button-local spring literal.
- **`gold-audacious` static tint reaches the capsule** — the static warm-gold gradient
  (`bgImage:none` at rest in the live sample — it is overridden by the bg fill) is re-expressed
  as the `--glass-accent` per-instance accent ON the `.glass-capsule` (the catch-light core tints
  toward gold, BB.W-GLASS-ACCENT), so the gold reads in the GLEAM where it belongs, not as a flat
  plate wash. One token set, no `background-image` fork.

### RE-INVENT (broken → the load-bearing fix, SHARED with tabs)
- **The button glass FILL is gray → compose `.glass-capsule` with the warm-floor.** THE single
  load-bearing defect. The glass variants paint the RAW `--glass-bg-wash` (chroma 0.0052,
  near-gray). The FIX is NOT a button-local recipe: it is to **substitute the rest/hover/active
  fills onto the `.glass-capsule` register** the tabs greenfield extracts (which carries the
  warm-admit floor RE-INVENT — a small compose toward `--glass-tint-source`, warm both modes, so
  meanChroma clears 0.02). The `default`/`glass`/`primary-audacious` hero variants compose
  `.glass-capsule` (+ `glass-deep` for the hero depth); the `outline`/`secondary`/`accent` quiet
  triplet compose `.glass-capsule` at the quieter `--glass-bg-quiet`-floor rung (prominence by
  tint, not slab — the apple.com rule already in the CVA comments). ONE register, the gray dies
  at the source for buttons AND tabs AND dock-tabs together.

### ADD (the genuinely-new behaviour for buttons)
- **The `.glass-capsule-hover` register on the non-pressed button** — the user's literal "better
  hover states." The tabs greenfield extracts `.glass-capsule-hover` (composing the SHARED
  `.glass-drag-lift` specular-lift primitive, NOT a fork: `--glass-specular: 0.14` catch-light +
  `scale: 1.015` hover / `0.97` press on the fast bezier clock). The glass buttons COMPOSE it —
  so a `<Button>` hover lifts a hair of glass with a warm specular bloom, EXACTLY the tabs
  glass-hover, one recipe. This REPLACES the current hover (a bare bg cross-fade + the 0.1 gleam
  bump) with the real lit-lozenge lift.
- **The `--motion-weight`-scaled press for DRIVER buttons** — a button is a DRIVER (the user
  acts), so its press squish reads the cartoon register: the press shrink + reciprocal squish
  co-scale by `--motion-weight` (0.62 rest), and the hero CTA press may reach toward the
  `--ease-cartoon-punch` anticipation dip (a ~4% pre-dip before the scale-down) for the §L3
  anticipation principle. Both tokens are DEPEND (motion-spring-register), not minted here. The
  `useSpringPress` path already carries the squish; the `--motion-weight` multiply is a one-line
  scale on the existing reciprocal amplitude (the same way the tabs blob composes it).

---

## 2. The UNION path — precise integration (KISS, DRY, no second engine)

### 2a. The substitution — buttons compose `.glass-capsule`, the gray dies ONCE

The tabs greenfield extracts (tabs WAVE-AMENDMENT §A.1, source-verified):
- `.glass-capsule` (`src/styles/glass/glass-capsule.css`, `@layer components`) — the lifted
  lozenge: `--glass-bg-floating-tinted` fill + **the warm-admit floor (the RE-INVENT)** +
  `--glass-rim-top`/`-bottom` + `--glass-shadow-floating` + `--glass-blur-floating`, on
  `--radius-pill`. Reads the W55 adaptive seam (`surfaces.css:283 :where(…)` widened to include
  `.glass-capsule`).
- `.glass-capsule-hover` — the hover/press register composing the SHARED `.glass-drag-lift`
  specular-lift primitive.

The buttons UNION:
1. **The CVA glass variants compose `.glass-capsule`.** `default`/`glass`/`glass-wash`/
   `primary-audacious` swap their inline `glass-wash btn-glass` + the raw `hover:bg-(--glass-bg-
   resting-tinted)` chains for `glass-capsule glass-capsule-hover btn-glass` (the `.btn-glass`
   keeps the `--glass-blur-btn` backdrop + the `:where()` tinted-seam membership; the
   `.glass-capsule` supplies the warm fill + rim + lift). The hero variants keep `glass-deep`.
   The `outline`/`secondary`/`accent` quiet triplet compose `.glass-capsule` at the quiet rung
   (a `--glass-capsule-fill: var(--glass-bg-quiet-tinted)` per-variant override on the capsule —
   ONE knob, prominence by tint). Clean break: the raw-rung `hover:bg-*`/`active:bg-*` chains
   DELETE (no alias — they were the substitution-vs-inheritance trap; the capsule's adaptive
   seam + the hover register replace them).
2. **`.glass-btn` (the icon-button primitive) composes `.glass-capsule` too.** Its inline
   `background: var(--glass-bg-wash)` (surfaces.css:73, the gray source) + the `:hover`
   `color-mix(--background 85%)` + the `.is-active` `--surface-tint-10` (a GRAY tint! the
   no-gray fence breach) RE-POINT onto `.glass-capsule` / `.glass-capsule-hover` / the capsule
   selected fill. The fixed-square geometry + `contain:paint` + the icon-flex stay. The
   `--surface-tint-*` gray fills DIE (clean break).
3. **`DockIconButton` composes the dock-control glass + the capsule SELECTED fill.** The
   `.dock-icon-button` rest is intentionally transparent (the dock's hairline-rail idiom — a
   bare icon in the gutter, BE WF-3). KEEP the transparent REST (a dock icon is not a pill). But
   the SELECTED state (`[data-active]`/`[aria-pressed]`) re-points its `--dock-control-active-bg`
   fill onto `.glass-capsule` (the tabs amendment already folds the dock-tab selected fill onto
   the capsule — `DockIconButton`'s selected fill joins the SAME fold). So a selected dock
   control reads the SAME warm lit lozenge as a selected tab and a glass button. The hover gleam
   (`v-specular` + the material `::before` cohort) is UNTOUCHED.

### 2b. The hover — ONE specular-lift primitive, three consumers

The `.glass-capsule-hover` register composes `.glass-drag-lift` (`segmented-tabs.css:399`,
`--glass-specular: 0.1` + `will-change`) — the SHARED specular-lift the tabs greenfield factors
ONCE. The button hover is therefore NOT a new mechanism: it is the tabs glass-hover at the
button's magnitude (`--glass-specular: 0.14`, `scale: 1.015`). The `v-specular` directive
already supplies the pointer POSITION (the moving catch-light); `.glass-capsule-hover` supplies
the LIFT intensity + the scale. Position (directive) + lift (capsule-hover) compose — the same
two-channel split the tabs use. No third hover fork; the §0 "color-only / 0.1-bump hover" is
replaced by the real lozenge lift.

### 2c. The motion — the DRIVER press on the cartoon register

The press already rides `useSpringPress` + `useLiquidFlex` (the squish). The cartoon ADD is two
DEPEND-token multiplies on the EXISTING amplitude:
- `--motion-weight` (DEPEND, motion-spring-register) co-scales the reciprocal squish depth —
  the button rests at the universal 0.62; a hero CTA / a celebration button pushes toward 1.
- `--ease-cartoon-punch` (DEPEND) is the OPT-IN anticipation curve for the hero CTA press (the
  ~4% pre-dip → over-shoot settle), reached on the `scale` transition leg only (PRM → collapses
  to `--ease-standard`, §L5). The workhorse press stays `--spring-smooth`/`--spring-snappy`.

NO button-local spring literal (the W-GLASS-CAL spring fence); the press physics stay at the ONE
`SPRING_PRESETS` table. The `--motion-weight` multiply is the SAME composition the tabs blob uses.

### 2d. The accent — `--glass-accent` per-variant, the gold reads in the gleam

`gold-audacious` sets `--glass-accent: var(--color-gold)` + `--glass-accent-strength` on the
`.glass-capsule` (BB.W-GLASS-ACCENT, the catch-light core OKLab-mixes toward the accent). The
gold reads in the SPECULAR core + the rim glint where the pointer grazes — the warm-gold lit
lozenge, not a flat gradient plate. `ai` similarly maps to its amber accent. Default
`--glass-accent: transparent` → byte-identical warm-cream at rest. ONE accent axis, no
`background-image` fork (the static gold gradient DELETES, clean break).

### The UNION ledger (every lever — reused vs new)

| Need | Reused primitive (live/source-verified) | New surface |
|---|---|---|
| Warm glass fill | **`.glass-capsule`** (tabs-extracted, warm-floor RE-INVENT) | — (buttons COMPOSE it) |
| Glass hover lift | **`.glass-capsule-hover`** → `.glass-drag-lift` (tabs-extracted) | — (buttons COMPOSE it) |
| Quiet-tier prominence | `--glass-bg-quiet-tinted` (surfaces.css:297) | `--glass-capsule-fill` per-variant knob |
| Blur backdrop | `--glass-blur-btn` (surfaces.css `.btn-glass`, AX.W52) | — |
| Moving gleam position | `v-specular` directive (Button/DockIconButton, AUTO-ARM) | — |
| Rest catch-light | `--glass-specular-intensity-rest` cohort | button-scoped ~0.04 override |
| Squishy press | `useSpringPress` + `useLiquidFlex` (Button.vue:90-141) | — |
| Press iOS window | `press` SPRING_PRESETS row (BC.W-SPRING-EASE) | — (DEPEND) |
| Cartoon press scale | `--motion-weight` (motion-spring-register) | — (DEPEND, one multiply) |
| Anticipation curve | `--ease-cartoon-punch` (motion-spring-register) | — (DEPEND, opt-in hero) |
| Per-instance accent | `--glass-accent`/`-strength` (BB.W-GLASS-ACCENT) | gold/ai variant set |
| Dock selected fill | `.glass-capsule` selected fold (tabs amendment) | — (DockIconButton joins the fold) |
| Refraction edge | `.glass-lens` `:liquid` opt-in (§L7-gated) | — |

ZERO new material, ZERO new component, ZERO second spring/rAF. The buttons are a pure
CONSUMER of the `.glass-capsule` register + the existing press/gleam/accent primitives.

### 2e. Cross-engine (Chrome + Safari)

The whole button material is `backdrop-filter: blur()` + `box-shadow` (rim/lift) + a
`plus-lighter` `::before` gleam — all Safari-native (the build-time `-webkit-` prefix pass). The
recess/rim/capsule are STATIC (no `@keyframes`, no layout-animation). The ONLY `url()` filter is
the opt-in `:liquid` `.glass-lens`, which is `@supports (backdrop-filter: url(#…))`-gated with a
plain-blur WebKit fallback (§L7 sanctioned exception, already shipped). The π is paired-engine
(chromium + webkit), both modes — the same paired arm the tabs capsule π carries. No
`backdrop-filter:url` on an ancestor, no naive ellipsoid, no SVG goo on glass (§L7 floors hold by
construction since buttons add no goo).

### 2f. A11y / PRM carve

- **PRM:** `useSpringPress` snaps to the endpoint (the press FUNCTIONS, the squish physics off);
  `--motion-weight → 0` zeroes the cartoon squash/anticipation in one assignment;
  `--ease-cartoon-punch → --ease-standard`. The capsule fill + rim + lift are STATIC (present for
  everyone — a lit lozenge needs no motion). The gleam `::before` pins static-centre under reduce.
- **Contrast:** the warm-floor capsule reads the W55 adaptive seam → over a bright field the fill
  darkens-to-legible (the `contrast-color()` ink flip + content-tier floor reach the lit fill,
  closing the substitution-vs-inheritance trap the current raw-rung chains re-open on hover).
  Text stays AA both modes, both fields.
- **Focus:** the `.focus-ring` warm halo (the base CVA) is UNTOUCHED.
- **Reduced-transparency:** the glass a11y-fallback (`glass/a11y-fallback.css`) opaque arm
  reaches the capsule (it composes the glass material group). No bespoke button arm.

---

## 3. Cross-wave reconciliation (no dup against the 116-union set + the tabs register)

- **`BD.W-TAB-IOS-CAPSULE`** (tabs amendment §A) — already RENAMES `.glass-tab-capsule` →
  `.glass-capsule` *because buttons consume it* (it names "Button glass" as the 3rd consumer),
  ADDS the warm-floor RE-INVENT to the capsule fill, ADDS `.glass-capsule-hover`. The buttons
  greenfield is the DOWNSTREAM consumer: it does NOT re-author the capsule register; it
  AUGMENTS a button wave to COMPOSE it. CROSS-LINK, no dup.
- **`BD.W-BUTTON-GLASS` / the BC.W-BUTTON-GLASS-IOS lineage** (the on-disk button work) — the
  AUGMENT target. The buttons amendment (next doc) folds: (1) the CVA glass variants compose
  `.glass-capsule`/`.glass-capsule-hover` (delete the raw-rung `hover:bg-*` chains, clean break);
  (2) `.glass-btn` composes the capsule (delete the `--glass-bg-wash` gray fill + the
  `--surface-tint-*` gray active fills); (3) the button-scoped rest catch-light; (4) the
  `--glass-accent` gold/ai mapping; (5) the `--motion-weight`/`--ease-cartoon-punch` DEPEND on
  the press. Do NOT author a parallel button-glass material wave.
- **`BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH`** (motion-spring-register, NEW waves) — DEPEND
  for `--motion-weight` + `--ease-cartoon-punch`. Minting them here would FORK (no-legacy). The
  buttons amendment DEPENDS; the press multiply is downstream.
- **`BD.W-DOCK-TAB-INDICATOR` (proposed)** — the dock-tab selected accent folds onto
  `.glass-capsule` (tabs amendment). `DockIconButton`'s selected fill joins the SAME fold (one
  selected-accent language across content tabs, dock tabs, dock icon buttons). CROSS-LINK.
- **`BD.W-GLASS-IOS27-CONTROLS`** — DISJOINT (`glass-control-track` is the switch/checkbox/radio
  register, NOT the selected-pill/button capsule). No collision.
- **The buttons row (tabs DELTA-ASSAY §3 ledger)** — "glassy-like-tabs" is RESOLVED by THIS
  consumption. This lens makes the resolution concrete (the exact variant-by-variant
  substitution + the `.glass-btn`/dock-icon folds). No re-fork.

---

## 4. Convergence

**Item convergence: ~80%.** The CVA architecture, the squishy press, the `v-specular` auto-arm,
the `--glass-blur-btn`, the motion split, the surface-axis, the §L7 floor all SHIP (REFINE-
dominant). The warm fill + the glass hover are RESOLVED by composing the tabs-extracted
`.glass-capsule` + `.glass-capsule-hover` (the gray dies ONCE, for buttons AND tabs AND
dock-tabs). The genuine remaining button-specific work: the variant-by-variant substitution onto
the capsule (delete the raw-rung hover chains + the `--surface-tint` gray fills, clean break),
the `.glass-btn` icon-primitive fold, the `DockIconButton` selected-fill join, the button-scoped
rest catch-light, the `--glass-accent` gold/ai mapping, the `--motion-weight` press multiply
(DEPEND). The single crack the build closes is the SAME crack the tabs close — the gray fill —
because the buttons share the capsule. A pure UNION, never a bolt-on.

---

## THE SINGLE BOLDEST MOVE

**Delete the entire "button glass material" — buttons own NO material at all.** The current
buttons carry their OWN gray fill recipe (`--glass-bg-wash` on `.glass-btn`, the raw-rung
`hover:bg-(--glass-bg-resting-tinted)` chains across six variants, the `--surface-tint` gray
active fills). The boldest move is to **substitute every one of them onto the ONE tabs-extracted
`.glass-capsule` + `.glass-capsule-hover` register and delete the button-side material wholesale**
— no button-glass recipe survives, not even an alias. A `<Button>`, a `.glass-btn` icon, a
selected dock control, a segmented pill, and a dock tab become the EXACT SAME warm lit lozenge
with the EXACT SAME glass-hover, because they all resolve the SAME six-layer capsule. The gray
that the user sees on the buttons is not a button bug — it is the gray the tabs greenfield is
already killing, and the buttons get fixed for free by refusing to have a material of their own.
