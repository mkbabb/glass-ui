# GLASS → CONSTELLATION — Q060: glass-ui 7.0.0 is LIVE (the migration roster)

*2026-07-17, from the glass-ui BI/P/Q execution session. One packet to the whole
constellation: speedtest, muster, words, value.js, bbnf-buddy, atlas, sci-report, slides,
fourier-analysis, keyframes.js. Every consumer site below is proven on disk against the
7.0.0 export map (the round-2 corrected census); every successor is the one recorded in
`MIGRATION.md` §7.0.0. Adopt at your OWN tranche cadence — the consumer-updates ruling: the
consumer re-points in ITS repo, as a marked addendum in its own tranche. No date is imposed.*

---

## §0 — The tag

- `@mkbabb/glass-ui@7.0.0` is published to npm (2026-07-17, npm provenance,
  `dist-tags.latest = 7.0.0`). Repo `master`, HEAD `4ab12128`, tag `v7.0.0`.
- The packed public map goes 82 → 74 export keys: **11 removed**, **3 added**. Removed:
  `./color-swatch`, `./controls`, `./focus-scope`, `./icon-chip`, `./icon-tooltip`,
  `./metric-badge`, `./metric-cell`, `./metric-stack`, `./motion-curves`, `./notification`,
  `./spa-view`. Added: `./dark-mode-toggle`, `./metric`, `./styles/theme`.
- Peer set is the value-4 / kf-6 cure: `@mkbabb/keyframes.js@^6.0.0` +
  `@mkbabb/value.js@^4.0.0`. This is the graph that resolves the published-latest wedge the
  install-truth packet documented — 7.0.0 IS the exit.

## §1 — The install law (read before you bump)

- The trio installs coherently at 7.0.0: `glass-ui@^7` + `keyframes.js@^6` + `value.js@^4`.
  No force flag is needed — the graph resolves natively.
- **`--legacy-peer-deps` is never the answer.** It masks ERESOLVE by installing a graph the
  library declares incompatible (the no-masking-fallback law). If your bump appears to need
  it, the pin set is wrong, not the flag. Re-order the graph atop the glass-7 peer, do not
  force it.
- A consumer still pinned to glass@6 stays on the OLD trio (kf@^5.2.0, value@^3.1.0) until it
  moves to glass 7; move all three together at the bump, never the producers early under a
  glass@6 pin.

## §2 — The corrected break census

Authoritative source: `docs/tranches/BJ/formation/round-2/adversarial-verification-of-round-1-consumer-truth-component.md`.
Five corrections over the round-1 roster are folded in: `/controls` is consumed by EIGHT
repos (not slides+bbnf only); `/metric-badge` spans the whole fourier-analysis repo (7 files);
`/header-ribbon` is a KEEP with keyframes.js as an undeclared consumer (NOT a delete); the
`/hover-card` "atlas" row was phantom (atlas imports zero); `completion-seal` is sci-report
×2 AND atlas ×2 (present, no break — census only).

Every consumer sits BEHIND 7.0.0, so each break is prospective on the bump. A repo pinned
below 5.0.0 clears the 5.0.0-era drops (`/sheet`, `/confirm-dialog`, `/toggle-chip`,
`/hover-card`) AND the 7.0.0-era drops (`/metric-*`, `/controls`) in one jump.

| removed subpath | successor (MIGRATION §7.0.0) |
|---|---|
| `/sheet` | `<DialogContent placement="…">` on `/dialog` (`SheetVariants` gone) |
| `/confirm-dialog` | the Dialog family on `/dialog` — compose `<Dialog>`/`<DialogContent>` with the action row |
| `/toggle-chip` | `<Chip>` on `/chip` (`ToggleChipVariants` gone) |
| `/metric-badge` | compose `Metric` (`/metric`) inside `<Badge>` (`/badge`); `MetricBadgeSize` → `MetricSize`; keep phase/aura/protagonist/result-animation in product composition |
| `/metric-cell` | `MetricCell` from `/metric` — import-path swap |
| `/metric-stack` | `MetricStack` / `MetricRow` from `/metric` — import-path swap |
| `/hover-card` | `<Popover>` on `/popover` (see §3.hover note on the forthcoming hover-trigger axis) |
| `/controls` | `DarkModeToggle` from `/dark-mode-toggle`; the collective alias is removed; the `eclipse` long-press prop is also gone |

**hover note.** `/hover-card` is absent at 7.0.0; compose `<Popover>` today
(PopoverRoot/PopoverTrigger/PopoverContent). The hover-open convenience HoverCard provided
(`keepDockOpen` + label-tier default) folds into a Popover `trigger="hover"` axis, which is a
BJ deliverable (CHRONIC-ADJUDICATION R13) — until it ships, wire hover-open locally or take
Popover's default click/focus trigger.

## §3 — Per-repo migration asks

Each row: the exact `file:line` sites, the removed subpath, and the successor. Test mocks and
prototype copies are footnoted; adopt them with the real sites.

### speedtest (pinned `^4.0.1`)
- `/sheet` → `/dialog`: `src/components/survey/ResultDetailSheet.vue:3`
- `/toggle-chip` → `/chip`: `src/components/survey/SurveyField.vue:162`
- `/metric-badge` → `/metric`+`/badge`: `src/components/survey/SurveyResultDock.vue:166`,
  `src/components/…/SpeedtestResults.vue:641`
- `/metric-cell` → `/metric`: `src/components/survey/ResultDetailSheet.vue:7`,
  `src/components/…/SharedResultView.vue:104` (+ `tests/…` mock)
- `/metric-stack` → `/metric`: `src/components/…/ResultStack.vue:172`
- `/hover-card` → `/popover`: `src/components/dashboard/MapTooltip.vue:36`
- `/controls` → `/dark-mode-toggle`: `src/components/AppSettingsButton.vue:98`
- Note: `instrument-chassis` (App.vue, useRouteTransition.ts, ChartsView.vue, MapView.vue —
  ×4) is PRESENT at 7.0.0, no break; it stays on `/instrument-chassis` but is no longer
  root-exported. Your separate `/api` repoint (`PhaseTimeline.vue`) rides this bump too.

### muster (pinned `^3.1.0`)
- `/sheet` → `/dialog`: `frontend/src/components/…/ShareButton.vue:29`,
  `frontend/src/components/…/WhyThisWonSheet.vue:31`
- `/confirm-dialog` → `/dialog`: `frontend/src/App.vue:69`
- `/toggle-chip` → `/chip`: `frontend/src/components/…/OriginPrefsPopover.vue:36`,
  `frontend/src/components/…/VoterRow.vue:21`
- `/metric-badge` → `/metric`+`/badge`: `frontend/src/components/dock/CommandDock.vue:42`,
  `frontend/src/components/…/WinnerHero.vue:48`
- `/metric-cell` → `/metric`: `frontend/src/components/…/TravelMatrix.vue:27`
- `/metric-stack` → `/metric`: `frontend/src/components/…/RankedVerdict.vue:40`,
  `frontend/src/components/…/WhyThisWonSheet.vue:35`
- `/controls` → `/dark-mode-toggle`: `frontend/src/components/dock/CommandDock.vue:44`

### words (pinned `^3.0.0`)
- `/confirm-dialog` → `/dialog`: `frontend/src/components/…/SearchBar.vue:105`,
  `SidebarWordListItem.vue:113`, `SidebarWordListView.vue:165`, `WordListView.vue:236`,
  `WordlistDashboard.vue:166`
- `/hover-card` → `/popover`: **13 sites** — enumerate at adopt via
  `grep -rn '@mkbabb/glass-ui/hover-card' frontend/src`
- `/controls` → `/dark-mode-toggle`:
  `frontend/src/components/custom/sidebar/SidebarHeader.vue:80`

### value.js (demo shell — UNDECLARED glass-ui pin)
- `/confirm-dialog` → `/dialog`: `demo/…/PalettesPane.vue:133`, `demo/…/AdminUsersPanel.vue:186`
- `/toggle-chip` → `/chip`: `demo/…/EasingSpecimenStrip.vue:14`
- `/controls` → `/dark-mode-toggle`: `demo/shell/dock/menus/MobileMenuDropdown.vue:6`,
  `demo/shell/dock/menus/ProfileSection.vue:8`
- Ask: the demo imports glass-ui with no manifest pin. Declare `@mkbabb/glass-ui@^7.0.0` in
  the demo's `package.json` at adopt so the dependency is not invisible to future census.

### bbnf-buddy (pinned `^3.9.0`)
- `/toggle-chip` → `/chip`: `src/editor/components/…/EmotionStateSelect.vue:15`,
  `src/editor/components/…/OffsetPicker.vue:19`
- `/controls` → `/dark-mode-toggle`: `src/editor/components/SettingsPanel.vue:9`

### atlas (pinned `^6.0.0`)
- `/controls` → `/dark-mode-toggle`: `src/platform/chrome/dock/DockSettings.vue:23`,
  `src/platform/chrome/dock/components/DockFoot.vue:23`
- `completion-seal`: PRESENT at 7.0.0, no break. Census correction only — atlas is a real
  consumer (`src/design/recipes/completion.ts:5`, `src/skin/category.ts:2`), not sci-report-
  only. `CompletionSeal` / `CompletionSealShape` stay on `/completion-seal`.
- `/deck`: PRESENT, no break (`src/…/useStageDeck.ts:2`, `useDeckDetent.ts:1`). Atlas is the
  real `/deck` consumer; the slides matches are all comments.
- No metric / sheet / toggle-chip / hover-card break — atlas imports none of them (the
  round-1 "hover-card atlas ×1" row was phantom).
- The dock `interaction="manual"` adopt still stands as its own one-line atlas edit — see
  `atlas-outbound-2026-07-16-dock-interaction-adopt.md`; the publish evidence tuple it named
  arrives with this tag. See §4 for the owed dock-contract note and §5 for the pre-stage
  ruling.

### sci-report (pinned `6.0.0`)
- `/metric-badge` → `/metric`+`/badge`: `dashboards/…/Point.vue` (×2)
  (+ one prototype copy under `docs/tranches/O/…`)
- `/controls` → `/dark-mode-toggle`: `dashboards/home/gallery/GalleryView.vue:18`
  (+ prototype copy `…/O-B9/impl/gallery-split/GalleryView.vue:19`)
- `completion-seal`: PRESENT, no break — `dashboards/…/CategoryHomeView.vue:4`,
  `GalleryView.vue:19`. Stays on `/completion-seal`.

### slides (pinned `3.13.0`)
- `/hover-card` → `/popover`: `src/decks/feedback-coder/components/CodedTurnBank.vue:20`
- `/controls` → `/dark-mode-toggle`: `src/deck/DeckSettings.vue:9`, `src/views/HomeView.vue:4`
- `/deck`: every glass-ui `/deck` string in slides is inside a comment — no deck break.

### fourier-analysis (pinned `^4.0.0`)
- `/metric-badge` → `/metric`+`/badge`: `web/src/components/equation/EquationView.vue:10`,
  `equation/InfoCard.vue:4`, `visualization/AnimationControls.vue:10`,
  `visualization/EditorControlsDock.vue:5`, `visualization/EquationPanel.vue:12`,
  `visualization/gallery/GalleryAdminBanner.vue:5`, `visualization/gallery/GalleryDraftsSection.vue:8`
  (7 sites — the whole repo carries MetricBadge)
- `/hover-card` → `/popover`: `web/src/components/equation/EquationView.vue:9`,
  `web/src/components/layout/AppHeader.vue:20`

### keyframes.js (UNDECLARED glass-ui consumer — see §6)
- `/header-ribbon`: **KEPT** at 7.0.0 — NOT a break.
  `demo/components/instrument/shell/EditorShell.vue:116` imports `HeaderRibbon`. The only
  change is prop-level: `HeaderRibbon` is persistent-only now (no `hideTimeoutMs`, `mode`,
  `anchorLabel`, `anchor` slot); `HeaderRibbonProps` is `placement`/`ariaLabel`/`class`.
- `/dark-mode-toggle` (×3) and `fading-scroll` (`EasingTarget.vue:137`) are already on the
  new surfaces — keyframes.js is pre-migrated there.

## §4 — Atlas dock-contract note (#22b/c — the owed answer)

Decision-0 owed this at `BI.W-DOCK-SPINE` close: whether PEEK / tri-state is native to the
new dock, and the dock's residual dismiss model. The spine has landed; here is the contract
against the shipped dock code.

- **PEEK / tri-state detent is NOT native.** The shipped dock FSM is
  `DockState = "collapsed" | "hover" | "pinned"` (`src/components/dock/composables/useDockState.ts`),
  with `expanded = state !== "collapsed"`. Posture is BINARY — collapsed pill vs expanded
  run; the hover/pinned split is intent-source, not a partial-open geometry. There is no
  SHUT→PEEK→FULL third resting detent, and `grep -riE 'PEEK|tri-state'` over
  `src/components/dock` returns zero. Atlas's `DockAppendix` PEEK-as-third-detent stays
  SELF-HOSTED; there is no primitive to bridge to and retire against. (Distinct concept: the
  BJ greenfield `--dock-peek` is an OVERFLOW sliver — a fixed-width edge reveal under an
  overflow fade — not a posture detent. Do not conflate the two.)
- **The real dismiss / crossfade model.** Collapse↔expand is one plate morph on a single
  registered scalar (`--dock-t`), and the summary↔full content swap is an OPACITY CROSSFADE
  (`DockCrossfade.vue`), not a detent morph: a two-child opacity overlap on the one dock
  spring (velocity-continuous, interruptible), measure-once peak reserve, focus transferred
  from a dissolving focus-holding face to its successor. Dismissal in AUTO mode is driven by
  reka's own outside-pointerdown on a genuine click-away, Escape, the idle-timer
  `scheduleCollapse` (with a re-engage grace window), and collapsed-tap — deliberately NOT a
  global synthetic body-target dispatch (that would dismiss every open dismissable layer,
  including a dock-child Dialog/Select/Popover). In `interaction="manual"` all of those
  environmental writers are suppressed at both poles; only `expand()`/`collapse()` write.
- Action: re-verify atlas CD-01 / W-L4 against THIS dock (the shipped 7.0.0 greenfield), not
  4.2.0's dock, at re-pin time.

## §5 — Atlas pre-stage ruling (the owed confirm-or-correct)

Atlas asked glass-ui to confirm-or-correct whether its pre-stage — consuming kf6/value4 under
a glass `^6.0.0` peer via `--legacy-peer-deps` in an unpublished staging worktree — is in-law.

- **Ruling: the unpublished staging worktree was LAWFUL** as an exploration ahead of the tag
  (the P127 co-land ordering — producers publish before glass tags its staged peers).
- **`--legacy-peer-deps` must NOT survive into the adopted graph.** Once glass 7.0.0 is the
  pin, the trio (`glass-ui@^7` + `kf@^6` + `value@^4`) resolves natively — the force flag has
  nothing left to mask and drops entirely. At adopt, atlas re-orders its dependency graph atop
  the published glass-7 peer; the atlas 7 registry HOLD on the dock seam lifts once atlas binds
  `:interaction="manual"` and the §C.1 scroll-π is clean (per the dock-interaction outbound).
  No `--legacy-peer-deps`, ever, in the shipped graph.

## §6 — keyframes.js is an UNDECLARED consumer

keyframes.js imports glass-ui (`/header-ribbon`, `/dark-mode-toggle` ×3, `fading-scroll`) but
declares NO glass-ui pin in its `package.json`. That is why every in-repo-scoped census probe
missed it and why `/header-ribbon` was briefly (and wrongly) proposed for deletion. Ask:
declare `@mkbabb/glass-ui@^7.0.0` as a dependency in keyframes.js at adopt so the coupling is
visible to future census. No code break is owed — `/header-ribbon` is a KEEP and the other
surfaces are already current.

## §7 — Known defects shipping in 7.0.0 (stated plainly)

Per the user's "First, publish 7.0.0" order, two live defects ship in the tag rather than
holding it. Both are tracked by born-RED BJ waves; neither is retired as a platform shrug.

- **V-A95 — aurora reverse-drag black-slab.** On `/substrates/aurora`, a second reverse-drag
  paints a broad black slab (ACTIVE RED; 4/0 desktop, 3/0 narrow filters at HEAD). The
  `isolation: isolate` experiment landed but cure-confirmation on the real instrument is owed
  (the cure is truthed "experiment-pending"). A BJ born-RED wave carries the
  research→harden→wave triumvirate (GF-AURORA) against the measured second-reverse mechanism.
- **Chip/Badge orphaned-CSS.** `deadcode:css-partial-orphaned` — the Chip / glass-atom glass
  styling is dead in the published `dist` (the partial's CSS is orphaned in the built bundle;
  proven in the SHIPPED artifact). A BJ born-RED fix wave tracks the re-wire. Consumers
  composing `<Chip>` / `<Badge>` should expect the glass treatment to be incomplete until that
  wave lands.

---

## Appendix — provenance

- Break census: `docs/tranches/BJ/formation/round-2/adversarial-verification-of-round-1-consumer-truth-component.md`
  (every `file:line` above proven on disk at HEAD `48eb522f`, carried to `4ab12128`).
- Successors: `MIGRATION.md` §7.0.0 + the `/api` per-symbol census.
- Amended successors: `docs/tranches/BJ/formation/CHRONIC-ADJUDICATION.md` (R13 hover-trigger
  axis, R14 completion-seal two-repo truth, R16 metric recompose).
- Dock contract: `src/components/dock/composables/useDockState.ts`,
  `src/components/dock/DockCrossfade.vue`, `docs/tranches/BI/waves/BI.W-DOCK-SPINE.md`.
- Install law: `glass-outbound-2026-07-17-constellation-install-truth.md`.
