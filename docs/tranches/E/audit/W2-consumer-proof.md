# E.W2 Consumer Proof

Date: 2026-05-02

## Migration Summary

All known consumers were migrated from non-core root imports to explicit subpaths while preserving approved root imports for UI primitives, `cn`, `useGlobalDark`, `toast`, and `useToast`.

| Consumer | Build command | Result |
|---|---|---|
| `../fourier-analysis/web` | `npm run build` (`vue-tsc -b && vite build`) | PASS |
| `../words/frontend` | `npm run build` (`vue-tsc --noEmit && vite build`) | PASS |
| `../bbnf-lang/playground` | `npm run build` (`vite build`) | PASS |

Repository-wide gate:

```bash
scripts/validate-consumers.sh
```

Passed. It also verified package export targets and local `speedtest` / `keyframes.js` package resolution.

## Import Cleanup

Retired style paths are absent:

```bash
rg -n "@mkbabb/glass-ui/.+styles|@mkbabb/glass-ui/styles/" ../fourier-analysis/web ../words/frontend ../bbnf-lang/playground
```

Result: no matches.

Remaining root imports are approved core imports. Non-core imports now resolve through explicit subpaths, including:

```text
@mkbabb/glass-ui/dock
@mkbabb/glass-ui/search
@mkbabb/glass-ui/sidebar
@mkbabb/glass-ui/controls
@mkbabb/glass-ui/confirm-dialog
@mkbabb/glass-ui/infinite-scroll
@mkbabb/glass-ui/tabs
@mkbabb/glass-ui/typewriter
@mkbabb/glass-ui/stacked-icons
@mkbabb/glass-ui/virtual
@mkbabb/glass-ui/pagination
```

Known subpath examples after migration:

- `../fourier-analysis/web`: dock, tabs, pagination, infinite-scroll.
- `../words/frontend`: dock, confirm-dialog, controls, tabs, typewriter, stacked-icons, virtual, sidebar.
- `../bbnf-lang/playground`: dock, search, sidebar, controls.

## Consumer Warnings

- `fourier-analysis/web` and `bbnf-lang/playground` retain their existing large chunk warnings.
- `words/frontend` retains its existing stale Browserslist data warning and dynamic/static import warning for `src/api/entries.ts`.
- These warnings were not introduced by E and did not fail builds.

## Dirty Consumer State

Consumer repositories had unrelated dirty work before W2. E changed import lines only where needed for the package contract; external consumer commits are not made from this repo unless separately isolated.
