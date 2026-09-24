# D1 · pass 2 · SPECS-v2: the three live routes, specified on the floor

| field | value |
|---|---|
| seat | D1 pass-2 SYNTHESIS. One spec per live route (B, D′, G), each built on the floor's tools and applying R-1..R-10 as written, with R-2 as amended on 2026-09-23. It does not rank the routes |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `20911dce`. `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines, so every pass-2 number measures the code pass 1 measured. The floor has been tracked since `ed188a86` (30 files) |
| inputs, read in full | `REGISTRY.md`; `RULINGS.md`, including the R-2 amendment, which landed while this seat was running; `CHARTER.md` (the edict, last four paragraphs); `floor/FLOOR.md`; `pass-2/FLOOR-REPORT.md`, `B-research.md`, `Dp-research.md`, `G-research.md`; the floor's `lib/placement.mjs`, `placement.mjs`, `bounds.mjs`, `gates.mjs`, `graph.mjs`, `move.mjs`, `entries.mjs`, `cascade.mjs`; the four seat returns |
| instruments | the floor's own library, read-only from the checkout (`buildGraph`, `placeAll`, `proposedPath`, `makeOrigins`), printing to stdout. No build and no worktree. §6.3 lists each command |
| fences | no source edit and no git write; nothing read under `~/.claude`; this file is the only write |

Short citations:
- `B §5.1` is `pass-2/B-research.md` §5.1.
- `D′ §7` is `pass-2/Dp-research.md` §7.
- `G §2` is `pass-2/G-research.md` §2.
- `FR §4.2` is `pass-2/FLOOR-REPORT.md` §4.2.
- `REG` is `REGISTRY.md`.
- Step ids are `<route>-S<n>`.

---

## 0 · In brief

- **Three specs on one base.**
  - §1 is what every spec inherits: the floor tools each one calls, eleven floor deltas owed before any route prototype, the rulings in operational form, and the rules that do not depend on the route.
  - §2, §3 and §4 are the specs. Each has the same ten parts: unit set, placement, naming, bounds, gate, migration order, tests and stories, `scripts/`, where the route cannot satisfy a ruling, and its seat's open gaps, verbatim, each with a disposition.
  - §5 carries the floor seat's gaps. §6 lists what this seat measured.
- **Placement between units is the same function in all three specs.** F-7 with the R-2 anchor, run on the floor at HEAD, reproduces B's api arm exactly: of 53 move/global rows, 31 are anchored and 22 remain (19 move, 3 global).
  - The 17 SFCs that the literal rule moved are all anchored, including `Skeleton.vue` and the 7 `table/*` files.
  - `NEEDS-NAME` falls from 5 to 1.
  - What differs between the routes is what each does below and around that placement: B seals and authors names, D′ ranks and mints no dir, and G nests by dominance and takes names from roots.
- **Where each route cannot satisfy a ruling:**
  - **B.** The seal cannot keep a kernel entry publishing a file that placement moved into a unit, so 25 name-slots change entry. R-2 says placement is decoupled from the surface (§2.9).
  - **D′.** It cannot mint a dir. R-2's recursive unit therefore fails for 7 sub-components in 6 units, and R-5 fails for the 66 bound violations whose modules need names (§3.9).
  - **G.** It cannot split a peer set, so R-5 fails for `menu`, `src/styles`, `styles/glass`, `styles/tokens`, the story categories and `tests-visual`. It also cannot name a layered backend module (§4.9).
- **What this seat measured on the floor (§6), and the spec each finding changes:**
  1. F-4's normaliser renames Vue scope ids and `v-bind` hashes but not scoped `@keyframes` suffixes. `dist/glass-ui.css` holds 6 such names, 12 occurrences in all, so a pure move that edits one of those SFCs reads RED `content` (FD-4).
  2. `dirUnits` treats `src/styles/` as the `styles/` slot of the unit `src`. As a result `glass.css:68 → chip/accent-tone.css` reads `ok`, and CSS held only by aggregators stays outside F-7 until the channel collapse (FD-3, §1.4).
  3. F-1 already reads `resolve(import.meta.dirname, "../..")`, so D′'s hole 1 came from its own scratch graph. F-1 also expands `@source` globs per file, so F-2's image check refuses D′'s +4.60 kB arrival instead of letting it through (FD-8, FD-9).
  4. Under R-2 as amended, `useDockHold.ts` is anchored in dock. D′'s carve moved it to slider (§3.2).
  5. F-1 parses no `.yml` file, so a script named only in CI reads as unread (FD-10).

---

## 1 · The base every spec builds on

### 1.1 Floor tools each spec calls

| item | file and function | what every spec uses it for |
|---|---|---|
| F-1 graph | `lib/graph.mjs`: `buildGraph(root, {overlay})`, `valueSccs(g, zone)`, `moduleSccs(g, {moduleOf, kinds, zones})`. CLI `graph.mjs` | The one graph that every clause of every gate reads. No route builds its own (REG M-5). It is fail-closed on every S-4 edge kind, and a violation exits 1 |
| symbols | `lib/symbols.mjs` `makeOrigins(g)` → `exportsOf`, `originOf`, `readsOf` | Reads by symbol through barrels; the anchor set (FD-1); door name sets |
| F-2 moves | `lib/move.mjs` `runMoves(root, moves, {dry, declaredScanDeltas})`. CLI `move.mjs <list.json> --root <linked worktree>` | Every file move. Preflight writes nothing, then an image check, then rollback on failure. It refuses the main checkout, and a rerun is a no-op |
| rows | `rows/lib.mjs` (exact text, one match, all-or-nothing), `rows/apply.mjs` | Every content edit, which this document calls a hunk. A step is an ordered list of rows and move lists |
| F-3 record | `records/entry-record.json`; `lib/entries.mjs` `validateRecord`, `emitExports`. CLI `entries.mjs check\|write` | Which file each entry publishes, and `doors`, the declared non-entry `index.ts` files. The build guard throws on an undeclared `index.ts` at any depth |
| F-4 cascade | row `f4-terminal-role`; `cascade.mjs contract\|snapshot\|verify` | A baseline, named by the base SHA, taken before step 1. `verify` runs after every step that moves or edits CSS or an SFC |
| F-7 placement | `lib/placement.mjs` `placeAll(g, units, {zones})`, `dirUnits()`, `proposedPath(tree, row)`. CLI `placement.mjs --moves` | Placement between units and into existing dirs. It never mints a dir: a target that two files claim, or that already exists, prints `NEEDS-NAME` and is never emitted |
| surface pin | `surface.mjs check\|pin`, `records/surface-pin.json` | 68 keys, 62 `typesVersions`, 603 runtime and 1,279 declaration names. Any change is a reviewed diff |
| bounds | `bounds.mjs` | R-5's measure. Each spec turns it into a gate clause |
| floor gates | `gates.mjs`, row `f9-wire` | F-1, F-3, the F-4 contract and the surface pin, run under `npm test` |
| plants | `plants/graph-plants.mjs` (59) | Graph regression. It is not an intent battery (F-9) |

### 1.2 Floor deltas owed before any route prototype

None of these depends on the route. Each is built once on the floor, like F-1 to F-10, before a route prototype runs.

**FD-1 · The anchor parameter (R-2 as amended).**
- **Signature.** `placeAll(graph, units, { zones, anchor })`, where `anchor(file) → unit | null`.
- **Definition.** For each `index.ts` under `src/` that is not a direct child of a container (`src`, `src/components`, `src/composables`) and does not sit under a global zone (`GLOBAL_ZONES`), every file it re-exports by symbol origin (`makeOrigins(g).exportsOf(door)`) from inside its own dir is anchored to that dir's unit. The innermost door wins. A kernel door anchors nothing.
- **Effect.** An anchored file's row gets class `anchored` instead of `move` or `global`.
- **Measured at HEAD on the floor (§6.2).**
  - 53 move/global rows: 31 anchored, 22 left.
  - This equals B's api arm (B §5.1: 22 at HEAD).
  - All 17 SFCs the literal rule moved are anchored.
  - `NEEDS-NAME` goes from 5 to 1.
- **The reading of "publishes".** Five compound families (`accordion`, `alert`, `avatar`, `skeleton`, `table`) have no subpath entry. Their `index.ts` files are declared doors in `record.doors`, and `src/index.ts` re-exports them.
  - FD-1 anchors through any declared door. This is B's measured reading, and the only one under which `Skeleton.vue` stays in `skeleton/` (R-9).
  - The ruling's word is "publishes", so the driver confirms this reading.
- It replaces B's local `ownDoorExports` (seal.mjs B10).

**FD-2 · Placement to a fixpoint, with a cycle check.**
- A migration repeats `placement.mjs --moves` and then `move.mjs` until 0 moves are proposed.
- After each pass, `moduleSccs` over the route's unit function must not grow.
- Why: an LCA move can create a cycle. `createCanvasLifecycle` moved up to `composables/glass/` while still reading `webgl/backingSize` and `webgl/visibility`, and the next pass cured it by moving both helpers up (B §5.2).
- At HEAD the two-pass chains are visible in §6.2. For example, `useRAFLoop.ts` first goes to `composables/glass`, then to dock once `useGlassBackdropLuminance.ts` has moved.
- `dirUnits` is already recursive (every dir is a unit), so "F-7 within modules" (B gap 14) is this fixpoint and not a new function.

**FD-3 · One kind-slot predicate.** Today the floor has two:
- **`lib/placement.mjs` `dirUnits`** treats any dir whose basename is in the slot set as a slot. It therefore reads `src/styles/` and `src/composables/` as slots of the unit `src`.
- **`bounds.mjs`** treats a dir as a slot only when it sits below a zone's first level (`/^(src|demo)\/./`).

The measured consequence:
- Every file that only a top-level `src/styles/*.css` aggregator reads has home `src`, and so reads `ok` anywhere under `src/`.
- This covers `chip/accent-tone.css`, the upward `glass.css:68` edge that D-crit §3.1 says is "exempted, not cured", and the 5 `styles/glass/*.css` sheets that D′ returned to components by their class users.

The fix is one predicate, B's `isSlot`: a slot is a dir named in R-5's set that is neither a zone root nor a direct child of a zone or container. Both files import it.

**FD-4 · Scoped `@keyframes` in the F-4 normaliser.**
- **What the normaliser misses.** `cascade.mjs` `leafSequence` renames `data-v-<8hex>` and `--<8hex>-` by first appearance. It does not rename Vue's scoped keyframe suffix `<name>-<8hex>`.
- **Measured in the checkout's `dist/glass-ui.css`, which `./styles` inlines.** 6 names, each appearing twice:
  - `feedback-mark-pulse-4a47d962`
  - `hm-settle-0e9beb0b`
  - `progress-discharge-0fd1fae9`
  - `skeleton-breathe-0d5ebb1f`
  - `tl-check-4c4ed383`
  - `tl-detail-4c4ed383`
- **Consequence.** Vue derives the id from the SFC's path and source. Any step that edits or moves one of those SFCs therefore reads RED `content` on a pure move. B found the same 12 occurrences with its own `cssdiff` (B §10.3).
- **Cure.** Rename every identifier that a flattened sequence declares with `@keyframes` and that carries an 8-hex suffix, in order of first appearance, and apply the same map to its `animation`/`animation-name` uses.

**FD-5 · The move-only diff classifier, harvested from D′ `cascade-arm.mjs` onto F-1 and F-2 manifests.**
- **What it does.** Every file a structure step changes falls into one of four classes:
  - move-only: its text equals the base text once every specifier range is replaced by the base path it resolves to;
  - a resolution-preserving re-point, judged by symbol origin;
  - a `vi.mock` re-aim;
  - an authored hunk named in the step's manifest.
  
  Any other edit fails.
- **What it catches that nothing else does.** M-D2 at byte 74,264 of `./styles`, which vitest misses, and a legitimate CSS rule smuggled into a structure wave (D′ §7).
- **What it does not cover.** It judges structure steps only. An intended CSS change never runs through it.

**FD-6 · The harness reader (F-6).**
- **The module.** A `tests/harness/` module exposes F-1's file set and resolved reads: `files({zone, under, suffix})`, `read(file)` and `edges({from, to, kind})`. It is the one way a whole-library suite reads source, which is R-3's "reads the resolved graph, never a directory walk".
- **Precondition.** It is a precondition for moving any test into `src/`. A `readdirSync` of a unit meets `__tests__/`, and `easing.contract`'s 33 tests went uncollected with EISDIR (D′ §10).
- **Suites that move onto it:**
  - B0's 168 walks and 334 computed reads (B §2 G7);
  - 19 tests and 2 suites that read by computed path (B §10.2);
  - 8 suites, `easing.contract` and 38 directory-walking unit tests (D′ §10, gap 12);
  - 17 single-subject tests that read src by path literal (G §10).

**FD-7 · Entry-rooted declarations (F-5), and the program design R-3 needs.**
- **Library program.** `tsconfig.build.json` and the library typecheck program name the entries (`files`), with no `include` and no `exclude`. Dist then leaves `__tests__/` out by reachability (S-13), with no exclusion list.
- **Test program.** The vitest program includes `**/__tests__/*.test.ts` and `tests/**` by suffix.
- **Visual program.** `*.visual.ts` belongs to the tests-visual program.
- **Numbers this design must absorb.**
  - D′'s T4 exclusion hid 39 library-program errors (vitest globals and test shims).
  - T5 hid 23 errors from Playwright specs that were never type-checked at HEAD. They surface in whichever program first includes them.
- **Ledger rows.** The three `tsconfig.build.json` excludes and the two dead `vitest.config.ts` includes in the ledger resolve here (FR §5 item 9).

**FD-8 · Glob arrivals: only a ruling is left.**
- **The expansion (measured).** F-1 expands `@source` per matched file: `demo/demo.css:106` `../src/components/_shared/**/*.ts` is 20 edges, out of 475 `css-source` edges from 6 sites.
- **The refusal.** F-2's image check rolls back a move that adds a file to a glob's match set (FR §2.2, the story-manifest glob case). A test moving into `_shared/__tests__/` is therefore refused with a gained `css-source` edge. D′'s +4.60 kB demo CSS cannot recur silently.
- **What remains.** A ruling on how a `@source` scan treats a unit's `__tests__/`. The glob's `**/*.ts` matches `*.test.ts`. The options are a narrower glob, an exclusion (compare R-3's "no exclusion list", which is about dist), or a slot suffix the glob cannot match.

**FD-9 · Paths rooted at `import.meta.dirname`: the prototype runs it.**
- F-1 reads `tests/styles/material-css-syntax.test.ts:7` `resolve(import.meta.dirname, "../..")` as a `path-literal` via `anchored`, resolving to `.`, and line 8 as `src/styles/glass/material.css` (measured).
- D′'s hole 1 came from its own graph.
- Under F-2, moving that test either rewrites `"../.."` or fails the image check, because line 8 would then resolve nowhere. Which of the two happens is not measured. The first route prototype that moves the file records it.

**FD-10 · CI YAML tokens.**
- F-1 parses 0 `.yml` files.
- `.github/workflows/{ci,release}.yml` name `scripts/release.sh` 3 times. `package.json:489` also names it (`json-command`), so nothing reads as falsely unread at HEAD.
- R-8's rule "no reader, delete" becomes unsafe over `scripts/` once a script is named only in CI. A `yaml-command` token scan, like `json-command`, runs before any R-8 deletion.

**FD-11 · Landing the floor.**
- **Where it goes.** The floor is tracked under `docs/`. Row `f3` makes the build read `records/entry-record.json` from there. At landing it becomes the `scripts/structure/` module, moved by F-2: `RECORD_PATH`, `LEDGER_PATH` and `PIN_PATH` are path literals that F-1 sees and F-2 rewrites.
- **Bound.** `lib/scan.mjs` is 600 lines, over R-5's 500. It splits along its exports: `scanScript`; `scanCss`; `scanJson`, `scanSh` and `scanHtml`; and `scanVue`.
- **`scripts/import-dag.mjs`** (628 lines, with its own graph) is deleted under E-7. F-1's `valueSccs` and `moduleSccs`, taking the route's unit function as `moduleOf`, carry its SCC report. Its only readers in F-1 are two rows of the floor's opaque ledger and a self-reference, and they are removed in the same row.
- **What that costs.** The deletion also removes pass 2's independent SCC witness. After it, independence comes from the critics' batteries (F-9), not from a second graph.

### 1.3 The rulings in operational form

| ruling | operational form in every spec | tension every spec inherits |
|---|---|---|
| R-1 | Precondition of step 1: W-REGISTER-COLLAPSE has landed. No step rewrites a BK/BJ record, and the new roster names no path | D′'s 4 `gate-register` failures leave with the register |
| R-2 | F-7 over `dirUnits()` (FD-3), with the FD-1 anchor, to a fixpoint (FD-2). A door is never a reader. The entry record points at wherever a file lives, so the surface holds except for ruled rows | B cannot keep a kernel entry publishing a unit file (§2.9). The meaning of "publishes" for the 5 doorless-subpath families (FD-1) |
| R-3 | A single-subject test goes to `<unit>/__tests__/`; a single-subject visual spec goes there as `*.visual.ts`. Whole-library suites stay in `tests/`, and they and all scanners read through FD-6. Dist leaves tests out by FD-7's reachability | `@source` × `__tests__/` (FD-8). The 23 visual-spec type errors (FD-7). The slot bound (R-5) |
| R-4 | `composables/` at two grains. `proposedPath` puts a non-SFC file that several sub-units read in `<home>/composables/`, and a global file in `src/composables/` | — |
| R-5 | 12 direct files and 500 lines, over the five zones, with tests counted. A generated file is exempt only through a record that names its generator and the gate that verifies it. The one candidate is `src/index.ts` (584 lines at HEAD), generated from the F-3 record and checked byte-equal by `entries.mjs check`. An SFC splits only by extracting sub-components and composables | **The slot reading is ambiguous.** The text says slots are "not counted". B reads that as "not counted toward the parent, bounded itself"; D′ reads it as "exempt". At HEAD 3 slots are over: `aurora/composables` 16, `dock/styles` 15, `dock/composables` 13 (FR §4.4). Under R-3, `dock/__tests__` reaches 17 (B) or 21 (D′). Every spec gates the strict reading and reports the exempt one beside it until this is ruled, as REG §3.3 prescribes for a late ruling |
| R-6 | A symbol on two non-root entries fails. The second door drops it, with a MIGRATION removal row | The count: the ruling says 29, B9 reads 40 at HEAD and 46 on B's tree, and D′ dropped 59 names. The reconciliation is owed |
| R-7 | `./styles.css` carries the same rule set as HEAD: `cascade.mjs verify` with FD-4 | The channel collapse is not built by any route, and CSS placement waits on it (§1.4) |
| R-8 | Readers come from F-1, including `json-command`, plus FD-10 before any delete. At HEAD `safari-probe.mjs`, `pi-runner-manifest.mjs` and `regen-exports.mjs` have no edge of any kind; row f3 deletes the last. `Code.vue`'s one edge is a `css-source` scan. `canon-doc.mjs` is already absent | `springProjection.ts` has 4 readers and none in `src`: `demo/stories/motion/springs.vue:14`, `scripts/regen-spring-tokens.mjs:27`, and two tests. F-7 is zone-local, so a cross-zone disposition is a ruling (floor gap 9) |
| R-9 | FD-1 keeps `Skeleton.vue` in `skeleton/` (measured). A skeleton that stands in for one component is placed with it by F-7, as its reader | — |
| R-10 | Demo edges resolve to entry sources only. The async boundary imports the subpath dynamically | **The count.** The ruling says 7. B counts 71 to reroute, plus 18 onto private symbols, plus 1 dynamic leaf. D′ counts 90 (79 deep paths to published symbols, 11 to unpublished files). **The boot cost, which binds every route (B §8).** With doors only, the eager demo graph is 685,510 B against a ceiling of 503,808, because `./aurora` drags `Aurora.vue` and the renderer in. B's `./aurora-config` leaf brings it to 477,899 B. That is +1 export key, which needs a ruling, for any route |

### 1.4 Rules that do not depend on the route

- **Stories.** A story SFC is a demo-zone consumer, declared by the manifest's glob `./*/*.vue` and keyed there (R-10). It never moves into `src/`, where library code would read demo chassis; B8b and D′'s zone rule both fail that edge. `demo/stories/manifest.ts` (1,099 lines) splits under R-5. The split is one manifest per category, which is the category's own name, so no route has to author it. The category dirs over 12 (`containers` 13, `foundations` 13) need authored sub-dirs, which only B can supply (§2.7).
- **Cross-zone placement outside the library.** This is the S-15 consensus, 5 of 6 pass-1 families. A file in `scripts/`, `tests/` or `tests-visual/` whose every loader sits in one other non-library zone moves into that zone:
  - `scripts/lib/paint-arm.mjs` and `scripts/reflect-capture-verify.mjs` go to `tests-visual/`, since `paint-arm` is read by 8 tests-visual specs and `reflect-capture-verify` only by `paint-arm` (B §9.3).
  - A library file is never moved out of `src` this way (R-8 governs those).
- **M03 is cured by placement in every spec.** F-7 at HEAD reads `dialog/ModalOverlay.vue` as `global`, with readers dialog and sheet. Each spec's placement stage moves it out of `dialog/`, which removes the `dialog ↔ sheet` value SCC (floor gap 10).
  - `proposedPath` gives `src/components/_shared/ModalOverlay.vue`.
  - B and D′ both chose `_shared/overlay/`, an authored target.
- **CSS placement waits on the channel collapse (R-7).** F-7 counts only loads. At HEAD:
  - 44 of 54 component sheets are held only by CSS aggregators (G §9);
  - F-7 reads the aggregator-held sheets as `published` (in the `./styles` closure) or `ok` (home `src`, per FD-3);
  - class emission is a text-token heuristic, with 11 sheets that no unique class emits, so it cannot be a gate edge.
  
  CSS becomes placeable when each SFC loads its own sheet, which makes a load edge from its unit. Until then, a spec moves CSS only as an authored row whose reason is named, with `cascade.mjs verify` GREEN and π owed.
- **Per-step checks, in every spec, after every step:**
  - `graph.mjs` exit 0;
  - `vite build`;
  - `vue-tsc` on every program FD-7 defines;
  - `entries.mjs check`;
  - `cascade.mjs verify --baseline <base>` GREEN, or each divergence listed;
  - `surface.mjs check`, where the diff contains only ruled rows;
  - the route gate, with no clause count rising unless the step names it;
  - vitest, where each failure falls in a named, ruled class.
  
  At close, REG §6.4's bar applies in full: replay byte-identical, a rerun proposes 0 moves, `npm pack`, `verify:package`, Playwright executed on moved routes, and π per changed band (F-10).
- **Freezing against vacuity (F-9).**
  - Every move list and row that a migration computes with a gate's own function (F-7, a dominator tree, a home rule) is committed as literal JSON before the gate judges the result.
  - The critic writes the intent battery before reading the gate.
  - The gate must read RED at the base SHA.
- **Backends outside glass-ui.** value.js and speedtest are read-only evidence here (G CE3 and CE4, B G18). Migrating them is a sibling-tranche ask, fenced out of this tranche.

---

## 2 · Spec B · sealed modules, flat

### 2.1 Unit set

- **Zones.** The sealed zones are `src` and `scripts`. The containers `src`, `src/components`, `src/composables` and `scripts` hold modules but are not modules themselves. The kind slots are `composables/`, `styles/` and `__tests__/`, inside a module, by FD-3's predicate.
- **Modules.** Every other dir in a sealed zone whose subtree holds code is a module. It has a door for each channel it serves: `index.ts` for script code in `src`, `index.mjs` in `scripts`, and `index.css` for CSS.
- **No families.** B-flat measured the same bytes, surface and boot as B-families, with 33 fewer dir moves (339 files edited) and 9 fewer doors, 5 of them empty (B §6).
- **Units and kernel.** The units (R-2) are the component modules `src/components/<x>/` and every module below them. The kernel is `src/composables/**`, `src/styles/**` and `src/components/_shared/**`. The aggregates are `src/index.ts` and `src/styles/index.css`.
- **Doors have one source of record: F-3's `record.doors`.** B7 fails a required dir whose door the record does not list. The build guard fails an `index.ts` the record does not list. The fact is declared once and read twice.

### 2.2 Placement law

1. Placement runs `placeAll(g, dirUnits(), { zones: ["src", "scripts"], anchor })` with FD-1 and FD-3, to a fixpoint (FD-2), with targets from `proposedPath`.
   - At HEAD, in the `src` zone, it proposes the 22 rows in §6.2.
   - On B's own tree, the fixpoint took 3 passes and moved 26 files, plus the F-8 roving move (B §5.2).
2. A kernel file that one unit reads moves into that unit, because a kernel door anchors nothing. This is where §2.9(a) comes from.
3. A `NEEDS-NAME` target takes an authored name (§2.3).
   - The one left under FD-1 is `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts`, which collides with aurora's own `flow.glsl.ts`.
   - B named them `curlNoise.{glsl,wgsl}.ts`.
4. A new module, meaning a dir that F-7 cannot target, comes only from the carve (§2.3), never from placement.

### 2.3 Module naming law

- **The law.** A module's name says what the dir holds, and a person writes it. The module set is part of the B11 pin, so a new, removed or renamed module is a reviewed diff. What a name means is reviewed, not gated (B G9).
- **The mechanical floor, clause B15.** A segment may not:
  - match `^part-?\d+$`, `-\d+$` or a wave or pass id (`^[wp]\d+$`);
  - equal its parent segment;
  - equal a kind-slot name when the dir is a module.
- **The carve's names.** These are the 27 dirs built and measured on B's tree (B §7.1):
  - `aurora/atoms`, `aurora/webgl`, `aurora/webgl/palette`, `aurora/webgpu`. `constants/` and `constants/shaders/` are dissolved. The uniform table leaves `glSetup.ts` for `uniformBridge.ts`;
  - `dock/search`, `dock/legibility`, `dock/morph`, `dock/layers`, `dock/controls`;
  - `menu/sub`, `menu/items`;
  - `sortable-list/drag`;
  - `styles/glass/{material, engage, surfaces, shapes, plates, transitions, decoration}`;
  - `styles/tokens/{motion, surface, sizing, scheme, properties}`;
  - `styles/{surface, motion, scroll}`;
  - aggregators moved in as doors: `glass.css`, `tokens.css`, `typography.css` and `utilities.css` become `<dir>/index.css`, `theme.css` becomes `theme/index.css` (the key is unchanged), and `tokens.ts` becomes `tokens/index.ts`;
  - `typewriter/utils` dissolves into the root.
  
  `accessibility.css` stays where it is, as the declared terminal.

### 2.4 Bound enforcement

- **The rule.** B6, over the five zones: more than 12 direct files, or a hand-written source over 500 lines. Tests are counted. The slot reading is strict: a slot does not count toward its parent and is bounded itself. The exempt reading is reported beside it (§1.3 R-5).
- **Exemption.** A file is exempt only through a `generated` record that names the file, its generator and the checking gate. `src/index.ts` is the one candidate. No source comment opts out.
- **The split law:**
  - an SFC splits by extracting sub-components and composables into its unit;
  - a TS file splits by concern;
  - a CSS file splits into a module with an `index.css` door, in the same cascade order (`cascade.mjs verify` GREEN).
  
  The plan for the 16 `src` files over 500 lines is B §7.3.
- **Measured.** HEAD 75 (18 dirs, 57 files) → B's tree 65 (9 dirs, 56 files). `src` dirs over 12 go from 9 to 0.

### 2.5 Gate contract

`seal.mjs` (source: B Appendix A) lands at `scripts/structure/seal.mjs`. It reads F-1, F-7 and symbols from the floor library and runs under `npm test` through a row shaped like `f9-wire`. Every clause judges the resolved file, and no clause has a comment opt-out.

| clause | rule | HEAD → B's tree (B §1) | change in this spec |
|---|---|---:|---|
| B0 | F-1 violations; walks into a sealed zone from outside the harness; computed-path reads in `tests`, `tests-visual` and `scripts` outside the harness | 502 → 505 | none. FD-6 moves the harness side |
| B1 | recursive door: from outside M, only M's door or a published entry; a member never imports its own door | 382 → 0 | tests count as members of their module (§2.7) |
| B2 | consumer zones reach `src` only through entry sources | 731 → 733 | none |
| B3 | a CSS crossing targets `M/index.css` or a published CSS entry | 26 → 24 | none |
| B4 | no value or type cycle among sibling nodes at any depth | 3 → 2 | none |
| B5 | no door in a kind slot, and no dir inside one | 5 → 0 | none |
| B6 | R-5 bounds | 75 → 65 | strict slot arm |
| B7 | every code dir in a sealed zone is a module, a slot or a container; script code needs its JS door | 32 → 1 | reads `record.doors` |
| B8 | the kernel reads no unit (type-only and re-exports included; aggregates excepted); `src` reads no consumer zone | 3 → 0 | none |
| B9 | a door re-exports only its own subtree; a symbol sits on one non-root entry | 59 → 64 | none |
| B10 | F-7 over R-2 units | 22 → 0 | calls FD-1's anchor instead of its local `ownDoorExports` |
| B11 | door names equal the pin; no internal-door name without an outside reader; no empty door | 12 → 10 | the pin includes the module set (§2.3) |
| B12 | only a door re-exports (no relays); no `.d.mts` mirror | 24 → 12 | none |
| **B13** | **bins.** A bin, meaning a `json-command` target, a root-config import or an FD-10 YAML token, is imported by nothing except the harness | not measured | new: C20 |
| **B14** | **door purity.** A JS door holds only `export … from` and `export type … from`. A CSS door holds only `@import` and `@layer` statements | not measured. `alert/index.ts` holds a variant recipe (G §2 CE2), and the file-level SCCs `Alert.vue ↔ alert/index.ts` and `Badge.vue ↔ badge/index.ts` stand at HEAD (FR §2.1) | new |
| **B15** | names (§2.3) | not measured | new |

**Fail-closed edges.**
- B0 counts every F-1 violation.
- The reach set is `MODULE_KINDS`: 20 kinds, including `dynamic-template`, `vi-mock`, `css-url`, `css-reference`, `template-asset` and `glob`.
- It adds `READ_KINDS`: `path-literal`, `path-helper`, `new-url`, `ts-reference`.
- Walks are `scan` and `glob-literal`.

**What the gate must catch.** The critic writes an intent battery before reading `seal.mjs` (F-9):
- REG §6.4's B list:
  - C-6, a doorless dir that dock deep-imports (B7);
  - the S7 plants C-1b, C-2 and C-14 (B8);
  - the boot graph under 503,808 B with the seal intact (a measure kept beside the gate);
  - the a11y block last in dist (the F-4 contract).
- The new clauses:
  - a bin that imports a bin (B13);
  - a rule inside an `index.css` door (B14);
  - a `part-1` module (B15);
  - a kernel entry that re-exports a unit file (B8/B9).
- Regression: B's own 37 plants (35 land in their expected clause) and the floor's 59.

**Vacuity.** B10's zero on B's tree comes from a migration that ran F-7, the function B10 itself runs. The move lists are frozen (§1.4). B10's zero does not count until the critic's plant bites it: a kernel file that only dock reads, left in the kernel.

### 2.6 Migration steps, in order

Every step runs in a linked worktree. It is a committed list of rows and F-2 move lists, and it passes §1.4's per-step checks.

| step | what | measured basis |
|---|---|---|
| B-S0 | Preconditions: R-1 landed; FD-1 to FD-11 on the floor; `cascade.mjs snapshot --sha <base>`, `surface.mjs pin` and `seal.mjs --write-pin` at the base; the critic's battery written | — |
| B-S1 | `rows/apply.mjs`: f3, f4, m02, m03, f9 | FR §2 |
| B-S2 | the F-7 fixpoint with FD-1 and FD-2. `ModalOverlay.vue` goes to `_shared/overlay/` (authored target, §1.4); `flow.*` become `curlNoise.*` | 22 rows at HEAD (§6.2); 26 files in 3 passes (B §5.2) |
| B-S3 | the module carve, B's `flat-carve.json` (62 moves), re-run through F-2 on the placed tree. The uniform-table cut and the overlay door's unread `isTeleportedTarget` line become rows | 88 files, 209 rewrites, residue 0 (B §4) |
| B-S4 | the CSS carve: dock's `flat-css.json` (15 moves) plus the dock CSS doors as rows. The style-kernel carve is re-expressed as F-2 move lists plus rows. `accessibility.css` stays the terminal | B's own `style-carve2.mjs` left 3 + 2 residues, which F-2 refuses. The order held once scope ids were normalized (B §10.3) |
| B-S5 | doors: an `index.ts`, `index.mjs` or `index.css` for every dir B7 requires, each added to `record.doors` in the same row. Importers reroute to doors as generated rows whose edits are all re-points (FD-5), and door growth lands in the B11 pin diff | 32 mandatory doors; 451 rerouted; converged in 2 passes (B §4) |
| B-S6 | relays cut: 11 lines in 7 files, plus the `minify-css.d.mts` mirror, with importers rewired to the origin | B12 12 |
| B-S7 | `SelectionValue` moves to `motion/morph/` beside `useSelectionGroup`, and its 17 readers reroute | B4 cure (B §11 item 7) |
| B-S8 | R-6 rows: second doors drop, with MIGRATION rows | 46 multi-entry keys on B's tree against the ruling's 29 |
| B-S9 | the kernel-entry names, per the §2.9(a) ruling | +36/−25 |
| B-S10 | `./aurora-config`, ruling-gated. The `presets.ts` split makes `aurora/config/` (config types, `DEFAULT_AURORA_CONFIG`, `auroraFallbackGround`), whose `index.ts` is the entry source. 3 names leave `./aurora` (R-6 rows) | 477,899 B in the relay form; the seal-clean form is not measured (B §8) |
| B-S11 | the 16 splits of B §7.3 | not built |
| B-S12 | FD-6 applied: the computed-read suites move onto the harness reader | 19 tests and 2 suites (B §10.2) |
| B-S13 | the R-3 test move (§2.7) under FD-7's programs | 160 colocate by B's projection (B §9.1) |
| B-S14 | demo: the R-10 reroute; the 16 private symbols decided (published, which is a pin diff, or moved into demo); `containers/disclosure/`, `foundations/surfaces/`; the manifest split per category | 135 files, 348 specifiers (B §9.2) |
| B-S15 | scripts (§2.8): `scripts/lib/index.mjs`; the cross-zone moves (§1.4); `scripts/structure/` lands (FD-11); R-8 deletions after FD-10 | B7's last line is `scripts/lib` |
| B-S16 | the tests-visual carve (177 direct files) | authored, not built |
| B-S17 | `seal.mjs` wired: RED at the base, GREEN at the head | — |

### 2.7 Tests and stories under R-3

- **Home.** A test's subject is the set of files its src reads resolve to, by symbol, with doors not counted as readers. Its home is the `__tests__/` slot of the deepest module that holds every subject. Otherwise it stays in `tests/`.
  - B's projection at HEAD: 160 colocate (143 in `src`, 9 in `scripts`, 8 in `demo`), 94 stay in the harness, and 162 have no derivable subject (B §9.1).
- **Colocated tests are module members.** B1 applies to them: a test in `M/__tests__/` reads M's files freely, and anything outside M only through doors.
  - B measured 26 new B1 crossings from colocated tests that read a sibling module's internals.
  - Those tests re-home to the deepest module that holds all of their reads, or stay in the harness.
- **Slot bound.** Homing at the deepest module is how `dock/__tests__` gets under 12, with dock's search, legibility and layers tests going to their own modules. Whether it clears the 17 is not measured.
- **Visual specs.** A visual spec becomes `*.visual.ts` in the slot when its one route resolves to one unit. 62 specs name one story literal, and the single-unit count under B is not measured.
- **Stories:** §1.4.

### 2.8 `scripts/`, the backend analogue

- **Structure.** `scripts` is a sealed zone and a container. Bins sit at its top: every `json-command` target, root-config import or FD-10 YAML token. Modules are `scripts/<m>/` with an `index.mjs` door. B13 bars a bin from importing a bin.
- **Bounds.** B6 at 12 and 500. The top level holds 12 files at HEAD (§6.2), exactly the bound. Scripts over 500 lines:

  | script | lines | disposition |
  |---|---:|---|
  | `verify-export-types` | 1,080 | split |
  | `profile-bundle` | 939 | split |
  | `gate-register` | 740 | retires under R-1 |
  | `comment-census` | 726 | split |
  | `import-dag` | 629 | deleted (FD-11) |
  | `paint-arm` | 587 | goes to tests-visual (§1.4) |
  | `reflect-capture-verify` | 584 | goes to tests-visual (§1.4) |

  A bin over 500 lines becomes `scripts/<bin>/`, whose `index.mjs` is the bin, with its concerns split beside it. F-2 rewrites the `package.json` token (`json-command`).
- **Other languages.** The same clauses run with `SEALED` set per repo. value.js's census (read-only, by regex) is 115 files, 0 module doors, 17 cross-module deep specifiers and 110 module → platform edges: 127 edges would be born red (B G18). Not F-1, and not migrated here.

### 2.9 Where B cannot satisfy a ruling

- **(a) R-2's decoupling, for kernel entries.**
  - **What moves.** R-2 says "placement is by readers, and the entry record (F-3) points at wherever a file lives", and "a kernel door anchors nothing". Placement therefore moves files that `./motion-core` and `./dom` publish into dock, easing, slider, constellation and aurora.
  - **Why the seal forbids the three ways to keep the surface:**
    - the kernel entry reaching past the unit's door is B1;
    - a kernel door re-exporting a unit file is B8a and B9a;
    - publishing the file on both the unit's entry and the kernel entry is a dual door (R-6).
  - **The result.** The name changes entry: +36/−25 in total, including `./motion-core` −15 and `./dom` −10 (B §10.4). No ruling authorizes a single-door symbol changing its door.
  - **Two ways out, each owed:**
    - a ruling that makes these MIGRATION rows;
    - an aggregate-entry clause: an entry that re-exports outside its subtree is a pure door that no library file imports. That clause is D′'s aggregator anchor, and REG §6.5 has not earned it for B.
- **(b) R-5's slot reading.** Under the strict reading `dock/__tests__` holds 17 at unit grain (B §9.1). Deepest-module homing (§2.7) is not measured.
- **(c) R-3's "no exclusion list"** holds only once FD-7 is built. B has not measured it.
- **(d) R-6's count and R-10's count** are reconciliations owed by all three routes (§1.3).
- **(e) R-7.** B3's 24 crossings need the channel collapse, which is not built. π is owed.
- **(f) R-10's boot cost** needs the `./aurora-config` leaf (+1 key). No ruling authorizes a new entry, and this binds every route (§1.3).

### 2.10 B seat gaps, verbatim, with dispositions

1. "R-2 needs an amendment: literal placement moves 17 component SFCs, including Skeleton against R-9; the api-anchor rule reaches 0"
   → Closed by RULINGS R-2 (amended 2026-09-23). FD-1 builds the anchor on the floor, and this seat reproduces 22 at HEAD (§6.2).
2. "./aurora-config adds 1 export key and 3 R-6 removal rows from ./aurora and needs a ruling; the seal-clean config/ module (the presets.ts split) is not built and its bytes are not measured"
   → Carried. The ruling is owed by all three routes (§1.3 R-10). B-S10.
3. "Harness: B0 505 and B2 733 (402 edges stay in the harness after R-3), plus 19 tests and 2 uncollected suites that read source by computed path; all wait on F-6's harness reader"
   → Carried. FD-6, B-S12.
4. "R-6: B9 has 46 multi-entry keys against the ruling's 29, 18 door re-exports outside their subtree, and 25 kernel name-slots leaving ./motion-core and ./dom"
   → Carried. §1.3 R-6, §2.9(a), B-S8 and B-S9.
5. "B3 24: component CSS enters ./styles at two rungs (card, tabs, _shared), 5 SFCs import _shared partials directly, accessibility.css imports 2 utilities members; needs the R-7 channel collapse with π"
   → Carried. §1.4 (CSS waits on the collapse), §2.9(e).
6. "B12 12: 11 relays and 1 .d.mts mirror are not cut; the 5 composables/glass relays become B9a lines unless R-6 names the owner"
   → Carried. B-S6. The owner of the `createCanvasLifecycle` types is an R-6 row.
7. "B4 2: the motion/_shared cycle through SelectionValue (authored cure: move the type, reroute 17 readers; not built) and the motion kernel's internal cycle from HEAD"
   → Carried. B-S7 takes the first. The motion kernel's internal cycle has no named cure.
8. "G14: 16 src files over 500 lines have a split plan that is not built"
   → Carried. B-S11.
9. "demo, scripts and tests-visual carves are authored, not built: scripts/lib door, demo containers and foundations, manifest.ts at 1,099 lines, 177 direct files in tests-visual"
   → Carried. B-S14, B-S15, B-S16.
10. "Slot bound ruling: dock/__tests__ would hold 17 under R-3"
    → Carried. §1.3 R-5, §2.7, §2.9(b).
11. "16 private demo symbols need a surface decision"
    → Carried. B-S14.
12. "G19: π not run because no browser seat connected; the dock CSS carve changed file boundaries at a stable order"
    → Carried (F-10).
13. "F-9: the critic's independent plant battery is still owed"
    → Carried. §1.4 freezing, §2.5.
14. "F-7 should also place within modules: LCA placement created one cycle (createCanvasLifecycle), caught by B4"
    → Re-scoped. `dirUnits` is already recursive, and the cycle is a fixpoint effect: FD-2.
15. "The R-7 verifier must normalize Vue scope ids, or every migration that edits an SFC fails the byte diff"
    → Re-scoped. F-4 already normalizes `data-v` ids and `v-bind` hashes; it does not normalize scoped `@keyframes` (6 names, 12 occurrences): FD-4.
16. "5 failures not traced: 3 constellation tests (mock seam) and 2 aurora-harness tests"
    → Carried.
17. "Not run: replay determinism, 'rerun proposes 0 moves', npm pack, verify:package"
    → Carried (§1.4's close bar).
18. "R-8: 2 unread src files and 4 scripts with no reader need a check of package.json script invocations before deletion"
    → Partly answered. F-1 reads `package.json` script tokens (`json-command`):
    - `safari-probe.mjs` and `regen-exports.mjs` have no edge of any kind;
    - `canon-doc.mjs` is absent at HEAD;
    - `import-dag.mjs` is read only by two floor-ledger rows and itself.
    
    CI YAML is not scanned (FD-10).
19. "B0 has 1 false positive from F-1 (the \"src\" literal in auroraImageSource)"
    → Carried (an F-1 fix).
20. "G18: value.js starts with 127 violating edges (regex count, not F-1)"
    → Carried (a sibling ask, §1.4).

---

## 3 · Spec D′ · a rank table over today's dirs

### 3.1 Unit set

- **The table.** One table, 11 rows, each exactly `[prefix, stratum, grain]` with no prose (D′ §1). The longest prefix wins.

  | prefix | stratum | grain |
  |---|---|---|
  | `src/styles/` | foundation | self:foundation |
  | `src/fonts/` | foundation | self:foundation |
  | `src/html-attributes.d.ts` | foundation | self:foundation |
  | `src/composables/` | primitives | child |
  | `src/composables/glass/webgl/` | substrate | self |
  | `src/composables/glass/webgpu/` | substrate | self |
  | `src/composables/glass/canvas2d/` | substrate | self |
  | `src/composables/glass/procedural/` | substrate | self |
  | `src/composables/motion/pointer/` | substrate | self |
  | `src/components/_shared/` | patterns | child |
  | `src/components/` | components | child |

- **Ranks.** foundation 0, primitives 1, substrate 2, patterns 3, components 4, anchor 9, outside 10. `src/composables/` is kept (R-4).
- **Units.** Each `child`-grain dir is a unit, and every dir below it is a unit too (R-2).
- **Anchors are computed, never positional:**
  - `src/index.ts`;
  - every entry-map file that re-exports from a higher rank than its own: an aggregator, which must be a pure door that nothing in the library imports;
  - each CSS export entry, together with the import-only foundation sheets it reaches.
- **One source of record.** Row f3 deletes `subpath-policy.mjs`, and with it `COMPONENT_CLASS`/`COMPOSABLE_CLASS`, the second per-dir declaration (REG gap 17). After that, the table ranks and `record.doors` lists doors. They hold different facts.

### 3.2 Placement law

1. **Between units:** `placeAll(g, dirUnits(), { zones: ["src"], anchor })` with FD-1 and FD-3, to a fixpoint (FD-2). These are D′'s owner returns.
   - **What R-2 as amended changes against D′'s measured carve:**
     - `dock/composables/useDockHold.ts` is anchored in dock, because dock's door re-exports it (§6.2). D′ moved it to slider. It stays, and the name residue `slider/useDockHold.ts` never arises.
     - `sheet/motion.ts` is anchored. D′'s scrim split moves a declaration out of it, which is a hunk and not a file move. Whether sheet's door publishes the scrim symbol is not measured.
   - **D′'s owner returns that F-7 does not propose.** D′'s graph counted CSS class users as readers:
     - the 5 `styles/glass/*.css` sheets and `tabs/styles/drag.css`. F-7 reads the 5 as `ok` with home `src` (FD-3) and `drag.css` as `published`;
     - chip's `useAccentTone.ts` and `accent-tone-solve.ts`, which F-7 reads as `ok` in the global zone (§6.2).
     
     Under §1.4 these become authored rows whose reason is named ("sole class emitter"), with `cascade.mjs verify` GREEN, or they wait for the channel collapse.
2. **Direction.** An edge from a lower rank to a higher one fails (`upward`). A read into another unit's non-door file fails (`placement: reach`).
3. **Below the unit.** A file whose in-unit readers all sit in one existing, non-slot sub-dir moves into that sub-dir. `below` mints no dir. `below-direction` keeps a kind slot from reading upward within its unit.

### 3.3 Module naming law

**None.** D′ keeps today's names, and a table row that invented a dir would be an authored name inside a structure table, which the table's own shape rule bans (C24).

The interface D′ offers a naming route: D′ judges whatever dirs exist. A naming route hands D′ a move list that mints dirs, and D′'s `below` and `below-direction` rules then keep those dirs whole. On D′'s tree, 0 intra-unit edges run from a kind slot to an SFC once `__tests__/` is excluded (D′ §5).

REG §6.5 has not earned the composition with G, so this spec does not import G's law.

### 3.4 Bound enforcement

- **The rule.** `bound`, over the five zones, at 12 direct files and 500 lines. The strict slot reading is gated and the exempt one reported beside it.
- **Measured under the exempt reading.** HEAD 68 (11 dirs, 57 files); D′'s tree 66 (9 dirs, 57 files).
- **Under the strict reading, also over:**
  - `dock/composables` 19;
  - `aurora/composables` 17;
  - `dock/__tests__` 21;
  - `aurora/__tests__` 19.
- **The 66 by zone on D′'s tree:**

  | zone | violations |
  |---|---:|
  | `src/components` | 19 |
  | `src/composables` | 2 |
  | `src/styles` | 2 |
  | `src/index.ts` | 1 |
  | demo | 10 |
  | scripts | 8 |
  | tests | 17 |
  | tests-visual | 7 |

- **R-5 asks a route to report a split that has no nameable module.** D′ reports every dir split it owes, since it has no naming rule (§3.9). The ones it names: `src/styles/glass/` 24, `src/styles/tokens/` 20, `aurora/constants/shaders/` 16, `tests-visual/` 170.
- **Files over 500 lines.** D′ splits these only by extracting into files whose names come from what is extracted: an extracted SFC or composable carries its own name. The split plan is B §7.3, a list of files and cuts, which D′ may use as a plan without taking B's module names.

### 3.5 Gate contract

`gate-dp.mjs` lands at `scripts/structure/`, rebased onto F-1's `buildGraph`. D′'s scratch graph read 3,773 edges against F-1's 7,171 because it counted differently, and one builder is REG gap 18. It runs under `npm test`.

| rule | what fails |
|---|---|
| `unresolved` | an F-1 violation (every S-4 kind: globs, `new URL`, `@source`, templates, opaque targets) |
| `self-name` | a module-kind `src` edge spelled `@mkbabb/glass-ui[/sub]`. The 4 font `url()`s in `fonts.css` are consumer asset references: checked for existence, not failed |
| `unzoned` | a `src` file that no row covers and that is not an anchor |
| `table` | a row that is not exactly `[prefix, stratum, grain]`, or that names nothing |
| `upward` | an edge from a lower rank to a higher one, any edge kind, type-only included |
| `cycle` | a cycle inside one stratum, over every ranked edge kind, CSS and type included |
| `door-impure` | a JS door or aggregator holding a declaration |
| **`door-impure-css`** (new) | a CSS file that has at least one `@import` and also holds a rule. `fonts.css` imports nothing, so it is a leaf and not a door. Not measured |
| `door-reads-door` | an aggregator imported from inside the library |
| `placement` | `owned` (F-7 with FD-1: 0 move/global rows); `dead` (an unpublished unit that nothing reads); `reach`; `dead barrel` |
| `below`, `below-direction` | §3.2 item 3 |
| `dual-door` | R-6 |
| `bound` | R-5, strict |
| `test-home` | R-3 (§3.7) |
| **`bin`** (new) | a `scripts` bin imported by anything but the harness (C20) |

**Fail-closed edges.** Every F-1 edge kind is ranked. There is no exemption list: an anchor is computed, and a CSS export entry is a door, not an exemption. This is how `glass.css → chip/accent-tone.css` became a door edge (D′ §2 gap 4).

**What the gate must catch:**
- REG §6.4's D′ list:
  - C01 to C19;
  - the M02 regression (P01);
  - `src/composables/` kept;
  - M-D2, caught through FD-5.
- The new rules: C20 (a bin importing a bin) and a rule planted in `glass.css`.
- The legal probes still pass: C09, C13, C23, C25.
- Regression: D′'s 44 and the floor's 59.

**Vacuity.**
- D′'s P block and `tests-place` call `runGate` and `testHomes` (D′ gap 8). Their outputs are frozen as literal manifest rows (§1.4), as `r4-tests-map.json` already is.
- The critic's battery must bite `placement: owned` and `test-home` before their zeros count.

### 3.6 Migration steps, in order

| step | what | measured basis |
|---|---|---|
| D-S0 | Preconditions as in B-S0, with `gate-dp.mjs` rebased onto F-1 | — |
| D-S1 | `rows/apply.mjs`: f3, f4, m02, m03, f9. Row f3 deletes `subpath-policy.mjs`, so the owed `search: "INTERNAL"` hunk does not arise (§3.10 gap 6) | FR §2 |
| D-S2 | Floor #3: `useScrollScene.ts` moves to `demo/stories/motion/`. Its loader is `demo/stories/motion/scroll.vue:23`, and `orphan-css-partial.test.ts:431` names it by path literal. Cross-zone rule (§1.4) | F-7 class `unread` in `src` |
| D-S3 | `springProjection.ts`: disposition per the R-8 ruling (§1.3). If it goes to `scripts/`, it lands inside a module, because `scripts/` holds 12 top-level files at HEAD | D′ §4 put `scripts/` at 13 |
| D-S4 | Direction moves: `ModalOverlay.vue` to `_shared/overlay/` (M03); `aurora/constants/budget.ts` to `composables/glass/webgl/` (aurora and blob read it); `_shared/selection.ts` and `_shared/interaction.ts` to `composables/motion/morph/`; `tabs/styles/drag.css` to `src/styles/glass/` (an authored CSS row, §1.4). Plus the scrim split row | D′ §4 |
| D-S5 | Owner returns: the F-7 fixpoint with FD-1. `useDockHold.ts` stays in dock | 22 rows at HEAD (§6.2); D′ counted 26 under its own graph |
| D-S6 | CSS returns as authored rows: the 5 `styles/glass/*.css` sheets and chip's `accent-tone.css`, with `cascade.mjs verify` GREEN and π owed | D′ §4; the arm held all four cascades identical |
| D-S7 | `below`: the fourier-field shaders go to `fourier-field/renderer/` | class A, 2 files |
| D-S8 | Rows: delete `src/components/index.ts` and `glass/canvas2d/index.ts`, and remove both from `record.doors`; the `color/index.ts` → `color/color.ts` split; `composables/search/index.ts` removed from `record.doors` when search moves into dock; the R-6 door trims (59 names); the `.bundle-ratchet` rebind to 2,910,608, an owner-worded hunk | D′ §4, §9 |
| D-S9 | FD-6 applied: 8 suites, `easing.contract` and 38 directory-walking unit tests move onto the harness reader | D′ §10 |
| D-S10 | The R-3 test move (§3.7) under FD-7's programs, with the FD-8 ruling | 171 tests into 74 slots; rerun 0 |
| D-S11 | Demo: the R-10 reroute (79 deep paths re-point to entries; 11 unpublished reads decided) | D′ §11 |
| D-S12 | `scripts` (§3.8), `scripts/structure/` landed (FD-11), then `gate-dp.mjs` wired: RED at the base, GREEN at the head | — |

### 3.7 Tests and stories under R-3

- **The home rule** (D′ §8), shared by the `test-home` rule and the placement tool:
  1. A test's subjects are the files that declare the names it imports (doors are not subjects), plus its literal, url, css and glob targets.
  2. The subject unit is the highest-ranked unit among them. A tie between component units goes to the one that reaches the others.
  3. The home is the deepest dir in that unit holding every subject, lifted out of kind slots, in `<dir>/__tests__/`. A visual spec becomes `*.visual.ts` there.
  4. A test stays in the harness if it reads a door whole, walks a dir or has more than one subject unit.
- **Measured.**
  - 171 tests move into 74 slots, and a rerun proposes 0 moves.
  - vitest still collects 239 files, and `playwright --list` still lists 1,989 tests in 167 files with titles identical up to path.
  - The harness keeps 82 unit tests and 163 visual specs.
  - Only 5 visual specs resolve to one unit through route → story → unit.
- **Stories:** §1.4. `tests-visual/` stays a flat harness of 170 files, which is a bound violation D′ cannot name its way out of (§3.9).

### 3.8 `scripts/`, the backend analogue

- **Table rows for the scripts zone:**

  | prefix | rank |
  |---|---|
  | `scripts/lib/` | 0 |
  | `scripts/<module>/` | 1 |
  | bins (`json-command` targets, root-config imports, FD-10 YAML tokens) | anchors, rank 9 |

- **What fails.** `upward` and `bin` fail, which covers C20. `bound` applies at 12 and 500.
- **Placement.** Cross-zone moves follow §1.4. F-7 runs with `zones: ["scripts"]`. D′ cannot create the `scripts/<bin>/` module that a script over 500 lines would need, for the same reason it cannot name any module. The 7 scripts over 500 lines (§2.8) are reported.
- **Other languages.** The same table shape per repo. At a layered backend, today's module dirs are the rows. Not measured by D′ (C20 was its one miss).

### 3.9 Where D′ cannot satisfy a ruling

- **(a) R-2's recursive unit, and the edict's "recursively for nested components".** Seven sub-components in six units have private parts but no dir of their own (11 files on D′'s tree). Each needs a new dir, and so a name:

  | unit | sub-component | private parts |
  |---|---|---|
  | card | `CardHeader` | `scroll.css` |
  | carousel | `CarouselContent` | `projection.ts` |
  | dock | `DockBackgroundToggle` | `DockControl.vue` |
  | dock | `DockLayerGroup` | `DockCrossfade.vue` |
  | easing | `EasingPicker` | `usePicker.ts`, `useClipboard.ts` |
  | select | `SelectContent` | `SelectScrollButton.vue` |
  | toast | `Toaster` | `ToastClose`, `ToastDescription`, `ToastTitle`, `use-toast.ts` |

  D′ has no rule that makes a name (§3.3).
- **(b) R-5's splits.** 66 violations need modules D′ cannot name (§3.4), and the strict slot reading adds 4 slots.
- **(c) R-3's "no exclusion list".** It holds only if FD-7 replaces D′'s T4 and T5 hunks.
- **(d) R-6's count and R-10's count** are owed by every route (§1.3). D′'s R-10 reroute has not been measured against the boot ceiling. §1.3 says the doors-only cost binds every route.

### 3.10 D′ seat gaps, verbatim, with dispositions

1. "Colocation below the unit: 7 sub-components in 6 units (11 files) need new, named dirs; D-prime has no naming rule and must compose with a placement route (G's eponymy is the candidate)"
   → Carried. §3.3 (the interface), §3.9(a).
2. "Bounds: 66 violations need modules D-prime cannot name (styles/glass 24, styles/tokens 20, aurora/constants/shaders 16, tests-visual 170); the kind-slot exemption hides dock/composables at 19 and aurora/composables at 17"
   → Carried. §3.4, §3.9(b), and the slot-reading ruling (§1.3 R-5).
3. "F-1 lacks a root edge kind: resolve(import.meta.dirname|__dirname, '<rel>') is invisible to the move engine and the arm (1 file, 2 vitest failures)"
   → Re-scoped. F-1 reads the form (FD-9, measured). The prototype records whether F-2 rewrites or rolls back.
4. "@source arrivals: test slots enter the demo Tailwind scan (+4.60 kB demo CSS); needs a two-way glob residue check and a ruling for __tests__ under @source"
   → Re-scoped. F-2's image check refuses the arrival, since F-1 expands `@source` per file (FD-8, measured). The ruling remains.
5. "tsconfig exclusion hunks T4/T5 conflict with R-3's 'no exclusion list'; needs a ruling or a program design"
   → Carried. FD-7 is the program design; the 23 visual-spec errors surface under any design.
6. "The carve owes 3 hunks: delete search INTERNAL in subpath-policy.mjs, rebind .bundle-ratchet to 2,910,608, place springProjection.ts inside a scripts/ module (scripts/ at 13 files)"
   → Re-scoped. Row f3 deletes `subpath-policy.mjs`, so the first hunk becomes a `record.doors` removal (D-S8). The ratchet rebind is carried (D-S8). `springProjection.ts` is carried (R-8 ruling, D-S3).
7. "subpath-policy COMPONENT_CLASS/COMPOSABLE_CLASS is a second per-dir declaration next to the rank table (registry gap 17)"
   → Closed by row `f3-entry-record`, which deletes `subpath-policy.mjs` and `regen-exports.mjs` (§3.1).
8. "F-9: the carve's P block and tests-place call runGate/testHomes, so the aggregator-reader, dead-barrel and test-home zeros come from the gate's own functions; freeze them as literal manifest rows"
   → Carried. §1.4 freezing, §3.5.
9. "The gate is wired to nothing (still in scratch; needs a tracked home, npm test or CI wiring, and one graph builder)"
   → Carried. §3.5 (rebased on F-1), D-S12.
10. "CSS door purity is not gated (a rule added to glass.css passes)"
    → Carried with a clause: `door-impure-css` (§3.5), not measured.
11. "No backend arm (C20 missed)"
    → Carried with a clause: `bin` (§3.5, §3.8), not measured.
12. "R-3 scanner rewrites: 8 suites plus easing.contract (uncollected) must read the graph instead of walking src/; 38 directory-walking unit tests are in this class"
    → Carried. FD-6, D-S9.
13. "R-1 register collapse and R-6 MIGRATION rows (59 names; value.js BLOB_CONFIG_KEY) are follow-through"
    → Carried. R-1 precondition (D-S0); R-6 rows (D-S8).
14. "R-10: 90 demo door bypasses at HEAD vs the ruling's count of 7; the definitions need reconciling"
    → Carried (§1.3 R-10).
15. "Name residues: slider/useDockHold.ts still says Dock; curl-fbm.* names are derived from the export on a collision"
    → Re-scoped. Under R-2 as amended, `useDockHold.ts` is anchored in dock (§6.2), so the first residue does not arise. The `curl-fbm.*` name is carried.
16. "Runtime: Playwright only listed, not executed; demo CSS delta unverified in paint"
    → Carried (F-10). FD-8 prevents the demo CSS delta from recurring.

---

## 4 · Spec G · eponymous closures below the declared layer

G standalone concedes peer sets, layered backends and doorless compound families (G §2, §12). This spec builds G below the one declared layer the floor already holds: F-3's entries and declared doors. It does not borrow B's doors or D′'s table, which REG §6.5 has not earned.

### 4.1 Unit set

- **Roots are:**
  - every SFC;
  - every F-3 entry source;
  - every declared door (`record.doors`);
  - every file that is the immediate dominator of 2 or more files in its unit's reader subgraph.
- **Wiring files are not roots.** A wiring file has 3 or more registration edges, meaning its imported bindings are only passed as call arguments or placed in literals (G §8). There are 0 in glass-ui `src` and `demo`. Registration edges are weak in dominance, like door edges.
- **Units.** A root with a private closure is a unit (R-2's recursion), and G mints its dir.
- **The declared doors carry what dominance cannot.** The 5 compound families have no subpath entry, but their `index.ts` files are declared doors (§6.2). As roots, they keep `accordion/`, `alert/`, `avatar/`, `skeleton/` and `table/`, which G's raw run flattened into `src/` (G §2 CE2). This is not measured under dominance.

### 4.2 Placement law

G places in two stages.

1. **Between units:** `placeAll(g, dirUnits(), { zones, anchor })` with FD-1 and FD-3, to a fixpoint. This is the same function as B and D′.
   - It removes G's R-2 hazard. Of the 14 component parts G's raw run pulled into a consumer, 13 are anchored at HEAD (§6.2). The fourteenth is `isTeleportedTarget.ts`, which every route moves into dock as its one reader.
   - Files already in a global zone read `ok`, so the 19 shared-zone authored dirs that G's raw run dissolved stay in place.
2. **Within each unit U:** a dominator tree (Cooper-Harvey-Kennedy, harvested from G's `build.mjs`), computed over U's reader subgraph and rooted at U's door or entry. The reader subgraph is `makeOrigins(g).readsOf`, by symbol through barrels, with door and registration edges weak.
   - A file's owner is its nearest root ancestor, and the file lives in its owner's dir.
   - A file whose nearest root is U's door lives at U's root, or in `U/composables/` when two or more sub-roots read it (R-4, `proposedPath`).
   - The global zone runs stage 2 inside each module that a declared door heads. Authored module names there are kept, not checked (§4.9(c)).

**CSS** follows §1.4. G places a sheet only when its SFC loads it, and 44 of 54 do not at HEAD (G §9). Class emission is not a gate edge.

**Wiring files** matter only for backends (§4.8).

### 4.3 Module naming law

- **`rootName(root)`:**
  - the kebab-case stem, with `.vue`, `.ts`, `.mjs` and `.css` stripped;
  - a shader stage suffix kept as a segment, so `aurora.frag.ts` becomes `aurora-frag`. This removes the two `aurora/runtime/*/aurora` repeats;
  - a leading `use` dropped;
  - `index` read as its dir's name;
  - a leading token equal to the enclosing unit's name dropped, so `useDockSearch` in dock becomes `search` and `DockCrossfade` becomes `crossfade`. That keeps B's and HEAD's `search/`, and it is the "stated normalisation" REG §5 left open.
  
  Comparison is case- and hyphen-insensitive, so `HandMark.vue` matches `handmark/`.
- **Placement of the root.** A root sits inside its dir.
  - 29 already do.
  - The 10 that sit beside or below the dir holding their closure, with the name equal, move in (G §2 CE3).
  - A CSS aggregator becomes its dir's `index.css`: `glass.css` becomes `glass/index.css`, and `tokens.css` becomes `tokens/index.css`. An entry source that moves keeps its key (F-3).
- **Collapse.** A child root whose name equals its parent dir's name collapses into the parent. G measured 8. It also answers the three remaining repeats: `typewriter/typewriter-text/typewriter`, `command/command-dialog/command` and `demo/main/demo`.
- **Chain compression.** A dir whose only content is one child root's dir collapses. Proposed and not measured: `demo/main/app/app-shell` and 5 levels in `src`.
- **Collisions.** Two roots with one name are `NEEDS-NAME`, and the name is authored. On a floor-level collision, a file takes its sole export's name, which is D′'s derivation: `flow.glsl.ts` becomes `curl-fbm.glsl.ts`.
- **Authored dir names that no file carries.** At HEAD three roots head a dir whose authored name they do not carry: `useDockSearch.ts` heads `search/`, `SheetContent.vue` heads `detents/`, and `AuroraConfigDock.vue` heads `aurora/config/`.
  - The root's name wins unless the step declares a rename row.
  - After the unit-token drop, `search` holds.
  - `detents/` and `config/` need either a rename row or the name `sheet-content/` or `aurora-config-dock/` respectively.
- **Churn stabiliser (hysteresis).** A root heads a new dir when its private closure reaches 2 files. An existing root dir dissolves only when its closure reaches 0. The gate accepts the band between the two. This makes a rerun deterministic from the tree. G measured 14.5% churn in its raw arm and 9.5% at unit grain (G §5), and whether hysteresis moves that is not measured.

### 4.4 Bound enforcement

- **The rule.** R-5, strict slot reading, over the five zones.
- **Dirs.** A dir over 12 splits along its dominator children, and each child is named by its root. A dir whose members are peers with no dominator child cannot be split by G: that is the counterexample R-5 asks a route to report.
- **Already measured (G §2 CE2, raw arm):**

  | dir | files | why G cannot split it |
  |---|---:|---|
  | `menu` | 14 | 13 SFC peers; 0 of L12-06's 3 menu features recovered |
  | `src/styles` | 50 | the aggregator dominates every component sheet (CE6) |
  | `styles/glass` | 29 | 28 registers under `glass.css`, all leaves |
  | `styles/tokens` | 21 | peers under `tokens.css` |
  | `aurora` | 13 | the door, `Aurora.vue`, 10 non-runtime leaves and `useScrollProgress.ts` |
  | shared set, `src` | 69 | no dominator by definition |
  | shared set, `demo` | 24 | demo's shared chassis |
  | `demo/stories/containers`, `demo/stories/foundations` | 13 each | route SFCs declared by the manifest glob |
  | `tests-visual` | 171 | declared entries with no import subject |
  | `tests/components` | 43 | declared entries |
  | `tests/styles` | 28 | declared entries |
  | other `tests` dirs | — | declared entries |

  `data-table` (14) and the flattened `src` (14) came from the R-2 hazard and the doorless families. Stage 1 and §4.1 are expected to clear both, but that is not measured.
- **Kind slots.** G dissolves the three kind slots over 12 at HEAD: `dock/composables`, `dock/styles` and `aurora/composables` (G §6).
- **Files over 500 lines** split by extraction. An extracted SFC or composable is a root and names itself.

### 4.5 Gate contract

`eponym.mjs` lands at `scripts/structure/`, over F-1, F-7 and symbols, under `npm test`.

| clause | rule |
|---|---|
| E0 | F-1 violations = 0: every S-4 kind, fail-closed |
| E1 | between units: F-7 with FD-1 has 0 `move`/`global` rows |
| E2 | ownership: every file in a unit lives in the dir of its nearest root in U's dominator tree. The tree is built from value, type, CSS, glob, dynamic and `new URL` loads (`readsOf`), with door and registration edges weak |
| E3 | eponymy: every non-slot dir under a unit holds one root whose `rootName` equals the dir's name, or an `index.*` door. A root whose private closure has 2 or more files heads a dir. A root dir with an empty closure fails. The band between is legal (§4.3 hysteresis) |
| E4 | R-5, strict. Peer sets are listed by name |
| E5 | R-6: one symbol, one door |
| E6 | R-10: demo reads doors only |
| E7 | R-3: tests are homed at their subject root (§4.7) |

**Direction and cycles.** G has no direction or cycle clause, so `moduleSccs`, with the unit as `moduleOf`, is reported, not judged. The M03 cure comes from stage 1 (§1.4).

**Fail-closed edges.** E0 covers them. E2 reads only loads. A path string, a `@source` scan or a write is not a reader, as in F-7.

**What the gate must catch.** The critic writes the intent battery before reading `eponym.mjs`:
- a private helper of `DockCrossfade.vue` left at dock's root (E2);
- a dir with no eponymous root (E3);
- `Skeleton.vue` moved into `data-table` (E1);
- a root renamed so that it no longer names its dir (E3);
- a peer dir at 13 (E4);
- a doorless compound family flattened into `src/` (E1, E3);
- a file with 3 registration edges that would otherwise swallow its targets (E2).

Regression: the floor's 59.

**Vacuity.** E2's zero comes from a migration that runs the same dominator function. So the move lists are frozen (§1.4), and E2 counts only once the critic's plants bite it.

### 4.6 Migration steps, in order

| step | what | measured basis |
|---|---|---|
| G-S0 | Preconditions as in B-S0, plus `lib/dominance.mjs` harvested onto F-1 from G's scratch `build.mjs` | — |
| G-S1 | `rows/apply.mjs`: f3, f4, m02, m03, f9 | FR §2 |
| G-S2 | Stage 1: the F-7 fixpoint with FD-1. `ModalOverlay.vue` moves out of dialog (§1.4); the `flow.*` files become `curl-fbm.*` | 22 rows at HEAD (§6.2) |
| G-S3 | Root normalisation: the 10 roots that sit beside or below their dir move in; the CSS aggregators become `<dir>/index.css`; rename rows for `detents/` and `aurora/config/`, or the dirs take the roots' names | G §2 CE3 |
| G-S4 | Stage 2 in every unit: `eponym.mjs --moves`, with `NEEDS-NAME` answered by authored rows, then F-2, repeated until 0 moves are proposed | G's raw run: 105 `src` G-dirs at rootMin 2; 40 roots need a new dir; 31 new paths |
| G-S5 | Collapse and chain compression (§4.3) | not measured |
| G-S6 | R-6 rows; the `./aurora-config` ruling (§1.3); R-5 file splits by extraction | — |
| G-S7 | FD-6 applied; the R-3 test move (§4.7) under FD-7's programs, with the FD-8 ruling | — |
| G-S8 | Demo: the R-10 reroute; stage 2 per route SFC. The chassis dirs have no door and no root, so they are reported (§4.9) | G §3: 17 of 38 authored demo dirs dissolve in the raw run |
| G-S9 | `scripts` (§4.8), `scripts/structure/` landed, then `eponym.mjs` wired: RED at the base, GREEN at the head | — |

### 4.7 Tests and stories under R-3

- **Home.** A test's subject is the nearest root that dominates everything the test and its private test-zone closure import from `src` (import, type, dynamic, mock). Its home is `<that root's dir>/__tests__/`, which is R-3's slot at G's grain.
- **Raw-arm counts (G §10):**

  | subject | tests | home |
  |---|---:|---|
  | a door | 84 | the unit's `__tests__/` |
  | a nested root | 38 | the nested root's `__tests__/` |
  | several units | 40 | harness |
  | inside one authored dir that has no root | 29 | R-3 keeps them with their component dir; G has no root there |
  | no import subject | 61 | harness |

  With declared doors as roots (§4.1), some of the 29 gain a root. This is not measured.
- **Scanners.** 17 single-subject tests also read `src` by path literal, and they move onto FD-6.
- **Visual specs.** 9 have one route and one subject root, and they become `*.visual.ts`. 158 stay in the harness.
- **Stories:** §1.4. G's subject law does not place them: 18 have one subject, 62 have several and 10 have none.

### 4.8 `scripts/`, the backend analogue

- **Roots and closures.** The roots are the bins (`json-command` targets, root-config imports, FD-10 YAML tokens) and `scripts/lib/`'s door if one is declared.
  - A bin's private closure nests in `scripts/<rootName(bin)>/`, with the bin inside it. F-2 rewrites the `package.json` token.
  - A file that 2 or more bins reach, with no common named dominator, goes to `scripts/lib/`, the global slot.
- **Measured.** At HEAD all 13 scripts that G reached are entries, and G gives the zone no structure (G §14 gap 9). The law above has not been run.
- **Other languages.**
  - Registrars are weak. At k = 3 the registrar rule flags `app.ts` and 2 route indexes in value.js, and `index.ts` and 2 route indexes in speedtest.
  - DI containers are not caught. value.js `inject-services.ts` still dominates 7 repositories across 4 modules, because services reach repositories through the injected context and leave no import edge (G §2 CE4).
  - On a layered backend, 0 of value.js's 5 module dirs hold an eponymous root, and module identity is the dir (G §2 CE3).

### 4.9 Where G cannot satisfy a ruling

- **(a) R-5.** The peer sets in §4.4 need modules that G cannot name. This is the counterexample R-5 asks for, and it is reported before formation.
- **(b) R-2 as amended, and R-9.** G satisfies them only through stage 1's anchor and the declared-door roots. Both are measured on F-7 (§6.2) and neither is measured under dominance.
- **(c) R-4.** G says nothing about how the global zone is grouped inside. It keeps the authored module dirs that a declared door heads, but it neither makes nor checks their names.
- **(d) R-3.** The 29 tests whose one dir has no root (§4.7).
- **(e) The edict's backend clause.** At a layered backend, module identity is the dir. G needs a declared unit there, and a DI container needs a declared fact (§4.8).
- **(f) R-6's count, R-10's count and R-10's boot cost** are owed by every route (§1.3).

### 4.10 G seat gaps (G §14), verbatim, with dispositions

1. "The graph is a scratch builder, not F-1. `@source` is recorded but not resolved. Path-literal detection is a regex over string literals. CSS emission is a text-token heuristic: 11 aggregator-held sheets have no unique-class emitter."
   → Re-scoped. This spec runs G on F-1, which resolves `@source` per file (475 `css-source` edges) and reads path literals by AST. Emission stays out of the gate (§1.4).
2. "The churn entry map is A's approximation, not each commit's own `libraryEntryMap`."
   → Carried.
3. "Four variants are proposed but not run:"
   → Partly answered and partly carried:
   - **eponymy pin:** answered on the F-7 side by FD-1, with 13 of the 14 hazard files anchored (§6.2);
   - **chain compression:** specified (§4.3), not run;
   - **affix and hyphen-insensitive naming:** specified (§4.3), not run;
   - **a churn stabiliser:** specified as hysteresis (§4.3), not run.
4. "DI containers (value.js `inject-services.ts`, speedtest `wire-services.ts`) are not placed by any structural rule found. They need a declared fact."
   → Carried (§4.9(e)).
5. "The shared zone's internal grouping (the 19 src dirs under `composables/` and `_shared/`) is outside G. Something else must declare it, or it keeps its authored names unverified."
   → Carried. Stage 1 keeps them (§4.2); they stay unverified (§4.9(c)).
6. "Compound families with no subpath door (accordion, alert, avatar, skeleton, table) need a declared unit. Menu needs one for its sub-features."
   → Re-scoped. Their `index.ts` files are declared doors in `record.doors` (§6.2), and §4.1 makes them roots; this is not measured under dominance. Menu is carried (§4.4).
7. "Q7's 29 one-dir-no-root tests: R-3's unit and G's roots disagree there. Unmeasured beyond the count."
   → Carried (§4.9(d)).
8. "R-9 conflicts with R-2 plus F-7 (`Skeleton.vue` → data-table). This is a driver-ruling question."
   → Closed by the R-2 amendment and FD-1: `Skeleton.vue` is anchored (§6.2).
9. "glass-ui's own `scripts/` zone: all 13 files are entries, so G gives it no structure."
   → Carried. The law is specified (§4.8) but not run.
10. "Not done: prototype, migration, toolchain (build, vue-tsc, tests), π, Playwright, and an independent critic battery (F-9). REGISTRY §6.4 bars the prototype until CE1-4 are answered. CE2 and part of CE3 are conceded, so the prototype would have to run as the below-unit rule under a declared layer."
    → Carried. This spec is that below-unit rule, under the F-3 declared layer.

---

## 5 · Floor seat gaps, verbatim, with dispositions

1. "scripts/import-dag.mjs still builds its own graph (628 lines, over the 500 bound). Rebasing it onto lib/graph.mjs is not built; its path-derived module labels cause most of the declared scan deltas"
   → FD-11: delete it, and report its SCCs through `moduleSccs` with the route's unit function as `moduleOf`.
2. "453 computed reads are census, not verdicts. Single-segment names in literal lists over a scanned dir are not resolved against the scanner's base, and paths assembled from pieces none of which names a location are unseen"
   → Carried. FD-6 removes the test-side reads that R-3 moves. The census remains.
3. "A scanner's sensitivity is declared, not derived. Scan-delta declarations are human-reviewed, and `all: true` is coarse"
   → Carried.
4. "24 of the 59 plants are this seat's own, so not an independent battery (F-9). Each route's critic writes its own"
   → Carried (§2.5, §3.5, §4.5).
5. "Not built: F-5 (entry-rooted declarations), F-6 beyond the scan-delta bridge, F-10 (pi/Playwright per band). No browser seat ran, so no reorder was paint-checked and the cascade proofs are structural"
   → FD-7 and FD-6 carry F-5 and F-6. F-10 is carried.
6. "The records and the readers the rows install live under docs/.../floor/ and move to scripts/ at landing (a route decision). The floor is untracked, so routes copy it into their worktrees until it is committed"
   → Re-scoped. The floor is tracked since `ed188a86`. Landing is FD-11, the same in every spec.
7. "R-2 as written moves 6 published component roots into other components. This needs a ruling (for example, a unit-root/eponymous law, which F-7 can take as a parameter)"
   → Closed by the R-2 amendment. FD-1 is the parameter (§6.2).
8. "5 NEEDS-NAME collisions (4 types.ts files onto src/composables/types.ts; flow.glsl.ts target exists) need authored names (S-7)"
   → Re-scoped. Under FD-1 one remains, `flow.glsl.ts` (§6.2). B names it `curlNoise`, D′ and G `curl-fbm`.
9. "springProjection.ts disposition (R-8: unread in src, demo edge past a door per R-10) needs a ruling"
   → Carried. The readers are listed in §1.3 R-8.
10. "The dialog<->sheet value SCC (import-dag M03) survives the floor rows. B's 4th inversion (ModalOverlay behind overlay/modal/) is not a floor row"
    → Re-scoped. F-7 reads `ModalOverlay.vue` as `global` at HEAD, so every spec's placement stage cures M03 (§1.4).
11. "R-5 bounds are measured, not enforced; HEAD is over them (18 dirs, 57 files)"
    → Each spec enforces them (B6, `bound`, E4). Slot reading: §1.3.
12. "2 dead vitest.config.ts includes are cure candidates; 3 tsconfig.build.json excludes wait on R-3"
    → FD-7.
13. "The floor's tool files were copied into the checkout with rsync plus a sha256 manifest (30 files identical) rather than written with the Write tool. The report itself was written with Write/Edit"
    → A provenance record; no action. The 30 files are tracked at `ed188a86`.

---

## 6 · What this seat measured

### 6.1 State

- HEAD `20911dce`. `git diff 7362b3bf HEAD -- . ':!docs'` is 0 lines.
- `git ls-files docs/tranches/BL/design/structure/floor` lists 30 files, added at `ed188a86`.
- `row f9-wire` is not applied at HEAD: `tests/gates/floor.test.ts` is absent, since rows run only in worktrees.

### 6.2 On the floor, read-only, at HEAD

| # | measurement |
|---:|---|
| m1 | `buildGraph`: 7,171 edges, 0 violations (FR §2.1's numbers) |
| m2 | `placeAll(g, dirUnits(), {zones: ["src"]})`: 545 rows, of which 309 ok, 181 published, 39 move, 14 global, 2 unread |
| m3 | **The FD-1 anchor.** 53 move/global rows: 31 anchored, 22 left (19 move, 3 global). Anchored SFCs (17): `dialog/Dialog`, `dialog/DialogContent`, `expandable-container/ExpandableContainer`, `fading-scroll/FadingScroll`, `input/Input`, `menu/DropdownMenuTrigger`, `skeleton/Skeleton`, `surface/Surface`, `switch/Switch`, `table/{Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow}`, `tabs/SegmentedTabs`. Anchored non-SFCs (14): `deck/composables/{useDeck, useDeckSnap}`, `deck/{slideContext, types, window}`, `dock/composables/{dockContext, useDockHold}`, `fourier-field/renderer/mint`, `input/types`, `sheet/motion`, `slider/types`, `tabs/types`, `typewriter/utils/{keyboard, timing}` |
| m4 | **The 22 left.** Global: `aurora/constants/budget.ts` (aurora, blob), `dialog/ModalOverlay.vue` (dialog, sheet), `tabs/composables/useTabRovingFocus.ts` (row m03 moves it). Move: `_shared/overlay/isTeleportedTarget.ts` → dock; `fourier-field/shaders/{compute,render}.wgsl.ts` → `fourier-field/renderer`; `dom/useClipboard.ts` → easing; `dom/useDocumentVisibility.ts` → `motion/core`; `dom/useDragVelocity.ts` → slider; `glass/canvas2d/useCanvas2D.ts` → constellation; `glass/useGlassBackdropLuminance.ts` → dock; `glass/webgl/createCanvasLifecycle.ts` → `composables/glass`; `glass/webgl/shaders/flow.{glsl,wgsl}.ts` → `aurora/constants/shaders`; `motion/core/useRAFLoop.ts` → `composables/glass`; `motion/core/useViewTransition.ts` → `motion/route`; `motion/morph/useElementMorph.ts` → `composables/motion`; `motion/pointer/useRoutePointer.ts` → constellation; `motion/scroll/useScrollChrome.ts` → dock; `motion/scroll/useScrollProgress.ts` → aurora; `reactive/useTimer.ts` → `dom`; `search/useFuzzySearch.ts` → dock. `NEEDS-NAME` under the anchor: 1 (`flow.glsl.ts`, whose target exists) |
| m5 | **D′'s returns under F-7.** `useDockHold.ts` → slider appears only as a `move` in the unanchored arm, so it is anchored in dock. `useAccentTone.ts` (readers chip and `composables/color`) and `accent-tone-solve.ts` are `ok`. `chip/accent-tone.css` is `ok` with readers `[src]`. `styles/glass/{dissolve, glass-atom, glass-chip, squircle, surface-axis}.css` are `ok` with readers `[src]`. `tabs/styles/drag.css` is `published`. `_shared/selection.ts` and `_shared/interaction.ts` are `ok` |
| m6 | **The slot predicate.** `dirUnits` maps `src/styles/x.css` to the unit `src`, because `styles` is a slot by basename. `bounds.mjs` marks a slot only when `/^(src\|demo)\/./` matches its parent |
| m7 | **Scoped keyframes.** `dist/glass-ui.css` in the checkout has 6 `@keyframes <name>-<8hex>` names, each appearing twice. `dist/component-styles.css` has 0. F-4's `leafSequence` renames only `data-v-<8hex>` and `--<8hex>-` |
| m8 | **`@source`.** 475 `css-source` edges from 6 sites. `demo/demo.css:106` `../src/components/_shared/**/*.ts` expands to 20 per-file edges |
| m9 | **`import.meta.dirname`.** `tests/styles/material-css-syntax.test.ts`: line 7 is `path-literal`, via `anchored`, resolving to `.`; line 8 is `path-literal`, resolving to `src/styles/glass/material.css` |
| m10 | **R-8 readers.** `safari-probe.mjs`, `pi-runner-manifest.mjs` and `regen-exports.mjs` have no edge of any kind. `Code.vue`'s one edge is `demo/demo.css:83 [css-source]`. `springProjection.ts` has 4 readers (§1.3). `useScrollScene.ts` has `demo/stories/motion/scroll.vue:23 [import]` and `tests/gates/orphan-css-partial.test.ts:431 [path-literal]`. `import-dag.mjs` has the two ledger rows and itself. `canon-doc.mjs` is absent |
| m11 | **CI YAML.** 0 `.yml` files are parsed; there are 2 under `.github/`. `scripts/release.sh` is named 3 times in the workflows and at `package.json:489 [json-command]` |
| m12 | **Declared doors and entries.** `skeleton`, `table`, `accordion`, `avatar` and `alert` have no subpath entry. Their `index.ts` files are among the 14 declared doors of `record.doors`. `menu`, `dialog` and `sheet` are entries |
| m13 | **`scripts/`.** 17 files, 12 at the top level. The floor's `lib/scan.mjs` is 600 lines |

### 6.3 Commands

Each snippet ran from the checkout root with `node --input-type=module -e`, importing only from `docs/tranches/BL/design/structure/floor/lib/`. Nothing was written.

```js
// m1, m8, m9, m10, m11, m12, m13
const { buildGraph } = await import("./docs/tranches/BL/design/structure/floor/lib/graph.mjs");
const g = buildGraph(process.cwd());
g.edges.filter((e) => e.kind === "css-source");                        // m8
g.edges.filter((e) => e.from === "tests/styles/material-css-syntax.test.ts"); // m9
g.edges.filter((e) => e.to === "<file>");                              // m10
g.tree.parsed.filter((f) => /\.ya?ml$/.test(f));                       // m11
g.record.js.map(([n]) => n); g.record.doors;                           // m12

// m2-m5: the FD-1 anchor over the floor's own F-7
const { placeAll, dirUnits, proposedPath, GLOBAL_ZONES } = await import(".../floor/lib/placement.mjs");
const { makeOrigins } = await import(".../floor/lib/symbols.mjs");
const O = makeOrigins(g), anchor = new Map();
for (const d of g.tree.files.filter((f) => /(^|\/)index\.ts$/.test(f) && f.startsWith("src/")
       && !["src", "src/components", "src/composables"].includes(dirname(f))).sort((a, b) => a.length - b.length)) {
  const u = dirname(d); if (GLOBAL_ZONES.some((z) => u === z || u.startsWith(z + "/"))) continue;
  for (const [, os] of O.exportsOf(d)) for (const o of os) if (o.file.startsWith(u + "/") && o.file !== d) anchor.set(o.file, u);
}
const rows = placeAll(g, dirUnits(), { zones: ["src"] }).rows.filter((r) => r.class === "move" || r.class === "global");
rows.filter((r) => !anchor.has(r.file));   // 22
```

```sh
# m7
grep -oE '@keyframes [a-z-]+-[0-9a-f]{8}\b' dist/glass-ui.css | sort -u
```
