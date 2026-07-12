# BI.W-STORY-SCHEMA — pages-as-data (StoryBody + StoryScope), the STORY-A architecture

Band B6 (storybook meta-system). Born-RED at HEAD. The foundation wave — W-SPECIMEN-FRAME / W-CODEBLOCK / W-AFFORDANCE render INTO the primitives this schema dispatches.

## Mandate

- **UF-F2** (the codified half): "we should have a meta-component system built out and used for storybook pages. Codified and the like—is this not extant?" — the shrink-title mechanism half of UF-F2 is W-SHRINK-HERO's mandate row; THIS wave discharges the *codified pages-as-data* half.
- **D-STORY ruling 8** (`PASS-4B-AGGLOMERATION` §rulings): StoryScope named-v-model = an EXPLICIT manifest mapping (`models: { searchTerm: 'query' }`), no convention magic; the mapping counts toward the schema, not the escape hatch.
- **D-STORY ruling 9**: the `prefix` field survives IFF the full-census finds a second consumer; else it drops and badge uses the slot escape. The G1 bar binds as the **≥70% MEAN** as-data across the measured spec-sheet set with **no page below 60%** (per-page minima over-fit the bar to one page).
- **G1** (`story/PASS-1.md` §6): the pages-as-data ratio — the family-deciding bet (measured: forms/inputs 85.7%, badge 88.9%, dock/overview 0%→bespoke bound).

## Design

STORY-A ADVANCES as the bounded structural bet (`story/PASS-1.md` §1, ADVANCE) and renders INTO STORY-B's primitives — zero new visual primitive (`PASS-4B-RAW` D-STORY, all 5 gaps CLOSED at 87%). The schema is PURE DATA (no Vue import, no closure); the renderer expands `permute` + `instances` into REAL library components (verified: forms/inputs-data renders 6 Input instances with state parity, 0 console errors).

DECIDED (ruling 8): `SpecimenSpec` carries an explicit `models` map for named-v-model components — a `<Toggle pressed>` / picker page states `models: { pressed: '…' }` rather than relying on a modelValue-only 2-branch dispatch (MEMORY: named-v-model silently no-ops when mis-bound — the explicit map is the anti-no-op floor). No convention magic; the map is a schema field.

DECIDED (ruling 9): the `prefix` field is retained ONLY if the full-census (all spec-sheet pages migrated) finds a 2nd consumer beyond badge; else it is TRIMMED and badge uses the SpecimenFrame slot escape (the ≥2-consumer law the design applied to its own sub-types in G9). The ratio bar is the ≥70% MEAN, no page <60%.

The bespoke escape is the bound: a page needing a page-specific quirk field goes `bespoke: Component` (dock/overview 0%, typography, aurora studio) — measured, not aspirational. Zero quirk fields in the migrated set is the binding bar (the "~20 field count" is a counting-rule artefact, dropped per pass-4).

## Work

- NEW `demo/chassis/body/story-body.ts` — `StoryBody` / `SectionSpec` / `SpecimenSpec` / `SpecimenSize` schema + the `StoryScope` reactive model bag + the explicit `models` map field (ruling 8). Pure data, no Vue import.
- NEW `demo/chassis/body/StoryBodyRenderer.vue` — section dispatch (`SectionSpec[]` → `<StorySection>` → `<SpecimenFrame>`/`<PermutationGrid>` → `<CodeBlock>`) + `permute` cartesian expansion with per-cell isolated models + auto `aria-label` from the prop combo.
- `demo/stories/manifest.ts` — `Story` gains `body?: StoryBody`; the `prefix` field decided per ruling 9 (2nd consumer named in a comment, or the field absent).
- `demo/chassis/page/StoryPage.vue` — `<slot/>` becomes `<StoryBodyRenderer :body>` when `body.kind === "sections"`; stays slot/bespoke otherwise.
- Migrate the spec-sheet floor: `forms/inputs` (stateful, StoryScope), `display/badge` (permutation grid), `feedback/alert`, `forms/select` (named-v-model exemplar → exercise the `models` map), + measure `data/table` (the quirk-field watch — a page that needs one goes bespoke).

## Acceptance

Gate: **`proof:story-schema`** (NEW) — GREEN at close (BORN-RED at HEAD: `demo/chassis/body/` absent, ratio unmeasured on disk).

Clauses:
- S1 the schema exists at `story-body.ts` (StoryBody/SectionSpec/SpecimenSpec/SpecimenSize/StoryScope) AND carries NO Vue import / render closure (pure data — the "Vue-in-JSON" anti-pattern reds).
- S2 `StoryBodyRenderer` dispatches INTO the kit primitives only (StorySection/SpecimenFrame/PermutationGrid/CodeBlock) — a net-new visual primitive in the renderer reds.
- S3 named-v-model is the EXPLICIT `models` map (ruling 8) — a bare modelValue dispatch on a named-model spec reds (the mis-bind-no-op guard).
- S4 the `prefix` field is DECIDED (ruling 9): present with a ≥2nd consumer, OR absent — a 1-consumer `prefix` survivor reds (the ≥2-consumer law self-applied, mirroring G9).
- S5 the migrated spec-sheet set clears ≥70% MEAN as-data with no page <60% (ruling 9); zero page-specific quirk field (a quirk-field page goes `bespoke`).
- Self-test bites: a planted closure in the schema reds S1; a planted bare-modelValue named-model spec reds S3; a synthetic 1-consumer `prefix` reds S4; a planted quirk field reds S5.

## π/DELTA

- **Visual parity of the migrated pages** — `forms/inputs-data` + `display/badge-data` render byte-visually-identical to their SFC originals (the ratio-measure captures: forms/inputs state {plain/searchTerm/pillBare/errored/withLabel} verified live, badge 130-vs-132 distinct colors), Chrome + real-Safari, both modes. The renderer is compositor-neutral (no new motion) — parity, not a new paint.

## Obligations

- **STABLE-Safari** (SAF-1 law): the migrated pages render on real Safari.app (not Playwright-WebKit) — the schema mechanisms are Baseline, but the parity is Chromium-measured at pass-4.
- **data/table quirk-watch**: the one page most likely to introduce a per-page quirk field (tabular rows/cols as manifest data); a page that needs one goes bespoke — the architecture survives, the generality is 2-page-thin (forms+badge) until table + alert + select land.
- **G8 blast-radius** is carried jointly with W-SPECIMEN-FRAME (the StorySection swap shifts DOM); no separate probe here.

## Dispositions

- Discharges the "codified meta-component system, is this not extant?" half of **UF-F2** (the shrink-title half is W-SHRINK-HERO). WS4-13 ("every page standardized") advances jointly with W-AFFORDANCE.
