# SELECT-FORMS — LENS-B (cross-engine / perf-first greenfield)

> The Select (Trigger + portalled Content menu + Item rows) + the shared `menu.css`
> register + the open/reveal animation, redesigned from first principles through the
> **FLAWLESS-Chrome-AND-Safari + performance** lens. The bar: the open animation reads
> **smooth + liquid + refined** and the menu reads **warm glass, never gray**, both modes.
> A UNION with the shipped Select + `menu.css` + the page-background / tabs(`.glass-capsule`)
> / glass-material goldens — **no re-fork, KISS, DRY**. Every cited token/composable was
> grepped on disk; the born-RED is **live-measured on `/forms/select`** (§0).

---

## 0. THE BORN-RED TRUTH (live, `/forms/select`, real click already open, dark root)

Measured via `getComputedStyle` of the resolved tokens AND the composited surface, on the
real route with the menu OPEN (chrome-devtools, the page root was in **dark** mode —
`html.dark`, the open menu+hero only LOOK pale):

| probe | live value | verdict |
|---|---|---|
| page-root paint behind the menu | `rgb(11,10,9)` → **OKLab L 0.146 · C 0.0028 · H 68.6** | **gray-charcoal, warm-hue but ~0 chroma** — the §3 "menu over a flat page" disease, painted |
| `--paper-field` mounts on the route | **0** (`.paper-field` count 0) | the keystone field is **unbuilt** — nothing colorful behind the glass to bend |
| `--field-h` | **(unset)** | no per-route warm color-script |
| menu fill token (`--glass-bg-floating`) | `oklab(0.379 0.0099 0.0169 / 0.894)` → **C 0.0117 · H 24.5** | warm-HUE but near-gray chroma — root cause #2 |
| `--glass-tint-strength` | **0%** | the dormant-tint: the floating-tinted recipe is ZERO-delta at rest → near-gray |
| `--glass-tint-source` | `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))` | the source IS warm both modes — it is just never admitted at strength 0% |
| menu `backdrop-filter` | `blur(13px) saturate(1.28) brightness(1.10)` | a real six-layer glass plate — but it samples a **flat gray page**, so it bends nothing |
| open reveal | `.glass-reveal` + `glass-floating`, `--spring-snappy` `linear()` @ **0.4s**, enter-scale **0.88**, `transform-origin: 0 382px` (the popper anchor edge) | origin-aware spring scale+fade+blur — **REAL, not broken** |
| `--ease-cartoon-punch` | **(unset)** | the BD cartoon-punch register is a **phantom** on this route (no anticipation/overshoot) |
| `--motion-weight` | **(unset)** | the one cartoon dial is **unminted** |

**The two defects are exactly the brief's §3 dyad, painted:** (1) **no colorful field**
behind the menu (`.paper-field` count 0, page C 0.0028), and (2) the **dormant tint**
(`--glass-tint-strength: 0%`) makes the floating recipe near-gray AT REST (C 0.0117).
Neither is a re-tint problem — the warm source is right there; it is **un-admitted** and
has **nothing behind it**. The open animation is **fit but un-refined**: a damped spring
with no anticipation/weight, on a surface that reads gray so the "welling glass" never
reads. **Born-RED is GENUINE.** The mechanism (origin-aware spring reveal + six-layer
floating plate) is **fit**; refine the motion toward the cartoon-punch register, and let
the surface inherit the field + warm-floor the goldens already mint.

---

## 1. THE GREENFIELD IDEA (one sentence)

The Select menu is a **warm-glass lozenge that wells open from the trigger edge on the
BD cartoon-punch curve** — it **anticipates** (a hair of recoil/squish), **blooms past its
settle as a volume-preserving squish-grow**, **clarifies** as its decongest-blur settles,
and lands lit over a **vivid warm `.paper-field`** so the six-layer plate finally **bends
real color** — while each Item row is the **same warm-glass register as cards/tabs/menu**
(the shared `.glass-menu-row` seam, lifted to a warm-FLOOR), the active row a **liquid
warm-accent pill** — and **every channel is compositor-only + Safari-native by
construction** (no `backdrop-filter:url`, no SVG goo, no WebGL; the menu is a CSS `scale`
on its own rounded box). **Three goldens already built the parts; this wave WIRES them
onto the Select and refines the reveal — it builds almost no new surface.**

### The single boldest move

**Re-clock the `.glass-reveal` SPATIAL channel onto `--ease-cartoon-punch` × `--motion-weight`
universally — so EVERY portalled overlay (Select, Dropdown, Popover, Combobox, Context,
Tooltip-panel, the dialog floor) inherits the iOS-27 *welling-open* punch from ONE token
edit — and gate the menu's warm-not-gray by the COMPOSITED painted pixel over the REAL
`.paper-field`, never `getComputedStyle` over a hardcoded field.** The reveal is a *shared
recipe* (`reveal.css`), so a single timing-function swap on its SPATIAL legs upgrades the
entire overlay family's open animation in lockstep — the Select is the reference
implementation, the whole family inherits. That is the maximal-leverage, minimal-surface
move: one curve, one dial, one field-admit, and the user's "smoother + refined" lands
everywhere overlays open, both engines.

---

## 2. THE MENU SURFACE — warm-not-gray (the §3 fix, NOT a re-tint, NOT a prose claim)

Two root causes, two REAL decls — both **consume the goldens**, neither re-tints:

### 2a. Root cause #1 — CONSUME the field (page-background GOLDEN)

The menu portals to `<body>`; the `.paper-field` (page-background GOLDEN, `--field-h`
clamped warm ∈ [25,95]) is a fixed `-z-1` sibling behind the whole app. Once the chassis
mounts it (the page-background W-PAGE-FIELD mount via `<PaperBackdrop palette>`), the
portalled menu's `backdrop-filter: blur(13px) saturate(1.28)` samples the **composited
warm field output** — a normal painted layer, never another filter (the §L1
"glass-cannot-sample-glass" trap avoided by construction: the field is BEHIND, the menu is
a sibling forward). `/forms/select` resolves `--field-h: 48` (terracotta-warm, the
page-background `FIELD_SCRIPT.forms` entry). **This wave declares a hard dependency on
W-PAGE-FIELD; it does not re-build the field.** The Select's job is only to *not block* the
sample — verified: the portal sits above the field, the blur has live chromatic input.

### 2b. Root cause #2 — the warm-FLOOR decl (a REAL admit-floor on the menu seam)

At `--glass-tint-strength: 0%` the floating recipe is gray AT REST even with a field behind
(the blur softens but a 0% tint plate still reads desaturated where the field is faint).
The fix is a **bounded warm admit-floor on the menu/overlay surface** — the SAME mechanism
the dock-search field uses (`dock/search.css:45` composes `--glass-bg-floating` toward
`--glass-tint-source` at the W55 bright-bucket strength). The menu surface declares:

```css
/* select.css / a SHARED overlay-surface seam — the warm-FLOOR.
   The menu plate reads the ELEMENT-LEVEL warm-admitted floating tint, NOT the raw
   --glass-bg-floating token. --overlay-tint-floor is a BOUNDED (>0%, ≤8%) per-mode
   admit so the plate is warm-cream even where the field is faint — the no-gray floor. */
[data-slot="select-content"],
[data-slot="dropdown-menu-content"],
[data-slot="popover-content"] {     /* the shared overlay family — DRY, one seam */
  background: color-mix(in oklab,
    var(--glass-bg-floating),
    var(--glass-tint-source) max(var(--glass-tint-strength), var(--overlay-tint-floor)));
}
```

`--overlay-tint-floor` is a **PLAIN per-mode pair** (light arm `tokens/glass.css`, dark arm
`tokens/dark-arm.css`) — **NEVER a `light-dark()` fragment** (binding MEMORY: a `light-dark()`
arm inside a value that elsewhere carries an inset shadow computes the whole property to
`none`; here it is a plain `color-mix` so it is safe, but the per-mode pair is the
discipline). Bounded warm so the plate never re-colors loud, only refuses gray:

```css
/* tokens/glass.css (light) */   --overlay-tint-floor: 5%;
/* tokens/dark-arm.css (dark) */ --overlay-tint-floor: 7%;   /* dark needs more warm-lift */
```

`max(--glass-tint-strength, --overlay-tint-floor)` means a consumer who raises the global
W55 bright-bucket strength still wins (the floor is a FLOOR, not a clamp) — DRY with the
adaptive seam, no fork. The `in oklab` mix is the perceptual glass-tint family (W55/W-NO-GRAY).

> This is the §3 "REAL warm-FLOOR decl, NOT a prose assertion, NOT a re-tint": it admits the
> *already-warm* `--glass-tint-source` at a bounded floor, so the plate is warm-cream at rest
> AND bends the warm field when present. The chroma comes from admitting the warm source +
> sampling the warm field — never from saturating a new color onto the plate.

### 2c. The six-layer composite stays (it is fit)

The plate keeps `--glass-rim-top` (bright catch-light) + `--glass-rim-bottom` (warm
under-shadow) + `--glass-shadow-floating` (lift) + `--glass-blur-floating`
(`blur(13px) saturate(1.28) brightness(1.10)`, verified live). **No change** — the composite
is the iOS-27 transmissive register; it only ever read gray because it had nothing warm to
admit or bend. The wave touches the FILL admit + the FIELD behind, not the six layers.

---

## 3. THE OPEN/REVEAL — smoother + refined (the user's #1 ask, the bold move)

The live reveal is a `--spring-snappy` `linear()` @ 0.4s, enter-scale 0.88, origin-aware.
It is **damped, not weighted** — no anticipation (no pre-dip), no overshoot character, no
squish. The refinement is to **re-clock the SPATIAL channel onto the BD cartoon-punch
register the tabs/buttons/page-background goldens all depend on** — minted ONCE (Band-0),
consumed by `.glass-reveal` so the WHOLE overlay family inherits.

### 3a. MINT the cartoon substrate (Band-0 first — the phantoms, shared with tabs GOLDEN)

`--ease-cartoon-punch` and `--motion-weight` are design.md §L2/§L4 promises **unset on disk**
(verified live: both `(unset)`). The tabs GOLDEN already specs minting them; this wave
**depends on that mint, does not duplicate it**. For self-containment the exact substrate:

```css
/* tokens/scheme-motion.css §Easing — the cartoon-punch curve. A raw linear() easing
   (NOT a SPRING_PRESETS row — keeps the ≤10% spring-overshoot invariant intact). Drives
   transform/scale only → compositor-safe both engines. Dips < 0 (anticipation), peaks > 1.1 (punch). */
--ease-cartoon-punch: linear(0, -0.018 6%, -0.04 12%, 0.02 22%, 0.38 36%, 0.74 48%,
  1.0 60%, 1.16 70%, 1.22 76%, 1.14 82%, 1.04 88%, 0.99 94%, 1 100%);

/* tokens/scale-paper.css §Motion — the ONE cartoon-amount scalar. PRM → 0 zeroes it all. */
--motion-weight: 0.55;     /* the menu rides a RESTRAINED rung — a dropdown is not a hero */
@media (prefers-reduced-motion: reduce) { :root { --motion-weight: 0; } }
```

### 3b. Re-clock `.glass-reveal`'s SPATIAL legs (the universal upgrade — ONE edit)

The shipped `reveal.css` clocks scale+translate on `--spring-snappy` (verified). The
refinement: clock the **SPATIAL** legs (scale, translate) on `--ease-cartoon-punch` scaled
by `--motion-weight`; the **EFFECTS** legs (opacity, filter blur-settle) STAY on `--ease-out`
(a fade must never overshoot — the SPATIAL/EFFECTS split is preserved, §6 doctrine):

```css
.glass-reveal {
  /* the menu blooms FROM a clearer squish so the welling reads — 0.88 → 0.86 + the punch.
     The enter-scale lerps toward 1 by --motion-weight so PRM (weight 0) yields scale:1 (no squish). */
  --glass-reveal-enter-scale: calc(1 - 0.14 * var(--motion-weight, 1));   /* 0.86 @ 0.55 weight; 1 @ PRM */
  transition-timing-function:
    var(--ease-cartoon-punch), var(--ease-cartoon-punch),   /* scale, translate — the PUNCH */
    var(--ease-out), var(--ease-out), linear, linear;        /* opacity, filter, display, overlay — calm */
  transition-duration:
    var(--ease-cartoon-punch-duration), var(--ease-cartoon-punch-duration),
    var(--spring-snappy-duration), var(--spring-snappy-duration),
    var(--spring-snappy-duration), var(--spring-snappy-duration);
}
```

The punch curve **dips below 0** at the open frame → the menu **recoils a hair back into
the trigger** before launching (anticipation), then **overshoots past 1** (the welling
bloom), then settles soft (ζ<1 give baked into the curve). `transform-origin` already tracks
the popper anchor edge (verified `0 382px`), so the bloom emanates FROM the trigger — exactly
the iOS-27 *welling-open-from-anchor* read. **No JS, no second timer, no `@keyframes`** — one
curve swap on the shared recipe. **The whole reka overlay family (Select, Dropdown, Popover,
Combobox, Context-menu, Hover-popover, the Toast/Notification capsule) inherits in lockstep.**

### 3c. The squish-grow (volume-preserving, optional, the liquid-weight)

For the LIVELY rung the menu can also carry a faint volume-preserving squish on open (wider
than tall at the bloom peak, settling to 1) — but a portalled menu has measured width/height
the squish must not desync from the popper bound. **KISS decision: the scale-punch alone
(3b) delivers the welling.** The squish-grow is left to the `.glass-capsule`/tab register
(where the box is self-measured); the menu's refinement is the **punch curve on the existing
single `scale` channel** — simplest mechanism that hits the bar, no new `useLiquidFlex`
channel, no portal-measure coupling. (Liquid-weight is satisfied by the punch's
anticipation+overshoot — the curve carries the weight.)

### 3d. The trigger ↔ menu coherence (the chevron + the press)

The trigger already rotates its chevron 180° on open (`transition-transform 200ms ease-standard`,
verified) and carries `tap-squish` (press scale). The refinement: the chevron rotation
re-clocks onto `--spring-smooth` (the §6 interactive-transform spring) so it rotates with a
hair of give in sympathy with the menu's punch — ONE token swap, no new motion. The trigger's
`tap-squish` press (anticipation on the gesture) already gives the *click* its weight.

---

## 4. THE ITEM ROWS — warm-glass register + liquid active pill (DRY, the shared seam)

The Item already composes `menuItemVariants({surface:'glass'})` → `.glass-menu-row`
(`menu.css`, verified) — the shared seam ALL 13 menu/picker SFCs inherit. **No re-fork.**
The row reads the element-level warm tint
`color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength))`
— which has the SAME 0%-dormant-tint defect. The fix is DRY: route the row's
`--menu-row-bg` through the SAME `max(--glass-tint-strength, --overlay-tint-floor)` admit-floor
(§2b), so a highlighted/hovered row is a **warm-cream lift**, never a gray plate, even
where the field is faint:

```css
/* menu.css — ONE edit on the existing knob (no new rule) */
.glass-menu-row {
  --menu-row-bg: color-mix(in oklab,
    var(--glass-bg-quiet),
    var(--glass-tint-source) max(var(--glass-tint-strength), var(--overlay-tint-floor)));
}
```

### 4a. The active/hover row — a liquid warm-accent pill (T4-flavored, restrained)

The current hover paints `--menu-row-bg` + a `-1px` translate-lift on `--spring-smooth`
(verified `menu.css:58,71`). The refinement adds **liquid weight + a warm accent** without a
re-fork:

- **Accent admit (opt-in, presets-in-consumers):** the highlighted row admits a hair of the
  consumer `--glass-accent` (the registered `--glass-accent` scalar, verified
  `property-regs.css:178`) into `--menu-row-bg` — `transparent` by default (byte-identical
  rest, provable no-op), so a consumer who sets `--glass-accent` gets a warm-accent
  highlighted row in lockstep with the dock/tab accent language. ONE token, the SAME
  `--glass-accent` the whole BD set reads.
- **Liquid lift:** the `-1px` translate stays, re-clocked onto `--ease-cartoon-punch` at a
  TINY weight (the row is a small element — `--motion-weight × 0.3`) so the lift has a hair
  of overshoot/settle (liquid-weight) without taffy. PRM → 0 (the existing `menu.css:122`
  carve already zeroes the lift; the punch collapses with `--motion-weight: 0`).

### 4b. The selected DOT — warm accent

The selected-row dot (`SelectItem.vue:52`, `--select-dot-color, currentColor`) re-points its
default to the warm accent (`var(--glass-accent, currentColor)`) so the selected font in the
list reads warm-keyed, not flat ink — ONE default change, no structural touch, the dot is
already decorative+aria-hidden (the AN.W4 discipline, verified).

---

## 5. CROSS-ENGINE (Chrome AND Safari) — the §L7 hard floor, by construction

Every channel is **compositor-only + Safari-native** — no `backdrop-filter:url`, no SVG goo,
no WebGL, no trig in any path:

- **Reveal** — `scale`/`translate` longhands on a `linear()` curve: cross-engine identical;
  `linear()` easing is Safari 17.4+ Baseline; on an older engine the curve degrades to its
  endpoints (the menu still scales-in cleanly — never broken).
- **Plate fill** — `color-mix(in oklab, …)` (Safari 16.4+) + `backdrop-filter:
  blur()/saturate()/brightness()` (Safari 9+ with `-webkit-` prefix already shipped). The
  blur samples the field's COMPOSITED output (a normal layer) — the §L1 glass-samples-glass
  trap avoided (field is BEHIND, menu is a forward sibling, no nesting-in-blur).
- **Warm field** — pure `radial`/`conic` gradient + `oklch()` stops + one `transform` drift
  (page-background GOLDEN); zero goo, zero `backdrop-filter:url`. WebKit-native.
- **Accent/tint** — registered `@property` scalars (`--glass-accent`, verified) interpolate
  on both engines; on a gap engine the `initial-value` is the safe rest.
- **The decongest blur-settle** rides the surface's OWN `filter` (verified `reveal.css:77`),
  NOT `backdrop-filter` — so it never clobbers the resting plate blur, and a `filter` radius
  interp is compositor-safe on WebKit.

**Acceptance = paired-engine π** (Chromium + WebKit Playwright projects), both modes, NEVER
`reducedMotion` on the reveal arm. The MEATBALLING fence: the menu carries **ZERO goo** — the
"welling" is a CSS `scale` on the menu's own rounded box, NOT a metaball filter (the
dock-fission goo is a disjoint register this wave never touches).

---

## 6. A11Y / PRM CARVE

- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes the anticipation + overshoot
  + enter-squish (the `calc(1 - 0.14×weight)` enter-scale resolves to **1.0** → no squish, a
  clean fade); the existing `reveal.css:125` PRM block already snaps `scale/translate/filter`
  to none and rides opacity on `--duration-fast`. The menu **fades, never flies** — vestibular-safe.
  The row lift (`menu.css:122`) already zeroes. The warm plate + field are STATIC (content, not
  motion) — they survive PRM fully.
- **`prefers-reduced-transparency`** → the plate falls to the opaque-tier escape via the
  existing `--glass-level` machinery (fill solid, rim+lift survive as legibility anchors); the
  field intensity drops to its `--neutral-0` floor (page-background carve). The warm read
  degrades gracefully to a warm-SOLID, never gray.
- **`prefers-contrast: more`** → the rim + the row admit-floor floor UP (the inked edge + the
  warm lift are legibility assets, not decoration).
- **Focus / roving** — reka's roving-tabindex + `aria-selected`/`data-highlighted` model is
  **UNTOUCHED** (this is a surface+motion layer under the selection engine). The
  `.interactive-item` `focus-visible` ring (verified `menuItemVariants` substrate) stays. The
  44px touch floor (`menu.css:52`, `--touch-target`) stays.
- **Keyboard open** — the reveal fires on the `data-state` flip regardless of pointer-vs-key,
  so a keyboard-opened menu wells identically (no pointer dependence).

---

## 7. THE UNION LEDGER (deft · KISS · DRY — no re-fork, no new component)

| need | reused primitive (verified on disk) | new surface |
|---|---|---|
| open reveal | `.glass-reveal` (`reveal.css`, shared overlay recipe) | **re-clock SPATIAL legs** onto the punch (1 edit) |
| cartoon curve | design.md §L2/§L4 (spec-only) — **depends on tabs GOLDEN mint** | `--ease-cartoon-punch` + `--motion-weight` (MINTED once, shared) |
| menu plate | `glass-floating` + `--glass-bg-floating` six-layer (verified live) | `--overlay-tint-floor` warm-FLOOR admit (per-mode pair) |
| field behind | `.paper-field` + `--field-h` (**page-background GOLDEN dependency**) | none — the chassis mounts it (W-PAGE-FIELD) |
| warm source | `--glass-tint-source` = `light-dark(warm,warm)` (verified — warm both modes) | none — it is ADMITTED, not re-colored |
| item rows | `.glass-menu-row` + `menuItemVariants` (verified, 13 consumers) | route `--menu-row-bg` through the same admit-floor (1 edit) |
| active accent | `--glass-accent` registered scalar (`property-regs.css:178`, verified) | default `transparent` admit on highlight (opt-in) |
| selected dot | `--select-dot-color` (verified `SelectItem.vue:52`) | default → `--glass-accent` |
| collision bound | `select.css` `[data-slot="select-content"]` precompiled (verified) | the warm-floor folds onto this SAME rule |
| trigger chevron | `transition-transform` (verified `SelectTrigger.vue:126`) | re-clock onto `--spring-smooth` (1 token) |
| press | `tap-squish` / `--scale-press` (verified `SelectTrigger.vue`) | none |

**Net-new artefacts: ~4 token decls + 3 one-line recipe edits.** ZERO new components, ZERO
new composables, ZERO new files (the warm-floor lands in the existing `select.css`; the
reveal edit in the existing `reveal.css`; the row edit in the existing `menu.css`). The two
hard dependencies (`--ease-cartoon-punch`/`--motion-weight` from tabs GOLDEN; `.paper-field`/
`--field-h` from page-background GOLDEN) are STATED, not duplicated. The reveal re-clock is a
**family upgrade** — every overlay inherits, so this is the highest-leverage / lowest-surface
shape available.

---

## 8. THE BORN-RED GATE (painted-pixel truth — the cardinal anti-fraud rule)

`tests-visual/select-forms.spec.ts`, **Chromium + WebKit**, both modes, NEVER `reducedMotion`
on the reveal arm. The CRITICAL rule (the recurring fraud caught on glass-material/
page-background/buttons): **sample the COMPOSITED painted pixel of the actual menu over the
actual page — a full-page screenshot → `getImageData` of the menu-surface region — NEVER
`getComputedStyle` composited over a HARDCODED field, NEVER the WebGL canvas (reads
transparent), NEVER a stop-string average.** A born-RED that reports the HONEST gray over the
real flat condition is CORRECT.

| # | assert | born-RED on HEAD (live-measured) | GREEN when |
|---|---|---|---|
| **G1 field-present** | the route mounts a `.paper-field` (or `<Aurora field>`) at z below the portalled menu | **0 fields** | W-PAGE-FIELD mounts the field |
| **G2 menu warm-not-gray (PAINTED)** | the menu-surface region, screenshot → `getImageData`, samples **mean OKLab C ≥ 0.030 warm** (H ∈ [25,95]), both modes | painted plate ~C 0.012 over page C 0.0028 | field admit + warm-floor land |
| **G3 the A/B delta** | the same menu over the REAL field differs measurably from the same menu over a flat plate (the blur has live chromatic input); composited ΔC ≥ 0.015 warm | identical/muddy | field behind + warm admit |
| **G4 dark-warm** | dark-mode menu samples C ≥ 0.030 warm, L in the dark-glow band (NOT charcoal) | C ~0.012 @ L 0.38 over page L 0.146 | dark warm-floor (7%) + dark field |
| **G5 reveal anticipation** | the menu's measured bbox **scale dips below the closed value** (recoil toward the trigger) before launching — a frame-series; a `--motion-weight:0` control shows ZERO pre-dip | the snappy spring has NO pre-dip | the punch curve clocks the SPATIAL legs |
| **G6 reveal overshoot+settle** | the scale **exceeds 1.0** mid-bloom then settles to 1.0 (frame-series); origin tracks the popper anchor (bloom from trigger edge, not center) | spring settles monotonic to 1 (no >1 frame) | the punch curve |
| **G7 origin-aware** | the bloom emanates from the trigger-adjacent edge (transform-origin = popper anchor), measured | already true (keep — guard it) | unchanged |
| **G8 active row warm** | a highlighted row samples warm C ≥ 0.030 (not gray) + a measurable lift; PRM → no lift | gray hover plate at 0% tint | row admit-floor |
| **G9 PRM** | one static frame, scale 1.0, no pre-dip, no overshoot, opacity-only fade; warm plate + field present (content survives) | — | `--motion-weight:0` carve |
| **G10 anti-evasion self-test (≥6 bites)** | the gate FAILS on: a hardcoded inline field; `getComputedStyle` over a fake purple; a `light-dark()` warm-floor (→ none); the reveal with the punch removed (no pre-dip); a teal admit (H 210); a gray menu over a flat page. PASSES only on the real composited warm menu over the real vivid field | — | the self-test bites |

**NO source-green close** — the painted π is the binding truth. The de-risk spike re-runs in
Safari and clears the same warm + reveal-shape floors before build-close.

---

## 9. THE DELTA-ASSAY → wave amendment (reconcile vs the 116-wave set, no dup)

The Select fix is NOT a new standalone wave — it is the **adoption seam** where two goldens
land on the picker family. Reconcile:

| amendment | scope | depends-on (no dup) | gate |
|---|---|---|---|
| **W-SELECT-REVEAL-PUNCH** | re-clock `.glass-reveal` SPATIAL legs onto `--ease-cartoon-punch × --motion-weight`; enter-scale `calc(1-0.14×weight)`; chevron → `--spring-smooth`. A **family upgrade** (all reka overlays inherit) | `BD.W-CARTOON-PUNCH` (mint) — the tabs GOLDEN's substrate | G5 G6 G7 G9 |
| **W-OVERLAY-WARM-FLOOR** | `--overlay-tint-floor` per-mode pair; `max(--glass-tint-strength, floor)` admit on the shared overlay-content seam (Select/Dropdown/Popover) + the `.glass-menu-row` `--menu-row-bg`; `--glass-accent` active-row admit; dot → accent | — (self-contained) | G2 G4 G8 |
| **W-SELECT-FIELD-ADOPT** | confirm the portalled menu samples the mounted `.paper-field`; no Select-side build | `BD.W-PAGE-FIELD` (page-background GOLDEN) — the field mount + `--field-h: 48` for forms | G1 G3 |
| **proof:select-forms** | NEW `tests-visual/select-forms.spec.ts` — the painted-pixel born-RED gate (§8) + the ≥6 anti-evasion bites + the paired-engine reveal frame-series | — | all |

**RECONCILE / DEDUP:**
- The reveal re-clock **subsumes** any per-overlay "smoother open" ask (Dropdown/Popover/
  Combobox/Context-menu) — they all compose `.glass-reveal`, so ONE wave upgrades the family.
  Do **not** mint per-component reveal waves.
- The warm-floor **unifies** with `BD.W-NO-GRAY` / W55 / the dock-search admit — it is the
  SAME `color-mix toward --glass-tint-source` seam, generalized to the overlay family via ONE
  `--overlay-tint-floor` token. Do **not** fork a menu-only tint.
- The field dependency **points at** `.paper-field` / `--field-h` (page-background GOLDEN) —
  the Select is a CONSUMER of the one shared field primitive, never a per-route field fork.
- `--ease-cartoon-punch` / `--motion-weight` are **DEPENDED** from `BD.W-CARTOON-PUNCH` (tabs
  GOLDEN), never re-minted (the phantom-mint must happen ONCE, Band-0).

**HELD / FROZEN (the union law):** the reka selection engine (roving/`aria-selected`/
`data-highlighted`) byte-untouched; the six-layer plate composite untouched (only the FILL
admit changes); the collision-bound `select.css` rule untouched (the floor folds onto it); the
EFFECTS legs of the reveal (opacity/filter) stay on `--ease-out` (no overshoot on a fade);
`--neutral-0` stays the KEEP-NEUTRAL floor. **No legacy, no alias, no dual path.**

---

## 10. GESTALT — THE BAR (live-judge AS A USER, both modes, both engines)

Open `/forms/select`, REAL click the trigger, BOTH modes, BOTH engines, fresh paint. PASS iff:

1. **The menu WELLS open from the trigger edge** — a hair of recoil (anticipation), a bloom
   past settle, a soft land; liquid-weight, refined — NOT a flat damped pop. Today: a smooth
   but un-weighted snappy scale (fit, un-refined).
2. **The menu reads WARM GLASS, never gray** — a warm-cream transmissive plate that BENDS the
   vivid warm field behind it; mean C ≥ 0.030 warm, both modes. Today: NO — gray plate (C 0.012)
   over a flat charcoal page (C 0.0028).
3. **The highlighted row is a warm-accent liquid lift** — warm-cream (or accent-keyed) pill
   with a hint of overshoot on the lift, never a gray flat fill.
4. **The selected dot reads warm-keyed**, the trigger chevron rotates with a hair of give in
   sympathy.
5. **Dark mode is warm-luminous** — the menu GLOWS warm, never charcoal-gray.
6. **The reveal is identical Chrome↔Safari** — same welling, same warm, compositor-only.
7. **PRM** — the menu fades cleanly (no fly), warm plate + field present (content survives).
8. **No-legacy / DRY** — re-clocks ONE shared reveal recipe, admits the warm source via ONE
   shared floor token, consumes ONE shared field; zero new component, zero fork. "Make the
   Select smooth + warm" = a curve swap + an admit-floor + a field dependency.

The §3 colorful-field-behind-glass + the welling-open punch are the two halves of the iOS-27
bar; this wave WIRES the already-built goldens onto the picker family and refines the reveal —
the maximal result from the minimal, deftly-integrated surface.
