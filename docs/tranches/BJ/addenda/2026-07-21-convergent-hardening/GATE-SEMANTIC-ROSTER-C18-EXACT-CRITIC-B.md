# Gate semantic-roster C18 — exact-byte critic B

## Verdict

**ACCEPT / FORMATION-GREEN.** I found no formation blocker in the exact C18
bytes. The live-owner positive path is executable and green, while the
verified-out-of-chain decoy mutation deterministically fails the required
fresh-element traversal proof and turns red. Setup order, isolated module
state, exact Chip host identity, guarded and property listeners, capture
matching, descriptor restoration, preserved roster arithmetic, and all current
writer/origin witnesses independently verify.

This verdict accepts only C18 formation. C18 remains implementation-absent and
acceptance-red exactly as its note states. I did not inspect or rely on another
C18 critic.

## Exact input identity

- roster: `GATE-SEMANTIC-ROSTER-C18.json`, 1,360 lines, SHA-256
  `d29f851dfca2c0045b2d88ec40edec4608d866316ee37b80b11e194dd58a438d`;
- candidate note: `GATE-SEMANTIC-ROSTER-C18-CANDIDATE.md`, 75 lines,
  SHA-256
  `bb20ab2a85e41583285773d78b8e6358b8600ec4efc135a982598717b9ed89e5`;
- committed source identity: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

Both input files were read completely. Both supplied document hashes and both
Git identities reproduced before semantic inspection. The roster parses as
JSON and declares schema version 10.

## Preserved roster and source truth

Independent recomputation produced:

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

After removing schema/parent authority and the Chip detector redress, the
normalized C17 and C18 JSON objects both hash to
`ad9ba52656fcb61f887e0fbee23e8ee2a8ce47213b1a588fde9b7939156737da`.
The semantic delta is therefore bounded to the declared parent advance and
wrong-owner mutation correction; no unrelated row, ID, class, reservation,
case, or law drifted.

The current arbitrary-writer census is seven public, runtime-reachable Glass
SFCs, eight governed literal occurrences, six imported `reka-ui` origins, two
native drawer sinks, and ten rendered Glass branches. The source literals,
grammar flows, import identities, public reach, token strings, branches,
native tags, and owner selectors match C18.

I independently mounted every Glass carrier branch in connected DOM with real
portals/teleports, then separately mounted all six underlying component origins
with a direct sentinel. The result was 16/16 green:

- Dialog center and side each placed both exact spacing-6 token classes on the
  named `DIV[data-slot=dialog-content]` owner;
- DrawerFooter and DrawerHeader each placed both exact 1rem token classes on
  their native root `DIV`;
- the hover portal, click portal, and click inline Popover branches each placed
  both exact 1rem token classes on their unique `.popover-content` `DIV`;
- Select placed both exact spacing-1 token classes on
  `DIV[data-slot=select-content]`;
- Toast placed both exact spacing-6 token classes on the
  `LI[data-slot=toast]` teleported beneath its viewport `OL`;
- Tooltip placed both exact spacing-2 token classes on its connected
  `DIV[data-material=overlay]`;
- each of the six approved `reka-ui` origins forwarded an independent sentinel
  class to connected native DOM.

The specified `cn` filter removes the governed built-in class families from
the actual Glass paths while leaving direct-origin forwarding intact. The
composition mutation therefore retains its required bite. No preserved
writer, origin, carrier, native-owner, exact-token, or public-surface defect was
found.

## Listener positive path — independently green

I implemented the governed listener test in a temporary dedicated Vitest
project with an isolated fork and an early setup file containing no Glass or
product import.

The setup created a real target-realm element and independently walked its
prototype chain to the own-property owners of `addEventListener` and
`removeEventListener`. It copied the exact original property descriptors while
installing wrappers. The frozen environment currently resolves both methods
from the nominal `EventTarget.prototype`, but the test used discovered object
identity rather than assuming that coincidence.

A second fresh element proved actual interposition, not merely a terminal zero:

```text
active registrations on fresh target: 0 -> 1 -> 0
add traversal count:                 positive
remove traversal count:              positive
```

The add used `{ capture: false, passive: true }`; the remove used boolean
`false`. The tuple returned to zero, confirming that target, type, listener
identity, and normalized capture—not irrelevant option differences—govern
matching. Duplicate tuple identity was treated idempotently.

Only after that positive proof did setup publish the installed-before-import
marker. The test asserted the marker, reset its isolated module graph, and
dynamically imported the exact Chip leaf. A fixture dynamically evaluated in
the same post-marker phase captured the instrumented registration method; its
guarded click listener entered the ledger and returned to zero on removal.
Thus the import-order fixture tests the intended ordering rather than merely
asserting a marker string.

The exact Chip lifecycle then verified:

- selectable `BUTTON`: `aria-pressed=true`, `data-state=on`, and selectable
  mode;
- action `BUTTON`: no `aria-pressed` or `data-state`;
- static `SPAN`: no role, tabindex, pressed/state relation, or descendant
  button;
- zero active click registrations for that exact captured static element;
- no own `onclick` property and inherited `host.onclick === null`;
- zero hostile consumer deliveries from the governed host click.

The hostile callback was guarded by `isTrusted` plus `event.detail`, so
synthetic non-delivery could not stand in for structural evidence. The ledger
separately observed the post-marker fixture's guarded registration. A direct
`onclick` property assignment also produced a non-null property witness,
confirming that the property path is not silently treated as an
`addEventListener` entry. Vue invokers are covered by exact element listener
identity even though the invoker function is not the consumer callback.

Unmount and module reset occurred while instrumentation remained installed.
The exact original add/remove descriptors were then restored in failure-safe
teardown. No temporary module, config, setup, fixture, or instrumentation byte
was retained.

## Decoy mutation — independently red

I restored the actual live-owner descriptors, then constructed a deterministic
decoy object and explicitly proved it absent from the sentinel element's entire
live prototype chain. Only that decoy received the add/remove wrappers; the
actual discovered owner remained untouched.

The second fresh element consequently produced:

```text
decoy add traversals:                 0
decoy remove traversals:              0
decoy-ledger sequence for fresh node: 0 -> 0 -> 0
required positive sequence:           0 -> 1 -> 0
```

The final zero cannot satisfy C18 by itself because the mechanism expressly
requires both methods to traverse the ledger before returning active count to
zero. The positive interposition predicate therefore evaluated false, making
the verified-out-of-chain decoy mutation deterministically red in the frozen
realm. The actual dynamic-owner path remained independently green. The decoy
case does not depend on whether the live owner happens to coincide with a
nominal prototype.

## Formation boundary

C18's node boundary remains appropriately narrow. The detector governs only
the captured settled host, its listed semantics, its active click registrations
and property handler, and the governed host click. Consumer slot descendants,
descendant-originated clicks, `contenteditable`, node replacement, and unlisted
events remain expressly outside the row.

The candidate does not claim that these mechanics already exist. It requires
the thirteen detector redresses and governed binding to land atomically in a
later authorized implementation and keeps package/consumer/browser/assistive-
technology acceptance separately red.

On the exact audited bytes, C18 is **ACCEPTED / FORMATION-GREEN /
IMPLEMENTATION-ABSENT / ACCEPTANCE-RED**.
