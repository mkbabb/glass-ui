# BUTTONS — DELTA-ASSAY (golden-vs-current + the UNION path)

> The deft integration of `buttons/GOLDEN.md` (FOLDING challenge §§1-3 hardenings) into the
> shipped Button CVA + `.glass-btn` + `DockIconButton`. Survival of the fittest: KEEP what is
> fit, REFINE what is weak, RE-INVENT only what is broken. No legacy, no dual-path, no parallel
> button-glass fork.
>
> **Triage verdict: REFINE-dominant — ZERO new material, ONE consumed RE-INVENT (the warm-floor
> capsule fill, inherited from the tabs amendment), ONE genuinely-new opt-in class (`.btn-punch`).**
> The CVA architecture, the `useSpringPress`/`useLiquidFlex` squish, the `v-specular` auto-arm, the
> `--glass-blur-btn` blur ladder, the `.btn-pill`/`.tap-squish` split, the four-state contract — ALL
> fit and survive. The single load-bearing defect (the gray fill + the lift-less hover + the dock
> transparent rest) is RESOLVED by COMPOSING the tabs-extracted `.glass-capsule` +
> `.glass-capsule-hover`. Every lever below was source-verified + **live-measured** on
> `/display/buttons` + `/dock/overview` (Chrome :5173) this pass.
>
> **The challenges land on the SPIKE, not the design.** All three unanimously refute the GOLDEN's
> §9 "live-verified GREEN" claim: the spike's chroma gate is field-bleed arithmetic that would pass
> a gray button (R1, all three), it de-risks a phantom `--glass-capsule-floor` recipe neither doc
> ships (R2), and three motion arms are constants/regex not paint (R3). The DESIGN survives; the
> PROOF must be re-grounded. This assay FOLDS those hardenings into the build path + the gate.

---

## 0. LIVE-MEASURED status quo (the bar to BEAT — Chrome :5173, this session)

Driven the REAL surfaces: `/display/buttons` (61 buttons), `/dock/overview` (76 dock icon
buttons). `getComputedStyle` on the painted variants + the dock `::before`.

| Probe | Live measurement | Reading |
|---|---|---|
| `default` / `glass` / `outline` Button rest `background-color` | **`oklab(0.881 0.0054 0.0127 / 0.328)` → chroma 0.0138** | **< 0.02 → NEAR-GRAY** — the user's "not glassy" is THIS (same disease as the tabs capsule 0.0128) |
| every glass variant (one readback, three variants) | IDENTICAL `oklab(0.881…)` fill | uniform defect — the whole glass family is gray-by-default |
| `--glass-tint-strength` on `:root` | **`0%`** | the warm-admit seam is DORMANT at rest — the gray's ROOT cause (challenges R2/R3 confirmed live) |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | **WARM both modes** — the warm source EXISTS, it is simply not admitted at rest |
| `default` rest `scale` | **`1`** | **NO lift at rest** (identity base only) |
| `default` rest `box-shadow` | `rgba(255,255,255,0.18) 0 0 0 0.75px inset, …` | a hairline rim — fit, KEEP |
| `default` backdrop-filter | `blur(16px) saturate(1.8)` | **FIT** — real deep glass blur ships; the COLOR is the only defect |
| `glass` backdrop-filter | `blur(13px) saturate(1.6) brightness(1.02)` | **FIT** — the `--glass-blur-btn` quiet rung |
| `.dock-icon-button` rest (host + `::before`) | host `rgba(0,0,0,0)`, `backdrop: none`; `::before` opacity 0, bg `rgba(0,0,0,0)` | **NO glass at rest** — a bare transparent square (the hairline-rail idiom — lens-a's KEEP) |
| `.glass-btn:hover` fill | `surfaces.css:95` `color-mix(in srgb, --background 85%, transparent)` | gray-ish hover (no-gray fence breach) |
| `.glass-btn.is-active`/`[aria-pressed]` | `surfaces.css:118` `--surface-tint-10` + `--surface-tint-25` border | **GRAY active fill** — the no-gray fence breach the GOLDEN cites |
| the W55 seam | `surfaces.css:282` `:where(.btn-glass, .segmented-indicator)` | element-scoped — must WIDEN to `.glass-capsule` (the tabs amendment does this) |
| `--glass-capsule` / `-hover` | grep `src/` → **NONE** | **born-RED upstream** — the tabs amendment (`BD.W-TAB-IOS-CAPSULE`) mints them; buttons CONSUME |
| `--motion-weight` / `--ease-cartoon-punch` | grep `src/styles/` → **0 hits** | **booked phantoms** — `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` mint them (DEPEND, never mint here) |
| the moving cast caster | `BD.W-CARTOON-CASTER` mints `.cartoon-cast` inert child + `--cartoon-press-t`/`--cast-travel`/`--cast-spread` | **booked** — buttons CONSUME the inert-child caster, NOT a `::after` re-fork (challenge §2-R5) |

**Visual gestalt (`delta-current-buttons-light.png`, this pass):** over the page field the glass
buttons read as **flat translucent gray pills** — the blur is real, the fill is colorless, so they
look like frosted-acrylic chips, not warm liquid glass; the default hover is a flat color cross-fade
with `scale:1` (no lift); the dock icon buttons are INVISIBLE at rest. The root cause is the SAME
warm-admit gap (`--glass-tint-strength: 0%`) the tabs amendment already fixes — so the buttons are
fixed for free by refusing to own a material.

**Net:** the FOUNDATION is FIT. One load-bearing defect (the near-gray capsule fill — RESOLVED by
the tabs amendment's warm-floor RE-INVENT), three structural button-side gaps (the `.glass-btn` icon
fold, the `DockIconButton` selected fold + hover-lift, the `.btn-punch` opt-in tier), three booked
phantoms (DEPEND, never re-mint). REFINE the CVA toward composition, CONSUME the capsule + caster,
ADD the one opt-in punch class. No re-fork.

---

## 1. The DELTA — KEEP / REFINE / RE-INVENT / ADD

### KEEP (fit — byte-untouched)
- **The CVA architecture** — `buttonVariants` (`button/index.ts`) + the variant KEYS
  (`default`/`glass`/`outline`/`secondary`/`accent`/`primary-audacious`/`gold-audacious`/`ai`/
  `ghost`/`link`/`destructive`). The keys are a public contract — no rename, no prop break. Only the
  class STRINGS collapse.
- **The squish primitive** — `useSpringPress` → `useLiquidFlex` reciprocal X/Y squish
  (`Button.vue:90-141`), the `--scale-press-btn` 0.97 floor, the iOS `press` preset (0.15/0.86, the
  `springPresets.ts` source — `BC.W-SPRING-EASE`/`BD.W-BUTTON-GLASS-IOS-NOTE`). Interruptible,
  released at settle, inline-`scale`-wins single source. **No second spring/rAF.**
- **The `v-specular` auto-arm** — the pointer-anchored moving gleam (`Button.vue` / `DockIconButton`
  apply `v-specular`, `createSpecularWriter`). PRM-aware by construction. KEEP byte.
- **The `--glass-blur-btn` blur ladder** — `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` +
  `.btn-glass.glass-deep` → `--glass-blur-deep` (`surfaces.css:187,224`). Live `blur(13-16px)`. The
  real glass blur ships; only the COLOR is the defect. KEEP (resolve the double-backdrop in §2a).
- **The `.btn-pill` / `.tap-squish` motion split** — surface→bezier `--ease-standard`, transform
  `scale`→`--spring-smooth` (the §6 doctrine, `surfaces.css:154`/`btn.css`). KEEP.
- **The four-state contract** — CVA base + `.focus-ring` warm halo + `disabled:` geometry +
  `aria-pressed`. KEEP untouched (material-only changes).
- **The size cohort** — `--control-h-*` rungs + `--ui-glyph` + `--control-text` comfort axis. KEEP
  (see RE-INTERROGATE in §1 ADD for the φ proportion arm, challenge §3-R6).
- **The dock TRANSPARENT REST** — `.dock-icon-button` rest is a bare icon in the gutter, not a pill
  (the hairline-rail idiom, BE WF-3). Live-confirmed `rgba(0,0,0,0)`. KEEP — no rest-paint regression.
- **Compositor-only / Safari floor** — `scale` + `--glass-specular` `@property` + static
  `box-shadow` + `backdrop-filter: blur()`. NO `backdrop-filter: url()` on any button, NO SVG goo,
  NO meatball (buttons are lozenge glass, the metaball law is N/A). KEEP as the §L7 floor.

### REFINE (weak → evolve, same primitives)
- **The default hover LIFTS** — the user's literal "better hover" ask. Today `scale:1`, a flat bg
  cross-fade (live-confirmed). REFINE: every glass variant composes `.glass-capsule-hover` (the tabs
  register) → `--glass-specular: 0.14` bloom + `scale: 1.015` lift. Today ONLY `primary-audacious`/
  `gold-audacious` lift (the `--scale-hover-btn` 1.05); the lift goes UNIVERSAL and `primary-audacious`
  loses its special 1.05 (it reads as hero via deep blur + accent + punch, not a one-off scale).
  **(challenge §3-R5 fold)** the default hover is NOT a dead 1.5% bezier nudge — the SCALE leg rides
  the spring clock (the `--spring-smooth` register the `.btn-pill` base already carries) and co-scales
  by `--motion-weight`, so it reads as mass rising, not a CSS tick. The §6 "color-on-bezier,
  transform-on-spring" doctrine is HONORED (the specular cross-fade stays bezier; only the `scale`
  transform springs).
- **The `.glass-btn` icon primitive** — its `--glass-bg-wash` fill + the `:hover` `--background 85%`
  gray + the `.is-active` `--surface-tint-10`/`-25` GRAY active (`surfaces.css:73,95,118`) RE-POINT
  onto `.glass-capsule` / `.glass-capsule-hover` / the capsule selected fill. The fixed-square geometry
  + `contain: paint` + the icon-flex STAY. The `--surface-tint-*` gray fills DIE (clean break, no-gray
  fence).
- **`DockIconButton` selected + hover** — KEEP the transparent rest. The `[data-active]`/
  `[aria-pressed]` SELECTED `::before` fill re-points off `--dock-control-active-bg`
  (`material.css:295`) onto the capsule selected fill token (the tabs amendment EXPOSES it). The
  classes computed gains `.glass-capsule-hover` so the dock icon LIFTS on hover (the user's literal
  "redolent of the tabs"). reka behaviour INVIOLATE — only the class strings + the `::before`
  selected-fill TOKEN move.

### RE-INVENT (broken → the load-bearing fix, INHERITED not authored here)
- **The capsule warm-floor** — THE single load-bearing defect (chroma 0.0138, near-gray over the
  field). This is RESOLVED **upstream** by the tabs amendment's RE-INVENT (add the warm-admit floor
  to `.glass-capsule` ITSELF, so its meanChroma clears 0.02 both modes at `--glass-tint-strength: 0%`).
  Buttons do NOT author a warm-floor — they CONSUME a capsule that is already warm. **(challenges
  R2/R3 fold, binding):** the buttons GOLDEN's §9 spike invented `--glass-capsule-floor` (a THIRD
  recipe neither doc ships) — that is EXCISED. The ONE warm-floor mechanism lives in the tabs
  amendment's `.glass-capsule` CSS; the buttons consume it and the buttons gate ASSERTS the consumed
  fill is warm (it does not re-derive a floor). If the tabs capsule does NOT clear 0.02 at rest, the
  buttons build BLOCKS on the tabs warm-floor — a real upstream dependency, not an assumption.

### ADD (the genuinely-new behaviour — `.btn-punch` + the φ arm)
- **`.btn-punch`** (the ONE new class) — the opt-in LOUD hero interaction tier (lens-c), parallel to
  the existing `surface=`/`liquid=` axes, composed via a `punchDecoration` computed in `Button.vue`
  (the `surfaceDecoration`/`liquidDecoration` idiom). It sits ON TOP of `.glass-capsule` (it is NOT a
  material): anticipation (the `--ease-cartoon-punch` pre-dip) + squash (`maxStretch` 1.04→~1.09,
  fenced ≤1.14 composed area) + overshoot follow-through + glyph overlapping-pop + the moving inked
  cast. Default-on for `primary-audacious`/`gold-audacious`; opt-in `punch` prop elsewhere; the dock
  default stays CALM (a dock of punching icons is manic). **(challenge §2-R5 fold, binding):** the
  moving cast is NOT a button-local `::after` re-fork — it CONSUMES `BD.W-CARTOON-CASTER`'s inert-child
  `.cartoon-cast` + its `@property`-registered `--cartoon-press-t`/`--cast-travel`/`--cast-spread`
  (without registration the press caster reads `translate: 0px` and is DEAD — the H1 trap). ONE
  caster mechanism across cards + buttons.
- **The φ proportion arm** (challenge §3-R6) — the button geometry is INTERROGATED, not silently
  inherited: the comfort sizes (`--control-h-*`, the px padding, `--ui-glyph`, `--control-text`) are
  asserted to read off the √φ ladder (padding-x ≈ height/φ, glyph ≈ label×(1/√φ)), not the shadcn
  `h-9 px-4` arbitraries. This is a GATE arm + a doc note, not a geometry rewrite (the ladder may
  already be φ-stepped — the arm proves it or flags the drift). Cite the `--control-h-*` tokens.

---

## 2. The UNION path — precise integration (KISS, DRY, no re-fork)

### 2a. The CVA substitution (the gray dies — clean break, no alias)

`button/index.ts`. Every glass variant DROPS its inline near-gray recipe + the raw-rung
`hover:bg-*`/`active:bg-*`/`aria-pressed:bg-*` chains + the per-variant `hover:scale-*` and composes
the capsule pair. The variant KEYS stay. The `--glass-blur-btn` prominence ladder is PRESERVED via
`.btn-glass`:

| Variant | New class string (sketch) | Prominence |
|---|---|---|
| `default` / `glass` / `primary-audacious` (hero) | `glass-capsule glass-capsule-hover btn-glass glass-deep` | DEEP blur |
| `outline` / `secondary` / `accent` (de-shadcn triplet) | `glass-capsule glass-capsule-hover btn-glass` + `--glass-capsule-fill: var(--glass-bg-quiet-tinted)` per-variant | quiet rung — prominence by TINT, not slab |
| `gold-audacious` | `… btn-glass btn-punch` + `--glass-accent: var(--color-gold)` | gold reads in the GLEAM (§2c) + punches |
| `ai` | `… btn-glass` + `--glass-accent: <amber>` | amber accent in the gleam |
| `ghost` | text-first at rest; `hover:` composes `.glass-capsule-hover` ONLY | ink at rest, glass on hover |
| `link` | text-only | untouched |
| `destructive` | colored-glass (the `BD.W-GLASS-IOS27-CONTROLS` register) | NOT the capsule — its owner wave |

**The double-`backdrop-filter` resolve (challenge §1-R4, binding):** the real build stacks
`.glass-capsule` AND `.btn-glass` on one element; `backdrop-filter` does not stack (last-cascaded
wins). The amendment STATES the owner: **`.btn-glass` owns the button backdrop** (it already re-points
`--glass-blur-btn`/`--glass-blur-deep`, the shipped blur ladder — live `blur(13-16px)`); the tabs
amendment's `.glass-capsule` declares NO `backdrop-filter` of its own (it owns FILL + rim + lift +
the W55 seam membership; the blur is the consumer's `.btn-glass`/`.segmented-tabs` rung). One owner,
no cascade conflict, the gate asserts the resolved blur is the button's `--glass-blur-btn`, not a
clobbered capsule value.

**DELETED (clean break, no-legacy):** the raw `hover:bg-(--glass-bg-resting-tinted)` /
`active:bg-*` / `aria-pressed:bg-*` chains across the glass variants; the `gold-audacious` static
`background-image` gold gradient (`index.ts:77`); the per-variant `hover:scale-(--scale-hover-btn)`.
The capsule + the seam REPLACE them.

### 2b. `.glass-btn` + `DockIconButton` fold

- **`.glass-btn`** (`surfaces.css:62-121`) — re-point `:hover` off `--background 85%` and `.is-active`
  off `--surface-tint-10`/`-25` onto `.glass-capsule-hover` / the capsule selected fill. KEEP the
  square geometry + `contain: paint` + the icon-flex + the `:focus-visible`/`:disabled` arms.
- **`DockIconButton`** — `classes` computed gains `glass-capsule-hover`; the `material.css:295`
  `[data-active]::before` fill re-points off `--dock-control-active-bg` onto the capsule selected-fill
  TOKEN (challenge §1-R5 resolve: it reads the TOKEN the tabs amendment EXPOSES — one source, both
  consume — NOT a class composed onto `::before` that would fight the pseudo geometry, and NOT a copy
  that drifts). The transparent rest + `v-specular` gleam UNTOUCHED.

### 2c. The accent — `--glass-accent` per-variant (the gold reads in the gleam)

`gold-audacious` sets `--glass-accent: var(--color-gold)`; the catch-light core OKLab-mixes toward
the accent (BB.W-GLASS-ACCENT, `property-regs.css:178`). The gold reads in the SPECULAR core + the
rim glint — NOT a flat plate. `ai` → amber. Default `--glass-accent: transparent` → byte-identical
warm-cream at rest. **(challenge §1-R6 / §3-R7 fold):** the `plus-lighter` gleam over the
`backdrop-filter` plate is a known WebKit risk — the gate's gold-gleam arm runs **paired-engine**
(chromium + webkit), sampling the painted grazing-edge pixel; if `plus-lighter` no-ops on WebKit a
`@supports`-gated `screen`-blend fallback ships. NOT a "by construction" assertion.

### 2d. The press + the punch — IMPERATIVE squish + the consumed caster

- The calm workhorse press is the shipped `useSpringPress`/`useLiquidFlex` (KEEP byte), the depth
  co-scaled by `--motion-weight` (one multiply on the existing amplitude — DEPEND, no second spring).
- `.btn-punch` re-targets `maxStretch` 1.04→~1.09 on `.btn-punch` ONLY, fenced to the **composed-area**
  bound ≤1.14 (NOT the bare scalar — the tabs anti-taffy lesson). The `scale` leg rides
  `--ease-cartoon-punch` (anticipation pre-dip + overshoot). The glyph settles a beat after the
  capsule (overlapping action) — reference the tabs glyph-pop register, do NOT re-paste the `0.06`
  formula (challenge §2-R5).
- The cast CONSUMES `BD.W-CARTOON-CASTER` (inert `.cartoon-cast` child + the registered props). On
  hover the cel-shadow deepens; on press the offset travels opposite the press, scaled by
  `--motion-weight`. A `transform` on the inert child, never an animated `box-shadow`.

### The UNION ledger (every lever — reused vs new)

| Need | Reused primitive (verified HEAD/upstream) | New surface in THIS greenfield |
|---|---|---|
| Warm glass fill | `.glass-capsule` (tabs amendment, warm-floor RE-INVENT) | — (COMPOSE) |
| Glass hover lift | `.glass-capsule-hover` → `.glass-drag-lift` (tabs amendment) | — (COMPOSE) |
| Quiet-tier prominence | `--glass-bg-quiet-tinted` (`surfaces.css`) | `--glass-capsule-fill` per-variant knob |
| Blur ladder + backdrop owner | `.btn-glass` / `.btn-glass.glass-deep` → `--glass-blur-deep` (`surfaces.css:224`) | — (KEEP; `.btn-glass` owns the backdrop) |
| Adaptive seam | `:where(.btn-glass, .segmented-indicator, .glass-capsule)` (tabs amendment WIDEN) | — (CONSUME) |
| Moving gleam position | `v-specular` (Button/DockIconButton, AUTO-ARM) | — (KEEP) |
| Squishy press | `useSpringPress` + `useLiquidFlex` (`Button.vue:90-141`) | — (KEEP byte) |
| iOS press window | `press` SPRING_PRESETS (0.15/0.86, `BC.W-SPRING-EASE`) | — (DEPEND) |
| Liquid-weight squish | `--motion-weight` (`BD.W-MOTION-WEIGHT`) | — (DEPEND, one multiply) |
| Cartoon punch curve | `--ease-cartoon-punch` (`BD.W-CARTOON-PUNCH`) | — (DEPEND, `.btn-punch` only) |
| Moving cartoon cast | `.cartoon-cast` inert child + `--cartoon-press-t`/`--cast-travel`/`--cast-spread` (`BD.W-CARTOON-CASTER`) | — (CONSUME, no `::after` re-fork) |
| Glyph overlapping-pop | the tabs glyph scale-pop register (`BD.W-TABS-LIQUID`) | — (CONSUME, reference not re-paste) |
| Per-instance accent | `--glass-accent`/`-strength` (`property-regs.css:178`) | gold/ai variant set + paired-engine gleam arm |
| Dock selected fill | `.glass-capsule` selected-fill TOKEN (tabs amendment EXPOSES) | — (DockIconButton joins the fold) |
| Four-state contract | CVA base + `.focus-ring` + `--control-*` axis | — (KEEP) |
| φ proportion | `--control-h-*` / `--ui-glyph` / `--control-text` ladder | — (INTERROGATE: gate arm asserts √φ-stepped) |

**ZERO new material, ZERO new component, ZERO second spring/rAF, ZERO re-forked caster.** The ONE
new class is `.btn-punch` (an opt-in interaction DECORATION on top of the capsule). The button CVA
SHRINKS: its glass variants drop the inline composite + the per-variant `hover:bg-*`/`scale-*`
strings and become `glass-capsule glass-capsule-hover btn-glass` + a `--glass-accent` set + the
size/ink. Buttons + tabs + dock-buttons consume the ONE register.

---

## 3. Cross-wave reconciliation (no duplicative work against the 116-set)

- **`.glass-capsule` / `.glass-capsule-hover`** — minted by `BD.W-TAB-IOS-CAPSULE` (the tabs
  amendment renames `.glass-tab-capsule` → `.glass-capsule` for the ≥3-consumer buttons substitution;
  ADDS the warm-floor RE-INVENT + the `.glass-capsule-hover` register composing `.glass-drag-lift`).
  Buttons CONSUME — do NOT author a parallel capsule wave. The §6 buttons-row "RESOLVED-by-tabs"
  verdict is correct AT THE MATERIAL LEVEL; this assay adds the BUTTON-SIDE work (the CVA
  substitution, the `.glass-btn` + `DockIconButton` fold, the `.btn-punch` tier) that the tabs
  amendment does NOT carry.
- **`--motion-weight` / `--ease-cartoon-punch`** — ALREADY BOOKED (`BD.W-MOTION-WEIGHT` /
  `BD.W-CARTOON-PUNCH`, the motion-spring-register + cartoon-shadow deltas). The GOLDEN §10 "DEPEND"
  is correct; minting verbatim would FORK (no-legacy). DEPEND.
- **`BD.W-CARTOON-CASTER`** — mints the inert-child `.cartoon-cast` + the registered props. The
  buttons `.btn-punch` cast CONSUMES it (the second consumer after `<Card surface="cartoon">`) — the
  GOLDEN's `::after` re-fork is EXCISED (challenge §2-R5). The caster wave gains buttons as a named
  consumer.
- **`BD.W-TABS-LIQUID`** — ships the glyph scale-pop register. The buttons glyph-pop REFERENCES it
  (CROSS-LINK, no re-paste of the `0.06` literal).
- **`BD.W-BUTTON-GLASS-IOS-NOTE`** — the CLAUDE.md note tracking the SHIPPED Button (the press
  0.15/0.86, the floating blur, the de-shadcn reskin). The buttons amendment's CVA substitution
  SUPERSEDES the inline glass-variant strings that note describes → the note must RE-SYNC after the
  build (named as a doc-fence in the amendment). No collision — the note tracks code, the build moves
  the code.
- **`BD.W-GLASS-IOS27-CONTROLS`** — DISJOINT (destructive→colored-glass + control-tracks). The
  `destructive` variant stays its register; no edit.
- **`BD.W-GLASS-EVERY-ELEMENT` / `BD.W-DESHADCN-SWEEP` / `BD.W-DESHADCN-GATE`** — the de-shadcn census
  + the glass-everywhere sweep already touch the button variants at the STRING level. The buttons
  amendment's substitution is the SAME direction (more glass, off shadcn-neutral) — it COMPOSES the
  capsule rather than hand-rolling per-variant `bg-*` chains, which is the de-shadcn endpoint. The
  amendment AUGMENTS `BD.W-GLASS-EVERY-ELEMENT` rather than authoring a 117th button-glass wave (see
  WAVE-AMENDMENT.md — there is NO standalone button wave on disk; the work folds into the capsule
  consumption + a NEW `.btn-punch` decoration wave).

---

## 4. Convergence

**Item convergence: ~72%.** The CVA architecture, the squish primitive, the `v-specular` auto-arm,
the blur ladder, the motion split, the four-state contract, the dock transparent rest, the compositor
floor all SHIP (REFINE-dominant). The warm-floor RE-INVENT + the two motion tokens + the caster are
booked upstream (DEPEND/CONSUME). The genuine remaining work: the CVA substitution onto the capsule
pair (the gray dies + the universal hover-lift), the `.glass-btn` icon fold (off the gray
`--surface-tint-*`), the `DockIconButton` selected-fold + hover-lift, the `.btn-punch` opt-in tier
(consuming the caster + the punch curve), the double-backdrop owner resolve, the φ proportion arm,
and the RE-GROUNDED gate (painted-pixel DELTA, paired-engine, the gold-gleam WebKit arm — replacing
the GOLDEN's fabricated §9 spike).

The spine is FIT and integrates deftly into the extant ecosystem — a UNION, not a bolt-on. The
single crack the build must close is the gray fill (RESOLVED upstream by the tabs warm-floor) and the
gate honesty (the painted-DELTA re-spike) — both named as born-RED gate arms in WAVE-AMENDMENT.md.
