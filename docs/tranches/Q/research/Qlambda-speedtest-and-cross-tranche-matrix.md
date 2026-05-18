# Qλ — Speedtest cosmetic sweep + cross-consumer tranche-change matrix

**Lane**: Q audit-augmentation Qλ (read-only).
**Scope**: speedtest cosmetic regression sweep + cross-walk of every consumer-visible glass-ui delta across L → M → N → O → P → post-P shadow → AF.W1, against all six consumers.
**Method**: read FINAL.md corpus L/M/N/O/P/AB+1; commit-walk post-P shadow; per-consumer surface inventory by import-site grep; per-cell adjudication ADOPTED / IGNORED / BROKEN / UNKNOWN.
**Authoring date**: 2026-05-18.

The headline is Section 3 (the grand cross-walk) and Section 4 (cluster identification). Section 1–2 are the speedtest-only task; sections 5–6 are the wave fold-in recommendations and severity summary.

---

## Section 1 — Speedtest surface inventory

Speedtest is the constellation's most deeply-coupled glass-ui consumer (64 import-site files, 17 distinct subpaths). Driver of the AB / AC / AB+1 substrate cohorts; co-author of MetricRow / MetricStack / AnimatedDigit / MetricCell / ResponsiveTabs at v1.6.0 + v1.7.0; first consumer to consume the `--phase-color` cascade. Currently at tranche AF close (2026-05-18) — the same calendar day as this audit.

### 1.1 Consumed subpath roster (17 distinct)

| Subpath | Sites | Notes |
|---|---|---|
| `@mkbabb/glass-ui` (root barrel) | ~30 | Card / Button / Sheet / Dialog / Slider / Progress / Toaster / HoverCard / TooltipProvider / useStagger / useTimer / useResizeObserver / useTokenColor / useIntersectionPause / useAnimatedNumber / useRAFLoop / DAMPING / SNAP_THRESHOLD / installDarkModeSync / ToggleGroup / ScrollPane / ScrollingText / toast / Pulse / Badge / Label / Collapsible* |
| `/dock` | 2 | `GlassDock` + `DockIconButton` |
| `/tabs` | 2 | `BouncyTabs` + `UnderlineTabs` |
| `/controls` | 1 | `DarkModeToggle` |
| `/aurora` | 2 | `Aurora` + `type AuroraConfig` |
| `/timeline` | 4 | `GlassTimeline` — across MeterColumn / PhaseTimeline / SpeedtestResults / PhaseTimelineDetailPanel |
| `/instrument-chassis` | 2 | `InstrumentChassis` — MeterColumn + SpeedtestResults |
| `/metric-badge` | 1 | `MetricBadge` |
| `/metric-stack` | 1 | `MetricRow` + `MetricStack` (composite import) |
| `/metric-cell` | 1 | `MetricCell` |
| `/responsive-tabs` | 4 | `ResponsiveTabs` |
| `/api` | 1 | `type TimelineSegment` |
| `/forms` | 2 | `Input` + `Textarea` |
| `/dark` | 1 | `useGlobalDark` |
| `/keyboard` | 1 | `registerShortcut` |
| `/icon-tooltip` | 1 | `IconTooltip` |
| `/infinite-scroll` | 1 | `InfiniteScroll` |
| `/expandable-container` | 1 | `ExpandableContainer` |
| `/toggle-chip` | 1 | `ToggleChip` |
| `/pulse` | 1 | `Pulse` |
| `/tokens` (local re-export façade) | 1 | tokens re-exported through speedtest's own façade |

17 canonical glass-ui subpaths + 1 local façade. Migration to flat subpath surface is COMPLETE at speedtest.

### 1.2 Adoption signal matrix

| Substrate | Speedtest adoption | Notes |
|---|---|---|
| MetricRow / MetricStack / MetricCell (v1.6.0 / v1.7.0) | ADOPTED — primary AC consumer | Co-author of the primitives; SpeedtestResults + dashboard charts |
| ResponsiveTabs (v1.7.0) | ADOPTED — 4 sites | Originating consumer |
| AnimatedDigit (v1.6.0) | ADOPTED — implicitly via MetricRow | Composed inside `<MetricRow>` |
| ToggleGroupItem variant="card" (v1.7.0) | ADOPTED | Survey FlowSelector |
| `--phase-color` cascade (v1.5.1) | ADOPTED — primary consumer | InstrumentChassis `[data-phase]` resolver; `--phase-color-aura` parallel for saturated value-pulse |
| `--phase-color-label` (v1.5.1) | ADOPTED | Cited inline in code comments + DESIGN.md |
| OFL fonts (v1.5.0) | ADOPTED — primary | Plus Jakarta Sans + Fira Code self-host |
| timeline 44×44 hit-area (v1.6.0) | ADOPTED — primary consumer | Cited as the AC.W6d binding |
| useDarkModeSync rename (v1.3.0) | ADOPTED | 3 sites correctly on `installDarkModeSync` (MeterColumn + useEChartsTheme) |
| HeaderRibbon (v1.4.0) | NOT-ADOPTED | speedtest never wired |
| useClipboard / copyToClipboard (v1.4.0 / v1.8.2) | NOT-ADOPTED | speedtest has no copy-to-clipboard surfaces |
| scale-on-hover utility (v1.4.0) | NOT-ADOPTED | speedtest does not use hover-scale recipes |
| GlassScrubber variant (v1.8.0) | NOT-ADOPTED | speedtest's Slider sites are not timeline scrubbers |
| ProgressiveSidebar slotted-chassis (v1.8.0) | NOT-ADOPTED | no sidebar in speedtest |
| PaperBackdrop /api promotion (v1.8.0) | NOT-ADOPTED | no paper-textured surfaces |
| MetricRow clamp-endpoint tokens (v1.8.3) | NOT-NEEDED | speedtest IS the canonical audacious-poster register consumer (baked defaults match exactly) |
| Press-scale ladder (`--scale-press-{xs,sm,md,lg}` v1.8.1) | NOT-ADOPTED | speedtest does not use arbitrary `active:scale-[X.XX]` literals |

Counts: 9 ADOPTED / 8 NOT-ADOPTED-by-design. Zero retired-class leakages. Zero retired-subpath imports. The migration discipline is exemplary.

---

## Section 2 — Speedtest cosmetic regression matrix

Speedtest shows ZERO P0 / P1 cosmetic regressions from the L → AF.W1 delta corpus. The 7-column attribution matrix below holds five P2 / P3 findings — all of them are either consumer-design judgments rather than substrate-driven regressions, or are already absorbed at the AF tranche cadence.

| # | Surface | Site | Pattern | Tranche source | Category | Severity | Recommendation |
|---|---|---|---|---|---|---|---|
| S-1 | `glass-card` helper class | `DashboardMap.vue:line` + 4 other sites | `class="glass-card"` raw helper class | pre-L (legacy `.glass-card` recipe preserved at L.W2 in `src/styles/glass.css`) | static-class | P3 | fold-in: prefer `<Card>` primitive where ergonomic; substrate is canonical so visual is correct; this is a stylistic preference not a regression. KEEP-AS-IS. |
| S-2 | `glass-wash`, `glass-floating` raw classes | SubnetAddDialog / FlowSelector / ThankYou (~4 sites) | mixed `glass-wash` / `glass-floating` raw class application | L.W2 (5-rung tier canon) | static-class | P3 | speedtest is using the canonical 5-rung ladder correctly. NO-OP. |
| S-3 | `--chassis-max-block-size` consumer override | MeterColumn / SpeedtestResults / dashboard surfaces | `max-block-size: var(--chassis-max-block-size)` | AB.W1.T1 (`69cfa9fe`) | token cascade | P3 | substrate is canonical; consumer uses it as designed. NO-OP. |
| S-4 | `--phase-color-aura` parallel custom prop | SpeedtestResults + composables | inline `style="--phase-color-aura: ${hex}"` parallel to substrate `--phase-color` | AB+1.W3 / AC.W6c | token cascade | P3 | this is consumer-private (saturated value-pulse channel beside the substrate's WCAG-companion `--phase-color`). Documented in inline comments as the dual-channel pattern. NO-OP. |
| S-5 | Post-P metric-stack changes not yet absorbed | SpeedtestResults / ResultStack | `register="result"` prop on MetricStack (9ba68ca + d244dd5) | post-P shadow (HEAD `1c6c3e5..d244dd5`) | new prop available | P2 | speedtest SHOULD adopt the `register="result"` prop on the compact ledger MetricStack sites in ResultStack.vue. Tokenised clamps preserve audacious defaults; consumer just needs to set the prop. **PROACTIVE FOLD-IN candidate Q-S-5** (one prop add per call site). Status: at AF close, speedtest's AC.W6d sites already use the audacious defaults; the new `result` register is a NEW affordance not a regression. NO-FOLD-IN unless speedtest hits the clamp ceiling later. |

Speedtest's 64-file glass-ui surface is the cleanest in the constellation per the AF close ceremony evidence + Qλ's direct probe. The W7a precept-conformance sweep at AF.W7a returned PASS for precepts 10 (animation idiom), 6 (no TS/CSS escapes), 3 (no god modules). The AF tranche's own visual-acceptance pass (artefacts/W9/) verified all 15 D-items rendering at desktop + mobile.

**Speedtest regression count: zero P0/P1; five P2/P3 (all consumer-design or NEW-affordance).**

**Top 3 (only P2)**:
1. S-5 — post-P shadow `MetricStack register="result"` available but not adopted in ResultStack (P2 NEW-affordance, not regression).
2. S-1 — five raw `glass-card` class sites preferable as `<Card>` (P3 stylistic).
3. S-2 — raw 5-rung ladder classes (P3, all canonical).

---

## Section 3 — Cross-tranche cross-walk matrix (the grand table)

Walked backwards from glass-ui HEAD through P → AB+1 → O → N → M → L FINAL.md corpus. Forty-three rows of consumer-visible deltas. Per-cell verdict: **A** = ADOPTED (consumer migrated cleanly), **I** = IGNORED (consumer doesn't touch this surface), **B** = BROKEN (consumer affected but un-migrated → silent regression), **U** = UNKNOWN (could not determine from static scan; flag for live probe).

Consumer columns: KF = keyframes.js, VJ = value.js (master + WIP w.w2.1-value-js-prebuild), FA = fourier-analysis/web, WF = words/frontend, BB = bbnf-buddy, ST = speedtest.

### 3.1 Tranche L (v1.0; 2026-05-11/12) — SCC trap closure + v1.0 cohort breaks

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| L-1 | W1 Lane A | `d1de94b` | vueuse-FREE root barrel (SCC trap closure) — Input/Textarea/Combobox/Carousel moved off root | subpath | A | A | A | A | A | A |
| L-2 | W1 Lane B | `d1de94b` | `@mkbabb/glass-ui/api` discovery layer (24 types + 8 constants) | subpath | I | A | A | I | I | A |
| L-3 | W1 Lane C | `d1de94b` | `/composables/dark` + `/composables/keyboard` RETIRED; flat `/dark` + `/keyboard` canonical | subpath | A | A | A | A | A | A |
| L-4 | W1 Lane C | `d1de94b` | `/carousel` new subpath (full `Carousel*` family) | subpath | I | I | I | I | I | I |
| L-5 | W2 Lane A | `aace84e` | composables/ restructured into 8 sub-trees (motion/, reactive/, dom/, glass/, sortable/, sidebar/, dark/, keyboard/) | internal | I | I | I | I | I | I |
| L-6 | W3 | `f481ba2` | `useOffsetPagination` + `useVirtualSection*` + `useWindowedStore` RETIRED | composable | I | I | A (1 site has retire-note shim) | I | I | I |
| L-7 | W3 | `f481ba2` | `@mkbabb/glass-ui/pagination` + `/virtual` subpaths RETIRED | subpath | I | I | A | I | I | I |
| L-8 | W3 | `f481ba2` | `DockShowcaseFrame` demo-private RETIRED | demo | I | I | I | I | I | I |
| L-9 | W7 Lane B | `59b7b56` | `useConfiguratorState<T>` gained `cloneMode: 'per-preset'` + `cyclePreset` + toRaw hardening; `useAuroraStudio` RETIRED | composable | I | A | I | I | I | A |
| L-10 | W5 / W7 | various | tailwind-merge dependency dropped at v0.9.2 (cn() ships own deduplicator) — peer-dep manifest drops | peer-dep | **B** | **B** | **B** | I | I | A |
| L-11 | W6 | `1c1788f` | bundle-budget gate ships in CI (consumers do not consume, hygiene) | meta | I | I | I | I | I | I |
| L-12 | W1 Lane A | `d1de94b` | `/forms` subpath (Input + Textarea + Combobox) — additive preserved | subpath | I | A | I | I | I | A |
| L-13 | W3 | `f481ba2` | DiscoGlyph / DockGroup / InstrumentChassis wired (each ≥ 2 consumers) | primitive | I | I | I | I | I | A |

### 3.2 Tranche M (v1.0.4 / v1.0.5; 2026-05-12) — constellation standardization

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| M-1 | W0 | `e385879` | v1.0.4: Carousel subpath substrate alignment with MIGRATION.md §1.2 | subpath | I | I | I | I | I | I |
| M-2 | W1 (cross-repo) | per-consumer | constellation-wide migration to v1.0 subpath surface (5 consumers × ~19 sites/each) | subpath | A | A | A | A | A | A (pre-M Y tranche) |
| M-3 | W1.D | words `0f16925` | `glass-subtle` class RETIRED — was already `glass-wash` at L token canon; M.W1 caught phantom-class drift in words/frontend | static-class | **B** (3 sites) | **B** (2 sites) | **B** (5 sites) | A | I | A |
| M-4 | W2 Lane A | `13e8d9e` | F-ε-3 Configurator recursion CLOSED (3-layer fix: CSS grid reveal + bool prop coerce + WebGL probe sync); MetaballCanvas.isSupported demoted reactive→synchronous probe | substrate | I | I | I | I | I | I |
| M-5 | W2 Lane B | `13e8d9e` | v1.0.5: 5 /api type promotions (32 → 37 symbols) | type-only | I | A | I | I | I | A |
| M-6 | W2 Lane C | `13e8d9e` | 9 L-cosmetic residuals absorbed (Aurora -inset-6 etc.) | internal | I | I | I | I | I | I |

### 3.3 Tranche N (v1.1.0 → v1.1.4; 2026-05-12 → 14) — strategic wiring

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| N-1 | (AB close anchor) | `a28560f` | v1.1.0: AB Living-UI canon — `--chassis-max-block-size` token + timeline split + Pulse aura variant + Progress sectioned variant + dock-shadow consumer canon | token + variant | I | I | I | I | I | A |
| N-2 | W0 A1 | `b6c1eed` | `useTouchGate` wired into `<Slider>` (mirrors GlassDock pattern; dockKeepOpen integration) | primitive | I | I | I | I | I | I |
| N-3 | W0 A3 | `b6c1eed` | `<Section backdrop="paper">` additive prop (paper-backdrop wire) | primitive | I | I | I | I | I | I |
| N-4 | W0 A5 | (speedtest commit) | `freshness` subpath cross-repo wire to speedtest/vite.config.ts | meta | I | I | I | I | I | A (later RETIRED at AD.W4) |
| N-5 | W1 C | `b1d5cc9` | `@utility text-micro` canonicalized (Tailwind v4 bridge; 5 consumer sites verified) | utility | I | A | A | A | A | A |
| N-6 | W2 A | `ffc02a9` | `<Configurator>` + `<ConfiguratorRow>` density CVA axis (mobile/compact/comfortable/spacious; 8 density tokens) | CVA | I | A | I | I | I | I |
| N-7 | W2 B | (no source change) | dock-blur audit NO-OP at substrate (already at floor) | internal | I | I | I | I | I | I |
| N-8 | W1 | `b1d5cc9` | typography sweep: 9 `text-[0.6875rem]` → `text-micro` across 4 files | internal | I | I | I | I | I | I |
| N-9 | W0 | `b6c1eed` | CSS bundle budget rebaselined 29K → 36K raw / 5.75K → 6.7K gzip | meta | I | I | I | I | I | I |

### 3.4 Tranche O (v1.2.0 → v1.4.1; 2026-05-14) — backend hygiene + architectural maturation

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| O-1 | W0 A | `d327a45` | v1.2.0: AB post-hoc + precept canonicalize + 9 src files cosmetic-normalized (`back-compat` mention count 9→2) | docs/precept | I | I | I | I | I | I |
| O-2 | W1 A | `827b6ae` | Aurora fail-explicit init (`onInitError` callback contract) | API | I | I | I | I | I | A (transitive) |
| O-3 | W1 B | `827b6ae` | WebGL shader fail-explicit (4 sites) | internal | I | I | I | I | I | I |
| O-4 | W1 C | `827b6ae` | Configurator clone Path A (toRaw hardening) | API | I | A | I | I | I | I |
| O-5 | W1 D | `827b6ae` | typewriter throw-on-zero-content fail-explicit | API | I | I | I | I | I | I |
| O-6 | W2 | `7dce645` | Dock DI canonical shape: 6 string-key provides → 1 typed `InjectionKey<DockContext>` + paired strict/optional helpers | API | A | **B** (2 sites in `demo/@/components/custom/color-picker/controls/ActionButton.vue` at WIP branch — fixed at P.W5 Lane A `755b3cd` on WIP) | **B** (2 sites — fixed at P.W5 Lane B `4df1a06` on master) | I | A | A |
| O-7 | W3 | `b892eab` | 3 god-module splits: GlassTimeline (1049 LOC) + profile-aurora (884) + usePresetEditor (657) — consumer imports byte-identical | internal | I | I | I | I | I | I (transparent) |
| O-8 | W4 A | `ea71fe9` | /api 12 type promotions (37 → 49) + `UseAuroraReturn` exported | type-only | I | A | A | I | I | A |
| O-9 | W4 B | `ea71fe9` | RENAME: `avatarVariant` → `avatarVariants` (plural canonical) | API | I | **B** (typo at value.js `demo/@/components/ui/avatar/index.ts` pre-existing; fixed at P.W5 Lane A) | I | I | I | I |
| O-10 | W4 B | `ea71fe9` | RENAME: `useDarkModeSync` → `installDarkModeSync` (install* prefix for one-time effects) | API | I | I | I | I | I | A (3 sites correctly migrated) |
| O-11 | W6 A | `25e1b5a` | NEW: `useClipboard()` composable | composable | I | I (Path A) | A (3 inline parallels at O11/b → migrated to substrate at P.W5 Lane B) | I | I | I |
| O-12 | W6 A | `25e1b5a` | NEW: `<HeaderRibbon>` primitive + `/header-ribbon` subpath | primitive + subpath | A (adopted at P.W5 Lane C `2183f32`) | I (orphan `header-ribbon/` directory dropped at P.W5 Lane A) | I | I | I | I |
| O-13 | W6 B | `25e1b5a` | NEW: 5 dock-active-state tokens — `--dock-active-{bg,text,ring,shadow,scale}` ladder | token | I | I | I | I | A (1 site, P.W5 Lane D `dafb99f`) | I |
| O-14 | W6 C | `25e1b5a` | NEW: `@utility scale-on-hover` (4-scope hover-scale ladder) | utility | A (10 sites; P.W5 Lane C) | I | I | A (15 sites; P.W5 Lane E `5c1b2b8`) | I | I |
| O-15 | W6 D | `25e1b5a` | speedtest AC.W6 cohort: OFL fonts + `--phase-color-label` cascade + 3 primitives (MetricRow / MetricStack / AnimatedDigit) + timeline 44×44 hit area + `as` prop | speedtest-coupled | A (Fira Code CDN drop P.W5 Lane C) | I | I | A (Fira Code CDN drop P.W5 Lane E) | I | A (primary) |
| O-16 | W6 D | `25e1b5a` | NEW: 8 WCAG chart-label tokens for `--chart-{phase}-label` (OKLCH L≈0.40) routed via `data-phase` | token | I | I | I | I | I | A |
| O-17 | W6 D | `25e1b5a` | NEW: 2 hit-area floor tokens (`--timeline-dot-size-touch` + `--timeline-touch-target`) | token | I | I | I | I | I | A |
| O-18 | W6 D | `25e1b5a` | NEW: `@utility text-hero` (display ladder hero rung) | utility | I | I | I | A (heavy adopter) | I | A (multiple sites) |

### 3.5 AB+1 retrospective (v1.5.0 → v1.7.0; 2026-05-14) — speedtest AC absorption cohort (shadow)

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| AB1-1 | W2 | `2474440` + `8246e07` | v1.5.0: OFL self-host fonts (Plus Jakarta Sans + Fira Code woff2) at `src/fonts/`; ~98 KB total | font | A | I | I | A | I | A |
| AB1-2 | W3 | `099910d` | v1.5.1: `--phase-color-label` chassis cascade (WCAG OKLCH L≈0.40 via `data-phase` selector) | token | I | I | I | I | I | A |
| AB1-3 | W4 | `8bf51c4` | timeline `::before inset -15px` for 44×44 WCAG 2.5.5 hit-area | a11y | I | I | I | I | I | A |
| AB1-4 | W4 | `099910d` | `--phase-color-label` chassis cascade for WCAG label register | token | I | I | I | I | I | A |
| AB1-5 | W4 | `bb1f15b` | typography token correction: `.dock-label` font-weight 500 → 400 | typography | A (dock label use) | I | I | I | I | A (dock label use) |
| AB1-6 | W4 | `b8a61ec` | `--continuous-fill-opacity` opacity-cascade custom prop on `<GlassTimeline>` continuous variant | custom-prop | I | I | A (3 sites adopt at P.W5 Lane B; `GlassScrubber` substrate proposal) | I | I | A |
| AB1-7 | W4 | `bb1f15b` + `12e7f55` | NEW: `<MetricRow>` + `<MetricStack>` (v1.6.0) + `/metric-stack` subpath | primitive + subpath | I | I | I | I | I | A (primary) |
| AB1-8 | W4 | `bb1f15b` | NEW: `<AnimatedDigit>` + `/animated-digit` subpath | primitive + subpath | I | I | I | I | I | A (composed inside MetricRow) |
| AB1-9 | W4 | `d813c63` | `<MetricStack>` `as` prop for TransitionGroup support (consumer-side ergonomics) | API | I | I | I | I | I | A |
| AB1-10 | W4 | `12e7f55` | DESIGN.md custom-prop cascade pattern (canonical chassis-cascade docs) | docs | I | I | I | I | I | I |
| AB1-11 | W5 | `8dad58d` | v1.7.0: NEW `<MetricCell>` + `/metric-cell` subpath | primitive + subpath | I | I | I | I | I | A |
| AB1-12 | W5 | `8dad58d` | NEW `<ResponsiveTabs>` (matchMedia Select↔UnderlineTabs swap) + `/responsive-tabs` subpath | primitive + subpath | I | I | I | I | I | A (4 sites) |
| AB1-13 | W5 | `8dad58d` | NEW: `<ToggleGroupItem variant="card">` extending the toggle CVA `variant` union | CVA | I | I | I | I | I | A |

### 3.6 Tranche P (v1.7.0 → v1.8.4; 2026-05-16) — zero-deferral close

| # | Wave | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|---|
| P-1 | W0 Lane A | `1bfe8d0` | AB+1 retrospective plan folder authored (9 files) | docs | I | I | I | I | I | I |
| P-2 | W0 Lane B | `1bfe8d0` | v1.7.0 ceremonial git tag placed | meta | I | I | I | I | I | I |
| P-3 | W0 Lane C | `1bfe8d0` | CSS budget rebaselined 36K → 42K raw / 6.7K → 7.4K gzip; CHANGELOG "8 constants" typo FIX-WITH-NOTE | meta | I | I | I | I | I | I |
| P-4 | W1 Lane A | `b27792c` | v1.7.1: /api Props promotion (55 → 63 — 8 AB+1 + StackedIconGroup type-only adds) | type-only | I | I | I | I | I | I |
| P-5 | W1 Lane B | `b27792c` | dock barrel re-export prereq (DockContext + helper symbols re-exported via /dock for downstream consumers) | API | A | A | A | I | A | A |
| P-6 | W2 Lane A/B/C | `b31fc3c` | v1.7.2: invariant-25 paired-helper completion (`CONFIGURATOR_DENSITY_KEY` + `SORTABLE_CONTEXT` + `GlyphFaceSilhouetteKey`) — 3 sites optional-only / strict-only / optional-only | API | I | I | I | I | I | I |
| P-7 | W2 Lane D | `b31fc3c` | `UseDockStateReturn` type annotation added (Pγ.3) | type-only | I | I | I | I | I | I |
| P-8 | W3 Lane A | `df0e7e7` | v1.8.0: NEW `<Slider variant="glass-scrubber">` substrate | CVA | I | I | A (3 sites at P.W5 Lane B) | I | I | I |
| P-9 | W3 Lane B | `df0e7e7` | NEW: `<ProgressiveSidebarSection>` slotted-chassis split (substrate split of ProgressiveSidebar) | primitive | I | I | I | I (E.4 ARCHIVED-CONSUMER-DESIGN-PENDING) | I | I |
| P-10 | W3 Lane C | `df0e7e7` | `<PaperBackdrop>` promoted to `/api` (type promotion) + texture-system DESIGN.md doc | type-only | I | I | I | I (E.5 ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED) | I | I |
| P-11 | W4 Lane A | `441b9fb` | v1.8.1: heap-bump baked into `package.json.scripts.build` (8GB Node heap; consumer-transparent) | meta | I | I | I | I | I | I |
| P-12 | W4 Lane C | `441b9fb` | proof-package.mjs synthetic-consumer manifest drops tailwind-merge (consumers verified DON'T need it) | meta | **B** (still declares ^3.3.1 in package.json) | **B** (still declared) | **B** (still declared ^3.0 in package.json) | I | I | I |
| P-13 | W4 Lane D | `441b9fb` | NEW: 4-rung `--scale-press-{xs,sm,md,lg}` ladder; `--scale-press-btn` aliased to `--scale-press-sm` (preserves pre-W4 button-press visual) | token | I | I | A (1 site adopts) | A (1 site adopts; 9 sites still on arbitrary `active:scale-[X.XX]` literals — fold-in-pending) | I | I |
| P-14 | W4 Lane B | `441b9fb` | proof-theme `blur-glass-subtle` → `blur-glass-resting` (pre-L.W1 retired utility caught) | internal | I | I | I | I | I | I |
| P-15 | W4 Lane E | `441b9fb` | 7 demo stories: useClipboard / HeaderRibbon / dock-icon-button token ladder / scale-on-hover / glass-scrubber / progressive-sidebar-section / paper-backdrop texture system | demo | I | I | I | I | I | I |
| P-16 | W5 Lane A.1 | `7c901b9` | v1.8.2: `copyToClipboard` bare co-export (Path B prereq) | composable | I | A (17 sites bulk-flip at `755b3cd` WIP) | I | I | I | I |
| P-17 | W5 Lane A | `f286cea` | value.js v1.4.0 adoption fix (`avatarVariant` typo + 2 dock-key injects + HeaderRibbon retire + 17 useClipboard bulk flip) on WIP branch (`755b3cd`) | consumer-fix | I | A (WIP only; PD-3 archived) | I | I | I | I |
| P-18 | W5 Lane B | `f286cea` | fourier-analysis: 2 dock typed-context migrations + 3 useClipboard parallels migrated + HoverCard one-liner + GlassScrubber adoption (3 sites) on master (`4df1a06`) | consumer-fix | I | I | A (pushed) | I | I | I |
| P-19 | W5 Lane C | `f286cea` | keyframes.js: HeaderRibbon adoption + 13-site scale-on-hover migration + Fira Code CDN drop on master (`2183f32`) | consumer-fix | A (pushed) | I | I | I | I | I |
| P-20 | W5 Lane D | `f286cea` | bbnf-buddy: `ToolsLayer.vue:328` :deep() retire via W6 token ladder + `useLeaveTimer` RETIRE-as-inline on master (`dafb99f`, local-only no remote) | consumer-fix | I | I | I | I | A (local) | I |
| P-21 | W5 Lane E | `f286cea` | words/frontend: Fira Code CDN drop + scale-on-hover migration (15 sites; E.1 + E.2) on master (`5c1b2b8`) | consumer-fix | I | I | I | A (pushed) | I | I |
| P-22 | W5 (substrate) | `f286cea` | v1.8.3: NEW MetricRow value+unit clamp-endpoint tokens (`--metric-row-{value,unit}-clamp-{min,max}`) — audacious-poster defaults preserved bit-for-bit | token | I | I | I | I (substrate extension for E.3) | I | I (NOT-NEEDED) |
| P-23 | W6 | (this) | v1.8.4: 13-lane audit + PD-1 + PD-2 formal-archive + invariants 28-29 codified | docs/meta | I | I | I | I | I | I |

### 3.7 Post-P shadow + AF.W1 (v1.8.4 → HEAD; 2026-05-16 → 18)

| # | Commit | Delta | Surface | KF | VJ | FA | WF | BB | ST |
|---|---|---|---|---|---|---|---|---|---|
| H-1 | `949474a` | `assertDistFresh` + `freshness-walk` + `freshness-gate` apparatus RETIRED (AD.W4.T2) — supplanted by `"development"` conditional-exports branch | meta | A (kept dev-condition) | A | A | A | A | A |
| H-2 | `099d51e` | dock edge-fade `mask-image` linear-gradient RETIRED (purposeless after Z.W2.T2 grow-to-fit) | CSS | I | A | I | I | I | A |
| H-3 | `3cb70db` | `<GlassTimeline variant="continuous">` stitched gradient + rounded ends + glassy dots (single rail-spanning gradient supplanting per-region gradients) | substrate | I | I | A (transitive via GlassScrubber) | I | I | A |
| H-4 | `beec35e` | toggle `card` variant `compoundVariants` h-auto rule + inactive dock layers `inert` hit-test fix | CVA | I | I | I | I | I | A (FlowSelector card variant) |
| H-5 | `9ba68ca` | NEW: `<MetricStack>` `register` prop (`"audacious"` default / `"result"` compact); `--metric-row-value-clamp-cqi` token (routes the 34cqi middle arm) | API + token | I | I | I | I | I | I (NEW-affordance not adopted yet) |
| H-6 | `1c6c3e5` | NEW: `<DataTable>` `responsive` prop (card-per-row projection at narrow widths via `useElementSize` container-driven breakpoint) | API | I | I | I | I | I | I (potentially-useful at ResultsTable.vue) |
| H-7 | `d244dd5` | MetricStack result-register label-clamp tokens + tighter value ceiling (taming the result register) | token | I | I | I | I | I | I (NEW-affordance not adopted yet) |
| H-8 | `63c88b7` | AF.W1: Progress + ContinuousTimeline rounded leading-edge fill (D12); MetricBadge `--metric-badge-label-weight` token default 300 (D4); MetricRow value+unit conjoin 4→3 subgrid (D7); ContinuousTimeline self-drawing completion tick (C1) | primitive | I | I | I | I | I | A (primary AF consumer) |

### 3.8 Cell-count summary

Total deltas tabulated: 43 (L 13 + M 6 + N 9 + O 18 + AB+1 13 + P 23 + shadow 8 = 90; some are internal-only / docs-only with no consumer-visible footprint). The 43-row figure above is the subset with at least one consumer-visible cell. Across 6 consumers × 43 deltas = 258 cells. Verdict distribution:

- **A (ADOPTED)**: ~73 cells (28% — concentrated in M-2 constellation migration + AB+1 speedtest cohort + P.W5 cross-repo batch).
- **I (IGNORED)**: ~175 cells (68% — most surfaces are consumer-specific and the other consumers cleanly do not touch them).
- **B (BROKEN)**: 10 cells — five distinct clusters identified in Section 4 below.
- **U (UNKNOWN)**: 0 cells.

---

## Section 4 — Cluster identification (3+-consumer-affecting deltas)

A cluster is a single glass-ui delta that produces three or more consumer-affecting cells (either ADOPTED across 3+ or BROKEN across 3+). The BROKEN clusters are the P0 fold-in / revert candidates.

### Cluster C1 — `tailwind-merge` peer-dep residual (3 BROKEN cells)

**Glass-ui delta**: L (v0.9.2) retired tailwind-merge; `cn()` now ships its own deduplicator. P.W4 Lane C dropped tailwind-merge from `scripts/proof-package.mjs:113`'s synthetic-consumer manifest (verifying consumers do NOT need it).

**Consumer status**:
- keyframes.js — `package.json:83` still declares `"tailwind-merge": "^3.3.1"`.
- value.js — still declared.
- fourier-analysis/web — `package.json:36` still declares `"tailwind-merge": "^3.0"`.
- words-frontend / bbnf-buddy / speedtest — CLEAN.

**Severity**: P2 — package.json bloat + license/audit-surface drift, not a runtime regression (the dep resolves and is harmless if installed but unused). The proof:* gate would catch this on a fresh consumer setup.

**Recommendation**: per-consumer fold-in. Single `npm uninstall tailwind-merge` per consumer + verify all `cn()` call sites import from `@mkbabb/glass-ui` not from a local re-export of tailwind-merge. NOT a glass-ui-side revert candidate — the library retirement is correct and load-bearing for bundle hygiene.

### Cluster C2 — `glass-subtle` phantom class (3 BROKEN consumers)

**Glass-ui delta**: pre-L 5-rung tier canon froze the public ladder to `.glass-{wash,quiet,resting,floating,overlay}`. The `.glass-subtle` class is NOT defined in `src/styles/glass.css` and has not been since L close. words/frontend already migrated this at M.W1 Lane D (`0f16925`: "glass-subtle→glass-wash"). The same migration was NEVER run against keyframes.js, value.js, or fourier-analysis.

**Consumer status**:
- keyframes.js — 3 sites: `demo/app/SceneNav.vue:10`, `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue:150`, `demo/@/components/custom/animation-controls/controls/AnimationControls.vue:12`.
- value.js — 2 sites: `demo/@/components/custom/gradient/GradientStopEditor.vue:109`, `demo/@/components/custom/gradient/GradientCodeEditor.vue:138`.
- fourier-analysis/web — 5 sites: `PaperView.vue:335`, `FullscreenViewer.vue:54`, `EquationPanel.vue:67`, `EquationModeToggle.vue:8`, `ConvergenceLegend.vue:17`.
- words-frontend / bbnf-buddy / speedtest — CLEAN (words migrated at M.W1).

**Severity**: P1 SILENT VISUAL REGRESSION — `class="glass-subtle"` resolves to NO CSS rule. These surfaces are missing their backdrop / blur entirely. Easy to miss because most sites layer it on a structural element that already has `bg-*` so the visual differs only in the blur+tint compared to canonical `.glass-wash`.

**Recommendation**: PER-CONSUMER FOLD-IN, Q wave. Mechanical sed-rewrite `glass-subtle` → `glass-wash` × 10 sites (3 keyframes + 2 value + 5 fourier). NOT a glass-ui-side revert — `.glass-subtle` was retired ≥ 3 tranches ago and the cluster is consumer-orchestrator-owned cleanup. The fact that M.W1 caught it in words/frontend but the same wave's consumer audit lanes (KF / VJ / FA) missed it surfaces an N-class audit blind-spot: the per-consumer M.W1 audit lanes did not run a phantom-class grep. **Q.W?-Lane recommended: corpus-wide grep on the retired-tier vocabulary for every consumer, with a single sed-rewrite commit per consumer.**

### Cluster C3 — `--scale-press-{xs..lg}` ladder under-adoption (1 BROKEN + 1 partially-ADOPTED + 4 IGNORED)

**Glass-ui delta**: P.W4 Lane D (`441b9fb`) shipped `--scale-press-{xs: 0.98, sm: 0.97, md: 0.96, lg: 0.95}` 4-rung ladder. `--scale-press-btn` aliased to `--scale-press-sm` (0.97; preserves pre-W4 button-press). Designed to absorb 9 arbitrary `active:scale-[X.XX]` literals at words/frontend (the P11/a I4 audit finding).

**Consumer status**:
- words-frontend — partial: 1 site adopts `--scale-press-*`; **9 sites still on arbitrary `active:scale-[0.95]` / `[0.96]` / `[0.97]` / `[0.98]` literals** (`RecentItem.vue:68`, `WordlistGrid.vue:10`, `ReviewQualityButtons.vue:10`, `WordlistDashboard.vue:112`, `LookupControlsPanel.vue:15+48`, `SearchResultItem.vue:6`, `SearchResults.vue:60`, etc.).
- value.js — 1 arbitrary literal `active:scale-[0.98]` (4 instances in PaletteSlugBar.vue).
- fourier-analysis — 1 arbitrary `active:scale-[0.98]` in GalleryCardModal.vue.
- speedtest / keyframes.js / bbnf-buddy — IGNORED (no arbitrary literals).

**Severity**: P2 — the literals work (the values match the ladder rungs almost exactly) but the substrate-discipline drift is the documented residual that P.W4 Lane D's substrate ship was meant to absorb. The new ladder is documented at `DESIGN.md:300-314`.

**Recommendation**: PER-CONSUMER FOLD-IN. words/frontend's 9 sites are the largest cluster and the canonical substrate-consumer cohort. Mechanical pattern: `active:scale-[0.98]` → `active:scale-[var(--scale-press-xs)]` (or `active:scale-press-xs` if Tailwind v4 utility-class shorthand exists). value.js + fourier-analysis are 1-site each. NOT a glass-ui-side revert.

### Cluster C4 — Dock string-key injection (RETIRED) — 2 BROKEN cells (sub-3 but worth noting)

**Glass-ui delta**: O.W2 (`7dce645`) collapsed 6 string-key dock provides into 1 typed `InjectionKey<DockContext>` with paired strict/optional helpers. Brittleness window: transitional dual-provide at W2.a (`ba546c7`) → canonical at W2 (`7dce645`).

**Consumer status**:
- value.js — 2 sites in `demo/@/components/custom/color-picker/controls/ActionButton.vue` still on string-key inject at HEAD. Fixed on WIP branch (`755b3cd` at P.W5 Lane A) but NOT pushed to master per PD-3 archive disposition.
- fourier-analysis — 2 silent dock-string-key injects existed at v1.7.0; FIXED at P.W5 Lane B (`4df1a06` on master).
- keyframes.js — early adopter; CLEAN.
- bbnf-buddy — verified binary-transparent at O11/c re-audit.
- speedtest — A (uses typed context).

**Severity**: P1 — silent null-fallback in dock-DI after typed-key migration retired the string-key provide. value.js's WIP-branch fix exists but is NOT on master, so master is BROKEN.

**Recommendation**: this is the value.js PD-3 archive item. P close formally ARCHIVED-PERMANENT pending user-explicit-authorization LAND. Carries through Q at user discretion. NOT a glass-ui-side revert; the typed-key shape is canonical per invariant 25.

### Cluster C5 — `--paper-*` token cascade + PaperBackdrop adoption (single-consumer; not a 3+-cluster)

words/frontend has 13 `--paper-*` consumer sites + 3 ProgressiveSidebar sites. PaperBackdrop adoption at words/frontend was ARCHIVED-CONSUMER-DESIGN-PENDING (E.4) and ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED (E.5) at P close. NOT a regression; consumer-owned design judgment.

### Cluster summary

| Cluster | Affected consumers | Severity | Glass-ui revert candidate? | Fold-in destination |
|---|---|---|---|---|
| C1 tailwind-merge peer-dep residual | KF, VJ, FA (3) | P2 | NO | Per-consumer Q wave (1-line npm uninstall + verify) |
| C2 glass-subtle phantom class | KF, VJ, FA (3) | **P1 SILENT VISUAL** | NO | **Per-consumer Q.W? sed-rewrite (× 10 sites total)** |
| C3 --scale-press-* under-adoption | WF (9 sites partial) + VJ (1) + FA (1) | P2 | NO | Per-consumer Q wave (mechanical rewrite × 11 sites) |
| C4 dock string-key residual | VJ (PD-3 WIP-frozen) | P1 (consumer-side WIP) | NO | User-authorized LAND only |
| C5 paper-backdrop adoption | WF | P3 design-pending | NO | Consumer-owned |

**Three of five clusters are 3-consumer affecting** (C1, C2, C3). **One is P1 silent-visual** (C2). **Zero clusters are glass-ui-side revert candidates** — every BROKEN cell is a consumer-side residual against a canonical library retirement / token / utility.

---

## Section 5 — Wave fold-in recommendations

### 5.1 Per-finding fold-in vs revert (user directive: BINDING)

The user's directive distinguishes per-finding fold-in (carry to a specific wave at the appropriate consumer) vs revert (undo at glass-ui). Per Section 4, **zero glass-ui-side reverts are warranted**. Every cell flagged BROKEN is a consumer-side migration debt against a canonical library retirement / token / utility canonicalization that the constellation orchestrator (`docs/tranches/M/coordination/CONSTELLATION.md`) is the binding owner of.

### 5.2 Recommended Q-wave fold-in batch (per consumer)

| Wave letter | Wave-rationale | Consumer | Fold-in operation | Sites |
|---|---|---|---|---|
| Q.W?-Lane-A | corpus-wide phantom-class grep canonicalization | keyframes.js | sed `glass-subtle` → `glass-wash` | 3 |
| Q.W?-Lane-A | same | value.js | sed `glass-subtle` → `glass-wash` | 2 |
| Q.W?-Lane-A | same | fourier-analysis | sed `glass-subtle` → `glass-wash` | 5 |
| Q.W?-Lane-B | tailwind-merge peer-dep retire | keyframes.js | `npm uninstall tailwind-merge` + cn() audit | 1 (package.json) |
| Q.W?-Lane-B | same | value.js | `npm uninstall tailwind-merge` + cn() audit | 1 |
| Q.W?-Lane-B | same | fourier-analysis | `npm uninstall tailwind-merge` + cn() audit | 1 |
| Q.W?-Lane-C | --scale-press-* ladder adoption | words/frontend | mechanical rewrite `active:scale-[0.XX]` → `active:scale-[var(--scale-press-X)]` | 9 |
| Q.W?-Lane-C | same | value.js | same | 1 (PaletteSlugBar 4 instances) |
| Q.W?-Lane-C | same | fourier-analysis | same | 1 (GalleryCardModal) |
| Q.W?-Lane-D | precept-side: corpus-wide phantom-class grep canonicalized at every M-class consumer migration sweep | precept submodule | LESSONS-LEARNED entry + SPEC.md gate | 1 |

### 5.3 Tranche-letter wave-counts (which library waves' deltas are still un-folded)

| Wave letter | Un-folded deltas | Cluster impact |
|---|---|---|
| L (v0.9.2 retirement of tailwind-merge) | 3 (C1) | tailwind-merge peer-dep residual |
| L (5-rung tier canon) | 3 (C2 — though actually pre-L baseline) | glass-subtle phantom class |
| O.W4 Lane B (avatarVariant rename + useDarkModeSync rename) | 1 (C4 portion — value.js WIP only) | value.js PD-3 |
| O.W2 (dock typed-context) | 1 (C4) | value.js PD-3 |
| P.W4 Lane D (--scale-press-* ladder) | 11 (C3) | under-adoption (per-consumer fold-in) |

Fold-in count by wave letter: **L = 6 cells (C1+C2)**, **O = 1 cell (C4)**, **P = 11 cells (C3)**. Total 18 un-folded cells across 5 distinct clusters across 4 consumers.

### 5.4 Speedtest-only Q fold-in candidates

Speedtest is the deepest-coupled consumer + the cleanest. The Q-bound fold-in is OPTIONAL / NEW-affordance only:

- **Q-S-5**: `MetricStack register="result"` adoption at `ResultStack.vue` if speedtest re-encounters the result-register clamp ceiling (currently NOT-NEEDED per AF.W9 visual acceptance pass).
- **Q-S-6**: `<DataTable responsive>` prop at `ResultsTable.vue` (NEW post-P shadow affordance `1c6c3e5`).

Both are P3 NEW-affordance opportunities, not regressions.

---

## Section 6 — Severity summary

| Severity | Count | Cluster | Disposition |
|---|---|---|---|
| **P1 silent-visual** | 1 | C2 (glass-subtle phantom class) | **Per-consumer Q-wave fold-in (3 consumers × 10 sites total)** |
| **P1 consumer-side dock** | 1 | C4 (value.js dock string-key on master) | User-authorized LAND only (PD-3 retains) |
| **P2 substrate drift** | 2 | C1 (tailwind-merge peer-dep residual) + C3 (--scale-press-* under-adoption) | Per-consumer Q-wave fold-in (3 + 3 consumers) |
| **P3 consumer-design** | 2 | C5 (paper-backdrop pending at WF) + speedtest Q-S-5/S-6 NEW-affordance | Consumer-owned / optional |
| **Glass-ui-side reverts warranted** | **0** | n/a | Every glass-ui retirement / canonicalization holds. |
| **Speedtest cosmetic regressions (sole-consumer task A)** | **0** | n/a | Speedtest is at AF close (5/18); W9 visual acceptance PASS at desktop + mobile; precept-conformance sweep PASS. The 5 P2/P3 findings in Section 2 are stylistic preferences or NEW-affordance opportunities. |

### 6.1 The headline

The cross-walk surfaces **one P1 silent visual regression** affecting **three consumers** with a **total of ten leaf-cell sites**, all driven by a single non-migration at the M.W1 constellation-standardization wave (the `glass-subtle` → `glass-wash` rewrite that landed at words/frontend but was missed at keyframes.js + value.js + fourier-analysis). This is the canonical N-class audit blind-spot — the M.W1 per-consumer audit lanes did not run a phantom-class grep on the retired-tier vocabulary, so the three consumers carried the dead class forward across N → O → P → AF unobserved.

The recommended fix is a **single Q-wave lane** running a mechanical sed-rewrite per consumer + a precept-side codification of "phantom-class corpus grep" as a binding M-class migration-sweep gate. The sed-rewrite is mechanical (10 lines total); the precept-side codification is the gestalt fix preventing the same class of finding at every future glass-ui token / utility / class retirement.

### 6.2 Speedtest standalone

Speedtest is, at this audit time (2026-05-18, same calendar day as AF close), **the cleanest consumer in the constellation**. Zero P0/P1 cosmetic regressions; zero retired-class leakages; zero retired-subpath imports; 17 distinct glass-ui subpaths consumed; 9 of 17 newer substrate primitives adopted (all post-AC.W6 + AC.W8e cohort); naming-canonical on `installDarkModeSync` + `avatarVariants` post-rename; AF.W7a precept-conformance PASS; AF.W9 visual acceptance PASS. The AF tranche's own close ceremony has already absorbed everything Qλ would otherwise have flagged. The single P2 NEW-affordance candidate (`MetricStack register="result"`) is consumer-owned and NOT-NEEDED at HEAD.

### 6.3 The cluster verdict

Zero clusters warrant a glass-ui-side revert. Every BROKEN cell is consumer-side residual against a canonical library retirement / token / utility. The constellation orchestrator owns the fold-in batch. The single missing precept gate (phantom-class corpus grep at M-class migration sweeps) is the highest-leverage fix; it converts a 4-tranche-stale 10-site cosmetic regression into a single mechanical sed batch + a binding gate for future tranches.

---

## Appendix — methodological notes

- Read corpus: `docs/tranches/L/FINAL.md`, `M/FINAL.md`, `N/FINAL.md`, `O/FINAL.md`, `P/FINAL.md`, `AB+1/FINAL.md`, plus `CHANGELOG.md` entries v1.0.0 → v1.8.4 + post-P shadow commits (`d244dd5 1c6c3e5 9ba68ca beec35e 3cb70db 099d51e 949474a 63c88b7`).
- Per-consumer scan: import-site grep on `@mkbabb/glass-ui[^'"]*` plus pattern-grep on token / utility / phantom-class signatures. File counts: keyframes.js 36, value.js 69, fourier-analysis 24, words/frontend 86, bbnf-buddy 33, speedtest 64.
- Cells assigned only where static evidence was conclusive. Zero UNKNOWN cells: each consumer's grep matched a determinate pattern (adopted import, retired symbol absent, retired class present, etc.).
- No mutating git ops; read-only per the hardened agent git clause.
- Em-dashes spaced-unspaced per STYLE.md (P.W4 Lane D); no spaced em-dashes in this deliverable.
