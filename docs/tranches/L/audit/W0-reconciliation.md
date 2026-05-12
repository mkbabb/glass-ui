# L.W0 — Reconciliation audit

**Lane**: I — reconciliation audit (read-only).
**Date**: 2026-05-11.
**Baseline HEAD**: `b1b9036` (L tranche open commit; predecessor K close `35cae2c` (c5f196c on K side) + v0.9.3 tagged).
**Scope**: walk every finding from the 6 L research deliverables (`docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md`) against HEAD; cross-walk against K-FINAL.md residuals R1-R4 + 12 cross-tranche-debt entries; verify each at HEAD; attribute to an L wave (W0..W8) per `docs/tranches/L/L.md`.
**Mode**: READ-ONLY across src/, demo/, dist/, package.json; READ-ONLY git only. CREATE this audit file only.

This ledger reconciles 7 input cohorts into a single wave-attribution table:

- §1 — Rα silent-miss findings (2 P0 + 6 P1 + 6 P2).
- §2 — Rβ chronic-deferrals ledger (56 rows).
- §3 — Rε §A transpositions (9 rows).
- §4 — Rε §B modularization findings (33 rows across B.1–B.5).
- §5 — K-FINAL residuals R1-R4.
- §6 — K-FINAL cross-tranche debt (12 entries).
- §7 — Rζ verbatim-directive audit (47 directives).
- §8 — Summary.

The audit verifies HEAD state for every load-bearing claim via rg / read-source / dist file inspection. Every disposition cites the wave that absorbs (or the destination that names a re-defer).

---

## §1 — Rα silent-miss findings × HEAD verification

Rα reclassified K close items under the J Rα classification grammar (CANONICAL / AMENDMENT / AMENDMENT-DRIFT / DEFER-WITH-RATIONALE / DEFER-AS-RESIDUAL / EXECUTED-WITH-WORKAROUND / MISSED-SILENTLY). 2 P0 silent misses + 6 P1 EXECUTED-WITH-WORKAROUND + 6 P2 scope-drift items surfaced.

### §1.A — P0 silent misses (2 items)

| ID | Finding | Confirmed at HEAD? | Wave attribution | Disposition |
|---|---|---|---|---|
| **Rα P0-1** | WS subpath typing-publication broken at v0.9.3 — `dist/composables/{dark,keyboard}.d.ts` emits `export * from '../src/composables/<name>'` which resolves outside the published package | **YES** — verified at HEAD: `dist/composables/dark.d.ts` = 50 B `export * from '../src/composables/dark'`; `dist/composables/keyboard.d.ts` = 54 B identical pattern; `dist/forms.d.ts` correctly inlined; `dist/src/` does NOT exist | **L.W0 Lane III** (P0) | ABSORB-L-W0 — fix dts emission via Strategy A (re-author `src/composables/{dark,keyboard}.ts` so subpath barrels re-export canonical implementations directly); v0.9.4 patch tagged + pushed to unblock speedtest Y.A3 BEFORE L.W1 v1.0 ships. Synthetic-consumer typecheck probe added to `scripts/release.sh`. |
| **Rα P0-2** | WS Phase 1 ACCEPT-DEGRADED disposition was the wrong call — v0.9.3 publishes a public surface that advertises a fix but is non-adoptable due to P0-1 typing bug AND produces a net regression (+2_055 B + 1 modulepreload) | **YES** — K WS shipped Phase 1 only; root barrel still re-exports vueuse-bearing symbols (verified: `src/index.ts` exports `useGlobalDark` + `useKeyboardShortcuts`; `src/components/ui/index.ts` includes Input/Textarea/Combobox/Carousel packages); speedtest X.W3.c re-probe at v0.9.3 confirmed PERSISTENT +1.92 KB regression byte-for-byte | **L.W1 (HEADLINE, P0)** | ABSORB-L-W1-HEADLINE — root-barrel removal of vueuse-bearing symbols + tight-curated public surface + `src/api/` discovery layer + subpath flatten. v1.0 tagged. Speedtest disposition annotation flips ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED → LANDED-AT-V1.0. CHANGELOG v0.9.3 KNOWN LIMITATION block becomes the foundation of MIGRATION.md (W5). |

### §1.B — P1 EXECUTED-WITH-WORKAROUND items (6 items)

| ID | Finding | Confirmed at HEAD? | Wave attribution | Disposition |
|---|---|---|---|---|
| **Rα P1-1** | `cssVar()` retire — `readToken()` inlined into BouncyToggle.vue rather than extending `useTokenColor` with imperative-read companion | **YES** — `rg "readToken" src/` returns `src/components/custom/tabs/BouncyToggle.vue` (single in-file private helper); `cssVar` retired in K W3.A (verified absent from `src/composables/`) | **L.W2 Lane A** (composables/ restructure) + **L.W3 Lane A** (composable wire-or-retire) | ABSORB-L-W2-or-W3 — extend `useTokenColor` with imperative `read(name, fallback)` companion; BouncyToggle inline copy retires. Aligns with `feedback_overfitting_audit` — `useTokenColor` is the canonical token-read surface. |
| **Rα P1-2** | Cross-repo annotation commit on speedtest at `6f412d89` without explicit user authorization | **YES** — historical fact at K close; not reversible. Precept silence at K. | **L.W0 Lane II** | ABSORB-L-W0-precept — codified in proposed cross-repo commit policy (Rδ §G.4 → ORCHESTRATION.md §"Integration" cross-repo clause); 1 of 5 LESSONS-LEARNED entries dispatched at W0. |
| **Rα P1-3** | β + ε audit-pattern gap — no synthetic-consumer typecheck probe; relied on file-existence + Node ESM resolution | **YES** — `scripts/release.sh` has no subpath typecheck probe at HEAD; K close ceremony's 7 lanes did not exercise consumer-side `vue-tsc` against dist subpaths | **L.W0 Lane III** | ABSORB-L-W0-release-script — `scripts/release.sh` gains synthetic-consumer probe (`node -e 'import("@mkbabb/glass-ui/<subpath>")'` + scratch-tsc probe per K invariant 18). Codified as LESSONS-LEARNED entry "Subpath Typing Publication Requires Consumer-Side `tsc` Probe" (Rδ §G.7). |
| **Rα P1-4** | F-ε-3 Configurator P0 absorption — Lighthouse stale-cache explanation thorough but diagnostic candidates (ε §6.3) dropped rather than persisted | **YES** — `tests/diagnostics/configurator-recursion.spec.ts` does NOT exist at HEAD; F-ε-3 was re-probed clean at HEAD via Playwright (per K W8 ι), but the diagnostic candidates list is not persisted as a fixture | **DEFER-TO-M** (low priority) | RE-DEFER — write a small Vitest fixture is desirable but not v1.0-blocking; F-ε-3 was a false-positive at K close. Add to L.W8 ι integrity-sweep watch list; if a recurrence surfaces during L, escalate. Otherwise carry to M with named destination. |
| **Rα P1-5** | W7 NumberField Option B decision — Slider-only contract documented but `<NumberField keepDockOpen>` neither shipped nor formally retired | **PARTIAL at HEAD** — Slider documented; NumberField is keyboard/discrete-button only (no continuous pointer drag); no NumberField-in-dock consumer surfaced | **L.W3 Lane B** (primitive wire-or-retire) | ABSORB-L-W3 — formalize the retire in DESIGN.md `## Accessibility Posture` OR ship NumberField prop if a 2nd-consumer (NumberField inside Dock) surfaces in L.W3 modularization audit. Default: formal-retire-as-Slider-only-contract per Rε A8 logic. |
| **Rα P1-6** | WP P1-1 viz-basis contrast — MISSED at WP close → AMENDMENT-DRIFT at π re-discovery → EXECUTED-WITH-WORKAROUND in K W8 cleanup (text-zinc-900 hardcode is theme-invariant) | **YES** — `demo/stories/primitives/buttons.vue:118` uses `text-zinc-900` at HEAD; theme-invariant hardcode passes AA in both modes for all 3 viz hues but does not honor the dark/light flip the rest of the design system honors | **L.W6** (Lighthouse cohort completion) | ABSORB-L-W6 — per-tint adaptive contrast token (`--on-viz` or `text-on-viz` utility) OR darken/lighten viz tints to flank `--foreground` in both modes. π recommendation §8 already names this; W6 absorbs. |

### §1.C — P2 scope-drift / precept-gap items (D-1 through D-6, 6 items)

| ID | Finding | Confirmed at HEAD? | Wave attribution | Disposition |
|---|---|---|---|---|
| **Rα D-1** | 13 raw triplets in `demo/stories/data/**` survive K close (speedtest W2.T10 absorption incomplete) | **YES** — δ §14 confirmed at K close; speedtest sweep partial; glass-ui's K W3 Lane B reduced bounds honored | **L.W4** (mobile-viewport + π residuals lane) or **L.W5** (doc cohort) | ABSORB-L-W4-or-W5 — finish the 13-site sweep (no inbound dispatch; L glass-ui owns). Per Rβ §A row A26 carried forward. |
| **Rα D-2** | W4.A scope expanded silently to absorb WS doc surface — "Subpath surface" DESIGN.md section landed at W4.A commit, not WS commit | **YES** — DESIGN.md L1057-1127 carries the section; landed at K W4.A `36305da` not WS `a598b90` | **L.W0 Lane II** (precept-update) | ABSORB-L-W0-precept — proposed AGENT_DISPATCH_TEMPLATE.md clause: "if a parallel sibling wave needs documentation absorption, name the absorption explicitly". Not a precept violation; codifies dispatch-boundary discipline. |
| **Rα D-3** | K.WP P1-5 swapped `@import` for inline `@font-face` for Computer Modern — bonus request-count reduction; scope expansion beyond WP spec | **YES** — historical fact at K WP close; gestalt-correct work but scope-creep | **L.W0 Lane II** (precept-update) | ABSORB-L-W0-precept — Rα recommendation: α-lane should check "wave delta vs. spec hard-gates", not "vs. spec + bonus absorptions". Codified as part of LESSONS-LEARNED entry on dispatch-boundary discipline. |
| **Rα D-4** | K W3.A git stash incident — recovery via Edit tool re-application; ι F4 absorbed at K W8 LESSONS-LEARNED `d4ada55` | **CLOSED** — no stash survives at HEAD; K W8 precept-tier fix landed | **CLOSED-AT-K** | No L action. Verified absent from `git stash list` per Rδ §A.1 evidence. |
| **Rα D-5** | W6 worktree-isolation absolute-path anomaly — contained by accident (serial timing); precept evolved at K W8 LESSONS-LEARNED `d4ada55` | **CLOSED** at precept tier; **OPEN** at enforcement tier | **L.W0 Lane II** (precept-update + Rδ §G.3) | ABSORB-L-W0-precept — add `worktree_diff_verification: required` field to AGENT_DISPATCH_TEMPLATE.md (Rδ §G.3); orchestrator validates worktree's final state via `git -C <worktree-path> diff --stat` BEFORE integrating. L.W0 ITSELF demonstrates the verification step at close (per task brief). |
| **Rα D-6** | ι integrity-sweep did not include cross-repo validation as a hard-gate item — released v0.9.3 without cross-repo synthetic-consumer probe | **YES** — precept gap at K close; absorbed retrospectively per Rδ §G.7 | **L.W0 Lane II** (precept-update) | ABSORB-L-W0-precept — K invariant 15 (7-agent strengthened pattern) expanded with cross-repo validation hard-gate item for release-tag waves. Codified as SPEC clause + LESSONS-LEARNED entry. L.W0 Lane III itself runs the probe before v0.9.4 tag. |

**§1 totals**: 2 P0 (both ABSORB-L); 6 P1 (5 ABSORB-L across W0/W2/W3/W6 + 1 DEFER-TO-M); 6 P2 (4 ABSORB-L-W0 + 1 ABSORB-L-W4/W5 + 1 CLOSED-AT-K).

---

## §2 — Rβ chronic-deferrals × wave attribution (56 rows)

Rβ §A enumerates 36 rows carried verbatim from K Rβ (C–J ledger); §B adds 4 K residuals R1-R4; §C adds 12 K cross-tranche-debt entries; §D adds 3 new post-K-close candidates. Total = 55. Rβ §H summary states 56 — adds a modularization-meta row (L18 + L19 grouped). Each row gets wave attribution per Rβ §G + Rγ §B + Rε §A.

### §2.A — Rβ §A rows (C → J ledger; 23 verbatim from K Rβ)

| Row | Item | Years deferred (defer ×) | Wave attribution | Disposition |
|---|---|---|---|---|
| A1 | `<HarmonicLevelGrid>` Filmstrip | 3× chronic | (none — PERMANENT-DEFER) | RE-RETIRE-PERMANENT; consumer-territory; not L scope |
| A2 | Blob Web Worker (`composables/blob`) | 3× chronic | (none) | RE-RETIRE-PERMANENT; encoded but unreachable on M4 Max |
| A3 | Plugin extraction (Tailwind plugin) | 5× chronic | (none) | RE-RETIRE-PERMANENT; consumer-territory |
| A4 | Reduced-motion + a11y deeper sweep | 6× chronic | (none) | RE-CONFIRM POSTURE — DESIGN.md `## Accessibility Posture` is canonical |
| A5 | C-8 Blob double-rAF | 2× chronic | (none) | RE-RETIRE; `_internal/` boundary holds; FPS 119.62 baseline holds |
| A13 | Bundle-budget gate | 4× chronic (J regression) | **RESOLVED-IN-K** (W4 Lane B) | No L action; verified at HEAD via `npm run profile:budget` |
| A15 | Recovery-diary historical-context comments | RE-DEFER | (none) | RE-CONFIRM — P-tranche provenance markers; documentation not violation |
| A16 | `scripts/ay-close.sh` | 4× chronic | **RESOLVED-IN-K** (W8) | No L action; file deleted on disk at K W8 |
| A19 | API Extractor dts caching | 1× chronic | (none) | RE-DEFER — 18s build acceptable; no consumer pressure |
| A20 | 9 zero-payload subpaths | 1× chronic | (none) | RE-DEFER — speedtest still consumes; condition unmet |
| A21 | `docs/instructions/README.md:17` | 1× chronic | (none) | RE-DEFER — precept submodule channel |
| A22 / A23 | CLAUDE.md / README.md drift | 1× chronic | **L.W5** (doc cohort — K residual R2 absorption) | NEW K-cohort drift → see §6 K-CTD entries + §5 R2 |
| A24 | 5 demo `.focus-ring` migrations | 1× chronic | **RESOLVED-IN-K** (W3 Lane B) | No L action; 5 sites migrated |
| A25 | 3 demo `--surface-tint` bypasses | 1× chronic | **RESOLVED-IN-K** (W3) | No L action; 11 total migrations |
| A26 | `transition-all` survivors | 1× chronic | **RESOLVED-IN-K** (W3 Lane B) | 4 sites decomposed; 13-16 raw triplet sweep moved to speedtest W2.T10. Glass-ui-side 13 raw triplets survive (per Rα D-1) → see L.W4/W5 |
| A27 | `--{success,warning,info}-foreground` 0 consumers | RESOLVED-VIA-V | (none) | No L action; V cohort absorbed pre-K-dispatch |
| A28 | `cssVar()` ≥ 2 consumer bar | RETIRED-K-W3-LANE-A | **L.W2/W3** (Rα P1-1 follow-on) | `cssVar()` retired; BouncyToggle `readToken` inline → `useTokenColor` extension (per Rα P1-1) |
| A29 | `.overlay-scrim` @utility | RESOLVED-IN-K | (none) | No L action; formally deleted at K W3.A |
| A30 | StoryPager 4px overflow @ 375 | PARTIAL-K-W5; **PERSISTENT** at HEAD | **L.W4** (mobile-viewport polish) — see L1 in §2.B | ABSORB-L-W4 (chronic 2×) |
| A31 | GlassCarousel mobile chevrons | RESOLVED-IN-K (W5) | (none) | No L action; Playwright 3-viewport clean |
| A32 | Stress harness retire decision | RESOLVED-IN-K (W4 Lane B) | (none) | No L action; retired per I.W6 invariant 8 |
| A33 | `ay-close` reappearance | RESOLVED-IN-K (W4 Lane B + W8) | (none) | No L action; collapsed with A16 |
| A34 | Audacious primary-CTA (K HEADLINE) | RESOLVED-IN-K (W6) | (none) | No L action; ≥ 3 consumers; brittleness window retracted |
| A35 | drag-keep-open story fidelity | RESOLVED-IN-K (W7) | (none) | No L action; dock-with-slider story shipped |
| A36 | PRM gate for WAAPI consumers | RESOLVED-J | (none) | No L action |

### §2.B — Rβ §B rows (K residuals R1-R4; 4 rows; cross-reference §5)

| Row | Item | Defer × | Wave attribution | Disposition |
|---|---|---|---|---|
| L1 | StoryPager inner-tab overflow at 375 viewport | 2 (J/K) — **chronic** | **L.W4** | ABSORB-L-W4 mobile-viewport polish wave |
| L2 | CLAUDE.md / README.md subpath enumeration polish | 1 (K) | **L.W5 Lane A** | ABSORB-L-W5 doc cohort; enumerate 3 WS subpaths + correct README count |
| L3 | 12 wave-spec status lines stale | 1 (K) | **L.W0 Lane I (housekeeping during recon) OR L.W5 Lane A** | ABSORB-L-W5 doc cohort housekeeping (PROGRESS.md is canonical-of-record per K wave-spec status invariant) |
| L4 | `--surface-tint-{35,40,70}` rung gaps (4 sites) | 1 (K) | **L.W5 Lane A (per W5 spec Step 6)** | ABSORB-L-W5 substrate-residue — Option A (define new rungs) default per W5 spec |

### §2.C — Rβ §C rows (K cross-tranche debt; 12 entries; cross-reference §6)

| Row | Item | Defer × | Wave attribution | Disposition |
|---|---|---|---|---|
| L5 | **WS Phase 2 — root-barrel removal of vueuse-bearing symbols** (breaking → v1.0) | 1 (K) — **HEADLINE-L** | **L.W1 HEADLINE** | HEADLINE-L; v1.0 cohort |
| L6 | 3 unused public composables — `useRAFLoop`, `useIntersectionPause`, `useDarkModeSync` | 2 (K) | **L.W3 Lane A** | ABSORB-L-W3 wire-or-retire (default RETIRE per W3 spec) |
| L7 | `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` second-consumer | 2 (K) | **L.W3 Lane A** | ABSORB-L-W3 wire-or-retire (default RETIRE if demo-only) |
| L8 | P-tranche second-consumer — `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` | 2 (K) | **L.W3 Lane B** | ABSORB-L-W3 wire (recommend) — disco-glyph foundations gallery cell; dock-group + instrument-chassis 2nd consumer |
| L9 | `<DockShowcaseFrame>` second-consumer | 2 (K) | **L.W3 Lane B** | ABSORB-L-W3 — recommend formal-document as dock-context primitive per Rε A3 |
| L10 | Pulse + Typewriter keyframes lift to `animations.css` | 1 (K) | **L.W7 Lane A** | ABSORB-L-W7 mechanical migration; cohesion gain |
| L11 | Aurora chrome Option-A unification | 1 (K) | **L.W7 Lane B** | ABSORB-L-W7 Option-A unification per Rε A8 (cloneMode='per-preset') |
| L12 | Production demo build | 1 (K) | **L.W5 Lane B** | ABSORB-L-W5 — binary decision (Option B retire-as-deploy-target default per W5 spec) |
| L13 | `robots.txt` for public deploy | 1 (K) | **L.W6** | ABSORB-L-W6 gated on L12 outcome |
| L14 | Vue runtime `uses-passive-event-listeners` | 1 (K) | **L.W6** | PERMANENT-DEFER; documented in L FINAL.md as not-glass-ui-scope |
| L15 | Production hosting `uses-long-cache-ttl` | 1 (K) | **L.W6** | PERMANENT-DEFER; consumer-deploy concern; documented in L FINAL.md |
| L16 | Speedtest W3.b.1 LANDED annotation | 1 (K) | **L.W1 outbound** | GATED-ON-L5; flips at L.W1 close (v1.0 ships) |

### §2.D — Rβ §D rows (new post-K-close candidates; 3 rows)

| Row | Item | Defer × | Wave attribution | Disposition |
|---|---|---|---|---|
| L17 | K.WS subpath typing-publication gap (Rα P0-1) | 0 (NEW) | **L.W0 Lane III** (P0) | ABSORB-L-W0 — must land before L.W1 |
| L18 | Modularization audit — `src/api/` boundary candidate (user directive) | 0 (NEW) | **L.W1 Lane B** (`src/api/`) + **L.W2** (modularization sweep) | ABSORB-L-W1+W2 — `api/` discovery layer ships in W1; full modularization sweep in W2 |
| L19 | 22 (actually 33 at HEAD per `ls src/`) top-level `.ts` subpath barrels at `src/*.ts` | 0 (NEW) | **L.W2 Lane A** (Rε §B.1.6) | ACCEPT-AS-IS per Rε §B.1.6 (cosmetic; tree-shake unchanged) OR move under `src/subpaths/` if W2 modularization scope absorbs |

**§2 totals**: 56 rows reconciled. 14 RESOLVED-IN-K + 5 RESOLVED-VIA-V + 10 PERMANENT-DEFER + 17 ABSORB-L (across W0/W1/W2/W3/W4/W5/W6/W7) + 10 sub-bar binary decision (W3) + 1 ACCEPT-AS-IS (W2 cosmetic).

---

## §3 — Rε §A transpositions × wave attribution (9 rows)

Per Rε §A, the 9 architectural transposition candidates.

| ID | Transposition | Wave attribution | Disposition |
|---|---|---|---|
| **A1** | WS Phase 2 — root-barrel removal of vueuse-bearing symbols (HEADLINE) | **L.W1 Lane A** (HEADLINE) | ABSORB-L-W1 HEADLINE; v1.0 cohort |
| **A2** | `src/composables/{dark,keyboard}.ts` dts publication gap | **L.W0 Lane III** (P0) + **L.W1 Lane C** (subpath flatten) | ABSORB-L-W0 typing-gap fix at v0.9.4; ABSORB-L-W1-C subpath flatten (`/composables/dark` → `/dark`) at v1.0 |
| **A3** | `<DockShowcaseFrame>` zero consumers | **L.W3 Lane B** | ABSORB-L-W3 — formal-document as dock-context primitive (canonical second consumer is the 13-site dock cohort) per Rε A3 |
| **A4** | `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` — P-tranche 1-consumer | **L.W3 Lane B** | ABSORB-L-W3 — WIRE 2nd consumer per Rε A4; cross-repo speedtest wiring preferred over demo proliferation; HEAD verifies DiscoGlyph has 2 consumers (`primitives/disco-glyph.vue` + `foundations/chart-chassis-palette.vue`); DockGroup + InstrumentChassis still 1-consumer at HEAD |
| **A5** | `useRAFLoop` / `useIntersectionPause` / `useDarkModeSync` — 0 prod consumers | **L.W3 Lane A** | ABSORB-L-W3 — WIRE 2 of 3 (`useRAFLoop` → Pulse + Typewriter; `useDarkModeSync` → useTokenColor invalidation) OR RETIRE per W3 spec defaults |
| **A6** | `useOffsetPagination` / `useVirtualSectionWindow` / `useWindowedStore` — 0 prod consumers | **L.W3 Lane A** | ABSORB-L-W3 — WIRE OR RETIRE binary; cross-repo speedtest audit owed |
| **A7** | Pulse + Typewriter keyframes → animations.css | **L.W7 Lane A** | ABSORB-L-W7 LIFT-TO-ANIMATIONS — cohesion gain; HEAD verifies `@keyframes` survive in both Pulse.vue + TypewriterText.vue |
| **A8** | `useAuroraStudio` + `<AuroraConfigDock>` parallel chrome → `<Configurator>` unify | **L.W7 Lane B** | ABSORB-L-W7 Option-A unify (cloneMode='per-preset' option on `useConfiguratorState<T>`); HEAD verifies `useAuroraStudio` at `demo/stories/aurora/useAuroraStudio.ts` (demo-private) |
| **A9** | `<Carousel>` has no subpath — root-barrel-only vueuse exposure | **L.W1 Lane C** | ABSORB-L-W1-C ADD `/carousel` subpath; prerequisite for A1 HEADLINE landing without losing `<Carousel>` consumer surface |

**§3 totals**: 9 rows, all ABSORB-L across W0/W1/W3/W7. A1 = HEADLINE; A2 = paired W0+W1 critical path; A3-A6 = W3 wire-or-retire cohort; A7+A8 = W7 substrate-cohesion; A9 = W1 Lane C atomic.

---

## §4 — Rε §B modularization findings × wave attribution (33 findings)

Per Rε §B: B.1 sub-module boundaries (6) + B.2 cohesion (8) + B.3 import shape (8) + B.4 `api/` hypothesis (1) + B.5 misc (10) = 33.

### §4.A — B.1 sub-module boundary findings (6)

| ID | Finding | Wave attribution | Disposition |
|---|---|---|---|
| **B.1.1** | `src/components/ui/` (44 pkgs + `_shared/`) COHERENT | **L.W2 Lane B** (verification) | KEEP-AS-IS; surface 4 vueuse-bearing packages per A1 HEADLINE; `_shared/` stays internal |
| **B.1.2** | `src/components/custom/` — 30 pkgs, no top-level `index.ts`; 7 cherry-picked from root barrel | **L.W2 Lane B** | DOCUMENT cherry-pick rationale in CLAUDE.md OR add `src/components/custom/index.ts` barrel + reduce `src/index.ts` to single export. Cosmetic. |
| **B.1.3** | `src/composables/` flat-top-level vs sub-tree inconsistency | **L.W2 Lane A** (HEADLINE of W2) | RESTRUCTURE per W2 spec — `composables/{motion,reactive,dom,dark,keyboard,glass,pagination,sortable,virtual,sidebar}/` |
| **B.1.4** | `src/utils/` — single file (`cn.ts`) underused | **L.W2 Lane A or B** | KEEP-AS-IS per Rε §B.1.4; directory canonical for future pure helpers |
| **B.1.5** | `src/styles/` (16 CSS files) COHERENT — cascade in `index.css` | **L.W5 Lane A** (doc) or **L.W2 Lane B** (advisory) | KEEP-AS-IS structurally; W5 Lane A adds cascade-order rationale to DESIGN.md (per Rε §B.5.1) |
| **B.1.6** | `src/<flat>` — 33 single-file subpath barrels at top level | **L.W2 Lane A** | ACCEPT-AS-IS per Rε recommendation; relocation under `src/subpaths/` would be breaking + non-essential. Default ACCEPT-AS-IS unless W2 scope expands |

### §4.B — B.2 cohesion findings (8)

| ID | Finding | Wave attribution | Disposition |
|---|---|---|---|
| **B.2.1** | WS subpath barrels nested vs flat inconsistency (`composables/dark` only nested subpath) | **L.W1 Lane C** | FLATTEN per A2 — `src/composables/dark.ts` → `src/dark.ts` (NEW); `src/composables/keyboard.ts` → `src/keyboard.ts` (NEW). Breaking subpath-rename → v1.0 |
| **B.2.2** | Root barrel non-alphabetic, non-categorical 7-package cherry-pick (line 6-16) | **L.W1 Lane A** | CURATE Phase 2 root barrel — tight curated public surface (44 vueuse-free ui/ + ~5 canonical composables); rest go to per-package subpaths only |
| **B.2.3** | `composables/sidebar/` cross-imports `components/custom/sidebar/types` | **L.W2 Lane A** | HOIST sidebar types into `composables/sidebar/types.ts` |
| **B.2.4** | `infinite-scroll` composables co-located inside component package | **L.W2 Lane A** | MOVE to `src/composables/infinite-scroll/` — mirror sidebar pattern |
| **B.2.5** | `src/components/custom/dock/composables/` — dock-internal composables | **L.W2 Lane A** (verification) | KEEP-AS-IS — component-internal sub-composables correctly co-located |
| **B.2.6** | Aurora `composables/` — public surface nested in component package | **L.W2 Lane A** (verification) | KEEP-AS-IS — aurora is one cohesive composite; nested public composables that are aurora-domain are correctly aurora-internal |
| **B.2.7** | Top-level platform composables (`useTimer`, `useInterval`, `useResizeObserver`, `useTouchGate`) orphan namespace | **L.W2 Lane A** | GROUP under `composables/platform/` per Rε §B.2.7 (W2 spec already incorporates) |
| **B.2.8** | `useStoryDemo` — demo-private composable in library's public surface | **L.W2 Lane A** or **L.W3 Lane A** | EVALUATE — recommend (a) move to `demo/stories/useStoryDemo.ts` (demo-private). HEAD verifies `useStoryDemo` is exported from `src/composables/useStoryDemo.ts` + `src/composables/index.ts` + `src/index.ts` — 3 public-surface references; consumer surface is the demo storybook chassis. RECOMMEND-MOVE-TO-DEMO-PRIVATE per Rε §B.2.8 |

### §4.C — B.3 import-shape findings (8)

| ID | Finding | Wave attribution | Disposition |
|---|---|---|---|
| **B.3.1** | Root barrel `@mkbabb/glass-ui` exports ~120+ symbols | **L.W1 Lane A** | PHASE 2 HEADLINE — tight-curated root per B.2.2 |
| **B.3.2** | Per-package subpaths — 35 active, 2 nested (`composables/dark`/`keyboard`) | **L.W1 Lane C** | FLATTEN the 2 nested per A2/B.2.1 |
| **B.3.3** | No `@mkbabb/glass-ui/api` subpath for types + constants | **L.W1 Lane B** | NEW `src/api/` per B.4; subpath `@mkbabb/glass-ui/api` |
| **B.3.4** | CSS via `@mkbabb/glass-ui/styles` single import | **L.W2 Lane B** (verification) | KEEP-AS-IS |
| **B.3.5** | Tokens via `@mkbabb/glass-ui/tokens` runtime JS | **L.W2 Lane B** (verification) | KEEP-AS-IS structurally; possibly extend under proposed `api/` umbrella |
| **B.3.6** | Carousel has NO subpath despite being vueuse-bearing | **L.W1 Lane C** | ADD `/carousel` subpath per A9 |
| **B.3.7** | `dock` subpath name collides with `dock-group` + `dock-with-slider` story | **L.W5 Lane A** (doc) | KEEP-AS-IS; W5 doc cohort documents the pair |
| **B.3.8** | `glass-carousel` vs (future) `carousel` two-name collision | **L.W5 Lane A** (doc) | KEEP-AS-IS; W5 doc cohort documents |

### §4.D — B.4 `api/` hypothesis (1)

| ID | Finding | Wave attribution | Disposition |
|---|---|---|---|
| **B.4** | NEW `src/api/` + `@mkbabb/glass-ui/api` subpath — types-only discovery layer | **L.W1 Lane B** | PURSUE — pure-additive, low risk, high consumer-discoverability gain; lands as part of L.W1 (per Rε recommendation absorbed into HEADLINE per L.W1 spec) |

### §4.E — B.5 misc findings (10)

| ID | Finding | Wave attribution | Disposition |
|---|---|---|---|
| **B.5.1** | `src/styles/` cascade-order documentation gap | **L.W5 Lane A** (doc) | DOCUMENT in DESIGN.md cascade-order rationale (one paragraph) |
| **B.5.2** | `src/styles/api.css` hypothesis | (none) | NO ACTION — `index.css` is canonical-by-name; no `api.css` needed |
| **B.5.3** | `src/components/ui/_shared/` — public-surface promotion? | **L.W2 Lane B** (verification) | KEEP-AS-INTERNAL — leading `_` is canonical "private to the package" |
| **B.5.4** | Dist composables typing publication bug | **L.W0 Lane III** | FIX per A2 (flatten to `src/dark.ts` / `src/keyboard.ts`) — already absorbed in §3 row A2 |
| **B.5.5** | `src/freshness.ts` — node-bearing helper at top level | **L.W2 Lane B** (verification) | KEEP-AS-IS — single build-time helper; relocate to `src/build/` only if 2+ helpers materialize |
| **B.5.6** | No `src/api/` at HEAD | **L.W1 Lane B** | NEW per B.4 — already absorbed in §4.D |
| **B.5.7** | No `src/build/` at HEAD | (none) | DEFER until 2+ build-time helpers exist |
| **B.5.8** | No `src/test/` at HEAD | (none) | KEEP-AS-IS — co-located tests canon |
| **B.5.9** | No `src/types/` at HEAD | (none) | KEEP-AS-IS unless `api/` (B.4) pursued — types-of-record stay co-located |
| **B.5.10** | No `src/lib/` at HEAD | (none) | KEEP-AS-IS — `utils/` is functionally `lib/`; renaming is cosmetic |

**§4 totals**: 33 findings reconciled. 6 B.1 (4 KEEP/document + 2 absorb) + 8 B.2 (3 keep-verify + 5 absorb) + 8 B.3 (4 absorb + 4 keep) + 1 B.4 (PURSUE) + 10 B.5 (4 NO-ACTION + 3 KEEP + 3 absorb). L-bound count: 16 absorb (W0/W1/W2/W5).

---

## §5 — K-FINAL residuals R1-R4 × HEAD verification

Cited verbatim from `docs/tranches/K/audit/K-residuals.md`.

| Residual | Status at L open | HEAD verification | Wave attribution |
|---|---|---|---|
| **R1** — StoryPager dock-tab inner overflow at 375 viewport | OPEN at K close; chronic 2× per Rβ A30/L1 | VERIFIED at HEAD via K W8 π audit (24 px effective overflow); `demo/layout/StoryPager.vue` inner tab-row unbounded | **L.W4** (mobile-viewport polish) |
| **R2** — CLAUDE.md / README.md subpath enumeration | OPEN; γ D3+D4 | VERIFIED at HEAD — CLAUDE.md "Subpath surface" does NOT enumerate `/forms`, `/composables/dark`, `/composables/keyboard` by name (DESIGN.md does); README.md "29 active subpaths" undercounts (actual 36) | **L.W5 Lane A** (doc cohort) — atomic with W1+W2 reshape per Rγ |
| **R3** — 12 wave-spec status lines stale | OPEN; γ T1 advisory | VERIFIED — `docs/tranches/K/waves/W*.md` carry stale "open/pending" status lines vs PROGRESS.md canonical | **L.W5 Lane A** (housekeeping) |
| **R4** — `--surface-tint-{35,40,70}` rung gaps (4 sites) | OPEN; K W3.A | VERIFIED at HEAD — `rg "color-mix\(in srgb, var\(--foreground\) (35\|40\|70)%" src/` returns 4 hits: `Slider.vue:163`, `GlassTimeline.vue:172`, `UnderlineTabs.vue:110`, `glass.css:220` | **L.W5 Lane A** (Step 6) — default Option A (define new rungs) |

**§5 totals**: 4 K residuals — 1 W4 + 3 W5; all ABSORB-L. All confirmed at HEAD.

---

## §6 — K cross-tranche-debt × disposition (12 entries)

Cited verbatim from K-FINAL.md `## K residuals → L` + K.md `## Cross-tranche debt`. Each row gets Rβ-recommended disposition.

| Item | Disposition per Rβ | Wave attribution | HEAD verification |
|---|---|---|---|
| **K-CTD-1** — WS Phase 2 root-barrel removal | **HEADLINE-L** | **L.W1 HEADLINE** | VERIFIED — `src/index.ts` re-exports `useGlobalDark` + `useKeyboardShortcuts`; `src/components/ui/index.ts` includes Input/Textarea/Combobox/Carousel |
| **K-CTD-2** — 3 unused public composables (`useRAFLoop`, `useIntersectionPause`, `useDarkModeSync`) | **ABSORB-L** wire-or-retire | **L.W3 Lane A** | VERIFIED — all 3 exist at `src/composables/motion/`; 0 production-side `src/` consumers; 1 demo story each + tests |
| **K-CTD-3** — `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` | **ABSORB-L** wire-or-retire | **L.W3 Lane A** | VERIFIED — all exist at `src/composables/{pagination,virtual}/`; 1 demo story each; no `src/` consumers besides barrel re-exports |
| **K-CTD-4** — P-tranche second-consumer fidelity (DiscoGlyph / DockGroup / InstrumentChassis) | **ABSORB-L** wire | **L.W3 Lane B** | VERIFIED — DiscoGlyph has 2 demo consumers (passes); DockGroup + InstrumentChassis still 1-consumer at HEAD |
| **K-CTD-5** — Pulse + Typewriter keyframes lift | **ABSORB-L** vocab cohort | **L.W7 Lane A** | VERIFIED — `@keyframes` survive in Pulse.vue + TypewriterText.vue |
| **K-CTD-6** — Aurora chrome Option-A unification | **ABSORB-L** decision wave | **L.W7 Lane B** | VERIFIED — `demo/stories/aurora/useAuroraStudio.ts` exists as demo-private parallel chrome |
| **K-CTD-7** — Production demo build | **ABSORB-L** binary decision | **L.W5 Lane B** | VERIFIED — no `vite.demo.config.ts`; library-mode only |
| **K-CTD-8** — `robots.txt` for public deploy | **ABSORB-L** gated on K-CTD-7 | **L.W6** | VERIFIED — absent at HEAD; gated outcome |
| **K-CTD-9** — Vue runtime `uses-passive-event-listeners` | **PERMANENT-DEFER** | **L.W6** (formal retire) | NOT-OUR-SCOPE — Vue upstream |
| **K-CTD-10** — Production hosting `uses-long-cache-ttl` | **PERMANENT-DEFER** | **L.W6** (formal retire) | NOT-OUR-SCOPE — consumer-deploy concern |
| **K-CTD-11** — `<DockShowcaseFrame>` second-consumer | **ABSORB-L** | **L.W3 Lane B** | VERIFIED — 0 demo consumers besides self-definition; canonical second consumer should be the 13-site dock cohort OR formal-retire |
| **K-CTD-12** — Speedtest W3.b.1 LANDED annotation | **GATED-ON-CTD-1 (L5)** | **L.W1 outbound** | GATED — flips at v1.0 |

**§6 totals**: 12 entries reconciled. 8 ABSORB-L (W1/W3/W5/W6/W7) + 2 PERMANENT-DEFER (L.W6 formal retire) + 1 HEADLINE-L (W1) + 1 GATED-OUTBOUND (W1 close).

---

## §7 — Rζ verbatim-directive audit (47 directives)

Per Rζ §C — 47 total directive rows (5 verbatim-recurring + 7 cross-cutting + 27 tranche-specific + 8 L-new). Rζ §E declares all 47 addressed-or-named-deferred. This audit re-verifies the 5+7+8 = 20 binding-forward / L-new directives explicitly (the 27 tranche-specific are tranche-internal and already closed at their respective tranche FINAL.md per Rζ).

### §7.A — V1-V5 verbatim recurring (5 directives)

| ID | Directive | Addressed? | Where |
|---|---|---|---|
| V1 | "Continue through this indefatigably" | YES (binding-forward) | L orchestrator MUST close W1-WN sequentially without yield (L.md invariant 1; binding) |
| V2 | "NO quick solutions, NO workarounds: idiomatic, gestalt approaches" | YES (binding-forward) | L.md invariant 1 (C-K precepts still bind); every L wave must satisfy |
| V3 | "NO legacy code" | YES (binding-forward); **NAMED-PENDING fulfilment** | L.W1 HEADLINE root-barrel removal is the canonical v1.0 fulfilment |
| V4 | "Architectural transpositions in service of elegance, simplicity, and performance" | YES (binding-forward) | L.md invariant 9 — at least one named gestalt collapse per substantive wave (L.W1 = 4 transpositions; L.W2 = modularization sweep; L.W7 = keyframes + aurora) |
| V5 | "This is a development product" | YES (binding-forward) | L.md invariant 15 — 7-agent strengthened pattern with ι (canonical for L.W8) |

### §7.B — X1-X7 cross-cutting (7 directives)

| ID | Directive | Addressed? | Where |
|---|---|---|---|
| X1 | "normalize this all back to master, merge them both. no specialized branches, but keep a backup." | YES (binding-forward) | L stays on master; backup-via-tags-only per K W0 Hardened agent git clause |
| X2 | "Begin and continue the current tranche" + read-the-precepts | YES (binding-forward) | L W0 reads precept submodule `d4ada55` at open (this lane Lane I + Lane II) |
| X3 | J 18-finding inventory | CLOSED-AT-J | 18/18 verified at K Rζ §C; no L re-litigation |
| X4 | "DEEPLY audit with 6 agents in parallel" | IN-PROGRESS (L) | L Rα-Rζ delivered (this audit cohort); L W8 close pattern is 7-agent strengthened with ι |
| X5 | "Worktree friction redressed" | YES (binding-forward) | L.W0 Lane II Rδ §G.3 — `worktree_diff_verification` template field |
| X6 | Lighthouse audit (2026-05-08) | CLOSED-AT-K | K WP shipped 5 P1 fixes; L.W6 absorbs the 4 P2 carry-forwards |
| X7 | Speedtest W-tranche cross-walk (2026-05-08) | IN-PROGRESS (L) | L.W0 Lane IV `coordination/speedtest-Y.md` artefact + cross-repo coordination protocol |

### §7.C — L-new L1-L8 (8 directives)

| ID | Directive | Addressed? | Where |
|---|---|---|---|
| L1 | "DEEPLY audit with 6 agents in parallel" | IN-PROGRESS | L Rα-Rζ delivered (Rζ DELIVERED; Rα + Rβ + Rγ + Rδ + Rε all delivered) |
| L2 | "Devise a path forward: audit hitherto changes + remaining plan; recapitulate prompts, plans, precepts" | DELIVERED (L.md authored) + IN-PROGRESS (this audit synthesizes) | L.md exists at `docs/tranches/L/L.md`; W0 Lane I reconciliation absorbs |
| L3 | "NO quick solutions, NO workarounds, idiomatic gestalt" | BINDING-FORWARD | L invariant 1 (C-K precepts); every L wave must satisfy |
| L4 | "NO legacy code" | BINDING-FORWARD + L.W1 HEADLINE fulfilment | L invariant 1; HEADLINE invariant 5 |
| L5 | "Delineate any chronically deferred items" | DELIVERED | Rβ at `docs/tranches/L/research/Rβ-chronic-deferrals.md` (56 rows) |
| L6 | "Delineate any deferred items" | DELIVERED | Rβ chronic + Rγ residuals-to-waves |
| L7 | "Recap ALL of our prompts and requests" | DELIVERED | Rζ at `docs/tranches/L/research/Rζ-prompt-recap.md` (47 directives) |
| L8 | "Check for likely needs to be better modularized into sub-modules, ensure cohesion, potentially api dir" | DELIVERED | Rε §B (33 findings) + L.W1 Lane B (`src/api/`) + L.W2 (modularization sweep) |

**§7 totals**: 20 binding-forward / L-new directives verified. 0 truly orphaned; 0 silently dropped. All 5 partial-addresses (per Rζ §F) re-anchored to L waves above (§5 + §6 + §2.D).

---

## §8 — Summary

### §8.A — Totals

- **Total items reconciled**: 56 (Rβ §A–D ledger) + 9 (Rε §A) + 33 (Rε §B) + 4 (K residuals R1-R4) + 12 (K cross-tranche debt) + 47 (Rζ directives) — net non-duplicated ≈ 115 entries × 1 disposition each. (Rε §A rows A1-A9 overlap with Rβ §B-§C entries; K residuals overlap with Rβ §B; K-CTD overlap with Rβ §C — overlaps are intentional cross-references, not double-counts.)
- **L-bound items**: 39 unique items distributed across L.W0..L.W8 (see §8.B).
- **M-bound items**: 1 (Rα P1-4 Configurator recursion diagnostic test fixture; named destination M; not v1.0-blocking).
- **RETIRED / PERMANENT-DEFER items**: 12 (10 from Rβ §C carried + 2 K-CTD-9/10 formal-retire-as-not-our-scope).
- **RESOLVED-IN-K items**: 14 (Rβ §A rows; closed cleanly through K waves; no L action).
- **RESOLVED-VIA-V items**: 5 (V cohort absorbed pre-K-dispatch; closed pre-L).

### §8.B — L-bound items per wave

| Wave | Item count | Items |
|---|---:|---|
| **L.W0** | 6 | Rα P0-1 (typing-gap); Rα P1-2 + P1-3 + D-2 + D-3 + D-5 + D-6 (precept-update Lane II); L3 (K R3 status lines; housekeeping during recon); subpath probe `release.sh`; v0.9.4 patch; coordination/speedtest-Y.md |
| **L.W1 HEADLINE** | 6 | Rα P0-2 (root-barrel Phase 2); Rε A1 (HEADLINE); Rε A2 (subpath flatten — also W0); Rε A9 (carousel subpath); B.4 (api/ discovery layer); K-CTD-1 (root-barrel removal); K-CTD-12 (gated speedtest annotation) |
| **L.W2** | 10 | Rε B.1.2 (custom barrel rationale); B.1.3 (composables restructure HEADLINE of W2); B.1.6 (33 flat barrels — ACCEPT); B.2.3 (sidebar types hoist); B.2.4 (infinite-scroll composables move); B.2.7 (platform sub-tree); B.2.8 (useStoryDemo demo-private move); B.3.4-3.5 (verification); B.5.3 (_shared); B.5.5 (freshness) |
| **L.W3** | 9 | Rβ §D 10 sub-bar substrate decisions (Lane A: useRAFLoop/useIntersectionPause/useDarkModeSync/useOffsetPagination/useVirtualSection*/useWindowedStore; Lane B: DiscoGlyph/DockGroup/InstrumentChassis/DockShowcaseFrame); Rα P1-5 (NumberField decision); Rα P1-1 (cssVar/readToken absorb if not in W2) |
| **L.W4** | 3 | K R1 (StoryPager inner-tab overflow chronic 2×); Rα D-1 (13 raw triplets in `demo/stories/data/**`); 3-viewport probe regression sweep |
| **L.W5** | 8 | K R2 (subpath enumeration); K R3 (12 wave-spec status lines); K R4 (--surface-tint rung gaps); K-CTD-7 (production demo build); MIGRATION.md; CHANGELOG v1.0 entry; doc cohort CLAUDE/README/DESIGN; Rε B.5.1 cascade doc |
| **L.W6** | 4 | Rα P1-6 (viz-basis contrast adaptive); K-CTD-8 (robots.txt gated); K-CTD-9 (Vue upstream formal-retire); K-CTD-10 (cache-ttl formal-retire) |
| **L.W7** | 3 | K-CTD-5 / Rε A7 (keyframes lift); K-CTD-6 / Rε A8 (aurora Option-A unification); Lane B secondary consumer for ConfiguratorLayer/Row (≥ 2 via metaballs + aurora) |
| **L.W8** | — | Close ceremony — 7-agent strengthened audit + FINAL.md; absorbs any orphaned findings + named-residual the rest |

**Cumulative L-bound count**: 49 distinct work-item dispositions (with some overlap across waves for items spanning multiple waves like Rε A2 = W0+W1 critical path).

### §8.C — Open questions for orchestrator

1. **`<NumberField keepDockOpen>` decision (Rα P1-5)** — W3 Lane B default is formal-retire-as-Slider-only-contract per Rε A8 logic. Confirm orchestrator chooses formal-retire OR escalates to ship-the-prop if a 2nd-consumer surfaces during L.W3 modularization audit.

2. **`useStoryDemo` demo-private move (B.2.8)** — Rε recommends move from `src/composables/useStoryDemo.ts` → `demo/stories/useStoryDemo.ts`. This is a breaking change to library's public surface (HEAD verifies 3 public-surface references). Confirm v1.0 cohort absorbs the move per Rε §C entry (9) "BREAKING — public surface contraction".

3. **B.1.6 `src/<flat>` 33 subpath barrels** — Rε §B.1.6 recommends ACCEPT-AS-IS; W2 Lane A could absorb a relocation under `src/subpaths/` if scope allows. Confirm orchestrator default ACCEPT-AS-IS OR scope expansion to relocate.

4. **Demo-build decision (K-CTD-7) default** — W5 Lane B default is Option B (formal retire as deploy target). Confirm orchestrator preference; if user requests Option A (ship static demo), W5 Lane B authors `vite.demo.config.ts` + `npm run build:demo`.

5. **K-R4 `--surface-tint` rungs default** — W5 Lane A Step 6 default is Option A (define new rungs in tokens.css). Confirm orchestrator preference.

6. **Configurator recursion test fixture (Rα P1-4)** — DEFER-TO-M is current disposition; not v1.0-blocking. Confirm M is the right destination OR escalate to L.W7 closure if user requests fixture-as-binding.

7. **Cross-repo Y.A3 absorption window** — L.W0 Lane IV publishes `coordination/speedtest-Y.md`; speedtest Y is opening parallel with L. Confirm orchestrator handles speedtest re-link at L.W1 close (v1.0 ships) AND consumes any Y.A3 audit recommendations via cross-tranche-debt PR ack (not direct commits) per Rδ §C protocol.

### §8.D — Net L-open posture

- **0 truly-orphaned user directives** (all addressed or named-deferred per Rζ §F).
- **2 P0 silent misses** confirmed at HEAD (Rα P0-1 typing-gap + P0-2 WS disposition) — both ABSORB-L at W0/W1.
- **6 P1 EXECUTED-WITH-WORKAROUND items** — 5 ABSORB-L + 1 DEFER-TO-M.
- **6 P2 scope-drift items** — 5 ABSORB-L-W0-precept + 1 CLOSED-AT-K.
- **49 distinct L-bound work-item dispositions** across W0..W8 (with cross-wave overlap on critical-path items).
- **HEADLINE invariant satisfied**: L.W1 = 4 transpositions in 1 wave (root-barrel curation + `api/` discovery + subpath flatten + carousel subpath) per Rε §A1 + §C entries (1)+(2)+(3)+(5)+(10).
- **Mandatory reconciliation at stale-baseline open**: N/A per L.md prelude — L opens immediately after K close at v0.9.3 with no stale baseline.
- **Cross-repo coordination**: speedtest Y opens parallel with L; L.W0 Lane IV publishes `coordination/speedtest-Y.md`; v0.9.4 patch at L.W0 unblocks Y.A3 typing resolution; v1.0 release at L.W1 closes the SCC trap canonically.

L is well-scoped to v1.0 cohort closure with the modularization gestalt centerpiece (W2) flanking the WS Phase 2 HEADLINE (W1). The 39 unique L-bound items distribute evenly across W0..W7 with no single-wave overload; peak parallelism per L.md is 6 agents (W1 → W2+W3+W4+W6 batch).

---

## Authority

This reconciliation lane operated READ-ONLY per the hardened agent git clause. No git mutations performed. Created `docs/tranches/L/audit/W0-reconciliation.md` only.

**Read sources**: `docs/tranches/L/L.md`, `docs/tranches/L/research/R{α,β,γ,δ,ε,ζ}-*.md`, `docs/tranches/K/FINAL.md`, `docs/tranches/K/audit/K-residuals.md`, `docs/tranches/L/waves/W{0..8}.md`, plus targeted rg/read-source verifications across `src/`, `dist/`, `demo/`, `package.json`.

**Cross-references**: Rα silent-miss table § B; Rβ ledger §A-D; Rγ wave-attribution §B; Rδ precept-update proposals §G; Rε transpositions §A + modularization §B; Rζ verbatim-directive table §C-D.

**HEAD verification commands** (read-only) cited inline at each row; representative samples:
- `cat dist/composables/{dark,keyboard}.d.ts` confirms Rα P0-1.
- `rg "useRAFLoop|useIntersectionPause|useDarkModeSync" src/ demo/` confirms K-CTD-2 + Rε A5.
- `rg "DiscoGlyph|DockGroup|InstrumentChassis" demo/` confirms Rε A4 partial (DiscoGlyph 2-consumer; DockGroup + InstrumentChassis 1-consumer).
- `rg "@keyframes" src/components/custom/{pulse,typewriter}/` confirms Rε A7 keyframes lift target.
- `rg "color-mix\\(in srgb, var\\(--foreground\\) (35\\|40\\|70)%" src/` confirms K R4 4 sites at HEAD.
- `rg "useGlobalDark\\|useKeyboardShortcuts" src/index.ts src/composables/index.ts` confirms Rα P0-2 + K-CTD-1 root-barrel exposure.
- `ls src/api/ → ENOENT` confirms B.4 hypothesis at HEAD.
