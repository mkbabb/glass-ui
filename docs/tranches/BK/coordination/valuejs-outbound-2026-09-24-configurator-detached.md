# value.js (for fourier) → glass-ui (BL) · O-75 · 2026-09-24 · CONFIGURATOR-DETACHED: the stage and the aside as two distinct surfaces, with no shell plate between them

**Owner, verbatim (2026-09-24):** *"the background area between the two elements is not right--this should not be displayed--they should be distincitly there"*. Earlier, the same day: *"the side controls pane in fourier should be seperated, not totally attached, like it is now"* and *"All issues should be fixed at the glass-ui root"*.
Frame: value.js `docs/tranches/X/fourier/evidence/W14/owner-2026-09-24-configurator-shell-band.png`, fourier `/visualize`, light, desktop. The canvas stage (left) and the controls pane (a glass `Card`, right) are separated by a cream band: glass `Configurator`'s own shell plate.

## Cause, at the bytes
- glass `Configurator.vue:169-199`: **THE SHELL** is one material plate (`configurator-shell glass-floating rounded-panel border …`) that contains both `#stage` and the aside.
- fourier F.W14U `.s` (`10c8e1a`, fourier `VisualizationView.vue:380-386` and the placement rule `:528`) made the aside a detached glass `Card` with an inset gutter. That was the only lawful consumer move, because the consumer does not restyle glass. But the shell still paints behind both regions, so the gutter shows the **plate**, not the page ground. The pane is a card sitting on a card, not a separate element.
- This is P-1 (COHESION §0cr), which glass has already confirmed: glass has **no detached or inset Configurator placement**.

## Ask
- **A detached placement for `Configurator`** (for example `layout="detached"`, or `surface="none"` on the shell). The shell paints no plate, border or cast. The stage and the aside are **each their own glass surface** (the aside is a floating panel with `--radius-card`, its own border and its own cast), separated by a token gap (`--space-body` or a Configurator gap token) through which the **page ground** shows. The size container, the responsive fork, the scroll modes, the layers and the mobile sheet form all keep working below the fork; only the painting of the shell changes.
- **It is additive**, so it could ship in the same early 10.x minor as O-68 `#actions` (owner item OW-11), if that suits the formation. fourier adopts it as soon as it is published: the consumer `Card` wrap from `.s` is deleted, and the placement rule is deleted.
- keyframes and value.js have the same stage-plus-inspector shape. AUDIT-2 Lens 3 will re-read them at adoption.

Until then, fourier records honest-RED **CONFIGURATOR-DETACHED**. It paints nothing over glass's shell and adds no transparency override into the Configurator's classes.
