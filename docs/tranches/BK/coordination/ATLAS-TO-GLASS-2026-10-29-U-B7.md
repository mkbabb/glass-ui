# Atlas to glass-ui · U/B7, U/B7b and U/B7c · the batched relay letter

Status: READY for the orchestrator to deliver after B7c lands. B7c L (2026-10-29) added the no-commit asks G-M1-1 to G-M1-3 and G-L-1, question 7 and the PL-1 withdrawal; the head is unchanged at 01ec9e998 (RULINGS §S, S-6). Repaired 2026-10-29 after verification: the release state and base, the 10.1.2 merge and ratchet, the C3-1 `pointer-events` wording, and the doc-only rows. Nothing here has been sent. This one letter replaces the B7b draft (`B7B-GLASS-RELAY.md`), which is not sent separately. Proposed path in glass-ui: `docs/tranches/BK/coordination/ATLAS-TO-GLASS-2026-10-29-U-B7.md`.

Wave U/B7 to U/B7c · owning repo glass-ui · proposed vehicle **10.2.0**. Two rows remove public names with no alias (questions 1 and 2 ask whether that makes the release a major).

The atlas formation built every row on the local branch `u/b7-glass` in worktree `~/Programming/.u-build/b7-glass`. The branch started from `release/10.1.1` at bbf176f02 and already holds the published `v10.1.1` (d7baa1dc3). The published **`v10.1.2`** (94ed7b1f0, 2026-10-27) is merged in at 9ac3cfa49, so every row below sits on top of 10.1.2. The head is **01ec9e998**. Nothing was pushed, tagged or published; `package.json` reads 10.1.2, from the merge. Please take, re-author or decline each row. Until your release, atlas and sci consume a local build of this branch, and neither adds an override of glass.

The merge was chosen over a rebase because RULINGS, the B7 and B7b reports and this letter cite the branch's commit ids; a rebase would rewrite all 37. It had four conflicts. `CHANGELOG.md` and `MIGRATION.md` keep the proposed 10.2.0 section above 10.1.2's. `dockMorphMeasure.ts` takes 10.1.2's measure whole (see B7-G9 below). `.bundle-ratchet` was rebound on the merged tree (C3-9).

The owner's order of 2026-10-19 (sci-report `atlas/docs/tranches/U/owner-2026-10-19/ORDER.md`) asks for:
- subtle glass-ui tabs and a less rounded pill;
- a per-figure dock that collapses;
- dropdowns that stay inside the viewport;
- a background that does not flash on scroll;
- less CSS and JS on first paint.

It says that "all glass-ui changes should be made at the root." `CHANGELOG.md` and `MIGRATION.md` on the branch carry every row under "10.2.0 (proposed by atlas U/B7)", above the published 10.1.2 section.

## Rows

Each row has a test that fails before its commit and passes after it. Where a row names no test file, the test is in its lane doc.

### G1 · shape, glide and the dropdown system (lane doc `B7-GLASS-SHAPE.md`, merged at 30c1da158)

| Row | Change | Commits | Consumer impact | Test |
|---|---|---|---|---|
| B7-G1 | SegmentedTabs glides at its own size in one leg. The eyeglass deform, the press squish and the capsule hover scale are removed; hover changes colour only. New token `--hover-ink-mix: 45%`. | 629773393, 129e8b1ec | Removed with no alias: `eyeglass.ts`, `--eyeglass-span-max`, `data-eyeglass-wake`, `data-eyeglass-clamped` and the label `transition-delay`. Atlas and sci declare none of them (question 1). | `SegmentedTabs.glide.spec.ts`, Chromium and Firefox |
| B7-G2 | DockLayerGroup uses the same glide. The `--stretch` velocity law is deleted. | ca7f5aa10, d22e84ea3 | Removed from `/motion-core`: the `deform` parameter, `SelectionDeform`, `squishOnTravel`, `--tab-indicator-max-stretch` and the tabs indicator's `--stretch` channel. Atlas and sci call none of them. | `DockLayerGroup.glide.test.ts` |
| B7-G3 | Capsule hover and the ToggleGroup press have no scale. | 58522dd79 | Visual only. Button, Switch and Checkbox still scale on press. | `press-scale.spec.ts` |
| B7-G4 | `--radius-pill: 1rem`, plus the new `--radius-circle: 50%` and `--radius-bar` (= `--radius-panel`). All 91 radius uses in 43 files are sorted into circle, stadium or corner. Button, ToggleGroupItem and SegmentedTabs take `data-shape="bar"` past their rung. | dbd43fd15, 7c8e8b0d1, e109040f6, b54f5e13d | Visual: a box taller than 32 px shows 16 px corners, and a wrapping control or one wider than 20rem shows 12 px corners. New public tokens `--radius-circle` and `--radius-bar`. | `radius-scale.spec.ts` |
| B7-G5 | GlassDock props `expandOn` (`"hover"` or `"press"`), `anchor` (`"start"`, `"center"` or `"end"`) and `collapsedLabel`. The defaults keep today's dock. | a88999b6b | Additive. | lane doc |
| B7-G6 | One dropdown system. DropdownMenu defaults to `modal: false`, and no menu or Select lock sets `overflow` on `body`. The Select is bound by the room and has a bottom-sheet form below 30rem. DropdownMenu, Popover and Select use collision padding 16 and `max-inline-size: min(22rem, 100vw - 2rem)`. | 16274926d, e109040f6 | The `modal` default flips; a consumer that relied on the lock passes `modal`. SelectContent `sideOffset` defaults to 4. The root gets `scrollbar-gutter: stable`. | `DropdownMenu.scroll-lock.spec.ts`, `Select.bound.spec.ts`, `Sheet.position.spec.ts`, `overlay-sizing.spec.ts` |

### G2 · styles, aurora and the dock hit box (lane doc `B7-GLASS-PERF.md`, merged at 305ed107a)

| Row | Change | Commits | Consumer impact | Test |
|---|---|---|---|---|
| B7-G7 (F5) | Six per-component sheets leave `/styles`. Configurator, MusicStaff, Metric, Deck, Carousel and SortableList import their own sheet from script, and `vite.component-sheets.ts` keeps the import external. | 0f8d6b222 | A consumer that writes these class names without rendering the component loses their rules. Node-run tests meet `.css` imports (question 2). Consumer entry 353,516 → 323,178 B decoded, by G2's measure. | lane doc |
| B7-G8 | Aurora loads its WebGL and WebGPU engines on arm, one backend at a time. The fallback ground is encoded once per palette and preset, and a ground change crossfades two layers. | 7af15bc97, 6884554cb | `aurora.js` 203,503 → 27,037 B. New: `auroraGroundKey(config)` and `GpuSubstrateOptions.prepare`. `.aurora-placeholder` is now two elements, so select `[data-aurora-ground-active]`. A nuclei-only config change no longer moves the static ground. | lane doc; Chrome for Testing WebGL witness |
| B7-G9 | A vertical dock's seats can be hit mid-morph. Click integrity defers only a flip opened by a hover approach. In Firefox, a wheel at the end of a run no longer scrolls the page. | b86c1cfea; measure part superseded at 9ac3cfa49 | A consumer that delayed its scrim or row handlers to wait out the click-integrity window can arm them on open. B7's measure fix (a `scrollHeight` read clamped at `max-block-size`) is gone in the merge: 10.1.2's O-101 measure lays the run out at rest in the expanded posture and yields the same capped span. | `u-b7.spec.ts` D-5, green on the merged tree in chromium-desk, chromium-coarse, firefox-desk and firefox-phone; the two D-5 arms of `dockMorphMeasure.test.ts`, re-expressed on 10.1.2's layout model |

### X3 · B7b acceptance fixes (lane doc `B7B-GLASS.md`)

X3-4 was an early ratchet rebind that X3-7 replaced, so it is not on the branch.

| Row | Change | Commit | Consumer impact | Test |
|---|---|---|---|---|
| X3-1 | `verify:package` was red: the packed-CSS check called 11 sheets unreachable. The CSS closure is now seeded from every `.css` that a chunk reachable from a code export imports. `_shared/field/control.css` is no longer published by mistake. | a3342be81 | None. The unloaded `dist/components/_shared/field/control.css` is gone. | `public-surface.spec.ts`, `component-sheets.test.ts` |
| X3-2 | The utility emit compiles glass's own `@utility` classes. Seven shipped tokens (`shadow-cartoon`, `glass-plate`, `sheet-animate`, `table-head`, `text-mono-caption`, `transition-control`, `transition-disclosure`) had compiled to nothing in `components.css`. | 8430a3549 | They no longer depend on the `@source "../*.js"` scan. `components.css` 23,129 → 25,633 B. | `emitted-own-utilities.test.ts` |
| X3-3 | SFC styles load with their chunk. `cssCodeSplit` is on; each of the 25 chunks that own styles imports its sheet, and each sheet opens with the declared layer order. `dist/glass-ui.css` no longer exists. | 5022db62b | The consumer CSS entry falls 322,551 → 282,605 B decoded (brotli 42,129 → 36,548). The rules moved to chunk sheets (41,802 B in all), so an app pays back whatever its routes import. SFC rules now load after the entry, still in `@layer components`. | `sfc-sheets.test.ts` |
| X3-5 | The declarations drop side-effect stylesheet imports. vue-tsc had copied `import "./styles.css"` into 14 `.vue.d.ts` files, which failed an installed consumer's TypeScript with TS2882. | d9d477059 | Fixes a latent G2 break. | `public-surface.spec.ts` |
| X3-6 | `verify:package`'s install arm loads `.css` as an empty module. | 1106d2470 | **Break, named in MIGRATION:** without a CSS loader, plain Node can no longer import the root barrel or any styled subpath (question 2). | `verify:package` install arm |
| X3-7 | Bundle ratchet rebind 2,925,581 → 2,933,190. | ca0a7721c | None. | `verify:package` |
| X3-8 | Docs only: the X3 CHANGELOG entry measures its saving against a b54f5e13d build (322,551 B), not G2's head figure. | 1dc80a3d6 | None. | none (docs) |

### M1 · B7b dock and engines (lane doc `B7B-DOCK.md`, merged at 8b55f9594)

| Row | Change | Commit | Consumer impact | Test |
|---|---|---|---|---|
| M1-1 | The Select's sheet form below 30rem wears the opaque rung, and `DropdownMenuContent` took a `surface` prop for the same purpose. | d44311a30 | The `surface` prop was replaced by L-G1 before landing. Only the opaque Select sheet remains from this commit. | `sheet-opaque.test.ts` |
| M1-2 | A closed sheet lets go of the page at the dismissed edge. `useSpringMount` held `present` until the underdamped exit spring settled, 1.5 to 1.9 s after the sheet had left the screen. Through that window the scrim stayed mounted and the page stayed locked. `present` now ends when the position reaches the dismissed edge (within a pixel). | 2ede65742 | A tap or scroll on the page right after a close now lands. The drag-dismiss callback still waits for the settle. | `useSpringMount.test.ts` (37 frames late before, at most 1 after) |

### L · B7b land root fixes

| Row | Change | Commit | Consumer impact | Test |
|---|---|---|---|---|
| L-G1 | A dock menu at sheet width takes the opaque rung from the register, not from a prop. `DropdownMenuContent` reads the dock stamp and the viewport through one `useSheetWidth` in `_shared/overlay`. This supersedes M1-1's `surface` prop. | 87494c6d4 | No new prop. Atlas 8078ee9 dropped its `surface` use. | `sheet-opaque.test.ts` (fails on d44311a30) |
| L-G2 | A closing sheet or dialog returns focus without scrolling the page. `SheetContent` and `DialogContent` answer close-auto-focus themselves (`returnFocusQuietly`, with `preventScroll`). | 79a9e3eea | A consumer that cancels the event keeps its say. WebKit no longer scrolls the page to a plate on close; the census had measured moves of 16 to 1,384 px in 36 of 156 closes. | `sheet-return-focus.test.ts` |

### C3 · B7c root items (lane doc `B7C-GLASS.md`)

| Row | Change | Commit | Consumer impact | Test |
|---|---|---|---|---|
| C3-1 | A modal holds the page through the root, not by locking `body`. reka's `DialogOverlay` takes `useBodyScrollLock`, which writes `overflow: hidden` and padding onto `body`, and atlas's homepage finder (a modal CommandDialog) failed the body-free rule in 4 of 4 cells per engine. `ModalOverlay` now mounts its own scrim (`ModalScrim`, reka's overlay without the body lock) under reka's `Presence`. The scrim holds the one counted root lock that ExpandableContainer already used, now in `_shared/overlay`. One `body` write stays: reka's `DismissableLayer` sets `body` `pointer-events: none` while a modal is open, so the page behind takes no pointer. That guard is modal semantics and is kept; on close `body` gets back the consumer's own inline value. | 769806a7f; 4f1849100, 0e5b5a98f (repair) | While a modal is open, `html` carries `overflow: hidden`, and `body` keeps its overflow and padding. reka's `--scrollbar-width` variable and the `body` padding compensation are gone, and `scrollbar-gutter: stable` keeps the layout still. A consumer that detected an open modal from `body.style.overflow` reads the root instead. | `modal-root-lock.test.ts` (5 of 5 red at 79a9e3eea; the two pointer-events arms fail there on their overflow assertion and pin the guard); `CommandDialog.b7c.spec.ts`: red before in Chromium, green in Chromium and Firefox on the merged head; green in WebKit 2287, 2 of 2, on 01ec9e998 |
| C3-2 | A command palette group keeps its content height. reka's `ComboboxContent` is an inline flex column, and `.command__group { overflow: hidden }` let a long list shrink a short group to fit: the palette's "Dashboards" group measured 46 px of its 341, with its heading under "School units". The group is now `flex: none`. | 65404b861 | Visual: every group shows its rows, and the list scrolls. | `group-flex.test.ts`; `CommandDialog.b7c.spec.ts` |
| C3-3 | `ContextMenu` is its own root. The parts dispatched through one table of all 28 reka menu primitives, so every DropdownMenu consumer bundled the ContextMenu family. Each root now provides its own table, and the parts import neither family. | 632225491 | **Break (question 1):** `<DropdownMenu trigger="context">` becomes `<ContextMenu>`, and the public `MenuTrigger` type is removed. The parts are unchanged. Known call sites: speedtest `AdminSessionsTable.vue` and `ResultsTable.vue`, and bbnf-buddy `ControlPointOverlay.vue`. Atlas and sci have none. | `click-family-graph.test.ts` (14 of 15 red before) |
| C3-4 | The live backdrop observer runs no frame loop. `useGlassBackdropLuminance` requested a frame every frame while a field canvas existed, in order to take a 4 Hz sample. The canvas lifecycle now announces each frame it draws (an internal event). The observer samples, throttled to 4 Hz, on its field's paint, a scroll, a theme or colour-scheme change, or a transition ending on the field. | e3a3dd041 | None for glass fields (Aurora, Blob and every glass canvas lifecycle). A `backgroundCanvas` drawn outside the lifecycle is sampled on mount, resize, scroll and theme change, not on its own frames. | `useGlassBackdropLuminance.live.test.ts` (126 frame requests in 2 s at rest before, 0 after); `useCanvas2D.test.ts` |
| C3-5 | A press control at rest reads no computed style. Z0 put 248 ms of /sci phone load on `effectiveCap`'s `getComputedStyle`, one read per Button plus a second render. At rest the stretch is 1 whatever the cap, so the cap getter does not read the element until a press moves the spring. The `:root` `--motion-tempo` read at spring construction is shared by every construction in one task. | b84ea7bfd | None: the feel is unchanged. | `press.test.ts` (12 root reads for 12 controls before, 1 after) |
| C3-6 | `SHEET_QUERY` is module-private. L-G1 exported it with no reader, which left G-OVERFIT's export-reach gate red at 79a9e3eea. | 360ae623a | None. | `overfit-structure.test.ts` (red at 79a9e3eea) |
| C3-7 | Bundle ratchet rebind 2,933,190 → 2,943,130. 79a9e3eea already packed 2,935,217 B (M1 and L never ran `verify:package`), and C3 adds 7,913 B. Superseded by C3-9. | 7bad5d9f4 | None. | `verify:package` |
| C3-8 | Merge of the published `v10.1.2` (94ed7b1f0). Four conflicts, resolved as above. | 9ac3cfa49 | Under the 10.2.0 rows the branch now carries 10.1.2's dock changes: declared seats, the O-101 endpoints and the disabled DockTrigger. | 10.1.2's `release-10-1-2.spec.ts` on the merged tree: 52 of 52 in chromium-headless-new and 52 of 52 in coarse-touch; The WebKit 2287 run of that spec waited 30 min behind other seats on the exclusive lock and was stopped, so it is owed. Whole vitest green. |
| C3-9 | Bundle ratchet rebind 2,943,130 → 2,951,880 on the merged tree, then → **2,951,958** for the repair's CHANGELOG and MIGRATION wording (+78 B). 10.1.2 binds 2,934,538, so this branch adds 17,420 B over the published line. | 4901b5c25, 01ec9e998 | None. | `verify:package` |
| C3-10 | Docs only: the C3 CHANGELOG and MIGRATION entries, and the repair's correction of the C3-1 `pointer-events` wording. | f5dbfddee, 0e5b5a98f | None. | none (docs) |

**Consumer bytes for C3.** These were measured in minimal Vite consumers built against each `dist`: base 79a9e3eea, head 7bad5d9f4. Raw JS / brotli-11:

| Import | 79a9e3eea | 7bad5d9f4 |
|---|---|---|
| `/menu` (DropdownMenu, Trigger, Content, Item) | 228,799 / 66,983 | 219,566 / 66,112 |
| `/dock` + `/menu` + `/button` | 278,801 / 80,853 | 269,007 / 79,840 |
| `/command` (CommandDialog and parts) | 239,617 / 73,235 | 239,548 / 73,444 |

- The CSS entry (Tailwind, tw-animate-css and `/styles`) is 282,605 B at both heads.
- The B7b figure of 39,922 B counted reka's shared Menu core and DropdownMenu as well as ContextMenu. Only the ContextMenu share (about 9.2 KB raw, 0.9 to 1.0 KB brotli) was dead weight in a click-only consumer. The rest is the price of the menu itself.

The byte table is the pre-merge measure. 10.1.2 changes only the dock, so the `/menu` and `/command` rows are not expected to move; the dock row was not re-measured.

**Checks at the merged head** (every run through `guarded`; typecheck and vitest ran at 4901b5c25, and the two later commits change only CHANGELOG, MIGRATION and the ratchet):
- `npm run build`, `npm run demo:dist:build` and `npm run typecheck` all exit 0.
- Full vitest (`--maxWorkers=2`): 259 files; 2,447 passed, 10 expected fail, 1 skipped.
- `verify:package`: terminal CLEAN. 193 claims, 457 declarations, 149 CSS files, roster 291 of 291, ratchet equal at 2,951,958.

### B7c M1 to M3 and L · asks with no glass commit

The B7c lanes M1, M2, M3 and L made **no glass commit**. The branch head stays 01ec9e998, and that is the head atlas and sci plant. These rows are asks, measured in the served sci build; glass decides how to cure each.

| Row | Ask | Evidence |
|---|---|---|
| G-M1-1 | `DropdownMenu.vue` provides `CLICK_MENU_FAMILY`, which names every reka DropdownMenu part. A consumer that renders only the root and a trigger therefore bundles reka's menu content, popper, dismissable layer, focus scope and floating-ui. The root should provide only what the root and the trigger need, and each part should bind its own primitive. Atlas loads its More menu on first use (atlas 91514a3), so the ask covers every other consumer. | sci entry falls 125,808 → 105,780 B brotli when the root leaves the entry (B7C-PERF §6) |
| G-M1-2 | `dockMorphMeasure` reads `offsetHeight` and `offsetWidth` synchronously in watchers, which forces layout while the page mounts. Measure in a read phase (rAF or ResizeObserver). | the top named self-time function in the /sci phone load profile, 60 ms; /sci phone TBT is 337 ms against 200 |
| G-M1-3 | `DockTrigger` imports reka's Select, Popover and DropdownMenu triggers and roots for every consumer, whichever `for` it renders. | 14,488 B raw of reka trigger code in the sci entry |
| G-L-1 | **Press scale on Button, the Select trigger and `.tap-squish`.** PLAN §4.2 (the product motion budget) says no element's computed `scale` differs from 1 during hover or press of a button, chip or tab. B7-G3 removed the capsule hover and the ToggleGroup press, and kept the press on Button, Switch and Checkbox. The served /sci at 1440 still squashes 10 to 11 of 14 pressed controls: glass Button through `useLiquidPress` (about `scale(1.01, 0.96)`: Close, Previous and Next school year, Stop, CSV, JSON, SVG) and the Select trigger through `.tap-squish` (`scale: 0.96`). Atlas and sci carry no override. See question 7. | B7C-ACCEPT §3 "Press scale"; B7C-LAND §5 |

**PL-1 is cured in atlas, not glass.** B7C-PLANT proposed a glass row: the 10.1.2 morph scales a vertical dock from its centre, so the 1440 rail's crest left the pointer and the hover expand looped. Glass already has the cure in its API. B7-G5's `anchor` prop moves the morph origin to the named edge. The atlas rail is pinned at its block start and now passes `anchor="start"` (atlas a62ddbe). The atlas Chromium engine lane passes 269 of 269 with 1 skipped. The proposed PL-1 row is withdrawn.

## Questions for glass's 10.2.0 owner

1. **OD-5 and the removals with no alias.** Should these ship in 10.2.0, or do they need a major?
   - B7-G1 removes the documented arming hook `--eyeglass-span-max`. The atlas census (R-TABS §4) and sci's census find no consumer.
   - C3-3 removes `trigger="context"` and `MenuTrigger`. Three known call sites, in speedtest and bbnf-buddy, chase it as a one-line change each (MIGRATION shows the diff).

   PLAN §12 OD-5's default is "glass's call; proposed in 10.2.0". The formation does not decide this.
2. **The CSS-in-JS runtime contract (F5, X3-3, X3-6).** Do you accept that component chunks import their stylesheets?
   - If you accept, plain Node needs a CSS loader to import the root barrel or any styled subpath. Is that a 10.2.0 minor or a major?
   - If you decline, F5 and X3-3 go back together, because the 30 KB and 40 KB entry cuts both depend on the contract.
3. **The token diet (B7-G7 ask, not built).** The consumer entry carries 158 `@property` rules (10,419 B) and 893 custom-property declarations (82,165 B).
   - No shipped CSS or JS reads 24 of the `@property` rules (1,594 B) or 52 of the declarations (3,029 B). Of those 52, 33 (1,784 B) are not published names.
   - Deleting the unread names saves under 5 KB. A real diet is a design change to the token set.

   Do you want to take it on, and in which vehicle?
4. **The `@source "../*.js"` backstop.** Removing it would save another 27,194 B (282,605 → 255,411). It is not built, for two reasons:
   - The utility emit skips 21 arbitrary-variant classes and 3 arbitrary-property classes, which reach consumers only through the scan.
   - The emitted copies sit in `@layer components` and the scanned ones in `utilities`, so a component rule could start beating a utility class.

   Do you want the emit widened and the backstop retired?
5. **The ratchet.** B7b asked you to accept 2,933,190. With 10.1.2 merged in, the branch now needs **2,951,958** (C3-9), which is 17,420 B over 10.1.2's 2,934,538. Accept it, or re-bind at your cut.
6. **The release vehicle.** 10.1.1 (2026-10-20) and 10.1.2 (2026-10-27) are published, and this branch contains both. A local `release/10.1.3` branch (head 80f13adfe, 26 commits past 10.1.2, dock press-end fixes for value.js O-110) is not published and not merged here. Please answer per row: yes, re-author or no. Also tell us:
   - whether 10.1.3 ships before 10.2.0. If it does, this branch merges it before your cut, and the ratchet moves again;
   - whether atlas can drop its M-7 compensation now that 10.1.1 is published;
   - the release you expect these rows in.

7. **The press scale (G-L-1).** Should Button, Switch, Checkbox and `.tap-squish` stop scaling on press, as PLAN §4.2 asks? Removing `useLiquidPress` from Button changes glass's press identity for every consumer, so the formation does not build it. Until you rule, register row MO-03 is held on this question.

## The request

Please **cut glass-ui 10.2.0** from these rows, or from your re-authoring of them. Atlas and sci then pin and lock it, which clears sci's `u-b4-plate-chase` (hold HO-6, P-4). Until then both consume a local plant of this branch against the 10.1.0 pin; from this head the plant is labelled 10.1.2.

## Notes for atlas and sci when they plant this head

- A Node-run suite that imports a glass component needs glass inlined, with vitest `server.deps.inline: [/@mkbabb\/glass-ui/]`. Atlas has this; sci's vitest needs the same.
- With C3-1, an atlas or sci test that asserted `body` overflow under a modal reads `document.documentElement.style.overflow`. The atlas O-11 census row for the homepage finder should now read body overflow `visible`. `body` `pointer-events` still reads `none` while the finder is open; that is reka's modal guard, not a lock.
- The plant carries 10.1.2's dock contract: a custom dock seat needs `data-glass-dock-seat` to rove (10.1.2 MIGRATION). Atlas's dock census should run on this head.
- C3-1 and C3-2 are green in WebKit 2287 (`tests-visual/b7c-webkit.config.ts`). Still owed in WebKit: 10.1.2's `release-10-1-2.spec.ts` on the merged tree (`GLASS_UI_DEMO_PORT=7987 guarded --exclusive webkit -- npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 release-10-1-2`).
- No served-app check of C3 has run in atlas or sci yet. The land seat's O-11 census, the dock census and the entry-JS measurement on sci should cover it.
