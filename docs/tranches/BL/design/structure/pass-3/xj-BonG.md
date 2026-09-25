# D1 pass 3 · cross-judge B on G (B's seal on G's migrated tree)

Seat: CROSS-JUDGE of the merge test (REGISTRY §P2-6.4, S-13), direction **B → G**. Model **claude-opus-5-5**, asserted from the seat's own identity. This seat authored neither route.

Paths: `P` = `docs/tranches/BL/design/structure/pass-3`, `X` = `P/xj-BonG`. Every number below comes from a command this seat ran. The output is saved under `X/results/`.

**The verdict.** This direction is **RED**. B's gate does not pass on G's tree under any reading of its pin:

- **Literal reading.** The gate refuses to run: `seal: the pin <G>/scripts/structure/records/seal-pin.json is missing; the gate has no off switch`.
- **With B's own landed pin.** 1,646 lines, and 14 of 17 clauses are RED.
- **With the gate's own reading of G's tree as the pin** (B11 then judges only its structural arms). 999 lines, and 14 of 17 clauses are RED.
- **GREEN in every reading:** B12, B13 and B15.

The replay reproduces G's reported digest exactly, so the verdict is about the tree G reported.

## 1 · The replay reproduces G's digest

Command, as `G-proto.md` §0 documents it, from the checkout at HEAD `e93b4ef5`:

```sh
sh P/G-kit/tools/replay.sh <scratch>/D1/p3/xj-BonG/wt --twice      # exit 0, 5 min 37 s wall
node P/G-kit/tools/replay.mjs --root <scratch>/D1/p3/xj-BonG/wt     # the whole-chain rerun
```

Results (`X/results/replay.log`):

- **Base.** The code digest before step 0 is `f0019420…991a8c`, which equals `G-kit/SEQUENCE.json` `base`.
- **Each step.** All 28 steps reach their recorded digest. Each second application is a no-op (304 moves across 8 lists, plus 19 rows and 1 land step, FD-2 +0 at every step).
- **Final digest.** The final code digest is **`b26243ef15a498507db269e4621e6271b3f99f66b36c2d39ff5fc5e1d37eb7c6` over 1,360 files**. It equals G-proto's reported digest, and `SEQUENCE.json`'s last step.
- **Whole-chain no-op.** The rerun prints `the chain is applied; nothing to write` (0.6 s).

**Disclosure (S-01).** `G-kit/` is not committed. HEAD `e93b4ef5` carries only the `f0a6637e` bank, and `git status` shows `SEQUENCE.json`, `lists/`, `rows/`, `authored/`, `LAW.md` and most tools as untracked or modified. `replay.sh` reads the kit from the checkout's working tree and makes its worktree from HEAD. So the MATCH above holds for the kit as it sits on disk now. A replay from a commit waits on the driver's commit. The same holds for `B-kit/`.

## 2 · How B's gate was run

Tool: `X/b-seal-on-g.mjs`. It uses `P/B-kit/gate/seal.mjs` and `P/B-kit/lib/law.mjs` byte for byte, with one change: the gate's floor import `"../lib/index.mjs"` points at G's tree's own floor files.

- **Why that change is needed.** `lib/index.mjs` is a floor-library door that only B's chain creates (S20). G's tree keeps the library flat (`scripts/structure/lib/{graph,placement,symbols,move}.mjs`).
- **Where the copy runs.** The copy sits in the OS temp dir, so G's tree gains no file. `typescript` and `postcss` resolve from G's tree.
- **Same mapping as B's tool.** It is the mapping `B-kit/tools/merge-test.mjs` uses.

**Checks that the gate is B's gate** (`X/results/b-seal-on-g.json`, `pinCheck` and `sealCheck`):

- **The seal.** S31 is the last row that edits `scripts/structure/seal/seal.mjs`. The kit's `seal.mjs` contains every one of S31's target texts for that file, and none of its source texts.
- **B's landed pin.** It is rebuilt from the frozen rows alone: the S13 `create`, then the S25 and S31 hunks, each applied exactly once. The result is 135 modules, 116 doors, 1,286 names, 2 reviewed names and 2 holds. That equals S31's recorded `pin` summary (`match: true`).

**The pin readings.** B11's pin arm and B10's holds read a pin, so four readings were run:

| reading | pin | total | RED clauses |
|---|---|---:|---|
| literal | `readPin(G)` | none | **the gate throws**: G's tree has no `seal-pin.json`, and B's law gives the gate no off switch (LAW "The gate", B-11) |
| bpin | B's own landed pin (rebuilt above) | **1,646** | 14 of 17 |
| self | the gate's own reading of G's tree (`pinNow`), with B's reviewed names and holds (`authored/seal-review.json`) | **999** | 14 of 17 |
| self-noholds | as self, with holds `{}` (the reading `merge-test.mjs` used) | 1,000 | 14 of 17 |

**Per-clause counts.** Only B11 and B10 differ between readings:

| clause | self | bpin | self-noholds |
|---|---:|---:|---:|
| B0 | 438 | 438 | 438 |
| B1 | 143 | 143 | 143 |
| B2 | 138 | 138 | 138 |
| B3 | 17 | 17 | 17 |
| B4 | 2 | 2 | 2 |
| B5 | 3 | 3 | 3 |
| B6 | 64 | 64 | 64 |
| B7 | 63 | 63 | 63 |
| B8 | 12 | 12 | 12 |
| B9 | 2 | 2 | 2 |
| B10 | 6 | 6 | 7 |
| B11 | 48 | **695** | 48 |
| B12, B13, B15 | 0 | 0 | 0 |
| B14 | 1 | 1 | 1 |
| B16 | 62 | 62 | 62 |

**Reconciliation with B-proto §4 (S-13).** The self-noholds reading reproduces B's table on all 13 clauses the table lists. It totals 1,000, but B's table sums to 999, because **it leaves out B14 1** (§3, B14). B's reviewed holds lower B10 from 7 to 6: `isTeleportedTarget.ts` is held, as B's pin holds it on B's own tree.

**B11 under B's own pin.** The 695 lines break down as:

- 457 B door names absent;
- 122 G door names B never pinned;
- 67 B modules absent;
- 1 G module B never pinned;
- 48 structural lines.

A pin is a reviewed record of one tree, so its arm cannot pass on another tree by construction. The structural 48 are the mechanism reading, and §3 uses the self reading.

## 3 · Each RED clause: the mechanism difference

**The root difference.** Most of the lines below come from one difference: how each route declares a unit.

- **B declares a module by its door.** B-kit `LAW.md` §1: "A **module** is any directory in a sealed zone that holds code (tests aside) and is not a container, a slot or inside a slot. Every module has a door (B7)". In code, `seal.mjs` has `modules = sealedCodeDirs.filter((d) => doorFilesOf(d).length)`.
- **G declares units by eponymy and dominance.** Doors sit only at unit roots and entries. G-kit `LAW.md`:
  - L0.1: "A first-level dir of `src/components/`";
  - L2.5: a root "heads a dir" by its closure;
  - L2.8: authored base modules;
  - L7.2: authored carve modules;
  - L2.9: "The global zone runs no stage 2: its module dirs are authored and kept";
  - E3 accepts a nested dir that holds a root "whose L3 name is the dir's name" **or** a door.

So in G's tree 131 sealed code dirs exist and 69 of them carry a door (seal `meta`: `required` 131, `modules` 69). Every clause that reads B's module set (B1, B4, B7, B11, B16) reads G's nested dirs as non-modules.

Clause by clause. Buckets are from `X/classify.mjs` → `X/results/classes.json`; lines are in `X/results/b-seal-on-g.json`.

| clause | lines | the mechanism difference (B rule · G rule) |
|---|---:|---|
| **B7** | 63 | 22 nested dirs of component units, 18 `src/styles/*`, 13 `src/composables/*`, 5 `_shared/*` and 4 scripts dirs have no door, plus `src/styles/` holds script code behind a CSS-only door. **B** LAW §1 "Every module has a door (B7)". **G** declares these dirs without doors: nested ones by L2.5/L2.8/L7.2 (judged by E3/E3N), kernel ones by L2.9, and scripts ones by L6.1 (a bin's module dir) with L4.3 making a scripts `index.mjs` a door only where one exists. |
| **B1** | 143 | 118 unit/scripts → kernel-module files past their door (for example `aurora/runtime/runtime.ts:19 → composables/glass/budget.ts`, door `composables/glass/index.ts`), 24 kernel → kernel, 1 own door (`scripts/structure/eponym/eponym.mjs:15 → eponym/index.mjs`). **B** LAW §5: "A reference from outside module M into a file of M goes through the door of M … A member never imports its own door". That applies to every module, kernel modules included. **G** L4.1: "From outside a **component unit** U, a src module or read edge lands on `U/index.ts`…". In `eponym.mjs:149`, `U = L.componentUnitOf(e.to)` is null for the global zone, so G's seal never guards a kernel module's door. There are 0 lines inside a component unit, because G's nested dirs have no door, so B finds no module to cross (they surface as B7 instead). |
| **B16** | 62 | 26 tests left in `tests/` that B homes in one unit (for example `tests/components/dialog/*.test.ts` → `dialog/__tests__/`). **B** LAW §9: "less the kernel when it reads a unit … the kernel is its subject only when it reads nothing else". **G** L5.2: "The nearest common R-2 unit of the subjects", with the kernel files counted, so unit + kernel spans two units → harness. 18 are colocated in a nested dir whose B home is the enclosing unit (for example `aurora/config/__tests__/derive-color.test.ts`, home `src/components/aurora`). **B**'s `homeOf` climbs to the deepest *module or unit*, and a doorless dir is neither. **G** L5.2: "the dir of the nearest root that dominates every subject". 12 are colocated in kernel dirs that B reads as several units or a container (`_shared/__tests__/cn.test.ts`, …). **B** LAW §1: "`_shared` is a kernel container", and `homeOf` returns null at a container. **G** L0.2: `_shared` is part of the global zone, with R-2 dir units. 6 are colocated in a component unit where B finds several units: they walk the tree or read demo (`dialog-dismiss`, `dock-name-canon`, `aurora-stage-affordance`). **B** LAW §9: a subject that "spans a container, a zone or a directory walk belongs to the harness". **G** L5.2 treats only a `scan` edge as a scan, and a `path-literal` directory read is not one. |
| **B11** (self) | 48 | `scripts/structure/eponym/index.mjs` 38, `_shared/overlay/index.ts` 8, `composables/context/index.ts` 2: door names nothing outside the module reads. **B** LAW §5 Surface: "An internal door publishes only names that something outside its module reads". **G** has no such clause (A1 judges only aliases, L4.6). |
| **B3** | 17 | `src/styles/index.css:207…276` imports unit sheets directly (`card/styles.css`, `dock/styles/index.css`, …). **B** LAW §6: "Every CSS crossing … targets the entered module's `index.css`". **G** builds no CSS channel (LAW §E: "the R-7 channel collapse is not built"). L3.6 makes a CSS door only for a sheet "beside a dir of its own name", and `src/styles/index.css` is in `AGGREGATES` (`eponym.mjs:21`). |
| **B8** | 12 | 11 colocated tests read `demo/` and 1 reads `scripts/` (`springTokenMirror.test.ts → scripts/regen-spring-tokens.mjs`). **B** LAW §9, B8's test arm: "A colocated test … may read the test harness … and the repo root, never a consumer zone". **G**'s B8 skips tests outright (`eponym.mjs:157`, `if (!reach(e) \|\| L.isTest(e.from)) continue`), and L5.1 counts only `src` files as subjects, so a demo-reading test colocates. |
| **B10** | 6 | 3 scanners, `scripts/structure/lib/scan/{css,script,text}.mjs` → `lib`. **B** LAW §4: F-7 runs "in both sealed zones (B-05)". **G** L1.1 runs F-7 "over the `src` zone" only, and places scripts by L6.1 bin dominance. 2 aurora files, `runtime/frame/{textureUpload,uniformBridge}.ts` → `aurora/runtime`. **G** holds them by FD-2 counted over L0.3's unit function (G-proto §G-12). **B**'s `placementViolations` calls `F.sccGrowth` with the floor's default `dirUnits` (`B-kit/lib/law.mjs`), which sees no growth, so the file is not bound. 1, `composables/glass/lifecycle/createCanvasLifecycle.ts` → `composables/glass`. **G** L1.3 authored stage-1 target: "`createCanvasLifecycle.ts` → `composables/glass/lifecycle/`". **B** §3–4: F-7's home, unbound. |
| **B5** | 3 | `deck/styles/index.css` and `dock/styles/index.css` are doors in a kind slot, and `dock/styles/controls/` is a dir inside one. **B** LAW §1: "A slot has no door and no sub-directory (B5)". **G** L3.6 moves `dock/styles/controls.css` → `controls/index.css` inside the slot. L7.2: "A carve of a kind slot names modules of the slot's unit". L4.4 reads a slot `index.css` as wiring, not a door (X-10). |
| **B4** | 2 | A type cycle `aurora/runtime/frame/{uniformBridge,frameLoop}.ts ↔ runtime/webgl/glSetup.ts`, and `composables/motion`: the `core` module ↔ files of its doorless siblings (`morph/useSelectionIndicator.ts → core/writeVelocityWeight.ts`, …). **B** LAW §8: "Value and type edges between siblings are acyclic at every depth". A sibling node is a door-bearing module or else a file. **G** has no acyclicity clause. Its FD-2 stop counts the floor's `moduleSccs`, which skips type-only edges (`scripts/structure/lib/graph.mjs:397`, `e.typeOnly … continue`), and G gives motion's siblings no doors. B cured both itself: S4f for the type homes; S4d, S22 and doors for motion. |
| **B9** | 2 | `command/index.ts:31` re-exports `_shared/selection.ts`, and `input/index.ts:10` re-exports `_shared/control.ts`. **B** LAW §5: "A door re-exports only its module's subtree". B cured this with S17 (`authored/b9-homes.mjs`). **G** L4.7/E5 judges only a name published on two non-root entries, and has no scope rule. |
| **B14** | 1 | `src/styles/index.css:313` holds `@source "../*.js"`. **B** LAW §5 door purity: "An `@source` that only does work in the shipped copy is written there by the build (`shipSourceDirective`)" (S7). **G** L4.4: "the `src/styles/index.css` aggregate excepted". |
| **B2** | 138 | tests 99, demo 18, tests-visual 18, scripts 2, root 1 (`vite.dark-stamp.ts`). By kind: 96 imports, 24 type imports, 18 dynamic. **B** LAW §5 Consumers: "A consumer module reference … into `src` targets an entry source", in every consumer zone. B's S29 re-pointed 103 such imports across zones. **G** L4.5 and E6 judge and cure the **demo** zone only (`eponym.mjs:129`, `zoneOf(e.from) === "demo"`). The demo count, 18, equals G's own E6 18, the X-5 residue owed to the owner. |
| **B0** | 438 | 86 walks and 352 computed reads. By zone: tests 346, scripts 55, tests-visual 27, src 9, demo 1. This is mostly **shared residue**: both routes left FD-6's harness conversion unrun (B reports B0 450 on its own tree). The route difference is 8 lines in `src/**/__tests__/`: colocated tests that walk `src/` (`dock-name-canon.test.ts:94–133`, `token-graph.test.ts:14,17`, `token-bridges.test.ts:78`, `dialog-dismiss.test.ts:43`). B's B16 sends a walker to the harness; G's L5.2 does not read a `path-literal` directory read as a scan (see B16). |
| **B6** | 64 | 8 dirs and 56 files over the bound: `tests-visual` 177, `tests/styles` 23, `src/components/dock/__tests__` 17, `tests/gates` 14, and others. This is **shared**: G's own E4 is 64 with the same lines, and B reports B6 61 on its tree. Neither route splits a long file (R-5). The one route-made breach is G's `dock/__tests__` slot of 17. B's tree reports 16 in the same slot. |

**What would have to change for this direction to go GREEN.** Leave aside the shared residue (B0 without the 8 colocated walkers, B6, and B2's demo 18). Then B's gate needs G's tree to change in four ways:

- declare a door in every nested and kernel dir (B7, and through it B1, B4, B11, B16);
- route every consumer zone through entries, not only demo (B2);
- build the CSS door channel (B3, B5, B14);
- adopt B's test-home rule, which drops the kernel from a unit test's subject and treats a directory read as a walk (B16, B8).

Each is a change to G's unit declaration, not a missed cure inside G's own law. So the two routes do not merge as they stand, and the clauses above name the rule on each side.

## 4 · Findings

1. **The replay reproduces** `b26243ef…eb7c6` (1,360 files) from `G-kit/` alone: MATCH, `--twice` idempotent, rerun a no-op. There is no digest finding.
2. **The literal run of B's gate refuses G's tree** (no pin, no off switch). A merge test needs a stated pin reading. This seat ran three and reports all of them.
3. **B-proto §4 (S-13) leaves out B14 1** from its "B's seal on G's tree" table. The line is `src/styles/index.css:313 @source "../*.js"`, and the table sums to 999 where the gate gives 1,000 under the same reading.
4. **This direction is RED:** 14 of 17 clauses under both runnable readings (999 lines with a self pin, 1,646 with B's pin). Only B12, B13 and B15 are GREEN.
5. **Both kits are uncommitted** (S-01), so the MATCH holds for the working-tree kits, not a commit.

## 5 · Artifacts and fences

**Written, all under `P/`:**
- `xj-BonG.md` (this report);
- `xj-BonG/b-seal-on-g.mjs` and `xj-BonG/classify.mjs`;
- `xj-BonG/results/{b-seal-on-g.json, b-seal-on-g.log, classes.json, replay.log}`.

The two tools wrote their own result files. The report and `replay.log` were written with the Write tool.

**Git.** The only git writes were the worktree add (made by `replay.sh`) and `git worktree remove --force`, at `<scratch>/D1/p3/xj-BonG/wt`. `git worktree list` shows no `xj-BonG` entry.

**Not touched.** No tracked source was edited, no sibling repo was touched, and nothing under `~/.claude` was read.
