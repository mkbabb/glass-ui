# critique-B pass 9 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-9 (the pass-6, -7 and -8 critiques included).
Written and hashed BEFORE reading `pass-9/B-kit/` or `pass-9/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen),
status §P8-7, 27 items; bar §P8-6.4. Rulings: R-1..R-10 as amended, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5,
P5-R1..P5-R5, P6-R1..P6-R3, P7-R1..P7-R2, P8-R1..P8-R3.

Entry points: `run-battery.sh <KIT> <built tree> <scratch> <results>` (every family below, in order) and
`toolchain9.sh <KIT> <tree> <floor-base tree> <results>` (the bar's toolchain). Earlier critics' files are run by path
from their committed bytes, never copied.

## §P8-6.4 plants

| plant (§P8-6.4 text) | file | expect | item |
|---|---|---|---|
| a throw in each kit judge from missing, non-JSON and wrong-schema inputs, and no arguments | judge-throws.sh T-/R-/S-/P- families (browser-tally, rekey, browser-select, peer-closure), each with a control at 0 | 2 each | S-14 (P8-R2) |
| (same, import time) a module-scope throw in every kit module each judge loads; an unhandled rejection | judge-throws.sh M-*, MR-* | 2 each (the tool's own file INFO) | S-14 (P8-R2: "install the seal.mjs guard first and load their work after it") |
| an emptied dist entry | judge-throws.sh P-empty-entry:motion-core.js (and index.js) | 2 | S-14 (P8-R2, cB8 O-4) |
| an empty route report | judge-throws.sh T-route-empty (and T-base-empty, R-base-empty) | 2 | S-14 (P8-R2) |
| a moved `_*` capture spec with a broken import | plants9.mjs CAP-new-NN (every capture spec), CAP-stale; CAP-ctl, NC-new | RED; control CLEAN | S-12 (P8-R1 (a)) |
| the capture exclusion stated and printed | select-capture.sh SC1-SC4 | PASS; SC4 printed and read | S-12 (P8-R1 (a)) |
| XR-drop and its two leak variants, as P8-R3 rules | plants9.mjs XR-drop (no throw), XR-drop-KF, XR-drop-leaf (B18) | as stated | B-10 (P8-R3 (b)) |
| B18 throws on a missing table, file or peer (P8-R3 (b)'s LAW sentence) | b18-inputs.sh BI1-BI4 | 2 each, controls 0 | B-10, S-14 |
| crash8's 37 and the 24-module closure against pass 9's `seal/` | pass-8 `tree-probes.sh` by path (crash8.sh with gate-modules.mjs) | as pass 8: 37 PASS | S-14 |

## Regressions

| set | file | judged by |
|---|---|---|
| the pass-8 critic's 381 rows (passes 4-7 inside) | regress9.mjs (`--group`) | compare.mjs vs `pass-8/critique-B/results/regress.json`, 0 differ |
| the pass-8 critic's 11 hashed peer plants | `pass-8/critique-B/battery/plants.mjs` by path | compare.mjs vs `pass-8/critique-B/results/plants.json` |
| pass-8 tally plants RD, T0-T5 over the committed pass-8 reports, through the pass-9 tally | `pass-8/.../browser-plants.mjs` + tally-shim.mjs | T1-T4 PASS; RD 428 held |
| P7-R2 protocol F1-F8 | flake9.sh (pass-8 flake-cases.mjs fixtures) | same case lines as pass-8's flake.txt |
| pass 7's tree-probes (crash, peer, SFC2, pass 5-6 probes), and pass-8 peer-unbuilt U0-U5 | pass-8 `tree-probes.sh` by path | as pass 8 (U4 now owed 2 under P8-R2) |

## One probe per item

| item | probe |
|---|---|
| S-01 | `git log`/`git ls-files pass-9/`: kit and results committed before this seat; the pass-8 critique committed |
| S-02 | gate B8 0, B9 0 |
| S-03 | P8-R1..R3 landed: select-capture, plants9, judge-throws, b18-inputs; LAW sentences read; datum rebound once |
| S-04..S-08, S-11, S-13 | gate 19/19 on the replay; vitest (toolchain9); regressions |
| S-09 | replay MATCH from committed bytes in a fresh HEAD worktree; rerun a no-op; digest after every family (run-battery) |
| S-10 | toolchain9 cascade GREEN listed / RED unlisted vs own floor-base snapshot; pass-7 SFC2 via tree-probes |
| S-12 | browser-plants RD/T0-T5, flake9, select-capture, plants9 CAP-* |
| S-14 | crash8 (by path), judge-throws, b18-inputs |
| B-01..B-09, B-11..B-13 | gate 19/19; regressions 0 differ; NOPIN/PIN-OPT probes in tree-probes |
| B-10 | p8 peer plants, XR family, peer probe dist arm |
