# BI.W-AFFORDANCE-REDESIGN — the CBA 15-page worklist (search rebuild · readouts · permutation-fill · demarcation · IA dedupe)

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F6** "These and other items should be wrapped in a glass-ui veil card to demarcate and suffuse design hierarchy." (ss-20 — bare demo panes on the page field).
- **UF-F7** "We need to re-design pages like this and better use the space. Proper dropdown demos. … Audit every component page demo for proper affordance to show the various permutations of usage." (ss-15 /containers/context-menu).
- **CBA-2** [P1]: data/search is a test fixture masquerading as a demo — a "Helper call ledger" of internal call-COUNTS with `data-testid`, buttons labeled `buildIndex`/`searchIndex`/`fuzzyMatch` (internal API names as UI); rebuild as a real search demo, move the instrumentation to the tests-visual spec.
- **CBA-3** [P2]: debug/state-readout strips rendered as UI (dropdown-menu flags, context-menu tone/grid, sortable-list SORTABLE_CONTEXT, virtual-section π badges) — delete or re-style as teaching affordances.
- **CBA-4** [P2]: missing-permutation-coverage (popover 1 permutation; sheet omits the `surface` axis; card-pressable never shows a static card beside the pressable one).
- **CBA-5** [P3]: FamilyTabs IA duplication (metrics/table re-embed components that ALSO ship as standalone routes).
- **CBA-6** [P2]: chassis-inconsistent demarcation (avatar/tags-input/metrics/sortable-list use 0 StorySection; hover-popover uses bare `<section>`).
- **CBA-WORKLIST** [P1]: the ranked 15-worst worklist — the D-STORY input.

## Design

The per-page redesign that USES the schema/specimen/veil primitives the sibling waves land (`story/PASS-1.md` §4.6, permutations-with-affordance). NO demo-local forks — the demarcation plate is the shared `surface="veil"` register (W-SPECIMEN-FRAME's SpecimenFrame plate), the section rung is StorySection's `heading` (AZ.W-HIERARCHY), the permutation grid is `PermutationGrid` (=DemoMatrix, W-SPECIMEN-FRAME).

Systemic fixes resolve the top 10 (`ROUND-2-DIGEST` CBA-WORKLIST disposition): (1) **data/search rebuild** — the SearchBar sizes + the FuzzySearch overlay + a results list; the helper-fn exercise + call-ledger MOVE to `tests-visual/search.spec.ts` (where the `data-testid` readbacks belong), off the user-facing page. (2) **Readout-strip redesign** — raw internal-state readouts DELETED or re-styled as visible teaching affordances (context-menu tone/grid → a visible tinted canvas, NOT a mono debug line; sortable-list SORTABLE_CONTEXT internals → drop; virtual-section 20/1000 kept but re-captioned as a feature, not a `data-testid`). (3) **Permutation-fill** — per page, read the component CVA/props and add the missing variant/size/side/surface/state rows (each container demo ≥2 trigger widths/variants + the placement matrix + ≥1 disabled/edge state). (4) **StorySection consistency + veil demarcation (UF-F6)** — the 0-StorySection pages (avatar/tags-input/metrics/sortable-list) + bare-`<section>` pages (hover-popover) migrate to StorySection with proper `heading` rungs; demo bodies wrapped in the veil-card demarcation. (5) **FamilyTabs IA dedupe** — decide per family (metrics/table): drop the standalone routes and keep the family aggregator, OR make the family page a thin index that LINKS not re-mounts (`ROUND-2-DIGEST` CBA-5).

Priority order: 1-3 (user-visible P1: popover, dropdown-menu, data/search), then 4-7. The lone-trigger-width fix on those pages is W-SPECIMEN-FRAME's CBA-1 (wrap the trigger); this wave adds the PERMUTATIONS around it.

## Work

- `demo/stories/data/search.vue` — rebuild as a real search demo (SearchBar + FuzzySearch overlay + results); move `buildIndex`/`searchIndex`/`fuzzyMatch` exercise + the `data-testid` "Helper call ledger" (search.vue:286-411) to `tests-visual/search.spec.ts` (CBA-2).
- Readout-strip pass: `dropdown-menu.vue:130-135` (flags strip), `context-menu.vue:61-63` (tone/grid → tinted canvas), `sortable-list.vue:36-62` (SORTABLE_CONTEXT drop), `virtual-section.vue:78-83` (re-caption) (CBA-3).
- Permutation-fill: `containers/{popover,dropdown-menu,context-menu,sheet,card-pressable}.vue`, `navigation/header-ribbon.vue` — add the missing axis rows off each component's CVA/props (CBA-4).
- StorySection consistency: `data/{avatar,tags-input,metrics,sortable-list}.vue`, `containers/hover-popover.vue` — migrate to StorySection `heading` + veil-card demarcation (CBA-6, UF-F6).
- FamilyTabs IA: `data/metrics.vue`, `data/table.vue` — decide drop-standalone vs thin-index (CBA-5); coordinate with B8 (compositions prune) for the shared IA.

## Acceptance

Gate: **`proof:story-affordance`** (NEW, born-RED) — GREEN at close (BORN-RED at HEAD: data/search fixture live; readout strips live; permutation gaps; 0-StorySection pages).

Clauses:
- AF1 data/search carries NO internal-API button labels (`buildIndex`/`searchIndex`/`fuzzyMatch`) and NO `data-testid` call-ledger on the user-facing page (moved to spec); a real SearchBar + results present.
- AF2 permutation coverage: each enrolled container demo shows ≥2 trigger widths/variants + the placement matrix + ≥1 disabled/edge state (the sheet `surface` axis, card-pressable static-beside-pressable).
- AF3 StorySection consistency: the enrolled 0-StorySection + bare-`<section>` pages compose StorySection with a `heading` rung + the veil-card demarcation (surface="veil", consumed not forked).
- AF4 FamilyTabs IA: metrics/table resolve to ONE canonical path per member (drop-standalone OR thin-index) — no member reachable two ways that re-mounts.
- Self-test bites: a planted internal-API button label reds AF1; a planted single-permutation container demo reds AF2; a bare-`<section>` demo body reds AF3.

## π/DELTA

- **data/search real demo** — the rebuilt page reads as a search component (SearchBar + FuzzySearch overlay + results), NOT a test fixture; both modes.
- **Permutation grids** — a representative container page (popover, sheet) shows the full axis matrix (variant/size/side/surface/state) via PermutationGrid; both modes, Chrome + real-Safari (representative dual-engine capture per the 15-page worklist).

## Obligations

- **G8 migration blast-radius** (carried with W-SPECIMEN-FRAME): the StorySection swap + DemoKIND fold shift DOM — the 3-page (forms/data/display) tests-visual re-run + axe + fresh dual-engine capture BEFORE the ~35-45-SFC rollout.
- **STABLE-Safari** (SAF-1): representative page captures on real Safari.app.

## Dispositions

- Terminalizes **CBA-2** / **CBA-3** / **CBA-4** / **CBA-5** / **CBA-6** / **CBA-WORKLIST** / **UF-F6** / **UF-F7**. WS4-13 (every page standardized) + WS4-26 (KS-AWWWARDS-DEMO applied to F7) advance here. The lone-trigger-width fix is W-SPECIMEN-FRAME (CBA-1); the meta-language lexicon gate over the readouts is W-DEMETA. UF-F10's constellation-dedup is B5/D-VIZ and its compositions-prune is B8 — the FamilyTabs-IA-dedupe aspect (CBA-5) is the only UF-F10 slice owned here.
