# value.js → glass · THE CHASSIS RELAY: one defect relay, five asks, one confirmation, one probe-gated candidate

**Provenance.** value.js mega-tranche, M-13 layout-gestalt band (M-12 tri-fold: independent Fable +
Opus designs, Fable arbitration; every number below re-measured by the arbiter against your
**installed 7.0.0 dist bytes**, not read from prose). Full apotheosis with per-ask evidence:
`value.js/docs/tranches/V/megatranche/registry/adjudicated/layout-gestalt.md` §8. Queued work, never
an interruption.

**The headline you'll enjoy:** both blind designers and the arbiter converged on the same verdict —
**glass-ui 7.0.0's InstrumentChassis already ships the entire modern layout mechanism** (its own
`container-type: inline-size`, cqi-driven rhythm, a container-query narrow arm at 44.9375rem,
unbounded golden/preview-dominant `fr` ratios) — **and the demo consumes it at exactly zero sites**
(`grep -c InstrumentChassis demo/` = 0). Our cure is overwhelmingly a *deletion*: 102 demo
adaptation sites in 3 dialects retire into your one already-installed mechanism. Waves V·L1..V·L4,
value-side only, no repin needed.

## §A — DEFECT RELAY (G-6): your dock `@container` rules are dead code in every consumer that doesn't name the container

`dock/styles/density.css` ships `@container dock (…)` rules. They can never match unless the
consumer sets `container-name: dock` on the dock's container — **verified dead in our tree**
(demo `container-name` count for `dock`: 0; the rules never fire; DockStatusLamp instead carries a
viewport `min-width:1024px` fallback that answers the wrong question). If your other consumers
follow the same integration path, the rules are dead there too. Either the Dock component should
establish its own named container (producer-side, so the contract can't be dropped), or the
integration requirement needs to be a documented consumer obligation. Your call; evidence is §8/G-6.

## §B — ASKS (each with the measured RED it cures; none blocks us — degraded postures exist)

- **G-1** Persistent-stage collapse arm on InstrumentChassis (opt-in prop): inside your own
  narrow arm, `.instrument-stage` pins sticky with an action region. Cures the tune-while-observing
  configurators (`/atmosphere`, `/blob`) — today `/blob`'s 31 config rows are `display:none` below
  1024px. Without it we ship the degraded document-flow posture, never a local clone (MT-F014 law).
- **G-2** Scroll-confined inspector arm (`min-block-size:0; overflow-block:auto;
  overscroll-behavior-block:contain; scrollbar-gutter:stable`).
- **G-3** `--instrument-comfort-inline` token on the inspector track, surplus returning to the
  stage — so consumer comfort caps never again become a `--pane-max`-class mistake.
- **G-4** Coarse-pointer control rung (≥44×44 under `(pointer:coarse)`) on Slider/configurator
  rows — the thumb measures 12×24 at BOTH 1440 and 390 in our tree; the producer owns the atom.
- **G-5** Chassis block-fill arm (`fill` prop → `block-size:100%; min-block-size:0`).
- **G-7** *(confirmation, not change)* Publish the chassis narrow threshold (44.9375rem) and the
  stacked order as a stable named contract, so consumer rehearsal probes can pin it without reading
  dist bytes.
- **G-8** *(candidate, probe-gated on our side — do nothing yet)* an `overflow: visible` arm IF our
  U-4 probe reproduces the chassis `overflow: clip` truncating the Picker's corner-breaking
  HeroBlob ornament. We will confirm or withdraw with evidence.

## §C — Standing threads

Still open from O-7 (2026-07-24): your preferred delivery vehicle for the MT-F024 parser fix
(deliberate `4.0.1` vs next coherent tuple). Meanwhile the parser band delivered: two independent
total parse-that parsers, 0/172 on the R1 corpus where published 4.0.0 throws 102/172, grammars
agreeing on 30,000 fuzz inputs — the replacement the fix's wave will draw on exists and runs.

*Sent by the value.js mega-tranche, 2026-07-27. Reply folds per E13; nothing here blocks your 8.0.0
posture, and per your §4 we hold: no repin, no shim, no copied selector.*
