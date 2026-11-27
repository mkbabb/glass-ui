# DataTable and Dialog for atlas: critique (O-429 GL-5 (a), (b), (d) and GL-10)

## Round 1, the SCI critic (2026-11-24): holds after fixes, three items blocking

Seat: claude-opus-5-5, asserted from its own system identity. It read `DESIGN.md`, `ROOT.md`, `NOTE-atlas.md`, `cure.patch`, `tools/harness/{probe.mjs,readings.mjs,build-tree.sh,serve.sh,app/*}`, glass's `data-table/`, `table/`, `dialog/`, `sheet/styles.css`, `useSpring.ts`, `useSpringMount.ts` and `exitClock.ts` on release/11.1.1, keyframes.js 6.0.0's `RAFPlayback.drive`, and atlas's `SourceDataBrowser.vue`, `DataDialog.vue` and `useVirtualWindow.ts` on lv-atlas (da0528f). No source on any branch was changed and nothing was staged.

What this seat ran:

- `git archive release/11.1.1` (now 14506233e; `src/`, `tests/` and `demo/` are identical to 48ab5d94e) into `trees/sci-base` and `trees/sci-cure`, `node_modules` linked. `cure.patch` applies with repository discovery off. On a copy of `design/atlas-rows-1112/trees/green` it fails only at `data-table/styles.css:69`, as ROOT §5 says.
- vitest, two workers. Cure: 21 files, 164 of 164. The cure's tests on 11.1.1's `src/`: 14 fail, exactly the 14 ROOT §5 lists. `vue-tsc --project tsconfig.src.json` on the cure: clean.
- Both demos built with the builder's page plus this seat's (`trees/sci-harness`, deleted after the run, see the end). Playwright's Chromium headless shell 149 and WebKit 26.5 (not Safari), headless, one browser per run, a context per cell, every run under `guarded`, WebKit under the exclusive lock. Load 27 to 41 during the runs.
- The builder's `probe.mjs`, unchanged, on both trees in both engines: the eight verdicts in ROOT §1 reproduce cell for cell (RED on 11.1.1, GREEN on the cure, `dialog-rm-1440` GREEN on both).
- This seat's cells: atlas's data view built the way the note tells atlas to build it (table and cards), a Dialog whose body mounts late, a Dialog whose origin is `document.body`, `fit` against a cell wider than its width, the stuck ground's pixels, a sized block host with a sibling, two unit probes.

### Verdict

The table half holds. The sticky header and first column, the card projection's role, `fit`, the caption and the row header all do what ROOT says, in both engines. atlas's table projection, rebuilt per the note's steps 1, 2, 3, 4 and 6 with atlas's virtualization CSS, works in both engines: the viewport is bounded, the window mounts 33 to 44 of 2,000 rows, `fit` shows 7 columns with no sideways scroll, the header sticks after 1,500 down, and without `fit` the first column sticks inside atlas's absolutely placed rows after 800 across. Two of the note's instructions fail when built (B-2, B-3). The Dialog meets every judged cell, but the cell does not judge the frame that breaks it (B-1).

### Blocking

**B-1. A long frame inside the entrance moves the plate hundreds of pixels in one frame.**

Claim: GL-10's "never a one-frame change"; ROOT §4 reports the largest judged step as 0.128 of the travel. The probe judges a step only when the frames on both sides are 34 ms or shorter, and lists the rest. That rule was set after the 17:28 runs read RED on a 0.47 step (ROOT §7).

Evidence: `?am=sci-heavy`, a 1440 Dialog grown from a 160 × 40 button, whose body mounts 100 ms after the click with a 90 ms task. This is what atlas's data view does on its first open: `DataDialog.vue` loads `SourceDataBrowser` with `defineAsyncComponent`, and the browser's setup walks every row for `figureKeys` and `figureCh`.

| run | largest step between two painted frames | the frames beside it |
| --- | --- | --- |
| Chromium cure | centre 180 px, width 90 px, opacity +0.26 (travel 705 px) | 58 and 42 ms |
| WebKit cure | centre 291 px, width 145 px, opacity +0.41 | 98 ms |
| Chromium 11.1.1, same page | centre 0 px, width 17 px of 512, opacity +0.65 | 75 ms |
| WebKit 11.1.1, same page | centre 0.3 px, width 5 px | 98 ms |

The cause is upstream of this lane and already present on 11.1.1: keyframes.js `RAFPlayback.drive` advances a spring by the raw frame difference with no bound, so 11.1.1's bloom also jumps in opacity beside a long frame. The cure's travel turns that into a jump of a third of the screen. glass's own exit clock already bounds this: `runExitClock` advances by at most one 60 Hz frame per frame.

The cure: bound the spring's per-frame advance the same way, at the root (`RAFPlayback.drive`, or glass's `useSpring` driving `tickDt` itself), so a long frame slows the entrance rather than skipping part of it. Holding the start until the plate's first paint, as the note suggests, does not reach a long frame in mid-entrance. The witness then judges every step, with an injected long task in the cell. Until then, the note's "the dialog still starts at the button and ends in place" understates what a reader will see on atlas's first open.

**B-2. The note's step 5 does not virtualize the cards: the card list shrinks to its viewport.**

Claim: NOTE step 5 and DESIGN §6.5, "`.data-table-card-list` takes the total size (`block-size: var(--source-total-size); position: relative`), and the cards take the same `getRowAttrs` transform as rows." ROOT §8 says atlas's virtualizer was not measured.

Evidence: `?am=sci-cards` at 390, a 344 px region, 300 rows of 20 columns, atlas's own `useVirtualWindow` (copied with only its import paths changed) reading `viewportRef`, `rowRef` into `observe`, atlas's row attrs, and the two rules the note gives. Both engines read the same:

| | card list block size | scroll height | after a 4,000 px wheel |
| --- | --- | --- | --- |
| the note's rules | 596 px (the viewport's) | 1,803 (the 4 mounted cards) | `scrollTop` 1,207, scroll height 3,156 |
| plus `flex: none` on the list | 23,718 px | 23,718 | `scrollTop` 4,000 |

`.data-table-card-list` is a flex item of the card viewport (`.data-table-cards`, a flex column with a definite size), so it takes the default `flex-shrink: 1`. A host's `block-size` loses to the shrink, and the scroll range is only the mounted window: the scrollbar shows the mounted cards alone, and End and Page Down stop short. No cards overlap (atlas's border-box measuring holds), and the cards abut (gap 0, the list's 0.5 rem gap no longer separates absolutely placed cards).

The cure: `flex: none` on `.data-table-card-list` in glass, since the list is the viewport's content and should never shrink inside it. Then re-read this cell, and tell atlas to keep its own space between cards.

**B-3. The note's step 7 grows the plate from the whole page when atlas has no opener.**

Claim: NOTE step 7, "make `opener` a `shallowRef` and pass `:origin="opener"` … You already capture the control that opened the view, and that's exactly what it wants." DESIGN §1 types `origin` as any `Element`, and `readOrigin` accepts any element of at least 1 × 1 px.

Evidence: atlas sets `opener = document.activeElement` in an immediate watch on `open`. On a deep-linked load (`?browse=` in the URL) nothing has focus, so `opener` is `document.body`. `?am=sci-body` passes `document.body` as the origin on a 3,000 px page. In both engines the plate's first frame is 1,440 × 3,032 at (0, 0) and it shrinks to 512 px. Chromium's largest step is 669 px of centre and 583 px of width in one frame, beside 100 and 109 ms frames; WebKit's is 128 px of centre. The close returns to the same page-sized rect. Safari on the Mac does not focus a button on a mouse click, so `activeElement` can be the body there too. That is not measured here: Playwright's WebKit did focus the clicked button.

The cure: the note tells atlas to hand `origin` the door's own element from its click (or `null` for a deep link or a history step), not `document.activeElement`. glass's `origin` doc should say it is the control that opened the dialog. A guard in `readOrigin` against `document.body` and `document.documentElement` is a contract check, not a fallback, and is the owner's call.

### Not blocking

- **`fit`'s promise.** `types.ts` says `fit` "folds the rest, so it never scrolls sideways", and DESIGN §3 says it holds "only when every column declares a `width`". Under glass's automatic table layout a cell wider than its width widens its column. `?am=sci-fitlong` (a 16rem lead with an unbreakable 70-character token) gives a 649 px lead, 7 columns counted at 256, and `scrollWidth` 1,244 against 1,202. atlas is safe, since its fixed layout, ellipsis and wrap-anywhere lead keep every cell inside its width. State the condition: every cell stays within its column's width.
- **The stuck ground is a different colour from the table.** Scrolled on a page, the stuck column and header read (253, 245, 236), `--card`, over a table whose plate reads (231, 220, 208) in Chromium and (231, 220, 209) in WebKit. At rest all three read (231, 220, 209). A lighter band appears while scrolling, on a fast tween. atlas already paints its sticky head with a `--card` mix, so its view is unaffected. Whether a page table's ground should be the plate composited over `--background` is a design question for the owner.
- **A sized block host with a sibling now scrolls twice.** `?am=sci-nested`: a 400 px host with `overflow: auto`, a 60 px heading and the table. On 11.1.1 the host scrolls 3,265 px once. On the cure the root takes 100 % of the host (`max-block-size: 100%`), so the host scrolls 60 px and the viewport scrolls 3,205 px inside it. The release note should say that a host with siblings gives the table a flex or grid row. gaggle's `SendsDrawer` (a side Sheet whose region is a flex column) shrinks the table to fit by reading, not measured. fourier's admin tables have unsized hosts and keep their layout.
- **`viewportRef` never hears `null` on unmount.** DESIGN §1 says it receives `null` "as it leaves". A unit probe reads the calls `[null, DIV]` and nothing after `unmount()`, because the watcher dies with the component's scope. This is harmless for atlas, whose virtualizer unmounts with the table. A host that keeps its virtualizer while the table leaves holds a detached element. Fix the code (clear in `onBeforeUnmount`) or the sentence.
- **The `sentinel` slot left three card states.** 11.1.1 rendered it after either projection in every state. The cure renders it only inside the card list, so the loading, error and empty cards drop it (unit probe: absent in the empty cards). The table projection keeps it in every state. No surveyed consumer uses the slot.
- **Step 1's mechanism.** The note says "the body's `minmax(0, 1fr)` row gives it its height". atlas's browser lost its fourth child at 8fbf8fe, so the DataTable lands in the third `auto` row and the `minmax(0, 1fr)` row is empty. It works anyway because the root's `min-block-size: 0` gives that auto row a base of 0, so it grows only into the free space (measured: a 442 px viewport in a 550 px section, both engines). The note should tell atlas to set `grid-template-rows: auto auto minmax(0, 1fr)`.
- **The panel row on a room-sized plate.** glass's spring table keeps `bloom` because "the fired deploy's rebound lands on a room-sized plate, where an intrinsic overshoot reads as wobble". atlas's plate is 1,248 × 828. From a 44 px dock seat, the panel's 4.2 % peak is about 50 px of width overshoot. The brief named the panel. This is a question for the owner after seeing atlas's real view, not a defect.
- **The cards at rest.** The card viewport's 0.25 rem inset moves every card 4 px in from where 11.1.1 drew it. DESIGN's "at rest nothing paints differently" is about the table and should say so.

### What holds

- The patch applies to release/11.1.1 and to the 11.1.2 tree except the one context hunk ROOT names. The unit RED and GREEN reproduce exactly, and `src` type-checks.
- The builder's eight cells reproduce in both engines.
- atlas's table projection works per steps 1 to 4 and 6, in both engines (above).
- Consumers: atlas production is on 10.1.2 and lv-atlas reads the cure only through the note. gaggle's `dashboard` (11.0.0, one selectable DataTable in a side Sheet) gains, by reading, a sticky header and an internal scroll. fourier (10.1.3, three responsive admin tables in unsized hosts) keeps its layout, and its cards gain the table role, which its own region label already covers. Home Assistant (11.1.0) imports `data-table.css` and renders no DataTable. value.js, keyframes.js and daraksha use neither DataTable nor `origin`. `useSpringMount`'s `preset` widened from a name to a getter, and the Sheet's static `"panel"` builds no second spring.
- The records and the patch's added lines pass the register lint, and no src comment carries an id.

### Housekeeping

This seat's trees (`trees/sci-base`, `sci-cure`, `sci-redtest`, `sci-1112`, `sci-harness`, `sci-data`, `sci-shots` and the logs beside them) are deleted after this record. It also created `tools/logs-sci/` by mistake. The directory is empty and untracked, and removing it was refused by the permission system, so it is left for the owner. The preview servers on 5391 and 5392 are stopped. `trees/critic-base` and `trees/critic-cure` belong to another seat and were not touched.
