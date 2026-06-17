# W-PAPER-GRID-TEXTURE — DELTA (the geometric paper-cascade peer: the math/grid pillar felt THROUGH the document card)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: src/styles/tokens/scale-paper.css,src/styles/cards.css,src/components/ui/card/Card.vue,demo/stories/compositions/math-paper.vue,scripts/proof-paper-grid.mjs -->
<!-- surface-hash: 33e2f83a57fef2114ee5209fb11aac7e08e690424b099589fedb913e0de3b0a4 -->
- **Capture date**: 2026-06-17
- **Branch / base commit**: `tranche/BB` @ `88eef045` (pre-impl HEAD; this wave's edits in the working tree — §0 re-grep at HEAD found the spec authored against `f3c4170e`, ONE drift recorded below)
- **Demo build**: vite dev server `:5199`, route `/compositions/math-paper` (the document-register article this wave opts into `.paper-grid`)
- **Measurement tool**: Chromium + WebKit-class coarse (Playwright, both projects) — `getComputedStyle` host `background-image` readback + a mode-independent canvas-paint stroke-coverage scan + a static-raster invariance probe over a scripted scroll
- **Viewport**: 390×844 (mobile) + 1280×800 (desktop), BOTH modes
- **Gate**: `proof:paper-grid` (born-RED 12 violations at HEAD → GREEN, device-free SOURCE, tagged `["local","ci"]`) + the π `tests-visual/paper-grid.spec.ts` (12 tests GREEN across both projects)

## §0 RE-GROUND — the ONE drift

The spec authored against `f3c4170e`; HEAD at impl is `88eef045`. The ONE cite-drift: the spec's §0 cite `offsets-sizing.css:92` (`--paper-texture-size`) is STALE — `offsets-sizing.css` was carved+DELETED by W-CARVE3 into `offsets.css` + `sizing.css`; `--paper-texture-size` now lives at `offsets.css:94`. The new `--paper-grid-*` peers ride `scale-paper.css §12` beside the organic `--paper-clean-texture`/`--paper-aged-texture` peers (the SAME `:root` cascade context the spec names) — no token re-home was needed. Every other cite held: the organic cascade shape (`scale-paper.css:94-95`), `.paper-texture` (`cards.css:10-15`), the demo blueprint vocab (`story-hero.css:14-15,208-225`), the `paper.css` a11y idiom, the Card `grain` axis. `paper-grid-texture`/`.paper-grid` were ZERO at HEAD (born-RED ready).

## The fix (gestalt: mint the GEOMETRIC half of the ONE paper-cascade, felt THROUGH the card)

The paper-cascade shipped the ORGANIC turbulence register end-to-end (`--paper-clean-texture`/`--paper-aged-texture` + `.paper-texture` / `paper-grain-overlay`) but never the GEOMETRIC one. The math/grid brand pillar lived only as a demo-private page-substrate recipe (`.story-bg-grid`) every opaque card plate occludes — so on a dense surface the grid contributed **0.0000** (the chart/data plates that are MOST about the grid never saw it). This wave mints the geometric peer + the `.paper-grid` opt-in + the additive `<Card grid>` axis so a document-register card carries the blueprint grid as its own interior ground, felt THROUGH the translucent plate.

| Piece | Mechanism |
|---|---|
| `--paper-grid-texture` peer (scale-paper.css §12) | a two-frequency engineering grid: a 32px MINOR cell + a 128px (4×) MAJOR rule, a STATIC `linear-gradient`-stack `background-image` (one compositor-cached paint, never a per-frame repaint). The line ink is `color-mix(in srgb, var(--foreground) calc(--paper-grid-opacity × 100%/160%), transparent)` — `--foreground`-derived (re-tints in lockstep), NEVER a hardcoded `hsl()` (no-gray / token-first). ONE strength knob `--paper-grid-opacity` (0.08) drives the whole grid. |
| `.paper-grid` utility (cards.css, the sibling of `.paper-texture`) | paints the grid on the card's HOST `background-image` (see THE SEAM below), `background-blend-mode: multiply` over the tier fill, clipped by the host `border-radius` by construction. The dark arm is a PLAIN-ancestor `.dark .paper-grid` (NOT scoped `:global()` — the recurring drop trap) flipping the blend `multiply → screen` so the `--foreground`-flipped light-cream ink lifts off the near-black `--card` interior — NO parallel `--paper-grid-*-dark` family. |
| a11y guard (cards.css) | `@media (prefers-reduced-transparency: reduce)` → `background-image: none` (the SAME idiom paper.css establishes — a reduced-transparency user gets a clean card interior); a PRM block guards a future drift. |
| `<Card grid>` additive axis (Card.vue) | `grid?: boolean` default **OFF** (a bare `<Card>` is byte-identical to HEAD), composing `.paper-grid` + binding `:data-grid` when true — mirroring the `grain` shape. ORTHOGONAL to `grain`/`surface`/`tier`: a card may carry BOTH grain and grid. The existing `grain` axis is UNTOUCHED. |

## THE SEAM — the two-pseudo-budget reveal (the Triumvirate's through-glass-read, located NOT looped)

A glass tier already claims BOTH pseudos: `::before` is the moving-specular catch-light (`glass/material.css`) and `::after` is the grain overlay (`glass/ladder.css`). A `.paper-grid::after` would CLOBBER the grain's `background-image` on the SAME single pseudo — the grid + grain could NOT compose (the orthogonality the spec requires; the exact "two `::after` overlays competing for the single pseudo-element" trap the spec's Triumvirate names).

The grid therefore rides the **HOST element's `background-image` longhand**: the glass tier's `background:` SHORTHAND sets the translucent fill `background-color`, and a later `background-image` longhand COEXISTS with that color (the image paints OVER the color, UNDER the content + UNDER both pseudos), so the grid is the card's own underlay felt THROUGH the glass tint with ZERO pseudo contention — grain (`::after`) + specular (`::before`) + grid (host bg-image) all paint at once. The ambient strength lives in the line-ink alpha (the `--paper-grid-opacity`-scaled `--foreground` mix) since a host bg-image has no independent layer-opacity, so ONE knob still tunes the through-card strength. This is the located seam — not a token-α loop.

## The π binding readback (the cardinal-lesson DELTA, BOTH modes, both viewports)

| Arm | light | dark | truth |
|---|---|---|---|
| (a) grid resolves a non-`none` host `background-image` w/ `linear-gradient` stack | ✓ | ✓ | the grid reaches the card INTERIOR (the occlusion-defeat) |
| (a) bare `<Card>` carries NO grid (`background-image: none`) | ✓ | ✓ | byte-identical to HEAD — additive, default-OFF |
| (a)+(b) painted stroke-coverage ≥ JND on grid card, 0 on bare card | grid ≈ 1.6% vs bare 0.0000 | grid ≥ 1.6% vs bare 0.0000 (after the mode-independent diff fix) | the grid PAINTS lines, legible on BOTH the light cream AND the dark near-black interior — the scheme-aware dark arm holds (blend flips multiply→screen, light ink lifts off the dark plate) |
| (c) static raster — host `background-image` INVARIANT across a scripted scroll | ✓ | — | no per-frame paint allocation (the compositor-cached discipline) |

**The π probe finding (recorded — a PROBE bug, NOT a register miss).** The first π run reported dark-mode coverage ~0.00006. The cause was the canvas-paint probe hardcoding a LIGHT substrate (`rgb(239,233,221)`) and diffing the dark-mode LIGHT-cream ink against it → ~0 divergence (the false-collapse). The register was CORRECT (the live resolved dark grid line is `color(srgb 0.914 0.9 0.886 / 0.128)` painted `screen` over the `oklab(0.383 …/0.75)` plate — a light line lifting off a dark plate). The fix is mode-INDEPENDENT: diff a lined canvas against a flat canvas over the SAME neutral substrate, so any ink color (dark-on-light or light-on-dark) registers as a painted line. Re-run: 12/12 GREEN both projects.

## The frames

- `paper-grid-light.png` — the math-paper document card with the blueprint grid felt THROUGH the cream interior: a calm structural line-field behind the text, NOT a cage; the brand pillar now reads through the plate, not only in the page margin around it.
- `paper-grid-dark.png` — the SAME card in dark: the light-cream grid ink lifts off the near-black plate via the `screen` dark arm; the register is scheme-aware and legible in both modes.

## Consumers (≥2, L inv-8)

1. `demo/stories/compositions/math-paper.vue` — the document-register article opts into BOTH the organic `paper-grain-overlay` AND the geometric `.paper-grid` (the raw-class escape the ask names), the two registers composing orthogonally (the library's own live demonstration).
2. `<Card grid>` — the typed prop seam reaching the SAME utility (the consumer-facing axis, default-OFF).
3. Cross-repo at birth (the BB cross-repo amendment §A1 P1 names both): speedtest AW.W7 W3 cert-grid interior + WV1/dashboards opt the document-register cards into `.paper-grid` (the `^4.1.0` pin bump; their WG/WV1 named-YELLOW interim deletes when this ships). Foreign-tree — READ for the contract, never edited.

## Booked successor (the ONE conditional)

If a later doc-sync wave wants the demo-private `.story-bg-grid` page-substrate recipe to FOLD onto the new `--paper-grid-texture` token (the page-margin grid + the card-interior grid sharing ONE source), that unification is a SEPARATE concern — booked, not folded here (this wave mints the card-interior register; the demo page-ground grid stays correct as a page-ground layer). The library token is the single source either way.
