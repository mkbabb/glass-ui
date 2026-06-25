# GOLDEN — the canonical MOTION VOCABULARY

> The single reconciled reference for the motion register: the spring presets, `--ease-cartoon-punch`,
> the `--motion-weight` scalar, the `linear()` curves, the spring-vs-ease + driver-vs-observer
> selection rules, and the velocity-coupled squish (`useLiquidFlex`). Synthesized from lens-a
> (iOS-27 fidelity), lens-b (cross-engine/perf), lens-c (cartoon-technicolor) + a live spike that
> de-risked the boldest mechanism and corrected one load-bearing error in lens-b/c's proposal.

---

## 0. The delta-assay (the truth on the ground — all three lenses agree, live-confirmed)

The `anim-ios27-tune` triumvirate **has landed and is correct.** Live + source confirmed:

| Item | State | Verdict |
|---|---|---|
| The 6 springs `(response, ζ)` — smooth 0.45s/+0.5%, snappy 0.40s/+2.0%, bouncy 0.62s/+12.6%, gentle 0.51s/0%, dock 0.66s/+11%, press 0.16s/+0.5% | RE-CALIBRATED to the weighty-gooey pole; generator-emitted from `springPresets.ts` | **FIT — FREEZE, never re-fork** |
| Squish caps — `--tab-indicator-max-stretch` 1.18, `--dock-morph-max-stretch` 1.14, `useLiquidFlex` default 1.14 | lifted, live | **FIT — re-express off the scalar (§2), feel byte-identical** |
| `useLiquidFlex` velocity-coupled squish — ONE engine `1+tanh(\|ṫ\|·k)·(max−1)`, 29-file reach | vol-preserving, M5-deterministic | **FIT — keep the engine; widen the wiring (§5); couple the cap to the scalar (§2)** |
| **`--motion-weight`** | design.md §L4 SPEC ONLY — `getComputedStyle(:root)` EMPTY | **ABSENT → BUILD (§2)** |
| **`--ease-cartoon-punch`** | design.md §L2/§Easing SPEC ONLY — EMPTY live | **ABSENT → BUILD (§3)** |
| **`--glass-reveal-enter-scale: 0.88`** | declared as a recipe FALLBACK only (`reveal.css:52,85`), never on `:root` | **re-home to `:root` (§6c) — not a register gap, a token-authority gap** |
| DESIGN.md §L2 "Three canonical springs" prose table | STALE — prints the OLD pre-tune pole (snappy ζ0.65/~7%, bouncy ζ0.45/~20%) | **RECONCILE (§6)** |

**Verdict on KEY QUESTION 1 (springs too tight?):** the OLD springs the §L2 prose still shows were
too pointed for the ios27 weighty pole — but they are already retired in code + live tokens. **Do
NOT re-tune one spring value.** The remaining gap is not the spring NUMBERS; it is that the gooey
deformation is not yet UNIVERSAL and not yet PROPORTIONED by a single scalar. That is `--motion-weight`'s job.

This GOLDEN is a **UNION amendment on top of `anim-ios27-tune`**: it lands the three spec-only tokens
as the GOVERNING LAYER over the already-tuned springs. Zero second spring family, zero second squish
engine, zero `MOTION_CURVES` extension.

---

## 1. THE CORE IDEA — the register is a TRIANGLE; `--motion-weight` is its centroid

iOS-27 liquid motion is a **three-pole register**, not a flat preset list. The failure mode is treating
the poles as independent dials a designer balances per-surface. The golden reframes it as a TRIANGLE
with ONE governing scalar at the centroid:

```
                    SPRING — the TIME domain (WHEN a surface arrives)
                    ζ-damped linear() clocks, overshoot ≤ ~12% by the
                    analytic solver — the calm/physical pole (FROZEN)
                              /            \
                             /              \
                   --motion-weight (the centroid scalar 1/φ≈0.618 —
                    co-scales how far a surface pulls toward each loud pole)
                          /                      \
                         /                        \
   SQUISH — the SPACE domain  ───────────────  CARTOON — the past-the-fence pole
   useLiquidFlex velocity-coupled            --ease-cartoon-punch — a SHAPED linear()
   reciprocal deform (morph MORE             with a NEGATIVE anticipation dip + a
   the faster you move)                      ~+22% punch NO spring can express
```

- **SPRING** is WHEN — the `linear()` clocks. Already tuned. **Frozen by this golden.**
- **SQUISH** is HOW MUCH a surface DEFORMS as it travels — `useLiquidFlex`, velocity-coupled.
- **CARTOON** is the deliberate, opt-in EXAGGERATION past the spring's overshoot ceiling
  (anticipation dip → big punch → settle), reserved for celebration/emphasis.

The genius of iOS-27: these three are **co-scaled by ONE number.** A surface picks `--motion-weight`
once at rest, and that single scalar simultaneously sets the squash depth, the overshoot share, the
anticipation pull-back, and the cartoon-shadow travel — they read as ONE proportioned deformation,
never four unrelated tics. **The rest value is `1/φ ≈ 0.618`** (DESIGN.md §L6 golden-proportion law):
not 0 (dead), not 1 (manic) — present, alive, never cartoonish-by-default. Dock and celebration push
toward 1; observer carousels sit near 0. This is the spine of the whole golden.

**This is what each lens contributed:** lens-a's TRIANGLE framing + the centroid scalar; lens-b's
velocity→weight LIVE coupling (the boldest move, §2c) + the typed-`@property` cross-engine rigor;
lens-c's "the cel and the spring are ONE proportioned deformation" + the moving-cast travel. The
spike (§7) corrected the cap-derivation mechanism all three got subtly wrong.

---

## 2. `--motion-weight` — the governing scalar (token home, cascade, the spike-corrected mechanism)

### 2a. The token + its registration (the `--ui-scale` idiom, verbatim)

`--motion-weight` is a typed Houdini `@property` `<number>`, `inherits: true`, `initial-value: 0.618`
— the EXACT cascading-scalar idiom `--ui-scale` and `--glass-level` already use
(`property-regs.css §18`, lines 220-280). The registration lands there beside its siblings; the
`:root` rest declaration lands in `scheme-motion.css §1` (the Feature-token-home rule — it sits with
the `--spring-*` clocks it co-governs).

```css
/* property-regs.css §18 — beside --ui-scale / --glass-level (the cascading-scalar cohort) */
@property --motion-weight {
  syntax: "<number>"; inherits: true; initial-value: 0.618;
}
```
```css
/* scheme-motion.css §1 — the universal driver-motion governor.
   0 = still, 1 = full cel. Rest 1/φ ≈ 0.618: present, alive, never manic (§L4/§L6).
   DRIVER-scoped: a surface the finger/route moved INHERITS this; an OBSERVER surface
   (auto-carousel content, list reorder under scroll) pins it to 0 LOCALLY. It co-scales
   squash depth, overshoot share, anticipation pull-back, and cartoon-shadow travel
   together so they read as ONE proportioned deformation. */
:root { --motion-weight: 0.618; }
```

`inherits: true` is the whole mechanism: a DRIVER ancestor (`.dock`, a celebrating card, a sheet)
locally pushes `--motion-weight: 1`; an OBSERVER subtree (`<CarouselContent>` auto-advance,
`[data-reorder]` lists) pins `--motion-weight: 0` — everything below reads the local value with zero
prop-drilling. The driver-vs-observer rule stops being prose a coder forgets and becomes a scoped CSS var.

### 2b. THE SPIKE-CORRECTED MECHANISM — derive the cap SITE-LOCALLY, never as a `:root` token

> **This is the single load-bearing correction this golden makes to lens-b and lens-c.** Both proposed
> re-expressing the cap *tokens* as `--dock-morph-max-stretch: calc(1 + 0.226 * var(--motion-weight))`.
> The spike (§7) PROVES that is WRONG: an unregistered custom property whose value is a `calc()` over
> `var(--motion-weight)` is **substituted at the element where it is DECLARED** (`:root`, weight 0.618)
> and then merely inherits the **frozen text** `calc(1 + 0.226 * 0.618)` downward. A child's local
> `--motion-weight: 0` override arrives too late — the cap never re-evaluates, so the observer carousel
> measured 1.14 instead of the required 1.0. **The cap MUST be derived AT THE CONSUMING ELEMENT.**

The corrected mechanism: the token holds only the **coefficient `k`**; each squish site computes the
cap locally so the `var(--motion-weight)` is read at the consumer, under any scoped override:

```css
/* scheme-motion.css §1 — the per-surface stretch COEFFICIENTS (k = (rest_cap − 1) / 0.618,
   so 1 + k·0.618 == the shipped cap byte-identically; 1 + k·0 == 1.0 exactly). */
:root {
  --dock-morph-stretch-k:   0.2265372;  /* (1.14 − 1)/0.618 */
  --tab-indicator-stretch-k: 0.2912621; /* (1.18 − 1)/0.618 */
}
```

Two consumption paths, both reading weight at the element:

1. **Pure-CSS squish sites** inline the calc on their own element (where the local weight is live):
   `scale: calc(1 + var(--dock-morph-stretch-k) * var(--motion-weight)) ...` — the spike's `#dock`
   probe (PASS: 1.14 at rest, 1.0 at weight 0).
2. **`useLiquidFlex` (the JS getter path)** — the engine already accepts `maxStretch` as a getter
   (`useLiquidFlex.ts:57`). The getter reads BOTH the coefficient and the live weight **off the
   consumer's own element** and returns `1 + k * weight`:
   ```ts
   // the consumer threads this getter — reads at the morphing element, honors scoped weight
   maxStretch: () => {
     const cs = getComputedStyle(el.value!);
     const k = parseFloat(cs.getPropertyValue('--dock-morph-stretch-k')) || 0.2265372;
     const w = parseFloat(cs.getPropertyValue('--motion-weight')) || 0.618;
     return 1 + k * w;
   }
   ```
   No primitive change — `useLiquidFlex` already re-resolves the getter per-read. The engine's
   `1+tanh(...)·(cap−1)` law and the `squishK=1.6` curve are UNTOUCHED; only the cap source moves
   from a literal to a weight-coupled local read.

### 2c. THE BOLDEST MOVE (lens-b) — make weight a LIVE velocity term, universal via one scalar

Today `useLiquidFlex` squishes off the per-`drive` travel derivative `|ṫ|` (velocity coupling exists),
but the *amplitude* is a static cap. The audacious move: a **driver in active fast motion transiently
RAISES its own `--motion-weight` toward 1**, so the deformation grows the faster the surface travels
and self-extinguishes back to rest as it settles. "Elements morph MORE the faster they move" becomes a
measurable, universal, single-scalar law — not 29 per-primitive tanh constants.

Mechanism (KISS, compositor-only, no new engine): `useLiquidFlex` already computes the saturating
velocity term `tanh(|ṫ|·k)`. It writes ONE extra computed-style key on the driving element —
`--motion-weight: calc(0.618 + 0.382 * var(--flex-vel))` where `--flex-vel = tanh(|ṫ|·k) ∈ [0,1]` is
the SAME already-computed term. Because the cap is now derived site-locally off `--motion-weight`
(§2b), the transient weight boost deepens the squish AND (when the surface composes the cartoon
register) the punch share AND the shadow travel — all from the one write. Every one of the 29
consumers inherits this the instant the primitive writes it. The spike (§7) confirms: a fast jump
pushes weight to ~0.96, a slow nudge stays ~0.65, a settled travel returns to exactly 0.618 —
self-extinguishing, volume-preserving, Safari-perfect (`--motion-weight` is a typed `<number>`,
WebKit Baseline; the cap calc is sRGB-trivial; the painted channels are `transform`/`--stretch` only).

### 2d. The PRM carve — ONE assignment zeroes ALL deformation

```css
/* scheme-motion.css — the FIRST prefers-reduced-motion block in this partial (net-new) */
@media (prefers-reduced-motion: reduce) {
  :root { --motion-weight: 0; }
}
```

Because every squish/punch/shadow-travel reads through the scalar (§2b), and every cap calc collapses
to `1 + k·0 == 1.0` (the spike's observer probe, PASS), this single line zeroes the squash, the
overshoot share, the anticipation pull, the cartoon-shadow travel, AND the §2c velocity boost together
— the §L4/§L5 "one assignment zeroes the extra squash, overshoot, anticipation, arc, and stagger"
promise made executable. The springs keep their own `respectReducedMotion` endpoint-snap in
`SpringProgress`; the weight zeroes the GOO that rides on top. The fade survives (P6).

---

## 3. `--ease-cartoon-punch` — the third pole, a RAW shaped `linear()` (not a spring, not a curve-table row)

A single damped spring is monotone-from-one-side — it CANNOT dip below origin then overshoot past it.
iOS-27's loudest moments want **anticipation** (pull back before launch) AND **exaggeration** (punch
past the spring fence). No spring expresses that shape. So it ships as a hand-shaped `linear()` raw token:

```css
/* scheme-motion.css §2 — the Cartoon register's MOTION half (visual half = §Shadows moving cast).
   A shaped keyframe: dip ~4% BELOW origin (anticipation — a thing no damped spring can do), cross
   1.0, punch to ~1.22 (deliberately past the spring fence — which is WHY it is a register, not a
   spring), settle. NOT a SPRING_PRESETS row (the analytic solver + the overshoot invariant stay
   intact). NOT a MOTION_CURVES entry (MotionCurveKind is the closed spring|bezier union; a shaped
   linear() with a negative leg is neither). A raw --ease-* property — zero engine extension.
   Drives TRANSFORM/opacity ONLY (compositor-safe, both engines). PRM → --ease-standard. */
--ease-cartoon-punch: linear(
  0, -0.012, -0.038 12%, -0.018 18%,    /* anticipation dip below origin */
  0.18 34%, 0.62 46%, 0.98 56%,          /* the launch */
  1.14 64%, 1.22 70%,                    /* the PUNCH — past the spring fence */
  1.16 78%, 1.06 86%, 1.012 92%, 1       /* the settle */
);
```

The spike (§7) verified this curve live: a genuine negative stop (`−0.038`, the anticipation
EXISTENCE proof) + a `1.22` peak (the punch — `>1.10`, past the spring fence) + a parsed `linear()`.

**The reconciles (no contrivance, no fork):**
- It is **hand-authored in `scheme-motion.css §2`, NOT generated** by `regen-spring-tokens.mjs` (which
  emits only `(response, ζ)` springs from `springPresets.ts`) and **NOT a `MOTION_CURVES` row**
  (`MotionCurveKind` is the closed `spring|bezier` union; a shaped `linear()` is neither). It needs no
  JS twin (a CSS-driven loud one-shot; YAGNI on a JS sampler until a consumer needs one).
- **Loudness ∝ weight (the union with §2):** a cartoon-register surface composes `--ease-cartoon-punch`
  on its `transform` leg AND a weight-scaled press/shadow-travel, so under a calmer local weight the
  punch reads softer — the register stays proportioned to the one governor. (The curve itself is fixed;
  the surface's *scale amplitude* it drives is weight-scaled, so weight 0 ⇒ no visible punch.)
- **PRM** re-aliases `--ease-cartoon-punch: var(--ease-standard)` in the SAME reduce-block that zeroes
  the weight — belt-and-suspenders (the weight=0 already kills the punch amplitude; the alias also
  removes the curve shape).

---

## 4. THE SELECTION RULES — made STRUCTURAL (one decision table the gate + consumer both read)

The spring-vs-ease + driver-vs-observer rules currently live as scattered DESIGN.md prose. The golden
consolidates them into ONE table; `--motion-weight` IS the driver-vs-observer switch made mechanical:

| The motion | who caused it | channel | curve | weight |
|---|---|---|---|---|
| press / tap | finger (DRIVER) | transform scale | `--spring-press` | rest, + velocity boost |
| tab glide · dock V↔H morph · fission · sheet snap | finger/route (DRIVER) | compositor transform + `--stretch` | `--spring-snappy` / `--spring-dock` | rest (dock scope → ~1), + velocity boost |
| entrance / reveal / dialog in | route arrival (DRIVER) | transform + opacity | `--spring-bouncy` / `--spring-snappy` | rest |
| **loud one-shot** (celebration, CTA punch, seal) | deliberate (DRIVER) | transform | **`--ease-cartoon-punch`** + moving cast | pushed → 1 |
| surface re-tint (color/bg/border/box-shadow) | any | paint props | `--ease-standard` (bezier) | n/a — NEVER a spring on color (a cross-fade wobbles) |
| exit / close | any | opacity | `--ease-out` (no overshoot past gone) | n/a |
| auto-carousel content · list reorder under scroll · progress fill | system (OBSERVER) | transform/width | `--ease-standard` | **0** (calm-overdamped — iOS reserves the bounce for open/morph) |
| pager-dot worm / goo-morph | route (semi-observer) | `--goo-t` silhouette | OWN `--{prefix}-flow` linear() | independent (JUDGE-1 §6 — UNTOUCHED) |
| specular pointer-follow / constant-velocity ticker | tracked / steady | transform | `--ease-standard` / `linear` | n/a |

The single rule it encodes: **DRIVER → spring (or cartoon-punch for the loud register) +
`--motion-weight`; OBSERVER → bezier + weight 0.** Which spring per surface-class is already named in
the `SPRING_PRESETS` `comment` field (the single source) — FROZEN, not re-forked.

---

## 5. THE UNIVERSALITY AUDIT — is `useLiquidFlex` wired everywhere driver motion happens? (KEY Q3)

Live grep: **29 files** reach `useLiquidFlex`/`useLiquidPress`/`useLiquidMorph` — broad, not total:

| Surface | velocity-squish today? | golden verdict |
|---|---|---|
| dock V↔H morph, fission, drag-morph | YES | KEEP — weight-couple the cap (§2b) |
| tab indicator glide | YES (linear law, 1.18) | KEEP — weight-couple |
| metaball blob (`metaball.frag` `sa=1+tanh(speed·k)`) | YES (in-shader, SAME curve) | KEEP — the shader reads `--motion-weight` as a uniform |
| press (`useLiquidPress`) | YES (squish-only, 1.04) | KEEP — weight-couple gently |
| pager worm / goo-morph | OWN `--{prefix}-flow` | KEEP independent (semi-observer) |
| **sheet/drawer grow** (the Maps-card reference) | NO — drawer rides `DRAWER_SNAP` spring, no squish | **GAP → wire the EXISTING `useLiquidFlex` squish-only (like `useLiquidPress`) off `DRAWER_SNAP`'s per-frame value, reading the universal weight. A fast fling → deeper squish; a slow drag → calm. No new primitive.** |
| route/page transitions | spring clocks only | candidate, weight-gated low (semi-observer) — lower priority |

**Verdict:** wired on MOST driver-morph surfaces; the **DRAWER/SHEET grow (the Maps-card golden
reference) is the notable gap.** The golden books the drawer-squish as the one new wiring — composing
the EXISTING `useLiquidFlex` off the EXISTING `DRAWER_SNAP` spring. Everything else is already wired;
the golden's universal contribution is COUPLING all of them to `--motion-weight` (§2b) so "morph more
on move" is system-wide via one scalar, not 29 hand-edits.

---

## 6. THE WAVE AMENDMENT (the UNION — augment `anim-ios27-tune`, never duplicate)

The golden does NOT re-run anim-ios27-tune (DONE, JUDGE-1 PASS). It augments it with the governing
layer that was speced but never landed. Every NEW token is EMPTY on `:root` today → cannot duplicate.

| Wave | status | golden's amendment |
|---|---|---|
| `W-ANIM-IOS27-TUNE` | DONE | UNION — FREEZE its `(response,ζ)` table + lifted caps as the SUBSTRATE the weight-scalar multiplies. No re-edit of the 6 rows. |
| **NEW `W-MOTION-WEIGHT`** | born RED (token empty live) | land `--motion-weight` typed `@property` (1/φ rest) in `property-regs.css §18` + `:root` decl in `scheme-motion.css §1`; the per-surface `--*-stretch-k` coefficients; the SITE-LOCAL cap derivation (§2b — the spike correction); the `useLiquidFlex` getter rewire + the §2c velocity→weight write; PRM one-line zero; scope examples (dock→1, observer→0); `proof:motion-weight-universal`. |
| **NEW `W-CARTOON-PUNCH`** | born RED (token empty live) | land `--ease-cartoon-punch` raw shaped `linear()` (negative anticipation + ~+22% punch) hand-authored in `scheme-motion.css §2`; weight-couple its amplitude; PRM→`--ease-standard`; `proof:cartoon-punch`. |
| **NEW `W-MOTION-WEIGHT-DRAWER`** | born RED (drawer has no squish) | wire EXISTING `useLiquidFlex` on the drawer/sheet height span off `DRAWER_SNAP` (the Maps-card gap, §5). |
| **NEW `W-MOTION-DOC-SYNC`** | RED (DESIGN.md §L2 prose stale) | rewrite §L2's "Three canonical springs" table to the LANDED pole; re-home `--glass-reveal-enter-scale: 0.88` from the `reveal.css` recipe-fallback onto `:root` (§0); `proof:design-md-current` re-greens. |

**Files touched:** `property-regs.css` (the `@property`), `scheme-motion.css` (the scalar + coefficients
+ cartoon-punch + the reduce carve), `density.css`/`scale-paper.css`/`shape.css` (caps → site-local
calc reading the coefficient + weight), `useLiquidFlex.ts` (the getter rewire + the ONE velocity→weight
computed key — no law change), `useDrawerSnap.ts`/`DrawerContent.vue` (the squish union), the metaball
shader (weight uniform), `scripts/proof-motion-weight-universal.mjs` + `scripts/proof-cartoon-punch.mjs`
(new gates). NO second spring family, NO second squish engine, NO `MOTION_CURVES` extension.

---

## 7. THE PROTOTYPE — built + LIVE-VERIFIED in Chrome (the de-risk + the correction)

`golden/spike.html` (throwaway) de-risked the boldest mechanism and CORRECTED lens-b/c's cap proposal.
Live-run in Chrome via devtools MCP — `window.__SPIKE__.allPass === true`, screenshot `golden/spike-green.png`:

| check | result |
|---|---|
| dock cap `== 1.14` at rest 0.618 (UNION fence — feel byte-identical) | PASS (1.14000) |
| tab cap `== 1.18` at rest 0.618 | PASS (1.18000) |
| **observer cap `== 1.0` at weight 0 (PRM/zero-deformation identity)** | PASS (1.0) **— only after the §2b correction** |
| `--motion-weight` typed `@property` resolves to 0.618 + inherits | PASS |
| cartoon-punch has a NEGATIVE anticipation leg (`−0.038`) | PASS |
| cartoon-punch peaks `> 1.10` (`1.22`, past the spring fence) | PASS |
| velocity→weight: fast jump → `0.96`, slow nudge → `0.65`, settled → exactly `0.618` (self-extinguishing) | PASS |
| cap DEEPER under fast travel than at rest (morph-more-on-move) | PASS (1.217 > 1.14) |

**THE LOAD-BEARING FINDING (the spike's correction to the brainstorms):** a cap token whose value is
`calc(... var(--motion-weight) ...)` declared on `:root` is an UNREGISTERED custom property — it is
substituted at `:root` (weight 0.618) and inherits the **frozen text** down; a child's scoped
`--motion-weight: 0` NEVER re-evaluates it (the observer probe read 1.14, not 1.0). The fix —
**derive the cap SITE-LOCALLY** (token = coefficient `k`; each consumer computes `1 + k·var(--motion-weight)`
at its own element) — was proven live (`fixCap: 1`). This is §2b, and it is the single most important
integration fact for the build.

---

## 8. CROSS-ENGINE (Chrome + Safari) — perfect by construction

- `linear()` springs + `--ease-cartoon-punch`: Baseline 17.2+ (WebKit-safe), plain `linear()`, no
  `-webkit` prefix, no unsupported function. JUDGE-1 §7 + the spike confirmed live.
- They drive **transform/opacity ONLY** (both engines). The cartoon moving cast is a `transform` on a
  `::after` caster — NEVER an animated `box-shadow` (paint-bound; §Shadows). The squish is a `--stretch`
  reciprocal `scale` (compositor). NO `backdrop-filter:url`, NO per-frame re-blur.
- `--motion-weight` as a typed `@property` `<number>`: registered crosses Baseline 2024-07; the
  unregistered-fallback (0.618) is SAFE on a non-supporting engine — the squish still reads, just
  non-animatable (the same fail-safe `--ui-scale` documents).
- The metaball merge stays the static-SVG-goo / sRGB-interp / compositor-only path — `--motion-weight`
  enters as a shader uniform, not a filter change. The blob↔meatball merge is untouched (motion-only golden).
- **PRM** is ONE reduce-block: `--motion-weight: 0` (zeroes squash + overshoot share + anticipation +
  cartoon-shadow travel + the §2c velocity boost together) + `--ease-cartoon-punch: var(--ease-standard)`.
  Springs still endpoint-snap via `SpringProgress`'s `respectReducedMotion`. The fade survives.

---

## 9. THE ACCEPTANCE BAR + the born-RED gate sketches

**Acceptance (born-RED on today's spec-only state):**
1. `--motion-weight: 0.618` exists on `:root` + `@property` registered (`<number>`, inherits, 1/φ).
2. Every weight-coupled cap evaluates to its `anim-ios27-tune` shipped rest value at weight 0.618
   (the UNION fence) AND to exactly 1.0 at weight 0 (the PRM fence) — **derived site-locally** (§2b).
3. `useLiquidFlex` writes the velocity→weight boost; a fast drive on ANY consumer reads a transiently
   deeper squish (peak weight > 0.7 mid-fast-travel, decays to 0.618 at settle).
4. The drawer/sheet squishes on fling (Maps-card-class sheet); the auto-carousel does NOT (weight 0 pinned).
5. `--ease-cartoon-punch` exists as a raw `linear()` with the negative anticipation leg + >1.10 punch,
   NOT in `MOTION_CURVES`/`SPRING_PRESETS`; PRM re-aliases it to `--ease-standard`.
6. DESIGN.md §L2 prose table matches the shipped pole; `--glass-reveal-enter-scale` homed on `:root`.
7. Safari + Chrome identical; compositor-only; PRM zeroes ALL deformation in one assignment.
8. A tight snap anywhere = FAIL (live-judged as a user, both modes).

**`proof:motion-weight-universal`** (born RED — token empty live today) asserts:
- `--motion-weight` registered `@property` `inherits: true`, `initial-value: 0.618` (a drift off 1/φ reds — mirrors §L6's golden fence).
- The PRM media block zeroes it (`grep` the cascade for `--motion-weight: 0` under `prefers-reduced-motion: reduce`).
- **The cap is derived SITE-LOCALLY, not as a `:root` calc token** (the spike correction): a synthetic
  `:root` cap token of the form `--x-max-stretch: calc(...var(--motion-weight)...)` REDS (it cannot
  follow a scoped weight→0); a coefficient `--*-stretch-k` + a site-local `calc` PASSES. (Born-RED self-test.)
- `useLiquidFlex` reads weight into the effective cap (the squish is weight-coupled, not a frozen cap)
  AND writes the §2c velocity→weight boost (the one computed key present).
- The UNION round-trip: `1 + k·0.618 == shipped_cap` (±0.001) for dock/tabs, AND `1 + k·0 == 1.0`.
- NO second squish engine: still exactly ONE `1+tanh(...)`/`1+travel·(...)` write (the L3 one-engine fence holds).

**`proof:cartoon-punch`** (born RED — token empty live today) asserts:
- `--ease-cartoon-punch` is a `linear()` with a genuine NEGATIVE leg (a stop < 0 — the anticipation
  EXISTENCE proof; the spike's `−0.038`).
- Its peak > 1.10 (it punches PAST the spring fence — it is a register, not a spring; the spike's 1.22).
- It is NOT a `SPRING_PRESETS` row and NOT in `MOTION_CURVES` (the closed-union invariant — a `grep` assert).
- PRM re-aliases it to a non-overshooting ease (`--ease-standard`).

Both gates are born RED because both tokens are EMPTY on `:root` live today (assayed §0; spike §7).

---

## 10. THE NO-FORK / NO-LEGACY DISCIPLINE (binding)

- ZERO new spring family, ZERO second squish engine (weight is a FACTOR on the ONE `useLiquidFlex`
  cap, derived site-locally), ZERO new compose recipe. `--ease-cartoon-punch` is a RAW token (no
  `MotionCurveKind` extension — the closed union holds).
- `--motion-weight` reuses the EXACT `--ui-scale` typed-cascading-scalar idiom (property-regs §18) — not a new pattern.
- The drawer-squish composes the EXISTING `useLiquidFlex` off the EXISTING `DRAWER_SNAP` — no new primitive.
- The cartoon-punch is hand-authored beside the springs (the generator owns only `(response,ζ)` springs — no contrived RAW arm).
- NO legacy: DESIGN.md §L2 stale prose is REWRITTEN to the landed pole, not kept as a dual. The
  anim-ios27-tune table is FROZEN and built UPON, never re-forked. `--glass-reveal-enter-scale` is
  RE-HOMED to `:root`, not duplicated.
- Glass is untouched (motion-only golden) — the BA.W-NO-GRAY warm floor + the six-layer transmissive
  composite + the colorful-field-behind-glass stand; the motion SERVES the glass so it reads ALIVE.
- Golden proportion (§L6): rest weight `1/φ ≈ 0.618`; the type ladder √φ; geometry golden, never round.
```
