# REFABLE-RF-8 — the Q060 outbound mail pair

- **Unit**: RF-8 — q060 glass7-live announce + the speedtest tooltip correction
- **Original edict**: announce 7.0.0 + per-repo migration asks from the corrected consumer census; the send-now Tooltip correction to speedtest
- **Opus artifacts**: `docs/tranches/BI/coordination/glass-outbound-2026-07-17-q060-glass7-live.md` + `glass-outbound-2026-07-17-speedtest-tooltip-correction.md`
- **modelId**: claude-fable-5
- **Step-2 boundary**: the two artifacts were first opened 2026-07-18, after the full ANEW pass — surface diff (v6.0.0 tag vs HEAD package.json + `src/`), npm liveness probe, and the read-only consumer sweep of every sibling repo under /Users/mkbabb/Programming (find over package.json + specifier greps per repo). No coordination-dir content informed step 1.

## ANEW baseline (step-1, primary sources only)

- 7.0.0 live on npm (latest, 2026-07-17T22:18:38Z); tag `v7.0.0` = `4ab12128`, on master.
- Export keys 82→74: removed `./color-swatch ./controls ./focus-scope ./icon-chip ./icon-tooltip ./metric-badge ./metric-cell ./metric-stack ./motion-curves ./notification ./spa-view`; added `./dark-mode-toggle ./metric ./styles/theme`.
- Peers: kf `^5.2.0→^6.0.0`, value `^3.1.0→^4.0.0`; `class-variance-authority`/`clsx`/`perfect-freehand` dropped; `embla-carousel ^8.0` added (optional).
- Canonical consumers on disk (pin): speedtest `^4.0.1`, atlas `6.0.0`, slides `3.13.0`, sci-report/dashboards `6.0.0`, bbnf-lang/playground `^3.0.0`, bbnf-buddy `^3.9.0`, words/frontend `^3.0.0`, fourier-analysis/web `^4.0.0`, muster/frontend `^3.1.0`, value.js `^7.0.0` (adopted at `f2c8f565`), keyframes.js (no pin on main; V lane at 7.0.0).

## Verdict table

### OPUS-WRONG (10)

| # | Claim | Correction + evidence |
|---|---|---|
| W1 | Census/addressee list is complete at ten repos; "`/controls` is consumed by EIGHT repos" | **bbnf-lang is omitted from the entire mail** — `bbnf-lang/playground` pins glass-ui `^3.0.0` and imports `DarkModeToggle` from `/controls` at `playground/src/components/layout/NavBar.vue:6` (a live 7.0.0 break), plus the four-part tooltip family across 10 files (shape survives). `/controls` consumers are NINE repos, not eight. No per-repo section, no addressee slot. |
| W2 | §2 hover note: the Popover `trigger="hover"` axis "is a BJ deliverable … until it ships, wire hover-open locally" | **`trigger="hover"` shipped at the announced tag.** `git show v7.0.0:src/components/popover/Popover.vue` — `PopoverTriggerMode = "click" \| "hover"` (line 11), prop at 19, default `"click"` at 37, hover root logic at 63. MIGRATION §BI.W-OVERLAY-UNION prescribes `<Popover trigger="hover">` as the HoverPopover successor. The mail defers a live API and directs consumers (words ×13, fourier, slides, speedtest) to hand-roll it. |
| W3 | speedtest `/sheet` at `src/components/survey/ResultDetailSheet.vue:3` and `/metric-cell` at `…/survey/ResultDetailSheet.vue:7` | The only `ResultDetailSheet.vue` is `src/components/dashboard/ResultDetailSheet.vue` (:3 sheet, :7 metric-cell — line numbers correct, directory wrong in both rows). |
| W4 | speedtest roster (complete per-repo asks) | **Omits `/scrolling-text` ×2 live sites** — `src/components/AppSettingsButton.vue:97`, `src/components/dashboard/ResultDetailSheet.vue:6`. Dropped at 5.0.0; MIGRATION's retire-relocation section names AppSettingsButton.vue:97 and the local-copy adopt ask, so the census had it in hand. |
| W5 | speedtest roster (complete per-repo asks) | **Omits `/context-menu` ×2 live files** — `src/components/admin/AdminSessionsTable.vue:13`, `src/components/dashboard/ResultsTable.vue:15`. Dropped at 5.0.0 (v4.2.0→v5.0.0 tag diff); no successor row in the mail — and none in MIGRATION.md either (see routing). |
| W6 | "`instrument-chassis` … is PRESENT at 7.0.0, no break" | The subpath survives but speedtest's live binding breaks on three 7.0.0 chassis axes: `App.vue:100-104` binds `:variant="chassisVariant"`, `:phase="chassisPhase"`, and `#dial` — variant is removed, phase remaps to `state`, and the strip/dial/control slots are renamed stage/inspector/action (MIGRATION §7.0.0 rows 1-3). "No break" is false at the prop/slot level. |
| W7 | §6: keyframes.js "imports glass-ui (`/header-ribbon`, `/dark-mode-toggle` ×3, `fading-scroll`)" | Main at send time (`a59d3a22`, 2026-07-15, unchanged since) imports **nineteen** subpaths: aurora, chip, dark, dark-mode-toggle, dock, drawer, easing, fading-scroll, forms, header-ribbon, keyboard, labeled-field, metric, motion-core, status-dot, styles, tabs, toggle-group, tooltip. A 3-of-19 undercount; the pin-declaration ask understates the coupling. |
| W8 | fourier-analysis roster (metric-badge + hover-card only) | **Omits `/hover-popover` ×2 live sites** — `web/src/components/visualization/EditorControlsDock.vue:4`, `…/CanvasControlsDock.vue:6`. Dropped at 5.0.0; successor `<Popover trigger="hover">` per MIGRATION. |
| W9 | value.js `/controls` at `demo/shell/dock/menus/MobileMenuDropdown.vue:6` + `ProfileSection.vue:8`; ask "declare the pin in the demo's `package.json`" | Mixed-tree citation — the `demo/shell/` paths exist only after the adopt/restructure commit (`f2c8f565`), which simultaneously removed those imports; the real pre-adopt sites were `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:6` + `ProfileSection.vue:8` (verified at `6d6d3521`). No `demo/package.json` exists — the pin belongs (and landed) in the root manifest. Sites real and since consumed; citation defect only. |
| W10 | bbnf-buddy `/toggle-chip` at `src/editor/components/…/EmotionStateSelect.vue:15` | Actual path is `src/components/EmotionStateSelect.vue:15` — not under `editor/`. Line exact, path wrong. |

### FABLE-NEW (5)

| # | Finding | Evidence |
|---|---|---|
| N1 | The bbnf-lang per-repo ask that should exist: pin `^3.0.0`; break `/controls` → `/dark-mode-toggle` at `NavBar.vue:6`; the 10-file tooltip family import shape survives at 7; also 1× `/sidebar`, `/dock`, `/select`, `/search`, `/dialog`, `/slider`, `/dark`, `/card`, `/styles` — all present at 7. | playground sweep, read-only |
| N2 | The peer delta beyond kf/value is absent from the mail: `class-variance-authority`, `clsx`, `perfect-freehand` are no longer peers; `embla-carousel ^8.0` is a new optional peer — material to words (`/carousel` ×2). | v6.0.0 vs HEAD `peerDependencies` |
| N3 | speedtest deep-import break not in any roster: `tests/phase-color-parity.test.ts:79` reads `node_modules/@mkbabb/glass-ui/src/styles/tokens.css` — the 7.0.0 pack ships `files:["dist"]` only, so the read fails on bump; re-point at the packed styles. | speedtest tests + package.json `files` |
| N4 | Neither mail enumerates speedtest's `/icon-tooltip` sites: `src/components/Dock.vue:17` and `src/components/survey/AddressAutocomplete.vue:103` (11 usage mentions across the two files). The pass9 inbox named them; the correction mail defers to the q060 roster, which omits the row. | speedtest sweep |
| N5 | MIGRATION.md carries no `/context-menu` successor row at all — the only glass surface dropped at 5.0.0 with live consumer sites (speedtest ×2) and zero documented disposition. Nearest surviving surface: `/dropdown-menu`. | MIGRATION.md grep; v4.2.0/v5.0.0 tag diff |

### RATIFIED (29 — each re-proven on disk, none presumed)

| # | Claim | Proof |
|---|---|---|
| R1 | npm 7.0.0 published 2026-07-17, `dist-tags.latest = 7.0.0` | `npm view` — 7.0.0/latest/2026-07-17T22:18:38Z |
| R2 | HEAD `4ab12128`, tag `v7.0.0`, on master | `git rev-parse v7.0.0^{commit}` + merge-base |
| R3 | 82→74 keys; the 11-removed + 3-added lists | keyset diff, exact match both directions |
| R4 | Peer trio at 7 (`kf ^6.0.0`, `value ^4.0.0`); glass@6 trio `^5.2.0`/`^3.1.0` | both manifests |
| R5 | fourier `/metric-badge` spans 7 files | all 7 file:lines exact |
| R6 | `/header-ribbon` KEEP; keyframes consumer at `EditorShell.vue:116` | HEAD exports + line read |
| R7 | round-1 "hover-card atlas" row was phantom — atlas imports zero | atlas sweep |
| R8 | completion-seal = sci-report ×2 + atlas ×2 | 4 file:lines exact |
| R9 | sheet/confirm-dialog/toggle-chip/hover-card all dropped at 5.0.0 | v4.2.0 vs v5.0.0 export diff |
| R10 | `/sheet` → `DialogContent placement` | `DialogContent.vue:43,62` — prop present, default `center`, folded-Sheet comment |
| R11 | `/toggle-chip` → `Chip` on `/chip` | chip barrel + typed modes |
| R12 | metric family → `/metric`; `MetricBadgeSize`→`MetricSize`; Metric-in-Badge recompose | `/metric` barrel + types + MIGRATION census rows |
| R13 | `/hover-card` → `Popover` | popover surface + overlay-fold record |
| R14 | `/controls` → `/dark-mode-toggle`; `eclipse` removed | HEAD exports; zero `eclipse` hits in the component |
| R15 | speedtest rows: SurveyField.vue:162, SurveyResultDock.vue:166, SpeedtestResults.vue:641, SharedResultView.vue:104 (+ test mock :27), ResultStack.vue:172, MapTooltip.vue:36, AppSettingsButton.vue:98; the `/api` PhaseTimeline repoint note | all exact on disk |
| R16 | muster rows — all 11 file:lines | all exact |
| R17 | words rows — 5 confirm-dialog + 1 controls; hover-card = 13 sites | all exact; count 13 confirmed |
| R18 | value.js pin UNDECLARED at send time | `6d6d3521:package.json` has no glass-ui |
| R19 | value.js PalettesPane.vue:133, AdminUsersPanel.vue:186, EasingSpecimenStrip.vue:14 | line-exact at the pre-adopt tree |
| R20 | atlas rows — 6 file:lines + "imports none of metric/sheet/toggle-chip/hover-card" | all exact; sweep clean |
| R21 | atlas is the real `/deck` consumer; slides `/deck` strings are comments | useStageDeck.ts:2 + useDeckDetent.ts:1; all 4 slides hits are comments |
| R22 | sci-report rows — Point.vue ×2 + GalleryView.vue:18 | sci/story/points/03-trend:26, ecf/story/points/01-window-arc:20, exact |
| R23 | slides rows — CodedTurnBank.vue:20, DeckSettings.vue:9, HomeView.vue:4 | all exact |
| R24 | fourier hover-card ×2 — EquationView.vue:9, AppHeader.vue:20 | exact |
| R25 | §4 dock contract — `DockState = "collapsed"\|"hover"\|"pinned"`, binary posture, `DockCrossfade.vue`, zero PEEK/tri-state | useDockState.ts:31; file present; grep clean |
| R26 | §7 known defects — V-A95 + chip/badge orphaned CSS ship in the tag | matches the published-7.0.0 record |
| R27 | Correction mail: the phantom `<Tooltip preset="icon">` origin + speedtest's booked consume | pass9 inbox §1 (Dock.vue:17 + AddressAutocomplete.vue:103) + round-1 doc |
| R28 | Correction mail: Tooltip = exactly `open/defaultOpen/delayDuration/disabled`, `inheritAttrs:false`, silent no-op | Tooltip.vue read — exact |
| R29 | Correction mail: Provider 700/300 defaults; Trigger `asChild`+`class`; Content `side/sideOffset/align/alignOffset/surface("glass")/ariaLabel`; the composition example matches the shipped surface and the v6 IconTooltip internals | all four SFCs read — exact |

## ROUTING (proposals only — nothing written outside this file)

1. **CORRECTIONS OUTBOUND draft — bbnf-lang**: issue the omitted q060 addendum (pin `^3.0.0`; `/controls`→`/dark-mode-toggle` at `NavBar.vue:6`; tooltip family survives; trio bump law) and truth-up "`/controls` ×EIGHT" → ×NINE constellation-wide.
2. **CORRECTIONS OUTBOUND draft — constellation**: retract the §2 hover-note deferral — `Popover trigger="hover"` shipped at v7.0.0; hover-card/hover-popover consumers may adopt it directly instead of wiring hover-open locally.
3. **CORRECTIONS OUTBOUND draft — speedtest**: add the omitted rows (`/scrolling-text` ×2 with the MIGRATION local-copy adopt; `/context-menu` ×2 → `/dropdown-menu`; the chassis prop/slot breaks at App.vue:100-104 replacing "no break"; the `tests/phase-color-parity.test.ts:79` src-deep-read break) + the path fix `dashboard/ResultDetailSheet.vue` + the icon-tooltip site pair (Dock.vue:17, AddressAutocomplete.vue:103).
4. **CORRECTIONS OUTBOUND draft — keyframes.js**: census truth-up to the 19-subpath main-branch coupling; the pin-declaration ask stands and weighs more.
5. **CORRECTIONS OUTBOUND draft — fourier-analysis**: add `/hover-popover` ×2 (EditorControlsDock.vue:4, CanvasControlsDock.vue:6) → `<Popover trigger="hover">`.
6. **MIGRATION.md band amendment (BJ)**: add the missing `/context-menu` successor row (dropped 5.0.0; successor `/dropdown-menu` family) — the one dropped surface with live consumers and no documented disposition.
7. **REGISTRY truth-up**: record the full peer delta in the census layer — cva/clsx/perfect-freehand dropped, `embla-carousel ^8.0` optional added (words `/carousel` ×2 is the affected consumer).
8. **Record-only truth-ups on any reissue**: bbnf-buddy `EmotionStateSelect` at `src/components/`; value.js `/controls` pre-adopt paths (`demo/@/components/custom/dock/menus/…`, since consumed at `f2c8f565`); "demo's package.json" → the root manifest.
