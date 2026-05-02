# E Final

Date: 2026-05-02

## Status

Tranche E is complete.

## Landed

- Root package export narrowed to the core allowlist.
- Non-core public components/composables moved to explicit subpaths.
- `./styles/*` and the `typesVersions` catchall removed.
- Real and iter builds share the same package entry map.
- `verify-export-types` validates object/string exports, wildcard absence, exact type mappings, TypeScript package resolution, source export limits, and declaration leakage.
- Consumers migrated to explicit subpaths and one public style path.
- Runtime proof covers dock layers, dock, rail, search, sidebar, carousel, aurora, and primitive routes.
- Broad source barrels and stale legacy/shim labels removed.

## Evidence

```bash
npm run iter
npm run build
npm run verify-export-types
node docs/tranches/E/audit/W1-packed-fixture.mjs
scripts/validate-consumers.sh
node docs/tranches/E/audit/W3-runtime-check.mjs
scripts/ay-close.sh
```

Final close run:

- `scripts/ay-close.sh` passed.
- `npm run iter` passed: 13 files, 233 tests.
- `scripts/validate-consumers.sh` passed for `fourier-analysis/web`, `words/frontend`, and `bbnf-lang/playground`.
- Runtime screenshots are in `docs/tranches/E/audit/screenshots/`.

## Artifacts

- `docs/tranches/E/audit/W0-contract-ledger.md`
- `docs/tranches/E/audit/W0-consumer-imports.md`
- `docs/tranches/E/audit/W0-style-ledger.md`
- `docs/tranches/E/audit/W0-package-exports.md`
- `docs/tranches/E/audit/W0-build-parity.md`
- `docs/tranches/E/audit/W0-velocity-ledger.md`
- `docs/tranches/E/audit/W1-package-contract-proof.md`
- `docs/tranches/E/audit/W2-consumer-proof.md`
- `docs/tranches/E/audit/W3-runtime-bundle-proof.md`
- `docs/tranches/E/audit/W4-export-audit.md`
- `docs/tranches/E/audit/W4-consumer-audit.md`
- `docs/tranches/E/audit/W4-residuals.md`
- `docs/tranches/E/audit/E-retro.md`

## Commits And Tag

- W1/W3 precursor commits: `6ce14e5`, `99e2998`.
- Close commit: this commit.
- Close tag: `e-close`.
