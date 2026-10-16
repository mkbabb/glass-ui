# D1 · pass 9 · critique-B: sealed modules, flat

| field | value |
|---|---|
| seat | fresh adversarial critic for D1-B, pass 9. Authored nothing in passes 2-9, the pass-6, -7 and -8 critiques included |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b06cacc3`. The kit was committed there (2026-10-15 19:52:19 -0400; 459 tracked files under `pass-9/`), before this seat's battery hash (23:57:04Z). `git diff 6154d6ec HEAD -- . ':!docs'` is empty: the route and this seat judged 10.1.0's code. `gate/` and `frozen/` are byte-identical to pass 8's (`diff -rq`) |
| battery | written and hashed before reading `pass-9/B-kit/` or `pass-9/B-proto.md`: `748826fb…d0579035` (`critique-B/BATTERY-HASH.txt`, 12 files, plus 13 pass-8 critic files run by path, hashes listed) |
| worktree | one, `.claude/worktrees/bl/D1/p9/crit-B/wt` from HEAD, `node_modules` symlinked (`tests-visual/node_modules` does not exist in the checkout). Removed with `git worktree remove --force`; the `crit-B/` dir was removed too |
| fences | no source edit and no git write in the checkout. The only writes are this file and `pass-9/critique-B/{battery,tools,results}/` |
| guard | every build, test and probe ran under `~/.claude/guard/guarded`. The first run (`tools/phase1.sh`) sat unadmitted in the heavy queue 30.8 min (19:58-20:30 local, load 15-22) and was stopped unstarted (`R/queue.txt`). Every run after that went `--light --rss-gb 8` with `--timeout` 30-60, as the law allows. One sequential run at a time; nothing left running |

Short citations: `R/` is `pass-9/critique-B/results/`, `K/` is `pass-9/B-kit/`, `Bp9` is `pass-9/B-proto.md`, `cB8` is `pass-8/critique-B.md`. Every timing-sensitive line carries its load (`sysctl -n vm.loadavg`, 1/5/15 min).

---

## §0 · Verdict

**27/27 CLOSED, 0 re-opened on the items' own texts.** Every §P8-6.4 bar item is re-met from committed bytes. Two findings sit next to S-14 and B-10 and are stated in §5 as the closest calls: the peer probe reads a degenerate `--base` report as a verdict, and B18 reads a peer-less declaration row as no row. Neither is P8-G2, G3 or G4 (all three are cured), and neither touches an item's frozen text. Under the task's rule ("re-open a closed item only on its own text") and the pass-8 registry's precedent for O-2 and O-4, this is the **second clean pass**.

| bar (§P8-6.4) | this seat's measurement | load |
|---|---|---|
| replay from committed bytes | HEAD tree code digest `35f7b831…` = the chain's base. Floor rows (S1's own script) → `5b14c6c7…705402f` over 1,354 files = S1's recorded digest. `K/replay.mjs` then ran S1b→S70: 313.8 s, `chain final MATCH`, **`05aaa6edbe0f8f242f0ffe5f37a4e46f9e880ec237e30a3d4293f8f9a451e1b3` over 1,585 files** (`R/phase1.txt`, `R/replay.txt`) | 19.5 → 20.8 |
| rerun no-op | 0.5 s, "the chain is applied". The digest is unchanged after every battery family and after the extras (`R/digest-after.txt`, `R/extra9.txt`) | 20.8 |
| floor base | `5b14c6c7…` (above). Its four cascade `.seq` files are byte-identical to the kit's committed baseline; its peer report equals `K/results/p9/peer-closure-base.json`, the `root` field aside | 18.7-19.5 |
| gate | 19/19 at 0, exit 0; files 1,583, edges 8,347, modules 141/141, pin 141/121/1,289/2, peer held 23 (`R/seal-wt.txt`) | 20.6 |
| package | verify:package CLEAN; ratchet PRESENT, datum 2,920,391 = unpacked, `equal: true`, `increase: false`. Only `S70-datum.json` writes `.bundle-ratchet`; three other rows only mention it | 22.2 → 22.9 |
| cascade | GREEN against this seat's own floor-base snapshot with the kit's listing (exit 0); RED with an empty listing (exit 1) (`R/cascade/`) | 24.7 |
| toolchain | build 0; `vue-tsc` ×2 0; `demo:dist:build` 0; `seal.test.ts` 24/24; vitest 275 files, 2,333 passed, 10 expected-fail, 1 skipped, 0 failed (`R/toolchain.txt`) | 22.9 → 32.1 |
| browser | re-derived from the committed reports (pass 8's `/2` pair and six reruns; pass 9's copies are byte-identical to them): **428 base-green, 428 held, 0 failed, 0 absent**, 1 flaky (blob D2) out of the bar (§3) | 22 |
| `./motion-core` | keyframes-free on all three arms: names 55, dist 5 files, files 38, peers none, against both the kit's base report and this seat's (`R/peer-built*.txt`) | 24 |

---

## §1 · S-14 and P8-R2: every kit judge exits 2

`R/judge-throws.txt` (hashed `battery/judge-throws.sh`), at load 27 → 27: **44 PASS, 1 FAIL**. `R/extra9.txt` adds four post-hash cases.

| judge | planted inputs (expect 2) | result |
|---|---|---|
| `browser-tally` | no arguments; `--base` or `--route` missing; either not JSON; a `browser-seat/1` route; a `/2` route with no `results`; an **empty route report**; an empty base; a rerun missing or not JSON | 11/11 exit 2. Control over the committed pair plus reruns: 0, GREEN 428 held |
| `rekey` | no arguments; base missing, not JSON, `/1`, empty; a root that does not exist | 6/6 exit 2. Control: 0, and its output has the same (spec, title, status) multiset as the committed `base-rekeyed.json` (866/866) |
| `browser-select` | no arguments; a root that does not exist; an empty dir as root; `frozen/SEQUENCE.json` not JSON; `{}` | 5/5 exit 2. Control: 0, `{"moves":598,"changed":721,"specs":155,"captures":14,"excludedTouched":14}` |
| `peer-closure` | no arguments; root missing; `--base` missing or not JSON; `--overlay` not JSON; **`dist/motion-core.js` emptied**; `dist/glass-ui.js` emptied (extra) | 7/7 exit 2. Controls before and after: 0 GREEN |
| `peer-closure` | **`--base` of the wrong schema (`{}`)** | **exit 1 (RED), not 2.** Extra: `[]`, `{"entries":{}}` and a browser report as `--base` read 1 too (§5 O-1) |
| import time | a module-scope throw in every kit module each judge loads (closure by pass 8's `gate-modules.mjs`): select 3 (`lib/floor`, `lib/sequence`, `lib/digest`), rekey 3 (`lib/follow`, `lib/sequence`, `lib/digest`), probe 2 (`lib/floor`, `gate/peer`); an unhandled rejection in each judge's first kit module; a throw in `authored/p6-publish.mjs`, which the probe loads by a computed path (extra) | 11/11 hashed exit 2, and the `p6-publish.mjs` extra exits 2. `browser-tally` loads no kit module. A throw planted in a tool's own file before its guard exits 1 (INFO): the guard's own file, as `seal.mjs` M4.1 |

**The gate** (`R/tree-probes.txt`, pass 8's hashed `crash8.sh` by path, load 27 → 15): **37 PASS, 0 FAIL**, the same two INFO rows as pass 8 (M4.1, R4). `M4 modules planted: 25`, the seal plus the same 24-module closure. Pass 7's C0-C7 by path: C0-C5 and C7 PASS, C6 INFO.

**The probe on an unbuilt tree** (`R/extra9.txt`, pass 8's `peer-unbuilt.sh` with the probe's `--base`): U0 0, U1-U3 2, **U4 (an emptied entry) now 2** (it read 0 GREEN in pass 8: cB8 O-4, P8-G4 cured), U5 0. The hashed run without `--base` read U0 and U5 as 1, because the root breaks at the base (P7-G5). That is a battery invocation defect, disclosed in §7.

**B18's inputs** (`R/b18-inputs.txt`, `R/extra9.txt`): `src/README.md` missing 2; the heading renamed 2; README empty 2; a row naming an entry the record does not publish 2. **A row whose Peer cell is blank reads 0** (§5 O-2). Controls 0.

**B17** is 0 on the replay. The pass-5/6 B17 plants inside the regression read as before (§4).

---

## §2 · S-12 and P8-R1: the capture specs

| check | result |
|---|---|
| LAW §13 states the exclusion and its reason | `K/LAW.md:377-387`: a `_` spec "writes screenshots and records into `docs/` and asserts no product behaviour", so no run selects it on either tree and no base-green key exists; B0 reads its imports (`R/select-capture.txt` SC4) |
| the selection names what it leaves out | SC1 exit 0; SC2 `specs.txt` holds 0 capture specs (155 lines); **SC3: all 14 capture specs the chain's moves touch are printed as `EXCLUDED capture …`** (14 of 14 on the tree) |
| a moved capture spec's imports are read (`R/plants9.txt`, judged by `battery/judge-rows.mjs`) | **CAP-new-01..14: each of the 14 capture specs with a broken relative import reads B0 RED** (B0 +1 each). CAP-stale: `_prim-polish-capture.spec.ts`'s `../pi-manifest.ts` pushed one dir up, B0 RED. CAP-ctl (a resolving bare import) CLEAN. NC-new (a non-capture spec, the contrast) B0 RED. 17/17 PASS |

No clause widened, so S69 and S69s stand and `seal.test.ts` needed no new case (P8-R1's conditional arm). B0 already reads the `tests-visual/` graph; the plants show it per spec.

---

## §3 · The browser bar (S-12, P7-R2)

From committed bytes, load 18-22 (`R/browser-plants.txt`, pass 8's hashed `browser-plants.mjs` by path, through `battery/tally-shim.mjs` into the pass-9 tally).

- **RD, no route tool:** base 825 keys and route 826 when duplicate titles fold; 411 folded base-green keys (18 duplicate-row), 1 not held in the full runs (blob D2).
- **The pass-9 tally** over the pair plus the six reruns: **428 base-green, 428 held, not held 0 (failed 0, absent 0)**, flaky 1. That equals pass 8's `tally.txt`, and the kit's copied reports are byte-identical to pass 8's.
- **Plants:** T1 PASS (`ABSENT`, held 427, rc 1); T2 PASS (8 keys named); T3 PASS (title-match masking still ABSENT); T4 PASS (NEW); T5 the `#n` key named.
- **S1** reads FAIL on 21 specs, the same 21 the pass-8 critic adjudicated. 7 are intermediate move targets that a later move carries on; this seat confirmed none of the 7 exists on the final tree. The other 14 are the capture specs, now excluded by statement (§2).
- **P7-R2:** pass 8's fixtures carry no `testDir`, and the pass-9 tally now refuses that, exiting 2: correct under P8-R2. Re-run with `testDir "."` added (`R/extra9.txt`), the six case lines (F1, F6, F7 NEW; F8 ABSENT; F2, F3 FLAKY) are identical to pass 8's committed `flake.txt`.

---

## §4 · Regressions

| set | result | file, load |
|---|---|---|
| the pass-8 critic's committed regression (`regress.json`, 402 rows: the 381 plants with their controls and skips; passes 4-7 inside) | **402 rows, same 402, differ 0** | `R/regress.txt`, 17 → 27 |
| the pass-8 critic's 11 hashed peer plants | 11 same, differ 0 (CAUGHT 7, CLEAN 3, MISSED-RECORD 1 = KF-dyn, recorded as LAW §5 states) | `R/p8-plants.txt`, 18 → 16 |
| P8-R3: XR-drop and its two leak variants (§7: re-run with pass 8's locator) | XR-drop: no count (MISSED-RECORD), a withdrawal read as written; **XR-drop-KF: B18 10 + B11 2; XR-drop-leaf: B18 10**, through the root's class. 3/3 | `R/extra9.txt`, 17 |
| pass 7's tree-probes (crash, peer, SFC2, pass 5-6 probes) | verdict lines identical to pass 8's. The same three FAIL lines with the same readings: CSS-DIST (LAW §5's 38 CSS doors), CASCADE-RESTORE (this env), SFC-keep (pass 6's disclosed listing defect) | `R/tree-probes.txt` |

---

## §5 · Findings outside the checklist (logged; the score does not change)

| # | finding | measurement | maps to |
|---|---|---|---|
| **O-1** | **The peer probe reads a degenerate or wrong-kind `--base` report as a verdict.** `--base {}`, `[]`, `{"entries":{}}` or a browser report each exit **1** (RED). The base is read as `base?.entries?.[key]?.broken ?? {names:[],dist:[],files:[]}` (`K/tools/peer-closure.mjs` in `main`), so a report missing the field falls back to "no breaks at the base". LAW §14 lists "a report of another schema" as a throw. This one input was not planted by the route (Bp9 §5 JUDGE lists wrong-schema for the tally and rekey only). It reads RED, never GREEN, except for a wrong-kind base: the probe's own report of a leaking tree (`floorBase: false`) passed back as `--base` reads the leak **GREEN, exit 0**. The gate reads the same tree **B18 27, exit 1** | `R/judge-throws.txt` P-base-schema; `R/extra9.txt` PX lines | S-14's hold column and P8-R2 / LAW §14 (the edict's "no masking fallbacks", which S-14 lists). It is not P8-G4, which is cured (U4 and P-empty-entry exit 2). The class's owner, B18, is unaffected (P7-R1). Cure, kit-only: throw unless `base.floorBase === true` and `base.entries` is an object |
| **O-2** | **B18 reads a declaration row with a blank Peer cell as no row.** With the `./motion-core` row's peer cell removed, the seal exits 0. `gate/peer.mjs:31` matches a row only when a peer token follows the subpath, so the line is skipped, which is a withdrawal in effect. LAW §5 (pass 9) says "a row with no peer … stays a throw", and P8-R3 says "B18 throws on a missing table, file or peer". A row whose peer cell is not a package name does throw (pass 8 and this seat) | `R/b18-inputs.txt` (hashed BI3 mislocated: §7); `R/extra9.txt` BI3-fixed rc 0 | B-10's hold (P8-R3) and the edict's "no masking fallbacks". Its effect equals XR-drop, which P8-R3 (b) rules acceptable as a reviewed source edit, and a leak still reads RED through the root (XR-drop-leaf). The defect is the LAW sentence the reader contradicts, the O-1 shape of pass 8. The cure changes `gate/peer.mjs`, so it lands with S69 re-derived |
| O-3 | **W-D.1 §0's five items are all non-zero** (Bp9 §6, P8-G7): the `fourier-field` ↔ `renderer` cycle; `Surface` names two symbols; 5 bare type aliases; the chain-added `## UNRELEASED — the structure cut (BL)` heading; 3 consumer presets in `./tokens` | Bp9 §6 (`K/results/p9/wd1-measure.txt`), not re-run here | the type aliases map to the clean-break "no aliases", which B-02 and R-6 cover at the door grain ("a door is a door, not an alias"). §P8-5 rules these W-D.1's landing work, with no checklist item. The convergence record must carry each one with its disposition. The `UNRELEASED`/`BL` heading is chain-made text |
| O-4 | **`.claude/worktrees/bl/D1/p8/B-proto/crit-tmp/` is still present.** §P8-6.2 step 1 (P8-G6) said the driver removes it. `.claude/worktrees/bl/D1/p9/` is empty | `find` before this seat's work | driver housekeeping |

**The closest calls, stated for the agglomeration.** O-1 is the case §P8-6.4's battery list names ("a throw in each kit judge (missing, non-JSON and wrong-schema inputs…): each exits 2"), and it reads 1 on the probe. Read strictly, S-14's §P8-7 hold column ("every kit judge exits 2 on a throw or a degenerate input") is not met on that one input.

This seat does not re-open S-14 on it, for three reasons:
- the task binds this seat to re-open "only on its own text", and S-14's frozen text concerns the gate;
- §P8-6.5's named re-open trigger is "an uncured P8-G2..G4", and all three are cured (§1, §2);
- the reading is fail-closed except under a wrong-kind base, which no caller passes (the toolchain and the plants pass the committed floor-base report).

If the agglomeration reads the hold column as binding over the task's own-text rule, S-14 re-opens on O-1 and the count restarts. O-2 is the same shape inside the gate, but its effect is a ruled one (a withdrawal). No finding maps to an edict clause the checklist leaves out.

---

## §6 · The 27 items

| item | verdict | closing measurement (this seat, committed under `R/`) |
|---|---|---|
| S-01 | CLOSED | kit, results, captures and copied `/2` reports committed at `b06cacc3` before this seat's hash; the pass-8 critique and §P8 committed (`git status` shows only this seat's dir untracked under `structure/`) |
| S-02 | CLOSED | B8 0, B9 0 (`seal-wt.txt`); K-REEX/D-DUAL regressions identical |
| S-03 | CLOSED | P8-R1 (a) landed (§2: LAW §13, printed 14, B0 reads 14/14). P8-R2 (a) landed in LAW §14 and four guarded judges (§1, O-1 logged). P8-R3 (b) is LAW §5's sentence; XR read as ruled (O-2 logged). P6-R1..P7-R2 held. The datum was rebound once, at S70 |
| S-04..S-08 | CLOSED | gate 19/19 on the replay; regressions 402/402 identical |
| S-09 | CLOSED | MATCH `05aaa6ed…` from committed bytes in a fresh HEAD worktree; rerun 0.5 s no-op; digest unchanged after every family |
| S-10 | CLOSED | cascade GREEN listed and RED unlisted against this seat's own floor-base snapshot; SFC2 6/6; FD4 arms PASS |
| S-11 | CLOSED | vitest 2,333 passed, 0 failed |
| S-12 | CLOSED | 428/428 held, every base-green key accounted for, from committed reports; T1-T4 PASS; P7-R2 case lines identical; capture exclusion stated and printed, and a moved capture spec's broken import reads B0 RED (14/14 + stale) |
| S-13 | CLOSED | not re-run: nothing in pass 9 touches G |
| S-14 | CLOSED | crash8 37/37 on pass 9's `seal/` (25 modules planted); B17 0; four kit judges exit 2 on 39 of 40 hashed throw and degenerate cases (44 PASS with the 5 controls) plus 4 extras, import time included; the emptied entry and the empty route report each exit 2 (O-1 logged) |
| B-01 | CLOSED | 19/19, B2 0; I7 in the regression identical |
| B-02..B-06 | CLOSED | regressions 0 differ |
| B-07 | CLOSED | B15 0; PH6/PHT6 regressions identical |
| B-08, B-09 | CLOSED | regressions; cascade GREEN |
| B-10 | CLOSED | p8 peer plants 11/11 identical; XR 3/3 as P8-R3 (b) rules; `./motion-core` free on three arms (O-2 logged) |
| B-11 | CLOSED | `--pin` and `--no-pin` refused, exit 2 |
| B-12, B-13 | CLOSED | — |

**Score: 27/27 = 100%. Re-opened: none.** Under §P2-6.5 this is the second consecutive clean critique. D1-B converges at the pass-9 agglomeration, unless it rules O-1 a re-open under §P8-6.5's hold column.

---

## §7 · Disclosures (this seat's own defects and post-hash glue)

**Battery defects, each re-run in a post-hash tool with its expectation unchanged:**
- `plants9.mjs` XR and `b18-inputs.sh` BI3 found the `./motion-core` row by a `|` cell, but `src/README.md`'s table is whitespace-columned. XR read SKIP and BI3 edited nothing (rc 0). `tools/xr9.mjs` and `extra9.sh` use pass 8's committed locator.
- `run-battery.sh` left `PEER_CMD` unset, so pass 8's `peer-unbuilt.sh` ran the probe without `--base`. U0 and U5 then read RED through P7-G5. `extra9.sh` re-runs it with the pass-8 critic's invocation.
- `flake9.sh` fed pass 8's fixtures, which carry no `testDir`, to the pass-9 tally. The tally refused them, exit 2, which is correct. `extra9.sh` adds `testDir "."`.
- `judge-throws.sh` looked for `dist/index.js`; the root entry is `dist/glass-ui.js` (INFO). `extra9.sh` empties that file: exit 2.

**One worktree.** The task fences this seat to `crit-B/wt`, so `tools/phase1.sh` took the floor base first (S1's own `floor/rows/apply.mjs`, digest `5b14c6c7…`), snapshotted the cascade and the peer probe, removed `dist/`, and ran `replay.mjs`, which resumed at S1's recorded digest and replayed S1b-S70. The whole-chain bytes are the same; the replay driver did not itself run S1. `tools/toolchain-route.sh` is `battery/toolchain9.sh`'s route half, verbatim.

**Post-hash tools:** `phase1.sh`, `toolchain-route.sh`, `xr9.mjs`, `extra9.sh`. None changes a hashed expectation.

**Scratch.** Temporary files lived in `crit-B/tmp` inside the seat dir, removed with it. One `/tmp/x8`, `/tmp/x9` pair (a probe-line diff) was created and deleted in the same command.
