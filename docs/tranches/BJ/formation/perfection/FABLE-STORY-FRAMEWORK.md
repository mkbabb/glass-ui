# FABLE — the perfected story meta-framework (BJ family D / A06)

**Seat:** Fable perfection seat. **Mode:** TRANCHE DEVELOPMENT — this file DEVELOPS the
perfected design + amendments only; it touches nothing in `src/` or `demo/`, lands no commit.
**Verified-model:** `claude-fable-5` (REFABLE seat RU-10). The prior draft of this file executed on
`claude-opus-4-8` via a config override.
**Union provenance:** rewritten in place 2026-07-17 as the RU-10 unioned canon — an ANEW pass from
primary sources first, then claim-by-claim scrutiny of the prior draft; fresh evidence authoritative
on conflict, prior content kept only where RATIFIED. Verdict sidecar:
`../refable/REFABLE-RU-10.md`. Sections and amendments carry stable IDs; deltas are marked
**CHANGED** / **NEW**.
**Supersedes-in-part:** `docs/tranches/BJ/waves/BAND-STORY.md` (DRAFT) — the numbered amendments
in §7 are appendable to that band verbatim; where they conflict with the draft, this seat's read
wins on the evidence cited. NOTE: BAND-STORY `G-COPY-2` cites this file by line (`:385-391`) — that
pin is stale after this rewrite and must re-anchor on §8 finding 10.
**HEAD (re-verified on disk):** `git describe = v7.0.0-49-g2a949abe`, `package.json 7.0.0`. The
story chassis did not move between the draft's `v7.0.0-8` pin and this head (BJ commits are
docs-only); every `file:line` below was re-verified at THIS head. Re-pin the band header at
execution.
**Read in full for this seat:** BAND-STORY.md; VISUAL-GESTALT families 1/2/3/7; REGISTRY families
C/D + Round-3a/3b folds; ASSEMBLY-CROSSWALK; IOS27-CODEX laws 4/10/11; FEEDBACK-LEDGER
F01/F02/F03/F05/F06/F07/F09/F10/F11/F12/F14/F15/F17/F29/F30/F31/F41/F43/F44/F46 + A06/A17 with the
on-disk screenshots; and the LIVE demo chassis (`demo/chassis/**`, `demo/stories/manifest.ts`,
`demo/stories/**/_frame/*`, `src/components/configurator/**`, `demo/router.ts`,
`src/styles/view-transition.css`).

The register is plain and evidence-cited. Every structural claim below carries a `file:line`.
Claims needing live paint are marked **LIVE-DEFER** (the demo server was down at union time; no
paint claim is guessed).

---

## 1. The page taxonomy, perfected — SIX types, not seven

The draft names seven page types (`spec | studio | dock | family | scene | landing | doc`,
BAND-STORY:70). Reading the real chassis, seven is one too many and one too coarse. The perfected
taxonomy is **six**, derived from the anatomies that actually exist on disk — the discriminant is
LAYOUT, and two of the draft's seven are not distinct layouts:

| # | type | route shape | count | the real anatomy on disk | draft delta |
|---|------|-------------|-------|--------------------------|-------------|
| 1 | **`landing`** | `/` (D0 catalog) + `/<cat>` (D1 section) | 1 + 11 | `CatalogLanding.vue` / `SectionLanding.vue` — a `StoryHero` over a `SectionPreviewCard` bento | **catalog folds in** — the catalog home is a `landing` at depth D0, not a new type; `depth` (D0 vs D1) is the sub-axis. **CHANGED:** the draft does NOT omit `/` entirely (BAND-STORY W-4/W-5 scope name `CatalogLanding.vue`); what the draft's TYPE LIST lacks is a typed home for it — the fold ruling stands, the "omitted entirely" framing is retracted. |
| 2 | **`spec`** | `/<cat>/<id>` (content) | ~66 | `StoryPage` `variant="page"` — header + stacked `StorySection` specimens (`StoryPage.vue:57-80`) | **`doc` folds in** — a "doc" (foundations tokens, prose) is a `spec` page whose specimens are prose/token-ladders. Same header + `StorySection` stack, no distinct layout. Seven → six. |
| 3 | **`studio`** | `/<cat>/<id>` (viz + controls) | **3 today → ~9 after adoption (CHANGED)** | `VizStudio.vue` → `StoryPage > StorySection > Configurator` (stage-left, controls-right) | **substrate-showcase ∪ configurator-page = ONE type.** On disk the frame has exactly 3 consumers (`substrates/aurora`, `substrates/blob`, `substrates/fourier-field`); ~9 is the POST-ADOPTION target (springs F29, curve-gallery F31, `containers/configurator`, further substrate candidates) — a born-RED value must count 3, not 9. Do not fork two variants. |
| 4 | **`family`** | `/<cat>/<id>` (N members) | 5 mounts | `FamilyTabs.vue` — `SegmentedTabs` switcher + `provide(STORY_NESTED_KEY)` bare members | kept. **CHANGED (nuance):** of the 5 real mounts (`forms/inputs`, `display/atoms`, `motion/text-motion`, `feedback/toast`, `foundations/paper-glass`), only the first three are page-root family collapses; `toast` and `paper-glass` mount FamilyTabs as an IN-PAGE section switcher. `family` is a page TYPE only when the switcher is the page body root; the in-section use is a section register, not a type. `timeline`/`scroll` mention FamilyTabs in comments only (retired) — never count them. |
| 5 | **`dock`** | `/dock/<id>` | 8 | `DockStage.vue` — one shared `<Aurora>` field behind a scrolled demo column | kept as-is. |
| 6 | **`scene`** | `/compositions/<id>` (full-bleed) | 0–6 | `StoryHero` full-bleed real scene (auth-shell) | **CONTINGENT** — minted ONLY if any composition survives `ASK-REDUCTION` D1. If compositions prunes, the taxonomy is FIVE (`landing·spec·studio·family·dock`) and `scene` MUST NOT be minted (an empty type is the overgrowth the wave's own KISS clause forbids). |

**The headline reform:** the axis is `pageType`, and `hero: boolean` (`StoryPage.vue:32`) is deleted
as the axis — it becomes one property of a variant (a `landing`/`studio`/`scene` is hero-register; a
`spec`/`family` is content-register). `doc` and the standalone `catalog` are not layouts, so they are
not types. `substrate-showcase` and `configurator-page` are the same layout, so they are one type.
Six types, each a real anatomy, a table you can read (KISS satisfied — one map, one `<component :is>`).

**NEW — one front door.** The taxonomy fold exposes a DUPLICATION the draft misses: the storybook has
TWO catalog pages. `/` renders the category bento (`CatalogLanding.vue:30-42`) and `/foundations/intro`
— the D0 hero story — renders a SECOND category bento of the same `SectionPreviewCard` cards
(`intro.vue:74-89`). Two front doors, one identity moment split in half (and the second one is the
F46 page). Ruling: ONE front door. Either `/` absorbs the intro's hero moment (wordmark + aurora) and
`foundations/intro` retires, or intro IS the front door and `/` redirects — decided at execution;
the amendment (D-17) mandates the collapse, not the winner.

One-line taxonomy: **`landing`(D0 catalog + D1 section) · `spec`(default content, subsumes doc) ·
`studio`(substrate ∪ configurator) · `family` · `dock` · `scene`(contingent on compositions).**

---

## 2. The anatomy of each page type — regions · hierarchy · radius roles · copy slots

The chassis already supplies the regions; the perfected design NAMES the register per region so a
variant is a filled-in table, not a vibe. Radius roles cite IOS27-CODEX law 4 (concentric, card
never nests in pill). Type rungs cite law 10 (bold hero ≫ semibold title ≫ grey secondary ≫
caption, NO mono ALL-CAPS jargon).

### 2.0 The page-frame token contract (NEW — the A06 "margins, padding" arm)

The frame is FOUR tokens, one owner (`story-hero.css:1-9`), consumed by every type — no page or
frame chassis hand-rolls its own rhythm:

| token | value at HEAD | role |
|-------|---------------|------|
| `--story-page-max-inline` | `72rem` | the hero/landing article measure (`StoryPage.vue:52`) |
| `--story-article-w` | **UNDEFINED** (`StoryPage.vue:51` references it; zero definitions — §8 finding 8) | the content-article measure — resolve per OPEN-D6: collapse onto `--story-page-max-inline` (leaning) or define the narrower measure; never leave the IACVT-uncapped state |
| `--story-page-section-gap` | `clamp(1.5rem, 3vw, 2.5rem)` | the ONE inter-section rhythm (`StoryPage.vue:72,99`; `StoryBodyRenderer` inherits it via `display: contents`, `StoryBodyRenderer.vue:255-263`) |
| `--story-page-header-gap` | `0.5rem` | the title→lede cluster gap (`story-hero.css:7`) |

**Drift to cure:** `DockStage.vue:193` hard-codes the demo-column `gap: 2.5rem` — the token's clamp
CEILING, so below desktop the dock band's rhythm silently diverges from every other page. The frame
chassis reads `var(--story-page-section-gap)` like the page it replaced claims to
(`DockStage.vue:186-187` says so in prose; the CSS doesn't). Hero padding
(`.story-hero-bleed-content`, `story-hero.css:53`) and the DockStage column padding
(`DockStage.vue:194`) both clamp independently — unify on one padding token at execution.

### 2.1 `landing` (catalog D0 + section D1)
- **Regions:** hero cluster (`StoryHero` title + one-line blurb) → `SectionPreviewCard` bento.
- **Hierarchy:** title at `heroScale` = `mega`/`audacious` (D0 catalog) or `hero` (D1 section) —
  the LARGEST rung on the site, out-sizing every page beneath it. Card titles at `text-subheading`,
  card blurbs at `text-small text-muted`. (Today BOTH landings hardcode `hero-scale="4"` — the
  SMALLEST rung; see AMEND-D-10.)
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
  string (the duplication at `VizStudio.vue:73`; `aurora.vue:122` passes `heading="Aurora"` under the
  "Aurora" h1 — re-verified). The Configurator's own register (`.configurator-section-label` =
  subheading/600, `styles.css:49-51` reading `--configurator-section-size`,
  `src/styles/tokens/sizing-config.css:35`) sits BELOW the page heading.
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
  teams, `auth-shell.vue:38-42`), NO marketing fluff ("someone actually cared — because someone
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
`dock/overview` (re-verified by `find`). Every other story falls to `still` (7 substrate routes) or
`identity` (the typographic floor). The F46 image proves it exactly: Forms shows the
`inputs.tile.vue` (Ada Lovelace input pills), Dock shows the `overview.tile.vue` (mini dock), and
Dialog/Tabs/Table/Alert/Spring Orchestrator/Auth Shell are empty identity slabs — 6 of 8 vacant,
which is the 4/88 coverage number made visible.

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
| F10 flat header/field hierarchy | `.configurator-section-label` = `--type-subheading` 20.4px/600 (`styles.css:49-51` + `src/styles/tokens/sizing-config.css:35`); field labels = `text-small`/semibold | **PARTLY cured but STILL flat** — the section rung (20.4px) and field rung (~14-16px) are too CLOSE, and both equal `StorySection`'s `text-subheading`. The real cure is a WIDER ladder: section title → `text-heading`, field label → `text-small`, value → `text-caption`, and give `StorySection` a `level` axis so story sections aren't all `text-subheading` (`StorySection.vue:32`). (AMEND-D-2) |
| F11 gap between items | `--configurator-section-gap` applied via `.configurator-layer + .configurator-layer { margin-block-start }` (`styles.css:117`), NOT only the token def | **the gap IS the defect** — the F11 image shows Color/Composition/Motion as gapped cards; they are sub-sections of ONE inspector and must read as ONE contiguous inset list (hairline dividers, gap=0). The gap survives only between genuinely separate groups (rare in one inspector). Probe the `:117` adjacent-sibling rule, not just the token def. (AMEND-D-3) |
| F29 springs no configurator | `grep Configurator demo/stories/motion/springs.vue` → 0 (re-verified); springs hand-rolls sliders | **stands** — springs adopts the `studio` variant. |
| F31 curve-gallery void + modularize | `EasingConfigurator`/`EasingPicker` ARE modular src components (`src/components/easing/`), consumed at `curve-gallery.vue:194-200`; the void is the curve STAGE over-height (F31 image: curve fills top ~60%, empty bottom) | **modularization already done** — reframe G-CFG-5 to the layout-void fix (cap the stage min-height) + configurator adoption, NOT a new modularization. (AMEND-D-8) |

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
  `reactive query`, `@property motion tokens`). Sites: `handmark.vue:26,67,115-120`; `search.vue:492`;
  `manifest.ts:932` (completion-seal); the entire F03 dock "Mechanics" section. All re-verified.
- **Fabricated credentials** (F43): `auth-shell.vue:38-42` — `SOC 2 Type II`, `End-to-end
  encrypted`, `Trusted by 12k teams`. NEVER ship a fake credential in a demo. Delete the trust-badge
  row or replace with honest neutral placeholders.
- **Marketing fluff:** "a design system that looks like someone actually cared — because someone
  did" (F43 image). Levity survives (feedback_writing_style); marketing copy does not.
- **Out-of-place install strings as demo CONTENT** (F41): `typewriter.vue:103`
  `text="npm install @mkbabb/glass-ui"` — the Typewriter member surfaced on `/motion/text-motion`
  types this, and the user read it as "wtf is this npm install bit?". Resolves OPEN-D3. Fix: a
  neutral demo string that shows the typewriter effect without reading as a stray CTA.
- **Mono ALL-CAPS jargon eyebrows** (law 10): the decorative `text-mono-caption`/`section-label`/
  `text-admin-label` idiom on 65 of 128 story files (re-verified: 65 matches / 128 SFCs).

**The mono-caption idiom's fate — RETIRED as decoration; RESERVED to two roles.** The mono/caps
register survives ONLY as (a) the ONE structural breadcrumb `StorySection.label` (`StorySection.vue:29`),
rendered as a short place-name (≤3 words, a category not a jargon phrase), and (b) real code
tokens/snippets (§5.1). Everywhere else it is deleted; sections get hierarchy from the type ladder
(§4), not a monospace caps stamp. The `@utility` DEFINITIONS are NOT retired here (killing the def
strands 224 refs) — Wave 2 sweeps the demo call-sites, family F owns the def disposition (OPEN-D4
stands, leaning keep-for-the-one-role).

**§5.1 the code-context ruling (A06's "code-context views").** A06 explicitly asks to standardize
"code-context views", and the primitive EXISTS (`chassis/code/Code.vue`, `CodeBlock.vue`, the "ONE
demo code register") but has NO taxonomy home — only 3 stories consume it (`containers/configurator`,
`display/card`, `feedback/toaster` — re-verified) and there is no standard `StoryPage` code slot.
The perfected framework gives `spec`/`studio` an OPTIONAL code-context region that shows USER-FACING
usage (import + minimal use of the public API), NOT the F03 internal-token dump. Code register = how
you USE it, never how it's BUILT. The existing contract is already right: copy affordance, 42rem
measure, lazy highlight as deferred COLOR never deferred content (`CodeBlock.vue:37-43,150-152`).
(AMEND-D-9.)

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

## 6b. The transition grammar (NEW — the edict's "expressive, animated page-to-page transitions"; F05/F06/F07)

The prior draft had NO transition section — F05/F06/F07 and the A06 "scrolling animations" arm were
unowned. The substrate on disk is already sound and singular; the reform is a typed GRAMMAR over it,
plus the dock-band cure.

**What exists (all verified at HEAD):**
- ONE route-mutation owner: `pushRoute()` wraps `router.push` in `startViewTransition(…, { types:
  ["route"] })` (`routeTransition.ts:5-13`), consumed by `TransitionRouteLink` and every
  `useStoryNavigation` move (`useStoryNavigation.ts:46-100`). Same-route pushes no-op.
- ONE motion recipe: `html:active-view-transition-type(route)` — old fades, new fades + rises 8px on
  `--spring-snappy` (`src/styles/view-transition.css:47-57,77-80`); callback-only Safari keeps the
  native root crossfade; PRM zeroes every VT animation (`:27-33`).
- ONE scroll/focus owner: the AppShell `route.path` watch resets `<main>` scroll, announces the
  title, and seats focus (`AppShell.vue:64-75`); lazy chunks pre-resolve in `beforeResolve` so the
  VT snapshot never captures an unresolved component (`router.ts:122-130`).

**The gap:** the typed API is minted with exactly ONE type. Every navigation — sibling story,
category jump, landing→story descend, back — plays the identical 8px rise. That is the F07 verdict
("should be better defined, more expressive") stated structurally.

**The typed grammar (the reform):** the `types` array is the semantic channel; mint FOUR, all riding
the existing spring tokens, all PRM-degrading to the crossfade:
1. `route-lateral` (+ a `-back` direction class) — sibling story within a category: a short
   horizontal glide (the pager idiom), direction from manifest order.
2. `route-descend` — landing→story: the tapped `SectionPreviewCard` is the shared element
   (`view-transition-name` stamped on tap; the machinery exists — `view-transition-class`,
   `view-transition.css:35-43`), the tile grows into the page hero. The reverse (`route-ascend`)
   shrinks back to the tile.
3. `route-jump` — cross-category jumps + dock/keyboard shortcuts: the current restrained rise.
4. The reduced/unsupported floor stays the instant swap — no second engine, no JS-animated fallback
   (no-masking-fallback).

**The dock-band cure (F06 — transitions between dock pages "broken, slow, flash").** The mechanism
visible in source: every dock route is `SELF_STAGES_GL` (`focal.ts:50-70`), so the shell field stays
down across the band, and EACH dock page mounts its OWN `DockStage` aurora on entry (`:key="route.path"`
atomic swap, `AppShell.vue:201-203`) — a fresh GL context boots per navigation while the VT snapshot
shows the pre-GL frame. The cure candidates, in order of KISS: (a) hoist ONE persistent dock-band
field (the DockStage aurora keyed on the BAND, not the route — sibling dock navs re-use the mounted
context, the same persistence trick the shell aurora already uses for non-focal navs,
`router.ts:109-117`); (b) failing that, paint the `auroraFallbackGround` palette ground from frame 0
so the snapshot is never blank. **LIVE-DEFER:** the flash itself and the cure's efficacy are paint
claims — the fix wave must capture before/after per the live-verify-capture rule; no paint behavior
is asserted here beyond what the source proves structurally.

---

## 6c. Entrance, scroll-animation, and per-type perf contract (NEW — A06 "intro, scrolling animations"; F05/A17/F01)

**Entrance register (F05 "improperly shifts the screen around"):** entrances are COMPOSITOR-ONLY —
opacity/transform via the existing registers (`.scroll-cascade`/`.scroll-cascade--columns`, the
`v-reveal` directive's `[data-reveal]` + `--d` stagger) — never a layout-affecting property, never a
demo-local `@keyframes` (the colors.vue precedent: static layout offsets compose WITH the transform
register, `colors.vue:53-57`). One entrance grammar per section kind; a page never invents one.
F05's second arm ("why does this section not have a background aurora") is already law — every route
resolves a field via `CATEGORY_DEFAULT_BG` (`manifest.ts:188-230`); the F05 page is a conformance
check at execution, not a new mechanism.

**Per-type perf contract (A17 — the slow-load/stutter class is a FRAMEWORK concern, one row per
type):**

| type | the contract |
|------|--------------|
| `landing` | 0 GL contexts (tile ladder, §3); above-fold cards EXEMPT from `content-visibility: auto` (the blank-19rem-box mechanism, `SectionPreviewCard.vue:63-65`; BAND-STORY W-5 owns the layout half, family E the trace gate) |
| `spec`/`family` | zero GL; lazy family members (`defineAsyncComponent`, `FamilyTabs`); code highlight = deferred color (`CodeBlock.vue:37-43`) |
| `studio`/`scene` | exactly ONE GL context (one-GL-per-route, `focal.ts`); palette ground at frame 0 (`suppressesShellField` doctrine, `focal.ts:91-116`) |
| `dock` | ONE band field (6b cure); viewport-clamped sticky backing store + intersection-parked rAF (`DockStage.vue:96-124` — the pattern is already right IN-page; the cure extends it ACROSS the band) |
| all | route chunks pre-resolved before the VT (`router.ts:122-130`); idle rAF budget is family E's gate (REGISTRY:322-326) |

**Responsive/mobile-first per-type rule (F14 — the framework's half; BAND-STORY W-6 owns the audit):**
each type declares its collapse ONCE in the chassis, never per page: `landing` bento 3→2→1 columns;
`spec` sections single-column with `size` measure caps (`story-body.ts:26`, `SIZE_MAX_W`); `studio`
controls-right → stacked-below-stage (`styles.css:186-232`, already shipped); `family` switcher
collapses to a Select (`SegmentedTabs responsive`, `FamilyTabs.vue:60-67`, already shipped); `dock`
column single-file. A page that needs a bespoke breakpoint is a taxonomy smell, not a CSS task.

---

## 7. Numbered amendments to BAND-STORY (appendable verbatim)

> **AMEND-D-1 (taxonomy 7 → 6). [CHANGED — counts + framing corrected]** Replace the seven-type list
> in `BJ.W-STORY-TAXONOMY` (`spec|studio|dock|family|scene|landing|doc`, BAND-STORY:70) with SIX:
> `landing · spec · studio · family · dock · scene(contingent)`. `doc` folds into `spec` (a
> prose/token page is a `spec` with prose specimens — no distinct layout). `landing` covers BOTH
> the D0 catalog home (`CatalogLanding.vue`) and the D1 section landing (`SectionLanding.vue`),
> discriminated by `depth`, not a separate type. `substrate-showcase` and `configurator-page` are
> the SAME `studio` anatomy (`VizStudio.vue`) — do not fork two variants; born-RED values count the
> studio's 3 on-disk consumers, not the ~9 post-adoption target. `family` = 5 mounts, of which
> `toast`/`paper-glass` are in-page switchers, not page types. `scene` is minted only if
> `ASK-REDUCTION` D1 keeps a composition; else the taxonomy is FIVE.

> **AMEND-D-2 (configurator standard = ADOPT, not BUILD).** The src `<Configurator>` already ships
> the card radius (`Configurator.vue:211` `--radius-panel`; `styles.css:109` concentric relay), the
> section register (`src/styles/tokens/sizing-config.css:35` `--configurator-section-size`), and
> grouped-list grammar. Reframe `BJ.W-CONFIGURATOR-STD` from "build the standard" to: (a)
> regression-guard the built standard, (b) WIDEN the section↔field ladder (both sit near
> `subheading` today — F10 stays flat), (c) give `StorySection` a `level` axis so story sections
> aren't all `text-subheading` (`StorySection.vue:32`), (d) adopt on springs (F29) + curve-gallery
> (F31).

> **AMEND-D-3 (F11 target + verdict).** The F11 born-RED site is the adjacent-sibling rule
> `.configurator-layer + .configurator-layer { margin-block-start: var(--configurator-section-gap) }`
> at `styles.css:117`, not only the token def. Verdict: the sub-sections of ONE inspector
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
> components (`src/components/easing/`, consumed `curve-gallery.vue:194-200`). Reframe `G-CFG-5` to
> the curve-stage layout-void fix (the over-tall stage, F31 image) + configurator adoption; drop the
> "modularize the easing-curve component" framing.

> **AMEND-D-9 (code-context region — new scope for A06).** A06 names "code-context views"; the
> `chassis/code` register exists (3 consumers) with no taxonomy home. Add an OPTIONAL code-context
> region to the `spec`/`studio` anatomy showing USER-FACING usage (import + minimal use), governed
> by the copy canon (§5.1) — never the F03 internal-token dump. Assign to Wave 1 (taxonomy defines
> the region) + Wave 2 (canon governs the content).

> **AMEND-D-10 (landing hero-scale — extend to the catalog).** Confirm the draft's AMEND-1
> (`heroScale` field is live at `StoryPage.vue:30`); the fix is the data-bind on the landings, not a
> field retire. Extend W-2's scope: `CatalogLanding.vue:18` ALSO hardcodes `hero-scale="4"` while
> the catalog is the D0 root and should read `mega`/`audacious`. Both `SectionLanding.vue:28` and
> `CatalogLanding.vue:18` bind to the descriptor's `heroScale` (`sectionLanding()` sets `"hero"`,
> `manifest.ts:300`). [line cites corrected at union]

> **AMEND-D-11 (StoryBody = the `spec` renderer — resolves OPEN-D2).** `StoryBody` (`:body=`, 3
> consumers: `select`/`alert`/`badge`) is KEPT as the `spec` variant's data renderer for the
> repeated-specimen shape; expand adoption where a page is pure specimen-grid, retire only where a
> page is genuinely bespoke. Not a family-C overfit retire.

> **AMEND-D-12 (NEW — the typed transition grammar; F06/F07).** Mint the four-type route-transition
> set of §6b (`route-lateral(-back)` · `route-descend`/`route-ascend` shared-element tile→hero ·
> `route-jump`) over the ONE existing owner (`routeTransition.ts:5-13`) and the existing CSS channel
> (`view-transition.css:47-57`); direction derives from manifest order; PRM/unsupported degrade to
> the instant swap. Cure the dock-band flash per §6b (band-persistent field, else frame-0 palette
> ground). Verification is LIVE-DEFER — captured before/after DELTA required; no headless-only
> close. This wave is NEW SCOPE for BAND-STORY: no draft wave owns F05/F06/F07 today.

> **AMEND-D-13 (NEW — the entrance register standard; F05).** Entrances are compositor-only
> (opacity/transform) via the existing `.scroll-cascade*` / `v-reveal` registers; zero demo-local
> `@keyframes`; zero layout-affecting entrance properties. Conformance-check the F05 page's
> background against the every-route-resolves-a-field law (`manifest.ts:188-230`) — a mechanism
> already exists; the wave verifies, not invents.

> **AMEND-D-14 (NEW — the per-type perf contract; A17/F01).** Adopt the §6c table as the framework's
> perf floor: landing 0-GL + above-fold `content-visibility` exemption; spec/family zero-GL + lazy
> members; studio/scene one-GL + frame-0 palette ground; dock one BAND field; all types pre-resolve
> chunks before the VT. Family E keeps the trace/rAF-budget gates; this amendment is the LAYOUT-side
> contract those gates measure.

> **AMEND-D-15 (NEW — the per-type responsive rule; F14).** Each type declares its collapse ONCE in
> the chassis (§6c list — landing 3→2→1, spec measure caps, studio stack, family Select collapse,
> dock single-file); `BJ.W-RESPONSIVE-AUDIT` audits pages AGAINST these type rules rather than
> page-by-page ad hoc; a bespoke per-page breakpoint is a taxonomy smell to escalate, not patch.

> **AMEND-D-16 (NEW — the frame-token contract).** Adopt §2.0: four frame tokens, one owner;
> resolve `--story-article-w` (collapse onto `--story-page-max-inline` per OPEN-D6, leaning) so the
> spec article is never IACVT-uncapped (`StoryPage.vue:51`); `DockStage.vue:193` reads
> `var(--story-page-section-gap)` instead of the hard-coded `2.5rem`; hero/stage padding unify on
> one token. Extends `BJ.W-WIDTH-HIERARCHY-TRUTH`.

> **AMEND-D-17 (NEW — one front door).** `/` (`CatalogLanding.vue:30-42`) and `/foundations/intro`
> (`intro.vue:74-89`) both render a category bento — two catalog pages, one identity split. Collapse
> to ONE front door (winner decided at execution: `/` absorbs the intro hero, or intro becomes `/`);
> the loser retires clean-break. Assign to `BJ.W-STORY-TAXONOMY` (it is a taxonomy conformance
> question — one D0 exists).

---

## 8. Perfection check — findings the census missed (file:line evidence)

1. **The taxonomy leaves the root catalog un-typed.** [CHANGED — framing] The draft's 7 types give
   `/` (`CatalogLanding.vue`) no typed home — it is a distinct anatomy (category bento, not story
   bento) and must be the D0 `landing`. (The draft's WAVES do touch `CatalogLanding` — W-4/W-5
   scope — so "omitted entirely" is retracted; un-TYPED is the defect.) (`router.ts:19-27`,
   `CatalogLanding.vue:12-45`.)

2. **`CatalogLanding` bypasses the tile ladder.** It hands `identityTile(category)` directly
   (`CatalogLanding.vue:7-9,40`) instead of `resolveStoryTile`, so the root home is ALWAYS identity
   slabs regardless of authored-tile coverage — the single biggest reason the front door reads
   blank (F01/F46). The census attributed the vacancy to coverage alone.

3. **The configurator standard is ~80% already shipped.** `styles.css:109` (concentric card radius),
   `src/styles/tokens/sizing-config.css:35` (section register), `styles.css:117` (grouped-list gap
   grammar) all exist. The draft frames W-CONFIGURATOR-STD as a build; it is an adopt + a
   ladder-widen. Writing born-RED values against "no standard exists" would mis-fire.

4. **F10 is a TWO-level defect, not one.** The census pins F10 to `StorySection.vue:32`
   (`text-subheading` flattening). But the F10 image is the src Configurator, whose section label
   (`--configurator-section-size` = subheading 20.4px) sits only ~4px above the field labels — the
   register EXISTS but the steps are too close. The cure is a wider ladder in BOTH the story chassis
   and the configurator, not just un-hardcoding `StorySection`.

5. **F31's component is already modularized.** `EasingConfigurator.vue`/`EasingPicker.vue` are real
   src components (`src/components/easing/`) consumed at `curve-gallery.vue:194-200`. The F31 ask
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
   the census's W-1 claim holds at 7.0.0. Independently re-derived at union (co-found, RATIFIED).
   (Collapse onto `--story-page-max-inline` per OPEN-D6 unless a genuinely narrower reading measure
   is wanted — leaning collapse, KISS.)

9. **No StorySection consumer overrides the heading level.** `grep -rl '#heading' demo/stories` → 0;
   90 files use `<StorySection`, 65 with `heading=`, all resolving to `text-subheading`
   (`StorySection.vue:32`). All three counts re-verified exact at union. The flatness is total —
   there is not one page that reads three heading levels. The `level` axis (AMEND-D-2) is the
   load-bearing cure, not an optional nicety.

10. **F03 is systemic "Mechanics"-section prose, not isolated blurbs.** The F03 image is a dock
    crossfade page whose ENTIRE body is numbered implementation mechanics with inline code tokens
    (`<DockCrossfade :active>`, `opacity: var(--dock-t)`, `useDockSpring`, `.dock-face-content`).
    The census lists discrete blurb sites (handmark/search/manifest); the copy canon must also ban
    the "Mechanics" narration PATTERN and rule that inline `<code>` is for user-facing usage, not
    internal-token exposition. (BAND-STORY G-COPY-2 already consumes this finding — re-pin its line
    cite to "§8 finding 10" after this rewrite.)

11. **NEW — two front doors.** `intro.vue:74-89` renders a second `SectionPreviewCard` category
    bento duplicating `/` (`CatalogLanding.vue:30-42`). One identity moment split across two D0
    pages; F46's page is the duplicate. (AMEND-D-17.)

12. **NEW — the typed-VT channel is minted with one type.** `startViewTransition` is called with
    `types: ["route"]` at exactly one site (`routeTransition.ts:12`) and the CSS knows exactly one
    type (`view-transition.css:47-57`) — every navigation semantics plays the same 8px rise. The
    expressive grammar (F07) is a type-set expansion over existing machinery, not a new engine.
    Dock-band flash mechanism per §6b; paint confirmation LIVE-DEFER.

13. **NEW — DockStage rhythm drift.** `DockStage.vue:193` hard-codes `gap: 2.5rem` where the prose
    (`:186-187`) claims the StoryPage section rhythm; below desktop the band diverges from
    `--story-page-section-gap`'s clamp. One-line token fix (AMEND-D-16).

14. **NEW — FamilyTabs is two patterns wearing one component.** Page-root family collapse
    (`inputs`/`atoms`/`text-motion`) vs in-page section switcher (`toast.vue:125`,
    `paper-glass.vue:263`). The taxonomy types only the former; the latter is a section register.
    Conflating them would over-count the `family` type and under-specify the switcher's contract.

---

## 9. Born-RED gate sketches (the framework's structural claims)

**G-PT-CONFORM (page-type conformance).**
- Born-RED: `grep -c pageType demo/stories/manifest.ts` → 0; no registry maps type → variant.
- GREEN: every `Story` carries `pageType ∈ {landing,spec,studio,family,dock[,scene]}`; a registry
  maps each to one variant component; a conformance unit asserts each route's rendered root matches
  its declared type (no route renders an un-typed ad-hoc wrapper); `hero:boolean` is deleted as the
  axis (`StoryPage.vue:32`); exactly ONE D0 route exists (AMEND-D-17).

**G-COPY-LINT (copy-canon ban-list).**
- Born-RED: a grep over `demo/stories/**` finds, in `blurb=`/`label=`/prose, (a) internal refs
  `--[a-z][a-z-]+` / `use[A-Z]\w+` / `\.[a-z-]+-content`; (b) `SOC 2|End-to-end encrypted|12k teams`
  (`auth-shell.vue:38-42`); (c) the decorative mono-caps idiom on 65 files; (d)
  `npm install @mkbabb/glass-ui` (`typewriter.vue:103`) — all present, all re-verified.
- GREEN: 0 mechanics refs in user-facing copy; 0 fabricated credentials; the mono idiom only on the
  one reserved `StorySection.label` role; 0 stray install strings. (Enforced as a grep ban-list +
  the eyebrow-union count gate on the reserved role.)

**G-TILE-COVER (tile-ladder authorship coverage).**
- Born-RED: `find demo/stories -name '*.tile.vue' | wc -l` → 4 (re-verified); `CatalogLanding` calls
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

**G-TRANS-GRAMMAR (NEW — the typed transition set).**
- Born-RED: `grep -rn 'types: \[' demo/chassis/routeTransition.ts` → one call, one type (`"route"`);
  `grep -c 'active-view-transition-type' src/styles/view-transition.css` → route-only; no
  shared-element name is stamped on any `SectionPreviewCard` tap.
- GREEN: the four types of §6b exist in CSS + are dispatched by navigation semantics; the
  landing→story descend rides a shared-element tile→hero; PRM degrades to the instant swap; the
  dock-band sibling nav mounts ZERO new GL contexts (band-persistent field) — each with a captured
  live DELTA (LIVE-DEFER until the demo runs).

**G-FRAME-TOKENS (NEW — the frame contract).**
- Born-RED: `grep -rn 'story-article-w' demo` → 1 reference / 0 definitions; `grep -n 'gap: 2.5rem'
  demo/stories/dock/_frame/DockStage.vue` → :193.
- GREEN: zero undefined frame-token references; DockStage reads `--story-page-section-gap`; one
  padding token serves hero bleed + stage column.

---

*End — Fable RU-10 union seat, story meta-framework. One file, no `src/`/`demo/` edits, no commit.*
