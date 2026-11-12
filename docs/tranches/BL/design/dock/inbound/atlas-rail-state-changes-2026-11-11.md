# Rail state changes, before and after the owner order of 2026-11-11

This list is for glass-ui-2c. It covers the sixteen changes (a) to (p) that the brief names. The atlas side is on branch `u/ow-atlas-chrome` at commit `9805598`, in `/Users/mkbabb/Programming/.u-build/ow-atlas-chrome`. The glass line is `ebc0f3705`.

## Sizes

All sizes are the plate's border box at a 1440 px viewport.

| Plate | Size | Source |
|---|---|---|
| Disc | 44 × 44 | crest seat only |
| Dashboard rail, open | 72 × 583 | `--cp-dock-w`; height is the content |
| Home rail, open | 311.6 × 557.3 | `--cp-rail-open` is 19 × `--type-small`, which is 16.4 px at 1440; height is the content |
| Home rail, open, with Saved views | 311.6 × 618.8 | |

## Sources

**Before strips.** These are 360 × 640 screenshot bursts and per-frame records of the served sci app, taken before this order.
- `/Users/mkbabb/Programming/.u-build/out/ow-design/motion/rail-1440-sci/`, holding `open-*.png`, `close-*.png`, `toggle-*.png` and `rec.json`.
- `/Users/mkbabb/Programming/.u-build/out/ow-design/motion/route/home-sci-*.png`.

**After frame logs.** The plate is sampled once per painted frame by the browser spec `src/platform/chrome/dock/Dock.home.browser.spec.ts` ("the rail morph at 1440 px"). The logs are in `/Users/mkbabb/Programming/.u-build/out/ow-atlas-chrome/motion/`:
- `a-home-to-sci.log`
- `b-sci-to-home.log`
- `e-hover-open-sci.log`
- `f-hover-leave-sci.log`
- `g-reenter-sci.log`
- `k-saved-row-home.log`
- `o-theme-home.log`

**After strips.**
- Frames: `/Users/mkbabb/Programming/.u-build/out/ow-atlas-chrome/motion/strips/{open,close,home-to-sci,sci-to-home}-NN.png`.
- Contact sheets: `/Users/mkbabb/Programming/.u-build/out/ow-atlas-chrome/motion/sheet-{open,close,home-to-sci,sci-to-home}.png`.
- These were taken in the test fixture, not the served app. The fixture paints the plate cream on white with no theme tokens, and each screenshot takes about 50 ms. The strips therefore show only roughly where the plate is. The measurements are in the frame logs.

## The changes

Each change gives its trigger, the plate's size from start to end, the content that enters or leaves, and whether it animated before and after this order.

### (a) Expand on pointer enter, focus or press of the disc

- **Trigger:** `bloom` intent set to false (open).
- **Plate:** 44 × 44 to 72 × 583.
- **Content:** the site layer enters (Dashboards, Search, Saved views), along with the rungs and the foot. These are the Filters, theme and Collapse controls.
- **Before:** partly animated. Width was already 72 in the first frame and only height morphed (30 sizes). See `rail-1440-sci/rec.json` → `open` and `open-*.png`.
- **After:** both axes morph from the disc on glass's morph and land together.
  - 32 sizes, from 49 ms to 290 ms after the pointer enters.
  - In every frame, width and height have covered the same share of their travel, within 5 %.
  - Log: `e-hover-open-sci.log`.
  - The fix keeps the open width on the expanded pane (`.dock-layer--full`), not on the root's posture class. Glass measures the open endpoint while the root is already `.collapsed`.

### (b) Collapse on pointer leave, focus leave, outside tap or Escape

- **Trigger:** `bloom` released (set to null). Pointer leave waits a 150 ms grace; the other triggers release at once.
- **Plate:** 72 × 583 to 44 × 44.
- **Content:** what (a) brought in leaves. While the morph runs, the site layer and foot are placed absolutely where they stood, and `display: none` applies only once the plate settles.
- **Before:** not animated. The plate showed 44 × 44 from the first frame (`rec.json` → `close`, one size; `close-*.png`).
- **After:** animated.
  - The plate holds for the grace, then starts 173 ms after the leave. That is 150 ms plus the frame in which glass measures and arms.
  - It reaches the disc 417 ms after the leave, passing through 33 sizes.
  - A leave followed by a return 80 ms later never collapses and keeps one size.
  - Logs: `f-hover-leave-sci.log` and `g-reenter-sci.log`.
  - Focus leave, outside tap and Escape run the same morph without the grace. They are not frame-logged. Escape is read in the capture phase, so an Escape that closes a rail list leaves the rail open.

### (c) Hold open while the filter drawer, palette or a rail list is open

- **Trigger:** `portal` intent set to false (open) while any claim is held.
- **Plate:** no change.
- **Content:** none.
- **Before:** nothing to animate.
- **After:** nothing to animate.
- **Note:** one `Dock.sitehold` case fails both at the base `9d01c13` and here: "/usf: with focus inside the rail, the pointer leaving does not collapse it". After Escape, glass's own hover state collapses the rail about 500 ms after the leave. This is still open.

### (d) The foot's Collapse button

- **Trigger:** `bloom` released at once (`onCollapseButton`).
- **Plate:** 72 × 583 to 44 × 44.
- **Content:** as in (b).
- **Before:** snapped, the same path as (b).
- **After:** the morph from (b) with no grace. Not frame-logged separately.

### (e) Route change

- **Trigger:**
  - The `register` intent changes in the same flush as the route.
  - The content swap fades the leaving run, site layer and foot out over 120 ms, then fades the arriving content in over 200 ms with `--ease-out`.
  - Toward the disc, the swap waits for the plate to land (capped at 600 ms).
  - `usf-dock--home` follows the content on screen, so the 19 em geometry holds while the roster fades.
- **Plate:** home 311.6 × 557.3 to disc 44 × 44, and back. The dashboard 72-wide rail appears only when a disc is opened (a).
- **Content:** the roster and Search field leave; the rungs, site layer and foot enter (and the reverse).
- **Before:** the plate snapped. See `route/home-sci-*.png`.
- **After:**
  - / to /sci: 31 sizes between 18 ms and 249 ms.
  - /sci to /: 34 sizes between 18 ms and 267 ms.
  - Overshoot is under 2 % on both axes.
  - In no frame are both the roster and the rungs fully inked.
  - Logs: `a-home-to-sci.log` and `b-sci-to-home.log`.

### (f) A dashboard's context arriving after the route (rungs, Filters)

- **Trigger:** `ctx` arrives after the route has changed.
- **Plate:** the open plate's content height, or none on the disc.
- **Content:** the rungs, Filters and the section Select enter.
- **Before:** the plate snapped.
- **After:** if the context arrives during the leave, it lands in the same swap. Otherwise it gets its own 200 ms fade-in, and glass re-arms its morph from the live box. Not frame-logged; the fixture loads the context with the route.

### (g) Section count differing between dashboards

- **Trigger:** the rung count changes with the route.
- **Plate:** open height changes with the count.
- **Content:** the rungs.
- **Before:** the plate snapped.
- **After:** as in (e) and (f), the open height is the content and glass's resize morph carries it. Not frame-logged; every fixture route has four beats.

### (h) The Saved views row arriving or leaving

- **Trigger:** the saved-views shelf goes from empty to holding a view.
- **Plate:** 311.6 × 557.3 to 311.6 × 618.8 on /.
- **Content:** the Saved views row enters.
- **Before:** the plate snapped.
- **After:** height grows between 14 ms and 238 ms through 33 sizes. Log: `k-saved-row-home.log`.

### (i) The applied-filter count badge

- **Trigger:** the filter count changes.
- **Plate:** no change intended. The badge sits on the Filters circle.
- **Content:** the badge.
- **Before:** not measured.
- **After:** not frame-logged. The badge face is now `600 0.625rem/1 var(--font-text)` with tabular numerals.

### (j) The 1024 px threshold on /

- **Trigger:** the `register` intent changes (`homeRail`).
- **Plate:** home 311.6 × 557.3 to 44 × 44.
- **Content:** as in (b).
- **Before:** snapped, the same path as (b).
- **After:** the same morph as (b) and (e). The posture is asserted in `Dock.home.browser.spec.ts` but not frame-logged.

### (k) The 768 px threshold (rail to bar)

- **Trigger:** the register swaps, which remounts the dock.
- **Plate:** the rail becomes the phone bar.
- **Content:** everything is remounted.
- **Before:** a remount, not a morph.
- **After:** unchanged, still a remount.

### (l) The section pager opening, closing and changing label

- **Trigger:** `pagerOpen`, which is `!atTop && collapsed && activeLabel !== ""`. `atTop` now reads the beat progress.
- **Plate:** the pager plate, 52 px tall, beside the disc. Its width is one value per route.
- **Content:** the section label. The label cell stacks every section's label, and inactive labels are hidden.
- **Before:**
  - The pager was mounted and unmounted through a `<Transition>` and left whenever a heading entered its band.
  - Its width changed with the label (215 to 336 px on /sci, per the brief).
- **After:**
  - Mounted once per route. It opens by `clip-path` on glass's dock spring and closes in `--duration-fast`, measured at 200 ms.
  - The spring is `--spring-dock-duration`: 210 ms at tempo 1, not the 250 to 320 ms the row asked for.
  - The width is one value, the text is at full opacity in every frame, and the plate is `inert` when closed.
  - The heading yield is deleted, as the row asked.
  - Tests: `Dock.ow-chrome.browser.spec.ts` and `Lozenge.browser.spec.ts`.

### (m) The bar sliding out and back under 768 px

- **Trigger:** the bar's scroll hide.
- **Plate:** the bar.
- **Before:** animated.
- **After:** unchanged.

### (n) The first-open rung rise

- **Trigger:** the first expand on a route (`risen`).
- **Content:** the rungs.
- **Before:** animated. The `usf-dock-rung-rise` keyframes show in `rec.json` → `open[0].an`.
- **After:** unchanged.

### (o) The year fade on the spine

- **Trigger:** `stepper.yearFading`.
- **Content:** the year labels.
- **Before:** animated, opacity only.
- **After:** unchanged.

### (p) A theme flip

- **Trigger:** the theme toggle.
- **Plate:** no size change.
- **Before:** a single size (`rec.json` → `toggle`).
- **After:** a single size, 311.6 × 557.3, for 600 ms on /. Log: `o-theme-home.log`.

## Asks for glass-ui-2c

1. **The cross axis.** Glass measures the open endpoint with the root already `.collapsed`. Any consumer width keyed on the posture class (`:not(.collapsed)`) hands the morph a collapsed cross size, so the width snaps. Either measure with the expanded posture applied, or document that the open size belongs on the expanded pane. Atlas now does the second.
2. **The posture flip and `data-morphing`.** A rAF sampler reads one frame where the class has flipped but `data-morphing` is not yet set. It is not painted, because the ResizeObserver pass arms the morph before paint. A consumer that hides collapsed content on `.collapsed:not([data-morphing])` depends on that order. Please keep it, or flip the class and the attribute in one write.
3. **Persistent regions.** Glass expects persistent regions to be the same in both postures. The rail's site layer and foot are not, so atlas takes them out of flow during a collapsing morph. A glass seam for "persistent in the open posture only" would remove that rule.
4. **`reference` on `SelectContent`.** Atlas passes it through to reka's PopperContent so that a trigger wrapped in a Tooltip keeps its anchor. Glass does not declare it yet. Atlas lists it in `INCOMING_GLASS_PROPS` in `tests/unit/glass-contract.spec.ts`.
