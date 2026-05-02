# F.W1 Proof Substrate

W1 promoted tranche-local checks into reusable scripts and artifact-producing package commands. The scripts are intentionally split by concern so later waves can run the narrow proof they need without invoking a full close ceremony.

## Scripts Landed

| Script | Package command | Artifact | Role |
|---|---|---|---|
| `scripts/proof-package.mjs` | `npm run proof:package` | `W1-package-proof.json` | builds/packs the package and verifies a fresh TypeScript fixture can import root, styles, and all declared subpaths |
| `scripts/proof-consumers-static.mjs` | `npm run proof:consumers:static` | `W1-consumers-static.json` | enforces root-import, subpath, style-path, and source-relative import policy across active consumers |
| `scripts/proof-consumers-build.sh` | `npm run proof:consumers:build` | `W1-consumers-build.json` | builds all active consumers separately |
| `scripts/proof-runtime.mjs` | `npm run proof:runtime` | `W1-runtime-smoke.json`, local screenshots | starts/uses the dev server, drives headless Chrome through all manifest routes, and fails on blank routes, `MissingStory`, console errors, or wrong resolved paths |
| `scripts/profile-bundle.mjs` | `npm run profile:bundle` | `W1-bundle-profile.json` | runs `iter-build` and records JS/CSS raw and gzip sizes by file and extension |
| `scripts/validate-consumers.sh` | `npm run validate-consumers` | consumer static/build artifacts | compatibility wrapper over the split consumer proof |
| `scripts/ay-close.sh` | `npm run ay-close` | full close artifacts | updated close tier with typecheck, build, export proof, tests, package fixture, consumers, runtime, and bundle profile |

## Command Evidence

| Command | Result |
|---|---|
| `npm run iter-check` | pass |
| `npm run iter-test` | pass, 13 files / 233 tests |
| `npm run verify-export-types` | pass |
| `npm run proof:consumers:static` | pass, four active consumers scanned |
| `npm run proof:consumers:build` | pass, four active consumers built |
| `npm run proof:package -- --build` | pass, fresh packed fixture installed and typechecked |
| `npm run profile:bundle` | pass, 39 dist files measured |
| `npm run proof:runtime` | pass, 71 manifest routes checked |

## Artifact Summary

| Artifact | Summary |
|---|---|
| `W1-consumers-static.json` | all four consumers pass static policy |
| `W1-consumers-build.json` | all four consumers pass `npm run build` |
| `W1-package-proof.json` | build, pack, install, and fixture typecheck steps pass |
| `W1-runtime-smoke.json` | 71 routes pass; no `MissingStory`, wrong route, blank main, or console/page error failures |
| `W1-bundle-profile.json` | total dist measurement: 403,503 bytes raw / 102,634 bytes gzip; CSS: 44,143 bytes raw / 7,056 bytes gzip |

## Runtime Screenshots

`proof:runtime` captured local screenshots for the high-risk W1 routes under `docs/tranches/F/audit/screenshots/W1/runtime/`. PNGs remain git-ignored; the committed JSON artifact records each screenshot path.

## Close Decision

W1 proof substrate is sufficient for later waves. W2 can now use `proof:runtime` and consumer static/build gates without reimplementing route or consumer harnesses.
