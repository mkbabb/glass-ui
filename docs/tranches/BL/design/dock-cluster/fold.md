# Dock cluster · fold of the W-I.8 challenge

| field | value |
|---|---|
| seat | the FOLD seat, O-195 design loop. I wrote none of the proposals, AB.md, W-I.8 or the challenge |
| model | `claude-opus-5-5`, asserted from own system identity |
| subject | the 12 findings of `challenge.md`, folded into `docs/tranches/BL/waves/W-I.8.md` |
| base | master `6abc479f7` (its `src/` equals `0778c4090`). Scratch worktree `.claude/worktrees/bl/cluster/fold`: `spec-graft/prototype.patch`, then the fold's cures. The whole build is `fold/fold-build.patch` (against master); it was removed after this record was written |
| harness | `fold/tools/probe.mjs` is the challenger's probe plus three reads: the G6 WAAPI bite with a geometry-state count, the outer-edge trace and share overlap through a membership change, and the router cell's per-frame edge step. `fold/tools/g8-source.sh` is the new G8 source arm. `fold/tools/run-rest.sh` ran the Chromium plants and the first WebKit pass, and was stopped (by PID) while its optional cells waited on the WebKit lock; `fold/tools/run-final.sh` ran the full-precision re-read in both engines and the remaining WebKit cells, one run at a time. The fixture is the challenger's, unchanged (`fold/fixture/`) |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run; WebKit under `--exclusive webkit`. Unit test and builds under `guarded --light` |
| records | `fold/data/*.json`, `fold/logs/`, `fold/png/` |

## Verdict

Eleven findings are cured in the mechanism or the gate, each measured on the fold build in both engines (the unit test and the source greps need no engine). One is cured in part: the fractional-ratio seam (F5). Chromium falls from 13.4 to 2.7 and WebKit at 390 to 0, but WebKit at 1440 light still reads 10.7–21.6, and I8-G1 stays RED at every fractional ratio under its unchanged bound of 1.5. The wave does not ship until that closes. No gate was weakened. Four gates were rewritten because the old form could not bite (G5, G6, G8 twice), two were widened (G1, G9) and two were added (G15, G16).

The orchestrator's later note (`orchestrator-note-one-dock.md`: O-199 rounding, O-200 one dock with the theme fissioning out, O-202 the layer swap) is not one of these findings and is **not folded here**; see the last section.

## Dispositions

| # | finding | disposition | where in W-I.8 | measured (fold build) |
|---|---|---|---|---|
| F1 | G5's grep cannot bite on macOS and misses three spellings | **Gate rewritten, mechanism amended.** The grep is replaced by a unit test that spies `useDockSpring` and asserts every config the cluster passes **is** `DOCK_SPRING` (`toBe`). The cluster passes the constant itself, never a field copy | R-11, I8-G5 | clean: pass. Fails on all seven plants: the literal, `.3`, a named const, quoted keys, a local look-alike constant, a spread, and the field copy the prototype used (`tests/components/dock/dock-cluster-spring.spec.ts`, run under `guarded --light`, vitest `--maxWorkers=2`) |
| F2 | G8's grep blind on macOS, misses JS and out-of-path goo; wrong cited bite | **Gate rewritten.** `g8-source.sh`: portable `[[:space:]]`, all of `src/`, `--untracked`, three arms (filter-takes-`url(#`, an SVG `<filter>` element, `useDockFission`/`GooFilter` on a code line). The bite is re-cited at the right paths | I8-G8 | master: empty (rc 1). Hits P1, P2, P3, P4 and a `<filter><feGaussianBlur>` SFC. At `98b526139^`, `ae71daa05^`, `967811e40^`: hits `custom/dock/composables/useDockFission.ts:186`, `useDockFissionWiring.ts:64,80`, `goo-filter/GooFilter.vue` |
| F3 | G8's runtime half GREEN with goo on every member | **Gate sharpened.** New arm: no element in the cluster's subtree, and no ancestor, has a computed `filter` with `url(` | I8-G8 | goo build (P3 on the fold build): old verdict GREEN, `url(` count 3 → RED, Chromium (`data/chromium-plant-goo.json`) and WebKit (§W). Base: 0 |
| F4 | G6's CSS bites are zeroed by the PRM carve; the property-list read is RED on master | **Gate rewritten.** Read `getAnimations` (non-opacity → RED) and count geometry states (≤ 2, one-frame change). Drop the `transition-property` read. Strike the CSS bites (they paint nothing under PRM, so GREEN is right) and plant the WAAPI one | I8-G6 | baseline GREEN: `Animation:opacity` only, 2 states, the change at 144 ms. CSS plants (plain, `!important`, plate radius): GREEN, 0 duration, as the challenge found. WAAPI `clipPath` on the lenses: `Animation:clipPath` × 114, 3 states, **RED**. Crossfade bypassed: no opacity animation at all (RED on the dip arm); geometry stays 2-state because `useDockSpring`'s own PRM snap holds (`data/chromium-fold.json`, `data/chromium-plant-prmspring.json`) |
| F5 | the flat seam returns at fractional DPR | **Mechanism amended; gate widened; residue open and blocking.** At a contacted join the plate's box edge sits on the cut and the path overruns it by 2 px, so the ink's cut is a layout-snapped box edge. The grid margin is written at full precision. G1 now runs at DSF 1, 1.25, 1.5, 2, 2.2, 2.625, 3, bound unchanged | R-3, I8-G1, §6 | Chromium worst line per ratio, prototype → fold: 2.625: 13.4 → 2.7; 1.25: 11.7 → 2.6; 1.5: 10.4 → 2.5; 2.2: 10.7 → 2.7; integer: ≤ 0.2 → ≤ 0.7. WebKit: 390 clean at every ratio but 1.6 at 1.25 light (2.625 light was 9.8); 1440 light 10.7–21.6 (tables below). Variants tried and not adopted: cuts snapped in the root's own device space (`?snap=local`), Chromium no better (up to 4.7); one tone pass over the whole silhouette (`?tone=one`), Chromium dark ≤ 1.7 but light unchanged, WebKit unchanged in every cell. Neither residue is the tone lens |
| F6 | `min-inline-size` ratchets, 223 px of empty glass | **Mechanism amended, gate sharpened.** The whole-px grid is a `margin-inline-end` on each member but the last; nothing holds a member's width. G9 adds "width − natural width < 1 px" | R-3, I8-G9 | four tabs → one: 1440 width 89.156 = natural, 390 width 83.125 = natural; 0 px empty, Chromium and WebKit (§W) |
| F7 | a membership change mid-fuse jumps the plates 61 px | **Mechanism amended, gate added.** Joins re-index by member; survivors `translate` from their painted place on their own dock spring; an arriver opens between its painted neighbours as a droplet, opacity = open fraction. R-7's "a fuse beat hides the step" is withdrawn: a fused plate's outer edges move the same 61 px | R-7, I8-G15 | leave 40 ms into a fuse: travel 61 px, largest frame 4.24 px (6.95 %; the dock spring's own peak frame is 6.98 %), share overlap 0. Arrive 40 ms into a fission: the same, share overlap 0, arriver opacity 0 → 0.64 over the first 12 frames. Box overlap during an arrival is 48 px (the arriver's box sits under its neighbours while its share is clamped and its opacity rises); the gate reads shares, which is what paints glass |
| F8 | §5's fuse beat never paints | **Consumer half amended.** The `changing` beat is struck; R-7's glide carries a page change with no consumer timing | §5, I8-G15 | router cell, real clock: Theme plate's first-frame move 0 px (was −61); largest frame step 6.7 px over a 61 px travel; 0 errors |
| F9 | the one shared scalar reverses or stalls an unchanged join | **Mechanism amended, gate sharpened.** One `useDockSpring(DOCK_SPRING)` per join. G5 adds the two mixed-target interrupts with a velocity-continuity arm | R-11, I8-G5 | `[T,T]`→`[T,F]`: join 0 6.72 → 6.16 → 5.56 /s (was → −3.58). `[T,F]`→`[T,T]`: join 0 6.72 → 6.16 → 5.56 (was → 2.29); join 1 starts from rest. Full reversal unchanged: 6.72 → 5.76 → −1.16 |
| F10 | a vertical cluster mispaints silently | **Mechanism amended, gate added.** The cluster asserts `flex-direction: row` and throws, naming it | R-10, I8-G16 | `Error: DockCluster: flex-direction: column is not supported …` in every cell; 0 lenses painted |
| F11 | RTL mispaints silently | same assertion on `direction` | R-10, I8-G16 | `Error: DockCluster: direction: rtl is not supported …` in every cell; 0 lenses painted. `flex-wrap: wrap` takes the same code path; it was not run in the fold, and G16 runs it at landing |
| F12 | at 320 px a control is hidden and unreachable, no warning | **Mechanism amended, gate added.** Members and root `flex-shrink: 0`; an overflowing row logs one `console.error` (need, given) and marks `data-overflow`. It does not throw, because a throw would drop every control (h) | R-10, I8-G16 | 320: "the row needs 365.0px and its container gives 288.0px"; 360: "… gives 328.0px". Every control inside its member and its own hit target, at both widths. The row overflows the viewport (root −23 … 342 at 320): that is the host's to fix, and it is told |

### F5 · the fractional-ratio tables (flat field, fused, line at join 1 / join 2, worst row; the final build, `data/*-fold-p.json`)

Chromium:

| DSF | 390 light | 390 dark | 1440 light | 1440 dark |
|---|---|---|---|---|
| 1 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| 2 | 0 / 0 | 0 / 0 | 0 / 0.2 | 0 / 0 |
| 3 | 0 / 0 | 0.7 / 0 | 0 / 0 | 0.7 / 0 |
| 1.25 | 0.8 / 0.9 | **1.7 / 1.9** | 0.8 / 0.9 | **1.9 / 2.6** |
| 1.5 | 0 / 0 | 0 / 0 | 0.2 / 0.4 | 0.2 / **2.5** |
| 2.2 | **1.7 / 2.4** | 1 / **2.7** | **1.7 / 2.2** | 1.4 / **2.6** |
| 2.625 | 0.2 / 0.9 | 1.2 / 1 | 1.1 / 1.5 | **2.6 / 1.9** |

WebKit:

| DSF | 390 light | 390 dark | 1440 light | 1440 dark |
|---|---|---|---|---|
| 1, 2, 3 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| 1.25 | 0 / **1.6** | 0 / 0 | **14.4 / 21.6** | **11.8 / 15.9** (rim row only; 0.8 / 1.8 below it) |
| 1.5 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| 2.2 | 0 / 0 | 0 / 0 | **13.3 / 13.3** | 0.9 / 0.9 |
| 2.625 | 0 / 0 | 0 / 0 | **10.7 / 10.7** | 0.9 / 0.9 |

Tone is ≤ 0.1 in every cell. Chromium's residue reads alike in all four rows of the join, a full-height column. WebKit's 1440 light residue is one device column of bare field at the cut: the mid-row device pixels at DSF 2.2 read `204 … 204 218 204 …` against an interior of 204 (`png/webkit-fold-p-dpr2.2-1440-light-flat-fused.png`). Before the full-precision margin, WebKit's members sat at x.984 (`data/webkit-fold.json`); after it they sit at x.000 and the 1440 numbers did not move, so the column is not the grid. The probe's "interior control" column (`interiorCtrlLine` in `data/chromium-fold-dpr.json`) is not used: its samples start 12 px into a member, inside the capsule's corner, and read the silhouette edge.

## §W · WebKit

Every paint or motion cell above was run in WebKit 26.5 under `--exclusive webkit` (`data/webkit-fold.json`, `webkit-fold-p.json`, `webkit-fold-p-onetone.json`, `webkit-plant-goo.json`). Where WebKit differs from Chromium it is said in the row; otherwise it matched:

| cell | WebKit |
|---|---|
| F3 goo plant | `url(` arm 3 → RED; old verdict GREEN |
| F4 PRM | baseline `Animation:opacity` only, 2 states; CSS plants GREEN (0 duration); WAAPI plant `Animation:clipPath` × 84, 3 states, RED |
| F6 shrink | 89.172 = natural at 1440, 83.141 = natural at 390 |
| F7 glide | leave and arrive: 61 px travel, largest frame 4.24 px, share overlap 0, arriver opacity 0 → 0.64 over 12 frames |
| F8 router | Theme first-frame move 0 px; largest real-clock step 13.2 px, on a 29 ms frame (why G15 gates the real clock on its first frame only) |
| F9 interrupts | identical to Chromium: 6.72 → 6.16 → 5.56 on the unchanged join |
| F10, F11 | both throw, naming the property; 0 lenses |
| F12 | 320 and 360 log the error; every control inside its member and its own hit target |

The PRM-spring plant (crossfade bypassed) was run in Chromium only (`data/chromium-plant-prmspring.json`); its WebKit run was dropped from the queue when the WebKit lock stayed held by other sessions. It is a JS path and its verdict follows from `useDockSpring`'s PRM snap, which both engines share.

## Gates after the fold

| gate | change | still RED where |
|---|---|---|
| I8-G1 | DSF 1, 1.25, 1.5, 2, 2.2, 2.625, 3 | DSF 1.25, 2.2, 2.625 (F5) |
| I8-G5 | identity unit test replaces the grep; mixed-target interrupts added | – |
| I8-G6 | reads Animations and geometry states; WAAPI bite | – |
| I8-G8 | `url(` runtime arm; portable whole-`src/` source arm | – |
| I8-G9 | natural-width arm | – |
| I8-G15 | new: membership glides | – |
| I8-G16 | new: fails loud | – |

## Not re-run in the fold

I8-G2, G3, G4, G7, G10, G11, G12, G13 and G14 were not re-run on the fold build. Three of its changes touch them and must be read at landing: the survivor `translate` and the arriver's opacity (G7's census, G11's layout count during a membership change), the plate's overrun rect (G4 reads every clip string for `%`; the rect is px), and the ResizeObserver's grid read (G11 measures a fuse, which fires no ResizeObserver).

## Not folded here: O-199, O-200, O-202

`orchestrator-note-one-dock.md` asks the fold to rule R-8 against the owner's one-dock shape (a member that carries GlassDock's own collapse), to restate the consumer half for one dock plus the theme plate with a before-and-after template, and to specify and measure the DockLayerGroup layer swap (O-202) against value's Tools → tool-view dock. None of it is among the challenge's findings, and each needs its own measurement: a collapsing member drives its plate's visible extent through `--dock-t` and a box-size morph (`styles/dock.css`, `shape.css`) that the cluster's share clip would override, and the layer swap needs a fixture of value's geometry and a read of what DockCrossfade does on 11.0.0. This fold did not measure either, so it rules neither. W-I.8 §5 carries a note that its three-member shape is superseded and the restatement is owed. O-199 (the capsule corner) needs no change here: R-4 reads the member's computed corner, and the fold build writes no corner literal.
