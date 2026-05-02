# F.W3 Component Contract Proof

Date: 2026-05-02

## Scope Closed

W3 repaired the component contract risks called out by W0 without broad API churn.

- Search highlights now render as Vue text/`mark` segments instead of generated HTML.
- Search query caches are scoped per index instance and store full result sets, so later `maxResults` calls cannot inherit a truncated cache entry.
- `useFuzzySearch` clears debounce timers on query/source changes, close, and scope disposal.
- `ProgressiveSidebar` keeps `renderTitle(title)` as a string transform but renders the returned value as text, not HTML.
- `MultiSelect` renders string icons as text and supports component icons; component icon values are unwrapped before `<component>` rendering to avoid reactive component warnings.
- `DataTable` accepts `getRowId(row)` ahead of `rowKey`, supports nested `rowKey`, and falls back to object identity with development warnings for missing or duplicate identities.
- `TypewriterText` tracks delayed starts/backspaces and clears owned timers on unmount.
- `ExpandableContainer` uses a shared ref-counted body overflow lock and restores the previous body overflow value after the final lock releases.
- `useGlassCarousel` detaches scroll listeners from the viewport element that was actually bound.
- Empty custom ownership directories (`animation`, `form`, `rail`) were removed when still unused.

## Tests Added

- `src/components/custom/search/__tests__/search-contracts.test.ts`
- `src/components/custom/sidebar/ProgressiveSidebar.spec.ts`
- `src/components/ui/multi-select/MultiSelect.spec.ts`
- `src/components/ui/data-table/DataTable.spec.ts`
- `tests/lifecycle-cleanup.spec.ts`

## Unsafe HTML Audit

Command:

```sh
rg -n "v-html" src demo
```

Result: no matches.

This closes the W3 hard gate for consumer-provided HTML boundaries. No new trusted/sanitized HTML boundary was introduced.

## Evidence

- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 249 tests
- `npm run iter-build`: pass
- `GLASS_UI_RUNTIME_ARTIFACT=docs/tranches/F/audit/W3-runtime-smoke.json GLASS_UI_RUNTIME_SCREENSHOT_DIR=docs/tranches/F/audit/screenshots/W3/runtime npm run proof:runtime`: pass, 71 routes
- `rg -n "v-html" src demo`: no matches
- `git diff --check`: pass

Runtime artifact:

- `docs/tranches/F/audit/W3-runtime-smoke.json`

## Residuals

- `renderTitle(title): string` remains a text-transform API. It is no longer an HTML rendering API.
- `MultiSelectOption.icon` keeps `string | Component`; string values are literal text for safety, component values are the supported rich icon path.
- Data rows without a stable unique `getRowId` or `rowKey` can only be stable while row object identity is preserved; immutable rows need explicit identity and now warn in development.
