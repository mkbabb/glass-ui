# BA fleet · lane: dock-clipping (R8-6, the clipping half)

The round hover/active/press plate on a dock control is sliced flat top+bottom (a
"lozenge", not a circle) by an inner clip box that is height-locked to exactly the
control diameter, leaving ZERO breathing room. Reproduced live on :5199 in BOTH the
bottom (horizontal) and sidebar (vertical) shell docks, light AND dark.

## Evidence (beside this report)
- `probe-bottomdock-rest-light.png` — bottom shell dock at rest (matches R8-06 surface).
- `probe-bottomdock-active-light.png` / `probe-bottomdock-active-DARK.png` — the `‹`/`›`
  control's active glass plate, sliced flat top+bottom into a lozenge. The DARK shot is
  the 1:1 R8-06 reproduction.
- `probe-bottomdock-nocontain.png` — `contain:none` + `overflow:visible` forced on the
  dock ROOT, plate STILL clipped → proves the clip is NOT the root `contain:paint`; it is
  the inner scroll-port box.

## Root cause — the zero-slack scroll-port clip box

The clip owner is NOT the dock root. The live ancestor walk from the control finds the
nearest non-`visible` box is the inner layer track, height-locked to the control size:

| measured (comfortable density, --ui-scale 1) | value |
|---|---|
| `--dock-control-size` (the icon-button square + `border-radius:9999px` circle) | **40px** |
| `--dock-layer-height` → `.dock-layer { min-height }` (layers.css:223) | **40px** |
| rest control circle top/bottom slack inside the clip box | **0.0px / 0.0px** |
| `--scale-hover-dock` → hover circle | **44px → overflows clip box by −2px each side** |
| active plate = the button's own 40px circle `background:--dock-active-bg` | perimeter sits ON the clip edge → sliced |

The clip box itself is established by the dock's SCROLL PORT, and the slice is on the
CROSS axis via the CSS overflow-companion rule (a single-axis `auto`/`hidden`/`scroll`
forces the other axis to compute from `visible` to `auto`):

- **Horizontal `overflow="scroll"` docks** (both shell BottomDock + every `dock-scroll-x`):
  `src/styles/dock/overflow.css:33-35` — `.glass-dock.dock-scroll-x .dock-layer--full { min-width:0; overflow-x:auto }`.
  The companion rule makes `overflow-y` compute to `auto` → the BLOCK axis clips the
  40px-tall layer box → the 44px hover / full active circle is sliced top+bottom. Live
  readback: clip ancestor = `.dock-layer.dock-layer--full.is-active`, `overflow-x:auto
  overflow-y:auto`, height 40px.
- **Vertical docks** clip on the INLINE axis from TWO sources, BOTH unconditional at rest:
  - `src/styles/dock/overflow.css:53-54` — `.glass-dock.vertical.dock-scroll-y { overflow-y:auto }` (the SidebarDock `overflow="scroll"` path), and
  - `src/styles/dock/shell.css:188-191` — `.glass-dock.vertical.always-expanded:not([data-morphing]) { overflow-x:visible; overflow-y:auto }` (the AX.W04 F6 at-rest cap+scroll port that fires on EVERY vertical always-expanded dock, not just `overflow="scroll"`).
  The companion rule makes `overflow-x` compute to `auto` → the INLINE axis clips a
  vertical control's hover/active plate on its left/right edges. Live readback confirmed
  on the sidebar shell dock AND a plain in-page vertical story dock (`overflow:auto/auto`
  on the root).

The dock root's `contain: paint` (`src/styles/dock/shell.css:83`) is a SECOND clip box at
the dock border-box, but it is NOT the proximate cause here — removing it live left the
plate clipped (the inner 40px scroll-port box wins). It would re-bite if the inner box
were widened past the dock padding.

## Why this is systemic, not a one-off

The two shell docks (`demo/layout/BottomDock.vue:118`, `demo/layout/SidebarDock.vue:174`)
both pass `overflow="scroll"` and are the MOST-SEEN docks in the whole demo (every route).
They are short, `fit-content` rows that NEVER actually overflow — so the scroll port is
engaged unconditionally, paying its full cross-axis clip cost for zero scroll benefit. Any
vertical dock pays the shell.css:188 clip even without `overflow="scroll"`. The horizontal
NON-scroll story docks (root `overflow:visible`) do NOT clip — confirming the scroll-port /
vertical-port is the discriminator.

The geometry is fragile by construction: the control circle diameter is `--dock-control-size`
and the layer track floor is `--dock-layer-height`, and BOTH resolve to the SAME density
literal (2.5rem comfortable / 2rem compact / etc, density.css), so a plate that is the full
control circle ALWAYS exactly fills the track with 0px to spare — before the hover scale even
applies. The block budget between control and pill exists only on the dock ROOT padding
(`--dock-padding-block` 6px), which the inner height-locked scroll-port box does not inherit.

## States surveyed (both orientations, both modes)
- **hover plate** (scale 1.1 → 44px): clipped −2px top/bottom (horizontal) or left/right (vertical). The visible defect.
- **active / selected register** (`--dock-active-bg`/`--dock-control-active-bg`, the full 40px circle): perimeter on the clip edge → sliced even at scale 1; this is the R8-06 capture state.
- **press** (`--scale-press-dock` 0.96 → 38px): SHRINKS, so press alone does not clip — but the press DARKEN plate is the 40px circle underneath, still edge-sliced.
- **rest**: 0px slack → the resting circle's anti-aliased perimeter is sub-pixel sliced (subtle, but the silhouette is never a clean circle).
- tab-button + select/dropdown triggers ride the same `.dock-layer--full` / vertical-port clip box; their pill plates clip identically when their intrinsic height equals the track floor.

## Gestalt remedy direction (NO implementation — seeds a wave spec)

The clean break is to STOP letting the interaction plate share a box with the scroll-port
clip and the height-lock. Two coherent, idiomatic directions (not mutually exclusive):

1. **Give the plate a budget — the control circle must be SMALLER than its track cell.**
   Decouple `--dock-control-size` (the hover/active PLATE diameter) from `--dock-layer-height`
   (the track/cell the plate lives in) so the plate has a few px of bleed room on every axis
   INSIDE the clip box at rest AND under the 1.1× hover scale. Today they are the same token;
   the plate should floor a notch below the cell (or the cell a notch above the plate) so the
   maximal hover/active silhouette stays inside the clip with margin. This is the token-first
   fix and keeps the WCAG 2.5.5 floor as the CELL size. (The iOS-26 dock register the user is
   chasing draws the selected plate INSET within a larger touch cell — exactly this.)

2. **Don't engage the scroll-port clip when there's nothing to scroll.** The shell docks are
   `fit-content` and never overflow, yet `overflow="scroll"` unconditionally arms the cross-axis
   `auto` clip. The scroll port (and its companion-rule cross-axis clip) should engage only on
   REAL over-cap content — the same "the scroll port only engages on real over-cap content"
   discipline shell.css already states for the vertical at-rest case but does not honor for the
   plate. Equivalently: keep the scroll clip on the SCROLL (morph) axis only and hold the CROSS
   axis genuinely `visible` so a control's plate paints past the track on the non-scroll axis.
   The CSS overflow-companion trap is the mechanical enemy here — the cross axis must not be
   allowed to silently compute to `auto`.

Both avoid the forbidden `overflow:visible` hack on the morph aperture (which would break the
W2 clip-reveal morph). Direction 1 is the surgical, lowest-risk floor; Direction 2 is the
architectural cleanup (the scroll port over-reaches its mandate). A wave likely wants BOTH:
size the plate inside the cell (1) AND stop the non-scroll cross-axis from clipping (2), so the
plate is safe whether or not a given dock is a scroll port.
