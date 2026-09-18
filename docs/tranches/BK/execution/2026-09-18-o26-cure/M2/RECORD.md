# Lane M2 — the retired-subpath record, and lane M's three re-rulings carried back

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/agent-ae54b500e7dc555d0.jsonl`,
the `"model"` field on every assistant turn; the file was found by grepping the subagents
tree for `R-11-RIDER-2`, a string unique to this lane's prompt, and it is the only file that
carries it, so the datum is this seat's own and not the parent session's) · **date**
2026-09-18 · **base** `master` @ `c6251420` (the ratchet rebind sitting on lane M's
`7c3d5fa3`; the brief named `7c3d5fa3`, and the one commit between them touches
`.bundle-ratchet` only, so no byte this lane reads moved) · **rows** R-11-RIDER-2 (new,
driver-ratified) + the three re-rulings lane M's adjudication forced back onto the records ·
**spec of record** the driver's re-ruling, over
`docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md`.

The assertion gates the chain: the id was read before any other tool call and matches
`claude-opus-5*`. Scope is DOCS ONLY — no `src/`, no `tests/`, no `dist/`, and no build or
verify run that writes (a build holds the tree's lock; the two arms below only read).

## Step-0 baseline

`git rev-parse HEAD` = `c62514203ca52857107cbb6cab318650a501d3a5`. `git status --short` at
first byte: clean. Every modified path below is this lane's.

## The measurement the row demands first

The driver ratified R-11-RIDER-2 on an adjudicator's list of seven subpaths. The list was
RE-MEASURED before a word was written, from the two package manifests rather than from the
adjudication:

```
python3: exports keys of `git show v7.0.0:package.json` vs `git show v8.0.0:package.json`
  v7.0.0: 74 keys   v8.0.0: 70 keys
  retired (11): ./animated-digit ./completion-seal ./drawer ./dropdown-menu ./forms
                ./header-ribbon ./instrument-chassis ./liquid-grid ./paper-backdrop
                ./pulse ./watercolor-dot
  minted   (7): ./checkbox ./input ./menu ./music-staff ./radio-group ./sheet ./textarea
```

Recorded already, above `## 7.0.0`: `./dropdown-menu` (the re-point row), `./forms` (the
split row), `./header-ribbon` (lane M's entry at `7c3d5fa3`). The adjudicator's seven are
confirmed as zero-occurrence — counted in BOTH spellings (kebab subpath and component name)
over `MIGRATION.md[:index('^## 7.0.0')]`, the heading matched at line 973 with an anchored
regex, because a plain `index('## 7.0.0')` lands on the cross-reference at `:357` and
silently truncates the search to a third of the file. Two apparent hits were run down and
are unrelated: `pulse` appears as the retired `StatusDot` PROP and as `.status-dot__pulse`
(a different object — that table never records the COMPONENT's retirement), and `Drawer`
appears at `:734`/`:744` as a live component.

Per subpath, the deleting commit and its ancestry:

| subpath | deleting commit | date | `--is-ancestor … v8.0.0` | `--is-ancestor … v7.0.0` |
| --- | --- | --- | --- | --- |
| `./animated-digit` | `4bf53962` | 2026-08-04 | YES | no |
| `./completion-seal` | `4bf53962` | 2026-08-04 | YES | no |
| `./instrument-chassis` | `4bf53962` | 2026-08-04 | YES | no |
| `./paper-backdrop` | `4bf53962` | 2026-08-04 | YES | no |
| `./liquid-grid` | `bda718ac` | 2026-07-20 | YES | no |
| `./pulse` | `bda718ac` | 2026-07-20 | YES | no |
| `./watercolor-dot` | `62305f4a` | 2026-08-07 | YES | no |

So all seven belong under `## 8.0.0` and nowhere else.

**Renamed rather than deleted — the two the measurement adds to the ruling.** `./pulse` is a
MERGE, not a drop: `bda718ac` is "the P-CLOSE-ruled pulse→StatusDot merge", and
`src/components/status-dot/states.ts` at HEAD says so in its own head comment, absorbing
`PulseState`'s four members (`active`, `idle`, `success`, `warning`) into
`StatusDotState`'s seven. Its entry therefore carries a successor recipe; the other six carry
"no successor" on disk evidence (`AnimatedDigit`, `CompletionSeal`, `useCompletionSeal`,
`InstrumentChassis`, `PaperBackdrop`, `LiquidGrid`, `useLiquidGrid`, `useWatercolorBlob` —
zero occurrences anywhere in `src/`). `WatercolorDot` survives only as a comment in
`src/styles/utilities/base-misc.css:258` and its `mulberry32` PRNG only as an internal module
(`src/composables/glass/procedural/prng.ts`, published under no `exports` key), so the entry
says "no successor" and tells the caller to copy the helpers.

`./drawer` is the eleventh retired key and the EIGHTH unrecorded one — folded whole into
`./sheet` at `336dacf9` ("the detent is a size, the drawer folds in whole"). It is outside the
row the driver ratified, and a `_Deleted —` entry would be the wrong shape for a fold, so it
is written up as the row's one open item rather than cured here.

## Rows

### (1) M-A-1 · the dead `<Surface material="functional" …>` recipe

**The fact.** `SurfaceProps` at 8.0.0, 9.0.0 and HEAD is `tier | surface | deep | class`.
`material` and `specular` were deleted AT 8.0.0 — the same major the R-11 answer sends the
consumer to — and the 8.0.0 section's own rows say so. `functional` was the `floating` tier
under a second name in 7.0.0's `MATERIAL_TIERS` bijection. The live recipe is
`<Surface tier="floating" surface="glass">`.

**Edits.** Three sites carried the dead string; each takes a
`[2026-09-18 · re-ruled after lane M: …]` bracket naming the live recipe, and no sentence is
rewritten:

- `LEDGER.md` R-11 **Answer** — bracket after the sentence that carries the string.
- `RULINGS.md` R-11 section — bracket after the same sentence.
- the letter's R-11 paragraph — bracket immediately after "…which is what the component was.",
  opening "do not type that recipe". The letter is a SENT record; the bracket is the whole
  correction.

**Verification.** `grep -n 'material="functional"' <the four files>` → the three sites, each
now followed by its bracket; `grep -c 'tier="floating" surface="glass"'` → present at all
three plus MIGRATION's own fence, which lane M had already cured.

### (2) M-A-3 · `.checkbox__seat` named as the live seat

**The fact.** `.checkbox__seat` is the RETIRED absolutely-positioned span
(`Checkbox.vue:28-33`); `.tags-input__delete` has zero occurrences at HEAD (TagsInput deleted
at 8.0.0). What ships is HOST-IS-SEAT: the host wears `.control-bit`, sized to
`max(--touch-target, face)` in flow (`styles/glass/control-bit.css:142-155`), with the paint
on the `.control-bit__face` child. The conclusion is untouched — exposure is still nil,
because the host IS the ≥44 seat.

**Edits.** Five sites, each bracketed on the same reading:

- `LEDGER.md` R-7 grounds (b), after the sentence naming both dead classes.
- `LEDGER.md` R-7-RIDER cure (1), after "…and the attribute floor".
- `RULINGS.md` R-7 (b), after the atoms list.
- `RULINGS.md` R-7-RIDER (1), inside the cure clause before "; (2)".
- the letter's R-7 paragraph, after "…is a real 44×44 box under coarse.", saying plainly that
  the consumer's conclusion and ours are unchanged.

**Verification.** `grep -c 'checkbox__seat'` over the three files → `LEDGER 5`, `RULINGS 4`,
letter `2` lines; each of the three files' ORIGINAL occurrences is now immediately followed by
its bracket, and the surplus lines are the brackets' own mentions of the retired name. No
occurrence is left standing as a live mechanism.

### (3) M-A-2 · "correct the count sentence (one → two)"

**The fact.** The MIGRATION 8.0.0 "one component is deleted" sentence is batch-scoped: it
tallies ONE export re-cut (`exports` 66 → 70, two keys retire, six mint), `./header-ribbon` is
not one of the two counted keys, and `4bf53962` is outside the batch — so "two" would have been
false. Lane M left the sentence standing and re-wrote its bracket as a scope note pointing at
the HeaderRibbon entry. The premise of R-11-RIDER held; only its verb was wrong.

**Edits.** `LEDGER.md` R-11-RIDER cure (1) and `RULINGS.md` R-11-RIDER (1) take a bracket
saying the sentence was SCOPED, not corrected. Both brackets also carry limb (a), the recipe,
since the two re-rulings land on one sentence.

**Verification.** The letter was grepped for the count claim — `grep -n 'count\|one component'`
over `glass-outbound-2026-09-18-valuejs-o26-reply.md` returns four hits (pre-edit `:65`,
`:221`, `:388`, `:409`) and NONE of them is the claim: they are "the count you", "every atom",
"identical read counts" and "your four positional counts". The nearest thing to it is the R-11
paragraph's "MIGRATION's 8.0.0 section names only TagsInput as deleted", which is true as
written — a statement of what the section named, not arithmetic — and which lane M's scope note
leaves true. So the letter takes no third bracket, exactly as the driver expected.

### (4) R-11-RIDER-2 · the seven unrecorded retired subpaths — NEW ROW, CURE-NOW (docs)

**Edits.**

- `LEDGER.md` — the row itself, in the ledger's form (7.0.0 consequence · Grounds, with the
  measured `74 → 70` table · Cure · Seats · Open items), inserted after R-11-RIDER and before
  R-12, headed `DEAD → CURE-NOW (docs)` and opening with a dated bracket that says the row did
  not exist at the close and that the DRIVER ratified it — a lane does not mint its own scope.
  `./drawer` is its one open item.
- `LEDGER.md` §D — a `M2 · the retired-subpath record` lane row.
- `LEDGER.md` Tally — CURE-NOW `(13)` → `(14)` with R-11-RIDER-2 in the list; DEAD `(4)` → `(5)`;
  "Twenty-four rows" → "Twenty-five rows" with a bracket noting the letter-row count is
  unchanged, because this row is ours and not a letter row.
- `MIGRATION.md` — seven `_Deleted — <Name>_` entries under `## 8.0.0`, placed beside the
  `_Deleted — HeaderRibbon_` entry (immediately after it, before
  `_Class + attribute namespace_`) and in its exact form: the italic-underscore head, the
  file's late-row dated bracket on the line beneath it, then the prose. Each names the
  component, the subpath, the types the 7.0.0 `index.ts` exported, the deleting commit, and a
  successor ONLY where one exists on disk. Six say "no successor" in those words; `Pulse`
  carries a was/now fence to `<StatusDot state motion="full" label>` and states that the four
  `PulseState` members survive inside `StatusDotState`'s seven, so no call site loses a state.
  The `LiquidGrid` entry lists every symbol that door published — the component plus twenty
  more — and notes `OklchStop` keeps its own door on `./color`.

**Verification.** `grep -n '^_Deleted' MIGRATION.md` → nine entries under `## 8.0.0`:
`TagsInput` (no bracket, original), `HeaderRibbon` (lane M's `O-26 R-11-RIDER` bracket), and
the SEVEN new ones, each of those seven followed by a `[2026-09-18 · O-26 R-11-RIDER-2 — …]`
bracket in the file's spaced-em-dash convention. No entry un-deletes anything and no door
re-opens; the cure is the record that was owed at the cut.

## The `.published-roster` arm

`node scripts/verify-export-types.mjs` — the removal-row check at `:507` requires the bare
name to OPEN a table row (first cell, backticked, nothing else in it). This lane adds PROSE
entries and no table rows, so nothing was added to or removed from that grammar:

```
terminal: CLEAN
roster: {"status":"PRESENT","datum":289,"emitted":289}
```

`datum 289 = emitted 289`, zero unnamed removals, zero unexpected growth — the same reading
lane M banked. No `@theme` or `@utility` name departs in this lane, so the roster could not
have moved.

## Gate receipt

`node scripts/gate-register.mjs`:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 violations:0`, byte-identical to lane M's. No gate minted, no threshold
moved, no `src/`, `tests/` or `dist/` byte touched.

## Files touched

- `MIGRATION.md` — the seven `_Deleted —` entries under `## 8.0.0`.
- `docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md` — four re-rule brackets
  (R-7, R-7-RIDER, R-11, R-11-RIDER), the new R-11-RIDER-2 row, the §D M2 lane row, three
  tally edits.
- `docs/tranches/BK/execution/2026-09-18-o26-disposition/RULINGS.md` — four re-rule brackets
  (R-7, R-7-RIDER, R-11, R-11-RIDER).
- `docs/tranches/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md` — two
  brackets (R-7 paragraph, R-11 paragraph); no sentence rewritten, no §3 row touched (the
  R-11 interim row, `:478` post-edit, carries neither the dead recipe nor the count claim —
  verified by grep, so the driver's conditional "if it does" does not fire).

## Cure round 1

The challenge seat returned ten findings (3 FIX, 7 NIT); the driver ACCEPTED all ten and every
`cure` is applied verbatim. Each was re-verified on disk here before the edit, not taken on the
challenger's word.

1. **M2-F1** (FIX, `MIGRATION.md`) — the Pulse entry pointed at "the `StatusDot` prop table
   above" twice; the table is at `:625`, ~200 lines BELOW the entry, in the same `## 8.0.0`
   section. `above` → `below` in both sentences (the bracket and the closing line).
2. **M2-F3** (FIX, `MIGRATION.md`) — the Pulse entry claimed `state` "keeps its meaning". The
   DEFAULT moved: `git show v7.0.0:src/components/pulse/Pulse.vue` defaults `state: "active"`,
   `StatusDot.vue:26` defaults `state: "online"`, and `:47` gates the breathing to `active`
   alone (`:data-motion="motion === 'full' && state === 'active'"`). The entry now says so in
   bold — a bare `<Pulse label="Live"/>` ports to a STATIC online mark, no type error catches
   it, and a call site that leant on the old default must name `state="active"`. The fenced
   was/now recipe passes `state` explicitly and was already right.
3. **M2-N1** (NIT, `MIGRATION.md`) — "copy the four helpers" was wrong on two of them.
   `src/composables/glass/procedural/prng.ts` exports `mulberry32` (`:8`) and `hashString`
   (`:19`) only; `grep -rn 'randomRadii\|radiiToCSS' src/` → zero. The entry now names the two
   survivors (with the `src/` prefix restored on the path) and says the radii pair is gone
   outright, to be copied out of the caller's pinned 7.0.0 package.
4. **M2-N2** (NIT, `MIGRATION.md`) — "no successor" omitted the relocation the addressee owns.
   `src/styles/utilities/base-misc.css:257-258` records that the component RELOCATED to
   value.js, and `62305f4a` rebuilt the ramp on `<HandMark brush="highlighter"
   shape="highlight">`. One clause added: no successor IN THIS LIBRARY, the ornament relocated,
   the ramp is HandMark's.
5. **M2-F2** (FIX, `LEDGER.md`) — R-11-RIDER-2's open item cited `MIGRATION:734`/`:744` for the
   two live-`Drawer` sentences, line numbers this lane's own 84-line insertion pushed to `:818`
   and `:828`. Re-cited by QUOTED PHRASE instead of by line, so the open item survives the next
   insertion — the stale-cite class the challenger names is exactly why.
6. **M2-N4** (NIT, `LEDGER.md`) — the zero-occurrence clause read in the present tense under a
   "measured at HEAD" heading and is false at the cured tree. Past-tensed and dated to the
   pre-cure tree (`git show HEAD:MIGRATION.md` at `c6251420`), noting each name now occurs only
   in the entry the cure writes.
7. **M2-N5** (NIT, `LEDGER.md`) — the one 133-character prose line rewrapped; the added block
   now has no non-table line over 100, and the only long line left is the row heading, which
   matches the file's own heading practice (R-8's runs longer).
8. **M2-N3** (NIT, this RECORD) — "all seventeen symbols" was wrong: `git show
   v7.0.0:src/components/liquid-grid/index.ts` publishes the component plus twenty more, every
   one of which the MIGRATION entry already lists. The numeral is corrected here; the artifact
   needed no change.
9. **M2-N6** (NIT, this RECORD) — the ancestry table's `./instrument-chassis` row carried a
   second sha in a parenthetical under one YES/no pair, and `490cc46e` IS an ancestor of
   `v7.0.0`. Parenthetical dropped, so each ancestry pair belongs to the one deleting sha.
   The conclusion is untouched: `v7.0.0:src/components/instrument-chassis/index.ts` exists and
   publishes all five types, so the retirement is 8.0.0's.
10. **M2-N7** (NIT, this RECORD) — "nine entries … each followed by a R-11-RIDER-2 bracket"
    overreached by two: `TagsInput` carries no bracket and `HeaderRibbon` carries lane M's
    `R-11-RIDER` one. Scoped to the seven.

**Roster arm, post-cure** — `node scripts/verify-export-types.mjs`, byte-identical to the
pre-cure reading (this round adds prose only; no removal-row grammar and no roster name moved):

```
terminal: CLEAN
roster: {"status":"PRESENT","datum":289,"emitted":289}
```

**Gate receipt, post-cure** — `node scripts/gate-register.mjs`, byte-identical to the pre-cure
receipt and to lane M's:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 violations:0`, unchanged. No gate minted, no threshold moved, no `src/`,
`tests/` or `dist/` byte. Files touched are unchanged from the list below.

## Prettier

Not run, for the reason lane M banked: `~/Programming/.prettierrc.json` does not exist and the
repo carries no prettier config of its own, so running it under defaults would reflow committed
prose this lane did not write.
- `docs/tranches/BK/execution/2026-09-18-o26-cure/M2/RECORD.md` — this file.
