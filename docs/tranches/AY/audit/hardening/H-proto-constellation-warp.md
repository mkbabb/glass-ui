# H-proto-constellation-warp — PROTOTYPE: the warp interaction + easter eggs (AY.W-CON2 spec input)

**Verdict: GAPS-FOUND.** The warp the lane is asked to "prototype" is ALREADY SHIPPED in glass-ui
(AX.W17): `warpOnClick` / `warpTo` / `nearestNode` / `warpStep` / `setWarpTarget`, a dt-stepped
critically-damped spring, the full token block, a live π gate, and a 12-case unit suite. The AY plan
+ AUDIT-LEDGER are STALE (they call warp "UNADDRESSED"). So this lane's real product is NOT a warp
prototype but (a) a CONFIRMATION that the warp recipe is sound + the two things still wrong with it,
and (b) the genuinely-unbuilt easter-egg prototype: the field-force algorithms, the event surface,
the token surface, the PRM gating, and the overfitting decision. This doc is the AY.W-CON2 input.

This lane goes DEEPER than the sibling `H-constellation.md` (which surveys the whole CON1/2/3 story);
here is the actual algorithm-level prototype recipe + the risk ledger for W-CON2's interaction band.

---

## PART A — the WARP (shipped; the prototype recipe, confirmed, + the 2 residual defects)

### A.1 The shipped algorithm (the recipe AY.W-CON2 must NOT re-build)

The warp is the clean DRY/KISS shape the AY plan asks for, already implemented:

1. **Pick the target** — `nearestNode(field, px, py, excludeIdx)` (`constellationField.ts:300-321`):
   a linear O(count) min-d² scan over the drifting nodes, excluding the current focal so a click on
   yourself does not re-warp; degenerate cursor-on-focal no-ops (`warpTo:387-395`).
2. **Re-point the focal node** — `setWarpTarget(field, idx)` stores the target's INDEX (not a position
   snapshot), so each frame the spring re-reads `nodes[targetIdx].{x,y}` and CHASES a moving target,
   arriving ON it (the identity-ride). Re-pointing keeps velocity, so a mid-flight re-target curves.
3. **Spring it there** — `warpStep(field, dt)` (`:337-355`): a per-axis 2nd-order critically-damped
   integrator `v += (−2ζω·v − ω²·(x−target))·dt; x += v·dt`, `ω = 2π/response`,
   `WARP_RESPONSE=0.55s`, `WARP_ZETA=1.0`, dt-clamped to 50ms — advanced INSIDE the substrate's ONE
   rAF (`stepField:271`). NO `useSpring`, NO second rAF (the parked-substrate-freeze contract).
4. **Map the click** — the hoisted `toLocal` (`Constellation.vue:199-209`) maps client→canvas-local
   px via `getBoundingClientRect`, deck-scale-invariant; both the ripple path and the warp path read
   the ONE mapper.
5. **PRM gate** — the warp `pointerdown` listener is simply NOT REGISTERED under reduced-motion
   (`:246`); independent of `pointerReactive`.

**This is the canonical recipe. AY.W-CON2 confirms it, does not re-author it.** Re-implementing
it (the stale-ledger trap) is a churn-and-regress risk on a green gate.

### A.2 Residual warp defect 1 (GAPS-FOUND) — `warpStep` uses ω-as-natural-frequency, but the keyframes.js `(response, ζ)` model defines `response` as the PERIOD, so the settle is ~6× slower than `0.55s` implies.

`WARP_OMEGA = 2π/WARP_RESPONSE` treats `response` as a period → `ω ≈ 11.4 rad/s`. At ζ=1 a
critically-damped 2nd-order system settles (to ~2%) in `≈ 6/ω ≈ 0.53s` — coincidentally close, so
the BUG IS MASKED at the default. But the keyframes.js spring model (the doctrine glass-ui's
`--spring-*` tokens are generated from, `tokens.css:139-157`) defines `response` as the settling
*duration target*, and converts it as `ω = 2π/response` ONLY for the UNDERDAMPED case where `response`
is the oscillation period. For ζ=1 (no oscillation) `2π/response` is NOT the right ω: the actual
2%-settle time for `ω=2π/0.55` is governed by the `(1+ωt)e^(−ωt)` envelope, ~0.53s, not 0.55s. The
number happens to land near the intent, so it is not visibly wrong TODAY — but the moment W-CON2
exposes `response`/`ζ` as a TOKEN (it should, per token-first) a consumer setting `response: 0.3`
expects a 0.3s settle and gets ~0.29s by luck on ζ=1 and a WRONG value on any other ζ. **Spec input:
W-CON2 must reconcile the `ω` derivation with the keyframes.js param model BEFORE tokenizing the
spring** — either reuse keyframes.js's own `(response, dampingFraction)`→curve conversion
(`scripts/regen-spring-tokens.mjs` is the existing single-source) or document that `WARP_RESPONSE` is
the natural-period, not the settle-time. The hard gate: a unit assertion that `warpStep` settles to
within 2% of a step target in `T(response, ζ)` frames where `T` matches the keyframes.js model (a
numeric integration test, not "looks springy").

### A.3 Residual warp defect 2 (GAPS-FOUND) — the warp has NO auto-drift target-source, so the slides "wandering anomaly" dies on adoption (this is the AX.W17 README's unbuilt assertion).

The AX.W17 design thesis is "drift and warp are ONE mechanic, two target-sources" — but only the
CLICK target-source (`warpTo`) was built. There is NO periodic auto-pick. The README asserts "the
slides drift becomes 'warp to a periodically-chosen random node' — the same seam" but no code picks a
random target on a cadence. The slides bespoke `drift()` (`constellation.ts:209-231`, easeInOutQuad
over 2.6s, ±0.14 jitter around the anchor, every 6-16s) is a REAL behavior that vanishes when slides
adopts the lib. **This is a CON2 prototype item, not just CON3 adoption:** the auto-drift target-source
is the second half of the "one mechanic" thesis and it is a clean extension of `setWarpTarget`. Recipe
below (B.0). It is the LOWEST-risk addition and it unblocks the slides adoption — it should land FIRST.

---

## PART B — the EASTER EGGS prototype (100% unbuilt; the lane's real product)

`grep supernova|konami|flock|gravity.well|dblclick|double-tap = 0 hits` in src/ (the only match is a
dock comment). Every egg below is a TRANSIENT FORCE on the node velocities, composed into the EXISTING
`stepField` loop — NO new rAF, NO new substrate, riding the parked-freeze for free. The design
principle: an egg is a `field.force` state object stepped alongside `warpStep`, exactly as warp is.

### B.0 (PREREQUISITE, recommend BUILD) — auto-drift target-source: the second half of the thesis.

Not an egg, but the foundation the eggs and the slides adoption both need. Recipe:

```ts
// constellationField.ts — a periodic auto-target source on the SAME warp spring.
interface ConstellationWanderState { nextAt: number; minIdle: number; jitter: number; }
// In stepField, after warpStep, when no CLICK warp is in flight (warp settled):
//   if (now >= wander.nextAt && warpSettled(field)) {
//     const idx = pickWanderTarget(field, rng);   // a random node, or a node near the seed anchor
//     setWarpTarget(field, idx);
//     wander.nextAt = now + wander.minIdle + rng() * wander.jitter;
//   }
```

The same `warp` spring carries it; `warpTo` (click) simply pre-empts the wander by re-pointing. ONE
spring, two target-sources — the thesis, finally complete. Prop: `wander?: boolean | { minIdle, jitter }`.
PRM: no wander under reduced-motion (the focal mark stays at its seed). This is the recipe the slides
`drift()` collapses onto, so L.W-ADOPT can delete it without behavior loss.

### B.1 (RECOMMEND SHIP as the ONE engine egg) — pointer-held GRAVITY-WELL.

The single field-coherent mechanic: it EXTENDS the existing pointer-steer (`stepField:249-266` already
leans nodes toward the cursor) rather than adding a new event class. A held pointer (>N ms) ramps a
1/r²-softened attractor at the cursor; release ramps it back. Recipe:

```ts
// field.well = { x, y, strength: 0, target: 0 };  // strength eases 0→1 on hold, →0 on release
// In stepField, when well.strength > 0, for each node within wellReach:
//   const d = max(hypot(dx,dy), wellSoftening);          // softening kills the singularity
//   const a = (wellGain * well.strength) / (d * d);       // inverse-square pull
//   p.vx += (dx / d) * a * dt; p.vy += (dy / d) * a * dt;
//   // clamp |v| to wellMaxSpeed so nodes never slingshot off-canvas
// well.strength = approach(well.strength, well.target, wellRamp * dt);  // eased ramp
```

Why this one: (a) it reuses the pointer the engine already tracks — no new listener surface; (b) it is
a continuous force, so PRM-gating is trivial (don't ramp the well under reduce); (c) it has a natural
second consumer (any background-decoration consumer wants "pointer pulls the field in"). The
held-timer is the only new event piece: on `pointerdown` start a timer; if still down at `holdMs`,
set `well.target = 1`; on `pointerup`/`pointerleave`, `well.target = 0`. Prop:
`gravityWell?: boolean | { holdMs, gain, reach, maxSpeed }`.

### B.2 (RECOMMEND DEMO-ONLY) — double-tap SUPERNOVA.

A double-tap/`dblclick` injects a radial OUTWARD impulse from the tap point, decaying over ~Ns:

```ts
// field.nova = { x, y, t0, dur };  pushed on dblclick; one active at a time (or a small array)
// In stepField, if a nova is active:
//   const age = (now - nova.t0) / nova.dur;  if (age >= 1) clear nova;
//   const falloff = 1 - age;                  // linear (or eased) decay
//   for each node within novaReach:
//     const a = novaGain * falloff / max(d, soften);
//     p.vx += (dx / d) * a; p.vy += (dy / d) * a;   // OUTWARD (dx = p.x - nova.x)
//   // velocities renormalize to base speed over the next few frames (the drift reasserts)
```

Risk: a supernova permanently perturbs node speeds unless the drift re-normalizes them (the existing
steer renormalizes `|v|` to `speed` — reuse that path, or the field heats up and never settles). The
double-tap detector is a new event surface (timestamp the last `pointerup`, fire on a second within
`dblWindowMs` near the same point). **Overfit risk is HIGH** — one cover slide. Recommend DEMO-ONLY
(a storybook route that doubles as the W-DOC1 README example), NOT an engine prop, unless a second
real consumer appears.

### B.3 (RECOMMEND CUT or DEMO-ONLY) — konami-code FLOCK.

A key-sequence detector (↑↑↓↓←→←→ba) flips the field into a boids-lite mode for ~Ns: each node gets a
cohesion (steer toward local-neighbor centroid) + alignment (match neighbor mean velocity) +
separation (avoid crowding) pass, then eases back to free drift. Recipe is a real O(count²) neighbor
pass ON TOP of the existing O(count²) edge pass — at count=64 still cheap, but it is a SECOND distinct
field mechanic and a global keyboard listener (an a11y/focus-trap concern on a slide deck).

**Overfit verdict: this is exactly the J-invariant-10 / L-invariant-8 violation the precepts forbid** —
three speculative field mechanics in a shared engine for ONE cover slide. RUTHLESS read: konami-flock
is the LEAST field-coherent (a keyboard easter egg on a decorative background canvas), has zero second
consumer, and adds a global key listener. **CUT it from the engine.** If wanted, it is a demo-only
storybook flourish entirely outside the shipped component (a `demo/` overlay that calls the public
`field` expose), not a library prop.

### B.4 The egg-scope DECISION (the gate AY.W-CON2 must make BEFORE building — overfitting bar)

| egg | field-coherent? | new event surface | 2nd consumer plausible? | disposition |
|---|---|---|---|---|
| auto-drift target-source | YES (warp's 2nd source) | none | YES (every consumer) | **SHIP (engine, prop)** |
| pointer-held gravity-well | YES (extends steer) | held-timer only | YES (bg decoration) | **SHIP (engine, prop)** |
| double-tap supernova | partial (transient force) | dbltap detector | weak (cover only) | DEMO-ONLY (or CUT) |
| konami-flock | NO (kbd egg, boids) | global keydown | none | **CUT** (demo-only at most) |

The AY plan lists three eggs "e.g."; the precept-correct answer is AT MOST TWO engine props
(auto-drift + gravity-well, both field-coherent, both with a real second consumer), the rest
storybook-demo or cut. Building three field mechanics into the shared engine for one slide is the
overfit. State the decision in the wave spec; do not build all three speculatively.

---

## PART C — the TOKEN surface (what W-CON2 adds; token-first)

The shipped tokens are color/alpha only (`tokens.css:495-512` light / `:2058-2071` dark). The
interaction tunings are JS consts (`WARP_RESPONSE`, `WARP_ZETA`, `WARP_DT_CLAMP`) — NOT token-first.
W-CON2 should tokenize the spring + the egg gains so a consumer retunes without editing src:

- `--constellation-warp-response` / `--constellation-warp-zeta` — the warp spring (read once on mount,
  not per-frame; reconcile with the A.2 ω-derivation defect FIRST).
- `--constellation-well-gain` / `--constellation-well-reach` / `--constellation-well-ramp` — the
  gravity-well force (iff shipped).
- `--constellation-wander-idle` / `--constellation-wander-jitter` — the auto-drift cadence.

CAVEAT (the W30 cardinal defect, re-stated): these are NUMERIC tokens read via `parseFloat`, NOT
color tokens — so they are immune to the `light-dark()`-into-Canvas2D leak. But `proof:constellation-tokens`
clause (c) must NOT false-positive on a numeric token (it scans `--constellation-*` declarations for
`light-dark(`/transitive-var; a numeric `0.55` passes trivially). Verify the gate's allowlist when the
numeric tokens land. Read-on-mount (not per-frame `getComputedStyle`) keeps the hot loop clean.

---

## PART D — the PRM gating model (STATE it; the warp precedent)

Every egg follows the WARP precedent: **the egg LISTENER/RAMP is not registered/advanced under
reduced-motion** (the `Constellation.vue:246` shape — listener simply not added), NOT
fire-but-freeze. Specifically:

- auto-drift: `wander.nextAt` never advances under reduce → the focal mark stays at its seed.
- gravity-well: the held-timer never sets `well.target = 1` under reduce → no pull.
- supernova/flock (if demo-only): the demo overlay itself checks `matchMedia` before binding.

The `useCanvas2D` substrate LIVE-MONITORS PRM (`useCanvas2D.ts:164-173`) and re-arms on un-reduce, so
a user toggling PRM mid-session re-enables the eggs on the next frame — but the egg STATE (well/nova)
must reset to neutral when `handle.reducedMotion` flips true (don't leave a half-ramped well frozen).
**Spec input: the egg state objects reset to neutral on the PRM-true edge** (a one-line guard in the
render hook reading `handle.reducedMotion`).

---

## PART E — the RISK ledger (what breaks the prototype)

1. **Hot-loop cost.** Every egg is a per-node pass inside `stepField` (already O(count²) for edges).
   gravity-well is O(count) — fine. flock is O(count²) — a SECOND quadratic pass; at count=64 it is
   ~4k ops/frame, acceptable, but a consumer raising `count` to 200+ (the engine allows it) makes flock
   ~40k/frame. **Gate: a frame-budget assertion (the egg pass adds < X ms at count=64) OR cap the egg
   passes' node count.** This is why flock should be demo-only / cut.
2. **Velocity heat-up.** supernova + gravity-well ADD to `p.vx/vy`; without renormalizing back to
   `speed`, the field accelerates and never settles (nodes ping-pong off walls faster forever). The
   existing steer renormalizes — the eggs MUST route through the same `|v|→speed` clamp or the lattice
   degrades after a few activations. **Gate: a unit assertion that mean |v| returns to ~`speed` within
   N frames after an egg fires** (the field-cools-down invariant).
3. **Off-canvas slingshot.** A 1/r² well with no softening floor sends a node at the cursor to
   infinite velocity (singularity). The `max(d, soften)` floor + a `maxSpeed` clamp are MANDATORY, not
   optional. **Gate: no node leaves `[0,w]×[0,h]` after a max-strength well at the canvas center.**
4. **Double-tap vs ripple/warp collision.** The first tap of a double-tap ALSO fires the ripple AND
   the warp (both on `pointerdown`). A supernova on the second tap stacks on a warp-in-flight + two
   ripples. Either (a) supernova is demo-only on a DIFFERENT canvas without warp/ripple, or (b) the
   detector swallows the second `pointerdown`'s warp/ripple — a coupling the spec must resolve
   explicitly (this exact "swallowing the tap was the root cause of the double-tap field" bug is noted
   in `GlassDock.vue:452` — a known trap in this codebase).
5. **Multi-instance event surface.** The slides deck runs N constellation canvases via one scanner
   (`createConstellations`). A global keydown (konami) fires on ALL of them; a held-pointer well is
   per-canvas. The eggs' event scope (per-instance vs document-global) must be specced — another reason
   konami (global) is the worst fit.
6. **Stale-ledger churn.** The #1 process risk: AY.W-CON2 re-implementing the SHIPPED warp because the
   ledger says "UNADDRESSED". The wave MUST re-stamp the ledger and re-read HEAD before building.

---

## Convergence criteria (what "perfected" concretely means for this lane)

1. AUDIT-LEDGER row 2 re-stamped: warp click-to-nearest-node + spring + PRM = DONE (AX.W17); the OPEN
   interaction work is the auto-drift source + the decided-scope egg(s), not the warp.
2. The `warpStep` ω-derivation reconciled with the keyframes.js `(response, ζ)` model (A.2), with a
   numeric settle-time unit assertion — BEFORE any spring tokenization.
3. The auto-drift target-source (B.0) shipped in the engine on the SAME warp spring, PRM-gated, so the
   slides wandering anomaly survives adoption (this also unblocks L.W-ADOPT).
4. Egg scope DECIDED against the ≥2-consumer bar (B.4 table): ≤2 engine props (auto-drift +
   gravity-well), the rest demo-only or cut with rationale recorded.
5. Each shipped egg: a transient force composed into `stepField` (NO new rAF), velocity renormalized
   to `speed` after firing (the cool-down invariant), softening+maxSpeed clamps on the well (no
   slingshot), PRM-listener-not-registered + state-reset-on-PRM-edge.
6. The interaction tunings tokenized (Part C), `proof:constellation-tokens` clause-(c) allowlist
   verified for numeric tokens.
7. A net-new `proof:constellation-egg-live` π gate: a synthetic egg fires, a per-frame velocity/density
   readback proves the field perturbs THEN cools (the cardinal-lesson DELTA, not a grep). The
   double-tap-vs-warp collision (E.4) resolved + captured.

---

## Fold-into routing

- PART A.1 (warp confirmed) → re-stamp AUDIT-LEDGER row 2 (process, before AY.W-CON2 dispatch).
- PART A.2 (ω-derivation defect) → **AY.W-CON2** (reconcile before tokenizing the spring).
- PART A.3 + B.0 (auto-drift source) → **AY.W-CON2** (the second target-source; lands FIRST, unblocks
  L.W-ADOPT) — coordinate with `H-constellation.md` FINDING 2 (same item, this is the algorithm).
- PART B.1-B.4 (eggs + the scope decision) → **AY.W-CON2** (the lane's headline; decide scope BEFORE build).
- PART C (token surface) → **AY.W-CON2** (token-first the interaction tunings).
- PART D (PRM model) → **AY.W-CON2** (state it; the warp precedent).
- PART E (risk ledger + the egg π gate) → **AY.W-CON2** hard gate (the `proof:constellation-egg-live`
  authoring + the cool-down/no-slingshot unit assertions).
