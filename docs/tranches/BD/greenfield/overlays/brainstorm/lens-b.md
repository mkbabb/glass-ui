# OVERLAYS — greenfield brainstorm, LENS B (cross-engine / perf-first)

> The floating/overlay glass-tier family — Sheet · Drawer(+detent) · Dialog · Popover ·
> DropdownMenu · Tooltip · HoverCard · ContextMenu · Command — redesigned from first
> principles through the CROSS-ENGINE + PERFORMANCE lens. The bar: every overlay reads
> **warm transmissive floating glass** (never gray, both modes), the reveal/dismiss is
> **liquid + weighty** and identical on Chrome AND Safari, the **drawer detent actually
> couples to opacity + scale** (no dead knob), and the **popover trigger + dropdown are
> ONE register**. KISS, DRY, deft union — no per-overlay fork.

---

## 0. The thesis in one line

**The overlay family is ALREADY one register on three of four axes — the surface (warm
glass), the reveal recipe (`.glass-reveal`), and the menu-row — were unified by shipped
waves. The remaining work is COUPLING (the drawer's `--glass-drawer-t` → opacity/scrim/
scale, a genuine dead knob) and CONGRUENCE (the popover trigger geometry vs the dropdown),
plus a Safari-honest reveal/scrim clock. This is a WIRING + COUPLING lens, not a rebuild —
which is exactly why the perf/cross-engine lens owns it: every move is a compositor-only
re-point, zero new paint path.**

---

## 1. Live-inspect findings — the verified status quo (NOT designed-from, just measured)

All over the real pages on `http://localhost:5173`, real open gestures, painted-pixel +
`getComputedStyle` on the COMPOSITED surface. Both modes.

| # | Finding (LIVE) | Verdict |
|---|---|---|
| F1 | `--glass-bg-floating` = `color-mix(srgb, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) …)` — the **warm-cream BA.W-NO-GRAY source** | warm floor IS live |
| F2 | A real floating surface composites **`oklab(0.38 0.0099 0.0169 / 0.894)` in DARK** — positive a·b chroma → **warm, NOT gray** | PASS both modes |
| F3 | The OPEN drawer at full extent composites **`oklab(0.974 0.0057 0.0137 / 0.95)`** — warm, but **α = 0.95, NOT opaque**; `backdrop-filter: blur(20px) saturate(1.6)` STILL active | the page bleeds through at full → **T6 DEFECT** |
| F4 | The drawer `transform: matrix(1,0,0,1,0,483.6)` (translateY only); page wrapper `transform: none` | **page-scale ABSENT** |
| F5 | `shouldScaleBackground` — declared + defaulted + doc'd in `Drawer.vue`, **read by NOTHING** (grep: 0 `scale(`, 0 scrim-couple, 0 consumer) | **DEAD-KNOB LIE confirmed** |
| F6 | `--glass-level: 1` constant on the sheet — never coupled to `--glass-drawer-t` | the detent→opacity coupling is **absent** |
| F7 | The scrim composites `srgb(0.11 0.098 0.09 / 0.8)` — a warm-ish dark scrim (`bg-overlay-scrim-strong` + `backdrop-filter: var(--glass-blur-wash)`) | scrim EXISTS, dim-only, not coupled to t |
| F8 | `--ease-cartoon-punch`, `--motion-weight`, `--field-h`, `--overlay-tint-floor`, `--drawer-scrim`, `--glass-bg-opaque`, `paper-field` — **ALL grep-0 in src/** | sibling-wave DEPS, not yet landed |
| F9 | `.glass-reveal` is the shared open recipe; Popover/Dropdown/Tooltip/Dialog ALL compose it + the shared `surfaceClass()` axis (BC.W-OVERLAY-UNIFORM shipped) | the SURFACE + REVEAL are ALREADY one register |
| F10 | `DropdownMenuTrigger` = `class="outline-none"` (bare); `PopoverTrigger` similarly bare — each delegates geometry to whatever the consumer puts inside | the **TRIGGER is NOT a shared register** → the user's "why are these different" |

**The honest born-RED set:** F3 (drawer not opaque at full), F4/F5/F6 (page-scale + the
`--glass-drawer-t` coupling dead), F10 (trigger geometry un-unified). The warm-glass (F1/F2)
and the reveal/surface unification (F9) are ALREADY green — the lens must NOT re-do them.

---

## 2. First-principles decomposition — what an overlay IS

Strip every component name. An overlay is **a transient surface that (a) MATERIALIZES from
an anchor, (b) sits on a glass tier over a scene, (c) optionally STAGES the scene behind it
(scrim/scale), and (d) DEMATERIALIZES back to the anchor.** Four orthogonal axes:

1. **SURFACE** — the glass tier (`floating` for popover/dropdown/tooltip/hover/context,
   `overlay`/`sheet` for dialog/drawer/command), warm-transmissive, with the field behind.
2. **REVEAL** — the origin-aware scale+fade+blur-settle materialize, `--ease-cartoon-punch`
   for the SPATIAL leg, `--ease-out` for the EFFECTS leg.
3. **STAGING** — the scene treatment: scrim dim + (for the modal band) page-scale, coupled
   to the surface's openness scalar.
4. **ANCHOR** — the trigger: its geometry + its relationship to the panel (the popover
   trigger's edge ↔ the dropdown trigger's edge must be ONE geometry).

Every overlay component is a **(surface tier × staging level × anchor kind)** tuple over
the SAME four-axis substrate. The family is the substrate; the components are presets. This
is the DRY thesis: **author the four axes once, the nine components are configurations.**

| Component | Tier | Staging | Anchor | Roving |
|---|---|---|---|---|
| Tooltip | floating | none | hover edge | — |
| HoverCard | floating | none | hover edge | — |
| Popover | floating | none | click edge | — |
| DropdownMenu | floating | none | click edge | menu |
| ContextMenu | floating | none | pointer pos | menu |
| Command | overlay | scrim | center | listbox |
| Dialog | overlay | scrim + scale | center/source | dialog |
| Sheet | sheet | scrim | edge | dialog |
| Drawer | sheet | scrim + scale + **detent→opacity** | bottom edge | dialog |

The ONLY axis with per-component variance is STAGING — and it varies along ONE scalar
(`--stage-t`, the openness fraction). The drawer's detent IS just `--stage-t` quantized to
snap points. **One scalar stages the whole family.**

---

## 3. THE DESIGN — `--stage-t`: the unified staging scalar (the spine)

The boldest move: **collapse the drawer's `--glass-drawer-t`, the dialog/command open
boolean, and `shouldScaleBackground` into ONE registered `@property --stage-t` (0 closed →
1 fully-staged) that drives FOUR coupled outputs through a single linear-interp ladder.**
The drawer's snap engine writes it per-frame; a plain modal flips it 0→1 on open. The same
four couplings fire for every modal-band surface; the floating band opts out (`--stage-t`
stays 0, the couplings no-op). This is the §L4 Staging principle made a real scalar — and it
RETIRES the dead `shouldScaleBackground` by replacing it with a value that actually moves
pixels.

### 3.1 `@property --stage-t` (NEW, `tokens/property-regs.css`)

```css
@property --stage-t { syntax: "<number>"; inherits: true; initial-value: 0; }
```

`inherits: true` so a wrapper sets it and the scrim + page-wrapper + sheet all read the same
value (the drawer's `--glass-drawer-t` is `inherits:false` per-element — `--stage-t` is the
SCENE scalar, inheritance-scoped to the portal subtree + the page wrapper sibling).

### 3.2 The FOUR couplings (all compositor-cheap, all on the ONE scalar)

**(A) Surface opacity → opaque-at-full (the T6 headline, the drawer detent fix).** The sheet
band lerps its plate opacity from translucent toward solid as `--stage-t → 1`. This rides
the EXISTING `--glass-level` machinery (the documented opaque-escape): drive `--glass-level`
DOWN as `--stage-t` rises is WRONG (level is opacity-direct); instead the sheet reads a
detent-coupled opacity:

```css
.glass-drawer[data-glass-drawer-snap-points] {
  /* peek/half (t<0.7) → the BD.W-SHEET-TRANSLUCENT 0.74 see-through crown;
     full (t→1) → solid --card + blur(0). ONE color-mix, the t lerps the α. */
  --sheet-stage-op: clamp(0, calc((var(--stage-t) - 0.7) / 0.3), 1); /* 0 until 0.7, →1 at full */
  background: color-mix(in oklab,
    color-mix(in oklab, var(--glass-bg-sheet), var(--card) calc(var(--sheet-stage-op) * 100%)),
    var(--glass-tint-source) var(--glass-tint-strength));
  /* the blur decongests AS it solidifies — a transmissive sheet has no reason to
     blur once it is opaque (and dropping blur at full is a Safari WIN — no wasted
     backdrop sample behind a solid plate). */
  backdrop-filter: blur(calc(var(--glass-blur-overlay-radius) * (1 - var(--sheet-stage-op)))) saturate(1.6);
}
```

The detent→opacity coupling the user demanded: peek/half stay see-through (composing
`BD.W-SHEET-TRANSLUCENT`'s 0.74 crown, NOT re-minting it), full goes solid `--card` +
`blur(0)`. Born-RED on F3 (α 0.95 fixed, blur 20px fixed at full).

**(B) Scrim opacity → the scene dims as the sheet rises.** The scrim α lerps with `--stage-t`
so a peek drawer barely dims, a full drawer dims hard:

```css
[data-stage-scrim] { background: color-mix(in srgb, var(--overlay-scrim-ink), transparent
  calc((1 - var(--stage-t) * 0.8) * 100%)); }
```

The ink is the EXISTING warm `bg-overlay-scrim-strong` token (F7), now t-coupled instead of
fixed. For plain modals (Dialog/Command) `--stage-t` flips 0→1 so the scrim fades in on the
SAME scalar — DRY with the drawer.

**(C) Page-scale → the iOS scale-down (retires `shouldScaleBackground`).** The page wrapper
scales `1 → 0.95` as `--stage-t → 1`, with a corner-radius bloom (the iOS "card recedes"
look). This is the leg `shouldScaleBackground` LIED about:

```css
[data-stage-wrapper] {
  transform: scale(calc(1 - 0.05 * var(--stage-t)));
  border-radius: calc(var(--radius-2xl) * var(--stage-t));
  transform-origin: 50% 0; /* recede toward the top, iOS */
  overflow: clip;
}
```

`shouldScaleBackground` is DELETED (no-legacy law — no alias); the prop becomes
`stage="scale"` on `<Drawer>`/`<Dialog>` (an honest enum: `none | dim | scale`), which sets
`data-stage-*` attrs. The dead boolean is gone, replaced by a value that actually moves the
compositor.

**(D) Backdrop-blur ENGAGE → the scene blurs as the overlay pulls over.** OPTIONAL, gated:
the scrim's `backdrop-filter` radius ramps `0 → deep` on `--stage-t` (the T9 engage). The §L7
Safari fence: this is a ONE-SHOT ramp over the open window (the scalar moves once), NOT a
steady-state per-frame re-blur — so WebKit pays it once, not every frame. Default OFF
(`stage="scale"` is dim+scale, no blur-engage); `stage="immersive"` opts in.

**The squish-grace on the SURFACE itself** (the §L4 anticipation): the sheet's TRANSLATE
already rides `useDrawerSnap`'s `SpringProgress` — that is the weight/inertia. The page-scale
+ scrim ride `--stage-t` which the SAME spring writes, so the whole scene moves as ONE
weighted body (the drawer pulls, the page recedes, the scrim deepens, in lockstep on one
spring clock). This is the "morph MORE on move, liquid-weight universal" law applied to the
STAGE, not just the widget.

### 3.3 Why this is the perf/cross-engine-correct mechanism

- `transform: scale()` (page wrapper) + `opacity`/`background` color-mix (scrim, sheet) +
  `border-radius` are ALL compositor-or-cheap-paint; ZERO layout property animates
  (`proof:no-layout-animation` green by construction).
- The `--stage-t` interp is a registered `@property` so the browser interpolates the NUMBER
  on the compositor where the spring writes it — the four couplings are pure `calc()` reads,
  no JS per-frame style thrash.
- Safari: no `backdrop-filter: url()`, no per-frame re-blur in the default path (the engage
  is gated to the one-shot window); the `color-mix(in oklab)` + the `-webkit-` prefix pass
  the build already runs. The page-scale `transform` is the cheapest possible WebKit move.
- PRM: `--stage-t` still flips (the staging is structure, not motion) but the SPRING that
  writes it snaps to target in one frame (`useDrawerSnap`'s `respectReducedMotion`), so the
  scene jumps to its staged state — no scale animation, no scrim fade frames. The opaque-at-
  full coupling SURVIVES PRM (it is structure: a full sheet is opaque regardless).

---

## 4. THE REVEAL — keep `.glass-reveal`, harden the clock for Safari + weight

`.glass-reveal` (F9) is already the shared origin-aware scale+fade+blur-settle on the
per-spring clock, with enter-scale 0.88 (BD.W-ANIM-IOS27-TUNE) and the SPATIAL/EFFECTS split.
It is GOOD. The lens's only moves:

1. **SPATIAL leg → `--ease-cartoon-punch × --motion-weight`** (the AUGMENT the select-forms
   amendment C2 already specs for the SAME recipe — I DEPEND on it, I do not re-mint). The
   reveal's scale/translate read the punch curve (real anticipation dip + 22% overshoot)
   scaled by `--motion-weight`; PRM weight 0 → clean fade. The whole reka overlay family
   inherits this in ONE recipe edit. **This is owned by the select-forms C2 augment +
   `BB.W-LIQUID-REVEAL` — the overlays DEPEND, no dup.**
2. **The Safari clock fence.** `.glass-reveal` interpolates `scale`/`translate`/`opacity`/
   `filter` on `linear()` springs + `transition-behavior: allow-discrete`. The `filter:
   blur()` settle on the surface's OWN pixels is Safari-safe (it is NOT `backdrop-filter`).
   VERIFY the `display`/`overlay` discrete transitions fire on WebKit (the reka portaled
   overlays are not native top-layer; the `allow-discrete` leg is the fragile WebKit bit) —
   the gate captures BOTH engines.
3. **`W-LIQUID-REVEAL-FIX` reconcile.** The JS `useLiquidReveal` source-rect bloom (dialog-
   from-button) is reported BROKEN (the union wave). The CSS `.glass-reveal` floor is what
   EVERY overlay rides; `useLiquidReveal` is the REFINEMENT (Dialog/Command from their
   trigger rect). My design does NOT depend on the JS bloom for the floor — every overlay is
   correct on the CSS recipe alone; the JS bloom is the bonus. So `W-LIQUID-REVEAL-FIX` and
   this lens are INDEPENDENT (it fixes the refinement; I harden the floor). Cross-pointed,
   not duplicated.

**No new reveal mechanism. The reveal is already one register; the lens hardens its clock +
DEPENDS on the punch/weight mint.**

---

## 5. POPOVER ↔ DROPDOWN CONGRUENCE — the trigger register (the user's flag #2)

The surface + reveal are already congruent (F9). The DIVERGENCE the user sees is the
**TRIGGER** (F10): `DropdownMenuTrigger` is bare `outline-none`, `PopoverTrigger` is bare —
each leaves geometry to the consumer, so a popover trigger and a dropdown trigger styled by
two different authors look different. **The fix is a shared trigger register, KISS:**

1. **`.overlay-trigger` recipe** (NEW, the SMALLEST new surface — in `menu.css`, the shared
   register home): the congruent trigger geometry — the `.glass-capsule-hover` edge + rest/
   hover/active/`[data-state=open]` states + the `--glass-edge-floor` (DEPEND, tabs GOLDEN +
   glass-material, same as select-forms). Popover/Dropdown/HoverCard/Tooltip triggers ALL
   compose it via their `Trigger` wrapper's default class.
2. **The `[data-state=open]` trigger pressed-state is SHARED** — when the panel is open, the
   trigger reads the same active glass plate (the dropdown's open-trigger and the popover's
   open-trigger are byte-identical). This is the "at least style them the same" — they ARE
   the same register now.
3. **Anchor geometry parity** — both ride reka's `--reka-popper-transform-origin` (already
   the `.glass-reveal` origin), so the panel blooms from the trigger edge identically. No
   per-component popper config.

**One register, two consumers — the popover trigger and the dropdown trigger are now the
SAME `.overlay-trigger` + the same `.glass-reveal` panel + the same `surfaceClass` glass.
The only difference is the CONTENT (a popover holds arbitrary slot content; a dropdown holds
`.glass-menu-row` items) — which is correct, not a divergence.**

---

## 6. WARM-GLASS — the §3 BOTH root causes (already mostly closed; the overlay arm)

The §3 thesis: glass reads warm because (#1) a COLORFUL FIELD transmits through it +
(#2) a real warm-floor decl, not luminance-only. Live (F1/F2): the warm FLOOR is already
shipped on the floating band (BA.W-NO-GRAY). What the overlay band lacks is the FIELD
behind the portal — the SAME hole the select-forms amendment closes for the menu:

1. **DEPEND `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT`** (`--field-h`, `paper-field`) — the
   colorful field. UNSET on disk (F8); it is the page-background sibling's mint.
2. **The portal-field re-emit** — the SAME `.glass-field-portal::before` recipe the select-
   forms D1.1 mints in `menu.css` (the shared register). `inset: 0` (clipped INSIDE the
   panel — bends THROUGH the plate as real L-variance, NOT an inset halo leaking around the
   box; §L7 "no filter on an ancestor of the glass" — this is a painted layer BEHIND, z −1,
   NO backdrop-filter on it). The overlay family re-emits the field on its portal root the
   SAME way the Select does. **This is the select-forms recipe generalized to the whole
   overlay family — I DEPEND on it + widen the `data-field-palette` re-emit to the dialog/
   command portal roots; no new mechanism.**
3. **DEPEND the `--overlay-tint-floor` AUGMENT** (select-forms C1, on `W-GLASS-ABROGATE-GRAY`)
   — the overlay-band warm floor + the `--glass-bg-opaque` warm arm for the PRM opaque-escape.
   Already specced for `[data-slot=popover-content]`/`[data-slot=dropdown-menu-content]` —
   the overlay lens INHERITS it, adds `[data-slot=dialog-content]`/`[data-slot=command-…]`.

**The overlay warm-glass is the select-forms warm-glass generalized — same field, same floor,
same portal re-emit. The lens DEPENDS, widens the selector list, does NOT re-mint.**

---

## 7. A11y / cross-engine / PRM carve

- **Focus trap + escape + roving** — owned by reka (`DialogContent` traps + restores;
  `DropdownMenu`/`ContextMenu` roving; `Command` listbox). UNTOUCHED — the glass is paint,
  the a11y is reka. The lens adds ZERO a11y surface, so it cannot regress it. The gate
  asserts trap + escape + roving survive (anti-regression).
- **PRM** — `--stage-t` flips structurally (opaque-at-full survives); the spring snaps; the
  reveal collapses to fade; the page-scale animation is suppressed (the scale value still
  applies but jumps). `prefers-reduced-transparency` → the warm `--glass-bg-opaque` arm (the
  select-forms C1 mint) so the opaque overlay reads WARM not gray.
- **Cross-engine** — every coupling is compositor `transform`/`opacity`/cheap-paint;
  `color-mix(in oklab)` + `-webkit-` prefix pass the build; NO `backdrop-filter: url()`; the
  blur-engage is one-shot-gated (§L7). The gate is a PAIRED chromium+webkit π.
- **`prefers-contrast: more`** — the scrim ink floors up, the trigger edge floors up (the
  inked affordance is a legibility asset, §Shadows).

---

## 8. THE WAVE AMENDMENT — reconcile vs the 116-wave set (no dup)

The DELTA-ASSAY produces this. The overlay family is mostly DEPEND + AUGMENT (the select-
forms precedent proved the dedup discipline). The net:

### DEPEND (no new wave — the mint lands in a sibling/extant wave)
| concern | DEPEND-ON | what overlays consume |
|---|---|---|
| warm field + `--field-h` | `BD.W-PAGE-FIELD`/`BD.W-FIELD-SCRIPT` | the field behind the portal |
| overlay warm floor + opaque arm | `W-GLASS-ABROGATE-GRAY` (select-forms C1 augment) | `--overlay-tint-floor`, `--glass-bg-opaque` |
| punch + weight | `BD.W-CARTOON-PUNCH`/`BD.W-MOTION-WEIGHT` | the reveal SPATIAL clock |
| reveal re-clock | `BB.W-LIQUID-REVEAL` (select-forms C2 augment) | the shared `.glass-reveal` upgrade |
| portal-field re-emit recipe | select-forms D1.1 (`menu.css`) | the SAME `.glass-field-portal::before`, selector widened |
| trigger edge | tabs GOLDEN `.glass-capsule-hover` + glass-material `--glass-edge-floor` | the `.overlay-trigger` edge |
| see-through sheet rung | `BD.W-SHEET-TRANSLUCENT` (union, on-disk) | the peek/half 0.74 crown (the LERP floor, t<0.7) |
| broken JS bloom | `W-LIQUID-REVEAL-FIX` (union) | independent — fixes the refinement, not the floor |
| surface axis | `BC.W-OVERLAY-UNIFORM` (SHIPPED) | the `surfaceClass` glass·veil·opaque already threaded |

### AUGMENT (widen extant in place)
- **`W-GLASS-ABROGATE-GRAY`** — widen the `--glass-bg-floating-tinted` `:where()` + the
  `--overlay-tint-floor` to `[data-slot=dialog-content]`/`[data-slot=command-…]` (the select-
  forms C1 already adds popover/dropdown; this adds the modal band).
- **`menu.css`** — the `.glass-field-portal::before` (select-forms D1.1) widened + the NEW
  `.overlay-trigger` register (the one new recipe).

### NEW (the overlay-owned legs the siblings do not cover)
- **NEW `BD.W-OVERLAY-STAGE-COUPLE`** — the headline. `@property --stage-t` + the FOUR
  couplings (surface-opaque-at-full / scrim-dim / page-scale / blur-engage-gated) + the
  `stage="none|dim|scale|immersive"` enum on `<Drawer>`/`<Dialog>`/`<Sheet>`/`<Command>` +
  the DELETION of `shouldScaleBackground` (no-legacy). RE-POINTS `drawer.css` + the page
  wrapper; ZERO new paint path. This SUBSUMES the empty `W-DRAWER-DETENT-GLASS` stub (the
  union `W-DRAWER-DETENT-GLASS.md` is a 0-byte placeholder — this IS its content, generalized
  from drawer-only to the whole modal-band stage). The detent→opacity is coupling (A); the
  page-scale is coupling (C); the dead-knob retire is the `stage=` enum.
- **NEW `BD.W-OVERLAY-TRIGGER-CONGRUENCE`** — the `.overlay-trigger` register +
  Popover/Dropdown/HoverCard/Tooltip trigger wrappers compose it; the `[data-state=open]`
  shared pressed-plate. The user's flag #2, KISS.

### RECONCILE LEDGER
| collision | reconciled to | why |
|---|---|---|
| `W-DRAWER-DETENT-GLASS` (empty union stub) | **fold into `BD.W-OVERLAY-STAGE-COUPLE`** | the drawer detent→opacity is coupling (A) of the unified stage; a drawer-only wave would fork the staging the modal band shares. The stub is unwritten → no content lost. |
| `BD.W-SHEET-TRANSLUCENT` (resting α 0.74) | **DEPEND — it owns t<0.7 (peek/half); STAGE-COUPLE owns the lerp t→1 (full→opaque)** | TRANSLUCENT sets the see-through FLOOR; STAGE-COUPLE lerps it toward opaque at full. Complementary endpoints of the SAME `--glass-bg-sheet` rung, no overlap. |
| `BC.W-OVERLAY-UNIFORM` (surface axis SHIPPED) | **DEPEND — surface already one register** | the lens adds staging + trigger, not surface. |
| select-forms `BD.W-SELECT-WELL` (portal-field, accent chip) | **share the `menu.css` recipes; the overlay widens selectors** | the menu register is shared by construction; no fork. |

**NET: 2 NEW waves (`BD.W-OVERLAY-STAGE-COUPLE` headline + `BD.W-OVERLAY-TRIGGER-CONGRUENCE`)
+ 2 AUGMENTs (`W-GLASS-ABROGATE-GRAY`, `menu.css`) + 9 DEPEND edges.** The empty
`W-DRAWER-DETENT-GLASS` stub is SUBSUMED (its content IS coupling A+C). No duplication: the
warm-glass + reveal + surface are sibling/shipped-owned; the lens owns ONLY the stage scalar
+ the trigger register.

---

## 9. THE GATE — `proof:overlay-stage` (born-RED, painted-pixel, paired-engine)

The cardinal rule: sample the COMPOSITED painted pixel of the REAL overlay over the REAL
page (full-page screenshot → `getImageData`), through a REAL open/close gesture — NEVER
`getComputedStyle` over a hardcoded field, NEVER synthetic arithmetic. Chromium + WebKit,
both modes, real gestures.

- **G1 warm-not-gray** — every overlay surface composites painted C ≥ 0.02 warm + L-variance
  stdev ≥ 0.01 on the INTERIOR (the field transmits), BOTH modes. Born-RED if `--field-h`
  unset (the floor alone is the amplifier; the field is the guarantee — the select-forms C1
  inverted-framing).
- **G2 the A/B field delta** — overlay-over-field vs overlay-over-flat, ΔC ≥ 0.015, dark arm
  required.
- **G3 reveal** — ABSOLUTE pre-dip ≥1% below closed + overshoot ≥2% above 1.0, measured via
  compositor-frame trace (NOT main-thread `getComputedStyle` — scale runs off-thread), BOTH
  engines.
- **G4 DRAWER OPAQUE-AT-FULL** — the headline born-RED. Drag the drawer peek→half→full
  through the REAL handle gesture; sample the composited sheet `background-color` α AND the
  page-bleed-through at each detent: **α translucent at peek/half (≤0.8, page bleeds) AND
  α→~1 at full (page does NOT bleed), blur→0 at full.** Born-RED on F3 (α 0.95 fixed at full,
  blur 20px fixed).
- **G5 PAGE-SCALE** — `stage="scale"`: the page wrapper `transform` matrix scale measurably
  shrinks `1→~0.95` as the drawer/dialog opens; born-RED on F4 (`transform: none`) + the
  **dead-knob bite**: `shouldScaleBackground` no longer exists (grep 0) and `stage="scale"`
  animates real pixels.
- **G6 SCRIM-DIM-COUPLE** — the scrim α tracks `--stage-t` (peek dims less than full);
  born-RED on the fixed-α scrim.
- **G7 TRIGGER CONGRUENCE** — the popover trigger and the dropdown trigger composite
  byte-identical edge/hover/`[data-state=open]` plates (sample both, ΔE ≈ 0); born-RED on
  F10 (bare triggers diverge by consumer).
- **G8 a11y anti-regression** — focus trap holds, escape closes, roving works, on every
  overlay (reka untouched — assert it stays).
- **G9 PRM** — clean fade, opaque-at-full SURVIVES, page-scale jumps (no anim), warm opaque
  arm present.
- **G10 cross-engine** — the paired chromium+webkit capture for G3/G4/G5; no
  `backdrop-filter:url`, no per-frame re-blur (the engage is one-shot-gated).
- **G11 anti-evasion ≥6 bites** — the dead-knob bite (G5), the fixed-α-full bite (G4), the
  fixed-scrim bite (G6), the bare-trigger-diverge bite (G7), the field-unset-fails bite (G1),
  the multi-open frame-series (open/close ×5, no reload — the `@property --stage-t`
  stale-latch).

**Born-RED on HEAD (live-verified this pass):** F3 sheet α 0.95 + blur 20px at full
(not opaque); F4 page `transform: none` (no scale); F5 `shouldScaleBackground` read by
nothing; F6 `--glass-level: 1` constant (no detent coupling); F7 scrim α fixed 0.8;
F8 `--field-h`/`--overlay-tint-floor`/`--stage-t`/`--ease-cartoon-punch`/`--motion-weight`
UNSET; F10 bare triggers. Genuine.

---

## 10. The single boldest move + the gestalt

**Boldest:** `--stage-t` — ONE registered scalar that the drawer's snap-spring writes per
frame and that drives FOUR coupled scene outputs (surface-opaque-at-full · scrim-dim ·
page-scale · blur-engage) through pure `calc()` reads, so the whole staged scene moves as
ONE weighted body on ONE spring clock — and it RETIRES `shouldScaleBackground` by replacing
the dead boolean with a value that actually moves the compositor. The drawer detent, the
dialog open, and the iOS scale-down become configurations of the SAME scalar.

**Gestalt:** every overlay reads warm transmissive floating glass (the field transmits, both
modes — DEPEND the shipped warm floor + the page field), the reveal is the liquid punch-
clocked `.glass-reveal` (DEPEND the punch/weight augment), the drawer goes see-through at
peek/half and SOLID at full while the page recedes and the scrim deepens in lockstep on one
spring (the `--stage-t` couplings — the NEW headline), and the popover trigger + the dropdown
trigger are ONE `.overlay-trigger` register over ONE `.glass-reveal` panel (the NEW congruence
recipe). Two new waves, two augments, nine depends — the family was already one register on
three axes; the lens closes the fourth (staging) + the trigger, and does it with zero new
paint path, compositor-only, Safari-honest.
