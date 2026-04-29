# E — Subpath Publication + Tailwind Plugin

Tranche document for Phase 5 of the glass-ui storybook reform. Adapted to bbnf-lang's tranche spec. Tranche letters: A = build-out, B = Coherent Chrome, C = Operational Truth, D = Substrate-with-Consumer, **E = Subpath Publication + Tailwind Plugin**.

Folds the originally-separate "subpath publication" and "Tailwind plugin formalisation" tranches into one — the plugin extraction lands as part of the multi-entry build anyway; splitting them was ceremonial overhead.

## Opening

D closes when every public-surface symbol earns its export through a Playwright-walked story or a forward-compat doc. The library that emerges has organic package boundaries — `dock/`, `aurora/`, `search/`, `sidebar/`, `sortable-list/`, `glass-carousel/`, `timeline/`, `metaballs/`. E converts the publication shape (not the source tree) to mirror those boundaries: `@mkbabb/glass-ui` becomes "core" (Button, Card, Input, Label, Tooltip*, Dialog*, Select*, Sheet*, Drawer*, Badge, Separator, plus `cn`, `useGlobalDark`, `useKeyboardShortcuts`, `useClipboard`, `useOffsetPagination`, `buttonVariants`, `badgeVariants`); everything else is `@mkbabb/glass-ui/<subpath>`. Same wave ships the Tailwind v4 `@plugin` extraction so consumers' Tailwind builds tree-shake unused glass utilities; dist CSS drops from ~40 kB to ≤ 12 kB per consumer's actual usage.

## Architectural thesis

A consumer that imports `<Tooltip>` should not pay parse cost for WebGL shader compilation. The current barrel ships everything; tree-shaking helps but doesn't eliminate the cost (named imports still load module graphs). Subpath publication via `package.json#exports` makes the import line the build-time gate. The 27-some `custom/` directories surviving D are already plugin-shaped — E exposes them at their natural granularity. The Tailwind plugin half is the same gestalt for CSS: every `@layer components` rule moves into a Tailwind v4 `@plugin` with `@source` directives and `addUtilities` / `addComponents` hooks; consumers' Tailwind builds emit only the utilities their templates reference. Tokens stay in `tokens.css` for the non-Tailwind fallback path. Same git tree. No monorepo. The architecture is just `package.json#exports` + `vite.config.ts` multi-entry + a postcss-or-Tailwind-plugin pipeline.

## Invariants

Cross-tranche preserved (1-13 from C + D); E-specific:

14. **Source tree shape unchanged.** Same paths, same internal imports inside the package. Only `package.json#exports`, `vite.config.ts`, `src/core/index.ts` (NEW), and `dist/plugin.{css,ts}` (NEW) change at the boundary.
15. **Existing consumer imports keep compiling at E-close.** Top-level barrel becomes a re-export shim with dev-time `console.warn` per non-core symbol. Production strips warnings via `import.meta.env.PROD` guard.
16. **Tailwind v4 is a hard peer iff consumer opts into `/plugin`.** Otherwise tokens-only CSS path stays available.
17. **Token CSS independently importable.** `@mkbabb/glass-ui/tokens` ships `tokens.css` for non-Tailwind consumers; deliberately-kept fallback. The component-layer rules ship via `/plugin` only.
18. **Per-entry dts.** `vite-plugin-dts` switches to `rollupTypes: false` with explicit `entryRoot` per export.
19. **Consumer JS reduction is one of two close gates.** ≥ 30% glass-ui-attributable JS reduction in ≥ 2/3 consumers (`vite build --analyze` baseline from D-close vs E-close).
20. **Consumer CSS reduction is the other close gate.** Final dist CSS payload (per consumer's Tailwind output, not the library's `dist/plugin.css` raw size) drops from ~40 kB to ≤ 12 kB in ≥ 2/3 consumers.
21. **Pixel oracle.** Every Playwright route from D-close baseline matches at ≤ 0.5% pixel diff post-E across light + dark modes.

## Wave schedule

| Wave | Title | Agents | Mode | Workspace at close | Hard gate (one-line) | Status |
|---|---|---|---|---|---|---|
| W0 | Cut-line + per-consumer baseline | 3 | parallel | green | `src/core/index.ts` allowlist; consumer-import audit; per-consumer JS+CSS baseline captured | planned |
| W1 | Multi-entry lib + Tailwind v4 plugin | 4 | parallel | green | `package.json#exports` populated; multi-entry build clean; `dist/plugin.{css,ts}` ships as Tailwind v4 plugin; barrel becomes deprecation shim | planned |
| W2 | Three consumer migrations | 3 | parallel | green | every consumer's non-core imports moved to subpaths; consumer's `tailwind.config` adds `@plugin "@mkbabb/glass-ui/plugin"`; deprecated `@import "@mkbabb/glass-ui/styles"` removed | planned |
| W3 | Bundle-delta + pixel oracle verification | 1 | sequential | green | ≥ 30% JS reduction in ≥ 2/3; CSS ≤ 12 kB in ≥ 2/3; pixel-diff ≤ 0.5% per route | planned |
| W4 | Re-audit + close ceremony | 4 + orchestrator | parallel + n/a | green | re-audit clean; FINAL + retro; tag `e-close` | planned |

## Phases

### E.W0 — Cut-line + per-consumer baseline (3 parallel)

#### E.W0.A — `src/core/index.ts` allowlist
- **Mechanism**: author the strict allowlist re-export. Initial set per opening paragraph; refined per W0.B.
- **Files**: `src/core/index.ts` (create).
- **Sub-gate**: file exists; `npm run typecheck` clean.

#### E.W0.B — Consumer-import audit
- **Mechanism**: `rg "from ['\"]@mkbabb/glass-ui['\"]" ../fourier-analysis/web/src/ ../words/frontend/src/ ../bbnf-lang/playground/src/`. Per consumer: extract every imported symbol. Cross-reference against W0.A allowlist. Force-subpath set = consumer-imported symbols absent from `src/core/`.
- **Files**: `docs/tranches/E/audit/W0-consumer-imports.md`.
- **Sub-gate**: per-consumer table; force-subpath set enumerated.

#### E.W0.C — Per-consumer JS + CSS baseline
- **Mechanism**: in each consumer, `npm run build` then capture (a) glass-ui-attributable JS bytes from `vite build --analyze` stats, (b) glass-ui-attributable CSS bytes from final `dist/assets/*.css`. Save baseline.
- **Files**: `docs/tranches/E/audit/W0-baseline-{fourier,words,bbnf}.txt`.
- **Sub-gate**: three baseline files exist; each contains JS bytes + CSS bytes lines.

**Hard gate (W0)**: allowlist + audit + baselines landed.

### E.W1 — Multi-entry lib + Tailwind v4 plugin (4 parallel)

#### E.W1.A — `package.json#exports` rewrite
- **Mechanism**: replace single-entry exports with subpath map (one per surviving custom package per D-close). Conditional exports per entry: `import` → `./dist/<name>.js`, `types` → `./dist/<name>.d.ts`. Plus `./tokens` (tokens.css) and `./plugin` (Tailwind v4 plugin entry).
- **Files**: `package.json`.
- **Sub-gate**: `npm pack --dry-run` shows expected file list; package validates against `npm publish --dry-run`.

#### E.W1.B — `vite.config.ts` multi-entry + per-entry dts
- **Mechanism**: convert single `lib.entry` to entry map (core + every surviving custom subpath). Switch `vite-plugin-dts` to `rollupTypes: false` with explicit per-entry `entryRoot`.
- **Files**: `vite.config.ts`.
- **Sub-gate**: `npm run build` exit 0; `dist/` contains N `.js` + N `.d.ts` files (N = subpath count); tree-shake test (`vite build --analyze` against a probe consumer importing only `Button` from `core`) shows zero aurora/dock/search code in core bundle.

#### E.W1.C — Tailwind v4 plugin extraction
- **Mechanism**: author `dist/plugin.ts` (or `.js`) as a Tailwind v4 plugin function. It registers every `@layer components` rule from `glass.css`, `dock.css`, `cards.css`, `floating-panel.css`, `transitions.css`, `animations.css`, `utilities.css` via `addUtilities`/`addComponents`. `@source` directives include the library's component templates so Tailwind can scan for class usage.
  - Postcss alternative path (fallback): if Tailwind plugin authoring proves too brittle for v4 at time of E.W1, ship `dist/plugin.css` as static — consumers `@import "@mkbabb/glass-ui/plugin"`. Plugin formalisation lands as a follow-on commit (still within E, not deferred). Decision point: at W1.C dispatch, evaluate Tailwind v4 plugin DX; pick whichever works first-attempt cleanly.
- **Files**: `src/plugin.ts` (create — built to `dist/plugin.js`); `dist/plugin.css` if static path chosen.
- **Sub-gate**: a probe consumer with `@plugin "@mkbabb/glass-ui/plugin"` in its `@import "tailwindcss";` block compiles; emits only the utilities its templates reference; pixel-diff vs raw `glass-ui.css` import ≤ 0.5%.

#### E.W1.D — Top-level barrel becomes deprecation shim
- **Mechanism**: `src/index.ts` rewritten to import from `./core` for core symbols and from `./components/custom/<package>` for non-core, with one-time `console.warn` per non-core symbol on dev. Production guards strip warnings.
- **Files**: `src/index.ts` (rewrite).
- **Sub-gate**: existing consumer imports keep compiling; dev console shows one warn per non-core import; production builds emit zero warns.

**Hard gate (W1)**: multi-entry build clean; `package.json#exports` validates; Tailwind plugin (or fallback `plugin.css`) ships; deprecation shim warns dev-only.

### E.W2 — Three consumer migrations (3 parallel)

Per consumer (`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`):

- **Mechanism**: walk every `from "@mkbabb/glass-ui"`; route non-core symbols to subpath imports per W0.B's force-subpath table. Replace consumer's `@import "@mkbabb/glass-ui/styles"` with `@import "@mkbabb/glass-ui/tokens"` plus `@plugin "@mkbabb/glass-ui/plugin"` in the consumer's Tailwind entry.
- **Files**: consumer source + Tailwind entry (modify).
- **Sub-gate**: zero `console.warn` from top-level imports; `vite build --analyze` shows reduced JS; consumer `dist/assets/*.css` shows reduced CSS; pixel-diff ≤ 0.5% per route.

**Hard gate (W2)**: all three consumers migrated cleanly.

### E.W3 — Bundle-delta + pixel oracle (sequential, orchestrator)

- **Mechanism**: orchestrator-led. Diff E.W0.C baseline vs post-W2 stats per consumer. Diff Playwright screenshot baseline (D-close) vs post-W2 visual state per consumer.
- **Files**: `docs/tranches/E/audit/W3-bundle-delta.md`.
- **Sub-gate**: ≥ 30% glass-ui JS reduction in ≥ 2/3 consumers; CSS ≤ 12 kB in ≥ 2/3 consumers; per-route pixel-diff ≤ 0.5%.

**Hard gate (W3)**: both bundle gates pass + pixel oracle.

### E.W4 — Re-audit + close ceremony (4 + orchestrator)

#### E.W4.A — Re-run hardened audit
- **Sub-gate**: actionable ≤ 5 (D's invariant held).

#### E.W4.B — Final QA sweep
- **Mechanism**: Playwright walks every route in light + dark + reduced-motion (E uses direct Playwright, not MCP — closes C's deferred CDP gap).
- **Sub-gate**: zero console errors all modes; consumer builds clean.

#### E.W4.C — FINAL.md
- **Sub-gate**: every E.W{0..3} sub-phase has commit hash row.

#### E.W4.D — Retro
- **Sub-gate**: covers (a) Tailwind v4 plugin DX (if W1.C took the plugin path) or postcss split brittleness (if static fallback); (b) consumer migration ergonomics — subpath fatigue measured; (c) per-entry dts behaviour; (d) JS + CSS reduction actuals vs target.

#### E.W4.E (orchestrator) — tag `e-close`

**Hard gate (W4)**: re-audit clean; FINAL + retro; tag.

## Critical files

| File | Owning sub-phase | Access |
|---|---|---|
| `src/core/index.ts` | E.W0.A | create |
| `docs/tranches/E/audit/W0-consumer-imports.md` | E.W0.B | create |
| `docs/tranches/E/audit/W0-baseline-{fourier,words,bbnf}.txt` | E.W0.C | create |
| `package.json` | E.W1.A | modify |
| `vite.config.ts` | E.W1.B | modify |
| `src/plugin.ts` | E.W1.C | create |
| `src/index.ts` | E.W1.D | modify (rewrite as shim) |
| Consumer source + Tailwind entry (×3) | E.W2.A/B/C | modify |
| `docs/tranches/E/audit/W3-bundle-delta.md` | E.W3 | create |
| `docs/tranches/E/audit/W4-overfitting-*.md` + integrated | E.W4.A | create |
| `docs/tranches/E/FINAL.md` | E.W4.C | create |
| `docs/tranches/E/audit/E-retro.md` | E.W4.D | create |

## Hard gates summary

| Wave | Gate | Verification artefact |
|---|---|---|
| W0 | core allowlist + consumer-import audit + JS/CSS baselines per consumer | file existence + content |
| W1 | multi-entry build clean; package.json validates; Tailwind plugin (or static fallback) ships; deprecation shim dev-warns only | `npm run build` exit + `npm pack --dry-run` + probe-consumer build |
| W2 | three consumers migrated; zero console.warn; reduced JS + CSS captured | `rg console.warn` empty; analyze stats |
| W3 | ≥ 30% JS reduction in ≥ 2/3; CSS ≤ 12 kB in ≥ 2/3; pixel-diff ≤ 0.5% | bundle-delta table; pixel oracle |
| W4 | re-audit clean; FINAL + retro; tag `e-close` | re-audit table; `git show e-close` |

### Floor-check

- W3's "≥ 30% JS in ≥ 2/3" gate: A6 estimated 80+ symbols out of ~78 imported (post-D); core ~25 symbols. Tree-shake captures named-import savings; subpath captures module-graph savings. Per-consumer reduction depends on import mix — small consumers see less, large see more. The "2/3 ≥ 30%" gate accommodates asymmetry. Floor estimated > 30% in 2/3 from the import-cluster analysis; gate achievable.
- W3's "CSS ≤ 12 kB in ≥ 2/3" gate: current dist CSS is 40 kB. Tailwind v4 plugin tree-shake on consumers' actual class usage (from grep across consumer src/) estimates 8-15 kB per consumer; ≤ 12 kB in 2/3 is the conservative target.

## Cross-tranche debt

**Inherited from D**:
- ~27 surviving custom packages (post-D delete). Each gets a subpath at E.W1.B.
- Reduced-motion CDP gap (resolves at E.W4.B with direct Playwright).

**Forwarded to F**:
- Prop-API unification (`defineComponentBase`, `withProps`).
- Deeper a11y sweep (focus rings, aria coverage, dark contrast) — uses E's screenshot baseline.
- Consumer adoption push (move bbnf-lang/playground or fourier-analysis/web to use more glass-ui primitives).

## Escape clause

- **Tailwind v4 plugin DX brittleness at W1.C**: fall back to postcss-extracted static `dist/plugin.css`; plugin formalisation lands as a follow-on commit within E. Not a separate tranche.
- **Per-entry dts misbehaves**: fallback to single `index.d.ts` with subpath re-exports of types.
- **Consumer migration breaks non-glass-ui dependency**: out of E's scope; restore one-symbol barrel import, name F as destination. Single-symbol exception.
- **Bundle reduction < 30% in only 1/3 consumers**: not a failure if ≥ 2 hit the bar. Asymmetry documented.
- **Diagnostic-loop relinquish**: 3+ iterations without commit → halt + research+plan+redress.

## Comparators

- **radix-ui**: `@radix-ui/react-<primitive>` per-package monorepo. E achieves the same external shape via Node `exports` subpaths — no workspace overhead.
- **headlessui**: single package; styling left to consumer's Tailwind. Models E.W1.C plugin extraction.
- **vanilla-extract / panda-css**: token-and-recipe split. Maps onto glass-ui's tokens.css + glass.css split. Panda's `defineRecipe` is structurally what E's `@plugin` becomes.
- **shadcn-vue**: no npm package — consumers copy. Glass-ui's value is the npm-distribution dimension; subpath publication makes that dimension carry weight.

## Ground rules

Inherited from D (1-13) + bbnf-lang SPEC. E adds invariants 14-21.

- Source tree unchanged; refactors of internal imports happen later.
- Existing imports keep compiling at E-close (deprecation shim).
- Consumer reductions (JS + CSS) are the close gates.
- Per-entry dts.
- Token CSS independent.
- Pixel oracle on every D-close baseline route.

## Checklist — ready to dispatch E.W0

- [ ] D-close tag landed.
- [ ] D's surviving custom packages enumerated (input to E.W1.B entry map).
- [ ] `docs/tranches/E/E.md` on master.
- [ ] Worktrees pre-created.
- [ ] Allow-lists disjoint within W0.
- [ ] Master clean.

## Checklist — ready to close E

- [ ] Every sub-phase landed with commit hash.
- [ ] Every invariant (1-21) verified with artefact.
- [ ] `npm pack --dry-run` shows expected file list.
- [ ] All 3 consumers built clean post-migration.
- [ ] JS reduction ≥ 30% in ≥ 2/3.
- [ ] CSS ≤ 12 kB in ≥ 2/3.
- [ ] Pixel-diff ≤ 0.5% per route.
- [ ] FINAL.md + retro committed.
- [ ] `git tag e-close` placed.
