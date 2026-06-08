# Orchestrator live MCP audit — pass 2 (chrome-devtools-mcp, localhost:5173)

Live visual-truth audit of the pass-2 flagged pages (the source-audit workflow is source-only;
this is the orchestrator's real-device half). Captured via evaluate_script getComputedStyle.

## P6 — /primitives/pulse egregious radial (CONFIRMED)

`.pulse-aura` demo-background elements paint FULL-PAGE radial-gradients (1513×853) at 55% core
alpha: `radial-gradient(color(... / 0.55) 0%, ... / 0.1925) 45%, transparent)`, one per viz hue
(fourier/chebyshev/legendre). It is a DEMO class (the pulse story background), not the Pulse
component. FIX (P6/P7): drop the 0.55→~0.15 OR replace the hand-rolled radial stack with an
`<Aurora>` keyed off the page's viz colors (the P7 aurora-hero pattern). Owner: W18/W40 demo IA
+ W47 (aurora hero).

## (more to come post-workflow — dock-layers lag DK7, rail DK8, tabs T1, use-token-color P1,
## glass-material P9 — captured when the research agents' browser usage settles)
