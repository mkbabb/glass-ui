# Overlays greenfield — LENS A (pure iOS-27 fidelity)

> The OVERLAY family redesigned from first principles: **Sheet · Drawer(+detent) ·
> Dialog · Popover · DropdownMenu · Tooltip · HoverCard · ContextMenu · Command**.
> One floating-glass register, one reveal recipe, one staging machine. The lens:
> maximal iOS-27 Liquid-Glass fidelity — transmissive warm-cream glass, liquid
> reveal with weight, the drawer that goes opaque-at-full, popover↔dropdown as ONE
> surface — deftly UNIONED into the extant ecosystem, no per-overlay fork.

---

## 0. The live read (painted-pixel + real gestures, both modes, chrome-devtools)

Sampled live on `localhost:5173` over the real `/containers/*` routes with real
open/close gestures + `getComputedStyle` OKLab readback. The status quo is **much
healthier than the brief feared** — the BC.W-OVERLAY-UNIFORM wave already unified the
panel glass. The real RED lives in the drawer coupling + the staging.

**Panel glass — already WARM + already UNIFIED (born-GREEN, do not re-fork):**

| Surface | bg (live OKLab) | backdrop-filter | radius | reveal |
|---|---|---|---|---|
| Dropdown content | `oklab(0.936 +.0056 +.013 / 0.808)` | `blur(13px) saturate(1.6)` | 12px | `glass-reveal` ✅ |
| Popover content | `oklab(0.936 +.0056 +.013 / 0.808)` | `blur(13px) saturate(1.6)` | 12px | `glass-reveal` ✅ |
| Dialog content | `oklab(0.930 +.0056 +.013 / 0.693)` | `blur(13px) saturate(1.6)` | 16px | `glass-reveal` ✅ |
| Drawer sheet (light) | `oklab(0.974 +.0057 +.014 / 0.95)` | `blur(20px) saturate(1.6)` | panel | (no reveal — slide) |
| Drawer sheet (dark) | `oklab(0.295 +.011 +.019 / 0.96)` | `blur(20px) saturate(1.6)` | panel | — |

The chroma terms are POSITIVE (+a warm-red, +b warm-yellow) in **both** modes — the
BA.W-NO-GRAY warm floor holds; nothing reads gray. **Dropdown and popover panels are
byte-identical** (same bg/blur/border/radius/transform-origin) — the "why are these
different, style them the same" flag is **already 90% answered**. The only legitimate
divergence is padding (`--overlay-pad-inline: --spacing(1)` ≈4px for the tight menu vs
`1rem` for the breathing popover content) — and that divergence is *correct* (a menu
wants tight rows; a content popover wants air). The congruence ask is therefore a
**trigger-geometry + a documentation/perception** fix, not a panel rebuild.

**Drawer detent → glass coupling: DEAD (born-RED, the headline).** Drove
`--glass-drawer-t` across the full detent ladder live:

```
t=0.12 → bg α 0.96, --glass-level 1
t=0.40 → bg α 0.96, --glass-level 1
t=0.70 → bg α 0.96, --glass-level 1
t=1.00 → bg α 0.96, --glass-level 1
```

The sheet α is **constant at every detent** — peek looks as solid as full. `--glass-
drawer-t` drives ONLY `translateY` (DrawerContent.vue:96–108); the glass tier is a
FIXED `--glass-bg-overlay`/`--glass-blur-overlay` for ALL detents (drawer.css:50–74).
**`shouldScaleBackground` animates ZERO pixels** — `getComputedStyle(#app).transform`
returns `none` with the drawer open at any detent. The prop is declared + documented
(Drawer.vue:45) and **read by nothing** (grep: zero `scale(`/scrim-coupling in the
drawer dir). Confirmed dead-knob lie.

**Staging (§L4) — partial.** Dialog + Drawer paint a backdrop-dim scrim (the reka
overlay), and it reads correctly (warm dim, page legible-behind). But the underlying
page **does NOT recede** (no `scale(lerp(1, 0.94, …))` on the app root) — the iOS
"the page sinks back as the modal rises" depth cue is absent across the whole family.

**Reveal — present + warm, but flat-bezier exit + no cartoon weight.** `.glass-reveal`
blooms from `--reka-popper-transform-origin` on `--spring-snappy` (scale 0.88→1, blur
4px→0, opacity), exit on `--ease-out`. Correct and Safari-honest (the blur rides
`filter`, never `backdrop-filter:url`). But it carries **no `--motion-weight` squish
asymmetry** and **no `--ease-cartoon-punch` anticipation** — it is the calm floor, not
the audacious cartoon arrival the edicts call for.

**SOURCE-VERIFY of cited tokens (the BUILD-DAG fence).** Grepped `src/`:
- `--spring-{smooth,snappy,bouncy,gentle}` + per-spring `-duration` clocks + `--ease-
  out-expo` + `--ease-out`/`--ease-standard` + `--glass-level` + `--glass-tint-*` +
  `[data-surface]` axis + `.glass-reveal` + `--overlay-min-width`(8rem) + `--overlay-
  max-block`(60vh) + `--overlay-pad-inline` + `--radius-panel`(12px) — **ALL EXTANT.** ✅
- `--ease-cartoon-punch`, `--motion-weight`, `.glass-capsule` — **DO NOT EXIST in
  `src/`.** They are design.md §L2/§L4/§Easing *promulgated* tokens, specced by the
  Band-0 `cartoon-shadow` + `motion-spring-register` greenfields but **NOT YET BUILT.**
  This design **DEPENDS-ON** them (BUILD-DAG order: Band-0 lands first), and supplies a
  graceful floor that works **without** them (so the overlay wave is not blocked).

---

## 1. The core idea — ONE floating-glass overlay register, three coupling scalars

Every overlay in the family is the SAME surface (`.glass-floating` + `[data-surface]`
+ `.glass-reveal`) decorated by at most **three coupling scalars** that the family
already half-speaks:

| Scalar | Range | Drives | Today | Greenfield |
|---|---|---|---|---|
| `--glass-reveal-*` | discrete open/closed | the BLOOM (scale·blur·opacity·origin) | ✅ shipped | + cartoon weight (§3) |
| `--glass-drawer-t` | 0→1 continuous | the drawer DETENT translate | ✅ translate only | + **glass·scrim·scale coupling** (§4) |
| `--overlay-stage-t` | 0→1 (NEW) | the SCRIM-dim + PAGE-recede staging | ✗ absent | **new shared seam** (§6) |

The thesis: **the overlays don't need new components — they need the three scalars
fully wired into the ONE `--glass-level` machinery that already exists.** The drawer's
opaque-at-full is `--glass-drawer-t → --glass-level`. The staging is `--overlay-stage-t
→ scrim α + page scale`. The reveal is the extant recipe + the (depended-on) cartoon
weight. No fork, no parallel system — three `calc()` couplings onto extant knobs.

---

## 2. The unified floating-glass surface (Popover ↔ Dropdown congruence)

**The panel is ALREADY one register.** The fix is to make the *congruence explicit +
tokenized* so it can never drift, and to unify the TRIGGER geometry:

### 2a. Panel — formalize the shared recipe as `.overlay-panel`
Today three SFCs hand-write the same class soup
(`'… z-popover … rounded-panel border … glass-reveal'` + `glass-floating` +
`--overlay-pad-*`). DRY it into ONE `@utility overlay-panel` that bakes the shared
axes, leaving only the per-overlay padding knob:

```css
/* glass/overlay.css — the ONE floating-overlay panel recipe */
@utility overlay-panel {
  /* tier + reveal + edge + radius + the φ pad ladder, in one place */
  /* (composes .glass-floating .glass-reveal — NOT a re-decl of their props) */
  border-radius: var(--radius-panel);
  z-index: var(--z-popover);
  min-inline-size: var(--overlay-min-width);
  max-block-size: var(--overlay-max-block);
  /* the φ pad ladder default — overlay-pad-block = inline × 1.272 (√φ·√φ ≈ φ) */
  --overlay-pad-inline: 1rem;
  --overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272);
  padding-inline: var(--overlay-pad-inline);
  padding-block: var(--overlay-pad-block);
}
```

- **Dropdown / Context / Command / Sub-content** compose `overlay-panel` + the menu
  override `[--overlay-pad-inline:--spacing(1)]` (tight rows; the rows own their own
  py via `menuItemVariants`). One line each.
- **Popover / HoverCard** compose `overlay-panel` bare (the breathing 1rem default).
- **Tooltip** composes `overlay-panel` + a `--overlay-pad-inline:0.5rem` + a smaller
  radius token (a tooltip is the *small* member — but the SAME register).
- **Dialog** composes `overlay-panel` but swaps tier→`glass-overlay` (modal-band) +
  `rounded-dialog` radius. SAME recipe, heavier tier.
- **Result:** popover and dropdown are provably one surface (same `@utility`), and the
  only knob that differs is the documented `--overlay-pad-inline` (menu-tight vs
  content-breathing). The "style them the same" flag is closed *structurally*.

### 2b. Trigger — ONE pill-glass trigger geometry
Both triggers already resolve `btn-pill` + `btn-glass` + `glass-wash` (verified live —
radius 9999px, `oklab(0.88 … /0.33)` wash). Formalize this as the canonical
`PopoverTrigger`/`DropdownMenuTrigger`/`TooltipTrigger` default (`<Button variant="pill"
surface="glass-wash">` semantics) so a consumer gets a congruent trigger for free, and
the open-state `aria-expanded`/`data-state="open"` lights the SAME `--glass-bg-resting-
tinted` plate on every trigger in the family. The trigger's reveal `transform-origin`
is the popper's anchor edge (already wired via `--reka-popper-transform-origin`) so the
panel blooms FROM the trigger — the spatial tie that makes them read as one gesture.

---

## 3. The reveal — liquid, weighty, cartoon-punched, Safari-honest

Keep `.glass-reveal` (it is fit). REFINE it with the cartoon register **as a
depended-on augmentation** (the Band-0 `--ease-cartoon-punch` + `--motion-weight`):

### 3a. The graceful floor (works TODAY, no Band-0 dep)
- Enter scale `0.88 → 1` on `--spring-snappy` (✅ shipped, the vol-preserving squish-grow).
- Couple a **volume-preserving X·Y asymmetry** into the bloom: a surface that blooms
  also *over-widens then settles* — `scale-x: 0.88·(1+k)`, `scale-y: 0.88·(1−k)` at the
  apex, k≈0.06 — so it reads as liquid squash&stretch, not a uniform zoom. This is the
  `useLiquidFlex` vol-preserving idiom expressed on the open keyframe; compositor-only.
- Exit stays `--ease-out` (NO overshoot past gone — the P2 doctrine). ✅ keep.

### 3b. The cartoon arrival (DEPENDS-ON Band-0)
- When `--ease-cartoon-punch` lands, the SPATIAL leg of an **opt-in loud** overlay
  (`<Dialog motion="cartoon">`, celebration sheets) swaps `--spring-snappy →
  --ease-cartoon-punch`: a real ~4% anticipation dip (the panel pulls *back into* its
  anchor before blooming) → ~22% punch overshoot → settle. No damped spring can express
  the pre-dip; the shaped `linear()` is the only mechanism (design.md §L2).
- `--motion-weight` (rest `1/φ≈0.62`) co-scales the squish depth + overshoot share +
  the cartoon-shadow travel so the bloom + the moving cast read as ONE proportioned
  deformation. The dock/celebration overlays push toward 1; tooltip rests near 0 (a
  tooltip is a whisper, not a punch).
- **Cartoon shadow on the panel:** the floating overlay opts into `.shadow-cartoon-md`
  (the layered-offset technicolor cast) whose offset travels OPPOSITE the bloom (the cel
  light stays fixed while the panel rises) on a `::after` caster — never an animated
  `box-shadow` (§L7 compositor fence).

### 3c. Safari / PRM (the §L7 hard gate)
- The blur-settle rides the surface's OWN `filter: blur()` (NOT `backdrop-filter:url`)
  — already correct, keep. The resting `glass-floating` backdrop-filter is untouched by
  the open `filter:blur(0)` (the two-filter trap avoided).
- `linear()` springs + the cartoon `linear()` are WebKit-native. The acceptance proof
  is a **paired-engine π frame-series** (Chromium AND WebKit) showing the squish (scale
  ≠ 1 mid-flight, X·Y≈1) + fade + settle, on the enrolled overlays.
- PRM → scale/translate/blur snap to endpoints; opacity fade survives on `--duration-
  fast`; `--motion-weight: 0` zeroes the squish + the cartoon pre-dip in one assignment.
  `--ease-cartoon-punch → --ease-standard`. ✅ the recipe already carves this.

---

## 4. THE DRAWER DETENT — opaque-at-full + scale-the-background (the headline RED)

The single biggest build. Couple `--glass-drawer-t` (the EXTANT snap-fraction scalar,
already written per-frame by `useDrawerSnap`) into the EXTANT `--glass-level` machinery
+ a new scrim + the page-scale. **No new engine — three `calc()` couplings.**

### 4a. Detent → glass opacity (the opaque-at-full)
Peek/half stay transmissive `glass-overlay`; the fraction lerps toward the opaque
escape (`--glass-level: 0` → solid `--card` + `blur(0)`, the W54 `.glass-opaque`
endpoint via the ONE level path). The level is a piecewise lerp — translucent below a
"commit" threshold (≈0.85), driving to opaque only in the final detent reach:

```css
.glass-drawer[data-glass-drawer-snap-points="true"] {
  /* t below the commit floor → full glass (level 1); t→1 → opaque (level 0).
     The lerp is the SAME --glass-level knob the whole ladder reads. */
  --drawer-commit: 0.85;
  --glass-level: clamp(0, calc((1 - var(--glass-drawer-t)) / (1 - var(--drawer-commit))), 1);
}
```

> **The substitution-vs-inheritance trap (the recurring live-found class).** The
> `--glass-bg-overlay` token bakes `var(--glass-level)` at its `:root` DECLARATION, so a
> per-element `--glass-level` does NOT re-resolve the baked token (surface-axis.css:67
> documents this exact trap). So the coupling must compose the plate **AT THE ELEMENT**:
> `background: color-mix(in oklab, <glass-overlay-tinted>, var(--card) calc((1 −
> level)·100%))` — a per-element lerp from the transmissive tint toward solid `--card`,
> + `backdrop-filter: blur(calc(20px · level))` so the blur decays to 0 as it solidifies.
> This mirrors how `[data-surface="opaque"]` already composes its solid plate at the
> element (drawer.css:101–116). Born-RED on today's fixed α-0.96 sheet (proven live).

### 4b. Detent → scrim opacity (the new `--overlay-stage-t` seam, §6)
The scrim dim deepens with the detent: `--overlay-stage-t: var(--glass-drawer-t)` feeds
the shared staging machine — the DrawerOverlay scrim α lerps `0 → --scrim-max` as the
sheet rises (peek = barely-there dim, full = committed dim). Reuses the new seam, no
drawer-local scrim recipe.

### 4c. Detent → page recede (`shouldScaleBackground`, WIRED — the dead-knob fixed)
`shouldScaleBackground` becomes REAL: when true, the staging machine scales the app
root `scale(calc(1 − var(--overlay-stage-t) · 0.05))` (lerp 1 → 0.95) + a small
`border-radius` + `translateY` so the page visibly sinks back behind the rising sheet
— the iOS modal depth cue. Wired via the §6 staging machine (a `[data-overlay-stage]`
attribute on the app root + a `--overlay-stage-t` the open overlay writes). The page-
scale is a single compositor `transform` on the root, PRM-carved. **If the build
prefers to retire the knob instead of wiring it: delete `shouldScaleBackground` from
the props entirely (NO legacy alias) — but the iOS-fidelity lens WIRES it, because the
page-recede is a genuine iOS-27 signature the family lacks.**

### 4d. PRM / a11y
`useDrawerSnap` already jumps `--glass-drawer-t` deterministically under PRM (zero
motion frames) — so the level/scrim/scale couplings inherit the PRM-jump for free (they
are pure functions of `t`). The page-scale `transform` is suppressed under PRM (the
recede is spatial). The opaque-at-full *legibility* survives PRM (it is not motion).

---

## 5. The scrim + the staging machine (§L4) — ONE shared seam for the whole family

A new `useOverlayStage` composable + a `--overlay-stage-t` scalar + a `[data-overlay-
stage]` attribute on the app root. ANY overlay that wants staging (Dialog, Sheet,
Drawer-modal, Command) registers on open; the machine:
- ramps `--overlay-stage-t: 0 → 1` on `--spring-snappy` (Drawer drives it continuously
  off `--glass-drawer-t` instead);
- the scrim (a single shared `.overlay-scrim` element, warm-tinted transmissive — NOT
  flat black: `color-mix(in oklab, var(--foreground) <α>, transparent)` so it reads
  warm-brown over a cream page, the v3 f012 reference) lerps its α + an optional
  backdrop-blur-engage (the T9 `--glass-blur-engage-t`, gated to the pull window, §L7
  Safari fence — one-shot, never a steady-state re-blur);
- the app root recedes `scale(1 − t·0.05)` (opt-in per overlay).
- **Glass-cannot-sample-glass fence (§L1):** the scrim's backdrop-blur-engage and the
  panel's backdrop-filter must NOT stack at the same z without a composition container —
  the scrim sits BELOW the panel in the monotone Z-stack (scrim `--z-modal − 1`, panel
  `--z-modal`), never overlapping filters. The goo/filter is NEVER on an ancestor of the
  glass panel (§L7) — the staging transform on the app root is `transform` only, no filter.

Reused by Sheet (side slide-in over staged page), Dialog (scale-in over staged page),
Command palette (the spotlight bloom over a deep-staged + blur-engaged page). ONE seam.

---

## 6. a11y / cross-engine carve (the family-wide contract)

- **Focus trap + Escape + roving:** reka owns the trap/escape/roving for Dialog/Drawer/
  Popover/Dropdown/Context/Command (kept — it is fit). The veil/opaque surface axis +
  the staging are pure CSS over reka's headless substrate, so the a11y semantics are
  untouched. Tooltip/HoverCard stay non-trapping (hover-intent, `aria-describedby`).
- **`prefers-reduced-transparency`:** the whole family floors toward the opaque escape
  (`--glass-level → 0`) via the SAME knob — a no-transparency user gets the solid `--card`
  panels for free, the reveal degrades to the opacity-only fade.
- **`prefers-contrast: more`:** the panel edge-rim + the cartoon cast opacity floor UP
  (the inked edge is a legibility asset, design.md §Shadows).
- **Cross-engine (§L7 paired-π gate):** every reveal/scrim/blur-engage channel names its
  WebKit arm — `filter:blur` (safe), `backdrop-filter:blur` gated to the pull window,
  NO `backdrop-filter:url`, sRGB color-interp on any goo, compositor-only transform/
  opacity. Acceptance = a Chromium **AND** WebKit π capture, both modes.

---

## 7. DELTA-ASSAY → wave amendment (reconcile vs the 116-wave set, no dup)

| Wave | Disposition | Scope |
|---|---|---|
| **`W-DRAWER-DETENT-GLASS`** (extant, union/waves) | **KEEP + EXTEND** | §4a glass-coupling stays the headline; ADD §4c page-recede (wire/retire `shouldScaleBackground`) + §4b scrim-coupling folded in (the brief's `W-DRAWER-SCALE-SCRIM` fold). Born-RED proof: live α-constant-across-detents (captured) + `#app` transform `none`. |
| **`W-OVERLAY-PANEL-RECIPE`** (NEW, small) | ADD | §2a — DRY the three SFCs' class soup into ONE `@utility overlay-panel`; formalize the popover↔dropdown congruence structurally so it can't drift. Retires the per-SFC class repetition (DRY, not a behavior change → byte-stable). |
| **`W-OVERLAY-STAGE`** (NEW) | ADD | §5/§6 — the shared `--overlay-stage-t` + `.overlay-scrim` (warm transmissive, not black) + `useOverlayStage` (page-recede + scrim + opt-in blur-engage). The §L4 staging seam the whole family lacks. |
| **`W-LIQUID-ENTRANCE-GENERAL`** (extant, T10) | **DEPEND-ON** | §3 — the overlay reveal CONSUMES the cartoon-weight augmentation; do NOT re-author the cartoon register here (it is the Band-0 / T10 deliverable). The overlay wave is the consumer. |
| **`W-BACKDROP-BLUR-ENGAGE`** (extant, T9) | DEPEND-ON | §5 — the Command/Sheet staging consumes the blur-engage ramp; gated to the pull window. |
| **`BC.W-OVERLAY-UNIFORM`** (shipped) | SUPERSEDED-BY `W-OVERLAY-PANEL-RECIPE` | the panel uniformity it shipped is PROVEN live; the new wave only formalizes it into a `@utility` + adds the trigger congruence. NO behavior regression. |

**No dup:** the drawer headline rides the existing `W-DRAWER-DETENT-GLASS`; the reveal
rides the existing `W-LIQUID-ENTRANCE-GENERAL`; only the panel-DRY + the staging seam
are net-new waves, and both are KISS couplings onto extant machinery.

---

## 8. Convergence

- **Panel warm-glass + popover/dropdown congruence:** ~92% (live-proven unified; only
  the `@utility` DRY + trigger formalization remain).
- **Reveal liquid/weighty:** ~65% (graceful floor ships; cartoon-punch + motion-weight
  are depended-on Band-0 deps, not extant — the honest gap).
- **Drawer detent → opacity/scrim/scale:** ~15% (DEAD today — α constant, `#app` un-
  scaled, `shouldScaleBackground` a confirmed dead-knob lie; this is the real build).
- **Staging machine:** ~30% (scrim-dim ships via reka; page-recede + warm-scrim + the
  shared `--overlay-stage-t` seam are net-new).
- **a11y / cross-engine:** ~90% (reka trap/escape/roving fit; the §L7 paired-π gate is
  the remaining verification, not a build).

**Overall ~58%** — the family is panel-glass-CONVERGED but **coupling-bound** on the
drawer + staging, and **dependency-bound** on the cartoon reveal. The bold work is the
drawer's three-scalar coupling onto `--glass-level`; everything else is DRY + depend-on.
