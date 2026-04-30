# D-II — Dock Surface Redress + Velocity Close

D-II is the required second pass before E. D.W4 revealed unrecorded source scope and the user-visible dock issue revealed that the vertical app rail was not a `GlassDock` surface at all. E cannot open on a false D-close. This tranche completes the remaining D thesis by reconciling the dock public surface, closing the velocity harness honestly, and then running the D close ceremony.

## Thesis

There is one dock surface. Horizontal action bars, vertical category rails, and layered tool palettes compose from `GlassDock` plus `DockLayerGroup`; legacy rail wrappers, removed `.dock-icon-btn` utilities, and public no-op dock composables delete. Iteration tooling is part of the same close because W4 was already changed beyond its declared bounds: the redress is to make the current substrate real, consumed, and gateable rather than adding another temporary path.

## Invariants

1. D invariants 1-13 still bind.
2. Vertical app navigation is `GlassDock variant="rail"`, not a separate public `Rail` package.
3. Dock blur resolves through `--glass-blur-dock`; reduced-transparency disables it.
4. Dock controls use exported dock components, not removed global button utilities.
5. Public dock composables stay only when they have a current source consumer or story-backed reason.
6. W4 closes on the actual `npm run iter` command, not individual green fragments.
7. D closes before E; E is then rewritten as one publication cutover with no F escape ledger.

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---:|---:|---|---|---|
| W0 | Six-lane audit synthesis | 6 | parallel | audit findings reconciled into this D-II scope | complete |
| W1 | Dock surface redress | orchestrator | direct | rail route + app nav use `GlassDock variant="rail"`; legacy dock utilities absent; `npm run iter` green | complete |
| W2 | Velocity harness close | orchestrator | direct | `iter`, `emit-types`, root smoke tests, and consumer validation are wired and documented | complete |
| W3 | D close ceremony | 4 + orchestrator | parallel + direct | W5 re-audit, route proof, `ay-close`, FINAL, retro, `d-close` tag | complete pending commit/tag |

## Phases

### W0 — Audit Synthesis

Six read-only audit lanes covered: dock implementation, D current-state, C/A-B process, E/F future plan, dead/legacy substrate, and W4 tooling. The binding conclusions:

- `Rail` was a duplicate vertical dock surface.
- `GlassDock` vertical mode needed to be always-expanded until a real collapsed vertical design exists.
- Removed dock button utilities were still consumed by demos and `DockPopover`.
- `useDockTransition`, `usePopupMutex`, and dock action-bar exports had no live consumer.
- W4 was partially green but miswired: root smoke tests were not discovered; source still leaked `@utils`; `emit-types` lacked `--declaration`.
- E must wait for D close and should collapse publication + consumer migration into one cutover tranche.

### W1 — Dock Surface Redress

Mechanism:

1. Add `variant="rail"` and `shape` to `GlassDock`; rail implies vertical, always-expanded, fit-content behavior.
2. Delete the standalone `src/components/custom/rail/` package and remove its public barrel export.
3. Rewrite `demo/layout/CategoryRail.vue` and `demo/stories/navigation/rail.vue` to use `GlassDock variant="rail"`.
4. Replace every legacy `.dock-icon-btn*` use with `DockIconButton` or local semantic button styles.
5. Add `.glass-dock::after` grain and reduced-transparency dock blur handling.
6. Delete public no-op/unused dock composables and unused global layer-grid CSS.

Hard gate:

- `rg 'components/custom/rail|dock-icon-btn|useDockTransition|usePopupMutex|DOCK_ACTION_BAR_KEY' src demo tests README.md DESIGN.md` has no live references except historical tranche docs or explanatory removal comments.
- `npm run iter` exits 0.
- Browser verifies `/navigation/rail`, `/navigation/dock`, `/navigation/dock-layers`, and current composition route render.

### W2 — Velocity Harness Close

Mechanism:

1. Keep consumer-safe imports in source; no glass-ui-local alias such as `@utils` can leak into package files consumed by adjacent repos.
2. Include `tests/**/*.spec.ts` in Vitest so W4 smoke specs are consumed.
3. Fix `emit-types` with `--declaration`.
4. Decide newly public timer/touch-gate helpers by W3 re-audit: wire with current source evidence or delete.
5. Update D progress/wave docs to reflect the actual commits and measurements.

Actual decision:

- `useTouchGate` is wired into `GlassDock` collapsed touch activation; `useTimer` remains because it backs the gate.
- `useInterval` is deleted because it had no source, demo, or consumer evidence.

Hard gate:

- `/usr/bin/time -p npm run iter` < 10s wall.
- `npm run emit-types` exits 0.
- `scripts/validate-consumers.sh` exits 0.

### W3 — D Close Ceremony

Mechanism:

1. Re-run the hardened W5 audit with speedtest added to the consumer roots.
2. Walk representative story routes in light and dark with the in-app browser.
3. Run `scripts/ay-close.sh`.
4. Write `docs/tranches/D/FINAL.md`, `docs/tranches/D/audit/D-retro.md`, and final D progress updates.
5. Tag `d-close`.

Hard gate:

- Re-audit actionable <= 5 or a named residual tranche is opened before close.
- `ay-close` exits 0.
- FINAL + retro committed.
- `d-close` tag resolves.

## Critical Files

| File | Access | Reason |
|---|---|---|
| `src/components/custom/dock/**` | modify/delete | one dock surface and layered animation cleanup |
| `src/components/custom/rail/**` | delete | duplicate vertical dock surface |
| `demo/layout/CategoryRail.vue` | modify | app nav consumes `GlassDock variant="rail"` |
| `demo/stories/navigation/{rail,dock,dock-layers}.vue` | modify | story consumers prove dock surface |
| `src/styles/{dock,glass,tokens}.css` | modify | delete legacy CSS and reduced-transparency dock blur |
| `vite.iter.config.ts`, `vitest.config.ts`, `package.json` | modify | W4 harness redress |
| `tests/**`, `src/**/__tests__/**` | modify/create/delete | consumed smoke coverage |
| `docs/tranches/D-II/**` | create/update | scope reveal and redress plan |
| `docs/tranches/D/**` | update in W3 | close ceremony |

## Cross-Tranche Debt

E is not opened until D-II closes. E is refined to one publication cutover: contract audit, multi-entry package exports, one style entry, three consumer migrations, and focused proof gates. Prop unification, broad a11y expansion, and consumer adoption expansion are retired from E unless a later tranche names them with current evidence.

## Brittleness Window

Open during W1/W2: the public `Rail` export and unused dock composable exports are removed before D close. Restoration is the same wave: all demo consumers move to `GlassDock variant="rail"`, tests assert the rail variant, and build/type/test gates prove the published surface.
