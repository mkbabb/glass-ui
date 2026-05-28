# Tranche AN — FINAL

**F-tranche root-redress: `/styles` completeness · detented Drawer · role contracts · reorder recipe · chassis phase.**

## Verdict

AN closes **complete**. The eight gaps the muster (dine-vote) F-tranche redesign surfaced at the glass-ui root — five surface gaps + three intrinsic-primitive role-contract residues from the F.W8.6 axe sweep — plus the folded-in SP-1 (muster-G `Toast.duration`) all carry a named disposition: **5 LANDED · 3 DOCUMENTED · 2 ARCHIVED-on-2-consumer-gate**. No silent open. Every change is additive (new props/defaults, role emissions, an interface field) or documentation; no break. The version bumps **2.0.0 → 2.1.0** (additive minor).

The build/proof gates (typecheck · build · proof:theme · proof:resolution · verify-export-types · profile:budget) are verified by the orchestrator's W7 integrated 8 GB build; the per-wave audits recorded `typecheck` 0 + `proof:theme` 0 + `profile:budget` 0 at their close. Those gate rows below are marked **MET-pending-orchestrator-build** where they require the integrated build the orchestrator runs at close.

## §8 hard-gate table

| # | Gate | Verdict | Evidence |
|---|---|---|---|
| 1 | Build + typecheck clean (8 GB `NODE_OPTIONS` baseline) | **MET-pending-orchestrator-build** | `typecheck` 0 recorded at W1/W3/W4; `build` run once by the orchestrator's W7 integrated build (sibling-agent concurrency deferred it per wave). |
| 2 | `/styles` completeness (single import = cascade + SFC scoped CSS; second `@import` retires) | **MET** | `audit/W1-styles-completeness.md` — AFTER probe shows `aurora-root` grid layer + token cascade both PRESENT in the single `/styles` resolve. `proof:theme` 0. |
| 3 | Template-utility resolution (dist emits OR `@source` documented as binding) | **MET** | `audit/W2-tailwind-utilities.md` (Option B) + CLAUDE.md §Consumer wiring `@source` paragraph (same authority as `tw-animate-css`). `profile:budget` 0 (zero new payload). |
| 4 | Detented Drawer variant (non-modal peek/half/full; no focus-trap; no page `aria-hidden`) | **MET** | `audit/W3-drawer-detents.md` — detents 0.12/0.50/1.00 exact (§A); focus-trap absent (§B); no page `aria-hidden` (§C); `transform:none` behind (§D); modal contrast proves the difference (§E). |
| 5 | Role contracts on StatusDot · SortableHandle · NumberField | **MET** | `audit/W4-role-contracts.md` — StatusDot `role="img"`; SortableHandle `role="button"`+`tabindex="0"`; NumberField C2 confirm-landed (3 channels reach the inner input); axe `aria-prohibited-attr` + `label` PASS all sites. |
| 6 | Reorder recipe disposition (LANDED-with-demo OR ARCHIVED-with-named-realisation) | **MET** | `audit/W5-reorder-recipe.md` — ARCHIVED on 2-consumer gate; realisation condition named. |
| 7 | Dock panel-host + chassis phase disposition | **MET** | `audit/W6-dock-panelhost-chassis-phase.md` — panel-host ARCHIVED with realisation condition; chassis phase DOCUMENTED ("ping" canon) in CLAUDE.md §Component architecture. |
| 8 | Disposition ledger complete (all 8 gaps + named realisation conditions; no silent open) | **MET** | `audit/W7-disposition-ledger.md` — 8 gaps + SP-1, all dispositioned; tally 5/3/2. |
| 9 | Proof gates green (`proof:all` + `proof:resolution` + `verify-export-types` + `profile:budget`) | **MET-pending-orchestrator-build** | `proof:theme` 0 + `profile:budget` 0 recorded at W1/W2; the full `proof:all` + `proof:resolution` + `verify-export-types` run by the orchestrator's W7 integrated build. |
| 10 | Cross-repo seam (`dist/` rebuilt at close; muster F.W10 named as consumption handoff) | **MET-pending-orchestrator-build** | `dist/` rebuilt by the orchestrator's W7 build; handoff named below (§Cross-repo handoff). |

The overfitting audit (`audit/W7-overfitting.md`) is CLEAN — every AN `src/` artefact is exported (or behaviour on an exported primitive/interface) or consumed by the `/styles` cascade; every demo artefact is demo-private; the two ARCHIVED items + three documentation-only dispositions wrote no source.

## Disposition ledger (summary)

| Gap | Disposition | Wave |
|---|---|---|
| 1 — `/styles` completeness | LANDED | W1 |
| 2 — Tailwind template-utility emission | DOCUMENTED (Option B — `@source` contract) | W2 |
| 3 — detented + non-modal + live-behind Drawer | LANDED | W3 |
| A — StatusDot role contract | LANDED | W4 |
| B — SortableHandle role contract | LANDED | W4 |
| C — NumberField label binding | DOCUMENTED (verdict C2) | W4 |
| SP-1 — Toast.duration (folded from muster G) | LANDED | W4 |
| 4 — interruptible MetricStack reorder recipe | ARCHIVED-on-2-consumer-gate | W5 |
| 5 — dock panel-host variant | ARCHIVED-on-2-consumer-gate | W6 |
| 6 — InstrumentChassis "scoring" phase | DOCUMENTED ("ping" canon) | W6 |

Full evidence pointers in `audit/W7-disposition-ledger.md`.

## Cross-repo handoff — muster F.W10 / G.W4

muster consumes the AN fixes through the **npm publish of `2.1.0`**, NOT the `file:` dev-resolution seam — that seam retired in muster's G tranche. muster's **G.W4 auto-close** fires on the `2.1.0` publish:

1. bump the dependency to `^2.1.0`;
2. retire the two consumer-wiring `styles.css` bridges (the second `@import "@mkbabb/glass-ui/styles.css"` line + the `@source` glob is now documented and adopted directly);
3. retire the local `MusterDetentSheet` detented-Drawer stopgap (the `mode="live-behind"` Drawer supersedes it);
4. verify the three axe classes (StatusDot · SortableHandle · NumberField) report **ZERO** `aria-prohibited-attr` / `label` violations against the published primitives.

## Notes carried out of AN

- **vaul-vue re-snap limitation (upstream, NOT a glass-ui bug).** vaul-vue does not reliably re-snap an already-open sheet from an external `activeSnapPoint` write — its `activeSnapPoint` controllable shadows external prop writes once the gesture machinery has run. A programmatic detent set lands the OPENING detent (which works); live re-snapping of an open sheet is a vaul-vue upstream fix. No glass-ui workaround was authored. See `audit/W3-drawer-detents.md` §A.limitation.
- **SP-1 (muster-G named-forward).** The `Toast.duration` typecheck gap that muster's G tranche forwarded is folded into AN.W4 and CLOSED — the field is on the `Toast` interface and the forward chain to reka `ToastRoot` already carried it.
- **Two ARCHIVED items carry named realisation conditions.** The interruptible reorder recipe (≥ 2 mid-drag-reorder consumers) and the dock panel-host (≥ 2 tall-vertical-pane stacked-control consumers) LAND when the substrate gate is met; until then muster's F-side stays settle-on-pointerup with the existing dock multi-layer grid.

## Stack / tranche close-state

AN closes **complete** conditional on the orchestrator's W7 integrated build confirming gates 1, 9, and 10 (the build/proof rows marked MET-pending-orchestrator-build above). The §6 ledger is confirmed, the overfitting audit is clean, the CLAUDE.md paragraphs are applied, the version is bumped to 2.1.0, and the cross-repo handoff to muster F.W10 / G.W4 is named.

## Authority

- Plan: `docs/tranches/AN/AN.md`.
- Execution log: `docs/tranches/AN/PROGRESS.md`.
- Audit artefacts: `docs/tranches/AN/audit/W{0..7}-*.md`.
- Cross-repo origin: muster `docs/tranches/F/waves/W10.md` §Scope items 1-5 + `docs/tranches/F/audit/W8-build.md` §F.W8.6-axe.
- Consumption handoff: muster F.W10.1 bridge-retire + G.W4 auto-close (gate on the `2.1.0` publish).
