# Gate semantic-roster C16 — exact-byte critic B

## Verdict

**REJECT / FORMATION-RED.** C16's active-registration ledger correctly covers
the normal Vue listener path, exact target identity, property handlers, and the
two guarded-handler mutations. It nevertheless begins observing too late: the
law requires installation only before mount, after ordinary static module
evaluation. A component module can obtain a reference to the registration
method before the ledger starts and use that reference when the static host is
created. The exact host then has an active guarded click listener while every
C16 observation remains green.

This is an independent exact-byte audit. I did not inspect or rely on the C16
critic A report or treat an earlier critic's source conclusions as evidence.

## Exact input identity

- roster: `GATE-SEMANTIC-ROSTER-C16.json`, 1,357 lines, SHA-256
  `944fc43b514ce25dfa175c387181d582395032a0afc5ccbdf539df15e96b0ece`;
- candidate note: `GATE-SEMANTIC-ROSTER-C16-CANDIDATE.md`, 89 lines,
  SHA-256
  `6303b6c14d28f7c27201f2f7025bae53fdfc7f0bb5b1caee95318b88d356d88c`;
- committed source identity: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

Both document hashes and both Git identities reproduced before inspection. The
roster parses as JSON and declares schema version 8.

## Independently recomputed preserved truth

The C16 bytes and current source recompute to:

- 48 active Vitest rows, 4 hard reservations, 1 conditional reservation,
  53 worst-case counted seats, 7 remaining seats, and 11 external rows;
- 64 total and unique IDs across the active, reserved, and external
  partitions;
- 13 same-seat pre-binding redresses and 20 active rows with explicit case
  identity objects;
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

The current arbitrary-writer source census is seven public,
runtime-reachable SFCs, eight governed literal occurrences, six imported
`reka-ui` origins, two native drawer sinks, and ten rendered Glass branches.
All literals, flows, origin identities, native tags, owner selectors, and
expected token strings match C16.

I independently ran connected-DOM mounts with real portals/teleports for all
ten Glass carrier witnesses and separate sentinel mounts for all six component
origins. The result was 16/16 green: every Glass witness placed both exact
built-in token classes on its named connected native owner, and every origin
forwarded its sentinel to connected native DOM. The temporary diagnostic file
was removed. The specified `cn`-family filter mutation removes the governed
built-in classes from every carrier path while leaving direct-origin forwarding
intact, so the carrier-composition mutation retains its advertised bite.

I found no preserved count, hash, public-surface, writer-census, origin,
carrier, branch, native-owner, exact-token, or composition-mutation defect.

## Listener-ledger audit

Several important parts of C16 are well formed:

- target, type, listener identity, and normalized capture flag are the DOM
  registration/removal matching tuple. A conforming implementation can treat
  duplicate adds as one active tuple and removal options as equivalent when
  their capture flags match;
- querying only the captured settled `SPAN` correctly ignores registrations
  left on the prior selectable/action `BUTTON` nodes;
- Vue's ordinary `onClick` patching installs an element listener through
  `addEventListener`. The ledger sees the Vue invoker even though its listener
  identity differs from the consumer callback;
- `host.onclick === null` covers the property-handler path separately from
  `addEventListener` registrations;
- the `isTrusted`/second-field consumer and early-return wrapper mutations are
  structurally red when their registrations pass through the installed
  prototype wrapper, even though the synthetic click delivers nothing;
- failure-safe unmount/restoration is required, and can preserve test-process
  integrity when implemented with descriptor restoration in a nested
  `finally` after unmount.

Automatic removal through `once` or an aborted signal can make a naive ledger
stale, so an implementation must model those paths if it claims general active
registration truth. That edge tends toward false red rather than the decisive
false green below; it is not this verdict's blocker.

## Decisive blocker — observation starts after module evaluation

Roster line 924 and candidate-note lines 52–53 require the ledger **before
mount**. They do not require it before the Glass/component module graph is
evaluated. Ordinary Vitest files evaluate static imports before test bodies;
the governed source path currently imports `Chip` statically at
`tests/components/chip.contract.test.ts:3`.

Therefore this module-level setup occurs before a test-body ledger starts:

```ts
const registerListener = EventTarget.prototype.addEventListener
```

During creation of the static branch, the component can then use that already
obtained function:

```ts
registerListener.call(staticSpan, "click", (event: MouseEvent) => {
    if (event.isTrusted && event.detail === 1) hostileConsumerOnClick(event)
})
```

This produces the exact failure C16 says it excludes:

- the listener is an active `click` registration on the exact settled static
  `SPAN`;
- registration does not call the later prototype wrapper, so the ledger has
  zero entries for that host;
- the property path is unused, so `host.onclick === null`;
- a synthetic click does not pass the guarded condition, so hostile delivery
  remains zero;
- role, tabindex, pressed/state, descendant-button, and exact-node assertions
  remain green.

I reproduced both sides in a fresh temporary Vitest diagnostic. The current
Chip lifecycle ended on the exact static `SPAN` with zero observed host click
registrations. A fixture that obtained the registration function during module
evaluation, before ledger installation, then used it on mount created a real
active guarded listener on its exact `SPAN`; C16's ledger count, `onclick`
check, and synthetic-delivery check all remained green. The two-case diagnostic
passed and was removed.

This case is entirely on the governed host. It does not use a slot descendant,
a descendant-originated event, node replacement, `contenteditable`, or an
unlisted event, so the stated out-of-scope boundary does not remove it.

## Required same-seat redress

A new immutable candidate should make observation order part of the mechanism:

- run the detector in an isolated test worker with an early setup module that
  interposes on both listener methods before **any** Glass, Chip, component, or
  fixture module is imported or evaluated;
- dynamically import the system under test only after an explicit
  interposition-installed marker is asserted, with no prior worker module-cache
  entry for that graph;
- add a setup-order regression fixture that obtains the registration function
  at module evaluation and uses it when the static host is created. Because the
  fixture must be evaluated only after interposition, its guarded registration
  must enter the exact-host ledger and turn the detector red;
- keep the exact-target/capture tuple, Vue-invoker, `onclick`, guarded-delivery,
  and out-of-scope laws; unmount while observation is still installed, then
  restore the original property descriptors and clear the ledger in
  failure-safe teardown.

If complete pre-evaluation observation cannot be guaranteed, the predicate
must be narrowed to registrations observed after ledger installation rather
than claiming structural absence on the host.

Until that setup-order requirement and regression are frozen, C16 remains
**REJECTED / FORMATION-RED / IMPLEMENTATION-INELIGIBLE**.
