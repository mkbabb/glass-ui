# Orchestrator note (2026-11-16 02:45, after critique 1). BINDING for fix seat 2, the critics and the close.

Critique 1's ten defects all stand; cure each at its root. Rulings where the critique leaves a choice:

1. **The overlay register's exit (Popover, hover card) leaves by ONE effect plus opacity.** Today it leaves by four channels at once (opacity, an 8 px slide, a 6 px blur, an anisotropic scale). The owner: "NO overuse of shading, transition, or markup--this is an AI smell." Ruling: opacity and the 8 px slide toward the trigger only; the filter blur and the scale go from the exit AND the entrance of that register. Witness: computed filter and scale are none and 1 on every frame of both.
2. **Row 9's CHANGELOG** says only what changed: the exit and the reversal are new; the entrance tween and first-frame Escape are stated as unchanged or not stated.
3. **The gate that hangs at its 90th WebKit cell:** split `gate:exits` so each project runs as its own process with its own server start, and a goto timeout retries once after a server health check; a hang is then a failure of one named cell, not of the gate.
4. **Witnesses that do not bite** (Accordion and Collapsible reversal in WebKit; the Sheet's exit clause; the routes not driven): restate each so it is RED on v11.1.0 where the fault exists; where v11.1.0 is honestly green (the Sheet's exit), say "no change: a no-regression read" in the record and drop the claim from the CHANGELOG.
5. **Rows 8, 10, 12, 13** as their notes rule (row 8: four commits, the cap 200 ms). Row 13 (b): if the ResizeObserver loop does not reproduce on glass's demo in WebKit 2287, record the reading and leave it; do not guess a cure.
6. **The ratchet** is rebound after the LAST source commit, once.
7. The leave-finished event inside a shadow root: look the content up from the surface's own root node (`getRootNode()`), never `document`; add the shadow-root witness.

Two of the critic's INBOUND notes are yours to read while you are there, reading only: at device pixel ratio 3 the phone firm plate blurs only part of itself in default headless Chromium (read it once on the GPU lane, `--use-angle=metal --enable-gpu --ignore-gpu-blocklist`, renderer string recorded; if it reproduces there it is a defect of row 2 and you cure it; if not, record that it is a software-lane artefact).
