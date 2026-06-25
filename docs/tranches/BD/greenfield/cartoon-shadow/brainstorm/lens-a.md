# Cartoon-shadow greenfield — LENS A (pure iOS-27 fidelity / 1940s-technicolor)

> Greenfield brainstorm for the CARTOON-SHADOW register. Designed from first principles
> against the design.md §Shadows edict + the BD hardening law, then unioned onto the landed
> `--shadow-cartoon-*` / `.cartoon-surface` / `<Card surface="cartoon">` carriers. KISS, DRY,
> no re-fork. Tranche-DEV only.

---

## 0. The live verdict (what is actually broken)

`/foundations/shadows`, light mode, computed:

```
--shadow-cartoon-md = -4px 3px 1px color-mix(in srgb, light-dark(hsl(24 10% 10%) …) 12%, transparent), …
--shadow-color      = light-dark(hsl(24 10% 10%), hsl(30 14% 90%))   // == --foreground
```

The CARTOON + CARTOON-HOVER swatches read **identically to the SOFT / ELEVATED rungs** —
a faint, near-neutral, 1px-blur offset. Three failures, named:

1. **It is a GRAY SMUDGE.** `--foreground` at 10-12% over a warm-cream card is a desaturated
   dark-brown that the eye reads as gray. There is zero technicolor. The 1px blur softens the
   offset so it is not even a *stamp* — it is a drop-shadow pretending to be cartoon.
2. **It does not PUNCH.** The cast is a static `box-shadow`. The `.cartoon-surface` hover only
   swaps `--shadow-cartoon-md → -lg` and lifts `--lift-sm` — a paint-bound box-shadow swap, no
   compositor travel, no anticipation, no overshoot. There is no moving cast at all.
3. **The motion half does not exist in src/.** `--ease-cartoon-punch` and `--motion-weight`
   are authored in design.md (§L2/§L4/§Shadows) but **return empty from `getComputedStyle`** —
   they were never landed. The register is half-specified.

So the register is, today, a faint drop-shadow with no ink and no motion. The bar is a **bold
layered-offset technicolor stamp that PUNCHES on interaction**. This is a RE-INVENT of the
visual + a GREENFIELD-LAND of the motion, unioned onto the existing carriers (no new class).

---

## 1. Core idea — the cel-stamp as a THREE-PLANE composite that rides ONE caster

A 1940s cel is three things stacked: **the matte ink line** (the bold black outline of the
character), **the cast shadow** (a flat saturated plane thrown onto the floor away from the key
light), and **the contact** (the dark seat where the character touches ground). The current
token throws all of this into one blurred `box-shadow` list — that is why it reads as a smudge.

The greenfield splits the register into **two cooperating layers**, each with one job:

- **The STATIC INK STAMP** stays on the host `box-shadow` (the landed `--shadow-cartoon-{sm,md,lg}`
  rungs, re-authored — see §2). This is the cel-ink: a HARD-EDGED (0-1px blur), CHROMATIC,
  layered-offset plane. It is the resting silhouette. It is what makes a card read as
  *cartoon-stamped* at rest, before anyone touches it.
- **The MOVING CAST** is a `::after` caster pseudo (the design.md §Shadows mechanism), absolutely
  positioned to cover the host, painted with the SAME ink, and **translated by a `transform`**
  that tracks the gesture. The host shadow is the cel's *fixed-light* cast; the `::after` is the
  *parallax* cast that slides opposite the motion and deepens on press. Compositor-only. This is
  what makes it PUNCH.

One register, two layers, ONE ink source, ONE motion scalar. No third system, no animated
box-shadow ever.

---

## 2. DECISION (1) — THE INK COLOR: warm-keyed chromatic ink, not neutral, not accent-keyed

**Verdict: WARM the ink (a deliberate warm-cream-complementary technicolor cel ink), NOT pure
neutral, NOT accent-keyed by default — with an accent-key OPT-IN.**

Reasoning across the three candidates:

- **Keep neutral (`--foreground`)** — REJECTED. This is the live defect. A neutral ink at the
  alpha needed to stay subtle reads as the gray smudge; pushed to full saturation it reads as a
  flat black sticker (the iOS-7-sticker incoherence the brief warns of). Neutral cannot win.
- **Accent-key it (`--glass-accent` / `--primary`)** — REJECTED as the DEFAULT (kept as opt-in).
  `--glass-accent` is `transparent` at rest (the A-2 no-op floor), so an accent-keyed cast would
  *vanish* on a bare card — the register would have no identity without a consumer hue. And
  `--primary` is a near-black in light mode (`hsl(24 10% 10%)`) → straight back to the smudge.
  Accent-keying is the right *option* (a themed cartoon card), not the *floor*.
- **WARM it — CHOSEN.** The house identity is warm-cream glass. The cel ink that complements a
  warm-cream key light is a **deep warm-umber / burnt-sienna in light, a warm-bone / cream-tan in
  dark** — a hue that is unmistakably *colored* (not gray) yet sits in the brand's warm family so
  it never fights the glass. It is the technicolor edict satisfied *idiomatically*: the technicolor
  of a 1940s Disney background is warm earth + cream, not RGB primaries.

### The token mechanism (the warm-floor union — reuses the BA.W-NO-GRAY discipline)

The ink is built by **biasing `--shadow-color` toward warmth in `oklab`**, so it inherits the
adaptive light↔dark flip for free (the house cartoon-shadow contract) but is shifted off neutral
into the warm-cream complement. ONE new token, consumed by all three rungs:

```css
:root {
  /* The cartoon cel-ink: --shadow-color (= --foreground) warmed toward burnt-umber.
     oklab mix keeps the L of the foreground (so it still flips light→dark and stays
     adaptive) while injecting the warm a/b chroma that lifts it off gray. NOT
     --foreground raw (the smudge); NOT --primary (near-black in light); a warm,
     saturated cel ink in the brand family. A consumer re-points --cartoon-ink to
     --glass-accent for an accent-keyed card (the opt-in), or to --foreground to
     restore the neutral stamp. */
  --cartoon-ink-hue: oklch(0.30 0.09 64);   /* burnt-umber/sienna — warm cel ink */
  --cartoon-ink: color-mix(in oklab, var(--shadow-color) 55%, var(--cartoon-ink-hue));
}
```

```css
.dark {
  /* The dark cel ink: a warm BONE/CREAM-TAN, not white. Same construction: the
     dark --shadow-color (near-cream hsl(30 14% 90%)) biased warmer so the stamp on
     a near-black card reads as a warm light-line, not a cold gray ghost. */
  --cartoon-ink-hue: oklch(0.86 0.05 78);   /* warm bone */
}
```

**Why this beats the smudge, provably:** the cast's chroma in `oklab` goes from ~0 (neutral
`--foreground`) to a measurable warm chroma (the π-arm reads a non-zero `b` channel / a non-gray
oklch C). The brief's bar — "must NOT read as a gray smudge + must hold both modes" — is met by
construction: ONE token, adaptive, warm, both modes, with the accent-key escape hatch preserved.

### The alpha + blur — STAMP, not drop

The other half of "not a smudge" is the EDGE. The re-authored rungs (§4) use **0px blur on the
ink planes** (a hard cel edge) and push the alpha UP from 8-12% to a bold **24-40%** on the lead
plane — a card must read as *inked*, not *hinted*. `prefers-contrast: more` floors it higher
still (the inked edge is a legibility asset, per design.md §Shadows).

---

## 3. DECISION (3) — THE CAST DIRECTION: down-and-away, NO trig (reuse the landed offsets, fixed)

**Verdict: AVOID trig entirely. The key light is upper-left → the cast lands LOWER-RIGHT. Author
the offsets as plain signed px in the canonical down-right family. The glass-material spike's
`cos(-58deg)*-14` sign-inversion is exactly why trig is banned here — one wrong sign sends the
cast UP toward the light (the iOS-7-sticker incoherence).**

The landed rungs cast **down-LEFT** (`-4px 3px`): negative X = leftward, positive Y = downward.
That is half-right (down is correct) but the X sign is **wrong for an upper-left key** — a
upper-left light throws its shadow to the lower-RIGHT, so X must be **positive**. The greenfield
**corrects the sign** while keeping the plain-px (no-trig) approach:

```
key light at upper-left (the house specular origin, glass/material.css ~315°/-58°-ish)
        ☀
         ╲
          ▢ object
           ╲
            ▨  cast lands LOWER-RIGHT  →  offset = (+X, +Y)
```

The greenfield offset family (lead plane), down-right, hard-edged, layered:

```
sm:  +2px +3px   (lead)  /  +3px +4px (deep)
md:  +3px +4px   (lead)  /  +5px +6px (deep)
lg:  +4px +6px   (lead)  /  +7px +9px (deep)
```

These honor the golden bias (§L6): the deep-plane offset ≈ lead × √φ (≈1.27), so the two planes
read as one proportioned stack, not two arbitrary drops. **No `cos()`, no `sin()`, no sign trap.**
The direction is encoded once, as data, in the canonical down-right family — and it MATCHES the
key-light the rest of the system already paints from (the specular catch-light), so the cel reads
coherent: light upper-left, highlight upper-left, ink-cast lower-right. That coherence is the
thing the sign-inverted spike destroyed.

---

## 4. The re-authored static ink stamp (the host box-shadow rungs)

Two HARD planes (a near-black-ink lead at the surface + a deeper, slightly-softer-but-still-tight
under-plane) — the layered-offset cel stamp. NO 1px-blur smudge; the lead plane is **0px blur**.

```css
:root {
  --cartoon-ink-lead:  color-mix(in oklab, var(--cartoon-ink) 92%, transparent); /* the bold line */
  --cartoon-ink-deep:  color-mix(in oklab, var(--cartoon-ink) 64%, transparent); /* the cast plane */

  /* HARD lead plane (0 blur) + a tight deep plane (1px) one step further down-right.
     Down-RIGHT (+X +Y) — cast away from the upper-left key light (§3). The deep
     offset ≈ lead × √φ (§L6 golden). */
  --shadow-cartoon-sm:
    2px 3px 0   0 var(--cartoon-ink-lead),
    3px 4px 1px 0 var(--cartoon-ink-deep);
  --shadow-cartoon-md:
    3px 4px 0   0 var(--cartoon-ink-lead),
    5px 6px 1px 0 var(--cartoon-ink-deep);
  --shadow-cartoon-lg:
    4px 6px 0   0 var(--cartoon-ink-lead),
    7px 9px 1px 0 var(--cartoon-ink-deep);
}
```

`--cartoon-ink-lead` at ~92% of a 24-40%-strength warm ink lands the lead plane around the bold
end; the deep plane trails. The result is a CARD THAT READS STAMPED at rest — the visual bar.
(The `--shadow-cartoon` / `-hover` legacy aliases re-point to `-md` / `-lg`; no separate recipe.)

---

## 5. DECISION (2) — THE MOVING CAST: a `::after` caster, transform-only, --motion-weight-scaled

The PUNCH. The mechanism design.md §Shadows specifies, made concrete and compositor-pure.

### The caster layer

```css
.cartoon-surface,
.shadow-cartoon-sm, .shadow-cartoon-md, .shadow-cartoon-lg {
  position: relative;       /* host already is, for the glass pseudos */
  isolation: isolate;       /* the caster sits in the host's own stacking context */
}

/* The MOVING CAST. A second ink plane that lives BELOW the card (z behind), painted
   with the same cel ink, that TRANSLATES to track the gesture. It is the parallax
   cast — the host box-shadow is the fixed-light cast; this slides under it.
   Transform-only → compositor-cheap. NEVER an animated box-shadow. */
.cartoon-surface::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;                      /* behind the card face */
  border-radius: inherit;
  /* The cast is a SOLID inked silhouette (not a blur): the card's own shape, filled
     with the deep ink, offset down-right by the rest cast. It IS the lower plane,
     promoted to its own layer so a transform can move it. */
  background: var(--cartoon-ink-deep);
  /* Rest position = the static cast offset (matches the box-shadow deep plane so at
     rest the ::after sits exactly under the painted stamp — seamless). */
  --cast-x: calc(5px * var(--motion-weight, 0.62));
  --cast-y: calc(6px * var(--motion-weight, 0.62));
  --cast-dx: 0px;   /* gesture parallax, written by JS / :active, default 0 */
  --cast-dy: 0px;
  translate: calc(var(--cast-x) + var(--cast-dx)) calc(var(--cast-y) + var(--cast-dy));
  transition: translate var(--spring-smooth-duration) var(--ease-cartoon-punch, var(--spring-smooth));
  will-change: translate;
}
```

### The three motion beats

1. **MOVE (parallax).** When the card translates (drag, hover-lift, dock-travel), the cast slides
   **opposite** the motion — the cel light is fixed, so the object moving up-left means its shadow
   appears to slide down-right relative to it. A composable writes `--cast-dx/--cast-dy` =
   `−gesture × k × --motion-weight`. The OPPOSITE sign is the whole trick: object moves one way,
   cast moves the other, the gap between them grows → the object reads as *lifting off its shadow*.

2. **PRESS (deepen + close).** `:active` pulls the card DOWN onto its shadow — the gap CLOSES (the
   object is pressed flat to the floor), the ink deepens, and the host scales `--scale-press`. This
   is the anticipation→squash:

   ```css
   .cartoon-surface:active:not(:disabled) {
     scale: var(--scale-press);                 /* 0.96 squash */
     translate: var(--cast-x-press) var(--cast-y-press);  /* the card moves toward its cast */
   }
   .cartoon-surface:active::after {
     --cast-dx: calc(-2px * var(--motion-weight));  /* cast closes UP toward the card */
     --cast-dy: calc(-3px * var(--motion-weight));
     background: var(--cartoon-ink-lead);            /* deepens (object sits on it) */
   }
   ```

3. **RELEASE (punch + settle).** On release the `--ease-cartoon-punch` `linear()` carries the snap:
   the card anticipates (dips ~4% below origin), overshoots ~22%, then settles — the cast lags one
   beat behind (follow-through / overlapping action, §L4 #5) and re-opens to its rest gap. This is
   the loud cartoon PUNCH. It is one transition on `translate`/`scale`, eased by the shaped curve.

### Why `::after` solid-fill, not a box-shadow on the pseudo

A box-shadow even on a pseudo is still paint-bound when it animates. A **solid-filled, clipped,
absolutely-positioned div that you `translate`** is the cheapest possible moving shadow — it is a
single composited layer, GPU-transformed, zero per-frame repaint. It is the metaball-bridge /
specular-sweep discipline applied to the cartoon cast. The hard cel edge is a *bonus*: a solid
fill has a crisp silhouette, which is exactly the cel look (a blurred box-shadow could never).

### Cross-engine (Chrome + Safari)

- `translate`/`scale` longhands, `z-index:-1` under an `isolation:isolate` host — all Baseline,
  identical in Blink + WebKit. No `filter`, no `backdrop-filter`, no `box-shadow` animation, no
  `@property` required for the cast itself.
- `--ease-cartoon-punch` is a raw `linear()` token (Baseline 2023) — both engines.
- The `oklab` color-mix for the ink — both engines (Safari 16.4+). A `@supports not (color: oklab(…))`
  floor falls the ink back to a warm sRGB literal (`#5a4632`-ish) so a legacy engine still gets a
  warm — not gray — stamp.

---

## 6. The PRM / a11y carve (design.md §L5 + §Shadows)

```css
@media (prefers-reduced-motion: reduce) {
  .cartoon-surface, .shadow-cartoon-* { --motion-weight: 0; }
  .cartoon-surface::after { transition: none; translate: var(--cast-x) var(--cast-y); }
  /* The STATIC stamp survives (it is the identity); only the travel + punch are removed.
     --motion-weight:0 zeroes the parallax in one assignment (the §L4 cascade). */
}
@media (prefers-contrast: more) {
  :root { --cartoon-ink-lead: color-mix(in oklab, var(--cartoon-ink) 100%, transparent); }
  /* The inked edge floors UP — a legibility asset, not decoration. */
}
/* prefers-reduced-transparency does NOT touch the cast — opaque ink, not a transmissive
   layer; it survives as a bonus legibility anchor (design.md §Shadows, verbatim). */
```

PRM → static cast, zero travel, zero punch, stamp intact. Exactly the design.md contract.

---

## 7. The motion tokens to LAND (currently empty in src/)

These are authored in design.md but absent from `getComputedStyle` — the greenfield must LAND them
(they are the register's motion half, with no home today):

```css
/* scheme-motion.css (§L2 easing block) */
--ease-cartoon-punch: linear(0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12,
                             1.22 66%, 1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1);

/* scheme-motion.css §Motion (or a --motion-weight home) */
--motion-weight: 0.62;   /* 1/φ rest — §L4. Dock/celebration push toward 1. */
```

Verbatim from design.md §Easing + §L4 — no invention, just landing the spec. PRM zeroes
`--motion-weight`; `--ease-cartoon-punch` collapses to `--ease-standard` (the §L5 cascade).

---

## 8. The composable — `useCartoonCast` (the move-parallax driver, OPT-IN)

The press/release beats are pure CSS (`:active` + the punch curve). Only the **move-parallax**
needs JS (it tracks a live gesture delta). ONE tiny composable, reusing the extant pointer-velocity
field pattern (`usePointerVelocityField` already ships for the dock fission):

```ts
// useCartoonCast(elRef): writes --cast-dx/--cast-dy = -gestureDelta * k * motionWeight
// onto the host, rAF-throttled, cleared on pointerup (the punch curve settles it).
// Reuses the SAME velocity-field math the dock seam-tension uses — no new engine.
```

It is opt-in: a static `.shadow-cartoon-md` card gets the stamp + the press/release punch for
free (CSS-only); a *draggable* cartoon card composes `useCartoonCast` for the live move-parallax.
DRY — the dock already has the velocity primitive; the cast just consumes it.

---

## 9. DECISION (4) — DOC-HYGIENE: the precise design.md edit list

design.md still cites the RETIRED `<CartoonCard>` / `.glass-cartoon` as LIVE. src/ retired them
(`cards.css` "former `.glass-cartoon`"; `Card.vue` "retired `<CartoonCard>`"). The live carrier is
`<Card surface="cartoon">` → `.cartoon-surface` + `.shadow-cartoon-*`. The DELTA produces this
edit list for the orchestrator to apply:

| Line (≈) | Stale text | Fix |
|---|---|---|
| ~499 | "`.glass-card`… interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.)" | "…via `.cartoon-surface` (the `<Card surface="cartoon">` decoration) / a hover variant." Drop `.glass-cartoon` + `.cartoon-card` (both retired). |
| ~501 | Entire `.glass-cartoon`—**interactive cartoon surface** bullet (cartoon-tier, `--glass-bg-cartoon` fall-through, "Carried by the `<CartoonCard>` sibling primitive (v0.8.0)") | DELETE. The phantom `--glass-bg-cartoon` token + `<CartoonCard>` are retired. Replace with one line: "`.cartoon-surface`—**the cartoon decoration utility** (composed by `<Card surface="cartoon">`): a 2px bezel, the layered-offset cel stamp (`--shadow-cartoon-md`→`-lg` on hover), and the moving `::after` cast (the punch). NOT a tier — it overlays the host's resolved glass tier." |
| ~1069 | "`<ScrollPane>` and `<CartoonCard>` are sibling primitives lifted from the retired `variant=…` rungs… `<CartoonCard>` resolves through `.glass-cartoon`." | Drop the `<CartoonCard>` clause entirely; keep `<ScrollPane>`. Replace the cartoon clause with: "the cartoon register is reached via `<Card surface="cartoon">` (the `.cartoon-surface` decoration), not a sibling primitive." |
| ~1077 | "Cards distinguish their structural register via the `tier` prop plus the `<ScrollPane>` and `<CartoonCard>` sibling primitives" | "…plus the `<ScrollPane>` sibling primitive and the `surface` axis (`cartoon` / `veil`) for decorations." Drop `<CartoonCard>`. |
| ~1121 | Table row `\| glass-cartoon \| cartoon-surface track \| cartoon-shadow disc \| Editorial / paper-design context \|` | Re-key the row from `glass-cartoon` to `surface="cartoon"` (the live selector); body unchanged. |
| ~1716 | component roster lists `cartoon-card` | Drop `cartoon-card` from the roster (retired SFC). |
| ~395-413 (§Shadows) | Currently neutral-ink + down-LEFT offsets + "warm tint deferred to greenfield" note | UPDATE to the warm cel-ink decision (§2), the down-RIGHT sign (§3), the re-authored hard-plane rungs (§4), and resolve the deferred note: "the cartoon cast is WARM-keyed (`--cartoon-ink` = `--shadow-color` biased toward burnt-umber in oklab; accent-key opt-in via re-pointing `--cartoon-ink`)." |

---

## 10. DELTA-ASSAY → wave amendment (union, no re-fork)

Reconcile vs the 116 union waves. This is a **UNION onto the landed carriers**, not a new system:

- **AUGMENT `BD.W-DEEP-GLASS-*` / the shadow waves** with **`BD.W-CARTOON-CEL-INK`**: re-author
  `--shadow-cartoon-{sm,md,lg}` to the hard two-plane warm-ink stamp + add the `--cartoon-ink*`
  tokens (shadow.css + dark-arm.css). Pure token re-author — no new class, no new file. Born-RED:
  a π-arm reading the cast's oklch chroma > 0 (non-gray) AND the lead-plane blur == 0 (hard edge),
  both modes; the live `/foundations/shadows` CARTOON swatch must read visibly distinct from SOFT.
- **NEW `BD.W-CARTOON-PUNCH`** (the motion half): LAND `--ease-cartoon-punch` + `--motion-weight`
  (scheme-motion.css), add the `::after` caster + press/release beats to `.cartoon-surface`
  (cards.css), the PRM/contrast carve, and `useCartoonCast` (the move-parallax composable, reusing
  `usePointerVelocityField`). Born-RED: a π frame-series proving the cast TRANSLATES on press (gap
  closes) + PUNCHES on release (anticipation dip + overshoot in the `translate` track), compositor-
  only (no box-shadow in the animation), PRM→static, Chrome + Safari.
- **NEW `BD.W-CARTOON-DOCFIX`** (doc-hygiene): apply the §9 design.md edit list (retire the
  `<CartoonCard>` / `.glass-cartoon` ghosts; re-key to `surface="cartoon"`).
- **NO re-fork:** the `.shadow-cartoon-*` utilities + `.cartoon-surface` + `<Card surface="cartoon">`
  carriers are KEPT and EXTENDED. The phantom `--glass-bg-cartoon` layer was already dropped — this
  greenfield does not resurrect it. One ink source, one motion scalar, one caster layer.

---

## 11. Gestalt check against the bar

The cards must read as **bold cartoon-stamped surfaces that PUNCH on interaction, not flat plates
with a faint gray offset.** This design delivers:

- **STAMP:** a hard-edged (0-blur), warm-chromatic, two-plane layered cel ink at rest — the card
  reads inked before you touch it (vs the current gray-smudge drop).
- **PUNCH:** a transform-only `::after` cast that slides opposite on move, closes + deepens on
  press, and snaps with the `--ease-cartoon-punch` anticipation→overshoot on release — real weight,
  inertia, squash & stretch (§L4 #2/#5/#10/#11), compositor-cheap, Chrome + Safari, PRM-static.
- **WARM, BOTH MODES:** the ink is `--shadow-color` biased to burnt-umber (light) / warm-bone
  (dark) in oklab — adaptive by construction, never gray, never fighting the warm-cream glass.
- **COHERENT LIGHT:** key light upper-left (matching the specular), cast lower-right (the sign the
  spike inverted), no trig — the cel reads as one lit object, not an iOS-7 sticker.
