# E.W3 Runtime + Bundle Proof

Date: 2026-05-02

## Runtime Route Proof

Local dev server:

```bash
npm run dev -- --host 127.0.0.1
```

Runtime checker:

```bash
node docs/tranches/E/audit/W3-runtime-check.mjs
```

The checker launches installed Chrome headless through the Chrome DevTools Protocol, visits representative routes, records console/page errors, verifies `#app` and `main` render, checks that `MissingStory` is absent, and writes screenshots.

| Route | HTTP | Console/page errors | Fallback count | Screenshot |
|---|---:|---:|---:|---|
| `/navigation/dock-layers` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/current-dock-layers.png` |
| `/navigation/dock` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/dock.png` |
| `/navigation/rail` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/rail.png` |
| `/data/search` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/search.png` |
| `/navigation/sidebar` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/sidebar.png` |
| `/navigation/carousel` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/carousel.png` |
| `/aurora` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/aurora.png` |
| `/primitives/buttons` | 200 | 0 | 0 | `docs/tranches/E/audit/screenshots/primitive-buttons.png` |

## Bundle / CSS Snapshot

Measured after `npm run build`.

| File | Bytes |
|---|---:|
| `dist/glass-ui.js` | 140657 |
| `dist/glass-ui.css` | 44143 |
| `dist/dock.js` | 20034 |
| `dist/search.js` | 14008 |
| `dist/sidebar.js` | 13362 |
| `dist/glass-carousel.js` | 7231 |
| `dist/aurora.js` | 46748 |
| `dist/typewriter.js` | 20296 |
| `dist/virtual.js` | 6578 |
| `dist/pagination.js` | 1089 |

Compared to the pre-cutover iter-build root reported during W0 recovery (`dist/glass-ui.js` 169.13 kB / gzip 32.00 kB), the final root build is `140.66 kB / gzip 22.40 kB`. CSS remains `44.14 kB / gzip 7.06 kB`.

## Consumer Gate

```bash
scripts/validate-consumers.sh
```

Passed after the runtime/bundle proof, including all three consumer builds and package-contract validation.

## Consumer Output Snapshot

W0 was recovered after implementation had already started, so no reliable pre-W1 consumer output artifact exists to compute exact before/after byte deltas. E therefore records final consumer outputs as the post-cutover baseline and does not claim consumer byte wins.

| Consumer | Final output evidence |
|---|---|
| `fourier-analysis/web` | `dist/assets/index-FNwsjWN3.css` 169.52 kB gzip 28.21 kB; largest JS `dist/assets/index-DKkIH_Kj.js` 951.06 kB gzip 379.71 kB; existing large-chunk warning retained |
| `words/frontend` | `dist/assets/index-CXA8q-Ys.css` 316.80 kB; largest app JS `dist/assets/index-C4lsR-Xr.js` 489.46 kB; existing Browserslist and mixed dynamic/static import warnings retained |
| `bbnf-lang/playground` | `dist/assets/index-Dzq-Ygzg.css` 215.81 kB gzip 33.98 kB; largest route JS `dist/assets/DocsPage-DWg5DLFV.js` 9500.49 kB gzip 3137.44 kB; existing large worker/route chunk warnings retained |

## Notes

- The screenshots are proof artifacts, not product assets.
- Bundle deltas are recorded as measurements only; E has no byte-size hard floor.
- Browser proof uses a repeatable local Chrome DevTools Protocol checker because no in-app Browser Use console-capture tool was available in this session.
