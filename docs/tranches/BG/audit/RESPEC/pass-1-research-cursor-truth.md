# PASS 1 RESEARCH — CURSOR/COMMIT TRUTH-TABLE (lens: cursor-truth)

**Date:** 2026-06-30 (re-verified at advanced HEAD; supersedes the 2026-06-29 draft) · **Branch:** `tranche/BG` · **HEAD:** `b716b5be` · **Base:** `master` (126 commits ahead) · **pkg version:** `4.2.0` (cut target 5.0.0)
**Agent:** CURSOR-TRUTH research, PASS 1 (FIRST pass — baseline truth).
**Method:** reconcile `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` row-by-row against `git log master..tranche/BG`; verify every claimed SHA exists + on-BG + resolves to its wave; verify CODE landed (git grep); RUN the claimed-GREEN gates (non-vacuity) + the `ci`/`release` close gates; verify paint DELTAs + PNGs resolve on disk (the cardinal-lesson). siblings-intact exit 0 (start + end).

> **CHANGE since the 2026-06-29 draft:** HEAD advanced from `9dfe285c` → `b716b5be` (the D-1/D-2/D-3 live-fix commits + run-logs). The 3 close-battery reds the prior draft found were **RE-VERIFIED at the new HEAD and are STILL LIVE** — the live-fixes did NOT remediate them.

---

## 1. HEADLINE TRUTH

**The cursor's row-level claims are HONEST. Zero fabricated commits, zero DONE-without-code, zero spec-convergence mistaken for execution.** All 35 cited SHAs exist, sit on `tranche/BG`, and match their attributed wave. Every DONE wave's code is on disk; every per-wave gate I ran is GREEN (non-vacuously); every paint-PASS wave has its DELTA.md + dual-engine (chrome+safari) PNG set on disk. Working tree CLEAN; siblings intact.

**Authoritative status (parsed from the row table): 27 DONE · 2 PAINT-PENDING · 119 PENDING (= 148 rows).** (The SEED-CONTEXT "39 DONE" + the footer "DONE: 2" are both wrong — the former a raw-grep over-count, the latter a stale cron-revival boot-snapshot.)

**What is REALLY built = 5 bands, ~32 execution commits, foundation sound:** WS7 ground-freeze (6) · BH [C] (12) · WS1 shell/routing/field (7 + dual-engine painted) · WS3 partial (3.1/3.6 paint-pending + 3.7 done) · WS4 10.25 category-card-warm · the 3 live-fixes. The PENDING bulk (119 rows: WS2/5/6/8/9/10/11/12 + BH [WS12] restructure) is **genuinely UNBUILT** — confirmed every WS4/5/6/8/10/11/12 "spec CONVERGED" commit touches **0 non-docs files**.

**THE LOAD-BEARING DEFECT (re-verified at `b716b5be`): the integrated `ci`/`release` close-battery is NOT green at HEAD.** Three close gates are RED while every wave that caused them shows its OWN gate GREEN at the row level. This is exactly the user's "not confident the items were done properly" — and it is **recurring + compounding**: the post-`ff0933a3` fix-wave (`ea4682c0`) remediated 12 such reds, then WS3+WS4 re-opened 3 NEW ones, then 4 live-fix/run-log commits landed AFTER without re-checking the close.

---

## 2. THE THREE LIVE CLOSE-BATTERY REDS (re-verified live at `b716b5be`; UN-tracked by the cursor)

| Gate | tagset | Live finding (ran the gate) | Origin |
|------|--------|------------------------------|--------|
| `proof:no-god-module` | ci/release | `src/styles/glass/ladder.css` = **527 L** + `src/styles/dock/shell.css` = **510 L** (`wc -l` confirmed); neither grandfathered in the ratchet | WS3 3.6 `GLASS-BLUR-PEER` (`cd9ce46`) + 3.7 `GLASS-IDIOM-FACTOR` (`6ec81de`) grew them; no rebaseline owed-note |
| `proof:no-dead-token` | ci/release | `--glass-blur-dock` declared (glass.css:166, dark-arm.css:286) with **0 readers** (all `var(--glass-blur-dock` hits are the distinct `-radius` token; the composed token has none) | WS3 3.6 (`cd9ce46`): `dock/shell.css` re-pointed `--dock-surface-blur` off `--glass-blur-dock` → `--glass-blur-resting` (the unified 8px peer), orphaning the composed token |
| `proof:tag-parity` | ci/release | `proof:category-card-warm` registered `tags:["local"]` — a static src-scan gate missing `ci`, not in JUSTIFIED_LOCAL_ONLY | WS4 10.25 (`9e13965d`) registered its gate local-only |

`proof:ship-attestation` is ALSO exit 1 but **born-RED-by-design** (the intended tag-blocker; self-test 7/7, sole `[absent]` violation = the tag-blocker, flips at the Metal ship ceremony) — **NOT a defect; do not remediate.**

**Remediation is trivial + library-logic-free** (mirrors the fix-wave clusters): rebaseline/carve ladder.css+shell.css; allowlist-or-delete `--glass-blur-dock`; promote `proof:category-card-warm` to `ci`. **But nothing re-checks the close after each batch** — the row-level green hides the integrated red.

---

## 3. TRUTH-TABLE (per cursor row — claim vs reality)

### PHASE 0 — WS7 ground-freeze (0.1–0.6) — KEEP-VERIFIED (6/6)
All 6 SHAs resolve; gates GREEN at HEAD (`proof:disposition-live` ran live GREEN; bg-deferred-ledger/be-bf-ledger GREEN). `proof:ship-attestation` exit 1 = born-RED-by-design (certified). 0.1 PAINT-IS-THE-GATE paint FAIL = the by-design born-RED Metal anchor (18 PNGs on disk; DONE-override certified). **Reality matches claim.**

### PHASE 1 — BH concurrent-safe [C] (1.1–1.12) — KEEP-VERIFIED (12/12)
All 12 SHAs resolve; ran live GREEN: external-payload, peer-conformance, drag-morph, alias-codemod, subpath-classify, colocation. The `@glass` codemod (1.5) + snap-excise (1.4) were the root cause of 6 fix-wave re-points, now closed. **Reality matches claim.**

### PHASE 2 — WS1 shell/routing/field (2.1–2.7) — KEEP-VERIFIED (2.1–2.6); 2.7 AMEND
- 2.1–2.6: SHAs resolve; device-free gates GREEN at HEAD (route-confounder/route-single-root/no-paper-field/focal-complete/field-accent-reconcile/hero-fit ran live GREEN). **Paint artifacts RESOLVE ON DISK + are real dual-engine PNGs:** route-transition 71 · field-aurora 16 (chrome+safari+probe JSONs) · scroll-progress 30 (+ the one standalone `sp-webkit-live-results.json`) · hero-fit 34 + 6 DELTA.md. Cardinal-lesson floor MET.
- **2.2 FIELD-AURORA = the cautionary keep:** device-free gates passed WHILE live dark-mode paint was CATASTROPHICALLY broken (hero h1 2.14:1, muted 1.04:1 — a single light palette over the near-black dark page). Caught ONLY by the re-paint (`b3d65eec` → 13.87:1). **The live proof that device-free GREEN ≠ correct** — directly relevant to the un-painted WS3 rows.
- **2.7 VT-ROUTE-ENHANCE — AMEND status:** marked DONE but explicitly **"DEFERRED-NOT-BUILT … marked DONE to skip the build frontier."** Defer reasoning sound (the persistent-shell-`<Aurora>` VT-snapshot GOTCHA needs live paint); recording an un-built wave as DONE is a status-integrity smell. Should read DEFERRED, re-attempt at W-REFLECT3.

### PHASE 3 — WS3 glass standardization (3.1–3.11) — PARTIAL / HALF-BAKED (the pause frontier)
- **3.1 CARTOON-INK-GAMUT** (`3857b33b`, PAINT-PENDING) — `proof:no-gray` GREEN. Source landed: in-gamut warm-brown pin `oklch(from --foreground clamp(0.28,l,0.34) clamp(0.030,c,0.050) h)` (shadow.css:115). **Never paint-verified.**
- **3.6 GLASS-BLUR-PEER** (`cd9ce46` + `353eac5d`, PAINT-PENDING) — `proof:glass-cal` GREEN. Source landed: `--glass-blur-resting-radius: 8px`; default `<Button>` DEMOTED off glass-deep (verified — the `default:` key is `'glass-wash btn-glass glass-capsule glass-capsule-hover text-foreground'`, NO glass-deep; the `glass-deep` hit at index.ts:101 is the `primary-audacious` hero CTA which the spec KEEPS). **Never paint-verified. Introduced 2 of the 3 live close reds** (orphaned `--glass-blur-dock` + grew shell.css/ladder.css past 500).
- **3.7 GLASS-IDIOM-FACTOR** (`6ec81de`, DONE, H-class) — `proof:glass-idiom-factor` GREEN. DRY `--glass-plate-tinted` declared once (7 readers). Clean.
- **3.2–3.5, 3.8–3.11: PENDING — NOT BUILT** (0 execution commits; grep-clean, no orphan code — `proof-glass-foundation.mjs` is a pre-existing BE gate `0be4792a`, not a 3.5 artifact).
- **Verdict: half-baked.** 3.1/3.6 carry source + own-gate-green but are paint-pending-forever AND introduced 2 close reds. Keep the deliverables; AMEND the close reds; the paint is OWED and (per 2.2) cannot be assumed correct.

### PHASE 10 — WS4 row 10.25 CATEGORY-CARD-WARM (`9e13965d`) — KEEP-VERIFIED + AMEND
USER-REPORTED metallic-wash defect. `proof:category-card-warm` GREEN; 12 real PNGs (2880×1800) + DELTA.md on disk; dual-engine PASS recorded. Source + paint sound. **AMEND only:** gate registered `["local"]` → breaks `proof:tag-parity` (red #3). Promote to `ci`.

### PHASE LX — live-defect fixes D-1/D-2/D-3 (LX.1–LX.3) — KEEP-VERIFIED (3/3)
- **LX.1 D-1 constellation** (`07c6e6ec`): `DEFAULT_PARALLAX = 0` (constants.ts:146). `proof:constellation-field` ran live GREEN (41/41). The user's named must-fix ("ALL dots track cursor") — fixed at root.
- **LX.2 D-2 paper-grain** (`e40e5095`): DEMO-LOCAL only (demo/stories + gate; presets-in-consumers respected). `proof:demo-radial-calm` ran live GREEN.
- **LX.3 D-3 dock collapse-dir** (`8947288a`): `--dock-live` blend reads directional `--dock-expand-t` (layers.css:86-96). `proof:dock-engine` ran live GREEN.
- Note: the LX rows correctly record "RECORDED-NOT-FIXED" residuals (D-2 StoryHero wash-card gray-cream; D-3 first-collapse 15px end-snap) — honest scoping.

### PHASES 4–9, 11–19 — the BULK (119 rows) — PENDING, UNBUILT
0 execution commits. The WS8/10/11/12 git entries are all docs-only `spec CONVERGED` records. Genuinely not started. Spec-soundness is the design-lens passes' call, not this lens. Highest-blast-radius unbuilt: BH [WS12] subpaths-delete (18.1), /api-fold 203-rehome (18.2), B4f-claude-delete ABSOLUTE-LAST (19.2), WS12 480-capture verdict (17.6), WS8 C-SAFARI ★★★ Metal capture (13.x).

---

## 4. SPEC-CONVERGENCE vs EXECUTION (boundary is clean)
- **12 `spec CONVERGED` commits** = tranche-DEV (WS1→WS12 convergence + lock `071c2610` + plan `63f6aa2c`). ALL touch 0 non-docs files. NOT execution.
- **~32 execution-build commits**: WS1 (7) · WS7 (6) · WS3 (4) · WS4 (1) · BH B0/B1/B2/B4/B6 (13) · live-fix (3). The cursor + SEED-CONTEXT correctly do NOT count convergence as landed.

---

## 5. CLOBBER SURFACE
- The one VALIDATION-REPORT clobber (B2.0 codemod vs `demo:dist` infra, false-positive) is CLOSED (`proof:alias-codemod` exit 0).
- **No source-revert clobbers.** The 3 live reds are ADDITIVE collateral (token orphan + over-500 growth + mis-tag), not overwritten deliverables.
- **Forward-clobber WATCH (for the design-lens / PASS-2):** WS3 3.6 demoted the default surface off the deep-glass tier onto the 8px peer. WS8 (glass-deep apotheosis) is specced to read the deep refractive tier. Confirm 3.6's demotion + WS8's deep-tier assumptions are compatible before WS8 builds, or WS8 re-opens 3.6.

---

## 6. FOUNDATION HEALTH (at HEAD)
Working tree CLEAN · `proof:gate-script-parity` GREEN (bijection intact, observed across runs) · siblings-intact exit 0 (start + end). Core library is sound; the defects are gate/ledger/registry/CSS-budget re-points, never broken runtime logic.

---

## 7. TRIAGE ROLL-UP
- **keep-verified (27):** all Phase 0 (6) · all Phase 1 BH [C] (12) · WS1 2.1–2.6 (6) · WS3 3.7 · WS4 10.25 · LX.1/LX.2/LX.3.
- **half-baked (3):** 2.7 VT-ROUTE-ENHANCE (DONE-as-skip-marker) · 3.1 CARTOON-INK-GAMUT + 3.6 GLASS-BLUR-PEER (device-free GREEN, paint OWED, and 3.6 spawned 2 live close reds).
- **amend (cursor/registry hygiene — no library logic):** the 3 close reds (no-god-module rebaseline/carve · dead-token allowlist/delete · tag-parity promote) · 2.7 status DONE→DEFERRED · stale footer boot-count.
- **restart: NONE.** No landed wave's approach is unsound on the cursor-truth evidence.

---

## 8. RISKS AT THE 5.0.0 CUT (cursor-truth lens)
1. **The integrated close-battery is RED at HEAD (3 gates) and unwatched per-batch.** The recurring/compounding "own-gate-green, sibling-close-red" class is the structural reason the user lost confidence. The cut runs `--run full` siblings-absent — these 3 WILL block the tag until remediated. (proof:ship-attestation's born-RED is separate + intended.)
2. **2 PAINT-PENDING WS3 waves (3.1/3.6) are device-free-GREEN but visually unverified** — and 2.2 FIELD-AURORA is the live proof that device-free GREEN can mask a catastrophic paint defect. Their dual-engine paint is OWED before the cut.
3. **119-row PENDING bulk is the real 5.0.0 surface** — entirely unbuilt; the build order (WS3 spine → WS8/WS12) is intact in the cursor but unexecuted.
4. **proof:ship-attestation = hard tag-blocker** — the 5.0.0 tag CANNOT fire until a real Metal `release.sh --run ship` writes the attestation. The C-SAFARI ★★★ Metal capture (EXEC M9) is the named biggest execution risk and the attestation depends on it.
5. **WebKit measurement is less machine-auditable than Chrome** across the landed paint waves (only scroll-progress has a standalone WebKit-probe JSON; others fold WebKit numbers into DELTA prose). A stricter cut may want per-wave standalone WebKit probes.
6. **Cursor footer drift** could mislead a human revival (engine reads rows, so low risk) — amend to the live 27/2/119.
