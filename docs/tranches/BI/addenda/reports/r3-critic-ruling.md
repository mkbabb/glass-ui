# R3 critic — gate-ruling fidelity · KISS · executability (critic 3 of 3)

Posture: non-author critic. Job = find what the registry/plan MISSED or got WRONG.
Fence: glass-ui + siblings READ-ONLY (read-only git only); one write (this file).
Method: read REGISTRY + ADDENDA-PLAN-DRAFT + all 8 supporting reports, then verified the
executability claims against the live working tree on disk. Every finding below carries a
grounding.

**Verdict: NOT clean.** 5 major + 3 medium + 3 minor. The plan is admirably clean on the
headline risk (residual standing-gate language is nearly absent — see the CREDIT section), but
it is process-wave-heavy against the user's "majority effort on code + visual" directive, and it
under-specifies sequencing against the codex's live 955-row transaction in ways that will either
duplicate their work or collide with their open files.

---

## VECTOR 1 — the gate ruling (residual gate-minting + abrogation over-reach)

### CREDIT (genuine-try result, stated for honesty)
I swept every wave's acceptance clause for residual gate-minting language
(invariant / probe / check / born-RED-script / census-script). The plan is **clean**: Q010
"No census script, no gate"; Q020 "No census script"; Q041 "NO standing grep, no CI line";
Q042 "No line-count law"; Q002 "no npm script, no workflow, no proof file is minted"; Q034 fully
abrogated; Q040 re-labels invariants.json DESCRIPTIVE CANON and deletes no-masking-manifest.mjs.
The registry's F-2 "born-RED invariant" language was correctly reshaped in the plan.

I also tried to break the **reverse** (abrogation over-reach — a place with NO way to notice a
user-observable regression). It mostly holds: structure org (Q034) is not user-observable, so
N-6 litmus correctly says don't gate it; no-masking (F-4) is covered by the Q003 paint lane
incl. the webkit/Safari project; export-name drift is caught by the standing
`public-surface.spec.ts`; prop/binding drift and a11y-in-paint are caught by the pre-tag lane.
**The one real detection gap is demo:boots — R3-3 below.**

### R3-9 [minor · gate-ruling wording residue] Q061 "ONE pre-publish invariant line"
Q061 says the addenda "adds ONE pre-publish **invariant** line (release.sh: `npm view` …)."
The ruling sweeps exactly this word. The *thing* is ruling-permitted (the ruling explicitly
allows a "producers-published check for staged peers" as a release.sh checklist line), so keep
the line — but rename "invariant line" → "checklist line." Left as-is it reads as a minted
invariant, which is the language the ruling kills. (The registry E-1 row carries the same
"sequencing invariant" phrasing; scrub both.)

---

## VECTOR 2 — KISS / parsimony

### R3-1 [MAJOR · KISS] The plan is process-wave-heavy against the user's stated priority
Roughly **13 of ~25 waves are pure document / disposition / process** (Q034, Q040, Q050, Q060,
Q061, Q062, Q070, Q071, Q072, plus the Q021 decision and the Q051 roster). The user's binding
directive is "the majority of effort on direct code implementation + visual verification." The
direct-code waves (Q010, Q020, Q023, Q030–Q033, Q041, Q042) plus paint (Q002/Q003/Q022) are the
right spine; the process tail is over-subdivided. Concrete folds with zero loss:

- **Band 8 → 1 wave (from 3).** Q070 (process-codex) and Q071 (triumvirate-dispatch) both land as
  docs in the *same* addenda folder — fold to one process doc. Q072 (precept proposals) is the
  only precepts-repo-facing deliverable; either fold it in as a section or keep it as the single
  proposal doc. Net: 3 → 1 (or 2).
- **Q050 + Q062 → 1 "TERMINAL-DISPOSITIONS" ledger wave.** Both are "write DECIDED rows into a
  ledger" (chronic dispositions + retro-stub/provenance dispositions). Same act, same artifact.
- **Q060 + Q061 → 1 "COORDINATION-OUTBOUNDS" wave.** Both are consumer-coordination doc writes;
  Q061's one release.sh checklist line rides alongside the atlas outbounds.
- **Q034 → a line inside Q040.** Q034 is a pure disposition (MS9/P013 RETIRED-TERMINAL + review
  language, no code). It is one sentence of the verification-posture declaration Q040 already is.

Net effect: ~5–7 fewer waves, denser, code-forward.

### R3-1b [MAJOR · contrivance-about-process] Q071 is the "more-ceremony" trap the process report warns against
process-lessons §0/F-7 is explicit: "a postmortem that … prescribes the machine that got
abrogated has not learned the load-bearing lesson," and warns against single-pole "more machine."
Q071 codifies a **5-lane anomaly-dispatch protocol** (RESEARCH/HARDEN/WAVE-UPDATE/MODIFY/ADDENDA)
as its own wave + "addenda law." Minting a triage machine as a standing law is exactly the
ceremony the user's ruling and this very report are skeptical of. Demote it: fold into the single
Band-8 process doc as *description of what this session already did*, not a mandated protocol wave.

### R3-11 [minor · redundancy] Q021 DOCK-FISSION-RATIFY overlaps Q051
H-2 and I-5 already route the dock-fission ratify-or-rebuild decision and the dot-flow-halftone
revival to "→ Q051 row." The *pre-decision* act ("present the decision with evidence") IS a Q051
judgment-roster row — user-gated, evidence-attached, fired once. Only the *conditional REBUILD*
(if the user picks rebuild) is a real code wave. Fold the decision into Q051; mint the rebuild
wave only on that ruling. As a standalone Band-3 wave, Q021 double-books the same user gate.

---

## VECTOR 3 — executability by the ACTIVE codex agent mid-transaction

### R3-2 [MAJOR · duplicates in-flight work] Q043 CI-CONSISTENCY is already done by the transaction
Verified on disk (working tree, not index):
- `/.github/workflows/ci.yml` is **already** exactly `npm ci → typecheck → test → build`, **no
  verify.mjs** (full file read; it is 24 lines, clean).
- working-tree `release.yml` has no `verify.mjs`/`cursor`/`playwright` (grep empty).
- `.githooks/commit-msg` is ` D`; `git grep verify.mjs -- .github package.json` → empty in the
  working tree.

So the codex transaction has **fully achieved CI-consistency**. Q043 as written ("CI shrinks…;
no dangling verify.mjs refs; .githooks emptied") is not fresh work — it is describing the
transaction's already-staged state. Reframe Q043 as **VERIFY-ONLY**: confirm the workflow edits +
the verify.mjs deletion land in the *same* commit (the only real hazard, E-2). Do not present it
as deletion work to perform.

Corollary — **inbox item (3) is stale.** "CI dangling verify.mjs refs at their commit boundary"
describes refs that are already gone in the working tree. Reword to the true residual: "keep the
workflow edits and the verify.mjs deletion in one commit" (which is the default, since they are
one transaction). As written it risks telling codex to fix something they already fixed.

### R3-4 [MAJOR · file collision, missing sequencing note] Q041 DEMETA-SCRUB collides with 125 in-flight demo files
Verified: `git status --porcelain -- demo/ | grep -c '^ M'` = **125**. The named meta-token
carriers are among them — `demo/main.ts`, `demo/router.ts`, `demo/shell/AppShell.vue` are all
` M`. Running the 259-comment / 97-file scrub as a *separate later pass* re-touches files the
codex already has open across a 955-row transaction — conflict-prone and wasteful. The wave MUST
carry a sequencing note: **fold the scrub into the codex's in-flight transaction (same edits,
before their commit), not a second pass.** The task brief flagged this; the plan has no such note.

### R3-6 [MEDIUM · file collision] Q032 MOTION-SPLIT collides with the in-flight motion clean-break
Verified: `src/composables/motion/` is heavily churned right now — deletions of `curves.ts`,
`suite.ts`, `useGooMorph.ts`, `useCharStagger.ts`, `morphSignatures.ts`, `gooBarbellGeometry.ts`,
`usePrioritizedTask.ts`; `useReducedMotion.ts` untracked; ~20 files ` M`. The plan's "42 files →
7 buckets" roster is a **moving target** until the clean-break commits. Q032 must be sequenced
strictly AFTER the transaction lands, with its file roster recomputed post-commit — and, per the
ADDENDA discipline ("never smuggle into the current commit," process-lessons §4), as its own
later commit, not inside the 7.0.0 transaction.

### R3-7 [MEDIUM · missing global sequencing] No partition of ride-the-transaction vs post-commit waves
The plan never states which waves belong INSIDE the codex's current 7.0.0 transaction (Q041 scrub;
Q043 verify) versus which must land as their OWN post-commit addenda commits (Q030/Q031/Q032
structural moves, Q042 monolith splits). Handing 25 waves to an executor mid-955-row-transaction
without this partition forces them to guess sequencing. Add a one-paragraph ordering: (1) waves
that ride the current transaction, (2) tag the 7.0.0 cut, (3) post-tag addenda commits, (4)
pre-next-tag paint lane. This is the single highest-leverage executability fix.

### R3-8 [MEDIUM · fence vs delivery] The inbox note can't be written into the read-only repo by the fenced agent
The plan slots the inbox note as "one new file at placement" in
`docs/tranches/BI/coordination/` — inside glass-ui, which is READ-ONLY to the addenda-forming
agent (and Q063 itself states "our fence: no repo writes"). Placing a file there is a repo write
the fence forbids. Clarify the delivery mechanism: relay via SendMessage, or stage the note in the
addenda folder for the codex/user to place — not written into the read-only tree by the fenced
agent. (release.sh checklist-line additions in Q002/Q061 inherit the same constraint: they are
codex/user edits, not addenda-agent edits.)

### R3-10 [minor · imprecise target] Q041 "105 .d.ts JSDoc comments" names build outputs, not source
`.d.ts` files are build OUTPUTS (dist/), regenerated on every build. The scrub target is the
SOURCE JSDoc in the `.ts` files (which the build emits into `.d.ts`), the 4 shader-string literals
(genuine source in aurora/blob/fourier-field/liquid-grid), and `drawer/constants.ts` JSDoc. State
the wave src-side; editing dist/`.d.ts` directly would be pointless (overwritten by the next
build). Otherwise the one-time RED→GREEN grep differential is measured against the wrong tree.

### Executability checks that PASSED (genuine try, no finding)
- Q033 SCRIPTS-PRUNE targets are real and still present (`audit-stash-list.mjs`,
  `worktree-gc.mjs` on disk; `reflect-capture-verify.mjs` correctly marked KEEP). Not impossible.
- No wave references a file the transaction deletes as if it still exists (Q062 correctly cites
  git-history SHA f20a2aa9 for the overwritten specs).
- `scripts/release.sh` exists (843 bytes) — the Q002/Q061 checklist-line additions are feasible.
  Note it currently carries only version/clean-tree/build checks; the ruling's "release.sh carries
  the only checklist lines" is forward-looking — the paint-lane and producers-published lines are
  real additions Q002/Q061 must author, not existing content.

---

## VECTOR 4 — the inbox-note sketch

### R3-5 [MAJOR · critical alarm omitted] Q063's media-preservation is NOT in the inbox note it claims to be in
Q063 (I-6, severity CRITICAL — "the entire motion/dock/glass calibration is one cleanup away from
unre-derivable") states: "Flagged in the inbox note." But the inbox note's six items are:
(1) dev server dead, (2) co-land sequencing, (3) CI verify.mjs refs, (4) aurora wedge-catch,
(5) addenda pointer, (6) husks + P044/P059 stub truth-up. **There is no media-preservation item.**
The single most severe preservation risk in the whole audit is absent from the batched note.
Add it as item (7): "authoritative iOS-27 source videos live ONLY in ~/Downloads/New Folder With
Items 4/ — copy to a durable in-repo/archive location + record SHAs before any cleanup." This is
the one inbox item where omission is itself the risk.

### R3-3 [MAJOR · orphaned standing check / under-reach] demo:boots is named but no wave builds it
The ruling preamble lists `demo:boots (new, product-coupled)` as one of the **four standing
automated checks**, and F-2 wants it "minted." But:
- Verified: package.json has **no** `demo:boots` script (only `demo:serve`, `dev`,
  `demo:dist:build`, `demo:dist:serve`).
- Q002 treats booting as a *manual look* in the pre-tag lane ("a look, not a gate").
- Q043 only shrinks CI; it does not add demo:boots.
- No other wave owns it.

So the plan asserts demo:boots is a standing check in two places yet no wave creates or wires it —
an orphaned check, and the *only* genuine detection gap left by the abrogation. Resolve the
inconsistency one way: either (a) give it a concrete owner — a tiny product-coupled smoke that
boots the demo, asserts the app mounts, and is added to CI + release.sh (justified under N-6:
un-bootable = user-observable) — or (b) drop the "standing automated check" claim and rely solely
on the Q002 pre-tag look, accepting that un-bootable is caught only at tag time. The plan must not
claim both. Given F-1 (the demo is un-bootable *right now* in the working tree) and F-2's intent,
(a) is the ruling-faithful choice.

### Inbox-note items that are fine (genuine try)
Item (1) dev-server-dead, (4) wedge-catch paint check, (5) addenda pointer, (6) husks + stub
truth-up are correctly batched, non-interrupting, and non-duplicative. Item (2) co-land is
borderline (codex already owns the co-land per E-1/USER MARK) but defensible as a safety-net
reminder tied to the Q061 release.sh line — keep it, scrub the word "invariant" (R3-9).

---

## Summary table

| id | sev | vector | one-liner |
|----|-----|--------|-----------|
| R3-1 | major | KISS | ~13/25 waves are process-doc; fold Band 8→1, Q050+Q062→1, Q060+Q061→1, Q034→Q040 |
| R3-1b | major | KISS | Q071 codifies a triage machine as law — the "more-ceremony" trap the process report warns against; demote to description |
| R3-2 | major | exec | Q043 CI-consistency already done in the working tree (ci.yml/release.yml clean, hook deleted) — reframe VERIFY-ONLY; inbox item (3) stale |
| R3-3 | major | gate/exec | demo:boots named as a standing check in 2 places but no wave builds it; no such npm script exists — the one real detection gap |
| R3-4 | major | exec | Q041 demeta scrub collides with 125 in-flight demo M files — must ride the transaction, not a second pass (no sequencing note) |
| R3-5 | major | inbox | Q063 says its CRITICAL media-preservation is "flagged in the inbox note" — it is not; add item (7) |
| R3-6 | medium | exec | Q032 motion-split collides with the live composables/motion clean-break; roster is a moving target; sequence post-commit |
| R3-7 | medium | exec | no partition of ride-transaction (Q041/Q043) vs post-commit (Q030–Q032/Q042) waves |
| R3-8 | medium | fence | inbox note + release.sh lines are repo writes the read-only fence forbids; clarify relay/codex-places |
| R3-9 | minor | gate | Q061 "ONE pre-publish invariant line" → "checklist line" (word "invariant" is swept language) |
| R3-10 | minor | exec | Q041 "105 .d.ts JSDoc" names build outputs; scrub SOURCE JSDoc so build regenerates clean .d.ts |
| R3-11 | minor | KISS | Q021 dock-fission decision double-books the Q051 gate; fold decision into Q051, mint rebuild only on ruling |

Grounding: working-tree `.github/workflows/ci.yml` (read in full, 24 lines, no verify.mjs);
`git grep verify.mjs -- .github package.json` → empty; `.githooks/commit-msg` ` D`;
`git status --porcelain -- demo/ | grep -c '^ M'` → 125; `src/composables/motion/` deletion+M set;
package.json scripts (no demo:boots); `scripts/release.sh` (843 bytes, version/clean/build only).
Plus the 8 supporting reports (gates-consumers, r2-{edict,structure,consumer}-verify, tree-census,
process-lessons, media-analysis, proportion/motion audits).
