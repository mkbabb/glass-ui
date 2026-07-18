# CRIT1-A — Fable critic pass 1, seat A, over the BJ redress dossiers (F01–F30)

**Mode:** TRANCHE DEVELOPMENT. This file is the only artifact — no `src/`/`demo/` touch, no commit.
**Charge:** try to break `DOSSIER-F01-F10.md`, `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md`. Per item:
inventory fidelity (ledger verbatim + screenshot-on-disk), isolation accuracy (image read first-hand),
target correctness (file:line on disk), post-mortem soundness, redress precision (owner exists + verdict
right), disagreement quality. Standing rulings (CHRONIC-ADJUDICATION, ADJUDICATION-1) are NOT
relitigated — only whether the dossiers applied them correctly.

**Verification base.** Current repo HEAD = `091d09ab` (`v7.0.0-20`), the F41-F50 dossier commit. The
three dossiers were authored at THREE different, now-stale HEADs — F01-F10 at `55f5170d`, F11-F20 at
`v6.0.0-62-g65c28be1`, F21-F30 at `v7.0.0-15-gf8a8de7c`. Every correlation below was re-read on disk at
`091d09ab`. This HEAD drift is the root cause of every anchor finding: the F01-F10 dossier (20 commits
back) carries the most stale anchors; the F21-F30 dossier (5 commits back) is the cleanest.

**Screenshots read first-hand this seat:** F01, F03, F04, F05 (F01-F10); F05 postures view re-read for
the dispute; plus disk reads of F11/F12/F15/F17 anchors and F21/F22/F27/F28 born-RED sites. Screenshot
inventory verified against `docs/tranches/BJ/feedback/` — all 30 PNGs claimed present are present; all
URL-anchored rows (F02/F06/F07/F08, F13/F14/F16/F18/F19/F20, F23/F24/F25/F26/F29/F30) confirmed to have
NO matching PNG on disk. Zero rows dropped in any dossier.

Register: plain, evidence-cited. Severities: BLOCKER (verdict wrong / owner absent / silent drop),
MAJOR (substantive inaccuracy that requires rework), MINOR (stale/wrong anchor, substance intact),
NOTE (observation).

---

## DOSSIER-F01-F10 — findings

**Isolation accuracy: strong.** I read F01, F03, F04, F05 first-hand. Every image matches the dossier's
description with no invented detail:
- **F01** — "CATEGORIES" eyebrow over a Foundations card; inner preview is a near-empty beige gradient
  with only "Colors" bottom-left; single fixed size; the media well is a second inset panel nested in
  the outer rim. The dossier's three defects (vacancy / uniform sizing / card-in-card) are all visible.
- **F03** — the "Controlled — no rail" dock page; inline `<DockCrossfade :active>` / `--dock-t` tokens;
  Assets/Layers/Media/Type control; a large near-empty panel carrying one small circular Assets blob; a
  numbered "Mechanics" (1–5) list narrating CSS grid `1/1`, `opacity: var(--dock-t)`, `useDockSpring`,
  `.dock-face-content`, `--dock-morph-t`. Both defects (auditor-voice copy + empty-panel disproportion)
  confirmed.
- **F04** — a single stadium pill on black; icons home / [divider] / compass / shapes / cubes /
  navigation-arrow, each in a thin outline-ring circle. The "shape to be abrogated" (per-item rings in a
  pill) is exactly what the image shows.
- **F05** — two pill docks side by side on a near-black background, labelled STARTS COMPACT / STARTS
  OPEN, each holding a home icon + a navigation-arrow icon, NO chromatic field behind them. Matches.

**Target correctness: F03/F04-Card/F09/F10-StorySection anchors verified correct; four anchors drifted.**
- F03 layers.vue anchors all correct on disk: `:279` `heading="Controlled — no rail"`, `:303`
  `<DockCrossfade :active="controlled">`, `:319` `dock-face-content`, `:329` `heading="Mechanics"`,
  `:335` the `.dock-face-content`/`--dock-morph-t` list item. Dead-on.
- F04 Card.vue `:33` `grain: true` and `:39` `metal: "gold"` correct. F09 `Configurator.vue:211`
  `--radius-panel` correct; concentric relay in `styles.css` correct (~:101-111). F10 `StorySection.vue:32`
  `class="text-subheading"` correct; the `grep -rl '#heading' demo/stories → 0` claim confirmed (0).
- Redress owners all exist and cover their claims: BAND-STORY W5 `BJ.W-PREVIEW-CARD` (:355) + W2
  `BJ.W-STORY-COPY-CANON` (:140) + W3 `BJ.W-CONFIGURATOR-STD` (G-CFG-1..5 at :265-269); BAND-PERF W1-W4
  (`BJ.W-BOOT-DIET`:57 / `SHELL-FIELD-GOVERN`:166 / `DEFERRED-PAINT`:252 / `ROUTE-PENDING`:360, seam
  ruling :505-506); BAND-REDUCTION `BJ.W-REDUCE-CARD` (:204, `G-CARD-DEFAULT-PAINT`:237); GF-DOCK-PASS3
  `G-RADIUS-GRAMMAR` (:210/:275/:313); GF-AURORA-PASS3 `G-MODE-DISTINCT` (:257); FABLE-STORY-FRAMEWORK
  finding 10 (:385-391) + AMEND-D-2/4/5/7 + G-TILE-COVER/G-COPY-LINT/G-LADDER-3. The F01 AppShell import
  anchors `:11,26,27,28` are exact on disk (Aurora / PresetEditor / SidebarDock / BottomDock).

- **MINOR — F01 — content-visibility anchor stale.** Dossier locates `content-visibility:auto;
  contain-intrinsic-size:auto 19rem` in the `SectionPreviewCard.vue` `<style scoped>` "around :37-45".
  On disk they are at `:63` and `:65`. Token values correct; line range ~20 lines off. Fix: re-anchor to
  `:63-65`.
- **MINOR — F04 — rail.vue entries anchor stale + a drifted claim.** Dossier cites the `entries` list at
  `rail.vue:29-39` and asserts "the icon set matches the screenshot exactly." On disk `const entries` is
  at `:31` and the array now holds EIGHT entries (`:31-40`) — Foundations/Primitives/Containers/
  Navigation/Data/Feedback/Motion/Compositions — whereas the F04 screenshot shows five icons (Home +
  Compass/Shapes/Boxes/Navigation, i.e. the `slice(0,4)` rendering). The "matches exactly" claim is no
  longer true for the full list. Substance (dock rings = the abrogated shape, owned by GF-DOCK §5) is
  intact. Fix: re-anchor to `:31-40` and scope the "matches" claim to the sliced rendering.
- **MINOR — F05 — postures-section anchors stale; D-F05 not appendable as-written.** Dossier cites the
  postures section at `rail.vue:73` (heading), `:78` (spring copy), `:84` (v-for), `:88` (labels), and
  the delta D-F05 cites `rail.vue:73-120`. On disk that section is at `:142` (heading "Collapsible
  vertical dock — it morphs its height"), `:147` (`--dock-morph-t` spring / "Hover to expand"), `:153`
  (v-for postures), `:157` (labels) — i.e. `:142-189`. The single `<Aurora>` anchor `:69` IS still
  correct. The substance and the disagreement fully hold (see the DISPUTE section), but D-F05's line
  range must be corrected to `:142-189` before it is appended, or it will misfile.
- **MINOR — F10 — `sizing-config.css` path misattributed.** Dossier lists `sizing-config.css:35`
  (`--configurator-section-size` = subheading 20.4px) under "`src/components/configurator/**`". The file
  is actually `src/styles/tokens/sizing-config.css` (line 35 + value correct; consumed by
  `configurator/styles.css:51`). The two-site F10 diagnosis stands; only the path prefix is wrong.
  (FABLE-STORY-FRAMEWORK:180 inherits the same bare-filename looseness.)
- **NOTE — F05 disagreement is UNDERSOLD.** The dossier engages only the crosswalk's `CLEARED-by-R3b`
  reconciliation. It does not cite `GF-DOCK-PASS3.md:27` (charge C5), where the greenfield itself
  ACCEPTED the F05 split and routed the aurora half to "BAND-STORY/aurora surface — F05 is not dropped,
  it is split correctly." That is direct corroboration that the aurora sub-ask was meant to be OWNED, not
  cleared. Add it to D-F05 as strengthening evidence.

**Verdict tally check.** The dossier's EXACT 7 / PARTIAL 3 / MISSING 0 is correct. No EXACT is
over-generous (each owner pins the specific defect with a disk-true born-RED); no PARTIAL should have
been EXACT (F03/F05/F09 residues are all real — verified: G-COPY-2 at BAND-STORY:195 greps
handmark+search only, NOT layers.vue; the aurora sub-ask has no staging wave; no G-CFG gate pins
configurator roominess).

**DOSSIER-F01-F10 verdict: AMEND (4 MINOR anchor corrections; F05 dispute upheld — see below).**

---

## DOSSIER-F11-F20 — findings

**Isolation + target: accurate.** Src/demo anchors verified on disk: F11 `styles.css:25`
(`--configurator-section-gap: 0.5rem`) + `:117-118` (`.configurator-layer + .configurator-layer`
margin); F12 `tags-input/styles.css:8` (`--radius-field`) + `:61` (`--radius-control`); F13
`sortable-list.vue:69,:109` (`flex flex-col`) + `:76,:117` (`rounded-md` rows) + `:143`
(`grid-cols-1 md:grid-cols-3`); F17 `search.vue:499,:506` placeholders + `_shared/field-control.css:34`
(pill) / `:47,:52` (`--radius-field`); F19 `alert/index.ts` `rounded-lg` (BASE) + all tones
`[backdrop-filter:var(--glass-blur-wash)]`. Redress owners all exist: BAND-STORY `BJ.W-RESPONSIVE-AUDIT`
(:420, G-RSP-1 :466, G-RSP-3 :468) + `BJ.W-CONFIGURATOR-STD` (G-CFG-3 :267); BAND-MATERIAL
`BJ.W-RADIUS-ROLE` (RULING-8 → guard, OPEN-1a :135) + `BJ.W-TYPE-CODEMOD` (:536); BAND-REDUCTION
`BJ.W-REDUCE-TIMELINE` (:432, A2 five-variant scope :524) + `BJ.W-REDUCE-CROSSREPO-GATED` (:360);
BAND-FEEDBACK-MOTION `BJ.W-ALERT-IDIOM` (W4 :72-82) + `BJ.W-TOAST-DIALOG-PARITY` (W1 :30-40). The F19
and F20 born-RED gate texts match the wave file verbatim (`BAND-FEEDBACK-MOTION.md:79-80`, `:37-38`).

- **MINOR — systematic ledger off-by-one (F13 through F20).** The quoted exhortations are verbatim, but
  the `FEEDBACK-LEDGER.md` line anchors drift +1 from F13 onward: F13 cited `:26` (actual `:25`), F14
  `:27`→`:26`, F15 `:28`→`:27`, F16 `:29`→`:28`, F17 `:30`→`:29`, F18 `:31`→`:30`, F19 `:32`→`:31`, F20
  `:33`→`:32`. F11/F12 are correct; the drift begins at F13. Note the collision: F20's cited `:33` now
  points at the F21 ledger row. Fix: decrement F13-F20 ledger anchors by one.
- **MINOR — F11 — `BAND-STORY.md:552` mis-cited.** The dossier attributes to `:552` the line
  "FABLE-STORY-FRAMEWORK 'F11 = the one-grouped-list cure at styles.css:117'". On disk `:552` reads "tile
  ladder reform is AUTHORSHIP (4/88 → full headline coverage; CatalogLanding routed through" — a
  preview-card line, not the F11 cure. The primary owner citation (G-CFG-3 at `:267`, which literally
  says "inter-ROW gap = 0 within a group; the gap is BETWEEN groups") IS correct, so the EXACT verdict
  stands; only the supporting `:552` pointer is wrong. Fix: drop or re-anchor `:552`.
- **NOTE — F19 — alert anchors slightly shifted.** Dossier cites BASE `rounded-lg` at `index.ts:7` and
  TONE at `:9-18`; on disk BASE is `:8` and the tones are `:11-18`. Born-RED substance (under-card
  `rounded-lg` + 1px `glass-blur-wash` on every tone) is disk-true. Cosmetic.

**Verdict tally check.** EXACT 8 / PARTIAL 2 / MISSING 0 correct. The two PARTIALs (F13 drag-affordance
residue; F20 stale born-RED baseline) are both legitimate — F20's residue is confirmed: the wave's gate
(a) says "RED while toast carries its own curve," but `Toast.vue` already rides the shared reveal engine,
so a from-scratch born-RED would author against a retired curve. No EXACT is over-generous.

**DOSSIER-F11-F20 verdict: AMEND (1 systematic ledger-anchor correction + 1 mis-cite; verdicts stand).**

---

## DOSSIER-F21-F30 — findings

**Cleanest of the three (authored 5 commits back).** Born-RED src claims verified disk-true: F21
`scroll-progress-rim/styles.css:20` `conic-gradient` + `:34` `mask-composite: exclude` + `:39/:46`
linear-gradient/clip-path edge arms (the angular-vs-perimeter mismatch is real); F22
`progress.vue:28-34` `setInterval(…,120)` stepping `+3` INTO `Progress.vue:158`
`transition … var(--duration-normal)` (300ms) — the staircase mechanism is exactly as described; F24
`Skeleton.vue:54` `--duration-shimmer, 2.4s`; F27 `overflow.css:56-59,:73` `overflow-y: visible` on both
branches; F28 `StoryPlayButton.vue:34` `emphasis: "secondary"` + `button/styles.css:43` (`--glass-blur-
deep`, primary) / `:50` (`--glass-blur-resting`, ordinary) + `glass.css:87-88` (quiet/resting both 7px).
Owners all exist with matching born-RED text: `BJ.W-PROGRESS-RIM-REPLACE` (BAND-FEEDBACK-MOTION W2, gate
(a) at :53-54 matches verbatim), `BJ.W-FEEDBACK-MOTION-TUNE` (W3), `BJ.W-TRACK-DRY` (BAND-MATERIAL:376),
`BJ.W-BLUR-LADDER` (OPEN-2d :254), `GF-DOCK §4.1 W2 G-NO-BLOCK-SCROLL` (:272/:284), and the ASK rows
(§A2 :53, §C2 :171, §C4 :209) all present. The `FEEDBACK-LEDGER.md` line anchors (F21:33 … F30:42) are
all CORRECT — no off-by-one here.

- **MINOR — F27 — `useDockOverflowFit.ts:38-40` partial-quote misleads on the horizontal host.** Dossier
  says the line "measures `scrollHeight - clientHeight > 1` on the block axis (verified on disk) … the
  dock treats a block overflow as real." On disk the line is a ternary guarded on `vertical`:
  `vertical ? scrollHeight - clientHeight > 1 : scrollWidth - clientWidth > 1`. F27's host is a
  HORIZONTAL feedback rail (the dossier itself notes "a horizontal dock has no block content to
  scroll"), so this line measures INLINE overflow there, not block. The operative F27 leak is the
  co-cited `overflow.css` `overflow-y: visible` + the recentre `block:'nearest'` — both correct — so the
  EXACT verdict survives; the RO framing just over-reaches for the horizontal case (an imprecision the
  dossier inherits from the GF-DOCK gate text). Fix: qualify the RO claim to the vertical branch, or lean
  on the CSS/recentre as the horizontal-host cause.
- **NOTE — F24 — keyframes anchor drift.** Dossier cites `@keyframes skeleton-scan` at `:51-57`; on disk
  the keyframes block starts at `:59`. The load-bearing `2.4s` literal at `:54` is dead-on.

**Verdict tally check.** EXACT 8 / PARTIAL 2 / MISSING 0 correct. The two PARTIALs (F22 demo-driver
residue; F28 wrong-route/wrong-axis live-π) are the strongest deltas in the whole set — both confirmed
disk-true (the `setInterval` 120ms driver; the secondary/default springs buttons that both resolve to
7px, defeating a blur-radius re-check). No EXACT over-generous.

**DOSSIER-F21-F30 verdict: AMEND (1 MINOR precision qualification; verdicts stand).**

---

## The F05 dispute — adjudicated on disk (ruling: the DOSSIER is right)

The question: F05's aurora sub-ask ("why does this section not have a background aurora"). The crosswalk
lead reconciliation #3 (`ASSEMBLY-CROSSWALK.md:221-223`) rules it `CLEARED-by-R3b`, on the ground that
"the dock section demonstrably carries a live chromatic background field (R3B-DIGEST engagement-dock
evidence)." DOSSIER-F01-F10 DISAGREES and calls it a real residue. The disk supports the dossier:

1. **The screenshotted section has no aurora.** `demo/stories/dock/rail.vue` contains exactly ONE
   `<Aurora>` — `:69`, staged inside the "Vertical dock" headline section (`:53-106`). The postures
   section that F05 screenshots ("Collapsible vertical dock — it morphs its height", `:142-189`) is a
   plain `<div class="flex min-h-[18rem] … p-6">` (`:151`) with no field. A sibling section carries the
   field; the screenshotted one does not — the user's "this section" premise HOLDS at HEAD.
2. **The image confirms the identification.** I read `F05-anim-shift-no-aurora.png` first-hand: two pill
   docks, Home + navigation-arrow each, labelled STARTS COMPACT / STARTS OPEN, on near-black. That is the
   rail.vue postures grid (2-control collapsed docks), NOT `/dock/overview`.
3. **The R3b evidence is a different route.** `R3B-DIGEST.md:43-49` (engagement-dock) captured its
   "live chromatic background field" on `/dock/overview` — a dock whose collapsed pill is a single Home
   that morphs into a FOUR-control dock (Home/Search/Notifications/Settings). That is not the F05 dock.
   Both pages happen to label a specimen "Starts compact," which is exactly the conflation the crosswalk
   fell into: it read "the STARTS COMPACT dock has a field" (true on `/dock/overview`) and applied it to
   F05's STARTS COMPACT screenshot (`/dock/rail`, no field).
4. **A formation doc already routed it as OWNED, not cleared.** `GF-DOCK-PASS3.md:27` (charge C5)
   ACCEPTED the F05 split: "the 'no aurora' half leaves the dock → BAND-STORY/aurora surface. F05 is not
   dropped, it is split correctly." The `CLEARED-by-R3b` reconciliation silently reversed that routing.

**Ruling:** the aurora sub-ask is a genuine residue with no staging wave; the dossier's PARTIAL + DISAGREE
+ D-F05 are correct (and, per the F01-F10 NOTE above, undersold — GF-DOCK C5 corroborates them). The
only required correction to the dossier is D-F05's stale line range (`:73-120` → `:142-189`).

---

## Summary

| dossier | verdict | BLOCKER | MAJOR | MINOR | NOTE |
|---------|---------|---------|-------|-------|------|
| F01-F10 | AMEND (4) | 0 | 0 | 4 | 2 |
| F11-F20 | AMEND (2) | 0 | 0 | 2 | 1 |
| F21-F30 | AMEND (1) | 0 | 0 | 1 | 1 |

All three dossiers are substantively SOUND: every screenshot inventoried and correctly read, every
redress owner exists on disk and pins the specific defect with a born-RED that matches the source, every
EXACT/PARTIAL verdict is defensible, and the F05 disagreement is disk-correct. Zero BLOCKERs, zero
MAJORs, zero silent drops. The amendments are anchor-accuracy corrections forced by HEAD drift — re-base
the F01-F10 dossier's four stale src anchors to `091d09ab`, decrement the F11-F20 dossier's F13-F20
ledger anchors by one + fix the `:552` mis-cite, and qualify the F21-F30 F27 RO-line quote — before any
delta is appended.

*End — CRIT1-A, Fable critic pass 1 seat A, rows F01–F30. One file, no `src/`/`demo/` edits, no commit.*
