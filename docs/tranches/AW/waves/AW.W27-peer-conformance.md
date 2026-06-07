# AW.W27 — peer-conformance: admit keyframes ^4 + value ^0.11

## State

**Name**: W27 — peer-conformance (the E0a/E0b supplier-edge widens)
**Opens after**: AW.W0 (independent of the dock/aurora waves; lands in the 3.4.0 cut)
**Agents**: 1 serial
**Hard gate**: `proof:peer-conformance` — born-RED: registry-latest keyframes (4.0.0) + value (0.11.1) must satisfy glass-ui's declared peer ranges; the value peer must intersect keyframes-4's value dep (dual-instance safety).
**Status**: CLOSED (2026-06-07)

## Goal criterion

glass-ui's `@mkbabb/keyframes.js` + `@mkbabb/value.js` peer ranges ADMIT each
upstream's npm-latest major, build-verified green, under a born-RED gate that reverts
if a range is re-narrowed. The 3.3.0 ranges excluded both current majors
(keyframes `^2.2.0 || ^3.0.0` vs 4.0.0; value `^0.10.0` vs 0.11.1).

## What landed

- **value peer `^0.10.0` → `^0.10.0 || ^0.11.0`** (E0a). The aurora band's value.js
  `interpolateHue` ships only in the 0.11 line (AW.W5/E2 needs it); glass-ui's
  consumed `/color` leaf (7 Ottosson primitives) is stable across 0.10→0.11, so the
  widen is source-safe. `package.json:616`.
- **keyframes peer `^2.2.0 || ^3.0.0` → `^2.2.0 || ^3.0.0 || ^4.0.0`** (E0b).
  `package.json:615`.
- **`src/composables/motion/useNumericTransition.ts` source fix.** keyframes 4
  changed `NumericAnimationOptions.timingFunction` from `TimingFunction |
  TimingFunctionNames` to `TimingFunction | Easing` — string easing names are no
  longer accepted in the options (they resolve only through the ASYNC `resolveEasing`,
  which crosses the value.js dynamic boundary the dock/motion LIGHT surface must
  never pull in). glass-ui passed a string-name-capable type, which type-errored
  (TS2322) against keyframes 4. FIX: narrow glass-ui's public option type to a
  callable `TimingFunction` (drop `TimingFunctionNames`) — assignable to every
  supported keyframes major (2.2 / 3 / 4) and decoupled from keyframes'
  name-resolution churn. A consumer wanting a named curve passes the function
  directly. (One demo doc-example updated to the callable form.)
- **devDep rebaseline:** `@mkbabb/keyframes.js` dev pin → `^4.0.0` (glass-ui now
  builds + typechecks against the latest keyframes in dev/CI). value dev stays
  `^0.10.0` (keyframes 4's hard dep caps it; the value-0.11 build is green by
  construction — the consumed surface is unchanged).
- **`scripts/proof-peer-conformance.mjs` + `proof:peer-conformance` script.**

## The corrected coordination finding (supersedes keyframes-4-compat.md §3-4)

The earlier coordination note claimed the keyframes-^4 admit was BLOCKED on a
keyframes-side fix (keyframes 4 supporting value 0.11). **That was wrong.** The
build break was glass-ui's OWN `useNumericTransition` option type, not an upstream
version knot — glass-ui builds green against keyframes 4 + value 0.10 (keyframes 4's
intended pairing) once the option type is narrowed. inv-16: glass-ui owned the fix
and shipped it. No keyframes-side work was required for the 3.4.0 admit.

**The one genuinely non-green combo — keyframes 4 + value 0.11 — is NON-RESOLVABLE:**
keyframes 4 hard-deps value `^0.10.0` (caps value at <0.11), so npm never resolves
keyframes-4-next-to-value-0.11. Every npm-RESOLVABLE combo of glass-ui's declared
peers typechecks:
- keyframes 4 → forces value 0.10 → glass-ui green (verified).
- value 0.11 → forces keyframes 2.2/3 (not 4) → glass-ui green (stable color leaf).

So declaring both wide ranges is honest. The dual-instance trap is DEFUSED: glass-ui's
value peer intersects keyframes-4's value dep at 0.10.x, so a consumer with keyframes 4
dedups to a single value.js (gated by `proof:peer-conformance`'s intersection check).

**Forward note for E2 (AW.W5 aurora):** when W5 ships and FORCES value 0.11
(`interpolateHue`), a consumer wanting both W5 + keyframes 4 hits the keyframes-4
value-cap. THAT is when keyframes must widen its own value dep to `^0.11` — a
keyframes-side fix gated to the E2 window, NOT the 3.4.0 cut.

## Hard Gate

1. `npm run proof:peer-conformance` GREEN — registry-latest keyframes 4.0.0 + value
   0.11.1 satisfy the declared peer ranges; value peer ∩ keyframes-4 value dep is
   non-empty. Born-RED on the 3.3.0 ranges (verified: `^0.10.0` rejects 0.11.1,
   `^2.2.0||^3.0.0` rejects 4.0.0).
2. `npm run typecheck` clean against keyframes 4.0.0 + value 0.10.0.
3. `npm run build` green (bundle + dts emit) against keyframes 4.

## Commit Plan

- `feat(deps): admit keyframes ^4 + value ^0.11 peers + narrow useNumericTransition
  timingFunction to a callable (AW.W27)` — the peer/dev widen, the source fix, the gate.
