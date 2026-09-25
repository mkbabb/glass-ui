# critique-B · raw results (every command this seat ran, with its output)

`<S>` = the seat's scratch dir `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p3b/crit-B`.
`<C>` = `docs/tranches/BL/design/structure/pass-3/critique-B`. `<K>` = `<S>/kit`, a `git archive b602a59b` extraction of
`docs/tranches/BL/design/structure` plus `package.json` (the committed kit, not the working checkout).

## 1 · Replay (STEP 2)

```
git worktree add --detach <S>/wt b602a59b ; ln -s <checkout>/node_modules <S>/wt/node_modules ; ln -s <checkout>/tests-visual/node_modules <S>/wt/tests-visual/node_modules
git archive b602a59b docs/tranches/BL/design/structure | tar -x -C <K> ; git archive b602a59b package.json | tar -x -C <K>
node <K>/docs/tranches/BL/design/structure/pass-3/B-kit/replay.mjs --root <S>/wt --twice      # exit 0
```

```
replay: from the base (digest 5080bcadf20ebee0…)
  S1 [floor-rows] floor rows · again: floor rows → f0019420f925151f…
  S1b [row] row 28 written, 0 applied · again: row 0 written, 28 applied → 83f6251ae7ade7e6…
  S2-1 [moves] moves 19 pending, 0 applied · again: moves 0 pending, 19 applied → 03a54aac33a8085f…
  S2-2 [moves] moves 2 pending, 0 applied · again: moves 0 pending, 2 applied → 69d27ac71a6f89de…
  S2-3 [moves] moves 1 pending, 0 applied · again: moves 0 pending, 1 applied → 184c5a57c6435a07…
  S2b [row] row 5 written, 0 applied · again: row 0 written, 5 applied → 132e7edf4108ac44…
  S3 [moves] moves 85 pending, 0 applied · again: moves 0 pending, 85 applied → 892d07aa0f5a026e…
  S4a [moves] moves 63 pending, 0 applied · again: moves 0 pending, 63 applied → b90b02be1e789882…
  S4b [row] row 2 written, 0 applied · again: row 0 written, 2 applied → ee76dae73de17505…
  S4c-1 [row] row 42 written, 0 applied · again: row 0 written, 42 applied → 45f837f17dde583c…
  S4c-2 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 13b06565d382bba4…
  S5a [row] row 11 written, 0 applied · again: row 0 written, 11 applied → a385ed6f9a618f82…
  S4d [moves] moves 1 pending, 0 applied · again: moves 0 pending, 1 applied → 711b1afbceaf2f2b…
  S4f [row] row 8 written, 0 applied · again: row 0 written, 8 applied → 3a4486576064cb23…
  S4e [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 853dc341aa1ec356…
  S5-1 [row] row 200 written, 0 applied · again: row 0 written, 200 applied → 30e22bc8e882dd18…
  S5-2 [row] row 1 written, 0 applied · again: row 0 written, 1 applied → c922ee74a0daf178…
  S6 [row] row 12 written, 0 applied · again: row 0 written, 12 applied → 110aa79a470b58a1…
  S7 [row] row 3 written, 0 applied · again: row 0 written, 3 applied → 3245796760390f69…
  S8 [row] row 20 written, 0 applied · again: row 0 written, 20 applied → c21ddf6c0571661c…
  S9 [row] row 5 written, 0 applied · again: row 0 written, 5 applied → 3fe58fd663455fb5…
  S10 [moves] moves 1 pending, 0 applied · again: moves 0 pending, 1 applied → a97e43db88c80a43…
  S11 [row] row 6 written, 0 applied · again: row 0 written, 6 applied → bb969f9c80a11ef9…
  S12 [row] row 1 written, 0 applied · again: row 0 written, 1 applied → 2be80506bf27693a…
  S13 [row] row 4 written, 0 applied · again: row 0 written, 4 applied → 101df2f62f73b12c…
  S14 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 56b96f70e6ce1b6a…
  S15 [moves] moves 71 pending, 0 applied · again: moves 0 pending, 71 applied → e6f0d9169e3a1598…
  S16 [row] row 3 written, 0 applied · again: row 0 written, 3 applied → fb6b5e81cf7dd39d…
  S17 [row] row 21 written, 0 applied · again: row 0 written, 21 applied → 1c83d099f432edeb…
  S18 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 4623bb92336addc2…
  S19 [moves] moves 11 pending, 0 applied · again: moves 0 pending, 11 applied → 2483e73fc6439819…
  S20 [row] row 30 written, 0 applied · again: row 0 written, 30 applied → 981c9f202c017a45…
  S21 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → b0069dfadd711ebb…
  S22 [row] row 8 written, 0 applied · again: row 0 written, 8 applied → 4815538a2e3be493…
  S23 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 0c4aa92ad8006d92…
  S24 [moves] moves 59 pending, 0 applied · again: moves 0 pending, 59 applied → 0ff82945ec08e13f…
  S25 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 20dcc43daf2fb35b…
  S26 [moves] moves 23 pending, 0 applied · again: moves 0 pending, 23 applied → e3ce4d0eb92c8190…
  S27 [row] row 1 written, 0 applied · again: row 0 written, 1 applied → 3c28ea843237f1ec…
  S28 [row] row 9 written, 0 applied · again: row 0 written, 9 applied → f8783101ee5f0a18…
  S29 [row] row 77 written, 0 applied · again: row 0 written, 77 applied → 0213fbc970ab422b…
  S30 [row] row 13 written, 0 applied · again: row 0 written, 13 applied → d13bc22ace5ed60a…
  S31 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 6aa6ede34096f33b…
  S32 [row] row 2 written, 0 applied · again: row 0 written, 2 applied → 62878b7f2591c37e…
replay done in 357.2 s; code digest 62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc over 1434 files; chain final MATCH
```

Whole-chain rerun, `node <K>/…/B-kit/replay.mjs --root <S>/wt` (exit 0):

```
replay: the chain is applied (digest 62878b7f2591c37e…)
replay done in 1.9 s; code digest 62878b7f2591c37e9cd2151faef9b2d4cd9b21475517e6c227fb2f404651e1cc over 1434 files; chain final MATCH
```

A first attempt ran the kit from a docs-only archive and failed before any write (`floor: no @mkbabb/glass-ui
package.json above …/floor`; `git status --porcelain | wc -l` 0 afterwards). Adding the committed `package.json` to the
archive is the only change.

## 2 · The route's gate on the replayed tree

`node scripts/structure/seal/seal.mjs --root . --json <S>/seal-final.json` (exit 1):

```
counts {"B0":450,"B1":0,"B2":71,"B3":0,"B4":0,"B5":0,"B6":61,"B7":0,"B8":0,"B9":0,"B10":0,"B11":0,"B12":0,"B13":0,"B14":0,"B15":0,"B16":0}
by zone  B0 {"demo":1,"scripts":59,"src":1,"tests":362,"tests-visual":27}
         B2 {"demo":22,"scripts":1,"tests-visual":16,"tests":32}
         B6 {"demo":10,"src":22,"tests-visual":9,"tests":17,"scripts":3}
B6 dirs  demo/stories/containers/ 13 | demo/stories/foundations/ 13 | src/components/dock/__tests__/ 16 | tests-visual/ 177 | tests/demo/ 17 | tests/styles/ 23
B0 src   src/components/aurora/runtime/frame/auroraImageSource.ts:47 walk of src/ [path-literal]
meta     b0 {f1:0, walks:84, computed:366}; modules 135 (required 135); b10 anchored 38, bound 10, held 2
         (scripts/structure/lib/resolve.mjs, src/components/_shared/overlay/isTeleportedTarget.ts); pin modules 135, doors 116, names 1286, reviewed 2
```

## 3 · The plant battery (hash 275e2ace…, `<C>/BATTERY-HASH.txt`)

`node <C>/tools/run-plants.mjs --root <S>/wt --adapter <C>/tools/adapter.mjs --alias minify-css.mjs=scripts/minify/minify-css.ts --out <S>/plants.json`
(tree restored afterwards: `git status --porcelain` identical, code digest still `62878b7f…`):

```
BASE {"B0":450,"B1":0,"B2":71,"B3":0,"B4":0,"B5":0,"B6":61,"B7":0,"B8":0,"B9":0,"B10":0,"B11":0,"B12":0,"B13":0,"B14":0,"B15":0,"B16":0}
CAUGHT I6 [S-06/B-03 → *] self-name import of the package from src :: {"B0":1}
CAUGHT I32 [S-07 → *] join(process.cwd(), 'src/components/' + n) read in tests :: {"B0":1}
CAUGHT I32b [S-07 → *] template-literal src path read in tests :: {"B0":1}
CAUGHT I32c [S-07 → *] resolve(import.meta.dirname, '..', 'src/components', n) read in tests :: {"B0":1}
CAUGHT I11 [B-04 → *] single-subject (chip) test left in tests/ :: {"B16":1}
CAUGHT I12 [B-04 → *] test in chip/__tests__ whose one subject is slider :: {"B16":1}
CLEAN  L2 [B-04 → null] legal: chip test in chip/__tests__ reading its own module :: {}
CAUGHT I38 [B-05 → B10] a scripts/lib file read only by the structure module :: {"B1":2,"B6":1,"B7":1,"B10":1,"B11":1}
CAUGHT Y1 [B-06 → B13] a bin named only in CI YAML, imported by another bin :: {"B2":1,"B13":1}
CLEAN  LY [B-06 → null] legal: a CI-only bin, no importer :: {}
CAUGHT N-utils [B-07 → B15] placeholder module name utils :: {"B6":1,"B7":1,"B11":2,"B15":1}
CAUGHT N-v2 [B-07 → B15] placeholder module name v2 :: {"B6":1,"B7":1,"B11":2,"B15":1}
CAUGHT N-misc [B-07 → B15] placeholder module name misc :: {"B6":1,"B7":1,"B11":2,"B15":1}
CAUGHT N-use [B-07 → B15] file named only `use.ts` :: {"B15":1}
MISSED N-foreign [B-07 → B15] slider file named for another unit (slider/useDockHold.ts) :: {}
CAUGHT K1 [B-02 → B8] kernel door re-exports a unit file :: {"B4":1,"B8":1,"B9":2,"B11":1}
CAUGHT C1 [B-08 → B10] style-kernel sheet loaded only by slider :: {"B3":1,"B10":1}
CAUGHT G1 [B-09 → B14] a rule inside the glass CSS door :: {"B14":1}
CAUGHT G2 [B-09 → B7] doorless dir under styles/glass, imported by the glass door :: {"B7":1}
CAUGHT T-B0 [B-01 → B0] CSS import of a missing sheet (masked fallback) :: {"B0":1}
CAUGHT T-B1 [B-01 → B1] slider deep-imports a dock internal past dock's door :: {"B1":1}
CAUGHT T-B2 [B-01 → B2] demo imports a src internal past a door :: {"B2":1}
CAUGHT T-B3 [B-01 → B3] slider sheet imports a private dock sheet :: {"B3":1,"B10":1}
CAUGHT T-B4 [B-01 → B4] sibling cycle chip <-> badge through doors :: {"B4":1}
CAUGHT T-B5 [B-01 → B5] dir inside a kind slot :: {"B5":1,"B6":1}
CAUGHT T-B6 [B-01 → B6] 13+ direct files in chip :: {"B6":1}
CAUGHT T-B6b [B-01 → B6] hand-written file over 500 lines :: {"B6":1}
CAUGHT T-B7 [B-01 → B7] doorless code dir deep-imported :: {"B7":1}
CAUGHT T-B8 [B-01 → B8] kernel type-imports a unit :: {"B4":1,"B8":1,"B11":1}
CAUGHT T-B8b [B-01 → B8] src reads demo :: {"B8":1}
CAUGHT T-B9 [B-01 → B9] dual door: badge door republishes Chip :: {"B9":2,"B11":1}
CAUGHT T-B10 [B-01 → B10] kernel composable read only by slider :: {"B1":1,"B10":1}
CAUGHT T-B11 [B-01 → B11] alias name on a door :: {"B11":1}
CAUGHT T-B12 [B-01 → B12] legacy relay :: {"B6":1,"B12":1}
CAUGHT T-B13 [B-01 → B13] bin imports a bin :: {"B0":17,"B6":1,"B13":1}
CAUGHT T-B14 [B-01 → B14] code in a JS door :: {"B11":1,"B14":1}
CAUGHT T-B14c [B-01 → B14] rule in a CSS door :: {"B14":1}
CAUGHT T-B15 [B-01 → B15] part-1 module :: {"B6":1,"B7":1,"B11":2,"B15":1}
CLEAN  L1 [legal → null] slider reads dock through its door :: {}
CLEAN  LC [legal → null] slider-local composable read only by slider :: {}
```

`N-foreign` is void on this tree: `src/components/slider/useDockHold.ts` already exists (F-7 placed it there under X-10)
and is a reviewed name in the pin, so the plant overwrote a reviewed file. The replacement plant (post-hash,
`<C>/tools/extra-plant-N-foreign2.json`: a new `chip/useSliderGlow.ts` read by chip) run through the gate's own overlay:

```
node scripts/structure/seal/seal.mjs --root . --overlay <C>/tools/extra-plant-N-foreign2.json --json <S>/nf2.json   # then diffed against seal-final.json
B15 [ "src/components/chip/useSliderGlow.ts (named for the unit slider, lives in chip; not in the pin's reviewed names)" ]
```

## 4 · Measurement probes

`node <C>/battery/probes.mjs --wt <S>/wt --repo <checkout> --base b602a59b` (the hashed probes; three threw on mechanics):

```
ITEM S-01 PASS B-kit tracked 115/115 on disk, dirty 0, kit files naming scratch paths 0, pass-2 tracked 96
ITEM S-02 FAIL probe threw: Cannot find module '<S>/wt/scripts/structure/lib/graph.mjs'
ITEM S-03 FAIL R5 ./aurora-config false; R4 names on both blob doors n/a; R6 @source-over-src sites without __tests__ negation 0 ; R3 slots over 12: 1 src/components/dock/__tests__; R9 ratchet numbers equal to base: true
ITEM S-04 PASS anchor lines 20; Skeleton.vue rows: none (not proposed)
ITEM S-05 FAIL probe threw: Cannot find module '<S>/wt/scripts/structure/lib/graph.mjs'
ITEM S-08 PASS top glass.css/theme.css gone true; glass/ theme/ doors true; CSS entries without dist 0/5; empty src dirs 0
ITEM S-10 PASS isSlot in placement+bounds 2/2; scopedKeyframes 2; classify.mjs true; B-kit files naming classify 6
ITEM S-11 FAIL harness true; tsconfig.build.json present false; floor landed true; files outside docs naming docs/tranches 8; yaml edges n/a
ITEM S-13 PASS xj-GonB.md true; xj-BonG.md true (clause tables read by hand in the report)
ITEM B-08 INFO accent-tone.css at src/components/chip/accent-tone.css; readers
ITEM B-09 PASS styles dirs without index.css 0 ; styles dirs over 12 0
ITEM B-10 FAIL probe threw: ENOENT: no such file or directory, stat '<S>/wt/tests-visual/node_modules'
ITEM B-11 INFO npm test = "vitest run"; seal cli scripts/structure/seal/seal.mjs; seal --no-pin → … FAIL (582) EXIT=1 ; no-pin mentions: (none)
```

The S-11 FAIL was the probe's own over-broad regex: the 8 files mention `docs/tranches/…` in prose comments (BK/BJ
records, one profile baseline path), and none imports the floor. `<C>/tools/probes.mjs` (sha256 `88888548…dbac`) fixes the
three mechanics (graph path after S19, dangling symlink, S-11 regex) and reruns:

```
node <C>/tools/probes.mjs --wt <S>/wt --repo <checkout> --base b602a59b --only S-02,S-03,S-05,S-11,B-08,B-10
ITEM S-02 PASS global-zone entries re-exporting outside the global zone: 0; kernel hooks home 7/7
ITEM S-03 FAIL R5 ./aurora-config false; R4 names on both blob doors 0; R6 @source-over-src sites without __tests__ negation 0 ; R3 slots over 12: 1 src/components/dock/__tests__; R9 ratchet numbers equal to base: true
ITEM S-05 PASS (refused; see §5)
ITEM S-11 PASS harness true; tsconfig.build.json present false; floor landed true; files naming design/structure outside docs 0; yaml edges 11
ITEM B-08 INFO accent-tone.css at src/components/chip/accent-tone.css; readers src/components/chip/index.css(css-import)
ITEM B-10 FAIL S7 SelectionValue at src/components/_shared/selection.ts; S10 ./aurora-config false; S11 src files >500 lines 16 (aurora/config/presets.ts, aurora/runtime/runtime.ts, blob/renderer/webgl/metaball.frag.ts, blob/renderer/webgpu/metaball.wgsl.ts, configurator/styles.css, dock/GlassDock.vue, …); S13 colocated tests 145; S14 manifest.ts lines 1099; S15 scripts/lib/index.mjs false (scripts/lib dissolved by S19; B7 0); S16 tests-visual direct files 177
```

(The S-02 probe's hook list resolved some names to their colocated tests first; the hook files themselves are at
`src/composables/dom/useClipboard.ts`, `motion/core/useRAFLoop.ts`, `motion/core/useYieldToMain.ts`,
`motion/scroll/useScrollChrome.ts`, `dom/useDragVelocity.ts`, `motion/scroll/useScrollProgress.ts`,
`motion/pointer/useRoutePointer.ts`: 7/7 in `src/composables/`, checked by `ls`.)

## 5 · FD-2

`node <C>/tools/fd2-stop.mjs <S>/wt` (dry; `git status --porcelain | wc -l` 815 before and after):

```
{"ok":false,"phase":"dry","preflight":false,…,"scc":{"before":{"sccs":2,"members":4},"after":{"sccs":3,"members":16},"addedPairs":66,
 "grown":[{"scc":["src/components/aurora", …, "src/composables/glass/webgpu"],"addedPairs":66}]},"written":false}
```

Whole-migration SCCs, `node <C>/tools/scc.mjs <lib> <tree>`:

```
FLOOR BASE (fresh b602a59b worktree + the committed floor rows = the chain's S1, code digest f0019420f925151f…, landed floor)
{"zones":["src"],"sccs":3,"members":12,"list":["src/composables/motion/core ↔ …/morph ↔ …/pointer ↔ …/reveal ↔ …/route ↔ …/scroll ↔ …/spring","src/components/fourier-field ↔ …/renderer ↔ …/shaders","src/components/dialog ↔ …"]}
{"zones":["src","demo"],"sccs":4,"members":14}
{"zones":["src","scripts","demo"],"sccs":5,"members":16}
(An earlier run over the live checkout read 3/21, 4/23, 5/25; the checkout had moved to 0cb5738e by then, so that arm is not
the cut and is not used.)
FINAL (replayed tree, landed floor)
{"zones":["src"],"sccs":1,"members":2,"list":["src/components/fourier-field ↔ src/components/fourier-field/renderer"]}
{"zones":["src","demo"],"sccs":2,"members":4}
{"zones":["src","scripts","demo"],"sccs":3,"members":6,"list":[…,"scripts/structure/lib ↔ scripts/structure/lib/graph"]}
```

The remaining src SCC's edges: `fourier-field/renderer/mint.ts import ../math.ts`, `renderer/uniforms.ts import-type ../math.ts`
against `FourierField.vue`, `index.ts`, `useFourierField.ts → renderer/index.ts`.

## 6 · Toolchain and vitest on the replayed tree

```
npx vite build 0 · npx vue-tsc --noEmit 0 · npx vue-tsc --noEmit -p tsconfig.test.json 0 · npm run demo:dist:build 0
node scripts/structure/entries.mjs check --root . 0 (63 js entries → 68 keys, 62 typesVersions; byte-equal)
node scripts/structure/surface.mjs check --root . 0 ({"exportKeys":68,"typesVersions":62,"jsEntries":63,"runtimeNames":583,"typeNames":1239}, differences 0)
node scripts/structure/gates.mjs --root . 0 (F-1 7,617 edges 0 violations; F-3; F-4 terminal src/styles/accessibility.css; F-9)
npm run verify:package 1: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2923674 > 2916129
dist/styles/theme.css = @import "./theme/index.css";
```

`npx vitest run` (second run, no concurrent load): `Test Files 2 failed | 238 passed (240)`, `Tests 3 failed | 2309 passed |
10 expected fail | 1 skipped (2323)`. The 3 failures are `tests/gates/seal.test.ts` B0, B2, B6. The second failed file is
`src/components/dock/__tests__/GlassDock.stagger.test.ts`, an `afterAll` hook timeout (browser close); alone it passes 9/9.
A first run under concurrent load had 6 more timeouts (glass-subtlety ×4, aurora-stage-affordance, atoms fuzz,
slider.size-tokens); rerun alone, those four files pass 68/68.

## 7 · B-13

`node <K>/…/B-kit/tools/b13.mjs --wt <fresh b602a59b wt> --checkout <checkout>`:

```
{"prototypeLayout":{"total":1901,…},"criticLayout":{"total":1888,…}}
B0: +13 in the prototype layout (the landed gate's own 11 walks, 1 computed read, 1 unresolved seal-pin read)
B11: +1 in the prototype layout (scripts/structure/index.mjs exports seal)
B6: +2 / +3 — the checkout had moved to 0cb5738e (12 code files changed since b602a59b, configurator styles.css 591 lines)
```

The tool's critic arm reads the live checkout, which is not pinned to the cut. Hermetic critic arm on a fresh b602a59b
worktree, the pass-2 gate placed in `<K>/scripts/structure/` so it reads the committed floor:

```
cp docs/…/pass-2/kit/B-proto/tools/structure/{seal,index}.mjs <K>/scripts/structure/
node <K>/scripts/structure/seal.mjs --root <fresh b602a59b wt> --no-pin --json <S>/b13-critic-b602.json
1887 {"B0":460,"B1":382,"B2":776,"B3":26,"B4":3,"B5":5,"B6":75,"B7":32,"B8":3,"B9":59,"B10":24,"B11":12,"B12":24,"B13":2,"B14":4,"B15":0}
```

1,901 − 1,887 = 14 = B0 13 + B11 1, as B-proto §4 states.

## 8 · B-12 (door cost), the cross-judge's committed tools rerun on this seat's replayed tree

```
node docs/…/pass-3/xj-GonB/door-cost.mjs --tree <S>/wt --stage <S>/stage --out <S>/xj/door-cost.json
  → identical to xj-GonB/results/door-cost.json except the "tree" path (B7 reading 158 doors 141,307 B; G reading 81 doors 95,142 B)
node docs/…/pass-3/xj-GonB/battery.mjs --tree <S>/wt --stage <S>/stage --out <S>/xj/battery-B-tree.json   (746 s)
  {"plants":107,"na":13,"errors":0,"judged":94,"caught":{"seal":84,"sealG":83,"gate":78,"gateMerge":52},
   "doorBought":[{"id":"B-crit:I5","seal":{"B1":1}}],"eponymyBought":[],"falsePositives":{"seal":["Dp-crit:L3"],"sealG":[],"gate":[]}}
```
