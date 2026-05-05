# H - Progress Log

## 2026-05-04 — Tranche open

H opens against the G honest-close state at HEAD: build/typecheck green; tranche G `FINAL.md` (v1) + `G-FINAL-II.md` (post-audit honest re-close) both present; four post-close audit reports under `docs/tranches/G/audit/G-audit-{α,β,γ,δ}-*.md`; six consumer migration ledgers under `docs/tranches/G/audit/W5-{consumer}-migration.md`. Total G diff vs master: 3,134 insertions / 533 deletions across 60 files.

H reads G's audit findings as the load-bearing input — no open design space, no new research wave, no challenge wave.

H thesis: substrate convergence + process hardening. Every G artefact wires-or-retires; G's four lessons-learned promote to binding precepts.

Wrote initial `H.md`, `waves/W0.md` through `W6.md`, this `PROGRESS.md`.

## 2026-05-05 — H opened against committed G state

Pre-W0 remediation: G's accumulated working-tree state (187 files / 21,993
ins / 409 del vs HEAD) was uncommitted at H open; per H invariant 10 +
G-FINAL-II Lesson 3 ("Orchestrator commits at wave close"), the
orchestrator landed two retrospective commits before opening W0:

- `c7ff69f feat(tranche-g/honest-close)` — G's accumulated state
- `bbdd896 chore(tranche-h/open)` — H plan + wave specs scaffold

This puts H's first wave on committed state; future destructive recovery
cannot reach pre-commit work.

## 2026-05-05 — W0 closed

W0 ran two parallel lanes (read-only audit + submodule precept update).

**Lane I deliverable**: `audit/W0-reconciliation.md` (310 lines, 164
artefact rows). Verdict distribution: **90 WIRE (already)** · **73
RETIRE** · **1 conditional EVIDENCE-DOC**. Consumer-evidence-doc invariant
verified at HEAD: zero G-artefact docs (24 entries, all D-tranche), so
projection-only support defaults to RETIRE per H invariant 2.

**Lane II deliverable**: submodule commit `cc57c91 feat(precepts):
promote G's four lessons to binding precepts` lands the four 2026-05-04
entries in `docs/precepts/instructions/`:

- LESSONS-LEARNED.md: 4 new entries (no destructive git as recovery; run
  typecheck earlier; orchestrator commits at wave close; post-close
  audit catches close-ceremony falsehoods).
- tranche/SPEC.md: post-close audit step + undeclared-window clarification.
- ORCHESTRATION.md: commit-at-wave-close paragraph.
- tranche/AGENT_DISPATCH_TEMPLATE.md: two new non-negotiables.

**W0 close commit**: `e6f1411 feat(tranche-h/w0): reconciliation audit +
binding precept updates`. Submodule pointer 458c2d1 → cc57c91.

Hard gate met: audit ledger landed; precept files updated; typecheck +
build green at HEAD; wave commit landed.

## Status

| Wave | Status | Commit |
|---|---|---|
| W0 | closed | `e6f1411` (lane II submodule: `cc57c91`) |
| W1 | open (ready to dispatch) | — |
| W2 | pending W0 | — |
| W3 | pending W1 | — |
| W4 | pending W1 | — |
| W5 | pending W4 | — |
| W6 | pending W2 + W3 + W4 + W5 | — |

## W1 dispatch input

W1 must retire 73 G-shipped artefacts cleanly + leave 90 WIRE-already
artefacts untouched. The W0 reconciliation ledger (Lane I deliverable)
is the load-bearing input for W1's lane decomposition. Per W1.md, lanes
split disjointly:

- **Lane A (custom components)**: retire `<KeyboardShortcutsModal>`,
  `<TierBadge>`, `<LikeButton>`, `<SvgFilters>` package + delete
  manifest entries + remove from `src/index.ts`.
- **Lane B (composables)**: retire `useCollapse`, `useContrastSafeAccent`,
  `useMonacoTheme`; demote 4 blob sub-composables to internal.
- **Lane C (CVA branches)**: retire 6 unused CVA branches.
- **Lane D (slot-class + factory)**: retire `closeIconClass`,
  `keepOpenWhile` (unless W3 wires), `defineDockActionBar`.
- **Lane E (utilities + tokens)**: retire 31 utility classes + 18 tokens
  + 4 runtime helpers in tokens.ts.
