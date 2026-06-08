# Constellation cross-repo handoff — AX.W17 → AX.W30/W31 (slides adoption)

**Artefact class**: `coordination/CONSTELLATION.md` (the cross-repo seam-landing + successor-gate record).
**Scope**: the AX constellation band (band E). W17 (glass-ui) lands the LIBRARY-side seam + tokens; W30/W31 (slides) execute the consumer #2 adoption.

## §1 — What W17 landed at HEAD (glass-ui, library-side)

The focal/warp seam + the `--constellation-*` plain-hsl legibility tokens are AT HEAD (UNPUBLISHED until the AX cut):

| Surface | Status | The slides-side reader (W30) |
|---|---|---|
| `--constellation-line` (plain-hsl, both arms) | landed | W30 READS it slides-side to retire the deck-scoped resolved-color value (the I-session `9f08ded` fix rides over the library default) |
| `--constellation-node` / `-node-dim` (dark-lifted) | landed | W30 drops the slides-local node-color overrides that duplicate the library legibility |
| `--constellation-edge-alpha` / `-edge-focus-alpha` / `-alpha` | landed | W30 drops the slides-promoted magic-alpha tokens; the library default is the recessive baseline |
| `--constellation-accent` (NEUTRAL library default) | landed | W30 aliases it to `--ncsu-red` (the legitimate preset boundary, presets-in-consumers) |
| the focal-node + `warpTo`/`warpOnClick` seam | landed | W30 re-points the slides `drift()` onto the engine focal-node spring (drift = "warp to a periodically-chosen random node" — the same seam, an auto target-source), then DELETES `src/decks/til-briefing/constellation.ts` (510 lines) |

**Token NAME note (W30 must read the CANONICAL library name):** the spec named the focus-edge multiplier `--constellation-edge-anomaly-alpha`; W17 ships it as the NEUTRAL `--constellation-edge-focus-alpha` (the library ships neutral legibility — "anomaly" is the consumer's deck framing; presets-in-consumers). W30 reads `--constellation-edge-focus-alpha` (or overrides it). See `audit/W17-constellation-port.json` divergences.

## §2 — The publish gate (§4 note 12)

The slides adoption (W30/W31) is **gated on the AX cut PUBLISHING**. slides MEASURED published `3.6.0`; the focal/warp seam + the `--constellation-*` tokens are at HEAD-only until the AX publish. The sequence:

1. AX publishes (the cut that carries W17's library seam).
2. slides bumps its `@mkbabb/glass-ui` pin to the published AX line (dev-resolves the published `dist/`).
3. W30 authors the slides anomaly `drawOverlay` skin (pulse ring + core + resolved-check + dashed callout, reading `--constellation-accent` → `--ncsu-red`) + a thin `<Constellation :draw-overlay>` wrapper, re-points `drift()` onto the engine focal-node spring, and DELETES the 510-line `constellation.ts`.
4. W31 fold §E: drop/retune the slides-local `--constellation-alpha` `0.92`/`1.0` override down to inherit/match the library's recessive default.

**Satisfied-witness (do NOT re-fix):** the slides-side `--foreground` light-dark()-into-Canvas2D leak is ALREADY FIXED (the I-session landing at `constellation.ts:116`, deck deployed `9f08ded`). W30 treats it as an addressed-out-of-band witness; its remaining work is the deletion + the anomaly skin port, NOT the leak fix.

## §3 — Other consumers (named, gated on their pin bumps)

- **fourier** (cream+ink — the SECOND token-driven ground in the visual-truth matrix; gated on its pin bump).
- **words** (backdrop/atmosphere — once it executes).

## §4 — No-silent-deferral note

The slides `constellation.ts` deletion is SEQUENCED (a named successor wave + a publish gate), NOT deferred. W17 did NOT close leaving the slides duplication un-routed: the route is W30 (charter `### AX.W30` line 1504, `dependsOn AX.W17`), gated on the AX publish.
