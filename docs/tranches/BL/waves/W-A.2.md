# W-A.2 · W-REGISTER-COLLAPSE: one roster of invariants, each seen red on its shipped detector · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree, with `dist/` and `dist-demo/` built there (`vite build`, 12 s; `vite build --config demo/vite.demo-dist.config.ts`, 3 s). `git diff --stat v10.1.0 HEAD -- src tests tests-visual scripts .github package.json` prints nothing |
| ships in | 11.0.0 |
| families | F-01, F-02, F-03, F-06, F-09 (`audit/REGISTRY.md:169-208`, `:228-238`, `:267-277`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| family | members | the part closed here |
|---|---|---|
| F-01 the register counts names | L02-F01, L02-F02, L02-F12, L02-F14, L01b-65, L05a-08, L09-12, L01a-31, L01a-04, L01a-08, L01a-15, L01a-16, L01a-38, L13-06, R2-05-F6, R2-05-F9 | the seat register and its count pins go; one roster file of 40-60 invariants takes their place; every absent seat (L02-F12's 21, L01a-04/-08/-15/-16/-38's named ones, L13-06's G-COLOCATED) is either a roster entry with an owner wave or is not carried, and the roster records which; test rows leave the roster (L02-F14, R2-05-F6) |
| F-02 detectors narrower than the claim | L02-F04, L02-F05, L02-F06, L02-F08, L02-F15, L05a-19, L09-19, R2-05-F1, R2-05-F2, R2-05-F3, R2-05-F8, R2-06-06 | each roster entry states its defect class and carries a bite on the shipped detector; paint claims move onto an in-process engine lane (R2-05-F2's cure path); the tautological bites (L02-F08) and the mtime and wall-clock arms (L02-F15, R2-05-F8) go. R2-05-F3's weak-value rows fold into their owning waves, each named in the roster's owner column. L09-19's doc gates are W-C.3's; R2-06-06's `recap.mjs` is tooling in `docs/` and retires in W-C.1 |
| F-03 gate arms pinned to a live defect | L12-12, L13-08, R10-02-01, R10-02-02 | synthetic fixtures under `tests/_support/fixtures/`; the proportion register's dark-α arm and its duplicate-token arm restated on the cured state |
| F-06 the #10 sink | L01a-10 and the 22 other round-1 members, R10-02-03 | the in-tree pointers to #10 and to the non-existent "π battery" counter are struck; the owed cells are already placed in their families' waves (L01a-10's dark α in W-H.1, the Safari runs in W-A.6) |
| F-09 latches | L02-F03, L02-F13, L04-F04, L01a-27, L01b-58, L01b-59, R2-05-F7 | the 10 `it.fails` latches retire; each subject becomes a roster entry with status `owed`, its owner wave, and a growth fence that fails when the defect set grows |

## 2 · The defect at HEAD

Measured in the scratch worktree at `fabc95e2`.

- **The register pins its own absence count.** `tests/gates/gate-register.test.ts:172-174` asserts `seats.bound` 13, `armOnly` 2, `unbound` 45. `node scripts/gate-register.mjs` prints `seats:60 … bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`. Binding one live detector (G-CONTRAST-COMPUTED → `tests/styles/contrast-computed.test.ts` in `SEAT-BINDING.json`) makes the script print `bound:14 … unbound:44 … violations:0` and the test fail: `AssertionError: expected 14 to be 13`, 1 failed | 20 passed. Wiring a gate turns the register red.
- **The register's inputs live in closed tranche records.** `scripts/gate-register.mjs:78-86` reads `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C20.json`, `docs/tranches/BK/execution/2026-08-03-row9-register/SEAT-BINDING.json` and `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md`. `docs/instructions/README.md:17-18` still says "Proof is `node scripts/gate-register.mjs` … whose receipt must end `violations:0`" (L09-12).
- **Shipped detectors miss their own defect class.** One edit, then the named test, then a byte-exact restore (`git status --porcelain` empty after every probe):

  | mutant | edit | detector run | result |
  |---|---|---|---|
  | M01r | `rounded-badge` → `rounded-[13px]` in `src/components/badge/index.ts:44` | `tests/gates/token-hygiene.test.ts` | **SURVIVED**: 4 passed |
  | M21 | `@layer components { .menu__trigger:focus-visible { box-shadow: none !important; outline: none !important; } }` appended to `src/styles/glass/overlay-plate.css` | `tests/components/a11y/focus-visible.test.ts` | **SURVIVED**: 8 passed |
  | M22 | `@layer components { .glass-slider { --slider-touch-target: 0.25rem; } }` appended to `src/components/slider/styles.css` | `tests/components/a11y/coarse-target.test.ts` | **SURVIVED**: 13 passed |
  | U07r | `@property --glass-level { … initial-value: 0; }` (`src/styles/tokens/property-regs.css:154-158`, from 1) | `tests/styles`, `tests/components/ui/surface`, `trap-gates`, `token-hygiene` | **SURVIVED**: 31 files, 496 passed \| 5 expected fail |
  | U07r | the same edit | the engine-lane prototype `frost-computed.mjs` (R2-05's, `page.setContent` over the source CSS, no server) | **RED**: `frost-every-rung: RED r-wash,r-quiet,r-resting,r-floating,r-overlay`; the same prototype reads `GREEN` at HEAD |

  M34 (a leaked export on `./status-dot`) also SURVIVED `tests/public-surface.spec.ts` (96 passed); its gate is W-A.5's subpath exactness.
- **Gate arms pinned to the defect** (the cure turns them red):

  | plant (the cure's shape) | run | result |
  |---|---|---|
  | F03-P1: `src/styles/index.css` imports `../components/_shared/field/control.css`, so the partial is reachable on channel 1 (R10-02-01) | `tests/gates/orphan-css-partial.test.ts` | **RED**: `the exemplar is genuinely channel-1-unreachable: expected true to be false` (`:469-470`) |
  | F03-P2: a dark-arm `--ink-edge` declaration in `src/styles/tokens/dark-arm.css`, the byte that cures L01a-10 (R10-02-02) | `tests/styles/proportion-register.test.ts` | **RED**, 2 failed: `invents NO dark-arm α` (`:173-181`) and `mints NO seventh token` |
  | F03-P3: `useScrollScene.ts` moved from `src/composables/motion/scroll/` to `demo/stories/motion/`, its only consumer's directory (L12-12, L13-08) | `tests/gates/orphan-css-partial.test.ts` | **RED**: `the referrer must genuinely exist on disk: expected false to be true` (`:431`) |

- **Latches.** `git grep -n "it\.fails(" -- tests` gives 10 sites. With every `it.fails` flipped to `it`, the seven files give `Tests 10 failed | 209 passed`: all 10 are live. Their defect sets at HEAD: `comment-ratio.test.ts:209` `{ share: false, proseHits: 379 }`; `engage-ladder.test.ts:134` 17 of 55 directories carry a rung; `layout-canon.test.ts:371` 32 files, `:390` 1, `:403` 1; `radius-role-canon.test.ts:458` 3 tokens (`--radius-xl` and 2 more); `story-preview-card.test.ts:487` 10 SFCs, `:556` 1; `g-dock-lattice.test.ts:925` 20 state classes; `gl-excise.test.ts:112` 11 register rows. Growth is invisible: `export const probeSecondContext = "webgl2";` appended to `src/components/blob/shaders/metaball.frag.ts` (an allowed file, `gl-excise.test.ts:151-154`) **SURVIVED** (4 passed \| 1 expected fail); 400 lines of `// BK #n W-PROBE round n — tranche prose…` appended to `src/components/badge/index.ts` **SURVIVED** `comment-ratio.test.ts` (14 passed \| 1 expected fail).
- **The #10 sink's pointers.** `grep -rnE "#10'?s? (paired|protocol|browser)|OWED \(#10\)|π battery" src tests` gives 6 lines: `src/styles/glass/material.css:63`, `src/styles/tokens/color-radius.css:142`, `tests/styles/layout-canon.test.ts:19`, `:151`, `tests/styles/proportion-register.test.ts:176`, `tests/components/button/Button.test.ts:12`. The registry's own invariant, `grep -rnE "#10\b.*(owed|OWED|π)|π battery" src tests` (`REGISTRY.md:238`), finds 3 of these 6; it is itself narrower than its claim, so this wave uses the six-site spelling set above.
- **mtime freshness.** After the bite probes restored their files byte-exact, `tests/gates/boot-graph.test.ts` fails `the dist-demo it measures is NEWER than every source it is built from` (1 failed | 13 passed) over sources whose content equals HEAD.
- **Standing laws with no line.** E-5 (presets in consumers) and E-9 (CLAUDE.md never recreated) have no executable (`ledger/CENSUS.md:207-209`). Both hold at HEAD: the E-5 detector below reads 0, and `CLAUDE.md` is absent.
- **The draft roster.** R2-05's 50-entry draft is on disk as the driver's rendering of the seat's return (`audit/round-2/R2-05.md:170-251`); its captures and probe scripts are under the git-ignored `audit/captures/R2-05/`. REGISTRY §6.8's "no roster file on disk" is true of a tracked roster file and stale for the draft text. This wave derives the roster from that draft and re-measures each entry at HEAD.

## 3 · The cure

1. **One roster file.** `tests/gates/roster.json` is the source of record for the gate set (E-8, P-3). Each entry:

   ```json
   { "id": "G-19", "name": "FROST-COMPUTED", "law": "F-02 / E-2",
     "invariant": "each glass rung computes a backdrop blur > 0 in strict rung order; opaque computes none",
     "run": { "file": "tests/styles/frost-computed.test.ts", "title": "frost is computed on every rung" },
     "bite": { "patch": "tests/_support/bites/G-19.patch", "red": "frost-every-rung: RED r-wash" },
     "status": "bound", "owner": "W-A.2" }
   ```

   `status` is `bound` (the executable runs in `npm test` and passes) or `owed` (the defect is live; the entry names the wave that turns it `bound`, and carries a `fence`, a test that runs in `npm test` and fails when the defect set grows). There is no third status and no count field. The roster holds 40 to 60 entries; component behaviour rows are tests, not entries (E-8).
2. **The roster's own invariant.** `tests/gates/roster.test.ts` (G-46) fails when: an entry's `run.file` is missing or holds no non-skipped registration whose title equals `run.title`; an entry has no `bite.patch` file; a `bound` entry's `owner` is not `W-A.2` or a wave in `docs/tranches/BL/waves/INDEX.md`; an `owed` entry has no `fence` or no owner; the entry count is outside 40-60; an id repeats. `scripts/bites.mjs` applies each entry's patch in a temporary copy of the tree, runs the entry's executable, asserts it fails with `bite.red` in its output, and restores. It runs in this wave for every entry, in any wave that adds or edits an entry, and at the close (W-L.8). It does not run in `npm test`.
3. **The register goes.** `scripts/gate-register.mjs` and `tests/gates/gate-register.test.ts` are deleted. No tooling reads `SEAT-BINDING.json`, `GATE-SEMANTIC-ROSTER-C20.json` or `TERMINAL-ROSTER.md` again; they stay as BK and BJ records. `docs/instructions/README.md:17-20` names the roster and `scripts/bites.mjs` as the proof.
4. **Detectors state their class and see what they claim (F-02).** Every entry's `invariant` names its defect class. A paint claim runs on the engine lane: `tests/_support/engine.ts` launches one headless Chromium per test file and loads the built `dist/` CSS closure with `page.setContent`, the pattern `tests/components/slider.size-tokens.test.ts` already runs in CI. The source-text rows that claimed paint (200 of R2-05's 356) leave the roster; where one is the only witness of a claim, the claim moves to an engine entry. The tautological bites (`feedback-tint-seam.test.ts:154-165`, `spring-authority.test.ts:117-123`, `comment-ratio.test.ts:195-207`) are replaced by the roster's patch bites, which run the shipped detector. `boot-graph.test.ts`'s freshness arm compares a sha256 of the source closure recorded in `dist-demo/` instead of mtimes. Suite timeouts are per file, sized from a measured run, never the 5 s default under load.
5. **Fixtures that do not depend on a defect (F-03).** The orphan-CSS channel-2 bite and the dead-referrer bite read a synthetic tree under `tests/_support/fixtures/orphan-css/` (a two-file SFC and partial that no entry imports), so `control.css`'s placement and `useScrollScene.ts`'s placement stop mattering to the gate. `proportion-register.test.ts`'s `invents NO dark-arm α` arm is deleted: the dark α values are W-H.1's to measure and derive against the painted composite, and W-H.1's rendered-contrast invariant is the gate that reads them. `mints NO seventh token` counts declared names over the light arm (`:root` scope of `color-radius.css`), so a dark-arm override of an existing token is not a new token.
6. **The sink's pointers go (F-06).** The six sites are rewritten to state the present-tense rule or deleted; `material.css:63` names no counter that does not exist. G-53 below is the invariant. No comment in `src` or `tests` routes a paint cell anywhere; an owed cell is a roster `owed` entry or a wave's π row.
7. **Latches become owed entries (F-09).** Each `it.fails` is replaced by (a) an `owed` roster entry whose `run` is the latch's assertion as a plain `it` in the owed file the table below names, under `tests/owed/`, a directory `vitest.config.ts` excludes from `npm test`; `node scripts/bites.mjs --owed` runs every owed file and fails if one passes, so an owed entry that went green is flipped to `bound` by its owner, not left behind; the owner wave moves the file to its home and removes the exclusion for it; and (b) a fence in `npm test`: the defect set computed by the shipped detector, comments stripped, must be a subset of the named members recorded in the fence at HEAD. A new member fails the fence; a removed member passes it. The owner wave deletes the fence when it turns the entry `bound`.

   | latch | defect set at HEAD | owed file | owner wave |
   |---|---|---|---|
   | `comment-ratio.test.ts:209` | 379 prose hits, share 38.9 % against 20 % | `tests/owed/comment-ratio.test.ts` | W-C.2 |
   | `radius-role-canon.test.ts:458` | 3 off-role tokens | `tests/owed/radius-role-canon.test.ts` | W-E.8 |
   | `engage-ladder.test.ts:134` | 38 directories without a rung | `tests/owed/engage-ladder-census.test.ts` | W-J.2 |
   | `g-dock-lattice.test.ts:925` | 20 state classes | `tests/owed/g-dock-lattice.test.ts` | W-I.1 |
   | `gl-excise.test.ts:112` | 11 WebGL2 register rows | `tests/owed/gl-excise.test.ts` | W-G.1 |
   | `story-preview-card.test.ts:487`, `:556` | 10 unrouted SFCs; 1 restated title | `tests/owed/story-preview-card.test.ts` | W-E.10 |
   | `layout-canon.test.ts:371`, `:390`, `:403` | 32 files; 1 `matchMedia`; 1 raw `vh` | `tests/owed/layout-canon.test.ts` | W-E.9 (`:371`, `:403`); W-E.14 (`:390`, and the file) |

   **The hand-off, stated once here.** After this wave no latch file holds its latch: the assertion is a plain `it` in the owed file of the table, excluded from `npm test`, and a fence sits in the latch file. The owner wave moves the assertion home into the latch file as a plain `it`, deletes the owed file (or its rows, where two owners share one), removes its `vitest.config.ts` exclusion and deletes the fence, in one commit, and the roster entry turns `bound`. A later gate written "`<latch file>` with `:N` as `it`" runs that moved assertion: at formation HEAD it is the latch flipped in place, the same assertion, so its HEAD reading stands. Each owner wave's §4 names its owed file, `vitest.config.ts` and its latch file (fix-9, FH-01).

   The engage census counts rungs from code only (L02 M15b2: comment lines forged it).
8. **Standing-law lines.** G-51 (E-5): no exported symbol or published token carries a consumer's name. G-52 (E-9): `CLAUDE.md` is absent at the repo root.

Appendix A is the roster as derived at this seat. The wave re-runs every entry and every bite at its own HEAD and records the result; an entry whose executable is red at the wave's HEAD is `owed` to the wave named in the appendix, never `bound` with a disclosure.

## 4 · Files it touches

- New: `tests/gates/roster.json`, `tests/gates/roster.test.ts`, `scripts/bites.mjs`, `tests/_support/engine.ts`, `tests/_support/bites/*.patch` (one per entry), `tests/_support/fixtures/orphan-css/`, the engine-lane test files the appendix marks new (for example `tests/styles/frost-computed.test.ts`).
- Deleted: `scripts/gate-register.mjs`, `tests/gates/gate-register.test.ts`.
- Edited: `tests/gates/orphan-css-partial.test.ts`, `tests/styles/proportion-register.test.ts`, `tests/gates/boot-graph.test.ts`, `tests/gates/token-hygiene.test.ts`, `tests/gates/type-hygiene.test.ts`, `tests/styles/color-mix-endpoints.test.ts`, `tests/components/a11y/{focus-visible,coarse-target}.test.ts`, `tests/gates/feedback-tint-seam.test.ts`, `tests/styles/spring-authority.test.ts`, the seven latch files, `tests/components/button/Button.test.ts`, `src/styles/glass/material.css`, `src/styles/tokens/color-radius.css` (comments only), `docs/instructions/README.md`, `vitest.config.ts` (per-file timeouts).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A2-G1 · the roster holds | `npx vitest run tests/gates/roster.test.ts` | exit 0, with 40-60 entries | **exit 1**: `No test files found, exiting with code 1` |
| A2-G2 · every bite bites | `node scripts/bites.mjs` | exit 0: every entry's patch reddens its executable with `bite.red` in the output | **exit 1** (absent). The four mutants of §2 (M01r, M21, M22, U07r) are entries' bites (G-13, G-22, G-23, G-19) and **SURVIVE** today's detectors |
| A2-G3 · the register is gone | `test ! -e scripts/gate-register.mjs && test ! -e tests/gates/gate-register.test.ts && ! git grep -q -e SEAT-BINDING -e GATE-SEMANTIC-ROSTER -- scripts tests .github package.json` | exit 0 | **exit 1** |
| A2-G4 · a bound gate does not redden the gate set | add one well-formed entry (with its patch) to `roster.json`, then `npx vitest run tests/gates/roster.test.ts` | exit 0 | the register's equivalent (binding G-CONTRAST-COMPUTED) gives **exit 1**, `expected 14 to be 13` |
| A2-G5 · cure-shaped plants stay green (F-03) | apply F03-P1, F03-P2, F03-P3 (§2), each alone, and run the named test | exit 0 for each | **exit 1** for each |
| A2-G6 · no sink pointer (F-06) | `! grep -rqE "#10'?s? (paired\|protocol\|browser)\|OWED \(#10\)\|π battery\|#10\b.*(owed\|OWED\|π)" src tests` (GNU and BSD `grep -E`; `git grep -E` does not honour `\b` here and reads 0) | exit 0 | **exit 1**: 6 lines |
| A2-G7 · no latch | `test "$(git grep -c 'it\.fails(' -- tests \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 10 |
| A2-G8 · fences see growth | apply the two growth plants of §2 (`metaball.frag.ts` webgl2 line; 400 prose lines in `badge/index.ts`) and run `npm test -- tests/components/custom/blob tests/gates` | exit 1, the failure naming the new member | **exit 0** for both (SURVIVED; the webgl2 plant re-run at `96dc425e` by fix-9: `4 passed \| 1 expected fail`, exit 0). The webgl2 leg lives as long as the `gl-excise` fence it bites: W-G.1 deletes that fence (item 7, its owner) and the plant's file (`W-G.1.md` §4), so from W-G.1's landing the leg is not run, and W-L.8 §3.5 step 1 records it as not re-run at the release commit. G1-G1 holds the class on every later tree: a `webgl2` line anywhere in `src` reddens it (fix-9, FH-01) |
| A2-G9 · the engine lane sees paint | `npx vitest run tests/styles/frost-computed.test.ts`, then the same with U07r applied | green, then red | the file is absent. The prototype reads GREEN at HEAD and RED under U07r while 496 source rows stay green |
| A2-G10 · freshness reads content | after `vite build --config demo/vite.demo-dist.config.ts`, `touch src/components/badge/index.ts`, then `npx vitest run tests/gates/boot-graph.test.ts` | exit 0 | **exit 1**: `the dist-demo it measures is NEWER than every source` over unchanged content |
| A2-G11 · the E-5 line bites | `grep -rhoE "export (declare )?(const\|function\|type\|interface\|class) [A-Za-z0-9_]+" dist .published-roster \| grep -ciE "speedtest\|atlas\|chicago\|keyframes\|floridify\|bbnf\|muster\|scaena\|valuejs"` as G-51's detector, then with `export const SPEEDTEST_AURORA_PRESET = { hue: 200 };` appended to `src/components/aurora/index.ts` and a rebuild | 0, then 1 (the entry exists in `roster.json` with this bite) | detector **0**, planted **1** (measured); the roster entry does not exist |
| A2-G12 · the E-9 line bites | `touch CLAUDE.md && npx vitest run <G-52's file>` | exit 1 | no file exists |

A2-G1 alone could pass with a roster that points at trivial tests. A2-G2 is what stops that: every entry must be seen red on a real mutation, and `roster.test.ts` rejects an entry whose patch file is missing. A2-G7 alone could pass by deleting the latched assertions; A2-G1 holds them, since each latch's subject must appear as an `owed` entry with an owner and a fence (the roster test checks the seven owner waves of §3.7 are present).

## 6 · π and DELTA obligations

The wave's visual claim is that the engine-lane entries observe paint that the source rows could not. For each engine entry built here (G-15, G-19, G-20, G-21, G-22, G-23, G-24, G-26, G-27, G-28, G-30): the computed-style readout at HEAD and under its bite patch, in light and dark, Chromium headless in-process. These are computed values, not screenshots; each engine entry whose invariant is visible (G-19 frost, G-22 ring, G-27 sheet position) adds one screenshot pair of the same `setContent` page, HEAD against bite, written under `.cache/visual/roster/` (W-A.1's root) and cited by path and sha256 in the wave record. WebKit: the engine lane is Chromium only; the WebKit and real-Safari cells of these invariants are W-A.3's wired lane and W-A.6's band. Real Safari UNMEASURED (OW-3).

## 7 · MIGRATION rows

None. The register, the roster and the tests are not published.

## 8 · Ledger rows

- Closed: #31 (its four a11y seats become G-22, G-23, G-25, G-34; `census-register-a.md:43`); #65 (`census-register-b.md:55`); #10 as a routing target (`census-register-a.md:30`; its dark α items are W-H.1's, its device runs W-A.6's); E-8, E-5 and E-9 enforcement (`CENSUS.md:207-209`); P-3's finite checklist (`CENSUS.md:216`).
- The latch form of #17, #23, #27, #58, #59 and #77, plus the `gl-excise` and `g-dock-lattice` latches, which the census counts in R-4 (`CENSUS.md:265`). Each subject stays with its owner wave (§3.7).
- Items the census hands F-01 (#8, #17, #23, #26, #29, #38, #76 seat bindings, `CENSUS.md:71`) become entries or are recorded as not carried, with the reason, in the roster's companion table (appendix B); F-02's items (#65's `nameIsLive` hole, C-6, E-1, E-4) and F-09's (E-2, E-3) are addressed by G-46's registration check, G-13's widened scope, and the latch retirement.
- P-2 is placed, not closed: its enforcement is W-A.3's wired set and each wave's §6.

## Appendix A · the roster as derived at this seat

Derived from R2-05's draft (`audit/round-2/R2-05.md:174-251`). "HEAD" is the status this seat measured or the recorded bite it cites; the wave re-runs every row. Changes from the draft are marked Δ.

| id | name | executable | bite | status at HEAD | owner |
|---|---|---|---|---|---|
| G-01 | SURFACE-EXACT, root and every subpath | `tests/public-surface.spec.ts` | M34 (SURVIVED here) | owed | W-A.5 |
| G-02 | PACK-INSTALL in CI | the consumer matrix | L02 class B, release-only | owed | W-L.3 |
| G-03 | NO-ORPHAN-EXPORT | `.published-roster` check | L02 M28 KILLED | bound | W-A.2 |
| G-04 | EXPORT-REACH (E-7) | `overfit-structure.test.ts` | L02 M26 KILLED | bound | W-A.2 |
| G-05 | PAYLOAD-CEILING | `scripts/profile-bundle.mjs --enforce` re-authored | `--enforce` exit 1 here (W-A.5 §2) | owed | W-A.5 |
| G-06 | DIST-CSS-PARSES | `material-css-syntax.test.ts` widened to `dist/**/*.css` | planted prose line | measured in wave | W-A.2 |
| G-07 | PUBLIC-TYPES | `npm run typecheck` (`*.test-d.ts`) | R2-05 V01-V04, V07, V08 | bound | W-A.2 |
| G-08 | STRICT-CONSUMER | consumer fixture + `vue-tsc` | 109 native-event diagnostics (R2-05-F5) | owed | W-L.2 |
| G-09 | TOKEN-BACKED | `token-graph.test.ts` | R2-05 T02 | bound | W-A.2 |
| G-10 | TOKEN-ACYCLIC | `token-graph.test.ts` | R2-05 T01 | bound | W-A.2 |
| G-11 | LAYER-CONTAINED | `orphan-css-partial.test.ts:479` | L02, 7 unlayered plants | bound | W-A.2 |
| G-12 | CSS-REACH | `orphan-css-partial.test.ts` (synthetic fixtures, §3.5) | L02 M09 | bound | W-A.2 |
| G-13 | LADDER-EMITTED (radius, blur, type, tracking over built CSS, `src` and `demo`) | token and type hygiene re-authored over `dist` and the demo build | M01r (SURVIVED here), M02r-M06r, L05a-19 | measured in wave; owed if red | W-C.4 |
| G-14 | SCOPED-GLOBAL-TRAP (E-12) | `trap-gates.test.ts` | L02 M08 | bound | W-A.2 |
| G-15 | LIGHTDARK-INSET (E-13) on the engine lane | new | L02 M07r | measured in wave | W-A.2 |
| G-16 | COLORMIX-NESTING, resolved | `color-mix-endpoints.test.ts` re-authored | L02 M14ar; 75 live contexts (`:13-20`) | owed | W-A.6 |
| G-17 | PREFIX-PAIR | `backdrop-prefix-normalization.test.ts` | L02 M11c | bound | W-A.2 |
| G-18 | GENERATED-MIRRORS | `springTokenMirror.test.ts`, engage mirror | R2-05 U12 | bound | W-A.2 |
| G-19 | FROST-COMPUTED | `tests/styles/frost-computed.test.ts` (new) | U07r (RED on the prototype here) | bound (GREEN here) | W-A.2 |
| G-20 | TRANSITION-CHANNELS | engine lane | R2-05 U03 | measured in wave | W-A.2 |
| G-21 | ANIMATED-PROPS-TYPED | engine lane | R2-05 U05 | measured in wave | W-A.2 |
| G-22 | FOCUS-RING-COMPUTED | engine lane | M21 (SURVIVED here) | measured in wave; owed if red | W-K.4 |
| G-23 | COARSE-TARGET-COMPUTED, 44 px | engine lane | M22 (SURVIVED here) | owed: the slider's coarse target is 24 px (`sizing.css:290`) | W-E.7 |
| G-24 | STATE-PAINT | engine lane | R2-05 U06, U09 | measured in wave; owed if red | W-H.1 |
| G-25 | CONTRAST-COMPOSITE | `contrast-computed.test.ts` + engine composite arm | L02 M18 (token half) | owed (composite) | W-H.1 |
| G-26 | PRM-NO-RESURRECTION | engine lane, `emulateMedia` | R2-05 T03 | measured in wave | W-A.2 |
| G-27 | CASCADE-GEOMETRY | engine lane | R2-01-03 (every sheet off-screen) | owed | W-E.2 |
| G-28 | CARD-CAST-SCOPE | engine lane | R2-05 U15 | measured in wave | W-A.2 |
| G-29 | SPRING-AUTHORITY | `spring-authority.test.ts` + clock fence | L02 M13r | owed | W-F.1 |
| G-30 | ROUTE-NO-FLASH, blend arm | `route-motion.test.ts` + engine arm | R2-05 U20 | measured in wave | W-A.2 |
| G-31 | QUIESCENT | mounted rAF spy | L07-02 | owed | W-G.3 |
| G-32 | DOCK-MORPH-CONTINUITY | wired visual lane | ⊕⁸⁰ 56 → 0 → 157 | owed | W-I.1 |
| G-33 | GOO-MORPH-SIGNATURE, neck in px | engine lane | R2-05 U02; R2-01-05 (neck 300.6 px) | owed | W-E.12 |
| G-34 | KEY-SCOPE | `key-scope.test.ts` | L02 class B | bound | W-A.2 |
| G-35 | ROVING-REACH (dock) | `g-dock-lattice.test.ts:376` | L02 class B | bound | W-A.2 |
| G-36 | MODAL-TOP-LAYER | mounted | L08-01 | owed | W-K.2 |
| G-37 | FOCUS-RETURN | mounted | F-38 | owed | W-K.3 |
| G-38 | LOCKED-DISMISS | mounted | R2-05 B12, B13 | owed | W-E.4 |
| G-39 | REKA-EMIT-WITNESS | generated from R2-05 `sweep2` | 18 of 37 channels unwitnessed | owed | W-L.2 |
| G-40 | REKA-BINDING-PARITY | R2-05 `sweep.mjs` as a test | planted E01-E04, E06 | bound | W-A.2 |
| G-41 | RENDERLESS-ROOT-ATTRS | R2-05 `sweep-renderless2.mjs` as a test | planted E08 | bound | W-A.2 |
| G-42 | COLOCATED (N-1) | D1's placement seal | born-RED (L13-06) | owed | W-D.1 |
| G-43 | TESTS-TYPECHECKED | `npm run typecheck` (three projects) | W-A.1 A1-G1 | bound (W-A.1 lands first) | W-A.1 |
| G-44 | NO-LATCH | A2-G7 | 10 here | bound at landing | W-A.2 |
| G-45 | COMMENT-PROSE | comment census, comments stripped | M25 (SURVIVED here) | owed, fenced | W-C.2 |
| G-46 | ROSTER-BOUND | `roster.test.ts` | an entry without a patch | bound at landing | W-A.2 |
| G-47 | AURORA-FLOOR, chroma, WebGPU primary | GPU leg | grey plant (W-A.4 §2) | owed | W-A.4 |
| G-48 | BLOB-FLOOR on the GPU leg | GPU leg | `blob-blank`, `blob-flood` | owed | W-A.4 |
| G-49 | NO-H-OVERFLOW | wired lane | a 2000 px plant | owed | W-A.3 |
| G-50 | BOOT-GRAPH, content freshness (Δ: the Safari half of R2-05's G-50 is G-54) | `boot-graph.test.ts` | L02 M20; A2-G10 | bound at landing | W-A.2 |
| G-51 | PRESETS-IN-CONSUMERS (E-5) Δ | A2-G11's detector | measured 0 → 1 | bound | W-A.2 |
| G-52 | NO-CLAUDE-MD (E-9) Δ | a test asserting absence | `touch CLAUDE.md` | bound | W-A.2 |
| G-53 | NO-SINK-POINTER (F-06) Δ | A2-G6 | 6 here | bound at landing | W-A.2 |
| G-54 | SAFARI-CELLS (D-4) Δ | the Safari battery | OB-1 session refusal | owed | W-A.6 |
| G-55 | FOURIER-FLOOR on the GPU leg Δ | GPU leg | no fourier arm at HEAD | owed | W-A.4 |

55 entries. "Measured in wave" rows have a recorded bite from R2-05 or L02 and no HEAD run at this seat; the wave records whether each is green (bound) or red (owed to the named wave).

## Appendix B · the absent seats

The 21 seats L02 §A lists with no executable, and the process seats, each decided:

| seat | decision |
|---|---|
| G-THEME-BLEED, G-NO-INWARD-DOCK, G-FROST-TRANSMISSION, G-SCRIM-NO-BLUR, G-FF-ONE-LAW, blob ×6, G-FIRST-PAINT, G-QUIESCENT, G-DOC-TRUTH, G-CFG-EXPRESS | each is an entry above (G-02 for theme bleed, through W-L.3's consumer matrix; G-19 for frost transmission, with a scrim arm asserting the scrim computes no backdrop; G-48 for the blob; G-31 for first paint and quiescence) or is W-C.3's doc-truth pair (G-DOC-TRUTH), which enters the roster in W-C.3; G-NO-INWARD-DOCK and G-FF-ONE-LAW are placement and one-law rules D1 and W-G.1 own, and enter the roster in those waves |
| G-COLOCATED | G-42, owed to W-D.1 |
| G-GATE-BUDGET, G-MUTATION-BITE | replaced by G-46 and `scripts/bites.mjs` |
| G-RELAY, G-BATTERY-EXISTS, G-ROW-HOMED, G-PROVENANCE, G-NO-EVIDENCE-COMMIT, G-CITE-COMMITTED | not carried: each checks a process, not a product defect (L02-F12). Row homing is the ledger's (W-B.1); provenance and citations are the close checklist's (W-L.8) |
| G-BARREL-EXPLICIT, G-FEEDBACK-TINT-SEAM, G-SPRING-HONEST, layout-canon G1, G-MEASURE-LAW, G6, G-FORK-CENSUS | not carried as written: duplicates or source-spelling rows (L02 §F "Retire"); their claims are G-01, G-24, G-29 and G-49 |
