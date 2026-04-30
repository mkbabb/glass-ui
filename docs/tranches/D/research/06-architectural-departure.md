# A.D.research.06 — Architectural Departure: Plugin-First, Subpath-Routed Distribution

The "@mkbabb/glass-ui/* monolith-to-namespace" departure.

## Headline

Convert `@mkbabb/glass-ui` from a single-barrel monolith into a Tailwind-v4 plugin (CSS) plus a fan of importable JS subpaths (`/core`, `/dock`, `/aurora`, `/search`, `/sidebar`, `/sortable`, …) — same git tree, same `package.json`, no monorepo, but the substrate becomes "what your `import` line says" instead of "everything, every time".

## Why now

After D removes the 101 library-orphans, glass-ui's public surface is still a **single barrel** that ships everything as one tree-shake-or-die JS bundle plus one 40 kB CSS file. Three signals from disk:

1. **Three real consumers, ~20 distinct names imported across all of them.** `grep -rh 'from "@mkbabb/glass-ui"'` over `fourier-analysis/web/src`, `words/frontend/src`, `bbnf-lang/playground/src` shows uptake clusters around `Tooltip*`, `Dialog*`, `Select*`, `GlassDock + DockIconButton + DockPopover`, `FuzzySearch + sidebar composables`, `InfiniteScroll`, `Card`, `useGlobalDark`, `useOffsetPagination`, `UnderlineTabs`. **20 imported symbols out of 32 ui + 28 surviving custom + 18 composables.** The barrel pays JS cost for 80+ that nobody imports.

2. **`src/styles/glass.css` is Tailwind-plugin-shaped, not component-shaped.** `.glass-default`, `.glass-card`, `.glass-pill`, `.glass-cartoon` are atomic surface utilities; they belong in a Tailwind v4 `@plugin` whose output participates in the consumer's tree-shake. `theme.css:9-247` already exposes every token to Tailwind via `@theme`, so the half-step is taken — the components layer is the half that hasn't crossed.

3. **`custom/` is already organised as plugin-shaped subsystems.** 27 self-contained packages: `dock/`, `aurora/`, `search/`, `sidebar/`, `sortable-list/`, `glass-carousel/`, `timeline/`, `infinite-scroll/`, `metaballs/`, `typewriter/`, `expandable-container/`, etc. Each has an `index.ts`, often a `composables/` subfolder, and a clean external API. These are not co-equal "components" — they are **packages that happen to share a directory.**

The barrel currently flattens that natural shape. After D drops the orphans, ~28 custom subsystems will remain, and a consumer who wants only `<GlassDock>` still pays the parse cost for `Aurora`'s WebGL shader compiler module, the Mulberry32 PRNG, and `useFuzzySearch`'s 224-line index builder.

## The thesis

Convert the **publication shape** — not the source tree — to mirror how the code is already organised. Concretely:

```
package.json "exports" today                  package.json "exports" after E
─────────────────────────────────             ─────────────────────────────────
".":      ./src/index.ts                       ".":         ./src/core/index.ts        ← Button, Card, Tooltip, Dialog,
"./tokens": ./src/tokens.ts                                                                Select, Sheet, useGlobalDark,
"./styles": ./src/styles/index.css                                                         cn — the 80% surface
                                               "./dock":     ./src/components/custom/dock/index.ts
                                               "./aurora":   ./src/components/custom/aurora/index.ts
                                               "./search":   ./src/components/custom/search/index.ts
                                               "./sidebar":  ./src/components/custom/sidebar/index.ts
                                               "./sortable": ./src/components/custom/sortable-list/index.ts
                                               "./carousel": ./src/components/custom/glass-carousel/index.ts
                                               "./timeline": ./src/components/custom/timeline/index.ts
                                               …
                                               "./plugin":   ./dist/plugin.css          ← Tailwind v4 @plugin
                                               "./tokens":   ./src/tokens.ts            ← token CSS only (no @layer rules)
                                               "./styles":   DEPRECATED (keeps working, prints migration note)
```

Build pipeline (no monorepo):

```
single lib entry                multi-entry lib build
  src/index.ts                    src/core/index.ts          → dist/core.js
                                  src/components/custom/dock/index.ts → dist/dock.js
                                  src/components/custom/aurora/index.ts → dist/aurora.js
                                  …
                                + plugin.css emitted by a postcss step that
                                  strips token/@theme CSS and keeps only
                                  @layer components blocks
```

**The new architectural primitive**: `src/core/` — a deliberately-scoped subdirectory hosting `Button`, `Card`, `Input`, `Label`, `Tooltip*`, `Dialog*`, `Select*`, `Sheet*`, plus `cn`, `useGlobalDark`, `useKeyboardShortcuts`. Everything else moves out of the default import and into a named subpath. **A named "what counts as core" enforced by build, not convention.**

## Migration path

### Tranche E — Plugin extraction + subpath publication. Three waves.

- **E.W0**: enumerate cut-lines. Author `src/core/index.ts` as a strict allowlist of names (the audit's "kept + actually-used" set). Verify every consumer's current import list against it; anything imported that isn't in core is a forced subpath candidate.
- **E.W1**: rewrite `package.json#exports` with subpaths. Update `vite.config.ts` to multi-entry lib build. Land `dist/plugin.css` (postcss pipeline strips tokens.css + theme.css from styles bundle, keeps only `@layer components` rules). Each consumer's existing `import { GlassDock } from "@mkbabb/glass-ui"` keeps working via top-level `index.ts` that re-exports from subpaths and `console.warn`s on dev — same shape as Vue 3's `@vue/composition-api → @vue/runtime-core` deprecation.
- **E.W2**: convert each of three consumers to subpath imports. Bundle should shrink measurably; **delta is E's hard gate** (≥ 30% reduction in glass-ui-attributable JS for at least two of three consumers, measured against `vite build --analyze`).

### Tranche F — Tailwind plugin formalisation + tree-shaken CSS

The plugin extraction lands in E as a static CSS file. F upgrades it to a Tailwind v4 `@plugin` with `@source` directives and JS-side `addUtilities`/`addComponents` — meaning consumers' Tailwind builds tree-shake unused glass utilities. F also formalises the legacy `@import "@mkbabb/glass-ui/styles"` deprecation. F is where the **40 kB → ~12 kB CSS payload reduction** lands; E only sets the architectural stage.

(Optional, deferred): tranche G could fold prop-API unification via `defineComponentBase`. It composes; this thesis does not foreclose it.

## Breakage Surface

- **Top-level imports of non-core names emit a dev-time warning.** `import { Aurora } from "@mkbabb/glass-ui"` keeps working in E (re-export shim) but logs once. Consumers must migrate within E or G.
- **`@import "@mkbabb/glass-ui/styles"` becomes deprecated.** Consumers without Tailwind v4 (none of the three known) lose the convenient one-liner; they must `@import "@mkbabb/glass-ui/tokens"` (tokens-only) and accept components-layer CSS via `@plugin`.
- **Bundlers without Node-16 subpath-export support break.** All three consumers use Vite ≥ 5; non-issue today. README note.
- **Dev ergonomics: no more "import anything from one place".** Mitigation: subpath cheat sheet in CLAUDE.md.

## Tranche E sketch

**Opening**: glass-ui has organic package boundaries (27 custom/ subsystems plus a tight ui/ core). D revealed the public surface oversells; E narrows publication to the use shape. After E, `@mkbabb/glass-ui` means "core"; everything else is `@mkbabb/glass-ui/<subpath>`.

**Invariants**:
1. Source tree shape unchanged.
2. Every existing consumer import keeps compiling at E's commit boundary.
3. No new runtime dep; tailwindcss-v4 becomes a hard peer iff consumer opts into `/plugin`.
4. Token CSS remains independently importable for non-Tailwind consumers.
5. `vite build` clean; consumer `vite build --analyze` shows JS payload reduction for ≥ 2 of 3 consumers.

**Wave schedule**:

| Wave | Title | Hard gate |
|---|---|---|
| E.W0 | Cut-line enumeration | `src/core/index.ts` exists; consumer import diff committed |
| E.W1 | Subpath publication + plugin.css | `package.json#exports` populated; `npm pack` shows expected file list; consumer-A still builds |
| E.W2 | Three consumers migrated | `vite build --analyze` deltas captured; ≥ 30% glass-ui JS reduction in 2 consumers; zero `console.warn` from top-level imports |

## Comparators

- **radix-ui**: each primitive is its own npm package (`@radix-ui/react-<primitive>`). Same gestalt, monorepo-shaped. E's departure is monorepo-free (single git tree, single `package.json`) by leveraging Node `exports` subpaths — cheaper to operate, same shape externally.
- **headlessui** (Tailwind Labs): single package, ships as `@headlessui/vue`; styling left to consumer's Tailwind. The "no shipped component CSS" stance models E.W1's `dist/plugin.css → @plugin` extraction.
- **vanilla-extract / panda-css**: token-and-recipe split. Vanilla-extract's `createTheme` + `style` recipe maps onto glass-ui's `tokens.css` + `glass.css` split. Panda's `defineRecipe` is structurally what `glass-ui/plugin` becomes after F — recipe layer that consumer's build tree-shakes.
- **shadcn-vue** (current substrate base): no npm package — consumers copy. Glass-ui's value over shadcn-vue is precisely the npm-distribution dimension; subpath publication makes that dimension carry its weight.

## Risks

1. **Subpath fatigue**: consumers find `@mkbabb/glass-ui/dock` more friction than the barrel. Mitigation: keep barrel re-export with soft deprecation lasting E + F + G; both shapes work; dev warning nudges. If real friction emerges, deprecation never fires.
2. **Tailwind v4 plugin extraction lands incomplete CSS**: a `glass-cartoon::after` selector or `@supports not (backdrop-filter)` block doesn't survive postcss split. Mitigation: E.W1 hard gate is "every Playwright screenshot from C.W4's 68-route baseline matches at ≤ 0.5% pixel diff" — screenshot oracle exists.
3. **Type-only imports break under multi-entry builds**: `vite-plugin-dts`'s `rollupTypes:true` bundles all `.d.ts` into one — multi-entry needs per-entry `.d.ts`. Mitigation: switch to `rollupTypes:false` with explicit `entryRoot` per export; if dts split misbehaves, fallback is one `index.d.ts` with subpath re-exports of types.

## Critical files

- `package.json`
- `vite.config.ts`
- `src/index.ts`
- `src/styles/glass.css`
- `src/styles/theme.css`
