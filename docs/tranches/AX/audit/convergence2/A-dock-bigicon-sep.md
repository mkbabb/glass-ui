# A-dock-bigicon-sep — Big-dock icon alignment (DK4) + dock separators when befitting (DK5)

**Lane** A-dock-bigicon-sep · **Severity** major · **Verdict** augment-existing-wave (W45) ·
**Covers** DK4 (big-dock icon alignment), DK5 (dock-item separators when befitting) ·
**HEAD** 5cf2980 (3.8.0+W52)

Source-audit of the big-dock (`shape="card"` / `layout="grid"`) grammar in `dock.css` and the
`DockSeparator` plan in W45. DK4 is a NET-NEW source defect W45 does NOT currently cover; DK5 is
fully owned by W45's RED witness 5 but needs a big-dock-specific extension.

---

## DK4 — big-dock icons are NOT aligned (root cause + gestalt fix)

### Source root cause — the grid tile has no inline-axis item centering

The `layout="grid"` big dock makes the active layer a 2D tile grid (`dock.css:991-1006`):

```css
.glass-dock.layout-grid .dock-layer--full {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--dock-tile-min, 4.5rem), 1fr));
    grid-auto-rows: var(--dock-tile-min, 4.5rem);   /* 72px-tall square cells */
    gap: var(--dock-layer-gap, 0.375rem);
    width: 100%; height: auto;
}
```

Each cell is therefore a **72px square** (`--dock-tile-min` 4.5rem, both the column floor via
`minmax` and the explicit `grid-auto-rows`). The `.dock-icon-button` placed in each cell is a
**fixed ~40px box** (`width/height: var(--dock-control-size)` → 2.5rem comfortable;
`dock-controls.css:53-54`) with `flex-shrink:0`.

The grid layer inherits ONLY `align-items: center` from the base `.dock-layer` rule
(`dock.css:860-865`). There is **NO `justify-items` / `place-items` / `justify-self`** declared
ANYWHERE in `dock.css` or `dock-controls.css` (grep `justify-items|place-items|justify-self|
align-self` over both → ZERO hits). So for each 40px button in its 72px cell:

- **block axis (vertical):** `align-items: center` → centered. ✓
- **inline axis (horizontal):** `justify-items` defaults to **`stretch`**, but the button is a
  fixed-width `inline-flex` box with `width: var(--dock-control-size)` — a fixed inline size is
  NOT stretchable, so `stretch` degenerates to **`start`**: every 40px icon hugs the
  **inline-start (left) edge** of its 72px column, ~16px off-center. ✗

Result: a 3×3 big-dock grid paints its icons jammed to the left of each tile column instead of
centered in the tile — the visible "big-dock icons are not aligned" defect (DK4). The block axis
looks fine (centered); only the inline axis is wrong, which reads as a consistent left-bias
across the whole grid.

### The smoking-gun contrast — the flex wrap layer DOES center, the grid layer does NOT

The sibling `overflow="wrap"` flex layer is centered explicitly (`dock.css:1139-1141`):

```css
.glass-dock.dock-overflow-wrap .dock-layer--full {
    flex-wrap: wrap;
    justify-content: center;   /* flex items centered on the inline axis */
    ...
}
```

The grid layer (`:995`) got `display:grid` + `grid-auto-rows` + `gap` but the parallel
inline-axis centering (`justify-items: center`, the grid equivalent of `justify-content:center`)
was never added. AW.W3b authored the grid track geometry and the concentric inner-tile radius
(`:1017-1021`) but left the in-cell item placement on the browser default. This is a one-property
omission, not a deep structural gap.

### Secondary finding — `--dock-tile-min` is NOT density-scaled (the comment overclaims)

`dock.css:103-109` comments: "`--dock-tile-min` is the grid tile minimum … Both [card-radius and
tile-min] are density-scaled (compact tighter, spacious looser) — the card radius + tile size
ride the density cascade, never magic numbers." That is FALSE for tile-min: `--dock-tile-min:
4.5rem` is a **flat literal** at `:109` with NO per-density override in the `:221-326` density
cascade (grep `--dock-tile-min` over the cascade block → only the base `:109` + the two
consumers `:999/:1001`). So a `density="compact"` grid dock paints the SAME 72px tile as
`spacious`. The card-radius IS density-adjacent (rides `--radius-dock-card`), but tile-min is a
magic number the comment claims it isn't. This compounds DK4: the misalignment is worse because
the tile is fixed-large regardless of the (smaller) compact control size, so the off-center gap
between the 72px cell and the e.g. 32px compact button is even larger.

### The gestalt fix (token-first, one cascade property + tile-min density routing)

1. **Center the grid items** — add `place-items: center` (or `justify-items: center`, the block
   axis already centers via the inherited `align-items: center`) to
   `.glass-dock.layout-grid .dock-layer--full`. ONE declaration; the 40px button lands dead-center
   in its 72px tile on BOTH axes. This MIRRORS the flex `justify-content: center` the wrap layer
   already speaks — the same centering identity, just the grid spelling.
2. **Route `--dock-tile-min` through the density cascade** — set a per-density `--dock-tile-min`
   in the `:221-326` block (compact ~3.5rem, comfortable 4.5rem, spacious ~5.5rem) so the tile
   scales WITH the control size and the comment becomes true, killing the magic literal. The tile
   should be a proportional multiple of `--dock-control-size` so the icon-in-tile padding stays
   constant across densities (concentric rhythm), e.g. `--dock-tile-min: calc(var(
   --dock-control-size) + var(--dock-tile-pad, 2rem))` so the icon-to-tile margin is one knob, not
   per-density literals. This also makes the big-dock tile ride W45's `--dock-scale` for free
   (the W45 multiplier threads the density cascade — if tile-min is IN the cascade it scales on
   touch with everything else; if it stays a `:109` literal it does NOT, leaving a 72px tile
   around a 1.5×-scaled glyph on mobile — a NEW misalignment W45 would otherwise introduce).

Token-first, component-over-class preserved: no new component, no consumer edit — a consumer
already gets centered tiles + a density-correct tile size from `dist/`.

### Cross-reference to W45's `--dock-scale` — DK4 fix MUST precede/accompany the scale thread

This is the load-bearing dedup nuance: **W45 introduces `--dock-scale` threading the whole
density cascade, but its FileBounds touch the `:221-326` linear cascade + the persistent/divider/
morph-region layout rules — NOT the `.layout-grid` rules at `:991-1021`.** If W45 lands the 1.5×
mobile scale WITHOUT routing `--dock-tile-min` into the cascade, the grid tile stays a flat 72px
while the glyph + control-size grow 1.5× on touch → the icon OVERFLOWS or jams the tile, a NEW
big-dock misalignment. So DK4's tile-min-into-cascade fold is not merely cosmetic — it is a
PRECONDITION for W45's scale to compose with the grid layout. They belong in the SAME wave.

---

## DK5 — dock items demarcated with separators when befitting

### Fully owned by W45 RED witness 5 + Scope §6 — confirm

W45 already owns the `<DockSeparator>` primitive end-to-end (RED witness 5, Scope §6, FileBounds
`DockSeparator.vue` NEW + barrel export + 7-demo-site migration). The raw axis-blind class at
`dock.css:1174-1179` (`width:1px; height:var(--dock-separator-height)` — a fixed VERTICAL
hairline that paints a 1px sliver in a column dock) is its RED witness; the primitive reads
`useOptionalDockContext()` `orientation` (the context API EXISTS — `dockContext.ts:30` exposes
`orientation: ComputedRef<DockOrientation>`, re-exported `index.ts:43`) and paints perpendicular
to the layout axis. DK5's "separators when befitting (design + affordance hierarchy)" is the
exact user-defect row W45 RED witness 5 targets. **No net-new wave; W45 owns it.**

### Extension W45 should ABSORB — the big-dock/grid separator regime (the affordance-hierarchy half)

W45's `<DockSeparator>` plan handles the LINEAR (row/column) case: a 1px rule perpendicular to
the axis. DK5's "when befitting" + "affordance hierarchy" half has a big-dock gap W45's plan does
NOT yet address:

1. **The wrap layer SUPPRESSES separators entirely** (`dock.css:1159-1161`):
   `.glass-dock.dock-overflow-wrap .dock-separator { display: none }`. So in a multi-row wrap
   dock, a consumer's separator vanishes — correct for a flex-wrap row (a vertical hairline mid-
   wrap is nonsense) but means the affordance-grouping a separator provides is LOST exactly where
   a multi-control dock most needs grouping. The `<DockSeparator>` component must inherit this
   suppression contract (or replace it with a wrap-row-spanning rule), not leave the raw-class
   `display:none` orphaned once the 7 sites migrate off the class.
2. **The grid big-dock has NO separator story at all.** A 2D tile grid cannot use a 1px column
   hairline for grouping — the befitting demarcation in a Launchpad-style grid is a **gap-band /
   section-break row** (a grid-spanning rule via `grid-column: 1 / -1`), the affordance-hierarchy
   idiom the DK5 ask names. W45's `<DockSeparator>` reads orientation but does NOT read
   `layout="grid"`; in a grid dock it would paint a single 1px sliver in one cell, useless. The
   gestalt extension: `<DockSeparator>` (via `useOptionalDockContext` — extend `DockContext` with
   the `layout` axis already present on `GlassDock`) paints a full-width section-break
   (`grid-column: 1 / -1`, a horizontal hairline + the `--dock-layer-gap` rhythm) when the dock is
   `layout="grid"`, a perpendicular hairline in a linear dock, and is `display:none` (or a
   row-spanning rule) in a wrap dock. ONE primitive, three layout-aware paints — the same
   axis-contract-in-a-component rationale W45 already argues, extended to the layout axis.
3. **Affordance hierarchy demarcation (the design half).** The DK5 "when befitting" is a design
   call: separators demarcate CONTROL GROUPS (e.g. transport | navigation | settings) — which is
   exactly the W45 three-region `[persistent][divider][morph-region]` model's middle slot. W45's
   persistent-region divider IS a befitting-separator instance (the persistent rail divided from
   the morph region). The DK5 separator-between-control-groups is the SAME `<DockSeparator>`
   primitive used WITHIN a region, not only at the region boundary. W45 should state this
   explicitly: the divider is one primitive used at (a) the region boundary and (b) intra-group
   demarcation, layout-aware at both.

---

## DEDUP verdict

- **DK5 → W45 (no new wave).** W45 RED witness 5 + Scope §6 own `<DockSeparator>` fully. The
  big-dock/grid + wrap-suppression + affordance-group extensions ABOVE are an AUGMENT to W45's
  `<DockSeparator>` scope (add the `layout="grid"` section-break paint + the wrap-suppression
  inheritance + the intra-group demarcation statement), NOT a separate wave. Folding them into
  W45 keeps ONE primitive with one layout-aware paint contract, not a second grid-separator
  component.

- **DK4 → W45 AUGMENT (net-new source defect, no existing wave owns it).** The grid-item
  inline-centering omission (`.layout-grid .dock-layer--full` needs `place-items: center`) + the
  `--dock-tile-min` density-cascade routing are NET-NEW source defects no wave currently covers
  (W06's `dock.css` work is a VERBATIM partials carve — it explicitly authors no new rule; W45's
  FileBounds touch `:221-326` + the layout rules but NOT `:991-1021`). The cleanest home is W45:
  its `--dock-scale` thread MUST route `--dock-tile-min` through the density cascade or the grid
  tile breaks at 1.5× (the scale-composes-with-grid precondition), so the tile-min fold belongs in
  the SAME density-cascade reauthor. The one-property `place-items: center` centering fix rides
  along — it touches the adjacent `.layout-grid` rule W45 must already be cognizant of when it
  threads the cascade. Add a SIXTH (DK4) sub-fold + a grid-separator extension to W45's Scope §3
  (density cascade) + §6 (`<DockSeparator>`).

- **No prune, no needs-user-decision** (the per-density tile-min magnitudes + the
  `--dock-tile-pad` constant are token defaults the implementer picks within W45's existing
  presets-in-consumers contract; not a design call needing the user).

## Falsifiable RED witnesses to fold into W45 (born-RED extensions)

- **RED (DK4-a):** grep `dock.css` + `dock-controls.css` for `justify-items|place-items|
  justify-self` → ZERO hits at HEAD (the grid layer has no inline-axis item centering; RED).
  After: `.glass-dock.layout-grid .dock-layer--full { place-items: center }` exists (GREEN);
  π-arm: a 40px button renders horizontally centered in its 72px tile (cell-center − button-center
  ≈ 0, not ~16px left-biased).
- **RED (DK4-b):** grep the `:221-326` density cascade for `--dock-tile-min` → ZERO hits at HEAD
  (tile-min is a flat `:109` literal; the density comment overclaims; RED). After: per-density
  `--dock-tile-min` (or `calc(var(--dock-control-size) + …)`) in the cascade so `compact` ≠
  `spacious` tile (GREEN); π-arm: a 1.5×-scaled coarse-pointer grid dock keeps the icon centered
  in a proportionally-scaled tile (the scale-composes-with-grid proof).
- **RED (DK5-grid):** a `layout="grid"` dock + a `<DockSeparator>` paints a 1px sliver in one
  cell at HEAD (the linear hairline in a grid; RED). After: `<DockSeparator>` paints a
  full-row-spanning section break (`grid-column: 1 / -1`) in a grid dock (GREEN); the wrap-layer
  `display:none` suppression is inherited by the component, not orphaned on the dead raw class.

## Source coordinates (for the W45 implementer)

| File:line | Artefact | DK |
|---|---|---|
| `src/styles/dock.css:991-1006` | `.layout-grid .dock-layer--full` grid (no `place-items`) | DK4-a |
| `src/styles/dock.css:109` | `--dock-tile-min: 4.5rem` flat literal (not density-scaled) | DK4-b |
| `src/styles/dock.css:103-107` | the comment overclaiming tile-min is density-scaled | DK4-b |
| `src/styles/dock.css:1017-1021` | `.layout-grid.shape-card .dock-layer--full > *` concentric radius (correct, reference) | DK4 |
| `src/styles/dock.css:1139-1141` | flex wrap layer `justify-content: center` (the centering precedent the grid lacks) | DK4-a |
| `src/styles/dock.css:1159-1161` | `.dock-overflow-wrap .dock-separator { display:none }` (suppression to inherit) | DK5-extension |
| `src/styles/dock.css:1174-1179` | `.dock-separator` raw axis-blind hairline (W45 RED witness 5) | DK5 |
| `src/components/custom/dock/composables/dockContext.ts:30` | `DockContext.orientation` (extend with `layout` for the grid-separator paint) | DK5-grid |
| `demo/stories/navigation/dock.vue:322-332` | the big-dock grid story (the live-audit surface for DK4) | DK4 |
