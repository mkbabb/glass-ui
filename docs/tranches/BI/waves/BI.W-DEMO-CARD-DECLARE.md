# BI.W-DEMO-CARD-DECLARE — proof:demo E1 (declare /card as a family)

Band B0 (cut-blocker). Born-RED at HEAD.

## Mandate

- **FAM-1** `proof:demo` RED ✔: E1 (demo-earns-page) fails — `display/card` and `containers/card-pressable` both route the `@mkbabb/glass-ui/card` subpath, which is NOT a DECLARED family, so a subpath is shared by >1 routed page off the allowlist. Disposition: W-DEMO-CARD-DECLARE.

## Design

`proof:demo` E1 (BG.W-DEMO-IA-REDESIGN, `proof-demo.mjs:840-857`) is the demo-IA floor: no subpath is shared by >1 ROUTED page unless it is a DECLARED family. The declared-family allowlist (`DECLARED_FAMILY_SUBPATHS`, `demo/stories/manifest.ts:465`) already sanctions two independently-routed pages legitimately sharing a component subpath — `/motion-core` is shared by the `scroll` + `reveal` routed pages (`manifest.ts:353`) with NO FamilyTabs fold. `@mkbabb/glass-ui/card` is the same shape: `display/card` demos the Card **surface-tier** facets, `containers/card-pressable` demos the **`:pressable`** interaction facet — two distinct Card facets, each earning its own routed page.

DECIDE: DECLARE `@mkbabb/glass-ui/card` a family (the `/motion-core` precedent). NOT a fold — both pages are load-bearing distinct facets; folding `card-pressable` into `card` would collapse two real facets onto one page. This is the mechanism-distinctness law read at the demo-IA layer.

## Work

- `demo/stories/manifest.ts:465` (`DECLARED_FAMILY_SUBPATHS`) — add `"@mkbabb/glass-ui/card"` beside `/dock` + `/motion-core`, with a one-line rationale comment (Card surface-tier facet + pressable facet, the `/motion-core` scroll+reveal precedent).

## Acceptance

Gate: **`proof:demo`** — GREEN at close (BORN-RED at HEAD: E1 FAILs, `.cache/gates/BG-demo.json` status FAIL).

Clauses (existing E1, un-widened):
- E1 the only surviving multi-routed subpaths are the DECLARED families (`/dock`, `/motion-core`, `/card`).
- Self-test bite: the existing E1 self-test (`proof-demo.mjs` — 56 synthetic sabotages incl. "declared-family") already proves an UN-declared collision REDs and a declared one greens; the new member rides that bite (a synthetic un-declaring of `/card` must RED).

## π/DELTA

None — device-free demo-manifest declaration; zero pixel change (no route added/removed, no SFC edit).

## Obligations

None (demo-manifest only).

## Dispositions

None (single FAM-1 row, fully discharged).
