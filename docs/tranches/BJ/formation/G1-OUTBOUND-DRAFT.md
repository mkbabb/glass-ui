# G1 OUTBOUND — the corrections relay to the constellation (DRAFT)

> **DRAFT-HELD — the send word is the owner's; this path is not a mail dir.**
> Nothing here has been dispatched. `docs/tranches/BJ/formation/` is a formation record, not
> `coordination/`, and not any sibling's inbox. On the owner's send word this compiles into the
> per-repo mails; until then it is a staged text and nothing more.

Compiled 2026-07-20 from `refable/LEAD-AMENDMENT-LEDGER.md` row **G1** and its named source rows:
**RF-8** · **RU-17a r4** (+ r7) · **RU-23** (RT-1..RT-4) · **RU-03-A11Y r8** · **RU-03-COLOCATION R8**.
Ledger row G1's own status is `WAITING (all corrections stable)`; the terminal order sequences it
after the RU-01 capstone. Every consumer pin below was re-run READ-ONLY against the siblings' disks
this session — the figures are the fresh ones, and where they differ from a ratified formation-time
census the delta is stated rather than smoothed.

---

## (a) THE CORRECTIONS RELAY — facts that hold regardless of pending owner rulings

These eight rows do not depend on any ASK mark. They are corrections to already-sent mail, census
truth-ups, or law-governed relocations. They are sendable the moment the owner gives the word.

### a1 · SPEEDTEST aurora preset — relocation (presets-in-consumers)

The `SPEEDTEST` aurora preset relocates to the speedtest repo. It lives at
`demo/stories/substrates/aurora/presets.ts:406` (`const SPEEDTEST = cfg({…})`, section header `:399`),
registered at `:702` and `:737` (`meta("Speedtest", "smooth", "6 nuclei · 6-hue")`). Named presets
belong in consumers; the library's own tokens carry the library's identity. The relocation rides the
F08 17→11 preset cut, gated `G-SPEEDTEST-RELOCATED` at GF-AURORA **W5** — it is a marked addendum in
speedtest's tranche, per the consumer-updates ruling, never a preserved obsolete export here.

Per **RU-07 RT8**: this addendum joins the ONE relay batch, not a separate mail.

### a2 · value.js — the blob addendum (RU-08 R6, GF-BLOB-PASS3 §2.9, lands at W-FINAL)

The value.js BG-era `DELETE2` order is answered by producer doctrine, not adopted as a wave:

- **OQ7 (WebGL2-only expectation): answered NO.** The blob stays deliberately WebGPU-first
  dual-substrate at HEAD; the Safari premise the order rested on is stale on the Safari-2026 floor.
  `W-DELETE-TWIN` and `G-NO-WGPU` are struck; `π-SAFARI-SINGLE` → `π-PARITY`. The twin-delete
  survives only as a user substrate-band ASK note.
- **OQ1/OQ2/OQ3/OQ5/OQ8** ride the same addendum: HERO headroom via the `W-SHOW` default ·
  satellites-visible rest with visibility-only park · `hitTest(x,y)` exposed · the pacing fix ·
  a scale-aware ceiling. The union adopts D8/D9 of value.js's ANEW deltas as W0 contract items.

### a3 · bbnf-lang — the omitted per-repo migration section (RF-8 W1/N1 + RU-17a r4)

bbnf-lang was omitted from the entire q060 mail. It is owed its own section:

| item | pin on disk (re-verified 2026-07-20) |
|---|---|
| pin | `playground/package.json:13` — `"@mkbabb/glass-ui": "^3.0.0"` |
| live 7.0.0 break | `playground/src/components/layout/NavBar.vue:6` — `import { DarkModeToggle } from "@mkbabb/glass-ui/controls"` → successor `/dark-mode-toggle` |
| tooltip family | 10 files, import shape survives at 7.0.0 — no migration owed |
| present at 7.0.0 | `/sidebar` `/dock` `/select` `/search` `/dialog` `/slider` `/dark` `/card` `/styles`, 1× each |
| trio bump law | applies as constellation-wide |

**Constellation truth-up:** "`/controls` is consumed by EIGHT repos" is wrong — it is **NINE**.

### a4 · fourier-analysis — three asks

All six sites re-verified on the sibling's disk 2026-07-20.

1. **`useSidebarState` vendoring (RU-03-COLOCATION R8).** Vendor `useSidebarState` **and the types it
   reaches** into `web/src`, 2 sites: `web/src/components/paper/MobileFloatingToc.vue:4` and
   `web/src/components/paper/PaperSidebar.vue:8` (both `import { useSidebarState } from
   "@mkbabb/glass-ui/sidebar"`; both instantiate `useSidebarState<PaperSectionData>` at `:67` / `:38`).
   This ask is what corrects FABLE-COLOCATION's "zero consumers anywhere" to **zero IN-REPO** — the
   external fourier contract governs, and it is the reason ADJUDICATION-1 ruling 3's census-clears
   precondition was recast to `G-CONSUMER-ADDENDUM` (outcome 8.0.0 unaffected).
2. **`/hover-popover` ×2 (RF-8 W8).** `web/src/components/visualization/EditorControlsDock.vue:4` and
   `…/CanvasControlsDock.vue:6` (`import { HoverPopover } from "@mkbabb/glass-ui/hover-popover"`).
   Dropped at 5.0.0. Successor: `<Popover trigger="hover">`.
3. **Reached types ×2** ride (1) — vendoring the composable without its reached types leaves the
   sibling with an unresolvable contract.

**The §2 hover-note deferral is RETRACTED (RF-8 W2, constellation-wide).** The q060 mail told
consumers the Popover `trigger="hover"` axis was a BJ deliverable and to hand-roll hover-open
locally. It **shipped at the announced tag**: `git show v7.0.0:src/components/popover/Popover.vue` —
`PopoverTriggerMode = "click" | "hover"` at `:11`, prop at `:19`, default `"click"` at `:37`, hover
root logic at `:63`. Every hover-card / hover-popover consumer (words ×13, fourier ×2, slides,
speedtest) may adopt it directly. This retraction is the largest single correction in the batch.

### a5 · metric-family recompose — the census, with a stated delta

**RU-23 RT-2** reframes Q051 R16: the confirm-target is **capability-keep** (the pill deleted at
0 consumers; the badge folded to `/metric`, compose `Metric`), never "badge kept SHARED". The
ratified census (ledger **E3**) is **4 repos / 13 files**, fourier ×7 the largest, `/metric` with
**one** adopter — `keyframes.js:demo/scenes/sequence/SequenceTarget.vue:138` (RU-17a N1's "zero
adopters" is overtaken). RU-17a r4's own correction stands: the recompose asks count **4 repos, not
3** — fourier-analysis and bbnf-lang/playground both enter the standing consumer census.

Fresh re-census, 2026-07-20, live source only (docs/tests excluded):

| repo | `/metric-badge` | `/metric-cell` | `/metric-stack` | family total |
|---|---|---|---|---|
| fourier-analysis | 7 | — | — | 7 |
| speedtest | 2 | 2 | 1 | 5 |
| muster | 2 | 1 | 2 | 5 |
| sci-report | 2 | — | — | 2 |
| **4 repos** | **13** | **3** | **3** | **19** |

**The delta, stated:** the ratified "13 files" figure is the `/metric-badge` count exactly — it
re-derives cleanly. The **whole** removed family is **19 sites across the same 4 repos**, because
`/metric-cell` (×3) and `/metric-stack` (×3) also went at 7.0.0. The relay must address cell and
stack, not badge alone, or three repos get a partial migration. Repo count is unchanged; only the
per-repo file lists widen. Sites:
`speedtest` — `SharedResultView.vue:104` · `SpeedtestResults.vue:641` · `ResultStack.vue:172` ·
`dashboard/ResultDetailSheet.vue:7` · `survey/SurveyResultDock.vue:166`;
`muster` — `TravelMatrix.vue:27` · `RankedVerdict.vue:40` · `WhyThisWonSheet.vue:35` ·
`WinnerHero.vue:48` · `CommandDock.vue:42`;
`sci-report` — `sci/story/points/03-trend/Point.vue:26` · `ecf/story/points/01-window-arc/Point.vue:20`.

Also carried per **RU-17a r4**: stamp `asks-and-consumes.md` row 6 and the pin-guard section
**SUPERSEDED-BY-Q060**.

### a6 · `--surface-tint-35` — clean-break note (RU-03-A11Y r8)

`--surface-tint-35` is deleted outright, clean break, no alias and no migration shim. After the
placeholder repoint its residue on our disk is exactly definition + dark arm + bridge:
`src/styles/tokens/color-radius.css:163` · `src/styles/tokens/dark-arm.css:329` ·
`src/styles/theme/bridges.css:153`. Live consumers of the token here are the two placeholder
registers being repointed (`src/styles/glass/control-surfaces.css:67`,
`src/components/tags-input/styles.css:39`), both failing the contrast floor (2.19 light / 2.74 dark)
which is why the delete happens. Sibling consumers, **if any**, update via their own tranche
addendum per the consumer-updates ruling. No sibling is asked to do anything today — this is a
notice, not an ask.

### a7 · keyframes.js — the EXACT-pin deviation, RATIFIED (RU-17a r7)

keyframes.js satisfied our §6 declared-pin ask with the constellation's **EXACT** pin —
`"@mkbabb/glass-ui": "7.0.0"` as a demo-only devDependency on immutable kf 6.0.0 (`ebb08948`),
registry-only lock, one physical nonsymlinked core, value 4.0.0 deduped beneath — rather than
`^7.0.0`. This is the measured-edge law, bilaterally ratified with value.js and banked by atlas.
**Recorded as ratified: a deliberate deviation, not an oversight.** No follow-up is owed.

**Census truth-up owed on the same mail (RF-8 W7):** we told them keyframes imports 4 subpaths
(`/header-ribbon`, `/dark-mode-toggle` ×3, `fading-scroll`). Main imports **nineteen** — re-counted
19 unique subpaths on their disk this session. A 3-of-19 undercount; the pin-declaration ask stands
and weighs considerably more than the mail implied.

**Atlas roster (same routing, RU-17a r7):** the three discharged ask-sites — `--ring`, `.text-gilt`,
`hover-popover` — are marked **DONE-by-consumer** on the roster.

### a8 · speedtest — the omitted and mis-cited rows (RF-8 W3/W4/W5/W6, N3, N4)

Re-verified 2026-07-20:

| row | correction |
|---|---|
| `/scrolling-text` ×2 — **omitted entirely** | `src/components/AppSettingsButton.vue:97` · `src/components/dashboard/ResultDetailSheet.vue:6`. Dropped at 5.0.0; MIGRATION's retire-relocation section already names the local-copy adopt |
| `/context-menu` ×2 — **omitted entirely** | `src/components/admin/AdminSessionsTable.vue:13` · `src/components/dashboard/ResultsTable.vue:15`. Dropped at 5.0.0. Nearest surviving surface: `/dropdown-menu` |
| `instrument-chassis` "PRESENT at 7.0.0, no break" — **false at the prop/slot level** | `src/App.vue` binds `:variant` (`:100`), `:phase` (`:101`) and `#dial` (`:104`). `variant` is removed, `phase` remaps to `state`, and strip/dial/control are renamed stage/inspector/action (MIGRATION §7.0.0 rows 1-3) |
| deep-import break — **in no roster** | `tests/phase-color-parity.test.ts:79` reads `../node_modules/@mkbabb/glass-ui/src/styles/tokens.css`; the 7.0.0 pack ships `files:["dist"]` only, so the read fails on bump. Re-point at the packed styles |
| `/icon-tooltip` ×2 — **in no roster** | `src/components/Dock.vue:17` · `src/components/survey/AddressAutocomplete.vue:103` |
| path fix | `ResultDetailSheet.vue` is under `src/components/dashboard/`, not `survey/`. Line numbers were correct in both rows; the directory was wrong in both |

### a9 · record-only truth-ups on any reissue (RF-8 routing 8)

- bbnf-buddy: `EmotionStateSelect.vue:15` is at `src/components/`, not `src/editor/components/…`.
- value.js `/controls`: the pre-adopt sites were `demo/@/components/custom/dock/menus/MobileMenuDropdown.vue:6`
  + `ProfileSection.vue:8` (verified at `6d6d3521`), since consumed at `f2c8f565`. Citation defect only.
- "declare the pin in the demo's `package.json`" — there is no `demo/package.json`; the pin belongs
  (and landed) in the root manifest.
- **Peer delta, absent from the mail entirely (RF-8 N2):** `class-variance-authority`, `clsx` and
  `perfect-freehand` are no longer peers; `embla-carousel ^8.0` is a new optional peer. Material to
  words (`/carousel`).

---

## (b) PENDING-RULING migration asks — firm only on the owner's ASK mark

Each row below is a *proposed* disposition whose migration ask does not exist until the owner marks
the named ASK row. **None of these ships in the (a) batch.** They are staged here so the relay can be
compiled in one pass the moment the marks land, and so no sibling is told to migrate against a
recommendation the owner has not ratified.

| id | disposition | firms on | consumers who receive the ask |
|---|---|---|---|
| **F18** | metric-family + instrument-chassis — chassis **DELETE** (contract-phantom), metric **DELETE-with-relay**, `COLLAPSE-FAMILY` the fired-flip alternative | **ASK-1** | speedtest, muster (chassis inline app-local); the `/metric-badge` relays file either way — see (a5) |
| **F16** | timeline collapse 5→1, redesign-in-library; scrubber's liquid-motion register folds into Slider as the transport variant | **ASK-7** | speedtest — one import + one tag edit |
| **F25** | confirm-dialog standalone demo story **DELETE (fold)** into `/containers/dialog` | **ASK-3** | words ×5 (`SidebarWordListItem.vue:113` · `SidebarWordListView.vue:165` · `WordlistDashboard.vue:166` · `WordListView.vue:236` · `SearchBar.vue:105`) + muster ×1 (dynamic import, static greps miss it). value.js already migrated — its `AdminUsersPanel.vue` is the exemplar |
| **PULSE-DOT** | Pulse **MERGE-INTO** StatusDot (7-state union, size `sm\|md\|lg`, motion opt-down); delete `src/components/pulse/` + `./pulse` subpath + dist + typesVersions | **NO ASK ROW EXISTS** — see the carve-out below | speedtest ×4, keyframes.js ×2, atlas ×2 (all already 7.0.0-broken; migration owed regardless) |
| **carousel / words relay** | deck half stands (headless `useDeck`, atlas ×2; DeckPager cut rides REDUCTION W8); **carousel DELETE-with-relay** + embla peer removal; deck + PagerDots the one paging register | **ASK-6** | words — the relay NAMES words: `ImageCarousel.vue:83-89` five value symbols + `type CarouselApi` at `:90`; pin `^3.0.0`; two of the six gone at 7.0.0 (`Prev`/`Next` absent at HEAD) |

**PULSE-DOT carve-out — stated plainly rather than papered over.** RU-09 **A3** proposed an ASK row
("merge into StatusDot; explicit user check — ratify the mechanical ≥0.85 composite floor as binding
and the merge reverts for lack of mandate"). **That row was never minted.** `ASK.md`'s roster runs
ASK-1…ASK-27 and `grep` returns zero for `pulse` / `status-dot` / `merge` across both `ASK.md` and
`ASK-REDUCTION.md`. So PULSE-DOT's disposition has **no owner-mark seat**. It cannot firm, and the
relay to speedtest/keyframes/atlas cannot be sent, until either an ASK row is minted or the owner
rules it directly. RU-19 N7 additionally holds that A3's wording must be re-cast as a
**design-judgment** ask, never "ratify the ≥0.85 floor as binding" — the floor is a dead instrument
and ratifying it would mechanically fence every future merge, not just this one.

Per **RU-09 R12**: F18 (speedtest, muster) + F16 (speedtest) + F25 (words, muster) + PULSE-DOT
(speedtest, keyframes.js, atlas) + F08 (speedtest) ship as **ONE coordinated relay batch** under the
consumer-updates ruling — not five ad-hoc mails. That batching is why (b) waits as a block: a partial
send would fragment the batch the ruling exists to prevent.

---

## (c) ATLAS Q STATUS — **RESUMED**

**We acknowledge the atlas Q orchestrator's letter of 2026-07-20,
`atlas-outbound-2026-07-20-q-execution-resumed.md`, by name.** The owner re-opened Q execution
in-session ("Begin and continue the current tranche"), superseding the 2026-07-19 deferral. Our
ruling of record is **Addendum 3** of `coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` — read as
terminal; addendum 1's failed-verification leg died at addendum 2 and must not be cited by any
downstream record.

**The Q mailbox hold has ENDED.** All six G-rows resume as **scheduled band annotations at OUR batch
points** — their letter explicitly disclaims any interruption ask, and we are taking them at their
word. **G-CLOSE is UN-GATED**: `V-PERCH-PRIMITIVE` (FINAL W-5, the ONE close affordance across
dismissible surfaces) is un-parked and enters the wave set on its merits. A gate with no remaining
ground is not a gate.

| row | our landing seat | state |
|---|---|---|
| **G-1** 40px < 44px fine-pointer (`src/styles/tokens/sizing.css:143`, `--size-icon-btn: 2.5rem`) | `BAND-A11Y` W2 item **(F)** — a NEW clause beside it, never an edit of the Slider row | scheduled |
| **G-2** shape-pill radius unthemeable (`src/components/dock/styles/shell.css:424`) | `BAND-MATERIAL` W1 §Design(A) role table + the GF-DOCK §shape-grammar cross-note | scheduled |
| **G-3** backdrop-attenuation primitive absent | `BAND-MATERIAL` **W2** §Work — the blur/opacity ladder; design basis = V-ALENS + the MARKS-C-APPS 6c annular mark per `IOS27-MICRO/FINAL/FINAL.md` W-5 | scheduled |
| **G-4** DataTable inline row `:ref` churn (`src/components/data-table/DataTable.vue:289,412`) | `BAND-PERF` W2 deliverable **(c)**, beside the `usePagerWorm` row | scheduled · **ships-edge** |
| **G-5** SegmentedTabs adornment reservation (662.8→688.2px, their measurement ×2) | `IOS27-MICRO/FINAL/FINAL.md` **W-5** `R-TABS`/`R-TABTOGGLE` frosted-canon recipes | scheduled · **ships-edge** |
| **G-CLOSE** corner-perch close primitive | `FINAL.md` W-5 `V-PERCH-PRIMITIVE` — seated, **UN-GATED** | un-parked |

**The two ship-time edges — this is the operative commitment of section (c).**

- **G-4 → their W-PERF (batch B7).** Their acceptance consumes our `:ref` fix with **no interim
  guard**. When the fix ships, **we owe them a one-line note naming OUR shipping cut version.** That
  note closes their edge.
- **G-5 → their W-PORTAL.** Same ask: **the shipping cut's name, one line.** Their W-PORTAL usage
  change follows it.

Both notes ride the G1/Q060 relay. Neither blocks us, and neither blocks them. They are the only
two rows in this whole document that create a standing obligation *after* a cut — everything else
discharges at send. Their W-MEMBRANE consumes G-CLOSE two-stage post-cut, whenever it lands.

Their B1 is in flight (`W-ROOT` + `W-DEMAND-GRAIN`) on atlas-library and sci-pipeline surfaces only;
no Q lane touches a glass surface, and our repo is read-only to their side while our tranche runs.
Their reply path is unchanged: `sci-report:atlas/docs/tranches/Q/coordination/` in the totality tree.

---

## (d) THE VERIFICATION-MAP NOTE — so the 07-19 failure cannot recur

**Sibling claims verify against the CONSTELLATION checkouts, not only the primary ones.**

The atlas Q tranche lives at:

```
/Users/mkbabb/Programming/.p-totality/sci   @ branch p/totality
    └── atlas/docs/tranches/Q/
```

It is **not** in the primary atlas checkout, and not in the primary sci-report checkout. Verified
present this session at that exact path on branch `p/totality`.

**State plainly, because the record should carry it:** on 2026-07-19 we ruled that the G-CLOSE
veto-lift claim **FAILED verification** — we reported that the atlas repo contained no Q tranche
directory and no `RATIFICATION.md` anywhere in its tree, and we further speculated about an
"external writer" in our coordination directory. **That ruling was our error.** It was a
**checkout-map error, since corrected.** We searched the primary checkout; the sender was working
from the totality tree. The record they cited was real and verifies exactly as they stated:
`atlas/docs/tranches/Q/RATIFICATION.md:40-41`, committed `109f5573`, "THE SEAL — owner ratification
of record", ruling verbatim: **"G-CLOSE: CONFIRMED — the owner veto is LIFTED."** The "external
writer" was the legitimate atlas Q agent. Addendum 1's *discipline* was right on the evidence it had
— an owner authorization whose cited record cannot be found is never actionable — but its evidence
was incomplete because our map was wrong, and the conclusion it produced was wrong.

**The standing correction:** constellation verification sweeps `/Users/mkbabb/Programming/.p-totality/*`
alongside the primary checkouts. Addendum 3's own verification ran this way and cleared three claims
(`6c4bbc06` §E2 THE GO · `109f5573` RATIFICATION · `f6a52af3` their HEAD). No future sweep of ours
should repeat the 07-19 shape: **a "not found" against an unswept tree is not a finding.**

---

## (e) SIBLINGS-IN-FLIGHT — every census here is fresh-at-ship, not formation-time

**sci-report and atlas are executing their own tranches right now.** The owner's own mark:
"sci-report/atlas is in active tranche execution currently: coordinate accordingly." Their Q B1 is
in flight as of their 07-20 letter.

The consequence binds this whole document. **Every consumer census we cite is a fresh-at-ship
figure, re-derived at compile time — never a formation-time number carried forward.** A live tranche
moves files; the BJ formation censuses were taken against trees that have since advanced, and the
07-19 checkout failure is the standing proof that a stale map produces a confident wrong answer.

Concretely, for this batch:

1. **Re-run before send.** The (a5) metric census, the (a8) speedtest roster, the (b) words/muster
   rosters and the (a3) bbnf-lang section are re-derived at send time, not lifted from this draft.
   The pins here are true as of 2026-07-20; they are a floor for the diff, not the shipped text.
2. **The stated delta is the model.** (a5) already shows the pattern: a ratified figure (13) and a
   fresh figure (19) that do not contradict — they measure different sets. Where a fresh re-run
   disagrees with a ratified census, the mail states both and names which set each counts. It never
   silently overwrites a ratified number, and it never ships a number it did not just measure.
3. **Read-only, always.** Every figure in this draft came from read-only greps against the siblings'
   working trees. No sibling file was opened for write, and nothing outside
   `docs/tranches/BJ/formation/` was touched producing it.
4. **Their tranches own their fixes.** Per the consumer-updates ruling, none of these asks is a
   request that a sibling preserve an obsolete API for us, and none is a request to interrupt. Each
   is a marked addendum landing in that repo's own tranche, at that repo's own cadence.

---

## Compile checklist (for the send seat, once the word is given)

- [ ] Re-run every census in (a) and (b) against live sibling trees; diff against this draft.
- [ ] Confirm the (b) ASK marks — ASK-1 · ASK-3 · ASK-6 · ASK-7 — and resolve PULSE-DOT's missing seat.
- [ ] Hold (b) as ONE batch per RU-09 R12; do not send a partial.
- [ ] Include the (c) G-4 and G-5 cut-version notes only when a cut version exists to name.
- [ ] Split per-repo: speedtest · fourier-analysis · bbnf-lang · keyframes.js · value.js · words ·
      muster · sci-report/atlas · bbnf-buddy.
- [ ] Send from `coordination/`, never from `formation/`.
