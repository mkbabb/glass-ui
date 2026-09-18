# Lane B—R-3, the Boolean cast

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-a12e90f93942cc78d.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique
to this lane's prompt, `LANE B · rows R-3 (Boolean cast)`, so the datum is this seat's own
and not the parent session's) · **date** 2026-09-18 · **base** `master` @ `a53d67bc`
(step 0; landed on `df5c6f44`, docs-only, no lane path in it) ·
**spec of record** `docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md` §R-3
(§D lane table row `B · boolean cast`), sourced from the same directory's `RULINGS.md`.

The id matched `claude-opus-5*` before the first repo byte moved.

## Step-0 baseline

`git status --short` at first byte:

```
(empty)
```

`git diff --stat`: empty. `git rev-parse HEAD` = `a53d67bc0cf512cf4c2816440577d4f2fad0fa1d`.
The tree was CLEAN at step 0—no other lane had landed a byte. No predecessor RECORD
existed at `docs/tranches/BK/execution/2026-09-18-o26-cure/B/`, so this seat is the first.

Register receipt read at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Census

| file | + | - | note |
| --- | --- | --- | --- |
| `src/components/collapsible/Collapsible.vue` | 5 | 0 | withDefaults `open: undefined` + its comment |
| `src/components/chip/Chip.vue` | 10 | 1 | `defineProps` → `withDefaults`, `modelValue: undefined` ONLY |
| `src/components/labeled-field/LabeledSwitch.vue` | 8 | 1 | `defineProps` → `withDefaults`, `modelValue: undefined` |
| `src/components/labeled-field/types.ts` | 4 | 1 | `LabeledSwitchProps.modelValue?: boolean` |
| `tests/components/collapsible.contract.test.ts` | 28 | 0 | one witness |
| `tests/components/chip.contract.test.ts` | 31 | 0 | one witness + the `aria-pressed` guard |
| `tests/components/labeled-field.contract.test.ts` | 16 | 0 | one witness |
| `docs/tranches/BK/execution/2026-09-18-o26-cure/B/RECORD.md` | new | — | this record |

No new test FILE, no new gate seat, no MIGRATION row (the ledger's cure names none, and it
ratifies the one type move as non-breaking in place). `dist/` and `dist-demo/` are ignored
and carry no committed byte.

## Act ledger

### (1) `Collapsible.open`

**Ruling.** "`Collapsible.vue` withDefaults `open: undefined`"—one of the exactly four
bare Booleans "bound explicitly into a controlled prop".

**Edit.** `src/components/collapsible/Collapsible.vue:22-30`—`open: undefined` added to the
existing `withDefaults` block, with a four-line comment in the `CommandDialog.vue:10-36`
idiom naming the cast and what it did to `CollapsibleRoot`.

**Witness.** `tests/components/collapsible.contract.test.ts:68-93`, `honours default-open
when the controlled prop is absent`—an uncontrolled `<Collapsible default-open>` asserted
on the root's `data-state`, the trigger's `aria-expanded`, and the region.

- RED (old bytes): `AssertionError: expected 'closed' to be 'open'` at `:84`.
- GREEN (cured bytes): `Test Files 3 passed (3) · Tests 27 passed (27)`.

**Residue.** The witness's third assertion moved once, on measurement: reka stamps the
region's own `data-state` only while it is CLOSED—a probe of the rendered markup at both
states showed `data-state="closed"` on the shut region and NO such attribute on the open,
force-mounted one. So the assertion is `toBeUndefined()`, and the comment says why. This is
reka's shape, not the cure's: it is identical before and after the edit, and the region's
`data-state="closed"` on the old bytes is what makes that line RED too.

### (2) `Chip.modelValue`—and `defaultValue` deliberately NOT

**Ruling.** "`Chip.vue` withDefaults `modelValue: undefined` ONLY. … `Chip.defaultValue:
undefined` is a REGRESSION, not a cure—measured twice on a patched 9.0.0 dist, it strips
`aria-pressed` from a plain `<Chip mode="selectable">`."

**Edit.** `src/components/chip/Chip.vue:24-26` (the `withDefaults` call; its comment at `:17-23`)—`defineProps<ChipProps>()` became
`withDefaults(defineProps<ChipProps>(), { modelValue: undefined })`, the `Readonly<ChipProps>`
annotation kept. The comment carries the asymmetry and its reason, so nobody "completes" it.

**Witness.** `tests/components/chip.contract.test.ts:42-58`, `honours default-value when the
controlled prop is absent`, plus the fence at `:60-71`, `keeps aria-pressed on a bare
selectable chip`.

- RED (old bytes): `AssertionError: expected 'false' to be 'true'` on `aria-pressed`.
- GREEN (cured bytes): `Test Files 3 passed (3) · Tests 27 passed (27)`.

The `aria-pressed` fence was GREEN on the old bytes and stays GREEN on the cured ones—that
is its job. It is the executable form of the ledger's "measured twice" finding: it goes
RED the moment anyone adds `defaultValue: undefined`.

**Residue.** None.

### (3) `LabeledSwitch.modelValue` + the type widening

**Ruling.** "`LabeledSwitch.vue` withDefaults `modelValue: undefined` plus `types.ts`
`modelValue?: boolean`. … The LabeledSwitch type widening is ratified as non-breaking: the
runtime never enforced required."

**Edit.** `src/components/labeled-field/LabeledSwitch.vue:14-16` (the call; its comment at `:9-13`)—`withDefaults` with
`modelValue: undefined`; `src/components/labeled-field/types.ts:59` (the widened member; its comment at `:54-56`)—`modelValue:
boolean` → `modelValue?: boolean`, with the reason in three lines above the type.

**Witness.** `tests/components/labeled-field.contract.test.ts:199-215`, `honours default-value
on LabeledSwitch when the controlled prop is absent`.

- RED (old bytes): `AssertionError: expected 'false' to be 'true'` on `aria-checked` at `:210`.
- GREEN (cured bytes): `Test Files 3 passed (3) · Tests 27 passed (27)`.

**Residue.** `Switch.vue` was NOT touched. It declares `modelValue?: boolean` under a bare
`defineProps` and so carries the same compiled `{ type: Boolean }`, but the ledger rules its
`useForwardProps` seat INERT and scopes the cure to the four explicit bindings; the witness
above passes through `<Switch>` unaltered, which is the measurement that settles it for this
lane. Anything further is the adjudicator's, not this seat's.

## Born-RED protocol

The three witnesses were written and run BEFORE any source byte moved (`Tests 3 failed | 24
passed (27)`). After the cures landed, the Collapsible witness's third assertion was
corrected to the measured reka shape, so the RED was re-established for the FINAL witness
text: the three default keys were temporarily reverted in place, the trio re-run, and then
restored. Both runs are quoted per row above; the re-established RED read

```
× honours default-value when the controlled prop is absent
× honours default-open when the controlled prop is absent
× honours default-value on LabeledSwitch when the controlled prop is absent
Test Files  3 failed (3) · Tests  3 failed | 24 passed (27)
```

No git verb was used for the revert or the restore—it was an in-place text edit of the
three keys, per the shared-tree fence.

## Emitted-chunk receipt

`npm run build` under the scratchpad build lock (acquired, released; exit 0). The three
compiled prop tables, read out of `dist/`:

| chunk | emission |
| --- | --- |
| `dist/chip.js:47-50` | `modelValue: { type: [Boolean, null], default: void 0 }`—the ruled shape |
| `dist/chip.js:51` | `defaultValue: { type: Boolean }`—UNCHANGED, which is the ruling's other half |
| `dist/collapsible-D9SQoekP.js:25-28` | `open: { type: Boolean, default: void 0 }` |
| `dist/labeled-field.js:238-241` | `modelValue: { type: Boolean, default: void 0 }` |

This receipt is the lane's form of the ledger's emitted-chunk assertion, per the seat scope's
"(grep dist)": the three ruling-named contract tests read no dist, and an executable dist read
belongs to no file this lane may touch.

## Typecheck

```
npx vue-tsc --noEmit                        → exit 0, no diagnostics
npx vue-tsc --noEmit -p tsconfig.test.json  → exit 0, no diagnostics
```

Both arms of the `typecheck` script are clean; the widened `LabeledSwitchProps` produced no
diagnostic at any call site.

## Battery

```
timeout 900 npx vitest run
→ Test Files  233 passed (233)
  Tests  2224 passed | 10 expected fail (2234)
```

Log: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/B-implement-vitest.log`.
2224 is the O-20 close's 2220 plus this lane's four new tests (vitest counts tests, each
carrying two assertions); the 10 xfail are unmoved.

One intermediate run showed `tests/gates/boot-graph.test.ts` RED on its own build arm—
`dist-demo/index.html is STALE … run 'npm run demo:dist:build'`. That is the gate's staleness
clock, not a regression: this lane's source edits were newer than the committed demo build.
Running the remedy the assertion names (under the build lock, exit 0) returned it to GREEN.
No threshold, no gate file and no ratchet was touched.

## Gate receipt

```
timeout 120 node scripts/gate-register.mjs | tail -2
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Byte-identical to the baseline receipt above: `seats:60 … drift:0 … violations:0`,
`rosterSha256` unchanged. Gates stay 60, as R-3 requires.

## Files touched—the driver's pathspec

```
src/components/chip/Chip.vue
src/components/collapsible/Collapsible.vue
src/components/labeled-field/LabeledSwitch.vue
src/components/labeled-field/types.ts
tests/components/chip.contract.test.ts
tests/components/collapsible.contract.test.ts
tests/components/labeled-field.contract.test.ts
docs/tranches/BK/execution/2026-09-18-o26-cure/B/RECORD.md
```

Nothing outside the lane's named scope moved. `git status --short` at close shows exactly
these seven modified paths plus this record's untracked directory—no foreign path was
dirty at any point in this lane's run.

## Cure round 1

Seat: cure (Opus) · model `claude-opus-5`, asserted from this seat's own transcript
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-a7a1db5fc4eaa9864.jsonl`
(found by grepping the workflows tree for this prompt's unique phrase, `YOU ARE THE CURE
SEAT`; the sibling file there is the adjudicator's, `claude-fable-5-1`). Input:
`B-adjudication-1.json`, verdict `CURE-ROUND`, six rulings—four ACCEPT, two AMEND, none
REJECTED. Every accepted item is RECORD prose: no source or test byte moved this round.

| # | cure item | disposition |
| --- | --- | --- |
| 1 | `:79` Chip Edit cite, un-nest the backticks | applied |
| 2 | `:102` LabeledSwitch Edit cite | applied |
| 3 | `:103` types.ts Edit cite | applied |
| 4 | `:143` `dist/chip.js:47-50`, drop "verbatim" | applied |
| 5 | `:144` `dist/chip.js:51` | applied |
| 6 | `:167` four new *tests*, not assertions | applied |
| 7 | `:7` landing-base clause beside the step-0 sha | applied |
| 8 | emitted-chunk receipt, the "(grep dist)" line | applied |
| 9 | tighten every spaced em dash | deviated (one cell, below) |
| 10 | read-back only, re-run nothing | applied |

Cites re-measured on disk before they were written, not copied from the adjudication:
`Chip.vue` call at `:24-26` with its comment at `:17-23`; `LabeledSwitch.vue` call at
`:14-16`, comment `:9-13`; `types.ts` member at `:59`, comment `:54-56`; `dist/chip.js`
`modelValue` at `:47-50`, `defaultValue` at `:51`. `git show --stat df5c6f44` reads one
file, `docs/tranches/BK/EXECUTION-PROGRESS.md`, +182—docs-only, no lane path, so item 7's
clause is true as written.

**Deviation, item 9.** Sixteen of the seventeen spaced dashes tightened. The seventeenth is
the census table's empty-cell placeholder at `:43`, `| new | — | this record |`: its spaces
are that table's cell padding, matching every other row, not prose spacing around an em
dash. Tightening it alone would break the table's own idiom, so it stands. Two line-end dashes
(:91, :175) escaped the round-1 `' — '` grep and were tightened in round 2.

Read-back receipts. `git diff --stat` is byte-identical to the round's start (7 files,
+102/-3), and `git status --short` shows the same seven modified paths plus the untracked
record directory. The gate register, re-run after the prose edits:

```
timeout 120 node scripts/gate-register.mjs | tail -2
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 … violations:0`, `rosterSha256:282d05cf`—unchanged from both the
baseline and the implement close. The battery, typecheck and dist receipts stand as banked;
item 10 ordered no re-run and no witness was touched.

**Residue.** None beyond the item-9 deviation above.
