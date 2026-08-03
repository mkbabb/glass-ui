# Gate semantic-roster C17 — exact-byte critic B

## Verdict

**REJECT / FORMATION-RED.** C17's early setup, live-owner discovery,
isolated/cache boundary, dynamic import order, descriptor fidelity, listener
ledger, exact-host check, and guarded-handler cases are executable. The exact
candidate nevertheless freezes a false environment fact and a mutation with
no bite at the audited source identity: fresh Happy DOM elements resolve both
listener methods from the same prototype named by `globalThis.EventTarget` and
`window.EventTarget`, not a distinct owner. Replacing live-owner discovery with
the nominal prototype therefore still patches the correct owner and remains
green, contrary to C17's required red mutation.

This is an independent exact-byte audit. I did not inspect or rely on the C17
critic A report.

## Exact input identity

- roster: `GATE-SEMANTIC-ROSTER-C17.json`, 1,360 lines, SHA-256
  `eb10b64fe70d218113930541c0bbe4f88cca08f2e9fac803d1044c814d3ef054`;
- candidate note: `GATE-SEMANTIC-ROSTER-C17-CANDIDATE.md`, 94 lines,
  SHA-256
  `62c743fd61c9b3df49e006684fa923fd5e825aeffcc59a489eab2d24013e018f`;
- committed source identity: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

Both document hashes and both Git identities reproduced before inspection. The
roster parses as JSON and declares schema version 9.

## Independently recomputed preserved truth

The exact roster and current sources recompute to:

- 48 active Vitest rows, 4 hard reservations, 1 conditional reservation,
  53 worst-case counted seats, 7 remaining seats, and 11 external rows;
- 64 total and unique IDs across the active, reserved, and external
  partitions;
- 13 same-seat pre-binding detector redresses and 20 active rows with explicit
  case identity objects;
- 31 `base-product-tooling` IDs with digest
  `76e5592586cbdf15a7df592ab2b1a94c09e295ba5a301a15dba80051ccfc7e3a`;
- 17 `component-behavior` IDs with digest
  `222a1a54d747480b490b409d9668534673343219270a93f5831f2e0ad2a9fe2b`;
- four admitted writer-case keys with digest
  `27db32372c68f8d39495a4b983bb2ffefe70b211c52e4575145731740c89144c`;
- 48 exact subpath identities with digest
  `118e091405270a3e1fa2ae9aea24c3805acc1a7a6a087dfd6c247e2f19776252`;
- eight spring identities with digest
  `ef2496ddaffb7ef1a1efba36941c18440b83eb6ba8a7332d193877a7a297f7f`.

The current arbitrary-writer census is seven public, runtime-reachable Glass
SFCs, eight governed literal occurrences, six imported `reka-ui` origins, two
native drawer sinks, and ten rendered Glass branches. Source literals, grammar
flows, origin identities, public reach, branch table, exact token strings,
native tags, and owner selectors match C17.

I independently mounted every Glass carrier branch with connected DOM and real
portals/teleports, then mounted each of the six component origins with a direct
sentinel. All 16 checks passed. Both required token classes landed on the named
native owner in each of the ten carrier branches; all six origins forwarded to
connected native DOM. The specified `cn` family filter still removes the
required built-in classes through the actual carrier paths while leaving the
direct-origin sentinel path intact. Temporary diagnostics were removed.

I found no count, ID, digest, public-surface, writer, origin, carrier, branch,
token, native-owner, composition-path, or preserved-mutation defect.

## C17 listener mechanism — executable portions

I exercised the proposed mechanism independently, not merely by reading it:

- the setup-side prototype walk found the own-property owner of each listener
  method from a real sentinel element;
- the original descriptors were writable, configurable, non-enumerable data
  descriptors. Installing wrappers by copying those descriptors and later
  restoring the originals reproduced exact descriptor identity;
- a second fresh element crossed both wrappers. An add using an options object
  with `capture: false` and a remove using boolean `false` produced one active
  tuple and returned it to zero, confirming capture-equivalent matching;
- after an installed marker and module reset, dynamic import of the exact Chip
  leaf produced the correct selectable → action → static lifecycle. The exact
  settled `SPAN` had zero observed click registrations and `onclick === null`;
- a fixture dynamically evaluated only after interposition captured the
  instrumented registration method at module evaluation. Its guarded click
  registration entered the ledger, proving the setup-order mutation now has
  bite on the ordinary path;
- Vue's `onClick` machinery is covered because its element-scoped invoker calls
  the fresh element's resolved `addEventListener`; the ledger need not confuse
  the invoker identity with the hostile consumer callback;
- exact-target lookup correctly excludes listener entries belonging to the
  prior `BUTTON` nodes, while the `onclick` checks cover own and inherited
  property-handler lookup on the captured static host;
- unmount-before-restoration and nested failure-safe descriptor restoration
  leave no instrumentation or temporary module fixture behind.

The `isTrusted`/second-event-field consumer and early-return wrapper are both
structurally red when installed through the observed method. Synthetic
non-delivery therefore no longer masks those ordinary handler cases. The
host-only out-of-scope boundary remains exact: none of these checks claims slot
descendants, descendant-originated clicks, `contenteditable`, or unlisted
events.

## Decisive blocker — the nominal owner is the live owner here

Candidate-note lines 15–17 say the governed Happy DOM element methods resolve
from a live owner distinct from the nominal global/window
`EventTarget.prototype`. Roster mutation line 936 relies on that statement: it
requires a detector that patches only the nominal prototype to turn red because
a fresh element supposedly uses another owner.

That premise does not reproduce. I checked it twice: once under the repository's
normal Vitest project and once in a dedicated setup-free Happy DOM project. In
both environments:

```text
globalThis.EventTarget === window.EventTarget
ownerOf(freshSpan, "addEventListener")
    === globalThis.EventTarget.prototype
ownerOf(freshSpan, "removeEventListener")
    === globalThis.EventTarget.prototype
```

The two nominal methods also accepted the fresh element as their direct call
target and delivered their test events. This is not a naming coincidence; the
objects are identical.

Therefore the exact mutation at roster line 936 is green when implemented as
written. Replacing the dynamic walk with
`globalThis.EventTarget.prototype` or `window.EventTarget.prototype` still
patches the live owner. The second fresh-element probe traverses the wrappers,
and add/remove still returns the ledger count to zero. C17 demands red from a
mutation that preserves the correct behavior in this frozen environment.

The dynamic owner-discovery rule itself remains the better implementation: it
is environment-independent and will work if an execution realm later differs.
The defect is the immutable claim that the owners currently differ and the use
of that false condition as a required present mutation, not the decision to
discover owners dynamically.

## Required same-seat correction

A new immutable candidate should preserve C17's mechanism but repair the owner
truth and mutation:

- state that live-owner discovery is authoritative and that the discovered
  owner **may coincide with or differ from** the nominal prototypes;
- record the current positive witness honestly: under the frozen Happy DOM
  project the owners coincide and descriptor-preserving interposition of that
  object must remain green;
- replace the nominal-only mutation with a deterministic wrong-owner case.
  After discovering the live owner, construct or select a distinct decoy object
  that is proved absent from the fresh element's prototype chain, patch only
  that decoy, and require the second-element add/remove probe to stay unseen and
  turn the detector red;
- if distinct-realm behavior is also desired, create an explicit fixture realm
  whose element is proved to resolve from a different owner, rather than
  asserting that the current target realm already does;
- retain the isolated early setup, clean module-cache boundary, marker-gated
  dynamic SUT and fixture imports, exact descriptor restoration, capture tuple,
  property-handler, guarded-handler, exact-node, teardown, and host-only laws.

Until the current owner identity and wrong-owner mutation are made truthful,
C17 remains **REJECTED / FORMATION-RED / IMPLEMENTATION-INELIGIBLE**.
