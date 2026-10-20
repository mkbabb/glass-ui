# D3 · pass 12 · MINOR-SPLIT v10: the minor v9 + its two comment deltas, byte-identical in paint

| field | value |
|---|---|
| seat | D3 pass 12, the minor split v10 (`REGISTRY.md` P11-6.3 step 4). A build, not a route: the tree 10.2.0's veil recut (W-0.1) and W-0.11's tokens would ship from. It builds `minor-split-v10.patch` = `pass-11/minor-split-v9.patch` + `pass-11/MS9-seat-proposed.diff` + `pass-11/crit-minor-proposed.diff`. It proves the specimen dist and the dist-demo raw-identical to the minor v9's in one session, then runs H7-3 with `deletes-minor.json`, DEL with H9-H11, the list under `pass-11/crit-ms9-rulings.json` with its plants, the static checks and the toolchain. No browser of its own. **R-32's dark arm is not in the minor; it lands in W-H.2** |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **HEAD of master at launch, `ae6c7688e`** (INBOUND O-103b, docs only). `git diff --stat 1da7eb17b HEAD -- src demo tests package.json scripts tests-visual vite.targets.ts .bundle-ratchet .published-roster DESIGN.md docs/canon` prints nothing (`MS10-records/setup.log`), so every number below is the published 10.1.0 source plus the named patch. **`release/10.1.1` is NOT merged during pass 12** (P11-5: the merge waits until this pass's floor seat banks) |
| rulings read | INBOUND re-checked at start and at close. **O-102b, O-103, O-103a** as the driver states. **O-103b (new since the driver text, `ae6c7688e`, delegate `value-js-ed`):** F-1 accepted on R-32, row 23 closes on R-32 with frames 2-4, and the Playwright WebKit dark-veil legs are engine-fact reports ("WebKit headless paints no backdrop-filter; raw = veiled 4/4") with Chromium as the paint gate for that arm. It replaces the driver's "row 23 open on O-103a". It moves no minor byte and no minor gate: the arm it accepts is the floor's R-32, which the minor does not carry. FORMATION-PROGRESS's last line (14:50) records the same ruling. No guarded refusal fired |
| driver | `MS10-run.sh` (this directory), phases `setup compose trees static read same toolchain ratchet teardown`, each launched as `~/.claude/guard/guarded [--light] --timeout N -- bash MS10-run.sh <phase>`. Records are in `MS10-records/`, and `phases.log` carries each phase's time and load average |
| engines | No browser of this seat's own. The only browser was the headless shell that vitest's slider unit launches inside `toolchain`, run heavy, never `--light`. No WebKit lock was taken: no specimen byte moved (§2), so a capture would measure nothing (R-31). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)**; O-103b retires real-Safari measurement under the machine law |
| fences | No tracked source edited and no git write in the checkout. The worktree `.claude/worktrees/bl/D3/p12/minor10/wt` was cut at HEAD with node_modules symlinked. Every patch swap happened there and was checked with `cmp`. `D3_OUT`, the vite cacheDirs (`.cache-m10/*`) and the library `dist` were all inside it. `.bundle-ratchet` was rebound in the worktree for one verifier run and then restored. The worktree was removed with `--force` and pruned, and `…/D3/p12/` is gone (`teardown.log`). The checkout's only writes are `MS10-run.sh`, `minor-split-v10.patch`, `MS10-records/` and this file. Nothing ran in a sibling repo |

Short citations: `Reg` (`REGISTRY.md`, the pass-11 part P11-0..P11-6), `MS9` (`pass-11/MINOR-SPLIT-v9.md`), `OWED` (`pass-12/OWED.md`), `Crit` (`pass-11/D3-critique.md`).

---

## 0 · Verdicts

- **The minor v10 is the two deltas and nothing else.** `minor-split-v10.patch` has 61 files, +716/−539, 175,419 B, sha1 **`2aa0e5c9`**. It equals `pass-12/minor-split-v9c.patch` + `crit-minor-proposed.diff` byte for byte (`cmp` exit 0), and its path list equals the minor v9's.
- **Byte identity holds raw in one session.** The minor v9, the minor v10 and the minor v9 again were built under one label. The specimen dist (3 files) and the dist-demo (346 files) are identical (`diff -rq` exit 0, 0 lines). The specimen CSS is **398,432 B, sha256 `e11613c3eeb45cab`**, the banked hash digit for digit. Every paint verdict of the minor v9 carries.
- **H7-3 PASS 42.** DEL with H9-H11 over the v10 patch is **at 0 hits, PASS 54**, and an absent root exits 2.
- **The list under `crit-ms9-rulings.json`: PASS 368** (347 true, 21 reported), 0 unread, 0 stale. **No entry needed updating.** The only bytes that changed are `grasp.css:136-137`, which print no frozen word, and `glass-subtlety.test.ts:193-194`, which leave the list. The one printed line whose sentence changed, `grasp.css:135`, already carries a `why` that reads the minor v10's sentence (§3.2).
- **Plants:** `crit-ms9s-reading.json` gives **FAIL 1 at `grasp.css:135`** on the minor v10, and **FAIL 2** on the minor v9 (`:135` and `glass-subtlety.test.ts:193`). `crit-ms9-rulings.json` on the minor v9 gives FAIL 1 at `glass-subtlety.test.ts:193` (§3.1).
- **Both rewritten sentences read true** on the minor v10 under R-26, R-33 and R-36 (§3.3).
- **Toolchain green:** `vue-tsc` exit 0 on both projects, library build and dist-demo exit 0, and vitest **239/239 files, 2321 passed**, 10 expected fail, 1 skipped (2332). The minor v9 had 2321. No red, so nothing was re-run.
- **G5:** roster PRESENT 289 = 289, `terminal CLEAN` with the datum rebound. The ratchet owes **+2,333 B** (2,921,390 > 2,919,057), the minor v9's figure to the byte. The deltas add 0 B.
- **Shippable in 10.2.0? Not yet**, and it is closer. Every W-0.1 G1-G7 and W-0.11 G1-G6 verdict carries green, and the minor's own prose now has no false printed line on the critic's reading. 10.2.0 still waits on the entry gate (two consecutive clean passes), on D2 converging, on the `release/10.1.1` merge and rebase, and on the landing items (§5).

---

## 1 · The build (`compose.log`, 14:45:44, load 24.57)

| part | sha1 | files | +/− | applied |
|---|---|---:|---|---|
| `pass-11/minor-split-v9.patch` | `8cf39ccb` | 61 | +714/−537 | at HEAD, `--check` exit 0 |
| `pass-11/MS9-seat-proposed.diff` | `4ebf3884` | 1 | +2/−2 | on the minor v9, `--check` exit 0 |
| `pass-11/crit-minor-proposed.diff` | `1b1c1d54` | 1 | +2/−2 | on the minor v9 + MS9-seat, `--check` exit 0 |
| **`pass-12/minor-split-v10.patch`** | **`2aa0e5c9`** | 61 | +716/−539 | cut as `git diff HEAD --binary`; `git apply --check` at HEAD exit 0 |

The patch-of-patches (`diff minor-split-v9.patch minor-split-v10.patch`, the `+`/`−` lines only) holds exactly the four comment lines of the two deltas:

| file:line (minor v10) | minor v9 | minor v10 |
|---|---|---|
| `src/styles/glass/grasp.css:136` | "strength by the rung, so `rung ÷ rest` runs the same 1 → 0.6 there and "sheds 40%" | "strength by the rung, so `rung ÷ rest` runs 1 → 0.6 there and the fill sheds 40%" |
| `:137` | "of its ink" is a paint fact on BOTH shipped consumers rather than prose on one. */" | "of its strength in paint; the dock keeps the bound in light and sheds 40% in dark. */" |
| `tests/styles/glass-subtlety.test.ts:193` | "near-black ink over paper (O-62). Dark: the sign law holds, the rung darkens" | "near-black ink over paper (O-62). Dark: the ink stays near-black (L 0.17 < 0.5," |
| `:194` | "what is behind it." | "asserted below), never the cream foreground." |

The tree copies differ in 8 lines across those two files only (`trees.log`). Line counts are kept: `grasp.css` 221 → 221 and `glass-subtlety.test.ts` 1,108 → 1,108. Both changes are inside a CSS block comment or a test comment. No `.vue` file moves, and no library `dist/` file carries a rewritten sentence (`ratchet.log`).

---

## 2 · Byte identity (R-22's raw branch, R-27's tie; `same.log`, 14:55:29-14:55:40, load 21.12 → 21.60)

Each build ran through `harness/build.mjs --demo` under the label `same` in the one worktree, and each output was moved aside before the next. The swap order was the minor v9, the minor v10, the minor v9 again (determinism), then HEAD as the bite.

| output | minor v9 vs minor v10 | minor v9 rebuilt | R-27's tie |
|---|---|---|---|
| **specimen dist** (3 files) | **`diff -rq` exit 0, 0 lines.** CSS `index-Bd1ws62N.css` **398,432 B, sha256 `e11613c3eeb45cab2ebe3e88245ba9a55a8c41b640f48d9a45df116bb3638b0a`** in all three builds | exit 0 | equals the pass-11 critic's banked minor v9 CSS and OWED's minor v9c CSS, digit for digit (`diff` exit 0) |
| **dist-demo** (346 files) | **`diff -rq` exit 0, 0 lines** | exit 0 | the sha256 list equals the pass-11 banked minor v9 list and OWED's minor v9c list (`diff` exit 0 both) |
| **bite**: HEAD | dist `diff -rq` exit 1 (5 lines), demo exit 1 (229 lines); HEAD's CSS 394,891 B `b09b9e73a61b75b1` | — | MS9's and OWED's bite figures exactly |

The specimen JS embeds the worktree path (OWED §1.2), so only the CSS hash and the dist-demo list are tied to the banks. Inside this session the whole dist is equal. **Every paint verdict of the minor v9 carries to the minor v10**, and through it every verdict back to the minor v4 (P8-2.2's thin-build rule). No WebKit cell is owed.

---

## 3 · H7-3, DEL, the list (`static.log` 14:46:08-14:46:17, load 27.81 → 27.07; `keys.log`; `read.log`)

### 3.1 · The runs

| check | result | record |
|---|---|---|
| **H7-3**, `deletes-minor.json` (42 names, 3 sites), H7's scope (`src/`, `demo/`), no patch, the minor v10 | **PASS (42 gated rows)**; the minor v9 control PASS 42 | `del-H7-minor10.log` |
| **DEL with H9-H11**, `--patch minor-split-v10.patch` | **PASS (54 gated rows)**: 1,095 text files, `names=42 hits=0 files=0 changed=8 families=1 sites=3 arm-true=1 rung=4 reported=4` | `del-minor10.log` |
| DEL, the minor v10 under the v9 patch / the minor v9 under the v10 patch | PASS 54 / PASS 54 | `del-minor10-v9patch.log`, `del-minor9-v10patch.log` |
| DEL, absent root | exit 2, `FAIL (nothing read: no text file in scope)` | `del-absent.log` |
| the list, the minor v10, no rulings | `LIST (368 lines to read)`; the minor v9 `LIST (369)`. The printed line keys differ by exactly `tests/styles/glass-subtlety.test.ts:193` | `sweep-minor10-list.log`, `keys.log` |
| **the minor v10 under `crit-ms9-rulings.json`** (sha1 `368b294e`, unchanged) | **PASS (368 lines: 347 ruled true, 21 reported)**, with the v10 patch and with the v9 patch alike | `sweep-minor10-crit.log`, `-crit-v9patch.log` |
| **plant: the minor v10 under `crit-ms9s-reading.json`** (`537512be`) | **FAIL (1 unread, 0 stale of 368)**: `✗ unread src/styles/glass/grasp.css:135 [word "tint"]` | `sweep-minor10-plant.log` |
| plant: the minor v9 under `crit-ms9s-reading.json` | FAIL (2 unread, 0 stale of 369): `grasp.css:135` and `glass-subtlety.test.ts:193 [word "darken"]` | `sweep-minor9-plant.log` |
| plant: the minor v9 under `crit-ms9-rulings.json` | FAIL (1 unread, 0 stale of 369): `glass-subtlety.test.ts:193` (the MS9-seat delta's own plant) | `sweep-minor9-crit.log` |
| SWEEP, absent root | exit 2 | `sweep-absent.log` |

**On the driver's expected plant.** The driver expects "plant FAIL 1 at `grasp.css:135` on the minor v9". On the minor v9 the `:135` plant reads FAIL 2, because the minor v9 also still prints `glass-subtlety.test.ts:193`, which `crit-ms9s-reading.json` (written for v9s) leaves out. The FAIL 1 at `:135` is read on the minor v10 (above) and on OWED's minor v9c. Both plants bite, and each red lands on the line it plants.

### 3.2 · "Updated only where bytes changed": no update was needed

- The changed bytes are `grasp.css:136-137` and `glass-subtlety.test.ts:193-194`.
- `grasp.css:136-137` carry no frozen word and are not on the list in either tree.
- `glass-subtlety.test.ts:193-194` leave the list on the minor v10 (369 → 368).
- The printed sentence-mate `grasp.css:135` ("tinted MIX and no veil … scales its tint") keeps its bytes. Its entry in `crit-ms9-rulings.json` already reads "the sentence :132-137 under crit-minor-proposed.diff … held, the dock keeps the bound in light and sheds 40 % in dark". That is the minor v10's sentence, so the ruling is true as written.
- **So `crit-ms9-rulings.json` stands byte for byte (sha1 `368b294e`) and no new rulings file is written** (P-3).

**The limit of the plant, carried (OWED §2.1, MS9 §4.1).** The list keys on the line and its `says` text, so `crit-ms9-rulings.json` passes the minor v9c (old sentence) and the minor v10 (new sentence) alike at `:135`. The instrument cannot tell which sentence the ruling read; the reader can. §3.3 is that reading.

**H11-2's print** (`neighbourhood-minor{9,10}.log`): 1,363 lines in 59 files in both trees. The only difference is that `grasp.css:133-137` now print as "sentence of :137", and `:137` prints as "carries "bound"" (`relation` 361 → 362, `neighbourhood-minor9-minor10.diff`). The new sentence is now inside R-30's reading scope. It was read there.

### 3.3 · The two sentences, read on the minor v10 (R-26, R-33, R-36; `read.log`)

**`grasp.css:132-137`: true.**
- *"the fill sheds 40% of its strength in paint"*: `liquid-fill.css:59-62` declares `--glass-veil-rest: 1`, `--glass-veil-rung: var(--glass-veil-rest)` and `--glass-veil-floor: 0`. The held rung is `max(rest × 0.6, floor)` = 0.6 (`grasp.css:139`), and `:73` scales `--liquid-fill-strength` (88 %) by the rung. So the held fill paints 60 % of its rest strength.
- *"the dock keeps the bound in light"*: the dock composes through `@utility glass-plate` (`dock.css:117-124`), its tier lerps `--glass-veil-wash` and `--glass-veil-dock` (`shell.css:147, :149`), and both are `--glass-veil-base` = `--glass-bound` in light (`tokens/glass.css:51, :54, :143`). The light floor is the bound (`:154`).
  - Held, the rung is max(0.6 × rest, b). The clamp lifts rest to at most b + 2·step = (1 + 2b)/3 (`veil.css:70-85`). So 0.6 × rest ≤ b whenever b ≥ 1/3.
  - The registry's measured light bound is 0.845-0.894 across passes (REGISTRY, e.g. "bound α 0.891"), so the held light dock paints exactly the bound over any ground.
  - Over a measured-bright ground, where rest has earned above b, it sheds from rest down to the bound. "Keeps the bound" then reads as "holds at the bound", not as "keeps its rest α". That is R-33's wording ("a held plate never sheds below the bound"), so I rule it true.
- *"and sheds 40% in dark"*: the dark floor is 0 (`dark-arm.css:294`), so held = 0.6 × rest for every dark rest.
- **R-36 (every consumer named):** the grasp register has exactly two consumers in `src/` and `demo/`: `Slider.vue:348-351` (the fill) and `GlassDock.vue:380-383` with `dock.css` (the dock). `grep data-grasp|glass-grasp-carrier` lists only those besides `grasp.css`. The sentence names both. The token readers are `liquid-fill.css:62, :73`, `grasp.css:139`, `veil.css:89`, `dark-arm.css:294` and `tokens/glass.css:154`. Every one is covered above.

**`glass-subtlety.test.ts:192-194`: true.**
- The dark `--glass-veil-ink` is the literal `oklch(0.17 0.03 70)` (`dark-arm.css:275`), not `var(--foreground)`.
- The test asserts its L < 0.5 at `:197`.
- The sentence now claims only what the test asserts, and no longer claims a dark-darkening sign that the deepened page (L 0.146 < 0.17) falsifies (MS9 §4.3).
- The test title at `:191` ("DIMS in dark") carries no frozen word. It stays a landing docs item (MS9 §4.5).

---

## 4 · Static and toolchain

| check | result | when, load (1 min) | record |
|---|---|---|---|
| LAW | PASS (94 gated rows); the count is root-dependent (OWED §2.1) and grew with this pass's driver files | 14:46, 27 | `law.log` |
| census | `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0; `git archive v10.1.0 src/styles`: `stacked=2 halo=2 blur=5 open=9`, exit 1 (bites) | 14:46, 27 | `census-*.log` |
| HOV | PASS (58) | 14:46 | `HOV-minor10.log` |
| LIT | REPORTED `halo=5 near=1 stacked=10 chain=3 open=19 frames-halo=0/0`, the 19 inherited | 14:46 | `LIT-minor10.log` |
| ladder | `diff radii-minor10.txt pass-11/MS9-records/radii-minor9.txt` exit 0, prints nothing | 14:46 | `radii-minor10.txt` |
| FL-14 static | 1 `isolation: isolate` line in `@utility glass-plate` | 14:46 | `static.log` |
| `vue-tsc --noEmit` (app) | **exit 0** | 15:19:13, 45.70 | `tsc-app.log` |
| `vite build` (library, cacheDir in the worktree) | **exit 0** | 15:19:25, 45.41 | `libbuild.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` | **exit 0** | 15:19:34, 43.06 | `tsc-test.log` |
| dist-demo (`demo/vite.demo-dist.config`), before the units | **exit 0** | 15:19:37, 41.21 | `demobuild.log` |
| `vitest run --maxWorkers=2` | **exit 0: Test Files 239 passed (239); Tests 2321 passed, 10 expected fail, 1 skipped (2332)**; the minor v9 had 2321 (MS9 §6) | 15:21:10, 48.14 | `units.log` |
| verifier, datum unrebound | exit 1, `G-BUNDLE-RATCHET … 2921390 > 2919057`: **+2,333 B**, the minor v9's figure; the deltas add 0 B | 15:21:20, 44.32 | `verifier.log` |
| verifier, datum rebound in the worktree only | exit 0, `terminal CLEAN`, roster PRESENT **289 = 289**, claims 193, declarations 454; `.bundle-ratchet` restored; `.published-roster` diff empty (`v10.1.0..HEAD` and the worktree) | 15:21:55, 36.07 | `verifier-rebound.log`, `ratchet.log` |

**No red cell, so the two-re-run rule had nothing to act on.** The toolchain waited about 23 min for admission (queued 14:55:45, admitted 15:18:47), under 90 min, so no cell is owed.

---

## 5 · Gates carried, and the remaining 10.2.0 landing items

### 5.1 · The gates

Paint rows carry on outputs proved raw-identical to the minor v9's (§2), whose verdicts Reg P11-3.1 records. "Read here" marks this seat's own reads.

| gate | verdict | basis |
|---|---|---|
| **W-0.1 G1** M-1 | **PASS** over paper (11/11, both engines); off paper 48/66 grey, **accepted** and reported (O-103) | carried |
| **G2, G3** O-66 field and row | **PASS** | carried; HOV 58 read here |
| **G4** W-A light | **PASS** (108/108) | carried |
| **G5** scope | **PASS**: roster 289 = 289, `terminal CLEAN` with the datum rebound; the ratchet owes **+2,333 B** | read here |
| **G6** per R-9 | **PASS** (13 dark composites, ΔE 0.0000) | carried |
| **G7** M-2 and M-3 halves | **PASS**, 0 regressions | carried |
| **W-0.11 G1-G4** | **PASS**: census 0; 10.1.0 `2/2/5/9` | read here |
| **W-0.11 G5, G6** | **PASS** | as G5; carried |
| STACK (FL-14) | 24/24 | carried; `isolation` read here |
| units | 239 files, **2321 passed**, 0 failed | read here |
| light-law prose (R-21 (b), R-26, R-30, R-36) | DEL **at 0** (PASS 54); the list **PASS 368** under `crit-ms9-rulings.json`; **0 false printed lines** on the critic's reading, both pass-11 deltas built | read here |
| row N-4 (the minor's W-0.1 reading) | **PASS** | this table |

### 5.2 · The minor-split table (P5-3.3 as amended through P11-3.2)

The light-law prose row is now **built** as the minor v10: R-29 (`ladder.css:298`, `sizing.css:258-259`), `glass-subtlety.test.ts:193-194` and `grasp.css:136-137`. It lands in W-0.1. Every other row stands. **R-32** (the dark focus veil dimmed by OKLCH lightness, keeping chroma), which O-103b accepts, is a dark-arm build and stays **W-H.2's**. The minor does not carry R-2 or R-32.

### 5.3 · Can W-0.1 and W-0.11 ship from the minor v10 in 10.2.0? Not yet

What remains:
1. **The entry gate (W-0.1 §3, W-0.11 §3.3): two consecutive clean passes.** Under O-103b, row 23 closes on R-32. Pass 12 can therefore be the first clean pass, if the pass-12 critic upholds floor v11's 44 rows. That is the critic's and the agglomeration's call, not this seat's. **Earliest landing: the close of pass 13**, if passes 12 and 13 are both clean.
2. **D2 must converge.** O-103 gives the 10.2.0 go "once D2 and D3 converge".
3. **`release/10.1.1` (and now 10.1.2's line) must merge into master first.** The minor then rebases onto that base. Its raw-identity chain re-anchors there and it owes its own battery, because identity to `e11613c3eeb45cab` cannot hold across a base change (P11-5).
4. **The landing's own items, unchanged:**
   - R-9's reading enters W-0.1 §5 G6.
   - W-0.1 §5 G1's text reads Q-11's ruling (accepted, reported off paper).
   - Each gate binds to one probe. `scripts/probes/band-0/*` still does not exist.
   - `.bundle-ratchet` rebinds (+2,333 B).
5. **The landing docs pass:**
   - MS9 §5's `icon-button.css` words, and the `tab-button.css` / `triggers.css` line;
   - the 21 reported lines;
   - `glass-subtlety.test.ts:191`'s title "DIMS in dark";
   - the carve-outs `grasp.css:4`, `:13`, `morph.css:333`, `liquid-fill.css:44-45`;
   - `surface-axis.css:43`'s literal half;
   - the HEAD-text dark halves `icon-button.css:5`, `shadow.css:127`, `:143`;
   - `DESIGN.md:516-517`, Crit8's list, and P10-5's carve-outs.

**The minor itself owes nothing further in pass 12.** No comment delta is pending against it.

---

## 6 · Teardown and reproduce

**Torn down** (`teardown.log`, 15:21:59-15:22:18, load 34.38):
- `git worktree remove --force` of `.claude/worktrees/bl/D3/p12/minor10/wt`, then `git worktree prune`;
- `rm -rf` of `…/D3/p12/minor10/` (trees, builds and caches), then `rmdir` of the empty `p12/`.

Afterwards `git worktree list` holds 0 `D3/p12/minor10` entries and `.claude/worktrees/bl/D3/` holds `p3 p5 p6`. `git status --porcelain -- src demo tests DESIGN.md` in the checkout prints nothing. No process of this seat is left running. The absolute paths in the records name the removed scratch trees, and `MS10-run.sh setup` and the phases after it rebuild them from the banked patches.

**Machine law, kept:**
- Every phase ran through `guarded` as the literal command word.
- `setup compose trees static read ratchet teardown` ran `--light`: no browser, no build.
- `same` (`--timeout 45`) and `toolchain` (`--timeout 60`) ran heavy, one at a time.
- vitest used `--maxWorkers=2`.
- No WebKit run and no screenshot.
- No kernel-zone refusal fired.
- One departure, recorded: the `read` phase (`sed`/`grep` over the copied trees, no build or browser) was first run once outside `guarded` at 14:46:37, then re-run under `guarded --light` at 14:46:45. `read.log` is the guarded run.

```sh
P12=docs/tranches/BL/design/material/pass-12
G="$HOME/.claude/guard/guarded"
$G --light --timeout 15 -- bash $P12/MS10-run.sh setup
$G --light --timeout 15 -- bash $P12/MS10-run.sh compose    # writes minor-split-v10.patch
$G --light --timeout 15 -- bash $P12/MS10-run.sh trees
$G --light --timeout 20 -- bash $P12/MS10-run.sh static
$G --light --timeout 10 -- bash $P12/MS10-run.sh read
$G --timeout 45 -- bash $P12/MS10-run.sh same
$G --timeout 60 -- bash $P12/MS10-run.sh toolchain          # leaves the worktree at the minor v10 for ratchet
$G --light --timeout 15 -- bash $P12/MS10-run.sh ratchet
$G --light --timeout 10 -- bash $P12/MS10-run.sh teardown
```
