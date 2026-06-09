# H-chronic-defer — adversarial hardening: chronic deferral across ALL tranches (glass-ui AY + slides L)

**Verdict: CHRONIC-MISS** (the chronic-defer DISEASE is real, the carry-closure gate is BUILT but
under-covered, and the AY ledger itself is a fresh chronic-defer hazard — it carries STALE statuses
that AX already partially closed, risking both re-landed work AND residue hiding behind a too-broad
"deferred" label).

## TL;DR for the orchestrator

1. **The carry-closure gate EXISTS and is genuinely load-bearing** — `proof:disposition-live`
   (`scripts/proof-disposition-live.mjs`, wired in `gates.mjs:734` + `ci.yml:224`) parses the
   DISPOSITION-REGISTER.json, re-evaluates each BOOK/ARCHIVED row's `min-consumers` trigger against
   present siblings, self-tests with a synthetic always-MET row, and FAILS the close if a booked
   trigger is now MET. This is the correct institutional fix for the founding chronic (the
   native-drawer trigger MET-at-AT-and-rode-BOOK'd-five-tranches story its own docstring names).
   **It runs green today (3 items, 0 violations).**

2. **BUT the register covers only 3 of ~25+ booked items.** The AT W0-L4 ledger
   (`docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md`) enumerated ~22 BOOK rows + 5 USER-DOMAIN
   + several KILLs. The register
   (`docs/tranches/AX/audit/DISPOSITION-REGISTER.json`) contains exactly THREE: `native-drawer-as-asChild`,
   `panel-host-primitive`, `interruptible-reorder`. The other ~22 BOOK items (Button `icon-sm`,
   `DockSelectTrigger clampLabel`, Tooltip `mono`, Select `size`, `--spring-crisp`, MetricBadge icon,
   inline-edit primitive, LabeledSlider readout, the 6 CSS-lever books G5/G6/interpolate-size/
   relative-color/text-box-trim/calc-size, the platform-gated pilots dialog-native/GlassNativeSelect/
   `interestfor`, useRAFLoop demandPark, the styles critical/deferred split, LabeledField for/id, the
   "3 a11y asks" bundle) live ONLY in prose ledgers no machine reads — **exactly the "deferral wearing
   a gate's clothing" the gate's own docstring warns against** (`proof-disposition-live.mjs:1-9`). The
   gate cannot re-evaluate a trigger it has never been handed.

3. **AX PROGRESS:282 made a written promise the register never fulfilled.** "Items 16/17/18 land as
   `proof:disposition-live` BOOK rows" — G-4 directional View-Transition helper, G-5 DrawerContent
   spring, G-6 cartoon×quiet preset. **None of the three is in the register**
   (`grep -iE "view-transition|drawer.*spring|cartoon.*quiet" DISPOSITION-REGISTER.json` = 0). The
   close promise to encode them as machine-checked book rows was never executed. They are now
   prose-only deferrals — the canonical chronic-defer relapse, INSIDE the very wave (W62) that built
   the gate to prevent it.

4. **The AY AUDIT-LEDGER is itself a chronic-defer hazard — it is STALE relative to AX HEAD.** The
   ledger (`AUDIT-LEDGER.md`) was authored when the 32-agent audit hit the session limit and was never
   re-synced to AX's W51/W59 landings. Three rows are FACTUALLY WRONG at HEAD:
   - **Row 4 (touch-target/type-scale) "DEFERRED — only dock; no library-wide system"** — WRONG.
     `--ui-scale` + `--control-h-*`/`--control-text`/`--ui-glyph` + the WCAG `--control-floor` clamp +
     `proof:ui-scale` ALL shipped at AX.W51 (`tokens.css:1172,1184-1205`); Button/Toggle/Tabs/etc.
     consume it (corroborated by the sibling `H-touch-scale.md` lane: "W-SCALE1/2 as written would
     RE-LAND work already done"). The genuine residue is narrow (form-atom touch floors + a
     desktop-fluid type ladder), but the ledger's too-broad "DEFERRED" hides that.
   - **Row 9 (slider zoo → glass-scrubber+spectrum) "DEFERRED — no consolidation"** — WRONG. The zoo
     IS collapsed to `standard`+`spectrum` (`slider/index.ts:42-45,53`) with `proof:slider-two-only`.
     The user's literal ask names "glass-scrubber" (a renamed export) + the "fully rounded iOS knob
     continuous with track" geometry — the `standard` variant is the integrated cylinder, so the
     geometry landed but the NAME did not. The residue is naming + consumer migration, not
     consolidation. The blanket "DEFERRED" misroutes the wave.
   - **Item 25 (access-key modal) "DEFERRED — not done"** — WRONG. `DeckGate.vue` is already
     glass-ui-styled and `DialogContent showClose?` shipped (`dialog/DialogContent.vue:62`). The
     residue is the slides-local close-button HACK (`deck.css:705 .deck-gate > button:has(> .sr-only)
     { display: none }`) that should consume `:show-close="false"` instead — a consumer-adoption miss,
     not an unbuilt feature.

   **The hazard:** a stale "DEFERRED" is a self-perpetuating chronic. It tells the next planner the
   work is undone → the planner re-scopes a wave to BUILD what exists → the wave either re-lands
   (waste) or, worse, the planner trusts the label and the genuine narrow residue NEVER gets a precise
   gate. This is how a chronic survives across tranche boundaries: not because the work is hard, but
   because the LEDGER drifts from HEAD and nobody re-grounds it.

5. **Slides has NO carry-closure gate at all.** glass-ui has `proof:disposition-live`; slides has
   nothing equivalent (`grep disposition-live|chronic slides/scripts slides/package.json` = 0). The
   slides BOOK backlog lives as a prose "Open and deferred (keep-book)" section in
   `slides/docs/tranches/I/FINAL.md:57-69` with no machine re-evaluation. The deepest slides chronic
   — the constellation-consume (item #1/#28) — is recorded there as "the Slide01-onto-Constellation
   swap stays GATED on a glass-ui publish" (`I/FINAL.md:65-67`), a cross-repo gate that has slipped
   I→K→L precisely because no machine re-checks it.

---

## §1 — The chronic inventory (carried ≥2 tranches, NEVER closed)

| chronic | tranche-depth | why it slips | MUST land in |
|---|---|---|---|
| **A. The BOOK backlog is gate-invisible** (~22 AT-named book rows not in the register) | AT→AX→AY (3+; individual rows AN→AS depth 5) | The register was seeded with only the 3 highest-salience rows at W62. The other ~22 stayed prose. `proof:disposition-live` is structurally incapable of catching a relapse on a row it never holds. | **AY.W62-successor / a NEW AY close wave that ONBOARDS the full AT-ledger BOOK backlog into the register** (one JSON row per booked item, each with its `min-consumers` trigger). The gate's coverage must equal the deferral set, not a sample. |
| **B. G-4/G-5/G-6 never entered the register** (AX PROGRESS:282 promise unfulfilled) | AX→AY (the promise itself is the relapse) | The W62 close authored the gate but skipped writing the three rows it promised. Prose-only deferral. | **AY close wave** — add `directional-view-transition`, `drawer-content-spring`, `cartoon-quiet-preset` rows with their triggers, OR formally retire each with rationale. NOT "deferred to a future tranche." |
| **C. Dock animation lockstep + dock-with-slider** (#5/#10) | keyframes.js → AX dock band → AY (3+) | The shell-first/items-lag desync recurs because each tranche tuned the morph but never diagnosed the lag from first principles; the slider integration breaks under the keepDockOpen contract. The AUDIT-LEDGER itself names this the signature chronic. | **AY.W-DOCK1 (diagnose) → W-DOCK2 (lockstep) → W-DOCK3 (slider + page-element progress bar)** — already planned; the carry-closure obligation is a `proof:dock-animation-live` lockstep capture, NOT a headless attestation. |
| **D. Aurora/Blob "stunning" artistic-fidelity bar** (#6/#7) | AS→AT→AU→AW→AX→AY (core unblocked, bar never met) | Each tranche unblocked the CORE (OKLCh, WGSL, lit-droplet) but "stunning gradient-art / van-Gogh brush" is a SUBJECTIVE bar no headless gate can assert; the close kept declaring core-done as bar-done (the headless-green-over-broken disease, GOLDEN §headline). | **AY.W-AUR* / W-BLOB*** — already planned with the 32-agent research-first loop. The carry-closure obligation: the hard gate MUST be a live π capture against a stated "stunning" reference, not `proof:aurora-painterly-statistics` alone. |
| **E. Touch-target/type-scale RESIDUE** (#4) | the SYSTEM shipped (AX.W51); the RESIDUE chronic | Mislabeled. The ledger says "no system" (false); the real chronic is the form-atom floors (Switch 24px, Checkbox/Radio 16px) + the desktop-fluid type ladder that genuinely never landed. The too-broad label is the slip mechanism. | **AY.W-SCALE1/2 RE-SCOPED** (per sibling `H-touch-scale.md`): close the residue, not re-build the system. Gate: a real axe target-size harness (none exists in `tests-visual/`), not a grep. |
| **F. Storybook route-prune SPECIFICS** (#11) | AX.W18 (IA restructured) → AY (named cull unfinished) | The IA was restructured but the named-route cull (header-ribbon/glyph-face/disco-glyph/native-top-layer/use-token-color/icon-button-token-ladder) was deferred per-route. Each tranche says "IA done" and the specific routes survive. | **AY.W-SB1** — already planned; gate `proof:no-orphan-demo-route` must enumerate the named routes, not a generic orphan-scan. |
| **G. Constellation-as-consumed-glass-ui** (#1/#2/#3/#28) | slides H→I→K→L; glass-ui AW.W17→AX→AY (the cross-repo gate) | The swap is gated on a glass-ui publish that keeps not happening (`slides/I/FINAL.md:65-67`). The bespoke `slides/src/decks/til-briefing/constellation.ts` survives because the lib component isn't published-and-adopted. Plus warp-to-cursor (#2) is UNADDRESSED in BOTH copies. | **AY.W-CON1/2/3** (perfect+warp+export) → **L.W-ADOPT** (delete bespoke, consume `/constellation`). The carry-closure gate `proof:no-bespoke-constellation` is **NOT BUILT** (`grep` = 0) — it is a named hard gate with no script. |
| **H. Slides mobile polish** (#24) | F→H→AX→L (4) | Landed at F.W2-4 (`d3218c4`), re-opened at H, re-listed at L.W-MOB. The signature: a content-fix lands, the next mobile-capture surfaces a fresh occlusion, and the blanket "mobile polish" label re-absorbs it. No per-defect mobile capture gate persists across tranches. | **L.W-MOB** — already planned; gate must be a PER-SLIDE portrait capture set (7 slides) + axe, not a single "mobile pass" attestation. |
| **I. feedback-coder honesty + J-docs strand** (#29) | I (deployed) → L (J branch-only, STRANDED) | The J tranche docs are branch-only on `deck/feedback-coder` and ABSENT on the L branch (verified `ls docs/tranches/J` = absent). The honesty pass (1,845/0.72/one-human's-level) keeps slipping because it depends on an audience-lock decision never made. | **L.W6 (honesty) + L.W7 (un-strand J)** — already planned. The carry-closure obligation: J docs reachable on main OR formally folded into I's record, with a deletion/merge proof. |

## §2 — The carry-closure gate: built, but with a coverage HOLE

**What's right.** `proof:disposition-live` is a genuine institutional fix, not theater:
- It re-evaluates each booked trigger against the LIVE constellation (`proof-disposition-live.mjs:60-83`).
- It self-tests with a synthetic always-MET row and REDs if its own detector fails to flag it
  (`:123-132`) — the bite is proven every run.
- It is in the CI aggregate (`gates.mjs:734`, `ci.yml:224-225`).
- It correctly SKIPs on a sibling-free runner (`:100-119`) — registry-default honest.

**The hole (the load-bearing finding).** The gate's power is bounded by the register's completeness,
and the register is a 3-row SAMPLE of a ~25-row deferral set. A gate that can only catch relapses on
3 of 25 booked items is NOT "zero chronic-defer carry" (GOLDEN G-3) — it is zero-carry on 12% of the
booked surface. The AT ledger is the authoritative deferral inventory; the register must be its
machine mirror. Today it is not. **G-3 ("every deferral closed or falsifiably-triggered") is GREEN by
gate but FALSE by coverage.**

**The second-order hole.** Nothing audits register COMPLETENESS — no gate asserts "every BOOK row in
the latest deferred-ledger has a corresponding register entry." So the register can silently shrink
(or fail to grow) and the gate stays green. This is the meta-chronic: the closure mechanism itself has
no closure check.

## §3 — Why the AY ledger drift is the most dangerous chronic-defer vector

The founding disease (GOLDEN §headline) is "deferral-CLOSURE by PROXY — a gate satisfiable by a
stand-in." The AY AUDIT-LEDGER's stale statuses are a NEW species of the same disease: **deferral by
STALE-LABEL.** A row marked "DEFERRED" that is actually 80%-shipped does three harms:
1. It tells the planner to build what exists → re-land or waste (the H-touch-scale lane caught exactly
   this: "W-SCALE1/2 as written would RE-LAND work already done").
2. It hides the genuine narrow residue behind a too-broad bucket → the residue gets a too-broad gate
   (grep) instead of a precise one (axe harness) → it slips AGAIN.
3. It corrupts the chronic-count itself — 5 of the AUDIT-LEDGER's "Chronically-deferred" entries are
   mislabeled-stale, so the planner cannot trust the chronic inventory it is supposed to close.

**The fix is a HARD re-ground step before the AY waves execute:** every AY/L ledger row must be
re-verified against HEAD source (file:line), the way the AT W0-L4 ledger did
(`docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md` — the gold-standard HEAD-verification
table). The AUDIT-LEDGER explicitly says "Re-run the parallel auditors post-2:30pm-ET reset to deepen
the per-component SOTA gap rows" — that re-run NEVER happened; the ledger shipped as the
session-limit draft. **AY.W0 must re-ground the ledger or every downstream wave inherits the drift.**

## §4 — Chronic-misses (deferred/missed across ≥2 passes/tranches)

- **The ~22 AT BOOK rows never onboarded into the machine register** (AT→AX→AY) — the gate exists; the
  data does not.
- **G-4/G-5/G-6 promised-but-not-encoded** (AX W62 PROGRESS:282 → AY) — the close promise relapsed
  inside the wave that built the anti-relapse gate.
- **`proof:no-bespoke-constellation` named but unbuilt** (AY.W-CON3 hard gate has no script) — a
  carry-closure gate that is itself deferred.
- **Slides has no carry-closure gate** (all tranches) — the constellation-consume + J-docs chronics
  ride prose keep-book with no re-evaluation.
- **The AUDIT-LEDGER never re-grounded after the session-limit draft** (AY) — 3+ stale rows; the
  re-run was named and skipped.

## §5 — Convergence criteria (what "perfected" means for this lane)

The chronic-defer surface is closed ONLY when:
1. **Register = deferral-set.** Every BOOK/ARCHIVED item in the AT W0-L4 ledger (and any new AY/L
   defer) has a row in DISPOSITION-REGISTER.json with a `min-consumers` (or other machine-readable)
   trigger. The 3-row register grows to cover the full set; KILLs are removed with rationale.
2. **A completeness gate exists.** A NEW assertion (extend `proof:disposition-live` or a sibling)
   fails the close if the latest deferred-ledger names a BOOK row with no register entry — the
   closure mechanism's own closure check.
3. **G-4/G-5/G-6 are encoded or retired.** Either three register rows with triggers, or a formal
   retirement line each (named successor, not "future tranche").
4. **The AY/L ledger is HEAD-re-grounded.** Every "DEFERRED/CHRONIC" row re-verified at file:line;
   the stale-shipped rows (touch-scale, slider, access-modal) re-labeled PARTIAL with the precise
   residue named.
5. **Slides gets a carry-closure gate.** A slides-side disposition register + re-evaluation (the
   constellation-consume cross-repo gate `proof:no-bespoke-constellation` is its first row), so the
   slides BOOK backlog cannot ride prose-only.
6. **`proof:no-bespoke-constellation` is built** and red-witnessed (it RED today — the bespoke copy
   exists — and goes GREEN only when slides consumes the lib export).

## §6 — Wave-spec inputs (concrete material for a fully-authored AY close wave)

**Defect (file:line):**
- `docs/tranches/AX/audit/DISPOSITION-REGISTER.json:10-47` — 3 items where the AT ledger named ~25.
- `docs/tranches/AX/PROGRESS.md:282` — "Items 16/17/18 land as proof:disposition-live BOOK rows" —
  unfulfilled (G-4/G-5/G-6 absent from register).
- `docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md:103-151` — the authoritative ~25-row
  BOOK/USER-DOMAIN/KILL inventory the register must mirror.
- `docs/tranches/AY/audit/AUDIT-LEDGER.md:23,28,48` — stale rows (touch-scale "no system", slider "no
  consolidation", access-modal "not done") refuted at `tokens.css:1172`, `slider/index.ts:42`,
  `dialog/DialogContent.vue:62`.
- `slides/src/decks/til-briefing/constellation.ts` — bespoke copy survives; does NOT import glass-ui.
- `slides/docs/tranches/I/FINAL.md:65-67` — the constellation-consume cross-repo gate, prose-only.

**Objective:** make the carry-closure gate's coverage equal the deferral set; re-ground the AY/L
ledger to HEAD; encode the orphaned G-items; give slides a carry-closure gate.

**Files / edit-sites:**
- `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (or a new `docs/tranches/AY/.../DISPOSITION-REGISTER.json`)
  — add the ~22 missing BOOK rows + G-4/G-5/G-6, each with a `min-consumers` trigger and grep.
- `scripts/proof-disposition-live.mjs` — add a register-completeness clause (cross-check against a
  machine-parseable deferred-ledger, or assert a minimum row count tied to the ledger).
- `docs/tranches/AY/audit/AUDIT-LEDGER.md` — re-verify every row at HEAD file:line; re-label stale rows.
- `scripts/proof-no-bespoke-constellation.mjs` (NEW) — assert `slides/src/decks/**/constellation.ts`
  absent AND slides imports `@mkbabb/glass-ui/constellation`.
- `slides/scripts/` + `slides/package.json` — a slides-side disposition register + `proof:disposition-live`
  equivalent (the constellation-consume gate is its first row).

**HARD GATE (evidence-backed):**
- `proof:disposition-live` extended with a completeness clause: FAILS the close if the deferred-ledger
  names a BOOK row absent from the register. Artifact: gate output listing register-row-count =
  ledger-BOOK-count. (Today: 3 vs ~25 → RED until reconciled.)
- `proof:no-bespoke-constellation` born-RED (bespoke copy present) → GREEN (copy gone + lib import
  present), captured as a deletion + import proof.
- A re-grounded AUDIT-LEDGER where every DEFERRED/CHRONIC row carries a HEAD file:line verification
  (the AT W0-L4 table is the format), reviewed against the H-touch-scale / H-slider sibling-lane
  refutations.
- Slides `proof:disposition-live` green with ≥1 row (the constellation-consume cross-repo trigger),
  proving the slides BOOK backlog is machine-re-evaluated.

**Fold-into:** a NEW **AY.W-CARRY (carry-closure reconcile)** wave in Band E (the close), running
BEFORE W-CLOSE1 (so the FINAL's "zero chronic-defer carry" claim is gate-true, not prose-true) +
folds into **L.W7** for the slides-side gate. The register onboarding can run early (it is pure
documentation + gate-script work, no source risk) and unblocks an honest G-3 claim.
