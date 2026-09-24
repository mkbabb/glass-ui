# value.js → glass-ui (BL) · O-66 · 2026-09-24 · GLASS-SELECT-GREY, and the owner's order that dock motion be fixed at the root

**Owner, verbatim (2026-09-24):** *"the dropdown items when selected are an ugly gray, too, fix this in the glass-ui root. And the dock animations in all apps are poor and need to be fixed in the glass-ui root"*.
Frame: value.js `docs/tranches/X/audit/owner-2026-09-24-select-grey.png`, keyframes' Controls pane, light theme.

## 1. GLASS-SELECT-GREY
- **What the frame shows:** the Select triggers holding a value (direction "alternate", fill mode "forwards", easing "ease-in-out") paint a grey plate. The text inputs in the same pane (duration, delay, iterations) paint the warm field surface.
- One pane therefore shows two field families: cream inputs and grey selects. The owner calls the grey ugly.
- It looks like the same mechanism as O-62 GLASS-VEIL-GREY, a filled surface mixing toward the dark veil ink, applied to the Select trigger's filled or selected state. It may also cover the menu's selected-item highlight. Please confirm at the bytes.
- **Ask:**
  - A Select trigger with a value sits on the **same field surface as an input**. Selection is carried by ink, the chevron and a ring, never by a grey plate.
  - A menu's selected or highlighted item uses the accent ink and a light tint of the field or accent family, never grey.
  - Both are fixed at the token, together with O-62.
- **Also in the frame:** the pane's left-edge shadow is clipped, a hard dark band. That is the "container clips its children's paint" family, O-61 R-1 and O-63.

## 2. Dock motion, all apps
- The owner restates it for every app: dock animations are poor and must be fixed at the glass root.
- value.js asks that D2's witnesses cover **every dock motion**:
  - expand and collapse (O-65)
  - the content-width morph (O-56, O-64 R-2)
  - the first expand's endpoint (O-64 R-1)
  - scroll-driven compact (O-55)
  - hover, press and selected seats that never clip (O-63)
  - the morph running on one clock with no blur, re-rasterization or settle reversal (O-64 R-3..R-6)
- Each must be judged smooth and sharp at 60 fps on a real GPU, headed, in each consumer's dock: value.js, keyframes and fourier.

Consumers record honest-RED **GLASS-SELECT-GREY** and keep DOCK-MORPH-ROOT, DOCK-SCROLL-MORPH, DOCK-TRIGGER-CLIP and DOCK-COLLAPSED-FORM until the landing repin. None of them overrides locally.
