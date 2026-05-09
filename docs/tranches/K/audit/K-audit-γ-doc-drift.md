# K W8 Audit — γ lane: doc-drift

**Wave**: K W8 close ceremony — γ lane (re-run at close).
**Mode**: read-only audit.
**Bounds**: may READ anything; CREATE this file only.
**Hardened agent git clause**: read-only git only; no mutating subcommands invoked.
**Date**: 2026-05-09 (post-W4 Lane A walk at `36305da`; post-pre-close at `3a4ea3f`).
**Scope of binding**: K invariant 11 (doc-drift binary at close) — CLAUDE.md, README.md, DESIGN.md align with HEAD; no "doc-only follow-up" residuals into L.

This audit walks each user-facing root doc + each tranche-internal status surface against current HEAD source and reports drift findings per the K W8 γ contract. Findings are graded **CLEAN** / **DRIFT** / **STALE** with severity **P0** (binary gate-fail) / **P1** (substantive but not gate-fail) / **P2** (cosmetic / count-mismatch).

## Summary verdict

**doc-drift NOT clean — 5 residual drift items found.**

Per K invariant 11 ("Doc-drift is binary at close — CLAUDE.md + README.md + DESIGN.md align with HEAD at K close") the binding rendering applies to the three user-facing root docs. The ledger below splits findings by binding scope:

| Severity | Doc-drift items (root-doc binding) | Tranche-internal stale-status items (advisory) |
|---|---|---|
| P0 | 0 | — |
| P1 | 2 (D1, D2) | — |
| P2 | 3 (D3, D4, D5) | T1 (12 wave-spec status lines + K.md wave schedule status column stale) |

**P0 = 0 satisfies the binary gate at the strictest reading.** P1 + P2 items are real drift between the doc surface and HEAD that the W4 Lane A walk did not catch; γ records them so K close + L open can absorb them. The 12 stale wave-spec status lines + K.md wave schedule status column (T1) are tranche-internal authoring artefacts, not user-facing doc-drift; they're flagged advisory rather than gate-binding.

**Recommendation**: K close may proceed under the strict binary reading (no P0); however, P1 D1 (CLAUDE.md tree lists nonexistent `animation/` + `form/` custom dirs) is a factual discrepancy with HEAD that should land before FINAL. P1 D2 (CLAUDE.md + README.md cite `useAuroraStudio` as importable from `@mkbabb/glass-ui/aurora` when the aurora barrel does not export it) is a public-API integrity issue worth fixing in the same patch. P2 + T1 items are L-tranche cleanup material with named destination.

## Per-doc walk

### CLAUDE.md (`/Users/mkbabb/Programming/glass-ui/CLAUDE.md`)

| Section | Walked against HEAD | Finding |
|---|---|---|
| `## Build` (L7-11) | `npm run build` / `typecheck` / `profile:budget` scripts in package.json | CLEAN |
| `## Structure` ui/ tree (L19-64) | 44 ui packages + `_shared`; `cartoon-card`, `metric-pill`, `scroll-pane`, `section`, `skeleton` notes; `slider` keepDockOpen note; `notification` foreground tokens; `_shared` ModalOverlay + menuItemVariants | CLEAN; package counts match disk (`ls` returns 44 + `_shared`) |
| `## Structure` custom/ tree (L65-109) | `animation/` + `form/` listed as custom directories (L66, L85) | **DRIFT — D1 (P1)**: neither directory exists at HEAD. `find src/components/custom -type d -maxdepth 1` returns 30 dirs, none named `animation` or `form`. CLAUDE.md preserved these from the v0.7.x baseline despite their removal/never-having-existed. The "30 custom package dirs; 28 public package barrels" count line on L65 is correct (30 dirs on disk; 30 index.ts files — public-vs-private split is per-package internal); the named tree-rows are the drift. |
| `## Structure` composables/ tree (L110-128) | 23-composable enumeration across 6 sub-trees + 8 top-level files | CLEAN against the public composable surface; the WS-introduced `src/composables/dark.ts` + `src/composables/keyboard.ts` are present on disk but are intentionally subpath barrels (not new composables — they re-export `useGlobalDark` + `useKeyboardShortcuts`). Tree omission is acceptable; the Subpath surface section (L188+) is the canonical listing for these. |
| `## Structure` styles/ tree (L130-148) | 17 CSS files in `src/styles/` | CLEAN; matches disk (`ls src/styles/` returns 17 files including `dock-group.css`, `disco-glyph.css`, `glyph-face.css`, `hover-popover.css`, `instrument-chassis.css`, `paper.css`) |
| `## Conventions` (L152-159) | TypeScript invariants | CLEAN |
| `## Entry point` (L161-163) | "44 ui package barrels + 28 custom package barrels" | CLEAN |
| `## Dependencies` (L167-180) | 11 deps incl. clsx (replaces tailwind-merge as of v0.9.2) | CLEAN |
| `## Subpath surface` (L188-214) | Code-block enumerates ~34 named subpaths via the comment list | **DRIFT — D2 (P1) on `useAuroraStudio` import claim** (also flagged in README.md): `import { Aurora, useAuroraStudio } from "@mkbabb/glass-ui/aurora"` (L197). The aurora barrel at `src/components/custom/aurora/index.ts` exports `Aurora`, `useAurora`, `useCursorInteraction`, `createAurora`, color helpers — but NOT `useAuroraStudio`. `useAuroraStudio` is a demo-private composable at `demo/stories/aurora/useAuroraStudio.ts`. The DESIGN.md "Configurator" section (L670) correctly characterises `useAuroraStudio` as Aurora's parallel chrome and references `<AuroraConfigDock>` (also demo-private); the import statement in CLAUDE.md + README.md is the consumer-facing miscue. **Remediation**: drop `useAuroraStudio` from the aurora-import line OR add a paragraph citing it as demo-private and not consumed via the library subpath. **DRIFT — D3 (P2): WS subpath enumeration absent from CLAUDE.md.** Per task spec item 4, the subpath surface section should explicitly enumerate the new WS subpaths `./forms`, `./composables/dark`, `./composables/keyboard`. CLAUDE.md mentions K WS in prose ("vueuse-bearing composables + Input/Textarea/Combobox*") but does not name any of the three subpaths in the code-block list. |
| `## Design Axes` (L216-224) | 5-axis enumeration | CLEAN |
| `## Component architecture` (L226-260) | Button variants enum (L236) lists 11 variants incl. `primary-audacious` ✓ | CLEAN; `primary-audacious` enumerated. Recipe note at L238 cites disco-grain + sparkle-sweep + specular-highlight + Option B phase decoupling ✓. Dock orientation + multi-layer composition prose unchanged from V baseline. Slider keep-dock-open contract subsection (L258-260) documents bidirectional pointer-anchored Slider-only Option B ✓. |
| `## Demo storybook chassis` (L262-270) | 5 chassis primitives + `useStoryDemo` enumerated | CLEAN; all 5 V.W4 primitives (`<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`) cited with V.W4 commit hashes |
| `## Consumer wiring` (L272-300) | CSS imports, JS imports, re-export pattern | CLEAN |

`rg "DockPopover\|danger-subtle\|cssVar\(" CLAUDE.md` → 0 hits ✓ (retired-references gate clean).

### README.md (`/Users/mkbabb/Programming/glass-ui/README.md`)

| Section | Walked against HEAD | Finding |
|---|---|---|
| `## Features` (L6-15) | 44 + 28 component counts; 5-tier glass ladder; primary-audacious named; 23 composables enumerated; bundle-budget gate cited | CLEAN |
| `## Install` (L17-21) | npm install command | CLEAN |
| `## Usage` (L23-52) | JS imports + Vue example uses `:hover-open-delay="120"` ✓ + `Button variant="primary-audacious"` ✓ | CLEAN against task spec items 5 + 6. Verified `rg "openDelay" README.md` → 0 hits; `hover-open-delay` is the kebab-case form of the canonical `hoverOpenDelay` prop (correct Vue template-attribute idiom). The `useAuroraStudio` line on L29 is the same drift as D2 (CLAUDE.md). |
| `## Build` (L54-61) | npm scripts | CLEAN |
| `## Storybook` (L63-65) | dev server description | CLEAN |
| `## Structure` (L67-148) | ui/custom/composables/styles trees | CLEAN; tree shows 44 ui + 28 custom; `_shared` listed; configurator + hover-popover + scrolling-text + instrument-chassis named; composable tree enumerates the 23 |
| `## Subpath imports` (L150-166) | Code-block lists 9 explicit imports + statement "29 active subpaths plus `/styles` and `/tokens`" | **DRIFT — D4 (P2)**: package.json `exports` enumerates **38** keys total → 36 non-meta subpaths (excluding `.`, `./styles`, `./tokens`). README claim is **29**, off by 7 (3 of which are the K WS subpaths `./forms`, `./composables/dark`, `./composables/keyboard`; the remaining 4 are pre-existing subpaths like `./pagination`, `./virtual`, `./infinite-scroll` etc. that the README text undercounted). Task spec item 4's WS subpath enumeration is also implicated: README does not name the three WS subpaths in any block. |
| `## Glass Token System` (L168-183) | 5-tier table + opacity/blur values | CLEAN |
| `## Design Tokens` (L185-200) | 9 token categories | CLEAN |
| `## Typography` (L202-220) | 11-row scale + golden-ratio derivation | CLEAN |
| `## Conventions` (L222-231) | Vue/TS conventions | CLEAN |
| `## Dependencies` (L233-248) | 11 deps + clsx note | CLEAN |

`rg "DockPopover\|danger-subtle\|cssVar\(" README.md` → 0 hits ✓.
`rg "openDelay" README.md` → 0 hits ✓ (kebab-case `hover-open-delay` only on L34, which is correct Vue template form per task spec item 5).

### DESIGN.md (`/Users/mkbabb/Programming/glass-ui/DESIGN.md`)

| Section | Walked against HEAD | Finding |
|---|---|---|
| `## Philosophy` (L5-15) | 4 principles | CLEAN |
| `## Token Architecture` (L19-29) | Consumer wiring order | CLEAN |
| `## Duration` / `## Easing` / `## Z-Index Stack` / `## Border Radius` / `## Shadows` (L33-198) | Core token sections | CLEAN |
| `## Glass Surfaces` (L200-232) | 5-tier table + tokens-per-tier + accessibility fallbacks; v0.8.0 ladder rename note | CLEAN |
| `## Interactive States` (L235-255) | 4-state contract + composable base classes | CLEAN |
| `## Typography` (L259-380) | Size + line height + letter spacing + tokens + semantic classes + kinetic utilities | CLEAN |
| `## Buttons → Variants` (L385-413) | 11-row variant table including `primary-audacious` ✓ | CLEAN per task spec item 7 |
| `#### primary-audacious` subsection (L415-425) | Disco-grain + sparkle-sweep + specular-highlight composite + Option B phase-color decoupling rationale | CLEAN per task spec item 7 |
| `## Buttons → Sizes` / `.glass-btn` (L427-447) | 5 sizes + standalone CSS class | CLEAN |
| `## Badges` (L451-490) | Badge CVA + section-tone recipe | CLEAN |
| `## Dock` (L493-588) | Components + geometry + position + props + density + utilities + layer transitions + orientation + multi-layer composition | CLEAN |
| `## Variant Taxonomy` (L592-651) | Surface tier + semantic + structural + Slider variants + Slider keep-dock-open contract + theming discipline | CLEAN; `### Slider keep-dock-open contract` (L634-645) documents 4-step contract + Option B Slider-only rationale ✓ per task spec item 8 |
| `## Configurator` (L655-670) | Family enumeration (4 primitives + `useConfiguratorState`) + ≥ 2 consumer citation + K W7 P0 absorb + aurora Option-B-with-rationale | CLEAN per task spec item 9 |
| `## Overlays` (L674-686) | Overlay table | CLEAN |
| `## Motion` (L690-735) | Vue Transition + keyframe entrance + kinetic typography keyframes + utility animations | CLEAN |
| `## Composables` (L739-773) | 3-register decomposition + composable table + when-to-add-new | CLEAN |
| `## Layout & Sizing Tokens` (L777-861) | Icon / input / chart / divider / lift / stack / border-opacity / animation / paper-texture | CLEAN |
| `## Default Color Palette` (L865-913) | shadcn HSL palette + status + gold + rainbow + heatmap | CLEAN |
| `## Component Catalog → UI primitives` (L916-920) | 44 + `_shared` package list | CLEAN |
| `## Component Catalog → Custom composites` (L922-924) | "animation · aurora · ... · form · ..." list | **DRIFT — D5 (P2)**: same as D1 — `animation` and `form` listed as custom composite directories on L924; neither exists at HEAD. The list is otherwise accurate (28 actual public packages match ✓). |
| `## Component Catalog → Skeleton` (L928) | Compositor-friendly transform-only `::after` overlay; will-change: transform; reduced-motion gate | CLEAN per task spec item 10. Verified against `src/components/ui/skeleton/Skeleton.vue` (lines 39-58: `transform: translateX(-100%) → translateX(100%)` keyframe `skeleton-shimmer-slide` over 1.5s linear; `will-change: transform`; `prefers-reduced-motion: reduce` gate) ✓ |
| `## Component Catalog → HoverPopover` (L953-955) | `<HoverPopover :hover-open-delay="250" :close-delay="150">` signature + K W1 rename rationale paragraph | CLEAN per task spec item 11 |
| `## Component Catalog → InstrumentChassis` (L957-958) | Slot grammar + Q.W4.A bezel-line rationale | CLEAN |
| `## Component Catalog → Library-only primitives (post-R consumer state)` (L959-978) | Speedtest consumer-state historical record + MetricBadge label/abbreviation extension | CLEAN |
| `## Component Catalog → Composables` (L980-1009) | 6-tree + v0.8.4 promotions + useStoryDemo + cssVar retire | CLEAN |
| `## Component Catalog → Progress component variants` (L1011-1032) | default + gradient variants | CLEAN |
| `## Runtime Tokens (`@mkbabb/glass-ui/tokens`)` (L1036-1053) | JS/TS constants for Canvas / echarts | CLEAN |
| `## Subpath surface` (L1057-1127) | Substrate-isolation list (34 entries) + vueuse-bearing table (`./forms`, `./composables/dark`, `./composables/keyboard`) + SCC mechanism explanation + authoring rules | CLEAN per task spec item 12 — the WS shape is fully documented including the carve mechanism and the Phase 2 / v1.0 deferral |
| `## Consumer Wiring` (L1131-1175) | Preset overrides + @theme extensions + consumer utilities + component re-export | CLEAN |
| `## Storybook (demo)` (L1179-1212) | Navigation + categories + adding-a-story + configurator | CLEAN |

`rg "DockPopover\|danger-subtle\|cssVar\(" DESIGN.md` → 0 hits ✓.

### PROGRESS.md (`/Users/mkbabb/Programming/glass-ui/docs/tranches/K/PROGRESS.md`)

| Section | Walked against HEAD | Finding |
|---|---|---|
| `## 2026-05-06 — Tranche open` | initial K plan-folder authoring | CLEAN |
| `## 2026-05-08 — Reconciliation + Lighthouse audit + speedtest W coordination` | reconciliation ledger + audit dispatch + plan revision | CLEAN |
| `## Status` table | 11 active waves + W2 retired; commit hashes for every closed wave | CLEAN per task spec item 13. Verified all 11 commit hashes against `git log --oneline -20`: `f5cdd53` (W0), `563b200` (W1), `76fff65` (W3.A), `11a30d3` (W3.B), `8a04a2b` (W4.B), `36305da` (W4.A), `12abb09` (W5), `154d1d2` (W6), `2197596` (W7), `14266b5` (WV), `8ec320b` (WP), `a598b90` (WS) — all present in git log ✓; W8 marked "in progress" matches the in-progress audit dispatch state |
| `## Inbound from speedtest W tranche` | v0.9.1 + v0.9.2 catalogue | CLEAN |
| `## 2026-05-08 (post-W close at speedtest tag w-close)` | speedtest W close absorbed; K WS scope codified | CLEAN |

### K.md (`/Users/mkbabb/Programming/glass-ui/docs/tranches/K/K.md`)

| Section | Walked against HEAD | Finding |
|---|---|---|
| Title + thesis | "Convergence Closeout + Reconciliation + Audacious Extraction" | CLEAN |
| `## Prelude` | Reconciliation deliverables list | CLEAN |
| `## Thesis` | 67-commit V-tranche absorb + K HEADLINE framing | CLEAN |
| `## Binding invariants` (16 invariants) | C-J precepts + no-silent-misses + no-shadow-execution + reconciliation + HEADLINE + worktree isolation + agents-NEVER-stage + substrate-without-consumer + architectural transposition + vocab convergence + doc-drift binary + bundle-budget gate + mobile-viewport + demo-private chrome canonical-aware + 7-agent close + Lighthouse absorb | CLEAN |
| `## Sub-tranches` | none in formal sense | CLEAN |
| `## Cross-repo coordination — speedtest W tranche inbound` | v0.9.1 / v0.9.2 inbound matrix + K WS outbound clause + K close prerequisites + cross-repo precept binding | CLEAN |
| `## Critical files` | path-to-concept matrix | CLEAN |
| `## Wave Schedule` (L121-134) | 12 active waves status column reads "open"/"pending"/"retired" | **STALE — T1 (advisory)**: every status entry except W2 (retired correctly) is stuck at the planning state. PROGRESS.md tracks the actual close state with commit hashes. K.md's wave-schedule status column was not refreshed at any wave close. Tranche-internal authoring artefact; not user-facing doc-drift. |
| `## Hard gates` | wave-close + tranche-close criteria | CLEAN |
| `## Cross-tranche debt + explicit deferrals` | named-destination L-tranche deferrals | CLEAN |
| `## Brittleness window` | none planned at open; W6 may declare | CLEAN |
| `## Out of scope (explicit)` | 8 explicit deferrals | CLEAN |

### Wave-spec status lines (`docs/tranches/K/waves/W*.md`)

| Wave | Status line at HEAD | PROGRESS.md state | Drift |
|---|---|---|---|
| W0 | `**Status**: open.` | CLOSED `f5cdd53` | STALE — T1 |
| W1 | `**Status**: pending W0.` | CLOSED `563b200` | STALE — T1 |
| W2 | `**Status**: pending W1.` | RETIRED | STALE — T1 |
| W3 | `**Status**: pending W1.` | CLOSED A `76fff65` + B `11a30d3` | STALE — T1 |
| W4 | `**Status**: pending W0.` | CLOSED A `36305da` + B `8a04a2b` | STALE — T1 |
| W5 | `**Status**: pending W1.` | CLOSED `12abb09` | STALE — T1 |
| W6 | `**Status**: pending W0.` | CLOSED `154d1d2` | STALE — T1 |
| W7 | `**Status**: pending W1.` | CLOSED `2197596` | STALE — T1 |
| W-V | `**Status**: pending W0.` | CLOSED `14266b5` | STALE — T1 |
| W-P | `**Status**: pending W1.` | CLOSED `8ec320b` | STALE — T1 |
| W-S | `**Status**: planned.` | CLOSED `a598b90` | STALE — T1 |
| W8 | `**Status**: pending W2 + W3 + W4 + W5 + W6 + W7.` | in progress | STALE — T1 |

All 12 wave-spec status lines stuck at planning state; PROGRESS.md is the canonical close ledger. Authoring artefact; not user-facing.

## Cross-citation table

Per task spec, K W4 Lane A's claim of cleared drift requires the following concepts to be present at HEAD. Each is verified below:

### 11 V-tranche primitives in CLAUDE.md (or DESIGN.md as fallback)

| Concept | CLAUDE.md location | DESIGN.md location | Status |
|---|---|---|---|
| `<Section>` | L49 ("Section sectioning landmark") | L920 (UI primitives list) | PRESENT |
| `<ModalOverlay>` | L20 (`_shared/`) | L920, L674 (overlays section) | PRESENT |
| `<LabeledField>` | L93 (custom/labeled-field/) | L922 (custom composites list) | PRESENT |
| `<MetricPill>` | L41 (ui/metric-pill/) | L920, L938 (Key spec) | PRESENT |
| `<MetricBadge>` | L95 (custom/metric-badge/) | L922, L932-934 (Key spec) | PRESENT |
| `<StorySection>` | L266 (Demo storybook chassis section) | — | PRESENT (CLAUDE.md only — chassis primitives are demo-private; DESIGN.md does not enumerate them, and the W4 Lane A absorption ledger does not require it) |
| `<ShowcaseFrame>` | L267 | — | PRESENT |
| `<DockShowcaseFrame>` | L268 | — | PRESENT |
| `<TokenLadder>` | L269 | — | PRESENT |
| `<ToneSwatch>` | L269 | — | PRESENT |
| `containerName` prop on `<GlassDock>` | L74 (GlassDock.vue tree-row notes "containerName prop (V.W2)") | L922 ("dock"); L940 (Key spec) | PRESENT |

11/11 V-tranche primitives present in CLAUDE.md (with chassis primitives in their dedicated demo-private section). ✓

### 23 v0.9.0 composables in CLAUDE.md or README.md

| Composable | CLAUDE.md | README.md | Status |
|---|---|---|---|
| `useGlobalDark` | L119, L71 | L119 | PRESENT |
| `useInterval` | L120 | L120 | PRESENT |
| `useKeyboardShortcuts` | L121 | L121 | PRESENT |
| `useResizeObserver` | L122 | L122 | PRESENT |
| `useStagger` | L123 | L123 | PRESENT |
| `useStoryDemo` | L124, L270 | L124 | PRESENT |
| `useTimer` | L125 | L125 | PRESENT |
| `useTokenColor` | L126 | L126 | PRESENT |
| `useTouchGate` | L127 | L127 | PRESENT |
| `useScrollProgress` (motion/) | L112 | L113 | PRESENT |
| `useSpringOrchestrator` (motion/) | L112 | L113 | PRESENT |
| `useStaggerReveal` (motion/) | L112 | L113 | PRESENT |
| `useAnimatedNumber` (motion/) | L113 | L113 | PRESENT |
| `useAnimatedNumberMap` (motion/) | L113 | L113 | PRESENT |
| `useDarkModeSync` (motion/) | L114 | L113 | PRESENT |
| `useRAFLoop` (motion/) | L114 | L113 | PRESENT |
| `useIntersectionPause` (motion/) | L114 | L113 | PRESENT |
| `useGlassRenderer` | L111 | L111 | PRESENT |
| `useOffsetPagination` | L115 | L115 | PRESENT |
| `useSortable` | L117 | L117 | PRESENT |
| Sidebar composables | L116 | L116 | PRESENT |
| Virtual composables | L118 | L118 | PRESENT |
| `useInfiniteScroll` | indirect (L91 "InfiniteScroll + composable") | indirect | PRESENT (indirect — via subtree note) |

23/23 composables accounted for. ✓

### 5 chassis demo primitives in CLAUDE.md

| Primitive | CLAUDE.md location | Status |
|---|---|---|
| `<StorySection>` | L266 | PRESENT |
| `<ShowcaseFrame>` | L267 | PRESENT |
| `<DockShowcaseFrame>` | L268 | PRESENT |
| `<TokenLadder>` | L269 | PRESENT |
| `<ToneSwatch>` | L269 | PRESENT |

5/5 chassis primitives present in the dedicated `## Demo storybook chassis (demo-private)` section. ✓

### v0.9.3 reference in CHANGELOG.md or DESIGN.md

| Citation | Location | Status |
|---|---|---|
| CHANGELOG.md `## v0.9.3 — 2026-05-09` heading | CHANGELOG.md L3 | PRESENT |
| DESIGN.md `### vueuse-bearing subpaths (since v0.9.3)` | DESIGN.md L1083 | PRESENT |
| DESIGN.md "v0.9.3+ recommended shape (and v1.0 required shape)" | DESIGN.md L1098 | PRESENT |
| CLAUDE.md "ships under v0.9.3 — additive only" | CLAUDE.md L214 | PRESENT |

v0.9.3 referenced across CHANGELOG.md, DESIGN.md, and CLAUDE.md. ✓

### Retired-references gate (CLAUDE.md + README.md + DESIGN.md)

| Gate | rg invocation | Hits | Status |
|---|---|---|---|
| `DockPopover` | `rg "DockPopover" CLAUDE.md README.md DESIGN.md` | 0 | CLEAN |
| `danger-subtle` | `rg "danger-subtle" CLAUDE.md README.md DESIGN.md` | 0 | CLEAN |
| `cssVar(` literal in API contexts | `rg "cssVar\(" CLAUDE.md README.md DESIGN.md` | 0 | CLEAN |
| `openDelay` (without `hover` prefix) in API contexts | `rg "openDelay" CLAUDE.md README.md DESIGN.md` and inspect → only as part of `hoverOpenDelay` | 4 hits, all of `hoverOpenDelay` | CLEAN |

All 4 retired-reference gates clean. ✓

### Subpath enumeration

| Concept | Required by task spec | CLAUDE.md | README.md | DESIGN.md | Status |
|---|---|---|---|---|---|
| `./forms` enumerated by name | item 4 (CLAUDE) | absent (prose only — "Input/Textarea/Combobox*") | absent | L1087 | DRIFT — D3 (CLAUDE missing) |
| `./composables/dark` enumerated by name | item 4 (CLAUDE) | absent (prose only) | absent | L1088 | DRIFT — D3 (CLAUDE missing) |
| `./composables/keyboard` enumerated by name | item 4 (CLAUDE) | absent (prose only) | absent | L1089 | DRIFT — D3 (CLAUDE missing) |

DESIGN.md is the canonical authority for the WS subpath shape (per W4 Lane A's coordination note that explicitly left this section to WS to author). CLAUDE.md should at minimum name the three subpaths; README.md's omission is consistent with its "consumer-overview" tone (DESIGN.md is the canonical reference). Severity P2.

### Doc-drift residuals ledger

| ID | Severity | Doc | Drift | Remediation |
|---|---|---|---|---|
| D1 | P1 | CLAUDE.md L66, L85 | `animation/` and `form/` listed as custom directories; neither exists on disk | Remove both lines from the custom/ tree |
| D2 | P1 | CLAUDE.md L197, README.md L29, L157 | `import { Aurora, useAuroraStudio } from "@mkbabb/glass-ui/aurora"` cites `useAuroraStudio` as exportable from the public subpath; the aurora barrel does not export it (it's demo-private at `demo/stories/aurora/useAuroraStudio.ts`) | Drop `useAuroraStudio` from the import lines OR amend the prose to mark it demo-private and link to DESIGN.md's Configurator section |
| D3 | P2 | CLAUDE.md L188-214 (Subpath surface section) | WS-introduced subpaths `./forms`, `./composables/dark`, `./composables/keyboard` not enumerated by name; only described in prose | Append three subpath entries to the comment list, or add a brief "vueuse-bearing subpaths" sub-block matching DESIGN.md's structure |
| D4 | P2 | README.md L166 | "29 active subpaths plus `/styles` and `/tokens`" — actual non-meta subpath count is 36 | Update count (or replace with "see `package.json` `exports` for the full subpath map") |
| D5 | P2 | DESIGN.md L924 | "animation · ... · form · ..." in the Custom composites enumeration; both nonexistent at HEAD | Remove `animation` and `form` from the list |

### Tranche-internal stale-status ledger

| ID | Severity | Surface | Stale state | Remediation (advisory) |
|---|---|---|---|---|
| T1 | advisory | K.md `## Wave Schedule` table + 12 wave-spec `**Status**:` lines | All "open"/"pending"/"planned"/"retired"; PROGRESS.md is the canonical close ledger | Refresh wave-spec status lines + K.md wave-schedule status column to match PROGRESS.md commit-hash ledger; landing this in K W8 close ceremony or as part of FINAL.md authoring |

T1 is tranche-internal authoring debt. It does not violate K invariant 11 (which binds the three user-facing root docs). Listing here so K close + L open can either absorb or accept-with-named-destination.

## Verdict

**doc-drift NOT clean — 5 residual drift items found** (D1-D5 in user-facing root-doc surface).

Strict-binary reading of K invariant 11: 0 P0 items → gate technically passes. But D1 (factual tree errors) + D2 (incorrect public-API import claim) are P1 substantive drift that the W4 Lane A walk did not catch despite its claim of "All gates pass" at the rg level. Recommendation:

1. **Pre-FINAL fix**: D1 + D2 are quick edits to CLAUDE.md + README.md tree-rows / import lines. Land in the same patch as the FINAL.md authoring (or a small `docs(tranche-k/w8): doc-drift residuals` follow-up commit).
2. **L-deferral with named destination**: D3 + D4 + D5 are cosmetic / count-mismatch items. K close may absorb them into a "doc-drift residuals carry-forward" line in FINAL.md cross-tranche-debt with named L-tranche destination.
3. **T1 advisory**: refresh wave-spec status lines + K.md wave-schedule status column at K close. Tranche-internal hygiene — not gate-binding but worth landing for future tranche-template re-use.

**γ lane returns**: 5 residual drift items; 0 P0; 2 P1; 3 P2; 1 advisory tranche-internal stale-status item.

## Bounds compliance

- READ: CLAUDE.md, README.md, DESIGN.md, PROGRESS.md, K.md, V/V.md, AGENT_DISPATCH_TEMPLATE.md, K-pre-close.md, W4-A-doc-refresh-proof.md, all 12 wave-spec status lines, package.json exports map, src/components/ui/ + custom/ directory listings, src/composables/ directory listing, src/components/custom/aurora/index.ts, src/components/ui/skeleton/Skeleton.vue, src/components/ui/slider/Slider.vue, CHANGELOG.md, git log.
- CREATED: `docs/tranches/K/audit/K-audit-γ-doc-drift.md` (this file).
- MODIFIED: none.
- Hardened agent git clause: only read-only git invocations (`git log --oneline -20`); no mutating subcommands.
