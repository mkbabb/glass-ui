# BK ROW #15 · PROVENANCE — the register of record

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`) · seat: BK row #15, sole owner ·
executed 2026-08-03, doc-side only, HEAD `aee47957` · zero repo bytes outside `docs/tranches/`.

Spec of record: `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:165` (row #15) →
`RECONCILIATION.md` §8-12. The row's own words: *"cite `AY/audit/USER-AUDIT-2026-06-10.md` +
`BD/viz/refine/USER-FEEDBACK-2026-06-23*.md` in the feedback ledger and at #49/#50, so each ask's age
is visible and the target is the owner's words; G-PROVENANCE the seat (shared, no mint)."*
Ruling ledger consumed: `docs/tranches/BK/EXECUTION-PROGRESS.md` ⊕¹¹–⊕¹⁸ (census restated **0/87**,
every codex delta seal VOID on quality grounds, the "forgery" characterization WITHDRAWN at ⊕¹⁴,
Claude Code owns BK at ⊕¹⁸). Batch map: `EXECUTION-DAG-2026-08-03.md` BATCH 3, row #15 scope
"G-PROVENANCE (≡CITE-COMMITTED+STAMP-EMITTED); date every feedback ask".

---

## §1 · THE CORPORA — three sittings, four files, all committed

| corpus | path | last commit | subject scope |
|---|---|---|---|
| **AY live audit** (2026-06-10 00:16–00:37) | `docs/tranches/AY/audit/USER-AUDIT-2026-06-10.md` | `87c2d384` 2026-06-10 | §A slides A1-A12 · **§B glass-ui B1-B22** · §C cross-cutting C1-C3 |
| **BD refine batch 1** (2026-06-23) | `docs/tranches/BD/viz/refine/USER-FEEDBACK-2026-06-23.md` | `987e7a42` 2026-06-25 | items 1-6 (gray glass · deck goo-morph · liquid-reveal · select · toggle-chip · padding) |
| **BD refine batch 2** (2026-06-23) | `docs/tranches/BD/viz/refine/USER-FEEDBACK-2026-06-23-batch2.md` | `987e7a42` 2026-06-25 | §A nav docks A1-A7 · §B toggle/glass/chrome B1-B5 · §C viz bugs C1-C6 · §D backgrounds D1-D3 |
| **BD refine batch 3** (2026-06-23) | `docs/tranches/BD/viz/refine/USER-FEEDBACK-2026-06-23-batch3.md` | `987e7a42` 2026-06-25 | §A liquid dock A1-A13 · §B global animation law B1-B2 · §C goo/carousel/deck C1-C3 · §D chrome D1-D4 |
| **BJ corpus** (2026-07-17) | `docs/tranches/BJ/FEEDBACK-LEDGER.md` | `ea920e5d` 2026-07-28 | F01-F50 · A01-A17 · CFR-01 |

All five paths are git-tracked at HEAD (`git log -1 -- <path>` returns a commit for each), so
G-CITE-COMMITTED's committed-anchor clause holds for the corpora themselves. One anchor fails it —
see §5 F-1.

**THE AGE LADDER** (days elapsed, to the BJ sitting and to this seat):

| first asked | → BJ sitting 2026-07-17 | → this seat 2026-08-03 |
|---|---|---|
| 2026-06-10 (AY) | 37 d | **54 d** |
| 2026-06-23 (BD ×3) | 24 d | **41 d** |
| 2026-07-17 (BJ) | 0 d | **17 d** |

An ask carried at 54 days across three sittings is not a new ask; it is a restated one. That is the
whole point of this row: the roster reads the owner's oldest words as its target, not the newest
paraphrase of them.

---

## §2 · THE LINEAGE TABLE — every BJ ask dated

Linkage rule stated so it is falsifiable: a BJ row is linked to an antecedent when the two texts name
the **same subject** (component, surface, or law), judged at this seat against the verbatim cells,
and the antecedent is cited by file item-id. Where no antecedent names the subject, the row is
**BJ-native** and its age is 17 d. The verbatim owner words live at the cited files; they are cited
here, never restated (one-source law).

**`n` — the SITTING-DATE detector, applied uniformly.** `n` = the count of distinct **sitting dates**
in which the subject appears, BJ inclusive. §1's corpus has exactly three sittings — **2026-06-10
(AY)** · **2026-06-23 (BD)** · **2026-07-17 (BJ)** — therefore **`n` ∈ {1,2,3}, and `n`=4 is
impossible**: the three BD batch files are *one* sitting delivered in three files, and two item-ids
inside one file are still one sitting. `n` counts sittings — never files, never item-ids.

**⊕ 2026-08-03 (Φ3 doc-cure):** the column was authored under a mixed detector, some cells counting
item-ids or files, which put three rows at an unreachable `n`=4. Corrected in place under the uniform
detector above: **F33 3→2 · F47 4→3 · F48 4→3 · A12 4→3 · A14 3→2 · CFR-01 3→2.** No first-asked
date, no age, and none of the three date-counts below moves — only `n` does.

| BJ row | subject | antecedent(s) | first asked | age (08-03) | n |
|---|---|---|---|---|---|
| F01 | preview cards expressive/sized; partial-load stutter | BD-b2 B5 (card width/alignment) | 06-23 | 41 d | 2 |
| F02 | `/foundations` cards blank white | — | 07-17 | 17 d | 1 |
| F03 | "most of this is worthless" + parsimony edict | — | 07-17 | 17 d | 1 |
| F04 | shape abrogated; opinionated defaults; grand audit | — | 07-17 | 17 d | 1 |
| F05 | animation shifts screen; no background aurora | AY B22 · BD-b2 D1 | 06-10 | 54 d | 3 |
| F06 | dock page transitions broken/slow/flash | AY B1/B15 · BD-b2 A7 (FOUC) | 06-10 | 54 d | 3 |
| F07 | story-page transitions ill-defined | BD-b3 D2 | 06-23 | 41 d | 2 |
| F08 | aurora presets duplicative — reduce dramatically | AY B21 (keep crayon/speedtest/sky/dawn) | 06-10 | 54 d | 2 |
| F09 | over-rounded container; configurator too cramped | AY B21 (configurator god-awful) | 06-10 | 54 d | 2 |
| F10 | section design hierarchy | AY B11 · BD-b3 D2 | 06-10 | 54 d | 3 |
| F11 | no gap between items | BD-b1 #6 (padding awful) | 06-23 | 41 d | 2 |
| F12 | tags-input containers unrounded | BD-b2 B2 | 06-23 | 41 d | 2 |
| F13 | sortable-list design + horizontal space | — | 07-17 | 17 d | 1 |
| F14 | horizontal desktop + mobile-first audit, all pages | — | 07-17 | 17 d | 1 |
| F15 | reset button unrounded; rounding + typography audit | BD-b2 B2 · BD-b3 D1 (corner aliasing) | 06-23 | 41 d | 2 |
| F16 | timeline poorly defined — redesign ground-up | — | 07-17 | 17 d | 1 |
| F17 | search inputs unrounded | BD-b2 B2 | 06-23 | 41 d | 2 |
| F18 | instrument-chassis + metric REMOVED | AY B17 (question the components' point; W-PRUNE) | 06-10 | 54 d | 2 |
| F19 | alert not glassy/rounded/idiomatic | BD-b1 #1 (gray glass) | 06-23 | 41 d | 2 |
| F20 | toast animation awful | BD-b3 B1 (global animation law) | 06-23 | 41 d | 2 |
| F21 | scroll-progress rim broken | — | 07-17 | 17 d | 1 |
| F22 | progress loop jittery, mis-eased | BD-b3 B1 | 06-23 | 41 d | 2 |
| F23 | slider/progress dedup; enlarged slider; gradiated blur | AY B3 (slider still not right) · AY B14 | 06-10 | 54 d | 2 |
| F24 | skeleton animation too slow | BD-b3 B1 | 06-23 | 41 d | 2 |
| F25 | confirm-dialog vs dialog | AY B17 (prune class) | 06-10 | 54 d | 2 |
| F26 | completion-seal overfit → speedtest | AY B17 | 06-10 | 54 d | 2 |
| F27 | dock scrolls vertically | AY B1/B5 · BD-b2 A6 | 06-10 | 54 d | 3 |
| F28 | blur inconsistency | BD-b3 A4 (dock blur far too extreme) | 06-23 | 41 d | 2 |
| F29 | `/motion/springs` redesign + configurator | AY B21 | 06-10 | 54 d | 2 |
| F30 | `/motion/tempo` — "what even is" | AY B17 (prune class) | 06-10 | 54 d | 2 |
| F31 | curve-gallery padding; modularize easing curve | BD-b1 #6 | 06-23 | 41 d | 2 |
| F32 | reveal vs the other scrolling components | AY B17 (prune class) | 06-10 | 54 d | 2 |
| F33 | deck vs carousel — collapse; dot animations refined | **BD-b1 #2** (deck too fast/small/subtle) · **BD-b3 C2** (same substrate, de-duplicate) | 06-23 | 41 d | 2 |
| F34-F40 | handmark: awful · not pen-like · broken · disjointed · greenfield · layering · meta-text | — | 07-17 | 17 d | 1 |
| F41 | text-motion npm-install block | — | 07-17 | 17 d | 1 |
| F42 | `/motion/scroll` vs the others | AY B17 (prune class) | 06-10 | 54 d | 2 |
| F43 | auth-shell putrid colors; own category | — | 07-17 | 17 d | 1 |
| F44 | `/compositions/settings` overfit | AY B17 | 06-10 | 54 d | 2 |
| F45 | gate-pattern rounding; prune compositions | AY B17 · BD-b2 B2 | 06-10 | 54 d | 3 |
| F46 | intro double-card, blank, slow | AY B22 (full-bleed, no sub-container) | 06-10 | 54 d | 2 |
| F47 | **dock UX greenfield again** — scroll affordance, auto-scroll to occluded | **AY B1/B2/B4/B5/B8/B9/B15** · **BD-b2 A1-A7** · **BD-b3 A1-A13** | 06-10 | **54 d** | **3** |
| F48 | hierarchy/blur/rounding app+framework wide; blur subtler | AY B11 · BD-b1 #1 · BD-b3 A4 | 06-10 | 54 d | 3 |
| F49 | OpenAI popup — subtle blurring reference | BD-b3 A4 | 06-23 | 41 d | 2 |
| F50 | gradient blur behind popovers/modals | — | 07-17 | 17 d | 1 |
| A01 | engagement affordance edict; slider modal/grow variants | AY B3 · BD-b3 B1 | 06-10 | 54 d | 3 |
| A02 | iOS-27 footage, frame-by-frame with Fable | BD-b3 B2 (ScreenRecording_06-22 frame-by-frame) | 06-23 | 41 d | 2 |
| A03 | aristotelian-proportion research triumvirate | — | 07-17 | 17 d | 1 |
| A04 | tranche archaeology (BI emphasis) | — | 07-17 | 17 d | 1 |
| A05 | component DAG + ruthless reduction | AY B17 / W-PRUNE | 06-10 | 54 d | 2 |
| A06 | story meta-framework, page variants | BD-b2 B5 · BD-b3 D2 | 06-23 | 41 d | 2 |
| A07 | colocation grand edict | — | 07-17 | 17 d | 1 |
| A08 | implementation acceleration; ≥2 challenge passes | — | 07-17 | 17 d | 1 |
| A09 | addenda not ad-hoc patches | — | 07-17 | 17 d | 1 |
| A10 | aristotelian proportion audit of UI | — | 07-17 | 17 d | 1 |
| A11 | "what of our breath of life" | BD-b3 B1 | 06-23 | 41 d | 2 |
| A12 | **blob greenfield** — old value.js, cartoon shadow, metaballing, emotional states | **AY B10** (largely broken, pixelated, no goo/satellites, rebuild from first principles) · **AY B18** · **BD-b2 C1** (totally broken; ghost dashed outline) | 06-10 | **54 d** | **3** |
| A13 | **aurora modes** — van Gogh, oil pastel, crayon | **AY B20** (van-Gogh awful + laggy, rebuild) · **AY B21** (crayon too oily; oils laggy) · **AY B19** (preview black bar) · BD-b2 D1 | 06-10 | **54 d** | **3** |
| A14 | procedural components codified (umbrella over A12/A13) | AY B10/B20 | 06-10 | 54 d | 2 |
| A15 | Fable-class models for the grand audit | — | 07-17 | 17 d | 1 |
| A16 | maximal parallelization; nothing dropped | — | 07-17 | 17 d | 1 |
| A17 | slow-load/stutter class as a first-class perf lens | BD-b2 A7 (FOUC) | 06-23 | 41 d | 2 |
| CFR-01 | metric family shape (grid → card, never pill) | AY B17 · BJ F18 | 06-10 | 54 d | 2 |

**Counts** (this table's own arithmetic, detector = the rows above; 68 asks in 62 table lines, the
seven handmark rows F34-F40 grouped on one line because they are one subject): **25 BJ-native**
(17 d) · **18** first asked 06-23 (41 d) · **25** first asked 06-10 (54 d). **Ten asks sit at the
detector's ceiling, n=3** — F05, F06, F10, F27, F45, F47, F48, A01, A12, A13: every one of them
carried by all three sittings, which is as often as an ask can be restated in this corpus. There is
no n=4 and there cannot be one (§2's detector). *(⊕ 2026-08-03: this sentence read "thirteen asks
carry n≥3 … of which F47 · F48 · A12 sit at n=4"; F33, A14, and CFR-01 fall to n=2 and the three
n=4 cells fall to n=3 under the uniform detector. The 25/18/25 date-counts are unaffected — they read
first-asked dates, not sittings.)*

**The dock, the blob, and the aurora are the oldest live asks in the tranche.** Their roster rows are
#47 (GF-DOCK), #50 (GF-BLOB), #49 (GF-AURORA). Nothing in this register moves their state; it makes
their age visible, which is what the row asked for.

---

## §3 · THE #49 / #50 CITATIONS

The row names two roster rows specifically. Their provenance clauses are authored here and applied
in place at `TERMINAL-ROSTER.md:199-200`, one sentence each, citing this register.

**#49 GF-AURORA** — the owner's words on aurora predate BJ by 37 days:
`AY/audit/USER-AUDIT-2026-06-10.md` **B20** (the van-Gogh medium AWFUL and "super laggy" — rebuild
from first principles with procedural generative brush strokes) · **B21** (the configurator
god-awful; KEEP crayon/speedtest/sky/dawn; the oils insanely laggy) · **B19** (preview panes crop a
black bar) → `BD/viz/refine/USER-FEEDBACK-2026-06-23-batch2.md` **D1** (per-page custom aurora
instead of constellation) → BJ **A13** + **F08** + **F05**. First asked **2026-06-10, 54 days old at
this seat, three sittings.** The BJ-era phrasing ("a PROPER van-Gogh mode, a proper oil-pastel brush
mode") restates B20/B21 — the target is the 06-10 words, and B21's named keep-set is the owner's own
preset ruling, senior to any later reduction table.

**#50 GF-BLOB** — the oldest greenfield ask on the roster:
`AY/audit/USER-AUDIT-2026-06-10.md` **B10** (`/substrates/blob` largely broken — pixelated, no
goo/satellite effects, "inferior to many tranches ago"; **rebuild from first principles per the old
screenshots**) · **B18** (the empty-states blob reads better than the others; one blob identity,
mascot scales down) → `BD/viz/refine/USER-FEEDBACK-2026-06-23-batch2.md` **C1** ("totally broken";
the dashed outline does not follow the proper path) → BJ **A12** (look to the OLD value.js
implementation — cartoon shadow, proper metaballing, emotional states, high dynamic interactivity).
First asked **2026-06-10, 54 days old at this seat, three sittings** — all three the corpus has, which
is what makes it the oldest continuously-restated ask on the roster *(⊕ 2026-08-03: read "four
sittings"; corrected under §2's sitting-date detector, which admits no fourth sitting)*. Two provenance facts bind the
wave: (a) the owner's reference target is a **historical** implementation plus the old captures, not
a fresh invention — the DESIGN-NOW §blob-physics spec of record is the terminal design and inherits
that target; (b) "rebuild from first principles" is the owner's phrase from 06-10, twice re-earned,
which is why #50 is a greenfield row and not a patch row.

Neither clause moves a state, a gate, or a Φ. Rows stay 91; gate seats +0.

---

## §4 · G-PROVENANCE — the seat, armed

`TERMINAL-ROSTER.md:357` seats **G-PROVENANCE (≡ G-CITE-COMMITTED + G-STAMP-EMITTED)** in the PROCESS
family, 2 seats. Shared seat, no mint — this row adds nothing to the budget (60 allocated, unchanged;
the code-side register figure stays unquotable until the ⊕¹³ᵃ detector recovery, and this row quotes
none).

Arming form for the provenance half, stated so it is checkable by grep and by `git log`:

1. **Every ask carries a date.** Each row of `FEEDBACK-LEDGER.md` resolves through §2 above to a
   first-asked date and a corpus item-id. RED if a ledger row has no §2 line.
2. **Every citation resolves to a committed path.** Each path cited by the ledger and by §1/§3 exists
   at HEAD and returns a commit from `git log -1 -- <path>`. Detector:
   `grep -oE '`[^`]*\.(md|png|json)`' docs/tranches/BJ/FEEDBACK-LEDGER.md` → resolve each against
   `git ls-files`. Currently **RED at 1 of 32** (§5 F-1).
3. **The target is the owner's words.** A wave whose ask has an antecedent cites the antecedent's
   file+item, never a later paraphrase of it. Applied at #49/#50 by §3; the general duty rides
   G-CITE-COMMITTED's forward-closure form (per #4's ruling, current/forward only, never retroactive
   history repair).

Not armed here: G-STAMP-EMITTED's half (emitted-artifact stamping), which is #9/#65 apparatus and
carries the ⊕¹³ᵃ standing block.

---

## §5 · FINDINGS — with owners

**F-1 · one cited anchor is uncommitted.** `docs/tranches/BJ/feedback/F19-metric-badge-overround-grid.png`
is cited by ledger row CFR-01 and exists on disk, but is **not tracked**: `git ls-files
docs/tranches/BJ/feedback/` returns **30** entries against **31** files on disk, and that PNG is the
delta. It is invisible to `git status` under the standing global `*.png` ignore (⊕¹³ᵇ), so no census
catches it — the other 30 were force-added. A citation that no clone can resolve fails
G-CITE-COMMITTED. **Owner: the png/jpg force-track carve-out is a #4/#16 call** (EXECUTION-DAG,
BATCH-1 note); this row records the breach and names it, and adds no git act (row #15 is doc-side).

**F-2 · the ledger's demo port is stale.** `FEEDBACK-LEDGER.md` states the demo runs at
`http://127.0.0.1:5199`; the ruled port is **5400** (TR#4, landed at `74c59ade`). The row-4 line
explicitly owns "the `demo:serve --port 5199`→5400 line"; this row does not edit that sentence,
records it here, and the ledger's new §PROVENANCE block points at the correction rather than
restating it. **Owner: #4.**

**F-3 · no codex-era provenance record exists to correct.** Row #15 appears in no seal, receipt, or
claim in the codex corpus; the 0/87-VOID census (⊕¹²/⊕¹⁴) therefore invalidates nothing this row
inherits, and the graph-v3 arc (APOTHEOSIS cure §1, questions returned to #21) touches no provenance
artifact. Stated because the absence is a finding, not a silence.
*(⊕ 2026-08-03, Φ3 doc-cure: this finding used to open "Row #15 is UNSTARTED at
`EXECUTION-PROGRESS.md:258`" — a **self-referential** cite. That cell was the row's own **pre-edit**
state, and §6 item 4 records this very row flipping it; the finding cannot rest on a line it is about
to rewrite. The UNSTARTED read is retired as pre-edit state; the finding stands on the codex-corpus
absence alone, which no edit of this row's own cursor cell can touch.)*

**F-4 · one ledger anchor class is URL-only.** Rows F02/F06/F07/F13/F14/F16/F18/F19/F20/F23/F24/F25/
F26/F29/F30/F32/F33/F42/F44 carry a route, not a screenshot. That is the ledger's own declared class
("URL-anchored verdicts"), not a provenance gap; recorded so a later reader does not re-open it.

---

## §6 · WHAT THIS ROW WROTE

1. This register (the one source for the lineage table; nothing here is duplicated elsewhere).
2. `docs/tranches/BJ/FEEDBACK-LEDGER.md` — a §PROVENANCE block naming the three corpora, the age
   ladder, and this register as the per-row source. No F/A row text is altered; the owner's words
   stay byte-identical.
3. `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:199-200` — one provenance
   clause appended to row #49 and row #50 each, per §3.
4. `docs/tranches/BK/EXECUTION-PROGRESS.md` — row #15's cursor line moved UNSTARTED → LANDED
   (doc-side), evidence pointer to this register.

Rows 91 · gate seats +0 · budget 60 · no Φ movement · no code state touched.
