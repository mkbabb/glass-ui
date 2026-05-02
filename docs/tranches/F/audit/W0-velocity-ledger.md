# F.W0 Velocity And Proof Ledger

W0 confirmed that fast local checks exist, but close proof is not yet durable enough. W1 owns proof scripts before product changes proceed.

## Current Commands

| Command | Tier | Current role | Latest observed result | W1 disposition |
|---|---|---|---|---|
| `npm run iter-check` | fast | typecheck/lint-style gate | pass, about 4-6s | keep fast gate |
| `npm run iter-test` | fast | unit tests | pass, 13 files / 233 tests, about 3-7s | keep fast gate |
| `npm run verify-export-types` | fast/package | export/type resolution | pass, about 0.5s | keep and include in close |
| `npm run profile-bundle` | label | currently aliases Vite build | no structured artifact | replace with artifact-producing `profile:bundle` |
| `npm run profile-consumers` | label | aliases consumer validation | mixed concerns | split into static/build proof |
| `scripts/validate-consumers.sh` | mixed | builds three consumers and checks package contracts | no speedtest build and no static policy | thin aggregate or retire after W1 scripts |
| `scripts/ay-close.sh` | close | typecheck/build/tests/consumers | misses export verification/runtime/profile artifacts | update to W1 close tier |
| `docs/tranches/E/audit/W3-runtime-check.mjs` | tranche-local | useful route smoke prototype | not reusable | promote to `scripts/proof-runtime.mjs` or equivalent |

## W1 Script Ownership

| File | Required change |
|---|---|
| `package.json` | add `proof:package`, `proof:consumers:static`, `proof:consumers:build`, `proof:runtime`, `profile:bundle`; update close script aliases |
| `scripts/proof-package.mjs` | promote packed-package fixture proof and write JSON under `docs/tranches/F/audit/` |
| `scripts/proof-consumers-static.mjs` | enforce root/subpath/style/source-relative import policy across active consumers |
| `scripts/proof-consumers-build.sh` | build active consumers separately and emit machine-readable status |
| `scripts/proof-runtime.mjs` | reusable route smoke with JSON and screenshot artifacts |
| `scripts/profile-bundle.mjs` | build and record JS/CSS/gzip/chunk measurements |
| `scripts/validate-consumers.sh` | keep as compatibility wrapper around W1 scripts or retire from close |
| `scripts/ay-close.sh` | call the full W1 proof tier |

## Consumer Proof Details

| Consumer | W1 proof role |
|---|---|
| `../fourier-analysis/web` | static/build control consumer |
| `../words/frontend` | static/build control consumer |
| `../bbnf-lang/playground` | static migration and build proof |
| `../speedtest` | static migration, source-relative cleanup, and build proof |

## Artifact Paths

W1 commands must write structured artifacts under:

- `docs/tranches/F/audit/W1-package-proof.json`
- `docs/tranches/F/audit/W1-consumers-static.json`
- `docs/tranches/F/audit/W1-consumers-build.json`
- `docs/tranches/F/audit/W1-runtime-smoke.json`
- `docs/tranches/F/audit/W1-bundle-profile.json`
- `docs/tranches/F/audit/screenshots/W1/**`

## Close Principle

Fast checks remain optimized for iteration, but F close must be one durable proof tier that proves package, consumers, runtime stories, style compile, bundle/profile, Aurora profile, and residual audit. Labels without artifacts do not satisfy close.
