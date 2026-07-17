# Round 1 — consumer truth / component DAG (?)

## Summary

The 7.0.0 close is WRONG on consumer truth: the "clean break, no ask" decisions rest on a structurally vacuous probe — `proof:fold-delete`'s "no consumer import" clause and the roster's "none external"/"invariant-11 probe: 0" claims are scoped in-repo only (the foreign-tree fence forbids probing siblings), so they cannot fail on an external consumer, yet three retired subpaths (sheet, confirm-dialog, toggle-chip) are each imported by 2-4 sibling repos. Two of the user's deletion sentences carry misattributed provenance (completion-seal is sci-report's, not speedtest's; deck's real consumer is atlas, not slides), so executing them breaks a repo the roster never names. The metric consolidation already landed on disk (granular subpaths + MetricBadge removed) while the cross-repo ask stays marked "born-RED/proposal-gated" and internally contradicts MIGRATION.md.

## Findings (7)

### [major] in-repo-scoped-consumer-probe-vacuous

**Claim:** The 'no consumer import' clause of proof:fold-delete and the roster's 'none external'/'invariant-11 probe: 0' assertions are structurally in-repo-only (the foreign-tree fence bars probing siblings), so they cannot fail on an external consumer — and they are false: /sheet, /confirm-dialog, and /toggle-chip (all ABSENT in the 7.0.0 export map) are each imported by 2-4 sibling repos.

**Evidence:** MIGRATION.md:1079-1083 asserts 'no /sheet or /confirm-dialog consumer found ... locked by proof:fold-delete (dialog-sheet clause: ... no consumer import)'; asks-and-consumes.md fold-ledger says toggle-chip 'none external (invariant-11 + foreign-tree probe: 0)'. Reality — /sheet: speedtest/src/components/dashboard/ResultDetailSheet.vue:3, muster/frontend/src/components/verdict/WhyThisWonSheet.vue:31, muster/frontend/src/components/share/ShareButton.vue:29. /confirm-dialog: muster/frontend/src/App.vue:69, words/frontend/src/components/custom/sidebar/SidebarWordListView.vue:165 (+SidebarWordListItem.vue:113, WordlistDashboard.vue:166, WordListView.vue:236, SearchBar.vue:105), value.js/demo/palettes/PalettesPane.vue:133, value.js/demo/palettes/browser/admin/AdminUsersPanel.vue:186. /toggle-chip: speedtest/src/components/survey/SurveyField.vue:162, muster VoterRow.vue:21 + OriginPrefsPopover.vue:36, bbnf-buddy/src/components/EmotionStateSelect.vue:15 + OffsetEditor/OffsetPicker.vue:19, value.js demo EasingSpecimenStrip.vue:14. asks-and-consumes.md coordination doc's foreign-tree fence text explicitly states 'no glass-ui gate probes a sibling tree'.

**Proposed:** fold-into-cross-repo-asks — replace the vacuous in-repo 'no consumer import' clause with an enumerated sibling-import roster; file by-name migration asks for the sheet (speedtest×1, muster×2), confirm-dialog (muster×1, words×5, value.js-demo×2), and toggle-chip (speedtest×1, muster×2, bbnf×2, value.js-demo×1) consumers before the 7.0.0 tag.

### [major] consumer-provenance-misattribution

**Claim:** completion-seal is sentenced as 'speedtest-only', but speedtest imports it zero times; its real external consumer is sci-report. The /completion-seal subpath is still PRESENT, so executing the delete breaks sci-report with no ask row anywhere in the roster.

**Evidence:** speedtest grep for completion-seal/CompletionSeal = 0 hits. sci-report/dashboards/home/gallery/CategoryHomeView.vue:4 and sci-report/dashboards/home/gallery/GalleryView.vue:19 both `import { CompletionSeal } from "@mkbabb/glass-ui/completion-seal"`; sci-report/vite.config.ts:7 references it as a build-preset target. package.json exports still carries `./completion-seal` (PRESENT). asks-and-consumes.md sci-report census lists only glass-panel (row 8) + metric-family (row 10) — no completion-seal row; in-repo the only consumer is demo/stories/feedback/completion-seal.vue.

**Proposed:** retire — completion-seal may still be deleted (single external repo is not a keep per the user ruling), but the sentence's 'speedtest-only' provenance is wrong; retarget the migration ask to sci-report (2 sites) and correct the census before deletion.

### [major] surface-cut-ahead-of-consumer-relay

**Claim:** The metric consolidation has already LANDED on disk — the granular /metric-badge, /metric-cell, /metric-stack subpaths are removed and the MetricBadge component is deleted outright — yet the cross-repo ask (row 10) is still marked 'born-RED / proposal-gated / file when BI.W-metric-move lands', and the roster's keep-set (row 15 'cell/stack/badge SHARED-KEEP') contradicts MIGRATION.md:421 which says MetricBadge was removed. Three external repos import the now-absent granular subpaths and the deleted symbol.

**Evidence:** package.json exports: `./metric` PRESENT; `./metric-badge`, `./metric-cell`, `./metric-stack` ABSENT (removed in commit 490cc46e 'land the Glass 7 ... public-surface cut'). `grep -rn MetricBadge src` = 0 hits; no src/components/metric-* dirs (metric dir holds only Metric/MetricCell/MetricRow/MetricStack.vue). Consumers still on granular subpaths: speedtest ResultStack.vue:172 (/metric-stack), SpeedtestResults.vue:641 (/metric-badge), SharedResultView.vue:104 + ResultDetailSheet.vue:7 (/metric-cell); muster RankedVerdict.vue:40 + WhyThisWonSheet.vue:35 (/metric-stack), TravelMatrix.vue:27 (/metric-cell), WinnerHero.vue:48 (/metric-badge); sci-report 03-trend/Point.vue:26 + 01-window-arc/Point.vue:20 (/metric-badge). MIGRATION.md:421 'MetricBadgeProps removed 7.0.0 — /metric-badge folded into /metric; compose Metric in ./badge' vs asks-and-consumes.md row 15 'cell/stack/badge SHARED-KEEP'.

**Proposed:** fold-into-cross-repo-asks — transition row 10 from 'proposal-gated' to FILED (the wave landed at 490cc46e), reconcile row 15's 'badge SHARED-KEEP' with the MetricBadge deletion, and enumerate the /metric-badge, /metric-cell, /metric-stack re-point + MetricBadge-recompose asks for speedtest/muster/sci-report.

### [major] consumer-provenance-misattribution

**Claim:** deck is sentenced 'vs carousel' with slides named as its /deck consumer, but slides never imports glass-ui/deck (it uses its own @/deck module; the glass-ui refs are aspirational comments). deck's real external consumer is atlas, which imports the useDeck/DeckCore runtime — so deleting deck breaks atlas, a repo the roster never associates with /deck.

**Evidence:** slides real imports resolve to its own `@/deck/*` (slides/src/main.ts:4, decks/registry.ts:1, til-briefing/deck.ts:2, etc.); every `@mkbabb/glass-ui/deck` string in slides is a comment ('the eventual @mkbabb/glass-ui/deck' — slides/src/deck/useDeck.ts:4, DeckSlide.vue:10, DeckPager.vue:15, deckKeys.ts:2). Real external consumer: atlas/src/stage/useStageDeck.ts:2 `import { useDeck } from "@mkbabb/glass-ui/deck"` and atlas/src/stage/useDeckDetent.ts:1 `import { useDeck, type DeckCore } from "@mkbabb/glass-ui/deck"`. asks-and-consumes.md census: 'slides — /deck ...' (wrong repo); atlas census row omits /deck.

**Proposed:** retire-with-ask — /deck is not carousel-duplicate at the API surface atlas consumes (useDeck/DeckCore headless engine, not the Carousel component); if deleted, the ask targets atlas (2 sites), not slides. Correct the census provenance.

### [minor] incomplete-consumer-census

**Claim:** slides imports two subpaths that 7.0.0 removes — the retired /hover-card and the retired /controls — but the roster's hover-card ask (row 9) lists only words+atlas and no ask enumerates the /controls→/dark-mode-toggle move for slides or bbnf-buddy, so slides' break is uncaptured by the relay.

**Evidence:** /hover-card ABSENT at 7.0.0 (folded to Popover, src/index.ts:100-102); slides/src/decks/feedback-coder/components/CodedTurnBank.vue:20 `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui/hover-card"` — asks-and-consumes.md row 9 covers only 'words ×12-13 · atlas ×1'. /controls ABSENT at 7.0.0 (MIGRATION.md:45 'Import DarkModeToggle from @mkbabb/glass-ui/dark-mode-toggle. The collective alias is removed'); slides/src/views/HomeView.vue:4 and slides/src/deck/DeckSettings.vue:9 import DarkModeToggle from @mkbabb/glass-ui/controls; census lists /controls for slides + bbnf-buddy but no ask row files the migration.

**Proposed:** fold-into-cross-repo-asks — add slides to row 9 (hover-card→Popover) and add a /controls→/dark-mode-toggle migration ask for slides (2 sites) + bbnf-buddy.

### [note] reduction-candidate-inventory

**Claim:** DAG adjacency (external-consumer edges for the export subpaths) yields the true reduction set: liquid-grid and header-ribbon have ZERO consumers outside the demo (and zero src-internal importers) = prime deletes; several single-external-repo components are keep-ineligible under the user's single-consumer ruling.

**Evidence:** Zero-external + zero-src-internal (demo-only): liquid-grid (only demo/stories/substrates/liquid-grid.vue; no src importer; no sibling import) and header-ribbon (only demo/stories/navigation/header-ribbon.vue; no src importer; no sibling import — note asks-and-consumes BI.W-SYNONYM-RENAMES claims words/atlas/muster/sci-report HeaderRibbon consumers, unsupported by grep). Single-external-repo (NOT sufficient to keep per ruling): handmark→atlas only; watercolor-dot→value.js only; timeline→speedtest only; scroll-progress-rim→atlas only. Multi-consumer keeps: typewriter (atlas+words), pulse (muster+speedtest), paper-backdrop (atlas+speedtest), expandable-container (atlas+speedtest), fading-scroll (atlas+speedtest+value.js). The demo 'compositions' section (demo/stories/compositions/: auth-shell, chassis, empty-states, form-validation, gate-pattern, settings) is demo-only pages, no src/external consumer — safe to sentence; note tests/components/dialog.confirm-preset.test.ts imports GatePatternStory + DialogStory + ConfirmDialogStory, so removing those stories breaks that test.

**Proposed:** build — delete liquid-grid + header-ribbon (zero consumers); evaluate handmark/watercolor-dot/timeline/scroll-progress-rim for single-external-repo relocation per the user's single-consumer ruling; the compositions demo section is a clean demo-only delete after re-homing the confirm-preset test fixtures.

### [note] sentence-blast-radius-confirmed

**Claim:** instrument-chassis is NOT a demo-only reduction candidate — it is consumed by two external repos (speedtest + muster) via the PRESENT /instrument-chassis subpath, so the deletion sentence carries a real 7-site cross-repo blast radius (covered by roster row 10 but marked proposal-gated).

**Evidence:** /instrument-chassis PRESENT in exports. speedtest/src/App.vue:257 (InstrumentChassis), speedtest/src/composables/useRouteTransition.ts:34. muster/frontend/src/App.vue:31 + useMusterApp.ts:33 (InstrumentChassisPhase) + shell/VerdictStage.vue:11 + shell/InstrumentAside.vue:17 (ChassisDivider) + verdict/WinnerHero.vue:46-47. In-repo only demo/stories/data/instrument-chassis.vue + 2 tests. asks-and-consumes.md row 10 bundles it into the metric-family move as 'born-RED, proposal-gated'.

**Proposed:** fold-into-cross-repo-asks — treat instrument-chassis deletion as a filed 2-repo (speedtest+muster) ask, not a quiet demo-only prune; activate row 10 rather than leaving it proposal-gated.

