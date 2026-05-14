# N.W0 Lane C — Audit-failure LESSONS-LEARNED entry — proof

## Disposition

The audit-failure LL entry is codified at the precept submodule (`docs/precepts/instructions/LESSONS-LEARNED.md`, entry `## 2026-05-13 - Audit Verdicts Require Spot-Verification`) — see Lane B proof for the cross-repo commit (`b8af314`). Lane C is the local annotation: a cross-reference between the N-prune-ledger's §H placeholder and the now-codified precept entry.

## File changes summary

| File | Change |
|---|---|
| `docs/precepts/instructions/LESSONS-LEARNED.md` | New entry (covered under Lane B). |
| `docs/tranches/N/audit/N-prune-ledger.md` | §H annotation appended — cites the precept commit `b8af314` and the LL entry title. |

## The three audit failures (full surface)

The N KISS-revision overfitting audit produced these errors, caught by the user's wiring-correction message ("useTouchGate is used, or it should be ... Metaballs, paper-backdrop, typewriter should be used elsewhere too"):

1. **HALLUCINATION** — `useGlassAlpha` cited as `delete-unused`. The composable does not exist in the codebase. The actual composable is `useGlassRenderer`, which lives at `src/composables/glass/useGlassRenderer.ts` + is used by `GlassPanel.vue` (along with shader assets in the same directory). The audit's grep emitted a literal that no real source file produces; the verdict was a fabrication.

2. **FALSE POSITIVE** — J-6 `--{success,warning,info}-foreground` tokens flagged for retirement. The tokens exist in `src/styles/tokens.css` and `src/styles/theme.css`; consumers include the `<Notification>` surface (per CLAUDE.md V.W2 entry). The retire verdict was derived from a grep that did not traverse the CSS-token consumption path.

3. **MISSED CONSUMER** — `useTouchGate` counted as `rg=1` (self-only). The composable is consumed by `src/components/custom/dock/GlassDock.vue` at line 85 — the canonical pattern N.W0 Lane A1 now mirrors into `<Slider>`. The audit's grep undercounted the call site, probably by matching only the file-local definition and not the cross-package re-export through `composables/index.ts` + `composables/dom/index.ts`.

## Verdict reversal

A-batch retirements (5 items) + B-batch demo-privatizations (3 items) — RETRACTED. Replaced with 5 strategic wires per `docs/tranches/N/audit/N-wiring-targets.md`. Net library surface change at N close: 0 retirements + 0 demo-privatizations + 5 wires. Pure additive.

## Canonical pattern citation

Prior precedent for "audit class miscount surfaces under user correction": `2026-05-04 - Empty Returns Are Failed Dispatches` (sub-agent silent abort misread as scope-complete) + `2026-05-05 - Read-Only Audits Miss Runtime + tailwind-merge Interactions` (read-only audit returned clean; Playwright caught the regression). The N failure extends the same class to overfitting audits: a read-only audit can hallucinate names + undercount consumers + miss CSS-only consumption simultaneously, and a verdict landed without spot-verification is recoverable only via user correction.

## Verification

`rg -n "2026-05-13" docs/precepts/instructions/LESSONS-LEARNED.md` ⇒ entry found. `git -C docs/precepts log -1 --format='%h %s'` ⇒ `b8af314 feat(spec+style): canonicalize ...`.

## Open questions for orchestrator

None.

## Worktree diff verification output

This lane was orchestrator-direct (precept submodule writes; local annotation in the main tree). No agent worktree.
