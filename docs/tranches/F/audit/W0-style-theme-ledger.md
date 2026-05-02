# F.W0 Style And Theme Ledger

W0 found that the style system is not ready for plugin extraction or byte floors. W4 must first make Tailwind v4 theme namespaces valid, remove inert bridges, and settle component style authority.

## Theme Namespace And Token Issues

| File/surface | Current issue | W4 action |
|---|---|---|
| `src/styles/theme.css` | old or inert namespaces such as `--font-size-*`, `--font-family-*`, `--line-height-*`, `--letter-spacing-*`, and `--transition-timing-function-*` | move to valid Tailwind v4 namespaces: `--text-*`, `--font-*`, `--leading-*`, `--tracking-*`, and `--ease-*` |
| `src/styles/theme.css` | self-referential variables such as `--color-gold: var(--color-gold)` and similar shadow/token bridges | split runtime tokens from Tailwind theme aliases or use a deliberate inline bridge with non-self runtime names |
| Dock blur tokens | `--glass-blur-dock` is a filter recipe, not a proven Tailwind `blur-*` length | keep as a named glass recipe unless W4 intentionally adds length-backed `--blur-*` utilities |
| Shimmer/progress utilities | `blue-shimmer` references undefined variables; `progress-gradient` uses raw colors | route through named tokens or remove if unconsumed |

## Global Utility And Selector Risks

| Surface | Current issue | W4 action |
|---|---|---|
| `src/styles/utilities.css` | utility sprawl: `active-scale`, `disabled-base`, `progress-gradient`, `blue-shimmer`, `shimmer-text`, `code-badge`, `inline-pill` need evidence | keep only consumed utilities with clear ownership; localize component-sized utilities |
| `src/styles/index.css` | public CSS entry is correct and contains `@source "../components"` | keep as the single public style path and prove consumer style import policy |
| Dock styles | global `dock.css` and scoped dock SFC styles duplicate authority | W2 decides runtime-owned structure; W4 removes duplication |
| `:deep(*)` and broad deep selectors | brittle component reach-through in carousel/dock/search surfaces | replace with scoped class contracts or component-local primitives |
| Raw z-index values | `DockPopover` arithmetic, `useSortable` `9999`, and toast/notification `z-50` compete | route through named z-index tokens after W2 |
| Viewport/calc chains | dock/search/sidebar/story sizing includes magic `calc()/min()/max()` chains | keep only the chains that carry layout invariants; name or simplify the rest |
| Global reduced motion | global `*` reduced-motion overrides use `!important` broadly | narrow where feasible without breaking accessibility |

## Story And Configurator Drift

| Surface | Current issue | W4 action |
|---|---|---|
| `demo/configurator/useConfigurator.ts` | writes `--hue-shift` and density variables with little/no consumer evidence | wire to live style behavior or remove controls |
| `cartoonShadow` setting | writes `--shadow-card`, while stories use `shadow-cartoon` and inline fallbacks | choose one token authority and prove configurator parity |
| Composition stories | raw `rounded-card bg-card shadow-cartoon` and inline `var(--shadow-cartoon, var(--shadow-card))` repeat surface logic | normalize through `Card`, glass utilities, or one consumed demo-local `StorySurface` if needed |

## W4 Proof Requirements

- Tailwind compile probe proves expected custom utilities are generated.
- No accidental self-referential theme variables remain.
- One public style path remains: `@mkbabb/glass-ui/styles`.
- Dock CSS has one authority after W2.
- Visual changes are isomorphic except where W4 names a deliberate contract correction.
- Bundle/CSS deltas are recorded as measurements, not gates.
