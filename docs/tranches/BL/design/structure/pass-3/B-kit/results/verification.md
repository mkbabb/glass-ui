# D1-B pass 3 — verification record (second seat)

Every line below is the output of a command run on the migrated tree at code digest
`62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc` (1,434 files; chain final
S32), unless marked otherwise. `<wt>` is a linked HEAD worktree after `replay.mjs`.

## Seal (`node <wt>/scripts/structure/seal/seal.mjs`)

```
{"B0":450,"B1":0,"B2":71,"B3":0,"B4":0,"B5":0,"B6":61,"B7":0,"B8":0,"B9":0,"B10":0,"B11":0,"B12":0,"B13":0,"B14":0,"B15":0,"B16":0}
b0 {"f1":0,"walks":84,"computed":366}   pin {modules:135, doors:116, names:1286, reviewed:2}
b10 held: scripts/structure/lib/resolve.mjs, src/components/_shared/overlay/isTeleportedTarget.ts
B0 by zone: tests 362, scripts 59, tests-visual 27, demo 1, src 1
B2 by zone: tests 32, demo 22, tests-visual 16, scripts 1
B6: 55 files over 500 lines, 6 dirs over 12 files (demo/stories/containers 13,
    demo/stories/foundations 13, src/components/dock/__tests__ 16, tests-visual 177,
    tests/demo 17, tests/styles 23); by zone src 22, tests 17, demo 10, tests-visual 9, scripts 3
```

## Toolchain

```
npx vite build                                  exit 0
npx vue-tsc --noEmit                            exit 0
npx vue-tsc --noEmit -p tsconfig.test.json      exit 0   (after the build: the fourier-math self-name reads dist)
npm run demo:dist:build                         exit 0
node scripts/structure/entries.mjs check --root .   exit 0  exports byte-equal: true; typesVersions byte-equal: true
node scripts/structure/surface.mjs check --root .   exit 0  differences 0 (68 export keys, 583 runtime, 1,239 type names)
node scripts/structure/gates.mjs                    exit 0  F-1 PASS (7,617 edges, 0 violations), F-3, F-4, F-9 PASS
node scripts/structure/cascade.mjs snapshot --dist dist --out <snap>   (on the floor base: HEAD + S1)
node scripts/structure/cascade.mjs verify --baseline <snap> --dist dist   exit 1, verdict RED, class reorder:
    ./styles 1,964 = 1,964 rules, onlyBase 0, onlyNow 0, first divergence at rule 141 (.accent-tone,
    the authored S4b rung); ./styles/fonts 4, ./styles/theme 4, ./styles.css 365 identical
npm test (before S32)    240 files: 236 passed, 4 failed; 2,323 tests: 2,304 passed, 8 failed
    failed: seal B0, B2, B6; boot-graph build arm x3 (no dist-demo built yet);
            route-motion and dialog-dismiss (source walkers meeting __tests__, cured by S32)
after S32 + demo:dist:build: route-motion, dialog-dismiss 26/26 pass; boot-graph 14/14 pass
npm run verify:package   exit 1  G-BUNDLE-RATCHET: 2,923,674 > 2,916,129
floor base (HEAD + S1) verify:package   exit 1  G-BUNDLE-RATCHET shrink: 2,910,618 < 2,916,129
    → the migration adds 13,056 B unpacked over the floor base
node B-kit/tools/p3r1a.mjs <wt>     {"kernelEntries":10,"names":285,"outside":0,"bad":[]}
```

## Battery (`node B-kit/tools/battery.mjs <wt> out.json`; pass-2 B-crit plants, unchanged)

```
CAUGHT I1 [B10] {"B1":1,"B10":1}          OTHER  I2 [B10] {"B11":1}
CAUGHT I3 [B10] {"B1":1,"B10":1}          CAUGHT I4 [B1] {"B1":1}
OTHER  I4b [B1] {"B0":1}                  CAUGHT I5 [B1] {"B1":1}
OTHER  I6 [B1] {"B0":1}   (F-1 self-name violation, carried by B0)
MISSED I7 [B3] {}         (plants inside the header comment; probe.mjs I7' is caught by B3)
CAUGHT I7b [B3] {"B3":1,"B8":1,"B10":1}   CAUGHT I8 [B6]   CAUGHT I9 [B6]   CAUGHT I10 [B6]
OTHER  I11 [R-3] {"B16":1}                CAUGHT I11b [B2] {"B2":1,"B16":1}
OTHER  I12 [R-3] {"B16":1}                CAUGHT I13 [B9] {"B9":2,"B11":1}
CAUGHT I14 [B11]  CAUGHT I15 [B15]  CAUGHT I15b [B15]  CAUGHT I15c [B15]  CAUGHT I16 [B15]
CAUGHT I17 [B1]   CAUGHT I17b [B0]  CAUGHT I17c [B1]   CAUGHT I18 [B10]   CAUGHT I19 [B10]
CAUGHT I20 [B10]  CAUGHT I21 [B7]   CAUGHT I22 [B8]    CAUGHT I23 [B8]    CAUGHT I24 [B4]
CAUGHT I25 [B14]  CAUGHT I26 [B14]  CAUGHT I27 [B12]   CAUGHT I28 [B5]    CAUGHT I29 [B13]
CAUGHT I30 [B8]   CAUGHT I31 [B2]   CAUGHT I32 [B0]    CAUGHT I33 [B7]    CAUGHT I34 [B6]
CLEAN  L1         CLEAN  L2
```

`node B-kit/tools/probe.mjs <wt>`: I7' CAUGHT (B3), N-misc CAUGHT (B15 + B7/B11),
N-use CAUGHT (B15 `src/components/slider/detents/use.ts (placeholder file name)`).

## B-13 (`node B-kit/tools/b13.mjs --wt <fresh HEAD wt> --checkout <checkout>`)

```
prototype layout (gate + its door landed in the measured tree): 1,901
   B0 473, B1 382, B2 776, B3 26, B4 3, B5 5, B6 75, B7 32, B8 3, B9 59, B10 24, B11 13, B12 24, B13 2, B14 4, B15 0
critic layout (gate run over the checkout, read-only):          1,887
B0: +13 in the prototype layout = the gate's own file measured in the tree
    (1 unresolved path-literal scripts/structure/seal-pin.json, 11 directory walks, 1 computed read)
B11: +1 = scripts/structure/index.mjs exports seal (no reader outside scripts/structure)
```

Both runs read 1 line fewer than pass 2 did (1,902 → 1,901 and 1,888 → 1,887), in B0 on both
sides: the floor library in docs/ moved on since pass 2. The 14-line gap is the same 14 lines
on today's floor.

## B-12 (`node B-kit/tools/door-cost.mjs <wt>`)

```
modules 135; door files 157 = 58 entry sources that are a module index + 99 internal doors
internal doors: 58 JS, 41 CSS, 70,462 B of source, 351 export/@import statements; 36 hold one statement
under G's reading (an eponymous root by G's L3.1 rootName stands in for the door): at most 38 doors,
11,028 B, could go (upper bound: the root must also carry every crossing name)
```

## Replay (fresh HEAD worktree)

```
node B-kit/replay.mjs --root <fresh wt> --twice   exit 0, 165.9 s, every step MATCH, every second application a no-op
   code digest 62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc over 1,434 files; chain final MATCH
node B-kit/replay.mjs --root <same wt>            "the chain is applied", 0.3 s
on that tree: vite build 0, demo:dist:build 0, vue-tsc 0, vue-tsc -p tsconfig.test.json 0,
   entries 0, surface 0, gates 0; npm test: 240 files, 239 passed; 2,323 tests, 3 failed (seal B0, B2, B6)
```

## S-13 merge test (`node B-kit/tools/merge-test.mjs --b <B tree> --g <G tree> --out r.json`)

G's tree: `G-kit/tools/replay.sh <wt>` → code digest `b26243ef…eb7c6`, 1,360 files, chain final MATCH.

```
G's gate on G's tree (harness check):  E1 1, E4 64, E6 18, all else 0   (= G-proto's reported state)
G's gate on B's tree:  E1 1, E2 42, E3N 10, E4 61, E6 22, E7 44, B12 1, S1 2, S2 1; E0 E1K E3 E3P E5 B1 B8 B14 A1 0
B's seal on G's tree:  B0 438, B1 143, B2 138, B3 17, B4 2, B5 3, B6 64, B7 63, B8 12, B9 2, B10 7,
                       B11 48 (structural arms only), B16 62; B12 B13 B15 0
```

## F-10 browser seat

Spec list: `results/browser-specs.txt` (65 specs, 332 tests). Base = HEAD + S1 floor rows.

```
node <base wt>/scripts/structure/browser.mjs --root <base wt> --specs "$(cat results/browser-specs.txt)" --out base.json
    ran 324, passed 134, failed 190, skipped 8 (2,095 s), verdict RED
node <wt>/scripts/structure/browser.mjs --root <wt> --specs "$(cat results/browser-specs.txt)" --out final.json
    ran 324, passed 134, failed 190, skipped 8, verdict RED
node B-kit/tools/browser-diff.mjs base.json final.json
    sameSpecs true, newFailures 0, cured 0
```
