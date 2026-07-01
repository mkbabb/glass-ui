# BH PASS 1 — CONSUMER-CONSTELLATION RE-VERIFICATION (BH side)

**Lens:** consumer-constellation re-verification — does BH's B7 (consumer-migration asks) band match BG's already-folded consumer-constellation impact table?
**HEAD:** `tranche/BG` (BH shares the branch) · **Date:** 2026-06-30 · **Pass:** 1 (baseline)
**Siblings:** `node scripts/verify-siblings-intact.mjs --quiet` exit 0 before + after (the one sibling access — `bbnf-buddy/src/styles/preset.css:230` — was a READ-ONLY grep, zero bytes touched outside glass-ui).

---

## 0. VERDICT

**BH's B7 band is STILL the pre-BG-audit version — it does NOT carry BG's folded consumer-constellation impact.** Two consumer asks that BG's just-completed coherence audit generated are ABSENT from BH's B7 spec (`PLAN.md:106`) AND from BH's coordination roster (`coordination/asks-and-consumes.md`):

1. **The atlas `--ring → --focus-ring-color` THIRD by-name ask** (BG GU-3 ASK-B) — the BIGGER gap. BG's `GU-3-TRIAGE.md:16` carries an EXPLICIT `→ ACTION for the BH agent: add the atlas --ring re-point as a B7 row.` BH never added it. BH's B7 spec instead asserts **"exactly 2 by-name asks"** and hardcodes that count in three places.
2. **The bbnf-buddy `--glass-blur-dock` retired-token migration row** (BG G7 §2.U1 / build-map:1265-1281) — the row the prompt named. It is ABSENT from every BH file. BH's census still lists bbnf-buddy as "Zero /api. Every key preserved" — TRUE for the export axis but SILENT on the token-retire axis BG's audit surfaced.

BG's authoritative, fully-folded 6-consumer table is `docs/tranches/BG/execution/consumer-constellation.md` — it names **3 asks landing "5.0.0 (BH B7)"** (muster, speedtest, atlas) + the bbnf token-retire row. BH captures only 2 of the 4. The BH B7 "exactly 2" claim is a **stale count** contradicted by BG's fold.

Severity: **HIGH.** These are not doc-cosmetic drifts — a missing B7 row is a silent consumer break at the 5.0.0 cut (the exact inv-11 / `feedback_glass_ui_binding_verification` class the whole BH tranche is meant to close). The atlas `--ring` miss breaks 12 live bare `var(--ring)` sites across 11 atlas files the instant the un-aliased rename lands; the bbnf miss silently reverts bbnf's cartoon-dock blur 22px→8px.

---

## 1. THE RECONCILED CONSUMER-ASK TABLE (the deliverable)

BG's folded state (`consumer-constellation.md` + `GU-3-TRIAGE.md` + G7 §2.U1) vs BH's B7 spec (`PLAN.md:106`, `§7`, `§2-#2`, `coordination/asks-and-consumes.md`):

| # | Consumer | Ask id | Axis | BG folded state (authoritative) | In BH B7? | Status |
|---|---|---|---|---|---|---|
| 1 | **muster** | `migrate-api-to-aurora` | `/api` drop → `/aurora` (`useAuroraConfig.ts:47`, `DEFAULT_AURORA_CONFIG`+`AuroraConfig`) | ROW — `consumer-constellation.md:69,138` | **YES** (row 1) | ✅ MATCH |
| 2 | **speedtest** | `migrate-api-to-timeline` | `/api` drop → `/timeline` (`PhaseTimeline.vue:52`, `TimelineSegment`) + drop dead `vite.config.mjs:1033` optimizeDeps string | ROW — `consumer-constellation.md:82,139` | **YES** (row 2) | ✅ MATCH |
| 3 | **atlas** | `migrate-ring-to-focus-ring-color` | `--ring → --focus-ring-color` rename (no alias); **12 bare `var(--ring)` sites / 11 files** BREAK + 8 fallback DEGRADE | ROW — `consumer-constellation.md:94,140`; `GU-3-TRIAGE.md:16,34` names it **"the THIRD consumer migration … BH B7"** with an explicit BH-agent ACTION | **NO** | ❌ **MISSING (HIGH)** |
| 4 | **bbnf-buddy** | `bbnf-glass-blur-dock-retune-no-op` | `--glass-blur-dock` retire (G4/`BG.W-CLOSEFIX-9SITE`) silently reverts bbnf `preset.css:230` `blur(22px) saturate(1.6)` → 8px default | ROW — G7 §2.U1 / `bg-build-map.md:1272` "U1-1 — the B7 migration row"; the 3 sibling overrides `--glass-bg-dock`/`--glass-border-dock`/`--shadow-dock-override` SURVIVE (asymmetric partial no-op) | **NO** | ❌ **MISSING (HIGH)** |

**BH's B7 currently: 2 rows. BG's folded impact requires: 4.** The 2 missing rows are both live cross-repo consumer breaks with a born-RED gate already specced BG-side (`proof:crossrepo-asks` for the atlas row; `proof:retired-token-consumers` for the bbnf row).

### Non-ask consumers (census — key-preserving, correctly no /api ask on BOTH sides)

| Consumer | BG state | BH census | Reconcile |
|---|---|---|---|
| **slides** | viz re-baseline only (`/fourier-field`+`/constellation` keys PRESERVED — BG-WS5 owns migration); + 4.0.0 BA reshape latent | Named only obliquely (the BG-WS5 cross-ref line 25); NOT in the census list | ⚠️ PARTIAL — BH cross-refs BG-WS5's slides viz migration but does not enroll slides as a consumer in its census. No /api ask owed (correct), but the 4.0.0-reshape latent-jump note is absent BH-side. |
| **slides-K** | 4.0.0 Dialog `variant`→`surface` break (live witness `DeckGate.vue:41`); no /api, no `--ring` | Census row 21: "/deck, /dock, /controls, /button, /forms, /separator, /popover, /dialog. Zero /api." | ✅ Present as census; the Dialog-variant 4.0.0 latent break is BG's note, not a 5.0.0/BH-B7 ask (no ask owed — consumer's own 4.0.0 migration). MATCH on ask-count. |
| **words/frontend/glass-ui/** | vendored d6 fork (inv-11 lineage), NOT a registry consumer | Disposition note line 29 | ✅ MATCH — both treat as inv-11 note, no B7 row. |
| keyframes.js / value.js | dev/peer, zero source imports, no ask | (implicit — B1c interims carry zero asks, line 30) | ✅ MATCH — no ask. |

---

## 2. THE STALE-COUNT CONTRADICTION (the load-bearing drift)

BH hardcodes **"exactly 2 by-name asks"** in three coupled places, all now contradicted by BG's fold:

| Site | Text | BG-folded truth |
|---|---|---|
| `PLAN.md:106` (§B7) | "The roster is **exactly 2 by-name asks**: muster→/aurora; speedtest→/timeline." | 3 asks land "5.0.0 (BH B7)" (+ the bbnf token row) |
| `PLAN.md:141` (§7) | "Across the entire constellation, exactly **2 sibling repos** import `/api` (muster, speedtest)." | TRUE for `/api` axis only; the atlas `--ring` + bbnf `--glass-blur-dock` are TOKEN-axis breaks the "2 /api" framing hides |
| `PLAN.md:29` (§2-#2) | "the actual break is small … exactly ONE dropped key (`./api`) + 3 orphan re-homes." | The export break IS small; but the 5.0.0 cut ALSO ships the `--ring` rename (BG-WS10) — a SECOND consumer-facing break vector BH's §2-#2 omits |

**Root cause:** BH's B7 was scoped ENTIRELY to the `/api` export axis (its convergence pass computed the 203-symbol `/api` fold). BG's consumer audit runs on THREE break vectors (`consumer-constellation.md:22`): (1) `/api` drop, (2) `--ring → --focus-ring-color` rename, (3) viz-demigrate. BH only enrolled vector 1. Vector 2 (the `--ring` rename) is a real 5.0.0 consumer break with a NAMED BH-B7 owner in BG's ledger — BH's B7 spec never widened to it. Vector 3 is key-preserving (no ask, correctly out of B7). The bbnf `--glass-blur-dock` retire is a FOURTH token-retire break BG's G7 deep-grep surfaced that sits under NONE of BH's `/api`-scoped machinery.

This is the SAME "incomplete-pairing" shape the SEED-CONTEXT §Known-friction names: **a wave that lands the surface change (the `/api` fold + the `--ring` rename + the `--glass-blur-dock` retire) but not the consumer-side adaptation (the B7 rows)** — G2's near-miss / G5's missing-protector class, now on the consumer-ask axis.

---

## 3. GATE-SIDE COHERENCE — the two born-RED gates BH's B7 does not know about

BG's fold minted two NEW gates that BH's B7 gate line (`proof:crossrepo-asks` GREEN) does not reference:

- **`proof:retired-token-consumers`** (`bg-build-map.md:580-585,1276-1281`) — the inv-11 TOKEN twin. Re-architected CI-safe through `constellation.mjs presentConsumers()`/`resolveSibling()`, tagged `[local,ci,release]` (G7 MR-2 fixed the original `[local]`-only CI-blind version). **Born-RED on `bbnf:230` until the U1-1 B7 migration row is recorded.** If BH's B7 does not land the bbnf row, this gate stays RED at the cut battery — a live close-blocker BH's B7 spec is unaware of.
- **`proof:crossrepo-asks`** (BH B7's own gate) — BG's ledger says it "names the 2 /api consumer dispositions" (`PLAN.md:69`), but BG's fold requires it to name the atlas `--ring` disposition too (3 asks). The gate as BH specs it will pass on 2 rows while the constellation carries 4 — a vacuous-green risk (the exact gate-vacuity friction class the audit tracks).

**Live confirmation (read-only, this pass):** `bbnf-buddy/src/styles/preset.css:230` STILL reads `--glass-blur-dock: var(--glass-blur-cartoon)` on disk — the born-RED condition is real and reproducible. No `proof:retired-token-consumers` gate exists on disk yet (it is a BG build-phase deliverable), so nothing currently catches the bbnf break; the B7 row is the recorded half.

---

## 4. THE RECONCILED B7 SPEC (what BH's B7 must become)

To align with BG's folded state, BH's B7 must:

1. **Widen "exactly 2 by-name asks" → "exactly 4 consumer-migration rows"** (3 by-name asks + 1 retired-token row) across all three PLAN sites (§B7, §7, §2-#2). The `/api` export break stays "exactly ONE dropped key" (accurate) but the 5.0.0 CONSUMER-break surface is `/api` drop + `--ring` rename + `--glass-blur-dock` retire.
2. **Add ROW 3 — `migrate-ring-to-focus-ring-color` (atlas):** re-point 12 bare `var(--ring)` sites / 11 files fallback-first off the pinned 5.0.0 MIGRATION row, no alias. Home: `coordination/asks-and-consumes.md` + the 5.0.0 MIGRATION.md (BH B4e records the rename + pinned commit). Cross-ref: BG-WS10 `BG.W-DESHADCN-TOKEN-REPLACE` owns the rename; BH B7 owns the consumer ask (per `GU-3-TRIAGE.md:16,34`).
3. **Add ROW 4 — `bbnf-glass-blur-dock-retune-no-op` (bbnf-buddy):** the token-retire migration line (bbnf re-routes onto `--dock-surface-blur`/`--glass-blur-resting` OR accepts the 8px default — THEIR edit, foreign-tree fence). Home: `coordination/asks-and-consumes.md` (the U1-1 B7 row). Note the ASYMMETRY explicitly (3 of 4 bbnf dock tokens survive; only blur retires).
4. **Enroll atlas in the census** (it is currently entirely absent from BH's B7 — the largest omission; atlas is BG's `--ring` break owner + GU-1/GU-3 home, a first-class consumer).
5. **Add the slides 4.0.0-reshape latent-jump note** to the census (slides rides a 2-major jump; no ask owed, but the note prevents a "slides is clean" false-read).
6. **Wire `proof:retired-token-consumers`** into B7's gate set (its born-RED→GREEN pivot IS the bbnf row landing) alongside `proof:crossrepo-asks` (widened to 3 asks).

**Reconcile precond:** the atlas `--ring` rename and its ask are gated on BG-WS10 landing (the rename is WS10-owned); the bbnf token row is gated on G4/`BG.W-CLOSEFIX-9SITE` landing (the `--glass-blur-dock` retire). Both are post-WS12/5.0.0-cut items — consistent with BH B7's `[WS12]` sequencing. No new DAG edge beyond B7's existing after-WS12 position.

---

## 5. FRICTION / COHERENCE CLASSES OBSERVED

- **hand-authored-map drift (Class G / B)** — BH's B7 count ("exactly 2") is a hand-authored constant that fell behind BG's derived 6-consumer census. The fix is the same as BG's own G2 lesson (derive, don't hand-list): BH B7's roster should be re-derived from `consumer-constellation.md` at the fold, not carried as a frozen "2."
- **clean-break rename misses a consumer (Class C)** — the `--ring → --focus-ring-color` rename's "EXACTLY ONE consumer" premise (WS10) is the textbook Class-C miss; BG caught it (atlas = 12+8 sites), but the CATCH did not propagate into BH's B7. The propagation is the pass-1 gap.
- **retired-token silent no-op (Class K/L, inv-11)** — the bbnf `--glass-blur-dock` asymmetric partial no-op is the inv-11 TOKEN blind spot; BG made it a standing gate, BH's B7 doesn't reference it.
- **incomplete-pairing (SEED-CONTEXT named class)** — surface change (rename/retire/fold) landed, consumer-side adaptation (B7 row) missing. Recurs on the consumer-ask axis exactly as the kf-peer bump recurred on the gesture axis.

---

## 6. SCOPE NOTES / NON-FINDINGS (kept honest)

- The muster + speedtest `/api` asks are **CORRECT and complete** in BH's B7 (rows 1-2 match BG byte-for-byte incl. the speedtest `vite.config.mjs:1033` fold). BH's `/api`-axis work is sound — the gap is the axes it never opened.
- The `words/frontend/glass-ui/` inv-11 disposition, the keyframes/value dev-peer no-ask, and the B1c CONSUME-interim zero-asks are all **MATCH** — no drift.
- BH's BG-WS5 slides-viz cross-reference (line 25) is present and correct (the viz keys are preserved, migration is BG-WS5's) — this is NOT a B7 ask gap; it is correctly a "confirm BG-WS5 carries it" note.
- The prompt's phrasing "the 6 consumers: muster/speedtest/atlas/slides/slides-K/bbnf-buddy" matches BG's authoritative `consumer-constellation.md:161` summary exactly ("6 live source consumers"). BH's B7 enrolls only 4 of the 6 by name (muster, speedtest, bbnf-buddy, slides-K) and omits atlas + slides from its census — atlas being the material omission (it owns a B7 ask).
