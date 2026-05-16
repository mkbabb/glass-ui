# keyframes.js 84% UI-scaffolding overfitting — formal classification

**Date**: 2026-05-16.
**Status**: ARCHIVED — formal CONSUMER-ORCHESTRATOR-OWNED classification.
**Source**: P11/d (keyframes.js consumer audit).

## §1—Scope

Per P11/d: ≈ 84% of keyframes.js's surface area is UI scaffolding (demo / configurator / chrome) rather than the library's core keyframes/spring runtime. Consumer-orchestrator owned per CONSTELLATION.md §6 separation:

- Library kernel: spring + keyframes math (small surface).
- UI scaffolding (84%): demo wiring, configurator presets, chrome components.

## §2—Disposition

Classification: **CONSUMER-ORCHESTRATOR-OWNED** — the UI-scaffolding portion of keyframes.js is the consumer-orchestrator's (keyframes.js's own tranche's) concern, not glass-ui's. P confirms the classification + retires the carry.

P.W5 Lane C did absorb the CR-3 cross-repo writes (HeaderRibbon retire + scale-on-hover migration + Fira Code CDN drop) which incidentally touched UI-scaffolding code. Those writes were P-scope per the CR-3 carry. Further UI-scaffolding cleanup is keyframes.js-orchestrator-owned.

## §3—Glass-ui-side action

NONE beyond CR-3 (already landed at P.W5 Lane C). Glass-ui-side is READER-ONLY for the residual UI-scaffolding overfitting.

## §4—P-residual disposition

ARCHIVED-PERMANENT-CONSUMER-ORCHESTRATOR-OWNED. The carry exits P-close per invariant 28.

## §5—Cross-references

- `docs/tranches/P/waves/W5.md` Lane F.3.
- `docs/tranches/P/audit/P11-Lane-d-keyframes-js.md` §"84% overfitting".
- `docs/tranches/P/coordination/CONSTELLATION.md` §6 (constellation separation of concerns).

## §6—Status: ARCHIVED-PERMANENT-CONSUMER-ORCHESTRATOR-OWNED.
