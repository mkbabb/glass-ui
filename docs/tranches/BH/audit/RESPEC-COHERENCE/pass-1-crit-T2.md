# PASS 1 · Adversarial critique — T2 (C2: B7 4-row consumer-ask reconciliation)

**Target:** `pass-1-proto-T2.md`. **Verdict on the proto: SOUND CORE, UNDER-SPECIFIED GATE.** The proto's load-bearing insight — that `proof:crossrepo-asks` is a BB-scoped gate that never reads BH's roster, so BH's gate line is vacuous at ANY count — is CORRECT and verified on disk; it is a genuine and important upgrade over the prompt's naive "3→4 count bump" framing. Both missing rows have authoritative BG-side sources. Both interleave sides are correctly identified. The write-fence held (only the report was written). BUT the §3 gate-derivation — the half the proto calls "load-bearing" — describes a mechanism ("expected-ask set DERIVED from the sources so the count can never be hand-frozen") that is only HALF-designed against the actual BB gate architecture. Four concrete opens below.

**Siblings-intact:** exit 0 before + after (verified this pass). Every atlas/bbnf read was read-only grep.

---

## What the proto gets RIGHT (independently re-verified)

| Proto claim | Re-verification | Verdict |
|---|---|---|
| BH B7 carries 2 rows not 4 | `asks-and-consumes.md` Asks table has rows 1 (muster→/aurora) + 2 (speedtest→/timeline) ONLY; "No other sibling imports `/api`." | ✅ CONFIRMED |
| `proof:crossrepo-asks` is BB-scoped, never reads BH | `scripts/proof-crossrepo-asks.mjs:43` `RELAY="docs/tranches/BB/…"`, `EXPECTED_ASKS` are BB-era `value-oklch-spectrum-helper`/`springTimingFunction`/etc., NO tranche param. Registered `gates.mjs:1427-1428`. | ✅ CONFIRMED — **the pivotal correction, and it is right** |
| BH's gate line is vacuous at any count | The gate reads the BB relay only; BH's `PLAN.md:69,106` `proof:crossrepo-asks names the 2 /api dispositions` points at a gate that structurally cannot see BH's roster. | ✅ CONFIRMED |
| `proof:retired-token-consumers` UNBUILT | `scripts/proof-retired-token-consumers.mjs` — No such file. | ✅ CONFIRMED |
| atlas source-of-record IS BG-side | `GU-3-TRIAGE.md` (at `docs/tranches/BG/coordination/`) numbered-list item 3: "**→ ACTION for the BH agent: add the atlas `--ring` re-point as a B7 row**"; ASK-B table row "**BH B7** (add the atlas row)". `consumer-constellation.md:140`. | ✅ CONFIRMED |
| bbnf source-of-record IS BG-side | `bg-build-map.md:1265-1284` §2.U1 "**U1-1 — the B7 migration row.**" | ✅ CONFIRMED |
| bbnf:230 LIVE anchor | `~/Programming/bbnf-buddy/src/styles/preset.css:230` `--glass-blur-dock: var(--glass-blur-cartoon);` (read-only). | ✅ CONFIRMED |
| BG.W-CLOSEFIX-9SITE carries the gate (the PASS-2 residual) | `FINAL.md:661` G7 row + `bg-build-map.md:1276-1284` "**Wired into `BG.W-CLOSEFIX-9SITE`'s *Gate* set**". | ✅ CONFIRMED — **the residual is REAL but LOW-RISK: the gate IS specced into BG's build** |
| both /api asks anchored `consumer-constellation.md:138-139`, ring `:140` | Exact line numbers verified. | ✅ CONFIRMED |

The proto's on-disk verification table is accurate. The core approach — reconcile BOTH interleave sides to 4 rows + give BH a gate that reads BH's roster — is the correct shape and is FEASIBLE.

---

## OPEN-1 (HIGH) — "the count can never be hand-frozen" is only HALF-mechanized against the real BB gate

The proto's §3 G-A repeatedly asserts the BH gate's expected-ask set is "**DERIVED** from the authoritative sources … so the count can never be hand-frozen" and calls this "the mechanized kill of exactly-2." **This overstates what the BB gate actually does, and the BH gate as sketched would NOT deliver the guarantee.**

The real BB gate (`proof-crossrepo-asks.mjs`) has **TWO** distinct mechanisms:
1. **`EXPECTED_ASKS`** — a **HAND-CURATED** array of `{id, label, amendment: /regex/, relay: /regex/}` pairs (`:60-158`). The ask anchors ARE hand-listed. W1 asserts each hand-listed ask appears in BOTH the amendment §A3 region AND the relay (a coverage cross-check, `:166-179`).
2. **`A3_COVERAGE_ANCHORS`** — the auto-scan arm (`:180-`) that catches a §A3 by-name NOUN the relay omits (this is what actually prevents a hand-freeze: a source-named ask the hand-list forgot still reds via coverage).

**The anti-hardcode property lives in mechanism #2, not #1.** The proto's §3 describes only #1's shape ("each ask anchored in the source, its liveness test: source names it → relay MUST cover it") and never specifies a `CONSTELLATION_COVERAGE_ANCHORS`-equivalent auto-scan. Without the coverage arm, the BH gate's expected set is STILL a hand-listed 4 — and "exactly 2 can never be hand-frozen" degrades to "exactly 4 can never be hand-frozen," the same class one row over. **The spec must explicitly mandate the BH gate replicate the `A3_COVERAGE_ANCHORS` auto-scan** (a token-anchor scan of the source docs, red-on-any-source-named-ask-the-relay-omits), not just the per-ask coverage cross-check. Otherwise the load-bearing claim is aspirational.

---

## OPEN-2 (HIGH) — the source ledger has 6 rows across 2 versions; the derivation MUST state the row-filter, or it mis-builds

The proto says the BH expected-ask set is derived by "reading the two authoritative source docs and requiring the BH relay to cover every ask they name." Taken literally against the actual `consumer-constellation.md` **By-name ask ledger** (`:136-143`), that is WRONG — the ledger has **SIX** rows, not the 4 the roster wants:

| ledger row | lands | BH-B7? |
|---|---|---|
| `migrate-api-to-aurora` | 5.0.0 (BH B7) | ✅ |
| `migrate-api-to-timeline` | 5.0.0 (BH B7) | ✅ |
| `migrate-ring-to-focus-ring-color` | 5.0.0 (BH B7, GU-3 ASK-B) | ✅ |
| `glass-key-fill` | **4.4.0 (GU-1)** | ❌ NOT B7 |
| `GU-DOCK-STATUSDOT-PROPS` | **4.4.0 (GU-3 ASK-A)** | ❌ NOT B7 |
| `drop-overflow-scroll` (consume) | 5.0.0 (**WS2 consume, no engine ask**) | ❌ NOT a by-name ask |

A naive "cover every row the ledger names" auto-scan would demand the BH relay carry `glass-key-fill` + `GU-DOCK-STATUSDOT-PROPS` (4.4.0 GU-1/GU-3-ASK-A asks that DO NOT belong in a 5.0.0 B7 roster) and `drop-overflow-scroll` (a WS2 consume with no engine ask). The spec's derivation is silent on the FILTER. **The gate must filter the ledger to `lands ∈ {5.0.0 BH B7}` AND `is a by-name migration ask` (excludes the no-engine WS2 consume).** Without the filter stated, the fold-agent either (a) builds a gate that reds on a correct 4-row relay because it's missing the 4.4.0 rows, or (b) hand-picks the 3 rows and re-introduces exactly the hand-freeze OPEN-1 flags. The filter must be in the spec, decidable, and self-tested.

---

## OPEN-3 (MEDIUM) — the 4th row's source is ASYMMETRIC; the two-source derivation is not a uniform "ask ledger"

Rows 1-3 (aurora/timeline/ring) live in `consumer-constellation.md`'s **By-name ask ledger** (a markdown table). Row 4 (bbnf) is **NOT in that ledger at all** — `grep glass-blur-dock docs/tranches/BG/execution/consumer-constellation.md` → 0 hits. The bbnf row exists ONLY in `bg-build-map.md §2.U1` (prose, not a table), and it is NOT a `/api` ask — it is a **token-retire** ask of a fundamentally different shape (no import re-point; a token-chain retirement the consumer must re-baseline). The proto's §3 lists `bg-build-map §2.U1` as one of three sources but treats all three as feeding one uniform "expected-ask set." They don't: the gate reads a TABLE (constellation, 3 B7 rows after the OPEN-2 filter) plus a PROSE anchor (bg-build-map §2.U1, 1 row of a different shape). The spec must state that the bbnf row is derived from a **different-shaped source** (a prose anchor, not a ledger row) and that its coverage regex is `bbnf-glass-blur-dock-retune-no-op` (the ask id) in the BH relay — NOT a `/api` migration pattern. This also means `proof:retired-token-consumers` (not `proof:crossrepo-asks:bh`) is the row's PRIMARY born-RED witness (the /api gate only checks the roster records the row; the retire-gate checks the LIVE bbnf:230 consumer). The two-gate split is right in the proto but the derivation-source asymmetry blurs which gate owns which liveness.

---

## OPEN-4 (LOW) — line-anchor drift risk + the PASS-2 residual is real (but low-risk)

- **Line anchors:** the proto pins `GU-3-TRIAGE.md:16,34` and `bg-build-map.md:1272` as load-bearing. `GU-3-TRIAGE.md`'s "ACTION for the BH agent" sits in the numbered list I read at 12-18 and the ASK-B table around 32-36; `bg-build-map.md §2.U1` at 1265-1284. The `:16`/`:34`/`:1272` anchors are close but the fold-agent MUST re-verify the exact line at apply-time (these docs are edited across passes; a stale `:16` that has drifted to `:15` breaks a gate that greps by line). Prefer anchoring by STABLE NOUN (`"ACTION for the BH agent"`, `"U1-1 — the B7 migration row"`) over line number, matching the BB gate's own token-anchor discipline. **The proto already applies the noun-not-number discipline to the atlas COUNT (§5-8, correct); extend it to the ROW-SOURCE anchors.**
- **PASS-2 residual (cross-tranche gate ownership):** REAL and correctly flagged. Re-verified: `BG.W-CLOSEFIX-9SITE` (G7) DOES carry `proof:retired-token-consumers` in its Gate set (`FINAL.md:661`, `bg-build-map.md:1276-1284`). So the residual is LOW-RISK — the gate IS specced into BG's build; the hazard is only "if BG's build drifts and drops it." The mutual-reference the proto installs (BH B7 references the gate; BG mints it) is the correct mitigation and matches the C1 kf-gate shape. No change needed beyond keeping it on the PASS-2 list.

---

## No new friction-class introduced

The fix is bounded plan-text + roster + gate-wiring; no src touch, no foreign-tree mutation, no feasibility spike. It does not re-open a resolved issue or contradict a landed gate. The two-gate split (crossrepo-asks:bh for the roster, retired-token-consumers for the live bbnf consumer) is the right decomposition. The interleave-both-sides-agree discipline is correctly applied. **The friction risk is entirely in OPEN-1/OPEN-2: an under-specified derivation that either hand-freezes at 4 (repeating the exactly-2 class one row over) or mis-builds by covering non-B7 ledger rows.** Both are closable in the spec with a stated filter + a mandated coverage-arm auto-scan + a self-test that reds on a synthetic relay dropping the atlas OR bbnf ask AND greens on a correct 4-row relay (the proto's V3 self-test is directionally right but must also assert the gate does NOT red on a correct 4-row relay that OMITS the 4.4.0 rows — the OPEN-2 false-positive guard).

---

## convergencePct: 72

The core (BB-scope correction, two-gate decomposition, both-sides-agree, born-RED anchors) is sound and FEASIBLE — ~72% converged. The remaining 28% is the gate-derivation specification: OPEN-1 (mandate the coverage-arm auto-scan, not just per-ask cross-check), OPEN-2 (state the ledger row-filter `lands==5.0.0 BH-B7 ∧ by-name-migration-ask`), OPEN-3 (reconcile the asymmetric two-source shape + which gate owns each liveness), OPEN-4 (noun-anchor the row sources, not line numbers). None blocks authoring; all four must be resolved before the gate is BUILT at B7 or the anti-hardcode guarantee is not delivered.
