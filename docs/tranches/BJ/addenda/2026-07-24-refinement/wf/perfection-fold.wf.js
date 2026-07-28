export const meta = {
  name: 'perfection-fold',
  description: 'The perfection fold: seat the 50 tails orphans + lane-B corrections + deck/relocation residue, then certify all 90 rows against precepts/',
  phases: [
    { title: 'Write', detail: 'Fable writer seats every orphan + residue', model: 'fable' },
    { title: 'Certify', detail: 'Opus orphan-seat critic + 4 precepts readers', model: 'opus' },
    { title: 'Seal', detail: 'Fable perfection seal', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28 (HEAD e2f34358 — the stage-2 seal
commit). State your modelId. Consume FIRST: ${REF}/EXEC-STATE.md (all rulings incl. §THE OWNER SITTING
both rounds) · ${REF}/TERMINAL-ROSTER.md (429 lines, §00 SL-1..SL-8 applied) · docs/tranches/BK/
(PLAN/PORT/EXECUTION-PROGRESS/ASK/gates). Em dashes without spaces. One-source law absolute (cite the
bank, never copy). Gates stay EXACTLY 60 — no new gate seats. The 33 dirty tracked files are the
HOLD-FOR-OWNER governance class (PROOF-SWEEP lane A) — NEVER touch or commit them.`

phase('Write')
const written = await agent(`${CANON}

You are THE PERFECTION WRITER (Fable) — you alone own ${REF}/TERMINAL-ROSTER.md + the five BK files
this cut. Three input banks, all committed at HEAD:

(1) ${REF}/PROOF-SWEEP.md LANE C §4 — the 50 union orphan rows U-01..U-51, each naming its exact BK
seat. Seat EVERY one: 46 are one-liners on existing rows (write the line at the named seat, ⊕⁴-marked,
citing PROOF-SWEEP lane C by U-id); the structural four: U-01 (the +BD-CARRY arm on #16 seeded from
BI/FORMATION/open-row-routing.json filtered ^docs/tranches/BD/, + a PORT §0 pre-history section naming
BC/DEFERRAL-LEDGER.md and BD/FOLD-LEDGER.md + union/DEFERRED-CENSUS.md as lineage docs of record) ·
U-02 (PORT §1.5 per-lane disposition of the 134-file BI FORMATION P-corpus per
HANDOFF-ACTIVE-EXECUTION.md:382-391, + a §3 Σ row) · U-03 (verify DISCHARGED by the stage-2 seal —
confirm the SL rows carry it, add nothing twice) · U-04 (one #16 arm re-dispositioning the AX
register's 23 HELD books + the T2/T9/T10 holds, OR the explicit RETIRE-the-machine line naming
BI/ledgers/CHRONIC-DISPOSITIONS.md the record of truth — pick ONE, rule it, ground it). U-45/46/47
are BK/ASK.md rows with ratified defaults. Honor every re-verdict in lane C §3.

(2) ${REF}/PROOF-SWEEP.md LANE B §3 corrections — the ledger-instrument false-negative class (route
the build-consumer-ledger.mjs fixes to #76's ship-time census re-run clause) · the #40 re-hear docket
correction (DashboardEssay.vue named, useDeckDetent demoted to mirror-only evidence) · the stale
barrel doc src/index.ts:36-37 strike (route to the owning wave) · the metric relay ON-7.x hardening
(verify the seal's #76 row carries sci-active, not sci-report, for the current-contract copy).

(3) ${REF}/DECK-RELOCATION.md — PART I §3's widened #40 amendment body is the spec-of-record for the
deck apotheosis (verify #40 cites it; the roster row stays a pointer, never a copy). PART II's
fold-seatable rows: completion-seal relay destination = atlas (relay row annotation) · header-ribbon
relay = keyframes · timeline scrubber/segmented variant trim (~705 LOC, zero consumers — route to its
owning lane row with the G-RELAY walk clause) · the §4 subpath delete-candidates (axes/blob-config/
canvas/fourier-math + styles-theme/fonts AFTER a text-reference sweep — route to #21/#89's owning rows)
· the search surface-shape ask (route to the dock/search owning row) · the ./styles.css alias note ·
the §6 census-instrument defects (with lane B §3). PART II §7's three OWNER-GLANCE rows become
BK/ASK.md rows with ratified defaults (silence advances): fourier-field+fourier-math — default KEEP
in-library (the item-11 current: abstract facilities migrate IN; the relocation case recorded verbatim
with its facts, owner word invited) · tags-input — default DELETE at #18 with the G-RELAY whole-repo
walk (zero consumers anywhere; the struck-demote tension recorded) · number-field — default KEEP in
the W-FIELD lane (the lane ships it; zero-consumer-ex-muster status recorded, owner may cut with the
muster relay note).

DELIVER: the amended files on disk + a change summary (per-U-id disposition table — SEATED-AT cite /
ALREADY-CARRIED cite / anything you could not seat with why) + Σ counts (ids/rows/gates unchanged).`,
  { label: 'write:perfection', phase: 'Write', model: 'fable', effort: 'xhigh' })

phase('Certify')
const [orphanCritic, ...readers] = await parallel([
  () => agent(`${CANON}

ORPHAN-SEAT CRITIC. The writer claims all 50 PROOF-SWEEP lane C §4 orphans are seated. Falsify: grep
EVERY U-id's named seat in the roster/BK files for its line (the U-id or its nouns); verify the four
structural cures exist (U-01 arm + PORT §0 · U-02 PORT §1.5+§3 · U-03 not double-seated · U-04 ruled
one way); verify BK/ASK.md gained U-45/46/47 + the three owner-glance rows with defaults; verify gates
still exactly 60 and the cursor Σ still reconciles (90 ids). Report ONLY misses with proving greps;
one line if total.

WRITER REPORT:\n${'${written}'.slice(0,0)}${written}`,
    { label: 'certify:orphans', phase: 'Certify', model: 'opus' }),
  ...[['#1-#25', 'rows 1-25'], ['#26-#50', 'rows 26-50'], ['#51-#70', 'rows 51-70'], ['#71-#90', 'rows 71-90']].map(([label, range]) => () =>
    agent(`${CANON}

PRECEPTS-CONFORMANCE READER — roster ${range}. The owner's order: every BK wave spec PERFECTED,
pursuant to precepts/ (read docs/precepts/ first — the SWORN execution discipline). For each roster row
in your range: (a) the cited spec bank EXISTS on disk at the cited path§ (open it); (b) the spec is
FULLY FORMED — no deferred-design clause, no TBD/decides-later/pending-design language, terminal
constants not placeholders; (c) the row's gate cites resolve to seats in docs/tranches/BK/gates/ROSTER.md;
(d) owner-gated rows carry owner+trigger. Report a verdict line per row: PERFECT / DEFECT(what, where)
/ VACUOUS-CITE(path). No silent skips — every row in your range appears.`,
      { label: `precepts:${label}`, phase: 'Certify', model: 'opus' })),
])

phase('Seal')
const seal = await agent(`${CANON}

THE PERFECTION SEAL (Fable). Cure every confirmed critic/reader miss ON DISK (you own the roster + BK
files this seal; a reader DEFECT that is actually a correct citation-by-bank under the one-source law
is REFUTED, not cured — rule each). Then return THE PERFECTION VERDICT: are all 90 wave specs perfected
pursuant to precepts/ — every spec terminal and banked, every BA-BJ tail seated or retired (the 50
orphans), every owner word applied, gates exactly 60, BK executable at Φ0 — with the honest residue
named (the legal OWED set · the HOLD-FOR-OWNER governance sitting · the owner-glance defaults awaiting
words · anything else). This verdict is the compact-ready close: state it so a fresh session can
bootstrap from it.

ORPHAN CRITIC:\n${orphanCritic || '(died — run the orphan greps yourself)'}

PRECEPTS READERS:\n${readers.filter(Boolean).join('\n\n=====\n\n') || '(all died — sample 12 rows yourself)'}

WRITER:\n${written || '(missing)'}`,
  { label: 'seal:perfection', phase: 'Seal', model: 'fable', effort: 'xhigh' })

return { seal }