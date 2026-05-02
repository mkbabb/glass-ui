# F Retro

Generated: 2026-05-02

## What F Changed

F moved glass-ui from an evidence-light component library state to a contract-driven development substrate:

- active consumers are enforced by static policy and real builds;
- package exports and type targets are machine-checked;
- story routes are smoked through the browser;
- theme/style wiring has a Tailwind compile proof;
- bundle and Aurora profiles write repeatable artifacts;
- dock, component lifecycle, and Aurora runtime contracts have focused tests or runtime assertions.

## Process Notes

The useful order was proof first, then substrate repair:

1. W0 made ledgers before implementation.
2. W1 built the gate tier and migrated active consumers.
3. W2 repaired dock ownership, transition, rail, portal, and layer behavior before style consolidation.
4. W3 fixed unsafe HTML, stale caches, row identity, and lifecycle cleanup.
5. W4 made Tailwind v4 theme/style authority compile-visible.
6. W5 made Aurora runtime/shader/studio behavior measurable.
7. W6 used six audit lanes to close remaining blockers rather than adding new product scope.

## What Worked

- Agent lanes were most effective when scoped by ownership: public surface, consumers, components, style, dock/stories, Aurora.
- W1 proof scripts reduced later wave cost; `ay-close.sh` became a real close ceremony rather than a list of hopes.
- Runtime artifacts were more valuable after they carried route-specific assertions, not just page-load success.
- Aurora profiling was useful because it separated live RAF timing from thumbnail capture and recorded the oil DPR 2 heavy path without hiding it.

## What Was Corrected Late

W6 found and fixed issues that earlier wave gates did not fully cover:

- root policy allowlisting was still self-derived from `src/index.ts`;
- the dock public barrel still exposed internals;
- Tailwind container variables in `@theme` corrupted `max-w-2xl`;
- `--font-size-base` and `.shadow-cartoon-sm-hover` were retired in name but still present;
- dock popover offset parsing treated rem as raw px;
- Aurora oil `strokeAmount` controlled only impasto, not stroke coverage;
- `/aurora` proof checked context liveness but not pixels;
- Chrome profile cleanup could fail after profiling.

These are now covered by code, tests, or proof artifacts.

## Remaining Shape

F leaves five accepted P3 residuals, recorded in `W6-residuals.md`. None blocks the package contract, active consumers, runtime routes, style compile, or Aurora correctness. The next tranche should not start by reopening broad audit; it should pick one of the residuals only if it becomes product-relevant.

## Close Commit Order

- `ac8d9e2 docs(tranche-f): plan interaction style and rendering contract hardening`
- `c98dc4c docs(tranche-f/w0): close current-state ledger gate`
- `7dca483 feat(tranche-f/w1): add proof substrate and enforce active consumer imports`
- `09280c0 feat(tranche-f/w2): harden dock context portals and rail layer behavior`
- `f1cd338 fix(tranche-f/w3): harden component contracts and lifecycle cleanup`
- `5a8dd24 feat(tranche-f/w4): align Tailwind theme and style authority`
- `b523b20 feat(tranche-f/w5): harden Aurora runtime shader and profiling contracts`

W6 close commit follows this retro.
