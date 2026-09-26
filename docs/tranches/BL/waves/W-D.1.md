# W-D.1 · W-COLOCATION: the tree lands in the D1 loop's converged placement, sealed · 11.0.0 · loop D1

| field | value |
|---|---|
| seat | band-D wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `8141658d` (the task named `f3ad78d0`; `git diff --stat f3ad78d0 HEAD -- . ':!docs'` prints nothing, so the code is the one the task names). `src` is the published 10.1.0 (`git diff --stat v10.1.0 HEAD -- src` prints nothing). Measured in two scratch worktrees: `wt` at HEAD (with `dist/` built there, `npx vite build` exit 0), and `wt2` at HEAD with route B's committed pass-4 chain replayed on it (`pass-4/B-kit/replay.mjs`, 153.7 s, `code digest 472cf49336969d4f… over 1434 files; chain final MATCH`, the digest `pass-4/REBASE.md:17` names) |
| ships in | 11.0.0 |
| loop | D1 structure (`design/structure/`). This is a LOOP WAVE: it lands the loop's converged kit and adds no design of its own |
| families | F-55, F-56, F-57, F-58, F-59 whole (`audit/REGISTRY.md:1278-1324`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

Short cites: `REG:n` is `audit/REGISTRY.md`; `D1:n` is `design/structure/REGISTRY.md`; `RUL` is `design/structure/RULINGS.md`; `LAW §n` is `design/structure/pass-4/B-kit/LAW.md`; `REBASE:n` is `design/structure/pass-4/REBASE.md`; `CUR:n` is `FORMATION-PROGRESS.md`.

## 0 · The entry gate: the D1 loop converges

This wave does not start until D1 meets the charter's criterion (`CHARTER.md:82,86`) in the loop's own form (D1:976-986): every item of the frozen checklist closed by a committed, replayable measurement; a fresh adversarial audit that re-opens none; two consecutive clean critiques; at least three full passes.

**The checklist.** §P2-7 (D1:988-1036) carried forward with S-14 added (D1:1367-1399): S-01..S-14 and B-01..B-13, 27 items. G-01..G-12 and D′'s gaps are held with their banked routes and return only with a route's re-trigger (D1:1125-1150).

**State at this seat.** Entering pass 4: 18 closed, 9 open (S-03, S-10, S-12, S-14, B-01, B-07, B-08, B-10, B-11) (D1:1397). The two-clean count is 0, so the earliest convergence is the pass-5 agglomeration (D1:1361-1365). Pass 4 runs as `wf_a80a9cba-712` (CUR:70-71); its step 1, route B's chain re-recorded on 10.1.0, is banked at `c6d3d953`, and this seat reproduced its digest on `wt2`. Owed to the owner before the loop can close: P4-R1 (R-10's scope), P4-R2 (names consumers read that no entry publishes), P4-R3 (the ratchet datum rows), P4-R4 (a moved CSS entry's dist name) (D1:1249-1252).

**What the wave lands** is the kit the converged pass commits (its chain, law, seal, pin, floor rows and MIGRATION rows), replayed on the wave's base. It lands no pass-4 artifact that the loop did not converge on.

**Items this seat measured on the loop's current tree that the loop must dispose of before convergence.** Each is logged for the loop's next registry under D1:981 (a finding outside the checklist re-opens only when it maps to a listed item or to an edict clause the list leaves out). This wave's gates (§5) require each to be 0:

1. A parent↔child value cycle stands on route B's pass-4 tree: `src/components/fourier-field` ↔ `src/components/fourier-field/renderer`, through `renderer/mint.ts:21 → fourier-field/math.ts`, while the parent reads `renderer/index.ts` (`FourierField.vue:14`, `useFourierField.ts:31`). This is G-12's question (D1:1032, held with G's bank), now live on B's tree. B4 judges siblings only (LAW §8), so the seal passes it.
2. The public name `Surface` means two symbols: the component on `./surface` and the axis type on `.` and `./axes` (`src/components/_shared/axes.ts:23`). It is unchanged on B's tree. A consumer imports both today: `atlas/src/editorial/story-card.ts:1` takes the type from `./axes`, and `atlas/src/platform/chrome/masthead/GalleryMasthead.vue:19` takes the component from `./surface` (read-only grep).
3. Five bare type aliases of library types remain on B's tree (six at HEAD): E-1's "one concept, two names".
4. The chain writes its MIGRATION section as `## UNRELEASED — the structure cut (BL)` (`wt2` `MIGRATION.md:8`). W-C.2's shape gate (C2-G4) requires a bare version heading and W-C.2's detector forbids tranche ids.
5. The consumer preset `chartHeights`, `chartMargin`, `chartColors` stays in `./tokens` on B's tree (L13-13, F-56).

## 1 · What it closes

| family | members | how |
|---|---|---|
| F-55 the colocation chronic (disease row) | L01b-62, L12-01, L13-01, L14-01 (its decision), L05b-08, L12-07, L04-F20 | the move ledger lands in one sweep from the converged chain; the placement seal lands as a gate (G-42), so the edict has an enforcement; R-5's bound is a seal clause (B6), which ends the unbound ≤500 arm; L04-F20's net-indirection number is measured here (§3.8). L14-01's periphery execution is W-D.2's |
| F-56 component-owned code in global zones | L05a-10, L12-02, L12-04, L13-02, L13-04, L13-05, L13-13, L13-15 | placement by readers with the publication anchor (P3-R1(a)); CSS by the same law after the channel collapse (P3-R2); the speedtest chart preset retired from `./tokens` |
| F-57 nesting by file kind | L12-06, L12-08, L13-10, R10-02-09 | the module carve with authored names (LAW §4), one door per module (B7), kind slots bounded (P3-R3), placeholder and misnamed files judged (B15) |
| F-58 one symbol, two doors | L12-05, L12-10, L12-11, L13-03, L13-09, L10-19, L10-20 | one symbol one door (B9, P3-R4), door purity (B14), no relays (B12), the dead components barrel deleted, the one entry record (F-3) replacing `subpath-policy.mjs`, one name per symbol (`Surface`), bare aliases deleted |
| F-59 cycles from contracts homed in one consumer | L12-03, L12-09, L01a-21, R10-02-10 | the floor rows m02 and m03 re-home the contracts; sibling acyclicity (B4); the value-SCC count to 0 at module grain, parent↔child included; `scripts/import-dag.mjs` retires with its mislabelled SCC report (the floor's F-1 graph is the one graph) |

## 2 · The defect at HEAD

- **Nothing enforces the edict.** No placement gate exists; BK's G-COLOCATED seat had `"binding": "none"` (L12-01). The loop's seal, run at the floor base (HEAD plus the committed floor rows, with pass 4's committed `seal.mjs` and `law.mjs` staged beside the landed floor and an empty pin), fails 16 of 17 clauses: `B0 490, B1 176, B2 356, B3 18, B4 2, B5 5, B6 75, B7 35, B8 1, B9 45, B10 16, B11 1057, B12 24, B13 0, B14 4, B15 3, B16 148`, total 2,455. B11's 1,057 is read against an empty pin and says only that no pin exists; the other clauses do not read the pin.
- **Private reaches past a component's door: 11 JS and 18 CSS** (appendix A at HEAD). JS: `_shared/overlay/participation.ts:14 → dock/composables/dockContext.ts`, `blob/composables/useMetaballRenderer.ts:8 → aurora/constants/budget.ts`, `card/Card.vue:4 → surface/Surface.vue`, `command/CommandDialog.vue:4,5 → dialog/{Dialog,DialogContent}.vue`, `command/types.ts:3 → dialog/Dialog.vue`, `dialog/DialogContent.vue:16 → sheet/motion.ts`, `dock/DockTrigger.vue:11 → menu/DropdownMenuTrigger.vue`, `sheet/SheetContent.vue:12 → dialog/ModalOverlay.vue`, `slider/Slider.vue:20 → dock/composables/useDockHold.ts`, `composables/motion/morph/useSelectionGroup.ts:20 → tabs/composables/useTabRovingFocus.ts`. CSS: `styles/glass.css:68 → chip/accent-tone.css` and 17 `@import`s in `styles/index.css:207-276` into component sheets. These are the two wiring channels of L12-05.
- **Value cycles.** Over the floor's graph at module grain, 3 value SCCs: `[17]` the M02 knot (`_shared`, `_shared/overlay`, `dock`, `menu`, `select`, `tabs`, `composables/glass` ×4, `composables/motion` ×7), `[2]` `dialog` ↔ `sheet`, `[3]` `fourier-field` ↔ `renderer` ↔ `shaders`. The repo's own `node scripts/import-dag.mjs` prints `module SCCs full 3 · value 3` because its `VALUE_TYPES` holds `glob`, `vue-block-src` and `style` (`scripts/import-dag.mjs:469`) against its header; restricted to value edges its modules give 2 (M02 of 7, M03 of 2), the registry's corrected figure (REG:1324).
- **Two doors per symbol: 40 symbols.** The built surface puts 41 names on two subpath entries: 20 `./blob` + `./blob-config`, 8 `./fourier-field` + `./fourier-math`, 4 `./aurora` + `./color`, 4 `./dock` + `./motion` (`useDockCtaReceive`, `src/components/dock/index.ts:82-86`, `src/composables/motion/index.ts:55`), 3 `./motion` + `./motion-core`, 2 `./axes` + `./surface`. The seal counts 40 symbols (`multiDoorSymbols` 40); the 41st name is `Surface`, which is two different symbols (item 2 of §0).
- **One concept, two names.** 6 bare aliases of library types: `AuroraHarmony = ColorHarmony` (`aurora/composables/color.ts:98`), `AuroraImageSource = ImageInputSource` (`aurora/constants/presets.ts:36`), `ProgressOrientation = Orientation` (`progress/types.ts:7`), `ScrollProgressRimOrientation = Orientation` (`scroll-progress-rim/types.ts:4`), `SurfaceDecoration = SurfaceAxis` (`surface/Surface.vue:11`), `SegmentedTabsActivation = TabActivation` (`tabs/types.ts:34`).
- **A dead barrel.** `src/components/index.ts` has no code reader (its only edges are `demo/demo.css:120`'s `@source` scan and the floor's entry record).
- **Bounds.** `bounds.mjs` over the five zones: 18 directories over 12 direct files and 58 hand-written files over 500 lines (`src` 9 and 18; the largest `tests-visual` with 177 direct files).
- **The placement at HEAD.** The floor's F-7 over `src` and `scripts` proposes 17 moves and one NEEDS-NAME (`src/composables/glass/webgl/shaders/flow.glsl.ts`, target exists), including `useGlassBackdropLuminance.ts → dock`, `useFuzzySearch.ts → dock`, `useScrollChrome.ts → dock`, `flow.wgsl.ts → aurora`, `useDockHold.ts → slider`, `accent-tone.css → src/styles/`.
- **Dual instruments.** `scripts/import-dag.mjs`, `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs` are present; the policy file's INTERNAL labels contradict the shipped `./carousel` and `./infinite-scroll` (L12-11, L13-09).
- **A consumer preset ships as API.** `dist/tokens.js` exports `chartHeights`, `chartMargin`, `chartColors` (`src/styles/tokens.ts:12,19,26`); nothing in `src`, `demo` or `tests` reads them; speedtest, pinned `10.1.0` exact (`speedtest/package.json:93`), imports all three (`speedtest/src/components/dashboard/charts/chartMetrics.ts:28-31`).

**The loop's current tree (route B, pass-4 chain, `wt2`)** moves most of this: seal 14 of 17 GREEN (`B0 450, B2 71, B6 62`, matching REBASE:28-30), floor gates 4 PASS, CROSS-JS 0, CROSS-CSS 0, dead barrel gone, value SCCs 1, one-door 1 (`Surface`), aliases 5, bounds 6 directories and 56 files over, cascade RED at rule 141. That is the loop's open work (§0), not this wave's.

## 3 · The cure

The mechanism is the loop's converged route. At this seat that is D1-B, sealed modules (D1:1091-1124; LAW §1-§9), and the wave lands whatever the converged pass commits. The steps below are the landing, not the design.

1. **Replay the converged chain on the wave's base.** Cut a worktree at the wave's base, re-record the chain there if the base moved since the loop's last record (the loop's own rebase step, REBASE:34-60), and apply it with the kit's `replay.mjs --twice`. Every step is a frozen move list or an exact-text row; nothing is edited by hand. The replay's code digest is the wave record's first line.
2. **The floor lands.** Rows `f3`, `f4`, `m02`, `m03`, `f9`, `fd6`, `fd7`, `fd11` put the floor runtime at `scripts/structure/` with its door, the one entry record (`scripts/structure/records/entry-record.json`), the surface pin, `tests/harness/source.ts`, `tests/gates/floor.test.ts`; `tsconfig.build.json` and `scripts/import-dag.mjs` are deleted (the committed rows print this, run in `wt`). The floor's surface pin is re-recorded on the wave's base (REBASE:62-80, S1c's gap).
3. **The seal lands as G-42.** `scripts/structure/seal/{seal,law,index}.mjs`, `scripts/structure/records/seal-pin.json` (the reviewed pin), `tests/gates/seal.test.ts` with one `it` per clause and one requiring all seventeen, no `--no-pin` and one pin path (B-11). W-A.2's roster entry G-42 COLOCATED turns `bound` with a bite patch that moves one component-owned file back into `src/composables/` (B10 goes RED).
4. **The contracts are re-homed** (F-59): `m02-overlay-host` and `m03-roving-move` in the floor rows, then B4 and the base rule (LAW §4) for the rest. The parent↔child reach (§0 item 1) is cured by the base rule: a parent-level file a child value-reads moves into a sibling module of the parent, which keeps it inside its unit (and inside the `./fourier-math` anchor, since P3-R1(a) anchors the unit, not the directory).
5. **One symbol, one door, one name** (F-58, E-1).
   - B9 and P3-R4: a name on two entries keeps the entry that owns its origin, or the lighter entry of one module. The 40 removal rows are the chain's (§7).
   - `Surface` means the component only. The axis type becomes `SurfaceDecoration`, the name `Surface.vue:11` already gives it, declared once in `src/components/_shared/axes.ts` and published from `./axes` and the root barrel; the alias in `Surface.vue` is deleted, and `./surface` stops publishing it (B9). The component keeps `Surface`.
   - Bare aliases are deleted and their readers take the one name: `Orientation` (`./axes`) for `ProgressOrientation` and `ScrollProgressRimOrientation`; `TabActivation` for `SegmentedTabsActivation`; `ColorHarmony` (`./color`) for `AuroraHarmony`; `ImageInputSource` for `AuroraImageSource` (the chain's type-home step, LAW §8, already moves it on B's tree).
   - `src/components/index.ts` is deleted. `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs` are deleted: the entry record is the one source for exports and the library's Vite inputs (the chain re-points `vite.library.ts` to `scripts/structure/index.mjs`).
   - L10-19 (`./styles` and `./styles.css` both reach `glass-ui.css`) is decided by R-7: `./styles.css` carries exactly its HEAD bytes (RUL R-7), as the precompiled sheet for a consumer without Tailwind, and `./styles` is the Tailwind source. A consumer imports one of the two; W-C.3's doc invariant carries that sentence into the README. value.js importing both (`value.js/demo/styles/foundation.css:62-63`) is consumer-side, relayed by W-L.7.
6. **CSS by the same law** (P3-R2): every CSS crossing targets the entered module's `index.css`; `accent-tone.css` lands where the post-collapse placement computes (`src/styles/`, at its HEAD rung, D1:1226), with the cascade value-identical (§6).
7. **The consumer preset leaves `./tokens`** (L13-13): `chartHeights`, `chartMargin` and `chartColors` are deleted from `src/styles/tokens.ts`. They are speedtest's chart geometry; a named preset lives in its consumer. `minWidthInputSm` and `motionStagger` stay (W-C.5 generates their CSS twins from the table). MIGRATION row in §7; speedtest takes an addendum in its own tranche (E-6).
8. **L04-F20's number.** The wave record states the net indirection once: door files and door bytes (`index.ts`, `index.css`, `index.mjs` under `src` and `scripts`, tests excluded) at the base and at the landed tree. This seat's reading: HEAD 76 files, 152,920 B; route B's pass-4 tree 158 files, 141,360 B (xjGB counted 158 and 141,307 B on pass 3's tree, D1:1194).
9. **R-5 is met, not waived.** Every file over 500 lines is split into named modules and every directory over 12 files is carved (B-S11, B-S16), or the loop reports a per-file counterexample before convergence (RUL R-5). No `<style src>` or `<template src>` carve (RUL R-5).
10. **The loop's tooling goes.** Whatever of `design/structure/` W-C.1 moved to `scripts/loops/structure/` is deleted; the kits under `docs/tranches/BL/design/structure/` stay as records. `#56`'s `deriveBlobPalette` item is closed by ruling P3-R1(a), not moved: `./color` publishes it, so its entry anchors it in `src/composables/color/` (on B's tree it stays there); W-G.7's shader-free derive subpath re-cuts that boundary (L13-15's own disposition).

## 4 · Files it touches

The chain's move ledger over `src`, `scripts`, `tests`, `tests-visual` (visual specs with a one-unit subject, RUL R-3) and the `demo` import specifiers (R-10), as frozen in the converged kit; at pass 4 that is 1,434 files after the chain (REBASE:17). Named edits beyond the chain's: `src/components/_shared/axes.ts` and `src/components/surface/Surface.vue` (the `Surface` name), `src/components/{progress,scroll-progress-rim,tabs}/types.ts` and aurora's colour module (aliases), `src/styles/tokens.ts` (the preset), `MIGRATION.md` (one `## 11.0.0` section in W-C.2's table form), `CHANGELOG.md`, `package.json` (`./aurora-config` added per P3-R5; scripts re-pointed), `vitest.config.ts` (`include` takes `src/**/__tests__` and `scripts/**/__tests__`). New: `scripts/structure/**`, `tests/gates/{seal,floor}.test.ts`, `tests/harness/source.ts`. Deleted: `scripts/import-dag.mjs`, `scripts/lib/subpath-policy.mjs`, `scripts/regen-exports.mjs`, `tsconfig.build.json`, `src/components/index.ts`, `scripts/loops/structure/` if present.

## 5 · Acceptance gates

`<floor-lib>` is `docs/tranches/BL/design/structure/floor/lib/graph.mjs` at HEAD and `scripts/structure/lib/<graph door>` after landing (on B's tree `scripts/structure/lib/graph/index.mjs`); `<surface>` is `floor/surface.mjs` at HEAD and `scripts/structure/surface.mjs` after. Appendices A-C hold the three probes; each lands as a test under `tests/gates/` reading the landed floor through its door.

| id | gate | passes when | HEAD reading | loop's pass-4 tree (`wt2`) |
|---|---|---|---|---|
| D1-G1 · the seal (G-42) | `npx vitest run tests/gates/seal.test.ts` (the CLI: `node scripts/structure/seal/seal.mjs`) | 17 of 17 PASS | **RED**: 16 of 17 FAIL, 2,455 lines (§2; floor base with the committed pass-4 seal staged) | **RED**: `FAIL B0 450`, `FAIL B2 71`, `FAIL B6 62` |
| D1-G2 · the floor | `node scripts/structure/gates.mjs` (in the suite as `tests/gates/floor.test.ts`) | four PASS | **RED**: `scripts/structure/` absent (module not found); at the floor base `FAIL F-9 surface pin … ". types: + ConfiguratorLayout"` (S1c's gap, REBASE:62-80) | 4 PASS |
| D1-G3 · structure counts | `node <appendix A> . <floor-lib>` | VALUE-SCC 0, CROSS-JS 0, CROSS-CSS 0, DEAD-BARREL 0, ALIAS-TYPE 0; exit 0 | **RED** exit 1: `VALUE-SCC 3`, `CROSS-JS 11`, `CROSS-CSS 18`, `DEAD-BARREL 1`, `ALIAS-TYPE 6` | **RED** exit 1: `VALUE-SCC 1` (`fourier-field`, `fourier-field/renderer`), `ALIAS-TYPE 5`; the other three 0 |
| D1-G4 · one door | `npm run build && node <appendix B> . <surface>` | `0 names on two or more entries` | **RED**: `41 names` (20 blob/blob-config, 8 fourier-field/fourier-math, 4 aurora/color, 4 dock/motion, 3 motion/motion-core, 2 axes/surface) | **RED**: `1 names` (`./axes + ./surface`, the `Surface` collision) |
| D1-G5 · one name | `npm run build && node <appendix C> . <surface>` | 0 collisions | **RED**: `Surface: runtime on ./surface; type-only on . ./axes` | **RED**: the same line |
| D1-G6 · R-5 bounds | `node scripts/structure/bounds.mjs --json .cache/bounds.json && node -e 'const s=require("./.cache/bounds.json").summary;process.exit(s.dirsOver+s.filesOver?1:0)'` | exit 0 | **RED**: `dirsOver 18`, `filesOver 58` | **RED**: 6 and 56 |
| D1-G7 · no consumer preset | `npm run build && node -e 'import("./dist/tokens.js").then(m=>process.exit(["chartHeights","chartMargin","chartColors"].some(k=>k in m)?1:0))'` | exit 0 | **RED** exit 1 (all three present) | **RED** exit 1 |
| D1-G8 · one graph, one entry record | `! test -e scripts/import-dag.mjs && ! test -e scripts/lib/subpath-policy.mjs && ! test -e scripts/regen-exports.mjs && ! test -e scripts/loops/structure` | exit 0 | **RED**: all three scripts present | GREEN (the chain deletes them) |
| D1-G9 · cascade, hold line | `node scripts/structure/cascade.mjs snapshot --dist <base dist> --out .cache/cascade-base` at the base, then `node scripts/structure/cascade.mjs verify --baseline .cache/cascade-base --dist dist` at the wave | every entry `"identical": true` | hold line: HEAD against its own snapshot exits 0 (`./styles` 1,970 rules, `./styles/fonts` 4, `./styles/theme` 4, `./styles.css` 365) | **RED** exit 1: `./styles` `"class":"reorder"`, `firstDivergence 141`, base `.accent-tone {--accent-band-strength:18%…` (B-08, S-28) |
| D1-G10 · inherited from W-C.2 | C2-G1 (no tranche meta) and C2-G4 (MIGRATION is a version list) over the landed tree | both exit 0 | owned by W-C.2, which lands first | **RED** on the chain's own text: `MIGRATION.md:8` `## UNRELEASED — the structure cut (BL)` is not a bare version |

**Can each fail and pass?** D1-G1, G2, G3 (CROSS-JS, CROSS-CSS, DEAD-BARREL) and G8 pass on the loop's tree, so they can pass; each is RED at HEAD. D1-G3's VALUE-SCC and ALIAS-TYPE, D1-G4, G5, G6 and G7 are RED on both trees: they pass when §0's items are closed and §3.5, §3.7 and §3.9 land. A fixture proves nothing more than a real tree here, so none is used. D1-G9 is a hold line: it cannot be RED at HEAD by construction (nothing has moved), and its bite is shown on the loop's tree. D1-G1's bite for the roster is §3.3's patch. D1-G6 duplicates B6 on purpose: `bounds.mjs` reports every zone's list, which the wave record keeps.

## 6 · π and DELTA obligations

The wave claims one visual thing: **no paint changes.** Every move and every CSS door keeps the painted result identical.

- **Cascade (D1-G9).** Value identity of all four CSS entries against the base snapshot. Rule-count identity is not enough (S-28: 1,964 = 1,964 rules while a Chip's band strength changed).
- **Paired captures.** For every band the F-10 browser seat selects by the graph (P4-F4: every spec and route that reads a moved file, its classes or its paths), and at least the 18 components whose sheets change channel (§2: chip, dark-mode-toggle, dock, card, button, configurator, tabs segmented and drag, sheet, dialog, slider, metric, music-staff, scroll-progress-rim, deck, carousel, and the `_shared` feedback and menu partials): a screenshot of the story route at the base and at the wave, same viewport, DPR 1 and 2, `reducedMotion: reduce`, in light and dark, in Chromium and Playwright WebKit. The DELTA is the per-pair pixel diff image, and it must be empty over the component's box. Real Safari is **UNMEASURED** (the owner's `safaridriver` checkbox, `AllowRemoteAutomation => false` per PLAN's header); the wave record says so per cell.
- **Paired π.** On the Chip in both themes and both engines, the computed `--accent-band-strength` and `--accent-edge-strength` at the base and at the wave (cB-R9 measured 22 % and 25 % at HEAD against 18 % on a reordered tree, D1:1072). Each pair must be equal.
- **Browser signal.** Each band reports its base-green count; a band with no base-green spec says it has no browser signal (P4-F4, S-29), and its claim rests on the cascade and the π pair alone.

## 7 · MIGRATION rows (11.0.0, W-C.2's table form)

| before | after | note |
|---|---|---|
| 20 config names from `@mkbabb/glass-ui/blob` (`BlobConfig`, `BLOB_CONFIG_KEY`, `BLOB_CONFIG_DEFAULTS`, `BLOB_HERO`, `clampLightnessFloor`, `LIGHTNESS_FLOOR_*`, the `Blob*` types, `MoodParams`, `MetaballSource`, `Satellite*`) | the same names from `@mkbabb/glass-ui/blob-config` | one symbol, one entry; the lighter entry keeps it (P3-R4). value.js imports `BLOB_CONFIG_KEY` from both today (RUL R-6) |
| 8 names from `@mkbabb/glass-ui/fourier-field` (`dftFromPoints`, `partialSumAt`, `positionsAt`, `makeEllipticSpectrum`, `makeHarmonicFigure`, `FOURIER_FIGURES`, `FOURIER_FIGURE_KEYS`, `BasisComponent`) | from `@mkbabb/glass-ui/fourier-math` | as above |
| `DAMPING`, `FRAME_MS`, `SNAP_THRESHOLD` from `@mkbabb/glass-ui/motion` | from `@mkbabb/glass-ui/motion-core` | as above |
| `cssToOklch`, `oklchStopToHex`, `oklchToLinear`, `OklchStop` from `@mkbabb/glass-ui/aurora` | from `@mkbabb/glass-ui/color` | the entry that owns the origin keeps it |
| `useDockCtaReceive` and its three types from `@mkbabb/glass-ui/dock` | from `@mkbabb/glass-ui/motion` | as above |
| `SurfaceTier` from `@mkbabb/glass-ui/surface` | from `@mkbabb/glass-ui/axes` | as above |
| `type Surface` from `@mkbabb/glass-ui` or `@mkbabb/glass-ui/axes` (the decoration axis) | `type SurfaceDecoration` from the same entries | `Surface` now means the component only; atlas `src/editorial/story-card.ts:1` updates |
| `type SurfaceDecoration` from `@mkbabb/glass-ui/surface` | from `@mkbabb/glass-ui/axes` | one entry |
| `ProgressOrientation`, `ScrollProgressRimOrientation` | `Orientation` from `@mkbabb/glass-ui/axes` | one concept, one name |
| `SegmentedTabsActivation` | `TabActivation` from `@mkbabb/glass-ui/tabs` | as above |
| `AuroraHarmony` | `ColorHarmony` from `@mkbabb/glass-ui/color` | as above |
| `chartHeights`, `chartMargin`, `chartColors` from `@mkbabb/glass-ui/tokens` | removed, no successor | speedtest's chart geometry; the consumer owns its preset (speedtest addendum) |
| — | `@mkbabb/glass-ui/aurora-config` added | P3-R5, mirrors `./blob-config` |

The rows P4-R2 rules (names a consumer reads that no entry publishes: added on their owning entry, or the consumer changes) are added by the loop's converged chain with their pin rows. The chain's own MIGRATION text is rewritten into this table (D1-G10).

## 8 · Dependencies

The D1 gate (§0), including P4-R1..P4-R4 ruled. W-A.2 first: G-42's roster entry and R-1's register retire (P4-F1 makes it a floor precondition, D1:1333). W-C.2 first: its detector and MIGRATION shape bind the landed text. W-C.1 first, for the loop tooling's home. Waves of bands E-K that land before this wave are moved by its chain, which derives from the graph, so a later tree is re-planned, not hand-merged (PLAN §5 note).

## 9 · Ledger rows

Closes #62 W-COLOCATION (the disease row, `ledger/census-register-b.md:52`), #21 W-DAG-REDUCE's M02/M03 remainder (`ledger/census-register-a.md:34`; its `./blob-config` cut is F-66's, W-L.6), N-1's frontend half with its enforcement (G-42; `ledger/CENSUS.md:192`), E-1's one-symbol-one-door half (B9 and D1-G4/G5; `ledger/CENSUS.md:167`), #56's `deriveBlobPalette` item (closed by P3-R1(a), §3.10), L04-F20's measure (§3.8), and the F-55 to F-59 census rows (`ledger/CENSUS.md:127-131`). Answers W-B.2's O-48 and UIA-F-145 through the door rule and P4-R2, and W-B.8's DotRing directory through the placement.

## 10 · Gestalt passes (P-1)

Tranche fit: one law, one graph, one entry record, one seal; no second instrument survives (D1-G8). Wave: the paired captures and the cascade verdict show no paint moved. Feature: a reader opening any component directory finds its sub-components, composables, styles and tests inside it, one door at its root, and no file of it anywhere else (D1-G1 B1, B10, B16).

## Appendix A · the structure probe (`d1-probe.mjs`, run at this seat)

```js
// W-D.1 probe: the F-55..F-59 defects read over the floor's F-1 graph (the one graph W-D.1 lands).
// Independent of the seal's code: it restates four registry born-REDs as counts.
//   node d1-probe.mjs <root> <floor lib/graph.mjs>      one line per arm; exit 1 when any arm is over 0
// Arms:
//   VALUE-SCC      module SCCs over value edges in src (a module is a directory, kind slots
//                  composables/ styles/ __tests__/ folded into their owner)            [F-59, REG:1324]
//   CROSS-JS       src edges (import, import-type, reexport, dynamic) from outside a component dir
//                  into one of its files other than its root index.ts                  [F-56, F-58, F-59]
//   CROSS-CSS      src CSS edges (css-import, sfc-style-src) from outside a component dir into one
//                  of its sheets other than its root index.css                          [F-56, F-57 L12-05]
//   DEAD-BARREL    src/components/index.ts present with no code reader                  [F-58 L12-10]
//   ALIAS-TYPE     `export type X = Y;` in src where Y is imported from inside the library (a second
//                  name for one type)                                                    [F-58 L10-20, E-1]
import { readFileSync } from "node:fs";
import { join, resolve, posix } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]);
const { buildGraph } = await import(pathToFileURL(resolve(process.argv[3])).href);
const g = buildGraph(root);
const E = g.edges.filter((e) => e.to && e.from !== e.to && e.from.startsWith("src/") && e.to.startsWith("src/") && !/\/__tests__\//.test(e.from));

const VALUE = new Set(["import", "reexport", "reexport-star", "dynamic", "import-side-effect", "require"]);
const SLOT = new Set(["composables", "styles", "__tests__"]);
const mod = (f) => { let d = posix.dirname(f); while (SLOT.has(posix.basename(d)) && d.includes("/")) d = posix.dirname(d); return d; };
const adj = new Map();
for (const e of E) { if (!VALUE.has(e.kind)) continue; const a = mod(e.from), b = mod(e.to); if (a === b) continue;
  if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a).add(b); }
let n = 0; const I = new Map(), L = new Map(), on = new Set(), st = [], sccs = [];
const visit = (v) => { I.set(v, n); L.set(v, n++); st.push(v); on.add(v);
  for (const w of adj.get(v)) { if (!I.has(w)) { visit(w); L.set(v, Math.min(L.get(v), L.get(w))); } else if (on.has(w)) L.set(v, Math.min(L.get(v), I.get(w))); }
  if (L.get(v) === I.get(v)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== v); if (c.length > 1) sccs.push(c.sort()); } };
for (const v of adj.keys()) if (!I.has(v)) visit(v);

const unitOf = (f) => { const a = f.split("/"); return a[1] === "components" && a[2] !== "_shared" && a.length > 3 ? `src/components/${a[2]}` : null; };
const crossing = (kinds, door) => E.filter((e) => kinds.has(e.kind)).filter((e) => {
  const u = unitOf(e.to); if (!u || unitOf(e.from) === u) return false;
  return e.to !== `${u}/${door}`; });
const js = crossing(new Set(["import", "import-type", "reexport", "reexport-star", "dynamic", "import-side-effect"]), "index.ts");
const css = crossing(new Set(["css-import", "sfc-style-src"]), "index.css");
const barrel = "src/components/index.ts";
const CODE_READ = new Set([...VALUE, "import-type"]); // a Tailwind @source scan and a record's json-ref are not readers
const dead = g.tree.files.includes(barrel) && !g.edges.some((e) => e.to === barrel && e.from !== barrel && CODE_READ.has(e.kind));

const aliases = g.tree.files.filter((f) => f.startsWith("src/") && /\.(ts|vue)$/.test(f) && !/\/__tests__\//.test(f)).flatMap((f) => {
  const t = readFileSync(join(root, f), "utf8");
  return [...t.matchAll(/^export type (\w+) = (\w+);$/gm)].filter(([, , y]) =>
    new RegExp(`import\\s+(type\\s+)?\\{[^}]*\\b${y}\\b[^}]*\\}\\s+from\\s+["']\\.`).test(t)).map(([, x, y]) => `${f}: ${x} = ${y}`); });

const rows = [
  ["VALUE-SCC", sccs.length, sccs.map((c) => `[${c.length}] ${c.join(", ")}`).join(" | ")],
  ["CROSS-JS", js.length, js.map((e) => `${e.from}:${e.line} -> ${e.to}`).join("; ")],
  ["CROSS-CSS", css.length, css.map((e) => `${e.from}:${e.line} -> ${e.to}`).join("; ")],
  ["DEAD-BARREL", dead ? 1 : 0, `${barrel} present=${g.tree.files.includes(barrel)}`],
  ["ALIAS-TYPE", aliases.length, aliases.join("; ")],
];
for (const [k, c, d] of rows) console.log(`${c ? "FAIL" : "PASS"} ${k} ${c} :: ${d}`);
process.exitCode = rows.some(([, c]) => c) ? 1 : 0;
```

HEAD (`wt`, graph from `docs/tranches/BL/design/structure/floor/lib/graph.mjs`), exit 1:

```
FAIL VALUE-SCC 3 :: [17] src/components/_shared, src/components/_shared/overlay, src/components/dock, src/components/menu, src/components/select, src/components/tabs, src/composables/glass, … | [2] src/components/dialog, src/components/sheet | [3] src/components/fourier-field, src/components/fourier-field/renderer, src/components/fourier-field/shaders
FAIL CROSS-JS 11 :: src/components/_shared/overlay/participation.ts:14 -> src/components/dock/composables/dockContext.ts; …
FAIL CROSS-CSS 18 :: src/styles/glass.css:68 -> src/components/chip/accent-tone.css; src/styles/index.css:207 -> …
FAIL DEAD-BARREL 1 :: src/components/index.ts present=true
FAIL ALIAS-TYPE 6 :: src/components/aurora/composables/color.ts: AuroraHarmony = ColorHarmony; …
```

Route B's pass-4 tree (`wt2`, graph from `scripts/structure/lib/graph/index.mjs`), exit 1:

```
FAIL VALUE-SCC 1 :: [2] src/components/fourier-field, src/components/fourier-field/renderer
PASS CROSS-JS 0 ::
PASS CROSS-CSS 0 ::
PASS DEAD-BARREL 0 :: src/components/index.ts present=false
FAIL ALIAS-TYPE 5 :: src/components/aurora/config/color.ts: AuroraHarmony = ColorHarmony; …
```

## Appendix B · one door (`one-door.mjs`)

```js
// W-D.1 probe: one symbol, one door (E-1, R-6, F-58). Reads the BUILT surface (every package entry's
// runtime and declaration names, through the floor's readSurface) and prints every name that two or more
// subpath entries publish. The root entry "." is the aggregate barrel and is not counted.
//   node one-door.mjs <root> <readSurface module>     exit 1 when any name has two doors
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2] ?? ".");
const { readSurface } = await import(pathToFileURL(resolve(process.argv[3])).href);
const s = await readSurface(root, resolve(root, "dist"));
const entries = s.entries ?? s;
const by = new Map();
for (const [entry, v] of Object.entries(entries)) {
  if (entry === ".") continue;
  for (const n of new Set([...(v.runtime ?? []), ...(v.types ?? [])])) { if (!by.has(n)) by.set(n, new Set()); by.get(n).add(entry); }
}
const multi = [...by].filter(([, e]) => e.size > 1);
const pairs = {};
for (const [, e] of multi) { const k = [...e].sort().join(" + "); pairs[k] = (pairs[k] ?? 0) + 1; }
console.log(`one-door: ${multi.length} names on two or more entries`);
for (const [k, n] of Object.entries(pairs)) console.log(`  ${n}  ${k}`);
process.exitCode = multi.length ? 1 : 0;
```

HEAD: `one-door: 41 names on two or more entries` / `3 ./motion + ./motion-core` / `4 ./dock + ./motion` / `2 ./axes + ./surface` / `20 ./blob + ./blob-config` / `4 ./aurora + ./color` / `8 ./fourier-field + ./fourier-math`, exit 1. Route B's tree: `one-door: 1 names on two or more entries` / `1 ./axes + ./surface`, exit 1.

## Appendix C · one name (`one-name.mjs`)

```js
// W-D.1 probe: one public name, one symbol. A name that is a runtime export on one entry and a
// type-only export on another denotes two different symbols (a collision a consumer resolves by
// which subpath they happen to import). Reads the built surface through the floor's readSurface.
//   node one-name.mjs <root> <readSurface module>      exit 1 on any collision
import { resolve } from "node:path"; import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]); const { readSurface } = await import(pathToFileURL(resolve(process.argv[3])).href);
const s = await readSurface(root, resolve(root, "dist")); const entries = s.entries ?? s;
const rt = new Map(), ty = new Map();
for (const [k, v] of Object.entries(entries)) {
  const r = new Set(v.runtime ?? []);
  for (const n of r) (rt.get(n) ?? rt.set(n, []).get(n)).push(k);
  for (const n of v.types ?? []) if (!r.has(n)) (ty.get(n) ?? ty.set(n, []).get(n)).push(k);
}
const hits = [...rt].filter(([n]) => ty.has(n)).map(([n, e]) => `${n}: runtime on ${e.join(" ")}; type-only on ${ty.get(n).join(" ")}`);
console.log(`one-name: ${hits.length} names denote a runtime symbol on one entry and a type on another`); for (const h of hits) console.log("  " + h);
process.exitCode = hits.length ? 1 : 0;
```

HEAD and route B's tree, each exit 1: `one-name: 1 names denote a runtime symbol on one entry and a type on another` / `Surface: runtime on ./surface; type-only on . ./axes`.
