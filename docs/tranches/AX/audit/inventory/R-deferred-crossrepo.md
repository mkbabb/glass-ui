# AX Inventory — R-deferred-crossrepo: the deferred cross-repo + slides asks (fold-in list)

**Lane.** Sweep the cross-repo + slides DEFERRED items and adjudicate, for each, whether it FOLDS
INTO this glass-ui (AX) tranche or ROUTES to a consumer/publisher tranche. The corpus: the AV routed
asks (`coordination/from-speedtest-AV-routed-asks.md`), the keyframes consume-edge note
(`coordination/from-keyframes-W8-specular-consume-edge.md`), the slides Tranche K + the slides
deferred items, the publisher supplier-edges W34/W35/W41, the speedtest R-CONSUME tail, and the
existing `coordination/CONSTELLATION.md` (the narrow W17-band-E artefact). Read-only;
tranche-development only.

**Inventory bases (verified live, 2026-06-08).**
- glass-ui: `at-dock-convergence` HEAD (past the dispatch `c72d2ac`); published registry line **3.8.0**.
- slides: `deck/feedback-coder @ 1461683` (J-scaffold, 2 commits ahead of `main`/`d79091e`; K lives
  ONLY on the branch `tranche/til-briefing-K`).
- keyframes.js: `~3.5.1` glass-ui pin (optionalDep), published **4.1.0**.
- value.js: published **0.11.1**, tranche M (planning-only).

**Headline.** The cross-repo/slides deferred set is in MUCH better shape than the AX charter
(authored at `eaba94f`/3.6.0) assumed — **several W41 + W35 + slides debts have ALREADY CLOSED at the
sibling source** since the charter was written. The genuine glass-ui-OWNED residue is small and
in-repo. The bulk of the deferred work is (a) glass-ui-side coordination-doc authorship that has NOT
been written yet (the W28/W34/W35/W41 born-RED ledgers do not exist), and (b) two real library API
gaps the AV routed asks surface (`.ready` exposure + `demandPark`). The dominant risk is the
**provenance keystone**: every consumer re-pin and every slides deploy is gated on glass-ui closing AX
(W33) and merging `at-dock-convergence → master`, since 3.8.0 was published from a branch tip.

---

## §1 — The fold-in adjudication (the lane's central deliverable)

Each deferred item is tagged **FOLD-IN** (lands as glass-ui `src/`/`package.json`/`scripts` or
coordination-doc work in THIS tranche) or **ROUTE** (a consumer/publisher session owns the impl, AX
only RECORDS the leg + close-gate). The publish-currency hinge (§4 note 12) gates the ROUTE legs.

### A — AV routed asks (`from-speedtest-AV-routed-asks.md`)

| Ask | Status at HEAD | Disposition |
|---|---|---|
| **`.ready` swallow** — `useViewTransition` returns `{finished, transitioned}`, NO `.ready` | **REAL GAP, OPEN.** Verified: `src/composables/motion/useViewTransition.ts:127` returns ONLY `{finished, transitioned}`; the native `vt.ready` is INTERNALLY caught at `:126` (`vt.ready?.catch(()=>{})`) and NEVER surfaced. The P0 W19-consumer gate. | **FOLD-IN (glass-ui src).** A library API gap — add `ready` to the returned `ViewTransitionHandle`. Small motion-surface edit. The note routes it to "a motion-surface micro-wave or W34 leg"; the cleaner home is a glass-ui src wave (W37 motion-substrate adjacency, or a named micro-fold), NOT a consumer leg — the consumer cannot fix a library return shape. |
| **`demandPark` on `useRAFLoop`** | **UNSHIPPED.** `useRAFLoop.ts:97` exports `useRAFLoop` with no `demandPark` seam. | **FOLD-IN-IF-≥2-CONSUMER, else ROUTE-as-WATCH.** A substrate add gated by the overfitting bar. speedtest is consumer #1; needs a named consumer #2 (the blob `useWebGLCanvas` quiescence is the candidate — W16). If ≥2, fold into the motion/raf substrate; if only speedtest, record as a ≥2-consumer WATCH in the W34 ledger, do not ship speculative substrate. |
| **`CompletionSeal` family** | **UNSHIPPED** (`grep CompletionSeal src/` = 0). | **ROUTE-as-WATCH / blob-band fold.** A W15/W16 consumer need. No second consumer at HEAD → ≥2-consumer WATCH in the W34 ledger; if the blob band surfaces a second need, fold to the blob/seal substrate. Do not mint on one consumer. |
| **3 a11y asks** — Toaster/ToastClose accessible name · reka FocusScope `aria-hidden-focus` sentinel · `ResponsiveTabs` aria-label | reka sentinel is upstream; the other two are glass-ui-owned a11y. `ResponsiveTabs` is now subsumed by `<SegmentedTabs :responsive>` (W53). | **FOLD-IN (W39 + W21).** Per the note: Toaster/ToastClose name + the tabs aria-label fold into W39 (lighthouse a11y route matrix) and W21 (primitive recategorize / the SegmentedTabs aria contract). The reka sentinel is an upstream-tracked WATCH. Un-exclude speedtest's `a11y-axe.spec.ts` carve-outs once fixed (consumer-side, W34-recorded). |
| **R-CONSUME tail** (3.6.0→3.8.0 bump + AT/AV stopgap revert + `--ease-apple-spring` re-point) | publish-gated; UNBLOCKED-but-UNDONE | **ROUTE (speedtest session, W28-named / W34-recorded).** The bump rides the AX publish hinge (W41). The `--ease-apple-spring` consumer census is W05's sweep; the bump is W34-recorded. |

**Closed/satisfied by 3.8.0 (do NOT re-open):** ASK-GU-GOLD (the `gold-audacious` variant +
`btn-audacious-gold` utility ship + the W52 CLAUDE.md canon close), the AX.W22 font-register watch
(Fraunces excised; Plus Jakarta + Fira Code only), ASK-GU-CARDRADIUS, ASK-GU-TOOLTIPFONT. These are
recorded-closed in the AV note; the AX FINAL must credit them as closed, not re-execute.

### B — keyframes consume-edge (`from-keyframes-W8-specular-consume-edge.md`)

| Item | Status | Disposition |
|---|---|---|
| **kf is NOT blocked** (the revised note supersedes the first "kf holds 3.4.0 + born-RED handoff" draft) | kf pins `~3.5.1` (verified live), fully green, dock-spring `proof:dock-morph-settled` GREEN (+4.5% ≤ +6%) | **CORRECT THE W35 BASELINE (FOLD-IN to the W35 ledger).** The W35 wave doc measures `+16.3%` against a stale `^3.4.0`; the live pin is `~3.5.1` with the retune published. The dock-spring leg is a clean `3.5.1→AX` BUMP, NOT a re-fix. The W35 born-RED witness-3 must be re-grounded to `~3.5.1`. |
| **Card-specular consume-edge** — the inert `.glass-specular-track` class is glass-ui-owned residue; the visible bloom is already dead at 3.5.1; the `specular="off"` default ships at HEAD UNPUBLISHED | two-sided: (1) glass-ui publishes the opt-in default (root-owned), (2) kf bumps + rides it (zero kf CSS) | **COSMETIC, ROUTE (kf W34 leg, publish-hinge-gated).** "No AX action requested beyond the publish you already plan." Record as a publish-currency leg in the W34 receiver; do NOT treat as a blocker or a code re-fix (the default is at HEAD). The W09 softened default satisfies the kf H.W2/H.W4 specular legs FOR FREE post-bump. |

### C — speedtest/muster native-first receive (W28/W29) + R-CONSUME

| Item | Status | Disposition |
|---|---|---|
| **W28 native-first receive** (metric-cell/stack/instrument-chassis repatriate to speedtest + muster) | **NOT-STARTED.** `W28-…json` does not exist; the coordination doc has no band-K section; ≥16 subpath imports survive in both siblings; both sibling trees were dirty (speedtest `stash@{0}`) at charter time. | **ROUTE (sibling-executed) + FOLD-IN the annexes (glass-ui authors W28's coordination band-K + gate-0 + the receive annexes).** glass-ui writes NO sibling source. The R0 native-first half is the literal precondition for W29's glass-ui prune. |
| **W29 glass-ui repatriation-prune** (strike the 3 families + metric-pill/instrument-rail orphans + twin-line-divider) | **NOT-STARTED** (gated behind W28's `proof:repatriate-local` GREEN on BOTH siblings) | **FOLD-IN (glass-ui src strike), gated on W28.** This is a real glass-ui export-surface edit + MIGRATION.md honesty. The metric-pill + instrument-rail orphan-prunes are PARALLEL (no muster-block). |
| **R-CONSUME AT/AU tail** (VT re-founding + H10 stopgap-revert + dark-default pin) | UNBLOCKED-but-UNDONE | **ROUTE (speedtest, W34-recorded), publish-hinge-gated.** W28-named, W34-routed; NOT W28's metric-receive scope. |

### D — keyframes prune-migration DAG (W35)

| Item | Status | Disposition |
|---|---|---|
| **EditorShell off HeaderRibbon + EasingCurveCanvas off GlassPanel** | **RED witnesses STILL HOLD.** Live: kf `EditorShell.vue:100` imports `/header-ribbon`; `EasingCurveCanvas.vue:107` imports `/glass-panel`. glass-ui-side: **header-ribbon + glass-panel STILL present** (`src/components/custom/{header-ribbon,glass-panel}` exist + subpath-exported + in package.json) — the W19/W20 prune has NOT run. | **ROUTE (kf-executed migration) + FOLD-IN (W19/W20 glass-ui prune + W35 annexes).** Hard-sequenced DAG: glass-ui authors the migration annexes + W19/W20 land the in-repo prune → kf migrates + greens its born-RED `proof:off-{headerribbon,glasspanel}` → glass-ui PUBLISHES the prune → kf bumps + consumes. The migrate gates GREEN is the publish precondition (no-dangle). |
| **dock-spring consume leg** | kf already `~3.5.1`-green (see §B) | **ROUTE (kf bump), re-grounded to 3.5.1→AX.** A bump-and-verify, not a re-fix. |

### E — publisher supplier-edge (W41)

| W41 item | Charter assumption | Live truth (verified) | Disposition |
|---|---|---|---|
| **1. `build:watch` dts arm** | UNMET (JS-only) | HOLDS — `"build:watch": "vite build --watch"` (line 533), no `emit-types --watch`. The contract-v2 dts-freshness keystone + value.js C-DTS root cause. | **FOLD-IN (glass-ui — the real W41 keystone).** Author `scripts/build-watch.mjs` (combined JS + `emit-types --watch`) + `proof:build-watch-dts`. value.js's own M.W1 owns the value-side arm (ROUTE). |
| **2. devDep↔peer parity** | floor lags range | HOLDS — devDeps `keyframes ^2.2.0` / `value ^0.10.0` (lines 706-707); peers admit `^4.0.0` / `^0.11.0` (675-676). Builds against the narrow floor. | **FOLD-IN (glass-ui).** Ship `proof:peer-devdep-parity`; bump value devDep `^0.10.0→^0.11.0` (representative point — value 0.11.1 published, `/color` leaf stable); keyframes devDep bump to `^4` is now UNGATED (the file-link breaker is gone, see item 3a) — re-ratify the bump path. |
| **3a. keyframes-4 `file:`-link republish** | breaks `npm ci` | **CLOSED at publisher.** kf declares glass-ui as `~3.5.1` optionalDep (registry range, NOT `file:`); 0 `file:../glass-ui`; `files:["dist"]`. | **DROP the handoff (already done).** Remove it from the W41 scope; keep the E2 reasoning as the gate's encoded invariant. |
| **3b. E2 value-0.11 cap knot** | non-resolvable | **CLOSED at publisher.** kf-4.1.0 deps value `^0.11.1` — the cap is GONE. | **DROP the handoff.** Record as resolved-at-publisher. |
| **4. keyframes export-stability check** | a range bump drops a downstream API | symptom MOOT (`getTimingFunction` restored in kf 4.x); the FORWARD-protection gate still un-authored. | **FOLD-IN (glass-ui) — the FORWARD gate only.** Author `proof:keyframes-export-stability` (flags a future range bump dropping a downstream-relied API). The symptom is moot; the protection mechanism is still owed. |
| **`proof:peer-conformance` orphan** | untagged | CONFIRMED 0 gates.mjs hits; the script PINS stale `4.0.0` + carries now-false "non-resolvable" prose. | **FOLD-IN (glass-ui).** Re-pin to `4.1.0` (fix the stale 4.0.0 + the false dual-instance prose), REGISTER ci/release (W27a tag model). |

### F — slides (W30/W31/W32 + the K branch + J cross-repo hinge)

| Item | Status | Disposition |
|---|---|---|
| **AX W30** (land H tree + constellation Canvas2D leak + e2e specs) | **MOSTLY DONE by slides H/I.** H-tree landed, e2e executed. BUT 1 `light-dark(` residual survives in `constellation.ts` (verified). | **RE-GROUND (FOLD-IN to AX charter doc) + ROUTE the residual.** Re-point W30 at post-I HEAD; the genuine residue is the `light-dark(` residual + the constellation deletion onto `/constellation` (slides-executed). |
| **AX W31** (Slide04 what-if + $5M clip + access-modal restyle + mobile reflow) | **STALE — already shipped** (H.W9 + H.W6 + H.W3). | **RE-GROUND / CREDIT-CLOSED.** The AX FINAL must NOT claim these; they are slides-owned + closed. |
| **AX W32** (delete local `reveal.ts`/`useCountup.ts` → glass-ui `vReveal`/`useCountup`; LabeledField error; deploy verify) | **PARTIAL.** Verified: both local files SURVIVE at slides HEAD; glass-ui `vReveal` + `useCountup` ARE exported (`src/composables/motion/`). Deploy verified (prod 200). | **ROUTE (slides-executed) — the genuine remaining consumer adoption.** The library half exists; the swap is slides-side, publish/pin-gated. |
| **Tranche K** (til-briefing 5/6/7 single-close redesign — user-FLAGGED) | **ORPHANED.** Lives ONLY on branch `tranche/til-briefing-K` off a STALE Tranche-F base (`6a79d38`, pre-G.W5 11→7 restructure); DOCS-ONLY (zero slide source). slides is on `deck/feedback-coder`. | **ROUTE (slides K2 re-seed) — the highest-value slides deliverable.** Must re-seed onto the deployed 7-slide `main`, then execute. Pin-INDEPENDENT (editorial/compositional), can run before the glass-ui AX close. AX RECORDS the route + the stale-base hazard; slides executes. |
| **Tranche J Fourier intensity (J.W1/W2 ↔ AX W43)** | the deployed Fourier hero is a 0.24-whisper; the user-ratified target is hero≈0.55 / final≈0.45. The glass-ui-side intensity bundle is AX **W43**. | **FOLD-IN (glass-ui W43) + ROUTE (slides J.W2 consume).** CROSS-REPO sequenced: W43 ships the per-variant intensity bundle + `intensity` prop (DELETE `OUTLINE_PEAK_ALPHA`, no alias) → publish main-sourced → slides re-pins + consumes + proves the floor gate. |
| **AW.W17 / constellation ≥2-consumer swap DECISION** | unblocked (3.8.0 ships `/constellation`); til-briefing still deck-local | **ROUTE (slides J.W9 execute-or-close decision).** No third carry. The W30 deletion onto `/constellation` resolves the `light-dark(` residual at source. |
| **glass-ui → main provenance reconcile** | slides pins `^3.7.0`→3.8.0 published from a branch tip, violating its standing "main-sourced publish only" rule | **FOLD-IN (glass-ui W33 close + `at-dock-convergence→master` merge) — the KEYSTONE.** Every slides re-pin + the J/K deploy gates on this. |

---

## §2 — DONE / PARTIAL / NOT-STARTED / AT-RISK

**DONE (closed at the sibling source since the charter — do NOT re-execute):**
- keyframes-4 `file:`-link npm-ci breaker → optionalDep registry range (W41 3a).
- E2 value-0.11 cap → kf 4.1.0 deps value `^0.11.1` (W41 3b).
- `getTimingFunction` export restored in kf 4.x (W41 4 symptom moot).
- keyframes pin advanced `^3.4.0 → ~3.5.1`; the dock-spring retune is published (W35 dock-spring leg is a bump, not a re-fix); kf is fully green, NOT blocked at its close.
- value.js `development` export key deleted (contract-v2 clean).
- Both publishers + glass-ui publish GREEN via CI on `v*` tag with OIDC provenance (the MEMORY "keyframes publish-local" claim is STALE for both).
- ASK-GU-GOLD / font-register watch / card-radius / tooltip-font (AV routed asks) — satisfied by 3.8.0.
- slides A-I tranches closed; both decks live (200); W31's Slide04/$5M/access-gate/mobile work shipped by slides H/I.

**PARTIAL:**
- **W41** — `proof:peer-conformance` exists but untagged + STALE-pinned (4.0.0 vs the live 4.1.0); 3 of 4 supplier-edge items closed-at-publisher → W41 RE-SCOPES to the glass-ui-internal residue.
- **slides W30** — the `light-dark(` residual survives (1 match in `constellation.ts`).
- **slides W32** — motion-adoption genuinely NOT-STARTED (local `reveal.ts`/`useCountup.ts` survive; the glass-ui targets exist but are unconsumed); deploy-verify done.
- **constellation/deck-progress consume** — subpaths ship; slides still deck-local/gated.

**NOT-STARTED (the glass-ui-OWNED residue this tranche must drive):**
- The W28/W29/W34/W35/W41 born-RED ledgers — NONE exist (`docs/tranches/AX/audit/W2[89]*.json`, `W3[45]*.json`, `W41*.json` absent); the `coordination/CONSTELLATION.md` band-K/§16/band-N sections are UNWRITTEN (the file at HEAD is the narrow W17-band-E artefact only).
- W41 `build:watch` dts arm + `proof:build-watch-dts` + `proof:peer-devdep-parity` + the forward export-stability gate (all absent).
- The `.ready` exposure on `useViewTransition` (real library API gap).
- The W19/W20 prune (header-ribbon + glass-panel still in the tree).
- slides Tranche J (11 waves, ratified 2026-06-08, zero impl) + Tranche K (orphaned on a stale base).

**AT-RISK / the dominant risk:**
- **Provenance keystone.** 3.8.0 was published from `at-dock-convergence` (a branch tip), violating the constellation's "main-sourced publish only" rule. Until glass-ui closes AX (W33) and merges `at-dock-convergence → master`, every consumer re-pin (kf bump, value M.W7, slides re-pin) and the slides J/K deploy re-violates the rule. This is the single hard predecessor of the entire cross-repo close.
- **W35 DAG sequencing.** The W19/W20 glass-ui prune is incomplete; the kf migration cannot complete until glass-ui finalizes the excision. Real, hard-sequenced, multi-publish.

---

## §3 — GAPS / plan divergences

1. **The W41 charter is STALE on 3 of 4 supplier-edge items** (3a/3b closed-at-publisher; 4's symptom moot). W41's real residue: the dts-watch arm, the parity gate, the `proof:peer-conformance` re-pin+register, and the FORWARD export-stability gate. RE-SCOPE, drop the closed handoffs.
2. **The W35 dock-spring baseline is stale** (`^3.4.0` +16.3% vs the live `~3.5.1` +4.5%-green). W34/W35 must re-ground to `~3.5.1`; the leg is a clean `3.5.1→AX` bump.
3. **The `coordination/CONSTELLATION.md` at HEAD is the W17-band-E artefact, NOT the §16 receiver.** It opens "AX.W17 → AX.W30/W31"; the W28 band-K + W34 §16-receiver + W35 band-N + W41 band-N supplier-edge sections are all UNWRITTEN. The two inbound notes (`from-speedtest-AV-routed-asks.md`, `from-keyframes-W8-specular-consume-edge.md`) must FOLD INTO the W34 receiver, not stay loose.
4. **The slides AX L-band is a snapshot-mismatch** — it reads as if slides H/I never happened. The AX FINAL must not claim W31 (already shipped slides-side) as an AX deliverable; only W30's residual + W32's motion-adoption are genuinely live.
5. **The value.js W34 leg has a HOME the charter under-credits** — value.js tranche M (M.W1/M.W3/M.W5/M.W7) is the leg executor for every value.js adoption (useLayerTransition fork → `/dock` re-export, blob fork → `/goo-blob`, watercolor fork, deriveAurora wire). W34 records the leg as if unrouted; in fact it gates on the AX cut + the value peer bump.
6. **Tranche K is invisible to anyone reading `docs/tranches/`** (branch-only, stale base) — a silent-deferral / lost-work risk the user flagged. Surface it explicitly so it folds into the convergence ledger.
7. **`.ready` mis-routed in the AV note** — the note suggests "a motion micro-wave OR W34's consumer leg." A consumer leg cannot fix a library return shape; it MUST fold-in as a glass-ui src edit.

---

## §4 — The gestalt PATH FORWARD (planning, not code)

The cross-repo/slides residue is RE-SCOPE + COORDINATE + a small glass-ui src core, NOT heavy re-fix.

1. **Author the four CONSTELLATION.md sections + the born-RED ledgers (FOLD-IN, glass-ui doc).** W28
   opens band-K + gate-0 (the `R-clean → R0 → W-prune → R1` DAG + sibling-baseline capture); W34
   appends the §16 receiver (per-consumer idiom census + the two inbound notes folded + the
   publish-currency hinge + the carry-tag tables); W35 appends band-N keyframes-migration (re-grounded
   to `~3.5.1`); W41 appends band-N supplier-edge (the value devDep bump + the dropped-handoff record).
   These are read-only-analysis + authored-coordination — no `src/`.

2. **RE-SCOPE W41 to the glass-ui-internal residue (FOLD-IN, glass-ui src).** (a) `build:watch`
   co-runs `emit-types --watch` (the contract-v2 dts keystone, value.js C-DTS root cause); (b)
   `proof:build-watch-dts` + `proof:peer-devdep-parity`, bump value devDep `^0.10.0→^0.11.0`; (c)
   re-pin `proof:peer-conformance` to 4.1.0 + register ci/release; (d) the forward
   `proof:keyframes-export-stability` gate. DROP the keyframes-4 republish + E2 handoffs (closed).
   value.js's own M.W1 owns its value-side dts arm — record as the sibling executor.

3. **Close the two real library API gaps (FOLD-IN, glass-ui src).** Add `ready` to the
   `useViewTransition` return shape (P0 consumer gate). Adjudicate `demandPark`/`CompletionSeal`
   against the overfitting bar — ship only with ≥2 named consumers (blob `useWebGLCanvas` quiescence
   is the candidate #2), else record as ≥2-consumer WATCHes. Fold the 2 glass-ui-owned a11y asks into
   W39/W21.

4. **Drive the W35 prune-migration DAG in order (FOLD-IN W19/W20 + ROUTE the kf migration).** glass-ui
   authors the migration annexes + lands the W19/W20 in-repo prune → kf migrates EditorShell→local
   chrome bar + EasingCurveCanvas→`<Card surface="glass">`/`.glass-material` + greens the born-RED
   gates → glass-ui PUBLISHES the prune → kf bumps + consumes. The migrate gates GREEN is the publish
   precondition. The dock-spring + specular legs are bump-and-ride (cosmetic, already-green-at-3.5.1).

5. **Sequence the slides hinges (ROUTE + the W43/W33 glass-ui half).** (a) glass-ui W43 ships the
   Fourier intensity bundle (DELETE `OUTLINE_PEAK_ALPHA`, clean break) → publish main-sourced → slides
   J.W2 consumes (hero≈0.55/final≈0.45) + proves the floor gate. (b) Re-seed Tranche K onto the
   deployed 7-slide `main` (branch `tranche/til-briefing-K2`), then execute K.W1→K.W4 — pin-INDEPENDENT,
   runnable before the glass-ui close. (c) Re-ground the AX L-band against post-I HEAD: credit the
   slides H/I closes, scope W30-W32 to the GENUINE remaining (the `light-dark(` residual + the
   `reveal.ts`/`useCountup.ts` swap + the LabeledField error pattern). (d) J.W9 decides the
   constellation swap in writing.

6. **The provenance keystone is the constellation invariant (FOLD-IN, glass-ui W33).** The AX close +
   `at-dock-convergence → master` merge + a provenance-clean re-tag is the SEQUENCED predecessor that
   unblocks every consumer re-pin and both slides J.W9 + K deploys. Treat it as the keystone, not a
   coda.

**Cardinal-lesson note.** The publisher edges re-discovered the AX cardinal lesson independently:
keyframes' tranche I is the constellation's THIRD "N green gates certified a broken product" finding,
binding the same gate-ORACLE precept W00 stands up. The W34/W35/W41 + slides closes must NOT
re-launder a green claim over a working tree — every consumer leg + the slides J Fourier hero (the
0.24-whisper that "ships as source that renders to near-nothing") closes ONLY on a LIVE consume
against the PUBLISHED AX cut with a MEASURED floor, never a headless cross-repo grep.
