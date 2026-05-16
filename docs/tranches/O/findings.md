# O—findings (verbatim user directives + extracted scope)

## User directive (verbatim, 2026-05-14—O open)

> Analyze the extant backend codebase for any legacy code, deprecated code, temporary workarounds, fallback or fall-through behavior: in all instances, either excise the code entirely, or fail explicitly therein: no silent or graceful handling unless befitting.
>
> This should be a fastidious and surgical refactor: thoroughly identify all areas herein with legacy behavior and get everything explicitly migrated to whatever new API—or facility—present.
>
> Divine an approach to achieve better encapsulation, consistency in service boundaries, dependency injection patterns, and pipeline orchestration.
>
> NO god modules: break large files (>500 lines especially) into smaller, cohesive sub-modules when appropriate and expedient; use better and modern patterns.
>
> NO workarounds, NO fallbacks, NO special cases. No effusive dynamicsim. NO nested imports. NO test files in src files.
>
> NO duplicated effort: DRY. KISS.
>
> Run linting and type checking to validate your changes at every interval.
>
> DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein.
>
> Devise a path forward: audit the hitherto made changes and the remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions, NO workarounds: idiomatic, gestalt approaches. This is a development product, architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable.
>
> NO legacy code.
>
> Delineate any chronically deferred items and fold them into this new tranche.
>
> Delineate any deferred items and fold them into this new tranche.
>
> Recap ALL of our prompts and requests hitherto and ensure they've been adressed.
>
> This is NOT an implementation phase. Tranche development only.
>
> Analyze ALL of our consumers, too, deeply, with another wave of 6 agents in parallel AFTER the above waves.

## Extracted directive cohorts

### Code-hygiene mandates (O1–O8)

- **O1**—Legacy code excision. Identify v0.x shims / `@deprecated` markers / back-compat aliases / migration scaffolding. Either delete or migrate explicitly to canonical API. No "silent or graceful" preservation.
- **O2**—Workaround + fallback + fall-through removal. Audit defensive checks, fallback paths, special-case branches. Where the fall-through is defensible, fail explicitly. Where it's not, delete.
- **O3**—No nested imports. Every import lifts to module top; no dynamic-import-as-shim, no inline-deferred-import.
- **O4**—No test files in src/. Hygiene check; if any `__tests__/` or `*.test.ts` live in src/ they relocate.
- **O5**—DRY / KISS. No duplicated logic across modules; canonical implementations only.
- **O6**—No effusive dynamicism. Concrete shapes preferred; defensive type-coercion + runtime-instance-checks audited; remove unjustified dynamism.
- **O7**—God-module split. Files > 500 lines in src/ broken into cohesive sub-modules where appropriate.
- **O8**—Lint + typecheck at every interval. Implementation rule (for the implementation phase, not this planning round).

### Architectural mandates (O9–O12)

- **O9**—Better encapsulation. Module boundaries crisp; leaky abstractions surfaced.
- **O10**—Service boundaries. Consistent shape across composables / utilities / registry singletons / shared state.
- **O11**—Dependency injection patterns. Consistent provide/inject usage; identify singletons that should be DI; identify missing-DI sites.
- **O12**—Pipeline orchestration. Build / typecheck / test / release / freshness scripts cohesive; remove duplicated work + special cases.

### Research mandates (O13–O15)

- **O13**—6-agent backend audit (this round; sub-agents fan out first).
- **O14**—Recap ALL prior prompts + requests; ensure addressed. Walk K / L / M / N opens + KISS/wiring revisions + every fold-in/clarification.
- **O15**—Chronically-deferred + N-deferred items fold into O. Enumerate explicitly; named-destination per item.
- **O16**—6-agent consumer audit (round 2; AFTER round 1 backend audit returns).

### Process constraints (O17–O18)

- **O17**—Planning-only round. No implementation; tranche development only. Implementation dispatch awaits explicit user directive analogous to K/L/M/N pattern.
- **O18**—Hardened agent git clause (inherited from N + precept LL ledger; 6 prior recurrences). Re-binding at O dispatch template.

## Inherited residuals from N FINAL.md §5

Folded into O at this open per directive O15:

| # | Item | Source | Disposition |
|---|---|---|---|
| O-N-1 | Playwright/Chrome-MCP runtime visual probe (π lane TOOLING-DEFERRED at N.W4) | N.W4 close | re-run when tooling reconnects; verify N substrate's visual claims |
| O-N-2 | 23 broader wire-targets per `tranches/N/audit/N-wiring-targets.md` (28 minus the 5 strategic wires at N) | N.W0 audit | per-consumer / per-primitive wires at O—pick highest-value cohort |
| O-N-3 | 3 MINOR γ doc-drifts (CLAUDE.md `<Slider>` contract drift; section/ Structure-tree blurb; configurator/ Structure-tree blurb) | N.W4 γ audit | fold into a doc-tier wave; small absorb |
| O-N-4 | 3 MINOR δ notes—no `data-backdrop` attr (if CSS pivots on it); MetaballCanvas `position: fixed` consumer-scope gap; `SectionBackdrop` type not exported on `/api` | N.W4 δ audit | per-item triage at O.W0 / O.W1 |
| O-N-5 | N11/b new union candidate—`<GlassScrubber>` or `Slider variant="timeline-glass"` (3 fourier-analysis sites; ~80 % recipe overlap) | N.W4 N11/b | substrate proposal for O—clears ≥ 2-consumer bar at fourier-analysis alone |
| O-N-6 | Keyframes.js 84 % UI-scaffolding overfitting + 3 zero-consumer custom components | N.W4 N11/d | consumer-side cleanup wave (keyframes.js orchestrates)—glass-ui-side action: none |
| O-N-7 | Words/frontend `--scale-press-{xs..lg}` ladder (9 sites at 4 distinct arbitrary-scale values) | N.W4 N11/a | token-tier proposal—extend the press-scale rung set |
| O-N-8 | N8 `<DockMobileToggle>` new primitive | N open directive; deferred at N | re-evaluate per user signal; cohort with mobile-density work if dispatched |

## Inherited chronic deferrals (pre-N; per N PROGRESS.md + N.md §8)

| # | Item | Source | Disposition at O |
|---|---|---|---|
| O-CD-1 | `L-vue-passive-listeners` (PERMANENT-DEFER chronic out-of-scope) | L tranche residual | PERMANENT-DEFER carries; document only |
| O-CD-2 | `L-cache-ttl` (PERMANENT-DEFER chronic out-of-scope) | L tranche residual | PERMANENT-DEFER carries; document only |
| O-CD-3 | M.W1 keyframes.js + value.js WIP-branch commits still on user's master / WIP branches | M.W1 cross-repo | ι sweep verified at N.W4: keyframes.js DID land on master post-M; value.js remains on WIP. Document; orchestrator does not push WIP. |

## Recap of prior user prompts + cross-walk to addressed status

(Captured here at O open; verified at O.W4 close.)

| Tranche | Verbatim user directive | Addressed? |
|---|---|---|
| K open | "Begin tranche K ... continue indefatigably; idiomatic gestalt" | K closed `2026-05-08`; v0.9.3 v0.9.4 |
| L open | "v1.0 standardization sweep" | L closed; v1.0 published |
| M open | "Begin and continue current tranche ... idiomatic, gestalt approaches" | M closed `54a8acb`; v1.0.4 + v1.0.5 |
| N open | "DEEPLY audit with 6 agents in parallel our original plan and waves thereof, alongside all changes made herein. Devise a path forward..." | N planning + N.W4 13-agent audit; CLEAN at v1.1.4 |
| N KISS revision | "KISS. Conservative on additions and removals. Audit overfitting." | Plan pivoted; spot-verification gate caught false-positives; verdict reversed to wiring |
| N wiring correction | "useTouchGate is used... Metaballs, paper-backdrop, typewriter should be used elsewhere too" | 5 strategic wires landed at N.W0 |
| O open (this) | "Analyze backend codebase ... NO god modules ... 6 agents in parallel ..." | THIS TRANCHE |

(O.W0 research wave addresses the audit + recap; consumer wave addresses the consumer analysis; O plan + waves synthesize the path forward.)
