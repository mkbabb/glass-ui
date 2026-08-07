# CURE-ORDER #41 W-SORTABLE — driver-ratified residue of the Φ5 adjudication (2026-08-07)

Adjudicator (Fable) ruled CURE-REQUIRED at HEAD `e286d992`; the driver ratifies the full
residue below verbatim as the cure order. What STANDS and must not be redone: the
selection, the whole strike half, D1's cure (stamp-before-clone), the a11y transaction
(five announcement literals byte-identical), the same-list vacancy/motion engine, seats
+0, the born-RED census (24/28 at pristine overlay), mutation bites, LOC honesty (+352
disclosed), the three derivations, the routed/RT-41A dispositions.

## Code cures (born-RED first where a case is named)

- **C1** `src/components/sortable-list/drag.ts:336-337` — `commit()` measures `sourceEl`
  unconditionally while `partLeaving` leaves the source row at its resting slot, so every
  cross-list drop flies the release plate back to the SOURCE list, not the target vacancy.
  Cure: when `nextProposal.target !== null`, resolve the foreign landing rect from the
  TARGET instance — e.g. an InstanceHandle vacancy-rect read returning the resting top of
  the target's row at the insertion index (where `partForExternal` opens the gap), or the
  target container box for append/empty — and fly the plate there. Add a born-RED battery
  case asserting the cross-list flight endpoint lies within the target container's box.
- **C2** `src/components/sortable-list/styles.css:40/:43` — `min-block-size` cannot exceed
  a populated receiver's natural height under `overflow: clip`, so the displaced last row
  is clipped; D4 is fixed on the empty arm only. Cure: a populated armed receiver adds one
  pitch of block room instead of clipping — e.g.
  `.sortable-list[data-sortable-armed] { padding-block-end: var(--sortable-vacancy-block) }`
  with the transition list extended (keeping the min-block-size empty arm), or write the
  var as natural+subject for the populated case. Add a born-RED populated-receiver case;
  restate ledger D4 as FIXED-EMPTY-ARM-ONLY until cured.
- **C3** `src/components/sortable-list/styles.css:98-102` — `space-between` distributes
  THREE flex items (the `order:-1` grip included), so the two-pole rule paints a centred
  label in thirds against its own comment. Cure: exclude the grip from distribution (e.g.
  keep `justify-content: flex-start` and give the last non-handle child
  `margin-inline-start: auto`, matching the rule's own comment), and tighten the owed F13
  π criterion so a centred-thirds paint cannot pass the ≥60% ink measure.
- **C4** `src/components/sortable-list/drag.ts:329-331` — the vanished-source
  (`sourceIndex < 0`) early-return in `commit()` orphans the ghost (cleanup never touches
  it; the next `activate()` overwrites the reference, leaving a fixed z-9999 plate on
  `document.body`). Cure: route that path through the ghost's retirement (releaseGhost to
  sourceRect, or destroy+null) BEFORE `cleanup()`.
- **C5** `src/components/sortable-list/drag.ts:200` — `resnapshot()` re-applies
  `partLeaving`/`partForExternal` only on the `target === null` arm, so a foreign
  proposal's partLeaving drops until the next pointermove. Cure: when
  `proposal.target !== null`, re-apply `partLeaving(source)` and refresh the foreign
  target's `partForExternal` with the re-measured block.

## Record cures (C6 — strike-in-place with dated brackets, only on bytes genuinely on disk)

In `docs/tranches/BK/execution/2026-08-05-row41-sortable/RECORD.md` (+ the named test headers):
- §7 ghost-frost figure `blur(11px) saturate(1.6)` → the painted
  `blur(20px) saturate(1.5)` at `--glass-level` 1 (`glass.css:88/:98/:110`), or route the
  criterion with RT-38C.
- dragController coordinates `:71/:171` → `:72/:177`; unclaim the "(verified)" dist byte
  offsets (45637/46026 vs measured ~39189/39578); cure the duplicated figures in
  `tests/components/sortable-list/battery.test.ts`'s header.
- `EXECUTION-DAG:43` cite → `:45`, and engage the ⊕⁴⁷ "#34 selectable" driver ruling.
- overfit-structure owner `#19` → the #40/#71 morph lane's.
- M2 mutation reds homed 2×G-2 + 1×G-13.
- divergence-3 disclosure: ring band `color-mix` 30% vs spec 0.48; `outline: none` drops
  the outline half.
- Name the two slider re-point lines in `tests/components/a11y/coarse-target.test.ts` and
  `tests/styles/radius-role-canon.test.ts` as #35's bytes carried in the shared tree, not
  this row's edit.

## Banking (C7)

Re-draft BOTH paste blocks post-cure. The current ⊕⁴⁹ cursor block and TR row-41 cell bank
"closes by construction", the unqualified vacancy-indicator claim, and the release-flight
claim that C1/C2 falsify — they MUST NOT be appended as written. Use a `<SHA>` placeholder
and state so.

## Carried (not this cure seat's)

- π-41 OWED post-cure: route `/data/sortable-list`, light AND dark, Safari BLOCKING via
  `scripts/safari-probe.mjs` (never Playwright-WebKit), with the corrected frost figure and
  two new paired cells covering the C1 flight endpoint and the C2 populated receiver.
- RT-41A (readerless dropIndex → #64 TIER-3 RESIDUAL) stands; the G-14 route to #22's
  receiver matrix stands.
