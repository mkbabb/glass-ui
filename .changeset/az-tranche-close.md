---
"@mkbabb/glass-ui": minor
---

The AZ tranche — the reflection-bar release (the dock rebuilt, the floating-carousel rail, the adaptive auto-darken, the de-red iOS register, the blob page + studio, the motion suite + the curve-gallery keyframes isomorphism, the shell identity + configurator, hierarchy/suffusion/metric unification, the CSS carve, the prune-2 restores).

NOTE: the cut publishes as **3.13.0** (not the changeset-default 3.11.0) — the registry 3.11.x/3.12.0 are stale-lineage out-of-band publishes from a pre-prune tree; the cut number moves ABOVE them so `latest` resolves the true close. See `docs/tranches/AZ/waves/AZ.W-CLOSE.md` §X.2 (the lineage map).

Highlights:

- **Dock**: ONE orientation axis (the `variant` discriminant retired — clean break), the hairline switcher rail, `<DockRail>` evolved into the floating-carousel facet chip strip OUTSIDE the dock box (box INVIOLATE; the in-dock facet groups deleted), tap integrity (`useDockClickIntegrity`), the collapse flicker killed, the coarse-pointer scale knobs (`--dock-mobile-scale`/`--dock-coarse-scale`), the iOS-glassy de-red'd interactive register (`--dock-selected-accent`/`--dock-control-press-bg`), the V↔H morph showcase (`useDockOrientationMorph` + `useLiquidFlex`).
- **Adaptive glass**: the unconditional self-engage legibility floor + the sampled-luminance observer (`useGlassBackdropLuminance`, dock default-ON), the AA tint floor recalibrated to 20%.
- **Card**: the `surface="veil"` register (borderless+rimless legibility plate).
- **Metric family**: `coalesceMetric` core; `amount` → `value` (breaking, no alias).
- **Restored subpaths**: `/header-ribbon` + `/glass-panel` (live keyframes.js consumers; the AY census mis-prune reversed).
- **DockRail**: `items: DockRailItem[]` replaces the retired `entries: string[]` (clean break).
