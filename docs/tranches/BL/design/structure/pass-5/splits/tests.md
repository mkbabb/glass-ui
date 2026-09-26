# D1 pass 5 · B-S11 split rows, tests zone

Seat: SPLIT-AUTHOR, route D1-B, zone `tests`. Model claude-opus-5-5, asserted from the seat's own identity. Base HEAD `b2fb3042` (code 10.1.0, P5 floor committed). Every number below comes from a command this seat ran on 2026-09-26; each command and its filtered output is in `pass-5/B-kit/authored/splits/tests/results.txt`. This seat authors rows. It landed nothing in the chain and edited no tracked file in the checkout.

## 1 · Result

All 15 files of the tests zone over 500 lines (the 15 `tests/` lines of pass 4's `b6-files.txt`) split into named modules. There is no counterexample: every file has a split whose outputs are all at or under 500 lines.

| reading | before | after the split |
|---|---|---|
| `bounds.mjs` files over 500, tests zone (arm F) | 18 | **4** (the 4 are the src seat's; §5.6) |
| `bounds.mjs` files over 500, all zones (arm F) | 55 | 41 |
| seal B6 on the route's pass-4 tree (arm C) | 62 | **47** |
| tests in the 15 sources / in their outputs (arm F) | 571 passed | 571 passed |
| same, arm C | 569 passed | 569 passed |
| whole vitest suite, arm F | — | 2,313 tests, 0 failed, 1 skipped |
| F-1 graph, arm F | 7,436 edges, 0 violations | 7,491 edges, 0 violations |
| typecheck (`vue-tsc`, both programs), build, demo build | — | all exit 0 on both arms |
| `conserve.mjs` (every source line lands in an output) | — | 15/15 conserved on both arms |
| `verify:package`, tests row | 2,913,546 B | 2,913,546 B (0 B) |
| `verify:package`, shipped-citation row | 2,913,546 B | 2,913,552 B (**+6 B**, its own datum row, §5.5) |

The split introduces one new red on the route's tree: **B16 0 → 6**, six parts whose subject is now a single unit (§5.1). It is route sequencing, not a defect in the rows.

## 2 · What this seat wrote

Under `docs/tranches/BL/design/structure/pass-5/`:

- `B-kit/authored/splits/tests/splits.json`: the authored rows. One entry per file names its module directory, its parts, and each part's blocks by title prefix. It also holds the citations of the old paths that follow the split.
- `B-kit/authored/splits/tests/split.mjs`: the derive tool. It computes the row from the tree it runs on and writes it in B's row shape (`lib/row.mjs`: `create`, `remove`+`before`, exact-text `hunks`).
- `B-kit/authored/splits/tests/conserve.mjs`: the check. Every line and every import binding of a removed source lands in its outputs.
- `B-kit/authored/splits/tests/results.txt`: the commands and their filtered output.
- `splits/tests.md`: this report.

**Why a derive tool and not frozen hunks.** The route edits these files before B-S11 can land. At HEAD, 22 frozen hunk rows of pass 4's chain touch them (S6, S8, S11, S16, S20, S29, S32, S33, S34, S5a), and the move engine rewrites their specifiers. A hunk row authored at HEAD would conflict at its chain position. The spec names blocks by title. None of those 22 rows changes a `describe`/`it` title, so the spec survives them. The tool re-derives the row where it lands, as B's other derive steps do. The checkout copy of the tool and spec re-derives the arm C row byte-identically (sha256 `d13049bc…`).

## 3 · The splits

Line counts are for the route's pass-4 tree (arm C), where the sources carry the route's edits. HEAD counts differ by at most 13 lines (`results.txt`, arm F plan). Each module's helper holds the declarations that two or more parts read, and opens with the source's header comment (the gate's account). A declaration one part reads goes into that part.

| source (arm C lines) | module | outputs (lines) | tests |
|---|---|---|---:|
| `tests/styles/contrast-computed.test.ts` (1,260) | `tests/styles/contrast/` | `engine.ts` 303 · `pairs.test.ts` 283 (§1-§4) · `claims.test.ts` 386 (§5) · `grounds.test.ts` 346 (§6-§8) | 99 |
| `tests/styles/glass-subtlety.test.ts` (1,099) | `tests/styles/glass-subtlety/` | `sheets.ts` 50 · `ladders.test.ts` 285 · `material.test.ts` 341 · `grasp.test.ts` 440 | 36 |
| `tests/public-surface.spec.ts` (1,034) | `tests/public-surface/` | `exports.ts` 376 · `runtime.spec.ts` 237 · `falsifiers.spec.ts` 345 · `built.spec.ts` 97 | 96 |
| `tests/components/custom/dock/g-dock-lattice.test.ts` (930) | `tests/components/custom/dock/lattice/` | `bands.ts` 71 · `run.test.ts` 223 · `reach.test.ts` 257 · `material.test.ts` 392 | 34 |
| `tests/components/easing.contract.test.ts` (884) | `tests/components/easing/` | `picker.ts` 28 · `product.test.ts` 331 · `frame.test.ts` 321 · `ink.test.ts` 247 | 33 |
| `tests/demo/story-preview-card.test.ts` (824) | `tests/demo/story-card/` | `sources.ts` 65 · `tiles.test.ts` 275 · `names.test.ts` 284 · `still.test.ts` 208 | 68 |
| `tests/components/sortable-list/battery.test.ts` (799) | in place | `rig.ts` 230 · `lift.test.ts` 187 · `receive.test.ts` 176 · `guard.test.ts` 237 | 30 |
| `tests/gates/boot-graph.test.ts` (677) | `tests/gates/boot-graph/` | `scan.ts` 139 · `source.test.ts` 482 · `build.test.ts` 70 | 14 |
| `tests/styles/dissolve.test.ts` (677) | `tests/styles/dissolve/` | `rules.ts` 89 · `vaporize.test.ts` 436 · `exits.test.ts` 173 | 22 |
| `tests/composables/dark/darkModeSyncScript.test.ts` (572) | in place | `host.ts` 75 · `sync-script.test.ts` 74 · `no-flash.test.ts` 430 | 23 |
| `tests/styles/radius-role-canon.test.ts` (670) | `tests/styles/radius-role/` | `tokens.ts` 94 · `canon.test.ts` 216 (1-5) · `roles.test.ts` 372 (6-9) | 45 |
| `tests/styles/route-motion.test.ts` (547) | `tests/styles/route-motion/` | `grammar.ts` 99 · `alpha.test.ts` 178 · `registers.test.ts` 282 | 17 |
| `tests/gates/overfit-structure.test.ts` (545) | `tests/gates/overfit/` | `census.ts` 129 · `export-reach.test.ts` 182 · `seams.test.ts` 246 | 15 |
| `tests/components/fourier-field/FourierField.smoke.test.ts` (509) | in place | `field.smoke.test.ts` 359 · `surface.smoke.test.ts` 146 | 30 |
| `tests/gates/orphan-css-partial.test.ts` (505; 492 at HEAD) | `tests/gates/orphan-css/` | `partials.ts` 365 · `partial.test.ts` 163 | 9 |

The test counts are the passed-test counts of the HEAD baseline (571 in total). Arm C's route-edited sources carry 569.

**Placement.** A source becomes a named subdirectory when its directory is already over 12 files (`tests/styles` 28, `tests/components` 43, `tests/demo` 17, the dock dir 16), or would pass 12 if the split stayed in place (`tests/gates` holds 10, and its three splits would add 5). The split therefore never adds a file to a directory that is over the bound. On arm F this moves `tests/styles` 28 → 23, `tests/components` 43 → 42, `tests/demo` 17 → 16 and the dock dir 16 → 15. Three sources sit in a directory of their own (`sortable-list/`, `dark/`, `fourier-field/` at 2 files) and split in place. No output takes a placeholder name, and no directory repeats its parent: seal B15 reads 0 before and after (arm C).

**Named shapes.**

- **`within`** (contrast-computed). One describe holds all nine sections. Each part re-opens it under the same title, so every test keeps its full name.
- **`share`** (public-surface). The four export tables are data that only `runtime.spec.ts` reads. Carrying them would put that part at 585 lines, so they move to `exports.ts`.
- **`shareAll`** (orphan-css-partial). One describe that cannot split. Its two computed tables move to `partials.ts`.
- **`copy`.** A one-line declaration each reading file carries itself. Fourier's `DEMO` needs no helper module of its own. Orphan's `REPO_ROOT` and `SRC` stay local so that the floor's graph reads the planted path expressions as it did before (§4).
- **Import assertions.** An import that no statement reads is kept verbatim with its comments in the helper, or in the first part when there is no helper. This covers public-surface's two `@ts-expect-error` imports and its O-20 type-only door imports.

## 4 · Verification

Four arms ran in linked worktrees under the seat's scratch. Both worktrees were removed before return.

- **Arm F.** HEAD plus the floor rows (`floor/rows/apply.mjs`, `r1` first), the chain's S1 cut, then the split. This is the tree the route lands on.
- **Arm C.** `5e278aa7` plus pass 4's whole chain, replayed by `pass-4/B-kit/replay.mjs` (chain final MATCH, digest `6618df1f…`), then the split. This is the route's own tree with every earlier B step applied, the closest reading available to where B-S11 lands.
- **Arm A.** HEAD with no floor rows, run with an earlier version of the tool. It is kept for its two findings (§4.1).
- **Arms G and H.** The final spec, re-run on the C and F trees after two part comments were corrected.

The table gives each arm's exit codes.

| step | arm F | arm C |
|---|---|---|
| split (tool refuses on: unnamed block, block named twice, stale title, output > 500, unread declaration, existing path, missing `--ledger`) | 0 | 0 |
| `conserve.mjs` | 15/15 | 15/15 |
| F-1 `graph.mjs` | 0 violations | 0 violations |
| `vue-tsc` library / test program | 0 / 0 | 0 / 0 |
| `vite build`, demo build | 0, 0 | 0, 0 |
| vitest, the new test files (36 files) | 571/571 | 569/569 |
| vitest, whole suite | 2,313: 0 failed | 2,331: 4 failed, all `seal.test.ts` clauses (B0, B2, B6 red before the split; B16 new, §5.1) |
| `verify:package` | tests row 0 B; shipped row +6 B | — |

**Plants** (arm C tree, `results.txt`). Each of the following exits 1 with the reason named:

- a spec that drops a block;
- a spec that names a block twice;
- a spec that names a title no block carries;
- a spec that puts contrast-computed in one part (`all.test.ts: 1262 lines > 500`);
- a row with a `@ts-expect-error` line removed (`conserve` MISSING);
- a row with a type-only door import removed (`conserve` MISSING import binding).

The unplanted controls exit 0.

### 4.1 · What the verification found, and the fix for each

1. **Dropped import assertions.** The first derivation recomputed every import from use, so it dropped the imports no statement reads. In `public-surface.spec.ts` those are the assertions: a `@ts-expect-error` import and the type-only door imports ("These imports ARE the assertion"). The typecheck stayed green, because a dropped assertion is silent. `conserve.mjs` reported MISSING in 3 sources. The fix is at the cause: an unread binding is an assertion and moves verbatim. `conserve` now also holds every import binding.
2. **The floor's opaque ledger.** It matches a reference by `(file, kind, spec)`, and 10 entries name split sources. After the split, F-1 read 28 violations (18 unresolved, 10 ledger-stale) and `floor.test.ts` went red. The tool now re-points each entry to the output that carries its reference (`--ledger`), and it refuses when the landed ledger names a split source without that flag.
3. **Ledger specs inside the orphan part.** Three of them (`join(REPO_ROOT, …)`) evaluated differently once `REPO_ROOT` came from an import: 4 violations. The fix is the `copy` shape: the two root constants are a line in each file.
4. **Citing files move on the route's tree.** The route moves the citing files (for example `icon-button.css` → `src/components/dock/controls/`), so citations named by HEAD path failed on arm C. A citation is now found by its text, and the count of files holding it must equal its HEAD count.

## 5 · For the route seat

1. **B16 0 → 6: land the split before colocation, or run colocation after it.** Six parts now have a single-unit subject, and R-3 puts them in that unit's slot:
   - `lattice/reach.test.ts` → `src/components/dock/__tests__/`;
   - `easing/product.test.ts` → `src/components/easing/__tests__/`;
   - `sortable-list/{guard,receive}.test.ts` → `src/components/sortable-list/__tests__/`;
   - `dark/sync-script.test.ts` → `src/composables/dark/__tests__/`;
   - `route-motion/alpha.test.ts` → `src/composables/motion/route/__tests__/`.

   Pass 4's colocation derive homes them once B-S11 precedes it. Their helpers stay in `tests/` (B8's test arm lets a colocated test read the test harness), or they move with them where all their readers move.

   **Dock interaction (P4-R5).** `reach.test.ts` would make `dock/__tests__` 17 on pass 4's tree, which held 16 before the GlassDock split. The re-measure P4-R5 asks for must count it.
2. **Order and flags.** Run the tool after the floor rows with `--ledger scripts/structure/records/opaque-ledger.json`. It emits two rows:
   - `--out`, the tests row: 15 removals, 50 creations (36 tests, 14 helpers), and hunks in 7 citing files and the ledger;
   - `--out-shipped`, 10 comment hunks in shipped `src/` files.

   `--apply` is this seat's own verification writer and parses nothing. The route's row writer carries P5-F4's parse check (FLOOR-P5 §4.4).
3. **B0 444 → 416 is not a cure.** B0 counts a path helper's call sites only in the file that declares the helper. When `read(rel)` moves into a helper module, its calls in the parts stop counting: path-helper sites went 38 → 5, while fs-read sites went 47 → 54. The split therefore hides 33 B0 sites that are still there. B-S12 (B0 onto F-1's file set) should count calls through an imported helper, or B0's number reads lower than the tree is.
4. **B2 67 → 68.** `src/components/easing/constants.ts` is now imported by two parts, where one file imported it before. P4-R1/P4-R2 handles it with the other test reaches: colocating `product.test.ts` (§5.1) cures one, and `frame.test.ts` re-points.
5. **The shipped-citation row moves the ratchet +6 B.** It holds 10 comment edits in `src/` CSS and TS that cite the old paths. Under P4-R3 it lands its own datum row: +6 B, class "comments in shipped CSS/TS". If the owner would rather not spend bytes on a comment, the arm is to drop the row and leave those comments citing paths that no longer exist. This seat does not recommend that. Release records (`CHANGELOG.md`, `MIGRATION.md`) and `docs/` are never rewritten.
6. **Four more test files over 500 are not in this zone on the route's tree.** At HEAD they sit in `tests/`: `constellationField.test.ts` 835, `useWebGLCanvas.test.ts` 540, `useWebGPUCanvas.test.ts` 509 and `music-staff.geometry.test.ts` 504. The route colocates them into `src/**/__tests__/`, where they are on the src seat's list of 22. This seat did not author them. If the src seat does not either, they are the tests zone's remainder (`bounds.mjs` tests 4 on arm F).
7. **`gate-register.test.ts` reads `tests/public-surface.spec.ts` by path.** Floor row `r1` retires it before any structure row, so arm F and arm C do not see it. On a HEAD tree without the floor rows it goes red (arm A: 3 failures).

## 6 · Open gaps

1. B16 6 on the route's tree until colocation runs after this step (§5.1). The P4-R5 re-measure of `dock/__tests__` must include `reach.test.ts`.
2. B0's path-helper count cannot see calls through an imported helper, so 33 sites are hidden by the split (§5.3). This is B-S12's to count.
3. B2 +1 (§5.4).
4. The shipped row's +6 B needs its datum row under P4-R3 (§5.5).
5. The 4 colocated test files over 500 depend on the src seat (§5.6).
6. `split.mjs --apply` does not parse its writes. The landing writer must (P5-F4).
7. `conserve.mjs` reads lines and import bindings. It would not see a moved statement whose meaning changes with its new scope. The typecheck and the per-part vitest runs are what cover that: 571/571 and 569/569, and they are the evidence for it.
8. The pass-5 chain did not exist while this seat ran. Arm C is pass 4's chain, and a pass-5 step that retitles a describe in these files would stop the tool, which refuses loudly by design.
