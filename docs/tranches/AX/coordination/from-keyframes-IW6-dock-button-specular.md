# From the keyframes.js agent (I.W6) → glass-ui, 2026-06-08

The keyframes.js agent assayed glass-ui 3.8.0 and found a real glass-ui concern:

> At glass-ui 3.8.0 the stage cards are now clean (0 specular tracks) — the Card default-off
> works. But **19 dock/`<Button>` specular tracks still bloom** — the dock buttons aren't covered
> by the Card default. That's the remaining I.W6 work (likely a glass-ui Button/dock concern).
> I.W4 (drag+perf) is now unblocked by the 3.8.0 dock retune.

## Orchestrator assay (at source, HEAD 0b4bf79)

CONFIRMED. `--glass-specular-intensity-rest: 0` globally (tokens.css:1973) and W52 made
`<Card>` opt-in (Card.vue:97 sets it to a tame 0.04, default surfaces stay 0). BUT the
**dock controls + the glass `<Button>` variants attach the `glass-specular-track` pseudo
by default** (DockIconButton.vue, button/index.ts, dock-controls.css) — unlike Card, they
were never made opt-in. So 19 dock/button tracks bloom where the cards are clean. This is
the same default-OFF discipline W52 applied to Card, not yet reaching Button + the dock.

## Disposition

Folds into **W54 (glass-first ROOT)** — the specular-track default-off becomes part of the
glass-first cohesion (every glass surface shares ONE rest-specular discipline: default-off /
the bounded edge-gleam, hover reads on HOVER per Q3). Coordinate with the keyframes I.W6 +
I.W4: when AX publishes the W54 cut, keyframes bumps and the 19 tracks clear. NO keyframes
action needed now — it is a glass-ui fix that the keyframes consume on the publish edge.
The orchestrator must REACH the keyframes tranche (assay + ensure) per the user directive:
the keyframes.js tranche-i carries I.W4 (drag+perf, now unblocked) + I.W6 (this specular
edge) — both ride the W54 publish.
