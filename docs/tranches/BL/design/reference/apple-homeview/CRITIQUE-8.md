# O-95 critique, round 8: GAP (A8) on K-3 only

Seat: REF2/crit8, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 02:45–02:55 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique8/`.

**What I read.** `GAP.md` §13 (A8), the whole M-08 cell (§2), §0's A5/A6/A7 instrument rows, §3's frame-drop and momentum bullets, §5's M-08 row (M-08-RV), and §6. `CRITIQUE-7.md` in full. All 533 lines of `amend6/tools/dtgate.mjs` (sha256 `e0bfed38…5dd817`, unchanged) and all 247 lines of `amend6/tools/runtime6.py` (sha256 `474521a8…aab4`, unchanged). `amend7/tools/run7.sh`. `waves/W-F.1.md:97-100,145-152`.

**Method.** No browser, build, serve or worktree: K-3 is a source gate and a simulation on committed clocks. `src` and `W-F.1.md` are unchanged from `52f23e417` to HEAD (`git diff --stat` empty, `src` clean), so v6 read `src` in place. Every run went through `guarded --light --rss-gb 2 --timeout 10|15`; Python ran with `-I -B`. 1-min load 32.0–54.2 (`uptime` 02:47–02:50, and `load_1min_end` in each `rt8` output). None of my numbers is a timing measurement.

| Tool or input (`critique8/`) | Output (`critique8/data/`) | What it does |
|---|---|---|
| `amend6/tools/dtgate.mjs`, unchanged, with `run7.sh`'s 60 plants | `dtgate8-rerun.json`, `.stdout` | reproduces A7/A8 |
| the same gate on `plants/m01,m02,n01,n02` and `critique7/plants/k*` | `dtgate6-on-m.json`, `.stdout` | my plants, one per tested sentence |
| `tools/rt8.py` | `rt8-step0.1.json`, `.stdout` | execs `runtime6.py` lines 1–203 unchanged (its definitions and the measured clocks; sha256 checked in the output), then runs its own `run()` at every 0.1 ms between runtime6's grid points inside each band GAP says it catches |

Hashes of my plants and tool: `critique8/data/sha256.txt`.

Re-run, from `apple-homeview/`:
- `DTGATE_OUT=critique8/data/dtgate8-rerun.json node amend6/tools/dtgate.mjs <glass-ui root> amend5/plants/*.ts critique5/plants/*.ts amend6/plants/*.ts amend7/plants/*.ts`
- `DTGATE_OUT=critique8/data/dtgate6-on-m.json node amend6/tools/dtgate.mjs <glass-ui root> critique8/plants/*.ts critique7/plants/*.ts`
- `python3 -I -B critique8/tools/rt8.py critique8/data/rt8-step0.1.json 0.1`

**Verdict: AMEND.** The v6 sentences hold under the ruling: every v6-PASS counterexample I could build is in the complement as A8 defines it. The A8 diff is K-3 text only, and M-08-RV names its owner and its closing pass. One runtime-arm sentence does not follow from its files. GAP says runtime6 catches "a kept `min` clamp below 200 ms (stall clock below 48 ms)". runtime6's grid holds 180 and 200 only, and its own `run()` passes a 199.3–199.9 ms clamp and, on the stall clock, a 47.2–47.9 ms clamp. No unfinished tree escapes the conjunction this way, since v6 fails both (S3, `Math.min`). But the number GAP states is not the one runtime6 produces.

## K-3

| Check | Result | Decided by |
|---|---|---|
| A8 changes only K-3 text | **PASS** | `git diff -U0 52f23e417 HEAD -- GAP.md`: two hunks, the M-08 row (`:205`) and the new §13. A character diff of the M-08 row shows exactly the A8 strike and qualifier on the A5 sentence, "exactly" → "only", the approximate-description lead, and the `k01`/`k03`/`k04`/`k05` examples. The working tree's GAP.md equals HEAD |
| v6 numbers | **PASS** | `dtgate8-rerun.json` is byte-identical to `amend7/data/dtgate7.json`. HEAD FAILs in five files (`useBlobPointer` 2 sinks + 1 hand, `constellationInteraction` 2 hand, `clock` 1, `useLeadTrail` 1, `usePointerVelocityField` 2). 41 review lines in 23 files. 60 of 60 plants as expected (PASS 9/9, FAIL 0/40 pass, RESIDUAL 11/11). F1-G4's regex passes all 60 |
| "v6 FAILs a file only in these four cases" | **PASS** | `:477`: a file fails only on `violations` (S3, `:392-438`), `unresolved` (S4, `:355-387`, `:423`), `hand` (S1, `:200-219`) or `indirect` (S2, `:191-199`), each collected only on the slice from a direct sink (`:186`, `:440`, `:458-462`) |
| S1–S4 / E1–E4 under-catch | **PASS under the ruling** | Each v6-PASS plant inside a description (CRITIQUE-7's `k01`, `k03`, `k04`; my `n02`) is complement by A8's "the cited source lines are its definition" |
| **runtime arm: "a kept `min` clamp below 200 ms (stall clock below 48 ms)"** | **FAIL** | `rt8-step0.1.json` (1,900 clamp values, 10.0–199.9 ms): runtime6 passes 199.3, 199.4 … 199.9 ms. At 199.2 the 400 ms block fails it; at 199.3 all three arms pass. Stall arm alone (10.0–48.0 ms): it passes 47.2–48.0 ms (lag growth 2.9 / 3.0 ms at 47.2; 3.0 / 3.1 at 47.1) |
| runtime arm: drop / rebase "above a threshold of up to 400 ms (it passes from 401 ms)" | **PASS** | 3,801 values each, 20.0–400.0 ms: none passes. 400.5 passes, which GAP does not claim either way |
| runtime arm: soft "S up to 1500 ms" | **PASS** | 1,451 values, 50–1500 ms at 1 ms: none passes |
| runtime arm: timer "50 or 100 ms … on all 10 phases" | **PASS** | `runtime6.json`: 0 of 10 phases pass for 50 and 100 ms; 250 ms passes on 2, 500 ms on 3 (the A6 bullet's 8 and 7 of 10 caught) |
| M-08-RV names an owner and a closing pass | **PASS** | §5: W-F.1's seat, placed under item 8 (`W-F.1.md:99`, G-29's fence), closed at the §10 "Wave" pass (`W-F.1.md:151`). It is a full human review of every `tickDt`/`tickToTime`/`tickVector` call's argument, receiver and run condition across files and tasks, plus every step with no such call. v6's output is a reading aid |

### The false sentence, verbatim, with its counterexample

The sentence appears twice in the M-08 cell (§2, `GAP.md:205`):
1. A6 bullet: "**The runtime arm fails** (`runtime6.json`, measured clocks, witness form; …):<br>&nbsp;&nbsp;– a kept `min` clamp below 200 ms (stall clock below 48 ms)"
2. A7 paragraph: "**The runtime arm** (unchanged, `runtime6.json`) fails five policies on W-F.1's closed form, at these parameters only: a kept `min` clamp below 200 ms (stall clock below 48 ms); …"

Counterexamples, each run through runtime6's own `run()` on its own clocks:
- `min(dt, 199.5)`: block 45, 150 and 400 witnesses pass, stall passes → `runtime_arm_pass: true`. The same holds for 199.3–199.9. Plant `critique8/plants/m01-clamp-199-5.ts`: v6 FAIL (`call Math.min(…)`), so the conjunction still catches it.
- `min(dt, 47.5)` on the stall clock: lag growth ≤ 3 ms on both readable hops → the stall arm passes; the same holds for 47.2–47.9. Plant `m02-clamp-47-5-stall.ts`: v6 FAIL.

Why it is a K-3 failure and not a note: the brief's test is that each sentence about what runtime6 catches follows from the files. `runtime6.json` samples 180 and 200 and nothing between, and runtime6 itself contradicts "below 200" and "below 48". CRITIQUE-6 note 1 raised the 180 → 200 gap, and A7 kept the wording without a re-run. Neither form is a both-arm escape, so the residual and M-08-RV are unaffected.

**Amend** (wording only, no gate or tool change): in both places, "a kept `min` clamp up to 199.2 ms (stall clock up to 47.1 ms), on a 0.1 ms grid (`critique8/data/rt8-step0.1.json`)". The other choice is to add 181–199.9 to runtime6's grid and cite its output. The change-log rows at `GAP.md:433` ("sees clamps below 48 ms") and `:449` ("below 200 ms") record what earlier amends said. They need no edit unless the driver treats change logs as live claims.

## Notes (outside the checklist; they do not change the verdict)

1. **§0's v6 row still says more than v6 does, and A8's qualifier does not sit beside it.** It says "Any other reference to those names (`.bind`, `x["tickDt"]`) fails the file". My `n02` (``lead[("tickDt")]``, a parenthesized string key; `:198` tests `isStringLiteral` on the unparenthesized argument) passes v6, and so does CRITIQUE-7's `k04`. The same row says "Hand: A5's, unchanged", and A5's row (`GAP.md:83`) still says "A file that steps a damped oscillator by hand (… any names) fails". Under the ruling these are complement forms and do not fail K-3. A pointer such as "(approximate; M-08's catch list and its cited lines govern)" on that row would keep a reader of §0 alone from over-trusting v6.
2. **"v6 reads nothing else. It does not read … a property read off an allow-listed global" is wider than the code in the safe direction.** `n01` writes `(window as any).__dt = Math.min(…)` and passes `(window as any).__dt` to `tickDt` in the same file. v6 follows `.__dt` by name (`:420-425`) and FAILs it. The sentence holds for a write in another file (`c04`/`c06`), which is what it is there for. An over-read cannot pass unfinished work.
3. §0's A6 row lists "a `requestAnimationFrame` or `performance` that is a local or an import" as UNRESOLVED. In the code, a local `performance.now()` fails as a disallowed call (S3, `calleeOk` `:96-98`), not as S4. Either way the file fails.
4. `W-F.1.md:151`'s "Wave" bullet as written is "F1-G1..G9 green in one run". M-08-RV reaches it only as an addendum W-F.1's seat places under item 8. GAP says so, and K-10 accepted it at round 7.
5. Hygiene: `critique8/` holds four plants, `rt8.py` (it execs runtime6's unchanged lines from the file and copies no code), JSON and stdout outputs, and hashes. It holds no Apple code or media. I did not touch `samples/source/` or `tools/__pycache__/`. I created no worktree, so none needs removing, and nothing was left running.
