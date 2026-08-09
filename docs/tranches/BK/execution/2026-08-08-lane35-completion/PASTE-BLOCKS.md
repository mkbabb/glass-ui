# BK #35 W-SLIDER — PASTE-BLOCKS

Literal runner output. The tail moves as the driver commits each lane, so the commit is written as
the literal `⊕ⁿ` / `<SHA>` and the back-annotation seat substitutes.

Seat model: **`claude-opus-5[1m]`**. Baseline: `/tmp/bk-lane35-baseline-1786240373.diff`, HEAD at
open `727f672327fcd5cdc18e37a43d2da0e15f171bf6`, porcelain 56 / untracked 5.

---

## 1 · `npx vue-tsc --noEmit`

```
TSC_EXIT=0 LINES=       0
```

Zero diagnostics, zero output lines.

---

## 2 · `npx vitest run tests/styles tests/components tests/gates`

```
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the eager graph stays under the modulepreload and byte ceilings
AssertionError: eager graph: 63 modulepreloads + 1 entry = 64 files / 477311 B: expected 63 to be less than or equal to 60
 ❯ tests/gates/boot-graph.test.ts:557:46

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  tests/styles/emitted-utility-vars.test.ts > emitted component utilities > routes the emitted transition-duration chain through --duration-fast
AssertionError: expected '0s' to contain 'var(--duration-fast'

Expected: "var(--duration-fast"
Received: "0s"

 ❯ tests/styles/emitted-utility-vars.test.ts:117:54

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


 Test Files  2 failed | 160 passed (162)
      Tests  2 failed | 1543 passed | 5 expected fail (1550)
   Start at  22:03:28
   Duration  16.46s (transform 31.44s, setup 16.99s, import 88.16s, tests 34.22s, environment 69.21s)
```

**Banked expectation met exactly**: `2 failed | 1543 passed | 5 expected fail`. The two failures are
the two banked ones, named by their detectors verbatim above — `boot-graph` → **#66**,
`emitted-utility-vars` → **#85**. **Zero added, zero subtracted.**

Measured at the baseline tree *before* any byte of this seat, and again after the cures: identical.

> **Runner note, banked as a lesson.** `--reporter=basic` no longer resolves on this vitest
> (`Failed to load custom Reporter from basic`) and the process still exits **0** on that startup
> error. The piped-exit-code trap in a new dress: read the totals line, never the exit code. All
> blocks here are from the default reporter.

---

## 3 · `node scripts/gate-register.mjs`

```
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
```

**Byte-identical** to the banked receipt, pre-seat and post-seat. **Seats minted: 0.**

---

## 4 · `npm run build`

```
BUILD_EXIT=0
```

```
✓ built in 744ms
declaration entries: projected 61 public entries
gen-component-styles: wrote /Users/mkbabb/Programming/glass-ui/.glass-generation-…/component-styles.css
{"type":"glass-ui:ready","generation":"…","output":"/Users/mkbabb/Programming/glass-ui/dist","tuple":"js/sfc-css/declarations/relays/styles/fonts/utilities/component-styles"}
```

GREEN. The `85c322dd` unblock is not regressed.

---

## 5 · `npm run demo:dist:build`

```
DEMODIST_EXIT=0
✓ built in 1.47s
```

---

## 6 · `node scripts/regen-exports.mjs`

```
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES

EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

---

## 7 · MUTATION M1 — the CURE-4 gate honesty check bites

Scratch copy taken with `cp` (never `git checkout`), sha256 banked, path struck out of the bracket in
`src/styles/glass/grasp.css`:

```
Tests  1 failed | 35 passed (36)
```

Restored from the scratch copy, **byte-exact**:

```
8b76de2a8c45b2343870696ebde09316d8cecdd49a88e213ec3f3430e82ba067  src/styles/glass/grasp.css   (banked, pre-mutation)
8b76de2a8c45b2343870696ebde09316d8cecdd49a88e213ec3f3430e82ba067  src/styles/glass/grasp.css   (post-restore)

Tests  36 passed (36)
```

---

## 8 · THE STANDING CONDITION, MET NOT WORKED AROUND

Source edits stale `dist-demo`, and `boot-graph`'s freshness arm correctly RED'd a **third** failure
mid-seat:

```
 FAIL  tests/gates/boot-graph.test.ts > gate:boot-graph — build arm > the dist-demo it measures is NEWER than every source it is built from
      Tests  3 failed | 1542 passed | 5 expected fail (1550)
```

This is the documented `demo:dist:build`-runs-last-before-verify condition (#27 ⊕⁴², twice), not a
lane failure. Rebuilt; battery returned to **2 / 1543 / 5**. Recorded rather than quietly re-run.

---

## 9 · CENSUS HEADLINE

Porcelain **56 → 60**, untracked **5 → 6**. The +4 is entirely this seat's and entirely accounted:
three CURE-4 dated brackets (`glass/grasp.css`, `tokens/sizing.css`, `theme/radius.css`) and this
record directory. Every foreign path is byte-identical to the §0 baseline. Full attribution table at
`RECORD.md` §3.

---

## 10 · COMMIT

Lane #35 W-SLIDER lands at `<SHA>`, back-annotated `⊕ⁿ`.
