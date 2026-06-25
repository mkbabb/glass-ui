# BUTTONS — GREENFIELD (lens B: cross-engine / perf-first)

> The button system redesigned from first principles through the Chrome+Safari /
> performance lens. The user ask, verbatim: *"Our buttons should all be more GLASSY by
> default, like our tabs facility, and have better HOVER states"* + *"The dock BUTTONS
> should be redolent of our glassy TABS — change those AND our DEFAULT BUTTONS to be more
> like the tabs (with our tabs modifications)."*
>
> The binding context: the just-converged **tabs greenfield** designated tabs the gold
> standard, then live-measured that the gold standard was itself NEAR-GRAY and is
> RE-INVENTING its capsule warm-floor + glass-hover. The buttons must emulate the **FIXED**
> tabs register, not the shipped near-gray one. This lens designs the buttons as a pure
> CONSUMER of the `.glass-capsule` + `.glass-capsule-hover` register the tabs amendment
> extracts (docs/tranches/BD/greenfield/tabs/WAVE-AMENDMENT.md §A.1/§A.4/§E) — ONE recipe,
> three consumers (segmented pill · Button glass · dock control), zero forks.

---

## 0. LIVE-MEASURED status quo (Chrome :5173, this session — the bar to BEAT)

All readings are painted-pixel `getComputedStyle` over the live demo field, both surfaces
sampled. Chroma is `√(a² + b²)` of the resolved `oklab()` fill.

| Probe (`/display/buttons`, light) | Live measurement | Reading |
|---|---|---|
| `default` button resting fill | `oklab(0.8815 0.00541 0.01268 / 0.328)` → **chroma 0.0138** | **< 0.02 → NEAR-GRAY** — the SAME disease as the tabs capsule (0.0128). The user's "not glassy" is THIS. |
| `default` backdrop-filter | `blur(16px) saturate(1.8)` (deep) | glass blur IS present + real — the blur is fit; the FILL is the defect |
| `default` box-shadow | `rgba(255,255,255,.18) 0 0 0 .75px inset, oklch(0 0 0/.04) 0 2px 8px -1px` | rim + under-shadow lozenge — the depth stack is FIT (W-BUTTON-GLASS d) |
| `default` `::before` | `mix-blend-mode: plus-lighter`, transparent at rest | the specular gleam recipe ships + auto-arms (`v-specular`) — FIT |
| `glass`/`secondary`/`outline`/`accent` fills | ALL `oklab(0.8815 0.00541 0.01268)` → chroma 0.0138 | every glass variant is the same near-gray fill — uniform defect |
| Hover register | `transition: background-color/border-color/box-shadow/color 0.2s bezier`; `scale: 1` | **surface-only hover** — bg darken + 1-rung deeper drop. NO scale lift on bare `default`. The user's "better hover" gap is real on the DEFAULT path. |
| `--scale-hover-btn` / `--scale-press-btn` | `1.05` / `0.97` | the lift tokens EXIST but only `primary`/`gold-audacious` consume `hover:scale-*` (default does not) |
| `--glass-tint-strength` at `:root` | **`0%`** | the warm-admit seam is DORMANT at rest — the W55 darken only engages it under a sampled-bright bucket, so the at-rest fill stays gray |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | **WARM both modes** (the warm-floor source IS available — it is simply not admitted at rest) |
| Dock `.dock-icon-button` REST (`/dock/overview`) | `background: rgba(0,0,0,0)`, `backdrop: none`, `box-shadow: none` | **fully transparent at rest** — a bare square, NO lifted glass lozenge until hover/active |
| Dock `.dock-icon-button` ACTIVE | `color(srgb 0.994 0.96 0.926 / 0.8)` → R>G>B | **WARM-cream** (not gray) — the dock ACTIVE plate is healthier than the Button capsule, but it is a `.dock-icon-button::before` FORK, not `.glass-capsule` |
| `.glass-capsule` on disk | grep: **NONE** | born-RED — minted by `BD.W-TAB-IOS-CAPSULE` (the register the buttons consume does not exist yet) |
| `.glass-drag-lift` | `segmented-tabs.css:399`, `--glass-specular: 0.1` | the shared specular-lift idiom already ships (the hover primitive composes it) |
| `--motion-weight` / `--ease-cartoon-punch` | grep src: **absent** | booked (`BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH`) — DEPEND, do not mint |

**Visual (`brainstorm/buttons-light.png`):** over the live blue field, the `default`
"Launch sequence" / "Next →" buttons read as **pale flat near-white lozenges** — translucent
but desaturated and flat, NOT warm transmissive glass. The blur reads; the fill is gray. The
dock controls below are bare-transparent until poked. This IS the gestalt the user is
rejecting — the buttons are "glass-shaped" but not "glass-warm".

**Net triage (survival of the fittest):**
- **KEEP (fit):** the blur ladder (`--glass-blur-btn` 13px / `.glass-deep` 16px), the
  rim+under-shadow depth stack (W-BUTTON-GLASS d), the `v-specular` auto-arm gleam, the
  `useSpringPress`+`useLiquidFlex` coupled press (W-BUTTON-GLASS b), the four-state CVA
  contract, the `--control-*` comfort axis, the de-shadcn glass reskin of
  outline/secondary/accent, the `:liquid` refraction opt-in.
- **RE-INVENT (broken — load-bearing):** the **fill is near-gray** (chroma 0.0138). This is
  the user's whole complaint. The fix is NOT a button-local recipe — it is to **consume the
  `.glass-capsule` warm-floor** the tabs amendment is already minting.
- **REFINE (weak):** the **hover** on the DEFAULT path is surface-only with no lift; it must
  gain the glass-hover (specular bloom + scale) the tabs `.glass-capsule-hover` carries. The
  **dock** rest is a bare transparent square — give it the at-rest capsule lozenge (quiet
  rung) so it reads as glass before you poke it.
- **DRY (the headline):** three glass registers exist in parallel today — Button `.btn-glass`
  inline composite, segmented `.segmented-indicator` inline composite, dock
  `.dock-icon-button::before` composite. **Collapse all three onto ONE `.glass-capsule`.**

---

## 1. THE CORE IDEA — buttons are a SKIN over the ONE warm glass-capsule

The button system stops owning a material. It becomes a **CVA skin** (shape · size · prominence ·
ink · a11y states) layered over the SINGLE shared `.glass-capsule` material the tabs greenfield
extracts. The capsule owns: the warm-floor transmissive fill (the RE-INVENT that clears
chroma ≥ 0.02 both modes), the rim+under-shadow lift, the blur, and the `::before` specular.
`.glass-capsule-hover` owns the glass-hover (specular bloom + `scale:1.015` lift / `scale:0.97`
press). The button CVA then sets only: `--glass-accent` (the per-variant commit tint), the
prominence rung (quiet vs deep blur), the size/radius geometry, and the ink. **"Make buttons
glassy like the tabs" becomes a one-line substitution** — exactly what the tabs WAVE-AMENDMENT
§E names as the RESOLVE: the buttons row's build is *the consume of the capsule register*.

### Why this is the fit move (not a button-local warm-floor patch)

The naive fix is to bolt a warm-admit `color-mix` onto `.btn-glass` directly. That would (a)
ship a THIRD warm-floor recipe diverging from the tabs/dock ones the moment any retint lands,
and (b) re-open the exact "extraction-of-a-gray-plate is still gray" trap the tabs challenge
named. The capsule is the ONE place the warm-floor is authored; buttons + tabs + dock all read
the same resolved fill, so a retint touches one rule and all three move in lockstep. This is
the DRY/no-fork law made concrete.

---

## 2. THE MATERIAL — `.glass-capsule` (consumed, not authored here)

The button greenfield does **not** author the capsule — `BD.W-TAB-IOS-CAPSULE` (as amended,
§A) mints it in `src/styles/glass/glass-capsule.css`. The buttons CONSUME these three classes:

| Class | Owns | Button consumes it as |
|---|---|---|
| `.glass-capsule` | warm-floor fill + rim + under-shadow + blur + `::before` specular, on `--radius-pill` | the `default`/glass-register variant base (replaces the inline `.btn-glass` composite) |
| `.glass-capsule-hover` | `--glass-specular: 0.14` bloom + `scale: 1.015` hover / `scale: 0.97` press, fast bezier+spring clock | every interactive glass button (replaces the per-variant `hover:scale-*` + the surface-only hover) |
| `.glass-capsule-track` | the recessed channel (rim + `inset 0 1px 2px var(--tab-track-recess-ink)`) | NOT a button base — used only by a future button-GROUP/segmented host (cross-link, no build here) |

### 2a. The warm-floor (the RE-INVENT, inherited)

The capsule fill admits a small warm floor toward `--glass-tint-source`
(`light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`, warm both modes) **independent of**
`--glass-tint-strength` (which stays 0% at rest, the adaptive-darken axis). So the resting
capsule reads chroma ≥ 0.02 over the field BOTH modes, where today's `.btn-glass` reads 0.0138.
The button inherits this for free — the moment `default` composes `.glass-capsule`, the
"Launch sequence" lozenge goes from pale-gray to warm-cream glass with zero button-local CSS.

### 2b. The blur prominence ladder (KEEP — re-pointed onto the capsule)

The capsule's blur reads a `--glass-capsule-blur` knob that defaults to the quiet `--glass-blur-btn`
(13px). The prominence axis is **token substitution, not a new compositing axis** (the same model
W-BUTTON-GLASS-IOS used for `.glass-deep`):
- `default` / `primary-audacious` (hero CTA) → `.glass-deep` re-points `--glass-capsule-blur`
  onto `--glass-blur-deep` (16px / saturate 1.8) — the apple.com-nav-grade thick refractive glass.
- `outline` / `secondary` / `accent` (quieter de-shadcn tier) → bare 13px capsule — prominence
  by TINT not by slab (the Apple "prominence = tint, not size" rule). The hierarchy holds because
  the hero CTAs carry deep blur + a warmer `--glass-accent`, the subordinate tiers stay calm.

This preserves today's blur ladder (live-verified: default 16px, secondary/outline 13px) byte-for-
intent, just sourced through the capsule's one knob.

---

## 3. THE HOVER — the user's "better hover states" (`.glass-capsule-hover`)

The DEFAULT path today is surface-only (bg darken + deeper drop, `scale:1`). The greenfield
hover is the tabs glass-hover, composed — **not a new button recipe**:

- **Specular bloom** — `--glass-specular: 0.14` (the `--glass-specular-btn-hover` the button
  already scopes, now sourced via the shared hover class), so the grazing-edge catch-light
  lifts a notch on hover. The `::before` gleam already tracks the pointer (`v-specular`); the
  hover just raises its intensity rung. ONE specular declaration shared with `.glass-drag-lift`
  (the §C7 "composes, not forks" gate arm).
- **Scale lift** — `scale: 1.015` on hover (a *hair* of glass rising toward the cursor), on the
  `--spring-smooth` settle clock so it reads alive not mechanical (the §6 doctrine: transforms
  ride springs, surface cross-fades ride the bezier). This is the lift the user wants made
  UNIVERSAL — every glass button gets it, not just `primary-audacious` (which loses its special
  `hover:scale-(--scale-hover-btn)` 1.05 and instead reads as the hero via deep blur + accent).
- **Warm-tint bloom on hover** — the capsule's warm-floor admits a *hair* more on hover (a
  +2-3% warm bump toward `--glass-tint-source`), so the hovered button doesn't just brighten, it
  **warms** — the "transmissive glass catching light" read, not a flat opacity flash.

The press (§4) and hover share the ONE specular intensity cohort
(`--glass-specular-intensity-{hover,active}`) — the LERP the press already runs (surfaces.css:250)
is preserved; the hover sets the floor it LERPs from.

---

## 4. THE PRESS — liquid-weight tap-squish (KEEP, sharpen onto the cartoon clock)

The coupled press is already FIT (W-BUTTON-GLASS b): `useSpringPress` → `useLiquidFlex`
reciprocal X/Y squish + the `--glass-btn-press-t` specular illumination LERP, on the
`--spring-snappy` interruptible clock. The greenfield keeps the entire mechanism. Two refinements:

1. **Liquid-weight on the squish curve.** The squish amplitude reads `--motion-weight` (booked,
   `BD.W-MOTION-WEIGHT`, 1/φ, PRM→0) so the squish carries the universal inertia/bounce floor —
   the press over-squishes a hair past the target then settles (anticipation + follow-through),
   rather than a tight linear contraction. The release rides the `--ease-cartoon-punch` linear()
   (booked, `BD.W-CARTOON-PUNCH`) — the tap rebounds with the technicolor punch, never a tight
   spring-back. DEPEND both tokens; the button is a consumer.
2. **The squish cap stays LOW.** `maxStretch: 1.04` is the right anti-taffy floor for a press
   (no travel span — a button doesn't glide). The composed-area fence the tabs amendment derived
   (§B.2, blob × stretch ≤ 1.14) does NOT apply — the button has only the press squish, no area
   blob. Keep the 1.04 cap.

PRM carve: `useSpringPress` already snaps to the endpoint under reduce (the scale arrives, the
in-between frames drop). `--motion-weight`→0 zeroes the over-squish. The press still FUNCTIONS
(the button visibly depresses) with the physics off.

---

## 5. THE DOCK BUTTONS — `.dock-icon-button` consumes the SAME capsule

Today the dock icon button is a bare transparent square at rest (no lozenge, no glass) that only
paints on `::before` hover/active — a parallel `.dock-icon-button::before` material fork. The
greenfield re-points it onto `.glass-capsule`:

- **Rest** — the dock control gains the **quiet** capsule at rest (the warm-floor fill at the
  lowest blur rung + a sub-perceptual rim), so a dock button reads as a soft glass tile BEFORE
  you hover it (the iOS-27 dock "every slot is a glass well" read), instead of an invisible
  square. The rest opacity is low enough that the dock plate still shows through (the
  transmissive island read), but the warm floor + rim make it a *glass* tile, not a void.
- **Hover/active** — composes `.glass-capsule-hover` — the SAME specular bloom + scale lift + warm
  bump the Button and the tab pill use. The dock control's existing healthy warm-cream active
  plate (`srgb 0.994 0.96 0.926`, live-measured) is preserved — it IS already warm — but it is
  RE-SOURCED through the capsule so a retint moves all three together (kill the `::before` fork).
- **Selected** — the `[aria-pressed]`/`[data-active]` register reads the capsule's `--glass-accent`
  (the consumer accent, presets-in-consumers) — the SAME flood/accent recipe the tabs amendment
  ships and the `BD.W-DOCK-TAB-INDICATOR` cross-links. No saturated brand slab; a warm lit glass
  tile (W-REGISTER-IOS).

The dock button's geometry (the fixed 2.5rem square, the compact auto-size) is UNTOUCHED — only
the material is re-sourced. `vSpecular` stays (the gleam position write); the capsule supplies
the `::before` recipe the directive drives. reka-ui behaviour is INVIOLATE (only class strings move).

---

## 6. THE CROSS-ENGINE / PERF LENS (Chrome + Safari, the binding law)

The capsule is deliberately the SIMPLEST mechanism that hits the bar — and it is cross-engine by
construction, because it carries **no GPU viz, no SVG goo, no per-frame raster**:

- **Material = compositor-only.** The capsule is `background` (a static `color-mix`) +
  `backdrop-filter: blur()/saturate()` + static `box-shadow` rim/drop + a `::before` with
  `mix-blend-mode: plus-lighter`. All four composite identically on Blink and WebKit. No
  `backdrop-filter: url(#…)` in the base material (the §L7 floor) — the `:liquid` SVG-lens
  refraction stays the OPT-IN, `@supports (backdrop-filter: url(#…))`-gated decoration that
  degrades cleanly to the un-gated blur on WebKit (already the shipped shape, KEEP).
- **The warm-floor `color-mix(in oklab, …)` is sRGB-safe.** It resolves to a static `oklab()`
  fill at paint — no per-frame interpolation, no engine divergence (a static color, both engines
  render the same paint). The `--glass-tint-source` `light-dark()` resolves per-mode at the
  cascade (NOT inside a `box-shadow` inset fragment — the light-dark inset-shadow trap; the warm
  floor is on `background`, safe).
- **Hover/press motion = `scale` + `--specular-intensity` only.** `scale` is a compositor
  transform (GPU, both engines). `--specular-intensity` is an `@property`-registered scalar the
  `::before` opacity reads — interpolable, cheap, both engines. No layout, no paint thrash. The
  `--glass-btn-press-t` LERP is one var read per frame during the press, released at settle (the
  M5 determinism — no free-running rAF).
- **No meatball here.** Buttons are NOT a viz — there is no blob<->meatball merge in the button
  system, so the "real metaball, no naive ellipsoid" law is N/A (it binds the dock-fission /
  goo-morph vizzes). The button's only motion is the press squish (a `scale` reciprocal) + the
  hover lift (a `scale`) + the specular LERP. KISS: the simplest mechanism, perfect on both engines.
- **Offscreen-pause / idle:** the capsule has no animation at rest (static paint) — there is
  nothing to pause. The `v-specular` pointer write only fires on `pointermove` over the element
  (no idle listener cost); the directive's PRM-aware core skips the write under reduce.

### a11y / PRM carve
- **PRM:** `--motion-weight`→0 (squish over-shoot off, capsule lift off — `scale` snaps to
  endpoint), `useSpringPress` snaps (press functions, physics off), `v-specular` skips the write
  (catch-light pins static-centre). The four-state contract (focus-ring halo, disabled dim) is
  motion-free and untouched.
- **Contrast:** the warm-floor RAISES chroma but the ink is the warm `--foreground` with the W55
  `contrast-color()` flip + content-tier floor reaching the lit fill (the substitution-vs-
  inheritance trap already closed on the button register, W-BUTTON-GLASS a) — so warmer ≠ less
  legible. The `--glass-level:0` opaque-escape (a11y-fallback) reaches the capsule for free.
- **Focus:** the `.focus-ring` warm halo stays the base — unchanged.

---

## 7. THE UNION LEDGER (reused vs new — DRY, no re-fork)

| Need | Reused primitive (live-verified) | New surface |
|---|---|---|
| Warm transmissive fill | `.glass-capsule` warm-floor (TAB-IOS-CAPSULE §A.2 mints it) | — (CONSUME) |
| Blur prominence | `--glass-blur-btn` 13px / `.glass-deep` 16px (live-verified) | `--glass-capsule-blur` knob re-point |
| Rim + under-shadow lift | `--glass-btn-rim`/`--glass-btn-under-shadow` (surfaces.css:200, KEEP) | folded into `.glass-capsule` |
| Specular gleam | `v-specular` directive + `.glass-wash::before` recipe (auto-arms, KEEP) | — |
| Glass hover (bloom+lift) | `.glass-capsule-hover` (TAB-IOS-CAPSULE §A.4) composing `.glass-drag-lift`'s `--glass-specular` | — (CONSUME) |
| Coupled press squish | `useSpringPress` + `useLiquidFlex` (W-BUTTON-GLASS b, KEEP byte) | — |
| Liquid-weight squish | `--motion-weight` (booked W-MOTION-WEIGHT) + `--ease-cartoon-punch` (booked W-CARTOON-PUNCH) | — (DEPEND) |
| Press illumination LERP | `--glass-btn-press-t` → `--specular-intensity` cohort (surfaces.css:250, KEEP) | — |
| Consumer accent / commit tint | `--glass-accent` (BB.W-GLASS-ACCENT) | per-variant `--glass-accent` set |
| Dock control material | `.dock-icon-button` re-pointed onto `.glass-capsule` (kill the `::before` fork) | — (CONSUME) |
| Refraction opt-in | `.glass-lens` `:liquid` (`@supports url()`-gated, KEEP) | — |
| Four-state contract | CVA base + `.focus-ring` + `--control-*` comfort axis (KEEP) | — |

**No new component. No new material recipe. No second hover/press engine.** Buttons + tabs +
dock-buttons consume the ONE `.glass-capsule` + `.glass-capsule-hover`. The button CVA shrinks:
its glass variants drop the inline `.btn-glass` composite + the per-variant `hover:bg-*`/`scale-*`
strings and become `glass-capsule glass-capsule-hover` + a `--glass-accent` set + the size/ink.

---

## 8. DELTA-ASSAY → wave reconciliation (no dup against the union set + the tabs register)

The buttons "glassy-like-tabs" ask is **already booked as a RESOLVE row** in the tabs
WAVE-AMENDMENT §E — there is no `W-BUTTON-GLASS` wave on disk because the gestalt is covered by
the capsule extraction. This lens does NOT author a new wave; it produces the AUGMENT clauses for
the existing waves + the DEPEND/CONSUME edges:

- **AUGMENT `BD.W-TAB-IOS-CAPSULE`** (the material owner) — fold the **Button + dock consumption**
  into its §A.4/C2 "≥3 consumers" clause explicitly: the C2 born-RED arm must assert
  `.glass-capsule` has ≥3 consumers *including `.btn-glass` and `.dock-icon-button`* (today: 0 —
  the class doesn't exist). The C6 capsule-chroma ≥ 0.02 arm is the SAME gate that proves the
  button fill is warm — re-run it sampling a live `default` Button over the field (born-RED on
  HEAD: button fill 0.0138). NO new wave.
- **DEPEND `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH`** — the press squish liquid-weight reads
  both (§4). DEPEND edges, no mint (same reconciliation tabs/dock/goo-morph all made).
- **CROSS-LINK `BD.W-DOCK-TAB-INDICATOR`** — the dock SELECTED button reads the SAME
  `--glass-accent` + flood recipe the dock-tab indicator consumes (§5). No re-mint.
- **PRUNE on adopt:** the inline `.btn-glass` material composite (surfaces.css:187-256), the
  per-variant `hover:bg-*`/`hover:scale-*` glass strings in `button/index.ts`, and the
  `.dock-icon-button::before` material fork (material.css) — all RETIRE onto the capsule (clean
  break, no alias, no-legacy). The CVA keeps the variant KEYS (no public-prop break) — only the
  class strings collapse onto the capsule.

### The born-RED gate arms (live-verified this pass)

| Gate arm | HEAD live state | Verdict |
|---|---|---|
| `default` Button fill meanChroma ≥ 0.02 over the field, both modes | `oklab(…0.0138)` near-gray | **RED** |
| every glass variant (glass/secondary/outline/accent) clears 0.02 | all 0.0138 | **RED** |
| `.glass-capsule` exists + Button + dock consume it (≥3 consumers) | class absent; 3 parallel forks | **RED** |
| bare `default` hover lifts (scale > 1 + specular bloom) | surface-only, `scale:1` | **RED** |
| dock `.dock-icon-button` reads a glass lozenge at REST | transparent square (no fill/blur/rim) | **RED** |
| dock control material = `.glass-capsule` (not `::before` fork) | `::before` fork | **RED** |
| press squish reads `--motion-weight`/`--ease-cartoon-punch` | tokens absent (booked) | RED until deps land |
| KEEP: blur 13/16px, rim+drop, `v-specular`, coupled press | all present + fit | GREEN (preserved) |

**The π must reproduce the REAL hover + press** (drive `:hover` + a `pointerdown`/`pointerup`
cycle, sample the painted scale + specular delta + the chroma over the LIVE field both modes —
never a hardcoded-hsl spike, the §L7 painted-pixel law), and judge the GESTALT: the buttons read
as warm transmissive glass with a real glass-hover, both modes. A `--glass-tint-strength`-pinned-0
control (no warm floor) reds the chroma arm; a `scale:1`-pinned control reds the hover-lift arm.

---

## 9. Convergence

**Item convergence: ~75%.** The blur ladder, the depth-stack lift, the `v-specular` gleam, the
coupled `useSpringPress`+`useLiquidFlex` press, the four-state CVA, the comfort axis, the
de-shadcn glass reskin, and the `:liquid` refraction opt-in all SHIP and are KEPT. The genuine
remaining work is entirely the CONSUME of the `.glass-capsule` register the tabs greenfield is
already extracting: (1) re-point `default`/glass-register Button variants onto `.glass-capsule`
+ `.glass-capsule-hover` (drops the inline composite + the per-variant hover strings); (2) wire
the glass-hover lift onto the DEFAULT path (today only `primary-audacious` lifts); (3) re-point
`.dock-icon-button` onto the capsule + give it the at-rest quiet lozenge (today bare-transparent);
(4) DEPEND the two motion tokens for the liquid-weight squish. The single load-bearing crack is
the **near-gray fill (chroma 0.0138)** — and it closes the instant the button stops authoring its
own material and consumes the warm-floor capsule. This is a UNION (the buttons become the capsule's
second consumer), never a bolt-on or a parallel button-glass fork.
