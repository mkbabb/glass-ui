# SELECT (forms) greenfield — Lens A: the WELLING warm-glass listbox (the menu that blooms from the trigger like liquid, reads warm glass, not a gray plate)

> GREENFIELD brainstorm · pure iOS-27 fidelity · designed from first principles, then UNIONED with the shipped Select + `menu.css` + the glass-material / page-background / tabs goldens. Tranche-dev only — no `src/` paint here.
> The user's verbatim: the open animation "needs to be SMOOTHER and REFINED"; the dropdown reads as "a flat GRAY plate in LIGHT mode."

---

## 0. What I verified LIVE (painted pixels, `/forms/select`, REAL click to open the portal, both modes, chrome-devtools) — the honest born-RED truth

The select is **not broken** — it is *starved and uncoupled*. Source-verified + measured, both modes:

| Claim | Verified live (getComputedStyle / screenshot) | Verdict |
|---|---|---|
| The open animation EXISTS and is liquid | the menu rides `.glass-reveal`: `scale 0.88→1`, `filter blur(4px)→0`, `transition` = the spring-snappy `linear(0, 0.10159, 0.31119, …)` @ **0.4s** on scale+blur, `--ease-out` on opacity; `transform-origin: 0px 382.383px` (the bottom-left **edge-anchor** — the panel opened UP, `data-side="top"`, blooming from the trigger edge, NOT center) | **REAL + smooth.** This is NOT janky. The user's "smoother/refined" ask is a *coupling + weight* refinement, not a rebuild (see §0a). |
| Menu surface = warm glass, not gray | light `oklab(0.936 0.0056 0.0133 / 0.808)` → **C 0.0144 @ h 67°** (warm-cream); dark `oklab(0.379 0.0099 0.0169 / 0.894)` → **C 0.0196 @ h 59.5°** (warm-brown). blur(13px) saturate(1.6). Clears the 0.010 intrinsic floor — **BUT the SCREENSHOT reads FLAT GRAY** (menu cream-on-card-cream-on-page-cream, three near-identical luminances, zero transmission, zero depth) | **BORN-RED (honest).** The chroma metric passes; **the eye reads gray.** Root cause is NOT the menu token — it is (1) the flat page behind (rootBg `rgb(251,250,248)`, C 0.0029 — *nothing to transmit*) + (2) `--glass-tint-strength` dormant. The §3 disease, made visible. |
| The active/hover item = warm accent, liquid | highlight light `oklab(0.916 0.0055 0.0131 / 0.52)` — **same hue/chroma as the menu**, only a +0.04 L brighten + `translate 0 -1px`; dark highlight C 0.0187 @ 59.7°, +0.035 L. `--accent: var(--neutral-3)` (a **NEUTRAL** accent — gray by construction) | **WEAK.** The highlight is a faint luminance bump with **no warm-accent chroma event** — it does not read as "selected/hot." The screenshot confirms: the highlighted top row is a barely-bordered cream rectangle. |
| Trigger reads as a defined shape | border `1px solid color(srgb 0.11 0.098 0.09 / 0.05)` — a **5%α** whisper; `box-shadow: none`; bg `srgb 0.994 0.96 0.926 / 0.5` (cream) | **WEAK.** The trigger melts cream-on-cream (the glass-material §4 defined-edge gap, on the Select trigger specifically). |
| Chevron rotation couples to the open | `transition: transform 200ms ease-standard` + `rotate(180deg)` on `[data-state=open]` — a **flat bezier on a SEPARATE 200ms clock**, decoupled from the 0.4s spring reveal | **UNCOUPLED.** The chevron flips on its own short flat clock while the panel blooms on a 0.4s spring — two un-synced motions reading as one event. The literal "not refined" tell. |

### 0a. The precise "smoother/refined" diagnosis (live timing, not vibe)

The reveal is a clean, edge-anchored, spring-clocked zoom-from-0.88-with-blur-settle — genuinely good. What makes it read *slightly stiff / un-iOS* rather than *liquid*:

1. **The chevron is on a different clock + curve** (200ms flat `ease-standard`) than the panel (400ms `--spring-snappy`). The two halves of one gesture don't move together.
2. **The reveal scale is UNIFORM** (`scale: 1` write, both axes equal). iOS-27 menus **well open**: a hair more height-growth than width at the start (the panel "unfurls down the anchor edge"), volume-preserving — a `useLiquidFlex`-style anisotropic squish on the bloom, not a uniform zoom.
3. **No anticipation, no over-settle.** The snappy spring overshoots ~7% (good) but the bloom doesn't *anticipate* (the iOS menu has a micro-grow-past-then-settle). The `--ease-cartoon-punch` register (design.md §L2/§Easing — **verified NOT minted in `src/styles`**, a Band-0 prerequisite) is the loud-opt-in version; the *default* select wants a restrained version of the same shape on the reveal's own snappy clock.

**None of this is a teardown.** The reveal recipe is the right substrate; the refinement is *couple the chevron to it, give the bloom anisotropic weight, anchor the origin to the real trigger edge (already done).*

**Source-verified (exist, will be consumed):** `.glass-reveal` (`glass/reveal.css`) + its `--glass-reveal-blur`/`--glass-reveal-slide`/`--glass-reveal-enter-scale` knobs; `useLiquidReveal` (`composables/motion/useLiquidReveal.ts` — the source-rect bloom refinement); `--reka-popper-transform-origin` / `--reka-select-content-transform-origin` (live, edge-anchored); `.glass-menu-row` + `.glass-menu-section` (`menu.css`); `menuItemVariants` (`_shared/menuItemVariants.ts`, `surface=glass`→`.glass-menu-row` default); `--spring-snappy` / `--spring-snappy-duration` (0.4s live); `--glass-tint-strength` (live = `clamp(4%…20%)` adaptive, defaults dormant on the menu); `--glass-bg-floating-tinted` (W55 element-level adaptive seam); `--glass-accent` / `--glass-accent-strength` (the per-instance chromatic rim, registered `property-regs.css`); `--control-surface-border` (`= --glass-border-floating`, the 5%α whisper); `useSurfaceAxis` / `surfaceClass` (the Select content's surface axis); `--touch-target` (44px floor, live on the row).

**SOURCE-VERIFY FAILURES — cited-but-absent (must be minted, never `var()`-and-pretend):**
- **`--ease-cartoon-punch`** — design.md §Easing prose only; **grep ZERO in `src/styles`**. The Band-0 cartoon-punch token. This lens does NOT make it the select default; the reveal rides the extant `--spring-snappy`. The chevron-couple opt-in *may* read it once minted.
- **`--motion-weight`** — design.md §L4 prose only; **NOT minted**. Same fence — the bloom-squish rides the extant `useLiquidFlex` volume-preserving primitive, not a phantom scalar.
- **`.glass-capsule` / `.glass-capsule-track` / `.glass-capsule-hover`** — the **tabs greenfield's** proposed extraction (`docs/tranches/BD/greenfield/tabs/brainstorm/lens-a.md`), **not yet on disk**. This lens CONSUMES it as a Band-0/tabs prerequisite for the trigger's resting+hover glass (the union, §5) — it does not re-fork a select-private capsule.
- **`.glass-field` / the warm-mesh plenum / `--field-stop-*`** — the **page-background + glass-material greenfields'** load-bearing field, **not built**. This lens's gray fix DEPENDS on it (the §3 root cause #1). The select cannot un-gray itself in isolation; it consumes the field.

> **The trap prior goldens fell into (the recurring fraud): the chroma gate composited `getComputedStyle` over a HARDCODED field → a gray surface passes.** My gate (§7) reads the COMPOSITED screenshot pixel of the menu over the REAL flat page, born-RED today (the screenshot IS the proof: three cream luminances, zero transmission). A born-RED that reports the honest gray over the real flat condition is correct.

---

## 1. The core idea — the WELLING warm-glass listbox: the menu is liquid that wells up out of the trigger over a live field, and the selected row is the ONE warm-accent event

Three coupled refinements, each a *union* with a shipped seam, none a re-fork:

1. **MATERIAL — un-gray by CONSUMING the field, not re-tinting.** The menu reads gray for the two root causes the glass-material §3 names: (#1) no colorful field behind it, (#2) `--glass-tint-strength` dormant so the floating-tinted recipe sits at its near-gray intrinsic floor. The fix is **NOT a re-tint of `menu.css`** (that would just bias the cream warmer and still read flat). It is: the Select portal **inherits the `.glass-field` warm-mesh** (page-background greenfield) so the blur finally has chroma to bend, AND the menu's `--glass-tint-strength` lifts off dormant via the **W55 element-level adaptive seam** (`--glass-bg-floating-tinted`) so it darkens-to-legible / warms over the now-live field. The menu becomes transmissive glass because it finally has something to transmit.

2. **MOTION — couple the gesture + give the bloom weight.** The reveal already blooms edge-anchored on the snappy spring. Refine: (a) **couple the chevron** onto the SAME `--spring-snappy` + `--spring-snappy-duration` clock as the panel (kill the 200ms flat fork) so the arrow and the panel are one motion; (b) **make the bloom anisotropic** — a `useLiquidFlex` volume-preserving squish on the reveal so the panel *wells down the anchor edge* (height leads width a hair at open, settles to fit), the iOS "unfurl," not a uniform zoom; (c) the loud opt-in carries the minted `--ease-cartoon-punch` anticipation, but the select **default stays the restrained snappy** (the workhorse, per design.md §L2).

3. **INTERACTION — the selected row is the ONE warm-accent liquid event.** The highlight is gray because `--accent: var(--neutral-3)`. The fix: the highlighted/selected row paints a **warm-accent glass chip** — the same `--glass-accent` per-instance chromatic axis the rest of the system uses — at a bounded strength, so the active item reads as a *hot, lifted, warm lozenge* (the iOS blue-pill, warmed to the house amber identity), with the liquid lift it already has (`translate -1px`) deepened to a real glass-press read.

### The single boldest move

**Make the Select PORTAL carry its own warm-mesh field, so the dropdown is glass over a live drifting field even though it floats in `<body>` detached from the page.** The portal is the exact place the gray disease is worst: a `SelectPortal`-ed menu blooms into `document.body`, *outside* the route's `.glass-field` — so even after page-background lands, the portal floats over the body's flat plate and stays gray. The bold move is a **`.glass-field-portal` companion**: the SelectPortal root writes the SAME `--field-stop-*` spine the route declared (threaded through the portal via the `data-field-palette` the chassis already sets, re-emitted onto the portal root), and paints a *clipped, menu-local* warm-mesh **behind the menu's own backdrop-filter** (a `::before` on the portal container, `-z-1` under the `SelectContent`). The menu now transmits a warm field *of its route's identity* (forms = indigo-warmed amber) — so a forms dropdown and a feedback dropdown read as **different warm glass**, both transmissive, neither gray, whether the page-background field is behind them or not. This is the union that makes the portal's gray *structurally impossible*, the way the six-layer recipe makes a flat plate impossible — and it composes the page-background spine verbatim (no second palette, no re-fork).

---

## 2. The MATERIAL layer — un-gray the menu by consuming the field + lifting the tint off dormant

### 2a. The portal-local warm field (`.glass-field-portal`)

`src/styles/menu.css` (the menu's home file — DRY, the shared register) gains the portal field recipe; `SelectContent.vue`'s `<SelectPortal>` wrapper gains a `data-field-palette` re-emit + the `.glass-field-portal` class:

```css
@layer components {
  .glass-field-portal::before {
    content: ""; position: absolute; inset: -20%;   /* over-bleed under the clipped menu */
    pointer-events: none; z-index: -1; border-radius: inherit;
    /* the SAME 4-stop spine the route declared, read from the re-emitted CSS vars —
       NOT a menu-private palette (DRY with page-background §2a). */
    background:
      radial-gradient(70% 60% at 24% 22%, color-mix(in oklch, var(--field-stop-0), transparent 40%), transparent 72%),
      radial-gradient(64% 58% at 82% 80%, color-mix(in oklch, var(--field-stop-1), transparent 44%), transparent 70%),
      radial-gradient(60% 62% at 60% 40%, color-mix(in oklch, var(--field-stop-2), transparent 46%), transparent 74%);
    /* STATIC (a 380px dropdown over <1s of life does not need drift — the field is
       there to give the blur chroma to bend, not to animate). compositor-cheap. */
  }
}
```

The menu's `backdrop-filter: blur(13px) saturate(1.6)` (live, untouched) now samples this warm field as its backdrop, so the menu **transmits warm** — the Maps-card read — instead of bending the flat body plate. **`color-mix(in oklch)`** keeps the hue honest (an sRGB mix muddies to gray — the §3 disease).

### 2b. Lift `--glass-tint-strength` off dormant on the menu (the W55 seam)

The menu surface (`SelectContent` `glass-floating`) and the row both read the element-level oklab tint `color-mix(in oklab, var(--glass-bg-*), var(--glass-tint-source) var(--glass-tint-strength))` (verified, `menu.css:37` + `ladder.css`). With `--glass-tint-strength` dormant the mix is a near-no-op → the near-gray floor. The fix is the **W55 adaptive seam already live**: the menu opts its surface into `--glass-bg-floating-tinted` (the `:where(.btn-glass,.segmented-indicator)` adaptive register — *widen the `:where()` to include `[data-slot="select-content"]`*), so the tint-strength resolves off the backdrop luminance (darkens-to-legible over a bright field, warms over a calm one) — **NOT a re-tint, NOT a prose assertion**: a real decl that makes the menu's tint *adaptive and alive* instead of dormant. This is the glass-material §2.2 transmissive target generalized to the menu.

### 2c. The trigger defined-edge (the cream-on-cream melt)

The trigger's `--control-surface-border` 5%α whisper is the glass-material §4 leg-(c) gap, on the Select trigger. The fix is **that wave's `--glass-edge-floor`** (the directional-rim α floor on the control tier) — NOT a select-private border. Over the §2a field the edge is trivially cut; the floor is the flat-page insurance. The trigger also composes the tabs greenfield's **`.glass-capsule-hover`** at rest+hover (§5) so it lifts a hint of glass on hover (the "ready to open" read) — currently a flat cream pill.

---

## 3. The MOTION layer — couple the gesture, weight the bloom

### 3a. Couple the chevron to the panel's spring (kill the flat 200ms fork)

`SelectTrigger.vue`'s chevron rides `transition: transform 200ms ease-standard`. Refine to the SAME spring + clock the panel uses:

```html
<!-- was: transition-transform duration-200 ease-standard -->
<ChevronDown class="[transition:rotate_var(--spring-snappy-duration)_var(--spring-snappy)] [&[data-state=open]]:rotate-180 …" />
```

Now the arrow rotates on the snappy spring's `linear()` overshoot, settling in lockstep with the panel's bloom — one gesture, not two clocks. (The `rotate` longhand, not `transform`, so it composes with the chevron's other transforms — the reveal-recipe discipline.)

### 3b. The welling bloom — anisotropic, volume-preserving (the iOS unfurl)

The reveal's `scale: 1` write is uniform. The refinement: a `useLiquidReveal`-fed anisotropic squish so the panel **wells down the anchor edge** — at the open frame height leads width a hair (`scale: calc(1/√stretch) calc(√stretch)` biased to the anchor axis), releasing to `1 1` at settle. This rides the **extant `useLiquidFlex` volume-preserving primitive** (the same one tabs' travel-squish + the metaball merge speak — NOT a new spring, NOT a `@keyframes`), bounded LOW (≤1.06 — a *whisper* of unfurl, the anti-taffy bar; a menu is not a celebration). `transform-origin` is already the real trigger edge (live `0px 382px`). PRM → the squish stays 1 (the reveal's existing PRM carve already snaps scale to `none`; the bloom-squish gates on the same branch).

### 3c. The loud opt-in (the cartoon register, NOT the default)

A `:punch` prop on `SelectContent` (or the demo configurator's loud rung) swaps the reveal's snappy clock for the **minted `--ease-cartoon-punch`** (anticipation dip → 22% overshoot → settle) — the audacious front-door read. The select **default stays `--spring-snappy`** (the workhorse, design.md §L2: "loud by design and opt-in; the workhorse remains snappy"). The punch is the configurator/demo dial, not the resting library behavior.

---

## 4. The INTERACTION layer — the selected row is the ONE warm-accent liquid event

The highlight reads gray because `--accent: var(--neutral-3)` and `.glass-menu-row` paints `--menu-row-bg` off `--glass-bg-quiet` (neutral). The refinement makes the **active/highlighted/selected** row paint a **warm-accent glass chip** via the per-instance `--glass-accent` axis (verified, registered):

```css
.glass-menu-row[data-highlighted]:not([data-disabled]),
.glass-menu-row[aria-selected="true"] {
  /* the warm-accent chip — the row's own --glass-accent at a bounded strength,
     mixed into the quiet plate so the active row reads HOT-but-warm, not gray.
     --glass-accent defaults to the section identity (forms = indigo-warmed amber);
     a consumer overrides per-instance. */
  background: color-mix(in oklab, var(--menu-row-bg),
              var(--glass-accent) var(--menu-row-accent-strength, 14%));
  translate: 0 var(--menu-row-lift);            /* the liquid lift (extant) deepened */
  box-shadow: var(--glass-rim-top);             /* a catch-light cut on the active chip */
}
```

`--menu-row-accent-strength` is a bounded ~14% (the iOS hot-pill warmed to house amber — a HUE EVENT, not a saturated flood; the §L5 legibility fence keeps `--accent-foreground` AA over it). The selected DOT (`SelectItem`'s `--select-dot-color`) lifts to the accent hue too, so the selected row's dot + chip read as one warm event. This is the literal "warm accent, liquid" the user's #3 names — currently a gray luminance bump. **The `--accent: var(--neutral-3)` default is the no-legacy break:** the menu accent reads `--glass-accent` (the chromatic axis), NOT the neutral `--accent` (which stays neutral for non-glass surfaces).

---

## 5. How it composes EXISTING primitives (deft, DRY, no re-fork) — the union

| concern | reuse (no fork) |
|---|---|
| the open bloom | `.glass-reveal` (`glass/reveal.css`) — UNTOUCHED; the chevron joins its clock, the bloom adds the `useLiquidFlex` squish leg |
| the source-rect bloom | `useLiquidReveal` (shipped) — feeds the anisotropic unfurl |
| the bloom-squish | `useLiquidFlex` (shipped, volume-preserving) — the SAME primitive tabs/metaball speak |
| the menu rows | `.glass-menu-row` + `menuItemVariants` — UNTOUCHED structurally; the highlight gains the `--glass-accent` chip leg |
| the menu surface | `SelectContent` `glass-floating` + `useSurfaceAxis` — UNTOUCHED; opts into the W55 `--glass-bg-floating-tinted` adaptive seam |
| the portal field | `.glass-field` warm-mesh spine (page-background greenfield) — re-emitted onto the portal root; NO menu-private palette |
| the warm field | `--field-stop-*` spine + `color-mix(in oklch)` (page-background) — verbatim |
| the trigger resting+hover glass | `.glass-capsule` + `.glass-capsule-hover` (tabs greenfield extraction) — composed, not re-forked |
| the trigger edge | `--glass-edge-floor` (glass-material §4) — the control-tier rim floor |
| the accent axis | `--glass-accent` / `--glass-accent-strength` (registered, `property-regs.css`) |
| the chevron couple | `--spring-snappy` / `--spring-snappy-duration` (live) |

**The select greenfield's net-new src artefact is small:** the `.glass-field-portal` recipe in `menu.css` + the highlight-accent-chip leg on `.glass-menu-row` + the W55 `:where()` widen + the chevron-clock swap in `SelectTrigger.vue`. Everything else is a re-point of a shipped or sibling-greenfield seam. The menu register stays the **shared** glass — Combobox / Command / DropdownMenu / ContextMenu (all 13 `menuItemVariants` consumers) inherit the un-gray + the warm-accent chip in ONE edit (the DRY mandate: the menu consumes the same warm-glass register as cards/tabs).

---

## 6. Cross-engine (Chrome + Safari) + a11y / PRM

**Cross-engine (§L7) — every channel compositor-only + Safari-native:**
- **Bloom** — `scale`/`translate`/`filter: blur()` interpolation: cross-engine (the reveal recipe is already paired-engine).
- **Bloom-squish** — `scale` on the menu's own box: compositor, identical on WebKit.
- **Chevron** — `rotate` on the snappy `linear()`: cross-engine.
- **Portal field** — pure `radial-gradient` + `color-mix(in oklch)`: native both engines; `@supports not (color-mix(in oklch…))` → `in srgb` honest-degraded arm.
- **Menu transmission** — `backdrop-filter: blur() saturate()` on the menu's OWN layer sampling the portal field (a normal painted `::before`, NOT another backdrop-filter) → the §L1 "glass cannot sample glass" trap is avoided by construction (the field carries no filter). NO `backdrop-filter: url()`.
- **Accent chip** — `color-mix(in oklab)` + `box-shadow`: Safari-safe.
- Acceptance = **paired-engine π** (chromium + webkit), both modes, never reducedMotion on the bloom arm.

**a11y / PRM carve:**
- **PRM `reduce`** → the bloom snaps (reveal's existing carve: scale→none, blur→0, opacity fade survives), the bloom-squish stays 1, the chevron rotates instant; the warm field + the accent chip + the edge floor (all static) REMAIN — un-gray and selection-legibility need no motion. The opt-in punch collapses to `--ease-standard`.
- **Roving / focus** → reka owns the listbox roving (arrow keys move `[data-highlighted]`); the accent chip + the dot read the SAME `data-highlighted`/`aria-selected` the keyboard drives (verified: hover/focus/highlight all reach the one register). The selected DOT stays `aria-hidden` decorative — the a11y selected state is reka's `aria-selected` on `role="option"` (the shipped discipline, untouched).
- **`prefers-contrast: more`** → the edge floor + the accent-chip strength floor UP (legibility assets); `--accent-foreground` holds AA over the warm chip.
- **`prefers-reduced-transparency`** → the menu falls to the opaque tier (`--glass-level` machinery); the portal field stays (it's paint, not transparency) so the opaque escape still reads warm-over-chromatic, never gray. The accent chip survives solid.
- **Tap target** — the row's `min-block-size: max(2rem, var(--touch-target))` 44px floor (live, verified) holds.

---

## 7. The gate that reproduces the REAL gesture on PAINTED pixels (the cardinal anti-fraud rule)

The π (`tests-visual/select-forms.spec.ts`, chromium + webkit, both modes, never reducedMotion on the bloom):

1. **Drive a REAL open** — `.click()` the actual `[data-slot="select-trigger"]` (verified live this opens the portal; a synthetic state poke would not portal). Wait for `[data-slot="select-content"][data-state="open"]`.
2. **MENU-NOT-GRAY (the cardinal painted-pixel rule):** take a **full-page screenshot**, `getImageData` the menu region **composited over the real page** (NEVER `getComputedStyle` over a hardcoded field — the recurring fraud). Assert mean OKLab **C ≥ 0.018** (transmissive over the field, strictly above the 0.0144 flat-page floor) AND warm hue ∈ [16,110] AND **spatial luminance variance > floor** (the field gives the menu real structure — a flat plate reads var≈0 and REDs). **Born-RED on HEAD** (the screenshot IS the proof: C 0.0144, var≈0, three identical cream luminances).
3. **Anti-evasion self-test:** the gate FAILS on a flat-base portal AND on a hardcoded inline field, PASSES only on the real composited warm-mesh menu (proves it reads painted pixels, not the base token).
4. **OPEN-SMOOTH (frame-series the bloom):** capture the menu's measured bounding-box across the early frames → scale rises **0.88→1 monotonic-with-snappy-overshoot** (the ~7% over-settle present), the bloom-squish area stays volume-preserving (≤1.06 anisotropy at open, →1 at settle), **the chevron `rotate` and the panel scale settle within ±1 frame** (the COUPLE — born-RED on HEAD: the chevron finishes at 200ms, the panel at 400ms, a measurable 200ms desync). `transform-origin` tracks the trigger edge (the unfurl anchor, live-confirmed).
5. **WARM-ACCENT-CHIP:** the highlighted/selected row's composited chroma **exceeds the menu plate chroma by the accent delta** AND its hue sits at `--glass-accent` (warm) — born-RED on HEAD (highlight C 0.0144 ≈ menu C, neutral). A control run pinning `--menu-row-accent-strength: 0` reads no delta (the self-test).
6. **TRIGGER-EDGE:** the trigger rim contrast over its OWN plate clears the `--glass-edge-floor` (born-RED: 5%α whisper).
7. **Cross-engine** — every assert paired chromium+webkit. **Material fence** — `variant="ghost"` trigger reads no capsule glass (the transparent arm survives).
8. **Gestalt row** (`select-forms`): a fresh both-mode `:5199` capture, the human verdict — "clicking the trigger: the chevron + panel move as ONE liquid gesture, the menu wells open and reads WARM GLASS over a live field (not a gray plate), the selected row is a warm-accent hot lozenge" — born-FAIL on HEAD, GREEN at close.

The detector arm (`proof:select-forms`) plants self-test bites: the chroma gate composited over a hardcoded field → RED; the chevron back on the 200ms fork → RED; a re-tint of `menu.css` instead of the field+W55 consume → RED (it would pass the chroma metric but FAIL the variance + anti-evasion arms); a neutral `--accent` accent chip → RED; a bloom-squish >1.06 (taffy) → RED; the portal field as a second `backdrop-filter` (glass-on-glass) → RED.

---

## 8. The DELTA-ASSAY → the wave amendment (reconcile vs the 116-wave set + the menu/glass waves; NO dup)

This lens is an **AUGMENT + COUPLE**, not a new component wave. Reconciled:

| amendment | scope | reconciles / dup-check |
|---|---|---|
| **AUGMENT the menu-glass wave** with the portal-local `.glass-field-portal` (the SelectPortal carries its route's warm-mesh spine, re-emitted) | NEW recipe in `menu.css` + `SelectContent.vue` portal root | composes the **page-background `.glass-field` spine VERBATIM** (no second palette); folds the portal-gray hole page-background named but couldn't reach (it stops at the route root, the portal escapes to `<body>`) — a UNION, not a new field engine |
| **AUGMENT `.glass-menu-row`** with the warm-accent chip on `[data-highlighted]`/`[aria-selected]` (the `--glass-accent` axis, bounded ~14%) | REFINE `menu.css` (the SHARED row — all 13 menu/picker SFCs inherit) | distinct from the neutral `--accent`; reuses the registered `--glass-accent`; the literal user-#3 "warm accent" gap |
| **COUPLE** the chevron clock + WELL the bloom | REFINE `SelectTrigger.vue` (chevron → `--spring-snappy`) + the reveal consumes `useLiquidFlex` anisotropic squish (≤1.06) | reuses `.glass-reveal` + `useLiquidReveal` + `useLiquidFlex` UNTOUCHED in shape; the literal user-#1 "smoother/refined" — a couple, not a rebuild |
| **CONSUME the W55 adaptive tint** on the menu surface (widen `--glass-bg-floating-tinted` `:where()` to `[data-slot="select-content"]`) | REFINE `surfaces.css` `:where()` | reuses the W55 seam; lifts `--glass-tint-strength` off dormant adaptively — NOT a re-tint |
| **CONSUME** `--glass-edge-floor` (glass-material §4) on the trigger + `.glass-capsule-hover` (tabs greenfield) at rest/hover | REFINE the Select trigger | augments two sibling greenfields; no select-private fork |

**Band-0 PREREQUISITES (must land FIRST, flagged):** `--ease-cartoon-punch` + `--motion-weight` minted (Band-0); `.glass-field` / `--field-stop-*` spine (page-background); `.glass-capsule*` (tabs); `--glass-edge-floor` (glass-material). This lens RIDES the extant `--spring-snappy` for the default so it is not BLOCKED on the cartoon mint — the punch is the opt-in upgrade once `--ease-cartoon-punch` exists.

**NO new tier, NO new compose recipe beyond `.glass-field-portal`, NO re-fork.** The select becomes the *reference consumer* of the field+menu+capsule+accent union — un-gray and liquid by composing what the siblings ship, not by minting a parallel select-glass.

---

## 9. Gestalt — the bar

Open `/forms/select`, REAL-click the trigger, both modes. **Today:** the chevron flips on a short flat clock while the panel zooms on a separate 0.4s spring (two un-synced motions); the menu is a flat cream plate over a flat cream card over a flat cream page (three identical luminances, zero transmission — the screenshot proof); the selected row is a faint gray luminance bump. **After:** the chevron + panel move as ONE liquid gesture, the menu WELLS open (a whisper of unfurl down the trigger edge) and reads WARM GLASS transmitting a live route-identity field (forms = indigo-warmed amber, never gray, both modes), the selected row is a warm-accent hot lozenge with a real glass lift — and the front-door opt-in carries the cartoon-punch anticipation. The §3 colorful-field + the liquid-weight + the warm-accent identity, all REAL on painted pixels, sampled over the actual flat condition, not faked by a hardcoded spike.
