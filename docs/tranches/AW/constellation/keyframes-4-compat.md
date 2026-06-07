# keyframes 4 / value 0.11 peer knot — the finding + coordination

> **CORRECTION (AW.W27 close, 2026-06-07): §3-4 below are SUPERSEDED.** The
> keyframes-^4 admit was NOT blocked on a keyframes-side value-0.11 fix. The build
> break was glass-ui's OWN `useNumericTransition` option type (keyframes 4 removed
> string-name acceptance from `NumericAnimationOptions.timingFunction`); narrowing
> glass-ui's public option to a callable `TimingFunction` made glass-ui build green
> against keyframes 4 + value 0.10. glass-ui shipped BOTH peer widens in 3.4.0
> (keyframes `^2.2||^3||^4` + value `^0.10||^0.11`) under `proof:peer-conformance`.
> The one non-green combo (keyframes 4 + value 0.11) is NON-RESOLVABLE (keyframes 4
> caps value <0.11), so every npm-resolvable combo typechecks. The keyframes-side
> value-0.11 widen is deferred to the E2/AW.W5 window (when W5 forces value 0.11).
> See `waves/AW.W27-peer-conformance.md`. The original analysis below is kept for
> the archaeology.

The keyframes.js session (its own G-tranche exec, 2026-06-07) found glass-ui 3.3.0
ships stale peer ranges that exclude both upstreams' current majors:
`@mkbabb/keyframes.js: "^2.2.0 || ^3.0.0"`, `@mkbabb/value.js: "^0.10.0"`. It
proposed "a glass-ui peer bump → ^4.0.0 / ^0.11.0 in a 3.3.1" and is carrying a
demo dedup-alias as the interim. **inv-16: the peer ranges live in glass-ui's
package.json — the fix is glass-ui's to ship, not keyframes'.** glass-ui owns it.

## The finding (build-verified at HEAD, the verification the paper analysis missed)

The bump is NOT a clean 3.3.1 — there is an **upstream version-alignment knot**:

| Combo (glass-ui devDeps) | `vue-tsc --noEmit` |
|---|---|
| keyframes 2.2.0 + value 0.10.0 (baseline) | GREEN |
| keyframes 2.2.0 + **value 0.11.1** | **GREEN** — the value widen is clean |
| **keyframes 4.0.0** + value 0.11.1 | **RED** — `TS2322` in `useNumericTransition.ts:54` |
| keyframes 4.0.0 + value 0.10.0 | keyframes 4's intended pairing |

**Root cause — keyframes 4 does NOT support value 0.11.** keyframes 4 imports
`timingFunctions` from value.js (`keyframes.d.ts:7`) and derives
`TimingFunctionNames = keyof typeof timingFunctions` (`:1054`); it **hard-deps
value `^0.10.0`** (`keyframes.js/package.json` — excludes 0.11). value 0.11
changed the `timingFunctions`/easing type shape, so glass-ui pairing keyframes 4
with value 0.11.1 makes keyframes' own `TimingFunctionNames` union resolve against
a value version keyframes 4 wasn't built for — the `TimingFunction | Easing`
mismatch surfaces in glass-ui's `useNumericTransition` (a shipped public API that
threads keyframes' `TimingFunctionNames`). This is NOT a glass-ui source bug
(glass-ui is fine with keyframes 2.2/3 + value 0.11) — it is keyframes 4 lagging
value's 0.11 cut.

## What this means for the bump

- **value ^0.11 widen — CLEAN, glass-ui-shippable.** glass-ui's `/color` leaf (7
  Ottosson primitives, `src/composables/color/index.ts:17-25`) is stable across
  value 0.10→0.11; verified GREEN with keyframes 2.2.0. glass-ui can widen its
  value peer to `^0.10.0 || ^0.11.0` any time.
- **keyframes ^4 admit — BLOCKED on a keyframes-side fix.** glass-ui cannot
  honestly declare `keyframes ^4 + value ^0.11` compatibility while keyframes 4
  breaks against value 0.11. Admitting keyframes ^4 requires keyframes 4 to first
  SUPPORT value 0.11 (widen keyframes' `@mkbabb/value.js` dep to admit `^0.11` +
  rebuild/retest its `timingFunctions` types against value 0.11). **That is
  keyframes-side work the keyframes session owns** (it is driving keyframes; inv-16
  — glass-ui does not write keyframes).

## Coordination handoff to the keyframes session

1. **keyframes-side (you):** widen keyframes 4.x's `@mkbabb/value.js` dependency to
   admit `^0.11.0` and rebuild/retest the `timingFunctions`-derived types against
   value 0.11 (a keyframes 4.0.1/4.1.0). This is the upstream unblock.
2. **glass-ui-side (me), THEN:** widen BOTH peers — keyframes `^2.2.0 || ^3.0.0 ||
   ^4.0.0` + value `^0.10.0 || ^0.11.0` — build-verified GREEN against keyframes
   4.x(value-0.11-supporting) + value 0.11, with a born-RED `proof:peer-conformance`
   gate (registry-latest satisfies the declared ranges). Ships as a glass-ui
   patch once (1) lands.
3. **interim (now):** **KEEP the demo dedup-alias** — it is the correct documented
   bridge, NOT a hack to remove. glass-ui's `proof:package` release gate already
   refuses a dishonest keyframes-^4 claim (it tests the packed surface against the
   local keyframes-4 sibling and reds when glass-ui's peer is out of sync), so
   glass-ui will not ship a keyframes-^4 peer until the combo is genuinely green.
4. **DECISION for the user:** do glass-ui's value-^0.11-only widen NOW (a partial
   3.3.1 that closes the value dimension but not the keyframes warn), OR hold both
   for one clean cut after (1)? The value-only patch can't get a fully-green LOCAL
   release gate (the local keyframes-4 sibling reds `proof:package` against the
   ^2.2||^3 keyframes peer); it would publish via CI's devDep fallback. The clean
   path is (1)→(2) together.

## Glass-ui-side robustness option (separate, optional)

glass-ui's `useNumericTransition` inherits keyframes' value-version-dependent
`TimingFunctionNames` type by importing it from keyframes. glass-ui could instead
declare its own easing-name string type (decoupling its public API from the
keyframes/value type alignment), so a future keyframes/value skew never reds
glass-ui's typecheck. This is a hardening, not the fix — the fix is keyframes
supporting value 0.11. Booked for the AW peer-conformance wave.
