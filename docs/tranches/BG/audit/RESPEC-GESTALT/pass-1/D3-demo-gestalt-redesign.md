# LENS D3 — the demo from first principles: the designed PRODUCT, not the spec-sheet index

**Date:** 2026-07-01 · **Branch:** `tranche/BG` · **HEAD:** `976dc890` · verified on disk.
**Scope:** `demo/stories/` (156 `.vue` pages, 11 categories) as a *designed artifact* — the IA, the
narrative arc, the page anatomy, the "earns a page" bar. Builds on `A-demo-arch.md` (the KISS/DRY forensic)
and diffs against the planned WS4 chassis-consolidate cluster + BH B3 demo-restructure.

## VERDICT

The demo is a **component inventory rendered as a spec-sheet index** — its page count tracks the *component
count*, not the count of *designed artifacts*. 156 pages resolve to only **101 distinct destinations** and
**118 subpath-mapped rows**; **8 subpaths are split across ≥2 pages** (dock×7, motion-core×4, timeline×3,
forms×3, toast×2, metric-badge×2, data-table×2, motion×2). `data/table` + `data/data-table` are two pages for
one `@mkbabb/glass-ui/data-table` (`manifest.ts:300-301`). Timeline is three pages for one component
(`:306-308`). The metric family is **six pages scattered across two categories**. Trivial atoms get full
standalone pages: `separator.vue` (79L, a rule between two paragraphs), `pulse.vue` (97L), `status-dot.vue`
(109L), `dark-mode-toggle.vue` (87L), `label.vue` (105L). This is the *literal* failure of this lens's bar —
"zero pages exist because the component exists" — and it is pervasive.

The category order is an inventory, not a journey: foundations → substrates → forms → display → containers →
navigation → dock → data → feedback → motion → compositions (`manifest.ts:482-1160`). The **material identity**
(substrates — the WebGL/WebGPU fields that ARE the wow) is buried at #2 and then abandoned; the **liquid-weight
motion identity** is #10; the **hero surface** (dock) is #7; and **compositions** — the *only* category that is
actually "designed scenes you would screenshot for Apple" — is dead last, is the thinnest count, and has **4 of
its 12 pages misfiled** (they are single-component demos, not compositions).

Crucially: **neither planned wave asks the first-principles question.** WS4 (`BG.W-DEMO-CHASSIS-CONSOLIDATE`,
`-MANIFEST-COLOCATE`, `-SPECIMEN-PER-STORY`, viz-studio-adopt) consolidates the *plumbing* — one framing
chassis, colocated route metadata, live specimens. BH B3 (δ5/δ6, `PLAN.md:82`) restructures *directories* —
manifest carve + glob migration + a **per-story-DIR move that CEMENTS the 156-page count** (each story gets its
own `<cat>/<id>/index.vue`). Both are correct KISS/DRY forensics; both entrench the sprawl. **No wave reduces
page count, re-orders the narrative, or defines an "earns a page" bar.** The demo restructure must be preceded
by a demo *re-design*, or B3 pours concrete around the disease.

---

## FINDINGS (ranked)

### F1 — CRITICAL: page count = component count; no "earns a page" bar exists

The demo has one page per *component export*, plus one per *config variant* of a few. The manifest proves it —
distinct subpaths (101) < story rows (156) because a fistful of components are fragmented, but the *dominant*
pattern is 1:1 (`manifest.ts:219-349`). Fragmentation clusters (subpaths mapped by >1 page):

- **`@mkbabb/glass-ui/data-table` ×2** — `data/table.vue` (150L) + `data/data-table.vue` (207L). Two pages,
  one component (`:300-301`).
- **`@mkbabb/glass-ui/timeline` ×3** — `data/timeline`, `data/timeline-segmented`, `data/timeline-continuous`
  (`:306-308`). Three pages for one timeline family.
- **metric family ×6 across TWO categories** — `display/metric-badge`, `display/metric-pill` (both →
  `metric-badge`, `:265-266`), `data/metric-cell`, `data/metric-stack` (`:312-313`). Split down the middle of
  the taxonomy.
- **`@mkbabb/glass-ui/toast` ×2** — `feedback/toast` + `feedback/toaster` (`:316-317`); `toaster.vue` is 65L,
  the thinnest page in the demo.
- **`@mkbabb/glass-ui/motion-core` ×4** — `motion/scroll-vt`, `motion/scroll-system`, `motion/split-chars`,
  `motion/reveal` (`:326,327,335,330`); the three scroll pages are one story.
- **`@mkbabb/glass-ui/forms` ×3** — `forms/inputs`, `forms/textarea`, `forms/combobox` (`:247-253`).

A page like `display/separator.vue` (`separator.vue:8-42`) is four `<StorySection>`s showing a rule between two
`<p>` tags. It exists solely because `Separator` is a component. Nobody screenshots it. Roughly **30-40 pages
collapse** into family showcases without losing a single specimen: the family page shows N members as
sections/tabs on ONE designed surface. The target is ~90-100 designed pages, not 156 inventory rows.

### F2 — MAJOR: no narrative arc — the category order is an inventory, not a designed journey

`CATEGORIES` order (`manifest.ts:482-1160`): foundations, substrates, forms, display, containers, navigation,
dock, data, feedback, motion, compositions. A designed product tells a story: **Foundations** (the tokens) →
**Material** (glass tiers + the procedural substrates — the identity moment) → **Elements** (the atoms) →
**Surfaces** (containers, overlays, dock) → **Motion** (the liquid-weight universal) → **Compositions** (the
payoff — everything composed). The current order scatters the identity: substrates is #2 (right instinct) but
then forms/display bury it; motion — the *entire liquid-weight design language* — is #10, after data and
feedback; dock — the flagship surface — is #7 between navigation and data. The demo never builds an argument;
it lists parts. The section-landing bento (`SectionLanding.vue`, `SectionPreviewCard.vue`) is well-built
(A-demo F10) but it decorates an inventory rather than narrating a system.

### F3 — MAJOR: compositions — the ONLY "screenshot-for-Apple" category — is buried, thin, and polluted

`demo/stories/compositions/` has 12 pages, but **4 are misfiled single-component demos** that map to a
component subpath, not a scene (`manifest.ts:343-348`): `configurator` → `/configurator`, `instrument-chassis`
→ `/instrument-chassis`, `labeled-field` → `/labeled-field`, `icon-tooltip` → `/icon-tooltip`. The true
designed scenes are only 8 (`hero`, `math-paper`, `auth-shell`, `settings`, `empty-states`,
`drawer-live-behind`, `form-validation`, `gate-pattern`). These are the artifacts that prove the *system* — a
dashboard, an auth shell, a settings app — and they are dead last, outnumbered by spec-sheets 148:8, and diluted
by 4 component demos wearing a composition costume. The one category that answers "what does the whole thing
look like" is the smallest and least prominent.

### F4 — MAJOR: trivial atoms get standalone pages the family page should absorb

Beyond F1's cross-page fragmentation, single-component pages that are pure spec-sheets (each < 110L, each a
family-row not a page): `separator` (79), `dark-mode-toggle` (87), `pulse` (97), `status-dot` (109), `label`
(105), `stacked-icons` (115), `scrolling-text` (111), `selectable-chip` (82), `toggle-chip` (100). These belong
as sections of a **Display atoms** page and a **Forms controls** page, respectively — one designed surface that
shows the whole atom set at once (the thing a designer actually wants to see), not nine sibling routes.

### F5 — MODERATE: the planned restructure entrenches the count instead of questioning it

WS4's demo cluster (`EXECUTION-PROGRESS.md:201-202`: `-DEMO-CHASSIS-CONSOLIDATE`, `-MANIFEST-COLOCATE`;
`:183` `-SPECIMEN-PER-STORY`) is a plumbing consolidation — delete dead DemoFrame/StorySectionHeader, one frame
chassis, colocate the 4 route maps. **None of it changes which pages exist.** BH B3 (`PLAN.md:77-84`) is a
directory restructure: δ5/δ6 splits `manifest.ts` per-category and migrates the glob to `./*/*/index.vue` — a
**per-story-directory move for all 156 stories** (`PLAN.md:82`, the "82-script/292-literal `/index.vue` edits").
That move makes each of the 156 spec-sheets a first-class directory, cementing the inventory as the physical
layout. The KISS guard ("a story stays FLAT unless it has colocated parts") mitigates directory contrivance but
does nothing about the 156-*page* count. **The IA re-design must land BEFORE B3**, or B3 restructures the wrong
set.

### F6 — MODERATE: substrates (the crown jewel) is 12 flat sibling rows, not a gallery + studios

Substrates is the demo's most valuable real estate — the live procedural fields are the identity. It is 12 flat
routes (`aurora`, `blob`, `constellation`, `fourier-field`, `dot-flow-field`, `concentric`, `paper-grid`,
`dot-matrix`, `goo-dot`, `glass-material`, `glass-panel`). A-demo F6 + WS4 viz-studio-adopt already catch the
*encapsulation* unevenness (aurora is the VizStudio exemplar; `blob.vue` 870L / `constellation.vue` 759L are
monoliths off-chassis). The first-principles point is upstream: this should be **ONE substrate gallery**
(a live-thumbnail wall — the wow moment, the page you screenshot) with the deep **studios reached from it**, all
on VizStudio — not 12 undifferentiated siblings where a hero field and a token-plate demo (`glass-panel`) rank
equal.

### F7 — MINOR: page anatomy has no "family" affordance, forcing the 1:1 split

The chassis (`StoryPage`/`StoryHero`/`ShowcaseFrame`) has a hero + a flat `<slot>` of `<StorySection>`s. It has
no *family-tab / member-switcher* register, so a component family with N members can only be shown as N sibling
routes (F1) or a long scroll of sections. The reason the metric family is 6 pages is partly that the chassis
offers no "one page, N members" primitive. Fixing the anatomy (a family-tab register on the ONE chassis)
*enables* the F1 collapse — it is the mechanism, not a cosmetic.

---

## FOLD CANDIDATES (for the BG/BH plan)

### C1 — NEW WAVE `BG.W-DEMO-IA-REDESIGN` (Fable-designed) — the first-principles information architecture
**Kind:** new-wave. **Sequence:** WS4, but **BEFORE `-MANIFEST-COLOCATE` and BEFORE BH B3 δ5/δ6** (it defines
the page set those two consume). **Gestalt approach:** define the target IA as a *designed product*, not a
consolidation of the existing one. (a) **Narrative arc** re-order: Foundations → Material (glass tiers +
substrate gallery) → Elements (atoms) → Surfaces (containers + overlays + dock) → Motion → Compositions. (b)
**Family-page collapse** — one page per component *family*, not per export: ONE data-table page (fold
table+data-table), ONE timeline page (fold ×3), ONE metric page (fold the ×6 into a metric showcase), ONE toast
page (fold toaster), ONE scroll page (fold scroll-vt/system/choreography), ONE input-family page
(inputs/textarea/combobox/select/multi-select as sections). (c) **Atom absorption** — separator, pulse,
status-dot, dark-mode-toggle, label, stacked-icons, scrolling-text become sections of Display-atoms /
Forms-controls, not routes. Target ~90-100 pages. Fable authors the target taxonomy + page list; DesignSync
surface = the section-landing bento + the new category order for card-based review.

### C2 — NEW GATE within C1: the "earns a page" bar (machine-checked)
**Kind:** amend-wave (rider on C1). **Gestalt approach:** a story row is a *standalone page* IFF one of: it is
a **composition scene** (a route-path subpath, not a component export), OR a **substrate studio**, OR a
component with ≥2 configurations a family-row section cannot show. Otherwise it is a **family-page section**.
Machine-check (`proof:demo-earns-page`): **no two story rows share a component subpath** unless that subpath is a
declared family (`dock`/`timeline`/`metric`/`forms` allowlist) — born-RED on today's 8 collisions
(`manifest.ts` dedup), GREEN when each collision is either a family page or collapsed. This is the durable
anti-regression that keeps "one component → one page" from re-accreting next tranche.

### C3 — AMEND `BG.W-MANIFEST-COLOCATE` + BH B3 δ5/δ6 to consume the reduced set
**Kind:** amend-wave. **Gestalt approach:** re-scope the manifest colocation and the per-story-dir move to the
**~90-100-page set from C1**, not the 156. Sequence hard-wires: C1 (IA re-design) → `-MANIFEST-COLOCATE` (fold
the 4 route maps onto the reduced rows) → B3 δ5/δ6 (dir carve of the reduced set). This removes ~50 directory
moves from B3 (fewer stories to re-home) and makes the manifest carve land the *right* taxonomy once.

### C4 — NEW WAVE `BG.W-COMPOSITIONS-PROMOTE` (Fable-designed) — the showpiece
**Kind:** new-wave. **Sequence:** after C1, in WS4. **Gestalt approach:** compositions is the "screenshot for
Apple" category — treat it as the product's cover. (a) **De-pollute** — move the 4 misfiled component demos
(`configurator`, `instrument-chassis`, `labeled-field`, `icon-tooltip`) OUT to their component family pages
(`manifest.ts:343-348`). (b) **Add real scenes** — 3-4 full designed compositions that exercise the *whole*
system (a data console, a media/now-playing surface, a settings app already partly present, a marketing hero)
— each a single artifact a consumer would screenshot. (c) **Promote** — surface a compositions gallery as (or
adjacent to) the landing, so the first thing seen is the system composed, not a token table. Fable authors each
scene; DesignSync surface = the composition cards.

### C5 — AMEND `BG.W-VIZ-STUDIO-ADOPT` → substrate gallery + studios (not 12 flat rows)
**Kind:** amend-wave (extends the existing viz-studio-adopt). **Gestalt approach:** re-frame substrates as ONE
**live-thumbnail gallery landing** (the crown-jewel wall — frozen `auroraFallbackGround`-style stills that come
alive on hover/route, one-GL-per-route budget preserved) + the deep **studios reached from it**, all on
VizStudio (the aurora exemplar). This subsumes the blob/constellation monolith split already in the wave and
adds the gallery-vs-flat-siblings IA fix. One live GL context on the gallery (the focused thumbnail) or none
(all stills) — never 11 contexts.

### C6 — AMEND WS4 chassis-consolidate: add the family-tab affordance to the ONE chassis
**Kind:** amend-wave (rider on `BG.W-DEMO-CHASSIS-CONSOLIDATE`). **Gestalt approach:** the surviving chassis
(`StoryPage` + `ShowcaseFrame`, after the dead DemoFrame/StorySectionHeader deletes A-demo F2/F3 already own)
gains ONE **family register** — a `<SegmentedTabs>`/section-switcher primitive that shows N family members on
one page. This is the *mechanism* that makes C1's collapse possible without long-scroll fatigue: the metric page
tabs {badge · pill · cell · stack}; the timeline page tabs {segmented · continuous}. It dogfoods the shipped
`SegmentedTabs` (the demo should use the library's own nav to navigate a family).

### C7 — PLAN-DOC-EDIT: encode the Fable design routing per the standing directive
**Kind:** plan-doc-edit. **Gestalt approach:** the 2026-07-01 directive routes ALL visual design work to Fable
via DesignSync. Every wave here that authors a page or re-orders the IA (C1, C4, C5, C6) names its **Fable design
arm** + its **DesignSync review surface** in the amended plan. The opus/sonnet fan-out does the mechanical
manifest carve, glob migration, and gate authoring (C2, C3); Fable does the taxonomy, the scenes, the gallery.
Record this split in `AMENDED-GESTALT-PLAN.md` so the demo bands cannot be mechanically built without a design
pass.

---

## Cross-refs
- **A-demo-arch** owns the plumbing (dead-chassis deletes F2/F3, one-frame F4, viz-studio-adopt F6, shell-dock
  DRY F8, manifest-colocate F9). D3 is the *layer above*: the plumbing is necessary but insufficient — a
  consolidated chassis rendering 156 spec-sheets is still a spec-sheet index. C1/C4/C5 are the design layer WS4
  is missing.
- **BH B3** (`PLAN.md:77-84`) must sequence *after* C1 — the restructure consumes the re-designed page set.
- **Standing directive (Fable routing)** binds C1/C4/C5/C6 to a Fable design arm (C7).
