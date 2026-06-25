# W-FOLD-LEDGER — the union no-silent-drop disposition machine (supersedes the BD/BE/BF ledgers)

**Band 0 · Tier T0 (the anti-disease foundation — the literal FIRST union wave, NO inbound dep) · depends: SUPERSEDES `BF.W-FOLD-LEDGER` / `BE.W-FOLD-LEDGER` / `BD.W-FOLD-LEDGER` (the three per-tranche ledgers become read-only prior-art) · READS `docs/tranches/BD/union/DEFERRED-CENSUS.md` (the human-readable census, §1-10) + the union roster `UNIFIED-ROSTER.md` + the V-roster `viz/VIZ-FINAL-ROSTER.md` + the union DAG `EXECUTION-DAG.md` · zero-pixel (BB inv-4 — a doc/JSON flip changes ZERO pixels; NO `proof:ba-gestalt`, NO π)**

## (1) The defect / the ask

The union folded FOUR corpora (BF 31 + BE 39 + BD 43 + BD/union 20) PLUS the ~22-wave V-expansion (viz/glass/dock) into ONE roster. A fold of that scale is exactly where the silent-drop disease lives: a pool item loses its disposition, a BUILD names a phantom destination wave, a deferral rides un-decided an Nth time, or a precept-inversion re-opens silently. The BC tranche cured this with `proof:bc-fold-ledger` (213 items, the no-silent-drop floor); the union needs the SAME machine over the SUPERSET surface — every one of the union's pool items (the 61 canonical union waves + the ~22 V-waves + the dispositioned deferrals D1-D109 + the precept-inversions) resolves to EXACTLY ONE decided row.

This wave IS the union ledger: `docs/tranches/BD/union/FOLD-LEDGER.json` (the machine source-of-truth) + `proof:fold-ledger` (the gate, born-RED→GREEN) + the F1-sync to the human-readable `DEFERRED-CENSUS.md`. It SUPERSEDES the three per-tranche ledgers — they become read-only prior-art (every prior row is CARRIED here with its union disposition; a fold is a disposition FLIP in place, no row deleted — L-inv-8). `DEFERRED-CENSUS.md` (§1-10, already authored) is its human face; F1 keeps them in sync.

## (2) Starting state — the exact on-disk reality

- **`docs/tranches/BD/union/DEFERRED-CENSUS.md` (VERIFIED, the human-readable census):** §1-6 carry D1-D69 (94 distinct dispositioned items when the BD Classes A-J lettered sub-rows expand); §7 enrolls the V-fold (D70-D102, the ~22 V-waves + the 5 V-CUTs); §8 the dropped BB/BC-freshest open-chronics (D103-D107); §9 the precept-inversions (D108-D109) + the D34-B11 RE-RESOLUTION; §10 the updated tally (~134 distinct dispositioned items). This is the SEED the JSON mirrors.
- **`docs/tranches/BD/union/FOLD-LEDGER.json` — ABSENT (the machine source THIS wave authors).** No `.json` in `docs/tranches/BD/union/` at HEAD.
- **`scripts/proof-fold-ledger.mjs` — ABSENT (born-RED by absence).** No `proof:fold-ledger` row in `package.json` at HEAD.
- **The three per-tranche ledger precedents (read in full — the shape THIS gate generalizes):**
  - `scripts/proof-bc-fold-ledger.mjs` (428 lines, the no-silent-drop floor): F1 (doc⟷JSON completeness + count), F1.b (band DERIVED from the named wave's on-disk `**Band:**` header, NOT transcribed), F2 (decided-destination soundness — every BUILD/MET `wave` resolves to a real wave-spec), F2.b (band-string rejection — `/^Band\s*\d+/`/empty REDs), F3 (no-undecided — disposition enum), F4 (HELD carries rationale + trigger), F5 (PM-SYNTHESIS traceability), F6 (close-union binding — `--run full` per-round), F7 (disposition-register reconcile). A 7-bite self-test.
  - `scripts/proof-bd-fold-ledger.mjs` (the BD discharge ledger, the F1-F7 shape re-pointed at the BD tree; the `BD.W-FOLD-LEDGER.md` spec is the authoritative format companion).
  - `BF.W-FOLD-LEDGER.md` (the BF 32-row convergence census — `BF/audit/DEFERRED-CENSUS.md`).
- **The V-wave-spec ABSENCE (the authoring-window fact the gate MUST handle):** the ~22 V-waves (D70-D102) are enrolled as `UNIFIED-ROSTER.md`/`VIZ-FINAL-ROSTER.md` ROWS at HEAD; their `docs/tranches/BD/union/waves/BD.W-<id>.md` spec files are authored by the SAME enrollment work (a sibling task) and may not all be on disk when this ledger is first authored. So a V-BUILD destination resolves against EITHER (a) its on-disk `docs/tranches/BD/union/waves/BD.W-<id>.md` spec OR (b) its row in `viz/VIZ-FINAL-ROSTER.md` (the canonical V-roster) — the dual-resolution clause (F2.v below). A V-BUILD that resolves to NEITHER is a phantom (REDs).
- **The deleted stale wave-file (the D34-B11 RE-RESOLUTION):** `docs/tranches/BD/waves/BD.W-VIZ-FALLBACK-RETIRE-WATCH.md` is DELETED (the GPU-only inversion makes the fallback-retire-WATCH moot — the `.glsl` arm is a CO-EQUAL GPU backend, not a fallback). The ledger carries the D34-B11 row with its RETIRE re-resolution; because the disposition is RETIRE, the deleted wave-file is NOT a phantom (the RETIRE-exempt-from-wave-resolution clause — F2.r).

## (3) The build — the union ledger JSON + the gate

**Two created files (docs/ + scripts/), one edited (gate registration).**

### 1. `docs/tranches/BD/union/FOLD-LEDGER.json` — the machine source-of-truth

A JSON object mirroring the BC shape, generalized to the union surface:

```json
{
  "$schema": "W-FOLD-LEDGER — the union machine-checkable no-silent-drop source-of-truth. SUPERSEDES the BD/BE/BF per-tranche ledgers (read-only prior-art). One row per distinct pool item; the human face is docs/tranches/BD/union/DEFERRED-CENSUS.md (F1 keeps them in sync). disposition ∈ {BUILD,AMEND,RETIRE,MET,HELD-with-trigger,SUPERSEDED,DEDUP,INVERSION} — DECIDED, never re-booked. A BUILD/AMEND/MET row's band is DERIVED from the named wave's on-disk **Band:** header (F1.b); a V-wave whose spec is not yet on disk resolves to its VIZ-FINAL-ROSTER row (F2.v).",
  "expectedCount": "<N>",
  "supersedes": ["BD.W-FOLD-LEDGER", "BE.W-FOLD-LEDGER", "BF.W-FOLD-LEDGER"],
  "closeUnion": { "runMode": "full", "perRound": true, "localOnlyForbidden": true, "submoduleAbsent": true, "note": "the CI-accurate close battery — --run full siblings-AND-submodule absent at every round close, not only the terminal cut (the masked-accretion cure; W-CLOSE-DISCIPLINE-CANON)" },
  "items": [ … ]
}
```

- `expectedCount` = the union distinct-pool count (DERIVED at authoring — the 61 canonical union waves + the ~22 V-waves + the dispositioned deferral rows D1-D109 + the precept-inversions, deduped per the no-double-count rule; NOT a frozen literal copied from a prior tranche). The count is asserted so a drift REDs, but it MUST MATCH `items.length`.
- **The no-double-count rule:** a canonical union wave (a `UNIFIED-ROSTER.md` row) is ONE item; the census D# rows that DEDUP/fold INTO that wave are CROSS-REFERENCED (the `foldsInto` field), not re-counted as a second BUILD. A V-wave that AMENDS a union wave (D91/D93/D98) is an `AMEND` row pointing at the amended union wave — not a second BUILD of the same surface. The expectedCount counts DISTINCT pool items, each terminal-decided ONCE.
- Each pool item → one `items[]` entry:
  - A `BUILD`/`MET` row: `{id, what, origin, status, disposition, band, wave, evidence}` — `wave` resolves to a real `docs/tranches/BD/union/waves/BD.W-*.md` (or, for a V-wave whose spec is not yet on disk, its `VIZ-FINAL-ROSTER.md` row — F2.v); `band` is DERIVED from the wave's on-disk `**Band:**` header (or its roster band column for a V-wave).
  - An `AMEND` row: `{id, what, disposition:"AMEND", amends, rationale}` — `amends` names the union wave the V-delta folds onto (D91→W-DOCK-INTEGRATE, D93→W-DOCK-LINK-API, D98→W-CONTROL-GLASS); the `amends` target resolves like a BUILD `wave`.
  - A `HELD-with-trigger` row (the 14 DEFER-with-trigger + the 5 DEFER-BOOKED): `{…, disposition:"HELD-with-trigger", rationale, trigger}` — non-empty `rationale` + the named ≥2-consumer / Baseline / republish / perf-budget / user-gate condition that flips it to BUILD.
  - A `RETIRE` row (the 13 — the 5 V-CUTs + the BD/BE retire-with-rationale + the D34-B11 re-resolution): `{…, disposition:"RETIRE", rationale, successor?}` — the rationale + (where applicable) the successor; a RETIRE row carries NO `wave` (it is exempt from wave-resolution — F2.r).
  - A `DEDUP` row: `{…, disposition:"DEDUP", foldsInto}` — `foldsInto` names the canonical wave it folds onto.
  - A `SUPERSEDED` row: `{…, disposition:"SUPERSEDED", supersededBy}`.
  - An `INVERSION` row (D108/D109 + the D34-B11 re-resolution carry-flip): `{…, disposition:"INVERSION", priorDisposition, flippedTo, priorPrecept, rationale, wave}` — carries BOTH the prior disposition AND the flip (the deliberate-reversal evidence, F8).

### 2. `scripts/proof-fold-ledger.mjs` — the union no-silent-drop gate (born-RED)

The `proof:bc-fold-ledger` shape re-pointed at the union tree + the V-fold clauses:

- `LEDGER_JSON` = `docs/tranches/BD/union/FOLD-LEDGER.json`, `LEDGER_DOC` = `docs/tranches/BD/union/DEFERRED-CENSUS.md`, `UNION_WAVES_DIR` = `docs/tranches/BD/union/waves`, `BD_WAVES_DIR` = `docs/tranches/BD/waves` (the BD discharge wave-specs the union folds), `V_ROSTER` = `docs/tranches/BD/viz/VIZ-FINAL-ROSTER.md`, `UNIFIED_ROSTER` = `docs/tranches/BD/union/UNIFIED-ROSTER.md`, `REGISTER` = `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`, `WAVE_RE = /^BD\.W-[A-Z0-9-]+$/`, `EXPECTED_COUNT` = the union count.
- **Clauses:**
  - **F1** — doc⟷JSON completeness + the count: every `DEFERRED-CENSUS.md` D# row (and every `UNIFIED-ROSTER.md` canonical wave) has exactly ONE `items[]` entry; `items.length == expectedCount`; no doc id orphaned, no JSON id without a doc row.
  - **F1.b** — band DERIVED from the named wave's on-disk `**Band:**` header (NOT the doc parenthetical); a stale-transcribed band REDs.
  - **F2** — decided-destination soundness: every `BUILD`/`MET` `wave` (and every `AMEND` `amends`) resolves to a real `docs/tranches/BD/union/waves/BD.W-*.md` OR `docs/tranches/BD/waves/BD.W-*.md`. **F2.v** (the V-fold dual-resolution): a V-wave whose `docs/tranches/BD/union/waves/BD.W-<id>.md` spec is not yet on disk resolves IF its `BD.W-<id>` stem appears as a Band 11-15 row in `VIZ-FINAL-ROSTER.md` (the authoring-window tolerance — the roster row IS the canonical V-spec until the wave-file lands). A V-BUILD that resolves to NEITHER the wave-file NOR the roster row is a phantom (REDs). **F2.v-SUNSET** (the Pass-D close-the-vapor-hole clause): the F2.v authoring-window tolerance EXPIRES at the close — when the ledger runs in `--cut`/close mode (or `process.env.GL_CLOSE === "1"`), EVERY `BUILD`/`MET` `wave` resolves to a REAL on-disk `BD.W-*.md` spec file; the roster-row fallback is REJECTED at the cut. A BUILD whose spec file is still absent at the close REDs (the Pass-D finding: 21 wave-files exist for ~61 named — the tolerance covers the authoring window ONLY, never the irreversible cut; a build cannot ship over a roster row that points at no spec). The self-test gains an 8th bite: a synthetic BUILD with a roster-row-only destination must PASS in authoring mode AND RED in close mode. **F2.r** (the RETIRE exemption): a `RETIRE`/`DEDUP`/`SUPERSEDED` row carries NO `wave` and is NOT wave-resolved (its destination is its rationale/successor/foldsInto — the D34-B11 deleted-wave-file is NOT a phantom precisely because it is RETIRE).
  - **F2.b** — band-string rejection: a `wave` matching `/^Band\s*\d+/` or empty (on a row that requires a wave) REDs (a band is a thematic grouping, never a destination).
  - **F3** — no-undecided: `disposition ∈ {BUILD,AMEND,RETIRE,MET,HELD-with-trigger,SUPERSEDED,DEDUP,INVERSION}`; a `book`/empty/`re-stamped`/`deferred`(bare) disposition REDs (the no-re-book floor).
  - **F4** — HELD carries trigger: every `HELD-with-trigger` row has a non-empty `rationale` AND a non-empty `trigger` (a bare HELD REDs).
  - **F5** — the no-double-count: a `DEDUP`/`AMEND` row's `foldsInto`/`amends` target is a DISTINCT BUILD/MET item in the ledger (the folded surface is counted ONCE — a DEDUP pointing at a non-existent or a second-BUILD-of-the-same-surface REDs).
  - **F6** — close-union binding: `closeUnion == {runMode:"full", perRound:true, localOnlyForbidden:true, submoduleAbsent:true}` (the `--run local`-only close REDs).
  - **F7** — supersede-completeness: `supersedes` names all three prior ledgers AND every prior-tranche ledger row resolves to a union item (a prior BF/BE/BD row that loses its disposition in the supersede REDs — the carry-forward floor).
  - **F8** — inversion-evidence: every `INVERSION` row (D108/D109 + the D34-B11 carry-flip) carries BOTH `priorDisposition` AND `flippedTo` (a precept-inversion with only the new disposition — the silent-re-open shape — REDs; the deliberate-reversal must show both faces).
- **The self-test (`--self-test`)** — the born-RED bites, each MUST flag:
  1. dropped-item → F1 (a census D# row with no JSON entry).
  2. stale-band → F1.b (a transcribed band ≠ the wave's on-disk header).
  3. phantom-dest → F2 (a BUILD `wave` resolving to no wave-file AND no roster row).
  4. v-phantom → F2.v (a V-BUILD whose stem is in NEITHER the union waves dir NOR the VIZ-FINAL-ROSTER Band 11-15 rows).
  5. retire-with-wave → F2.r (a RETIRE row carrying a `wave` — the RETIRE must be wave-less; this catches a mis-classified deleted-file row).
  6. band-only-dest → F2.b (a `wave` = `Band 11`).
  7. book → F3 (a `book`/empty disposition).
  8. bare-HELD → F4 (a HELD with no trigger).
  9. double-count → F5 (a DEDUP `foldsInto` a non-BUILD or a phantom).
  10. local-only-close → F6 (a `--run local` closeUnion).
  11. lost-supersede → F7 (a prior BF row dropped from the union).
  12. silent-inversion → F8 (an INVERSION row with only `flippedTo`, no `priorDisposition`).

  Each bite MUST flag its clause; the real union ledger MUST pass every clause (GREEN-after). If ANY bite fails to flag, the detector is not load-bearing → the gate REDs loudly (the `proof:bc-fold-ledger` self-test precedent).

### 3. `scripts/gates.mjs` — register `proof:fold-ledger`, `tags:["ci","release"]`

A device-free doc/JSON gate (runs in CI + at the close — the `proof:bc-fold-ledger` registration precedent). It is the FIRST union gate (Band 0); a silent drop reds the close.

## (4) The gate — born-RED → GREEN

**`proof:fold-ledger` is the new gate (born-RED by absence, GREEN at the authored ledger).**

- **Born-RED:** at HEAD neither the gate nor `docs/tranches/BD/union/FOLD-LEDGER.json` exists. On first authoring, `node scripts/proof-fold-ledger.mjs --self-test` — the 12 synthetic bites MUST each flag their clause. If ANY bite fails to flag, the detector is not load-bearing → RED loudly.
- **GREEN-after:** the real union ledger passes every clause — `items.length == expectedCount`; every census D# row ⟷ JSON id agrees (F1); every `BUILD`/`MET` `wave` + every `AMEND` `amends` resolves to a real wave-spec OR a VIZ-FINAL-ROSTER Band 11-15 row (F2/F2.v); every `RETIRE`/`DEDUP` is wave-less (F2.r); every disposition is in the enum (F3); every HELD carries a trigger (F4); no double-count (F5); the closeUnion is `{full, perRound, localOnlyForbidden, submoduleAbsent}` (F6); all three prior ledgers superseded with every row carried (F7); every INVERSION carries both faces (F8).
- **The self-test bite (this wave's own):** the `--self-test` arm IS the bite — the 12 synthetic mutations each flag. Born-RED on the mutations → GREEN on the real ledger. This is the anti-evasion floor: a future agent dropping a union pool item, leaving one undecided, naming a phantom destination, re-opening a precept-inversion silently, or running a `--run local`-only close REDs the close.

## (5) Paint verification

**Device-free — a doc/JSON integrity wave, zero pixels (BB inv-4; the BC.W-FOLD-LEDGER precedent — the integrity/structure floor paints zero pixels, real value).** NO `proof:ba-gestalt` verdict, NO π. Its acceptance is documentary + mechanical completeness: a reviewer opens `DEFERRED-CENSUS.md` §1-10 and finds every pool item (the 61 union waves + the ~22 V-waves + D1-D109 + the precept-inversions) DECIDED, and `FOLD-LEDGER.json` agrees (F1). The binding verification is `proof:fold-ledger` born-RED→GREEN + the 12 `--self-test` bites flagging. The BB anti-disease law is trivially satisfied (no visual surface, no source-green-close hazard). This wave is the STRUCTURAL floor that makes the union close honest — the witness every chronic + every prior-tranche deferral + every V-fold + every precept-inversion is folded + DECIDED, the user's no-silent-drop mandate provably met.

## (6) Fences + risks

- **NO SILENT DROP, NO RE-BOOK (the user mandate, the headline).** Every pool item is DECIDED — never `book`/`re-stamped`/`deferred` an Nth time. A HELD-with-trigger is a DECISION (with a named trigger), not a deferral. F3 REDs a `book`/empty disposition; F4 REDs a bare HELD.
- **THE COUNT IS DERIVED, NOT FROZEN.** `expectedCount` is the union distinct-pool count computed at authoring (NOT a literal copied from BC's 213 or BD's count — the union is its own size). The count is asserted so a drift REDs, but it MUST MATCH `items.length` (a frozen-wrong literal would green a wrong ledger).
- **THE BAND IS DERIVED FROM THE WAVE'S ON-DISK HEADER (F1.b).** A BUILD/AMEND/MET row's `band` equals the named wave's on-disk `**Band:**` token (or the VIZ-FINAL-ROSTER band column for a V-wave whose spec is not yet on disk), NEVER the doc parenthetical.
- **EVERY DESTINATION RESOLVES — DUAL-RESOLUTION FOR THE V-WAVES (F2/F2.v/F2.r).** A BUILD/AMEND destination resolves to a real wave-spec OR a VIZ-FINAL-ROSTER Band 11-15 row (the authoring-window tolerance — a V-wave-spec authored by the sibling enrollment work is not a phantom while its roster row stands). A RETIRE/DEDUP/SUPERSEDED row is wave-LESS (the D34-B11 deleted-file is RETIRE, not phantom — F2.r). A bare `Band N` label or empty `wave` REDs (F2.b).
- **THE PRECEPT-INVERSIONS CARRY BOTH FACES (F8).** D108 (GPU-only over `proof:gpu-substrate-single` B+C), D109 (enum-demotion over `proof:dock-context` C1), and the D34-B11 RE-RESOLUTION (WATCH→RETIRE) each carry BOTH the prior disposition AND the flip — a precept-inversion with only the new disposition is the silent-re-open shape and REDs. The deliberate-reversal evidence is machine-required.
- **THE D34-B11 RE-RESOLUTION IS A FLIP-IN-PLACE, NOT A DROP.** The prior census row D34-B11 (`DEFER-with-trigger (WATCH)`) is CARRIED (the prior-disposition record); the §9 RETIRE is the flip. The deleted `BD.W-VIZ-FALLBACK-RETIRE-WATCH.md` wave-file is NOT a phantom-destination violation (the row is RETIRE — F2.r). The union `W-VIZ-TAILS` (Band 9) subsume-line's `BD.W-VIZ-FALLBACK-RETIRE-WATCH` member is reconciled by W-VIZ-TAILS retiring the WATCH arm (the VIZ-DAG "1 SUPERSEDED" note) — a no-op on the live UNIFIED-ROSTER row.
- **THE FULL-UNION CLOSE PER-ROUND (W-CLOSE-DISCIPLINE-CANON, F6).** `--run full` siblings-AND-submodule-absent at every round close, not only the terminal cut — the masked-accretion cure; the `--run local`-only close is forbidden (F6 self-test).
- **SUPERSEDES, NEVER DELETES (F7, L-inv-8).** The three per-tranche ledgers become read-only prior-art; every prior row is CARRIED here with its union disposition. A prior BF/BE/BD row that loses its disposition in the supersede REDs (the carry-forward floor). The `supersedes` field names all three.
- **NO glass-ui src/ paint.** This is a docs/ JSON + a scripts/ gate + a gates.mjs registration — zero src/ component/style edit. The gate is device-free (runs under CI=true with no siblings — F1-F8 are pure doc/JSON/roster cross-checks).

## (7) The decided-row enforcement (the one-row-per-pool-item law)

The ledger's binding contract: every POOL item resolves to EXACTLY ONE decided row.

- **The pool** = the 61 canonical union waves (`UNIFIED-ROSTER.md`) ∪ the ~22 V-waves (`VIZ-FINAL-ROSTER.md` Bands 11-15) ∪ the dispositioned deferrals (D1-D109, `DEFERRED-CENSUS.md`) ∪ the precept-inversions (D108-D109 + the D34-B11 re-resolution).
- **Exactly one decided row** = each pool item appears ONCE in `items[]` with a terminal disposition; a DEDUP/AMEND row CROSS-REFERENCES its canonical wave (the `foldsInto`/`amends` field), so the folded surface is counted ONCE (F5 — no double-count). A V-wave that AMENDS a union wave (D91/D93/D98) is the AMEND row, not a second BUILD.
- **`proof:fold-ledger` reds:** (a) a phantom BUILD-destination (a `wave`/`amends` resolving to no wave-file AND no roster row — F2/F2.v); (b) a silent drop (a pool item with no `items[]` row, or a prior-tranche row lost in the supersede — F1/F7); (c) an undecided row (`book`/empty — F3); (d) a bare HELD (F4); (e) a double-count (F5); (f) a silent precept-inversion (F8); (g) a `--run local`-only close (F6).

This is the no-silent-drop machine the union charter §6 names — the witness that the four-corpus fold + the V-expansion lost ZERO item.
