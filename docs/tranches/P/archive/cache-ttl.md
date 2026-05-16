# PD-2 archive—Cache TTL (L-residual)

**Date**: 2026-05-16.
**Status**: ARCHIVED-PERMANENT—caching policy is application-level concern; glass-ui has no caching substrate by design.
**Source**: L tranche residual → M → N → O → P inheritance ledger PD-2.

## §1—Investigation

The L tranche surfaced a question about cache-TTL semantics for glass-ui's domain (configurator presets, sortable state, dock state, etc.).

Glass-ui's substrate is intentionally **stateless at the component level**. State management is consumer-owned:
- Configurator presets: consumer-instantiated via `useConfiguratorState<T>()`—consumer holds the reactive state.
- Sortable list: consumer holds the items array; glass-ui's `useSortable` returns reactive selection/drag state.
- Dock state: consumer-instantiated via `useDockState()`—consumer-scoped reactive store.

No glass-ui primitive ships a network layer, a storage layer, or a cache layer. The "cache-TTL" concept therefore has no substrate home in the library.

## §2—Rationale for permanent-out-of-scope

Three reasons:

1. **No network / storage layer**: cache-TTL is meaningful for network responses or storage reads. Glass-ui is a UI library—no fetch wrappers, no localStorage helpers, no persistence layer.
2. **Application-level concern**: TTL policy is application-specific (auth tokens have different TTLs than search results which have different TTLs than user preferences). Glass-ui cannot reasonably default the TTL of any specific consumer use case.
3. **Consumer-owned state**: every glass-ui composable that returns reactive state delegates lifetime management to the consumer's `setup()` scope. Consumers can layer their own cache adapters on top of glass-ui composables (e.g. wrap `useFuzzySearch` in a TTL-aware cache); glass-ui's responsibility ends at the reactive surface.

## §3—Disposition

ARCHIVED-PERMANENT. The carry-forward chain (L → M → N → O → P) terminates here. Future tranches do NOT inherit PD-2.

If a specific consumer surfaces a domain that legitimately needs glass-ui-substrate caching (e.g., a CDN-fetched font preset registry), that's a domain-specific case to evaluate against the substrate-without-consumer-binary invariant—not a "cache-TTL" rejection.

## §4—Cross-references

- `docs/tranches/P/waves/W6.md` §"PD-2—L-cache-ttl".
- `docs/tranches/P/findings.md` §2 PD-2.

## §5—Status: ARCHIVED-PERMANENT.
