# BUTTONS — GREENFIELD (LENS C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> The button system reborn through the 1940s-technicolor lens: bold layered-offset shadowing,
> exaggerated squash/stretch/morph, anticipation + follow-through + overlapping action + arcs,
> real weight & inertia — the boldest, most-alive button that is still idiomatic + cross-engine.
> The buttons, the dock buttons, and the tabs all drink the SAME warm-glass capsule recipe. No
> third fork. Every lever below is source-verified on HEAD + live-measured on :5173 this pass.

---

## 0. LIVE-MEASURED status quo (the bar to BEAT — Chrome :5173, this session)

Sampled `/display/buttons` (light), `/dock/overview` (light), cross-read the tabs DELTA-ASSAY.

| Probe | Live measurement | Reading |
|---|---|---|
| `default` button rest fill | `oklab(0.881 0.0054 0.0127 / 0.328)` → **chroma ≈ 0.0138** | **< 0.02 → NEAR-GRAY** — the same defect the tabs capsule has (0.0128). The "glass-by-default" button is a near-gray translucent slab. |
| `secondary`/`outline`/`glass` rest fill | identical `oklab(0.881 0.0054 0.0127)` | the whole glass-variant family shares the one near-gray fill |
| `ghost` rest | `rgba(0,0,0,0)` — fully transparent, `backdrop:none`, `box-shadow:none` | NO glass at all (text-only). The user's "all more glassy by default" indicts this. |
| `default` backdrop | `blur(16px) saturate(1.8)` (deep) / `blur(13px) saturate(1.6) brightness(1.02)` (quiet) | the blur IS real (BC.W-BUTTON-GLASS-IOS landed it) — the material is half-built: blur yes, warmth no |
| `default` box-shadow | `rgba(255,255,255,.18) 0 0 0 .75px inset, oklch(0 0 0/.04) 0 2px 8px -1px` | **rim + a faint drop — NO recess, NO cartoon layered-offset cel-shadow** |
| `--glass-tint-strength` | **`0%`** | the warm-admit oklab seam is a **NO-OP at rest** — `--glass-bg-*-tinted` collapses to the raw near-gray rung. THIS is the gray's root cause (mirrors tabs §RE-INVENT). |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | warm BOTH modes — the warm source EXISTS, it's just mixed at 0% |
| `default` hover | `transition: bg/border/box-shadow/color 0.2s`, `scale: 1` at rest; hover bumps `--glass-specular-intensity-hover: 0.14` + `--scale-hover-btn: 1.05` | a hover register EXISTS (specular bump + scale + tinted fill) but it is a flat color/blur cross-fade — no **lift**, no **warm bloom**, no cartoon cast travel |
| `default` press | `--glass-btn-press-t` 0..1 spring (useSpringPress) → reciprocal X/Y squish (useLiquidFlex, maxStretch 1.04) + `--scale-press-btn: 0.97` + specular LERP | the press IS alive (squish + gleam) — but capped LOW (1.04) and tame (0.97), NOT the cartoon punch |
| `.dock-icon-button` rest | `rgba(0,0,0,0)` — **transparent, `backdrop:none`, `box-shadow:none`** | the dock button carries **ZERO glass at rest** — a bare transparent square. The "glass" is only a flat translucent `background` on hover (`--dock-control-hover-bg`, warm `hsl(30 85% 96%)`). NO capsule, NO rim, NO recess, NO specular-lift. |
| dock hover/press | flat warm bg fill + `--scale-hover-dock: 1.1` / press `--dock-control-press-bg` + `--scale-press-dock: 0.96` | a flat-fill swap on a scale — NOT the lifted glassy tab register the user wants |
| `--motion-weight` on :root | **absent in `src/styles/`** (only `liquid-morph` ambient knobs) | phantom — booked `BD.W-MOTION-WEIGHT`; DEPEND, never mint |
| `--ease-cartoon-punch` on :root | **absent in `src/styles/`** | phantom — booked `BD.W-CARTOON-PUNCH`; DEPEND, never mint |
| `.glass-capsule` on disk | **NONE** | the tabs amendment's extraction; born-RED, the buttons CONSUME it |

**Visual (`lens-c-buttons-current.png`, `lens-c-dock-current.png`):** the button row reads as a
field of pale beige-gray pills with a faint blur — legible, calm, but flat and cool, NOT "warm
glass." The dock buttons read as bare glyphs floating on the dock plate with no individual
material until hovered. Both are exactly the "not glassy enough, weak hover" register the user
indicts.

**Net:** the foundation is FIT-but-half-built. The blur ships; the press-squish ships; the
specular-track ships; the tinted-seam plumbing ships (dormant at 0%). The gaps are: (1) the
**near-gray fill** (the warm-admit floor never engages — load-bearing RE-INVENT, identical to the
tabs capsule defect), (2) **no lifted-capsule hover** (flat cross-fade, no rim/recess/bloom lift),
(3) the **dock button has no rest material at all**, (4) the press + hover are TAME, never the
cartoon punch the lens demands, (5) **three separate glass recipes** (button surfaces.css · dock
icon-button.css · tabs segmented-tabs.css) where there should be ONE. REFINE the press/blur/
specular, RE-INVENT the warm-floor (consume the tabs `.glass-capsule`), ADD the cartoon-punch +
lifted-capsule hover + dock-capsule, EXTRACT the ONE register. No re-fork.

---

## 1. THE CORE IDEA — buttons ARE warm-glass capsules that PUNCH

A button is the tabs indicator capsule that you can press. The tabs greenfield already RE-INVENTS
the warm-floor capsule (`.glass-capsule`) + the lifted glass-hover (`.glass-capsule-hover`) + the
recessed track (`.glass-capsule-track`) and explicitly RESOLVES the buttons ledger row by handing
us those classes (DELTA-ASSAY §2a/§3, WAVE-AMENDMENT §E). So the buttons greenfield is a SUBSTITUTION,
not a fork: every glass button variant **composes `.glass-capsule` + `.glass-capsule-hover`**, drops
its inline near-gray fill/rim, and sets ONE accent knob. The dock button composes the SAME pair.
The tabs indicator composes the SAME pair. ONE warm-glass register, three consumers, zero forks —
the DRY win the user's "make them all like the tabs" demands, taken literally.

Then LENS C makes it PUNCH. The current press is `--scale-press-btn: 0.97` + a 1.04-capped squish:
correct physics, timid amplitude. The cartoon register (design.md §Shadows + §L4) already ships the
loud vocabulary — `--ease-cartoon-punch` (anticipation dip → 22% overshoot → settle), the moving
cartoon cast (`.shadow-cartoon-*`, the `::after` caster that slides OPPOSITE the gesture), the
exaggerated `--scale-press`. The buttons greenfield routes its interaction through THAT register as
an **opt-in loud tier** (`<Button punch>` / a `.btn-punch` decoration), so a CTA reads with real
weight: it **anticipates** (dips ~4% before it lifts on hover), **overshoots** the lift, the **cast
slides** opposite the press (the lozenge lifting off its inked shadow), then **settles** with
follow-through. The calm default stays the bounded ≤10%-overshoot spring (the workhorse); the punch
is the deliberate hero. This is design.md §L4 "elevate weak/medium principles toward universal" made
concrete: anticipation, exaggeration, follow-through, overlapping action, arcs, squash & stretch —
all on the press of a button.

---

## 2. THE MATERIAL — compose the tabs capsule, engage the warm floor

### 2a. The rest register (RE-INVENT the gray → consume the warm capsule)

Every glass variant (`default` · `glass` · `secondary` · `outline` · `accent` · `primary-audacious`
· `gold-audacious`) DROPS its inline `--glass-bg-*` near-gray fill and **composes `.glass-capsule`**
(the warm-floor lozenge from `BD.W-TAB-IOS-CAPSULE` as amended: `--glass-bg-floating-tinted` fill +
the **warm-admit floor** that clears meanChroma ≥ 0.02 over the aurora BOTH modes +
`--glass-rim-top`/`-bottom` + `--glass-shadow-floating` + `--glass-blur-floating` on `--radius-pill`).
The button's existing `.btn-glass` blur-override (`--glass-blur-btn`, the real 10px / deep-16px
family) stays as the per-component blur knob the capsule reads — no blur regression, the deep CTA
still reaches `--glass-blur-deep`. The load-bearing fix is the warm floor: `.glass-capsule` admits a
small compose toward `--glass-tint-source` (warm both modes) **independent of `--glass-tint-strength`**
(which is the ambient-adaptive darken knob, dormant at 0% — it must NOT gate the warmth), so the
button's resting chroma clears 0.02 instead of the live 0.0138. The W55 adaptive-darken seam still
rides on top via the existing `:where(.btn-glass, .segmented-indicator, .glass-capsule)` widening
(DELTA-ASSAY §2a) — warmth is the FLOOR, darken-over-bright is the ceiling, both compose.

`ghost` and `link` stay text-first (no capsule) — a ghost button with a full capsule is no longer
a ghost. But `ghost` GAINS the `.glass-capsule-hover` register on hover ONLY (the capsule blooms in
on pointer-enter, fades out on leave) — so even the quietest button answers the "better hover" ask
with a warm-glass lift, while resting flat. This is the deft middle path: ghost rests as ink,
hovers as glass.

### 2b. The hover register (the user's headline "better hover states")

The non-press hover composes `.glass-capsule-hover` (the SHARED specular-lift primitive the tabs
amendment factors ONCE — `.glass-capsule-hover` AND `.glass-drag-lift` both resolve the same
`--glass-specular` step, never two parallel blocks; WAVE-AMENDMENT §A.4/C7). On hover the button:
- **lifts** — `scale: 1.015` (the calm tier) or the cartoon-punch lift (the loud tier, §3);
- **warm-blooms** — the `--glass-specular` catch-light steps up (0.10 → 0.14, the existing
  `--glass-specular-btn-hover`, live-confirmed) AND a faint warm tint bloom rides the `::before`
  gleam toward `--glass-tint-source` (warmer at the grazing edge — the iOS-27 "lit control" read);
- **deepens its drop** — the under-shadow steps one rung (the existing
  `.btn-glass:hover` `--glass-btn-under-shadow-hover`, live-confirmed) so the lozenge reads as
  rising off the page.

This is a genuine glass-hover LIFT (specular + warm bloom + deeper drop + scale), not the current
flat color/blur cross-fade — and it is byte-identical across button · dock · tab because all three
compose `.glass-capsule-hover`.

### 2c. The dock button (RE-INVENT — give it the rest capsule)

The dock button is the worst offender: zero rest material. It RE-POINTS onto the SAME register. The
`.dock-icon-button` composes `.glass-capsule` at rest (the warm lozenge, on `--dock-control-radius`
→ resolves to `--radius-pill`/circle for the icon square — the capsule recipe is radius-agnostic) +
`.glass-capsule-hover` for the hover lift. Its flat `--dock-icon-hover-bg` swap is RETIRED (clean
break, no alias) — the hover is now the shared lift. Its selected/`data-active` state composes the
SAME capsule at the floating rung (the existing `--dock-control-active-bg: var(--glass-bg-floating)`
re-points onto the tinted-floating seam, so "selected reads as glass" stays — never a saturated
brand hue, per W-REGISTER-IOS). The dock button now reads as a row of warm-glass capsules that lift
on hover and punch on press — "redolent of our glassy tabs," literally the same material.

> RESULT: button · dock-button · tab indicator all paint `.glass-capsule` + `.glass-capsule-hover`.
> One recipe, three consumers (≥3 → clears the overfit floor by construction). The buttons greenfield
> AUTHORS no new material class — it CONSUMES the tabs amendment's extraction. This is the union.

---

## 3. THE PUNCH — the loud cartoon tier (LENS C's boldest move)

The single boldest move: **the button press is a full cartoon squash-and-stretch with a moving
inked cast — opt-in via `<Button punch>` — driven by `--ease-cartoon-punch` + the moving
cartoon-shadow caster, so a CTA reads with the weight & arc of a 1940s cel, while the calm default
stays the bounded spring.**

### 3a. The press choreography (anticipation → squash → overshoot → follow-through)

The press already routes through `useSpringPress` → `useLiquidFlex` (the reciprocal volume-preserving
X/Y squish) — the RIGHT primitive, capped timid (maxStretch 1.04, shrink 0.97). The punch tier
re-targets the SAME primitive at loud amplitude WITHOUT a second spring/rAF (no fork):
- **anticipation** — on pointer-DOWN the capsule dips ~4% below origin BEFORE the squash (the
  `--ease-cartoon-punch` anticipation arm, design.md §82 — "a real ~4% dip below origin… which no
  damped spring can express"). This is the curve on the `scale` leg, gated by `--motion-weight`.
- **squash** — the press shrink deepens toward `--scale-press` (0.96, the canonical rung) with a
  LOUDER reciprocal squish (maxStretch ~1.09, still volume-preserving, still anti-taffy via the
  composed-area fence the tabs amendment establishes — area ≤ ~1.14, NOT the bare scalar).
- **overshoot + follow-through** — on release the capsule overshoots ~22% (the `--ease-cartoon-punch`
  overshoot arm) and settles — the follow-through the calm spring's ≤10% ceiling forbids.
- **overlapping action** — the GLYPH/label settles a beat (~60ms) AFTER the capsule (the same
  glyph scale-pop register the tabs amendment ships, `scale: calc(1 + 0.06 × var(--motion-weight))`,
  DELAYED) — child trails parent, the §L4 overlapping-action principle.

### 3b. The moving cartoon cast (the 2.5-D pop — design.md §Shadows)

The punch tier composes a cartoon-shadow rung (`.shadow-cartoon-md` → `-lg` on hover, the existing
utilities reading `--shadow-cartoon`). The cast is a `::after` caster layer (NEVER an animated
`box-shadow` — paint-bound, §L7) that:
- on hover, the layered-offset cel-shadow DEEPENS (`-md` → `-lg`) — the lozenge lifts off the page;
- on press, the object lifts off its shadow then SNAPS back on release (the §Shadows "deepens on
  press" arc);
- the offset TRAVELS opposite the press translate, scaled by `--motion-weight` (the cel's light
  source stays fixed while the object moves) — a `transform` on the caster, compositor-cheap.

This is the §L4 "Solid drawing" + "Appeal" tiers made real on a button: the glass conveys z via the
capsule's six-layer depth, and the cartoon cast gives the 2.5-D technicolor pop.

### 3c. The variant register (calm workhorse vs loud hero)

| Variant | Material | Interaction tier |
|---|---|---|
| `default` / `glass` / `secondary` / `outline` / `accent` | `.glass-capsule` (warm floor) | CALM — bounded spring, specular-lift hover, 0.97 press. The workhorse. |
| `primary-audacious` / `gold-audacious` | `.glass-capsule` + `.btn-punch` | LOUD — cartoon-punch press + moving cast + `--scale-hover-btn` lift. The hero CTA reads as the deliberate punch. |
| `<Button punch>` (any variant) | + `.btn-punch` decoration | opt-in loud tier on ANY glass variant — the cross-cutting punch axis (like `surface`/`liquid`) |
| `ghost` / `link` | text-first; `ghost` blooms `.glass-capsule-hover` on hover only | quiet — ink at rest, glass on hover |
| `destructive` | colored-glass (W-GLASS-IOS27-CONTROLS register — disjoint) | calm; NOT the near-gray capsule |
| `ai` | amber-tint (kept) | calm |

The punch is LOUD BY DESIGN + opt-in (design.md §82 "loud by design and opt-in; the workhorse remains
snappy"). The default button does NOT punch — it lifts warmly. The hero CTA punches. This honors the
lens (maximum flow & punch on the boldest variant) AND idiom (the calm six-layer composite stays the
default; no manic universal overshoot).

---

## 4. THE MECHANISM — tokens / recipes / composables (DRY, no re-fork)

### 4a. The material layer (CONSUME, author nothing new)

| Need | Reused primitive (verified HEAD) | New surface in THIS greenfield |
|---|---|---|
| Warm capsule fill | `.glass-capsule` (tabs amendment `BD.W-TAB-IOS-CAPSULE`, `glass/glass-capsule.css`) | — (consume) |
| Warm-admit floor (the gray fix) | the tabs amendment's warm-floor RE-INVENT on `.glass-capsule` | — (consume) |
| Glass-hover lift | `.glass-capsule-hover` (tabs amendment, composes shared specular-lift) | — (consume) |
| Adaptive-darken seam | `:where(.btn-glass, .segmented-indicator, .glass-capsule)` (DELTA-ASSAY §2a widening) | — (consume) |
| Button blur knob | `--glass-blur-btn` / `.btn-glass.glass-deep` → `--glass-blur-deep` (surfaces.css:224, verified) | — (keep) |
| Specular gleam | `v-specular` directive + `::before` catch-light (`vSpecular.ts`, verified) | — (keep, widen arm) |

The button's job: re-point the CVA variant strings (index.ts) from the inline
`hover:bg-(--glass-bg-resting-tinted) …` near-gray recipe onto `glass-capsule glass-capsule-hover`,
delete the inline fill (clean break, no-legacy), keep `.btn-glass` (blur) + `.focus-ring` + the
size rungs. `Button.vue` keeps its press wiring (`useSpringPress`/`useLiquidFlex`/`v-specular`) —
the punch tier only re-targets the amplitudes + adds the cast caster.

### 4b. The motion layer (DEPEND the booked tokens, re-target the press)

| Need | Reused primitive (verified) | New surface |
|---|---|---|
| Press spring drive | `useSpringPress` (verified `src/composables/motion/useSpringPress.ts`) — the iOS press preset (BC.W-SPRING-EASE owns the 0.15/0.86 row) | — |
| Volume-preserving squish | `useLiquidFlex` reciprocal X/Y (verified) — re-target maxStretch 1.04 → ~1.09 on `.btn-punch` ONLY | — |
| Anti-taffy fence | composed-area ≤ ~1.14 (the tabs amendment's composed-area fence, NOT the bare scalar — DELTA-ASSAY §2c) | — (adopt the same gate arm) |
| Cartoon punch curve | **`--ease-cartoon-punch`** — booked `BD.W-CARTOON-PUNCH` (absent on disk this pass → DEPEND, never mint) | — |
| Rest motion weight | **`--motion-weight`** (1/φ, PRM→0) — booked `BD.W-MOTION-WEIGHT` (absent on disk → DEPEND) | — |
| Moving cartoon cast | `.shadow-cartoon-{md,lg}` + the `::after` caster (design.md §Shadows, `cards.css` `.cartoon-surface` precedent) | `.btn-punch` composes the caster |
| Glyph overlapping-action pop | the glyph scale-pop register the tabs amendment ships (`scale: calc(1 + 0.06 × --motion-weight)`, DELAYED 60ms) | — (consume) |
| Press scale tokens | `--scale-press` (0.96) / `--scale-press-btn` (0.97) / `--scale-hover-btn` (1.05) / `--scale-press-dock` / `--scale-hover-dock` (verified `scale-paper.css`) | — |

`.btn-punch` is the ONE new decoration class this greenfield authors — a cross-cutting interaction
tier (parallel to the existing `surface`/`liquid` axes on `<Button>`), composing the cartoon-shadow
caster + re-pointing the press/hover transitions onto `--ease-cartoon-punch` + the louder squish
amplitude. It is NOT a new material — it sits ON TOP of `.glass-capsule` (the §Shadows
".cartoon-surface composes on top of the host's resolved glass tier" model). `<Button punch>` →
`liquidDecoration`-style computed adds `.btn-punch` (the existing Button.vue decoration-computed
idiom, like `surfaceDecoration`/`liquidDecoration`).

### 4c. The dock layer

`.dock-icon-button` composes `glass-capsule glass-capsule-hover` (DockIconButton.vue classes
computed — it already composes `glass-specular-track`; widen to the capsule pair). Its
`data-active` selected arm re-points onto the tinted-floating capsule. Its flat `--dock-icon-hover-bg`
fill RETIRES (clean break). The dock punch is opt-in via the same `.btn-punch` axis if a consumer
wants a loud dock CTA; the default dock button is calm (a dock of punching icons would be manic).

---

## 5. CROSS-ENGINE (Chrome + Safari) — §L7 floor

- **Material** — `.glass-capsule` is `background` + `backdrop-filter: blur()` + static `box-shadow`
  (rim + recess + drop) + `border-radius`. All compositor-safe, both engines. The warm-admit floor
  is a `color-mix(in oklab/srgb, …)` on the fill — static, both engines. The recess inset is a
  PLAIN per-mode `box-shadow` leg pair (light arm / `.dark` arm), **never a `light-dark()` inset
  fragment** (the inset-shadow trap — it computes the whole box-shadow to `none`; design.md feedback
  + DELTA-ASSAY §REFINE). NO `backdrop-filter: url()` on any button (the SVG lens is the opt-in
  `:liquid` Chromium-gated enhancement only, `@supports (backdrop-filter: url(#…))`, with the
  un-gated blur as the WebKit floor — the existing `.glass-lens` arm, verified surfaces.css:334).
- **Motion** — `--ease-cartoon-punch` is a plain CSS `linear()` easing token (design.md §82 — NOT a
  spring row, NOT a `MOTION_CURVES` entry); it animates `scale`/`translate` (compositor-only) on
  both engines. The squish is `useLiquidFlex`'s imperative `scale` write — no transition double-drive
  (the tabs amendment's imperative-drive fence applies identically: the spring drives the scalar,
  the CSS reads it; never a CSS transition on the same scalar — DELTA-ASSAY §2b). The cartoon cast
  is a `transform` on a `::after` caster, never an animated `box-shadow` (paint-bound, §L7).
- **No meatball on a button** — buttons carry NO goo filter (the §L7 "no goo-filter on an ancestor
  of glass" fence). The capsule is rectangular-lozenge glass, not a metaball. The dock's metaball
  merge is the DOCK PLATE's job (dock-core), not the icon button's.
- **The paired-engine π** — the gate captures Chromium AND WebKit (design.md §L7 "paired-engine π
  capture, never a single-engine green"): the capsule meanChroma ≥ 0.02 over a live aurora both
  modes both engines; the press composed-area ≤ 1.14 both engines; the cartoon cast offset travels
  opposite the gesture both engines.

---

## 6. A11Y / PRM CARVE (§L5)

- **`prefers-reduced-motion`** — `--motion-weight` → 0 (the punch anticipation/overshoot/cast-travel
  + glyph-pop all collapse), `--ease-cartoon-punch` → `--ease-standard` (the §82 PRM collapse — the
  loud curve degrades to the calm bezier), the squish snaps to the endpoint with zero in-between
  frames (`useSpringPress` PRM-safe by construction, verified Button.vue comment). The press STILL
  FUNCTIONS (the scale arrives) — only the in-between physics is off. The capsule lift becomes a
  static opacity/specular cue.
- **`prefers-contrast: more`** — the cartoon cast opacity floors UP (design.md §Shadows — "the inked
  edge is a legibility asset"); the capsule rim/border firms; the focus ring is untouched (the
  `.focus-ring` warm halo the base carries).
- **`prefers-reduced-transparency`** — the capsule rides the existing `--glass-level: 0` opaque-escape
  (the `surface="opaque"` / `solid` endpoint, verified Button.vue surfaceDecoration) — the glass
  collapses to an opaque warm fill, AA-legible. The cartoon cast survives (opaque ink, not a
  transmissive layer — design.md §Shadows "does NOT touch it").
- **Focus** — the `.focus-ring` warm halo stays the single focus source on all variants; the punch
  never replaces it. WCAG 2.5.5 touch floor: the dock button's hit box stays the full
  `--dock-control-size` (the capsule paints the content-box inset, the existing BA.W-DOCK-GEOMETRY
  clearance — verified icon-button.css).
- **AT semantics** — `aria-pressed` on the dock `active` state (verified DockIconButton.vue) +
  `disabled`/`aria-disabled` four-state contract (verified) are untouched — material-only changes.

---

## 7. THE DELTA-ASSAY — wave reconciliation (no dup against the 116 union + tabs amendment)

This greenfield AUTHORS no new material wave — it CONSUMES the tabs amendment's `.glass-capsule` +
`.glass-capsule-hover` (the WAVE-AMENDMENT §E "buttons row RESOLVED by the extraction" made real),
and AUGMENTS the existing button wave with the punch tier. Reconciliation:

- **`BD.W-BUTTON-GLASS`** (the union button wave) — AUGMENT, do not re-author. Fold: (1) the CVA
  variants re-point off the inline near-gray `--glass-bg-*-tinted` recipe onto
  `glass-capsule glass-capsule-hover` (clean break, delete inline fill); (2) the `.btn-punch`
  cross-cutting interaction tier (the ONE new class — cartoon cast + `--ease-cartoon-punch` press +
  louder squish); (3) the `ghost` hover-only capsule bloom; (4) the dock-button capsule re-point
  (RETIRE `--dock-icon-hover-bg` flat fill); (5) the warm-floor born-RED arm (the same C6 the tabs
  amendment adds — capsule meanChroma ≥ 0.02, born-RED on HEAD: button fill chroma 0.0138).
- **`BD.W-TAB-IOS-CAPSULE`** (tabs amendment §A) — DEPEND. The buttons CONSUME `.glass-capsule` +
  `.glass-capsule-hover` + the warm-floor RE-INVENT. The buttons are the 3rd consumer that clears
  the ≥3 overfit floor (segmented pill · dock-tab · **button** — and now dock-icon-button = 4th).
  CROSS-LINK: this greenfield's dock-icon-button re-point is the load it cited.
- **`BD.W-CARTOON-PUNCH`** → ships `--ease-cartoon-punch`. DEPEND, never mint (absent on disk this
  pass — born-RED-verified). `.btn-punch` CONSUMES it.
- **`BD.W-MOTION-WEIGHT`** → ships `--motion-weight`. DEPEND, never mint (absent on disk). The punch
  anticipation/cast/glyph-pop all read it (PRM → 0).
- **`BD.W-GLASS-IOS27-CONTROLS`** — DISJOINT. Its `destructive`→colored-glass register owns the
  `destructive` variant; this greenfield leaves `destructive` to it (NOT the near-gray capsule). No
  collision.
- **The cartoon-shadow register** (design.md §Shadows, `.shadow-cartoon-*` / `.cartoon-surface`) —
  CONSUME. `.btn-punch` composes the existing caster utilities; it authors NO new shadow recipe.

**Born-RED summary (live-verified HEAD):**

| Gate arm | HEAD live state | Verdict |
|---|---|---|
| button capsule meanChroma ≥ 0.02 over aurora, both modes | fill chroma 0.0138 (near-gray) | RED |
| glass variants compose `.glass-capsule` | inline near-gray `--glass-bg-*-tinted`, no shared class | RED |
| dock-icon-button has rest material (capsule) | transparent rest, `backdrop:none` | RED |
| hover composes `.glass-capsule-hover` (shared lift) | flat color/blur cross-fade, no lift | RED |
| `.btn-punch` press reads `--ease-cartoon-punch` | no punch tier; press capped 1.04 / 0.97 | RED until dep lands |
| `--ease-cartoon-punch` / `--motion-weight` on :root | absent in src/styles (booked elsewhere) | RED until deps land |
| moving cartoon cast on `.btn-punch` | no caster on buttons | RED |

Artefacts captured this pass: `brainstorm/lens-c-buttons-current.png` (the pale-gray pill field),
`brainstorm/lens-c-dock-current.png` (the bare-glyph dock). Live readback: button fill
`oklab(0.881 0.0054 0.0127)` chroma 0.0138; `--glass-tint-strength: 0%` (warm seam dormant);
`--glass-tint-source` warm `hsl(30 85% 96%)` both modes; dock-icon rest `rgba(0,0,0,0)` no backdrop;
`--scale-hover-btn` 1.05 / `--scale-press-btn` 0.97 / `--scale-hover-dock` 1.1 / `--scale-press-dock`
0.96; specular hover 0.14.

---

## 8. CONVERGENCE

**Item convergence: ~72%.** The blur ships, the press-squish primitive ships (timid-capped), the
specular-track + `v-specular` auto-arm ship, the tinted-seam plumbing ships (dormant at 0%), the
cartoon-shadow utilities ship, the press-scale tokens ship, the dock four-state contract ships. The
genuine remaining work: (1) the warm-floor RE-INVENT — CONSUMED from the tabs amendment, not
re-authored (the buttons just compose `.glass-capsule`); (2) the dock-button rest-capsule re-point
(born-RED — transparent rest); (3) the `.btn-punch` loud tier (the ONE new class — cartoon cast +
`--ease-cartoon-punch` + louder anti-taffy-fenced squish + glyph overlapping-action); (4) the
`ghost` hover-bloom; (5) the two booked motion tokens (DEPEND). No new material class, no second
spring, no third glass recipe — button · dock-button · tab all drink the ONE `.glass-capsule`. The
gestalt is the bar: the buttons read as WARM glass capsules with a real specular-lift hover, both
modes, and the hero CTA PUNCHES with a 1940s-cel weight — and they are byte-identical material to
the gold-standard tabs, which is exactly what the user asked for, taken literally.
