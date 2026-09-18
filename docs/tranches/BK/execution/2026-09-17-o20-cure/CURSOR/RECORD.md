# CURSOR—four measured acts and the O-20 cure wave's cursor annotation

**Model id:** `claude-opus-5`, asserted from THIS seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2238253a-97c/agent-a8ca432347ecb4718.jsonl`
(`agent-a8ca432347ecb4718.meta.json` carries
`{"agentType":"workflow-subagent","description":"cursor:implement",…}`). Found by grepping the
workflow subagent tree for `CURSOR/RECORD.md`, a path unique to this prompt; `.message.model`
reads `claude-opus-5` at every assistant turn. `CLAUDE_MODEL_ID` is unset and the parent session
file was not read for it. Every command in this lane was gated on the id with `&&` on one line:

```
$ test "claude-opus-5" = "claude-opus-5" && <command>
```

Em dashes in this file are tight (it is a NEW file). `MIGRATION.md` and `R/RECORD.md` keep their
own spaced convention and the prose added to each matches its file, per the house law.
`EXECUTION-PROGRESS.md` was measured before writing: ⊕⁸¹ and ⊕⁸² together read **1,305 spaced
against 28 tight**, so ⊕⁸³ is spaced.

---

## Step 0—baseline, banked before any byte

```
$ git rev-parse HEAD
c0d433486ffddcfcbc8af3eae4afc60b972cb13f

$ git status --porcelain
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 rosterSha256:282d05cf violations:0`. Nothing minted; the receipt is re-quoted
unchanged at the close.

---

## Act 1—the CI census, redone whole

CLOSE-TESTS's re-adjudicator left one surviving defect: the census was seventeen runs read as the
population. Re-measured here from scratch rather than from its summary.

```
$ gh run list --branch master --workflow ci.yml --limit 60 --json databaseId,headSha,conclusion,createdAt
$ gh run view <id> --json jobs --jq '.jobs[] | "\(.name)\t\(.conclusion)"'          (×34)
$ gh run view <id> --log-failed | grep -E "PI blob|captureScreenshot|Expected|Received"   (×33)
$ gh run view <id> --log | grep -a "No files were found with the provided path"
```

**The window** is every `ci.yml` run on `master` that reached `pixel-floor`, from the last green
`32743826000` (`350f7a90`, 2026-08-24T15:16:13Z) through `35304894096` (`f999c11c`,
2026-09-18T03:53:33Z) inclusive. **THIRTY-FOUR runs, and all thirty-four reached the job**—the
`verify` job each needs is `success` in every one, so none was skipped. Two later runs,
`35306922104` (`4501fc77`) and `35306993586` (`c0d43348`), were `in_progress` at the census and
are outside the window by construction.

| figure                                                    | measured                         |
| --------------------------------------------------------- | -------------------------------- |
| denominator                                               | **34**                           |
| GREEN                                                     | **1** (`32743826000`)            |
| ceiling-RED (`paintedShare` over `ceil`)                  | **27**                           |
| `Page.captureScreenshot` deaths                           | **6**—5 green-leg, 1 planted-leg |
| reach the readback on the green leg                       | **29** of 34                     |
| artifact warning `No files were found … pi-report-*.json` | **34 of 34**, the green included |

The six deaths: `32747589482` (no PI line at all), `32862369277`, `32864785902`, `33217756605`,
`35302161628` (each `paintable` then dead) on the green leg; `32746095576` on the PLANTED leg,
where the verifier printed `PLANTED DEFECT FAILED THE WRONG ASSERTION … the harness broke, the
floor did not bite`. Twenty-four of the twenty-seven ceiling REDs print
`Received: 0.9974811083123426` to the last digit; the other three are the pre-narrowing rows
(0.757 · 0.757 · 0.759).

These figures reproduce the CLOSE-TESTS re-adjudicator's independently, to the run id, including
its list of the seventeen rows the first pass missed.

**What was written.** `CLOSE-TESTS/RECORD.md` is UNCOMMITTED, so it was rewritten plainly in place
rather than bracketed, in six Python blocks carrying twelve count==1-gated replacements: the
readback split (`fourteen/THREE/fourth` →
`TWENTY-NINE/FIVE/sixth`, all six deaths named), the byte-identity claim (restated over the 24
narrowed-denominator rows), the dead-artifact paragraph (`seventeen for seventeen` → `thirty-four
for thirty-four`, with the warning quoted whole including its second path line), the census table
(17 rows → 34, every added row measured here), the three-way split (`1 GREEN + 12 + 4` →
`1 GREEN + 27 + 6`), and the four downstream figures in the residues and FOR THE DRIVER sections.
**A dated line opens the census section** saying it was redone at the cursor seat and why. Its
qualitative conclusions all survive: whole-interior `coverage` is 0.577-0.578 in every printing
row, the denominator moved twice (`407de2d3` re-denominated, `5a69ed9f` narrowed 0.761 → 0.557),
and the re-denominated ceiling has never once been green on swiftshader. The full census adds
`8a96868d` on the wide denominator between `407de2d3` and `9f6d0ec9`, which makes the transition a
clean step rather than a drift—noted in place.

---

## Act 2—R/RECORD.md, three dated brackets

**The anchors verified first**: `grep -n 956 R/RECORD.md` → `676`, `683`, `793`, exactly as
ordered. The convention measured: **124 spaced against 2 tight**, so the brackets are spaced.

**What R's `:956` actually was.** At `dd8a5fe5`, R's own committed tree,
`git show dd8a5fe5:tests/public-surface.spec.ts | sed -n 956p` reads `: [name];`—inside a
helper, not an arm. The untimed subprocess probes there were **`:648`, `:685`, `:738`, `:796` and
`:978`**, five of them, and R budgeted TWO roster arms (`}, 30_000);` at `:916` and `:933`).
CLOSE-TESTS (`4501fc77`, `10 insertions(+), 5 deletions(-)`) added five more, so **seven arms
carry an explicit `30_000` at HEAD**, at `:673`, `:731`, `:793`, `:833`, `:920`, `:937`, `:1010`.
That commit's own message says the class was budgeted whole.

The three brackets are dated `[2026-09-18 · …]`: the full statement opening at `:678` under the
Run 1 bullet (`:676` at `c0d43348`), a short cross-reference at `:691` (`:683` at `c0d43348`),
and at `:810` (`:793` at `c0d43348`) the correction that the untimed class was SIX
(five probes plus the DockStage router arm), not three, with CLOSE-TESTS named as the one pass
that item asked for.

---

## Act 3—MIGRATION.md §9.0.0, the FourierField expose delta

Measured on the two published type declarations, not on source:

```
/private/tmp/.../scratchpad/publish-800/package/dist/components/fourier-field/FourierField.vue.d.ts
/private/tmp/.../scratchpad/publish-900/dist/components/fourier-field/FourierField.vue.d.ts
```

| version | exposed members                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------- |
| 8.0.0   | `backend` · `pause` · `resume` · `wake` · **`renderAt`** · `setHeadT` · `rendererStatus` (7)            |
| 9.0.0   | `backend` · `pause` · `resume` · `wake` · `setHeadT` · **`headT`** · **`flick`** · `rendererStatus` (8) |

One out, two in; the other six unchanged in name and signature. This confirms the CLOSE-DOCS
adjudicator's reading.

**What a consumer that called `renderAt` does instead: nothing, and the row says so.** Measured at
`v9.0.0` rather than inferred—`src/components/fourier-field/useFourierField.ts`'s
`FourierFieldHandle` carries **no `renderAt` member at all**, so the removal is from the whole
component API and not only from its expose; `defineExpose` at `FourierField.vue:215-225` lists the
eight above and no successor; there is no emit for it (the one emit is `rendererStatus`). The
substrate below still has the capability (`useGpuSubstrate.ts:131`), and the component no longer
surfaces it. At 8.0.0 the member was documented `Draw one frame out-of-loop (capture, thumbnail)`
(`composables/useFourierField.ts:80-81` at `v8.0.0`). The row therefore names the two things that
are still reachable: `setHeadT(t)` for placing the figure (`Scrub the clock directly. Takes no
spring—a hand's position is not a physics event.`) and `:freeze` for holding a still. The two
additions carry their own docblocks—`headT` is `The live loop parameter. Unwrapped on the
exposed proxy, so a transport binds it.` and `flick(turnsPerSec)` is `Inject one flick impulse, in
turns per second. Capped and floored like any other.`—and the row says plainly that neither
replaces `renderAt`.

Written in the §9.0.0 idiom, beside the `colorResolver` row: an italic heading, a dated line, a
`| removed | migration |` table, then the measurement prose. `MIGRATION.md`'s spaced em dashes are
matched.

---

## Act 4—MIGRATION.md, the glass-fill `@property` names

The glass-fill row attributed the `@property` initials `transparent` / `0%` to
`--glass-fill-tinted`. Measured:

```
$ grep -rn "@property --glass-fill" -A 5 src/styles/
src/styles/tokens/glass.css:277:@property --glass-fill-tint      { syntax: "<color>";      initial-value: transparent; }
src/styles/tokens/glass.css:283:@property --glass-fill-strength  { syntax: "<percentage>"; initial-value: 0%; }

$ grep -rn "@property --glass-fill-tinted" <9.0.0 dist>        → no match
$ grep -n "glass-fill-tinted" src/styles/tokens/glass.css       → 194 (comment), 203 (the color-mix)
```

`--glass-fill-tinted` is an ORDINARY custom property—a `color-mix` that READS the two registered
ones—and is not registered anywhere, in `src/` or in the published
`dist/styles/tokens/glass.css`. The clause was rewritten plainly to the measured names, with no
dated bracket: **the prose is the cure wave's own, committed today by the driver at `dd8a5fe5`
(batch 4, lane R)**, and a wave's own text written hours earlier is corrected rather than struck.

---

## Act 5—⊕⁸³

Appended at the literal end of `docs/tranches/BK/EXECUTION-PROGRESS.md`, in the ⊕⁸¹/⊕⁸² form read
first at `:6909-7067`. Nine sections: the commit chain · the twelve lanes with their quartet
outcomes and seat models · verify at the close · the wall · the five driver rulings · the standing
CI red · the owner register held open · the carried-OPEN register from ⊕⁸⁰/⊕⁸¹ restated unchanged
· outbound. Every figure is measured here or quoted from a named `file:line` or a journal `result`
line with its workflow id.

**The seat census behind section (b)**, counted at this seat by reading `.message.model` out of
every `agent-*.jsonl` beside each `journal.jsonl` across the seven cure-wave workflows:

```
seats started: 74      claude-opus-5: 50      claude-fable-5-1: 24      UNKNOWN: 0
```

Opus implements, challenges and cures; Fable adjudicates and re-adjudicates. No adjudication seat
is Opus and no implement, challenge or cure seat is Fable.

**The battery accounting behind section (c)** is the lane RECORDs' own readings, quoted with
cites: 2166 live at the wave's open (`P:212`) → 2172 (`P:327 · C1:540 · E1:451`) → **2199**
(`E2:425 · D:618`) → 2218 (`T1:609 · R:662`) → 2219 (`R:1082`) → **2220** (`CLOSE-TESTS:321,331`).
The ordered `2199 → 2220 = +21` is **+19 from batch 3, +1 from R, +1 from CLOSE-TESTS**. T1 and T2
ran concurrently on one tree, so their share of the 19 is not separable from the battery totals
and is not split.

**The file moved 7,067 → 7,346 lines, +279** (7,341 at the end of round 1; cure round 1 below
nets +5), all of it below every cite in the file; ⊕⁸²'s five re-read anchors (`:6678` · `:6699` ·
`:6709` · `:6744` · `:6752`) were re-read on disk after the append and are unmoved.

---

## VERIFY—verbatim, with real exit codes at this end

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_APP_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSC_TEST_EXIT=0

$ npx vitest run tests/docs tests/design tests/components/status-dot.contract.test.ts
 Test Files  5 passed (5)
      Tests  21 passed (21)
VITEST_EXIT=0

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`tests/components/status-dot.contract.test.ts:19` is the one test that reads `MIGRATION.md`, which
is why it ran beside the doc and design suites.

**`npm run verify:package` was NOT run and did not need to be.** This lane changes no `dist/`
byte, no `package.json` field and no published path; all five fenced files are documentation, and
`.bundle-ratchet` was neither read as an input nor written. The terminal-CLEAN figure quoted in
⊕⁸³—roster PRESENT 289/289, tarball sha256
`c87c953b67f20a4107eea32626a189b4625749afd552c7d24344e0184adb6a58`, 900,129 B—is `c0d43348`'s
own, measured under the build lock by the rebind and quoted with that attribution.

---

## FENCE

**Five files, all inside the repo:**

```
docs/tranches/BK/EXECUTION-PROGRESS.md                                    (⊕⁸³ appended)
docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/RECORD.md      (census redone)
docs/tranches/BK/execution/2026-09-17-o20-cure/R/RECORD.md                (three brackets)
MIGRATION.md                                                              (two acts)
docs/tranches/BK/execution/2026-09-17-o20-cure/CURSOR/RECORD.md           (this file)
```

Nothing else in the working tree is this seat's. **No git verb ran**—no `add`, `commit`,
`stash`, `checkout`, `reset` or `tag`; the driver commits by pathspec. **No sibling tree was read
for write or written**, and `docs/precepts` was not opened. **No gate was minted**: the receipt is
byte-identical at the baseline and at the close. No build ran and the build lock was never taken.
Every Python edit asserted `count == 1` and checked `os.getcwd()` before writing.

---

## CURE ROUND 1—2026-09-18

**Model id:** `claude-opus-5`, asserted from THIS seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_2238253a-97c/agent-a4304e011fd5552d4.jsonl`
(`agent-a4304e011fd5552d4.meta.json` carries
`{"agentType":"workflow-subagent","description":"cursor:cure",…}`). Found by grepping the workflow
subagent tree for a phrase unique to this dispatch; `.message.model` reads `claude-opus-5` at every
assistant turn. `CLAUDE_MODEL_ID` is unset and the parent session file was not read for it. Every
command in this round was gated on the id with `&&` on one line:

```
$ test "claude-opus-5" = "claude-opus-5" && <command>
```

**HEAD moved under this round.** The baseline was `c0d43348`; `git log -2 --format='%h %ci %s'`
reads `edccdc44 2026-09-18 00:33:10 -0400` above it, landed while round 1 ran. `git show --stat
edccdc44` is one file, `docs/tranches/BK/coordination/valuejs-outbound-2026-09-18-kfw6-bh-relay.md`,
`1 file changed, 148 insertions(+)`—**no overlap with any of the five fenced paths**, and its own
message says it is mail delivery, not a producer byte. ⊕⁸³'s header and its (a) block now say so.

### The cures, each with what was measured

1. **`MIGRATION.md:90`**—`the other five are unchanged` → `the other six are unchanged`. 8.0.0
   exposes seven, `renderAt` goes out, so six carry into 9.0.0's eight: `backend`, `pause`,
   `resume`, `wake`, `setHeadT`, `rendererStatus`. The `7 − 1 = 6 = 8 − 2` reading is the d.ts
   table at `:126-129` of this file, unchanged.
2. **`CURSOR/RECORD.md:129`**—the same arithmetic, `the other five unchanged` → `the other six
unchanged`.
3. **`CLOSE-TESTS/RECORD.md:88`**—`(R/RECORD.md:792-800)` → `(:801-809)`. Read on disk: residue 3,
   from `3. **Three pre-existing arms have no timeout…` to `one gets missed.`, now spans
   `R/RECORD.md:801-809`; `:792-800` holds the bundle-ratchet and `defaultBlobColorResolver`
   residues, which is why the old cite had to move.
4. **`CLOSE-TESTS/RECORD.md:343`**—`(R/RECORD.md:1063-1067)` → `(:1078-1084)`. The
   `1 failed | 2218 passed | 10 expected fail (2229)` battery block now sits in the fence at
   `R/RECORD.md:1079-1084`; `:1063-1067` holds `THREE_EXIT=0` and the `94 passed` public-surface
   block. Both shifts are act 2's three brackets, which added +6, +3 and +6 lines above them.
5. **`CLOSE-TESTS/RECORD.md:918-921`**—rewritten plainly, the file being uncommitted: the strike
   asked of the driver was made at the cursor seat on 2026-09-18, three dated brackets opening at
   `R/RECORD.md:678`, `:691` and `:810`, under the `:956` mentions that sat at `:676`, `:683` and
   `:793` at `c0d43348`. **Residue 1's draft was the BASIS, not the text**: the draft at
   `CLOSE-TESTS/RECORD.md:857-858` is one two-line bracket dated `2026-09-17`; what is on disk is
   three brackets dated `2026-09-18`, differently worded and carrying the seven `30_000` anchors.
   Compared before the claim was written, which is why the sentence says _basis_.
6. **`CURSOR/RECORD.md`, the em-dash law**—13 spaced em dashes (`U+0020 U+2014 U+0020`) at lines
   54, 64, 91, 101, 133, 141, 142, 144, 167, 168, 231, 232 and 249 converted to tight `U+2014`, the
   replace gated on `count == 13` and `os.getcwd()`. `prettier --write` then realigned the `:59-66`
   table, whose `Page.captureScreenshot` cell lost two columns; `proseWrap` is `preserve`, so no
   prose reflowed. The file's own `:15` claim—"Em dashes in this file are tight (it is a NEW
   file)"—is now true of its bytes. The measurement is quoted in the VERIFY fence below, where
   prettier cannot collapse the space inside the code span (it does, in prose: that is why this
   line spells the codepoints).
7. **`EXECUTION-PROGRESS.md`, the `edccdc44` pair**—the ⊕⁸³ header now reads `c0d43348` at this
   seat's baseline, `edccdc44` by its close, and (a) carries one more bullet, in the block's spaced
   convention, for what `edccdc44` was.
8. **`EXECUTION-PROGRESS.md:7322` and `CURSOR/RECORD.md:108-110`**—the three brackets are now cited
   by the lines they OPEN on disk (`:678`, `:691`, `:810`) with the `c0d43348` anchors (`:676`,
   `:683`, `:793`) kept beside them, so neither statement is stale against either tree.
9. **`EXECUTION-PROGRESS.md`, the (d) spans**—`about an hour` → **29 m 55 s**, measured
   `jq -r 'select(.timestamp!=null)|.timestamp' wf_abf37dd9-d5f/agent-a3c38f904a57abe5d.jsonl`
   = `2026-09-17T23:56:43.907Z` → `2026-09-18T00:26:38.929Z`, i.e. 19:56:43 → 20:26:38 ET;
   `36 seconds` → **39 s**, from `agent-a28cf9b4525735b26.jsonl` = `2026-09-18T01:31:03.420Z` →
   `01:31:42.332Z`, i.e. 21:31:03 → 21:31:42 ET. `R/RECORD.md:55` says `~1 hour` and `:56` says
   `36 seconds`; both are named in ⊕⁸³ and **neither was touched**—R/RECORD.md stays at the three
   brackets the fence allows, so the measured spans live in ⊕⁸³ only.

**Line figures restated, not predicted.** ⊕⁸³'s LINE-CITE NOTE and `:202` of this file both read
the same pair, 7,067 → 7,346 and +279, taken from `wc -l` after the last edit. Round 1 ended at
7,341; this round added seven lines (the `edccdc44` bullet's two, the header's one, `:7322`'s one,
and (d)'s three)
and gave two back re-wrapping the `:7072` header and the whole (d) paragraph at the block's
98-column width, which is +5. `:6678` · `:6699` · `:6709` · `:6744` · `:6752` are still unmoved:
every byte this round wrote is below `:7067`.

### VERIFY—verbatim, with real exit codes at this round's end

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_APP_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSC_TEST_EXIT=0

$ npx vitest run tests/docs tests/design tests/components/status-dot.contract.test.ts tests/public-surface.spec.ts
 Test Files  6 passed (6)
      Tests  115 passed (115)
VITEST_EXIT=0

$ npx prettier --check docs/tranches/BK/execution/2026-09-17-o20-cure/CURSOR/RECORD.md
Checking formatting...
All matched files use Prettier code style!
PRETTIER_EXIT=0

$ python3 -c "import io; t=io.open(P).read(); print(t.count(chr(32)+chr(8212)+chr(32)))"
0

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
GATE_EXIT=0

$ git status --porcelain
 M MIGRATION.md
 M docs/tranches/BK/EXECUTION-PROGRESS.md
 M docs/tranches/BK/execution/2026-09-17-o20-cure/R/RECORD.md
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CURSOR/
```

`status-dot.contract.test.ts` and `public-surface.spec.ts` both read `MIGRATION.md`, which is why
they ran beside the doc and design suites: 1 + 94 of the 115. The gate receipt is byte-identical to
the round-1 close—nothing minted, no seat moved. `npm run verify:package` was not run and did not
need to be: this round changed no `dist/` byte, no `package.json` field and no published path.

**Fence, this round:** the same five files, and `git status --porcelain` shows the same five paths
and nothing else. No git verb ran. No sibling tree was read for write or written. Every Python edit
asserted `count == 1` (or `== 13`, for the dash pass) and checked `os.getcwd()` before writing.
