# Gate semantic-roster C16 — exact-byte critic A

## Verdict

**REJECT / FORMATION-RED.** C16 correctly changes the Chip claim from one
synthetic click's outcome to structural listener absence, and the stated
target/type/listener/capture ledger semantics are sufficient in the abstract.
They are not executable as frozen in the current governed Vitest environment.
The named `EventTarget.prototype` is not the prototype that owns or receives
`addEventListener`/`removeEventListener` calls from Happy DOM elements. A
literal implementation therefore records zero for a real registration on the
exact static `SPAN`; the `isTrusted`/event-field-gated wrapper mutation remains
a concrete false-GREEN.

This is formation criticism only. I made no product, governed test, package,
lock, consumer, gate, browser, reservation or acceptance change. The temporary
diagnostic probe was removed after execution; this critic is the only retained
file from the audit.

## Exact inputs and cursor

- `GATE-SEMANTIC-ROSTER-C16.json`: 1,357 lines, SHA-256
  `944fc43b514ce25dfa175c387181d582395032a0afc5ccbdf539df15e96b0ece`.
- `GATE-SEMANTIC-ROSTER-C16-CANDIDATE.md`: 89 lines, SHA-256
  `6303b6c14d28f7c27201f2f7025bae53fdfc7f0bb5b1caee95318b88d356d88c`.
- committed HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.
- parent C15 roster SHA-256
  `dad07048675179d8b2efaf92f1562ad757ab74b933c83ab7e28ee2b3fc1a616d`.
- parent C15 candidate SHA-256
  `58185d8ed52931e3a6463b27b58c1f30f352c191ffbb6c171bac90273ddce9f5`.
- pinned C15 critics A/B reproduce as
  `8c309ebcc4c56a116a38fcdf049f50681fb235b7c5c3eda760dfe38a9c1df11b`
  and
  `541b6b682ad28d54929b485e6a8afcc27d425e1a8a7b65d550d6c1bc5e6334d8`.
- committed `vitest.config.ts` SHA-256
  `3d5c17e2bdee7397019f55d2a12a399439e838a64cec678ca56a407fe0bd861d`;
  committed `tests/setup.ts` SHA-256
  `42c61323ca4639eb90e04931498b8d08a6bbe8d26b05cc9691b873bc090a2ce0`.

Both supplied input digests, all parent digests and both Git identities were
recomputed before review. I read both C16 inputs in full and treated unrelated
dirty workspace bytes as read-only.

## Preserved roster and writer exactness

The C16 JSON parses as schema version 8. Its structure independently
recomputes as follows:

- 48 active Vitest rows, 4 hard reservations and 1 conditional reservation;
- 53 worst-case counted seats, 7 free seats and 11 external rows;
- 64 rows and 64 globally unique IDs across the three partitions;
- 31 base/product/tooling rows and 17 component-behavior rows;
- 13 pre-binding redresses and 20 explicit required-case objects;
- 82 non-empty mutation strings, all globally unique;
- all 48 active registration strings occur exactly once in their declared
  source, and no declared active source is missing.

The ordered semantic-class ID digests reproduce exactly:

- base/product/tooling:
  `76e5592586cbdf15a7df592ab2b1a94c09e295ba5a301a15dba80051ccfc7e3a`;
- component behavior:
  `222a1a54d747480b490b409d9668534673343219270a93f5831f2e0ad2a9fe2b`.

The C15-to-C16 parsed delta is confined to schema/parent provenance and the
Chip row. The live-writer grammar and census are value-identical to C15: four
admitted grammar cases, seven Glass carrier SFCs, six exact imported component
origins and ten distinct carrier execution witnesses. The ordered grammar
digest remains
`27db32372c68f8d39495a4b983bb2ffefe70b211c52e4575145731740c89144c`.
The carrier classes, sink owners, native tags, portal/provider topologies and
runtime-reachable public exports agree with the pinned sources. The decisive
`cn` family-filter and carrier-non-rendering mutations remain present; neither
can be satisfied by a direct underlying-origin sentinel.

A fresh run of the 28 unique active source files produced 243 passes and two
diagnostic failures: the dirty workspace currently exposes two extra root
exports, and `dist-demo` predates its newest source. Those failures grant no
formation or acceptance credit and do not affect the exact committed roster
arithmetic.

## What C16 gets right about the Chip boundary

The predicate, mechanism and node law now agree on the strong claim: the exact
settled static host must have no active `click` registration, not merely fail
to deliver one chosen synthetic event. The exact `SPAN[data-mode=static]`
attribution also preserves the role, tabindex, pressed/state and descendant
Button exclusions without widening the seat to slot descendants or unlisted
event types.

The abstract ledger key is correct. DOM registration identity is exact target,
event type, callback identity and normalized capture flag. Duplicate adds with
the same callback/capture do not create a second registration; a behaviorally
equivalent wrapper is a different callback; boolean capture and
`{ capture: ... }` must normalize to the same flag; and a remove with the wrong
callback or capture must leave the registration active. `onclick === null`
separately covers the property surface.

Vue does not register the hostile consumer function itself. It installs a
stable invoker wrapper, changes that wrapper's value on listener replacement,
and removes the registered invoker on listener removal. Counting every active
`click` registration on the exact host, rather than looking for the hostile
function identity, correctly catches that wrapper. It also catches the two C16
mutations even when `isTrusted` or another event field makes the synthetic
delivery count remain zero.

I exercised these details in a disposable Vitest probe. Against the actual DOM
method owner, the probe passed exact target/listener/capture add/remove cases,
Vue replacement/removal, the real selectable-to-action-to-static Chip
lifecycle, the gated wrapper mutation, an `onclick` property mutation and
failure-safe method restoration. The current Chip ended on the exact static
`SPAN` with zero tracked clicks and null `onclick`; both planted listener forms
were structurally visible. Thus the strong boundary is feasible, but not via
the prototype C16 freezes.

## Decisive current-environment false-green

The candidate note at lines 52–55 and roster line 924 require instrumentation
of `EventTarget.prototype.addEventListener` and
`EventTarget.prototype.removeEventListener`. Vitest is pinned to Happy DOM by
`vitest.config.ts`. In that environment, a live prototype-chain walk from
`document.createElement("span")` proves all of the following:

1. `globalThis.EventTarget.prototype === window.EventTarget.prototype`;
2. the prototype that owns the methods invoked by the real `SPAN` is a
   different object; and
3. patching the named `EventTarget.prototype`, then calling
   `span.addEventListener("click", listener)`, leaves the literal ledger at
   zero.

This is consistent with the repository's own setup warning: `tests/setup.ts`
already records that Happy DOM's live document prototype is not the nominal
global `Document.prototype` and resolves its patch target from the actual DOM
object instead.

The following exact mutation therefore still false-GREENs a literal C16
implementation:

```ts
staticSpan.addEventListener("click", (event: MouseEvent) => {
    if (!event.isTrusted || event.detail !== 7) return
    hostileConsumerOnClick(event)
})
```

The frozen ledger observes zero because it patched the wrong object.
`staticSpan.onclick` remains null because this is an `addEventListener`
registration. The governed synthetic click has `isTrusted === false`, so the
hostile delivery count also remains zero. All tag, attribute and descendant
assertions can remain GREEN while the exact static host retains a trusted-user
click listener. This is precisely the false-green C16 claims to eliminate.

The final sentence of roster line 924 says to restore "both EventTarget
prototypes", but it does not identify two prototypes, a realm, or a live-owner
resolution rule. The only explicitly named prototype is the one demonstrated
not to intercept DOM calls. That sentence cannot supply the missing executable
binding by implication.

## Required redress

Keep this a same-seat correction, but freeze the live interception target and
prove the ledger before mounting the lifecycle:

- create a same-document probe element and resolve the actual own-property
  owners of its `addEventListener` and `removeEventListener` methods by walking
  its prototype chain; patch and restore the exact descriptors on those owners;
- require a preflight sentinel in which a detached `SPAN` add becomes exactly
  one active entry and the matching remove clears it. The sentinel must cover a
  duplicate add, different wrapper identity, wrong capture, and boolean versus
  object capture normalization so a ledger that over-removes cannot green the
  planted mutation;
- retain exact-target counting of Vue's registered invoker wrapper rather than
  comparing it to the hostile consumer callback;
- retain exact static-host capture, zero active `click` entries,
  `host.onclick === null`, the gated handler and gated-wrapper mutations, and
  the current descendant/event scope exclusions; and
- put unmount plus restoration of every patched descriptor in an outer
  `finally`, then verify the original descriptor identities are restored even
  after a planted assertion failure.

Until a new immutable candidate binds the ledger to the actual DOM method
owner and makes failed interception born-RED, C16 is **FORMATION-RED /
IMPLEMENTATION-INELIGIBLE**.
