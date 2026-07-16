# BI.W-P112 — InfiniteScroll

**Status:** DONE

## Product truth

InfiniteScroll is a small IntersectionObserver sentinel with loading and terminal
slots. Intersection truth is the only authority that emits `load-more`. After a
load completes, the observer reconnects after Vue commits the caller's new
content; the existence of a sentinel never triggers a request by itself.

One intersection produces at most one request before reconnection. `hasMore` and
`isLoading` gate observer delivery, and teardown disconnects the owned observer.

## Ownership boundary

- Glass owns the sentinel, observer lifecycle, threshold, and loading/end
  presentation slots.
- The caller owns fetching, errors, retry policy, cancellation, race handling,
  data identity, scroll restoration, query state, and virtualization.
- No eager load-all fallback, second scheduler, proof script, or per-browser gate
  is part of the component.

## Verification

Focused unit coverage proves that loading completion reconnects observation
without emitting and that a fresh intersecting record emits the next request.
