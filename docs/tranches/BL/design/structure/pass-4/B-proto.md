# D1-B pass 4: prototype (sealed modules, flat)

Model: claude-opus-5-5, asserted from the seat's own identity. Third full pass of route D1-B, on
the pass-4 floor (`floor/`, P4-F1..P4-F7) with G's harvest (REGISTRY §P3-2.2). The migration was
derived and replayed in a linked worktree at HEAD (`d4d0a042`; its code equals `0d634325` and
`60ed5af7`, the commits between are docs only). Every law, gate, tool, move list, authored input,
frozen row and result cited here is under `pass-4/B-kit/`:

- `B-kit/LAW.md` is the law (pass-4 amendments marked "(pass 4)");
- `B-kit/lib/law.mjs` and `B-kit/gate/seal.mjs` (+ `gate/seal.test.ts`) are its code;
- `B-kit/frozen/SEQUENCE.json` is the chain; `B-kit/derive/chain.sh` is how it was derived;
- `B-kit/results/pass4/` holds the output of every command below.

## Summary

| | |
|---|---|
| chain | 51 steps: HEAD, the floor rows (S1), 49 B steps. Base code digest `35f7b831…`; after S1 `a974a609…`; final `6618df1f7d2f5a0c657e4b1d14f61203e83e5b8164463abdb479f0432ca8685c` over 1,437 files |
| replay | from the checkout kit on a fresh HEAD worktree: `--twice` MATCH (850.5 s), then a rerun says "the chain is applied" (1.2 s) |
| toolchain | vite build, vue-tsc (src and test), entries check, surface check (0 differences), gates.mjs, demo:dist:build: all exit 0; `node --check` on all 44 `.mjs` files: clean |
| gate | 15 of 18 GREEN. RED: B0 444, B2 67, B6 62 |
| cascade | unlisted: RED at `./styles` rule 610, the card/scroll rung move (and no other place). Listed (`authored/listed-reorders.json`): GREEN, 18 moved, 1,818 swapped pairs, 0 risks. `./styles/fonts`, `./styles/theme` and `./styles.css` identical |
| package | 2,930,810 B unpacked (894 files) against the floor base's 2,913,546 (838): +17,264 B. Arm (a), datum 2,919,057 (HEAD): RED "increase forbidden". Arm (b), datum 2,930,810: CLEAN |
| browser | 12 specs (the chip and card bands, the zz-chip-band plant, the π floor): base and migrated both 60 ran, 27 passed, 33 failed, 11 skipped; 0 new failures; the plant passes on both |
| vitest | 2,315 passed, 5 failed: the three RED clauses of `seal.test.ts`, and two tests that time out at 5 s under load ~50 and pass at 60 s |
| checklist | of the 9 open entering pass 4, 7 CLOSED (S-03, S-10, S-12, S-14, B-07, B-08, B-11) and 2 OPEN (B-01, B-10). See §3 |

## 1 · Replay (for a non-author)

```sh
C=/Users/mkbabb/Programming/glass-ui
W=<scratch>/wt            # any path outside the checkout
sh $C/docs/tranches/BL/design/structure/pass-4/tools/fresh.sh $W   # linked worktree at HEAD + the two node_modules symlinks
node $C/docs/tranches/BL/design/structure/pass-4/B-kit/replay.mjs --root $W --twice
node $C/docs/tranches/BL/design/structure/pass-4/B-kit/replay.mjs --root $W   # idempotence: "the chain is applied"
git -C $C worktree remove --force $W
```

Output (`results/pass4/replay-final.txt`, `replay-rerun.txt`):

```
replay: from the base (digest 35f7b831fe810aac…)
  S1 [floor-rows] floor rows · again: floor rows → a974a609c0791460…
  …
  S37 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 6618df1f7d2f5a0c…
replay done in 850.5 s; code digest 6618df1f7d2f5a0c657e4b1d14f61203e83e5b8164463abdb479f0432ca8685c over 1437 files; chain final MATCH
replay: the chain is applied (digest 6618df1f7d2f5a0c…)
```

The gate on the replayed tree (`replay-seal.txt`) reads the same as on the derived tree: `FAIL B0 444 FAIL B2 67 FAIL B6 62`.

To re-derive the chain rather than replay it: `bash B-kit/derive/chain.sh <fresh worktree> all` (22 min; log `results/pass4/chain-derive.log`). The derive tools write `frozen/`, so run it from a copy of the kit.

## 2 · The shared bar (§P3-8.4)

**Replay on HEAD's code.** §1. The chain is anchored at HEAD's code digest (`35f7b831…`), not at 10.0.1.

**FD-2 over the floor's unit.** Every moves step runs through the floor engine (`runMoves`), whose `sccGrowth` is a stop: 10 FD-2 records in the derive log, every one `"addedPairs": 0`; the SCC census goes from 4 SCCs / 18 members before S2 to 2 / 4 after S36 (`chain-derive.log`). The one move that would have grown it, `_shared/overlay/isTeleportedTarget.ts` → dock, measured +3 pairs with the overlay door's unread re-export and 0 without; S1d removes the re-export before S2 places the file (LAW §4).

**FD-5 per step.** The engine classifies its own image after each moves step (P4-F6): 6 classified records, 175 edges `move-only`, 0 failed.

**Cascade value-identical where a reorder touches, with a spec that reads the property.**

```
node scripts/structure/cascade.mjs verify --baseline <floor-base snapshot> --dist dist
  → RED: an unlisted reorder (./styles, first divergence 610: .card-scroll-host)
node scripts/structure/cascade.mjs verify --baseline … --dist dist --reorders B-kit/authored/listed-reorders.json --browser results/pass4/browser-mig.json
  → GREEN: listed reorder; no swapped pair shares a property on co-occurring classes
    judged {"moved":18,"swappedPairs":1818,"risks":0,"covered":0}
```

The one reorder is S4b (card/scroll.css joins card's rung). P4-F7 finds no swapped pair that shares a property on co-occurring classes, so no property needs a covering spec. The card band's specs ran anyway (card-padding has 1 base-green test; card-composite has 0, so it carries no signal). The accent-tone divergence of pass 3 is gone (B-08).

**verify:package.** P4-R3 is unanswered, so both arms:

```
npm run verify:package   (.bundle-ratchet 2919057, HEAD)   → exit 1: increase forbidden: 2930810 > 2919057
npm run verify:package   (.bundle-ratchet 2930810)         → exit 0: "terminal":"CLEAN"
```

The route row is +17,264 B over the floor base (`tools/pack-diff.mjs`, `results/pass4/pack-diff.json`):

| class | Δ bytes | files +/−/changed |
|---|---:|---|
| MIGRATION.md | +7,545 | changed |
| JS | −5,854 | 35 / 58 / 26 |
| door declarations | +2,175 | 44 / 3 / 20 |
| other declarations | +12,819 | 99 / 93 / 54 |
| CSS doors | +397 | 37 / 2 / 1 |
| other CSS | −44 | 62 / 65 / 3 |
| other | +226 | changed |

The floor base itself (2,913,546) is 5,511 B under HEAD's datum, so arm (a) reads RED against any B tree over the base by more than that, and the floor base alone reads the ratchet's "shrink" arm.

## 3 · Checklist (§P3-9)

### S-03 · rulings: CLOSED on its four arms (two of them await the owner)

- **P3-R3, slots strict: a counterexample, reported.** `src/components/dock/__tests__/` holds 16 direct files (B6). All 16 test subjects at the dock root, where `names.json` keeps `GlassDock.vue` (10 `GlassDock.*` tests, 3 a11y tests of root controls, `dockCrossfadeContext.readonly.test-d.ts`, `dockMorphMeasure.test.ts`, `native-title.test.ts`). R-3 homes a test with its subject and B16 finds each one homed (B16 0), so they cannot leave without their subjects. R-5 says to report this before formation; the driver rules.
- **P3-R5 landed.** `./aurora-config` (S33): `src/components/aurora/aurora-config.ts`, 41 names (14 config values, 20 config types, 4 ground values, 3 ground types) off `./aurora`; 26 import splits over 22 files, computed from the TS AST (`derive/split-entry.mjs`); the entry record, `package.json` exports (S33b, `entries.mjs write` then `check`: PASS) and the surface pin (S33c: only the new key and the named moves admitted). `surface.mjs check`: 69 keys, 64 JS entries, 583 runtime / 1,241 type names, 0 differences.
- **P3-R6 placed after P4-F2.** `isTeleportedTarget.ts` → `src/components/dock/composables/isTeleportedTarget.ts` by its one reader; the `demo.css` glob delta is declared (`authored/targets.json` `globDeltas`) and carried; no hold remains (B10 meta: 9 bound, 0 held).
- **P3-R9 via P4-R3.** Both arms measured (§2). The ruling is owed.

### S-10 · P4-F6, P4-F7: CLOSED

FD-5 runs per step (6 records, 175 move-only, 0 failed). FD-4's pair-by-pair judge passes the one listed reorder (§2).

### S-12 · F-10 selection by the graph, chip-paint specs run: CLOSED

```
node scripts/structure/browser.mjs --root . --specs <band-specs> --base-report browser-base.json --out browser-mig.json
  base:     ran 60, passed 27, failed 33, skipped 11
  migrated: ran 60, passed 27, failed 33, skipped 11; verdict GREEN; newFailures []
  zz-chip-band.spec.ts: expected on both arms
```

Per spec, base = migrated: affordance-map 0/0/11 skipped, card-composite 0 passed/5 failed, card-padding 1/6, css-critical 2/0, demo-design 4/6, glass-cal 3/1, no-shadcn-default 4/4, page-chassis 5/2, selection-card 0/3, storybook-meta 4/6, substrate-paints-color (π floor) 3/0, zz-chip-band 1/0. The 33 failures are the base's own. Bands with 0 base-green tests (card-composite, selection-card, affordance-map) carry no browser signal.

The graph selection over every frozen move list selects 152 specs across 62 bands, 30 of them with no reading spec (`results/pass4/selection-final.json`). The seat ran the chip and card bands, where the chain changes CSS order or placement. It did not run the other 140.

### S-14 · no masking fallback: CLOSED

B17 (LAW §10) reads two forms from the syntax: a guard that returns an empty value on a missing file, and a failed `import()` load that is swallowed. Plants on the replayed tree (`results/pass4/plants/`):

```
b17-silent-return    B17 0 → 1  scripts/minify/minify-css.ts:201 returns when a file is missing (a masking fallback…)
b17-swallowed-load   B17 0 → 1  src/composables/color/useAccentTone.ts:164 swallows a failed module load (.catch without a throw)
```

On the tree, S34 cures the 16 sites B17 names, each at its cause (`authored/no-masking.mjs`):
- 15 missing-file guards leave, including `vite.utility-emit.ts`'s theme guard, so a wrong theme path now fails the build;
- the accent-tone solve leaf's load rejects, and its test asserts that the failure surfaces. The plant `.catch(() => null)` turns that test RED.

Two sites needed more than dropping the guard:
- `inlineFonts` in `vite.style-fold.ts` now reads declarations through postcss. The guard had hidden a regex match on a comment URL in `src/styles/fonts.css`.
- `profile-bundle.mjs` reports a missing styles index as a MISSING budget row. The caller now reads presence from the walked dist listing, so that row stands.

B17 0.

### B-01 · B0, B2, B6, same-dir cycles: OPEN

- **B4, same-directory file cycles: done.** B4 counts them (no `b4info` exemption). S35 cures the three on the tree: the suspend-reason union moves to `visibility.ts`; the accent-tone shell declares the one export it reads from the leaf; `lib/plan.mjs` holds the move plan's vocabulary for `move.mjs` and `classify.mjs`. B4 0; the plant (`visibility.ts` importing `createCanvasLifecycle.ts`) reads B4 0 → 1.
- **B0 444: open.** 84 walks and 360 computed reads. By zone: tests 360, scripts 56, tests-visual 26, demo 1, src 1. By kind: path-helper 159, fs-read 157, path-literal 70, computed-read 51, scan 5, other 2. B-S12 (converting the harness to FD-6's F-1 file set) was not run.
- **B2 67: open.** By zone: demo 18 (13 distinct private targets), tests 32, tests-visual 16, scripts 1. By kind: import 39, dynamic 18, import-type 7, import-type-node 3. P4-R1 arm (a), demo only: 18. Arm (b), every consumer zone: 67. P4-R2, which decides publish or re-point for these names, is unanswered.
- **B6 62: open.** 6 directories over 12 files:
  - `tests-visual/`: 177 (B-S16);
  - `tests/styles/`: 23;
  - `tests/demo/`: 17;
  - `dock/__tests__/`: 16 (the counterexample, S-03);
  - `demo/stories/containers/` and `demo/stories/foundations/`: 13 each. The manifest's `./*/*.vue` glob keeps them flat (δ6).

  56 files are over 500 lines: src 22, tests 15, demo 8, tests-visual 8, scripts 3. The list is in `results/pass4/b6-files.txt`. The dock root dropped to 12 files once `isTeleportedTarget.ts` was placed in `dock/composables/`.

### B-07 · names in all five zones, G's deltas reviewed: CLOSED

B15 now runs its placeholder and repeats-parent checks in all five zones, and the kind-slot arm in sealed zones (LAW §11). Plants: `tests/helpers/` gives B15 0 → 1 and `tests-visual/utils/` gives B15 0 → 1. S36 moves the one placeholder home, `tests/utils/`: `mountComposable.ts` goes to `tests/harness/`, `cssSyntax.ts` to `tests/gates/`, `cn.test.ts` to `tests/components/_shared/`.

G's names were reviewed one by one (`authored/names.json` `g_review`):

| name | decision | why |
|---|---|---|
| fourier-field `register/` | G's taken | `constants/` named the kind twice |
| sortable-list `drop/` | G's taken | `resolve/resolve.ts` repeated its file |
| toast `toaster/` | B's collapse kept | Toaster dominates the whole unit |
| sheet `detents/` | B's kept | SheetContent reads detents but is not one of them |
| aurora `config.ts` | B's `aurora-config.ts` kept | a `config/` module already exists |

B15 0.

### B-08 · `accent-tone.css`: CLOSED

The file moves to `src/styles/glass/accent-tone.css`, placed per P3-R2 at its HEAD rung. The card/scroll rung is the only CSS rung move, and it is listed in `authored/listed-reorders.json`. Cascade: the chip band is value-identical, and the one divergence is the listed S4b reorder, which P4-F7 judges with 0 risks. The chip-paint plant `zz-chip-band.spec.ts` passes on the base and on the migrated tree.

### B-10 · B-S10..B-S16: OPEN

| step | state |
|---|---|
| B-S10 | done: `./aurora-config` (S33) |
| B-S11 | not done: 56 files over 500 lines, none split, and no per-file counterexample written |
| B-S12 | not done: the B0 conversion |
| B-S14 | partial: B2 67; demo story dirs at 13 |
| B-S15 | done: every scripts dir has ≤ 12 files, and `safari-probe.mjs` is placed in `tests-visual/paint/` with the module it serves (R-8, LAW §4, S19) |
| B-S16 | not done: `tests-visual/` still has 177 direct files; P4-F5 (`testDir`) is in the floor |

### B-11 · one pin path: CLOSED

`seal()` takes no pin argument and reads `scripts/structure/records/seal-pin.json`, or throws. The CLI refuses any option it does not take:

```
node scripts/structure/seal/seal.mjs --pin x
  → exit 1: Error: seal: unknown option --pin (the pin has one path, scripts/structure/records/seal-pin.json)
```

The gate's test plants that call ("has one pin path", which passes in the vitest run). `derive/land-gate.mjs` writes the reviewed half of the pin to the one path for its measuring run.

## 4 · Other measures

- **Doors** (`tools/door-cost.mjs`): 135 modules and 156 doors (58 entry sources, 98 internal; 58 JS, 40 CSS), 70,387 B, 350 export statements. 35 doors (10,169 B) would be avoidable under G's eponym reading. 35 doors have a single statement.
- **P3-R1(a)** (`tools/p3r1a.mjs`): 10 kernel entries, 285 names, 0 re-exports from outside the global zone.
- **vitest.** 240 files: 2,315 passed, 10 expected fail, 1 skipped, 5 failed:
  - `seal.test.ts` B0, B2 and B6;
  - `atoms.test.ts` TOTAL fuzz and one `glass-subtlety.test.ts` test, both 5 s timeouts at load ~44-52.

  Rerun at `--testTimeout=60000`, those two files pass, together with `menu/contract.test.ts`, `profile-bundle-value-js.test.ts` and `use-accent-tone.test.ts`: 84/84 (`vitest-rerun-timeouts.txt`). In isolation, `menu/contract.test.ts` failed 1 of 3 runs. It depends on a fixed 30 ms sleep.

## 5 · What this pass changed in the kit

Steps added:
- S1d: the overlay door relay;
- S33, S33b and S33c: the aurora-config entry, the entries write and the reviewed re-pin;
- S34: no masking;
- S35: the B4 cycles;
- S36: the `tests/utils` names;
- S37: the gate re-land.

Steps removed:
- S1c and S21. The floor's R-1 register retire is now floor row r1, run in S1.

Holds: the S13, S25, S27 and S31 lands and `seal-review.json` carry none.

The gate has 18 clauses:
- B4 counts same-directory cycles;
- B15 runs in all zones;
- B17 is new;
- the CLI refuses unknown options.

Derive tools changed:
- `place.mjs` and `apply-moves.mjs` pass and freeze `declaredGlobDeltas` (P4-F2);
- `rungs.mjs` now does only the card/scroll rung;
- `colocate.mjs` no longer reads the retired register;
- `scripts-doors.mjs` (S20) is re-based on the P4 floor's `lib/index.mjs`;
- `lib/scan/playwright.mjs` moves to `lib/graph/` in S19.

New tools:
- `derive/split-entry.mjs`;
- `derive/entries-write.mjs`;
- `derive/repin-reviewed.mjs`;
- `tools/pack-diff.mjs`.

## 6 · Open gaps

1. **B-01 / B-10 route work not run:**
   - B-S11: split the 56 files over 500 lines, or write a counterexample per file;
   - B-S12: B0's 444 walks and computed reads onto F-1's file set;
   - B-S16: carve `tests-visual/`'s 177 files;
   - `tests/styles` 23 and `tests/demo` 17.
2. **Rulings owed:**
   - P4-R1: arm (a) gives B2 18, arm (b) gives 67;
   - P4-R2: publish or re-point the 67;
   - P4-R3: the ratchet datum row, with both arms measured;
   - P4-R4: the CSS dist name;
   - the P3-R3 counterexample (`dock/__tests__` 16).
3. **Floor gaps:**
   - The floor's own `lib/move.mjs` ↔ `lib/classify.mjs` cycle sits in `floor/`. S35 cures it only in the landed copy at `scripts/structure/lib/`.
   - S20 lands the kit's current `gate/seal.test.ts` text, so a later test change re-derives S20 and every step after it.
   - The edits engine does not syntax-check the files it writes. The first S34 derivation cut a function header in `profile-bundle.mjs`, and only vitest caught it. This pass adds a `node --check` sweep over every `.mjs` file to the toolchain record, not to the engine.
4. **Browser:**
   - 140 of the 152 graph-selected specs did not run;
   - three run specs have no base-green test, so their bands carry no signal;
   - 33 of 60 tests fail on the base tree.
5. **The kit's copy in the checkout** was written with `rsync -a --delete` from the seat's scratch mirror, which removed 5 superseded files: `authored/base-surface.json`, `authored/r1-register.mjs`, `derive/base-repin.mjs`, `frozen/S1c-base-surface.json` and `frozen/S21-r1-register.json`.
