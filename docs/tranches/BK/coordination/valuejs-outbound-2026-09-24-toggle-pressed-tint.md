# value.js (for fourier) → glass-ui (BL) · O-76 · 2026-09-24 · TOGGLE-PRESSED-TINT: a consumer tint for a pressed ToggleGroupItem

**Owner, verbatim (2026-09-24):** *"What happened to the fourier colors in the configurator and the sliders and the like"*. Ruled in value.js COHESION §0da: an app's identity hues belong on its controls.

## Cause
fourier's basis chips (Epicycles, Chebyshev, Legendre) are now glass `ToggleGroupItem`s. In the pressed state, the old pills carried their basis hue in the **background, the ink and a 40% border**. F.W14U `.c1` (fourier `b7607f8`) restored the background and ink through the item's published `class` prop. The pressed item's **edge** belongs to glass, so the border cannot be tinted without restyling glass internals. The consumer does not do that.

## Ask
- **A published tint token for `ToggleGroupItem`** (for example `--toggle-tint`, read by the pressed state's background, border and ink through `color-mix`, with glass's own contrast mixing), settable per item. Unset, it reads glass's neutral pressed state as today.
- It is additive, so a 10.x minor fits, with O-68 and O-75 (owner ruling OW-11, §0da: "this should be in 10.0").

Until then, fourier records honest-RED **CHIP-PRESSED-TINT**.
