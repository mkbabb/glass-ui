# O-95 critique, round 6: GAP (amend 6) on K-3, with the other rows checked for regression

Seat: REF2/crit6, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 02:30–02:40 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique6/`.

**What I read.** `GAP.md` §11 first, then the A6 header and instrument rows in §0, the M-08 cell (§2), §3's frame-drop and momentum bullets, §5's M-08 row and §6's A5/A6 lines. `CRITIQUE-5.md` in full. All of `amend6/tools/dtgate.mjs` (533 lines) and the head of `amend6/tools/runtime6.py`, plus the plants `e06`, `q01` and `r03`. `W-F.1.md:99,148-152`, and SpringProgress's public members in `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:3560-3680` (`tickDt`, `tickToTime` and `tickVector` are its only time entries, each taking dt as argument 0).

**Method.** No browser, no build, no serve and no worktree: K-3 is a source gate plus a simulation on committed clocks, so both run on files, with `src` read in place. HEAD is `c7c06bf18`; `git diff --stat c8039be39 HEAD -- src demo` prints nothing and `git status --porcelain -- src` is empty. Every run used `guarded --light --rss-gb 2 --timeout 5|10`, the Python with `-I -B`. The 1-min load was 30.4, 28.8 and 31.7 (`uptime`, 02:31–02:32). None of my numbers is a timing measurement.

| Tool or input (`critique6/`) | Output (`critique6/data/`) | What it does |
|---|---|---|
| `amend6/tools/dtgate.mjs`, unchanged (sha256 `e0bfed38…5dd817`), with `DTGATE_OUT` | `dtgate6-rerun.json` | A6's gate on HEAD and its 54 plants (`amend5/`, `critique5/`, `amend6/plants/*.ts`) |
| the same gate | `dtgate6-on-c6.json` | on my six plants `plants/c01…c06` and the provider `plants/frameClockGlobal.ts` |
| `tools/runtime6-copy.py` | `runtime6-rerun.json` | `amend6/tools/runtime6.py` with the output path changed (a one-line diff) |
| `tools/cells.py` | `cells-a5-a6.txt` | which table cells and §3 bullets of `GAP.md` changed between `6bba1e1e4` (A5) and `c7c06bf18` (A6) |

Re-run, from `apple-homeview/`:
- `DTGATE_OUT=critique6/data/dtgate6-on-c6.json node amend6/tools/dtgate.mjs <glass-ui root> critique6/plants/*.ts`
- `python3 -I -B critique6/tools/runtime6-copy.py`
- `python3 -I -B critique6/tools/cells.py 6bba1e1e4 c7c06bf18`

**Verdict: AMEND.** A6's files reproduce byte for byte: `dtgate6-rerun.json` and `runtime6-rerun.json` are identical to `amend6/data/dtgate6.json` and `amend6/data/runtime6.json`. HEAD FAILs, 54 of 54 plants come out as expected, and every runtime threshold GAP states holds. No row other than K-3 changed a verdict, owner or label. K-3 still fails, because the bounded claim is not closed. Six ordinary unfinished forms pass both arms, and GAP's residual list does not name them:
- Two read a dt clamped at 500 ms in another file through `window` or `globalThis`. M-08 says "a value from outside the file fails as UNRESOLVED", so these two falsify a stated claim.
- One takes a 500 ms clamp delivered through `yield`. §6 says v6 "fails closed on what it cannot resolve".
- Three drop frames longer than 500 ms by control flow that v6's control dependence does not model: a receiver chosen by a comparison, an optional call on that receiver, and an earlier `await` on a promise that never settles.

None of the six leaves a `review` line, so M-08-RV's reading list does not reach them either.

## K-rows

| K | Row | PASS / FAIL | Decided by |
|---|---|---|---|
| K-1 | R-02 | **PASS** (no regression) | `cells-a5-a6.txt`: no R-02 cell changed |
| K-2 | CR-03 | **PASS** (no regression) | no CR-03 cell changed |
| K-3 | M-08: a renamed, raised clamp must fail the witness; the residual is stated, with an owner | **FAIL** | `critique6/plants/c01…c06` → `dtgate6-on-c6.json` (gate PASS, 0 review lines); `runtime6-rerun.json` (clamp 500 and drop 500 pass); see §1 |
| K-4 | P-21a | **PASS** (no regression) | no P-21a cell changed |
| K-5 | R-04 with P-12/P-13/P-14 | **PASS** (no regression) | no cell changed |
| K-6 | E0 and never-replays by tool | **PASS** (no regression) | no cell changed |
| K-7 | worm-length continuity clause | **PASS** (no regression) | no cell changed |
| K-8 | every MATCH or EXCEED row re-derives | **PASS** | §2's only changed cell is M-08's fifth (witness); its verdict cell (fourth) and every other row's are unchanged |
| K-9 | goo, breath, momentum | **PASS** | §3's frame-drop and momentum bullets changed text, but their labels did not: frame-drop SHORT, momentum SHORT except the release (MATCH) and the worm's reversal (EXCEED). The A6 sentence that lists "the forms neither arm reads" is the K-3 claim restated, and is wrong for the same reason (§1); the label follows from the samples |
| K-10 | every SHORT/ABSENT routing names an owner | **PASS** | §5's M-08 row changed only its fourth cell. The owner cell is still W-F.1 (items 1–2, the closed-form stepper taking the true dt, which owns the frame drop). M-08-RV sits at `W-F.1.md:99` (item 8) and `:148-152` (§10 gestalt passes). That an unstated residual has no owner is K-3's fault, not the routing's |

### 1 · K-3 (M-08): FAIL

**What reproduces.** v6 on HEAD: FAIL on the same six rows as A5, with 41 review lines. The tally is 54 plants, 54 as expected: PASS 9 of 9 pass, FAIL 40 of 40 fail, RESIDUAL 5 of 5 pass, and F1-G4's regex passes all 54. The runtime arm, re-run on the committed clocks, fails or passes as follows:
- `min` clamp: fails 10–180 ms and passes from 200 ms. The grid has no point between 180 and 200, so "below 200" is read across that gap.
- drop or rebase: fails up to 400 ms and passes from 401 ms.
- soft bound: fails at S = 1500 ms (block 150) and passes from S = 2000 ms.
- 50 and 100 ms timers: fail on all 10 phases. At 250 ms they pass 2 of 10 phases, at 500 ms 3 of 10.

The clamp cross-check reads 40 / 140 / 200 / 48 ms, matching `clamp5.json`. Each of these matches M-08's bullets.

**What fails.** Each plant below is a standalone stepper in the style of A5's and A6's plants, with `EXPECT FAIL` on line 1. Each keeps the policy W-F.1 item 2 rules out ("no stability clamp is kept anywhere; each stepper takes the true frame dt") with a parameter in the runtime arm's blind band, so `runtime6-rerun.json` passes it: clamp 500 sits in `clamp.passing`, and drop 500 in `drop.passing`. v6 passes every one of them with no violation, no UNRESOLVED and no review line (`dtgate6-on-c6.json`). F1-G4's regex passes them too.

| Plant | Unfinished form | v6 | The stated claim it falsifies |
|---|---|---|---|
| `c04-window-published.ts` + `frameClockGlobal.ts` | `lead.tickDt(window.__frameDt)`; the provider writes `Math.min(now − last, 500)` there | **PASS** | M-08: "A value from outside the file fails as UNRESOLVED". `window` is on the allow-list, and a property read off it with no in-file write is never marked (`walk` marks only `this.p`) |
| `c06-globalThis-dt.ts` | `lead.tickDt((globalThis as any).frameClock.dt)` | **PASS** | the same; `globalThis` is allow-listed |
| `c03-yield-delivered.ts` | `const dt = yield; lead.tickDt(dt)` inside a generator; the rAF driver calls `loop.next(Math.min(now − last, 500))` | **PASS** | §6: v6 "fails closed on what it cannot resolve". A `yield` result has no listed definition form, and the walk passes it as clean |
| `c02-optional-receiver.ts` | `(dt > 500 ? undefined : lead)?.tickDt(dt)` | **PASS** | M-08 and §6: the sink's guards are "its control dependence in its function". The sink runs only when the comparison is false, but `slice` walks argument 0 and never the receiver |
| `c01-receiver-swap.ts` | `const target = dt > 500 ? idle : lead; target.tickDt(dt)`: a long frame steps a throwaway spring | **PASS** | M-08's residual list, which says what both arms pass ("The residual both pass is …"). This form is in none of r01–r05, the patched global or the outside-`src` step. The comparison reaches the step through the receiver, which is never walked |
| `c05-await-stall.ts` | `if (dt > 500) await stall;` (a promise that never settles) before `lead.tickDt(dt)` in an async step | **PASS** | the control-dependence claim, and the residual list. `exitsIn` counts only `return`/`throw`/`break`/`continue`, so a conditional suspension in an earlier sibling is not a guard |

So the M-08 cell's bounded claim does not follow from its files. "A value from outside the file fails as UNRESOLVED" is false for reads through an allow-listed global. §6's "fails closed on what it cannot resolve" is false for `yield`. The residual GAP states as both arms' blind spot (in M-08, in §6's A6 line and in §3's momentum bullet) omits a receiver-selected step, an optional-call skip, an await-stall skip, a global-published dt and a generator-delivered dt. M-08-RV's three steps would not find any of them: step (2) disposes `review` lines and none is emitted, and step (3) checks only for patched `performance.now` or `requestAnimationFrame`. These residuals therefore have no owner.

**Amend** (either path closes it; the first is cheaper to state):
1. Fail closed on these forms in v6, and add `c01`–`c06` to the plant set, expected FAIL.
   - Walk the sink's receiver expression as part of the slice.
   - Count `?.` on the sink's callee chain, and an earlier sibling holding `await` or `yield` under a condition, as control dependence.
   - Mark a `yield` or `await` result in the slice UNRESOLVED.
   - Narrow the allow-list from the roots `window` and `globalThis` to the members the clause needs (`performance.now`, `Date.now`, `requestAnimationFrame`, `Math.*`, `Number.*` constants), so that any other property read off a global is UNRESOLVED.
2. Or name each of the six shapes in M-08's residual, in §6 and in §3's momentum bullet, and give each a `review` line in v6 that M-08-RV's step (2) disposes. As it stands they are unstated residuals with no owner.

## Notes (outside the checklist; they do not change the verdict)

1. **Grid resolution.** The runtime `min`-clamp grid steps from 180 to 200 ms, so "below 200 ms" interpolates across a 20 ms gap. `clamp5.json`'s simulation tolerance reads 180 ms for the 400 ms block. The soft bound's "up to S = 1500 ms" and "from 2000 ms" are grid points, as GAP words them.
2. **Hygiene.** `GAP.md` (A6) and `amend6/` are committed at `c7c06bf18`. `tools/__pycache__/` and `samples/source/` stay untracked, and `samples/source/` must stay out of git. `critique6/` holds my code, my plants and computed JSON only, with no Apple code or media. The plants are mine; no Apple text is quoted in them.
