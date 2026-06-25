# BUTTONS — the GOLDEN reference (glass-by-default, like the tabs, with real hover)

> The canonical synthesis of lens-a (pure iOS-27 fidelity + the EXTRACTION spine),
> lens-b (cross-engine / luminance-ladder rigour), lens-c (cartoon-technicolor PUNCH).
> The user's edict, verbatim: *"our buttons should all be more GLASSY by default, like our
> tabs facility, and have better HOVER states"* + *"the dock BUTTONS should be redolent of
> our glassy TABS — change those AND our DEFAULT BUTTONS to be more like the tabs (with our
> tabs modifications)."*
>
> **The single golden idea: the button system owns NO material.** A `<Button>`, a `.glass-btn`
> icon, and a `<DockIconButton>` become the THIRD/FOURTH consumers of the ONE
> `.glass-capsule` + `.glass-capsule-hover` register the tabs GOLDEN extracts
> (`src/styles/glass/glass-capsule.css`). "Make buttons glassy like the tabs" resolves to a
> ONE-recipe substitution — the gray fill the user sees dies ONCE, at the source, for buttons
> AND tabs AND dock-tabs together. A pure UNION, never a bolt-on, never a parallel button-glass
> fork. The boldest mechanism (the warm capsule fill over a colorful field + the
> specular-lift hover + the opt-in cartoon-punch press) is **live-verified** by a throwaway
> spike (`golden/spike.html`, §9) — GREEN both modes over a vibrant field, Chrome-paint-checked.

---

## 0. SOURCE-VERIFIED status quo (the bar to BEAT — disk + live :5173 this pass)

Grep + read of `src/` cross-checked against all three lenses' live readback.

| Probe | Disk / live truth | Verdict |
|---|---|---|
| `default` Button rest fill | live `oklab(0.881 0.0054 0.0127 / 0.328)` → **chroma 0.0138** | **< 0.02 → NEAR-GRAY** — the user's "not glassy" is THIS (same disease as the tabs capsule 0.0128) |
| every glass variant (`glass`/`secondary`/`outline`/`accent`/`primary-audacious`) | identical near-gray fill | uniform defect — the whole glass family is gray-by-default |
| `--glass-tint-strength` at `:root` | **`0%`** | the warm-admit seam is DORMANT at rest (it is the ambient-darken knob, not a warmth floor) — the gray's ROOT cause |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | **WARM both modes** — the warm source EXISTS, it is simply not admitted at rest |
| the W55 seam | `surfaces.css:282` `:where(.btn-glass, .segmented-indicator)` | element-scoped — must widen to `.glass-capsule` |
| `--glass-blur-btn` ~10–13px backdrop | `surfaces.css:188` `.btn-glass { backdrop-filter: var(--glass-blur-btn) }`; `.btn-glass.glass-deep` → `--glass-blur-deep` (`:224`) | **FIT** — the real glass blur ships; the COLOR is the only defect |
| `default` `::before` specular at rest | `opacity: 0`, `mix-blend: plus-lighter`, auto-armed by `v-specular` (Button.vue:187) | **NO gleam at rest**; hover bumps 0.14 — a flat cross-fade, **no LIFT** |
| `default`/`glass` hover | `hover:bg-(--glass-bg-resting-tinted)` + border swap, **`scale:1`** | **surface-only** — the user's "better hover" gap; only `primary`/`gold-audacious` lift (`--scale-hover-btn` 1.05) |
| coupled press | `useSpringPress` + `useLiquidFlex` reciprocal squish (Button.vue:90–141), `--scale-press-btn` 0.97, `maxStretch` 1.04 | **FIT** — squishy interruptible press SHIPS (timid amplitude, by design) |
| `.dock-icon-button` rest | live `rgba(0,0,0,0)`, `backdrop: none`, `box-shadow: none` | **NO glass at rest** — a bare transparent square; glass paints only on `::before` hover/active (material.css fork) |
| `.dock-icon-button` active | live `srgb 0.994 0.96 0.926 / 0.8` (R>G>B, warm-cream) | warm-cream BUT via a `::before` material FORK (`--dock-control-active-bg`), not `.glass-capsule` |
| `.glass-btn` (the icon primitive) | inline `--glass-bg-wash` gray fill + `:hover` `--background 85%` + `.is-active` `--surface-tint-*` (GRAY tint — no-gray fence breach) | **gray fill + gray active** — re-point onto the capsule |
| `--motion-weight` / `--ease-cartoon-punch` | grep `src/styles/` → **0 hits** | **phantoms** — MINTED by the tabs GOLDEN (DEPEND, never mint here) |
| `.glass-capsule` / `-hover` / `-track` | grep `src/` → **NONE** | **born-RED upstream** — the tabs GOLDEN mints them; buttons CONSUME them |

**Visual gestalt (the read the user rejects):** over the vibrant field the glass buttons read as
**flat translucent gray pills** — the blur is real, the fill is colorless, so they look like
frosted-acrylic chips, not warm liquid glass; the default hover is a flat color cross-fade with no
lift; the dock icon buttons are INVISIBLE at rest. The root cause is the SAME warm-admit gap the
tabs GOLDEN already fixes — so the buttons are fixed for free by refusing to own a material.

**Net triage — REFINE-dominant, ZERO new material, ONE consumed re-invent:**
the CVA architecture, the `useSpringPress` squish, the `v-specular` auto-arm, `--glass-blur-btn`,
the `.btn-pill`/`.tap-squish` motion split, the `surface=`/`liquid=` axes — ALL fit and survive.
The single load-bearing defect (the gray fill + the lift-less hover) is RESOLVED by COMPOSING the
tabs-extracted `.glass-capsule` + `.glass-capsule-hover`. The buttons GOLDEN authors **one** new
opt-in decoration class (`.btn-punch`, lens-c) and **zero** new material.

---

## 1. The golden design — ONE coherent resolution of the three lenses

**One sentence:** every glass button is a **warm-transmissive lit lozenge** (the tabs capsule you
can press) that **lifts a hair of glass with a specular bloom on hover** and **squishes with real
weight on press** — and the *hero CTA* opt-in **PUNCHES** (anticipates, over-inflates, follows
through with a 1940s-cel cast); the dock icon button is the SAME warm lozenge seated quietly in the
dock gutter; all of them resolve the SAME six-layer `.glass-capsule`, so a button · a dock button ·
a segmented pill · a dock tab are the EXACT SAME glass with the EXACT SAME hover — which is, taken
literally, "make them all like the tabs."

### The reconcile of the three lenses (what each contributes, where they tensioned)

- **lens-a → the EXTRACTION is the spine.** Its boldest move — *delete the entire button glass
  material; buttons own NO material; substitute every variant onto the ONE `.glass-capsule` +
  `.glass-capsule-hover` and delete the button-side material wholesale (no alias)* — is GOLDEN's
  structural backbone. The variant-by-variant substitution + the `.glass-btn` fold + the
  `DockIconButton` selected-fill join are taken from lens-a verbatim.
- **lens-b → the LUMINANCE-LADDER + the SIMPLEST-mechanism is the binding bar.** Its insistence
  that the fix be the CONSUME (not a button-local warm-floor `color-mix` that would ship a THIRD
  diverging recipe) is GOLDEN's DRY law. Its paired-engine painted-pixel π (drive a real
  `:hover` + `pointerdown`/`pointerup`, sample the painted scale + specular delta + chroma over the
  LIVE field both modes, never a hardcoded-hsl spike) is GOLDEN's acceptance spine. Its
  dock-rest-quiet-lozenge and ghost-stays-flat carves are honored.
- **lens-c → the PUNCH is the motion soul, FENCED to opt-in.** Its `.btn-punch` cross-cutting
  interaction tier (the cartoon-punch press + the moving inked cast + the glyph overlapping-action
  pop) is GOLDEN's "FLOW & PUNCH" layer — but **fenced**: the workhorse default stays the calm
  bounded spring (lens-b's caution against a manic universal overshoot), the punch is the deliberate
  hero (`primary-audacious`/`gold-audacious` + an opt-in `punch` prop on any glass variant), and the
  squish area is capped (anti-taffy) per the tabs composed-area fence.

**The tension resolved (audacity vs correctness vs cross-engine):** lens-c's full cartoon punch is
bold but risks taffy + paint cost; lens-b demands the simplest cross-engine mechanism. GOLDEN keeps
the punch but (a) makes it OPT-IN (calm default = the workhorse, ≤10% overshoot bounded spring),
(b) re-targets the EXISTING `useSpringPress`/`useLiquidFlex` primitive (no second spring/rAF) at a
louder amplitude capped to the composed-area fence (area ≤ ~1.14), (c) builds the cast as a
`::after` caster `transform` (never an animated `box-shadow`). Every channel is compositor-only —
`backdrop-filter: blur()` + static `box-shadow` + `scale`/`translate` + a `plus-lighter` `::before`
— so Chrome == Safari by construction. No `backdrop-filter: url()` on any button, no SVG goo, no
meatball (buttons are lozenge glass, not metaballs).

### Three cleanly separable layers (the same shape as the tabs GOLDEN)

```
┌─ MATERIAL ─ .glass-capsule + .glass-capsule-hover   (CONSUMED from the tabs GOLDEN — authored ZERO here)
│             warm-glass fill + rim + lift + the NEW glass hover
├─ MOTION ──── useSpringPress + useLiquidFlex (the coupled squish, KEPT byte-for-byte)
│             scaled by --motion-weight; the hero CTA opts into --ease-cartoon-punch   (DEPEND)
└─ PUNCH ───── .btn-punch (the ONE new class) — cartoon cast + glyph pop + louder fenced squish (opt-in)
```

---

## 2. The MATERIAL layer — buttons COMPOSE `.glass-capsule` (author nothing new)

The tabs GOLDEN owns `src/styles/glass/glass-capsule.css` (`@layer components`) and the
`surfaces.css` seam widen. The buttons GOLDEN CONSUMES three classes (verbatim — no re-author):

| Class (tabs-owned) | Owns | Button consumes it as |
|---|---|---|
| `.glass-capsule` | `--glass-bg-floating-tinted` fill (the W55 element-level adaptive seam, warm both modes, never gray) + `--glass-rim-top`/`-bottom` + `--glass-shadow-floating` + `--glass-blur-floating`, on `--radius-pill` | the glass-register variant BASE (replaces the inline `glass-wash btn-glass` composite + the raw `hover:bg-*` chains) |
| `.glass-capsule-hover` | `--glass-specular: 0.14` catch-light bloom + `scale: 1.015` hover / `scale: 0.97` press, fast bezier clock, volume-preserving | EVERY interactive glass button (replaces the surface-only hover + the per-variant `hover:scale-*`) |
| `.glass-capsule-track` | the recessed warm channel (rim + `inset … --tab-track-recess-ink`) | NOT a button base — a future button-GROUP/segmented host only (cross-link, no build here) |

### 2a. The CVA substitution (the gray dies — clean break, no alias)

`src/components/ui/button/index.ts`. Every glass variant DROPS its inline near-gray recipe and
composes the capsule pair. The variant KEYS stay (no public-prop break); only the class strings
collapse. The `--glass-blur-btn` prominence ladder is PRESERVED via `.btn-glass` (kept for the blur
knob + the tinted-seam `:where()` membership the tabs GOLDEN widens to `.glass-capsule`):

| Variant | New class string (sketch) | Prominence |
|---|---|---|
| `default` / `glass` / `primary-audacious` (hero) | `glass-capsule glass-capsule-hover btn-glass glass-deep` | DEEP blur (apple.com-nav-grade) |
| `outline` / `secondary` / `accent` (quiet de-shadcn triplet) | `glass-capsule glass-capsule-hover btn-glass` + `--glass-capsule-fill: var(--glass-bg-quiet-tinted)` per-variant | quiet rung — **prominence by TINT, not slab** (the apple.com rule already in the CVA comments) |
| `gold-audacious` | `glass-capsule glass-capsule-hover btn-glass` + `--glass-accent: var(--color-gold)` | the gold reads in the GLEAM, not a flat plate (§2c) |
| `ai` | `glass-capsule glass-capsule-hover btn-glass` + `--glass-accent: <amber>` | amber accent in the gleam |
| `ghost` | text-first at rest; `hover:` composes `.glass-capsule-hover` ONLY (the capsule blooms in on enter, fades on leave) | ink at rest, glass on hover — even the quietest button answers the "better hover" ask |
| `link` | text-only (untouched) | — |
| `destructive` | colored-glass (the disjoint `W-GLASS-IOS27-CONTROLS` register) | NOT the near-gray capsule — left to its owner wave |

**DELETED (clean break, no-legacy):** the raw-rung `hover:bg-(--glass-bg-resting-tinted)` /
`active:bg-*` / `aria-pressed:bg-*` chains across the six glass variants; the `gold-audacious`
static `background-image` gold gradient; the per-variant `hover:scale-(--scale-hover-btn)`. The
adaptive seam (now reaching `.glass-capsule`) + `.glass-capsule-hover` REPLACE them — and they close
the substitution-vs-inheritance trap (the seam's `contrast-color()` ink flip + content-tier floor
reach the LIT fill, so the warmer fill stays AA over a bright field, both modes).

### 2b. `.glass-btn` (the icon primitive) + `DockIconButton` fold onto the capsule

- **`.glass-btn`** — its inline `--glass-bg-wash` gray fill + the `:hover` `--background 85%` + the
  `.is-active` `--surface-tint-*` GRAY active fills RE-POINT onto `.glass-capsule` /
  `.glass-capsule-hover` / the capsule selected fill. The fixed-square geometry + `contain: paint`
  + the icon-flex stay. The `--surface-tint-*` gray fills DIE (the no-gray fence, clean break).
- **`DockIconButton`** — KEEP the transparent REST (the dock's hairline-rail idiom — a bare icon in
  the gutter is not a pill; BE WF-3). But the `[data-active]`/`[aria-pressed]` SELECTED state
  re-points its `--dock-control-active-bg` `::before` fill onto `.glass-capsule` (the tabs GOLDEN
  already folds the dock-tab selected fill onto the capsule — `DockIconButton`'s selected fill joins
  the SAME fold). So a selected dock control reads the SAME warm lit lozenge as a selected tab and a
  glass button. The `v-specular` gleam is UNTOUCHED. The `DockIconButton.vue` classes computed gains
  `glass-capsule-hover` (so the dock icon LIFTS on hover, the user's literal "redolent of the tabs").
  reka behaviour INVIOLATE — only the class strings + the `::before` selected-fill token move.

  > lens-a/lens-b tension resolved: lens-b proposed a *rest* quiet-capsule lozenge for every dock
  > icon (every slot a glass well); lens-a kept the transparent rest (the hairline-rail idiom). GOLDEN
  > takes lens-a's rest (transparent — the dock gutter idiom is shipped + correct) + lens-b/c's
  > hover/selected (compose `.glass-capsule-hover` + the capsule selected fill). The dock icon is
  > flat-at-rest, lifts-warm-on-hover, lit-lozenge-when-selected — KISS, no rest-paint regression.

### 2c. The accent — `--glass-accent` per-variant, the gold/amber reads in the gleam

`gold-audacious` sets `--glass-accent: var(--color-gold)` (+ `--glass-accent-strength`) on the
capsule (BB.W-GLASS-ACCENT, the catch-light core OKLab-mixes toward the accent). The gold reads in
the SPECULAR core + the rim glint where the pointer grazes — the warm-gold lit lozenge, not a flat
gradient plate. `ai` maps to its amber accent the same way. Default `--glass-accent: transparent` →
byte-identical warm-cream at rest (provable no-op). ONE accent axis, the static gold `background-image`
fork DELETES.

---

## 3. The HOVER — the user's headline "better hover states" (`.glass-capsule-hover`)

The default path today is surface-only (`scale: 1`, a flat bg cross-fade). GOLDEN's hover is the
tabs glass-hover, COMPOSED — a genuine two-channel glass LIFT, not a new recipe:

- **Specular bloom** — `.glass-capsule-hover:hover { --glass-specular: 0.14 }`; the `::before` gleam
  already tracks the pointer (`v-specular`), so the hover raises its catch-light intensity rung. ONE
  specular declaration shared with `.glass-drag-lift` (composes, never forks).
- **Scale lift** — `scale: 1.015` (a hair of glass rising toward the cursor) on the FAST bezier
  clock (`--duration-fast` `--ease-standard`) — hover is a bezier ease, the §6 doctrine (a color
  cross-fade on a spring wobbles; transforms that need settle ride springs, the bezier hover does
  not). This is the lift the user wants made UNIVERSAL — EVERY glass button gets it (today only
  `primary`/`gold-audacious` lift), and `primary-audacious` loses its special 1.05 in favor of
  reading as the hero via deep blur + accent.
- **Press snap** — `.glass-capsule-hover:active { scale: 0.97 }`, the `--scale-press` floor that the
  JS `useSpringPress`/`useLiquidFlex` ENHANCES into the volume-preserving reciprocal squish while
  pressed (the inline scale wins; pre-hydration the CSS floor is the press — the SSR floor).

Position (the `v-specular` directive) + lift (`.glass-capsule-hover`) compose — the same two-channel
split the tabs use. No third hover fork; the §0 flat hover is replaced by the real lit-lozenge lift.

---

## 4. The PRESS + the PUNCH — liquid-weight squish, with an opt-in cartoon tier (lens-c, fenced)

### 4a. The calm workhorse press (KEEP byte-for-byte)

`useSpringPress` → `useLiquidFlex` reciprocal X/Y squish (Button.vue:90–141) is FIT and untouched:
the volume-preserving squish coupled to the `--scale-press-btn` 0.97 shrink, interruptible, released
at settle on the spring's own clock, the inline-`scale`-wins single-source. Two DEPEND multiplies
elevate it toward the cartoon register WITHOUT a button-local literal:

- `--motion-weight` (DEPEND, tabs GOLDEN mints it, 1/φ rest, PRM→0) co-scales the reciprocal squish
  depth — the universal liquid-weight floor (inertia/bounce on the press), one multiply on the
  EXISTING amplitude (the same composition the tabs blob uses). No second spring.
- When BC.W-SPRING-EASE re-points the `press` preset onto Apple's `interactiveSpring` (0.15/0.86),
  the press answers in the sub-100ms iOS window with ZERO edit here (already booked, DEPEND).

### 4b. `.btn-punch` — the ONE new class (the LOUD opt-in hero tier, lens-c's boldest move)

A cross-cutting interaction tier (parallel to the existing `surface=`/`liquid=` axes), composed via
a `punchDecoration` computed in `Button.vue` (the existing `surfaceDecoration`/`liquidDecoration`
idiom). It sits ON TOP of `.glass-capsule` (it is NOT a material) and is the default for
`primary-audacious`/`gold-audacious`, opt-in via a `punch` prop on any glass variant. It re-targets
the EXISTING press primitive at a louder, fenced amplitude + adds the cast:

1. **Anticipation** — on the `scale` leg the press rides `--ease-cartoon-punch` (DEPEND — the raw
   `linear()` with a real ~4% pre-dip below origin, which no damped spring expresses), gated by
   `--motion-weight`. The hero CTA dips a beat before it depresses.
2. **Squash** — `useLiquidFlex` `maxStretch` re-targets 1.04 → ~1.09 on `.btn-punch` ONLY, still
   volume-preserving, still under the composed-area fence (area ≤ ~1.14 — the tabs anti-taffy bar,
   NOT the bare scalar).
3. **Overshoot + follow-through** — on release the `--ease-cartoon-punch` overshoot arm settles
   (the follow-through the calm ≤10% spring forbids).
4. **Overlapping action** — the GLYPH/label settles a beat (~60ms) AFTER the capsule (the glyph
   scale-pop register the tabs GOLDEN ships, `scale: calc(1 + 0.06 × var(--motion-weight))`, DELAYED)
   — child trails parent.
5. **The moving inked cast** — a `::after` caster reads `.shadow-cartoon-{md,lg}` (NEVER an animated
   `box-shadow` — paint-bound, §6); on hover the cel-shadow DEEPENS (`-md`→`-lg`, the lozenge lifts
   off the page); on press the offset TRAVELS opposite the press `translate`, scaled by
   `--motion-weight` (the cel's light source stays fixed while the object moves), a compositor-cheap
   `transform`.

The calm default does NOT punch — it lifts warmly. The hero CTA punches (design.md §82 "loud by
design and opt-in; the workhorse stays snappy"). A dock of punching icons would be manic, so the
default dock button is calm; `punch` stays available if a consumer wants a loud dock CTA.

---

## 5. The UNION ledger (deft, KISS, DRY — no re-fork)

| Need | Reused primitive (verified HEAD/upstream) | New surface in THIS greenfield |
|---|---|---|
| Warm glass fill | `.glass-capsule` (tabs GOLDEN, warm-floor) | — (COMPOSE) |
| Glass hover lift | `.glass-capsule-hover` → `.glass-drag-lift` (tabs GOLDEN) | — (COMPOSE) |
| Quiet-tier prominence | `--glass-bg-quiet-tinted` (`surfaces.css:297`) | `--glass-capsule-fill` per-variant knob |
| Blur ladder | `--glass-blur-btn` / `.btn-glass.glass-deep` → `--glass-blur-deep` (`surfaces.css:224`) | — (KEEP) |
| Adaptive seam | `:where(.btn-glass, .segmented-indicator, .glass-capsule)` (tabs GOLDEN widen) | — (CONSUME) |
| Moving gleam position | `v-specular` directive (Button/DockIconButton, AUTO-ARM) | — (KEEP) |
| Squishy press | `useSpringPress` + `useLiquidFlex` (Button.vue:90–141) | — (KEEP byte) |
| Press iOS window | `press` SPRING_PRESETS row (BC.W-SPRING-EASE) | — (DEPEND) |
| Liquid-weight squish | `--motion-weight` (tabs GOLDEN mints) | — (DEPEND, one multiply) |
| Cartoon punch curve | `--ease-cartoon-punch` (tabs GOLDEN mints) | — (DEPEND, `.btn-punch` only) |
| Glyph overlapping-pop | the tabs GOLDEN glyph scale-pop register | — (CONSUME) |
| Moving cartoon cast | `.shadow-cartoon-{md,lg}` + `::after` caster (design.md §Shadows, `.cartoon-surface` precedent) | `.btn-punch` composes the caster |
| Per-instance accent | `--glass-accent`/`-strength` (BB.W-GLASS-ACCENT, `property-regs.css:178`) | gold/ai/amber variant set |
| Dock selected fill | `.glass-capsule` selected fold (tabs GOLDEN) | — (DockIconButton joins the fold) |
| Refraction edge | `.glass-lens` `:liquid` opt-in (`@supports url()`-gated, `surfaces.css:334`) | — (KEEP) |
| Four-state contract | CVA base + `.focus-ring` + `--control-*` comfort axis | — (KEEP) |

**ZERO new material, ZERO new component, ZERO second spring/rAF.** The ONE new class is `.btn-punch`
(an opt-in interaction DECORATION on top of the capsule, parallel to `surface`/`liquid`). The button
CVA SHRINKS: its glass variants drop the inline `.btn-glass` composite + the per-variant
`hover:bg-*`/`scale-*` strings and become `glass-capsule glass-capsule-hover btn-glass` + a
`--glass-accent` set + the size/ink. Buttons + tabs + dock-buttons consume the ONE register.

---

## 6. Cross-engine (Chrome + Safari) — §L7 floor

Every channel is compositor-only + Safari-native by construction:

- **Material** — `.glass-capsule` is `background` (a static `color-mix(in oklab, …)` → resolves to a
  static `oklab()` fill at paint, no per-frame interpolation, both engines render the same paint) +
  `backdrop-filter: blur()/saturate()` (the build-time `-webkit-` prefix pass) + static `box-shadow`
  rim/lift + a `plus-lighter` `::before` gleam. All four composite identically on Blink and WebKit.
- **The recess inset** (track only, not a button base) is a PLAIN per-mode `box-shadow` leg pair,
  NEVER a `light-dark()` inset fragment (the inset-shadow trap — a `light-dark()` inset fragment
  computes the WHOLE box-shadow to `none`; the recess would silently vanish).
- **Motion** — hover/press = `scale` + `--glass-specular` (an `@property`-registered scalar the
  `::before` opacity reads, interpolable, both engines) only. The `--glass-btn-press-t` LERP is one
  var read per frame during the press, released at settle (no free-running rAF). `--ease-cartoon-punch`
  is a plain CSS `linear()` easing on `scale`/`translate` (compositor-only); the squish is
  `useLiquidFlex`'s imperative `scale` write — never a CSS transition on the same scalar (no
  double-drive). The cartoon cast is a `transform` on a `::after`, never an animated `box-shadow`.
- **No `backdrop-filter: url()` on any button** — the SVG `:liquid` lens is the opt-in,
  `@supports (backdrop-filter: url(#…))`-gated Chromium enhancement with the un-gated `.btn-glass`
  blur as the WebKit floor (already shipped). **No SVG goo, no meatball** — buttons are
  rounded-lozenge glass, not metaballs (the goo/metaball law binds the dock-fission viz, N/A here).
- **The π is paired-engine** (chromium + webkit), both modes — the same paired arm the tabs capsule π
  carries.

---

## 7. A11y / PRM carve

- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes the cartoon squash/anticipation +
  the cast travel + the glyph pop; `--ease-cartoon-punch → --ease-standard` (the loud curve degrades
  to the calm bezier); `useSpringPress` snaps to the endpoint (the press FUNCTIONS, the squish
  physics off); `v-specular` skips the write (the catch-light pins static-centre). The capsule fill +
  rim + lift are STATIC (present for everyone — a lit lozenge needs no motion).
- **Contrast** — the warm-floor capsule reads the W55 adaptive seam (the `contrast-color()` ink flip
  + content-tier floor reach the lit fill) → text stays AA both modes, both fields (warmer ≠ less
  legible). The cartoon cast opacity floors UP under `prefers-contrast: more` (the inked edge is a
  legibility asset).
- **Reduced-transparency** — the capsule rides the existing `--glass-level: 0` opaque escape
  (the `surface="opaque"`/`solid` endpoint) — the glass collapses to an opaque warm fill, AA-legible.
  The cartoon cast survives (opaque ink). No bespoke button arm.
- **Focus** — the `.focus-ring` warm halo (the base CVA) is the single focus source on all variants,
  UNTOUCHED; the punch never replaces it.
- **Tap target / AT** — the WCAG 2.5.5 hit box stays the full `--control-h-*` / `--dock-control-size`
  (the capsule paints the content-box inset); `aria-pressed`/`disabled`/`aria-disabled` four-state
  contract untouched (material-only changes).

---

## 8. The acceptance bar + the born-RED gate

The π MUST drive the REAL gesture (`:hover` + a `pointerdown`/`pointerup` cycle) and judge **painted
pixels** — no arithmetic, no stop-string, no computed-not-measured. `tests-visual/button-glass.spec.ts`,
**chromium + webkit**, both modes, over a LIVE vibrant field, NEVER `reducedMotion` on the motion arms.

| # | Gate arm | HEAD live state | Verdict |
|---|---|---|---|
| 1 | `default` Button fill meanChroma ≥ 0.02 over the field, both modes | `oklab(…0.0138)` near-gray | **RED** |
| 2 | every glass variant (glass/secondary/outline/accent/primary) clears 0.02 | all 0.0138 | **RED** |
| 3 | `.glass-capsule` exists + Button + `.glass-btn` + DockIconButton compose it (≥3 consumers, with tabs ≥4) | class absent; parallel forks | **RED** |
| 4 | bare `default` HOVER lifts (painted `scale` > 1 + `--glass-specular` bloom delta > 0) | surface-only, `scale: 1` | **RED** |
| 5 | the press SQUISHES (painted reciprocal `scale`, X·Y volume-preserving, area within the fence) on `pointerdown` | squish ships (calm) | GREEN (KEEP — re-assert) |
| 6 | `.btn-punch` press: anticipation pre-dip (center moves opposite ≥1px before depress) + area peak within ≤1.14 | no punch tier | **RED until dep lands** |
| 7 | dock SELECTED control resolves the SAME computed `background-color` as a selected tab + a glass button (the shared capsule) | `::before` fork | **RED** |
| 8 | dock icon HOVER lifts (composes `.glass-capsule-hover`) | flat fill swap | **RED** |
| 9 | `gold-audacious` gold reads in the gleam (accent-channel luminance non-zero at the grazing edge), NOT a flat plate | static `background-image` plate | **RED** |
| 10 | PRM: one static frame at fit, `--motion-weight: 0`, fill+rim+lift present, no punch/cast/pop | (deps absent) | gate-ready |
| 11 | KEEP fence: blur 10–16px, `v-specular` auto-arm, `.focus-ring` halo, four-state contract | all present + fit | GREEN (preserved) |

**Detector self-test bites:** a `--glass-tint-strength`-pinned-0 control (no warm floor) → arm 1/2
RED; a `scale:1`-pinned control → arm 4 RED; a button-local warm-floor `color-mix` (a THIRD recipe,
not the capsule) → arm 3 RED; a `--motion-weight: 0` control → arm 6 RED; a punch area peak > 1.14
(taffy) → arm 6 RED; a flat gold plate → arm 9 RED; a `light-dark()` inset on the track recess
(computes to `none`) → the track-recess sub-arm RED; a single-engine green → the paired-engine gate
RED.

---

## 9. The spike — live-verified de-risk of the boldest mechanism

`golden/spike.html` (throwaway, greenfield-dir — no `src/` touched). A self-contained page that
mirrors the EXACT shipping mechanism: the warm-floor `.glass-capsule` fill over a vibrant
purple/teal field (the warm-admit `color-mix(in oklab, …, --glass-tint-source <floor>)` — the
load-bearing gray fix), the `.glass-capsule-hover` two-channel hover (`--glass-specular` bloom +
`scale: 1.015`), the coupled press squish (`--scale-press` + reciprocal `scale`), and the
`.btn-punch` cartoon-punch press on `--ease-cartoon-punch` with the moving `::after` cast + the
glyph pop. Driven in Chrome via the gate readback (`window.__gate()`), both modes.

**The gate arms the spike proves (the load-bearing mechanism, BEFORE any `src/` change):**

| Assertion | Spike result | Verdict |
|---|---|---|
| Rest fill meanChroma ≥ 0.02 over the field, BOTH modes (warm, not gray) | light 0.039 / dark 0.031 | **GREEN** (> 0.02) |
| HOVER painted `scale` > 1 + specular bloom delta > 0 | scale 1.015, `--glass-specular` 0→0.14 | **GREEN** |
| PRESS reciprocal squish, area within the fence (volume-preserving) | calm peak area 1.04; punch peak 1.118 (≤ 1.14) | **GREEN** |
| PUNCH anticipation: center dips OPPOSITE before depress (curve dips < 0) | `--ease-cartoon-punch` sampled −0.04 | **GREEN** |
| Cross-engine: zero `backdrop-filter:url`, zero SVG goo, all `scale`/`box-shadow`/blur | grep clean | **GREEN** |

Artefacts: `golden/spike.html`, `golden/spike-light.png`, `golden/spike-dark.png`,
`golden/gate.json`. The boldest mechanism (warm capsule both modes + specular-lift hover + fenced
cartoon punch) is proven sound and cross-engine-safe BEFORE any `src/` change.

---

## 10. The build order + the named consumed register

**The buttons GOLDEN authors NO new material wave — it CONSUMES the tabs GOLDEN's `.glass-capsule` +
`.glass-capsule-hover` and AUGMENTS the existing button wave with the substitution + the punch tier.**

1. **DEPEND (upstream first):** the tabs GOLDEN lands `glass/glass-capsule.css` (`.glass-capsule` +
   `.glass-capsule-hover`), widens the `surfaces.css:282` `:where()` to `.glass-capsule`, mints
   `--motion-weight` + `--ease-cartoon-punch`. Buttons build AFTER.
2. **SUBSTITUTE (the gray dies):** `button/index.ts` glass variants re-point onto
   `glass-capsule glass-capsule-hover btn-glass` (+ `glass-deep` on the hero, `--glass-capsule-fill`
   on the quiet triplet, `--glass-accent` on gold/ai); DELETE the inline `hover:bg-*`/`scale-*`
   chains + the gold `background-image` (clean break, no alias).
3. **FOLD THE PRIMITIVES:** `.glass-btn` re-points onto the capsule (delete the `--glass-bg-wash` +
   `--surface-tint-*` gray fills); `DockIconButton` composes `.glass-capsule-hover` + joins the
   capsule selected-fill fold (keep the transparent rest).
4. **PUNCH:** author `.btn-punch` (the ONE new class — cartoon cast `::after` + `--ease-cartoon-punch`
   press + the fenced louder squish + the glyph pop); add `punchDecoration` in `Button.vue` (the
   `surfaceDecoration`/`liquidDecoration` idiom); default-on for `primary-audacious`/`gold-audacious`,
   opt-in `punch` prop elsewhere; re-target `useLiquidFlex` `maxStretch` 1.04→~1.09 on `.btn-punch`.
5. **GATE:** the paired-engine π (§8) + the detector self-test bites.

> ## THE NAMED CONSUMED REGISTER (buttons own NO material)
>
> A `<Button>`, a `.glass-btn` icon, a selected `<DockIconButton>`, a segmented pill, and a selected
> dock tab all paint the SAME **`.glass-capsule`** (warm-transmissive lifted lozenge, never gray,
> both modes) + the SAME **`.glass-capsule-hover`** (specular catch-light bloom + 1.5% scale lift on
> hover / press-snap on active). The buttons GOLDEN adds exactly ONE thing of its own: **`.btn-punch`**
> — the opt-in cartoon-technicolor interaction tier (anticipation + over-inflation + follow-through +
> moving inked cast + glyph overlapping-action) for the hero CTA, FENCED so the workhorse stays calm.
> "Make our buttons glassy like the tabs, with better hover states" = compose the capsule pair, set
> `--glass-accent`, done. DRY, KISS, no parallel button-glass fork, no legacy.

---

## THE SINGLE BOLDEST MOVE

**Delete the entire "button glass material" — buttons own NO material at all, and the hero CTA
PUNCHES.** Every glass button's gray fill, its raw-rung `hover:bg-*` chains, and the `.glass-btn` /
`DockIconButton` material forks are SUBSTITUTED onto the ONE tabs-extracted `.glass-capsule` +
`.glass-capsule-hover` and deleted wholesale (no alias). A `<Button>`, a `.glass-btn` icon, a
selected dock control, a segmented pill, and a dock tab become the EXACT SAME warm lit lozenge with
the EXACT SAME glass-hover — the gray the user sees is not a button bug, it is the gray the tabs
GOLDEN already kills, and the buttons get fixed for free by refusing to have a material of their own.
Then, on top of that shared calm material, the deliberate hero CTA opts into `.btn-punch` and reads
with the WEIGHT and ARC of a 1940s cel — anticipation, over-inflation, follow-through, a moving inked
cast — while remaining, by construction, perfect in Chrome AND Safari.
