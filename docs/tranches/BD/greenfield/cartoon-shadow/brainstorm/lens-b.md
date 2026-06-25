# Cartoon-Shadow Register — GREENFIELD (Lens B: cross-engine / perf-first)

> Lens: design for FLAWLESS Chrome **and** Safari + performance. The simplest mechanism that hits the
> bar (KISS). Compositor-only motion. PRM/contrast carves. A union with the landed
> `--shadow-cartoon-*` / `.cartoon-surface`, never a re-fork.

---

## 0. The live verdict (status quo, captured)

`/foundations/shadows`, light mode, `take_screenshot` + `getComputedStyle` (2026-06-24):

- The **CARTOON** and **CARTOON-HOVER** swatches are visually **indistinguishable from SOFT / ELEVATED** —
  faint, soft, gray. There is NO bold layered offset stamp, NO cel-ink read, NO punch. The cartoon swatch
  reads as a blurry drop shadow, exactly the "flat plate with a faint gray offset" the brief names as the
  failure.
- `--shadow-cartoon-md` resolves to `… color-mix(in srgb, light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 12%, transparent) …`
  — a **12% NEUTRAL black** cast (warm-ish hue but desaturated to near-gray at 12%, with a `1–2px` blur).
  A 12% near-black over a warm-cream card is a **gray smudge**, not a cel ink.
- **`--ease-cartoon-punch` resolves to EMPTY. `--motion-weight` resolves to EMPTY.** Both are authored in
  `design.md` (§L2 / §L4 / §Shadows) but **never shipped to `src/`**. The "moving cast" the register
  promises does not exist anywhere — there is no `::after` caster, no punch curve, no weight scalar. The
  register is, today, **a faint static box-shadow + prose**.
- The blur (`1px`/`2px`) softens the offset planes — a true cel stamp has a **hard zero-blur edge**. The
  current rungs are a soft drop dressed up as a stamp.

**Diagnosis.** Three independent failures stacked: (1) the ink is too weak + desaturated + blurred to
read as a stamp; (2) the motion half was never built; (3) the doc cites retired carriers as live. The
greenfield fixes all three as ONE coherent register.

---

## 1. Core idea — the CEL-INK register: a hard warm-ink stamp that LIFTS off its cast on touch

A cartoon surface is a **cel**: a flat painted shape with a hard-edged ink outline, sitting above a
fixed-light **cast** painted on the cel below it. The register has exactly **two physical parts**:

1. **The STAMP (paint, static)** — a hard, **zero-blur**, **chromatic-warm**, layered-offset cast that
   reads as bold cel ink, not a gray drop. It is a `box-shadow` on the surface (cheap, never animated).
2. **The CASTER (transform, moving)** — a `::after` pseudo that paints the *same* cast as a self-contained
   layer and **translates on the compositor** opposite the gesture. The object lifts off its cast on press
   (the gap widens → it pops UP off the page), and snaps back on release. The stamp `box-shadow` is the
   **PRM/static floor**; the caster is the **alive layer** that rides on top when motion is allowed.

The cel-light is **fixed** (upper-left key, the house light). The object moves; the cast stays put; so the
**caster translates the SAME direction as the object's own lift** but the object out-runs it — the visible
gap (object minus cast) opens DOWN-RIGHT, away from the key. That is the entire trick, and it is one
`translate` on one pseudo.

**The boldest move:** *retire the soft blurred box-shadow as the cartoon identity and make the moving
`::after` caster the register's primary organ* — a **hard-edged, warm-chromatic, ZERO-blur ink slab** that
the surface visibly LIFTS OFF on press (the gap punches open `~Npx` scaled by `--motion-weight`, eased by
`--ease-cartoon-punch`) and SLAMS back on release. Not "a shadow that animates" — *an object peeling off
its own painted cel shadow and snapping back*, the literal 1940s squash-and-stretch read, done entirely
on the compositor. The box-shadow rung survives only as the PRM/no-pseudo floor.

---

## 2. Decision (1) — THE INK COLOR: warm-chromatic cel ink (decided)

**Decision: WARM the ink off neutral; keep it KEYED to the surface's warm-cream identity, NOT accent-keyed.**

Rationale, ranked against the three candidates:

- **Keep neutral (`--foreground`):** REJECTED. It is the status-quo gray smudge. A 1940s technicolor cel
  never casts neutral gray — the ink is a saturated, deliberately *colored* line (Fleischer/early-Disney
  cels use a warm sepia/umber or a chromatic complement, never #000 at 12%). Neutral fails the brief's
  "must NOT read as a gray smudge."
- **Accent-keyed (`--glass-accent`):** REJECTED as the *default*. The accent is the consumer's per-instance
  hue (presets-in-consumers); keying the cast to it makes the cast vanish when no accent is set (the A-2
  no-op floor → `transparent` → no stamp), and an unset-accent cartoon card would lose its identity. It
  also fights the rim/glint accent register (double-duty on one hue). KEEP it available as an opt-in
  override (see §2c) but never the default.
- **Warm-chromatic, identity-keyed (CHOSEN):** the cast is a **warm sepia-umber ink** derived from the
  house `--foreground` hue family but pushed in chroma and DEEPENED in L, so at the stamp's higher opacity
  it reads as a *colored cel line*, not gray. It re-resolves per mode by construction (light = warm-umber
  ink on cream; dark = warm-cream ink on near-black), holding both modes with NO hardcoded `.dark` block,
  exactly the house cartoon-shadow adaptive contract.

### 2a. The ink token (the one new color primitive)

```css
:root {
  /* The CEL INK — a warm, chromatic stamp ink. Derived from --foreground's warm hue
     (oklch h-extract), pushed in chroma + deepened in L so at stamp opacity it reads as a
     COLORED cel line, never a neutral gray. Light: warm-umber ink. The dark arm flips it to a
     warm-cream ink off the dark --foreground (no parallel -dark token; oklch-from re-resolves). */
  --cartoon-ink:        oklch(from var(--foreground) clamp(0.18, l, 0.30) max(c, 0.055) h);
  /* Per-mode opacity: the stamp must READ. ~28% in light (a bold warm line on cream),
     lifted to ~38% under prefers-contrast: more (the inked edge is a legibility asset). */
  --cartoon-ink-strength: 0.28;
}
```

- The cast opacity jumps from the status-quo **8–12% → ~28%** (the headline visual fix). At 28% a
  *warm-chromatic* (non-gray) ink reads as a deliberate cel line; at 28% neutral black would read muddy,
  which is exactly why the chroma push is load-bearing, not decorative.
- `oklch(from … h)` extracts the warm hue; `max(c, 0.055)` floors the chroma so the cast can never collapse
  to gray even if `--foreground` is desaturated; `clamp(0.18, l, 0.30)` deepens it so the ink is a *dark
  warm* line in light (and the dark arm, with a light `--foreground`, gives a *light warm* ink — the
  clamp's upper rung). `oklch(from …)` is Baseline 2023; a non-supporting engine (none current) would need
  the literal fallback below.

### 2b. The zero-blur, hard-edge stamp (re-pointed rungs — extend, no re-fork)

The landed `--shadow-cartoon-{sm,md,lg}` keep their **layered-offset geometry** (the three-plane down-left
+ down + down-right structure is correct, see §4) but re-point the cast color OFF `--shadow-color` ONTO
`--cartoon-ink` and **drop the blur to 0** (a cel stamp is hard-edged):

```css
/* down-left primary plane · down spine · down-right deep plane — ALL zero-blur, warm ink. */
--shadow-cartoon-sm:
   -3px 2px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    0   3px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    3px 4px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 0.65 * 100%), transparent);
--shadow-cartoon-md:
   -4px 3px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    0   4px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    4px 5px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 0.65 * 100%), transparent);
--shadow-cartoon-lg:
   -6px 4px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    0   6px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 100%), transparent),
    6px 7px 0 color-mix(in oklab, var(--cartoon-ink) calc(var(--cartoon-ink-strength) * 0.65 * 100%), transparent);
```

This is a **token-substitution** on the EXISTING rungs (same names, same three-plane shape, same consumers
`.shadow-cartoon-*` + `.cartoon-surface` + `.metric-badge`) — DRY, no new utility, no re-fork. The two
real changes are *color → warm ink* and *blur → 0*. The dark arm needs NO re-declaration: `--cartoon-ink`
is `--foreground`-derived, so it flips with the mode like the rest of the family.

### 2c. The opt-in accent ink (kept available, off by default)

A consumer who *wants* the editorial accent cast re-points one token on the cascade:
`--cartoon-ink: var(--glass-accent);` (or any color). The strength + geometry rungs are untouched. This is
the presets-in-consumers carve: the library's default identity is the warm cel ink; the accent cast is a
consumer decision, exactly as the rim/selection accent already works.

---

## 3. Decision (2) — THE MOVING CAST: a `::after` caster that lifts off on press

### 3a. The mechanism (concrete)

A `.cartoon-surface` (and an opt-in `.shadow-cartoon-cast` utility for bare uses) gains a `::after` that
paints the **same warm-ink stamp as its OWN box-shadow** and translates on the compositor:

```css
@utility cartoon-surface {
  position: relative;                 /* the caster anchors to the surface box */
  border-width: 2px;
  /* The PRM / no-pseudo FLOOR: the static stamp still rides the host box-shadow. */
  box-shadow: var(--shadow-cartoon-md);
  translate: 0;
  /* the lift travel scalar, rest 0; press/move write it. compositor-only. */
  --cast-dx: 0px;
  --cast-dy: 0px;
  transition:
    translate var(--duration-normal) var(--ease-cartoon-punch),
    --cast-dx  var(--duration-normal) var(--ease-cartoon-punch),
    --cast-dy  var(--duration-normal) var(--ease-cartoon-punch);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;                       /* behind the cel, in front of the page */
    border-radius: inherit;
    /* the caster paints the SAME warm ink as a self-contained slab via box-shadow on a
       zero-size offset — but as a TRANSLATABLE layer the compositor can move for free. */
    box-shadow: var(--shadow-cartoon-md);
    /* the LIFT: the cast slides toward the key-light origin while the object holds, so the
       visible gap (object − cast) opens DOWN-RIGHT, away from the key. ONE compositor transform. */
    translate: var(--cast-dx) var(--cast-dy);
    transition: translate var(--duration-normal) var(--ease-cartoon-punch);
    /* @property --cast-dx/dy are registered <length>s so the transition interpolates them. */
  }

  /* PRESS — the object LIFTS off its cast (the gap punches open, scaled by --motion-weight). */
  &:active:not(:disabled) {
    --cast-dx: calc(2px * var(--motion-weight));
    --cast-dy: calc(2px * var(--motion-weight));
    scale: var(--scale-press);        /* the squash; the object compresses AS it lifts */
  }

  /* HOVER — the resting lift; the cast deepens to the lg rung + a small steady gap. */
  &:hover:not(:active):not(:disabled) {
    translate: var(--lift-sm) var(--lift-sm);
    box-shadow: var(--shadow-cartoon-lg);
    &::after { box-shadow: var(--shadow-cartoon-lg); }
  }
}
```

Key properties:

- **Compositor-only.** The moving part is `translate` on the `::after` (and `scale`/`translate` on the
  host). The `box-shadow` on the caster is **set once per state-flip** (hover/active) — it is NOT animated
  per frame (the §L7 / paint-cost-fence rule: box-shadow flips at discrete states, transform carries the
  steady motion). No animated `box-shadow`, ever.
- **`--motion-weight` scales the lift.** Rest `0.62 ≈ 1/φ`; a card picks it once. The press gap, the squash
  depth, and (if a drag composable feeds it) the move-cast travel all scale by the SAME scalar → one
  proportioned deformation. PRM sets `--motion-weight: 0` → zero gap, zero squash, static stamp.
- **`--ease-cartoon-punch` eases the snap.** The press→release transition rides the shaped `linear()` with
  the negative anticipation dip + ~22% overshoot — the cel "anticipates, punches, settles," which no
  spring can express. The `@property`-registered `--cast-dx/dy` lengths let the transition interpolate the
  custom props on the compositor.

### 3b. The MOVE cast (drag / pointer-driven, opt-in composable)

For a *dragged* cartoon surface, the cast must trail the gesture continuously (not just press/release). A
tiny composable `useCartoonCast(el, { weight })` writes `--cast-dx/dy` from pointer velocity:

```ts
// the cast trails OPPOSITE the gesture, capped, scaled by --motion-weight; rAF-coalesced; PRM → no-op.
// reuses the house usePointerVelocityField shape (DRY) — same tanh-capped velocity read the dock uses.
function useCartoonCast(el, { weight = 0.62, cap = 6 }) {
  // on pointermove: dx = -clamp(vx * k, -cap, cap) * weight ;  el.style.setProperty('--cast-dx', dx+'px')
  // on pointerup: write 0 (the punch curve eases it home) ;  offscreen / hidden → pause (useIntersectionPause)
}
```

This is **opt-in** (drag surfaces only); the press/hover lift in §3a needs no JS at all (pure CSS state).
The composable reuses the existing `usePointerVelocityField` / `useIntersectionPause` primitives — no new
engine.

### 3c. Cross-engine (Chrome + Safari)

- `translate` / `scale` longhands + `box-shadow` + `color-mix(in oklab)` + `oklch(from)` are all Safari
  16.4+/Baseline. The caster is a plain pseudo with a transform — WebKit composites it identically to
  Chrome. **No `backdrop-filter`, no `filter:url()`, no metaball** — the cartoon register is opaque ink,
  the one register that does NOT touch the fragile WebKit transmissive path. This is the *safest* engine
  story in the whole tranche.
- `@property --cast-dx/dy` (registered `<length>`, initial `0px`) — Safari 16.4+. A non-supporting engine
  skips the smooth interpolation but still snaps the gap (graceful: an unregistered custom prop transition
  jumps rather than eases; the stamp + state still read). The `linear()` easing — Safari 17.2+; older WebKit
  falls back to `--ease-standard` (the transition still runs, just without the overshoot).

---

## 4. Decision (3) — THE CEL CAST DIRECTION: hand-authored, no trig (decided)

**Decision: AVOID trig entirely. Reuse hand-authored down-and-rightward offsets.**

The glass-material spike's `cos(-58deg) * -14 = up-LEFT` bug is a sign-inversion class — get a sign wrong
once and the cast points *toward* the light (the iOS-7-sticker incoherence). The fix is not "get the trig
right" — it is **don't use trig** for a fixed-light register. The key light is the house upper-left key, so
the cast lands **lower-right**, and a hand-authored offset triple expresses that with zero arithmetic and
zero sign risk:

- **Key = upper-left** → primary cast plane to the **lower-right** (the deep `+x +y` plane in §2b is the
  furthest, lowest-opacity rung).
- The landed rungs cast the *primary* plane **down-LEFT** (`-3px 2px`) + a **down spine** (`0 3px`). The
  greenfield keeps the down-left + down-spine (they read as the cel's left-edge ink + base contact) and
  adds the **down-RIGHT deep plane** (`+3px 4px`) as the third, lowest-opacity rung — so the silhouette is
  ringed by a warm ink that is HEAVIEST down-and-left (the contact edge) and TRAILS down-right (away from
  the key). This is the classic three-plane cel stamp and it is **all literals** — no `cos`, no sign to
  invert.
- The MOVE/press lift (§3a) translates the cast toward the key-origin (up-left) so the gap opens down-right
  — also a literal (`+2px +2px` on the caster slides the cast down-right relative to the lifted object;
  equivalently the object lifts up-left off a held cast). The direction is asserted by the sign of two
  literal lengths, eyeballed against the live demo in both modes, never computed.

If a future variant *must* parametrize the angle, the safe form is the **explicit unit-vector literal**
(`--cast-dir-x: 0.7; --cast-dir-y: 0.7;` for down-right) multiplied by a magnitude — never `cos(angle)`,
which is where the sign died.

---

## 5. Decision (4) — DOC-HYGIENE: the precise design.md edit list

`design.md` still cites the RETIRED `<CartoonCard>` / `.glass-cartoon` as LIVE. `src/` retired them
(`cards.css` comment "the former `.glass-cartoon` recipe"; `Card.vue` "the retired `<CartoonCard>` was
`tier="quiet" surface="cartoon"`"). The live carrier is `<Card surface="cartoon">` → `.cartoon-surface` +
the `.shadow-cartoon-*` utilities. The DELTA must produce this edit list for the orchestrator to apply:

| # | design.md locus | STALE text | FIX |
|---|---|---|---|
| D1 | §Convenience shorthands, line ~501 | `.glass-cartoon`—**interactive cartoon surface** … `<glass-bg-cartoon>` fall-through … Carried by the `<CartoonCard>` sibling primitive (v0.8.0). | **DELETE the `.glass-cartoon` bullet.** Replace with: `.cartoon-surface`—**the Memphis-sticker decoration** (cards.css): 2px border + the warm-ink offset stamp (`--shadow-cartoon-md`) + a `::after` moving caster + hover-lift. Composes ON TOP of any glass tier (not a tier). Carried by `<Card surface="cartoon">`. |
| D2 | §Convenience shorthands, line ~499 | `.glass-card` … interactive cards live in `<Card>` (which composes its own hover via `.glass-cartoon` / `.cartoon-card` / etc.) | Replace `via .glass-cartoon / .cartoon-card / etc.` → `via the surface ladder (surface="cartoon" → .cartoon-surface, or a hover-tier)`. |
| D3 | line ~1069 | `<ScrollPane>` and `<CartoonCard>` are sibling primitives … `<CartoonCard>` resolves through `.glass-cartoon`. | **DELETE the `<CartoonCard>` clause.** Keep `<ScrollPane>`. Replace the cartoon clause with: the cartoon register is reached via `<Card surface="cartoon">` (the `.cartoon-surface` decoration), not a sibling SFC. |
| D4 | line ~1077 | Cards distinguish … plus the `<ScrollPane>` and `<CartoonCard>` sibling primitives | Drop `and <CartoonCard>` → `plus the `<ScrollPane>` sibling primitive and the `surface` axis (glass · cartoon · veil)`. |
| D5 | line ~1121 (CardHeader knob table) | `| glass-cartoon | cartoon-surface track | cartoon-shadow disc | Editorial … |` | Rename the knob row label `glass-cartoon` → `cartoon` (the live `surface` value); the track/disc copy is fine. |
| D6 | §Shadows, the deferred-decision note (~line 411) | `> A *warm-tinted* … cartoon cast … is a deliberate token decision DEFERRED to the cartoon-shadow greenfield …, not asserted here.` | Replace with the RESOLVED decision: the cast rides `--cartoon-ink` (a warm-chromatic `oklch(from --foreground …)` ink at ~28%, NOT neutral `--shadow-color`), zero-blur hard-edge, accent-keyable per-instance. Cite this brainstorm. |
| D7 | §Shadows, the cartoon rung block (~line 400) | the `color-mix(in srgb, var(--shadow-color) N%, …)` rung listing with `1px`/`2px` blur | Update the doc's rung listing to the zero-blur `--cartoon-ink` form (mirror §2b) so the doc matches `src/`. |
| D8 | §L2 / §Easing + §L4 | `--ease-cartoon-punch` + `--motion-weight` are documented but **absent from `src/`** | Note in the DELTA that the tokens must be ADDED to `src/` (scheme-motion.css / a motion token file) — they currently resolve EMPTY at runtime. (Implementation item, surfaced by the live getComputedStyle.) |

---

## 6. The WAVE-AMENDMENT (the delta-assay → reconcile vs the 116 union waves)

The cartoon/shadow work is ONE wave with three legs, augmenting the existing shadow/cartoon waves (no new
parallel fork):

- **`BD.W-CARTOON-INK` (color leg):** add `--cartoon-ink` + `--cartoon-ink-strength`; re-point the three
  `--shadow-cartoon-{sm,md,lg}` rungs to the warm-ink zero-blur form (§2b). Re-point `--shadow-modal`'s
  cartoon plane onto `--cartoon-ink` for family coherence. `prefers-contrast: more` → strength→0.38. Gate:
  π over `/foundations/shadows` proving the CARTOON swatch is **measurably chromatic (oklab chroma > floor)
  and separable from SOFT/ELEVATED**, BOTH modes; born-RED on the current gray.
- **`BD.W-CARTOON-CAST` (motion leg):** SHIP `--ease-cartoon-punch` + `--motion-weight` to `src/` (they are
  doc-only today — the headline build gap); add the `::after` caster + `@property --cast-dx/dy` to
  `.cartoon-surface` + an opt-in `.shadow-cartoon-cast` utility; the `useCartoonCast` drag composable
  (reuse `usePointerVelocityField` + `useIntersectionPause`). PRM → `--motion-weight: 0` + static stamp;
  no caster transition. Gate: a π frame-series proving the press OPENS the object↔cast gap then SNAPS back
  (overshoot present), compositor-only (no paint-flash on box-shadow), BOTH engines.
- **`BD.W-CARTOON-DOCHYGIENE` (doc leg):** apply the §5 D1–D8 edit list to `design.md`.

Reconcile vs the union set: this AUGMENTS the existing shadow tokens + the `.cartoon-surface` utility +
the §Shadows/§L2/§L4 doc — it does NOT touch the dock-fission / glass-material / aurora waves. The only
cross-wave seam is `--motion-weight`, which is a §L4 universal scalar several waves read; shipping it here
(the first consumer) seeds it for the rest. No re-fork: same token names, same carriers, same consumers.

---

## 7. Gestalt check + a11y carve

- **Gestalt (the bar):** a cartoon card now reads as a **bold cel-stamped surface** — a hard warm-ink
  outline ringing the silhouette (heaviest down-left contact, trailing down-right), the object floating a
  hair above its own painted cast. On press it **squashes + LIFTS off the cast** (the gap punches open),
  then SLAMS back with the anticipation-overshoot. That is the 1940s technicolor flow & punch, on the
  compositor, in both modes. Not a flat plate with a faint gray offset.
- **PRM** → `--motion-weight: 0`, no caster transition, the static stamp (the box-shadow rung) only.
- **`prefers-contrast: more`** → `--cartoon-ink-strength: 0.38` (the inked edge is a legibility asset).
- **`prefers-reduced-transparency`** → does NOT touch the cast (opaque ink, not a transmissive layer — it
  survives as a bonus legibility anchor, per the §Shadows contract).
- **Proportion (§L6):** the rest `--motion-weight` is `1/φ`; the press gap (`2px`) and lift (`--lift-sm`)
  are the φ-family offset rungs; the three cast planes step by the same offset family.
