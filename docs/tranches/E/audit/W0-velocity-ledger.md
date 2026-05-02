# E.W0 Velocity Ledger

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

| Command | Tier | Writes files/cache | Latest observed result | When to run | Artifact path |
|---|---|---|---|---|---|
| `npm run iter-check` | fast | no intended source writes | prior audit: passed in about 4s | after source/config edits | console output in progress/proof doc |
| `npm run iter-test` | fast | no intended source writes | prior audit: passed in about 3s | after testable source edits | console output in progress/proof doc |
| `npm run verify-export-types` | fast/proof | no intended source writes | passed while still shallow | after package export edits | `W1-package-contract-proof.md` |
| `npm run iter-build` | proof | writes `dist` | not current; expected to fail or under-prove until W1 parity | after Vite entry changes | `W1-package-contract-proof.md` |
| `npm run iter` | wave proof | writes `dist` through iter build | not current | W1/W4 gates | `W1-package-contract-proof.md`, close docs |
| `npm run build` | package proof | writes `dist` and declarations | not current after W1 edits | W1/W3/W4 gates | `W1-package-contract-proof.md` |
| `npm pack --dry-run` | package proof | no source writes | not current | W1 gate | `W1-package-contract-proof.md` |
| packed-package import/type probe | package proof | temporary fixture/cache only | missing | W1 gate | `W1-package-contract-proof.md` |
| `scripts/validate-consumers.sh` | consumer proof | writes consumer build output | not current | W2/W3/W4 gates | `W2-consumer-proof.md`, close docs |
| `npm run profile-bundle` | profiling | writes `dist`; currently plain build | nominal, not profiling | W3 only after artifact-producing plan | `W3-runtime-bundle-proof.md` |
| `scripts/ay-close.sh` | close | clears `dist` and Vite cache, writes build outputs | not current | W4 only | `FINAL.md`, `E-retro.md` |

## Decisions

- Inner-loop work uses `iter-check`, focused Vitest, and `verify-export-types`.
- `validate-consumers` and `ay-close` are close/proof commands, not routine editing commands.
- `profile-bundle` must be treated as measurement-only until it emits a stable profile artifact.
