# critique-B pass 7 · results (index of raw outputs)

Seat `claude-opus-5-5`. Every file here is the output of a command this seat ran on 2026-10-08/09 (UTC 00:37-01:05) in
its own worktrees `.claude/worktrees/bl/D1/p7/crit-B/{wt,base}`, both removed with `git worktree remove --force`.
Checkout HEAD `145138f2` (one docs-only commit past the kit commit `6154d6ec`; `git diff f05d8555 145138f2 -- . ':!docs'`
empty; `docs/tranches/BL/design/structure` unchanged since `6154d6ec`). Loads (`sysctl -n vm.loadavg`) are at the head and
foot of each file.

| file | what | headline |
|---|---|---|
| `replay-1.txt` | the kit's `replay.mjs` from committed bytes, fresh HEAD worktree | 381.8 s, `chain final MATCH`, digest `52cca0fe…574aea` over 1582 files; load 37 → 18 |
| `replay-rerun.txt` | rerun after the replay, and again after every battery | 0.3 s and 1.3 s, same digest |
| `floor-base.txt` | second worktree, kit's `truncate-seq.mjs S1` on its own copy, replay, build, cascade snapshot | digest `5b14c6c7…` over 1354 files; snapshot `cascade-base-snap/` byte-identical to the kit's committed `results/p7/cascade/baseline` except the label and path in `manifest.json` |
| `seal-wt.txt`, `seal-wt.json` | `seal.mjs --root wt` | 18/18 PASS, exit 0; files 1580 (`filesScope` "the five zones and the root files"), edges 8330, modules 140/140, pin 140/120/1283/2 |
| `cascade-p6-listed-reorders.txt` | `cascade verify` wt vs this seat's floor-base snapshot, the kit's scoped listing | GREEN rc 0; `./styles` moved 28 risks 0, `./styles.css` moved 10 risks 0 |
| `cascade-nolisting.txt`, `cascade-listed-reorders.txt` | the same with no listing / the scope-less pass-4 listing | RED rc 1 (content changed) |
| `toolchain.txt`, `logs/vitest.log` | vue-tsc ×2, demo build, verify:package, vitest | all 0; verify:package CLEAN, unpackedBytes 2,920,401 = datum, equal, increase false; full vitest 2327 passed, 3 failed (boot-graph build arm: no `dist-demo` before `demo:dist:build`, P5-G5), 24/24 after the build |
| `plants.txt/.json` | hashed `plants.mjs` (I7, KF, DT), `--group` | I7 6/6 CAUGHT by B3 (+B8/B10 where stated), control CLEAN; KF-new/KF-existing read by B11 (pin, no-reader) and B1/B4/B9; KF-leaf, KF-deep MISSED by every clause; DT on chip's entry door SAME-AS-CTL (pin only); DT-eyeglass SKIP (no `Tabs.vue`) |
| `extra-plants.txt/.json` | `tools/extra-plants.mjs` (after the hash): the DT shape on the internal selection door | test-only reader (tabs slot, slider slot) and no reader: B11 gains `exports EYEGLASS_SPAN_MAX (no reader outside …)`, which the library-reader control does not gain (clause-grain contrast reads SAME-AS-CTL; line-grain CAUGHT) |
| `kf-peer.txt` | `tools/kf-peer.mjs`: each KF plant through the hashed `peer-closure.mjs` | base 0 (38 files); KF-new, KF-leaf, KF-deep, KF-existing each 1 with the chain to keyframes.js; restored 0 |
| `kit-peer-plants.txt`, `logs/kp-*.txt` | the kit's `tools/peer-closure.mjs --base …` with KF-leaf / KF-deep overlays, and with no overlay on an unbuilt tree | leaf, deep: RED exit 1 (`./motion-core` BROKEN); unbuilt, no overlay: `dist {"missing": …/dist/motion-core.js}`, `peer-closure: GREEN`, exit 0 |
| `regress.txt/.json` | hashed `regress.mjs`: pass 6's 106 + 6 extras + its 259 regressions | 371: CAUGHT 326, CLEAN 32, FALSE+ 11, OTHER 5, UNNAMED 6, SKIP 1 — row for row pass 6's classes (B0 computed-path controls, VIS-in-L/PH6-CTL-test harness subjects, B2 deep paths by B0, runner mark artefacts) |
| `tree-probes.txt` | hashed `tree-probes.sh`: crash.sh, peer-closure, sfc2.sh, pass 6's tree-probes | below |
| `browser-rederive.txt` | `tools/browser-rederive.mjs` on the kit's committed `/2` reports | base-green 394 (+18 duplicate-title keys), new failures 2: D2 (route `unexpected`) and `tests-visual/aurora/w38-binding.spec.ts :: W38/W47 binding …` (base `expected`, **absent from the route report**) |
| `select/` | the kit's `browser-select.mjs` + `browser.mjs --select-only` on wt | `moved.json`, `changed.txt` byte-identical to the kit's; 154 specs, identical set; `w38-binding.spec.ts` not selected though the chain moves it (S43b) |
| `browser/w38-binding.txt/-wt.json` | `browser.mjs --specs tests-visual/aurora/w38-binding.spec.ts` on wt | GREEN 4/4 (the spec + π floor), 49 s, load 15.5 |

## tree-probes.txt, condensed

```
CRASH C0-green PASS rc=0 · C1-red PASS rc=1 · C2-ledger PASS rc=2 ("seal: no verdict: … opaque-ledger.json")
CRASH C3-pkgjson FAIL rc=1 expect=2 :: SyntaxError … at scripts/structure/lib/tree.mjs:17 (module evaluation, before main())
CRASH C4-noroot PASS rc=2 · C5-jsonpath PASS rc=2 · C6-unparsable INFO rc=0 · C7-green-again PASS rc=0
PEER motion-core 0 files=38
SFC2 (Blob.vue → BlobShade.vue + BlobRim.vue): none RED · scopes-only RED (2 moved) · listed GREEN · one-scope RED · value RED · restore GREEN
P6 tree-probes: PIN-OPT/NOPIN refused rc=2; GATE-PURE PASS; PW-PROGRAM missing 0; REORDER-acc/out RED; RATCHET CLEAN;
  CSS-DIST "FAIL" = the 38 LAW §5 CSS doors (pass 6's reading); SFC-keep FAIL = pass 6's disclosed listing-procedure defect
  (SFC-value PASS, SFC-RESTORE PASS); CASCADE-RESTORE FAIL = this seat's CASCADE_VERIFY passed the route listing to a
  self-snapshot verify: re-run with no listing GREEN rc 0, with the route listing RED (logs/tp/restore-*.log); FD4 A/G/G2/U PASS
```
