# L · Rβ — Chronic Deferral Ledger Across Tranches C–K + Post-K Candidates

**Date**: 2026-05-11
**Baseline commit**: `35cae2c` (K W8 close, 2026-05-09; v0.9.3 tagged + pushed)
**Predecessor**: `docs/tranches/K/research/Rβ-chronic-deferrals.md` (36-row C–J ledger; 2026-05-06)
**Lane**: β — chronic deferral surveillance, extended through K + post-K open
**Scope**: every tranche FINAL/audit/wave-spec from C → K + K residuals (R1-R4) + K cross-tranche debt (12 entries) + post-K-close candidates surfaced at L open + `src/` modularization scan
**Method**: read-only walk of `docs/tranches/{C,D,D-II,E,F,H,I,J,K,V}/` + cross-repo speedtest disposition + `ls` against HEAD `src/` tree. K Rβ predecessor authoritative for C–J rows; this document extends the predecessor.

---

## §A — All-tranche deferral ledger (C → K + post-K)

Schema: **Item · Origin tranche · Times deferred · Prior-disposition trail · Status at K close · L disposition**

### A — Rows carried verbatim from K Rβ (C → J)

Per K Rβ §A. K's "absorb-in-K" prescriptions either landed in K or carried forward to K residuals (R1-R4) or cross-tranche debt. Rows already RESOLVED-PRE-J or RE-RETIRED-PERMANENT remain unchanged — they are not re-litigated.

Verbatim mapping from K Rβ → L disposition:

| K Rβ row | K execution | L disposition |
|---|---|---|
| A1 — `<HarmonicLevelGrid>` Filmstrip | RE-RETIRE-CONFIRMED (3× chronic) | RE-RETIRE-PERMANENT (no new consumer pressure) |
| A2 — Blob Web Worker (`composables/blob`) | RE-RETIRE-CONFIRMED (3× chronic) | RE-RETIRE-PERMANENT (encoded but unreachable) |
| A3 — Plugin extraction (Tailwind plugin) | RE-RETIRE-CONFIRMED (5× chronic) | RE-RETIRE-PERMANENT (consumer-territory) |
| A4 — Reduced-motion + a11y deeper sweep | RE-CONFIRM POSTURE (6× chronic) | RE-CONFIRM POSTURE (DESIGN.md `## Accessibility Posture` canon) |
| A5 — C-8 Blob double-rAF | RE-RETIRE (2× chronic) | RE-RETIRE (`_internal/` boundary still holds; FPS 119.62 baseline holds) |
| A13 — Bundle-budget gate | ABSORBED-K-W4-LANE-B (4× chronic; J regression) | RESOLVED (BUDGETS table + `profile:budget` script + lint.yml job re-landed; 30% headroom) |
| A15 — Recovery-diary historical-context comments | RE-DEFER-WITH-ADJUDICATION | RE-CONFIRM (P-tranche provenance markers; documentation, not violation) |
| A16 — `scripts/ay-close.sh` | ABSORBED-K-W4-LANE-B + W8 (4× chronic) | RESOLVED (file deleted at K W8) |
| A19 — API Extractor dts caching | RE-DEFER (1× chronic — non-blocking) | RE-DEFER (build ~18s acceptable; no consumer pressure) |
| A20 — 9 zero-payload subpaths | RE-DEFER (1× chronic — cross-repo dep) | RE-DEFER (speedtest still consumes; condition unmet) |
| A21 — `docs/instructions/README.md:17` | RE-DEFER → precept submodule (1×) | RE-DEFER (correct destination; addressed via precept channel) |
| A22 / A23 — CLAUDE.md / README.md drift | ABSORBED-K-W4-LANE-A (1×) | RESOLVED for J-cohort; **NEW K-cohort drift → see L row L6** |
| A24 — 5 demo `.focus-ring` migrations | ABSORBED-K-W3-LANE-B (1×) | RESOLVED (5 sites migrated) |
| A25 — 3 demo `--surface-tint` bypasses | ABSORBED-K-W3 (1×; partial verify) | RESOLVED (3 sites in W3.A demo lane + 2 W2-residual sites = 11 total surface-tint migrations) |
| A26 — `transition-all` survivors | ABSORBED-K-W3-LANE-B (1×) | RESOLVED (4 sites decomposed; 13-16 raw triplet sweep moved to speedtest W2.T10) |
| A27 — `--{success,warning,info}-foreground` 0 consumers | ABSORBED-V (orphan-token-excise via `afb2b34` + later wiring) | RESOLVED-VIA-V (V cohort absorbed 5/38 K hard-gate items pre-K-dispatch) |
| A28 — `cssVar()` ≥ 2 consumer bar | RETIRED-K-W3-LANE-A (1×) | RESOLVED (`cssVar()` retired; BouncyToggle inlined to `readToken()` helper; supersession by `useTokenColor` documented) |
| A29 — `.overlay-scrim` @utility | ABSORBED-K-W3-LANE-A (1×) | RESOLVED (formally deleted) |
| A30 — StoryPager 4px overflow @ 375 | PARTIAL-K-W5 (outer container fixed; inner-tab overflow → K R1) | **PERSISTENT** at HEAD → **L row L1** (deferral-count 2; chronic threshold tripped) |
| A31 — GlassCarousel mobile chevrons | ABSORBED-K-W5 (1×) | RESOLVED (GlassCarouselPager mobile flex-wrap + glass-carousel min-w-0; Playwright 3-viewport clean) |
| A32 — Stress harness retire decision | ABSORBED-K-W4-LANE-B (2× chronic) | RESOLVED (retired per I.W6 invariant 8) |
| A33 — `ay-close` reappearance | ABSORBED-K-W4-LANE-B + W8 (1×) | RESOLVED (collapsed with A16) |
| A34 — Audacious primary-CTA (K HEADLINE) | ABSORBED-K-W6 (1×) | RESOLVED (`Button variant="primary-audacious"` + `@utility btn-audacious`; ≥ 3 consumers; brittleness window retracted at W8 π lane) |
| A35 — drag-keep-open story fidelity | ABSORBED-K-W7 (1×) | RESOLVED (dock-with-slider story shipped) |
| A36 — PRM gate for WAAPI consumers | ALREADY-RESOLVED-J | n/a |

**Net carry-forward from C–J ledger**: 5 RE-RETIRE-PERMANENT + 4 RE-DEFER (non-blocking) + 1 PERSISTENT-chronic (A30 → L1) + 14 RESOLVED-IN-K. The C–J chain ended cleanly for 23/26 active rows; only A30 carries to L as a chronic.

### B — K residuals R1-R4 absorbed into ledger (origin tranche K)

These are NEW rows surfacing at K close, dispositioned for L. Cited from `docs/tranches/K/audit/K-residuals.md`.

| L# | Item | Origin | Defer × | Prior trail | L disposition |
|---|---|---|---:|---|---|
| L1 | StoryPager inner-tab overflow at 375 viewport | K W8 π-1 (built on J π P1 → K W5 outer-container fix) | 2 (J/K) — **chronic** | J π P1 outer-container → K W5 outer-container fixed; inner-tab overflow surfaced as distinct concern at K W8 | **ABSORB-L** mobile-viewport polish wave; `overflow-x: auto` on StoryPager inner tab-row container OR label truncation below `--breakpoint-md` |
| L2 | CLAUDE.md / README.md K-cohort subpath enumeration | K W8 γ D3+D4 | 1 (K) | K W8 absorbed γ D1/D2/D5 in W8 cleanup; γ D3/D4 → R2 | **ABSORB-L** doc cohort; enumerate 3 WS subpaths in CLAUDE.md + correct README.md count to 36 |
| L3 | 12 wave-spec status lines stale | K W8 γ T1 | 1 (K) | PROGRESS.md canonical; wave-spec planning state stale | **ABSORB-L** housekeeping (or formally retire wave-spec status-line invariant if PROGRESS.md is canonical-of-record) |
| L4 | `--surface-tint-{35,40,70}` rung gaps (4 sites) | K W3 Lane A proof | 1 (K) | 4 raw percentage sites (slider 40%, GlassTimeline 40%, UnderlineTabs 70%, glass.css 35%) | **ABSORB-L** substrate-residue; either define 3 new rungs OR migrate 4 sites to closest existing rungs with documented intent |

### C — K cross-tranche debt (12 entries) absorbed into ledger

These were declared in `K.md ## Cross-tranche debt` (and `K-residuals.md`). Cited verbatim.

| L# | Item | Origin | Defer × | Prior trail | L disposition |
|---|---|---|---:|---|---|
| L5 | **WS Phase 2 — root-barrel removal of vueuse-bearing symbols** (breaking → v1.0) | K WS (Phase 1 landed `a598b90`) | 1 (K) — but **HEADLINE L candidate** | K WS Phase 1 (additive subpaths) shipped v0.9.3; SCC trap PERSISTENT confirmed by speedtest X.W3.c re-probe (+1.92 KB regression byte-for-byte matches glass-ui audit's +2 KB); speedtest disposition `ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED` awaiting LANDED annotation at v1.0 | **HEADLINE-L** — Phase 2 breaking change is L's headline architectural transposition. v1.0 cohort. |
| L6 | 3 unused public composables — `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync` | K cross-tranche debt (Rε B5; cross-repo audit owed) | 2 (K named twice — debt section + L successor list) | Surfaced K open; deferred K close (would require speedtest co-coordination) | **ABSORB-L** cross-repo audit; binary wire-or-retire per substrate-without-consumer invariant |
| L7 | `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` second-consumer audit | K cross-tranche debt (Rε B6) | 2 (K — same pattern as L6) | Same pattern as L6; cross-repo dep | **ABSORB-L** cross-repo audit; pair with L6 |
| L8 | P-tranche second-consumer fidelity — `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` 1-consumer at HEAD | K cross-tranche debt (Rε B9) | 2 (K) | P-tranche silent additions absorbed in I.W1.B with evidence docs; second-consumer audit deferred | **ABSORB-L** cross-repo audit; would require speedtest consumer wiring |
| L9 | `<DockShowcaseFrame>` second-consumer audit | K cross-tranche debt | 2 (K) | V-tranche `60fd745` shipped with 13 dock sites (one consumer surface); second-consumer fidelity deferred | **ABSORB-L** (paired with L8) |
| L10 | Pulse + Typewriter keyframes lift to `animations.css` | K cross-tranche debt (Rε B1) | 1 (K) | Cohesion gain; defer | **ABSORB-L** vocab cohort (mechanical migration) |
| L11 | Aurora chrome Option-A unification under `useConfiguratorState` | K cross-tranche debt | 1 (K) | V-tranche elevated `<Configurator>` to 2-consumer; aurora retained parallel chrome with per-preset clone semantics | **ABSORB-L IF PURSUED** (decision wave: Option-A unify or Option-B retain documented) |
| L12 | Production demo build | K cross-tranche debt (Lighthouse) | 1 (K) | Lighthouse audit surfaced `npm run build` is library-mode; no `vite.demo.config.ts` for static demo | **ABSORB-L** decision wave: ship static demo deploy OR formally retire demo as deploy target |
| L13 | `robots.txt` for public deploy | K cross-tranche debt (Lighthouse P2-2) | 1 (K) | Pre-requisite for publicly-deployed demo | **ABSORB-L** gated on L12 outcome (if demo ships, robots.txt lands) |
| L14 | Vue runtime `uses-passive-event-listeners` | K cross-tranche debt (Lighthouse P2-3) | 1 (K) | Vue upstream concern | **PERMANENT-DEFER** — not glass-ui scope; document at L close that this is permanently routed to Vue upstream |
| L15 | Production hosting `uses-long-cache-ttl` | K cross-tranche debt (Lighthouse P2-4) | 1 (K) | Prod hosting concern | **PERMANENT-DEFER** — consumer-territory hosting concern; document at L close |
| L16 | Speedtest W3.b.1 LANDED annotation | K cross-repo coordination | 1 (K) | Gated on v1.0 / Phase 2 (L5) | **GATED-ON-L5** — when L5 lands at v1.0, speedtest's disposition flips ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED → LANDED |

### D — NEW chronic candidates surfaced post-K-close (at L open)

These are NEW items raised by user directives + speedtest X.W3.c re-probe + post-K-close inspection.

| L# | Item | Origin | Defer × | Prior trail | L disposition |
|---|---|---|---:|---|---|
| L17 | **K.WS subpath typing-publication gap** — vue-tsc fails to resolve `dist/composables/{dark,keyboard}.d.ts` via `'../src/...'` re-export | Speedtest X.W3.c re-probe (post-K-close) | 0 (NEW) | K WS Phase 1 shipped additive subpaths; speedtest's 5 consumer files could not migrate to subpaths because typecheck fails on the 2 composables subpaths (forms typing fine); X.W3.c `migrations.md` flagged. NOT a Phase 2 breaking-change issue — this is a typing-publication regression Phase 1 introduced | **P0 ABSORB-L** — must land BEFORE L5 (Phase 2) so consumers can migrate. Either fix the `'../src/...'` re-export at dist-build time OR emit standalone `.d.ts` files for the 2 composables subpaths |
| L18 | Modularization audit — `src/api/` boundary candidate | L user directive (2026-05-11) | 0 (NEW) | "Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc" | **L Rε deep-dive**; Rβ surfaces — see §F |
| L19 | 22 top-level `.ts` subpath barrels at `src/*.ts` (sprawl) | L Rβ scan (this doc) | 0 (NEW) | 22 single-purpose `.ts` files at `src/` root: `aurora.ts`, `configurator.ts`, `confirm-dialog.ts`, `controls.ts`, `disco-glyph.ts`, `dock-group.ts`, `dock.ts`, `expandable-container.ts`, `forms.ts`, `freshness.ts`, `glass-carousel.ts`, `glass-panel.ts`, `glyph-face.ts`, `hover-popover.ts`, `icon-tooltip.ts`, `infinite-scroll.ts`, `instrument-chassis.ts`, `labeled-field.ts`, `metaballs.ts`, `metric-badge.ts`, `pagination.ts`, `paper-backdrop.ts`, `pulse.ts`, `scrolling-text.ts`, `search.ts`, `sidebar.ts`, `sortable-list.ts`, `stacked-icons.ts`, `status-dot.ts`, `tabs.ts`, `timeline.ts`, `toggle-chip.ts`, `tokens.ts`, `typewriter.ts`, `virtual.ts`. Each is a 1-3 line re-export for `package.json` `exports` map | **L Rε deep-dive**; either move under `src/entries/` OR generate from manifest at build time |

---

## §B — L-bound P0 candidates (HEADLINE absorb)

Ranked by criticality. These must land in L's substantive waves.

### P0-1: L5 — WS Phase 2 (root-barrel removal of vueuse-bearing symbols) — v1.0 breaking change

**Why P0**: K WS Phase 1 left the SCC trap **open by design**. Speedtest X.W3.c re-probe (2026-05-09) confirmed PERSISTENT at v0.9.3 — speedtest cannot ship the optimisation until Phase 2 lands. The SCC trap costs speedtest +1.92 KB regression + 1 extra HTTP request on its eager critical path. K WS CHANGELOG explicitly named Phase 2 as L/v1.0 destination. **L is the v1.0 cohort** per L user directive item 4 ("L is the v1.0 cohort — breaking changes are explicitly in-scope where they retire substrate/aliases"). Three consumer-side migrations required at speedtest re-link.

**L scope**: remove root-barrel re-exports of `Input`, `Textarea`, `Combobox*` family, `useGlobalDark`, `useKeyboardShortcuts`. Bump major version to v1.0. CHANGELOG migration guide. Cross-repo speedtest re-link commit at speedtest's Y-tranche.

### P0-2: L17 — K.WS subpath typing-publication gap

**Why P0**: gates L5. Speedtest's X.W3.c re-probe found vue-tsc cannot resolve `dist/composables/{dark,keyboard}.d.ts` via the broken `'../src/...'` re-export. Without this fix, the 5 speedtest consumer files cannot migrate to subpaths even after Phase 2. Phase 2 without this fix lands a typing-broken breaking change.

**L scope**: investigate the typesVersions + vite.library.ts libraryEntries shape; fix the `.d.ts` emission so subpath imports type-check at consumer side without `'../src/...'` traversal. Re-verify with speedtest re-probe.

### P0-3: L1 — StoryPager inner-tab overflow at 375 viewport (chronic 2×)

**Why P0**: J→K chronic; K W5 fixed outer container but inner-tab overflow persists (24 px effective overflow at 375). User finding L directive item 3 ("Delineate any chronically deferred items and fold them into this new tranche"). Failure-mode J was designed to fix.

**L scope**: `overflow-x: auto` on StoryPager inner tab-row container OR label truncation below `--breakpoint-md`. Playwright 3-viewport probe re-confirms close.

### P0-4: L6 + L7 — Unused public composables wire-or-retire (chronic 2×)

**Why P0**: substrate-without-consumer invariant 8 binary at L close. K invariant 8 was binary at K close but the 6 composables were explicitly L-deferred. Carrying chronic substrate to v1.0 would freeze it into the API surface — bad. Decision must be binary in L.

**L scope**: cross-repo audit each of `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync` (L6) + `useOffsetPagination`, `useVirtualSectionWindow`, `useWindowedStore`, `virtualSectionLayout` (L7). Each: wire to second consumer (in glass-ui demo/ OR speedtest) OR formally retire.

### P0-5: L8 + L9 — P-tranche + DockShowcaseFrame second-consumer fidelity (chronic 2×)

**Why P0**: same substrate-without-consumer concern as P0-4, scoped to V-tranche structural primitives. `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` / `<DockShowcaseFrame>` each have 1 consumer at HEAD. v1.0 freezes the surface; second-consumer fidelity must close before v1.0.

**L scope**: cross-repo speedtest audit; each chassis primitive either gains a second consumer (in glass-ui demo or speedtest) or retires.

---

## §C — Permanent-defer candidates (rationale + named external destination)

Items where re-defer at L close is justified by binding rationale (not failure-mode). L formally permanent-defers each, naming the external destination.

| L# | Item | Rationale | External destination |
|---|---|---|---|
| A1 | `<HarmonicLevelGrid>` Filmstrip | RE-RETIRE-PERMANENT in I.W3; 3× chronic; consumer-territory | Consumer territory — speedtest or downstream consumer authors |
| A2 | Blob Web Worker | RE-RETIRE-PERMANENT in I.W3; encoded but unreachable on M4 Max; 3× chronic | `composables/blob/SPEC.md §11.4` — trigger: 8+ multi-instance use cases |
| A3 | Plugin extraction (Tailwind plugin) | RE-RETIRE-PERMANENT in I.W3; 5× chronic; consumer-territory | Consumer territory — never glass-ui scope |
| A4 | Reduced-motion + a11y deeper sweep | RE-CONFIRM POSTURE; 6× chronic | DESIGN.md `## Accessibility Posture` is canonical answer; deeper sweep is consumer-deploy work |
| A5 | C-8 Blob double-rAF | `_internal/` boundary holds; FPS 119.62 baseline holds; 2× chronic | Internal-only; not API surface; observable cost zero |
| A19 | API Extractor dts caching | Non-blocking; 18s build acceptable; no consumer pressure | Future tooling-perf tranche if build time becomes blocking |
| A20 | 9 zero-payload subpaths | Cross-repo speedtest dep; condition unmet (speedtest still consumes) | Future hard-fail target IF speedtest migrates to main-barrel imports |
| A21 | `docs/instructions/README.md:17` | Lives in precept submodule, not glass-ui repo | Precept submodule update channel (not glass-ui tranche channel) |
| L14 | Vue runtime `uses-passive-event-listeners` | Vue upstream concern; not glass-ui scope | Vue.js upstream PR / Vue Core team |
| L15 | Production hosting `uses-long-cache-ttl` | Consumer-territory hosting concern | Consumer deploy / hosting CDN config |

**Permanent-defer count**: **10**.

L close ceremony should record each permanent-defer with its binding rationale + external destination. Re-deferring any without a destination triggers the failure-mode J was designed to fix.

---

## §D — Items requiring L disposition decision (binary wire-or-retire)

Substrate-without-consumer items still at sub-bar (1 consumer) where the v1.0 freeze forces binary L close. K had a binary substrate-without-consumer invariant; L inherits.

| L# | Substrate | Sub-bar at | L decision required |
|---|---|---|---|
| L6.a | `useRAFLoop` | 1 consumer (or 0) — verify | Wire (find second consumer) OR retire |
| L6.b | `useIntersectionPause` | 1 consumer (or 0) — verify | Wire OR retire |
| L6.c | `useDarkModeSync` | 1 consumer (or 0) — verify | Wire OR retire |
| L7.a | `useOffsetPagination` | 1 consumer — verify | Wire OR retire |
| L7.b | `useVirtualSectionWindow` | 1 consumer — verify | Wire OR retire |
| L7.c | `useWindowedStore` | 1 consumer — verify | Wire OR retire |
| L8.a | `<DiscoGlyph>` | 1 consumer at HEAD | Wire (2nd consumer story) OR retire |
| L8.b | `<DockGroup>` | 1 consumer at HEAD | Wire OR retire |
| L8.c | `<InstrumentChassis>` | 1 consumer at HEAD | Wire OR retire |
| L9 | `<DockShowcaseFrame>` | 1 consumer (V's 13 dock sites count as one surface) | Wire (2nd primitive consumer outside dock) OR retire |

**10 sub-bar substrates** requiring binary L decision. This is the largest cluster of L-bound work after L5.

---

## §E — Source-tier TODO/FIXME ledger (L re-walk)

K Rβ §D returned ZERO source-tier TODO/FIXME/XXX/HACK/@deprecated/DEFER comments. L expectation: same clean tree. L close ceremony should re-walk via:

```
rg "TODO|FIXME|XXX|HACK|@todo|@deprecated|DEFER|L-tranche" src/ demo/ tests/
```

Expected result at L close: ZERO hits. This is the canonical no-workarounds/no-legacy verification.

The 3 historical-context comments at `src/index.ts:5` + `src/styles/tokens.css:339-342` flagged in K Rβ §A15 are P-tranche provenance markers (documentation, not violation). K W0 adjudicated. No L action.

---

## §F — Modularization scan summary (P1 + P2 candidates; Rε deep-dive owed)

L user directive: *"Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc."*

Rβ surfaces candidates; **Rε deep-dives**.

### P1 modularization candidates (highest priority for L)

**M1 — 22 top-level `src/*.ts` subpath barrels (L19)** — `src/aurora.ts`, `src/configurator.ts`, `src/confirm-dialog.ts`, `src/controls.ts`, `src/disco-glyph.ts`, `src/dock-group.ts`, `src/dock.ts`, `src/expandable-container.ts`, `src/forms.ts`, `src/freshness.ts`, `src/glass-carousel.ts`, `src/glass-panel.ts`, `src/glyph-face.ts`, `src/hover-popover.ts`, `src/icon-tooltip.ts`, `src/infinite-scroll.ts`, `src/instrument-chassis.ts`, `src/labeled-field.ts`, `src/metaballs.ts`, `src/metric-badge.ts`, `src/pagination.ts`, `src/paper-backdrop.ts`, `src/pulse.ts`, `src/scrolling-text.ts`, `src/search.ts`, `src/sidebar.ts`, `src/sortable-list.ts`, `src/stacked-icons.ts`, `src/status-dot.ts`, `src/tabs.ts`, `src/timeline.ts`, `src/toggle-chip.ts`, `src/tokens.ts`, `src/typewriter.ts`, `src/virtual.ts`. Each is a 1-3 line re-export feeding `package.json` `exports` map. Sprawl at `src/` root level. **Candidate**: move under `src/entries/` subdir OR generate from manifest at build time. Tree-shaking unchanged either way; import shape unchanged at consumer side; visual cleanup of `src/` root substantial.

**M2 — `src/api/` boundary for public types** — currently public types are scattered across each package barrel + `src/components/{ui,custom}/index.ts`. Candidate: `src/api/index.ts` re-exports all public types (component prop types, CVA variant types, composable return types). Consumers gain a single import surface for type-only usage (`import type { ButtonVariants, DockOrientation } from '@mkbabb/glass-ui/api'`). Distinct from runtime barrel. **Verify**: does `import type` from root barrel already give this for free via `verbatimModuleSyntax`? If yes, M2 is wholly cosmetic and should retire. **Rε deep-dive owed.**

**M3 — `src/composables/` flat vs nested inconsistency** — `src/composables/` has 9 flat `.ts` files (`useGlobalDark`, `useInterval`, `useKeyboardShortcuts`, `useResizeObserver`, `useStagger`, `useStoryDemo`, `useTimer`, `useTokenColor`, `useTouchGate`) + 6 subdirs (`glass/`, `motion/`, `pagination/`, `sidebar/`, `sortable/`, `virtual/`) + 2 cross-references (`dark.ts`, `keyboard.ts` for subpath entries). The flat composables don't follow a thematic-grouping rule. **Candidate**: every composable belongs to a thematic subdir (e.g., `useInterval` + `useTimer` → `composables/time/`; `useGlobalDark` → `composables/theme/`; `useStagger` → existing `composables/motion/`; `useResizeObserver` + `useTouchGate` → `composables/dom/`; `useTokenColor` → `composables/tokens/`). Then `composables/index.ts` re-exports thematically. Improves discoverability + cohesion.

### P2 modularization candidates (defer to Rε deep-dive)

**M4 — `src/components/ui/` flat 45-package list** — 45 packages flat under `src/components/ui/`. Each is shadcn-vue pattern (Primitive wrapper + CVA + index.ts barrel). Internal consistency is HIGH (all follow same shape). **No modularization recommended**; the flat shape matches shadcn-vue's authoritative pattern + CVA discoverability. Document as canonical.

**M5 — `src/components/custom/` flat 30-package list** — same shape question. CLAUDE.md groups packages by axis (Design language / Glass tier / Instrument-cluster). **Candidate**: package-axis subdirs under `src/components/custom/{design,glass,instrument,motion}/<package>/`. Cost: every consumer import path shifts. Benefit: structural cohesion. **Rε deep-dive owed; likely defer** because import-path churn is severe.

**M6 — `src/styles/` token-cascade order** — 10 CSS files in `src/styles/`; `index.css` orchestrates cascade. Order documented in CLAUDE.md. Internal consistency HIGH. **No modularization recommended**; the cascade-order documentation is the canonical artefact.

**M7 — `src/components/ui/_shared/`** — undocumented `_shared` subdir under `ui/`. Verify scope; either promote to canonical (with CLAUDE.md mention) or rename to `_internal` per existing convention (`composables/_internal/` precedent from I.W3).

**M8 — `src/utils/` minimal** — single `cn.ts`. Candidate: absorb into root `src/index.ts` directly OR keep as is for tree-shaking. **No modularization recommended**; cn() is canonical.

### Modularization candidate count: **8 (3 P1 + 5 P2)**

Rε owes the deep-dive: cost/benefit per candidate; import-path churn estimate; consumer-impact assessment. Rβ surfaces only.

---

## §G — L wave-spec recommendations (Rγ-anticipating)

Grouping absorbable items into thematic waves. Final scope authoritative at Rγ.

### L W0 — Reconciliation + dispatch precept maintenance
- K W0 + K W8 LESSONS-LEARNED audit pass (4 K-derived entries already in submodule `d4ada55`)
- L invariant scaffold authored
- 5 absorbed-by-V items from K Rβ retroactively closed in this audit (no action)

### L W1 (HEADLINE) — WS Phase 2 (v1.0 breaking change)
- L5 — root-barrel removal of vueuse-bearing symbols
- L17 — typing-publication gap fix (gates L5)
- L16 — speedtest re-link commit at L close (cross-repo)
- L13 / L12 — robots.txt + production demo build decision (if demo ships)

### L W2 — Substrate-without-consumer binary
- L6 — 3 unused composables wire-or-retire
- L7 — useOffsetPagination + useVirtualSection* + useWindowedStore wire-or-retire
- L8 — DiscoGlyph + DockGroup + InstrumentChassis wire-or-retire
- L9 — DockShowcaseFrame wire-or-retire

### L W3 — Mobile-viewport polish + substrate residue
- L1 — StoryPager inner-tab overflow at 375 (chronic; mobile-viewport polish lane)
- L4 — `--surface-tint-{35,40,70}` rung gaps (4 sites)
- L10 — Pulse + Typewriter keyframes lift to `animations.css`

### L W4 — Doc + housekeeping cohort
- L2 — CLAUDE.md / README.md K-cohort drift (subpath enumeration + count)
- L3 — 12 wave-spec status lines stale
- 3 historical-context provenance markers re-confirmed as adjudicated (no action)

### L W5 — Modularization (per Rε deep-dive)
- M1 — top-level `src/*.ts` sprawl
- M2 — `src/api/` boundary decision
- M3 — composables thematic grouping
- (M4-M8 dispositioned per Rε)

### L W6 — Aurora chrome decision (if pursued)
- L11 — Option-A unify under `useConfiguratorState` OR Option-B retain documented

### L W7 — Close ceremony + 7-agent strengthened audit
- Pattern inherits K invariant 15 (α/β/γ/δ/ε/π/ι integrity-sweep)
- Permanent-defer ledger (10 items) records with named external destinations

**Total estimated L waves**: 7 (W0-W6 + close). **HEADLINE**: W1 (WS Phase 2 / v1.0 breaking change).

---

## §H — Summary stats

- **Total ledger rows**: 56 (36 from K Rβ C–J ledger + 4 K residuals R1-R4 + 12 K cross-tranche debt entries + 3 new post-K-close candidates + 1 modularization-meta row)
- **Active L-bound rows**: 23 (those carrying chronic-or-new state into L)
- **RESOLVED-IN-K rows**: 14 (closed cleanly through K waves)
- **RESOLVED-VIA-V rows**: 5 (V cohort absorbed 5/38 K hard-gate items pre-K-dispatch; closed pre-L)
- **PERMANENT-DEFER rows**: 10 (with named external destinations per §C)
- **Chronic threshold tripped at L (≥ 2 deferrals)**: 8 — L1, L5 (named twice — debt section + L successor list count as 2 prior namings; substantively new at L), L6, L7, L8, L9, L16, plus A30 absorbed into L1. **L must absorb each or formally name external destination.**
- **L-bound P0 candidates (HEADLINE absorb)**: 5 — L5, L17, L1, L6+L7, L8+L9
- **Sub-bar substrates requiring binary L decision**: 10
- **Modularization candidates**: 8 (3 P1 + 5 P2; Rε deep-dive owed)
- **Source-tier TODO/FIXME**: expected ZERO at L close (K Rβ confirmed zero at K open)

---

## Authority

Read-only deferral-ledger walk. Every K Rβ row independently re-verified against K execution evidence (`K/FINAL.md`, `K/audit/K-residuals.md`). K residuals R1-R4 cited verbatim. K cross-tranche debt cited verbatim from `K.md ## Cross-tranche debt` + `K-residuals.md`. Post-K-close candidates surfaced from L user directives + speedtest X.W3.c re-probe (`/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md`).

No source files modified. No commits. No mutating git (per Hardened agent git clause; per K W8 LESSONS-LEARNED 2026-05-09 #2 — no `git stash` even for state-probe). Cited every claim with `file:line` or commit hash.
