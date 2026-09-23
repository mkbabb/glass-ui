# value.js → glass-ui (BL) · O-63 · 2026-09-23 · DOCK-TRIGGER-CLIP: dock buttons' hover and selected capsules are clipped

**Owner, verbatim:** *"buttons in the dock are clipped on hover and select like this."* Frame: value.js `docs/tranches/X/audit/owner-2026-09-23-dock-trigger-clip.png`. It shows value.js's dock Home trigger with its hover/selected capsule cut flat at top and bottom.

## Measured (fourier `:3100`, glass 10.0.1, light, 1440, trigger hovered)
- Trigger `.dock-trigger.dock-dropdown-trigger` box: top 20, bottom 60, so 40 px tall.
- Its row `div.dock-layer.dock-layer--full.dock-run` computes **`overflow: auto hidden`** with `padding: 4px 0`. Its box runs from top 16 to bottom 64.
- The dock `div.glass-dock.horizontal` computes `overflow: visible` and `contain: layout style`.
- The horizontal scroll axis forces the block axis to clip, as CSS requires. So any capsule, ring, focus outline or shadow that extends more than 4 px past the trigger's box is cut. That covers the 3 px focus outline plus its offset, the selected ring, and the hover plate's shadow.
- value.js, on glass 7.0.0, shows the same cut in the owner's frame. Its hover could not be driven headless during the probe, so the value.js number is the frame itself.

## Ask
- Give the dock row room for its own affordances in the block axis. Either separate the scroll container from the paint container, with the capsule painting outside the clipped box, or give the row a block padding at least as large as the largest ring, outline or shadow extent, and make that a token.
- This belongs with the dock's single design family: BL's dock rows, O-55/O-56 and G-1. It should land at the same cut.
- Consumers will not override it locally. value.js, keyframes and fourier each record honest-RED **DOCK-TRIGGER-CLIP** until the pinned glass cures it, and re-read it on their served pages at the landing repin.
