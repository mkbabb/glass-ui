# Cartoon-shadow register — GREENFIELD (Lens C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Lens: 1940s-technicolor FLOW & PUNCH. The boldest, most alive variant that
> stays idiomatic + cross-engine. The cards must read as **bold cartoon-stamped
> surfaces that PUNCH on interaction** — not flat warm-cream plates with a faint
> gray offset.

---

## 0. The status quo, live-measured (the disease)

Captured on the running dev server (getComputedStyle, light mode):

| Token | Resolves to | The defect |
|---|---|---|
| `--shadow-cartoon-md` cast color | `color(srgb 0.11 0.098 0.09 / 0.12)` | **R≈G≈B near-black at 12% α** — a desaturated faint smudge. Zero warmth, zero chroma. |
| `--shadow-color` | `var(--foreground)` = `hsl(24 10% 10%)` | NEUTRAL ink (10% sat). The "warm" hue 24 is washed out at L10/S10 — reads black. |
| `--ease-cartoon-punch` | **EMPTY — absent from `src/`** | design.md §L2 specifies it; `grep` finds ZERO matches in `src/`. design.md fiction. |
| `--motion-weight` | **EMPTY — absent from `src/`** | design.md §L4 specifies it; ZERO matches in `src/`. design.md fiction. |

Two findings collapse the brief:
1. **The ink IS a gray smudge today** (literally measured `0.11 0.098 0.09 / 0.12`). The brief's fear is the live reality.
2. **The motion half does not exist.** The "moving cast" + "punch curve" + "motion-weight scalar" are design.md prose with no built substrate. This greenfield must SHIP them, not just re-tint.

The default `<Card>` over the constellation field renders as a flat cream plate
with a `--shadow-md` ambient drop — calm, correct for the glass default, but the
`surface=cartoon` opt-in inherits the same faintness. The register has no PUNCH.

---

## 1. CORE IDEA — the **cel-ink stamp** + the **fixed-light caster shadow**

A cartoon-register surface is a flat **cel** lit by a single **fixed key light**
(upper-left, the house light direction). Two things make it read as a 1940s
animation cel, not a CSS box:

1. **A bold, WARM, layered cel-ink stamp** — not a faint gray offset. The ink is
   a **warm sepia-black** (the cel-ink the brief's "technicolor" edict implies),
   cast at a **meaningful opacity** (28–40%, not 8–12%), in **layered hard-edged
   offset planes** (the inkboard look: 2–3 stacked solid offsets, near-zero blur).
   It casts DOWN-AND-AWAY from the key light (down-right), the trig sign GOTTEN
   RIGHT (or avoided — see §4).

2. **A MOVING caster** — the cel light stays bolted to the scene while the OBJECT
   moves, so its cast shadow **slides opposite the gesture** and **deepens on
   press** (the object lifts off its own shadow). This is a `transform` on a
   `::after` caster layer that PAINTS the stamp, driven by one scalar
   (`--motion-weight`) and eased by the `--ease-cartoon-punch` `linear()` curve
   (anticipation dip → 22% overshoot → settle). **Never an animated box-shadow.**

The register is a UNION over the landed `--shadow-cartoon-*` / `.cartoon-surface`
/ `<Card surface=cartoon>` carriers — extend them, do not re-fork.

### THE SINGLE BOLDEST MOVE

**The cast is a real, separately-painted `::after` INK-PLATE that the object
floats above — and on press, the object stamps DOWN onto it (anticipation dip),
PUNCHES through (squash + ink-plate spreads to 1.22×), then snaps back (the ink
recoils late, follow-through). The shadow is a physical cel layer with weight,
not a box-shadow property — so it can travel, deepen, squash, and lag the body by
a frame, giving the 2.5-D "Mickey-Mouse-glove" pop that a `box-shadow` physically
cannot.** One scalar (`--cartoon-press-t`) drives the body squash AND the ink-plate
travel/spread/opacity together, so they read as ONE proportioned deformation.

---

## 2. THE INK COLOR — decision: **WARM SEPIA-BLACK cel ink, accent-tintable** (resolve #1)

The brief asks: keep neutral, warm it, or accent-key it? **Decision: WARM it to a
sepia-black floor, with an OPT-IN accent-key overlay.** Rationale:

- **Neutral is the measured defect** (`0.11 0.098 0.09` — gray). Rejected.
- **Fully accent-keyed by default is wrong**: a chromatic cast everywhere reads as
  the iOS-7-sticker drop-shadow incoherence (a teal shadow under a red card is
  noise), AND a per-instance hue cast cannot hold a stable identity. The accent
  belongs to the SELECTION axis (`--glass-accent`), already built — not the
  universal shadow ink.
- **Warm sepia-black** is the 1940s-technicolor cel-ink truth: vintage cel ink and
  4-color process registration ink is a warm carbon black, never a cool gray. It
  sits in the house warm-cream identity (foreground is hsl-24, OKLab H≈56°) and
  **NEVER reads gray** because it carries real chroma even as it darkens.

### The token

```css
:root {
  /* The cel-ink HUE source — a warm sepia-black, DISTINCT from the neutral
     --shadow-color/--foreground (which stays the elevation-shadow ink). The
     cartoon register gets its OWN warm ink so it never reads gray, and so a
     consumer retunes the cartoon cast without disturbing every box-shadow.
     hsl(28 60% 12%): warm amber-brown hue, real saturation (60%, vs the
     foreground's washed 10%), dark L (12%) so it reads as INK not as a tint. */
  --cartoon-ink: hsl(28 60% 12%);

  /* The cast STRENGTH — BOLD, not faint. The cel-ink stamp is opaque-ish ink,
     not an ambient haze. The three layered planes step DOWN in opacity so the
     stack reads as registration ink with a soft contact rung. */
  --cartoon-ink-strong: 38%;   /* the front plane — the bold inked edge */
  --cartoon-ink-mid:    32%;   /* the body plane */
  --cartoon-ink-soft:   22%;   /* the contact/spread rung */

  /* The composed ink at each rung — color-mix toward transparent. A consumer
     retunes the whole register from --cartoon-ink (hue) + the three strengths. */
  --cartoon-cast-strong: color-mix(in oklab, var(--cartoon-ink) var(--cartoon-ink-strong), transparent);
  --cartoon-cast-mid:    color-mix(in oklab, var(--cartoon-ink) var(--cartoon-ink-mid),    transparent);
  --cartoon-cast-soft:   color-mix(in oklab, var(--cartoon-ink) var(--cartoon-ink-soft),   transparent);
}
```

> **`in oklab` not `in srgb`.** The landed tokens mix in srgb, which muddies a
> warm dark ink toward gray as it dilutes. oklab keeps the warm hue stable across
> the alpha ramp — the BA.W-NO-GRAY discipline applied to the cast.

### Both modes (resolve #1 cont. — must hold dark)

The neutral elevation shadows ride `--shadow-color: var(--foreground)`, which
flips to near-white in dark — correct for an ambient drop on a dark ground. But a
**cel ink does NOT flip to white**: a 1940s cel cast is INK, and ink is dark on
any cel. A white "shadow" in dark mode is the iOS-7-sticker glow incoherence.

**Decision: the cartoon ink stays a WARM DARK INK in BOTH modes**, lifted in
opacity in dark so it still reads against the near-black `--card`:

```css
/* dark-arm.css — the cartoon ink is INK, dark in both modes, NOT --foreground. */
.dark {
  /* A touch warmer + a hair lighter L so the ink reads as a defined edge against
     the near-black card, but it is STILL a dark warm ink — never white, never
     gray. Opacity floors UP because a dark ink on a dark ground needs more
     presence to register the offset. */
  --cartoon-ink: hsl(30 55% 18%);
  --cartoon-ink-strong: 52%;
  --cartoon-ink-mid:    44%;
  --cartoon-ink-soft:   30%;
}
```

This is a clean PLAIN-ancestor `.dark` re-declaration (the recorded
scoped-`:global()`-drop + light-dark()-inset traps both avoided — no `light-dark()`
on a multi-rung shadow, no scoped global).

> `prefers-contrast: more` → bump the three strengths toward `+12%` (the inked
> edge is a legibility asset — design.md §Shadows already mandates this).
> `prefers-reduced-transparency` does NOT touch the ink (opaque ink, not a
> transmissive layer — it survives as a bonus legibility anchor).

---

## 3. THE LAYERED STAMP — bold offset planes, cast DOWN-AND-AWAY (resolve #3)

The landed `--shadow-cartoon-*` already cast down-left/right (`-Npx Npx` →
down-left for the front plane, `0 Npx` for the body). The brief's directive: cast
AWAY from the upper-left key light → land **lower-right**. The landed offsets are
mostly down-and-LEFT (negative X). **Decision: flip the X sign to POSITIVE so the
cast lands down-RIGHT** (away from an upper-left key), and BOLDEN the planes.
Trig is AVOIDED entirely (resolve #3's safe path) — fixed integer offsets in the
correct down-right quadrant, no `cos(-58deg)*-14` sign-inversion trap.

```css
:root {
  /* The BOLD layered cel-ink stamp. Three hard-edged planes (near-zero blur),
     cast DOWN-RIGHT (away from the upper-left key light): a front inked edge,
     a body plane, and a soft contact spread. Offsets ~2× the landed family so
     the stamp READS as a stamp, not a hairline. φ-proportioned: md = sm × φ-ish,
     lg = md × φ-ish (the golden cadence, §L6). */
  --shadow-cartoon-sm:
    2px 2px 0 var(--cartoon-cast-strong),
    3px 3px 0 var(--cartoon-cast-mid),
    4px 4px 1px var(--cartoon-cast-soft);
  --shadow-cartoon-md:
    3px 3px 0 var(--cartoon-cast-strong),
    5px 5px 0 var(--cartoon-cast-mid),
    7px 7px 1px var(--cartoon-cast-soft);
  --shadow-cartoon-lg:
    4px 4px 0 var(--cartoon-cast-strong),
    7px 7px 0 var(--cartoon-cast-mid),
    11px 11px 2px var(--cartoon-cast-soft);

  /* Aliases preserved (no re-fork). */
  --cartoon-shadow-sm: var(--shadow-cartoon-sm);
  --cartoon-shadow-md: var(--shadow-cartoon-md);
  --cartoon-shadow-lg: var(--shadow-cartoon-lg);
}
```

**Why hard-edged (0px blur on the front planes):** a cel cast is a flat ink shape,
not a soft penumbra. The 0px-blur front planes give the registration-ink read; the
final plane carries 1–2px blur as the only contact softening. This is the
inkboard-stamp signature the brief names.

**The bezel border stays** (`.shadow-cartoon-*` already set `border: 2px solid
var(--border)`). Optionally re-point that border to `--cartoon-ink` at a low mix so
the OUTLINE matches the INK (the full cel-cartoon read: inked outline + inked
cast). Token: `--cartoon-border: 2px solid color-mix(in oklab, var(--cartoon-ink)
60%, var(--border))`. Opt-in via the utility.

---

## 4. THE MOVING CAST — the `::after` ink-plate caster (resolve #2, the headline build)

The cast must TRAVEL opposite the gesture, DEEPEN on press, SNAP back on release,
scaled by `--motion-weight`, eased by `--ease-cartoon-punch`, compositor-only,
cross-engine, PRM-static. **This requires a `::after` caster layer that PAINTS the
stamp and TRANSFORMS** — a box-shadow on the host cannot travel cheaply.

### 4a. The caster layer

`.cartoon-surface` (and `.shadow-cartoon-*`) already own NO `::after` of their own
(the host card's `::after` is the grain overlay — a CONFLICT to resolve). **The
caster goes on `::before`** for the cartoon surface — `::before` is the moving-
specular catch-light on a GLASS tier, but a cartoon surface is NOT a glass-specular
surface (Card.vue: cartoon cards stay flat, specular off). So on a cartoon surface
the `::before` is FREE. The grain `::after` is untouched. (Pseudo-budget verified —
the same locate-the-seam discipline the paper-grid wave used.)

```css
@utility cartoon-surface {
  position: relative;            /* host is the positioning context */
  border: var(--cartoon-border, 2px solid var(--border));
  /* The RESTING stamp is on the HOST (the SSR / no-JS / PRM floor — a static
     cartoon stamp with zero JS). The ::before caster OVERRIDES it when armed. */
  box-shadow: var(--shadow-cartoon-md);
  translate: 0;                  /* AQ.W3 identity base — mint the stacking ctx */
  transition:
    translate var(--duration-normal) var(--ease-cartoon-punch),
    scale     var(--duration-normal) var(--ease-cartoon-punch);
}

/* The MOVING ink-plate caster — a separately-painted shadow layer the body
   floats above. It carries the stamp as its OWN box-shadow + a faint ink fill,
   sits BEHIND the host content (z -1), and TRANSLATES + SCALES on the press
   scalar. transform-only → compositor-cheap; no box-shadow animation. */
.cartoon-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  z-index: -1;
  /* The caster IS the stamp now — the host box-shadow is the static floor; when
     the caster is armed (JS sets --cartoon-armed:1) the host shadow zeroes and
     the caster paints, so it can move independently of the body. */
  box-shadow: var(--shadow-cartoon-md);
  /* The caster travels OPPOSITE the body + DEEPENS on press. ONE scalar drive:
       --cartoon-press-t  (0 rest → 1 full press), set by the press composable
       --motion-weight    (how much cartoon this surface carries, §L4)
     The caster slides DOWN-RIGHT as the body lifts UP-LEFT (the object lifts off
     its shadow), and SPREADS (scale > 1) so the cast grows as the gap opens. */
  --cartoon-cast-travel: calc(6px * var(--motion-weight) * var(--cartoon-press-t, 0));
  --cartoon-cast-spread: calc(1 + 0.22 * var(--motion-weight) * var(--cartoon-press-t, 0));
  translate: var(--cartoon-cast-travel) var(--cartoon-cast-travel);
  scale: var(--cartoon-cast-spread);
  /* The caster LAGS the body — its own punch-eased transition, a hair slower, so
     the ink recoils LATE on release (follow-through / overlapping action, §L4). */
  transition:
    translate calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch),
    scale     calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch);
}
```

### 4b. The body on press — squash + lift off the cast

The body translates UP-LEFT and squashes (anticipation dip is in the curve, not a
separate keyframe), while the caster slides DOWN-RIGHT and spreads. The gap between
body and cast = the 2.5-D pop:

```css
.cartoon-surface:hover:not(:disabled) {
  /* HOVER — the object lifts a hair off the page (cast deepens via ::before). */
  translate: calc(-1px * var(--motion-weight)) calc(-1px * var(--motion-weight));
}
.cartoon-surface:active:not(:disabled) {
  /* PRESS — squash DOWN onto the cast (the object presses, cast shrinks toward 0
     travel). The press scalar is driven to 1 by the composable; the CSS :active
     is the no-JS floor (a discrete squash). */
  scale: var(--scale-press);           /* 0.96 — the squash */
}
```

The driver is the **existing `useLiquidPress`** — it already writes a press-t
custom property and does the interruptible coupled spring-press, compositor-only,
PRM-instant. **No new composable.** It writes `--cartoon-press-t` (a new `pressVar`
argument, the seam already exists — Card passes `pressVar: "--card-press-t"`). On a
`<Card surface=cartoon pressable>` the press scalar drives BOTH the body squash AND
the `::before` caster travel/spread — ONE scalar, ONE clock.

### 4c. The pointer-move travel (the "moving cast" proper — cel light fixed)

For a DRAGGABLE / pointer-tracked cartoon surface, the cast slides opposite the
pointer-relative motion. This composes the EXISTING pointer-velocity seam
(`usePointerVelocityField` / the `vSpecular` position-write core already write
`--px`/`--py`-style vars). The caster reads a pointer-delta var:

```css
.cartoon-surface::before {
  /* The cel light is FIXED; the object moves, so the cast offsets by the
     NEGATIVE of the object's travel from rest. --cartoon-dx/dy come from the
     pointer/drag composable (0 at rest). Bounded so a fast drag does not throw
     the cast off-plate. */
  --cartoon-cast-x: clamp(-10px, calc(-1 * var(--cartoon-dx, 0px) * var(--motion-weight)), 10px);
  --cartoon-cast-y: clamp(-10px, calc(-1 * var(--cartoon-dy, 0px) * var(--motion-weight)), 10px);
  translate:
    calc(var(--cartoon-cast-travel) + var(--cartoon-cast-x))
    calc(var(--cartoon-cast-travel) + var(--cartoon-cast-y));
}
```

This is opt-in (a `data-cartoon-track` host that wires the pointer composable); the
press-travel path (§4a/b) is the always-on interactive read.

### 4d. Cross-engine (Chrome + Safari)

- `translate`/`scale` longhands + `box-shadow` on a pseudo: **fully cross-engine**,
  no `filter:url`, no backdrop-filter. Compositor-promoted by the transform.
- `color-mix(in oklab, …)`: Baseline 2023, both engines. (srgb-interp fallback is
  the engine's own — no `@supports` needed; oklab degrades gracefully.)
- `linear()` easing (`--ease-cartoon-punch`): Baseline 2023 (Chrome 113 / Safari
  17.2). For older Safari, the `@supports` floor falls to `--ease-out-expo` (the
  punch still reads, just without the anticipation dip).
- NO animated `box-shadow` (paint-bound, the §L7 fence) — the caster MOVES via
  transform; the box-shadow is static on the moving pseudo.

### 4e. PRM + a11y carve

```css
@media (prefers-reduced-motion: reduce) {
  .cartoon-surface,
  .cartoon-surface::before {
    --motion-weight: 0;             /* the §L5 one-assignment zero — kills travel,
                                       spread, squash, anticipation in one line */
    transition: none;
  }
  /* The static bold cel stamp REMAINS (the cast is a legibility/identity asset,
     not motion) — only the TRAVEL/PUNCH is removed. */
}
```

`--motion-weight: 0` collapses every `calc(… * var(--motion-weight) …)` to its
rest value — the caster sits at the static stamp, no travel, no spread, no squash.
The stamp itself (the box-shadow) is untouched. This is the design.md §L5 "one
assignment zeroes the cartoon" contract, now actually built.

---

## 5. THE MOTION TOKENS — build what design.md only describes (resolve, the gap)

design.md §L2/§L4 specify `--ease-cartoon-punch` + `--motion-weight` but **neither
exists in `src/`** (grep-proven). This greenfield SHIPS them.

```css
/* tokens/scheme-motion.css (the §L4 motion home) */
:root {
  /* §L4 — ONE scalar names "how much cartoon" a surface carries. Rest = 1/φ. */
  --motion-weight: 0.62;          /* ≈ 1/φ — present, alive, never manic */

  /* §L2 — the cartoon punch curve. The design.md linear() verbatim: a real
     anticipation dip BELOW origin (−3.8%), crosses 1.0, peaks 1.22 (past the
     spring ≤10% fence — which is WHY it is a register, not a spring), settles. */
  --ease-cartoon-punch: linear(
    0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%,
    1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1
  );
}

/* Surfaces that rest at full cartoon push --motion-weight toward 1 locally. */
.cartoon-surface { --motion-weight: 0.62; }      /* the register default */
/* a celebration / dock context overrides to ~1 on its host */
```

> **Why these live as raw `--ease-*` / `--motion-weight` custom props, NOT a
> SPRING_PRESETS row or a MOTION_CURVES entry:** design.md §L2 is explicit — the
> ≤10% overshoot spring invariant + the analytic solver stay intact; a hand-shaped
> `linear()` with a NEGATIVE anticipation leg is neither a damped spring nor a
> bezier, so it is a raw CSS token requiring no engine extension. This greenfield
> honors that — pure CSS tokens, zero TS change.

---

## 6. DOC-HYGIENE — the precise design.md edit list (resolve #4)

design.md still cites the RETIRED `<CartoonCard>` / `.glass-cartoon` as LIVE. `src/`
retired them (cards.css "former"; Card.vue "retired"; the live carrier is `<Card
surface=cartoon>` → `.cartoon-surface` + `.shadow-cartoon-*`). The orchestrator
applies:

| design.md line | Current (STALE) | Fix |
|---|---|---|
| ~499 | "interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.)" | → "interactive cards live in `<Card>` (which composes its hover via the `cartoon-surface` decoration utility)". Drop `.glass-cartoon` / `.cartoon-card`. |
| ~501 | "`.glass-cartoon`—**interactive cartoon surface** (Tranche G) … Carried by the `<CartoonCard>` sibling primitive (v0.8.0)." | → DELETE the `.glass-cartoon` shorthand row entirely. Replace with: "The cartoon register is the `cartoon-surface` decoration utility + the `.shadow-cartoon-{sm,md,lg}` family, selected by `<Card surface=cartoon>` (§Shadows Cartoon register). There is no `.glass-cartoon` / `<CartoonCard>`." |
| ~1069 | "`<ScrollPane>` and `<CartoonCard>` are sibling primitives … `<CartoonCard>` resolves through `.glass-cartoon`." | → Drop the `<CartoonCard>` clause: "`<ScrollPane>` is the sibling primitive lifted from the retired `variant="pane"` rung … The cartoon register is a `<Card surface=cartoon>` decoration, not a sibling primitive." |
| ~1077 | "the `<ScrollPane>` and `<CartoonCard>` sibling primitives (the structural lifts)." | → "the `<ScrollPane>` sibling primitive (the structural lift); the cartoon register is the `surface=cartoon` decoration axis." |
| ~1121 | table row "`glass-cartoon` \| cartoon-surface track \| cartoon-shadow disc \| Editorial / paper-design context" | → "`surface=cartoon` \| `cartoon-surface` decoration \| `--shadow-cartoon-*` stamp \| Editorial / paper-design context". Rename the row key off `glass-cartoon`. |
| ~1716 | component roster lists "cartoon-card" | → remove "cartoon-card" from the roster (it is not a component; cartoon is a Card surface). |

Plus the §Shadows + §L2 + §L4 AUGMENTS (the new-token doc):
- §Shadows Cartoon register: replace the deferred-decision note (~L411) with the
  RESOLVED ink decision — "the cast rides `--cartoon-ink` (a warm sepia-black,
  hsl-28, mixed `in oklab`), DISTINCT from the neutral `--shadow-color`; it stays a
  warm DARK ink in BOTH modes (never white in dark — a cel cast is ink), opacity
  floored up in dark + under `prefers-contrast`."
- §Shadows: update the `--shadow-cartoon-*` code block to the down-RIGHT bold
  layered planes (§3) — the live tokens, not the stale down-left ones.
- §L2 Cartoon punch: add "**shipped** in `tokens/scheme-motion.css`" (was prose-only).
- §L4: add "`--motion-weight` **shipped** in `tokens/scheme-motion.css` (rest 0.62)."

---

## 7. THE UNION (deft, KISS, no re-fork)

What this REUSES (survival of the fittest — keep what is fit):
- `--shadow-cartoon-{sm,md,lg}` + `--cartoon-shadow-*` aliases — KEPT, re-tinted +
  re-signed + boldened. Same token names, same carriers.
- `.cartoon-surface` `@utility` + `.shadow-cartoon-*` utilities — KEPT, extended
  with the `::before` caster + the punch-eased transitions.
- `<Card surface=cartoon>` — KEPT, byte-identical API. Gains the caster for free.
- `useLiquidPress` — KEPT, reused with a `pressVar: "--cartoon-press-t"` arg. No new
  composable.
- `usePointerVelocityField` / the specular position-write core — REUSED for the
  opt-in pointer-track cast. No new pointer engine.
- `--scale-press` (0.96), `--duration-normal`, `--border` — all REUSED.

What this ADDS (re-invent only what is broken/absent):
- `--cartoon-ink` + the three strength tokens + the three `--cartoon-cast-*` mixes
  (the warm ink — the gray-smudge FIX).
- `--ease-cartoon-punch` + `--motion-weight` (the design.md-fiction tokens, now
  BUILT).
- The `.cartoon-surface::before` caster layer + the `--cartoon-press-t` /
  `--cartoon-dx/dy` drives (the MOVING cast — the headline build).
- The dark-arm + PRM + contrast carves for the new ink/motion tokens.

What this RETIRES (no legacy): nothing new to retire — `.glass-cartoon` /
`<CartoonCard>` were already retired in `src/`; this only fixes the design.md
docs that still LIE about them (resolve #4).

ZERO new SFC. ZERO new composable. ONE new pseudo-element (on a free `::before`).
A handful of tokens. The boldest cartoon register in the smallest deft footprint.

---

## 8. THE GESTALT BAR (how to judge it live, both modes)

- **REST:** a cartoon card reads as a BOLD inked cel — a warm sepia-black layered
  offset stamp cast down-right, a 2px inked bezel, NOT a faint gray smudge.
  Measured target: the front cast plane resolves to a warm chroma (oklab a/b > 0,
  NOT R≈G≈B) at ≥30% α (vs the measured-defect 12% neutral).
- **HOVER:** the card lifts a hair up-left; the cast deepens (slides down-right via
  the caster) — the gap opens, the 2.5-D pop appears.
- **PRESS:** the body SQUASHES onto the cast (anticipation dip → 0.96 squash →
  1.22 overshoot → settle, the punch curve); the cast spreads. Release: the body
  snaps back, the ink RECOILS LATE (follow-through).
- **DARK:** the cast is STILL a warm dark ink (never white, never gray), opacity
  floored up so the offset reads against the near-black card.
- **PRM:** static bold stamp, zero travel/squash/punch.
- **Cross-engine:** identical in Chrome + Safari (transform-only caster, oklab mix,
  linear() with the expo fallback floor).

The cards must PUNCH. A flat plate with a faint offset has NOT shipped the register.
