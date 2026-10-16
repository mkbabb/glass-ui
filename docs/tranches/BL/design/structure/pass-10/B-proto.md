# D1 · pass 10 · B-proto: sealed modules, flat

| field | value |
|---|---|
| seat | D1-B prototype, pass 10. Copies `pass-9/B-kit` to `pass-10/B-kit` and does the route work §P9-6.3 lists: P9-G1 (the probe's `--base` contract, the four judges swept), P9-G2 (B18 throws on a peer-less row), P9-R1 (a) and P9-R2 (a) landed by the chain, S69 and S69s re-derived, S70 rebound once, the browser selection re-derived and the touched specs run, W-D.1 §0 re-measured |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the chain was derived at `ba7c38ce`; r1 replayed at `bc204c0e`, r2 at `d2cff045`; the floor base was cut at `39cdd959`. `git diff 6154d6ec HEAD -- . ':!docs'` is empty at each: the chain runs over 10.1.0's code, as in passes 7-9 |
| kit | `pass-10/B-kit/` (543 files with its results). Every result is under `results/p10/`. Pass 9's committed inputs (the `/2` full runs, the P7-R2 reruns, the cascade baseline, the base probe report) are copied into `results/p10/` (`browser-p9/` holds pass 9's selection files as committed). The seat makes no git write; the driver commits the kit before the critic launches (S-01) |
| resumed | a prior run of this seat had copied the kit and written the kit-side cures (`gate/peer.mjs`, `gate/cycles.mjs`, `gate/clauses.mjs`, `gate/seal.test.ts`, the four judges, LAW §4/§5/§8/§14, `authored/p10-fourier-base-move.json`, `authored/p10-migration-heading.mjs`) and stopped mid-replay with no step frozen and its worktree removed (`results/p10/replay-p9chain-wt.txt`). This seat read each of those edits against the registry before building on them (§1) |
| fences | worktrees `.claude/worktrees/bl/D1/p10/B-proto/{wt,wt2,wt3,base}` only, all removed with the `B-proto/` dir; checkout writes limited to `docs/tranches/BL/design/structure/pass-10/` |
| machine | the heavy guard queue held two runs past 30 min (the toolchain 04:44-05:14Z, the batteries 05:21-05:51Z); each was stopped unstarted and re-run under `guarded --light --rss-gb 8`, as the law allows (`results/p10/{toolchain,batteries}-queued.txt`). The replays were admitted after 12 and 13 min, the browser run after 21 min (heavy, `--timeout 180`). No 13M refusal was seen. Chromium only (`chromium-headless-new`); no WebKit run |

Citations: `R/` is `pass-10/B-kit/results/p10/`, `K/` is `pass-10/B-kit/`. Loads are the 1/5/15-minute averages logged at each run; every timing below is beside its load.

---

## §0 · In brief

| bar (§P9-6.4) | result |
|---|---|
| chain | 121 → **127 steps**. New after S73c: S74 (P9-R1 (a), fourier), **S74b-S74e (P9-R1 (a), a second SCC the widened B4 reads, in `scripts/structure/lib`; §2)**, S75 (P9-R2 (a)). S69 re-derived once, still the last gate step; S69s re-recorded; **S70 rebinds once**, after S75, the last step that changes the package bytes |
| replay | digest **`6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf`** over 1,587 files, MATCH from two fresh HEAD worktrees: r1 `--twice` 637.0 s (load 38 → 26), rerun no-op 1.0 s; r2 plain 430.1 s (load 25 → 27) |
| floor base | `5b14c6c7ce4e36f092263a90a269d842a0bccf9a131012fe03889d0bf705402f` over 1,354 files, pass 9's (`R/base-floor.txt`) |
| gate | **19/19 at 0**, exit 0; files 1,585, edges 8,350, modules **142**/142, pin 142 / **122** doors / **1,320** names / 2 reviewed, peer held 23 |
| toolchain | build 0; `vue-tsc` ×2 0; demo build 0; `seal.test.ts` **26/26**; vitest **2,335 passed**, 10 expected-fail, 1 skipped, 0 failed (275 files) |
| package | verify:package **CLEAN at 2,920,386**, rebound once at S70 (pass 9: 2,920,391; −5) |
| cascade | **GREEN** against the floor base (`./styles` 28 moved, `./styles.css` 10 moved, risks 0; scope Timeline → TimelineMarks 40); the base snapshot identical to the committed baseline on all four sequences |
| `./motion-core` | keyframes-free on all three arms (names 55, dist 5 files, files 38) |
| W-C.2 on the chain's MIGRATION text | C2-G1 **0** META added by the chain, 0 lines naming `BL` or "tranche"; C2-G4 **0** misses added (base 33 headings · 26 misses, route 34 · 26) |
| W-D.1 §0 | item 1 (value SCC) **0**; item 4 (the chain's heading) **cured** (`## 11.0.0`, 0 tranche lines); items 2, 3, 5 unchanged (W-D.1's own edits) |
| plants | p10 **105/105**; p9 43/43; p8 27/27; p7 17/17; p6 20/20; the pass-9 critic's hashed battery: judge-throws **45/45** (pass 9: 44/45), crash8 **39/39**, regress **402 rows, 0 differ**; its post-hash checks: **BI3-fixed PASS**, every degenerate `--base` now exits 2 |
| browser | selection re-derived: 155 specs, 14 captures excluded, both identical to pass 9's; pass 10's own steps touch **8 specs** (the graph: the π floor; by route: 7 that open the fourier-field story or substrate). Run on the floor base and the route tree (`--workers=1`): 63 tests each, the same 33 pass, **0 new failures**. Tally over the committed full runs, the P7-R2 reruns and the pass-10 pair: **428 base-green, 428 held, 0 failed, 0 absent**, GREEN; blob D2 flaky, out of the bar |
| 27 items | route claims 27/27 closed (§8); S-14's hold re-met (§1, §5) |

---

## §1 · Kit work (no digest change): P9-G1 and the judges' sweep

The kit-side edits a prior run of this seat left were read against §P9-6.3 and kept; the sweep below is this seat's.

### P9-G1: the probe's `--base` contract

`tools/peer-closure.mjs`:
- `readBase` (before the floor loads): the file parses; it is an object, not an array; `floorBase === true`; `entries` is a non-empty object. Else a throw (exit 2).
- `baseArms` (per declared-free entry): the base names the entry, with `names`, `dist` and `files` each a list. Else a throw. The two `??` defaults at pass 9's `:77-78` are gone.
- `readOverlay`: `--overlay` is a `{ path: text }` map of at least one file.
- A name the S64 table publishes that its entry source does not export is a throw (it was read as no origin).

### The sweep of all four judges for report-field defaults

Every `??` and `||` left in the four judges (`grep -n "??\|||"`), each with its reading:

| judge:line | expression | reading |
|---|---|---|
| peer-closure:34, tally:28, select:30, rekey:19 | `e?.stack ?? e` | the guard's printed label |
| peer-closure:74 | `arg(args, "--table") ?? PEER_TABLE` | an absent option's stated default (the one table, P8-R3) |
| peer-closure:107 | `base ? baseArms(…) : { names: [], dist: [], files: [] }` | no `--base`: every break is the chain's (stated in LAW §14; the strictest reading, planted LEAK "no --base" exit 1) |
| peer-closure:117 | `entry in P.declared.free ? … : []` | an entry the table does not declare free may bear any peer (stated) |
| peer-closure:129 | `entries[entry]?.declared ?? "may bear a peer"` | a printed label for the same statement |
| peer-closure:135-136 | `ps.join("+") \|\| "kept"`, `… \|\| "none"` | printed labels |
| peer-closure:50, 58, 65 | `!isRecord(…) \|\| …` | the throws themselves |
| tally:36 | `r?.$schema ?? "unversioned"` | label inside a throw |
| tally:39, 43 | `!Array.isArray(…) \|\| …`, `typeof … \|\| …` | the throws themselves |
| tally:52 | `n.get(k) ?? 0` | a counter, not a report field |
| tally:76, 94 | `… \|\| "absent"`, `… \|\| "none (a new test)"` | printed labels |
| select:37, 50 | `!arg(…) \|\| …`, `s.kind !== "row" \|\| …` | the throws themselves |
| select:69 | `changed.has(p) ? ["row"] : []` | a set test, not a default |
| rekey:25, 29-30, 35, 40 | the usage, schema, results and field throws; `map.has \|\| unmapped.has` | throws and a set test |

The fields the sweep made into throws (LAW §14, pass 10): every result of a browser report carries `spec`, `title` and `status` strings (tally, rekey); a report carries a `bands` list (tally; pass 9's `route.bands ?? []` is gone); a rerun is keyed from the route's `testDir` (tally); a report `rekey` already re-keyed is refused (rekey); a chain step whose frozen file holds neither a move list nor a row is a throw (select: pass 9's `if (!s.file) continue` and `if (!f.files) continue` are gone).

---

## §2 · The chain: S74-S75, S69, S69s, S70

| step | kind | what | files | digest after |
|---|---|---|---:|---|
| S74 | moves | P9-R1 (a): `fourier-field/math.ts` → `fourier-field/register/math.ts`, the unit's base module (`names.json` bases), where it stays the `./fourier-math` entry source; 10 files re-pointed, 11 classified move-only; 2 scan deltas declared (`tests/styles/engage-ladder.test.ts`, `typed-track-seam.test.ts`, both green in the vitest run); FD-2 co-cyclic SCCs 2 → 1 | 1 move | `1bbb3fed…` |
| S74b | row | `lib/entries.mjs` names its own path by `new URL("./entries.mjs", import.meta.url)`: the bare `fileURLToPath(import.meta.url)` is an F-1 edge with no span, and the engine refuses to move a file holding one (`unrewritable-path`) | 1 | `c1abd9ab…` |
| S74c | row | the landed engine (`scripts/structure/lib/move.mjs:168`) keeps a root-relative spelling's `./` lead when its holder moves, as FLOOR.md F-2 (P4-F3) states; it kept only `../`, so `"./dist/index.d.ts"` (`entries.mjs:71`) became `"dist/index.d.ts"` and the image check refused S74d (2 edges lost) | 1 | `1da6d092…` |
| S74d | moves | P9-R1 (a), second SCC: `tree.mjs`, `entries.mjs`, `resolve.mjs`, `placement.mjs`, `symbols.mjs` → `scripts/structure/lib/tree/`; 9 files move-only; the engine itself respelled `FLOOR_DIR`'s `..` to `../..` | 5 moves | `93f14a86…` |
| S74e | row | `lib/tree/index.mjs`, the door (B7, B14; 31 names, each read outside it); the lib door, `move.mjs`, `classify.mjs` and `graph/graph.mjs` cross through it (B1) | 5 | `7aecdc58…` |
| S75 | row | P9-R2 (a): `## UNRELEASED — the structure cut (BL)` → `## 11.0.0`; the 8 other lines naming a tranche re-worded in the same row | 1 | `b662372a…` |
| S69 | row | the gate re-land: `cycles.mjs` (B4's reader) lands; `peer.mjs` (P9-G2), `clauses.mjs`, `seal.test.ts` (26 cases); the pin re-measured (142 modules, 122 doors, 1,320 names, peerHolds kept) | 8 | `377dc106…` |
| S69s | row | the public-surface spec, re-recorded unchanged in text | 2 | `37b96827…` |
| S70 | row | the datum: `.bundle-ratchet` 2,919,057 → **2,920,386** | 1 | `6fdd4ec7…` |

### Why S74b-S74e: the second SCC

B4's module arm, run on the S73c tree before any pass-10 step (`tools/seal-staged.mjs`, which stages the kit gate and restores every byte), read **two** parent↔child value SCCs, not one:

```
value SCC at module grain [scripts/structure/lib scripts/structure/lib/graph] (parent<->child)
  via scripts/structure/lib/graph/graph.mjs:7 -> scripts/structure/lib/tree.mjs ; scripts/structure/lib/classify.mjs:18 -> scripts/structure/lib/graph/index.mjs
value SCC at module grain [src/components/fourier-field src/components/fourier-field/renderer] (parent<->child)
  via src/components/fourier-field/renderer/mint.ts:21 -> src/components/fourier-field/math.ts ; …/FourierField.vue:14 -> …/renderer/index.ts
```

The registry named only the second. It was measured by W-D.1's `d1-probe.mjs`, which reads `src/` alone (`e.from.startsWith("src/")`). LAW §1 seals `src` and `scripts`, and P9-R1 (a) rules "B4 widens … to every module-grain value SCC", so the chain cures both by the same base rule. Narrowing the arm to `src` would be the dodge the ruling refuses. After S74 the arm reads 1 (lib); after S74e it reads 0.

**S74c changes the landed floor engine.** It is a one-line cure at the cause of a floor defect: a sentence of FLOOR.md that the engine contradicts. Without it the base rule cannot be applied to `entries.mjs` by the engine, and moving files by hand is not a chain operation. The docs floor (`floor/lib/move.mjs:168`) carries the same line and is outside this seat's fences. That is open gap G-1 (§9). The fix leaves every earlier step's replay unchanged: S1-S73c replay to the same digests through the old line.

### The kit's own floor reader

`lib/floor.mjs` found the landed floor by `lib/tree.mjs`; after S74d it checks `lib/syntax.mjs`, which stays at `lib/` in every layout. `loadFloor` takes `tree/symbols.mjs`, `tree/placement.mjs` and `tree/tree.mjs` before the old paths. `tools/plants-p8.mjs`'s floor-throw plant now names `lib/tree/tree.mjs`.

---

## §3 · Replay and digest

| run | HEAD | worktree | wall | digest | rerun | load start → end |
|---|---|---|---:|---|---|---|
| r1 (stale chain) | `bc204c0e` | `wt2` | — | stopped unstarted in the queue (exit 143) when the seal.test.ts plant was corrected and S69-S70 re-derived (§2); wt2 untouched at the base digest | — | 40 → 50 |
| **r1 `--twice`** | `bc204c0e` | `wt2` (fresh) | **637.0 s** | **`6fdd4ec7…` MATCH**, every one of 127 steps idempotent | 1.0 s no-op | 38 → 26 (admitted after 12 min) |
| **r2** | `d2cff045` | `wt3` (fresh) | **430.1 s** | **`6fdd4ec7…` MATCH** | — | 25 → 27 (admitted after 13 min) |

- **Digest:** `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files (`R/replay-r1.txt`, `R/replay-r1-rerun.txt`, `R/replay-r2.txt`).
- **After every battery** the r1 tree still reads `6fdd4ec7…` (`R/digest-after-batteries.txt`, `R/critic9/digest-after.txt`, `R/critic9/extra9.txt`).
- Timings are not verdicts; loads ran 25 to 50.

---

## §4 · The gate, toolchain, package, cascade, peer

**Gate** (`R/seal-r1.txt`, `.json`; r1 tree, unbuilt, load 12): B0-B18 0 each, exit 0. Files 1,585, edges 8,350, modules 142 (required 142), B10 anchored 39, pin 142 / 122 / 1,320 / 2 reviewed, peer held 23 (P7-G5's reviewed `peerHolds`, unchanged). The +1 module and +1 door are `scripts/structure/lib/tree`; the +31 names are its door.

**Toolchain** (`R/toolchain-r1.txt`, 05:14-05:20Z, `guarded --light --rss-gb 8` after the 30-min hold):

| check | exit | time | load start → end |
|---|---:|---:|---|
| seal (unbuilt) | 0 | 4 s | 12 → 13 |
| peer probe, unbuilt (expect 2) | **2** | 2 s | 13 |
| base `vite build` | 0 | 8 s | 13 |
| base cascade snapshot | 0 | 2 s | 13 → 14 (all four sequences identical to the committed baseline) |
| base peer probe (expect 1: P7-G5) | 1 | 2 s | 14 |
| `vite build` | 0 | 9 s | 14 |
| verify:package | 0, **CLEAN** | 30 s | 14 → 16 |
| `vue-tsc` / `-p tsconfig.test.json` | 0 / 0 | 9 / 10 s | 16 → 17 |
| `demo:dist:build` | 0 | 2 s | 17 → 18 |
| cascade verify against the floor base | 0, GREEN | 2 s | 18 |
| peer probe (built) | 0, GREEN | 2 s | 18 |
| `seal.test.ts` (`--maxWorkers=2`) | 0, **26/26** | 45 s | 25 → 29 |
| vitest full (`--maxWorkers=2`) | 0 | 172 s | 29 → 40 |

**Toolchain:** Node v26.0.0, vite 8.1.5, vue-tsc 6.0.3, vitest 4.1.10, TypeScript 6.0.3, Playwright 1.61.1, macOS 26.4.1 (the toolchain line of `R/toolchain-r1.txt`).

- **vitest:** 275 files; 2,335 passed (pass 9: 2,333; +2, the two new `seal.test.ts` cases), 10 expected-fail, 1 skipped, 0 failed.
- **Package** (`R/pack/pack-diff-r1.json`, `R/logs/r1-verify-package.log`): ratchet `PRESENT`, datum 2,920,386, `equal: true`, `increase: false`. Floor 2,913,546 → route 2,920,386 (+6,840; files 838 → 921). Against pass 9's classes: MIGRATION.md +9,289 (−49: S75's shorter heading and lines), JS −914 (+9), other declarations −5,387 (+35: S74's `register/math` declaration paths), door declarations +2,977, CSS doors and other CSS unchanged. A first measurement before S70 (`R/logs/datum-verify-package.log`) read the same 2,920,386 against the old datum.
- **Cascade** (`R/cascade/verify-r1.txt`): `./styles` listed reorder 28 moved, `./styles.css` 10 moved, risks 0, scope Timeline → TimelineMarks 40 rule lines.
- **Peer probe** (`R/peer-closure-r1.txt`): `./motion-core` kept, names 55, peers none; dist 5 files, peers none; files 38, peers none; `.` kept against the base (P7-G5); the S64 table's names each keep their entry's class; GREEN. The unbuilt tree exits 2.

---

## §5 · Plants

### Pass-10 battery: 105/105

`R/plants-p10.txt` (run 2), r1 tree built, floor base `base`, under `--light --rss-gb 8` at load 19 → 25. Run 1 (`R/plants-p10-run1.txt`) read 104/105; its one FAIL was the battery's own control (below), not the kit.

| group | n | what it showed |
|---|---:|---|
| INPUT | 68 | **every input argument of every kit judge**, each exit 2 with `<tool>: no verdict`. browser-tally `--base`, `--route`, `--base-rerun`, `--route-rerun`: a missing file, non-JSON, `{}`, `[]`, the probe's floor-base report (another kind), a result with no status, no band table (7 × 4); right schema, wrong kind: the base run not re-keyed (`--base`), a base rerun not re-keyed (`--base-rerun`), the base run as `--route-rerun`. rekey `<base>` (the four, another kind, **a report it already re-keyed**, a result with no status), `<tree>` (missing, no tree), `<out>` (unwritable). browser-select `--root` (missing, no tree), `--out` (under a file). peer-closure `--root` (missing, no tree); `--base`: the four, `{"entries":{}}`, the route's browser report, **the probe's own non-floor report**, a floor-base report with no entries, one missing `./motion-core`, one whose `./motion-core` lacks the dist arm; `--overlay`: the four and a path mapped to a number; `--table`: a missing file, a file with no table; `--json`: unwritable. Four controls exit 0 |
| LEAK | 12 | a keyframes.js leaf published on `./motion-core` with each of the 10 degenerate `--base` inputs: **exit 2 every time, never 0**; the same leak with the floor-base report and with no `--base`: exit 1, `BROKEN ./motion-core` |
| ROW | 13 | P9-G2: a peer-less row, a whitespace-only Peer cell, a row naming `(none …)` with no subpath, and one naming `@mkbabb/keyframes.js` with no subpath: `seal()` throws, the seal CLI exits 2 and the probe exits 2, each with the reader's message; control: a Symbol(s) continuation line in the table reads no count |
| CYCLE | 4 | P9-R1 (a): a parent↔child value cycle in another unit (aurora: `config/zq10Up.ts` value-reads a new parent-level `aurora/zq10Base.ts`) reads **B4 0 → 1**, `value SCC at module grain [src/components/aurora src/components/aurora/config]`; the same reverse edge type-only reads **B4 0 → 0**; the cured fourier cycle re-planted (`renderer/mint.ts` value-reads a new parent-level file) reads RED; the tree reads B4 0 |
| GATE | 3 | `seal/cycles.mjs`, `lib/tree/index.mjs` and `lib/tree/tree.mjs` each throwing as they load, in a copied floor runtime: the seal CLI exits 2, `seal: no verdict` |
| MIGR | 5 | P9-R2 (a), through `tools/wc2/chain-text.mjs`: `BL #3` in the chain's section RED (C2-G1 row-ref); a `docs/tranches/BL/` cite RED (record-cite); a bare "(BL)" RED (the tranche arm); the heading put back to `## UNRELEASED — the structure cut (BL)` RED (C2-G4, a new miss); the route's own text GREEN |

**Run 1's control.** It planted `config/` value-reading `aurora-config.ts` and, as the control, the same edge type-only. `aurora-config.ts` already value-reads `config/`, so a type-only reverse edge closes a *sibling* cycle between the two at the aurora level. LAW §8's sibling arm counts sibling cycles "value and type", as it should, and read B4 0 → 1. The plant was wrong, not the gate. Run 2 uses a fresh parent-level file that reads nothing, so the only cycle runs through the parent's door, which is §P9-6.4's case.

### Regressions on the pass-10 tree

| battery | result | file | load |
|---|---|---|---|
| pass 9's route battery | 43/43 | `R/plants-p9.txt` | 38 → 25 |
| pass 8's route battery | 27/27 | `R/plants-p8.txt` | 25 → 20 |
| pass 7's | 17/17 | `R/plants-p7.txt` | 20 → 15 |
| pass 6's | 20/20 | `R/plants-p6.txt` | 15 → 11 |
| the pass-9 critic's hashed battery (`748826fb…`, run by path, unmodified) | judge-throws **45 PASS / 0 FAIL** (pass 9: 44/1; the one FAIL was P-base-schema, O-1); b18-inputs 5/1, the same row as pass 9 (BI3's hashed locator finds no row, cB9 §7; its corrected BI3-fixed is below); select-capture, flake9, browser-plants identical in verdict to pass 9's committed results (S1 FAIL and `flake9 tally rc=2` are pass 9's own lines, the critic's fixture defects cB9 §7 names); plants9 17 pass / 1 skip; p8-plants 11 rows, 0 differ; **regress 402 rows, 0 differ** (TALLY identical); tree-probes **crash8 39/39** (pass 9: 37; the two added gate modules), PEERU U0/U5 FAIL as in pass 9 (the hashed invocation passes no `--base`) | `R/critic9/*.txt` | 11 → 17; regress re-run at 18 → 18 |
| the pass-9 critic's post-hash `extra9.sh` (copied as `tools/critic9-extra.sh`, two path lines changed, `diff` in §9 G-5) | XR 3/3; **BI3-fixed PASS rc=2** (`the row for @mkbabb/glass-ui/motion-core has an empty Peer cell`; pass 9: FAIL rc=0, O-2); BI5 PASS; flake case lines SAME as pass 8; PEERU U0-U5 with `--base` all PASS; **PX: `--base {}`, `{"entries":{}}`, `[]`, a browser report, and the leak with the probe's own report as `--base` each exit 2** (pass 9: 1, 1, 1, 1, **0 GREEN**, O-1); the leak vs the floor base exits 1; the gate on the leak B18 27 | `R/critic9/extra9.txt` | 18 |

The regress family's first run died on a dangling `tests-visual/node_modules` link in the worktree: the checkout has no `tests-visual/node_modules` for the task's symlink to name, and the battery's tree walk stats every entry. The links were removed from the seat's worktrees and the family re-run (`R/critic9/regress-run1-dangling-link.txt`, `R/critic9/regress.txt`).

---

## §6 · W-D.1 §0's five items on the pass-10 tree

`R/wd1-measure.txt`, the S70 tree (`wt`, built), load 36. Measurements, not checklist items (§P8-5).

| # | item | pass 9 | pass 10 | disposition |
|---|---|---:|---:|---|
| 1 | parent↔child value cycle (`d1-probe` VALUE-SCC, `src` only) | 1 | **0** | P9-R1 (a), S74; the `scripts` SCC the probe does not read is cured by S74b-S74e and read 0 by B4 |
| 2 | `Surface` names two symbols | 1 | 1 | W-D.1 §3 step 5 (`src/components/_shared/axes.ts:23`, `src/index.ts:486`) |
| 3 | bare type aliases | 5 | 5 | W-D.1 §3 step 5 (`aurora/config/color.ts:96`, `progress/types.ts:7`, `scroll-progress-rim/types.ts:4`, `surface/Surface.vue:11`, `tabs/types.ts:34`) |
| 4 | the chain's MIGRATION heading | 1 (`## UNRELEASED — the structure cut (BL)`), 9 tranche lines | **0**: `MIGRATION.md:8` `## 11.0.0`; 0 lines name `BL` or "tranche" | P9-R2 (a), S75. The 26 non-version headings are the floor base's, W-C.2's work (§2 of that wave measures the same 33 · 26) |
| 5 | the consumer preset in `./tokens` | 3 of 3 | 3 of 3 | W-D.1 §3 step 7 (`src/styles/tokens/tokens.ts:12,19,26`) |

**W-C.2's gates over the chain's text** (`R/chain-text.txt`, `tools/wc2/`: appendices A and B copied verbatim, and `chain-text.mjs`, which reads the delta). The chain adds 129 MIGRATION.md lines, 1 heading (`## 11.0.0`). **C2-G1:** 0 META hits added by the chain; 2 hits ride on floor-base lines S75 re-words (`proof:tabs-unified`, a `docs/tranches/L/L.md` cite), which the base already had. **C2-G4:** base 33 headings · 26 misses, route 34 · 26, 0 added; the published-version arm is off (no registry read at this seat). `11.0.0` is not yet a published version or `package.json`'s (10.1.0): the version bump is the landing's (§9 G-4).

---

## §7 · The browser bar (S-12, P7-R2)

**Selection** (`R/browser/`, `tools/browser-select.mjs` on the S70 tree, exit 0, light): 604 moves, 723 changed paths, **155 specs**, 14 excluded captures (`captures.txt`). `specs.txt` and `captures.txt` are byte-identical to pass 9's; `changed.txt` differs by the pass-10 paths (`lib/tree/index.mjs`, `seal/cycles.mjs`, `lib/graph/graph.mjs` and the moved `lib/*` files). The whole chain's selection is the whole program, so it says nothing about what pass 10 changed.

**The specs pass 10's steps touch** (`R/browser/p10-steps/`; LAW §13, pass 10):
- the graph: `browser.mjs --select-only` over the S74 and S74d moves and every file S74b-S70 edits (`moved.json`, `changed.txt`) selects **1 spec**, the π floor (`substrate-paints-color.spec.ts`); "band fourier-field: 0 spec(s) (no spec reads it)"; the `scripts/` and `MIGRATION.md` paths form no band (`select-only.log`, `selection.json`);
- by route: a page-driving spec reaches the unit through no graph edge (P5-R5), so the 7 specs that open the fourier-field story or substrate route (the π manifest's `fourier` scene, `/fourier`, `substrates/fourier-field`), each in the selection, are named outright: `storybook/configurator/config-right`, `substrate/substrate-cohesion`, `typography/hierarchy`, `viz/viz-configurator-suite`, `viz/viz-fourier-ribbon`, `viz/viz-interaction`, `viz/webgpu-everywhere` (`touched.json` holds the reasons).

All 8 have base keys (`tools/base-specs.mjs`: 8 of the base program's 153; none created by the chain).

**The runs** (`tools/browser-touched.sh`, one heavy `guarded --timeout 180` run, admitted 06:34Z after 21 min in the queue; `R/browser/p10-steps/runs.txt`):

| run | tree | wall | tests | passed | failed | new failures | load start → end |
|---|---|---:|---:|---:|---:|---|---|
| base | floor base (`5b14c6c7…`) | 193 s | 63 | 33 | 30 | — | 34 → 30 |
| route | r1 tree (`6fdd4ec7…`), `--base-report` the re-keyed base | 209 s | 63 | 33 | 30 | **0** (seat verdict GREEN) | 30 → 35 |

The 30 failures are the same 30 keys on both trees (`config-right` 8, `hierarchy` 3, `substrate-cohesion` 2, `viz-configurator-suite` 7, `viz-interaction` 10): base-red, never base-green in the committed full runs, so outside the bar. The two runs read identical statuses key for key (63/63).

**The tally** (`R/browser/p10-steps/tally.txt`, exit 0): `browser-tally` over the committed full runs (`base-rekeyed.json`, re-derived on the r1 tree from the committed `base.json` with results identical to pass 9's; `route.json`), the six committed P7-R2 reruns of `blob-config-delta.spec.ts`, and the pass-10 pair as one more rerun per tree:
- base keys 866, route keys 867; **5 runs per tree**;
- **base-green 428; held 428; not held 0 (failed 0, absent 0)**; flaky 1, out of the bar (blob D2, "a negative attraction SHIES…": base expected, unexpected ×3 in its reruns); base-red route-green 1;
- of the 428, the 8 touched specs hold **33**; each is run by the pass-10 route run and passes in both route runs;
- **verdict: GREEN. Every base-green key is accounted for: 428 held + 0 failed + 0 absent.**

Seven route keys are `UNKEYED` (the chip `.visual.ts` slot test and six `w1-radius-redress-inputs` rows), as in passes 8 and 9; none is base-green.

**The full graph-selected run was not repeated.** The task text asks for a full graph-selected run against the floor base; §P9-6.2 step 4, the more specific instruction for a pass that moves a `src` file, asks for every selected spec the move touches to run on the route tree and the tally to re-derive 428 against the committed base report. This seat did that, plus a fresh base run of the same specs, so both `/2` reports for the touched set are new. The committed full runs (pass 8's, carried by passes 9 and 10) stand for the other 147 specs, whose closure no pass-10 step touches. A full repeat would cost about 3.3 h of base run and 1.6 h of route run at pass 8's timings (§9 G-3).

---

## §8 · The 27 items

| item | entering pass 10 | route's status | what holds it |
|---|---|---|---|
| S-01 | CLOSED | CLOSED | the kit, every result, the selection, `captures.txt` and both `/2` reports for the touched specs are written under `pass-10/B-kit/` for the driver's commit before the critic |
| S-02 | CLOSED | CLOSED | B8 0, B9 0 |
| S-03 | CLOSED | CLOSED | P8-R2 and P8-R3 landed in full (§1, §5 INPUT/LEAK/ROW); P9-R1 (a) (S74, and S74b-S74e for the second SCC the ruled clause reads) and P9-R2 (a) (S75) landed by the chain; the datum rebound once, at S70 |
| S-04..S-08 | CLOSED | CLOSED | gate 19/19 at 0 |
| S-09 | CLOSED | CLOSED | `6fdd4ec7…` from two fresh worktrees, r1 `--twice`, rerun a no-op |
| S-10 | CLOSED | CLOSED | cascade GREEN against the floor base, every moved rule listed |
| S-11 | CLOSED | CLOSED | vitest 0 failed |
| S-12 | CLOSED | CLOSED | every base-green key accounted for: 428 held, 0 failed, 0 absent, with pass 10's 8 touched specs re-run on both trees (33 base-green keys held in both route runs); the capture exclusion stated (LAW §13), printed (14) and listed (`captures.txt`); a moved capture spec read by B0 (p9 CAPTURE, plants9 CAP-*) |
| S-13 | CLOSED | CLOSED | — |
| S-14 | **OPEN** | **CLOSED (route's claim)** | B17 0; every gate throw exits 2 (crash8 39/39, GATE 3/3); every kit judge exits 2 on a throw or a degenerate input **on every input argument**, wrong-schema and wrong-kind reports included (INPUT 68/68); no judge reads a malformed input as an all-clear: a `./motion-core` leak under every degenerate `--base` exits 2, never 0 (LEAK 10/10; the critic's PX lines now 2); the sweep (§1) lists every remaining `??`/`\|\|` with its stated reading |
| B-01 | CLOSED | CLOSED | every clause 0, B2 0; I7 caught (p7 battery) |
| B-02..B-06 | CLOSED | CLOSED | p6-p9 batteries identical in verdict; regress 402 rows 0 differ |
| B-07 | CLOSED | CLOSED | B15 over every stem (the new `lib/tree/` and `register/math.ts` included) |
| B-08, B-09 | CLOSED | CLOSED | — |
| B-10 | CLOSED | CLOSED | B18 owns the class; P8-R3's reader throws on a peer-less row, a whitespace Peer cell and a peer with no subpath (ROW 13/13, BI3-fixed rc 2, `seal.test.ts` RED case); `./motion-core` keyframes-free on all three arms |
| B-11..B-13 | CLOSED | CLOSED | — |

**Count:** 27 items, route claims 27 closed. The two-clean-passes count is 0 entering pass 10; the pass-10 critique decides whether it reaches 1.

---

## §9 · Open gaps

| id | gap | where | proposed disposition |
|---|---|---|---|
| G-1 | **S74c changes the landed floor engine** (`scripts/structure/lib/move.mjs:168`: a root-relative spelling keeps its `./` lead). The docs floor, `floor/lib/move.mjs:168`, keeps the defect, so FLOOR.md F-2 (P4-F3, "a root-relative spelling is kept verbatim") and the docs engine still disagree, and a route that moves a file holding a `./`-led root-relative path on the floor base is refused there | §2; `authored/p10-engine-dot-lead.mjs` | a floor row (the same one-line cure in `floor/lib/move.mjs`, with a plant that moves a holder of `"./dist/x"`), owed by the driver or a floor seat, outside a route seat's fences. Then S74c leaves the chain, since the cut holds it; the digest after S74c is unchanged by construction |
| G-2 | **The second module-grain SCC** (`scripts/structure/lib` ↔ `lib/graph`) is cured by S74b-S74e, which the registry's P9-R1 text does not name: P9-R1 (a) names only the fourier move. The ruled clause ("every module-grain value SCC") reads it, and LAW §1 seals `scripts`; W-D.1's `d1-probe.mjs` reads `src/` only, which is why pass 9's measurement saw one SCC | §2; LAW §4 | the agglomeration confirms the cure sits under P9-R1 (a) or rules on it; W-D.1's VALUE-SCC gate should read both sealed zones when it is re-pointed (P9-G6) |
| G-3 | **The full 155-spec graph-selected browser run was not repeated** (§7). The touched 8 specs ran on both trees; the committed full runs stand for the other 147 | §7 | per §P9-6.2 step 4, none owed; if the driver reads the task's sentence as binding, about 3.3 h base plus 1.6 h route at pass 8's timings |
| G-4 | `## 11.0.0` heads a version that is neither published nor `package.json`'s (10.1.0). C2-G4 with the registry's list passed (its published-version arm) reads one miss until the landing bumps the version | §6 | the landing's version bump (W-D.1 / the release); the chain does not edit `package.json`'s version |
| G-5 | The pass-9 critic's hashed battery carries its own fixture defects, unchanged here and identical to pass 9's lines: BI3's locator finds no row (BI3-fixed in `extra9.sh` is the corrected case, PASS), browser-plants S1 FAIL, `flake9 tally rc=2`, PEERU U0/U5 without `--base`. `tools/critic9-extra.sh` is `extra9.sh` with two lines changed (its `HERE`, and the base path `results/p9` → `results/p10`) | §5 | none; a fresh critic writes its own battery |
| G-6 | The task's `tests-visual/node_modules` symlink names a directory the checkout lacks. The links dangled, and the pass-9 critic's regress walk threw on one. They were unlinked in the seat's worktrees and the family re-run | §5 | the driver's next task text drops that symlink, or the checkout gains the directory |
| G-7 | W-D.1 §0 items 2, 3, 5 are non-zero (1 / 5 / 3), unchanged | §6 | W-D.1 §3 steps 5 and 7, its own edits (§P9-4) |
| G-8 | The 8 touched specs read 30 base-red tests on the floor base itself (config-right 8, hierarchy 3, substrate-cohesion 2, viz-configurator-suite 7, viz-interaction 10) | §7 | outside D1 (P5-G8, common browser failures); on the tranche cursor |
| G-9 | Heavy-queue holds: the toolchain and the batteries each ran under `--light --rss-gb 8` after a 30-min hold (`*-queued.txt`); the browser run was admitted at 21 min | header | none |
| G-10 | Outside D1, unchanged: P7-G5 (the root's peer class broken at the floor base, 23 reviewed holds), P5-G3, P5-G5, P5-G8; P9-G6 (W-D.1 and `waves/INDEX.md:47` re-pointed at convergence, to this pass's digest if it converges) | — | tranche cursor |

Nothing was left running, and the four worktrees (`wt`, `wt2`, `wt3`, `base`) are removed (`git worktree remove --force`). **The `B-proto/` directory is not removed:** the permission system denied the recursive removal of what is left in it, plain copies made by this seat that hold no git registration: `snap-S73c/` (5.4 GB, a rollback copy of the S73c tree, `docs/` included), `snap-S74/` (15 MB), `scratch/` (6.3 MB, the critic battery's scratch) and `SEQ-S74.json` (48 KB). G-11: the driver removes `.claude/worktrees/bl/D1/p10/B-proto/` (`rm -r`), as P9-G5 did for pass 8's.
