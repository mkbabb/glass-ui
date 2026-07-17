# Harden — challenge-design

## Scope

CHALLENGE-2 (design lens) over BAND-STORY, BAND-MATERIAL, BAND-REDUCTION, and ASK-REDUCTION. Verdicts grounded in on-disk verification at HEAD v6.0.0-63-g67d84908 (package 7.0.0). Written to docs/tranches/BJ/formation/challenges/CHALLENGE-2-DESIGN.md.

## Summary

All four drafts are fundamentally sound and evidence-grounded; I reproduced every load-bearing born-RED on disk. BAND-REDUCTION is the strongest — its consumer-truth spine correctly honours the header-ribbon KEEP (in no delete roster) and the atlas /deck consumer, and uses the round-2 corrected counts. The material defects: (1) a cross-band contradiction — BAND-STORY W1 folds/keeps the liquid-grid story page while BAND-REDUCTION W3 deletes the component it depends on (RULING-NEEDED, recommend DELETE); (2) BAND-STORY W4 offers an unsound 'retire the heroScale field' branch — the field is live at StoryPage.vue:30->:89, dead only on the landing path; (3) BAND-STORY W6 scopes to '128 story routes' but 128 is the .vue FILE count, navigable routes = 100 per census; (4) BAND-MATERIAL W1/W2 born-RED probes cite an absent theme/glass.css and theme/light-dark.css — the tokens live at tokens/glass.css:138-153 and tokens/light-dark.css:36 (substance reproduces, anchors must be re-pathed); (5) two genuine unassigned/unpinned obligations correctly flagged and needing ruling: the typography-codemod ownership (OPEN-B) and the scene-type membership vs the compositions prune (OPEN-D9 / ASK-D1). Full analysis with file:line evidence at docs/tranches/BJ/formation/challenges/CHALLENGE-2-DESIGN.md.

## Verdicts (14)

### [SOUND] BAND-STORY (band)

Every load-bearing born-RED reproduces on disk: manifest.ts has 0 pageType hits; StoryPage.vue:32 is the single hero|page axis; --story-article-w has 1 ref (StoryPage.vue:51) and 0 definitions; hero-scale="4" hardcoded at CatalogLanding.vue:18 + SectionLanding.vue:28; auth-shell.vue:39-41 ships fabricated SOC2/E2E/12k-teams credentials; handmark.vue:26/67/117-120 ship the aria-hidden-SVG/se-guard meta-prose. Codex boundary discipline (law 4/law 10, perf fenced to family E) is clean. Three amendments below.

### [RULING-NEEDED] BAND-STORY W1 TAXONOMY

W1 lists demo/stories/substrates/liquid-grid.vue as a studio-variant fold target (G-TAX-3 + a DELTA-capture obligation), treating it as a surviving page. But BAND-REDUCTION W3 deletes src/components/liquid-grid/ outright, and the story page imports LiquidGrid from it (liquid-grid.vue:18) so it cannot survive the delete. Same artefact, opposite fate; neither band reconciles it. Recommend DELETE wins (round-2: zero external/library consumers; F04/A05 parsimony) — BAND-STORY should drop liquid-grid from the fold roster; the taxonomy still proves out on studio/dock/family.

### [AMEND] BAND-STORY W4 WIDTH-HIERARCHY-TRUTH

The gate G-WID-2 / row W-2 alternative 'retire the unused heroScale field' is unsound. heroScale is live: StoryPage.vue:30 reads story.heroScale ?? "4" and passes it at :89 to StoryHero for hero-variant pages; manifest.ts:179/273/332 keep it a real override axis. The dead-data defect is landing-scoped ONLY (SectionLanding/CatalogLanding hardcode "4", ignoring landing.heroScale). Strike the retire branch; the sound fix is the data-bind on the two landings. Width-token define/collapse and the h1/h2 dedup are SOUND.

### [AMEND] BAND-STORY W6 RESPONSIVE-AUDIT

Scope 'a per-page responsive audit across all 128 story routes' (line 431) conflates counts: 128 is the demo/stories .vue FILE count (includes non-navigable sub-components like OklchStopRow.vue, NucleiOverlay.vue, RendererStatus.vue). The census the charter names says 100 navigable routes (1 home + 11 landings + 88 story). Auditing 128 'routes' sends the executor at ~28 non-routes. Scope to 100; relabel 128 as a file count (the 65/128 grep ratio is fine, the 'story routes/pages' prose is not).

### [AMEND] BAND-STORY OPEN-D9 (scene type)

OPEN-D9 anchors the scene type to 'full-bleed composition demos (auth-shell etc)' — i.e. demo/stories/compositions/ (6 pages, confirmed). But ASK-REDUCTION D1 and BAND-REDUCTION W3 prune the ENTIRE compositions section. If scene's only candidate members are deleted, W1 mints an empty taxonomy type — the overgrowth its own KISS clause forbids. Make scene membership contingent on the compositions-prune ruling: if pruned, taxonomy is 6 types not 7.

### [SOUND] BAND-MATERIAL (band)

Substance reproduces: --radius-input misnomer (radius.css:35, 3 media consumers Skeleton/avatar/command, 0 Input); --corner-k-soft/-sharp dead (radius.css:118-119, 0 var consumers); raw radii SortableList.vue:144 999px + segmented.css:169/306; drawer/styles.css:379 blur(14px); 2dppx overlay bump to 17px (tokens/light-dark.css:36); halo cohort tokens/glass.css:171-173 + ModalOverlay.vue:49 + placement.css:141. The 'mature systems, reconciliation-shaped defects' framing and the live-π-before-defect discipline are exactly right. Amendments are citation-hygiene + one ownership gap.

### [AMEND] BAND-MATERIAL W1 RADIUS-ROLE

The OPEN-1a live-π discipline is correct, but the routing sentence names only F09/F10/F11 to BAND-STORY W-CONFIGURATOR-STD. F12 (tags-input) and F17 (search) have NO named owner if the live-π reproduces them — W-CONFIGURATOR-STD owns the configurator, not those compositions. Name an owner for F12/F17-if-reproduced, or explicitly state the live-π is expected to clear them and record the drift; do not leave them dangling between material and story.

### [AMEND] BAND-MATERIAL W2 BLUR-LADDER

The born-RED acceptance probes cite absent/wrong anchors: src/styles/theme/glass.css, theme/light-dark.css, glass-deep.css do NOT exist. The blur ladder is defined at tokens/glass.css:138-153 (not glass.css:86-97 — that range in src/styles/glass.css is a comment); the 2dppx arm is tokens/light-dark.css:36 (not light-dark.css:40); the deep rung is glass/deep.css:78. An executor greps the cited lines and finds a comment/wrong file. Re-path theme/glass.css->tokens/glass.css, theme/light-dark.css->tokens/light-dark.css, glass-deep.css->glass/deep.css, re-anchor the ladder to :138-153. Substance (collision, DPI arm, one-7px material) reproduces.

### [SOUND] BAND-MATERIAL W3/W4/W5

W3 graded-backdrop judgment-gate is correctly framed as adopt-or-decline against codex law 1 and the chronic:experiment-frozen-into-major ledger, with the cohort verified on disk. W4 track-DRY census is accurate (glass-liquid-fill is genuinely the shared fill register) and the fold-the-material/keep-the-driver split is the parsimonious call. W5 aristotelian-proportion is correctly a review wave with a π-capture (not assert) obligation.

### [RULING-NEEDED] BAND-MATERIAL OPEN-B (typography-codemod)

Genuinely unassigned obligation, correctly flagged not dropped: BAND-GATES W4 assigns the 251-site text-sm/text-xs codemod + default-ramp reset to 'the Family F typography wave' = this band, whose five-wave scope does not include it. The ramp-reset gate stays RED until the codemod lands and no drafted wave owns it. Rule the home: a 6th BJ.W-TYPE-CODEMOD here, or BAND-STORY (where 232 demo sites concentrate), or BAND-GATES W4 all-in.

### [SOUND] BAND-REDUCTION (band)

Strongest draft; the consumer-truth discipline the charter demanded is present and correct. Header-ribbon appears only as the cautionary lesson, in NO delete roster (respects the round-2 KEEP + keyframes.js consumer). Atlas /deck respected via ASK-C1 keep-as-headless-engine. Round-2 corrected counts used throughout. Honest DELTA-class split (null vs real vs intentional-surface). Cuts spot-verified: Card.vue:33/38 defaults, slider/types.ts:25 keepDockOpen, fourier-field/presets.ts 0 importers, dialog.confirm-preset.test.ts:7 blast radius, progress getValue* present with honest as/asChild retraction.

### [RULING-NEEDED] BAND-REDUCTION W3 (liquid-grid)

W3 deletes src/components/liquid-grid/ + the ./liquid-grid export, but names only the component + StoryHero suffuse re-home — it does not own the liquid-grid STORY-PAGE deletion that necessarily follows (the page imports the deleted component at liquid-grid.vue:18), while BAND-STORY W1 independently plans to KEEP+normalize that same page. Same cross-band conflict as BAND-STORY W1; rule liquid-grid's single fate (recommend DELETE) and make W3 explicitly own the story-page removal.

### [SOUND] ASK-REDUCTION (doc)

Q051 single-ask style; each row separates Evidence (verified on disk) from labelled Recommendation-on-record from The-question from Unblocks — no recommendation smuggled as fact. Corrected consumer truth is load-bearing and honest: A2 leads with completion-seal's wrong speedtest provenance (retargets sci-report+atlas); C1 surfaces the atlas useDeck fact and that slides deck-imports are comments; A1 frames both the ratify and the costed-break outcomes fairly. Coverage complete against every FEEDBACK-LEDGER reduction row (F18/F25/F26/F30/F32/F33/F42/F43/F44/F45) plus the census overfit calls. Nothing silently dropped.

### [AMEND] ASK-REDUCTION D1 (compositions)

Minor: D1 asks whether compositions prunes whole and gestures at 'the family-D story-meta-framework call' but does not name the concrete stake — its answer determines whether BAND-STORY's scene type (OPEN-D9) has any members. Add the explicit cross-ref so the user sees that pruning compositions empties the scene taxonomy type. Ties to BAND-STORY AMEND-3.

