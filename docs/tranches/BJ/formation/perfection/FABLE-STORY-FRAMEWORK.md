# FABLE — the perfected story meta-framework (BJ family D / A06)

**Seat:** Fable perfection seat. **Mode:** TRANCHE DEVELOPMENT — this file DEVELOPS the
perfected design + amendments only; it touches nothing in `src/` or `demo/`, lands no commit.
**Supersedes-in-part:** `docs/tranches/BJ/waves/BAND-STORY.md` (DRAFT) — the numbered amendments
in §7 are appendable to that band verbatim; where they conflict with the draft, this seat's read
wins on the evidence cited.
**HEAD (re-verified on disk):** `git describe = v7.0.0-8-g55efea32`, `package.json 7.0.0`. The
BAND-STORY draft pins `v6.0.0-62`; every born-RED probe below was re-run at THIS head and still
reds (the story chassis did not move under the 7.0.0 tag). Re-pin the band header at execution.
**Read in full for this seat:** BAND-STORY.md; VISUAL-GESTALT families 1/2/3/7; REGISTRY families
C/D + Round-3a/3b folds; ASSEMBLY-CROSSWALK; IOS27-CODEX laws 4/10/11; FEEDBACK-LEDGER
F01/F02/F03/F09/F10/F11/F12/F15/F17/F29/F30/F31/F41/F43/F44/F46 + A06/A17 with the on-disk
screenshots; and the LIVE demo chassis (`demo/chassis/**`, `demo/stories/manifest.ts`,
`demo/stories/**/_frame/*`, `src/components/configurator/**`).

The register is plain and evidence-cited. Every structural claim below carries a `file:line`.

---

## 1. The page taxonomy, perfected — SIX types, not seven

The draft names seven page types (`spec | studio | dock | family | scene | landing | doc`,
BAND-STORY:70). Reading the real chassis, seven is one too many and one too coarse. The perfected
taxonomy is **six**, derived from the anatomies that actually exist on disk — the discriminant is
LAYOUT, and two of the draft's seven are not distinct layouts:

| # | type | route shape | count | the real anatomy on disk | draft delta |
|---|------|-------------|-------|--------------------------|-------------|
| 1 | **`landing`** | `/` (D0 catalog) + `/<cat>` (D1 section) | 1 + 11 | `CatalogLanding.vue` / `SectionLanding.vue` — a `StoryHero` over a `SectionPreviewCard` bento | **catalog folds in** — the draft's 7 omit the root home entirely; it is a `landing` at depth D0, not a new type. `depth` (D0 vs D1) is the sub-axis, not a second type. |
| 2 | **`spec`** | `/<cat>/<id>` (content) | ~66 | `StoryPage` `variant="page"` — header + stacked `StorySection` specimens (`StoryPage.vue:57-80`) | **`doc` folds in** — a "doc" (foundations tokens, prose) is a `spec` page whose specimens are prose/token-ladders. Same header + `StorySection` stack, no distinct layout. Seven → six. |
| 3 | **`studio`** | `/<cat>/<id>` (viz + controls) | ~9 | `VizStudio.vue` → `StoryPage > StorySection > Configurator` (stage-left, controls-right) | **substrate-showcase ∪ configurator-page = ONE type.** The prompt lists them separately; on disk they are the SAME `VizStudio` frame differing only in stage payload (a GL canvas vs a non-GL specimen). Do not fork two variants. |
| 4 | **`family`** | `/<cat>/<id>` (N members) | ~5 | `FamilyTabs.vue` — `SegmentedTabs` switcher + `provide(STORY_NESTED_KEY)` bare members | kept as-is. |
| 5 | **`dock`** | `/dock/<id>` | ~8 | `DockStage.vue` — one shared `<Aurora>` field behind a scrolled demo column | kept as-is. |
| 6 | **`scene`** | `/compositions/<id>` (full-bleed) | 0–6 | `StoryHero` full-bleed real scene (auth-shell) | **CONTINGENT** — minted ONLY if any composition survives `ASK-REDUCTION` D1. If compositions prunes, the taxonomy is FIVE (`landing·spec·studio·family·dock`) and `scene` MUST NOT be minted (an empty type is the overgrowth the wave's own KISS clause forbids). |

**The headline reform:** the axis is `pageType`, and `hero: boolean` (`StoryPage.vue:32`) is deleted
as the axis — it becomes one property of a variant (a `landing`/`studio`/`scene` is hero-register; a
`spec`/`family` is content-register). `doc` and the standalone `catalog` are not layouts, so they are
not types. `substrate-showcase` and `configurator-page` are the same layout, so they are one type.
Six types, each a real anatomy, a table you can read (KISS satisfied — one map, one `<component :is>`).

One-line taxonomy: **`landing`(D0 catalog + D1 section) · `spec`(default content, subsumes doc) ·
`studio`(substrate ∪ configurator) · `family` · `dock` · `scene`(contingent on compositions).**

---

## 2. The anatomy of each page type — regions · hierarchy · radius roles · copy slots

The chassis already supplies the regions; the perfected design NAMES the register per region so a
variant is a filled-in table, not a vibe. Radius roles cite IOS27-CODEX law 4 (concentric, card
never nests in pill). Type rungs cite law 10 (bold hero ≫ semibold title ≫ grey secondary ≫
caption, NO mono ALL-CAPS jargon).

### 2.1 `landing` (catalog D0 + section D1)
- **Regions:** hero cluster (`StoryHero` title + one-line blurb) → `SectionPreviewCard` bento.
- **Hierarchy:** title at `heroScale` = `mega`/`audacious` (D0 catalog) or `hero` (D1 section) —
  the LARGEST rung on the site, out-sizing every page beneath it. Card titles at `text-subheading`,
  card blurbs at `text-small text-muted`.
- **Radius:** the hero bleed uses `--radius-card` (`story-hero.css:20`); each preview card
  `rounded-card`; the inner preview well is concentric — `calc(var(--radius-card) - 0.75rem)`
  (`SectionPreviewCard.vue:87`). One card, ONE media region (see AMEND-D-5 — today it is two
  nested bordered surfaces).
- **Copy slots:** category/section title, one honest one-line blurb, per-card the story title +
  its blurb. No mechanics. The `CATEGORIES` mono-caps eyebrow (F01 image) is DELETED.

### 2.2 `spec` (the default content story — the dominant type)
- **Regions:** `StoryHeader` (h1 = semantic `title`, one-line lede) → a stack of `StorySection`
  cels (`StoryPage.vue:69-80`) → OPTIONAL one code-context snippet (AMEND-D-9).
- **Hierarchy (the F10 cure at the STORY level):** h1 chrome title (`--type-display-1`,
  `story-hero.css:108`) ≫ section heading ≫ specimen state-caption ≫ grey descriptor. The section
  heading must NOT be pinned to the smallest rung — today `StorySection.vue:32` hardcodes EVERY
  heading to `text-subheading`, so all ~66 spec pages read two-level flat. Give `StorySection` a
  `level` axis (§4).
- **Radius:** specimen cards `rounded-card`; controls inside them read the role scale (family F);
  no bespoke radii.
- **Copy slots:** title, lede (what it IS + when to reach for it), per-section a plain-language
  heading + optional one-line purpose, per-specimen an honest state label (`Default`/`Disabled`/
  `Invalid`). NO `--dock-t`/`useDockSpring`/`.dock-face-content`-class prose (F03).
- **Prose sub-form (the old `doc`):** a token/foundations page is a `spec` whose specimens are
  `TokenLadder`/swatch grids + prose paragraphs. `StoryBody` (`:body=`, 3 consumers) is the
  DATA renderer for the repeated-specimen shape — KEPT as the `spec` renderer, expanded where a
  page is pure specimen-grid, retired only where a page is genuinely bespoke (resolves OPEN-D2).

### 2.3 `studio` (substrate showcase ∪ configurator page)
- **Regions:** `StoryPage > StorySection(heading/blurb) > Configurator{ #stage, #controls, #presets?,
  #footer? }` (`VizStudio.vue:72-117`) → notes/gallery below.
- **Hierarchy:** ONE h1 (the page title) — NOT the h1 + the VizStudio `StorySection` h2 of the same
  string (the duplication at `VizStudio.vue:73`, census W-3). The Configurator's own register
  (`.configurator-section-label` = subheading/600, `sizing-config.css:35`) sits BELOW the page
  heading.
- **Radius:** the Configurator root is `--radius-panel` (`Configurator.vue:211`) — a CARD, not a
  pill; sections derive concentric card radius `max(floor, ctx − inset)` (`styles.css:109`). This
  is already correct at HEAD (see AMEND-D-7).
- **Copy slots:** title, one descriptor, control labels that name the AXIS (`Harmony`, `Energy`,
  `Stops`) not the mechanism. The stage is paint; the controls teach.

### 2.4 `family`
- **Regions:** `SegmentedTabs variant="underline"` switcher (paper ink material) → the active
  member's bare `StoryPage` body (`FamilyTabs.vue:56-74`).
- **Hierarchy:** the family page owns the ONE identity header; members contribute section bodies
  only (`STORY_NESTED_KEY`, `FamilyTabs.vue:40`). No per-member second h1.
- **Copy slots:** family title, one descriptor, member tab labels (the member names).

### 2.5 `dock`
- **Regions:** `DockStage` — one shared `<Aurora>` field (`DockStage.vue:126`) behind a
  `flex-col gap` column of dock specimens.
- **Hierarchy / copy:** per-demo `StorySection` heading + one-line purpose. THIS is F03's worst
  offender ("Controlled — no rail" / "Mechanics" with `<DockCrossfade :active>`, `--dock-t`,
  `useDockSpring`, `.dock-face-content` — the F03 image is a dock page). The copy canon (§5) strips
  the mechanics; the demo shows the dock, it does not narrate its springs.

### 2.6 `scene` (contingent)
- **Regions:** full-bleed `StoryHero` real scene (`data-full-bleed`, `story-hero.css:23`).
- **Copy slots:** the scene's own honest chrome — NO fabricated credentials (F43: SOC 2 / 12k
  teams, `auth-shell.vue:40-42`), NO marketing fluff ("someone actually cared — because someone
  did", F43 image). If compositions prunes, this type is not minted.

---

## 3. The tile ladder — the mechanism is SOUND; the reform is AUTHORSHIP, not liveness

The R3a fold already cleared F02 as "not a paint defect — the deliberate identity-fallback rung"
(REGISTRY:291). Reading `storyTile.ts` confirms the ladder is well-designed and must be KEPT:

```
authored (.tile.vue)  →  still (viz raster, 0-GL data-URI)  →  identity (typographic floor)
storyTile.ts:42-50
```

The ladder mounts **0 GL contexts on the landing by construction** (`storyTile.ts:22-24`;
`vizPreviewStill.ts:4-9` rasters a device-free Canvas2D `data:` URI, memoized). This is correct and
must not be undone.

**The defect the census read as "blank cards" is AUTHORSHIP COVERAGE:** only **4** `.tile.vue`
files exist across the whole demo — `display/buttons`, `display/card`, `forms/inputs`,
`dock/overview`. Every other story falls to `still` (7 substrate routes) or `identity` (the
typographic floor). The F46 image proves it exactly: Forms shows the `inputs.tile.vue` (Ada Lovelace
input pills), Dock shows the `overview.tile.vue` (mini dock), and Dialog/Tabs/Table/Alert/Spring
Orchestrator/Auth Shell are empty identity slabs — 6 of 8 vacant, which is the 4/88 coverage number
made visible.

**Two authorship bugs compound it:**
1. `CatalogLanding.vue:7-9,40` BYPASSES the ladder — it hands `identityTile(category)` directly, so
   the root home is ALWAYS identity slabs (never authored, never still), regardless of coverage.
   It must route through `resolveStoryTile` like `SectionLanding` does (`SectionLanding.vue:16-18`).
2. `SectionPreviewCard.vue:35-54` renders the tile inside a SECOND bordered, rounded, inset-shadowed
   well nested in the card — the F46 "TWO layers of cards" is STRUCTURAL in this component, not an
   intro-page-only mount (resolves OPEN-D7).

**The perfected preview-card model (F01/F46/A17):**
- **Author a `.tile.vue` for every category's HEADLINE story** (the first story of each of the 11
  categories) and every landing lead — a bounded, inert, 0-GL vignette of the headline component.
  Coverage target: the catalog bento (11 cards) and each section landing's lead card resolve
  `authored` or `still`, never `identity`. The identity floor stays as the terminal for deep
  D3 subs only.
- **Route the catalog through the ladder** (delete the `identityTile` bypass).
- **Masonry / varied size** via native CSS columns or grid-auto (no JS lib) — the lead card already
  spans two columns (`SectionPreviewCard.vue` `lead && 'sm:col-span-2'`); extend to ≥2 distinct
  card sizes.
- **One card, one media region** — the inner preview bleeds to the card's inner edge (drop the
  second border + inset ring on `.section-preview-card-preview`), so it reads as a card WITH a
  thumbnail, not a card-in-card.
- **NEVER a live loop per card.** The draft's Wave-5 line "render a LIVE miniature … a real, cheap
  render" (BAND-STORY:374) is WRONG and contradicts the ladder's own 0-GL contract and the R3b
  finding that live fields already burn ~40k RunTasks at idle (REGISTRY:322-326). The "live" read
  comes from an AUTHORED CSS/DOM vignette or a frozen still — a parked frame, not a context. Fix
  the draft's language (AMEND-D-4).

---

## 4. The configurator standard — ADOPT the built standard; widen the ladder; rule F11

Reading `src/components/configurator/**`, the configurator standard the draft proposes to BUILD is
**largely already shipped**. The perfected wave is adopt-and-tune, not build:

| draft claim | on-disk reality | perfected verdict |
|-------------|-----------------|-------------------|
| F09 container over-rounded (ovoid) | root is `--radius-panel` (`Configurator.vue:211`); sections derive concentric card radius `max(floor, ctx − inset)` (`styles.css:109`) | **REMEDIATED at HEAD** — convert G-CFG-4 to a REGRESSION-GUARD. The residual F09 (the ANALOGOUS/COMPLEMENT/TRIAD/MONO pills in the F09 image) is INNER toggle-button radius = a radius-role question (family F), not the container. (AMEND-D-7) |
| F10 flat header/field hierarchy | `.configurator-section-label` = `--type-subheading` 20.4px/600 (`sizing-config.css:35`); field labels = `text-small`/semibold | **PARTLY cured but STILL flat** — the section rung (20.4px) and field rung (~14-16px) are too CLOSE, and both equal `StorySection`'s `text-subheading`. The real cure is a WIDER ladder: section title → `text-heading`, field label → `text-small`, value → `text-caption`, and give `StorySection` a `level` axis so story sections aren't all `text-subheading` (`StorySection.vue:32`). (AMEND-D-2) |
| F11 gap between items | `--configurator-section-gap: 0.5rem` applied via `.configurator-layer + .configurator-layer { margin-block-start }` (`styles.css:117`), NOT the token def at :25 | **the gap IS the defect** — the F11 image shows Color/Composition/Motion as gapped cards; they are sub-sections of ONE inspector and must read as ONE contiguous inset list (hairline dividers, gap=0). The gap survives only between genuinely separate groups (rare in one inspector). Probe the `:117` adjacent-sibling rule, not just `:25`. (AMEND-D-3) |
| F29 springs no configurator | `grep Configurator demo/stories/motion/springs.vue` → 0; springs hand-rolls sliders (`springs.vue:224-337`) | **stands** — springs adopts the `studio` variant. |
| F31 curve-gallery void + modularize | `EasingConfigurator`/`EasingPicker` ARE modular src components (`src/components/easing/`), consumed at `curve-gallery.vue:195`; the void is the curve STAGE over-height (F31 image: curve fills top ~60%, empty bottom) | **modularization already done** — reframe G-CFG-5 to the layout-void fix (cap the stage min-height) + configurator adoption, NOT a new modularization. (AMEND-D-8) |

**The configurator standard, stated once:** one material envelope (`--radius-panel` card), sections
as concentric card-radius grouped lists with hairline-divided rows and gap=0 within an inspector, a
three-rung ladder (section `text-heading` ≫ field `text-small` ≫ value `text-caption`, weight from
SIZE not a mono stamp), controls-right on desktop / stacked on mobile (`styles.css:186-232`). Every
studio consumes it via `VizStudio` (`VizStudio.vue:80`); springs and curve-gallery adopt it; no
second configurator is forked.

---

## 5. The copy canon — the verdict

**What a `spec`/`studio`/`family`/`dock` page MAY say (the allow-list):**
1. A plain-language **title** (the component's name).
2. A one-line **lede** — what it IS and when to reach for it.
3. Per section: a plain **heading** + an optional one-line **purpose**.
4. Per specimen: an honest **state label** (`Default` · `Disabled` · `Invalid` · `Selected`).
5. The **live demo** itself.
6. ONE **code-context snippet** — user-facing usage (import + minimal use), governed by §5.1.

**What it MAY NOT say (the ban-list — all present at HEAD, born-RED):**
- **Implementation mechanics in prose:** internal token names (`--dock-t`, `--dock-morph-t`),
  composable names (`useDockSpring`), CSS class names (`.dock-face-content`), algorithm jargon
  (`se-guard`, `box-mode hull`, `aria-hidden SVG overlay`, `stroke-dashoffset sweep`,
  `reactive query`, `@property motion tokens`). Sites: `handmark.vue:26,67,117-120`; `search.vue:492`;
  `manifest.ts:932` (completion-seal); the entire F03 dock "Mechanics" section.
- **Fabricated credentials** (F43): `auth-shell.vue:40-42` — `SOC 2 Type II`, `End-to-end
  encrypted`, `Trusted by 12k teams`. NEVER ship a fake credential in a demo. Delete the trust-badge
  row or replace with honest neutral placeholders.
- **Marketing fluff:** "a design system that looks like someone actually cared — because someone
  did" (F43 image). Levity survives (feedback_writing_style); marketing copy does not.
- **Out-of-place install strings as demo CONTENT** (F41): `typewriter.vue:103`
  `text="npm install @mkbabb/glass-ui"` — the Typewriter member surfaced on `/motion/text-motion`
  types this, and the user read it as "wtf is this npm install bit?". Resolves OPEN-D3. Fix: a
  neutral demo string that shows the typewriter effect without reading as a stray CTA.
- **Mono ALL-CAPS jargon eyebrows** (law 10): the decorative `text-mono-caption`/`section-label`/
  `text-admin-label` idiom on 65 of 128 story files.

**The mono-caption idiom's fate — RETIRED as decoration; RESERVED to two roles.** The mono/caps
register survives ONLY as (a) the ONE structural breadcrumb `StorySection.label` (`StorySection.vue:29`),
rendered as a short place-name (≤3 words, a category not a jargon phrase), and (b) real code
tokens/snippets (§5.1). Everywhere else it is deleted; sections get hierarchy from the type ladder
(§4), not a monospace caps stamp. The `@utility` DEFINITIONS are NOT retired here (killing the def
strands 224 refs) — Wave 2 sweeps the demo call-sites, family F owns the def disposition (OPEN-D4
stands, leaning keep-for-the-one-role).

**§5.1 the code-context ruling (A06's "code-context views").** A06 explicitly asks to standardize
"code-context views", and the primitive EXISTS (`chassis/code/Code.vue`, `CodeBlock.vue`, the "ONE
demo code register") but has NO taxonomy home — only 3 stories consume it and there is no standard
`StoryPage` code slot. The perfected framework gives `spec`/`studio` an OPTIONAL code-context region
that shows USER-FACING usage (import + minimal use of the public API), NOT the F03 internal-token
dump. Code register = how you USE it, never how it's BUILT. (AMEND-D-9.)

**Copy-canon verdict, one line:** a page may name itself, say what it is and when to use it, label
its specimens' states, and show ONE usage snippet — nothing about how it is built; the decorative
mono-caps eyebrow is retired, reserved only to the single breadcrumb label and to real code.

---

## 6. The house voice — decided, per page type

Codex law 11 offers an "editorial serif-display + mono-eyebrow" voice as a DELIBERATE identity
beyond SF-cloning (IOS27-CODEX:54). Law 10 forbids mono ALL-CAPS jargon. These are reconciled by
DECIDING where each voice lives, not spreading a vibe:

- **The demo's own register is SF-clean, everywhere.** Plus Jakarta Sans display for hero/section
  titles (`--font-display`, the published brand face), Jakarta body for prose, Fira Code mono
  reserved to code + the one breadcrumb label. This is the voice of `landing`, `spec`, `studio`,
  `family`, `dock` — five of six types, no exceptions.
- **The editorial serif/mono voice is a SHIPPED MODE, demonstrated on exactly ONE page** — a
  foundations "house voices" specimen (or a surviving `scene` data-story). It is CONTENT the
  library offers (a register a consumer can opt into), not the chrome of every demo page. One
  decided exemplar, not a texture sprayed across sections.

So the rule is: **one register per page type — SF-clean for all six; the editorial voice appears as
demonstrated content on a single exemplar page, never as page chrome.**

---

## 7. Numbered amendments to BAND-STORY (appendable verbatim)

> **AMEND-D-1 (taxonomy 7 → 6).** Replace the seven-type list in `BJ.W-STORY-TAXONOMY`
> (`spec|studio|dock|family|scene|landing|doc`, BAND-STORY:70) with SIX:
> `landing · spec · studio · family · dock · scene(contingent)`. `doc` folds into `spec` (a
> prose/token page is a `spec` with prose specimens — no distinct layout). `landing` covers BOTH
> the D0 catalog home (`CatalogLanding.vue`, which the draft's 7 omit entirely) and the D1 section
> landing (`SectionLanding.vue`), discriminated by `depth`, not a separate type. `substrate-showcase`
> and `configurator-page` are the SAME `studio` anatomy (`VizStudio.vue`) — do not fork two variants.
> `scene` is minted only if `ASK-REDUCTION` D1 keeps a composition; else the taxonomy is FIVE.

> **AMEND-D-2 (configurator standard = ADOPT, not BUILD).** The src `<Configurator>` already ships
> the card radius (`Configurator.vue:211` `--radius-panel`; `styles.css:109` concentric relay), the
> section register (`sizing-config.css:35` `--configurator-section-size`), and grouped-list grammar.
> Reframe `BJ.W-CONFIGURATOR-STD` from "build the standard" to: (a) regression-guard the built
> standard, (b) WIDEN the section↔field ladder (both sit near `subheading` today — F10 stays flat),
> (c) give `StorySection` a `level` axis so story sections aren't all `text-subheading`
> (`StorySection.vue:32`), (d) adopt on springs (F29) + curve-gallery (F31).

> **AMEND-D-3 (F11 target + verdict).** The F11 born-RED site is the adjacent-sibling rule
> `.configurator-layer + .configurator-layer { margin-block-start: var(--configurator-section-gap) }`
> at `styles.css:117`, not only the token def at `:25`. Verdict: the sub-sections of ONE inspector
> (Color/Composition/Motion in the F11 image) read as ONE contiguous inset grouped list — hairline
> dividers, inter-row gap = 0. The gap survives only between genuinely separate groups.

> **AMEND-D-4 (tile ladder — authorship, not liveness).** The `authored → still → identity` ladder
> (`storyTile.ts:42-50`) is SOUND and KEPT; it mounts 0 GL contexts by construction. Strike the
> Wave-5 "render a LIVE miniature … a real, cheap render" line (BAND-STORY:374) — it contradicts the
> ladder's 0-GL contract and R3b's idle-rAF finding. The reform is: author a `.tile.vue` for every
> category headline + landing lead (coverage 4/88 → catalog-bento + landing-leads never `identity`),
> and route `CatalogLanding` THROUGH `resolveStoryTile` (it bypasses the ladder with a direct
> `identityTile(category)`, `CatalogLanding.vue:7-9,40`). Never a live loop per card.

> **AMEND-D-5 (F46 double-card is structural — resolves OPEN-D7).** The "TWO layers of cards" is
> inherent to `SectionPreviewCard.vue:35-54`: the outer `rounded-card border` wraps a SECOND
> bordered, rounded, inset-shadowed `.section-preview-card-preview` well. Cure: the inner media
> region bleeds to the card's inner edge (drop the second border + inset ring), one card + one
> thumbnail. Not an intro-page-only mount.

> **AMEND-D-6 (F41 site resolved — closes OPEN-D3).** The npm-install string is
> `typewriter.vue:103` `text="npm install @mkbabb/glass-ui"`, surfaced on `/motion/text-motion` via
> the FamilyTabs typewriter member. Fix: a neutral demo string.

> **AMEND-D-7 (F09 remediated → regression-guard).** The Configurator container radius is already
> card grammar (`Configurator.vue:211`); convert `G-CFG-4` to a regression-guard. The residual F09
> (inner ANALOGOUS/COMPLEMENT/TRIAD/MONO pills, F09 image) is toggle-button radius — a family-F
> radius-role item, not the configurator container. Removes the OPEN-D5 ambiguity.

> **AMEND-D-8 (F31 already modular).** `EasingConfigurator`/`EasingPicker` are modular src
> components (`src/components/easing/`, consumed `curve-gallery.vue:195`). Reframe `G-CFG-5` to the
> curve-stage layout-void fix (the over-tall stage, F31 image) + configurator adoption; drop the
> "modularize the easing-curve component" framing.

> **AMEND-D-9 (code-context region — new scope for A06).** A06 names "code-context views"; the
> `chassis/code` register exists (3 consumers) with no taxonomy home. Add an OPTIONAL code-context
> region to the `spec`/`studio` anatomy showing USER-FACING usage (import + minimal use), governed
> by the copy canon (§5.1) — never the F03 internal-token dump. Assign to Wave 1 (taxonomy defines
> the region) + Wave 2 (canon governs the content).

> **AMEND-D-10 (landing hero-scale — extend to the catalog).** Confirm the draft's AMEND-1
> (`heroScale` field is live at `StoryPage.vue:30`); the fix is the data-bind on the landings, not a
> field retire. Extend W-2's scope: `CatalogLanding.vue:26` ALSO hardcodes `hero-scale="4"` while
> the catalog is the D0 root and should read `mega`/`audacious`. Both `SectionLanding.vue:29` and
> `CatalogLanding.vue:26` bind to the descriptor's `heroScale` (`sectionLanding()` sets `"hero"`,
> `manifest.ts:300`).

> **AMEND-D-11 (StoryBody = the `spec` renderer — resolves OPEN-D2).** `StoryBody` (`:body=`, 3
> consumers: `select`/`alert`/`badge`) is KEPT as the `spec` variant's data renderer for the
> repeated-specimen shape; expand adoption where a page is pure specimen-grid, retire only where a
> page is genuinely bespoke. Not a family-C overfit retire.

---

## 8. Perfection check — findings the census missed (file:line evidence)

1. **The taxonomy omits the root catalog entirely.** The draft's 7 types have no home for `/`
   (`CatalogLanding.vue`), which is a distinct anatomy (category bento, not story bento). It is a
   D0 `landing` — the taxonomy must name it or it renders un-typed. (`router.ts:19-27`,
   `CatalogLanding.vue:12-45`.)

2. **`CatalogLanding` bypasses the tile ladder.** It hands `identityTile(category)` directly
   (`CatalogLanding.vue:7-9,40`) instead of `resolveStoryTile`, so the root home is ALWAYS identity
   slabs regardless of authored-tile coverage — the single biggest reason the front door reads
   blank (F01/F46). The census attributed the vacancy to coverage alone.

3. **The configurator standard is ~80% already shipped.** `styles.css:109` (concentric card radius),
   `sizing-config.css:35` (section register), `styles.css:117` (grouped-list gap grammar) all exist.
   The draft frames W-CONFIGURATOR-STD as a build; it is an adopt + a ladder-widen. Writing born-RED
   values against "no standard exists" would mis-fire.

4. **F10 is a TWO-level defect, not one.** The census pins F10 to `StorySection.vue:32`
   (`text-subheading` flattening). But the F10 image is the src Configurator, whose section label
   (`--configurator-section-size` = subheading 20.4px, `sizing-config.css:35`) sits only ~4px above
   the field labels — the register EXISTS but the steps are too close. The cure is a wider ladder in
   BOTH the story chassis and the configurator, not just un-hardcoding `StorySection`.

5. **F31's component is already modularized.** `EasingConfigurator.vue`/`EasingPicker.vue` are real
   src components (`src/components/easing/`) consumed at `curve-gallery.vue:195`. The F31 ask
   "properly modularize the easing-curve component" is largely satisfied; the actual defect is the
   curve STAGE over-height (empty bottom, F31 image). A wave written to "modularize" would find
   nothing to do.

6. **F41's npm-install is a Typewriter demo string, not a blurb.** `typewriter.vue:103`
   `text="npm install @mkbabb/glass-ui"` (surfaced via FamilyTabs on `/motion/text-motion`). The
   census left OPEN-D3 unresolved ("not found by grep of text-motion.vue"); it is one directory over,
   in the member SFC.

7. **The double-card is structural in the shared component.** `SectionPreviewCard.vue:35-54,62-92`
   nests a second bordered/rounded/inset-shadowed preview well inside every card — F46's "TWO layers"
   is EVERY preview card, not the intro page (OPEN-D7 assumed it might be an intro-only mount).

8. **`--story-article-w` is genuinely undefined at HEAD.** `grep -rn story-article-w src demo` → one
   reference (`StoryPage.vue:51`), zero definitions; `story-hero.css:5` defines only
   `--story-page-max-inline: 72rem`. So `spec` articles compute `max-inline-size: none` (uncapped) —
   the census's W-1 claim holds at 7.0.0. (Collapse onto `--story-page-max-inline` per OPEN-D6 unless
   a genuinely narrower reading measure is wanted — leaning collapse, KISS.)

9. **No StorySection consumer overrides the heading level.** `grep -rl '#heading' demo/stories` → 0;
   90 files use `<StorySection`, 65 with `heading=`, all resolving to `text-subheading`
   (`StorySection.vue:32`). The flatness is total — there is not one page that reads three heading
   levels. The `level` axis (AMEND-D-2) is the load-bearing cure, not an optional nicety.

10. **F03 is systemic "Mechanics"-section prose, not isolated blurbs.** The F03 image is a dock
    crossfade page whose ENTIRE body is numbered implementation mechanics with inline code tokens
    (`<DockCrossfade :active>`, `opacity: var(--dock-t)`, `useDockSpring`, `.dock-face-content`).
    The census lists discrete blurb sites (handmark/search/manifest); the copy canon must also ban
    the "Mechanics" narration PATTERN and rule that inline `<code>` is for user-facing usage, not
    internal-token exposition.

---

## 9. Born-RED gate sketches (the framework's structural claims)

**G-PT-CONFORM (page-type conformance).**
- Born-RED: `grep -c pageType demo/stories/manifest.ts` → 0; no registry maps type → variant.
- GREEN: every `Story` carries `pageType ∈ {landing,spec,studio,family,dock[,scene]}`; a registry
  maps each to one variant component; a conformance unit asserts each route's rendered root matches
  its declared type (no route renders an un-typed ad-hoc wrapper); `hero:boolean` is deleted as the
  axis (`StoryPage.vue:32`).

**G-COPY-LINT (copy-canon ban-list).**
- Born-RED: a grep over `demo/stories/**` finds, in `blurb=`/`label=`/prose, (a) internal refs
  `--[a-z][a-z-]+` / `use[A-Z]\w+` / `\.[a-z-]+-content`; (b) `SOC 2|End-to-end encrypted|12k teams`
  (`auth-shell.vue:40-42`); (c) the decorative mono-caps idiom on 65 files; (d)
  `npm install @mkbabb/glass-ui` (`typewriter.vue:103`) — all present.
- GREEN: 0 mechanics refs in user-facing copy; 0 fabricated credentials; the mono idiom only on the
  one reserved `StorySection.label` role; 0 stray install strings. (Enforced as a grep ban-list +
  the eyebrow-union count gate on the reserved role.)

**G-TILE-COVER (tile-ladder authorship coverage).**
- Born-RED: `find demo/stories -name '*.tile.vue' | wc -l` → 4; `CatalogLanding` calls
  `identityTile` directly (`CatalogLanding.vue:40`) — the catalog bento is 100% identity.
- GREEN: every category HEADLINE story + every landing lead resolves `authored` or `still` (never
  `identity`); `CatalogLanding` routes through `resolveStoryTile` (no direct `identityTile` bypass);
  an assertion counts identity-floor tiles on the catalog + each landing ≤ a threshold (0 on leads,
  identity permitted only on deep D3 subs).

**G-LADDER-3 (hierarchy reads ≥3 rungs).**
- Born-RED: `grep -rl '#heading' demo/stories` → 0; every `StorySection` heading is `text-subheading`
  (`StorySection.vue:32`); a page shows two type levels.
- GREEN: `StorySection` carries a `level` axis; a representative `spec` and a `studio` render ≥3
  distinct ladder rungs (title / heading / caption); DELTA vs the F10 image.

---

*End — Fable perfection seat, story meta-framework. One file, no `src/`/`demo/` edits, no commit.*
