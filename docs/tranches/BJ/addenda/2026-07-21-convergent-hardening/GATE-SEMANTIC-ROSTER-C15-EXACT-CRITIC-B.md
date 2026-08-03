# Gate semantic-roster C15 — exact-byte critic B

## Verdict

**REJECT / FORMATION-RED.** The exact C15 writer redress is executable and
closes the carrier-composition gap, but the Chip row still claims structural
listener absence from a single behavioral click observation. That observation
has a concrete false-green, so these exact bytes cannot become formation
authority.

This is an independent audit. I did not inspect or rely on the C15 critic A
report.

## Exact input identity

- roster: `GATE-SEMANTIC-ROSTER-C15.json`, 1,356 lines, SHA-256
  `dad07048675179d8b2efaf92f1562ad757ab74b933c83ab7e28ee2b3fc1a616d`;
- formation note: `GATE-SEMANTIC-ROSTER-C15-CANDIDATE.md`, 100 lines,
  SHA-256
  `58185d8ed52931e3a6463b27b58c1f30f352c191ffbb6c171bac90273ddce9f5`;
- committed source identity: HEAD
  `0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
  `97b386172a899ef43b686ffbe43263395b3a7744`.

Both supplied document digests and both Git identities reproduced before the
semantic audit. The roster parses as JSON and declares schema version 7.

## Preserved ledger

The unchanged roster structure recomputes without drift:

- 48 active Vitest rows, 4 hard reservations, 1 conditional reservation,
  53 worst-case counted seats, 7 remaining seats, and 11 external rows;
- 64 unique IDs across all three top-level partitions;
- 13 same-seat pre-binding detector redresses and 20 rows with explicit case
  identity objects;
- 31 `base-product-tooling` rows with ordered-ID digest
  `76e5592586cbdf15a7df592ab2b1a94c09e295ba5a301a15dba80051ccfc7e3a`;
- 17 `component-behavior` rows with ordered-ID digest
  `222a1a54d747480b490b409d9668534673343219270a93f5831f2e0ad2a9fe2b`;
- the four admitted arbitrary-writer cases recompute to
  `27db32372c68f8d39495a4b983bb2ffefe70b211c52e4575145731740c89144c`;
- the frozen 48-subpath digest remains
  `118e091405270a3e1fa2ae9aea24c3805acc1a7a6a087dfd6c247e2f19776252`,
  and every eight-key spring identity remains
  `ef2496ddaffb7ef1a1efba36941c18440b83eb6ba8a7332d193877a7a297f7f`.

The C14-to-C15 semantic delta is confined to authority/schema advancement,
the live-writer carrier-execution redress, and the Chip boundary redress. It
does not silently change a seat, ID, semantic class, reservation, or unrelated
case identity.

## Live-writer audit — accepted

C15's source census is exact at the audited source identity: seven public,
runtime-reachable Glass SFCs contain eight governed Vue writer literals and
resolve to the six listed `reka-ui` component origins plus the two native
drawer sinks. The four grammar shapes match their named positive witnesses.

The new separation between origin forwarding and carrier composition is real:

- the component-sink sentinel proves only that the exact imported `reka-ui`
  origin can forward a class to connected native DOM;
- each `carrierExecutionWitness` separately mounts the exported Glass carrier,
  selects its live branch, and requires both exact built-in token strings on
  one named connected native owner;
- the carrier law expressly excludes the underlying-origin sentinel, harness,
  sibling, and wrong descendant from satisfying the Glass-carrier proof;
- filtering the two governed arbitrary-property families inside the resolved
  `src/components/_shared/class-names.ts` `cn` implementation removes the
  required classes from every actual carrier path while leaving source
  literals, bindings, origins, and direct-origin sentinels intact. The planted
  composition mutation therefore has the required bite.

I independently mounted all ten named branches against the current sources in
connected happy-dom with actual portals/teleports enabled. The ten probes all
reached the promised owner and exact classes:

1. Dialog center: `DIV[data-slot=dialog-content]` without `data-placement`;
2. Dialog side: `DIV[data-slot=dialog-content][data-placement=right]`;
3. Drawer footer root `DIV`;
4. Drawer header root `DIV`;
5. hover-root Popover portal `.popover-content` `DIV`;
6. click-root Popover portal `.popover-content` `DIV`;
7. click-root Popover inline `.popover-content` `DIV`;
8. Select portal `DIV[data-slot=select-content]`;
9. Toast `LI[data-slot=toast]` teleported below its viewport `OL`;
10. Tooltip portal `DIV[data-material=overlay]`.

The diagnostic probe passed 10/10 and was removed; no product, candidate, or
test byte was retained from that check. I found no residual carrier, owner,
branch, token, origin-versus-carrier, or `cn`-mutation formation defect.

## Decisive blocker — Chip still infers listener absence from non-delivery

The predicate at roster line 910 says the settled static host **has no** hostile
consumer click listener. The node law at line 936 repeats a
`hostile-listener-on-host` boundary, and the candidate note at lines 76–80 says
the host has no hostile listener. Those are structural absence claims.

The mechanism at roster line 924 does something narrower: it dispatches one
click at the captured static `SPAN` and requires the hostile spy to remain at
zero. The mutation at line 934 catches the ordinary unguarded forwarding of
that `onClick`, but neither the observation nor that one mutation establishes
that no listener is installed.

A conforming false-green mutant can put this forwarder on the exact static
host:

```ts
(event: MouseEvent) => {
    if (event.isTrusted) hostileConsumerOnClick(event)
}
```

The exact settled host is still a `SPAN`; all governed role, tabindex,
pressed/state, and descendant-button assertions remain green. A Vitest/
happy-dom synthetic click has `isTrusted === false`, so the hostile spy remains
zero. Yet the host does have a click listener that forwards the hostile
consumer callback for a user click. An `event.detail`, modifier, button, or
other event-field guard creates the same gap unless the single dispatched
event happens to select that arm. No choice of one event proves listener
absence.

This counterexample stays wholly on the exact static host. It does not rely on
a slot descendant, descendant-originated click, `contenteditable`, an unlisted
event, node replacement, or any boundary C15 explicitly places out of scope.
Consequently the candidate note's statement that the row now promises only
what its mechanism executes is false for these exact bytes.

## Required redress

Keep this as a same-seat correction, but make predicate and evidence coincide:

- either narrow the promise to exact behavioral non-delivery—for example, that
  one fully specified ordinary click dispatched at the captured static host
  does not call the supplied hostile consumer callback—and describe the exact
  event initialization in the mechanism and mutation; or
- retain the stronger no-listener promise and instrument
  `EventTarget.prototype.addEventListener`/`removeEventListener` before the
  lifecycle mount, tracking active `click` registrations by exact element and
  listener identity. At static settle, the captured `SPAN` must have no active
  tracked click registration and no `onclick` property handler before the
  behavioral dispatch. The exact host's attribute projection must still exclude
  every `on*` key. Mutations must include an `isTrusted`- or event-field-guarded
  forwarding registration (and an `onclick` assignment), not only the direct
  unguarded `onClick` case.

Until one of those boundaries is frozen in a new immutable candidate, C15
remains **REJECTED / FORMATION-RED / IMPLEMENTATION-INELIGIBLE**.
