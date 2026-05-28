# AN.W0 — Audit + intake

The 8-gap intake feeding W1-W6 dispatch. Origin: muster's F-tranche redesign (F.W10 §Scope items 1-5 + F.W8.6-axe named-misses A-C). Cross-repo posture note: muster has since migrated off the `file:` seam to the npm registry (its G tranche), so AN's consumption path is **publish glass-ui 2.1.0 → muster bumps `^2.1.0`** (the G.W4 auto-close), not the `file:` rebuild AN.md §5 originally assumed. The fixes are identical; only delivery changed.

| Gap | Origin | WHERE (glass-ui source) | Decision | Wave |
|---|---|---|---|---|
| 1 — /styles completeness (cascade + SFC scoped CSS) | F.W10 item 1a | `src/styles/index.css` + `vite.config.ts` `publishStyleAssets` | LANDED — Shape A: build folds `dist/glass-ui.css` (SFC scoped) into `dist/styles/index.css`; single `@import "@mkbabb/glass-ui/styles"` resolves the complete bundle | W1 |
| 2 — Tailwind template-utility emission | F.W10 item 1b | dist `*.js` render-function class strings | DOCUMENTED — Option B: the `@source ".../@mkbabb/glass-ui/dist"` contract documented in CLAUDE.md §Consumer wiring (Option A's +22 KB gz utilities-layer payload rejected; `@source` is the idiomatic zero-payload Tailwind v4 pattern) | W2 |
| 3 — detented + non-modal + live-behind Drawer | F.W10 item 2 | `src/components/ui/drawer/` | LANDED — Shape 2 default (no breaking `shouldScaleBackground` flip; document the live-behind props) + detent grammar in `src/styles/drawer.css`; `/drawer` stays root-barrel | W3 |
| 4 — interruptible MetricStack reorder recipe | F.W10 item 3 | `demo/stories/compositions/` (would-be) | ARCHIVED on 2-consumer gate — muster is settle-on-pointerup (F.md decision 2); zero second consumer. Named realisation: ≥ 2 mid-drag-reorder consumers | W5 |
| 5 — dock panel-host variant | F.W10 item 4 | `src/components/custom/dock/` (would-be) | ARCHIVED on 2-consumer gate — muster cut "dock IS the app" (synthesis §2.2). Named realisation: ≥ 2 tall-vertical-pane consumers | W6 |
| 6 — InstrumentChassis "scoring" phase | F.W10 item 5 | `src/components/custom/instrument-chassis/InstrumentChassis.vue:7-13` | DOCUMENTED — `"ping"` is canonical generic-active (union already carries it; muster uses it per F.md decision 5); no unused `"scoring"` member (overfitting) | W6 |
| A — StatusDot role contract | F.W8.6-axe `aria-prohibited-attr` | `src/components/custom/status-dot/StatusDot.vue` (`<span>` root) | LANDED — Shape A2: `role="img"` only when `aria-label` is bound (preserves the decorative no-role case) | W4 |
| B — SortableHandle role contract | F.W8.6-axe `aria-prohibited-attr` | `src/components/custom/sortable-list/SortableHandle.vue` (`<span>` grip) | LANDED — `role="button"` + `tabindex="0"` on the default span grip; `as="button"` consumers keep the native role | W4 |
| C — NumberField label binding | F.W8.6-axe `label` + AM-seam carry | `src/components/ui/number-field/NumberFieldInput.vue` | CONFIRM-LANDED — Possibility C2: the AM.W0.2 `inheritAttrs:false` + `v-bind="$attrs"` chain reaches the inner `<input>` on all three name channels; the F.W8.6 residue was a muster consumer-side wrapper-label gap → DOCUMENTED binding contract | W4 |

**Folded-in (cross-tranche)**: SP-1 — glass-ui `Toast` interface lacked `duration?` though reka-ui `ToastRoot` consumes it (surfaced by the speedtest consumer in muster's G tranche). LANDED at W4 — `duration?: number` added to the `Toast` interface; the forward chain already carried it to `ToastRoot`.

## Disposition tally

LANDED: 5 (gaps 1, 3, A, B + SP-1) · DOCUMENTED: 3 (gaps 2, 6, C) · ARCHIVED-on-2-consumer-gate: 2 (gaps 4, 5). No silent open — the AN sub-invariant (every gap a named disposition) holds.

## Defaults + flip thresholds recorded

- W3 Drawer: Shape 2 default; `/drawer` root-barrel. Flip to Shape 3 (`mode="live-behind"` shorthand) only if it reads cleaner.
- W4 StatusDot: Shape A2. NumberField: investigate first, C1 only if the AM chain is genuinely broken (it was not → C2).
- W2: Option A only if payload acceptable (it was +22 KB gz → Option B).
- W6 chassis: LAND additive "scoring" only if a consumer needs it (none → DOCUMENT "ping").
