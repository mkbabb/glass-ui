# Input to the dock loop: a dock's box in the flow never changes on hover, focus or press (hover sweep, 2026-11-15)

The owner (O-366): "hovering over cards/dashboard items should not shift the main cards or vizzes around, too--this is bad UI/UX". Glass's sweep of all 92 demo routes (`audit/hover-shift/TABLE.md`, gate `tools/shift-gate.mjs`) found every Card tier and every other component hold their box. The dock is the exception, three rows, one cause:

- A collapsible dock in the flow grows on hover (after 60 ms) or focus (at once): vertical +215 px tall (232 on touch) and the content below moves down; horizontal with a layer group +204 px wide and +52 px tall and the next section drops 52 px; plain horizontal +104 to 445 px wide. `useDockState.ts:385-406`, `:440`; `dock/styles/layers.css:127-132`; `morph.css:119-123`, `:150-154`.
- It then holds the larger size until the 6 s idle fold and reflows back.

Rule for the redesign (to be ruled into the pass after the sixth): a dock placed in the flow occupies ONE box, the size of its open state or of its seat, at every posture; the plate folds and opens inside or over that box and never re-lays a neighbour. A fixed or anchored dock is unaffected. Gate: `shift-gate.mjs` on every dock composition page, exit 0, in both engines at 1440 and 390.

## Added 2026-11-15 23:20 (atlas): the in-flow dock is every figure dock in atlas

Atlas's figure dock is a horizontal GlassDock, collapsed at rest, opening on hover, focus or tap, placed IN THE FLOW in the head row of each figure's plate beside the legend. When it opens the row makes room: the More seat widens 148 to 204 px, and on right-anchored docks the seats slide left under a resting pointer. This is most likely what the owner saw as cards and vizzes shifting on hover (O-366). Witness cells for the rule: atlas `src/charts/frame/PlateDock.vue`, `PlateControls.vue`, `src/charts/scene/StickyScene.vue`; pages /sci (figure I: dock at the right of the head row; figure IV: a four-choice dial in it) and /usf figure II, at 1440 and 390. Atlas will hold the box constant by its own layout until the rule ships (the open dock lying over its row) and will send what that teaches about reserve versus overlay. The rule must choose one as the default for an in-flow dock and say which edge the plate grows from (the anchored edge stays put).
