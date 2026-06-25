# WAVE-AMENDMENT — motion-spring-register

> The concrete tranche amendment reconciling the motion-vocabulary golden against the extant 116-wave
> set in `docs/tranches/BD/union/waves/`. Reference implementation: `GOLDEN.md` AS CORRECTED BY
> `DELTA-ASSAY.md` (the four load-bearing challenge-hardenings: §2c re-home to non-inherited `--flex-vel`,
> the §0 softened-pole correction, the metaball exclusion, the no-`k`-cohort site-local cap). Every NEW
> token is verified EMPTY on `:root` live → the gates are genuinely born-RED, no duplication possible.

---

## A. AUGMENT (existing wave — frozen substrate, one currency edit)

### `W-ANIM-IOS27-TUNE.md` — AUGMENT (freeze + reference-anchor, NO re-edit of the 6 rows)
- **Action:** Add a one-paragraph **§Governing-layer pointer** at the close: this wave's `(response,ζ)`
  table + lifted caps (1.14 / 1.18) are the FROZEN SUBSTRATE that `W-MOTION-WEIGHT` multiplies; the
  governing scalar is built ON it, never a re-fork. Cite `GOLDEN.md §0/§6`.
- **Correction folded (C3·R1):** add one explicit line — the shipped pole is **bouncy +9.3% / dock
  +7.3% (both ≤10%)**; the golden's draft §0 "+12.6% / +11%" was the RETIRED too-springy pole and is
  NOT the substrate. (This wave's own table already carries the softened numbers; the line forecloses
  the doc-sync wave re-introducing the retired pole.)
- **NO source edit** to `springPresets.ts` — the 6 rows are byte-frozen. Pure doc anchor.

---

## B. NEW WAVES (each born-RED — the two tokens verified empty on `:root` live)

### NEW `BD.W-MOTION-WEIGHT.md` — the `--motion-weight` governing scalar + the velocity boost
**Band 0 (foundations) / Band D (motion). Depends:** `W-ANIM-IOS27-TUNE` (frozen substrate),
`AX.W51 --ui-scale` idiom. **Reference:** `GOLDEN.md §1/§2/§4/§5` as corrected by `DELTA-ASSAY.md §2/§3/§5/§6`.

**Builds:**
1. `--motion-weight` typed inheriting `@property` in `property-regs.css §18` beside `--ui-scale`
   (`syntax:"<number>"; inherits:true; initial-value:0.618`) + the `:root { --motion-weight: 0.618 }`
   rest decl in `scheme-motion.css §1` (the Feature-token-home rule, beside the `--spring-*` clocks).
2. `--flex-vel` typed **NON-inheriting** `@property` in the specular `inherits:false` cohort of
   `property-regs.css` (`syntax:"<number>"; inherits:false; initial-value:0`) — the live velocity channel
   (DELTA-ASSAY §3, the C2·R1 perf re-home: per-frame writes invalidate ONE element, never a subtree).
3. **Site-local cap derivation, NO `--*-stretch-k` cohort** (DELTA-ASSAY §2, the C1·R3 cleaner form):
   the JS getter consumers (`useDockOrientationMorph.ts`, `useTabIndicator.ts`, `useTabDragMorph.ts`,
   `useLiquidPress.ts`) compute `cap_eff = 1 + (cap_token − 1) · (weight + (1−weight)·flexVel) / 0.618`
   reading cap + weight off the SAME element the cap getter already reads (C3·R2 weight-ownership fix).
   **Also FIX the live drift:** `useDockOrientationMorph.ts` `1.08` fallback/comments → `1.14` (C1·R3).
4. `useLiquidFlex` emits ONE extra style object `velStyle = { '--flex-vel': … }` (the saturating term it
   ALREADY computes) — the PRIMITIVE STAYS ELEMENT-LESS (C1·R1/C2·R3); the consumer binds it via a tiny
   `composables/motion/core/writeVelocityWeight` helper at each EXISTING `--stretch` write-site.
5. The PRM one-liner: `@media (prefers-reduced-motion: reduce){ :root{ --motion-weight: 0 } }`.
6. Driver/observer scope examples: `.dock`/celebration → `--motion-weight: 1`; `<CarouselContent>`
   auto-advance + `[data-reorder]` → `--motion-weight: 0` (C1·R5 — GUARDED by the gate).

**Born-RED gate — `scripts/proof-motion-weight-universal.mjs` (`tags:["local","ci"]`):**
- **C1** `--motion-weight` registered `@property` `inherits:true initial-value:0.618` (a drift off 1/φ
  REDs — the §L6 golden fence). Born-RED: token EMPTY on `:root` live (verified).
- **C2** `--flex-vel` registered `@property` `inherits:false` (an `inherits:true` velocity channel REDs —
  the C2·R1 subtree-storm bite). The primitive `useLiquidFlex.ts` carries NO `getComputedStyle`/`setProperty`/`el`
  param (the element-less-purity bite — C1·R1).
- **C3** the PRM block zeroes it (grep the cascade for `--motion-weight: 0` under `prefers-reduced-motion: reduce`).
- **C4 (the spike correction)** NO `:root` cap token of the form `--x-max-stretch: calc(…var(--motion-weight)…)`
  (it cannot follow a scoped weight→0 — born-RED self-test bite). The cap is derived SITE-LOCALLY off the
  EXISTING cap token. The UNION round-trip: `1 + (1.14−1)·(0.618/0.618) == 1.14` and `…·0 == 1.0` (±0.001),
  dock + tabs.
- **C5 (positive existence, C1·R4)** `count(weight-coupled caps) ≥ 1` — the cap fence is NOT vacuously
  true on the empty pre-state.
- **C6 (universality, C3·R5a)** dock + tab + **press** caps each read weight (not half-gated); the drawer
  is gated by the sibling wave; route/metaball deferred with a written reason.
- **C7 (frame-budget, the C2·R1 born-RED perf gate)** a fast morph on a ≥20-descendant driver reads p50
  rAF Δ < 20ms AND no monotonic jank vs idle — run on the **WebKit** Playwright project, not Chrome only.
- **C8 (observer-pin guard, C1·R5)** the known observer roots resolve `--motion-weight: 0`.
- **C9 (softened-pole guard, C3·R1)** the live bouncy/dock `--spring-*` peaks ≤ 1.10 (REDs if anyone
  re-introduces the retired >10% pole via the doc-sync).
- **C10** still exactly ONE `1+tanh(...)`/`1+travel·(...)` squish write (the L3 one-engine fence).

**Binding π — `tests-visual/motion-weight.spec.ts` (LOCAL, Chromium + WebKit, both modes):** the ACTUAL
paint the spike could not give (C2·R1.4/C3·R3): a real `useLiquidFlex`-driven dock morph reads a transient
deeper `--stretch` mid-fast-travel (weight boost LIVE, not simulated) AND a cross-element re-read; the
auto-carousel does NOT squish (weight 0 pinned); a captured screenshot delta, not a pre-claimed PASS.

---

### NEW `BD.W-CARTOON-PUNCH.md` — the third pole, a raw shaped `linear()`
**Band 0 / Band D. Depends:** `BD.W-MOTION-WEIGHT` (the punch amplitude is weight-scaled).
**Reference:** `GOLDEN.md §3` + design.md §Easing/§L2 (already authored there) as corrected by `DELTA-ASSAY.md §4`.

**Builds:**
1. `--ease-cartoon-punch` hand-authored in `scheme-motion.css §2` — a `linear()` dipping ~−4% below
   origin (anticipation) → crossing 1.0 → peaking ~1.22 (past the spring fence) → settling. NOT generated
   by `regen-spring-tokens.mjs`, NOT a `SPRING_PRESETS` row, NOT a `MOTION_CURVES` entry (the closed
   `spring|bezier` union holds — verified).
2. **Structural punch→weight binding (C3·R4):** the surface composing `--ease-cartoon-punch` carries
   `--motion-weight: 1` in the SAME recipe/utility (a coupled pair) — so the loud register is never
   accidentally muted to ~+13.6% by inheriting rest 0.618.
3. **PRM (C1·R5/C2·R5 resolved, no ambiguous double-carve):** grep the consumers; if ALL drive
   weight-scaled amplitude legs, the weight=0 carve suffices — DROP the redundant `--ease-cartoon-punch:
   var(--ease-standard)` alias (KISS). If any consumer drives a NON-amplitude leg, KEEP the alias and
   NAME that consumer in the wave. No "to be safe" double mechanism.

**Born-RED gate — `scripts/proof-cartoon-punch.mjs` (`tags:["local","ci"]`):**
- `--ease-cartoon-punch` is a `linear()` with a genuine NEGATIVE leg (a stop < 0 — anticipation existence)
  AND a peak > 1.10 (the punch past the spring fence). Born-RED: token EMPTY on `:root` live (verified).
- **Shape-sanity (C1·R5):** exactly ONE sign change before the peak + a monotone settle after (a
  fat-fingered stop REDs).
- It is NOT in `SPRING_PRESETS` and NOT in `MOTION_CURVES` (a grep assert — the closed-union invariant).
- **Loud-register guard (C3·R4):** any surface referencing `--ease-cartoon-punch` resolves a local
  `--motion-weight ≥ 0.9` (a loud surface left at rest weight REDs).
- PRM: the punch amplitude collapses under `--motion-weight: 0` (+ the alias arm IFF a non-amplitude
  consumer was named).

**Binding π:** a celebration/CTA one-shot blooms with the anticipation dip + the ~+22% punch, both modes,
WebKit included (verify the negative leg does not NaN-clamp on the 17.2 `linear()` parser — C2 caveat).

---

### NEW `BD.W-MOTION-WEIGHT-DRAWER.md` — the drawer/sheet grow squish (the Maps-card gap)
**Band 0 / Band B (overlays). Depends:** `BD.W-MOTION-WEIGHT`, the EXISTING `useDrawerSnap` +
`useLiquidFlex`. **Reference:** `GOLDEN.md §5` as corrected by `DELTA-ASSAY.md §5/§7`.

**Builds:** wire the EXISTING `useLiquidFlex` (squish-only, like `useLiquidPress`) on the drawer/sheet
height span, driven off the `useDrawerSnap` spring's per-frame value, reading the universal weight via the
site-local effective cap + the per-element `--flex-vel`. A fast fling → deeper squish; a slow drag → calm.
**No new primitive.** Compositor-only (`--stretch` reciprocal scale, never animated height — the
`sizeStyle`-latent canon P5).

**Disjoint-axis fence (DELTA-ASSAY §7):** this is the volume-preserving SQUISH (`--stretch`) on the
drawer; it is DISTINCT from `BD.W-LIQUID-GROW-ON-EVENT`'s `--dock-grow` SIZE-SCALE axis (a
`transform: scale` footprint condense). They compose, never collide; this wave NEVER writes `--dock-grow`,
that wave NEVER writes `--stretch`. The Maps-card (`BD.W-MAPS-CARD`) CONSUMES this drawer-squish as the
motion half its reference frame implies.

**Born-RED gate — extends `proof:motion-weight-universal` C6 (the drawer arm):** the drawer/sheet
composes `useLiquidFlex` squish off `useDrawerSnap`; reads weight; the auto-carousel does NOT (weight-0
contrast); compositor-only (no animated layout property). Born-RED: drawer has no `useLiquidFlex` squish
today (verified — rides `useDrawerSnap` only).

**Binding π:** a Maps-card-class sheet fling squishes (deeper on a fast fling); the auto-carousel content
does not; both modes + WebKit.

---

### NEW `BD.W-MOTION-DOC-SYNC.md` — DESIGN.md §L2 currency + `--glass-reveal-enter-scale` re-home
**Band 0 / Band E (history/spec). Depends:** the three waves above landed.
**Reference:** `GOLDEN.md §0/§6` as corrected by `DELTA-ASSAY.md §1·#10 / §0`.

**Builds:**
1. Rewrite DESIGN.md §L2's "canonical springs" prose to the **SOFTENED LANDED pole** (smooth 0.58/+1.5%,
   snappy 0.48/+3.2%, bouncy 0.60/+9.5%, gentle 0.82/0%, dock 0.68/+7.3%, press 0.20/+1.5%) — NEVER the
   golden's mistaken +12.6%/+11% (C3·R1). Name whether dock/press rows ADD to §L2 or stay
   `springPresets.ts`-SSOT (C3 lesser note — avoid a second stale table).
2. Re-home `--glass-reveal-enter-scale: 0.88` from the `reveal.css:52` recipe declaration onto `:root`
   (verified empty on `:root` live — recipe-fallback only).

**Born-RED gate — `proof:design-md-current` (re-greens):**
- §L2 prose table matches the shipped `springPresets.ts` pole (a stale +12.6% REDs — C3·R1).
- **`--glass-reveal-enter-scale` resolves on `getComputedStyle(:root)` (the HOME, C4·R4)** — not merely
  that the name exists in the cascade (a grep against `reveal.css:52` must NOT vacuously pass).

---

## C. PRUNE / EXCISE (none — but two explicit non-actions recorded)

- **EXCISE from the golden's scope: the metaball weight-uniform coupling** (C1·R2 / C2·R2 / C3·R5). It is
  NOT a CSS read (a shader uniform is JS-bound) and NOT "untouched" (it would be a two-bridge GLSL+WGSL JS
  change). The blob is ALREADY velocity-coupled in-shader, cross-engine, zero recalc cost — NOT broken.
  **No wave books it.** The §5 disposition row reads "KEEP — already velocity-coupled in-shader, no scalar
  wiring." (If ever wanted, it is a separate explicit `W-MOTION-WEIGHT-BLOB` landing both bridges + a
  cross-engine parity assert — NOT this golden.)
- **EXCISE the golden's `--*-stretch-k` coefficient cohort** (C1·R3). The cap stays the single-source
  token; the site-local calc reads it directly with a `(weight/0.618)` factor — zero new magic constant,
  the `k` cohort is deletable. No token is minted for it.
- **No existing wave is pruned or excised.** `BD.W-LIQUID-GROW-ON-EVENT` (the `--dock-grow` SIZE axis),
  `BD.W-MAPS-CARD` (the composite story), `BD.W-TABS-LIQUID`, the dock waves all STAND — the amendment
  AUGMENTS their getters/consumers in-place (one-line weight-factor edits), never re-forking them.

---

## D. THE FILE-TOUCH MANIFEST (deft, extant-primitive reuse)

| File | Edit | Wave |
|---|---|---|
| `property-regs.css §18` | `@property --motion-weight` (beside `--ui-scale`) + `@property --flex-vel` (specular `inherits:false` cohort) | W-MOTION-WEIGHT |
| `scheme-motion.css §1/§2` | `:root{--motion-weight:0.618}` + PRM carve + `--ease-cartoon-punch` raw `linear()` | W-MOTION-WEIGHT, W-CARTOON-PUNCH |
| `useDockOrientationMorph.ts` | getter `cap_eff` weight-factor; **FIX `1.08`→`1.14` drift** | W-MOTION-WEIGHT |
| `useTabIndicator.ts` / `useTabDragMorph.ts` | getter weight-factor + `--flex-vel` write at the `--stretch` site | W-MOTION-WEIGHT |
| `useLiquidPress.ts` | press cap reads weight (gentle) | W-MOTION-WEIGHT |
| `useLiquidFlex.ts` | emit `velStyle = {'--flex-vel':…}` (the term it already computes) — STAYS element-less | W-MOTION-WEIGHT |
| `composables/motion/core/writeVelocityWeight.ts` | NEW tiny consumer-side helper (the DRY write home) | W-MOTION-WEIGHT |
| `useDrawerSnap.ts` / `DrawerContent.vue` | compose `useLiquidFlex` squish off the snap spring | W-MOTION-WEIGHT-DRAWER |
| `reveal.css` → `:root` | re-home `--glass-reveal-enter-scale: 0.88` | W-MOTION-DOC-SYNC |
| `design.md §L2` | rewrite to the SOFTENED pole | W-MOTION-DOC-SYNC |
| `scripts/proof-motion-weight-universal.mjs` + `scripts/proof-cartoon-punch.mjs` | NEW gates (born-RED) | W-MOTION-WEIGHT, W-CARTOON-PUNCH |
| `tests-visual/motion-weight.spec.ts` | NEW π (Chromium + WebKit, both modes, the real paint) | W-MOTION-WEIGHT(+DRAWER) |

**NO** second spring family, **NO** second squish engine, **NO** `MOTION_CURVES` extension, **NO**
`--*-stretch-k` cohort, **NO** metaball bridge change, **NO** primitive-purity break.
