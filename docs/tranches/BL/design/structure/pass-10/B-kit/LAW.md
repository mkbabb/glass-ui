# D1-B law, pass 10: sealed modules, flat

This is the law the B-kit derives from and the gate judges by. The code form lives in
`lib/law.mjs`, which lands in the tree as `scripts/structure/seal/law.mjs`, and in
`gate/clauses.mjs`, which lands as `scripts/structure/seal/clauses.mjs` (a module of the floor
runtime since S19; its door `seal/index.mjs`, read through `scripts/structure/index.mjs`; its
CLI `seal/seal.mjs`, pass 8). The derive tools and the gate
import the same functions, so each rule is written down once. RULINGS R-1..R-10 (as amended),
X-10, P3-R1..P3-R9 (P3-R9 as re-worded by P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2 and
P8-R1..P8-R3 and P9-R1..P9-R2 bind throughout. The floor (F-1..F-10,
FD-1..FD-11, with P4-F1..P4-F7, P5-F1..P5-F4 and P6-F1..P6-F3) is the machinery every rule runs
on. Each section states what the gate reads, so a literal reading of it gives the gate's
verdict; where the code reads more or less than a sentence says, the sentence is wrong. Changes
are marked **(pass 4)**, **(pass 5)**, **(pass 6)**, **(pass 7)**, **(pass 8)**, **(pass 9)** and **(pass 10)**.

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
parent, named in `bases`. **(pass 10, P9-R1 (a))** The carve skips a file that is a door, and an
entry source is one, so `fourier-field/math.ts` (the `./fourier-math` entry source, which the child
`renderer/mint.ts` value-reads) was left at the parent level and closed `fourier-field` ↔
`fourier-field/renderer`. S74 applies the base rule to it: it moves into the unit's named base
module, `fourier-field/register/` (`bases` names `register` for the unit root), where it stays the
`./fourier-math` entry source; its readers are re-pointed by the floor engine, and B4's module arm
(§8) reads the cycle at 0. The same arm reads a second component on the chain's tree, in the
`scripts` zone: `scripts/structure/lib` ↔ `scripts/structure/lib/graph` (the child `graph/graph.mjs`
value-reads `tree.mjs`, `placement.mjs`, `entries.mjs` and `resolve.mjs` at lib's level, while lib's
door, `move.mjs` and `classify.mjs` read the graph through its door). The base rule places those four
and their value-read closure (`symbols.mjs`) in lib's base module `lib/tree/` (S74d), which gets its
door (S74e), and every reader crosses through it. Two rows come first so the floor engine can carry
the move: `entries.mjs` names its own path by an explicit file URL, which F-1 reads as an edge with
a span (S74b), and the landed engine keeps a root-relative spelling's `./` lead when its holder
moves, as FLOOR.md F-2 (P4-F3) states (S74c; the docs floor's `lib/move.mjs:168` carries the old
line).

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
  both arms each, are in `../../pass-6/B2-residual-arms.md`; **(pass 7)** P6-R1 rules them as
  landed except `useScrollScene`, which is arm (a): the scroll story keeps the liquid-weight
  spine beside it (`demo/stories/motion/scroll/useScrollScene.ts`, reading `useReducedMotion` on
  `./motion-core` and keyframes.js's `SmoothProgress`) and the library file leaves `src` (S65);
  no step publishes it, so it has no MIGRATION row and no pin row.
- **One symbol, one door (B9; R-6 as amended by P3-R4).**
  - A door re-exports only its module's subtree. For an entry door, that is its `doorModule`.
  - A name published on two entries keeps the entry that owns its origin.
  - Where two entries of one module both publish a name, the lighter entry keeps it
    (`./blob-config`, `./motion-core`, `./fourier-math`).
  - Each drop is a MIGRATION removal row whose first cell is the name.
- **Surface (B11).**
  - An internal door publishes only names that something outside its module reads.
  - **(pass 7, P6-R2)** In `src` a door grows for its consumers, and a test is not one: a src
    door name whose only readers outside its module are tests is reported (`… (no reader
    outside …)`). R-3 homes a test with its subject, so a test that needs a module's inside lives
    in that module's slot (S67: the eyeglass law's own arms live in
    `composables/motion/selection/__tests__/eyeglass.test.ts`, and the tabs-seam test states the
    geometry it observes: span 1.6, swell 1.22, the annotation delay 100 ms). The `scripts`
    zone has no entries, so its harness tests (`tests/gates/*`) read the floor runtime through
    its doors, and those readers count.
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
- **(pass 7, §P6-8.4; pass 8, P7-R1) Peer classes (B18).** An entry's declared peer class holds
  over its static closure. The declarations are the root barrel's own table, "Heavy-peer
  exclusions", which the barrel cites and S55 moved beside it (`src/README.md`; on the floor
  base it is still in `src/index.ts`): the heavy peers are the packages its Peer column names
  (`@mkbabb/keyframes.js`, `@vueuse/core`); the root ("vueuse-free AND keyframes.js-free") and
  every row whose Peer column reads "(none …)" (`./motion-core`) are free of every one; every
  other entry may bear a peer. A table the reader cannot find, a row with no peer, or a
  declared entry the record does not publish is a throw (no verdict), never an empty class.
  The closure is read over value-level static edges (`import type`, type-only re-exports and
  dynamic `import()` load nothing at evaluation), three ways:
  - **names**: every runtime name the entry publishes (a name the surface pin lists as runtime,
    or one it does not list at all), by the closure of the file that declares it (the floor's
    symbol origins);
  - **files**: the entry source through every door it reads (an unbundled evaluation, so a
    door that carries a heavy name drags it into every reader);
  - **dist**: the built entry file in `dist/` (what a consumer loads).

  **B18 owns the class** (P7-R1). It judges the names and files arms, which need no build, in
  the gate's one static walk, under `npm test` (`tests/gates/seal.test.ts`, with a RED case,
  a keyframes.js leaf `./motion-core` publishes, and a GREEN one, the same leaf loading vue).
  Its reader is `gate/peer.mjs` (landed as `scripts/structure/seal/peer.mjs`). The dist arm
  stays in the kit's probe `tools/peer-closure.mjs`, which reads the two source arms with that
  same file and adds the dist arm; a missing build is a throw there (exit 2), never a pass.
  The root's class is broken on the floor base already (HEAD's state, outside D1, P7-G5). The
  pin's reviewed `peerHolds` name those breaks exactly: per entry, the published names that
  reach each peer (7 reach keyframes.js, 14 reach `@vueuse/core`, name for name the floor
  base's own report) and the peers the files arm reaches, with the reason. B18 reports every
  other break, and every held break that no longer occurs. A door a free entry reads
  therefore carries no heavy-peer name: a module whose files differ in class splits by class
  (S71-S71d: `useLiquidFlex` joins the engine-free `core`, the selection engine leaves `morph`
  for its own module `selection`, and `useLiquidReveal` joins `morph`). **(pass 8)** The names
  arm found one break the chain had made and the entry-grain probe could not see, since the
  root was already broken for that peer: the root's `Slider` reached keyframes.js, because
  S15 placed `useDockHold` beside its reader and B1 routed its dock-context read through the
  dock entry's door, and the context read `dock/constants.ts`, which reads `springPreset`
  through the motion door. S73-S73c cure it at the cause: the context's injection label moves
  into the context (§8), the context becomes the dock's sub-module `dock/context/` with its own
  door (B7), and every reader crosses through that door (B1), the slider's dock hold included.
  **(pass 9, P8-R3)** `src/README.md`'s table is the one record of the declared classes, and the
  pin does not repeat it: withdrawing a class (removing an entry's row: `./motion-core`'s, say) is a
  reviewed edit of that source file, read by B18 as written, while a missing table, a row with no
  peer or a declared entry the record does not publish stays a throw. **(pass 10, P9-G2)** The reader
  does what that sentence says: a line naming `@mkbabb/glass-ui/<sub>` whose Peer cell is empty or
  whitespace is a throw (it was read as no row), and a line of the table (after its column rule, up
  to its first blank line) that names a peer or `(none …)` with no subpath is a throw. A line that
  names no subpath and no peer is a continuation of a Symbol(s) cell.
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
  module's `index.css`. **(pass 7, P6-G3)** B3 reads every form the floor's CSS scanner
  yields an edge for: a sheet's `@import` (the string and the `url()` forms, with or without a
  `layer(…)`), an SFC's `<style src>`, and an `@import` inside an SFC's inline `<style>`. A
  crossing that also makes the kernel read a unit is B8 as well, and one that gives a private
  sheet a second reader is B10 as well. An `@import` inside a comment loads nothing and is no
  edge: the pass-2 battery's I7 row plants exactly that (its regex inserts after the usage line
  of `src/styles/index.css`'s header comment), which is why it read MISSED from pass 2 to pass
  6. The pass-2 critic's own re-plant (the import at the end of the aggregate, `probe3.mjs`) is
  caught, and `tools/battery.mjs` carries it.
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

- Value and type edges between siblings are acyclic at every depth.
- **(pass 10, P9-R1 (a)) Value edges are acyclic at module grain, parent↔child included.** A node
  is a file's innermost module (a container's own file is its container); an edge is a value edge
  (a type-only import or re-export loads nothing) between two nodes of one sealed zone, tests left
  out. B4 counts every strongly connected component of that graph in which one node lies inside
  another. A parent reads a child through the child's door, so a child that value-reads a
  parent-level file closes such a component; the sibling rule, which reads one level at a time,
  does not see it. A component with no nested pair projects onto a sibling cycle at its members'
  common level and is counted by the sibling rule. The reader is `gate/cycles.mjs` (landed as
  `scripts/structure/seal/cycles.mjs`), split from the clauses by §12's bound. **(pass 4, cB O-1)**
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

## §13 The browser bar (pass 8, S-12, P7-R2)

The bar is base-green: no test that passes on the floor base fails on the migrated tree.

- **Selection.** `tools/browser-select.mjs` derives the run's arguments from the committed
  chain alone: every move (`moved.json`), every row-edited path (`changed.txt`), and every
  spec of the final tree's Playwright program that a move or a row touches (`specs.txt`),
  which the run names outright (`--specs`). The graph's bands select a spec by what it reads,
  and a moved spec does not read its own path, so a band-less moved spec is selected by name
  (P7-G3). `tools/base-specs.mjs` gives the base run the base program's key of every
  selected spec the chain carries from the base (`lib/follow.mjs`); a selected spec no base
  spec reaches is one the chain creates, and has no base-green test.
- **(pass 9, P8-R1 (a)) Capture specs are excluded, by statement.** A spec whose basename starts
  with `_` (`tests-visual/captures/_veil-capture.spec.ts`) is a capture spec: a recording tool
  that writes screenshots and records into `docs/` and asserts no product behaviour. Running one
  rewrites tranche records, so no browser run selects it, on either tree, and no base-green key
  exists for it (`lib/floor.mjs` `loadProgram`: `specs` without them, `captures` naming them).
  The selection states what it leaves out: `browser-select.mjs` prints every capture spec of the
  final program that a move or a row touches, with its steps, and writes them to
  `captures.txt`. A moved capture spec is still read: B0 judges every reference the floor graph
  parses in `tests-visual/`, so an import of a moved capture spec that resolves to nothing is an
  F-1 violation and the gate reads RED (the pass-9 battery plants one); the move engine's image
  check refuses a move that would leave one.
- **Keys.** A test is keyed `spec :: title #n`, `n` numbering the tests one report gives
  the same spec and title, so every test is a key. The base report is re-keyed onto the
  migrated program (`tools/rekey.mjs`, P6-F2).
- **Tally.** `tools/browser-tally.mjs` iterates the base's keys (P7-G2). A key is
  **base-green** when it passes on the floor base in every base run that ran it. A base-green
  key is **held** when every route run that ran it passes it, and **not held** when a route
  run fails it or when no route run reports it (absent). The verdict is GREEN when every
  base-green key is held; the tally prints every key it does not hold, and the per-band
  counts from the route report's own band table.
- **(pass 10) A step that moves a `src` file.** The selection of the whole chain is the program
  (155 specs), so the specs a pass's own steps touch are named apart: the seat's `--select-only` over
  that pass's moves and row files (the graph), plus every spec that opens a story or route the moved
  unit renders, by its text (a page-driving spec reaches the unit through no graph edge, P5-R5). Those
  specs run on both trees (`--workers=1`, the seat's own server), and each run joins the tally as a
  rerun of its tree beside the committed full runs, so a key it holds must pass in both the full
  route run and the new one.
- **Flakes (P7-R2).** Every spec holding a key the two full runs leave unheld (base-green in
  the base run, not passed in the route run) runs alone, alternating base then route, three
  times per tree (`browser.mjs --specs <spec>`); each base rerun is re-keyed like the base
  run. A key that passes in the base's full run and fails in any base rerun is **flaky**:
  recorded, and kept out of the bar. The reruns' reports are committed beside the full runs.

## §14 Kit judges' exits (pass 9, P8-R2)

P6-R3's exit law binds every kit judge, not only the gate: `tools/browser-tally.mjs`,
`tools/browser-select.mjs`, `tools/rekey.mjs` and `tools/peer-closure.mjs` exit 0 on GREEN (or,
for the two that write an input, when it is written), 1 on RED, and 2 on any throw. Each installs
`seal.mjs`'s guard (process `uncaughtException`, which an unhandled rejection reaches too) as its
first statement and imports nothing but node's own before it; the kit modules it needs load after
it, by a dynamic import the guard covers. A degenerate input is a throw, never a verdict: no
arguments, a missing or non-JSON input, a report of another schema, a report with no results, a
base that passes no test, a selection of no spec, and a dist entry (or a module it imports) that
is empty. **(pass 10, P9-G1)** That covers every input argument and every report field a judge reads:
the probe's `--base` must be its own floor-base report (`floorBase` true, `entries` holding every
entry the tree declares free, each with three `broken` lists), so `{}`, `[]`, a report of another
kind and the probe's own non-floor report are throws, never "no break at the base"; its `--overlay`
is a map of at least one path to text; a browser report's every result carries a spec, a title and
a status, and it carries a band table; a rerun is keyed from the route's `testDir`; `rekey` refuses
a report it already re-keyed; `browser-select` refuses a chain step whose frozen file holds neither
a move list nor a row. No judge defaults a missing report field to a value (`??`, `||`): where a
default stays, it is a stated reading of an absent option (no `--base`: every break is the chain's;
an entry the table does not declare free may bear any peer) or a printed label.

## The gate: nineteen clauses

`scripts/structure/seal/clauses.mjs` computes every clause over one F-1 graph, and
`scripts/structure/seal/seal.mjs` is its CLI. **(pass 7, P6-R3; pass 8, S-14)** The CLI exits 0
when every clause is 0 (GREEN), 1 when a clause counts a violation (RED), and 2 when it reaches
no verdict. **Every throw is no verdict, without exception**, wherever it happens: while the
gate's modules evaluate (a floor module that throws as it loads; a `package.json` that does not
parse, which the floor reads as it loads), in the run (a missing pin, an overlay that is not
JSON, a read that fails, a refused option, a `--root` that names nothing), or while a record is
written (`--json`, `--write-pin`). The CLI imports nothing but node's own: its first statement
installs the guard (process `uncaughtException`, which an unhandled rejection reaches too: it
prints `seal: no verdict` and the stack, and exits 2), and the gate loads after it, by a dynamic
import the guard covers. A caller that reads 1 as RED never reads a crashed gate as one;
`derive/land-gate.mjs` accepts 0 and 1 and rethrows anything else. **(pass 7, P6-G6)** The
record's `files` counts the files the clauses judge: the five zones and the root files of the
tree's own listing (`git ls-files -co --exclude-standard`, build output out), named in the
record as `filesScope`; it never counts `docs/` or a seat's scratch, so two worktrees at one
code digest read one number.
`tests/gates/seal.test.ts` runs it in process under `npm test`, through the floor runtime's
door, with one `it` per clause and one that requires all nineteen, and runs the CLI for each
exit: a refused `--pin`, a non-JSON overlay and an unwritable `--json` (2), a planted crossing
(1), and **(pass 8)** the floor runtime copied under a root whose `package.json` does not parse,
and under one where a floor module throws as it loads (2), and **(pass 10)** two RED cases: B18 throws on a
declaration row with an empty or whitespace Peer cell and on a peer with no subpath (P9-G2), and B4 reads
a parent↔child value cycle planted in the dock's `context/` module (RED) and the same reverse edge as a
type-only import as no count (P9-R1 (a)). There is no comment opt-out and no
off switch: the gate takes neither `--no-pin` nor `--pin`, the pin is always read from its one
path, and a missing pin throws.

| Clause | Judges |
|---|---|
| B0 | F-1 violations (self-name in src included); directory listings read from the syntax and scanner edges into a sealed zone (pass 5), and computed-path reads, outside the harness, the floor runtime and a Playwright config |
| B1 | door crossings (§5), own-door imports |
| B2 | a consumer zone's module reference that does not target an entry source (§5); the harness and the test seam are out |
| B3 | a CSS crossing that misses the CSS door: `@import` (string or `url()`), SFC `<style src>`, SFC inline `@import` (§6) |
| B4 | sibling cycles, value and type, at every depth, the files of one directory included; **(pass 10)** every value SCC at module grain that nests one node in another (parent↔child) |
| B5 | a door or a sub-directory in a kind slot |
| B6 | §12: over 12 direct files in any directory, over 500 lines in any code file or root config |
| B7 | a sealed code directory with no door, script code behind a CSS-only door, a src door missing from `record.doors` |
| B8 | the kernel reads a unit; the library reads another zone (a colocated test may read `tests` and the root) |
| B9 | a door re-exports outside its module; a name on two entries |
| B10 | placement (§4) |
| B11 | internal-door names with no outside reader (in `src`, a test is not one), empty doors, the pin (modules and every door's names) |
| B12 | relays and declaration mirrors |
| B13 | a bin imported by anything but the harness |
| B14 | door purity |
| B15 | §11: placeholder and provenance names and a dir that repeats its parent, in all five zones, test stems included; a module named like a kind slot; a file named for another unit (unless reviewed in the pin) |
| B16 | §9: a test outside its home's slot (page specs by the stories they open), a slot helper read from outside its slot, a Playwright test the program does not collect |
| B17 | §10: a masking fallback |
| B18 | §5 "Peer classes": a declared-free entry's names arm (a published runtime name whose module reaches a heavy peer) or files arm (the entry source through its doors reaches one), unless the pin's reviewed `peerHolds` hold exactly that break; a held break that no longer occurs |
