# BI.W-DOCK-CONTROLS — `useSelectionGroup` + the shared `.glass-capsule` face + the folded safe-inset

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.4 (the CONTROL layer = DOCK-D), §3 keep/harvest map,
FAM-16 A11Y-5. Lands ON the W-DOCK-SPINE L1 control run.

## §Mandate

Discharges: **A11Y-5** (FAM-15 — "Dock chrome buttons partially obscured to 17×40px", WCAG 2.5.8 target size);
the folded `--dock-control-safe-inset` mechanism (the 10% sizing band-aid the user rejected → the face token).
Registry: FAM-3 (the safe-inset 10% band-aid); the control-family fold (DockIconButton + DockTabButton → one
control; the three overlay triggers → one trigger). (The hover-clip UF-C6/C7 is discharged STRUCTURALLY by
W-DOCK-SPINE's L1 `overflow:visible` floor; this wave's safe-inset fold is the token-level COMPANION — it
retires the band-aid, it does not own the UF row.)

## §Design

The controls are ordinary members of the library's selection-control family — the dock is SegmentedTabs/
ToggleGroup wearing chrome (PASS-1 §1 DOCK-D verdict). Mint **`useSelectionGroup`** (headless, reka-free,
`/motion-core`-eligible), assembled from parts that already exist (PASS-1 §2.4):

- **selection model**: `defineModel` single `string` | multiple `string[]`, `mode: 'single'|'multiple'`;
- **roving machine**: `tabs/composables/useTabRovingFocus.ts` VERBATIM (exactly-one-tabstop, axis-derived
  arrows, Home/End, wrap, disabled-skip);
- **the ONE traveling-indicator writer**: `useTabIndicator.ts` promoted to
  `composables/motion/useSelectionIndicator.ts` (ResizeObserver + center-anchored transform + the `--stretch`
  squish via `useLiquidFlex`); reka's `--reka-tabs-indicator-position` path AND the CSS-anchor indicator
  branch both retire — **ONE writer, Safari-identical by construction**;
- **overflow**: the `<FadingScroll>` port + `scrollIntoView`-on-select (the recenter call — its FACILITY is
  W-DOCK-OVERFLOW's mandate; the CALL lives here in the engine).

**ONE control face (the folded safe-inset — PASS-1 §2.4).** `.glass-capsule-track`/`-hover`/`.glass-capsule`
(`glass/glass-capsule.css`) + `vSpecular` + `useLiquidPress`. **`--dock-control-safe-inset` folds INTO the
face** (`background-clip: content-box`; the painted plate insets, the hit cell stays the full
`--dock-control-size`) — **the clip fix and the WCAG 2.5.5 floor become the SAME token** (A11Y-5's 17×40px is
the hit-cell decoupled from the painted plate; hit box ≥44px, paint box insets independently). Role-per-mode
rides the engine: radiogroup/radio + `aria-checked` (single), tablist/tab + `aria-selected` (panel-nav),
group + `aria-pressed` (multi).

**Component fold (PASS-1 §2.4; PASS-4B critique KISS = net −118 component lines).** `DockIconButton.vue` +
`DockTabButton.vue` → ONE `<DockControl>` (a shape axis); the three overlay triggers (`DockSelectTrigger` /
`DockDropdownTrigger` / `DockPopoverTrigger`, already one `.dock-trigger` recipe) → ONE `<DockTrigger>`; the
`DockLayerGroup` switcher rail → a `useSelectionGroup` instance. (The reka `ui/tabs` retire + the ~34-site
consumer migration blast radius is W-DOCK-FOLD's G10 census; this wave mints the survivors — the migration
executes there.)

## §Work

- Mint `composables/motion/useSelectionGroup.ts` (headless, reka-free): the `defineModel` selection model +
  `useTabRovingFocus` (verbatim compose) + `useSelectionIndicator` + the `el.scrollIntoView({inline:'nearest',
  block:'nearest'})`-on-select call. `/motion-core` + `/api` publication.
- Promote `tabs/composables/useTabIndicator.ts` → `composables/motion/useSelectionIndicator.ts` (the ONE
  writer). Retire the CSS-anchor indicator branch in `SegmentedTabs.vue` + reka's indicator path.
- `src/styles/glass/glass-capsule.css` — fold `--dock-control-safe-inset` into the face:
  `background-clip: content-box`; the painted plate insets, the hit cell reads the full `--dock-control-size`
  ≥44px. The standalone safe-inset routing (`density.css` control-family sites) collapses onto the face token.
- Mint `<DockControl>` (folding `DockIconButton.vue` 8.2K + `DockTabButton.vue` 2.1K — a `shape` axis) and
  `<DockTrigger>` (folding `DockSelectTrigger`/`DockDropdownTrigger`/`DockPopoverTrigger` onto the one
  `.dock-trigger` recipe). Re-point `DockLayerGroup`'s switcher run onto a `useSelectionGroup` instance.
- `demo/stories/dock/*` — the control demos exercise `<DockControl>`/`<DockTrigger>` + the scrollable control
  row (the reference CONTROLS demo, P3 shape).

## §Acceptance

Gate: **`proof:dock-controls`** (NEW, born-RED at HEAD — no `useSelectionGroup`; the safe-inset 10% band-aid
is live; `DockIconButton`+`DockTabButton` + 3 triggers are separate; A11Y-5 17×40px on the shipped demo).
- C1 **one-selection-engine** (BORN-RED): exactly ONE `useSelectionGroup` under the dock control run, tabs,
  and toggle-group; ZERO forked roving/indicator/selection machinery survives → GREEN at the fold.
- C2 **one-indicator-writer**: exactly ONE `useSelectionIndicator`; the reka `--reka-tabs-indicator-position`
  path + the CSS-anchor branch DEFINITION-ABSENT (Safari-identical by construction).
- C3 **face-token-fold** (BORN-RED): `--dock-control-safe-inset` reads ONLY through the `.glass-capsule` face
  (`background-clip: content-box`); ZERO standalone safe-inset routing survives.
- C4 **44px-hit-cell** (BORN-RED — A11Y-5): every dock control's hit cell resolves ≥44px (`max(…,
  --dock-control-floor)`); the painted plate may inset, the hit box may not → the axe target-size assert
  GREEN.
- Self-test bites: a synthetic second indicator writer REDs C2; a synthetic sub-44px hit cell REDs C4; a
  synthetic re-forked selection model REDs C1.

## §π/DELTA

- **ONE engine drives three mounts** (P3): `<SegmentedTabs variant="pill">`, `<ToggleGroup type="single">`,
  and a scrollable dock control row — one indicator writer, Chrome≡Safari pixel-parity, both modes.
- **Hover plate + indicator keep ≥1px slack at the dock edge AND port end** (the clip-absent floor + the
  folded face), Chrome + Safari.
- **A11Y-5 axe readback**: the dock control target-size ≥44px (the 17×40px defect killed); axe audit of the
  three role modes (radio/tab/pressed) vs reka's current DOM output.
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-CONTROLS-DELTA.md`. Rides W-DOCK-DEVICE + the
  `proof:ba-gestalt` navigation verdict.

## §Obligations

- The reka `ui/tabs` retire (5 SFCs; `TabsContent` zero consumers) + the ~34-site consumer migration is
  W-DOCK-FOLD's G10 census — this wave mints `<DockControl>`/`<DockTrigger>`/`useSelectionGroup`; the fold
  EXECUTES there (the two are sequenced: CONTROLS mints, FOLD migrates).

## §Dispositions

- **ax:dock-select-clamp-label** (`DockSelectTrigger` `clampLabel`, AT — DISPOSITION-REGISTER.json:91, book,
  1 consumer) → TERMINALIZED here: the `<DockTrigger>` fold establishes label policy NATIVELY (the greenfield
  is reinvented from iOS-27 first principles — label-clamp is a native trigger concern). Decided-terminal.
