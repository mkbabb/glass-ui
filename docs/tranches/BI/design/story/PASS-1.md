# PASS-1 — D-STORY: the codified storybook meta-component system

Pass-1 synthesis over three independent family returns (STORY-A "pages as data", STORY-B "hardened kit", STORY-C "tiles + code"). Ground truths re-verified on disk at HEAD (tranche/BG): `demo/chassis/{page,hero,section,showcase,code,landing,family,play}/` all exist as claimed; `demo/chassis/hero/story-hero.css` carries the real `@supports (animation-timeline: scroll())`-gated `.story-hero-shrink` with `--title-collapse-scale: 0.82` (BG.W-SCROLL-SHRINK-UNIFY — the shared `title-collapse` keyframe); `demo/stories/manifest.ts` is already chrome-as-data (`s()` factory, ~131 rows, `displayTitle`/`background`/`heroScale`/`depth`); `demo/chassis/code/CodeBlock.vue` paints plain fira-code with ZERO highlighting; adoption at HEAD: ~98/150 story SFCs reference `StorySection`, exactly 1 references `CodeBlock`, the 5 demo-KIND wrappers (`DemoStage/Specimen/Matrix/Interaction/Composition`) are ~1-consumer each. The gate wall exists: `scripts/proof-{story-language,code-blocks,page-chassis,page-hierarchy,storybook-{ia,meta,complete},hierarchy}.mjs`.

## 0. The requirement decomposition, mapped to current state

| Requirement | State at HEAD | Owner in this spec |
|---|---|---|
| Shrink-on-scroll title (not fade-only), bidirectional | **BUILT + gated** (`.story-hero-shrink`, compositor scale+translate on native `scroll()`, PRM-carved; `proof:page-chassis` PC1 reds font-size in the shrink keyframe). Residual: policy encoding + binding-chain integrity | §4.4, G7 |
| Landing tiles show LIVE real components, no wasted icon space | **NOT MET** — `SectionPreviewCard` keys off per-CATEGORY `previewKind` (`category-hero.ts` glyph/field/control/surface/metric), so sibling stories paint the same silhouette + a repeated IconChip | §4.3 (STORY-C mechanism), G5 |
| Code properly sized + syntax-highlighted (hljs, house pattern) + standardized every page | **NOT MET** — register exists (`Code`/`CodeBlock`), zero highlighting, 1/150 adoption; `proof:code-blocks` itself records the tree sweep as booked-not-done | §4.2, G2/G3/G4 |
| Demo bodies demarcated with veil cards + dividing lines | **PARTIAL** — StoryPage body-cel hairlines + `ShowcaseFrame` tiers exist; 27 adopters; not structural | §4.1, G9 |
| Bidirectional scroll animations | **PARTIAL** — `.scroll-cascade` rides `view()` (bidirectional by construction); the `useSectionReveal` IO glyph-reveal is one-shot entrance — policy call owed | G7 |
| NO meta language ever | **GATED but under-scoped** — `proof:story-language` scans story SFC prose; does not scan manifest string fields; pattern set missing kf/gate/design-axis codenames | §4.5, G6 |
| No outrageously-sized specimens | **NOT MET** — full-width triggers live in the tree; no structural size knob | §4.1 (`SpecimenSize` + w-full ban), G4 |
| Real usage permutations with affordance | **BUILT, unadopted** — `DemoMatrix` exists at ~1 consumer; no data driver | §4.1/§4.6 |
| Codified (structural, not conventional) | **PARTIAL** — the chassis exists; adoption is voluntary | §5 gates |

The headline synthesis fact: **all three families independently concluded extend-don't-greenfield**. The BG.W-STORY-PAGE-API chassis is sound; D-STORY is (a) three unbuilt mechanisms (highlighting, per-story tiles, the body driver), (b) adoption enforcement, (c) one genuine architectural fork — SFC bodies vs manifest bodies.

## 1. Verdict table

| Family | Verdict | Why (one line each way) |
|---|---|---|
| **STORY-B "hardened kit"** | **ADVANCE — the floor** | Highest-confidence, lowest-risk; its 5-primitive consolidation (StoryPage · StorySection · SpecimenFrame=ShowcaseFrame+DemoSpecimen fold · PermutationGrid=DemoMatrix · Code/CodeBlock), migration mechanics (~35-45 SFCs, mechanical), and enforcement battery (`proof:story-kit`, w-full ban, code-register tree-global, lexicon extension) are needed REGARDLESS of the STORY-A outcome. It is also the named fallback if A's ratio probe fails. |
| **STORY-A "pages as data"** | **ADVANCE — the bounded structural bet** | The one genuinely competitive alternative architecture: `Story.body: StoryBody` manifest bodies + the `StoryScope` controlled-state harness + the `permute` cartesian grid make "real permutations, no oversize, no meta prose" enforceable by CONSTRUCTION (un-expressible, not gate-caught). Correctly scoped: it targets the SPEC-SHEET page class only, with a `bespoke: Component` escape for editorial/scene pages. Lives or dies on the G1 ratio probe. NOT premature to keep: A renders INTO B's primitives, so advancing both costs one schema module + one renderer, not two chassis. |
| **STORY-C "tiles + code"** | **ADVANCE — folded as mechanism owner (not an independent architecture)** | C is not a competing page-body model; it is the most-developed owner of two mechanisms both survivors need: (1) the per-STORY live tile with the exact 8-item fence list (inert · aria-hidden · pointer-events:none · container-type fit over transform-scale blur · contain · 0-GL frozen stills · no-select · rest-state) and the 0-GL landing budget; (2) the lazy-runtime hljs decision + the token-derived warm-crayon theme (the value.js `hljs.css` pattern, explicitly NOT the keyframes.js head-`<style>` swap value.js already retired). Its iframe/static-capture rejections are adopted as recorded decisions. |

No family is BANKED, BLOCKED, or RETIRED. What IS retired inside the composition: `category-hero.ts`'s per-category `previewKind` specimen fallback (→ per-story tiles, clean break); `DemoSpecimen.vue` (→ folded into ShowcaseFrame/SpecimenFrame at its 1 call site); the unhighlighted raw `<pre class="fira-code">` body of CodeBlock (→ highlighted, same box); the lead IconChip as tile hero (→ demoted to corner identity mark or dropped).

## 2. The leading composition (how the families hybridize)

```
        STORY-B (the floor)                      STORY-A (the bet, on top)
  ┌──────────────────────────────┐        ┌────────────────────────────────┐
  │ 5-primitive kit + gates      │◄───────│ StoryBodyRenderer dispatches   │
  │ StoryPage → StorySection →   │ renders│ SectionSpec[] INTO the kit     │
  │ SpecimenFrame/PermutationGrid│  into  │ primitives; StoryScope harness │
  │ → Code/CodeBlock             │        │ owns v-model; bespoke escape   │
  └──────────┬───────────────────┘        └────────────────────────────────┘
             │ both consume
  ┌──────────▼───────────────────┐
  │ STORY-C mechanisms           │
  │ • per-story live tiles       │  tile resolution ladder (reconciles A vs C):
  │   (fence list, 0-GL budget)  │  manifest marquee SpecimenSpec (auto, data pages)
  │ • lazy hljs + warm crayons   │  → co-located <id>.tile.vue (authored, bespoke pages)
  │   (static .dark-keyed theme) │  → frozen Canvas2D/auroraFallbackGround still (GL viz)
  └──────────────────────────────┘
```

Concretely:

- **B is unconditional.** The kit consolidation, the adoption/lexicon/w-full/code-register gates, and the ~35-45-SFC mechanical migration ship in the tranche regardless of A's probe outcome.
- **A rides B.** `StoryBodyRenderer` emits `<StorySection>` → `<SpecimenFrame>`/`<PermutationGrid>` → `<CodeBlock>` — zero new visual primitives. If G1 passes (≥70% pure-data on the spec-sheet class), the spec-sheet pages migrate to `body: {kind:"sections"}` rows and their SFCs are DELETED; if it fails, A collapses honestly to today's chrome-as-data + B's hardened SFC bodies, and only `story-body.ts` + the renderer are discarded (bounded blast radius by design).
- **C plugs into both.** The tile mechanism replaces `category-hero.ts` previewKind on the landing (`SectionPreviewCard` renders the resolved tile as HERO); the hljs mechanism lands inside `CodeBlock.vue` once, serving both SFC-authored and manifest-authored code.

## 3. File-path plan (composed)

NEW:
- `demo/chassis/body/story-body.ts` — `StoryBody`/`SectionSpec`/`SpecimenSpec`/`SpecimenSize` schema + the `StoryScope` reactive model bag (A).
- `demo/chassis/body/StoryBodyRenderer.vue` — section dispatch + `permute` cartesian expansion with per-cell isolated models + auto `aria-label` from the prop combo (A).
- `demo/chassis/code/useCodeHighlight.ts` — lazy `import("highlight.js/lib/core")` + 3-4 grammars (ts/css/bash/xml-vue), scoped to the component's own `<pre>`, idempotent marker attr (C runtime model; keyframes.js shape minus the theme swap).
- `demo/chassis/code/hljs-house-theme.css` — STATIC token-derived crayon theme: `--code-{keyword,entity,string,number,comment}` reading `--section-color-*`/`--viz-*`/`--foreground`/`--on-glass-muted-strong`, `.hljs-*` → `var(--code-*)`, plain `.dark` arm (the light-dark() trap avoided; the value.js pattern re-crayoned warm-cream, NEVER GitHub colors, NEVER a head-`<style>` swap).
- `demo/stories/<cat>/<id>.tile.vue` (bespoke-page tiles only) + the manifest `tile?: () => Promise<Component>` field via the existing `makeLazy`/`import.meta.glob` pattern (C).
- `scripts/proof-story-kit.mjs` — the composite adoption gate (B), born-RED.

EXTEND IN PLACE (no parallel gates — the extend-not-remint law):
- `demo/stories/manifest.ts` — `Story` gains `body?` + `tile?`.
- `demo/chassis/page/StoryPage.vue` — `<slot/>` becomes `<StoryBodyRenderer :body>` when `body.kind === "sections"`; stays slot/bespoke otherwise.
- `demo/chassis/showcase/ShowcaseFrame.vue` → SpecimenFrame: absorbs DemoSpecimen's header (label/heading/blurb) + glass-tier axis; gains the `size` cap (`sm|md|prose|fluid`, default `md` — `fluid` must be declared).
- `demo/chassis/code/CodeBlock.vue` — paints the raw fira-code `<pre>` from frame 0 (real text), swaps highlighted innerHTML when the lazy chunk resolves; identical box (`--card-pad-*`, `--type-small`) so the swap recolors only.
- `demo/chassis/landing/SectionPreviewCard.vue` — renders the resolved tile as hero inside the fenced stage; IconChip demoted.
- `scripts/proof-story-language.mjs` — pattern set += bare `kf`/`gate`/`design-axis`/sibling-repo-as-codename; scan scope += manifest STRING fields (heading/blurb/label/code.src), never render-closure source.
- `scripts/proof-code-blocks.mjs` — C2/C3 promoted enrolled→tree-global behind the code-vs-content classifier + a highlight-present bite.
- `scripts/proof-page-chassis.mjs` — += the bidirectional/native-timeline/no-scroll-lib bite + the dual-register (shrink vs scroll-away) policy assert.

RETIRE (clean break, no alias): `category-hero.ts` previewKind specimen arm · `DemoSpecimen.vue` · raw inline `<code class="fira-code">` runs in stories (post-classifier true-offender set) · per-story hand-rolled section headers.

DEP: `highlight.js@^11.11.1` in **devDependencies only** (demo builds via `demo/vite.demo-dist.config.ts`, never enters `dist/glass-ui.js`; both siblings already pin it — house-blessed).

## 4. Mechanism spec (load-bearing details)

### 4.1 Specimen discipline — structural, not conventional
`SpecimenSize` default `md`; `fluid` is an explicit declaration, so an outrageous full-width trigger is un-expressible by default (A) AND gate-caught in SFC bodies (B's w-full ban: an interactive trigger that is a DIRECT specimen child of SpecimenFrame/PermutationGrid may not resolve to article width — binding truth is a π clientWidth measure, not a class grep; auth-shell/gate-pattern compositions named-allowlisted). Demarcation: StorySection hairlines + the SpecimenFrame plate; the specimen host's quiet plate maps onto the shared surface axis (the veil register is `surface="veil"`'s borderless legibility plate — read it, never fork a demo-local veil recipe).

### 4.2 The code register
Runtime-lazy hljs is the LEAD model (C's argument holds: glass-ui snippets are authored inline literals, not `?source` file imports — value.js's build-time plugin operates on files); B's build-time variant is RACED in P1 and wins only if it proves non-fiddly for inline strings. Either way: static cascade-driven theme (zero wrong-theme first paint — the value.js post-mortem), real selectable text (copied text === source), fira-code box identical pre/post swap (CLS 0), prose-measure max-inline-size, `overflow-x:auto` + FadingScroll edge cue, copy affordance kept.

### 4.3 Live tiles
Per-STORY tile resolved by the ladder in §2, mounted in the fenced stage (the full 8-item fence). The landing mounts **0 GL contexts** (every GL-viz tile is the frozen `vizPreviewStill`/`auroraFallbackGround` data-URI raster — an honest single-paint, not a masking fallback) and **0 tab stops inside tiles** (whole tile = ONE RouterLink, title = the one accessible name). Specimens render at REST (no own rAF on a landing). Fit is container-query units at real layout size — `transform:scale` only as last resort (text blur).

### 4.4 Shrink + scroll choreography
Already codified; this spec ENCODES the policy rather than rebuilding: content pages carry `.story-hero-shrink` (scale-led, fade opens only past the 160px pin), hero/viz pages carry `.story-hero-scroll-away` (the prior explicit user fix — a giant title pinned over a viz was the defect). Both are native `scroll()`/`view()` timelines → bidirectional by construction; the gate asserts BOTH registers by page variant + no Lenis/GSAP/rAF scroll engine import. Gap-engine degrade: static large sticky header + static-visible sections (honest reduced form, no masking).

### 4.5 The no-meta lexicon
`proof:story-language` extended to the manifest's string fields and the new codename patterns, scoped so a `--spring-dock` token, an `@mkbabb/glass-ui/dock` subpath, or a component name inside a CODE field stays green (legit forward-refs), while a planted tranche-code in a blurb reds. Render-closure/SFC script source is out of scope (component identifiers are not user-facing copy).

### 4.6 Permutations with affordance
`PermutationGrid` (=DemoMatrix, given A's data driver): `permute: {prop, values}[]` expands to a bounded labeled cartesian grid (6-12 cells typical), each cell a REAL library instance with its own isolated model + auto `aria-label` from the combo. This is the structural answer to "every component page shows real usage permutations".

## 5. Codification (the gate battery)
`proof:story-kit` (NEW, born-RED): A1 every manifest-enrolled route composes StoryPage AND labeled sections are StorySection; A3 the w-full specimen ban (π-measured); A2 code-register tree-global (classifier-gated) + highlight-present. Extended in place: `proof:story-language` (G6 scope), `proof:code-blocks` (tree-global), `proof:page-chassis` (dual-register + bidirectional + no-scroll-lib). If A survives G1: `proof:story-language` reads manifest fields as the primary prose surface and the schema itself becomes the strongest gate (violations un-expressible). Every new gate clause carries a self-test bite (plant one violation of each class; the detector must flag it).

## 6. Open-gap register (convergence blockers — pass 2 must close each)

- **G1 — the data:escape ratio (STORY-A viability).** Migrate 10 pages (5 spec-sheet: forms/inputs, display/badge, feedback/alert, data/table, forms/select; 5 varied); measure pure-data vs render/bespoke escapes. PASS bar: ≥70% pure-data on the spec-sheet class AND total schema fields ≤~20 (a per-page quirk field = the Vue-in-JSON anti-pattern → that page goes bespoke). FAIL → A retires to chrome-only manifest; B's SFC bodies stand alone.
- **G2 — hljs delivery mechanism.** Build-time (value.js `vite-source-export.ts` shape over inline literals) vs lazy-runtime (dynamic import, raw-text-first). Decide by: inline-string fiddliness, CLS across the raw→highlighted swap (must be 0), `proof:lighthouse` floor unchanged, critical-path weight 0.
- **G3 — crayon contrast on translucent glass.** Every `.hljs-*` crayon (comment = worst case) must clear AA ≥4.5:1 / APCA ≥60 over the COMPOSITED `.glass-quiet` plate in BOTH modes — the on-glass-fg collapse class. Measured via the house paint-arm OKLab readback, not source inspection.
- **G4 — the classifier boundaries.** (a) Code-vs-mono-content over the ~43 fira-code files (font specimens/terminal output/ascii are legit mono CONTENT, not code) — census, classify, born-RED set = true offenders only. (b) The w-full specimen-vs-composition split — enumerate, classify, named allowlist. Both need self-test bites (one planted instance of each class).
- **G5 — tile mechanism reconcile + cost.** The A-auto (manifest marquee specimen) vs C-authored (`.tile.vue`) resolution ladder must be proven on real tiles; authoring cost extrapolated across ~131 rows; the fence verified live (landing `getContext('webgl2')` count == 0, Tab never enters a tile, no hover bleed); stale-tile risk owned by the gate (every row resolves a tile or a frozen still).
- **G6 — lexicon extension precision.** The extended gate must red planted blurb violations while greening planted legit refs (token names, subpaths, code samples) — a RED/GREEN split run over a migrated manifest.
- **G7 — scroll policy + integrity.** (a) Encode shrink-register-on-content / scroll-away-on-hero as the gate's dual assert (the literal "every page shrinks" read is WRONG — the scroll-away is a prior explicit user decision). (b) The binding-chain probe: on EVERY route, `.story-hero-shrink` resolves real monotonic `scroll()` progress against `<main>.demo-main-scroller` with no transformed/overflow/contain ancestor in the chain (the silent sticky+timeline killer — the BG re-parenting class). (c) Decide the bidirectionality policy for the one-shot IO glyph reveal: body builds ride `view()` (bidirectional); the per-glyph heading entrance is an ENTRANCE, not a scroll animation — record the ruling either way.
- **G8 — migration blast radius.** The StorySection swap + DemoSpecimen fold change DOM structure → may shift tests-visual π specs, gestalt-roster captures, reveal timing, heading hierarchy. 3-page probe (one forms, one data, one display) with tests-visual re-run + axe + fresh dual-engine capture BEFORE the ~35-45-page rollout.
- **G9 — sub-type taxonomy disposition.** DemoSpecimen folds (decided); DemoInteraction/DemoComposition must each earn ≥2 genuine distinct uses in the migrated set or fold into SpecimenFrame slots (the ≥2-consumer bar applied to the chassis itself).

## 7. Pass-2 prototype slate

| # | Family | Builds | Proves (gap) |
|---|---|---|---|
| **P1** | C (+B variant raced) | `useCodeHighlight.ts` + `hljs-house-theme.css` + CodeBlock upgrade; a real TS import snippet on 3 pages; the build-time variant raced on the same pages | G2 (delivery + CLS 0 + Lighthouse), G3 (paint-arm crayon readback, both modes) |
| **P2** | C | 3 real per-story tiles on the /display landing — Button variant cluster, real Card, mini GlassDock (the heaviest case) — via the resolution ladder + full fence; landing instrumented | G5 (0-GL count, tab-order, fit-not-blur, IconChip demotion) |
| **P3** | A | `story-body.ts` + `StoryBodyRenderer.vue` + StoryScope; migrate forms/inputs (pure-data floor), display/badge (flagship permutation grid), feedback/alert (variant matrix); typography + dock/overview kept `bespoke` (prove the escape renders byte-identically with manifest-owned chrome) | G1 (ratio + field count), §4.6 (per-cell aria-label, no fluid specimen) |
| **P4** | B | `proof:story-kit` born-RED + the classifier censuses (fira-code + w-full) + lexicon extension with planted RED/GREEN fixtures; 3-page full-kit SFC migration with tests-visual + axe + dual-engine (Chrome+Safari) capture | G4, G6, G8, G9 |
| **P5** | B/C | The route-walk scroll probe (monotonic shrink progress + ancestor-chain assert, every route) + the dual-register gate encoding + a PRM-on capture | G7 |

Sequencing: P1/P2/P5 are independent and parallel; P3 depends on P4's SpecimenFrame fold landing first (A renders into B's primitives); P4's rollout decision waits on P3's ratio verdict (which page class migrates to data vs hardened SFC).

## 8. Design-quality bar (binding on every prototype)

- **Warm identity**: crayons from `--section-color-*`/`--viz-*`/`--foreground`; never GitHub colors; hairlines + veil plates read the shared registers, no demo-local forks.
- **Compositor-only**: shrink = scale/translate on native timelines (font-size in a shrink keyframe reds PC1); tiles at rest; no per-frame layout anywhere.
- **PRM**: shrink/cascade/reveal all carved (static large header, static-visible sections, instant states); tiles are static by construction.
- **Safari-honest**: `@supports (animation-timeline: scroll())` outer-gates (Safari 26 ships it; the gap-engine floor is the static sticky header — an honest reduced form); `inert` is Baseline; dual-engine capture on every migrated page.
- **No masking fallbacks**: raw code text paints from frame 0 (highlighting is deferred color, never deferred content); GL tiles are honest frozen rasters, not pictures-of-broken-things; a dead hljs chunk leaves legible mono, never blank.
- **KISS/DRY**: ONE specimen host (the fold), ONE permutation grid, ONE code register, ONE tile ladder, ONE shrink keyframe (already unified); gates extend in place, never re-mint.
- **Clean breaks**: previewKind arm, DemoSpecimen, raw fira-code runs — deleted, no aliases.
- **No meta language**: the lexicon gate is load-bearing on all NEW copy this system mints (tile captions, section blurbs, code labels) — user-facing prose describes the component, never the process.
