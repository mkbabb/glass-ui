# OVERLAYS — GOLDEN: ONE floating-glass register, ONE `--stage-t` spine, the CARTOON welling

> The canonical reference for the OVERLAY family — **Sheet · Drawer(+detent) · Dialog ·
> Popover · DropdownMenu · Tooltip · HoverCard · ContextMenu · Command**. ONE warm-glass
> floating surface, ONE origin-anchored reveal, ONE staging scalar that the whole modal
> band shares, ONE trigger register. Synthesized from lens-a (pure iOS-27 fidelity / the
> three-scalar coupling), lens-b (perf-first / the unified `--stage-t` registered scalar),
> lens-c (audacious 1940s-technicolor / the drawer "tectonic settle" + the cartoon-punch
> tier). Every token/composable/file grepped on disk; the born-RED is the lenses' live read,
> reconciled across all three. **A UNION with the shipped ecosystem + the sibling
> select-forms GOLDEN — zero new component, zero fork. TRANCHE-DEV only; the spike is
> `golden/spike.html`.**

---

## 0. THE RECONCILED BORN-RED (all three lenses measured the SAME truth, both modes)

Live over the real `/containers/*` + `/forms/*` routes, REAL open/close + drawer-drag
gestures, chrome-devtools, `getComputedStyle` OKLab + the honest composite of the live
surface over the live `elementFromPoint` backdrop pixel (NOT `getComputedStyle` over a
hardcoded field — the recurring fraud, fenced):

| probe | LIGHT (live) | DARK (live) | verdict |
|---|---|---|---|
| Popover / Dropdown panel fill | `oklab(0.936 .0056 .013/.808)` | `oklab(0.379 .0099 .0169/.894)` | warm-HUE both modes (BC.W-OVERLAY-UNIFORM shipped) — **panel ALREADY one register** |
| Dialog panel fill | `oklab(0.930 .0056 .013/.693)` | — | same recipe, heavier tier |
| `.glass-reveal` | scale 0.88→1 on `--spring-snappy`, blur 4→0, origin = popper edge | same | REAL + Safari-honest (`filter` blur, never `backdrop-filter:url`) — **but CALM: no anticipation, no punch** |
| **Drawer sheet @ peek / half / full** | α **fixed 0.95** at every detent; `blur(20px)` fixed | α **fixed 0.96** at every detent | **DEAD coupling** — peek looks as solid as full (born-RED headline) |
| `--glass-drawer-t` → outputs | drives `translateY` ONLY | same | the detent→opacity / scrim / scale couplings are **ABSENT** |
| `shouldScaleBackground` | declared + doc'd (`Drawer.vue:45`), **read by NOTHING** (grep 0 `scale(`) | — | **dead-knob LIE confirmed** — `#app transform: none` at every detent |
| scrim (DrawerOverlay) | `--overlay-scrim-strong` (warm `hsl(24 10% 10%)` @ 80%), **fixed** | warm-ink, fixed | warm (not flat black) ✅ but **α does NOT track the detent** |
| Popover vs Dropdown **trigger** | bare (consumer-styled geometry) | bare | **trigger NOT a shared register** → the user's "why are these different" flag |
| `--ease-cartoon-punch` / `--motion-weight` / `--stage-t` / `--overlay-tint-floor` | **UNSET** (grep 0 in `src/styles`) | — | phantoms (Band-0 + select-forms mint prerequisites) |

**The family is NOT broken — it is panel-CONVERGED but COUPLING-BOUND + DEPENDENCY-BOUND.**
The surface + reveal are already ONE register (BC.W-OVERLAY-UNIFORM). The real RED is the
drawer's three dead couplings + the un-unified trigger. Born-RED is genuine and honest: the
drawer sheet composites the same α at peek and full, the page never recedes,
`shouldScaleBackground` animates zero pixels. This GOLDEN is a **COUPLE + UNIFY + DEPEND**,
never a rebuild.

---

## 1. THE GOLDEN IDEA (one sentence)

Every overlay is the SAME warm-glass floating plate that **wells out of its anchor on a
weighted cartoon gesture** and — for the modal band — **stages the scene behind it as ONE
weighted body** (scrim deepens, page recedes-and-scales, sheet freezes transmissive→solid)
through **ONE registered `--stage-t` scalar** the drawer's snap-spring writes per frame and
the dialog/command flip 0→1; the popover trigger and the dropdown trigger are **ONE
`.overlay-trigger` register** over **ONE `.glass-reveal` panel**; every channel is
compositor-only + Safari-native; every primitive is a UNION with the shipped ecosystem +
the sibling select-forms GOLDEN (zero new component, zero fork).

### The four moves (the strongest from each lens, reconciled)

1. **THE SPINE — `--stage-t`, ONE registered staging scalar (lens-b's boldest, sharpened by
   lens-a's three couplings + lens-c's tectonic reading).** ONE `@property --stage-t` (0
   closed → 1 fully-staged, `inherits: true`) drives FOUR coupled scene outputs through pure
   `calc()` reads: (A) **surface freeze** (transmissive→solid `--card` at full, via the ONE
   `--glass-level` machinery), (B) **scrim deepen** (α tracks t), (C) **page recede+scale**
   (`scale(1→0.95)` + corner bloom — `shouldScaleBackground` RETIRED, replaced by a value
   that moves the compositor), (D) **backdrop-blur engage** (opt-in, one-shot-gated). The
   drawer's `useDrawerSnap` SpringProgress writes `--stage-t` per frame off the detent; a
   plain modal flips it 0→1 on open. The floating band opts out (`--stage-t` stays 0, the
   couplings no-op). The whole staged scene moves as ONE weighted body on ONE spring clock.

2. **THE PANEL — formalize the ONE floating-glass register (all three convergent).** The
   panel is already unified (BC.W-OVERLAY-UNIFORM); DRY the three SFCs' class-soup into ONE
   `@utility overlay-panel` (compose, not re-decl) so popover↔dropdown congruence is
   STRUCTURAL and can never drift. The only sanctioned divergence is `--overlay-pad-inline`
   (menu-tight vs content-breathing) — a documented density choice on the φ ladder, not a
   fork. The panel reads the select-forms `--glass-bg-floating-tinted` warm admit-floor
   (DEPEND, selector widened to the modal band).

3. **THE REVEAL — the weighted cartoon welling, opt-in punch (lens-c's tier × lens-a's
   weight × the select-forms family upgrade).** Keep `.glass-reveal` (fit). It already
   inherits the select-forms SPATIAL-leg re-clock to `--ease-cartoon-punch × --motion-weight`
   (anticipation dip + overshoot + settle) — the overlay family is the **consumer**, not the
   re-author (DRY, ONE recipe edit serves all reka overlays). The takeover band (Dialog,
   Sheet) opts into a `.glass-reveal--punch` deepened-squish tier + the `--shadow-cartoon`
   cel-plane cast; the frequent band (Popover, Dropdown, Tooltip, HoverCard, Context, Command)
   stays the calm snappy bloom. The drawer full-commit fling lands with bounded bouncy mass.

4. **THE TRIGGER — ONE `.overlay-trigger` register (all three convergent, the user's flag
   #2).** Popover / Dropdown / HoverCard / Tooltip / Context triggers compose ONE register —
   the same edge (`--glass-edge-floor`), the same `.glass-capsule-hover` ready-state, the
   same `[data-state=open]` pressed plate — modeled on the SHIPPED `.dock-trigger` unified
   register (`dock-controls/triggers.css`, which already unified DockSelect/Dropdown/Popover
   triggers byte-identically). The panel blooms FROM the trigger edge (the popper
   `transform-origin`, already wired) so trigger + panel read as ONE gesture.

### The single boldest move — `--stage-t`: the whole scene as ONE weighted body

The drawer does not merely "go opaque at full" — as you fling it, **the page sinks and
scales away, the scrim deepens, and the glass freezes transmissive→solid**, all three
coupled to the ONE `--stage-t` the snap-spring writes, all arriving on the SAME weighted
clock so the full sheet *lands with mass on a recessed stage*. The drawer detent, the dialog
open, and the iOS scale-down become CONFIGURATIONS of the SAME scalar — and the dead
`shouldScaleBackground` is RETIRED by a value that actually moves the compositor. The §L4
Staging principle made one real scalar.

---

## 2. THE SPINE — `--stage-t`, the unified staging scalar (the headline build)

```css
/* tokens/property-regs.css — the staging scalar (the --glass-drawer-t / --glass-accent
   registered-scalar precedent). inherits:true so a wrapper sets it and the scrim +
   page-wrapper + sheet all read the SAME value, inheritance-scoped to the portal subtree
   + the page-wrapper sibling. (--glass-drawer-t stays inherits:false per-element — it is
   the SHEET's translate; --stage-t is the SCENE scalar.) */
@property --stage-t { syntax: "<number>"; inherits: true; initial-value: 0; }
```

### 2a. Coupling (A) — surface FREEZE (the drawer opaque-at-full, T6 headline)

Peek/half stay transmissive (the BE.W-SHEET-TRANSLUCENT see-through crown); the fraction
lerps toward the opaque escape (solid `--card` + `blur(0)`) only in the final detent reach.

> **The substitution-vs-inheritance trap (the recurring live-found class, documented at
> `drawer.css:101–116`).** `--glass-bg-overlay` bakes `var(--glass-level)` at its `:root`
> declaration — a per-element `--glass-level` does NOT re-resolve the baked token. So the
> freeze must compose the plate **AT THE ELEMENT** (exactly as `[data-surface=opaque]`
> already does), a per-element lerp from the transmissive tint toward solid `--card`, +
> a `backdrop-filter: blur()` that decays to 0 as it solidifies (a solid plate has no
> backdrop to bend — and dropping the blur at full is a Safari WIN: no wasted sample behind
> an opaque plate):

```css
/* drawer.css — the detent→opacity FREEZE, composed at the element. Reads --stage-t,
   which useDrawerSnap mirrors from --glass-drawer-t (§2e). */
.glass-drawer[data-glass-drawer-snap-points="true"] {
  /* 0 until the commit floor (0.85), →1 at full — a piecewise lerp on the ONE knob.
     peek/half: op 0 → transmissive crown; full: op 1 → solid --card. */
  --sheet-freeze: clamp(0, calc((var(--stage-t) - 0.85) / 0.15), 1);
  background: color-mix(in oklab,
    color-mix(in oklab,
      color-mix(in oklab, var(--glass-bg-overlay), var(--glass-tint-source) var(--glass-tint-strength)),
      var(--card) calc(var(--sheet-freeze) * 100%)),
    var(--glass-tint-source) 0%);
  backdrop-filter: blur(calc(var(--glass-blur-overlay-radius) * (1 - var(--sheet-freeze)))) saturate(1.6);
  -webkit-backdrop-filter: blur(calc(var(--glass-blur-overlay-radius) * (1 - var(--sheet-freeze)))) saturate(1.6);
}
```

Born-RED on the live fixed-α-0.95 sheet at every detent.

### 2b. Coupling (B) — scrim DEEPEN

The scrim α tracks `--stage-t` so a peek drawer barely dims, a full drawer commits hard.
Reuses the SHIPPED warm `--overlay-scrim-ink` (`hsl(24 10% 10%)`, F7 — warm, never flat
black), now t-coupled instead of the fixed `--overlay-scrim-strong`:

```css
/* the DrawerOverlay scrim element gains [data-stage-scrim]; plain modals flip --stage-t
   0→1 so the scrim fades in on the SAME scalar (DRY with the drawer). */
[data-stage-scrim] {
  background: color-mix(in srgb, var(--overlay-scrim-ink)
              calc(28% + var(--stage-t) * 44%), transparent);   /* .28 → .72 */
}
```

### 2c. Coupling (C) — page RECEDE + SCALE (`shouldScaleBackground` RETIRED)

The page wrapper scales `1 → 0.95` + corner-radius bloom as `--stage-t → 1` — the iOS
"card recedes" depth cue. A SINGLE compositor `transform` on the page-root, behind the scrim.

```css
[data-stage-wrapper] {
  scale: calc(1 - 0.05 * var(--stage-t));        /* 1 → 0.95 */
  border-radius: calc(var(--radius-panel) * var(--stage-t));
  transform-origin: 50% 0;                        /* recede toward the top, iOS */
  overflow: clip;
  filter: saturate(calc(1 - 0.18 * var(--stage-t)));  /* the scene desaturates as it recedes */
}
```

**`shouldScaleBackground` is DELETED (no-legacy law — no alias).** The prop becomes an honest
enum `stage="none | dim | scale | immersive"` on `<Drawer>`/`<Dialog>`/`<Sheet>`/`<Command>`,
which sets the `data-stage-*` attrs. The dead boolean is gone, replaced by a value that
actually moves pixels. `Drawer.vue` provides the `--stage-t` mirror onto the `[data-stage-
wrapper]` page-root marker (the demo/consumer shell wraps their app root); when `stage="none"`
the marker is absent and (C) is a no-op — no longer a lie, a real gated effect.

### 2d. Coupling (D) — backdrop-blur ENGAGE (opt-in, one-shot-gated)

`stage="immersive"` (Command palette, the spotlight) ramps the scrim's `backdrop-filter`
radius `0 → deep` on `--stage-t` (the T9 engage). **§L7 Safari fence:** ONE-SHOT over the
open window (the scalar moves once), NEVER a steady-state per-frame re-blur — WebKit pays it
once. Default OFF.

### 2e. The drive — `--stage-t` off the snap-spring (no new engine)

`useDrawerSnap` already writes `--glass-drawer-t` per frame via the house SpringProgress. The
drawer scope mirrors it: `--stage-t: var(--glass-drawer-t)` on the content root (so the
detent fraction IS the stage fraction — the whole scene rides the ONE snap clock). A plain
Dialog/Command transitions `--stage-t` 0→1 on `--spring-snappy` at open. **No new JS, no new
engine — the couplings are pure `calc()` reads of the ONE scalar the house already writes.**

---

## 3. THE PANEL — the ONE floating-glass register (popover↔dropdown congruence, STRUCTURAL)

The panel is already unified (BC.W-OVERLAY-UNIFORM, live-proven byte-identical). The GOLDEN
makes the congruence STRUCTURAL + DRY so it can never drift:

```css
/* glass/overlay.css — the ONE floating-overlay panel recipe. Composes (does NOT re-decl)
   .glass-floating .glass-reveal + the surface axis; bakes the shared geometry + the φ pad
   ladder; the per-overlay knob is --overlay-pad-inline only. */
@utility overlay-panel {
  border-radius: var(--radius-panel);
  min-inline-size: var(--overlay-min-width);   /* 8rem, shipped */
  max-block-size: var(--overlay-max-block);     /* 60vh, shipped */
  /* the φ pad ladder default — pad-block = pad-inline × 1.272 (√φ·√φ ≈ φ) */
  --overlay-pad-inline: 1rem;
  --overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272);
  padding-inline: var(--overlay-pad-inline);
  padding-block: var(--overlay-pad-block);
  /* the select-forms warm admit-floor — the panel reads the tinted fill (DEPEND) */
  background: var(--glass-bg-floating-tinted);
}
```

- **Dropdown / Context / Command / Sub-content** compose `overlay-panel
  [--overlay-pad-inline:--spacing(1)]` (tight rows; rows own their `py` via `menuItemVariants`).
- **Popover / HoverCard** compose `overlay-panel` bare (the breathing 1rem default).
- **Tooltip** composes `overlay-panel [--overlay-pad-inline:0.5rem]` + a smaller radius (the
  SMALL member, SAME register).
- **Dialog** composes `overlay-panel` but swaps tier → `glass-overlay` (modal band) +
  `rounded-dialog`. SAME recipe, heavier tier.

**Warm admit-floor (DEPEND the select-forms W-OVERLAY-WARM-FLOOR).** The `--glass-bg-floating-
tinted` `:where()` seam (select-forms §2a) is widened to include `[data-slot=dialog-content]`
+ `[data-slot=command-…]` (select-forms already adds popover/dropdown). `--overlay-tint-floor`
is the select-forms PLAIN per-mode pair (6% light / 8% dark — NEVER a `light-dark()` fragment,
the inset-shadow trap). **The overlay band does NOT re-mint the floor — it widens the selector
list.**

**Warm field behind the portal (DEPEND).** DEPEND `BD.W-PAGE-FIELD` (`.paper-field` /
`--field-h`) + the select-forms `.glass-field-portal::before` re-emit (`menu.css`), the
selector widened to the dialog/command portal roots — so a forms dialog and a feedback dialog
read as different warm glass, both transmissive. The §L1 "glass cannot sample glass" trap is
avoided by construction (the field is a normal painted `::before` BEHIND, z −1, carrying NO
backdrop-filter).

---

## 4. THE REVEAL — the weighted cartoon welling (DEPEND the select-forms family upgrade)

`.glass-reveal` is the family floor and it is fit. The select-forms GOLDEN already re-clocks
its SPATIAL legs (W-SELECT-REVEAL-PUNCH, a **family upgrade** — every reka overlay inherits in
ONE recipe edit). **The overlay GOLDEN is the CONSUMER, never the re-author.**

### 4a. The calm floor (works TODAY, no Band-0 dep)

Scale `0.88 → 1` on `--spring-snappy`, blur `4px → 0` on `filter` (Safari-honest), opacity
`--ease-out`, origin = popper anchor. ✅ shipped — the graceful default the frequent band keeps.

### 4b. The cartoon arrival (DEPEND Band-0 + select-forms, opt-in PUNCH tier)

When the select-forms re-clock lands, the `.glass-reveal` SPATIAL legs ride
`--ease-cartoon-punch × --motion-weight`: a ~4% anticipation dip (the panel recoils into its
anchor) → ~22% overshoot → settle. The EFFECTS legs (opacity, blur) STAY `--ease-out` (a fade
never bounces). The **takeover band** opts loud:

```css
/* glass/reveal.css — the PUNCH tier. Composes ON TOP of .glass-reveal; re-points ONLY the
   SPATIAL timing-function + deepens the squish. EFFECTS legs untouched (no-bounce fade). */
.glass-reveal--punch {
  --glass-reveal-enter-scale: calc(1 - 0.18 * var(--motion-weight, 1));  /* 0.82 @ weight 1; 1 @ PRM */
  transition-timing-function:
    var(--ease-cartoon-punch), var(--ease-cartoon-punch),   /* scale, translate — the PUNCH */
    var(--ease-out), var(--ease-out), linear, linear;        /* opacity, filter, display, overlay — calm */
}
```

| Overlay | reveal tier | rationale |
|---|---|---|
| Tooltip, HoverCard | `.glass-reveal` (calm) | quiet informational — punch would be noise |
| Popover, Dropdown, Context, Command | `.glass-reveal` (calm) | frequent, fast — calm snappy stays crisp |
| **Dialog, Sheet** | **`.glass-reveal--punch`** | the deliberate takeover moment — the loud cartoon bloom |
| **Drawer (full-commit fling)** | bouncy mass settle (§2) | the tectonic landing |

`--motion-weight` (rest `1/φ ≈ 0.618`) co-scales the squish depth + overshoot share + the
cartoon-shadow travel so bloom + cast read as ONE proportioned deformation; tooltip rests near
0 (a whisper), the takeover band pushes toward 1.

### 4c. The cartoon SHADOW — the cel-plane pop (Dialog/Sheet)

Dialog + Sheet compose `--shadow-cartoon` (shipped, dark-arm white-on-dark by construction)
UNDER the soft elevation shadow. On the punch bloom the layered-offset cast travels OPPOSITE
the scale via a `::after` shadow-caster transform (NEVER an animated `box-shadow` — the §L7
compositor fence), scaled by `--motion-weight`. PRM → static cast, no travel.

---

## 5. THE TRIGGER — ONE `.overlay-trigger` register (the user's flag #2, KISS)

The panels are congruent (§3); the unaddressed half is the TRIGGER. Model the SHIPPED
`.dock-trigger` precedent (`dock-controls/triggers.css` already unified DockSelect/Dropdown/
Popover triggers byte-identically, hover-scale OFF so the portal anchor never shifts mid-open)
into a non-dock `.overlay-trigger` the anchored-overlay family shares:

```css
/* glass/overlay-trigger.css — the ONE anchored-overlay trigger register. Popover, Dropdown,
   HoverCard, Tooltip, Context triggers compose it. Mirrors the .dock-trigger discipline:
   no hover-scale (a scaling trigger shifts its portaled-content anchor mid-open). */
.overlay-trigger {
  /* the glass-material edge floor + the tabs .glass-capsule-hover ready-state (DEPEND) */
  border: var(--glass-edge-floor);
  transition: background var(--duration-fast) var(--ease-standard),
              scale var(--spring-snappy-duration) var(--spring-snappy);
}
.overlay-trigger[data-state="open"] {
  /* the SHARED open pressed-plate — dropdown's open-trigger and popover's open-trigger are
     byte-identical (the congruence). The panel blooms FROM this point. */
  background: var(--glass-bg-resting-tinted);
}
```

The panel's `transform-origin` (`--reka-popper-transform-origin`, already wired) is the
pressed-trigger rect, so across popover AND dropdown the panel blooms out of the same point it
launched from. The ONLY sanctioned difference is the **content** (a popover holds arbitrary
slot content; a dropdown holds `.glass-menu-row` items) + the pad rung — correct, not a
divergence. **"Why are these different — at least style them the same" → they are now ONE
register end to end** (trigger geometry + bloom origin + panel glass + reveal).

---

## 6. THE EXACT MECHANISM — files, tokens, recipes (the integration map)

| concern | mechanism | file | reuse / new |
|---|---|---|---|
| the staging scalar | `@property --stage-t` (number, inherits:true) | `tokens/property-regs.css` | NEW scalar (1) |
| surface freeze (A) | `--sheet-freeze` lerp → element-level `color-mix` toward `--card` + blur decay | `drawer.css` | RE-POINT shipped rule |
| scrim deepen (B) | `[data-stage-scrim]` α off `--stage-t` on `--overlay-scrim-ink` | `drawer.css` + `DrawerOverlay.vue` | RE-POINT + 1 attr |
| page recede (C) | `[data-stage-wrapper]` `scale`/`border-radius`/`filter` off `--stage-t` | `glass/overlay.css` + app-shell marker | NEW recipe + 1 marker |
| blur engage (D) | scrim `backdrop-filter` radius off `--stage-t`, one-shot-gated | `drawer.css` | DEPEND T9, opt-in |
| `--stage-t` drive | `--stage-t: var(--glass-drawer-t)` mirror; modal flip 0→1 | `DrawerContent.vue` / `DialogContent.vue` | 1 decl |
| `stage=` enum | `none\|dim\|scale\|immersive` → `data-stage-*`; **DELETE `shouldScaleBackground`** | `Drawer.vue` / `Dialog.vue` | clean break (no alias) |
| ONE panel recipe | `@utility overlay-panel` (compose floating+reveal+axis+φ pad) | `glass/overlay.css` | NEW utility (1), DRY |
| warm admit-floor | widen `--glass-bg-floating-tinted` `:where()` to dialog/command; `--overlay-tint-floor` | `glass/surfaces.css` (select-forms) | DEPEND, widen selector |
| portal field | `.glass-field-portal::before` + `data-field-palette`, widened | `menu.css` (select-forms) | DEPEND, widen selector |
| reveal calm floor | `.glass-reveal` scale/fade/blur on `--spring-snappy` | `glass/reveal.css` | KEEP (shipped) |
| reveal punch tier | `.glass-reveal--punch` SPATIAL → `--ease-cartoon-punch × --motion-weight` | `glass/reveal.css` (select-forms re-clock) | DEPEND + 1 tier class |
| cartoon shadow | `--shadow-cartoon` `::after` caster, travel opposite scale, PRM-static | `glass/reveal.css` | COMPOSE shipped |
| trigger register | `.overlay-trigger` (mirror `.dock-trigger`); `[data-state=open]` plate | `glass/overlay-trigger.css` | NEW recipe (1) |
| cartoon-punch mint | `--ease-cartoon-punch` + `--motion-weight` | motion-spring-register GOLDEN | DEPEND (no re-mint) |
| reka a11y substrate | trap / escape / roving / `aria-*` | reka-ui | FROZEN (byte-untouched) |

**Net-new src artefacts:** `@property --stage-t` + the four couplings (drawer.css re-point +
`[data-stage-wrapper]`/`[data-stage-scrim]` recipes) + the `stage=` enum (deleting
`shouldScaleBackground`) + `@utility overlay-panel` + `.glass-reveal--punch` tier +
`.overlay-trigger` register. Everything else is a re-point of a shipped or sibling-GOLDEN seam.
ZERO new component, ZERO new composable, ZERO fork.

---

## 7. CROSS-ENGINE (Chrome AND Safari) + a11y / PRM — by construction

**Cross-engine — every channel compositor-only + Safari-native:**

| channel | Chrome | Safari | fence |
|---|---|---|---|
| reveal scale/translate | `scale:`/`translate:` longhands | same | compositor; never `transform:` (no stacking-context mint) |
| reveal blur-settle | `filter: blur()` on the surface's OWN pixels | same | NEVER `backdrop-filter:url` — already correct |
| panel glass | `backdrop-filter: blur() saturate()` | `-webkit-` companion | `@supports not (backdrop-filter)` → `--glass-level:0` solid arm |
| surface FREEZE | `--glass-level`/element `color-mix` lerp | same | a DESCENDANT-safe opacity change, NEVER an ancestor `filter` (would clobber the sheet's backdrop-filter — the dock-hub goo-tear lesson) |
| scrim deepen | warm `color-mix` α | `-webkit-` companion | one-shot, no loop |
| page recede | `scale`+`filter:saturate` on page-root | same | compositor-cheap; one-shot per open; the staging `transform` is `transform` ONLY, NO filter on an ancestor of the glass panel (§L7) |
| blur engage (D) | scrim `backdrop-filter` ramp | `-webkit-` | ONE-SHOT over the open window, NEVER steady-state re-blur (§L7) |
| cartoon-punch | `--ease-cartoon-punch` (`linear()`) | WebKit-native | PRM → `--ease-standard`; opt-in |
| `@property --stage-t` | Houdini reg | Safari 16.4+ | absent → snaps to endpoints (graceful) |

**MEATBALLING fence:** this family carries ZERO goo — the overlays are glass plates, not blob
morphs — so the "goo filter on an ancestor of glass" trap is N/A *except* the drawer freeze,
which is built explicitly on `--glass-level`/element-`color-mix` (the ancestor-filter-free
path), NEVER an ancestor `filter`. No naive ellipsoids — N/A. The scrim's z-stack sits BELOW
the panel (`--z-modal − 1` vs `--z-modal`) so no two backdrop-filters overlap (§L1).

**a11y / PRM carve:**
- **Focus trap + escape + roving** — owned by reka end-to-end (`DialogContent` traps+restores;
  `DropdownMenu`/`Context` roving; `Command` listbox; Tooltip/HoverCard non-trapping hover-
  intent). The glass is paint, the a11y is reka — the GOLDEN adds ZERO a11y surface, cannot
  regress it. The gate asserts trap+escape+roving survive (anti-regression).
- **PRM `reduce`** → `--motion-weight: 0` (one assignment) zeroes the anticipation + overshoot
  + the enter-squish (enter-scale → 1.0, clean fade). `--stage-t` still FLIPS (staging is
  structure, not motion) but the snap-spring snaps to target in one frame
  (`useDrawerSnap.respectReducedMotion`) → the scene jumps to its staged state, zero scale-anim
  frames. **The opaque-at-full SURVIVES PRM** (a full sheet is opaque regardless — structure).
  The page-scale value applies but does not animate. The cartoon cast → static.
- **`prefers-reduced-transparency`** → `--glass-level: 0` (the SAME knob) makes every overlay
  a solid warm-tinted plate; the drawer freeze is already heading there at full, this bracket
  pins it across detents. The warm field + floor stay (paint, not transparency) — the opaque
  escape reads warm, never gray.
- **`prefers-contrast: more`** → the panel edge-rim + the cartoon-cast + the scrim ink floor
  UP (the inked affordance is a legibility asset, §Shadows).
- **Acceptance** = a paired-engine π (chromium + webkit), both modes, NEVER reducedMotion on
  the reveal/stage arm.

---

## 8. THE ACCEPTANCE BAR (gestalt — live-judge AS A USER, both modes, both engines)

Open the real `/containers/*` routes, REAL open/close + drawer-drag, BOTH modes, BOTH engines,
fresh paint. PASS iff:
1. Every overlay reads **WARM transmissive floating glass** — composited C ≥ 0.02 warm both
   modes, spatial L-variance > floor (the field transmits), never gray, never charcoal.
2. The reveal **wells from the anchor** — the takeover band (Dialog/Sheet) shows a hair of
   recoil (anticipation), a bloom past settle, a soft land; the frequent band is the calm
   snappy bloom; both bloom FROM the trigger/source edge, not center.
3. The **DRAWER stages as ONE weighted body** — drag peek→half→full: the sheet is **see-through
   at peek/half** (page bleeds) and **near-opaque at full** (page does NOT bleed, blur→0); the
   **page recedes + scales** (`scale < 1` at full, `= 1` closed); the **scrim deepens** with the
   detent — all in lockstep on the ONE snap clock, a heavy slab landing on a recessed stage.
4. **popover + dropdown are ONE register** — same trigger geometry, same `[data-state=open]`
   plate, same bloom origin, same panel glass; only the content (slot vs menu-rows) differs.
5. **Dark mode is warm-luminous** — every overlay GLOWS warm, never charcoal-gray.
6. **Identical Chrome ↔ Safari** — same warm, same welling, same stage, compositor-only.
7. **PRM** — overlays fade cleanly (no fly, no stage-anim); the drawer JUMPS to its staged
   state; opaque-at-full SURVIVES; warm plate + field + accent present.
8. **No-legacy / DRY** — ONE `--stage-t` stages the modal band, ONE `@utility overlay-panel`,
   ONE `.glass-reveal` (+ punch tier), ONE `.overlay-trigger`; `shouldScaleBackground` DELETED;
   zero new component, zero fork.

---

## 9. THE BORN-RED GATE (painted-pixel truth — the cardinal anti-fraud rule)

`tests-visual/overlays.spec.ts`, **chromium + webkit**, both modes, NEVER reducedMotion on the
reveal/stage arm. THE CARDINAL RULE: **sample the COMPOSITED painted pixel of the actual
overlay over the actual page** — full-page screenshot → `getImageData` of the overlay region,
through a REAL open/close + drawer-drag gesture — NEVER `getComputedStyle` over a HARDCODED
field, NEVER synthetic arithmetic. A born-RED that reports the HONEST fixed-α drawer over the
real flat condition is CORRECT.

| # | assert | born-RED on HEAD (live) | GREEN when |
|---|---|---|---|
| G1 warm-not-gray (PAINTED) | every overlay region, screenshot → `getImageData`, mean OKLab **C ≥ 0.02 warm** (H ∈ [16,110]) + spatial L-variance > floor, both modes | floating warm-hue but field-flat (`--field-h` unset) | floor + field land |
| G2 the A/B field delta | the SAME overlay over the REAL field vs a flat plate, composited **ΔC ≥ 0.015** warm, dark-arm required | identical/muddy | field behind + warm admit |
| **G3 DRAWER opaque-at-full** | drag peek→half→full via the REAL handle; composited sheet bg-α **translucent ≤0.8 at peek/half (page bleeds) AND →~1 at full (no bleed), blur→0 at full** | α **0.95 fixed** + blur 20px fixed at every detent | the `--sheet-freeze` lerp |
| **G4 PAGE-SCALE** | `stage="scale"`: page-wrapper `transform` matrix scale **shrinks 1→~0.95** as the drawer/dialog opens; born-RED bite: `shouldScaleBackground` grep 0 (deleted) AND `stage="scale"` moves real pixels | `#app transform: none`; `shouldScaleBackground` read by nothing | coupling (C) + the enum |
| G5 SCRIM-DEEPEN | scrim α **tracks `--stage-t`** (peek dims < full) | fixed `--overlay-scrim-strong` α | coupling (B) |
| G6 reveal anticipation | takeover bbox scale **dips below closed** (recoil) before launch — frame-series; `--motion-weight:0` control shows ZERO pre-dip | snappy spring has NO pre-dip | the punch tier |
| G7 reveal overshoot+settle | takeover scale **exceeds 1.0** mid-bloom then settles; origin = anchor (bloom from edge) | settles monotonic to 1 | the punch curve |
| G8 TRIGGER congruence | popover + dropdown trigger composite **byte-identical** edge/hover/`[data-state=open]` plates (ΔE ≈ 0) | bare triggers diverge by consumer | `.overlay-trigger` |
| G9 a11y anti-regression | focus trap holds, escape closes, roving works, on every overlay (reka untouched) | — (asserts it stays) | structural |
| G10 PRM | one static frame: clean fade, no pre-dip/overshoot, no stage-anim; **opaque-at-full SURVIVES**; warm plate + field present | — | `--motion-weight:0` + structure-survives carve |
| G11 cross-engine | the paired chromium+webkit capture for G3/G4/G6/G7; **no `backdrop-filter:url`, no per-frame re-blur** (the engage is one-shot-gated) | — | the §L7 arms |
| G12 anti-evasion self-test (≥6 bites) | the gate FAILS on: the fixed-α-full drawer (G3 bite); `shouldScaleBackground` still present / `#app` un-scaled (G4 dead-knob bite); a fixed scrim (G5 bite); bare divergent triggers (G7 bite); the field unset / a hardcoded inline field (G1 bite); the punch removed (no pre-dip, G6 bite); the surface freeze as an ANCESTOR `filter` (kills the sheet backdrop — Safari tear); a `light-dark()` warm-floor (→ none); the multi-open frame-series (open/close ×5, no reload — the `@property --stage-t` stale-latch). PASSES only on the real composited warm overlays + the real coupled stage | — | the self-test bites |

**Born-RED on HEAD (live-verified this pass):** drawer sheet α 0.95 + blur 20px fixed at every
detent (G3); `#app transform: none` + `shouldScaleBackground` read by nothing (G4); scrim α
fixed (G5); bare popover/dropdown triggers (G8); `--field-h`/`--overlay-tint-floor`/`--stage-t`/
`--ease-cartoon-punch`/`--motion-weight` UNSET (G1/G6). Genuine. **NO source-green close** — the
painted π is the binding truth; the de-risk spike (`golden/spike.html`) re-runs in Safari and
clears the stage-couple + reveal-shape floors before build-close.

---

## 10. THE DELTA-ASSAY → wave amendments (reconcile vs the 116-wave set; NO dup)

A **COUPLE + UNIFY + DEPEND**, not a new-component wave. The family is mostly DEPEND on the
sibling select-forms + page-background + motion-spring GOLDENs (the select-forms dedup
discipline proved out — the warm-floor, the portal-field, the reveal punch are SHARED, not
re-minted per band).

| amendment | scope | depends-on (no dup) | gate |
|---|---|---|---|
| **`BD.W-OVERLAY-STAGE-COUPLE`** (NEW, the headline) | `@property --stage-t` + the FOUR couplings (freeze / scrim-deepen / page-scale / blur-engage-gated) + the `stage="none\|dim\|scale\|immersive"` enum + the **DELETION of `shouldScaleBackground`** (no-legacy). RE-POINTS `drawer.css` + the page wrapper; ZERO new paint path. **SUBSUMES the empty `W-DRAWER-DETENT-GLASS` stub** (its body IS coupling A+C, generalized drawer-only → modal-band). | `BE.W-SHEET-TRANSLUCENT` (the peek/half crown, the t<0.85 floor); T9 (blur-engage, opt-in) | G3 G4 G5 G10 G11 |
| **`BD.W-OVERLAY-PANEL`** (NEW, small) | `@utility overlay-panel` (DRY the three SFCs' class-soup; STRUCTURAL popover↔dropdown congruence); the panel reads the tinted fill. Byte-stable behavior (DRY, not a regression). | — (self-contained) | G1 (regression fence) |
| **`BD.W-OVERLAY-TRIGGER`** (NEW, small) | `.overlay-trigger` register (mirror the shipped `.dock-trigger`); Popover/Dropdown/HoverCard/Tooltip/Context trigger wrappers compose it; the `[data-state=open]` shared plate. The user's flag #2. | tabs GOLDEN `.glass-capsule-hover`; glass-material `--glass-edge-floor` | G8 |
| **`proof:overlays`** | NEW `tests-visual/overlays.spec.ts` — the painted-pixel born-RED gate (§9) + the ≥6 anti-evasion bites + the paired-engine reveal/stage frame-series | — | all |

### RECONCILE / DEDUP
- **`W-DRAWER-DETENT-GLASS`** (empty union stub) → **fold into `BD.W-OVERLAY-STAGE-COUPLE`**.
  The drawer detent→opacity is coupling (A) of the unified stage; a drawer-only wave would
  fork the staging the modal band shares. The stub is unwritten → no content lost.
- **`BE.W-SHEET-TRANSLUCENT`** (shipped, the 0.74 see-through crown) → **DEPEND** — it owns the
  t<0.85 peek/half FLOOR; STAGE-COUPLE owns the lerp t→1 (full→opaque). Complementary endpoints
  of the SAME `--glass-bg-sheet` rung, no overlap.
- **`BC.W-OVERLAY-UNIFORM`** (shipped, surface axis) → **DEPEND/SUPERSEDED-BY `BD.W-OVERLAY-
  PANEL`** — the panel uniformity it shipped is PROVEN live; the new wave only formalizes it
  into a `@utility` + adds the trigger congruence. NO behavior regression.
- **select-forms `W-OVERLAY-WARM-FLOOR` / `W-SELECT-PORTAL-FIELD` / `W-SELECT-REVEAL-PUNCH`**
  → **DEPEND, widen selectors** — the warm floor, the portal field, the reveal punch are the
  SHARED register the select already mints; the overlay band consumes them + widens the `:where()`
  / portal-root selector list to the modal band. Do NOT re-mint a menu-only/overlay-only tint or
  reveal.
- **`W-LIQUID-ENTRANCE-GENERAL`** (extant T10) → **DEPEND** — the overlay reveal CONSUMES the
  cartoon-weight augmentation; the overlay wave is the consumer.

### Band-0 / sibling PREREQUISITES (land FIRST)
`--ease-cartoon-punch` + `--motion-weight` (motion-spring-register GOLDEN); `.paper-field` /
`--field-h` (page-background GOLDEN); `--overlay-tint-floor` + the `--glass-bg-floating-tinted`
widen + the `.glass-field-portal` recipe + the `.glass-reveal` re-clock (select-forms GOLDEN);
`.glass-capsule-hover` (tabs GOLDEN); `--glass-edge-floor` (glass-material GOLDEN). This GOLDEN
RIDES the extant `--spring-snappy` + `--glass-drawer-t` + `--glass-level` for the default so it
is **not blocked** on the mints — the stage couple is the headline build that stands alone; the
punch + field + floor are the calibrated upgrades once the siblings land.

**HELD / FROZEN (the union law):** the reka a11y substrate (trap / escape / roving / `aria-*`)
byte-untouched; the six-layer plate composite untouched (only the FILL admit + the freeze lerp
change); `BC.W-OVERLAY-UNIFORM`'s surface axis preserved; the EFFECTS legs of the reveal stay
on `--ease-out`. **No legacy, no alias, no dual path** — `shouldScaleBackground` is DELETED, not
shimmed.
