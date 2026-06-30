# PASS-1 RESEARCH — CODE-vs-SPEC FIDELITY (broad triage)

**Agent lens:** code-vs-spec fidelity + keep/amend/restart triage of the PENDING bulk.
**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `b716b5be` (126 ahead of master).
**Build version:** `4.2.0` (cut bumps → 5.0.0). **Siblings-intact:** exit 0 (before + after). FENCE held.
**Method:** read each landed wave's spec in `bg-build-map.md`, diff the real `src/`/`demo/` against it, RUN
the wave's own gate AND the close-battery gates, verify paint artifacts resolve on disk. typecheck 0,
`npm run build` exit 0.

> NOTE: this supersedes the earlier same-named draft at HEAD `9dfe285c` (pre-live-fix). That draft correctly
> found 2 WS3 close blockers; I re-verified both are STILL LIVE at `b716b5be` and add a THIRD it missed.

---

## 0. BOTTOM LINE

The landed bands are, source-wise, **sound and faithful to spec** — every landed wave I checked does what the
build map says, its device-free gate is GREEN AND non-vacuous (self-test bites have teeth), and the [P] paint
floor (PNGs resolve + DELTA on disk) is met. The FIELD-AURORA catastrophic dark-AA defect (2.14:1) was caught
at paint and re-fixed (13.87:1) — the paint-is-the-gate process works. The 3 live-interaction defects
(D-1/D-2/D-3) are real, root-caused, and fixed (verified in source).

**HEADLINE DEFECT CLASS (recurring, currently UN-REMEDIATED): "a wave greens its OWN gate but leaves a SHARED
close-battery gate RED."** The VALIDATION-REPORT (`ff0933a3`) caught this for the [C]/WS1 band and SYNTH
(`ea4682c0`) remediated it — but the WS3 PAINT-PENDING waves landed AFTER that sweep, so it never saw them. At
HEAD the siblings-absent `--run ci`/`--run full` close battery is RED on **THREE fresh defects** that block the
5.0.0 tag:

1. **`proof:no-god-module` RED** (`["local","ci"]`, not sibling) — `src/styles/glass/ladder.css` is **527**
   (grown past the 500 bound by 3.7 GLASS-IDIOM-FACTOR `6ec81de`) and `src/styles/dock/shell.css` is **510**
   (grown by 3.6 GLASS-BLUR-PEER `cd9ce46`). NEITHER is ratchet-baselined (not in the 16 grandfathered files).
2. **`proof:no-dead-token` RED** (`["ci"]`) — `--glass-blur-dock` (the COMPOSITE token) is now dead: 3.6
   GLASS-BLUR-PEER re-pointed the dock's last consumer (`shell.css --dock-surface-blur`) onto
   `--glass-blur-resting`, orphaning the `--glass-blur-dock` declaration in `glass.css:166` + `dark-arm.css:286`
   (only `bridges.css:334` still reads the `-radius` PRIMITIVE, not the composite). Neither deleted nor
   allowlisted.
3. **`proof:tag-parity` RED** (`["local","ci"]`, not sibling) — `proof:category-card-warm` (the 10.25
   user-reported wave, `9e13965d`) registered `tags: ["local"]` only. tag-parity requires every load-bearing
   static src-scan gate to carry `"ci"` or be in `JUSTIFIED_LOCAL_ONLY`; this carries neither — the exact "RED
   on master / green in CI" class it forbids. (The prior draft MISSED this one.)

These three are REAL regressions, NOT born-RED-by-design. All are trivial to fix (rebaseline 2 ratchet rows;
delete/allowlist 1 token; promote 1 gate's tags), but until fixed the close battery cannot pass — and the BB
lesson (project memory `glassui_400_published`) is that the close must run the full union or these surface only
at tag-push.

**Separately RED but NOT a close blocker:** `proof:consumers:static` (`sibling: true`) reds because the
`words/frontend` sibling imports `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger` from the root barrel — but
`ui/Tabs` LEFT the public surface at BA.W-TABS (pre-BG, longstanding). The close runs siblings-ABSENT
(BB.W-CLOSE-BATTERY), so this skips. It IS a real consumer drift the 5.0.0 by-name asks (task #63) must
address (the `words` repo breaks on bump unless it re-points Tabs to a subpath). FENCE: glass-ui never edits it.

Everything else: GREEN or correctly born-RED (0.1 ba-gestalt + 0.3 ship-attestation are the intended
tag/paint blockers — their RED is the deliverable).

---

## 1. LANDED-BAND VERDICTS

### WS7 ground-freeze (0.1–0.6) — KEEP-VERIFIED
- 0.1 PAINT-IS-THE-GATE / 0.2 GESTALT-ROSTER / 0.3 SHIP-DISCIPLINE / 0.4 DEFERRED-LEDGER / 0.5 BE-BF-LEDGER /
  0.6 DISPOSITION-RESTAMP: gates GREEN (or correctly born-RED-by-design for 0.1 + 0.3), 18 born-RED Metal PNGs
  on disk. 0.1's DONE is a legitimate orchestrator override (the paint FAIL is the born-RED anchor).
- NUANCE: 0.3 ship-attestation (exit 1) is the INTENTIONAL tag-blocker — flips GREEN only at the
  `release.sh --run ship` Metal ceremony. Track as known-red, not a regression (easy to misread in a dry-run).

### BH [C] band (1.1–1.12) — KEEP-VERIFIED
- All 12 gates GREEN at HEAD: git-hygiene, external-payload (+ dist-mirror discharged), peer-conformance
  (value `^1.x` single-leg), subpath-classify, colocation, design-docs-files, consumer-evidence-live,
  core-prompts, alias-codemod (719 `@glass` rewrites survive), drag-morph (snap→kf 5.1.0 native), deferred-ledger,
  disposition-live. No clobber. The validation-report Cluster A/B realDefects for this band were SYNTH-remediated.

### WS1 (2.1–2.7) — KEEP-VERIFIED (non-authoring re-capture caveat)
- **2.1 ROUTE-TRANSITION** (KEEP): bare keyed `<component :is :key="route.path" class="route-enter">`;
  4 confounders DELETED; `.scroll-build` retired (remaining refs are RETIRED-notes); `gl-route-enter` present.
  The surviving `startViewTransition` (AppShell.vue:134) is the dock-morph-stage VT (spec KEEP — it is WS2
  4.10's future-cut surface, NOT a route confounder). route-confounder + route-single-root PASS. 20 PNGs.
- **2.2 FIELD-AURORA** (KEEP): `shellAuroraConfigDark` wired via `useGlobalDark().isDark`; the CATASTROPHIC
  dark-AA defect (2.14:1) decisively closed → 13.87 dark / 13.37 light (DELTA PASS). `data-glass-field-canvas`
  exposed (the WS8 precondition). 16 PNGs. RESIDUAL (recorded, non-blocking): light-chrome eyebrow 4.15:1
  Chrome (Safari 4.80) — polish note.
- **2.3 SCROLL-PROGRESS-RAIL** (KEEP): `scaleX(0)` hoisted unconditional; invalid `scroll(var(...))` fragments
  scanned-absent; ba-animate re-pointed GREEN. 30 PNGs.
- **2.4 FIELD-ACCENT-RECONCILE** (KEEP, H): warm-field.ts → adapter, single-source, hue-parity ε0.5°,
  luminance rewire. Gate GREEN.
- **2.5 PAPER-GRAIN-OPTIN** (KEEP): universal grain plane removed, tokens intact, gate GREEN, 16 PNGs.
- **2.6 HERO-FIT** (KEEP): chassis title path single-source (`displayTitle "glass-ui"`/"Real scenes"`),
  `:hero-title="false"` fork retired, gate proof:hero-fit PASS, 32 PNGs (4 widths × 2 modes × 2 engines).
- **2.7 VT-ROUTE-ENHANCE** (KEEP-DEFERRED): explicitly DONE-deferred (optional, no functional gain,
  route-freeze-risky without paint). Reasonable. Re-attemptable at W-REFLECT3.

### WS3-partial (3.1/3.6/3.7) — KEEP-VERIFIED in source; the THREE close-battery reds above attach HERE
- **3.1 CARTOON-INK-GAMUT** (PAINT-PENDING): `--cartoon-ink = oklch(from var(--foreground) clamp(0.28,l,0.34)
  clamp(0.030,c,0.050) h)` — warm-brown, hue ∈[45,85], maroon killed, DRY-collapsed. `proof:no-gray` GREEN with
  the new witness. Paint π (box-shadow getImageData) owed — this is the SHARED gestalt floor under EVERY WS4
  verdict (order-coupling: WS4 must not self-certify until 3.1 paints).
- **3.6 GLASS-BLUR-PEER** (PAINT-PENDING, HALF-BAKED-BY-DESIGN): the radius token-collapse is COMPLETE +
  correct (default Button off `glass-deep`, `--glass-blur-btn` aliases `--glass-blur-resting`/8px, dock reads it,
  `proof:glass-cal` 8px peer-lock GREEN). BUT the gate EXPLICITLY excludes saturate ("only the radius leg is
  peer-locked — the saturate-revert is a later WS1-gated leg"). The spec'd "iridescence→neutral-frosted" paint
  is deferred to WS3 Phase-3 (3.9). No DELTA. Honest staging, NOT proxy-greening — but the visual close is
  genuinely owed, AND this wave is the source of close-blockers #1 (shell.css 510) + #2 (`--glass-blur-dock`).
- **3.7 GLASS-IDIOM-FACTOR** (DONE, H): `--glass-plate-tinted` declared ONCE (ladder.css:67), read at 5 sites.
  DRY. Gate GREEN. But this wave grew `ladder.css` 489→527 → close-blocker #1's ladder leg (no ratchet rebaseline).

### Live-fixes (LX.1–3) — KEEP-VERIFIED
- **LX.1 D-1 CONSTELLATION-PARALLAX-OFF** (KEEP): `DEFAULT_PARALLAX = 0`; `parallaxNodePos` early-returns
  unshifted node when `parallax<=0` (constellationField.ts:366); `Constellation.vue` reads the constant. Whole-
  lattice cursor-tracking structurally killed. PNGs on disk. ⚠ DOC NIT: the DELTA cites
  `proof:constellation-field 41/41` but no such gate exists (real gates `proof:viz-constellation`/`-gen`/
  `-tokens`/`-substrate-single`, all PASS) — prose mislabel, not a behaviour defect.
- **LX.2 D-2 PAPER-GRAIN-WARM-SUBSTRATE** (KEEP): demo-local only (`demo/stories/*` +
  `proof-demo-radial-calm.mjs`; `src/styles/paper.css` byte-UNTOUCHED — library grain fence held). Gates PASS.
  DELTA records the out-of-scope StoryHero wash-card residual honestly.
- **LX.3 D-3 DOCK-COLLAPSE-DIR** (KEEP): `--dock-live` size blend reads directional `--dock-expand-t`
  (layers.css:72-86) not raw `--dock-morph-t`; E4 gate tightened to red-on-revert; proof:dock-engine PASS.
  Residuals (15px first-collapse end-snap; WS2 4.x unbuilt) recorded correctly.

---

## 2. PENDING BULK — KEEP/AMEND TRIAGE

The PENDING spec is broadly SOUND; no restart-class findings. The named cross-WS gaps are satisfied:
- WS1→WS8: `[data-glass-field-canvas]` marker exposed (AppShell.vue:328) + auto-discovered
  (useGlassBackdropLuminance.ts:230) — WS8 BACKDROP-SAMPLE keystone precondition IN PLACE.
- WS3 Phase-2/3 chromatic (3.2–3.5, 3.8–3.11): the WS1-field gate they waited on is landed → buildable now.
  3.3 GLASS-CLIP + 3.4 SAFARI-BLUR carry the ★ Safari Job-B sign-off (the convergence CEILING).
- WS2 dock (4.1–4.11): state matches spec-PENDING (5 `new SpringProgress` sites; no `useDockSpring.ts`;
  `#shell-dock-morph-goo` present for 4.10 to delete). 4.1 produces `useDockSpring` → gates WS6, correctly ordered.
- WS5/WS6/WS4/WS7-bands/WS8/WS9/WS10/WS11/WS12 + BH [WS12] + CUT: KEEP — critical-path chain internally
  consistent; the landed WS1/WS3 frontier unblocks the next stages cleanly. (Not per-wave source-audited —
  PASS-1 broad-triage scope.)

---

## 3. RISKS AT THE 5.0.0 CUT

1. **THREE un-remediated WS3-partial-landing close blockers (no-god-module ×2 files, no-dead-token,
   tag-parity).** All trivial, all currently RED siblings-absent. Must clear before any `--run full`. The
   recurring "green-own-gate / red-shared-gate" class — the WS3 waves landed after the SYNTH sweep.
2. **DONE [P] paint claims are self-authored.** FINAL §8 requires a NON-AUTHORING fresh dual-engine capture.
   The on-disk PNGs were produced by the build/paint workflow. A non-authoring re-verify of the DONE [P] set
   (2.1/2.2/2.3/2.5/2.6/10.25 + LX.1-3) is owed at W-REFLECT3 / the 480-capture capstone.
3. **3.1 CARTOON-INK paint is the hostage of EVERY WS4 ba-gestalt verdict** and is PAINT-PENDING. WS4 must not
   self-certify gestalt verdicts until 3.1's box-shadow paint lands.
4. **C-SAFARI ★★★ chronic (WS8 / WS3 Job-B) unbuilt + unverified** — the single likeliest item to miss
   (per FINAL). The C18 `?capture=` harness is validated end-to-end (de-risks it), but Job-B Safari-26
   `backdrop-filter`/`contain` sign-off + the BACKDROP-SAMPLE FBO are the deepest paint deps, still PENDING.
5. **`words` sibling Tabs root-barrel drift** — `proof:consumers:static` red locally; not a close blocker
   (sibling-absent close skips), but the `words` repo WILL break on the 5.0.0 bump unless its by-name ask
   re-points Tabs imports to a subpath. Folds into task #63.

## CONFIDENCE
HIGH on landed-wave verdicts (read source + ran gates + confirmed artifacts). HIGH on the three close blockers
(reproduced each red; confirmed tag-set + close-battery membership + attribution). MEDIUM on the PENDING-bulk
keep verdicts (broad-triage depth). The non-authoring re-capture is the one verification PASS-1 cannot itself
perform.
