# P.W5 Lane F—Formal retirements + classification ledger (orchestrator-direct)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (doc-only; 5 archive entries).

## §1—Scope

Per `docs/tranches/P/waves/W5.md` Lane F + P invariant 28 (zero deferral).

Five archive entries codifying formal-retire dispositions for consumer-side carries that glass-ui-side cannot land directly but the inheritance ledger requires dispositioning:

| # | Archive doc | Disposition |
|---|---|---|
| 1 | `docs/tranches/P/archive/value-js-wip-branch.md` | PD-3 → formal-archive (W5.md A.5 fallback) |
| 2 | `docs/tranches/P/archive/use-popup-mutex.md` | usePopupMutex → CONSUMER-PRIVATE |
| 3 | `docs/tranches/P/archive/idle-bob.md` | idle-bob → CONSUMER-PRIVATE (RETIRE-as-inline at keyframes.js) |
| 4 | `docs/tranches/P/archive/keyframes-overfitting.md` | 84% overfitting → CONSUMER-ORCHESTRATOR-OWNED |
| 5 | `docs/tranches/P/archive/bbnf-buddy-53-findings.md` | 53-finding ledger → CONSUMER-SIDE-CARRY |

## §2—P invariant compliance

Per **P invariant 28** (zero deferral at tranche close), every inheritance-ledger item must exit P with one of:

- ADDRESSED at a P wave (LAND).
- ARCHIVED-with-rationale (formal-archive with permanent-out-of-scope classification).
- RETIRED at open (no longer applies; redundant with a successor item).

The 5 archive entries cover the consumer-side carries that cannot LAND at P-scope (either because they're consumer-orchestrator-owned, or because they require user-authorization signals the orchestrator cannot request mid-execution). All five exit P-close as ARCHIVED.

## §3—Carry-forward chain termination

Each archived entry terminates a multi-tranche carry-forward chain:

- PD-3: M → N → O → P (4 carries, 0 absorptions) → **archived at P**.
- usePopupMutex: surfaced at P11/e; never on glass-ui surface → **archived at P-open**.
- idle-bob: surfaced at P11/d; consumer-private → **archived at P-open**.
- 84% overfitting: surfaced at P11/d; CONSTELLATION.md §6 separation-of-concerns → **archived at P-open**.
- 53-finding ledger: surfaced at P11/c; zero glass-ui-cross-walk → **archived at P-open**.

Future tranches do NOT inherit any of these. The carries are dispositioned.

## §4—Cross-references

- `docs/tranches/P/waves/W5.md` Lane F.
- `docs/tranches/P/findings.md` §2 (inheritance ledger).
- `docs/tranches/P/coordination/CONSTELLATION.md` §3 + §6.

## §5—Status: COMPLETED.
