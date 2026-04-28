# E — Subpath Publication

Tranche document for Phase 5 of the glass-ui storybook reform. Adapted to bbnf-lang's tranche spec. Tranche letters: A = build-out, B = Coherent Chrome, C = Operational Truth, D = Substrate-with-Consumer, **E = Subpath Publication**.

Authored at `c-close` based on A6's research (`docs/tranches/D/research/06-architectural-departure.md`); finalised at D-close after D's surface narrowing produces the actual cut-line.

## Opening

D closes when every public-surface symbol earns its export through a Playwright-walked story or a forward-compat doc. The library that emerges has organic package boundaries — `dock/`, `aurora/`, `search/`, `sidebar/`, `sortable-list/`, `glass-carousel/`, `timeline/`, `metaballs/` — each a self-contained subsystem. E converts the publication shape (not the source tree) to mirror those boundaries: `@mkbabb/glass-ui` becomes "core" (Button, Card, Input, Label, Tooltip*, Dialog*, Select*, Sheet*, Badge, Separator, plus `cn`, `useGlobalDark`, `useKeyboardShortcuts`, `TooltipProvider`, `buttonVariants`); everything else is `@mkbabb/glass-ui/<subpath>`. Tailwind v4 plugin extraction lands in F as the natural next step; E's hard gate is consumer JS payload reduction.

## Architectural thesis

A consumer that imports `<Tooltip>` should not pay the parse cost of WebGL shader compilation. The current barrel ships everything, every time; tree-shaking helps but doesn't eliminate the cost (named imports still load module graphs). Subpath publication via `package.json#exports` makes the **import line** the build-time gate: `import { Aurora } from "@mkbabb/glass-ui/aurora"` builds aurora's module graph; `import { Button } from "@mkbabb/glass-ui"` does not. Same git tree, same `package.json`, no monorepo — Node's subpath-export field carries the architecture. The 27 `custom/` directories surviving D are already plugin-shaped; E exposes them at their natural granularity.

## Invariants

Cross-tranche preserved (1-13 from C + D); E-specific:

14. **Source tree shape unchanged.** Same paths, same internal imports inside the package. Only `package.json#exports`, `vite.config.ts`, and `src/core/index.ts` (NEW) change at the boundary.
15. **Existing consumer imports keep compiling at E-close.** Top-level `index.ts` becomes a re-export shim with dev-time `console.warn` ("import GlassDock from '@mkbabb/glass-ui/dock'"). Same shape as Vue 3's `@vue/composition-api → @vue/runtime-core` deprecation cycle.
16. **No new runtime dep.** `tailwindcss-v4` becomes a hard peer iff consumer opts into `/plugin` (E ships `dist/plugin.css` as static; F formalises as Tailwind plugin).
17. **Token CSS independently importable.** `@mkbabb/glass-ui/tokens` ships tokens-only CSS for non-Tailwind consumers. Deliberately-kept fallback.
18. **Per-entry dts.** `vite-plugin-dts` switches from `rollupTypes: true` to `rollupTypes: false` with explicit `entryRoot` per export. If misbehaves, fallback: one `index.d.ts` with subpath re-exports of types.
19. **Consumer JS payload reduction is the close gate.** ≥ 30% glass-ui-attributable JS reduction in ≥ 2/3 consumers (`vite build --analyze` baseline from D-close vs E-close).

## Wave schedule

| Wave | Title | Agents | Mode | Workspace at close | Hard gate (one-line) | Status |
|---|---|---|---|---|---|---|
| W0 | Cut-line enumeration + per-entry baseline | 3 | parallel | green | `src/core/index.ts` exists with strict allowlist; consumer-import diff committed; `vite build --analyze` baseline captured per consumer | planned |
| W1 | Multi-entry build + subpath publication + plugin.css | 4 | parallel | green | `package.json#exports` populated; `npm pack` shows expected file list; per-entry dts emits cleanly; barrel becomes shim with dev-warn; consumer-A still builds against shim | planned |
| W2 | Three consumers migrated to subpath imports | 3 | parallel | green | every consumer's `from "@mkbabb/glass-ui"` import audited; non-core imports moved to subpaths; zero `console.warn` from top-level imports | planned |
| W3 | Bundle-delta verification + screenshot oracle | 1 | sequential | green | `vite build --analyze` deltas captured; ≥ 30% glass-ui-JS reduction in ≥ 2/3 consumers; Playwright pixel-diff vs D-close baseline ≤ 0.5% per route | planned |
| W4 | Re-audit + close ceremony | 4 + orchestrator | parallel + n/a | green | re-audit clean; FINAL.md + retro committed; tag `e-close` | planned |

## Phases

### E.W0 — Cut-line enumeration + per-entry baseline (3 parallel)

#### E.W0.A — `src/core/index.ts` allowlist authoring
- **Mechanism**: author `src/core/index.ts` as a strict allowlist re-export. Initial set (refined per W0.B audit):
  - Components: `Button`, `Card` + sub-components, `Input`, `Label`, `Badge`, `Separator`, `Tooltip` + `TooltipProvider` + `TooltipTrigger` + `TooltipContent`, `Dialog` + sub-components, `Select` + sub-components, `Sheet` + sub-components, `Drawer` + sub-components.
  - Composables: `useGlobalDark`, `useKeyboardShortcuts`, `useClipboard`, `useOffsetPagination`.
  - Utilities: `cn`.
  - CVA helpers: `buttonVariants`, `badgeVariants`.
- **Files**: `src/core/index.ts` (create).
- **Sub-gate**: file exists; `npm run typecheck` clean (allowlist resolves to existing exports).

#### E.W0.B — Consumer-import audit
- **Mechanism**: `rg "from ['\"]@mkbabb/glass-ui['\"]" ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/` extract every imported symbol per consumer. Cross-reference against E.W0.A's allowlist. Symbols imported by consumer but absent from `src/core/index.ts` are **forced subpath candidates** — must have a subpath ready in W1. Symbols absent from the allowlist that no consumer imports are unused (D should have caught these).
- **Files**: `docs/tranches/E/audit/W0-consumer-imports.md` (create).
- **Sub-gate**: per-consumer import table; intersection with `src/core/index.ts`; force-subpath set enumerated.

#### E.W0.C — Per-consumer baseline measurement
- **Mechanism**: in each of the three consumer dirs, `npm run build -- --mode=analyze` (or equivalent rollup-plugin-visualizer mode); capture the glass-ui-attributable JS size from the resulting `stats.html` (or programmatic equivalent). Save as baseline.
- **Files**: `docs/tranches/E/audit/W0-baseline-{fourier,words,bbnf}.txt` (create — text-only stats per consumer, the orchestrator can `du`-style read).
- **Sub-gate**: three baseline files exist; each contains "glass-ui JS bytes" line that W3 will diff against.

**Hard gate (W0)**: `src/core/index.ts` allowlist exists; consumer-import audit table covers all three consumers; per-consumer baseline captured.

### E.W1 — Multi-entry build + subpath publication + plugin.css (4 parallel)

#### E.W1.A — `package.json#exports` rewrite
- **Mechanism**: replace single-entry exports with subpath map:
  ```json
  "exports": {
    ".":         { "import": "./dist/core.js", "types": "./dist/core.d.ts" },
    "./core":    { "import": "./dist/core.js", "types": "./dist/core.d.ts" },
    "./dock":    { "import": "./dist/dock.js", "types": "./dist/dock.d.ts" },
    "./aurora":  { "import": "./dist/aurora.js", "types": "./dist/aurora.d.ts" },
    "./search":  { "import": "./dist/search.js", "types": "./dist/search.d.ts" },
    "./sidebar": { "import": "./dist/sidebar.js", "types": "./dist/sidebar.d.ts" },
    "./sortable":{ "import": "./dist/sortable.js", "types": "./dist/sortable.d.ts" },
    "./carousel":{ "import": "./dist/carousel.js", "types": "./dist/carousel.d.ts" },
    "./timeline":{ "import": "./dist/timeline.js", "types": "./dist/timeline.d.ts" },
    "./metaballs":{"import": "./dist/metaballs.js", "types": "./dist/metaballs.d.ts" },
    "./tokens":  "./src/styles/tokens.css",
    "./styles":  "./src/styles/index.css",
    "./plugin":  "./dist/plugin.css"
  }
  ```
  Final subpath set determined by D's surviving custom packages.
- **Sub-gate**: `npm pack --dry-run` shows expected file list; package validates against `npm publish --dry-run`.

#### E.W1.B — `vite.config.ts` multi-entry
- **Mechanism**: convert single `lib.entry` to entry map:
  ```ts
  build: {
    lib: {
      entry: {
        core: 'src/core/index.ts',
        dock: 'src/components/custom/dock/index.ts',
        aurora: 'src/components/custom/aurora/index.ts',
        search: 'src/components/custom/search/index.ts',
        sidebar: 'src/components/custom/sidebar/index.ts',
        sortable: 'src/components/custom/sortable-list/index.ts',
        carousel: 'src/components/custom/glass-carousel/index.ts',
        timeline: 'src/components/custom/timeline/index.ts',
        metaballs: 'src/components/custom/metaballs/index.ts',
      },
      formats: ['es']
    }
  }
  ```
  Switch `vite-plugin-dts` to `rollupTypes: false` with explicit per-entry `entryRoot`.
- **Sub-gate**: `npm run build` exit 0; `dist/` contains 9 `.js` files + 9 `.d.ts` files; each entry's tree-shake test (`vite build --analyze` against a `import { Button } from "./dist/core.js"` consumer) shows zero aurora/dock/search code in the core bundle.

#### E.W1.C — `dist/plugin.css` extraction
- **Mechanism**: postcss step in `vite.config.ts` that takes `src/styles/index.css` (which `@import`s tokens.css + theme.css + glass.css + dock.css + cards.css + floating-panel.css + transitions.css + animations.css + utilities.css), strips the token + `@theme` imports (those land at `tokens.css`), and emits the residual `@layer components` blocks to `dist/plugin.css`. Retains every utility class definition.
- **Sub-gate**: `dist/plugin.css` exists; line-count comparable to current `dist/glass-ui.css`'s `@layer components` body; visual diff via screenshot oracle ≤ 0.5%.

#### E.W1.D — Top-level barrel becomes deprecation shim
- **Mechanism**: `src/index.ts` (legacy barrel) becomes a re-export shim that imports from `./core` for core symbols, and from `./components/custom/<package>` for non-core, with a one-time `console.warn` per non-core symbol on dev. Same shape as Vue 3's `composition-api` deprecation.
- **Sub-gate**: existing consumer imports (`import { GlassDock } from "@mkbabb/glass-ui"`) keep compiling; dev-mode console shows one warn per non-core import; production mode strips warns (vite-define guard).

**Hard gate (W1)**: 9-entry build clean; `package.json#exports` validates; `npm pack` shows expected file list; legacy shim warns in dev only; screenshot oracle pixel-diff ≤ 0.5% per consumer baseline route.

### E.W2 — Three consumers migrated (3 parallel)

#### E.W2.A — `fourier-analysis/web` migration
#### E.W2.B — `words/frontend` migration
#### E.W2.C — `bbnf-lang/playground` migration

- **Mechanism per consumer**: walk every `from "@mkbabb/glass-ui"` import; route non-core symbols to subpath imports per W0.B's force-subpath table. Build + verify; capture post-migration `vite build --analyze` stats.
- **Sub-gate**: zero `console.warn` from top-level imports; `vite build --analyze` shows reduced glass-ui-attributable JS; per-consumer screenshot pixel-diff vs D-close baseline ≤ 0.5%.

**Hard gate (W2)**: all three consumers migrated; `console.warn` stream empty across all three; per-consumer JS reduction captured.

### E.W3 — Bundle-delta verification + screenshot oracle

- **Mechanism**: orchestrator-led. Diff E.W0.C baseline vs post-W2 stats per consumer. Diff Playwright screenshot baseline (D-close) vs post-W2 visual state per consumer.
- **Files**: `docs/tranches/E/audit/W3-bundle-delta.md` (create — per-consumer table + verdict).
- **Sub-gate**: ≥ 30% glass-ui-attributable JS reduction in ≥ 2/3 consumers; per-route pixel-diff ≤ 0.5%.

**Hard gate (W3)**: bundle delta and pixel oracle both pass.

### E.W4 — Re-audit + close ceremony (4 + orchestrator)

#### E.W4.A — Re-run hardened audit
- **Mechanism**: re-dispatch 4-agent canned overfitting audit. Expect actionable count ≤ 5 (D's close gate held).
- **Sub-gate**: actionable ≤ 5.

#### E.W4.B — Final QA sweep
- **Mechanism**: Playwright walks every route in light + dark + reduced-motion (E adds direct-Playwright reduced-motion since MCP CDP gap is forwarded debt). Three consumer builds.
- **Sub-gate**: zero console errors all modes; consumer builds clean.

#### E.W4.C — FINAL.md
- **Sub-gate**: every E.W{0..3} sub-phase has commit hash row.

#### E.W4.D — Retro
- **Sub-gate**: covers (a) subpath fatigue measurement, (b) per-entry dts behaviour, (c) consumer migration ergonomics, (d) bundle reduction actuals vs target.

#### E.W4.E (orchestrator) — tag `e-close`

**Hard gate (W4)**: re-audit clean; FINAL.md + retro committed; tag `e-close` placed.

## Critical files

| File | Owning sub-phase | Access | Purpose |
|---|---|---|---|
| `src/core/index.ts` | E.W0.A | create | strict allowlist re-export |
| `docs/tranches/E/audit/W0-consumer-imports.md` | E.W0.B | create | per-consumer import table |
| `docs/tranches/E/audit/W0-baseline-{fourier,words,bbnf}.txt` | E.W0.C | create | per-consumer JS baseline |
| `package.json` | E.W1.A | modify | exports map rewrite |
| `vite.config.ts` | E.W1.B | modify | multi-entry lib build + per-entry dts |
| `dist/plugin.css` | E.W1.C | (build artefact) | extracted @layer components |
| `src/index.ts` | E.W1.D | modify | deprecation shim |
| `../fourier-analysis/web/src/**`, `../words/frontend/src/**`, `../bbnf-lang/playground/src/**` | E.W2.A/B/C | modify | consumer migration to subpaths |
| `docs/tranches/E/audit/W3-bundle-delta.md` | E.W3 | create | bundle reduction verification |
| `docs/tranches/E/audit/W4-overfitting-*.md` + integrated | E.W4.A | create | re-audit |
| `docs/tranches/E/FINAL.md` | E.W4.C | create | close document |
| `docs/tranches/E/audit/E-retro.md` | E.W4.D | create | retro |

## Hard gates summary

| Wave | Gate | Verification artefact |
|---|---|---|
| W0 | core allowlist exists; consumer-import audit covers all 3; baseline captured | file existence + content |
| W1 | 9-entry build clean; package.json#exports validates; npm pack expected list; screenshot pixel-diff ≤ 0.5% | `npm run build` exit; `npm pack --dry-run`; pixel oracle |
| W2 | three consumers migrated; zero console.warn; per-consumer JS reduction captured | `rg console.warn` empty; analyze-stats deltas |
| W3 | ≥ 30% glass-ui JS reduction in ≥ 2/3 consumers; pixel-diff ≤ 0.5% per route | bundle-delta table; pixel oracle |
| W4 | re-audit clean; FINAL + retro; tag `e-close` | re-audit table; `git show e-close` |

### Floor-check

- W3's "≥ 30% reduction" gate: A6 estimated 80+ symbols out of ~78 imported (post-D); core would be ~25 symbols. Tree-shake captures named-import savings; subpath captures module-graph savings. Per-consumer reduction depends on import mix — small consumers (fourier-analysis/web's ~10 imports) see less; large consumers (bbnf-lang/playground at 3.6 MB) see more. The "2/3 consumers ≥ 30%" gate accommodates this asymmetry.

## Cross-tranche debt

**Inherited from D**:
- 27-some surviving custom packages (post-D delete sweep). Each gets a subpath at E.W1.B.
- Reduced-motion CDP gap (E.W4.B uses direct Playwright, not MCP).

**Forwarded to F — Tailwind v4 Plugin**:
- `dist/plugin.css` static file → upgrade to `@plugin` directive with `@source` + JS `addUtilities`/`addComponents`.
- 40 kB → ≤ 12 kB CSS payload reduction.
- Removal of deprecated `@import "@mkbabb/glass-ui/styles"` path.

**Forwarded to G or beyond**:
- Prop-API unification (`defineComponentBase`, `withProps`).
- Deeper a11y sweep.
- Consumer adoption push.

## Escape clause

- **Per-entry dts misbehaves**: fallback to single `index.d.ts` with subpath re-exports of types. Documented in W1.B sub-phase.
- **postcss split fails to preserve a `glass-cartoon::after` or `@supports not (backdrop-filter)` block**: pixel-diff oracle catches it; W1.C reverts the offending block to `dist/glass-ui.css` (pre-split) and the component referencing it deprecates the plugin path. Single-rule reversion, not tranche pause.
- **Consumer migration breaks a non-glass-ui dependency**: out of E's scope; document, restore consumer to barrel import for that one symbol, name F as the destination. Single-symbol exception with explicit rationale.
- **Bundle reduction < 30% in only 1 of 3 consumers**: not a failure if ≥ 2 hit the bar; the asymmetry is documented at W3.

## Comparators (per A6 research)

- **radix-ui**: `@radix-ui/react-<primitive>` per-package monorepo. E achieves the same external shape via Node `exports` subpaths — cheaper to operate, no workspace overhead.
- **headlessui**: `@headlessui/vue` single package; styling left to consumer's Tailwind. Models E.W1.C's plugin.css extraction.
- **vanilla-extract / panda-css**: token-and-recipe split. Maps onto glass-ui's tokens.css + glass.css split. Panda's `defineRecipe` is what F's `@plugin` becomes.
- **shadcn-vue**: no npm package — consumers copy. Glass-ui's value is the npm-distribution dimension; subpath publication makes that dimension carry weight.

## Ground rules

Inherited from D (1-13) + bbnf-lang SPEC. E adds invariants 14-19. Specifically:

- **Source tree shape unchanged.** Refactors of internal imports happen in F or later, not E.
- **Existing imports keep compiling at E-close.** Top-level shim with dev warn; deprecation cycle spans E + F + G.
- **Consumer JS reduction is the close gate.** Not a vanity metric — the structural validation that publication shape changed the build's input.
- **Per-entry dts.** No `rollupTypes: true` consolidation; each entry has its own `.d.ts`.
- **Token CSS independent.** Non-Tailwind consumers retain `@import "@mkbabb/glass-ui/tokens"` even after F formalises the plugin.

## Checklist — ready to dispatch E.W0

- [ ] D-close tag landed.
- [ ] D's surviving custom packages enumerated (input to E.W1.B's entry map).
- [ ] `docs/tranches/E/E.md` on master.
- [ ] Worktrees pre-created.
- [ ] Allow-lists disjoint within W0.
- [ ] Master clean.

## Checklist — ready to close E

- [ ] Every sub-phase landed with commit hash.
- [ ] Every invariant (1-19) verified with artefact.
- [ ] `npm pack --dry-run` shows expected file list.
- [ ] All 3 consumers built clean post-migration.
- [ ] Bundle deltas captured; ≥ 30% in ≥ 2/3 consumers.
- [ ] Pixel oracle ≤ 0.5% per route.
- [ ] FINAL.md + retro committed.
- [ ] `git tag e-close` placed.
