# Pass-E SYNTHESIS — `substrates/glass-material` (the binding per-page verdict)

**Route:** `/substrates/glass-material` · **SFC:** `demo/stories/substrates/glass-material.vue` (385L) · **Manifest:** `manifest.ts:601-611` (`hero:true`, `heroScale:"hero"`, `background:"aurora"`)
**Inputs reconciled:** the demo (META-storybook), design (frontend-design), and component (src-grammar) auditor reports.

---

## 0. The one-breath verdict

This is the library's single most important showcase — the page whose entire thesis is *the six-layer Liquid Glass composite reads against busy color* — and it currently **fails its own thesis on three independent layers**: the staged field is a flat near-white smear, the giant sticky hero title physically crashes through the matrix, and the page composes almost none of the library's own showcase components (zero dock, zero tabs, zero card, one Button). All three auditors land here independently. The src GRAMMAR is exemplary and untouchable (six layers all present, DRY specular, observer budget, Safari degrades — the component report's KEEP list is unanimous). **The entire defect surface is DEMO-SIDE staging + the shared chassis**, not the material. That is the load-bearing reconciliation: do not touch `src/styles/glass/*` or the two composables; fix the page and the chassis.

---

## 1. Reconciled findings (deduped, conflicts resolved)

### Total agreement across all three reports (high confidence)
1. **The aurora backdrop is a 300×150 buffer upscaled ~4×/29× to 1152×4386 @ opacity 0.6 → flat near-white wash.** The §L1 composite has no spatial frequency to refract; every plate reads as a flat gray pill (the live `luma 1.000 · light` readout confirms — the observer is sampling near-white). This is the W54 "blur imperceptible over flat substrate" failure in production, on the page that exists to disprove it. **Root cause:** the StoryHero *contained* background canvas is never sized to its box (a chassis defect masked on every other `hero:true` page by a foreground specimen; exposed here because glass-material ships no foreground field). **This is the prerequisite — until the field is real, the page cannot demonstrate its subject.**
2. **The 244px `heroScale:"hero"` title is `position:sticky; z-index:2` with NO backplate/scrim → it bleeds OVER the first 2-3 matrix sections on scroll, occluding labels + plates.** The iOS-27 large-title-collapse done without the collapse-to-slim-bar. Acute here because it is the tallest title on the tallest content page with transparent (`tier="field"`) frames offering no card edge to occlude the overlap.
3. **Zero showcase-component composition (the user's explicit ask, UNMET).** Nine flat `tier="field"` frames, raw `glass-*` divs, one `<Button>`. No `<Card>`, no `<SegmentedTabs>`, no dock, no procedural-anim component. The dock-API ask ("contextual switching/animating") is entirely absent.
4. **Sub-sections are NOT "in their own glassy card" (UNMET).** `tier="field"` resolves `border-transparent bg-transparent shadow-none` — transparent rectangles on a wash, undelimited blocks. (Note: `field` was the *right* call to avoid an opaque plate occluding the field — but the page never re-introduces a glass silhouette, so it reads as a flat gap-stack.)
5. **The matrix is dead-static (the widest IS-vs-SHOWS gap).** No entrance, no hover lift on non-headline sections, no press, no `--glass-depth` morph on the deep/calm toggle, instant tint swap (not a `--spring-smooth` cross-fade). The page *narrates* spring physics + liquid life while presenting motionless gray rectangles. The library SHIPS `.scroll-cascade`, `useSpringPress`, `useLiquidPress`, the registered `--glass-depth` `@property` — all unused here.
6. **Paper morphism entirely absent** (the GLASS + PAPER north-star ask). No `paper-grain-overlay`, no `.paper-ink-mark`, no oklab-glass-tint vs srgb-surface-tint contrast.
7. **Superfluous language** — 60+ lines of gate-lineage SFC comments ("W-PRUNE2 E4-3 own-story exclusion", "the W23 ≤30% house ceiling") + dense spec-excerpt blurbs.

### Conflicts / nuances resolved
- **Path-label (P2-1):** demo report recommends the chip read `@mkbabb/glass-ui/styles` (the honest material import surface); design report calls the local-route convention "defensible" but demands it be DECIDED + applied uniformly across substrates (28 local vs 90 `@mkbabb` band-wide). **Resolution:** this is a cross-cutting band decision, not a per-page one — the page should adopt `@mkbabb/glass-ui/styles` (the material genuinely ships via `/styles`), and the substrates-band uniformity rule is the gate's job. FOLD into the existing off-token/header sweep wave, do not mint a per-page action.
- **"Big hero specimen" (design #4) vs "each fold its own card" (demo P1-1):** not a conflict — they compose. The design move is a focal-plus-supporting hierarchy: ONE large `glass-overlay` interactive specimen (the six-layer composite made legible) as the lead, the matrix demoted to a supporting strip of `glass-quiet` cards. This *also* satisfies "each sub-section in its own glassy card" and the elevation-staircase staging (overlay heaviest, wash lightest — the DESIGN.md 7-tier table made physical).
- **Degraded `@supports` cases (lens/squircle/chromatic on Safari):** all three note the degrade is honest but *mute* — no label tells a Safari viewer the plate is the fallback, not a bug. Minor, folds with the language tighten.

---

## 2. Ranked changes (by impact) → tranche actions

The Band-16 DEMO-CHASSIS waves are **PLANNED in `viz/ADDENDUM-DEMO-CHASSIS.md` but NOT yet written as wave-specs** (`W-PAGE-BACKGROUND`, `W-STICKY-TITLE-CONDENSE`, `W-HEADER-SCALE`, `W-PAGE-CHASSIS`, `W-CONFIG-GALLERY-DOCK`, `W-PAPER-MORPHISM` have no file in `waves/`). This page is the canonical worst-case manifestation of FOUR of them — so the dominant action is **AUTHOR-AND-CITE** (write the planned chassis waves, citing this page as the born-RED measure site), not net-new minting. Only the dock/tabs composition is genuinely net-new.

| # | Change | Impact | Action | Wave |
|---|--------|--------|--------|------|
| 1 | **Size the StoryHero contained-canvas DPR-aware (the field is real)** | ⭐ prerequisite — unblocks the page's entire thesis + the luma observer + every other `hero:true` page | **AUGMENT → MODIFY** | `W-PAGE-BACKGROUND` (author it; this is its born-RED root cause — the 300×150 canvas, chassis-once → 118 pages). The page ADDITIONALLY needs its OWN foreground `<Aurora>` field (the `DockStage`/`PRESETS.OPENAI_SKY @ opacityCeiling` pattern) since it ships no specimen — that demo-side stage folds here too. |
| 2 | **Kill the sticky-title collision (backing bar / condense, or drop sticky on full-bleed)** | ⭐ disqualifying layout bug, worst manifestation in the corpus | **AUGMENT** | `W-STICKY-TITLE-CONDENSE` (author it; cite this page — tallest `hero` title + tallest content + transparent frames = the acute case the condense-bar gate must cover). |
| 3 | **Each fold → its own `glass-quiet` card over the live field + ONE focal `glass-overlay` hero specimen (the elevation staircase)** | ⭐ the user's core "own glassy card" + "main card BIGGER" ask; converts spec-sheet → instrument stack | **MODIFY (demo)** | `W-DATA-BAND-GLASS` pattern is the precedent (`tier=field` vs glass-tier choice); EXTEND the substrates demo-chassis arm under `W-PAGE-BACKGROUND` / `ADDENDUM-DEMO-CHASSIS`. The card-in-card register (a `glass-quiet` section card holding a `tier="field"` specimen inside) keeps glass-cannot-sample-glass honest. |
| 4 | **Drive the fold switch (specular·tint·accent·refract·squircle·deep·metal) through `<SegmentedTabs>` or `<DockStack mode="facets">` + make the matrix ALIVE (`.scroll-cascade` entrance · `--spring-smooth` hover lift · `--glass-depth` toggle-morph · tint cross-fade)** | ⭐ the dock-API + tabs + "high animation affordance" asks; the widest IS-vs-SHOWS gap | **NEW (demo-chassis wave)** | **`BD.W-GLASS-MATTER-COMPOSE`** (Band 16, demo-only, ZERO src — composes shipped `<SegmentedTabs>`/`<DockStack mode="facets">`/`useDockContextSilhouette`/`.scroll-cascade`/`useLiquidPress`/the `--glass-depth` `@property`). Real gate: contextual-switch facet count ≥5 · `.scroll-cascade` entrance present on the matrix · `--glass-depth` animates on the deep toggle (π readback, not presence) · ≥1 dock-API consumed. The one genuinely net-new author for this page. |
| 5 | **Tighten 60+ lines of gate-lineage SFC comments + dense blurbs → one-line affordance reads; standardize chip to `@mkbabb/glass-ui/styles`; label the degraded `@supports` cases** | medium — polish + convention | **MODIFY** | `W-PAGE-OFFTOKEN-SWEEP` / `W-PAGE-HEADER-FOLD` (language + path-label); add the substrates `@mkbabb/glass-ui/styles` chip + the Safari-fallback label as line items. |
| 6 | **Add ONE paper-register row (oklab glass-tint vs srgb surface-tint contrast; `paper-grain` / `.paper-ink-mark`)** | medium — the GLASS+PAPER north-star ask, this is the natural page to contrast them | **AUGMENT** | `W-PAPER-MORPHISM` (author it; glass-material is the ideal contrast site — fold a paper-grain `.scroll-cascade` notes band closing the page). |
| 7 | **Deep-tier blur 16→18-20px re-measure HERE (heaviest material route: 5 live rungs + deep tier)** | low (perf-gated, may HELD) | **MODIFY** | `BD.W-DEEP-GLASS-20PX` — add this page as a named `profile:budget` measure site (the heaviest route). |
| 8 | **Press lens-swell is flat (DDR-LENS-BAKE retired the `:active` swell); the RGB-split chroma rim is the perf-gated re-build** | low (already booked) | **KEEP-BOOKED** | `BD.W-GLASS-LENS-CHROMA` — no new action; this page is its demo home when it lands. |

### PRUNE
- The 60+ lines of tranche-bookkeeping SFC comments (W-PRUNE2/W23/byte-identical narration) — cut to one line per block (item 5).
- The repeated internal vocabulary ("byte-identical", "presets-in-consumers", "the on/off contrast device") leaking onto the demo blurb surface — strip (item 5).

### KEEP (do not touch — unanimous)
- The entire `src/` glass grammar: six-layer composite, `createSpecularWriter` single-seam (catch-light wired across every plate), `useGlassBackdropLuminance` observer budget (≤4Hz, IO-gated, PRM-parked), all Safari graceful degrades. **No src paint on this page.**
- The accent-rim axis (rose/amber/teal/violet per-instance hues) — the page's one distinctive, bespoke moment; the §F1 data-keyed seam reading exactly right.
- The rim ON/OFF + accent ON/OFF + deep/calm contrast-device PATTERN (pedagogically sound — keep the pattern, animate the toggle).

---

## 3. Convergence assessment

**This page is NOT close — it needs several more loops, but the path is fully mapped and bounded.** The defect surface is large (3 P0s + 4 unmet user-asks) BUT it collapses to ONE root and ONE lever: **every defect is demo-side staging or shared-chassis, and the shared chassis is the single-writer seam** — fixes 1, 2, 6 land ONCE in the chassis and propagate to all 118 pages, fixes 3, 4 are this-page demo composition over already-shipped components. The src grammar is exemplary and frozen. So the *effort* is concentrated, not sprawling.

**Sequencing (the loops):**
- **Loop 1 (unblocks the thesis):** author + land `W-PAGE-BACKGROUND` (canvas-sizing root cause + this page's own foreground field) and `W-STICKY-TITLE-CONDENSE`. Until these land, no visual re-audit of this page is meaningful (the field is white, the title crashes).
- **Loop 2 (the user asks):** `BD.W-GLASS-MATTER-COMPOSE` (the new dock/tabs/anim wave) + the each-fold-its-own-card demo refactor + `W-PAPER-MORPHISM`.
- **Loop 3 (polish + re-earn the gestalt):** language tighten + path-label + `@supports` labels + the `proof:ba-gestalt` `page-band` verdict re-earned on a FRESH capture (the BC no-source-green law — a captured DELTA, not a commit claim).

**Convergence call: 3 focused loops.** Bounded and well-understood; the risk is entirely in authoring the four planned-but-unwritten Band-16 chassis waves correctly (each with a real π gate, per the Pass-D bar), not in discovering new defects — all three auditors converged cleanly with no contradictory findings.
