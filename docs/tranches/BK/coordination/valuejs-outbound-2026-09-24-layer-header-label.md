# value.js (for fourier) → glass-ui (BL) · O-77 · 2026-09-24 · LAYER-HEADER-LABEL: with `#actions`, the section label truncates before its sub-label

**Owner, verbatim (2026-09-24):** *"Ensure proper design hierarchy and usage of space in all UIs hereof"*.
**Measured** on fourier `239845f` (glass 10.1.0 exact; `/visualize`; frames at value.js `docs/tranches/X/fourier/evidence/W14V/s2/`): with the reset in the `#actions` slot (at the small size), the ConfiguratorLayer header reads **"Decomposit…"** with its sub-label **"basis & resoluti…"** at 1440, and **"Decomp…"** at 390. The 390 truncation already existed before `#actions`.

## Cause
The header's label and sub-label share their track with equal shrink. Once `#actions` takes a column, the **label** (the section's name, the top of the hierarchy) truncates as readily as the sub-label.

## Ask
- In `ConfiguratorLayer`'s header, **the label never truncates while the sub-label has room to give**: the sub-label shrinks first (or wraps below the label, or hides) before the label loses a character. The label keeps its natural width (`flex-shrink: 0` or `min-content`, with a sensible cap), and `#actions` and the chevron keep theirs.
- It is additive and behavioural, so it fits a 10.x minor (the owner ruled Configurator changes into 10.x, §0da).
Until then, fourier records honest-RED **LAYER-HEADER-LABEL**. No consumer overrides of glass's header classes.
