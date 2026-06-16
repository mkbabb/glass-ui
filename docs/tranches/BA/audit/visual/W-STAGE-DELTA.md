# BA.W-STAGE — DELTA (the demo backdrop system)

**Wave**: BA.W-STAGE — the per-category background map + the field-backed showcase chassis + the dock-stage chassis
**Branch**: tranche/BA
**Status**: operative-PASS (the source `proof:stage` 6/6 + the π `tests-visual/stage.spec.ts` 14/14 both projects; the gestalt captures fed to W-REFLECT2)
**Freshness**: captured POST-W-DARK-MATERIAL (Batch 1) + POST-W-GLASS-CAL (Batch 4) — the dark substrate ladder + the ~15-20% blur dial-back are in the render, so the DELTA is fresh, not stale-pre-cal.

## The defect (R8 ground / page-backgrounds.md fleet)

The storybook was an 80%-blank near-black void: **81 of 101 story rows carried no `background:`**, falling to the AppShell flat `bg-background` (`hsl(24 8% 6%)` in dark). Glassiness demos sat over opaque `bg-card` ShowcaseFrame plates that OCCLUDED the page field (BG-2). The dark grid/paper static washes were tuned light-first (9%/16%) and VANISHED behind the wash card over the W-DARK-MATERIAL near-black page. The flagship dock demos sat on flat `bg-card/40 p-8` panels — glass over a flat substrate is invisible glass (FD-DOCK-1). The aurora `breathing` motion register was DEAD (all three drift terms zeroed — a sub-perceptible ±2.5% luminance pulse, BA-VJS-2).

## What landed (the five scopes + the two literal-diff applications)

| Scope | Change | Files |
|---|---|---|
| 1 | The per-category background map (`CATEGORY_DEFAULT_BG` + `s()` inherit) — EVERY row resolves a non-empty kind; zero keyless | `manifest.ts` |
| 2 | The field-backed ShowcaseFrame mode + the BG-2 re-point | `ShowcaseFrame.vue`, `glass-material.vue` |
| 3 | The contained-substrate dark ceiling lift (opacityCeiling dark-aware) | `StoryHero.vue` |
| 4 | The dark grid/paper static-wash recalibration (9%/16% → 18%/30% + warm paper base) | `story-hero.css`, `StoryHero.vue` |
| 7 | The token-tour contrast chassis (checkerboard / vivid / paper / dark-stage fields) | `surface-tints.vue`, `overlays-scrims.vue`, `shadows.vue`, `paper-backdrop-texture-system.vue` |
| 8/9 | The dock-stage chassis (ONE shared offscreen-paused aurora) + the three re-points | `dock/DockStage.vue` (create), `dock/overview.vue`, `dock/layers.vue`, `dock/morph-showcase.vue` |
| 12 | The aurora `breathing` register made honest (non-zero drift, JS table only) | `aurora/composables/atoms.ts` |
| 10 (W-SUFFUSE2) | The h1-rung literal diff applied on its behalf (`text-heading` → `text-title`) | `StoryPage.vue` |
| 11 (W-ANIMATE) | The chassis entrance hooks applied on its behalf (`[data-scroll-reveal]` section stagger + the hero `<h1>` SETTLE fade-rise) | `StoryPage.vue`, `StoryHero.vue`, `story-hero.css` |

## π readback — the binding visual truth (`tests-visual/stage.spec.ts`, 14/14 both projects)

- **(a) the void killed** — `/feedback/alert`, `/display/buttons`, `/forms/inputs` (keyless at HEAD) now each render a `.story-hero-bg` declared background substrate. PASS.
- **(b) grid-in-dark** — `/data/metric-cell` (grid) renders the `.story-bg-grid` substrate and the resolved `--story-grid-color-strong` is a concrete non-empty dark-arm color (the 18%/30% lift, not the 9%/16% vanish). Capture `W-STAGE-gestalt--data-metric-cell-desktop-dark.png`: the ruled blueprint grid reads THROUGH the wash card. PASS.
- **(c) glass-over-aurora, no opaque plate** — `/substrates/glass-material` the glass-rung host frame's resolved `backgroundColor` is transparent (the BG-2 kill). Capture `W-STAGE-c-glass-material-over-aurora.png`: the glass-wash/glass-quiet rungs float DIRECTLY over the full-bleed aurora, no `--card` plate between. PASS.
- **(d) dock-over-live-field** — `/dock/overview` + `/dock/morph-showcase` render the `.dock-stage` container + the `.dock-stage-field` aurora behind the column; the flat `bg-card/40` panels are GONE. Capture `W-STAGE-gestalt--dock-overview-desktop-dark.png`: the dock pills + transparent tiles sit over the painterly drift. PASS.
- **(e) breathing has a field** — the navigation-band aurora renders on `/navigation/carousel`; the non-zero `breathing` drift (nucleiDrift 0.005 / paletteDrift 0.006 / warpDrift 0.003) drives a perceptible-not-dead field. PASS.

## The one-GL-per-route budget (BA invariant 9 — DRIFT-driven decisions)

- **Dock band → `grid`, NOT `aurora`**: the dock's live field is delivered by the in-page DockStage (ONE GL context per dock route), so the band declares `grid` for the StoryHero page wash (free, static) rather than double-mounting a page-level aurora + DockStage aurora. "Dock → aurora" (page-backgrounds §4) is REALIZED via DockStage.
- **`/display/card` + `/substrates/glass-panel` — §0 cite DRIFT**: page-backgrounds §5 says both are "currently blank" and should gain an aurora hero. At HEAD both ALREADY self-stage (card.vue:126,302 + glass-panel.vue:80 hand-roll their own contained `<Aurora>`). They are OUT of this wave's bound (only glass-material.vue is), so adding a page hero aurora would stack a 2nd/3rd GL context. card inherits `paper`, glass-panel declares `grid` — their existing body auroras remain the live-field demos. Budget-clean, the staging intent satisfied by the pre-existing self-staging.
- **`/motion/handmark` → explicit `paper`**: the hand-voice demo IS a paper-grain register surface (its own paper-grain cards), so it declares `paper` rather than inherit the motion-band `constellation` default — idiom-true + free.

## Gestalt verdict (for W-REFLECT2's `proof:ba-gestalt` roster)

The owned surfaces read as a designed whole in BOTH modes: no flat near-black voids (every route backgrounded), glass transmits (the glass-material rungs + the dock pills read against live fields, no opaque plate between), the token tours show translucency against contrast fields, the dark grid/paper washes read through the card. **Operative-PASS** — W-REFLECT2 consumes these captures + flips the roster verdict; this wave's close FEEDS the roster.

## Captures

22 PNGs at `docs/tranches/BA/audit/visual/W-STAGE-*.png` (6 arm captures + 16 gestalt = 4 routes × 2 modes × 2 viewports). Baselines: `fleet/bg-glass-material-dark.png` (the black plate), `bg-metric-cell-grid-dark.png` (grid invisible), `fd-dock-ov-demos-dark.png` (flat panels).
