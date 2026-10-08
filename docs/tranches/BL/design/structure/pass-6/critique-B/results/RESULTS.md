# critique-B pass 6 · results (raw lines)

Seat `claude-opus-5-5`. Every line below is transcribed from a command this seat ran on 2026-10-08 in its own worktrees
(`.claude/worktrees/bl/D1/p6/crit-B/{wt,base}`, both removed with `git worktree remove --force` at the end). Load
average 60-155 throughout (other sessions); stated per block.

## 1 · Replay from committed bytes

Checkout HEAD `6eeb55e1` (the kit commit; `git diff 544c9271 HEAD -- . ':!docs'` empty). Worktree `wt` at HEAD,
`node_modules` symlinked (the checkout has no `tests-visual/node_modules`, so none was linked). The replay ran the
worktree's own committed kit, `wt/docs/…/pass-6/B-kit/replay.mjs --root .`. Load 112-154.

```
replay: from the base (digest 35f7b831fe810aac…)
  … 113 steps …
  S70 [row] row 1 written, 0 applied → bb3f6c58723b95d8…
replay done in 649.6 s; code digest bb3f6c58723b95d84a66eeec26926da8625524aa06783fa23fb2afdddd0add29 over 1580 files; chain final MATCH
rerun:  replay: the chain is applied (digest bb3f6c58723b95d8…)  replay done in 2.8 s; … chain final MATCH
after every battery (plants restored):  replay done in 0.9 s; code digest bb3f6c58…; chain final MATCH
```

Floor base: worktree `base` at HEAD, the kit's `truncate-seq.mjs S1` applied to that worktree's own copy, then replay:
`S1 [floor-rows] floor rows → 5b14c6c7…; replay done in 109.0 s; code digest 5b14c6c7ce4e36f0… over 1354 files; chain final MATCH`.

## 2 · Gate, build, types, tests (on `wt`)

```
node scripts/structure/seal/seal.mjs --root . --json …   exit 0
PASS B0 0 … PASS B17 0   (18/18)
seal {"b0":{"f1":0,"walks":0,"computed":0},"files":15616,"edges":8328,"modules":139,"required":139,
      "b10":{"anchored":40,…,"held":[],"counted":0},"multiDoorSymbols":0,"pin":{"modules":139,"doors":119,"names":1297,"reviewed":2}}
npx vite build (wt) 0; (base) 0
npx vue-tsc --noEmit 0; npx vue-tsc --noEmit -p tsconfig.test.json 0
npm run -s demo:dist:build 0
npx vitest run   1   Test Files 2 failed | 272 passed (274); Tests 2 failed | 2323 passed | 10 expected fail | 1 skipped (2336)
   FAIL grasp.test.ts "moves REAL INK …"  Error: Test timed out in 5000ms.   (load 61-68)
   FAIL aurora/__tests__/atoms.test.ts "resolveAtoms total-function fuzz"  Error: Test timed out in 5000ms.
npx vitest run <those two files>   Test Files 2 passed (2); Tests 38 passed (38)
.bundle-ratchet 2925765; verify:package (P5 RATCHET probe) rc=0 "terminal":"CLEAN"
```

The `files` count reads 15,616 here against the route's 15,165; the pin, modules, edges and every clause agree.

## 3 · Cascade (S-10)

Snapshot of the floor base's dist (`cascade.mjs snapshot --root <base>`):
`{"./styles":1970,"./styles/fonts":4,"./styles/theme":4,"./styles.css":365}`.

The route's committed listing on the replayed tree:
```
verify --root <wt> --baseline <base snap> --reorders pass-6/B-kit/authored/p6-listed-reorders.json   rc 0
 "verdict": "GREEN"
   ./styles     "GREEN: listed reorder; no swapped pair shares a property on co-occurring classes"
   ./styles.css "GREEN: listed reorder; no swapped pair shares a property on co-occurring classes"
SCOPE Timeline → TimelineMarks: 40 rule line(s) re-homed
verify, no listing   rc 1   "RED: content changed" ×2
```

The critic's own SFC split, on a component the route did not split (`battery/sfc-split.mjs`, first candidate in path
order: `aurora/Aurora.vue`, rule `.aurora-canvas-layer--armed` re-homed into `AuroraShade.vue`), procedure
`tools/sfc-relist.sh`, snapshot of `wt`'s own dist:
```
SPLIT src/components/aurora/Aurora.vue -> src/components/aurora/AuroraShade.vue (keep) rule: .aurora-canvas-layer--armed
build 0
none rc 1          "RED: content changed" ×2
scopes-only rc 1   "RED: an unlisted reorder (1 moved rule(s))" ×2
                   SCOPE Aurora → AuroraShade: 2 rule line(s) re-homed
                   UNLISTED ./styles "@layer components :: .aurora-canvas-layer--armed[data-v-(Aurora)] {opacity:1}"
                   UNLISTED ./styles.css "@layer components :: .aurora-canvas-layer--armed[data-v-(Aurora)] {opacity:1}"
listing: 1 scope(s), ./styles 1, ./styles.css 1
listed rc 0        "GREEN: listed reorder; no swapped pair shares a property on co-occurring classes" ×2
VALUE opacity: 1 -> inherit   (same split, same listing)
value-listed rc 1  "RED: content changed" ×2; SCOPE Aurora → AuroraShade: 2 rule line(s) re-homed
restore rc 0
```
(The hashed tree-probes.sh run, amendment 2, read `SFC-keep FAIL … listed rc=1 "RED: an unlisted reorder (1 moved
rule(s))"` because it transcribed the listing from the no-listing run; `SFC-value PASS`; `SFC-RESTORE PASS`. The
procedure defect is the battery's; §3's run is the measurement.)

FD-4 coverage arm (`battery/fd4-probe.mjs`, amendment 1, report built in the browser-seat/2 shape):
```
readback candidates: src/components/chip/__tests__/chip-accent-band.visual.ts
built report: config tests-visual/playwright.config.ts testDir=. key=src/components/chip/__tests__/chip-accent-band.visual.ts
FD4 A PASS {"covered":true,"evidence":1,"refuted":0}
FD4 G PASS {"threw":"FD-4: the browser report of <wt> names spec src/components/chip/__tests__/chip-accent-band.visual.ts, at …, which <wt> does not hold; the coverage arm cannot read it"}
FD4 G2 PASS {"threw":"FD-4: … does not hold; the coverage arm cannot read it"}
FD4 U PASS {"threw":"FD-4: the browser report of <wt> is unversioned; the coverage arm reads browser-seat/2 …"}
FD4 RESTORE PASS
TPROBE FD4 S-10 PASS arms A, G, G2, U as expected
```

Floor P6-F3 on the landed tree: `opaque-ledger.json` moved aside, `seal.mjs` exits 1 with
`graph: <wt> has no scripts/structure/records/opaque-ledger.json; the opaque ledger is a floor record …`; restored,
digest unchanged.

## 4 · Plants: this pass's battery (`plants.mjs`, `--group`, 106 co-planted, judged once)

```
BASE all 18 clauses 0
X6 (70): CAUGHT 70 — named=B17 52, B0,B17 16 (the parameter loader and parameter promise forms: a computed read is also B0), B8,B17 2
X6 controls (15): CLEAN 12; FALSE+ 3 — X6-{scripts,tests,tests-visual}-CTL-promise, B0 "computed-path read p [fs-read]"
PH6 (10): CAUGHT 10, all B15 — dock part-1, GlassDock-2, GlassDock2, GlassDockPart2, bs11, GlassDockSplit;
          scripts/structure/part-1.mjs, demo/shell/GlassDock2.ts, tests/styles/bs11.ts, tests-visual/glass/GlassDockSplit.ts
PHT6 (6): CAUGHT 6, B15 (4 also B16) — chip Chip2.test.ts, part-1.test.ts; slider SliderSplit.test.ts; tests/styles/bs11.test.ts;
          dock GlassDock-2.test.ts; tests-visual/aurora/aurora-arresting7.spec.ts
PH6-CTL-src CLEAN; PH6-CTL-test FALSE+ B16 "its subject's home is the harness" (the control reads nothing sealed)
PW6-out-tv, PW6-out-unit, PW6-out-demo: CAUGHT, B16
PW6-unit: SKIP (no goto literal naming "chip" on the tree; the chip readback opens /foundations/icons)
RESTORED base judgement unchanged
TALLY {"SKIP":1,"CAUGHT":89,"CLEAN":13,"FALSE+":4}
```

`tools/extra-plants.mjs` (written after the hash; solo):
```
CLEAN   PW6x-legal-chip      a page-driving chip visual spec in chip's slot ("/forms/chip")
CAUGHT  PW6x-wrong-chip      the chip-story spec in slider's slot  :: B16
CAUGHT  PW6x-tv-chip         a tests-visual spec whose one subject is chip  :: B16
CLEAN   PW6x-legal-sortable  a page-driving sortable-list visual spec in its slot ("/data/sortable-list")
CAUGHT  PW6x-wrong-sortable  :: B16
CAUGHT  PW6x-tv-sortable     :: B16
RESTORED base judgement unchanged; TALLY {"CLEAN":2,"CAUGHT":4}
```

## 5 · Regressions (`regress.mjs`, `--group`, 259 co-planted)

```
TALLY {"CAUGHT":233,"CLEAN":17,"FALSE+":7,"OTHER":5,"UNNAMED":6}; RESTORED base judgement unchanged
P5 S-14 140 shapes: CAUGHT 140 by B17;  P5x X5 7: CAUGHT 7 by B17
P5 PH5 15: CAUGHT 15 (B15);  P5 DIR13 ×6 + SLOT13-dock: CAUGHT (B6)
P5 VIS-out-name, VIS-out-slot, VIS-orphan: CAUGHT (B16);  VIS-in-L: FALSE+ B16 "(by the 0 stories it opens)"
FALSE+ 6: P5-S14-{scripts,tests,tests-visual}-CTL-{read,rethrow}, B0 "computed-path read p [fs-read]" (as in pass 5)
OTHER 5: P5-B2-{demo,tests,tests-visual,scripts}-deep by B0 "unknown-subpath"; P5-B2-tests-mock by B16 (as in pass 5)
UNNAMED 6: P5r-P4-F-CYC, F-CYC-T, B-13F, T-CYC-N, T-CYC, V-CYC — runner mark-prefix artefact; solo:
   B4: cycle @src/components/slider [plantFcycB.ts plantFcycA.ts] …
   B4: cycle @src/components/slider [plantFcycTB.ts plantFcycTA.ts] (type-only) …
   B6: src/components/chip/: 18 direct files > 12   (B-13F)
   B4: cycle @src/components/dock [search legibility] (type-only) …;  B4: cycle @src [components/chip components/badge] (type-only) …;
   B4: cycle @src [components/chip components/badge] via …plantVcycA.ts …
```

## 6 · Command probes (pass 5's `tree-probes.sh` run from its committed bytes, via this battery)

```
TPROBE P5:PIN-OPT B-11 PASS --pin refused rc=1
TPROBE P5:NOPIN B-11 PASS --no-pin refused rc=1
TPROBE P5:OFFSWITCH B-11 INFO source lines naming a pin or seal off switch: 0
TPROBE P5:GATE-PURE S-09 PASS gate rc=0, tree unchanged
TPROBE P5:CSS-DIST S-08/P4-R4 FAIL css export keys=4 missing=0 pure-@import dist files=38   (the LAW §5 CSS doors; REGISTRY §P5-2 finding 8)
TPROBE P5:PW-PROGRAM B-10 PASS missing 0
TPROBE P5:REORDER-acc S-10/B-08 PASS build rc=0, verify RED rc=1: "RED: an unlisted reorder (1 moved rule(s))"
TPROBE P5:REORDER-out S-10/B-08 PASS build rc=0, verify RED rc=1: "RED: an unlisted reorder (1 moved rule(s))"
TPROBE P5:CASCADE-RESTORE S-10 PASS restored tree verifies rc=0
TPROBE P5:RATCHET S-03/P4-R3 INFO verify:package rc=0: "terminal":"CLEAN"
```

## 7 · Census (`probes.mjs`)

```
PROBE P5:BOUNDS-DIR 0;  P5:BOUNDS-LOC 0;  P5:BOUNDS-LOC-GEN 0
PROBE P5:PH-NAMES 4    dock/styles/core.css, styles/utilities/base.css, composables/motion/core, scripts/structure/lib  (not LAW §11 forms)
PROBE PH6-NAMES 0      (every stem in the five zones, test stems included, against §P5-8.3's provenance forms)
PROBE P5:MASK 198 candidates; PROBE MASK6 1 (a comment line in seal/fallbacks.mjs)
PROBE P5:B2-REACH 9    (root vite.dark-stamp.ts → ./src/composables/dark/index and the like: root configs, outside B2's zones)
PROBE PW-STEMS         174 spec/visual files; tests-visual 164, src 5
```

The MASK candidates read one by one outside the P5-G3 class (renderer `armAsync().catch(() => undefined)`, Playwright
page-operation `.catch(() => …)`): process-liveness and fetch-poll catches in `browser.mjs` (no read), parse catches
that return the parse error as a value (`syntax.mjs`, `graph/css.mjs`), `existsSync` guards before `rm`/`rename`
(`vite.style-assets.ts`, `move.mjs`), `surface.mjs:24` (throws), `tree.mjs:17` (the root search), comments. None is a
read or load whose failure is masked under LAW §10's definition.
