# BI.W-COMPOSITIONS-PRUNE — the misfiled single-component demos leave the compositions band

Band B8 (prunes + consumer-truth). PRUNE / IA. Demo-only.

## §Mandate

Discharges:
- **UF-K5** — "We need to prune so many of these superfluous components." (compositions band; PRUNE).
- **FAM-10** — "4 single-component demos misfiled as compositions."

## §Design

Decided (UF-K5, FAM-10). The compositions band is for REAL SCENES — multiple components composed into a
surface they were built for (auth-shell, settings, empty-states, form-validation, gate-pattern, the section
landing). Four registrations are SINGLE-component demos misfiled here (each demonstrates ONE family that ships
its own subpath/family page):

- `compositions/configurator` (`manifest.ts:1302-1307`) — the Configurator family (`@mkbabb/glass-ui/configurator`).
- `compositions/instrument-chassis` (`:1308-1313`) — the InstrumentChassis family (`@mkbabb/glass-ui/instrument-chassis`).
- `compositions/drawer-live-behind` (`:1296-1301`) — a single Drawer mode (`@mkbabb/glass-ui/drawer`).
- `compositions/labeled-field` (`demo/stories/compositions/labeled-field.vue`) — the LabeledField family (forms).

Clean break: each relocates to its proper family page (Configurator → its family/studio; InstrumentChassis →
data/ or its family; drawer-live-behind → containers/drawer as a mode permutation; labeled-field → forms) OR
folds as a FamilyTabs member of that family (coordinated with W-AFFORDANCE-REDESIGN's CBA-5 IA decision). No
single-component demo survives under `compositions/`. The compositions band keeps ONLY the composed scenes.

The `compositions/icon-tooltip.vue` + `compositions/chassis.vue` residues (if unregistered/dead) are swept in
the same pass (icon-tooltip's fold is W-SPEEDTEST-ONLY-PAIR / W-OVERLAY-UNION; a dead `chassis.vue` deletes).

## §Work

- `demo/stories/manifest.ts` — move the 4 misfiled rows out of the `compositions` category into their family
  category (or fold as FamilyTabs members); the compositions category list keeps the composed scenes only.
- Relocate/DELETE the 4 SFCs per their destination; sweep `compositions/icon-tooltip.vue` + any dead
  `compositions/chassis.vue`.
- Coordinate `FOLDED_STORY_IDS`/routes with W-FOLDED-REDIRECTS (a moved id resolves to its new family route).

## §Acceptance

Gate: **`proof:demo`** (the compositions-census arm — a category-membership rule: a compositions story composes
≥2 distinct component families; a single-family demo is misfiled).
- **BORN-RED at HEAD**: the 4 single-component demos are registered under `compositions` (the
  single-family-in-compositions clause reds).
- CP1 — every surviving `compositions/*` story composes ≥2 distinct families (a real scene); the 4 misfiled
  singles are relocated/folded to their family.
- CP2 — no dead/unregistered SFC survives under `demo/stories/compositions/` (chassis/icon-tooltip residue swept).
- Self-test bite: a re-added single-family demo under `compositions` reds CP1.

## §π/DELTA

No standalone π (an IA relocation of demos changes no user-visible component paint; the moved demos render on
their family routes, covered by the D-STORY affordance π). The census RED→GREEN differential is the evidence.

## §Obligations

- No cross-repo ask (demo-only IA). Coordinates with **W-AFFORDANCE-REDESIGN** (CBA-5 FamilyTabs IA) +
  **W-FOLDED-REDIRECTS** (moved-id redirects) + **W-STRUCTURE-RESEQUENCE** (STRUCT-12 pruned-demo census).
- **UF-K4 (auth-shell perf) is NOT this wave** — the fourier-page-bg perf fix is `W-AUTH-SHELL-BG` (B5);
  auth-shell STAYS as a real composed scene, its perf owned elsewhere. Recorded, no double-claim.

## §Dispositions

- Terminalizes **UF-K5** (compositions band): the 4 misfiled singles RELOCATE/FOLD to their families; the band
  keeps composed scenes only. Liveness probe: a single-family demo under `compositions` REDs the census.
