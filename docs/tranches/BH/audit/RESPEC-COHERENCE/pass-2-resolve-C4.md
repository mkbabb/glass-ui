# BH Coherence Re-Spec — PASS 2 — RESOLVE C4 (single-writer symmetry) — mode: spec

**Cluster.** C4-single-writer-symmetry (the C4 [MED] convergence gap, PASS-2 focus item 4).
**Date.** 2026-06-30 · **HEAD** `eaf2c172` (mid-flight past COHERENCE.md's `f7dd6146` anchor; every C4 source doc reads identically at HEAD — re-verified fresh below, not taken from prose).
**siblings-intact.** exit 0 before + after (only file written: this report).

**The one-line resolution.** ABSORB the value.js peer-floor edit (`^1.0.0 → ^1.1.1`) into the `BH-B2.1-swap` single-writer block, so the "FINAL pre-cut `package.json` single-writer" claim (`bg-build-map.md:1184`) becomes LITERALLY TRUE and SYMMETRIC with the kf-peer bump (both peer-floor edits ride the ONE single-writer pass). `EXEC row 19.1` (`BG.W-CUT`) is then re-annotated to ASSERT the floor is correct (a verified precondition at the cut), NOT to perform a fresh `package.json` write. perfect-freehand is NOT a third writer (it drops at WS9, before B2.1-swap — no contradiction; do not touch it).

**Verdict: FEASIBLE — preferred option (absorb).** Plan-text only, no src touch, no feasibility spike. The value.js floor edit is a mechanical `package.json` write with no technical reason to defer to the tag-fire wave, and B2.1-swap ALREADY writes `package.json` (regen exports, `PLAN.md:68`), so the value edit rides the same pass at zero added multi-writer risk.

**convergencePct = 96.** Ready to amend the plan. The 4% residual is the fold-time cross-reference verification against BG's own `bg-build-map:707/717` (which lists "`package.json` (value.js `^1.1.1`)" inside `BG.W-GATE-FIELD-AURORA`'s Files) — resolved-in-direction below (§4), but the exact final BG-side sentence is the fold's act, not this spec's (write-fence: a BH pass cannot edit the BG-tree `bg-build-map.md`).

---

## §0 On-disk ground truth (re-verified fresh this pass — HEAD `eaf2c172`)

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0.

### The contradiction, confirmed literally on disk

| Claim | Verified anchor (HEAD `eaf2c172`) |
|---|---|
| B2.1-swap is declared the FINAL pre-cut `package.json` + ci.yml single-writer | `bg-build-map.md:1184` — "`BH-B2.1-swap` is the FINAL pre-cut `package.json` + ci.yml single-writer (after WS5∧WS6∧WS12, before `BG.W-CUT`; `B1-W2` is CLOSED on disk and CANNOT be the owner — the bump re-homes onto an UNRUN wave)." |
| BUT `EXEC row 19.1` (`BG.W-CUT`) lists a `package.json` peer-floor EDIT firing AT the cut | `EXECUTION-PROGRESS.md:319` — "…**mechanical CONSUMEs fire here:** value.js peer floor `^1.0.0`→**`^1.1.1`** … · kf 5.1.0 `DragOptions.snap`/`Oscillator` · DROP the dead `perfect-freehand ^1.2.3` (WS9)". `BG.W-CUT` is `BG/WS7`, PENDING, the tag-fire wave. |
| The value peer floor at HEAD is the pre-edit `^1.0.0` | `package.json:1080` peerDependencies `"@mkbabb/value.js": "^1.0.0"`; `:1118` devDep also `^1.0.0`. B1-W2 (`EXEC row 1.3`, `0d6b9f8a`, DONE) destraddled `^0.13.0 \|\| ^1.0.0` → single clean `^1.0.0` — so the `^1.0.0 → ^1.1.1` floor LIFT is genuinely still un-landed. |
| B2.1-swap already WRITES `package.json` (the single-writer basis) | `PLAN.md:68` — "regen `package.json` exports against the landed post-WS12 surface". `bg-build-map.md:1178` — "**BH-B2.1-swap** (regen-exports + classify + enumeration-re-pin + ci-re-emit) gated STRICTLY AFTER WS5∧WS6∧WS12, STRICTLY BEFORE `BG.W-CUT`." |
| BG.W-CUT fires the tag LAST (should not edit `package.json`) | `bg-build-map.md:753` — "`BG.W-CUT` [P] — the tag fires ONLY after `--run ship` passes over the served BG roster." `:1352-1353` — "…B2.1-swap … → WS7·CUT (the tag fires LAST, only after --run ship over the served roster)." |

**The defect stated precisely.** `BG.W-CUT` is the tag-fire wave; it runs `--run ship` over the FINAL served surface and then fires the irreversible tag. A `package.json` peer-floor EDIT at that wave is (a) a SECOND `package.json` writer after the declared "FINAL single-writer" B2.1-swap, and (b) worse — it edits the surface AFTER the `--run ship` gate that is supposed to certify the FINAL surface, so the tag would fire over a `package.json` the ship battery never validated at its final byte state. This is the C4-shape contradiction: the single-writer discipline names ONE last writable `package.json` wave, but the cursor row schedules a floor edit past it.

### perfect-freehand is NOT a third writer (confirmed — the approach's fence honored)

| Claim | Verified anchor |
|---|---|
| pf drops at WS9, BEFORE B2.1-swap (WS12) | `bg-build-map.md:977-979` — `BG.W-PAPER-CROSSREPO-ASKS` [WS9] Files: "`package.json` (drop perfect-freehand)". `bg-build-map.md:1262` — "DROP the dead `perfect-freehand ^1.2.3` at WS9 (`BG.W-PAPER-CROSSREPO-ASKS`)". |
| WS9 < WS12 (pf lands strictly before the single-writer) | `EXECUTION-PROGRESS.md:35` — "…→ WS9 → WS10 → WS11 → WS12". So pf is retired at WS9; B2.1-swap re-generates `package.json` at WS12 OVER the already-pf-dropped tree. |
| pf on disk at HEAD (still present, drop un-landed) | `package.json:1085` peerDep `"perfect-freehand": "^1.2.3"`; `:1107` peerDependenciesMeta optional. |

pf is a `package.json` writer, but it lands at WS9 — BEFORE the "FINAL pre-cut single-writer" B2.1-swap at WS12. The "FINAL" claim is about the LAST writable `package.json` edit before the tag; a WS9 edit that B2.1-swap re-generates over is not a contradiction (B2.1-swap's regen is the last WRITE, subsuming any earlier state). The row-19.1 "DROP perfect-freehand (WS9)" note is a CONSUME-ASSERTION (pf is absent by the cut, asserted-true), not a second edit at the cut — it correctly carries the `(WS9)` provenance. **Do not touch pf** (approach fence honored).

### The value.js edit is genuinely TWO distinct things (the T4/T2 seam — confirmed on disk)

There are two separate `1.x` value.js edits in play; conflating them is the seam-fall this spec fences against:

| Edit | Kind | File | Owner (per BG docs) | This spec's scope |
|---|---|---|---|---|
| value.js peer FLOOR `^1.0.0 → ^1.1.1` | dependency-floor EDIT (a `package.json` peerDependencies write) | `package.json:1080` | **T4 / C4** (single-writer wave-homing) | **IN SCOPE** — absorb into B2.1-swap |
| the 5 stale `^1.2.0` gate-file LITERALS `→ ^1.1.1` | string reconcile inside the gate/leaf | `proof-peer-conformance.mjs:41` (`PINNED_LATEST["@mkbabb/value.js"]="1.2.0"`) + `:46` (`PINNED_KEYFRAMES_VALUE_DEP="^1.2.0"`) + the G6-spike gate `:23,:25,:50,:58` + leaf `:346,:348` | **T2 / C6** (stale-literal reconcile) + `BG.W-GATE-FIELD-AURORA` (the gate-file value-pin, `bg-build-map:707-708`) | **OUT OF SCOPE** — cross-referenced only |

Confirmed on disk this pass: `grep PINNED_LATEST/PINNED_KEYFRAMES_VALUE_DEP scripts/proof-peer-conformance.mjs` returns `"@mkbabb/value.js": "1.2.0"` (line 41) + `"^1.2.0"` (line 46) — the stale gate-file literals, DISTINCT from the `package.json:1080` `^1.0.0` peer floor. The peer-FLOOR edit (`^1.0.0 → ^1.1.1`) is the single-writer concern; the gate-file `1.2.0 → 1.1.1` string reconcile is T2/C6's + `BG.W-GATE-FIELD-AURORA`'s.

---

## §1 The resolution — ABSORB (preferred), not downgrade

COHERENCE.md §2-C4 offers two options: **(A) absorb** the value.js floor edit into B2.1-swap OR **(B) downgrade** "FINAL single-writer" + annotate row 19.1. This spec selects **(A) absorb**, because:

1. **Absorb makes single-writer LITERALLY TRUE + SYMMETRIC with kf.** After absorption, B2.1-swap is the SOLE `package.json` writer between WS9 (pf-drop, subsumed by B2.1-swap's regen) and `BG.W-CUT`. BOTH peer-floor edits — kf `^5.0.0 → ^5.1.0` (C1-O1, already homed on B2.1-swap by T4) and value.js `^1.0.0 → ^1.1.1` — ride the ONE single-writer pass. The asymmetry T4 flagged (kf absorbed, value dangling at the cut) is closed by construction.
2. **Downgrade re-opens the multi-writer window absorb closes.** Recording "BG.W-CUT re-touches `package.json`" preserves a SECOND writer past the `--run ship` gate — the tag would fire over a `package.json` byte-state the ship battery never validated. That is the exact discipline the single-writer rule exists to prevent (the seed's "no stale binding rides the irreversible tag", `bg-build-map:1295`). Downgrade documents the hazard; absorb removes it.
3. **There is NO technical reason to defer the value floor to the cut.** The floor lift is a mechanical `package.json` peerDependencies write; it has no dependency on anything the tag-fire wave produces. B2.1-swap already opens `package.json` for the export regen — the value floor lands in the same edit at zero added edge.
4. **Absorb does NOT change ownership.** The value-floor EDIT is BH's (a `package.json` write on BH's single-writer wave, exactly like the kf bump — T4's "BH owns the bump" precedent). The gate-file value-PIN reconcile (`1.2.0 → 1.1.1` inside `proof-peer-conformance.mjs`) stays BG's (`BG.W-GATE-FIELD-AURORA`, `bg-build-map:707/717`). The T4/T2 seam is preserved: floor-EDIT = BH-B2.1-swap (T4/C4); stale-LITERAL = BG-gate (T2/C6). No two-owner crack.

### §1.1 The row-19.1 re-annotation (the CUT wave asserts, does not edit)

Post-absorption, `EXEC row 19.1` (`BG.W-CUT`) must NOT list value.js as a `package.json` FLOOR-WRITE. It re-annotates to an ASSERTION: the value floor is `^1.1.1` (a verified precondition, already landed at B2.1-swap), the kf floor is `^5.1.0` (already landed at B2.1-swap), pf is absent (dropped at WS9). "Mechanical CONSUMEs fire here" is corrected to mean **asserted-true-by-the-cut** (the floors + API presence are re-confirmed by the `--run ship` battery over the FINAL surface), NOT a second `package.json` floor-write. This mirrors T4's identical re-annotation of the kf line at row 19.1.

---

## §2 The EXACT amendments (both interleave sides — BH-side authoritative; BG-side deferred to the fold)

### §2.1 BH-side — `docs/tranches/BH/PLAN.md:68` (the B2.1-swap wave row) — WIDEN the absorbed-obligations set

T4's C1/C4 amendment already widens `PLAN.md:68` to absorb the four G4 obligations (kf bump + budget + ci.yml + binding-sweep). This C4 spec adds a FIFTH absorbed obligation to that SAME block — the value.js floor edit — so the single-writer claim is complete. Amend the T4-widened obligation set to prepend:

> **(O0) bump the value.js peer `@mkbabb/value.js` `^1.0.0 → ^1.1.1` in `package.json` peerDependencies** (the value-floor LIFT to the `wcagContrastRatio`-bearing 1.1.1 = npm-latest; `^1.1.1` admits latest AND contains keyframes' transitive `^1.2.0` ⊆ `^1.1.1`; B1-W2's `^1.0.0` destraddle floor is genuinely below the required `^1.1.1`). This is the SECOND peer-floor edit riding the single-writer pass (with O1, the kf bump) — **B2.1-swap is thereby the LITERAL sole `package.json` writer between WS9's pf-drop and `BG.W-CUT`.** The gate-file value-PIN reconcile (the stale `^1.2.0` → `^1.1.1` literals in `proof-peer-conformance.mjs:41/46` + the G6 spike) is DISTINCT and BG-owned (`BG.W-GATE-FIELD-AURORA`, WS7) — the floor-EDIT is BH's, the gate-LITERAL is BG's (the T4/T2 seam; do not conflate).

And widen the `PLAN.md:68` **Gate** cell (already widened by T4 with `proof:peer-conformance`/`profile:budget`/`proof:binding-sweep`/ci.yml) to add:

> **`proof:peer-conformance` GREEN over the `^1.1.1` value floor (the value-destraddle + admits-latest clauses stay green at `^1.1.1`, not `^1.0.0`).**

### §2.2 BH-side — `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:303` (row `18.1`, the BH cursor)

> NOTE: `EXECUTION-PROGRESS.md` is BH's authoritative cursor (BH shares BG's branch + execution tracking). Row 18.1 is what a resumed BH exec reads. T4 already widens this row's wave-name + Gate cell for the four G4 obligations; this C4 amendment adds the value floor to the same block so the single-writer claim has no dangling edit.

Widen the row-18.1 wave-name (already T4-widened to "FINAL pre-cut package.json + ci.yml single-writer — absorbs G4: …") to add `· value-floor ^1.0.0→^1.1.1` to the absorbed-edits list, so the wave-name reads:

> …**FINAL pre-cut package.json + ci.yml single-writer — absorbs G4: value-floor ^1.0.0→^1.1.1 · kf-peer bump ^5.0.0→^5.1.0 · L15 net-budget re-pin incl. siri+refract · ci.yml byte-fresh emit · proof:binding-sweep**…

(The value + kf bumps listed together makes the single-writer symmetry self-evident in the cursor.)

### §2.3 BH-side — `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:319` (row `19.1`, `BG.W-CUT`) — RE-ANNOTATE the value line

**CURRENT (`:319`):**
> …**mechanical CONSUMEs fire here:** value.js peer floor `^1.0.0`→**`^1.1.1`** … · kf 5.1.0 `DragOptions.snap`/`Oscillator` · DROP the dead `perfect-freehand ^1.2.3` (WS9)

**AMENDED (the CUT wave ASSERTS the final floors, it does NOT re-edit `package.json`):**
> …**mechanical CONSUMEs are ASSERTED-TRUE here (the `--run ship` battery over the FINAL surface re-confirms them; NONE is a `package.json` edit at this wave):** value.js peer floor is `^1.1.1` (LANDED at `BH-B2.1-swap`, NOT re-written here) · kf peer floor is `^5.1.0` (LANDED at `BH-B2.1-swap`) · kf 5.1.0 `DragOptions.snap`/`Oscillator` API present · `perfect-freehand ^1.2.3` dropped (at WS9 `BG.W-PAPER-CROSSREPO-ASKS`, NOT here). **B2.1-swap is the FINAL `package.json` writer; `BG.W-CUT` only fires the tag over the already-final surface.**

### §2.4 BG-side — `docs/tranches/BG/execution/bg-build-map.md` (DEFER to the fold — write-fence)

The write-fence forbids a BH pass editing the BG-tree `bg-build-map.md`. The corresponding BG-side edits are recorded here for the fold (the "BOTH sides must agree post-fold" seed rule), to be applied by the fold, NOT by this spec:

- **`bg-build-map.md:1182-1208` (the G4 single-writer block)** — add value.js `^1.0.0 → ^1.1.1` to the enumerated single-writer adds (currently three: kf-bump + L15-budget + ci.yml; the value floor is the fourth peer-floor add, symmetric with kf). This makes `:1184`'s "FINAL pre-cut single-writer" complete.
- **`bg-build-map.md:1259-1263` (the "Mechanical CONSUMEs (fire at the cut)" block)** — re-annotate the value.js line to "asserted-true (LANDED at B2.1-swap), NOT a cut-time `package.json` edit" (mirror §2.3). Keep the kf line + the pf-`(WS9)` line as-is (kf already homed on B2.1-swap by T4; pf genuinely lands at WS9).
- **`bg-build-map.md:707/717` (`BG.W-GATE-FIELD-AURORA` Files: "`package.json` (value.js `^1.1.1`)")** — this line is AMBIGUOUS between the gate-file value-PIN and the `package.json` peer-floor EDIT. Resolve at the fold: `BG.W-GATE-FIELD-AURORA` owns ONLY the gate-file value-PIN reconcile (`proof-peer-conformance.mjs` `1.2.0 → 1.1.1` at `:41/:46` + the spike literals); the `package.json` peer-floor EDIT is `BH-B2.1-swap`'s. Re-word `:717`'s Files entry to name the GATE FILE + the spike, not `package.json`, so the single-owner split is unambiguous (BH edits `package.json`; BG edits the gate). **This is the 4% residual** — resolved-in-direction here, exact final wording is the fold's act.

---

## §3 The verifying check (does the fix hold?)

Plan-text only, so "feasibility" = *does the value floor edit have ONE unambiguous single-writer home that makes the "FINAL single-writer" claim literally true, with the CUT wave asserting-not-editing?*

| Question | Result |
|---|---|
| After the amendment, does B2.1-swap edit BOTH peer floors (kf + value) in ONE `package.json` write? | YES — O0 (value) + O1 (kf) ride the same regen-exports `package.json` write B2.1-swap already performs (`PLAN.md:68`). |
| Is B2.1-swap thereby the LITERAL sole `package.json` writer before `BG.W-CUT`? | YES — pf drops at WS9 (subsumed by B2.1-swap's WS12 regen); no writer remains between B2.1-swap and the tag. `BG.W-CUT` asserts, does not edit. |
| Does the CUT wave (`row 19.1`) still schedule a `package.json` floor-write? | NO — re-annotated to "asserted-true, LANDED at B2.1-swap, NOT re-written here." The `--run ship` battery validates the FINAL `package.json`; the tag fires over the already-validated surface. |
| Is the T4/T2 seam preserved (floor-EDIT vs gate-LITERAL)? | YES — floor-EDIT (`package.json ^1.0.0→^1.1.1`) = BH-B2.1-swap; gate-LITERAL (`proof-peer-conformance.mjs 1.2.0→1.1.1`) = BG-gate. No two-owner crack. |
| Is pf mistakenly touched? | NO — pf drops at WS9 (before B2.1-swap); row-19.1 keeps its `(WS9)` provenance note; no edit. |
| Does `proof:peer-conformance` stay GREEN over `^1.1.1`? | YES — `^1.1.1` admits npm-latest 1.1.1 AND contains kf's transitive `^1.2.0` (`^1.2.0 ⊆ ^1.1.1`); the destraddle + admits-latest clauses hold. `^1.2.0` would EXCLUDE latest and red — hence `^1.1.1`, not `^1.2.0` (BG corrections `:1236-1239`). |
| Do BOTH interleave sides agree post-fold? | YES — BH-side (§2.1/§2.2/§2.3) authoritative now; BG-side (§2.4) deferred to the fold with the exact edits recorded (the write-fence forbids this pass editing the BG tree). |

**Feasibility verdict: the fix HOLDS.** The single-writer claim becomes literally true; the CUT wave asserts-not-edits; pf untouched; the T4/T2 seam clean; `proof:peer-conformance` green over `^1.1.1`.

---

## §4 Fences honored / negative findings (record so a later pass skips)

- **PREFERRED option chosen (absorb), NOT downgrade** — absorb makes single-writer LITERALLY true + removes the past-`--run ship` `package.json` write; downgrade only documents the hazard. §1 records the rejection rationale for downgrade.
- **NO new BH wave minted** — the value floor rides the EXISTING single-writer B2.1-swap (like the kf bump per T4). A separate value-bump wave would re-introduce the multi-writer race G4/T4 exist to prevent.
- **NO src touch** — this is a PASS-2 spec; only this report written. The `package.json`/plan/EXEC edits are the fold's act.
- **The T4/T2 seam is LOAD-BEARING and preserved** — floor-EDIT (`package.json`) = T4/C4/BH; gate-LITERAL (`proof-peer-conformance.mjs` `1.2.0`) = T2/C6/BG-gate. This spec touches ONLY the floor-EDIT wave-homing; it does NOT re-litigate the gate-literal reconcile (out of scope, cross-referenced).
- **NO value-floor DOUBLE-HOME** — the floor edit lands ONCE (B2.1-swap). The ambiguous `bg-build-map:717` "`package.json` (value.js `^1.1.1`)" in `BG.W-GATE-FIELD-AURORA`'s Files is the 4% residual, resolved-in-direction (§2.4: BG owns the gate FILE pin, BH owns the `package.json` floor) — the exact BG-side re-word is the fold's act (write-fence).
- **perfect-freehand is NOT a contradiction** — WS9 pf-drop precedes the WS12 single-writer; B2.1-swap's regen subsumes it; row-19.1's `(WS9)` note is a consume-assertion, not a cut-time edit. Approach fence honored — pf untouched.
- **`^1.1.1` NOT `^1.2.0`** — confirmed the CUT floor is `^1.1.1` (admits npm-latest + contains kf `^1.2.0`); a `^1.2.0` peer floor would exclude latest and red `proof:peer-conformance`'s admits-latest clause. The gate-file stale `^1.2.0` literals are the T2/C6 reconcile, not this spec's.
- **`criticalPath.violations == []`** (part of the T4-absorbed O2 budget arm) is unaffected by the value-floor add — a peer-floor version string is not a bundle-weight input.

siblings-intact exit 0 (after). Only file written: this report.

---

**Change log.** PASS 2 C4 (2026-06-30, HEAD `eaf2c172`): resolved single-writer symmetry via ABSORB (preferred). The value.js peer-floor edit (`^1.0.0→^1.1.1`) is folded into `BH-B2.1-swap`'s single-writer block (symmetric with the kf bump); `EXEC row 19.1` (`BG.W-CUT`) re-annotated to assert-not-edit. pf confirmed a WS9 (pre-swap) writer — no contradiction, untouched. The T4/T2 seam (floor-EDIT=BH vs gate-LITERAL=BG) preserved. BG-side edits (`bg-build-map:1182-1208`/`:1259-1263`/`:707-717`) deferred to the fold per the write-fence, exact edits recorded. convergence 96 (4% = the fold-time `bg-build-map:717` gate-vs-package.json disambiguation).
