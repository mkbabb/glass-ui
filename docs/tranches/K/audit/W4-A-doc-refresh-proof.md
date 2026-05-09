# K W4 Lane A — doc refresh proof

**Wave**: K W4 Lane A — comprehensive doc cohort walk.
**Mode**: implementation; isolation shared (Lane B already committed at `8a04a2b`).
**Bounds modified**: `CLAUDE.md`, `README.md`, `DESIGN.md`.
**Bounds out-of-scope** (untouched): `src/`, `demo/`, `package.json`, `scripts/`, `.github/`, other waves' files.

This Lane absorbs all sibling-wave doc updates into a single canonical sweep so Lane B's mid-wave commit doesn't strand W1/W3.A/W6/W7/WP/WV deltas in residual drift.

## Sibling-wave absorption ledger

| Sibling wave | Commit | Substrate change | Doc destination |
|---|---|---|---|
| K W1 | `563b200` | `<HoverPopover>` prop renamed `openDelay` → `hoverOpenDelay` (Option B clean break per K invariant 1) | DESIGN.md `## Component Catalog → Key component specs → HoverPopover` (rationale paragraph); CLAUDE.md custom/ tree note; README.md custom/ tree note + `<HoverPopover>` example |
| K W3 Lane A | `76fff65` | `cssVar()` retired; `src/composables/utils/` directory deleted; BouncyToggle inlines a 5-line `readToken` helper. `useTokenColor` (v0.8.4) supersedes for reactive use. Plus `@utility overlay-scrim` block formally deleted from `utilities.css` | DESIGN.md `### Composables` updated — `cssVar` retire bullet + `useTokenColor` supersede note; CLAUDE.md `useTokenColor.ts` line cites the supersede |
| K W6 (HEADLINE) | `154d1d2` | `Button variant="primary-audacious"` ships + `@utility btn-audacious` ships. Phase-color decoupling Option B: canonical recipe binds radial to `--primary`; dock primary tier composes via class-list inclusion AND retains a dock-local extension for `--phase-color` | DESIGN.md `## Buttons → Variants` table row + `#### primary-audacious — K W6 architectural transposition` subsection; DESIGN.md `### Semantic variant (intent)` enum updated; CLAUDE.md `Button variants:` line + recipe note; README.md feature line + example |
| K W7 | `2197596` | Configurator P0 fix (`activeKey` made reactive); `<Slider>`-in-`<GlassDock>` contract demo at `demo/stories/compositions/dock-with-slider.vue`; Slider-only contract per Option B (`<NumberField>` NOT a consumer) | DESIGN.md NEW `## Configurator` section (family + P0 absorb + aurora Option-B-with-rationale); DESIGN.md NEW `### Slider keep-dock-open contract` subsection (replaces the prior 1-line note); CLAUDE.md `### Slider keep-dock-open contract` subsection |
| K WP | `8ec320b` | `Skeleton.vue` shimmer migrated from `background-position` to compositor-friendly `transform: translateX(...)` `::after` overlay (Lighthouse P1-4) | DESIGN.md `## Component Catalog → Skeleton` paragraph rewritten to document the migration |
| K WV | `14266b5` | V-tranche post-hoc plan-folder write-up. Documents 11 V-tranche primitives (`<Section>`, `<MetricPill>`, `<ModalOverlay>`, `<LabeledField>`, `menuItemVariants` CVA, `containerName` prop on GlassDock, plus 5 demo chassis: `<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`, `useStoryDemo`) + 23 v0.9.0 composables | CLAUDE.md `## Structure` file-tree fully rewalked (44 ui packages + `_shared` + 30 custom dirs / 28 public + 23 composables enumerated); CLAUDE.md `## Demo storybook chassis (demo-private)` section added; DESIGN.md `### UI primitives` + `### Custom composites` lists rewalked; DESIGN.md `### Composables` enumeration rewritten to list all 23 |

## CLAUDE.md drift items walked

| Section | Before | After |
|---|---|---|
| `## Build` | typecheck only | adds `npm run profile:budget` + comment citing K W4 Lane B re-land |
| `src/components/ui/` file-tree | listed 39 packages; missing `_shared`, `cartoon-card`, `metric-pill`, `scroll-pane`, `section`; called out 39 with no V-tranche notes | enumerates 44 packages + `_shared`; adds V-tranche citations on `_shared`, `metric-pill`, `section`, `notification` (V.W2 status-color foreground), `skeleton` (K WP); cites `primary-audacious` on `button/`; cites `keepDockOpen` contract on `slider/`; barrel comment updated |
| `src/components/custom/` file-tree | listed 26 dirs / 24 public; missing aurora, configurator, confirm-dialog, disco-glyph, dock-group, expandable-container, glyph-face, hover-popover, icon-tooltip, instrument-chassis, labeled-field, metric-badge, paper-backdrop, pulse, scrolling-text, stacked-icons, status-dot, tabs, timeline, typewriter — multiple omissions; still listed `DockPopover.vue` (retired in J.W3) | enumerates 30 dirs / 28 public; `DockPopover.vue` removed; adds dock subcomponent list (`DockTabButton.vue` + `DockSelectTrigger.vue` + `DockDropdownTrigger.vue` + `DockIconButton.vue` + `composables/`); each custom package documented with V/K commit citation where relevant |
| `src/composables/` file-tree | listed 8 entries (most v0.7.x); missing v0.8.4 promotions (`useTokenColor`, `useStagger`, `useAnimatedNumberMap`); listed `cssVar()` indirectly through `composables/utils/`; missed `useStoryDemo`, `useInterval`, `useResizeObserver` | enumerates 23 v0.9.0 composables across 6 sub-trees + 8 top-level files; `useTokenColor`, `useStagger`, `useAnimatedNumberMap` first-class billing; cites K W3.A retire of `cssVar` |
| `src/styles/` file-tree | listed 11 files; missing `dock-group.css`, `disco-glyph.css`, `glyph-face.css`, `hover-popover.css`, `instrument-chassis.css`, `paper.css` | enumerates all 17 current files + recipe annotations (`btn-audacious` cited on `utilities.css`; `sparkle-sweep` cited on `animations.css`) |
| `## Subpath surface` | absent | NEW section enumerating active subpath exports per `package.json` (29 subpaths); names `/configurator`, `/hover-popover`, `/aurora`, `/dock`, etc.; cites K WS additive split |
| `## Design Axes` | absent | NEW section binding J invariant 10 (visual-load-bearing-ness) + K invariant 3 (no shadow execution) + K W0 hardened agent git clause |
| `## Component architecture → Button variants` | listed 8 variants; missing `primary-audacious`, `accent`, `glass-wash`, `ai`; out-of-date scale token | enumerates 11 variants incl. `primary-audacious`; recipe-extraction + Option B note added |
| `## Component architecture → Slider keep-dock-open contract` | absent | NEW subsection documenting the bidirectional pointer-anchored contract + Option B Slider-only |
| `## Demo storybook chassis (demo-private)` | absent | NEW section enumerating 5 chassis primitives + `useStoryDemo` |
| `## Consumer wiring` | example used retired `--glass-opacity-subtle` token | example uses canonical `--glass-opacity-resting` (5-rung ladder); imports include configurator subpath |
| `## Dependencies` | listed 7 deps | enumerates 11 deps including `embla-carousel-vue`, `lucide-vue-next`, `vaul-vue`, `@mkbabb/keyframes.js`; notes `clsx` replaces tailwind-merge as of v0.9.2 |

## README.md drift items walked

| Section | Before | After |
|---|---|---|
| `## Features` | listed 32 shadcn-vue components; described 4-tier glassmorphism; listed only `useDockState` + 4 composables | reflects 44 ui + 28 custom; 5-tier glass ladder (wash/quiet/resting/floating/overlay); 23 public composables enumerated; calls out `primary-audacious` + `@utility btn-audacious` + bundle-budget gate |
| `## Usage` | imports listed 4 paths | imports updated to include `Configurator`, `useConfiguratorState`, `HoverPopover`; adds Vue example using `hoverOpenDelay` + `<Button variant="primary-audacious">` |
| `## Storybook` | mentioned configurator briefly | reference unchanged in essence — minor copy edits |
| `## Structure` | tree listed 32 ui dirs and ~3 custom packages with retired naming | tree enumerates 44 + `_shared` ui packages and 28 custom packages; `_shared` listed; section/cartoon-card/scroll-pane/metric-pill listed; configurator + hover-popover + scrolling-text listed; composables tree enumerates all 23 |
| `## Subpath imports` | absent | NEW section listing subpath imports for dock, controls, aurora, configurator, hover-popover, instrument-chassis, sidebar, glass-carousel, scrolling-text |
| `## Glass Token System` | 4-tier table | rewritten to 5-tier table (wash/quiet/resting/floating/overlay) with current opacity / blur values |
| `## Design Tokens` | duration listed 6 stops; surface-tint absent; glass tier counts wrong | duration 8 stops + shimmer offsets; surface-tint 9-rung family + tier aliases listed; glass 5-rung tokens; status families listed |
| `## Typography` | matches HEAD | unchanged (already aligned) |
| `## Conventions` | scale-press constant inline | uses `var(--scale-press-btn)` token |
| `## Dependencies` | listed 7 deps | enumerates 11 deps + clsx/tailwind-merge note |

## DESIGN.md drift items walked

| Section | Before | After |
|---|---|---|
| `### Variants` (Buttons) | 10-row variant table; `danger-subtle` mentioned as retired-with-rationale | 11-row table including `primary-audacious`; `danger-subtle` historical mention removed (V/K substrate has no consumer for it; the line is stale clutter) |
| `#### primary-audacious — K W6 architectural transposition` | absent | NEW subsection: disco-grain + sparkle-sweep + specular-highlight composite + tokens consumed + Option B phase-color decoupling decision + dock primary tier class-list inclusion |
| `### Semantic variant (intent)` enum | listed 10 variants; `danger-subtle retired` clause | enum updated to include `primary-audacious`; `danger-subtle` clause replaced with cross-reference to the new `primary-audacious` subsection |
| `### Layer transitions` (Dock) | 3-line layer transitions only | adds `### Orientation` subsection (horizontal | vertical, axis-aware FLIP) + `### Multi-layer composition` subsection (DockLayerGroup + DockLayer with vue example) |
| `### Slider keep-dock-open contract` | 1-line note ("`<Slider>` also exposes `keepDockOpen`...") | rewritten as a numbered 4-step contract (acquire / release / visual binding / substrate response) + cross-substrate proof story citation + Option B Slider-only rationale (NumberField NOT a consumer) |
| `## Configurator` (after Variant Taxonomy) | absent | NEW section: 4 primitives + `useConfiguratorState`; ≥ 2 consumers cited (metaballs + primitive story); K W7 P0 absorb (`activeKey` reactive + colorDraft loop break); aurora `useAuroraStudio` parallel implementation as Option-B-with-rationale (per-preset clone semantics; deferred to L) |
| `## Component Catalog → Key component specs → Skeleton` | "`background-size: 200% 100%`, 1.5 s linear loop" | rewritten to document compositor-friendly `transform: translateX(-100% → 100%)` `::after` overlay + `will-change: transform` + Lighthouse P1-4 absorption |
| `## Component Catalog → Key component specs → HoverPopover` | "`<HoverPopover content="..." :side :align>`. ... 250 ms open / 150 ms defer-on-leave timer." | adds `:hover-open-delay="250"` + `:close-delay="150"` to the example signature; adds rationale paragraph for the K W1 rename (specialised hover-popover semantics vs reka-ui's generic `open-delay`) |
| `### UI primitives (`src/components/ui/`)` list | 40 entries listed (mixed canonical + retired); `scroll-area` listed (no longer present) | rewalked: 44 entries + `_shared` (with V.W3 citation); `scroll-area` removed; `cartoon-card` + `metric-pill` + `section` + `scroll-pane` added |
| `### Custom composites (`src/components/custom/`)` list | listed ~22 entries; `DockPopover` retired-with-rationale clause; missing several V/K composites | 28 entries listed; `DockPopover` clause removed; adds `disco-glyph`, `dock-group`, `glyph-face`, `hover-popover`, `instrument-chassis`, `labeled-field`, `paper-backdrop`, `pulse`, `scrolling-text`, `status-dot`, plus DockTabButton in the dock parenthetical |
| `### Composables (`src/composables/`)` block | 4-paragraph prose enumerating ~10 composables | rewritten: 6-tree organisation enumerating all 23 v0.9.0 composables; v0.8.4 promotion subsection; `useStoryDemo` paragraph; `cssVar` retire paragraph |

## Final rg verification

```
$ rg "DockPopover|danger-subtle|cssVar\(" CLAUDE.md README.md DESIGN.md
(no hits)

$ rg "openDelay" README.md DESIGN.md
(no hits)

$ rg -c "hoverOpenDelay|primary-audacious" CLAUDE.md README.md DESIGN.md
DESIGN.md:5
README.md:4
CLAUDE.md:4
```

All gates pass:
- Retired references (`DockPopover`, `danger-subtle`, `cssVar()` literal) → 0 hits.
- `openDelay` literal → 0 hits in README.md / DESIGN.md (rename absorbed; rationale paragraph reframed to avoid the literal token).
- `hoverOpenDelay` + `primary-audacious` → ≥ 1 hit each in DESIGN.md (5 total) ✓; ≥ 1 hit each in CLAUDE.md (4 total) ✓; ≥ 1 hit each in README.md (4 total) ✓.

## typecheck

```
$ npm run typecheck

> @mkbabb/glass-ui@0.9.3 typecheck
> vue-tsc --noEmit

(exit 0; no output)
```

Green — sanity-only since this Lane is docs-only.

## Bounds compliance

- MODIFIED: `CLAUDE.md`, `README.md`, `DESIGN.md`.
- CREATED: `docs/tranches/K/audit/W4-A-doc-refresh-proof.md` (this file).
- UNTOUCHED: `src/`, `demo/`, `package.json`, `scripts/`, `.github/`, other waves' files (verified via repo-state inspection).

## Git compliance

No mutating git invoked during this Lane. Read-only operations only (`git log`, `git show --stat`) for sibling-wave commit verification, per K W0 hardened agent git clause.

## Coordinated WS dispatch note

WS dispatched in parallel; bounds disjoint (WS writes `package.json` `exports` map + per-package barrels under `src/`, plus `CHANGELOG.md` and a DESIGN.md "Subpath surface" section). At W4-A walk time, `package.json` already declared 29 subpath exports (incl. `/configurator`, `/hover-popover`, etc.); the CLAUDE.md "Subpath surface" section was authored against this current state and references the K WS additive split for the v0.9.3 vueuse-FREE root-barrel work. If WS lands a parallel "Subpath surface" section in DESIGN.md, the orchestrator-side merge will need to reconcile (this Lane did NOT add a DESIGN.md "Subpath surface" section — left that to WS to author against its own canonical inventory).
