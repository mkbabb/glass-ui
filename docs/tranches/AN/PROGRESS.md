# Tranche AN — PROGRESS

Execution log for tranche AN (F-tranche root-redress: `/styles` completeness · detented Drawer · role contracts · reorder recipe · chassis phase). Updated at wave boundaries. Plan basis — `docs/tranches/AN/AN.md`; per-wave specs at `docs/tranches/AN/waves/W<N>.md`.

Status vocabulary — PLANNED / IN-PROGRESS / MET / MISS / ARCHIVED (2-consumer-gated, named realisation) / DOCUMENTED (CLAUDE.md / audit-doc record).

## Cross-tranche dependency

Bound by **F.W10** (`/Users/mkbabb/Programming/dine-vote/docs/tranches/F/waves/W10.md`) — muster's bridge-retire (the two consumer-wiring lines in `styles.css`) and the local-Drawer-stopgap retire gate on this tranche publishing. Until AN.W3 + AN.W2 land through the `file:../../glass-ui` seam, muster KEEPS both bridges + the local detented-Drawer SFC; they are the documented temporary state, not a permanent workaround.

The F.W10 hard-gate row "AN builds + every proof gate green" reads AN.W7's FINAL.md gate table.

---

## AN.W0 — Audit + intake

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 2 disjoint read-only (W0.1 cross-repo intake ‖ W0.2 glass-ui-source intake)

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `audit/W0-intake.md` exists with 8-row gap table (5 surface + 3 axe) | PLANNED | |
| 2 | Each row cites origin file + section + line range | PLANNED | |
| 3 | Each row carries WHAT + WHY + WHERE + HOW | PLANNED | |
| 4 | W3 subpath / W5 substrate / W6 chassis-phase defaults + flip thresholds recorded | PLANNED | |

---

## AN.W1 — `/styles` completeness

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PLANNED | |
| 2 | Consumer stub imports only `@import "@mkbabb/glass-ui/styles"` and resolves SFC scoped + token cascade | PLANNED | |
| 3 | `npm run proof:theme` exits 0 against unified bundle | PLANNED | |
| 4 | `package.json` exports field carries chosen Shape A/B/C resolution | PLANNED | |
| 5 | `audit/W1-styles-completeness.md` authored with probe + before/after snippet | PLANNED | |

---

## AN.W2 — Tailwind template-utility emission

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PLANNED | |
| 2 | Decision recorded — Option A (emit) or Option B (document) | PLANNED | |
| 3 | Option A: fresh-consumer probe resolves `h-full` + 3+ template utilities without `@source` | PLANNED | |
| 4 | Option B: CLAUDE.md §Consumer wiring carries `@source` contract paragraph | PLANNED | |
| 5 | `npm run profile:budget --enforce` exits 0 | PLANNED | |

---

## AN.W3 — Detented Drawer variant

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1 default, 2 if W3.1 ‖ W3.2 split warrants

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PLANNED | |
| 2 | Runtime probe captures peek/half/full detents with DOM-rect/screenshot proof | PLANNED | |
| 3 | Focus-trap probe — `modal:false` does NOT capture tabindex inside drawer | PLANNED | |
| 4 | `aria-hidden` probe — `modal:false` leaves page root without `aria-hidden` | PLANNED | |
| 5 | `should-scale-background:false` probe — page-behind transform stays `none` | PLANNED | |
| 6 | `/drawer` subpath decision closed in writing | PLANNED | |
| 7 | `demo/stories/compositions/drawer-live-behind.vue` mounts cleanly | PLANNED | |

---

## AN.W4 — Role contracts on StatusDot · SortableHandle · NumberField

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1 (three sequential sub-carves)

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PLANNED | |
| 2 | StatusDot DOM snippet — `role="img"` with consumer-bound `aria-label` | PLANNED | |
| 3 | SortableHandle DOM snippet — interactive role + accessible name | PLANNED | |
| 4 | NumberField — Possibility C1 (code fix) OR C2 (documented binding) | PLANNED | |
| 5 | Axe smoke — zero `aria-prohibited-attr` + zero `label` at three sites | PLANNED | |

---

## AN.W5 — Interruptible MetricStack reorder recipe (LAND or ARCHIVE)

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean (unchanged under ARCHIVE) | PLANNED | |
| 2 | ARCHIVE — audit doc records decision + named realisation + prototype snapshot | PLANNED | |
| 3 | LAND — `demo/stories/compositions/metric-stack-reorder-interruptible.vue` + `.metric-stack-move` + PRM carve | PLANNED | |
| 4 | LAND — probe captures mid-drag re-aim | PLANNED | |

---

## AN.W6 — Dock panel-host disposition + chassis-phase decision

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PLANNED | |
| 2 | Dock panel-host — ARCHIVE record with named realisation + prototype snapshot | PLANNED | |
| 3 | Chassis-phase LAND — `"scoring"` member + smoke + phase-cascade clean | PLANNED | |
| 4 | Chassis-phase DOCUMENT — CLAUDE.md `"ping"`-canon paragraph | PLANNED | |
| 5 | AN.W7 disposition ledger reads both decisions unambiguously | PLANNED | |

---

## AN.W7 — Close — disposition ledger + overfitting + proof gates + FINAL

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** orchestrator-led close sweep

### Events

- (planned)

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `audit/W7-disposition-ledger.md` accounts all 8 gaps | PLANNED | |
| 2 | Overfitting audit clean | PLANNED | |
| 3 | `proof:all` + `proof:resolution` + `verify-export-types` + `profile:budget --enforce` exit 0 | PLANNED | |
| 4 | `dist/` rebuilt (contract-v2 seam propagates to muster) | PLANNED | |
| 5 | `AN/FINAL.md` authored with gate table + muster F.W10 handoff | PLANNED | |
