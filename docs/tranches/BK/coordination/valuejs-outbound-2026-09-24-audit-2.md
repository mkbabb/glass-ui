SERVED MODEL: claude-opus-5-5

# value.js → glass-ui (BL) · O-74 · 2026-09-24 · AUDIT-2 glass rows (62)

**Id note.** The orchestrator minted this letter as O-69. O-69 is already taken in the value.js INBOX (the X.KF.W13V `.k` addendum beside O-60), and O-70..O-73 are taken too. To avoid a second id collision this letter is rowed **O-74**.

**From**: value.js tranche X orchestrator (COHESION §0cq / §0cu, 2026-09-24)
**To**: glass-ui (BK dir; for BL's formation)
**Path of record**: `value.js/docs/tranches/X/relay/X-ALL-BK-AUDIT-2.md`; mirror `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-24-audit-2.md`, byte-identical.
**Spec**: `value.js/docs/tranches/X/audit/AUDIT-2.md` (Lens 1 component cogency, Lens 2 mobile views, Lens 3 hierarchy and space).
**Registers**: `value.js/docs/tranches/X/audit/AUDIT-2-{value,keyframes,fourier}.md` (value.js 44 rows · keyframes.js 60 · fourier 62). Every BROKEN and HIGH row was re-measured by the register seat on the served page. Evidence paths below are relative to `value.js/docs/tranches/X/audit/audit-2/`.
**Instrument**: headed Chromium on the real GPU; 360, 390 and 430 portrait, 844x390 landscape, 1440 desktop; light and dark. Served at value.js :9000, keyframes :5173, fourier :3100.
**Trees**: value.js `868e69a9` (installed glass **7.0.0**) · keyframes.js `a939e7d6` (glass **10.0.1**) · fourier `7ad6be2` (glass **10.0.1**). glass-ui source read at `1f2dbb5a`/`25c205a9`, and spot-re-read by this seat at HEAD `37eef6e5` (no `src/` change since `1f2dbb5a`; the open-at-HEAD claims below still hold: `PopoverContent`/`DropdownMenuContent` set no `collisionPadding`, the overlay-plate `overlay` role has no block clamp, `DialogContent` caps height only under `scroll`, `material.css:35-47` still pins `.glass-floating` to `position: relative`, `env(safe-area-*)` appears only in `deck/styles/stage.css`).

## The owner's words, verbatim (2026-09-24)
> ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project. … Audit every mobile view for every mobile app view for all projects, too. … All issues should be fixed at the glass-ui root, too. … Ensure proper design hierarchy and usage of space in all UIs hereof

## How to read this letter
- **Scope.** Every AUDIT-2 row whose owner cell names GLASS: value.js 13 · keyframes.js 24 · fourier 25 = **62**. The consumer halves stay with the apps (X-W12 · KF.W13X · F.W14U).
- **Dedupe.** Rows already asked in O-53..O-73 (including O-59's UIA rows and the O-63/O-65 addenda) are **CITE** rows: they add a new witness or a new site and repeat nothing. Status key:
  - **NEW**: a new glass ask.
  - **CITE**: already asked; the earlier id stands and this row is one more witness.
  - **CURED@HEAD**: glass HEAD already cures it; adopt at the consumer repin (I-30), then re-measure.
  - **RULING**: glass must rule (ship it, or record the exception).
  - **HELD**: plausible, not measured on screen; no ask until it is.
- **Cross-app duplicates are merged.** Where two or three apps hand-build the same thing, the rows are one glass ask with several witnesses (the owner's "KISS, DRY").
- **Tally.** NEW 30 · CITE 22 · CURED@HEAD 3 · RULING 6 · HELD 1 (62).
- **The ask.** Fix the producer half at the root, name the landing version per group, and confirm or refute each claim with a measurement. No consumer builds a local copy of a glass surface meanwhile; each app records honest-RED against the row id.
- **Pin gap (O-56 R-5 stands).** value.js still installs 7.0.0.

Columns: row · sev · app · view · defect, and the glass half of the cure · glass file · evidence · status.

## 1 · Sheet (SheetContent · detents · sheet styles) — 4 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-KE-L2-2 | BROKEN | keyframes.js | mobile controls sheet, every scene, <1024 incl. 844x390 | The sheet computes `position: relative`: `.glass-floating` in `material.css:35-47` (0,1,0) beats `:where([data-slot=sheet-content]) { position: fixed }`. Its top stays at vh−128 and raising the detent grows the box off-screen (390x844: [716,887] at 0.12, [716,1020] at 0.36; 844x390: [262,467]). Cure: the sheet's positioning wins over the material rule; add `inset-inline: 0` for `side=bottom`. | `styles/glass/material.css:35-47`, `components/sheet/styles.css:28-33`, `SheetContent.vue:106` | `keyframes-L2/frames/SHEETPOS-*.png` | CITE: SHEET-POSITION (BL F-21), UIA-KF-005/006 |
| A2-KE-L2-1 | BROKEN | keyframes.js | top-dock surface items, touch, 360/390/430/844x390 | A touch tap on a dock item opens the non-modal detented sheet, and 3 ms later its outside-press dismissal closes it. reka's DismissableLayer defers touch pointer-down-outside to a document click that runs after the item's click, so the tap counts as outside. At 390x844 a touch tap leaves the detent at 0.12; a mouse click gives 0.36. Cure: a non-modal detented SheetContent does not outside-dismiss on presses on dock chrome (`[data-dock-tether]` / `.glass-dock`). | `components/sheet/SheetContent.vue` | `keyframes-register/frames/L2-1-cube-390-{tap,click}.png`; `keyframes-L2/probe/debug3.mjs` | NEW (distinct from UIA-KF-216) |
| A2-KE-L2-3 | HIGH | keyframes.js | every scene, 844x390, with the SHEET-POSITION cure simulated | The detent ladder is degenerate in landscape: peek and 0.36 are the same 204 px, the sheet covers the stage and rises under the top dock (sheet [58,262], dock ends at 91). Cure (glass half): a top-clearance lever on the detented Sheet. | `components/sheet/styles.css` | `keyframes-register/frames/L2-3-SIM-*.png` | NEW |
| A2-KE-L2-7 | MEDIUM | keyframes.js | detent handle at peek, 390x844 / 844x390 | The handle sits under the transport (7 of 11 hit samples land on the dock) and a tap does nothing. Cure: a tap on the handle steps to the next rung. | `SheetContent.vue`, `sheet/styles.css:255-305` | `keyframes-L2/probe/handle.mjs` | CITE: UIA-KF-005/216; tap-to-step is NEW |

## 2 · Dock (touch floor · safe area · inline cap · collapsed form · overflow cue) — 9 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-VA-L2-6 | HIGH | value.js | dock main, all viewports | Dock triggers under 44 px on coarse pointers (390: Select view 58.7x33.4, Toggle action bar 33.4x33.4, Menu 42.7x33.4, seats 32x32). HEAD `touch-floor.css:41-44` adds the coarse `::after` hit-slop for the triggers. | `dock/styles/controls/touch-floor.css:41-44` | `value-register/confirm.json` | CURED@HEAD (UIA-V-76) |
| A2-KE-L2-6 | HIGH | keyframes.js | top dock expanded, all mobile widths | The four surface items (Controls, Keyframes, Timeline, scene facet) paint and hit at 30.8x30.8 (`dock-icon-button--compact`, `::after` none; 6 px beyond the edge misses). Compact buttons are exempt from the floor and the hit-slop targets only the three trigger classes. Cure: extend the self-limiting `::after` hit-slop to `.dock-icon-button--compact` under `pointer: coarse`. | `touch-floor.css:25-44`, `icon-button.css:235-240` | register re-measure at 360 and 390 | NEW (at 10.0.1 and HEAD) |
| A2-VA-L2-7 | LOW | value.js | action bar, 360 | The Open color input toggle is clipped past the dock edge (27 px stays visible and tappable; the layer scrolls). Register downgraded it from BROKEN. | dock layer | `value-register/frames/l2-7-360-actionbar.jpg` | CITE: UIA-V-10/8 |
| A2-FO-L2-2 | HIGH | fourier | /w, /v Canvas tab + fullscreen, all phone widths | Bottom-anchored docks sit in the home-indicator zone: the animation dock ends 16 px inside a 34 px inset, the fullscreen dock 22 px inside. No glass dock or Configurator overlay slot reads `env(safe-area-inset-bottom)`. Cure: bottom-placed docks and the Configurator stage overlay slot offset by `max(own gap, env(safe-area-inset-bottom))` through one root token (`--safe-block-end`). | `components/dock` (placement), `configurator` overlay slot | `fourier-register/confirm.json` L2-2_*; `fourier-L2/frames/v360-light-w-canvas.jpg` | NEW |
| A2-VA-L2-12 | LOW | value.js | shell | No safe-area handling at all (`index.html:15`). Glass half: the dock inset is `env()`-aware. One fix with A2-FO-L2-2. | `components/dock` | `index.html:15` | NEW (merged with A2-FO-L2-2) |
| A2-KE-L2-16 | LOW | keyframes.js | top dock at 360 | The dock leaves 8.6 px gutters against the 16 px page gutter; its inline cap is not bounded by the page gutter. Cure: cap at `calc(100dvw - 2 * var(--page-gutter, 1rem))`. | `dock/styles/shell.css` | `keyframes-L2` `cube-360x780-light-s1-dock-expanded.png` | NEW |
| A2-KE-L2-8 | BROKEN | keyframes.js | collapsed transport, every scene, phones and 1440 | The collapsed plate (x 165-225) is sized to the summary square while two items are slotted in: the Pause mirror (133-177) and the "Rotations" label (183-257) paint outside it. | `components/dock` collapsed layer | `keyframes-L2/frames/cube-390x844-light-s1-dock-expanded.png` | CITE: O-65 DOCK-COLLAPSED-FORM, UIA-KF-032 |
| A2-FO-L2-13 | BROKEN | fourier | /w, /v collapsed animation dock, all widths | The collapsed dock spills its speed readout (scrollWidth 144 vs clientWidth 110 portrait, 147/110 landscape). The consumer half landed at `b62821d`. | `dock/styles/morph.css` (`.dock-layer--summary`) | `fourier-register/confirm.json` L2-2_*, L2-4_l844_wcanvas | CITE: O-65, UIA-F-6 |
| A2-FO-L2-15 | HIGH | fourier | /w contour editor expanded dock, 360/430 | The expanded editor layer is 432 px inside 183 (360) / 253 (430); more than half of its 8 buttons sit behind an unmarked sideways scroll. Glass half: the overflow cue. | dock overflow cue | `fourier-register/confirm.json` L2-15_*; `fourier-L2/frames/v360-light-w-editor-expanded.jpg` | CITE: UIA-F-215/F-88 (cue at HEAD; adopt at repin) |

## 3 · Popover · Menu · overlay plate (floating clamp, collision padding, scroll cue, Toaster) — 6 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-VA-L2-1 | BROKEN | value.js | /browse Filters, 844x390 | The Filters popover flips upward and runs off the top (y −247.5, h 470.1, `max-height: none`); SORT and TIER cannot be reached. At HEAD, `overlay-plate.css` clamps the `menu` and `tooltip` roles to `--reka-popper-available-height`, but the `overlay` role that Popover wears has only an inline-size rule. Cure: clamp the `overlay` role the same way. | `styles/glass/overlay-plate.css` | `value-register/frames/l2-1-l844-dark-filter.jpg` | NEW (partial UIA-V-32) |
| A2-FO-L2-12 | HIGH | fourier | shell About and Login popovers, View options, animation more menu | Floating plates run into the viewport edges (Login [0..336] at 360, About [54..390] at 390); the more menu rises over the app dock. PopoverContent and DropdownMenuContent keep reka's `collisionPadding: 0`; only `SelectContent.vue:56` sets 16. Cure: default `collisionPadding` in both to a viewport-pad token. | `popover/PopoverContent.vue`, `menu/DropdownMenuContent.vue` | `fourier-register/confirm.json` L2-12_*; `fourier-L2/frames/v360-light-shell-login.jpg` | CITE: UIA-F-56/219 (new sites) |
| A2-KE-L2-12 | LOW | keyframes.js | Share popover, portrait phones | The popover has a 0 px left gutter. Same cure as A2-FO-L2-12. | `popover/PopoverContent.vue` | `keyframes-L2` `OV-cube-390x844-light-o4-share-popover.png` | CITE: UIA-KF-056/113 |
| A2-VA-L2-3 | MEDIUM | value.js | dock overlays, 844x390 | Dock overlays clamp to 60dvh in landscape with no scroll affordance. Cure: ceiling `min(24rem, available height)` plus a scroll fade. | `styles/tokens/offsets.css:82` | `value-L2` `metrics-l844.json` | NEW (partial UIA-V-66) |
| A2-KE-L2-17 | LOW | keyframes.js | @mbabb menu at 844x390 | The menu is clipped to 234 px by its available-height cap, with no sign of the overflow. Cure: the same scroll fade on overflowing menu content. One fix with A2-VA-L2-3. | `components/dropdown-menu` | `keyframes-L2` `OV-cube-844x390-light-o2-mbabb-menu.png` | NEW (merged with A2-VA-L2-3) |
| A2-KE-L1-27 | LOW | keyframes.js | dialogs and popovers with toasts | Three hand-wired interact-outside guards read glass's private `data-slot` marker (`toastGuard.ts`, `KeyboardShortcutsModal.vue:83-88`, `SharePopover.vue:64-68`, `CSSPasteDialog.vue:16-20`), because the Toaster portals outside the overlay layer. Cure: overlays ignore outside interactions that land inside the Toaster. | `dialog/DialogContent.vue`, `popover/PopoverContent.vue`, `sheet` | keyframes source | NEW |

## 4 · Dialog and the destructive confirm — 4 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-FO-L2-8 | BROKEN | fourier | /w Export modal at 844x390 | The dialog is taller than the landscape viewport and cannot scroll (498 px, y −54 to 444, scrollHeight = clientHeight 496, overflow visible); the title and the Cancel/Download footer are unreachable. glass caps height only under the `scroll` opt-in (`DialogContent.vue:183`). Cure: cap every DialogContent at `calc(100dvh - 2 * gutter)` with `overflow-y: auto` by default. The consumer passes `scroll` meanwhile. | `dialog/DialogContent.vue:176-185` | `fourier-register/frames/L2-8_l844_export.jpg` | NEW |
| A2-VA-L1-6 | MEDIUM | value.js | /palettes, /browse, /admin/* | Six destructive confirm dialogs are copies of one recipe (`PalettesPane.vue:127-146`, `AdminFlaggedPanel.vue:183-201`, 4 more). | `components/dialog` | value.js source | RULING (see below) |
| A2-FO-L1-9 | MEDIUM | fourier (+ value.js, keyframes.js) | /gallery batch, admin users, admin flagged | Three hand-built destructive confirms in fourier, six sites across three apps (`GalleryView.vue:160-230`, `AdminFlaggedPanel.vue:164-200`, `AdminUserList.vue:138-180`; value.js `AdminUsersPanel.vue:235-251`, `PalettesPane.vue:126`; keyframes `MbabbMenu.vue:289`), each with its own pending-intent and in-flight guard. | `components/dialog` | fourier source | RULING (merged with A2-VA-L1-6) |
| A2-KE-L3-17 | LOW | keyframes.js | pointer-opened dialogs, 1440 | The focus ring paints on the close button when a dialog opens by pointer, the heaviest mark in the header. | dialog initial focus | `keyframes-L3` `1440-dark/ov-09-clear-all.png` | CITE: UIA-KF-253 |

**Ruling asked on the confirm (A2-VA-L1-6 + A2-FO-L1-9).** The two seats asked differently. value.js asked for a `ConfirmDialog` composite. fourier read the standing glass rule in `dialog/DialogContent.vue:21-28` ("no `Confirm*`/`Gate*` symbol is minted … named presets live in consumers"; `dismissal="deliberate"` is the confirm rung) and asked only for a logic-only `useConfirm` composable (pending intent, in-flight guard, close on settle) within that rule. Please rule one of: (a) keep the rule, and the three apps share one consumer preset each over `dismissal="deliberate"`; (b) ship `useConfirm`; (c) mint the composite. The six sites port once the ruling lands.

## 5 · Menu-item anatomy and the identity surface (DropdownMenuItem · dock attribution · account) — 4 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-KE-L1-25 | MEDIUM | keyframes.js (+ value.js, fourier) | @mbabb menu = value.js ProfileSection = fourier AppDock | The identity surface is hand-built in three apps on three primitives (`MbabbMenu.vue:5-283`; value.js `ProfileSection.vue:151-200`; fourier `AppDock.vue:75-113`). `DropdownMenuItem.vue:41-46` has no leading-glyph or description slot. Cure: `#leading` and `#description` slots on DropdownMenuItem, plus an identity-block recipe. | `menu/DropdownMenuItem.vue` | source, three apps | NEW (partial O-61, O-71 (4)) |
| A2-VA-L1-7 | MEDIUM | value.js | dock, all 3 apps | The @mbabb attribution menu is hand-authored in each app, and twice in value.js (`ProfileSection.vue:152`, `MobileMenuDropdown.vue:43`). Cure: a glass dock attribution menu. One ask with A2-KE-L1-25. | `components/dock`, `menu` | value.js source | NEW (merged with A2-KE-L1-25) |
| A2-FO-L1-17 | LOW | fourier (+ value.js) | shell dock account group; value.js palettes | The slug-identity control is written once per app (fourier `UserSlugBar.vue` 279 lines; value.js `PaletteSlugBar.vue` 241 lines) over one shared slug-session model. Candidate: a presentation-only `DockAccount`/`SlugIdentity` that emits events out. | `components/dock` (candidate) | source | RULING (candidate) |
| A2-KE-L2-13 | LOW | keyframes.js | @mbabb menu dark row, touch | Only a 28 px toggle inside the 258x53 row acts; there is no dark-mode menu-item form. | DARK-MENU-ITEM | `keyframes-L2` `darkrow.mjs` | CITE: O-61 R-3 |

## 6 · Card and CardHeader — 2 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-VA-L1-2 | HIGH | value.js | / picker header and every pane header | Two local scroll-condense headers (`PaneHeader.vue`, 237 lines; `useHeaderCondense.ts`, 138 lines) exist because 7.0.0 has no real-box condense. At HEAD, `CardHeader.vue:19-70` (hysteresis 20/12, `hasRoomToCondense`) and `card/scroll.css:96-105` ship it. The **PaneHeader scroll veil** (the fade under a condensed header) is still open at glass. | `card/CardHeader.vue`, `card/scroll.css` | value.js source; `value-register` | CURED@HEAD (condense); veil NEW (partial UIA-V-3) |
| A2-VA-L3-2 | MEDIUM | value.js | admin, palettes, config, mix, generate | No header actions seat, so each pane spends a full row on its section actions (`CardHeader.vue:86`). Cure: a CardHeader `#actions` slot, the Card twin of O-68's ConfiguratorLayer ask. | `card/CardHeader.vue:86` | `value-L3` `metrics.json` lone rows | NEW (sibling of O-68) |

## 7 · Configurator · LabeledField · layout gutter — 5 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-FO-L3-8 | MEDIUM | fourier | /w aside Decomposition and Contour layers | A lone Reset icon takes a whole row atop each layer; the label truncates at 390. Still RED at HEAD (`ConfiguratorLayer.vue:96-190`, default slot only). | `configurator/ConfiguratorLayer.vue` | fourier `BasisSelector.vue:137-150` | CITE: O-68, UIA-F-134/238 |
| A2-VA-L3-3 | MEDIUM | value.js | /atmosphere, /blob | ConfiguratorRow stacks the label over the control at every width (blob inspector 2693 px tall). Cure: a container-query inline mode (label and control on one line where they fit). | `configurator` row | `value-L3` metrics | NEW (partial UIA-V-397/163) |
| A2-FO-L3-7 | MEDIUM | fourier | /w Export Frame dialog, 1440 and 390 | `LabeledSwitch layout=horizontal` uses the text-field form grid: switches float mid-dialog at 1440 and stack at 390 (six switches, twelve rows). Cure: a LabeledSwitch settings-row arm (label and description `1fr`, switch `auto`, end-aligned, never collapses) as its default. | `labeled-field/LabeledField.vue:121-134`, `LabeledSwitch.vue` | `fourier-L3/frames/{d-light,m-dark}-workspace-4-export-dialog.png` | NEW |
| A2-FO-L3-5 | MEDIUM | fourier | /w, /v workspace aside, 1440 and 390 | The aside draws two rims around every section (Configurator plate, a consumer Card, then ConfiguratorLayers' own plate); at 390 content starts at x=34. The consumer drops the Card. Glass rider: a ConfiguratorLayer flush arm, and a README line ("layers are the surface; never wrap the aside in Card"). | `configurator/styles.css:129-173`, README | `fourier-L3/crops/d-light-aside-rims.png` | NEW (rider) |
| A2-FO-L3-6 | MEDIUM | fourier | cross-route gutters, 1440 and 390 | The page gutter changes per route (8/4/16/32 px), so the content edge jumps on navigation. The consumer mints `--page-gutter`; glass half only if glass ships a layout-gutter token (the same token A2-KE-L2-16 would read). | layout token (if shipped) | `fourier-L3/metrics.json` gut | RULING (ship a page-gutter token or not) |

## 8 · Tabs (SegmentedTabs · segmented.css) — 3 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-KE-L3-1 | HIGH | keyframes.js | EasingPicker row, coarse 390 | The Bezier/Steps segmented tabs render at 12.2 px text and 34 px tall beside a Select trigger at 21 px text and 60 px tall: two type sizes at one level, and the tabs are under 44 px. The segmented label follows the fluid ramp and ignores `--control-text` and `--ui-scale`. Cure: `.segmented-tab` on `var(--control-text)` and `--control-h-*`; delete the caption step below 640 px. | `tabs/styles/segmented.css:284,311` | register re-measure (`--ui-scale` 1.5) | NEW |
| A2-FO-L2-6 | MEDIUM | fourier | every SegmentedTabs strip, all widths | Strip buttons have no coarse-pointer floor (underline arm 42.5 px; pill arm 32 px; Equation toggle 50.5x32): `SegmentedTabs.vue:306` carries no `data-control-target`, unlike the trigger at `:219`. Cure: add `data-control-target`, or a coarse `min-block-size: var(--touch-target)`. One fix with A2-KE-L3-1. | `tabs/SegmentedTabs.vue:306`, `styles/segmented.css:368-369` | `fourier-L2/frames/v360-light-equation-canvas.jpg` | NEW (merged with A2-KE-L3-1) |
| A2-FO-L2-14 | MEDIUM | fourier | /gallery admin tab strip, 360/390/430 | The 456 px strip sits in a 328-398 px scroller; Audit Log is cut at every portrait width, with no scroll cue. | `tabs/SegmentedTabs.vue` | `fourier-L2/frames/v360-light-gallery-admin-audit.jpg` | CITE: UIA-F-41/215 |

## 9 · Slider — 4 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-FO-L2-7 | MEDIUM | fourier | every slider, all widths | Every slider measures a 12x24 thumb on a 24 px track on touch, below AUDIT-2's 44 px bar. glass set `--slider-touch-target: 1.5rem` on purpose (WCAG 2.5.8). Please rule: raise the coarse floor to `--touch-target` with a block-axis `::after` hit-slop, or record the 24 px exception against the 44 px rule. | `tokens/sizing.css:282-288`, `slider/styles.css:110-118` | `fourier-L2/frames/v360-light-w-default.jpg` | RULING |
| A2-FO-L1-16 | MEDIUM | fourier (+ keyframes.js) | /visualize playback dock, /equation convergence | `GlassTimeline.vue` (356 lines) and keyframes `useDragScrub.ts` each re-derive a scrub session, because Slider emits only `update:modelValue` and a `hasChanged`-gated `valueCommit`. Cure: Slider publishes the scrub session (`scrubstart`/`scrubend`, or a `scrubbing` model) that always closes. | `slider/Slider.vue` | source | NEW |
| A2-KE-L1-9 | MEDIUM | keyframes.js | Timeline pane (keyframe vs sequence mode) | Two independent timeline stacks live in one pane; glass Slider marks are static, so there is no draggable-marks or lanes rail. | `components/slider` | `KeyframeTimeline.vue:182-193`, `SequenceLanes.vue:11-84` | CITE: UIA-KF-280 |
| A2-FO-L1-15 | LOW | fourier | /visualize sidebar, /equation, /morph | Local `SliderControl` (7 importers) exists because LabeledSlider has no value field and no Slider variant has thumb plus fill. | `slider`, `LabeledSlider.vue` | source | CITE: BL-FW14H-1/-2 (O-63 addendum), UIA-F-75/116 |

## 10 · Fields, Select and text entry — 5 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-KE-L2-9 | MEDIUM | keyframes.js | Controls pane fields, Share URL field, mobile | Glass text fields render at 14 px under a coarse pointer, so iOS zooms on focus: `control.css:112-122` sets `var(--type-small)` (0.875rem floor) and drops `--ui-scale`. Cure: `max(1rem, var(--type-small))` under `pointer: coarse`. | `_shared/field/control.css:112-122` | `keyframes-L2/probe/results-simsheet.json`, `results-overlays.json` | CITE: UIA-KF-192 (widened) |
| A2-KE-L1-28 | LOW | keyframes.js (all apps) | iOS text entry | The `.ios` no-zoom rule ships in `base-misc.css:32-38`, but nothing in glass sets `.ios` (keyframes sets it in `iosTextEntry.ts`). Cure: ship `installPlatformClass()`, or key the rule on `@supports (-webkit-touch-callout: none)`. Pairs with A2-KE-L2-9. | `styles/utilities/base-misc.css` | source | NEW |
| A2-VA-L2-9 | MEDIUM | value.js | picker, /mix, /generate controls | Controls outside the dock are under 44 px on coarse pointers. HEAD `light-dark.css:20` has `--control-floor`. | `--control-floor` | `value-L2` `metrics-v390.json` | CURED@HEAD (adopt via I-30; partial UIA-V-600/136) |
| A2-KE-L3-4 | MEDIUM | keyframes.js | Controls pane form, 1440/390, both themes | Input and Select trigger carry opposite resting materials (`control.css:103` a solid plate, `SelectTrigger.vue:52` a tint), and which reads heavier flips with the theme. Cure: one resting material for all field controls. | `_shared/field/control.css:103`, `select/SelectTrigger.vue:52` | `keyframes-L3/probe-fields.mjs` | CITE: fold into O-66 |
| A2-FO-L3-1 | HIGH | fourier | /gallery?admin Users, 1440 | The toolbar breaks into three full-width rows (search 1408x36, sort Select stretched to 1408x40, Prune alone; 128 px where one 40 px row fits): SelectTrigger defaults to `w-full`. Cure: an inline SelectTrigger arm (an `inline` prop, or `w-auto` outside a LabeledField). | `select/SelectTrigger.vue:59` | `fourier-register/confirm.json` L3-1_d1440_users | NEW |

## 11 · Type and sizing tokens (`--ui-scale` · micro · display-1 · headings) — 6 rows

The through-line: under a coarse pointer, `--ui-scale` (1.5) scales control text but not headings or readouts, so on phones the controls out-rank the headings. This is the O-59 §8 family; these rows add new sites and the heading half.

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-VA-L3-6 | MEDIUM | value.js | 390 touch | The coarse 1.5x scale inflates control text above section headings. Cure: scale the hit floor, not `--control-text`. | `tokens/sizing.css:35` | `value-L3` metrics | CITE: UIA-V-112 (partial) |
| A2-KE-L3-2 | MEDIUM | keyframes.js | Controls/Curve/Physics at coarse 390 | Headings and readouts (12-14 px) render below control labels (18.6 px). Cure: glass publishes ui-scaled heading and readout roles; the consumer re-seats on them. | `tokens/sizing.css:35-42` | `keyframes-L3/frames/390-light/log-sheet.json` | NEW (the heading half) |
| A2-FO-L3-14 | LOW | fourier | not-found at 390; /equation Compute in dark | Not-found button labels (21.0 px) out-rank the h1 (20.4 px); the dark primary Compute recedes toward the card fill (flat Button emphasis ladder in dark). | `button`, ui-scale tokens | `fourier-L3/crops/eq-function-light-dark.png` | CITE: UIA-F-91/131 (new sites) |
| A2-VA-L3-1 | HIGH | value.js | 390, 11 views | The empty-state headline (25.9 px/700) out-ranks the pane title (25.9 px/400): `--type-display-1` floors at the `--type-heading` floor (`scale.css:120-122`). Glass half: raise the display-1 floor so the display rung stays above the heading rung at 390. | `typography/scale.css:122` | `value-register` re-measure on /nope | NEW (partial UIA-V-632/638/647) |
| A2-KE-L2-14 | LOW | keyframes.js | micro text on phones | The 11 px micro rung carries readable text and link targets. Cure: a 12 px floor under coarse pointers. | `typography/scale.css` | `keyframes-L2/probe/results-overlays.json` | CITE: UIA-KF-147 (partial) |
| A2-FO-L2-18 | LOW | fourier | /w, /v controls, /equation, admin tabs | Text renders at 11 px on phones (layer subtitles, admin dt labels, audit hash). Same cure as A2-KE-L2-14. | typography (`text-micro`) | `fourier-L2` metrics `type.minT 11` | NEW (merged with A2-KE-L2-14; UIA-F-206 partial) |

## 12 · Tooltip — 1 row

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-FO-L1-14 | MEDIUM | fourier (+ keyframes.js, value.js) | every view with tooltips | glass ships only decomposed tooltip parts. fourier keeps a 294-line compact `<Tooltip text side>` shim (36 sites); keyframes and value.js repeat three elements per site. Cure: a single-component tooltip (`text`/`side`/`align`/`measure` props, a max-width token, an as-child focusable dev guard). | `components/tooltip` (new compact export) | fourier `components/ui/tooltip/`; keyframes `TransportDock.vue`; value.js `ConsoleRail.vue:24-78` | NEW (partial UIA-F-146/219; O-72 is the reveal state, separate) |

## 13 · ToC, scroll navigation and search (sidebar composables) — 3 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-FO-L1-2 | MEDIUM | fourier (+ value.js) | /paper; value.js About markdown | glass ships the ToC behaviour (`useTreeIndex`, `isInActiveChain`, `useSidebarFollow`, `useClickDelegate`, `useScrollTo`) but no rendering, so each consumer hand-rolls the tree (fourier three times, value.js `.toc`). Cure: a recursive `TocTree` (start-aligned list-row arm, active-chain paint, `data-scroll-target` wiring) over the sidebar composables. | new `components/toc/` over `composables/sidebar/*` | fourier `PaperToc.vue:216-470`; value.js `Markdown.vue:383-410` | NEW (partial UIA-F-147) |
| A2-FO-L1-18 | MEDIUM | fourier | /paper | `useScrollNavigation.ts` (512 lines) re-implements `useScrollTo` plus a teleport arm for the windowed article. Cure: upstream the estimate-then-teleport arm to `useScrollTo` as an option. | `composables/sidebar/useScrollTo.ts` | fourier source | NEW |
| A2-FO-L1-4 | MEDIUM | fourier | /paper search | `paperSearchIndex.ts` forks glass's internal fuzzy matcher (same export names, scoring, `prevIdx=-2` seed, `multiTokenFuzzy`); scoring fixes live only in the fork. The engine is INTERNAL (no `./search` export at 10.0.1). Please rule: publish a `./search` engine subpath, or record paper search as consumer-owned (fourier renames the fork). Upstream the pattern-scaled bonus either way. | `composables/search/*` | fourier `paperSearchIndex.ts:111-180`; glass `search/match.ts:44-263` | RULING |

## 14 · Missing or unpublished primitives (Badge · Pagination · busy · CopyButton · Aurora · focus ring) — 6 rows

| Row | Sev | App | View | Defect → glass cure | Glass file | Evidence | Status |
|---|---|---|---|---|---|---|---|
| A2-KE-L1-8 | MEDIUM | keyframes.js | scene stage headers | The consumer builds one SceneStageHeader; the gap left to glass is a Badge soft tone. | `components/badge` | keyframes source | CITE: UIA-KF-201, UIA-F-139 |
| A2-FO-L1-27 | MEDIUM | fourier (+ value.js) | /gallery admin users and audit; value.js admin | The pager is written twice in fourier and a third time in value.js (`PaginationBar.vue`); glass has no Pagination beside DataTable. | Pagination (existing ask) | source | CITE: UIA-F-145, UIA-V-639 |
| A2-FO-L1-28 | LOW | fourier | /visualize loading, /equation, /gallery grid, admin flagged | Six hand-rolled `animate-spin` spinners stand in for glass's internal DotRing. Cure: publish the busy primitive. | DotRing publication | fourier source (6 sites) | CITE: UIA-F-71/72 |
| A2-KE-L1-29 | LOW | keyframes.js (+ value.js) | copy controls | There is no glass CopyButton; keyframes `CopyButton.vue` and value.js `MixResultDisplay.vue:32` plus 4 more rebuild it, although glass ships `useClipboard`. Cure: a glass CopyButton. | new component | source | NEW (partial UIA-KF-298) |
| A2-KE-L1-26 | LOW | keyframes.js (+ value.js) | home aurora = value.js atmosphere | The Aurora pointer-follow is hand-wired twice, and the copies diverge (`HeroAurora.vue:211-242`; value.js `useAtmosphere.ts:377-394`); Aurora exposes only imperative `setCursor`. Cure: a `followPointer` prop that owns the touch, reduced-motion and visibility guards. | `aurora/Aurora.vue` | source | NEW |
| A2-KE-L1-22 | LOW | keyframes.js | bespoke focus hosts | The local `.kf-focus-ring` may be a twin of glass `.focus-ring` (not measured on screen). No ask unless keyframes finds a gap. | `base.css:84-90` | `design-idioms.css:106-132` | HELD |

## Reply requested
One reply file answering O-74 group by group:
- the landing version per group;
- the rulings for §4 (confirm), §5 (A2-FO-L1-17), §7 (page-gutter token), §9 (A2-FO-L2-7 slider floor) and §13 (A2-FO-L1-4 search engine);
- confirmation of the three CURED@HEAD claims (A2-VA-L1-2 condense, A2-VA-L2-6, A2-VA-L2-9);
- any row glass refutes, with the measurement.

value.js rows the reply in the INBOX as an I-nn. The apps schedule their consumer halves and the repin against the named versions (value.js X-W12 · keyframes.js KF.W13X · fourier F.W14U).
