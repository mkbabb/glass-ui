# CLOSE-TESTS—the O-20 cure wave's test close

**Model id:** `claude-opus-5` (asserted from this seat's own transcript, not from
`CLAUDE_MODEL_ID`, which is unset).
**Transcript:**
`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_b83419d1-a4d/agent-a7dbee93943e3ffd4.jsonl`
Located by grepping the workflow subagent tree for `YOUR LANE: CLOSE-TESTS`, a
phrase unique to this prompt. Every command in this lane was gated on that id with `&&`:

```
$ grep -q '"model":"claude-opus-5' <transcript> && <command>
```

```
$ grep -o '"model":"[^"]*"' agent-a7dbee93943e3ffd4.jsonl | sort | uniq -c
   7 "model":"claude-opus-5"      ← at the first assertion, step 0
 145 "model":"claude-opus-5"      ← at the close, re-measured; one id, no second model
```

Both counts are of the SAME file and the SAME id; only the number of turns grew. The
cure round below runs in a second seat of this lane, whose own transcript is
`…/wf_b83419d1-a4d/agent-a861b1784ea9cf04f.jsonl` (`claude-opus-5`, 12 at assertion),
found by the same grep-for-a-unique-phrase method.

Em dashes in this file are tight (it is a NEW file). The three test files this lane
edits carry the repo's established spaced convention and my added prose matches each
file, per the house law.

---

## Step 0—baseline, banked before any byte

```
$ git rev-parse HEAD
dd8a5fe5e0b981fd4b2fe9e582c36d65495c28ba

$ git status --porcelain
(empty)

$ git branch --show-current
master
```

Gate receipt at baseline, verbatim:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

`seats:60 … drift:0 rosterSha256:282d05cf violations:0`. Nothing minted in this lane;
the receipt is re-quoted unchanged at the close, below.

---

## Item 1—the three timeout-less arms

### The anchor, and where the tree contradicts the order

The order re-anchors the two `public-surface.spec.ts` arms as "the two arms WITHOUT a
third `30_000` argument". **The tree carries five, not two.** At `dd8a5fe5` the file has
seven subprocess-probe arms; two already carry the budget (`:916`, `:933` at baseline,
Lane R's) and FIVE do not:

| it( line | arm                                                                  | isolated |
| -------- | -------------------------------------------------------------------- | -------- |
| 648      | rejects an isolated lock-only root mismatch in the existing verifier | 191ms    |
| 685      | rejects published CSS that does not parse                            | 188ms    |
| 738      | rejects duplicate and escaping normalized tar members                | 217ms    |
| 796      | G-BUNDLE-RATCHET: rejects datum±1                                    | 183ms    |
| 978      | rejects packed CSS drift against the built artifact                  | 215ms    |

`:648` in the order resolves exactly—it is the lock-only arm, at line 648 both at
`46ab4124` (pre-R) and at HEAD. **`:956` resolves to nothing.** Current line 956 sits
inside the `filesUnder` helper, between two `it(`s; the nearest untimed probe arm is
`:978`. Lane R's own record says where the pair came from: `R/RECORD.md:676` reads them
off vitest's RED output during run 1, taken against R's WIP tree—a state that no
longer exists on disk, and whose line numbers cannot be recovered by any reading of
`dd8a5fe5`.

**Disposition.** Rather than guess which two of five the stale numbers meant, I gave the
budget to all five. Grounds: they are one shape (each spawns a node child that imports
`scripts/verify-export-types.mjs`, which pulls `typescript` + `lightningcss` before a
line of the arm's own work), one cure, and one fence line—`tests/public-surface.spec.ts
(timeouts only)` covers all five. Lane R's residue asked for exactly this: "Same one-line
cure in each case … Worth doing in one pass rather than lane by lane—a battery that REDs
at random on machine load teaches everyone to read past its REDs, which is how a real one
gets missed" (`R/RECORD.md:801-809`). Timing two of five would have left the class alive
under a different line number.

### Acts

**1a.** `tests/public-surface.spec.ts`—five arms given an explicit `30_000` third
argument, the same house idiom the two sibling arms carry, each with a one-line comment
naming the reason:

```ts
        // Subprocess probe — verifier module load flakes vitest's 5s default under the full battery.
    }, 30_000);
```

Applied by `python3` with each anchor `count==1`-asserted and `pwd` asserted equal to the
repo root (`/private/tmp/claude-504/…/scratchpad/edit1_timeouts.py`):

```
$ pwd
/Users/mkbabb/Programming/glass-ui
$ python3 …/edit1_timeouts.py
OK: 5 anchors replaced
$ grep -n "30_000" tests/public-surface.spec.ts
673:    }, 30_000);
731:    }, 30_000);
793:    }, 30_000);
833:    }, 30_000);
920:    }, 30_000);
937:    }, 30_000);
1010:    }, 30_000);
```

`:920` and `:937` are Lane R's two, carried forward unchanged.

**1b.** `tests/demo/router-field-ownership.test.ts`—"keeps one story-owned field across
DockStage route navigation" given the same budget. Its reason is its own, so its comment
names it rather than copying the probe wording:

```ts
        // Each `push` resolves a lazily-imported route component (`demo/router.ts:21`),
        // so the arm's cost is module load, not assertion — vitest's 5s default flakes
        // under the full battery while the arm runs in under a second alone.
    }, 30_000);
```

`demo/router.ts` routes are `component: () => import(…)` at `:21`, `:40`, `:94`; the arm
`await`s two `router.push`es across that seam.

### Isolated measurements, as ordered

```
$ npx vitest run tests/demo/router-field-ownership.test.ts -t "keeps one story-owned field across DockStage route navigation" --reporter=verbose
 ✓ … keeps one story-owned field across DockStage route navigation 850ms
   Duration  1.20s (transform 699ms, setup 40ms, import 105ms, tests 851ms, environment 105ms)
```

```
$ npx vitest run tests/public-surface.spec.ts -t "<name>" --reporter=verbose      (five arms)
 ✓ … rejects an isolated lock-only root mismatch in the existing verifier   191ms   (Duration 2.65s)
 ✓ … rejects published CSS that does not parse                              188ms   (Duration 2.45s)
 ✓ … rejects duplicate and escaping normalized tar members                  217ms   (Duration 2.03s)
 ✓ … G-BUNDLE-RATCHET: rejects datum±1 …                                    183ms   (Duration 2.34s)
 ✓ … rejects packed CSS drift against the built artifact                    215ms   (Duration 2.62s)
```

Each arm's own work is a fifth of a second; the 5s that fails it under the battery is
module load plus machine contention, which is why the budget is stated rather than
inherited.

### Not a masking change

No predicate moved. The diff is six `});` → `}, 30_000);` plus comments; every `expect`
in all six arms is byte-identical to `dd8a5fe5`. A timeout is not a threshold on the
thing under test—it is the ceiling on how long the runner waits before calling a
non-answer an answer, and raising it can only turn a NON-VERDICT into a verdict, never a
RED into a green. The one loosening that WOULD mask is on a predicate, and there is none
here. Born-RED does not apply: no assertion changed.

```
$ npx vitest run tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts
 Test Files  2 passed (2)
      Tests  97 passed (97)
```

---

## Item 2—`tests/design/drive-tokens.test.ts`, the unescaped interpolations

Residue-5a item 4 (`RESIDUE-5A/RECORD.md:350-356`): three `new RegExp(…${token}…)` with no
escape, LATENT because the roster's capture admits no metacharacter.

### Can it be born-RED through the roster? No, and here is why

The capture is ``cells[1].match(/`(--[A-Za-z0-9_-]+)`/)?.[1]`` (`:49`). The class
`[A-Za-z0-9_-]` contains no regex metacharacter, and the match is backtick-delimited on
both sides, so a hostile code span cannot be captured AT ALL—it simply fails to match
and the row is dropped. **No document can drive a metacharacter into the predicate through
`kindFiveRows`**, so a born-RED against the roster path does not exist. Stated, as the
order permits, rather than manufactured.

What CAN be born-RED is the predicate itself, put to a hostile name directly—exactly
the half `plate-register.test.ts:76-84` asserts. So:

**2a (born-RED state).** `live` took a `source` parameter so a fixture can be put to
it—this is NOT the cure, and the predicate was left unescaped. Then the new arm was added.
Run, verbatim:

```
$ npx vitest run tests/design/drive-tokens.test.ts --reporter=verbose
 × tests/design/drive-tokens.test.ts > tunable-anim.md Kind-5 drive table > cannot be widened by a hostile token name 3ms
   → expected true to be false // Object.is equality

AssertionError: expected true to be false // Object.is equality
 ❯ tests/design/drive-tokens.test.ts:101:40
     99|         const fixture = "a { color: var(--f); }";
    100|         expect(live("--f", fixture)).toBe(true);
    101|         expect(live("--fo*", fixture)).toBe(false);
       |                                        ^

 Test Files  1 failed (1)
      Tests  1 failed | 3 passed (4)
```

Unescaped, `--fo*` compiles to `--f` followed by `o`-star, and
`var\(\s*--fo*(?![\w-])` MATCHES `var(--f)`—the predicate declares live a token that
exists nowhere. That is the whole defect, shown biting.

**2b (the cure).** `escapeRegExp` added, in the shape `plate-register.test.ts:44-45` now
carries, and all three interpolations escaped:

```ts
/** Regex metacharacters escaped, so an interpolated token matches as a literal. */
const escapeRegExp = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
…
    const live = (token: string, source: string = src): boolean => {
        const t = escapeRegExp(token);
        return (
            new RegExp(`@property\\s+${t}(?![\\w-])`).test(source) ||
            new RegExp(`(?<![\\w-])${t}\\s*:`).test(source) ||
            new RegExp(`var\\(\\s*${t}(?![\\w-])`).test(source)
        );
    };
```

**2c (the hostile arm).** Both halves, mirroring the sibling: the capture DROPS a hostile
row, and the predicate treats a hostile name as a literal.

```
$ npx vitest run tests/design/drive-tokens.test.ts tests/design/plate-register.test.ts --reporter=verbose
 ✓ … plate-register … cannot be widened by a hostile utility name 0ms
 ✓ … drive-tokens … cannot be widened by a hostile token name 0ms
 Test Files  2 passed (2)
      Tests  8 passed (8)
```

The real Kind-5 tokens are unchanged by the escape (their character set has nothing to
escape), so the two standing arms read exactly what they read before.

---

## Item 3—the demo build and the boot-graph gate

Pre-build, the gate is RED exactly as the order says, and says so in its own words:

```
$ npx vitest run tests/gates/boot-graph.test.ts
 × the dist-demo it measures is NEWER than every source it is built from 9ms
AssertionError: dist-demo/index.html is STALE (built 2026-09-18T01:49:07.692Z, newest source 2026-09-18T02:11:49.130Z) — run `npm run demo:dist:build`; a stale build greens a regressed graph
 Test Files  1 failed (1)
      Tests  1 failed | 13 passed (14)
```

Build, under the lock:

```
$ mkdir /private/tmp/claude-504/…/scratchpad/build.lock
LOCK_ACQUIRED
$ npm run demo:dist:build
…
dist-demo/assets/Aurora-DEvOTWvR.js   207.87 kB │ gzip: 69.26 kB
✓ built in 829ms
$ rmdir /private/tmp/claude-504/…/scratchpad/build.lock
LOCK_RELEASED
```

The lock was held for the build alone and released in the same command, so it cannot
outlive this seat. No library build (`npm run build`) ran in this lane; `demo:dist:build`
writes `dist-demo/` only.

Post-build:

```
$ npx vitest run tests/gates/boot-graph.test.ts
 Test Files  1 passed (1)
      Tests  14 passed (14)
GATE_EXIT=0
```

### The dark-mode stamp, by byte offset

`dist-demo/index.html` is 8,135 bytes. Measured, not asserted from prose:

```
<head>                  [355]
dark-mode stamp IIFE    [368, 685)   len=317
first <script module>   [2477]
first modulepreload     [2559]
first stylesheet <link> [7993]
</head>                 [8067]
modulepreload count: 63
ORDER OK: True
```

The stamp is the FIRST child of `<head>`, thirteen bytes in, and closes at 685—1,792
bytes before the entry module and 7,308 bytes before the only stylesheet link
(`/assets/index-B0FtjKoc.css`). It is the same IIFE, verbatim:

```html
<script>(function(){try{var m=localStorage.getItem("vueuse-color-scheme");var d=m==="dark"||((m===null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();</script>
```

No stylesheet, preload or module precedes it, so the `dark` class and `color-scheme` are
on `<html>` before a single style byte is parsed—no flash of the wrong mode.

---

## Item 4—the full battery, twice

Run 1, on the quiet tree after items 1-3:

```
$ npx vitest run
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
   Duration  10.37s (transform 16.42s, setup 12.54s, import 52.82s, tests 26.43s, environment 47.25s)
BATTERY_EXIT=0
```

Run 2:

```
$ npx vitest run
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
   Duration  11.75s (transform 19.87s, setup 14.71s, import 62.21s, tests 29.22s, environment 54.21s)
BATTERY_EXIT=0
```

**Zero REDs to attribute, in either run.** The wave's target—`0 failed | 10 expected
fail`—is met twice, and the `10 expected fail` is the standing xfail count, unmoved.
The flake this lane was sent to kill did not appear in either run; that is consistent
with the cure but is not by itself proof of it, since the arm passed in one of Lane R's
four runs too. The proof is the budget, not the streak.

**The live count is 2220, and exactly one arm of it is this lane's.** HEAD's live count is
2219, not 2218. R's LAST battery (`R/RECORD.md:1078-1084`) reads `1 failed | 2218 passed |
10 expected fail (2229)`—1+2218 = 2219 live, plus the standing 10 xfail—and it ran on a
tree that already carried 5a's plate-register hostile arm from `43c72339`. The `2218` is
R's EARLIER run (`R/RECORD.md:655-662`, `(2228)` = 2218 + 10), taken before 5a. So the
step is 2219 → 2220, this lane's one `drive-tokens` hostile arm, and there is nothing left
over to attribute.

Measured rather than inferred:

```
$ git show HEAD:tests/design/drive-tokens.test.ts | grep -c "    it("
3
$ grep -c "    it(" tests/design/drive-tokens.test.ts
4
```

And the concurrent lane is not in the number. `f999c11c` (CLOSE-DOCS) touched
`CHANGELOG.md`, `MIGRATION.md`, the disposition `LEDGER.md` and its own RECORD—no test
file at all (`git show --name-only f999c11c`). `grep -rn CHANGELOG tests/` → 0 hits. No
test reads the disposition `LEDGER.md`. `MIGRATION.md` is read exactly once, at
`tests/components/status-dot.contract.test.ts:19`, inside a file of SEVEN fixed `it(`s.
No suite in this repo mints a case per doc row; the earlier claim that one does was a
guess, and it was wrong.

---

## Item 5—the pixel-floor two-cell diagnostic (record only)

Nothing under `tests-visual/` was changed. No threshold and no spec byte moved. This was
the only browser-owning step in the lane; it launched its own chromium through
Playwright's `webServer` block, and no MCP browser tool was used. Playwright's chromium
was already installed (`chromium-1228`, `chromium_headless_shell-1228` under
`~/Library/Caches/ms-playwright/`), so no `npx playwright install` was needed.

### What the arm measures

`tests-visual/substrate-paints-color.spec.ts:664-760`, "blob paints a contained non-flood
droplet on BLOB_CONFIG_DEFAULTS". It forces the deterministic WebGL2 path, asserts the
renderer badge armed `webgl2`, then reads back frames and scores the SAME screenshots
twice, over two different denominators:

- **`BLOB_INTERIOR`**—a fixed inset box of the readback, in fractions. The FLOOR
  (`BLOB_COVERAGE_MIN = 0.1`) is scored over the whole of it: did the blob paint at all.
- **the PAINTABLE interior**—`BLOB_INTERIOR ∩ unclippedRegion(canvas)`, i.e. the
  interior box intersected with the canvas's bounding box after every clipping ancestor
  is applied. The CEILING (`BLOB_COVERAGE_MAX = 0.7`) is scored over THIS. Its point
  (`:457-466`): a flood must be scored against the pixels the canvas could actually
  reach, not diluted by the stage card's clip, which would let a real flood score low.
- **`paintedShare`** is the median over 3 runs of the per-run PEAK over 6 frames of
  "fraction of the paintable region whose pixel differs from the canvas-hidden baseline
  by |ΔR|+|ΔG|+|ΔB| > 40". So `0.997` means: on the most-filled frame, essentially every
  pixel the canvas can reach differs from the ground—no transparent margin survives.
  That is the definition of the flood class the ceiling exists to catch.
- **`groundMotion`** is the same differential measured between two baseline grabs with the
  canvas hidden: how much the PAGE UNDER the canvas moves on its own. It is the
  null—if the ground itself churned, the differential would be reading the page, not the blob.

### Cell (a)—exactly as CI, `PI_ANGLE=swiftshader`

```
$ PI_ANGLE=swiftshader npm -w tests-visual run gate:pixel-floor:ci
CELL_A_EXIT=1
```

**FAIL—but NOT on the ceiling, and not with CI's numbers.** It never reaches the
readback:

```
  1) [chromium-headless-new] › substrate-paints-color.spec.ts:664:5 › … › blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS

    Test timeout of 180000ms exceeded.

    Error: locator.scrollIntoViewIfNeeded: Test timeout of 180000ms exceeded.
    Call log:
      - attempting scroll into view action
        - waiting for element to be stable

    > 695 |         await blobCanvas.scrollIntoViewIfNeeded();

pixel-floor gate: RED (--expect=green)
  · required floor "blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS" did not pass on the real render (timedOut) — Test timeout of 180000ms exceeded.
```

**The three PI lines: NONE.** `grep "PI blob"` over the run log returns nothing, and the
machine report carries an empty `stdout`:

```
report: tests-visual/.cache/pi-report-green.json
{ "title": "blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS",
  "status": "timedOut", "duration": 360004,
  "err": "Test timeout of 180000ms exceeded.", "stdout": [] }
```

`scrollIntoViewIfNeeded` waits for the element's BOX to stop moving. Under the software
rasterizer on this machine it never does, for 180s. Run again to be sure it is the path
and not the moment—same failure, same line:

```
$ PI_ANGLE=swiftshader npm -w tests-visual run gate:pixel-floor:ci    (confirmation)
CELL_A2_EXIT=1
    Error: locator.scrollIntoViewIfNeeded: Test timeout of 180000ms exceeded.
pixel-floor gate: RED (--expect=green)
```

So local swiftshader REDs this arm two of two, and **does not reproduce CI's
0.997**—it degenerates earlier. CI's runner USUALLY gets past stability and reaches the
readback, but not always: of the thirty-four pixel-floor runs censused below, TWENTY-NINE
reach it on the green leg and FIVE never do, dying at a DIFFERENT failure—and one of the
twenty-nine reached it on the green leg and then died of the same thing on the PLANTED
leg:

```
Error: locator.screenshot: Protocol error (Page.captureScreenshot): Unable to capture screenshot
```

The five green-leg deaths are `32747589482` (2026-08-24, no PI line at all),
`32862369277` (2026-08-25, `paintable` then dead), `32864785902` (2026-08-25, likewise),
`33217756605` (2026-08-28, likewise) and `35302161628` (2026-09-18, the run at this lane's
own baseline `dd8a5fe5`, likewise). The sixth is `32746095576` (2026-08-24), where the
green leg printed its coverage and the PLANTED leg died of it, which is why that run's
verifier says `PLANTED DEFECT FAILED THE WRONG ASSERTION … the harness broke, the floor
did not bite`. That is a second, intermittent CI failure mode, distinct from this box's
`scrollIntoViewIfNeeded` stall: CI's captures the frame and then cannot serialise it, this
box never gets the box to hold still. Neither is the ceiling.

### Cell (b)—default ANGLE (real GPU; darwin resolves to Metal)

```
$ npm -w tests-visual run gate:pixel-floor:ci
CELL_B_EXIT=0
```

**PASS.** The three PI lines, verbatim:

```
PI blob paintable=[0.188,0.188]-[0.813,0.702] paintableShareOfInterior=0.557
PI blob baseline groundMotion=0.000
PI blob coverage=0.161 floor=0.1 · paintedShare=0.288 ceil=0.7
```

```
  1 passed (9.3s)
pixel-floor gate: GREEN — 1 floors ran on the live paint path and passed.
```

Report `tests-visual/.cache/pi-report-green.json`, blob row:

```
{ "title": "blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS",
  "status": "passed", "duration": 7453,
  "stdout": [ "PI blob paintable=… paintableShareOfInterior=0.557",
              "PI blob baseline groundMotion=0.000",
              "PI blob coverage=0.161 floor=0.1 · paintedShare=0.288 ceil=0.7" ] }
stats: { "expected": 1, "unexpected": 0, "flaky": 0, "duration": 9313.088 }
```

### The adjudication

**On a GPU it is not a flood, and it is not close.** `paintedShare = 0.288` against a
ceiling of `0.7`—the blob paints under a third of the pixels it could reach, and leaves
the rest transparent. `groundMotion = 0.000` says the differential is reading the canvas
and nothing else, so the 0.288 is the droplet, not the page. `paintableShareOfInterior =
0.557` says the stage clip hides 44% of the interior box, which is exactly why the
ceiling uses the paintable denominator: over the WHOLE interior the same frames score
`coverage = 0.161`, and a real flood there would read ~0.557 and slip under 0.7. The
ceiling is doing its job; the paint is contained.

**So CI's 0.997 is a renderer artefact, not a defect in the blob**—but the two cells are
NOT the same run under one changed variable, and saying so would overclaim. What they
actually are:

| | cell (b), here | CI |
| --- | --- | --- |
| OS / backend | darwin 25.4.0, default ANGLE → Metal | `ubuntu-latest` (`ci.yml:40`), `PI_ANGLE: swiftshader` (`ci.yml:45`) |
| tree | the `dd8a5fe5` working tree | the pushed commits `81f7db0d` … `43c72339` … `f999c11c` |
| spec bytes | unchanged since `5a69ed9f` | same |
| `src/components/blob` | unchanged since `0241154e` (2026-08-08), before the last green | same |

Two OSes, two rasterizers, one spec and one shader. The comparison is still the one that
matters—nothing under `src/components/blob` has moved since well before the last green, so
whatever changed, it is not the paint—but it is a cross-machine comparison, not a
single-variable one.

**CI's own three lines, in hand.** From run `35300305888`, job `105462145160`
(`gh run view --job 105462145160 --log | grep 'PI blob'`), verbatim:

```
PI blob paintable=[0.188,0.188]-[0.813,0.702] paintableShareOfInterior=0.557
PI blob baseline groundMotion=0.000
PI blob coverage=0.578 floor=0.1 · paintedShare=0.997 ceil=0.7
```

Byte-identical on all TWENTY-FOUR of the twenty-seven ceiling-RED runs that carry the
narrowed 0.557 denominator—every one of them prints `Received: 0.9974811083123426` to the
last digit. The other three ceiling REDs are the pre-narrowing rows (0.757, 0.757, 0.759).
Set against Metal's:

| | swiftshader (CI) | Metal (here) |
| --- | --- | --- |
| `paintable` region | `[0.188,0.188]-[0.813,0.702]` | `[0.188,0.188]-[0.813,0.702]` |
| `paintableShareOfInterior` | 0.557 | 0.557 |
| `groundMotion` | 0.000 | 0.000 |
| whole-interior `coverage` | 0.578 | 0.161 |
| `paintedShare` (the ceiling's number) | 0.997 | 0.288 |

The region is the same rect and the ground is the same null, so the denominators and the
baseline are not what differ—only the painted pixels are. Restated as measured: **the
swiftshader differential covers the ENTIRE reachable rect (0.997), Metal's covers 29% of
it (0.288)**, and on the whole interior 0.578 against 0.161. Same geometry, same ground,
3.5× the painted area.

**What is now in hand, and what still is not.** CI's three PI lines are in hand—read
straight out of the pixel-floor JOB LOG, above—so the cross-machine numbers are no longer
a gap. What remains unmeasured is one thing only: the PIXEL-LEVEL MECHANISM. The
hypothesis is that SwiftShader composites the blob's soft alpha field as opaque, so every
pixel of the canvas differs from the hidden-canvas baseline by more than the threshold of
40 and the margin that exists in the float buffer never survives to the readback. It fits
every number here—0.997 against 0.288 on an identical rect with an identical null
ground—but nobody has looked at the pixels, and this seat could not, because local
swiftshader never reached the readback. Settling it needs a pixel dump (or a swept
threshold) from a box whose swiftshader path stabilises; the CI runner is such a box.

**The banked artifact is not that box, and is not a route to anything.**
`pixel-floor-pi-reports` is a DEAD POINTER. Every one of the thirty-four runs examined,
from the last green `32743826000` through `35304894096`, ends its upload step with:

```
##[warning]No files were found with the provided path: tests-visual/.cache/pi-report-*.json
tests-visual/.cache/aurora-*.png. No artifacts will be uploaded.
```

Thirty-four for thirty-four, the last green included. The gate script `rm -f`s and rewrites
that path inside the workspace, but by the upload step there is nothing at it, so the
artifact has never carried a byte. **Read the job log instead**—that is where the three PI
lines actually live:

```
$ gh run view --job <pixel-floor job id> --log | grep 'PI blob'
```

### The CI census, and the history that decides the fix class

**[2026-09-18] The census below was REDONE at the cursor seat, whole.** This lane's first
pass sampled seventeen runs and read them as the population; they are seventeen of
THIRTY-FOUR. The denominator, the splits and every count-bearing figure in this section
are restated to the full window. The qualitative conclusions did not move—the added
seventeen rows all sit in the two classes already named—but no figure here is a sample any
more.

The window is every `ci.yml` run on `master` that reached the `pixel-floor` job, from the
last green `32743826000` (`350f7a90`, 2026-08-24T15:16:13Z) through `35304894096`
(`f999c11c`, 2026-09-18T03:53:33Z) inclusive. **THIRTY-FOUR runs, and all thirty-four
reached the job**—the `verify` job it needs is `success` in every one, so none was skipped.
Enumerated by:

```
$ gh run list --branch master --workflow ci.yml --limit 60 --json databaseId,headSha,conclusion,createdAt
$ gh run view <id> --json jobs --jq '.jobs[] | "\(.name)\t\(.conclusion)"'
$ gh run view <id> --log-failed | grep -E "PI blob|captureScreenshot|Expected|Received"
```

Two later runs, `35306922104` (`4501fc77`) and `35306993586` (`c0d43348`), were still
`in_progress` when this census was taken and are outside the window by construction.

`coverage` is whole-interior; `share` is `paintedShare`, the ceiling's number:

| run | commit | date | paintable | coverage | share | verdict |
| --- | --- | --- | --- | --- | --- | --- |
| 32743826000 | `350f7a90` | 08-24 | (not printed) | 0.577 | `band=[0.1,0.7]` | **GREEN** |
| 32746095576 | `ac471032` | 08-24 | (not printed) | 0.577 | `band=[0.1,0.7]` | RED, planted leg died at captureScreenshot |
| 32747589482 | `96f0f257` | 08-24 | n/a | n/a | n/a | RED, captureScreenshot |
| 32748129107 | `407de2d3` | 08-24 | 0.761 | 0.577 | **0.757** | RED on the ceiling |
| 32750154142 | `8a96868d` | 08-24 | 0.761 | 0.577 | 0.757 | RED on the ceiling |
| 32861215310 | `9f6d0ec9` | 08-25 | 0.761 | 0.578 | 0.759 | RED on the ceiling |
| 32861962397 | `5a69ed9f` | 08-25 | **0.557** | 0.578 | **0.997** | RED on the ceiling |
| 32862369277 | `964535cb` | 08-25 | 0.557 | n/a | n/a | RED, captureScreenshot |
| 32864785902 | `c1a97a33` | 08-25 | 0.557 | n/a | n/a | RED, captureScreenshot |
| 32866162100 | `76b594c8` | 08-25 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 32869413412 | `ac32ed8c` | 08-25 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 32870971521 | `49898499` | 08-25 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33195173839 | `ebb58a0f` | 08-28 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33197728994 | `739bf63d` | 08-28 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33197890522 | `eb2e9428` | 08-28 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33215488751 | `87464122` | 08-28 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33216382340 | `5cd70d08` | 08-28 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33217756605 | `ac204dca` | 08-28 | 0.557 | n/a | n/a | RED, captureScreenshot |
| 33270078111 | `dfe6971f` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33271316991 | `8279472c` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33271519268 | `30abc048` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33272568426 | `1611808f` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33273556556 | `d4f7b24f` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 33274260687 | `3a2329c1` | 08-29 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35248085930 | `e91b7b7e` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35249351465 | `887a0db9` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35271701160 | `81f7db0d` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35278363969 | `2984e377` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35284430003 | `46ab4124` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35288387568 | `c645c393` | 09-17 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35298037316 | `a314533a` | 09-18 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35300305888 | `43c72339` | 09-18 | 0.557 | 0.578 | 0.997 | RED on the ceiling |
| 35302161628 | `dd8a5fe5` | 09-18 | 0.557 | n/a | n/a | RED, captureScreenshot |
| 35304894096 | `f999c11c` | 09-18 | 0.557 | 0.578 | 0.997 | RED on the ceiling |

**Whole-interior coverage is 0.577-0.578 in every row that printed it, all thirty-four
censused and the last green included.** The
paint has not moved since before the last green—consistent with `src/components/blob`
being untouched since `0241154e` (2026-08-08). What moved is the DENOMINATOR, twice:

1. `407de2d3` (γ3) re-denominated the ceiling from the whole interior to the paintable
   region. On its OWN run the new number was already 0.757 against a 0.7 ceiling. **The
   re-denominated ceiling has never once been green on swiftshader.** The prior green was
   green by dilution: 0.577 measured over an interior that is 44% unreachable.
2. `5a69ed9f` narrowed the paintable region itself, 0.761 → 0.557, which pushed the same
   paint from 0.759 to 0.997. That commit is the spec's own last, and its diff says
   exactly what it did: `unclippedRegion`'s ancestor walk had only looked for the literal
   word `paint` in `contain`, so `contain: strict`, `contain: content` and any
   `content-visibility` other than `visible` scored as transparent. Teaching it to see
   those three shrank the rect to what the canvas can really reach. The denominator got
   MORE correct, and the arm got redder.

(The order's draft of this history put the 0.557 narrowing at `9f6d0ec9`. Measured, that
run still reads `paintable=…0.761` and `paintedShare=0.759`; the narrowing lands one
commit later, at `5a69ed9f`, and by the spec's own clip-detection fix rather than a
chassis change. Corrected here to what the logs say. The full census adds `8a96868d`
(0.761 / 0.757) between `407de2d3` and `9f6d0ec9`, which puts three runs on the wide
denominator and every run after `5a69ed9f` on the narrow one—the transition is a clean
step, not a drift.)

**Three things the driver should not conflate.** The thirty-four split 1 GREEN + 27 + 6.
(i) CI's STANDING RED is a mis-scored ceiling on a contained paint—TWENTY-SEVEN runs of
thirty-four, every one of them `paintedShare` over `ceil`. (ii) CI's INTERMITTENT RED is
`Page.captureScreenshot` refusing to serialise a frame the run already reached—SIX runs,
five on the green leg (one of them at this lane's baseline) and one on the planted leg.
(iii) THIS BOX's RED is a canvas that never stops moving under software GL, 180s, two of
two. Three facts, probably three fixes; only (i) is the one `ci.yml` has been failing on
continuously since 2026-08-24.

### On-disk state after this lane

`tests-visual/.cache/pi-report-green.json` is the CONFIRMATION run's (cell a2) RED report,
because that ran last and the gate script `rm -f`s and rewrites that one path. The GREEN
Metal report is quoted whole above rather than left on disk under a name that would
misdescribe it. `tests-visual/test-results/` carries the two swiftshader error contexts.
Both directories are gitignored (`tests-visual/.gitignore:3,5`).

---

## VERIFY—verbatim, with real exit codes at this end

Run at the baseline `dd8a5fe5`, and RE-RUN in full at `f999c11c` after the concurrent lane
committed—see CURE ROUND 1 for the second set, which is identical line for line.

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_APP_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSC_TEST_EXIT=0
```

```
$ npx vitest run tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts
 Test Files  2 passed (2)
      Tests  97 passed (97)

$ npx vitest run tests/design/drive-tokens.test.ts tests/design/plate-register.test.ts
 Test Files  2 passed (2)
      Tests  8 passed (8)

$ npx vitest run tests/gates/boot-graph.test.ts
 Test Files  1 passed (1)
      Tests  14 passed (14)

$ npx vitest run            (run 1)
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
BATTERY_EXIT=0

$ npx vitest run            (run 2)
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
BATTERY_EXIT=0
```

```
$ npx prettier --check tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts tests/design/drive-tokens.test.ts
Checking formatting...
[warn] tests/public-surface.spec.ts
[warn] tests/demo/router-field-ownership.test.ts
[warn] Code style issues found in 2 files. Run Prettier with --write to fix.
PRETTIER_EXIT=1
```

**Stated, and not fixed, deliberately.** The repo carries no prettier config
(no `.prettierrc*`, no `prettier.config.*`, `package.json.prettier === null`), so
`--check` measures library defaults. Both WARNing files were ALREADY WARN at
`dd8a5fe5`—measured directly, before any edit:

```
$ git show HEAD:<file> | npx prettier --check --stdin-filepath <file>
tests/public-surface.spec.ts                  WARN@HEAD
tests/demo/router-field-ownership.test.ts     WARN@HEAD
tests/design/drive-tokens.test.ts             CLEAN@HEAD
```

And my bytes are not among the complaints—the formatted output differs from the working
tree on 116 lines in `public-surface.spec.ts` and 7 in `router-field-ownership.test.ts`,
and NONE of them is a line this lane wrote:

```
$ diff <(cat <file>) <(npx prettier <file>) | grep -n "Subprocess probe\|30_000\|lazily-imported\|module load, not assertion"
(empty, both files)
```

This RECORD is `--check` WARN too, and stays so DELIBERATELY: prettier's one substantive
complaint is that it wants to reformat the quoted dark-stamp IIFE from the one line the
artifact actually ships into fifteen. A `--write` here would rewrite the evidence, so the
two cosmetic deltas (table padding, one list continuation) were fixed by hand instead and
the verbatim block left exactly as `dist-demo/index.html` carries it.

`tests/design/drive-tokens.test.ts` was CLEAN at HEAD and is CLEAN now—the file I
touched most is the one that stayed formatted. Running `--write` on the other two would
reformat ~123 pre-existing lines under a convention the repo has never adopted, far past
"timeouts only". Not done.

Gate receipt at the close, verbatim and unchanged from baseline:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60 … drift:0 rosterSha256:282d05cf violations:0`. No gate minted, no seat moved,
no threshold loosened.

---

## FENCE

Files this lane created or modified, and nothing else:

- `tests/public-surface.spec.ts`—timeouts only (five `}, 30_000);` + five comment lines)
- `tests/demo/router-field-ownership.test.ts`—one timeout + a three-line comment
- `tests/design/drive-tokens.test.ts`—`escapeRegExp`, the three escapes, the `source`
  parameter, the hostile-name arm
- `dist-demo/`—build output (`npm run demo:dist:build`, under the lock, released)
- `tests-visual/.cache`, `tests-visual/test-results`—run output of the three gate runs
- `docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/RECORD.md`—this file

```
$ git diff --stat -- tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts tests/design/drive-tokens.test.ts
 tests/demo/router-field-ownership.test.ts |  5 ++++-
 tests/design/drive-tokens.test.ts         | 34 +++++++++++++++++++++++++++----
 tests/public-surface.spec.ts              | 15 +++++++++-----
 3 files changed, 44 insertions(+), 10 deletions(-)
```

```
$ git status --porcelain                          # SNAPSHOT: mid-lane, HEAD dd8a5fe5
 M CHANGELOG.md
 M MIGRATION.md
 M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
 M tests/demo/router-field-ownership.test.ts
 M tests/design/drive-tokens.test.ts
 M tests/public-surface.spec.ts
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-DOCS/
```

That is a SNAPSHOT, taken before this file existed and before `f999c11c`. The first three
paths and the untracked `CLOSE-DOCS/` were the concurrent lane's, not mine, and it has
since committed them. Re-measured at the close:

```
$ git rev-parse HEAD                              # AT CLOSE
f999c11c75e718c22dcba8f0870d619b0e02d8f6
$ git status --porcelain                          # AT CLOSE
 M tests/demo/router-field-ownership.test.ts
 M tests/design/drive-tokens.test.ts
 M tests/public-surface.spec.ts
?? docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/
```

Everything left in the tree is this lane's and nothing else is. **HEAD is no longer
`dd8a5fe5`.** The concurrent lane committed `f999c11c` (`CHANGELOG.md`, `MIGRATION.md`,
the disposition `LEDGER.md`, its own RECORD—docs only, no test file) while this lane was
running, so the baseline stays `dd8a5fe5` and the pathspec commit will land on `f999c11c`.
Every VERIFY line below was re-run at `f999c11c`, after that commit, not just at the
baseline.

No `git add`, `commit`, `stash`, `checkout` or `reset` was run. No `tests-visual/` source
byte, no threshold, no spec. No sibling repo and no `docs/precepts` write. The three
CLOSE-DOCS paths above were
never opened for writing by this seat. The build lock was acquired and released in one
command and is not held.

---

## RESIDUE

1. **The order's `:956` anchor is unresolvable, and five arms were timed where two were
   named.** Grounds in full under Item 1. If the driver wanted exactly two, the three
   extra are `:685` (published CSS parse), `:738` (tar members) and `:796`
   (G-BUNDLE-RATCHET)—one line and one comment each, trivially revertible. I judged
   leaving three same-shaped arms on the 5s default to be the worse outcome, and Lane R's
   own residue asked for the one-pass cure.

   **A hand-off this lane's fence barred.** `R/RECORD.md` carries the wrong `:956` anchor
   as committed prose in three places—`:676`, `:683`, `:793`—and this lane proved it
   wrong without being allowed to strike it there. Whoever holds that file (the driver)
   owes it a dated strike in ITS OWN convention, which is spaced (124 spaced : 0 tight),
   e.g.

   ```
   [2026-09-17 · CLOSE-TESTS: ":956" is inside the filesUnder helper at dd8a5fe5 — the
   untimed probe arms were :648, :685, :738, :796, :978; all five budgeted at CLOSE-TESTS]
   ```

2. **CI's pixel-floor RED is not reproducible on this box.** Local swiftshader REDs two of
   two on `scrollIntoViewIfNeeded` stability, never reaching the readback, so the 0.997 is
   adjudicated from the Metal cell (0.288, GREEN) rather than measured against its own
   backend. CI's own three PI lines ARE now in hand—out of the pixel-floor JOB LOG
   (`gh run view --job <id> --log | grep 'PI blob'`), thirty-four runs censused. The banked
   `pixel-floor-pi-reports` artifact is NOT a route to them: it is empty in all thirty-four,
   the last green included. What is still unmeasured is only the pixel-level mechanism.

3. **The canvas that never stabilises under software GL is its own defect, unowned.** It
   is not the ceiling bug and it is not in this fence. It means the blob's box keeps
   moving for 180s under SwiftShader on an M-series box—the substrate canvas-resize
   class, not a paint-value class. Flagged for whoever owns `tests-visual/`.

   **And a THIRD failure shape, on CI itself:**
   `locator.screenshot: Protocol error (Page.captureScreenshot): Unable to capture
   screenshot`, on six of the thirty-four runs (`32746095576` planted leg, `32747589482`,
   `32862369277`, `32864785902`, `33217756605`, `35302161628`). It reaches the frame and
   cannot serialise it, which is
   neither the ceiling nor the stall. On `32746095576` it hit the PLANTED leg and the
   verifier said so in as many words: `the harness broke, the floor did not bite`. A
   harness that dies on the plant is a hollow gate for that run. Unowned, same fence
   reason.

4. **`public-surface.spec.ts` and `router-field-ownership.test.ts` are prettier-WARN at
   HEAD and remain so.** ~123 lines between them, none mine. A repo-wide prettier
   decision, not a cure-wave one.

5. ~~**The battery's live count moved 2218 → 2220 and only one is mine.**~~ **WITHDRAWN,
   2026-09-18.** There was no second arm to attribute. HEAD's live count is 2219 and this
   lane's one `drive-tokens` arm makes 2220; the `2218` was R's PRE-5a run. Measured under
   Item 4. Not a residue.

---

## FOR THE DRIVER

**Commit by pathspec, three files:**

```
tests/public-surface.spec.ts
tests/demo/router-field-ownership.test.ts
tests/design/drive-tokens.test.ts
docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/RECORD.md
```

Nothing else in the working tree is mine. `dist-demo/`, `tests-visual/.cache` and
`tests-visual/test-results` are gitignored build and run output and want no pathspec.

**What is closed:** the flake class (six arms budgeted, predicates untouched), the
residue-5a escape (born-RED shown, cured, hostile arm added), the stale boot-graph gate
(rebuilt, 14/14, dark stamp verified at byte 368 of 8,135, before every stylesheet and
module), and the battery twice at `0 failed | 10 expected fail`. Typecheck 0/0. Gate
receipt `seats:60 … drift:0 rosterSha256:282d05cf violations:0`, unchanged.

**What is open, and what it costs:**

- The `:956` over-reach decision is yours to ratify or trim (Residue 1). One
  `git checkout -p` if you want two instead of five—but read the grounds first. The
  strike was made at the cursor seat on 2026-09-18: three dated brackets now open at
  `R/RECORD.md:678`, `:691` and `:810`, under the `:956` mentions that sat at `:676`,
  `:683` and `:793` at `c0d43348`; Residue 1's draft was the basis.
- `ci.yml`'s pixel-floor leg stays RED and this lane could not cure it, only adjudicate
  it: the blob is CONTAINED on a real GPU (0.288 of a 0.7 ceiling, ground null at 0.000),
  so the 0.997 belongs to SwiftShader. CI's three PI lines are now in hand—**read the JOB
  LOG, not the artifact**: `gh run view --job <pixel-floor job id> --log | grep 'PI blob'`.
  The `pixel-floor-pi-reports` artifact is empty in all thirty-four runs since the last
  green, so any instruction pointing at it is a dead pointer.
- **The CI history decides the fix class, and it rules out the threshold.** Whole-interior
  coverage was 0.577 at the last green `350f7a90` under the OLD `band=[0.1,0.7]` (green by
  dilution); 0.757 at γ3's own commit `407de2d3`, the first run of the re-denominated
  ceiling, on a paintable share of 0.761; and 0.997 once `5a69ed9f` narrowed that share to
  0.557 by teaching `unclippedRegion` to see `contain: strict | content` and
  `content-visibility`. Coverage over the whole interior never left 0.577-0.578 in any of
  it. **So the re-denominated ceiling has NEVER been green on swiftshader**, not once, not
  even at birth—which makes this a backend problem, not a regression. The cure is a
  GPU-gated arm (the aurora precedent, `ci.yml:54-57`) or a backend-aware ceiling. **Never
  a loosened 0.7**: 0.7 is green on the GPU with 0.288 to spare, and loosening it past
  0.997 retires the flood class the `blob-flood` plant exists to prove.
- Residue 3 is TWO more defects hiding behind the first: this box's software-GL stall, and
  CI's own intermittent `Page.captureScreenshot` death (six of thirty-four, one of them on
  the planted leg, where it hollowed the gate for that run).

---

## CURE ROUND 1—2026-09-18

**Model id:** `claude-opus-5`, asserted from THIS seat's own transcript,
`…/wf_b83419d1-a4d/agent-a861b1784ea9cf04f.jsonl`
(`{"agentType":"workflow-subagent","description":"CLOSE-TESTS:cure",…}`), found by grepping
the workflow subagent tree for a phrase unique to the cure prompt. `CLAUDE_MODEL_ID` is
unset; the parent session file was not read for it. Every command below was gated on it
with `&&` on one line:

```
$ M=$(grep -o '"model":"[^"]*"' <transcript> | sort -u | head -1) && [[ "$M" == '"model":"claude-opus-5"' ]] && <command>
```

Eight cures, all in THIS file. No test byte, no spec byte, no threshold moved in this
round: `git diff --stat` on the three test files is unchanged from the round-1 numbers
below. This file is the wave's OWN prose, written today and never committed, and every
cure is a precision correction the re-adjudicator ordered by line, so the corrections are
made PLAINLY in place rather than by dated bracket—except Residue 5, where the withdrawal
of a claim is itself the finding and the struck text is kept visible.

### The act ledger

| # | line(s) | what was wrong | what it says now |
| --- | --- | --- | --- |
| 1 | Item 4 count block; Residue 5 | `2218 → 2220 … the other belongs to CLOSE-DOCS … at least one suite mints it(s per doc row`—a guess, and false | 2219 → 2220, all of it this lane's; the `2218` identified as R's pre-5a run; Residue 5 WITHDRAWN |
| 2 | the adjudication | `the same spec, the same commit, the same assertion, differing only in the ANGLE backend` | two OSes and two rasterizers, stated as such, plus CI's three lines quoted and set against Metal's in a table |
| 3 | 3 pointers + `What I did NOT establish` | pointed at the `pixel-floor-pi-reports` artifact | points at the job log; the artifact named a dead pointer, 17/17 empty; only the pixel mechanism left open |
| 4 | the swiftshader cell | `CI's runner does get past stability and reaches the readback` | 14 of 17 do; 3 never reach it and a 4th dies on the planted leg, all at `Page.captureScreenshot`—a second CI mode, added to Residue 3 |
| 5 | Residue 1, FOR THE DRIVER | the `R/RECORD.md` `:956` prose left un-struck with no hand-off | the dated bracket written out in R's spaced convention, and the driver told it is owed |
| 6 | the byte block | `first modulepreload [2565]` | `[2559]`, the tag start |
| 7 | header, FENCE | a 7-turn transcript count and a porcelain block read as if current; `HEAD … unmoved` | both stamped as snapshots and re-measured at close; HEAD is `f999c11c` |
| 8 | FOR THE DRIVER | no history to decide the fix class | the full CI census 350f7a90 → f999c11c, and why 0.7 is not the cure |

### The measurements behind them

```
$ git show HEAD:tests/design/drive-tokens.test.ts | grep -c "    it("   →  3
$ grep -c "    it(" tests/design/drive-tokens.test.ts                   →  4
$ grep -rn CHANGELOG tests/ | wc -l                                     →  0
$ grep -rn MIGRATION tests/                → one READ, status-dot.contract.test.ts:19
$ grep -c "^\s*it(" tests/components/status-dot.contract.test.ts        →  7
$ git show --name-only f999c11c            → CHANGELOG.md · MIGRATION.md ·
                                             CLOSE-DOCS/RECORD.md · LEDGER.md   (no tests/)
$ grep -n "ubuntu-latest\|PI_ANGLE" .github/workflows/ci.yml            → 11, 40, 45
$ git log --oneline -1 -- tests-visual/substrate-paints-color.spec.ts   → 5a69ed9f
$ git log --oneline -1 -- src/components/blob                           → 0241154e
$ git merge-base --is-ancestor 0241154e 350f7a90                        → yes (blob predates the last green)
$ python3 -c "...find first <link …modulepreload…>..."  → tag start 2559, rel= at 2565
$ grep -c 'No files were found .* pi-report' <each of 34 run logs>      → 1, thirty-four times
$ grep -n "956" …/R/RECORD.md                                           → 676, 683, 793
$ python3 -c "count ' — ' vs tight in R/RECORD.md"                      → spaced 124, tight 0
$ grep -o '"model":"[^"]*"' agent-a7dbee93943e3ffd4.jsonl | sort | uniq -c → 145 claude-opus-5
```

### Three places the order's own text needed correcting, and did not get copied

1. **`ci.yml:44` → `:45`.** `PI_ANGLE: swiftshader` is at line 45; 44 is the comment above
   it. `runs-on: ubuntu-latest` at 40 is right. Written as measured.
2. **`9f6d0ec9 narrowed the stage clip to 0.557` → `5a69ed9f` did, and not by a stage
   change.** Run `32861215310`, at `9f6d0ec9` itself, still reads
   `paintable=[0.074,0.124]-[0.926,0.702] paintableShareOfInterior=0.761` and
   `paintedShare=0.759`. The narrowing appears one commit later, at `5a69ed9f`
   (`32861962397`), whose diff to `substrate-paints-color.spec.ts` is the cause in its own
   words: `unclippedRegion` learned that `contain: strict`, `contain: content` and
   `content-visibility` other than `visible` all clip. A more correct denominator, not a
   narrower card. The order's CONCLUSION survives intact and is strengthened—the ceiling
   was already RED at 0.757 on its own birth commit, before any narrowing.
3. **`8 of 11` → `29 of 34`, and SIX screenshot deaths.** Censusing every `ci.yml` run
   that reached the `pixel-floor` job from the last green to `f999c11c` gives THIRTY-FOUR,
   not eleven and not the seventeen this lane first sampled: 1 GREEN, 27 RED on the
   ceiling, 5 that never reach the readback, and `32746095576` (2026-08-24), a sixth
   screenshot death this time on the planted leg. The dead-artifact warning is 34 for 34.
   [2026-09-18 · redone whole at the cursor seat; the seventeen-run figures this item
   first carried were a sample, and the census section above is the record.]

### Re-run of the full verify set, at `f999c11c`

```
$ npx vue-tsc --noEmit -p tsconfig.json
TSC_APP_EXIT=0

$ npx vue-tsc --noEmit -p tsconfig.test.json
TSC_TEST_EXIT=0

$ npx vitest run tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts \
                 tests/design/drive-tokens.test.ts tests/design/plate-register.test.ts \
                 tests/gates/boot-graph.test.ts
 Test Files  5 passed (5)
      Tests  119 passed (119)
   Duration  3.00s

$ npx vitest run            (run 1)
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
   Duration  12.64s
BATTERY1_EXIT=0

$ npx vitest run            (run 2)
 Test Files  233 passed (233)
      Tests  2220 passed | 10 expected fail (2230)
   Duration  16.89s
BATTERY2_EXIT=0

$ npx prettier --check tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts tests/design/drive-tokens.test.ts
Checking formatting...
[warn] tests/public-surface.spec.ts
[warn] tests/demo/router-field-ownership.test.ts
[warn] Code style issues found in 2 files. Run Prettier with --write to fix.
PRETTIER_EXIT=1

$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`0 failed | 10 expected fail`, twice, now on a tree whose HEAD carries the concurrent
lane's doc commit—so the battery is green against the NEW `CHANGELOG.md`, `MIGRATION.md`
and `LEDGER.md` too, not only against the baseline. Prettier is the same two pre-existing
WARNs, unchanged and deliberately unfixed (grounds in VERIFY, above). The gate receipt is
byte-identical to the baseline: `seats:60 … drift:0 rosterSha256:282d05cf violations:0`.
Nothing minted, no seat moved, no threshold loosened in this round.

### Fence, this round

Files touched: `docs/tranches/BK/execution/2026-09-17-o20-cure/CLOSE-TESTS/RECORD.md`,
and nothing else. No `git add`, `commit`, `stash`, `checkout` or `reset`. No build ran, so
the build lock was neither taken nor needed. No browser ran. The three test files carry
byte-for-byte what round 1 left in them:

```
$ git diff --stat -- tests/public-surface.spec.ts tests/demo/router-field-ownership.test.ts tests/design/drive-tokens.test.ts
 tests/demo/router-field-ownership.test.ts |  5 ++++-
 tests/design/drive-tokens.test.ts         | 34 +++++++++++++++++++++++++++----
 tests/public-surface.spec.ts              | 15 +++++++++-----
 3 files changed, 44 insertions(+), 10 deletions(-)
```

Em dashes: tight everywhere this round wrote, per the NEW-file law. The one exception is
the bracket quoted in Residue 1, which is spaced on purpose because it is destined for
`R/RECORD.md` and must match that file's own convention (124 spaced : 0 tight).

### Residue, this round

1. **The `R/RECORD.md` `:956` strike was outside this fence and is now made.** Written out
   in Residue 1 as a draft; the cursor seat opened three dated brackets at `R/RECORD.md:678`,
   `:691` and `:810` on 2026-09-18 with that draft as the basis. It was the only prose this
   lane proved wrong and could not correct itself.
2. **The pixel mechanism is still unmeasured.** Every number is now in hand on both
   backends; nobody has looked at the pixels. Named in the adjudication, not papered over.
3. **CI's `Page.captureScreenshot` deaths are unowned**, including the one that hollowed
   the planted leg. Not in this fence either.
