# FIXLOG — STAB11 (round 11 fixer)

**Date:** 2026-07-20 · **Mode:** mechanical application, zero judgment · **Model:** claude-opus-4-8[1m]

**Result: 12 APPLIED · 0 ESCALATED.**

Every cure was applied byte-exactly at its named anchor. Replacement text was extracted
programmatically from the published cure blocks in `STAB11-COHERENCE.md` /
`STAB11-COMPLETENESS.md` rather than retyped, so no transcription drift is possible. Every
application was guarded by a start-anchor AND end-anchor assertion on the target lines; a failed
assertion would have aborted the write and escalated the row. None failed.

**HARD FREEZE upheld.** No `ASK.md` or `ASK-REDUCTION.md` row was renumbered, reworded, merged or
re-scoped by this round — see §Working-tree note.

---

## Applied cures

| # | Target | Cure | Status |
|---|---|---|---|
| 1 | `EXECUTION-PROGRESS.md:61` | P-EX2 roster completed — STORY W7, A11Y W3/W4/W5, FM W7 restored to the pipeline | **APPLIED** |
| 2 | `waves/APOTHEOSIS.md:67-71` | §3 phase-0 roster completed — GATES W3 + A11Y W4 scheduled (5 lines → 17) | **APPLIED** |
| 3 | `PLAN.md:151-154` | FAMILY C W3 — `Configurator` + `useStagger` struck from the deletes as OVERTURNED-to-KEEP | **APPLIED** |
| 4 | `PLAN.md:193-195` | FAMILY E W3 — shared feTurbulence def STRUCK/REFUTED, once-and-cache fence substituted | **APPLIED** |
| 5 | `PLAN.md:256-258` | FM W5 `BJ.W-IDLE-BREATH` marked HARD-BLOCKED on OPEN-FM-3 / ASK-27 | **APPLIED** |
| 6 | `waves/BAND-REDUCTION.md:529` | W5 `Depends on:` — `ASK-7/A5` → `ASK-7`, RU-09 internal numbering removed | **APPLIED** |
| 7 | `formation/ASSEMBLY-CROSSWALK.md:221-223` | F12/F17 bullet — F12 → regression-guard, F17 → born-RED FIX | **APPLIED** |
| 8 | `formation/ASSEMBLY-CROSSWALK.md:236-239` | Reconciliation item 2 — A01/A11 re-landed at `BJ.W-IDLE-BREATH` (W5) | **APPLIED** |
| 9 | `waves/BAND-MATERIAL.md:762` | **M-1** — Wave 8 `BJ.W-REFRACT-LATCH` inserted (75 lines) | **APPLIED (first)** |
| 10 | `PLAN.md:17` | **M-2** — ONE → TWO known 7.0.0 defects, both legs in order | **APPLIED (after M-1)** |
| 11 | `EXECUTION-PROGRESS.md:75` | ASK-15 / ASK-16 / ASK-17 added to the ASK-gated PARKED register | **APPLIED** |
| 12 | `waves/BAND-REDUCTION.md:767` + `:769` | Still-OPEN register — 2 PARKED-UNROUTABLE marks + `A2`→`ASK-6/§C1` + `A5` dropped | **APPLIED** |

---

## Application notes

**Ordering.** The M-1 → M-2 precedence was honoured: `BJ.W-REFRACT-LATCH` was minted in
`BAND-MATERIAL.md` before `PLAN.md:17` was rewritten to cite it, so the plan never referenced a
wave that did not yet exist on disk. Multi-block edits inside one file (`PLAN.md` ×3,
`ASSEMBLY-CROSSWALK.md` ×2) were applied bottom-up so no earlier edit shifted a later anchor.
Cures 1, 6, 10, 11 and 12 are single-line edits and shift nothing.

**One formatting deviation, recorded for completeness (cure 9).** The M-1 block was inserted
verbatim, complete, ending with its `---` separator as specified. A single blank line was added
between that trailing `---` and the following `## §Band-level obligations & OPEN roll-up` heading,
matching the separator style already used everywhere else in `BAND-MATERIAL.md` (`---` / blank /
heading). This is whitespace only — no cure character was altered, added or dropped.

**Residual greps that are NOT un-swept sites.** Two post-application searches still hit the old
strings; both are the cure's own quotation of the prior text inside a dated correction bracket, and
both were confirmed by context read:
- `PLAN.md:208` — `"**the shared feTurbulence filter def**"` inside the STAB11 bracket. The W3
  deliverable line itself (`:204-206`) is the cured text; the struck arm does not survive as a
  deliverable.
- `BAND-REDUCTION.md:529` — `the prior "ASK-7/A5"` inside the STAB11 bracket. The live
  `Depends on:` cite is now `**ASK-7**`.

**Working-tree note (not this round's work).** `git status` shows `ASK.md` and
`ASK-REDUCTION.md` as modified. Those edits are dated **STAB8/STAB9** and were already present in
the working tree when this round began; the fixer opened neither file for write. Verified by diff:
`ASK.md` carries one STAB9 arithmetic truth-up bracket on the `scene`-type row, `ASK-REDUCTION.md`
the STAB8/STAB9 `useTextHighlight`/A13 and `scene` brackets. Also pre-existing and untouched by this
round: `formation/REGISTRY.md`, `formation/refable/LEAD-AMENDMENT-LEDGER.md`,
`formation/stability/STAB9-COMPLETENESS.md`, `../IOS27-MICRO/FINAL/FINAL.md`.

**Escalations:** none. No anchor had moved, no target was ambiguous, and no cure required
improvisation.
