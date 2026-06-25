# Pass-D D4-CLOSE re-validation — COHERENCE

Re-validation of the hardened plan at the SUBSTANCE bar (acyclicity · count-closure · doc-lie correction · prereq-sequencing). Read against on-disk reality (`union/waves/` 84 files + `waves/` 42 files = 125 distinct spec stems; `EXECUTION-DAG.md`; `UNIFIED-ROSTER.md`; `W-FOLD-LEDGER.md` F2.v/F2.v-SUNSET; the 6 parity-leaning wave dep headers). HARDEST first.

---

## CHECK 4 (HARDEST) — W-GATE-TRUTH-AUDIT prereq sequencing — **PASS (sequencing) / FAIL (enrollment)**

**The sequencing IS correct.** Every parity-leaning wave names `W-GATE-TRUTH-AUDIT` in its `depends:` header — verified verbatim:
- `W-WAVE-FIELD-HARNESS` ← W-GATE-TRUTH-AUDIT (composes `shader-eval-harness.mjs`, the field-arm's first consumer)
- `W-FIELD-ENGINE` ← W-WAVE-FIELD-HARNESS (transitively after the net)
- `W-DOT-UNIFY` ← W-BLOB-RENAME · W-GATE-TRUTH-AUDIT · W-VIZ-PRESENCE
- `W-DOT-IMAGE` ← W-DOT-UNIFY · W-FIELD-ENGINE · W-GATE-TRUTH-AUDIT
- `W-AUR-METAL` ← AUR-SATIN/PRISM · **W-GATE-TRUTH-AUDIT + W-WAVE-FIELD-HARNESS** (the numeric net)
- `W-VIZ-PARITY-METAL` names it.

The dots/field/aurora-mediums all sequence AFTER the truth audit — the #1-prerequisite intent is honored at the per-wave dep level. The PoC (`spikes/RESULTS.md`) proves the harness catches the sign-flip/wrong-constant the regex misses; the spec carries the per-viz calibration requirement the PoC's "miss" surfaced. Substance-real.

**The FAILURE: W-GATE-TRUTH-AUDIT is NOT ENROLLED in the canonical topo or roster.** `grep -c GATE-TRUTH union/EXECUTION-DAG.md` = **0**; `grep -c GATE-TRUTH union/UNIFIED-ROSTER.md` = **0**. The spec self-declares "Band 0 (truth tier — gates everything) · depends: NONE · the #1 PREREQUISITE node" — yet:
- The DAG's T0 lists only `W-FOLD-LEDGER → W-GESTALT-WIRE → W-PI-AUTHOR`.
- The roster's "Band 0 — Truth" row (`:205`) lists `FOLD-LEDGER · GESTALT-WIRE · PI-AUTHOR | 3`.
- The roster's headline count ("87 canonical waves") does not include it; it is a 6-inbound-dep BUILD with a spec file that exists in NO canonical enumeration.

This is the one genuine, load-bearing coherence defect. The node the entire numeric-truth thesis hangs on is referenced by 6 waves but placed by neither the DAG topo nor the roster. The `W-FOLD-LEDGER` F1 clause (doc⟷JSON completeness) would catch a *roster* wave absent from the JSON — but NOT a *spec-file-present + roster-absent* wave, so the existing machine does not self-heal this. **Fix is mechanical:** add the T0 node to the DAG (`W-FOLD-LEDGER` and `W-GATE-TRUTH-AUDIT` are both none-inbound Band-0 — they can run parallel; the parity waves gate on GATE-TRUTH, the close gates on FOLD-LEDGER), add the roster row, and re-derive the count to 88. No acyclicity impact (none-inbound, all edges forward).

---

## CHECK 1 — ACYCLICITY — **PASS**

Zero back-edges across the hardened graph. The DAG's "Acyclicity note" + the V-fold note address every hazard, and the new specs honor them:

- **W-BLOB-LAVA ← W-BLOB-RENAME** — forward (Band 13 ← the atomic rename that lands first; the dual fan-out to {MULTICORE,EMOTION,LAVA,DOT-UNIFY} is all forward). Verified in the spec dep header.
- **W-DOCK-SEQUENCE ← W-DOCK-INTEGRATE** — forward (Band 14/T9 ← the T2 dock band; the re-point off the deleted `W-DOCK-WIRE` is clean, `W-DOCK-WIRE` deduped onto INTEGRATE+LINK-API+SILHOUETTE, no 4th node).
- **dots ← W-GATE-TRUTH-AUDIT-first** — forward (the audit is Band-0-intent, the dots are Band-13; sequencing correct per CHECK 4).
- **W-DOCK-SUBDOCK(T2) neck-π ← FISSION-FILAMENT(T4)** — the spec's `depends:` lists `BF.W-FISSION-FILAMENT` as a hard ancestor, which read literally is a T2←T4 back-edge. The DAG resolves it as a GATE-SPLIT (the T2 re-seat CORE lands; clause C5 + binding-π #1 are born-RED-until-FISSION-FILAMENT, the verdict defers, not the build). This is the documented `W-SAFARI-CAPTURE`/`W-DOCK-GOO-SPACING` born-RED precedent — coherent, but it relies on reading the dep as a π-verdict edge, not a build-block edge. Acceptable (the DAG names it explicitly); subtle.
- **W-GOO-SPLIT-PERF(T8) ← FISSION-FILAMENT(T4)+SUBDOCK(T2)+GOO-SPACING(T4)** — all earlier-tier, forward (the re-capture-after edge).
- **W-DOCK-GOO-SPACING ⇄ {CONSTELLATION,SUBDOCK}** — split via born-RED token-first mint (C1/C2/C4/C6 land the token, C3/C5 flip GREEN at consumers). No cycle.
- **W-SEED-MORPH** front-of-T6, **W-CLEAR-VARIANT** T2, **W-HUE-HISTOGRAM-HOIST** T1 — all upstream of their cross-tier consumers. Forward.

The lava retirement removes a node, adds no edge. The DAG stays a DAG.

---

## CHECK 2 — COUNT-CLOSURE — **PASS (existing BUILDs) / FAIL (one un-enrolled BUILD)**

**Every DAG-named BUILD resolves to a real spec file.** The grep "missing" set was triaged:
- **False positives:** `W-BLOB-` (grep split of W-BLOB-{MULTICORE,EMOTION,LAVA}), `W-ON-EVENT` (split of W-LIQUID-GROW-ON-EVENT).
- **Correctly wave-less (CUT/SUPERSEDED/DEDUP/RETIRE, F2.r-exempt):** `W-AUR-REACTIVE` (superseded by AUR-ALBUM), `W-DOCK-WIRE` (deduped), `W-LAVA-FIELD` (RETIRED — see below), `W-LENS-RASTER-PURGE` (subsumed into GPU-ONLY-SPINE), `W-REFLECT-ALL` (CUT, the BB disease), `W-VIZ-FALLBACK-RETIRE-WATCH` (RETIRED, D34-B11), `W-VIZ-INTERACTION-SPINE` (CUT, each viz composes directly).
- **Real BUILDs, all resolved in `docs/tranches/BD/waves/`:** `W-ARIA-ORIENTATION-GUARD`, `W-CROSSREPO-ADOPT-SWEEP`, `W-VIZ-PARITY-METAL`, `W-CUT` — all four present. F2's dual-resolution (`union/waves/` OR `docs/tranches/BD/waves/`) is satisfied.

**The lava retirement is coherent.** `W-LAVA-FIELD` carries a RETIRED line in the DAG (`:138`), has NO spec file (correct — RETIRE is wave-less, F2.r), and folds into `W-BLOB-LAVA` (blob-local, ← W-BLOB-RENAME, `:146`). The framework critique `framework/lava-lamp-fluid.md` survives as prior-art, not a wave. Clean.

**The F2.v SUNSET I added is coherent.** Authoring-mode tolerates a `VIZ-FINAL-ROSTER` Band-11-15 roster row in place of an absent spec file; close-mode (`--cut`/`GL_CLOSE=1`) demands a real on-disk `BD.W-*.md`. The self-test gains an 8th bite (a synthetic roster-row-only BUILD PASSes in authoring, REDs in close). This correctly closes the spec-vapor hole P8 sat on (21 files for ~61 named) — the tolerance covers the authoring window ONLY, never the irreversible cut. Sound design; the `.mjs` is itself unbuilt (born-RED by absence), which is the honest tranche-dev state.

**The FAIL:** the count-closure is broken for ONE node — `W-GATE-TRUTH-AUDIT` (see CHECK 4). The roster's "87 canonical" / "61 union" enumeration omits a spec-file-bearing 6-inbound-dep BUILD. Count-closure as a property ("every named wave ↔ a roster/DAG slot ↔ a spec or RETIRE") fails on exactly this one wave.

---

## CHECK 3 — DOC-LIE CORRECTIONS — **PASS**

All four flagged consistently, none silently dropped:

- **(a) click-to-add → click-to-WARP.** `grep -rln click-to-add union/ viz/VIZ-FINAL-ROSTER.md` returns only the THREE waves that DOCUMENT the correction (`W-GATE-TRUTH-AUDIT`, `W-CONSTELLATION-STUDIO`, `W-PRECEPT-CANON`) — the canonical roster (`UNIFIED-ROSTER.md:172`) reads "click-to-warp (node-conserving engine)". The correction propagated to the canonical docs; the residual mentions are the strike-records, not live lies. `BD.W-CONSTELLATION-STUDIO.md` STRIKES "click-to-add" and DECIDES the add-path as a booked engine-extension successor (not a silent re-book). Correct.
- **(b) CLAUDE.md:755 (kuwahara-WGSL byte-untouched lie).** Flagged IMPLEMENTATION-owed in `W-GATE-TRUTH-AUDIT.md:39,105` with the exact edit named (`proof:aur-kuwahara.mjs:210` re-point `read→resolveSplices`, the W3(g) flip from "WGSL untouched" to "same-math numeric round-trip", the CLAUDE.md prose fix). User-gated, not dropped.
- **(c) border-progress README "oklchSpectrum DISCHARGED".** Flagged in `W-GATE-TRUTH-AUDIT.md:105` with the exact line (`README:37-38`, `spectrum-walk.ts:22` consumes generic `sampleColorRamp`, the //CONSUME interim is LIVE). Named, user-gated.
- **(d) parity-table authored 0.0s.** Flagged in `W-GATE-TRUTH-AUDIT.md:105` (the `gpu-parity-table.md` authored `0.0`s → gate-written numbers). Named, user-gated.

All four sit in §105's "IMPLEMENTATION-owed doc corrections are NAMED, user-gated — these edit shipped product files, so they land in the gated build, but the spec names the exact line each." This is the honest disposition: the lies are not fixed in tranche-dev (they touch shipped product), but they are NAMED, located, and routed to the gated phase — never silently dropped. Consistent.

---

## SECONDARY — the W-VIZ-PRESENCE dangling dep (a MINOR, recorded)

`W-DOT-UNIFY` and `W-DOT-IMAGE` name `W-VIZ-PRESENCE` in their `depends:` headers, but `W-VIZ-PRESENCE` resolves to NO spec file and NO roster row — it was DESCOPED (PASSD-FOLD §Batch-2) to a demo-default fix and FOLDED into `W-VIZ-CONFIGURATOR` (clause C5, the `proof:viz-presence` seam on the studio lift). The work is real and placed; the dep-arrow points at a non-node label. This does NOT break acyclicity or count-closure (the gate validates BUILD `wave` destinations, not `depends:` labels), but it is a naming inconsistency: a `depends: W-VIZ-PRESENCE` that resolves to a folded sub-concern, not a wave. The honest fix: re-point the two dep headers to `W-VIZ-CONFIGURATOR (the W-VIZ-PRESENCE demo-default seam)`. MINOR.

---

## STRUCTURAL VERDICT — **NOT-CLEAN (one mechanical defect; bounded, non-cyclic)**

| Check | Result |
|---|---|
| 4. Prereq sequencing (HARDEST) | PASS sequencing / **FAIL enrollment** |
| 1. Acyclicity | **PASS** |
| 2. Count-closure | PASS existing / **FAIL one un-enrolled BUILD** |
| 3. Doc-lie corrections | **PASS** |
| (2nd) W-VIZ-PRESENCE dangling dep | MINOR |

The graph is acyclic, the lava retire is coherent, every existing BUILD resolves, the F2.v-SUNSET correctly closes the vapor hole, the parity waves sequence after the truth audit, and all four doc-lies are honestly flagged implementation-owed. **The single blocker:** `W-GATE-TRUTH-AUDIT` — the #1-prerequisite Band-0 node the whole numeric-truth thesis depends on — exists as a spec file with 6 inbound deps but is enrolled in NEITHER the EXECUTION-DAG topo NOR the UNIFIED-ROSTER (count "87" omits it). This is mechanical to fix (add the T0 node + the roster row + re-derive the count to 88; none-inbound, no edge churn, no acyclicity impact), but until fixed the canonical topo/roster does not contain the node the convergence rests on — which is precisely the spec-vapor class Pass-D was re-opened to kill. NOT-CLEAN pending that one enrollment + the W-VIZ-PRESENCE dep re-point.
