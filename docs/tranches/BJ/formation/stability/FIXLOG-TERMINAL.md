# FIXLOG-TERMINAL — the terminal invariant-fixer pass (mechanical, zero judgment)

- **Seat:** TERMINAL invariant FIXER. **Model:** `claude-opus-4-8[1m]` (read verbatim from this
  seat's system context: "The exact model ID is claude-opus-4-8[1m]").
- **Applied:** 2026-07-20, working tree over HEAD `97843257` + the uncommitted STAB9/10/11/12 cure set.
- **Inputs:** 2 invariant cures (I2 · UNSWEPT 1; I5 · UNSWEPT 2) + 9 advisories (A1–A5 from the
  coherence lens, ADVISORY 1–4 from the completeness lens).
- **Tally: 2 cures APPLIED byte-exact · 0 escalated · 0 minted.** Both landed verbatim as charted;
  neither required substance re-derivation.
- **HARD FREEZE honored.** Neither cure touched `ASK.md` or `ASK-REDUCTION.md`. No ASK row was
  renumbered, reworded, merged, or re-scoped. No pending-ruling row was treated as a finding.
- **NO NEW MINTING honored.** No wave was chartered, moved, or re-scoped. I2's cure strikes a
  duplicate *seat*, not a wave; I5's cure stamps a *cell*, not a routing.

---

## The ledger

### I2 · UNSWEPT 1 — REDUCTION W7's double seat — **APPLIED (byte-exact)**

`docs/tranches/BJ/waves/APOTHEOSIS.md:104`. Phase 1 seated `REDUCTION W4/W6/W7/W9` while phase 2
(`:109`) seats `REDUCTION W7` again; phase 1's own parenthetical forwarded W7 to MATERIAL W3, which
is itself a phase-2 wave — so the map pointed forward out of the phase it had just seated the wave
in. §3 declares itself "the corpus's ONE scheduling map" (`:96-98`), which is exactly the clause a
two-seat wave defeats.

Line 104 replaced in full with the charter text:

> `stub chartered · REDUCTION W4/W6/W9 as their ASK rulings land. REDUCTION W7 is NOT seated here: it is sequenced WITH MATERIAL W3 and therefore lands in phase 2 below — one wave, one phase.`

**Verified post-apply:** `REDUCTION W7` now matches at exactly one *seat* in the file — phase 2,
`:109`, byte-unchanged — plus the explicit non-seat disclaimer at `:104`. No wave moved phase; the
duplicate seat was struck, not relocated.

**Subsumes ADVISORY 2** (completeness lens), which proposed the narrower cure of dropping `/W7` from
the phase-1 list and letting the bare parenthetical carry the forward pointer. The applied charter
text is strictly stronger — it names the destination phase explicitly rather than requiring the
reader to chase MATERIAL W3 to discover it — so the advisory is discharged by the cure, not deferred.

### I5 · UNSWEPT 2 — the unstamped G-CLOSE veto row — **APPLIED (byte-exact)**

`docs/tranches/BJ/coordination/ATLAS-Q-G-BATCH-DISPOSITION.md:16`, third cell. The head disposition
table still asserted the veto live ("no shipped-primitive work until the owner confirms … enters the
BJ wave set VETO-GATED") with no supersession stamp between it and Addendum 3 at `:80`, which rules
the opposite. The file applies the stamping convention everywhere else — `:65-69` stamps both the
Addendum 1/2 block and the 07-19 owner ruling, closing with "Read Addendum 3 as terminal" — leaving
this row the single unstamped survivor, and the row Addendum 3 is specifically *about*. Band files
point at the TABLE, so a reader citing the surface of record read a live veto.

Appended inside the same table cell, at the end of the third cell:

> `**[SUPERSEDED 2026-07-20 by Addendum 3 (`:80`) — the deferral is lifted, the hold ends, G-CLOSE is UN-GATED, and `V-PERCH-PRIMITIVE` (FINAL W-5) is UN-PARKED on its merits. This cell is the 2026-07-19 disposition of record, retained as dated history. Read Addendum 3 as terminal.]**`

**Verified on disk before applying** (the cure asserts three facts; all three confirmed):
Addendum 3 sits at `:80` and is titled TERMINAL; its ruling text reads "the deferral is lifted, the
hold ends, G-CLOSE is UN-GATED"; `V-PERCH-PRIMITIVE` (FINAL W-5) is UN-PARKED at `:106`. The row
remains one table row, pipe-count unchanged, and the 07-19 disposition text is retained verbatim as
dated history — nothing was struck.

**Doctrine alignment:** matches the pass's stated current doctrine (Q mailbox RESUMED, G-CLOSE
UN-GATED per disposition Addendum 3, `V-PERCH-PRIMITIVE` un-parked).

---

## Advisories — NOT APPLIED, and why

All nine advisories arrived explicitly marked optional and at the owner's/lead's discretion, and all
nine are declared by their own lenses as non-counting toward unswept and non-blocking to
convergence. This seat is chartered as the *invariant* fixer with zero judgment; an advisory is by
construction a judgment call about form, emphasis, or readability. **Applying them would have been
this seat exceeding its charter, so each is recorded here as a live surface for the capstone/lead
rather than silently absorbed or silently dropped.** None of them needs a new wave, so none was
routed to `TERMINAL-ROUTINGS.md` — recording them here IS their routing.

| adv | site | the ask | disposition |
|---|---|---|---|
| A1 | `waves/BAND-GATES.md:60` (also `:45`, `:72`, `:161-162`) | retitle W1 so the loose `~45-55` band stops reading as a second figure beside the authoritative `≤ 51` pin at `:107-108` | NOT APPLIED — both figures are in the owning file (I1 intact) and `≤51` sits inside `~45-55`, so there is no contradiction to cure. Retitling is an emphasis judgment. |
| A2 | `waves/APOTHEOSIS.md:104` | the narrower W7 de-duplication | **DISCHARGED by the I2 cure** — see above; strictly subsumed. |
| A3 | `ASK-REDUCTION.md` §C3 | disclosure that rounds 8/9 edited a to-be-ratified table body rather than bracketing it | NOT APPLIED — **HARD FREEZE forbids this seat touching `ASK-REDUCTION.md` at all.** Logged verbatim as an owner-visible disclosure. The lens itself scores I4 as passing. |
| A4 | `PLAN.md:227` → `REGISTRY.md:146` | give the stale V-A95 "ACTIVE RED, carried" wording a DOC-TRUTH row, or declare `REGISTRY.md` a dated audit record under R-4 | NOT APPLIED — the choice between the two remedies is a lead call, and the R-4 route reclassifies a whole file. **The weak-owner condition is real and unresolved: `PLAN.md:227` routes to "the next registry re-stamp", which names no owner on disk, and BAND-DOC-TRUTH's roster has no REGISTRY row (T39 covers only `ASSEMBLY-CROSSWALK.md:5`).** Flagged for the capstone seat. |
| A5 | `waves/APOTHEOSIS.md:175` (invariant 10) | note that `BJ.W-IMMERSIVE-SCRIM` is conditional on MATERIAL W3 ruling DECLINE (OPEN-3c) and is not pre-chartered | NOT APPLIED — the lens states it is **correct by design** under NO-NEW-MINTING; the ask is readability only. Adding the parenthetical is safe but is an authoring judgment. |
| ADV 1 | `ASK-REDUCTION.md:247-256` | restore two struck clauses verbatim and move each correction wholly inside its dated bracket (strict-freeze form) | NOT APPLIED — **HARD FREEZE.** Note the lens verified both corrections are factually right on disk and that restoring the originals would re-assert two false claims (springProjection has three real importers and is a named GATES-W1 KEEP; `A13` was never minted). Form-only remedy, owner's call. |
| ADV 2 | `waves/APOTHEOSIS.md` §3 | duplicate of A2 | DISCHARGED by the I2 cure. |
| ADV 3 | `IOS27-MICRO/FINAL/FINAL.md:101`, `EXECUTION-PROGRESS.md:107`, `ASK-REDUCTION.md:256` | replace malformed trailing `**]**` with `]` | NOT APPLIED — zero semantic effect by the lens's own finding, and one of the three sites is inside `ASK-REDUCTION.md` (frozen). Applying two of three would leave the cosmetic class half-swept, which is worse than leaving it whole. |
| ADV 4 | `waves/BAND-GATES.md:269` → `BAND-MATERIAL.md:812-822`, now `:814-825` | re-pin the drifted line citation | NOT APPLIED — already recorded as ESCALATION NOTE 2 in `FIXLOG-STAB12.md:193-199` with the capstone seat named as conditional owner, so it is scheduled-if-wanted work and **not** a silent drop under I6. |

**On the one cure I wrote that the charter did not:** none. Every byte changed in this pass is
charter text.

---

## Post-apply state

- **unswept: 0.** Both I2 and I5 discharged at their sites, byte-exact.
- **Files touched: 2**, both docs, both left **uncommitted** per the charter:
  - `/Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/waves/APOTHEOSIS.md` (line 104 replaced)
  - `/Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/coordination/ATLAS-Q-G-BATCH-DISPOSITION.md` (line 16, third cell, appended)
- **No source (`src/`) file was touched.** No wave chartered. No routing added to
  `TERMINAL-ROUTINGS.md` — nothing in this pass needed one.
- **Carried for the lead/capstone:** A4 (the genuinely ownerless REGISTRY.md V-A95 re-stamp) is the
  one advisory with an unresolved on-disk gap rather than a discretionary preference. A3 and
  ADVISORY 1 are disclosures about the frozen ASK surface that only the owner can act on.
