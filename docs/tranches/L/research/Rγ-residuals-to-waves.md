# L — Research Rγ — Residuals-to-L-waves mapping

**Authored**: 2026-05-11.
**Lane**: γ — convert K residuals + cross-tranche-debt entries + 2026-05-09 X.W3.c finding + speedtest Y-emergent items into L wave-spec scope.
**Mode**: READ-ONLY on src/+demo/+tests/+docs/+CHANGELOG.md+package.json; write only on this file.
**Inputs**: K/FINAL.md, K/K.md cross-tranche-debt, K/audit/K-residuals.md, K/audit/K-audit-{γ,π,ε,δ,β,α,ι}-*.md, speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md, L/findings.md, AGENT_DISPATCH_TEMPLATE.md (Hardened agent git clause).
**Pattern source**: `docs/tranches/J/research/Rγ-residuals-to-waves.md` (J pattern) and `docs/tranches/K/research/Rγ-residuals-to-waves.md` (K pattern; the immediate predecessor).
**Hardened agent git clause**: only read-only git invocations.

---

## §A — Residual + cross-tranche-debt + new-finding inventory

Each item independently re-verified at HEAD `c5f196c` (K close commit). The ledger is split into four cohorts:

1. K named residuals (R1..R4 from K-residuals.md P1+P2).
2. K cross-tranche-debt (12 entries from K/FINAL.md `## K residuals → L` + K.md `Cross-tranche debt + explicit deferrals`).
3. 2026-05-09 X.W3.c speedtest re-probe finding (subpath-typing publication gap surfaced as glass-ui-side blocker).
4. Speedtest Y-tranche emergent items (cross-repo Y.A3 glass-ui-side research lane).

### §A.1 — K named residuals (FINAL.md P1+P2)

| # | Residual | Severity | Verified at HEAD | Source artefact |
|---|---|---|---|---|
| **K-R1** | StoryPager dock-tab inner overflow at 375 viewport (24 px) | P1 | YES — π audit §7 + `audit/K-audit-π-visual-runtime.md` Finding π-1 | `demo/layout/StoryPager.vue` inner tab row + `src/styles/dock.css` |
| **K-R2** | CLAUDE.md / README.md subpath enumeration polish (3 WS subpaths absent by name; README count 29 vs 36) | P2 | YES — γ audit D3+D4 | `CLAUDE.md` L188-214, `README.md` L150-166 |
| **K-R3** | 12 wave-spec status lines stale ("open"/"pending"/"planned") | P2 | YES — γ audit T1 (advisory) | `docs/tranches/K/waves/W*.md` + K.md wave-schedule status column |
| **K-R4** | `--surface-tint-{35, 40, 70}` rung gaps (4 sites) | P2 | YES — W3.A residual proof | `src/components/ui/slider/Slider.vue:163` (40); `src/components/custom/timeline/GlassTimeline.vue:172` (40); `src/components/custom/tabs/UnderlineTabs.vue:110` (70); `src/styles/glass.css:220` (35) |

### §A.2 — K cross-tranche-debt (K.md + FINAL.md)

| # | Item | Severity | Verified at HEAD | Source artefact / consumer notes |
|---|---|---|---|---|
| **K-CTD-1** | **WS Phase 2 — root-barrel removal of vueuse-bearing symbols** (breaking change → v1.0) | P0 (HEADLINE) | YES — root-barrel re-exports Input/Textarea/Combobox*/useGlobalDark/useKeyboardShortcuts at HEAD; speedtest +1.92 KB regression confirmed at X.W3.c byte-for-byte | `src/index.ts` (root barrel); `src/forms.ts` + `src/composables/{dark,keyboard}.ts` already exist as additive subpaths; SCC trap PERSISTS until Phase 2 |
| **K-CTD-2** | 3 unused public composables (`useRAFLoop`, `useIntersectionPause`, `useDarkModeSync`) | P1 | YES — Rε B5 in K (carried from J/I) | `src/composables/motion/{useRAFLoop, useIntersectionPause, useDarkModeSync}.ts` — 0 src/+demo consumers verified by `rg` |
| **K-CTD-3** | `useOffsetPagination` / `useVirtualSection*` / `useWindowedStore` second-consumer fidelity | P1 | YES — Rε B6 | `src/composables/pagination/` + `src/composables/virtual/` — single-consumer at HEAD |
| **K-CTD-4** | P-tranche second-consumer fidelity: `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` each 1-consumer at HEAD | P1 | YES — Rε B9 | `src/components/custom/{disco-glyph,dock-group,instrument-chassis}/` — each has 1 demo story consumer |
| **K-CTD-5** | Pulse + Typewriter keyframes lift to `animations.css` | P2 | YES — Rε B1 (component-local keyframes; cohesion gain) | `src/components/custom/typewriter/Typewriter.vue` + `src/components/custom/pulse/Pulse.vue` keyframes |
| **K-CTD-6** | Aurora chrome `useAuroraStudio` → `useConfiguratorState` Option-A unification | P2 (deferred) | YES — aurora retains parallel chrome | `demo/stories/aurora/useAuroraStudio.ts` (demo-private) + `src/components/custom/configurator/useConfiguratorState.ts` |
| **K-CTD-7** | Production demo build decision (ship static deploy target OR formally retire) | P2 (Lighthouse-deferred) | YES — `npm run build` is library-mode; no `vite.demo.config.ts` | `vite.config.ts` + `vite.library.ts` + package.json scripts |
| **K-CTD-8** | `robots.txt` for public deploy | P2 (Lighthouse P2-2) | YES — absent at HEAD; gated on K-CTD-7 | `public/robots.txt` (new) — gated on demo deploy target decision |
| **K-CTD-9** | Vue runtime upstream `uses-passive-event-listeners` | P2 (Lighthouse P2-3) | NOT-OUR-SCOPE — Vue upstream | n/a |
| **K-CTD-10** | Production hosting `uses-long-cache-ttl` | P2 (Lighthouse P2-4) | YES — gated on K-CTD-7 | hosting config (CDN headers); not in-repo |
| **K-CTD-11** | `<DockShowcaseFrame>` second-consumer audit | P1 | YES — 0 demo consumer at HEAD; per K δ §14 | `demo/stories/DockShowcaseFrame.vue` (defined) — needs ≥ 1 demo story consumer OR retire |
| **K-CTD-12** | Speedtest W3.b.1 LANDED annotation deferral | P0 cross-repo | YES — speedtest disposition stays ACCEPT-AS-PHASE-1-LANDED-TRAP-DEFERRED until v1.0/L | `speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` — gated on K-CTD-1 |

### §A.3 — 2026-05-09 X.W3.c re-probe — subpath-typing publication gap (NEW, surfaced post-K-close)

| # | Item | Severity | Verified | Source artefact |
|---|---|---|---|---|
| **X.W3.c-NEW** | vue-tsc resolves `dist/composables/{dark,keyboard}.d.ts` via a broken `'../src/...'` re-export — speedtest's 5 consumer files cannot migrate to subpaths via tsc at v0.9.3 | P0 (blocks Y.A3 glass-ui-side work + any other subpath consumer at v0.9.4+) | YES — confirmed in `speedtest/docs/tranches/X/artefacts/W3/migrations.md` "Glass-ui v0.9.3 typing publication gap"; 2 of 3 subpaths fail vue-tsc at consumer side; `./forms` typing is OK | `dist/composables/dark.d.ts` (50 B re-export); `dist/composables/keyboard.d.ts` (54 B re-export); `vite.library.ts` libraryEntries + dts emit chain |

### §A.4 — Speedtest Y-tranche emergent items (cross-repo)

Speedtest opens Y tranche in parallel with our L; 6 active Y-prefixed worktrees. Of those, **Y.A3 (`y-a3-glass-ui`)** is the glass-ui-side research lane and is **blocked at consumer side** on the X.W3.c subpath-typing publication gap.

| # | Item | Severity | Glass-ui-side disposition |
|---|---|---|---|
| **Y-CTD-A3** | Speedtest Y.A3 — consumer-side migration to subpaths once typing gap closes | cross-repo (depends on L closing X.W3.c-NEW + K-CTD-1) | Glass-ui L delivers: (a) typing-gap fix (subpath dts emission stops re-exporting via `'../src/...'`); (b) WS Phase 2 root-barrel removal; (c) v1.0 release. Speedtest then re-links + migrates the 5 consumer files. |

---

## §B — Per-residual wave attribution table

Wave letters proposed:

- **L.W0** — Recon + dispatch precept + WS subpath typing-publication-gap P0 absorb (foundation).
- **L.W1 (HEADLINE)** — WS Phase 2: root-barrel removal of vueuse-bearing symbols (v1.0).
- **L.W2** — Modularization + api/ audit (user's new directive).
- **L.W3** — Composable + chassis second-consumer fidelity (retire-or-wire cohort).
- **L.W4** — Mobile-viewport finishing + visual-runtime residuals.
- **L.W5** — Doc + tooling cohort (K R2 + R3 + R4 + production demo build decision).
- **L.W6** — Lighthouse cohort completion (4 P2 items + production hosting).
- **L.W7** — Pulse + Typewriter keyframes lift + aurora-chrome Option-A unification.
- **L.W8** — Close ceremony (7-agent strengthened audit + ι integrity-sweep).

| Residual | Severity | Proposed wave | Rationale |
|---|---|---|---|
| K-R1 — StoryPager 375 overflow | P1 | **L.W4** | Pure viewport-fitness; same lane as π-2 (aurora bloom inset) deferral; co-locates with π residuals. |
| K-R2 — Doc subpath enumeration polish | P2 | **L.W5** (doc lane) — but **also absorbed atomically into L.W1 + L.W2** when those waves rewrite the surface | The 3 WS subpaths get re-listed against the Phase 2 root-barrel-removal shape; running L.W5 in isolation would re-write before L.W1 lands and then re-write again. Defer cosmetic polish until W1+W2 close. |
| K-R3 — 12 wave-spec status lines stale | P2 (advisory tranche-internal) | **L.W0** (recon lane absorbs the K close ceremony hygiene as a 5-minute pass) | Tranche-internal; landing in L.W0's reconciliation lane is the cheapest. NOT load-bearing for any consumer. |
| K-R4 — surface-tint rung gaps (35/40/70) | P2 | **L.W2** (modularization audit) | Token-substrate territory; aligns with the modularization-audit + `api/` directive that walks `src/styles/tokens.css`. Resolution candidates: (a) define new rungs; (b) migrate to closest existing rungs; (c) document architectural exceptions. Decision is part of the token-substrate audit. |
| **K-CTD-1 — WS Phase 2** | **P0 HEADLINE** | **L.W1 (HEADLINE)** | The K HEADLINE invariant 5 (one wave per tranche carries the named architectural transposition) names this as L's headline. Breaking change → v1.0 cohort. Single-wave-OR-single-close-window per L invariant 4 (no scattered breaking changes). |
| K-CTD-2 — 3 unused composables | P1 | **L.W3** | Composable second-consumer fidelity cohort; co-locates retire-or-wire decisions with K-CTD-3 + K-CTD-4 + K-CTD-11. |
| K-CTD-3 — pagination/virtual single-consumer | P1 | **L.W3** | Same cohort. |
| K-CTD-4 — DiscoGlyph/DockGroup/InstrumentChassis 1-consumer | P1 | **L.W3** | Same cohort. |
| K-CTD-5 — Pulse + Typewriter keyframes lift | P2 | **L.W7** | Animation-substrate cohesion gain; co-locates with aurora-chrome unification (also substrate-cohesion). |
| K-CTD-6 — Aurora chrome Option-A unification | P2 | **L.W7** | Substrate-cohesion lane. (Could alternatively absorb into L.W1 if `api/` extraction includes configurator canonicalization — see §C critical-path notes; tentatively assigned to W7 to keep W1 single-purpose around vueuse SCC.) |
| K-CTD-7 — Production demo build decision | P2 | **L.W5** | Tooling cohort; binary decision (ship static deploy OR formally retire). |
| K-CTD-8 — robots.txt | P2 | **L.W6** | Lighthouse cohort completion (gated on K-CTD-7 outcome). |
| K-CTD-9 — Vue runtime upstream | NOT-OUR-SCOPE | **(retired)** | Not glass-ui scope; document as formally-retired in L FINAL.md. |
| K-CTD-10 — Production hosting cache-ttl | P2 | **L.W6** | Lighthouse cohort completion (gated on K-CTD-7 outcome). |
| K-CTD-11 — DockShowcaseFrame 2nd consumer | P1 | **L.W3** | Demo-chassis fidelity cohort; co-locates with composable second-consumer audit. |
| K-CTD-12 — Speedtest W3.b.1 LANDED annotation | P0 cross-repo | **L.W1** (gated outcome) | Closes automatically when L.W1 ships v1.0; outbound annotation is L.W1's cross-repo hard gate. |
| **X.W3.c-NEW — subpath typing-publication gap** | **P0 (foundation)** | **L.W0** (FOUNDATION — must close before any subpath consumer can build at L+1) | Absorbed into the recon-wave; required as a prerequisite for L.W1 + L.W2 + Y.A3 cross-repo work. |
| Y-CTD-A3 — Speedtest Y.A3 cross-repo | cross-repo | **L.W1 outbound** (closes when L.W1 ships v1.0 + X.W3.c-NEW fix) | Glass-ui L delivers; speedtest Y closes Y.A3 against the v1.0 link cycle. |

---

## §C — Proposed L wave schedule

### L.W0 — Recon + dispatch precept + WS subpath typing-publication gap (FOUNDATION)

| Field | Value |
|---|---|
| **Title** | Reconciliation + dispatch-precept evolution + WS subpath typing-publication-gap absorb |
| **Agents** | 2 (Lane I: reconciliation, Lane II: typing-gap fix + dispatch-precept evolution) |
| **Mode** | parallel: Lane I reconciliation (read-only) + Lane II typing-gap fix + precept-submodule update |
| **File bounds (Lane I)** | `docs/tranches/L/audit/L-reconciliation-2026-05-11.md` (create); read-only across `git log K-close..HEAD` + L/findings.md; READ K-R3 stale-status lines |
| **File bounds (Lane II)** | `vite.library.ts` (modify libraryEntries chain — fix the `'../src/...'` re-export so `dist/composables/{dark,keyboard}.d.ts` emit consumer-resolvable typings); `dist/` regenerate; `docs/precepts/instructions/{ORCHESTRATION.md, tranche/AGENT_DISPATCH_TEMPLATE.md, LESSONS-LEARNED.md}` (modify; absorb 2 L-derived lessons); `docs/tranches/K/waves/W*.md` + K.md wave-schedule status column (modify-carve; absorb K-R3 hygiene) |
| **Hard gate** | (1) reconciliation ledger written against any commits between K close `c5f196c` and L open HEAD; (2) vue-tsc from a synthetic consumer harness resolves `@mkbabb/glass-ui/composables/dark` + `@mkbabb/glass-ui/composables/keyboard` without `'../src/...'` errors; (3) precept submodule advanced with L W0 lessons; (4) 12 K wave-spec status lines updated to `CLOSED <commit>` matching PROGRESS.md |
| **Isolation policy** | single-agent per lane (no shared-file races); worktree OPTIONAL (Lane II touches build chain; can isolate via worktree if Lane I's read-only audit overlaps) |
| **Cross-repo impact** | YES — X.W3.c-NEW gap closure unblocks Y.A3 consumer-side migration at speedtest |
| **Estimated agent count** | 2 |
| **Blocks** | L.W1, L.W2 (typing gap must close before Phase 2 root-barrel removal lands; otherwise Phase 2 ships with broken subpath types) |

### L.W1 (HEADLINE) — WS Phase 2 + v1.0 release

| Field | Value |
|---|---|
| **Title** | WS Phase 2 — root-barrel removal of vueuse-bearing symbols (v1.0 breaking change) |
| **Agents** | 1 (dedicated; single-threaded — root-barrel rewrites must not race) |
| **Mode** | sequential — surface inventory → root-barrel carve → consumer re-validation → v1.0 release |
| **File bounds** | `src/index.ts` (root barrel — REMOVE re-exports of Input, Textarea, Combobox*, useGlobalDark, useKeyboardShortcuts); `src/components/ui/{input,textarea,combobox}/index.ts` (leave per-package barrels intact; only root re-export removed); `src/composables/index.ts` (REMOVE re-exports of useGlobalDark + useKeyboardShortcuts); `package.json` (version bump to v1.0.0); `CHANGELOG.md` (v1.0.0 entry — explicit breaking-change list + migration recipe); demo storybook (`demo/**/*.vue` — update any root-barrel consumers to subpath imports); `vite.library.ts` (regenerate); `dist/` (rebuild + verify subpath dts) |
| **Hard gate** | (1) `rg "Input\|Textarea\|Combobox" src/index.ts src/composables/index.ts` returns 0 hits; (2) speedtest re-link cycle confirms entry-chunk gz drop AND `dist/index.html` 0 modulepreload directives WITH vueuse manualChunk applied; (3) v1.0.0 tagged + pushed; (4) `speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` annotated **LANDED-AT-V1.0**; (5) demo storybook builds cleanly against subpath-only consumption of forms + composables/dark + composables/keyboard |
| **Isolation policy** | worktree REQUIRED (single agent, but breaking change touches dist + speedtest cross-repo; protect against any concurrent precept edits from L.W0 Lane II by waiting for L.W0 close) |
| **Cross-repo impact** | YES — speedtest Y.A3 closes on this; speedtest disposition annotation is L.W1's outbound hard gate |
| **Estimated agent count** | 1 + speedtest re-link orchestrator-side validation (cross-repo orchestrator session) |
| **Blocks** | L.W8 close (HEADLINE invariant); L.W2 (modularization audit reads the post-W1 root-barrel shape) |

### L.W2 — Modularization + api/ + token-substrate audit

| Field | Value |
|---|---|
| **Title** | Modularization audit — sub-module boundaries, cohesion, `api/` dir consideration, K-R4 token-substrate rung gaps |
| **Agents** | 2 (Lane A: src/ module-boundary + api/ dir decision; Lane B: token-substrate audit + K-R4 surface-tint rung gaps) |
| **Mode** | parallel (file bounds disjoint: Lane A walks `src/components/` + `src/composables/` + `src/index.ts`; Lane B walks `src/styles/tokens.css` + the 4 K-R4 sites + `theme.css` bridge) |
| **File bounds (Lane A)** | `src/index.ts` (modify if `api/` extraction lands — single load-bearing public-surface decision); `src/api/` (create OR explicitly reject with rationale); `src/components/custom/index.ts` (if sub-module rebalancing surfaces consolidation); `CLAUDE.md` + `DESIGN.md` (modify to reflect module-boundary decisions — absorbs K-R2 partial) |
| **File bounds (Lane B)** | `src/styles/tokens.css` (modify — define `--surface-tint-{35,40,70}` rungs OR migrate the 4 sites to closest existing); `src/components/ui/slider/Slider.vue:163`, `src/components/custom/timeline/GlassTimeline.vue:172`, `src/components/custom/tabs/UnderlineTabs.vue:110`, `src/styles/glass.css:220` (modify per chosen path); `src/styles/theme.css` (bridge update if new rungs land) |
| **Hard gate** | (Lane A) module-boundary decisions documented + `api/` dir decision binary (LAND or REJECT-with-rationale); CLAUDE.md tree reflects HEAD; sub-module cohesion improved per L invariant 7. (Lane B) `rg "color-mix\(in srgb, var\(--foreground\) (35\|40\|70)%" src/` returns 0 OR 4 (if architectural exceptions documented at site); tokens.css defines new rungs if path-A chosen |
| **Isolation policy** | worktree REQUIRED if both lanes parallel (Lane A may rewrite `src/index.ts` while Lane B touches `src/styles/*`; file bounds technically disjoint but worktree isolation hardens the parallel dispatch per K W0 precept) |
| **Cross-repo impact** | NO (intra-repo only); but the `api/` decision shapes future consumer import idiom — non-binding outbound signal |
| **Estimated agent count** | 2 |
| **Blocks** | L.W8 close |

### L.W3 — Composable + chassis second-consumer fidelity (retire-or-wire cohort)

| Field | Value |
|---|---|
| **Title** | Composable + chassis second-consumer fidelity audit (retire-or-wire across 8 substrates) |
| **Agents** | 2 (Lane A: composables — K-CTD-2 + K-CTD-3; Lane B: P-tranche components + chassis — K-CTD-4 + K-CTD-11) |
| **Mode** | parallel (lane file bounds disjoint: Lane A in `src/composables/{motion,pagination,virtual}/`; Lane B in `src/components/custom/{disco-glyph,dock-group,instrument-chassis}/` + `demo/stories/DockShowcaseFrame.vue` consumer audit) |
| **File bounds (Lane A)** | `src/composables/motion/{useRAFLoop,useIntersectionPause,useDarkModeSync}.ts` (retire OR wire-with-≥1-additional-consumer); `src/composables/pagination/useOffsetPagination.ts` (retire OR wire); `src/composables/virtual/{useVirtualSection*,useWindowedStore}.ts` (retire OR wire); barrel re-exports adjusted; `demo/stories/composables/**` (if wire-path adds consumer stories) |
| **File bounds (Lane B)** | `src/components/custom/disco-glyph/` + `dock-group/` + `instrument-chassis/` (retire-or-wire decision — each currently 1-consumer); `demo/stories/DockShowcaseFrame.vue` + new wrapping story(ies) — K-CTD-11 closure; `demo/stories/compositions/**` (if wire-path adds second-consumer stories) |
| **Hard gate** | every substrate in scope EITHER ≥ 2 consumers OR formally retired with rationale + `feedback_overfitting_audit` line entry; rg sweeps confirm post-state |
| **Isolation policy** | worktree REQUIRED (2 lanes parallel; per K W0 precept); each lane may dispatch sub-agents if either path is wire-heavy (≥ 3 new demo consumer stories) |
| **Cross-repo impact** | YES — speedtest may consume newly-wired composables/components; outbound signal but NOT a hard gate (consumers wire opportunistically) |
| **Estimated agent count** | 2 (or 3 if wire-heavy) |
| **Blocks** | L.W8 close |

### L.W4 — Mobile-viewport finishing + π residuals

| Field | Value |
|---|---|
| **Title** | Mobile-viewport finishing — StoryPager inner-tab overflow (K-R1) + π aurora bloom inset (K π-2 cosmetic) + any new π findings |
| **Agents** | 1 (single-agent viewport-fitness sweep; sequential) |
| **Mode** | sequential |
| **File bounds** | `demo/layout/StoryPager.vue` (modify — add `overflow-x: auto` to inner tab-row container OR truncate sibling labels below `--breakpoint-md`); `src/styles/dock.css` (modify if dock-tab-button labels need overflow handling); `demo/stories/aurora/**` (modify — if K π-2 cosmetic inset fixed, clip parent surface or shrink bloom inset on narrow viewports) |
| **Hard gate** | Playwright probes at 375×667, 1024×768, 1440×900: (1) StoryPager dock-tab inner-row no longer overflows; (2) `body.scrollWidth ≤ 375` on `/primitives/dock-group` at 375; (3) `/aurora` at 375 has no decorative bloom overflow (or has it but documented as cosmetic with no-clipping-impact) |
| **Isolation policy** | single-agent (no parallel concurrency needed for ≤ 25 LOC scope) |
| **Cross-repo impact** | NO |
| **Estimated agent count** | 1 |
| **Blocks** | L.W8 close |

### L.W5 — Doc + tooling cohort

| Field | Value |
|---|---|
| **Title** | Doc + tooling cohort — CLAUDE.md/README.md subpath enumeration (K-R2 reconciled against W1+W2 shape) + production-demo-build decision (K-CTD-7) |
| **Agents** | 2 (Lane A: doc refresh against post-W1+W2 shape; Lane B: production demo build decision binary) |
| **Mode** | parallel (file bounds disjoint: Lane A in `CLAUDE.md` + `README.md` + `DESIGN.md`; Lane B in `vite.config.ts` + `vite.demo.config.ts` (new or reject) + `package.json` scripts + `docs/tranches/L/audit/L-W5-B-demo-build-decision.md`) |
| **File bounds (Lane A)** | `CLAUDE.md` (modify — Subpath surface section names `./forms`, `./composables/dark`, `./composables/keyboard` explicitly; reflect L.W1 v1.0 root-barrel removal; reflect L.W2 module-boundary + api/ decisions); `README.md` (modify — update subpath count from 29 to actual post-W1 count); `DESIGN.md` (modify if W1/W2 shape diverges from current DESIGN.md substrate narrative) |
| **File bounds (Lane B)** | `vite.demo.config.ts` (create OR formally reject); `package.json` scripts (modify — add `build:demo` script if Lane B path-A; remove demo-as-deploy-target hooks if path-B); `docs/tranches/L/audit/L-W5-B-demo-build-decision.md` (create — binary decision with rationale + outbound impact) |
| **Hard gate** | (Lane A) rg confirms zero stale refs vs HEAD; subpath count matches `package.json` exports map; (Lane B) decision document lands AND either ships static demo deploy artefact OR formally retires demo-as-deploy-target with named successor (none / consumer-managed / etc.) |
| **Isolation policy** | worktree OPTIONAL (Lane A doc-only; Lane B build-config; technically disjoint but worktree isolation hardens parallel dispatch) |
| **Cross-repo impact** | YES if Lane B path-A (public demo deploy could affect speedtest deploy story) |
| **Estimated agent count** | 2 |
| **Blocks** | L.W6 (K-CTD-8 robots.txt + K-CTD-10 cache-ttl are gated on K-CTD-7 outcome); L.W8 close |

### L.W6 — Lighthouse cohort completion

| Field | Value |
|---|---|
| **Title** | Lighthouse cohort completion — 4 P2 items (K-CTD-8/9/10 + meta-description-already-done verification) |
| **Agents** | 1 (sequential — small file deltas) |
| **Mode** | sequential |
| **File bounds** | `public/robots.txt` (CREATE if K-CTD-7 path-A; SKIP if path-B); hosting config docs (if relevant; not in-repo but documented in `docs/precepts/`); `index.html` (verify meta-description from K W4 holds); `docs/tranches/L/audit/L-W6-lighthouse-residuals.md` (create — closes K-CTD-9 as formally-retired Vue-upstream + records cache-ttl as hosting-territory non-actionable) |
| **Hard gate** | Lighthouse re-run at L close: `robots.txt` returns 200 if shipped (gated on K-CTD-7); cache-ttl + Vue-upstream items formally documented as non-glass-ui-scope per L FINAL.md cross-tranche-debt ledger |
| **Isolation policy** | single-agent |
| **Cross-repo impact** | NO |
| **Estimated agent count** | 1 |
| **Blocks** | L.W8 close |

### L.W7 — Substrate-cohesion gestalt collapse (keyframes lift + aurora unification)

| Field | Value |
|---|---|
| **Title** | Substrate-cohesion gestalt collapse — Pulse + Typewriter keyframes lift to `animations.css` (K-CTD-5) + aurora-chrome `useAuroraStudio` → `useConfiguratorState` Option-A unification (K-CTD-6) |
| **Agents** | 2 (Lane A: keyframes lift; Lane B: aurora-chrome unification) |
| **Mode** | parallel (file bounds disjoint: Lane A in `src/components/custom/{pulse,typewriter}/` + `src/styles/animations.css`; Lane B in `src/components/custom/configurator/useConfiguratorState.ts` + `demo/stories/aurora/useAuroraStudio.ts` consolidation OR retire-aurora-chrome path) |
| **File bounds (Lane A)** | `src/components/custom/pulse/Pulse.vue` (modify — remove component-local `@keyframes`; consume `animations.css`); `src/components/custom/typewriter/Typewriter.vue` (modify — same); `src/styles/animations.css` (modify — add lifted keyframes if not already present) |
| **File bounds (Lane B)** | `src/components/custom/configurator/useConfiguratorState.ts` (modify if aurora unification extends API); `demo/stories/aurora/useAuroraStudio.ts` (modify — collapse parallel chrome onto useConfiguratorState OR formally retire with rationale); `demo/stories/aurora/**` (consumer rewire if Option-A path lands) |
| **Hard gate** | (Lane A) `rg "@keyframes" src/components/custom/{pulse,typewriter}/` returns 0 hits; `animations.css` carries the lifted keyframes; visual regression at `/primitives/{pulse,typewriter}` confirms no behavior change. (Lane B) either useAuroraStudio is collapsed onto useConfiguratorState with ≥ 2 consumer parity, OR formally retired-as-demo-private with rationale |
| **Isolation policy** | worktree REQUIRED (2 parallel lanes touching different substrate territories) |
| **Cross-repo impact** | NO (intra-repo) |
| **Estimated agent count** | 2 |
| **Blocks** | L.W8 close |

### L.W8 — Close ceremony (7-agent strengthened + ι integrity-sweep)

| Field | Value |
|---|---|
| **Title** | Close ceremony — 7-agent strengthened post-close audit (α/β/γ/δ/ε/π/ι) + FINAL.md |
| **Agents** | 1 orchestrator + 7 audit lanes |
| **Mode** | implementation: `audit/L-pre-close.md` + 7 audit deliverables + L FINAL.md |
| **File bounds** | `docs/tranches/L/audit/L-audit-{α,β,γ,δ,ε,π,ι}-*.md` (create — 7 audit deliverables); `docs/tranches/L/FINAL.md` (create); `docs/tranches/L/PROGRESS.md` (modify); `docs/precepts/instructions/LESSONS-LEARNED.md` (modify if ι surfaces L-derived lessons); precept submodule advance |
| **Hard gate** | (1) all 7 audit lanes return clean OR with documented residuals + named M-tranche destinations; (2) named-but-not-landed sweep clean (ι); (3) Lighthouse re-run confirms all K+L absorbed P0/P1s remain green; (4) bundle-budget gate PASS (with v1.0 re-baseline if W1 dropped the bundle ≥ 5%); (5) v1.0 release validation; FINAL.md authored after findings absorbed |
| **Isolation policy** | 7 parallel audit lanes — worktree REQUIRED |
| **Cross-repo impact** | YES — speedtest disposition annotation must show LANDED-AT-V1.0 per L.W1 outbound |
| **Estimated agent count** | 1 + 7 = 8 |
| **Blocks** | none (terminal wave) |

---

## §D — Critical-path graph

```
                       (open L — 2026-05-11)
                              │
                       L.W0 (recon + typing-gap)
                              │
              ┌───────────────┼───────────────────┐
              │               │                   │
            L.W1            L.W3                L.W4
        (HEADLINE         (composable      (mobile-viewport
         WS Phase 2)      + chassis 2nd-     finishing)
              │            consumer)            │
              │               │                 │
              ↓               │                 │
            L.W2              │                 │
        (modularization       │                 │
         + token K-R4)        │                 │
              │               │                 │
              ↓               │                 │
            L.W5              │                 │
        (doc + production     │                 │
         demo build)          │                 │
              │               │                 │
              ↓               │                 │
            L.W6              │                 │
        (Lighthouse cohort)   │                 │
              │               │                 │
              └───────────────┼─────────────────┘
                              │
                            L.W7
              (substrate-cohesion: keyframes + aurora)
                              │
                            L.W8
                       (close ceremony)
```

**Edge rationale**:

- **L.W0 blocks L.W1**: typing-publication gap (X.W3.c-NEW) must close before Phase 2 ships — otherwise v1.0 ships with broken subpath types and Y.A3 still can't consume the subpaths at the consumer side.
- **L.W0 blocks L.W2**: precept-submodule + dispatch-template hardening should land before any multi-agent parallel wave (per K W0 worktree-isolation precept).
- **L.W1 blocks L.W2**: the modularization audit walks the post-Phase-2 root-barrel shape; if W2 dispatches against the pre-W1 shape, the audit would have to re-run.
- **L.W2 blocks L.W5**: Lane A doc-refresh against the post-W1+W2 module-boundary + `api/` decision; doc-only rewrites should land last per K-R2 carry-forward reasoning.
- **L.W5 blocks L.W6**: K-CTD-8 (robots.txt) + K-CTD-10 (cache-ttl) gated on K-CTD-7 (production demo build decision) outcome.
- **L.W3 parallel-safe**: composable second-consumer audit territory is disjoint from W1/W2/W4/W5 — touches `src/composables/` + `demo/stories/composables/` + `src/components/custom/{disco-glyph,dock-group,instrument-chassis}/`.
- **L.W4 parallel-safe**: mobile-viewport touches `demo/layout/StoryPager.vue` + `src/styles/dock.css` — disjoint.
- **L.W7 fires after W3 + W4 + W5 + W6** complete: animation-substrate cohesion + aurora-chrome unification are gestalt-collapse work; sequencing after composable second-consumer audit avoids redundant decisions (if useAuroraStudio path-A retires the aurora chrome, the resulting composables are part of the W3 audit scope).
- **L.W8 fires last**: close ceremony depends on every substantive wave closing first.

**Critical path**: L.W0 → L.W1 → L.W2 → L.W5 → L.W6 → L.W8 close. **5 sequential edges**.

**Parallel slots**: L.W3 + L.W4 fire after L.W0 (independent of L.W1's critical path). L.W7 fires after L.W3 + L.W4 + L.W5 + L.W6.

---

## §E — Cross-repo blocking items

| Direction | Blocking item | Glass-ui L wave | Speedtest Y wave | Disposition |
|---|---|---|---|---|
| **Y → L** | Speedtest's 5 consumer files (`App.vue:100`, `config/auroraConfig.ts:2`, `dashboard/DashboardMap.vue:61`, `views/AdminOverviewView.vue:60`, `layouts/AdminDashboardLayout.vue:96`) need subpath migration BUT cannot proceed at v0.9.3 because of X.W3.c-NEW typing-publication gap | **L.W0 Lane II** (typing-gap fix) | Y.A3 unblocks AT L.W0 close | L.W0 closes the gap; Y.A3 can consume subpaths against the patched dts at next glass-ui release (likely a v0.9.4 patch OR rolled into v1.0). Recommendation: cut **v0.9.4 patch** after L.W0 closes — Y.A3 can migrate without waiting for v1.0. |
| **L → Y** | WS Phase 2 root-barrel removal at v1.0 forces speedtest's consumer-side migration | **L.W1 (HEADLINE)** | Y.A3 final migration cycle | L.W1 ships v1.0; speedtest re-links + Y.A3 commits final subpath consumption. L.W1 outbound hard gate: speedtest disposition annotated **LANDED-AT-V1.0** + speedtest dist passes the modulepreload-free + entry-chunk-drop gate. |
| **L → Y** | Speedtest may opportunistically consume newly-wired composables/components from L.W3 retire-or-wire path | **L.W3 (outbound signal)** | Y opportunistic | NOT a hard gate; L.W3 ships the substrates + speedtest pulls them when needed. |
| **L → external** | Vue upstream (K-CTD-9) | n/a | n/a | Formally retired in L FINAL.md as not-our-scope. |
| **L → external** | Hosting cache-ttl (K-CTD-10) | n/a | n/a | Documented as hosting-territory; not in-repo. |

**Critical cross-repo cycle**:

```
L.W0 Lane II (typing-gap fix) → glass-ui v0.9.4 patch (optional)
            ↓
        Y.A3 consumer-side migration (speedtest)
            ↓
L.W1 (WS Phase 2, v1.0)
            ↓
speedtest re-link + Y.A3 close commit
            ↓
L.W1 outbound disposition annotation LANDED-AT-V1.0
            ↓
L.W8 close ceremony
```

---

## §F — Estimated tranche timeline

### Wave-batch estimate (given 6-agent ceiling per K precept)

| Batch | Wave(s) | Agents | Estimated days | Parallel | Notes |
|---|---|---|---:|---|---|
| Batch-1 | L.W0 | 2 | 0.5 | both lanes parallel | Recon + typing-gap; small bounds |
| Batch-2 | L.W1 + L.W3 + L.W4 | 1 + 2 + 1 = 4 | 2.0 | three lanes parallel | L.W1 is single-agent serialised; L.W3 + L.W4 dispatch alongside |
| Batch-3 | L.W2 + L.W7 | 2 + 2 = 4 | 1.5 | both waves parallel | L.W2 depends on L.W1 close; L.W7 depends on L.W3 close — typically these two cohorts converge in Batch-3 |
| Batch-4 | L.W5 + L.W6 | 2 + 1 = 3 | 1.0 | both waves parallel after W2/W3/W7 close | doc + lighthouse cohort completion |
| Batch-5 | L.W8 | 8 (1 orchestrator + 7 audit lanes) | 1.5 | 7 parallel audit lanes | close ceremony |

**Total**: ~6.5 days end-to-end (within ~1 week given the orchestrator-paced ceiling); 5 sequential batches; peak parallelism Batch-2 + Batch-3 + Batch-5 (4-8 agents simultaneously).

### Agent budget total

- Substantive waves: 2 (W0) + 1 (W1) + 2 (W2) + 2 (W3) + 1 (W4) + 2 (W5) + 1 (W6) + 2 (W7) = **13 agent dispatches**
- Close ceremony: 1 + 7 = **8 audit dispatches**
- **Total**: 21 agent dispatches across L — comparable to K's 13 + 7 = 20.

### LOC envelope

- L.W0: ~80 modified (typing-gap + precept + K-R3 hygiene)
- L.W1: ~50 modified (root barrel carve) + ~30 deleted (root-barrel re-exports of vueuse-bearing symbols) + ~40 modified (demo subpath consumer migrations) + CHANGELOG v1.0.0 entry
- L.W2: ~200 modified (sub-module rebalancing + api/ decision); ~20 LOC for token rung additions/migrations
- L.W3: ~50 deleted (retire path) OR ~250 created (wire path for 8 substrates × ≥ 1 consumer each)
- L.W4: ~25 modified (StoryPager + aurora bloom)
- L.W5: ~100 modified (doc cohort) + ~150 created (demo build decision artefact + vite.demo.config.ts if path-A) OR ~30 deleted (path-B retire)
- L.W6: ~10 created (robots.txt if path-A) + ~50 created (Lighthouse residuals audit doc)
- L.W7: ~60 modified (keyframes lift) + ~80 modified (aurora-chrome unification path-A) OR ~20 retired (path-B)

**Estimated net delta**: +600 / -150 = ~+450 LOC across L (excluding audit + doc creation).

---

## §G — HEADLINE recommendation

### Primary: **K-CTD-1 — WS Phase 2 (root-barrel removal of vueuse-bearing symbols, v1.0)**

**Rationale**:

1. **Architectural transposition** — closes the SCC trap that K W-S Phase 1 explicitly couldn't close (speedtest X.W3.c re-probe confirms +1.92 KB regression PERSISTS at v0.9.3). Phase 2 is the canonical fix.
2. **Cross-repo unblock** — speedtest Y.A3 cannot close without Phase 2 (or until at minimum X.W3.c-NEW typing-gap closes). v1.0 cohort is the canonical close moment.
3. **v1.0 cohort identity** — L is the v1.0 tranche per L invariant 4 ("breaking changes explicitly in-scope where they retire substrate/aliases"). WS Phase 2 is the named representative example.
4. **Single architectural decision** — root-barrel removal is one decision; even if other waves carry breaking changes (e.g., L.W2 module-boundary rewrites), WS Phase 2 anchors the v1.0 invariant.
5. **Speedtest disposition already routed here** — `speedtest/.../W3/b1/disposition.md` explicitly names "Queued for L tranche; will land alongside the broader v1.0 cohort."

### Alternative considered (not recommended): **L.W2 modularization + api/ extraction**

Modularization is the user's NEW directive at L open. It is **substantively important** but does not satisfy the HEADLINE invariant the way WS Phase 2 does. The api/ extraction is a structural rebalance + import-shape decision — useful but not architecturally definitional the way the v1.0 vueuse SCC closure is. L.W2 anchors as a high-priority substantive wave (Batch-3); L.W1 anchors as HEADLINE.

### Alternative considered (not recommended): **K-CTD-6 aurora chrome Option-A unification**

Aurora chrome unification is a substrate-cohesion gestalt collapse — important but smaller scope and not breaking-change material. L.W7 carries it as a secondary substrate-cohesion wave, not as HEADLINE.

---

## §H — Architectural transposition opportunities (per-wave named transposition per L invariant 5)

L invariant 5 mandates at least one named architectural transposition per substantive wave:

| Wave | Named transposition |
|---|---|
| L.W0 | Typing-publication-gap closure — `vite.library.ts` dts emission no longer routes subpath types through `'../src/...'` re-exports; subpath dts files become self-contained or re-export through canonical `dist/` paths. |
| **L.W1 (HEADLINE)** | **Root-barrel carve — vueuse-bearing symbols no longer transit the root `src/index.ts`; consumers consume via subpaths exclusively. SCC trap closed at v1.0 via canonical breaking change rather than via dist-side workarounds.** |
| L.W2 | (a) `api/` directory introduction (or formal rejection with rationale) — if landed, this is the gestalt move from "subpaths-by-package" to "subpaths-by-public-API-contract"; (b) `--surface-tint-N` rung canonicalization — define the 35/40/70 rungs as part of the tokens.css family OR retire the 4 sites to closest existing rungs with documented intent. |
| L.W3 | Substrate-without-consumer binary cleanup — every chronically-deferred single-consumer composable/component either reaches ≥ 2 consumers or retires with rationale. This is the gestalt-collapse-over-wire-and-forget pattern applied to 8 substrates simultaneously. |
| L.W4 | StoryPager inner-tab-row layout collapse — replace the unbounded horizontal layout with either `overflow-x: auto` (scroll-region pattern) or label-truncation below `--breakpoint-md` (responsive-collapse pattern). |
| L.W5 | Production demo build binary decision — either ship `vite.demo.config.ts` + `build:demo` script + named deploy target (consumer of glass-ui storybook chrome) OR formally retire demo-as-deploy with named successor. No third path. |
| L.W6 | Lighthouse-residual formal retirement — K-CTD-9 (Vue upstream) closed as not-our-scope with named external-tracker; K-CTD-10 (cache-ttl) closed as hosting-territory. |
| L.W7 | (a) Pulse + Typewriter keyframes lift to `animations.css` — substrate-cohesion gestalt; component-local `@keyframes` rules are removed in favor of canonical animation rules. (b) Aurora-chrome Option-A unification (if pursued) — collapse `useAuroraStudio` onto `useConfiguratorState` for a single chrome substrate; OR formally retire useAuroraStudio as demo-private with rationale. |

---

## §I — Out-of-scope (explicit)

- New design-language axes — L is the v1.0 cohort + modularization audit; no new tier rungs / glass-tier rungs.
- New public components — L composes existing primitives; no new ui/ or custom/ packages.
- Cross-repo P-tranche second-consumer fidelity beyond what K-CTD-4 already names — speedtest consumer-territory deferral remains for any non-named primitive.
- Vue upstream `uses-passive-event-listeners` (K-CTD-9) — formally retired in L FINAL.md.
- Production hosting cache-ttl (K-CTD-10) — hosting-territory; not in-repo.
- Plugin extraction — permanent consumer-territory deferral (per I/J/K).

---

## §J — Notes on waves NOT proposed

- **No "comprehensive vocabulary audit" wave** — K's W3 + W2 + WV converged the vocab surface; L is structural (modularization + WS Phase 2), not vocab.
- **No "stress harness restore" wave** — K W4 Lane B confirmed the retire is permanent.
- **No "ay-close revival" wave** — K W8 cleanup deleted the file on disk; retire is binary.
- **No standalone "Lighthouse re-run" wave** — L.W6 + L.W8 close ceremony cover this; not a wave of its own.
- **No "Configurator P0 re-check" wave** — K F-ε-3 was a false positive (re-probed at HEAD via fresh Playwright session — 0 console errors). Documented in K FINAL.md.

---

## §K — Cross-references

- K FINAL.md `## K residuals → L` — the primary input list.
- K/audit/K-residuals.md — full residual ledger (R1..R4 + 12 cross-tranche debt entries).
- K/K.md `## Cross-tranche debt + explicit deferrals` — supplementary residual cohort.
- K/audit/K-audit-{α,β,γ,δ,ε,π,ι}-*.md — per-lane evidence anchoring each residual.
- speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md — speedtest-side disposition + X.W3.c re-probe + Y.A3 routing.
- L/findings.md — L user directives (verbatim).
- docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md — Hardened agent git clause (binding).
- J/research/Rγ-residuals-to-waves.md — the J pattern (mimicked here).
- K/research/Rγ-residuals-to-waves.md — the K pattern (direct predecessor).

---

## §L — Verdict + handoff

**L tranche proposed structure**:

- **9 waves** total: L.W0 + L.W1 (HEADLINE) + L.W2 + L.W3 + L.W4 + L.W5 + L.W6 + L.W7 + L.W8.
- **HEADLINE**: K-CTD-1 — WS Phase 2 root-barrel removal of vueuse-bearing symbols (breaking change → v1.0).
- **Critical path**: L.W0 → L.W1 → L.W2 → L.W5 → L.W6 → L.W8 (5 sequential edges).
- **Parallel slots**: L.W3 + L.W4 after L.W0; L.W7 after L.W3 + L.W4 + L.W5 + L.W6.
- **Estimated timeline**: ~6.5 days end-to-end across 5 wave-batches.
- **Cross-repo blocker**: L.W0 Lane II (X.W3.c-NEW typing-gap) → glass-ui v0.9.4 patch (optional) → Y.A3 unblock; L.W1 v1.0 → Y.A3 final close + speedtest disposition LANDED.
- **Hardened agent git clause**: binding across every dispatch; READ-ONLY git only.

**Out-of-scope items deferred to M+**:

- Vue runtime `uses-passive-event-listeners` (K-CTD-9, formally-retired in L FINAL.md).
- Hosting cache-ttl (K-CTD-10) and any consumer-deploy decisions beyond L.W5 Lane B.

This research deliverable is read-only output. No source files modified. No mutating git invoked.
