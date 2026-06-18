# BC Demo-Prune Census — language / superfluous / contrivance (demo/ content)

> Read-only census (TRANCHE DEVELOPMENT — zero src/ edits). Scope: the full `demo/` tree (131 story SFCs + 21 orphan composables + 8 chassis primitives + 7 eggs + 4 demo composables + configurator/presets). Audited against USER-DEFECTS §C ("remove view-source BS + platitudes / useless / out-of-date copy"), extended demo-wide. Cross-referenced against the existing `BC.W-PAGE-PRUNE` (route-level orphans + 3 copy strings) and `CLEANUP-PLAN.md` (the src/structure assay) to EXTEND, not duplicate.

## 0 — Headline: the demo is mostly disciplined; the prune surface is NARROW

The fear-case (a demo riddled with marketing-fluff, fake data, grid-filler) is **NOT borne out**. Measured:
- **Manifest blurbs are clean.** Scanned all 139 distinct string literals in `demo/stories/manifest.ts` against a 22-term fluff regex (magic/delightful/seamless/powerful/buttery/elegant/simply/coming-soon/…) → **0 hits**. The one-line descriptors are factual ("Radius tokens from xs to pill.", "Lucide, 2px stroke, semantic sizes.").
- **No fake-data contrivance.** `grep -niE "jane doe|john smith|acme|lorem ipsum|dummy"` across `demo/stories/**` → **0**. Every `@example.com` (form-validation:58, labeled-field:72, auth-shell:136, tags-input:18/119) is an idiomatic form `placeholder` — KEEP. Real flavor data ("The Garden", "Morning Weft" in dock/overview; "Mike Babb"/"mbabb@ncsu.edu" in settings) is realistic, not obscuring.
- **`settings.vue` is a real composition, NOT illegible-contrivance** (route-census §4 flagged it as the "totally illegible/superfluous" candidate). On read (`demo/stories/compositions/settings.vue`, 302 lines): four genuine sections (Account/Appearance/Notifications/Accessibility), each with real `LabeledInput`/`LabeledSelect`/`LabeledSlider`/`LabeledSwitch` rows + real tooltips, `Separator` delimiters, a coherent `.section-label--tinted` eyebrow register (AZ.W-SUFFUSE, the four-hue rainbow already collapsed to ONE accent). **The "illegible" verdict was a HIERARCHY concern (now fixed), NOT superfluous copy.** PRUNE finds nothing here — KEEP. (This corrects the route-census candidate; the PRUNE-half deliverable for settings is **∅**.)
- **The eggs are deliberate**, not contrivance (`demo/eggs/`, 555 LoC): the ⌘K CommandPalette (composes shipped `Command`), the Konami full-bleed Aurora reveal (`useKonami`), the ℱ-wordmark Fourier-redraw long-press (`useLongPress` + `fGlyphPoints`), `NotFound.vue` (router fallback). All PRM-fenced, all WIRED (`AppShell.vue:36-52,320-322`; `SidebarDock.vue:39,177`; `router.ts:52`; `substrates/fourier-paths.ts:18,142`). They DOGFOOD shipped machinery — KEEP.

So the genuine prune is THREE precise clusters below.

---

## 1 — LANGUAGE: internal tranche/wave-ID jargon LEAKED into USER-FACING copy

The chief language defect is **not platitudes** (the demo has almost none) — it is **internal precept-citation jargon rendered to demo consumers**. A consumer reading `/substrates/glass-material` or `/display/buttons` sees blurbs citing wave-IDs, tokens-section-numbers, and golden-ratio internal notation that mean nothing outside the repo. This IS the "view-source BS + out-of-date/internal copy" the user wants removed, demo-wide.

### 1a — USER-FACING `blurb=` attrs (rendered as page descriptors) — 9 across 6 files

| file:line | leaked jargon (excerpt) | fix |
|---|---|---|
| `demo/stories/substrates/glass-material.vue:313` | "the **W-NO-GRAY** metal exception… the **§N6** selected-item-border consumer… composing **W-GLASS-ACCENT**'s rim seam… **PRM=static**" | rewrite to describe the three metals + what they paint, drop wave-IDs/§-numbers |
| `demo/stories/substrates/glass-material.vue:355` | "ABOVE the **W-GLASS-CAL** calm default… reaches the Apple deep band… the **W55** over-light darken" | describe `.glass-deep`/`<Card tier='deep'>` behaviour; drop W-IDs |
| `demo/stories/substrates/glass-material.vue:202` (text node) | "reads exactly today's warm-cream glass (the **byte-identical**…" | drop the build-provenance phrasing |
| `demo/stories/display/buttons.vue:79` | "the **W-BUTTON-GLASS** material reads as lit glass… not a pale lozenge" | "lit glass over the field, not a pale lozenge on a flat plate" |
| `demo/stories/display/buttons.vue:100` | "the press scale + the **W-LENSING** lens-swell ride the library register" | "press scale + lens-swell ride the library register" |
| `demo/stories/display/buttons.vue:64` (text node `<p>`) | "a restrained `--scale-hover-btn` lift on the **§6 spring register**" | "on the library's spring register" (§6 is a tokens.css section number) |
| `demo/stories/data/metric-stack.vue:62` | "the audacious display tiers (**φ^(9/2)** peak 177px, **φ^(11/2)** peak 352px)… (**AZ.W-SUFFUSE D2-3**)" | "the audacious display tiers (mega 177px / audacious 352px)…" |
| `demo/stories/data/metric-cell.vue:146` | "the mega/audacious display tiers (**φ^(9/2)**… **AZ.W-SUFFUSE D2-3**)" | same — drop φ-notation + wave-ID |
| `demo/stories/substrates/constellation.vue` (blurb, 1 hit) | tranche-prose | rewrite to describe the viz |

### 1b — The pure-changelog blurb (the demo's "view-source BS" equivalent)

- **`demo/stories/navigation/tabs.vue:235`** — a `<StorySection heading="Retired axes">` whose entire blurb is an internal refactor changelog: *"No legacy code. variant=segmented FOLDED into pill… The overflow axis retired… ui/Tabs left the public surface… See MIGRATION.md."* This documents the AZ/BA `SegmentedTabs` refactor, not the component — a demo user does not need the retirement history. **PRUNE the whole "Retired axes" section** (or fold one factual line into the main tabs blurb: "Tabs come in two variants — pill and underline"). The "See MIGRATION.md" pointer is the demo-content twin of "View the source."
- **`demo/stories/dock/rail.vue:155-160`** — a rendered `<p>`: *"A vertical dock now carries the SAME collapse/morph/shrink machinery a horizontal dock does (**AZ.W-DOCK-TAXONOMY**) — the machinery the **old rail variant** denied."* The "now carries / the old rail variant denied (AZ.W-DOCK-TAXONOMY)" is out-of-date refactor framing. Rewrite to present-tense behaviour: "A vertical dock collapses and morphs its height like a horizontal dock does its width."

### 1c — Minor copy (low-stakes, light touch)

- `demo/stories/forms/select.vue:122` — `Brutalist (coming soon)` option — **ALREADY owned by BC.W-PAGE-PRUNE P3** (do not duplicate).
- `demo/stories/containers/hover-card.vue:100` — `<IconTooltip text="Run the magic sparkles">` over a `<Sparkles>` icon. Borderline-cute, not load-bearing. Recommend rename to a plain affordance ("Apply effect") — KEEP-with-tweak, not a hard prune.
- `demo/stories/containers/accordion.vue:28` — FAQ answer "they compose **beautifully** with the translation-based hover lift." A single soft adjective in genuine teaching copy. KEEP (not fluff-density; it reads as honest prose).

### 1d — CONSERVATISM FENCE (binding): do NOT prune source COMMENTS

~28 of the 31 "jargon" text-node hits are **HTML/JS source comments** (`<!-- … -->`, `//`), e.g. `StoryPage.vue:50,61,84`, `shadows.vue:25-35`, `accordion.vue:64-71`, `colors.vue:48-54`, `drawer-live-behind.vue:60-68`, `blob.vue:375,417,461,…`, `card.vue:448`. These are internal provenance notes that **NEVER render** — the house WANTS them (the W-DEMO-DESIGN / AZ.W-BLOB-* annotations document why each section is shaped as it is). **The prune target is RENDERED copy only** (`blurb=`, `description=`, `<p>`/`<h*>` text nodes). A wave that strips comments would destroy provenance and trip no user-facing improvement.

---

## 2 — SUPERFLUOUS / UNUSED: dead demo machinery (zero consumers)

### 2a — The view-source machinery cluster (extends beyond `hero.vue:175`)

`BC.W-PAGE-PRUNE` cuts only the `hero.vue:175` dead `<Button>View the source</Button>`. But the **whole view-source SUBSYSTEM is dead** and unowned:
- **`demo/composables/useSourceLoader.ts`** (60 lines) — a raw-source loader composable. `grep -rn useSourceLoader demo/ src/ tests/` → the only non-def reference is `manifest.ts:39` (the type field). **ZERO live callers.**
- **`Story.sourceFiles?: string[]`** field (`demo/stories/manifest.ts:39`) — declared, but `grep -c "sourceFiles:"` over the manifest rows → **0 rows set it.** A dead manifest field.
- These two + `hero.vue:175` are the COMPLETE view-source surface. The user's "remove view-source BS" is only fully discharged by deleting all three. **EXTENDS BC.W-PAGE-PRUNE** (which owns the button; this owns the loader + the field). Clean break, no alias (MEMORY no-backwards-compat).

### 2b — `useStoryDemo.ts` — the orphaned play/reset harness (159 lines + a test)

- `demo/composables/useStoryDemo.ts` (159 lines) — the "canonical play/reset/status harness" (V.W4). `grep -rn useStoryDemo` across `demo/`: the ONLY references are its own def, its test (`tests/useStoryDemo.spec.ts`), `src/index.ts:152` (a comment noting it is demo-private), and docs/tranche provenance. **ZERO story consumers.**
- It was the harness for the 21-story **Composables shelf**, which AZ.W-SHELL-CONFIG retired; the `use-story-demo.vue` story was deleted at AV.W10. The harness + its test are now a self-referential orphan kept alive only by the test.
- **Prune candidate** (delete the composable + `tests/useStoryDemo.spec.ts` in lockstep + the `src/index.ts:152` comment + the CLAUDE.md:836 "Demo storybook chassis" entry). Coordination note: this is a TEST-bearing delete — the test passes but tests nothing reachable. CLAUDE.md still frames it as "canonical" (§Demo-storybook chassis), which is **out-of-date** (no live consumer). DECIDE: prune (no consumer + no reachable story) OR formally re-home onto a real motion/spring story (the `motion/springs`/`curve-gallery` pages use `StoryPlayButton` directly, not this). Recommendation: **PRUNE** — the play/reset pattern is now served by `StoryPlayButton.vue` (2 consumers: `motion/springs`, `motion/curve-gallery`); a dead second harness is the contrivance.

### 2c — `ToneSwatch.vue` — the orphaned chassis primitive (63 lines)

- `demo/stories/ToneSwatch.vue` (63 lines, V.W4) — a semantic-tone swatch built to "Replace raw Tailwind palette literals (bg-emerald-50/90) across the feedback/{notification,toast} + containers/alert sites" (its own docstring). `grep -rn ToneSwatch` across `demo/ tests/` (excl. its def + tranche docs) → **ZERO consumers.** The migration it was built for never landed.
- This is the demo-chassis twin of the src-side **`FocusScope` orphan** the CLEANUP-PLAN found (a built-but-unconsumed substrate). **PRUNE.** (Its sibling `TokenLadder.vue` has 2 consumers — `foundations/overlays-scrims`, `foundations/chart-chassis-palette` — KEEP; `StoryPlayButton.vue` 2 consumers — KEEP.)

### 2d — The 21 orphan composables stories — ALREADY OWNED (do not duplicate)

- `demo/stories/composables/*.vue` (21 SFCs) — confirmed via per-file grep that **all 21 are unreferenced** (the `use-spring-orchestrator` PAGE-PRUNE caveat clears: 0 refs). This is **fully owned by `BC.W-PAGE-PRUNE` P2/P4**. Recorded here for completeness; this census does NOT re-claim it.

---

## 3 — CONTRIVANCE: essentially none (the demo is honest)

The largest stories were probed for "over-engineered scaffolding / fake data to fill a grid / demos that exist to fill a grid":
- **`demo/stories/dock/overview.vue`** (651 lines, ~10 GlassDock feature demos) — each demo teaches a DISTINCT dock facility (media transport, nav, layers, slider-keep-open, overflow=wrap, shape=card grid). The 99-line script is shared real state. NOT contrivance — it's a Band-2 REBUILD target (BC.W-DOCK-*), not a prune target. KEEP.
- **`demo/stories/substrates/constellation.vue`** (755 lines, ~7 canvas-overlay demos) — the CLEANUP-PLAN already flags a DEDUPE (hoist the repeated label-card draw helper into `constellationDrawHelpers.ts`); that is a src/DRY refactor, not a content prune. The demos are distinct fields. KEEP (defer DRY to CLEANUP-PLAN).
- **`demo/stories/display/card.vue`** (569) — ~10 flat tier/surface sections, each <60 lines, all real. The defect is code-style (45 `font-mono`, owned by BC.W-CODE-BLOCKS) + padding (BC.W-PADDING-CANON), not contrivance. KEEP.
- **`demo/stories/foundations/paper-backdrop-texture-system.vue`** (157) — real 5-section PaperBackdrop demo; absorbed a near-duplicate twin at AZ.W-PRUNE2 (already DRY). Only prune is the VERBOSE ROUTE NAME (owned by BC.W-PAGE-PRUNE). KEEP content.
- **The `data/timeline{,-segmented,-continuous}` triple** — 3 distinct GlassTimeline variants. Flag for REVIEW but likely KEEP (each teaches a real variant); confirm no merge during page-chassis pass.
- **`ColorSwatch` migration gap** — `aurora/OklchStopRow.vue:76` + `aurora/config/PaletteLayer.vue:94` still hand-roll `<input type="color">` that `<ColorSwatch>` was built to supersede (CLEANUP-PLAN finding; keeps ColorSwatch at 1 consumer). This is a src-side completeness gap, NOT a demo-content prune — recorded as a cross-ref, owned by CLEANUP-PLAN.

---

## 4 — Recommended wave: `BC.W-DEMO-COPY-PRUNE` (NEW, Band 5; EXTENDS BC.W-PAGE-PRUNE)

A NEW wave, sequenced BESIDE/AFTER `BC.W-PAGE-PRUNE` (route prune) and BEFORE `BC.W-PAGE-CHASSIS`/`BC.W-CODE-BLOCKS` (so the chassis re-threads pruned copy). Scope = the demo-CONTENT prune the route prune does not cover:

1. **De-jargon user-facing copy** — rewrite the 9 leaky `blurb=` + ~3 leaky `<p>` text nodes (§1a) to describe the COMPONENT, not the wave/precept that built it. Drop wave-IDs (`W-*`/`AZ.W-*`/`BB.W-*`), tokens-§-numbers (`§6`, `§N6`), φ-notation (`φ^(9/2)`), build-provenance phrasing (`byte-identical`/`ABROGATED`). **Fence: source COMMENTS untouched** (§1d).
2. **Prune the changelog section** — delete `tabs.vue:235` "Retired axes" (or reduce to one factual line); de-history `rail.vue:155-160`.
3. **Kill the view-source machinery** — delete `demo/composables/useSourceLoader.ts` + the `Story.sourceFiles` field (manifest.ts:39) + any `sourceFiles` plumbing (extends BC.W-PAGE-PRUNE's `hero.vue:175` button cut).
4. **Prune the orphan demo scaffolds** — delete `demo/composables/useStoryDemo.ts` + `tests/useStoryDemo.spec.ts` + reconcile `src/index.ts:152` comment + CLAUDE.md:836 entry; delete `demo/stories/ToneSwatch.vue`.
5. **Record every cut in `PRUNE-LEDGER.md`** (the same ledger BC.W-PAGE-PRUNE writes — one ledger, two waves) with the pre-flight grep proof for each.

**Gate (`proof:demo-copy-prune`, device-free, born-RED → GREEN):**
- D1 — ZERO wave-ID / tranche-ID (`\b[A-Z]{1,2}\.W-`, `\bW-[A-Z]{3,}`, `§[0-9N]`, `φ\^`) survives inside a RENDERED string (`blurb=`/`description=`/text node) in `demo/stories/**` — comments excluded by a parser that strips `<!-- -->`/`//`.
- D2 — ZERO `useSourceLoader`/`sourceFiles`/`useStoryDemo`/`ToneSwatch` reference survives (grep exit 1, the files deleted).
- D3 — the `PRUNE-LEDGER.md` records each cut with its pre-flight verification (no-silent-prune floor).
- + a self-test bite: a synthetic re-added `blurb="… W-FOO …"` REDs D1; a synthetic re-imported `useStoryDemo` REDs D2.

**Fences:** (a) source comments NEVER pruned (provenance); (b) no over-prune of teaching content (settings/dock-overview/aurora-studio/eggs all KEEP); (c) clean break, no alias; (d) the 21 orphan composables + hero.vue:175 + select.vue:122 stay with BC.W-PAGE-PRUNE (no double-ownership); (e) demo-only — zero `src/` paint (the `src/index.ts` comment + CLAUDE.md edit are doc-reconciles, not library surface).