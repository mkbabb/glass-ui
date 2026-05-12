# L — User directives (verbatim, conversation recap)

Captured from the conversation chain that opens L (K successor). Each directive is binding for L execution.

## Indefatigability + gestalt (carried from C-K; reissued at L open)

> Continue through this indefatigably: do not relinquish control back to me until you have completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt approaches.

> NO legacy code.

> Architectural transpositions in service of elegance, simplicity, and performance above all are both necessary and desirable.

> This is a development product.

## L-tranche directives (this iteration — 2026-05-11)

> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.

> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.

> NO legacy code.

> Delineate any chronically deferred items and fold them into this new tranche.

> Delineate any deferred items and fold them into this new tranche.

> Recap ALL of our prompts and requests hitherto and ensure they've been adressed.

> Check for likely needs to be better modularized into sub-modules, and ensure cohesion with our other modules, potentially having an api dir, etc

## Cross-repo state at L open (2026-05-11)

- **glass-ui master**: `35cae2c` (K W8 close, 2026-05-09). v0.9.3 tagged + pushed. Precept submodule at `d4ada55` (4 K W0 lessons + 2 K W8 lessons).
- **speedtest master**: `5dcc2505` (X tranche closed). Speedtest's X.W3.c re-probe at v0.9.3 **confirmed PERSISTENT SCC trap** (matches glass-ui's audit byte-for-byte: +1.92 KB vs +2 KB; 1 modulepreload reappears).
- **speedtest opens Y tranche in parallel** with our L: 6 active Y-prefixed worktrees including `y-a3-glass-ui` (speedtest's glass-ui-side research lane). Cross-repo coordination at Rδ.
- **Critical typing-publication gap surfaced by X.W3.c**: vue-tsc resolves `dist/composables/{dark,keyboard}.d.ts` via a broken `'../src/...'` re-export. K.WS subpath adoption blocked at consumer side; speedtest's 5 consumer-files (`App.vue:100`, `config/auroraConfig.ts:2`, `dashboard/DashboardMap.vue:61`, `views/AdminOverviewView.vue:60`, `layouts/AdminDashboardLayout.vue:96`) could not migrate to subpaths via tsc.

## Distillation — L binding-constraint surface (recapitulated from K, hardened at L)

1. **Indefatigability** — orchestrator does not yield without explicit user authorization or environmental blocker.
2. **NO quick solutions, NO workarounds** — every wave delivers canonical artefact OR formal substrate-without-consumer defer.
3. **Idiomatic, gestalt approaches** — collapse-and-retire over wire-and-forget; canonical primitive over duplicated recipe.
4. **NO legacy code** — clean breaks; no compatibility shims; no `_v2` parallel paths; no deprecation aliases. **L is the v1.0 cohort** — breaking changes are explicitly in-scope where they retire substrate/aliases (WS Phase 2 root-barrel removal is the canonical example).
5. **Architectural transpositions** — at least one named per substantive wave.
6. **Development product** — production-leaning hardening.
7. **Modularization audit (NEW for L)** — sub-module boundaries reviewed; cohesion with sibling modules ensured; an `api/` dir or analogous public-surface dir considered where it improves the import shape.
8. **Tree clean, no specialized branches** — L stays on master; backups via tags only.
9. **All chronic + named deferrals folded** — L absorbs every chronic deferral (≥ 2 prior deferrals) + every K FINAL named-residual + every cross-tranche-debt entry, OR formally retires with rationale.
10. **All conversation directives addressed** — L close-criteria gate verifies every binding-constraint surface against HEAD.
