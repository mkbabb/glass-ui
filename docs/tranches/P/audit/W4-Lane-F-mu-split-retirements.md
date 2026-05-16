# P.W4 Lane F — Formal µ-split retirements

**Lane**: P.W4 Lane F.
**Dispatch**: audit two µ-splits per Pβ §"O-residual µ-splits"; apply
wire-or-retire pattern; if either has acquired ≥ 2 callers since
introduction, WIRE-DOCUMENT instead of retire.
**Status**: COMPLETED.

## § 1 — Scope

Per `docs/tranches/P/research/Pbeta-god-modules-post-O.md` §"O-residual
µ-splits (carried, not regressed)" and §"What P MUST resolve (ZERO
DEFERRAL on the 2 O-residual µ-splits)":

> Per the P-open ZERO DEFERRAL constraint, the 2 µ-split candidates from
> O Rβ either land in P or formally retire at P close.

Pβ's recommended disposition for both: **RETIRE (no P-wave)** — splitting
would forfeit cohesion for no consumer benefit (≥-2-callers cohesion rule,
`feedback_overfitting_audit`).

| O-residual µ-split | Pβ recommendation |
|--------------------|-------------------|
| `useSortable.ts` → `dragGhost.ts` | RETIRE — 1 caller; helper shares closure state with composable |
| `utilities.css` → `btn-audacious.css` | RETIRE — would fragment the 37-utility-class register without discoverability win |

## § 2 — µ-split #1: useSortable → dragGhost

### Discovery

```
$ find /Users/mkbabb/Programming/glass-ui/src -name 'dragGhost*'
(no results)

$ rg -l 'dragGhost'
docs/tranches/P/waves/W4.md
docs/tranches/P/P.md
docs/tranches/P/research/Pbeta-god-modules-post-O.md
docs/tranches/O/research/Rbeta-god-modules.md

$ ls src/composables/sortable/
index.ts
useSortable.ts
```

**Finding**: `dragGhost.ts` does NOT exist as a separate file at HEAD.
All `dragGhost` mentions in the corpus are documentation references to
the **hypothetical** µ-split candidate from the O Rβ audit — never
executed. The ghost-DOM helper is inline at `useSortable.ts` (verified
at lines 161, 230–331: `DRAG_GHOST_CLASS`, `ghostEl`, `ghostOffsetX/Y`,
`createGhost()`, `updateGhost()`, `destroyGhost()` are all closure-scoped
locals inside the `useSortable()` factory).

### Decision

**RETIRE (already-retired by non-execution)**.

Per the dispatch decision tree:

> Zero downstream callers (only `useSortable.ts` imports it): RETIRE
> — inline `dragGhost.ts` content back into `useSortable.ts`, then
> DELETE `dragGhost.ts`. Per invariant 8 (substrate-without-consumer-binary).

The dispatch's "inline back" step is a no-op at HEAD: the helper is
already inline. The hypothetical split was never executed (O.W3 + AB+1
left the file at 607 LOC unchanged per Pβ §"Per-file LOC table" row
`useSortable.ts | 607 | 0 | COHERENT-LARGE (borderline)`).

### Execution

**No file mutations required**. The substrate state at HEAD is the
intended retired state. This proof doc records the formal retirement
per the P-close ZERO DEFERRAL binding from Pβ §"What P MUST resolve".

The closure-state sharing between `createGhost()`/`updateGhost()`/
`destroyGhost()` and the parent `useSortable()` (via `ghostEl`,
`ghostOffsetX`, `ghostOffsetY`) confirms Pβ's rationale: extracting these
into a separate file would require either threading the closure state
through arguments (verbose) or hoisting it into module scope (breaks
multi-instance safety — module-scope state would leak between concurrent
SortableList consumers).

## § 3 — µ-split #2: utilities.css → btn-audacious.css

### Discovery

```
$ find /Users/mkbabb/Programming/glass-ui/src/styles -name 'btn-audacious*'
(no results)

$ ls src/styles/
animations.css         glass.css              theme.css
cards.css              glyph-face.css         tokens.css
disco-glyph.css        hover-popover.css      transitions.css
dock-group.css         index.css              typography.css
dock.css               instrument-chassis.css utilities.css
floating-panel.css     paper.css

$ rg -n '@utility btn-audacious' src/styles/utilities.css
578:@utility btn-audacious {
```

**Finding**: `btn-audacious.css` does NOT exist as a separate file at
HEAD. The `@utility btn-audacious` block is inline at
`src/styles/utilities.css:578`. All `btn-audacious` mentions outside
that file are:

- `src/components/ui/button/index.ts` — CVA variant consumer (compiled
  class on `primary-audacious` variant)
- `src/components/custom/dock/DockTabButton.vue` — utility consumer
- `src/styles/index.css` — cascade import (imports `utilities.css`,
  which bundles `@utility btn-audacious`)
- `src/styles/dock.css` — reference comment
- `CLAUDE.md` / `DESIGN.md` / `README.md` / `MIGRATION.md` — doc references
- `docs/tranches/**` — historical audit references

### Decision

**RETIRE (already-retired by non-execution)**.

Per the dispatch decision tree:

> If the file doesn't exist as a separate file (the `@utility
> btn-audacious` may live inline at `utilities.css`), the µ-split was
> already retired — DOCUMENT this case as "already-retired; no action".

This is exactly the HEAD state. The hypothetical split was never
executed (O.W3 + AB+1 left `utilities.css` at 655 LOC, +17 vs O
baseline — growth from added recipes, NOT from re-absorbed
`btn-audacious` content per Pβ row `utilities.css | 655 | +17`).

### Execution

**No file mutations required**. The substrate state at HEAD is the
intended retired state.

Pβ's rationale (preserved): `utilities.css` is the single canonical
`@utility` register (37+ utility classes); fragmenting one recipe into
its own file would (a) violate the single-file-per-substrate-class
discipline, (b) require an additional `@import` in `src/styles/index.css`
cascade-order management, and (c) provide zero discoverability win
(consumers reach the utility via `import "@mkbabb/glass-ui/styles"` —
the bundle is one file at the import boundary regardless of source-tree
layout).

## § 4 — Verification

```
$ npm run typecheck
> @mkbabb/glass-ui@1.8.0 typecheck
> vue-tsc --noEmit
(clean — zero diagnostics)

$ npm test
> @mkbabb/glass-ui@1.8.0 test
> vitest run

 Test Files  32 passed (32)
      Tests  365 passed (365)
   Duration  2.83s
```

Both gates **PASS** at HEAD. Since the lane required zero file
mutations, the pre-existing green state IS the post-condition state —
no regression possible.

## § 5 — Operational compliance

Hardened-agent git clause (K W0): observed.

- No `git add` / `commit` / `stash` / `checkout` / `reset` / `restore`.
- No `npm run build` (3 sibling agents may be running in parallel —
  dispatch constraint binding).
- Read-only git only (`find`, `rg`, `ls`, `Read`).
- Single artefact authored at the prescribed path
  (`docs/tranches/P/audit/W4-Lane-F-mu-split-retirements.md`).
- Zero source-tree mutations (`src/`, `package.json`, etc. all
  unchanged) — the µ-splits were already-retired at the time of
  dispatch.

Per the dispatch's "no `npm run build` mid-task" constraint: validated
via `typecheck` + `test` only.

## § 6 — Status: COMPLETED

Both O-residual µ-splits **formally retired** at P close:

| µ-split | Status | Action |
|---------|--------|--------|
| `useSortable.ts` → `dragGhost.ts` | FORMAL RETIREMENT — already-retired by non-execution | none required |
| `utilities.css` → `btn-audacious.css` | FORMAL RETIREMENT — already-retired by non-execution | none required |

The ZERO DEFERRAL constraint from Pβ is satisfied: both candidates are
explicitly retired with rationale captured in this proof doc per
invariant 8 (substrate-without-consumer-binary) and the
`feedback_overfitting_audit` ≥-2-callers cohesion rule.

The hard-gate item P.W4(f) — "2 µ-splits formally retired OR wired with
2nd consumer" — is satisfied via retirement (no 2nd consumer surfaced
since O Rβ).

Pβ's P-close sanity binding item #3 ("Confirm the 2 O-residual µ-splits
remain formally retired (no late un-discussed split)") is also
satisfied — at HEAD, neither `dragGhost.ts` nor `btn-audacious.css`
exists as a separate file.
