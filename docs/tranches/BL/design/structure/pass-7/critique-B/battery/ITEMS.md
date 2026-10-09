# critique-B pass 7 · battery map

Seat: fresh critic, model `claude-opus-5-5`, authored nothing in passes 2-7 (the pass-6 critique included). Written and
hashed BEFORE reading `pass-7/B-kit/` or `pass-7/B-proto.md`. Checklist: REGISTRY §P3-9 text (frozen), status §P6-9,
27 items; bar §P2-6.4 … §P6-8.4. Rulings: RULINGS.md R-1..R-10, X-10, P3-R1..P3-R9 (P3-R9 as P4-R3), P4-R1..P4-R5,
P5-R1..P5-R5, P6-R1..P6-R3.

Runner: `run-plants.mjs --root <tree> --adapter adapter.mjs --set <plants.mjs|regress.mjs> [--group]`. The adapter runs
the tree's gate and returns its clause table; exit 2 throws (P6-R3).

## §P6-8.4 plants

| family | file | plants | expect | item |
|---|---|---|---|---|
| I7-agg, -agg-url, -agg-layer, -glass, -unit, -stylesrc | plants.mjs | a style-kernel aggregate, the glass kernel sheet, a unit sheet and an SFC `<style src>` reading dock's private sheet (three `@import` spellings) | B3 | B-01 (I7) |
| I7-leaf | plants.mjs | a kernel leaf sheet `@import`s slider's private sheet (pass-2 I7b) | B3 | B-01 |
| I7-CTL-own | plants.mjs | a dock sheet `@import`s another dock sheet in its own unit | clean | control |
| KF-new, KF-leaf, KF-deep, KF-existing | plants.mjs | a keyframes-bearing name on `./motion-core`: a new leaf on the door; an existing leaf gains a value import; a transitive sibling; the door re-exports `useSpring` | record (`*?`) | peer class; if no clause reads it, record the class and its owner |
| PEER | peer-closure.mjs | static value-edge closure of `./motion-core` from the tree's own entry map; 0 = keyframes-free | rc 0 on the replayed tree; rc 1 under KF-* | §P6-8.4 peer bullet |
| DT-xunit-test, DT-own-test, DT-harness-test, DT-noreader | plants.mjs | a chip door name whose one reader is a test (another unit's slot, its own slot, the harness) or nothing | a clause the control does not fire | B-10 (P6-R2), B11 |
| DT-CTL-src | plants.mjs | the same new door name read by a library file in slider | record | the contrast control |
| DT-eyeglass | plants.mjs | `EYEGLASS_SPAN_MAX` back on the morph door for a tabs test (the P6-R2 shape itself) | a clause the control does not fire | B-10 (P6-R2) |
| C0..C7 | crash.sh | GREEN 0; RED 1; ledger missing, package.json not JSON, `--root` absent, `--json` unwritable: 2; unparsable source recorded; GREEN again | as stated | S-14 (P6-R3) |
| SFC2 | sfc-split2.mjs + sfc2.sh | an SFC style split into TWO children on a component nobody split: none RED; both scopes no rules RED; full listing GREEN; one scope listed RED; a changed value RED; restore GREEN | as stated | S-10 (FP6-4) |

## Regressions

`regress.mjs`: pass 6's hashed plants (106), pass 6's extra plants (6) = the pass-6 critic's 112; pass 6's regress set
(pass 5's battery, pass 5's regress of pass 4's battery and extras, pass 5's X5 extras: 259). `tree-probes.sh` runs
pass 6's `tree-probes.sh` (FD-4 arms, SFC one-child split, census, and pass 5's command probes) from committed bytes.

## One probe per item

| item | probe |
|---|---|
| S-01 | the pass-7 kit, results, browser selection and both `/2` reports committed before this seat ran (`git log` / `git status` of `pass-7/`) |
| S-02 | gate B8 0, B9 0; pass-4 K-REEX / D-DUAL regressions |
| S-03 | P6-R1 (useScrollScene off src, no S64/MIGRATION/pin rows), P6-R2 (morph door without the 11 names; DT-eyeglass), P6-R3 (crash.sh); datum rebound once; P5-R1..R5 held |
| S-04..S-08 | gate GREEN on the replay; census regressions |
| S-09 | replay MATCH from committed bytes; rerun a no-op; digest unchanged after every battery |
| S-10 | cascade verify GREEN against the floor base with the route's listing; SFC2; pass-6 SFC and FD-4 arms |
| S-11 | vitest on the replayed tree |
| S-12 | the browser verdict re-derived from the committed selection and `/2` reports |
| S-13 | not re-run (closed; nothing in pass 7 touches G) |
| S-14 | crash.sh (exit 2 distinct from 1); pass 6's X6 70 and pass 5's 140 + extras via regress |
| B-01 | 18/18 (19 with I7) clauses GREEN, B2 0; I7-* CAUGHT by B3 |
| B-02..B-06, B-08, B-09, B-11..B-13 | pass 4/5/6 regressions |
| B-07 | PH6/PHT6/PH5 regressions; census |
| B-10 | PW6/PW6x regressions; DT-*; P6-R1/P6-R2 landed as ruled |
