# D1 · pass 1 · D1-D: declared strata (direction first)

| field | value |
|---|---|
| seat | pass-1 research seat for family D1-D in design loop D1 (structure, the colocation edict N-1) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6433284a`. `git diff --stat b7099ea6 HEAD -- src scripts tests tests-visual demo package.json 'vite*.ts'` is empty, so the brief's `b7099ea6` and the measured tree are the same source |
| inputs | `PORTFOLIO.md` §0-3, the `### D1-D` section and the D1-D row of §7 only; `pass-1/W.md` and `pass-1/X.md` (background); `audit/round-1/L12.md`, `L13.md`, `L14.md` |
| instruments | scratch `D1-D/graph-ast.mjs`: a TypeScript-AST import graph over `src demo tests tests-visual scripts` and the root `vite*.ts` (1,266 files, 2,795 edges: value 2,173 · type 440 · css 139 · dynamic 43; **0 unresolved**). `verbatimModuleSyntax` is on (`tsconfig.json:8`), so the syntactic `type` marker is exact. `origins.mjs` resolves every imported name through re-export chains to the file that declares it (barrels never mask ownership). `gate.mjs` is the rank gate plus charter check. `history.mjs` replays git. `move.mjs` is the codemod. `flatten.mjs`, `cssident.mjs`, `surface.mjs`, `distdiff.mjs` compare dist trees |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/D1-D/` (called `D/` below) |
| fences kept | no repo source edit; the only repo write is this file. All moves, builds and tests ran in the worktree `D/wt` (created with `git worktree add`, `node_modules` symlinked, removed with `git worktree remove --force`; no other git write). Vite writes its bundled-config temp file into the symlinked `node_modules/.vite-temp` and deletes it; the dir was empty afterwards. No sibling repo was touched. Other families' sections and reports were not read |
| deliverable | answers to the six D1-D questions with measurements; the family's strongest form; two prototype probes (D′ carve, full D rename) with measured outcomes; the gate RED at HEAD; full cost; consumer impact; the backend analogue; weaknesses. No comparison with other families |

---

## 0 · The answer in brief

1. **The value graph is not layered at HEAD.** With the two aggregate public doors (`./motion`, `./motion-core`) treated as entry anchors, the unit graph (97 units, 247 unit edges) has exactly two cycles, M02 `{dock, menu, select, tabs, motion/morph, _shared/overlay}` and M03 `{dialog, sheet}`, and its longest-path layering has 10 levels. **Nine file moves** (plus two components declared compositions and one inlined constant) make it rank-consistent. Checked on the virtual graph and on disk.
2. **The component/composition split was not stable.** Over all 703 first-parent commits that touched `src/components` (2026-03-25 to 2026-09-22, the repo's whole life), 37 existing dirs flipped class (27 distinct dirs), 17 more were born as compositions, 49 were a composition at some point, and the raw component graph had a cycle in 394 of 703 snapshots. Under D every flip is a directory move. Under D′ it is a one-row edit.
3. **The charter has 20 rows** (9 primitives, 2 substrate, 9 patterns). With a public door counted as one consumer unit, **9 files go back to an owner** at HEAD (dock 7, aurora 2) and 2 are dead. At directory granularity, one row (`composables/search`, reaching only dock) goes back. Under the strict reading, where a public door does not count, 20 files go back, including generic public hooks.
4. **Cost.** D′ moves 19 files and rewrites 107 specifiers plus 13 literal paths. D moves 346 of 658 tracked `src` files (53%) and rewrites 853 specifiers plus 271 literal paths. It needed 15 hand-edited hunks in 4 build files, and still left 13 test files (54 tests) red on paths the codemod cannot see. The portfolio's estimate of "about 1,000" undercounts: the D total is ≥1,124 path edits before that residue.
5. **The style fold can emit the pinned CSS layout from `foundation/`.** It needs one dist↔src root map applied in three places. `theme.css`, `fonts.css` and `component-styles.css` came out byte-identical. The `styles/index.css` cascade came out identical modulo Vue scope ids. The export surface came out identical: 68 keys, `EXACT_REPRODUCTION: true`, 603 runtime and 1,279 type names across 63 entries.
6. **Prior art.** FSD layers, the Clean Architecture dependency rule, ArchUnit layer and cycle checks, and import-linter `layers` all describe D's mechanism. Atomic Design's own text says its ranks are "not a linear process" and "not rigid dogma", and that is the component/composition line D would have to hold.

---

## 1 · Q1: longest-path layering, sideways and upward edges, minimal promotion set

**Instrument.** `node D/layering.mjs D/g-head.json value,dynamic`. Units are a component dir, a `_shared` subdir or root file, a `composables/<domain>` leaf (with `glass/*` and `motion/*` split), `styles`, `fonts` and the entry files. `D/layering-doors.mjs` is the same run with `motion/index.ts` and `motion/core/index.ts` treated as entry anchors, which they are: both are published aggregate doors.

**Layering at HEAD (doors as anchors): 97 units, 247 unit edges, 2 SCCs.**

```
SCC 6  C:dock C:menu C:select C:tabs K:motion/morph S:overlay          (M02 core)
SCC 2  C:dialog C:sheet                                                (M03)
L0 (27) styles, color, context, dark, keyboard, reactive, search, glass/procedural, motion/{dissolve,engage}, 13 _shared units, music-staff, scroll-progress-rim …
L1 (24) 22 atoms, deck, dom          L2 (2) data-table, motion/core
L3 (8)  handmark, typewriter, glass/webgl, motion/{number,pointer,route,spring}, _shared/useMotionAxis
L4 (6)  dark-mode-toggle, sortable-list, timeline, glass/{canvas2d,webgpu}, motion/scroll
L5 (7)  aurora, card, constellation, fading-scroll, fourier-field, glass (root), sidebar
L6 (9)  blob, button, configurator, M02 (dock menu select tabs motion/morph _shared/overlay)
L7 (10) carousel, dialog, sheet, number-field, pager-dots, popover, slider, toggle-group, tooltip, motion/reveal
L8 (3)  command, easing, labeled-field          L9  the entry (src/index.ts)
```

Without the anchor treatment, the M02 SCC grows to 16 units, because `motion/core/index.ts` re-exports 14 leaves from seven sibling dirs (L13-10). That door knot is real at leaf-dir granularity: see §8.2 for what the repo's own `import-dag.mjs` reports on the D tree.

The natural order has 10 levels, the declared stack 6. The component-over-component chains alone reach depth 3 (`easing → tabs → select`, `command → dialog ↔ sheet`).

**Sideways and upward edges at HEAD**, from the gate with the D′ rank table (`node D/gate.mjs D/g-head.json D/charter-dprime.mjs`, the portfolio's nine compositions declared):

| kind | edge | site |
|---|---|---|
| sideways | blob → aurora | `blob/composables/useMetaballRenderer.ts:8` → `aurora/constants/budget.ts` |
| sideways | dialog → sheet | `dialog/DialogContent.vue:16` → `sheet/motion.ts` |
| sideways | sheet → dialog | `sheet/SheetContent.vue:12` → `dialog/ModalOverlay.vue` |
| sideways | pager-dots → deck | `pager-dots/PagerDots.vue:5` → `deck/index.ts` (`sequenceWindow`) |
| sideways | tabs → select | `tabs/SegmentedTabs.vue:9` → `select/index.ts` (the mobile `<Select>` fold) |
| upward | _shared/overlay → dock | `_shared/overlay/participation.ts:11` → `dock/composables/dockContext.ts` |
| upward | slider → dock | `slider/Slider.vue:20` → `dock/composables/useDockHold.ts` |
| upward | composables/glass → substrate | `composables/glass/index.ts:30-32` re-exports `webgpu` types and `canvas2d` (a primitives barrel over substrate) |
| upward | composables/motion → _shared | `motion/morph/useSelectionGroup.ts:12` (type) → `_shared/selection.ts` |
| upward | composables/motion → tabs | `motion/morph/useSelectionGroup.ts:17` → `tabs/composables/useTabRovingFocus.ts` |

With no compositions declared, the same gate reports the portfolio's 25 sideways pairs plus 5 upward edges (`D/charter-dprime-nocomp.mjs`: `sideways(component): 25`).

**Minimal promotion set (rank fixes only), `D/placement-min.mjs` `PROMOTIONS`:**

| # | file | to | fixes |
|---|---|---|---|
| 1 | `aurora/constants/budget.ts` | substrate (`glass/webgl/budget.ts`) | blob → aurora |
| 2 | `dialog/ModalOverlay.vue` | patterns (`_shared/overlay/`) | sheet → dialog (M03) |
| 3 | `sheet/motion.ts` | patterns (`_shared/overlay/sheet-motion.ts`) | dialog → sheet (M03) |
| 4 | `dock/composables/dockContext.ts` | patterns (`_shared/overlay/`) | participation → dock (M02) |
| 5 | `dock/composables/useDockHold.ts` | patterns (`_shared/overlay/`) | slider → dock |
| 6 | `composables/glass/index.ts` | substrate (`glass/webgpu/index.ts`) | primitives barrel over substrate |
| 7 | `tabs/composables/useTabRovingFocus.ts` | primitives (`motion/morph/`) | useSelectionGroup → tabs (M02) |
| 8 | `_shared/selection.ts` | primitives (`motion/morph/`) | useSelectionGroup → _shared (type) |
| 9 | `_shared/interaction.ts` | primitives (`motion/morph/`) | the type cycle partner of `selection.ts` |

Also needed:

- **Two reclassifications:** `tabs` and `pager-dots` join the compositions. tabs genuinely composes `Select`. pager-dots reads the deck door, so declaring it a composition is cheaper than promoting the deck core, which is five files.
- **One inlined constant.** `dockContext.ts` imports `DOCK_CONTEXT_LABEL` from `dock/constants`, so the constant moves with it. This is the promotion closure: a promoted file drags every in-owner dependency it has.

**Verification.** `node D/remap.mjs … mapMin` plus the gate gives `upward: 2`. One is the constant, fixed by the inlining. The other is `styles/glass.css:68 → chip/accent-tone.css`, dissolved by the cascade-root rule of §7 (row 3). Every remaining violation is a charter row. The on-disk run is §8.1.

The **8-file variant** promotes `useSelectionGroup`, `useSelectionIndicator`, `eyeglass` and `useTabRovingFocus` up into `patterns/selection/` instead of rows 7-9. The full D placement uses that variant, because the charter names a `selection` pattern.

**The D tree's own layering** (`node D/layering-d.mjs D/g-D.json`) is 76 units and 157 value edges, **0 cycles**, with a longest path of 7:

```
compositions/easing → compositions/tabs → components/select → patterns/overlay → patterns/(root) → primitives/motion → primitives/dom → primitives/reactive
```

With type edges added it is 169 edges and a longest path of 8. The strata are a coarsening of that DAG. Height ranges per stratum: primitives 0..3, substrate 3..4, patterns 0..4, components 0..5, compositions 5..7. Cross-unit edges inside one stratum survive every placement:

- primitives: `motion → dom`, `dom → reactive`, `sidebar → motion`, `specular → motion` (5 edges)
- patterns: `overlay → (root)`, `overlay → surface`, `surface → (root)` (6 edges)
- compositions: `easing → tabs` (1 edge)

So D cannot be a flat stack. It has to be a stack of strata, each of which may be an internal DAG (§7).

---

## 2 · Q2: the component/composition split and its stability

**At HEAD.**

- **Raw split:** 15 dirs import another component dir: blob, card, carousel, command, configurator, data-table, dialog, dock, easing, labeled-field, number-field, pager-dots, sheet, slider, tabs (`node D/compsplit.mjs`, 25 pairs, all value edges).
- **After the D promotions:** 10 compositions remain: card, carousel, command, configurator, data-table, dock, easing, labeled-field, number-field, tabs. That is the charter's nine plus `tabs`.
- **Composition over composition:** one edge remains, `easing → tabs` (`EasingPicker.vue:39` uses `SegmentedTabs`).

**History (`node D/history.mjs`).** It replays every first-parent commit touching `src/components` and normalises the pre-flatten `components/ui/` and `components/custom/` layouts. Six months back from HEAD is before the first commit (2026-03-25), so the replay covers all 703 commits.

| measure | value |
|---|---|
| commits replayed | 703 (2026-03-25 → 2026-09-22) |
| snapshots where the composition set changed | 52 |
| flips of an existing dir (component ↔ composition) | **37, over 27 distinct dirs** |
| caused by a door or SFC import (a true composition) | 19 |
| caused by a reach into a helper (a promotion event under D) | 18: `dock/composables/dockContext.ts` 8 (5 on 2026-05-14, 3 back on 2026-08-08), `aurora/constants/budget.ts` 5, `metric/coalesce-metric.ts` 2, `sheet/motion.ts` 1, `selectable-chip/chipVariants.ts` 1, `glyph-face/keys.ts` 1 |
| dirs born as a composition | 17 |
| dirs that were a composition at some point | 49 |
| compositions per month end | Mar 10 · Apr 9 · May 22 · Jun 33 · Jul 19 · Aug 15 · Sep 15 |
| snapshots with a component-graph cycle | 394 of 703 (every snapshot in July, August and September) |
| deepest component chain | 2 (Mar-May), 5 (Jun-Aug), 3 at HEAD |

**Flip-backs.**

| dir | route | time between flips |
|---|---|---|
| `card` | composition → component → composition | same day (`cab72582`, `511146fd`, 2026-05-18), then back at `5fd114b6` (2026-07-13) |
| `expandable-container` | composition and back | 3 days |
| `search` | composition and back | 75 days |
| `timeline` | composition and back | 87 days |
| `dropdown-menu`, `popover`, `select` | composition and back (via the dock context) | 86 days |
| `constellation` | composition and back | 26 days |
| `fourier-field` | composition and back | 54 days |

**What a flip costs.**

- **Under D:** each flip is a directory move between `components/` and `compositions/` plus a rewrite of every specifier entering the dir. At HEAD, 155 specifiers enter the 10 composition dirs from outside (dock 56, labeled-field 18, card 16, tabs 15, configurator 14, data-table 10, command 8, carousel 7, number-field 6, easing 5), an average of 15.5 per dir. Over the window that is about 37 moves and roughly 570 rewrites, spent on reclassification alone.
- **Under D′:** each flip is one table row.

The carousel example the brief names holds: carousel is a composition because `CarouselPager.vue:5` imports `button`. Its `deck` edges are a promotion, not a composition, when the pager core becomes a pattern.

---

## 3 · Q3: the charter for primitives, substrate and patterns

**The consumer rule.** The gate computes it; the charter never lists consumers.

- **Consumer units of a file:** the set of component and composition units (ranks 4 and 5) that reach it. Reach is followed symbol by symbol, through lower-strata chains. A component's own door re-exporting the file counts as consumption. A lower-strata barrel is transparent.
- **Published:** the file is reachable from a public door through re-exports or lower-strata imports, without passing through a component door.
- **Verdict:** a file passes when it has ≥2 units, or 1 unit and is published, or 0 units and is published. It fails as **owned** (1 unit, unpublished) or **dead** (0 units, unpublished).
- **Why only ranks 4 and 5 count:** so that splitting a row cannot make a single-owner chain look shared.

**The D charter** (`D/charter-d.mjs`, i.e. `src/strata.ts` as data; units measured on the D tree `D/g-D.json`):

| row | reason | files | consumer units | files with <2 units (all pass through a door) |
|---|---|---:|---:|---:|
| `primitives/context/` | the one typed provide/inject factory every stateful family builds its context on | 1 | 10 | 0 |
| `primitives/dom/` | DOM observation and input hooks: resize, token colour, touch gate, viewport readiness, clipboard | 11 | 9 | 8 |
| `primitives/color/` | colour derivation over value.js that more than one family paints with | 3 | 4 | 2 |
| `primitives/dark/` | the dark-mode register: pre-paint sync script, installer, global ref | 3 | 2 | 2 |
| `primitives/keyboard/` | the shortcut registry the overlay family and consumers bind through | 1 | 5 | 0 |
| `primitives/reactive/` | timer primitives | 2 | **0** | 2 |
| `primitives/motion/` | the motion vocabulary: tempo, springs, morph, reveal, scroll, number, route | 34 | 21 | 18 (2 fail: dead) |
| `primitives/specular/` | the pointer-tracked specular highlight button and dock share | 2 | 2 | 0 |
| `primitives/sidebar/` | the `./sidebar` module (decided row: common floor #5) | 8 | **0** | 8 |
| `substrate/gpu/` | WebGL/WebGPU/canvas2d lifecycle, render budget and shader chunks for the procedural suite | 16 | 5 | 2 |
| `substrate/pointer-field/` | the pointer velocity field the procedural suite reads | 3 | 4 | 1 |
| `patterns/overlay/` | the floating family contract: portal, placement, modal overlay, spring mount, sheet motion, keep-open hold and the dock context key | 9 | 9 | 0 |
| `patterns/selection/` | selection values, roving focus, the selection indicator | 6 | 13 | 0 |
| `patterns/pager/` | the windowed-sequence core: index authority, snap, window oracle, lead trail | 6 | 3 | 0 |
| `patterns/field/` | field control state and value domain | 2 | 5 | 0 |
| `patterns/disclosure/` | open/close disclosure context | 1 | 2 | 0 |
| `patterns/feedback/` | DotRing and the feedback tone tint | 1 | 3 | 0 |
| `patterns/menu/` | the menu row register (menu, select) | 1 | 2 | 0 |
| `patterns/surface/` | surface prop resolution | 1 | 7 | 0 |
| `patterns/` (root) | cross-family atoms: cn, axes, focus, primitive, control, motion axis | 6 | 44 | 0 |

**Rows with fewer than two consumer units.**

- **At row granularity in D:** 2 rows, `reactive` and `sidebar`. Both have 0 internal consumers and stand only on published doors. Neither goes back to an owner. `sidebar` is the common floor's decided row.
- **At HEAD with today's dirs** (`D/charter-dprime.mjs`, 22 rows): one row goes back whole, `composables/search/` (3 files → dock). `glass/canvas2d/` also reaches one unit but passes, because it is published.

**At file granularity** (the check that bites), HEAD has 11 failures:

- **Owned, 9 files:**
  - `glass/useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts` → dock
  - `search/{match,types,useFuzzySearch}.ts` → dock
  - `_shared/overlay/isTeleportedTarget.ts` → dock
  - `glass/webgl/shaders/flow.{glsl,wgsl}.ts` → aurora
- **Dead, 2 files:** `motion/scroll/useScrollScene.ts` (demo-only, common floor #3) and `motion/spring/springProjection.ts` (read only by `scripts/regen-spring-tokens.mjs`, the demo lab and tests).

**Against L13's 32 OWNED** (a cross-tab of `D/perfile-head.json` over the `owned.mjs` list):

- 16 have ≥2 component units. These are the procedural suite's substrate (aurora, blob, fourier-field and constellation are separate units) plus `useLeadTrail` (carousel, pager-dots) and `useSpringMount` (dialog, sheet). L13 grouped these by family.
- 16 have exactly 1 unit. 8 of those pass only because they are published: `useDragVelocity` (./dom), `useAccentTone` (./color) and `accent-tone-solve` (reached from it), `useScrollChrome`, `useScrollProgress`, `useRoutePointer`, `useCanvas2D` and `useDockCtaReceive` (the last via `./motion`). The other 8 fail, and together with `isTeleportedTarget` they are the 9 owned files above.

Under the strict rule (`STRICT=1`), the gate fails 20 owned files instead of 9. The extra 11 are the 8 published single-owner files above plus three generic public hooks the strict rule would colocate into a composition: `useClipboard` → easing, and `useRAFLoop` and `useYieldToMain` → dock. The charter cannot encode both E-7's "or is exported" and L13's "owned regardless of door" (§13 weakness 6).

---

## 4 · Q4: D′ (rank table over today's dirs) against D (renamed strata)

`node D/move.mjs <root> D/g-head.json <placement> <fn>` in dry-run mode. It rewrites every resolved specifier (value, type, dynamic, `@import`, `<style src>`) and every literal path prefixed `src/` or `@glass/` that names a moved file or a wholly moved dir.

| | D′ rank only (`mapMin`) | D′ with owner returns (`mapMinOwners`) | D (`mapD`) |
|---|---:|---:|---:|
| tracked `src` files moved | 9 | 19 | **346 of 658** |
| specifiers rewritten | 80 (src 71, tests 9) | 107 (src 83, demo 5, tests 19; value 58, type 49) | **853** (src 519, demo 138, tests 193, scripts 2, vite 1; value 677, type 153, css 17, dynamic 6) |
| literal path strings rewritten | 5 | 13 | **271** (tests 201, scripts 24, src 19, demo 14, `vite.style-fold.ts` 9, `vite.utility-emit.ts` 2, tests-visual 2) |
| files touched | 67 | 85 | 506 |
| hand code edits | 1 (the inlined label) | 2 files, 3 hunks | 4 files (label ×2, overlay door, `PagerDots.vue` re-point) |
| build-config edits | 0 | 0 | 4 files, 15 hand hunks (`subpath-policy.mjs` re-key ×6, `vite.style-fold.ts` ×5, `vite.style-assets.ts` ×3, `gen-component-styles.mjs` ×1). With the codemod's literal rewrites, `scripts/` + `vite*.ts` total 10 files, `+64 −48` |
| residue the codemod cannot see | 0 (tests green) | 0 | **13 test files / 54 tests red** (plus the baseline `boot-graph` trio) on segment-built paths (`join(ROOT, "src", "components", "dock", …)`, bare `components/dock/styles/run.css`) and on assertions about the old shape; up to 266 unprefixed path mentions in 89 files remain (upper bound, comments included) |
| rank-table / charter rows | 11 compositions + 22 rows | same | directories carry the rank; 20 rows |

D's moves by zone (`D/moved-mapD.json`):

- `components → compositions` 112, `components → patterns` 36, `components → substrate` 1
- `composables → primitives` 75, `→ substrate` 20, `→ compositions` 7, `→ patterns` 5, `→ components` 2
- `styles → foundation` 81, `fonts → foundation` 7

The portfolio's "on the order of 1,000" specifiers measures as 853 specifiers plus 271 literals, **1,124 path edits**, before the residue.

"Tests mirror the strata" is a separate cost that neither variant executed. `node D/testmirror.mjs` assigns each test file to its dominant src subject: of 248 test files, **206 would move**, 16 already sit at their mirror path, and 26 have no src subject (gates and invariants).

---

## 5 · Q5: the style fold from a `foundation/` source

**What couples the dist layout to the source layout today.** The dist↔src identity is written in three places:

1. `vite.style-fold.ts` `declaredStyleRoots`: `resolve(root, "src", relativeTarget)` maps `./dist/styles/index.css` to `src/styles/index.css` and `./dist/fonts/*` to `src/fonts/*`.
2. `copyStyleAssets` and its post-processors. They copy and minify only `src/styles → dist/styles`, `src/components → dist/components` and `src/fonts → dist/fonts`.
3. `scripts/gen-component-styles.mjs` `outputMember`. It turns a source path into a dist path relative to `src/`.

**What D needed** (all in the worktree):

- a single `SRC_OF_DIST = [["fonts/", "foundation/fonts/"], ["styles/", "foundation/"]]` map in the fold
- copying and post-processing every stratum root (`compositions`, `patterns`) as well
- excluding `foundation/fonts/` from the `styles` copy. The first build duplicated the four woff2 files into `dist/styles/fonts/`
- the same map in `outputMember`. The first build failed with `gen-component-styles: closure target(s) absent from output — ./foundation/track-well.css, ./foundation/glass/value-marks.css, ./foundation/glass/track-flow.css`
- a first build that skipped minifying the moved roots shipped `compositions/dock/styles/index.css` at 18,223 bytes against 1,939

**Measured result** (`D/dist-head` against `D/dist-D`):

| artefact | result |
|---|---|
| `./styles/theme` → `dist/styles/theme.css` | byte-identical |
| `./styles/fonts` → `dist/styles/fonts.css` | byte-identical |
| `./styles.css` → `dist/component-styles.css` | byte-identical file; its flattened closure is identical modulo Vue scope ids |
| `./styles` → `dist/styles/index.css` | bytes differ in exactly the 14 `@import` lines that name `../compositions/…` and `../patterns/…`. The flattened cascade (122 files, 322,680 bytes) is **identical modulo Vue scope ids** (`node D/cssident.mjs`) |
| `dist/glass-ui.css` (SFC bundle) | identical modulo scope ids. 15 of 16 ids rehash, because production scope ids hash the SFC source and the codemod rewrote those SFCs' import lines |
| `dist/styles/**` file set | identical except `styles/tokens.d.ts` and `styles/tokens/manifest.d.ts`, which the declaration emit now places at `dist/foundation/`. Neither is an export key; `./tokens` types resolve through `dist/tokens.d.ts` |
| `./fonts/*` | `dist/fonts/**` unchanged |

**Answer:** yes. The four CSS export files keep their paths, three keep their bytes, and all four keep their cascade. It costs one map applied at three sites, which is P-3's "one source of record" for a fact the tree currently repeats. Under D′ (no zone rename), all four flattened entries were **byte-identical** to HEAD.

---

## 6 · Q6: prior art

**Feature-Sliced Design** (pinned in `W.md` §3.1; `layers.mdx` re-read here):

- "A module (file) in a slice can only import other slices when they are located on layers strictly below."
- Shared "does not contain slices" and its segments "can freely reference each other".
- "You don't have to use every layer."
- Cross-imports between entities go through the `@x` notation, "a last resort".

D maps onto FSD this way:

- D's components stratum is an FSD layer whose slices may not see each other.
- compositions are FSD's widgets.
- D splits FSD's single Shared into four ordered strata. Shared's "segments import freely" is the measured need for intra-stratum edges (§1). D keeps it, but requires each stratum's unit graph to be acyclic.
- `@x` is what D must refuse: E-1, no dual doors.
- FSD's `segments-by-purpose` bans `components`, `composables` and `constants` as *segment* names (`W.md` §3.1). D's stratum names are layer names, and inside a unit the edict's `composables/` rules. That conflict belongs to the edict, not to D.

**Atomic Design** ([atomicdesign.bradfrost.com/chapter-2](https://atomicdesign.bradfrost.com/chapter-2/)) defines atoms, molecules ("collections of atoms that form relatively simple UI components") and organisms ("relatively complex components that form discrete sections of an interface"). Its author also says it "is not a linear process, but rather a mental model" and "is not rigid dogma".

The atom/molecule line is D's component/composition line. §2 measures how often it moved here: 37 flips in 703 commits. Atomic Design never asked for a directory per rank. D does, and that is where the churn comes from.

**The Clean Architecture dependency rule** ([blog.cleancoder.com](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)):

- "Source code dependencies can only point inwards."
- "The name of something declared in an outer circle must not be mentioned by the code in an inner circle."
- When control flows outward, an inner circle calls "an interface defined within its own layer" and the outer circle implements it. That is the Dependency Inversion Principle.
- "There's no rule that says you must always have just these four [circles]. However, The Dependency Rule always applies."

M02's `participation.ts → dockContext` is a named outer entity mentioned by an inner one. The DIP cure is PORTFOLIO §6 Q8's neutral injection key: `patterns/overlay` defines a hold-host key and dock provides it. The prototype took the cheaper promotion instead (§8), and that promotion is weakness 1.

**ArchUnit** ([archunit.org user guide](https://www.archunit.org/userguide/html/000_Index.html)):

- `layeredArchitecture().consideringAllDependencies().layer("Service").definedBy("..service..").whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")`
- `slices().matching("com.myapp.(*)..").should().beFreeOfCycles()`
- `FreezingArchRule` records "all existing violations to a `ViolationStore`" and reports only new ones.

D's gate is a `layeredArchitecture` (rank) plus a `beFreeOfCycles` per stratum (the intra-stratum DAG rule). It deliberately has no freeze. A violation store is a parked exemption list, which import-linter's default-`error` on stale ignores (`W.md` §8.1) and E-1 both reject.

**import-linter `layers`** (`W.md` §8.1) is the closest executable prior art. It has containers, `a | b` independence for same-rank siblings (D's component rule), `exhaustive`, and it reports the minimal cut, which is exactly §1's promotion set. There is no JS equivalent (W open question 4), so D's gate is custom: `D/gate.mjs`, 91 lines, under 1 s including the graph build.

---

## 7 · The strongest form (what D must specify to work)

1. **Strata and ranks.** foundation 0 · primitives 1 · substrate 2 · patterns 3 · components 4 · compositions 5 · entry anchors 9.
2. **Units.**
   - foundation is one unit.
   - In primitives, substrate and patterns, a unit is a charter row: a directory, plus one root row per stratum.
   - In components and compositions, a unit is the top directory.
   - Inside a unit, colocation is full and recursive: sub-components, `composables/`, constants, skeleton, styles. Intra-unit edges and cycles are free.
3. **Anchors** rank 9: every import may reach down from them, and nothing may import them.
   - `src/index.ts`.
   - The published doors that aggregate more than one unit (`./motion`, `./motion-core`). These live apart from any leaf dir: at HEAD `motion/core/index.ts` shares its dir with the leaves everyone imports, and a leaf-directory cycle tool reads that as a knot (§8.2).
   - The ambient `html-attributes.d.ts`.
   - Every **cascade root**: a stylesheet that holds only `@import`s. At HEAD that is `styles/{index,glass,tokens,theme,typography,utilities}.css` and `deck/styles/index.css`. This row is load-bearing, see weakness 5.
4. **Edges.** Value, type, dynamic `import()`, `@import` and `<style src>`, each resolved fail-closed. An unresolved `src` specifier fails the gate (W failure mode 5).
5. **Rank rule.**
   - Across strata, rank strictly decreases.
   - Inside strata 1, 2, 3 and 5, cross-unit edges are allowed, but that stratum's unit graph must be acyclic. The measured need is 11 edges in strata 1-3 and `easing → tabs` in 5.
   - Inside stratum 4, cross-unit edges are forbidden.
6. **Charter.** `src/strata.ts` is the source of record for lower-strata membership.
   - Rows are `{ path, reason }` only. Consumers and "published" are computed, never listed (P-3).
   - Every lower-strata file lies under a row, and every row path exists.
   - Each file passes the §3 rule: ≥2 units, or ≥1 unit and published, or 0 units and published.
   - How a public door counts is an owner ruling (§14).
7. **Promotion.** A promotion moves the file together with its in-owner dependency closure, or it fails the rank rule. `dockContext.ts` had to take `DOCK_CONTEXT_LABEL` with it. A symbol reached through a former owner's door is re-pointed to the pattern (`PagerDots.vue`).
8. **The public surface is placement-independent.**
   - The entry map is `name → path`. Common floor #6 is a precondition: D had to re-key `buildEntrySet`/`readTree` to read `components/` and `compositions/`.
   - One `SRC_OF_DIST` map is the only dist↔src coupling.
   - A release arm checks the four CSS export entries' flattened cascade against the previous build, modulo Vue scope ids. Not tests: see weakness 5.
9. **Bounds.** A per-unit directory and file bound (PORTFOLIO §6 Q6) applies inside every unit and every stratum root.
10. **Tests** mirror the strata (`tests/<stratum>/<unit>/…`). §4 measures that cost.
11. **Backend.** The same rules apply over `scripts/` + `build/`: lib 0 → domain 1 → build 2 → bin 3 (§12).

**Variant D′** is items 1-11 with the rank carried by a table over today's dirs instead of directory names. It removes reclassification churn (§2) and the rename cost (§4). It keeps `_shared` and `composables` as names whose meaning the table supplies.

---

## 8 · Prototype probes (worktree `D/wt`, each against a HEAD baseline)

**Baseline at HEAD** (`D/base-*.txt`):

- `vue-tsc --noEmit`: exit 0.
- `vue-tsc -p tsconfig.test.json` after the build: exit 0.
- `vite build`: exit 0.
- `vitest run`: 7 failed of 2,324. Three are `boot-graph` (no `dist-demo` in a fresh worktree). Four are timeouts under load: `slider.size-tokens` and `GlassDock.stagger` (browser hooks), `atoms.test.ts` fuzz 7.5 s, `comment-ratio` 23 s.

### 8.1 D′ carve: dissolve M02 and M03 and return the owned files, in today's dirs

`node D/move.mjs D/wt D/g-head.json D/placement-min.mjs mapMinOwners --apply` moved 19 files. Three hand hunks followed:

- inline `DOCK_CONTEXT_LABEL` into the promoted `dockContext.ts`
- drop the `isTeleportedTarget` re-export from the overlay door, now that the file is dock's
- (a first try also moved `accent-tone.css`'s `@import` out of `glass.css`; see weakness 5)

| check | result |
|---|---|
| gate (`D/charter-dprime-min.mjs`) | **22 → 2** violations: `useScrollScene`, `springProjection`, both dead and both owned by decisions outside D |
| `vue-tsc` src / tests | exit 0 / exit 0, 0 errors |
| `vite build` | exit 0 |
| `vitest run` | **2,310 passed, 3 failed** (the `boot-graph` trio, as at baseline) |
| export surface (`D/surface.mjs`: runtime `Object.keys` + TS `getExportsOfModule` per entry) | identical: 63 entries, 603 runtime names, 1,279 type names |
| four CSS export entries, flattened | byte-identical to HEAD |
| JS entry bytes | 16 of 131 export/typesVersions targets differ (chunk import paths) |
| `import-dag.mjs` | not run here. The unit-SCC computation of §1 shows M02 and M03 gone |

### 8.2 Full D rename (`mapD`, zones renamed)

The codemod moved 346 files and rewrote 853 specifiers and 271 literals. Hand edits followed:

- the same label and door hunks as §8.1
- a `PagerDots.vue` re-point to `patterns/pager/window`
- the entry-map re-key and the fold edits of §5

| check | result |
|---|---|
| gate (`D/charter-d.mjs`) | **0 rank violations**, 2 charter (the same dead pair) |
| `vue-tsc` src / tests | exit 0 / exit 0, 0 errors |
| `vite build` | exit 0 after the three fold fixes (first failure quoted in §5) |
| `node scripts/regen-exports.mjs --json` | `currentExportKeys 68 · emittedExportKeys 68 · drops [] · adds [] · targetMismatchCount 0 · EXACT_REPRODUCTION: true`, symbol fidelity 63/63. Soft drift: `stale: components/_shared, composables/specular` |
| export surface | identical: 63 entries, 603 runtime names, 1,279 type names |
| CSS | §5 |
| `vitest run` | **2,196 passed, 57 failed** in 14 files. 3 of those are the baseline `boot-graph` trio, so 54 tests in 13 files are the rename's. 3 files fail at load, so 60 tests go uncollected. Every rename failure is a path the specifier codemod cannot see (`ENOENT … src/components/dock/styles/run.css`, `… src/styles/track-well.css`) or an assertion about the old shape: `orphan-css-partial` expects `src/styles`, `public-surface` pins the dist file list, `feedback-tint-seam` and `spring-authority` grep allowlists by old path |
| `node scripts/import-dag.mjs` | value module SCCs 3. M01 (demo, unchanged). An 8-leaf-dir knot `primitives/motion/{core,morph,reveal,route,scroll,spring} + patterns/selection + substrate/pointer-field`, formed only by the `motion-core` door file living in `motion/core/`, hence §7 row 3. A dock-internal `compositions/dock ↔ dock/composables` pair, intra-unit and legal under D. **HEAD's M02 `{_shared, dock, menu, select, tabs, glass, motion}` and M03 `{dialog, sheet}` are gone** |

---

## 9 · The enforcement gate, RED at HEAD

`D/gate.mjs` (91 lines) with `D/graph-ast.mjs` and `D/origins.mjs`:

```
$ node D/graph-ast.mjs /Users/mkbabb/Programming/glass-ui D/g-head.json && node D/gate.mjs D/g-head.json D/charter-dprime.mjs
charter-0-unpublished  src/composables/motion/scroll/useScrollScene.ts  units=0 []  row=composables/motion/
charter-0-unpublished  src/composables/motion/spring/springProjection.ts  units=0 []  row=composables/motion/
charter-owned(1 unit)  src/components/_shared/overlay/isTeleportedTarget.ts  units=1 [dock/]
charter-owned(1 unit)  src/composables/glass/backdropLuminanceSample.ts  units=1 [dock/]
charter-owned(1 unit)  src/composables/glass/backdropSampleMath.ts  units=1 [dock/]
charter-owned(1 unit)  src/composables/glass/useGlassBackdropLuminance.ts  units=1 [dock/]
charter-owned(1 unit)  src/composables/glass/webgl/shaders/flow.glsl.ts  units=1 [aurora/]
charter-owned(1 unit)  src/composables/glass/webgl/shaders/flow.wgsl.ts  units=1 [aurora/]
charter-owned(1 unit)  src/composables/search/{match,types,useFuzzySearch}.ts  units=1 [dock/]   (3 lines)
sideways(component)    blob -> aurora · dialog -> sheet · sheet -> dialog · pager-dots -> deck · tabs -> select   (5 lines)
upward                 _shared/overlay -> dock · slider -> dock · composables/glass -> glass/webgpu (type) · composables/glass -> glass/canvas2d
upward                 composables/motion -> _shared (type) · composables/motion -> tabs
SUMMARY {"upward":6,"sideways(component)":5,"charter-owned(1 unit)":9,"charter-0-unpublished":2}
FAIL: 22 violation(s)                                                                    (exit 1)
```

**How it goes green:**

- the §1 promotion set plus the 10 owner returns clear 20 of the 22 (§8.1, on disk)
- `useScrollScene` moves to `demo/` (common floor #3; its gate fixture re-seats, L13-08)
- `springProjection` gets a ruling: tooling-only code in `src`. It moves to `scripts/`, or the spring row claims it with a demo or tooling reason, which the rule does not allow today

**Variants of the same gate:**

- `STRICT=1` (a public door does not count): 33 violations.
- No compositions declared: 41 violations (the 25 sideways pairs).
- Bite test: the earlier CSS-edge version reported `upward foundation -> src/components/chip/ (1) src/styles/glass.css:68 [css]` until cascade roots were anchored. The gate sees CSS.

---

## 10 · Full migration cost

| item | D′ | D |
|---|---:|---:|
| `src` files moved | 19 | 346 |
| specifiers rewritten | 107 | 853 |
| literal paths rewritten | 13 | 271 + the red residue (≤266 mentions in 89 files) |
| hand code hunks | 3 | 4 |
| build-config hunks | 0 | 15 (4 files) |
| test re-mirror (if tests mirror strata) | 206 files, either way | 206 files |
| reclassification per future flip | 1 table row | 1 dir move + about 15 specifiers |
| scripts/ | §12: the rank table plus 3 moves | the same, plus a `scripts/{lib,domain,bin}` + `build/` rename |
| governance | 22 charter rows + 11 composition rows | 20 charter rows |

Common-floor rows (PORTFOLIO §2.2) are excluded, as the portfolio directs, except where D could not build without them: the entry-map re-key (#6) and the dual doors that D's owner returns touch.

---

## 11 · Consumer surface

- **The exports map does not change: 0 keys.** 68 export keys and 62 `typesVersions` reproduce exactly on the D tree (`EXACT_REPRODUCTION: true`). The runtime and type export names of all 63 JS entries are identical in D′ and D.
- **CSS:** `./styles`, `./styles/theme`, `./styles/fonts`, `./styles.css` and `./fonts/*` keep their paths. Their cascades are identical (D′ byte-identical; D identical modulo scope ids).
- **Consumer-invisible changes:**
  - internal `dist/` paths (`dist/components` splits into `components`, `compositions`, `patterns`, `primitives`, `substrate`, `foundation` for declarations and copied CSS)
  - chunk file names
  - Vue scope ids (§5)
- **Two places a consumer-adjacent check will notice:**
  - `tests/public-surface.spec.ts` "ships exactly the style closure plus the three generated members" pins the dist file list, and it goes red under D
  - any visual baseline that keys on `data-v-*` attributes

---

## 12 · `scripts/` as the backend analogue, and a sibling backend

**Rank table over today's files** (`D/scripts-gate.mjs`):

- lib: `scripts/lib/{minify-css,canon-doc,paint-arm}`
- domain: `lib/subpath-policy`, `gen-component-styles`, `flatten-subpath-types`, `verify-export-types`
- build: the six `vite.*.ts` plugin modules
- bin: every other `scripts/*.mjs|sh`, plus `vite.config.ts`, `vite.iter.config.ts` and `vitest.config.ts`

```
$ node D/scripts-gate.mjs D/g-head.json
upward       lib->bin  scripts/lib/paint-arm.mjs:26 -> scripts/reflect-capture-verify.mjs   (also :28, :37)
lib-<2-units lib scripts/lib/canon-doc.mjs  units=0 [] other importers: none
lib-<2-units lib scripts/lib/minify-css.mjs  units=1 [vite.style-fold.ts] other importers: tests
lib-<2-units lib scripts/lib/paint-arm.mjs  units=0 [] other importers: tests-visual
FAIL: 6 violation(s)
```

**The cure.**

- `paint-arm` goes to `tests-visual/_support/`, since tests are not units.
- `canon-doc` is deleted (0 importers).
- `minify-css` goes to `build/`, its one unit.
- The shared helpers X.md counted enter `lib/`: 6 directory walkers, 8 repo-root resolutions, 4 sha256 helpers.
- `subpath-policy` becomes `domain/exports/` with regen and verify beside it.
- The CLIs become thin `bin/` files.

The D rename would add `scripts/{lib,domain,bin}` and a root `build/` for the plugins, with the same gate.

**Carrying to a sibling backend.** The mechanism is language-neutral: fixed ranks, units, a charter of reasons, and a rank + acyclicity gate.

- **value.js `api/`** (Hono): `platform/` (db, http, cache) is rank 0. `modules/<domain>/` is rank 1, and like D's components these may not import each other. The app/router assembly is the entry anchor. Inside a module, route + service + repository + schema colocate. D ranks units, not file kinds, so speedtest's `routes/ services/ validation/` kind layers would be dissolved into modules, not ranked.
- **Python** (fourier `api/`, sci-report `atlas_data`): import-linter's `layers` contract enforces this directly: `api.main | api.<domains> | api.lib`, `|` for independence, a stale ignore fails the run.
- **Rust:** crate dependency order is already a rank the compiler enforces.

---

## 13 · Weaknesses (named counterexamples on this tree)

1. **Promotion de-colocates.** To break M02, `dockContext.ts`, the dock's own context with 8 dock importers, had to leave dock for `patterns/overlay/`, taking `DOCK_CONTEXT_LABEL` with it. `ModalOverlay.vue` leaves dialog. `sheet/motion.ts` leaves sheet. `aurora/constants/budget.ts` leaves aurora. The full D moves five of deck's own files into `patterns/pager/`. The edict's "otherwise they're to be COLOCATED" reads against every one. The DIP alternative (§6) keeps dock's context home but adds a second injection key.
2. **The composition line moves with the code.** 37 flips over 27 dirs in 703 commits; `card` flipped twice in one day. Under D each flip is a directory move and a rewrite of its roughly 15 importing specifiers.
3. **Compositions compose compositions.** `easing → tabs` exists at HEAD, and chains reached depth 5 in June-August. A strict rank needs sub-ranks or a ban. §7 allows intra-stratum DAGs, which gives up "rank strictly decreases" inside strata 1, 2, 3 and 5.
4. **The lower strata are DAGs, not layers.** 11 cross-unit edges inside primitives and patterns (`motion → dom → reactive`, `overlay → surface → (root)`) are unavoidable. A reader cannot tell from the directory which primitive may import which; only the gate knows.
5. **The CSS cascade interleaves strata.**
   - `index.css` places `dark-mode-toggle`, dock, card and `_shared/feedback` CSS before `transitions`/`animations`, and `card/scroll.css` between `scroll-choreography` and `scroll-chrome`.
   - `glass.css:68` imports `chip/accent-tone.css` in the middle of the glass register.
   - The first D′ carve obeyed the rank rule by moving that `@import` to the entry after `glass.css`. That moves `.accent-tone{--accent-band-strength:18%}` after `.glass-chip{--accent-band-strength:max(18%,calc(var(--chip-tint-floor) + 10%))}`. Both are in `@layer components` with equal specificity, and every chip carries both classes (`chipVariants.ts:4`). The resolved band strength on every chip drops from 22% to 18%, by the cascade, not paint-verified.
   - **`vitest run` stayed green (2,310 passed)**. Only the flattened-cascade hash caught it.
   - Cascade roots must be anchors (§7 row 3), and the cascade-identity arm is required.
6. **Owned-but-published has no clean rule.**
   - Counting a public door as a unit keeps 7 single-owner hooks global (`useDragVelocity`, `useAccentTone`, `useScrollChrome`, `useScrollProgress`, `useRoutePointer`, `useCanvas2D`, `useDockCtaReceive`), against L13's reading of N-1.
   - Not counting it pulls generic public hooks into compositions: `useClipboard` → easing, `useRAFLoop` and `useYieldToMain` → dock. It also forces door splits, because `primitives/color/index.ts` (337 lines, 11 local functions, also the `./color` door) would re-export from `components/chip`, an upward edge.
7. **Doors inside leaf dirs knot.** `motion/core/index.ts`, the `./motion-core` door, re-exports 14 leaves from 7 dirs while living beside the leaves everyone imports. `import-dag.mjs` reads the D tree's motion strata as an 8-dir SCC until the door moves out.
8. **The dist layout is encoded three times.** D broke all three: the fold's root derivation, the fold's copy and post-process roots, and `gen-component-styles` `outputMember`. The first D builds failed, then shipped duplicate fonts, then shipped unminified CSS, before the one map landed.
9. **Rename residue.** After 853 specifier and 271 literal rewrites, 54 tests in 13 files still failed on segment-built paths and old-shape assertions (`g-dock-lattice` 27, `Surface.test` 13, `orphan-css-partial` 6, …), with up to 266 unprefixed mentions left. D′ had none.
10. **Tooling-only source has no stratum.** `springProjection.ts` is read by a script, the demo lab and tests, and by no library unit. The charter rule marks it dead.
11. **Scope-id churn.** Every SFC whose import lines change gets a new production `data-v` id (15 of 16 in the D bundle). This is harmless to consumers but churns any DOM-keyed visual baseline and the bundle ratchet.
12. **Governance weight.** 20 to 22 rows of reason prose, plus (in D′) 11 composition rows. The reasons are unverifiable text. Only membership and consumer counts are checked.

---

## 14 · Open gaps (what keeps this from a complete executable spec)

1. **Does a public door count as a consumer unit?** (§3, weakness 6.) The answer changes the owner returns from 9 to 20 and decides whether published barrels must split into door and module. Owner ruling.
2. **Compositions of compositions:** allow as an acyclic stratum (as prototyped), ban, or sub-rank by computed height.
3. **Promotion or inversion for M02.** The prototype promoted `dockContext.ts`. The DIP neutral key keeps dock colocated and costs one extra provide. Not built here.
4. **Where aggregate doors live** (`./motion`, `./motion-core`): an `entries/` location or `src/` root. Not built. Required before `import-dag` stops seeing a motion knot.
5. **Tests.** Mirror per stratum (206 moves, measured, not executed), or colocate. The 54-test residue of §8.2 was diagnosed, not fixed.
6. **The cascade-identity arm** belongs in the release path. Where it sits against E-8's 40-60 gate budget is undecided.
7. **Rulings for the 2 dead modules** (`useScrollScene` is common floor #3; `springProjection` has no decision).
8. **The size bound** per unit and per stratum root was not measured on the D tree.
9. **`demo/`** was rewritten mechanically (138 specifiers). Whether it may reach into strata below the public doors is PORTFOLIO §6 Q7 and was not decided here.

---

## 15 · Reproduction

All scripts are in `D/`, run from there.

- **Graph:** `node graph-ast.mjs <root> g.json`
- **Layering:**
  - `node layering.mjs g.json value,dynamic`
  - `node layering-doors.mjs …`
  - `node layering-d.mjs g-D.json`
- **Gate:**
  - `node gate.mjs g.json ./charter-dprime.mjs`
  - `STRICT=1 …`
  - `ROWS=1 …`
- **Virtual placement:** `node remap.mjs g-head.json ./placement.mjs mapD g-D-virtual.json`
- **Codemod:** `node move.mjs <root> g-head.json ./placement[-min].mjs <mapMin|mapMinOwners|mapD> [--apply]`
- **History:** `node history.mjs` (writes `history.json`)
- **Dist comparison:**
  - `node flatten.mjs dist/styles/index.css out.css`
  - `node cssident.mjs a.css b.css`
  - `node surface.mjs <dist> package.json out.json`
  - `node distdiff.mjs <distA> <distB> package.json`
- **Test mirror:** `node testmirror.mjs`
- **Scripts gate:** `node scripts-gate.mjs g-head.json`
- **Saved diffs of the two probes:** `D/dprime.diff` (3,374 lines), `D/d.diff`, with `D/*.status`
