# critique-B seat 2 · raw results

Every block is the output of a command this seat ran (claude-opus-5-5, 2026-09-25). `$S` is the seat's scratch
(`…/scratchpad/D1/p3b/crit-B`), `$K` is `docs/tranches/BL/design/structure/pass-3/B-kit`, `$C` is
`docs/tranches/BL/design/structure/pass-3/critique-B`. The worktree `$S/wt` was cut at `b602a59b` each time.

## R1 · Replay (non-author, committed artifacts only)

```
git worktree add --detach $S/wt b602a59b ; ln -s <checkout>/node_modules … ; ln -s <checkout>/tests-visual/node_modules …
node <checkout>/$K/replay.mjs --root $S/wt --twice
  replay: from the base (digest 5080bcadf20ebee0…)
  … every step "row N written, 0 applied · again: row 0 written, N applied" …
  S32 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 62878b7f2591c37e…
  replay done in 361.1 s; code digest 62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc over 1434 files; chain final MATCH   (exit 0)
node <checkout>/$K/replay.mjs --root $S/wt
  replay: the chain is applied (digest 62878b7f2591c37e…) · done in 0.5 s · chain final MATCH   (exit 0)
independent digest (shell, the digest.mjs definition: sorted "path\0sha256" lines over git ls-files -co --exclude-standard minus docs/, files only, no symlinks):
  62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc   1434 files
third arm (fresh worktree): <checkout>/…/floor/rows/apply.mjs --root $S/wt → digest f0019420f925151f… (= SEQUENCE S1)
  then replay.mjs → "resuming after step S1" … 241.2 s; 62878b7f…51e1cc; chain final MATCH
```

A first attempt ran the kit copy inside the worktree (`$S/wt/docs/…/replay.mjs`). It stops at S1 with
`ERR_MODULE_NOT_FOUND …/floor/lib/tree.mjs`, because S1's fd11 row moves the floor out of `docs/`. The kit documents
`node <checkout>/…/replay.mjs`. The checkout's kit and floor are byte-identical to b602a59b
(`git diff --stat b602a59b HEAD -- …/B-kit …/floor` is empty, `git status` 0).

## R2 · Seal on the replayed tree (`node scripts/structure/seal/seal.mjs --root . --json`)

```
{"B0":450,"B1":0,"B2":71,"B3":0,"B4":0,"B5":0,"B6":61,"B7":0,"B8":0,"B9":0,"B10":0,"B11":0,"B12":0,"B13":0,"B14":0,"B15":0,"B16":0}   exit 1
b0 {"f1":0,"walks":84,"computed":366}  pin {"modules":135,"doors":116,"names":1286,"reviewed":2}  b4info 2  multiDoorSymbols 0
b10 {"anchored":38,"bound":[7 scripts/structure/lib files, aurora frame/{textureUpload,uniformBridge}.ts, glass/lifecycle/createCanvasLifecycle.ts],
     "held":["scripts/structure/lib/resolve.mjs","src/components/_shared/overlay/isTeleportedTarget.ts"],"counted":0}
```

## R3 · Plant battery (`node $C/battery/seat-2/run-plants.mjs --tree <docs-free copy> --adapter $C/tools/seat-2/adapter.mjs`)

The runner copies the tree once per plant. The plants ran on a docs-free rsync of the replayed tree, because `docs/`
is 5.2 GB. The seal reads that copy the same except for 11 B0 lines (reads of absent `docs/` files; BASE below reads
B0 461). The verdict is planted minus BASE, so the offset cancels.

```
BASE exit 1 {"B0":461,"B2":71,"B6":61}
P-I6    INTENDED  B0            B0: src/components/chip/Chip.vue:2 self-name-in-src [import] @mkbabb/glass-ui/badge
P-I11   INTENDED  B16           tests/unit/zz-chip-only.test.ts (subject in src/components/chip: belongs in src/components/chip/__tests__/)
P-I12   INTENDED  B16           src/components/chip/__tests__/zz-slider-only.test.ts (colocated in src/components/chip; its subject's home is …slider)
L3      CLEAN
P-I32   OTHER     B16           (constant n: F-1 folds the read; see R4)
P-I32b  OTHER     B16           (constant n)
P-I32c  OTHER     B16           (constant n)
P-I38   INTENDED  B10+B11+B15   B10: scripts/zz-orphan-helper.mjs -> scripts/zzmod [move]
P-B13y  INTENDED  B13           B13: scripts/zz-ci-caller.mjs:1 imports the bin scripts/zz-ci-bin.mjs [import]
P-B13c  CONTROL-QUIET           (same files, no YAML token: no B13 line)
P-I15b  INTENDED  B7+B11+B15    dock/utils
P-I15c  INTENDED  B7+B11+B15    dock/v2
P-misc  INTENDED  B7+B11+B15    dock/misc
P-fn1   INTENDED  B15           src/components/slider/useDockZz.ts (named for the unit dock, lives in slider; not in the pin's reviewed names)
P-fn2   INTENDED  B15           src/components/chip/use.ts (placeholder file name)
P-C6    INTENDED  B1+B7+B10     dock/zzdoorless/ (1 direct files, no door)
P-B1    INTENDED  B1            chip/zzDeep.ts -> slider/types.ts [type]
P-B2    INTENDED  B2            demo/zz-deep-demo.ts -> chip/chipVariants.ts
P-B3    INTENDED  B3+B10        chip/zz-cross.css -> dock/controls/controls.css (css door …)
P-B4    MISSED                  chip/zzCycA.ts <-> chip/zzCycB.ts value cycle: no line (seal files it under meta.b4info)
P-B5    INTENDED  B5+B12        chip/composables/index.ts (door in a kind slot)
P-B6    INTENDED  B6            chip/zzLong.ts: 520 lines > 500
P-B6s   INTENDED  B6            chip/composables/: 13 direct files > 12
P-B9    INTENDED  B9+B11        chip/index.ts re-exports badge/index.ts; Badge on ./badge + ./chip
P-B8    INTENDED  B1+B8+B9+B11  motion/core/index.ts:16 -> chip/chipVariants.ts [reexport] (kernel reads a unit)
P-B11   INTENDED  B11           chip/index.ts +zzExtra (not in the pin)
P-B12   INTENDED  B12           chip/zz-relay.ts re-exports chipVariants.ts (relay)
P-B14   INTENDED  B14           _shared/disclosure/index.css:4 holds 1 non-door node(s), first rule .zz-smuggled
P-B15   INTENDED  B7+B11+B15    dock/part-1
P-VAC10 INTENDED  B1+B6+B10     dock/zzUseKernel.ts -> motion/core/zzDockOnly.ts
P-B0w   INTENDED  B0            tests/unit/zz-walkdir.test.ts:3 walk of src/components/
P-FD2   FAILED-OTHER            (on the docs-free copy the graph refuses for the absent docs reads; rerun on the full tree in R5)
```

## R4 · Post-hash supplement: I32 with an opaque `n` (`node $C/tools/seat-2/extra-i32.mjs`)

```
X-I32   INTENDED  B0: tests/unit/zz-x-i32.test.ts:3 computed-path read src/components/<computed> [computed-read]
X-I32b  INTENDED  B0: tests/unit/zz-x-i32b.test.ts:3 computed-path read src/components/<computed> [computed-read]
X-I32c  INTENDED  B0: tests/unit/zz-x-i32c.test.ts:3 computed-path read src/components/<computed> [computed-read]
```

## R5 · FD-2 stop (full replayed tree, dry: nothing written)

```
{"moves":[{"from":"src/composables/motion/scroll/useScrollChrome.ts","to":"src/components/dock/useScrollChrome.ts"}]}
node scripts/structure/move.mjs <list> --root $S/wt --dry   exit 1   "ok": false, "addedPairs": 105, "refused": true
FD-2 CO-CYCLIC (new) src/components/_shared ↔ src/components/_shared/overlay   (… 104 more)
git status before/after: 815 = 815 lines
```

## R6 · Coupling base → final (`node $C/tools/seat-2/scc.mjs`)

Base = `git archive b602a59b` (code) read by b602a59b's docs floor; final = the replayed tree read by its landed floor.

```
          edges  valueSccs(src) [sccs, members, largest]   moduleSccs dirUnits src+demo   src+scripts
base      7311   [2, 4, 2]                                  [4, 23, 16]                   [4, 23]
final     7617   [0, 0, 0]                                  [2, 4, 2]                     [2, 4]
```

## R7 · Tree probes (`bash $C/tools/seat-2/probes-fixed.sh <checkout> $S/wt`)

`probes-fixed.sh` is the hashed `probes.sh` with one character added (line 25's case pattern takes a leading `(`; bash
cannot parse a bare `pat)` inside `$( )`). `diff` shows that line only (plus the header comment).

```
S-01 kit-files-tracked 114 · proto-tracked 1 · kit-dirty-now 0 · kit-changed-since-b602 0 · pass2-kit-tracked 84
S-02 hooks: dom/useClipboard, dom/useDragVelocity, motion/core/useRAFLoop, motion/core/useYieldToMain,
     motion/scroll/useScrollChrome, motion/scroll/useScrollProgress, motion/pointer/useRoutePointer (all under src/composables/)
S-03 R3-slots-over-12: src/components/dock/__tests__:16
S-03 R5-aurora-config-key: false
S-03 R6-source-lines 5 · R6-source-not-tests 1 (demo/demo.css:122 @source not "../src/**/__tests__")
S-03 R7 springProjection → src/composables/motion/spring/ · useScrollScene → src/composables/motion/scroll/
S-08 src/styles/glass/index.css yes · src/styles/theme/index.css yes · src/styles/glass.css no · src/styles/theme.css no · empty dirs: none
S-11 docs-refs: 12 files, all prose comments or pre-existing BJ/BK/AP evidence paths; 'design/structure' in package.json, scripts, src, tests, vite*, tsconfig*: 0 · tsconfig.build.json absent
B-08 accent-tone.css at src/components/chip/ · importer src/components/chip/index.css (the chip CSS door), which src/styles/index.css:209 imports
B-09 src/styles dirs over 12: none · files over 500: none
B-10 SelectionValue declared src/components/_shared/selection.ts:2 (B4 0) · src files over 500 (not index.ts): 20 · src/index.ts 584 lines
     demo/stories/manifest.ts 1098 · dirs over 12: demo/stories/{foundations,containers} 13, dock/__tests__ 16, tests/demo 17, tests/styles 23, tests-visual 177
     scripts over 500: profile-bundle 938, verify-export-types 1079, comment-census 725 · __tests__ slots 77 · tests-visual top level 177 files
B-11 --no-pin in package.json: 0
B-12 index doors in src+scripts: 158 files, 141,307 B
```

## R8 · Toolchain on the replayed tree

```
npx vite build 0 · npx vue-tsc --noEmit 0 · npx vue-tsc --noEmit -p tsconfig.test.json 0 · npm run demo:dist:build 0
node scripts/structure/entries.mjs check 0 · surface.mjs check 0 · gates.mjs 0
node scripts/structure/cascade.mjs verify --baseline <b602a59b+S1 snapshot> --dist dist   exit 1, RED, ./styles class reorder:
     1964 = 1964 rules, onlyBase 0, onlyNow 0, firstDivergence 141 (.accent-tone); ./styles/fonts 4, ./styles/theme 4, ./styles.css 365 identical
npm run verify:package   exit 1   G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2923674 > 2916129
   base (b602a59b+S1) verify:package   exit 1   G-BUNDLE-RATCHET: … shrink … 2910618 < 2916129
npm test   exit 1   Test Files 4 failed | 236 passed (240); Tests 9 failed | 2303 passed | 10 expected fail | 1 skipped (2323)
   failed: seal B0, B2, B6; glass-subtlety ×4 and aurora atoms fuzz (each "Test timed out in 5000ms"); menu contract (focus assertion)
   load average at the time: 156.06 131.54 93.85
   npx vitest run tests/styles/glass-subtlety.test.ts src/components/aurora/__tests__/atoms.test.ts src/components/menu/__tests__/contract.test.ts
     → exit 0, 3 files, 72 passed
dist/styles/theme.css (28 B): @import "./theme/index.css";
vite.utility-emit.ts:85-86: const themePath = resolve(root, "src/styles/theme/index.css"); if (!existsSync(dist) || !existsSync(themePath)) return;
```

## R9 · The `./styles` reorder (`node $C/tools/seat-2/reorder.mjs <base styles.seq> <final styles.seq>`)

```
rules 1964 · moved 19 (.accent-tone and the card-scroll rung: .card-scroll-host, .card-header--shrink …, card-title-* keyframes)
risk pairs (shared property and a shared selector token): 0 · swapped pairs sharing any declared property: 92
first pair: .accent-tone {--accent-band-strength:18%} swapped with .glass-chip {--accent-band-strength:max(18%,calc(var(--chip-tint-floor) + 10%))}
rules declaring --accent-band-strength, in order:
  base   142 .accent-tone { 18% }                                   204 .glass-chip { max(18%, calc(var(--chip-tint-floor) + 10%)) }
  final  203 .glass-chip { max(18%, calc(var(--chip-tint-floor) + 10%)) }   354 .accent-tone { 18% }
src/components/chip/chipVariants.ts:4  "glass-chip glass-capsule accent-tone inline-flex …"  (every Chip carries both classes)
.glass-chip {--chip-tint-floor:12%} · .dark .glass-chip {--chip-tint-floor:15%}
```

Both rules sit in `@layer components` at specificity (0,1,0), so the later one wins. At base the chip's band strength
is max(18%, 22%) = 22% in light and 25% in dark. On the migrated tree it is 18% in both.

## R10 · Browser seat (`node scripts/structure/browser.mjs --root $S/wt --specs substrate-paints-color.spec.ts`)

```
[browser-seat 2026-09-25T08:04:23.266Z] GREEN: 3/3 passed, 0 failed, 0 skipped in 50s
route spec list ($K/results/browser-specs.txt, 65 specs): contains card-composite, card-padding, glass-accent, selection-card;
  none of css-critical, demo-design, glass-cal, page-chassis, storybook-meta (the tests-visual specs that name glass-chip/accent-tone/accent-band)
```

## R11 · `--no-pin` and the missing pin

```
npm test -- tests/gates/seal.test.ts --no-pin   exit 1   CACError: Unknown option `--pin`
(docs-free copy, seal-pin.json removed) node scripts/structure/seal/seal.mjs   exit 1
   Error: seal: the pin …/scripts/structure/records/seal-pin.json is missing; the gate has no off switch
```

## R12 · B-13 (`node <checkout>/$K/tools/b13.mjs --wt <fresh b602a59b wt> --checkout <checkout>`)

```
{"prototypeLayout":{"total":1901, B0 473 B1 382 B2 776 B3 26 B4 3 B5 5 B6 75 B7 32 B8 3 B9 59 B10 24 B11 13 B12 24 B13 2 B14 4 B15 0},
 "criticLayout":{"total":1888,   B0 460 B1 382 B2 776 B3 26 B4 3 B5 5 B6 76 B7 32 B8 3 B9 59 B10 24 B11 12 B12 24 B13 2 B14 4 B15 0}}
B0: +13 in the prototype layout, +0 in the critic layout   (scripts/structure/seal.mjs: 1 unresolved seal-pin.json, walks, 1 computed read)
B1: +8 / +8 · B6: +2 / +3   (the checkout moved 9 code files since b602a59b: configurator ×4, its story, 2 tests, src/index.ts, package.json)
B11: +1 in the prototype layout (scripts/structure/index.mjs exports seal)
```

With `--checkout` = a `git archive b602a59b` extract, the critic arm throws (ENOENT on its JSON: the pass-2 gate
needs the full checkout). The +13/+1 lines are the kit's named 14.

## R13 · FD-5 over the whole chain (`node $C/tools/seat-2/fd5-chain.mjs --base <b602a59b+S1> --final <replayed>`)

```
exit 1; move lists 11; authored files 528 (every file a row step writes, reason = step id)
{"counts":{"authored":241,"re-point":185,"move-only":289,"unclassified":8},"stale":212,"failed":220}
UNCLASSIFIED scripts/minify/minify-css.ts (from scripts/lib/minify-css.mjs)                    ← row S10/S11, then moved
UNCLASSIFIED scripts/structure/seal/law.mjs: added                                             ← row S13/S25 at scripts/structure/law.mjs, moved by S19
UNCLASSIFIED src/components/alert/__tests__/typography.test.ts (from tests/styles/…)            ← rows S5a/S26
UNCLASSIFIED src/components/aurora/__tests__/uniform-packing.test.ts (from tests/…)             ← rows S4f/S15
UNCLASSIFIED src/components/command/__tests__/command.public-contracts.test-d.ts (from tests/…)  ← rows S17/S24
UNCLASSIFIED src/composables/motion/__tests__/useAnimatedNumber.test.ts (from tests/…)          ← rows S8/S15/S24
UNCLASSIFIED tests-visual/paint/paint-arm.mjs (from scripts/lib/paint-arm.mjs)                  ← rows S9/S19
UNCLASSIFIED tests/gates/token-hygiene.test.ts: text differs beyond its references             ← NO row names it
  diff: 49  join("src", "styles", "tokens.css")  →  join("src/styles/tokens/index.css")
        273 join(SRC, "styles/tokens/color-radius.css") → join(SRC, "styles/tokens/surface/color-radius.css")
```

The 212 stale rows and 7 of the 8 are artefacts of classifying the whole chain at once: a row names a path that a
later move changes. `token-hygiene.test.ts` is not. No row writes it, so its edit is the F-2 engine's own rewrite
of a multi-argument `join`, and the floor's FD-5 rejects it.
