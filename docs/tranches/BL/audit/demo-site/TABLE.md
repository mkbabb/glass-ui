# glass.babb.dev: measured against the owner's thirteen points

Measured 2026-11-15 on the live site (glass-ui 11.0.2 from master, HEAD e1aebc2d0), all 92 routes (`/`, 11 section landings, 80 stories) in three cells: 1440×900 dark, 1440×900 light, 390×844 dark touch. Chromium headless shell 149, launched with `--use-angle=metal --enable-gpu --ignore-gpu-blocklist`. `UNMASKED_RENDERER_WEBGL` = **ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)**. The aurora ran on WebGPU in the page (`navigator.gpu` absent on `about:blank`, present on the site).

Tools: `tools/probe.mjs` (per-route anatomy, contrast, docks, configurators), `tools/targeted.mjs` (shell docks, sticky header under a wheel scroll, evidence crops), `tools/load.mjs` (cold-load screencast timeline), `tools/analyze.mjs` + `tools/report.mjs` (folding). Rows: `rows/*.jsonl.gz`, `rows/summary.json.gz`, `rows/targeted.json.gz` (gunzip before rerunning `tools/analyze.mjs`). Crops: `shots/`.

Contrast method: for each visible text run, the background is the modal colour of the screenshot pixels inside the run's box (glyphs are a minority of those pixels); the ink is the computed colour, alpha × ancestor opacity, composited over that background. "painted" is the highest-contrast pixel in the box against the same background. Threshold 4.5:1, 3:1 for ≥24px or ≥18.66px bold.

---

## (a) The thirteen points

### 1. `/foundations/paper-glass` is unreadable — TRUE, and the cause is layout, not ink

- What is true: the page is a hero-variant story whose sections land in the 21rem (`--measure-cel`) cel field, so each section is ~410px wide at 1440. Inside that, the tier grid is keyed to the **viewport** (`lg:grid-cols-4`), so four tiles of ~80px sit in a 410px column: "glass-resting" and "glass-floating" clip at the tile edge, captions break one word per line ("dock, / input / bg, / hover"), and the fixed `h-48` tiles let text spill out below their plates (the `glass-overlay` tile's caption runs past its bottom edge). The "ladder" section repeats the error at three columns with `min-h-56`. The hero title's descender overlaps the blurb ("Paper & Glass" over "Four glass tiers…"); that h1/blurb overlap appears on all 11 section landings and every hero story. Ink contrast is secondary: dark 4 runs at 4.1–4.5:1 (`text-muted-foreground` on the grain overlay), light 22 runs at 2.9–3.95:1 (muted ink rgb(112,89,66) over the tinted tiles). Crops: `shots/p1-paper-glass-1440-dark-fold.png`, `shots/p1-paper-glass-1440-light-fold.png`.
- Cause: **DEMO**. `demo/stories/foundations/paper-glass.vue:135` (`md:grid-cols-2 lg:grid-cols-4` in a cel), `:142` (fixed `h-48`), `:182` (`lg:grid-cols-3`), `:190` (`min-h-56`), `:244` (`sm:grid-cols-2 lg:grid-cols-4`); the cel width is `demo/chassis/layout.css:108-115` (`--measure-cel` 21rem). Light ink: **LIBRARY** `--muted-foreground` = `--neutral-5` (`src/styles/tokens/color-radius.css:91`) sits at 4.4:1 on bare cream and drops below AA on any tinted glass.
- Cure: give the specimen sections the full article width (`data-span="full"`) and key the tile grids to their container, not the viewport; let tiles size to content.

### 2. (f1) Both shell docks have no collapse state and never animate — TRUE

- What is true: the sidebar rail dock and the bottom pager dock are both `always-expanded pinned`. Measured on `/display/buttons`: rest, hover over the rail, 6 s idle, and a route change (24 samples at 60 ms across the navigation) give one rect and one class set for each dock; neither ever folds. At 390 the rail is hidden in a Sheet and the bottom dock stays a full 382×60 bar. The only motion is the `tap-squish` press scale on controls. Crops: `shots/f1-shell-docks-rest-1440-dark.png`, `shots/f1-bottom-dock-1440-dark.png`, `shots/f1-bottom-dock-390-dark.png`.
- Cause: **DEMO**. `demo/shell/SidebarDock.vue:110-115` (`orientation="vertical" :collapse="false"`, with the comment at `:58-65` recording the decision to retire the collapse), `demo/shell/BottomDock.vue:97-103` (`fit-content :collapse="false"`, comment `:90-96` retiring the collapsed summary).
- Cure: give both shell docks a collapse posture (`collapse="closed"` with hover/press/scroll expand) so the site's own chrome demonstrates the morph.

### 3. `/substrates/aurora` editor and stage are too small, "as with many of the editor pages" — TRUE

| page | 1440: stage | 1440: editor | 390: stage | 390: editor |
|---|---|---|---|---|
| /substrates/aurora | 830×242 (15.5% of viewport) | 400×242, shows ~3 rows | 308×288 | **308×1** (controls 0px tall, content 65px) |
| /substrates/blob | 830×556 | 400×481, scrolls 481/2422 | 308×288 | 308×161, scrolls 160/2400 |
| /substrates/fourier-field | 830×556 | 400×513, scrolls 513/2080 | 308×288 | 308×191, scrolls 190/2091 |
| /containers/configurator | 572×288 | **572×9**, scrolls 8/613 | 308×288 | 308×19, scrolls 18/641 |
| /motion/springs | 417×288 | 417×225, scrolls 167/678 | 348×288 | 348×191, scrolls 97/766 |

- What is true: every studio is clamped to one envelope, `min(62svh, 44rem)` = 558px at 900 tall. Aurora puts its preset ribbon on top (`gallery-placement="top"`), which takes 314px of the 558, leaving a 242px stage and a 242px editor. The studio starts at y≈626, below the fold, after 101 words of prose. At 390 the stacked arm gives the gallery and the 18rem stage-floor all of the fixed envelope and the editor gets the `1fr` remainder: 1px on aurora, 9–19px on `/containers/configurator`. Editors elsewhere scroll inside boxes ~1/5 of their content height. Crops: `shots/p3-aurora-studio-1440-dark.png`, `shots/p3-aurora-studio-390-dark.png`.
- Cause: **DEMO + LIBRARY**. DEMO: the envelope `demo/chassis/layout.css:59` (`--stage-block: min(62svh, 44rem)`) applied by `demo/chassis/layout.css:138-140` through `demo/stories/substrates/_frame/VizStudio.vue:68` (`heightClass: "story-stage"`); `demo/stories/substrates/aurora.vue:139-140` (`scroll-mode="never"`, `gallery-placement="top"`); the 138-word blurb `aurora.vue:138` ahead of the stage. LIBRARY: the stacked arm `src/components/configurator/styles.css:317-322` (`auto / minmax(stage-min, auto) / minmax(0, 1fr)`) has no floor for the aside, so inside a fixed envelope the editor can collapse to 0; the wide arm `:355-362` puts the gallery row inside the same envelope.
- Cure: let editor pages take the viewport (stage ≥ 70% of the fold, editor full height beside it, page scroll instead of a box that scrolls), and give the library's stacked aside a minimum block size.

### 4. (f2) Two or more blobs, and every duplicated area — TRUE

- Blob: two live Blob stages on one page, the studio hero (480×480) and "STAGE 1 — the plain blob" (352×352) further down; 2 WebGPU blob contexts plus the shell's. `demo/stories/substrates/blob.vue:528` and `:742`. The "Pause seam" section (`:752-767`) is a third control surface for the same studio blob. Crops: `shots/p4-blob-stage-1.png`, `shots/p4-blob-stage-2.png`.
- Constellation: 8 constellation canvases (7 in main) on `/substrates/constellation`, six `<Constellation>` mounts each a small field under a column of prose: `demo/stories/substrates/constellation.vue:300, :331, :372, :395, :423, :441` (the last two are, by the file's own comment at `:110`, "an IDENTICAL seed/count/link, differing ONLY" in one prop). Crop: `shots/p5-constellation-1440-dark-fold.png`.
- Dock controls: four separate `<DockStage>` aurora fields on one page (4 WebGPU + 8 WebGL2 contexts, the most of any route): `demo/stories/dock/controls.vue:100, :122, :153, :170`.
- Aurora: the heading "Aurora" printed twice (route h1 + `VizStudio heading="Aurora"`, `demo/stories/substrates/aurora.vue:136`; blob.vue `:462-465` records the same fix made for Blob but not Aurora).
- Accordion: the same three questions mounted twice (`demo/stories/containers/accordion.vue:45` and `:69` both iterate `faq`, `:13`). ToC tracking: one filler paragraph repeated 18 times (by design for scroll length).
- Duplicate routes: `/` and `/foundations/intro` both render the same 11 category cards through the same resolver (`demo/chassis/landing/CatalogLanding.vue` vs `demo/stories/foundations/intro.vue:90-100`, both `resolveCategoryTile`). Overlapping subjects (content overlap from the manifest, not pixel-identical): the glass-tier ladder appears on `/foundations/paper-glass`, `/foundations/surface-tints`, `/substrates/glass-panel`, `/substrates/glass-material` and `/display/surface`; floating panels on `/containers/popover`, `/containers/hover-card`, `/containers/hover-popover`, `/containers/tooltip`; search on `/data/search`, `/dock/dock-search`, `/containers/command`; springs/easing on `/foundations/motion`, `/motion/springs`, `/motion/curve-gallery`; studios on `/containers/configurator` and the three substrate studios.
- Cause: **DEMO** throughout.
- Cure: one stage per subject per page; fold variants into the configurator as presets; merge `/` and `/foundations/intro`; merge the glass-ladder pages.

### 5. (f3) Too much internal text, poor focus on the component — TRUE on 50 of 92 routes

- What is true: at the 1440 dark fold, prose covers more area than live components on 50 routes, and 13 routes show no live component in the fold at all (section landings with text-only cards, `/foundations/paper-glass`, `/motion/handmark`, `/motion/scroll`, `/foundations/typography`, …). Longest pages by words: `/dock/overview` 706, `/substrates/glass-material` 565, `/substrates/constellation` 520 (prose 38% of the fold against 23% component), `/navigation/toc-tracking` 446, `/data/virtual-section` 428. Words before the first live component: `/motion/handmark` 224, `/containers` 202, `/foundations/paper-glass` 175, `/motion/scroll` 173, `/data` 157, `/substrates/blob` 117, `/dock/vertical` 114, `/substrates/aurora` 101. The prose is engineering commentary (shader terms, token names, ticket references such as "NOT the slides red anomaly", "Shipped /constellation") rather than reader-facing copy. Ranking in (c).
- Cause: **DEMO**: the manifest blurbs (`demo/stories/manifest.ts`, e.g. the dock rows `:766-826`) and each story's `StorySection blurb=` props, e.g. `demo/stories/substrates/constellation.vue` per-column blurbs, `demo/stories/substrates/blob.vue:468`, `:733-738`.
- Cure: one sentence of lede per page, a live stage first, notes collapsed below it.

### 6. `/display/buttons` is unreadable — TRUE, layout first

- What is true: the emphasis × tone matrix sits in a ~410px cel with `repeat(4, minmax(0, 1fr))` tracks, so the buttons are wider than their tracks: the column headers print over each other ("secondaryquiet") and the four "Delete" buttons overlap each other's trash icons; "Keyboard command" wraps inside its pill. Ink: disabled buttons at 3.8–4.3:1 dark and 2.9–3.3:1 light (50% alpha ink, `oklch(... / 0.5)`), destructive "Delete" text 2.3:1 in light. Crops: `shots/p6-buttons-1440-dark-fold.png`, `shots/p6-buttons-1440-light-fold.png`.
- Cause: **DEMO** `demo/stories/display/buttons.vue:28` (the inline `grid-template-columns: auto repeat(4, minmax(0, 1fr))` inside a cel), `:92` (`sm:grid-cols-2` keyed to the viewport). **LIBRARY** for the ink: the disabled button's 50%-alpha ink and the light destructive text tone (`src/components/button/`).
- Cure: span the matrix full width with `auto` tracks; lift disabled and destructive ink to ≥ 4.5:1 (disabled may go to 3:1 if the library rules disabled text exempt, but say so).

### 7. (f4) Scroll header not rounded — TRUE, and content shows through it

- What is true: after a real wheel scroll on `/navigation/tabs` (`--chrome-collapse-t` = 1), the sticky header box has radius 0 on all four corners and carries the library's drop shadow, so the shadow draws a square-cornered band; its `::before` plate is a vertical gradient `--card` at 80% (dark) / 70% (light) to transparent, with only its two **bottom** corners at 16px, which sit in the transparent tail and so never read. The tabs specimen ("Notes Specs Logs", "Derivation Convergence Appendix") reads through the plate behind the h1 and the blurb. Crops: `shots/f4-header-_navigation_tabs-dark.png`, `shots/f4-header-_navigation_tabs-light.png`. Note: a single programmatic jump does not collapse the header (the ramp anchors at the landing position, `src/composables/motion/scroll/useScrollChrome.ts:208-214`), so only wheel or touch scrolling shows it; pages one screen long (`/display/buttons`, `/data/table`) never collapse.
- Cause: **DEMO** `demo/chassis/hero/story-hero.css:192-217` (no radius on the header box), `:231-249` (the plate's gradient and bottom-only corners), `:47` (80% dark wash). **LIBRARY** `src/styles/scroll-chrome.css:86-95` puts a box-shadow on `.scroll-chrome` with no radius or plate of its own.
- Cure: make the collapsed header a real glass capsule (full radius, opaque-enough plate, backdrop blur) instead of a gradient wash on a square box.

### 8. (f5) Docks that are not rounded — TRUE, found; 14 docks on 6 routes

- f5 is the "Big dock — the card shell" on `/dock/overview`: `<GlassDock shape="card" :collapse="false" class="w-80">` with nine controls in a 320px box. Its run overflows (scrollWidth 432 > 300), so the library's overflow cap cuts the trailing corners: measured `24px, 10px, 10px, 24px` against a stadium's 28. Crop: `shots/p8-dock-overview-card-dock.png`. `demo/stories/dock/overview.vue:597`.
- Every dock not at half its cross size (both themes at 1440; 390 adds more because runs overflow sooner):

| route | dock | box | corners TL,TR,BR,BL | stadium needs | rule |
|---|---|---|---|---|---|
| /dock/overview | card shell, `overview.vue:597` | 320×56 (390: 310×60) | 24,10,10,24 | 28 | overflow cut cap, `shape="card"` |
| /dock/controls | "Dock control shapes", `controls.vue:101` | 338.7×56 (390: 310×60) | 28,16,16,28 | 28 | overflow cut cap |
| /dock/controls | "Media filter", `controls.vue:123` | 338.7×56 | 28,18.8,18.8,28 | 28 | overflow cut cap |
| /dock/vertical | `shape="rounded"`, `vertical.vue:120` | 64×277 | 16,16,16,16 | 32 | `shape="rounded"` |
| /dock/layers | `shape="rounded"`, `layers.vue:170` | 64×148 | 16 ×4 | 32 | `shape="rounded"` |
| /dock/layers | `shape="rounded"`, `layers.vue:245` | 151×228 | 16 ×4 | 75.5 | `shape="rounded"` |
| /dock/overview (390) | two horizontal pills | 244×60 | 30,16,16,30 / 30,19.5,19.5,30 | 30 | overflow cut cap |
| /dock/sections (390) | pill | 244×60 | 21.4,16,16,21.4 | 30 | overflow cut cap, both ends |
| /dock/overflow (390) | pill | 310×60 | 30,16,16,30 | 30 | overflow cut cap |
| /dock/layers (390) | pill, two-row pill | 228×60, 228×108 | 30,16,16,30 / 44.5,46,46,44.5 | 30 / 54 | overflow cut cap |

  (One more 390 reading, a collapsed 60×60 dock at 7.4px on `/dock/overview` "Starts open", is the mid-morph counter-scaled radius measured against an already-scaled rect, `run.css:789`; not counted.) Shell docks, landing tiles and every collapsed pill are full stadiums.
- Cause: **LIBRARY** for the cut: `src/components/dock/styles/run.css:653` (`--dock-cap-cut: var(--radius-card)` for the stadium), `:671-672` (`shape-card` rest `--radius-dock-card`, cut `--radius-lg`), keyframes `:813-815`, `:879-900`: a run that hides content drops its end corner two rungs, by design. **DEMO** for the `shape="rounded"` choice (`vertical.vue:120`, `layers.vue:170`, `:245`) and for widths that force the overflow (`overview.vue:597` `w-80`, the `dock-stage-column` width on `/dock/controls`).
- Cure: the owner's rule ("docks should almost always be rounded") reads against the cut cap itself: either drop the cap's radius cut (keep the fade mask as the overflow cue) or keep the cap off resting docks; move the demo's rounded docks to the stadium.

### 9. `/foundations/intro`: the aurora is slow and flashes black — TRUE in dark, on every route

- Measured (cold context, CDP screencast of every compositor frame, canvas region sampled per frame, no `getContext` on the page): `/foundations/intro` dark paints a uniform near-black frame (mean 10.7/255, 100% of pixels under 22) from navigation start until **373 ms**; first contentful paint is at **600 ms**, when the aurora's palette ground appears (chroma 41); the live WebGPU canvas then fades in over `--duration-slow` and the field settles at about **1000 ms** (chroma 49.6, steady thereafter). Light shows the same window as white (no flash). The same black window opens **every** dark route: all 92 dark cold loads show 2 black frames before the field settles (the 2 light loads show none); the last black frame lands at 187–373 ms, and the canvas region settles at 327–724 ms (median 415 ms). On `/dock/overflow` and `/dock/controls` the page stays near-black for the whole 3.7 s, because those routes suppress the shell aurora and their own aurora is only a strip inside the stage. Frames: `shots/load-_foundations_intro-dark-black-373ms.jpg`, `…-t500-589ms.jpg`, `…-t1000-1012ms.jpg`, `shots/load-_dock_overflow-dark-black-3659ms.jpg`.
- Cause: the black is the **dark page floor itself**, `--neutral-0: hsl(24 9% 4%)` (**LIBRARY** `src/styles/tokens/dark-arm.css:56`, used as `--background` at `src/styles/tokens/color-radius.css:58`), which is all there is to see until JavaScript mounts the aurora. Before CSS arrives, the head script sets `color-scheme: dark` with no background (**LIBRARY** `src/composables/dark/darkModeSyncScript.ts:162`, stamped into the page by **DEMO** `vite.dark-stamp.ts`), so the UA paints its own dark canvas. The warm ground is computed in JS (`auroraFallbackGround`, bound as style variables at `src/components/aurora/Aurora.vue:215-216`), so nothing warm exists before the app boots; the canvas layer then fades from opacity 0 (`Aurora.vue:374-386`). The route list that turns the shell field off is **DEMO** `demo/chassis/hero/focal.ts:48-68` (`SELF_STAGES_GL`), read by `demo/shell/AppShell.vue:226-227`.
- Headless caveat: the headless shell's WebGPU adapter came up in under 100 ms; on the owner's Chrome the adapter, shader compile and network are slower, so the black window will be longer than measured here, never shorter.
- Cure: paint the warm ground before JS (a static CSS gradient of the palette in the head or the stylesheet, with `html { background: … }` beside the `color-scheme` write), so the canvas fades in over colour, not over L4 black; keep a warm field behind self-staging routes.

### 10. (f6) Substrates should be a true component, not a screenshot; cards should be more rounded — TRUE

- What is true: of the intro's 11 category cards, 3 carry a live inert component (Display: buttons; Forms: inputs; Dock: a mini dock), 1 carries a picture (Substrates: a 132×82 Canvas2D raster shown at 355×221, a 2.7× upscale, hence the blur), and 7 carry no preview at all (Foundations, Containers, Navigation, Data, Feedback, Motion, Compositions). Card radius is 16px (`--radius-card` = `--radius-2xl` = 1rem); the preview well inside is 4px. Crop: `shots/p10-intro-cards-1440-dark.png`.
- Cause: **DEMO** `demo/chassis/landing/vizPreviewStill.ts:59-60` (`W = 132`, `H = 82`), `:50-55` (the still registry), resolved by `demo/chassis/landing/storyTile.ts:77-84` (authored tile, else still, else none); only four authored tiles exist in the whole demo (`display/buttons.tile.vue`, `display/card.tile.vue`, `dock/overview.tile.vue`, `forms/inputs.tile.vue`). Card corner: `demo/chassis/landing/SectionPreviewCard.vue:31` (`rounded-card`) and `:106` (`calc(var(--radius-card) - 0.75rem)` = 4px). The token is **LIBRARY** `src/styles/theme/radius.css:134` (`--radius-card: var(--radius-2xl)`), `:120` (`--radius-2xl: 1rem`).
- Cure: an authored live tile per category (a parked substrate frame rendered by the real component, not a 132px raster); card radius up a rung or two and an inner radius concentric with it (card radius − padding, not a flat 4px).

### 11. `/dock`: a poor demo, a mess of complexity — TRUE

- What is true: the dock section is the most text-heavy section on the site: `/dock/overview` 706 words over 4.4 screens with 10 docks in main; `/dock/dock-search` 333, `/dock/vertical` 209 (114 before the first dock), `/dock/layers` 209. Every dock story sits on a `DockStage` aurora field at opacity 0.55, and the muted prose over it measures **2.0–2.3:1** in dark (`rgb(172,160,145)` on `rgb(141,98,88)`): 28 low runs on `/dock/overview`, 16 on `/dock/layers`, 14 on `/dock/cta-receive`, 11 on `/dock/dock-search`. Six of eight dock stories have an unrounded dock (point 8). `/dock/controls` mounts four aurora fields. `/dock/dock-search` throws on load: `TypeError: e.addEventListener is not a function`, because `useDockState({ rootEl: dockEl })` gets the `<GlassDock>` component instance, not an element (`demo/stories/dock/dock-search.vue:107-109` (`useTemplateRef<HTMLElement>("dockEl")` → `useDockState({ rootEl: dockEl })`) with `ref="dockEl"` on the `<GlassDock>` component at `:179-180`); its dock is also `:collapse="false"` (`:181`) while its blurb promises "tap the collapsed pill and it morphs". The shell's own docks never collapse (point 2).
- "Full audit from all of our app implementations": not run in this pass; the consumer apps were outside this seat's read scope (see (e)).
- Cause: **DEMO**: `demo/stories/dock/_frame/DockStage.vue:125-131` (the field behind the whole column, `opacityCeiling: 0.55` at `:47`), the dock stories' prose, `dock-search.vue:107-109`. The dark-ink-on-aurora clash is DEMO placement, not a token fault.
- Cure: one dock per idea, each on its own small stage with the prose off the field; fix the dock-search ref (`useTemplateRef` on a wrapper element, or pass `$el`).

### 12. (f7) The dock index: too much text, no dock demos on the cards — TRUE

- What is true: on `/dock`, 1 of 8 cards (Overview) carries a live dock; the other 7 (Layers, Vertical, Sections, Controls, Overflow, CTA → Dock Morph, Search) are title + blurb only, 326 words in all, with blurbs up to 95 words (Dock Controls). Crop: `shots/p12-dock-index-cards-1440-dark.png`.
- Cause: **DEMO**: no `*.tile.vue` beside `demo/stories/dock/{layers,vertical,sections,controls,overflow,cta-receive,dock-search}.vue` (the tile loader `demo/stories/manifest.ts:270`), and the long manifest blurbs `demo/stories/manifest.ts:766-826`.
- Cure: an authored inert dock tile per dock story, blurbs cut to one line.

### 13. (f8) The lower cards clip early; the pager dock is too transparent — TRUE

- Clip: the shell is a grid `"rail main" / "rail dock"` with rows `832px 68px` and `overflow: clip`; `<main>` is the scroller and ends at y=832, the top of the dock row. The cards therefore cut at a hard line at the dock row's top edge, 12px above the dock, and no content ever passes under the dock. Crop: `shots/p13-dock-index-bottom-1440-dark.png`. **DEMO** `demo/shell/dock-nav.css:44-52` (the grid and `overflow: clip`), `:166-168` (main's `grid-area`), `demo/shell/AppShell.vue:303-308` (`<main class="… overflow-y-auto">`) and the comment at `:325-327` ("it cannot occlude the content because an in-flow row has nothing to occlude").
- Transparency: the pager dock's plate is `rgba(…, 0.14)` + `blur(16px) saturate(1.3) brightness(1.14)` in dark and `rgba(…, 0.10)` + `blur(16px) saturate(1.2)` in light: the **same** values as every other dock on the site (sidebar rail, story docks, landing tile). It reads as more transparent because nothing ever scrolls under it: a 14% plate over flat ground shows as almost nothing. Crop: `shots/p13-dock-index-bottom-1440-light.png`. **LIBRARY** for the plate tier (`src/components/dock/styles/dock.css:118-124`, `--glass-veil-tier` from `--dock-plate-{collapsed,expanded}-tier`, `@apply glass-plate`); **DEMO** for the layout that leaves it nothing to frost.
- Cure: let `<main>` run under the dock (dock fixed or overlaid, with a bottom scroll padding equal to the dock), so the cards slide under the glass; raise the resting plate tier if it still reads thin.

### Also found (not named by the owner)

- Hero title overlaps its blurb on all 11 section landings and every hero story (the descender of the fit-capped display h1 crosses the blurb's first line): `demo/chassis/hero/story-hero.css:106-113`, `:127-138` (`line-height: var(--type-leading-display)` with `margin-block-end: 0` in the cluster, `:179-181`). DEMO.
- Body text over chromatic fields: `/substrates/glass-material` 26 runs dark at 1.0–2.9:1 (the h1 itself measures 1.0:1 where it crosses the bright field; "Glass Material" over cream), `/substrates/glass-panel` 10 runs at 1.4–2.1:1 (muted ink on the orange ladder), `/navigation/carousel` 13 runs dark incl. slide labels at 1.03–1.28:1 under `glass-quiet` overlays. DEMO placement.
- Light theme: 812 low runs on 88 routes; 477 of them are `--muted-foreground` (rgb(124,102,80)) at a median 4.36:1 on warm cream. LIBRARY token `src/styles/tokens/color-radius.css:91`.
- `/containers/configurator`: the editor is 9px tall at 1440 and 19px at 390 (point 3).
- Sideways overflow of the main scroller at 390: `/data/virtual-section` (a button row) and `/motion/deck` (the deck strip).
- Console errors: one route, `/dock/dock-search` (point 11).
- The live intro cards: 7 of 11 have no preview (point 10).

---

### (b) Per-route table

| route | words | words before 1st component | component / prose share (1440 fold) | duplicates | canvases (main) · GL/GPU contexts | low-contrast runs d/l/390 | unrounded docks | stage · editor 1440 / 390 | console errors | cold load (dark): FCP → canvas region settled, near-black frames before |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 123 | 26 | 10% / 18% | – | 1 (0) · 2 GL, 1 GPU | 0/11/0 | – | – | – | 532ms FCP → 514ms, 2 black |
| /foundations | 136 | 136 | 0% / 29% | – | 1 (0) · 2 GL, 1 GPU | 0/12/0 | – | – | – | 420ms FCP → 402ms, 2 black |
| /substrates | 187 | 10 | 44% / 16% | – | 1 (0) · 2 GL, 1 GPU | 1/1/1 | – | – | – | 384ms FCP → 559ms, 2 black |
| /forms | 139 | 9 | 9% / 18% | – | 1 (0) · 2 GL, 1 GPU | 0/8/0 | – | – | – | 372ms FCP → 361ms, 2 black |
| /display | 127 | 8 | 2% / 17% | – | 1 (0) · 2 GL, 1 GPU | 0/6/0 | – | – | – | 448ms FCP → 434ms, 2 black |
| /containers | 202 | 202 | 0% / 32% | – | 1 (0) · 2 GL, 1 GPU | 0/13/0 | – | – | – | 360ms FCP → 346ms, 2 black |
| /navigation | 104 | 104 | 0% / 28% | – | 1 (0) · 2 GL, 1 GPU | 1/1/1 | – | – | – | 352ms FCP → 547ms, 2 black |
| /dock | 326 | 9 | 1% / 21% | – | 1 (0) · 2 GL, 1 GPU | 0/8/0 | – | – | – | 432ms FCP → 417ms, 2 black |
| /data | 157 | 157 | 0% / 23% | – | 1 (0) · 2 GL, 1 GPU | 0/8/0 | – | – | – | 404ms FCP → 391ms, 2 black |
| /feedback | 63 | 63 | 0% / 24% | – | 1 (0) · 2 GL, 1 GPU | 0/4/0 | – | – | – | 428ms FCP → 412ms, 2 black |
| /motion | 148 | 148 | 0% / 25% | – | 2 (0) · 2 GL, 1 GPU | 0/0/0 | – | – | – | 428ms FCP → 411ms, 2 black |
| /compositions | 96 | 96 | 0% / 32% | – | 1 (0) · 2 GL, 1 GPU | 0/5/0 | – | – | – | 508ms FCP → 495ms, 2 black |
| /foundations/intro | 101 | 38 | 8% / 20% | – | 1 (0) · 2 GL, 1 GPU | 2/2/2 | – | – | – | 600ms FCP → 693ms, 2 black |
| /foundations/colors | 47 | 45 | 6% / 9% | – | 1 (0) · 2 GL, 1 GPU | 9/2/9 | – | – | – | 492ms FCP → 475ms, 2 black |
| /foundations/typography | 125 | 73 | 0% / 23% | – | 1 (0) · 2 GL, 1 GPU | 3/7/1 | – | – | – | 492ms FCP → 475ms, 2 black |
| /foundations/radii | 48 | 48 | 0% / 6% | – | 1 (0) · 2 GL, 1 GPU | 0/9/0 | – | – | – | 364ms FCP → 353ms, 2 black |
| /foundations/shadows | 51 | 23 | 2% / 4% | – | 1 (0) · 2 GL, 1 GPU | 0/11/2 | – | – | – | 448ms FCP → 430ms, 2 black |
| /foundations/motion | 103 | 46 | 18% / 12% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 452ms FCP → 440ms, 2 black |
| /foundations/paper-glass | 197 | 175 | 0% / 35% | – | 1 (0) · 2 GL, 1 GPU | 4/22/3 | – | – | – | 380ms FCP → 367ms, 2 black |
| /foundations/icons | 103 | 88 | 17% / 9% | – | 1 (0) · 2 GL, 1 GPU | 0/23/0 | – | – | – | 556ms FCP → 541ms, 2 black |
| /foundations/surface-tints | 126 | 126 | 0% / 16% | – | 1 (0) · 2 GL, 1 GPU | 0/3/1 | – | – | – | 368ms FCP → 349ms, 2 black |
| /foundations/overlays-scrims | 70 | 70 | 20% / 11% | – | 1 (0) · 2 GL, 1 GPU | 0/1/1 | – | – | – | 592ms FCP → 578ms, 2 black |
| /foundations/chart-palette | 104 | 49 | 20% / 14% | – | 1 (0) · 2 GL, 1 GPU | 0/2/0 | – | – | – | 416ms FCP → 400ms, 2 black |
| /foundations/css-utilities | 79 | 47 | 17% / 12% | – | 1 (0) · 2 GL, 1 GPU | 0/1/0 | – | – | – | 420ms FCP → 404ms, 2 black |
| /substrates/aurora | 132 | 101 | 20% / 22% | heading "Aurora" ×2; para "Gaussian falloff (larger = bro…" ×5; para "Major-axis orientation in degr…" ×5; para "0..1 · which palette stop this…" ×5 | 1 (1) · 2 GL, 0 GPU | 3/24/4 | – | stage 830×242, editor 400×242 / stage 308×288, editor 308×1 | – | 524ms FCP → 509ms, 2 black |
| /substrates/blob | 254 | 117 | 24% / 19% | 2 Blob stages | 3 (2) · 2 GL, 3 GPU | 1/12/1 | – | stage 830×556, editor 400×481 (scrolls 481/2422) / stage 308×288, editor 308×161 (scrolls 160/2400) | – | 508ms FCP → 491ms, 2 black |
| /substrates/constellation | 520 | 77 | 23% / 38% | 8 constellation canvases | 9 (7) · 2 GL, 1 GPU | 0/0/0 | – | – | – | 388ms FCP → 372ms, 2 black |
| /substrates/fourier-field | 115 | 115 | 26% / 28% | – | 2 (1) · 2 GL, 2 GPU | 0/6/0 | – | stage 830×556, editor 400×513 (scrolls 513/2080) / stage 308×288, editor 308×191 (scrolls 190/2091) | – | 736ms FCP → 724ms, 2 black |
| /substrates/glass-material | 565 | 108 | 8% / 37% | – | 2 (1) · 2 GL, 1 GPU | 26/24/16 | – | – | – | 516ms FCP → 650ms, 2 black |
| /substrates/glass-panel | 78 | 55 | 23% / 8% | – | 2 (1) · 4 GL, 2 GPU | 10/9/12 | – | – | – | 420ms FCP → 407ms, 2 black |
| /forms/inputs | 207 | 40 | 31% / 13% | – | 1 (0) · 2 GL, 1 GPU | 2/12/3 | – | – | – | 376ms FCP → 361ms, 2 black |
| /forms/textarea | 142 | 45 | 38% / 16% | – | 1 (0) · 2 GL, 1 GPU | 1/5/1 | – | – | – | 472ms FCP → 460ms, 2 black |
| /forms/checks | 131 | 43 | 10% / 17% | – | 1 (0) · 2 GL, 1 GPU | 0/7/0 | – | – | – | 472ms FCP → 456ms, 2 black |
| /forms/slider | 60 | 18 | 6% / 8% | – | 1 (0) · 2 GL, 1 GPU | 1/16/1 | – | – | – | 444ms FCP → 425ms, 2 black |
| /forms/number-field | 45 | 17 | 22% / 7% | – | 1 (0) · 2 GL, 1 GPU | 0/7/0 | – | – | – | 564ms FCP → 551ms, 2 black |
| /forms/toggle | 129 | 33 | 5% / 16% | – | 1 (0) · 2 GL, 1 GPU | 3/17/3 | – | – | – | 524ms FCP → 511ms, 2 black |
| /forms/chip | 37 | 26 | 12% / 6% | – | 1 (0) · 2 GL, 1 GPU | 1/4/1 | – | – | – | 368ms FCP → 350ms, 2 black |
| /forms/labeled-field | 117 | 44 | 38% / 15% | – | 1 (0) · 2 GL, 1 GPU | 1/5/2 | – | – | – | 428ms FCP → 409ms, 2 black |
| /display/buttons | 137 | 50 | 12% / 17% | – | 1 (0) · 2 GL, 1 GPU | 3/7/4 | – | – | – | 388ms FCP → 374ms, 2 black |
| /display/surface | 129 | 56 | 18% / 15% | – | 1 (0) · 2 GL, 1 GPU | 4/20/5 | – | – | – | 432ms FCP → 416ms, 2 black |
| /display/card | 91 | 32 | 37% / 10% | – | 1 (0) · 2 GL, 1 GPU | 0/11/0 | – | – | – | 432ms FCP → 421ms, 2 black |
| /display/badge | 214 | 34 | 14% / 18% | – | 1 (0) · 2 GL, 1 GPU | 0/2/2 | – | – | – | 408ms FCP → 390ms, 2 black |
| /display/atoms | 28 | 21 | 48% / 5% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 376ms FCP → 399ms, 2 black |
| /display/music-staff | 303 | 109 | 8% / 26% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 640ms FCP → 629ms, 2 black |
| /containers/dialog | 72 | 53 | 2% / 10% | – | 1 (0) · 2 GL, 1 GPU | 0/12/0 | – | – | – | 400ms FCP → 383ms, 2 black |
| /containers/sheet | 190 | 34 | 5% / 19% | – | 1 (0) · 2 GL, 1 GPU | 1/14/1 | – | – | – | 408ms FCP → 394ms, 2 black |
| /containers/popover | 95 | 22 | 17% / 9% | – | 1 (0) · 2 GL, 1 GPU | 2/13/2 | – | – | – | 552ms FCP → 540ms, 2 black |
| /containers/dropdown-menu | 39 | 21 | 14% / 9% | – | 1 (0) · 2 GL, 1 GPU | 1/6/1 | – | – | – | 488ms FCP → 471ms, 2 black |
| /containers/context-menu | 26 | 26 | 30% / 5% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 392ms FCP → 377ms, 2 black |
| /containers/hover-card | 28 | 22 | 0% / 5% | – | 1 (0) · 2 GL, 1 GPU | 0/2/0 | – | – | – | 368ms FCP → 350ms, 2 black |
| /containers/tooltip | 64 | 43 | 2% / 11% | – | 1 (0) · 2 GL, 1 GPU | 0/5/0 | – | – | – | 412ms FCP → 392ms, 2 black |
| /containers/accordion | 81 | 38 | 36% / 12% | heading "What does Accordion own?" ×2; heading "How does content motion work?" ×2; heading "Which keys are supported?" ×2 | 1 (0) · 2 GL, 1 GPU | 1/6/1 | – | – | – | 388ms FCP → 376ms, 2 black |
| /containers/collapsible | 75 | 33 | 23% / 12% | – | 1 (0) · 2 GL, 1 GPU | 1/9/1 | – | – | – | 348ms FCP → 332ms, 2 black |
| /containers/hover-popover | 99 | 16 | 12% / 15% | – | 1 (0) · 2 GL, 1 GPU | 0/5/0 | – | – | – | 380ms FCP → 364ms, 2 black |
| /containers/expandable-container | 253 | 41 | 23% / 24% | – | 1 (0) · 2 GL, 1 GPU | 0/6/0 | – | – | – | 356ms FCP → 340ms, 2 black |
| /containers/command | 97 | 36 | 13% / 17% | – | 1 (0) · 2 GL, 1 GPU | 1/13/1 | – | – | – | 380ms FCP → 368ms, 2 black |
| /containers/configurator | 59 | 38 | 53% / 10% | – | 1 (0) · 2 GL, 1 GPU | 3/33/3 | – | stage 572×288, editor 572×9 (scrolls 8/613) / stage 308×288, editor 308×19 (scrolls 18/641) | – | 616ms FCP → 599ms, 2 black |
| /navigation/tabs | 340 | 66 | 5% / 28% | – | 1 (0) · 2 GL, 1 GPU | 7/48/8 | – | – | – | 368ms FCP → 355ms, 2 black |
| /navigation/carousel | 274 | 64 | 22% / 28% | – | 1 (0) · 2 GL, 1 GPU | 13/17/9 | – | – | – | 480ms FCP → 466ms, 2 black |
| /navigation/pager-dots | 45 | 41 | 2% / 7% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 364ms FCP → 346ms, 2 black |
| /navigation/toc-tracking | 446 | 68 | 13% / 20% | para "Subsection body content. The d…" ×18 | 1 (0) · 2 GL, 1 GPU | 0/5/0 | – | – | – | 448ms FCP → 434ms, 2 black |
| /dock/overview | 706 | 36 | 60% / 6% | – | 1 (1) · 2 GL, 1 GPU | 28/22/30 | 320×56 [24,10,10,24] need 28; 320×56 [24,10,10,24] need 28; 60×60 [7.4,7.4,7.4,7.4] need 30; 244×60 [30,19.5,19.5,30] need 30; 244×60 [30,16,16,30] need 30; 310×60 [24,10,10,24] need 30 | – | – | 520ms FCP → 507ms, 2 black |
| /dock/layers | 209 | 22 | 62% / 5% | – | 1 (1) · 2 GL, 1 GPU | 16/13/16 | 64×148 [16,16,16,16] need 32; 151×228 [16,16,16,16] need 75.5; 64×148 [16,16,16,16] need 32; 151×228 [16,16,16,16] need 75.5; 228×60 [30,16,16,30] need 30; 228×108 [44.5,46,46,44.5] need 54; 68×160 [16,16,16,16] need 34; 151×225 [16,16,16,16] need 75.5 | – | – | 404ms FCP → 390ms, 2 black |
| /dock/vertical | 209 | 114 | 13% / 26% | – | 1 (1) · 2 GL, 1 GPU | 0/0/1 | 64×277 [16,16,16,16] need 32; 64×277 [16,16,16,16] need 32; 68×297 [16,16,16,16] need 34 | – | – | 384ms FCP → 370ms, 2 black |
| /dock/sections | 75 | 19 | 65% / 4% | – | 1 (1) · 2 GL, 1 GPU | 5/5/6 | 244×60 [21.4,16,16,21.4] need 30 | – | – | 424ms FCP → 541ms, 2 black |
| /dock/controls | 131 | 72 | 50% / 11% | 4 Aurora fields | 4 (4) · 8 GL, 4 GPU | 1/3/2 | 338.7×56 [28,16,16,28] need 28; 338.7×56 [28,18.8,18.8,28] need 28; 338.7×56 [28,16,16,28] need 28; 338.7×56 [28,18.8,18.8,28] need 28; 310×60 [30,16,16,30] need 30; 310×60 [30,16,16,30] need 30 | – | – | 552ms FCP → neverms, 315 black |
| /dock/overflow | 94 | 28 | 60% / 6% | – | 1 (1) · 2 GL, 1 GPU | 0/0/0 | 310×60 [30,16,16,30] need 30 | – | – | 500ms FCP → neverms, 311 black |
| /dock/cta-receive | 125 | 36 | 58% / 6% | – | 1 (1) · 2 GL, 1 GPU | 14/11/14 | – | – | – | 368ms FCP → 352ms, 2 black |
| /dock/dock-search | 333 | 71 | 58% / 7% | – | 1 (1) · 2 GL, 1 GPU | 11/9/9 | – | – | 1: [demo] app error https://vuejs.org/error-reference/#runtime-3 TypeError: e.addEventListene | 384ms FCP → 372ms, 2 black |
| /data/table | 24 | 15 | 32% / 4% | – | 1 (0) · 2 GL, 1 GPU | 1/6/1 | – | – | – | 380ms FCP → 361ms, 2 black |
| /data/data-table | 41 | 30 | 46% / 7% | – | 1 (0) · 2 GL, 1 GPU | 3/14/2 | – | – | – | 352ms FCP → 338ms, 2 black |
| /data/sortable-list | 109 | 22 | 2% / 15% | – | 1 (0) · 2 GL, 1 GPU | 0/7/0 | – | – | – | 380ms FCP → 365ms, 2 black |
| /data/infinite-scroll | 133 | 21 | 1% / 10% | – | 1 (0) · 2 GL, 1 GPU | 0/12/0 | – | – | – | 340ms FCP → 327ms, 2 black |
| /data/timeline | 77 | 19 | 3% / 11% | – | 1 (0) · 2 GL, 1 GPU | 0/6/0 | – | – | – | 412ms FCP → 399ms, 2 black |
| /data/search | 54 | 17 | 3% / 9% | – | 1 (0) · 2 GL, 1 GPU | 0/3/0 | – | – | – | 440ms FCP → 428ms, 2 black |
| /data/virtual-section | 428 | 58 | 2% / 16% | – | 1 (0) · 2 GL, 1 GPU | 0/2/0 | – | – | – | 616ms FCP → 597ms, 2 black |
| /data/metric | 134 | 31 | 20% / 17% | – | 1 (0) · 2 GL, 1 GPU | 0/10/0 | – | – | – | 464ms FCP → 446ms, 2 black |
| /feedback/alert | 46 | 10 | 25% / 7% | – | 1 (0) · 2 GL, 1 GPU | 0/6/0 | – | – | – | 396ms FCP → 383ms, 2 black |
| /feedback/toast | 90 | 14 | 13% / 13% | – | 1 (0) · 2 GL, 1 GPU | 0/18/0 | – | – | – | 464ms FCP → 447ms, 2 black |
| /feedback/progress | 178 | 24 | 7% / 13% | – | 1 (0) · 2 GL, 1 GPU | 0/17/0 | – | – | – | 572ms FCP → 559ms, 2 black |
| /feedback/skeleton | 23 | 16 | 33% / 5% | – | 1 (0) · 2 GL, 1 GPU | 0/1/0 | – | – | – | 432ms FCP → 415ms, 2 black |
| /motion/springs | 119 | 50 | 17% / 16% | – | 1 (0) · 2 GL, 1 GPU | 1/12/2 | – | stage 417×288, editor 417×225 (scrolls 167/678) / stage 348×288, editor 348×191 (scrolls 97/766) | – | 464ms FCP → 449ms, 2 black |
| /motion/curve-gallery | 112 | 40 | 19% / 16% | – | 1 (0) · 2 GL, 1 GPU | 2/17/2 | – | – | – | 384ms FCP → 369ms, 2 black |
| /motion/scroll | 143 | 173 | 0% / 26% | – | 1 (0) · 2 GL, 1 GPU | 1/9/1 | – | – | – | 444ms FCP → 427ms, 2 black |
| /motion/deck | 54 | 54 | 27% / 8% | – | 1 (0) · 2 GL, 1 GPU | 1/3/1 | – | – | – | 392ms FCP → 375ms, 2 black |
| /motion/handmark | 224 | 224 | 0% / 28% | – | 1 (0) · 2 GL, 1 GPU | 1/5/1 | – | – | – | 424ms FCP → 411ms, 2 black |
| /motion/text-motion | 64 | 19 | 3% / 16% | – | 1 (0) · 2 GL, 1 GPU | 2/5/2 | – | – | – | 360ms FCP → 400ms, 2 black |
| /compositions/auth-shell | 59 | 0 | 41% / 2% | – | 1 (1) · 2 GL, 1 GPU | 7/2/7 | – | – | – | 488ms FCP → 623ms, 2 black |
| /compositions/settings | 43 | 19 | 27% / 5% | – | 1 (0) · 2 GL, 1 GPU | 0/23/0 | – | – | – | 464ms FCP → 449ms, 2 black |
| /compositions/empty-states | 32 | 15 | 32% / 6% | – | 2 (1) · 2 GL, 2 GPU | 0/6/0 | – | – | – | 440ms FCP → 425ms, 2 black |
| /compositions/form-validation | 40 | 40 | 10% / 7% | – | 1 (0) · 2 GL, 1 GPU | 0/2/0 | – | – | – | 400ms FCP → 388ms, 2 black |
| /compositions/chassis | 74 | 40 | 18% / 12% | – | 1 (0) · 2 GL, 1 GPU | 1/6/1 | – | – | – | 504ms FCP → 492ms, 2 black |

### (c) The worst twenty pages by prose share of the 1440 dark fold

| # | route | prose share | component share | words | words before 1st component |
|---|---|---|---|---|---|
| 1 | /substrates/constellation | 38% | 23% | 520 | 77 |
| 2 | /substrates/glass-material | 37% | 8% | 565 | 108 |
| 3 | /foundations/paper-glass | 35% | 0% | 197 | 175 |
| 4 | /containers | 32% | 0% | 202 | 202 |
| 5 | /compositions | 32% | 0% | 96 | 96 |
| 6 | /foundations | 29% | 0% | 136 | 136 |
| 7 | /motion/handmark | 28% | 0% | 224 | 224 |
| 8 | /navigation/tabs | 28% | 5% | 340 | 66 |
| 9 | /navigation/carousel | 28% | 22% | 274 | 64 |
| 10 | /substrates/fourier-field | 28% | 26% | 115 | 115 |
| 11 | /navigation | 28% | 0% | 104 | 104 |
| 12 | /dock/vertical | 26% | 13% | 209 | 114 |
| 13 | /display/music-staff | 26% | 8% | 303 | 109 |
| 14 | /motion/scroll | 26% | 0% | 143 | 173 |
| 15 | /motion | 25% | 0% | 148 | 148 |
| 16 | /containers/expandable-container | 24% | 23% | 253 | 41 |
| 17 | /feedback | 24% | 0% | 63 | 63 |
| 18 | /foundations/typography | 23% | 0% | 125 | 73 |
| 19 | /data | 23% | 0% | 157 | 157 |
| 20 | /substrates/aurora | 22% | 20% | 132 | 101 |

### (d) Counts

- routes measured: 92 (×3 cells = 276 page loads; failures: 0)
- prose leads (prose share > component share at the 1440 fold): 50 routes; no live component in the fold at all: 13
- low-contrast text runs (unique element+text, under 4.5:1, 3:1 large): dark 1440 201 on 43 routes; light 1440 812 on 88 routes; dark 390 201 on 48 routes
- docks measured not a full stadium: 25 dock-measurements across the three cells on 6 routes, which are 14 distinct docks after dropping one mid-morph reading (the table in point 8); every shell dock, landing tile and collapsed pill is a full stadium
- routes with a duplicate stage/heading/paragraph: 6
- routes with console errors: 1
- routes whose main scroller overflows sideways at 390: 2
- cold loads timed (dark 1440): 92; with near-black frames before the field settles: 92; median time to a settled canvas region 412 ms; never settled within 3.7 s: 2 (`/dock/controls`, `/dock/overflow`, whose page stays on the black floor)



### (e) What did not run, and the limits of what did

- **Owner point 11's "full audit from all of our app implementations"** did not run: this seat's scope was the demo site, `demo/` and `src/`. The consumer apps (slides, atlas, speedtest and the rest) were not read or loaded.
- **WebKit / Safari**: not run (machine law for this pass). Every number is Chromium headless shell 149 on ANGLE Metal. Load timings are headless and fast; the owner's Chrome will show a longer black window, not a shorter one.
- **Collapsed-then-opened docks**: the hover-open pass ran only at 1440 dark and only on docks that were collapsed at rest (5 routes); every opened dock measured a full stadium. Docks inside closed overlays (menus, sheets) were not opened.
- **Text-over-text**: the overlap detector compares text-run bounding boxes, so a multi-line run's box can overlap a neighbour it does not touch. The overlaps cited above (hero title over blurb, the buttons matrix headers, the f4 header) were confirmed in crops; the per-route overlap lists in `rows/summary.json.gz` include false positives (code spans inside paragraphs) and were not used for counts.
- **Contrast over images and gradients**: the modal-background method is weakest where the run sits on a busy field (mode share under 0.25); those runs are in the rows with their `modeShare`, and the counts include them.
- **Word counts** exclude text inside `content-visibility: auto` subtrees that had not rendered (off-screen section-preview cards), so landing-page word counts are a floor.
- **The sticky header** collapses only under real wheel or touch input; it was checked by wheel on `/navigation/tabs` (both themes), `/display/buttons` and `/data/table` (both one screen long, so no collapse). The 92-route probe scrolled programmatically and so measured the header uncollapsed.
- **Shell dock behaviour at 390** was read at rest only (the rail lives in a Sheet there); the Sheet was not opened.
- Nothing was built, installed, staged or committed. No source file was changed.
