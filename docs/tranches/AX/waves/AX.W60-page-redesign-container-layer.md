# AX.W60 — Page-redesign container layer: every story in a glass CARD over a rich PER-PAGE background + design HIERARCHY, the net-new `<StoryHero>` wrapper, the per-page background descriptor seam, the speedtest-GRID idiom where befitting

**Band** F · STORYBOOK IA / DEMO · **Severity** major (Q4/Q7/Q9 + P8 — the pass-3 page-redesign umbrella: *"Pages like /primitives/buttons should be STRUCTURED within a GLASS CONTAINER + leverage PAPER + GRID backgrounds"* (Q4); *"ALL pages re-designed with proper CONTAINERS + design HIERARCHY (like /primitives/badge, /primitives/label) — contain items in GLASS CARDS"* (Q7); *"Hero items: the hero CARD itself should be GLASSY (a glass card) over the full-page aurora/constellation/fourier background — to DEMONSTRATE the glass"* (Q9) — `USER-DEFECTS-2026-06-08-pass3.md:29,32,34`)
· **dependsOn** AX.W00 (the π visual-runtime lane — the close machinery), AX.W54 (the glass-first ROOT — the glass-card container reads glass-first because W54 flipped the default register; `MASTER-PLAN.md:29` — Batch 4 BLOCKED on W54), AX.W43 (the fourier-field first-class primitive — one of the per-page hero backgrounds) + AX.W17 (Constellation landed — a hero background) + AX.W47 (the Aurora preset/palette seam — a hero background), AX.W18 (the IA category tree — W60 wraps the FINAL page set) + AX.W40 (the demo shell — W60 wraps the pages the shell navigates)
· **Charter** the USER-DECIDED page-redesign hinge (`MASTER-PLAN.md:60` PR — *"USER-DECIDED: a thin NET-NEW container-layer wave (W60) that wraps each story page in a glass card + a rich per-page background + proper hierarchy; W18/W40/W57/W58 stay as-is (layered on top)"*) + the pass-3 Q4/Q7/Q9 + P8 umbrella (`USER-DEFECTS-2026-06-08-pass3.md:29,32,34,48-50`)
· **Audit** `MASTER-PLAN.md:28-29` (Batch 4 — the page-redesign umbrella, blocked on W54) + the pass-3 dedup anchors (`USER-DEFECTS-2026-06-08-pass3.md:44-55` — "layers on W18 + W40 + W57 + W58") + the live good-example pages (`demo/stories/primitives/badge.vue`, `primitives/label.vue` — the `<StoryPage>`+`<StorySection>` hierarchy the user names as the target)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. This wave is DEMO-side ONLY (`demo/**` + the new gate + its
> registration) — NO library `src/` edit. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE chrome-devtools-mcp DELTA at ≥2 viewports × light/dark. Per
> the hardened agent git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **container layer** is the thin NET-NEW wrapper the user named — every story page wrapped in a
> proper GLASS CARD container with design HIERARCHY (the `/primitives/badge` + `/primitives/label` shape the
> user names as the good example) over a rich PER-PAGE background, NOT a one-off per-page re-author. The
> **`<StoryHero>`** is the net-new demo-private SFC this wave mints — it wraps the page body in a glass card
> over the chosen background substrate (paper / grid / aurora / constellation / fourier), the page-redesign's
> single composable seam. The **per-page background descriptor** is the seam the `manifest.ts` `Story` row
> gains so each page DECLARES its background (and each HERO declares a UNIQUE one per the user — aurora OR
> constellation OR fourier OR paper OR grid) without hand-rolling it. The **glassy hero card** is the Q9
> demonstration — the hero CARD itself is a glass card OVER the full-page background, so the page DEMONSTRATES
> the glass it ships. The **speedtest-GRID idiom** is the dense metric-grid layout (the `MetricCell`/`MetricStack`
> grid pattern from the speedtest consumer) the redesign reaches for on data-dense pages where befitting.
> **This LAYERS on top of W18 (the IA category tree), W40 (the nav shell), W57 (the four hero radial→Aurora
> adoptions), and W58 (the meta-language strip) — it does NOT subsume any of them.**

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `6569b7a` (3.8.0+convergence; the AX integrated band + the three USER-DECIDED
hinge ratifications) on **six** falsifiable witnesses, each a source-true line-probe the new gate inverts.
W18 settled the IA category tree, W40 the nav shell, W57 the four HERO radial→Aurora adoptions, W58 the
meta-language strip, and W54 flipped the glass-first default — but NO page is wrapped in a glass-card
CONTAINER, NO page DECLARES a per-page background (only the four W57 heros carry one, hand-rolled inline),
and the `Story` manifest row has no background seam. Source-confirmed at HEAD:

- **RED witness 1 (the headline — there is NO `<StoryHero>` container wrapper; no page is structured in a
  glass card over a background, grep-falsifiable).** `grep -rn "StoryHero" demo/` returns ZERO. The page
  chassis is `<StoryPage>` (`demo/stories/StoryPage.vue:26-54`) which structures ONLY the header (eyebrow /
  title / blurb) + a flat `<section class="mt-8 flex flex-col gap-10">` content well — it composes NO glass
  card, references NO background (`grep "glass\|Aurora\|Constellation\|background\|radial" StoryPage.vue` =
  NONE), so a page's content sits FLAT over the global `PaperBackdrop` shell (`AppShell.vue:76`), with no
  per-page container and no per-page background. **The falsifiable RED:** *`grep "StoryHero" demo/` = NONE;
  `StoryPage.vue` composes no glass card + no background (RED). After the wave `<StoryHero>` is the minted
  demo-private wrapper that wraps the page body in a glass card (the W54 glass-first default) over a declared
  background substrate (paper / grid / aurora / constellation / fourier), and every story page composes it
  (or `<StoryPage>` is extended to host it) — a glass container over a rich background, never a bare flat well
  (GREEN).*

- **RED witness 2 (no page DECLARES a per-page background — the `Story` manifest row has no background seam,
  parse-falsifiable).** `demo/stories/manifest.ts:32-38` — the `Story` interface is `{ id, title, blurb?,
  component, sourceFiles? }` with NO `background`/`substrate`/`hero` field; `grep "background\|substrate\|hero"
  manifest.ts` hits only blurb prose, never a descriptor field. So a page cannot DECLARE its background — the
  only per-page backgrounds at HEAD are the FOUR W57 heros that hand-roll an inline `<Aurora>` (`intro.vue:39`,
  `hero.vue`, `paper-glass.vue`, `auth-shell.vue`), each authored by hand with no shared seam, and the other
  ~124 pages carry NO per-page background at all. **RED:** *the `Story` interface has no background descriptor;
  only four heros hand-roll an inline background (RED). After the wave the `Story` row gains a `background?:
  StoryBackground` descriptor (`"paper" | "grid" | "aurora" | "constellation" | "fourier"` + a per-page
  palette/intensity knob), `<StoryHero>` reads it, and every page DECLARES its background through the ONE seam
  — the four W57 heros RECONCILE onto it (their hand-rolled `<Aurora>` becomes a declared `background:
  "aurora"` with their palette) so there is ONE background path, not the inline fork (GREEN).*

- **RED witness 3 (the rich background substrate set is incomplete — there is NO GRID background utility the
  redesign needs, grep-falsifiable).** The user names PAPER + GRID backgrounds (Q4) plus aurora / constellation
  / fourier (Q6/Q9). Paper exists (`paper.css` `paper-grain-overlay`, `cards.css` `paper-texture`), aurora /
  constellation / fourier are shipped primitives — but there is NO GRID background: `grep "grid" src/styles/*.css`
  hits ONLY layout grids (`dock-layer-grid`, `display:grid`, `grid-template`, `data-table`), never a decorative
  ruled-grid / blueprint background utility. So the GRID half of Q4's "PAPER + GRID backgrounds" has no
  substrate to declare. **RED:** *there is no decorative grid-background utility (RED). After the wave a
  `.story-bg-grid` decorative ruled-grid background recipe exists (a token-driven `linear-gradient` blueprint
  grid — the SOTA dot/line-grid backdrop), so the `"grid"` background descriptor resolves a real substrate,
  completing the paper / grid / aurora / constellation / fourier set (GREEN).*

- **RED witness 4 (the page hierarchy is INCONSISTENT — pages range from the good `/primitives/badge` shape to
  bare flat wells; no hierarchy contract, grep + structural-falsifiable).** The user names `/primitives/badge`
  + `/primitives/label` as the GOOD examples (the `<StoryPage>` → stacked `<StorySection label=…>` hierarchy —
  `badge.vue:27-130`). But many pages do NOT follow it: they hand-roll the raw section triplet, mount content
  in a bare `<div>` with no `<StorySection>` label, or sit flat with no container. There is NO gate asserting
  every page composes the `<StoryPage>` + `<StorySection>` hierarchy AND the glass-card container. **RED:**
  *pages range from the good badge/label hierarchy to bare flat wells; no contract enforces the container +
  hierarchy (RED). After the wave every story page composes `<StoryPage>` (the header hierarchy) wrapping
  `<StoryHero>` (the glass-card container over the background) wrapping stacked `<StorySection>` blocks (the
  body hierarchy) — the badge/label shape is the UNIVERSAL contract, gate-enforced (GREEN).*

- **RED witness 5 (the HERO pages do NOT each carry a UNIQUE background + a GLASSY hero card over it — Q9,
  parse-falsifiable).** The four W57 heros adopt `<Aurora>` — but they all use the SAME substrate (Aurora) with
  different palettes, NOT a unique substrate per hero (the user: *"each hero a UNIQUE one — aurora OR
  constellation OR fourier-field"* — `USER-DEFECTS pass3:17`), and the hero CONTENT sits in a `paper-grain-overlay
  rounded-card` section (`intro.vue:31-37`), NOT a GLASS card over the background (Q9: *"the hero CARD itself
  should be GLASSY"*). So the heros demonstrate Aurora-drift but NOT the glass-card-over-rich-background read
  the user wants. **RED:** *the heros share ONE substrate (Aurora) + the hero content sits in a non-glass
  `rounded-card`, not a glassy card over the background (RED). After the wave each HERO page declares a UNIQUE
  background (e.g. intro → aurora, a system/index hero → constellation, a math/graphics hero → fourier) and
  the hero CARD is a GLASS card (the W54 glass-first default + the W56 squircle where befitting) floating OVER
  the full-page background — the page DEMONSTRATES the glass it ships (GREEN).*

- **RED witness 6 (the speedtest-GRID idiom is not reached for on data-dense pages — P8, grep-falsifiable).**
  The library ships `MetricCell` (`/metric-cell`) + `MetricStack`/`MetricRow` (`/metric-stack`) — the
  speedtest-class dense metric-grid primitives — but the data-dense demo pages (`/data/*`, the dashboard
  composition) lay metrics out in ad-hoc flex rows, NOT the speedtest metric-GRID idiom the user names as the
  befitting layout. **RED:** *the data-dense pages do not compose the `MetricCell`/`MetricStack` speedtest-grid
  idiom where befitting (RED). After the wave the data-dense pages that benefit from a dense metric grid
  compose the shipped `MetricCell`/`MetricStack` grid (the speedtest idiom) inside their `<StoryHero>` glass
  card — the dense-data layout reads as the speedtest grid, befitting (GREEN).*

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the six witnesses on
the live demo at `localhost:5173` (the §HardGate π checks): `/primitives/buttons` sits as a flat content well
with no glass-card container + no background (Q4); a representative page (`/data/*`, `/feedback/*`) has no
container + no per-page background; the heros (`/foundations/intro`, `/compositions/hero`) carry an Aurora
drift but the hero content is NOT a glass card over it (Q9); there is no grid background anywhere. Capture the
BEFORE π render (the bare `/primitives/buttons` flat well; a non-glassy hero) as the born-RED baseline in
`audit/W60-page-redesign.json`. Do NOT proceed on the audit's word — re-prove (the cardinal AX lesson; a green
SOURCE gate over a still-bare live page is NOT done).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

Every story page reads as a designed page: a proper GLASS-CARD container (the W54 glass-first default, the
W56 squircle where befitting) over a rich PER-PAGE background (paper / grid / aurora / constellation /
fourier — each HERO a UNIQUE one), with the `/primitives/badge` + `/primitives/label` design HIERARCHY
(`<StoryPage>` header → `<StoryHero>` glass container → stacked `<StorySection>` body) as the universal
contract; the hero CARD itself glassy OVER the full-page background so the page DEMONSTRATES the glass it
ships; the speedtest metric-GRID idiom reached for on data-dense pages where befitting. The page redesign is
a THIN container LAYER — a net-new `<StoryHero>` wrapper + a per-page background descriptor seam + a grid
background utility + the per-page declarations — that LAYERS on W18 (the IA tree), W40 (the nav shell), W57
(the four hero Aurora adoptions, which RECONCILE onto the new background seam), and W58 (the meta-language
strip), subsuming NONE of them. Every magnitude a token, no buried literal, no library `src/` edit — the
container layer reads designed, glass-first, and background-rich on the FINAL W18/W40 page set.

---

## Scope (the thin CONTAINER LAYER — net-new wrapper + the background seam + the grid substrate, NOT a
per-page re-author, NOT a library edit)

The verified seam makes this a THIN additive layer, not a rebuild: `<StoryPage>` (128 of 145 SFCs use it) is
the ONE page chassis, the `Story` manifest row is the ONE per-page descriptor home, and the glass-card +
squircle + background primitives ALL ship (W54/W56 glass + Aurora/Constellation/FourierField). So W60 folds
in at ONE wrapper SFC (`<StoryHero>`) + ONE manifest seam (`background`) + ONE new grid recipe, then declares
each page's background + wraps each page's body — with zero library fan-out. Six folds, all demo-side:

1. **MINT `<StoryHero>` — the net-new glass-card-over-background container wrapper (the headline — Q4/Q7/Q9).**
   A demo-private SFC `demo/stories/StoryHero.vue` that wraps its slotted body in a GLASS CARD (the W54
   glass-first default register — `.glass-card` / `<Card>`, the W56 squircle corner where befitting via
   `--corner-shape`) floating OVER a background substrate it renders behind (`absolute inset-0 -z-10`). Props:
   `background?: StoryBackground` (the substrate kind — resolved to `<Aurora>` / `<Constellation>` /
   `<FourierField>` / `.story-bg-grid` / `paper-grain-overlay`), `palette?`/`intensity?` (the per-page tint /
   opacity-ceiling knob), `variant?: "hero" | "page"` (a HERO gets the full-bleed glassy card over the live
   substrate per Q9; a PAGE gets the contained glass-card well with a calmer background). KISS — it COMPOSES
   the shipped primitives (no new background mechanism), and reuses the W57 `aurora-hero.ts` palette helper for
   the Aurora case (one palette path, no fork). The glass card reads glass-first BECAUSE W54 flipped the
   default — `<StoryHero>` does not re-author the glass look, it CONSUMES it (the Q9 demonstration: a glass
   card over a rich background IS the live proof of W54's glass-first default).

2. **ADD the per-page background DESCRIPTOR seam to the `Story` manifest row (the ONE declaration home —
   Q4/Q6/Q9).** Widen `demo/stories/manifest.ts` `Story` (`:32-38`) with `background?: StoryBackground` where
   `type StoryBackground = "paper" | "grid" | "aurora" | "constellation" | "fourier" | { kind: …; palette?:
   …; intensity?: … }` (the string shorthand + the object form for per-page tuning). `<StoryHero>` reads the
   active story's `background` from `useStoryNavigation()` (or the page passes it as a prop) — so a page
   DECLARES its background ONCE in the manifest, never hand-rolls it. RECONCILE the four W57 heros onto this:
   their inline `<Aurora :config="heroAuroraConfig(…)">` becomes a declared `background: { kind: "aurora",
   palette: "rose-indigo-amber" }` that `<StoryHero>` resolves through the SAME `aurora-hero.ts` helper — ONE
   background path, the W57 hand-roll folded onto the seam (W60 does not DELETE W57's Aurora adoption; it
   re-homes the four inline declarations onto the descriptor so all backgrounds ride one path).

3. **AUTHOR the GRID background utility — complete the paper / grid / aurora / constellation / fourier set
   (Q4's "PAPER + GRID", grep-RED witness 3).** A new `.story-bg-grid` decorative ruled-grid recipe in a
   demo-side CSS partial (`demo/stories/story-hero.css` or `demo/demo.css`) — a token-driven blueprint grid
   (`background-image: linear-gradient(…) ` at a `--story-grid-size` cell with a `--story-grid-color`
   hairline, the SOTA dot/line-grid backdrop), `prefers-reduced-motion`-static (a grid does not animate),
   light + dark token-adaptive. This is DEMO-side (the grid is a demo background, not a library primitive —
   no `src/` edit); if the orchestrator finds ≥2 library consumers want a grid substrate it routes to a
   separate library wave (out of bounds here per the substrate-with-consumer bar). The grid completes the
   five-substrate background set the descriptor enumerates.

4. **WRAP every story page in the container + the badge/label HIERARCHY (the universal contract — Q7).**
   Every `demo/stories/**` page composes `<StoryPage>` (the header hierarchy — eyebrow / title / blurb,
   unchanged) wrapping `<StoryHero :background="…">` (the glass-card container over the declared background)
   wrapping stacked `<StorySection label=…>` blocks (the body hierarchy — the `/primitives/badge` shape). The
   pages that ALREADY follow badge/label (the good examples) gain the `<StoryHero>` container + the declared
   background; the pages that hand-roll a bare flat well are migrated onto the contract. This is the LAYER —
   it wraps the EXISTING body content in the container, it does NOT re-author each page's demos (the demos
   stay; they gain a glass container + a background). COORDINATE with W58 (the meta-language strip already
   ran — W60 wraps the language-clean bodies) + W18 (the IA tree is settled — W60 wraps the final page set).

5. **The HERO pages each get a UNIQUE background + a GLASSY hero card over it (Q9 — the glass demonstration).**
   The HERO-class pages (`foundations/intro`, `compositions/hero`, `foundations/paper-glass`, a system/index
   hero, a graphics hero) each DECLARE a UNIQUE background per the user (`USER-DEFECTS pass3:17` — "each hero a
   UNIQUE one"): the brand front-door → `aurora` (W57's adoption, re-homed); a system/index hero → `constellation`
   (the structural lattice — the W57 substrate-choice RULE); a math / graphics hero (`compositions/math-paper`,
   or a fourier showcase) → `fourier` (the W43 first-class field). The hero CARD is a GLASS card (the W54
   default + W56 squircle) floating OVER the full-page substrate — `<StoryHero variant="hero">` renders the
   live substrate full-bleed behind a glassy content card, so the hero DEMONSTRATES the glass-card-over-
   rich-background read. The substrate-choice RULE (W57: Aurora for painterly/brand, Constellation for
   system/structural, Fourier for math/graphics) governs which background each hero declares — ONE substrate
   per hero, never two live GL contexts on a route (the W57 WebGL-context budget).

6. **REACH for the speedtest-GRID idiom on data-dense pages where befitting (P8).** The data-dense pages
   (`/data/*`, the dashboard composition) that benefit from a dense metric grid compose the shipped
   `MetricCell` (`/metric-cell`) / `MetricStack`+`MetricRow` (`/metric-stack`) grid — the speedtest
   consumer's metric-grid idiom — inside their `<StoryHero>` glass card, so the dense-data layout reads as
   the speedtest grid. This is consumer-adoption of shipped primitives (no library edit); it lands ONLY where
   befitting (a metric-dense page), NOT forced onto every data page (the no-overfitting bar — a page with no
   dense metrics does not gain a metric grid).

### KEEP — the load-bearing demo + library spine (do NOT touch)

UNCHANGED: the library `src/` (W60 is DEMO-side ONLY — no token/component/CSS-in-src edit; the glass-first
default is W54's, the squircle is W56's, the background primitives are Aurora/Constellation/FourierField's —
W60 CONSUMES all of them); the `<StoryPage>` header hierarchy (`StoryPage.vue` — W60 wraps WITHIN it, it does
not re-author the eyebrow/title/blurb header); the `<StorySection>` + `<ShowcaseFrame>` chassis (the body
hierarchy primitives — W60 composes them, does not re-author them); the W57 pulse-aura calm + the four hero
Aurora ADOPTIONS (W60 re-homes the four inline declarations onto the descriptor seam; it does not undo W57's
Aurora choice or re-tune the pulse aura); the W18 IA category tree (`manifest.ts` category/story SET — W60
adds a `background` FIELD to the row, it does not move/add/remove a row); the W40 nav shell (`demo/layout/**`
— W60 wraps the page bodies the shell navigates, it does not touch the shell); the W58 meta-language strip
(W60 wraps the language-clean bodies — it adds NO meta-language). The global `PaperBackdrop` shell
(`AppShell.vue:76`) STAYS — it is the page's outer substrate; `<StoryHero>`'s per-page background layers OVER
it (a hero's full-bleed Aurora sits above the paper shell; a page's contained background is calmer over it).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **W54 (glass-first ROOT) is the BLOCKING predecessor — W60 CONSUMES the glass-default.** Every `<StoryHero>`
  glass card reads glass-first BECAUSE W54 flipped the default register (`MASTER-PLAN.md:29` — Batch 4 blocked
  on W54). The Q9 glass-card-over-background hero is the LIVE demonstration of W54's glass-first default — W60
  is W54's showcase. Author the cross-ref; W60 writes no W54 source.
- **W43 (fourier-field first-class) + W17 (Constellation) + W47 (Aurora) supply the hero backgrounds.** The
  unique-per-hero background set (aurora / constellation / fourier) is the three shipped graphics substrates;
  W60 declares them per-hero and renders them behind the glass card. W60 adds no graphics primitive — it
  consumes the settled three. Author the cross-ref; W60 writes no graphics source.

---

## SOTA deepening (the container-layer gestalt, the background-descriptor seam, the glass-on-rich demonstration)

**The container layer over a per-page re-author (the gestalt the user named).** The user's PR decision
(`MASTER-PLAN.md:60`) is explicit: a THIN net-new container-layer wave, NOT a per-page redesign and NOT a
subsumption of W18/W40/W57/W58. The SOTA storybook idiom is exactly this — ONE page-chassis component
(`<StoryHero>`) + ONE declaration seam (the manifest `background` field) that EVERY page rides, so the
redesign is a single composable layer, not 145 hand-edited pages. The duplication collapses behind the
wrapper (the same pattern `<StorySection>`/`<ShowcaseFrame>` already use — a demo chassis primitive the pages
compose, not a per-page recipe). The container layer is the ONE seam the whole storybook rides.

**The background-descriptor seam (declare-once, render-once).** The SOTA backdrop pattern declares the
background as DATA (the manifest descriptor) and resolves it through ONE renderer (`<StoryHero>`), not as an
inline hand-roll per page (the W57 four-hero pattern — correct for four heros, but a fork once EVERY page
wants a background). The descriptor (`"paper" | "grid" | "aurora" | "constellation" | "fourier"` + a tuning
object) is the page-identity seam: a page DECLARES its background hue/kind once, the renderer paints it, and
the four W57 heros fold onto it (their `heroAuroraConfig` palette becomes a declared descriptor). ONE
background path, no inline fork.

**The glass-card-over-rich-background demonstration (Q9 — the page IS the proof).** The user's Q9 insight is
that the storybook should DEMONSTRATE the glass it ships — a glass hero card floating over a live aurora /
constellation / fourier background is the single best live proof of the W54 glass-first default + the W52
material look + the W56 squircle. The hero is not just a pretty front door; it is the load-bearing
demonstration that glass-first WORKS over a rich substrate. The unique-per-hero background (aurora for brand,
constellation for system, fourier for math) follows the W57 substrate-choice rule — one substrate per hero,
keyed off the page's identity.

**The speedtest-GRID idiom (P8 — the dense-data layout).** The speedtest consumer's `MetricCell`/`MetricStack`
grid is the SOTA dense-metric layout the library already ships — a data-dense demo page reads best as that
grid (the auto-fill metric tiles) inside the glass container, not an ad-hoc flex row. The idiom lands where
befitting (a metric-dense page), reusing the shipped primitives, no library edit.

**Reconciliation note:** W60 MINTS the `<StoryHero>` wrapper + the `background` descriptor seam + the grid
background recipe (all demo-side), WRAPS every page in the container + the badge/label hierarchy, gives each
HERO a unique background + a glassy card, and reaches for the speedtest grid where befitting. It does NOT edit
any library `src/` file (it CONSUMES W54/W56/Aurora/Constellation/FourierField), does NOT move a W18 manifest
row (it adds a FIELD), does NOT touch the W40 shell, does NOT undo W57's Aurora adoption (it re-homes the four
declarations onto the seam), and does NOT re-introduce meta-language past W58.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/StoryHero.vue` | **NEW** — the net-new glass-card-over-background container wrapper. Wraps the slotted body in a GLASS CARD (the W54 glass-first default register — `.glass-card` / `<Card>`, the W56 squircle corner where befitting) over a background substrate it renders behind (`absolute inset-0 -z-10`). Props: `background?: StoryBackground` (resolved to `<Aurora>` / `<Constellation>` / `<FourierField>` / `.story-bg-grid` / `paper-grain-overlay`), `palette?`/`intensity?` (per-page tint / opacity-ceiling), `variant?: "hero" \| "page"`. Reuses `aurora-hero.ts` for the Aurora case. NO new background mechanism — composes the shipped primitives. |
| `demo/stories/story-hero.css` | **NEW** (or fold into `demo/demo.css`) — the `.story-bg-grid` decorative ruled-grid background recipe (a token-driven `linear-gradient` blueprint grid keyed off `--story-grid-size`/`--story-grid-color`, light+dark adaptive, PRM-static) + the `<StoryHero>` glass-card-over-background layout rules (the `relative isolate overflow-hidden` container + the `-z-10` substrate placement). DEMO-side CSS only. |
| `demo/stories/manifest.ts` | **WIDEN** the `Story` interface (`:32-38`) with `background?: StoryBackground` (`type StoryBackground = "paper" \| "grid" \| "aurora" \| "constellation" \| "fourier" \| { kind: …; palette?: …; intensity?: … }`); ADD the `background` value to each story row that declares one (the heros get their unique substrate; the data-dense pages get a calm `paper`/`grid`; others default to the page-calm background). NO category/story ROW add/move/remove (W18 owns the tree — W60 adds a FIELD only). |
| `demo/stories/StoryPage.vue` | **OPTIONAL** — IF the orchestrator routes the container through `<StoryPage>` rather than a per-page `<StoryHero>` compose: extend `StoryPage.vue` to host `<StoryHero>` reading the active story's `background` from `useStoryNavigation()`, so a page gets the container by composing `<StoryPage>` alone (the lowest-friction path). RATIFY (see Open Questions) — the recommended path is `<StoryPage>` hosts `<StoryHero>` so the 128 existing `<StoryPage>` consumers gain the container with zero per-page edit. |
| `demo/stories/aurora-hero.ts` | **CONSUME** (W57 owns it) — `<StoryHero>` reuses `heroAuroraConfig(palette)` for the `"aurora"` background case; the four W57 heros' palettes become declared descriptor values resolved through this helper. NO re-author (W57's helper is the one path); W60 may APPEND a constellation/fourier per-page config helper IF a hero needs a tuned non-Aurora substrate (a sibling helper, not an aurora-hero edit). |
| `demo/stories/**/*.vue` | **WRAP** each page body in `<StoryHero>` (or gain it via the extended `<StoryPage>`) + ensure the badge/label `<StorySection>` hierarchy (the pages that hand-roll a bare flat well migrate onto the contract); the four W57 heros' inline `<Aurora>` RE-HOMES onto the declared descriptor; the data-dense pages compose the `MetricCell`/`MetricStack` speedtest grid where befitting. NO demo CONTENT re-author (the demos stay — they gain a container + a background); NO meta-language (W58 ran). |
| `scripts/proof-page-container.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration + the fail-CLOSED π live arm). Asserts: `<StoryHero>` exists + composes a glass card + a background substrate; the `Story` interface carries the `background` descriptor; the `.story-bg-grid` recipe exists; every story page composes `<StoryHero>` (no bare unstructured page) + the `<StoryPage>`/`<StorySection>` hierarchy; the four W57 heros declare their background through the descriptor (no inline-Aurora fork); each HERO declares a UNIQUE substrate. See §HardGate. |
| `package.json` | Register `proof:page-container` + the W00 meta-gate parity match. |
| `scripts/gates.mjs` | Add the `proof:page-container` manifest row (`local`, `ci`). |
| `docs/tranches/AX/audit/W60-page-redesign.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/W60-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol). |

**OUT of bounds:** any library `src/` file (W60 is DEMO-side ONLY — the glass-first default is W54's, the
squircle is W56's, the background primitives are Aurora/Constellation/FourierField's, the metric grid is
MetricCell/MetricStack's; W60 CONSUMES all, edits none); the `manifest.ts` category/story ROW SET (W18 owns
the tree — W60 adds a FIELD only, never moves/adds/removes a row); the `demo/layout/**` nav shell (W40 owns
it); the four W57 heros' Aurora ADOPTION decision (W60 re-homes the declarations onto the seam, it does not
undo the Aurora choice or re-tune the pulse aura); the W58 meta-language strip (W60 adds no meta-language);
the `<StoryPage>` header hierarchy (W60 wraps WITHIN it); the `<StorySection>`/`<ShowcaseFrame>` chassis
internals (W60 composes them); the global `PaperBackdrop` shell (it stays — the per-page background layers
over it).

---

## Disjointness (sibling waves it must NOT overlap)

W60 is the page-redesign CONTAINER LAYER; it LAYERS on the four named waves and subsumes NONE:

- **vs AX.W18 (the IA category tree) — DISJOINT seam, ADD-A-FIELD only.** W18 owns the `manifest.ts` category
  tree (the category order + the per-category story SET + each row's SFC file + the three IA gates). W60 adds
  a `background?` FIELD to the `Story` interface + the per-row values — it moves/adds/removes NO row, re-orders
  NO category, touches NO IA gate. W18 settles the page SET; W60 wraps each page in a container + declares its
  background. **dependsOn W18** so W60 wraps the FINAL page set, not a mid-churn tree. (Both touch
  `manifest.ts` — W18 the row SET, W60 the row's new `background` field; W18 lands first, W60 adds the field
  to the settled rows — no row-set collision.)
- **vs AX.W40 (the demo nav shell) — DISJOINT surface.** W40 owns `demo/layout/**` (the `AppShell`/`SidebarDock`/
  `BottomDock`/`dock-nav.css` nav chassis + the five demo-dock-nav/coherence gates). W60 owns the per-PAGE
  container (`demo/stories/**` + `<StoryHero>`). No shared file: W40 = the shell that NAVIGATES the pages, W60
  = the container INSIDE each page. **dependsOn W40** so the shell is settled when W60 wraps the page bodies
  the shell navigates.
- **vs AX.W57 (the four hero radial→Aurora adoptions) — LAYERS ON, RE-HOMES the four declarations.** W57
  adopted `<Aurora>` for the four Class-A heros (the pulse-aura calm + the four hero washes). W60 RE-HOMES
  those four inline `<Aurora>` declarations onto the `background` descriptor seam (their `heroAuroraConfig`
  palette becomes a declared `background: { kind: "aurora", palette: … }` resolved through the SAME helper) +
  WRAPS the hero content in a glass card over the substrate (Q9). W60 does NOT undo W57's Aurora choice, does
  NOT re-tune the pulse aura, does NOT touch `aurora-hero.ts`'s palettes (it consumes them) — it folds the
  four hand-rolled declarations onto the seam so all backgrounds ride one path. **dependsOn W57** so the four
  Aurora adoptions are settled when W60 re-homes them. (Both touch the four hero SFCs — W57 added the inline
  `<Aurora>`, W60 re-homes it onto the descriptor + adds the glass card; W57 lands first, W60 re-homes the
  settled adoption — coordinate the four hero SFCs by re-home-after-adopt sequencing.)
- **vs AX.W58 (the meta-language strip) — DISJOINT concern, LAYERS ON the clean bodies.** W58 stripped internal
  meta-language from every `demo/stories/**` SFC + the `proof:story-language` gate. W60 wraps the
  language-clean bodies in the container — it adds NO meta-language (the `proof:story-language` gate stays
  GREEN over W60's wrappers; `<StoryHero>`'s copy/props carry no tranche/wave/defect codes). **dependsOn W58**
  (transitively via W18/W40) so W60 wraps clean bodies. (Both touch `demo/stories/**` SFCs — W58 stripped the
  PROSE, W60 wraps the STRUCTURE; line-disjoint — W58 edits text, W60 adds the `<StoryHero>` element + the
  hierarchy. W60 must not re-introduce meta-language the `proof:story-language` gate would red.)

### DEDUP (the explicit boundary vs the four named waves)

- **vs W18 (IA tree) — DISTINCT SEAM.** W18 = the category/story ROW SET (the tree). W60 = the per-page
  CONTAINER + a `background` FIELD on the row. W18 settles WHICH pages exist + their order; W60 wraps EACH
  page in a glass-card container over a declared background. W60 moves no row; W18 adds no container. The only
  shared file is `manifest.ts` (row-set vs the new field) — W18 lands first, W60 adds the field. **This is the
  headline dedup: W18 = the TREE, W60 = the CONTAINER + the BACKGROUND on each leaf.**
- **vs W40 (nav shell) — DISTINCT SURFACE.** W40 = the SHELL that navigates the pages (`demo/layout/**`). W60 =
  the CONTAINER inside each page (`demo/stories/**`). No file overlap. W40 = how you GET to a page; W60 = how
  the page READS once you arrive.
- **vs W57 (hero Aurora) — LAYERS ON, RE-HOMES.** W57 = the four hero radial→Aurora ADOPTIONS + the pulse calm.
  W60 = the page-redesign CONTAINER LAYER that RE-HOMES W57's four inline declarations onto the `background`
  descriptor + adds the glassy hero card (Q9). W60 extends W57 (every page gets a background, the four heros'
  Aurora folds onto the seam, the hero content becomes a glass card) — it does NOT subsume W57 (the pulse-aura
  calm + the Aurora-choice are W57's, untouched). **W57 = the four heros adopt Aurora; W60 = every page gets a
  declared background + a glass container, the four heros re-home onto it.**
- **vs W58 (meta-language strip) — DISTINCT CONCERN.** W58 = the PROSE (strip the meta-language). W60 = the
  STRUCTURE (wrap in the container). W60 adds no prose-meta-language (the `proof:story-language` gate stays
  green). W58 = what the page SAYS; W60 = how the page is SHAPED.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W60's split (count 3):

- **Implement (≤1–2 agents — the wrapper + the seam + the per-page wrap is a cohesive demo-side fold; the
  per-page wrap CAN parallelize by category if the orchestrator prefers).** Mints `<StoryHero>` + the
  `.story-bg-grid` recipe (StoryHero.vue / story-hero.css), widens the `Story` interface + adds the per-row
  `background` values (manifest.ts), optionally extends `<StoryPage>` to host the container (StoryPage.vue),
  wraps each page body in the container + the badge/label hierarchy (demo/stories/**), re-homes the four W57
  heros onto the descriptor + adds their glass cards, reaches for the speedtest metric grid where befitting,
  records nothing in `src/` (demo-side only). Lint + typecheck at every interval. The wrapper + the seam + the
  grid recipe are line-disjoint; the per-page wrap is row-disjoint (one SFC per page).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree:
  asserts `<StoryHero>` exists + composes a glass card + a background; asserts the `Story` interface carries
  `background`; asserts `.story-bg-grid` exists; asserts EVERY story page composes `<StoryHero>` (no bare
  unstructured page) + the `<StoryPage>`/`<StorySection>` hierarchy; asserts the four W57 heros declare their
  background through the descriptor (no inline-Aurora fork survives); asserts each HERO declares a UNIQUE
  substrate. ADVERSARIAL twist: tries to pass the gate with a page wrapped in a NON-glass `rounded-card` (not
  the glass-card container — confirms the gate REDs on a non-glass container); tries a hero with an inline
  `<Aurora>` NOT routed through the descriptor (confirms the gate REDs on the inline fork); tries two HERO
  pages sharing the SAME substrate (confirms the unique-per-hero assertion REDs); tries a page with NO
  background descriptor + NO `<StoryHero>` (confirms the no-bare-page assertion REDs). DRIVES the VISUAL-TRUTH
  live audit (the binding close — see HardGate), incl. the `proof:story-language` regression check (W60 added
  no meta-language).
- **Gate-author (≤1 agent).** Authors `proof-page-container.mjs` (born-RED on the StoryHero-exists +
  glass-card-container + background-descriptor + grid-recipe + every-page-wrapped + hierarchy + heros-unique +
  no-inline-fork assertions + the fail-CLOSED π live arm); confirms it FAILS at HEAD `6569b7a` (no StoryHero,
  no descriptor, no grid, bare pages) and PASSES on the patched tree. Registers `proof:page-container` in
  `package.json` + `gates.mjs` + the W00 meta-gate parity. Gate-author is distinct from implementer (the gate
  must be able to FAIL the implementer's work — the AW false-GREEN class). The π live arm (the painted-pixels
  truth — a glass card over a rich background) rides the W00 readback, NOT a CPU text gate alone.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b).** The
wave-agnostic grant lives ONCE in AX.md §6.1 with the 4-class halt-vs-work-around tree in §6.2 — by reference.
This wave's §3a triumvirate AUTO-TRIGGERS:

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to edit a library
  `src/` file (the glass-card recipe, the squircle axis, the Aurora/Constellation/FourierField primitives, the
  MetricCell/MetricStack grid — W54/W56/the graphics waves own them), the `manifest.ts` category/story ROW SET
  (W18), the `demo/layout/**` shell (W40), or the four W57 heros' Aurora-choice / pulse-aura tune (W57) — HALT
  + triumvirate (a demo-vs-library or a sibling-wave boundary the FileBounds did not home). If the
  glass-card-over-background does NOT read glass-first because W54 has NOT landed → HALT (W60 is BLOCKED on
  W54; do not author a non-glass fallback container).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:page-container` cannot simultaneously
  assert the StoryHero-glass-container + the background-descriptor + the every-page-wrapped + the
  heros-unique-substrate — OR if `proof:story-language` (W58) / the W18 IA gates RED after W60's wrap (the
  container desyncing a gate W58/W18 owns) — escalate the gate design, do NOT relax a ceiling or skip a page to
  pass over a bare unwrapped page.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the glass card does NOT read glassy over the
  rich background (the background washing out the card, or the card occluding the background) after three
  `<StoryHero>` tunings, OR the grid background does NOT read as a clean blueprint grid after three recipe
  attempts, dispatch research→plan→redress rather than re-tuning the opacity-ceiling / grid-size ad hoc.
- **§Open-questions ratify reached un-ratified → HALT-and-ratify (Class 3).** The `<StoryPage>`-hosts-`<StoryHero>`
  vs per-page-compose decision, the per-hero unique-substrate assignment (which hero gets constellation vs
  fourier), and the speedtest-grid befitting-page set are ratify-before-impl hinges — if any reaches impl
  un-ratified, take the recorded default (`<StoryPage>` hosts `<StoryHero>`; intro→aurora / a system hero→
  constellation / a math/graphics hero→fourier; the metric grid on the metric-dense data pages only) and run
  the live-audit verification, do NOT self-ratify a divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:page-container` (NEW; the device-free SOURCE + registration
arm + a fail-CLOSED π LIVE arm).**

The **device-free SOURCE arm** (always gates) — a source-parse + FS string-scan gate (the precept-valid
artefact form per SPEC.md §Hard Gates — source-structure for the demo-chassis contract; the PAINTED render is
proven by the π arm, NEVER a text gate alone):

- **`<StoryHero>` exists + composes a glass card over a background.** Assert `demo/stories/StoryHero.vue`
  exists; assert it composes a GLASS card surface (`.glass-card` / `<Card>` with the glass tier, NOT a plain
  `rounded-card border bg-card`) AND renders a background substrate behind it (`<Aurora>`/`<Constellation>`/
  `<FourierField>`/`.story-bg-grid`/`paper-grain-overlay` at `-z-10`). **Born-RED at HEAD** (`grep StoryHero
  demo/` = NONE).
- **The `Story` interface carries the `background` descriptor.** Assert `manifest.ts` `Story` has
  `background?: StoryBackground` with the `"paper" | "grid" | "aurora" | "constellation" | "fourier"` union (+
  the object form). **Born-RED at HEAD** (no background field).
- **The GRID background recipe exists.** Assert a `.story-bg-grid` decorative ruled-grid recipe exists (a
  token-driven `linear-gradient` grid keyed off `--story-grid-*`), completing the paper/grid/aurora/
  constellation/fourier set. **Born-RED at HEAD** (`grep story-bg-grid demo/` = NONE).
- **EVERY story page is wrapped in the container + the hierarchy (no bare unstructured page).** Assert every
  `demo/stories/**/*.vue` page (the navigable pages, not the aurora sub-panels) composes `<StoryHero>` (directly
  or via the extended `<StoryPage>`) AND the `<StoryPage>`/`<StorySection>` hierarchy — no page is a bare flat
  well with no container. **Born-RED at HEAD** (pages sit flat, no `<StoryHero>`).
- **The four W57 heros declare their background through the descriptor (no inline-Aurora fork).** Assert the
  four W57 hero SFCs (`foundations/intro`, `compositions/hero`, `foundations/paper-glass`, `compositions/
  auth-shell`) declare their background through the manifest descriptor (resolved by `<StoryHero>`), NOT a
  surviving inline `<Aurora>` hand-roll outside the wrapper. **Born-RED at HEAD** (the four heros hand-roll
  inline `<Aurora>`).
- **Each HERO declares a UNIQUE substrate.** Assert the HERO-class pages declare DISTINCT background substrates
  (not all `aurora` — at least one `constellation` + one `fourier` among the heros, per the user's "each hero a
  UNIQUE one"). **Born-RED at HEAD** (the four heros all use Aurora).
- **No meta-language regression (W58 intact).** Assert `proof:story-language` (W58) stays GREEN over W60's
  wrappers — `<StoryHero>`'s copy/props carry no tranche/wave/defect codes.

The **fail-CLOSED π LIVE arm** (rides the W00 readback; a non-rendering/unreachable page is a hard RED when
the Playwright workspace IS present, NEVER a false-green SKIP): probes `localhost:5173/primitives/buttons` —
`evaluate_script` reads the page's container element and asserts it is a GLASS card (`getComputedStyle().
backdropFilter` is a glass blur, NOT `none`; the W54 glass-first default) over a background substrate (a
non-flat backdrop element behind it); probes a HERO page (`/foundations/intro`) and asserts the hero CARD is
glass over the full-bleed live substrate (the Q9 read); probes a `"grid"`-background page and asserts the
`.story-bg-grid` ruled grid paints. With the Playwright workspace present, a bare flat page / a non-glass
container / a missing background is a hard RED.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson — a
green SOURCE gate over a still-bare live page is NOT done).** A fail-CLOSED live chrome-devtools-mcp pass the
ORCHESTRATOR runs @ `localhost:5173` — `getComputedStyle` reads + screenshots over `/primitives/buttons`
(Q4), `/primitives/badge` (the good-example baseline), a HERO page (`/foundations/intro` — Q9), a
`"grid"`-background page (Q4's grid half), a `"fourier"`-background hero, and a data-dense page (P8), in light
AND dark at ≥2 viewports:

- **Every page reads as a designed page — a glass card over a rich background.** Mount `/primitives/buttons`:
  ASSERT the page content sits in a GLASS-CARD container (the W54 glass-first default — translucent, the
  background visible through it, the W52 edge rim + W56 squircle where befitting), NOT a flat content well.
  ASSERT a per-page background paints behind it (paper / grid). The badge/label hierarchy (`<StoryPage>` header
  → `<StoryHero>` glass container → `<StorySection>` blocks) reads as the universal shape.
- **The HERO card is GLASSY over the full-page background (Q9 — the demonstration).** Mount `/foundations/intro`:
  ASSERT the hero CONTENT card is a GLASS card floating OVER the full-bleed live substrate (aurora) — the page
  DEMONSTRATES the glass-card-over-rich-background read. The display title + prose clear AA over the
  opacity-ceiling-clamped substrate. `performance_start_trace` confirms ONE GL context per route (the W57
  budget), no repaint storm.
- **Each HERO carries a UNIQUE background.** Side-by-side the HERO pages: ASSERT distinct substrates (the brand
  front-door aurora vs a system hero's constellation vs a math/graphics hero's fourier-field) — each hero a
  unique one, the substrate-choice rule visible.
- **The GRID background paints (Q4's grid half).** A `"grid"`-background page: ASSERT the `.story-bg-grid`
  blueprint grid paints (a clean ruled grid, light+dark adaptive), the glass card legible over it.
- **The speedtest-GRID idiom reads on data-dense pages (P8).** A data-dense page: ASSERT the dense metric
  layout reads as the speedtest `MetricCell`/`MetricStack` grid inside the glass container (where befitting —
  a non-dense page is unaffected).
- **W18/W40/W57/W58 UNCHANGED (the layers-on canary).** ASSERT the W18 IA tree (the category/story set), the
  W40 nav shell (the rail + bottom dock), the W57 Aurora heros (the drift), and the W58 language-clean prose
  are all UNAFFECTED by the container layer — W60 wrapped, it subsumed nothing.
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND dark,
  ≥2 viewports (the glass card must not occlude the background to illegibility; the background must not wash
  out the card content).

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/W60-DELTA.md`, per the W00 protocol) is the binding
close criterion. The BEFORE capture pins the HEAD bare `/primitives/buttons` flat well + the non-glassy hero
the container layer must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `6569b7a` on
   the live demo: `/primitives/buttons` flat + no container + no background; a representative page bare; the
   heros' Aurora-without-glass-card; no grid background. Capture the BEFORE π render as the born-RED baseline
   in `audit/W60-page-redesign.json`. Confirm W54 (glass-first), W18 (IA tree), W40 (shell), W57 (heros), W58
   (language) are settled. Do NOT proceed on the audit's word — re-prove.
2. **Author the gate born-RED.** Author `proof-page-container.mjs` (StoryHero-exists + glass-card-container +
   background-descriptor + grid-recipe + every-page-wrapped + hierarchy + heros-unique + no-inline-fork +
   story-language-intact); register `proof:page-container` in `package.json` + `gates.mjs` + the W00 meta-gate;
   confirm it FAILS at HEAD.
3. **Mint `<StoryHero>` + the grid recipe + the descriptor seam.** Author `StoryHero.vue` (the glass-card-over-
   background wrapper) + `story-hero.css` (the `.story-bg-grid` recipe + the layout rules); widen the `Story`
   interface (`manifest.ts`) with `background?: StoryBackground`. Optionally extend `<StoryPage>` to host it.
   Lint + typecheck.
4. **Declare each page's background + wrap each page.** Add the per-row `background` values (manifest.ts — the
   heros' unique substrates, the data pages' calm paper/grid); wrap each page body in `<StoryHero>` (or via the
   extended `<StoryPage>`) + ensure the badge/label hierarchy. Lint + typecheck.
5. **Re-home the four W57 heros + add their glass cards (Q9).** The four heros' inline `<Aurora>` re-homes onto
   the descriptor; the hero content becomes a glass card over the substrate; assign the unique-per-hero
   substrates (aurora / constellation / fourier). Lint + typecheck.
6. **Reach for the speedtest metric grid where befitting (P8).** The data-dense pages compose the shipped
   `MetricCell`/`MetricStack` grid inside their `<StoryHero>` glass card. Lint + typecheck.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:page-container` passes; re-run `proof:story-language` (W58) +
   the W18 IA gates (confirm the container layer did not red them); run the VISUAL-TRUTH live π audit (every
   page a glass card over a background, the heros glassy + unique, the grid paints, the speedtest grid reads,
   W18/W40/W57/W58 unchanged) over the page set, light + dark, ≥2 viewports; capture the paired-π BEFORE/AFTER
   + DELTA (`W60-DELTA.md`); write `audit/W60-page-redesign.json` to GREEN.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps
3–6) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W60-page-redesign.json` — the born-RED→GREEN ledger: the six RED witnesses (no
  StoryHero, no background descriptor, no grid recipe, inconsistent hierarchy, non-unique non-glassy heros, no
  speedtest grid), the per-finding disposition (Q4/Q7/Q9 + P8 + the PR hinge), the W54/W18/W40/W57/W58
  settled-confirmation, and the post-wave GREEN structure + π-readback (the glass-container readback, the
  hero-glass-over-substrate measurement, the grid paint).
- `docs/tranches/AX/audit/W60-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the bare `/primitives/buttons`
  flat well → a glass card over a paper/grid background; the non-glassy hero → a glass card over a unique
  full-bleed substrate (Q9); the inconsistent hierarchy → the universal badge/label shape; the data-dense
  page → the speedtest metric grid; over light + dark, ≥2 viewports; the W18/W40/W57/W58-unchanged canary.
- `scripts/proof-page-container.mjs` — the NEW gate (StoryHero-glass-container + background-descriptor +
  grid-recipe + every-page-wrapped + hierarchy + heros-unique + no-inline-fork + the fail-CLOSED π live arm).
- `demo/stories/StoryHero.vue` + `demo/stories/story-hero.css` — the NEW container wrapper + the grid recipe.
- The diff localizing the `<StoryHero>` mint + the `Story` background descriptor + the grid recipe + the
  per-page wrap + the four-hero re-home + the speedtest-grid adoption + the gate registration.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(demo): born-RED proof:page-container — StoryHero glass container + background descriptor + grid recipe + every-page-wrapped + heros-unique (AX.W60 Q4/Q7/Q9/P8)`
2. `feat(demo): mint <StoryHero> — glass-card container over a per-page background (paper/grid/aurora/constellation/fourier) + the Story background descriptor seam + .story-bg-grid (AX.W60 Q4/Q7)`
3. `feat(demo): wrap every story page in the <StoryHero> container + the badge/label hierarchy + declare per-page backgrounds (AX.W60 Q7)`
4. `feat(demo): each hero a UNIQUE background + a glassy hero card over it (aurora/constellation/fourier); re-home the four W57 Aurora heros onto the descriptor (AX.W60 Q9)`
5. `feat(demo): reach for the speedtest MetricCell/MetricStack grid on data-dense pages where befitting (AX.W60 P8)`
6. `chore(AX.W60): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  binding live-audit close criterion. W60 cannot close on the SOURCE gate alone (the cardinal AX lesson — a
  green CPU gate over a still-bare live page is the exact false-GREEN class); W00 stands up the lane it closes
  on + the paired-π BEFORE/AFTER + DELTA protocol it captures.
- **AX.W54 (the glass-first ROOT) — HARD predecessor (BLOCKING).** Every `<StoryHero>` glass card reads
  glass-first BECAUSE W54 flipped the default register (`MASTER-PLAN.md:29` — Batch 4 BLOCKED on W54). Without
  W54 the container would default to an opaque solid, not a glass card over the background — the Q9
  demonstration (glass over rich background) requires the glass-first default. W60 is W54's live showcase.
- **AX.W43 (fourier-field first-class) + AX.W17 (Constellation) + AX.W47 (Aurora) — the hero backgrounds.** The
  unique-per-hero background set (aurora / constellation / fourier) is the three shipped graphics substrates;
  W60 declares them per-hero and renders them behind the glass card. W60 adds no graphics primitive — it
  consumes the settled three. (W43/W17/W47 land before W60 so the substrate set is complete.)
- **AX.W18 (the IA category tree) + AX.W40 (the demo shell) — settle the page set + the shell.** W60 wraps the
  FINAL W18 page set (it adds a `background` FIELD to the settled rows) inside the W40-rebuilt shell. Both land
  before W60 so the container layer wraps a settled tree + a settled shell, not a mid-churn one.
- **AX.W57 (the four hero Aurora adoptions) + AX.W58 (the meta-language strip) — settle the heros + the prose.**
  W60 RE-HOMES W57's four inline Aurora declarations onto the descriptor + wraps the W58 language-clean bodies.
  Both land before W60 so the four heros are settled (re-home, not re-author) and the bodies are clean (W60
  adds no meta-language).

---

## Archaeology (the lineage + the research mandate)

- **The PR hinge (USER-DECIDED — `MASTER-PLAN.md:60`).** "USER-DECIDED: a thin NET-NEW container-layer wave
  (W60) that wraps each story page in a glass card + a rich per-page background + proper hierarchy; W18/W40/
  W57/W58 stay as-is (layered on top)." The wave is explicitly a THIN LAYER, not a subsumption — the binding
  hinge this spec executes.
- **The pass-3 umbrella (Q4/Q7/Q9 + P8 — `USER-DEFECTS-2026-06-08-pass3.md:29,32,34,48-50`).** Q4 (glass
  container + paper/grid backgrounds on `/primitives/buttons`), Q7 (ALL pages re-designed with proper
  containers + design hierarchy like badge/label), Q9 (the hero card itself glassy over the full-page
  background), P8 (the page-redesign umbrella) — the four asks this wave folds.
- **The good-example baseline (`demo/stories/primitives/badge.vue`, `primitives/label.vue`).** The user names
  these as the GOOD hierarchy (the `<StoryPage>` → stacked `<StorySection label=…>` shape). W60 makes that
  shape the UNIVERSAL contract + adds the glass-card container + the per-page background — the badge/label
  hierarchy is the target the redesign generalizes.
- **The `<StoryPage>` chassis (`demo/stories/StoryPage.vue`) — the seam.** 128 of 145 SFCs use it; it
  structures the header but composes NO container + NO background. W60 either extends it to host `<StoryHero>`
  (the lowest-friction path — the 128 consumers gain the container for free) or each page composes `<StoryHero>`
  directly (RATIFY). The single page seam the container layer rides.
- **The W57 four-hero Aurora adoption (`demo/stories/aurora-hero.ts` + the four hero SFCs).** W57 adopted
  Aurora for the four Class-A heros with the `heroAuroraConfig` palette helper. W60 RE-HOMES those four inline
  declarations onto the `background` descriptor (the helper is the one path) + adds the glassy hero card — the
  W57 adoption is the substrate W60 folds onto the seam, not a thing W60 undoes.
- **The shipped graphics + glass primitives (Aurora / Constellation / FourierField / Card / `.glass-card` /
  `--corner-shape` / MetricCell / MetricStack).** All ship at HEAD (fourier-field exists at
  `src/components/custom/fourier-field/`, Constellation at `custom/constellation/`, Aurora at `custom/aurora/`).
  W60 CONSUMES them — it writes no graphics/glass/metric library source.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/` (pinned `63240e6`); the binding precepts this wave pursues + must not violate:

- **token-first / no magic numbers (J invariant).** Every background magnitude is a token (the
  `--story-grid-size`/`--story-grid-color` grid knobs, the per-page `intensity`/`opacity-ceiling` reading a
  descriptor value, the glass card riding W54's `--glass-level` + W56's `--corner-shape`). MUST NOT bury a
  literal grid cell size or opacity in `<StoryHero>`.
- **component-over-CSS-class (J invariant) + DRY chassis.** The page redesign is ONE component (`<StoryHero>`)
  + ONE declaration seam (the manifest descriptor), not 145 hand-edited pages — the same chassis-primitive
  discipline `<StorySection>`/`<ShowcaseFrame>` already use. MUST NOT hand-roll a per-page container recipe.
- **abrogate-before-patch / one-path / no-legacy.** The four W57 inline `<Aurora>` declarations are RE-HOMED
  onto the ONE descriptor seam (the inline fork collapses), not kept as a parallel path beside the descriptor.
  ONE background renderer (`<StoryHero>`), ONE declaration home (the manifest descriptor). MUST NOT leave an
  inline-Aurora fork beside the seam.
- **no-backwards-compat / clean break.** The four heros switch wholesale to the descriptor (no inline-Aurora
  alias kept); the bare flat-well pages migrate onto the container contract (no flat-page fallback). Clean
  break, no migration shim.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** `<StoryHero>` ships with its
  consumer (every story page); the `background` descriptor ships with its consumer (the per-page declarations);
  the grid recipe ships with its consumer (the `"grid"`-background pages); the speedtest metric grid lands ONLY
  where befitting (a metric-dense page, not forced onto every data page). No speculative background; a library
  grid substrate is OUT of bounds until ≥2 library consumers want it.
- **demo-side-only / no-library-edit-for-a-demo-redesign.** W60 is DEMO-side ONLY — it CONSUMES W54's
  glass-first default, W56's squircle, the graphics substrates, and the metric primitives; it edits NO library
  `src/` file. A demo page redesign must not reach into the library to change a token or a component (that is
  the owning wave's job).
- **greenfield-no-meta (MEMORY).** `<StoryHero>`'s copy/props + the per-page declarations carry NO
  tranche/wave/defect codes — the `proof:story-language` gate (W58) stays GREEN over W60's wrappers. MUST NOT
  re-introduce meta-language the container layer.
- **π visual-runtime lane (AX.W00).** The wave closes on the EXECUTED live audit (every page a glass card over
  a rich background, the heros glassy + unique, the grid paints) over the page set, light + dark, ≥2
  viewports — NOT the SOURCE gate alone (the cardinal AW failure this tranche corrects).
- **Goal + completion criterion paired (README §Edicts; WAVE_SPEC §2a/§6).** The §Goal (every page a glass
  card over a rich background, the badge/label hierarchy universal, the heros glassy + unique, the speedtest
  grid where befitting) and the §HardGate (born-RED→GREEN `proof:page-container` + the visual-truth audit) are
  paired; a gate-pass with a goal-miss (the container wraps but reads non-glassy, or a hero's background does
  not paint) closes `complete_with_misses`, not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **`<StoryPage>` hosts `<StoryHero>` vs each page composes `<StoryHero>` directly — RATIFY.** The 128
   existing `<StoryPage>` consumers gain the container for FREE if `<StoryPage>` is extended to host
   `<StoryHero>` (reading the active story's `background` from `useStoryNavigation()`); the per-page-compose
   path gives finer per-page control but touches 145 SFCs. **Recommendation: `<StoryPage>` hosts `<StoryHero>`**
   (the lowest-friction path — the 128 consumers gain the container with zero per-page edit; the heros that
   need the full-bleed `variant="hero"` pass a prop). RATIFY at wave-open; the per-page-compose path is the
   fallback if a page needs a bespoke container.
2. **The per-hero unique-substrate assignment — which hero gets constellation vs fourier — RATIFY against the
   live audit.** The user wants each hero a UNIQUE substrate (aurora / constellation / fourier). The
   substrate-choice rule (W57: aurora for brand/painterly, constellation for system/structural, fourier for
   math/graphics) governs. **Recommendation: the brand front-door (`foundations/intro`) → aurora (W57's
   adoption); a system/index hero → constellation; a math/graphics hero (`compositions/math-paper` or a fourier
   showcase) → fourier.** RATIFY which specific heros against the live tree (the exact hero set depends on the
   W18-settled pages).
3. **The grid background — demo-side `.story-bg-grid` vs a library grid substrate — RATIFY.** Q4 names a GRID
   background; no library grid substrate exists. **Recommendation: a DEMO-side `.story-bg-grid` recipe** (the
   no-overfitting bar — a library grid substrate ships only when ≥2 library consumers want it; the demo grid is
   a demo background). RATIFY whether any LIBRARY consumer wants a grid substrate (if so, route to a separate
   library wave — out of W60's demo-side bounds).
4. **The speedtest-grid befitting-page set — which data pages get the metric grid — RATIFY.** P8 names the
   speedtest grid where befitting. **Recommendation: the metric-dense data pages only** (`/data/*` with dense
   metrics, the dashboard composition) — NOT forced onto every data page (the no-overfitting bar). RATIFY the
   exact befitting-page set against the live tree.
5. **The page background DEFAULT — which background a page with no declared descriptor gets — RATIFY.** A page
   that declares no `background` needs a default. **Recommendation: a calm `paper` background** (the global
   `PaperBackdrop` shell idiom, a quiet per-page paper wash) so an undeclared page still reads as a designed
   container over paper, not a bare well. RATIFY whether the default is `paper` or a neutral no-background
   (the glass card over the global shell) at the live audit.
