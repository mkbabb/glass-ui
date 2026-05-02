# E.W0 Package Exports

Baseline: current `HEAD` `99e2998` plus dirty worktree on 2026-05-02.

## Planned Export Map

| Export key | JS target | Declaration target | Source entry | Style target | Owner | Verification |
|---|---|---|---|---|---|---|
| `.` | `./dist/glass-ui.js` | `./dist/index.d.ts` | `src/index.ts` | `./dist/glass-ui.css` | root core | package probe |
| `./tokens` | `./dist/tokens.js` | `./dist/tokens.d.ts` | `src/tokens.ts` | none | runtime tokens | package probe |
| `./styles` | none | none | `src/styles/index.css` | `./src/styles/index.css` | CSS entry | string export existence |
| `./dock` | `./dist/dock.js` | `./dist/dock.d.ts` | `src/dock.ts` | root CSS | dock | package probe |
| `./search` | `./dist/search.js` | `./dist/search.d.ts` | `src/search.ts` | root CSS | search | package probe |
| `./sidebar` | `./dist/sidebar.js` | `./dist/sidebar.d.ts` | `src/sidebar.ts` | root CSS | sidebar | package probe |
| `./controls` | `./dist/controls.js` | `./dist/controls.d.ts` | `src/controls.ts` | root CSS | controls | package probe |
| `./confirm-dialog` | `./dist/confirm-dialog.js` | `./dist/confirm-dialog.d.ts` | `src/confirm-dialog.ts` | root CSS | confirm dialog | package probe |
| `./infinite-scroll` | `./dist/infinite-scroll.js` | `./dist/infinite-scroll.d.ts` | `src/infinite-scroll.ts` | root CSS | infinite scroll | package probe |
| `./tabs` | `./dist/tabs.js` | `./dist/tabs.d.ts` | `src/tabs.ts` | root CSS | custom tabs | package probe |
| `./typewriter` | `./dist/typewriter.js` | `./dist/typewriter.d.ts` | `src/typewriter.ts` | root CSS | typewriter | package probe |
| `./stacked-icons` | `./dist/stacked-icons.js` | `./dist/stacked-icons.d.ts` | `src/stacked-icons.ts` | root CSS | stacked icons | package probe |
| `./virtual` | `./dist/virtual.js` | `./dist/virtual.d.ts` | `src/virtual.ts` | none | virtual composables | package probe |
| `./pagination` | `./dist/pagination.js` | `./dist/pagination.d.ts` | `src/pagination.ts` | none | pagination composables | package probe |
| `./glass-carousel` | `./dist/glass-carousel.js` | `./dist/glass-carousel.d.ts` | `src/glass-carousel.ts` | root CSS | glass carousel | package probe |
| `./aurora` | `./dist/aurora.js` | `./dist/aurora.d.ts` | `src/aurora.ts` | root CSS | aurora | package probe |
| `./metric-badge` | `./dist/metric-badge.js` | `./dist/metric-badge.d.ts` | `src/metric-badge.ts` | root CSS | metric badge | package probe |
| `./status-dot` | `./dist/status-dot.js` | `./dist/status-dot.d.ts` | `src/status-dot.ts` | root CSS | status dot | package probe |
| `./pulse` | `./dist/pulse.js` | `./dist/pulse.d.ts` | `src/pulse.ts` | root CSS | pulse | package probe |
| `./paper-backdrop` | `./dist/paper-backdrop.js` | `./dist/paper-backdrop.d.ts` | `src/paper-backdrop.ts` | root CSS | paper backdrop | package probe |
| `./toggle-chip` | `./dist/toggle-chip.js` | `./dist/toggle-chip.d.ts` | `src/toggle-chip.ts` | root CSS | toggle chip | package probe |
| `./glass-panel` | `./dist/glass-panel.js` | `./dist/glass-panel.d.ts` | `src/glass-panel.ts` | root CSS | glass panel | package probe |
| `./metaballs` | `./dist/metaballs.js` | `./dist/metaballs.d.ts` | `src/metaballs.ts` | root CSS | metaballs | package probe |
| `./sortable-list` | `./dist/sortable-list.js` | `./dist/sortable-list.d.ts` | `src/sortable-list.ts` | root CSS | sortable list | package probe |
| `./timeline` | `./dist/timeline.js` | `./dist/timeline.d.ts` | `src/timeline.ts` | root CSS | timeline | package probe |
| `./labeled-field` | `./dist/labeled-field.js` | `./dist/labeled-field.d.ts` | `src/labeled-field.ts` | root CSS | labeled field | package probe |
| `./expandable-container` | `./dist/expandable-container.js` | `./dist/expandable-container.d.ts` | `src/expandable-container.ts` | root CSS | expandable container | package probe |
| `./icon-tooltip` | `./dist/icon-tooltip.js` | `./dist/icon-tooltip.d.ts` | `src/icon-tooltip.ts` | root CSS | icon tooltip | package probe |

## Retired

- `./styles/*` wildcard publication.
- `typesVersions` catchall mapping to `dist/index.d.ts`.
- Root export of custom/domain surfaces listed above.

## W1 Notes

- The export map is intentionally limited to current consumer and demo/test-backed surfaces. W1 expanded the package map for the remaining demo/test-backed custom surfaces rather than leaving them as implicit root-only residuals.
- `files` includes `dist` and `src/styles` only. The `src/styles` exception is intentional because Tailwind v4 consumers need the source CSS graph behind the single public `./styles` export.
