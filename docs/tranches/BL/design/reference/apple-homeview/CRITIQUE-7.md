# O-95 critique, round 7: GAP (amend 7) on K-3, with the other rows checked for regression

Seat: REF2/crit7, model `claude-opus-5-5` (asserted from own system identity). 2026-10-16, about 02:40–02:50 EDT. I wrote nothing under `apple-homeview/` before this report. My only writes are this file and `critique7/`.

**What I read.** `GAP.md` §12 (the brief's "§11 first" names A6's log; A7's is §12), the A7 header, §0's v6 and `run7.sh` rows, the whole M-08 cell (§2), §3's frame-drop and momentum bullets, §5's M-08 row and §6's A5/A6 lines. `CRITIQUE-6.md` in full. `amend7/tools/run7.sh` and the plants. All 533 lines of `amend6/tools/dtgate.mjs` (sha256 `e0bfed38…5dd817`, unchanged). The clamp policy in `amend6/data/runtime6.json`. `W-F.1.md:99,145-152`.

**Method.** No browser, build, serve or worktree: K-3 is a source gate plus a simulation on committed clocks, so I read files, with `src` read in place. HEAD is `52f23e417` (A7). Every run used `guarded --light --rss-gb 2 --timeout 5|10`, and the Python ran with `-I -B`. The 1-min load was 38.6 and 36.5 (`uptime`, 02:43). None of my numbers is a timing measurement.

| Tool or input (`critique7/`) | Output (`critique7/data/`) | What it does |
|---|---|---|
| `amend6/tools/dtgate.mjs`, unchanged, on HEAD and the 60 plants `run7.sh` names | `dtgate7-rerun.json`, `.stdout` | reproduces A7 |
| the same gate on `plants/k*.ts` | `dtgate6-on-k.json`, `.stdout` | my plants, one test per stated claim; sha256 in `plants-k.sha256` |
| `critique6/tools/cells.py c7c06bf18 52f23e417` | `cells-a6-a7.txt` | which GAP cells changed between A6 and A7 |

Re-run, from `apple-homeview/`:
- `DTGATE_OUT=critique7/data/dtgate6-on-k.json node amend6/tools/dtgate.mjs <glass-ui root> critique7/plants/*.ts`
- `python3 -I -B critique6/tools/cells.py c7c06bf18 52f23e417`, from the repo root

**Verdict: AMEND.** A7 reproduces byte for byte: `dtgate7-rerun.json` equals `amend7/data/dtgate7.json`. HEAD fails on five files (six sites) with 41 review lines in 23 files. 60 of 60 plants come out as expected (9 / 40 / 11), F1-G4's regex passes all 60, and `c01`–`c06` leave 0 review lines. The complement framing holds, and so does M-08-RV as its owner. But the catch list is meant to be closed and exact, and three of its stated shapes have members that v6 passes. Two of those pass the runtime arm too. Also, two sentences the cell still asserts are false. No other row changed.

## K-rows

| K | Row | PASS / FAIL | Decided by |
|---|---|---|---|
| K-1 | R-02 | **PASS** (no regression) | `cells-a6-a7.txt`: no R-02 cell changed |
| K-2 | CR-03 | **PASS** (no regression) | no CR-03 cell changed |
| K-3 | M-08: every claim about the arms follows from the files; the residual is stated as a residual with an owner | **FAIL** | `dtgate6-on-k.json`: `k01`, `k03`, `k04` pass v6 inside S1–S3 as worded; `k05` falsifies a sentence still in the cell; see §1 |
| K-4 | P-21a | **PASS** (no regression) | no cell changed |
| K-5 | R-04 with P-12/P-13/P-14 | **PASS** (no regression) | no cell changed |
| K-6 | E0 and never-replays by tool | **PASS** (no regression) | no cell changed |
| K-7 | worm-length continuity clause | **PASS** (no regression) | no cell changed |
| K-8 | every MATCH or EXCEED row re-derives | **PASS** | §2's only changed cell is M-08's fifth (witness). No verdict cell changed |
| K-9 | goo, breath, momentum | **PASS** | §3's frame-drop and momentum bullets changed text, not labels: frame-drop SHORT; momentum SHORT, release MATCH, reversal EXCEED. Their A7 sentence restates the K-3 claim ("fails a renamed clamp only in the shapes on … S1–S4"), and §1's misses in S1–S3 make it inexact for the same reason as M-08. The labels still follow from the samples |
| K-10 | every SHORT/ABSENT routing names an owner | **PASS** | §5's M-08 row changed only its fourth cell (the M-08-RV text). The owner is still W-F.1 items 1–2. M-08-RV is a full review at the §10 "Wave" pass (`W-F.1.md:151`), and it reads every call's argument, receiver and run condition across files, so the complement has a mechanism that owns it |

`cells-a6-a7.txt` lists only these changes: §0's v6 row (cell 1) and the new `run7.sh` row; §2 M-08 (cell 4); the two §3 bullets; §5 M-08 (cell 3); and the new §12 table. §6's A5/A6 bullets are not table cells. I read their word diff, and both are K-3 text.

### 1 · K-3 (M-08): FAIL

**What holds.**
- The residual is stated as the complement of S1–S4, with examples that are not its definition. It is owned by M-08-RV as a full human review that reads across files and tasks. Under the round-7 ruling, `c01`–`c06` are complement members and not failures.
- `k05` below is also a complement member for the catch list: a dt that crosses a file boundary through an in-file exported object.
- The runtime arm's stated bands match `runtime6.json`: clamp `passing` = [200, 225, 250, 300, 400, 500, 1000], `blind_from` 200.

**What fails.** M-08 says v6 "FAILs a file in exactly these four cases", over the edges E1–E4, with "no shape outside it is claimed". Each `k` plant below falls inside a case as GAP words it, is unfinished work (a 500 ms clamp or a hand-rolled stepper), and passes v6 with no violation, no UNRESOLVED and no indirect sink. Each has a one-character control that v6 fails, which shows the gap is the implementation's and not the plant's.

| Plant | Form | v6 | Runtime arm | The stated claim it falsifies | Control (v6 FAIL) |
|---|---|---|---|---|---|
| `k01-object-destructuring-default.ts` | `({ dt = Math.min(now − last, CAP) } = {} as …); lead.tickDt(dt)` | **PASS**, 0 review lines | PASS (clamp 500 in `passing`) | **E1**: "assignments of any operator (destructuring targets included)". v6 records `dt`'s definition at this assignment but walks only its right side `{}`. The shorthand target's default (`objectAssignmentInitializer`) is never put in `rhs`, and `extra` at `:163` is always empty. The array form is read at `:166-167` | `k01c` `[dt = Math.min(…)] = []`; `k01d` `{ gap: dt = … }` (read only because the inner `dt = …` parses as an assignment) |
| `k04-template-key-sink.ts` | ``lead[`tickDt`](Math.min(now − last, 500))`` | **PASS** (no sink found; 2 review lines, which do not gate) | PASS (clamp 500) | **S2**: "a reference to `tickDt`/… that is neither a direct `.tick*(…)` call nor a declaration's own name, or an `x["tick*"]` read". `:198` tests `isStringLiteral` only. v6's own E2 treats a no-substitution template as a string key (`:117`, `:431`), but S2 does not | `k04c` `lead["tickDt"](…)` |
| `k03-handrolled-two-point-zero.ts` | `v += (−w*w*(x − target) − 2.0*z*w*v) * dt`, dt clamped at 500 ms, no sink | **PASS** (2 review lines) | not scored: the arm is defined on W-F.1's closed form, not a hand Euler | **S1**: "a product `X·X·(…)` in a sum with another term holding a literal `2·` and `X`". The regex at `:216` is `(^\|[^\w.])2(\s*\*\|$)`, so `2.0 *` (and `2e0`) are not read. The S1 claim is the source arm's alone, so the runtime column does not decide this row | `k03c` with `2 *` |
| `k05-exported-clock-object.ts` + `k05-provider.ts` | `export const frameClock = { dt: 1000/60 }; lead.tickDt(frameClock.dt)`; another file writes `frameClock.dt = Math.min(now − last, 500)` | **PASS**, 0 review lines (labelled RESIDUAL: in the complement) | PASS (clamp 500) | not S1–S4, so it is fine against the catch list. It falsifies a sentence the cell still asserts (below) | — |

**Two un-struck sentences in the M-08 cell** (in the A5 source-arm paragraph, which A6 and A7 annotate in place rather than strike):
1. "**so does a dt that enters from another file until its provider is in scope**". A7 narrows this only for free names off the allow-list, citing `c04`/`c06`. `k05` enters from another file through an exported object, and `c01`/`c03` enter through a receiver or `yield`. All pass, yet the sentence still claims they fail. §6's copy of the same sentence was qualified correctly at A7 ("only when it enters through one of S4's listed shapes"), but the cell's copy was not.
2. "**A file that steps a damped oscillator by hand under any name fails**". §5's copy carries A6's qualifier ("in the `X·X·(…) + 2·…·X` shape only"), but the cell's copy does not. GAP's own residual examples `r05` (a precomputed stiffness) and `r02` contradict it, and so does `k03`.

These sentences are the same kind as the one A7 struck ("A value from outside the file fails as UNRESOLVED"), left standing in the twin paragraph.

**Amend** (wording only, no gate change, consistent with the round-7 ruling):
1. In the M-08 cell, strike or qualify the two A5-paragraph sentences the way §6 and §5 already do: "only through S4's listed shapes", and "only in S1's shape".
2. Make S1–S3 state what v6 reads, not a semantic class:
   - S1: "a literal written `2` (not `2.0` or `2e0`)".
   - S2: "an `x["tick*"]` read with a string-literal key (a template-literal key is not read)".
   - E1: "a destructuring assignment's right side; an array target's default is read, an object shorthand target's default is not".
   Then add `k01`, `k03` and `k04` to the examples of the complement. The alternative is to fix `:163`, `:198` and `:216` in v6 and add the three as `EXPECT FAIL`, but the ruling chose not to change the gate.
3. Restate §3's A7 sentence with the same scoping. It already reads "only in the shapes on M-08's closed catch list", so this follows from item 2.

## Notes (outside the checklist; they do not change the verdict)

1. The brief says to read "§11 first", but A7's change log is §12. §11 is A6's.
2. `k03`'s runtime column is not decided. A hand Euler with `w = 12` and a 500 ms step diverges (ω·dt = 6), so a paint arm would likely see it. S1 is a source-arm claim, so this does not matter for the finding.
3. The A5-paragraph sentences predate A7. They were already false at A6 (`r02`/`r05`, CRITIQUE-6's `c01`/`c03`). CRITIQUE-6 struck at the A6 paragraph's sentence and not at this one.
4. Hygiene: `critique7/` holds my plants, shell-free JSON outputs and hashes, with no Apple code or media. I did not touch `samples/source/` or `tools/__pycache__/`, and I created no worktree, so none needs removing. Nothing was left running.
