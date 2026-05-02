# F.W1 Consumer Contract Proof

W1 migrated active non-core root imports in the two drifted consumers and added a static gate that prevents the drift from returning.

## Static Policy

`scripts/proof-consumers-static.mjs` rejects:

- non-core named symbols imported from `@mkbabb/glass-ui`;
- root namespace/default imports from `@mkbabb/glass-ui`;
- package subpaths that are not declared in `package.json#exports`;
- stylesheet imports from package paths other than `@mkbabb/glass-ui/styles`;
- source-relative imports into `glass-ui/src`;
- Tailwind `@source` paths pointed at `glass-ui/src`.

The policy allows root imports for the current core surface and allows consumer Tailwind scanning of the installed package output rather than the source tree.

## Consumer Results

| Consumer | W1 action | Static proof | Build proof |
|---|---|---|---|
| `../fourier-analysis/web` | control lane; no non-core root drift found by W1 | pass | pass |
| `../words/frontend` | control lane; no non-core root drift found by W1 | pass | pass |
| `../bbnf-lang/playground` | migrated `DarkModeToggle`, dock, search, and sidebar symbols to subpaths | pass | pass |
| `../speedtest` | migrated Aurora, dock, controls, tabs, infinite-scroll, metric, pulse, toggle, tooltip, and expandable-container symbols to subpaths; replaced `glass-ui/src` test/style references | pass | pass |

## Consumer Worktree Notes

The sibling repositories already contained unrelated dirty work before W1. W1 preserved it:

- `../bbnf-lang` has a pre-existing unmerged file outside the playground ownership path; W1 changed only `playground/src/**` import routes.
- `../speedtest` has pre-existing docs, meter, and token work; W1 changed only the import/source paths needed for the glass-ui contract and left unrelated edits intact.

Because those repositories are independently dirty, the committed glass-ui evidence is the static/build proof plus this ledger. No compatibility shim was added to glass-ui.

## Drift Closed

The W0 drift list now resolves to explicit public paths:

| Surface | Public path |
|---|---|
| Dock components | `@mkbabb/glass-ui/dock` |
| Tabs | `@mkbabb/glass-ui/tabs` |
| Dark mode control | `@mkbabb/glass-ui/controls` |
| Search | `@mkbabb/glass-ui/search` |
| Sidebar helpers | `@mkbabb/glass-ui/sidebar` |
| Infinite scroll | `@mkbabb/glass-ui/infinite-scroll` |
| Aurora | `@mkbabb/glass-ui/aurora` |
| Metric badge | `@mkbabb/glass-ui/metric-badge` |
| Pulse | `@mkbabb/glass-ui/pulse` |
| Toggle chip | `@mkbabb/glass-ui/toggle-chip` |
| Expandable container | `@mkbabb/glass-ui/expandable-container` |
| Icon tooltip | `@mkbabb/glass-ui/icon-tooltip` |

## W1 Close Decision

Consumer drift is closed for active consumers and is now machine-enforced. W2 may assume that dock/navigation work does not need root compatibility exports.
