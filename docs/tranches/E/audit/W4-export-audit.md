# E.W4 Export Audit

Date: 2026-05-02

## Verdict

Green after redress.

## Findings And Redress

1. Generated root declarations imported `vue-router` while `vue-router` was demo-only.
   - Source: `dist/index.d.ts` before redress.
   - Fix: `vite.config.ts` now points `vite-plugin-dts` at `tsconfig.src.json`.
   - Guard: `scripts/verify-export-types.mjs` now fails if generated declarations import `vue-router`.

2. Public surface tests asserted runtime symbols but did not prove installed tarball use.
   - Fix: added `docs/tranches/E/audit/W1-packed-fixture.mjs`.
   - Proof: the fixture packs the package, installs it into a temp consumer, imports root, `./tokens`, `./styles`, and every E subpath, then runs `tsc --noEmit`.

## Current Export State

- No `package.json#exports` wildcard remains.
- No `typesVersions` catchall remains.
- `./styles` is the only public style export and points to `./src/styles/index.css`.
- `files` is limited to `dist` and `src/styles`.
- Real and iter builds share `vite.library.ts`.
- `src/components/index.ts` and `src/components/custom/index.ts` were removed so the retired broad custom barrel cannot re-enter root accidentally.

## Commands

```bash
npm run iter
npm run build
npm run verify-export-types
node docs/tranches/E/audit/W1-packed-fixture.mjs
```

All passed in the final W4 state.

## Residual Risk

`vite-plugin-dts` still prints the API Extractor TypeScript-version warning (`5.8.2` bundled vs project `5.9.3`) but exits 0. This is a tool-version warning, not an export-contract failure.
