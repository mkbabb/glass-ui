# PASS 1 RESEARCH — CURSOR/COMMIT TRUTH-TABLE (lens: cursor-truth)

**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · **Base:** `master` (`998136bb`, 121 commits behind) · **pkg version:** `4.2.0` (cut target 5.0.0)
**Method:** reconcile `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` row-by-row against `git log master..tranche/BG`; verify every claimed commit resolves; RUN the device-free gates the landed waves claim GREEN at HEAD; verify paint artifacts resolve on disk; classify spec-CONVERGENCE vs execution. siblings-intact exit 0 (start). typecheck exit 0 · build exit 0.

---

## 1. THE HEADLINE TRUTH

**What is REALLY built = 5 bands, ~32 execution commits, foundation sound.** Every claimed commit hash resolves. typecheck + build GREEN at HEAD. The WS1 paint claims are backed by REAL on-disk PNGs (2880×1800, sips-verified) + DELTA.md per wave — the cardinal-lesson floor holds for WS1/WS4.

**The PENDING bulk (~110 waves) is genuinely UNBUILT.** WS2/WS5/WS6/WS8/WS9/WS10/WS11/WS12 each have **0 execution-build commits**. The WS8/WS10/WS11/WS12 git commits are `spec CONVERGED — X%` tranche-DEV records (12 total), correctly NOT mistaken for execution by the cursor.

**THE LOAD-BEARING DEFECT: the close-battery is NOT green at HEAD.** Three `ci`/`release`-tagged close gates are RED — all the SAME "a wave greened its OWN gate and left a registered sibling close-gate un-re-pointed" class the `VALIDATION-REPORT.md` named for the WS1/[C] batch. The validation+fix-wave (`ea4682c0`) remediated 12 such reds for everything ≤ `ff0933a3`. **But the 4 batches that landed AFTER the fix-wave (WS3 rows 3.1/3.6/3.7 + WS4 row 10.25) re-opened the close with 3 NEW collateral reds that the cursor never re-validated.** The pattern is recurring and compounding.

---

## 2. THE THREE LIVE CLOSE-BATTERY REDS AT HEAD (un-tracked by the cursor)

| Gate | tagset | Cause | Origin wave/commit |
|------|--------|-------|--------------------|
| `proof:no-god-module` | ci/release | `src/styles/glass/ladder.css` = **527 L** (>500) + `src/styles/dock/shell.css` = **510 L** (>500); neither in the ratchet baseline | WS3 3.6 `GLASS-BLUR-PEER` (`cd9ce46c`) + 3.7 `GLASS-IDIOM-FACTOR` (`6ec81deb`) grew them; no rebaseline owed-note |
| `proof:no-dead-token` | ci/release | `--glass-blur-dock` declared (`glass.css:166`, `dark-arm.css:286`) with **0 `var(--glass-blur-dock)` readers** | WS3 3.6 (`cd9ce46c`): `dock/shell.css` re-pointed `--dock-surface-blur: var(--glass-blur-dock,…)` → `var(--glass-blur-resting)` (the unified 8px peer), orphaning the composed token |
| `proof:tag-parity` | ci/release | `proof:category-card-warm` registered `tags: ["local"]` — a static src-scan gate missing `ci`, not in JUSTIFIED_LOCAL_ONLY | WS4 10.25 (`9e13965d`) registered its gate local-only |

`proof:ship-attestation` is also exit 1 but is **born-RED-by-design** (the intended tag-blocker, flips at the Metal ship ceremony) — NOT a defect.

**Remediation is trivial (mirrors the fix-wave clusters):** rebaseline no-god-module for ladder/shell with a carve-pending note OR carve them; allowlist or delete `--glass-blur-dock`; promote `proof:category-card-warm` to `ci`. None touch library logic. **But the cursor marks all three waves DONE/PAINT-PENDING with their OWN gate GREEN — the close reds are invisible at the row level.** This is exactly why the user is "not confident the implemented items were done properly": each wave's local claim is true; the *integrated close* is not green, and nothing re-checks it after each batch.

---

## 3. THE TRUTH-TABLE (per cursor row, claim vs reality)

### PHASE 0 — WS7 ground-freeze (rows 0.1–0.6) — **KEEP-VERIFIED**
All 6 commits resolve; gates run GREEN at HEAD (`proof:disposition-live`, `proof:bg-deferred-ledger`, `proof:be-bf-ledger` exit 0). `proof:ship-attestation` exit 1 = born-RED-by-design tag-blocker (intended, certified). 0.1 PAINT-IS-THE-GATE FAIL is the by-design born-RED Metal anchor (DONE-override certified). `VALIDATION-REPORT` graded 5/6 proper; the 6th (0.4 DEFERRED-LEDGER) was clobbered by `ba23c086` then FIXED by the fix-wave — `proof:bg-deferred-ledger` GREEN now. **Reality matches claim.**

### PHASE 1 — BH concurrent-safe [C] (rows 1.1–1.12) — **KEEP-VERIFIED**
All 12 commits resolve; every device-free gate GREEN at HEAD (`proof:git-hygiene`/`external-payload`/`peer-conformance`/`drag-morph`/`alias-codemod`/`subpath-classify`/`colocation`/`design-docs-files`/`consumer-evidence-live`/`core-prompts` all exit 0). `VALIDATION-REPORT` graded all 12 proper. The `@glass` codemod (1.5) + snap-excise (1.4) were the *root cause* of 6 of the fix-wave's re-points, now closed. **Reality matches claim.**

### PHASE 2 — WS1 shell/routing/field (rows 2.1–2.7) — **KEEP-VERIFIED (2.1–2.6); 2.7 AMEND**
- 2.1–2.6: commits resolve; device-free gates GREEN at HEAD (`route-confounder`/`route-single-root`/`no-paper-field`/`focal-complete`/`field-accent-reconcile`/`hero-fit` exit 0). **Paint artifacts RESOLVE ON DISK and are real PNGs:** route-transition 71 PNGs · field-aurora 16 · scroll-progress 30 · hero-fit 34 + 6 DELTA.md. The cardinal-lesson floor is MET for WS1.
- **2.2 FIELD-AURORA is the cautionary keep:** the device-free gates passed (`VALIDATION-REPORT` verdict 20 = "proper") WHILE the live dark-mode paint was **CATASTROPHICALLY broken** — hero h1 2.14:1, muted 1.04:1 (a single light palette composited over the near-black dark page to a brown wash). Caught only by the re-paint (`b3d65eec`), now 13.87:1. **This is the live proof that device-free GREEN ≠ correct** — directly relevant to the un-painted WS3 rows below.
- **2.7 VT-ROUTE-ENHANCE — AMEND status:** marked **DONE but explicitly NOT BUILT** ("DEFERRED-NOT-BUILT … marked DONE to skip the build frontier"). The defer reasoning is sound (the persistent-shell-`<Aurora>` VT-snapshot GOTCHA needs live paint), but recording an un-built wave as DONE is a status-integrity smell. Should read DEFERRED, re-attempt at W-REFLECT3.

### PHASE 3 — WS3 glass standardization (rows 3.1–3.11) — **PARTIAL / HALF-BAKED**
- **3.1 CARTOON-INK-GAMUT** (`3857b33b`, PAINT-PENDING) — `proof:no-gray` GREEN. Source landed. **Never paint-verified.**
- **3.6 GLASS-BLUR-PEER** (`cd9ce46c` + `353eac5d`, PAINT-PENDING) — `proof:glass-cal` GREEN. Source landed. **Never paint-verified.** Demoted the default `<Button>` off glass-deep onto a unified 8px peer + orphaned `--glass-blur-dock` (→ red #2) + grew shell.css/ladder.css past 500 (→ red #1).
- **3.7 GLASS-IDIOM-FACTOR** (`6ec81deb`, DONE) — `proof:glass-idiom-factor` GREEN (H-class, no paint owed). Source landed clean (DRY `--glass-plate-tinted`).
- **3.2–3.5, 3.8–3.11: PENDING — NOT BUILT** (0 execution commits). This is the frontier where the pause hit.
- **Verdict: half-baked.** 3.1/3.6 carry source + own-gate-green but are paint-pending-forever AND collectively introduced 2 of the 3 live close reds. Keep the deliverables; AMEND the close reds; the paint is OWED and (per 2.2) cannot be assumed correct.

### PHASE 10 — WS4 row 10.25 CATEGORY-CARD-WARM (`9e13965d`) — **KEEP-VERIFIED + AMEND**
USER-REPORTED metallic-wash defect. `proof:category-card-warm` GREEN; 12 real PNGs (2880×1800) + DELTA.md on disk; dual-engine PASS recorded. Source + paint sound. **AMEND only:** the gate is registered `["local"]` → breaks `proof:tag-parity` (red #3). Promote to `ci`.

### PHASES 4–9, 11–19 — the BULK (WS2/5/6/8/9/10/11/12 + BH WS2–WS12 restructure) — **PENDING, UNBUILT**
0 execution commits. The git history's WS8/10/11/12 entries are all `spec CONVERGED` tranche-DEV records. Genuinely not started. Spec-soundness assessment is PASS-2+ per-band work (this lens does not adjudicate it). Highest-blast-radius unbuilt items: BH [WS12] `subpaths-delete` (18.1), `/api-fold` drop ./api 203 re-homes (18.2), `B4f-claude-delete` ABSOLUTE-LAST (19.2), WS12 480-capture dual-engine verdict (17.6), WS8 C-SAFARI ★★★ Metal capture (13.x).

---

## 4. SPEC-CONVERGENCE vs EXECUTION (the boundary is clean)

- **12 `spec CONVERGED` commits** = tranche-DEV (WS1→WS12 convergence + lock `071c2610` + plan `63f6aa2c`). NOT execution.
- **~32 execution-build commits**: WS1 (7) · WS7 (6) · WS3 (4) · WS4 (1) · BH B0/B1/B2/B4/B6 (13).
- The cursor correctly does NOT count the convergence commits as landed features (SEED-CONTEXT §"What is NOT built" calls this out explicitly).

---

## 5. CLOBBER SURFACE

- The one `VALIDATION-REPORT` clobber (B2.0 codemod vs `demo:dist` infra `26ac25af`, `proof:alias-codemod` comment false-positive) is **CLOSED** — `proof:alias-codemod` exit 0 at HEAD.
- **No source-revert clobbers found.** The 3 live reds are additive collateral (token orphan + over-500 growth + mis-tag), not overwritten deliverables.
- **Forward-clobber WATCH (PASS-2):** WS3 3.6 demoted the default surface off the deep-glass tier onto the 8px peer. WS8 (glass-deep apotheosis) is specced to read the deep refractive tier. Confirm 3.6's demotion and WS8's deep-tier assumptions are compatible before WS8 builds, or WS8 re-opens 3.6.

---

## 6. FOUNDATION HEALTH (at HEAD)
typecheck exit 0 · build exit 0 (79 subpath d.ts flattened) · `proof:gate-script-parity` exit 0 (bijection intact) · siblings-intact exit 0. Core library is sound; the defects are all gate/ledger/registry/CSS-budget re-points, never broken runtime logic.
