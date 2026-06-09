# CHRONIC-defer-late — red-team sweep of late-tranche deferrals (AB → AW)

**Lane:** CHRONIC-defer-late (adversarial hardening pass)
**Method:** read-only walk of `docs/tranches/{AB,AB+1,AB+2,AM,AN,AO,AP,AQ,AR,AS,AT,AU,AV,AW}`
FINAL.md / RECAP.md + deferral registers + BOOK ledgers + AX inventory/converge digests; every
row cites a `file:line` or a named ledger row.
**Verdict:** DEFERRED-CHRONIC. Distinct from the C→V early lane (`CHRONIC-defer-early.md`): the late
tranches invented a *cleaner-looking* deferral vocabulary — **BOOK-with-named-trigger**,
**ARCHIVED-on-2-consumer-gate**, **NAMED-FORWARD (watched)**, **pending-handoff** — that each tranche's
FINAL holds up as "zero silent open / P-Inv-28 satisfied." It is the SAME re-labelling disease the early
lane diagnosed, now with better paperwork. The proof: the SAME items ride forward un-closed for 5+
consecutive tranches under these labels, and AX is re-litigating every one of them.

The headline late-lane chronics, each with slip-history:

---

## LATE-1 — the native-drawer / `GlassNativeDrawer` / `Drawer :native` ASK: AQ → AR → AS → AT → AU → AW → AX, NEVER landed, BOOK'd 6×

The single longest-lived LATE chronic, and the cleanest example of "BOOK-with-named-trigger" being a
permanent holding pen rather than a path to closure.

**Slip-history:**
- **AQ.W6** (`AQ/FINAL.md:35`, `:116`) — ships `GlassDialogNative` + `HoverPopover :native` **demo-gated**;
  the native-drawer is named as the next surface ("native drawer extend to more surfaces as consumers
  adopt", `AQ/AQ.md:128`). Demo-gated = met-the-bar-via-demo, the exact L-lane false-close shape.
- **AR** — `AR/AR.md:122` / `AR/PROGRESS.md:85`: "Demo-gated pilots … **NAMED-FORWARD** — graduate at
  Baseline Widely; watch." Carried, not closed.
- **AS.W0** — explicitly tasked to "**rule the native drawer (owe-or-refute** against muster+speedtest)"
  (`AS/AS.md:32`, `:119`). `AS/audit/W0-L4-deferred-ledger.md:26,28` marks the `:native` opt-in **CHRONIC /
  WATCH** at slip AQ→AR (2); `W0b-L4-deferred.md:56` re-counts AQ→AR→AS (3). `AS/audit/W6-postpublish-verify.md:78`
  lists "Drawer `:native` / `GlassNativeDrawer` / `/native-drawer`" as STILL an owed ask post-publish.
  The "owe-or-refute" ruling never resolved — it re-BOOK'd.
- **AT.PROGRESS:70** — "Drawer `:native` / `GlassNativeDrawer` — **STRONGEST BOOK** (≥2 firm:
  muster+speedtest)." Note: this means the ≥2-consumer bar — the gate that is supposed to FORCE the build —
  was MET (two firm consumers), and the item was BOOK'd anyway. The bar fired and was ignored.
- **AU.W9 §11.2** (`AU/AU.FINAL.md:64`, deferral register row) — "Drawer `:native` / `GlassNativeDrawer`
  (#32) | **BOOK** (partially discharged by `Drawer mode="live-behind"`)." The `live-behind` mode is offered
  as a partial discharge, but `AU.FINAL §3.2` itself states the real ask is a **native `<dialog>`-backed
  drawer** — "a separate component, NOT the additive prop W9's lean-fold scope admits."
- **AW** — the muster K tranche RE-FILES the ask as a fully-specified substrate
  (`AX/audit/converge-digest.md:72`): `popover="manual"` + scroll-snap detents + scroll-driven `@property`
  backdrop + IntersectionObserver state, to sidestep the vaul-vue `activeSnapPoint` re-snap bug (the AN.W3
  upstream limitation). The digest finds: this ASK "is **NOT present anywhere in the glass-ui AS deferred
  ledger and NOT covered by any AX wave**." Six tranches of BOOK and the canonical ask had fallen off the
  glass-ui ledger entirely.
- **AX.W20** — finally routed, but only as a "RATIFY-BEFORE-IMPL + ROUTE-DECISION" arm
  (`AX/waves/AX.W20-…:136-140`), i.e. a *decision about whether to build*, NOT a build. It can still resolve
  to "BOOK again."

**The challenge that bites:** the ≥2-consumer bar that L-invariant-8 / J-invariant-10 makes the FORCING
function for a build was **MET at AT** ("≥2 firm: muster+speedtest") and the item was BOOK'd regardless,
five tranches running. "BOOK-with-named-trigger" is therefore NOT a 2-consumer-gated archive — it is an
unconditional defer wearing a gate's clothing, because the named trigger (≥2 consumers) was already true
and produced no build. Worse, between AU and AW the canonical ask fell OFF the glass-ui ledger (the AS
ledger never carried the muster-K full spec), proving the "named-forward / watch" carry has no integrity
check that the item is still on the ledger it claims to be watched in. This is the `V.W3`-class
"doc-says-watched / ledger-says-absent" failure the early lane flagged, recurring on a live AX-bound item.

---

## LATE-2 — `proof:webgl-golden`: AT PLANNED-to-PROMOTE (harness exists) → AU DEFERRED-as-only-gate → AX still un-promoted

A gate that AT scoped as a trivial PROMOTE of an EXISTING harness, then AU deferred — the rare case where
the work was demonstrably cheap and was deferred anyway.

**Slip-history:**
- **AT** — `proof:webgl-golden` is specced as **PROMOTE not construct** at W2 + W5
  (`AT/AT.md:181` — "promote `scripts/profile-aurora.mjs` (already headless-Chrome WebGL2 + readPixels +
  SwiftShader-deterministic)"; `AT/PROGRESS.md:55` — "REAL — W2/W5 (the harness already exists)"). It is a
  HARD gate on the blob shader-quality wave (`AT/AT.md:119` DEC-AT-4). The harness pre-exists; the work is a
  rename + an assertion.
- **AU** — `AU/AU.FINAL.md:39,44` — "**The only DEFERRED gate is `proof:webgl-golden`**"; record
  `audit/proof-webgl-golden-DEFERRED.md`. Rationale: "the 8-assert CPU-equivalence + the aurora
  capture-render already cover GPU correctness; the pixel golden adds only a redundant byte-comparison." The
  named trigger: "a stable headless WebGL-live capture runner." But AT already asserted that runner EXISTS
  (`profile-aurora.mjs`, SwiftShader-deterministic) — so the AU named-trigger contradicts AT's own premise.
- **AX** — the AX.W00 π-lane stands up `proof:substrate-paints-color` (readPixels aurora + blob,
  `AX/PROGRESS.md:84`) which is the same capability, but `proof:webgl-golden` is NOT in the AX gate fleet and
  the AU deferral was never closed. The blob (W46) is a live BLOCKER in AX (`MASTER-PLAN.md:25`) — exactly
  the surface the deferred golden would have regression-guarded.

**The challenge that bites:** AT declared the harness "already exists" and the gate a 5-minute PROMOTE; AU
deferred it citing the ABSENCE of that very harness. One of the two close-records is false about the
mechanical state of `scripts/profile-aurora.mjs`. A deferral whose named-trigger ("a stable headless
capture runner") was asserted ALREADY-MET by the prior tranche is the `CHRONIC-1`-shape prose-rationale
defer — it stopped the carry without doing 5 minutes of work, and the blob shipped to AW visually-broken
(`AX/audit/research/frontend-convergence-digest.md:41` — GooBlob runtime throw + flat shading) the next
tranche, the exact regression class a pixel-golden guards.

---

## LATE-3 — the ARCHIVED-on-2-consumer-gate dispositions (panel-host, interruptible reorder): AN "closed" them → immortal WATCH, never re-adjudicated

AN's flagship close mechanism. AN.FINAL claims a clean "5 LANDED · 3 DOCUMENTED · 2 ARCHIVED-on-2-consumer-gate"
ledger (`AN/FINAL.md:7`) and declares zero silent open. The two ARCHIVED items have never been touched
since, and their realisation conditions are unfalsifiable-by-construction.

**Slip-history:**
- **AN.W5 / W6** — the interruptible MetricStack reorder recipe (ARCHIVED, trigger "≥2 mid-drag-reorder
  consumers") and the dock panel-host variant (ARCHIVED, trigger "≥2 tall-vertical-pane stacked-control
  consumers") — `AN/FINAL.md:39,40,58`; `AN/AN.md:48,49,68,69`.
- **AO → AW** — neither item appears in any subsequent FINAL's "closed" column; neither realisation
  condition is ever re-checked against the constellation. They sit in permanent WATCH.
- **AX** — the panel-host re-surfaces only as an incidental NOTE: `AX/audit/converge-digest.md:126` — "AX.W06
  — note the … AN dock panel-host ARCHIVED condition in the dock-controls.css carve." The interruptible
  reorder is noted to **DIE silently**: same line — "AX.W29 — note the AN interruptible-MetricStack-reorder
  ARCHIVED recipe **dies with metric-stack repatriation**." So one ARCHIVED item evaporates (its host
  primitive is being pruned) and the other is a margin note in an unrelated CSS carve. Neither was ever
  re-adjudicated against its named trigger.

**The challenge that bites:** "ARCHIVED-on-2-consumer-gate with a named realisation condition" is presented
by AN as the rigorous opposite of a silent defer. But across 9 tranches the realisation condition was never
re-evaluated — there is no gate, no audit step, no wave that re-runs "does the constellation now have ≥2
tall-vertical-pane consumers?" The condition is write-once-watch-never. One of the two items is now dying as
collateral of an unrelated prune (metric-stack repatriation), proving the ARCHIVE was never load-bearing.
The disposition vocabulary that AN minted to satisfy P-Inv-28 ("every gap a named disposition") produced a
clean-looking ledger and zero closure — the disposition IS the closure, in name only.

---

## LATE-4 — `proof:phantom-classes` fourier-analysis pending-handoff: AO → AP → AS, immortal escape-hatched RED

The cross-repo "pending-handoff" label — a deferral that runs RED forever behind an env-var escape and is
re-declared "consumer-domain, not our defect" every tranche.

**Slip-history:**
- **AO.W5** — `AO/FINAL.md:26` — "`proof:phantom-classes` is pending on a documented `fourier-analysis`
  handoff (escape-hatched `PROOF_PHANTOM_ALLOW_PENDING=1`; never wired into CI)." Origin is the Q.W4 Lane F
  un-applied migration patch (`AP/audit/GAMMA-empirical-state.md:99`).
- **AP.W5** — re-declared pending (`AP/FINAL.md:36`, `AP/audit/W5-close.md:75`). `AP/audit/GAMMA-empirical-state.md:103`
  CORRECTS the AO close's claim: AO said the gate is "absent from CI"; GAMMA measured it IS wired into
  `ci.yml:73` and only passes because the sibling repo doesn't exist on the runner (`existsSync` guard,
  phantom-classes.mjs:317). So the AO close-record was wrong about the gate's CI wiring.
- **AR.FINAL:14** — listed PASS (because the runner has no fourier-analysis tree).
- **AS.FINAL:85-86** — STILL carried: "fourier-analysis Q.W4 Lane F — an un-applied phantom-class patch (a
  `proof:phantom-classes` pending handoff)."

**The challenge that bites:** 29 RED sites (`AP/audit/GAMMA-empirical-state.md:99`) in an external repo that,
per OMEGA's own grep, is **not even a glass-ui consumer** ("`grep` finds no `@mkbabb/glass-ui` in its
package.json — in fact it has no package.json at the probed path", `AP/audit/OMEGA-cross-repo-perimeter.md:74`).
The gate is RED against a migration patch that has been un-applied since Q, in a repo that may not consume
glass-ui at all, and is held green only by a runner-environment accident (the repo is absent on CI). This is
a deferral-with-telemetry (the `CHRONIC-4` ci-drift shape): a gate that reports RED, is escape-hatched, and
is re-explained-as-not-ours every close — for four tranches. Either the patch lands (close it) or the gate's
scope excludes non-consumer repos (delete the RED), but "pending-handoff" has been the answer since AO and
the handoff has no owner.

---

## LATE-5 — the AW visual-truth blowout BOOK→FOLD cascade: AV "DONE" demo items shipped broken → AW FOLD-everything → AX re-litigates the whole set

The proximate motivator of AX, and the densest cluster of "marked DONE / shipped broken" in the corpus —
the late-lane manifestation of the headless-green chronic.

**Slip-history:**
- **AV.W10/W13** — `AW/RECAP.md §1` marks a long list of demo surfaces **DONE** at AV: storybook IA,
  header-ribbon removal, configurator recategorize, native-top-layer relocation. But the SAME table FOLDs to
  AW the items that turned out broken on the live device: glass-panels "all suck" (FOLD), `/primitives/card`
  toggles "don't work" (FOLD), `/foundations/native-top-layer` "totally broken" (FOLD-if-still),
  `/composables/use-token-color` "wtf" (FOLD), `/compositions/drawer-live-behind` "wtf" (FOLD). The DONE
  marks were headless/structural; the live truth was broken.
- **AV.W9 → 3.3.0** — the dock **simple two-layer collapse REGRESSED**: `AW/RECAP.md §2` — "AV.W9 fixed the
  layer-switch but **broke GlassDock's own collapse** … the width does not morph (stuck at collapsed width).
  Shipped in 3.3.0." A live regression shipped to a published version while the fix to a DIFFERENT dock path
  was marked DONE.
- **AW** — surfaced the GooBlob runtime throw (`AX/audit/research/frontend-convergence-digest.md:41,261` —
  per-frame `Parse error … var(--pr…)`, 3 bodies for 4 colors, orphaned satellites), aurora dark-canvas, and
  the broken-route set — then AW itself HALTED mid-flight (`MEMORY project_aw_session_limit_halt`: "headless-
  green/visually-broken gap: aurora core dark, blob broken, specular extreme, dock broken").
- **AX** — re-litigates the ENTIRE set as named waves/defects: dock-collapse (W01, root-caused as
  `container-type:inline-size`, `AX/AX.md:2315-2317`), blob (W46 live BLOCKER), glass-material (W48), card
  toggles (W20), native-top-layer (W20), use-token-color (P1/W18), glass-panel retire (W20), gate-pattern
  broken (Q8/blocker). The W00 π-lane exists *specifically because* this cascade proved every prior
  "complete" was headless-green.

**The challenge that bites:** AV shipped 3.3.0 with a published dock-collapse regression AND a published
blob that throws every frame, while its FINAL/RECAP marked the adjacent work DONE. The headless gates were
all green. This is not a planning miss — it is the cardinal lesson's root cause: every late tranche before
AX closed on headless-green and the visual truth was discovered one tranche later by a USER live-audit
(USER-DEFECTS pass-1/2/3). The cost compounds: AV's DONE→AW's FOLD→AX's re-litigate is the SAME defect
paying rent across three tranches. The AX W00 π-lane is the structural fix, but it is itself only as good as
its CI wiring — and that wiring is the LATE-6 chronic.

---

## LATE-6 — the budget rebaseline 3rd-conscious-lift trap: P-flagged headroom-exhaustion → AV/AW manual-unblocks → AX 3rd-due, unowned in the close path

The bundle-budget chronic (`CHRONIC-defer-early.md` CHRONIC-2) re-manifests in the late lane as
manual-unblocks at each published cut, now poised for a third forced lift with NO close-band owner.

**Slip-history (late-lane portion):**
- **P.W6** — flagged headroom thin (9.8% remaining; "next substrate-promotion would trigger a 3rd
  rebaseline") — carried forward as a measurement-time alert (`CHRONIC-defer-early.md:77`).
- **3.6.0 / 3.8.0 cuts** — `AX/audit/hardening/CH-close-crossrepo.md:82` — "**Slip count: 2 (3.6.0 re-base,
  3.8.0 manual-unblock)**; poised for a 3rd at 3.9.0." The 3.8.0 breach was MANUALLY unblocked at `f2fc614`.
- **AX (live)** — `CH-close-crossrepo.md:19,82` — "the budget is breaching NOW (103.5% gzip)" and W54
  (MAXIMAL glass-first ROOT) + W55 (adaptive-glass) + W56 (squircle) will ADD MORE CSS. MASTER-PLAN sequences
  the rebaseline in Batch 8 (W27 carves before rebaseline) but the publish-blocking breach is live in Batch
  9's path. "**No close-band wave owns 'rebaseline the CSS budget after the glass-first CSS, before the 3.9.0
  tag.'**"

**The challenge that bites:** the budget has been over-floor and manually unblocked at the last TWO
published cuts, and the heaviest-CSS waves of the entire AX tranche (glass-first ROOT + squircle +
adaptive-glass) are still un-landed. The close-band sequencing (W27a/b carve BEFORE rebaseline) was authored
BEFORE the user decided MAXIMAL glass-first, so the sequencing assumes a CSS-shrinking close that is now a
CSS-growing close. The publish gate (`profile:budget`, release-tagged) will be RED at the 3.9.0 tag and the
close will manual-unblock a THIRD time — unless a wave owns the post-glass-first rebaseline as the LAST act
before the tag. This is the same "landed gate, no meta-guard against the next refactor" disease, now
guaranteed to fire by a user decision the sequencing predates.

---

## THE GESTALT FINDING (late lane)

The late tranches did not fix the early lane's deferral-closure disease — they upgraded its vocabulary. Four
new labels carry the same payload:

- **BOOK-with-named-trigger** (AU) — the native-drawer (LATE-1) proves the trigger can be ALREADY-MET (≥2
  firm consumers at AT) and still produce no build, and the item can fall OFF the ledger it's "BOOK'd" in.
- **ARCHIVED-on-2-consumer-gate** (AN) — panel-host + reorder (LATE-3) prove the realisation condition is
  write-once-watch-never; one item is dying as collateral of an unrelated prune.
- **NAMED-FORWARD (watched)** (AR/AS) — the `:native` pilots (LATE-1) prove "watched" has no integrity check
  that the item is actually being watched.
- **pending-handoff** (AO) — phantom-classes (LATE-4) proves a RED gate against a possibly-non-consumer repo
  rides escape-hatched for 4 tranches.

The deeper root is identical to the early lane: **a disposition that satisfies the zero-deferral precept
(P-Inv-28) by NAMING the gap rather than CLOSING it.** Every one of these is a gate or bar satisfiable by a
proxy — the ≥2-consumer bar by a demo-gated pilot or an un-built BOOK; the "named trigger" by prose that is
never re-evaluated; the budget gate by a manual-unblock. AND the late lane added a new failure mode the
early lane did not have: **the published-broken close** (LATE-5) — AV shipping 3.3.0 with a live
dock-collapse regression and a per-frame-throwing blob while the FINAL marked the work DONE, because the
only gates were headless. AX W00's π-lane is the correct structural answer, but it is the LAST-built
machinery guarding the FIRST-broken surfaces, and its gates are not in CI (LATE-6's sibling: the 20-gate
ci.yml drift, `CH-close-crossrepo.md:80`).

---

## HARDENING ACTIONS (PLANNING — no code)

1. **Make BOOK/ARCHIVE dispositions FALSIFIABLE by a machine-checked trigger, or forbid them (W33 precept +
   a `proof:disposition-live` gate).** Amend the disposition precept: a BOOK / ARCHIVED-on-2-consumer-gate
   item may carry forward ONLY if a gate re-evaluates its named trigger each close. For the ≥2-consumer
   triggers (native-drawer, panel-host, reorder) the gate greps the constellation consumer repos and FAILS
   the close if the trigger is now MET but the item is still BOOK'd. This directly catches LATE-1 (trigger
   met at AT, ignored) and LATE-3 (trigger never re-checked). A prose realisation-condition that no gate
   reads is a silent defer with paperwork.

2. **Resolve the native-drawer ASK at AX.W20 to BUILD or FORMAL-REFUTE — ban a 7th BOOK (W20 ratify-gate).**
   The ≥2-consumer bar has been MET since AT (muster MobileInstrumentSheet + speedtest mobile sheet,
   `converge-digest.md:72`). W20 currently allows a "BOOK again" exit. Remove that exit: W20 either ships the
   `popover="manual"` + scroll-snap `GlassNativeDrawer` (the canonical spec the AS ledger LOST) or writes a
   refutation that DELETES the ask from every consumer's owe-ledger. A 6-tranche BOOK with a met trigger is
   not a 2-consumer-gated archive; it is the deferral the bar exists to prevent.

3. **Close `proof:webgl-golden` by PROMOTING the existing harness OR deleting the gate name (W46/W00).** AT
   asserted the harness exists (`profile-aurora.mjs`, SwiftShader-deterministic); AX W00 ships the same
   readPixels capability (`proof:substrate-paints-color`). Either promote it onto the blob (W46 is the live
   blob BLOCKER — the surface that shipped broken in AW) so the next blob regression is caught, or formally
   retire the gate name and record that `proof:substrate-paints-color` subsumes it. A deferred gate whose
   named trigger the prior tranche asserted ALREADY-MET is a contradiction the close must resolve.

4. **Resolve `proof:phantom-classes` by scoping out non-consumer repos OR landing the patch (W27a/W33).** The
   gate has run RED against fourier-analysis (a repo with no `@mkbabb/glass-ui` dependency at the probed
   path, `OMEGA-cross-repo-perimeter.md:74`) for 4 tranches behind `PROOF_PHANTOM_ALLOW_PENDING=1`. Either the
   Q.W4 patch lands (close the RED) or the gate's consumer-sweep excludes repos that don't import glass-ui
   (delete the RED). A 4-tranche escape-hatched RED is a deferral-with-telemetry, not a passing gate.

5. **MINT a post-glass-first budget-rebaseline as the LAST act before the 3.9.0 tag (W33 step-0 / a new
   publish-readiness wave).** The budget has been manually-unblocked at the last 2 cuts and W54/W55/W56 (the
   user-decided MAXIMAL glass-first + squircle + adaptive-glass) will grow CSS further. The MASTER-PLAN
   Batch-8 sequencing (carve-before-rebaseline) predates the MAXIMAL-glass decision and assumes a shrinking
   close. Re-sequence: the EIGHTH conscious lift, sized to carry glass-first CSS, must be the final pre-tag
   act, with a `proof:budget-gate-present` self-check so a later consolidation cannot silently delete it
   (the J→K regression, `CHRONIC-defer-early.md` CHRONIC-2). Otherwise the publish gate is RED at the tag and
   the close manual-unblocks a third time.

6. **Add a `proof:no-published-broken` close criterion: every published version's headline surfaces have a
   captured LIVE DELTA before the tag (W00/W33).** LATE-5 is the chronic that motivated AX: AV published
   3.3.0 with a live dock-collapse regression and a per-frame-throwing blob while the FINAL marked the work
   DONE. The AX cardinal lesson and W00 π-lane are the right answer, but make it a TAG-BLOCKING criterion,
   not a per-wave aspiration — the 3.9.0 tag cannot place until the dock/blob/aurora/glass-material headline
   surfaces each have a captured `audit/visual/` DELTA at ≥2 viewports × light/dark. The π-lane gates must
   ALSO be in CI (the 20-gate ci.yml drift, `CH-close-crossrepo.md:80`) or the lane can silently regress the
   same way the prior closes did.
