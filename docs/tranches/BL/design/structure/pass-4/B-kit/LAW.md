# D1-B law, pass 3: sealed modules, flat

This is the law the B-kit derives from and the gate judges by. The code form lives in
`lib/law.mjs`, which lands in the tree as `scripts/structure/seal/law.mjs`, and in
`gate/seal.mjs`, which lands as `scripts/structure/seal/seal.mjs` (a module of the floor
runtime since S19; its door `seal/index.mjs`, read through `scripts/structure/index.mjs`). The derive tools and the gate
import the same functions, so each rule is written down once. RULINGS R-1..R-10 (as amended),
X-10 and P3-R1..P3-R9 bind throughout. The floor (F-1..F-10, FD-1..FD-11) is the machinery
every rule runs on.

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
  `holds`). There are two:
  - `_shared/overlay/isTeleportedTarget.ts`, under FD-8: `demo.css` reaches it through
    `@source ../src/components/_shared/**/*.ts`, and the floor has no css-source declaration
    arm to declare that scan delta;
  - `scripts/structure/lib/resolve.mjs`, under an F-2 defect: moving it into `lib/graph/`
    (its dominance home, beside the scanners S19 moved) makes the engine rewrite the
    generated root literal `"tests-visual/.cache"` in `GENERATED_ROOTS` to `"null"`, and the
    image check refuses the move.
- Every other row is a violation (B10).

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
- Two rungs are authored, because one door per unit forces them:
  - `accent-tone.css` joins the `./styles` aggregate after the glass block (B8: the kernel
    reads no unit);
  - `card/scroll.css` joins card's own rung (B3).
- Both rungs are listed reorders. Each writes selectors that no sheet between its two rungs
  targets, and π checks the bands.
- Placement treats CSS by the same law, but only after this channel gives every sheet its
  load edge through its unit's door.

## §7 Bins (B13)

- A bin is an executable: the target of a `package.json` script token or a CI run token
  (FD-10's `json-command` and `yaml-command` edges).
- Nothing imports a bin except the harness.
- A root config that imports a scripts module is reading a library module, and that does not
  make the module a bin.

## §8 Type homes (B4)

- Value and type edges between siblings are acyclic at every depth.
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
- **R-1's retire.** `scripts/gate-register.mjs` and its test leave (S21), the precondition
  R-1 names for moving a rostered test.

## The gate: seventeen clauses

`scripts/structure/seal/seal.mjs` computes every clause over one F-1 graph.
`tests/gates/seal.test.ts` runs it in process under `npm test`, through the floor runtime's
door, with one `it` per clause and one that requires all seventeen. There is no comment
opt-out and no off switch: the gate takes no `--no-pin`, the pin is always read, and a missing
pin throws.

| Clause | Judges |
|---|---|
| B0 | F-1 violations (self-name in src included), directory walks and computed-path reads outside the harness and the floor runtime |
| B1 | door crossings (§5), own-door imports |
| B2 | a consumer zone's module reference reaches a non-published src file (R-10); the test seam is out |
| B3 | a CSS crossing that misses the CSS door |
| B4 | sibling cycles, value and type, at every depth |
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
| B15 | placeholder names, a module that repeats its parent or is named like a kind slot, a file named for another unit (unless reviewed in the pin) |
| B16 | R-3 test colocation, the kernel as a dependency; a slot helper read from outside its slot |
