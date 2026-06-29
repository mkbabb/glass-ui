# docs/archive

Frozen historical doc trees, moved here at BH.B4a-archive-refresh (the BG+BH
5.0.0 repo-cleanup band). Nothing under this directory is a live contract —
no `scripts/proof-*.mjs` gate reads it, no build step consumes it. It is kept
for provenance / spelunking only. New work never appends here; it lands in the
live trees (`docs/tranches/`, `docs/design/`, `docs/canon/`,
`docs/consumer-evidence/`, `docs/precepts/`).

## What was archived

### `constellation/` — the modern-web / cross-repo round plans

The multi-repo "constellation" planning + audit set that seeded earlier
cross-repo rounds. Superseded by the per-tranche plans under `docs/tranches/`
and the by-name cross-repo ask ledgers
(`docs/tranches/<LETTER>/coordination/asks-and-consumes.md`).

- `MODERN-WEB-CLOSE.md`, `MODERN-WEB-EXECUTION-PLAN.md`,
  `NEXT-ROUND-EXECUTION-PLAN.md` — the round plans.
- `next/audit/A1..A6` — the per-repo audit pass (glass-ui · muster ·
  fourier/value.js · speedtest · keyframes/words/bbnf · cross-cutting).
- `next/design/bbnf/WC-design-*.md` — the bbnf design notes
  (typo-color · layout · motion · atmosphere-a11y).

### `audits/runs/2026-06-03-glass-ui-self/` — a dated overfitting-audit run

The 2026-06-03 self-audit fan-out output (`a-ui` · `b-custom` · `c-styles` ·
`d-demo` · `e-composables` · `f-fourier` + the merged `style-audit.md`). The
reusable PROMPT that produced it stays live at
`docs/audits/overfitting-audit.md`; only this one dated RUN is archived. The
standing `proof:component-orphan` / `proof:consumer-evidence-live` gates are
the continuous replacement for re-running the sweep by hand.
