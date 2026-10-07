# critique-B · pass 5 · results

Seat claude-opus-5-5, 2026-10-07. Every line below is the output of a command this seat ran. Scratch outputs stayed in the
seat's scratchpad; this file carries the lines the verdicts rest on, filtered as each section says.

Trees, all linked worktrees of HEAD `12c5a3e9` (docs-only commits since the kit's `b100cc80`; the kit's bytes are
unchanged, `git diff HEAD -- pass-5/B-kit` empty):

- `kitwt`: pristine, the kit and floor were run from it, so the chain read only committed bytes.
- `wt`: the replay target.
- `floorwt`: the floor rows only (`floor/rows/apply.mjs` from `kitwt`), the cascade and browser base.

Load average during the replay was 330 to 520 (18 cores, other sessions). It fell to 28 to 150 for the later steps.

## 1 · Replay (STEP 2)

```
node <kitwt>/…/pass-5/B-kit/replay.mjs --root <wt> --twice
replay: from the base (digest 35f7b831fe810aac…)
  S1 [floor-rows] floor rows · again: floor rows → 025409f8129cbd11…
  S1b [row] row 28 written, 0 applied · again: row 0 written, 28 applied → 0179180464e000cf…
  S1d [row] row 3 written, 0 applied · again: row 0 written, 3 applied → 72eee4223a93cf8a…
  S2-1 [moves] moves 20 pending, 0 applied · again: moves 0 pending, 20 applied → 1085701f20c37edb…
  S2-2 [moves] moves 2 pending, 0 applied · again: moves 0 pending, 2 applied → 7a75f5c818cdba07…
  S2-3 [moves] moves 1 pending, 0 applied · again: moves 0 pending, 1 applied → 34a0b49a89601641…
  S2b [row] row 5 written, 0 applied · again: row 0 written, 5 applied → abc1288137b78d25…
```
After 2 h 15 min at load 519 with 7 of 103 steps done, the driver process was stopped. The in-flight S3 engine child finished on its own. The run then resumed without `--twice`, so the per-step digest check still runs:
```
node <kitwt>/…/replay.mjs --root <wt>
replay: resuming after step S3 (digest d22a5dc9afd45f5e…)
  S4a [moves] moves 64 pending, 0 applied → 4367e2964e5b2166…
  … (every step's digest equal to the chain's) …
  S59 [row] row 1 written, 0 applied → 4678be8f16e559ad…
replay done in 8270.2 s; code digest 4678be8f16e559ad4a5af028a3bb39b01b0b331314b0a43485cb519eee9801ac over 1564 files; chain final MATCH
node <kitwt>/…/replay.mjs --root <wt>
replay: the chain is applied (digest 4678be8f16e559ad…)
replay done in 18.8 s; code digest 4678be8f16e559ad…ac over 1564 files; chain final MATCH
```
After every battery run the code digest of `wt` was re-read: `4678be8f…`, 1564 files. `floorwt` reads
`025409f8129cbd118037450bf9cb2dc0c979f407fc2dc82d495a58c8462e5337` over 1354 files, the chain's S1 digest.

Disclosed: per-step `--twice` idempotence was re-run for S1..S2b only. Whole-chain idempotence (the rerun no-op) was re-run in full.

## 2 · Gate on the replayed tree

```
node scripts/structure/seal/seal.mjs --root <wt> --json …   → exit 1
PASS B0 0 · PASS B1 0 · FAIL B2 61 · PASS B3..B17 0
seal {"b0":{"f1":0,"walks":0,"computed":0},"files":14658,"edges":8258,"modules":139,"required":139,
      "b10":{"anchored":40,…,"held":[],"counted":0},"multiDoorSymbols":0,"pin":{"modules":139,"doors":119,"names":1262,"reviewed":2}}: FAIL (61)
```
The 61 B2 lines are the route's `b2-open.txt` set (demo 21, tests 31, tests-visual 8, scripts 1 per B-proto §4).

## 3 · Toolchain on the replayed tree

| command | result |
|---|---|
| `npx vite build` | 0 |
| `node scripts/verify-export-types.mjs` (verify:package) | 0, `terminal: CLEAN`, unpackedBytes 2,959,588 = datum 2,959,588 (the datum S59 wrote; HEAD's is 2,919,057) |
| `npm run demo:dist:build` | 0 |
| `npx vue-tsc --noEmit`, `-p tsconfig.test.json` | 0, 0 |
| `npx vitest run --reporter=json` | 262 files, 2,333 tests: 2,331 passed, 1 failed, 1 pending. The one failure is `tests/gates/seal.test.ts › seal (route D1-B) B2` |
| `package.json` exports | 69 keys, `./aurora-config` present; `./styles/theme` → `./dist/styles/theme/index.css` (93 B); no `dist/styles/theme.css` |

The route's committed `vitest-final.json` holds 253 test files. This run holds 262; the 9 more are each a colocated or carved suite (e.g.
`src/components/surface/__tests__/Surface.test.ts`, `tests/styles/track-well-fold.test.ts`). None fails.

## 4 · Battery (hash `d5b13d5c…`; amendment 1 `84686d2f…`, pw-program only)

`run-plants.mjs --root <wt> --adapter tools/adapter.mjs --set battery/plants.mjs --group` (209 plants co-planted, judged once,
attributed by unique mark); DIR13/SLOT13 solo; `--set battery/regress.mjs --group` (36 grouped, 8 solo).

### 4.1 plants.mjs, counts

| family | CAUGHT | other verdicts |
|---|---:|---|
| S-14, 140 plants (8 fs + 6 load shapes × literal/parameter × 5 zones) | 120 by B17 | 20 not by B17: every `ASYNC` (`readFile(p).catch(() => "")`, 10: 6 UNNAMED, 4 OTHER via B0/B8), every `FNVAL-par` and `FNMAP-par` (named loader called with an argument, 10: OTHER, B0 only, as a computed import) |
| S-14 controls, 15 | 9 CLEAN | 6 FALSE+ via B0: the plain and rethrowing parameter reads in scripts/tests/tests-visual are B0 computed-path reads under LAW §B0. This is a battery design defect, not a gate defect |
| PH5 placeholder split names, 15 | 8 (`helpers`, `utils`, `misc`, `common`, `helpers3`, `misc2`, demo `utils`, dir `part2`) | 7 UNNAMED (missed): `dock/GlassDock-2.ts`, `dock/part-1.ts`, `dock/GlassDockPart2.ts`, `dock/GlassDock2.ts`, `dock/bs11.ts`, `dock/GlassDockSplit.ts`, `tests/styles/part-2.test.ts` |
| VIS carved visual spec, 3 + 1 legal | `zqCarveOut.vis.ts` (B16, as an unread slot helper), `chip/zqCarveRoot.visual.ts` (B2) | `tests-visual/zqCarveOrphan.ts` (Playwright tests, not in the program's `*.spec.ts` match) MISSED; legal `chip/__tests__/zqCarveIn.visual.ts` FALSE+ by B16 ("its subject's home is the harness": a page-driving spec imports no sealed file) |
| DIR13 / SLOT13, 7 solo | 7 by B6 (src/components/command, demo/stories/display, scripts/structure, tests/demo, tests-visual/components/surfaces, dock root, dock/__tests__) | — |
| B2, 4 zones × 7 forms + mock + glob, + 6 legal | 25 by B2 (relative, type, dynamic, re-export, `?raw`, nested non-entry door; glob) | 4 package deep path `@mkbabb/glass-ui/src/…` by B0 (unresolved), 1 `vi.mock` of a private from `tests/` by B16 (LAW §5 seam: a mock is not B2). Legal: 5 CLEAN |

### 4.2 regress.mjs (pass 4's battery and extra plants)

Every pass-4 plant is caught as in pass 4: K-INT, K-INT-T, N-INT (B1); K-DOOR-L, T-OWN-L, LOCAL-L CLEAN; T-CYC, T-CYC-N, V-CYC,
F-CYC, F-CYC-T (B4); MASK-RET, MASK-RETN, MASK-CATCH, MASK-CATCH-D, MASK-TRY, X-TERN, X-TRYREAD, X-THEN2, X-FNVAL,
X-TRYAWAIT, X-ELSE, X-TERN-LIT, X-FNVAL-D (B17); PH-tests, PH-demo, PH-visual, PH-tests-helpers, PH-file, X-FOREIGN (B15);
SELF, WALK (B0); T-OUT, T-WRONG (B16); X-SCR (B10); K-REEX (B4, B8, B9, B11); G-RULE, TH-RULE (B14); D-CODE (B11, B14);
D-DUAL (B9, B11); B-13F, B-501, SLOT-13, SLOT-501 (B6).

Six rows first printed UNNAMED. My runner matches a mark only when no word character follows it, and pass 4's marks are
prefixes of the planted names (`plantFcyc` beside `plantFcycA.ts`). A solo re-run printed the gained lines, each naming the
planted files:
```
cycle @src [components/chip components/badge] (type-only) via src/components/chip/plantTcycA.ts -> src/components/badge/index.ts [type] ; …
cycle @src/components/slider [plantFcycB.ts plantFcycA.ts] via src/components/slider/plantFcycB.ts -> …/plantFcycA.ts ; …
cycle @src/components/slider [plantFcycTB.ts plantFcycTA.ts] (type-only) via …
src/components/chip/: 18 direct files > 12
```

### 4.3 tools/extra-plants.mjs (written after the hash; not part of it)

```
MISSED  X5-LOADER-ARG-demo          const load = (k) => import("@mkbabb/glass-ui/chip"); load(k).catch(() => undefined)
MISSED  X5-LOADER-ARG-tests         same
MISSED  X5-LOADER-ARG-tests-visual  same
MISSED  X5-LOADER-ARG-scripts       const load = (_k) => import("node:path"); load(k).catch(() => undefined)
MISSED  X5-TREEREAD-ret             try { return tree.read(p) } catch { return "" }      (cascade.mjs:219's shape)
MISSED  X5-TREEREAD-empty           try { x = JSON.parse(tree.read(p)) } catch { /* absent = empty */ }   (graph.mjs:37's shape)
MISSED  X5-FSREAD-literal-promise   readFile("package.json").catch(() => "")
RESTORED base judgement unchanged
```

## 5 · Census (battery/probes.mjs, gate-independent)

```
PROBE BOUNDS-DIR B-01/B-10 0
PROBE BOUNDS-LOC B-01/B-10 1      vite.style-fold.ts 588 (repo root, outside R-5's five zones)
PROBE PH-NAMES  B-07 6            src/components/dock/styles/core.css, src/styles/utilities/base.css,
                                  tests-visual/motion/motion2.spec.ts, tests-visual/storybook/configurator/suffuse2.spec.ts,
                                  src/composables/motion/core, scripts/structure/lib
PROBE MASK      S-14 205          (candidates; read one by one below)
PROBE B2-REACH  B-01 12           (relative and @/ reaches only; every hit outside an entry source is also a gate B2 line)
```
`suffuse2.spec.ts` sits beside `suffuse.spec.ts`, and `motion2.spec.ts` came from HEAD's `tests-visual/motion2.spec.ts`. The carve moved both and renamed neither.
B15 skips every test file (`seal.mjs`: `if (… || isTest(f) || …) continue`).

The masking candidates outside Playwright page-operation catches, read site by site. Each is live on the replayed tree, and B17 is 0:

| site | shape | effect |
|---|---|---|
| `scripts/structure/cascade.mjs:219` | `try { return tree.read(\`tests-visual/${spec}\`) } catch { return "" }` | FD-4's coverage reads a spec's text by `tests-visual/<basename>`. A carved spec is not there, so it reads `""` and can never be evidence (§7) |
| `scripts/structure/lib/graph/graph.mjs:37` | `try { ledger = JSON.parse(tree.read(…)) } catch { /* absent ledger = empty */ }` | an absent or malformed ledger reads as empty |
| `scripts/structure/lib/recipes.mjs:58` | `try { text = tree.read(file) } catch { return new Set() }` | an unreadable file contributes no classes to FD-4's co-occurrence |
| `vite.style-fold.ts:412` | `if (existsSync(distIndex) && existsSync(sfcBundle)) { …fold… }` with no else | a missing SFC bundle skips the fold silently, and `./styles` ships without component CSS |
| `vite.utility-emit.ts:94` | `if (existsSync(sfcBundle)) scanPaths.push(sfcBundle)` | a missing SFC bundle drops its classes from the utility scan silently |
| `src/components/{aurora/runtime/runtime.ts:281, blob/renderer/useMetaballRenderer.ts:238, fourier-field/useFourierField.ts:204}` | `armAsync().catch(() => undefined)` | a failed renderer arm is swallowed (not a module load or a file read) |
| 90+ `tests-visual` sites | `page.goto(…)/waitForSelector(…)/click(…).catch(() => {})` | swallowed navigation and waits (not a module load or a file read) |

`graph.mjs:149` (a missing package becomes an `unresolved` violation) and the `statSync` probes are not fallbacks.

## 6 · Command probes (battery/tree-probes.sh)

```
TPROBE PIN-OPT B-11 PASS --pin refused rc=1
TPROBE NOPIN B-11 PASS --no-pin refused rc=1
TPROBE OFFSWITCH B-11 INFO source lines naming a pin or seal off switch: 0
TPROBE GATE-PURE S-09 PASS gate rc=1, tree unchanged
TPROBE CSS-DIST S-08/P4-R4 FAIL css export keys=4 missing=0 pure-@import dist files=38
TPROBE PW-PROGRAM B-10 PASS missing 0          (PWPROBE in-program=169 test-files=169)
TPROBE REORDER-acc S-10/B-08 PASS build rc=0, verify RED rc=1: RED: an unlisted reorder (1 moved rule(s))
TPROBE REORDER-out S-10/B-08 PASS build rc=0, verify RED rc=1: RED: an unlisted reorder (4 moved rule(s))
TPROBE CASCADE-RESTORE S-10 PASS restored tree verifies rc=0
TPROBE RATCHET S-03/P4-R3 INFO verify:package rc=0: terminal CLEAN
```
I judge CSS-DIST's FAIL an over-reach of the probe. The 38 files are module CSS doors (`dist/components/<unit>/index.css`, only `@import`, which LAW §5 and B14 require), not
forwarders at a moved entry's old name. P4-R4 itself holds: the four CSS export keys target real files, and `dist/styles/theme.css`
does not exist.

## 7 · Cascade and FD-4

**Against my own floor base.** `floorwt` was built and snapshotted. All four `.seq` files equal the committed `results/p5/cascade-floor/` byte for byte.
`wt`'s snapshot equals the committed `results/p5/cascade-final/` byte for byte.
```
cascade.mjs verify --baseline <floor snap> --dist <wt>/dist --reorders authored/listed-reorders.json   → exit 1
./styles      RED: content changed   firstDivergence 610
./styles.css  RED: content changed   firstDivergence 310
fonts, theme  identical
```
With `data-v-#N` scope ids erased, floor and final are the same rule multiset: `./styles` onlyBase 17 → 0, onlyNow 17 → 0;
`./styles.css` the same.

**P5-F3 on the route's tree** (baseline: a snapshot of `wt`'s own dist). The plants were `acc` (accent-tone after the glass-chip sheet) and `out`
(`animations.css` ↔ `viz-reveal.css` in `src/styles/motion/index.css`). The listing named only the `acc` rule, taken from the
verifier's own UNLISTED line:
```
acc + out, listing = acc → exit 1  RED: the reorder is not the listed rung (4 moved rule(s) unlisted, 0 listed rule(s) unmoved)
   UNLISTED ./styles "@keyframes substrate-reveal-bloom :: from {…}" (+3)
acc alone, listing = acc → exit 1  RED: 1 swapped pair(s) can change a value and no band spec that reads it ran
   RISK ./styles [--accent-band-strength] .accent-tone × .glass-chip (0,1,0; co-occur in src/components/chip/chipVariants.ts)
restored → verify exit 0
```

**FD-4's coverage arm** (`tools/fd4-cover-probe.mjs`, calling the tree's own `coverRisks`):
```
spec src/components/chip/__tests__/chip-accent-band.visual.ts: names --accent-band-strength true, names glass-chip true, names accent-tone true
ARM A carved, band path as browser.mjs writes it: covered=false evidence=0
ARM B carved, band by basename: covered=false evidence=0
ARM C control: spec at tests-visual/<basename>, band by basename: covered=true evidence=1
FD4-COVER FAIL: the carved readback spec cannot be evidence; the same text at the pre-carve path can
```
There are two causes. `text(spec)` reads `tests-visual/<basename>` and swallows the miss as `""` (cascade.mjs:219). Results are keyed
by basename while `band.specs` holds the selection's paths (`browser.mjs` 208 and the bandReport), so `b.specs.includes(spec)` never
matches a carved spec. Arm C covers only because the control's band was keyed by basename. Either cause alone blocks the evidence.

## 8 · Browser (F-10 seat, chromium-headless-new, the committed 154-spec selection)

The selection did not re-derive from the committed `changed` list alone (1 spec; the route also passed move lists), so both arms ran the
committed `selection-final.json` specs: 151 with a floor counterpart on `floorwt`, all 154 on `wt`.

| arm | tests | passed | failed | skipped |
|---|---:|---:|---:|---:|
| `floorwt`, 151 specs | 864 | 428 | 392 | 44 |
| `wt`, 154 specs, `--base-report` floor | 866 | 429 | 393 | 44 |

```
[browser-seat 2026-10-07T18:17:14.588Z] GREEN: 429/822 passed, 393 failed, 44 skipped in 5597s
newFailures 0
chip-accent-band.visual.ts :: a Chip's --accent-band-strength is glass-chip's floored band, not the register's 18% → expected
blob-painted-component.visual.ts :: P047 reads the origin component from both renderer buffers at DPR 1 and 2 → unexpected (no floor counterpart)
```

### 8.1 Per-band base-green (committed `selection-final.json` bands, keyed by spec basename and title)

68 bands, 0 new failures. 24 bands have no base-green test and so no browser signal: accordion, badge, checkbox, collapsible,
context, data-table, dom, index, infinite-scroll, keyboard, label, labeled-field, number-field, popover, radio-group, reactive,
separator, sidebar, skeleton, status-dot, switch, toggle-group, tooltip, typewriter. The 44 bands with signal (base-green
count): README 3, alert 35, aurora 397, blob 290, button 196, card 3, carousel 2, chip 22, color 195, command 2, configurator 205,
constellation 99, dark 10, dark-mode-toggle 393, deck 2, dialog 143, dock 406, easing 80, expandable-container 4, fading-scroll 12,
fourier-field 123, glass 40, handmark 195, input 2, menu 16, metric 2, motion 228, music-staff 12, pager-dots 212, progress 33,
scroll-progress-rim 2, search 6, select 1, shared 16, sheet 80, slider 69, sortable-list 192, styles 407, surface 231, table 3,
tabs 94, textarea 2, timeline 69, toast 14.

The 392/393 failures are the same on both trees (0 base-green test fails now). This file does not classify them. Many are
π-lane GPU readbacks in headless Chromium, as pass 4's 15-of-37 base failures were.
