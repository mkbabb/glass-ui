# D1-B · pass 5 · PROTOTYPE seat

Seat: PROTOTYPE, route D1-B (sealed modules, flat). Model `claude-opus-5-5`, asserted from the seat's own identity. Kit: `pass-5/B-kit/`. Every number below comes from a command this seat ran; the files they rest on are under `pass-5/B-kit/results/p5/` unless named otherwise.

## 0 · The chain and its replay

The chain is `B-kit/frozen/SEQUENCE.json`: 103 steps, from base digest `35f7b831…` (HEAD `5e8b43ad`; later HEAD commits change docs only) to final S59.

**Final digest: `4678be8f16e559ad4a5af028a3bb39b01b0b331314b0a43485cb519eee9801ac` over 1564 files.**

Replay command, from committed artifacts only:

```
git worktree add <wt> HEAD
ln -s <checkout>/node_modules <wt>/node_modules
ln -s <checkout>/tests-visual/node_modules <wt>/tests-visual/node_modules
node <checkout>/docs/tranches/BL/design/structure/pass-5/B-kit/replay.mjs --root <wt> --twice
```

Replay R1 ran on a fresh worktree of HEAD (`a18cd342`), starting at the base. It used `--twice`, which applies every step a second time and requires the digest to stay the same. It finished with exit 0: `replay done in 20546.7 s; code digest 4678be8f…; chain final MATCH` (`replay-R1.log`). Every step logs `again: … 0 written/pending`.

An earlier replay, A, ran on its own fresh worktree before S59 was added. It resumed after S1 with `--twice` and matched the S58 digest `8fe69818…`. That is the second fresh replay, but it covers the chain only up to S58. A second full replay to S59 was not run: R1 took 5.7 h on a machine at load average 300–550 (18 cores; other sessions' pytest, vite and vue-tsc).

Two more checks tie the final tree to the artifacts in this directory:
- After planting and removing the plants (§3), the final tree's digest read `4678be8f…` again.
- A cascade snapshot of the replayed tree's build equals the committed `results/p5/cascade-final/` byte for byte, apart from the snapshot's `sha` label.

## 1 · Items

| item | status | evidence |
|---|---|---|
| S-14 (B17 reads every shape; the live sites cured) | **CLOSED** | §3: 50/50 plants caught (10 shapes × 5 zones, literal and parameter paths). B17 = 0 on the final tree. The four empty-catch sites are cured at their cause (S48 `b17-empty-catch`) |
| B-S11 / P4-R5 (files over 500; dock/__tests__ re-measured) | **CLOSED, reported** | B6 = 0 on the final tree. dock/__tests__ held 17 direct files after the GlassDock split, and S56 merges 8 files into 3, giving 12. `find src/components/dock/__tests__ -maxdepth 1 -type f \| wc -l` → 12. The test count is 140 before and after. The driver rules (P4-R5): this records both numbers |
| src/index.ts (src seat counterexample) | **CLOSED** | S55 moves the prose to `src/README.md`. `wc -l src/index.ts` → 494 (was 585). No export changes |
| B-S12 (B0's walks and computed reads onto F-1's file set) | **CLOSED** | S53 `b0-harness`, 92 files: `tests/harness/source.ts` and `tests/harness/artifacts.ts`. F-1 corrected a write it had counted as a read. B0 = 0 |
| B-S14 · story manifest and story dirs at 13 | **CLOSED** | S51 (the manifest reads nested dirs) and S52 (containers 13→10, foundations 13→11) |
| B-S14 · B2 per P4-R1/P4-R2 | **OPEN** | B2 = 61 lines (`b2-open.txt`): demo 21, tests 31, tests-visual 8, scripts 1. `derive/consumer-entries.mjs` finds no line it can re-point, because every target is private. Disposition table in §4 |
| Chip readback spec in the chip unit | **CLOSED** | `src/components/chip/__tests__/chip-accent-band.visual.ts` (S48), selected by the graph (§2.4) |
| Full graph selection on the final tree | **CLOSED (selection)** / **OPEN (run)** | §2.4 |
| "Other declarations" decomposed (P4-G9) | **CLOSED** | `tools/decl-diff.mjs`, `decl-diff-all.json`, §2.2 |
| B15 digit suffix (P4-G10) | **CLOSED** | Plant `src/utils/helpers2.ts` → B15 `src/utils/helpers2.ts (placeholder file name)` |
| Browser-seat base-green accounting (found this pass) | **CLOSED** | S58: base-green had compared basenames against nested paths, so it read "no browser signal" for every carved spec, a vacuous GREEN. It now compares names on both sides |
| P5-F3 listing | **PARTIAL** | `authored/listed-reorders.json` lists the 18 card rules (S4b). The 10 Timeline rules cannot be listed while `cascade verify` reads an SFC style move as a content change (§2.3) |

## 2 · The §P4-8.4 bar on the replayed tree

### 2.1 Clauses, tests, types

| command (in the replayed worktree) | result |
|---|---|
| `node scripts/structure/seal/seal.mjs --root wt --json seal.json` | B0..B17 = 0 except **B2 = 61** (`seal-final.json`). The pin holds 139 modules, 119 doors and 1262 names |
| `npx vite build` | exit 0 |
| `node scripts/verify-export-types.mjs` (verify:package) | exit 0, `terminal: CLEAN`, 196 claims, 493 declarations, 162 CSS, roster 289/289 (`verify-package.log`) |
| `npx vue-tsc --noEmit` and `-p tsconfig.test.json` | exit 0, exit 0 |
| `npx vitest run` (= `npm test`) | 2203 tests: 2198 passed, 4 failed, 1 skipped; 6 suites failed (`vitest-final.json`) |

The vitest failures, one by one:
- `seal.test.ts › B2`: the open B2 item. The seal is wired into `npm test` through `tests/gates/seal.test.ts`, which has no off switch: no skip, no env read, and the CLI refuses `--pin`. So "all 18 GREEN in npm test" is **OPEN on B2 alone**.
- `boot-graph/build.test.ts` (3 tests): `dist-demo/index.html is absent`. The test text says "npm test runs it first", but `package.json` has no `pretest`. This is a HEAD defect outside D1. After `npm run demo:dist:build`, all 3 pass.
- `GlassDock.stagger.test.ts`, `slider.size-tokens.test.ts`: `Hook timed out in 10000ms`. `boot-graph/source.test.ts` timed out on its second run. These are P4-G8 load nondeterminism. A rerun of the four files with `--hookTimeout 120000 --testTimeout 120000` passed 26/26 (`vitest-rerun-timeouts.log`).

### 2.2 The datum row (P4-R3)

S59 (`authored/datum-row.json`) rebinds `.bundle-ratchet` from 2,919,057 to 2,959,588. verify:package is CLEAN against that number.

| tree | unpacked bytes | file |
|---|---|---|
| HEAD | 2,919,057 | `pack-head.json` |
| floor (S1) | 2,913,546 (−5,511) | `pack-floor.json` |
| route (S59) | 2,959,588 (+46,042 over the floor) | `pack-final.json` |

By class (`pack-diff-route.json`): declarations +40,140, MIGRATION.md +7,545, CSS +643, JS −2,518, other +232.

`decl-diff.mjs --doors --chain` splits the declarations line two ways:
- By kind: wiring +16,099, JSDoc prose +18,687, body +5,354.
- By step: S5-1 doors +20,386 (+13,874 of it wiring); S39-12 blob shader split +13,678 (all prose); the other S39 splits about +12,000 together; S5a −6,385.

No private code ships: JS falls.

### 2.3 Cascade

`node scripts/structure/cascade.mjs verify --baseline results/p5/cascade-floor --dist wt/dist --reorders authored/listed-reorders.json` → exit 1, **RED: content changed** on `./styles` and `./styles.css` (`cascade-verify-final.json`).

The cause is S39-03 (Timeline → TimelineMarks). `verify` numbers scope ids by first appearance, so the 17 rules that moved into the child SFC renumber.

With the scope ids erased, `tools/erased-risk.mjs` finds no risky pair:
- `./styles`: 1970 rules, 28 moved (18 card S4b + 10 Timeline), 0 risks;
- `./styles.css`: 365 rules, 10 moved, 0 risks;
- fonts and theme: 0 moved.

This argues from the rule text; it is not a verifier verdict. **OPEN**: the verifier needs an SFC-style-move reading (a floor item) before the 10 Timeline rules can be listed.

### 2.4 Browser

The selection is CLOSED. On the replayed tree, `browser.mjs --select-only` with every chain move list and all 794 changed files selects **154 specs across 68 bands**. That equals the pre-replay selection (`selection-replayed.json`, `selection-final.json`).

The run is **OPEN**. The base arm ran on the floor tree with the 151 specs that have a floor counterpart (864 tests, 1 worker). In 60 min it reached 119/864 tests, 71 of them failed. Most failures were timeouts of 1–17 min at load average 300–470, and I stopped it (`browser-base-partial.log`). A base-green read under that load is not evidence, and at that rate the base and migrated arms together need about 15 h. Per-band base-green counts and the 0-new-failure delta need a quiet machine. The S58 fix keeps that run from reading vacuously GREEN.

## 3 · Plants (one gate run on the final tree, then removed)

`tools/plants-p5.sh <wt>` writes the plants. The gate then ran once: `node scripts/structure/seal/seal.mjs --root wt --json seal-plants.json` (`seal-plants.json`).

| plant | clause | caught |
|---|---|---|
| S-14 shapes ×10 in each of src, demo, tests, tests-visual, scripts | B17 | 50/50 (every zone `CCCCCCCCCC`) |
| `helpers2.ts` (digit suffix) | B15 | yes |
| a directory of 13 files | B6 | `src/utils/overfull/: 13 direct files > 12` |
| a demo import of private `useDockState` | B2 | `demo/composables/b2plant.ts:1 -> …/useDockState.ts [import]` |

The 10 S-14 shapes:
- the ternary, literal and parameter;
- the positive guard, literal and parameter-with-accumulator;
- catch-return, literal and parameter;
- the empty catch;
- `.then(ok, h)`;
- a loader bound to a name;
- a loader as a parameter.

The plants were removed afterwards. The digest returned to `4678be8f…`.

The battery's other plants were not re-run by this seat: the carved visual spec leaving the Playwright program, and pass 4's door regressions. The critic's battery owns those.

## 4 · B2: the 61 lines (OPEN)

The full list is in `b2-open.txt`. Following P4-R2 (re-point by default; publish only a published component's contract), the planned dispositions are:

- **Publish** (contract of a published component, each needing a MIGRATION "added" row and a pin row):
  - on `./dock`: `useDockState`, `SearchableItem`, `SearchResult` and `FuzzySearchState`, which are `useDockSearch`'s contract;
  - on `./sidebar`: `SectionHierarchy`, which `TreeIndexEntry` extends.
- **Driver rules**: `useFuzzySearch`, `useGlassBackdropLuminance` and `GLASS_BACKDROP_SHARED_ATTR`, `useScrollScene`, `springProjection` and `motionTempo` (with `scripts/regen-spring-tokens`), `isAuroraPointerEnabled`, `pendingRenderer`, `MAX_SATS`, `FOURIER_STROKE_RUNGS`, and the tests-visual aurora dynamic imports.
- **Consumer changes**: `mulberry32` and `hashString` become a demo-local prng.
- **Tests (31)**: most read demo or other units. Each needs a split, colocation into its unit, or a move onto the harness (B16).

None of these landed in this pass.

## 5 · Fence record

All edits and builds ran in `scratchpad/…/B-proto/wt`. Writes in the checkout were limited to `pass-5/B-kit/` and this file.

One deviation: earlier in the pass, this seat ran `git checkout -q --` with no pathspec inside its own worktree. That is a no-op and changed nothing, but the fence forbids `git checkout`. It was not repeated.

The worktree is removed with `git worktree remove --force` before returning.
