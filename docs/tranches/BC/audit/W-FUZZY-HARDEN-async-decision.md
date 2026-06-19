# W-FUZZY-HARDEN — the `useAsyncSearch` race-guard decision

**Verdict: BOOK** (not minted). A generic async/generation abort race-guard is over-engineering at the present consumer count. It is minted in a future wave only when the trigger below fires.

## What `useAsyncSearch` would be

The abstracted form of the words `lookup.ts:254-289` network-orchestration pattern — `prepareSearch()` → `{controller, generation}`, `isCurrentGeneration(gen)`, `finalizeSearch(gen)`, `cancelSearch()` (bumps `searchGeneration` + aborts the in-flight `AbortController`). A generation token invalidates a stale in-flight request when a newer query starts; the `AbortController` cancels the network call. This is a NETWORK race-guard — it only earns its keep when there is async work to race.

## The ≥2-binary-consumer count (the no-contrivance bar)

The MEMORY rule: every `src/` artefact has ≥2 sites or is exported-as-a-leaf or is a private demo helper. A shared race-guard composable must clear the ≥2-binary-consumer bar in glass-ui's own tree.

| candidate consumer | binary? | why |
|---|---|---|
| #1 dock-search async `onSearch` path (`BC.W-DOCK-SEARCH §53`) | NO | the dock spec already states it carries its OWN thin inline abort for the async case — it debounces + cancels the prior `AbortController` on a new query inline. It does NOT require a shared `useAsyncSearch` to function. A potential consumer, not a forcing one. |
| #2 a glass-ui-tree network-search consumer | NONE | there is no network-search consumer in glass-ui's tree. words' network orchestration stays words-LOCAL via the `onSearch` prop (the one-directional fence); it is NOT a glass-ui binary consumer. |
| the CLIENT fuzzy pipeline | N/A | `searchIndex` is synchronous + sub-millisecond. There is NO async race to guard in the client pipeline (`words-subsume.md §3c`). |

Binary consumers in glass-ui's tree: **0 forcing**. The bar is not met.

## The mint trigger (recorded — when BOOK becomes BUILD)

`useAsyncSearch` is minted in a future wave IFF **both**:

1. the dock-search async path is built AND chooses to compose a shared race-guard (consumer #1 becomes binary — it stops carrying its own inline abort and reaches for the shared helper); AND
2. a SECOND real async-search consumer lands in glass-ui's tree (consumer #2 becomes real — not words', which stays foreign-tree-local).

Until both fire: the dock owns its thin inline abort + words owns its network guard (presets-in-consumers). Minting a single-consumer abort helper now is the over-engineering the no-contrivance fence forbids.

## The one-directional fence (why the count stays low by design)

glass-ui owns the CLIENT matcher (`fuzzyMatch`/`searchIndex`/`useFuzzySearch`). words does NOT adopt the client fuzzy — its search is backend-driven (`searchApi.search(query, {mode, signal})` hits `GET /search`, the matching is server-side Python). The dock plugs a network source via an `onSearch` prop; the consumer owns abort/network. So the only async-search work in this cluster lives in consumers, never in the library's client pipeline — which is exactly why there is no glass-ui-tree async race to abstract. The fence is machine-locked by `proof:fuzzy-harden` FH5 (no words-network type `SearchParams`/`SearchResponse`/`useLookupSearch` leaks into glass-ui/search).

## Gate enforcement

`proof:fuzzy-harden` FH4 asserts: (a) this decision artefact exists + records the BOOK verdict, (b) no `useAsyncSearch` is minted anywhere in `src/` (the no-single-consumer-abstraction fence). A synthetic single-consumer `useAsyncSearch` minted in `src/` reds the gate.
