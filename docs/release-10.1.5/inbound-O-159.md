# Inbound O-159 to O-162: parkway NPIG rows G2, G3, G5 and G9

These came in on 2026-11-05 from sci-report-36. The owner ordered them done now.

The consumer witness is `~/Programming/parkway/src/components/PageDock.vue` and `App.vue`. The details are in `~/Programming/slides/docs/tranches/NPIG/DESIGN-v2.md` and `out/IT2-*.md`.

## O-159 (G2): the dock README

`src/components/dock/README.md` drops every prop that no longer exists. It documents three things:
- `collapse` (`"closed"`, the default, `"open"` and `false`);
- the dock's slots;
- the idle window, 3600 ms. Read that value from `DOCK_COLLAPSE_DELAY_MS`, and if it isn't 3600, state the true value.

The gate is that every prop the README names exists in the props type, and every public prop is named.

## O-160 (G3): the vertical cap keyframes

The vertical run's cap keyframes contain a `50%` stop. A percentage radius resolves per axis, which is the r1 law. The vertical arm takes the same length-based rest as the horizontal arm. The gate is that no cap or clip keyframe carries a percentage radius.

## O-161 (G5): DarkModeToggle `size="dock"` hover sticks on touch

After a tap, the hover state sticks on a coarse pointer. Gate the hover paint behind `(hover: hover)`, the same way the dock seats gate theirs.

This was O-131 G-21, placed in W-I.3. The owner moved it here. The gate is a tap on a coarse pointer that leaves no hover paint, in both engines.

## O-162 (G9): the folded summary's focus ring

After Escape folds the dock, `.dock-layer--summary` shows a square blue `:focus-visible` ring. The ring must follow the pill's radius, from the same source as the plate's rest corner. The gate is the ring's radius equalling the plate's, in both engines.
