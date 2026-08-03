# Gate semantic-roster C19 — exact-byte critic B

## Verdict

**ACCEPT / FORMATION-GREEN.** I found no formation blocker in the exact C19
bytes. The bounded correction closes C18's cross-element-prototype
counterexample: one fixed null-prototype decoy is absent by identity from both
already-created live chains, neither chain nor the verification element is
changed afterward, decoy-only instrumentation receives zero traversal and
produces `0→0→0`, and the required positive predicate turns red. The actual
dynamically discovered owners independently receive positive add/remove
traversal and produce `0→1→0` before the exact Chip import.

Setup order, isolated module state, descriptor preservation and restoration,
exact static-host identity, guarded and property listener cases, capture
normalization, preserved roster arithmetic, and every carrier/origin witness
also verify. This accepts formation only: implementation and downstream
acceptance remain absent/red exactly as the candidate says. I did not inspect
or rely on another C19 critic.

## Exact input identity

- roster: `GATE-SEMANTIC-ROSTER-C19.json`, 1,360 lines, SHA-256
  `dc05df9124024d721ce3a69dca297c237c965fa31921fbae6e0e46bb72257b52`;
- candidate note: `GATE-SEMANTIC-ROSTER-C19-CANDIDATE.md`, 79 lines,
  SHA-256
  `e7a75f24f5ebc3c6f7b145cd5ffbf99952dcbff50d1a94b72890ee990b397f11`;
- committed source identity: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

Both inputs were read completely. Both supplied hashes and both Git identities
reproduced before semantic inspection. The roster parses as JSON and declares
schema version 11. Its superseded-roster, parent-note, and two parent-critic
hashes reproduce the declared C18 authority chain.

## Bounded correction and preserved roster truth

The exact C18-to-C19 diff contains only:

- schema version 10 to 11;
- parent/superseded formation authority advancing from C17/C18 to C18/C19;
- replacement of the one Chip wrong-owner mutation sentence.

The replacement sentence now requires the exact facts C18 omitted: the decoy
is one fixed synthetic object, has a null prototype and own add/remove methods,
is absent by identity from both the discovery sentinel and already-created
verification chains before instrumentation, and cannot be made reachable by
substituting the verification element or rewriting either chain.

After removing schema/authority and the Chip detector redress, the normalized
C18 and C19 JSON objects both hash to
`ad9ba52656fcb61f887e0fbee23e8ee2a8ce47213b1a588fde9b7939156737da`.
No unrelated row, ID, class, reservation, case identity, or machine law
drifted.

Independent recomputation produced:

- 48 active Vitest rows, 4 hard reservations, 1 conditional reservation,
  53 worst-case counted seats, 7 remaining seats, and 11 external rows;
- 64 total and unique IDs across the three partitions;
- 13 same-seat pre-binding detector redresses and 20 active rows with explicit
  case-identity objects;
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

The current arbitrary-writer census remains seven public, runtime-reachable
Glass SFCs, eight governed literal occurrences, six approved imported origins,
two native drawer sinks, and ten Glass rendering branches. Package, lock,
approved `cn`, all seven carrier files, Chip, the Chip contract, and the public
surface test retain the source identities frozen by C18.

## Fixed two-chain decoy — independently red

I executed C19's negative mutation in a dedicated isolated Vitest project. Its
earliest setup file contained no Glass/product import and created, in this
order:

1. a real `DIV` discovery sentinel;
2. a real `SPAN` verification element;
3. one `Object.create(null)` decoy with own add/remove data properties;
4. immutable-by-observation snapshots of both live prototype chains.

Before instrumentation, exact-identity walks proved the fixed decoy absent
from both chains. The verification element and sentinel identities remained
the same, and a second identity walk after the positive run proved every entry
of both chains remained the same object in the same order. No prototype setter,
replacement element, or substitute probe was used.

I reproduced the C18 failure shape as a control. In the frozen realm,
`HTMLSpanElement.prototype` is absent from the `DIV` chain but present in the
already-created `SPAN` chain. It therefore demonstrates why C18's one-chain
quantifier was insufficient. That nominal prototype cannot satisfy C19 because
it is neither the fixed null-prototype decoy nor absent from both chains.

After restoring the live owners, I instrumented only the exact pre-proved
decoy. The actual owner descriptors remained byte-for-byte descriptor-equal to
their originals. Calling add/remove on the same already-created verification
element, with object `{ capture: false, passive: true }` on add and boolean
`false` on remove, yielded:

```text
decoy add traversals:                  0
decoy remove traversals:               0
decoy active-registration sequence:    0 -> 0 -> 0
required positive sequence:            0 -> 1 -> 0
required positive predicate:           false (RED)
```

The same fixed decoy identity was also absent from fresh `BUTTON`, SVG, and
custom-element chains. These alternate element types supply no topology escape:
C19 binds the normative mutation to the already-created verified element and
forbids both ways of changing its reachability after proof.

## Actual-owner baseline and exact Chip path — independently green

The same isolated run separately walked the sentinel's live chain to the
own-property owners of `addEventListener` and `removeEventListener`; it did not
assume `globalThis.EventTarget`, `window.EventTarget`, or a named nominal
prototype. It copied the exact original descriptors and installed wrappers on
those discovered objects.

The already-created verification element then produced positive add and remove
traversals and this active-tuple sequence:

```text
actual-owner active registrations:     0 -> 1 -> 0
add traversal:                         positive
remove traversal:                      positive
```

The differing passive spellings and identical normalized false capture prove
matching by exact target, type, listener identity, and capture rather than by
whole-options-object equality. Duplicate tuple storage was idempotent.

Only after this positive proof did setup publish the installed-before-import
marker. The test asserted it, reset the isolated module graph, dynamically
imported `src/components/chip/Chip.vue`, and dynamically evaluated a fixture
whose module-scope method capture equaled the installed wrapper. A fixture
registration entered the ledger and returned to zero, proving the ordering
mechanically.

The exact Chip transitions then proved:

- selectable `BUTTON`: `aria-pressed=true`, `data-state=on`, selectable mode;
- action `BUTTON`: no `aria-pressed` or `data-state`;
- static `SPAN`: no role, tabindex, pressed/state relation, or descendant
  button;
- zero active click registrations for that exact captured static `SPAN`;
- no own `onclick` property and inherited `host.onclick === null`;
- zero hostile consumer deliveries from the governed host click.

The hostile callback required both `isTrusted` and a second event field, so
synthetic non-delivery was not treated as the structural proof. The exact-host
ledger supplied that proof independently. A direct `onclick` assignment on a
separate target produced a visible non-null property witness while remaining
absent from the add-listener ledger. Unmount and module reset ran while
instrumentation remained installed, and failure-safe teardown restored the
exact original descriptors.

The dedicated listener project passed 2/2 executable cases. No setup, fixture,
configuration, probe, or instrumentation file remains.

## Preserved carrier and origin execution

I separately mounted every actual Glass carrier branch in connected DOM with
real portals/teleports and mounted each approved `reka-ui` origin with an
independent sentinel. All 16 witnesses were green:

- Dialog center and right-side branches placed both exact spacing-6 classes on
  their named native `DIV[data-slot=dialog-content]` owners;
- DrawerFooter and DrawerHeader placed both exact 1rem classes on their native
  root `DIV`s;
- Popover click-portal, click-inline, and hover-portal branches placed both
  exact 1rem classes on the unique `.popover-content` native `DIV`;
- Select placed both exact spacing-1 classes on
  `DIV[data-slot=select-content]`;
- Toast placed both exact spacing-6 classes on the `LI[data-slot=toast]`
  beneath its real viewport `OL`;
- Tooltip placed both exact spacing-2 classes on its connected
  `DIV[data-material=overlay]`;
- all six approved origin components forwarded their unique sentinel class to
  connected native DOM.

The writer project passed all 15 test registrations covering those 10 carrier
branches and 6 origin witnesses. No temporary writer probe or configuration
file remains.

## Formation boundary

C19 still governs only the exact settled Chip host and the semantics explicitly
listed in its node-identity law. Consumer slot descendants,
descendant-originated clicks, caller-authored `contenteditable`, node
replacement, and unlisted events remain outside the row. The candidate does
not claim that any of the thirteen redresses or the governed binding already
exists; those mechanics must land atomically in a later authorized
implementation, with package, consumer, browser, assistive-technology, and
tranche acceptance still separately red.

On the exact audited bytes, C19 is **ACCEPTED / FORMATION-GREEN /
IMPLEMENTATION-ABSENT / ACCEPTANCE-RED**.
