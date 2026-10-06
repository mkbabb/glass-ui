# D1-B law, pass 4: sealed modules, flat

This is the law the B-kit derives from and the gate judges by. The code form lives in
`lib/law.mjs`, which lands in the tree as `scripts/structure/seal/law.mjs`, and in
`gate/seal.mjs`, which lands as `scripts/structure/seal/seal.mjs` (a module of the floor
runtime since S19; its door `seal/index.mjs`, read through `scripts/structure/index.mjs`). The derive tools and the gate
import the same functions, so each rule is written down once. RULINGS R-1..R-10 (as amended),
X-10 and P3-R1..P3-R9 bind throughout. The floor (F-1..F-10, FD-1..FD-11, with P4-F1..P4-F7)
is the machinery every rule runs on. Pass 4's changes are marked **(pass 4)**.

## §1 Units, modules, containers

- **Sealed zones** are `src` and `scripts`. The gate's structural clauses judge only these.
  `demo`, `tests` and `tests-visual` are consumer zones.
- **Containers** are `src`, `src/components`, `src/composables`, `src/components/_shared` and
  `scripts`. A container holds modules and has no door of its own. `_shared` is a kernel
  container (pass 3): `_shared/overlay`, `_shared/field` and the rest are modules inside it.
- **Kind slots** follow FD-3's predicate (`composables/`, `styles/`, `__tests__/`), except
  that a child of a container is never a slot (`src/composables` is a container, not a slot).
  A slot has no door and no sub-directory (B5).
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
- **Consumers (B2, R-10).** A consumer module reference (import, type import, dynamic
  import) into `src` targets an entry source. A name no entry publishes is a surface
  decision (a reviewed pin growth with its MIGRATION row), never a side effect of a reroute.
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

- A test is a `*.test.ts`, `*.test-d.ts` or `*.spec.ts` (any `.ts`/`.tsx`/`.mts`). Another
  file in a `__tests__/` slot is a helper, read only by tests of that slot.
- A test lives with its subject, in `<home>/__tests__/`. Its home is the deepest module or
  unit that holds every sealed file it reads (by symbol through doors, with path reads
  counted), less the kernel when it reads a unit: a unit test uses the kernel as a unit
  file does, one rank below it (B8), so the kernel is its subject only when it reads nothing
  else.
- **B8's test arm.** A colocated test is not library code: it may read the test harness (the
  `tests` zone: helpers, setup) and the repo root, never a consumer zone. The test program
  (`tsconfig.test.json`) type-checks `src/**/__tests__` and `scripts/**/__tests__`, so a
  `*.test-d.ts` colocates too.
- A test whose subject spans a container, a zone or a directory walk belongs to the harness
  (`tests/`).
- The library program (`tsconfig.json`) leaves `src/**/__tests__` out, and the test program
  takes it in.
- A source walker skips the slot, as the harness does.
- A test stays in `tests/`, named with its reason, only when FD-2 refuses its home or the
  engine has no rewrite for one of its references. Pass 3's second seat re-read the pass-2
  stay reasons: "a closed record names it" was the gate register, which R-1 retires (S21);
  "not a `*.test.ts`" and "reads outside `src`" were cured by the test program and B8's test
  arm; "FD-2" was cured by reading the subject from its own module (S22). After S24 and S26
  no test stays.
- **R-1's retire.** `scripts/gate-register.mjs` and its test leave. **(pass 4)** The floor's
  first row, `r1` (P4-F1), retires them before any structure row; B's S21 left the chain, and
  colocation (S15) no longer reads a roster.

## §10 No masking fallback (B17) (pass 4, S-14)

A primary works, or it fails loud (the edict: "no masking fallbacks"). B17 reads two forms
from the syntax of every code file in the five zones and the root configs:

- **a guard that returns as if a missing file were empty:** `if (!existsSync(p)) return …`,
  the negation alone or in an `||` chain, returning nothing, a nullish or empty literal, or a
  value it was handed (an accumulator, the input). A returned record that names the absence
  reports it, and `false` is a predicate's answer (`isRealPng`: a missing file is not a PNG);
- **a swallowed module load:** `.catch(h)` on a chain that starts at `import(…)`, or a `try`
  whose block loads a module with `import(…)`, where the handler never throws.

The cure is at the cause: the guard leaves and the read fails on the missing file with the
platform's error; a load's failure rejects. Declared limits: only the syntax is read, so a
load passed through a function value (`c().catch(…)` with `c = () => import(…)`), a ternary
(`existsSync(p) ? read(p) : ""`) and a `.then(ok, h)` handler are not seen.

## §11 Names (B15) (pass 4, B-07)

- B15 judges the directories and file stems of all five zones: a placeholder name, a
  directory that repeats its parent. The module-shape arm (a module named as a kind slot)
  judges the sealed zones, where modules are declared. `tests/utils` dissolves (S36).
- G's name deltas are reviewed one by one in `authored/names.json` `g_review`: B takes
  `register` (fourier-field's base) and `drop` (sortable-list's), keeps its own reading of
  `toast` and `sheet`, and names the `./aurora-config` leaf `aurora-config.ts` so no file
  shares a stem with the `config/` module beside it.

## The gate: eighteen clauses

`scripts/structure/seal/seal.mjs` computes every clause over one F-1 graph.
`tests/gates/seal.test.ts` runs it in process under `npm test`, through the floor runtime's
door, with one `it` per clause and one that requires all eighteen. There is no comment
opt-out and no off switch: the gate takes neither `--no-pin` nor `--pin`, the pin is always
read from its one path, and a missing pin throws.

| Clause | Judges |
|---|---|
| B0 | F-1 violations (self-name in src included), directory walks and computed-path reads outside the harness and the floor runtime |
| B1 | door crossings (§5), own-door imports |
| B2 | a consumer zone's module reference reaches a non-published src file (R-10); the test seam is out |
| B3 | a CSS crossing that misses the CSS door |
| B4 | sibling cycles, value and type, at every depth, the files of one directory included |
| B5 | a door or a sub-directory in a kind slot |
| B6 | R-5 bounds: over 12 direct files in any directory, over 500 lines in any code file |
| B7 | a sealed code directory with no door, script code behind a CSS-only door, a src door missing from `record.doors` |
| B8 | the kernel reads a unit; the library reads another zone |
| B9 | a door re-exports outside its module; a name on two entries |
| B10 | placement (§4) |
| B11 | internal-door names with no outside reader, empty doors, the pin |
| B12 | relays and declaration mirrors |
| B13 | a bin imported by anything but the harness |
| B14 | door purity |
| B15 | placeholder names and a dir that repeats its parent, in all five zones; a module named like a kind slot, a file named for another unit (unless reviewed in the pin) |
| B16 | R-3 test colocation, the kernel as a dependency; a slot helper read from outside its slot |
| B17 | a masking fallback (§10): a silent return on a missing file, a swallowed module load |
