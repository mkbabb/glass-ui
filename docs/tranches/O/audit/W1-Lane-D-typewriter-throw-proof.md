# O.W1 Lane D—Typewriter unreachable throw (F5)

**Status**: landed.
**Lane mode**: orchestrator-direct (single 3-line change; no worktree warranted).
**Invariant bound**: 24 (fail-explicit on library-internal contract violations; codified at precept `46ee7e9`).

## § Disposition

Per W1.md Lane D + Rα F5 finding: `src/components/custom/typewriter/utils/keyboard.ts:210-212` was the self-flagged "should not reach here" defensive bail returning the last entry of the weighted-pool as a "fallback". The bail is reachable only if the weighted-pool walk fails to select—which mathematically cannot occur given a non-empty pool with positive weights. The branch was a library-internal invariant violation; per invariant 24 it must throw.

Before:

```ts
// Should not reach here, but fallback
const last = pool[pool.length - 1].char;
return isUpper ? last.toUpperCase() : last;
```

After:

```ts
throw new Error(
    "[typewriter:weighted-pool] pool exhausted without selection—" +
    "invariant violation; ADJACENCY_MAP integrity check needed.",
);
```

The message names the offending subsystem (`typewriter:weighted-pool`), the failure mode (`pool exhausted without selection`), and the diagnostic next-step (`ADJACENCY_MAP integrity check`) so a future hit surfaces actionably.

## § File changes summary

```
$ git diff --stat src/components/custom/typewriter/utils/keyboard.ts
 src/components/custom/typewriter/utils/keyboard.ts | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
```

Net: −0 net LOC (3 lines replaced by 4 lines of error throw).

## § Verification

```
$ npx vue-tsc --noEmit
(exit 0; clean)
```

The change is internal to a private helper (`pickWeighted(pool, isUpper)`); the function signature still returns `string` so callers see no API change. Consumers cannot reach this branch under normal use (per the function's own docstring + ADJACENCY_MAP invariant); the throw surfaces only when ADJACENCY_MAP is mutated to violate the integrity guarantee.

## § Open questions for orchestrator

None.

## § Worktree diff verification

This lane is orchestrator-direct (no worktree). Edit applied directly to the main tree at `src/components/custom/typewriter/utils/keyboard.ts`.
