# USER LIVE AUDIT — 2026-06-10 00:16–00:37 (BINDING; the user drove :5199 + :5273)

The user's live audit of both surfaces mid-Batch-3. Every item routed. The user's judgment
OVERRIDES gate-green wherever they conflict (the cardinal lesson's human half). Screenshot
references are user-held (TCC blocks ~/Downloads); each item's prose names its surface.
NOTE: Batch-3 wave 2 was MID-FLIGHT during this audit (LANE-SB editing the storybook/eggs;
LANE-MOTION/SYS/DOCS too) — items marked [W2?] may be partially addressed by the in-flight
lanes; the fix fleet RE-VERIFIES each against the settled tree before re-building.

## A — SLIDES (the 13-slide deck, :5273)

| # | Item (user's words distilled) | Routing |
|---|---|---|
| A1 | **S11 xray: the nutrition label pulled DIRECTLY from the AI-Nutrition-Label codebase** (`~/Programming/AI-Nutrition-Label`) and styled the same — not a hand-rolled approximation | **L.W-XRAY-LABEL** (new arm on the xray slide): extract the real label markup/styles from the AI-Nutrition-Label repo, transpose faithfully |
| A2 | Constellation too opaque — type over it is hard to read. User asks: glass plate or more transparency? | RECOMMENDATION (orchestrator): BOTH halves of the house answer — a `glass-wash` text plate where type sits over the field (the W54 register; showcases the library) + the constellation RECEDES under text zones via the `opacityCeiling` envelope (W-COHERE E3) once adopted. Routed: the glass plate NOW (slides-local), the recession at **L.W-ADOPT** |
| A3 | Click → the anomaly warps to the nearest point of the click | The lib's `warpOnClick` EXACTLY (AX.W17, live-gated). The slides bespoke engine lacks it → an **L.W-ADOPT acceptance criterion** (verbatim: clicking the cover warps the anomaly to the nearest node) |
| A4 | S2 (success-figure): giant void on the right | **L.W-POSTER-R2**: rebalance the lockup (the figure poster needs a right-side counterweight — the watermark alone is not enough) |
| A5 | S3 (success-delivered): most panes BLANK — should be PNGs of our vizzes, NOT live | **L.W-POSTER-R2**: replace the live-iframe insets with committed PNG captures of the real vizzes (USF/SCI/Wi-Fi/broadband — the assets exist at public/assets/) |
| A6 | An arrow misaligned (user screenshot 00.16.54 — the fan-in schematic's connector class) | **L.W-POSTER-R2**: align pass on the example-fanin connectors |
| A7 | S12 (pipeline): the WOPR image should NOT sit in a web-browser container | **L.W-POSTER-R2**: de-chrome the console — the WOPR still framed as a CRT/terminal plate (no browser bar), per the war-room register |
| A8 | "Just a proven team" → **"A proven team"** | **L.W-POSTER-R2** (one-line copy, S13 + anywhere else it appears) |
| A9 | S13 (closer): fill the dead space / restructure for visual flow | **L.W-POSTER-R2**: the closer recompose round 2 |
| A10 | The cards should all be GLASSY (user screenshot 00.18.28) — better leverage glass-ui + the liquid-glass primitives in the slides | **L.W-GLASS-SUFFUSE** (new): the deck's `card`/`glass-resting` surfaces re-pointed onto the real glass-ui ladder (true backdrop-blur glass over the constellation/substrate), the liquid-glass edge/specular axes where befitting |
| A11 | The dropdown/popover needs more padding; dark mode does NOT persist and RE-ACTIVATES when clicking the settings gear (screenshot 00.20.57) | Padding: **W-PRIM-POLISH-R2** (glass-ui root — the popover content padding rung). The dark-mode persistence + gear re-activation BUG: **L.W-CHR-R2** (slides DeckSettings state — likely the theme toggle re-firing on popover open; root-cause the persistence store) |
| A12 | Glyphs not aligned (screenshot 00.18.28 — the closer/card glyph row) | **L.W-POSTER-R2** align pass |

## B — GLASS-UI (the demo, :5199)

| # | Item | Routing |
|---|---|---|
| B1 | ALL docks need proper persistent controls + nav — the frontpage and others still don't (00.22.50) | **W-DOCK-NAV** (re-open of the AX.W61 nav-pattern contract): every demo dock composes the home-left + separators + persistent controls pattern; the shell docks audited |
| B2 | The dock SELECTED state (underline + darkness) is awful (00.23.00) | **W-DOCK-NAV**: re-tune the active register (the glass-first selected tier per AX.W61 — not the heavy underline+dark fill the user is seeing) |
| B3 | **Slider STILL not right: ONE continuous segment — the thumb INVISIBLE; you pull the TRACK itself** (00.24.33) | **W-SLD1-R3** (the third refinement, BINDING): no visible thumb AT ALL — the filled track end IS the handle (the true iOS-slider register). The cylinder correction kept a visible integrated thumb; the user's bar is thumb-INVISIBLE. The isCircle clause restates AGAIN (assert NO distinct thumb paint; the grab affordance is the track) |
| B4 | Dock collapsed state must be a CIRCLE, not oval (00.25.22) | **W-DOCK-NAV**: the collapsed pill aspect locked 1:1 (the AX.W61 collapsed-floor tokens re-derived) |
| B5 | Dock items broken — need design hierarchy, dividing lines, icons (00.26.15/.11/.01) | **W-DOCK-NAV**: the control families re-skinned (DockSeparator usage, icon affordances, the tier ladder) |
| B6 | `/dock/layers` TOTALLY broken — laggy, NO rail element line like before; look to value.js's dock + the prior version | **W-DOCK-LAYERS** (re-open): rebuild the layer-group + rail against the value.js reference (`~/Programming/value.js` demo dock) + the pre-regression captures; the rail indicator line restored; the lag root-caused |
| B7 | Vertical overflow (re-adoption proof) totally broken | **W-DOCK-LAYERS**: the vertical-dock overflow story re-built + gated |
| B8 | Two variants indistinguishable; the right one's selected bar misaligned + offset (00.28.23) | **W-DOCK-NAV** (the tabs-in-dock tier) — collapse the redundant variant or differentiate; fix the indicator offset |
| B9 | Persistent controls: dividing line before the right item; NO greyed forward arrow when nothing more — adaptive (00.29.11) | **W-DOCK-NAV** |
| B10 | `/substrates/blob` LARGELY BROKEN — pixelated, NO goo/satellite effects, inferior to many tranches ago; the Configurator showcase section does not render. REBUILD FROM FIRST PRINCIPLES per the old screenshots | **W-BLOB-REBUILD** (supersedes the W-BLOB-CONFIG patch where they conflict): restore the goo (smin merge) + satellites + the non-pixelated render against the historical captures (docs/tranches/AX visual archives); root-cause the pixelation (likely DPR/canvas-size regression) + the dead showcase mount [W2? no — wave 2 does not touch the blob] |
| B11 | Text on ALL demo pages WAY too large; awful hierarchy; audit all pages + sub-pages | **W-SB-TYPE** (new): the demo type-scale pass (the story chrome rides the proper ladder rungs, not display sizes) — folds the RA-typography off-token findings |
| B12 | `/substrates/fourier-field` sucks — far too faint; look to how fourier-analysis renders the curves; a procedural variant thereof | **W-FF3** (re-open beyond the RG): match the fourier-analysis repo's render register (stroke weight/glow/contrast) — the user's reference is on disk at `~/Programming/fourier-analysis` |
| B13 | `/substrates/glass-material` pointless on a black background — it shows nothing | **W-SB-STAGE-R2**: stage the glass-material page over a LIVE bright substrate (aurora behind glass — the whole point) [W2? — W-SB-STAGE is in-flight; re-verify then fix] |
| B14 | Spectrum slider: the gradient track's thumb a bit THINNER, like value.js | **W-SLD1-R3** (the spectrum arm; value.js reference) |
| B15 | `/dock/overview` first section broken — the shrunken dock offset; and dock animations expand FROM THE RIGHT — must morph from the CENTER (00.34.34) | **W-DOCK-MORPH-CENTER** (re-open of the morph): the transform-origin/anchor — expansion is center-out, not right-anchored; the shrunken-dock offset fixed |
| B16 | `/compositions/hero`: constellation INVISIBLE still | RE-VERIFY post-wave-1 zero-paint fix on the settled tree [the fix landed b8c6b34 — if still invisible, the fix missed the live route → **W-SB-STAGE-R2**] |
| B17 | `/compositions/dashboard` sucks — numbers squished; question the components' point | **W-PRUNE** (the ruthless superfluity wave, below) + the metric-cell/stack squish fix if the component survives the prune |
| B18 | `/compositions/empty-states`: the giant blob NOT deftly integrated; hover whack; shading imperfect — BUT this blob reads better than the others. Redesign from first principles + the goo/satellites | **W-BLOB-REBUILD** (one blob identity; the empty-state mascot scales DOWN from the rebuilt hero) [W2: the mascot is W-EGG mid-flight — re-verify] |
| B19 | The aurora preview panes STILL have a black bar on top (00.37.31) | **W-AUR-CONFIG-REBUILD**: the preview-pane crop/letterbox root-caused (the canvas aspect vs the pane) |
| B20 | **The van-Gogh aurora is AWFUL — super laggy, looks NOTHING like van Gogh brush strokes.** Rebuild from first principles with the procedural generative brush strokes "we had before" | **W-AUR-VANGOGH-REBUILD** (the user's judgment OVERRIDES the band-gate green: the C/A/β bands measure statistics, not strokes; the reality lane's "marbled flow-bands" read confirmed). Restore the stroke-atom register (directional anisotropic dabs) + fix the lag (the oils are "insanely laggy" — the perf lane's per-medium profile is the baseline) |
| B21 | **The Configurator itself is god-awful — rebuild from first principles**: better hierarchy, control types, layout; the SAME configurability as before. Keep/treasure: crayon (a bit too oily), speedtest (more cloud-like + evolve over time), sky, dawn. The oils insanely laggy | **W-AUR-CONFIG-REBUILD**: the studio chrome ground-up (the library Configurator at its best — hierarchy, grouped controls, proper control types); preserve the full pre-existing control surface; the named preset tunings (crayon less oily; speedtest cloudier + time-evolving) |
| B22 | `/foundations/intro`: the aurora must be the ENTIRE page background — no sub-container on pages like this | **W-SB-STAGE-R2**: the full-bleed hero class (no chrome box) [W2 — re-verify against the in-flight staging] |

## C — THE CROSS-CUTTING ASKS

| # | Ask | Routing |
|---|---|---|
| C1 | A fresh frontend-design plugin audit of ALL UI panes (both repos): design hierarchy, visual incongruences | **The FD-R2 fleet** (fable, per the standing directive) — AFTER wave 2 + the fix fleet settle (audit the settled tree, not the moving one) |
| C2 | Suffuse the design language: glass, grid, math, large audacious typography, colorful audacious pops (like the icons — increase within proportion) | The FD-R2 fleet's synthesis brief + **W-SB-STAGE-R2** |
| C3 | glass-ui idiom adoption/refinement/abstraction gaps | The FD-R2 fleet + W-CONVERGE (in-flight) |
| C4 | **RUTHLESS superfluity pruning** (the dashboard composition named; etc.) — leaner; audit usage across the repo constellation | **W-PRUNE** (new): every demo composition + exported component graded against real cross-repo usage (slides/speedtest/sci-report/value.js/fourier-analysis); zero-consumer + zero-story-value items RETIRED per the substrate-without-consumer bar |

## The fix-fleet order (after wave 2 settles + integrates)

1. **The quick slides round** (L.W-POSTER-R2 + the copy fixes + L.W-CHR-R2 dark-mode bug) — small, high-visibility.
2. **The dock band** (W-DOCK-NAV + W-DOCK-LAYERS + W-DOCK-MORPH-CENTER) — the largest defect cluster; the value.js reference read first.
3. **The rebuilds** (W-BLOB-REBUILD, W-AUR-VANGOGH-REBUILD, W-AUR-CONFIG-REBUILD, W-FF3) — first-principles, against the historical captures + the sibling-repo references; specs authored with the user's verbatim bars.
4. **W-SLD1-R3** (thumb-invisible) + W-SB-TYPE + W-SB-STAGE-R2 + W-PRUNE.
5. THEN the FD-R2 audit fleet grades the settled tree → Batch 4 → close → publish.
