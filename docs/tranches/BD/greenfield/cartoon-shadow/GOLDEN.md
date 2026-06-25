# Cartoon-shadow register — GOLDEN (the canonical synthesis)

> The single reference design for the CARTOON-SHADOW register, synthesized from the three
> greenfield lenses (A pure-fidelity, B cross-engine/perf, C audacious-punch). It UNIONS onto the
> landed `--shadow-cartoon-{sm,md,lg}` / `.cartoon-surface` / `<Card surface="cartoon">` carriers —
> no parallel fork, no legacy. Tranche-DEV only (build is W-CUT/user-gated). Perfect in **Chrome AND
> Safari**.
>
> **HARDENED 2026-06-24 (`DELTA-ASSAY.md §2`, five challenge-folds — read these before building):**
> - **H1 (proven live DEAD):** register `--cartoon-press-t`/`--cast-travel`/`--cast-spread` as
>   `@property` too — the spike's punch reads `0px` without them (the §4 caster is non-functional as
>   originally drafted).
> - **H2:** the `::before` is OCCUPIED by the glass catch-light on the real carrier (§4a's "free"
>   premise is false) → the caster rides an **inert `<span class="cartoon-cast" aria-hidden>` child**
>   the Card emits, NOT a pseudo. (One honest small SFC edit — NOT "zero SFC".)
> - **H3:** the dark ink is NOT dogmatically dark (it goes INVISIBLE on the near-black card) — it is a
>   warm MID-tone offset L-targeted **ΔL ≥ 0.12 off `--card`**, built by the SAME `oklch(from …)` as
>   light (one mechanism, both modes). The §2 dark `oklch(0.22 0.07 70)` literal is RETIRED.
> - **H4:** TECHNICOLOR not merely-non-gray — chroma floor `max(c,0.11)`, lead L≈0.14–0.16, **all
>   planes 0-blur** (the contact rung too).
> - **H5:** the press is a **NON-uniform squash** `scale: 1.04 0.94` (widen X / compress Y), NOT a
>   uniform shrink.
> - Cast direction stays the **landed down-LEFT** (REFINE-not-flip); the "upper-left key light"
>   justification is FICTION (deleted). Drag-track is DEFERRED (needs a real `useCartoonCast` DOM
>   bridge — NOT "zero new composable"); the press leg IS zero-new (`useLiquidPress` reused as-is,
>   reading the already-written `--card-press-t`).

---

## 0. The live verdict (all three lenses measured it identically)

`/foundations/shadows`, light mode, `getComputedStyle` (2026-06-24):

| Token | Resolves to | Defect |
|---|---|---|
| `--shadow-cartoon-md` cast | `… color-mix(in srgb, var(--shadow-color) 12%, transparent), 1–2px blur` → `color(srgb 0.11 0.098 0.09 / 0.12)` | **R≈G≈B near-black at 12% α + 1px blur** — a desaturated, soft GRAY SMUDGE. Indistinguishable from SOFT/ELEVATED. |
| `--shadow-color` | `var(--foreground)` = `hsl(24 10% 10%)` | neutral ink; the warm hue-24 is washed at L10/S10 → reads black. |
| `--ease-cartoon-punch` | **EMPTY** (absent from `src/`) | design.md §Easing fiction — never shipped. |
| `--motion-weight` | **EMPTY** (absent from `src/`) | design.md §L4 fiction — never shipped. |

Three stacked failures: (1) the ink is a weak desaturated blurred gray, not a cel stamp;
(2) the moving cast / punch / weight scalar were **never built**; (3) design.md still cites the
retired `<CartoonCard>` / `.glass-cartoon` as live. The bar: **bold layered-offset technicolor
cel stamp that PUNCHES on interaction** — both modes, both engines.

---

## 1. The golden mechanism — ONE ink source, TWO cooperating planes, ONE motion scalar

A 1940s cel is a flat painted shape with a **hard ink outline** floating above a **fixed-light
cast** painted on the cel below. The register is exactly two physical parts, both reading the
**same ink**:

1. **The STATIC STAMP** (paint, on the host `box-shadow`) — a hard (0-blur), warm-chromatic,
   layered-offset cel ink. The resting silhouette; the SSR / no-JS / **PRM floor**. A card reads
   *inked* before anyone touches it.
2. **The MOVING CAST** (transform, on a `::before` caster pseudo) — the SAME ink painted as a
   self-contained slab that `translate`s + `scale`s on the **compositor**. The object lifts off
   its cast on press (the gap punches open), the cast lags a beat on release (follow-through), and
   on a dragged surface the cast trails the gesture. **Never an animated `box-shadow`.**

The cel light is **fixed** upper-left (matching the house specular catch-light); the cast lands
**lower-right**. One ink token, one motion scalar (`--motion-weight`), one punch curve
(`--ease-cartoon-punch`), one caster pseudo. No third system.

### Lens reconciliation (the strongest move from each, the tensions resolved)

| Decision | Lens A | Lens B | Lens C | **GOLDEN** |
|---|---|---|---|---|
| Ink color | warm-umber via `--shadow-color` oklab-bias (adaptive flip) | warm via `oklch(from --foreground …)` (adaptive flip) | **own** `--cartoon-ink: hsl(28 60% 12%)`, ink-stays-dark-both-modes | **C's own warm-ink token** (decoupled from `--shadow-color`, so retuning the cast never disturbs every box-shadow) **built via B's `oklch(from --foreground …)` construction** (adaptive hue-extract, no hardcoded literal) with **C's "ink stays dark in BOTH modes" L-clamp** (a cel cast is INK — never flips to white). Best-of-three. |
| Cast direction | down-RIGHT, no trig | down-LEFT+spine+down-RIGHT three-plane, no trig | down-RIGHT bold 3-plane, no trig | **down-RIGHT, three plain-px planes, NO trig** (the glass-material `cos(-58)*-14` sign-trap is banned here). Key upper-left → cast lower-right, coherent with the specular. |
| Edge | 0-blur lead | 0-blur all | 0-blur front + 1px contact | **0-blur lead+mid, ≤1px contact rung** (hard cel edge + one soft contact). |
| Moving cast layer | `::after`, solid fill, `z-index:-1` | `::after`, box-shadow slab, `@property --cast-dx/dy` | **`::before`** (cartoon's `::after` is the grain overlay — a real conflict), box-shadow slab, `--cartoon-press-t` | **`::before` caster** (C's pseudo-budget audit is correct — the host `::after` is grain; specular `::before` is OFF on a flat cartoon surface, so it's FREE), painted with the **same `--shadow-cartoon-*` box-shadow** (B/C — set once per state-flip, never animated), moved by **`@property`-registered `--cast-dx/dy`** (B — interpolable lengths) + the press scalar. |
| Press driver | new `useCartoonCast` | new `useCartoonCast` | **reuse `useLiquidPress`** w/ `pressVar` | **reuse `useLiquidPress`** (C — it already writes a press-t var, interruptible coupled spring, compositor-only, PRM-instant; **zero new composable**). |
| Move/drag driver | reuse `usePointerVelocityField` | reuse `usePointerVelocityField` | reuse `usePointerVelocityField` | **reuse `usePointerVelocityField`** (all three agree — opt-in, DRY, the dock seam-tension primitive). |
| Motion tokens | LAND verbatim | SHIP verbatim | SHIP verbatim | **SHIP `--ease-cartoon-punch` + `--motion-weight` to `scheme-motion.css §2`**, design.md-verbatim. |

**The single boldest move (kept from C, hardened by B):** the cast is a *real separately-painted
ink plate* the object floats above. On press the object squashes DOWN onto it (anticipation dip in
the curve), PUNCHES (squash → the plate spreads ~1.18×), then the ink **recoils LATE** (the caster
carries a ~1.15× slower punch-eased transition → follow-through / overlapping action). One scalar
(`--motion-weight`) co-scales the body squash AND the plate travel/spread, so they read as ONE
proportioned deformation. A `box-shadow` property physically cannot do this; a transformed pseudo
can, on the compositor, in both engines.

---

## 2. DECISION (1) — THE INK: an own warm cel-ink, hue-extracted, dark in both modes

```css
/* tokens/shadow.css — the cartoon register's OWN ink (decoupled from --shadow-color so a
   consumer retunes the cast without disturbing every elevation box-shadow). Built by EXTRACTING
   the warm --foreground hue (oklch from) and FLOORING chroma + DEEPENING L so at stamp opacity it
   reads as a COLORED cel line, never a neutral gray. A cel cast is INK: it stays a warm DARK ink
   in BOTH modes (it does NOT flip to white in dark — a white "shadow" is the iOS-7-sticker glow). */
:root {
  --cartoon-ink: oklch(from var(--foreground) clamp(0.16, l, 0.26) max(c, 0.07) h);

  /* The three layered planes step DOWN in opacity → registration-ink stack + a contact rung.
     BOLD, not faint (the headline fix): lead ~32%, mid ~26%, contact ~18% — vs the defect's 12%.
     A WARM-CHROMATIC ink at 32% reads as a deliberate cel line; neutral black at 32% would read
     muddy — which is exactly why the chroma floor is load-bearing, not decorative. */
  --cartoon-ink-lead:    color-mix(in oklab, var(--cartoon-ink) 32%, transparent);
  --cartoon-ink-mid:     color-mix(in oklab, var(--cartoon-ink) 26%, transparent);
  --cartoon-ink-contact: color-mix(in oklab, var(--cartoon-ink) 18%, transparent);
}
```

`oklch(from …)` + `color-mix(in oklab …)` are Baseline 2023 / Safari 16.4+ (both engines). The
`max(c, 0.07)` chroma floor means the ink can NEVER collapse to gray even if `--foreground` is
desaturated — the BA.W-NO-GRAY discipline applied to the cast. **`in oklab` not `in srgb`** (the
landed defect): srgb muddies a warm dark ink toward gray as it dilutes; oklab holds the warm hue
stable across the alpha ramp.

### Both modes — the ink stays INK (a clean plain-ancestor `.dark`, no `:global()`, no `light-dark()`)

```css
/* tokens/dark-arm.css — in dark, --foreground flips to near-cream; the oklch(from) construction
   would lift the ink toward a light warm line. A cel cast is dark INK on any cel — so we PIN the
   dark cartoon ink to a warm dark ink explicitly (a hair lighter L than light-mode so it reads as
   a defined edge against the near-black --card, opacity floored UP for presence on a dark ground).
   Plain `.dark` ancestor — the recorded scoped-:global() drop + light-dark()-inset traps avoided. */
.dark {
  --cartoon-ink: oklch(0.22 0.07 70);
  --cartoon-ink-lead:    color-mix(in oklab, var(--cartoon-ink) 46%, transparent);
  --cartoon-ink-mid:     color-mix(in oklab, var(--cartoon-ink) 38%, transparent);
  --cartoon-ink-contact: color-mix(in oklab, var(--cartoon-ink) 26%, transparent);
}
```

### The accent-key OPT-IN (presets-in-consumers)

The default identity is the warm cel ink. A consumer who wants an editorial accent cast re-points
ONE token on the cascade — `--cartoon-ink: var(--glass-accent);` — and the strength + geometry
rungs are untouched. Never the default (`--glass-accent` is `transparent` at the A-2 no-op floor →
an accent-keyed cast would vanish on a bare card; and a per-instance hue cast can't hold a stable
identity). The accent belongs to the SELECTION axis; the cartoon cast is the house warm ink.

---

## 3. DECISION (3) — THE STAMP: bold layered planes, cast DOWN-RIGHT, NO trig

```css
/* tokens/shadow.css — the BOLD layered cel-ink stamp. Three planes (hard 0-blur lead + mid, a
   ≤1px contact rung), cast DOWN-RIGHT (away from the upper-left key light — coherent with the
   specular catch-light the rest of the system paints from). φ-proportioned: the deep offset ≈
   lead × √φ (≈1.27); md ≈ sm × φ; lg ≈ md × φ (the golden cadence, §L6). All plain signed px —
   NO cos()/sin(), NO sign-inversion trap. */
:root {
  --shadow-cartoon-sm:
    2px 2px 0   var(--cartoon-ink-lead),
    3px 3px 0   var(--cartoon-ink-mid),
    4px 4px 1px var(--cartoon-ink-contact);
  --shadow-cartoon-md:
    3px 3px 0   var(--cartoon-ink-lead),
    5px 5px 0   var(--cartoon-ink-mid),
    7px 7px 1px var(--cartoon-ink-contact);
  --shadow-cartoon-lg:
    4px 4px 0   var(--cartoon-ink-lead),
    7px 7px 0   var(--cartoon-ink-mid),
   11px 11px 2px var(--cartoon-ink-contact);

  /* Aliases preserved — no re-fork. */
  --cartoon-shadow-sm: var(--shadow-cartoon-sm);
  --cartoon-shadow-md: var(--shadow-cartoon-md);
  --cartoon-shadow-lg: var(--shadow-cartoon-lg);
}
```

The `--shadow-cartoon` / `-hover` legacy aliases (shadow.css:9-10 / bridges.css:298-299) re-point
to `-md` / `-lg`; the `--shadow-modal` cartoon plane (dark-arm.css:171-173) re-points onto
`--cartoon-ink-lead` for family coherence. **`@supports not (color: oklch(from white l c h))`**
floors `--cartoon-ink` to a warm sRGB literal (`#4a3320`-ish) so a legacy engine gets a warm — not
gray — stamp. The 2px bezel (`.shadow-cartoon-*` already sets `border: 2px`) stays; optionally
re-point it to `--cartoon-ink` at a low mix for the full inked-outline read (opt-in token
`--cartoon-border`).

`prefers-contrast: more` → floor the three strengths up (+~10%); the inked edge is a legibility
asset (design.md §Shadows), never decoration.

---

## 4. DECISION (2) — THE MOVING CAST: a `::before` caster, transform-only, scalar-driven

### 4a. Pseudo-budget (the C audit — why `::before`, not `::after`)

The host card's `::after` is the **grain overlay**; the host `::before` is the **moving-specular
catch-light** — but specular is OFF on a flat cartoon surface (cartoon cards aren't glass-specular
surfaces). So on `.cartoon-surface` the `::before` is **FREE**. The grain `::after` is untouched.
(Same locate-the-seam discipline the paper-grid wave used.)

### 4b. The caster + the `@property` registration

```css
/* @property — registered <length>s so the custom-prop transition INTERPOLATES on the compositor
   (B). Baseline / Safari 16.4+. A non-supporting engine snaps the gap rather than easing it
   (graceful — the stamp + state still read). */
@property --cartoon-cast-dx { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --cartoon-cast-dy { syntax: "<length>"; inherits: true; initial-value: 0px; }

@utility cartoon-surface {
  position: relative;
  border-width: 2px;
  /* The RESTING stamp on the HOST (the SSR / no-JS / PRM floor). */
  box-shadow: var(--shadow-cartoon-md);
  translate: 0;                 /* AQ.W3 identity base — mint the stacking ctx once */
  --cartoon-press-t: 0;         /* 0 rest → 1 press; useLiquidPress writes it */
  transition:
    translate var(--duration-normal) var(--ease-cartoon-punch),
    scale     var(--duration-normal) var(--ease-cartoon-punch),
    box-shadow var(--duration-normal) var(--ease-standard);   /* EFFECTS leg, discrete flips */

  /* The MOVING ink-plate caster — the SAME stamp as a self-contained slab the body floats above.
     box-shadow set ONCE per state-flip (never animated, the §L7 paint-fence); the MOTION is the
     translate/scale (compositor-cheap). */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;                /* behind the cel face, in front of the page */
    border-radius: inherit;
    box-shadow: var(--shadow-cartoon-md);
    /* The cast travels DOWN-RIGHT as the body lifts UP-LEFT (object lifts off its shadow) +
       SPREADS as the gap opens. ONE scalar drive: --cartoon-press-t × --motion-weight. Plus the
       drag-track delta (--cartoon-cast-dx/dy, 0 at rest, opt-in pointer composable). */
    --cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t));
    --cast-spread: calc(1 + 0.18 * var(--motion-weight) * var(--cartoon-press-t));
    translate:
      calc(var(--cast-travel) + var(--cartoon-cast-dx))
      calc(var(--cast-travel) + var(--cartoon-cast-dy));
    scale: var(--cast-spread);
    /* The caster LAGS the body (~1.15× slower) → the ink recoils LATE on release (follow-through /
       overlapping action, §L4 #5). */
    transition:
      translate calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch),
      scale     calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch),
      --cartoon-cast-dx var(--duration-normal) var(--ease-cartoon-punch),
      --cartoon-cast-dy var(--duration-normal) var(--ease-cartoon-punch);
    will-change: translate, scale;
  }

  /* HOVER — the object lifts a hair up-left; the cast deepens to the lg rung (the gap opens). */
  &:hover:not(:active):not(:disabled) {
    translate: var(--lift-sm) var(--lift-sm);     /* -1px -1px — up-left */
    box-shadow: var(--shadow-cartoon-lg);
    &::before { box-shadow: var(--shadow-cartoon-lg); }
  }

  /* PRESS — squash DOWN onto the cast. The CSS :active is the no-JS floor (a discrete squash);
     useLiquidPress drives --cartoon-press-t 0→1 for the continuous interruptible press. */
  &:active:not(:disabled) { scale: var(--scale-press); }   /* 0.96 — the squash */
}
```

### 4c. The press driver — reuse `useLiquidPress` (zero new composable)

`useLiquidPress` already writes a press-t custom property via an interruptible coupled spring,
compositor-only, PRM-instant. The Card seam already passes a `pressVar` (`--card-press-t`); a
`<Card surface="cartoon" pressable>` passes `pressVar: "--cartoon-press-t"`, so the SAME press
scalar drives BOTH the body squash AND the `::before` plate travel/spread — ONE scalar, ONE clock.

### 4d. The drag-track cast (opt-in, the "moving cast" proper — cel light fixed)

For a dragged / pointer-tracked surface, the cast trails OPPOSITE the gesture (the cel light is
fixed; the object moves, so its cast offsets by the negative of the object's travel). Reuse
`usePointerVelocityField` (the dock seam-tension primitive) to write `--cartoon-cast-dx/dy`,
tanh-capped, rAF-coalesced, scaled by `--motion-weight`, cleared to 0 on pointerup (the punch curve
eases it home), paused offscreen. **Opt-in** (a `data-cartoon-track` host); the press/hover path is
pure CSS, no JS.

### 4e. Cross-engine (Chrome + Safari) — the SAFEST register in the tranche

- `translate` / `scale` longhands + `box-shadow` on a pseudo + `color-mix(in oklab)` + `oklch(from)`
  — all Safari 16.4+ / Baseline; WebKit composites the transformed pseudo identically to Blink.
- **NO `backdrop-filter`, NO `filter:url()`, NO metaball** — the cartoon register is OPAQUE INK, the
  one register that never touches the fragile WebKit transmissive path.
- `@property --cartoon-cast-dx/dy` — Safari 16.4+; non-supporting engines snap rather than ease (the
  gap still reads).
- `--ease-cartoon-punch` (`linear()`) — Chrome 113 / Safari 17.2+; `@supports not (transition-timing-function: linear(0,1))`
  floors it to `--ease-out-expo` (the punch still reads, sans the anticipation dip).
- **NO animated `box-shadow`** (the §L7 paint-fence) — the slab box-shadow is static; only the
  transform moves.

---

## 5. The motion tokens to SHIP (design.md fiction → built)

```css
/* tokens/scheme-motion.css §2 (the easing/spring home — NOT a SPRING_PRESETS row, NOT a
   MOTION_CURVES entry: a hand-shaped linear() with a NEGATIVE anticipation leg is neither a damped
   spring nor a bezier, so it lives as a raw --ease-* custom prop, zero TS change — design.md §82). */
:root {
  /* §L4 — ONE scalar names "how much cartoon" a surface carries. Rest = 1/φ. */
  --motion-weight: 0.62;

  /* §Easing — the cartoon punch curve, design.md-verbatim: a real anticipation dip BELOW origin
     (−3.8%), crosses 1.0, peaks 1.22 (past the ≤10% spring fence — which is WHY it is a register,
     not a spring), settles. */
  --ease-cartoon-punch: linear(
    0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%,
    1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1
  );
}

.cartoon-surface { --motion-weight: 0.62; }   /* the register default; dock/celebration push → 1 */
```

`--motion-weight` is **driver-scoped** (design.md §L4): the cartoon press/drag is a DRIVER → it
carries weight; an observer content-snap stays calm-overdamped. PRM zeroes `--motion-weight`;
`--ease-cartoon-punch` collapses to `--ease-standard`.

---

## 6. The a11y / PRM / contrast carve

```css
@media (prefers-reduced-motion: reduce) {
  .cartoon-surface, .cartoon-surface::before {
    --motion-weight: 0;            /* §L5 one-assignment: zeroes travel, spread, squash, lag */
    transition: none;
  }
  /* The static bold cel STAMP remains (identity/legibility, not motion) — only TRAVEL/PUNCH is
     removed. --motion-weight:0 collapses every calc(… * --motion-weight …) to its rest value. */
}
@media (prefers-contrast: more) {
  :root {
    --cartoon-ink-lead:    color-mix(in oklab, var(--cartoon-ink) 42%, transparent);
    --cartoon-ink-mid:     color-mix(in oklab, var(--cartoon-ink) 34%, transparent);
    --cartoon-ink-contact: color-mix(in oklab, var(--cartoon-ink) 24%, transparent);
  }
  /* The inked edge floors UP — a legibility asset (design.md §Shadows). */
}
/* prefers-reduced-transparency does NOT touch the cast (opaque ink, not a transmissive layer — it
   survives as a bonus legibility anchor, design.md §Shadows verbatim). */
```

---

## 7. The acceptance bar (how to judge it live, both modes, both engines)

- **REST:** a BOLD inked cel — a warm cel-ink layered offset stamp cast DOWN-RIGHT, 0-blur lead+mid,
  a 2px inked bezel. NOT a faint gray smudge. The CARTOON swatch reads visibly distinct from
  SOFT/ELEVATED on `/foundations/shadows`.
- **HOVER:** the card lifts a hair up-left; the cast deepens (lg rung + the gap opens) → the 2.5-D pop.
- **PRESS:** the body SQUASHES onto the cast (anticipation dip → 0.96 squash → 1.22 overshoot →
  settle, the punch curve); the plate spreads ~1.18×. Release: body snaps back, the ink RECOILS LATE
  (the caster's 1.15× lag — follow-through).
- **DRAG (opt-in):** the cast trails OPPOSITE the gesture, tanh-capped, eases home on release.
- **DARK:** the cast is STILL a warm DARK ink (never white, never gray), opacity floored up to read
  against the near-black card.
- **PRM:** static bold stamp, zero travel/spread/squash/punch.
- **CROSS-ENGINE:** identical in Chrome + Safari (transform-only caster, oklab mix, `linear()` with
  the `--ease-out-expo` fallback floor, no backdrop-filter/url).

---

## 8. The born-RED gate sketch (the π/readback that proves it)

Three born-RED arms, each FAILS on the current implementation and PASSES only on the golden:

**G1 — INK (born-RED on the gray smudge).** `getComputedStyle` over a `.shadow-cartoon-md` swatch
on `/foundations/shadows`, BOTH modes:
- parse the resolved `box-shadow`; extract the lead plane's cast color → oklch.
- **ASSERT chroma `C ≥ 0.05`** (non-gray; the defect reads C≈0 at `0.11 0.098 0.09`).
- **ASSERT lead+mid blur == 0px** (hard cel edge; the defect has 1–2px).
- **ASSERT lead α ≥ 0.28** (bold; the defect is 0.12).
- **ASSERT** the CARTOON swatch's computed `box-shadow` ≠ the SOFT/ELEVATED swatch's (separable).
- Dark arm: ASSERT the cast oklch L ≤ 0.40 (still INK, never the near-white `--foreground` flip).

**G2 — MOTION TOKENS (born-RED on EMPTY).** `getComputedStyle(:root)`:
- **ASSERT `--motion-weight` non-empty and ≈ 0.62**; **ASSERT `--ease-cartoon-punch` starts `linear(`**
  and contains a negative stop (the anticipation dip). Both EMPTY today → born-RED.

**G3 — PUNCH (born-RED on no caster).** A π frame-series over a pressed `.cartoon-surface`
(chrome-devtools-mcp + a WebKit pass):
- **ASSERT a `::before` caster exists** with a non-`none` `translate`/`scale` under `:active`
  (absent today → born-RED).
- **ASSERT** mid-press the body `scale < 1` (squash) AND the `::before` `translate` magnitude > rest
  (the gap opens) AND `::before` `scale > 1` (the plate spreads).
- **ASSERT** the release `translate` track shows the anticipation dip + overshoot (sample the
  computed value across rAF frames; a monotonic settle = FAIL, must cross past target).
- **ASSERT** no `box-shadow` value changes per-frame during the press animation (compositor-only;
  a per-frame box-shadow delta = paint-bound = FAIL).
- **ASSERT** PRM → the caster `translate` holds at rest (zero travel) while the stamp persists.
- Run BOTH engines; a Chrome-only pass is not a pass.

The de-risk spike (`golden/`) is the executable seed of G3 — it proves the caster mechanism live
before the src/ wave lands.

---

## 9. DECISION (4) — design.md doc-hygiene (the retired-ghost edit list)

design.md still cites the retired `<CartoonCard>` / `.glass-cartoon` as live. The live carrier is
`<Card surface="cartoon">` → `.cartoon-surface` + `.shadow-cartoon-*`. The orchestrator applies:

| design.md locus (≈) | STALE | FIX |
|---|---|---|
| ~499 | "interactive cards live in `<Card>` (… via `.glass-cartoon` / `.cartoon-card` / etc.)" | "… via the `surface` ladder (`surface="cartoon"` → `.cartoon-surface`, or a hover-tier)." Drop `.glass-cartoon` / `.cartoon-card`. |
| ~501 | "`.glass-cartoon`—interactive cartoon surface … `--glass-bg-cartoon` fall-through … Carried by the `<CartoonCard>` sibling primitive (v0.8.0)" | DELETE. Replace: "`.cartoon-surface`—the cartoon decoration utility (cards.css), composed by `<Card surface="cartoon">`: a 2px inked bezel, the warm-ink layered-offset cel stamp (`--shadow-cartoon-md`→`-lg` on hover), and the `::before` moving caster (the punch). Composes ON TOP of the host's resolved glass tier — NOT a tier." |
| ~1069 | "`<ScrollPane>` and `<CartoonCard>` are sibling primitives … `<CartoonCard>` resolves through `.glass-cartoon`." | Drop the `<CartoonCard>` clause; keep `<ScrollPane>`. "the cartoon register is reached via `<Card surface="cartoon">` (the `.cartoon-surface` decoration), not a sibling primitive." |
| ~1077 | "… plus the `<ScrollPane>` and `<CartoonCard>` sibling primitives" | "… plus the `<ScrollPane>` sibling primitive and the `surface` axis (glass · cartoon · veil)." Drop `<CartoonCard>`. |
| ~1121 | table row `\| glass-cartoon \| cartoon-surface track \| cartoon-shadow disc \| Editorial \|` | Re-key the row label `glass-cartoon` → `surface="cartoon"` (the live selector); body unchanged. |
| ~1716 | roster lists `cartoon-card` | Drop `cartoon-card` (retired SFC; cartoon is a Card surface, not a component). |
| §Shadows (~400-413) | neutral-ink rung listing w/ 1–2px blur + "warm tint DEFERRED to greenfield" note | UPDATE to the warm `--cartoon-ink` form (§2), 0-blur, down-RIGHT (§3); RESOLVE the deferred note: "the cartoon cast rides `--cartoon-ink` (a warm `oklch(from --foreground …)` ink, chroma-floored, dark in BOTH modes, oklab-mixed), DISTINCT from neutral `--shadow-color`; accent-keyable per-instance. Cite cartoon-shadow/GOLDEN.md." |
| §Easing / §L4 | `--ease-cartoon-punch` + `--motion-weight` documented but absent from `src/` | Note they are now SHIPPED in `tokens/scheme-motion.css §2`. |

---

## 10. The wave amendment (UNION onto the landed carriers — no re-fork)

Three legs, augmenting the existing shadow/cartoon waves (no parallel system):

- **`BD.W-CARTOON-CEL-INK` (color leg):** add `--cartoon-ink` + the three strength tokens (shadow.css
  + dark-arm.css); re-point the three `--shadow-cartoon-{sm,md,lg}` rungs to the warm-ink 0-blur
  down-RIGHT form; re-point `--shadow-modal`'s cartoon plane + the `--shadow-cartoon`/`-hover`
  aliases onto `--cartoon-ink-lead`. `prefers-contrast: more` floors up; `@supports` sRGB fallback.
  **Born-RED: G1.** Pure token re-author — no new class, no new file.
- **`BD.W-CARTOON-PUNCH` (motion leg):** SHIP `--ease-cartoon-punch` + `--motion-weight`
  (scheme-motion.css §2); register `@property --cartoon-cast-dx/dy`; add the `::before` caster +
  press/hover/release beats to `.cartoon-surface` (cards.css); the PRM/contrast carve; wire
  `useLiquidPress` (`pressVar: "--cartoon-press-t"`) on `<Card surface="cartoon" pressable>`; opt-in
  `usePointerVelocityField` drag-track. **Born-RED: G2 + G3.** Reuses both extant composables — ZERO
  new composable, ZERO new SFC.
- **`BD.W-CARTOON-DOCFIX` (doc leg):** apply the §9 edit list to design.md.

**Reconcile vs the 116 union waves:** AUGMENTS the existing shadow tokens + `.cartoon-surface` +
the §Shadows/§Easing/§L4 doc; does NOT touch dock-fission / glass-material / aurora. The only
cross-wave seam is `--motion-weight` (a §L4 universal scalar several waves read) — shipping it here
(the first consumer) seeds it for the rest. Same token names, same carriers, same consumers. No
re-fork, no legacy. The phantom `--glass-bg-cartoon` was already dropped — not resurrected.

---

## 11. Gestalt check against the bar

The cards read as **bold cartoon-stamped surfaces that PUNCH on interaction**, not flat warm-cream
plates with a faint gray offset:

- **STAMP** — a hard 0-blur, warm-chromatic, three-plane layered cel ink at rest, cast down-right,
  coherent with the upper-left key light. Inked before you touch it.
- **PUNCH** — a transform-only `::before` ink-plate the body floats above: squashes onto it on press,
  spreads, recoils LATE on release with the `--ease-cartoon-punch` anticipation→overshoot. Real
  weight, inertia, squash & stretch, follow-through (§L4 #2/#5/#10/#11). Compositor-cheap, both
  engines, PRM-static.
- **WARM, BOTH MODES** — an own `--cartoon-ink` (hue-extracted, chroma-floored, dark in both modes),
  oklab-mixed: never gray, never white, never fighting the warm-cream glass.
- **DEFT UNION** — same carriers, same token names, ZERO new SFC, ZERO new composable, ONE free
  `::before`, a handful of tokens. The boldest register in the smallest footprint.
