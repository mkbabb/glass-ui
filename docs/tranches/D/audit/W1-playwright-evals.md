# D.W1 - Playwright Route Evaluations

Integrated browser verification for D.W1 after all five W1 implementation
commits were cherry-picked to `master`.

## Environment

- Dev server: `npm run dev -- --host 127.0.0.1`
- URL root: `http://127.0.0.1:5173`
- Browser runtime: Codex in-app browser, Playwright API
- Integrated commits: `5bc8f38`, `2db79b1`, `5a52be2`, `974a49c`, `527f2c3`

## Focused Checks

| Route | Check | Result |
|---|---|---|
| `/data/search` | Route renders without fallback | `mainChildren=1`, `fallbackCount=0` |
| `/data/search` | Typing `dock` settles to result cards | `visible-result-count=3`, `result-card=3` |
| `/data/search` | Helper controls fire | `buildIndex/searchIndex/fuzzyMatch/clearSearchCache = 1/1/1/1` |
| `/containers/glass-carousel` | Next control changes active slide | `1 / 5` -> `2 / 5` |
| `/containers/glass-carousel` | `useGlassCarousel` readout renders | `start=false`, `end=true`, `visualExpanded=true` |
| `/data/sortable-list` | `SORTABLE_CONTEXT` consumer renders | `contextReadoutCount=1` |
| `/foundations/paper-glass` | `GlassPanel` cards render | `panelCards=3`, renderer readout `svg-filter` |
| `/motion/metaballs` | Metaballs support route renders | `supportReadouts=1`, `directCanvas=1`, `directFallback=0` |
| `/primitives/toggle` | ToggleChip chip state changes | `[FOURIER]` -> `[FOURIER, CHEBYSHEV]` |
| `/primitives/toggle` | ToggleChip variants render | `chipVariants=3`, `cellVariants=3` |
| `/navigation/dock-layers` | Layer button changes active layer | `ROOT` -> `ASSETS` |
| `/navigation/dock` | Dock trigger story renders | `triggerSectionCount=1`; select/dropdown readouts visible |

Dock-trigger interactive evidence came from the D.W1.D worktree gate before
cherry-pick: `/navigation/dock` select changed to `Timeline`, dropdown changed
to `Share workspace`, `/navigation/dock-layers` changed active layer to
`assets`, with zero captured browser errors.

## Full Route Walk

Manifest-derived route walk:

```text
totalRoutes=71
passedRoutes=71
failures=[]
errorLogCount=0
errors=[]
```

Every route had `main > *` content and no `Pick a story` fallback after client
render settled.

## Build Gates

```text
npm run typecheck: exit 0
npm run build: exit 0
dist/glass-ui.css 39.81 kB
dist/glass-ui.js 378.58 kB
```
