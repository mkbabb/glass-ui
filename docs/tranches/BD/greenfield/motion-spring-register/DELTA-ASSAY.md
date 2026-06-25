# DELTA-ASSAY — motion-spring-register (golden vs current → the UNION path)

> The golden-vs-live delta + the deft integration path: how to evolve the current motion register
> toward `GOLDEN.md` reusing extant primitives — KISS, no legacy, no dual-path. The three challenges
> (`challenge/1.md` correctness/KISS, `challenge/2.md` cross-engine/perf, `challenge/3.md`
> design-fidelity) are FOLDED into this assay as binding hardenings; every refutation that LANDED is
> absorbed into the union path below, and the golden's mis-statements are corrected against live truth.
>
> **Orchestrator self-verification (live, Chrome `:5173/dock/overview`, both modes):** confirmed
> `--motion-weight` / `--ease-cartoon-punch` / `--dock-morph-stretch-k` are ALL empty on `:root` (the
> two new gates are genuinely born-RED); `--glass-reveal-enter-scale` empty on `:root` (recipe-fallback
> only, the re-home gap is real); `--dock-morph-max-stretch: 1.14`, `--tab-indicator-max-stretch: 1.18`,
> `--ui-scale: 1` live. The shipped spring peaks read **bouncy 1.0934 (+9.3%), dock 1.0730 (+7.3%)** —
> both ≤1.10, the SOFTENED pole — which proves Challenge 3's top refutation (the golden's §0 printed the
> RETIRED +12.6%/+11% pole; that is wrong).

---

## 0. THE VERDICT — REFINE (not re-invent)

The motion register is **fit and shipped** at its substrate layer: the six `(response, ζ)` springs are
re-calibrated to the iOS-27 weighty-gooey pole (`W-ANIM-IOS27-TUNE`, DONE, live-confirmed ≤10%
overshoot), the ONE `useLiquidFlex` velocity-squish engine reaches 29 files, the squish caps are lifted
(1.14 / 1.18), and the typed-cascading-scalar idiom (`--ui-scale`/`--glass-level`) is the proven home
for the missing governor. **Nothing here is broken.** The delta is a GOVERNING LAYER that was specced in
design.md (§L2/§L4/§Easing/§L6) but never landed: the `--motion-weight` centroid scalar, the
`--ease-cartoon-punch` raw curve, the site-local cap derivation, the velocity→weight live coupling, and
the drawer-squish wiring. **Survival of the fittest: KEEP the substrate verbatim, REFINE it with the
governing layer, RE-INVENT nothing.**

The golden's spine survives all three challenges. But the golden as-written carries **four load-bearing
errors** the challenges caught, which this assay corrects before any wave is authored:

1. **(C1·R1, C2·R3) §2c mis-homes the velocity→weight write in the element-less primitive.**
   `useLiquidFlex` is DELIBERATELY element-less (verified: no `el`, no `getComputedStyle`, no
   `setProperty` — module header lines 18/133, "PURE projection… owns NO element"). It CANNOT write a
   key to a DOM node. The write must move to a consumer-side helper.
2. **(C2·R1) per-frame mutation of the INHERITED `--motion-weight` is a subtree style-recalc storm,
   not "compositor-only / Safari-perfect."** Measured live: p50 18→42ms, all frames blown at 400
   inheriting consumers. The live velocity term must ride a NON-inherited element-local channel.
3. **(C3·R1) the golden's §0 "frozen truth" table prints the RETIRED >10% too-springy pole** (bouncy
   +12.6%, dock +11%). Live-verified WRONG: shipped is bouncy +9.3%, dock +7.3%. The doc-sync wave
   must land the SOFTENED numbers and a gate must REDS the >10% pole.
4. **(C1·R2, C2·R2, C3·R5) the metaball "reads `--motion-weight` as a uniform, untouched" is
   self-contradictory** — a shader uniform is JS-bound, not a CSS read; coupling it is a two-bridge
   (GLSL+WGSL) JS change. EXCLUDE the metaball from the weight coupling (it is already velocity-coupled
   in-shader, cross-engine, zero recalc cost — not broken, leave it).

With those four corrected, the path is a clean UNION on the extant ecosystem.

---

## 1. THE DELTA TABLE (golden item → current state → union disposition)

| # | Golden item | Current live state | Verdict | Union disposition (deft, KISS) |
|---|---|---|---|---|
| 1 | The 6 `(response,ζ)` springs at the weighty pole | LANDED (`springPresets.ts`; live peaks bouncy 1.093 / dock 1.073 ≤1.10) | **KEEP — FREEZE** | The substrate the scalar multiplies. NO re-edit of the 6 rows. (Golden §0 printed wrong numbers — corrected here, NOT carried forward.) |
| 2 | Squish caps 1.14 / 1.18 | LANDED (`density.css:69`, `scale-paper.css:57`) | **KEEP — re-express off the scalar** | Caps become the rest value of a site-local weight-coupled calc; feel byte-identical at rest 0.618. |
| 3 | `useLiquidFlex` ONE squish engine, getter cap (`maxStretch?: number\|(()=>number)`) | LANDED, element-less, getter live (`useLiquidFlex.ts:57,139`) | **KEEP — widen the wiring** | The cap source moves from a literal to a weight-coupled local read THROUGH the existing getter. NO primitive change. |
| 4 | `--motion-weight` typed `@property` (1/φ rest) | **ABSENT on `:root`** (verified empty) | **BUILD** | Register beside `--ui-scale` in `property-regs.css §18`; rest decl in `scheme-motion.css §1`. The `--ui-scale` idiom verbatim. |
| 5 | `--ease-cartoon-punch` raw shaped `linear()` | **ABSENT on `:root`** (verified empty) | **BUILD** | Hand-author in `scheme-motion.css §2` (NOT generated, NOT a `MOTION_CURVES` row). design.md §Easing/§L2 already spec it. |
| 6 | Site-local cap derivation (the spike correction) | n/a (no weight token yet) | **BUILD — with C1·R3 fix** | Derive the cap AT the consumer reading the EXISTING cap token directly (see §2 — NO new `--*-stretch-k` cohort). |
| 7 | velocity→weight LIVE coupling ("morph more on move") | partial (`useLiquidFlex` computes `tanh(\|ṫ\|·k)` but amplitude is static cap) | **BUILD — RE-HOMED (C1·R1, C2·R1)** | A NON-inherited element-local `--flex-vel`, written by a consumer-side helper, NOT the primitive, NOT the inherited var. |
| 8 | Drawer/sheet grow squish (Maps-card gap) | **GAP** — drawer rides `useDrawerSnap` spring, no squish | **BUILD** | Compose the EXISTING `useLiquidFlex` (squish-only) off the drawer snap per-frame value. No new primitive. |
| 9 | PRM one-line carve (`--motion-weight: 0`) | n/a | **BUILD** | One `@media (prefers-reduced-motion: reduce){ :root{ --motion-weight:0 } }` block; design.md §L4/§L5 already promise it. |
| 10 | DESIGN.md §L2 prose currency + `--glass-reveal-enter-scale` re-home | §L2 stale; `--glass-reveal-enter-scale` declared at `reveal.css:52` but NOT on `:root` | **BUILD — with C4·R4 fix** | Rewrite §L2 to the SOFTENED landed pole; re-home the scale onto `:root`; the gate asserts the `:root` HOME, not just the name. |
| 11 | Metaball weight-uniform coupling | already velocity-coupled in-shader (`metaball.frag`/`wgsl` `sa=1+tanh(speed·k)·uStretch`) | **EXCLUDE (C·R2 ×3)** | NOT broken, NOT a CSS read — leave the in-shader register; delete the "shader reads the uniform / untouched" claim. |
| 12 | Selection rules (spring-vs-ease, driver-vs-observer) | scattered design.md prose | **KEEP as doc/table** | Consolidated into one table; `--motion-weight` IS the driver/observer switch. Encoded in the wave + the gate's observer-pin assert. |

---

## 2. THE LOAD-BEARING INTEGRATION MECHANISM (the corrected site-local cap — C1·R3's cleaner form)

The golden §2b mints a `--*-stretch-k` coefficient cohort (`--dock-morph-stretch-k = (1.14−1)/0.618`)
and freezes the cap as a magic decimal in THREE places (the token, a stale JS fallback, and the `k`
literal). Challenge 1·R3 proves that is a DRY hazard — and it caught a LIVE drift: `useDockOrientationMorph.ts`
lines 92/95/99/104 say/fallback **`1.08`** while the real token is **`1.14`** (verified at `density.css:69`).

**The union adopts C1·R3's cleaner derivation: NO new `k` cohort.** The cap stays the SINGLE source
token; the site-local calc reads it directly and scales by `(weight / 0.618)`:

```css
/* the consumer's own element — reads the EXISTING cap token + the LOCAL weight; collapses
   to the shipped cap at rest 0.618 and to exactly 1.0 at weight 0. ZERO new magic constant. */
scale: calc(1 + (var(--dock-morph-max-stretch) - 1) * (var(--motion-weight) / 0.618)) ...;
```

For the JS getter path (the REAL dock/tab consumption — C3·R2 verified dock/tab caps are JS getters off
`rootEl`, NOT pure-CSS inline), the existing `maxStretchOf()` getter gains the weight factor, reading
BOTH the cap token AND the weight off the SAME element it already reads the cap off:

```ts
// useDockOrientationMorph.ts maxStretchOf — reads cap + weight off rootEl (the SAME node),
// so the §2c velocity write and the cap read agree on the weight-owning element (C3·R2 fix).
const maxStretchOf = (): number => {
  const r = rootEl.value;
  if (!r) return 1.14;                       // ← FIX the stale 1.08 (C1·R3 live drift)
  const cs = getComputedStyle(r);
  const cap = parseFloat(cs.getPropertyValue("--dock-morph-max-stretch")) || 1.14;
  const w   = parseFloat(cs.getPropertyValue("--motion-weight")) || 0.618;
  return 1 + (cap - 1) * (w / 0.618);        // rest 0.618 → cap; weight 0 → 1.0
};
```

This is the SINGLE most important integration fact: **the cap is derived site-locally off the EXISTING
cap token + the local weight, with no `k` cohort, no third copy of the magic decimal, and the
weight-owning element is the SAME node the cap getter already reads** (resolving C1·R3 + C3·R2 together).
The spike's load-bearing §2b finding (an unregistered `:root` calc token whose value embeds
`var(--motion-weight)` freezes its text and never follows a scoped weight→0) STILL holds — that is WHY
the calc lives at the consumer, not on `:root`.

---

## 3. THE VELOCITY→WEIGHT RE-HOME (the corrected §2c — C1·R1 + C2·R1 + C3·R3 folded)

The golden's headline "morph more on move" is RIGHT in intent and WRONG in three mechanics. The union
re-homes it deftly:

- **Keep `useLiquidFlex` PURE (C1·R1, C2·R3).** It already computes the saturating term
  `tanh(|ṫ|·squishK)`. It emits ONE additional style object `velStyle = { '--flex-vel': String(term) }`
  — the consumer binds it (the same contract as `stretchStyle`). The primitive stays element-less,
  M5-deterministic (the term is a pure function of the same `travel` derivative). NO `el`, NO
  `getComputedStyle`, NO `setProperty` enters the primitive.
- **`--flex-vel` is a NON-inherited element-local typed `@property` (C2·R1).** Register it in the
  specular cohort (`property-regs.css`, the `inherits: false` cohort — NOT beside the inheriting
  `--ui-scale`): `@property --flex-vel { syntax:"<number>"; inherits:false; initial-value:0 }`. The
  consumer binds it on the SINGLE morphing element it already binds `--stretch` on, so mutating it
  invalidates ONE element, never a subtree. This kills the measured 18→42ms recalc storm.
- **The effective cap reads BOTH the rest weight AND the live velocity at that one element:**
  ```
  cap_eff = 1 + (cap_token − 1) · ( weight + (1 − weight)·var(--flex-vel,0) ) / 0.618
  ```
  At rest (`--flex-vel: 0`) → the shipped cap; mid-fast-travel (`--flex-vel→1`) → deeper; weight 0 +
  PRM → 1.0. "Morph more on move" survives; the subtree storm does not. The boost is element-local, so
  it is genuinely compositor-friendly (one element's `--stretch` recompute, the painted channel is
  `transform`).
- **The rest `--motion-weight` stays the set-ONCE inherited governor (C2·R1).** Drivers
  (`.dock`, a celebrating card) push it to 1 at rest; observers pin it to 0 at rest. It is written ONCE
  at rest (the PRM carve also writes it once on `:root`), never per-frame — exactly the discipline the
  perf challenge demands.

The golden's "29 consumers inherit the instant the primitive writes it" claim is DROPPED (it was false —
the primitive writes nothing). The honest universality: the rest weight inherits (zero prop-drilling,
one write at rest); the live velocity boost is per-morphing-element, written by the shared helper at each
existing `--stretch` write-site (tabs `useTabIndicator.ts:237`, dock `useDockOrientationMorph.ts:144`,
the drawer-squish new site). One added line per EXISTING write-site — auditable, no primitive-purity
break, no subtree storm.

A tiny DRY helper homes the write (C1·R1): `writeVelocityWeight(el, velStyle)` does the single
`el.style.setProperty('--flex-vel', …)` in `composables/motion/core/` (beside `useHaptic.ts` — the
core/ home exists).

---

## 4. THE CARTOON-PUNCH → WEIGHT BINDING (C3·R4 folded — the loud register must actually be loud)

design.md §Easing/§L2 already author `--ease-cartoon-punch` (a `linear()` dipping ~−4% then peaking
~1.22). The golden lands it verbatim in `scheme-motion.css §2`, hand-authored, NOT in
`MOTION_CURVES`/`SPRING_PRESETS` (the closed-union invariant holds — verified `MotionCurveKind` is
`spring|bezier`). Two corrections:

- **The punch→weight binding is STRUCTURAL, not prose (C3·R4).** A surface composing
  `--ease-cartoon-punch` carries `--motion-weight: 1` in the SAME recipe/utility (a coupled pair, like
  the PRM pairing). Otherwise it inherits rest 0.618 and the +22% punch paints as ~+13.6% — below the
  §L2 "~22%" bar, a cartoon-punch that doesn't punch. The gate asserts any `--ease-cartoon-punch`
  consumer resolves a local `--motion-weight ≥ 0.9`.
- **PRM keeps the belt-and-suspenders alias ONLY if a non-weight-scaled consumer exists (C1·R5, C2·R5
  caveat).** The weight=0 carve already kills the punch amplitude; the `--ease-cartoon-punch:
  var(--ease-standard)` alias is redundant UNLESS a consumer drives a non-amplitude leg (e.g. opacity
  timing) through the ease. The wave RESOLVES this: grep the consumers; if all are amplitude-scaled,
  DROP the alias (one scalar, KISS); if any is not, KEEP it and NAME that consumer. No ambiguous
  "to be safe" double-carve.
- **Shape-sanity gate (C1·R5).** `proof:cartoon-punch` asserts beyond "neg leg + peak>1.10": exactly
  one sign change before the peak and a monotone settle after — so a fat-fingered hand-edit of the 13
  stops REDS.

---

## 5. THE UNIVERSALITY AUDIT — what to gate, what to defer (C3·R5 folded)

`useLiquidFlex`/`useLiquidPress`/`useLiquidMorph` reach 29 files. The weight coupling lands on the
DOM-owning morph consumers; the audit's honest disposition:

| Surface | today | union disposition |
|---|---|---|
| dock V↔H morph / fission / drag-morph | YES (getter cap off `rootEl`) | **COUPLE + GATED** — the getter gains the weight factor; the velocity write on the morphing element. The headline surface. |
| tab indicator glide | YES (`linear` law, 1.18) | **COUPLE + GATED** — getter weight-couple; velocity write at `useTabIndicator.ts:237`. |
| press (`useLiquidPress`, 1.04) | YES (squish-only `linear`) | **COUPLE gently + GATED** (C3·R5a) — the press cap reads weight; one assert that it does. Not left half-gated. |
| drawer/sheet grow (Maps-card ref) | **NO** | **WIRE (new)** — the EXISTING `useLiquidFlex` squish-only off the drawer-snap per-frame value (§Disposition: this is `W-MOTION-WEIGHT-DRAWER`, distinct from `W-LIQUID-GROW-ON-EVENT`'s `--dock-grow` SIZE axis — see §7). |
| metaball blob | YES in-shader | **EXCLUDE (C·R2)** — already velocity-coupled, cross-engine, zero recalc; no scalar wiring; the §5 row reads "KEEP — already velocity-coupled in-shader." |
| pager worm / goo-morph | OWN `--{prefix}-flow` | **KEEP independent** (semi-observer; JUDGE-1 §6 untouched). |
| route/page transitions | spring clocks only | **DEFER, written reason** (semi-observer, low priority) — not silently half-gated. |

**Honesty clause (C3·R5b):** the rest weight 1/φ ≈ 0.618 is golden-proportion (design.md §L6); the
cap-derivation factor `(weight/0.618)` is a feel-preserving normalization to the FROZEN caps (the UNION
fence wins over proportion purism). The golden-ratio law governs the rest weight + the type/geometry
ladders, NOT the cap multipliers — stated, not over-claimed as "golden proportion in all things."

---

## 6. THE PRM + DRIVER/OBSERVER MECHANICS (survive intact)

- **PRM: ONE line.** `@media (prefers-reduced-motion: reduce){ :root{ --motion-weight: 0 } }`. Because
  every cap reads `(weight/0.618)` and the velocity boost reads `(1−weight)·--flex-vel`, weight 0
  collapses BOTH to identity (cap→1.0, boost→0). design.md §L4 line 115 already promises exactly this
  "one assignment zeroes the extra squash, overshoot, anticipation, arc, and stagger." The springs keep
  their own `SpringProgress` endpoint-snap; the fade survives. Live-confirmed safe by the spike's
  weight-0 observer probe (cap 1.0).
- **Driver/observer = the scoped var.** A driver ancestor (`.dock`, celebrating card, sheet) sets
  `--motion-weight: 1` locally; an observer subtree (`<CarouselContent>` auto-advance, `[data-reorder]`)
  pins `--motion-weight: 0`. `inherits: true` carries it with zero prop-drilling. **GUARDED (C1·R5):**
  the gate asserts the known observer roots resolve `--motion-weight: 0` (a renamed component silently
  un-pinning is the exact bug the spike caught at the cap layer).

---

## 7. THE NO-DUPLICATION RECONCILE (against the extant 116-wave set)

The closest existing waves, and why the new waves do NOT collide:

- **`W-ANIM-IOS27-TUNE` (DONE)** — the SUBSTRATE. The union FREEZES its `(response,ζ)` table + lifted
  caps and builds the governing layer ON it. NO re-edit of the 6 rows. (Its doc DELTA already records
  the SOFTENED pole — the golden's §0 error does not propagate here.)
- **`BD.W-LIQUID-GROW-ON-EVENT`** — this is the `--dock-grow` SIZE-SCALE axis (a `transform: scale`
  condense on scroll-position + a `useDragMorph` pull-to-grow). It is DISJOINT from the squish/weight
  axis: it changes the box FOOTPRINT, not the volume-preserving deformation. The drawer-squish wave
  (`W-MOTION-WEIGHT-DRAWER`) wires the EXISTING `useLiquidFlex` SQUISH (the `--stretch` reciprocal) off
  the drawer-snap spring — a different primitive, a different channel. **No collision; they compose.**
- **`BD.W-MAPS-CARD`** — the Maps composite STORY (the gestalt host). It CONSUMES the drawer/sheet that
  `W-MOTION-WEIGHT-DRAWER` makes squish; it does not re-author motion. The drawer-squish is the motion
  half the Maps-card reference frame implies.
- **`BD.W-TABS-LIQUID` / dock waves** — already consume `useLiquidFlex`; the union AUGMENTS their getter
  cap with the weight factor in-place (one-line getter edit), it does not re-fork their squish.

The four new/amended waves (§WAVE-AMENDMENT) touch tokens + getters + one new drawer wiring + a doc-sync
— none duplicates an existing wave's deliverable; each references `GOLDEN.md` as the reference impl with
the corrections of this assay applied.

---

## 8. THE NO-FORK / NO-LEGACY DISCIPLINE (binding, verified extant-primitive reuse)

- ZERO new spring family, ZERO second squish engine (weight is a FACTOR on the ONE `useLiquidFlex` cap,
  derived site-locally off the EXISTING cap token), ZERO `MOTION_CURVES` extension, ZERO new `--*-stretch-k`
  cohort (C1·R3 — the cap token stays the single source).
- `--motion-weight` reuses the EXACT `--ui-scale` typed inheriting-`<number>` idiom (`property-regs.css §18`,
  verified live `--ui-scale: 1`). `--flex-vel` reuses the EXACT specular `inherits: false` cohort idiom.
- The velocity write homes in a tiny shared `composables/motion/core/` helper (the dir exists), bound by
  consumers — the primitive stays pure.
- The drawer-squish composes the EXISTING `useLiquidFlex` off the EXISTING `useDrawerSnap` — no new primitive.
- The cartoon-punch is hand-authored beside the springs (the generator owns only `(response,ζ)`).
- NO legacy: DESIGN.md §L2 stale prose is REWRITTEN to the SOFTENED landed pole, not kept as a dual; the
  stale `1.08` fallback in `useDockOrientationMorph.ts` is FIXED, not aliased; `--glass-reveal-enter-scale`
  is RE-HOMED to `:root`, not duplicated.
- Glass is untouched (motion-only) — the BA.W-NO-GRAY warm floor + six-layer composite stand.
- Golden proportion: rest weight 1/φ ≈ 0.618; the cap factor is an honest feel-preserving normalization
  (C3·R5b), not claimed as golden-ratio.

---

## 9. CROSS-ENGINE (Chrome + Safari) — perfect by construction, with the perf correction

- `linear()` springs + `--ease-cartoon-punch`: WebKit Baseline 17.2+, no `-webkit` prefix; verify the
  negative leg does not NaN-clamp on the 17.2 parser (C2 caveat → a webkit π assert).
- `--motion-weight` typed inheriting `@property`, written ONCE at rest (C2·R1) — no per-frame subtree
  recalc. `--flex-vel` typed NON-inheriting `@property`, written per-frame on ONE element — element-local
  invalidation only. Both drive `transform`/`--stretch` (compositor).
- The metaball stays the in-shader velocity register (EXCLUDED, C·R2) — cross-engine by its own GLSL+WGSL
  paths, zero CSS-recalc cost.
- PRM: the one `--motion-weight: 0` line + (conditionally) the punch alias.
- **The challenges' cross-engine honesty (C2·R1.4, C1 cross-engine, C3·R3):** the spike is a HEADLESS
  cascade-arithmetic de-risk (Chrome DOM measurement + a JS tanh simulation), NOT a painted both-modes
  proof. The §2c velocity write is SIMULATED in the spike (Math.tanh arithmetic), not exercised on a real
  `useLiquidFlex` mount. So the build waves OWN the actual paint verification (dock morph, drawer fling,
  cartoon-punch one-shot) + a born-RED rAF frame-budget gate run in **WebKit**, not a pre-claimed PASS.
  "Live-verified in Chrome both modes" is downgraded to "headless cascade-arithmetic de-risk (Chrome)."

---

## 10. CONVERGENCE

**REFINE. ~82% converged.** The substrate (springs + squish engine + caps + the cascading-scalar idiom)
is fit and FROZEN; the golden's architecture (triangle + centroid scalar + site-local caps + raw
cartoon-punch + PRM one-liner) survives all three challenges. The remaining 18% is the DE-RISK the
challenges flagged: the §2c velocity term must be RE-HOMED to a non-inherited `--flex-vel` (the only
mechanism not yet de-risked — currently simulated, perf-storm if shipped on the inherited var), the §0
spring numbers must be CORRECTED to the softened pole, the metaball EXCLUDED, and the actual both-modes
WebKit paint + frame-budget gate must be DELIVERED (not pre-claimed). All four corrections are absorbed
into the wave amendment; none is a re-invention. The build is buildable, deft, and a true UNION on the
extant ecosystem.
