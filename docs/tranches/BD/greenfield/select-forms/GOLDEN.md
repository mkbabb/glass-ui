# SELECT (forms) — GOLDEN: the WELLING WARM-GLASS LISTBOX that POURS

> The canonical reference for the Select (Trigger → portalled Content listbox → Item rows)
> + the shared `menu.css` register + the open/reveal. Synthesized from lens-a (the welling
> warm-glass / portal-field), lens-b (the perf-first family upgrade / `--overlay-tint-floor`),
> lens-c (the audacious 1940s-technicolor POUR). Every token/composable/file was grepped on
> disk; the born-RED is **live-measured** and reconciled across all three lenses. TRANCHE-DEV
> only — no `src/` paint here; the spike is `golden/spike.html`.

---

## 0. THE RECONCILED BORN-RED (all three lenses measured the SAME truth, both modes)

Live `/forms/select`, REAL click to open the portal, chrome-devtools, `getComputedStyle` +
the **honest composite of the live menu rgba over the live `elementFromPoint` backdrop pixel**
(NOT `getComputedStyle` over a hardcoded field — the recurring fraud, fenced):

| probe | LIGHT (live) | DARK (live) | verdict |
|---|---|---|---|
| page pixel BEHIND the menu | `rgb(251,250,248)` · **C 0.0029** | `rgb(11,10,9)` · **C 0.0028** | flat — `--field-h` UNSET, nothing to transmit (§3 root #1) |
| menu fill (`--glass-bg-floating`) | `oklab(0.936 .0056 .0133/.808)` | `oklab(0.379 .0099 .0169/.894)` | warm-HUE, near-gray chroma |
| `--glass-tint-strength` (resolved) | **4% floor** (calm) | 12% floor | dormant — the floating recipe is near-gray AT REST (§3 root #2) |
| **COMPOSITED menu over real page** | rgb`[243,236,229]` · **L .946 · C 0.0122** | `[68,58,51]` · L .357 · **C 0.018** | **reads GRAY** — both below the 0.02 warm-floor |
| highlighted row (composited) | ΔL **0.016** · ΔC **0.001** vs plate | ~same | **invisible** — no warm-accent event |
| reveal | `.glass-reveal`: scale 0.88→1 on `--spring-snappy` (+3.2% overshoot) @ 0.4s, blur 4→0, origin `0 382px` (trigger edge) | same | REAL + smooth — but un-weighted, no anticipation |
| chevron | `transition-transform 200ms ease-standard` rotate 180° | same | **UNCOUPLED** — flat 200ms fork vs the 400ms spring panel |
| item entrance | **NONE** — rows materialize as one rigid slab | same | no overlapping action — the biggest "stiff" tell |
| `--ease-cartoon-punch` / `--motion-weight` | **UNSET** (grep 0 in `src/styles`) | — | phantoms (Band-0 mint prerequisite) |

**The select is NOT broken — it is STARVED + UNCOUPLED.** The reveal recipe is fit; the
material is dormant; the gesture is two clocks; the rows are a slab. Born-RED is genuine and
honest: the screenshot reads three identical cream luminances over a flat page. This GOLDEN is
an **AUGMENT + COUPLE + POUR**, never a rebuild.

---

## 1. THE GOLDEN IDEA (one sentence)

The Select menu is a **warm-glass liquid that WELLS up from the trigger lip on a weighted,
coupled gesture and POURS its rows down with overlapping action** — it reads warm transmissive
glass (never gray) because the portal carries its route's own warm field AND the floating tier
admits a warm floor; the chevron + bloom move as ONE liquid event; the rows cascade in top-to-
bottom on an arc; the selected row lands last as the ONE warm-accent hot lozenge — every channel
compositor-only + Safari-native, every primitive a UNION with the shipped ecosystem (zero new
component, zero fork).

### The four moves (one from each lens's strongest, reconciled)

1. **MATERIAL — un-gray by a TWO-LAYER guarantee (lens-b's floor × lens-a's portal-field).**
   The portal-gray hole is structurally closed by (a) a **bounded warm admit-FLOOR**
   (`--overlay-tint-floor`) on the shared overlay-content seam so the plate is warm-cream *even
   over a flat page* (the floor — lens-b/c), AND (b) the SelectPortal **carrying its route's
   `--field-h`** so the menu's `backdrop-filter` finally transmits a live warm field (the
   amplifier — lens-a/b/c). Floor = the guarantee; field = the song. Neither is a re-tint.

2. **MOTION — the WEIGHTED, COUPLED welling (lens-b's family re-clock × lens-a's couple).**
   The `.glass-reveal` SPATIAL legs re-clock onto `--ease-cartoon-punch × --motion-weight` (a
   **family upgrade** — every reka overlay inherits anticipation + overshoot from ONE edit), the
   EFFECTS legs (opacity/blur) STAY on `--ease-out` (a fade never overshoots). The chevron joins
   the SAME spring clock (kill the 200ms fork) so trigger + panel are ONE gesture. Origin already
   tracks the trigger edge.

3. **POUR — the overlapping-action row cascade (lens-c's single boldest move).**
   The rows do NOT arrive with the slab — they **cascade top-to-bottom on an arc**, driven by
   ONE registered `--menu-pour-t` scalar windowed per row (zero per-row JS), the active row
   landing last with the accent splash. PRM collapses the pour to the clean opacity fade.

4. **INTERACTION — the ONE warm-accent event (all three convergent).**
   The highlighted/selected row paints the `--glass-accent` warm chip (the SAME registered axis
   cards/tabs read), bounded so it READS hot-but-warm (ΔC ≥ 0.02 / ΔL ≥ 0.05), the selected dot
   keys to the accent, the lift deepens to a real glass-press. The neutral `--accent` default is
   the no-legacy break — the menu accent is the chromatic `--glass-accent`, not gray `--accent`.

### The single boldest move — THE POUR over a WARM-FIELD PORTAL

The menu does not *appear as a slab* — it **wells out of the trigger's mouth and POURS its rows
down** (overlapping action, arcs, follow-through), over a portal that **carries its own warm
field** so the gray disease is structurally impossible the way the six-layer recipe makes a flat
plate impossible. The pour is the 1940s-technicolor FLOW & PUNCH; the portal-field is the §3
colorful-field-behind-glass — both REAL on painted pixels, sampled over the real flat condition.

---

## 2. THE MATERIAL LAYER — un-gray (the §3 fix: FLOOR × FIELD, never a re-tint)

### 2a. The warm admit-FLOOR (lens-b/c — the guarantee, holds even over a flat page)

The floating recipe is near-gray AT REST because `--glass-tint-strength` floors at 4% (light) /
12% (dark) — even pointed at the warm `--glass-tint-source` it barely tints. A **bounded warm
admit-floor** on the shared overlay-content seam lifts the menu plate to warm-cream regardless of
backdrop. This RIDES the EXISTING `--glass-bg-floating-tinted` seam (`surfaces.css:283`), widened
to include the overlay family:

```css
/* src/styles/glass/surfaces.css — widen the shipped :where() seam (DRY, no fork) */
:where(.btn-glass, .segmented-indicator,
       [data-slot="select-content"],
       [data-slot="dropdown-menu-content"],
       [data-slot="popover-content"]) {
  --glass-bg-floating-tinted: color-mix(in oklab,
    var(--glass-bg-floating),
    var(--glass-tint-source) max(var(--glass-tint-strength), var(--overlay-tint-floor)));
}
```

`--overlay-tint-floor` is a **PLAIN per-mode pair** (NEVER a `light-dark()` fragment — the binding
inset-shadow trap):

```css
/* tokens/glass.css (light) */   --overlay-tint-floor: 6%;   /* lifts composited C ≥ 0.02 over flat */
/* tokens/dark-arm.css (dark) */ --overlay-tint-floor: 8%;   /* dark needs more warm-lift */
```

`max(--glass-tint-strength, --overlay-tint-floor)` is a FLOOR not a clamp — a consumer who raises
the global W55 bright-bucket strength still wins. The SelectContent then reads the tinted fill:
`surfaceClass(surface,'floating')` already routes to the floating tier; the **menu surface reads
`--glass-bg-floating-tinted`** (the element-level adaptive seam) instead of the raw token — ONE
declaration on the `[data-slot="select-content"]` rule in `select.css`. The six-layer composite
(rim-top / rim-bottom / shadow-floating / blur) is UNTOUCHED — only the FILL admit changes.

> Why floor the *floating band* not the global token: the content tiers (`.glass-card`) share
> `--glass-tint-strength`; a global bump over-warms a calm card on a light page. The floating /
> overlay band is the band that "floats over an UNKNOWN surface" — exactly the band that must
> self-warm. The floor is floating-band-scoped (lens-c's correct fence).

### 2b. The portal-local warm FIELD (lens-a/b/c — the amplifier, route identity)

The menu portals to `<body>`, OUTSIDE the route's field. Two-layer close:

- **DEPEND on the page-background GOLDEN** (`.paper-field` + `--field-h` per route, `FIELD_SCRIPT.forms = 48` terracotta-warm). The chassis mounts `<PaperBackdrop field palette>` at `AppShell.vue`; the portalled menu's `backdrop-filter: blur(13px) saturate(1.6)` then samples the **composited warm field output** (a normal painted layer BEHIND, never another `backdrop-filter` — the §L1 "glass cannot sample glass" trap avoided by construction).
- **RE-EMIT `--field-h` onto the portal root** (lens-a's structural close) so the menu transmits its route's identity *even if the page field is faint behind the body plate*. The SelectPortal root sets `data-field-palette` (re-emitted from the route's category) → a clipped, menu-local `.glass-field-portal::before` paints the SAME 3-stop warm spine the route declares, `-z-1` under the SelectContent. So a forms dropdown and a feedback dropdown read as **different warm glass**, both transmissive, neither gray:

```css
/* src/styles/menu.css — the portal field (shared register; DRY with .paper-field spine) */
@layer components {
  .glass-field-portal::before {
    content: ""; position: absolute; inset: -20%; pointer-events: none;
    z-index: -1; border-radius: inherit;
    background:
      radial-gradient(70% 60% at 24% 22%, oklch(0.92 0.08 var(--field-h, 48) / 0.55), transparent 72%),
      radial-gradient(64% 58% at 82% 80%, oklch(0.88 0.07 calc(var(--field-h, 48) + 18) / 0.50), transparent 70%),
      radial-gradient(60% 62% at 60% 40%, oklch(0.90 0.06 calc(var(--field-h, 48) - 14) / 0.48), transparent 74%);
    /* STATIC — a 380px dropdown over <1s of life needs no drift; the field exists to give
       the blur chroma to bend, not to animate. Compositor-cheap. */
  }
}
@supports not (color: oklch(0.9 0.08 48)) {
  .glass-field-portal::before { background:
    radial-gradient(70% 60% at 24% 22%, hsl(var(--field-h,48) 60% 88% / 0.5), transparent 72%); }
}
```

The floor (2a) holds when the field is faint; the field (2b) makes it sing. Both REAL decls.

### 2c. The trigger defined-edge + hover glass (the cream-on-cream melt)

The trigger's 5%α border melts cream-on-cream. The fix is the glass-material GOLDEN's
`--glass-edge-floor` (the control-tier rim floor) — NOT a select-private border — and the trigger
composes the tabs GOLDEN's **`.glass-capsule-hover`** at rest/hover so it lifts a hint of glass on
hover (the "ready to open" read), currently a flat cream pill. Over the §2b field the edge is
trivially cut; the floor is the flat-page insurance.

### 2d. The cartoon under-shadow + paper grain (lens-c — the technicolor weight)

The menu drops `--shadow-cartoon-lg` (shipped, `shadow.css:98`, dark-arm white-on-dark) UNDER its
existing soft elevation shadow — a bold layered-offset 2nd shadow so the panel reads as a physical
card lifted off the page (both modes). A sub-perceptual `--paper-grain` overlay gives the cream
TOOTH (the PAPER-morphism binding law, composed not re-authored). Both static, PRM-immune.

---

## 3. THE MOTION LAYER — the WEIGHTED, COUPLED welling

### 3a. DEPEND on the cartoon-punch mint (Band-0, motion-spring-register GOLDEN)

`--ease-cartoon-punch` + `--motion-weight` are phantoms (grep 0). The motion-spring-register
GOLDEN mints them (`--motion-weight: 0.618` 1/φ default; `--ease-cartoon-punch` a SHAPED `linear()`
dipping <0 for anticipation, peaking >1.1 for punch). This GOLDEN **DEPENDS, never re-mints.** It
RIDES the extant `--spring-snappy` for the resting default so it is **not blocked** on the mint —
the punch is the calibrated upgrade once the token lands.

### 3b. Re-clock `.glass-reveal` SPATIAL legs (lens-b — the family upgrade, ONE edit)

`reveal.css` clocks scale/translate on `--spring-snappy`. Refine the SPATIAL legs onto the punch
scaled by `--motion-weight`; EFFECTS legs (opacity, filter blur-settle) STAY on `--ease-out` (the
SPATIAL/EFFECTS split preserved — a fade must never overshoot):

```css
.glass-reveal {
  /* bloom from a clearer squish so the welling reads; lerps to 1 by weight → PRM (weight 0) = scale:1 */
  --glass-reveal-enter-scale: calc(1 - 0.14 * var(--motion-weight, 1));   /* 0.866 @ 0.618; 1 @ PRM */
  transition-timing-function:
    var(--ease-cartoon-punch), var(--ease-cartoon-punch),   /* scale, translate — the PUNCH */
    var(--ease-out), var(--ease-out), linear, linear;        /* opacity, filter, display, overlay — calm */
  transition-duration:
    var(--spring-snappy-duration), var(--spring-snappy-duration),  /* 0.4s — keep the snappy clock */
    var(--spring-snappy-duration), var(--spring-snappy-duration),
    var(--spring-snappy-duration), var(--spring-snappy-duration);
}
```

The punch curve dips <0 at open → the menu recoils a hair back into the trigger (anticipation),
then overshoots >1 (the welling bloom), then settles soft. `transform-origin` already tracks the
popper anchor (`0 382px`), so the bloom emanates FROM the trigger lip — the iOS-27 *welling-from-
anchor* read. No JS, no second timer, no `@keyframes`. The WHOLE reka overlay family (Select,
Dropdown, Popover, Combobox, Context, Hover, Toast) inherits in lockstep — maximal leverage,
minimal surface. (lens-a/c's anisotropic-squish-via-`useLiquidFlex` is DROPPED for the menu: a
portalled box has popper-measured width/height the squish would desync from — KISS, the punch
curve on the single `scale` channel carries the weight. The squish stays the `.glass-capsule` /
self-measured-box register.)

### 3c. Couple the chevron to the panel's spring (lens-a — kill the flat fork)

```html
<!-- was: transition-transform duration-200 ease-standard -->
<ChevronDown class="[transition:rotate_var(--spring-snappy-duration)_var(--ease-cartoon-punch)]
                    [&[data-state=open]]:rotate-180 …" />
```

The arrow rotates on the panel's clock + curve — one gesture, two halves moving together. The
`rotate` longhand (not `transform`) so it composes with the chevron's other transforms.

### 3d. Anticipation on the trigger (lens-c — the press-squish IS the wind-up)

The trigger already carries `tap-squish` (press scale). Sequenced so the press-squish settles INTO
the open (not fighting it), it reads as the liquid gathering before the pour — zero new tokens.
PRM → none.

---

## 4. THE POUR — overlapping-action row cascade (lens-c, the single boldest move)

The rows POUR in top-to-bottom, each a beat after the one above, on an arc with a follow-through
sloosh — the menu reads as liquid FILLING, not flashing. ONE driven scalar, N windowed per-row
reads, zero per-row JS:

```css
/* tokens/property-regs.css — the driven pour scalar (the --progress / --glass-accent precedent) */
@property --menu-pour-t { syntax: "<number>"; inherits: true; initial-value: 1; }

/* menu.css — each row reads its OWN window off --menu-pour-t × its index */
.glass-menu-row {
  /* --menu-row-index set by the viewport (or a nth-child --i fallback for the zero-JS floor) */
  --row-progress: clamp(0, calc((var(--menu-pour-t) - var(--menu-row-index, 0) * 0.06) / 0.5), 1);
  opacity: var(--row-progress);
  translate: 0 calc((1 - var(--row-progress)) * -0.4rem);   /* the arc — drops in from above */
  scale: calc(1 + 0.03 * var(--row-progress) * (1 - var(--row-progress)));  /* a micro settle-pop */
}
```

`--menu-pour-t` is driven 0→1 by the reveal clock (a `[data-state=open]` transition on the
registered scalar — imperative-vs-interpolated discipline, NOT a transition list per row). The
stagger `step` (0.06) is φ-proportioned to the row count so the cascade reads as ONE flowing event
(~total ≤ the reveal clock), never a slow drip. The active row lands LAST with the accent splash
(§5). **PRM → the whole pour collapses to the opacity-only fade** (`--menu-pour-t` snaps, the arc
+ pop zero — the `.glass-reveal` PRM precedent). If a shared `useStaggerReveal` projection is
warranted it is factored ONCE for menu + tabs + dock-tab, never per-component.

---

## 5. THE INTERACTION LAYER — the ONE warm-accent hot lozenge

The highlight is gray because `--accent: var(--neutral-3)` and the row paints `--menu-row-bg` off
`--glass-bg-quiet` (neutral). The highlighted/selected row paints the `--glass-accent` warm chip
(the registered per-instance chromatic axis, `property-regs.css:178`, default `transparent` = a
provable rest no-op):

```css
.glass-menu-row[data-highlighted]:not([data-disabled]),
.glass-menu-row[aria-selected="true"] {
  background: color-mix(in oklab, var(--menu-row-bg),
              var(--glass-accent) var(--menu-row-accent-strength, 14%));
  translate: 0 var(--menu-row-lift);            /* the liquid lift (extant), deepened */
  scale: 1.02;                                  /* the splash squash-pop, settling to 1 */
  box-shadow: var(--glass-rim-top);             /* a catch-light cut on the active chip */
}
```

`--menu-row-accent-strength` ~14% (the iOS hot-pill warmed to house amber — a HUE EVENT, not a
saturated flood; the §L5 legibility fence keeps `--accent-foreground` AA over it). The selected
DOT (`--select-dot-color`) re-points its default to `var(--glass-accent, currentColor)` + a micro
scale-pop — so the selected dot + chip read as one warm event. The dot stays `aria-hidden`
decorative; the a11y selected state is reka's `aria-selected` (untouched). All on `.glass-menu-row`
/ `menuItemVariants` — the SHARED row, all 13 menu/picker SFCs inherit in ONE edit (DRY).

---

## 6. THE EXACT MECHANISM — files, tokens, recipes (the integration map)

| concern | mechanism | file | reuse / new |
|---|---|---|---|
| warm admit-floor | widen `--glass-bg-floating-tinted` `:where()` + `--overlay-tint-floor` per-mode pair | `glass/surfaces.css`, `tokens/glass.css`, `tokens/dark-arm.css` | AUGMENT shipped seam + ~2 token decls |
| menu reads tinted fill | `[data-slot=select-content]` bg → `--glass-bg-floating-tinted` | `select.css` | 1 decl on shipped rule |
| portal field | `.glass-field-portal::before` + `data-field-palette` re-emit | `menu.css` + `SelectContent.vue` portal root | NEW recipe (1) + 1 attr |
| field dependency | `.paper-field` / `--field-h: 48` mounted by chassis | page-background GOLDEN | DEPEND (no build) |
| trigger edge + hover | `--glass-edge-floor` + `.glass-capsule-hover` | glass-material + tabs GOLDEN | DEPEND |
| cartoon shadow + grain | `--shadow-cartoon-lg` + `--paper-grain` | shipped tokens | COMPOSE |
| reveal re-clock | SPATIAL legs → `--ease-cartoon-punch × --motion-weight`; enter-scale `calc(1-0.14×weight)` | `glass/reveal.css` | RE-CLOCK shared recipe (family upgrade) |
| cartoon-punch mint | `--ease-cartoon-punch` + `--motion-weight` | motion-spring-register GOLDEN | DEPEND (no re-mint) |
| chevron couple | `transition:rotate var(--spring-snappy-duration) var(--ease-cartoon-punch)` | `SelectTrigger.vue` | 1 class swap |
| the POUR | `@property --menu-pour-t` + per-row windowed read | `tokens/property-regs.css` + `menu.css` | NEW scalar + 1 row leg |
| warm-accent chip | `--glass-accent` admit on `[data-highlighted]`/`[aria-selected]` | `menu.css` | AUGMENT shared row |
| selected dot accent | `--select-dot-color` default → `--glass-accent` | `SelectItem.vue` | 1 default change |
| reka selection engine | roving / `aria-selected` / `data-highlighted` | reka-ui | FROZEN (byte-untouched) |

**Net-new src artefacts:** the `.glass-field-portal` recipe + `@property --menu-pour-t` + the
warm-accent chip leg + the per-row pour leg on `.glass-menu-row` + the `--overlay-tint-floor` pair
+ the reveal re-clock + the chevron swap. Everything else is a re-point of a shipped or sibling-
GOLDEN seam. ZERO new component, ZERO new composable, ZERO fork. The select becomes the **reference
consumer** of the field + menu + capsule + accent + reveal union.

---

## 7. CROSS-ENGINE (Chrome AND Safari) + a11y / PRM

**Cross-engine — every channel compositor-only + Safari-native, by construction:**
- **Reveal / pour** — `scale`/`translate`/`filter: blur()`/`opacity` longhands on `linear()` curves: Safari 17.4+ Baseline; older engines degrade to endpoints (clean fade, never broken).
- **Chevron** — `rotate` on the punch `linear()`: cross-engine.
- **Portal field** — pure `radial-gradient` + `oklch()`: native both engines; `@supports not (color: oklch())` → `hsl()` honest-degraded arm.
- **Menu transmission** — `backdrop-filter: blur() saturate()` sampling the field's COMPOSITED output (a normal painted `::before` BEHIND, carrying NO filter) → the "glass cannot sample glass" trap avoided by construction. **NO `backdrop-filter: url()`.**
- **Accent chip / floor** — `color-mix(in oklab)` (Safari 16.4+) + `box-shadow`: Safari-safe.
- **`@property --menu-pour-t` / `--menu-row-index`** — Safari 16.4+; the `nth-child`-derived `--i` zero-JS floor covers registration-absent; absent BOTH, the menu reveals as the un-staggered slab (graceful, today's behavior).
- **MEATBALLING fence** — the menu carries ZERO goo; the "welling" is a CSS `scale` on the menu's own rounded box, NOT a metaball filter (the dock-fission goo is a disjoint register this GOLDEN never touches). No naive ellipsoids — N/A.
- Acceptance = **paired-engine π** (chromium + webkit), both modes, NEVER reducedMotion on the reveal/pour arm.

**a11y / PRM carve:**
- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes anticipation + overshoot + the enter-squish (enter-scale resolves to 1.0 → clean fade) + the pour (snaps to opacity-only) + the row lift + the accent splash-pop. The warm field + floor + accent chip + edge + cartoon shadow REMAIN (color/static, not motion — un-gray and selection-legibility need no motion). The menu FADES, never flies — vestibular-safe.
- **Roving / focus** → reka owns the listbox roving; the accent chip + dot + pour read the SAME `data-highlighted` / `aria-selected` the keyboard drives. Keyboard-opened menu wells + pours identically (data-state driven, not pointer-bound). The `.interactive-item` focus-visible ring stays.
- **`prefers-contrast: more`** → the edge floor + accent-chip strength floor UP (legibility assets); `--accent-foreground` holds AA over the warm chip.
- **`prefers-reduced-transparency`** → the menu falls to the opaque tier (`--glass-level` machinery); the portal field + floor stay (paint, not transparency) so the opaque escape reads warm-over-chromatic, never gray. The accent chip survives solid.
- **Tap target** — the row's `min-block-size: max(2rem, var(--touch-target))` 44px floor (live) holds.

---

## 8. THE ACCEPTANCE BAR (gestalt — live-judge AS A USER, both modes, both engines)

Open `/forms/select`, REAL click the trigger, BOTH modes, BOTH engines, fresh paint. PASS iff:
1. The menu **WELLS open from the trigger edge** — a hair of recoil (anticipation), a bloom past settle, a soft land; liquid-weight, refined — NOT a flat damped pop.
2. The chevron + panel move as **ONE liquid gesture** (settle within ±1 frame, not a 200ms desync).
3. The rows **POUR in** top-to-bottom on an arc (overlapping action) — the menu FILLS, not flashes; the active row lands last with a warm splash.
4. The menu reads **WARM GLASS, never gray** — a warm-cream transmissive plate bending a vivid warm route-identity field (forms = terracotta h48); composited C ≥ 0.02 warm, both modes; spatial luminance variance > floor (the field gives real structure).
5. The highlighted/selected row is a **warm-accent hot lozenge** — ΔC ≥ 0.02 / ΔL ≥ 0.05 vs the plate, with a real glass lift; the dot keys warm.
6. **Dark mode is warm-luminous** — the menu GLOWS warm, never charcoal-gray.
7. **Identical Chrome↔Safari** — same welling, same warm, same pour, compositor-only.
8. **PRM** — the menu fades cleanly (no fly, no pour), warm plate + field + accent present (content survives).
9. **No-legacy / DRY** — re-clocks ONE shared reveal recipe, admits warm via ONE shared floor + ONE shared field, the pour is ONE driven scalar, the accent is ONE shared axis; zero new component, zero fork.

---

## 9. THE BORN-RED GATE (painted-pixel truth — the cardinal anti-fraud rule)

`tests-visual/select-forms.spec.ts`, **chromium + webkit**, both modes, NEVER reducedMotion on the
reveal/pour arm. THE CARDINAL RULE: **sample the COMPOSITED painted pixel of the actual menu over
the actual page** — full-page screenshot → `getImageData` of the menu region — NEVER
`getComputedStyle` composited over a HARDCODED field, NEVER a stop-string average. A born-RED that
reports the HONEST gray over the real flat condition is CORRECT.

| # | assert | born-RED on HEAD (live) | GREEN when |
|---|---|---|---|
| G1 field-present | the route mounts a `.paper-field` (or `<Aurora field>`) at z below the portalled menu | **0 fields** | page-background field mounts |
| G2 menu warm-not-gray (PAINTED) | menu region, screenshot → `getImageData`, **mean OKLab C ≥ 0.02 warm** (H ∈ [16,110]) + spatial L-variance > floor, both modes | C 0.0122 / var≈0 (three identical creams) | floor + field land |
| G3 the A/B delta | the SAME menu over the REAL field differs measurably from over a flat plate (composited ΔC ≥ 0.015 warm) | identical/muddy | field behind + warm admit |
| G4 dark-warm | dark menu C ≥ 0.02 warm, L in the dark-glow band (NOT charcoal) | C 0.018 @ L 0.357 over page L 0.146 | dark floor (8%) + dark field |
| G5 reveal anticipation | menu bbox scale **dips below closed** (recoil) before launch — frame-series; `--motion-weight:0` control shows ZERO pre-dip | snappy spring has NO pre-dip | the punch clocks SPATIAL |
| G6 reveal overshoot+settle | scale **exceeds 1.0** mid-bloom then settles to 1.0; origin = popper anchor (bloom from edge, not center) | settles monotonic to 1 | the punch curve |
| G7 chevron couple | chevron `rotate` + panel scale settle within **±1 frame** | chevron 200ms vs panel 400ms — measurable desync | chevron → spring clock |
| G8 the POUR | rows' opacity/translate **stagger top-to-bottom** (row N begins after row N-1, frame-series); `--motion-weight:0` control shows simultaneous fade | all rows materialize as one slab | the `--menu-pour-t` windowed read |
| G9 warm-accent chip | highlighted/selected row composited **ΔC ≥ 0.02 / ΔL ≥ 0.05** vs plate, hue at `--glass-accent` warm | ΔC 0.001 / ΔL 0.016, neutral | the accent chip leg |
| G10 trigger-edge | trigger rim contrast over its OWN plate clears `--glass-edge-floor` | 5%α whisper | the edge floor |
| G11 PRM | one static frame: scale 1.0, no pre-dip, no overshoot, no pour, opacity-only fade; warm plate + field + accent present | — | `--motion-weight:0` carve |
| G12 anti-evasion self-test (≥6 bites) | the gate FAILS on: a hardcoded inline field; `getComputedStyle` over a fake purple; a `light-dark()` warm-floor (→ none); the reveal with the punch removed (no pre-dip); the pour removed (slab); a re-tint of `menu.css` instead of floor+field (passes chroma but FAILS the variance + A/B arms); a neutral `--accent` chip; a teal admit (H 210); the portal field as a 2nd backdrop-filter (glass-on-glass). PASSES only on the real composited warm menu over the real vivid field | — | the self-test bites |

**NO source-green close** — the painted π is the binding truth. The de-risk spike (`golden/spike.html`)
re-runs in Safari and clears the same warm + reveal-shape + pour floors before build-close.

---

## 10. THE DELTA-ASSAY → wave amendments (reconcile vs the 116-wave set; NO dup)

An **AUGMENT + COUPLE + POUR**, not a new component wave:

| amendment | scope | depends-on (no dup) | gate |
|---|---|---|---|
| **W-OVERLAY-WARM-FLOOR** | `--overlay-tint-floor` per-mode pair; widen `--glass-bg-floating-tinted` `:where()` to the overlay family; menu reads the tinted fill; the `--glass-accent` warm-accent chip + dot on `.glass-menu-row` (the SHARED row — all 13 SFCs inherit) | — (self-contained) | G2 G4 G9 G10 |
| **W-SELECT-PORTAL-FIELD** | `.glass-field-portal` recipe + `data-field-palette` re-emit on the SelectPortal root | `BD.W-PAGE-FIELD` (`.paper-field`/`--field-h:48`) | G1 G3 |
| **W-SELECT-REVEAL-PUNCH** | re-clock `.glass-reveal` SPATIAL legs → `--ease-cartoon-punch × --motion-weight`; enter-scale `calc(1-0.14×weight)`; chevron → spring clock. A **family upgrade** (all reka overlays inherit) | `BD.W-CARTOON-PUNCH` (motion-spring mint) | G5 G6 G7 G11 |
| **W-MENU-POUR** | `@property --menu-pour-t` + the per-row windowed cascade on `.glass-menu-row` (shared; opt-in via the viewport `--menu-row-index`) | `BD.W-MOTION-WEIGHT` | G8 G11 |
| **proof:select-forms** | NEW `tests-visual/select-forms.spec.ts` — the painted-pixel born-RED gate (§9) + the ≥6 anti-evasion bites + the paired-engine reveal/pour frame-series | — | all |

**RECONCILE / DEDUP:**
- The reveal re-clock **subsumes** any per-overlay "smoother open" ask (Dropdown/Popover/Combobox/Context) — all compose `.glass-reveal`; ONE wave upgrades the family. Do NOT mint per-component reveal waves.
- The warm-floor **unifies** with `BA.W-NO-GRAY` / W55 / the dock-search admit — the SAME `color-mix toward --glass-tint-source` seam generalized to the overlay family via ONE `--overlay-tint-floor`. Do NOT fork a menu-only tint.
- The field **points at** `.paper-field` / `--field-h` (page-background GOLDEN) — the Select is a CONSUMER of the one shared field, never a per-route fork. The portal-field re-emit is the structural close of the portal-gray hole page-background names but cannot reach (it stops at the route root; the portal escapes to `<body>`).
- `--ease-cartoon-punch` / `--motion-weight` are **DEPENDED** from the motion-spring-register GOLDEN — the phantom mint happens ONCE (Band-0), never here.
- The POUR **cross-links** the tabs GOLDEN's `--tab-flood-t` glyph-pop family (the same registered-scalar discipline) — if a shared `useStaggerReveal` is warranted it is factored ONCE for menu + tabs + dock-tab.

**Band-0 PREREQUISITES (land FIRST):** `--ease-cartoon-punch` + `--motion-weight` (motion-spring);
`.paper-field` / `--field-h` (page-background); `.glass-capsule-hover` (tabs); `--glass-edge-floor`
(glass-material). This GOLDEN RIDES the extant `--spring-snappy` for the default so it is **not
blocked** on the mint — the punch + pour are the calibrated upgrade once Band-0 lands.

**HELD / FROZEN (the union law):** the reka selection engine (roving / `aria-selected` /
`data-highlighted`) byte-untouched; the six-layer plate composite untouched (only the FILL admit
changes); the collision-bound `select.css` `max-height` rule untouched (the floor + pour fold onto
the SAME `[data-slot=select-content]` rule); the EFFECTS legs of the reveal stay on `--ease-out`;
`--neutral-0` / `--accent` stay the KEEP-NEUTRAL floor (the menu accent reads `--glass-accent`, the
chromatic axis, NOT the neutral `--accent`). **No legacy, no alias, no dual path.**
