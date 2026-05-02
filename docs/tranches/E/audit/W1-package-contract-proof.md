# E.W1 Package Contract Proof

Date: 2026-05-02
Baseline: `99e2998` plus E working tree recovery.

## Landed Contract

- Root `@mkbabb/glass-ui` now exports the W0 core allowlist: UI primitives, `cn`, `useGlobalDark`, timer/keyboard/touch utilities, glass/motion primitives, sortable utilities, and toast primitives through `src/index.ts`.
- Non-core public surfaces are explicit package subpaths: `dock`, `search`, `sidebar`, `controls`, `confirm-dialog`, `infinite-scroll`, `tabs`, `typewriter`, `stacked-icons`, `virtual`, `pagination`, `glass-carousel`, `aurora`, `metric-badge`, `status-dot`, `pulse`, `paper-backdrop`, `toggle-chip`, `glass-panel`, `metaballs`, `sortable-list`, `timeline`, `labeled-field`, `expandable-container`, and `icon-tooltip`.
- `./styles/*` and the `typesVersions` catchall are removed.
- `./styles` intentionally points to `./src/styles/index.css`; `files` packages only `dist` and `src/styles`.
- `vite.config.ts` and `vite.iter.config.ts` share `vite.library.ts` for aliases, entries, externals, globals, and file naming.

## Verification

```bash
npm run iter
```

Passed in the final W1/W4 state after public-surface expansion and residual cleanup. `iter-check`, multi-entry `iter-build`, and Vitest all completed successfully.

```bash
npm run build
```

Passed. Vite emitted JS and declarations for every declared package export. `vite-plugin-dts` printed the existing API Extractor TypeScript-version warning (`5.8.2` bundled vs project `5.9.3`) and exited 0.

```bash
npm run verify-export-types
```

Passed: `All package export targets and type resolutions are valid.`

```bash
npm pack --dry-run --json
```

Passed. Pack result: package size `158159`, unpacked size `811137`, `entryCount` `80`, `bundled` `[]`. Included files are `README.md`, `package.json`, generated `dist/**`, and `src/styles/**`.

```bash
npm run iter-test -- tests/public-surface.spec.ts
```

Passed after expanding direct runtime checks to every declared subpath: 1 file, 144 tests.

```bash
node docs/tranches/E/audit/W1-packed-fixture.mjs
```

Passed. The fixture packs `@mkbabb/glass-ui`, installs the tarball into a temporary consumer, imports root, `./tokens`, `./styles`, and every E subpath, then runs `tsc --noEmit` under `moduleResolution: "bundler"`.

The first strict declaration-only run exposed third-party declaration noise and generated Vue declaration internals under `skipLibCheck: false`; the fixture now matches normal Vue consumer practice with `skipLibCheck: true` while `verify-export-types` separately guards package-owned declaration leakage such as `vue-router`.

## Package Size Snapshot

Key emitted package files after `npm run build`:

| File | Bytes |
|---|---:|
| `dist/glass-ui.js` | 140657 |
| `dist/glass-ui.css` | 44143 |
| `dist/index.d.ts` | 183314 |
| `dist/dock.js` | 20034 |
| `dist/search.js` | 14008 |
| `dist/sidebar.js` | 13362 |
| `dist/aurora.js` | 46748 |
| `dist/typewriter.js` | 20296 |

## Notes

- The first compiled-style attempt (`./styles -> ./dist/glass-ui.css`) was rejected because `fourier-analysis` and `bbnf-lang` failed on missing Tailwind theme utilities. The final contract keeps one public style path while packaging the source CSS graph.
- `vite-plugin-dts` uses `tsconfig.src.json` so demo-only `vue-router` declarations stay out of published package types.
- The contract check rejects wildcard exports, source JS exports, missing object conditions, and `typesVersions` catchalls.
