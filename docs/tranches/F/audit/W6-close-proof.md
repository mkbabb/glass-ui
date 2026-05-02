# F.W6 Close Proof

Generated: 2026-05-02
Status: pass

## Command

`scripts/ay-close.sh`

Result: pass. The script completed typecheck, build, export verification, full tests, package proof, consumer static/build proofs, theme proof, runtime smoke, bundle profile, Aurora profile, and dist sizing.

## Gate Results

| Gate | Result | Evidence |
|---|---|---|
| Full typecheck | pass | `vue-tsc --noEmit` |
| Full build | pass | `vite build`; declaration generation completed with the existing API Extractor TypeScript-version warning |
| Export type proof | pass | `verify-export-types`: all package export targets and type resolutions valid |
| Full test suite | pass | `iter-test`: 18 files, 266 tests |
| Package fixture | pass | `W6-package-proof.json`, duration 4520 ms |
| Consumer static policy | pass | `W6-consumers-static.json`, 4 consumers, 865 files scanned, no root-surface failures |
| Consumer builds | pass | `W6-consumers-build.json`, 4 consumers passed |
| Theme/style proof | pass | `W6-tailwind-theme-proof.json`, duration 212 ms |
| Runtime smoke | pass | `W6-runtime-smoke.json`, 71 routes, 0 failures |
| Bundle profile | pass | `W6-bundle-profile.json` |
| Aurora profile | pass | `W6-aurora-profile.json`, 16 live cases and 22 thumbnail cases, 0 failures |

## Artifacts

- `docs/tranches/F/audit/W6-package-proof.json`
- `docs/tranches/F/audit/W6-consumers-static.json`
- `docs/tranches/F/audit/W6-consumers-build.json`
- `docs/tranches/F/audit/W6-tailwind-theme-proof.json`
- `docs/tranches/F/audit/W6-runtime-smoke.json`
- `docs/tranches/F/audit/W6-bundle-profile.json`
- `docs/tranches/F/audit/W6-aurora-profile.json`
- Runtime screenshots: `docs/tranches/F/audit/screenshots/W6/runtime/` (PNG files remain git-ignored)

## Measurements

Bundle profile:

| Wave | Total bytes | Total gzip | CSS bytes | CSS gzip | JS bytes | JS gzip |
|---|---:|---:|---:|---:|---:|---:|
| W1 | 403503 | 102634 | 44143 | 7056 | 359360 | 95578 |
| W4 | 390524 | 101781 | 26518 | 4847 | 364006 | 96934 |
| W5 | 391734 | 102181 | 26518 | 4847 | 365216 | 97334 |
| W6 | 392754 | 102358 | 26518 | 4847 | 366236 | 97511 |

Aurora profile:

| Case | DPR | Live preservation | Median frame | P95 frame | Over-budget frames |
|---|---:|---|---:|---:|---:|
| smooth sky | 2 | false | 8.2 ms | 10.0 ms | 0 |
| pastel deliberative | 2 | false | 8.3 ms | 10.1 ms | 0 |
| watercolor meadow | 2 | false | 8.3 ms | 9.9 ms | 0 |
| oil gestural | 2 | false | 25.2 ms | 33.8 ms | 87 |
| oil gestural | 2 | true | 32.1 ms | 34.8 ms | 87 |

Thumbnail capture through the shared capture context:

| DPR | Cases | P95 capture |
|---:|---:|---:|
| 1 | 11 | 4.8 ms |
| 2 | 11 | 16.2 ms |

Runtime smoke now asserts `/aurora` has a live WebGL2 canvas, live-mode `preserveDrawingBuffer: false`, no context loss, and nonblank sampled pixels.

## Dist Size

`du -sh dist`: 468K

Key built entries from the close run:

- `dist/glass-ui.css`: 26.52 kB, gzip 4.85 kB
- `dist/glass-ui.js`: 142.78 kB, gzip 22.99 kB
- `dist/dock.js`: 22.25 kB, gzip 6.64 kB
- `dist/aurora.js`: 47.80 kB, gzip 15.51 kB
