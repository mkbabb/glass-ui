# D3 · pass 1 · X · the constellation

| field | value |
|---|---|
| seat | X, the constellation seat of D3 pass 1 (the glass material: the veil, its ink, live-mode adaptation, the material ladder) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the tree read `d98a09b9` at the start and `a1e72ebd` at the write. `git diff --stat 9aa2b7f9 HEAD -- src` is empty at both, so every `src/` citation holds for the tasked HEAD |
| consumers | read-only. value.js `fcf83068` (pin `^7.0.0`, installed 7.0.0, `package.json:89`); keyframes.js `5cf0f58a` (pin `10.0.1`, `package.json:78`); fourier-analysis `67ad614` (`web/package.json:19`, `10.0.1`); chicago (not a git checkout; `^10.0.1`, installed 10.0.1, `package.json:12`) |
| inputs | `PORTFOLIO.md` §0-§2 and §7; `pass-1/W.md` §1 (read for its finding 2 only). The coordination letters `BK/coordination/chicago-inbound-2026-09-23-dock-live-veil-and-hover-lens.md` (C-2) and `valuejs-outbound-2026-09-23-glass-veil-grey.md` (O-62). The consumers' own GLASS-VEIL-GREY records, all in value.js's X tranche: `docs/tranches/X/COHESION.md` §0cf and §0ci, `execution/LEDGER.md`, `execution/A/X-W7R.md`, `execution/B/KF-W13R.md`, `execution/C/F-W14.md`, `keyframes/evidence/W13R/{m,v}/*.json` |
| instruments | One measurement, of chicago's built site. `chicago/dist` (built 2026-09-23 17:26, same mtime as `src/style.css`, and it carries the 0.62 floor: `grep dock-plate-expanded-tier dist/assets/style-DtE05vYN.css`) served read-only by a scratch Node server on :5471. Probes `chicago-probe.mjs` and `chicago-cap.mjs` under the scratch dir `D3/p1/X/`, Playwright 1.61.1 from `glass-ui/node_modules`, headless Chromium, 1280×900, DPR 1, `reducedMotion: reduce`. Results in `chicago-probe.json`; frames in `cap/chicago-dock-{light,dark}-{shipped,floorless}-k{0,3}.png`. Load averages 19-36. **Playwright WebKit is not Safari**: Playwright WebKit crashed on all four cells (`page.waitForTimeout: Page crashed`, the GlassDock mount crash of PORTFOLIO §1.5). Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox). Everything else in this document is a read of source or of a consumer's own record, cited by file:line |
| deliverable | The census of glass in the four consumers (levels, grounds, themes), every consumer override that reaches the veil, ink or blur, each GLASS-VEIL-GREY record, and the constraint set the families inherit from the consumers |

## 0 · Findings that change the portfolio

1. **chicago's 0.62 floor fixes dark and breaks light.** The floor writes an alpha of the ink veil, and in light the ink is `oklch(0.28 0.035 70)` (`tokens/glass.css:34`). So `max(var(--glass-veil-dock), 0.62)` (`chicago/src/style.css:139-141`) paints a 62% dark-brown plate under near-black ink. Measured over 8 scroll positions on chicago's built page (§2): in light, the fg ink's median ratio on the plate falls from 8.41-13.87 (library veil /0.10) to **2.90-3.92**, and the plate's p05 ratio from 3.29-9.94 to **1.80-3.20**. In dark it rises from 3.51-15.66 to 8.64-15.49. The comment above it was written from the dark report (C-2 row 1; `style.css:124-129`). Any single-alpha floor applied to a light-darkening veil has the same asymmetry. Common-floor row 6 retires this override anyway; what matters for the families is that a floor alpha has to be defined per theme against its own ink, and chicago's reading shows what happens when it is not.
2. **value.js is not on 10.x.** It holds on glass 7.0.0 by ruling (COHESION §0ci R-5). Glass 10's veil turned its plates into a dark-ink wash, and its certified-ink instrument then throws `contrast_unreachable` inside render (`X-W7R.md:103`, `:138`). The 10.0.1 repin is banked as a patch (`evidence/X-W7R/m-repin-10.0.1-migration.patch`, 1965 lines) and lands in X-W7L on top of BL's veil cure. So value.js's GLASS-VEIL-GREY is a render crash, not a paint delta, and the cure has to keep that instrument's model solvable (§3.3).
3. **value.js already publishes a ground, on the CPU, from its config.** `useAtmosphere.ts:222-228` exposes `derivedLightness`, the mean OKLab L of the resolved aurora palette, and threads it to every ink solve (`useAtmosphereBoot.ts:73-92`). The body paints the same palette as four registered `<color>` stops, `--saved-bg-0..3` (`foundation.css:669-676`). Its `ink.ts:93-124` composites the rung alpha over that ambient to certify ink. That is D3-C's declared composite with a config-derived publication (PORTFOLIO §2.5), built on the consumer side. A D3-B or D3-C cure can take `--glass-ground` from these stops, and the consumer-side model can then be removed.
4. **Two consumer overrides write tokens the pinned glass no longer reads.** keyframes `demo/styles/style.css:275-280` sets `--glass-tint-strength-aa: 0%`. The 10.0.1 dist has no `--glass-tint-strength*`, `--glass-tint-source` or `--glass-bg-quiet` (a grep of `keyframes.js/node_modules/@mkbabb/glass-ui/dist` returns nothing), and the gate its comment cites, `proof:glass-and-cartoon`, is not in `package.json` (only `proof:structure` and `proof:publish`, `:51-52`). value.js writes `--glass-tint-source`/`--glass-tint-strength` (`foundation.css:282-283`, `:802`, `:838`) and `--glass-bg-quiet` (`ComponentSliders.vue:314,317`). Those are live at 7.0.0 and dead at 10.x, where the banked patch re-points them (patch lines 134-137, 657-661, 708-709). Neither needs a cure from D3, but neither blocks D3 either.
5. **Every consumer ships both themes, and every dock ink is black or white.** chicago follows the system (`html.dark` was true under `colorScheme: dark` in the probe); fourier seeds `auto` (`App.vue:57`); keyframes threads `isDark` into its aurora (`HeroAurora.vue:164`); value.js does the same (`useAtmosphere.ts:168-190`). On chicago's dock, the tab labels resolve to `rgb(28, 25, 23)` and `rgb(0, 0, 0)` in light and `rgb(233, 230, 226)` and `rgb(255, 255, 255)` in dark, and the count is `rgb(0, 0, 0)` at `opacity: 0.6` (`chicago-probe.json`). The consumer builds its muted register with opacity (`style.css:102-105`) because the dock's muted ink equals its fg (M-4).
6. **Two consumer grounds are isolated groups or root-propagated backgrounds.** This matters for W's luminosity-blend candidate (`W.md` §1 finding 2), which goes flat-grey inside an isolated group and over a root-propagated background. fourier's whole app sits in an `isolate` element that also paints the paper ground (`web/src/App.vue:124`). value.js's gradient ground is the body background, propagated to the canvas and `background-attachment: fixed` (`foundation.css:669-685`); only its aurora is an element. chicago's colour field is an element (`.ground`, `style.css:25-34`) over the root-propagated `--background` (`:16`). This seat has not measured the blend on these compositions; it is a pass-2 probe for that candidate.
7. **Glass over page text is a real ground.** fourier puts `.glass-resting` and `.glass-floating` over running paper prose (`MobileFloatingToc.vue:102,115,147`, `PaperSearchDropdown.vue:177`, `PaperView.vue:534`). Its equation popover and legend sit over its own 2D canvases (`EquationView.vue:521`, `ConvergenceLegend.vue:27`). No library substrate lies under any of them, so D3-B and D3-F reach none of fourier's glass, and neither publishes for any of chicago's (§3.3).

## 1 · The census

Levels at HEAD, read from source. `<Card>` is `.glass-resting` by default (`surface/Surface.vue:46-47`, `card/styles.css:90`). Every portalled overlay (Popover, DropdownMenu, Tooltip, Select, HoverCard) is `.glass-floating .glass-overlay-plate` (`_shared/overlay/content.ts:56-60`). `DialogContent` is `.glass-floating` with `--glass-veil-tier: var(--glass-veil-dialog)` (`dialog/DialogContent.vue:171,182`). The dock plate lerps between `--glass-veil-wash` and `--glass-veil-dock` (`dock/styles/shell.css:146-148`, `dock.css:117-123`). `Metric` cells paint `--glass-plate-wash` (`metric/styles.css:143`). Fields paint the opaque `--input-on-glass` (PORTFOLIO §0.1).

### 1.1 chicago (glass 10.0.1)

Two pages. `/` mounts `TempApp.vue` (`src/main.ts:2`); `/leases/` mounts `App.vue` (`src/leases.ts:2`).

**Grounds.**
- The paper, `--background` (`style.css:16`).
- A fixed `.ground` of three radial gradients (`style.css:25-40`):
  - light: `oklch(0.80-0.82, C 0.08-0.10)` at α 0.30-0.55;
  - dark: `oklch(0.36-0.42, C 0.09-0.10)` at α 0.35-0.55.
- Listing photos inside the cards (`StayCard.vue:116`, `ListingCard.vue:59`). A seen card's photo drops to `saturate(0.25)` and `opacity: 0.7` (`style.css:69-72`).

**Theme.** Both, following the system (`DarkModeToggle`, `TempApp.vue:110`).

| surface | level | over | site |
|---|---|---|---|
| listing and stay cards | `<Card shadow>` → resting | the `.ground` gradients | `StayCard.vue:107`, `ListingCard.vue`, `MarketList.vue`, `OutreachList.vue` |
| metric cells | `--glass-plate-wash` | the gradients | `TempApp.vue:116-119` |
| the filter dock | dock plate | cards, their photos and their text, scrolling under a fixed bottom bar | `TempApp.vue:291-339`, `.page-dock` `style.css:85-98` |
| status popover | floating | the dock, then cards | `TempApp.vue:309-331` |
| the stay editor | dialog | a dimmed page | `StayEditor.vue:3` (Input, Textarea, Select inside: the field well) |

**Overrides that reach the veil, ink or blur.**

| override | site | effect |
|---|---|---|
| dock tier floor 0.62 | `style.css:139-141` | `--dock-plate-{expanded,collapsed}-tier: max(<token>, 0.62)`; the plate paints `color(srgb 0.204 0.148 0.083 / 0.62)` in light and `color(srgb 0.093 0.050 0.009 / 0.62)` in dark (probe). Measured in §2 |
| count muted by opacity | `style.css:102-105` | `.dock-count { opacity: 0.6 }` over the dock's black or white ink |
| cap and run (not D3's) | `style.css:130-138` | `--dock-cap-rest: 9999px`, `.dock-run { overflow: visible }`; C-2 rows 2-3, D2's |

**GLASS-VEIL-GREY record.** chicago keeps none under that id; its record is the C-2 letter (row 1, "live-mode plate too transparent") and the three temporary overrides it lists (`chicago-inbound-…:25-29`). The live dock stamps `unavailable` / `source-unavailable`, and `--glass-backdrop-luma` reads 0 (probe; C-2:10).

### 1.2 fourier-analysis (glass 10.0.1)

**Grounds.**
- Paper with a multiplied texture (`web/src/App.vue:124`; `.paper-texture` restored consumer-side, `style.css:356-366`, screen-blended in dark).
- The visualization canvases: `BasisCanvas.vue:556`, `ConvergencePlot.vue:538`, `FrequencyGraph.vue:186`. They sit inside `.canvas-container.cartoon-card`, which paints `--card` (`F-W14.md:198`).
- An uploaded image in image mode (`F-W14.md:202`).
- Gallery thumbnails.
- Running paper prose.

**Theme.** Both, seeded `auto` (`App.vue:57`).

| surface | level | over | site |
|---|---|---|---|
| the app dock | dock plate, in-flow header, not sticky | paper only | `AppDock.vue:70-71`, `:163-172` |
| the visualization Configurator | floating → **`.glass-opaque`** (the escape) | paper | `VisualizationView.vue:302` |
| equation coefficient popover | floating | the equation card and plot canvas | `EquationView.vue:521` |
| convergence legend | wash | the plot canvas | `ConvergenceLegend.vue:27` |
| equation panel, mode toggle | wash | paper and `--card` panels | `EquationPanel.vue:62`, `EquationModeToggle.vue` |
| page-number overlay | wash | paper prose | `PaperView.vue:534` |
| mobile ToC bar and dropdown | resting / floating | paper prose | `MobileFloatingToc.vue:102,115,147` |
| paper search results | floating + overlay plate | paper prose | `PaperSearchDropdown.vue:177` |
| gallery filter panel | resting | the gallery grid (thumbnails) | `GallerySearchBar.vue:134` |
| gallery card modal | dialog | a dimmed gallery | `GalleryCardModal.vue:309-326` |

`.glass-*` classes appear on 22 lines in 14 files of `web/src` (a grep of the class names); the components add Button ×35, Dialog ×7, Configurator ×7, Popover ×5 and the rest (import census).

**Overrides that reach the veil, ink or blur.**

| override | site | effect |
|---|---|---|
| the Configurator escape | `VisualizationView.vue:290-302` | `.glass-opaque` (`--glass-level: 0` → solid `--card`, `blur(0)`). It was cured against the light veil: before, the aside read `rgba(214.741, 211.937, 207.231)`, ΔE_OK 0.1036 to `--card`, with **38 of 51 inks below AA** (min 2.35); dark read ΔE 0.1445, ink min 5.47 (`F-W14.md:208-209`) |
| strong muted on glass | `PaperView.vue:774-781`, `PaperSearchModal.vue:310-320` | chooses `--muted-foreground-strong` (= `--on-glass-muted-strong`) by hand where the plain rung read 2.88:1 and 1.888:1 on the plate |
| opaque cartoon panels | `style.css:234-239` | `@utility cartoon-card { background: var(--card) }`, so the /equation panels skip glass entirely |
| a hand-rolled blur | `ConvergenceTimeline.vue:130-135` | `.play-btn`: `--background` at 60% plus `backdrop-filter: blur(8px)`, an off-ladder mini-glass |
| a stripped blur | `SpeedSelect.vue:100-107` | `backdrop-filter: none` on a transparent trigger that inherited `blur(8px · --glass-level)` |
| a restored rim | `GalleryCardModal.vue:320-326` | rebuilds the shadow stack with `--glass-material-rim` (not veil; noted for completeness) |

**GLASS-VEIL-GREY record.** Honest-RED on F.W14 by addendum (c) (`X/fourier/waves/F-W14.md:46-49`). Close act 8 re-measured the dock (`F-W14.md:539`): light `.dock-plate` `color(srgb 0.204 0.148 0.083 / 0.1)`, `blur(16px) saturate(1.2)`, over `rgb(251,250,248)`, composite ≈ `rgb(231,229,225)`, "a warm grey"; dark `/0.14` over `rgb(11,10,9)`. It is carried as RELIEVED through every later check (`F-W14.md:669`, `:849`, `:1501`, `:1765`). The pin stays 10.0.1, with no local override on the dock.

### 1.3 keyframes.js (glass 10.0.1)

**Grounds.**
- The paper, `bg-background` (`demo/styles/style.css:288`).
- A fixed two-tier graph-paper `.grid-background` (`EditorShell.vue:216`, `:252`).
- On the home route only, glass's `<Aurora>` at `opacityCeiling` 0.1 (`HeroAurora.vue:25-31`, `:58`). The constant is pinned by a test (`test/demo/instrument/aurora-opacity-ceiling.test.ts`, named at `:23`).
- The scenes: the Amiga three.js canvas (`AmigaScene.vue`), CSS-3D cube, and timeline canvases (`KeyframeTimeline.vue`, `TimelineTrack.vue`, `TimelineHoverPreview.vue`).

The override comment at `style.css:267` calls the stage "a DARK substrate". This seat did not verify that and does not rely on it.

**Theme.** Both; the aurora takes `lightnessScheme` from `isDark` (`HeroAurora.vue:164`).

| surface | level | over | site |
|---|---|---|---|
| ChromeDock | dock plate, collapses to the wash rung | the graph paper, the 0.1 aurora on home, scenes | `app/dock/ChromeDock.vue:366-371` |
| cartoon control panels | `<Card tier="quiet" class="cartoon-surface">` | the graph paper | `SpringPhysicsFacet.vue:15`, `ChannelOptions.vue:7`, `RibbonBar.vue:3`, `KeyframesEditor.vue:14`, `KeyframeTimeline.vue:3`, `MatrixEditor.vue:2` |
| easing sidebar | quiet | the graph paper | `EasingSidebar.vue:15` |
| stage plates | `<Card>` resting | the graph paper | `SquareScene.vue:4`, `SpringTarget.vue:3-4`, `StartingStyleTarget.vue:2-6`, `SequenceTarget.vue:16`, `App.skeleton.vue:99` |
| easing specimen tiles | `data-surface="opaque"` | the stage card | `EasingTarget.vue:98-129` |
| transport panel | wash | the stage | `AnimationControlsGroup.vue:99` |
| tooltips, toasts, dialogs, select, sheet | floating / dialog | varied | imports ×9, ×9, ×4, ×2, ×1 |

**Overrides that reach the veil, ink or blur.**

| override | site | effect |
|---|---|---|
| tint-AA reclaim | `style.css:264-280` | `--glass-tint-strength-aa: 0%` on quiet, wash and resting. **Dead at 10.0.1**: the token is absent from the installed dist, and the gate it cites is gone (§0.4) |
| the sampler feed | `ChromeDock.vue:200-227`, `:370` | `:background-canvas` getter onto `.hero-aurora canvas`; the only consumer that feeds the sampler; every readback is alpha 0 (PORTFOLIO §1.4) |
| toggle track stripped | `EasingTarget.vue:400-416` | `.specimen-grid { background: none; backdrop-filter: none }` over ToggleGroup's quiet track |

**GLASS-VEIL-GREY record.** Honest-RED on KF.W13R (`X/keyframes/waves/KF-W13.md:437-440`; `execution/LEDGER.md:60`, `:698`, `:702`, `:704`). The served-page probe measured, in light (`evidence/W13R/m/before-7.0.0-dev.json` and `v/after-10.0.1-dev.json`):
- **At 7.0.0:** the collapsed plate painted `color(srgb 0.916 0.870 0.829 / 0.328)` and the expanded one `/0.52`, both `blur(7px) saturate(1.2)`.
- **At 10.0.1:** the ink `color(srgb 0.204 0.148 0.083)` at `/0.06` (collapsed) and `/0.1` (expanded), both `blur(16px) saturate(1.2)`.
- **Plate luma** went 221 → 213 on the top dock and 224 → 208 on the bottom one. The ledger rounds the top to 214 (`LEDGER.md:698`); the `gh` runs read 210 and 208.

### 1.4 value.js (glass 7.0.0, held)

**Grounds.**
- **The body gradient.** A 135deg four-stop ground from the derived palette, `--saved-bg-0..3`, viewport-fixed (`foundation.css:669-685`).
- **The atmosphere.** A viewport-fixed WebGL2 aurora from `useAurora` (`color-picker/App.vue:25-35`; `useAtmosphere.ts:158`, `:190-194`), stamped `data-glass-field-canvas` (`App.vue:34`). On low-power or software GL it resolves to `"css"` and paints the same palette as a CSS gradient (`useAtmosphere.ts:147-158`, `:234-238`). **The field is seeded by the colour the user picks**, so its hue is arbitrary. Measured through the door at one seed, the palette ran L 0.50-0.82 in light and 0.18-0.42 in dark (`useAtmosphere.ts:178-181`); the composited ambient ran 0.376-0.936 (`:216-218`).
- The hero blob.
- Live camera video (`workbenches/extract/ExtractWorkbench.vue:44-71`) and an uploaded image (`ImageEyedropper.vue:8`).

**Theme.** Both.

| surface | level | over | site |
|---|---|---|---|
| every pane | `<Card tier="resting">` | the atmosphere | `ColorPicker.vue:11`, `GradientPane.vue:43`, `MixPane.vue:67`, `GeneratePane.vue:33`, `ExtractPane.vue:4`, `ConfigSliderPane.vue:107`, `AboutPane.vue:3`, `NotFoundPane.vue:5`, `PalettesPane.vue:2`, `BrowsePane.vue:2`, `AdminPane.vue:2`, `PaneLoadingPlate.vue:16`, `PaneErrorPlate.vue:21` |
| the sliders console | `<Card surface="veil" tier="quiet">` | the picker plate | `ComponentSliders.vue:26-27` |
| the app dock | dock plate | the atmosphere, top band | `shell/dock/Dock.vue:159-165` (no `background-canvas`) |
| config slider dock | dock plate | a pane | `ConfigSliderPane.vue:171` |
| pane headers | a hand-composed `::before` veil | pane content scrolling under | `shared/ui/PaneHeader.vue:95-110`, `picker/header.css:62-64` |
| eyedropper sheet | floating | the uploaded image | `ImageEyedropper.vue:8` |
| swatch edit overlay | floating | palette swatches | `CurrentPaletteEditor.vue:52` |
| code editor | wash | a pane | `GradientCodeEditor.vue:93` |
| palette and admin dialogs | `DialogContent surface="glass"` | a dimmed pane | `PalettesPane.vue:128`, `BrowsePane.vue:186`, `Admin*Panel.vue` |
| camera controls | `DockControl` capsules with no plate | live video | `ExtractWorkbench.vue:58-69` |

**Overrides that reach the veil, ink or blur.**

| override | site | effect |
|---|---|---|
| the pane-wrapper blur carrier | `styles/shell.css:359-391` | re-hosts the resting rung's `backdrop-filter` on an oversampled, clip-pathed `::before` (inset `-2 × --glass-blur-resting-radius`) and sets the card's own to `none`, to cure the blur's edge-clamp rim |
| the sliders veil lowered | `ComponentSliders.vue:305-318` | `--glass-bg-quiet: card 42%` (light), `50%` (dark); the banked 10.0.1 form is `--glass-veil-tier: var(--glass-veil-wash)` (patch :661) |
| pane-header veil strips | `PaneHeader.vue:101-103`, `header.css:62-64` | paint `var(--glass-bg-resting)` and `var(--glass-blur-resting)` on a masked `::before`; the patch re-points them to `--glass-plate-resting` (:708-709, :797-798) |
| the glass tint | `foundation.css:282-283` | `--glass-tint-source: var(--accent-live)`, `--glass-tint-strength: 4%` (a 7.0.0 axis) |
| prefers-contrast | `foundation.css:797-803` | `--glass-level: 0.1`, tint 0%, muted raised to 88% fg |
| reduced transparency | `foundation.css:832-860` | `--glass-level: 0`, and `background-color: var(--card) !important` plus `backdrop-filter: none !important` on every rung, because a per-element level does not re-resolve the `:root`-baked plate (glass states the same at `glass/surface-axis.css:68-76`; the producer's own arm is `glass/a11y-fallback.css:20-22`) |
| the certified-ink instrument | `color-session/ink.ts:24-124`, `useContrastSafeColor.ts:50-54`, `:148-230` | a consumer model of the producer composite: rung alphas `resting .65/.72`, `floating .80/.88`, `quiet .50/.58`, and `--card` literals (`ink.ts:24-37`), plus a live probe that resolves `--glass-bg-{resting,floating}` and the dock's `backgroundColor`; writes `--accent-live` and `--ink-muted` |
| easing wells | `EasingAuthoringStage.vue:113-124` | `.glass-card` inside the stage → `--well-bg`, `backdrop-filter: none` |
| its own well | `foundation.css:357` | `--well-bg: color-mix(in oklab, var(--card) 92%, var(--foreground) 8%)` |

**The e2e reads `--glass-level` and a resting plate's background** under reduced transparency (`e2e/smoke/a11y-modality-support.spec.ts:198-230`).

**GLASS-VEIL-GREY record.** Honest-RED on X-W7R (`LEDGER.md:36`, `:693-694`; `X-W7R.md:164-167`, `:180`, `:318`). The light `.dock-plate` read:
- at 7.0.0, cream `color(srgb 0.931 0.846 0.816 / 0.5392)` with `blur(7px) saturate(1.2)`; the addendum's 0.328 was read on the main tree;
- at 10.0.1, `color(srgb 0.204 0.148 0.083 / 0.1)` with `blur(16px) saturate(1.2)`.

The sliders veil went from `color(srgb 0.954 0.921 0.888 / 0.443)` to the same ink `/0.1` (`X-W7R.md:101`). **THE STOP (RES-m-1)** is that on the recut veil the certified-ink walk finds no ink and throws in render (`ConsoleRail.vue:48` → `ink.ts:116`). About prose read 2.91:1, and the identity leg read C 0.009 against a floor of 0.037 (`X-W7R.md:126`). The fix is ruled a hold on 7.0.0 (§0ci R-5); X-W7L applies the patch on top of BL's cure (`X-W7R.md:324`).

## 2 · Measured: chicago's dock, with and without its floor (Chromium)

The probe loads the built site, scrolls instantly to 8 evenly spaced positions of the 16,841 px page, and at each position reads the plate's computed paint. It then hides the dock's text and icons (`color: transparent`, `svg { visibility: hidden }`) and captures the plate interior (inset 12 px by 8 px). "floorless" injects `--dock-plate-{expanded,collapsed}-tier` back to the library tokens. Ratios are WCAG, of the first tab label's resolved ink against the plate-interior luminance at p05 (dark ink) or p95 (light ink), the worst case, and at p50. This is the plate interior, not PORTFOLIO's 1 px glyph ring, so it bounds the text ground rather than reading it glyph by glyph. The dock stamps `unavailable / source-unavailable` with luma `0` in every cell.

| theme | variant | plate paint | plate OKLab L p50 (8 positions) | fg ink | p50 ratio | worst ratio |
|---|---|---|---|---|---|---|
| light | chicago floor 0.62 | `…0.204 0.148 0.083 / 0.62`, `blur(16px) saturate(1.2)` | 0.499-0.571 | `rgb(28,25,23)` | **2.90-3.92** | **1.80-3.20** |
| light | library 0.10 | `… / 0.1` | 0.769-0.922 | same | 8.41-13.87 | 3.29-9.94 |
| dark | chicago floor 0.62 | `…0.093 0.050 0.009 / 0.62`, `blur(16px) saturate(1.3) brightness(1.14)` | 0.163-0.226 | `rgb(233,230,226)` | 13.75-15.57 | 8.64-15.49 |
| dark | library 0.14 | `… / 0.14` | 0.153-0.292 | same | 11.30-15.77 | **3.51**-15.66 |

- **Light.** The floor turns a legible grey plate into an illegible brown one: `cap/chicago-dock-light-shipped-k0.png` against `…-floorless-k0.png`. The library veil's light failure is the plate p05 over photos (3.29 at position 1), which is the M-2 content under the dock, not the grey.
- **Dark.** The floor does what C-2 asked for: the worst case goes from 3.51 to 8.64.
- **Playwright WebKit.** Crashed on mount in all four cells. **Real Safari:** UNMEASURED (owner's safaridriver checkbox).

## 3 · The constraint set

### 3.1 Grounds a design must hold legible

Every row is in both themes unless stated.

| ground | where | range (source) | who controls it |
|---|---|---|---|
| paper, flat or textured | all four; fourier's texture is `multiply` in light and `screen` in dark (`fourier style.css:356-366`) | L 0.985 light, 0.146 dark (PORTFOLIO §1) | the library tokens |
| graph paper plus a 0.1 aurora wash | keyframes home (`HeroAurora.vue:58`, `EditorShell.vue:252`) | dock luma 208-224 of 255 at 10.0.1 (W13R) | the library substrate, with the consumer's ceiling |
| a user-seeded aurora | value.js (`useAtmosphere.ts:158-194`) | arbitrary hue; L 0.50-0.82 light and 0.18-0.42 dark at the probed seed; composited ambient 0.376-0.936 (`:178-181`, `:216-218`) | the library's `useAurora` on the consumer's canvas, WebGL2 or CSS mode |
| a consumer CSS gradient field | chicago `.ground` (`style.css:25-40`) | light stops L 0.80-0.82, C 0.08-0.10 at α 0.30-0.55; dark L 0.36-0.42 | the consumer, static |
| photographs | chicago cards under the dock (§2); value.js image and camera | under the library's thin veil, plate p50 L 0.77-0.92 in light; the p05 carries the dark details | nobody |
| live video | value.js camera (`ExtractWorkbench.vue:44-71`) | unbounded; controls sit on video with no plate | nobody |
| 2D and WebGL canvases the consumer draws | fourier plots (on `--card`), keyframes Amiga and timelines | the canvases' own content | the consumer |
| running text | fourier's ToC, search and page overlays (§1.2) | text-over-text, with high local contrast | nobody |

### 3.2 Overrides the cure must make unnecessary

Each row retires by E-6 addendum in the consumer's own tranche once the named witness is green.

| override | retires when | witness |
|---|---|---|
| chicago dock floor 0.62 (`style.css:139-141`) | the dock clears M-2 over photos in both themes with no consumer tier write | §2 re-run; M-5 |
| chicago count opacity (`style.css:102-105`) | the dock has a muted register distinct from fg | M-4 |
| fourier `.glass-opaque` Configurator (`VisualizationView.vue:302`) | a floating plate over paper keeps its inks ≥ 4.5 and its ΔE to `--card` ≤ 0.02 | fourier's own `f-w14-veil.spec.ts` gate (`F-W14.md:202-209`), M-1 |
| fourier strong-muted picks (`PaperView.vue:781`, `PaperSearchModal.vue:320`) | plain muted clears 4.5 on wash and floating over paper prose | M-2 on a text ground |
| fourier `cartoon-card` opaque panels (`style.css:234-239`) | optional: a design choice, not a legibility escape. It stays unless the owner rules otherwise | none |
| fourier `.play-btn` hand blur (`ConvergenceTimeline.vue:130-135`) | a ladder rung serves an on-canvas control | token hygiene, not a witness |
| keyframes tint-AA reclaim (`style.css:264-280`) | already dead at 10.0.1; delete | none |
| keyframes `:background-canvas` binding (`ChromeDock.vue:370`) | the dock needs no readback | M-5 |
| value.js pane-wrapper carrier (`shell.css:359-391`) | the ladder's blur shows no edge-clamp rim at a card edge | a rim probe (BG P3/P10 rider, `shell.css:354-358`); not in M-1..M-8 |
| value.js reduced-transparency `!important` (`foundation.css:846-860`) | a descendant `--glass-level: 0` re-resolves the plate at the element | the e2e at `a11y-modality-support.spec.ts:198-230` |
| value.js prefers-contrast `--glass-level: 0.1` (`foundation.css:803`) | the producer's contrast arm (`a11y-fallback.css:28`, level 0.3) clears the text floors | M-2 under `prefers-contrast: more` |
| value.js sliders veil lowered (`ComponentSliders.vue:314-317`) | the quiet rung reads as glass over the picker plate | none today; the owner's "veil clarity" |
| value.js header strips on `--glass-plate-resting` (`PaneHeader.vue:101`) | stays as a reader of the one plate token. The cure must keep that token, or its renamed successor, a painted colour a consumer can use on its own element | M-1 on the strip |
| value.js certified-ink model (`ink.ts:24-37`) | the producer's ink is solved against the painted composite, or the producer publishes the composite it paints | THE STOP clears at X-W7L with no consumer model |

### 3.3 What each family asks of the consumers, and whether they can supply it

| family | declaration it asks for | value.js | keyframes | fourier | chicago |
|---|---|---|---|---|---|
| D3-A ground pole | none | none | none | none | none. Over photos only the any-input bound holds, which is near-opaque for muted (PORTFOLIO D3-A risk 3) |
| D3-B field signal | library substrates publish; other regions need `declareField()` or take the ceiling | publishes free **only if** publication lives in `useAurora` and covers its WebGL2 and `"css"` arms, not only `<Aurora>`'s WebGPU arm (`useAtmosphere.ts:158`, `:190-194`) | `<Aurora>` publishes, but the ground is that field at opacity 0.1 over graph paper (`HeroAurora.vue:58`); the published value must be the composite, or it is wrong by the whole ceiling | nothing publishes: 2D canvases, images, prose | nothing publishes: a CSS gradient, photos |
| D3-C cascade ink | `--glass-ground` per scope (a registered `<color>`) | **can**: `--saved-bg-0..3` are registered `<color>`s on `:root`, and `derivedLightness` exists (§0.3). The ground is a 4-stop ramp, so a single colour carries the ramp's spread as model error | **can**: `--background` (the paper) at ceiling 0.1 | **can** for paper and the plot stage (`--card`, `F-W14.md:198`); **cannot** for images or prose | **can** for the `.ground` field (a static mean of three gradients); **cannot** for photos, where a declared colour lies (PORTFOLIO D3-C Q6) |
| D3-D calibrated ladder | corpus contributions | the aurora across seed space, since the hue is user-driven | the hero at 0.1 | plot canvases, paper prose | photos: these are scraped listing photos, so their licence for a public corpus is unknown |
| D3-E self-grounded ink | none; the collision risk is consumer `text-shadow` | 0 non-`none` `text-shadow` declarations | 0 | 0 | 0 (a grep over each consumer's CSS and Vue) |
| D3-F yielding field | glass rects registered with the substrate | reaches every pane, since all sit over the one atmosphere; needs registration on `useAurora`'s canvas | a well in a 0.1-ceiling field moves little | nothing yields | nothing yields |

### 3.4 Constraints on the design, from the consumers

1. **Floors are per theme.** A single alpha applied to a light-darkening veil harms light while it helps dark (§2). Any floor, band or bound is stated per theme, against that theme's ink.
2. **The plate token stays a paintable colour.** value.js paints `var(--glass-plate-resting)` on its own elements (header strips) and probes it from JS (`useContrastSafeColor.ts:148-230`, the patched form). A design that moves plate composition entirely into an element-local utility must leave consumers a public way to paint the same plate on their own element.
3. **A descendant level must work.** value.js's `!important` exists because per-element `--glass-level: 0` does not re-resolve `:root`-baked plates (`surface-axis.css:68-76`). A design that composes at the element makes both value.js's reduced-transparency block and fourier's `.glass-opaque` (which works only because it sets the solid `--card` directly) one mechanism.
4. **The dock's muted register is owed to consumers.** chicago synthesizes it with opacity, and value.js's instrument probes the dock's `backgroundColor` to certify its ink (`useContrastSafeColor.ts:152-154`).
5. **value.js is the only consumer whose field hue is user-driven.** Its field and ground cover arbitrary hues at L 0.50-0.82 in light (§3.1). A D3-A bound calibrated to the default aurora config does not cover it; the bound has to be stated over hue as well as lightness.
6. **Two consumers put glass over content no library substrate owns.** fourier puts it over prose and canvases; chicago puts it over photos. D3-B and D3-F cover neither; the family chosen needs a stated answer for them that is not a masking fallback (E-2).
7. **The live channel's only feeder is keyframes.** Its binding (`ChromeDock.vue:370`) goes under every family (PORTFOLIO §2.6 row 6). No other consumer passes `backgroundCanvas`. value.js's `data-glass-field-canvas` stamp (`App.vue:34`) is read by nothing at 10.x (PORTFOLIO §1.7).

## 4 · Not measured here

- fourier's and keyframes' served pages. Both need a running app (fourier also its API), and value.js runs a live session this seat may not touch. Their numbers are the consumers' own records (§1.2-§1.4), cited as those seats measured them.
- value.js at 10.x in paint. The repin is a banked patch, and applying it would mean building in the consumer's tree.
- The luminosity-blend candidate on the consumers' isolated and root-propagated grounds (§0.6).
- All Playwright WebKit cells (crash on GlassDock mount) and all real-Safari cells: UNMEASURED (owner's safaridriver checkbox).

## 5 · Commands and artefacts

Scratch root: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D3/p1/X/`.

- `node serve.mjs ~/Programming/chicago/dist 5471`, a read-only static server, stopped after the runs.
- `node chicago-probe.mjs` → `chicago-probe.json` (Chromium 4 cells × 8 scroll positions; the WebKit cells crashed).
- `node chicago-cap.mjs` → `cap/chicago-dock-*.png`.
- Census greps: `grep -rn -E "glass-(wash|quiet|resting|card|floating|overlay|opaque)\b"` and `grep -rn -E "\-\-glass-[a-zA-Z0-9-]+\s*:"` over `value.js/demo`, `keyframes.js/demo`, `fourier-analysis/web/src`, `chicago/src`, and the tint-token grep over `keyframes.js/node_modules/@mkbabb/glass-ui/dist`.
- No worktree was created: nothing was built and no source was edited.
