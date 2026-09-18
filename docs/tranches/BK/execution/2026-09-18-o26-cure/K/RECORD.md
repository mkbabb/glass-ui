# Lane K — R-8, the keyboard-registry suspension

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-a64e8bada17063ad8.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique
to this lane's prompt, `LANE K · rows R-8 (keyboard registry`, so the datum is this seat's
own and not the parent session's) · **date** 2026-09-18 · **base** `master` @ `c1f266ad`
· **ruling of record**
`docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md` §A R-8 (KSM R-1 + R-8 +
R-16 + R-17), §D lane table row `K · keyboard`.

The assertion gates the chain: the id was read from the transcript and matched against
`claude-opus-5*` before the first repo byte was written. Read-only measurements (`vitest`,
`vue-tsc`, the reka source reads under `node_modules/`) ran after the id was established.

## Step-0 baseline

`git status --short` at first byte, before anything this lane wrote:

```
(empty)
```

`git rev-parse HEAD` = `c1f266adbace4112d090db6ed02e71afb3deeb19`. The tree was CLEAN at
step 0 — Lanes A and B had already landed and committed (`c1f266ad`, `ae17992c`); nothing
of theirs was dirty and nothing of theirs was touched. No predecessor output existed at
`docs/tranches/BK/execution/2026-09-18-o26-cure/K/`, so this seat is the first on the lane.

Lane test file at baseline: `8 passed (8)` in `tests/composables/useKeyboardShortcuts.test.ts`.

## Census

The instrument is `git diff --numstat` against `c1f266ad`, read after cure round 1 — the
added/removed pair per file, not a `--stat` total.

| file | + | - | note |
| --- | --- | --- | --- |
| `src/composables/keyboard/useKeyboardShortcuts.ts` | 165 | 9 | the barrier stack, `suspendShortcuts`, `formatComboLabel`, `LabeledShortcut`, the `defaultPrevented` guard |
| `src/components/_shared/overlay/shortcuts.ts` | new | — | `useModalShortcutBarrier` — the one watch the four overlays share |
| `src/components/_shared/overlay/index.ts` | 1 | 0 | its re-export |
| `src/components/dialog/DialogContent.vue` | 8 | 0 | enrolment (covers `Dialog` and `CommandDialog`) |
| `src/components/sheet/SheetContent.vue` | 7 | 0 | enrolment |
| `src/components/popover/PopoverContent.vue` | 10 | 0 | enrolment, `modal` only |
| `src/components/menu/DropdownMenuContent.vue` | 20 | 0 | enrolment, `modal` only, both menu roots |
| `demo/shell/AppShell.vue` | 8 | 2 | `formatComboLabel`'s first consumer |
| `tests/composables/useKeyboardShortcuts.test.ts` | 79 | 0 | five witnesses |
| `tests/components/dialog/dialog-focus-return.test.ts` | 58 | 0 | the enrolment witness (cure round 1) |
| `tests/demo/shortcut-kbd-a11y.test.ts` | 7 | 2 | the W2-C assertion follows the shell to the spoken form |
| `MIGRATION.md` | 43 | 0 | the R-8 rows, re-seated at the end of §9.0.0 under `_Amended after 9.0.0_` |
| this RECORD | new | — | — |

No test FILE was minted; every witness landed in the two existing tests the ruling names.
No gate was minted. `.bundle-ratchet`, `.published-roster` and every threshold are
untouched.

## R-8 (a) — `suspendShortcuts()`

> "a monotonic registration `seq` plus a barrier stack; while suspended, non-Escape keys
> reach only shortcuts registered AFTER the suspension; Escape ignores the barrier and
> keeps its LIFO walk; within any layer the first registrant still wins".

**The edit.** `src/composables/keyboard/useKeyboardShortcuts.ts:429-439` —
`suspendShortcuts()` pushes a `Barrier` carrying the registry's current high-water `seq`
and returns a release that splices that barrier out BY IDENTITY, so it is idempotent and
nested suspensions may resume in any order. The counter lives in the global registry
(`:348`, `counter = { seq: 0 }`) and each entry takes
`seq: ++counter.seq` at `:382`. The dispatcher reads the top barrier at `:304-307` and
skips `shortcut.seq <= topBarrier` at `:322`; `topBarrier` resolves to `-1` for an Escape
event, which is how Escape ignores the barrier while keeping the reversed walk it already
had.

`seq` is carried on an INTERNAL `RegistryEntry extends RegisteredShortcut` (`:53-59`), not
on the published `RegisteredShortcut` — a consumer can do nothing with a registration
ordinal, and widening the public shape was not ruled.

**The witness.** `tests/composables/useKeyboardShortcuts.test.ts` —
"barriers app bindings behind a suspension and restores them on resume" (an app `k`
binding silent while suspended; a `k` registered after the barrier still answers; `resume()`
called twice pops one barrier and the app binding returns on the original FIFO footing);
"holds FIFO inside a layer — a late registrant cannot shadow the modal's Delete"; and
"lets Escape through the barrier, still LIFO".

RED (old bytes): `TypeError: suspendShortcuts is not a function` — `Test Files 1 failed (1) · Tests 5 failed | 8 passed (13)`.
GREEN (cured bytes): `Test Files 1 passed (1) · Tests 13 passed (13)`.

**Residue.** The barrier is process-global, as the registry is. A suspension raised and
never released outlives the component that raised it; `useModalShortcutBarrier` releases
on scope dispose for exactly that reason, and a hand-rolled caller owns the same duty —
stated in the docblock.

## R-8 (b) — `formatComboLabel()`

> "the spoken-word form beside `formatComboParts`, reading the registry's own alias table
> … 'delete' → "Delete or Backspace", canonical token first, single letters upper-cased,
> 'mod+shift+z' → "Control Shift Z"".

**The edit.** `src/composables/keyboard/useKeyboardShortcuts.ts:213-273` — `SPOKEN_MODIFIERS`
and `SPOKEN_KEYS` beside the glyph table, `speakPart`, and the exported
`formatComboLabel` at `:272`. The modifier rows are the glyph rows' READING, measured off
`formatPart` so the two can never disagree: `⌘`→Command, `⌃`→Control, `⌥`→Option, and
`mod` resolves per platform exactly as the glyph does (`isMac ? "Command" : "Control"`,
against the glyph's `⌘ / Ctrl`). The alias arm reads `KEY_ALIASES` itself — canonical
token first, then every alias that is a different word; an alias the canonical word STARTS
WITH is an abbreviation of it (`esc`/`escape`) and a whitespace alias (`space`'s `" "`) has
nothing to say, so both drop out. Single letters fall to `capitalize`, which upper-cases
them.

**The witness.** `tests/composables/useKeyboardShortcuts.test.ts` — "speaks a combo for an
accessible name, canonical alias first": `delete` → "Delete or Backspace", `enter` →
"Enter or Return", `escape` → "Escape", `space` → "Space", `mod+shift+z` → "Control Shift
Z" (mac: "Command Shift Z"), `Shift+ArrowLeft` → "Shift Left Arrow".

RED: `TypeError: formatComboLabel is not a function`. GREEN: passes in the 13.

**Residue.** The mac spelling is a MEASUREMENT, not a ruled literal: the ledger gives only
the non-mac "Control Shift Z". "Command Shift Z" is what the glyph table's `⌘` implies and
is what the test asserts under `isMac`. Flagged for the adjudicator as the one place this
lane chose a word the ruling did not spell.

## R-8 (c) — `LabeledShortcut`

> "`LabeledShortcut extends RegisteredShortcut { label: string }` as the element type of
> `useRegisteredShortcuts()` … type-only narrowing, non-breaking, the runtime already
> filters on label."

**The edit.** `src/composables/keyboard/useKeyboardShortcuts.ts:43-51` — the interface;
`:441` — `useRegisteredShortcuts(): ComputedRef<LabeledShortcut[]>`; `:359-364` — the
`labeled` computed's filter is now a type predicate, so the narrowing is earned rather than
asserted.

**A DEVIATION IN LETTER, recorded rather than improvised past.** The ruling's literal shape
is a TOP-LEVEL `label: string`. There is no such field at runtime: `registerShortcut` puts
the label in `options.label` (`:370-383`), and the computed filters on
`shortcut.options.label`. A top-level `label: string` would type a field that reads
`undefined` — a masking defect, and precisely the kind of claim-with-no-paint this tranche
strikes. The narrowing shipped is therefore
`options: ShortcutOptions & { label: string }`, which is the same guarantee stated against
the field the runtime actually fills, under the ruled NAME and at the ruled position
(the element type of `useRegisteredShortcuts()`). If the adjudicator reads the letter as
binding, the cure is a one-line change and this note is the flag.

**The witness.** The existing "exposes labeled registrations for shortcut help UIs" arm
still passes unchanged, and `npm run typecheck` is clean, which is where a type-only
narrowing is observable.

## R-8 (d) — the `defaultPrevented` guard

> "The one-line `if (e.defaultPrevented) return;` guard lands in the SAME cut with a
> MIGRATION bracket (a behaviour change, not an API break)".

**The edit.** `src/composables/keyboard/useKeyboardShortcuts.ts:291-298` — the guard at the
head of `dispatchShortcut`, before the order is resolved.

**The witness.** `tests/composables/useKeyboardShortcuts.test.ts` — "ignores a keydown
another layer already consumed": a `cancelable` keydown with `preventDefault()` already
called reaches the registry and fires nothing.

RED (old bytes, `K-red.log:26`): `AssertionError: expected "vi.fn()" to not be called at
all, but actually been called 1 times`. GREEN: passes in the 13.

**Residue.** The surviving scenario the ruling names is the nested esc-stack story
(`demo/stories/containers/expandable-container.vue:126,134`); the test that covers it is
`tests/components/expandable-container.contract.test.ts`, which is GREEN in the battery
below, unmodified.

## R-8 (e) — in-house enrolment

> "the modal overlays—Dialog, Sheet, CommandDialog, and Menu/Popover only when `modal`—call
> `suspendShortcuts()` on open and the returned resume on close, the implement seat
> MEASURING which components are modal by reka contract before wiring."

**The measurement.** Every one of the four reka roots publishes BOTH `open` and `modal` on
its context, so "is this overlay modal right now" is answerable without a new prop:
`DialogRoot` (`node_modules/reka-ui/dist/Dialog/DialogRoot.js:43-47`, `{ open, modal,
unmountOnHide, … }`), `PopoverRoot` (`Popover/PopoverRoot.js:38-41`), `DropdownMenuRoot`
(`DropdownMenu/DropdownMenuRoot.js:44-55`) and `ContextMenuRoot`
(`ContextMenu/ContextMenuRoot.js:37-43`). `MenuRootContext` itself carries `modal` but NOT
`open` (`Menu/MenuRoot.js:48-54`), which is why the menu arm injects the two OUTER roots
and not it. reka's `createContext` returns the fallback without throwing when one is
passed (`shared/createContext.js:20-23`), so a `null` fallback is the supported way to ask
for a root that may not be overhead.

**Which components are modal, and the answer for each.**

| component | measured | wired |
| --- | --- | --- |
| `Dialog` + `DialogContent` | `DialogRoot.modal` defaults `true` | `DialogContent.vue:77`, on `open && modal` |
| `CommandDialog` | renders `Dialog` + `DialogContent` (`CommandDialog.vue`), no root of its own | covered by the line above — no second wiring |
| `Sheet` (`SheetContent`) | a `DialogRoot` by contract (`SheetContent.vue` injects `injectDialogRootContext`) | `SheetContent.vue:114`, on `open && modal` |
| `DropdownMenu` (click + context) | `modal` prop, house default `true` (`DropdownMenu.vue`), forwarded to both reka roots | `DropdownMenuContent.vue:74-79`, on `open && modal` of whichever root the live trigger names |
| `Popover` | `modal` prop, house default `false`; the hover arm is a `HoverCardRoot` and is never modal (`PopoverContent.vue` already derives `isModal`) | `PopoverContent.vue:119`, on `isModal && open` |

`modal` is the measurement everywhere, including for Dialog and Sheet: a `modal={false}`
dialog leaves the page operable, and taking its keyboard away would be a claim the layer
does not enforce. That is the ruling's own test ("only when `modal`") applied to the whole
set rather than to two of it.

**The edit.** `src/components/_shared/overlay/shortcuts.ts` —
`useModalShortcutBarrier(active)`: one `immediate`, `pre`-flush watch that raises the
barrier while `active` reads true and releases it otherwise, plus an `onScopeDispose` arm.
Four hand-rolled copies of a suspend/resume pair is four places to forget the resume; this
is the shape `useDockParticipation` already takes in the same folder for the same reason.
It is re-exported from `src/components/_shared/overlay/index.ts:24` and has FOUR call sites,
so it clears the overfitting bar. It is internal — no public barrel exports it, and the only
new door on `./keyboard` is the three ruled symbols.

**ORDERING, which is the whole contract.** The watch is `immediate` in SETUP and flushes
`pre`, so the barrier is raised before the render that mounts the overlay's slot content —
i.e. before anything inside the modal registers a binding, which is what the barrier's
`seq > topBarrier` rule requires. Stated in the docblock at both ends
(`useKeyboardShortcuts.ts:401-428` and `shortcuts.ts:15-24`).

**`useRegisteredShortcuts()` is NOT barrier-filtered**, by design and stated
(`useKeyboardShortcuts.ts:422-424`): it is the reference list of what the app answers to,
not a live capability probe, and the help overlay is itself a modal that filtering would
hand an empty list.

**The first consumer of (b).** `demo/shell/AppShell.vue:360` — the glyph-built accessible
name `:aria-label="formatCombo(shortcut.raw)"` becomes
`:aria-label="formatComboLabel(shortcut.raw)"`, and the import at `:20` follows. The
existing W2-C source assert in `tests/demo/shortcut-kbd-a11y.test.ts` pinned the OLD
spelling by regex and went RED on the change; its third arm now asserts the spoken form,
with the reason in place. The `<kbd>` parts stay unlabelled — the de-dup that test exists
for is untouched.

**The enrolment witness** [2026-09-18 · adjudication-1 F2 — the enrolment was a ruled
clause with no test; `grep -rn useModalShortcutBarrier tests/` was empty and the mutants
that deleted the `DialogContent.vue` call and the `onScopeDispose` arm both stayed GREEN].
`tests/components/dialog/dialog-focus-return.test.ts` — "suspends the app's accelerators
while the modal plate is open", one `it` in the existing describe, no new file. It
registers an app binding on `k` BEFORE the plate mounts, then asserts three edges through
a real portaled mount (the file's `mountDialog` opts out of the teleport stub, so the
content lands in `document.body`): quiet while open, live again after the logical close
even though the content is still mounted under the exit spring, and live again after a
wrapper unmounted WHILE open — the `onScopeDispose` arm. Born-RED by commenting out
`src/components/dialog/DialogContent.vue:77` in place and restoring the byte after the run
(no git verb).

RED (`K-cure1-red.log:10`): `AssertionError: expected "vi.fn()" to not be called at all,
but actually been called 1 times` — `Test Files 1 failed (1) · Tests 1 failed | 1 passed (2)`.
GREEN (`K-cure1-green.log`): `Test Files 1 passed (1) · Tests 2 passed (2)`.

## R-8 (f) — MIGRATION

> "one bracketed note under the NEXT (unreleased) section in the file's own convention
> recording the behaviour changes (defaultPrevented honoured; app bindings quiet behind
> glass modals)".

**The measurement.** The file has NO open unreleased section: `## 9.0.0` is bracketed LIVE
(`MIGRATION.md:8`) and `## 8.1.0` is bracketed as shipped inside it (`:158-160`). The O-20
cure wave's precedent for unreleased work is a dated bracket under an `_Amended after
9.0.0_` marker INSIDE the section its subject lives in (`:222-225` after the re-seat) — but the keyboard
registry has had no section since 5.0.0 (`:2660`, "1.4—Keyboard registry → `/keyboard`"),
so there is nothing to amend.

**The edit** [2026-09-18 · adjudication-1 N3 — RE-SEATED in cure round 1: the block now sits
at `MIGRATION.md:115-158`, at the END of §9.0.0 immediately before `## 8.1.0`, under
`_Amended after 9.0.0_`; the reasoning below stands except for the heading, which was a
structure mint]. `MIGRATION.md:8-49` — a new `## NEXT — UNRELEASED (not on the registry)`
section above `## 9.0.0`, opening with the dated bracket
`[2026-09-18 · O-26 R-8, the keyboard-registry cure: …]` in the file's own convention, and
carrying two rows cited by heading: _The keyboard registry honours `defaultPrevented`, and
modal overlays quiet the app's bindings_ (the two behaviour changes, each with what a
consumer who relied on it was relying on) and _`@mkbabb/glass-ui/keyboard` gains
`suspendShortcuts` · `formatComboLabel` · `LabeledShortcut`_ (the table of new doors). The
subpath is named in the heading, as the ruling requires ("the reply names
`@mkbabb/glass-ui/keyboard` or it is unactionable"). Spaced em dashes throughout, per this
file's own convention.

**Residue.** A later O-26 lane with its own unreleased row adds it under the same
`_Amended after 9.0.0_` marker at the end of §9.0.0, rather than minting a second marker
or a heading — the marker is the file's convention for post-publish work and one per
section is the whole of it.

## Build

`npm run build` under the scratchpad lock (`scratchpad/build.lock`, taken before and
`rmdir`'d after), exit 0. The three symbols ship on the `./keyboard` door:

```
dist/keyboard.js:151:export { h as formatCombo, b as formatComboLabel, m as formatComboParts,
  o as isMac, w as registerShortcut, T as suspendShortcuts, E as useRegisteredShortcuts };
dist/composables/keyboard/useKeyboardShortcuts.d.ts:27: export interface LabeledShortcut extends RegisteredShortcut {
dist/composables/keyboard/useKeyboardShortcuts.d.ts:48: export declare function formatComboLabel(raw: string): string;
dist/composables/keyboard/useKeyboardShortcuts.d.ts:72: export declare function suspendShortcuts(): () => void;
dist/composables/keyboard/useKeyboardShortcuts.d.ts:73: export declare function useRegisteredShortcuts(): ComputedRef<LabeledShortcut[]>;
```

`npm run demo:dist:build` also ran under the same lock: `tests/gates/boot-graph.test.ts`
requires `dist-demo/` to be NEWER than every source it is built from, and this lane's src
edits made the committed-tree-independent local build stale. `dist-demo/` is gitignored
(`.gitignore:65`), so this refreshes a local artefact and commits nothing.

`npm run typecheck` (`vue-tsc --noEmit` + the test project): clean, no output.

## Battery

`timeout 900 npx vitest run` (the whole suite, not the lane's files), log at
`/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/K-implement-vitest.log`:

```
Test Files  233 passed (233)
     Tests  2238 passed | 10 expected fail (2248)
```

Files 233 · passed 2238 · failed 0 · xfail 10. The `10 expected fail` is the standing
count this tranche carries, unmoved by this lane.

The intermediate run's log was OVERWRITTEN by the final one, so the two lines below are
this seat's recollection and not a readable artefact [2026-09-18 · adjudication-1 K-B-5 —
from cure round 1 on, every run writes its own path]. It had `2 failed | 2236 passed`,
both of them this lane's own work
surfacing and both cured in it, not worked around:
`tests/demo/shortcut-kbd-a11y.test.ts` pinned the shell's OLD `formatCombo` spelling by
regex and its third arm now asserts the spoken form; `tests/gates/boot-graph.test.ts`
went RED on a stale `dist-demo/`, cured by the `demo:dist:build` recorded above. The
bundle ratchet gate is inside this battery and is GREEN — `.bundle-ratchet` untouched.

## Gate receipt

`timeout 120 node scripts/gate-register.mjs 2>&1 | tail -3` (there is no `verify:gates`
script; `grep -n '"verify' package.json` finds only `verify:package`, and `gate-register`
is what prints the seat line):

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 · drift:0 · violations:0`, and the line is byte-identical to the O-20 baseline
banked at `docs/tranches/BK/execution/2026-09-17-o20-cure/D/RECORD.md` — UNCHANGED. No
gate was minted, retired or re-bound.

## Files touched — the driver's pathspec

```
src/composables/keyboard/useKeyboardShortcuts.ts
src/components/_shared/overlay/shortcuts.ts
src/components/_shared/overlay/index.ts
src/components/dialog/DialogContent.vue
src/components/sheet/SheetContent.vue
src/components/popover/PopoverContent.vue
src/components/menu/DropdownMenuContent.vue
demo/shell/AppShell.vue
tests/composables/useKeyboardShortcuts.test.ts
tests/components/dialog/dialog-focus-return.test.ts
tests/demo/shortcut-kbd-a11y.test.ts
MIGRATION.md
docs/tranches/BK/execution/2026-09-18-o26-cure/K/RECORD.md
```

`src/components/_shared/overlay/shortcuts.ts` is the one NEW file and is untracked until
the driver's commit. `dist/` and `dist-demo/` are build output and are not in the
pathspec. Nothing outside this list was written.

## For the adjudicator

Two items carry a flag, neither improvised past:

1. **(c) the `LabeledShortcut` letter.** The ruling's literal `{ label: string }` names a
   field the runtime does not fill; the narrowing shipped is
   `options: ShortcutOptions & { label: string }` under the ruled name and at the ruled
   position. Full reasoning in the R-8 (c) section.
2. **(b) the mac spelling.** "Command Shift Z" is measured off the glyph table's `⌘`, not
   given by the ruling, which spells only the non-mac "Control Shift Z".

## Cure round 1

**Seat** cure · **model** `claude-opus-5[1m]` (asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-af3041277700ff553.jsonl`,
the only file in the workflows tree carrying `YOU ARE THE CURE SEAT`; `modelId` reads
`claude-opus-5[1m]`, which matches `claude-opus-5*`) · **date** 2026-09-18 · **adjudication**
`scratchpad/o26cure/K-adjudication-1.json` (`K-adjudicator-1`, `claude-fable-5-1`,
verdict CURE-ROUND). Every `cureList` item 1–7 applied in order; item 8 is the driver's.
Nothing REJECTED was applied — the adjudication rejected nothing.

**F1 — the guard's grounds were wrong, the guard stands.** Three in-house keydown paths DO
`preventDefault`: `src/composables/search/useFuzzySearch.ts:104,110,116,122` (composed live
at `src/components/dock/composables/useDockSearch.ts:181`),
`src/components/tabs/composables/useTabRovingFocus.ts:183-201` and
`src/components/sortable-list/drag.ts:589,604,617`. The LEDGER's grounds clause "nothing in
our tree preventDefaults a keydown" (`:427-428`) is false, and the MIGRATION row restated
it. No logic changed. `useKeyboardShortcuts.ts:291-297` — the dispatcher comment now names
the three consumers and states the asymmetry the file never said out loud: Escape is exempt
from the BARRIER (a modal must stay dismissable) and NOT from this GUARD (an Escape a layer
consumed was that layer's dismissal, the same read reka's `DismissableLayer` applies).
MIGRATION carries both clauses. **For the driver:** re-rule the R-8 (d) grounds in the
LEDGER with a dated bracket — the cure is unchanged, the grounds were wrong
(`cureList` item 8).

**F3 — the ordering contract composes with register-on-open, and now says so.**
`useKeyboardShortcuts.ts:412-416` — one docblock paragraph after ORDERING: content that
stays mounted across a close (`force-mount`, `unmount-on-hide="false"`, a reopen inside the
exit spring) keeps the seq it took at mount and falls BELOW the next barrier, so register on
open and release on close, as `ExpandableContainer.vue:213` does inside its open watch. The
same clause goes in the MIGRATION `suspendShortcuts` row. No mechanism changed: the house
law already resolved it, the public contract did not carry it.

**N1 — the dead `released` flag is gone.** `useKeyboardShortcuts.ts:435-437`. Every
suspension pushes a NEW barrier object, so `barriers.indexOf(barrier)` is `-1` after the
first splice and the flag guarded nothing (mutant M6 survived it). The identity splice IS
the idempotence, and the docblock already said so.

**N2 — the dead `candidate !== ""` clause is gone.** `useKeyboardShortcuts.ts:249-260`
(the alias comment and filter inside `speakPart`, which opens at `:242`).
`KEY_ALIASES.space` is `[" "]` and `" ".trim()` is `""`, which every string starts with, so
the `startsWith` guard already dropped the whitespace alias (mutant M12 survived the
clause). The comment now names the one guard that acts and both cases it covers.

**N3 — the MIGRATION rows are re-seated in the file's own convention.** The `## NEXT —
UNRELEASED (not on the registry)` heading was a structure mint: every `## ` in this file is
a version, and the file's precedent for post-publish unreleased work is `_Amended after
9.0.0_` plus a dated bracket INSIDE the version section (`MIGRATION.md:222-225`). The block
moved to the END of §9.0.0, immediately before `## 8.1.0`, under `_Amended after 9.0.0_` and
the bracket rewritten in that form. The computed task's "NEXT (unreleased) section" loses to
the convention it told the seat to read first.

**K-B-1 — the census is `git diff --numstat` now**, not `--stat` totals in the `+` column
with invented `-` figures; the instrument is named above the table and the
`dialog-focus-return.test.ts` row is added.
**K-B-2 — the (d) RED line is the verbatim `K-red.log:26` text.**
**K-B-3 — no edit owed**: `tests/demo/shortcut-kbd-a11y.test.ts` pins the shell's aria-label
spelling by source regex and went RED on the ruled `AppShell.vue` edit; the repair follows
the change and the R-8 (e) paragraph is its justification.
**K-B-4 — `Sheet` for `SheetContent`** in the MIGRATION barrier paragraph: the consumer
imports `Sheet`.
**K-B-5 — every run in this round writes its own path**, cited below and in (e); the
implement round's overwritten intermediate run is flagged as recollection where it appears.

**Build** (`scratchpad/build.lock` taken, `npm run build` exit 0 → `K-cure1-build.log`,
`npm run demo:dist:build` exit 0 → `K-cure1-demo-build.log`, lock `rmdir`'d). The door is
unchanged:

```
dist/keyboard.js:147:export { h as formatCombo, b as formatComboLabel, m as formatComboParts,
  o as isMac, w as registerShortcut, T as suspendShortcuts, E as useRegisteredShortcuts };
dist/keyboard.d.ts: export * from "./composables/keyboard/index.js";  → LabeledShortcut in
  dist/composables/keyboard/useKeyboardShortcuts.d.ts
```

`npm run typecheck` (`K-cure1-tsc.log`): exit 0, no diagnostics.

**Battery.** `timeout 900 npx vitest run`, log
`scratchpad/o26cure/K-cure1-vitest.log`:

```
Test Files  233 passed (233)
     Tests  2239 passed | 10 expected fail (2249)
```

Files 233 · passed 2239 · failed 0 · xfail 10 — one more passing test than the implement
round, the enrolment witness. (The first cure-round run, before `demo:dist:build`, had the
one stale-`dist-demo` failure in `tests/gates/boot-graph.test.ts`; the build cured it.
Unlogged; recollection, the log was overwritten by `K-cure1-vitest.log`.)

**Gate receipt.** `timeout 120 node scripts/gate-register.mjs 2>&1 | tail -3`
(`K-cure1-gates.log`):

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 · drift:0 · violations:0`, `rosterSha256` unchanged from the implement round and
from the O-20 baseline. No gate minted, retired or re-bound; no threshold file touched.

**Files touched this round.** `src/composables/keyboard/useKeyboardShortcuts.ts` ·
`tests/components/dialog/dialog-focus-return.test.ts` (new `it`, existing file) ·
`MIGRATION.md` · this RECORD. `src/components/dialog/DialogContent.vue` was edited and
restored byte-for-byte for the born-RED probe — `git diff` shows it exactly as the implement
round left it.

## Cure round 2 (driver residue)

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's OWN transcript, `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/agent-a3cc8e2013e47b387.jsonl`) · **adjudication** `scratchpad/o26cure/K-adjudication-2.json` — six edits, five in this record: the `released`-flag clause struck from R-8 (a) (N1 deleted the flag), every stale source citation re-pointed to the cured file and verified on disk with `sed`/`awk` (`:422-424`, not the listed `:422-425` — line 425 is a bare `*`), the R-8 (f) Residue paragraph rewritten for the `_Amended after 9.0.0_` marker N3 left in place of the minted heading, the `## 8.1.0` bracket re-cited `:158-160`, and the cure-round-1 battery parenthetical marked unlogged recollection.
**The driver ruling, folded in** — `useKeyboardShortcuts.ts:259`: the dead `candidate !== lower &&` clause is gone, dead by N2's own argument (`lower.startsWith(lower)` is always true, so the `startsWith` guard already dropped the identical alias); the comment at `:249-254` now names all three cases that one guard covers, and the line count is unchanged so every anchor above holds.
**Runs.** `timeout 300 npx vitest run tests/composables/useKeyboardShortcuts.test.ts tests/demo/shortcut-kbd-a11y.test.ts --reporter=dot` (`scratchpad/o26cure/K-cure2-vitest.log`): `Test Files 2 passed (2) · Tests 16 passed (16)`, exit 0. `npm run typecheck` (`vue-tsc --noEmit` + the test project, `K-cure2-tsc.log`): exit 0, no diagnostics.
