SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BK; BL) · O-94 · 2026-10-13 · EASING-CATALOGUE-SEAMS: three producer seams the one easing catalogue needs (KF.W13W `.p` R-1..R-3)

**Mirror for glass to land:** `docs/tranches/BK/coordination/valuejs-outbound-2026-10-13-easing-catalogue-seams.md` (value.js writes no byte in the glass tree).

**From:** KF.W13W `.p` residuals R-1..R-3 (COHESION §0cq OA-63: one picker component at the gallery, the dropdown and the Controls pane). KF.W13W Check 1 C1-1 found them named "Owner: glass BL (OA-63)" with no letter carrying them, and routed them to KF.W13X's BK outbound; the wave Close R-6 item 3 and addendum (g) C3-6. Filed by KF.W13X `.rel`. This stands beside AUDIT-2 erratum E-3(b) (O-74), which covers only a preset strip over one catalogue.

## R-1 · `EasingPicker` preset-list opt-out
glass `EasingPicker` (TimingFunctionPanel + EasingSidebar, via `useEasingPickerSeat`) carries its own preset list (the "Custom" select). Its props (`src/components/easing/EasingPicker.vue:61-76`, 10.1.0) include `surface` and no prop or slot that hides or replaces that list. keyframes renders one `EasingCatalogue` at both consumer-owned sites (the gallery stage and the Controls-pane dropdown, `[data-easing-catalogue]`), so the Controls-pane editor shows glass's preset list beside the demo's catalogue: two catalogues in one pane.
**Ask:** a preset-list opt-out on `EasingPicker` (a prop), or a slot for it, so a consumer's catalogue is the only one.

## R-2 · `ToggleGroup` track/plate opt-out
The catalogue tiles use glass `ToggleGroup` for selection and roving focus only. The group's track and the item's plate are painted by glass (`src/components/toggle-group/styles.css`), so the demo carries an interim track reset (KF-ET-10) and paints the tile's ink + ring selection over the item's `data-state="on"`.
**Ask:** a producer opt-out of the track/plate paint on `ToggleGroup` (a bare variant that keeps selection state and roving focus). Both demo rules are deleted at that landing.

## R-3 · a field-look trigger for a non-Select popover
The catalogue dropdown's trigger is `PopoverTrigger as-child` + glass `Button emphasis="secondary"`. glass exports no field-look trigger for a popover that is not a Select, and copying `SelectTrigger`'s classes would be a copied producer selector. The trigger therefore differs slightly from the direction and fill-mode Select triggers beside it in the same pane.
**Ask:** a field-trigger seam (a `Button` variant, or an exported field-look trigger for `Popover`) whose look matches `SelectTrigger`.

## Consumer posture
No consumer copy was built for any of the three. The KF.W13W consumer gate (G-W13W-p) is GREEN at both consumer-owned sites; the glass halves hold **honest-RED (glass-owned)**, ADOPT-AT-LANDING at the repin that carries them (10.2.0 asked).
