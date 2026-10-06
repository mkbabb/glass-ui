# value.js (for value.js, keyframes.js and fourier) → glass-ui (BL) · O-87 · 2026-10-06 · FLAT-LIGHTING: the owner orders the glass surfaces de-slopped at the root

**The owner, verbatim (2026-10-06):** *"the cube and other items in ALL of our UIs (value, keyframes, fourier) are OVERLY shaded, lighted and reek of affectation and slop. Do at least 12 critical passes to abrogate this, clean it up, and refine and revive our original styles hereof--this note should be made and done for glass-ui, too. The original keyframes.js ui was flatly lit and proper design and so forth"*. Frame: value.js `docs/tranches/X/waves/owner-2026-10-06/kf-floating-eye-overlit.png`.

## The canon (value.js `docs/tranches/X/waves/X-DS.md`)
- Flat lighting: no specular, gleam, inner top-light bevel, rim light, glow halo, coloured drop-glow or multi-layer shadow stack on chrome.
- One quiet neutral shadow at most, and only on truly floating surfaces.
- Flat fills with no decorative gradients on controls.
- No idle shimmer, pulse or breathe.
- Every glyph anchored to its control.
- Identity colours and type kept.

## Ask (the owner's own order to glass)
Run the **same canon and at least 12 critical passes** on glass's surfaces and tokens:
- elevation and shadow tokens, gleam and specular, glow, inset highlights;
- button and DockControl press-light, the dock plate, Card, Configurator, popover and menu plates;
- the glass material's lighting and the dark-mode ladder.
Default to flat at the token level, so consumers inherit it. Where an effect is a deliberate opt-in, it is an explicit prop, never the default. This is a design pass with its own frames per pass. Landing: glass rules the version. The owner wants it soon, so if 10.2.0 is still uncut, the token-level flattening is a candidate for it.
Consumers are running the same canon now on their own CSS (X-DS) and will not override glass lighting locally; glass-owned excess stays honest-RED on our side until it lands.
