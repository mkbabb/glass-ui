# BD CHALLENGE-2 — iteration-3 re-challenge (3 lenses)

CHALLENGE-2. PLANNING ONLY.",
  "agentCount": 6,
  "logs": [
    "BD iteration 3: hardening the CHALLENGE-1 MAJORs (sequential, disjoint domains)",
    "harden 1/3 (roster+cut) done",
    "harden 2/3 (seed-coherence) done",
    "harden 3/3 (viz-fence) done",
    "Rechallenge complete: 3 lenses"
  ],
  "result": {
    "hardened": [
      true,
      true,
      true
    ],
    "rechallenges": [
      "I have complete evidence. `page-band` is NOT in `REQUIRED_SURFACES` (it's an extra row the roster carries — G6 allows extras), but `glass-feedback` IS required. The aggregate-mapping is sound: `page-band` exists as a roster row (extra), `shell`/`glass-feedback` are required rows. So MAJOR-4's roster home is real.

Let me note one subtle point: the band-4/5 waves map demo panes to `page-band` (an EXTRA, not REQUIRED). That works because the roster row exists and the freshness record enumerates the demo-SFC paths. The mapping is enforceable. Good.

I now have everything needed. Let me compile the structured adversarial re-challenge report.

---

# BD CHALLENGE-2 — COMPLETENESS RE-CHALLENGE (2nd round)

**Scope:** Re-read the BD corpus (SEED, CANDIDATE-WAVES, FOLD-LEDGER, 44 wave files, the new BD.W-GESTALT-ROSTER-GROW) against the 4 CHALLENGE-1 completeness MAJORs. Verdict up front: **the harden was substantive but INCOMPLETE — 2 of the 4 CHALLENGE-1 MAJORs are fully hardened, 1 is half-hardened (the phantom survives in 3 sites), and the harden INTRODUCED 1 new MAJOR (the roster-grow wave is itself unrostered). 2 MAJORs remain.**

## What the harden GENUINELY fixed (verified clean)

- **CHALLENGE-1 MAJOR-1 (roster-grow gap) — HARDENED.** `BD.W-GESTALT-ROSTER-GROW.md` is a real, rigorous BUILD spec: mints `docs/tranches/BD/audit/reflect/bd-gestalt-roster.md` + the 16 per-surface BD freshness records, re-points the 4 gate consts (`REFLECT_DIR`/`ROSTER`/`WAVES_DIR`/`TRANCHE_DIR` `:70-73`) BC→BD, re-labels G6 BC→BD, born-RED→GREEN with a re-point self-test, and keeps the closed BC record read-only. The gate is still BC-frozen on disk (`proof-ba-gestalt.mjs:70-73` = `docs/tranches/BC/…`), correct for a planning spec. This genuinely cures the "BB roster-never-grew" disease one tranche on.
- **CHALLENGE-1 MAJOR-4 (per-pane overclaim) — HARDENED.** All 11 band-4/5 + W-PAGE-HEADER-FOLD waves were re-threaded to map each per-pane verdict to a REAL aggregate roster surface, explicitly disclaiming "an invented per-file row the gate's REQUIRED_SURFACES has no slot for": page folds→`page-band` (BC roster `:105`, an extra row — G6 allows extras), ToC→`shell` (`:94`, REQUIRED), glass buttons→`glass-feedback` (`:93`, REQUIRED). All three aggregate homes exist on disk. Enforcement is real (freshness-record `surface-paths` drift → G7 auto-revoke).
- **CHALLENGE-1 MAJOR-2 (W-CUT 8-vs-13) — HARDENED.** W-CUT now says "13-surface acceptance roster" at `:17,56,60` with the explicit "8 BA + 5 BC surfaces the REQUIRED_SURFACES array enumerates" framing. The "8-surface acceptance roster" language is gone.

## REMAINING MAJORs (CHALLENGE-1 ones NOT fully hardened)

### MAJOR-A — The content-hash phantom (CHALLENGE-1 MAJOR-3) survives in 3 sites; only SEED + CANDIDATE were reconciled
The harden fixed `SEED.md:16,33` (now: "There is NO content-hash to re-snapshot") and `CANDIDATE-WAVES.md:14,18` (now: "Do NOT introduce a content-hash re-snapshot step — it does not exist"), AND the wave-spec `BD.W-ARIA-ORIENTATION-GUARD.md:39-47,100-102` is fully correct. **But 3 sites still assert the phantom**, now in DIRECT contradiction to the rest of the corpus:
- **`BD.W-CUT.md:32`** — "the BC.W-TABS-IOS T4 content-hash re-snapshot landed in lockstep."
- **`BD.W-CUT.md:51`** (CUT5 gate clause) — "the `SegmentedTabs.vue` guard is in the published dist; the BC.W-TABS-IOS T4 content-hash re-snapshot landed." This bakes the phantom into a CLOSE GATE CLAUSE.
- **`FOLD-LEDGER.md:57`** — the standalone Class-E row "BC.W-TABS-IOS T4 content-hash re-snapshot → BD.W-ARIA-ORIENTATION-GUARD (lockstep arm)" with the FALSE rationale "The one-byte SFC change rebakes the T4 hash — re-snapshot in lockstep … or the byte-fence reds the next battery."

This is worse than CHALLENGE-1: it's now an intra-corpus contradiction where the SEED/CANDIDATE/wave-spec layer explicitly refutes the W-CUT/FOLD-LEDGER layer. CHALLENGE-1's harden-demand (b) was "delete the FOLD-LEDGER:57 row" and it was NOT done. Verified disk truth: `grep createHash|content-hash|sha256 scripts/proof-tabs-ios.mjs` = ZERO. **Harden:** drop the content-hash clause from W-CUT:32, fix CUT5:51 to name only the ARIA SFC publish (no hash), and replace FOLD-LEDGER:57's WHAT+rationale with the real lockstep arm (the `KF-BC.md:41,132` DOC reconcile).

### MAJOR-B — The 28-vs-37 page-header count drift survives in FOLD-LEDGER + CANDIDATE Rationale (partial harden of the parallel-lens MAJOR-2)
SEED:54 (37), CANDIDATE:121-123 (37), and the wave-spec (37, disk-verified `grep section-label--tinted text-admin-label demo/stories/` = 37) were corrected. But:
- **`FOLD-LEDGER.md:64`** still says "28-file hand-rolled page-identity header paste."
- **`CANDIDATE-WAVES.md:124`** (Rationale) still says "The 28 page-identity headers ARE the 42nd paste."

A 28-vs-37 internal contradiction persists — the exact count-drift class BD.W-DOC-COUNT-SYNC exists to kill, in BD's own ledger. The FOLD-LEDGER `what` field is the row a future `proof:bd-fold-ledger` will lift into the JSON, so the wrong count ships into the machine ledger. **Harden:** re-sync FOLD-LEDGER:64 + CANDIDATE:124 to 37.

## NEW MAJOR (introduced by the harden)

### MAJOR-C — BD.W-GESTALT-ROSTER-GROW is itself UNROSTERED — absent from SEED bands, CANDIDATE-WAVES, AND the FOLD-LEDGER, and the wave-count is stale
The harden created the wave file and re-threaded 11 sibling waves (band-4/5 + W-CUT + W-PAGE-HEADER-FOLD) to DEPEND on it, but never enrolled it in the three index/ledger docs:
- **SEED.md Band 9 (`:95-100`)** lists only DISPOSITION-RESTAMP, WEAK-KEEP-REGRADE, FOLD-LEDGER, CUT — no ROSTER-GROW. (grep `ROSTER-GROW` SEED.md = empty.)
- **CANDIDATE-WAVES.md Band 9 (`:354+`)** lists the same 4 — no ROSTER-GROW. (grep = empty.)
- **FOLD-LEDGER.md (all classes)** has NO row for it. (grep = empty.) The Class-I standing-arms table `:99-107` stops at CUT.
- **SEED.md:107** still says "Candidate waves: 43"; disk now has **44** wave files.
- **FOLD-LEDGER.md:120-122** "No-silent-drop attestation" asserts "Every candidate-wave from the 12 findings is dispositioned above … Nothing … is unaccounted-for" — now FALSE: the harden's own BUILD wave is unaccounted-for.

This is the no-silent-drop disease BD exists to kill, reincarnated by the harden itself: a real BUILD wave-file on disk with no ledger row. It will bite `proof:bd-fold-ledger` directly — F1 asserts `items == expectedCount` and doc⟷JSON completeness; either the JSON enrolls ROSTER-GROW (then `FOLD-LEDGER.md` is one row short → F1 RED) or it omits it (then a real `docs/tranches/BD/waves/BD.W-*.md` BUILD wave is a silent-drop → the gate's whole purpose defeated). **Harden:** add a FOLD-LEDGER Class-I row (`The BD close oracle: grow + re-point proof:ba-gestalt → BD.W-GESTALT-ROSTER-GROW` — the wave's own §2:25 already states this exact disposition string), add it to SEED Band 9 + CANDIDATE Band 9, and bump the count 43→44 (or whatever the band-4/5 count reconciles to).

## MINORs (polish, not convergence-blocking)

- **MINOR-1 — FOLD-LEDGER:71 carries the stale "13+ in-body headers" the parallel lens flagged.** Row `:71` says "Thread to its ≥2 real consumers (13+ in-body headers)" while the wave-spec + CANDIDATE:183 honestly say exactly 2 in-body (`data-table.vue` + `table.vue`). The "13+" is the page-identity set owned by the sibling wave — a residual double-count in the ledger's rationale. Tighten to "2 in-body".
- **MINOR-2 — W-CUT CUT5 self-test gap on the phantom.** CUT5 (`:51`) asserts the content-hash re-snapshot "landed," but the self-test bites (`:54`) never bite on a missing/false content-hash (there's nothing to bite — the step is fictional). Once MAJOR-A is fixed this evaporates; flagged so the CUT5 clause doesn't keep a dangling phantom assertion.
- **MINOR-3 — Band-9 count in SEED §Counts not reconciled to the new wave.** Tied to MAJOR-C; the §Counts block (`:106-108`) needs the band-count/wave-count refresh once ROSTER-GROW is enrolled.

## Convergence verdict (COMPLETENESS lens)

**NOT CLEAN — 3 MAJORs remain (2 un-hardened CHALLENGE-1 carryovers + 1 harden-introduced).**

- CHALLENGE-1 MAJOR-1 (roster-grow) and MAJOR-4 (per-pane) are genuinely, rigorously hardened — the ROSTER-GROW wave is real and the per-pane→aggregate mapping is enforceable.
- CHALLENGE-1 MAJOR-2 (W-CUT 8-vs-13) is hardened.
- **CHALLENGE-1 MAJOR-3 (content-hash phantom) is only HALF hardened** (MAJOR-A) — the phantom survives in W-CUT:32, the CUT5 gate clause W-CUT:51, and FOLD-LEDGER:57, now contradicting the corpus that was corrected around them.
- The count-drift carryover (MAJOR-B) survives in FOLD-LEDGER:64 + CANDIDATE:124.
- **The harden introduced MAJOR-C** — the roster-grow wave is unrostered in all three index/ledger docs, the wave-count is stale (43 vs 44 on disk), and the no-silent-drop attestation is now false; this will red `proof:bd-fold-ledger` F1 by construction.

All 3 are reconcile-the-laggard-doc-to-the-corrected-layer fixes (no new technique, no new wave). The pattern is identical to CHALLENGE-1: the harden corrected the high-traffic docs (SEED, CANDIDATE, wave-specs) but left the lower-traffic close/ledger docs (W-CUT, FOLD-LEDGER) carrying the old/phantom claims, and forgot to enroll its own new wave. **Fix these 3 (plus the 3 MINORs) and re-run; the corpus should reach 2-consecutive-clean — the substantive build (ROSTER-GROW + the per-pane re-thread) is sound; the remaining defects are pure doc-coherence laggards concentrated in 3 files (W-CUT.md, FOLD-LEDGER.md, CANDIDATE-WAVES.md:124).**

Key file evidence: `docs/tranches/BD/waves/BD.W-CUT.md:32,51` (phantom content-hash in a close clause); `docs/tranches/BD/FOLD-LEDGER.md:57` (phantom row), `:64` (28-file drift), `:99-107,120-122` (ROSTER-GROW absent + false attestation); `docs/tranches/BD/CANDIDATE-WAVES.md:124` (28 residual), Band-9 `:354+` (ROSTER-GROW absent); `docs/tranches/BD/SEED.md:95-100` (Band-9 ROSTER-GROW absent), `:107` (43 vs disk 44); `scripts/proof-tabs-ios.mjs` (grep createHash = ZERO, confirming the phantom); `docs/tranches/BD/waves/BD.W-GESTALT-ROSTER-GROW.md` (the real, rigorous build that closes MAJOR-1/4 but is itself unrostered).",
      "Now I have the complete picture. The CANDIDATE-WAVES.md was hardened thoroughly:
- **CANDIDATE-WAVES:121-123** now says "37-file page-IDENTITY header paste" (FIXED from 28).
- **CANDIDATE-WAVES:182-184** now says "EXACTLY 2 inline border-l-[3px] + IconChip-led in-body section headers" with explicit DISJOINT-paste-set coordination (the 13+ double-count language is GONE from the goal/starting-state).

BUT there's a critical CONTRADICTION introduced: CANDIDATE-WAVES:121 and :182 BOTH assert the two waves "touch DISJOINT paste-sets" / "NON-overlapping paste-sets" — yet PAGE-HEADER-FOLD's enrolled 37-set explicitly INCLUDES `data/{data-table,table}.vue` (PAGE-HEADER-FOLD §2:47), which are the EXACT two files SECTION-HEADER-THREAD claims as its in-body set. The "DISJOINT" claim is **demonstrably false on disk** — the two files are in BOTH sets. So the harden's central reconciliation premise ("disjoint paste-sets, counted once") is contradicted by the wave specs' own file enumerations.

And the residual summary-layer drift survives:
- **CANDIDATE-WAVES:124** still says "The **28** page-identity headers ARE the 42nd paste" (stale 28, contradicting :122's 37).
- **CANDIDATE-WAVES:125** still says "the **28** paste sites" in the Source line (stale 28).
- **FOLD-LEDGER:64** still says "**28**-file hand-rolled page-identity header paste" (stale 28).
- **FOLD-LEDGER:71** still says "Thread to its ≥2 real consumers (**13+** in-body headers)" (the un-reconciled 13+ double-count).
- **FOLD-LEDGER:57** still carries the phantom "T4 content-hash re-snapshot" row with the "rebakes the T4 hash... or the byte-fence reds" rationale (the phantom CHALLENGE-1 MAJOR-1 demanded deleted).

I have comprehensive, evidence-backed coverage across all three CHALLENGE-1 phantom MAJORs plus the new harden-introduced defects. Let me compile the final report.

---

# BD-TRANCHE CHALLENGE-2 — PHANTOM RE-CHALLENGE REPORT

**Scope:** Re-verified the three CHALLENGE-1 phantom MAJORs (content-hash phantom · 28→37 count · double-count) against the hardened BD corpus + real `/src` + `/demo` at HEAD. Verdict up front: **the wave-spec layer was hardened well, but the harden left STALE RESIDUE in the summary layer (FOLD-LEDGER + the tail of CANDIDATE-WAVES) AND introduced TWO new defects — a load-bearing wave orphaned from all three tracking docs (count-drift 43→44), and a "disjoint paste-set" reconciliation that is physically FALSE on disk.** This lens is NOT clean.

---

## REMAINING MAJORs (CHALLENGE-1 items not fully hardened)

### REMAINING-MAJOR-1 — The phantom "T4 content-hash re-snapshot" row SURVIVES in FOLD-LEDGER.md:57
- **Wave-id:** BD.W-ARIA-ORIENTATION-GUARD.
- **Problem:** CHALLENGE-1 MAJOR-1 explicitly demanded "(a) DELETE the phantom FOLD-LEDGER.md:57 'T4 content-hash re-snapshot' row (it discharges no real item — there is no hash)." The harden fixed SEED.md:16,33 and CANDIDATE-WAVES.md:14,18 (both now say "the truth, NOT a content-hash") **but FOLD-LEDGER.md:57 is byte-unchanged** — it still carries the row `| BC.W-TABS-IOS T4 content-hash re-snapshot | the cross-gate coupling | →BD.W-ARIA-ORIENTATION-GUARD (lockstep arm) | The one-byte SFC change rebakes the T4 hash — re-snapshot in lockstep ... or the byte-fence reds the next battery.`
- **Evidence:** `FOLD-LEDGER.md:57` (verbatim above); `grep -c "createHash|content-hash|sha256" scripts/proof-tabs-ios.mjs` = **0** (the gate has no hash — confirmed; T4 is `detectEngineFence`, a marker-presence fence at `proof-tabs-ios.mjs:194-250`). The ledger row describes a mechanism that does not exist, now in direct contradiction to the corrected SEED.md:16 ("There is NO content-hash to re-snapshot ... no snapshot is rebaked").
- **Harden demanded:** DELETE FOLD-LEDGER.md:57, or FLIP it in place (no-delete fence) to the DOC-reconcile disposition the wave spec lands ("reconcile KF-BC.md:41,132 over-claimed content-hash language; there is NO hash to re-snapshot"). As written, the ledger discharges a phantom item and asserts a coupling the gate cannot honor — the exact phantom CHALLENGE-1 raised.

### REMAINING-MAJOR-2 — The 28→37 count survives in 3 summary-layer sites (FOLD-LEDGER:64 + CANDIDATE-WAVES:124,125)
- **Wave-id:** BD.W-PAGE-HEADER-FOLD.
- **Problem:** CHALLENGE-1 MAJOR-2 demanded the 28→37 reconcile. The harden fixed SEED.md:53 (now 37), CANDIDATE-WAVES.md:122-123 (now 37, with full grep verification). **But three summary sites still say 28**, and two of them now contradict the corrected 37 in the SAME document:
  - `FOLD-LEDGER.md:64` — "**28-file** hand-rolled page-identity header paste".
  - `CANDIDATE-WAVES.md:124` — "The **28** page-identity headers ARE the 42nd paste" (contradicts :122's "37-file" two lines up).
  - `CANDIDATE-WAVES.md:125` — "the **28** paste sites" (Source line).
- **Evidence:** disk truth `grep -rln "section-label--tinted text-admin-label" demo/stories/**/*.vue` = **37** (verified); FOLD-LEDGER:64, CANDIDATE-WAVES:124,125 (verbatim above). This is the same count-drift class BD.W-DOC-COUNT-SYNC exists to kill, surviving inside the BD planning corpus — the irony CHALLENGE-1 flagged, now half-fixed (a within-document 37-vs-28 contradiction is worse than a uniform-stale 28).
- **Harden demanded:** Re-sync FOLD-LEDGER:64 + CANDIDATE-WAVES:124,125 to 37.

### REMAINING-MAJOR-3 — The "13+ in-body" double-count survives in FOLD-LEDGER.md:71
- **Wave-id:** BD.W-SECTION-HEADER-THREAD.
- **Problem:** CHALLENGE-1 MAJOR-3 demanded the "13+ in-body" double-count be reconciled to the honest "2 in-body." The harden fixed the wave spec (§2:27 "These TWO") and CANDIDATE-WAVES:182-184 ("EXACTLY 2"). **But FOLD-LEDGER.md:71 still says** "Thread to its ≥2 real consumers (**13+ in-body headers**)."
- **Evidence:** `FOLD-LEDGER.md:71` (verbatim above); disk confirms only 2 in-body IconChip-led headers (`data-table.vue:168` + `table.vue:60`, each file has exactly 1 — verified `grep -c` = 1 per file). The "13+" is the page-identity set the wave specs now explicitly assign to PAGE-HEADER-FOLD.
- **Harden demanded:** Re-sync FOLD-LEDGER:71 to "2 real in-body consumers (data-table + table)."

---

## NEW MAJORs (introduced by the harden)

### NEW-MAJOR-1 — BD.W-GESTALT-ROSTER-GROW is orphaned: count-drift 43→44 + a no-silent-drop violation + a phantom self-back-reference
- **Wave-id:** BD.W-GESTALT-ROSTER-GROW (the new wave the harden added to close CHALLENGE-1 MAJOR-1/MAJOR-4).
- **Problem:** The harden correctly minted a load-bearing INFRA wave (`BD.W-GESTALT-ROSTER-GROW.md`, the close-oracle owner every band-2/3/4/5 per-wave verdict + W-CUT's terminal gestalt depend on) — but left it **completely untracked**:
  - **Count-drift 43→44.** Disk = **44** wave files; SEED.md:107 still says "**43** candidate waves"; SEED.md bands enumerate 43 (the wave is in NO band); CANDIDATE-WAVES.md has NO `### BD.W-GESTALT-ROSTER-GROW` entry (43 headers). `comm` confirms the SINGLE disk-vs-SEED delta IS this wave.
  - **No-silent-drop violation.** FOLD-LEDGER.md has NO row dispositioning it (Class I ends at W-CUT), yet FOLD-LEDGER:122 attests "Every candidate-wave ... is dispositioned above." A load-bearing wave exists on disk with no ledger disposition — the exact no-silent-drop discipline (SEED §discipline 3) the fold-machine enforces.
  - **Phantom self-back-reference.** The wave spec line 25 cites "FOLD-LEDGER Class I `→BD.W-GESTALT-ROSTER-GROW`" and line 7/36/74 cite "the MAJOR-4 close" — but no such FOLD-LEDGER row exists (verified `grep "GESTALT-ROSTER-GROW" FOLD-LEDGER.md` = empty). The wave references its own ledger home that was never written.
- **Evidence:** `ls docs/tranches/BD/waves/*.md | wc -l` = **44**; SEED.md:107 "43"; `grep -c "^### BD.W-" CANDIDATE-WAVES.md` = 43; `grep "GESTALT-ROSTER-GROW"` on SEED/CANDIDATE/FOLD-LEDGER = all empty; `comm` delta = `BD.W-GESTALT-ROSTER-GROW`.
- **Harden demanded:** Add the SEED band-9 bullet + the Counts bump (43→44), the CANDIDATE-WAVES.md `###` spec entry, and a FOLD-LEDGER Class I row dispositioning it. This is the SAME count-drift disease BD.W-DOC-COUNT-SYNC diagnoses — the harden re-introduced it while fixing CHALLENGE-1.

### NEW-MAJOR-2 — The CHALLENGE-1 MAJOR-3 "disjoint paste-sets" reconciliation is PHYSICALLY FALSE: data-table.vue + table.vue are double-claimed with contradictory build instructions
- **Wave-ids:** BD.W-PAGE-HEADER-FOLD (band 4) + BD.W-SECTION-HEADER-THREAD (band 5).
- **Problem:** The harden's response to CHALLENGE-1 MAJOR-3 was to declare the two waves touch "DISJOINT paste-sets ... NON-overlapping" (CANDIDATE-WAVES:121,182; PAGE-HEADER-FOLD §1:7; SECTION-HEADER-THREAD §2:27) — PAGE-HEADER-FOLD owns the 37 page-identity headers, SECTION-HEADER-THREAD owns the 2 in-body headers. **But the two sets OVERLAP on the SAME two physical files:**
  - PAGE-HEADER-FOLD's enrolled 37-file set **explicitly lists `data/{data-table,table}.vue`** (§2:47) and folds them with **heading ABSENT** (eyebrow-only, PH3-safe — §3:94); its M9e-2 asserts ZERO surviving paste across all 37 (incl. data-table/table) and M9e-4 asserts the folded calls carry NO `heading=`.
  - SECTION-HEADER-THREAD's ENTIRE ≥2-consumer floor is `data/data-table.vue:160-178` + `data/table.vue:52-70` (§2:24-25, §3:34-35), folded with **heading PRESENT** ("supply the section's name ... promoted from the eyebrow").
  - Each file has **exactly ONE** `section-label--tinted text-admin-label` header (verified `grep -c` = 1 per file) — there is NO separate "in-body" header distinct from the "page-identity" header. The same DOM node is claimed by both waves with **mutually-exclusive heading shapes.**
- **Evidence:** `demo/stories/data/data-table.vue:160-178` (one header, IconChip Database) + `table.vue:52-70` (one header, IconChip Table2) — verified read; both files appear in PAGE-HEADER-FOLD's §2:47 enrolled set AND are SECTION-HEADER-THREAD's §2:24-25 sole ≥2-floor. The contradiction bites at the gate: if SECTION-HEADER-THREAD runs first (heading-present), PAGE-HEADER-FOLD's M9e-4 (no `heading=` on enrolled sites) REDS on data-table/table; if PAGE-HEADER-FOLD runs first (heading-absent), SECTION-HEADER-THREAD's Arm A starting-state (the inline `<header borderLeft>` at :160-178) is already DELETED, and its M9d ≥2-adopter greens only on PAGE-HEADER-FOLD's adopters — **the exact "M9d could green on adopters that belong to the other wave's scope" double-count CHALLENGE-1 MAJOR-3 named, now formalized rather than fixed.**
- **Harden demanded:** Resolve the call-site OWNERSHIP, not just the primitive-API coexistence. Either (a) SECTION-HEADER-THREAD finds 2 genuinely-distinct in-body section headers NOT in PAGE-HEADER-FOLD's 37 (none exist at HEAD — so this likely fails the ≥2 bar honestly and should MERGE into PAGE-HEADER-FOLD or re-scope), or (b) REMOVE `data/{data-table,table}.vue` from PAGE-HEADER-FOLD's 37-set (making it a 35-set) and let SECTION-HEADER-THREAD own them with heading-present — and reconcile every "37"/"disjoint" claim accordingly. As written, the two waves cannot both execute, and the "disjoint" premise is false on disk.

---

## MINORs (polish)

- **MINOR-1 — FOLD-LEDGER:92 "disk 90" vs the gate-canonical 89.** FOLD-LEDGER Class H says "68/76/72 subpaths (disk **90**)"; the load-bearing DOC-COUNT-SYNC target + the real `jsSubpathExports(pkg).size` = **89** (verified: ran the actual gate function — returns 89; the "90" counts the `.` root key the gate excludes). The wave-spec target (89) is correct and gate-viable; only the ledger's loose "90" is off-by-one. Cosmetic, but it is a count in a count-sync tranche.
- **MINOR-2 — PAGE-HEADER-FOLD §2:15 "borderLeft: 36" vs the 37 header count.** The spec notes `borderLeft:` = 36 while `section-label--tinted text-admin-label` = 37 (verified: 35 `border-l-[3px]` + the inline-style variants). The 1-file gap (a header using a different border mechanism) is real and acknowledged, but the M9e-2 detector keys on the `borderLeft:`-in-`:style` AND the span class — the 37th file (the one without `borderLeft:`) may not match M9e-2's combined regex. Worth a one-line note on which file is the outlier so the enrolled-set ratchet does not silently miss it.
- **MINOR-3 — SECTION-HEADER-THREAD §1:7 + §2:23 loose "border-l-[3px]" on inline-style headers.** The two data headers use inline `:style="{borderLeft: …}"`, NOT the literal `border-l-[3px]` Tailwind utility (verified: data-table:162-166 is `:style` borderLeft). §2:24 describes it accurately, but the §1/§2:23 headline "inline `border-l-[3px]`" is imprecise. Cosmetic (same root as MINOR-2's mechanism distinction).

---

## What I verified as GENUINELY HARDENED (no challenge)

- **The content-hash phantom at the wave-spec layer** — SEED.md:16,33 + CANDIDATE-WAVES.md:14,18 now correctly state "the truth, NOT a content-hash" with the gate-verified `grep createHash = 0`. The ARIA wave spec is sound. (Only the FOLD-LEDGER:57 row survives — REMAINING-MAJOR-1.)
- **The 28→37 count at the wave-spec layer** — PAGE-HEADER-FOLD §1:5/§2:15 "37 files — verified by grep, NOT the SEED's '28'" with the full file enumeration; SEED.md:53 + CANDIDATE-WAVES:122-123 fixed. (Only FOLD-LEDGER:64 + CANDIDATE-WAVES:124,125 survive — REMAINING-MAJOR-2.)
- **The goo-blob GL-shader pair (CHALLENGE-1 second-pass MAJORs) — thoroughly hardened.** SQUIRCLE §3a(A) now explicitly addresses the `proof:gooblob-meatball` M2 byte-assert collision with a lockstep `LIT_MATH_VERBATIM[7]` re-snapshot + a coherence self-test bite (verified M2 IS a genuine verbatim byte-assert at `proof-gooblob-meatball.mjs:145`); §3a(B) makes the SAT-SHADE↔SQUIRCLE sanction DIRECTED (SQUIRCLE arm 1 is the sole independent anchor, STROKES dropped); SEED #4 (line 115) reworded to the conditional "sanctioned ONLY when a viz wave re-touches the shader anyway ... packer moves in lockstep." All three second-pass MAJORs FIXED.
- **The CHALLENGE-1 MAJOR-1/MAJOR-4 roster-grow gap — the build is correct** (the orphaning is the defect, NEW-MAJOR-1, not the wave's content). `BD.W-GESTALT-ROSTER-GROW.md` mints the BD roster, re-points the 4 consts, re-labels G6 BC→BD, maps each band-4/5 per-pane verdict to a REAL aggregate surface (`page-band`/`shell`/`glass-feedback` — no invented per-file rows), carries the self-test bites, and keeps the closed BC record read-only. A strong infra wave.
- **The disk counts** — ui/ = 43 (CLAUDE.md "42" is the DOC-COUNT-SYNC target, correct), custom/ = 49 (correct), composables = 11, JS-subpaths = 89 (gate-confirmed). The DOC-COUNT-SYNC starting-state numbers are accurate.

---

## CONVERGENCE VERDICT

**This lens is NOT clean — 5 MAJORs remain (3 un-hardened CHALLENGE-1 residue + 2 new harden-introduced).**

The harden fixed every CHALLENGE-1 MAJOR **at the wave-spec layer** (the rigorous layer) but **left stale residue in the summary layer it did not fully sweep** (FOLD-LEDGER:57,64,71 + CANDIDATE-WAVES:124,125) — the SAME "the wave specs are corrected, the summary contradicts them" pattern CHALLENGE-1 diagnosed, now half-resolved (which produces *within-document* contradictions, arguably worse). And it introduced two genuine new defects:

1. **REMAINING-MAJOR-1** — phantom content-hash row survives at FOLD-LEDGER:57.
2. **REMAINING-MAJOR-2** — 28→37 drift survives at FOLD-LEDGER:64 + CANDIDATE-WAVES:124,125 (now self-contradicting).
3. **REMAINING-MAJOR-3** — "13+ in-body" double-count survives at FOLD-LEDGER:71.
4. **NEW-MAJOR-1** — BD.W-GESTALT-ROSTER-GROW orphaned: count-drift 43→44, no FOLD-LEDGER disposition (no-silent-drop violation), phantom self-back-reference.
5. **NEW-MAJOR-2** — the "disjoint paste-sets" reconciliation is physically false: data-table.vue + table.vue double-claimed by PAGE-HEADER-FOLD (heading-absent) AND SECTION-HEADER-THREAD (heading-present), with gate arms that contradict at execution.

All five are reconcile-the-summary-to-the-disk-and-wave-spec fixes EXCEPT NEW-MAJOR-2, which requires a genuine architectural decision (call-site ownership of the 2 data headers — likely a MERGE or a re-scope of SECTION-HEADER-THREAD, whose ≥2-bar has no consumers outside PAGE-HEADER-FOLD's set). **Harden these 5 and re-run; the corpus does NOT reach 2-consecutive-clean on this pass.** The wave-spec layer is converged; the FOLD-LEDGER is one full sweep behind, and the harden's own new wave + the data-file partition are the two genuine open architectural items.

Key file evidence: `docs/tranches/BD/FOLD-LEDGER.md:57,64,71` (the surviving phantom/28/13+ residue) · `docs/tranches/BD/CANDIDATE-WAVES.md:124,125` (stale 28, self-contradicting :122) · `docs/tranches/BD/waves/BD.W-GESTALT-ROSTER-GROW.md:25` (phantom FOLD-LEDGER back-ref) vs SEED.md:107 ("43", disk=44) · `BD.W-PAGE-HEADER-FOLD.md:47` (data/{data-table,table} in the 37-set) vs `BD.W-SECTION-HEADER-THREAD.md:24-25` (the SAME 2 files as the sole ≥2-floor) · `demo/stories/data/{data-table,table}.vue` (1 header each, double-claimed) · `scripts/proof-tabs-ios.mjs` (grep createHash=0, the phantom confirmed) · `scripts/proof-gooblob-meatball.mjs:145` (M2 genuine byte-assert, SQUIRCLE harden sound).",
      "The remaining band-3 viz waves (KUWAHARA-MULTIPASS, COMPUTE-DENSITY, FALLBACK-RETIRE-WATCH) are all fence-clean and confirm the CHALLENGE-1 assessment — they correctly refuse to build blind (overfit-restraint held, do-not-delete held, FBO gated on invariant-8 preservation + user greenlight). No new fence violation introduced there.

I now have comprehensive coverage. Let me compile the final report. Let me do one last confirmation on whether the FOLD-LEDGER phantom row was the SEED-lens or general-lens MAJOR (to correctly scope it for the FENCE lens) — the FENCE lens primarily owns the goo-blob GL-shader pair, so the FOLD-LEDGER:57 phantom is technically an ARIA/SEED-lens finding, but I'll note it as a cross-cutting residual since I found it during verification.

I have everything needed. Here is my structured FENCE re-challenge report.

---

# BD CHALLENGE-2 — FENCE LENS RE-CHALLENGE REPORT

**Scope:** the 3 CHALLENGE-1 FENCE MAJORs (goo-blob GL-shader pair: M2 collision, byte-untouched canon, circular sanction) + the uStretch sequencing + a fresh scan of all band-3 viz waves for harden-introduced fence violations. Repo HEAD; corpus `docs/tranches/BD/`.

**Verdict up front: the FENCE lens is NOT yet clean — 1 REMAINING MAJOR + 1 NEW MAJOR. The two headline CHALLENGE-1 MAJORs (M2 collision, circular sanction) are fully hardened; the byte-untouched-canon MAJOR was only HALF-discharged (the SEED-clause reconcile was botched and the CLAUDE.md reconcile was never owned).**

---

## CHALLENGE-1 FENCE MAJORs — harden status

### ✅ FENCE MAJOR-1 (silent `proof:gooblob-meatball` M2 break) — FULLY HARDENED
SQUIRCLE now carries an explicit §3a-A (`BD.W-GOOBLOB-SQUIRCLE-REFRACT.md:40-44`): the M2 collision is named, the re-snapshot of `LIT_MATH_VERBATIM[7]` is mandated in the SAME diff, a Q4 cross-gate coherence clause (`:61`) + a self-test bite (`:62-43`) prove the two gates land on ONE dome-Z source-of-truth. **Verified against the live gate:** `LIT_MATH_VERBATIM[7]` (`scripts/proof-gooblob-meatball.mjs:145`) IS exactly the spherical dome-Z snippet the wave cites; the live WGSL line is `metaball.wgsl.ts:222`, frag `:180` — all citations exact. M1/M3 correctly identified as unaffected (different asserted lines). **This MAJOR is closed.**

### ✅ FENCE MAJOR-3 (circular SAT-SHADE↔SQUIRCLE sanction) — FULLY HARDENED
The sanction is now DIRECTED, both sides: SQUIRCLE §3a-B (`:46`) declares arm 1 "the SOLE INDEPENDENT metaball-shader re-touch... This wave does NOT depend on SAT-SHADE; it re-touches the shader regardless." SAT-SHADE §3a-A (`:37`) + §2 (`:21`) mirror it as "DIRECTED: SAT-SHADE → SQUIRCLE arm 1." The loose STROKES citation (CHALLENGE-1 MINOR-2) is explicitly dropped in BOTH waves ("STROKES touches the *aurora* shader, NOT metaball... dropped from the sanction chain"). **This MAJOR is closed.**

### ⚠️ FENCE MAJOR-2 (the "metaball.frag byte-untouched" canon is now false) — **HALF-DISCHARGED → REMAINING MAJOR**
CHALLENGE-1 demanded **two** parts: (a) re-word SEED #4 to the conditional form; (b) a BD wave un-asserting the now-false CLAUDE.md "metaball.frag.ts stays byte-untouched" + the `proof:perf-producer` "absolute fence" comment. **Both parts are defective:**

- **Part (a) BOTCHED — SEED #4 now self-contradicts the waves it governs.** `SEED.md:115` was re-worded to add the conditional sanction clause ("sanctioned ONLY when a viz wave re-touches the shader anyway") BUT left the contradictory absolutes in place: *"metaball.frag... are byte-untouched fallbacks... it mirrors/transcribes the GLSL math, **never edits the .frag**."* This is **flatly contradicted by both waves' own build legs**: SQUIRCLE §3 (`:25`) "`metaball.frag.ts:180` AND `metaball.wgsl.ts:222` change in LOCKSTEP"; SAT-SHADE §3.3 (`:31`), G1 (`:46`), §6 (`:63`) "`metaball.frag.ts` reads `uSatColor[i]`... BOTH `.frag` and `.wgsl` change in LOCKSTEP." A SEED whose binding-discipline #4 says "never edits the .frag" while two of its own band-3 waves explicitly edit `metaball.frag.ts:180` is the **exact intra-corpus contradiction class** the CHALLENGE-1 general lens flagged as a MAJOR (SEED contradicting its wave-specs on a load-bearing instruction).

- **Part (b) NEVER OWNED — no BD wave reconciles CLAUDE.md:745.** `CLAUDE.md:745` still reads "metaball.frag.ts stays the byte-untouched WebGL2 fallback (the GL-shader fence)" — made FALSE the moment SQUIRCLE+SAT-SHADE land. I grepped every BD wave: NEITHER SQUIRCLE nor SAT-SHADE carries a §7 CLAUDE.md mint/reconcile section, and the only band-7 hit (`BD.W-DOC-COUNT-SYNC.md:62,92`) is about the GATE's `custom/`-arm being byte-untouched — NOT the metaball.frag prose. The `proof:perf-producer` "absolute fence" comment (`scripts/proof-perf-producer.mjs:245,256`) is likewise un-reconciled. **(Mitigation that does NOT close it:** the perf-producer W4 BITE is a `W-PERF-PRODUCER`-marker check `:252-253`, not a content-hash, so the edit won't RED that gate — but the prose claim "the GL fence is absolute" remains a live false canon the next reader trusts.)

**This is a REMAINING MAJOR:** the harden touched the sanction clause but left the load-bearing "never edits the .frag" / "byte-untouched" canon false in TWO places (SEED #4 + CLAUDE.md:745) with NO owning wave. This is precisely the doc-drift class BD Band-7 exists to kill, shipped inside BD's own seed.

---

## NEW MAJOR (introduced by the harden)

### 🔴 NEW MAJOR-A — SQUIRCLE's §3 build-leg squircle form ≠ its own §3a-A M2 re-snapshot form (a byte-drift that re-opens the silent-M2-red the §3a was authored to prevent)
The harden added §3a-A to re-snapshot M2, but the squircle byte-string is stated TWO inconsistent ways within the same wave:
- **§3 build-leg** (`:24`, what the SHADER receives): `z = pow(1 - pow(1 - interior, 4.0), 0.25)` — **no `max(0.0,…)` numerical guard, terse `1` not `1.0`**.
- **§3a-A re-snapshot + Q4** (`:42`,`:61`, what `LIT_MATH_VERBATIM[7]` receives): `z = pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` — **WITH the guard, `1.0`**.

Because M2 is a `wgsl.includes(snippet)` **byte-equality** check, an executing agent who ships the §3 build-leg form into the shader while re-snapshotting M2 to the §3a-A form produces `wgsl.includes(snippet) === false` → **M2 reds** — the exact silent-red the §3a coordination exists to prevent, re-introduced by the wave's own internal inconsistency. The §3a-A form is the correct one (it preserves the spherical original's `max(0.0,…)` clamp structure and is self-consistent with Q4); the §3 informal restatement is the drift. **Ranked MAJOR** because it directly defeats the FENCE MAJOR-1 fix on execution (a wave that re-snapshots the wrong byte-form silently reds the very gate it claims to keep coherent), and it is a one-line authoring fix the seed must make before convergence.

---

## MINORs

- **MINOR-1 (FENCE) — FALLBACK-RETIRE-WATCH / FENCE MAJOR-2 interlock.** The same false "metaball.frag byte-untouched" canon that NEW... no — corrected: **`scripts/proof-perf-producer.mjs:256`** literally calls metaball.frag "the GL fence is absolute." Once SQUIRCLE/SAT-SHADE land, this comment is stale; it doesn't red (marker-check) but should get a one-line BD reconcile note. Sub-finding of remaining MAJOR-2(b); listed as MINOR only because the gate stays green.
- **MINOR-2 (aurora budget canon drift, cross-cutting).** STROKES §6 (`:53`) correctly flags that CLAUDE.md's aurora budget ("lifted to 50000") trails the live `scripts/profile-bundle.mjs:213` ceiling (gzip 54000) "by one lift" — but no BD wave reconciles that CLAUDE.md figure either. The wave handles it correctly *for itself* (verify-against-live), so the live work is safe; the CLAUDE.md prose stays stale. Polish.
- **MINOR-3 (FOLD-LEDGER phantom row survives — ARIA-lens residual, surfaced here).** `FOLD-LEDGER.md:57` still carries the phantom "BC.W-TABS-IOS T4 content-hash re-snapshot... re-snapshot in lockstep or the byte-fence reds" row that the wave-spec, SEED (`:16,33`), AND CANDIDATE-WAVES (`:14,18`) all now refute ("there is NO content-hash to re-snapshot"). CHALLENGE-1 explicitly demanded this row be DELETED. The SEED/CANDIDATE language WAS fixed; the FOLD-LEDGER row was NOT. **Strictly an ARIA/SEED-lens MAJOR**, not a FENCE-lens one, but flagged here as a genuine un-hardened residual found during verification — the FOLD-LEDGER is now the LONE doc still asserting the phantom coupling.

---

## What I re-verified as GENUINELY FENCE-CLEAN (no challenge)

- **uStretch sequencing (CHALLENGE-1 MINOR-3) — FULLY HARDENED.** BLOB-MOTION-TUNE arm 2 now PREFERS the CPU `cInt.stretch` path (off the GL fence entirely), names the exact disjoint `uStretch` region (`metaball.wgsl.ts:162/178`, `metaball.frag.ts:118/122` — all verified exact, disjoint from the dome-Z `:222/:180`), and routes a shader-gain last-resort through the SAME ONE metaball re-touch SQUIRCLE+SAT-SHADE establish, never a 2nd independent re-touch (`:31,57`). The `uStretch` lane is already packed (`s6.w`) so a gain-only edit adds no uniform (M3 undisturbed).
- **SAT-SHADE M3 cross-check** — §3a-B (`:39`) + G5 (`:50`) correctly assert the satColor lane is APPENDED at a new end offset (`BLOB_WGPU_UNIFORM_BYTES=592` verified at `uniformBridgeWGPU.ts:46`) so the `res.z`/`res.w` shadow-lane offsets M3 asserts are unmoved; a re-pack that shifts them reds M3 (self-test bite present).
- **STROKES, CURL** — both edit ONLY their WGSL module (`aurora-mediums.wgsl.ts` / `aurora.wgsl.ts`); `aurora.frag.ts` byte-untouched, content-hash-asserted (STROKES S3 / CURL byte-faithful twin of `aurora.frag.ts:290-296`). STROKES correctly flags the stale CLAUDE.md 50000 budget figure. Fence-clean.
- **PARITY-METAL, KUWAHARA-MULTIPASS, COMPUTE-DENSITY, FALLBACK-RETIRE-WATCH** — PARITY-METAL is the sequencing-first capture wave (edits zero shaders); KUWAHARA gates the FBO on invariant-8 preservation + user greenlight; COMPUTE-DENSITY holds the J-inv-10 overfit bar (no build at N=64); FALLBACK-RETIRE-WATCH re-affirms do-not-delete (clause B machine-blocks). No new fence violation.

---

## CONVERGENCE VERDICT (FENCE lens)

**NOT CLEAN — 1 REMAINING MAJOR (FENCE MAJOR-2, half-discharged) + 1 NEW MAJOR (the §3/§3a-A squircle byte-form drift).**

The two hard structural FENCE MAJORs (the silent M2 break, the circular sanction) are genuinely closed and well-coordinated. But the harden of FENCE MAJOR-2 was botched in BOTH halves — SEED #4 was re-worded to ADD the conditional sanction while LEAVING the contradictory "never edits the .frag" absolute that its own SQUIRCLE/SAT-SHADE waves violate, and the CLAUDE.md:745 byte-untouched reconcile was never assigned to any wave — and the harden INTRODUCED a new byte-form inconsistency inside SQUIRCLE that, on execution, re-reds the very M2 gate §3a was authored to keep coherent.

**Harden demanded to converge:**
1. **(MAJOR-2 remaining)** Re-word `SEED.md:115` discipline #4 to drop the "byte-untouched fallbacks / never edits the .frag" absolutes — restate as the conditional the waves actually perform ("the `.frag` is byte-untouched UNLESS a band-3 viz wave re-touches the metaball shader, in which case `.frag`+`.wgsl`+packer move in lockstep"); AND assign a BD wave (coda to SQUIRCLE, or a band-7 doc wave) to un-assert `CLAUDE.md:745` "metaball.frag.ts stays byte-untouched (the GL-shader fence)" + the `proof:perf-producer.mjs:245,256` "absolute fence" comment, recording the BD sanctioned re-touch.
2. **(NEW MAJOR-A)** Reconcile SQUIRCLE §3 build-leg (`:24`) squircle string `pow(1 - pow(1 - interior, 4.0), 0.25)` to the §3a-A/Q4 guarded form `pow(max(0.0, 1.0 - pow(1.0 - interior, 4.0)), 0.25)` so the shipped shader byte-matches the re-snapshotted `LIT_MATH_VERBATIM[7]` — else M2 reds on execution.
3. **(MINOR-3, cross-lens)** Delete the phantom `FOLD-LEDGER.md:57` "T4 content-hash re-snapshot" row (the lone surviving site of a coupling the rest of the corpus now refutes).

After (1) and (2) land, the FENCE lens is clean. **2 MAJORs remain on this pass.**

Key evidence: `scripts/proof-gooblob-meatball.mjs:145` (LIT_MATH_VERBATIM[7] dome-Z, M2); `docs/tranches/BD/SEED.md:115` ("never edits the .frag" vs the waves); `CLAUDE.md:745` (false byte-untouched canon, un-owned); `scripts/pr