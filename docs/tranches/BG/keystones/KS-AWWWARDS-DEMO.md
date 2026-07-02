# KS-AWWWARDS-DEMO — the demo as the designed PRODUCT

**Keystone spec (KS-C · structure + world). Author: Fable. Date: 2026-07-01. HEAD `f6fa1767` (tranche/BG).**
**Binding for the frozen plan waves (`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:98-104,120,128`):**
F7.2 `W-CHASSIS-ADOPT-OR-RETIRE` (the PARENT) · F7.1 `W-DEMO-IA-REDESIGN` · F7.3 `W-DEMO-DUP-MERGE` ·
16.3 `W-STORY-PAGE-API` (+ sub-types) · 16.1 `W-SCROLL-PROGRESS-GLASSY` · 16.2 `W-SECTION-TYPEWRITER-FADEUP` ·
17.6 `W-PAGE-COMPONENT-AUDIT` (the 480-capture close) · F8.6 `W-ARISTOTELIAN-PROPORTION` (acceptance
LANGUAGE — **shared with KS-MOTION-DISNEY §3.4; one language, zero fork**). 4.11 `W-DOCK-STORY-MODULARIZE`
is F7-family but KS-DOCK's row — this spec COORDINATES with it (dock story counts untouched here).
**Research note:** the two lane research reports (`research/AWWWARDS-{sota,corpus}.md`) FAILED to land;
the grounding was performed by this author and is carried IN §2 (fleet2 + fresh 2026 web pulls + the
storybook-craft corpus), so §2 is the lane's research record of note.
**Converged substrate (binding, built on — never re-derived):**
`docs/tranches/BD/viz/fleet2/apple-awwwards-sota.md` (the seven-principle Apple/awwwards alignment) ·
`docs/tranches/BG/converge/BG-WS11-storybook-facility/SPEC-pass4-converged.md` (**the 16.x mechanisms are
CONVERGED there — §2A rail, §2B′ entrance, §2C′ page-API, §5 four-arm acceptance; this spec binds them
into the F7 family and adds the award-craft layer; it re-derives NOTHING**) ·
`RESPEC-GESTALT/pass-2/DEV-C-new-wave-specs.md §F7` · `RULINGS-PASS2.md` **including §CORRECTIONS**
(R6′ DOCK_SPRING = `springPreset("dock")` `{0.68, 0.64}`; R1 silhouette owner = 10.5; W-SPRING-TIDY
Option A — binding) · `KS-MOTION-DISNEY.md §3.4` (the F8.6 verdict template — THE one language).
**The wave SET is frozen; the protected set (`SYNTHESIS-PASS1.md §4`) is inviolable. A wanted NEW wave is
recorded as a fold-candidate note (§7), never a self-inserted row.**

---

## §1 — The hallmark delineated

> **The demo is not documentation ABOUT the design system; it IS the design system's first shipped
> product — the thing you'd screenshot for Apple.** A stranger lands on it and, inside thirty seconds,
> *feels* the identity before reading a word: a warm living field materializes, glass chrome blooms over
> it, the wordmark types itself on, and one scroll reveals the whole system as a designed narrative —
> vocabulary → world → material → life → proof. Every page has ONE protagonist staged live over the
> field (never a screenshot, never a spec-sheet grid of dead swatches); every heading arrives with
> weight; the scroll rail is itself a piece of glass jewelry; the finale is three-to-four full-system
> SCENES that could each win a Site of the Day on their own. The demo dogfoods everything it
> demonstrates — its nav is the dock, its tabs are SegmentedTabs, its reveals are the library's own
> springs — so the medium is the proof. The BG disease is the inversion of this: **156 `.vue` files =
> a component-count inventory**, conformity chassis shipped UN-ADOPTED (DemoFrame on 0 real pages, the
> unified header a ~45-file inline `<header>` paste, VizStudio 1/11, StorySectionHeader 0 consumers),
> compositions — the portfolio category — dead last and polluted with atom-scale strays, and the
> staging field itself cerulean-240 at war with the warm identity (`DockStage.vue:38 PRESETS.OPENAI_SKY`
> — the HUE is the defect, not the vibrancy: the documented Pass-E lens-needs-color rationale at
> `DockStage.vue:30-35` is KEPT and re-satisfied warm, §4-F7.1(5)).
> KS-AWWWARDS-DEMO's verbs are **DECIDE** (chassis, F7.2), **DESIGN** (the page SET + arc, F7.1),
> **COLLAPSE** (dups, F7.3; API, 16.3), **CHOREOGRAPH** (16.1/16.2), and **JUDGE** (17.6/F8.6).

### The demo facility map (load-bearing vs accumulated)

| facility | the read | the ONE home | owning wave |
|---|---|---|---|
| page anatomy (chassis) | ONE cel anatomy per page; conformity by construction, variation by preset | F7.2's DECISION (DemoFrame `demo/stories/_chassis/DemoFrame.vue` vs StorySection+ShowcaseFrame) | **F7.2** |
| page SET + narrative arc | ~120 manifest rows → ~88 designed pages in a five-act order | `demo/stories/manifest.ts` | **F7.1** |
| family pages | N family members, ONE page, a `<SegmentedTabs>` family register | the surviving chassis (F7.2's family-tab affordance) | F7.2 mints · F7.1 consumes |
| dup merges + dir hygiene | timeline×3/scroll×3 → 1 each; compositions de-polluted; `aurora/`→`substrates/aurora/` | the story tree | **F7.3** |
| page API | StoryPage/CategoryPage over ONE zero-logic shell; single-root oracle; the 5 sub-types | 16.3 (WS11 §2C′ verbatim) | **16.3** |
| storybook chrome | the thick glass scroll-progress rail (CC-reference) | `demo/layout/dock-nav.css` (WS11 §2A) | **16.1** |
| section entrance | per-glyph heading rise × body cel-cascade, congruent, strand-proof | StorySection + `useSectionReveal` (WS11 §2B′) | **16.2** |
| the staging field | warm HIGH-CHROMA per-category fields; NEVER cerulean, never warm-but-dead; DockStage warm default | `DockStage.vue` + `warm-field.ts` + `CATEGORY_HERO` | F7.1 (clause) |
| compositions portfolio | 3-4 flagship full-system SCENES | `demo/stories/compositions/` | F7.1 (§3.4) |
| the judge | per-page/per-category 3-axis verdicts; the 480-capture close | 17.6 + F8.6 (one language) | **17.6 / F8.6** |
| dock stories | ONE staged organism (rest→collapse→morph→fission→island) | KS-DOCK §4.11 | 4.11 (NOT this lane) |

**PROTECTED (this lane touches none of these):** the `?capture=` dual-engine harness (PROVEN,
cursor §0 keystone note) · `liquid-playground.vue`'s one-dock+facets composition (4.11's assert) ·
`morph-showcase.vue` as the published two-DOM-dock demonstration (the 4.10 fence) · the landed F1 rows
(route-transition, field-aurora, hero-fit — 17.6 re-verifies, never re-plumbs) · `useSurfaceAxis` ·
the one-GL-per-route budget.

---

## §2 — SOTA grounding (the lane research record — the failed reports' grounding performed here)

### 2.1 The Apple/awwwards principle set (fleet2 — ADOPTED WHOLE)

`docs/tranches/BD/viz/fleet2/apple-awwwards-sota.md` is the binding principle layer; the demo-lane
consequences:

1. **"Glass needs varied content BEHIND it or it reads as a flat tinted rectangle" (§1.4)** — the
   single most load-bearing demo rule. Every glass demo floats over a LIVE or textured field
   (`tier="field"`, DockStage); a glass specimen over an opaque `bg-card` plate is the anti-pattern the
   demo exists to disprove. ADOPTED as the `field-behind-glass` checklist item (§3.3) + the F7.1
   warm-field clause.
2. **"The brand IS the experience" clears the GPU bar; RESTRAINT is the discipline (§4.2)** — glass-ui
   is the brand-as-experience case, so live WebGL demo fields are justified — under the fences: ONE GL
   context per route, offscreen-pause, calm content tiers, one color event. ADOPTED verbatim.
3. **Motion choreographed, not decorative (§4.3)** — entrances/transitions/section reveals on the
   native `scroll()`/`view()` substrate; kinetic typography ONLY where it is the identity beat (the D0
   hero typewriter), never ambient. ADOPTED — 16.2's reinterpretation (§4.6) is this principle applied.
4. **Dark-mode-default + tokens + visual regression are the floor, not the flourish (§4.4)** — 82% of
   users; every 17.6 verdict is judged BOTH modes as co-equal first-class reads. ADOPTED.

### 2.2 The storybook-craft corpus (fresh 2026 pulls — what documentation sites that WIN do)

From the 2026 storybook-example analyses ([DesignRush](https://www.designrush.com/best-designs/websites/trends/storybook-examples),
[Supernova](https://www.supernova.io/blog/top-storybook-documentation-examples-and-the-lessons-you-can-learn)):

- **Grafana — the explanatory intro**: every surface opens with WHY, not a props table. ADOPTED → the
  narrative-copy checklist item; every page blurb states the design intent (the manifest `blurb` is
  load-bearing copy, not filler).
- **Audi UI React — 330 stories with brand imagery + narrative copy**: the demo carries the BRAND
  voice end-to-end. ADOPTED → the warm identity + editorial voice bar.
- **Wix — playground-first UX**: real-time interaction beats static rendering. ADOPTED → the
  `live-not-static` checklist item (every specimen interactive; the Configurator/VizStudio pattern).
- **Carbon/Salesforce — hierarchical, progressive disclosure**: on-page section nav, staged depth.
  ADOPTED → the family-tab affordance (F7.2) + the D0→D1→D2→D3 depth ladder (already shipped).
- **Circuit UI — readiness tags**: REJECTED — glass-ui ships no half-done component; a maturity-badge
  register would be contrived (everything published is stable by the gate discipline).

### 2.3 The award-craft reference set (the "designed product" pole)

The sites the mandate's "thing you'd screenshot for Apple" names, and the ONE lesson each contributes
(the 2026 [Awwwards SOTD](https://www.awwwards.com/websites/sites_of_the_day/) corpus + the canonical
craft-site set):

- **Apple Newsroom/HIG product pages** — one protagonist per scroll-beat; the hero IS the product,
  chrome recedes; scroll advances a story, not a list. → the one-protagonist rule (§3.3 #2).
- **linear.app / vercel geist** — a design system presented as a product page: dark-first, restrained,
  every section a designed composition; the docs and the marketing are the SAME surface. → the demo
  and the "marketing site" are ONE artifact (there is no second site to defer polish to).
- **rauno.me/craft, emilkowal.ski** — interaction-craft essays where every inline demo is live,
  small, and perfect; the page teaches by letting you FEEL the spring. → live micro-demos over prose;
  the reveal/springs/curve-gallery pages are this genre and are judged by its bar.
- **family.co (SOTD)** — the finale-scene pattern: a handful of deep, choreographed scenes carry the
  whole award; nobody wins with 156 shallow pages. → the compositions flagship model (§3.4).
- **stripe.com** — the gradient field as brand substrate, WebGL restrained to the hero band. → the
  per-category warm field with hue VARIANCE (not one-aurora sameness — `CATEGORY_HERO` already models
  this; F7.1 completes it).

**Rejected wholesale:** the FWA-style full-viewport WebGL-everything experience (fights the restraint
fences, CWV, and the library's own calm identity); scroll-hijack momentum (the no-Lenis fence);
maturity badges; a separate marketing splash divorced from the storybook (one artifact, one truth).

---

## §3 — First-principles design (the greenfield loop on the four contested questions)

### §3.1 — The narrative ARC (category order · landing experience · the first 30 seconds)

**Directions (3):**

- **(a) Reference-manual order** (alphabetical / atomic-design strata, the HEAD shape) — REJECTED:
  it is the spec-sheet disease itself; atoms-first buries the identity (a Button grid is nobody's
  first impression of a liquid-glass system).
- **(b) Cinematic cold-open** — compositions FIRST (open on the most spectacular scene, explain
  after; the awwwards-portfolio pattern) — REJECTED: a design system is a VOCABULARY product; scenes
  before vocabulary read as a template shop, every later page is an anticlimax, and the visitor who
  came for `<Button>` docs is lost. The cold-open ENERGY is kept — but compressed into the D0 front
  door's first 10 seconds, not a category.
- **(c) The FIVE-ACT CRESCENDO** — the story of the material, told in the order a stranger can feel
  it: *vocabulary → world → material → life → proof*. **GOLDEN.**

**The GOLDEN arc (the exact category order — F7.1's binding re-order):**

| act | categories (order) | what the visitor learns |
|---|---|---|
| I · The Vocabulary | `foundations` | warm ink, √φ type, tokens, paper — the language |
| II · The World | `substrates` | the living fields the glass refracts (Apple §1.4 made a chapter) |
| III · The Material | `display` → `forms` | atoms then controls, staged OVER act II's fields |
| IV · The Life | `containers` → `navigation` → `dock` → `motion` | surfaces, chrome, the protagonist, then the physics that animates them all |
| V · The Proof | `data` → `feedback` → `compositions` | working ledgers, status voice, and the flagship SCENES (the finale) |

Deltas vs HEAD order: **`display` and `forms` SWAP** (atoms before controls); **`motion` moves up**
from position 10 to close act IV (the physics chapter belongs with the life it animates, and the
finale must be compositions, not a curve gallery). Everything else holds — the SYNTHESIS verdict "the
taxonomy is otherwise sound" is respected; this is a re-ORDER + two moves, not a re-naming (category
ids/routes unchanged; nav order + landing bento order are the artifacts).

**The first 30 seconds (the D0 front door, `foundations/intro` — the binding landing experience):**

- **0–3s · materialize.** The warm aurora field fades up from the page ground (the landed F1
  route-entrance; NO white flash, CLS 0); the glass dock is present from frame one — the protagonist
  introduces itself as chrome, not content.
- **3–8s · the identity beat.** The wordmark types itself on (`useTypewriter` — HONORED here, its ONE
  sanctioned kinetic-type home, WS11 flag #4) at the audacious display rung; the folded
  `compositions/hero` typographic scene becomes this door's hero band (§3.4). ONE gold CTA
  (`gold-audacious`, calm register): *"Meet the system."*
- **8–30s · the whole system in one scroll.** Scrolling the front door reveals the five acts as a
  bento of the 11 category cards (the CategoryPage preview-card register), each card carrying its OWN
  warm field hue (the per-category variance — never one-aurora sameness), each a live preview, each
  arriving on the section cascade. The scroll-progress rail (16.1) is visibly filling — the chrome
  itself is jewelry. The visitor has now FELT: warm, liquid, alive, restrained — before reading a
  single props table.

**Self-challenge.** *Is the five-act frame contrived — will users just deep-link?* Yes, most sessions
deep-link; the arc must therefore be legible AT EVERY ENTRY, not only from the door: each category
landing (D1) states its act in the eyebrow (`ACT II · THE WORLD`), and the dock nav lists categories
in act order — the arc is ambient structure, not a forced tour. *Does moving `motion` up orphan
data/feedback?* No — act V's working surfaces read BETTER after the physics chapter (their springs
are now vocabulary). *Route churn?* None — ids unchanged; only nav/bento order + two manifest array
moves.

### §3.2 — The page ANATOMY decision frame (F7.2 — DemoFrame vs StorySection+ShowcaseFrame)

The decision is **Fable-at-build's, via DesignSync, BEFORE the migration** (the frozen row). This
section arms that decision: the criteria, both candidate anatomies as concrete sketches, the lean,
and the falsifier. Ground truth at HEAD: `DemoFrame.vue` (+`demo-frame.css`, ~350L) consumed by **0**
story pages; `StorySection` + `ShowcaseFrame` are the incumbent on effectively every page;
`StorySectionHeader.vue` has 0 consumers (DELETE is already decided — the frozen row);
~45 story files carry an inline `<header>` paste.

**The decision criteria (the frame — judged over the SAME 4-5 pilot pages):**

| # | criterion | what it measures |
|---|---|---|
| C1 | **Box-model truth** | Does the anatomy express free glassy cels floating over the field (the BD inversion, Apple §1.4), or a monolith card containing flat sections? |
| C2 | **Conformity by construction** | Can a page physically render an off-register surface, a second `<h1>`, or an inline header? The winning anatomy makes the paste IMPOSSIBLE, not discouraged. |
| C3 | **Sub-type fit (16.3)** | The `Demo{Stage,Specimen,Interaction,Matrix,Composition}` taxonomy MUST land (GA-5 carrier). DemoFrame's `variant` axis IS that taxonomy already built; the incumbent would re-mint it as presets. A retire that re-mints the same five shapes under another name is a RENAME, not a retire — score honestly. |
| C4 | **Family-tab host** | Which anatomy hosts the family register (`<SegmentedTabs>` section-switcher) naturally — F7.1's collapse mechanism depends on it. |
| C5 | **Paint cost** | N translucent cels × `backdrop-filter` per page vs one plate — measured on the pilot (the fleet2 §4.1 Android/WebKit fence); the cel anatomy must hold 60fps scroll on the M5 AND not regress the WebKit arm. |
| C6 | **Migration honesty** | ~88 pages × the swap cost. The incumbent wins C6 by definition; weigh it against C1-C4, don't let it silently decide. |

**Candidate A — ADOPT DemoFrame (the cel anatomy):**

```vue
<!-- forms/slider.vue under Candidate A -->
<DemoFrame variant="interaction" heading="Drag physics" label="SLIDER"
           blurb="Pointer-anchored keep-dock-open; the thumb halo reads dockHeld.">
    <Slider v-model="v" :keep-dock-open="true" />
    <template #readout>… live API readout …</template>
</DemoFrame>
```

Each section is its own glass cel over the field; the cel carries the entrance (route-enter keyframes),
the caption band, and the ONE in-body `<h2>` (composing StorySection internally). The unified identity
header (IconChip + tinted eyebrow + accent rail, keyed off the manifest row) renders ONCE in the page
chrome (StoryPageShell), and DemoFrame refuses to render a second — the 45-file paste dies by
construction. The five variants ARE 16.3's sub-types.

**Candidate B — RETIRE DemoFrame; harden the incumbent:**

```vue
<!-- forms/slider.vue under Candidate B -->
<StorySection heading="Drag physics" label="SLIDER" blurb="…">
    <ShowcaseFrame tier="field" caption="keep-dock-open · dockHeld halo">
        <Slider v-model="v" :keep-dock-open="true" />
    </ShowcaseFrame>
</StorySection>
```

DELETE `DemoFrame.vue` + `demo-frame.css` (~350 dead lines, the honest no-legacy cut); enforce ONE
`tier` contract on ShowcaseFrame (`field` default for glass demos, `resting` allowlisted for opaque
atoms — a gate arm, since the anatomy cannot enforce it structurally); land 16.3's sub-types as five
NAMED ShowcaseFrame/StorySection preset compositions (a `subtype` prop or five thin wrappers).

**The lean (recorded, not the decision):** **Candidate A**, because C1-C4 all point the same way —
the cel anatomy IS the box-model inversion the BD greenfield ruled, the sub-type taxonomy is already
built as its `variant` axis, conformity is structural rather than gate-enforced, and the false
"by construction" comments (`DemoFrame.vue:19-25`, `StoryPage.vue:118` region) become TRUE instead of
deleted. Candidate B wins only C6. **The falsifier that flips it to B:** the 4-5-page DesignSync pilot
reads WORSE than the incumbent — cel-clutter fragmenting the field, the caption rhythm breaking, or
C5's paint cost failing on the WebKit arm. If B wins, the retire is honest ONLY with the sub-types
re-expressed (C3) and the false comments deleted.

**The pilot set (the DesignSync decision cards, both candidates × both modes):** `forms/slider`
(interaction) · `display/buttons` (matrix) · `substrates/glass-material` (stage) · `feedback/toast`
(specimen) · `compositions/instrument` (composition — the §3.4 flagship sketch). Five pages, ten
cards per candidate; the non-authoring Fable judge files the pick with a per-criterion line.

**Self-challenge.** *Is "adopt the thing we built" sunk-cost bias?* The counter is C5+C6 being real
criteria and the falsifier being paint-first, judged by a non-authoring instance on captures — the
decision frame is honest either way. *Can the pilot mislead at 5 pages?* The five span all five
sub-types and both plate registers — the variance that matters is covered.

### §3.3 — The AWARD-CRAFT CHECKLIST → acceptance language (jointly with F8.6 — ONE language)

**Directions (3):**

- **(a) A `proof:awwwards` mechanical gate** (N greppable craft clauses) — REJECTED for the same
  cause the plan forbids `proof:aristotelian`: grep-able presence ≠ felt craft; the P-1 close-class
  lesson.
- **(b) A fourth verdict axis** ("award-craft") appended to F8.6's template — REJECTED: F8.6 is ONE
  language with exactly three axes (KS-MOTION-DISNEY §3.4, GOLDEN there); a demo-lane fourth axis is
  the fork the mandate forbids.
- **(c) The checklist as an EVIDENCE RUBRIC inside the existing 3-axis template, plus the few
  genuinely mechanical items as `proof:demo` arms.** **GOLDEN.** The demo lane files the SAME verdict
  file (`docs/tranches/BG/audit/edict-verdicts/<surface>.md`, the KS-MOTION-DISNEY §3.4 template,
  byte-shape unchanged); the checklist below tells the Fable judge WHAT EVIDENCE each axis line cites
  for a demo surface, and the telos line carries the page's protagonist + act.

**THE AWARD-CRAFT CHECKLIST (the ten items, each mapped: machine arm vs verdict evidence):**

| # | item | the bar | enforcement |
|---|---|---|---|
| 1 | **First-paint moment** | the page opens with an identity beat — field up, hero materializes, no FOUC, CLS 0 | verdict evidence (axis-2: staging/timing) + the landed `proof:route` |
| 2 | **One protagonist** | ONE φ²-dominant staged subject per page; chrome recedes; no two competing heroes | verdict evidence (axis-1: proportion; the telos line NAMES the protagonist) |
| 3 | **Live, not static** | every specimen is interactive/animated real API — zero dead screenshot blocks | `proof:demo` arm (6.5's per-card pixel-hash differs is the substrate precedent) + verdict evidence |
| 4 | **Field behind the glass** | no glass demo over an opaque plate; `tier="field"`/DockStage; the field is WARM at HIGH chroma (the lens needs a colorful backdrop — a warm-but-dead field fails the same bar cerulean did) | **machine**: `field-warm-default` bite, hue AND chroma floor (F7.1) + tier-contract arm (F7.2) |
| 5 | **Narrative copy** | blurb states design INTENT (why, not what); no lorem, no boilerplate | verdict evidence (telos line) + the anti-boilerplate floor (F8.6, verbatim) |
| 6 | **Progressive disclosure** | family tabs for N members; depth ladder D0→D3 legible; act eyebrow present | **machine**: `demo-earns-page` (F7.1) + chassis family-register arm (F7.2) |
| 7 | **Choreographed scroll** | heading rise × body cascade congruent; rail fills monotonic; nothing strands | **machine**: 16.1 `railHealth()` + 16.2 `getAnimations()` congruence + verdict evidence (axis-2) |
| 8 | **Warm end-to-end** | dominant hue warm in BOTH modes over every route region; per-category hue VARIANCE | **machine**: `proof:warm-identity` (F8.2 route battery) + verdict evidence (axis-3) |
| 9 | **Both modes, both engines first-class** | dark is co-equal (luminous-dark, not inverted-gray); WebKit beside Chromium on every binding capture | **machine**: the dual-engine capture floor (17.6) |
| 10 | **Restraint** | one color event · one GL context/route · calm content tiers · exaggeration only where the telos earns it | verdict evidence (axis-3 both directions — the busy-failure judged explicitly, F8.6 verbatim) |

**The screenshot-for-Apple bar (the summary judgment, quoted in every 17.6 category verdict):** *any
single frame of this page, cropped at random, could serve as a product marketing still.* A page that
needs its best angle found FAILS.

**Self-challenge.** *Does routing craft through 3 axes dilute it?* No — items 1-10 partition cleanly
(1/2/5 → axis-1+telos; 3/6/7 → axis-2; 8/9/10 → axis-3) and the genuinely mechanical third
(4/6/7/8/9) is machine-locked on `proof:demo`/`proof:warm-identity`, which is MORE teeth than a
prose-only checklist. *One language claim honest?* The template file shape is byte-identical to
KS-MOTION-DISNEY §3.4; this section adds zero fields — only evidence conventions.

### §3.4 — The compositions story (the 3-4 full-system scenes that ARE the portfolio)

**Directions (3):**

- **(a) Keep the 12-page compositions set** (8 medium scenes + 4 strays) — REJECTED: none is a
  showpiece; a portfolio is a few DEEP scenes, and the strays (labeled-field, icon-tooltip) are
  atom-scale pollution the frozen F7.3 row already evicts.
- **(b) One mega-scene** (a full working app) — REJECTED: a single app reads as a template, becomes a
  maintenance sink, and stages one context instead of the system's range.
- **(c) FOUR FLAGSHIP SCENES, each the deep expression of one act, absorbing the medium scenes as
  states/sections.** **GOLDEN.**

**The four flagships (compositions 12 → 4):**

1. **`compositions/instrument` — The Instrument.** The working-dashboard scene (the speedtest-class
   read): `<InstrumentChassis>` phase bus driving `<BorderProgress coverage>` as the card's living
   edge, `<CompletionSeal>` firing earned-gold at the run's end, MetricCell/MetricStack ledger, the
   dock carrying the transport. Absorbs `instrument-chassis` + `gate-pattern` (the gate is the
   instrument's locked state). The scene RUNS — phases advance, the seal draws, gold is earned.
2. **`compositions/studio` — The Studio.** The system-configuring-itself scene: `<Configurator>`
   (per-preset clones) live-theming an aurora + glass card cluster, `<ColorSwatch>` +
   `<EasingConfigurator>` in the column, the preset editor gear. Absorbs `configurator` + `settings`.
   The Wix playground-first lesson at full scale — the visitor TUNES the design system inside it.
3. **`compositions/paper` — The Paper.** The editorial voice: the math-paper idiom (section rail +
   fira-code math over paper-grain), `<HandMark>` marginalia (boil underline, highlighter band), the
   typography ladder as pull-quotes, FadingScroll ToC via `/sidebar`. Absorbs `math-paper`. The
   SUBTLE-paper hallmark's scene (KS-PAPER's bounds honored — no double-warm; 14.1's ceiling).
4. **`compositions/gate` — The Gate.** The threshold scene: `auth-shell`'s glass gate over the live
   field, `form-validation`'s invalid-ring register exercised live, `drawer-live-behind` as its
   mobile arm (the peek/half/full sheet over the still-live gate). Absorbs `auth-shell` +
   `form-validation` + `drawer-live-behind`.

**The evictions/moves (completing 12 → 4):** `labeled-field` → forms (F7.3, frozen row) ·
`icon-tooltip` → `containers/tooltip` (F7.3) · `empty-states` → feedback (a designed-absence section
on the skeleton page) · **`hero` → FOLDS INTO the D0 front door** (it IS the front-door hero band —
§3.1; the fold touches landed 2.6 W-HERO-FIT surfaces → its re-capture is owed at 16.3's close;
open question §7-Q5).

**Self-challenge.** *Four deep scenes = four maintenance sinks?* Each flagship composes ONLY shipped
primitives (zero demo-local forks — the D4 anti-fork bite extends to compositions), so they break
only when the library breaks — which is exactly the integration-canary value. *Does absorbing
`settings` into Studio lose the settings-page pattern?* The pattern (LabeledField rows + Section
landmarks) survives as Studio's left column; the standalone page taught nothing the forms family
pages don't. *Is act V's finale placement enough to make compositions discoverable?* The D0 front
door's final bento row features the four flagships full-width — the finale is also the front door's
closing shot.

---

## §4 — Wave binding (per-wave perfected specs; preconds are the cursor's, untouched)

**The lane DAG (cursor-faithful):** F7.2 (parent) → F7.1 → { F7.3 `[WS4]` · 16.3 } → 16.1 ∥ 16.2 →
17.6 (after F7.1; the close) · F8.6 (after F8.2+F8.3; judges the built state). 16.1/16.2 have no
cursor preconds and may run early — but their surfaces are re-captured after 16.3's shell collapse
(state it, don't re-order). **Inherited hard-gate (WS11 §0/§8, restated so no executor misses it):**
no 16.x wave OPENS until the WS1+WS4 integration src edits are GREEN on the tree — `.scroll-build`
retired from `StoryPage.vue:72`, the page-level `.scroll-cascade` decoupled (`:220`), the
StorySection heading off the plain `<h2>`. "May run early" means early in THIS lane's order, never
ahead of that gate; at open, confirm those edits landed in the amended F1/F6/F7 families and mark the
gate DISCHARGED, else hold.

### F7.2 · `W-CHASSIS-ADOPT-OR-RETIRE` [P] — the gestalt centerpiece (DECIDE, never keep both)

**What the perfected spec ADDS:** the §3.2 decision frame (criteria C1-C6, both sketches, the lean +
falsifier, the 5-page pilot set) — the frozen row said "Fable decides"; this arms the decision.

- **Deliverables:** (1) the DesignSync pilot — both candidate anatomies rendered on the 5 pilot pages
  (§3.2), both modes; the non-authoring Fable judge files the pick with per-criterion lines (C1-C6);
  (2) the MIGRATION of the winner across the story set (mechanical, opus/sonnet); the loser
  DEFINITION-ABSENT (never both-alive); (3) **the unified identity header DELIVERED PRE-16.3, on the
  WINNING anatomy's chrome slot** (StoryPage's or DemoFrame's, per the pick; StoryHeader absorbs):
  `:section`/`:icon`/`:accent` on the ONE chassis header, keyed off the manifest row — IconChip +
  tinted eyebrow + accent rail render ONCE; the ~45 inline `<header>` blocks + the verbatim
  `borderLeft` pastes DELETE; the motion masthead becomes `:accent`, not a fork. 16.3 then CARRIES
  this header into StoryPageShell at the shell collapse — the header TRAVELS, it is never re-authored
  ("StoryPageShell's chrome slot" is the DESTINATION note, not a precond; no circularity — F7.2 does
  not depend on 16.3's output); (4) `StorySectionHeader.vue` DELETE (0 consumers) — **F7.2 SOLELY
  owns this delete + its exactly-two allowlist re-points**: `proof-storybook-meta.mjs` M9d (a
  positive EXISTENCE assert — the re-point is a clause RETIRE/repoint, not a filename swap) +
  `proof-page-hierarchy.mjs:83`, in the same commit. Those two rows are thereby DISCHARGED from the
  WS11 §2C′(e) matrix that 16.3 inherits — 16.3 re-touches NEITHER (§4-16.3 states the reciprocal);
  (5) the false "by construction" comments corrected (`DemoFrame.vue:19-25,
  35-37`, `StoryPage.vue:118` region) — true or gone, per the pick; (6) **the family-tab affordance**:
  the surviving chassis gains ONE family register (`<SegmentedTabs>` pill section-switcher — the
  library dogfooding its own nav) that renders N family members on one page; this is F7.1's collapse
  MECHANISM and lands here first.
- **Gate arm (`proof:demo` · `chassis-adopted`):** the picked anatomy renders on ≥N real pages (born-
  RED: 0 DemoFrame pages at HEAD); loser DEFINITION-ABSENT; StorySectionHeader DEFINITION-ABSENT;
  0 inline `<header>` in `demo/stories/*/`; the unified header renders IconChip/eyebrow/accent ONCE;
  VizStudio adopted on `{blob, fourier-field, concentric, paper-grid}` (born-RED: 1/11 at HEAD —
  `substrates/aurora.vue` only); the family-register present on ≥1 family page.
- **Fable arm:** the adopt-or-retire DECISION + the unified header cel register authored (one cel
  anatomy, reviewed BEFORE the migration). **DesignSync surface:** the 10-card pilot set (5 pages ×
  2 candidates), both modes — the decision card set.
- **Paint close:** `tests-visual/chassis.spec.ts` — the adopted anatomy on a representative content
  page + a VizStudio page + a family-tab page, BOTH modes, dual-engine; the header renders once (a
  DOM count assert rides the spec); checklist items 4/6 (§3.3) cited in the filed verdict.
- **Preconds:** — (the PARENT of F7.1).

### F7.1 · `W-DEMO-IA-REDESIGN` [P] — the demo as a designed product (the page SET + the arc)

**What the perfected spec ADDS:** the §3.1 GOLDEN arc (exact order + the first-30-seconds), the
binding page-set math with the exact merge list, the §3.4 compositions consolidation, and the
per-category warm-field completion.

- **The page-set math (the binding count reconcile — three countings, stated once):** the plan's
  "~156→~90-100" counts `.vue` FILES; the manifest carries **120 story rows** + 11 category landings
  (131 routes); the remaining ~25 files are chassis/support. **The target: 120 → 88 story rows
  (99 routes; ~118 `.vue`)** — inside the band. Fable-at-build owns the final list; the table below is
  the BINDING default it refines against, with `demo-earns-page` as the machine floor.

| category | now | target | the exact merge list |
|---|---:|---:|---|
| foundations | 13 | 12 | `paper-glass` + `paper-texture` → `paper` (one paper chapter — KS-PAPER's surface) |
| substrates | 11 | 11 | none — every viz earns its page (the brand) |
| display | 11 | 5 | `metric-badge`+`metric-pill` → OUT to `data/metrics`; `separator`+`pulse`+`status-dot`+`stacked-icons`+`dark-mode-toggle` → `display/atoms` (one designed atoms wall); keep `buttons`·`card`·`badge`·`section` + NEW `atoms` (the designed wall — the merge TARGET built from the 5 strays, not an existing page) |
| forms | 12 | 6 | `inputs`+`textarea`+`combobox`+`select`+`multi-select`+`label` → `forms/inputs` family page (sections + family tabs); `toggle`+`toggle-chip`+`selectable-chip` → `forms/toggles`; +`labeled-field` moves in (F7.3); keep `checks`·`slider`·`number-field` |
| containers | 14 | 14 | `icon-tooltip` absorbed into `tooltip` (F7.3, count-neutral) |
| navigation | 4 | 4 | none |
| dock | 9 | 9 | DECLARED family (all share `/dock`); counts are 4.11's (KS-DOCK) — NOT this wave's |
| data | 14 | 8 | `table`+`data-table` → `table`; timeline ×3 → `timeline` (F7.3); `metric-cell`+`metric-stack`+(display's badge/pill)+`scrolling-text` → `data/metrics`; `avatar` → `display/atoms`; keep `tags-input`·`search`·`sortable-list`·`infinite-scroll`·`virtual-section` |
| feedback | 8 | 8 | `toast`+`toaster` → `toast`; +`empty-states` moves in (§3.4) |
| motion | 12 | 7 | scroll ×3 → `motion/scroll` (F7.3); `typewriter`+`split-chars`+`animated-digit`+`countup` → `motion/text-motion` (type & number motion family); keep `springs`·`curve-gallery`·`reveal`·`deck`·`handmark` |
| compositions | 12 | 4 | the §3.4 flagships: `instrument`·`studio`·`paper`·`gate` (absorbing 8, evicting/moving 4) |
| **total** | **120** | **88** | |

- **Deliverables:** (1) the §3.1 arc — nav + landing-bento re-order (acts I-V), the display↔forms
  swap, motion to act IV; the act eyebrow on each D1 landing; (2) the D0 front-door redesign — the
  first-30-seconds experience (§3.1), absorbing `compositions/hero` as the hero band; (3) the family-
  page collapses per the table (each family page = the F7.2 family register + one section per member;
  the manifest `SUBPATHS`/`CATEGORY_DEFAULT_BG` maps updated in lockstep — no keyless route,
  `proof:stage` W1 held); (4) the §3.4 four flagships BUILT (composing shipped primitives ONLY);
  (5) **the warm-field clause (GB-5) — the swap ENGAGES the Pass-E lens-staging rationale, it does
  not override it:** `DockStage.vue:30-35` documents OPENAI_SKY as DELIBERATE ("the §L1 lens needs a
  colorful backdrop to bend + concentrate" — the field must be RICH; warm ≠ desaturated, and a
  low-chroma warm-cream swap would regress the lens read that finding protects). So `DockStage.vue:38`
  `PRESETS.OPENAI_SKY` (cerulean 240) → a **warm-but-HIGH-CHROMA** identity preset: warm
  amber/coral/gold aurora, dominant OKLab hue inside the `[25,95]` warm clamp, at saturation MATCHING
  OPENAI_SKY's vibrancy (the dominant-mass chroma of the new default ≥ 0.9× OPENAI_SKY's, measured on
  the same histogram read at swap time). The `DockStage.vue:30-35` comment is UPDATED in the SAME
  wave — the lens-needs-color rationale stays TRUE on disk, re-worded onto the warm field (a swap
  that leaves the now-false cerulean rationale surviving is a doc-truth defect). Sweep the story set
  for any other cool staging default; per-category hue VARIANCE verified (the
  `CATEGORY_HERO`/`warmFieldHue` thread stays live — WS11 §2C′(d) rides 16.3); (6) narrative copy
  pass — every surviving page's blurb states design INTENT (checklist #5).
- **Gate arm (`proof:demo` · `demo-earns-page`):** no two story rows share a component subpath unless
  a DECLARED family (allowlist: `dock` · `forms-inputs` · `toggles` · `timeline` · `metrics` ·
  `scroll` · `text-motion` · `data-table` · `toast` · `motion-core`); born-RED on today's 8
  collisions; + the `field-warm-default` bite (the DockStage default preset resolves a warm dominant
  hue — an OKLab hue-histogram read, not a string match — **AND clears the chroma floor**: the
  dominant-mass mean chroma ≥ 0.9× the OPENAI_SKY baseline recorded at swap time, so a
  warm-but-DEAD field reds the bite exactly as cerulean does; hue alone cannot green it).
- **Fable arm:** Fable authors the taxonomy + the arc + the front-door experience + the flagship
  scene direction (the whole point — the directive routes ALL IA/design to Fable). **DesignSync
  surface:** the section-landing bento + the new act order + the D0 door + the four flagship scenes,
  as card-based review, both modes.
- **Paint close:** `tests-visual/demo-ia.spec.ts` — the act-ordered bento; a family page (metrics or
  timeline) rendering N members on ONE surface with the family tabs; the DockStage field warm; the
  D0 door's typewriter beat (PRM arm: static terminal); BOTH modes, dual-engine. The filed verdicts
  cite checklist 1/2/4/5/6.
- **Preconds:** F7.2. **Sequence (ruling 5, restated):** F7.2 → F7.1 → live-render fill →
  manifest-colocate → BH B3 δ5/δ6 consumes the REDUCED set.

### F7.3 · `W-DEMO-DUP-MERGE` [H · `[WS4]`] — the mechanical layer

**What the perfected spec ADDS:** the exact file choreography + the two count-neutral moves' gate
touchpoints. Scope is DEV-C's, unchanged: copy-the-render-body-delete-the-wrapper
(the `curve-gallery.vue` exemplar), zero behavior change.

- **Deliverables:** timeline ×3 → ONE `data/timeline.vue` (3 StorySection registers: discrete/
  segmented/continuous); scroll ×3 → ONE `motion/scroll.vue` (native → reader → choreography,
  dependency order); `compositions/labeled-field.vue` → `forms/`; `compositions/icon-tooltip.vue` →
  into `containers/tooltip.vue`; `configurator` + `instrument-chassis` OUT of compositions (they land
  INSIDE the §3.4 `studio`/`instrument` flagships — coordinate with F7.1, which owns the flagship
  build; this wave does the moves/deletes); `git mv demo/stories/aurora/ demo/stories/substrates/aurora/`
  (the B8-F8 depth-nest, out of the `./*/*.vue` glob — δ6's glob migration stays DROPPED); manifest
  rows + `SUBPATHS` keys updated per move; router/lazy() paths verified.
- **Gate arm:** folds under `demo-earns-page` (the same 8 collisions; no separate gate). The
  `proof:stage` zero-keyless witness re-run after the map edits.
- **Fable arm (cursor: — ; keystone hardening, optional):** a before/after spot-verdict on the merged
  pages (render-body-identical verified on capture, not asserted). **DesignSync surface:** none
  (mechanical). **Paint close:** none owed (render-body-identical); the spot captures ride 17.6.
- **Preconds:** F7.1 (consumes the reduced taxonomy) · `[WS4]`.

### 16.3 · `W-STORY-PAGE-API` [H/P] — the page API + the sub-type taxonomy (GA-5 carrier)

**The mechanism is WS11 `SPEC-pass4-converged.md §2C′` VERBATIM** — StoryPageShell (zero-logic shell)
+ StoryPage (stack) + CategoryPage (bento, absorbing `SectionLanding.vue`) + the single-root
`StoryHeroBackdrop` (6-branch kind switch; the `.constellation.story-hero-bg--bleed` marker
preserved); the R2 field-hue re-home (`warmFieldHue` importers === 2, hue variance captured); the
15-gate + SHARED-lib atomic blast-radius matrix (§2C′(e) — the `proof-page-redesign` multi-file
rewrite, the `surface-closure.mjs:163` seed re-point, the `proof-demo-radial-calm.mjs:225` token add —
**MINUS the two StorySectionHeader allowlist rows** (`proof-storybook-meta.mjs` M9d +
`proof-page-hierarchy.mjs:83`): F7.2 lands those with its delete (§4-F7.2(4)), so 16.3's matrix owns
the StoryHERO-reader set + the SectionLanding fold and re-touches NEITHER StorySectionHeader
allowlist — single ownership, each re-point applied exactly once);
the AST single-root oracle BUILT + registered `[local,ci,release]` with its self-test bites; the FULL
`gates.mjs` battery ZERO unflagged red BEFORE the deletes are final. None of that is re-derived here.

**What the perfected spec ADDS:**
- **The sub-type taxonomy lands ON F7.2's winner (the F8.7 amend made concrete):**
  `Demo{Stage,Specimen,Interaction,Matrix,Composition}` — under Candidate A the five ARE DemoFrame's
  `variant` union (the oracle asserts the vocabulary EXISTS + each surviving page declares exactly one
  sub-type per demo block); under Candidate B they land as five named preset compositions over
  ShowcaseFrame/StorySection (same assert, different carrier). Either way the sub-type is a MANIFEST-
  READABLE fact (a `subtype` field or the variant prop — greppable), refined from the real Pass-E
  classification of the reduced set.
- **The classification sweep:** every one of the ~88 surviving pages is classified into sub-types at
  migration time (the conformity-with-variation mechanism — DEFERRAL-LEDGER §D's cure); a page that
  fits none is a design finding routed to F7.1's taxonomy, not a sixth sub-type (the union is closed).
- **The WS11 roster step is SUPERSEDED where landed:** `bg-gestalt-roster` re-point landed at 0.2
  (DONE) — the WS11 "create the roster" step becomes "ENROLL the four storybook surfaces
  (rail · entrance · page-API · suffuse-variance) in the EXISTING roster," before 17.6.
  The WS11 wave-4 suffuse D2 chrome lift is NOT this wave's (it has no frozen row — fold-candidate,
  §7-FC2); ONLY the R2 field-hue re-home rides here (WS11 assigns it to the page-API commit).
- **Gate arm (`proof:demo` · `story-page-api`):** the AST single-root oracle over the FULL routed
  catalog (StoryPage/CategoryPage/StoryHeroBackdrop each single-root) + the sub-type-vocabulary assert
  (5 members, closed union, every page classified) + the WS11 §2C′ battery-zero-red bar.
- **Fable arm:** the sub-type SET verdict — the five sketches rendered (one representative page per
  sub-type), judged as ONE anatomy family with natural variation. **DesignSync surface:** the chassis
  compositions — the 5-sub-type card set, both modes.
- **Paint close (WS11 §5 arm 3, verbatim):** the content-page grid-wash regression (a non-hero
  forms/grid route renders its full-bleed wash — the BC.W-GRID-SIMPLE fence); the constellation-hero
  B16 bleed-lift survives both modes; the per-category preview-card hue VARIANCE captured (R2 landed);
  + the `compositions/hero` → D0 fold's hero-fit re-capture (§3.4; 2.6's envelope re-verified).
- **Preconds:** F7.1/F7.2 (the sub-types coordinate with the chassis winner).

### 16.1 · `W-SCROLL-PROGRESS-GLASSY` [P] — the storybook chrome is jewelry

**The mechanism is WS11 §2A VERBATIM** — the `scroll(nearest block)` clip-revealed `@property
--scroll-fill` rail; the CC-reference FLAT leading edge (`clip-path: inset(… round pill)`); the
mode-aware per-mode fill pair (dark = bright high-L `oklch(0.92 0.05 h)`, NEVER `light-dark()` — the
inset trap); the F-R6 WebKit weak-frost RESOLVE (`--scroll-rail-blur` thicker frost + tint floor,
resolve-not-punt); the minted tokens (`--scroll-rail-thickness` 0.625rem √φ-proportioned,
`--z-scroll-rail` < `--z-dock`); the positional JS fallback (`useScrollTrigger`, gated on
`!supportsScrollTimeline()`); the SpringProgress glint (PRM-dropped); `prefers-reduced-transparency`
→ solid.

**What the perfected spec ADDS:** the award-craft framing — the rail is checklist item #7's machine
anchor AND the most-seen glass surface in the product (present on every page); its verdict is filed
as its own enrolled surface (the WS11 roster enrollment, via 16.3). PT-A runs FIRST (the R6 linchpin:
the frost VISUALLY diffuses on real WebKit 26 over REAL content at the 10px strip; falsifier → the
firm-tint non-frost bar with the same fill graphic).

- **Gate arm (`proof:demo` · rail):** `railHealth()` (the `grew` killer tooth — the fill never
  exceeds scroll progress) GREEN chromium AND webkit, production DOM, forced-JS-fallback arm;
  `scroll-rail.spec.ts` enrolled in the webkit `testMatch`.
- **Fable arm:** the rail gestalt — thick-glassy, caps undistorted 0→100%, the fill reads as light in
  the channel (CC-faithful) in BOTH modes. **DesignSync surface:** storybook chrome — the rail over
  three real pages (light content · dark content · live-field page), both modes, both engines.
- **Paint close:** WS11 §5 arm 1 verbatim (railHealth + the VISUAL frost capture, non-authoring, real
  GPU, Chrome AND real WebKit 26, both modes; fill ≥3:1 as a graphic against the frosted track).
- **Preconds:** — (may run early; re-capture after 16.3's shell collapse is owed and rides 17.6).

### 16.2 · `W-SECTION-TYPEWRITER-FADEUP` [P] — headings arrive with weight

**The mechanism is WS11 §2B′/§2B′.3 VERBATIM** — the decouple (page-level `.scroll-cascade` drops;
heading = `SplitChars(:stagger=false)` + IO-gated `gl-char-rise`; body = `.scroll-cascade` `view()`
cel-cascade); the two in-fence src edits (`SplitChars.vue` `stagger?: boolean` default-true;
`--char-stagger-step` 30ms minted in `scheme-motion.css`, re-pointed in
`src/styles/typography/utilities.css`); the demo-private `useSectionReveal` singleton (ONE observer +
ONE listener pair per page via provide/inject; the four sweep hooks incl. the F5 adverse-order
mount re-sweep; the shipped throttle; the INVERTED FOUC-safe floor — no-JS/no-IO → VISIBLE).

**What the perfected spec ADDS:**
- **The reinterpretation RATIFIED for this lane (WS11 flag #4, carried to the user):** section
  headings use SplitChars `:stagger=false` + `gl-char-rise` (a bouncy per-char spell-out on ~279
  sections violates the calm-materialization read + restraint #10); `useTypewriter` is HONORED at
  exactly ONE surface — the D0 front-door hero (§3.1), where kinetic type IS the identity beat
  (fleet2 §4.3's "almost never in production" survives as "exactly once, as the signature").
- **The congruence bar is checklist #7's second half:** heading (IO, threshold 0.15) × body (native
  `view()`) fire CONGRUENTLY on the same section — verified via `getAnimations()`-per-node, both
  engines; a visible desync FAILS the wave, not just the verdict.
- **Gate arm (`proof:demo` · entrance):** the `getAnimations()`-per-node congruence probe (chromium +
  webkit) + the strand-proof (F5 adverse-order restoration — restore AFTER mount-settle, true reload,
  no scroll event → every passed heading VISIBLE) + FOUC-clean.
- **Fable arm:** the entrance gestalt — the heading materializes (glyphs rise ~0.4em on
  `--spring-smooth` + `--char-stagger-step`), the body cels follow in overlap (law #5), nothing pops.
  **DesignSync surface:** the storybook section entrance — a scroll-through screen recording of one
  long page, both modes.
- **Paint close:** WS11 §5 arm 2 verbatim (PT-D against the LIVE `SplitChars(:stagger=false)` mount;
  the combined disjoint entrance; both engines both modes; PRM = terminal-visible, zero rise frames).
- **Preconds:** — (pairs with 16.1; re-verified over 16.3's shell).

### 17.6 · `W-PAGE-COMPONENT-AUDIT` [P] — the 480-capture cross-page gestalt close

**The choreography (the perfected spec's core add — per-category convergence over the REDUCED set):**

- **The capture arithmetic, stated once (the binding figure):** the reduced set is 99 routes (88
  stories + 11 landings, §F7.1) × 2 modes × 2 engines (Chromium CDP Metal + WebKit WKWebView, the
  PROVEN `?capture=` harness) = **396 base captures**; + the 7 un-converged categories' convergence
  re-captures (fix → re-shoot ≈ 60-80) + the 4 flagship scene frame-series ≈ **~480 captures**. The
  "480" is the BUDGET, not a quota — the close bar is verdicts-filed + battery-green, never a count.
- **The per-category convergence pass (the GA-10 amend, run in ACT ORDER §3.1):** the 7 un-converged
  Pass-E categories — display · containers · data · feedback · navigation · compositions + the motion
  gestalt — each get the full engine: **capture sweep** (every route in the category, 4-way) →
  **3-context audit** (three parallel opus lenses per page batch, batched-3) → **synthesis** →
  **the Fable per-category gestalt verdict** (a NON-AUTHORING Fable instance files the F8.6 3-axis
  verdict per landing + representative pages, citing the §3.3 checklist as axis evidence + the
  screenshot-for-Apple summary line) → **fix-clauses routed to the OWNING family wave** (a glass
  defect → F2's wave, a motion defect → F5's — findings become CLAUSES, never new waves; the overhead
  floor) → **re-capture the fixed surfaces** → PASS. The 4 already-converged categories
  (dock/forms/foundations/substrates) get the capture-VERIFY only (fresh 4-way captures re-earning
  their existing verdicts).
- **The 17.3 fold (R16 — capstone ≤4):** the busy-aurora forward criterion (design-language-unify)
  rides as ONE clause in every category verdict: *no route's field COMPETES with its protagonist*
  (restraint #10's field arm).
- **Gate arm (`proof:warm-identity` · the route battery):** each category's landing + representative
  routes enrolled in F8.2's dominant-hue-over-a-route-region battery, BOTH modes both engines; the
  per-category verdict files exist with all 3 axes + telos + restraint-check (the `edict-verdict-
  present` clause, shared with F8.6 — one machine arm, two consumers).
- **Fable arm:** Fable owns the per-category gestalt verdicts — the design-quality judgment IS the
  wave. **DesignSync surface:** the 7 categories' landing + representative pages as review card sets
  (the enrolled route captures ARE the cards, per F8.2's model).
- **Paint close:** the harmonized-whole read — the full act-ordered click-through captured as a
  screen recording (the arc legible end-to-end: warm everywhere, one protagonist per page, congruent
  entrances, the rail filling); every category verdict PASS or its fix-clause landed + re-shot. This
  wave REPLACES the abolished terminal reflect funnel — nothing defers to it.
- **Preconds:** F7.1 (audits the reduced set).

### F8.6 · `W-ARISTOTELIAN-PROPORTION` [P] — the acceptance language (SHARED — the demo-lane half)

**KS-MOTION-DISNEY §3.4 owns the template (GOLDEN there; the verdict file shape, the 3 axes, the
anti-boilerplate + capture-resolves floors, the `edict-verdict-present` machine arm on `proof:meta`).
This lane FORKS NOTHING.** The demo-lane half:

- **The demo roster contribution:** the enrolled surfaces from this lane = the 11 category landings +
  the D0 front door + the 4 flagship compositions + the 2 storybook-chrome surfaces (rail · section-
  entrance) = 18 verdict files, each on the SAME template.
- **The evidence convention (§3.3's GOLDEN):** for a demo surface, the telos line names the page's
  PROTAGONIST + its act (`telos: stage the metrics family as one working ledger — act V`); axis-1
  cites proportion evidence incl. checklist 1/2 (first-paint, one-protagonist, φ² dominance); axis-2
  cites 3/6/7 (live-not-static, disclosure, scroll choreography — with the 16.1/16.2 machine reads as
  evidence); axis-3 cites 8/9/10 (warm both modes, restraint both directions). The screenshot-for-
  Apple line closes every demo verdict. Zero new fields; zero new axes.
- **Fable arm:** the non-authoring Fable judge files the 18 demo-lane verdicts (17.6's category pass
  produces them — one filing, two waves satisfied). **DesignSync surface:** the enrolled roster
  captures (shared with F8.2/17.6 — the same cards).
- **Preconds:** F8.2 + F8.3 (cursor).

---

## §5 — Precepts conformance (explicit checks)

- **motion-canon P1-P7:** the demo consumes, never re-mints — section entrances on `--spring-smooth`
  + `--char-stagger-step` (P1 spatial/spring, P3 coupled fade, P4 per-spring clock); the rail fill is
  `clip-path` + the glint `transform` (P5 compositor-only; `proof:no-layout-animation` widened to the
  demo surface per WS11 §3); exits/reveals no-overshoot where exit (P2); PRM = terminal-visible
  entrance, static typewriter, rail stops interpolating (P6). The D0 typewriter is the ONE sanctioned
  loud kinetic-type register (exaggeration earned — law 10).
- **tunable-anim:** every demo feel knob is a token (`--scroll-rail-thickness`/`--scroll-rail-blur`/
  `--char-stagger-step`/`--rail-fill-*`); no wall-clock literals in demo JS (the `useSectionReveal`
  throttle is a perf guard, not a feel knob — recorded).
- **design-idioms:** token-first (the warm field per-category hue via `--card-field-h`/`warmFieldHue`
  — one write source, WS11 R2); substitution-vs-inheritance respected (the rail's per-mode fill pair
  is plain per-mode arms, NEVER `light-dark()` inset fragments — the memory trap); clean breaks (the
  loser chassis DEFINITION-ABSENT; StorySectionHeader deleted; no alias); Tailwind-first (the demo
  authors via `@theme`+utilities, no raw CSS pastes).
- **Cross-cutting folded rules:** overhead floor (the warm-field fix, the act eyebrow, the narrative-
  copy pass, the 17.3 busy-aurora criterion all ride as CLAUSES); gates as FAMILY arms (every arm here
  is a `proof:demo`/`proof:warm-identity`/`proof:meta` case row — ZERO new singleton scripts; net-
  negative holds); Fable arm + DesignSync surface on EVERY row above (incl. the optional F7.3 spot-
  verdict — the cursor's "—" stands as the formal floor); ≥2-consumer (the family register, the
  sub-types, and `useSectionReveal` are demo-private — no public mint; the J-inv-10 bar untouched);
  presets-in-consumers (the demo's warm-field presets and flagship scene data are DEMO-LOCAL; no
  library token minted for a demo hue); the foreign-tree fence (no sibling edits; the speedtest-class
  Instrument scene composes published primitives only).
- **Protected set:** the `?capture=` harness · `liquid-playground.vue`'s protected composition (4.11)
  · `morph-showcase.vue` (the 4.10 fence) · landed F1/2.6 rows re-captured, never re-plumbed ·
  DOCK_SPRING untouched (nothing in this lane reads it) · the disposition ledger + `--run full` cut
  discipline unaffected.

---

## §6 — The demo gestalt bar (the acceptance language every paint verdict is judged by)

**The product bar: a stranger screenshots ANY page and it reads as a designed product — the
[§3.3 checklist] is the rubric, filed through the F8.6 3-axis template (one language).**

- **√φ proportion** — one φ²-dominant protagonist per page; the depth ladder (D0 mega → D3) legible;
  the rail at the √φ-proportioned 10px; the bento's per-card rhythm on the ladder; heading/body/
  caption rungs never improvised.
- **Animation laws** — the page ASSEMBLES (field → chrome → hero → sections, staged, overlapped —
  laws 1/5); headings materialize with weight, bodies cel-cascade in congruence; ONE motion event
  owns each beat; the D0 typewriter is the sanctioned exaggeration; everything interruptible,
  everything PRM-confirmable.
- **Technicolor cartoon-punch, warm** — the warm field behind every glass demo, per-category hue
  VARIANCE inside the warm clamp (the rainbow fork is the USER's — §7-Q3); dark mode is luminous-dark
  co-equal; cerulean staging is dead; one color event per surface; the flagships earn their gold
  (CompletionSeal) and violet (motion) exactly where the telos demands.
- **The narrative read (this lane's own bar)** — the five acts legible from the door AND from any
  deep link (the act eyebrow); no spec-sheet page survives: every surface is live, staged, and
  captioned with intent; compositions closes the show with four scenes each worth a Site of the Day.
- **Dual-engine, both modes, non-authoring** — every binding capture Chromium (Metal) + WebKit 26,
  light + dark, judged by a non-authoring Fable instance; a green mechanism with a broken gestalt is
  an automatic FAIL.

---

## §7 — Fold-candidate notes + open questions (for the orchestrator — never self-inserted)

**Fold candidates (notes, not rows):**
- **FC1 · `compositions-flagship` scope:** the §3.4 four-flagship build rides F7.1 as its compositions
  clause; if the orchestrator judges it over F7.1's budget, it wants its own row (the wave set is
  frozen — flagging, not inserting).
- **FC2 · WS11 wave-4 suffuse (D2 mode-aware chrome lift):** has NO frozen cursor row; the R2 field-hue
  re-home rides 16.3 (WS11's own assignment), but the dark bright-tile lift (L 0.55-0.65 / C 0.13-0.15)
  is homeless — fold as an F7.1 bento clause or drop-with-trigger.
- **FC3 · category act-RENAMES:** §3.1 keeps ids; if the user wants the acts as visible nav group
  headers ("The World", "The Proof"), that is an F7.1 clause — noted for the DesignSync review.

**Open questions:**
1. **The F7.2 pilot-set confirm** — the 5 pilot pages (§3.2) acceptable as the DesignSync decision
   set? (The lean is Candidate A; the falsifier is paint-first.)
2. **The warm-clamp vs RAINBOW bento fork (WS11 flag #3)** — the user's call; §3.3 #8 assumes the
   warm clamp (Option A) until ruled.
3. **The `useTypewriter` reinterpretation (WS11 flag #4)** — ratified here for section headings
   (§4-16.2) with the D0 door as its one honored home; owed a user confirm.
4. **The `compositions/hero` → D0 fold** touches landed 2.6 W-HERO-FIT surfaces — the hero-fit
   envelope re-capture is assigned to 16.3's paint close; confirm that owner (vs F7.1).
5. **The 480 figure counting** — this spec binds it as BUDGET (396 base + convergence re-shoots +
   flagship series, §4-17.6); confirm the cursor's "480-capture" reads the same way.
6. **F7.3's optional Fable spot-verdict** — the cursor marks F7.3 fable "—"; this spec adds a light
   non-blocking spot-verdict. Confirm it stays advisory (no cursor edit).

---

## REVISION — 2026-07-01 (post-critique, `critique/AWWWARDS-crit.md` applied)

Critic verdict 90%, no CRITICAL, zero disk-false claims; 3 MODERATE + 2 LOW, all applied surgically:

- **M1 (warm-field vs the Pass-E lens rationale):** §1 + the facility map + checklist #4 + F7.1(5) +
  the `field-warm-default` bite now ENGAGE `DockStage.vue:30-35`'s documented lens-needs-color
  rationale instead of overriding it — the swap target is a **warm-but-HIGH-CHROMA** field (dominant
  OKLab hue in `[25,95]`, dominant-mass chroma ≥ 0.9× the OPENAI_SKY baseline), the DockStage comment
  is updated in the SAME wave, and the bite carries a chroma floor beside the hue read (a
  warm-but-dead field reds).
- **M2 (StoryPageShell circularity):** F7.2(3) now lands the unified header PRE-16.3 on the winning
  anatomy's chrome; 16.3 CARRIES it into StoryPageShell (the header travels, never re-authored);
  "StoryPageShell's chrome slot" restated as a destination note, not a precond.
- **M3 (double-owned StorySectionHeader re-points):** ownership split stated both ways — F7.2 solely
  owns the delete + the two allowlist re-points (M9d as a clause RETIRE/repoint + `proof-page-
  hierarchy.mjs:83`); 16.3's inherited §2C′(e) matrix is bound MINUS those two rows (StoryHERO-reader
  set + SectionLanding fold only).
- **L1:** the WS11 §0/§8 WS1+WS4 src-edit hard-gate restated in the §4 DAG paragraph (confirm-or-hold
  at every 16.x open).
- **L2:** display merge-row rephrased — `atoms` is the NEW merge target, not a keep.

The greenfield loop (§3.1-§3.4), the page-set math, the wave set, and all preconds are unchanged.
