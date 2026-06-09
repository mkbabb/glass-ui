# AY.W-CON2 — Constellation warp VERIFY + decided-scope easter eggs + spring tokenisation

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** A (perfect+export the lib)
**Depends-on:** AY.W-CON1 (the `refitField` + the auto-drift `wander` source land in `constellationField.ts` FIRST; this wave ADDS the gravity-well force + tokenises the spring on the SAME engine — order the two so W-CON1's `stepField` signature + `field.wander` are in place when W-CON2 threads the well).
**Unblocks:** L.W-ADOPT (the slides cover wants the gravity-well + the tokenised spring); AY.W-GOD1 (the `constellationField.ts` carve runs AFTER this content — the well + the tokens move the line count).

---

## Goal criterion

The shipped AX.W17 click-warp is VERIFIED LIVE by a captured DELTA (not re-built — the warp is green at
`proof:constellation-warp-live`, so re-authoring it is the forbidden stale-ledger churn). The
`warpStep` ω-derivation is RECONCILED with the keyframes.js `(response, dampingFraction)` spring model
BEFORE the spring is tokenised, with a numeric settle-time unit assertion that pins the `response`
semantics so a consumer setting the token gets the documented behaviour at any ζ. The easter-egg scope
is DECIDED against the ≥2-consumer bar (per `H-proto-constellation-warp.md` B.4): the pointer-held
GRAVITY-WELL ships as the ONE field-coherent engine prop (it extends the existing pointer-steer, no new
event class, has a real second consumer); double-tap SUPERNOVA is DEMO-ONLY; konami-FLOCK is CUT (global
keydown, no second consumer, overfit). The well is a transient force composed into `stepField` (NO new
rAF) with the mandatory safety floors — `max(d, soften)` no-singularity floor, a `maxSpeed` no-slingshot
clamp, and velocity renormalisation back to `speed` so the field COOLS after the well releases (the
field-cools invariant). PRM follows the warp precedent (the held-timer never arms the well under reduce)
AND the well STATE resets to neutral on the PRM-true edge (no half-ramped force frozen). The interaction
tunings are tokenised numeric (`--constellation-warp-response/-zeta/-well-gain/-well-reach/-well-ramp/
-wander-idle/-wander-jitter`), read ONCE on mount (not per-frame), and the `proof:constellation-tokens`
clause-(c) allowlist is verified to NOT false-positive on a numeric token.

## Completion criterion

The single hard gate `proof:live-verified-ledger` (below) verifies: the warp DELTA is CAPTURED (a fresh
on-disk before→after `.png` of a live warp, registered in `AY/PROGRESS.md` — not author-asserted); a
NET-NEW `proof:constellation-egg-live` π gate proves the gravity-well perturbs the field THEN cools (the
per-frame velocity-delta readback — field heats under hold, mean |v| returns to ~`speed` within N frames
of release), no node leaves `[0,w]×[0,h]` after a max-strength well at canvas centre (the no-slingshot
invariant), and the well is suppressed under PRM with state-reset on the PRM edge; a numeric settle-time
unit assertion matches the keyframes.js `T(response, ζ)` model (the ω-derivation reconcile); the eggs'
scope decision is recorded (well = engine prop, supernova = demo-only, flock = CUT — a deletion/non-build
proof); and the numeric tokens resolve into the live engine with `proof:constellation-tokens` green.

---

## §0 — RE-GROUND (pre-implement; from `audit/hardening/b2/B2-readiness.md` §2 + §3.4)

W-CON2 was authored at the PRE-Batch-2 base and is RE-GROUND-required before harvest. The
substance (the ω-derivation reconcile, the decided-scope eggs, the safety-floor discipline, the PRM
state-reset, the `proof:constellation-egg-live` mirror) is sound — but two grounding facts shifted
when W-CON1 landed (`tranche/AY` @ `1151899`). The executing agent MUST do the step-0 re-grep
below FIRST (the stale-worktree-trap discipline) or it carves a moving target.

**RG-A (stale cites, +143 lines) — every `constellationField.ts`/`Constellation.vue` cite is wrong.**
W-CON1 grew `constellationField.ts` 510→**653** and `Constellation.vue` to 353. The cites below are
at the PRE-W-CON1 base and have all shifted: `constellationField.ts:286-290` (WARP_RESPONSE/ZETA/
OMEGA/DT_CLAMP) → ~`:376-380`; `:337-355` (warpStep) → ~`:418-440`; `:300-321` (nearestNode) +
`:257-263` (the `|v|→speed` steer renorm the well routes through) → shifted. `proof:constellation-
warp-live` is at `package.json:653`, NOT `:644` (the universal +9 package.json drift — the
`gates.mjs` + in-script cites are accurate, only package.json drifted; trust the gate-ID, re-grep the
line). Mandate: re-grep EVERY cite against HEAD before editing.

**RG-B (FALSE PREMISE, the load-bearing correction) — W-CON1 declared ZERO numeric tokens; W-CON2
owns the ENTIRE numeric cohort.** §6 + E4 below repeatedly assume W-CON1 "lands the numeric-token
cohort START" (the `--constellation-wander-idle`/`-wander-jitter` members) and that W-CON2 merely
"extends" it. This is FALSE: a grep for `constellation-warp-response` / `-wander-idle` / `-well` in
`src/styles/tokens.css` → **0 hits**. The only `--constellation-*` tokens at HEAD are the 6
COLOR/alpha tokens. W-CON1 landed `wander` with `minIdle`/`jitter` as JS FIELD DEFAULTS
(`constellationField.ts:95-97`, `:356-359`), NOT CSS tokens. So W-CON2 is the FIRST wave to mint ANY
`--constellation-*` NUMERIC token and must declare the ENTIRE cohort (`-warp-response`/`-zeta`/
`-well-*`/`-wander-idle`/`-wander-jitter`), not just its well subset. The "extend the cohort W-CON1
started (IFF W-CON1 has not already)" framing resolves to: it has NOT — W-CON2 declares it all. This
is a scope EXPANSION the spec under-counts; update §6/E4 to OWN the wander tokens too. (The
`proof:constellation-tokens` clause-(c) numeric-false-positive analysis is otherwise correct.)

**RG-C — serialization unchanged.** W-CON1 (landed) → W-CON2 → W-CON3 serial order holds (all three
edit `Constellation.vue` render-loop + `constellationField.ts` + the demo story). RG-A/RG-B are
re-grounding (cites + token ownership), NOT a re-design — the egg engine + the safety floors are
sound as specced.

---

## §1 — The verified defects (file:line)

### D1 (PROCESS / stale-ledger — VERIFY, do NOT re-build) — the warp is SHIPPED + GATED; the AUDIT-LEDGER calls it UNADDRESSED.

The AX.W17 click-warp is fully shipped and live-gated. Verified at HEAD (`at-dock-convergence`):

- `Constellation.vue:246-254` — the `warpOnClick` `pointerdown` listener → `warpToField`; the imperative
  `warpTo(client|local)` expose at `:271-279`.
- `constellationField.ts:337-355` (`warpStep`) — the per-axis 2nd-order critically-damped integrator;
  `nearestNode:300-321`, `setWarpTarget:366-375`, `warpTo:387-395`; `WARP_RESPONSE=0.55`, `WARP_ZETA=1.0`,
  `WARP_OMEGA=2π/WARP_RESPONSE` (`:286-288`); advanced inside `stepField` (`:271`) — NO `useSpring`, NO
  second rAF (the parked-substrate-freeze contract).
- `proof:constellation-warp-live` (`package.json:644`, spec `tests-visual/constellation-warp-live.spec.ts`)
  is GREEN: a real-device render + per-frame `field.warp.{x,y}` readback (MIGRATE-TOWARD-CLICK,
  CONVERGE-ONTO-NODE, CHASE-LIVE-TARGET, SPRING-EASED-NOT-SNAP).
- the warp unit cases in `tests/components/custom/constellation/constellationField.test.ts` — the
  focal-node/warp-spring describe block opens at `:120` (`nearestNode`, `warpTo`, `warpStep` converge/
  chase/monotone/dt-clamp); the file is 237 lines at HEAD.

The `AUDIT-LEDGER` marks corpus item #2 (constellation click-WARP) **UNADDRESSED** — FALSE
(`H-precept-drift.md` F1, `H-constellation.md` "What AX.W17 already delivered", `H-proto-constellation-warp.md`
PART A.1). **This wave re-stamps the ledger row to DONE-AX.W17 and CAPTURES a live DELTA; it does NOT
re-author warp, `warpTo`, `nearestNode`, the spring, or the PRM gate.** Re-implementing the shipped warp
is the forbidden churn-and-regress on a green gate (`H-proto-constellation-warp.md` PART E.6).

### D2 (GAPS-FOUND, physics) — `warpStep` derives ω as a natural-frequency, but the keyframes.js `(response, ζ)` model defines `response` as the OSCILLATION PERIOD, so `response` is NOT the settle-time. Masked at ζ=1; WRONG on tokenisation at any other ζ.

The keyframes.js spring model (the doctrine the `--spring-*` tokens are generated from — `tokens.css:139-157`,
`scripts/regen-spring-tokens.mjs`, `springLinearStops`) is EXPLICIT in its own type doc
(`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:860-882`):

> Internally these map onto a standard second-order linear ODE
> `x'' + 2ζω₀ x' + ω₀² x = ω₀² target` with `ω₀ = 2π / response` and `ζ = dampingFraction` …
> **`response`** — Angular period of the oscillation in seconds. Roughly the time the spring takes to
> swing through one cycle if undamped.

So glass-ui's `WARP_OMEGA = (2 * Math.PI) / WARP_RESPONSE` (`constellationField.ts:288`) is MECHANICALLY
CONSISTENT with the keyframes.js ODE convention — the engine is NOT wrong today. The defect is SEMANTIC
and surfaces ON TOKENISATION: `response` is the *angular period*, NOT the *settle target*. For a
critically-damped system (ζ=1) the 2%-settle time is governed by the `(1 + ω₀t)e^(−ω₀t)` envelope and lands
at `t₂ ≈ 5.83/ω₀ = 5.83·response/(2π) ≈ 0.928·response`. At the shipped `response = 0.55, ζ = 1` that is
`≈ 0.51s` — coincidentally near `0.55`, so the number reads "right" by luck and the masking is total at
the default. But the moment W-CON2 exposes `response`/`ζ` as a TOKEN (it must, per token-first), a consumer
who sets `--constellation-warp-response: 0.3` with the iOS designer intuition ("0.3s to settle") gets a
~0.28s settle at ζ=1 (close, by luck) and an ARBITRARILY-WRONG settle at any other ζ they also set
(`H-proto-constellation-warp.md` A.2). **The reconcile must land BEFORE tokenisation:** (a) keep the
keyframes.js `ω₀ = 2π/response` convention (it is the shared house model — do NOT mint a second ω
formula), and (b) DOCUMENT in the token + the doc-comment that `--constellation-warp-response` is the
keyframes.js angular-period (the SwiftUI `.spring(response:)` axis), NOT a settle-duration, with the
settle relation `t₂ ≈ 0.93·response` at ζ=1 stated; and (c) bind it with a numeric settle-time unit
assertion that integrates `warpStep` and checks it converges to within 2% in `T(response, ζ)` frames
where `T` matches the keyframes.js model (NOT "looks springy").

### D3 (GAPS-FOUND, 100% unbuilt + under-specced) — the easter eggs have NO algorithm, NO token surface, NO ≥2-consumer decision.

`grep -rE 'supernova|konami|flock|gravity.?well|well\.strength|dblclick|double.?tap' src/` → 0 hits (the
only `gravity well`-adjacent string is a dock comment). The AY plan lists three eggs "e.g." with a gate
"easter eggs fire; reduced-motion inert" — but specs neither the field-force algorithm, the PRM model, nor
the overfitting decision (`H-constellation.md` FINDING 3, `H-proto-constellation-warp.md` PART B). Three
speculative field mechanics in a shared engine for ONE cover slide is exactly the J-inv-10 / L-inv-8
overfit the precepts forbid. **The scope must be DECIDED against the ≥2-consumer bar BEFORE building**
(the B.4 table is the decision, ratified in §2).

### D4 (GAPS-FOUND, token-first) — the interaction tunings are JS consts, not tokens.

`WARP_RESPONSE` / `WARP_ZETA` / `WARP_DT_CLAMP` are module consts (`constellationField.ts:286-290`) — NOT
token-first. A consumer cannot retune the warp without editing src. The `--constellation-*` token block
ships COLOR/alpha only (`tokens.css:495-512` light / `:2058-2071` dark). W-CON2 tokenises the spring + the
well gains as NUMERIC tokens read once on mount (`H-proto-constellation-warp.md` PART C). CAVEAT: these are
read via `parseFloat`, NOT colors, so they are immune to the W30 `light-dark()`-into-Canvas2D leak — but
`proof:constellation-tokens` clause (c) scans `--constellation-*` declarations for `light-dark(` /
transitive-`var()`; a numeric `0.55` passes trivially. The clause-(c) allowlist must be VERIFIED to not
false-positive on the new numeric tokens.

---

## §2 — Objective (the gestalt, root-not-consumer, ≥2-consumer)

1. **VERIFY the warp live — do NOT re-build.** Re-stamp the AUDIT-LEDGER row to DONE-AX.W17. Capture a
   live warp DELTA (a real-device before→after `.png` of a click warping the focal onto the nearest node
   along the spring-eased path) and register it in `AY/PROGRESS.md`. The shipped `warpStep` / `warpTo` /
   `nearestNode` / spring / PRM gate are UNTOUCHED.

2. **Reconcile the ω-derivation BEFORE tokenising.** Keep the keyframes.js `ω₀ = 2π/response` convention
   (the shared house model). DOCUMENT `--constellation-warp-response` as the keyframes.js angular-period
   (NOT a settle-time) with the `t₂ ≈ 0.93·response` settle relation at ζ=1 in the token comment + the
   `warpStep` doc-comment. Bind it with a numeric settle-time unit assertion.

3. **Ship the DECIDED-scope eggs against the ≥2-consumer bar (the B.4 decision — RATIFIED here):**

   | egg | field-coherent? | new event surface | 2nd consumer | DISPOSITION |
   |---|---|---|---|---|
   | pointer-held gravity-well | YES (extends the existing steer) | held-timer only | YES (bg decoration + the slides cover) | **SHIP — engine prop `gravityWell`** |
   | double-tap supernova | partial (transient force) | dbltap detector | weak (cover only) | **DEMO-ONLY** (a storybook overlay calling the public `field` expose — NOT an engine prop) |
   | konami-flock | NO (kbd egg, boids) | global keydown | none | **CUT** (no engine prop, no demo build) |

   The well is the ONE engine egg: it reuses the pointer the engine already tracks (no new listener class),
   it is a continuous force (PRM-gating is trivial — don't ramp), and it has a real second consumer (any
   background-decoration consumer wants "pointer pulls the field in"). Supernova stays a DEMO overlay (one
   cover slide is not a ≥2-consumer engine prop). Flock is CUT — a global keydown on a decorative canvas
   has zero second consumer and is the least field-coherent; if ever wanted it is a demo-only flourish
   outside the shipped component, NOT built in this wave.

4. **Compose the well as a transient force in `stepField` (NO new rAF), with the MANDATORY safety floors:**
   the `max(d, soften)` no-singularity floor, the `maxSpeed` no-slingshot clamp, and velocity
   renormalisation back to `speed` after the well releases (the field-cools invariant — route through the
   SAME `|v|→speed` renorm the existing steer uses, or the field heats and never re-settles).

5. **PRM by the warp precedent + the state-reset edge.** The held-timer never sets `well.target = 1` under
   reduce (the listener-not-ramped precedent); AND on the PRM-true edge the well state resets to neutral
   (`well.strength = well.target = 0`) so a half-ramped well is not frozen on (`H-proto-constellation-warp.md`
   PART D).

6. **Tokenise the tunings numeric, read-on-mount.** `--constellation-warp-response`, `-warp-zeta`,
   `-well-gain`, `-well-reach`, `-well-ramp`, `-well-max-speed`, `-well-hold-ms`. (The `-wander-idle` /
   `-wander-jitter` cadence tokens are W-CON1's wander; W-CON2 adds them to the same numeric token cohort
   IFF W-CON1 has not already — coordinate so the cohort is declared once.) Read ONCE on mount via
   `parseFloat` (not per-frame `getComputedStyle`) into the field's spring/well config.

This is the ROOT fix: the field-coherent interaction the cover wants is transposed UP into the shared
engine as ONE opt-in prop with a real second consumer, the spring becomes consumer-retunable via tokens,
and the overfit (three mechanics for one slide) is refused.

---

## §3 — Edit-sites (exact)

### E1 — `src/components/custom/constellation/constellationField.ts`

**E1a. The ω-derivation reconcile (doc + token-read, NO formula change).** Keep `WARP_OMEGA = (2 *
Math.PI) / WARP_RESPONSE` (the keyframes.js `ω₀ = 2π/response` convention — do NOT mint a second ω). UPDATE
the `WARP_RESPONSE` const comment (`:285-288`) and the `warpStep` doc-comment (`:323-336`) to state: `response`
is the keyframes.js angular-PERIOD (the SwiftUI `.spring(response:)` axis), NOT a settle-duration; at ζ=1
the 2%-settle lands at `t₂ ≈ 5.83/ω₀ ≈ 0.93·response`. Convert the three module consts to a config the field
carries so the tokens can override them (below).

**E1b. The spring/well config on the field.** Add a `ConstellationWarpConfig { response; zeta; }` and a
`ConstellationWellConfig { gain; reach; ramp; maxSpeed; holdMs; }`, carried on the field (or on `field.warp`
/ a new `field.well`). `warpStep` reads ω/ζ from the config (`ω = 2π/config.response`) instead of the module
consts, so a consumer's tokenised override reaches the integrator. Default the config to the shipped
`{ response: 0.55, zeta: 1.0 }` so the byte-identical default holds.

**E1c. The `ConstellationWell` state + the gravity-well force.** Add the interface + a `field.well?` member,
and a force pass inside `stepField` (composed alongside the existing steer + `warpStep` — NO new rAF):

```ts
export interface ConstellationWell {
    /** canvas-local px of the held pointer; (-1,-1) = inactive. */
    x: number;
    y: number;
    /** the eased pull strength 0→1 (ramps to `target` at `ramp`/s). */
    strength: number;
    /** the strength the ramp is easing toward: 1 while held, 0 on release. */
    target: number;
}

// In stepField, AFTER the steer pass and BEFORE/with warpStep, when a well exists:
//   well.strength = approach(well.strength, well.target, cfg.ramp * dt);   // eased ramp
//   if (well.strength > EPS && well.x >= 0) {
//     const reach = cfg.reach * k, reach2 = reach * reach;
//     for (const p of nodes) {
//       const dx = well.x - p.x, dy = well.y - p.y;
//       const d2 = dx*dx + dy*dy;
//       if (d2 > reach2) continue;
//       const d = Math.max(Math.sqrt(d2), cfg.soften);      // MANDATORY singularity floor
//       const a = (cfg.gain * well.strength) / (d * d);      // inverse-square pull
//       let nvx = p.vx + (dx / d) * a * dt;
//       let nvy = p.vy + (dy / d) * a * dt;
//       const nsp = Math.hypot(nvx, nvy);
//       const cap = cfg.maxSpeed * k;                        // MANDATORY no-slingshot clamp
//       if (nsp > cap) { nvx = nvx / nsp * cap; nvy = nvy / nsp * cap; }
//       p.vx = nvx; p.vy = nvy;
//     }
//   }
```

CRITICAL — the COOL-DOWN. After the well releases (`well.target → 0`, `well.strength` eases to 0), the
node velocities must renormalise back to `speed` so the field re-settles. Two acceptable shapes (decide in
impl): (i) route the well force through the SAME `|v|→speed` renorm the steer uses (`:257-263`) so |v| never
leaves the `speed` band — the lattice never heats; OR (ii) add a per-node `|v|→speed` ease-back in the drift
pass that pulls speed toward `speed` over a few frames once the well is gone. Shape (i) is preferred (it is
the existing steer's exact pattern — no new mechanic). Either way the field-cools invariant is the binding
gate (§6 assert 2).

The `soften` floor: add a `soften` field to the well config (px), defaulted small (≈8) so a node AT the
cursor gets a bounded pull, never `∞`.

**E1d. Barrel re-exports.** Re-export `ConstellationWell`, `ConstellationWarpConfig`, `ConstellationWellConfig`,
and any well helper from `index.ts` so the api types + the unit suite reach them. The `stepField` /
`warpStep` / `setWarpTarget` / `warpTo` / `nearestNode` public symbols stay byte-identical in NAME (callers
+ the W-GOD1 carve depend on them).

### E2 — `src/components/custom/constellation/Constellation.vue`

**E2a. The `gravityWell` prop + the held-timer + PRM gate.** Add `gravityWell?: boolean | { holdMs?:
number; gain?: number; reach?: number; ramp?: number; maxSpeed?: number; soften?: number }` to `defineProps`.
Initialise `field.well` from it (default OFF — `gravityWell` absent leaves `field.well` undefined and
`stepField` skips the force pass, byte-identical to HEAD; `gravityWell: true` uses the tokenised defaults).
Add a held-timer event block, MIRRORING the `warpOnClick` block's PRM gate (`:246-254`):

```ts
if (gravityWell && host && !handle.reducedMotion) {
    let holdTimer: number | undefined;
    const onDown = (e: PointerEvent) => {
        const p = toLocal(e); if (!p) return;
        field.well.x = p.x; field.well.y = p.y;
        holdTimer = window.setTimeout(() => { field.well.target = 1; handle.wake(); }, cfg.holdMs);
        handle.wake();
    };
    const onMove = (e: PointerEvent) => {            // track the well to the held pointer
        if (field.well.target > 0) { const p = toLocal(e); if (p) { field.well.x = p.x; field.well.y = p.y; } }
    };
    const release = () => { clearTimeout(holdTimer); field.well.target = 0; handle.wake(); };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerup", release);
    host.addEventListener("pointerleave", release);
    host.addEventListener("pointercancel", release);
}
```

The well listener is SIMPLY NOT REGISTERED under reduce (the warp precedent — `Constellation.vue:246`).
The held-timer is the only new event piece; `gravityWell` and `warpOnClick` and `pointerReactive` are
INDEPENDENT axes (a consumer can hold-to-pull on a non-ripple, non-warp lattice).

**E2b. The PRM-true-edge state reset.** Because `useCanvas2D` LIVE-MONITORS PRM
(`useCanvas2D.ts:137-173`, the `matchMedia` `change` listener) and re-arms on un-reduce, the well STATE
must reset to neutral when `handle.reducedMotion` flips true mid-session — else a half-ramped well freezes
ON. Add a one-line guard read in the render hook: when `handle.reducedMotion` is true, set
`field.well.strength = field.well.target = 0` (and `field.well.x = -1`) so the parked frame carries no
pull. This is the `H-proto-constellation-warp.md` PART D state-reset-on-PRM-edge clause (distinct from the
wander, which carries no ramp and needs no reset).

**E2c. Read the numeric tokens ONCE on mount.** Where the palette is resolved (`:161`, `readPalette`), also
read the interaction tokens via `parseFloat(getComputedStyle(canvas).getPropertyValue('--constellation-warp-response'))`
etc. into the warp/well config (fallback to the shipped defaults when absent). Read ONCE on the first sized
frame, NOT per-frame — the hot loop stays clean. (Reuse `readPalette`'s `readNum` helper pattern from
`constellationField.ts:163-168`, or add a sibling `readInteractionConfig(canvas)` free-function.)

**E2d. The demo test seam.** Extend `demo/stories/substrates/constellation.vue` to mount a `gravityWell`
instance and expose its live `field` (+ a programmatic `holdWellAt(x, y)` / `releaseWell()` test hook that
drives the well WITHOUT racing a real held-pointer gesture) on a sibling `__constellationEgg` window handle
(mirroring the `__constellationWarp` seam at `:104-108`). The supernova DEMO-ONLY overlay (below) also
mounts here.

### E3 — `demo/stories/substrates/constellation.vue` (the DEMO-ONLY supernova — NOT an engine prop)

Add a storybook overlay section that implements double-tap SUPERNOVA entirely in the demo, calling the
public `field` expose — NO library code, NO engine prop. A `dblclick`/double-`pointerdown` detector
(timestamp the last tap, fire on a second within ~300ms near the same point) pushes a radial OUTWARD
impulse decaying over ~Ns directly onto `field.nodes[].{vx,vy}`, then lets the existing drift renormalise
|v| back to `speed`. This DOUBLES as the W-DOC1 README example and proves the public `field` seam carries
arbitrary consumer content. Place it on a DIFFERENT canvas from the warp instance so the double-tap-vs-warp
collision (`H-proto-constellation-warp.md` PART E.4 — the `GlassDock.vue:452` known trap) is structurally
avoided (no warp/ripple listener on the supernova canvas). NO konami-flock is built (CUT).

### E4 — `src/styles/tokens.css`

Add the NUMERIC interaction-tuning tokens to the `--constellation-*` block (both arms — though numeric
tokens are mode-invariant, keep them in BOTH `:root` and `.dark` blocks per the existing block's
two-literal discipline, OR declare them ONCE in `:root` if the gate's clause-(b) FULL-set check is
satisfied by the existing color set — decide against `proof:constellation-tokens`'s arm requirement):

```css
/* §interaction — the warp spring + the gravity-well tunings (numeric, NOT colors;
   read ONCE on mount via parseFloat, immune to the W30 light-dark()/Canvas2D leak).
   `--constellation-warp-response` is the keyframes.js ANGULAR-PERIOD (the SwiftUI
   .spring(response:) axis), NOT a settle-duration — at ζ=1 the 2% settle lands at
   t₂ ≈ 0.93·response. */
--constellation-warp-response:  0.55;   /* s — keyframes.js angular period */
--constellation-warp-zeta:      1.0;    /* critically damped — a focal mark must NOT ring */
--constellation-well-gain:      <tuned>;
--constellation-well-reach:     <tuned>;  /* px (base-width; k-scaled at step) */
--constellation-well-ramp:      <tuned>;  /* 1/s — the hold/release ramp rate */
--constellation-well-max-speed: <tuned>;  /* px/frame cap — the no-slingshot clamp */
--constellation-well-hold-ms:   <tuned>;  /* ms hold before the well arms */
```

The `<tuned>` values are SET by the §6 egg-live π readback (the field-perturbs-then-cools capture is the
binding truth, not a hand-set number). VERIFY `proof:constellation-tokens` clause (c) does NOT false-positive
on these numeric tokens (a `0.55` carries no `light-dark(` substring and references no var — it passes
trivially; confirm the gate's `--constellation-*` scan tolerates the numeric members and does not require
them in the color FULL-set check of clause (b) — `scripts/proof-constellation-tokens.mjs:43-50` declares
`REQUIRED_TOKENS`, the SIX color/alpha tokens `readPalette` must read for the FULL-set (clause (b) at
`:205-209` filters `readPalette`'s source against this list); the new numeric tokens are ADDITIVE — they
are NOT in `REQUIRED_TOKENS`, so clause (b) does not demand them, and clause (c) scans `--constellation-*`
declarations for a `light-dark(` literal or a transitive `var()` to a `light-dark()`-bearing token (a
numeric `0.55` carries neither — it passes trivially)).

### E5 — `tests/components/custom/constellation/constellationField.test.ts`

Add unit cases (the CPU-oracle layer beneath the π gate):

- **warp-settle-matches-keyframes-model (the ω reconcile, D2).** Integrate `warpStep` over a step target
  from a known start; assert the |x−target| envelope crosses below 2% of the initial gap at frame
  `round(T(response, ζ)·60)` where `T(response, 1) = 5.83/ω₀ = 5.83·response/(2π)` — i.e. the numeric
  settle-time matches the keyframes.js critically-damped model, NOT "looks springy". Add a SECOND case at a
  DIFFERENT `response` (e.g. 0.30) asserting the settle frame scales with `response` (the proof the token
  semantics are correct: halving `response` ≈ halves the settle, not "stays ~0.55").
- **well-perturbs-then-cools (the cool-down invariant).** Seed a field; set `field.well` at centre with
  `target = 1`; step ≥ 30 frames (mean |v| RISES while held — the perturb); set `target = 0`; step ≥ N
  frames; assert mean |v| returns to within ±5% of `speed` (the field cools). A field that never
  renormalises FAILS this (the heat-up regression).
- **well-no-slingshot (the safety floor).** Seed a node AT the canvas centre = the well centre; set a
  MAX-strength well (`strength = 1`, large `gain`); step 60 frames; assert NO node's `(x,y)` leaves
  `[0,w]×[0,h]` (the `max(d,soften)` floor + the `maxSpeed` clamp hold; a missing floor sends the
  co-located node to `∞`).
- **well-default-off byte-identity.** A field with NO `well` produces a first-N-frame node trace
  byte-identical to HEAD (adding the force pass must not perturb the default render).
- **interaction-config-overrides-spring.** A field constructed with `warp config { response: 0.30 }`
  settles FASTER than the `0.55` default (the tokenised override reaches the integrator).

---

## §4 — PRM gating model (STATE it — the warp precedent + the state-reset edge)

The gravity-well follows the AX.W17 warp PRM precedent AND adds the ramped-force reset:

- **Listener-not-registered (the warp precedent).** The `gravityWell` event block is INSIDE
  `if (gravityWell && host && !handle.reducedMotion)` (mirroring `warpOnClick` at `Constellation.vue:246`):
  under reduce the held-timer is never added, so the well never arms.
- **State-reset on the PRM-true edge.** Because `useCanvas2D` live-monitors PRM and re-arms on un-reduce, a
  user toggling PRM mid-session mid-hold would otherwise freeze a half-ramped well ON. The render-hook guard
  (E2b) resets `field.well.{strength,target,x}` to neutral when `handle.reducedMotion` is true, so the
  parked static frame carries no pull (`H-proto-constellation-warp.md` PART D). This is the ramped-force
  case the wander (cadence-only, W-CON1) does NOT need.
- **Supernova (demo-only)** checks `matchMedia('(prefers-reduced-motion: reduce)')` before binding its
  detector in the demo overlay itself (it is not engine code).

---

## §5 — Risk ledger

1. **Stale-ledger churn (the #1 process risk).** The warp is SHIPPED + green (`proof:constellation-warp-live`).
   This wave VERIFIES it (captures a DELTA) and BUILDS the well + the token config + the ω doc reconcile —
   it does NOT re-author `warpStep`/`warpTo`/`nearestNode`/the spring/the PRM gate. Re-stamp the
   AUDIT-LEDGER row to DONE-AX.W17 + re-read HEAD before building (`H-proto-constellation-warp.md` E.6).
2. **Velocity heat-up (the cool-down).** The well ADDS to `p.vx/vy`; without renormalising to `speed` the
   field accelerates forever. Route through the existing `|v|→speed` renorm (or an ease-back); locked by
   the well-perturbs-then-cools unit case + the §6 π mean-|v|-returns readback.
3. **Off-canvas slingshot (the safety floors).** A 1/r² well with no `max(d,soften)` floor sends a
   co-located node to `∞`; a missing `maxSpeed` clamp lets nodes slingshot off-canvas. Both are MANDATORY,
   not optional; locked by the well-no-slingshot unit case + the §6 π no-node-leaves-canvas readback.
4. **Double-tap vs warp/ripple collision.** The supernova's first tap would also fire warp + ripple on a
   shared canvas (the `GlassDock.vue:452` known trap). RESOLVED by keeping supernova DEMO-ONLY on a
   DIFFERENT canvas with NO warp/ripple listener — the collision is structurally absent
   (`H-proto-constellation-warp.md` E.4).
5. **Hot-loop cost.** The well is an O(count) per-node pass (cheap at count=64; the well only iterates
   nodes within `reach`). Flock (CUT) would be a SECOND O(count²) pass — another reason it is cut
   (`H-proto-constellation-warp.md` E.1).
6. **`stepField` signature churn.** If W-CON1 already added `now`/`rng` params, W-CON2 reads the well off
   `field.well` (no new signature param needed — the well is field state, not a call arg). Verify against
   the in-repo callers (`Constellation.vue` + the unit suite) with `npm run typecheck` +
   `proof:constellation-field`. Coordinate the numeric-token cohort declaration with W-CON1 (declare the
   `--constellation-warp-*`/`-well-*`/`-wander-*` numeric cohort ONCE).
7. **W-GOD1 ordering.** The well + the config + the token-read LAND in `constellationField.ts` (currently
   510, at the cap) + `Constellation.vue`, moving the line count. AY.W-GOD1 carves AFTER W-CON1/2 (per AY §3
   Band E last) so it carves a settled target — noted so the carve does not race this content.
8. **Numeric-token gate false-positive.** `proof:constellation-tokens` clause (c) must tolerate numeric
   `--constellation-*` members (they pass trivially — no `light-dark(`, no var) and clause (b)'s FULL-set
   check must not demand the numeric tokens in the color set. Verify the gate stays green with the additive
   numeric cohort (`H-proto-constellation-warp.md` PART C caveat).
9. **WRITE-SCOPE OVERLAP with W-CON1 AND W-CON3 — SERIALIZE the constellation lane.** All three W-CON
   waves edit the SAME files: `constellationField.ts`, `Constellation.vue`, `tokens.css`
   (the `--constellation-*` numeric cohort), the unit suite `constellationField.test.ts`, and the demo
   story `demo/stories/substrates/constellation.vue`. This is the W-GLASS↔W-MOTION same-file class — the
   waves are NOT independent and CANNOT run in parallel (a wave is a set of tasks whose write scopes do
   NOT overlap — `TRANCHE-AND-WAVE-SPEC.md §Wave`). The lane SERIALIZES W-CON1 → W-CON2 → W-CON3 (the AY
   critical path, AY.md `:219`): W-CON1 lands the `stepField` `now`/`rng` signature + the numeric-token
   cohort START; W-CON2 ADDS the well/config/ω-reconcile on the settled engine + extends the numeric
   cohort; W-CON3 lands LAST, folding the `freeze` predicate into the render-loop guards W-CON1/2 also
   touch. The orchestrator does NOT dispatch them concurrently.

---

## §6 — HARD GATE (evidence-backed)

**Gate name:** `proof:live-verified-ledger` (the cardinal-lesson forcing function — the AY-path gate,
`scripts/proof-live-verified-ledger.mjs`, invoked `--tranche=AY` via `proof:live-verified-ledger:ay`
at `package.json:683`). The gate recognises the `W-CON2` named wave-id (`/^W(\d|-[A-Z])/` —
`proof-live-verified-ledger.mjs:88`) and RED's the `W-CON2` row when its STATUS cell is `live-verified`
(or allowlisted `complete`) unless a matching DELTA doc references a real on-disk PNG. **The exact
mechanics this gate enforces:** the DELTA doc lives at
`docs/tranches/AY/audit/visual/W-CON2-DELTA.md` (`deltaSatisfied:166`); it references ≥1 PNG of THIS
wave's OWN surface (basenames `^W-CON2-`, `ownSurfaceVerdict:135`), saved as
`W-CON2-<route>-<viewport>-<scheme>.png`, and the own-surface set carries a `…-light.png` AND a
`…-dark.png` (the ≥2-viewport × {light,dark} floor; `:147-152`); each PNG is a real ≥1024-byte `\x89PNG`
file (`isRealPng:104`). On a `complete` close the wave-id is added to
`docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`; `(DEVELOPED)` is gate-rejected; an unreachable
capture closes `live-pending`, never a `live-verified`/`complete` flip.

The runtime truth is produced by a NET-NEW π gate
`proof:constellation-egg-live` (script `scripts/proof-constellation-egg-live.mjs` + spec
`tests-visual/constellation-egg-live.spec.ts`, a byte-for-byte structural mirror of the shipped
`proof:constellation-warp-live` driver — a REAL device render + per-frame engine-state readback off the
demo `__constellationEgg`/`__constellationWarp` handles; it resolves the runner across both
`node_modules/.bin/playwright` layouts, parses the JSON report, exits NON-ZERO on any spec failure when
the π workspace is present, and SKIPs-with-exit-0 ONLY on genuine device-absence
(`proof-constellation-warp-live.mjs:30-45,80-95`); resolves the scene via
`resolveScene("substrates", "constellation")` (`tests-visual/pi-manifest.ts:57`) — do NOT edit
`PI_TARGETS` at `:70`). A new `proof:constellation-egg-live` script entry lands in `package.json` next
to `proof:constellation-warp-live` (`:644`).

The gate is GREEN only when ALL hold:

1. **WARP DELTA CAPTURED (the VERIFY, not re-build).** A fresh on-disk before→after `.png` of a LIVE click
   warp (the focal at field-centre → springs onto the nearest node along the eased path), captured off the
   `__constellationWarp` handle, registered in `AY/PROGRESS.md` under `AY/audit/visual/`. The shipped
   `proof:constellation-warp-live` stays GREEN (the warp is NOT re-authored — a regression on that gate
   FAILS this clause).

2. **WELL-PERTURBS-THEN-COOLS (the cool-down invariant, the cardinal-lesson DELTA).** Mount the
   `gravityWell` instance; sample mean node |v| at rest (≈`speed`); drive `holdWellAt(centre)`; sample mean
   |v| over the hold window (it RISES — the field is perturbed); `releaseWell()`; sample mean |v| over ≥ 30
   post-release frames; assert it RETURNS to within ±5% of the pre-hold mean (the field COOLS). The DELTA is
   the rest→held→cooled mean-|v| trace + paired screenshots, registered in `AY/PROGRESS.md`. A field that
   never renormalises (the heat-up regression) FAILS here.

3. **WELL-NO-SLINGSHOT (the safety floor, numeric).** Drive a MAX-strength well at canvas CENTRE (max
   `strength`, the largest `gain` a token allows); sample every node's `(x,y)` over the hold + 60 frames;
   assert NO node leaves `[0,w]×[0,h]` (the `max(d,soften)` floor + the `maxSpeed` clamp hold). A node at
   the well centre going to `∞` (a missing floor) FAILS here.

4. **PRM-SUPPRESSES-WELL + STATE-RESETS-ON-EDGE.** Re-run the well instance under
   `prefers-reduced-motion: reduce` (the Playwright media-emulation seam the substrate live-monitors); assert
   a hold gesture produces NO mean-|v| rise (the listener is not registered → the well never arms). THEN
   toggle PRM true MID-HOLD and assert `field.well.strength` reads 0 on the next parked frame (the
   state-reset-on-edge — no half-ramped well frozen on).

5. **SETTLE-TIME MATCHES THE KEYFRAMES.JS MODEL (the ω reconcile, numeric unit assertion).** The E5
   `warp-settle-matches-keyframes-model` cases pass: `warpStep` integrated from a known start crosses below
   2% of the initial gap at the frame `round(5.83·response/(2π)·60)` at ζ=1, and the settle frame SCALES
   with `response` across two `response` values (the token semantics are correct — `response` is the
   keyframes.js angular-period, NOT a fixed settle). (The CPU-oracle assertion the π gate cannot express.)

6. **EGG-SCOPE DECISION RECORDED (the ≥2-consumer bar — an affirmative presence proof + a deletion proof).**
   The AFFIRMATIVE half (the well SHIPS): `gravityWell` is present on the SFC `defineProps` block, the
   `ConstellationWell` interface + `field.well` member exist in `constellationField.ts`, the `stepField`
   force pass references `field.well`, and the well's perturb→cool behaviour is RUNTIME-PROVEN by clauses
   2/3 above (not a grep — the well actually fires + cools on the live engine). The DELETION half (the
   overfit refused): supernova exists ONLY in `demo/` (`grep -rinE 'supernova|nova' src/` → 0 hits at HEAD,
   verified — the demo overlay in `demo/stories/substrates/constellation.vue` is the sole site, and it
   calls the PUBLIC `field` expose, not an engine prop); konami-flock is NOT built anywhere
   (`grep -rinE 'konami|flock' src/ demo/` → 0 hits at HEAD, verified). The B.4 decision table is recorded
   in this wave spec (§2). The well's LIVE perturb→cool readback IS the affirmative artefact (the
   ≥2-consumer engine egg is real); the two zero-hit greps ARE the refusal proof for the two overfit eggs.

7. **NUMERIC TOKENS RESOLVE INTO THE ENGINE + `proof:constellation-tokens` GREEN.** Read the live warp/well
   config off the mounted engine (via the `__constellationEgg.field` config or a `readInteractionConfig`
   re-probe) and assert it equals the declared token values (`--constellation-warp-response` → 0.55±0.001,
   etc.). `npm run proof:constellation-tokens` stays GREEN with the additive numeric cohort (clause (c) does
   not false-positive on a numeric member; clause (b)'s color FULL-set is unbroken).

8. **DEFAULT-OFF BYTE-IDENTITY + UNIT FLOOR.** A `gravityWell`-absent, `warp`-default seeded field produces
   a first-N-frame node trace byte-identical to HEAD (the well/config seam must not perturb the default
   render). `npm run proof:constellation-field` passes (the E5 cases — well cools, no slingshot, default-off,
   config override, settle-model).

9. **DELTA REGISTERED + LEDGER GREEN.** `docs/tranches/AY/audit/visual/W-CON2-DELTA.md` exists and
   references the own-surface `W-CON2-warp-<viewport>-light.png` + `…-dark.png` (the clause-1 warp DELTA)
   AND `W-CON2-well-<viewport>-light.png` + `…-dark.png` (the clause-2 well perturb→cool DELTA) — all four
   real on-disk PNGs (the {light,dark} own-surface floor); the doc carries the rest→held→cooled mean-|v|
   trace NUMBERS + the no-slingshot bbox numbers. The `W-CON2` `AY/PROGRESS.md` row status flips
   `planned → live-verified` (or `complete` + add `W-CON2` to `VISUAL-ALLOWLIST.json`); `npm run
   proof:live-verified-ledger:ay` passes; the AUDIT-LEDGER warp row is re-stamped DONE-AX.W17.

**Born-RED at HEAD:** `field.well` / the gravity-well force / the `gravityWell` prop do not exist (clauses
2/3/4 cannot run — no well to drive); the numeric interaction tokens do not exist and `warpStep` reads
module consts (clause 7 cannot resolve a tokenised config); the `proof:constellation-egg-live` script + spec
do not exist (must be authored); the `warp-settle-matches-keyframes-model` unit cases do not exist (clause 5
REDs); the `AY/PROGRESS.md` DELTA row is absent (clause 9 REDs). The wave is complete only when all nine
verify GREEN with both DELTAs on disk.

---

## §7 — Cross-references

- Hardening findings: `AY/audit/hardening/H-proto-constellation-warp.md` (PART A.2 — the ω reconcile; PART
  B.1-B.4 — the eggs + the scope decision; PART C — the token surface; PART D — the PRM model; PART E — the
  risk ledger + the egg π gate), `AY/audit/hardening/H-constellation.md` (FINDING 3 — the unbuilt eggs +
  the ≥2-consumer bar), `AY/audit/hardening/H-precept-drift.md` (F1 — the warp is shipped, the ledger is
  stale; the easing keeps must stay UNDISTURBED — no bespoke spring minted).
- Sibling waves: AY.W-CON1 (the `refitField` + the auto-drift `wander` source + the `--constellation-alpha`
  tune — lands the `stepField` `now`/`rng` thread + the numeric-token cohort start; W-CON2 ADDS the well
  force + the spring config + the ω reconcile ON the same engine), AY.W-CON3 (the `?freeze`
  deterministic-capture seam + anomaly props — slides pre-reqs), AY.W-GOD1 (the `constellationField.ts`
  carve — runs AFTER this content), AY.W-DOC1 (README provenance strip + the supernova demo doubles as the
  README example).
- Downstream: L.W-ADOPT (slides DELETEs `constellation.ts`, consumes `@mkbabb/glass-ui/constellation` — the
  cover wants the gravity-well + the tokenised spring; depends on this wave + W-PUB1 publish + a slides
  semver bump).
- Precepts: `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (artefact-backed, not grep);
  the ≥2-consumer bar (J inv 10 / L inv 8 — the egg-scope decision); the "fix at the ROOT" precept (the
  field-coherent interaction transposed UP as ONE prop); the cardinal-lesson DELTA
  (`proof:live-verified-ledger`); the keyframes.js `(response, dampingFraction)` spring model
  (`scripts/regen-spring-tokens.mjs`, `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:860-882`) — the
  ω-derivation reconcile keeps THIS model, mints no second spring.
```
