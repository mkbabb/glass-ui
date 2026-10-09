# D1-B · pass 7 · CRITIQUE

| field | value |
|---|---|
| seat | fresh adversarial critic, route D1-B, pass 7. Authored nothing in passes 2-7, the pass-6 critique included |
| model | `claude-opus-5-5`, asserted from own system identity |
| checklist | REGISTRY §P3-9 (27 items, text frozen), status §P6-9; bar §P2-6.4 … §P6-8.4; RULINGS R-1..R-10, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5, P5-R1..P5-R5, P6-R1..P6-R3 |
| battery | `critique-B/battery/`, hashed `c577f400…2da2d` at 2026-10-09T00:37:14Z, BEFORE reading `pass-7/B-kit/` or `B-proto.md` (`critique-B/BATTERY-HASH.txt`). No amendment |
| base | checkout HEAD `145138f2`, one docs-only commit past the kit commit `6154d6ec`; code diff against the route's `f05d8555` empty |
| results | `critique-B/results/RESULTS.md` indexes every raw output; tools written after the hash: `critique-B/tools/` |

## 0 · Verdict

**26 of 27 items closed by committed, replayable measurements; one re-opened: S-14.** The seal's crash exit is not
distinct: an uncaught throw raised while the gate's own modules evaluate (here a `package.json` that is not JSON, read
at import by `scripts/structure/lib/tree.mjs:17`) escapes the CLI's `try { main() }` and Node exits **1**, the RED code.
P6-R3 ruled "2 an uncaught throw"; LAW "The gate" states it; §P6-9 holds S-14 closed by "the seal's crash exit
distinct"; P6-R3's ground is "S-14's fail-loud law applies to the gate's own exit". My battery's crash plant, the one
§P6-8.4 names ("a seal crash (exit 2, not 1)"), reads 1 in this form. Under §P2-6.5 a finding that maps to a listed item
re-opens convergence, so **B's two-clean-passes count restarts at 0. Verdict: ADVANCE (26/27 = 0.963).** The cure is
small (evaluate the floor runtime inside the CLI's guard, e.g. a dynamic import under the `try`), and nothing else in
the chain needs to move.

Everything else §P6-8.4 asks for holds on this seat's own replay: one digest, rerun a no-op, 18/18, verify:package CLEAN
at the one rebound datum, cascade GREEN against an independently replayed floor base, I7 caught by B3 in every form,
`./motion-core` keyframes-free by an independent probe, the SFC split into two children judged correctly, and pass 4-6's
371 plants regressing row for row. The browser verdict needed one correction (§3.3): the route's report omits a
base-green test, which this seat ran: it passes.

## 1 · What ran

| step | result | load |
|---|---|---|
| replay, fresh HEAD worktree, the worktree's own committed kit | 117 steps, `chain final MATCH`, digest `52cca0fe…574aea` over 1582 files, equal to B-proto §0; 381.8 s | 37 → 18 |
| rerun | no-op, same digest, 0.3 s; again after every battery, 1.3 s | 17 |
| floor base (second worktree, `truncate-seq.mjs S1`) | digest `5b14c6c7…` over 1354 files; its cascade snapshot is byte-identical to the kit's committed baseline | 25 → 43 |
| gate | 18/18, exit 0; `files` 1580 with `filesScope` (the route's number: P6-G6 cured); pin 140 / 120 / 1283 / 2 | 17 |
| toolchain | both vue-tsc 0; demo build 0; verify:package CLEAN, unpackedBytes 2,920,401 = `.bundle-ratchet`, the only ratchet edit in the chain being `S70-datum.json` | 29-41 |
| vitest | 2327 passed, 3 failed, all `boot-graph/build.test.ts` before `dist-demo` existed (P5-G5); 24/24 with `seal.test.ts` after `demo:dist:build` | 37 |
| batteries | this pass's 17 + 4 extra; 371 regressions; tree probes (crash, peer, SFC2, pass 6's probes) | 15-33 |

No verdict here rests on a timing.

## 2 · Items

| item | entering | verdict | measurement |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, results, selection and both `/2` reports are in `6154d6ec`, committed before this seat launched; the replay ran that commit's bytes |
| S-02 | CLOSED | CLOSED | B8 0, B9 0; K-REEX, D-DUAL regressions caught |
| S-03 | CLOSED | CLOSED | P6-R1: no `useScrollScene*` under `src`, 0 hits in `MIGRATION.md`, `surface-pin.json`, `seal-pin.json` (one prose mention in `scroll-driven.css`). P6-R2: neither the morph nor the selection door carries an `EYEGLASS_*` name; `tabs-seam.test.ts` states `SPAN_CEILING 1.6`, `SWELL_CEILING 1.22`, `ANNOTATION_DELAY_MS 100`. Datum rebound once (S70). P6-R3 is landed in the CLI wrapper but not for every throw; that defect is read under S-14, whose law the ruling cites |
| S-04..S-08 | CLOSED | CLOSED | gate GREEN on the replay; census and P5 command probes as in pass 6 |
| S-09 | CLOSED | CLOSED | replay MATCH, rerun no-op, digest unchanged after every battery; GATE-PURE PASS |
| S-10 | CLOSED | CLOSED | §3.2 |
| S-11 | CLOSED | CLOSED | vitest as above |
| S-12 | CLOSED | CLOSED | §3.3: π and Playwright executed, the run committed and its selection re-derived byte for byte |
| S-13 | CLOSED | CLOSED | not re-run; nothing in pass 7 touches G |
| **S-14** | CLOSED | **OPEN (re-opened)** | §3.1 |
| B-01 | CLOSED | CLOSED | 18/18 GREEN, B2 0; I7 caught (§3.4) |
| B-02..B-06 | CLOSED | CLOSED | pass-4 regressions (SELF, T-OUT, T-WRONG, X-SCR) caught; B13 0 |
| B-07 | CLOSED | CLOSED | PH6 10/10, PHT6 6/6, PH5 15/15 by B15 |
| B-08 | CLOSED | CLOSED | REORDER-acc RED; the floor-base cascade GREEN with risks 0 |
| B-09 | CLOSED | CLOSED | G-RULE, TH-RULE caught |
| B-10 | CLOSED | CLOSED | B2 0; P6-R1 and P6-R2 on their ruled arms (S-03 row); PW6/PW6x caught, legal unit specs CLEAN; the internal-door test-only name read by B11 (§3.5) |
| B-11 | CLOSED | CLOSED | `--pin`, `--no-pin` refused (now rc 2); 0 off-switch lines |
| B-12, B-13 | CLOSED | CLOSED | door plants regress as in passes 4-6 |

**Count: 27 items, 26 closed, 1 open (S-14), 1 re-opened. Convergence 26/27 = 0.963.**

## 3 · Readings

### 3.1 S-14: the gate's crash exit

`battery/crash.sh` on the replayed tree:

| case | expect | read |
|---|---|---|
| C0 clean | 0 | 0 |
| C1 a placeholder name beside GlassDock | 1 | 1 |
| C2 the opaque ledger removed | 2 | 2 (`seal: no verdict: … opaque-ledger.json`) |
| **C3 `package.json` not JSON** | **2** | **1** (`SyntaxError … at scripts/structure/lib/tree.mjs:17`, Node's default for an uncaught module-evaluation throw) |
| C4 `--root` absent | 2 | 2 |
| C5 `--json` unwritable | 2 | 2 |
| C6 an unparsable source file | recorded | 0 (the floor skips it) |
| C7 clean again | 0 | 0 |

The CLI guard (`seal.mjs`: `if (isMain) try { main(); } catch … process.exit(2)`) covers what `main()` throws, not what
its static imports throw while they evaluate. `tree.mjs` reads the root `package.json` at module scope, so any such
throw reaches Node uncaught and exits 1. The route's EXIT plants and `seal.test.ts` exercise only post-import throws (a
non-JSON overlay, a refused option), which is why they read 2. A caller that reads 1 as RED, as LAW says
`derive/land-gate.mjs` does ("accepts 0 and 1"), takes this crash for a verdict: exactly the case P6-R3 was ruled to
remove. The rest of S-14 holds: B17 catches pass 6's 70 X6 shapes, pass 5's 140 and its 7 extras (regressions).

### 3.2 S-10: cascade, the two-children split, FD-4

- **Against the floor base.** The floor base, replayed here, snapshotted byte-identically to the kit's baseline. With
  the kit's scoped listing (`authored/p6-listed-reorders.json`): GREEN, `./styles` 28 moved, `./styles.css` 10 moved,
  risks 0. With no listing: RED.
- **FP6-4: a split into two children** on a component nobody split (`Blob.vue` → `BlobShade.vue` + `BlobRim.vue`):
  no listing RED; both scopes without rules RED ("2 moved"); both scopes plus the transcribed rules GREEN; one scope
  only RED; `outline: none → inherit` in one child under the full listing RED (content changed); restored GREEN.
- **Regressions.** Pass 6's one-child Aurora split: value RED, restore GREEN (its keep arm reads FAIL from pass 6's own
  disclosed procedure defect). FD-4 arms A, G, G2, U PASS.

### 3.3 S-12: the browser verdict, re-derived from committed reports

`tools/browser-rederive.mjs` reads the committed `base.json`, `base-rekeyed.json`, `route.json` and the six reruns,
without the route's tally:

- The rekey preserves the base's (title, status) multiset; 0 unmapped.
- **Two base-green keys fail on the route, not one:**
  1. D2 (`blob-config-delta`), route `unexpected`.
  2. `tests-visual/aurora/w38-binding.spec.ts :: W38/W47 binding …`, base `expected`, **absent from the route report**.
- `tools/browser-tally.mjs` iterates route keys only, so a base-green key the route never ran drops out of both its
  numerator and its denominator. Its header says "nothing is dropped"; this one is.
- The cause is the selection, not the tree. `browser-select.mjs` on this seat's replay writes `moved.json` and
  `changed.txt` byte-identical to the kit's, and `browser.mjs --select-only` gives the same 154 specs. The chain moves
  `w38-binding.spec.ts` (S43b), but the moved spec does not select itself: it has no band. The base list
  (`base-specs.txt`) carried it anyway.
- **This seat ran it on the replayed tree:** GREEN, 4/4 (the spec plus the π floor), 49 s, load 15.5
  (`results/browser/`).
- D2: the committed reruns read base FAIL, FAIL, pass and route FAIL, pass, pass. The test does not separate the trees,
  so I grant the route's adjudication.

**Corrected verdict: 412 base-green keys (394 single, 18 duplicate-title), 0 failures attributable to the chain**, and
per-band counts re-derived for all 69 bands. Thirteen bands' own `baseGreen` differ from the re-derived count because
the route counts each duplicate-title key once per occurrence. That is a counting convention; no verdict changes.
S-12's text ("π and Playwright executed") holds, and so does the condition that holds it closed (the run is committed
and replayable): the omission is in the route's tally, and this seat's committed run cures the verdict.

### 3.4 B-01: I7

This pass's hashed plants: all 6 are CAUGHT by B3.

| plant | CAUGHT by |
|---|---|
| the aggregate (string form) | B3 |
| the aggregate (`url()` form) | B3 |
| the aggregate (`layer(components)` form) | B3 |
| the glass kernel sheet | B3, B8, B10 |
| Chip.vue `<style src>` of dock's private `core.css` | B3, B10 |
| a kernel leaf importing slider's `loupe.css` | B3, B8, B10 |

The legal in-unit control (dock sheet → dock sheet) is CLEAN. LAW §6's account of why the pass-2 row read MISSED (the
insert landed in a header comment) is consistent with the pass-2 critic's own re-plant.

### 3.5 B-10 and the plants that needed a second shape

- **Door name for a test reader only.** The hashed DT plants used chip's door, which is an entry. B11's no-reader rule
  is LAW §5's rule for internal doors, so every arm there read only the pin line, exactly as the library-reader control
  did. On an entry, a new name is a reviewed surface change: pin plus MIGRATION. The hashed eyeglass plant skipped,
  because tabs has no `Tabs.vue`.
- `tools/extra-plants.mjs`, written after the hash, re-issues the S67 shape on the selection door. A test-only reader
  in tabs' slot, a test-only reader in slider's slot, and no reader at all each gain
  `exports EYEGLASS_SPAN_MAX (no reader outside src/composables/motion/selection)`. The library-reader control does
  not gain that line. CAUGHT by B11, read at line grain; the runner's clause-grain contrast prints SAME-AS-CTL, and
  that is a battery-design limit.

### 3.6 The peer class (§P6-8.4)

- **The independent probe.** `battery/peer-closure.mjs`, written before the kit was read, reads the tree's own entry
  map and walks value edges only. `./motion-core` is keyframes-free: 38 files, the same count as the kit's "files" arm.
  That makes 19 entries keyframes-bearing and 45 free.
- **Plants against the gate.** No clause reads KF-leaf (an existing leaf gains a keyframes import) or KF-deep (the
  same, through a new sibling). KF-new and KF-existing are read only incidentally: B11 for a new name and the pin, B1,
  B4 and B9 for `useSpring`.
- **Plants against the owner.** The class's owner is the kit's probe (LAW §5). It reads KF-leaf and KF-deep RED, exit
  1. My probe reads all four KF plants as 1, each with the chain to keyframes.js.
- **Record.** Class: an entry's declared heavy-peer class over its static closure. Owner: `tools/peer-closure.mjs`, a
  kit probe, not a gate clause, and not under `npm test`. See §4 finding 2.

## 4 · Outside the checklist

None changes the score. The re-open is §3.1.

| # | finding | maps to | effect |
|---|---|---|---|
| 1 | The route's browser tally drops a base-green key the route did not run (`w38-binding`), and the graph selection does not select a spec the chain moved. Measured here and cured by this seat's run (GREEN) | S-12's bar (§P6-8.4 "0 new failures … replayed from committed reports"); no edict clause | the tally should iterate base-green keys and count a missing one as not held; a moved spec should select itself |
| 2 | The kit's peer probe reads GREEN, exit 0, on an unbuilt tree. Its JUDGED dist arm reports `{"missing": …/dist/motion-core.js}` and passes | edict "no masking fallbacks" (the list carries it as S-14, whose text names the gate, not the kit probe) | the dist arm should throw on a missing build. The peer class has no gate clause and no `npm test` arm, so nothing re-runs it at the landing |
| 3 | A test-only name on an ENTRY door reads only the pin line; B11's test-reader rule is internal-door only | P6-R2 (morph is internal), P4-R2; edict "encapsulated" | none: an entry name is a reviewed surface change (pin + MIGRATION) |
| 4 | `scroll-driven.css:36` still calls the `useScrollScene` spine "one in-repo specimen", which now lives in the demo | P6-R1 (prose only) | a citation to follow the move |
| 5 | Pass 6's FALSE+ classes persist unchanged (B0 computed-path controls ×9; VIS-in-L, PH6-CTL-test as harness subjects) | as pass 6 recorded | none |
| 6 | `npx vitest run` fails 3 boot-graph tests until `demo:dist:build` has run | P5-G5 (outside D1) | none |

## 5 · Battery record

The battery was hashed at 00:37:14Z, before the kit was read, with no amendment. Its own defects, both disclosed with
re-issues outside the hash:

- the DT plants used an entry door (§3.5);
- the contrast verdict works at clause grain, not line grain.

`tree-probes.sh`'s CASCADE-RESTORE "FAIL" comes from this seat's `CASCADE_VERIFY` passing the route listing to a
self-snapshot verify. Re-run without a listing, it is GREEN, rc 0 (`logs/tp/restore-*.log`).

**Written after the hash, outside it:** `tools/browser-rederive.mjs`, `tools/extra-plants.mjs` and `tools/kf-peer.mjs`.

| battery | result |
|---|---|
| this pass's plants (17) | 6 CAUGHT (I7), 1 CLEAN, 3 RECORDED, 2 MISSED-RECORD (KF, read by the probe instead), 4 SAME-AS-CTL (entry door), 1 SKIP |
| extra plants (4) | 3 CAUGHT at line grain by B11, 1 control |
| KF through probes | mine 4/4 RED; the kit's 2/2 RED |
| crash (8) | 6 PASS, 1 FAIL (C3), 1 INFO |
| SFC2 (6 arms) | 6/6 |
| regressions (371) | CAUGHT 326, CLEAN 32, FALSE+ 11, OTHER 5, UNNAMED 6, SKIP 1: pass 6's tallies exactly |

## 6 · Fence record

- **Checkout writes.** Every write in the checkout is under `docs/tranches/BL/design/structure/pass-7/critique-B/` or is
  this file. Report, battery and tools were written with the Write tool; command logs were written by shell redirection
  into `critique-B/results/`.
- **Moves, plants, builds and browser runs.** These ran only in `.claude/worktrees/bl/D1/p7/crit-B/{wt,base}`.
  - Every plant was restored byte for byte, and the digest was unchanged afterwards.
  - In `wt`, `tests-visual/.cache/` was created for `browser.mjs --select-only`.
  - In `base`, the kit's `truncate-seq.mjs` edited that worktree's copy of `SEQUENCE.json`.
- **Cleanup.** Both worktrees were removed with `git worktree remove --force`, and the empty `crit-B/` was removed with
  `rmdir`. The checkout has no `tests-visual/node_modules`, so none was linked.
- **Untouched.** No git write other than worktree add and remove. No `~/.claude` read. No sibling repo touched.
