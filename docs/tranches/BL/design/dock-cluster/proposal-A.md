# Dock cluster · proposal A · per-plate shape springs

| field | value |
|---|---|
| seat | PROPOSER A, O-195 design loop (`driver/bl-design-dock-cluster.js`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | master `0778c4090`, scratch worktree `.claude/worktrees/bl/cluster/A` (removed after the records were written) |
| prototype | `proposal-A/prototype.patch`: `DockCluster.vue`, `styles/cluster.css`, two export lines, the fixture `tests-visual/dock-cluster/` |
| instruments | `proposal-A/tools/build.mjs` (vite build of the fixture against a worktree), `proposal-A/tools/capture.mjs` (captures and every number below); raw records `record-chromium.json`, `record-webkit.json`; logs `logs/` |
| engines | headless Chromium (Playwright 1.61.1 headless shell) and Playwright WebKit 26.5 (not Safari), both guarded, WebKit under `--exclusive webkit`. WebKit carries the dock harness's colour shim (`adapter-head.mjs:45`): the plate border colour pinned to one arm, because that WebKit build kills the page on the nested `color-mix()` the plate border resolves to. Real Safari is UNMEASURED |

## 0 · In brief

Each plate stays its own `GlassDock`, with its own `.dock-plate` and its own `backdrop-filter`, the whole time. A fuse moves plates together with a FLIP `translate`, springs the facing corners from the plate's px radius to 0, clips the plate's own facing border off, and moves the elevation and rim to a per-plate `::before` whose polygon clip cuts out the slot the neighbour's glass covers. One `useDockSpring(DOCK_SPRING)` drives every seam. Reduced motion dips the plates' paint to 0, swaps the geometry and brings it back.

What the measurements say:

- **The seam.** On a flat field, at rest fused, the step at the join is 0.3–3.4 luminance units (of 255) in Chromium at 390 and 1440, light and dark, at DPR 2 and DPR 1. The naive abutment (squared corners, no seam treatment) reads 13.7–18.4 on the same row, which is the doubled border and rim line. Above and below the join the halo steps 0.6–1.8, the same as the naive one, so the two shadows sum to one halo and no doubled shadow shows.
- **The backdrop stays live under every plate in every frame.** Stripe contrast under the glass reads 1.8–7.4 (stdev) mid-morph against 103–106 on the bare striped band.
- **No percentage radius.** 300 computed radius reads across rest and mid-morph frames carry 0 `%`, and the radius is a registered `<length>`, so a `%` cannot reach it.
- **Cost.** One forced layout per state change (the FLIP arm), none per frame. Per frame: one style recalc of the plates' subtrees (about 1.1 ms/s of `RecalcStyleDuration`, 0.6 ms per 8.3 ms frame at worst) and the paint of the moving plates. The rAF interval over the 1 s morph is p50 8.3 ms, p95 9.8 ms, max 10.3 ms, against 8.3/9.6/16.1 idle.
- **Accessibility.** The tree, the tab order and the focused control are identical before and after a fuse.
- **What it does not cure.** Each plate blurs only its own box, and each plate's luminance observer tints its own plate. Over a field that changes across the join, the two halves of the pill can differ by a shade (the 2-unit flat-field step is mostly this). It reads as one material in the captures. A strict "one tint" would need one observer for the cluster (§5 R-1).

WebKit (§4.2) agrees on the seam (0.0–0.9 against 11–26 naive), radii, accessibility, reduced motion, interrupt and the control-set glide. It cannot witness the backdrop at all: Playwright WebKit's headless screenshot shows no blur under any `backdrop-filter`, a bare test div included, so the live-backdrop check is UNMEASURABLE there (not failed).

## 1 · The API

### 1.1 The component

```vue
<DockCluster :fused="fused" aria-label="Site dock">
  <GlassDock fit-content :collapse="false" aria-label="Pages">…</GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Page controls">…</GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Theme">…</GlassDock>
</DockCluster>
```

| prop | type | meaning |
|---|---|---|
| `fused` | `boolean \| readonly boolean[]` | `true` fuses every seam. An array fuses seam `i`, the join between plate `i` and plate `i+1`, so `[false, true]` keeps the pages apart and fuses the controls with the theme |

The cluster's direct `.glass-dock` children are its plates, in DOM order. It renders one `div.glass-dock-cluster` around its slot, so attributes (`aria-label`, `role`, classes) fall through to that box. Its tokens, set on `.glass-dock-cluster`:

| token | default | meaning |
|---|---|---|
| `--dock-cluster-gap` | `0.5rem` | the gap at a split seam |
| `--dock-cluster-radius` | `var(--radius-dock)` (1rem) | the corner the seam springs from; registered `<length>`, so `%` is rejected |
| `--dock-cluster-seam` | the plate's painted border width | written by the cluster from the computed `border-inline-end-width` (1.5px at DPR 2, 1px at DPR 1 in Chromium) |
| `--dock-cluster-swap` | `var(--spring-dock-exit-duration)` | each half of the reduced-motion dip; registered `<time>` |

`DockCluster` owns position and seam shape only. It never reorders, re-parents, hides, makes inert or focuses a plate or a control, and it reads nothing from the plates but their boxes.

### 1.2 What triggers a fuse and a fission

The consumer owns `fused`, the way it owns `DockControl.active`. The cluster reacts to four things:

1. **`fused` changes** (collapse and expand, or any state the consumer maps to it): FLIP plus the seam spring.
2. **A plate changes size** (a page's control set grows or shrinks): a `ResizeObserver` FLIPs every plate from where it last painted to its new place, so the neighbours glide on the dock spring instead of jumping. Measured: a control added to the middle plate of a fused cluster moves the outer plates 24 px each, in at most 1.84 px per frame.
3. **A plate is added or removed**: a `MutationObserver` on the cluster re-reads the plates and FLIPs them.
4. **An interruption**: a new `fused` mid-flight starts from the painted boxes and the live seam values, and carries the spring's velocity into the new leg (scaled by the ratio of the old to the new span). Measured: fuse, reversed at 0.52, lands split. The first plate moves at most 1.13 px between frames through the reversal.

### 1.3 Daraksha's composition

`SiteDock.vue` keeps its two `GlassDock`s and gains one plate and one wrapper. The theme toggle leaves the controls plate for its own:

```vue
<DockCluster class="site-dock" :fused="fused" dir="ltr">
  <GlassDock fit-content :collapse="false" aria-label="Pages">
    <DockControl v-for="(p, i) in PAGES" … shape="tab" />
  </GlassDock>
  <GlassDock v-if="hasControls" fit-content :collapse="false" aria-label="Controls">
    <div id="dock-page" class="contents"></div>
  </GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Theme">
    <ThemeControl />
  </GlassDock>
</DockCluster>
```

```ts
// Fused while reading; split while the reader reaches for the dock or the page is changing hands.
const reaching = useDockReach(root);          // hover or focus inside the cluster (consumer code)
const reading = useScrolledDown();            // the existing scroll-chrome signal, or any
const changing = ref(false);
router.beforeEach(() => { changing.value = true; });
router.afterEach(async () => { await nextTick(); changing.value = false; });
const fused = computed(() => (reading.value && !reaching.value) || changing.value);
```

So a page change fuses the dock while the controls plate's content changes hands (the teleport into `#dock-page` swaps under one pill), then fissions it with the new control set. A change in the control set alone moves the plates on the spring through the `ResizeObserver` path. A page with no controls drops its plate (`v-if`), and the pages and theme plates FLIP together. The cluster keeps today's `.site-dock` positioning (`fixed`, bottom, centred). Its `grid` becomes the cluster's `flex`.

### 1.4 The phone row

A fuse is a row property: the plates must sit on one line. At 390 wide, daraksha's four named tabs plus two icon plates do not fit in 358 px. Today it stacks the pages above the controls. Two honest options:

- keep the stack, and wrap only the lower row (controls and theme) in a `DockCluster` (a 2-plate cluster; the pages plate stands alone above);
- or shorten the phone tab labels to fit one row. The fixture's 390 cells do this, with three tabs.

The proposal does not fuse plates across rows. A 2-row fuse is a silhouette that is not a pill, and the ask names a pill.

## 2 · The mechanism

Everything below is in `styles/cluster.css` and `DockCluster.vue` (prototype.patch).

### 2.1 Written by the script, per plate root, per frame

| what | channel | value |
|---|---|---|
| position | `translate` (individual transform property, composes with the dock's own `scale`) | `dx_i · (1 − s)`, the FLIP from the painted left to the laid-out left |
| seam fuse | `--dock-fuse-start`, `--dock-fuse-end` (registered `<number>`, inheriting) | `f0 + (f1 − f0) · s` per seam |

`s` is one `SpringProgress` from `useDockSpring({ response, dampingFraction } = DOCK_SPRING)`, which is `springPreset("dock")` (0.30, ζ 0.88), the same spring the dock morph orchestrator plays. No literal pair appears in the cluster.

### 2.2 Read by CSS from those two numbers

| property | element | animates as |
|---|---|---|
| `border-start-start-radius`, `border-end-start-radius` | `.glass-dock` (the plate inherits with `border-radius: inherit`, as today) | `--dock-cluster-radius · (1 − fuse-start)`, px |
| `border-start-end-radius`, `border-end-end-radius` | `.glass-dock` | `--dock-cluster-radius · (1 − fuse-end)`, px |
| `clip-path: inset()` | `.dock-plate` (the backdrop element itself, which already carries an extent clip-path at HEAD) | the dock's extent inset plus `seam · fuse` on each facing side: the plate cuts its own facing border off |
| `box-shadow` (rim + elevation, moved off the box) | `.glass-dock::before`, under the plate | the key shade's x leg times `1 − fuse` of the side it sits on (`max`/`min` on the token's sign, so a flipped key still lands on the right edge) |
| `clip-path: polygon()` | `.glass-dock::before` | the slot the neighbour's glass covers, from `100% + gap` outward on each facing side, band-limited to the plate height; `gap = (1 − f) · G − f · seam`, linear in `s` like the FLIP, so the slot edge sits on the neighbour's glass edge on every frame |

### 2.3 Written once per state change (layout)

- `margin-inline-start` on a plate: `--dock-cluster-gap` at a split seam, `−2 · seam` at a fused one (the plates overlap by the two clipped borders, so glass meets glass);
- **the device-pixel grid.** Each plate's `min-inline-size` rounds its width up to whole device pixels, and the cluster's relative `left` takes the sub-pixel remainder of its first plate. Without this, a seam at a fractional x anti-aliases both clip edges into one pixel and the field shows through as a light 1 px line. Measured before the fix: a 21-unit step at a join at x = 814.73. After the fix: 1.9. The grid is part of the mechanism, not a polish;
- `--dock-cluster-seam` from the plate's computed border width (it snaps per DPR).

That is one forced layout per arm. Chromium's `LayoutCount` over a 1 s morph is 3: the arm, the snap read, and the settle read.

### 2.4 The seam, piece by piece

| defect at a fused join | cause | cure |
|---|---|---|
| doubled border line | two 1.5px plate borders side by side | each plate clips its facing border off; the fused layout overlaps the plates by the two widths |
| doubled rim line | the rim's x leg (`--glass-key-shade-x: 1px`) draws the right plate's left edge | the leg fades with that edge's fuse |
| doubled shadow over the glass | each plate's 20 px halo paints over its neighbour (the later plate's halo sits above the earlier plate's glass) and is blurred into its neighbour's backdrop | the halo carrier's polygon cuts out the neighbour's slot |
| a halo notch above and below the join | if each halo were simply clipped at the seam, each would stop at half strength | the halos are not clipped outside the plate band. Two abutting rectangles' blurred shadows sum to the blurred union (`a + b − ab` against `a + b` costs at most `k²/4 ≈ 0.005` alpha at the 14 % shadow) |
| a light 1 px line | the seam at a fractional x | the device-pixel grid (§2.3) |
| rounded facing corners | n/a | spring to 0 px |

### 2.5 Reduced motion

`SpringProgress` snaps under `prefers-reduced-motion`, and the library's PRM carve zeroes every CSS transition. So the dip runs on WAAPI against a registered `--dock-cluster-fade` on the cluster root, which every plate's `.dock-plate`, `::before` and control regions read as `opacity`. Opacity sits on the backdrop element itself and on the controls, never on an ancestor of the plate, so the glass is never blanked. The fade goes 1 → 0 over `--spring-dock-exit-duration`, the layout and seams swap at the floor with no `translate`, and it goes 0 → 1. Measured: the fade's minimum is 0, it ends at 1, `translate` is never written, and the seam value goes 0 → 1 with no intermediate.

### 2.6 The hard constraints

| | constraint | how A holds it | evidence |
|---|---|---|---|
| a | Safari-safe | no `filter:url()`, no CSS filter, mask or opacity on any ancestor of a plate. The only new `clip-path` sits on the plate itself (which already carries one) and on a sibling pseudo of the plate | the mid-morph blur read below every plate in both engines (§4) |
| b | each plate keeps its backdrop | the plates never merge. The fuse is translate, radius and clip | as above |
| c | the dock spring | `useDockSpring(DOCK_SPRING)`. Reduced motion is the dip | §2.1, §2.5 |
| d | the r1 law | radius = registered `<length>` × number; `%` is invalid at computed-value time | 0 of 300 radius reads carry `%` (Chromium) |
| e | no masking fallback | there is no fallback arm. If `clip-path: polygon()` or `@property` were missing, the seam would show its doubled line, visibly | not engineered around |
| f | KISS, composes the dock | `GlassDock` is untouched. The cluster reads `.dock-plate`, `.glass-dock` and the shell tokens, and uses the one spring factory | prototype.patch: 0 lines changed in any existing dock file other than two import and export lines |
| g | one material, no doubled edge or shadow | §2.4 | §4 seam table, captures |
| h | accessibility | the cluster touches no role, name, order, `inert` or focus | §4.3 |

## 3 · The prototype

`tests-visual/dock-cluster/` (in the patch) is a fixture page: a warm/cool field with an 80 px band of 6 px black and white stripes under the cluster, and the cluster in the middle. `?n=3` gives pages, controls and theme. `?n=2` gives pages and controls+theme (daraksha today). `?fused=1` loads fused. `window.__cluster` has `set(fused)`, `scrub(s)` (harness only: pins the morph at spring progress `s`), `page(i)` and `extra(bool)` (adds a control to the controls plate).

Build and capture (from the checkout, with the patch applied in a worktree):

```sh
node docs/tranches/BL/design/dock-cluster/proposal-A/tools/build.mjs <worktree> <scratch>
~/.claude/guard/guarded --timeout 20 -- node …/proposal-A/tools/capture.mjs --site <scratch>/site --engine chromium --out <dir>
~/.claude/guard/guarded --exclusive webkit --timeout 30 -- node …/proposal-A/tools/capture.mjs --site <scratch>/site --engine webkit --out <dir>
```

Captures are in `proposal-A/png/`, named `<engine>-<width>-<theme>-n<plates>-<state>.png`, at DSF 2, cropped to the cluster plus 28 px:

| state | file suffix | how it is reached |
|---|---|---|
| rest split | `rest-split` | loaded split |
| mid-morph, three frames | `mid-25`, `mid-50`, `mid-75` | loaded split, `set(true)` (the FLIP arms on the real state change), then `scrub(0.25 / 0.5 / 0.75)` |
| rest fused | `rest-fused` | loaded split, `set(true)`, 1.2 s of the real spring |
| seam on a flat field | `flat-fused`, `flat-fused-naive` | the stripes off; ours against the naive abutment |
| DPR 1 seam | `…-flat-fused-dpr1[-naive]` | 1440 light, 3 plates |
| reduced motion end | `…-reduced-end` | 1440 light |
| control-set change end | `…-controlset-end` | 1440 light, fused, one control added |

The headline frames, Chromium 1440 light, 3 plates:

| split | mid 25 | mid 50 | mid 75 | fused |
|---|---|---|---|---|
| ![](proposal-A/png/chromium-1440-light-n3-rest-split.png) | ![](proposal-A/png/chromium-1440-light-n3-mid-25.png) | ![](proposal-A/png/chromium-1440-light-n3-mid-50.png) | ![](proposal-A/png/chromium-1440-light-n3-mid-75.png) | ![](proposal-A/png/chromium-1440-light-n3-rest-fused.png) |

The seam, ours and naive, flat field: ![](proposal-A/png/chromium-1440-light-n3-flat-fused.png) ![](proposal-A/png/chromium-1440-light-n3-flat-fused-naive.png)

## 4 · Measurements

Load average at each cell is in the records (12–13 during the Chromium run). Reading on DSF 2 captures. "Step" is the largest |L(x) − mean(L(x−4 px), L(x+4 px))| within ±1.5 px of the join; "floor" is the same read 40 px inside the first plate.

### 4.1 Chromium

Seam on the flat field, at rest fused, per join (interior row 3.5 px under the top edge / halo 5 px above / halo 5 px below):

| cell | ours: interior | ours: halo top / bottom | naive: interior | naive: halo top / bottom |
|---|---|---|---|---|
| 390 light n3 | 0.9, 0.7 | 1.0 / 1.1, 1.0 / 0.6 | 14.1, 13.7 | 1.1 / 0.8, 0.8 / 0.9 |
| 390 light n2 | 0.3 | 1.3 / 1.2 | 14.0 | 1.4 / 1.2 |
| 390 dark n3 | 2.0, 2.2 | 1.5 / 1.3, 1.1 / 1.5 | 14.9, 14.4 | 1.6 / 0.7, 1.2 / 0.7 |
| 390 dark n2 | 1.7 | 1.6 / 1.0 | 14.4 | 1.6 / 0.5 |
| 1440 light n3 | 1.9, 2.3 | 0.9 / 1.3, 1.3 / 0.7 | 15.0, 15.5 | 0.9 / 1.3, 0.7 / 1.1 |
| 1440 light n2 | 3.4 | 0.9 / 1.3 | 15.0 | 0.9 / 1.3 |
| 1440 dark n3 | 1.5, 2.5 | 1.3 / 0.8, 1.8 / 1.5 | 15.0, 16.3 | 0.9 / 1.7, 1.9 / 0.9 |
| 1440 dark n2 | 1.8 | 1.3 / 0.7 | 15.4 | 0.9 / 1.5 |
| 1440 light n3, DPR 1 | 1.6, 2.5 | 1.3 / 0.9, 1.4 / 0.7 | 18.4, 17.5 | 1.3 / 1.4, 0.9 / 1.1 |

The interior step is the line. The halo rows show the shadow joins as one: ours and naive agree there, and both sit at the row's own noise. The naive abutment has no doubled halo *outside* the plates either, since the halos sum. Its doubled shadow is the part painted over and under the neighbouring glass, which shows on the interior row with the doubled border.

Backdrop live mid-morph (stripe stdev under each plate at `s = 0.25 / 0.5 / 0.75`; the bare band reads 103–106): every plate, every cell, 1.8–7.4.

Fused gaps between plate boxes: −2 px at every cell (two 1 px painted borders: Chromium paints the 1.5px border as 1px at both DPRs in this build, and the cluster reads it). Mid-morph gaps at `s = 0.25 / 0.5 / 0.75`: 5.5 / 3 / 0.5 px, the linear path of `(1 − f)·8 − 2f`.

Frame cost, 1440 light, 3 plates, over a 1 s window that contains the whole fuse (the spring settles in about 0.4 s):

| | rAF p50 / p95 / max (ms) | LayoutCount | RecalcStyleCount | RecalcStyleDuration | ScriptDuration | TaskDuration |
|---|---|---|---|---|---|---|
| idle | 8.3 / 9.6 / 16.1 | 0 | 0 | 0 | 0.002 s | 0.013 s |
| morph | 8.3 / 9.8 / 10.3 | 3 | 71 | 0.078 s | 0.005 s | 0.108 s |

The cluster's own per-frame script (`frame()`: three plates, two custom properties and a `translate` each) costs 0.0035 ms. The style recalc is the cost to watch: `--dock-fuse-*` inherit, so each write restyles the plate's subtree (about 1.1 ms per frame here, at 120 Hz headless). It could be scoped by writing the two numbers to the `.dock-plate` and the `::before` host only, which needs an `inherits: false` pair and a second writer. Paint: the plates repaint every frame because they move (a moving backdrop-filter element re-samples its backdrop; that is true of the dock's own morph as well).

### 4.2 Playwright WebKit (+shim)

The colour shim is injected from an init script, before first paint. Added after load, the first run crashed the page on navigation (`logs/webkit.log` history; the crash is the nested `color-mix()` the dock harness documents, not the cluster). Load 8 during the run.

Seam on the flat field, at rest fused (interior / halo top / halo bottom, per join):

| cell | ours | naive |
|---|---|---|
| 390 light n3 | 0.9/0.8/1.1, 0.6/1.4/1.4 | 11.3/1.6/0.8, 11.4/1.4/1.2 |
| 390 light n2 | 0.8/1.3/0.5 | 11.9/1.0/1.1 |
| 390 dark n3 | 0.4/1.4/2.3, 0.4/1.5/2.2 | 25.5/1.9/2.0, 25.1/1.0/2.1 |
| 390 dark n2 | 0.9/1.6/2.5 | 24.2/0.5/1.6 |
| 1440 light n3 | 0.0/1.0/0.7, 0.8/1.5/1.3 | 23.3/0.5/1.1, 21.9/1.9/1.0 |
| 1440 light n2 | 0.0/1.0/1.4 | 23.3/0.5/1.9 |
| 1440 dark n3 | 0.0/1.8/1.4, 0.6/1.3/1.5 | 25.0/1.2/1.8, 25.7/0.8/1.4 |
| 1440 dark n2 | 0.0/1.8/1.4 | 25.0/1.2/1.8 |
| 1440 light n3, DPR 1 | 0.0/1.3/2.0, 0.9/3.0/1.6 | 26.5/0.7/1.5, … (record) |

WebKit paints the 1.5px border at DSF 2, so the fused overlap is −3 px (Chromium −2 px). The cluster reads the painted width, and the seam is clean in both. 300 radius reads: 0 `%`.

**The backdrop cannot be witnessed in this engine build.** Stripe stdev under every plate reads 91–95 in every state (split, mid, fused) against 105 bare. The control (`tools/wk-control.mjs`, `control-webkit.json`, `webkit-control-*.png`) shows why: in Playwright WebKit's headless screenshot, a bare `div` with `backdrop-filter: blur(16px)` also blurs nothing (106 against 106 bare). The plates read the same 95.1 with the cluster CSS and with the cluster class removed (plain GlassDocks side by side), and the computed `backdrop-filter` is `blur(16px) saturate(1.2)` in both. The same control in Chromium reads 2.2 under the plate and 1.5 under the bare div. So the WebKit cells neither pass nor fail the live-backdrop check: the instrument is blind there, and the cluster changes nothing about the backdrop against plain plates. Real Safari is where this is decided (R-8).

Frame cost (rAF only; no CDP): idle p50 10 / p95 12 / max 16 ms, morph 10 / 12 / 13 ms. Script per frame 0.005 ms.

Accessibility: tree identical, tab sequence identical (Read, Text size, Dark theme), focus kept on "Text size" through the fuse. Reduced motion: fade minimum 0, end 1, no `translate`, seam 0 → 1. Interrupt: peak 0.49, lands split, max 1.97 px per frame. Control-set change: ±24 px, max 2.18 px per frame.

### 4.3 Accessibility (Chromium; WebKit in §4.2)

Before and after a fuse: the 12 named nodes in the cluster (controls, toolbars, plates) are identical in tag, role, name, `tabIndex` and `inert`. The tab sequence from a sentinel at the top of the page is identical: Read, Text size, Dark theme (one stop per roving toolbar). A control focused before the fuse ("Text size") is still focused after it.

## 5 · Risks and what is left open

- **R-1 · per-plate tint.** Each plate's luminance observer darkens its own plate. Over a backdrop that differs across the join, the halves can differ by a shade. It is not a seam line (no edge), but it is a seam of tone. A cluster-level observer that writes one `--glass-backdrop-luma` to every plate would close it. That is a change to `useGlassBackdropLuminance`'s ownership, not to this mechanism.
- **R-2 · blur edge mode.** Each plate's blur stops at its own box. Over a high-frequency backdrop, the two sides of the join blur slightly different neighbourhoods. On the striped band, the plate halves' stripe residue differs a little (stdev 2–3 against 6–7, mostly from the controls' own plates and the active capsule). No line shows in the captures.
- **R-3 · a plate's own collapse.** A plate that runs GlassDock's own collapse morph inside a cluster clips its `::before` halo horizontally while `[data-morphing]` is set (`overflow-x: clip` on the box). Daraksha's plates are `:collapse="false"`. A cluster plate that collapses is not supported by this prototype.
- **R-4 · the grasp hold.** While a control is pressed and held, the plate drops its `clip-path` (dock.css `:has(.glass-grasp-carrier)`), so the facing border reappears for the hold. A cluster would carry the seam inset into that rule.
- **R-5 · RTL.** The plate clip has an RTL arm (`:dir(rtl)`). The `::before` polygon is written in physical coordinates for LTR only.
- **R-6 · widths.** The cluster moves plates. It does not animate a plate's own width when its control set changes; that width steps, and only the neighbours glide. The same is true of a single `GlassDock` today.
- **R-7 · the border width token.** `1.5px` is a literal in `dock.css`. The cluster reads the painted width at runtime and needs no copy, but a `--dock-plate-border` token would let the CSS default cite it.
- **R-8 · real Safari** is unmeasured (the owner's safaridriver checkbox), as in every BL dock pass. Playwright WebKit cannot stand in for it on the backdrop (§4.2 control), so "the blur stays live under each plate mid-morph" is witnessed in Chromium only.
- **R-9 · the harness hooks.** `scrub(s)` is exposed on the component for deterministic captures. A shipped component would carry it only behind a test seam, or the harness would pin the clock instead.

The run ended with the guard reporting the kernel zone leak ARMED (`~/.claude/guard/ZONE-ARMED`); no further heavy runs were started after the WebKit control.
