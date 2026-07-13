# useVirtualSectionWindow — the demo-supporting section-windowing mechanism (`/virtual` subpath RETIRED)

## Terminal verdict — the `/virtual` published subpath is RETIRED (BI.W-VIRTUAL-TRUTH, DOC-4)

The `./virtual` published subpath is RETIRED at the 5.0.0 major. It had ZERO
external binary consumers and ZERO src/ production consumers — its BC un-retire
justification was fabricated twice over (below). The windowing engine STAYS as a
demo-supporting composable (three demo consumer sites), but it is no longer a
published external surface. This is the terminal adjudication of the FAM-16 DOC-4
fabrication; there is no re-book, no third state.

The clean break, no alias: the `@mkbabb/glass-ui/virtual` export key, its
`typesVersions` row, the `src/subpaths/virtual.ts` mirror, and the four windowing
contract types re-published on the `/api` discovery layer are all removed.

## The two fabrications this correction kills

**Fabrication 1 — the external binary consumer.** The BC re-promotion named words
`DefinitionContentView` as a live external consumer of `@mkbabb/glass-ui/virtual`.
It is not:
`../words/frontend/src/components/custom/definition/components/content/DefinitionContentView.vue:162`
imports `useVirtualSectionWindow` from `@/composables/virtual` — a words-LOCAL,
byte-DIVERGENT fork (`../words/frontend/src/composables/virtual/useVirtualSectionWindow.ts`,
md5 ≠ the glass-ui copy), never a glass-ui import. Probed fresh at execution: the
fork is byte-divergent AND words maintains it (declines re-adopt) — the §Design(a)
retire preconditions. The old grep found the SYMBOL, never a glass-ui consume.

**Fabrication 2 — the "internal live consumer".** The interim doc claimed the
glass-ui dock-search results list composes `useVirtualSectionWindow`. It does not.
`src/components/custom/dock/composables/useDockSearch.ts` takes an OPTIONAL
callback `ensureTargetWindow?: (id: string) => void` and invokes it
(`options.ensureTargetWindow?.(id)`) — it is DECOUPLED from the windower. The
library dock composes `useFuzzySearch` + `useScrollChrome`, NOT
`useVirtualSectionWindow`. There is NO src/ production consumer.
Proof: `rg -n 'useVirtualSectionWindow' src/` finds only comments — zero import,
zero call-site.

## Honest consumer state — 0 external · 0 production · 3 demo

The only real consumers are demo pages, wired through the internal
`@glass/composables/virtual` alias (NOT the published subpath):

- `demo/stories/navigation/toc-tracking.vue:26,73` — `useVirtualSectionWindow(...)`
- `demo/stories/dock/dock-search.vue:21,70` — `useVirtualSectionWindow<DocSection>(...)`
  (this demo is what wires the windower's `ensureTargetWindow` INTO the library
  dock's callback — the library dock does not depend on it)
- `demo/stories/data/virtual-section.vue:6,48` — `useVirtualSectionWindow<DemoSection>(...)`

Proof: `rg -n 'useVirtualSectionWindow' demo/stories/navigation/toc-tracking.vue demo/stories/dock/dock-search.vue demo/stories/data/virtual-section.vue`

Three demo sites clear the overfitting-audit floor (≥2 sites → a legitimate
demo-supporting composable), so the composable STAYS in `src/composables/virtual/`
as internal, demo-consumed code. But demo consumers do NOT count toward the
≥2-BINARY-consumer bar (J inv-10) — a published subpath needs a production or
cross-repo consumer, and there is none. Hence the subpath retires.

## Artefact path (internal-only)

`src/composables/virtual/useVirtualSectionWindow.ts`,
`src/composables/virtual/useWindowedStore.ts`,
`src/composables/virtual/virtualSectionLayout.ts` — reached only by INTERNAL
relative import (`@glass/composables/virtual` in `demo/`). NOT on the root barrel,
NOT on a subpath.

## Lineage — v0.9.4 → retired v1.0 → returned BC → subpath-retired BI

A glass-ui primitive at v0.9.4, retired at v1.0 (`MIGRATION.md §3.2-3.4` — "0
production consumers, demo-only at v0.9.x", the `/virtual` subpath removed).
REVERSED at BC on the (fabricated) two-binary-consumer strength. At the 5.0.0 cut
the PUBLISHED subpath retires again (BI.W-VIRTUAL-TRUTH) — the demo-only reality
is the SAME reality that justified the v1.0 retirement. The machinery is unchanged;
only its publication status is.

## atlas O-E9 — DECLINED-TERMINAL (re-trigger at the real consume)

The atlas VIRT-CORE ask (a document-native `/virtual` core: content-visibility
substrate + slim viewport core, `atlas-inbox-2026-07-10-o-close.md` item 10) is a
long-pole FUTURE ask — atlas's own note: it "needs nothing from this row" on the
published surface today; it blocks the paper/vft long pole only. Not an active
binary consume, so it does not float the published subpath now. Declined with the
atlas-visible rationale, matching the INBOUND-MARKS O-E7/WG-E DECLINED-TERMINAL
idiom: the published subpath re-mints when a real ≥2 cross-repo binary consume
lands (the vft V4 → V6.g consume, or a words re-adopt ask). Until then the
mechanism lives internal, demo-only.

## Off the root barrel — now internal-only

The composable is keyframes-FREE + vueuse-FREE (root-barrel-ELIGIBLE per the
`useLiquidFlex` precedent), but it is a heavy DOM-measure leaf with a
module-global `SESSION_HEIGHT_CACHE` — deliberately OFF the root barrel even while
published. With the subpath retired it is internal-only; the off-root discipline
is unchanged.

## useVirtualGrid stays words-local (the @tanstack fence)

The grid windower (`../words/frontend/src/composables/virtual/useVirtualGrid.ts`)
depends on `@tanstack/vue-virtual` — a hard 3rd-party peer — so it was never
re-minted onto glass-ui and is not now. No `@tanstack/vue-virtual` import exists
in `src/`.

## Re-entry trigger + re-audit proof

The published subpath re-mints only on a real ≥2 cross-repo binary consume
(§O-E9 above) — a production or external importer of the glass-ui surface, never a
demo page and never a local fork.

Re-audit greps: no src/ production consumer
(`rg -n 'useVirtualSectionWindow' src` finds only comments); the demo consumers
(`rg -n 'useVirtualSectionWindow' demo/stories/navigation/toc-tracking.vue demo/stories/dock/dock-search.vue demo/stories/data/virtual-section.vue`);
words imports its own fork
(`rg -n "from '@/composables/virtual'" ../words/frontend/src/components/custom/definition/components/content/DefinitionContentView.vue`).
