# useClickDelegate (the ONE delegated scroll-target click handler)

## Artefact path

`src/composables/sidebar/useClickDelegate.ts`
(published via `@mkbabb/glass-ui/sidebar`; option type on `/api`).

## Reconcile lineage (BC.W-TOC-RECONCILE)

One of the three latex-paper-only leaves of the ToC-tracking family glass-ui
LACKED. Generalized off latex-paper's `src/vue/tracking/useClickDelegate.ts`: a
SINGLE delegated `click` listener on the container that `closest(selector)`-
matches, reads the configured attribute, `resolve`s it to an id, and calls
`scrollTo(id)` — ONE handler for an entire ToC (not N per-link listeners). See
the reconcile-ledger: `docs/tranches/BC/audit/W-TOC-RECONCILE-ledger.md`.

## Current consumer proof (≥ 2 binary consumers)

**Consumer 1 — words `ProgressiveSidebar` (on the `^4.x` bump).**

- **Project**: `words/frontend`
- **Source path**:
  `../words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue`
  adopts `useClickDelegate` for the ToC link clicks (the `data-scroll-target`
  delegation), composing `useScrollTo`'s `scrollTo`.
- **Proof**: `rg -n '\buseClickDelegate\b' ../words/frontend/src/components/custom/navigation/ProgressiveSidebar.vue`

**Consumer 2 — latex-paper reader (on the `^4.x` bump).**

- latex-paper DELETES `src/vue/tracking/` ENTIRELY and re-points the reader's
  delegated ToC click handler to `@mkbabb/glass-ui/sidebar`'s `useClickDelegate`
  (the consume-and-delete cadence; clean break, no alias).

**Consumer 3 — the toc-tracking demo exerciser.**

- `demo/stories/navigation/toc-tracking.vue` wires `useClickDelegate` over the
  ToC nav (`resolve` → `scrollTo` = the warm-then-scroll chain) — the binding-π
  exerciser, not a binary consumer, recorded.

## Keep rationale

Two binary consumers (both adopting on the bump) plus the demo exerciser. The
delegated-click pattern is a single-listener efficiency win product code would
re-roll as N listeners. Named surface justified while both consumers remain
active.

## Re-audit proof

This document satisfies §Invariant 5 (no silent overfitting) for the
`useClickDelegate` leaf while the proof commands find current consumers. If the
grep targets fail, the verdict returns to `library-orphan`.
