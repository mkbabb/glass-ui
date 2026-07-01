# PASS 1 · Prototype T2 — CORRECTED-APPROACH SPEC (mode:spec)

**Coherence issue:** C2 [HIGH] — *B7 4-row consumer-ask reconciliation (enroll atlas + bbnf-buddy)*.
**Verdict: FEASIBLE.** The fix holds. It is a bounded plan-text + roster + gate-wiring amendment, no feasibility spike, no src touch. Every named target (both missing rows, both born-RED gates, the "exactly 2" hardcodes) is verified on disk against the BG-side authoritative sources (`GU-3-TRIAGE.md`, `consumer-constellation.md`, `bg-build-map.md §2.U1`).

**On-disk verification (HEAD `e550f1b0`, this pass — siblings-intact exit 0 before + after).**

| Claim | Verified |
|---|---|
| BH B7 carries only 2 rows | `asks-and-consumes.md:11-16` — muster→/aurora, speedtest→/timeline. NO atlas, NO bbnf. |
| PLAN "exactly 2" hardcode ×3 | `PLAN.md:29` ("exactly ONE dropped key … 3 orphan re-homes"), `PLAN.md:106` ("**exactly 2 by-name asks**"), `PLAN.md:141` ("exactly **2 sibling repos**"). |
| bh-interleave-map B7 hardcode | `bh-interleave-map.md:83` "the 2 by-name asks: muster→/aurora · speedtest→/timeline". |
| atlas `--ring` row ABSENT from BH | grep `atlas\|--ring\|focus-ring-color` over `PLAN.md` + `asks-and-consumes.md` → EMPTY. |
| bbnf `--glass-blur-dock` row ABSENT from BH | grep `glass-blur-dock\|retired-token` over both → EMPTY. |
| atlas assignment IS BG-side | `GU-3-TRIAGE.md:16` "→ **ACTION for the BH agent**: add the atlas `--ring` re-point as a B7 row"; `:34` "lands **BH B7**". |
| bbnf assignment IS BG-side | `bg-build-map.md:1272` "**U1-1 — the B7 migration row.** A by-name `bbnf-glass-blur-dock-retune-no-op` B7 migration ask in `docs/tranches/BH/coordination/asks-and-consumes.md`". |
| bbnf token LIVE on disk | `bbnf-buddy/src/styles/preset.css:230` `--glass-blur-dock: var(--glass-blur-cartoon)` (read-only foreign-tree grep). |
| `proof:retired-token-consumers` UNBUILT | `scripts/proof-retired-token-consumers.mjs` — No such file. Spec'd born-RED [local,ci,release] at `bg-build-map.md:1276-1284`. |
| `proof:crossrepo-asks` IS a **BB** gate | `scripts/proof-crossrepo-asks.mjs:43` `RELAY = "docs/tranches/BB/coordination/asks-and-consumes.md"`; `EXPECTED_ASKS` are BB-era asks; registered `gates.mjs:1427` `[local,ci,release]`. **It does NOT read BH's roster** → BH's "proof:crossrepo-asks names the 2 /api dispositions" gate line is ALREADY vacuous. |
| BG-side 4-row picture EXISTS | `consumer-constellation.md:134-143` by-name ask ledger carries aurora + timeline + **ring** (3); the bbnf `--glass-blur-dock` retune is `bg-build-map.md §2.U1`'s. |

---

## §0 The defect, restated precisely (and the ONE correction to the prompt's framing)

The prompt says "widen `proof:crossrepo-asks` to 3 asks to kill the exactly-2 vacuous-green." That framing is **half-right and must be corrected in the spec**, because `proof:crossrepo-asks` at HEAD is a **BB-tranche gate that never reads BH's roster** (`RELAY` is hardcoded to the BB relay path). Bumping its internal count would not help — it does not enumerate BH's asks at all. Two consequences the corrected approach must carry:

1. **The vacuous-green is worse than "the gate certifies 2 of 4."** The BB gate certifies the *BB* roster; it is GREEN over BH's roster **no matter how many rows BH carries** (0, 2, or 4). BH's PLAN.md gate line ("`proof:crossrepo-asks` names the 2 /api consumer dispositions") points at a gate that structurally cannot see BH. So the fix is not "3→4 count" — it is **give BH a gate that reads BH's roster and derives its expected-ask set from the authoritative BG-side sources**, so the count can never be hand-frozen.

2. **The 4-row table is not "add 2 to BH's 2."** The BG-side `consumer-constellation.md` already reconciled the roster to **4** in one place (its ask ledger: aurora, timeline, **ring**, plus the `--glass-blur-dock` retune that lives in `bg-build-map §2.U1`). BH's `asks-and-consumes.md` is the **stale side** — it froze at the pre-GU-3, pre-G7 2-row snapshot. The corrected approach makes BH's roster the reconciled 4 AND makes BOTH interleave sides (BH `asks-and-consumes.md` + BG `bh-interleave-map.md:83`) agree (the seed's binding rule: "BOTH sides of the interleave must agree post-fold").

**The four rows, canonically (from the BG-side authoritative sources):**

| # | ask id | sibling | site(s) | break vector | new home / disposition | source-of-record |
|---|---|---|---|---|---|---|
| 1 | `migrate-api-to-aurora` | muster | `frontend/src/composables/useAuroraConfig.ts:47` | `/api` drop | `DEFAULT_AURORA_CONFIG`+`AuroraConfig` → `/aurora` | already in BH `asks-and-consumes.md:13` |
| 2 | `migrate-api-to-timeline` | speedtest | `PhaseTimeline.vue:52` (+ dead `vite.config.mjs:1033`) | `/api` drop | `TimelineSegment` → `/timeline` | already in BH `asks-and-consumes.md:14` |
| 3 | `migrate-ring-to-focus-ring-color` | atlas | 12 bare `var(--ring)` / 11 files (+8 fallback-degrading) | `--ring → --focus-ring-color` rename, NO alias (BG-WS10) | fallback-first re-point off the pinned MIGRATION row | `GU-3-TRIAGE.md:16,34`; `consumer-constellation.md:91-94,140` |
| 4 | `bbnf-glass-blur-dock-retune-no-op` | bbnf-buddy | `preset.css:230` (LIVE) | `--glass-blur-dock` chain retirement (BG-WS10 / W-CLOSEFIX-9SITE) | bbnf re-points its dock blur onto `--dock-surface-blur`/`--glass-blur-resting` on `^5.0.0` | `bg-build-map.md §2.U1 (:1265-1284)` |

**Figure-reconciliation note (do NOT re-count).** A naive one-line `grep 'var(--ring)'` over atlas at this pass returned 10 files / 11 bare / 9 fallback; the GU-3 census records **12 bare / 11 files + 8 fallback + 1 vft self-immune** (`consumer-constellation.md:91`, `:150` "12 bare + 8 fallback + 1 vft self-immune = 20 total, matching the GU-3 census exactly"). The discrepancy is the simple grep's line-boundary blindness (a `var(--ring)` spanning a wrapped declaration, or a template-literal site the grep missed). **The spec's amendment MUST cite the GU-3/`consumer-constellation.md` figures BY REFERENCE, never re-derive a fresh count** — this is the census-drift trap (F5) applied to the atlas count. The row is "12 bare / 11 files per the GU-3 census," pinned to that source-of-record.

---

## §1 The exact amendments — BH `docs/tranches/BH/PLAN.md`

### Amendment A — de-hardcode the "exactly 2" at the three PLAN sites

**A1 · `PLAN.md:29` (§2 decision-#2 table row).** The "exactly ONE dropped key + 3 orphan re-homes; 200 of 203 /api symbols…" clause is describing the **/api-fold break vector ONLY** — it is CORRECT for that vector and MUST NOT be widened to claim it covers the whole roster. But it currently reads as the total consumer-facing break. Amend to scope it:

> **BEFORE:** `The actual break is small (see §7): exactly ONE dropped key (\`./api\`) + 3 orphan re-homes; 200 of 203 /api symbols are pure import-path swaps.`
> **AFTER:** `The /api-fold break is small (see §7): exactly ONE dropped key (\`./api\`) + 3 orphan re-homes; 200 of 203 /api symbols are pure import-path swaps. The 5.0.0 cut carries THREE break vectors total (see §7 + B7) — the /api drop, the \`--ring → --focus-ring-color\` rename (BG-WS10, atlas consumer), and the \`--glass-blur-dock\` retirement (BG-WS10, bbnf consumer) — a 4-row consumer-ask roster, not a /api-only break.`

**A2 · `PLAN.md:106` (§4 B7 wave body).** This is the load-bearing hardcode. Replace the "exactly 2 by-name asks" body with the reconciled 4-row roster + the widened gate line. The full replacement is in §4 below (the drop-in B7 wave text).

**A3 · `PLAN.md:141` (§7 "The 5.0.0 break, exactly").** Amend the "exactly 2 sibling repos" clause to the 3-vector / 4-row shape:

> **BEFORE:** `Across the entire constellation, exactly **2 sibling repos** import \`/api\` (muster, speedtest) — each owes a one-line by-name ask.`
> **AFTER:** `Across the entire constellation, exactly **2 sibling repos** import \`/api\` (muster, speedtest) — each owes a one-line by-name ask. TWO further consumers owe a token-migration ask NOT on the /api axis: atlas (\`--ring → --focus-ring-color\`, 12 bare sites per the GU-3 census) and bbnf-buddy (\`--glass-blur-dock\` retire, \`preset.css:230\`). The B7 roster is **4 by-name asks across 3 break vectors** (§B7); the /api axis is 2 of them.`

**A4 · `PLAN.md:69` (§4 B2.2 wave gate line — the FIRST vacuous reference).** The B2.2 gate line reads `proof:crossrepo-asks names the 2 /api consumer dispositions`. Amend to point at the BH-scoped gate (§3) and the correct axis:

> **BEFORE:** `**Gate:** the 203-row map arm GREEN; \`proof:crossrepo-asks\` names the 2 /api consumer dispositions.`
> **AFTER:** `**Gate:** the 203-row map arm GREEN; \`proof:crossrepo-asks:bh\` (the BH-scoped arm, §B7) names the 2 /api consumer dispositions on the /api axis (the full 4-row roster + \`proof:retired-token-consumers\` land at B7).`

### Amendment B — §5 residual-risk note (record the atlas-count-drift trap)

Add a residual item after `PLAN.md:120` (§5-#5, the speedtest vite-config note) so a verbatim re-read does not re-count the atlas sites:

> **8. The atlas `--ring` site count is a GU-3-census snapshot, cite-not-re-count.** The B7 row-3 figure (12 bare / 11 files + 8 fallback) is the GU-3 census (`consumer-constellation.md:91,150`, `GU-3-dock-consume.md §ASK-B`), not a fresh grep. A naive one-line `grep 'var(--ring)'` under-counts (line-boundary blindness). The atlas re-points ATOMIC with the 5.0.0 cut off the pinned MIGRATION row; the count is the consumer's to re-verify at consume-time against its pinned commit — glass-ui records the ask, never re-derives the count (the foreign-tree fence + the census-drift trap, F5).

---

## §2 The exact amendments — BG `docs/tranches/BG/execution/bh-interleave-map.md`

Only ONE row + one summary count must change so BOTH interleave sides agree post-fold.

**B1 · `bh-interleave-map.md:83` (B7 interleave row).** Widen from 2 asks to 4 + name the two born-RED gates:

> **BEFORE:** `| W-api-ask-roster | **[WS12]** | WS12 + B2.2 | the 2 by-name asks: muster→/aurora · speedtest→/timeline (+ drop dead \`vite.config.mjs:1033\`) | issues at the 5.0.0 cut after B2.2 lands. Confirm BG-WS5 owns the viz-subpath/slides migration. |`
> **AFTER:** `| W-api-ask-roster | **[WS12]** | WS12 + B2.2 | the 4 by-name asks across 3 vectors: /api → muster→/aurora · speedtest→/timeline (+ drop dead \`vite.config.mjs:1033\`); \`--ring\` → atlas→\`migrate-ring-to-focus-ring-color\` (GU-3 ASK-B fold); \`--glass-blur-dock\` retire → bbnf→\`bbnf-glass-blur-dock-retune-no-op\` (G7 U1-1). Gate: \`proof:crossrepo-asks:bh\` + born-RED \`proof:retired-token-consumers\` | issues at the 5.0.0 cut after B2.2 lands. Confirm BG-WS5 owns the viz-subpath/slides migration. |`

**B2 · `bh-interleave-map.md:84` (the note under B7).** Extend to record the cross-tranche ownership so BG's side names the two gates BG minted:

> APPEND: `The atlas \`--ring\` row is the GU-3 ASK-B fold (\`GU-3-TRIAGE.md:16,34\` assigns it to the BH agent); the bbnf \`--glass-blur-dock\` row is the G7 U1-1 fold (\`bg-build-map.md §2.U1\`). \`proof:retired-token-consumers\` (BG-minted, U1-2, born-RED on \`bbnf:230\`) is wired into BG.W-CLOSEFIX-9SITE's Gate set AND re-referenced by BH B7's gate line; the two tranches share the ONE gate, no fork.`

**B3 · `bh-interleave-map.md:174` (§5 "The whole consumer break" summary).** Amend "exactly 2 siblings import `/api` → 2 by-name asks (B7)" to name the 3-vector shape (same content as PLAN §7 A3, mirrored so the two docs are byte-consistent on the number):

> **BEFORE:** `Across the constellation exactly 2 siblings import \`/api\` → 2 by-name asks (B7): muster→/aurora, speedtest→/timeline.`
> **AFTER:** `Across the constellation exactly 2 siblings import \`/api\` → 2 by-name asks (B7): muster→/aurora, speedtest→/timeline. B7 carries 2 more token-migration asks off the /api axis — atlas (\`--ring\` rename, GU-3 ASK-B) + bbnf-buddy (\`--glass-blur-dock\` retire, G7 U1-1) — a 4-row roster across 3 break vectors.`

**No other BG file is written.** `GU-3-TRIAGE.md`, `consumer-constellation.md`, `bg-build-map.md` are the SOURCES-of-record — they already carry the atlas + bbnf assignments correctly; BH is the drifted consumer. The fold makes BH catch up, it does not re-author BG's authoritative disposition.

---

## §3 The gate wiring — `proof:crossrepo-asks` re-scope + `proof:retired-token-consumers` born-RED

This is the load-bearing half — the "exactly 2" vacuous-green is killed by a gate that reads BH's roster and derives its expected set from the authoritative sources (never a hand-frozen count). Two gates:

### G-A · `proof:crossrepo-asks:bh` — the BH-scoped arm (NOT a count bump on the BB gate)

The HEAD `scripts/proof-crossrepo-asks.mjs` is BB-scoped by three hardcoded constants (`RELAY`/`AMENDMENT`/`INBOUND` → `docs/tranches/BB/…`). Widening its internal count is a no-op for BH — it never reads BH's roster. The correct build (owed at BH B7, prototyped-in-shape here):

- **Shape: a BH-scoped SIBLING arm, not a rewrite of the BB gate.** Mint `scripts/proof-crossrepo-asks-bh.mjs` (id `proof:crossrepo-asks:bh`, tags `[local,ci,release]`) OR — cheaper and preferred — parameterize the existing gate by an `--tranche=BH` flag that swaps the `RELAY`/`AMENDMENT` constants + the `EXPECTED_ASKS` table. Either way the BB arm stays byte-green (the BB relay is a closed tranche; its ask-set is frozen), and the BH arm reads `docs/tranches/BH/coordination/asks-and-consumes.md`.
- **`EXPECTED_ASKS` DERIVED from the BG-side authoritative sources (the anti-hardcode discipline the BB gate already models `:60-71`).** The BH expected-ask set is NOT a frozen `["aurora","timeline"]`. It is derived by reading the two authoritative source docs and requiring the BH relay to cover every ask they name:
  - `migrate-api-to-aurora` / `migrate-api-to-timeline` — anchored in `consumer-constellation.md:138-139` (the by-name ask ledger).
  - `migrate-ring-to-focus-ring-color` — anchored in `GU-3-TRIAGE.md:16` ("ACTION for the BH agent: add the atlas `--ring` re-point as a B7 row") AND `consumer-constellation.md:140`. Its liveness test: the source names it → the BH relay MUST cover it (a relay that drops it reds — exactly the "records N-1 of N" bite the BB gate's W1 already implements `:167-179`).
  - `bbnf-glass-blur-dock-retune-no-op` — anchored in `bg-build-map.md:1272` (U1-1). Same liveness→coverage law.
- **W2 (consumer-wave-exists) re-pointed to BH waves.** Each ask names a CONSUMER wave existing in the BH plan: the two /api asks → B2.2 `W-api-fold`; the atlas ask → `BG.W-DESHADCN-TOKEN-REPLACE` (WS10, cross-tranche — the gate must permit a cross-tranche wave-ref for the folded-from-BG asks, OR the ask's "wave" is BH B7 `W-api-ask-roster` itself since B7 is where the relay row lands); the bbnf ask → `BG.W-CLOSEFIX-9SITE` (G4/WS10) as the retiring wave. Record the cross-tranche wave refs explicitly.
- **W4 (foreign-tree fence) unchanged** — the BB gate's `:262-273` "no `../sibling/` path in the wave File Bounds" arm is inherited verbatim; the BH relay records the fence too (it already does, `asks-and-consumes.md:3`).
- **Self-test bite (inherited shape).** A synthetic BH relay that DROPS the atlas OR the bbnf ask MUST red (the "records 3 of 4" / "records 2 of 4" bite). This is the mechanized kill of "exactly 2" — the count can never be hand-frozen because it is derived-from-source.

### G-B · `proof:retired-token-consumers` — born-RED, [local,ci,release] (BG-minted, BH-referenced)

- **Ownership: BG mints it** (U1-2, `bg-build-map.md:1276-1284`), wired into `BG.W-CLOSEFIX-9SITE`'s Gate set (the wave that retires `--glass-blur-dock`). **BH B7 does NOT re-mint it** — BH's gate line REFERENCES it (the ONE gate, no fork).
- **Shape (per U1-2):** re-architected CI-safe through `constellation.mjs presentConsumers()`/`resolveSibling()` — a sibling ABSENT from the siblings-absent `--run full` close runner resolves FALSE (graced), not a crash (the `proof:lineage-probe` present-false seam). It is the TOKEN twin of inv-11's EXPORT `proof:lineage-probe`.
- **Born-RED anchor:** `bbnf-buddy/src/styles/preset.css:230` `--glass-blur-dock: var(--glass-blur-cartoon)` (LIVE, verified) — the gate reds until BH B7 records the `bbnf-glass-blur-dock-retune-no-op` migration row in `asks-and-consumes.md`, then GREEN. Synthetic bite: a retired token with a live consumer + no recorded migration row must red.
- **BH's obligation:** B7's gate line ADDS `proof:retired-token-consumers` to the B7 wave gate set (so BH's own plan carries the reference the born-RED→GREEN flip depends on), and the B7 roster records the bbnf migration row that greens it.

---

## §4 Drop-in B7 wave text (`PLAN.md:105-106` replacement)

The verbatim replacement for the B7 band body (the single largest edit):

> **### B7 — Consumer-migration cross-repo asks · 1-2 waves · [WS12]**
>
> **W-api-ask-roster.** The 5.0.0 cut carries THREE break vectors → a **4-row by-name-ask roster** (`docs/tranches/BH/coordination/asks-and-consumes.md`), issued at the cut after B2.2 lands and the export diff is final:
> - **/api axis (2 asks) —** muster→/aurora (`useAuroraConfig.ts:47`, `DEFAULT_AURORA_CONFIG`+`AuroraConfig`); speedtest→/timeline (`PhaseTimeline.vue:52`, `TimelineSegment`, + drop the dead `vite.config.mjs:1033` optimizeDeps string in the same ask).
> - **`--ring` rename axis (1 ask) —** atlas→`migrate-ring-to-focus-ring-color` (the GU-3 ASK-B fold, `GU-3-TRIAGE.md:16,34` assigns it to the BH agent): BG-WS10 `W-DESHADCN-TOKEN-REPLACE` renames `--ring → --focus-ring-color` with NO alias, breaking atlas's **12 bare `var(--ring)` sites across 11 files** (+8 fallback-degrading; the GU-3 census figure, cite-not-re-count — §5-8). atlas re-points fallback-first off the pinned 5.0.0 MIGRATION row, ATOMIC with the cut.
> - **`--glass-blur-dock` retire axis (1 ask) —** bbnf-buddy→`bbnf-glass-blur-dock-retune-no-op` (the G7 U1-1 fold, `bg-build-map.md §2.U1`): BG-WS10 / `BG.W-CLOSEFIX-9SITE` retires the `--glass-blur-dock` chain; bbnf's `preset.css:230` override silently reverts 22px→8px. bbnf re-points its dock blur onto `--dock-surface-blur`/`--glass-blur-resting` on its `^5.0.0` bump (THEIR edit — foreign-tree fence).
>
> **Cross-reference:** BG-WS5 OWNS the viz-subpath (`/constellation`, `/fourier-field`) consumer migration with SLIDES + atlas as the named re-baseline consumers (key-preserving — a visual re-baseline, NOT an import re-point; no B7 ask). The `--ring` + `--glass-blur-dock` rows are cross-tranche folds FROM BG (GU-3 ASK-B + G7 U1-1); the two ORIGINATE in WS10 but the migration ROW lands in BH B7 — BOTH interleave sides agree (`bh-interleave-map.md:83`). The B1c kf/value interims carry ZERO asks. `words/frontend/glass-ui/` is a vendored inv-11 fork (no row); slides/slides-K/bbnf-non-blur consumes are key-preserving (no /api).
>
> **Gate:** `proof:crossrepo-asks:bh` (the BH-scoped arm, §B7-G-A — reads `asks-and-consumes.md`, expected-ask set DERIVED from `GU-3-TRIAGE.md` + `consumer-constellation.md` + `bg-build-map §2.U1`, so a dropped atlas/bbnf ask reds — the "exactly 2" hand-freeze is mechanically impossible) GREEN; `proof:retired-token-consumers` (BG-minted U1-2, born-RED on `bbnf:230` → GREEN once this roster records the row) GREEN; the 203-row /api map byte-complete against the export diff.

And the matching `asks-and-consumes.md` edit: **append rows 3 + 4** to the Asks table (`asks-and-consumes.md:11-16`) and add a "Token-migration asks (off the /api axis)" subsection so the roster is 4 rows, each with its source-of-record cross-reference. (The B7 wave AUTHORS this roster edit; the spec records the two rows to add, not a pre-authored file — write-fence: PASS 1 records, the fold applies.)

---

## §5 The verifying check (does the fix hold)

A single deterministic verification, runnable at fold-time and at B7 execution:

**V1 — plan-text coherence (fold-time, grep-decidable).**
```
# BOTH sides carry all 4 ask-ids:
for id in migrate-api-to-aurora migrate-api-to-timeline migrate-ring-to-focus-ring-color bbnf-glass-blur-dock-retune-no-op; do
  grep -q "$id" docs/tranches/BH/coordination/asks-and-consumes.md || echo "MISS relay: $id"
done
# NO surviving "exactly 2 by-name" / "the 2 by-name asks" hardcode:
grep -rn 'exactly 2 by-name\|the 2 by-name asks\|exactly \*\*2 sibling' \
  docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md   # → EMPTY
# BOTH gate names referenced in BH B7:
grep -q 'proof:crossrepo-asks:bh' docs/tranches/BH/PLAN.md
grep -q 'proof:retired-token-consumers' docs/tranches/BH/PLAN.md
```
PASS iff: 4 ask-ids present in the BH relay, the "exactly 2" grep is EMPTY across both interleave docs, both gate names referenced in BH B7.

**V2 — the interleave sides AGREE (the seed's binding rule).** `bh-interleave-map.md:83` and `PLAN.md` B7 both name 4 rows / 3 vectors and both name `proof:crossrepo-asks:bh` + `proof:retired-token-consumers`. Diff the ask-id set extracted from each; MUST be identical.

**V3 — gate born-RED→GREEN (B7 execution, the binding truth).**
- `proof:retired-token-consumers` runs RED at the moment `--glass-blur-dock` retires with `bbnf:230` un-migrated + no recorded row; runs GREEN once `asks-and-consumes.md` carries the `bbnf-glass-blur-dock-retune-no-op` row. (The born-RED→GREEN flip is the load-bearing witness — a gate that is GREEN before the row is recorded is vacuous.)
- `proof:crossrepo-asks:bh` self-test bite: a synthetic BH relay dropping the atlas OR the bbnf ask MUST red (records 3-of-4 reds; records 2-of-4 reds). This is the mechanized "exactly 2 can never be hand-frozen."

**V4 — figure-drift fence.** The atlas row cites "12 bare / 11 files per the GU-3 census," NOT a fresh grep count (§5-8). Verify the row's number MATCHES `consumer-constellation.md:91` / `:150`, and that no fresh atlas re-count was performed in the amendment (the census-drift trap closed).

**V5 — siblings-intact.** `node scripts/verify-siblings-intact.mjs --quiet` exit 0 before + after (this pass: exit 0 both). No foreign-tree write; every bbnf/atlas read was read-only grep.

---

## §6 Feasibility verdict + residual

**FEASIBLE — the fix holds.** It is bounded plan-text (4 PLAN edits + 3 bh-interleave-map edits + a 2-row roster append) + a gate re-scope (BH-scoped `proof:crossrepo-asks:bh` arm) + a reference to a BG-minted born-RED gate (`proof:retired-token-consumers`). Zero src touch, zero feasibility spike, zero foreign-tree mutation. Every target is verified on disk; both missing rows have an authoritative BG-side source-of-record; both gates have a precise born-RED anchor (`bbnf:230`) + a mechanized anti-hardcode discipline (derived expected-ask set).

**One residual, flagged-at-execution (does NOT block authoring):**
- **Cross-tranche gate ownership timing.** `proof:retired-token-consumers` is BG-minted at `BG.W-CLOSEFIX-9SITE` (WS10-adjacent) but BH B7 (post-WS12) references it. If BG's build lands the gate as specced (U1-2), BH's reference is satisfied; if BG's build drifts (drops the gate), BH B7's gate line dangles. **PASS-2 residual (mirrors §3-gap-2 for the C1 kf gate): confirm `BG.W-CLOSEFIX-9SITE` carries `proof:retired-token-consumers` in its real build Gate set** so BH's B7 reference locks against a gate that exists. The seed's cross-tranche-owned-gate hazard (clause without landing = reds-forever; landing without reference = ships silently) applies identically here — the fix is the mutual reference this spec installs on BOTH sides.

---

**artifactPath:** `docs/tranches/BH/audit/RESPEC-COHERENCE/pass-1-proto-T2.md`
siblings-intact exit 0 (after). Only file written: this report.
