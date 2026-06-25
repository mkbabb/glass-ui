# BD.W-AUR-INTERACT — the aurora cursor-swirl interaction, composing the shipped pointer field + W-VIZ-KEYBOARD DIRECTLY (no cut facade)

**Band 13 (V per-viz) · depends: W-VIZ-KEYBOARD (the `useVizKeyboard` leaf — the ONE genuine new framework wave).** It composes `useVizKeyboard` (`/keyboard`) + the SHIPPED `usePointerVelocityField` (`/motion-core`, 9 consumers) DIRECTLY — NEVER through the CUT `useVizInteraction` / `W-VIZ-INTERACTION-SPINE` facade (`interactivity-config.md §0` cut it as a re-fork-in-disguise; `EXECUTION-DAG.md:152` `W-AUR-INTERACT ← W-VIZ-KEYBOARD`). This is THE ONE CLEAN aurora interaction wave (`passd-aurora.md §5` — "the ONE place the spec is BETTER than its critique feared"): the cursor swirl is a REAL domain-warp present on BOTH backends, byte-faithful (`aurora.frag.ts:300-318` ≡ `aurora.wgsl.ts:187-201`).

> **Status:** SPEC (tranche-dev — this file is the PLAN; the `src/` + demo edit is the gated build). Grounded against HEAD `aurora.frag.ts:300-318` + `aurora.wgsl.ts:187-201` (the cursor-swirl domain-warp, byte-faithful both backends), `useAurora.ts:48-54,242,359-361` (the `setCursor`/`setCursorRadius`/`setVelocity` API), `usePointerVelocityField.ts:1-47` (the shipped pointer-dynamics field — position/velocity/acceleration/burst, `tick(delta)` push-API, PRM `tick(0)` freeze), `Aurora.vue:169-171` (the exposed setCursor seam), `interactivity-config.md §0-1` (the cut facade), `passd-aurora.md §5`.

## The defect / the ask

The 7 viz dirs ship ZERO keyboard handlers (`passd-aurora.md` — "0 viz keyboard at HEAD"; the NECESSITY is REAL). Aurora's cursor swirl (the field warps + bands sweep around the pointer) IS a real spatial interaction on both backends — but it is wired only as a raw `setCursor(x,y)` the demo stage calls from a pointermove listener (`useAurora.ts` comment "the aurora demo wires this from its stage pointermove listener"). It is NOT velocity-reactive in a unified way (the `setVelocity` flick-feed is a separate AW.W8.1 path), and there is NO keyboard interaction (pan the swirl, nudge the field, toggle interactivity from the keyboard — the a11y + the non-pointer-device gap).

The ask: a coherent aurora interaction that COMPOSES the two shipped/new primitives — `usePointerVelocityField` (the shared pointer-dynamics field, 9 consumers) for the pointer half, `useVizKeyboard` (the new framework wave) for the keyboard half — driving the EXISTING cursor-swirl domain-warp. NEVER a new aurora-local interaction wrapper (that is the disease the `interactivity-config.md §0` facade cut).

## The mechanism — compose, never fork

### 1. The pointer half — drive the EXISTING cursor swirl off `usePointerVelocityField`

The cursor swirl ALREADY exists and is byte-faithful across both backends:
- **GLSL** (`aurora.frag.ts:302-318`): `if (uCursorStrength > 0.001)` rotates `p` around `uCursor` with a Gaussian radial falloff (`exp(-d²/(r²·0.45))`), a max ~120° rotation scaled by `uCursorStrength`, plus a gravity pinch toward the cursor.
- **WGSL** (`aurora.wgsl.ts:189-201`): the byte-faithful twin (verified — the rare config where WGSL does NOT degrade).

This wave WIRES `usePointerVelocityField` (the SHIPPED leaf) to drive the swirl's THREE inputs coherently, replacing the demo's raw `setCursor` paste:
- `field.smoothedPosition` → `setCursor(x, y, strength)` — the swirl center follows the smoothed pointer (the `positionLerp` snappy ease the field already owns, NOT a raw jittery pointer).
- `field.velocity` magnitude → modulates `uCursorStrength` (a fast sweep swirls harder; a still pointer relaxes the swirl) — the velocity-reactive swirl the AW.W8.1 `setVelocity` path hinted at, now UNIFIED through the ONE field (no second velocity path).
- `field.burst` (the flick impulse the field decays) → a transient swirl-strength spike on a fast flick (the field's `burst` term IS the swirl-impulse — `usePointerVelocityField.ts:25` "the swirl-impulse term"). The aurora is the field's natural consumer of its own `burst`.
- `field.acceleration` → optionally modulates `setCursorRadius` (a sharp accel tightens the swirl radius — the field's accel term gets a real consumer).

The field is FED by aurora's existing frame loop via `tick(delta)` (the one-loop discipline — `usePointerVelocityField` owns NO own rAF; aurora's `createCanvasLifecycle` frame callback calls `field.tick(delta)`, the `proof:offscreen-pause` discipline preserved). PRM rides the field's `tick(0)` freeze (the swirl snaps to rest, no live velocity — the field's deterministic PRM gate, NOT a new aurora PRM path).

### 2. The keyboard half — `useVizKeyboard` with an aurora DATA keymap

`useVizKeyboard` (W-VIZ-KEYBOARD, `/keyboard`) is composed DIRECTLY with an aurora-SPECIFIC data keymap (NOT a generic keymap projected — `passd-aurora.md` / the roster's "per-viz DATA keymap, NOT an aurora keymap projected"; each viz authors its OWN focal-axis keymap). The aurora keymap:
- **Arrow keys** → pan the swirl center (`setCursor` stepped by a keymap delta — the keyboard-driven swirl, the non-pointer-device path; the swirl center moves a step per keypress with the SAME `uCursorStrength` envelope a pointer would carry).
- **`[` / `]`** → adjust `setCursorRadius` (tighten/widen the swirl).
- **`Space`** → toggle interactivity ON/OFF (`uCursorStrength` to 0 → the field relaxes to the non-interactive smooth aurora).
- **`+` / `-`** → step the swirl strength.

The keymap is aurora's FOCAL axes (the cursor swirl is aurora's interaction protagonist — unlike concentric, which `passd-aurora.md §W-VIZ-KEYBOARD` notes has no focal axis, all global scalars). The keymap DATA lives in the aurora dir (`constants/` or the SFC), composed by the SHARED `useVizKeyboard` engine — the engine is ONE, the keymap is per-viz.

### 3. The composition fence — DIRECTLY, never the cut facade

`W-AUR-INTERACT` composes `usePointerVelocityField` + `useVizKeyboard` DIRECTLY in the aurora SFC / a thin aurora-local `useAuroraInteraction` glue that is a COMPOSE-only shell (it wires the two shipped primitives to the existing `setCursor`/`setCursorRadius` API — it owns NO own rAF, NO own velocity sampler, NO own keyboard handler, NO `role="img"`+`v-bind` bag). If the glue grows into a re-forked interaction wrapper (a second pointer sampler, a parallel keyboard registry), it IS the `interactivity-config.md §0` disease the facade cut — FORBIDDEN. The `usePointerVelocityField` is the pointer source-of-truth (the 10th consumer); `useVizKeyboard` is the keyboard source-of-truth.

### 4. The cursor swirl is BYTE-UNTOUCHED in the shader

This wave wires the DRIVERS; the cursor-swirl domain-warp shader code (`aurora.frag.ts:300-318` + `aurora.wgsl.ts:187-201`) is BYTE-UNTOUCHED (the §7 shader fence — interaction is JS wiring, not a shader edit). The parity of the swirl is ALREADY proven (byte-faithful both backends, `passd-aurora.md §5`); this wave adds no shader divergence, so it carries no new parity-ΔE burden — its gate is the WIRING (composes-not-forks), not a numeric parity (there is no new shader math).

## The gate — proof:aur-interact (born-RED → GREEN)

`scripts/proof-aur-interact.mjs`, `tags: ["local","ci"]`. This wave's gate is the COMPOSE-NOT-FORK discipline (it adds no shader math, so it carries no parity-ΔE clause — distinct from the metal/satin/prism waves; its integrity is the no-second-engine fence).

- **I1 — composes the SHIPPED pointer field, no fork.** The aurora interaction imports `usePointerVelocityField` from `/motion-core` and FEEDS it via `tick(delta)` from aurora's existing frame loop. A second pointer-velocity sampler (a hand-rolled `prevX/prevY` delta + a private rAF) in the aurora dir REDs (the one-loop / no-second-sampler fence — the `usePointerVelocityField` is the 10th-consumer source-of-truth). The gate scans the aurora interaction code for the import + the absence of a forked velocity loop.
- **I2 — composes `useVizKeyboard` DIRECTLY, no cut facade.** The aurora interaction imports `useVizKeyboard` (the W-VIZ-KEYBOARD leaf) + an aurora DATA keymap; it does NOT import / re-introduce `useVizInteraction` (the cut facade — a `useVizInteraction` import REDs; the `interactivity-config.md §0` cut made structural). The gate scans for `useVizKeyboard` + the absence of the cut facade.
- **I3 — the swirl drivers are wired (the three pointer inputs + the keymap).** The field's `smoothedPosition` → `setCursor`, `velocity` → `uCursorStrength` modulation, `burst` → the flick spike are wired (the gate asserts each `field.{smoothedPosition,velocity,burst}` read reaches a `setCursor`/`setCursorRadius`/strength write); the keymap covers the aurora focal axes (arrows/radius/toggle/strength). A wired-pointer-but-dead-keyboard (or vice-versa) REDs.
- **I4 — PRM rides the field's freeze + the one-loop.** PRM is the field's `tick(0)` freeze (the gate asserts NO aurora-local PRM matchMedia for the interaction — it reuses the field's deterministic freeze; the `usePointerVelocityField.ts:30` PRM gate is the source-of-truth). The `tick(delta)` is called from aurora's EXISTING frame callback (no new rAF).
- **I5 — the shader is byte-untouched.** The cursor-swirl domain-warp (`aurora.frag.ts:300-318` + `aurora.wgsl.ts:187-201`) is byte-identical to the pre-wave tree (a structural diff assert over the swirl region — this wave wires drivers, not shader math; the §7 shader fence). No new uniform lane, no new shader divergence.

**Self-test bites (each planted defect MUST red):** (a) a hand-rolled `prevX/prevY` velocity sampler in the aurora dir → I1 RED (the fork bite); (b) a `useVizInteraction` import → I2 RED (the cut-facade bite); (c) a dead keymap (no `useVizKeyboard` keydown reaching a swirl write) → I3 RED; (d) an aurora-local interaction PRM matchMedia (a second PRM path) → I4 RED; (e) a shader edit to the swirl region → I5 RED (the byte-untouched bite); (f) the faithful composition → all GREEN.

**What reds on the pre-wave tree:** I1 (no pointer field wired — the demo pastes raw `setCursor`), I2 (no `useVizKeyboard` — 0 viz keyboard at HEAD), I3 (no unified swirl drivers + no keymap) — born-RED by construction; GREEN only after the field-wire + the keymap + the keyboard compose land.

## The binding "π" — the swirl FOLLOWS the pointer AND the keyboard, both backends, both modes

`tests-visual/aur-interact.spec.ts` (LOCAL-only real-GPU, rides W-REFLECT3). The binding gestalt: a `<Aurora>` interactive surface — (1) the field's bands SWEEP around the pointer (a pointer-move shows the swirl center tracking, the bands rotating — the cursor-swirl domain-warp's defining read, the `passd-aurora.md §5` confirmed substrate); (2) a FAST flick produces a STRONGER transient swirl (the `field.burst` spike — a slow drag swirls gently, a flick harder, the velocity-reactive read); (3) the KEYBOARD pans the swirl (an arrow-key sequence shows the swirl center stepping — the non-pointer-device path; `Space` toggles it OFF → the field relaxes smooth); (4) PRM → the swirl FUNCTIONS but FREEZES at rest (the field's `tick(0)` — the interaction confirms, the live velocity off; the vestibular floor); (5) BOTH backends (the swirl is byte-faithful WGSL/GLSL — the rare no-degrade config); (6) both modes. The `proof:ba-gestalt` aurora + navigation verdicts gain the interaction row (it is aurora's interaction protagonist + a keyboard-a11y improvement).

## Fences

- **COMPOSE, never fork.** `usePointerVelocityField` (the shipped pointer source-of-truth, the 10th consumer) + `useVizKeyboard` (the keyboard source-of-truth) DIRECTLY — no second velocity sampler, no `useVizInteraction` cut facade, no aurora-local interaction engine (I1/I2 — the `interactivity-config.md §0` disease closed).
- **The one-loop discipline.** The field is FED via `tick(delta)` from aurora's EXISTING frame loop — it owns no own rAF (`proof:offscreen-pause` preserved; I4).
- **PRM is the field's freeze, ONE source.** The interaction reuses `usePointerVelocityField`'s `tick(0)` deterministic freeze — no second PRM path (I4).
- **The shader is byte-untouched.** This wave wires drivers; the cursor-swirl domain-warp is byte-identical (I5 — the §7 shader fence). No new uniform lane, no parity burden (the swirl parity is ALREADY proven byte-faithful — distinct from the metal/satin/prism waves which ADD shader math and so carry a numeric-ΔE gate).
- **Per-viz DATA keymap, not a projected one.** The aurora keymap is aurora's focal axes (the swirl), composed by the SHARED `useVizKeyboard` engine — the engine is ONE, the keymap is per-viz (the roster's "per-viz DATA keymap, NOT an aurora keymap projected").

## Disposition links

- **`UNIFIED-ROSTER.md:170` (W-AUR-INTERACT — composes W-VIZ-KEYBOARD + the shipped pointer field)** → BUILT (the spec; the build user-gated).
- **`EXECUTION-DAG.md:152` (W-AUR-INTERACT ← W-VIZ-KEYBOARD)** → CLOSED.
- **`critique/passd-aurora.md §5` (the ONE clean aurora wave — the cursor swirl is a real domain-warp both backends; compose the shipped field + keyboard DIRECTLY, never the cut facade)** → the whole wave IS this finding's build. CLOSED.
- **`critique/interactivity-config.md §0` (the `useVizInteraction` / `W-VIZ-INTERACTION-SPINE` cut — a re-fork-in-disguise facade)** → I2 makes the cut structural (a facade import REDs). CLOSED.
- **`PASSD-FOLD.md §Per-viz amendments (batch A) — W-AUR-INTERACT` (compose the shipped pointer field + keyboard DIRECTLY, never the cut `useVizInteraction`)** → I1/I2. CLOSED.
- **DEPENDS: `W-VIZ-KEYBOARD`** (the `useVizKeyboard` leaf — the ONE genuine new framework wave; `W-VIZ-INTERACTION-SPINE` CUT, each viz composes directly). The Band-12 prerequisite edge. CONSUMES the SHIPPED `usePointerVelocityField` (no dependency — already on `/motion-core`, 9 consumers; this is the 10th).
