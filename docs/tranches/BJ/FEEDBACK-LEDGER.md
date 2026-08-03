# BJ FEEDBACK LEDGER — the 2026-07-17 corpus

The user's feedback delivered 2026-07-17 (post-7.0.0-order, pre-grand-audit), transcribed row by
row. Screenshots preserved at `docs/tranches/BJ/feedback/` (originals were ephemeral
`/var/folders/**/TemporaryItems` paths). Every row must receive a terminal disposition in the BJ
formation: an owning wave, a fold, or a retire with rationale. Silent drops forbidden.

Rows F02/F06/F07… without a screenshot are URL-anchored verdicts; the demo runs at
`http://127.0.0.1:5199`.

## PROVENANCE — this corpus is not the first sitting (BK row #15, 2026-08-03)

Most of these asks are older than 2026-07-17. Two earlier sittings said the same things in the
owner's own words, and they are the citation target wherever a BJ row restates them:

- `docs/tranches/AY/audit/USER-AUDIT-2026-06-10.md` — the live audit of 2026-06-10 (§B B1-B22 is the
  glass-ui half). **37 days before this corpus, 54 days before BK execution.**
- `docs/tranches/BD/viz/refine/USER-FEEDBACK-2026-06-23.md` + `-batch2.md` + `-batch3.md` — the three
  refinement batches of 2026-06-23. **24 days before this corpus, 41 days before BK execution.**

The per-row lineage — which BJ row restates which antecedent, its first-asked date, its age, and how
many sittings carried it — lives once, at
`docs/tranches/BK/execution/2026-08-03-row15-provenance/PROVENANCE-REGISTER.md` §2. It is cited, not
restated here. Headline: 25 of the 68 asks were first made on 06-10 and 18 on 06-23. There are only
**three sittings**, so an ask can be restated at most three times: **ten asks sit at that ceiling**,
and the dock (F47), the app-wide blur/rounding hierarchy (F48), and the blob (A12) are among them —
carried by all three sittings, and the oldest live asks in the tranche.

Two record corrections that this ledger does not own: the demo port above is stale (5400 is the ruled
port, TR#4 at `74c59ade`), and `feedback/F19-metric-badge-overround-grid.png`, cited by CFR-01, is on
disk but untracked — the force-track carve-out is a #4/#16 call. Both are recorded at the register §5.

| Row | Anchor | Verdict (user's words, condensed only where marked) |
|-----|--------|------------------------------------------------------|
| F01 | `feedback/F01-preview-cards.png` | Preview cards could be better, more expressive with active items, better sized (different sizes, masonry-layout like). Further: preview cards AND all story pages are slow to load in — partially load, then stutter. |
| F02 | `/foundations` | Most of the cards are blank white. |
| F03 | `feedback/F03-worthless-section.png` | "Most of this is worthless." (Also re-stated the parsimony edict: extreme parsimony, KISS-forward, fewer lines, little time on contrived gates/process, majority on direct implementation via agent orchestration + visual verification.) |
| F04 | `feedback/F04-shape-abrogate.png` | "This shape is to be abrogated" — simplify components to better, more opinionated defaults; KISS. A grand audit of ALL components with **questions in reduction relayed to the user**. |
| F05 | `feedback/F05-anim-shift-no-aurora.png` | Not well defined with animations; improperly shifts the screen around; why does this section not have a background aurora. |
| F06 | `/dock/rail` (and dock pages generally) | Transitions between the dock pages are broken, slow, and flash the screen. |
| F07 | story-page transitions | Transitions between story pages should be better defined, more expressive and animated (e.g. jumping to `/substrates/aurora`). |
| F08 | `/substrates/aurora` | Many presets are duplicative — reduce the set dramatically. Aurora variants (crayon, oil, etc.) are all almost identical: simplify, remove presets, focus on the best-designed auroras (sky, sunset, dusk, …). |
| F09 | `feedback/F09-overround-cramped-configurator.png` | Container should not be so rounded (not 100%; more like a card). The configurator must be larger — too cramped. **All configurators audited.** |
| F10 | `feedback/F10-section-hierarchy.png` | Each section should have better and slightly clearer design hierarchy. |
| F11 | `feedback/F11-item-gap.png` | There should be no gap between items like this. |
| F12 | `feedback/F12-tags-input-unrounded.png` | `/data/tags-input` — these containers aren't rounded. |
| F13 | `/data/sortable-list` | Needs better design and better horizontal use of space. |
| F14 | all pages | Audit ALL pages for optimized horizontal usage on desktop + proper mobile-first affordances. Idiomatic gestalt approaches, no legacy, clean breaks. Dogfood our own components to afford this. |
| F15 | `feedback/F15-reset-button-unrounded.png` | `/data/infinite-scroll` reset button not rounded. **Grand rounding/border-radius audit + typography audit.** |
| F16 | `/data/timeline` | Very poorly defined, buggy, likely many facilities overfit. **Redesign from the ground up.** |
| F17 | `feedback/F17-search-inputs-unrounded.png` | `/data/search` — input boxes are not rounded. |
| F18 | `/data/instrument-chassis`, `/data/metric` | To be REMOVED — "what of our grand pruning of overfit and superfluous components?" |
| F19 | `/feedback/alert` | Not properly glassy, rounded, or idiomatic/Apple-like. |
| F20 | `/feedback/toast` | Animation is awful; should be exactly like our refined dialog. |
| F21 | `feedback/F21-scroll-progress-rim.png` | `/feedback/progress` scroll-progress rim is broken and ill-defined. |
| F22 | `feedback/F22-progress-loop-jitter.png` | Animated loop is jittery and not eased correctly. |
| F23 | slider/progress family | What of the enlarged slider view, the gradiated blurring — what of the progressbar/slider/etc **deduplication**: same logic, DRY them out. |
| F24 | `/feedback/skeleton` | Animation is too slow. |
| F25 | `/feedback/confirm-dialog` | How is this any different from a normal dialog. |
| F26 | `/feedback/completion-seal` | Greatly overfit; likely belongs only in speedtest. |
| F27 | `feedback/F27-dock-vertical-scroll.png` | Why can I vertically scroll in the dock. |
| F28 | `feedback/F28-blur-inconsistency.png` | These blurs are inconsistent — ensure this is intentional. |
| F29 | `/motion/springs` | Redesign with better configurator support. |
| F30 | `/motion/tempo` | "What even is" this page. |
| F31 | `feedback/F31-curve-gallery-padding.png` | `/motion/curve-gallery` — why all the bottom padding; redesign the page; **properly modularize the easing-curve component**. |
| F32 | `/motion/reveal` | What is this vs our other scrolling components. |
| F33 | `/motion/deck` | What is deck vs carousel — likely collapse. The dot animations need dramatic refinement. |
| F34 | `feedback/F34-handmark-awful-1.png` | `/motion/handmark`: looks awful. |
| F35 | `feedback/F35-handmark-pen-like.png` | As does this — should be more pen-like, more natural. |
| F36 | `feedback/F36-handmark-broken.png` | Doesn't even work. |
| F37 | `feedback/F37-handmark-disjointed.png` | Broken and disjointed. |
| F38 | `feedback/F38-handmark-greenfield.png` | Each one generally awful — **should be greenfielded**. |
| F39 | `feedback/F39-handmark-layering.png` | Wrong layering, awful smoothing, awful encapsulation. |
| F40 | `feedback/F40-handmark-meta-text-SE.png` | Remove ALL reference to meta text (what is "SE") — awful, grand redesign. |
| F41 | `feedback/F41-text-motion-npm-install.png` | `/motion/text-motion` — "wtf is this npm install bit?" |
| F42 | `/motion/scroll` | What is this vs our other scrolling items. |
| F43 | `feedback/F43-auth-shell-putrid.png` | `/compositions/auth-shell` — colors somewhat putrid; why does this have its own category. |
| F44 | `/compositions/settings` | "Wtf even is" this — likely overfit nonsense. |
| F45 | `feedback/F45-gate-pattern-rounding.png` | `/compositions/gate-pattern` improper rounding — **the entire compositions section is likely to be pruned**. |
| F46 | `feedback/F46-intro-double-card.png` | `/foundations/intro` — why wrapped in TWO layers of cards; most blank; slow to load. |
| F47 | `feedback/F47-dock-ux.png` | Dock UX increased dramatically: scrolling dock must show there's more left/right with subtlety; clicking an edge-occluded item auto-scrolls the dock (vertical and horizontal). **The dock likely needs to be greenfielded, again**, with better UX and affordances in mind. |
| F48 | `feedback/F48-hierarchy-blur-rounding.png` | Design hierarchy, blurring, rounding — app AND framework wide — adjusted. Glass blur for ALL glass components slightly more subtle. Dialog rounding consistent with cards. Background blur better. |
| F49 | `feedback/F49-openai-popup-subtle-blur.png` | OpenAI popup reference — notice the subtle blurring. |
| F50 | `feedback/F50-gradient-blur-behind.png` | Gradient blurring behind the element — popovers/modals should likely have something like this; experiment with it at least, judge effectiveness and design. |

## Non-screenshot asks (same corpus, same standing)

| Row | Ask |
|-----|-----|
| A01 | Engagement affordance edict re-stated: when an interactive element is engaged, it affords/expresses that state meaningfully (EVERY component audited for this). Sliders: modal-expansion variant on mobile + grow-on-engage variant (slightly larger, pops out of its shell, graceful eased curve) — stacked, both possible. Other elements may have modal variants too. Novel facilities — BEST iOS 27; breath-of-life; aristotelian proportion in the abstract. |
| A02 | `/Users/mkbabb/Downloads/New Folder With Items 4` — iOS 27 videos + screenshots: detailed frame-by-frame analysis with Fable; mark and note items. (8 recordings + ~17 stills, June 20–Jul 15.) |
| A03 | iOS 27 aristotelian-proportion research: proper research → harden → tranche-write triumvirate, twice critiqued; critics default-assume the current state is wrong. |
| A04 | Tranche archaeology: PROPER analysis of ALL tranches hitherto, special emphasis on BI's lessons; maximize the coming tranche's development for maximal parallelization + maximal workflow execution (design the multidimensional graph and wave specs optimally, for development AND execution). |
| A05 | Component DAG + ruthless reduction: detailed DAG of all components, then reduce to those truly hardened/refined/worthy. One consumer is NOT enough. Purge to the core: glass, animation, procedural animation, into a perfected union. |
| A06 | Story meta-framework: codify + standardize every story page — content, margins, padding, intro, scrolling animations, heros, headers, code-context views. Page variants per story type (category vs component vs configurator etc. — brainstorm the types). A series of workflows deployed for this refinement. |
| A07 | Colocation grand edict (ALL file directories): components colocated with sub-components, composables, skeletons, constants — recursively. Only truly module/global-level composables in `composables/`; same for styles. Long-running dirs broken into common modules. Backend equivalents befitting those languages. |
| A08 | Implementation acceleration: what expedites/parallelizes further; every implemented wave aggressively challenged by ≥2 challenging+gestalt passes (total-tranche analysis: was the wave optimal, was spec adhered to, frictions), wave analysis, feature analysis. |
| A09 | In-progress features get proper tranche/wave addenda, not ad-hoc patches: triumvirate (research, harden, addenda-write) + twice challenged (assume faulty, prove otherwise) + gestalt analysis. |
| A10 | Aristotelian proportion audit of cards/components/affordances/hierarchy/margins/paddings/dividers/small UI; mark superfluous/duplicative/distracting elements for removal; mark the converse (more affordance needed). |
| A11 | "What of our breath of life?" — the engagement edict's standing check. |
| A12 | Blob greenfield: look to the OLD value.js implementation (several months back) — cartoon-like shadow, better lighting, more expressive, proper metaballing, better emotional states, high + dynamic interactivity. |
| A13 | Aurora modes expressly defined — likely greenfield. Extant exemplars (sky, dawn, dusk) good — how can they be better; a PROPER van-Gogh mode, a proper oil-pastel brush mode (extant is awful), a proper crayon/hand-drawn mode. |
| A14 | Procedural components codified and better formed (umbrella over A12/A13). |
| A15 | Fable-class models leveraged more often for this grand audit — never for trivialities. |
| A16 | MAXIMAL parallelization; NOTHING from the misfiring of BI or previous dropped. |
| A17 | Story pages + preview cards slow-load/stutter class (perf): partial load then stutter (F01); slow to load (F46). Performance is a first-class lens. |

## Consumer field reports (post-corpus, 2026-07-23+)

Findings from live consumers after the 2026-07-17 corpus closed. Same disposition rule as the F-rows:
an owning wave, a fold, or a retire — no silent drop.

| Row | Anchor | Finding | Disposition |
|-----|--------|---------|-------------|
| CFR-01 | `feedback/F19-metric-badge-overround-grid.png` · `addenda/2026-07-23-metric-shape-consumer-report.md` | `sci-report` bid-review (glass-ui 6.0.0): `<MetricBadge>` (`rounded-full`) used in a four-up summary grid reads as an over-rounded, left-weighted pill with dead right-space — "padding here is gross and far too rounded." The correct member is `MetricCell appearance="dashboard"` (card, `rounded-lg`, `p-3`, stacked). F09 re-observed on the metric family; corroborates F15/F18, asks A05/A10. | BAND-REDUCTION owns: metric-family shape as an opinionated default (grid → card, never pill), a badge/cell/stack chooser doc, and a metric row in the F15 rounding audit; carry-forward seed to the forthcoming tranche's metric consolidation. Consumer already remediated. |
