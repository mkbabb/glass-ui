# Round 2 — Adversarial verification of round-1 consumer-truth / component-DAG claims: re-proving every sibling-import claim on disk against glass-ui 7.0.0 (HEAD 48eb522f), building the per-repo x per-subpath break table that becomes the Q060 outbound ask roster.

## Summary

Round-1's HEADLINE claims REPRODUCE: /sheet (speedtest x1, muster x2), /confirm-dialog (muster x1, words x5, value.js-demo x2), /toggle-chip (speedtest x1, muster x2, bbnf-buddy x2, value.js-demo x1), /metric-cell, /metric-stack, and /deck (atlas real via useStageDeck.ts:2 + useDeckDetent.ts:1; slides matches are all COMMENTS) all verify byte-for-byte on disk, and the completion-seal speedtest=0 + liquid-grid zero-consumer claims hold. The vacuous-in-repo-probe thesis is sound. BUT the consumer census that feeds the Q060 roster is materially WRONG in five places that would produce wrong or missing mail: (1) /controls (DarkModeToggle, REMOVED at 7.0.0 -> /dark-mode-toggle) is consumed by EIGHT repos (~11 component sites) yet round-1 finding-6 + the charter roster name only slides+bbnf, so speedtest/muster/words/value.js/atlas/sci-report get NO ask and break on the bump; (2) /metric-badge (REMOVED -> /metric) is imported across the ENTIRE fourier-analysis repo (7 files) plus speedtest SurveyResultDock + muster CommandDock, none in round-1's speedtest/muster/sci-report list; (3) round-1's note that header-ribbon has ZERO consumers (a "prime delete") is FALSE — keyframes.js/demo EditorShell.vue:116 imports it, and MIGRATION.md:115 marks the subpath KEPT, so the delete proposal is doubly unfounded; (4) the /hover-card roster row "atlas x1" is PHANTOM (atlas imports zero hover-card) while real consumers speedtest MapTooltip.vue:36 + fourier-analysis x2 were missed; (5) completion-seal's real consumer set adds atlas x2 (completion.ts:5 + category.ts:2), missed by round-1's sci-report-only retarget. Version pins per manifest: ALL consumers sit BEHIND 7.0.0 (speedtest ^4.0.1, muster ^3.1.0, words ^3.0.0, bbnf-buddy ^3.9.0, atlas ^6.0.0, sci-report/dashboards 6.0.0, slides 3.13.0, fourier-analysis ^4.0.0, value.js-demo + keyframes.js UNDECLARED, pencil-boil not a consumer) — every break is prospective on the bump. BREAK TABLE (subpath -> successor | consumer:sites): /sheet->/dialog | speedtest:1, muster:2 . /confirm-dialog->/dialog | muster:1, words:5, value.js:2 . /toggle-chip->/chip | speedtest:1, muster:2, bbnf:2, value.js:1 . /metric-badge->/metric | speedtest:2, muster:2, sci-report:2(+1proto), fourier:7 . /metric-cell->/metric | speedtest:2(+1test), muster:1 . /metric-stack->/metric | speedtest:1, muster:2 . /hover-card->/popover | speedtest:1, words:13, slides:1, fourier:2 (atlas:0) . /controls->/dark-mode-toggle | speedtest:1, muster:1, words:1, value.js:2, bbnf:1, atlas:2, sci-report:1(+1proto), slides:2.

## Findings (7)

### [major] removed-subpath-external-consumer-undercount

**Claim:** /controls (DarkModeToggle) is REMOVED at 7.0.0 (collective alias deleted, successor /dark-mode-toggle per MIGRATION.md:45) and is imported by EIGHT sibling repos (~11 component sites), but round-1 finding-6 and the charter roster enumerate only slides+bbnf-buddy — so six consumer repos would receive NO Q060 migration ask and break silently on the 7.0.0 bump.

**Evidence:** package.json exports at HEAD 48eb522f lists ./dark-mode-toggle but NOT ./controls (ABSENT). Real component imports of `DarkModeToggle from '@mkbabb/glass-ui/controls'`: speedtest/src/components/AppSettingsButton.vue:98; muster/frontend/src/components/dock/CommandDock.vue:44; words/frontend/src/components/custom/sidebar/SidebarHeader.vue:80; value.js/demo/shell/dock/menus/MobileMenuDropdown.vue:6 + value.js/demo/shell/dock/menus/ProfileSection.vue:8; bbnf-buddy/src/editor/components/SettingsPanel.vue:9; atlas/src/platform/chrome/dock/DockSettings.vue:23 + atlas/src/platform/chrome/dock/components/DockFoot.vue:23; sci-report/dashboards/home/gallery/GalleryView.vue:18 (+ prototype copy sci-report/atlas/docs/tranches/O/exec/evidence/O-B9/impl/gallery-split/GalleryView.vue:19); slides/src/deck/DeckSettings.vue:9 + slides/src/views/HomeView.vue:4. Round-1 finding-6 evidence names only 'slides (2 sites) + bbnf-buddy'. (keyframes.js already imports /dark-mode-toggle x3, i.e. it is pre-migrated.)

**Proposed:** fold-into-cross-repo-asks — file /controls->/dark-mode-toggle migration asks for all eight repos (speedtest x1, muster x1, words x1, value.js-demo x2, bbnf-buddy x1, atlas x2, sci-report x1, slides x2), not just slides+bbnf.

### [major] removed-subpath-external-consumer-undercount

**Claim:** /metric-badge is REMOVED at 7.0.0 (MetricBadge symbol deleted from src, fold into /metric per MIGRATION.md:420-422) and the ENTIRE fourier-analysis repo (7 files) imports it — plus speedtest SurveyResultDock and muster CommandDock — yet round-1 finding-3's consumer census lists only speedtest/muster/sci-report and omits fourier-analysis completely.

**Evidence:** package.json: ./metric-badge ABSENT, ./metric PRESENT; `grep -rn MetricBadge src` = 0 hits (component removed at commit 490cc46e). fourier-analysis imports `MetricBadge from '@mkbabb/glass-ui/metric-badge'` in web/src/components/equation/EquationView.vue:10, equation/InfoCard.vue:4, visualization/AnimationControls.vue:10, visualization/EditorControlsDock.vue:5, visualization/EquationPanel.vue:12, visualization/gallery/GalleryAdminBanner.vue:5, visualization/gallery/GalleryDraftsSection.vue:8 (fourier-analysis pins glass-ui ^4.0.0). Also missed: speedtest/src/components/survey/SurveyResultDock.vue:166 and muster/frontend/src/components/dock/CommandDock.vue:42. Round-1 finding-3 evidence lists only speedtest SpeedtestResults.vue:641 + muster WinnerHero.vue:48 + sci-report Point.vue x2.

**Proposed:** fold-into-cross-repo-asks — add fourier-analysis (7 sites) as a MetricBadge->Metric recompose ask and correct the speedtest/muster counts (x2 each, not x1).

### [major] delete-proposal-contradicted-by-live-consumer

**Claim:** Round-1's note-finding asserts header-ribbon has ZERO consumers (a 'prime delete'), but keyframes.js imports it and MIGRATION.md:115 explicitly RETAINS the /header-ribbon subpath — so the reproduction fails on both the evidence (not zero) and the proposal (marked kept, so deleting it would break keyframes.js).

**Evidence:** keyframes.js/demo/components/instrument/shell/EditorShell.vue:116 `import { HeaderRibbon } from '@mkbabb/glass-ui/header-ribbon'` (real import, not a comment). package.json exports STILL carries ./header-ribbon (grep -c = 1, PRESENT at 7.0.0). MIGRATION.md:115 'HeaderRibbon retains the /header-ribbon subpath'. Round-1 note evidence claims 'header-ribbon (only demo/stories/navigation/header-ribbon.vue; no src importer; no sibling import) = prime delete'. Note keyframes.js declares NO glass-ui pin in package.json (undeclared consumer), which is why an in-repo-scoped probe missed it.

**Proposed:** retract-delete-proposal — header-ribbon is a KEEP (MIGRATION.md:115) with a live external consumer (keyframes.js); do not sentence it, and add keyframes.js to the consumer census as an undeclared glass-ui consumer.

### [minor] roster-phantom-row-plus-missed-consumers

**Claim:** /hover-card is REMOVED at 7.0.0 (fold to /popover per MIGRATION.md:875-878); the roster row round-1 cites lists 'words x12-13 · atlas x1', but atlas imports ZERO hover-card (the atlas x1 is phantom) while the real missed consumers are speedtest MapTooltip.vue:36 and fourier-analysis x2.

**Evidence:** package.json: ./hover-card ABSENT, ./popover PRESENT. Direct probe `grep -rn glass-ui hover-card atlas/src` = 0 hits — atlas does not import hover-card at all. Missed real consumers: speedtest/src/components/dashboard/MapTooltip.vue:36 `import { HoverCard, HoverCardContent, HoverCardTrigger } from '@mkbabb/glass-ui/hover-card'`; fourier-analysis/web/src/components/equation/EquationView.vue:9 + fourier-analysis/web/src/components/layout/AppHeader.vue:20. slides/src/decks/feedback-coder/components/CodedTurnBank.vue:20 (round-1 caught this one). Full real set: speedtest x1, words x13, slides x1, fourier-analysis x2.

**Proposed:** correct-the-roster — delete the phantom atlas hover-card row, add speedtest x1 + fourier-analysis x2 to the /hover-card->/popover ask alongside words x13 + slides x1.

### [minor] incomplete-provenance-retarget

**Claim:** Round-1 finding-2 correctly reassigns completion-seal from 'speedtest-only' (speedtest imports it zero times) to sci-report, but MISSES the second real consumer atlas, which imports CompletionSeal + CompletionSealShape in two files.

**Evidence:** atlas/src/design/recipes/completion.ts:5 `import { CompletionSeal, type CompletionSealProps, type CompletionSealShape } from '@mkbabb/glass-ui/completion-seal'` and atlas/src/skin/category.ts:2 `import type { CompletionSealShape } from '@mkbabb/glass-ui/completion-seal'`. Confirmed sci-report/dashboards/home/gallery/CategoryHomeView.vue:4 + GalleryView.vue:19. Confirmed speedtest completion-seal = 0. ./completion-seal is PRESENT at 7.0.0 (no break), so this is a census/ask-targeting correction, not a break.

**Proposed:** correct-the-census — completion-seal's external consumers are sci-report x2 AND atlas x2 (not sci-report-only); retarget any future ask to both.

### [note] present-subpath-census-undercount

**Claim:** Round-1's note on instrument-chassis lists speedtest x2, but speedtest imports it in four source files (missed ChartsView.vue + MapView.vue); the subpath is PRESENT at 7.0.0 so there is no break, but the blast-radius count is understated.

**Evidence:** speedtest instrument-chassis imports: src/App.vue:257, src/composables/useRouteTransition.ts:34 (round-1's two) PLUS src/views/ChartsView.vue:132 and src/views/MapView.vue:53 (+ test mock tests/App.surveyEntry.test.ts:101). muster set confirmed x5 (App.vue:31, shell/InstrumentAside.vue:17, shell/VerdictStage.vue:11, verdict/WinnerHero.vue:46-47, composables/useMusterApp.ts:33). ./instrument-chassis PRESENT in exports.

**Proposed:** correct-the-census — instrument-chassis is speedtest x4 + muster x5 (present, no break); update the count if the row is ever activated.

### [note] round-1-claims-reproduced-affirmed

**Claim:** The load-bearing round-1 claims reproduce exactly on disk and should stand: the sheet/confirm-dialog/toggle-chip external-consumer roster, the deck slides-are-comments/atlas-is-real reassignment, metric-cell/metric-stack consumers, and the liquid-grid zero-consumer + single-external-repo (handmark/watercolor-dot/timeline/scroll-progress-rim) inventory.

**Evidence:** SHEET: speedtest ResultDetailSheet.vue:3, muster ShareButton.vue:29 + WhyThisWonSheet.vue:31 (exact). CONFIRM-DIALOG: muster App.vue:69, words SearchBar.vue:105/SidebarWordListItem.vue:113/SidebarWordListView.vue:165/WordListView.vue:236/WordlistDashboard.vue:166, value.js PalettesPane.vue:133/AdminUsersPanel.vue:186 (exact x5+x2). TOGGLE-CHIP: speedtest SurveyField.vue:162, muster OriginPrefsPopover.vue:36+VoterRow.vue:21, bbnf EmotionStateSelect.vue:15+OffsetPicker.vue:19, value.js EasingSpecimenStrip.vue:14 (exact). DECK: atlas useDeckDetent.ts:1 + useStageDeck.ts:2 are real imports; every slides @mkbabb/glass-ui/deck string (useDeck.ts:4, DeckSlide.vue:10, DeckPager.vue:15, deckKeys.ts:2) is inside a comment. METRIC-CELL: speedtest ResultDetailSheet.vue:7 + SharedResultView.vue:104, muster TravelMatrix.vue:27. METRIC-STACK: speedtest ResultStack.vue:172, muster RankedVerdict.vue:40 + WhyThisWonSheet.vue:35. LIQUID-GRID: grep = 0 across all repos. handmark->atlas only (x3), watercolor-dot->value.js-demo only (x11), timeline->speedtest only (PhaseTimeline.vue:49), scroll-progress-rim->atlas only (DockCrest.vue:17). All version pins behind 7.0.0; pencil-boil is not a glass-ui consumer.

**Proposed:** affirm — these claims verify on disk; carry them into the Q060 roster unchanged. (Minor keep-list correction: fading-scroll's multi-consumer set also includes keyframes.js EasingTarget.vue:137, not just atlas+speedtest+value.js.)

