# Tranche BH

Repo cleanup, de-indirection, and the 5.0.0 restructure — interleaved with the live BG tranche, cut jointly as 5.0.0.

- **[PLAN.md](./PLAN.md)** — the tranche plan: 8 bands (B0-B7), ~30 waves, the BG-interleave protocol, the framing decisions, hard gates, residuals.
- **[prompts/](./prompts/)** — the three reusable cleanup prompts (legacy-excision, backend-restructure, frontend-restructure). Staged repo-local; promoted to the precepts submodule via B6's by-name ask.
- **[coordination/asks-and-consumes.md](./coordination/asks-and-consumes.md)** — the B7 cross-repo migration roster (the 5.0.0 break = drop `./api` + 2 sibling asks).
- **[research/](./research/)** — the basis: 3 pass-synthesis docs (74% → 82% → 91%), 8 lane reports, 20 runnable prototypes (the `regen-api-migration` 203-row map, the fail-closed regen gate, the codemods).

Developed via three convergent pass-loops (research → prototype → critique → synthesize). Convergence 91/100, authorable. Execution awaits greenlight; the concurrent-safe bands (B0/B1/B2.0/B6/…) run without touching BG's write-set.
