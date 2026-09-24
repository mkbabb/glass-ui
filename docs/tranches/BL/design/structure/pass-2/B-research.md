# D1-B · pass 2 research — sealed modules, one door each

Seat: research, route D1-B (B-pkg banked as substrate variant). Model: claude-opus-5-5 (asserted from own identity).
Read: RULINGS.md, REGISTRY.md §2 D1-B / §3 / §4 / §6.1-6.4 (B rows), pass-1 D1-B.md, D1-B-proto.md, D1-B-critique.md, SPECS.md §0 / §D1-B / shared facts, CHARTER tail. No D′ or G material was read.

Every number below comes from a command run in this seat, on a detached worktree of HEAD (35d3061e at start, d41b974f at close; `git diff` over `src demo scripts tests tests-visual package.json vite*.ts` between them is 0 lines). The worktree is removed. Tools and logs stay in the scratchpad (§12). Nothing in the checkout was written except this file.

---

## 0 · Verdicts

1. **B-flat, not B-families.** Families add 9 doors, 33 dir moves (339 files edited) and 19 further F-7 moves, and 5 of the 9 family doors export nothing. Bytes, surface and boot are identical between the two arms. `forms` vs `fields`+`binary` is moot. (§6)
2. **The seal closes on `src/` with placement run first.** On the migrated tree (flatQ): B1 0, B5 0, B8 0, B10 0 (api arm), 0 `src/` dirs over 12 files, 121 of 122 required modules sealed. Build, both vue-tsc programs, and the CSS rule order all hold. Sealing without placement costs +36,280 B across the subpaths (§8.3).
3. **R-2 as written is unbuildable against R-9 and the acceptance bar.** Literal R-2 moves 17 component SFCs out of their own component, including `Skeleton.vue → data-table` (R-9 says the generic Skeleton is its own unit). Measured arms: literal 53 rows at HEAD / 28 on flatQ; SFC-anchored 36 / 11; door-anchored 22 / 0. The ruling needed: *a file its own unit's door publishes stays in that unit.* (§5)
4. **Leaf doors (G12): one new leaf entry, `./aurora-config`, puts the boot graph under the ceiling with the seal intact.** Doors-only is 685,510 B (over by 181,702). With the leaf it is 477,899 B (under by 25,909). The async Aurora chunk is 208,151 B, against 207.96 kB at HEAD. `./blob-config` is the HEAD precedent. The leaf is +1 export key and needs a ruling. (§8)
5. **The carve has authored names.** 27 dirs are built and measured, 4 placeholder dirs are dissolved, and the style kernel carve keeps the cascade order. The pass-1 placeholder names are all replaced. (§7)
6. **Convergence: about 60%**, up from 40%. The `src/` seal is nearly closed. The harness side (B0 505, B2 733, 37 failing tests), the R-2 and R-6 reconciliations, B3 (24) and the 16 over-long files are what remain. (§11)

---

## 1 · The gate: `seal.mjs`, clauses B0-B12 over F-1

One file, 267 lines, over the floor's F-1 graph (`lib/graph.mjs`, fail-closed, every S-4 edge kind), F-7 placement (`lib/placement.mjs`) and symbol origins (`lib/symbols.mjs`). Clauses judge the resolved file, never the specifier. There is no comment opt-out anywhere. Full source: Appendix A.

**Declarations (one place):**
- sealed zones `src`, `scripts`
- containers `src`, `src/components`, `src/composables`, `scripts`
- kind slots `composables/`, `styles/`, `__tests__/` (R-3, R-4, R-5)
- doors `index.ts`, `index.mjs` (scripts), `index.css`
- harness `tests/harness/` (R-3)
- aggregates `src/index.ts`, `src/styles/index.css` (R-7)
- kernel `src/composables/**`, `src/styles/**`, `src/components/_shared/**`
- generated-file exemption only through `floor/records/generated.json`

| clause | rule | HEAD | flatP | famP | **flatQ** |
|---|---|---:|---:|---:|---:|
| B0 | F-1 violations; walks (scan, glob, dir reads) into a sealed zone from outside the harness; computed-path reads in tests, tests-visual, scripts | 502 | 505 | 538 | **505** |
| B1 | V2 recursive door: from outside M, only M's door or a published entry; a member never imports its own door | 382 | 40 | 40 | **0** |
| B2 | consumer zones into `src` hit published entries only (R-10, R-3) | 731 | 733 | 733 | **733** |
| B3 | a CSS crossing targets `M/index.css` or a published CSS entry | 26 | 26 | 26 | **24** |
| B4 | no value or type cycle among sibling nodes at any depth (loose-file-only same-dir cycles are info) | 3 | 4 | 4 | **2** |
| B5 | no door in a kind slot, no dir inside a kind slot | 5 | 3 | 3 | **0** |
| B6 | >12 direct files (slots not counted, but a slot is itself bounded) or >500 lines, all five zones, tests counted | 75 | 74 | 74 | **65** |
| B7 | every code dir in a sealed zone is a module, a slot or a container; script code needs the JS door, not only a CSS one | 32 | 6* | 6* | **1** |
| B8 | kernel reads no unit (type-only and re-exports included; aggregates excepted); `src` reads no consumer zone | 3 | 2 | 2 | **0** |
| B9 | a door re-exports only its own subtree; a symbol sits on one non-root entry | 59 | 65 | 65 | **64** |
| B10 | F-7 over R-2 units, doors not readers (api arm shown; §5 for the other arms) | 22 | 0 | 19 | **0** |
| B11 | door names match the pin; internal-door names with no outside reader; empty doors | 12 | 14 | 19 | **10** |
| B12 | only a door re-exports (no relays); no declaration mirror | 24 | 12 | 12 | **12** |
| | modules sealed / required | 70/101 | 92/98 | 101/107 | **121/122** |

\* flatP and famP were measured before the per-channel B7 clause was added. That clause adds `src/styles/` on both arms (TS behind a CSS-only door).

Arms: flatP = placement + doors. famP = flatP + the family-dir move. flatQ = flatP + authored carves + style kernel carve + one uniform-table cut (§7). `--virtual` at HEAD, which judges every required dir as if it already had its door, gives B1 498, B3 87 and B4 4.

---

## 2 · G1-G19: rule, gate code, measured check

"HEAD → flatQ" is the clause count on each tree.

| gap | rule text | gate code | measured check |
|---|---|---|---|
| G1 · S2 door-to-door re-exports | A door re-exports only files inside its own subtree. | B9a: `reexport*` edge from a door (or a published entry) whose target is not `under(dirOf(door))` | 19 → 18 at HEAD → flatQ. Mostly unit doors re-exporting `_shared` or `composables/*` (e.g. `command/index.ts → _shared`, `dock/index.ts → composables/motion`). Cure: each name keeps one owning door (R-6); the unit door drops it. Owed with the R-6 rows |
| G2 · S7 as a rank edge | Any kernel → unit edge fails, type-only and re-exports included. Aggregates are doors, not readers. | B8a over every reachable edge with `KERNEL(from) && UNIT_FILE(to)`, `AGGREGATES` excepted | 3 → 0. The cures: F-8's M02 `OverlayHost` row; M03 roving move; `glass.css → chip/accent-tone.css` placed into `src/styles/glass/` (its one reader); the overlay door's `isTeleportedTarget` re-export dropped (0 importers through it; F-7 placed the file in dock). Plants C-1b, C-2 and C-14 are caught |
| G3 · no placement clause | A file lives in the unit that reads it: by symbol, through barrels. A door is not a reader. | B10: F-7 `placeAll(dirUnits())` rows of class move/global, per `--anchor` arm | HEAD 53/36/22 (none/vue/api) → flatQ 28/11/0. §5 has the fixpoint. The 4 kernel single-owner files are in its move list. The 3 aurora-only family-level files do not exist under B-flat |
| G4 · opt-in seal | The seal is mandatory. Every code dir in `src/` and `scripts/` is a module, a kind slot or a container. A dir with script code needs its JS door. | B7 over `sealedCodeDirs` (derived from the tree, not declared). Per-channel check added this pass | 32 → 1. The one left is `scripts/lib/`, which was not built (§9.3). 32 mandatory `index.ts` doors were created, then grown by the doors phase |
| G5 · R6 skips zones and tests | R-5 applies in all five zones, with tests counted. A kind slot does not count toward its parent but is itself bounded. | B6 over `ZONES5`. `--slot-arm literal` is kept only as a measuring arm | HEAD 75 (18 dirs + 57 files) → flatQ 65 (9 dirs + 56 files). Over-bound `src/` dirs go 9 → 0. The 9 dirs left are demo 2, tests 6, tests-visual 1, and R-3 dissolves the tests dirs (§9.1) |
| G6 · `@generated` opt-out | No comment opt-out. A generated file is exempt only if listed in `records/generated.json` with a checked generator. | `GENERATED` is read from the record only. No source text is consulted | 0 `@generated` markers at HEAD. `src/index.ts` (585 lines, 31 multi-line export blocks) is the one candidate: generate it from F-3 as a checked file |
| G7 · tracer misses | Non-literal `import()`, fs and `new URL` reads, `src → demo`, and CSS into door-less dirs all fail. | B0 counts F-1 violations, walks and computed-path census reads. B8b covers `src →` a consumer zone. B3 + B7 cover CSS into door-less dirs | B0 502 at HEAD: 0 F-1 violations, 168 walks, 334 computed reads, over 90 files. 1 false positive: the `"src"` literal in `auroraImageSource.ts`, which F-1 reads as a dir. Plant C-8 (template-literal `import()` into a private dir) lands in B0, not B2 |
| G8 · door growth unpinned | Every door's name set is pinned, so growth or loss is a reviewed diff. | B11a `--pin/--write-pin`, plus B11b (an internal-door name with no reader outside its module) and empty doors | HEAD pin: 69 doors, 967 names. flatQ: 101 doors, 1,289 names. B11b goes 12 → 10: 8 type names on the `_shared/overlay` door, 2 on `composables/context`. Plant N-1 is caught only by the pin |
| G9 · lexical carve, placeholder names | Dir names come from what the dir holds, authored. No `part-N`, no leading-token names. | none (a naming law is not machine-checkable here). B6 forces the carve | §7: 27 authored dirs built, 4 dissolved, 0 placeholders |
| G10 · shims and relays | Only a door re-exports. No `.d.mts` mirror of a module. | B12 | 24 → 12: 11 relay lines in 7 files, plus `scripts/lib/minify-css.d.mts`. The cure (importers rewired to origin, relay line deleted) was not built. The 5 `composables/glass` relays hold `createCanvasLifecycle` types for the webgl/webgpu doors, and cutting them turns them into B9a lines unless R-6 settles the owner |
| G11 · masked style-fold fallback | The cascade order is an invariant, verified on flattened dist output. `accessibility.css` stays the terminal. | out of the gate, in the F-4 verifier. This seat used `cssflat2.mjs` + `cssdiff.mjs` | flatP, famP and flatQ: `./styles` 1,935 rules, `./styles.css` (`dist/component-styles.css`) 364 rules and `glass-ui.css` 343 rules. Order is identical to HEAD once Vue scope hashes are normalized (§10.3). `accessibility.css` did not move |
| G12 · leaf doors vs splitting | A deliberate async boundary imports a public subpath dynamically. Anything eager on the boot path uses a leaf entry. | B2 (the demo is a consumer zone) + boot-graph measure | §8: doors-only 685,510 B; with the `./aurora-config` leaf 477,899 B, under 503,808 |
| G13 · failing tests | Every failure falls in a named, ruled class, and 0 suites go uncollected. | none (the `vitest` run) | HEAD built: 2,324 tests, 0 failed. flatQ: 37 failed in 18 files, plus 2 suites uncollected, in 4 classes (§10.2). Pass 1 had 111 |
| G14 · files over 500 lines | An SFC splits by extracting sub-components and composables. A TS file splits by concern. CSS splits into a module with an `index.css` door in cascade order. | B6 | `src/` 17 → 16. The per-file split plan is §7.3; it is authored, not built |
| G15 · family table ×3 | none: no families | — | §6 |
| G16 · kernel taxonomy copied into families | Kernel code stays in the kernel. A unit holds only what F-7 places there. | B10 + B8 | B-flat: 0 kernel paths copied. famP: F-7 wants 19 more moves under the families |
| G17 · empty family doors | A door exporting nothing fails. | B11 `exports nothing` | famP: 5 of 9 family doors are empty (pager, binary, fields, overlay, surfaces). flatQ: 0 |
| G18 · backend | The same law applies to backend trees. | the same gate with `SEALED` set per repo | value.js regex census (read-only): 115 files, 0 module doors, 17 cross-module deep specifiers (admin→palette 9, admin→session 5, admin→color 2, session→palette 1), 110 module→platform. That is 127 edges born red. Not F-1 |
| G19 · no paint check | π on every band whose cascade changed | none | Not run: no browser seat (chrome-devtools and playwright MCP did not connect). The CSS order invariant is the proxy. π is owed on the dock, whose CSS carve changed file boundaries but not order |

---

## 3 · Plant battery

37 plants run as in-memory overlays at HEAD: P1-P13 (the prototype's), C-1..C-16 plus C-1b (B-crit's intents, re-written from the critique text; the critic's own battery was not read) and N-1..N-7 (new: pin growth, `readdirSync("src/components")`, a door-less sub-dir, a dir in a slot, a second-entry symbol, and others).

- **37/37 raise a violation line naming the planted edge. 35/37 land in the expected clause.**
- P10 (value cycle: kernel `_shared` imports the dock door) lands in B8, not B4. The kernel → unit rank edge fires first; the cycle is then already red.
- C-8 (template-literal dynamic import from the demo) lands in B0, not B2. F-1 cannot resolve it, so it is an opaque-import violation.
- Other routings: C-6 → B7, C-7 → B6, C-4/C-5 → B10 (api arm), C-9 → B2, C-10 → B8, C-11 → B3.

F-9 caveat: the battery is not independent. It was written by the seat that wrote the gate. It counts as a regression battery, not as the critic's intent battery.

---

## 4 · The migration pipeline (flatQ), all through F-2

1. `reset` → F-8 rows m02 (overlay host inversion) and m03 (roving move).
2. F-7 fixpoint: `flat-place-{1,1b,2,3}.json`, 28 move rows over 3 passes, 26 distinct files (§5.2).
3. Module carve: `flat-carve.json`, 62 moves. 88 files edited, 209 rewrites, 0 residue, 0 lost, 0 violations.
4. `patch-flatQ.mjs`: the one code cut. The aurora uniform table (`UNIFORM_NAMES`, `UniformName`, `UniformLocations`, 71 lines) leaves `webgl/glSetup.ts` for `composables/uniformBridge.ts`, which cures a `webgl ↔ composables` type cycle. It also drops the overlay door's unread `isTeleportedTarget` line.
5. Dock CSS carve: `flat-css.json` (15 moves; 15 files, 44 rewrites, 0/0/0), then `css-dock.mjs` writes the module CSS doors (§7.1).
6. Style kernel carve: `style-carve2.mjs` (156 rewrites, 3 residues), then `flat-style-doors.json`: `tokens.ts → tokens/index.ts`, `theme.css → theme/index.css`, `chip/accent-tone.css → styles/glass/`. 7 files, 11 rewrites, 2 residues. The `./styles/theme` target in `package.json` and `subpath-policy.mjs` follows its door; the key is unchanged.
7. doorify:
   - kernel phase: 13 split, 27 stripped
   - empty kernel doors removed (1: `composables/search`)
   - 32 mandatory `index.ts` doors
   - kindslot, owndoor
   - doors phase: 451 rerouted, 43 doors grown, 359 names, 0 collisions, converged in 2 passes
   - 1 duplicate door export removed
8. `npm run build` exits 0.

**Fix made this pass in the pass-1 migrator.** `lib.mjs` `KIND` treated `constants/`, `shaders/` and `utils/` as kind slots. R-5's slot set is `composables/ styles/ __tests__/`. The stale set is why flatP kept B1 40, in `aurora/constants`, `blob/shaders` and `typewriter/utils`. With the set corrected, those dirs are modules (`blob/shaders`) or dissolved (the other two).

F-2 couplings met, all in the harness class:
- a scan-shrink residue in `engage-ladder.test.ts`
- a lost `@source` path in `demo/demo.css`
- an absence assertion in `easing.contract.test.ts` that `easing/composables/` does not exist, which forced `useClipboard` to the easing root instead of its slot

---

## 5 · Placement under R-2

### 5.1 R-2 as written, and the arms

F-7 at HEAD, `src` zone: 545 files. 309 ok, 181 published, 39 move, 14 global, 2 unread (`useScrollScene`, `springProjection`: R-8 deletion candidates unless exported).

| arm | rule | HEAD rows | flatQ rows |
|---|---|---:|---:|
| none | R-2 literal: a file read by one unit lives there, published or not | 53 | 28 |
| vue | a component unit's door-exported SFCs stay | 36 | 11 |
| api | every file its own component unit's door re-exports stays; kernel doors anchor nothing | 22 | **0** |

The literal arm moves 17 component SFCs out of their own component dir:
- `Dialog`, `DialogContent` → command
- `ExpandableContainer`, `FadingScroll` → configurator
- `Input`, `Switch` → labeled-field
- `DropdownMenuTrigger` → dock/controls
- `Skeleton` → data-table
- `Surface` → card
- `Table`, `TableBody`, `TableEmpty`, `TableHead`, `TableHeader` → data-table
- `TableCell`, `TableRow` → global
- `SegmentedTabs` → easing

It also sends prop-type files to global (`input/types`, `slider/types`, `tabs/types`), and the deck state (`useDeck`, `useDeckSnap`, `slideContext`, `types`) to global because `carousel` reads it.

**Finding (R-2 unbuildable as written).** The literal rule contradicts R-9 (`Skeleton` is its own unit). It also contradicts the shared acceptance bar ("a component file moved out of its component without a named reason"), and it hollows published components (`./table`'s parts would live in data-table). The api arm reaches 0 and keeps every published component home.

**Amendment the measurements support:** *placement is by readers; a file its own unit's door publishes is anchored in that unit (the door anchors, it does not read); kernel doors anchor nothing.* This keeps R-2's "a door is not a reader" for the kernel, which is where the 26 fixpoint moves came from.

### 5.2 The fixpoint (api arm), 3 passes, 26 files + the F-8 roving move

19 land in component units:
- `useClipboard` → easing/
- `useDragVelocity` → slider/composables
- `useCanvas2D`, `useRoutePointer` → constellation/composables
- `useScrollProgress` → aurora/composables
- `useFuzzySearch`, `match`, `searchTypes`, `useScrollChrome`, `useDockSearch` → dock/search
- `useGlassBackdropLuminance`, `backdropLuminanceSample`, `backdropSampleMath`, `useYieldToMain`, `useRAFLoop` → dock/legibility
- `isTeleportedTarget` → dock/composables
- `ModalOverlay.vue` → `_shared/overlay`
- fourier `compute/render.wgsl` → fourier-field/renderer
- kernel `flow.glsl/.wgsl` → aurora (renamed `curlNoise.glsl/.wgsl` against aurora's own `flow.glsl`)

The rest stay in the kernel, re-homed:
- `budget.ts` → `composables/glass/renderBudget.ts`
- `createCanvasLifecycle` → `composables/glass/`
- `useDocumentVisibility` → `motion/core`
- `useViewTransition` → `motion/route`
- `useElementMorph` → `motion/`
- `useTimer` → `dom`

Cost: 25 published name-slots leave kernel entries (`./motion-core` −15, `./dom` −10) and 36 land on unit entries (§10.4). That is 25 R-6-style removal rows.

**Finding (F-7 input).** Placing a file at the LCA of its readers can create a cycle when the file reads its old sibling module. `createCanvasLifecycle` moved up to `composables/glass/` while still reading `webgl/backingSize` and `webgl/visibility`. B4 caught it, not B10. The cure is the same LCA law run *within* the kernel: both helpers move up (readers: lifecycle, webgl, webgpu). This is A's within-module law (REGISTRY §3 names it as F-7's clause). F-7 today places only between units and global.

---

## 6 · B-flat vs B-families (same pipeline stage: flatP vs famP)

| measure | B-flat (flatP) | B-families (famP) |
|---|---|---|
| extra dir moves | 0 | 33 (339 files edited, 932 rewrites, 1 residue, 1 lost, 1 violation) |
| F-7 after the move | 0 (api) | 19 more moves (kernel `_shared/disclosure`, field, menu, overlay, `glass/procedural`, `renderBudget`, `compile`, `useGpuSubstrate`, `useLeadTrail`, pointer fields, `useSpringMount` → family dirs) |
| family doors | — | 9, of which 5 export nothing |
| modules / required | 92 / 98 | 101 / 107 |
| doors phase | 423 rerouted, 30 doors, 301 names | 429 rerouted, 34 doors, 332 names |
| internal doors / names | 34 / 591 | 43 / 622 |
| published diff vs HEAD | +37 / −25 | +37 / −25 (the same rows) |
| subpath bytes (sum, 63) | 322,905 (+1,936) | 322,975 (+2,006) |
| demo eager, doors only / with leaf | 685,526 / 477,916 | 685,522 / 477,916 |
| CSS order | identical (normalized) | identical (normalized) |
| seal | B10 0, B11 14 | B10 19, B11 19, B0 +33 (more walk targets) |

Families buy nothing measurable and cost a move wave plus a second placement round. **Drop families.** The unit set is then the component dirs (R-2's own unit), sealed recursively, with the kernel beneath.

---

## 7 · The carve: authored names

### 7.1 Built and measured on flatQ (27 dirs)

**aurora.** `constants/` and `constants/shaders/` are dissolved.

| dir | holds |
|---|---|
| `aurora/` root | `Aurora.vue`, `index.ts`, `presets.ts`, `renderMode.ts`, `DESIGN.md`, `README.md` |
| `aurora/atoms/` | `atoms`, `atoms-fields` |
| `aurora/webgl/` | `glSetup`, `aurora.vert`, `aurora-image.frag` |
| `aurora/webgl/palette/` | the palette program `aurora.frag` and the 9 chunks it splices: `brush`, `composition`, `curlNoise`, `flow`, `mediums`, `metal-medium`, `oil-modes`, `tonemap`, `vangogh-medium` |
| `aurora/webgpu/` | `wgpuSetup`, `uniformBridgeWGPU`, `uniformBridgeWGPUImage`, `aurora.wgsl`, `aurora-image.wgsl`, `aurora-mediums.wgsl`, `curlNoise.wgsl` |
| `aurora/composables/` | 11 shared files: `frameLoop`, `uniformBridge` (now owner of the uniform table), `textureUpload`, `runtime`, `useAurora`, `configSource`, `color`, `auroraImageSource`, `auroraFallbackGround`, `useCursorInteraction`, `useScrollProgress` |

The names follow `AuroraSource = "palette" | "image"` and the two backends. A's lexical carve named 0 of aurora's 2 backends (REGISTRY §5); this carve names both.

**dock.** Five feature modules; the root keeps `GlassDock.vue`, `DockSeparator.vue`, `constants.ts`, `index.ts`, `index.css`, `README.md`.

| dir | holds |
|---|---|
| `dock/search/` | `useDockSearch`, `useFuzzySearch`, `match`, `searchTypes`, `useScrollChrome`, `search.css` |
| `dock/legibility/` | `useGlassBackdropLuminance`, `backdropLuminanceSample`, `backdropSampleMath`, `useYieldToMain`, `useRAFLoop`, `adaptive-legibility.css` |
| `dock/morph/` | `useDockMorph`, `dockMorphMeasure` |
| `dock/layers/` | `DockLayer`, `DockLayerGroup`, `DockCrossfade`, `dockCrossfadeContext`, `dockSwitcherContext`, `layers.css`, `layer-group.css`, `crossfade.css` |
| `dock/controls/` | `DockControl`, `DockTrigger`, `DockBackgroundToggle`, `icon-button.css`, `tab-button.css`, `triggers.css`, `touch-floor.css` |
| `dock/composables/` | 8 files: `dockContext`, `isTeleportedTarget`, `useDockClickIntegrity`, `useDockHold`, `useDockRun`, `useDockShellProps`, `useDockState`, `useDockSpring` |
| `dock/styles/` | 9 files: `core`, `dock`, `morph`, `shape`, `density`, `run`, `cta-seat`, `shell`, `shell-regions` |

`dock/styles/index.css` becomes the dock door `dock/index.css`. Its trailing rules become `styles/core.css`, imported last. The controls door, which `src/styles/index.css` imported directly after the dock door at HEAD, now imports behind `core.css`. That keeps the order and clears the B3 crossing and the B5 door-in-slot.

`useDockSpring` stays in the slot: its readers are the dock root and `layers/`, so their LCA is dock. Putting it in `morph/` was an authoring error that the literal arm reported.

The morph CSS (`morph.css` at import position 56, `shape.css` at 59, `cta-seat.css` at 80) interleaves with density, layers and run, so it cannot join `dock/morph/` without reordering the cascade. It stays in `dock/styles/`, and that is a π-gated choice.

**menu.**
- `menu/sub/`: `DropdownMenuSub`, `SubContent`, `SubTrigger`
- `menu/items/`: `Item`, `CheckboxItem`, `RadioGroup`, `RadioItem`, `Label`, `Separator`, `Shortcut`, `Group`
- the root keeps `DropdownMenu`, `Content`, `Trigger`, `context.ts`

**sortable-list.** `drag/` holds `drag`, `ghost`, `motion`. `resolve.ts` stays at the root because the root and `drag/` both read it.

**typewriter.** `utils/` is dissolved into the root, which then holds 8 files.

**src/styles.** 15 modules plus 4 aggregators moved in as doors (unchanged from the HEAD-only carve):
- `glass/`:
  - `material`: material, veil, ladder, ladder-undershadow
  - `engage`: rim, grasp, focus-veil
  - `surfaces`: surfaces, surfaces-pager, control-surfaces, control-bit, control-edge
  - `shapes`: glass-capsule, glass-chip, glass-atom, mark, liquid-fill, value-marks, track-flow
  - `plates`: surface-axis, overlay-plate
  - `transitions`: reveal, liquid-enter, dissolve
  - `decoration`: deep, defined, squircle
- `tokens/`:
  - `motion`: scheme-motion, scheme-spring, motion-registers
  - `surface`: color-radius, shadow, glass, glass-fx, glass-deep, on-glass-fg
  - `sizing`: offsets, sizing, sizing-config, scale-paper, scroll-tokens
  - `scheme`: light-dark, dark-arm, dark-arm-glass
  - `properties`: property-regs, property-regs-specular
- `styles/` root:
  - `surface`: track-well, glass-specular-track, paper
  - `motion`: transitions, animations, viz-reveal
  - `scroll`: scroll-driven, scroll-choreography
- `a11y-fallback.css` → `src/styles/` (its one reader is `accessibility.css`)
- `glass.css`, `tokens.css`, `typography.css`, `utilities.css` → `<dir>/index.css`
- `theme.css` → `theme/index.css` (the export target follows; the key does not change)
- `tokens.ts` → `tokens/index.ts`

`accessibility.css` stays in place, as the cascade terminal and the style-fold anchor.

**composables/glass.** `backingSize`, `visibility` move from `webgl/` up to `glass/` (§5.2 cycle cure).

**Pass-1 placeholders, all replaced:**

| pass 1 | now |
|---|---|
| `dock/styles/{shell,run}` | the dock modules above; `shell*.css` and `run.css` stay in the slot |
| `aurora/composables/{uniform,atoms}` | `aurora/atoms/`; the uniform table in `uniformBridge.ts` |
| `aurora/constants/shaders/aurora` | dissolved; `webgl/`, `webgl/palette/`, `webgpu/` |
| `src/styles/{scroll,glass-group,part-1}` | `styles/{surface,motion,scroll}`; `glass/index.css`; `a11y-fallback.css` at root |
| `src/styles/glass/{control,glass,ladder,liquid,surfaces,part-1}` | `glass/{material,engage,surfaces,shapes,plates,transitions,decoration}` |
| `src/styles/tokens/{glass,dark,property,scheme,sizing}` | `tokens/{motion,surface,sizing,scheme,properties}` |

### 7.2 Authored, not built (demo zone)

- `demo/stories/containers/` (13 files) → `containers/disclosure/`: accordion, collapsible, expandable-container.
- `demo/stories/foundations/` (13 files) → `foundations/surfaces/`: paper-glass, paper-texture, surface-tints, shadows, overlays-scrims.
- `demo/stories/manifest.ts` (1,099 lines) → one manifest per category (`manifest/<category>.ts`) or a checked generated file.

Story ids are keyed in the manifest, so these moves go with the manifest split.

### 7.3 G14: the 16 `src` files over 500 lines on flatQ, split plan (authored, not built)

| file | lines | split |
|---|---:|---|
| `timeline/Timeline.vue` | 724 | `TimelineMark.vue` + `useTimelineTravel.ts` |
| `sortable-list/drag/drag.ts` | 632 | `createDragController` is one closure; split by phase into `drag/{controller,propose,commit,vacancy}.ts` |
| `easing/EasingPicker.vue` | 627 | `EasingHandleOverlay.vue` + `EasingReadout.vue` |
| `pager-dots/PagerDots.vue` | 607 | `usePagerRoving.ts` + `usePagerWindow.ts` |
| `music-staff/staffGeometry.ts` | 607 | `pitch.ts` (`spell`, `staffPos`, `rhythmOf`, `advanceOf`, `METRICS`) + `engrave.ts` (`engraveMusicStaff`, its types; 345 lines) + `loadingMotif.ts` |
| `dock/styles/run.css` | 600 | `run/lattice.css` + `run/platform.css` behind `run/index.css` |
| `sheet/styles.css` | 579 | `sheet/styles/{detent,root}.css` behind `sheet/index.css` (split at "THE DETENT IS A SIZE" / "THE DETENTED ROOT") |
| `aurora/presets.ts` | 552 | `config/` (types + `DEFAULT_AURORA_CONFIG`, the leaf, §8) + root `presets.ts` (limits, drift floor, instance API) |
| `configurator/styles.css` | 551 | `styles/{shell,gallery}.css` behind `configurator/index.css` |
| `dock/GlassDock.vue` | 546 | `useDockGrasp.ts` + `useDockLayers.ts` |
| `blob/shaders/metaball.frag.ts` | 531 | interpolated chunks `field`, `surface`, `palette`, `main` |
| `blob/shaders/metaball.wgsl.ts` | 529 | the same four chunks |
| `aurora/composables/runtime.ts` | 528 | `runtimeOptions.ts` (mode, suspend, init strategy, presentation) + `runtime.ts` (`createAurora`) |
| `dock/styles/shell.css` | 528 | `shell/{frame,axis}.css` behind the dock door, contiguous |
| `composables/glass/webgpu/useWebGPUCanvas.ts` | 518 | `sharedDevice.ts` (`supportsWebGPU`, `acquireSharedDevice`, test reset) + `useWebGPUCanvas.ts` |
| `slider/styles.css` | 507 | `styles/{track,spectrum,motion}.css` behind `slider/index.css` |

`src/index.ts` left the list because the doors phase rewrote its 31 multi-line export blocks as single lines. That is a formatting effect, not a split. The plan stays: generate it from F-3 as a checked file (G6).

Non-src over-500 files at HEAD:
- scripts: 7
- demo: 8
- tests: 19
- tests-visual: 6

Scripts: `verify-export-types` 1,080, `profile-bundle` 939, `gate-register` 740 (retires under R-1), `comment-census` 726, `import-dag` 629, `paint-arm` 587, `reflect-capture-verify` 584. Tests split with their subject under R-3 or stay whole-library suites.

---

## 8 · Leaf doors (G12)

R-10 as written (`AppShell` → `import("@mkbabb/glass-ui/aurora")`, every other demo edge on a door):

| tree | eager boot bytes | vs 503,808 |
|---|---:|---|
| HEAD (leaf deep imports, 62 modulepreloads) | 477,733 | under |
| flatP / famP / flatQ doors only | 685,526 / 685,522 / 685,510 | **over by ~181.7 KB** |
| flatP / famP / flatQ + `./aurora-config` leaf | 477,916 / 477,916 / 477,899 | **under by 25,909** (flatQ) |

The cause: the demo's eager `AppShell` and `aurora-hero` read `auroraFallbackGround` and `DEFAULT_AURORA_CONFIG`. Through the `./aurora` barrel these drag `Aurora.vue` and the renderer into the boot graph.

The construction:
- a leaf entry `@mkbabb/glass-ui/aurora-config` carrying `DEFAULT_AURORA_CONFIG`, `AuroraConfig` and `auroraFallbackGround`
- `AppShell`'s async boundary keeps `import("@mkbabb/glass-ui/aurora")`

Measured on flatQ with that construction:
- the async Aurora chunk is 208,151 B (HEAD 207.96 kB)
- other chunks: a second aurora chunk of 59,691 B, 2,007 B aurora-hero, 6,118 B `auroraFallbackGround`
- `vue-tsc` on the doors-only tree: 0 errors in both programs
- with the leaf, 9 errors (7 lib, 2 test), all TS2307/TS7006 from the subpath not yet registered in `exports`, `typesVersions` and tsconfig `paths`

**Seal-clean form.** The measured leaf is a door that re-exports `../presets` and `../composables/auroraFallbackGround`, so B9a would flag it twice. The seal-clean form is the `presets.ts` split from §7.3: `aurora/config/` holds the config types, `DEFAULT_AURORA_CONFIG` and `auroraFallbackGround`, and its `index.ts` is the published door. The three names leave `./aurora` (R-6: 3 removal rows). Bytes for that form are not measured. It pulls a subset of what the measured form pulls, so 477,899 B is its expected ceiling.

`./blob-config` is the HEAD precedent for a config leaf beside a heavy component entry.

Owed: the ruling for +1 export key (68 → 69).

---

## 9 · Tests, demo, scripts

### 9.1 R-3 projection (HEAD, by F-7 subject)

416 test and spec files:
- **160 colocate:** 143 into src units, 9 into scripts, 8 into demo. Under the strict slot bound `dock/__tests__/` would hold 17, over 12; the slot-arm ruling is owed.
- **94 stay in the harness.** They still carry 402 B2 edges in 71 files. Colocated tests add 26 B1 crossings (tests reading a sibling module's internals).
- **162 have no derivable subject.** Most are tests-visual specs.

tests-visual: 167 specs.
- 62 name exactly one story literal
- 71 name one category
- 54 name no story
- 14 are `_*capture` scratch specs

### 9.2 R-10 census

- HEAD: 282 demo edges already on doors, 71 to reroute, 18 onto private symbols (16 symbols in 11 files), 1 dynamic Vue leaf (`AppShell → Aurora.vue`). The ruling says 7 edges past a door; this census counts 71 + 18 + 1 by resolved file.
- flatQ reroute: 135 files, 348 specifiers rewritten, the same 18 private reads.

The 16 private symbols need a surface decision: publish, or move into the demo.

### 9.3 scripts zone (not built)

- `scripts/lib/` gets an `index.mjs` door (the last B7 line).
- `paint-arm.mjs` and `reflect-capture-verify.mjs` belong to tests-visual. Their readers are 8 tests-visual specs; `reflect-capture-verify` is read only by `paint-arm`.
- `comment-census` and `gate-register` have 1 test reader each; `gate-register` retires under R-1.
- `import-dag`, `canon-doc`, `regen-exports` and `safari-probe` have no reader in F-1's graph. `package.json` script invocations were not counted as readers, so R-8 disposition needs that check first.

---

## 10 · Toolchain on flatQ

### 10.1 Build and types

`npm run build`, the demo build, `vue-tsc --noEmit` and `vue-tsc -p tsconfig.test.json` all exit 0 on the doors-only tree. `npm pack` and `verify:package` were not run.

### 10.2 vitest

HEAD (built lib + demo): 2,324 tests, 2,323 passed, 0 failed.
flatQ: 2,271 tests, 2,230 passed, 37 failed in 18 files, and 2 suites uncollected (`dissolve`, `typed-track-seam`), 53 tests fewer collected.

| class | tests | files | what | cure |
|---|---:|---:|---|---|
| source read by computed path | 19 + 2 suites | 11 + 2 | tests `readFileSync` a path assembled at runtime: `g-dock-lattice` 5, `sortable-list/battery` 4 (`drag` is now a dir), `mark-register` 2, `focus-veil`, `forms-seam`, `glass-subtlety`, `proportion-register`, `radius-role-canon`, `spring-authority`, `stacked-url-filter`, `Surface` | R-3 + F-6: whole-library suites read the resolved graph through the harness. These are the B0 computed-read class (334 at HEAD) |
| surface diff | 6 | 2 | `public-surface.spec` 5 (`./motion-core` lost `useScrollProgress`, `useRAFLoop`, `useYieldToMain` …), `slider.contract` 1 (`./slider` gained `useDragVelocity`) | the 25 removal and 36 addition rows (§10.4), reviewed under R-6 and the pin |
| R-10 demo consequences | 9 | 4 | `code-block` 3 asserts `@glass/components/*` in demo source; `boot-graph` 3 (one is a stale-build artifact of the arm order, two assert the HEAD leaf-import form); `aurora-stage-affordance` 1 and `aurora/harness` 2 mount an empty wrapper | follow R-10 and §8; the two harness tests' mocks need retracing |
| mock seam after placement | 3 | 1 | `Constellation.palette-lifecycle`: `ctx.setTransform is not a function` after `useCanvas2D` moved into constellation | not traced |

### 10.3 Cascade (R-7, F-4 input)

Rule order and content match HEAD on flatP, famP and flatQ for:
- `./styles`: 1,935 rules
- `./styles.css`: 364 rules
- `glass-ui.css`: 343 rules

The comparison holds only after normalizing Vue scope ids: `data-v-*` attributes and the 12 scoped keyframe suffixes such as `skeleton-breathe-<hash>`. Vue derives these from SFC source, so any SFC edit changes them. The style carve alone on HEAD, with no SFC edits, keeps the raw ordered sha `e40ab85892259daa`.

- `./styles/theme` flattened is equal (11,165 chars) after `theme.css → theme/index.css`.
- `fonts.css` is byte-identical.

**R-7's "byte diff of the rule set" has to normalize scope ids, or every SFC-touching migration fails it.**

### 10.4 Surface

- 63 entries, 1,288 names (955 without the root).
- Published diff vs HEAD: +36 / −25. By entry: `./motion` +10, `./motion-core` +3/−15, `./color` +1, `./dom` +3/−10, `./constellation` +8, `./dock` +1, `./easing` +7, `./slider` +3.
- Every removal comes from placement moving a kernel file into its one reading unit.
- 43 internal doors carry 649 names.
- B9 multi-entry keys: 40 at HEAD, 46 on flatQ. R-6 counts 29. The 40 → 29 reconciliation is owed (§11). The six added keys were not itemized.

### 10.5 Bytes

One-symbol consumer app per subpath, minified, gzip -9, summed over 63 subpaths:

| tree | sum | vs HEAD |
|---|---:|---|
| HEAD | 320,969 | — |
| sealed without placement (flat-0) | 357,249 | +36,280, of which `./blob` +34,745 via the aurora door for `budget.ts` |
| flatP | 322,905 | +1,936 |
| famP | 322,975 | +2,006 |
| **flatQ** | **321,476** | **+507**: 27 grew, 27 same, 9 shrank |

flatQ per subpath: slider +1,245, labeled-field +990, easing +968, dock +699, aurora +99, sortable-list +75, motion +32; menu −688, blob −1,400.

The growth follows the placement moves and door reroutes. It was not traced subpath by subpath.

---

## 11 · Convergence and open gaps

**Estimate: about 60% (pass 1: 40%).**

Closed on `src/`: B1, B5, B7, B8, B10 (api arm), B6 dirs. Build and types are 0. The CSS order invariant holds (normalized). The boot ceiling is met with one leaf. Names are authored.

Open, with measurements:
1. **R-2 amendment.** Literal R-2 moves 17 component SFCs, including `Skeleton` (against R-9). The api-anchor rule reaches 0. Ruling needed.
2. **`./aurora-config`.** +1 export key and 3 R-6 removal rows from `./aurora`. The seal-clean `config/` module is not built.
3. **The harness.** B0 505 (168 walks + 334 computed reads) and B2 733 (402 in the harness after R-3), plus 19 tests and 2 uncollected suites that read source by computed path. All wait on F-6's harness reader.
4. **R-6 reconciliation.** 46 multi-entry keys on flatQ, against the ruling's 29. B9a has 18 door re-exports outside the subtree. 25 kernel name-slots leave `./motion-core` and `./dom`.
5. **B3, 24.** 17 crossings where `src/styles/index.css` imports component partials; card, tabs and `_shared` enter at two rungs. Five SFCs import `_shared/{disclosure,field}` partials directly. `accessibility.css` imports two `utilities/` members. All need the R-7 channel collapse (each unit's `index.css` door in the aggregator), with π.
6. **B12, 12.** 11 relays in 7 files and one `.d.mts` mirror. The 5 `composables/glass` relays become B9a lines unless R-6 names the owner.
7. **B4, 2.** `motion ↔ _shared` through the `SelectionValue` type. The authored cure moves the type to `motion/morph` beside `useSelectionGroup` and reroutes its 17 readers; not built. The other is the motion kernel's internal cycle, pre-existing at HEAD.
8. **G14.** 16 `src` files over 500 lines, with a split plan (§7.3) that is not built.
9. **Other zones.** demo (2 dirs, 8 files), scripts (`scripts/lib` door, 7 files), tests-visual (177 direct files; 105 of 167 specs have no single-story subject): the plans are authored, not built.
10. **Slot bound.** `dock/__tests__/` would hold 17 under R-3, so a slot-arm ruling is needed.
11. **Demo privates.** 16 private demo symbols in 11 files need a surface decision.
12. **π (G19).** Not run: no browser seat. The dock CSS carve changed file boundaries at a stable order.
13. **F-9.** The plant battery is the seat's own. The critic's battery is owed.
14. **F-1.** One B0 false positive: the `"src"` literal in `auroraImageSource.ts`.
15. **F-7 input.** LCA placement can create a cycle (§5.2). F-7 should run within modules too.
16. **R-7 verifier.** It must normalize Vue scope ids (§10.3).
17. **G18.** value.js is born red with 127 edges (regex census, not F-1).
18. **R-8.** Unread files (`useScrollScene`, `springProjection`, and four scripts) need the `package.json` script check before deletion.
19. **Untraced failures.** 3 constellation tests (mock seam) and 2 aurora-harness tests.

---

## 12 · Reproduction

Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-research/`

| path | what |
|---|---|
| `tools2/seal.mjs` | the gate (Appendix A) |
| `tools2/plants.mjs` | the 37-plant battery |
| `tools2/arm-flatQ.sh` | the pipeline of §4; `arm-flatP.sh` and `arm-famP.sh` are the comparison arms |
| `plans/flat-place-{1,1b,2,3}.json`, `flat-carve.json`, `flat-css.json`, `flat-style-doors.json`, `fam-dirs.json` | move plans |
| `tools2/style-carve2.mjs`, `css-dock.mjs`, `patch-flatQ.mjs` | carve and cut tools |
| `tools2/tshake.mjs`, `demo-arm2.sh` (+ `tools/eager.mjs`, `tools/demo-doors.mjs`) | bytes and boot |
| `tools2/cssflat2.mjs`, `cssdiff.mjs` | the cascade compare |
| `tools2/r3.mjs`, `demo-class.mjs`, `entry-names.mjs`, `moved-surface.mjs` | censuses |
| `tools/p1w/migrate/` | the pass-1 migrator, with `lib.mjs` `KIND` set to R-5's slots |
| `logs/` | every seal JSON (`final-head-{api,vue,none}.json`, `flatQ-seal-{api,vue,none}.json`, `flatP-seal.json`, `famP-seal.json`), vitest JSON (`H-vitest2.json`, `flatQ-vitest.json`), tsc logs, eager JSON |

The pipeline runs from a fresh HEAD worktree with F-2 on every move and refuses the main checkout. Replay determinism and the "rerun proposes 0 moves" check were not run this pass.

---

## Appendix A · `seal.mjs`

```js
#!/usr/bin/env node
// seal.mjs — D1-B pass-2 seal gate, written as clauses over the floor's F-1 graph (one graph,
// every S-4 edge kind, fail-closed) and F-7 placement (R-2 units). Every clause judges the
// RESOLVED file, never the specifier form. No comment opt-out exists anywhere.
//
//   node seal.mjs <root> [--verbose] [--json out] [--slot-arm strict|literal] [--virtual]
//                 [--anchor none|vue|api] [--overlay <json>] [--pin <json>] [--write-pin <json>]
//
//   --virtual     judge B1/B3 as if every dir B7 requires had its door (the "edges past
//                 doors" count on a tree that has not yet grown them)
//   --anchor      B10 arm: none = R-2 literal; vue = a component unit's door-exported SFCs stay;
//                 api = every file its own component unit's door re-exports stays
//   --overlay     {path: content|null} planted in memory (the plant battery)
//   --pin         the reviewed door-name snapshot; growth or loss is a B11 line
import { readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const root = resolve(args[0] ?? ".");
const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const VERBOSE = args.includes("--verbose");
const SLOT_ARM = opt("--slot-arm", "strict");
const VIRTUAL = args.includes("--virtual");
// B10 arm: none (R-2 literal) | vue (a component unit's door-exported SFCs anchored) | api (every file a
// component unit's own door re-exports is anchored; kernel doors anchor nothing)
const ANCHOR = opt("--anchor", "none");
const FL = `${root}/docs/tranches/BL/design/structure/floor/lib`;
const { buildGraph, VALUE_KINDS } = await import(pathToFileURL(`${FL}/graph.mjs`));
const { makeOrigins } = await import(pathToFileURL(`${FL}/symbols.mjs`));
const { placeAll, dirUnits } = await import(pathToFileURL(`${FL}/placement.mjs`));
const overlay = opt("--overlay") ? JSON.parse(readFileSync(opt("--overlay"), "utf8")) : {};
const g = buildGraph(root, { overlay });
const T = g.tree;

// ---------------------------------------------------------------- declarations (one place)
const SEALED = ["src", "scripts"];
const ZONES5 = ["src", "demo", "scripts", "tests", "tests-visual"]; // R-5 zones
const CONTAINERS = new Set(["src", "src/components", "src/composables", "scripts"]);
const KIND_SLOTS = new Set(["composables", "styles", "__tests__"]); // R-4, R-5, R-3
const DOOR_BASENAMES = ["index.ts", "index.mjs", "index.css"];
const HARNESS = "tests/harness/"; // R-3: the one module that walks or reads the tree (F-1 lands here)
const AGGREGATES = new Set(["src/index.ts", "src/styles/index.css"]); // the root door and ./styles (R-7)
const KERNEL = (f) => f.startsWith("src/composables/") || f.startsWith("src/styles/") || f.startsWith("src/components/_shared/");
const UNIT_FILE = (f) => f.startsWith("src/components/") && !f.startsWith("src/components/_shared/") && f.split("/").length > 3;
const GENERATED = (() => { try { return JSON.parse(T.read("docs/tranches/BL/design/structure/floor/records/generated.json")).files ?? {}; } catch { return {}; } })();
const CODE = /\.(ts|tsx|mts|cts|js|mjs|cjs|vue|css|glsl|wgsl|sh|py)$/;
const zoneOf = (f) => { const t = f.split("/")[0]; return ZONES5.includes(t) ? t : !f.includes("/") ? "root" : "other"; };
const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const dirOf = (f) => posix.dirname(f);
// a kind slot sits inside a module (never directly under a zone root or a container)
const isSlot = (d) => KIND_SLOTS.has(posix.basename(d)) && !CONTAINERS.has(d) && !CONTAINERS.has(posix.dirname(d)) && d.split("/").length > 2;
const inSlot = (d) => { const a = d.split("/"); for (let i = 2; i < a.length; i++) if (isSlot(a.slice(0, i).join("/"))) return true; return false; };

// ---------------------------------------------------------------- the published set (F-3)
const PUB_JS = new Set(g.record.js.map(([, s]) => s));
const PUB_CSS = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
const PUB_ASSETS = g.record.css.map(([, t]) => t.assets).filter(Boolean);
const PUB = new Set([...PUB_JS, ...PUB_CSS, ...T.files.filter((f) => PUB_ASSETS.some((a) => f.startsWith(a)))]);

// ---------------------------------------------------------------- the module tree
const filesIn = new Map();
for (const f of T.files) { const d = dirOf(f); if (!filesIn.has(d)) filesIn.set(d, []); filesIn.get(d).push(f); }
const allDirs = [...T.dirs].filter((d) => ZONES5.includes(zoneOf(`${d}/x`)));
const subtreeHasCode = new Map();
for (const f of T.files) if (CODE.test(f) && !isTest(f)) { let d = dirOf(f); while (d !== "." && !subtreeHasCode.has(d)) { subtreeHasCode.set(d, true); d = dirOf(d); } }
const doorFilesOf = (d) => DOOR_BASENAMES.map((b) => `${d}/${b}`).filter((p) => T.isFile(p));
const sealedCodeDirs = allDirs.filter((d) => SEALED.includes(zoneOf(`${d}/x`)) && subtreeHasCode.get(d) && !CONTAINERS.has(d) && !isSlot(d) && !inSlot(d));
const required = new Set(sealedCodeDirs); // B7: every one of these must be a module
const realModules = sealedCodeDirs.filter((d) => doorFilesOf(d).length);
const modules = (VIRTUAL ? sealedCodeDirs : realModules).sort((a, b) => a.length - b.length);
const modSet = new Set(modules);
const jsDoor = (m) => (m.startsWith("scripts") ? `${m}/index.mjs` : `${m}/index.ts`);
const cssDoor = (m) => `${m}/index.css`;
const isDoorOf = (m, f) => f === jsDoor(m) || f === cssDoor(m);
const isDoorFile = (f) => DOOR_BASENAMES.includes(posix.basename(f)) && (modSet.has(dirOf(f)) || CONTAINERS.has(dirOf(f)));
const chain = (f) => modules.filter((m) => under(f, m));
const outerM = (from, to) => modules.find((m) => under(to, m) && !under(from, m));
const innerM = (f) => chain(f).pop();

// ---------------------------------------------------------------- edge classes
const MODULE_KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-template-src", "sfc-script-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob"]);
const READ_KINDS = new Set(["path-literal", "path-helper", "new-url", "ts-reference"]);
const WALK_KINDS = new Set(["scan", "glob-literal"]);
const CSS_KINDS = new Set(["css-import", "sfc-style-src", "sfc-inline-css-import"]);
const reach = (e) => e.to && !e.dir && (MODULE_KINDS.has(e.kind) || READ_KINDS.has(e.kind)) && zoneOf(e.from) !== "other" && zoneOf(e.to) !== "other";
const isCss = (e) => CSS_KINDS.has(e.kind) && e.to.endsWith(".css");

const V = {}; const put = (k, s) => (V[k] ??= []).push(s);
const b0 = { f1: 0, walks: 0, computed: 0 };
for (const k of ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12"]) V[k] = [];

// ---- B0 · resolution, walks, computed reads (G7)
for (const v of g.violations) b0.f1++, put("B0", `${v.from}:${v.line ?? ""} ${v.kind} [${v.edgeKind ?? ""}] ${v.spec ?? ""}${v.pattern ? ` (${v.pattern})` : ""}`);
const walkers = new Set();
for (const e of g.edges) {
    const walk = WALK_KINDS.has(e.kind) || (READ_KINDS.has(e.kind) && e.dir && e.to !== ".");
    if (!walk || !e.to || e.from.startsWith(HARNESS) || zoneOf(e.from) === "root" || zoneOf(e.from) === "other") continue;
    const tz = zoneOf(e.dir ? `${e.to}/x` : e.to);
    if (!SEALED.includes(tz) && e.to !== ".") continue;
    const k = `${e.from}:${e.line}`; if (walkers.has(k)) continue; walkers.add(k);
    b0.walks++; put("B0", `${e.from}:${e.line} walk of ${e.dir ? e.to + "/" : e.glob ?? e.to} [${e.kind}] (scanners read the harness graph)`);
}
for (const c of g.census) if (["tests", "tests-visual", "scripts"].includes(zoneOf(c.from)) && !c.from.startsWith(HARNESS)) b0.computed++, put("B0", `${c.from}:${c.line} computed-path read ${String(c.spec).slice(0, 60)} [${c.kind}]`);

// ---- B1 door (V2, recursive) + own door · B2 consumer (R-10, R-3) · B3 CSS door · B8b library → consumer
for (const e of g.edges) {
    if (!reach(e) || e.from === e.to) continue;
    const zf = zoneOf(e.from), zt = zoneOf(e.to);
    if (zf === "src" && zt !== "src") { put("B8", `${e.from}:${e.line} -> ${e.to} [${e.kind}] (the library reads the ${zt} zone)`); continue; }
    if (!SEALED.includes(zt)) continue;
    if (zt === "src" && zf !== "src") {
        if (e.from.startsWith(HARNESS)) continue;
        if (!PUB.has(e.to)) put("B2", `${e.from}:${e.line} -> ${e.to} [${e.kind}]`);
        continue;
    }
    const own = innerM(e.from);
    if (own && isDoorOf(own, e.to) && !isTest(e.from) && !e.kind.startsWith("reexport") && !isCss(e)) { put("B1", `${e.from}:${e.line} -> ${e.to} (own door)`); continue; }
    const M = outerM(e.from, e.to);
    if (!M) continue;
    if (isCss(e)) { if (e.to !== cssDoor(M) && !PUB_CSS.has(e.to)) put("B3", `${e.from}:${e.line} -> ${e.to} (css door ${cssDoor(M)})`); continue; }
    if (isDoorOf(M, e.to) || PUB.has(e.to)) continue;
    put("B1", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (door ${jsDoor(M)})`);
}

// ---- B4 acyclic: value and type edges, sibling nodes at every depth (sub-modules and loose files)
const adjBy = new Map(); const typeOnlyPair = new Map();
for (const e of g.edges) {
    if (!e.to || e.dir || isTest(e.from) || isTest(e.to)) continue;
    const isVal = VALUE_KINDS.has(e.kind) && !e.typeOnly; const isType = /^import-type/.test(e.kind) || (e.typeOnly && (VALUE_KINDS.has(e.kind) || e.kind.startsWith("reexport")));
    if (!isVal && !isType) continue;
    const zf = zoneOf(e.from); if (zf !== zoneOf(e.to) || !SEALED.includes(zf)) continue;
    const ca = chain(e.from), cb = chain(e.to); const common = ca.filter((m) => cb.includes(m)).pop() ?? zf;
    const node = (f, c) => c.find((m) => m !== common && under(m, common) && (chain(m).filter((y) => y !== m).pop() ?? zf) === common) ?? f;
    const a = node(e.from, ca), b = node(e.to, cb); if (a === b) continue;
    if (!adjBy.has(common)) adjBy.set(common, new Map()); const A = adjBy.get(common);
    if (!A.has(a)) A.set(a, new Map()); if (!A.has(b)) A.set(b, new Map());
    if (!A.get(a).has(b)) A.get(a).set(b, `${e.from} -> ${e.to}${isVal ? "" : " [type]"}`);
    const k = `${a}|${b}`; typeOnlyPair.set(k, (typeOnlyPair.get(k) ?? true) && !isVal);
}
const tarjan = (adj) => { let i = 0; const I = new Map(), L = new Map(), st = [], on = new Set(), out = [];
    const sc = (x) => { I.set(x, i); L.set(x, i++); st.push(x); on.add(x); for (const w of adj.get(x).keys()) { if (!I.has(w)) { sc(w); L.set(x, Math.min(L.get(x), L.get(w))); } else if (on.has(w)) L.set(x, Math.min(L.get(x), I.get(w))); }
        if (L.get(x) === I.get(x)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== x); if (c.length > 1) out.push(c); } };
    for (const x of adj.keys()) if (!I.has(x)) sc(x); return out; };
const b4 = { value: 0, typeOnly: 0 };
const b4info = [];
for (const [lvl, adj] of adjBy) for (const c of tarjan(adj)) {
    if (!c.some((x) => modSet.has(x)) && new Set(c.map(dirOf)).size === 1) { b4info.push(`${lvl}: [${c.join(" ")}]`); continue; }
    const S = new Set(c); const why = c.flatMap((a) => [...adj.get(a)].filter(([b]) => S.has(b)).map(([, w]) => w));
    const typeOnly = c.every((a) => [...adj.get(a).keys()].filter((b) => S.has(b)).every((b) => typeOnlyPair.get(`${a}|${b}`)));
    b4[typeOnly ? "typeOnly" : "value"]++;
    put("B4", `cycle @${lvl} [${c.map((x) => x.replace(`${lvl}/`, "")).join(" ")}]${typeOnly ? " (type-only)" : ""} via ${why.slice(0, 3).join(" ; ")}`);
}

// ---- B5 kind slot: no door, no sub-dir
for (const d of allDirs) {
    if (!SEALED.includes(zoneOf(`${d}/x`))) continue;
    if (isSlot(d) && doorFilesOf(d).length) put("B5", `${doorFilesOf(d).join(",")} (door in a kind slot)`);
    if (isSlot(dirOf(d))) put("B5", `${d} (dir inside kind slot ${dirOf(d)})`);
}

// ---- B6 bounds (R-5): every zone, tests counted, generated only by registry
const b6 = { dirs: 0, files: 0, byZone: {} };
for (const d of allDirs) {
    const fs = (filesIn.get(d) ?? []);
    if (SLOT_ARM === "literal" && isSlot(d)) continue;
    if (fs.length > 12) { put("B6", `${d}/: ${fs.length} direct files > 12`); b6.dirs++; b6.byZone[zoneOf(`${d}/x`)] = (b6.byZone[zoneOf(`${d}/x`)] ?? 0) + 1; }
}
for (const f of T.files) {
    if (!ZONES5.includes(zoneOf(f)) || !CODE.test(f)) continue;
    const n = (T.read(f) ?? "").split("\n").length;
    if (n > 500) { if (GENERATED[f]) continue; put("B6", `${f}: ${n} lines > 500`); b6.files++; b6.byZone[zoneOf(f) + ":lines"] = (b6.byZone[zoneOf(f) + ":lines"] ?? 0) + 1; }
}

// ---- B7 mandatory seal (G4): every code dir in a sealed zone is a module, a kind slot, or a container
for (const d of sealedCodeDirs) { // a door per channel: direct script code needs the JS door, not only a CSS one
  const own = filesIn.get(d) ?? []; const hasScript = own.some((f) => /\.(ts|vue|mjs)$/.test(f) && !isTest(f) && !/\.d\.m?ts$/.test(f));
  if (!doorFilesOf(d).length) put("B7", `${d}/ (${own.length} direct files, no door)`);
  else if (hasScript && !T.isFile(jsDoor(d))) put("B7", `${d}/ (script code behind a CSS-only door: ${jsDoor(d)} missing)`); }

// ---- B8a rank (G2, S7): the kernel reads no unit, type-only and re-exports included; aggregates are doors, not readers
for (const e of g.edges) {
    if (!reach(e) || isTest(e.from) || AGGREGATES.has(e.from)) continue;
    if (KERNEL(e.from) && UNIT_FILE(e.to)) put("B8", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (kernel reads a unit)`);
}

// ---- B9 one symbol, one door (G1, R-6)
const O = makeOrigins(g);
const doorLike = (f) => isDoorFile(f) || PUB_JS.has(f);
for (const e of g.edges) {
    if (!e.to || !e.kind.startsWith("reexport") || !doorLike(e.from) || AGGREGATES.has(e.from)) continue;
    const m = dirOf(e.from);
    if (!under(e.to, m)) put("B9", `${e.from}:${e.line} re-exports ${e.to} (outside its subtree)`);
}
const onEntries = new Map();
for (const [name, src] of g.record.js) {
    if (name === "index") continue;
    for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name === "*" ? n : o.name}`; if (!onEntries.has(k)) onEntries.set(k, new Set()); onEntries.get(k).add(name); }
}
const multi = [...onEntries].filter(([, s]) => s.size > 1);
for (const [k, s] of multi) put("B9", `${k} on ${[...s].map((x) => "./" + x).join(" + ")}`);

// ---- B10 placement (G3, F-7 over R-2 units; doors are not readers)
const P = placeAll(g, dirUnits(), { zones: ["src"] });
const ownDoorExports = new Map(); // file -> the unit door that re-exports it
for (const d of [...T.files].filter((f) => /(^|\/)index\.ts$/.test(f) && f.startsWith("src/") && !CONTAINERS.has(dirOf(f))).sort((a, b) => a.length - b.length)) for (const [, os] of O.exportsOf(d)) for (const o of os) if (under(o.file, dirOf(d)) && o.file !== d) ownDoorExports.set(o.file, d);
const b10 = { literal: 0, anchored: 0, roots: [] };
for (const r of P.rows) {
    if (r.class !== "move" && r.class !== "global") continue;
    b10.literal++;
    const door_ = ownDoorExports.get(r.file);
    const compDoor = door_ && UNIT_FILE(door_);
    const root_ = compDoor && (ANCHOR === "api" || r.file.endsWith(".vue")) ? door_ : null;
    if (compDoor && r.file.endsWith(".vue")) b10.roots.push(`${r.file} (on ${door_}) -> ${r.home}`);
    if (compDoor) b10.api = (b10.api ?? 0) + 1;
    if (root_ && ANCHOR !== "none") continue;
    b10.anchored += root_ ? 0 : 1;
    put("B10", `${r.file} -> ${r.home} [${r.class}] readers: ${r.readerUnits.join(", ")}`);
}

// ---- B11 surface: unpublished door names read by nobody outside the module (G8b); empty doors (G17)
const readersOfKey = new Map();
for (const e of g.edges) {
    if (!e.to || !e.names?.length || e.kind.startsWith("reexport") || doorLike(e.from)) continue;
    for (const n of e.names) for (const o of O.originOf(e.to, n.imported)) { const k = `${o.file}#${o.name}`; if (!readersOfKey.has(k)) readersOfKey.set(k, new Set()); readersOfKey.get(k).add(e.from); }
}
const publishedKeys = new Set();
for (const [, src] of g.record.js) for (const [, os] of O.exportsOf(src)) for (const o of os) publishedKeys.add(`${o.file}#${o.name}`);
let pinDoors = 0, pinNames = 0; const pinNow = {};
for (const m of modules) {
    const d = jsDoor(m); if (!T.isFile(d)) continue;
    const ex = O.exportsOf(d); pinDoors++; pinNames += ex.size; pinNow[d] = [...ex.keys()].sort();
    if (!ex.size) { put("B11", `${d} exports nothing`); continue; }
    if (PUB.has(d) || AGGREGATES.has(d)) continue;
    for (const [n, os] of ex) {
        if (os.some((o) => publishedKeys.has(`${o.file}#${o.name}`))) continue;
        const outside = os.some((o) => [...(readersOfKey.get(`${o.file}#${o.name}`) ?? [])].some((r) => !under(r, m)));
        if (!outside) put("B11", `${d} exports ${n} (no reader outside ${m})`);
    }
}

// ---- B11a pin (G8): every door's names (internal doors included) equal the reviewed pin; growth is a diff
if (opt("--write-pin")) writeFileSync(opt("--write-pin"), JSON.stringify(pinNow, null, 1));
if (opt("--pin")) {
    const pin = JSON.parse(readFileSync(opt("--pin"), "utf8"));
    for (const d of new Set([...Object.keys(pin), ...Object.keys(pinNow)])) {
        const a = new Set(pin[d] ?? []), b = new Set(pinNow[d] ?? []);
        for (const n of b) if (!a.has(n)) put("B11", `${d} +${n} (not in the pin)`);
        for (const n of a) if (!b.has(n)) put("B11", `${d} -${n} (pinned, now gone)`);
    }
}

// ---- B12 relays (G10): only a door re-exports; no declaration mirror
for (const e of g.edges) {
    if (!e.to || !(e.kind.startsWith("reexport")) || !SEALED.includes(zoneOf(e.from)) || doorLike(e.from) || isTest(e.from)) continue;
    put("B12", `${e.from}:${e.line} re-exports ${e.to} (relay)`);
}
for (const f of T.files) { const m = /^(.*)\.d\.(m?ts)$/.exec(f); if (m && SEALED.includes(zoneOf(f)) && [".mjs", ".ts", ".js", ".vue"].some((x) => T.isFile(m[1] + x))) put("B12", `${f} (declaration mirror of ${m[1]})`); }

// ---------------------------------------------------------------- report
let total = 0; const counts = {};
for (const [k, list] of Object.entries(V)) { counts[k] = list.length; total += list.length; console.log(`${list.length ? "FAIL" : "PASS"} ${k} ${list.length}`); for (const s of VERBOSE ? list : list.slice(0, 3)) console.log(`   ${s}`); if (!VERBOSE && list.length > 3) console.log(`   … ${list.length - 3} more`); }
const meta = { b0, b4info: b4info.length, files: T.files.length, edges: g.edges.length, modules: modules.length, required: required.size, realModules: realModules.length, published: PUB.size, slotArm: SLOT_ARM, virtual: VIRTUAL, anchor: ANCHOR, b4, b6, b10: { literal: b10.literal, vueRoots: b10.roots.length, componentApi: b10.api ?? 0, counted: V.B10.length }, multiDoorSymbols: multi.length, pin: { doors: pinDoors, names: pinNames } };
console.log(`seal ${JSON.stringify(meta)}: ${total ? `FAIL (${total})` : "PASS"}`);
if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ counts, meta, V, roots: b10.roots, modules, b4info }, null, 1));
process.exitCode = total ? 1 : 0;
```
