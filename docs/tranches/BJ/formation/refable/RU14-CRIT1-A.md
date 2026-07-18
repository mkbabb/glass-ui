# RU-14 CRIT1-A — redress twice-critique redo, pass 1 (F01-F30)

- **Unit:** RU-14, pass 1, seat A. Scope: the REDONE dossiers `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`,
  plus the union duty over the OPUS-ERA critiques (`CRIT1-A/B`, `CRIT2-A/B`, `CRIT3-SCOPED`).
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification HEAD:** `454f6d64` (master). Tree parity RE-PROVEN: `git diff --stat` for `src/`+`demo/`
  is EMPTY across `55f5170d..4757315a`, `4757315a..ced045d1`, and `ced045d1..454f6d64` — every dossier
  and this pass judged the SAME paint tree. The docs tree, however, HAS moved since RU-13
  (RU-05/RU-07/RU-09 re-unions + the greenfield redo landed at 01:32-07:0x on 2026-07-18), and two of
  those rewrites contradict dossier rows — the two MAJORs below.
- **Method:** I authored none of the dossiers; every row treated as wrong until re-proven. Screenshots
  read first-hand this seat: F04, F05, F17. Disk anchors re-proven at HEAD: ~60 file:line sites
  (inventory in §4). Ledger rows F01-F30 re-read verbatim at `FEEDBACK-LEDGER.md:13-42` (all anchors
  exact). Screenshot inventory re-censused against `feedback/` — the per-dossier
  screenshot/URL-anchored splits are exact, zero rows dropped. Sibling censuses re-run read-only
  (completion-seal, confirm-dialog, instrument-chassis, metric-badge). Cross-corpus reconciliation:
  the REWRITTEN `SUPERFLUITY.md` (RU-09), `JUDGE.md` J1-J11 + `APPLYLOG.md`, `REFABLE-RF-5.md`
  (corrected 50/5/2/10 partition), the band files and greenfields at HEAD.

## 1. Verdict summary

| dossier | verdict | BLOCKER | MAJOR | MINOR |
|---------|---------|---------|-------|-------|
| F01-F10 | AMEND(1 MAJOR) — F08 redress figures stale vs the re-unioned GF-AURORA | 0 | 1 | 1 |
| F11-F20 | AMEND(2 MINOR) — F15 flip mis-filed; F16 doc-truth routing still unrouted | 0 | 1* | 2 |
| F21-F30 | AMEND(1 MAJOR, 1 MINOR) — F23 EXACT vs SUPERFLUITY C-G; F25 census grain | 0 | 1 | 1 |

\* the F11-F20 MAJOR is the campaign-level ownership defect (F13 residue ownerless + the false
RULING-8/F17 premise still governing), anchored to that dossier because its FLIPs F-1/F-2 name it.

The three dossiers are substantively SOUND at the mechanism layer: every load-bearing correlation I
re-derived independently converged with the dossier text, and the dossiers' own OVERTURNs of the
prior layers (F04 anchor, F16 facade, F17 mechanism, F24 value, F27 coercion) all re-prove EXACT on
disk. The defects found are currency and reconciliation defects — rows contradicted by
post-RU-13 rewrites of their owning charters, flips that keep aging un-judged, and census grain.

## 2. Findings

### MAJOR-1 — DOSSIER-F01-F10 F08: the redress plan misdescribes the owning greenfield at HEAD

The F08 REDRESS states "the **17→10-firm** preset reduction (W5)", "the oil **PORT-or-KILL** (W4,
terminal collapse set `{}`)", and "the **crayon-scope question is the one honest user ASK**." All
three are contradicted by `GF-AURORA-PASS3.md` at HEAD (rewritten by the RU-07 re-union + greenfield
redo, AFTER RU-13):

- the cut is **17 → 11** (4 solar + 7 heroes; arithmetic at `:237`, W5 row `:315`, elasticity
  17→11 floor 9 at `:461`) — not 10-firm; `SUPERFLUITY.md` C-H (`:674-680`) independently carries
  "~11 survivors (not 10)";
- W4 oil is **three-arm**: PORT / **REAUTHOR-LEAN (default lean)** / KILL (`:314`) — "PORT-or-KILL"
  drops the default arm;
- the crayon ink-mode ASK is **resolved-CUT** ("singular reading, F03 parsimony", W3 `:313`); the
  live user ask is now **Q-AURORA-QUARTET** (DUSK/DAWN death clauses, `:13`, `:239`).

The mechanism layer of F08 stays RATIFIED (I re-proved `applyMedium` 3/5/6/7→`mediumKuwahara` at
`aurora-mediums.wgsl.ts:387-403` verbatim; `PRESETS` = 17 keys incl. `SPEEDTEST` at
`presets.ts:685-703`; the C-G/now-C-H discharge binding is carried by both docs). But a reader
executing from the dossier follows the wrong roster and asks a resolved question.
**Fix:** refresh the F08 REDRESS paragraph + coverage-summary row to the GF-AURORA-at-HEAD state
(17→11 with the death-clause elasticity, three-arm W4, Q-AURORA-QUARTET as the ask), keeping the
real-body discharge binding language.

### MAJOR-2 — DOSSIER-F21-F30 F23: coverage "EXACT" is contradicted by SUPERFLUITY C-G at HEAD

The rewritten `SUPERFLUITY.md` (RU-09, commit `5c847780` — same batch as the dossier refresh, so
neither could read the other) rules **C-G** (`:668-672`): *"F23 disputes the DOSSIER-F21-F30
'EXACT / AGREE-LANDED' coverage of W4 — twice now… the value-mark checkpoint paint (~65 lines) is a
second true fold W4 never scoped. The LANDED status on BJ.W-TRACK-DRY is premature; the wave
re-opens with both registers (track-well.css + value-marks.css)."* Verified on disk:
`BAND-MATERIAL.md` contains **zero** value-mark scoping anywhere (file-wide grep), so the second
fold is UNCHARTERED at HEAD. The dossier itself observes the marks duplication ("Both Slider and
Progress also each render their own mark spans off the shared math… same `--value-mark-position`
token idiom") — yet keeps coverage EXACT with a pixel-identical π and files nothing in FLIPS.
A secondary discrepancy rides it: SUPERFLUITY's migration survivor is
`src/styles/glass/track-well.css` (mirroring the proven `liquid-fill.css` pattern — which is indeed
where `glass-liquid-fill` lives), while `BAND-MATERIAL.md:433/:476` charter `_shared/track.css` —
two paths for one register, unreconciled.
**Fix:** F23 coverage EXACT → PARTIAL (or EXACT-conditional) until the lead either charters the
value-marks register into W4 (per C-G) or rules it out; reconcile the track-well file path in the
same ruling. The dossier's fresh evidence (the marks census) becomes the delta's body — it is
already written, just mis-verdicted.

### MAJOR-3 — campaign: six FLIPs + one routing item age un-judged; F13's residue is ownerless; RULING 8's false F17 premise still governs

Per the charge "a real wave owns it or an explicit ASK row exists," the corpus at HEAD fails on one
row and carries six recorded-but-unapplied contradictions. All were honestly NAMED by the dossiers
(nothing smuggled) — the defect is that no JUDGE-2 pass exists, and three subsequent unions
(RU-05 GF-DOCK, RU-07 GF-AURORA, RU-09 SUPERFLUITY + the greenfield cross-critique) landed without
consuming any of them:

1. **F13 "better design" half (drag-affordance expressiveness) — OWNERLESS at HEAD.** Independently
   re-verified: zero F13 rows in J1-J11, zero in `APPLYLOG.md`; JUDGE's "zero floating notes remain"
   stands falsified. The dossier's PARTIAL is the honest verdict, but the residue still has no wave
   and no ASK row — the exact silent-drop class the redress campaign exists to prevent.
2. **FLIP F-1 (F17 vs RULING 8) — the false premise still governs.** `BAND-MATERIAL.md:117-119`
   ("rides `field-control` pill"), the lead amendment `:698-700` ("disk shows both sites already
   role-correct"), and `PLAN.md:185-189` all still assert the disproven premise. I re-derived the
   mechanism from source before reading the dossier: `search.vue:503` `variant="floating"` →
   `searchVariants.ts:10` `rounded-none` (utilities layer, beats `.input-bar`'s components-layer
   `--radius-2xl` at `utilities/components.css:12-16` unconditionally); zero `.fuzzy-search--floating`
   rules in `src/` (grep exit 1); `FuzzySearch.vue:126-127` renders `input-bar` + the variant class.
   The F17 PNG (read this seat) shows exactly one-rounded-one-square. RULING 8's own live-π
   conditional self-heals at execution, but the charter text is false and PLAN repeats it.
3. **FLIP-1/RT1 (GF-DOCK §5, F04)** — GF-DOCK-PASS3 at HEAD still carries no `rail.vue:108-140`
   baseline-π pin and no `shape`-axis ruling (zero matches for "108-140"/"Rounded shape"/
   "useDockShellProps" file-wide) — even after the RU-05 re-union.
4. **FLIP-2/RT2 (BAND-REDUCTION "the F04 shape")** — `:33-37` and `:240` still label the Card
   default probe "the F04 shape" (the F04 image is a dock).
5. **F21-F30 FLIP-1 (W3 gate b)** — `BAND-FEEDBACK-MOTION.md:74-76` still reads "the values live in
   the token/canon layer, not per-component literals" — letter-satisfiable while `Skeleton.vue`
   reads a defined-but-WRONG token (5s brand-sweep clock; ladder intent at `literals.css:24-34`
   assigns skeleton the 3s fast rung — both re-proven this seat). Δ-F24-1's value+rung assertion
   exists only in the dossier.
6. **F21-F30 FLIP-2 (GF-DOCK §4.1 RED rationale)** — `:109-110` still says `useDockOverflowFit.ts:38-40`
   "measures block overflow" (on the horizontal F27 host it measures inline), and the false
   spec comment survives at `overflow.css:66` ("spec-forces the computed cross axis to a clip" —
   it computes to **auto**; re-proven against the on-disk rule pair `overflow-x:auto` +
   `overflow-y:visible` at `:63-73`).
7. **F16 README routing** — `timeline/README.md:11-17` still documents five never-shipped exports
   (`index.ts` exports `GlassTimeline` + types only — both re-proven); `BAND-DOC-TRUTH.md` contains
   zero timeline references. The routing the dossier calls "owed" is still owed.

**Fix:** one consolidated JUDGE-2 ruling pass (J12+) that rules items 1-7, then an application pass
mirroring `APPLYLOG.md`. Item 1 needs an owner mint or ASK row (natural homes per the dossier:
`BJ.W-IDLE-BREATH`'s interaction half or the W6 fix mandate); items 2-6 are text amendments to the
already-named destinations; item 7 is a one-row BAND-DOC-TRUTH add.

### MINOR-1 — DOSSIER-F21-F30 F25: census grain + a conflation SUPERFLUITY C-I states precisely

Three nits against an otherwise-exact row (fold-commit `c368ccbc` re-proven via
`git log --diff-filter=D`; value.js live-imports = 0 re-proven):

- the "6 LIVE import sites" census omits `words/frontend/vite.config.ts:218`, which carries the
  literal `'@mkbabb/glass-ui/confirm-dialog'` and breaks/goes stale on the same relay — the family-B
  roster should carry 6 imports + 1 config reference;
- "the value.js pair are DOC references only" conflates the ASK's cited pair
  (`PalettesPane.vue:133`/`AdminUsersPanel.vue:186` — which no longer exist; migrated) with the two
  tranche-doc grep hits; SUPERFLUITY **C-I** (`:682-686`) has the precise form ("value.js ×0 — it
  already migrated; AdminUsersPanel.vue is now the migration exemplar") and adds the
  dynamic-import caveat for muster's site;
- the sidecar files the 6-live census as "fable-new" — the pre-rewrite SUPERFLUITY F25 row already
  carried words×5 + muster×1 + value.js-migrated; novelty at the margin only (the `c368ccbc`
  attribution IS new).

**Fix:** align the F25 TARGET census text with C-I's wording + add the vite.config reference.

### MINOR-2 — DOSSIER-F11-F20 F15: the 251→234 truth-up belongs in FLIPS, and under-describes the band

The sidecar's FLIPS charter is "findings contradicting a JUDGE ruling **or a band-charter
premise**." The 234 re-count (verified EXACT this seat: `grep -rEn '\btext-(sm|xs)\b' src demo` →
234) contradicts the band's standing 251-site codemod figure (`BAND-MATERIAL.md:40/:572/:588-592`)
yet is filed under FABLE-NEW, not FLIPS — openly stated, so not smuggled, but mis-filed, and it
therefore reached no routing row. The dossier's blanket "band count 251" also under-describes the
band, which already carries a "verified exact" 218-demo sub-count at `:590` (218 demo + 16 src
squares with 234). **Fix:** reclassify as a flip with a routing row (the W6/GATES-W4 figure
re-pins at wave time); cite the band's own 218/251 split.

### MINOR-3 — DOSSIER-F01-F10: FLIP-1/FLIP-2 aging (recorded, honest, but now twice-survived)

Covered inside MAJOR-3 items 3-4; recorded here against the dossier only for the tally. The dossier
text itself needs no edit beyond the F08 refresh (MAJOR-1) — its "the lead's re-judge remains owed"
statements are accurate and were re-verified live at HEAD.

### MINOR-4 — DOSSIER-F11-F20 F16: bare test-path cite

"the tests import `GlassTimeline` only (`continuous-structural-split.test.ts:4`…)" — the file lives
at `tests/components/custom/timeline/continuous-structural-split.test.ts` (no timeline-local tests
exist); the bare filename invites a wrong-directory hunt. Content claims re-proven exact (`:4`
imports GlassTimeline; `:226` names ContinuousMarkers in a comment; the two sibling timeline tests
also import GlassTimeline only). Path-prefix fix only.

## 3. FLIPS-section integrity + cross-corpus consistency

- **Nothing smuggled.** Every contradiction asserted inside dossier prose is either carried in the
  sidecar FLIPS (F04/GF-DOCK, Card label, F17/RULING 8, F13/JUDGE, F24/gate-b, F27/GF-DOCK rationale)
  or explicitly labeled not-a-flip with reasons (F16 facade vs the prior layer only; F25
  evidence-grain; F28 near-flip). The one mis-FILING is MINOR-2 (F15's 251→234). J2/J8/J10 and
  J4/J6/J7 applications were re-proven verbatim in the band text at HEAD (`BAND-STORY:195/:567-580`,
  `BAND-FEEDBACK-MOTION:41-47/:79-84`, `BAND-MATERIAL:258-262`).
- **SUPERFLUITY relabeling hazard.** The RU-09 rewrite REPLACED the contradiction roster: JUDGE.md's
  §B "C-A..C-G" (F25 story, W4-LANDED, W4/W5 sequencing, scroll table, tempo scope, scene-staging,
  F08 binding) no longer matches SUPERFLUITY's on-disk C-A..C-I (F18/UF-K1, PULSE-DOT, F33,
  DIALOG-DRAWER, F16-scrubber, F32-F42, F23-dispute, F08-roster, F25-census). The dossiers cite
  "the C-A/C-C/C-E/C-G ruling (JUDGE.md)" — internally coherent — but any reader joining the two
  vocabularies will mis-resolve five of seven labels. The JUDGE-2 pass should stamp a label
  crosswalk (e.g. JUDGE-C-G = SUPERFLUITY-C-H).
- **RF-5 partition** — consistent. The dossiers' crosswalk stances reproduce CLEARED = {F02, F06}
  exactly (both AGREE-with-nuance), F05 LANDED per J2/D2, and the four in-scope ASK rows
  (F18/F25/F26/F30) match RF-5's ratified 10-ASK membership. Nothing in F01-F30 disturbs the
  corrected 50/5/2/10 = 67.
- **Perfection unions** — the dossiers' FSF/AMEND-D-2/D-7 and FABLE-DAG A2 cites re-resolve at HEAD
  (A2 all-five timeline scope at `BAND-REDUCTION.md:527`; W5 stub at `:435+`).

## 4. What re-proved clean (the ratified spine)

Anchors re-verified on disk at `454f6d64` this seat — all exact: `SectionPreviewCard.vue:63-65`;
4 `.tile.vue` repo-wide; `CatalogLanding.vue:7→:40`; `AppShell.vue:11,26-28,147-156,201-203`;
`router.ts:121-130`; 73 modulepreloads in `dist-demo/index.html`; `layers.vue:279/:303/:329-337`;
`manifest.ts:932`; `rail.vue:31-40` (8 entries) /`:69` (the ONE Aurora, inside the 8-entry
"Vertical dock" section — cannot be the 5-icon pure-black F04 frame) /`:108-140` ("Rounded shape",
home + `entries.slice(0,4)`, `shape="rounded"` at `:117-121`) /`:142-189` (postures);
`useDockShellProps.ts:53`; `Card.vue:33/:39`; `aurora-mediums.wgsl.ts:387-403`; `presets.ts:685-703`
(17 keys); `Configurator.vue:211` + `configurator/styles.css:25/:117-119`; `AuroraColorSection.vue:163+`
(+ the overflow-fight comment); `toggle-group` harmony chips; `StorySection.vue:32`;
`sizing-config.css:35`; `AuroraConfigDock.vue:267`; `tags-input/styles.css:8` (+`:61` = delete
button, `TagsInputItem.vue:23` renders Chip); `searchVariants.ts:8-11`; `utilities/components.css:12-16`;
`GlassTimeline.vue:2-4` (dispatcher facade) + `ContinuousTimeline.vue:3-4` + `index.ts`
(GlassTimeline+types only) + `README.md:11-17` (the false §Exports); `infinite-scroll.vue:72-78`
(raw button, `rounded-md`); `SortableList.vue:144` (999px); `alert/index.ts:8/:11-18`;
`radius.css:16/:31/:21/:46` (10px lg; 1rem field); `tokens/glass.css:86-88` (wash 1px, quiet/resting
7px); `Toast.vue:80` transient reveal + retirement comments; `progress.vue:22-45` (setInterval 120ms,
+3, wrap-to-0) + `Progress.vue:158` (300ms) + `scheme-motion.css:101`; `Skeleton.vue:54/:59-63` +
`scheme-motion.css:107` (5s) + `literals.css:24-34` (skeleton = fast rung); `overflow.css:56-59`
(FITS both-visible) /`:63-73` (overflow branch `auto`+`visible`) /`:66` (false "clip" comment);
`button/styles.css:40-51` (primary deep / secondary resting); `springs.vue` grep Configurator = 0;
`tempo.vue`; `scroll-progress-rim` conic + edge arms; sibling censuses (completion-seal:
speedtest 0 / sci-report 2 / atlas ≥2; confirm-dialog: words 5 + muster 1 live, value.js docs-only;
instrument-chassis + metric-badge multi-repo SHARED). Band/greenfield owners: every wave the
dossiers name exists at HEAD with the cited gate text (G-CFG-1..5, G-COPY-2 incl. layers per J8,
G-RSP-1/3, W-PROGRESS-RIM-REPLACE `:49-63` incl. the phantom-bank retirement, W-ALERT-IDIOM
`:86-96`, RULING-8/OPEN-1a, REDUCE-TIMELINE stub + A2, REDUCE-CROSSREPO-GATED, ASK §A1/§A2/§C2/§C4,
GF-DOCK §4.1 + `G-NO-BLOCK-SCROLL`, IOS27-CODEX law 12 at `:28`). `APPLYLOG` confirms J1-J11
applied; crosswalk rows `:23-24/:33-43/:213-216/:227-229/:243` all read as the dossiers cite them.
The F04 OPUS-WRONG, the F16 facade OVERTURN, the F17 OVERTURN, the F24 OPUS-WRONG, and the F27
mechanism correction were each re-derived from primary sources this seat before comparing — all
five converged with the dossier text.

## 5. Union duty — verdicts on the OPUS-ERA critiques (findings touching F01-F30)

### CRIT1-A (pass 1, seat A — the F01-F30 critic)

| # | finding | verdict |
|---|---------|---------|
| 1 | F01 cv anchor → `:63-65` | **RATIFIED** (disk exact) |
| 2 | F04 entries `:31-40` + scope "matches" to the sliced render | **RATIFIED as far as it goes — but the seat's own F04 adjudication is OPUS-WRONG**: it re-affirmed "a single stadium pill… exactly what the image shows" and left the anchor on the "Vertical dock" section. The PNG shows a finite rounded-rect (flat top run) and the 8-entry aurora-staged section cannot render the 5-icon black frame; the referent is "Rounded shape" `:108-140`. CRIT1-A held the slice(0,4) census in hand and did not move the anchor |
| 3 | F05 postures re-anchor `:142-189` | **RATIFIED** |
| 4 | F10 `sizing-config.css` path | **RATIFIED** |
| 5 | F05 dispute ruling (dossier right; GF-DOCK C5 corroborates) | **RATIFIED** — vindicated as J2; the PNG + `overview.vue` DockStage disambiguation independently corroborate |
| 6 | F13-F20 ledger off-by-one decrement | **RATIFIED** (disk F13=25…F20=32) |
| 7 | F11 `:552` mis-cite | **RATIFIED** (fix landed; G-CFG-3 `:267` verbatim) |
| 8 | F19 alert anchors `:8/:11-18` | **RATIFIED** |
| 9 | F27 ternary qualification | **RATIFIED on the ternary — OPUS-WRONG on the endorsed mechanism**: "the operative F27 leak is `overflow-y: visible` + the recentre — both correct" is false; `visible` cannot scroll — the leak is the visible→auto computed coercion on the overflow branch, and the `:66` comment states the spec backwards |
| 10 | F24 keyframes anchor NOTE | **RATIFIED on the anchor — OPUS-WRONG on the endorsement**: "the load-bearing 2.4s literal at `:54` is dead-on" verified the byte, not the resolution; the browser uses 5s via the defined `--duration-shimmer`, and the canon documents the fast rung skeleton misses. The exact resolved-value-check lesson |
| — | blanket "F11-F20 isolation + target: accurate" | **OPUS-WRONG for F17** — it endorsed the field-control attribution + screenshot-drift stance the true run overturned wholesale (mechanism, disk state, screenshot read, guard posture) |
| — | blanket "F16… targets resolve" / no F16 finding | **N/A-CLEAN** — the dead-code layer CRIT1-A is accused of missing did not exist yet (it was introduced by the overridden first union); nothing to charge |
| — | "no EXACT over-generous" tallies | **RATIFIED at its HEAD**; F23's EXACT was later disputed by the rewritten SUPERFLUITY (C-G) — supersession, not error |

### CRIT2-A (pass 2, seat A)

| # | finding | verdict |
|---|---------|---------|
| 1 | F03 G-COPY-2 "manifest" over-inclusion | **RATIFIED** — and discharged: G-COPY-2 at HEAD greps handmark/search/layers (J8), manifest in no G-COPY gate |
| 2 | F23 `glass-track` collision + ContinuousRail census mislabel | **RATIFIED** — `ScrubberTimeline.vue:209` live class re-proven; the rename chain landed (BAND-MATERIAL `:411-421/:433/:476` now `glass-track-well`) |
| 3 | fix-verification table (10/10 LANDED) | **RATIFIED** (load-bearing entries spot-re-proven at HEAD) |
| 4 | superfluity-alignment section | **SUPERSEDED** — it aligned against the pre-rewrite SUPERFLUITY; the RU-09 rewrite relabeled the roster (C-A..C-I) and changed F23 (two folds) / F08 (~11) / F16 (fold-not-delete). Not wrong-at-writing; must not be cited as current |

### CRIT3-SCOPED (pass 3)

| # | finding | verdict |
|---|---------|---------|
| 1 | Fix 1 (F03) CLEAN | **RATIFIED** — historical; the true-run union then dropped the D-F03 delta text entirely (superseded by J8's in-place application), so its `:149-153/:469-476` cites no longer resolve in the current file |
| 2 | Fix 2 (F23 fold-target) CLEAN | **RATIFIED** |
| 3 | A3-1 (BAND-MATERIAL `:410/:453` still minting `@utility glass-track`) | **RATIFIED and DISCHARGED** — both sites now read `glass-track-well` at HEAD |

### CRIT1-B / CRIT2-B

Scoped to F31-F50/A01-A17 — no F01-F30 findings to verdict. (Their F32/F33/F45 material is RU-14
pass-1 seat B's scope.)

## 6. Routing (for the lead — PROPOSE only)

| # | destination | action |
|---|-------------|--------|
| R-1 | `DOSSIER-F01-F10.md` F08 REDRESS + summary row | refresh to GF-AURORA at HEAD: 17→11 (+death-clause elasticity), three-arm W4, Q-AURORA-QUARTET (MAJOR-1) |
| R-2 | `DOSSIER-F21-F30.md` F23 verdict + JUDGE-2 | EXACT → PARTIAL pending the value-marks charter ruling; reconcile SUPERFLUITY C-G + the track-well path split (`src/styles/glass/` vs `_shared/`) with BAND-MATERIAL W4 (MAJOR-2) |
| R-3 | JUDGE-2 (J12+) + application pass | rule the seven aged items of MAJOR-3 (F13 owner mint, RULING-8/F17 premise sweep incl. PLAN, GF-DOCK RT1 + §4.1 rationale, BAND-REDUCTION RT2, FM-W3 gate-b reshape, overflow.css comment cure rider, BAND-DOC-TRUTH timeline README row) |
| R-4 | JUDGE-2 preamble | stamp the JUDGE-C-* ↔ SUPERFLUITY-C-* label crosswalk (5 of 7 labels now collide) |
| R-5 | `DOSSIER-F21-F30.md` F25 TARGET | align census with SUPERFLUITY C-I + add `words/frontend/vite.config.ts:218` to the relay roster (MINOR-1) |
| R-6 | `REFABLE-RU-13-F11-F20.md` | move the 251→234 truth-up FABLE-NEW → FLIPS with a routing row; cite the band's own 218/251 split (MINOR-2) |
| R-7 | `DOSSIER-F11-F20.md` F16 | prefix the test path `tests/components/custom/timeline/` (MINOR-4) |

*End — RU-14 CRIT1-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
