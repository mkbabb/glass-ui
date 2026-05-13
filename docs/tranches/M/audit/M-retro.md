# M tranche — retrospective (W4 close)

What went well; what didn't; what M added to the canonical close-ceremony pattern.

## What went well

- **Constellation-wide HEADLINE delivery**: 5 consumers migrated to glass-ui v1.0 subpath surface in a single per-consumer-batched wave (W1). 93 import sites rewritten across 5 repos; zero retired-subpath imports remaining constellation-wide; per-consumer build + test green per lane.
- **Precept submodule REAUDIT-stream reconciliation**: 15-commit divergence closed via cumulative-diff apply + 3-way merge resolution. M.Rδ P1 + P3 + P6 extensions (`git checkout <path>` + MULTI-WRITER + dual ceiling) integrated inline. Orchestrator-solo discipline preserved (no agents touched the submodule).
- **F-ε-3 Configurator recursion permanent close**: 3-layer root cause diagnosed and repaired via gestalt source fix (CSS-only collapsible reveal + Vue Boolean prop coercion + WebGL probe synchronization). Vitest fixture provides regression proof; Lighthouse + Puppeteer cross-verification both clean.
- **6/7 audit lanes returned CLEAN; 1 returned NEEDS-ABSORB (γ doc-drift) and was absorbed in-wave**. Zero P0 blockers across the audit.
- **KISS-aligned plan revision**: the open-commit `64105c6` proposed `@mkbabb/dev-kit` as HEADLINE; user feedback at "Yes. KISS." prompted retraction and 9→5 wave restructure. The revised plan held through close with no further mid-flight pivots — evidence that KISS-first sizing reduces tranche flight churn.
- **CONSTELLATION.md as canonical multi-peer manifest**: M.Rδ P2 proposed the artefact class; M shipped it; W4 ι close verified consistency across 14 surveyed repos. This is the first tranche to use the manifest end-to-end.

## What didn't

- **Three disclosed `git stash` violations** in M.W2 worktree-isolated agents (Lane B + 2× Lane C). Recovered transparently — agents disclosed in proof docs; orphan stash dropped at integration. But the 4th recurrence of the stash anti-pattern (after K, L, AA-tranche precept iterations) is itself proof that prose-bound non-negotiables are insufficient without tooling-side enforcement. M.W4 ι close adds LESSONS-LEARNED entry with two close-time enforcement vectors:
  - Orchestrator-side: `git stash list` walk at every wave-close integration; agent-attributed entries are P0 integration blockers.
  - Agent-side: canonical alternative is `git diff > /tmp/<agent-id>.patch` (snapshot read-only) + Edit-revert + Edit-reapply; never `git apply`.
- **`v1.0.0 → v1.0.3` AA-tranche layered work landed between M-open and W0 dispatch**. The M plan was authored against v1.0.0 baseline but executed against v1.0.3+. Not a process failure — AA was parallel and accountable — but documents another instance of the "tranche flight window encloses other tranches' work" pattern that complicates ι reflog scans. CONSTELLATION.md §4 writer-vs-reader boundaries handled this correctly.
- **Per-peer-repo branch heterogeneity surfaced at W1 integration**: keyframes.js + value.js on user WIP branches; bbnf-buddy without origin remote; fourier-analysis + words on master. The orchestrator's per-consumer commit policy (per ORCHESTRATION.md cross-repo commit policy + MULTI-WRITER mode) handled all 5 cases, but the heterogeneity is a constellation-wide signal: future tranches should establish branch-state expectations at the per-peer-repo level in CONSTELLATION.md before the wave dispatches.
- **`/freshness` subpath orphan**: V.W3 wire-claim (speedtest/vite.config.ts adoption) never landed. β audit surfaced this. Named-deferred to N — the substrate-without-consumer binary is binding but the retire is a substrate-delta best bundled with N's substrate batch.
- **Demo carousel + metaballs stories use internal SFC paths rather than `/carousel` subpath**. Inconsistent with the MIGRATION.md doctrine for external consumers. Acceptable for in-repo demos; named-deferred to N as fast-follow cosmetic.

## What M added to the canonical close-ceremony pattern

- **Cross-constellation reflog scan (ι extension)**: M.W4 ι sweep walks reflog across 9 repos (glass-ui + speedtest + precept submodule + 5 per-consumer + bbnf-lang precept-stream check). Codified in `tranche/SPEC.md` Close section as the "M extends to cross-constellation reflog scan" clause.
- **Dual-ceiling parallel-agent canon (M.Rδ P6)**: 6 implementation / 7 read-only audit. Codified in `instructions/ORCHESTRATION.md` after "the six-agent ceiling preserves the parallel benefit..." paragraph. M.W4 used 7 read-only audit lanes (α/β/γ/δ/ε/π/ι) which is the first time the dual ceiling exercise was load-bearing.
- **MULTI-WRITER mode (M.Rδ P3)**: cross-repo writes across multiple peer repos in the same wave are dispatched as per-repo lanes or delegated to orchestrator's main thread. Never bundled into a single mega-agent. Codified in ORCHESTRATION.md "Cross-repo commit policy" → "MULTI-WRITER mode" subsection.
- **`git checkout <path>` explicit enumeration (M.Rδ P1)**: closes the L W1 Lane B self-disclosed file-level-checkout loophole. The forbidden subset now enumerates branch-checkout AND file-checkout explicitly. AGENT_DISPATCH_TEMPLATE.md "Hardened agent git clause" updated.

## What carries forward to N

Per `docs/tranches/M/audit/M-residuals.md` Named-deferred section, N inherits:

- N-1 (P1 substrate): `/freshness` subpath retire-or-wire decision
- N-2 (P1 substrate): `DiscoGlyph` production-consumer audit
- N-3 (P1 substrate): `useGlassAlpha` internal-usage check
- N-4 (P2 fast-follow): 26 pre-existing typecheck errors in AA timeline stories
- N-5 (P1 fast-follow): Dock-layer substrate regression (NEW; needs disposition)
- N-6 (P3 fast-follow): Demo carousel/metaballs story import-path harmonisation
- N-7 (P2 cross-tranche-debt): per-consumer CHANGELOG / MIGRATION proposals (keyframes.js + value.js publish-status verification)
- N-8 (P3 cosmetic): `_shared` package naming/role clarity

The M plan §8 close-state ledger is finalized; carry-forward count is 8 named residuals. None block N opening.
