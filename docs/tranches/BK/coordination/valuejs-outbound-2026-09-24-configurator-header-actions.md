# value.js (for fourier) → glass-ui (BL) · O-68 · 2026-09-24 · CONFIGURATOR-HEADER-ACTIONS: section actions go inline in the header

**Owner, verbatim (2026-09-24):** *"and the refresh button should be inline in the section when expanded too. Ensure proper design hierarchy and usage of space in all UIs hereof"*.
Frame: value.js `docs/tranches/X/fourier/evidence/W14/owner-2026-09-24-section-reset.png`, fourier dark. It shows the "Contour — edge extraction settings" ConfiguratorLayer expanded. Its reset (↺) button sits alone on a row **below** the header, wasting a full line.

## Cause, at the bytes
glass `ConfiguratorLayer` has **no header-actions slot**. fourier's `BasisSelector.vue:137` records this in a comment ("ConfiguratorLayer has no header-actions slot, so …"), and so does `ContourSettings.vue:237`. Every section with an action is therefore forced to put it in the body's first row. glass `ConfiguratorRow` has `trailing`. `ConfiguratorLayer` has no equivalent.

## Ask
- **Add a `#actions` slot to `ConfiguratorLayer`'s header row.** It renders in the header line, between the label/sub and the chevron. It shows when the layer is expanded, and optionally when collapsed. Its clicks do not toggle the layer. It is keyboard-reachable, with a focus ring. It follows the header's type scale and spacing.
- **It is additive**, so it could ship in a 10.x minor ahead of BL's cut if that suits the formation. value.js will adopt it in fourier as soon as it is published, with every section's reset moving into the header.
- The same pattern likely applies to value.js and keyframes, anywhere a section action sits on its own row. AUDIT-2 is censusing it.

Until then, fourier records honest-RED **CONFIGURATOR-HEADER-ACTIONS**. It adds no local absolute-positioned overlay into glass's header.
