# W-D.1 · W-COLOCATION: the tree lands in the D1 loop's converged placement, sealed · 11.0.0 · loop D1

| field | value |
|---|---|
| seat | band-D wave-spec seat, formation run `wf_68eb18d6-b21`; W-D.1 re-point seat (round 1), against the D1 convergence record |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `37adcf822`. The code is 10.1.0's (`git diff 6154d6ec HEAD -- . ':!docs'` prints nothing), the base the convergence record replays on (D1 §P13-6.1). Measured in three scratch worktrees under `.claude/worktrees/bl/formation/wd1-repoint1/`: `head` at HEAD; `base` at HEAD (built there, `npm run build` exit 0), then cut to the floor base by `floor/rows/apply.mjs` (code digest `6773b4ec…` over 1,354 files); `wt` at HEAD with the converged chain replayed (`K13/replay.mjs`, 325.9 s, `code digest 6fdd4ec7bd259630… over 1587 files; chain final MATCH`; a rerun is a no-op, "the chain is applied", 0.5 s) |
| ships in | 11.0.0 |
| loop | D1 structure (`design/structure/`). This is a LOOP WAVE: it lands the loop's converged kit and adds no design of its own |
| families | F-55, F-56, F-57, F-58, F-59 whole (`audit/REGISTRY.md:1278-1324`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

Short cites: `REG:n` is `audit/REGISTRY.md`; `D1:n` and `D1 §Pn-m` are `design/structure/REGISTRY.md`; `RUL` is `design/structure/RULINGS.md`; `K13` is the converged kit, `design/structure/pass-13/B-kit/`; `LAW §n` is `K13/LAW.md`; `CUR:n` is `FORMATION-PROGRESS.md`.

## 0 · The entry gate: the D1 loop converges

This wave starts when D1 meets the charter's criterion (`CHARTER.md:82,86`) in the loop's own form (D1 §P2-6.5, D1:976-986): every item of the frozen checklist closed by a committed, replayable measurement; a fresh adversarial audit that re-opens none; two consecutive clean critiques.

**The gate is met.** The convergence record, D1 §P13-6, is the one source of record for D1's facts, and this wave cites it rather than restating it:

- **Route and kit.** D1-B, sealed modules, flat; the kit is `K13` (`LAW.md` §1-§14 and "The gate", the seal B0-B18, the pin, the nine floor rows, the four judges, `lib/`) (D1 §P13-6.1).
- **Chain.** 126 steps (`K13/frozen/SEQUENCE.json`), S1 the floor rows, S69 the last gate step, S70 the one rebind; digest `6fdd4ec7bd259630d38a466a444e45b2b18f71b4cbf2259d258a4c6177996bbf` over 1,587 files (D1 §P13-6.1).
- **Floor base.** `6773b4ec1217ab416eea2e5ec1b79d39587c4201a70871d347e919d532f2cadb` over 1,354 files, cut by `floor/rows/apply.mjs` (D1 §P13-6.1).
- **Datum.** S70's `.bundle-ratchet`, 2,920,386 (D1 §P13-6.1).
- **Battery.** The bar the route meets and its two clean critiques, pass 12 (`pass-12/critique-B.md`, battery `c6fdf555…`) and pass 13 (`pass-13/critique-B.md`, battery `8cf445d0…`), each 27/27 (D1 §P13-6.1, §P13-7).
- **Rulings.** D1 §P13-6.2's list, every row in RUL.

**The checklist.** S-01..S-14 and B-01..B-13, 27 items, all closed (D1 §P13-7). G-01..G-12 and D′'s gaps close with the banked routes (D1 §P13-6.5).

**What the wave lands** is `K13` replayed on the wave's base (its chain, law, seal, pin, floor rows and MIGRATION rows), the wave's own edits (§3 steps 5 and 7) and the landing's own rows (§4: the version bump; FLOOR.md's recipe, P11-G3). The kit's four judges stay kit tools and land nowhere; of them, `peer-closure` reads `SEQUENCE.json` under `--floor-base` only, and in that mode an absent file exits 2 (D1 §P13-6.1, P13-G1).

## 1 · What it closes

| family | members | how |
|---|---|---|
| F-55 the colocation chronic (disease row) | L01b-62, L12-01, L13-01, L14-01 (its decision), L05b-08, L12-07, L04-F20 | the move ledger lands in one sweep from the converged chain; the placement seal lands as a gate (G-42), so the edict has an enforcement; R-5's bound is a seal clause (B6), which ends the unbound ≤500 arm; L04-F20's net-indirection number is measured here (§3.8). L14-01's periphery execution is W-D.2's |
| F-56 component-owned code in global zones | L05a-10, L12-02, L12-04, L13-02, L13-04, L13-05, L13-13, L13-15 | placement by readers with the publication anchor (P3-R1(a)); CSS by the same law after the channel collapse (P3-R2); the speedtest chart preset retired from `./tokens` |
| F-57 nesting by file kind | L12-06, L12-08, L13-10, R10-02-09 | the module carve with authored names (LAW §4), one door per module (B7), kind slots bounded (P3-R3), placeholder and misnamed files judged (B15) |
| F-58 one symbol, two doors | L12-05, L12-10, L12-11, L13-03, L13-09, L10-19, L10-20 | one symbol one door (B9, P3-R4), door purity (B14), no relays (B12), the dead components barrel deleted, the one entry record (F-3) replacing `subpath-policy.mjs`, one name per symbol (`Surface`), bare aliases deleted |
| F-59 cycles from contracts homed in one consumer | L12-03, L12-09, L01a-21, R10-02-10 | the floor rows m02 and m03 re-home the contracts; B4: sibling acyclicity and every module-grain value SCC, parent↔child included (P9-R1); the value-SCC count to 0 over `src` and `scripts`; `scripts/import-dag.mjs` retires with its mislabelled SCC report (the floor's F-1 graph is the one graph) |

## 2 · The defect at HEAD

- **Nothing enforces the edict.** No placement gate exists; BK's G-COLOCATED seat had `"binding": "none"` (L12-01). `tests/gates/seal.test.ts` and `scripts/structure/` are absent at HEAD. `K13`'s gate staged on the floor base (`gate/*.mjs` and `lib/law.mjs` copied to `scripts/structure/seal/`, an empty pin) reaches no verdict: `seal: no verdict: … Cannot find module '…/scripts/structure/lib/index.mjs'`, exit 2. The floor base has no door on the floor runtime's `lib/`; the chain adds it.
- **Private reaches past a component's door: 11 JS and 18 CSS** (appendix A at HEAD). JS: `_shared/overlay/participation.ts:14 → dock/composables/dockContext.ts`, `blob/composables/useMetaballRenderer.ts:8 → aurora/constants/budget.ts`, `card/Card.vue:4 → surface/Surface.vue`, `command/CommandDialog.vue:4,5 → dialog/{Dialog,DialogContent}.vue`, `command/types.ts:3 → dialog/Dialog.vue`, `dialog/DialogContent.vue:16 → sheet/motion.ts`, `dock/DockTrigger.vue:11 → menu/DropdownMenuTrigger.vue`, `sheet/SheetContent.vue:12 → dialog/ModalOverlay.vue`, `slider/Slider.vue:20 → dock/composables/useDockHold.ts`, `composables/motion/morph/useSelectionGroup.ts:20 → tabs/composables/useTabRovingFocus.ts`. CSS: `styles/glass.css:68 → chip/accent-tone.css` and 17 `@import`s in `styles/index.css:207-276` into component sheets. These are the two wiring channels of L12-05.
- **Value cycles.** Over the floor's graph at module grain, over `src` and `scripts` (appendix A), 4 value SCCs: `[17]` the M02 knot (`_shared`, `_shared/overlay`, `dock`, `menu`, `select`, `tabs`, `composables/glass` ×4, `composables/motion` ×7), `[2]` `dialog` ↔ `sheet`, `[3]` `fourier-field` ↔ `renderer` ↔ `shaders`, `[2]` `scripts` ↔ `scripts/lib`. The repo's own `node scripts/import-dag.mjs` prints `module SCCs full 3 · value 3` because its `VALUE_TYPES` holds `glob`, `vue-block-src` and `style` (`scripts/import-dag.mjs:469`) against its header; restricted to value edges its modules give 2 (M02 of 7, M03 of 2), the registry's corrected figure (REG:1324).
- **Two doors per symbol: 40 symbols.** The built surface puts 41 names on two subpath entries: 20 `./blob` + `./blob-config`, 8 `./fourier-field` + `./fourier-math`, 4 `./aurora` + `./color`, 4 `./dock` + `./motion` (`useDockCtaReceive`, `src/components/dock/index.ts:82-86`, `src/composables/motion/index.ts:55`), 3 `./motion` + `./motion-core`, 2 `./axes` + `./surface`. The seal counts 40 symbols (`multiDoorSymbols` 40); the 41st name is `Surface`, which is two different symbols (§3 step 5).
- **One concept, two names.** 6 bare aliases of library types: `AuroraHarmony = ColorHarmony` (`aurora/composables/color.ts:98`), `AuroraImageSource = ImageInputSource` (`aurora/constants/presets.ts:36`), `ProgressOrientation = Orientation` (`progress/types.ts:7`), `ScrollProgressRimOrientation = Orientation` (`scroll-progress-rim/types.ts:4`), `SurfaceDecoration = SurfaceAxis` (`surface/Surface.vue:11`), `SegmentedTabsActivation = TabActivation` (`tabs/types.ts:34`).
- **A dead barrel.** `src/components/index.ts` has no code reader (its only edges are `demo/demo.css:120`'s `@source` scan and the floor's entry record).
- **Bounds.** The floor's `bounds.mjs` over the five zones: 18 directories over 12 direct files and 58 hand-written files over 500 lines (`src` 9 and 18; the largest `tests-visual` with 177 direct files).
- **The placement at HEAD.** The floor's F-7 over `src` and `scripts` proposes 17 moves and one NEEDS-NAME (`src/composables/glass/webgl/shaders/flow.glsl.ts`, target exists), including `useGlassBackdropLuminance.ts → dock`, `useFuzzySearch.ts → dock`, `useScrollChrome.ts → dock`, `flow.wgsl.ts → aurora`, `useDockHold.ts → slider`, `accent-tone.css → src/styles/`.
- **Dual instruments.** `scripts/import-dag.mjs`, `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs` are present; the policy file's INTERNAL labels contradict the shipped `./carousel` and `./infinite-scroll` (L12-11, L13-09).
- **A consumer preset ships as API.** `dist/tokens.js` exports `chartHeights`, `chartMargin`, `chartColors` (`src/styles/tokens.ts:12,19,26`); nothing in `src`, `demo` or `tests` reads them; speedtest, pinned `10.1.0` exact (`speedtest/package.json:93`), imports all three (`speedtest/src/components/dashboard/charts/chartMetrics.ts:28-31`).

**The converged tree (`wt`, `K13`'s chain replayed)** moves most of this: the seal 19 of 19 at 0 (1,585 files, 8,350 edges), floor gates 4 PASS, VALUE-SCC 0 over `src` and `scripts`, CROSS-JS 0, CROSS-CSS 0, dead barrel gone, one-door 1 (`Surface`), aliases 5, bounds 0 directories and 0 files over, the import-dag, subpath-policy and regen-exports scripts gone, cascade GREEN against the floor base with `K13`'s listed reorder (SCOPE Timeline → TimelineMarks 40). What stands is the wave's own work (§3 steps 5 and 7): `Surface`, the five aliases and the consumer preset.

## 3 · The cure

The mechanism is the loop's converged route, D1-B, sealed modules (D1 §P13-6.1; LAW §1-§14 and "The gate"), and the wave lands `K13` as committed. Steps 1-10 land the chain; the items marked "the wave's own edit" in steps 5 and 7 are outside the chain (D1 §P13-6.4); step 11 is the landing's path map.

1. **Replay the converged chain on the wave's base.** Cut a worktree at the wave's base and apply the chain with `K13/replay.mjs --twice`. Every step is a frozen move list or an exact-text row; nothing is edited by hand. The replay keys on the code digest: it starts only from the chain's base (10.1.0's code) or a point on the chain, and refuses any other tree before a write. When the wave's base code is not 10.1.0's (`git diff 6154d6ec <base> -- . ':!docs'` prints a line), the chain is re-recorded on that base with the kit's writers (`K13/record-step.mjs`, `lib/row.mjs`, the tree's own move engine), each frozen step applying as committed or reported by name. The replay's code digest is the wave record's first line; on 10.1.0's code it is `6fdd4ec7…` over 1,587 files (D1 §P13-6.1).
2. **The floor lands.** S1, the nine floor rows (`r1`, `f3`, `f4`, `m02`, `m03`, `f9`, `fd6`, `fd7`, `fd11`), puts the floor runtime at `scripts/structure/` with its door, the one entry record (`scripts/structure/records/entry-record.json`), the surface pin (`scripts/structure/records/surface-pin.json`), `tests/harness/source.ts`, `tests/gates/floor.test.ts`; `tsconfig.build.json` and `scripts/import-dag.mjs` are deleted (all read on `wt`). The floor base is `6773b4ec…` (D1 §P13-6.1); its four floor gates PASS, F-9 included.
3. **The seal lands as G-42.** `scripts/structure/seal/` (`seal.mjs` the CLI, `clauses.mjs`, `cycles.mjs`, `fallbacks.mjs`, `walks.mjs`, `peer.mjs`, `law.mjs`, `index.mjs` the door), `scripts/structure/records/seal-pin.json` (the reviewed pin), `tests/gates/seal.test.ts` with one `it` per clause and one requiring all nineteen (26 tests on `wt`, 26 passed), no `--no-pin` and one pin path (B-11); the CLI exits 0, 1 or 2 (LAW "The gate", P6-R3). W-A.2's roster entry G-42 COLOCATED turns `bound` with a bite patch that moves one component-owned file back into `src/composables/` (B10 goes RED).
4. **The contracts are re-homed** (F-59): `m02-overlay-host` and `m03-roving-move` in the floor rows, then B4 and the base rule (LAW §4) for the rest. B4 judges every module-grain value SCC, parent↔child included (LAW §8, P9-R1 (a)), and the base rule cures the `fourier-field` ↔ `fourier-field/renderer` cycle: `fourier-field/math.ts`, the parent-level file the child value-reads, moves into a sibling module inside the `./fourier-math` anchor (LAW §4). VALUE-SCC reads 0 over `src` and `scripts` on `wt` (appendix A).
5. **One symbol, one door, one name** (F-58, E-1).
   - B9 and P3-R4: a name on two entries keeps the entry that owns its origin, or the lighter entry of one module. The removal rows are the chain's, under `## 11.0.0` (§7). After the chain one name stands on two entries, `Surface` (`./axes + ./surface`, appendix B on `wt`).
   - **`Surface` names two symbols** (the wave's own edit, D1 §P13-6.4). On `wt` it is the component on `./surface` and the axis type on `.` and `./axes` (appendix C: `Surface: runtime on ./surface; type-only on . ./axes`), declared at `src/components/_shared/axes.ts:23` and re-exported at `src/index.ts:486`. A consumer imports both: `atlas/src/editorial/story-card.ts:1` takes the type from `./axes`, and `atlas/src/platform/chrome/masthead/GalleryMasthead.vue:19` takes the component from `./surface` (read-only grep). The cure: `Surface` means the component only. The axis type becomes `SurfaceDecoration`, the name `Surface.vue:11` already gives it, declared once in `src/components/_shared/axes.ts` and published from `./axes` and the root barrel; the alias in `Surface.vue` is deleted, and `./surface` stops publishing it (B9). D1-G4 and D1-G5 read 0.
   - **Five bare type aliases** (the wave's own edit, D1 §P13-6.4; E-1's "one concept, two names"). On `wt`: `src/components/aurora/config/color.ts:96` `AuroraHarmony = ColorHarmony`, `src/components/progress/types.ts:7` `ProgressOrientation = Orientation`, `src/components/scroll-progress-rim/types.ts:4` `ScrollProgressRimOrientation = Orientation`, `src/components/surface/Surface.vue:11` `SurfaceDecoration = SurfaceAxis`, `src/components/tabs/types.ts:34` `SegmentedTabsActivation = TabActivation`. Each is deleted and its readers take the one name: `Orientation` (`./axes`) for `ProgressOrientation` and `ScrollProgressRimOrientation`; `TabActivation` for `SegmentedTabsActivation`; `ColorHarmony` (`./color`) for `AuroraHarmony`; the `SurfaceDecoration` alias goes with the `Surface` cure above. The chain's type-home step (LAW §8) already moves `AuroraImageSource` onto `ImageInputSource`'s home. D1-G3's ALIAS-TYPE reads 0.
   - `src/components/index.ts` is deleted. `scripts/lib/subpath-policy.mjs` and `scripts/regen-exports.mjs` are deleted: the entry record is the one source for exports and the library's Vite inputs (the chain re-points `vite.library.ts` to `scripts/structure/index.mjs`).
   - L10-19 (`./styles` and `./styles.css` both reach `glass-ui.css`): this wave changes no byte of either CSS entry (RUL R-7; D1-G9 holds it). Whether `./styles.css` exists is W-G.7's (F-52, §3 item 4, gate G7-G7 and its MIGRATION row), the one record: `./styles` is the one CSS entry, so the second door closes there. W-G.7 and this wave are unordered (PLAN §5); if W-G.7 lands first, the entry is absent at this wave's base and D1-G9 has no `./styles.css` row. value.js importing both (`value.js/demo/styles/foundation.css:62-63`) is consumer-side, relayed by W-L.7 (fix-9, FH-01's class: an unordered pair that disagreed on one export).
6. **CSS by the same law** (P3-R2): every CSS crossing targets the entered module's `index.css`; `accent-tone.css` lands where the post-collapse placement computes (`src/styles/glass/accent-tone.css` on `wt`, at its HEAD rung, D1:1226), with the cascade GREEN against the floor base (§6, D1-G9).
7. **The consumer preset leaves `./tokens`** (L13-13; the wave's own edit, D1 §P13-6.4). On `wt`, `dist/tokens.js` exports all three of `chartHeights`, `chartMargin` and `chartColors`, declared at `src/styles/tokens/tokens.ts:12,19,26` (`src/styles/tokens.ts` at HEAD), with 0 readers in `src`, `demo`, `tests` and `tests-visual`; speedtest, pinned `10.1.0` exact (`speedtest/package.json:93`), imports all three (`speedtest/src/components/dashboard/charts/chartMetrics.ts:28-31`). The three are deleted from `src/styles/tokens/tokens.ts`. They are speedtest's chart geometry; a named preset lives in its consumer. `minWidthInputSm` and `motionStagger` stay (W-C.5 generates their CSS twins from the table). MIGRATION row in §7; speedtest takes an addendum in its own tranche (E-6).
8. **L04-F20's number.** The wave record states the net indirection once: door files and door bytes (`index.ts`, `index.css`, `index.mjs` under `src` and `scripts`, tests excluded) at the base and at the landed tree. HEAD: 76 files, 152,920 B; `wt`: 164 files, 137,285 B.
9. **R-5 is met, not waived.** Every file over 500 lines is split into named modules and every directory over 12 files is carved (B-S11, B-S16; LAW §12); `bounds.mjs` reads 0 directories and 0 files over on `wt`, every zone. No `<style src>` or `<template src>` carve (RUL R-5).
10. **The loop's tooling goes.** Whatever of `design/structure/` W-C.1 moved to `scripts/loops/structure/` is deleted; the kits under `docs/tranches/BL/design/structure/` stay as records. `#56`'s `deriveBlobPalette` item is closed by ruling P3-R1(a), not moved: `./color` publishes it, so its entry anchors it in `src/composables/color/` (on `wt` it stays there, `src/composables/color/color.ts:285`); W-G.7's shader-free derive subpath re-cuts that boundary (L13-15's own disposition).
11. **Gate paths move with their files** (PLAN §1, "Gate paths and the base re-run"; fix-4, FC-03). The chain's move ledger is the one path map. In the commit that lands the moves, every path it moves that a §5 gate of a wave not yet landed names (`docs/tranches/BL/waves/*.md`) is re-pointed to its new path. At formation 22 negated gates in bands E to L name a single `src` file (`` grep -nE '`! (git )?grep[^`]*src/[A-Za-z_/.-]+\.(ts|vue|css|mjs)' waves/W-[E-L]*.md | grep -v '~~' ``, run in `docs/tranches/BL`; pass 3's wider script, which also counts directory pathspecs, found 29). Each such gate passes on an absent file (`grep` exits 2 under the `!`; `git grep` exits 1 on an empty pathspec), so an unmoved path is a fail-open. A path whose deletion is its own wave's cure stays as written.

## 4 · Files it touches

The chain's move ledger over `src`, `scripts`, `tests`, `tests-visual` (visual specs with a one-unit subject, RUL R-3) and the `demo` import specifiers (R-10), as frozen in `K13`; the code digest after the chain covers 1,587 files (D1 §P13-6.1). Named edits beyond the chain's (the wave's own, D1 §P13-6.4): `src/components/_shared/axes.ts` and `src/components/surface/Surface.vue` (the `Surface` name), `src/components/{progress,scroll-progress-rim,tabs}/types.ts` and aurora's colour module (aliases), `src/styles/tokens/tokens.ts` (the preset), `MIGRATION.md` (the wave's rows added to the chain's `## 11.0.0` section, §7), `CHANGELOG.md`, `package.json` (the version bump to 11.0.0; the chain adds `./aurora-config` per P3-R5 and re-points the scripts), `vitest.config.ts` (the chain's `include` takes `src/**/__tests__/*.test.ts` and `scripts/**/__tests__/*.test.ts`), the §5 gate paths of unlanded waves in `docs/tranches/BL/waves/*.md` (§3 step 11). New: `scripts/structure/**`, `tests/gates/{seal,floor}.test.ts`, `tests/harness/source.ts`. Deleted: `scripts/import-dag.mjs`, `scripts/lib/subpath-policy.mjs`, `scripts/regen-exports.mjs`, `tsconfig.build.json`, `src/components/index.ts`, `scripts/loops/structure/` if present. FLOOR.md's worktree recipe (`docs/tranches/BL/design/structure/floor/FLOOR.md`, P11-G3) links `<repo>/node_modules` alone: the checkout has no `tests-visual/node_modules`, and the root workspace hoists `tests-visual`'s dependencies (`@playwright/test`, `pngjs`) into `node_modules`.

## 5 · Acceptance gates

`<floor-lib>` is `docs/tranches/BL/design/structure/floor/lib/graph.mjs` at HEAD and `scripts/structure/lib/graph/index.mjs` after landing; `<surface>` is `floor/surface.mjs` at HEAD and `scripts/structure/surface.mjs` after. `<kit>` is `K13` (`scripts/loops/structure/pass-13/B-kit/` once W-C.1 has moved the loop's tooling). The "converged tree" column is read on `wt`. Appendices A-C hold the three probes; each lands as a test under `tests/gates/` reading the landed floor through its door.

| id | gate | passes when | HEAD reading | converged tree (`wt`) |
|---|---|---|---|---|
| D1-G1 · the seal (G-42) | `npx vitest run tests/gates/seal.test.ts` (the CLI: `node scripts/structure/seal/seal.mjs`) | 19 of 19 clauses at 0, exit 0; `seal.test.ts` all passed | **RED**: `tests/gates/seal.test.ts` absent; `K13`'s gate staged on the floor base exits 2, `Cannot find module …/scripts/structure/lib/index.mjs` (§2) | **GREEN**: the CLI exit 0, B0-B18 0, files 1,585, edges 8,350, modules 142/142; `seal.test.ts` 26 passed |
| D1-G2 · the floor | `node scripts/structure/gates.mjs` (in the suite as `tests/gates/floor.test.ts`) | four PASS | **RED**: `scripts/structure/` absent (module not found); at the floor base 4 PASS (F-1 7,435 edges, F-3, F-4, F-9 surface pin 0 differences) | **GREEN**: 4 PASS (F-1 8,350 edges 0 violations, F-3 69 export keys, F-4, F-9 0 differences) |
| D1-G3 · structure counts | `node <appendix A> . <floor-lib>` | VALUE-SCC 0 (over `src` and `scripts`), CROSS-JS 0, CROSS-CSS 0, DEAD-BARREL 0, ALIAS-TYPE 0; exit 0 | **RED** exit 1: `VALUE-SCC 4`, `CROSS-JS 11`, `CROSS-CSS 18`, `DEAD-BARREL 1`, `ALIAS-TYPE 6` | **RED** exit 1: `ALIAS-TYPE 5` (§3 step 5); `VALUE-SCC 0`, `CROSS-JS 0`, `CROSS-CSS 0`, `DEAD-BARREL 0` |
| D1-G4 · one door | `npm run build && node <appendix B> . <surface>` | `0 names on two or more entries` | **RED**: `41 names` (20 blob/blob-config, 8 fourier-field/fourier-math, 4 aurora/color, 4 dock/motion, 3 motion/motion-core, 2 axes/surface) | **RED**: `1 names` (`./axes + ./surface`, the `Surface` collision, §3 step 5) |
| D1-G5 · one name | `npm run build && node <appendix C> . <surface>` | 0 collisions | **RED**: `Surface: runtime on ./surface; type-only on . ./axes` | **RED**: the same line (§3 step 5) |
| D1-G6 · R-5 bounds | `mkdir -p .cache && node scripts/structure/bounds.mjs --json .cache/bounds.json && node -e 'const s=require("./.cache/bounds.json").summary;process.exit(s.dirsOver+s.filesOver?1:0)'` | exit 0 | **RED**: the floor's `bounds.mjs` at HEAD `dirsOver 18`, `filesOver 58`; at the floor base 18 and 55 | **GREEN**: `dirsOver 0`, `filesOver 0`, exit 0 |
| D1-G7 · no consumer preset | `npm run build && node -e 'import("./dist/tokens.js").then(m=>process.exit(["chartHeights","chartMargin","chartColors"].some(k=>k in m)?1:0))'` | exit 0 | **RED** exit 1 (all three present) | **RED** exit 1 (all three present, §3 step 7) |
| D1-G8 · one graph, one entry record | `! test -e scripts/import-dag.mjs && ! test -e scripts/lib/subpath-policy.mjs && ! test -e scripts/regen-exports.mjs && ! test -e scripts/loops/structure` | exit 0 | **RED**: all three scripts present | **GREEN** exit 0 (the chain deletes them) |
| D1-G9 · cascade, hold line | `node scripts/structure/cascade.mjs snapshot --root <base> --dist <base dist> --out .cache/cascade-base` at the floor base, then `node scripts/structure/cascade.mjs verify --baseline .cache/cascade-base --root . --dist dist --reorders <kit>/authored/p6-listed-reorders.json` at the wave | exit 0: every entry identical or its divergence a listed reorder, risks 0 | hold line: the floor base against its own snapshot exits 0, every entry `"identical": true` (`./styles.css` 365 rules); its four sequences equal `K13`'s committed baseline | **GREEN** exit 0 with the listed reorder, `unlistedRules 0`, `staleRules 0`, `SCOPE Timeline → TimelineMarks: 40 rule line(s) re-homed`; without `--reorders` exit 1, `RED: content changed` at the Timeline rule (the bite) |
| D1-G10 · inherited from W-C.2 | C2-G1 (no tranche meta) and C2-G4 (MIGRATION is a version list) over the landed tree | both exit 0 | owned by W-C.2, which lands first | over the chain's text (`<kit>/tools/wc2/chain-text.mjs --base <floor base> --route .`): `chain-text: GREEN`, META 0 added by the chain, chain headings not a bare version 0; `MIGRATION.md:8` `## 11.0.0` |

**Can each fail and pass?** D1-G1, G2, G3 (VALUE-SCC, CROSS-JS, CROSS-CSS, DEAD-BARREL), G6, G8 and G9 pass on the converged tree, so they can pass; each is RED at HEAD, G9 by its bite without the listed reorder. D1-G3's ALIAS-TYPE, D1-G4, G5 and G7 are RED on both trees: they pass when §3 steps 5 and 7 land. A fixture proves nothing more than a real tree here, so none is used. D1-G1's bite for the roster is §3 step 3's patch. D1-G6 duplicates B6 on purpose: `bounds.mjs` reports every zone's list, which the wave record keeps.

## 6 · π and DELTA obligations

The wave claims one visual thing: **no paint changes.** Every move and every CSS door keeps the painted result identical.

- **Cascade (D1-G9).** Value identity of every CSS entry the floor base carries (four at HEAD; three once W-G.7 has removed `./styles.css`) against the floor base's snapshot, with `K13`'s one listed reorder (Timeline → TimelineMarks, 40 rule lines, risks 0) as the only admitted divergence. Rule-count identity is not enough (S-28: 1,964 = 1,964 rules while a Chip's band strength changed).
- **Paired captures.** For every band the F-10 browser seat selects by the graph (P4-F4: every spec and route that reads a moved file, its classes or its paths), and at least the 18 components whose sheets change channel (§2: chip, dark-mode-toggle, dock, card, button, configurator, tabs segmented and drag, sheet, dialog, slider, metric, music-staff, scroll-progress-rim, deck, carousel, and the `_shared` feedback and menu partials): a screenshot of the story route at the base and at the wave, same viewport, DPR 1 and 2, `reducedMotion: reduce`, in light and dark, in Chromium and Playwright WebKit. The DELTA is the per-pair pixel diff image, and it must be empty over the component's box. Real Safari is **UNMEASURED** (the owner's `safaridriver` checkbox, `AllowRemoteAutomation => false` per PLAN's header); the wave record says so per cell.
- **Paired π.** On the Chip in both themes and both engines, the computed `--accent-band-strength` and `--accent-edge-strength` at the base and at the wave (cB-R9 measured 22 % and 25 % at HEAD against 18 % on a reordered tree, D1:1072). Each pair must be equal.
- **Browser signal.** Each band reports its base-green count; a band with no base-green spec says it has no browser signal (P4-F4, S-29), and its claim rests on the cascade and the π pair alone.

## 7 · MIGRATION rows (11.0.0, W-C.2's table form)

The chain writes `MIGRATION.md`'s `## 11.0.0` section, the bare version with no tranche id (P9-R2 (a); `MIGRATION.md:8` on `wt`): the names published on their owning entry (P4-R2, P5-R3), the one-symbol-one-entry removal rows (the `./blob` → `./blob-config`, `./fourier-field` → `./fourier-math`, `./motion` → `./motion-core`, `./aurora` → `./color`, `./dock` → `./motion`, `./surface` → `./axes` (`SurfaceTier`) and `./aurora` → `./aurora-config` moves) and the new `./aurora-config` entry (P3-R5). The wave adds the rows for its own edits (§3 steps 5 and 7) to that section, in the same table form:

| before | after | note |
|---|---|---|
| `type Surface` from `@mkbabb/glass-ui` or `@mkbabb/glass-ui/axes` (the decoration axis) | `type SurfaceDecoration` from the same entries | `Surface` now means the component only; atlas `src/editorial/story-card.ts:1` updates |
| `type SurfaceDecoration` from `@mkbabb/glass-ui/surface` | from `@mkbabb/glass-ui/axes` | one entry |
| `ProgressOrientation`, `ScrollProgressRimOrientation` | `Orientation` from `@mkbabb/glass-ui/axes` | one concept, one name |
| `SegmentedTabsActivation` | `TabActivation` from `@mkbabb/glass-ui/tabs` | as above |
| `AuroraHarmony` | `ColorHarmony` from `@mkbabb/glass-ui/color` | as above |
| `chartHeights`, `chartMargin`, `chartColors` from `@mkbabb/glass-ui/tokens` | removed, no successor | speedtest's chart geometry; the consumer owns its preset (speedtest addendum) |

## 8 · Dependencies

PLAN §5, the one record of edges, and the D1 gate (§0), met by the convergence record with the rulings D1 §P13-6.2 lists. What the wave needs in the tree when it lands: G-42's roster entry and R-1's register retired (P4-F1 makes that a floor precondition, D1:1333), the demeta detector and MIGRATION shape the landed text binds to, and the loop tooling's home. Waves of bands E-K that land before this wave are moved by its chain, which derives from the graph, so a later tree is re-planned, not hand-merged (PLAN §5 note).

## 9 · Ledger rows

Closes #62 W-COLOCATION (the disease row, `ledger/census-register-b.md:52`), #21 W-DAG-REDUCE's M02/M03 remainder (`ledger/census-register-a.md:34`; its `./blob-config` cut is F-66's, W-L.6), N-1's frontend half with its enforcement (G-42; `ledger/CENSUS.md:192`), E-1's one-symbol-one-door half (B9 and D1-G4/G5; `ledger/CENSUS.md:167`), #56's `deriveBlobPalette` item (closed by P3-R1(a), §3.10), L04-F20's measure (§3.8), and the F-55 to F-59 census rows (`ledger/CENSUS.md:127-131`). Answers W-B.2's O-48 and UIA-F-145 through the door rule and P4-R2, and W-B.8's DotRing directory through the placement.

## 10 · Gestalt passes (P-1)

Tranche fit: one law, one graph, one entry record, one seal; no second instrument survives (D1-G8). Wave: the paired captures and the cascade verdict show no paint moved. Feature: a reader opening any component directory finds its sub-components, composables, styles and tests inside it, one door at its root, and no file of it anywhere else (D1-G1 B1, B10, B16).

## Appendix A · the structure probe (`d1-probe.mjs`)

```js
// W-D.1 probe: the F-55..F-59 defects read over the floor's F-1 graph (the one graph W-D.1 lands).
// Independent of the seal's code: it restates four registry born-REDs as counts.
//   node d1-probe.mjs <root> <floor lib/graph.mjs>      one line per arm; exit 1 when any arm is over 0
// Arms:
//   VALUE-SCC      module SCCs over value edges in src and scripts (a module is a directory, kind
//                  slots composables/ styles/ __tests__/ folded into their owner)      [F-59, REG:1324, P9-R1]
//   CROSS-JS       src edges (import, import-type, reexport, dynamic) from outside a component dir
//                  into one of its files other than a door: the index.ts of the unit or of a
//                  module inside it, slots left out (LAW §5, "Sub-doors of an entry")  [F-56, F-58, F-59]
//   CROSS-CSS      src CSS edges (css-import, sfc-style-src) from outside a component dir into one
//                  of its sheets other than a door's index.css                          [F-56, F-57 L12-05]
//   DEAD-BARREL    src/components/index.ts present with no code reader                  [F-58 L12-10]
//   ALIAS-TYPE     `export type X = Y;` in src where Y is imported from inside the library (a second
//                  name for one type)                                                    [F-58 L10-20, E-1]
import { readFileSync } from "node:fs";
import { join, resolve, posix } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]);
const { buildGraph } = await import(pathToFileURL(resolve(process.argv[3])).href);
const g = buildGraph(root);
const own = (e) => e.to && e.from !== e.to && !/\/__tests__\//.test(e.from);
const E = g.edges.filter((e) => own(e) && e.from.startsWith("src/") && e.to.startsWith("src/"));
const CODE = /^(src|scripts)\//;
const EV = g.edges.filter((e) => own(e) && CODE.test(e.from) && CODE.test(e.to));

const VALUE = new Set(["import", "reexport", "reexport-star", "dynamic", "import-side-effect", "require"]);
const SLOT = new Set(["composables", "styles", "__tests__"]);
const mod = (f) => { let d = posix.dirname(f); while (SLOT.has(posix.basename(d)) && d.includes("/")) d = posix.dirname(d); return d; };
const adj = new Map();
for (const e of EV) { if (!VALUE.has(e.kind)) continue; const a = mod(e.from), b = mod(e.to); if (a === b) continue;
  if (!adj.has(a)) adj.set(a, new Set()); if (!adj.has(b)) adj.set(b, new Set()); adj.get(a).add(b); }
let n = 0; const I = new Map(), L = new Map(), on = new Set(), st = [], sccs = [];
const visit = (v) => { I.set(v, n); L.set(v, n++); st.push(v); on.add(v);
  for (const w of adj.get(v)) { if (!I.has(w)) { visit(w); L.set(v, Math.min(L.get(v), L.get(w))); } else if (on.has(w)) L.set(v, Math.min(L.get(v), I.get(w))); }
  if (L.get(v) === I.get(v)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== v); if (c.length > 1) sccs.push(c.sort()); } };
for (const v of adj.keys()) if (!I.has(v)) visit(v);

const unitOf = (f) => { const a = f.split("/"); return a[1] === "components" && a[2] !== "_shared" && a.length > 3 ? `src/components/${a[2]}` : null; };
const isDoor = (f, door) => posix.basename(f) === door && !posix.dirname(f).split("/").some((s) => SLOT.has(s));
const crossing = (kinds, door) => E.filter((e) => kinds.has(e.kind)).filter((e) => {
  const u = unitOf(e.to); if (!u || unitOf(e.from) === u) return false;
  return !isDoor(e.to, door); });
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

HEAD (`head`, graph from `docs/tranches/BL/design/structure/floor/lib/graph.mjs`), exit 1:

```
FAIL VALUE-SCC 4 :: [17] src/components/_shared, src/components/_shared/overlay, src/components/dock, src/components/menu, src/components/select, src/components/tabs, src/composables/glass, … | [2] scripts, scripts/lib | [2] src/components/dialog, src/components/sheet | [3] src/components/fourier-field, src/components/fourier-field/renderer, src/components/fourier-field/shaders
FAIL CROSS-JS 11 :: src/components/_shared/overlay/participation.ts:14 -> src/components/dock/composables/dockContext.ts; …
FAIL CROSS-CSS 18 :: src/styles/glass.css:68 -> src/components/chip/accent-tone.css; src/styles/index.css:207 -> …
FAIL DEAD-BARREL 1 :: src/components/index.ts present=true
FAIL ALIAS-TYPE 6 :: src/components/aurora/composables/color.ts: AuroraHarmony = ColorHarmony; …
```

The converged tree (`wt`, graph from `scripts/structure/lib/graph/index.mjs`), exit 1:

```
PASS VALUE-SCC 0 :: 
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

HEAD: `one-door: 41 names on two or more entries` / `3 ./motion + ./motion-core` / `4 ./dock + ./motion` / `2 ./axes + ./surface` / `20 ./blob + ./blob-config` / `4 ./aurora + ./color` / `8 ./fourier-field + ./fourier-math`, exit 1. The converged tree: `one-door: 1 names on two or more entries` / `1 ./axes + ./surface`, exit 1.

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

HEAD and the converged tree, each exit 1: `one-name: 1 names denote a runtime symbol on one entry and a type on another` / `Surface: runtime on ./surface; type-only on . ./axes`.
