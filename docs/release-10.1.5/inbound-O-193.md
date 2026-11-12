# Inbound O-193: daraksha's prod frame still shows the hover ellipse (value-js-63, owner order 2026-11-09 12:20)

The owner's frame from daraksha.babb.dev at 12:20 today, on glass 10.1.4, still shows the O-155/O-165 ellipse. Hovering one DockControl paints a single ellipse across the whole dock. The geometry is a `:collapse="false"` fit-content GlassDock holding four tab seats (DockControl, `shape="icon"` is coming next), beside a second plate holding the page controls and the theme toggle.

Critique 7 recorded O-156/O-165 cured in both engines on the branch. This brief adds daraksha's exact geometry as a witness cell, so the cure is proven on the shape the owner is looking at.

## Gates

At 390 and 1440, in Chromium and WebKit, light and dark, with four tab seats in both text and `shape="icon"`: hovering each seat in turn keeps the dock's computed border-radius free of `%` and equal to half its cross extent, and paint shows a pill, never an ellipse. The cell must be RED on v10.1.4 and GREEN on the branch. The fix and critic seats fold it in with O-186/O-187 (inbound-O-186.md), which may share its root.
