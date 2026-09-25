# D1 pass 3 · cross-judge: G's gate on B's tree, and the door cost

Seat: CROSS-JUDGE, model **claude-opus-5-5** (asserted from the seat's own identity). This seat wrote neither route. It ran REGISTRY §P2-6.4's merge test in one direction, G on B, and measured S-23's door cost on one tree.

Paths: `X` = `docs/tranches/BL/design/structure/pass-3/xj-GonB`. Every number below comes from a command this seat ran. Its output is saved under `X/results/`.

**Result in one line.** B's replay reproduces B-proto's code digest exactly. G's merge-set gate on B's tree is **RED**: E1 1, E2 42, E3N 10 and B12 1 (54 lines). E0, E1K, E3, E3P, B1, B8 and B14 are GREEN. Only E1 fails for a reason the two trees share. E2, E3N and B12 each name a real mechanism difference, and most of E2 is the unit declaration. On the door question: B7 puts 158 door files on B's tree, and G's reading would keep 81 of them. Of 89 critic plants judged, dropping the extra doors loses one catch, and that one catch does not come from the door-in-every-dir rule.

---

## 0 · Replay (first obligation)

The command, run from the checkout at HEAD `604af760` (both kits committed and clean):

```
git worktree add --detach <wt> HEAD; ln -s …/node_modules; ln -s …/tests-visual/node_modules
node docs/tranches/BL/design/structure/pass-3/B-kit/replay.mjs --root <wt>
```

- It ran from the base digest `5080bcad…`, and every step matched its recorded digest.
- It ended on **`62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc` over 1,434 files, `chain final MATCH`** in 111.7 s. That equals B-proto §1. A second run printed `the chain is applied` in 0.3 s (`X/results/replay-B.log`).
- **So the replay reproduces the prototype's code digest. There is no replay finding.**
- Harness check on the B side: the tree's own seal gives B0 450, B2 71, B6 61 and every other clause 0 (`X/results/seal-on-B.json`). That is B-proto §3.

## 1 · How G's gate was run on B's tree

`X/stage-g.mjs` copies `G-kit/eponym/*` byte for byte into scratch, outside the judged tree. That includes the law code and the authored `names.json`, which carries the names, bases, the module pin, the carve and the renames. It points each `../lib/<f>.mjs` floor import at the judged tree's own floor file. B's S19 moved the graph to `scripts/structure/lib/graph/`, so the graph import resolves there. Nothing is written into the judged tree.

- **Is the floor the same?** B's floor files were diffed against `floor/lib`:
  - `placement`, `symbols`, `tree` and `resolve` are identical;
  - `move`, `classify` and the graph and scanners differ only in import specifiers;
  - `entries.mjs` gains one additive function (`recordInputs`).

  So G's clauses read the same floor semantics on both trees.
- **Harness check.** The same staging on G's replayed tree (`G-kit/tools/replay.sh`) reached `b26243ef…eb7c6` with `chain final MATCH` (`X/results/replay-G.log`). There it gives E1 1, E4 64, E6 18 and every other clause 0 (`X/results/g-on-g-harness.json`). The gate landed in G's tree gives the same verdicts, and its files are byte-equal to the kit's. G-proto's reported state is reproduced, so the staging is transparent.
- **The merge set.** REGISTRY §P2-6.4 names "E0-E3 with its authored overrides". This seat reads that as E0, E1, E1K, E2, E3, E3N and E3P, plus B1, B8, B12 and B14 as G adopted them (§P2-4, G LAW L4). E4-E7, A1, S1 and S2 are reported apart, as information.

Command: `node X/g-on-b.mjs --tree <B wt> --stage <scratch> --out X/results/g-on-b.json` (1.8 s).

## 2 · G's merge set on B's tree

| clause | B tree | G tree (control) | verdict on B |
|---|---:|---:|---|
| E0 | 0 | 0 | GREEN |
| E1 | 1 | 1 | RED, but not a difference between the trees (§3.1) |
| E1K | 0 | 0 | GREEN |
| E2 | **42** | 0 | RED: the unit declaration, plus two authored decisions (§3.2) |
| E3 | 0 | 0 | GREEN |
| E3N | **10** | 0 | RED: the naming source (§3.3) |
| E3P | 0 | 0 | GREEN |
| B1 | 0 | 0 | GREEN |
| B8 | 0 | 0 | GREEN |
| B12 | **1** | 0 | RED: the scripts door language (§3.4) |
| B14 | 0 | 0 | GREEN |
| **total** | **54** | 1 | **RED** |

Outside the merge set, as information: E4 61, E5 0, E6 22, E7 44, A1 0, S1 2, S2 1. B-proto's own S-13 table reported these same lines on B's tree, so B-proto's numbers are reproduced.

**Plainly: this direction does not run GREEN.** Four merge clauses fail. Three of them fail only on B's tree and name a mechanism difference. The fourth, E1, fails on both trees.

## 3 · Each failing clause and the mechanism behind it

### 3.1 · E1 1: an accounting difference, not a tree difference

- **The line.** `FD-8 held src/components/_shared/overlay/isTeleportedTarget.ts → src/components/dock/isTeleportedTarget.ts (demo/demo.css @source src/components/_shared/**/*.ts)`.
- **Where the file sits.** It is at the same path on both trees, and E1 is 1 on G's own tree.
- **G's rule.** G LAW L1.4: "**A held move is a violation** (E1): P3-R6 places the file by its readers, and the floor cannot yet carry the move."
- **B's rule.** B LAW §4: "A named **hold** stays, with its floor reason (`authored/seal-review.json` → the pin's `holds`)… `_shared/overlay/isTeleportedTarget.ts`, under FD-8".
- **So both routes keep the file.** G counts the hold as a violation; B lists it as a reviewed exemption. This gap belongs to the floor (P3-R6 / FD-8 has no arm that declares a glob delta), not to either unit declaration. It does not bear on the merge.

### 3.2 · E2 42: mostly the unit declaration

`X/probe-e2.mjs` recomputes G's stage 2 on B's tree and explains every line (`X/results/probe-e2.json`). The 42 lines fall into four groups.

**(a) 22 NEEDS-NAME: every nested door B declares.**

- **The lines.** B's tree holds 22 declared JS doors below a component unit root, and all 22 appear here. Examples: `aurora/config/index.ts → aurora/index.ts`, `dock/search/index.ts → dock/index.ts`, `sheet/detents/index.ts → sheet/index.ts`.
- **G's rule.** G LAW L2.5: "⊤, U's pinned SFC, entry sources and **declared doors head U itself**". In code, `stage2.mjs` `heads(R)` returns false for `ctx.doors.has(R)`, and the door's target is `home(owner) = U`. G's law has no reading for a door below the unit root. Every such door is targeted at `U/index.ts`, where it collides with the unit's door.
- **B's rule.** B LAW §1: "A module is any directory in a sealed zone that holds code… **Every module has a door (B7)**".
- **The difference.** B declares a nested module by its door. G declares it by an eponymous root, a door only at the unit root, or an authored base or carve module (E3). **This is the unit declaration.**

**(b) 13 moves: files in B's door-declared base and carve modules.**

- **Which files.** `aurora/config/{color,presets,renderMode}.ts`, `aurora/runtime/frame/{auroraImageSource,frameLoop,textureUpload,uniformBridge}.ts`, `blob/mood/constants.ts`, `blob/renderer/surface/resolveBlobSurface.ts`, `fourier-field/constants/constants.ts`, `fourier-field/renderer/mint.ts`, `menu/context/context.ts` and `sortable-list/resolve/resolve.ts`.
- **What G proposes.** It lifts each file to its parent. Each one's owner is a root that does not head the dir (⊤, `Aurora.vue`, `Blob.vue`, `FourierField.vue`, `useSortable.ts`) or heads the parent (`runtime.ts`, `useMetaballRenderer.ts`).
- **Why G's base rule does not fire.** G LAW L2.8 moves a parent-level file into a base when "a nested module value-imports" it. It judges levels on raw value edges, and "a door… never move[s]". On B's tree every nested reader imports the module's door: `blob/renderer/uploadBlobUniforms.ts` imports from `"../mood"`, and `aurora/composables/atoms-fields.ts` from `"../config"`. So the value edge ends on `…/index.ts`. That file is a door, so `applyBases` pulls nothing and the base is never re-derived.
- **Why B keeps them.** B LAW §4 derives its bases once, before doors exist ("the base rule… moves to one sibling module per parent, named in `bases`"). After that, the door is the module's only declaration.
- **The difference.** It is the same unit declaration seen from the inside. B's door keeps a module that G's dominance would re-derive only from the raw edges the door hides.

**(c) 1 move plus 1 NEEDS-NAME base: authored decisions that disagree (sheet).**

- **G's name.** G `names.json` `names.sheet["SheetContent.vue"] = "detents"`, so SheetContent heads `detents/`.
- **B's name.** B `authored/names.json` has `src/components/sheet` `SheetContent.vue: {keep: true, why: "detents/ is the authored concept…; SheetContent.vue stays the sheet's content root"}`.
- **The consequence.** Moving SheetContent leaves `motion.ts` at the parent level, read by the nested module. G's `bases` has no `sheet` entry, so the result is `NEEDS-NAME base module src/components/sheet: a base module takes motion.ts`.
- **The difference.** The naming source: both routes author a name, and they author different ones.

**(d) 5 moves: toast (`Toaster.vue`, `ToastClose.vue`, `ToastDescription.vue`, `ToastTitle.vue` and `use-toast.ts` → `toast/toaster/`).**

- **G's name.** G `names.toast["Toaster.vue"] = "toaster"`.
- **B's name.** B `names.json` has `Toaster.vue: {collapse: true, why: "…a toaster/ dir would nest the whole unit one level down…"}`.
- **The difference.** The naming source again: an authored collapse against an authored name.

### 3.3 · E3N 10: the module pin (naming source)

- **The lines.**
  - B's carve modules that G does not pin: `dock/controls`, `fourier-field/constants`, `menu/context`, `sortable-list/resolve`.
  - G's pinned modules that B's tree lacks: `dock/styles/controls`, `fourier-field/register`, `sortable-list/drop`, `toast/toaster`.
  - Two G bases that name nothing on B's tree: `fourier-field.. = register`, `sortable-list.. = drop`.
- **G's rule.** E3N ("a nested dir of a component unit is not in the `modules` pin, a pinned module is gone…"). G's `basesWhy` renames two of B's bases on purpose: "B's `constants` would make constants/constants.ts" and "B's `resolve` would make resolve/resolve.ts".
- **B's rule.** B's module set is pinned by its own B11 pin, from B's `names.json` `bases`: `fourier-field "." → constants`, `menu "." → context`, `sortable-list "." → resolve`.
- **Why they diverge.** Both routes pin their modules. The pins differ because the routes author different names and place CSS differently. B's CSS door work turned `dock/styles/controls` into `dock/controls` (B5: no dir inside a kind slot); G's L3.6 keeps it under the slot.

### 3.4 · B12 1: the scripts door language

- **The line.** `scripts/minify/index.ts:3 re-exports scripts/minify/minify-css.ts (relay)`.
- **G's rule.** G LAW L4.3: "Only a G door re-exports: …or, in `scripts/`, a module's `index.mjs`". `gDoor` accepts only `index.mjs` in scripts.
- **B's rule.** B LAW §1: "in `scripts`, `index.mjs`, or `index.ts` when the module's own code is TypeScript ('befitting their languages': `scripts/minify/`)".
- **What G did instead.** G's tree cured the same mirror by renaming it to `minify-css.mts`, with no door (G-proto G-06).
- **The difference.** A rule difference about which extension a scripts door may have. It is not about the unit declaration.

### 3.5 · What the clauses say to keep

- **The unit declaration.** 35 of E2's 42 lines are unit declaration: the 22 NEEDS-NAME and the 13 moves. Under G's law, a door below the unit root cannot declare a module, and G's base rule cannot see through a door. So the two routes cannot both hold as written.
  - A merged route H has to pick one declaration.
  - Or G's L2.5 and L2.8 have to learn to read a nested declared door as heading its own dir, with value reads resolved through the door. That would be a change to G's law, not a merge as the two stand.
- **The naming source.** 7 E2 lines (sheet 2, toast 5) and all 10 E3N lines are naming source. They are the review diff between two authored name sets. One reconciled `names.json` would clear them.
- **Scripts.** B12 1 is one rule's wording about the extension of a scripts door.

## 4 · The door-cost question (S-23), on one tree: B's migrated tree

`node X/door-cost.mjs --tree <B wt> --stage <scratch> --out X/results/door-cost.json`.

**How doors were counted.**
- A door is any `index.{ts,mjs,css}` in `src` or `scripts` outside a kind slot.
- Doors are classed as: entry (the package needs it under either reading); unit-root door (G's B1 lands every crossing on it); nested; kernel (global zone, not an entry); scripts.
- A nested door is droppable under G when its dir holds a root whose L3 name, with G's authored names, is the dir's name, or when the dir is a G-authored base or carve module. That is E3's alternative to a door.
- G's law requires no door in the global zone (L2.9) or in scripts (L4.3 permits `index.mjs`, it does not require one).

| class | doors | bytes | statements | one-statement doors |
|---|---:|---:|---:|---:|
| entry (incl. the 3 aggregates) | 61 | 91,224 | 375 | 7 |
| unit root | 20 | 3,918 | 42 | 12 |
| nested | 25 | 8,062 | 67 | 12 |
|   of which eponymous root present | 19 | 3,734 | 29 | 11 |
|   of which a G-authored base or carve module | 6 | 4,328 | 38 | 1 |
|   of which neither | 0 | 0 | 0 | 0 |
| kernel | 47 | 35,906 | 200 | 10 |
| scripts | 5 | 2,197 | 14 | 2 |
| **B7 reading (all)** | **158** | **141,307** | **698** | **43** |
| **G reading (entry + unit root + nested with neither)** | **81** | **95,142** | **417** | **19** |
| dropped under G | 77 | 46,165 | 281 | 24 |

So on B's tree, G's reading drops 49% of the doors (77 of 158) and 33% of the door bytes (46,165 of 141,307). Most of the dropped bytes are kernel doors (35,906 B), and G's law has no clause that uses them. For reference, G's own tree carries 73 door files (106,915 B); by the same classes, G's reading needs 67 of them (`X/results/door-cost-G-tree.json`).

**Battery catches** (`node X/battery.mjs --tree <B wt> --stage <scratch> --out X/results/battery-B-tree.json`, 318 s).

- **Which plants.** The three pass-2 critics' batteries, with the plant definitions read from their own files:
  - `pass-2/kit/B-crit/battery.mjs`: I1–I34, L1, L2;
  - `G-crit/tools/plants.mjs`: P01–P30;
  - `Dp-crit/crit-plants.mjs`: I01–I30, L1–L3.
- **How they ran.** Each plant ran as an overlay on B's tree, with no file written.
- **The judges.**
  - `seal`: B's seal as the tree carries it (B7 is a door in every dir; B1 is recursive).
  - `sealG`: the same seal under G's unit declaration. B7 is dropped, B1 is kept only for an edge that enters a component unit from outside it (G's B1), and G's E3 is added.
  - `gate`: G's gate in full, and its merge set.
- **Counts.** 107 plants. 13 are n/a: 9 are G-crit engine-move plants, 2 G-crit plants edit `dock/glass-dock/GlassDock.vue`, and 2 Dp-crit plants edit `src/styles/{tokens,glass}.css`, a path B's tree no longer has. That leaves 94 judged: 89 plants and 5 legal probes.

| judge | plants caught (of 89) | legal probes flagged (of 5) |
|---|---:|---:|
| seal (B7 door in every dir) | 84 | 1 (Dp-crit L3) |
| sealG (eponymous root or door) | 83 | 0 |
| G gate, full | 78 | 0 |
| G gate, merge set only | 52 | 0 |

- **Catches the doors buy (caught by seal, missed by sealG): 1, B-crit I5.** A chip member imports its own `./index`. B1's own-door arm catches it. `chip/index.ts` is a unit-root door that both readings keep, so this catch comes from a clause G lacks (an own-door import rule), not from a door in every dir.
- **Where B7 fired.** 9 plants: B-crit I15, I15b, I15c, I16, I21, I33; G-crit P19, P24; Dp-crit I11.
  - In 7 of them another seal clause catches the plant too: B11, B15, and for I21, B6.
  - In P24 (`badge/badge-label/BadgeLabel.vue`), G's E3 catches it instead, because the file's L3 name is `label`, not `badge-label`.
  - In I11 (`badge/helpers/utils.ts`), E3 and B15 both catch it.
  - **I21 is the one plant whose declaration-clause catch G's reading loses.** `dock/ghost/useGhost.ts` is eponymous, so E3 accepts it. Under sealG it is still caught, but only incidentally: B6 fires because the plant's extra file pushes `dock/` over 12. G's full gate catches it by E2 and E3N.
- **What the recursive B1 buys on kernel modules.** Dp-crit I01, I28 and B-crit I1 lose their B1 line under sealG and are still caught by B10. Dp-crit L3 (a new global composable read by two units, deep past `composables/dom/index.ts`) is flagged by seal as B1 2. The Dp critic wrote it as a legal probe; B's law seals kernel modules on purpose. So by the Dp battery's reading, the kernel doors cost one false positive.
- **No eponymy-bought catches.** No plant was caught by sealG and missed by seal.

**Door-cost answer.**
- **On B's tree, B7 costs 77 doors and 46,165 bytes (33% of door bytes) beyond G's reading.** On these batteries it buys one catch, which comes from a different arm (own-door), plus one incidental catch.
- It also costs one legal-probe false positive (L3) through the kernel doors.
- The nested doors alone (25 doors, 8,062 B) buy no catch that G's E3 or another clause does not also make.

## 5 · Open gaps

1. **One direction only.** This seat ran G on B. B-on-G is its sibling seat's work, so the merge verdict needs both.
2. **Reading of "E0-E3".** It is taken as E0, E1, E1K, E2, E3, E3N and E3P plus B1, B8, B12 and B14. If E1K, E3N or E3P were meant to be excluded, the RED set changes by E3N 10 only.
3. **`sealG` is a composite judge built for this measurement**, not a law either route wrote. The G reading's door count uses G's authored names and bases. With B's bases, the 6 G-authored nested doors would need their own eponymy check.
4. **13 plants are n/a on this tree** (engine moves and moved paths). The G-crit move plants (P01–P04, P06, P09, P10, P25, P27) were not judged, and several of them bear on placement, not doors.
5. **E1 needs a floor arm** (FD-8 glob-delta declaration). It is RED on both trees.
6. **The results files were written by this seat's tools** under `X/results/` (node writes), not by the Write tool. The replay and battery logs were copied there from scratch.

## 6 · Fences

- **Writes in the checkout.** Only under `X/` (`stage-g.mjs`, `g-on-b.mjs`, `probe-e2.mjs`, `door-cost.mjs`, `battery.mjs`, `results/*`) and this report.
- **Git.** Worktree add and remove only, at the one named scratch path, used first for B's tree and then for G's.
- **Worktree.** It is removed (`git worktree list` shows none), and no tracked file changed.
- **Other repos.** No sibling repo was touched, and `~/.claude` was not read.
