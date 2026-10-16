# O-95 critique, round 5: GAP (amend 5) against the frozen checklist K-1..K-10

Seat: REF2/crit5, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 02:03–02:15 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique5/`.

**What I read.** First `GAP.md` §10, the A5 change log (working tree; A5 and `amend5/` are uncommitted). Then the A5 header and instrument table in §0, the M-08 cell, §3's A5 paragraph, the M-08 row of §5 and §6's A5 lines. I read `CRITIQUE-4.md` in full and `CRITIQUE-3.md`'s items. I read the A5 tools in full (`dtgate.mjs`, `clamp5.py` lines 1–107 and 195–230, `stretch5.py` head) and the plants `p01`, `p04`, `p05`, `p06`, `p11`, `p15`, `p16`, `p18` and `p20`. In the waves I read `W-F.1.md:43,85-99,184-186`. In `src` I read `springPresets.ts:80-90` and grepped `tickDt|tickToTime|springStepper`.

**Method.** No browser, no build and no worktree. K-3 is a source gate plus a simulation, so both run on files. I ran A5's gate and simulations from copies under `critique5/tools/` whose only change is the output path, so no `amend5/` output was overwritten. I then ran six plants of my own through the gate. I also wrote one independent closed-form ceiling check, and re-ran CRITIQUE-4's rederiver and the K-8 verdict-column diff. Every run used `guarded --light --rss-gb 2 --timeout 5|10`, and the Python ran with `-I -B`. The 1-min load was 73.5, 33.3, 23.4 and 22.0 (`uptime`, 02:05–02:08). None of my numbers is a timing measurement.

| Tool (`critique5/tools/`) | Output (`critique5/data/`) | What it does |
|---|---|---|
| `dtgate-copy.mjs` | `dtgate-c5.json` | `amend5/tools/dtgate.mjs` with the output path read from `DTGATE_OUT` (one-line diff; sha256 of the original `5c5d53ee…78ed`), run on HEAD, A5's 22 plants and my `critique5/plants/e0*.ts` |
| `summ.py` | (stdout) | one line per plant: expected verdict, gate, F1-G4 |
| `clamp5-rerun.py`, `stretch5-rerun.py` | `clamp5-rerun.json`, `stretch5-rerun.json` | A5's tools, output path changed |
| `rederive4-rerun.py` | `rederive4-rerun.json` | CRITIQUE-4's `rederive4.py`, output path changed |
| `ceiling5.py` | `ceiling5.json` | my own closed-form `dock` stepper (0.30 s, ζ 0.88): the smallest kept clamp a 150 / 400 / 1000 ms block one frame after launch can see |
| `verdicts.py` | (stdout) | the verdict cell of every §2 row at `c8039be39` against the working tree |

Re-run, from `apple-homeview/`:
- `DTGATE_OUT=critique5/data/dtgate-c5.json node critique5/tools/dtgate-copy.mjs <glass-ui root> amend5/plants/*.ts critique5/plants/e0*.ts`
- `python3 -I -B critique5/tools/summ.py critique5/data/dtgate-c5.json`
- `python3 -I -B critique5/tools/ceiling5.py`
- `python3 -I -B critique5/tools/verdicts.py c8039be39 <glass-ui root> GAP.md`

**Verdict: AMEND.** Nine of the ten K-rows pass, and K-3 fails again. A5's own files reproduce exactly: HEAD FAIL, 22 of 22 plants as expected, and `clamp5` and `stretch5` identical. A5 also says that a kept clamp "of any name and any size fails the conjunction" of the runtime arm and the new source arm. That is false. A renamed `STEP_CAP_MS = 500` clamp passes the source arm in three ordinary forms:
- destructured out of a frame record
- written through an index
- read from an imported clock module

At 500 ms the clamp is above every runtime ceiling. A5's own `clamp5.json` scores it 0.00 px on all nine block hops, with no lag growth on the stall clock. A long-frame skip written as an early `return` also passes the source arm, at any threshold.

## K-rows

| K | Row | PASS / FAIL | Decided by |
|---|---|---|---|
| K-1 | R-02: addendum withdrawn, in-flight retarget legs, continuity clause | **PASS** | `critique5/data/rederive4-rerun.json` matches `critique4/data/rederive4.json` on all 6 keys; `amend4/data/gui/retarget-mf-r1/r2-1440` (load 23.5–40.9) |
| K-2 | CR-03: the E1 limit and the F1-G1/G2 routing struck; a pasted `linear()` fails | **PASS** | same re-run; the plants `enter3-*-h500-plant-{linear,token,rafspring}` are unchanged since round 4 |
| K-3 | M-08: a renamed, raised clamp must fail the witness | **FAIL** | `critique5/plants/e02`, `e03`, `e04`, `e06` → `critique5/data/dtgate-c5.json` (gate PASS); `amend5/data/clamp5.json` → `by_clamp.500` (0.00 px, all hops); see §1 |
| K-4 | P-21a: an unguarded witness that fails HEAD | **PASS** | `jump4-r1/r2-1440`, unchanged; rederive re-run identical |
| K-5 | R-04, with P-12/P-13/P-14 read by the entrance witness | **PASS** | `amend4/data/apple/intro-*`, unchanged. A5 changes only the tempo wording (note 4) to "four springs on three tempos", which matches CRITIQUE-4 §5's fits |
| K-6 | E0 and never-replays computed by a tool | **PASS** | `entrance4.py` E0 and NR, unchanged |
| K-7 | a worm-length continuity clause | **PASS** | W3 unchanged. The new W4 reproduces (`stretch5-rerun.json` matches `amend5/data/stretch5.json`); see §2 |
| K-8 | every MATCH or EXCEED row re-derives from committed samples | **PASS** | `verdicts.py`: 59 §2 rows at `c8039be39` and in the working tree, no verdict cell changed. No committed sample under `apple-homeview/` is modified (`git status`) |
| K-9 | goo, breath and momentum follow from the samples | **PASS** | §3's A5 paragraph: the W4 values reproduce, and the labels are unchanged. The momentum sentence "the A5 source arm fails it at any size" is K-3's fault, not a label's |
| K-10 | every SHORT or ABSENT routing names an owning wave or loop | **PASS** | M-08 → W-F.1 items 1–2 (`W-F.1.md:85-93`), with the F1-G4 addendum placed under item 8, G-29 (`:99`). The mechanism owner is right; the gate's reach is K-3's fault |

### 1 · K-3 (M-08): FAIL

**What reproduces.** The gate on HEAD fails. `useBlobPointer.ts:174-175` reaches `Math.min` at `:159`, and five files are flagged as hand-rolled, as GAP says. `springProjection.ts` passes. The HEAD block of my output is byte-identical to `amend5/data/dtgate.json`, and so are A5's 22 plant verdicts: 6 pass, 16 fail, and F1-G4's regex passes all 22. `clamp5-rerun.json` and `stretch5-rerun.json` are identical to A5's. On the measured clocks the smallest kept clamp that passes is 50 / 140 / 180 ms by the simulation tolerance and 40 / 140 / 200 ms by the witness form. On the stall clock it is 48 ms. The ceiling is near the settle time: 208 / 231 / 231 ms to tolerance.

**What fails.** The source arm's slice keeps only `VariableDeclaration`s with an identifier name, assignments whose left side is an identifier or `obj.prop`, and parameters. It never treats an imported binding as an exit, and its sink guards are ancestors of the sink only. Four plants of mine, each a stepper module like A5's, pass it, and F1-G4's regex passes them too:

| Plant (`critique5/plants/`) | Unfinished form | Gate | Why the slice misses it |
|---|---|---|---|
| `e02-destructured.ts` | `const frame = { dt: Math.min(now − last, STEP_CAP_MS) }; const { dt } = frame; lead.tickDt(dt)`, `STEP_CAP_MS = 500` | **PASS** | a binding-pattern declaration is never recorded as a definition, so `dt` has none and the walk stops |
| `e04-indexed.ts` | `slot[0] = Math.min(now − last, STEP_CAP_MS); lead.tickDt(slot[0])`, 500 | **PASS** | an element write is never recorded; `slot` resolves to its initialiser `[0]` |
| `e03-imported-clock.ts` + `frameClock.ts` | `lead.tickDt(frameClock.dt)`, with `frameClock.dt = Math.min(now − frameClock.last, STEP_CAP_MS)` (500) in the imported module | **PASS** | an imported binding with no in-file definition is silently clean. The EXIT clause (UNRESOLVED) fires only for parameters, and the provider file has no sink, so it is never read |
| `e01-early-return.ts`, `e06-early-return-500.ts` | `if (dt > LONG_FRAME_MS) return;` before `lead.tickDt(dt)` (200 / 500 ms): a long frame dropped, the class of A5's own `p15` | **PASS** | the early `if` is a sibling of the sink, not an ancestor, so `guards()` never sees it |

**The runtime arm passes the same trees.** A kept 500 ms clamp gives `err_px` 0.00 and `witness_shift_ms` 0.0 on all nine block hops (`amend5/data/clamp5.json` → `A measured block clocks` → `by_clamp.500`). Its stall-clock growth is 0.0 ms for any clamp of 52 ms or more (`B lag-growth arm`). The measured clocks' largest frame is 400.5 ms (`block 400` → `frameDt.max`), so a 500 ms skip threshold never fires on any of them either. My own ceiling (`ceiling5.json`) puts the most a 400 or 1000 ms block can see at 195–220 ms, nowhere near 500.

So e02, e03, e04 and e06 pass both arms of M-08's A5 witness. Each keeps the unfinished policy W-F.1 item 2 rules out ("no stability clamp is kept anywhere; each stepper takes the true frame dt"). Three of A5's sentences do not follow from its files:
- the M-08 cell: "A kept clamp of any name and any size fails the conjunction"
- §3, momentum: "the A5 source arm fails it at any size"
- §6: "it can only over-include … never under-include". It under-includes binding patterns, element writes, imports and early exits.

The §6 sentence "a dt that enters from another file … is UNRESOLVED" holds for parameters only. An imported value is not marked.

**Amend.**
1. Record definitions by binding, not only by simple name. Object and array binding patterns, in declarations and in destructuring assignments, should resolve to their initialiser, walked whole. An element write `a[i] = …` should count as a definition of `a`.
2. Mark UNRESOLVED (FAIL) every identifier the slice reaches that is imported, or that has no in-file definition and is not a global on an allow-list (`performance`, `Date`, `Math` constants). The same rule already applies to parameters.
3. Make the sink's guards its control dependence in its function, not only its ancestors. That covers every `if`, `?:`, `&&`, `||` or `switch` earlier in the function whose branch leaves it (`return`, `continue`, `break`, `throw`) before the sink, and the conditions of loops that break before it.
4. Add `e01`–`e04` and `e06` (and `frameClock.ts` as e03's provider) to the plant set, expected FAIL. Strike the three sentences above until the gate fails all of them.

## 2 · K-7 and W4 (checked, PASS)

W4 reproduces as GAP states it:
- HEAD 1.03–1.36
- the routed cure, simulated, 0.74–1.12 (PASS on 8 of 8 legs)
- a worm with no trail reads 0.00 and fails on 8 of 8 legs, while it passes W1–W3

This closes CRITIQUE-4 note 1. W3, the clause K-7 asks for, is unchanged.

## 3 · K-8, K-9, K-10 (PASS)

**K-8.** `verdicts.py` reads the fourth cell of each of the 59 §2 rows at `c8039be39` and in the working tree. No cell changed, M-08's included: A5 edits only its witness and routing columns. Every MATCH or EXCEED row therefore rests on what CRITIQUE-3 §2 and CRITIQUE-4 §7 re-derived. No committed sample under `apple-homeview/` is modified.

**K-9.** The labels are unchanged:
- goo: SHORT
- breath: engaged EXCEED, paused MATCH, rest ABSENT, entrance ABSENT
- momentum: SHORT, except the release (MATCH) and the worm's reversal (EXCEED)

The numbers behind them reproduce: 24.7 against 3.2 px, 13.5–13.9 ms, W4 0.74–1.12 against 0.00, and 8.5–40.7 px after the 150 ms block. The faulty momentum sentence names the gate, not the label.

**K-10.** M-08's routing names W-F.1 items 1–2, whose mechanism (the closed-form `springStepper` taking the true dt) owns the frame drop. The addendum's placement under item 8 is where G-29's fence lives (`W-F.1.md:99`). Every other routing is as CRITIQUE-4 passed it.

## Notes (outside the checklist; they do not change the verdict)

1. **The two ceilings differ by about 25 ms.** A5's part C starts the stepper with keyframes.js's 16.667 ms first frame (`clamp5.py:34`), so a block one frame in begins about 25 ms into the curve. My `ceiling5.py` starts at 8.3 ms. A5 reads 170–195 ms (sim tolerance) for the 400 ms block, and I read 195–220. Both put the ceiling at about the row's settle time, so A5's conclusion stands. The figure depends on that first-frame choice, and GAP could say so.
2. **W4 does not separate the withdrawn A3 reading.** The latest-drive reading scores 0.73–0.92 and passes W4. W3 is what fails it. W4's 0.5 floor also passes a trail at half the module's own law. That is a stated choice in §6, not an error.
3. **A finished tree may fail the source arm on its exit rule.** `useLeadTrail`'s lead becomes a `springStepper` whose dt comes from whatever drives the composable. If that driver lives in another file, the cured file reads UNRESOLVED until its provider is in scope. GAP §6 says this. W-F.1's seat will need the provider list when it places the addendum.
4. **Hygiene.** `GAP.md` (A5) and `amend5/` are uncommitted. `tools/__pycache__/` and `samples/source/` are still untracked, and `samples/source/` must stay out of git. The A5 header gives the seat's run as "01:52–02:30 EDT", but `GAP.md`'s mtime is 02:03 and the local clock read 02:05–02:08 during this round, so the end time was written ahead of the run. `critique5/` holds my code, my plants and computed JSON only, with no Apple code or media.
