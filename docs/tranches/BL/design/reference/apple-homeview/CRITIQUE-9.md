# O-95 critique, round 9: GAP (A9) on K-3 only

Seat: REF2/crit9, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 02:50–03:00 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique9/`.

**What I read.** `GAP.md` §14 (A9) and §13 (A8), the whole M-08 cell (§2, `GAP.md:205`), §0's A5/A6/A7 instrument rows, §3's frame-drop and momentum bullets, §5's M-08 row (M-08-RV) and §6. `CRITIQUE-7.md` and `CRITIQUE-8.md` in full. All 533 lines of `amend6/tools/dtgate.mjs` (sha256 `e0bfed38…5dd817`, unchanged) and all of `amend6/tools/runtime6.py` (sha256 `474521a8…aab4`, unchanged). `waves/W-F.1.md:97-100,145-152`.

**Method.** No browser, build, serve or worktree: K-3 is a source gate and a simulation on committed clocks. `src` and `W-F.1.md` are unchanged from `52f23e417` to HEAD `e7643fe61` (`git diff --stat` empty, `src` clean), so v6 read `src` in place. Every run went through `guarded --light --rss-gb 2 --timeout 10|15`; Python ran with `-I -B`. 1-min load 20.6–26.9 (`uptime` 02:54 and 02:57, and `load_1min_start`/`_end` in `rt9.json`). None of my numbers is a timing measurement. No worktree was created, so none needed removing; nothing was left running.

| Tool or input (`critique9/`) | Output (`critique9/data/`) | What it does |
|---|---|---|
| `amend6/tools/dtgate.mjs`, unchanged, with `run7.sh`'s 60 plants | `dtgate9-rerun.json`, `.stdout` | reproduces A7/A8/A9 |
| the same gate on `plants/s01…s08` | `dtgate6-on-s.json`, `.stdout` | my plants, one per tested sentence |
| `tools/rt9.py` | `rt9.json`, `.stdout` | execs `runtime6.py` lines 1–203 unchanged (sha256 in the output) and calls its own `run()` where CRITIQUE-8's sweep did not reach |

Hashes of my plants and tool: `critique9/data/plants-s.sha256`.

Re-run, from `apple-homeview/`:
- `DTGATE_OUT=critique9/data/dtgate9-rerun.json node amend6/tools/dtgate.mjs <glass-ui root> amend5/plants/*.ts critique5/plants/*.ts amend6/plants/*.ts amend7/plants/*.ts`
- `DTGATE_OUT=critique9/data/dtgate6-on-s.json node amend6/tools/dtgate.mjs <glass-ui root> critique9/plants/*.ts`
- `python3 -I -B critique9/tools/rt9.py critique9/data/rt9.json`

**Verdict: UPHELD.** Every remaining sentence about what runtime6 catches follows from its own `run()`, including where CRITIQUE-8 did not test: below 10 ms for a clamp, below 20 ms for drop and rebase, and below 50 ms for the soft bound. For drop and rebase the check is exhaustive over [0, 400]. Each v6 sentence outside the catch list that I could plant against holds. The one v6 escape I found (`s04`) falls under the catch list's "approximate, the cited lines govern" lead, so it is a complement member. M-08-RV names its owner and its closing pass. The diff from `52f23e417` changes only K-3 text.

## K-3

| Check | Result | Decided by |
|---|---|---|
| A8 and A9 change only K-3 text | **PASS** | `git diff 52f23e417 -- GAP.md`: three hunks. §0's v6 row (`:92`, the A9 Sinks and Hand qualifiers), the M-08 row (`:205`, A8's strike, the "only" and approximate-description lead, the complement examples, and A9's two runtime-clamp restatements), and the new §13/§14. The word diff holds nothing else. The working tree's GAP.md equals HEAD |
| v6 numbers | **PASS** | `dtgate9-rerun.json` is byte-identical to `amend7/data/dtgate7.json` (`cmp`). HEAD FAILs in five files (`useBlobPointer`, `constellationInteraction`, `clock`, `useLeadTrail`, `usePointerVelocityField`). `springProjection` passes. 41 review lines in 23 files. 60 of 60 plants as expected (PASS 9/9 pass, FAIL 40/40 fail, RESIDUAL 11/11 pass). F1-G4's regex passes all 60 |
| §0 A9: ".bind, a plain string key `x["tickDt"]` fail the file" | **PASS** | `s01` (`lead.tickDt.bind(lead)` then a 500 ms `Math.min`) and `s02` (`const f = lead["tickVector"]; f.call(…)`) both FAIL as indirect sinks |
| §0 A9 Hand / S1: literal `2` | **PASS** | `s05` writes the damping term as `v * 2 * z * w` (the `2` mid-product) and FAILs as hand-rolled. `s08` (`2.0`) passes, which is what A9 says |
| S3 on a direct sink | **PASS** | `s07` `lead.tickDt?.(Math.min(…))` FAILs on the call |
| S4 listed shapes | **PASS**, with one complement member | `s03` (a catch binding) and `s06` (a parameter of a function handed to `setTimeout`) FAIL as UNRESOLVED. `s04` (`declare frameDt: number` as a class field, `this.lead.tickDt(this.frameDt)`) **passes**. `:176` records a `declare`d class field as a definition of `.frameDt`, so `:423`'s "no in-file write" test never fires. S4 reads "`this.p` with no in-file write of `.p`", and a `declare` is not a write, so the description is wider than `:423`. A8's lead covers exactly this case ("where a description reads wider than the code the code governs and the form is in the complement"). `s04` is a dt written in another file, the `k05` kind, and M-08-RV reads it |
| runtime: "a kept `min` clamp up to 199.2 ms (stall clock up to 47.1 ms), on a 0.1 ms grid" | **PASS** | `rt9.json`: 0.1–10.0 ms at 0.1 has no passing clamp for the full arm or for the stall arm alone. CRITIQUE-8 covered 10.0–199.9 and 10.0–48.0. Off the grid, 4,000 seeded-random clamps in (0, 199.2] and 1,500 in (0, 47.1] on the stall arm alone also have none passing |
| runtime: "a frame dropped or rebased above a threshold of up to 400 ms" | **PASS, exhaustive** | `run()` is piecewise constant in T between the frame intervals it compares. Those are 238 distinct values on the block-150, block-400 and stall clocks plus the ideal 8.333 ms frame, with a minimum of 4.1 ms and a maximum of 400.5 ms. T = 0 and every interval ≤ 400 cover every T in [0, 400]: 237 values per policy, none passes. The one limit is float noise of order 1e-12 on the ideal clock's frame |
| runtime: "soft `S·dt/(S+dt)` with S up to 1500 ms" | **PASS** | 0.1–50 at 0.1 (500 values) and 2,000 seeded-random values in (0, 1500]: none passes |
| runtime: "a 50 or 100 ms timer … on all 10 phases" | **PASS** | at a 0.5 ms phase step (100 and 200 phases), none passes |
| M-08-RV names an owner and a closing pass | **PASS** | §5: W-F.1's seat, placed under item 8 (`W-F.1.md:99`, G-29's fence) and closed at the §10 "Wave" pass (`W-F.1.md:151`). It is a full human review of every `tickDt`/`tickToTime`/`tickVector` call's argument, receiver and run condition across files and tasks, plus every step with no such call. v6's output is a reading aid, and a v6 PASS discharges nothing |

No false sentence remains, so there is nothing to amend.

## Notes (outside the checklist; they do not change the verdict)

1. **§5's copy of the hand clause is still wider than v6.** The M-08 row in §5 reads "no file steps a damped oscillator by hand under any name (**A6:** in the `X·X·(…) + 2·…·X` shape only; …)", and next to it, "the addendum's gate is v6". `s08` and CRITIQUE-7's `k03` (`- 2.0 * z * w * v`) fit that written shape and pass v6. §0 now says "a literal-`2` shape only" (A9), and the M-08 cell's copy was struck (A8). The ruling treats every S1 description as approximate, and CRITIQUE-8 handled the §0 copies as notes, so this is one too. A pointer such as "(M-08's S1; a literal `2` only)" would make the three copies agree.
2. **`s04` could join the complement examples**: a `declare`d (or `!`-asserted, uninitialised) class field read as `this.p` is not UNRESOLVED.
3. The blind-side sentences hold on what I ran. Clamps of 199.3–1000.0 at 0.1 (8,008 values) all pass, as does drop or rebase at 400.5, 401, 450, 500, 1000 and 5000, and soft S at 2000–20000 in steps of 50 (361 values). These are claims of blindness, not of catching, so they are recorded here only.
4. §14's table has a blank line between its two rows, so the second row ("§0 v6 row notes …") renders as a stray paragraph and not as part of the table.
5. Hygiene: `critique9/` holds eight plants, `rt9.py` (it execs runtime6's unchanged lines from the file and copies no code), JSON and stdout outputs, and hashes. It holds no Apple code or media. I did not touch `samples/source/` or `tools/__pycache__/`.
