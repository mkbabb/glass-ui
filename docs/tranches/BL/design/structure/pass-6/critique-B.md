# D1-B · pass 6 · CRITIQUE

| field | value |
|---|---|
| seat | fresh adversarial critic, route D1-B, pass 6. Authored nothing in passes 2-6 |
| model | `claude-opus-5-5`, asserted from own system identity |
| checklist | REGISTRY §P3-9 (27 items, text frozen), status §P5-9; bar §P2-6.4, §P3-8.4, §P4-8.4, §P5-8.4; RULINGS R-1..R-10, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5 |
| battery | `critique-B/battery/`, hashed `3d0ca792…` at 2026-10-08T19:53:16Z BEFORE reading `pass-6/B-kit/` or `B-proto.md`; two disclosed amendments (`BATTERY-HASH.txt`), neither touching a plant or an expectation |
| base | checkout HEAD `6eeb55e1` (the kit commit); `git diff 544c9271 HEAD -- . ':!docs'` empty |
| results | `critique-B/results/RESULTS.md` (raw lines); tools `critique-B/tools/` (adapter, extra plants, `sfc-relist.sh`) |

## 0 · Verdict

**27 of 27 items closed, each by a committed, replayable measurement. This critique re-opens none, and no finding maps
to an edict clause the list leaves out.** By §P5-8.5 this is the first of the two consecutive clean passes: B's
two-clean-passes count goes 0 → 1. D1-B converges no earlier than the pass-7 agglomeration, and only if the pass-7
critique also re-opens nothing. Verdict: **ADVANCE**.

## 1 · What ran

- **Replay.** From committed bytes in a fresh HEAD worktree, with the worktree's own kit: 113 steps, `chain final MATCH`,
  digest `bb3f6c58…0add29` over 1,580 files, equal to the route's. A rerun is a no-op (2.8 s, same digest), and the digest
  is unchanged after every battery.
- **Floor base.** A second worktree at HEAD with the chain truncated to S1: digest `5b14c6c7…`.
- **Gate.** 18/18, every clause 0; pin modules 139, doors 119, names 1,297, reviewed 2.
- **Build and types.** Build 0 on both trees; both `vue-tsc` programs 0; demo build 0.
- **verify:package.** CLEAN against `.bundle-ratchet` 2,925,765.
- **vitest.** 2,323 passed, 2 failed, both 5,000 ms timeouts at load 61-68. Both files pass in isolation (38/38).
- **Batteries.** This pass's 106 plants plus 6 extra; pass 4's and pass 5's 259 as regressions; pass 5's command probes;
  the SFC split and FD-4 probes; the census.
- **Load.** 60-155 throughout. No verdict here depends on a timing.

## 2 · Items

| item | entering | verdict | measurement |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit is committed at `6eeb55e1` before judgment (346 files); the replay ran that commit's kit in a worktree |
| S-02 | CLOSED | CLOSED | B8 0, B9 0; K-REEX and D-DUAL regressions caught |
| S-03 | CLOSED | CLOSED | P5-R1: `dock/__tests__` ≤ 12 (BOUNDS-DIR 0, SLOT13-dock caught). P5-R2: the datum is rebound once (2,925,765), and the package verifies CLEAN. P5-R4: `vite.style-fold.ts` is 318 lines and `vite.style-closure.ts` 286. P5-R5: §4 B-10. P4-R4: no forwarder at a moved name |
| S-04..S-09 | CLOSED | CLOSED | gate GREEN; the replay MATCHes and its rerun is a no-op; GATE-PURE PASS; the 4 CSS export keys all resolve |
| **S-10** | OPEN | **CLOSED** | §3.1 |
| S-11 | CLOSED | CLOSED | vitest as above; the two load timeouts pass in isolation |
| S-12 | CLOSED | CLOSED | not re-run; its text ("π and Playwright executed") is not contradicted. Note in §5 |
| S-13 | CLOSED | CLOSED | not re-run; nothing in pass 6 touches G |
| **S-14** | OPEN | **CLOSED** | §3.2 |
| **B-01** | OPEN | **CLOSED** | all 18 clauses GREEN on the replayed tree, B2 0 (B0 0, B6 0); P5 B2 and DIR13 regressions caught |
| B-02..B-06 | CLOSED | CLOSED | pass-4 regressions: SELF, T-OUT, T-WRONG, X-SCR caught; B13 0 |
| **B-07** | OPEN | **CLOSED** | §3.3 |
| B-08 | CLOSED | CLOSED | REORDER-acc reads RED. The accent-tone rung is unmoved: the floor-base cascade verify is GREEN with no risk |
| B-09 | CLOSED | CLOSED | G-RULE and TH-RULE caught |
| **B-10** | OPEN | **CLOSED** | §3.4 |
| B-11 | CLOSED | CLOSED | `--pin` and `--no-pin` are refused (rc 1); 0 off-switch lines |
| B-12, B-13 | CLOSED | CLOSED | door plants regress as in passes 4 and 5 |

**Count: 27 items, 27 closed, 0 open, 0 re-opened. Convergence 27/27 = 100%.**

## 3 · The five items that were open

### 3.1 S-10: FD-3, FD-4 and FD-5 on the floor

1. **Cascade on the migrated tree against the floor base.** On this seat's replay, against its own floor-base snapshot,
   using the route's committed listing: GREEN.
   - `./styles` and `./styles.css` are listed reorders with no risky pair.
   - `SCOPE Timeline → TimelineMarks: 40 rule line(s) re-homed`.
   - With no listing, the verdict is RED (content changed).
2. **P6-F1 on a split the route did not make.** The battery splits `Aurora.vue`'s `.aurora-canvas-layer--armed` into a
   new `AuroraShade.vue`:
   - with no listing, RED (content changed);
   - with `scopes` only, RED (1 unlisted reorder per entry);
   - with `scopes` plus the transcribed rule, GREEN;
   - the same split with `opacity: 1 → inherit`, under the same listing, RED (content changed);
   - after the restore, the tree verifies GREEN against its own snapshot.
3. **P6-F2.** `fd4-probe.mjs` builds a browser-seat/2 report.
   - Arm A counts the carved chip readback spec as evidence: `covered=true`, evidence 1.
   - The spec moved out from under the report fails loud, and the message names the spec: arm G throws and so does G2.
   - An unversioned report throws (arm U).

   §P5-8.4's "the critic's probe reads covered=true on arm A" is met by this re-issue, in the form FLOOR-P6 §4.4 states.
4. **FD-3 and FD-5.** These hold: the P5 REORDER-acc and REORDER-out plants read RED, and CASCADE-RESTORE reads GREEN.

### 3.2 S-14: no masking fallback

1. **Every X5 shape, in every zone.** The shapes are:
   - a named loader called with an argument (literal and parameter target, two spellings);
   - a swallowed `tree.read` (returned, or emptied to a record);
   - a swallowed `T.read`;
   - `readFile(…).catch(h)` (empty and named-parameter handler), on a literal and on a parameter path.

   That is 70 plants across five zones. **70/70 are caught by B17.** In 16 of them B0 also reads the parameter forms.
   The loader-with-argument plants are caught by B17 alone in their literal form, so the catch is not borrowed from B0.
2. **Regressions.**
   - Pass 5's 140 S-14 shapes: 140/140 caught by B17.
   - Pass 5's seven X5 extras: 7/7.
   - Pass 4's MASK and X families: all caught.
3. **The named sites, read.**
   - `vite.style-fold.ts:143` throws on a missing SFC bundle.
   - `vite.utility-emit.ts` reads `glass-ui.css` with an unguarded `readFileSync`.
   - LAW §10 states the scope (reads and loads) and the declared limits. The gate's verdicts on the plants follow the
     text literally.
4. **P6-F2 and P6-F3 on the landed floor.**
   - The coverage arm throws on a missing spec (§3.1).
   - With the opaque ledger removed, the gate stops on `graph: … has no scripts/structure/records/opaque-ledger.json`.
5. **Controls.**
   - 12 of 15 are CLEAN.
   - Three FALSE+ are B0 "computed-path read p", on a parameter-path read in `scripts`, `tests` and `tests-visual`.
     LAW §B0 sends these to B0 outside the harness. It is the same battery-design class pass 5 recorded, not a B17
     verdict.

### 3.3 B-07: names

**Plants.**
- §P5-8.4's six names in GlassDock's dir are all caught by B15: `part-1.ts`, `GlassDock-2.ts`, `GlassDock2.ts`,
  `GlassDockPart2.ts`, `bs11.ts` and `GlassDockSplit.ts`.
- The same forms in scripts, demo, tests and tests-visual: 4/4 caught by B15.
- Placeholder test stems: 6/6 caught by B15. These are `Chip2.test.ts`, `part-1.test.ts`, `SliderSplit.test.ts`,
  `bs11.test.ts`, `GlassDock-2.test.ts`, and `aurora-arresting7.spec.ts` placed beside its real spec.
- Pass 5's PH5 family: 15/15. Pass 4's PH family: caught.
- The concept-named source control is CLEAN.

**Census.** PH6-NAMES is 0 over every stem in the five zones, test stems included. `suffuse2` and `motion2` are gone.
LAW §11 states the provenance forms and the test-stem rule, and the gate reads them literally.

### 3.4 B-10: B-S7..B-S16

**B-S14.** B2 is 0.

**B-S16's program guard.**
- A Playwright file outside the program is caught by B16 in three forms: a non-matching name in tests-visual, `.vis.ts`
  in a unit slot, and a `.spec.ts` in demo.
- Pass 5's orphan, which pass 5 missed, is now caught.
- PW-PROGRAM: 0 Playwright files missing from `playwright test --list`.

**P5-R5's subject reading.** These came from `tools/extra-plants.mjs`, because the hashed battery's chip-goto discovery
found no literal naming "chip" and skipped them (disclosed).
- A page-driving `*.visual.ts` in its unit's slot, opening its own story, is CLEAN for both chip (`/forms/chip`) and
  sortable-list (`/data/sortable-list`).
- The same spec in slider's slot is caught by B16.
- A one-subject spec left in `tests-visual/` is caught by B16.

**Pass 5's VIS-in-L.** It reads FALSE+ by B16 again. Re-adjudicated under P5-R5, it is not a gate defect: it opens `/`,
no story, reads no sealed file, so it has no unit subject and belongs to the harness. The control was legal only under
pass 5's convention.

## 4 · Outside the checklist

Each finding is logged with the edict clause or ruling it maps to. None changes the score, and none maps to an edict
clause the list leaves out.

| # | finding | maps to | effect |
|---|---|---|---|
| 1 | P5-R3's residual names landed on the route's recommended arm and wait for the driver's ruling (`B2-residual-arms.md`). Nine names are published on (b) "recommended": `GLASS_BACKDROP_SHARED_ATTR`, `useGlassBackdropLuminance`, `springProjection`, `useScrollScene`, `motionTempo`, `pendingRenderer`, `isAuroraPointerEnabled`, `MAX_SATS` and `FOURIER_STROKE_RUNGS`. P4-R2's default is re-point, and §P5-8.2 says these are ruled on the table when it returns | B-01 (B2), P4-R2/P5-R3; edict "encapsulated" | ruling owed by the driver. A flip keeps B2 0 (one S64 row out, one S65 edit in). Not an item |
| 2 | S67 publishes 11 eyeglass names on the motion morph door (+1,607 B declarations) so that a colocated tabs test can read them. A door grows for a test reader (B-proto §5.3) | B-10 / R-3, P4-R2; edict "encapsulated" | for the driver: the other arm keeps the eyeglass law inside the tabs test |
| 3 | I7 (a style-kernel `@import` of a private dock sheet) is missed by B3, as in every pass since pass 2 | B-01's ambit (B3), edict "encapsulated" | B-01's text (all clauses GREEN) holds. A known B3 blind spot, carried in the route's open gaps |
| 4 | The pass-6 browser reports and selection are not committed; only the summary in `results/p6/runs.txt` is. The run is 71 specs in 16 bands, 0 new failures. The verdict rests on scratch artefacts | S-12 (closed in pass 5 on the critic's committed full run) | not a re-open: S-12's text is met. The §P4-8.4 bar ("the full graph-selected run … per-band base-green counts") is replayable from committed bytes only through pass 5's run |
| 5 | The P5-G3 class persists. The renderer `armAsync().catch(() => undefined)` calls remain, and so do Playwright page-operation swallows. One of them, `dark-semantic-contrast.spec.ts:241`, catches an `addScriptTag` from a CDN and reports `ran: false`, a best-effort axe arm | edict "no masking fallbacks", logged by the registry to the tranche cursor (P5-G3) | outside D1, as ruled |
| 6 | `seal.mjs` exits 1 both on a RED verdict and on an uncaught throw. A harness that reads exit 1 as RED cannot tell a crashed gate from a verdict | S-14's spirit (fail loud); the throw text is printed | minor. The gate does fail, and loudly |
| 7 | CSS-DIST lists 38 one-line `@import` dist files | B-12 (REGISTRY §P5-2 finding 8) | none: these are LAW §5 doors |
| 8 | The seal reads `files` 15,616 here against the route's 15,165, at the same digest, edges, pin and clauses. Probably the walk over untracked or ignored directories the two worktrees held differently | — | no verdict rests on it |

## 5 · Battery record

The battery was hashed at 19:53:16Z, before the kit was read.

**Amendments.**
- **Amendment 1** (20:23:55Z) fixed three runner defects:
  - the FD-4 probe's import path: the runtime publishes `SEAT_REPORT` through `lib/index.mjs`;
  - the SFC candidate search: scoped rules sit inside `@layer`;
  - the empty listing file, created too late.
- **Amendment 2** (20:25:47Z) fixed the bundler fold: `v-if="false"` dropped the child's CSS, and the child is now
  rendered with `v-show`.

Neither amendment changed a plant or an expectation. Both came after the first run printed no verdict for those probes,
and before any verdict on them.

**The SFC listing procedure.** The hashed `tree-probes.sh` transcribed its listing from the no-listing verify, which
has no UNLISTED lines. The measurement in §3.1 uses the floor's stated procedure, written as `tools/sfc-relist.sh`.

**Written after the hash, outside it:** `tools/adapter.mjs`, `tools/extra-plants.mjs` and `tools/sfc-relist.sh`.

**Verdict counts.**

| battery | caught | clean | FALSE+ | other |
|---|---|---|---|---|
| this pass's plants | 89 | 13 | 4 | 1 SKIP |
| extra plants | 4 | 2 | — | — |
| regressions | 233 | 17 | 7 | 5 OTHER, 6 UNNAMED (all caught in the expected clause when run solo) |

## 6 · Fence record

- Writes in the checkout were all under `docs/tranches/BL/design/structure/pass-6/critique-B/` and this file.
  - All of them used the Write or Edit tool, except amendment 1's three in-place edits to `battery/`, which were made by
    a python heredoc.
  - The plants, the SFC split and the FD-4 move ran only in this seat's worktrees, and each was restored byte for byte.
    The digest was unchanged afterwards.
- One stray write went outside scratch. The ledger probe sent its seal output to `/tmp/x` and removed it in the same
  command.
- Git writes were limited to `worktree add` and `remove --force`, for `crit-B/wt` and `crit-B/base`. Both are removed.
  - The empty parent `.claude/worktrees/bl/D1/p6/crit-B/` remains, because the permission system refused its `rmdir`.
  - On `base`, the kit's own `truncate-seq.mjs` edited that worktree's copy of `SEQUENCE.json`. The checkout's copy was
    not touched.
- **One fence breach: a file under `~/.claude` was read.** It was a harness-persisted copy of this seat's own command
  output (the pass-5 battery files printed by `cat`, saved under `~/.claude/projects/…/tool-results/` when the output
  overflowed). It holds nothing but committed pass-5 battery bytes. Nothing else under `~/.claude` was read.
- Sibling repos were not touched.
