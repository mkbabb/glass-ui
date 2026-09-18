# Lane M — the manifest + docs riders

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-ae25d3e4b7e3eb373.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique
to this lane's prompt, `LANE M · rows R-7-RIDER`, and it is the only file in the tree that
carries it, so the datum is this seat's own and not the parent session's) · **date**
2026-09-18 · **base** `master` @ `c1f266ad` · **rows** R-7-RIDER · R-10-RIDER · R-11-RIDER ·
R-12 (doc arm) · R-15-RIDER · R-16-RIDER · the A-3-CLASS scope note · **spec of record**
`docs/tranches/BK/execution/2026-09-18-o26-disposition/LEDGER.md` §A + §D, over
`.../RULINGS.md`; where they disagree the LEDGER wins.

The assertion gates the chain: the id was read from the transcript before any other tool
call and matched `claude-opus-5*`. Scope is DOCS ONLY — no `src/`, no `tests/`, no `dist/`.

## Step-0 baseline

`git rev-parse HEAD` = `c1f266adbace4112d090db6ed02e71afb3deeb19`.

`git status --short` at first byte (foreign lanes' work, none of it this lane's):

```
 M MIGRATION.md
 M demo/shell/AppShell.vue
 M src/components/_shared/overlay/index.ts
 M src/components/dialog/DialogContent.vue
 M src/components/menu/DropdownMenuContent.vue
 M src/components/popover/PopoverContent.vue
 M src/components/sheet/SheetContent.vue
 M src/composables/keyboard/useKeyboardShortcuts.ts
 M tests/components/dialog/dialog-focus-return.test.ts
 M tests/composables/useKeyboardShortcuts.test.ts
 M tests/demo/shortcut-kbd-a11y.test.ts
?? docs/tranches/BK/execution/2026-09-18-o26-cure/K/
?? src/components/_shared/overlay/shortcuts.ts
```

`MIGRATION.md` is ALREADY dirty from Lane K (R-8, the `## 9.0.0` bracket at :116). This
lane edits the same file, so every edit here is a surgical `Edit` against a unique anchor;
nothing of Lane K's is read back, rewritten or reverted.

Register receipt at baseline, before this lane wrote a byte:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## The measurement the ruling demands first

R-15-RIDER: "the lane MEASURES 8.0.0 against 9.0.0 from the dists first". The scratch dists
were gone, so all three majors were re-packed from the registry into
`/private/tmp/claude-504/.../scratchpad/o26cure/d700|d800|d900`:

| version | `grep -c specular-angle .../dist/styles/tokens/property-regs.css` | dist-wide files carrying the name |
| --- | --- | --- |
| 7.0.0 | 1 | 5 (`useSpecularPointer.d.ts`, `glass-ui.js`, `glass-specular-track.css`, `glass/material.css`, `tokens/property-regs.css`) |
| 8.0.0 | 0 | 0 |
| 9.0.0 | 0 | 0 |

So the name left at **8.0.0**, not 9.0.0, and its removal row belongs under `## 8.0.0` —
the same law the A-4-RIDER rows already sit on ("rows sit under the major that actually
shipped without the name"). The LEDGER's R-15 text says "GONE at 9.0.0", which is true and
not the placement; the placement is what the RIDER told this lane to measure.

## Rows

On witnesses, stated once and not repeated per row. This lane is DOCS ONLY and the ruling
names no test file for any of its rows — §D's lane table asks for MIGRATION additions,
README/DESIGN/design-idioms edits, the consumer-evidence bracket and the O-20 scope note,
and nothing else. House law forbids minting a gate or a test file, so no witness is
invented here. What each row DOES carry is a measurable before/after, and it is recorded in
the same born-RED shape: the RED reading is the grep or the dist count that showed the row
absent or the prose wrong on the old bytes, the GREEN reading is the same command after the
edit. The one executable arm any of it touches is the `.published-roster` removal-row
parser in `scripts/verify-export-types.mjs:507`, and it is run below.

### R-7-RIDER · the docs that still prescribe the convicted halo

> "the MIGRATION `touch-hit-area` removal-table cell—as written it prescribes the convicted
> halo; rewrite to name the keep-the-paint-small door (a real child seat inside the host,
> the `.checkbox__seat` form) and the attribute floor."

**Edits.** `MIGRATION.md:404` (the `touch-hit-area` row of `_Classes and utilities
removed_`) — the `::before` recipe struck with a dated bracket saying why (an inert halo
cannot expand a hit box), and the two doors written in its place: the real child seat, and
`[data-control-target]` with the shared rule quoted from
`styles/utilities/responsive.css:3-8` verbatim. The Button arm is stated as THIS cut
(8.0.0, `70dc0f06`), and the rule itself is stated as shipping from 7.0.0 — the two dates
are different facts and the row keeps them apart. `docs/design/design-idioms.md:91` — the
`a11y / capability override` example cell no longer names the removed utility; it names
what the file actually holds, the reduced-motion instant fallback and the
`forced-colors: active` focus sweep (`src/styles/utilities/a11y-overrides.css:40,:107-129`).
`README.md` — a new `## Target size` section between `## Typography` and `## Conventions`,
naming all three mechanisms. `DESIGN.md` — the same three beside the Button `size` rung
table (`### Semantic axes`), which is the tier table that governs control height; the
paragraph lands directly under it.

**RED → GREEN.** `grep -c 'pointer-events: none' MIGRATION.md` over the cell: the halo
recipe was the whole prescription, with no seat and no attribute named — `grep -c
'data-control-target' MIGRATION.md` = 0, `README.md` = 0, `DESIGN.md` = 1 (the Timeline
prose line at :1366). After: MIGRATION 1, README 1, DESIGN 2. `grep -n touch-hit-area
docs/design/design-idioms.md` = 1 hit before, 0 after.

**Residue.** The DESIGN.md Timeline line at :1366 is left alone — it is a correct
statement about the handmark's own marks and the ruling did not ask for it to move.

[2026-09-18 · adjudication-1 — the ruling itself is stale on disk. `.checkbox__seat` is the
RETIRED absolutely-positioned span (`Checkbox.vue:28-33` — it "bled 14px past a 16px box …
made the rect lie"); the shipping mechanism is host-is-seat, `.control-bit` sized to
`max(--touch-target, face)` in flow with the paint on `.control-bit__face`
(`control-bit.css:142-155`), and `.tags-input__delete` has zero occurrences because its
component is deleted 120 lines above in this same file. DRIVER RE-RULE OWED: LEDGER R-7
(:346) and R-7-RIDER cure (1), RULINGS :162/:175 — the `.checkbox__seat` form is retired;
the host wears `.control-bit` and IS the seat.]

### R-10-RIDER · the BK.W-FROST strike is in no MIGRATION row

> "A MIGRATION.md entry under `## 8.0.0` recording the strike—both the blanket token and
> the content-tier rule—as a removal-table row … plus one sentence naming
> `surface="opaque"` / `data-surface="opaque"` as the explicit replacement."

**Edit.** `MIGRATION.md` `## 8.0.0`, a new `_The blanket blur opt-out is gone —
`--glass-cell-backdrop-filter`_` block after the `_Classes and utilities removed_` table:
the dated bracket carrying the measurement, then a one-row removal table. It is its own
block and NOT a fourteenth row in the `@theme` table above it, because that table carries a
measured count sentence ("246 → 242", thirteen names) that a fourteenth row would falsify —
and the token was never a `@theme` name. The row names both halves: the token, and the
content-tier rule `:where(.glass-wash, .glass-quiet, .glass-resting, .glass-floating,
.glass-overlay, .glass-card, .glass-dock) > * { --glass-cell-backdrop-filter: none; }`,
quoted from the 7.0.0 dist (`styles/glass/material.css`) rather than recalled. The
replacement sentence is the surface axis, and the row says plainly to build on it and never
on the token.

**RED → GREEN.** `grep -c 'glass-cell-backdrop-filter' MIGRATION.md` = 0 before, 2 after
(the block heading, and the row that carries both the token and the quoted rule). Dist
measurement, re-packed for this lane: 39 occurrences at
7.0.0, 0 at 8.0.0, 0 at 9.0.0 — the placement under `## 8.0.0` follows.

**Residue.** None.

### R-11-RIDER · MIGRATION's 8.0.0 deletion count and the retained consumer-evidence page

> "(1) Add the `_Deleted — HeaderRibbon_` entry (component, subpath,
> `HeaderRibbonProps`/`HeaderRibbonPlacement`, the successor recipe above) and correct the
> count sentence … (2) `docs/consumer-evidence/header-ribbon.md` … takes a dated deletion
> bracket at its head … not a delete."

**Edits.** `MIGRATION.md:310` — "one component is deleted" struck, with a dated bracket
naming HeaderRibbon and `4bf53962` and pointing at the entry below. `MIGRATION.md`, after
`_Deleted — `TagsInput`_` — a new `_Deleted — `HeaderRibbon`_` entry: the component, the
`/header-ribbon` subpath, both types by name, and the successor recipe as a fenced `vue`
block (`<Surface material="functional" surface="glass" specular="subtle">` inside the
consumer's own `role="toolbar"` wrapper), with one sentence saying why the role belongs to
the consumer. It closes by routing a 7.0.0 reader who is looking for the collapsible
contract to `## 7.0.0`, where that removal already is — R-11's strongest provenance fact.
`docs/consumer-evidence/header-ribbon.md:1` — a dated bracket at the head marking the page
HISTORICAL, saying what to read "RETAINED" as, and pointing at the MIGRATION entry. The
page is kept whole; nothing inside it is rewritten.

**RED → GREEN.** `grep -c HeaderRibbon MIGRATION.md` = 0 before, 13 after. The count sentence
read "one component is deleted" before; it reads two after, with the correction dated.
`git show 4bf53962 --stat` confirms the commit and its major.

**Residue.**

[2026-09-18 · adjudication-1 (a) — the successor recipe the ruling dictates cannot work at
the cut it documents. `SurfaceProps` at HEAD and in the 8.0.0/9.0.0 `.d.ts` is
`tier | surface | deep | class` (`Surface.vue:36-43`); `material` and `specular` were
deleted AT 8.0.0, and this section's own rows (:892, :958, :961, :1063) say so. Surface
forwards attrs, so the two props would have rendered as dead DOM attributes. The fence now
reads `tier="floating" surface="glass"` — `floating` is what `functional` mapped to in the
7.0.0 `MATERIAL_TIERS` bijection. DRIVER RE-RULE OWED: LEDGER R-11 Answer (:585-586) and
R-11-RIDER cure (1), RULINGS :355 — and the O-26 reply letter that carries the string to
the consumer needs the same correction.]

[2026-09-18 · adjudication-1 (b) — the count sentence is batch-scoped, not the major's
deletion roll: it sits in a paragraph counting ONE export re-cut (`exports` 66 → 70, two
retire, six mint), and 66 is an in-flight datum, not the 7.0.0 package (74 keys). Writing
"TWO components are deleted" there was false in the narrow reading (HeaderRibbon's
`./header-ribbon` retirement is not one of the two counted keys) and in the wide reading
(the 7.0.0 → 8.0.0 export delta retires eleven keys). The bracket is now a scope note
pointing at the HeaderRibbon entry; the ruling's premise stands, its verb becomes "scope"
rather than "correct".]

[2026-09-18 · adjudication-1 (c) — wider than this row and NOT lane-M scope, recorded for
the driver: of the eleven subpaths the 7.0.0 → 8.0.0 delta retires, seven have no record
anywhere above `## 7.0.0` — `./animated-digit`, `./completion-seal`, `./instrument-chassis`,
`./paper-backdrop`, `./liquid-grid`, `./watercolor-dot`, `./pulse`. Same defect class as
R-11-RIDER, a new row.]

### R-12 (doc arm) · the synthesis dependency is undocumented

> "One sentence in the typography register's documentation—the lane finds the register's
> home, DESIGN.md's typography section and/or the README fonts paragraph, wherever
> `text-caption` is documented—naming the four utilities as synthesis-dependent and stating
> that the library declares no `font-synthesis`."

**Edit.** `README.md`, the `styles/fonts` paragraph in `## Install` — the ruling's "and/or"
is satisfied at the README, which is the only prose that installs. The paragraph states the
register is roman by intent, names all four synthesis-dependent utilities (`text-caption`,
`text-math`, `text-math-body`, `fourier-f`), states that the library declares no
`font-synthesis` so the UA `auto` default applies, and names the two replacements a
consumer with a `font-synthesis: none` policy reaches for — `text-mono-caption` and
`color: var(--muted-foreground)` on `text-caption`, both of which ship at 7.0.0.

**RED → GREEN.** On disk at HEAD: `grep -rn 'font-style: italic' src/` = 4 sites
(`typography/semantic.css:226`, `typography/utilities.css:16,:23,:91`), `grep -rn
font-synthesis src/` = 0, `grep -c italic src/styles/fonts.css` = 0. `grep -c
font-synthesis README.md` = 0 before, 2 after.

**Residue.** DESIGN.md's semantic-typography table (`:869`) lists `.text-caption` with no
italic column at all, so it states nothing false and was left alone. It is a gap, not a
defect, and it is not this row's — flagged for the adjudicator, not cured.

### R-15-RIDER · a registered `@property` name removed with no MIGRATION row

> "A MIGRATION removal-table row under the major that shipped without it— the lane MEASURES
> 8.0.0 against 9.0.0 from the dists first."

**Edit.** `MIGRATION.md` `## 8.0.0`, a new `_A registered `@property` name is gone —
`--specular-angle`_` block with its dated bracket carrying the measurement, then a one-row
removal table. The row says what the name was (the angular channel of the specular register,
read by the conic-gradient leg of the `::before` sweep), that there is no successor, and
that the positional family is three names from this cut — `--specular-x`, `--specular-y`,
`--specular-intensity` — all of which survive registered.

**RED → GREEN.** The measurement is the table in §"The measurement the ruling demands first"
above: 1 / 0 / 0 in `property-regs.css` at 7/8/9, dist-wide files 5 / 0 / 0. `grep -c
specular-angle MIGRATION.md` = 0 before, 3 after. The row sits under `## 8.0.0` because
8.0.0 is the major that shipped without the name.

**Residue.** None.

### R-16-RIDER · the 8.0.0 focus reshape has no MIGRATION row

> "ONE `_Focus_` block under `## 8.0.0` covering both classes, in the section's own table
> form, with the file's dated-bracket convention for a late row."

**Edit.** `MIGRATION.md` `## 8.0.0`, ONE block — `_Focus moves off `box-shadow` and stops
restating the shape_` — with a three-column was/now/what-to-do table carrying both classes
and a closing sentence on `--focus-ring-shadow`'s survival. Every claim was re-read on disk
before it was written, not taken from the ruling: the `.focus-ring` grounds are the prose at
`src/styles/utilities/base.css:125-140` ("A focus indicator may not restate the element's
shape"); the `.field-control` rule is `src/components/_shared/field/control.css:221-226`
(`outline: var(--focus-ring-width) solid var(--field-control-ink)`, `outline-offset: 2px`,
`--control-edge-ring: 0 0 8px …`); `--ink-perimeter` `0.48` and the 3.0:1 / 1.91:1 pair are
`base.css:137-141`.

**RED → GREEN.** `grep -c 'focus-ring-shadow' MIGRATION.md` = 1 before (`:1541`, a 5.0.0
paragraph about the focus register, unrelated to this reshape), 4 after; `grep -n
'field-control' MIGRATION.md` = 0 hits before, 2 after. `--focus-ring-shadow` survival
re-counted on the published 9.0.0 package rather than quoted: 15 occurrences dist-wide,
which is what the block says.

**Residue.** None.

### A-3-CLASS scope note (O-20 LEDGER)

> "the cure design must cover the SFC scoped-block half explicitly (authored `@layer
> components {}` inside the block, the `Skeleton.vue:62` precedent), and the wave publishes
> its measured unlayered set as a consumer-readable manifest beside the cascade gate."

**Edit.** `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`, at the foot of
the `### A-3-CLASS` section — a dated scope-note bracket carrying both riders: (1) the SFC
scoped-block half is in scope explicitly, with the `Skeleton.vue:62` precedent named, so
"component stylesheet" is not read as `.css` files only; (2) the wave publishes its measured
unlayered set as a consumer-readable manifest BESIDE the cascade gate, because a gate does
not travel to consumers and the consumer is the one who needs the list by name. The note
also lands the two facts O-26 R-1 settled against this section: the label half joins the set
with no piecemeal cure, and the 351 figure is superseded by "the set, not a number".

**RED → GREEN.** `grep -c 'Skeleton.vue:62'` in that LEDGER = 0 before, 1 after; `grep -c
manifest` = 9 before (other sections', unrelated), 10 after. The section's own body is
untouched — the note is additive
and dated, and the 351 sentence above it is left standing with the supersession stated in
the note rather than struck, because that paragraph is the verifier's census as recorded.

**Residue.** None. The cure itself is CURE-NEXT-MAJOR and nothing here executes it.

## Battery

`timeout 900 npx vitest run`, full suite, log at
`/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/o26cure/M-implement-vitest.log`:

```
Test Files  1 failed | 232 passed (233)
     Tests  1 failed | 2238 passed | 10 expected fail (2249)
```

The ONE red is NOT this lane's, and the evidence says so rather than the claim:

```
FAIL tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the dist-demo it
measures is NEWER than every source it is built from
AssertionError: dist-demo/index.html is STALE (built 2026-09-18T20:33:12.809Z, newest
source 2026-09-18T20:44:03.281Z) — run `npm run demo:dist:build`
```

`newestSourceMtime()` (`tests/gates/boot-graph.test.ts:543-555`) walks `demo/` and `src/`
and nothing else. This lane wrote zero bytes under either. `find src demo -type f -newermt
"2026-09-18 16:40"` returns exactly one path —
`src/composables/keyboard/useKeyboardShortcuts.ts`, Lane K's — and 16:44:03 EDT is that
file's mtime, which is the timestamp the assertion prints. The `dist-demo` build predates
every lane in this wave (16:33). It is Lane K's build debt, discharged by
`npm run demo:dist:build` at the driver's commit, and no cure is improvised for it here.

## The `.published-roster` arm

`node scripts/verify-export-types.mjs` cannot be run end to end at HEAD: it throws in
`ratchetEvidence` before it ever reaches the roster check —

```
Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2562499 > 2554360
```

— on a `dist/` built at 16:33 from a tree already carrying Lanes A, B and K's src. Docs
never enter `dist` (`files: ["dist"]`, and this lane touched no source), so that red is
neither this lane's nor curable by it; `.bundle-ratchet` is untouched, per the lane's fence.

The arm the ruling actually asks about — the removal-row grammar at
`scripts/verify-export-types.mjs:507` — was run directly against the live bytes with the
same regex the script builds (`^\|\s*` + backticked name + `` ` `` + `\s*\|`):

```
--glass-cell-backdrop-filter | removal-row: true | in .published-roster: false
--specular-angle             | removal-row: true | in .published-roster: false
touch-hit-area               | removal-row: true | in .published-roster: false
```

Both new rows OPEN their table row with the backticked bare name, so they parse as removal
rows; neither name is in the roster datum, so neither excuses anything — which is exactly
what both rulings said to expect ("no roster impact"). The rewritten `touch-hit-area` cell
still parses as the row it was.

`npx vitest run tests/gates` is inside the battery above: `tests/public-surface.spec.ts`'s
`G-NO-ORPHAN-EXPORT` (the fixture arm over the same parser) passed.

## Gate receipt

`node scripts/gate-register.mjs`, post-edit — byte-identical to the baseline at the head of
this record:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 violations:0`, unchanged. No gate minted, no threshold moved.

## Prettier

Not run: the config the instruction names, `~/Programming/.prettierrc.json`, does not
exist, and the repo carries no prettier config or ignore file of its own (`ls -a | grep -i
prettier` is empty). Reported rather than substituted — running prettier under defaults
would reflow committed prose this lane did not write.

## Files touched

```
MIGRATION.md
README.md
DESIGN.md
docs/design/design-idioms.md
docs/consumer-evidence/header-ribbon.md
docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
docs/tranches/BK/execution/2026-09-18-o26-cure/M/RECORD.md
```

`MIGRATION.md` is shared with Lane K, which holds the `## 9.0.0` R-8 bracket at `:116`.
Every edit here was an anchored replacement against a unique string in the `## 8.0.0`
section or below; nothing of Lane K's was read back, rewritten or reverted. No `src/`, no
`tests/`, no `dist/`, no `docs/precepts/`.

## Cure round 1

Seat: cure · model `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_99bdc0bb-0c3/agent-ab6e4c41b45b2eb43.jsonl`,
the only file in the workflows tree carrying `M-cure-1.json`) · adjudication of record
`/private/tmp/claude-504/.../scratchpad/o26cure/M-adjudication-1.json` (verdict
CURE-ROUND: seven AMEND/ACCEPT items, two REJECT). The two REJECTs — M-B-4 (flatten the
`_Focus_` rows to two columns) and M-B-5 (name the Button arm in README) — were NOT applied:
the `## 8.0.0` section already carries a three-column removal table at `:384`, and the
R-7-RIDER enumeration does not list the Button arm for README.

Every cure item applied exactly, in order, all seven anchors found:

1. `MIGRATION.md:345` — the HeaderRibbon successor fence `<Surface material="functional"
   surface="glass" specular="subtle">` → `<Surface tier="floating" surface="glass">`, plus
   the one sentence after the fence naming the deleted props and the
   `functional` → `floating` bijection. The old string named two props that do not exist at
   the cut the entry documents.
2. `MIGRATION.md:310` — `~~one component is deleted~~` un-struck and the bracket re-written
   as a scope note (the count tallies the export re-cut; HeaderRibbon went outside it), and
   the `_Deleted — HeaderRibbon_` head bracket's closing clause re-pointed to match.
3. `MIGRATION.md:430` — the `touch-hit-area` cell's first door rewritten from the retired
   `.checkbox__seat` child-seat form to host-as-seat with the paint on
   `.control-bit__face`; the two dead names (`.checkbox__seat` as live, `.tags-input__delete`)
   struck; the closing contrast collapsed to "either door; never the inert `::before`".
4. `README.md:202` — the `## Target size` `.control-bit` sentence de-inverted: the host is
   the ≥44 seat, the paint is the child.
5. `DESIGN.md:909` — the same de-inversion beside the Button `size` rung table.
6. This RECORD — three dated `[2026-09-18 · adjudication-1]` residue brackets: under
   R-7-RIDER the `.checkbox__seat` staleness, under R-11-RIDER the dead Surface props (a),
   the batch-scoped count (b) and the seven unrecorded retired subpaths (c, a new row for
   the driver, not lane-M scope).
7. The arms below, re-run post-cure.

**Roster arm, post-cure** — the `scripts/verify-export-types.mjs:507` removal-row regex
against the live bytes, byte-identical to the pre-cure reading (the rewritten
`touch-hit-area` cell still opens with its backticked bare name):

```
--glass-cell-backdrop-filter | removal-row: true | in .published-roster: false
--specular-angle             | removal-row: true | in .published-roster: false
touch-hit-area               | removal-row: true | in .published-roster: false
```

**Gate receipt, post-cure** — `node scripts/gate-register.mjs`, byte-identical to the
baseline and to the pre-cure receipt:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 violations:0`, unchanged. No gate minted, no threshold moved, no
`src/`, `tests/` or `dist/` byte. Files touched are unchanged from the list above.
