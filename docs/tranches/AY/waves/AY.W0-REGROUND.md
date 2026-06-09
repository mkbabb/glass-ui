# AY.W0 — REGROUND (re-ground the AUDIT-LEDGER to HEAD)

**Tranche** AY (glass-ui) · **Wave** W0-REGROUND · **State** NET-NEW · **Band** step-0
(blocks ALL Band A; runs before any impl wave dispatches) · **HEAD** `fba6262`
(`at-dock-convergence`) · **Source risk** ZERO (docs + one gate script; no `src/` edit)

---

## §0 — RE-GROUND scope EXTENSION (from `audit/hardening/b2/B2-readiness.md` §3 + B2-con1/B2-blob)

The Batch-2 hardening surfaced THREE re-ground obligations beyond the original AUDIT-LEDGER restamp.
W0-REGROUND OWNS all three (it is the re-ground-to-HEAD wave; these are exactly its class). The gate
mint (edit-site 2) is also re-affirmed as a HARD precondition — several waves depend on it.

**RG-X (the gate is UNLANDED + load-bearing — it is a HARD precondition, not optional).** W0-REGROUND
was SPECCED to mint `proof:ay-w0-reground` but the script was NEVER landed and `PROGRESS.md` lists
this wave `planned`. **W-AUR2 G4 reads this gate** (`AY.W-AUR2.md` §0 RG-A) and is UN-CLOSEABLE until
it exists. So minting `scripts/proof-ay-w0-reground.mjs` (edit-site 2) is a BLOCKING obligation: W0
runs FIRST in the impl sequence and W-AUR2 serializes after it. Confirm at close that the gate exists,
is wired into `proof:all`, and is RED-witnessed (the §HARD GATE bite).

**RG-Y (restamp PROGRESS.md too, not only AUDIT-LEDGER).** `PROGRESS.md` is stale vs reality:
`W-CARDINAL-INFRA` + `W0-REGROUND` read `planned` (`PROGRESS.md:51-52`) but `proof:live-verified-ledger:ay`
is WIRED (`package.json:696`) and 8 own-surface DELTAs landed (W-DOCK1/W-CON1/W-BLOB2 + more). An agent
reading PROGRESS to gauge readiness gets the WRONG picture. EXTEND the restamp to the `PROGRESS.md`
status rows: a row whose substance landed reads its true status (`W-CARDINAL-INFRA` the gate is wired →
reflect it), not a stale `planned`. The clause-(d) closed-vocabulary check extends to the PROGRESS
status column.

**RG-Z (the cardinal-lesson inflation at the PROGRESS roll-up — honest restamp of the overstated
visual rows).** The B2 refinement (`B2-con1` F2/F3, `B2-blob` F2/F3) found the W-CON1 + W-BLOB2 rows
read a clean confident `live-verified` while their captured DELTAs are partly GAMED: W-CON1's four
"mobile" PNGs are 1280×721 desktop screenshots showing a sparse left column (not the filled box, no
focal); W-BLOB2's mood frames are 5 static red frames (no readable lean) + the mood surface never
shows the cream default. This is the MEMORY "live-verify capture" inflation recurring at the PROGRESS
roll-up. The honest restamp: those rows carry a `live-verified (RG-noted: DELTA re-capture owed —
see <wave> §0 RE-GROUND)` qualifier, NOT a clean `live-verified`, until the W-CON1 RG2 / W-BLOB2
RG2/RG3 re-captures land. The DELTA-honesty debt is real and must not be papered over by a green
PROGRESS cell. (The engine LOGIC is sound — this qualifies the CAPTURE claim, not the code.)

**RG-W (the +9 package.json cite drift is universal — mandate a re-grep note).** Batch-2 added AY proof
scripts, shifting every `package.json:6XX` script-line cite ~+9 across the remaining specs (`gates.mjs`
+ in-script cites are accurate; only package.json drifted). W0 records the cross-cutting mandate: an
executing agent trusts the gate-ID and re-greps the package.json line, never the stale cite (the
stale-worktree-trap step-0 discipline, applied tranche-wide).

---

## Defect (file:line, source-grounded)

The `AUDIT-LEDGER.md` was authored when the 32-agent AY pre-audit hit the session
limit and was **never re-synced to AX HEAD** (the "Workflow stale-worktree trap" the
user's own MEMORY records). It marked ≥6 shipped-and-gated features
UNADDRESSED/DEFERRED/CHRONIC. A planner trusting those labels dispatches agents to
**RE-BUILD green code** — re-introducing a second warp seam, a third slider variant, a
parallel `--touch-target` axis, a from-zero fourier element. This is the single
highest-leverage defect in the AY plan: it mis-routes ~7 waves to confirm-not-build
or, worse, to churn-and-regress on passing gates. Six independent hardening lanes caught
the same mis-marked rows (`H-convergence` F1, `H-precept-drift` F1-F4, `H-past-conversation`
§§1-4 + correction table, `H-chronic-defer` §3, `H-overfitting` F1, `H-gaps-master` G1/C3).

The mis-marked rows, each refuted against live HEAD source this pass:

| ledger # | ORIGINAL (stale) status | HEAD refutation (verified `fba6262`) | landed SHA |
|---|---|---|---|
| 2 (constellation click-warp) | "UNADDRESSED — neither copy warps" | `warpOnClick` SHIPPED AX.W17; `Constellation.vue` + `constellationField.ts` carry the focal-warp spring; `proof:constellation-warp-live` in `package.json` GREEN | `45cfb79` |
| 4 (touch-target/type-scale) | "DEFERRED — only dock; no library-wide system" | `--ui-scale` master scalar + `--control-floor`/WCAG-44 `--touch-target` clamp SHIPPED AX.W51 (`tokens.css:1172,1184-1205,1785-1788`); `proof:ui-scale` in `package.json` GREEN | `7952cd1` |
| 8 (fourier-field) | "DEFERRED — research-only" | element EXISTS, exported `/fourier-field` (`package.json:296`), LIVE-consumed by 2 external slides; BUT W43 intensity never landed (`OUTLINE_PEAK_ALPHA` survives in `FourierField.vue`, quadratic decay) | (element pre-AX; W43 spec born-RED, unbuilt) |
| 9 (slider zoo) | "DEFERRED — no consolidation" | zoo COLLAPSED to EXACTLY `standard`+`spectrum` AX.W59 (`slider/index.ts:42` two-key CVA); `proof:slider-two-only` CI GREEN | `a730782` |
| 14 (component READMEs) | "DEFERRED — aurora/blob/dock not written" | all 4 READMEs EXIST (aurora 702, blob 422, dock 299, constellation 381 lines) | (pre-AY) |
| 25 (access-key modal) | "DEFERRED — not done" | `DeckGate.vue` ALREADY glass-ui-styled (slides repo) | (slides, pre-AY) |
| 1 (constellation first-class) | "PARTIAL" | EXPORTED `/constellation` subpath (`package.json:316`) + api types (`src/api/index.ts:209-221`) | `45cfb79` |

The ledger has **already been re-stamped this pass** (`AUDIT-LEDGER.md:3` —
"RE-GROUNDED to HEAD … per AY.W0-REGROUND"). This wave's job is to make that re-ground
**falsifiable** — to author the gate that proves the re-stamp is correct AND stays correct
against HEAD source, so a future drift (a stale label re-introduced, a SHA that becomes
unreachable, a status contradicting source) reddens.

The institutional precedent is exact: `scripts/proof-au-w0-reground.mjs` did this for
the AU tranche (formalization-exists + SHA-ancestry + dispositioned-rows + no-stale-marker).
AY mints the parallel `proof:ay-w0-reground` keyed to AY's defect class (no
shipped+gated row marked undone).

---

## Goal criterion

The AUDIT-LEDGER reflects HEAD reality, not the session-limit draft: every row that
ships live-verified is marked DONE-VERIFY (AY captures the owed DELTA, does NOT
re-build); every DEFERRED/PARTIAL row names the **precise narrow residue** with a HEAD
file:line; and the re-ground is locked by a falsifiable gate so the drift cannot
silently return. A fresh auditor re-running the cross-walk against `AX/PROGRESS.md` +
the named proof gates + live source finds **ZERO row whose plan-status contradicts
source**.

## Completion criterion

`npm run proof:ay-w0-reground` exits 0 with its on-disk JSON artefact asserting all
four clauses (see HARD GATE). The gate is RED-witnessed: re-introducing any one stale
label, deleting any SHA-ancestry check, or removing any HEAD-evidence citation reddens
it. The gate is wired into `proof:all` so the AY close cannot run while the ledger is
stale.

---

## Edit-sites (exact)

1. **`docs/tranches/AY/audit/AUDIT-LEDGER.md`** — VERIFY the already-re-stamped rows
   against the H-touch-scale / H-slider / H-overfitting refutations. The re-ground
   discipline (DO NOT re-author from scratch; the re-stamp landed this pass — confirm
   it is correct and complete):
   - Every row in §B / §C / §D carries a `**status**` whose vocabulary is
     `DONE-VERIFY | PARTIAL | OPEN | DEBT | NET-NEW` (ledger:11-12).
   - Every DONE-VERIFY / PARTIAL row carries a HEAD-evidence cell with a **file:line**
     OR a **named proof gate** (the gate's existence in `package.json` is the citation).
   - Rows 1/2/4/8/9 each cite the landed SHA in the refutation table above
     (`45cfb79` / `7952cd1` / `a730782`) — these are the "already-landed" evidence the
     `H-overfitting` waveSpecInputs §1 hard gate demands.
   - ZERO row marks UNADDRESSED/DEFERRED what the refutation table shows shipped+gated.
   - The narrow residue is named per PARTIAL/DONE-VERIFY-with-OPEN row (e.g. row 4's
     "form-atoms off the axis + desktop-fluid body ladder + phantom `proof:touch-target`";
     row 9's "design contradiction: user wants rounded knob, gate locks not-a-circle";
     row 8's "W43 intensity never landed").

2. **`scripts/proof-ay-w0-reground.mjs`** (NEW) — the falsifiable re-ground meta-gate,
   modeled on `scripts/proof-au-w0-reground.mjs` (same house style: ESM `.mjs`, lazy
   memoized paths, byte-stable JSON artefact via `gate-output.mjs`, human summary,
   `process.exit(1)` fail-closed). Clauses:
   - **(a) ledger present + re-grounded header** — `AUDIT-LEDGER.md` exists and carries
     the `RE-GROUNDED to HEAD` marker (so a silent revert to the stale draft reddens).
   - **(b) the landed SHAs are ancestor-reachable from HEAD** — `45cfb79` (W17 warp),
     `a730782` (W59 slider), `7952cd1` (W51 ui-scale) all pass
     `git merge-base --is-ancestor <sha> HEAD`. Reddens if AY is ever re-based onto a
     tree where the re-ground basis is not real (the stale-base trap, machine-caught).
   - **(c) no stale label on a shipped+gated row** — for each of the 6 named gates
     (`proof:constellation-warp-live`, `proof:ui-scale`, `proof:slider-two-only`, plus the
     `/constellation`, `/fourier-field` subpath exports + the 4 README files), assert the
     gate/export/file EXISTS in source AND the corresponding ledger row does NOT carry a
     bare `UNADDRESSED` / `DEFERRED — no` / `not done` token. Reddens if a row regresses
     to a stale label while its evidence still ships.
   - **(d) every status row is from the closed vocabulary + cites evidence** — every
     numbered `| <n> | … |` row in §B/§C/§D carries one of
     `DONE-VERIFY|PARTIAL|OPEN|DEBT|NET-NEW` and a non-empty HEAD-evidence cell; ZERO row
     carries an un-grounded marker (`TODO|TBD|???|UNADDRESSED` outside a refutation
     context). Reddens if a row is added without a status or without evidence.

3. **`package.json`** — register `"proof:ay-w0-reground": "node scripts/proof-ay-w0-reground.mjs"`
   and add it to the `proof:all` aggregator (so the AY close gates on it; it is pure
   doc+gate work, no `src/` risk, so it CI-promotes freely).

---

## HARD GATE (evidence-backed)

**`proof:ay-w0-reground` exits 0** with its on-disk JSON artefact
(`.cache/gates/…ay-w0-reground.json`) asserting ALL FOUR clauses true:

1. `AUDIT-LEDGER.md` present + carries the `RE-GROUNDED to HEAD` marker (clause a);
2. the 3 landed SHAs `45cfb79` / `a730782` / `7952cd1` are ancestor-reachable from HEAD
   (clause b — the re-ground basis is REAL, not narrated);
3. for each of the 6 shipped+gated evidence artefacts
   (`proof:constellation-warp-live`, `proof:ui-scale`, `proof:slider-two-only`,
   `/constellation` export, `/fourier-field` export, the 4 README files) that EXISTS in
   source, its ledger row carries NO bare stale label (clause c — no row marks undone
   what ships live-verified);
4. every numbered status row uses the closed vocabulary
   (`DONE-VERIFY|PARTIAL|OPEN|DEBT|NET-NEW`) and cites HEAD evidence; ZERO un-grounded
   marker survives (clause d).

**RED-witness (the bite, demonstrated):** the gate is run twice at close —
(i) once over the re-grounded ledger → GREEN; (ii) once over a synthetic fixture (or a
one-line local edit, reverted) that re-introduces a stale `UNADDRESSED` on row 2 → the
gate exits 1 naming row 2. The artefact records both arms. This is the
`proof:au-w0-reground` self-proving pattern applied to AY's stale-label class.

**Why this gate, not grep:** a grep "the word DEFERRED appears N times" cannot see
whether a DEFERRED label is *correct* (a genuine OPEN) or *stale* (a shipped+gated row).
Clause (c) ties each stale-label check to the **live existence of the evidence** (the
gate/export/file is present in source) — so the gate fails only when a row contradicts
what HEAD actually ships. That is a falsifiable, artefact-verifiable condition, not an
"API exists" check (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`).

---

## What this wave does NOT do (scope fence)

- It does NOT capture any DELTA, fix any source, or touch the constellation/slider/dock
  surfaces — those are Band A impl waves (W-CON*, W-SLD*, W-DOCK*). W0 is a pure
  re-ground + gate.
- It does NOT author the other phantom waves (W-CON3, W-SCALE1/2, the slides L.W-*) —
  those are separate specs (the `H-gaps-master` G2 class). W0 unblocks them by ensuring
  they dispatch against an accurate ledger.
- It does NOT mint a parallel `--touch-target` axis or re-collapse the slider or
  re-build warp — the whole point is to PREVENT that mis-route.

## Named successor (on miss)

If clause (c) cannot go green because a row's evidence is genuinely ambiguous (the
shipped surface is partially broken, e.g. fourier W43), the row is marked
`DONE-VERIFY (element) · OPEN (W43 intensity)` with the precise residue and the OPEN
half routes to its named impl wave (W-FF2) — never a bare DEFERRED. There is no
cross-tranche deferral path for W0: it closes when the ledger is HEAD-accurate.
