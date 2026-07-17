# Round 1 — prompt-recap completeness (newest-corpus silent-drop hunt) (?)

## Summary

The BI 7.0.0 close (pre-tag; package.json 7.0.0, no v7.0.0 tag yet) commits the cherry-picked answers to a few of the newest 2026-07-17 asks (A01→ENGAGE-AFFORD, F48 dialog-corner, F49/F50→GRADED-BACKDROP) while the registry that catalogs all 67 of those asks — docs/tranches/BJ/FEEDBACK-LEDGER.md — is entirely untracked, so the committed record reads more complete than it is. Within that untracked corpus, the wave-shaping seed (VISUAL-GESTALT.md) omits 6 transcribed F-rows and 4 content A-asks from every family, which is exactly the point a silent drop originates when waves are cut from families rather than the full ledger. No true zero-trace drop exists yet because the ledger still lists every row, but the accountability chain is fragile and un-reconciled.

## Findings (3)

### [major] registry-outside-committed-record

**Claim:** The entire newest-feedback registry (BJ FEEDBACK-LEDGER, 50 F-rows + 17 A-asks, dated 2026-07-17) is untracked, yet the BI close commits the pull-forward waves that answer a cherry-picked subset of it — so the committed record and the imminent 7.0.0 tag present coverage of the 07-17 corpus as fait-accompli while the 60-odd un-booked remainder (several re-opening BI 'LANDED' claims: F47 dock greenfield-again, F48 all-glass-more-subtle, F16 timeline redesign, F18 metric/instrument-chassis remove) is invisible to git/CI/reviewers.

**Evidence:** `git status --short docs/tranches/BJ/` → `?? docs/tranches/BJ/` (whole tree untracked); `git log --oneline -- docs/tranches/BJ/` returns nothing; `git ls-files --error-unmatch docs/tranches/BJ/FEEDBACK-LEDGER.md` → 'did not match any file(s) known to git'. Meanwhile the answers ARE committed: BI.W-ENGAGE-AFFORD (A01) at ae29b00f, dialog-corner (F48) at 2764f60b/58fba6e6, GRADED-BACKDROP (F49/F50) at 24b63d01/189ae15c. package.json version=7.0.0 but `git tag` tops out at v6.0.0 (tag pending). FEEDBACK-LEDGER.md:5-6 itself asserts 'Every row must receive a terminal disposition… Silent drops forbidden' — a promise made only in an uncommitted file.

**Proposed:** build — land the FEEDBACK-LEDGER + BJ formation into the tracked record as a committed BJ.PLAN before the 7.0.0 tag, or add a committed BI-close note stating the 07-17 corpus is deferred-and-uncatalogued, so the tag's coverage claim is honest rather than implied by the isolated pull-forward commits.

### [major] family-seed-omission

**Claim:** Six transcribed F-rows and four content A-asks are cited by ZERO of the ten VISUAL-GESTALT families — the doc that is explicitly 'the SEED of the finding-family registry' from which BJ waves get cut — so they will drop the moment waves are shaped from families rather than the full ledger, unless the promised 'reconciliation at synthesis' (not yet performed; no BJ synthesis/registry doc exists) catches them. F14 ('audit ALL pages for optimized horizontal usage + proper mobile-first affordances') is the headline: a universal cross-cutting mandate with no family and no owner.

**Evidence:** grep -c in docs/tranches/BJ/formation/VISUAL-GESTALT.md returns 0 for each of F02 (ledger:14 /foundations blank cards), F07 (ledger:19 story-page transitions), F13 (ledger:25 sortable-list redesign), F14 (ledger:26 all-pages horizontal+mobile-first), F19 (ledger:31 alert not glassy/rounded), F23 (ledger:35 slider/progress DRY dedup), and for content asks A07 (ledger:74 colocation grand edict), A10 (ledger:77 aristotelian audit), A11 (ledger:78 breath-of-life check), A14 (ledger:81 procedural codification). VISUAL-GESTALT.md:3-6 states it is the seed and that 'reconciliation happens at synthesis'; `find docs/tranches/BJ` shows only VISUAL-GESTALT + PROMPTS + FEEDBACK-LEDGER — no synthesis/registry/wave doc yet. None of the six F-rows is booked in any committed BI wave (git grep confirms sortable-list appears only in BI FORMATION assays, not as an F13 redesign wave; no committed 'mobile-first' wave exists).

**Proposed:** build — a BJ ledger↔family reconciliation pass that assigns F02/F07/F13/F14/F19/F23 + A07/A10/A11/A14 to a named family (or an explicit retire-with-rationale) BEFORE any wave is cut; F14 in particular needs a first-class cross-cutting owner, not absorption into a screenshot family.

### [minor] recap-carry-unexecuted-at-close

**Claim:** Components the user ordered removed on 2026-07-11 (UF-K1: /data/metrics overfit→speedtest; UF-K5: prune superfluous; instrument-chassis) still ship undeleted at the 7.0.0 close and are RE-ASKED verbatim in the 07-17 corpus (F18 metric+instrument-chassis REMOVE, F26 completion-seal→speedtest), so a twice-issued removal ask rides a close undone and is being pushed into a third tranche — a re-booked prune the recap tracks but the close never executed.

**Evidence:** On disk at HEAD: src/components/metric, src/components/instrument-chassis, src/components/completion-seal all present. PROMPT-RECAP.md marks UF-K1/UF-K5 status UNADDRESSED owner B8 (lines ~448-452) and WS4-16/17 'RE-OPENED'; addenda REGISTRY C-2 notes 'metric quad already belongs to P117 consolidation' (consolidate ≠ remove). FEEDBACK-LEDGER F18 (line 30) and F26 (line 38) re-order the same removals on 07-17.

**Proposed:** fold into the BJ prune band / questions-in-reduction ASK (VISUAL-GESTALT family 10) as a DECIDED remove-or-keep row, flagged as a carry from UF-K1 (07-11) so it is not silently re-booked a fourth time.

