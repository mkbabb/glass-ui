# D1-B law, pass 6: sealed modules, flat

This is the law the B-kit derives from and the gate judges by. The code form lives in
`lib/law.mjs`, which lands in the tree as `scripts/structure/seal/law.mjs`, and in
`gate/seal.mjs`, which lands as `scripts/structure/seal/seal.mjs` (a module of the floor
runtime since S19; its door `seal/index.mjs`, read through `scripts/structure/index.mjs`). The derive tools and the gate
import the same functions, so each rule is written down once. RULINGS R-1..R-10 (as amended),
X-10, P3-R1..P3-R9, P4-R1..P4-R5 and P5-R1..P5-R5 bind throughout. The floor (F-1..F-10,
FD-1..FD-11, with P4-F1..P4-F7, P5-F1..P5-F4 and P6-F1..P6-F3) is the machinery every rule runs
on. Each section states what the gate reads, so a literal reading of it gives the gate's
verdict; where the code reads more or less than a sentence says, the sentence is wrong. Changes
are marked **(pass 4)**, **(pass 5)** and **(pass 6)**.

## §1 Units, modules, containers

- **Sealed zones** are `src` and `scripts`. The gate's structural clauses judge only these.
  `demo`, `tests` and `tests-visual` are consumer zones.
- **Containers** are `src`, `src/components`, `src/composables`, `src/components/_shared` and
  `scripts`. A container holds modules and has no door of its own. `_shared` is a kernel
  container (pass 3): `_shared/overlay`, `_shared/field` and the rest are modules inside it.
- **Kind slots** follow FD-3's predicate (`composables/`, `styles/`, `__tests__/`), except
  that a child of a container is never a slot (`src/composables` is a container, not a slot).
  A slot has no door and no sub-directory (B5).
- **(pass 6) The kernel container's test slot.** `_shared` holds files of its own beside its
  modules (`axes.ts`, `interaction.ts`, `primitive.ts`, `selection.ts`, `class-names.ts`,
  `useMotionAxis.ts` and the rest). Their tests live in `src/components/_shared/__tests__/`,
  the one slot a container has (`isSlot`, `KERNEL_FILES`). Every other child of a container is
  a module.
- **A module** is any directory in a sealed zone that holds code (tests aside) and is not a
  container, a slot or inside a slot. Every module has a door (B7): `index.ts` in `src`;
  in `scripts`, `index.mjs`, or `index.ts` when the module's own code is TypeScript
  ("befitting their languages": `scripts/minify/`); and `index.css` when it publishes CSS.
- **Door modules (`doorModule`).** An entry source that sits inside a kernel module is a door
  of that module. `./motion-core` (`composables/motion/motion-core.ts`) is a door of
  `composables/motion`, beside its `index.ts`.

## §2 The publication anchor (P3-R1(a), read by name)

A file is **published** when an entry exports a name whose origin is that file. It is anchored
in the innermost door directory on that name's re-export chain from the entry. Per X-10, a
container's or a slot's directory never anchors. A kernel entry's claim widens from its own
directory to its module, so the 7 hooks that kernel entries publish stay in
`src/composables/`. A door anchors only the names an entry takes from it, so growing a door
never anchors a file. (`bAnchor`)

## §3 Targets

A placement row's target is chosen in this order:

1. the authored target, if the law names one (`authored/targets.json`, each with its reason);
2. otherwise the floor's `proposedPath`, except that in the `scripts` zone a shared file lands
   in its home directory itself. R-4's `composables/` slot is the hook slot of `src`, and a
   script is not a hook.

A target that two files claim, or that already exists, is **NEEDS-NAME**, and the run stops
until a person names it. (`targetOf`)

## §4 Placement: F-7 at the depth FD-2 permits

F-7 runs over R-2 units (FD-3 slots fold into their unit) with the §2 anchor, in both sealed
zones (B-05). For each `move` or `global` row, the image graph is built with that one file,
plus any authored group that moves with it, at its target. The floor's `sccGrowth` judges
that image over `src`, `scripts` and `demo`:

- If the move would add a co-cyclic module pair and the file already lies inside F-7's home,
  the file is **bound**: it stays (FD-2 is a stop).
- A named **hold** stays, with its floor reason (`authored/seal-review.json` → the pin's
  `holds`). **(pass 4)** There are none. Pass 3's two holds are gone:
  - `_shared/overlay/isTeleportedTarget.ts` is placed by its readers (P3-R6): P4-F2 declares
    the `demo.css` glob delta (`authored/targets.json` `globDeltas`, with its reason), S1d
    drops the overlay door's unread re-export (the relay that would close `overlay ↔ dock`
    under FD-2: 3 added pairs with it, 0 without), and the authored target puts it beside its
    one reader in `dock/composables/` (the dock root would hold 13 files);
  - `scripts/structure/lib/resolve.mjs` needs no move: since P4-F2, `lib/move.mjs` reads it
    too, so its F-7 home is `lib/` where it sits (P4-F3 would now carry the move anyway).
- Every other row is a violation (B10).
- **(pass 4, B-S15) R-8's tooling script.** `scripts/safari-probe.mjs` has no importer; it is
  run by hand. R-8 places it in the module it serves: it reads the demo's glass paint
  (backdrop-filter, radius) over Safari WebDriver, the readback `paint-arm.mjs` makes on
  Chromium, so it joins that module at `tests-visual/paint/` (S19).

**A test is not a reader** (`placementGraph`). R-3 puts a test with its subject, and a
colocated test must not then pull its subject toward the test's slot. So F-7 reads the graph
with test files left out.

**The module carve** (derive/carve.mjs) proposes modules from G's within-unit dominance law
(`lib/dominance.mjs`, the earned transfer). Every proposal is decided by name in
`authored/names.json`: `name`, `collapse`, `keep` (with a reason) or `rootAs`. The
authored peer-set carve is listed there with its reasons. **The base rule:** a parent reads
its children through its door, so a parent-level file that a child value-reads would close a
parent↔child cycle. That file, and its value-read closure, moves to one sibling module per
parent, named in `bases`.

## §5 Doors

- **One door per crossing (B1).** A reference from outside module M into a file of M goes
  through the door of M, where M is the outermost module it enters. The rule covers values,
  types, `vi.mock`, dynamic imports and path reads. A member never imports its own door.
- **Sub-doors of an entry.** When M's door is a published entry that does not carry the
  name, the crossing goes through the door of the sub-module that holds it. The published
  surface does not grow.
- **Tests read their home.** A test in `M/__tests__/` reads M's subtree at any depth, because
  R-3 makes the module's inside its subject. It still crosses every other module through the
  door, or through an entry source inside that module (`./motion-core` is how the library
  itself reads motion's pointer and spring leaves).
- **The test seam.** A test's text read (`path-literal`, `path-helper`, `new-url`,
  `ts-reference`) and its `vi.mock` target are neither a door crossing (B1) nor consumption
  (B2). A read is a scan: R-3 keeps the library-wide ones in `tests/`, B0 keeps them visible,
  and B16 homes a single-subject reader. A mock names the file its subject loads, and a door
  cannot stand in for it (mocking the door replaces every name it carries).
- **Consumers (B2, R-10).** A module reference (any module kind: import, type import,
  `typeof import(…)`, dynamic import, re-export) from `demo`, `scripts`, `tests` or
  `tests-visual` into `src` targets a file that is an entry source (a published JS or CSS
  entry, or a published asset), exactly. `tests/harness/` is exempt (R-3: it is the module
  that reads the tree), and so is the test seam below. A page import a Playwright spec writes
  as a served path (`import("/src/…")`) is a module reference like any other.
  A name no entry publishes is a surface decision, never a side effect of a reroute: either
  the consumer stops reading it (it reads a published name with the same contract, keeps its
  own copy, or, a test, moves to the name's unit), or the name is published on the entry that
  owns it with a MIGRATION "added" row and a surface-pin row (P5-R3; `derive/publish.mjs`
  builds the tree and refuses any surface difference the rows do not name). Pass 6's names,
  both arms each, are in `../B2-residual-arms.md`.
- **One symbol, one door (B9; R-6 as amended by P3-R4).**
  - A door re-exports only its module's subtree. For an entry door, that is its `doorModule`.
  - A name published on two entries keeps the entry that owns its origin.
  - Where two entries of one module both publish a name, the lighter entry keeps it
    (`./blob-config`, `./motion-core`, `./fourier-math`).
  - Each drop is a MIGRATION removal row whose first cell is the name.
- **Surface (B11).**
  - An internal door publishes only names that something outside its module reads.
  - A door exports at least one name.
  - The pin (`records/seal-pin.json`) fixes the module set and every door's names, so any
    change to either is a reviewed diff.
  - **(pass 4, B-11)** The pin has one path. The gate takes no `--pin` option and `seal()`
    takes no pin argument: it reads `records/seal-pin.json` or throws. The CLI refuses any
    option it does not take (`--pin` among them) instead of ignoring it, and the gate's test
    plants that call. `--write-pin` writes
    what the gate measures now, and a land writes the reviewed half to the one path for its
    measuring run (`derive/land-gate.mjs`).
- **(pass 4) A new entry beside an old one (B-S10, P3-R5).** `./aurora-config` is a leaf at
  the aurora unit root, `aurora/aurora-config.ts`, as `./blob-config` is `blob/config.ts`.
  The config module's own door cannot be the entry: it carries names the component reads
  that no consumer should (`isAuroraDriftLive`), and an entry publishes every name its door
  holds. It carries every name `./aurora` took from the config module, by origin, and the
  first-paint ground (P3-R5's reason); `./aurora` drops each (B9), with a MIGRATION row per
  name and one for the key (`derive/split-entry.mjs`, which also splits every consumer
  import). R-10's async boundary loads the public entry: `import("@glass/components/aurora")
  .then((m) => m.Aurora)` (G's L4.5 construction).
- **Only a door re-exports (B12).** No module keeps a `.d.ts`/`.d.mts` mirror of itself.
- **Door purity (B14).**
  - A JS door holds only `export … from` statements.
  - A CSS door holds only `@import`, `@layer` statements, and an `@source` over its own
    subtree (P3-R8).
  - When a split is needed, a door's code moves to a leaf. A class-recipe leaf is named
    `<unit>Variants.ts` (`authored/doors.json`).
  - An `@source` that only does work in the shipped copy is written there by the build
    (`shipSourceDirective`).

## §6 The CSS channel (P3-R2)

- Every CSS crossing, whether an `@import` or an SFC `<style src>`, targets the entered
  module's `index.css`.
- A consecutive run of imports into one module becomes one door import. The door lists the
  run in order, so the flattened cascade is unchanged.
- **(pass 4)** One rung is authored, because one door per unit forces it: `card/scroll.css`
  joins card's own rung (B3). It is a **listed reorder**, judged pair by pair by the floor's
  FD-4 (`cascade.mjs verify --reorders`, P4-F7): a swapped pair is a risk when the two rules
  share a declared property in one layer at one specificity on classes that co-occur in a
  source recipe, and a risk is covered only by a spec that reads the property.
- **(pass 4, B-08)** Pass 3's second rung is withdrawn (S-28: it changed every Chip's
  `--accent-band-strength` from 22%/25% to 18%). `accent-tone.css` is placed by its load
  edge, as P3-R2 places every sheet: its one loader is the glass sheet, so it moves into
  `src/styles/glass/` at S4a and keeps its HEAD rung (after `ladder-undershadow.css`, before
  `rim.css`). The kernel then reads no unit (B8) and no order changes for it. Chip reads its
  classes, not its file.
- Placement treats CSS by the same law, but only after this channel gives every sheet its
  load edge through its unit's door.
- **(pass 6, P6-F1) An SFC split is a declared scope.** The cascade names a Vue scope id by the
  component it scopes (`data-v-(Timeline)`). When a split re-homes rules into a new component
  (S39-03: `TimelineMarks.vue`), the listing declares the scope (`authored/p6-listed-reorders.json`
  `scopes`); the rules it re-homes must be the same text, and any rule order the split changes
  is a listed reorder that FD-4 judges pair by pair like any other. Changing a value in a split
  rule reads RED.

## §7 Bins (B13)

- A bin is an executable: the target of a `package.json` script token or a CI run token
  (FD-10's `json-command` and `yaml-command` edges).
- Nothing imports a bin except the harness.
- A root config that imports a scripts module is reading a library module, and that does not
  make the module a bin.

## §8 Type homes (B4)

- Value and type edges between siblings are acyclic at every depth. **(pass 4, cB O-1)**
  Siblings include the files of one directory: a file cycle inside a module is counted like
  any other (pass 3 filed it under `meta.b4info`, which this section did not state). S35
  cures the three the tree held: the canvas suspend-reason union moves to the observers that
  write it; the accent-tone shell declares the one export it reads from its lazy leaf, which
  implements it; the floor's move plan vocabulary (`expandMoves`, `kindClass`) moves to its
  own leaf, `scripts/structure/lib/plan.mjs`, read by the engine and by FD-5.
- A type cycle between sibling modules is cured by moving the declaration to the module that
  owns its meaning:
  - the aurora uniform table moves to the frame bridge that uploads by name;
  - the image-input types move to the config that names them.

## §9 Tests (R-3, B16)

- A test is a `*.test.ts`, `*.test-d.ts` or `*.spec.ts` (any `.ts`/`.tsx`/`.mts`), or a
  `*.visual.ts` (a one-unit Playwright spec in its unit's slot). Another file in a `__tests__/`
  slot is a helper, read only by tests of that slot (B16).
- **Subject and home (B16).** A test's subject is the sealed files it reads: by symbol through
  doors, and by path (a text read). When it reads a unit, the kernel files it reads leave the
  subject (a unit test uses the kernel as a unit file does, B8); the kernel is the subject
  only when the test reads nothing else. Its home is the deepest module or unit holding every
  subject file. It has no home (it belongs to the harness, `tests/`) when the subject spans a
  container or a zone, when it reads `demo` or `tests-visual`, or when it reads a directory
  (a walk). **(pass 6)** A subject made only of the kernel container's own files is homed in
  `src/components/_shared` (§1).
- A test with a home lives in `<home>/__tests__/`; a test without one lives in `tests/` (or,
  a page spec, `tests-visual/`). B16 reports a test outside its home's slot, and a colocated
  test whose home is elsewhere or nowhere.
- **(pass 5, P5-R5) A page-driving spec's subject.** A Playwright spec that reads no sealed
  file takes the units of the stories it opens. It opens a story by a route literal in its own
  text (`"/data/sortable-list"`), and the story manifest's key rule names the story's file:
  the one `demo/stories/<category>/**/<id>.vue`. A story's units are the component units its
  own files reach through their entries (the story file and the files of its category it
  reads, at any depth). One unit: the spec is that unit's `*.visual.ts`.
- **(pass 6, B-S16) The Playwright program holds every Playwright test.** A file in the five
  zones that declares Playwright tests (a top-level `test(…)` or `test.describe(…)` on a `test`
  imported from anything but vitest) and that the program (`tests-visual/playwright.config.ts`,
  `testDir` `..`, `testMatch` `tests-visual/**/*.spec.ts` and `src/**/__tests__/*.visual.ts`)
  does not collect never runs: B16 reports it.
- **B8's test arm.** A colocated test is not library code: it may read the test harness (the
  `tests` zone: helpers, setup) and the repo root, never a consumer zone. The test program
  (`tsconfig.test.json`) type-checks `src/**/__tests__` and `scripts/**/__tests__`, so a
  `*.test-d.ts` colocates too; `*.visual.ts` is left to the Playwright program.
- The library program (`tsconfig.json`) leaves `src/**/__tests__` out, and the test program
  takes it in. A source walker skips the slot, as the harness does.
- **(pass 6) Cutting a test.** A test file whose parts have different homes is cut by what each
  part reads (`authored/p6/b2/split.mjs`): every describe, every child of a split describe and
  every helper after the first describe lands in a part, and no test lands twice. A part that
  loses a demo fixture re-states its claim on the library's own fixtures, named in the cut.
- **R-1's retire.** `scripts/gate-register.mjs` and its test leave. **(pass 4)** The floor's
  first row, `r1` (P4-F1), retires them before any structure row.

## §10 No masking fallback (B17) (pass 4, S-14; pass 6)

A primary works, or it fails loud (the edict: "no masking fallbacks"). B17 reads the syntax of
every code file in the five zones and the root configs (`gate/fallbacks.mjs`).

- **Reads.** A call is a read when its callee (an identifier or a property name) is an fs read
  (`readFileSync`, `readFile`, `readdirSync`, `readdir`, `openSync`, `readJson`,
  `readJsonSync`), `import(…)` or `require(…)`; or is named `read…` (the tree's readers are
  named so); or **(pass 6)** is called by its bare name and is a function the five zones or the
  root configs declare whose body calls a read, to a fixpoint over the whole tree. A method on
  an object (`page.goto(…)`) is a read only by the first two rules.
- **(a) a missing-file fallback**: a negative guard (`if (!existsSync(p)) return x`), a positive
  guard (`if (existsSync(p)) return read(p); return x`, an `else` that returns `x`, or the
  implicit `undefined`), **(pass 6)** a conditional read (`if (existsSync(p)) { …read(p)… }`
  with no `else`) and a conditional collect (`if (existsSync(p)) paths.push(p)`), and the
  ternary (`existsSync(p) ? read(p) : x`), where `x` is nothing, a nullish or empty literal, or
  a value the code was handed. A record that names the absence reports it, and `false` is a
  predicate's answer.
- **(b) a swallowed read**: `try { read } catch { return x }` with that one silent return, or
  an empty handler; a `try` that loads a module whose handler does not throw.
- **(c) a swallowed load or read on a promise**: `.catch(h)` or `.then(ok, h)` whose handler
  never throws, on a chain that starts at `import(…)`, at a read, or **(pass 6)** at a call,
  with any arguments, of a loader bound to a name (a local binding or a parameter whose value
  is a function).
- **(d) a skipped suite**: `describe.skipIf(!existsSync(p))` and its `it`/`test`/`runIf`
  forms.

The cure is at the cause: the read fails on the missing file with the platform's error (or the
code throws naming it), and a load's failure rejects. Declared limits: a read reached through
a computed callee (`obj[k]()`), a reader passed as a value under a name that is neither
`read…` nor declared as a reader, and a named handler (`.catch(onError)`) are not seen.

## §11 Names (B15) (pass 4, B-07; pass 6)

- B15 judges the directories and file stems of all five zones: a placeholder name (`utils`,
  `helpers`, `misc`, `common`, `tmp`, `new`, `old`, `legacy`, `compat`, `v2`, a wave id), and a
  directory that repeats its parent. The module-shape arm (a module named as a kind slot)
  judges the sealed zones, where modules are declared.
- **(pass 6, B-07) Provenance names.** A stem or directory that ends in a number numbers a copy
  or a slice, with or without a separator (`helpers2`, `utils-3`, `motion2`, `GlassDock-2`,
  `part-1`, `bs11`); one that ends in `Part` or `Split`, optionally numbered (`GlassDockPart2`,
  `GlassDockSplit`, `dock-split`), names a slice of another file. A test stem is judged
  without its kind suffix (`suffuse2.spec.ts` reads `suffuse2`). A name the pin reviews
  (`names`, each with its reason) is exempt. S62 renamed the three numbered specs by what each
  reads.
- A file named for another unit is reported unless the pin reviews it.

## §12 Bounds (B6) (pass 5, P5-R4)

Every directory of the five zones holds at most 12 direct files (slots included, tests
counted); every code file of the five zones holds at most 500 lines, and so does every
hand-written root config (the root directory itself is not counted). `vite.style-fold.ts` was
split by concept to hold it (S61: the style closure is `vite.style-closure.ts`).

## The gate: eighteen clauses

`scripts/structure/seal/seal.mjs` computes every clause over one F-1 graph.
`tests/gates/seal.test.ts` runs it in process under `npm test`, through the floor runtime's
door, with one `it` per clause and one that requires all eighteen. There is no comment
opt-out and no off switch: the gate takes neither `--no-pin` nor `--pin`, the pin is always
read from its one path, and a missing pin throws.

| Clause | Judges |
|---|---|
| B0 | F-1 violations (self-name in src included); directory listings read from the syntax and scanner edges into a sealed zone (pass 5), and computed-path reads, outside the harness, the floor runtime and a Playwright config |
| B1 | door crossings (§5), own-door imports |
| B2 | a consumer zone's module reference that does not target an entry source (§5); the harness and the test seam are out |
| B3 | a CSS crossing that misses the CSS door |
| B4 | sibling cycles, value and type, at every depth, the files of one directory included |
| B5 | a door or a sub-directory in a kind slot |
| B6 | §12: over 12 direct files in any directory, over 500 lines in any code file or root config |
| B7 | a sealed code directory with no door, script code behind a CSS-only door, a src door missing from `record.doors` |
| B8 | the kernel reads a unit; the library reads another zone (a colocated test may read `tests` and the root) |
| B9 | a door re-exports outside its module; a name on two entries |
| B10 | placement (§4) |
| B11 | internal-door names with no outside reader, empty doors, the pin (modules and every door's names) |
| B12 | relays and declaration mirrors |
| B13 | a bin imported by anything but the harness |
| B14 | door purity |
| B15 | §11: placeholder and provenance names and a dir that repeats its parent, in all five zones, test stems included; a module named like a kind slot; a file named for another unit (unless reviewed in the pin) |
| B16 | §9: a test outside its home's slot (page specs by the stories they open), a slot helper read from outside its slot, a Playwright test the program does not collect |
| B17 | §10: a masking fallback |
