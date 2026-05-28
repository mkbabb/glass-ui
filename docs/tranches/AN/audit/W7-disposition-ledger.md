# AN.W7 — Disposition ledger (confirmed against W1-W6 evidence)

The AN §6 ledger, confirmed against the landed wave evidence. All 8 named gaps + the folded-in SP-1 account here; every archived gap carries a named realisation condition; no silent open.

Disposition vocabulary — LANDED (source + proof) · DOCUMENTED (CLAUDE.md / audit-doc record, no source-behaviour gap) · ARCHIVED-on-2-consumer-gate (named realisation condition).

## Ledger

| Gap | Disposition | Wave | Evidence | Confirmation |
|---|---|---|---|---|
| 1 — `/styles` completeness (cascade + SFC scoped CSS; retire the second `@import`) | **LANDED** | W1 | `audit/W1-styles-completeness.md` | Shape A — `vite.config.ts` `publishStyleAssets` folds `dist/glass-ui.css` into `dist/styles/index.css`. AFTER probe: `aurora-root` grid layer + token cascade `--primary` both PRESENT in the single `/styles` resolve. `proof:theme` 0; `profile:budget` 0 (`glass-ui.css` unchanged). |
| 2 — Tailwind template-utility emission | **DOCUMENTED** (Option B) | W2 | `audit/W2-tailwind-utilities.md` | `@source ".../dist"` documented as binding in CLAUDE.md §Consumer wiring (same authority as `tw-animate-css`). Option A's ≈22 KB-gzip utilities-layer rejected (payload + pipeline-fragility). Zero new dist payload; `profile:budget` 0. |
| 3 — detented + non-modal + live-behind Drawer | **LANDED** | W3 | `audit/W3-drawer-detents.md` | Additive `mode?: "modal" \| "live-behind"` (bundles `modal:false` + `shouldScaleBackground:false` + `snapPoints:[0.12,0.5,1]`, each overridable) + `DrawerContent showOverlay` + `src/styles/drawer.css` rung 17. Detents 0.12/0.50/1.00 exact; no focus-trap + no page `aria-hidden` (modal mode DOES set `aria-hidden`, proving the difference); `transform:none` behind under `scaleBackground:false`. `/drawer` stays root-barrel. `typecheck` 0. |
| A — StatusDot role contract | **LANDED** | W4 | `audit/W4-role-contracts.md` | Shape A2 — `role="img"` when `aria-label` bound; decorative case role-free. axe `aria-prohibited-attr` PASS both probes. |
| B — SortableHandle role contract | **LANDED** | W4 | `audit/W4-role-contracts.md` | Default `as="span"` grip emits `role="button"` + `tabindex="0"`; `as="button"` drops both (native). axe `aria-prohibited-attr` PASS both grips. |
| C — NumberField label binding | **DOCUMENTED** (verdict C2 — confirm-landed chain) | W4 | `audit/W4-role-contracts.md` | The AM.W0.2 `inheritAttrs:false` + `v-bind="$attrs"` chain reaches the inner `<input role="spinbutton">` on all 3 name channels (`aria-label` / `aria-labelledby` / `<Label for>`). F.W8.6 residue is a consumer-side `role="group"` wrapper-label gap — documented as the binding contract in CLAUDE.md §Component architecture. No glass-ui code change. axe `label` PASS all 3 channels. |
| SP-1 (folded from muster G) — Toast.duration | **LANDED** | W4 | `audit/W4-role-contracts.md` §SP-1 | `duration?: number` added to the `Toast` interface (`use-toast.ts`); forward chain already carried it to reka `ToastRoot`. `toast({ title, duration: 6000 })` typechecks. |
| 4 — interruptible MetricStack reorder recipe | **ARCHIVED-on-2-consumer-gate** | W5 | `audit/W5-reorder-recipe.md` | muster v1 is settle-on-pointerup (F.md decision 2); zero realised consumers. Wrote no source. Realisation: LANDS at `demo/stories/compositions/metric-stack-reorder-interruptible.vue` (per-row `useSpring` Y-offset + `.metric-stack-move` + PRM carve) when ≥ 2 consumers declare a mid-drag-reorder pattern. |
| 5 — dock panel-host variant | **ARCHIVED-on-2-consumer-gate** | W6 | `audit/W6-dock-panelhost-chassis-phase.md` | muster's F redesign cut "the dock IS the app" (synthesis §2.2); zero realised consumers. Wrote no source. Realisation: LANDS when ≥ 2 consumers declare a tall-vertical-pane stacked-control pattern (e.g. value.js Figma-style stacked-panel rail). |
| 6 — InstrumentChassis "scoring" phase | **DOCUMENTED** ("ping" canon) | W6 | `audit/W6-dock-panelhost-chassis-phase.md` | No additive `"scoring"` union member ships; `"ping"` documented as canonical generic-active phase in CLAUDE.md §Component architecture. A speculative member with no consumer is overfit substrate. The phase-canon test enforces the union unchanged. |

## Tally

- **LANDED**: 5 — gaps 1, 3, A, B, SP-1.
- **DOCUMENTED**: 3 — gaps 2, C, 6.
- **ARCHIVED-on-2-consumer-gate**: 2 — gaps 4, 5 (each with named realisation condition).

8 named gaps + SP-1, all dispositioned. No silent open. The AN sub-invariant (every gap a named disposition) holds.

## Cross-references

- §6 ledger: `docs/tranches/AN/AN.md` §6.
- §8 hard gates: `docs/tranches/AN/AN.md` §8 (gate table verdicts in `FINAL.md`).
- Cross-repo origin: muster `docs/tranches/F/waves/W10.md` §Scope items 1-5 + `docs/tranches/F/audit/W8-build.md` §F.W8.6-axe.
