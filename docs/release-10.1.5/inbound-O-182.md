# Inbound O-182: the owner's dock halo (and O-175 (1) moved here)

**The owner's order, 2026-11-06 09:26, verbatim:** "globally all dock items are far too blurred with a halo effect."
- **Relayed by:** sci-report-ef.
- **Frame:** `~/.dev-logs/owner-2026-11-06-dock-halo/atlas-dock-halo.png`.
  - It shows atlas's side GlassDock in dark mode.
  - A bright white glow, about 10–20 px wide, runs around the whole plate outline and spills onto the page, so the edge reads blurred.
  - Gregg's page dock shows a milder version of it.

**The root, already booked as O-175 (1):** `--shadow-color: var(--foreground)` (`tokens/color-radius.css:170`). Under `.dark` the foreground is the light ink, so every glass elevation shadow is painted light on a night ground and reads as a halo. The owner says "globally", and the owner can see it, so O-175 (1) moves out of W-C.5 and into 10.1.5.

**The cure:**
- In dark mode the shadow colour is a dark taken from the ground: one value on the dark arm. Changing that token's value is the cure, which is allowed in a patch.
- Then check the plate's rim and edge for any other light outer paint in dark (an outer glow, a light rim spread), and remove it. The plate ends at a crisp edge.
- Elevation comes from the library's own ladder, calm and dark. There is no glow anywhere (N-16).
- The "too blurred" half of the order belongs to the token wave (W-0.1, slightly less blur, per the owner's O-87). Don't move the backdrop blur radius in this patch unless the halo cure needs it; say if it does.

**Gates** (Chromium and WebKit, at 390 and 1440, on GlassDock in its horizontal, vertical and collapsed forms):
- In dark mode, no pixel outside the plate's outline is lighter than the page ground under it. Measure the 24 px band around the plate on a flat dark ground.
- The shadow colour's OKLCH L is at most the ground's L.
- Light mode is unchanged from v10.1.4, within 1 ΔE in the same band.
- The gate is RED on v10.1.4 in dark.
