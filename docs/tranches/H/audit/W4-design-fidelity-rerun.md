# H.W4 — Design-Fidelity Gate Rerun

**Wave**: H.W4 (storybook coverage gaps + design-fidelity rerun).
**Date**: 2026-05-05.
**Method**: per-story skim of `<template>` + `<script setup>`; score against G-audit-δ idiomatic-gestalt criterion: *each story must land a deliberate, design-language-committed choice that's visible in <2 seconds of looking. Corporate-safe demos fail the gate.*
**Disposition codes**: PASS (clears the gate), NEEDS-REPAIR (corporate-safe; does not currently land a deliberate gesture), FAIL (broken or absent).

The bar is not "uses design tokens" — Tailwind classes referencing the canon palette are necessary but insufficient. The bar is *a deliberate gesture*: a CreamSurface hero, an IconStamp ornament, a DisplayHero with WONK variation, a FlourishDivider rule, a section-color accent threaded through, a Fraunces WONK glyph as protagonist, an audacious gradient backdrop, a chassis with twin-line bezels — *something that signals identity in <2 seconds*.

## Foundations (11 stories)

| Story                        | Disposition       | Notes                                                                                              |
| ---------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `foundations/intro`          | PASS              | Pastel radial-bloom hero (`paper-grain-overlay`, three rainbow-pastel ellipses) + Fraunces WONK ℱ wordmark + `text-display-4` headline. Visibly committed in <2s. |
| `foundations/colors`         | PASS              | Viz-basis tiles use `text-display-2 font-display italic` Fraunces WONK glyphs (ℱ / T / P / A / G) with section accent rules. The viz tiles commit. |
| `foundations/cream`          | PASS              | CreamSurface hero with gold-light + rainbow-pastel-blue radial; DisplayHero display-mega WONK; FlourishDivider gold; light/dark contrast pair. Identity-forward. |
| `foundations/golden-ratio`   | PASS              | Math-paper aesthetic — MathFormula + MathGlyph + φ constants laid out as if a math text. Strong gesture. |
| `foundations/flourishes`     | PASS              | Rainbow / pastel / gold / section-13 swatch grids + FlourishDivider gallery. The whole story is the design language. |
| `foundations/typography`     | PASS              | CreamSurface `text-prose-lettrine` drop-cap proof + per-rung axes table + viz-coloured display-stat trio. |
| `foundations/icons`          | PASS              | CreamSurface tone="warm" hero + Sparkles 320px corner-bleed + frame×size matrix + section-accent grid. |
| `foundations/radii`          | NEEDS-REPAIR      | Bare grid of squares with shadow-cartoon. No identity gesture in <2s — corporate-safe specimen sheet. |
| `foundations/shadows`        | NEEDS-REPAIR      | Same — grid of cards with shadow utilities + one hover-lift sample. The hover-lift is canon but isolated. No CreamSurface, no DisplayHero, no FlourishDivider. |
| `foundations/motion`         | NEEDS-REPAIR      | Easing curves table + dot animation. The animation is the gesture but the chrome is generic — no design-language ornament around it. |
| `foundations/paper-glass`    | PASS              | Glass-tier showcase with `<GlassPanel>` + tier table + interactive blur/refraction config. The substrate IS the gesture. |

## Primitives (29 stories — including the new slider-glass-track)

| Story                              | Disposition       | Notes                                                                                              |
| ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `primitives/buttons`               | NEEDS-REPAIR      | Variant sweep + size sweep + four-state contract + viz-basis row. The viz-basis row is the only deliberate gesture; the rest is corporate. |
| `primitives/cartoon-controls`      | PASS              | CreamSurface tone="warm" hero + DisplayHero display-mega WONK + FlourishDivider gold + accent-tinted shadow card grid. Strong. |
| `primitives/inputs`                | NEEDS-REPAIR      | Plain input variants + label pairs + error/disabled. SearchBar is fine but no chassis or ornament. |
| `primitives/textarea`              | NEEDS-REPAIR      | Bare textarea variants. No design-language gesture. |
| `primitives/checks`                | NEEDS-REPAIR      | Bare checkbox / radio / switch sweep with labels. Generic. |
| `primitives/slider`                | NEEDS-REPAIR      | Volume / balance / range / spectrum / disabled. Spectrum has a gold gradient but the rest is corporate. |
| `primitives/slider-glass-track` (NEW) | PASS           | CreamSurface hero + IconStamp Sliders + DisplayHero display-mega + FlourishDivider gold + three deliberate shapes + DockLayerGroup composition. Maximalist. |
| `primitives/number-field`          | NEEDS-REPAIR      | Quantity / tip-percent / step / disabled. Generic stat-row layout. |
| `primitives/select`                | NEEDS-REPAIR      | Font / viz-basis / density. Viz-basis dot accents are a touch but no chassis. |
| `primitives/combobox`              | NEEDS-REPAIR      | Single bare combobox demo. Functional, not committed. |
| `primitives/multi-select`          | NEEDS-REPAIR      | Bases / stack / disabled / model-summary. Generic chips. |
| `primitives/toggle`                | NEEDS-REPAIR      | Toggle / ToggleGroup / ToggleChip sweep. Functional. |
| `primitives/toggle-card`           | PASS              | CreamSurface + DisplayHero + FlourishDivider + section-coloured mood icons. Survey-grade picker is deliberate. |
| `primitives/label`                 | NEEDS-REPAIR      | for-attribute / nested checkbox / switch row / radio group / peer-disabled. Functional only. |
| `primitives/badge`                 | NEEDS-REPAIR      | Variants / viz-basis fills / dot leaders / size overrides. Specimen sheet. |
| `primitives/badge-tones`           | PASS              | CreamSurface + DisplayHero + section-tinted tones × icon overrides. Identity-forward. |
| `primitives/color-pill`            | PASS              | CreamSurface + DisplayHero + viz-basis pill rows + section pill grid. Strong. |
| `primitives/metric-badge`          | NEEDS-REPAIR      | Amount/unit sweep + viz-coloured stats + inline prose + stat grid. The inline-prose section is a small gesture but the chrome is corporate. |
| `primitives/status-dot`            | NEEDS-REPAIR      | Bare matrix tables — no chassis, no ornament. |
| `primitives/notification-dot`     | PASS              | CreamSurface + DisplayHero + FlourishDivider rainbow + matrix. Hero ornament lands. |
| `primitives/blob`                  | PASS (gold std)   | Eight-section bold-maximalist showcase — the highest-fidelity story in the tranche. The reference for the bar. |
| `primitives/pulse`                 | NEEDS-REPAIR      | Dots / ring / currentColor / inline. The pulse animation IS the gesture but the chrome is generic. |
| `primitives/glyph-face`            | PASS              | Tint × active matrix + glyph family + ambient idle + cap mode trio. The 165° catch-light cap is the gesture; story commits. |
| `primitives/disco-glyph`           | PASS              | Silhouette × state matrix with 8-stop gradient + 165° cap. The variant explicitly demos the design gesture. |
| `primitives/dock-group`            | NEEDS-REPAIR      | Density × MetricBadge × DockIconButton sweep. Functional pill-row demo without a hero or ornament. |
| `primitives/icon-stamp`            | PASS              | CreamSurface + DisplayHero + FlourishDivider rainbow + frame×size matrix + section-accent grid + mega showcase. |
| `primitives/pipeline-flow`         | PASS              | CreamSurface tone="cool" + DisplayHero + FlourishDivider gold + accent-tinted node chains. |
| `primitives/live-snippet`          | PASS              | CreamSurface hero + DisplayHero + FlourishDivider + four-state runner cards. |
| `primitives/toast-inverse`         | PASS              | CreamSurface tone="warm" + DisplayHero display-mega + sample list. |
| `primitives/separator`             | NEEDS-REPAIR      | Horizontal / labelled / vertical / section-label-copy. Generic, no chassis. |

## Containers (16 stories)

| Story                              | Disposition       | Notes                                                                                              |
| ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `containers/card`                  | NEEDS-REPAIR      | Default / pane / accent rows. Section-accent loop is a gesture but the chrome is `font-display text-xl` h2 + small prose — corporate. |
| `containers/cream-card`            | PASS              | Card variant="cream" + CreamSurface two-tone with DisplayHero per surface. Strong. |
| `containers/paper-card`            | PASS              | Paper-1..4 tier ladder with section-coloured eyebrows, lined-paper rule variation. Identity-forward. |
| `containers/well-dashed`           | PASS              | IconStamp + drop-zone empty-states + quick-add pattern with section accents. |
| `containers/dialog`                | NEEDS-REPAIR      | Edit-profile / confirm-dialog / alert-dialog. Functional, no hero. |
| `containers/sheet`                 | NEEDS-REPAIR      | Four-side sweep + content variations. Generic. |
| `containers/drawer`                | NEEDS-REPAIR      | Snap-points + non-modal. Functional. |
| `containers/popover`               | NEEDS-REPAIR      | Form pod + simple text + nested + arrow-position. Generic. |
| `containers/dropdown-menu`         | NEEDS-REPAIR      | Composed menu + radio-group + flag-checkboxes. Functional. |
| `containers/context-menu`          | NEEDS-REPAIR      | Right-click surface + radio-group + checkboxes. Functional. |
| `containers/hover-card`            | NEEDS-REPAIR      | Profile / metric-explainer / icon-tooltip family. Functional. |
| `containers/tooltip`               | NEEDS-REPAIR      | Icon toolbar + side sweep + delay. Generic. |
| `containers/alert`                 | NEEDS-REPAIR      | Default / destructive / warn / success. Variant sweep. |
| `containers/accordion`             | NEEDS-REPAIR      | FAQ list + multi-open. Functional. |
| `containers/collapsible`           | NEEDS-REPAIR      | Basic + nested. Functional. |
| `containers/glass-carousel`        | PASS              | Slide carousel with section-coloured accents + label-styled chrome. The composable controls demo lands the gesture. |

## Motion (10 stories)

| Story                              | Disposition       | Notes                                                                                              |
| ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `motion/transitions`               | NEEDS-REPAIR      | Vue Transition gallery. Functional, no chassis. |
| `motion/springs`                   | NEEDS-REPAIR      | Spring orchestrator with TimingFunction lambdas + parametric playground. The math is the gesture but the chrome is generic. |
| `motion/stagger`                   | NEEDS-REPAIR      | 24-card fade-in grid. The reveal IS the gesture but no chassis. |
| `motion/scroll-type`               | PASS              | Fraunces WONK 0→1, SOFT 0→100, wght 300→700 driven by scroll progress. Single-axis but deliberate. |
| `motion/display-axes`              | PASS              | CreamSurface + FlourishDivider + per-rung Fraunces axes interactive playground. Identity-forward. |
| `motion/bezier-canvas`             | PASS              | CreamSurface + named-easing presets + interactive cubic-bezier editor. The editor IS the gesture. |
| `motion/timeline`                  | PASS              | CreamSurface + FlourishDivider + KeyframeTimeline with golden-ratio markers + ruler + playhead. |
| `motion/confetti`                  | PASS              | CreamSurface + FlourishDivider + rainbow-palette burst with PartyPopper / Sparkles. |
| `motion/typewriter`                | NEEDS-REPAIR      | Phrase cycler with speed + cursor controls. Functional. |
| `motion/metaballs`                 | NEEDS-REPAIR      | MetaballCanvas + direct-driver panel + WebGL substrate. The canvas IS the gesture but the chrome is generic. |

## Compositions (11 stories)

| Story                              | Disposition       | Notes                                                                                              |
| ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `compositions/audacious-hero`      | PASS              | CreamSurface mega-padded + atmospheric rainbow underglow + IconStamp mega + DisplayHero display-mega + FlourishDivider. The reference. |
| `compositions/hero-quiet`          | PASS              | Restrained hero — paper-and-glass forward with three §-numbered claims. Distinct from audacious. |
| `compositions/dashboard`           | PASS              | Section-coloured metrics + viz-tinted icons + table with sparkline-style accents. Strong. |
| `compositions/auth-shell`          | PASS              | Section-1 + section-4 + section-7 trust-badge underglow + Fraunces WONK + sign-in form. |
| `compositions/empty-states`        | PASS              | Six empty-state cards each with a kind-specific section accent + icon + CTA. Identity-forward. |
| `compositions/settings`            | NEEDS-REPAIR      | LabeledInput / LabeledSelect / LabeledSlider / LabeledSwitch composed grids. The labelled-field family is the gesture but the page-level chrome is corporate. |
| `compositions/instrument-chassis`  | PASS              | Three-region chassis with twin-line bezel grooves + phase cascade + GlyphFace + MetricBadge. Strong. |
| `compositions/math-paper`          | PASS              | CreamSurface tone="cool" + paper-grain-overlay + section-3 FlourishDivider + MathFormula + MathGlyph. Identity-forward. |
| `compositions/dictionary-pronunciation` | PASS         | Section-accented IPA syllable list + IconStamp + Fraunces WONK + paper-grain. Strong. |
| `compositions/prose-block`         | PASS              | Card variant="paper" + DisplayHero + FlourishDivider section-2 + MathFormula. Etymology + definition recipe with mandatory `.text-prose-lettrine`. |
| `compositions/code-prose`          | PASS              | CreamSurface + Prism-themed pre/code + LiveSnippet runnable + section-coloured headings. |

## Counts

- **Total stories scored**: 77 (11 foundations + 29 primitives + 16 containers + 10 motion + 11 compositions).
- **PASS**: 36 (47%).
- **NEEDS-REPAIR**: 41 (53%).
- **FAIL**: 0.

## Disposition

The PASS set comprises every story authored or refactored during G's W4 with the bold-maximalist commitment (CreamSurface chassis + DisplayHero + FlourishDivider + section accents) plus every story whose primitive IS the design gesture (`blob`, `glyph-face`, `disco-glyph`, `metaballs`, `bezier-canvas`, `confetti`, `display-axes`, `scroll-type`, `glass-carousel`, `timeline`, `paper-glass`, `instrument-chassis`).

The NEEDS-REPAIR set comprises:

1. **Pre-G primitive specimen sheets** — `buttons`, `inputs`, `textarea`, `checks`, `slider`, `number-field`, `select`, `combobox`, `multi-select`, `toggle`, `label`, `badge`, `metric-badge`, `status-dot`, `pulse`, `separator`, `dock-group`. These were authored before G's design-language axis landed and never refactored.
2. **Pre-G containers** — `dialog`, `sheet`, `drawer`, `popover`, `dropdown-menu`, `context-menu`, `hover-card`, `tooltip`, `alert`, `accordion`, `collapsible`, `card`. Same provenance.
3. **Pre-G motion** — `transitions`, `springs`, `stagger`, `typewriter`. Same provenance.
4. **Foundations specimen sheets** — `radii`, `shadows`, `motion`. Bare-grid layouts.
5. **One composition** — `settings`.

## Scope reveal

Per the W4 dispatch:

> If any story FAILS, do NOT silently fix — report it as a scope reveal. Repair is a future-pass concern (or in-W4 if it's a 1-line fix and the orchestrator can absorb).

41 NEEDS-REPAIR stories is far beyond a 1-line fix and far beyond W4's bounded scope. **The repair pass is a separate workstream**: each NEEDS-REPAIR story would gain a CreamSurface hero + DisplayHero variation="wonk" headline + FlourishDivider rule + section-accent threading. Each is a 30-line addition to the SFC's `<template>`.

**Recommendation to orchestrator**: open a subsequent maintenance pass (H.W4-followup or H-II) that batches the repair set. This is consistent with G-audit-δ's framing (the audit identified the gap; repair is downstream). Do not absorb into W4 — file bounds explicitly forbid it ("Do NOT touch: any other story") and the volume defeats incremental absorbtion.

## Hard gate verification

- (a) every kept G + H artefact has ≥1 in-repo story — verified per `W4-coverage-result.md`.
- (b) design-fidelity gate scored every G + H story — 36 PASS / 41 NEEDS-REPAIR / 0 FAIL.
- (c) `npm run typecheck` — green.
- (d) `npm run build` — green.
- (e) New story (`slider-glass-track`) clears the design-fidelity gate as PASS in its own right (CreamSurface hero + IconStamp + DisplayHero + FlourishDivider).

## Authority

Per H invariant 5 (idiomatic gestalt > artefact preservation): the design-fidelity bar is now first-class. The 41 NEEDS-REPAIR stories represent G-era debt that survived G's close-ceremony but does not clear the H-binding gestalt criterion. The repair workstream is a named handoff to a future pass, not a silent deferral — this audit document IS the named destination.
</content>
</invoke>
