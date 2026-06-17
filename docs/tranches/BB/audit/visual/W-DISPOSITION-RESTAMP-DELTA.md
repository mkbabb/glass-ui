# W-DISPOSITION-RESTAMP — DELTA

The disposition register's machine arm of BB's chronic-fold decision (BB §2). The standing "re-stamp un-MET, defer to the next tranche's Batch-0 re-stamp" carry is DISCHARGED: each of the 31 register rows is RE-EVALUATED against the BB wave that DECIDES it — a `pendingResolvedBy` BB-wave (BUILD/MEET/DECIDE), or a recorded `reStampedAt: "BB"` + `reStampNote` honest hold. No row deleted, no row force-resolved. The new decided-destination soundness clause forbids a phantom destination.

This is a GATE-INFRASTRUCTURE wave — ZERO pixels painted. The gate-green logs + the re-stamp table ARE the binding truth (no `proof:ba-gestalt` requirement; the gestalt bar binds visual waves).

## (a) Born-RED — the pre-wave state

The pre-wave `proof:disposition-live` ran GREEN (exit 0) — siblings present, every booked row un-MET — but the register carried ZERO rows with a BB field: every row was the BA-close un-MET re-stamp (`resolved: false`, no `pendingResolvedBy`/`reStampedAt`). The "RED" the wave inverts is the W1 acceptance shape — `items.filter(i => i.pendingResolvedBy || i.resolvedBy || i.reStampedAt === "BB").length === 0` at HEAD (zero rows decided-or-recorded). The new decided-destination clause did not exist (its self-test could not fire).

Pre-wave register census:

```
items: 31  selfTest: true  by: {"book":29,"archived":2}
rows carrying a BB field: 0
```

Pre-wave gate (exit 0):

```
proof:disposition-live — register-COMPLETENESS clause (AY.W-CARRY)
  ledger BOOK ids       : 31
  register book/arch/ret: 31
  uncovered (ledger→reg): 0
proof:disposition-live — phantom-owner clause (AY.W-TRIAGE)
  residual rows         : 15
  phantom owners        : 0
proof:disposition-live — the deferral-trigger re-evaluation gate (AX.W62)
  register items        : 31
  self-test (bite proof): OK — synthetic met-trigger row flagged
  live violations       : 0
```

## (b) GREEN-at-close — the new decided-destination clause

```
proof:disposition-live — register-COMPLETENESS clause (AY.W-CARRY)
  ledger BOOK ids       : 31
  register book/arch/ret: 31
  uncovered (ledger→reg): 0
proof:disposition-live — phantom-owner clause (AY.W-TRIAGE)
  residual rows         : 15
  phantom owners        : 0
proof:disposition-live — decided-destination soundness clause (BB.W-DISPOSITION-RESTAMP)
  rows with a decided dest: 3
  phantom destinations    : 0
  self-test (bite proof)  : OK — synthetic phantom destination flagged
proof:disposition-live — the deferral-trigger re-evaluation gate (AX.W62)
  register items        : 31
  self-test (bite proof): OK — synthetic met-trigger row flagged
  live violations       : 0

[proof:disposition-live] every booked deferral's trigger re-evaluates un-MET against the present constellation.
```

Gate artefact (`.cache/gates/AX-disposition-live.json`):

```json
{ "status": "pass", "itemCount": 31, "uncovered": [], "phantomCount": 0, "phantomDestinations": 0, "selfTestFlagged": true, "violations": [] }
```

Post-wave register census (every row decided-or-recorded; dispositions unchanged — no row deleted/force-resolved):

```
items: 31  selfTest: true  by: {"book":29,"archived":2}
rows carrying a BB field: 31
rows MISSING a BB field: []
pendingResolvedBy rows:
    native-drawer-as-asChild -> BB.W-NDA-DECIDE
    styles-critical-split    -> BB.W-CSS-CRITICAL
    css-relative-color       -> BB.W-DARK-INK-WARM
rows with reStampedAt:BB but empty/blank note: []
```

## (c) The 31-row re-stamp table

Each row → its BB disposition. THREE rows carry a decided BB destination (`pendingResolvedBy`); 28 STAY-booked/archived with a recorded `reStampedAt: "BB"` + `reStampNote` honest hold. NO row deleted, NO row force-resolved.

| # | id | disposition | BB re-stamp | one-line note |
|---|---|---|---|---|
| 1 | `native-drawer-as-asChild` | book | **pendingResolvedBy: BB.W-NDA-DECIDE** (DECIDE) | the FOUNDING 5-tranche chronic — W-NDA-DECIDE builds the polymorphic as/asChild host OR retires it; the WATCH trigger STAYS armed |
| 2 | `panel-host-primitive` | archived | STAY-archived + reStampNote | un-MET — only bbnf-buddy LeftToolsDock (1 < 2); dock + sheet cover the need |
| 3 | `interruptible-reorder` | archived | STAY-archived + reStampNote | un-MET — no consumer asks for the mid-gesture re-grab variant (0 < 2) |
| 4 | `deck-subpath` | book | STAY-booked + reStampNote (cross-linked) | un-MET — slides sole consumer (< 2); cross-linked to W-SLIDES-DRIVE (Batch 5), coordination only |
| 5 | `button-icon-sm` | book | STAY-booked + reStampNote | un-MET — 1 firm consumer (value.js) < 2 |
| 6 | `dock-select-clamp-label` | book | STAY-booked + reStampNote | un-MET — 1 consumer (value.js) < 2 |
| 7 | `tooltip-mono-variant` | book | STAY-booked + reStampNote | un-MET — 1 consumer (value.js) < 2 |
| 8 | `select-size` | book | STAY-booked + reStampNote | un-MET — 1 consumer (value.js) < 2; pairs with button-icon-sm on the control-size fold |
| 9 | `spring-crisp-token` | book | STAY-booked + reStampNote | un-MET — 0 witnessed consumers < 2; default NOT-SHIP |
| 10 | `metric-badge-icon` | book | STAY-booked + reStampNote | un-MET — 1 consumer (speedtest) < 2 |
| 11 | `completion-seal-family` | book | STAY-booked + reStampNote | un-MET — 0 consumers < 2; component stays demo-gated (J inv 10) |
| 12 | `labeled-field-for-id` | book | STAY-booked + reStampNote | un-MET — needs a concrete failing site from speedtest a11y adoption |
| 13 | `speedtest-a11y-bundle` | book | STAY-booked + reStampNote | un-MET — no enumerated marker on any present consumer |
| 14 | `raf-loop-demand-park` | book | STAY-booked + reStampNote | un-MET — 1 consumer (speedtest) < 2 |
| 15 | `styles-critical-split` | book | **pendingResolvedBy: BB.W-CSS-CRITICAL** (BUILD) | W-CSS-CRITICAL (Batch 3) lands the critical/deferred /styles split IN glass-ui; flips pending→resolved at the BB close |
| 16 | `cross-document-vt` | book | STAY-booked + reStampNote | un-MET — navigation:auto is consumer-owned, < 2 converge |
| 17 | `css-scope-state` | book | STAY-booked + reStampNote | un-MET — 0 @scope/:state sites; authoring-DRY-not-payload |
| 18 | `css-at-function` | book | STAY-booked + reStampNote | un-MET — Limited/Chromium-only, no earning site |
| 19 | `interestfor-previews` | book | STAY-booked + reStampNote | un-MET — Limited/experimental, < 2 converge |
| 20 | `css-text-box-trim` | book | STAY-booked + reStampNote | un-MET — 0 consumers |
| 21 | `css-interpolate-size` | book | STAY-booked + reStampNote | un-MET — 0fr↔1fr hack is the kept fallback, no witnessed consumer |
| 22 | `css-relative-color` | book | **pendingResolvedBy: BB.W-DARK-INK-WARM** (MEET) | W-DARK-INK-WARM (Batch 4) re-expresses the dark --surface-tint-* arm as a --foreground-derived oklch(from …) recipe; flips pending→resolved at the BB close |
| 23 | `glass-dialog-native-pilot` | book | STAY-booked + reStampNote | un-MET — no present consumer imports it; DISTINCT from #1's as/asChild extension |
| 24 | `glass-native-select-pilot` | book | STAY-booked + reStampNote | un-MET — Limited Baseline, muster declined → no ≥2 |
| 25 | `inline-edit-primitive` | book | STAY-booked + reStampNote | un-MET — 3 DIVERGENT consumers (no converged primitive); promote on convergence (J inv 10) |
| 26 | `labeled-slider-readout` | book | STAY-booked + reStampNote | un-MET — 2 divergent consumers |
| 27 | `directional-view-transition` | book | STAY-booked + reStampNote (cross-linked) | un-MET — no consumer sets --vt-direction (< 2); cross-linked to W-SLIDES-DRIVE, no JS driver built |
| 28 | `drawer-content-spring` | book | STAY-booked + reStampNote | un-MET — no consumer references --drawer-spring; W-DRAWER-ABROGATE de-forks vaul but does NOT own a retune token (distinct book) |
| 29 | `cartoon-quiet-preset` | book | STAY-booked + reStampNote | un-MET — no named cartoon-quiet preset on any surface |
| 30 | `speedtest-native-first-receive` | book | STAY-booked + reStampNote | un-MET — substrate SHIPPED, RECEIVE is speedtest's (consumer-side, inv-16) |
| 31 | `keyframes-prune-migration-dag` | book | STAY-booked + reStampNote (adjacency) | un-MET — no kf migration-DAG adopted; records W-ADOPT-RECONCILE adjacency (Batch 5), prune is keyframes.js-owned |

Summary: **3 decided destinations** (W-NDA-DECIDE / W-CSS-CRITICAL / W-DARK-INK-WARM) · **28 recorded honest holds** (2 archived + 26 book; incl. 3 cross-linked/adjacency: deck-subpath + directional-view-transition → W-SLIDES-DRIVE, keyframes-prune-migration-dag → W-ADOPT-RECONCILE). Dispositions unchanged (29 book / 2 archived) — no fold deleted or force-resolved a row, so the register-completeness clause stays GREEN (`uncovered: []`).

## (d) The decided-destination self-test — the born-RED witness

The new clause carries a synthetic phantom-destination self-test (`BB.W-DOES-NOT-EXIST`) the gate runs every invocation — it MUST detect the phantom as un-resolvable (acceptance-is-the-inverse). To prove the bite is load-bearing, a phantom `pendingResolvedBy: "BB.W-DOES-NOT-EXIST"` was injected onto a real register row:

```
proof:disposition-live — decided-destination soundness clause (BB.W-DISPOSITION-RESTAMP)
  rows with a decided dest: 3
  phantom destinations    : 1
  PHANTOM-DEST   native-drawer-as-asChild → pendingResolvedBy "BB.W-DOES-NOT-EXIST" names no wave-spec file in docs/tranches/<LETTER>/waves/

[proof:disposition-live] 1 decided destination(s) name a non-existent wave-spec — every pendingResolvedBy/resolvedBy must resolve to a real docs/tranches/<L>/waves/<id>.md (BB.W-DISPOSITION-RESTAMP).
```

- phantom-injected gate exit code: **1** (RED)
- register restored, gate exit code: **0** (GREEN)

The three REAL decided destinations all resolve to wave-spec files on disk (`docs/tranches/BB/waves/BB.W-NDA-DECIDE.md`, `BB.W-CSS-CRITICAL.md`, `BB.W-DARK-INK-WARM.md`). The clause resolves both filename forms (`<LETTER>.<id>.md` and the bare `<id>.md`) so the few BB waves named `W-<id>.md` (W-DRAWER-ABROGATE et al.) would also resolve.

## (e) The BA prose reconcile — before/after

### `docs/tranches/BA/PROGRESS.md:362-365` (the "HELD for greenlight" closing paragraph — NOT a wave-row, disjoint from W-LEDGER-REPAIR's status cells)

**Before:**
> The version is 4.0.0 (aaa1e973). HELD for the user greenlight: the v4.0.0 tag-push + the npm-provenance publish + the d6 fork-close + the slides redeploy (round-15 + the BA adopt together — the site is down).

**After (TRUTH edit — the publish happened):**
> The version is 4.0.0 (aaa1e973). LANDED (the three irreversible legs): the v4.0.0 tag-push + the npm-provenance publish (npm latest = 4.0.0) + the d6 fork-close are DONE — 4.0.0 is PUBLISHED. STILL HELD on the user's separate re-publication greenlight: the slides redeploy (… W-SLIDES-DRIVE / W-SLIDES-HANDOFF, BB Batch 5). … (Reconciled at BB.W-DISPOSITION-RESTAMP — the publish happened; the slides leg stays honestly held.)

The three irreversible legs are reconciled to DONE; only the slides redeploy stays honestly held (it rides the user's separate greenlight).

### `docs/tranches/BA/FINAL.md:211` (the §6 "~28 BOOK rows → next-tranche re-stamp" successor)

**Before:**
> Destination: the NEXT tranche's Batch-0 re-stamp (NOT folded — L inv-8; folding REDs the completeness check).

**After (DISCHARGED — this wave IS that re-stamp):**
> DISCHARGED at BB.W-DISPOSITION-RESTAMP (this IS the named next-tranche re-stamp): per the BB §2 chronic-fold decision each of the 31 rows is now DECIDED, not silently re-booked — THREE rows carry a decided BB destination (… W-NDA-DECIDE / W-CSS-CRITICAL / W-DARK-INK-WARM …), and the honest-hold long-tail STAYS BOOK'd with a recorded `reStampedAt: "BB"` + `reStampNote` (NOT folded — L inv-8; no row deleted, no row force-resolved …).

## Gate parity

`proof:disposition-live` was extended in-place (no new package.json `proof:*` key) — the gate registry stays sound. `proof:gate-script-parity` flags ONLY `proof-close-battery-parity.mjs` (W-CLOSE-BATTERY's new file, the orchestrator-owned registration), NOT `proof-disposition-live.mjs` — this wave's gate edit is parity-clean. JSON validity of the re-stamped register confirmed (`JSON.parse` → 31 items).
