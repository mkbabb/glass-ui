# AU — keyframes.js coordination spec (the dock-motion seam contract)

**Scope.** DOCS-only. This file is the binding coordination contract for the glass-ui ↔ keyframes.js
seam that AU.W8 (dock-motion overhaul, `AU-AUGMENT.md §2`) rides on. It names the EXACT LIGHT
(value.js-free) import surface glass-ui consumes, the peer pin, the build-time author role of
`regen-spring-tokens.mjs`, the READ-ONLY-upstream constraint, the D.W5 name-forward edge, and the
value.js-free boundary proof. No `src/` edit lands from this document; it is the seam law W8/W8b
execute against.

**Provenance.** Authored from a 6-workflow read-only assay (the keyframes.js D/E tranche review,
the dock-driver API catalog, the spring-surface review, and the glass-ui↔keyframes.js seam review).
Every claim carries a `file:line` traceable to source.

**Inherited precepts.** No legacy / no backwards-compat shims; gestalt transposition over patch;
KISS (one solver, one rAF loop, zero steady-state alloc); the dock driver stays **value.js-free**;
isomorphic styling (the morph curve is a CSS token, the runtime driver consumes the SAME solver).

---

## §1 — The seam, one paragraph

keyframes.js is a **pure upstream supplier** of the animation substrate. glass-ui consumes its
**LIGHT (value.js-free) surface** in two roles: (a) at BUILD time, `scripts/regen-spring-tokens.mjs`
calls `springLinearStops()` to bake the four `--spring-*` CSS `linear()` tokens
(`src/styles/tokens.css:158-161`); (b) at RUNTIME, the dock's FLIP-fallback driver (AU.W8 move B)
instantiates `SpringProgress` and drives it off its own rAF loop, so width + opacity advance off ONE
solver and settle within ±1 frame. **No keyframes.js change is required** for either role — both APIs
are published and stable in keyframes.js `3.0.0` (current npm). The seam is one-way: parameters flow
OUTWARD from glass-ui (`regen-spring-tokens.mjs` PRESETS) into the solver, and curves/state flow back
IN (CSS tokens at build, `value`/`velocity` at runtime). Nothing flows from glass-ui back into
keyframes.js source.

---

## §2 — The LIGHT (value.js-free) import surface glass-ui consumes

The keyframes.js barrel (`keyframes.js/src/animation/index.ts:1-138`) splits its exports into a
**LIGHT (static, value.js-free)** half and a **HEAVY (dynamic, value.js-bearing)** half. The contract
docstring (`index.ts:5-22`) is authoritative: LIGHT engines "read their handful of leaf helpers
(rAF + clamp/lerp/scale) from `./internal/leaves`, and accept easing as a callable `TimingFunction`
rather than resolving string names through value.js's registry. A consumer that imports only these
never pulls value.js into its graph."

### 2.1 The exact symbols glass-ui is permitted to import (LIGHT, runtime values)

| symbol | kind | source | role in the dock seam |
|---|---|---|---|
| `SpringProgress` | class (runtime) | `index.ts:34` → `spring.ts:82` | **the dock runtime driver.** Analytic 2nd-order ODE solver; `.target` setter re-seats the closed-form solution from current `(x,v)` (`spring.ts:158`, no jump on re-target); `.play(onFrame)` arms its own `RAFPlayback` loop (`spring.ts` play wiring); `.subscribe(cb)` mirrors every emission; `.value`/`.velocity`/`.settled` getters; `.snap()`/`.dispose()` lifecycle. |
| `springLinearStops` | fn (runtime) | `index.ts:40` → `springLinearStops.ts:46` | **the build-time token emitter.** Samples `SpringProgress(target=1,initial=0)` → CSS `linear()` string. Called ONLY by `regen-spring-tokens.mjs` (§4). |
| `springTimingFunction` | fn (runtime) | `index.ts:42` → `springTimingFunction.ts:65` | available JS-easing twin `{ fn, css }`; NOT required by the dock driver (SpringProgress IS the easing). Listed for completeness — do not introduce unless a NumericAnimation-driven path is chosen over the direct solver. |
| `ElementMorph` | class (runtime) | `index.ts:44` → `morph.ts:40` | stateless position+scale sampler (`.at(progress)` / `.toCSSTransform(progress)`). OPTIONAL — needed only IF dock items morph in position/size; width+opacity-only does NOT need it. |
| `Timeline` | class (runtime) | `index.ts:46` → `timeline.ts` | frame-list carrier / rAF loop driver. OPTIONAL — not required for the single-spring width+opacity driver. |
| `RAFPlayback` | class (runtime) | `index.ts:48` → `playback.ts:61` | the generation-guarded rAF owner. The dock driver gets this transitively via `SpringProgress.play()` — it does NOT need to instantiate `RAFPlayback` directly. |
| `toEasing` | fn (runtime) | `index.ts:53` → `easing.ts` | sync, value.js-free easing normalizer. Not needed for the spring path (no string-name resolution). |

### 2.2 Type-only imports (erased, zero runtime edge)

`import type` is stripped under `verbatimModuleSyntax`, so these cost no edge even where they
re-export from value.js-bearing modules (`index.ts:24-26`, `:56-79`):

- `SpringProgressOptions`, `SpringSubscriber`, `SpringFrameCallback` (`index.ts:35-39`)
- `SpringLinearStopsOptions` (`index.ts:41`)
- `MorphRect`, `ElementMorphOptions` (`index.ts:45`)
- `TimingFunction`, `Easing`, `Tickable` (`index.ts:49`, `:61-73`) — only if a custom stepper is annotated.

### 2.3 CRITICAL CORRECTION — `AnimationGroup` is HEAVY, NOT LIGHT

`AU-AUGMENT.md §2.2(B)` and several review digests describe the runtime driver as the keyframes.js
**`AnimationGroup` one-rAF driver, "LIGHT surface only."** **This is wrong and MUST NOT be
implemented as written.** The barrel proves `AnimationGroup` is on the **HEAVY** side:

- `index.ts:79` exports `AnimationGroup` as a **type only** (`export type { ... AnimationGroup }`).
- `index.ts:82` re-imports it `import type` from `./engine`.
- `index.ts:103` lists `AnimationGroup` in the `AnimationEngine` interface, reachable ONLY via
  `loadAnimationEngine()` (`index.ts:137-138`) — an `await import("./engine")` that **pulls value.js**
  (`./engine` imports `@mkbabb/value.js`, `index.ts:90`).

Importing the `AnimationGroup` **runtime constructor** therefore drags value.js into the dock bundle
and **violates the value.js-free guarantee** (`proof:vueuse-free-root` sibling discipline,
`AU-AUGMENT.md §2.2`). The seam-review openQuestion flagged exactly this
(`seam review §open-question-animationgroup-driver`).

**Resolution (no keyframes.js change needed).** The dock does not need `AnimationGroup` at all. The
"width + opacity off ONE rAF loop on ONE solver" requirement is met by **`SpringProgress` directly**:
one `SpringProgress` instance owns its rAF loop via `.play(onFrame)`; the single `onFrame`/`subscribe`
callback maps the one `value ∈ [0,1]` to BOTH width-px and opacity in the SAME frame. This is exactly
the pattern the SHIPPED `useSpring` composable already uses
(`src/composables/motion/useSpring.ts:105-136` — construct `SpringProgress`, `subscribe` the refs,
`play(noop)` to arm the loop, set `.target` on the watch). The dock driver is a sibling of that
composable, not a new keyframes surface.

> **W8 directive:** drive the FLIP-fallback morph with **`SpringProgress` + `.play(onFrame)`**
> (the LIGHT path), NOT `AnimationGroup`. Treat any `AnimationGroup` mention in `AU-AUGMENT.md §2.2`
> as superseded by this clause. `ElementMorph`/`Timeline` remain available LIGHT fallbacks if a
> position/scale morph is later wanted, but the width+opacity case needs neither.

### 2.4 The boundary glass-ui MUST NOT cross (HEAVY, forbidden in the dock graph)

Reachable only via `loadAnimationEngine()` (`index.ts:137`); each pulls value.js. **Forbidden in the
dock driver and in any module the dock subpath statically reaches:**

`loadAnimationEngine`, `Animation`, `CSSKeyframesAnimation`, `AnimationGroup` (runtime),
`getTimingFunction`, `resolveKeyframes`, `defaultOptions`, `defaultLayerConfig`, `resolveEasing`
(async string-name resolver — crosses the engine boundary), `.fromString()` (the CSS parser entry).

---

## §3 — The peer version pin

`package.json` (glass-ui) pins keyframes.js as an **optional peer** with a wide v2‖v3 range:

- `peerDependencies["@mkbabb/keyframes.js"]: "^2.2.0 || ^3.0.0"` (`package.json:584`)
- `peerDependenciesMeta["@mkbabb/keyframes.js"].optional` (`package.json:603-605`)
- `devDependencies["@mkbabb/keyframes.js"]: "^2.2.0"` (`package.json:615`)
- current npm `@mkbabb/keyframes.js` version: **`3.0.0`** (`keyframes.js/package.json`).

**W8 pin disposition: KEEP `^2.2.0 || ^3.0.0` — do not narrow.** The LIGHT surface
(`SpringProgress`, `springLinearStops`, `ElementMorph`, `Timeline`, `RAFPlayback`, `toEasing`) is the
stable contract across both v2.2 and v3.0 families; the dock driver touches none of the HEAVY
internals that the keyframes D-tranche transposition reshaped (the `tick`→`advanceTo` rename, the
`Animation` god-object split at the FrameCompiler seam — all HEAVY-side, `keyframes.js D.W4`). The
wide range accommodates the D-tranche major bump without a glass-ui pin edit.

**Action for W8b only (optional, non-blocking):** bump the `devDependencies` entry from `^2.2.0` to
`^2.2.0 || ^3.0.0` so the dev install resolves the same family the regen script will run against in
CI. This is a hygiene alignment, not a contract change — the peer range already permits v3.

---

## §4 — The `regen-spring-tokens.mjs` build-time author role

`scripts/regen-spring-tokens.mjs` is the **single source of truth** for the four `--spring-*` CSS
tokens. It imports `springLinearStops` from the keyframes.js LIGHT surface
(`regen-spring-tokens.mjs:18`), solves the `(response, ζ)` PRESETS table (`:30-55`) at
`SAMPLE_COUNT=48` (`:73`), and idempotently rewrites the §2 EASING block in `tokens.css`
(`:87-109`). Tokens are NEVER hand-edited; changes flow only through this script
(`tokens.css:136-138` docstring).

### 4.1 W8 action — author `--spring-dock` via the SAME solver

`AU-AUGMENT.md §2.3` mandates a dedicated `--spring-dock` (~15–30% overshoot, ζ≈0.5) to replace the
current `--spring-snappy` ride on `--dock-resize-spring` (`tokens.css:1266`). The spring-surface
review computes the candidate `(0.5, 0.5)` analytic peak at **≈1.185 (~18.5% overshoot)** — between
`snappy` (+6.8%) and `bouncy` (+20.5%) — landing inside the brief.

**Exact edit (W8, glass-ui-owned, no keyframes change):**

1. Add ONE row to the `PRESETS` table in `regen-spring-tokens.mjs:30-55`:
   ```js
   {
       name: "dock",
       response: 0.5,
       dampingFraction: 0.5,
       comment: "dock resize morph — iOS-springy, overshoot ~+18.5%",
   },
   ```
2. Extend the marker regex `SPRING_LINES_RE` (`regen-spring-tokens.mjs:89-90`) to include `dock` in
   the alternation: `--spring-(?:smooth|snappy|bouncy|gentle|dock)`. The replacement block already
   emits one line per PRESETS entry (`:75-85`), so the new `--spring-dock` line is appended
   automatically — but the in-place replace regex must match the existing block AND accept the new
   line on the second run for idempotency. Verify: run the script twice, assert the second run is a
   no-op diff.
3. Run `node scripts/regen-spring-tokens.mjs`; the `--spring-dock: linear(...)` token is emitted into
   `tokens.css` §2 EASING block (`tokens.css:158-161` neighborhood).
4. Re-route the alias: `tokens.css:1266` `--dock-resize-spring: var(--spring-snappy)` →
   `--dock-resize-spring: var(--spring-dock)`. CSS-only, isomorphic (same duration; only the curve
   shape changes). No JS is aware of the token name.

**Constraints (load-bearing):**
- **Do NOT touch `--dock-press-spring`** (`tokens.css:1275` = `var(--duration-fast) var(--spring-bouncy)`).
  It is the transform-only press-feedback family; it must NEVER fold into the resize family
  (`AU-AUGMENT.md §2.3`, §6 risk).
- The four existing PRESETS names (`smooth`/`snappy`/`bouncy`/`gentle`) MUST stay stable — external
  consumers (speedtest) reach `var(--spring-*)` directly (`regen-spring-tokens.mjs:26-28`). Adding
  `dock` is additive; renaming any existing name is forbidden.
- `SAMPLE_COUNT=48` is correct for the ζ≈0.5 peak fidelity (the 24-sample grid clips a sharp first
  peak by ~2pp, `regen-spring-tokens.mjs:57-72`). Keep 48.

### 4.2 The build-time / runtime bit-identity invariant

The morph curve is authored at build (CSS `--spring-dock` via `springLinearStops`) AND the runtime
driver (W8 move B) integrates the SAME `SpringProgress(response:0.5, dampingFraction:0.5)` solver.
Because both paths sample the one analytic ODE, the CSS-token motion and the JS-driven motion are
**bit-identical** for the same `(response, ζ)`. The runtime `SpringProgress` params MUST be sourced
from the SAME `(0.5, 0.5)` pair that the PRESETS `dock` row carries — keep them in one place. The
`proof:dock-motion-parity` static gate (`scripts/gates.mjs:43`) must continue to see both engines on
one source.

---

## §5 — READ-ONLY-upstream constraint (inv-16)

keyframes.js is **READ-ONLY upstream** for the entire dock overhaul (`AU-AUGMENT.md §6`; inv-16). The
seam is one-way and requires **zero keyframes.js source change**:

- The spring solver, `springLinearStops`, `springTimingFunction`, `ElementMorph`, `Timeline`,
  `RAFPlayback` are ALL consumed via the published npm surface. The LIGHT surface is complete and
  published in keyframes.js `3.0.0`.
- The user-reported pain (dock not springy; "shrinks before the elements fade") traces to a
  **glass-ui-owned** timing-origin fork in `src/components/custom/dock/composables/useLayerTransition.ts:140-170`
  (class-swap synchronous at `:146-147`, width-set deferred through `nextTick` `:150` + `rAF`
  `:167-169` — opacity runs ~one frame ahead). This is a glass-ui FLIP-architecture seam, not a
  keyframes.js defect. The fix is glass-ui's to author (move the `leavingLayer`/`currentLayer`
  mutations INTO the rAF callback so class-apply and width-set start in one frame; then optionally
  bind the SpringProgress driver around it).
- No keyframes.js API-level change is required or planned. The keyframes D.W4 engine transposition
  touches only HEAVY-side internals and the `advanceTo` canonicalization — the LIGHT public surface
  the dock consumes is unchanged.

**Disposition:** the dock-motion fix lands ENTIRELY in glass-ui. keyframes.js stays untouched.

---

## §6 — D.W5 name-forward edge (the `<Role>Dock` convergence)

keyframes.js Tranche **D.W5** is the downstream consumer of the glass-ui dock; it is gated on
glass-ui **publishing 3.3.0**, not on a branch pin (`keyframes.js D.W5`; `seam review KF-up5`).

- **Direction.** glass-ui PUBLISHES 3.3.0 (the AU.W8 dock-correctness base + the touch-gate B′ fix
  `f0b0ffb`) → keyframes.js D.W5 moves its glass-ui pin from `file:../glass-ui` to `^3.3.0` and
  consumes the published dock primitives. One-way, consuming-not-branches.
- **Shared vocabulary (the name-forward ask).** D.W5 adopts the canonical `<Role>Dock`
  role-vocabulary that AU.W8 ships as a DOCS convention: local renames `TopDock → ChromeDock`,
  `AnimationMenuBar → TransportDock` (`AU-AUGMENT.md §3 W8 row item 6`; `keyframes.js D.W5`). Both
  glass-ui's demo and keyframes' demo compose the SAME published glass-ui dock primitives
  (`GlassDock` + `DockLayer`/`DockLayerGroup`/`DockIconButton`/`DockSelectTrigger` shipping in 3.3.0)
  — the renames are name-changes over published primitives, NOT a shell extraction.
- **The base component is BOOK, not shipped.** There is **no** glass-ui `<Role>Dock` base component
  yet. A role-typed base is a named cross-session edge, BOOK until a **2nd consumer** appears;
  keyframes (D.W5) is the anticipated 2nd consumer (`AU-AUGMENT.md §3.1`; `seam review KF-up9`). AU.W8
  ships ONLY the docs vocabulary (`README.md` + `proof:dock-vocabulary` gate, already authored and
  untracked at `scripts/proof-dock-vocabulary.mjs` + `src/components/custom/dock/README.md`) — the
  manifest registration is the only W8 step (`AU-AUGMENT.md §6.1`).

**What glass-ui owes the name-forward:** ship the README role-vocabulary + register
`proof:dock-vocabulary` in `scripts/gates.mjs` at W8, and PUBLISH 3.3.0. Nothing else crosses the
seam. keyframes D.W5 self-resumes (heartbeat `b5gt704vz`) when 3.3.0 lands on npm.

---

## §7 — The value.js-free boundary proof

The guarantee: **the dock driver's keyframes consumption introduces ZERO value.js into the bundle.**
Proof has three legs, all already standing:

1. **Static-boundary leg (keyframes side).** keyframes.js `proof:boundary` asserts every LIGHT module
   carries zero static edge to value.js and zero edge to `./engine` (`keyframes.js` D/E gate, widened
   to all LIGHT entries). So importing `SpringProgress` / `springLinearStops` / `ElementMorph` /
   `Timeline` / `RAFPlayback` / `toEasing` cannot transitively reach value.js. The HEAVY surface is
   reachable ONLY through `loadAnimationEngine()`'s `await import("./engine")`
   (`index.ts:137-138`) — which the dock driver MUST NOT call (§2.4).

2. **Root-barrel leg (glass-ui side).** `scripts/proof-vueuse-free-root.mjs` walks the transitive
   import graph from `src/index.ts` and asserts no reachable module imports `@vueuse/core` OR pulls
   the keyframes HEAVY engine. The keyframes-bearing motion composables (`useSpring`,
   `useAnimatedNumber`, `useNumericTransition`) live on the `/motion` subpath and are EXCLUDED from
   the root barrel (`AU-AUGMENT.md §0`; seam review `value-js-free-boundary`). The dock is likewise
   NOT on the root barrel — it ships only on `@mkbabb/glass-ui/dock`.

3. **Dock-graph leg (the new assertion W8 must hold).** The dock composables today import ZERO
   keyframes symbols (`src/components/custom/dock/composables/*.ts` — `useLayerTransition`,
   `useDockState`, `dockContext`, etc. import only Vue primitives + the local
   `useViewTransition`; `useLayerTransition.ts:1-3`). W8 move B adds a SINGLE LIGHT import —
   `import { SpringProgress } from "@mkbabb/keyframes.js"` — mirroring the SHIPPED `useSpring`
   pattern (`src/composables/motion/useSpring.ts:15`). The bite-check: `grep` the dock-driver code
   for `AnimationGroup`, `loadAnimationEngine`, `fromString`, `@mkbabb/value.js`, `resolveEasing` —
   **all must be zero hits.** If any appears, the boundary is breached and the import must revert to
   the direct `SpringProgress` path.

**The W8 acceptance for this seam:** after the dock driver lands, `proof:vueuse-free-root` stays
GREEN and the §7-leg-3 grep returns zero forbidden symbols. The dock uses `SpringProgress` only (no
`fromString`), so ZERO value.js enters the bundle (`AU-AUGMENT.md §6`).

---

## §8 — Sequencing (the seam-facing order; W8/W8b own the impl)

This spec gates nothing on its own; it is the contract the IMPL waves execute against. The
seam-relevant order within W8:

1. **Author `--spring-dock`** (§4.1): edit `regen-spring-tokens.mjs` PRESETS + marker regex, run the
   script, re-route `--dock-resize-spring`. Verify idempotency (run twice, no-op second run).
2. **Single-frame FLIP sync** (move A, glass-ui-only, no keyframes import): move the
   `leavingLayer`/`currentLayer` mutations from `useLayerTransition.ts:146-147` into the rAF callback
   at `:167-169`. This alone kills the visible jank.
3. **SpringProgress driver** (move B, the LIGHT import): bind ONE `SpringProgress({response:0.5,
   dampingFraction:0.5, respectReducedMotion:true})` (§2.3); `.play(onFrame)`; map `value ∈ [0,1]`
   to width-px + opacity in the SAME callback. Mirror `useSpring.ts:105-136`.
4. **reduced-motion** (§2.5 of AU-AUGMENT): the `respectReducedMotion:true` option snaps to target in
   one emission; the VT path checks `prefersReducedMotion()` before `startViewTransition`.
5. **Vocabulary registration** (§6): land `README.md` + register `proof:dock-vocabulary` in
   `gates.mjs`.
6. **Publish 3.3.0** (USER-DOMAIN) → unblocks keyframes D.W5.

The new perceptual gate `proof:dock-motion-single-source` (Playwright settle probe: container-width-
stop frame == child-opacity≤0.01 frame within ±1 frame; `AU-AUGMENT.md §6.1`) is the acceptance for
moves 2+3 together — re-injecting the async fork makes it RED.

---

## §9 — Risk register (seam-specific)

| risk | severity | mitigation |
|---|---|---|
| Implementing `AnimationGroup` per the literal `AU-AUGMENT.md §2.2(B)` wording | **HIGH** — breaks value.js-free | §2.3: use `SpringProgress` directly; the §7-leg-3 grep is the fail-closed check |
| `--spring-dock` runtime params drift from the PRESETS `(0.5, 0.5)` row | MED — CSS/JS motion diverges | §4.2: source both from one `(response, ζ)`; `proof:dock-motion-parity` must see one source |
| Narrowing the peer pin to `^3.0.0` only | LOW — needless break | §3: keep `^2.2.0 \|\| ^3.0.0`; LIGHT surface is stable across both |
| `--dock-press-spring` accidentally folded into the resize family | MED — press feedback corrupts surface fades | §4.1: leave `tokens.css:1275` untouched; orthogonal transform-only family |
| regen marker regex not extended → script throws / non-idempotent | LOW — caught at build | §4.1 step 2: extend `SPRING_LINES_RE` alternation; verify twice-run no-op |
| keyframes D.W4 HEAVY transposition mistaken for a LIGHT-surface break | LOW | §3, §5: D.W4 touches HEAVY internals + `advanceTo`; LIGHT public surface is unchanged |

---

## §10 — Open coordination questions (track, do not block W8)

1. glass-ui 3.3.0 publish timing — gates keyframes D.W5 unblock (`AU-AUGMENT.md §6`; USER-DOMAIN).
2. Whether the `<Role>Dock` base component lands before keyframes is its 2nd consumer, or stays BOOK
   until D.W5 forks on it (§6; currently BOOK).
3. `interpolate-size` + `@starting-style` double-animate interaction with the VT path — browser-test
   before W8b lands (`AU-AUGMENT.md §2.4`, §6 isomorphism risk). Seam-adjacent (the FLIP fallback is
   the iOS-live path), not a keyframes question.
