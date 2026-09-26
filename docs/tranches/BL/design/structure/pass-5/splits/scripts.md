# D1 pass 5 · B-S11 split rows, scripts zone

Seat: SPLIT-AUTHOR, route D1-B, zone `scripts`. Model claude-opus-5-5, asserted from the seat's own identity. Every number below comes from a command this seat ran on 2026-09-26. Each command and its output is in `pass-5/B-kit/authored/splits/scripts/results.txt`. This seat authored rows only. It landed nothing in the chain and edited no tracked file in the checkout.

## 1 · Result

The zone's three files over 500 lines each split into a named module with a door. There is no counterexample. The largest output is 440 lines (`scripts/profile-bundle.mjs`, the program that stays).

| reading | before | after the split |
|---|---|---|
| seal B6 on the route's pass-4 tree (arm C) | 62 | **59** (−3, exactly these files) |
| seal B0 / B2 (arm C) | 444 / 67 | 436 / 67 (§5.1) |
| every other seal clause (arm C), B1, B7, B10, B11, B13, B15, B16 and B17 included | 0 | 0 |
| `bounds.mjs` scripts-zone files over 500, arm C | 3 | **0** |
| `bounds.mjs` scripts-zone files over 500, arm F | 5 | 2 (the tests-visual zone's, §5.4) |
| F-1 graph, arm C | 7,809 edges, 0 violations | 7,881 edges, 0 violations |
| F-1 graph, arm F | 7,436 edges (FLOOR-P5 §3) | 7,505 edges, 0 violations |
| floor gates F-3, F-4, F-9 | PASS | PASS on both arms |
| build, typecheck (`vue-tsc`, both programs), demo build | — | all exit 0 on both arms |
| whole vitest suite, arm C | — | 2,331 tests, 2,327 passed, 3 failed (seal B0/B2/B6, red before), 1 skipped |
| whole vitest suite, arm F | — | 2,313 tests, 2,312 passed, 0 failed, 1 skipped |
| `comment-census`: 10 modes, old CLI against new | — | byte-identical on both arms |
| `profile:bundle`: measure and `--enforce`, JSON profile, table, stdout | — | byte-identical on both arms |
| `verify:package` verdict | C: increase 2,930,810 > 2,919,057; F: shrink 2,913,546 < 2,919,057 | the same message on each arm |
| `verify:package` full pack + install + three type modes (datum pinned in scratch) | — | evidence identical after normalizing temp paths, both arms |

Arms, as the demo seat used them:
- **F** is HEAD at seat start (`00d8db5a`) plus the pass-5 floor rows.
- **C** is `5e278aa7` plus the pass-4 chain, replayed from a kit home at `5e278aa7` (chain final `6618df1f…` MATCH in 106.2 s).

HEAD moved to `fff6771c` during the run by docs-only commits. `git diff --stat 00d8db5a fff6771c -- . ':!docs'` is empty.

## 2 · What this seat wrote

Under `docs/tranches/BL/design/structure/pass-5/`:

- `B-kit/authored/splits/scripts/rows.json` is the row spec. It holds each row's id, source, derive script and why, plus every file the row touches with that file's own why. A key ending in `**` claims every changed file under its prefix, so a test reader is found wherever the tests seat's carve puts it.
- `B-kit/authored/splits/scripts/0N-*.mjs` are the three rows for arm C, the route's tree. They are authored inputs to pass-4's `derive/edits.mjs` (`{file, why, create}` and `{file, why, from, to}`).
- `B-kit/authored/splits/scripts/arm-f/0N-*.mjs` are the same rows cut on arm F. The floor alone has no seal gate, so they carry no pin lines.
- `B-kit/authored/splits/scripts/tools/`:
  - `author/{comment-census,profile-bundle,verify-export-types}.mjs` are the three derive scripts. `author/pin.mjs` writes the seal pin through the gate's own `--write-pin`, and stops unless the only change is the new module and its door. `author/lib.mjs` holds the primitives.
  - `gen-rows.mjs` runs the derive and pin scripts per row and writes each row from the tree before and after. It stops if a changed file is claimed by no row, or if a named file did not change.
  - `apply.mjs` applies the rows with `edits.mjs`'s rules through pass-4's `makeRow`/`applyRow`. `--check` compares the result byte for byte, and the tool refuses the main checkout.
  - `conserve.mjs` prints each source line that is missing from the row's outputs.
  - `bindings.mjs` runs the TypeScript checker over the `.mjs` outputs. It reports every unbound name (2304) and every unused import (6133).
  - `verify/battery.sh`, `verify/plants.sh`, `verify/reset.sh` and `verify/norm.mjs` are the verification. The committed `battery.sh`, re-run on arm C, reproduces the arm C battery line for line.
- `B-kit/authored/splits/scripts/results.txt` and `splits/scripts.md` (this report).

**Why derive scripts and not only frozen rows.** Two kinds of change reach these files before B-S11 can land:
- Earlier chain rows edit them. S34 drops guards in `profile-bundle.mjs` and `verify-export-types.mjs`, and S11 edits a citation.
- The route's S-14 cure edits `combinedStylesDraw`'s ternary.

The derive scripts address top-level statements by name and move each body as it stands. They compute every file's imports from what the file reads (`importLines`). Two plants show this:
- The same script cuts the split on both arms, where `walk()` and `listFiles()` differ by S34's guards.
- Plant P2 applies the S-14 cure first. The derive then moves the cured body and drops the `existsSync` import that `budgets.mjs` no longer needs.

The frozen arm C rows are for the route seat to land if the tree at B-S11 is still `6618df1f…` in these files. Otherwise, run `gen-rows.mjs` there.

## 3 · The splits

Line counts are from `wc -l` on arm C. Arm F differs only by S34's guard lines: `budgets.mjs` 233, `files.mjs` 14, `references.mjs` 90.

| source | before → after | new module (door `index.mjs`) and its files (lines) |
|---|---|---|
| `scripts/comment-census.mjs` | 725 → 200 | `scripts/comments/`: `lexer.mjs` 171, `interpolation.mjs` 112, `detectors.mjs` 82, `corpus.mjs` 53, `census.mjs` 125, door 3 |
| `scripts/profile-bundle.mjs` | 936 → 440 | `scripts/bundle-checks/`: `budgets.mjs` 232, `drift.mjs` 95, `value-capabilities.mjs` 57, `critical-path.mjs` 61, `external-payload.mjs` 76, `files.mjs` 13, door 8 |
| `scripts/verify-export-types.mjs` | 1,078 → 19 | `scripts/package-verify/`: `references.mjs` 89, `claims.mjs` 100, `closure.mjs` 121, `roster.mjs` 186, `pack.mjs` 188, `install.mjs` 186, `type-resolution.mjs` 140, `verify.mjs` 124, door 3 |

Each file keeps its path and role, so `package.json` (`profile:bundle`, `verify:package`), `release.sh` and CI name the same executables. What each file judges moves into a module named for its domain. The module does not share a stem with the file it came from, following LAW §11's `aurora-config` reasoning.

- **comment-census.** The CLI keeps its header (the detector's statement, its approximations and its USAGE), `pct` and `main`, and it reads `census` and `byPrefix` through the door. The lexer, the declared interpolation approximation, the two detectors (prose classes, commented-out declarations), the corpus reader and the census move verbatim. The door carries `byPrefix`, `census` and `classifyText`. The gate's test `tests/gates/comment-ratio.test.ts` imports the door.
- **profile-bundle.** This file is a program: it runs at import, and `profile-bundle-value-js.test.ts` imports it with its env set. It keeps that shape: its paths, build, dist census, budget loop, profile and every report.
  - Each check moves to a file named for it. `budgets.mjs` holds the ceilings with their full re-base history and the resolved `/styles` draw.
  - `root` becomes a parameter of the two checks that read it.
  - The D5 statements become the body of `evaluateDrift(subpathEntries, baselinePath)`, re-indented, and it returns `{ subpathReport, exceeded }`. The program calls it where the statements stood. Its two `anyBudgetExceeded = true` become the function's own `exceeded`.
  - `DRIFT_CEIL` is read only inside `drift.mjs` and is not exported.
- **verify-export-types.** The CLI keeps its header and its one call. The verifier moves by proof: package references, claims, the declaration and CSS closures, the name roster, the pack and byte ratchet, the installed consumer, and its type resolution. `verify.mjs` reads the repository root two levels up.
  - Readers outside the module:
    - The build's style lifecycle (`vite.style-assets.ts`) imports the door.
    - Its watch list no longer names a file path. It reads `verifierInputs()`, the module's own list of its files, following S20's `recordInputs` precedent.
    - Each `tests/public-surface.spec.ts` subprocess probe loads the file that defines the name it imports (LAW §5's test seam): `verifyExportTypes` the door, `normalizeTarMembers`/`ratchetEvidence`/`packedCssSetFailures` `pack.mjs`, `rosterRatchetFailures` `roster.mjs`.
  - The door carries only `verifierInputs` and `verifyExportTypes`, the names something outside reads by import (B11). The first cut exported the probes' four names through the door, and seal B11 read them as having no outside reader.
- **The seal pin.** Each row adds its module and its door's names (pin 135 → 138 modules, 116 → 119 doors, 1,251 → 1,266 names). `pin.mjs` writes it with the gate's `--write-pin` and refuses any other difference.

**Conservation.** The table counts non-blank source lines that do not appear verbatim among the row's scripts-zone outputs:

| row | 01 | 02 | 03 |
|---|---:|---:|---:|
| arm C | 0 | 14 | 6 |
| arm F | 0 | 14 | 6 |

Each of these lines is one of the following:
- an import line regrouped
- `const root = …new URL("..")` and the two `../package*.json` URLs, now `../..`
- the two signatures that gained `root`, and their two call sites
- the two `anyBudgetExceeded = true` lines inside drift, now `exceeded = true`

## 4 · Verification

These checks ran on both arms (`results.txt`, "Arm C checks" and "Arm F checks").

- **Build, typecheck and demo build all exit 0.** The build runs `verifyExportTypes` staged, through the new door.
- **`bindings.mjs`:** 25 files, 0 findings. Its first arm F run found 2: `files.mjs` and `references.mjs` needed `existsSync`, which S34 removes on arm C. The build failed with `ReferenceError`, and imports are computed since.
- **Behaviour equality.** The old code ran as a copy inside the same tree, so it resolves the same root and `node_modules`.
  - `comment-census`: 10 flag sets (default, `--json`, `--prose`, `--per-file`, `--dead`, `--audit-interp`, `--root demo`, `--root tests`, `--rev HEAD`, combined), all byte-identical.
  - `profile-bundle`: measure and `--enforce` (exit 0 and exit 1 on both, since the committed D5 baseline is stale at HEAD). The JSON profile, the markdown table and stdout are byte-identical. The drift path is exercised with FAIL and MISSING rows.
  - `verify:package`: the CLI verdict is identical on each arm. The full path was then run in the scratch tree with `.bundle-ratchet` pinned to the measured count and restored after (`git status` clean). It covers pack, tar membership, install with peers, Bundler/Node16/NodeNext type checks, runtime imports, CSS and fonts.
    - arm C: 196 claims, 488 declarations, 156 CSS, roster 289, pack 1,027,745 B
    - arm F: 193, 453, 124, 289, 1,022,870 B
    - On each arm the normalized evidence is identical before and after.
- **Tests that read the split files:**

| suite | arm C | arm F |
|---|---:|---:|
| `public-surface.spec.ts` | 94/94 | 96/96 |
| `comment-ratio.test.ts` | 15/15 | 15/15 |
| `profile-bundle-value-js.test.ts` | 1/1 | 1/1 |
| `floor.test.ts` | 4/4 | 4/4 |

- **Whole suite.** Arm C fails only seal B0/B2/B6, which were red before the split. Arm F has 0 failures. Three failures outside the split appeared on earlier runs under load 34 to 81 (`menu/contract`, `glass-subtlety`, `aurora/atoms`). Each passed when re-run alone (P4-G8).
- **Rows.**
  - `apply.mjs --check`, arm C: 176 files, 0 differ.
  - `apply.mjs --check`, arm F: 325 files, 0 differ.
  - A second apply stops on both arms.
  - The arm C worktree after the rows equals the derived tree.

**Plants** (`tools/verify/plants.sh`, arm C). Each one was caught:

| plant | what caught it |
|---|---|
| P1 · the tests seat re-carves `public-surface.spec.ts` before row 03 | the frozen row stops before writing (ENOENT, 0 files); the derive re-points all 7 probes in the moved file, and 0 old paths remain |
| P2 · the route's S-14 ternary cure lands before row 02 | the frozen row stops; the derive moves the cured line into `budgets.mjs`, and its `existsSync` import drops |
| P3 · a new module named `scripts/utils` | seal B15 1, "placeholder name" |
| P4 · a forgotten import (`walk` in `critical-path.mjs`) | `bindings.mjs` TS2304 |
| P5 · a module file pushed to 732 lines | seal B6 60 |

## 5 · Open gaps (for the route seat)

1. **B0 436 on arm C: 8 fewer lines, none hidden.**
   - In these files B0 read 48: 3 walks, 37 fs reads and 8 path-helper hits. After the split it reads 40, with the same 3 walks and 37 fs reads at their new sites.
   - The 8 path-helper hits were call sites of same-file helpers that read a path (`combinedStylesDraw`, `evaluateCriticalPath`, `rosterRatchetFailures`, `ratchetEvidence`, `runTypeResolverChecks`). They now call across the door, where B0's same-file heuristic does not follow. The reads inside those helpers are still counted.
   - B-S12 owns B0. If B0 should count a helper call across a door, that is a B0 widening, not a split change.
2. **S-14 and B17 sites now live at new paths.**
   - `budgets.mjs:229` holds the named ternary (was `profile-bundle.mjs:292`).
   - Other shapes the widened B17 may read:
     - `drift.mjs:34`: `if (existsSync(baselinePath)) { try … catch {} }`
     - `roster.mjs:160`: `existsSync(migrationPath) ? read : ""`
     - `critical-path.mjs:17, 35`: positive guards that record the absence as a fact
     - `install.mjs:103`: `.find(existsSync)`
   - The derive moves whatever text the chain holds (P2), so the cure can land before or after B-S11. After B-S11, the cure rows must target the new files.
3. **Row order.**
   - Land rows 01 to 03 before the tests seat's `split.mjs`. Row 03 edits `tests/public-surface.spec.ts`, which that seat carves by title. If the carve lands first, re-derive; P1 shows the derive handles it.
   - Rows 01 to 03 are independent of each other. Each carries its own pin lines.
4. **Arm F's other two scripts-zone files over 500** are `scripts/lib/paint-arm.mjs` (586) and `scripts/reflect-capture-verify.mjs` (583). The chain moves both to `tests-visual/paint/` at S19, so they belong to the tests-visual seat. Arm C has none left in this zone.
5. **`scripts/bundle-checks/files.mjs` is reported as B10 `bound`.** F-7 would place it elsewhere, but FD-2 refuses the move, so it stays. It is not a violation (B10 0), and it is listed in the gate's `meta.b10.bound`.
6. **`stripCssComments` and `rosterDatumLines` stay exported from `roster.mjs`, and `packageRootAgreement` and `unpackedContentBytes` stay exported from their files.** They were exported at HEAD, and nothing outside the module imports them now. Only the door is judged for outside readers (B11), so this is reported, not red.
7. **`verify:package` is RED on both arms before and after**, with the same verdict: arm C +11,753 B (the route row, P4-R3), arm F −5,511 B (the floor row). The split changes 0 packed bytes, since `files` is `dist` and `MIGRATION.md`.
8. **Playwright was not run.** No visual spec reads these files. The tests-visual zone reads `scripts/lib/paint-arm.mjs`, which is not part of this split.
