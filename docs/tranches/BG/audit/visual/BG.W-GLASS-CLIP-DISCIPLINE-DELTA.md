# BG.W-GLASS-CLIP-DISCIPLINE — dual-engine paint DELTA

**Wave** 3.3 · BG.W-GLASS-CLIP-DISCIPLINE (Class P, paint-gated)
**Commit under test** `3c0eadc5` (built + served BUILT bytes on `:5200`)
**Judge** non-authoring paint judge (did NOT build this wave)
**Date** 2026-07-02
**Verdict** **PASS** — no clip lozenge on glass surfaces + dock plate clears its track cell, BOTH modes, BOTH engines; every capture PNG resolves on disk.

---

## Criteria (verbatim)

> PASS = no clip lozenge on glass surfaces + dock plate clears its track cell over `/containers`, both modes both engines, plus a filed non-authoring Fable PASS.
> Gate arm: `proof:glass` · glass-clip + dock-plate-clearance.
> Fable/designSync surface: clip-discipline / `/containers`.
> Absorbs 3.2 W-DOCK-CAST-RETIRE (delete ONLY `shape.css:208-249` dead `.cartoon-cast`; `cards.css:359` stays LIVE).

## Method (proven C18 pipeline)

Routes captured: `/containers` (clip-discipline — overlays) + `/dock/overview` (dock plate-clearance geometric guard, the DockStage surface).
`?capture=<route>&mode=<light|dark>` boot over BUILT `:5200` (`demo:dist:build` from `@glass/*`→`src/*`; `demo:dist:serve`), poll `data-capture-ready`.
- **Chrome leg** — real Chrome.app 149 via CDP `connectOverCDP(:9456)`, viewport 1440×900 @2x, `colorScheme`. `GL_RENDERER` probe → **ANGLE Metal Renderer: Apple M5 Max** (real GPU, not SwiftShader). Screenshot + COMPUTED DOM probes.
- **Safari leg** — off-screen WKWebView (`wkshot-live`, system WebKit.framework/Metal), 2880×1800, `data-capture-ready` poll → snapshot. Engine badge decodes **WEBKIT / Apple GPU**.

## Device-free gate arm (GREEN — prerequisite)

| Gate | Result |
|------|--------|
| `proof:glass-clip` | **PASS** — C1 register=1 clip rule (complete), C2 0 surviving `contain:` dialects, C3 exclusions held (overlay+dock un-clipped), C4 radius alongside (card/btn/pseudo-inherit ✓), C5 cast absent (shape ✓ / vue ✓), C6 PRM carve ✓, C7 built bundle `contain:paint` survives, self-test bites all teeth ✓ |
| `proof:dock-plate-clearance` | **PASS** — W1 plate clears cell (insetFraction 0.1, `padding`+`bg-clip` consumed, all rungs clear: comfortable cell=40 plate=32 hover=35.2 slack/side=2.4px clears), W2 cross-axis visible, W3 `contain:paint` audit verdict(a)=true |

**W-DOCK-CAST-RETIRE absorption verified** — `src/styles/dock/shape.css` has NO live `.cartoon-cast` **rule** (only a stripped retirement-note comment); `GlassDock.vue` renders NO `class="cartoon-cast"` (comment-only mention); `src/styles/cards.css:329/359` `.cartoon-cast` base rule stays **LIVE** (the shared Card cast). Atomic delete, no orphan half-delete.

## Computed DOM evidence (Chrome, per config)

| Route | Mode | glass surfaces | dock controls | overlay-band clip violations | dock plate (icon-button) | bg-clip | pad/side |
|-------|------|---------------|---------------|------------------------------|--------------------------|---------|----------|
| /containers | light | 58 | 25 | **0** | 40×40 cell | content-box | 4px |
| /containers | dark | 58 | 25 | **0** | 40×40 cell | content-box | 4px |
| /dock/overview | light | 108 | 92 | **0** | 40×40 cell | content-box | 4px |
| /dock/overview | dark | 108 | 92 | **0** | 40×40 cell | content-box | 4px |

The dock control plate is a 40px track cell with `background-clip: content-box` + 4px inset per side → a 32px painted plate that clears the cell edge (the `--dock-control-safe-inset` = cell×0.1 geometry — the lozenge dies at the geometry root, matching `proof:dock-plate-clearance` W1 comfortable rung exactly). `dock contain: content`, one clip register on `.glass-material` (the narrowed paint-box; absent as an element on these routes, register confirmed in-source by the gate).

## Painted truth (pixel reads)

- **`/containers` (Chrome + Safari, both modes)** — the Dialog/Sheet/Drawer/Popover/Dropdown glass cards render with FULL rounded corners; the blueprint-grid wash transmits THROUGH the translucent plates (glass-first identity intact). **No flat-topped lozenge**, no corner slicing on any glass surface. Left rail selected control + bottom dock pill render as clean rounded plates.
- **`/dock/overview` (Chrome + Safari, both modes)** — collapsed dock plate reads as a **perfect circle** (Safari captures show it collapsed; Chrome expanded — both clean), the media-transport + collapsible pills are fully-rounded with control glyphs clearing their cells, the selected nav tab ("Overview") shows a clean rounded highlight. No lozenge on any dock control plate.
- **Cross-engine parity** — WebKit's backdrop-filter renders the wash slightly more textured than Chrome's ANGLE-Metal path, but the CLIP DISCIPLINE is identical: rounded plates, un-clipped overlay/dock band, backdrop transmission. No engine-specific lozenge.

## Captures on disk (all 8 RESOLVE)

Under `docs/tranches/BG/audit/visual/BG.W-GLASS-CLIP-DISCIPLINE-DELTA-assets/`:

| Engine | Route | Light | Dark |
|--------|-------|-------|------|
| Chrome | /containers | `clip-containers-chrome-light-desktop-full.png` | `clip-containers-chrome-dark-desktop-full.png` |
| Chrome | /dock/overview | `clip-dock-overview-chrome-light-desktop-full.png` | `clip-dock-overview-chrome-dark-desktop-full.png` |
| Safari | /containers | `clip-containers-safari-light-desktop-full.png` | `clip-containers-safari-dark-desktop-full.png` |
| Safari | /dock/overview | `clip-dock-overview-safari-light-desktop-full.png` | `clip-dock-overview-safari-dark-desktop-full.png` |

Computed probe JSON: `clip-chrome-results.json`. Capture script: `../pipeline-validation/clip-chrome-capture.mjs`.

## Non-authoring Fable PASS

This DELTA IS the filed non-authoring dual-engine paint verdict for the `clip-discipline / /containers` designSync surface. The judge did not author the wave; the verdict rests on the PAINTED truth (computed DOM + pixel reads) across Chrome-Metal and WebKit-Metal in both modes, not the builder's claim.

**VERDICT: PASS** — every surface reads correct in both engines + both modes; every capture PNG resolves on disk; siblings verified intact before AND after (`verify-siblings-intact --quiet` exit 0).
