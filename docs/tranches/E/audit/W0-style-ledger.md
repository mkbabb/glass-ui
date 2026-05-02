# E.W0 Style Ledger

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

## Consumer Style Imports

| Consumer | Current import | E path | W2 action |
|---|---|---|---|
| `../fourier-analysis/web/src/style.css` | `@import "@mkbabb/glass-ui/styles";` | `@mkbabb/glass-ui/styles` | keep |
| `../words/frontend/src/assets/index.css` | `@import '@mkbabb/glass-ui/styles';` | `@mkbabb/glass-ui/styles` | keep |
| `../bbnf-lang/playground/src/assets/styles/main.css` | `@import "@mkbabb/glass-ui/styles";` | `@mkbabb/glass-ui/styles` | keep |

No consumer currently needs `@mkbabb/glass-ui/styles/*`.

## Package Style Decision

| Export | Current target | E target | W1 action |
|---|---|---|---|
| `./styles` | `./src/styles/index.css` | `./src/styles/index.css` | keep canonical Tailwind source CSS; wildcard remains retired |
| `./styles/*` | `./src/styles/*` | retired | remove from `package.json#exports` |

## Build Finding

Consumer builds proved that `./styles` cannot point at compiled `dist/glass-ui.css` yet: consumers still need the Tailwind v4 source CSS so `@theme`, `@utility`, `@source`, and local `@apply` composition resolve in one graph. E therefore keeps the single public style path at `@mkbabb/glass-ui/styles` but publishes only `src/styles/index.css`, not `./styles/*`.

## Dirty Style Slice

Current dirty style changes touch:

- `src/styles/dock.css`: public dark-mode toggle sizing helpers.
- `src/styles/tokens.css`: floating z-index tier increases.
- `src/styles/utilities.css`: `.metric-badge` public utility.
- `src/components/custom/controls/DarkModeToggle.vue`: duplicated dark-mode toggle sizing rules.
- `src/components/custom/metric-badge/MetricBadge.vue`: local `.metric-badge` styling that duplicates the public utility.

W1/W3 action: collapse duplicate component-scoped rules into the public utility where possible, then prove runtime behavior in `W3-runtime-bundle-proof.md`.
