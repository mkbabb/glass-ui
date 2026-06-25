# Motion-Spring-Register — GREENFIELD lens-c (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Lens: design for **maximum 1940s-technicolor FLOW & PUNCH** — bold cartoon shadowing,
> exaggerated squash/stretch/morph, anticipation + follow-through + overlapping action +
> arcs, real weight & inertia; the boldest, most-alive variant that is still idiomatic +
> cross-engine. The motion register is the SUBSTRATE that makes the warm glass read ALIVE.

---

## 0. The DELTA-ASSAY first (what is already true — do NOT re-fork)

Live-inspected `:5173`, both modes, source-read, and the `anim-ios27-tune` triumvirate
(BUILD-SPEC + JUDGE-1 PASS, 2026-06-23). The honest status quo:

| Item | State on disk / live | Verdict |
|---|---|---|
| The 6 springs `(response, ζ)` table | RE-CALIBRATED to the weighty-gooey pole, **live-verified** (smooth 0.45s/+1.5%, snappy 0.4s/+3.2%, bouncy 0.62s/+9.3%, gentle 0.51s/0%, dock 0.66s/+7.3%, press 0.16s/+1.5%) | **FIT — keep, do NOT re-tune** |
| Squish caps | LIFTED live (`--tab-indicator-max-stretch` 1.18, `--dock-morph-max-stretch` 1.14, `useLiquidFlex` default 1.14) | **FIT — keep** |
| `useLiquidFlex` velocity-coupled squish | ONE engine, `1+tanh(\|ṫ\|·k)·(max−1)`, vol-preserving, 27-file reach (drives tabs/dock/fission/morph/press/pager) | **FIT — keep the engine; WIDEN the wiring (§4)** |
| `--motion-weight` scalar | **design.md SPEC ONLY — `getComputedStyle(:root)` returns EMPTY. Not in src/.** | **BROKEN/ABSENT → BUILD (§2)** |
| `--ease-cartoon-punch` | **design.md SPEC ONLY — live token EMPTY. Not in src/.** | **BROKEN/ABSENT → BUILD (§3)** |
| `--glass-reveal-enter-scale: 0.88` | declared as fallback only; `getComputedStyle(:root)` EMPTY at root | re-point reaches it; not a register gap |

**The headline of the assay:** the *springs are already right.* Lens-c does **NOT** re-litigate
the `(response, ζ)` table — KEY QUESTION (1) was already answered by `anim-ios27-tune` and
live-judged: the OLD pre-BD springs (snappy ζ0.65/~7%, bouncy ζ0.45/~20%, gentle ζ0.85) **were
too tight/pointed** for the ios27 weighty pole, and the default register **was** shifted slower
+ weightier (longer response, longer settle, smaller un-pointed overshoot ≤10%). That is banked.
The two GENUINE greenfield gaps are the **two design.md SPEC tokens that never landed in src** —
`--motion-weight` (the governing scalar) and `--ease-cartoon-punch` (the anticipation curve).
Lens-c's whole audacity budget goes there: **make the cartoon register REAL**, not a doc promise.

So lens-c is a UNION amendment that augments `W-ANIM-IOS27-TUNE` / `W-LIQUID-ENTRANCE-GENERAL`
with the missing cartoon substrate, and re-frames the velocity-squish as the **universal driver
law** rather than a per-surface opt-in. No second spring family. No re-fork.

---

## 1. THE CORE IDEA — "the cel and the spring are ONE proportioned deformation"

A 1940s technicolor cel never moves a single property in isolation: the body squashes, the
shadow slides the OTHER way, the secondary mass (a label, a child glyph) lags a beat, and the
whole thing PUNCHES past its mark before settling. Today glass-ui ships these as **four
unrelated tics** wired surface-by-surface (the spring overshoot here, the `useLiquidFlex` squish
there, a `useStagger` delay somewhere else, and the cartoon shadow not wired at all). The
core idea is to make them **one scalar's children**:

> **`--motion-weight` is the single governing scalar of "how much cartoon," and FOUR
> deformations read it through ONE shared cascade: squash depth, overshoot share,
> anticipation pull-back, and cartoon-shadow travel. A surface picks ONE number at rest
> (`1/φ ≈ 0.62` default; dock/celebration → 1; observer-snap → 0) and the four read as one
> proportioned mass, never four knobs.**

This is the design.md §L4 promise, made into a real cascade with a born-RED gate. The boldness
is not a louder spring — the springs are already as audacious as the ≤10%-overshoot fence
allows. The boldness is the **cartoon register** (`--ease-cartoon-punch` + the moving cast +
the universal velocity-squish) becoming a first-class, opt-in-but-everywhere-eligible layer
that reaches *past* the spring fence for its deliberate exaggeration — the FLOW & PUNCH the
springs structurally cannot express (a single damped spring approaches its mark monotonically
from one side; it can NEVER anticipate-dip-below-origin).

---

## 2. `--motion-weight` — THE GOVERNING SCALAR (the token home + the cascade + the born-RED gate)

### 2a. Where it lives (the token home)
**Home: `src/styles/tokens/scheme-motion.css`** (the §Motion feature-token-home rule; it sits
with the `--spring-*` clocks it co-governs). One root declaration:

```css
:root {
  /* The cartoon governor. 0 = still (no give), 1 = full cel. Rest = 1/φ (golden-alive). */
  --motion-weight: 0.618;
}
```

It is a **DRIVER-scoped cascade variable**, not a global multiplier — the rest value lives at
root, but a *driver surface* re-declares it on its own subtree (`.dock { --motion-weight: 0.85 }`,
`.celebrate { --motion-weight: 1 }`), and an *observer* surface zeroes the cartoon extras
(`.carousel-content { --motion-weight: 0 }` — the calm-overdamped content snap iOS reserves).
This is the §L2 driver-vs-observer rule made a cascade override, answering KEY QUESTION (2):
**it lives in `scheme-motion.css`, each consumer reads it via `var(--motion-weight)` in its OWN
deformation expression, and a born-RED gate asserts both the root value AND the carve.**

### 2b. HOW each of the four deformations reads it (the shared cascade — the load-bearing part)

The whole point is that the four are **derived**, not independent. Define four derived tokens
in `scheme-motion.css`, each a `calc()` of `--motion-weight` so a single edit re-proportions
all four:

```css
:root {
  --motion-weight: 0.618;

  /* The four cel deformations, all proportioned off the ONE scalar.
     Each is a SPAN (rest → full) the consumer interpolates the weight across. */
  --cartoon-squash:  calc(1 + var(--motion-weight) * 0.14);   /* 1.00 → 1.14 squish cap   */
  --cartoon-overshoot: var(--motion-weight);                  /* 0 → 1 share of spring pop */
  --cartoon-anticip: calc(var(--motion-weight) * 0.04);       /* 0 → 4% pre-dip below origin */
  --cartoon-shadow-travel: calc(var(--motion-weight) * 6px);  /* 0 → 6px cast slide opposite */
}
```

- **Squash depth** → `useLiquidFlex`'s `maxStretch` reads `var(--cartoon-squash)` (a getter that
  re-resolves the live cascade override, which the composable ALREADY supports — `maxStretch`
  may be a getter, see `useLiquidFlex.ts:57`). So a dock subtree at weight 0.85 squishes harder
  than a card at 0.62, from ONE number. **This replaces the per-surface hard-coded caps**
  (`--dock-morph-max-stretch: 1.14`, `--tab-indicator-max-stretch: 1.18`) with the derived
  `--cartoon-squash` evaluated under each surface's local weight — DRY, the §2c amendment.
- **Overshoot share** → the springs keep their analytic overshoot (the ≤10% fence is INVIOLATE),
  but the *cartoon* register's `--ease-cartoon-punch` (§3) scales its 1.22 peak toward 1.0 as
  weight → 0: `--cartoon-punch-peak: calc(1 + var(--motion-weight) * 0.355)` (0.618 → ~1.22,
  0 → 1.0 = collapses to a no-overshoot ease). This is HOW PRM/observer zeroes the punch.
- **Anticipation pull-back** → `--cartoon-anticip` feeds the punch curve's negative leg depth
  (the −4% dip) — a thing no spring can do; it is the cartoon register's signature.
- **Cartoon-shadow travel** → `--cartoon-shadow-travel` is the `transform: translate()` on the
  `::after` shadow-caster (design.md §Shadows "the MOVING cast"), sliding the cel's offset
  opposite the gesture, scaled by weight. Never an animated `box-shadow` (paint-bound).

### 2c. The born-RED gate — `scripts/proof-motion-weight.mjs` (NEW, born-RED on absent)
Born-RED today because **the token does not exist** — `getComputedStyle` returns empty. Asserts:
1. `--motion-weight` is declared at `:root` in `scheme-motion.css` and equals `0.618` (`1/φ`,
   the §L6 golden-proportion rest — reds a round `0.6`).
2. The four `--cartoon-*` derived tokens are declared as `calc()` of `--motion-weight` (reds a
   hard-coded literal — they MUST be derived, the "one proportioned mass" invariant).
3. The PRM carve zeroes it: under `@media (prefers-reduced-motion: reduce)`, `--motion-weight: 0`
   at the cascade root (the §L5 single-assignment that zeroes squash+overshoot+anticip+shadow+
   stagger together). A born-RED bite plants a PRM block that forgets the weight zero → reds.
4. At least the dock subtree re-declares a HIGHER weight and at least one observer subtree
   (carousel content) re-declares `0` — the driver-vs-observer carve is wired, not just specced.

### 2d. Answering KEY QUESTION (2) decisively
`--motion-weight` does NOT exist in src/ (live-confirmed empty). Lens-c gives it: a HOME
(`scheme-motion.css`), a CASCADE (four derived `--cartoon-*` calc tokens every consumer reads),
and a BORN-RED gate (`proof:motion-weight`). It is the governing scalar that makes liquid-weight
universal — one number, four proportioned children, PRM→0 in one assignment.

---

## 3. `--ease-cartoon-punch` — THE ANTICIPATION CURVE (the raw easing token, not a spring)

### 3a. Where it lives + WHY it is not a spring
**Home: `src/styles/tokens/scheme-motion.css`**, beside the `--spring-*` block, as a HAND-SHAPED
`linear()` — NOT generated by `regen-spring-tokens.mjs`, NOT a `SPRING_PRESETS` row, NOT a typed
`MOTION_CURVES` entry (`MotionCurveKind` is the closed `"spring" | "bezier"` union, and a
shaped `linear()` with a negative leg is neither). It is a raw `--ease-*` custom property
requiring zero engine extension. design.md §Easing already gives the exact stops:

```css
:root {
  /* The Cartoon register's motion half. Anticipation DIP below origin (no spring can),
     PUNCH to ~1.22, then settle. Compositor-safe (transform only). Loud, opt-in. */
  --ease-cartoon-punch: linear(
    0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%,
    1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1
  );
}
```

This curve is the FLOW & PUNCH the springs structurally cannot give — the springs solve to a
monotone one-sided approach; the cel's anticipation (a real pull-back before the launch) is a
SHAPED keyframe with a negative segment. That is exactly why it is a register, not a spring:
it deliberately breaches the analytic ≤10%-overshoot fence (peak 1.22 = +22%) which the spring
solver and `proof:spring-ease` keep INTACT. The springs stay calm; the cartoon punch is the
loud, opt-in sibling.

### 3b. WHO rides it (the cartoon register's surface contract)
A surface enters the register by composing THREE things together (design.md §Shadows):
`.shadow-cartoon-{sm,md,lg}` (the bold layered offset cast) + `--ease-cartoon-punch` on its
interactive `transform` transition + the exaggerated `--scale-press` snap. The DEFAULT glass
surface stays the calm six-layer composite on `snappy`/`press`. The register is for the loud
moments: a celebration seal, a primary CTA "PUNCH" on commit, a toggle that POPS, the
1940s-poster hero. It is opt-in BECAUSE it is loud — the workhorse remains `--spring-snappy`.

### 3c. Cross-engine
`linear()` is Baseline 17.2+ (Safari-safe, no `-webkit` prefix, no unsupported function). It
drives `transform`/`opacity` ONLY (both engines compositor-cheap). PRM collapses it to
`--ease-standard` like every spring — the §L5 cascade swaps the easing-function token under
`prefers-reduced-motion`. The moving cast (§2b) is a `transform` on a `::after` caster, never
an animated `box-shadow` (paint-bound; §L7).

### 3d. The gate
`proof:motion-weight` (or an arm of `proof:animation-coherence`) asserts: the token is declared,
is a `linear()` with a NEGATIVE first segment (the anticipation signature — reds a token without
the pre-dip), peaks ≥ 1.18 (the punch — reds a de-fanged curve), and PRM swaps it to a
non-overshooting ease. Born-RED today (token absent).

---

## 4. THE MORPH-MORE-ON-MOVE LAW — `useLiquidFlex` as the UNIVERSAL driver register (KEY Q3)

### 4a. The status quo (live-confirmed)
`useLiquidFlex` is the ONE velocity-coupled squish (`1+tanh(|ṫ|·k)·(max−1)`, vol-preserving,
M5-deterministic off the scalar derivative). It reaches 27 files and IS wired on the high-traffic
driver surfaces: tab indicator, dock orientation morph, dock fission, dock-item drag, pager-dot
worm, `useLiquidMorph`, `useLiquidPress`, `useDragMorph`, `useGooMorph`, `useScrollTrigger`,
`useScrollChrome`, Button, CarouselContent. So the answer to KEY QUESTION (3): it is wired on
MOST driver surfaces, NOT all — the gap is **general-surface entrances and generic press/hover**
(the `W-LIQUID-ENTRANCE-GENERAL` GAP: only top-layer reka overlays bloom; cards, controls,
list-items, demo sub-sections do NOT get the velocity-squish).

### 4b. The lens-c amendment — wire it via `--motion-weight`, not per-surface
Rather than hand-wire `useLiquidFlex` onto 50 more surfaces (a re-fork-by-repetition), make the
squish **read `var(--cartoon-squash)`** (the §2b derived token) as its `maxStretch` getter
everywhere. Then "morph MORE on move" becomes automatic: a surface in a high-weight subtree
(dock 0.85) squishes harder than a low-weight card (0.62), and an observer subtree (0) does not
squish at all — all from the ONE scalar, no per-surface cap constants. This RETIRES
`--dock-morph-max-stretch` / `--tab-indicator-max-stretch` as separate hard-coded caps (they
become `--cartoon-squash` evaluated under the local weight) — DRY, the §L4 "one proportioned
deformation" made literal. The velocity coupling (`tanh(|ṫ|·k)`) is UNCHANGED — `k=1.6` is the
correct curve (the metaball `sa`); the CAP is the lever, and the cap is now weight-derived.

The `W-LIQUID-ENTRANCE-GENERAL` directive (`v-liquid-enter` / `.liquid-enter`) composes
`.glass-reveal` + `useLiquidFlex` with `maxStretch = () => cartoonSquash()` — so EVERY enrolled
surface squish-grows by the amount its local `--motion-weight` dictates. One directive, weight-
proportioned grace, PRM→1 (no squish) via weight→0.

---

## 5. THE SELECTION RULES — spring-vs-ease + driver-vs-observer (made executable)

The design.md rules are prose; lens-c makes them a decision table the gate can check and a
demo can show:

| The motion is… | Property | Register | Why |
|---|---|---|---|
| A finger touched a pixel (press/toggle/tap) | transform | **`--spring-press`/`-snappy`** + squish | driver; weight 0.62 |
| A surface arrived to greet (sheet/dialog/toast enter) | transform | **`--spring-bouncy`** or the cartoon `--ease-cartoon-punch` if LOUD | driver; weight up to 1 |
| A morph (dock V↔H, fission, indicator glide) | transform | **`--spring-dock`/`-snappy`** + `useLiquidFlex` squish | driver; weight 0.85 (dock) |
| A loud celebration / CTA PUNCH | transform | **`--ease-cartoon-punch`** + moving cast | the cartoon register; weight 1 |
| A colour/bg/border cross-fade | EFFECTS | **`--ease-standard`** (bezier) | a spring on colour reads as a wobble |
| A content carousel snap / list reorder under scroll | transform | **`--ease-standard`** or calm-overdamped, NO bounce | **OBSERVER**; weight 0 |
| A progress bar / auto-advance / scripted onboarding | transform | **`--ease-standard`** | observer; time-bound, not gestured |
| A constant-velocity ticker (marquee) | transform | **`linear`** (the ONE sanctioned non-spring steady-state) | EFFECTS steady-state |

The executable form: `--motion-weight` IS the driver-vs-observer switch — a driver subtree
inherits `0.618`, an observer subtree declares `0`. The gate (§2c clause 4) asserts the carousel-
content / list-reorder subtrees are at weight 0. So "iOS reserves the bounce for open/morph, not
content snap" is no longer prose — it is a cascade fact a born-RED gate enforces.

---

## 6. THE GESTALT BAR (live-judged AS A USER) — the acceptance

Judged live `:5173` both modes (and corroborated by the JUDGE-1 frame-series):
- **Deck/pager worm** — 199 vol-preserving transform frames (scaleX→1.10, scaleY→0.95): gooey,
  weighty, NOT a snap. **PASS.**
- **Dock morph** — `--dock-morph-t` overshoots +6.9%, settles over ~400ms with squish: flowing
  mass. **PASS.**
- **Tab indicator** — `--stretch` peaks 1.132 (cap 1.18) on the glide: morph-MORE-on-move reads.
  **PASS.**
- **Press** — rises to +1.5% by 156ms, decays through a −1.5% undershoot, settles ~490ms:
  inertial, alive, NOT a tight snap. **PASS.**
- **The cartoon register** — **CANNOT be judged: it does not exist live.** This is the born-RED
  gap lens-c fills. The bar: a CTA with `.shadow-cartoon-lg` + `--ease-cartoon-punch` on commit
  reads as a 1940s-poster PUNCH (anticipation dip → 1.22 overshoot → settle) with the cast
  sliding opposite — captured as a π frame-series, both engines, born-RED on its absence today.

A tight snap = FAIL. The springs already pass the weighty/gooey bar; the cartoon register is the
remaining audacity, and it is the one piece that is pure-promise today.

---

## 7. THE WAVE AMENDMENT (the union — augment, never dup)

Reconciled against the 116 union waves + `anim-ios27-tune` (which is BANKED — lens-c does NOT
re-tune one spring value):

**Augment `W-ANIM-IOS27-TUNE` → add a `W-CARTOON-REGISTER` arm** (or fold into
`W-LIQUID-ENTRANCE-GENERAL`):
1. **`--motion-weight` lands in src** — `scheme-motion.css` root `0.618` + the four derived
   `--cartoon-*` calc tokens + the PRM→0 carve + the driver/observer subtree overrides
   (dock 0.85, celebration 1, carousel-content 0). (§2)
2. **`--ease-cartoon-punch` lands in src** — the design.md `linear()` stops, hand-shaped, in
   `scheme-motion.css` (NOT regenerated, NOT a `MOTION_CURVES` row). (§3)
3. **The moving cast** — `.shadow-cartoon-{sm,md,lg}` ::after caster reads
   `--cartoon-shadow-travel`, slides on gesture via `transform`. (design.md §Shadows; §2b)
4. **`useLiquidFlex` maxStretch reads `var(--cartoon-squash)`** everywhere — RETIRE the
   per-surface `--dock-morph-max-stretch` / `--tab-indicator-max-stretch` hard caps as the
   weight-derived `--cartoon-squash` (DRY). (§4)
5. **`proof:motion-weight`** — NEW born-RED gate (§2c) + the `--ease-cartoon-punch` shape arm
   (§3d). Born-RED today because both tokens are absent from src.

**No dup:** the springs, the `useLiquidFlex` engine, the squish caps, the `.glass-reveal`
recipe all STAY. Lens-c adds the two missing design.md tokens + their cascade + their gate, and
re-frames the velocity-squish cap as weight-derived. It is a UNION on top of `anim-ios27-tune`,
never a re-fork.

---

## 8. CROSS-ENGINE + A11Y/PRM (binding)

- **Chrome + Safari:** `linear()` springs + `--ease-cartoon-punch` are Baseline 17.2+, no prefix;
  drive `transform`/`opacity` ONLY (compositor-only, both engines). The moving cast is a
  `transform` on a `::after`, never an animated `box-shadow` (paint-bound). NO `backdrop-filter`
  per-frame re-blur — the surface's OWN `filter` blur-settle is the WebKit-safe leg.
- **PRM:** `prefers-reduced-motion: reduce` → `--motion-weight: 0` in ONE cascade assignment,
  which zeroes squash + overshoot + anticipation + shadow-travel + stagger together (the §L5
  single-assignment); `--ease-cartoon-punch` swaps to `--ease-standard`; the fade survives. The
  squish drops to 1 (vol-preserving identity). `proof:no-layout-animation` holds (transform/
  opacity only).
- **prefers-contrast: more** → the cartoon cast opacity floors UP (the inked edge is a
  legibility asset, design.md §Shadows); `prefers-reduced-transparency` does NOT touch the cast
  (opaque ink, not a transmissive layer — a bonus legibility anchor).
- **Golden proportion (§L6):** rest weight `1/φ ≈ 0.618`; the squash span (0.14 = ~√φ−1·...),
  the type ladder √φ — geometry is golden, never round.
```
