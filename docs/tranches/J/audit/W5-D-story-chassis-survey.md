# W5.D — Story chassis pattern re-survey at HEAD

Lane D is required to re-survey the actual chassis-pattern repeat at HEAD before migrating, per W0 amendment §F item 8 (the R3 cite list named files that don't exist at HEAD).

## Method

```
rg "rounded-(2xl|card) border .* bg-card .* shadow-cartoon" demo/stories/
```

Each hit is then inspected for chassis-pattern shape per the Lane D criteria:
- opens with `<CreamSurface>` or `<section class="...cream...">`
- includes `<DisplayHero>` or audacious title block
- includes `<FlourishDivider>`
- follows a regular layout grammar

## Pattern survey

| File | Pattern variant | Demonstrating lines | Migration target |
|---|---|---|---|
| `demo/stories/foundations/colors.vue` | **none** (inline content tile) | L106 — viz-tile decorative card inside swatch grid | `<CartoonCard>` (W6 / cartoon-card adoption sweep, NOT StoryChassis) |
| `demo/stories/foundations/typography.vue` | **none** (inline content tile) | L49 — Fourier-glyph signature tile at end of ladder | `<CartoonCard>` |
| `demo/stories/foundations/paper-glass.vue` | **none** (inline content tile) | L249 — paper-grain swatch tile inside grid | `<CartoonCard>` |
| `demo/stories/motion/scroll-type.vue` | **none** (inline content tile) | L71 — scroll-type demo container | `<CartoonCard>` |
| `demo/stories/data/avatar.vue` | **none** (inline content tile) | L81 — avatar-row card | `<CartoonCard>` |
| `demo/stories/data/sortable-list.vue` | **none** (inline content tile) | L100, L130, L164 — three list-frame cards | `<CartoonCard>` |
| `demo/stories/data/timeline.vue` | **none** (inline content tile) | L56 — timeline-frame card | `<CartoonCard>` |
| `demo/stories/data/search.vue` | **none** (inline content tile) | L241, L286 — search demo cards | `<CartoonCard>` |

## Counts

- **rg hits**: 8 files (11 sites total when counting multiple cards per file)
- **Chassis-pattern shape (opens with cream substrate + DisplayHero + FlourishDivider)**: **0**
- **Inline content-tile pattern (decorative card inside content body)**: 8 files / 11 sites
- **Page-level chassis already abstracted to `<StoryPage>`**: 78 of 90 stories at HEAD

## R3-cited primitive existence at HEAD

| Cited primitive | Exists in `src/`? | Notes |
|---|---|---|
| `<CreamSurface>` | **NO** | retired; 0 references in `src/` or `demo/` |
| `<DisplayHero>` | **NO** | retired; 0 references |
| `<FlourishDivider>` | **NO** | retired; 0 references |
| `<StoryPage>` (page-level chassis substitute) | **YES** | `demo/stories/StoryPage.vue` at HEAD; consumed by 78/90 stories |
| `<CartoonCard>` (inline-tile substitute) | **YES** | `src/components/ui/cartoon-card/`; canonical for `rounded-card border bg-card shadow-cartoon` |

## Interpretation

The R3 thesis ("15× chassis pattern → `<StoryChassis>`") was implicitly resolved between R3 authoring and HEAD:

1. Page-level chassis was lifted to `<StoryPage>` (78/90 adoption).
2. The "audacious cream + DisplayHero + FlourishDivider" gestalt the R3 thesis was about no longer exists in the codebase — the three primitives it composed have been retired upstream.
3. The 8 rg hits are not chassis usage; they are inline content tiles (viz swatches, decorative footer cards, list frames). Their canonical substrate is `<CartoonCard>`.

The substrate Lane D was prescribed to ship (`<StoryChassis>` composing `<CreamSurface><DisplayHero><FlourishDivider>`) is therefore not buildable at HEAD — its dependencies don't exist — and would, if ever built, have **zero consumers** at HEAD.

## Hard-gate path

W5.D hard gate (b) requires Step 1+2 only IF chassis-pattern count ≥ 5. Per the survey: **0 chassis-pattern matches**. Step 1+2 do not execute. Path (c) fires: scope-reveal documented, Lane D defers / re-casts. See `W5-D-story-chassis-proof.md` for the deferral rationale and recommended action.
