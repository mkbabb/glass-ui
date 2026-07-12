# BI.W-FOLDED-REDIRECTS — the ~25 folded-member deep-links resolve to their family page

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **BI-STAB-A-1** [P3] (`ROUND-3-DIGEST`): the ~25 `FOLDED_STORY_IDS` members (forms/combobox, forms/select, forms/multi-select, forms/textarea, forms/label, forms/toggle-chip, forms/selectable-chip, data/data-table, data/metric-cell, data/metric-stack, data/scrolling-text, data/avatar, feedback/toaster, display/*, motion/*, foundations/paper-texture) **404 with "Lost in the lattice"** on a direct URL / deep-link — `foldFamilies()` drops their routes but no redirect maps a folded id to its family page. Bookmarks/shared links to any folded member break.

## Design

`foldFamilies()` (`manifest.ts:1359`) filters `cat.stories` to drop folded members from the nav; `router.ts buildRoutes()` loops the ALREADY-filtered list, so no route is registered for folded ids → the request falls to the `:pathMatch(.*)*` catch-all (`router.ts:103`) → `eggs/NotFound.vue`. The nav is clean (no phantom chip points at a 404 — the docks read the filtered `CATEGORIES`); only direct/deep links break.

DECIDED: add a folded→family REDIRECT map (the canonical path is the family page). A folded id resolves to its family route (e.g. `forms/combobox` → `forms/inputs`, optionally `#combobox`), NOT the lattice 404 — the deep-link parity fix. This is the CBA-5 FamilyTabs-IA disposition's routing companion (a folded member is a FamilyTabs tab inside its family page). The catch-all still catches a genuinely unknown path (the lattice egg preserved for real 404s).

Clean break, no alias: the redirect is a router-level map derived from `FOLDED_STORY_IDS` + the member→family relation the `foldFamilies` fold already knows, not a per-id hand-list.

## Work

- `demo/stories/manifest.ts` — expose the folded-member → family-route relation (the fold already computes membership; surface it as a `FOLDED_MEMBER_FAMILY` map or a helper, derived, not hand-listed).
- `demo/router.ts buildRoutes()` — register a `redirect` route for each `FOLDED_STORY_IDS` member → its family route (before the `:pathMatch(.*)*` catch-all), so a direct/deep link to a folded id 302s to the family page instead of NotFound.

## Acceptance

Gate: **`proof:demo`** IA clause EXTENDED (a folded-redirect arm) — GREEN at close (BORN-RED at HEAD: 25 folded ids 404 on a direct navigate).

Clauses:
- R1 every `FOLDED_STORY_IDS` member resolves via a router redirect to its family route (not the `:pathMatch` NotFound) — enumerated over the fold set.
- R2 the redirect target is derived from the member→family relation `foldFamilies` computes (no per-id hand-list); a family that gains/loses a member re-derives.
- Self-test bite: a synthetic folded id redirects to its family; a genuinely unknown path STILL 404s to the lattice egg (the catch-all preserved).

## π/DELTA

- None — device-free routing (a redirect resolve, not a pixel claim). Live smoke: navigating `/forms/combobox` (and via SPA pushState) resolves to `/forms/inputs` (from the HEAD "Lost in the lattice" 404), verified in the route-walk.

## Obligations

- None (demo-router only; no device run, no cross-repo ask).

## Dispositions

- Terminalizes **BI-STAB-A-1** (folded-member deep-link 404s). The routing companion to W-AFFORDANCE's CBA-5 FamilyTabs-IA decision (drop-standalone vs thin-index) — whichever IA lands, the folded ids resolve rather than 404.
