# Tranche AN — PROGRESS

Execution log for tranche AN (F-tranche root-redress: `/styles` completeness · detented Drawer · role contracts · reorder recipe · chassis phase). Updated at wave boundaries. Plan basis — `docs/tranches/AN/AN.md`; per-wave specs at `docs/tranches/AN/waves/W<N>.md`.

Status vocabulary — PLANNED / IN-PROGRESS / MET / MISS / ARCHIVED (2-consumer-gated, named realisation) / DOCUMENTED (CLAUDE.md / audit-doc record).

## Cross-tranche dependency

Bound by **F.W10** (`/Users/mkbabb/Programming/dine-vote/docs/tranches/F/waves/W10.md`) — muster's bridge-retire (the two consumer-wiring lines in `styles.css`) and the local-Drawer-stopgap retire gate on this tranche publishing. Until AN.W3 + AN.W2 land through the `file:../../glass-ui` seam, muster KEEPS both bridges + the local detented-Drawer SFC; they are the documented temporary state, not a permanent workaround.

The F.W10 hard-gate row "AN builds + every proof gate green" reads AN.W7's FINAL.md gate table.

---

## AN close — 2026-05-28 — execution + close-ceremony (W7)

AN executed all waves and closed **complete** (conditional on the orchestrator's W7 integrated 8 GB build verifying the build/proof gates). Disposition tally: **5 LANDED** (gaps 1, 3, A, B, SP-1) · **3 DOCUMENTED** (gaps 2, C, 6) · **2 ARCHIVED-on-2-consumer-gate** (gaps 4, 5). No silent open.

- W1 `/styles` completeness — LANDED (Shape A fold; `proof:theme` 0).
- W2 Tailwind utilities — DOCUMENTED (Option B `@source` contract; Option A rejected).
- W3 detented Drawer — LANDED (`mode` prop + `showOverlay` + `drawer.css` rung 17; detents exact; `/drawer` root-barrel).
- W4 role contracts — StatusDot/SortableHandle LANDED; NumberField C2 DOCUMENTED; SP-1 Toast.duration LANDED.
- W5 reorder recipe — ARCHIVED (2-consumer gate; named realisation).
- W6 dock panel-host — ARCHIVED (2-consumer gate); chassis phase — DOCUMENTED ("ping" canon).
- W7 close — `audit/W7-disposition-ledger.md` + `audit/W7-overfitting.md` (clean) + `FINAL.md` authored; CLAUDE.md §Consumer wiring + §Component architecture paragraphs applied; `package.json` 2.0.0 → 2.1.0; CHANGELOG 2.1.0 entry.

Orchestrator owns the integrated build, the dist-rebuild, the proof-gate run, the commit, and the `2.1.0` publish. muster F.W10 / G.W4 is the consumption handoff (auto-close on the `2.1.0` publish).

---

## AN.W0 — Audit + intake

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 2 disjoint read-only (W0.1 cross-repo intake ‖ W0.2 glass-ui-source intake)

### Events

- W0 intake landed — `audit/W0-intake.md` with the per-gap WHAT/WHY/WHERE/HOW table feeding W1-W6 dispatch.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `audit/W0-intake.md` exists with 8-row gap table (5 surface + 3 axe) | MET | `audit/W0-intake.md` |
| 2 | Each row cites origin file + section + line range | MET | `audit/W0-intake.md` |
| 3 | Each row carries WHAT + WHY + WHERE + HOW | MET | `audit/W0-intake.md` |
| 4 | W3 subpath / W5 substrate / W6 chassis-phase defaults + flip thresholds recorded | MET | `audit/W0-intake.md` |

---

## AN.W1 — `/styles` completeness

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1
- **Disposition:** LANDED (Shape A — `vite.config.ts publishStyleAssets` folds `dist/glass-ui.css` into `dist/styles/index.css`)

### Events

- Shape A fold landed; the single `@import "@mkbabb/glass-ui/styles"` resolves the cascade + SFC scoped CSS; the second `@import "...styles.css"` retires.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET (typecheck 0; build at W7 integrated) | `audit/W1-styles-completeness.md` |
| 2 | Consumer stub imports only `@import "@mkbabb/glass-ui/styles"` and resolves SFC scoped + token cascade | MET | `audit/W1-styles-completeness.md` AFTER probe |
| 3 | `npm run proof:theme` exits 0 against unified bundle | MET | `proof:theme` 0 |
| 4 | `package.json` exports field carries chosen Shape A/B/C resolution | MET (Shape A — dist-copy fold, no exports change) | `audit/W1-styles-completeness.md` |
| 5 | `audit/W1-styles-completeness.md` authored with probe + before/after snippet | MET | `audit/W1-styles-completeness.md` |

---

## AN.W2 — Tailwind template-utility emission

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1
- **Disposition:** DOCUMENTED (Option B — `@source ".../dist"` binding contract; Option A's ≈22 KB-gz utilities-layer rejected)

### Events

- Option B decided; CLAUDE.md §Consumer wiring `@source` paragraph applied at W7 (same authority as `tw-animate-css`).

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET (typecheck 0; build at W7 integrated) | `audit/W2-tailwind-utilities.md` |
| 2 | Decision recorded — Option A (emit) or Option B (document) | MET (Option B) | `audit/W2-tailwind-utilities.md` |
| 3 | Option A: fresh-consumer probe resolves `h-full` + 3+ template utilities without `@source` | N/A (Option A rejected) | `audit/W2-tailwind-utilities.md` before/after probe |
| 4 | Option B: CLAUDE.md §Consumer wiring carries `@source` contract paragraph | MET | CLAUDE.md §Consumer wiring |
| 5 | `npm run profile:budget --enforce` exits 0 | MET (zero new payload) | `profile:budget` 0 |

---

## AN.W3 — Detented Drawer variant

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1
- **Disposition:** LANDED (additive `mode` prop + `DrawerContent showOverlay` + `src/styles/drawer.css` rung 17; `/drawer` stays root-barrel)

### Events

- Shape 2 + additive Shape 3 landed; detents 0.12/0.50/1.00 exact; no focus-trap + no page `aria-hidden` under `modal:false`; modal contrast proves the difference. vaul-vue re-snap limitation documented (upstream, not glass-ui).

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET (typecheck 0; build at W7 integrated) | `audit/W3-drawer-detents.md` |
| 2 | Runtime probe captures peek/half/full detents with DOM-rect/screenshot proof | MET | `audit/W3-drawer-detents.md` §A |
| 3 | Focus-trap probe — `modal:false` does NOT capture tabindex inside drawer | MET | §B |
| 4 | `aria-hidden` probe — `modal:false` leaves page root without `aria-hidden` | MET | §C |
| 5 | `should-scale-background:false` probe — page-behind transform stays `none` | MET | §D |
| 6 | `/drawer` subpath decision closed in writing | MET (root-barrel) | `audit/W3-drawer-detents.md` |
| 7 | `demo/stories/compositions/drawer-live-behind.vue` mounts cleanly | MET | `audit/W3-drawer-detents.md` |

---

## AN.W4 — Role contracts on StatusDot · SortableHandle · NumberField

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1 (three sequential sub-carves + SP-1 fold)
- **Disposition:** StatusDot LANDED · SortableHandle LANDED · NumberField DOCUMENTED (C2) · SP-1 Toast.duration LANDED

### Events

- StatusDot `role="img"` when `aria-label` bound (A2); SortableHandle `role="button"`+`tabindex="0"` on default span grip; NumberField C2 — AM.W0.2 chain reaches the inner input on all 3 channels (residue is a consumer wrapper-label gap, documented). SP-1 — `Toast.duration` field added to the `Toast` interface.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET (typecheck 0; build at W7 integrated) | `audit/W4-role-contracts.md` |
| 2 | StatusDot DOM snippet — `role="img"` with consumer-bound `aria-label` | MET | `audit/W4-role-contracts.md` §W4.A |
| 3 | SortableHandle DOM snippet — interactive role + accessible name | MET | §W4.B |
| 4 | NumberField — Possibility C1 (code fix) OR C2 (documented binding) | MET (C2) | §W4.C |
| 5 | Axe smoke — zero `aria-prohibited-attr` + zero `label` at three sites | MET | `audit/W4-role-contracts.md` |

---

## AN.W5 — Interruptible MetricStack reorder recipe (LAND or ARCHIVE)

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1
- **Disposition:** ARCHIVED-on-2-consumer-gate (muster v1 settle-on-pointerup; named realisation condition recorded; wrote no source)

### Events

- ARCHIVED — zero realised mid-drag-reorder consumers. Realisation: LANDS at ≥ 2 consumers declaring a mid-drag-reorder pattern.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean (unchanged under ARCHIVE) | MET (no source written) | `audit/W5-reorder-recipe.md` |
| 2 | ARCHIVE — audit doc records decision + named realisation + prototype snapshot | MET | `audit/W5-reorder-recipe.md` |
| 3 | LAND — `demo/stories/compositions/metric-stack-reorder-interruptible.vue` + `.metric-stack-move` + PRM carve | N/A (ARCHIVED) | — |
| 4 | LAND — probe captures mid-drag re-aim | N/A (ARCHIVED) | — |

---

## AN.W6 — Dock panel-host disposition + chassis-phase decision

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** 1
- **Disposition:** Dock panel-host ARCHIVED-on-2-consumer-gate · chassis phase DOCUMENTED ("ping" canon)

### Events

- Dock panel-host ARCHIVED (muster cut "dock IS the app"; realisation: ≥ 2 tall-vertical-pane stacked-control consumers). Chassis phase DOCUMENTED — "ping" is the canonical generic-active phase; no `"scoring"` member. CLAUDE.md §Component architecture note applied at W7.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET (no source written) | `audit/W6-dock-panelhost-chassis-phase.md` |
| 2 | Dock panel-host — ARCHIVE record with named realisation + prototype snapshot | MET | `audit/W6-dock-panelhost-chassis-phase.md` |
| 3 | Chassis-phase LAND — `"scoring"` member + smoke + phase-cascade clean | N/A (DOCUMENTED) | — |
| 4 | Chassis-phase DOCUMENT — CLAUDE.md `"ping"`-canon paragraph | MET | CLAUDE.md §Component architecture |
| 5 | AN.W7 disposition ledger reads both decisions unambiguously | MET | `audit/W7-disposition-ledger.md` |

---

## AN.W7 — Close — disposition ledger + overfitting + proof gates + FINAL

- **Opens:** 2026-05-28
- **Closes:** 2026-05-28
- **Agents:** orchestrator-led close sweep (doc + version-bump agent ‖ orchestrator build/proof/publish)
- **Disposition:** CLOSED complete (build/proof gates verified by the orchestrator's integrated W7 build)

### Events

- Disposition ledger + overfitting audit + FINAL authored; CLAUDE.md §Consumer wiring + §Component architecture paragraphs applied; `package.json` 2.0.0 → 2.1.0; CHANGELOG 2.1.0 entry. The integrated 8 GB build, dist-rebuild, `proof:all`/`proof:resolution`/`verify-export-types`, commit, and `2.1.0` publish are orchestrator-owned.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `audit/W7-disposition-ledger.md` accounts all 8 gaps | MET | `audit/W7-disposition-ledger.md` |
| 2 | Overfitting audit clean | MET | `audit/W7-overfitting.md` |
| 3 | `proof:all` + `proof:resolution` + `verify-export-types` + `profile:budget --enforce` exit 0 | MET-pending-orchestrator-build | orchestrator W7 integrated build |
| 4 | `dist/` rebuilt (contract-v2 seam propagates to muster) | MET-pending-orchestrator-build | orchestrator W7 dist-rebuild |
| 5 | `AN/FINAL.md` authored with gate table + muster F.W10 handoff | MET | `FINAL.md` |
