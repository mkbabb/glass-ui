# BK ROW #14 · PHANTOM-REPAIR — the doc-side execution record

**Row of record:** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:164` (TR #14,
Φ3, spec of record `RECONCILIATION.md` §8 item 11 at `:342`). **Owner:** Claude Code (Opus fanout
seat, `claude-opus-5[1m]`), under cursor ⊕¹⁸ — BK and all its items are owned by Claude Code; Codex
is fired from the tranche. **Mode:** doc-side only; zero bytes outside `docs/tranches/`. **Date:**
2026-08-03.

**Honesty posture.** Every claim below cites a path + line or a commit re-read this seat. No seal is
minted here: this row's product is a record and four in-place doc corrections, not a state
transition. Nothing in this row descends from a codex-era seal — see §6.

---

## 0 · What TR #14 actually asks, decomposed

TR #14 names six acts. `RECONCILIATION.md:342` (the spec) named five, two of which TR then **removed
from this row's scope** because the roster resolved them:

| ask | source | disposition here |
|---|---|---|
| roster `W-HAIRLINE` | RECONCILIATION `:342` | **NOT THIS ROW** — TR #36 (`:186`) RETIRED, subsumed by #87 W-MARKS (ruling J-3, `:36`) |
| roster `W-SLIDER-TRANSPORT` | RECONCILIATION `:342` | **NOT THIS ROW** — TR #37 (`:187`) ⊕⁵ RETIRED-UNBUILT, number held so no citation dangles |
| re-point REGISTRY's three wave columns | RECONCILIATION `:342` + TR #14 | **DONE** — §1 |
| strike ECOUTE's six false gaps | TR #14 (precondition of TR #16, `:166`) | **DONE** — §2 |
| correct WAVES.md's false closing sentence | RECONCILIATION `:342` + TR #14 | **DONE** — §3 |
| the discharge class (A02/A03/A08/A09 · A04 · the 12 CWT-3 §6 rows · S4/S7/S8 · rosters #68/#69/#78/#89) | TR #14 | **DONE** — §4, §5 |

---

## 1 · THE RE-POINT — REGISTRY's three phantom wave names → real roster ids

Landed in `docs/tranches/BJ/addenda/2026-07-24-refinement/REGISTRY.md` (header note + 21 disposition
cells). **No disposition changed**; each cell gained its roster id.

| name in REGISTRY | roster row | TR line | body on disk |
|---|---|---|---|
| `W-A11Y` (8 cells: K-1…K-5, K-8, K-9, Y-3) | **TR #31** "W-A11Y (≡BAND-A11Y five)" | `TERMINAL-ROSTER.md:181` | `docs/tranches/BJ/waves/BAND-A11Y.md` — 359 lines |
| `W-DOC-TRUTH` (12 cells: A-6, L-1…L-9, Z-5, the release-halt clause) | **TR #61** | `TERMINAL-ROSTER.md:211` | `docs/tranches/BJ/waves/BAND-DOC-TRUTH.md` — 283 lines |
| `W-PERF` (1 cell: the Family K perf note carrying A17) | **TR #69** "W-PERF (≡BAND-PERF)" | `TERMINAL-ROSTER.md:219` | `docs/tranches/BJ/waves/BAND-PERF.md` — 660 lines |

**The load-bearing correction, and it is the whole mechanism of this row.** ECOUTE convicted the
three as waves "that do not exist" on one instrument: `grep -c '^## W-A11Y' WAVES.md` → 0
(`ECOUTE.md:374`). That instrument is **WAVES.md-scoped and blind to `docs/tranches/BJ/waves/BAND-*.md`**,
where all three bodies sit — 1,302 lines between them, `wc -l` this seat. TR seats them by name
(`≡BAND-A11Y five`, `≡BAND-PERF`). So the class was never "waves with no body"; it was **routing
cells that named a wave instead of a row id**, which is exactly a phantom-by-citation. The repair is
therefore a re-point, not an authoring act — and the instrument is retired by name at `ECOUTE.md:374`.

---

## 2 · THE SIX FALSE GAPS — struck in place, each with its falsifier

Landed in `ECOUTE.md` (§1a table, the §1a closing paragraph, §3's `W-ORPHAN-ROWS` scope line, the
`G-ROW-HOMED` RED condition, and the two §3 headings). Nothing deleted; every struck row keeps its
text with the ground beside it so no citation dangles. Ground of record is `RECONCILIATION.md` §4
(`:154-210`) — cited, never restated.

| # | ECOUTE claim | verdict | falsifier (re-read this seat) |
|---|---|---|---|
| 1 | **F11** — "subject matter appears nowhere" (§1a) | FALSE | **LANDED `34681df9`** ("land BJ.W-CONFIGURATOR-STD", 2026-07-21); `RECONCILIATION.md:188` — `styles.css:112-122` carries a literal `F11` header. The id-collision half (owner `F11` vs lens `F11`) survives and stays on `G-ROW-HOMED` |
| 2 | **F29** — "cited nowhere" (§1a) | FALSE | **LANDED `34681df9`**; `RECONCILIATION.md:189` — `springs.vue` +315, Configurator refs 0→13 |
| 3 | **F13 remainder** — "design half unowned" (§1a) | FALSE | `RECONCILIATION.md:162` → `docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md:290` states Δ-F13-1 is "MINTED HERE, on the interaction half"; responsive half at G-RSP-1/3 |
| 4 | **F23** — "unowned and cited in **no** corpus file" (§1a) | FALSE | `RECONCILIATION.md:163` → third-consumer condition at `BAND-FOLD.md:31` and `:375` (§7 U-2) → W-TIMELINE; the enlarged-view clause routes to owner ask R-4 (parked, not orphaned) |
| 5 | **`W-A11Y`/`W-DOC-TRUTH`/`W-PERF`** — "none of the three has a `## W-` heading" (§1a) | FALSE AS A GAP | §1 above: three band bodies on disk, three roster ids, 21 cells re-pointed |
| 6 | **F41** — carried only by `G-ROW-HOMED`'s RED condition (§3) | FALSE | **LANDED `75c19ead`** ("land BJ.W-STORY-COPY-CANON", 2026-07-21); `RECONCILIATION.md:190` → G-COPY-5 at `docs/tranches/BJ/waves/BAND-STORY.md:257` |

**Consequences, stated so TR #16 inherits them clean:**

- `W-ORPHAN-ROWS` (TR #16) live scope contracts from eight items to **three**: **F25 · F33-goo-morph ·
  A16**, plus the union tails TR #16 already names (PROOF-SWEEP lane C §4, U-01/U-04/U-07/U-51).
- `G-ROW-HOMED`'s RED condition loses five of six ids. **F25 alone holds the row-citation clause RED**
  (`RECONCILIATION.md:164` — the archetype: ASK-3 ruled FOLD, `WAVES.md:323-330`'s scope list omits
  the file, `demo/stories/feedback/confirm-dialog.vue` present at HEAD). The id-namespace-collision
  clause is untouched and stands RED on its own ground.
- ECOUTE's §1a headline "Eleven items" is now **six live** (A12 · A14 · A16 · A04-remainder · F25 ·
  F33-goo-morph), of which A04-remainder is discharged at §4 below → **five live gaps**.

---

## 3 · WAVES.md's FALSE CLOSING SENTENCE — corrected at its own site

`WAVES.md:909` read: *"At authoring time the list is empty; it is re-derived, not trusted, at close."*
`ECOUTE.md:139` convicted it: the list was 3 wave names carrying ~22 REGISTRY findings, plus A12.

**Struck and replaced in place** with the ownership rule that is actually true: WAVES.md is not the
ownership index — `TERMINAL-ROSTER.md` §A is, and a REGISTRY row is homed when its disposition cell
names a **TR row id**. The correction carries the three band-body paths, the three roster ids, the
surviving A12 gap (TR #50 GF-BLOB, `TERMINAL-ROSTER.md:200`), and the retirement of the
`grep -c '^## W-'` instrument. The re-derive-at-close duty is preserved verbatim — only its
instrument changed.

**[⊕²⁵ 2026-08-03 · Φ3-close residual cure — THE MINTED RULE IS FENCED TO THREE NAMES.** The sentence
above mints a *general* homing rule; this row applied it to **three** names. It is hereby fenced to
exactly those three — `W-A11Y` → TR **#31** · `W-DOC-TRUTH` → TR **#61** · `W-PERF` → TR **#69** — and
to the 21 `REGISTRY.md` cells §1 re-pointed. **It is not a survey of `REGISTRY.md` and it certifies
nothing about any cell this row did not touch.** Measured at this cure, detectors stated so they
re-derive: `grep -c 'TR #' REGISTRY.md` → **24** lines carry a roster id ·
`grep '^|' REGISTRY.md | grep -E '\b(W|GF)-[A-Z0-9]' | grep -v 'TR #' | wc -l` → **92** table rows name
a wave and carry **no** roster id (`grep -oE '\b(W|GF)-[A-Z0-9-]+' REGISTRY.md | wc -l` → **139**
wave-name occurrences file-wide, which is why the Φ3-close adjudication's occurrence-level *~120* and
this row-level *92* are the same population read by two detectors — both stated, neither bare). The
rule is sound; its *application* is three names deep, and §5's class verdict is corrected accordingly.**]**

---

## 4 · THE DISCHARGE CLASS — every row closed with a citation

### 4a · A02 / A03 / A08 / A09 — the four standing-ask discharge rows

Ledger ids re-read at `docs/tranches/BJ/FEEDBACK-LEDGER.md` rows A02/A03/A08/A09 (cited by id, not by
line: that file is in the live dirty set and its line numbers moved during this seat). Dispositions
per the adjudicated arm ruling **C-A02/03/08/09 ADOPT** (`TERMINAL-ROSTER.arm-fable.md:119`), which
routes them to this accounting quartet:

| row | ask | discharge | citation |
|---|---|---|---|
| **A02** | iOS-27 videos, frame-by-frame with Fable | **DISCHARGED, id now cited** — delivered as the photometric archive; the "with Fable" clause is satisfied under the restored tri-fold law, re-bound by cursor ⊕¹⁵ | `docs/tranches/BJ/addenda/2026-07-24-refinement/IOS27-ARCHIVE.md` (290 lines) + CWT O-18/O-19/O-21; ECOUTE `:84` graded it PARTIAL **(uncited)** — the uncitedness is what this row cures |
| **A03** | aristotelian research → harden → tranche-write, twice critiqued | **DISCHARGED, id now cited** | `PROPORTION.md` + `LAYOUT.md` (the delivered substance); two adversarial critics recorded in `REDUCTION.md` §1; ECOUTE `:85` PARTIAL (uncited) |
| **A08** | acceleration; every wave ≥2 challenging + gestalt passes | **DISCHARGED — COVERED** by the sworn twice-challenged house rule, now hardened into the Challenge Law (≥2 quartet-of-Opus passes + fresh-Fable apotheosis per implemented wave) | ECOUTE `:86` COVERED → `W-PROCESS-CURE` = TR #11 (`:161`); the Challenge Law text at cursor ⊕¹¹ |
| **A09** | in-progress features get proper addenda, not ad-hoc patches | **DISCHARGED — COVERED, in tension, with the tension RULED** | ECOUTE `:87` + the C-11 contradiction at `ECOUTE.md:412`; ruled ADOPT-RULED at `TERMINAL-ROSTER.arm-fable.md:124` (G-DOC-BUDGET counts **retained** doc lines at close; discovery corpus archived per Law 5) — TR #11 owns stating it |

Nothing here is a new wave, a new gate, or a new ask. Four ledger rows that were true-in-substance and
uncited are now cited; TR #11 carries the two process clauses it already owned.

### 4b · A04 — discharged by TR §A.2

ECOUTE §1a listed "**A04 remainder** (parallelization design) — the archaeology landed; the
graph-design half has no owner." **DISCHARGED**: the graph-design half *is* `TERMINAL-ROSTER.md:244-272`
§A.2, the adjudicated DAG (Φ0→Φ6 with the parallel spines, the tier-3 collision ordering, and the
`∥`/`══` sequencing marks). Arm ruling **C-A04 ADOPT-DISCHARGED** at `TERMINAL-ROSTER.arm-fable.md:117`.
The §1a row is struck in place with this ground. A04 leaves TR #16's scope.

### 4c · The twelve CWT-3 §6 owner rows — closed with citations

Source: `COMPONENT-WAVES-TERMINAL-3.md` §6 "OWNER ROWS DISCHARGED" at `:1875-1882`. The section
discharges fifteen subjects; **twelve are FEEDBACK-LEDGER owner rows** (the other three — BD
batch3-D4, UF-A1, GF-§13 — are not ledger ids and are recorded below the table for completeness).
This row does not re-adjudicate any of them; it closes each with its citation so none is inherited as
open.

| # | row | close | citation |
|---|---|---|---|
| 1 | **F21** | CLOSED, verified | `:1877`; commit `19ea4ce1`, progress lane concurs |
| 2 | **F22** | producer half closes at progress execution | `:1877` — `Progress.vue:180` linear dies; landed gate `feedback-motion-tune.test.ts:40-45` amends in the same cut |
| 3 | **F24** | closes at display-atoms execution | `:1877` — mechanism swap (breathe, not clock retune); G4 makes "make it faster" fail |
| 4 | **F31** | DISCHARGED | `:1877` — easing lane; `items-start` proven inert, the real cure specced |
| 5 | **F23** | dedup substantially discharged | `:1877` — track seam + `rowClass` + register folds (the residual enlarged-view half is R-4-parked, §2 row 4) |
| 6 | **F04** | HONORED — two reduction questions RELAYED, not ruled | `:1877` — select's A05 command question; card's R-4-fenced breath |
| 7 | **F28** | ROUTED to W-FROST **with new hard constraints** | `:1878` — monotone-dilution law + the +40% transmission ceiling (+62% refused on arithmetic); rides TR #22 (`:172`) |
| 8 | **F48** | ROUTED with F28, same constraints | `:1878` + the standing **P0 mode-assertion** (a `safari-app` dark cell adjudicated as light, thrice-derived; every Safari material row re-owed) — TR #10 carries the assertion |
| 9 | **A01** | breath-of-life: every lane ships an interaction-engagement register | `:1880` — the batch's largest single affordance gain |
| 10 | **A11** | as A01; **all ten lanes honored the R-4 fence on the idle half** | `:1880` — consequence recorded: R-4 is the single highest-leverage owner sitting (7+ lanes hard-block on it) |
| 11 | **A10** | DISCHARGED per-lane | `:1881` — every tier-3 spec carries the superfluous-strike + insufficiency-add double list |
| 12 | **A16-adjacent** | the StatusDot MIGRATION rows (D1) written by display-atoms — the two-major silent-relay debt paid | `:1881`. **Note:** this does **not** close A16 itself (16 `DECISION: ____` blanks on disk, `G-BI-CARRY` RED) — A16 stays live at TR #16 |

Non-ledger discharges in the same section, recorded so they are not lost: **BD batch3-D4** ("buttons
more glassy, better hover") discharged in design by button §3.1/§3.6 · **UF-A1** record corrected
(unfixed at HEAD — the behaving arm was deleted; toggle-group's cut cures it) · **GF-§13** (progress
fill) discharged honestly with the ≥3:1 fence, T-FILL-1 pinning it — all at `:1879`. The section's
own **EXEC-STATE corrections owed** line (`:1882`: §7a Safari-stale strike ×5 lanes; the sixth-Ecoute
(d) census gains the §0e mode-confound method) is **routed to TR #61 W-DOC-TRUTH** — it is a doc-truth
edit to a binding doc, not an accounting act, and this row does not perform it.

### 4d · S4 / S7 / S8 — the three stage-2 landings routed to this quartet

Source: `TERMINAL-ROSTER.arm-fable.md:16`, `:19`, `:20` (each "ADOPT", routed to `#12-15` — the
accounting quartet TR later exploded into #12/#13/#14/#15 per SE-6).

| id | subject | landing |
|---|---|---|
| **S4** | keep-band / ≤60 / SHA-pin **compliance arithmetic pruned** | LANDED as a standing rule for this quartet: no accounting row re-derives the gate-budget or keep-band arithmetic — it cites `TERMINAL-ROSTER.md` §B.5 (budget exactly 60, movement law) and TR #65 (`W-GATE-COLLAPSE`). This record states **zero** gate counts of its own; seats +0 by construction |
| **S7** | stale-cell correction batch | LANDED in this row's §1/§2/§3: five stale cells corrected — ECOUTE's three "does not exist" wave cells, its "cited in no corpus file" (F23), and WAVES.md's "the list is empty". Each corrected at its own site with a falsifier, never by a global sweep (the doc-inflation disease ECOUTE §2 diagnoses) |
| **S8** | **no re-audit of the §2.3 RETIRE set** | LANDED as the fence this row obeyed: TR #36 and TR #37 were **not** re-opened, not re-argued, and not re-gated — they are cited as RETIRED at `TERMINAL-ROSTER.md:186`/`:187` and their numbers held so no citation dangles. Any future row that re-litigates them is in the anti-re-audit class (TR #11's fence) |

---

## 5 · THE PHANTOM CLASS AT ROSTER ROWS #68 / #69 / #78 / #89 — closed

TR #14 names four roster rows as carrying phantom repairs. Each is verified present on the roster
this seat; **this row records the closure, the owning row performs the act.**

| row | phantom class | repair, as the roster carries it |
|---|---|---|
| **#68** W-TOKEN-CANON (`TERMINAL-ROSTER.md:218`) | a **mis-cited line** — the spec pointer read `GREENFIELD-TERMINAL:212` | ⊕⁵ SE-7 corrected it to **`:213`**: `:212` is the `.sr-only` W-A11Y row; the `--section-color-*` token lane is `:213`. Classic phantom-by-citation; cured in the spec cell |
| **#69** W-PERF (`TERMINAL-ROSTER.md:219`) | a **wave with no body** — RECONCILIATION `:85` (§2 row 20, “Phantom wave owners”) names `W-PERF` among cites with no WAVES.md heading | ⊕⁵ SE-5 ruled the cites an **assignment triple, not a body**, and made the roster row itself the wave body (thesis = the A17 perf lens; the budget table the terminal material; `BAND-PERF.md` the pre-refinement substance bank). §1 above adds the second half: `BAND-PERF.md` is 660 lines on disk, so "no body" was false in both directions |
| **#78** W-DESIGN-CANON (`TERMINAL-ROSTER.md:228`) | a **minted-from-nothing wave** — GESTALT RANK 1 asked for a canon with no author | ⊕² flipped AUTHOR → **LAND** on ruling S-3 (`:55`): the body exists and was measured — `DESIGN.md` **907 lines** + `regen-design-canon.mjs` **288 lines**, 9 `CANON:BEGIN` blocks, committed at `e277ea42` under `docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/`. Its four gate-intents seat as **arms** of G-DOC-TRUTH, seats +0 (`:337`) |
| **#89** W-OVERLAY (`TERMINAL-ROSTER.md:239`) | **the one unowned spec** — VERDICT blocker 4 | ⊕² SEATED on `CURES.md` §2 as the spec of record; blocker 4 falls. Φ6→**Φ5** correction is itself a phantom-class repair (the prior Φ6 cell contradicted §A.2 internally; K-9, and TR #61 carries the record) |

**Class verdict.** Four distinct phantom mechanisms — mis-cited line (#68), assignment-mistaken-for-body
(#69), unauthored-mint (#78), unowned-spec (#89) — all resolved **on the roster**, none by minting a
wave. Together with #36/#37 (retired-in-place, numbers held) and §1's three re-points, ~~the phantom
class for BJ→BK is closed~~ **[⊕²⁵ 2026-08-03 · Φ3-close residual cure: STRUCK AS AN OVERCLAIM — the
claim was falsified by this row's own instrument. Restated honestly below.]** The one durable rule this
row leaves behind: **a wave exists when a roster row seats it, never when a grep finds a heading.**

**The honest class statement, ⊕²⁵ 2026-08-03.** What is closed is the **named** phantom set: the four
roster rows above (#68 · #69 · #78 · #89), the two retired-in-place (#36 · #37), and §1's three
re-points (`W-A11Y` · `W-DOC-TRUTH` · `W-PERF`). What is **not** closed is `REGISTRY.md`'s remaining
homing surface: **24** lines carry a `TR #` roster id against **92** table rows that name a wave and
carry none (detectors at §3's fence bracket). Under this row's own minted rule those 92 rows are
**unhomed**, and at least six of the names they cite were superseded or renamed by the roster itself,
so re-pointing them is not cosmetic — a reader following the cell lands on a dead name:

| REGISTRY cites | × | the roster's live successor | ground |
|---|---|---|---|
| `W-AURORA-MEDIUM` | 4 | **#49 GF-AURORA** | `WAVES.md:428` **explicitly superseded** (TR §A preamble, `TERMINAL-ROSTER.md:147`) |
| `W-HANDMARK` | 1 | **#51 GF-HANDMARK W0-W5** | `WAVES.md:668` explicitly superseded, same line |
| `W-DOCK` | 3 | **#47 GF-DOCK W1-W9** | `TERMINAL-ROSTER.md` §A row #47 |
| `W-DOCK-OVERFLOW` | 2 | **#47** (the overflow grammar is GF-DOCK's W3) | §A row #47's own cell |
| `W-TIMELINE` | 2 | **#46 GF-TIMELINE** | §A row #46 |
| `W-REFRACT-LATCH` | 2 | **#2 W-REFRACT-DELETE** — and the *subject* is DELETE, not a rename | §A row #2: *"W-REFRACT-DELETE (was W-REFRACT-LATCH)"* |

The three largest name-only cohorts are unaffected by supersession and are live rows under other names
— `W-GATE-TRUTH` ×17 (**#9**) · `W-PROCESS-CURE` ×11 (**#11**) · `W-PKG-TRUTH` ×9 (**#8**) — so the
re-point is mechanical, not adjudicative, for the bulk of it.

**ROUTED — named residue, not a note:** the **full `REGISTRY.md` disposition-cell re-point** (all
remaining wave-name-only cells → roster ids, with the six superseded names re-pointed at their
successors and `W-REFRACT-LATCH`'s cells additionally marked *subject deleted at #2*) is routed to
**TR §A row #61 `W-DOC-TRUTH`**, the roster-surgery row that already carries this row's sibling strike
lists (the §B.4 SUPERSEDED-banner row, ⊕⁴ U-42, and #16's R-2/R-4/R-5). It is one mechanical pass over
one file; it mints no wave, no gate and no seat. Until it lands, **this row's rule is fenced to three
names and the class is OPEN by count** — which is the statement §5 should have made.

---

## 6 · CODEX-ERA RECORD CHECK (⊕¹¹–⊕¹⁸)

Required by the ⊕ rulings; performed, and it is short.

- **Census.** `0/87 codex-delta seals stand — all VOID` (cursor ⊕¹², restated ⊕¹⁴ **on QUALITY grounds
  alone**, the forgery characterization WITHDRAWN by owner word ⊕¹⁴). This row **cites no seal**, quotes
  no seal-derived figure, and mints none.
- **Ownership.** Claude Code owns BK (⊕¹⁸). This seat is an Opus fanout lane under the Fable lead, per
  the model law re-affirmed at ⊕¹⁵.
- **Codex-era artifacts in this row's scope: none.** The four files touched — `REGISTRY.md`,
  `ECOUTE.md`, `WAVES.md` (all `docs/tranches/BJ/addenda/2026-07-24-refinement/`) — carry no codex
  delta; their content predates `ce41396c..04fdfe91` and none was a seal subject in
  `REPO-AUDIT-ADJUDICATIONS.json` clusters A–F.
- **The graph-v3 arc FALLS** (`APOTHEOSIS.md` cluster C, "FALLS ENTIRE"). **No dependency here.** This
  row's ownership instrument is the roster id column, not any import graph; nothing in §1–§5 cites
  `IMPORT-DAG-V3.json`, `build-import-dag-v3.mjs`, `tests/architecture/`, or the ROW5-PERFORMANCE
  artifacts. Graph questions return to TR #21 at Φ5 per the ratified cure order §1 — untouched by this
  row.
- **Detector abstinence.** Per ⊕¹³ᵃ, no code-side gate-register figure is quoted anywhere above; the
  destroyed detector (`scripts/verify-governed-invariants.mjs`) is TR #9/#65's recovery act, not this
  row's.

---

## 7 · FILES WRITTEN + RESIDUE

**Edited (doc-side, in place, all under `docs/tranches/`):**

1. `docs/tranches/BJ/addenda/2026-07-24-refinement/REGISTRY.md` — header ⊕ RE-POINT note + 21
   disposition cells now carrying `(TR #31)` / `(TR #61)` / `(TR #69)`.
2. `docs/tranches/BJ/addenda/2026-07-24-refinement/ECOUTE.md` — §1a strike preamble; five §1a rows
   struck-in-place with falsifiers (F11 · F13 · F23 · F29 · the three-wave row) and A04-remainder
   marked DISCHARGED; the §1a closing paragraph amended; §3 `W-ORPHAN-ROWS` scope line reduced;
   `G-ROW-HOMED` RED condition reduced to F25 + the collision clause; two §3 headings and the `:374`
   instrument line corrected.
3. `docs/tranches/BJ/addenda/2026-07-24-refinement/WAVES.md` — the false closing sentence struck and
   replaced with the TR-id ownership rule (`:909`).
4. `docs/tranches/BK/execution/2026-08-03-row14-phantom-repair/PHANTOM-REPAIR.md` — this record.

**Not touched, deliberately:** `TERMINAL-ROSTER.md` (spec of record — a row does not edit its own
spec) · `RECONCILIATION.md` (the ground; cited, never restated) · `FEEDBACK-LEDGER.md` (live dirty
set, and TR #15 PROVENANCE owns its citations) · `EXECUTION-PROGRESS.md` (concurrent lanes; see the
handoff line below) · every other row's files.

**Handoff line for the cursor (TR #14 row), proposed verbatim, to be applied by the batch closer so
concurrent lanes are not clobbered:**

> `| 14 | PHANTOM-REPAIR ⊕⁵ | Φ3 | LANDED (doc-side; spec_state=sealed, code_state=n/a — doc-only row, evidence_state=adjudicated: record at docs/tranches/BK/execution/2026-08-03-row14-phantom-repair/PHANTOM-REPAIR.md) | TR#14 → RECONCILIATION §8-11 | —(REGISTRY 21 cells re-pointed at TR #31/#61/#69 · 6 ECOUTE false gaps struck · WAVES.md:909 corrected · discharge class closed: A02/A03/A08/A09 · A04 by §A.2 · the 12 CWT-3 §6 rows · S4/S7/S8 · phantom rosters #68/#69/#78/#89) |`

**Residue, stated honestly:**

- **R-14A · the full `REGISTRY.md` disposition-cell re-point → TR §A row #61 `W-DOC-TRUTH`**
  (⊕²⁵ 2026-08-03, Φ3-close residual cure). 24 lines carry a `TR #` id; **92** table rows name a wave
  and carry none; six of those names the roster superseded or renamed (`W-AURORA-MEDIUM`→#49 ·
  `W-HANDMARK`→#51 · `W-DOCK`→#47 · `W-DOCK-OVERFLOW`→#47 · `W-TIMELINE`→#46 · `W-REFRACT-LATCH`→#2,
  *subject deleted*). Table, detectors and grounds at §5. This row's minted homing rule is **fenced to
  its three repaired names** (§3 bracket) until that pass lands; §5's former "class closed" sentence is
  struck as an overclaim.
- The four edited files are **untracked-as-modified** at this seat; this row never commits (hard wall).
  A committing seat must carry all four in one cut or the ⊕ notes cite each other across a boundary.
- `ECOUTE.md`'s internal line numbers shifted by the strike preamble (+12 lines before §1a). The three
  cross-file citations that pointed into ECOUTE were re-pinned this seat (`:137`, `:139`, `:374`); any
  *other* file citing ECOUTE by line below `:109` is unaffected, above it is +12. No such citation was
  found in `TERMINAL-ROSTER.md` (it cites ECOUTE by §, not by line).
- `FEEDBACK-LEDGER.md` moved on disk **during** this seat (A02 read at `:69` then at `:90`), which is
  why §4a cites it by row id only. A concurrent lane owns it.
- TR #16 `W-ORPHAN-ROWS` must re-read `ECOUTE.md` §3 **after** this strike, not before — that is TR
  #16's own stated precondition, now satisfiable.
