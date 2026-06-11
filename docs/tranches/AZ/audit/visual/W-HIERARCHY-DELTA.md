# AZ.W-HIERARCHY — the canonical section-heading rung + the Configurator hierarchy vocabulary · DELTA

<!-- surface-paths: demo/stories/StorySection.vue, demo/stories/StoryPage.vue, demo/stories/dock/overview.vue, demo/stories/navigation/tabs.vue, demo/stories/data/data-table.vue, demo/stories/display/card.vue, src/components/custom/configurator/ConfiguratorLayer.vue, src/components/custom/configurator/ConfiguratorRow.vue, src/styles/configurator.css, src/styles/tokens/offsets-sizing.css -->
<!-- surface-hash: c9a938b5bb52b6a6973e1c5c66fc9c1d006ea6dfa45614d47f66a3ac6400e492 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the ten surface-paths' bytes
     are byte-identical to capture time (sha256 of the "\n"-joined bytes, surfaceHash
     convention). Stamped at the own-surface capture against the live demo on :5199
     with the W-HIERARCHY edits in place. -->

This wave resolves the fleet's D1 hierarchy set (D1-1..D1-5, D1-9, D1-10) + D6-3 at
the CHASSIS, not per-page. The root cause was NAMED: there was no canonical
section-heading rung — story `<h2>`s were hand-rolled across THREE incompatible
patterns, so the eye landed on demo content before the labels that organize it. And
the Configurator controls column read as a flat undifferentiated stack.

## The π readback (the BINDING truth — `tests-visual/hierarchy.spec.ts`)

`getComputedStyle` readback across the five worst-offender routes + the Configurator
specimen, captured live on :5199 (paired-π: `W-HIERARCHY-readback.json`):

| route | section `<h2>` (resolved) | max child `<h3>` |
|---|---|---|
| `/dock/overview` | 11× **20.35px / 600** | — |
| `/dock/layers` | 6× **20.35px / 600** | — |
| `/navigation/tabs` | 9× **20.35px / 600** | 16px (< 20.35 parent ✓) |
| `/display/card` | 7× **20.35px / 600** | 18px (< 20.35 parent ✓) |
| `/data/data-table` | 1× **20.35px / 600** | — |

Every section `<h2>` resolves to the canonical `--type-subheading` (20.4px, √φ) —
NOT the 14px below-body caption, NOT the 25.9px page-title dup. No child `<h3>`
resolves larger than its parent section `<h2>` (the D1-2 inverted-scale guard).

Configurator vocabulary readback:

| register | resolved | guard |
|---|---|---|
| section label (`.configurator-section-label` "Field") | **20.35px / 600** | > row label ✓ |
| row label (ConfiguratorRow "Medium") | 16px / 500 | the secondary rung |
| preset-row block-padding (`.configurator-presets`) | **20px** (10+10) | > body-row ✓ |
| body ConfiguratorRow block-padding | 16px (8+8) | the D6-3 cramped-row floor |

The section label resolves ABOVE the row body rung (the D6-3 register
differentiation); the preset row's resolved block-padding resolves ABOVE a body
`ConfiguratorRow`'s (the D6-3 "preset row tight" defect-alive guard — the SPATIAL
rhythm increased, not merely the token present).

## D1-1 — the canonical section-heading rung (the chassis close)

`<StorySection>` gains a `heading` prop / `#heading` slot rendering a semantic
`<h2 class="text-subheading">` — THE single section-heading register, distinct from
the mono `.section-label` eyebrow caption. The three hand-rolled patterns
(`text-sm font-semibold text-muted-foreground` below-body caption, `text-heading`
page-title dup) are gone from the enrolled set; the bypassing stories migrate onto
`text-subheading`. `proof:hierarchy` asserts the canonical rung is the ONLY
section register in the enrolled set — a bypass re-introduction fails the gate
(closing the V.W4 "canon-on-paper / muddy-in-render" gap the same way
glass-cohesion closed glass-one-model).

## D1-2 — inverted scale (`/navigation/tabs`)

The Vertical demo's panel `<h3>` "Profile" re-rungs from `text-base font-medium`
(16px/500, larger+darker than its old 14px parent) down to `text-small font-semibold`
(16px/600 at this viewport, < the 20.35px parent). Capture:
`W-HIERARCHY-nav-tabs-1280x900.png`.

## D1-3 — same-category inconsistency (Dock)

`/dock/overview` (the `text-sm font-semibold` h2s) joins `/dock/layers` (already
`text-subheading`) on the ONE 20.4px rung — paging within Dock no longer jumps
14px→20.4px page to page. Capture: `W-HIERARCHY-dock-overview-1280x900.png`.

## D1-4 — double-`<h1>` on the hero page (`StoryPage` structural)

`StoryPage`'s chrome `<h1>` now renders on `variant="page"` ONLY. A HERO page's
`<h1>` is its hero card title (the display-register heading); the chrome `<h1>`
would be a duplicate top-level heading in the outline. This is the STRUCTURAL fix;
the hero TITLE display-register upgrade (text-display-3/4) is W-SUFFUSE's D2-1 (the
disjoint-line `StoryPage.vue` edit — this wave's chrome-`<h1>` condition vs.
W-SUFFUSE's hero title rung — sequenced THIS wave first per §4a).

## D1-5 — duplicate titles (`/data/data-table`)

The in-card eyebrow 'Data table' (a dup of the chrome 'DATA · DATA TABLE' eyebrow)
is removed; the card heading 'Repositories' demotes off the page-`<h1>` 25.9px/700
onto the canonical `text-subheading` rung — one clear primary, no two equal-weight
titles. Capture: `W-HIERARCHY-data-datatable-1280x900.png`.

## D1-9 — skipped / non-bold headings (`/display/card`)

The seven top-level section `.section-label` `<p>` eyebrows promote to semantic
`<h2 class="text-subheading">` — closing the skipped h1→h3 level (now h1→h2→h3) and
giving each section a real heading. The `<CardTitle>` `<h3>` instances gain
`font-semibold` so every card `<h3>` reads at a consistent heading weight (fw600),
not the prior mixed fw=400 (CardTitle) / fw=600 (cartoon accents). Capture:
`W-HIERARCHY-display-card-1280x1100.png`.

## D1-10 — wasted-space balance (`/navigation/tabs` Default demo)

The Default demo's `<TabsList>` gains `w-fit` so the inline-flex track shrink-wraps
to its 3 tabs (left-aligned) inside the stretch flex column — no longer adrift in an
~80%-empty full-width gray bar. The `<TabsContent>` panels below stay full-width.

## D6-3 — the Configurator hierarchy vocabulary (the studios inherit it)

THREE NAMED registers, minted ONCE in the Configurator primitive so every studio
(blob, aurora) inherits a vocabulary instead of hand-tuning each:

1. **Section weight** — `--configurator-section-size` (`= var(--type-subheading)`,
   20.4px) + `--configurator-section-weight` (`600`) on a NEW
   `.configurator-section-label` class; `<ConfiguratorLayer>` composes it (off the
   prior flat `text-small font-semibold text-foreground`).
2. **Label register** — section label (`.configurator-section-label`, register 1)
   vs. the ROW label (`ConfiguratorRow`'s `<Label>`, the secondary body rung) vs. the
   mono `--token` sub-label (the tertiary caption). Three rungs: section → row → token.
3. **Control rhythm** — `--configurator-preset-row-weight` (`0.625rem`) +
   `--configurator-preset-row-gap` (`0.5rem`) drive the preset row's SPATIAL rhythm
   (block-padding + chip gap on `.configurator-presets`) — NOT a font-weight (D6-3's
   defect is the CRAMPED preset row). The studios pick a non-`compact` row density so
   the control rows (sliders included) breathe; a dedicated slider-track knob, if
   needed, is NAMED to W-BLOB-STUDIO / the aurora studio's configurator refinement.

The vocabulary lives in `src/styles/configurator.css` (the classes) +
`src/styles/tokens/offsets-sizing.css` (the tokens, beside the existing density
ladder). Proven on the aurora-configurator specimen
(`demo/stories/compositions/configurator.vue`). Capture:
`W-HIERARCHY-configurator-1280x900.png`. W-BLOB-STUDIO + the aurora studio CONSUME
this vocabulary (they cite this wave as their hierarchy dependency — R3-8/R3-10/C6-10).

## Scope fence (named to siblings, not this wave)

D1-6 (switcher-rail inverted hierarchy) → W-DOCK-RAIL; D1-7 (heavy dark slider-range
bars in Settings) → W-SUFFUSE Arm D4; D1-8 (per-section eyebrow hue cycle) →
W-SUFFUSE Arm D3; D2-1 (hero title display-register upgrade) → W-SUFFUSE Arm D2. This
wave is the STRUCTURAL heading-rung canon + the Configurator hierarchy vocabulary ONLY.

## Captures (≥2 viewports × {light,dark} — the own-surface DELTA bar)

The section-rung + the Configurator vocabulary truth at two viewports (desktop 1280,
narrow 600) × {light, dark} on the WebGL-free routes (the dock/card Aurora canvases
ReadPixels-stall the screenshot — those carry a single dpr-2 desktop capture +
`/display/card-1280x1100`):

- `W-HIERARCHY-nav-tabs-{1280x900,600x900}-{light,dark}.png`
- `W-HIERARCHY-data-datatable-{1280x900,600x900}-{light,dark}.png`
- `W-HIERARCHY-configurator-{1280x900,600x900}-{light,dark}.png`
- `W-HIERARCHY-dock-overview-1280x900.png`, `W-HIERARCHY-display-card-1280x1100.png`

The dark configurator capture confirms the section register ("Field" at 20.4px/600
above the row labels) holds mode-robust.

## Gates

- `proof:hierarchy` (born-RED → GREEN, 6/6) — the device-free SOURCE arm.
- `tests-visual/hierarchy.spec.ts` (2/2 passed) — the π getComputedStyle readback (G2);
  the binding truth is the RESOLVED size, not the screenshot.
- `vue-tsc --noEmit` + `npm run build` green; the enrolled routes render console-clean
  (0 story errors over the load+settle window).

## The captured frames (literal filenames, audit/visual/)

- `W-HIERARCHY-configurator-1280x900-dark.png`
- `W-HIERARCHY-configurator-1280x900-light.png`
- `W-HIERARCHY-configurator-1280x900.png`
- `W-HIERARCHY-configurator-600x900-dark.png`
- `W-HIERARCHY-configurator-600x900-light.png`
- `W-HIERARCHY-data-datatable-1280x900-dark.png`
- `W-HIERARCHY-data-datatable-1280x900-light.png`
- `W-HIERARCHY-data-datatable-1280x900.png`
- `W-HIERARCHY-data-datatable-600x900-dark.png`
- `W-HIERARCHY-data-datatable-600x900-light.png`
- `W-HIERARCHY-display-card-1280x1100.png`
- `W-HIERARCHY-dock-overview-1280x900.png`
- `W-HIERARCHY-nav-tabs-1280x900-dark.png`
- `W-HIERARCHY-nav-tabs-1280x900-light.png`
- `W-HIERARCHY-nav-tabs-1280x900.png`
- `W-HIERARCHY-nav-tabs-600x900-dark.png`
- `W-HIERARCHY-nav-tabs-600x900-light.png`
