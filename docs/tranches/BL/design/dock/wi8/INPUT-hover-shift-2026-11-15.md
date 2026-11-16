# Input to the dock loop: a dock's box in the flow never changes on hover, focus or press (hover sweep, 2026-11-15)

The owner (O-366): "hovering over cards/dashboard items should not shift the main cards or vizzes around, too--this is bad UI/UX". Glass's sweep of all 92 demo routes (`audit/hover-shift/TABLE.md`, gate `tools/shift-gate.mjs`) found every Card tier and every other component hold their box. The dock is the exception, three rows, one cause:

- A collapsible dock in the flow grows on hover (after 60 ms) or focus (at once): vertical +215 px tall (232 on touch) and the content below moves down; horizontal with a layer group +204 px wide and +52 px tall and the next section drops 52 px; plain horizontal +104 to 445 px wide. `useDockState.ts:385-406`, `:440`; `dock/styles/layers.css:127-132`; `morph.css:119-123`, `:150-154`.
- It then holds the larger size until the 6 s idle fold and reflows back.

Rule for the redesign (to be ruled into the pass after the sixth): a dock placed in the flow occupies ONE box, the size of its open state or of its seat, at every posture; the plate folds and opens inside or over that box and never re-lays a neighbour. A fixed or anchored dock is unaffected. Gate: `shift-gate.mjs` on every dock composition page, exit 0, in both engines at 1440 and 390.
