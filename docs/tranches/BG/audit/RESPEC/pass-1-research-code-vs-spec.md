# PASS-1 RESEARCH — CODE-vs-SPEC FIDELITY (broad triage)

**Agent lens:** code-vs-spec fidelity + keep/amend/restart triage of the PENDING bulk.
**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · siblings-intact exit 0 (before).
**Method:** read each landed wave's spec in `bg-build-map.md`, diff the real `src/`/`demo/` against it,
RUN the wave's own gate AND the close-battery sibling gates, verify paint artifacts resolve on disk.
Tree clean (only the untracked `docs/tranches/BG/audit/RESPEC/` output dir).

---

## 0. BOTTOM LINE

The landed bands are, source-wise, **sound and faithful to spec** — 23 of the landed waves do what the
build map says. The cardinal-lesson paint floor (PNGs resolve + DELTA) is met for the WS1 [P] waves, and the
FIELD-AURORA catastrophic dark-AA defect was caught and re-paint-fixed (the process works).

**BUT the headline finding: the "wave greens its own gate, leaves sibling close-gates RED" defect class —
which the VALIDATION-REPORT (`ff0933a3`) identified for the [C]/WS1 band and the SYNTH fix-wave (`ea4682c0`)
remediated — RECURRED in WS3 and is currently UN-REMEDIATED.** The two WS3 PAINT-PENDING waves landed AFTER
the validation report, so its sweep never saw them. At HEAD the `--run full` close battery is RED on **two
fresh defects** that block the 5.0.0 tag:

- `proof:no-god-module` RED — `src/styles/glass/ladder.css` 489→**527** (grown by 3.7 GLASS-IDIOM-FACTOR
  `6ec81de`) and `src/styles/dock/shell.css` 498→**510** (grown by 3.6 GLASS-BLUR-PEER `cd9ce46`) both crossed
  the 500-line bound with NO ratchet baseline re-point.
- `proof:no-dead-token` RED — `--glass-blur-dock` (the composite) is now a dead token: 3.6 GLASS-BLUR-PEER
  re-pointed the dock's last consumer (`shell.css` `--dock-surface-blur`) onto `--glass-blur-resting`, orphaning
  the `--glass-blur-dock` declaration in `glass.css` + `dark-arm.css`. The wave neither deleted it nor
  allowlisted it.

These are real regressions, NOT born-RED-by-design. Everything else green or correctly born-RED.

---

## 1. LANDED-BAND VERDICTS

### WS7 ground-freeze (rows 0.1–0.6) — KEEP-VERIFIED

| row | wave | gate | verdict |
|----|------|------|---------|
| 0.1 | PAINT-IS-THE-GATE | `proof:ba-gestalt` | **proper** — born-RED Metal anchor; operative FAIL is by-design (10/10 surfaces FAIL until a paint wave + non-authoring re-capture). Real OKLab pixel-decoder. |
| 0.2 | GESTALT-ROSTER-RE-POINT | route-resolution arm | **proper** — surface-paths derived from route files; 10-surface roster on disk. |
| 0.3 | SHIP-DISCIPLINE | `proof:ship-attestation` | **proper** — exit 1 born-RED-by-design (the tag-blocker; flips at the Metal ship ceremony). Mac-only fail-closed; self-test 7/7. |
| 0.4 | DEFERRED-LEDGER | `proof:bg-deferred-ledger` | **proper NOW** — was CLOBBERED (corpus 136→135) by the snap-excise; SYNTH reconciled it. Confirmed: corpus **135** = ledger rows 135, all DECIDED. |
| 0.5 | BE-BF-LEDGER | `proof:be-bf-ledger` | **proper** — exit 0. |
| 0.6 | DISPOSITION-RESTAMP | `proof:disposition-live` | **proper** — 31 rows re-stamped BG; uncovered 0; `proof:bc-fold-ledger` stale-RED was widened/retired by SYNTH (green now). |

`ship-attestation` (exit 1) and `ba-gestalt` (exit 1) are **correctly** still RED — the intended tag/paint
blockers. Their RED is the deliverable, not a defect.

### BH concurrent-safe [C] band (rows 1.1–1.12) — KEEP-VERIFIED

All 12 gates GREEN at HEAD: `git-hygiene`, `external-payload`, `peer-conformance` (value `^1.0.0` single-leg),
`subpath-classify`, `colocation`, `design-docs-files`, `consumer-evidence-live`, `core-prompts`, `alias-codemod`
(the comment-false-positive clobber FIXED), `drag-morph` (snap → kf 5.1.0 native `DragOptions.snap`),
`bg-deferred-ledger`, `disposition-live`. The validation-report Cluster A/B realDefects for this band
(`liquid-tab`, `motion-one-clock`, `tunable-anim`, `storybook-complete`, `gen-ci-fresh`) are all GREEN now —
SYNTH (`ea4682c0`) landed the re-points. Source deliverables intact (719 `@glass` rewrites survive, etc.).

### WS1 shell/routing/field (rows 2.1–2.7) — KEEP-VERIFIED (with a deferred-verdict caveat)

Source matches spec, gates green, paint PNGs resolve + DELTAs present:

- **2.1 ROUTE-TRANSITION** — template is exactly the bare keyed atomic swap
  (`<component :is="Component" :key="route.path" class="route-enter">`, NO `<Transition>`/Suspense). The
  4 confounders (fade-slide Transition / bloom-find-child / categoryId no-op VT + dataset write / skeleton-no-match)
  are deleted (verified in `AppShell.vue` comments + code). `.route-enter` + `@keyframes gl-route-enter` present
  in `transitions.css`; `.scroll-build` retired across the cascade. The remaining `startViewTransition` is the
  functional dock-morph crossfade (spec says KEEP). `proof:route-confounder` + `proof:route-single-root` PASS.
- **2.2 FIELD-AURORA** — `.paper-field` retired (grain survives), ONE shell `<Aurora v-if="shellFieldActive">`,
  `focal.ts` minted. `proof:no-paper-field` + `proof:focal-complete` PASS. **A CATASTROPHIC dark-AA defect
  (hero 2.14:1 / muted 1.04:1) shipped device-free-green and was caught at paint, re-fixed via
  `shellAuroraConfigDark` (now 13.87:1 / 6.73:1).** This is the strongest evidence FOR the user's concern that
  device-free-green ≠ correct — and FOR the paint process catching it.
- **2.3 SCROLL-PROGRESS-RAIL** — `scaleX(0)` hoisted unconditional, invalid `scroll(var(...))` gone,
  `--scroll-progress-scroller` retired. `proof:ba-animate` 8/8.
- **2.4 FIELD-ACCENT-RECONCILE** — `warm-field.ts` collapsed to adapter; single-source exports; hue parity
  0.0000°. `proof:field-accent-reconcile` 4/4. (The validation-report Cluster D god-module from this wave —
  `useGlassBackdropLuminance.ts` 559 — was CARVED: now **534** under its 542 baseline.)
- **2.5 PAPER-GRAIN-OPTIN** — universal `<PaperBackdrop>` shell mount removed; grain tokens intact. PASS.
- **2.6 HERO-FIT** — confirmed NO `:hero-title="false"` fork in `intro.vue`/`hero.vue`; both route the chassis
  `#title-ornament` slot; `displayTitle` "glass-ui" / "Real scenes" in the manifest rows. `proof:hero-fit` PASS.
- **2.7 VT-ROUTE-ENHANCE** — DEFERRED-NOT-BUILT but marked **DONE** to skip the frontier. Defensible (optional
  polish, route-freeze risk without paint) but it is a status fudge: a not-built wave carries a DONE row.

**CAVEAT (not a per-wave defect, a systemic one):** every WS1 [P] "DONE" rests on a SELF-RECORDED per-wave
paint DELTA. The HOLISTIC `proof:ba-gestalt` operative verdict is **100% deferred** — all 10/10 roster surfaces
still hold open FAIL. The authorized flipper (W-REFLECT3) is NOT built. So these DONEs are provisional on the
per-wave captures, not the acceptance bar CLAUDE.md says "EVERY visual wave closes against."

### WS3 partial (rows 3.1 / 3.6 / 3.7) — HALF-BAKED (3.6) + collateral (3.7)

- **3.1 CARTOON-INK-GAMUT** — proper. `proof:no-gray` GREEN (warm-brown `--cartoon-ink`, hue∈[45,85]). PAINT-PENDING.
- **3.7 GLASS-IDIOM-FACTOR** — core proper: `--glass-plate-tinted` declared ONCE (`ladder.css:67`),
  `proof:glass-idiom-factor` GREEN. **Collateral:** the "DRY" wave GREW `ladder.css` 489→527 (>500) → no-god-module RED.
- **3.6 GLASS-BLUR-PEER** — **HALF-BAKED.** The CORE behaviour LANDED correctly: resting/quiet = 8px, dock
  `--dock-surface-blur` → `--glass-blur-resting` (8px), `.btn-glass` `--glass-blur-btn` alias→resting (8px),
  Button demoted off `glass-deep`; `proof:glass-cal` 8px peer-lock GREEN. **BUT** it left two un-swept tails:
  (a) `--glass-blur-dock` composite orphaned → `proof:no-dead-token` RED — the `shell.css` comment claims the
  tier identity "stays defined for the gate's B3 shape assert," but B3 reads `--glass-blur-dock-RADIUS` (alive),
  NOT the composite, so the kept composite has no justification; (b) `shell.css` grew 498→510 (>500) → no-god-module RED.

---

## 2. CLOBBER / OUT-OF-ORDER CHECK

No source-deliverable clobbers found at HEAD beyond the already-known ones. The validation-report's lone clobber
(`demo/vite.demo-dist.config.ts` comment false-positive on `proof:alias-codemod`) is FIXED (gate green). The
DEFERRED-LEDGER clobber (snap-excise dropping the kf-snap CONSUME marker) is FIXED (corpus 135). Hot files
(`gates.mjs`, `package.json`, `src/index.ts`, glass token cascade, CLAUDE.md) show no cross-wave overwrite of
intent. The WS3 growth of `ladder.css`/`shell.css` is additive-within-wave, not a clobber.

---

## 3. PENDING-BULK TRIAGE (keep/amend the unbuilt)

**The spec corpus is sound — no RESTART candidates spotted.** The build map waves I sampled (route-transition,
field-aurora, hero-fit, glass-blur-peer, category-card-warm, plus the WS3/WS8 phase notes) are detailed,
first-principles, and internally consistent. KEEP the specs. The build ORDER (WS3 spine → WS2/WS8/WS12) is
correct: WS8 glass-deep reads WS3's unified blur/tint register, WS2 is a peer consumer of the blur seam.

Two AMENDs the landed-band evidence forces:

1. **AMEND the per-wave close protocol — a MANDATORY sibling-gate sweep.** The "greens own gate, breaks sibling
   close-gate" class has now recurred THREE times (validation-report [C], validation-report WS1, and now WS3 at
   HEAD). The current process runs the wave's OWN gate, not the full ci battery. Every wave (especially the
   token/CSS waves: WS3 remaining, WS8, WS9, WS10, WS12) must run `proof:no-god-module` + `proof:no-dead-token` +
   the affected-gate set before flipping PAINT-PENDING. This is a process amendment, not a spec change.

2. **AMEND the WS3 progress accounting — it is SHALLOWER than "3 of 11 rows."** The 3 landed WS3 rows are the
   field-independent Phase-1 + token-collapse (the EASY part). The HARD, BLOCKING convergence-ceiling rows —
   3.3 GLASS-CLIP-DISCIPLINE and 3.4 SAFARI-BLUR-LITERAL (the Safari-26 Job-B sign-off, the spec's literal
   "convergence CEILING (BLOCKING)") — are entirely PENDING. WS3-as-spine is barely started; downstream WS8/WS12
   planning should treat the Safari ceiling as unbought.

---

## 4. RISKS AT THE 5.0.0 CUT

1. **`--run full` close battery is RED at HEAD** on 2 fresh WS3 defects (`no-god-module` ×2 files,
   `no-dead-token` ×1 token). The cut CANNOT go green until a fix wave: re-points the ratchet baseline (or carves
   `ladder.css`/`shell.css`) AND deletes-or-allowlists `--glass-blur-dock`. These are gate/ratchet/token
   re-points (cheap), but they are blockers.
2. **The holistic acceptance bar has NEVER passed.** `proof:ba-gestalt` = 10/10 surfaces FAIL; W-REFLECT3 (the
   sole authorized verdict-flipper) is unbuilt. Every [P] "DONE" is provisional on a self-recorded per-wave
   DELTA. If the eventual gestalt review fails any surface, those waves reopen — the "DONE" count is optimistic.
3. **C-SAFARI ceiling unbought.** The BLOCKING Safari Job-B sign-off (WS3 3.3/3.4) + the Metal ship-attestation
   ceremony are entirely PENDING. The pipeline-validation note claims the C-SAFARI blank-shell does NOT
   reproduce, but the per-wave Safari Job-B paint verdicts are owed.
4. **Self-recorded "non-authoring" paint claims** are asserted, not independently re-verified in PASS-1. The
   FIELD-AURORA near-miss (catastrophic dark-AA shipped device-free-green) is the standing proof that a
   gate-green wave can be visually broken; the paint claims should be spot-re-captured by a fresh agent before the cut.
5. **The no-god-module ratchet has silently re-populated to 16 grandfathered entries** despite CLAUDE.md
   BB.W-CARVE5 asserting `RATCHET_BASELINES == {}`. A discipline drift across BC→BG; the WS3 additions are the
   newest symptom. Worth a deliberate decision (drain again vs. accept the baselines) at the cut, not silent carry.

---

## 5. EVIDENCE INDEX (commands run, all read-only)

- `git log master..HEAD` (121 commits) · `scripts/verify-siblings-intact.mjs --quiet` exit 0.
- Gates GREEN: route-confounder, route-single-root, no-paper-field, focal-complete, field-accent-reconcile,
  hero-fit, no-gray, glass-cal, glass-idiom-factor, category-card-warm, be-bf-ledger, git-hygiene,
  external-payload, peer-conformance, subpath-classify, colocation, design-docs-files, consumer-evidence-live,
  core-prompts, bg-deferred-ledger (135), liquid-tab, motion-one-clock, tunable-anim, storybook-complete,
  storybook-meta, bc-fold-ledger, alias-codemod, drag-morph, disposition-live, glass-cohesion, dark-material,
  adaptive-glass, card-tier-alpha, on-glass-fg, glass-depth. typecheck exit 0.
- Gates RED **by design**: ship-attestation, ba-gestalt (tag/paint blockers).
- Gates RED **= real defects**: `proof:no-god-module` (ladder.css 527, shell.css 510), `proof:no-dead-token`
  (`--glass-blur-dock`).
- Paint PNGs resolve: route-transition-pipeline (71 PNG), BG.W-FIELD-AURORA-paint (16), hero-fit-pipeline (34),
  scroll-progress-pipeline (30); 7 BG.W-*-DELTA.md verdict files present; PNGs non-zero (536K–3.1M).
- Note: `proof:deep-glass` is NOT a registered script (false alarm); the real gate `proof:glass-depth` PASSES.
