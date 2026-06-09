# CH-misc — adversarial red-team of the misc waves (W22, W28, W29, W36, W39, W42, W43, W44, W48, W49, W51)

**Lane** CH-misc · **HEAD** ~89edffc (3.8.0 + convergence) · **Verdict** WEAK
**The headline:** **W42's liquid-morph substrate spec is STALE at three load-bearing points** — its
RED witness 1 ("`grep MorphGroup src/` returns ZERO") is FALSE (W02 already shipped `dockMorphContext.ts`
with `DockMorphGroup*`), and ALL FOUR of its named second-consumer candidates (`BouncyToggle`/`BouncyTabs`/
`UnderlineTabs`/`ResponsiveTabs`) were DELETED by the now-landed W53. The §18.3 substrate cannot land with
the consumers its own spec enumerates; the ≥2-consumer bar it leans on has NO valid second consumer in the
spec. Separately, W43 carries a born-RED witness that is already FALSE at HEAD (api "0 fourier hits" is 1),
W29's chassis-retire is a 6-RED-witness × 28-edit-site mega-prune gated on a cross-repo W28 receive that is
itself `planned` (a chronic deferral chain), and the W36/W39 a11y/perf waves are pure-deferred close-tail
work with no live capture.

---

## Method

Read W29 (full), W42 (full), W43 (full), W48 (full), W49 (full), W51 (lines 1-230), W22 (lines 1-90),
W44 (State), the MASTER-PLAN DAG + USER-DECIDED hinges, USER-DEFECTS pass-3 (Q1-Q9), PROGRESS, and the
sibling hardening files. Verified every load-bearing claim against the live `src/` tree + the sibling
repos on disk — each challenge below is a file:line or a shell-probe result, not a hunch.

---

## CHALLENGES (the falsifiable findings)

### C1 — W42's RED witness 1 is FALSE at HEAD: the morph substrate is HALF-LANDED, the spec is stale

W42's born-RED witness 1 (`AX.W42:30-39`) asserts:
> `grep -rn 'MorphGroup\|provideMorphGroup\|--morph-t\b' src/` returns ZERO.

**This is FALSE at HEAD.** Live probe:
```
src/components/custom/dock/composables/dockMorphContext.ts:30: …the dock-flavored first instance of the general `MorphGroup`…
dockMorphContext.ts:41: export interface DockMorphGroupRegistration {
dockMorphContext.ts:50: export interface DockMorphGroupHandle {
dockMorphContext.ts:344: function addTarget(reg: DockMorphGroupRegistration): MorphTarget {
src/components/custom/dock/composables/index.ts:33: type DockMorphGroupRegistration,
```
W02 (one morph-orchestrator per dock, marked `complete` in PROGRESS) ALREADY landed `dockMorphContext.ts`
— the dock-flavored `DockMorphGroup` the W42 spec says it will lift onto a general `MorphGroup`. W42's own
text even names this ("This IS the generalization of W02's `dockMorphContext`", `:130`), but the §State
born-RED witness was authored against a pre-W02 tree and never re-diagnosed. **The wave's first gate is
born-GREEN, not born-RED** — a soundness violation of the AX born-RED→GREEN contract the spec itself
mandates (`:62` "The wave is RED at HEAD on all three"). The W00 live-re-diagnosis ritual (`:64`) exists to
catch exactly this; it was not run before the spec was frozen.

### C2 — W42's SECOND-CONSUMER set is GONE: every named candidate was deleted by W53 (the lane's headline)

W42 §Open-Questions-2 (`AX.W42:580-585`) enumerates the candidate second consumers (the substrate ships
with ≥2 consumers or it is overfit, per the no-overfitting bar it leans on, `:537`):
> Candidates: a card→detail expand, a Dialog/Popover materialize, **a tab-indicator glide
> (`UnderlineTabs` inset morph), or a segmented-toggle thumb (`BouncyToggle`/`ToggleGroup`)**.
> Recommendation: **the tab-indicator glide OR the card→detail expand**.

Live probe — every tab-family candidate it names is DELETED:
```
BouncyToggle.vue:   ABSENT
BouncyTabs.vue:     ABSENT
UnderlineTabs.vue:  ABSENT
ResponsiveTabs.vue: ABSENT
SegmentedTabs.vue:  PRESENT  (the W53 unification)
```
W53 (`AX.W53`, live-verified DEVELOPED) UNIFIED `BouncyToggle`/`BouncyTabs`/`UnderlineTabs`/`ResponsiveTabs`
into ONE `SegmentedTabs` with its OWN elastic indicator engine (`useTabIndicator`) that GLIDES on
`--spring-snappy` AND SQUISHES via a volume-preserving `--stretch` scalar (`AX.W53:42`). **The tab-indicator
glide W42 named as its recommended second consumer is now owned by a SEPARATE, already-shipped engine** —
re-pointing it at `useLiquidMorph` would be a regression-rewrite of a live-verified surface, not a clean
second-consumer landing. W42's recommendation is dead; the spec has no surviving recommended second
consumer. (W42's Disjointness §vs-W05 mentions the spring register but nowhere acknowledges W53; W42
predates the W53 land and was never reconciled — confirmed: W42 file mtime `Jun 8 02:44`, W53
`Jun 8 17:56`.)

The MASTER-PLAN flags this obliquely ("re-diagnose W42 (its 2nd-consumer hinge is stale post-W53)",
`MASTER-PLAN.md:21`) — but the W42 SPEC was never amended; the candidate list, the recommendation, and the
RED witness all still read the pre-W53/pre-W02 world. A wave cannot drive from a spec whose every
load-bearing example is stale.

### C3 — W43's RED witness 4 is partially FALSE at HEAD: the api-seat grep already returns non-zero

W43 RED witness 4 (`AX.W43:53-62`) asserts:
> `grep -c "fourier\|Fourier" src/api/index.ts` → **0**.

Live probe returns **1**:
```
src/api/index.ts:299: // substrate (a custom Canvas2D field paralleling Constellation/FourierField)
```
The comment mention pre-exists. The *substantive* claim — no `FourierFieldProps`/`FourierFieldVariant`
type-export BLOCK — IS true (the seat is genuinely absent), but the witness's literal grep assertion is
already non-zero, so the born-RED gate as WRITTEN (`grep -c … = 0`) is born-GREEN-failing on a comment. The
gate must assert the absence of the TYPE BLOCK, not a grep-count-zero on the string "Fourier" — otherwise it
trips on the existing comment and the wave cannot prove its own RED baseline. Minor, but it is the same
class of un-re-diagnosed witness as C1 (the spec was frozen without re-running the grep against live HEAD).

### C4 — W43's blocking-dep chain (W14) is `planned` AND the SOTA research is a deferred-to-mid-tranche punt

W43 `dependsOn AX.W07 + AX.W14 + AX.W18` (`:8-9`). Live status: **W14 is `planned`** (PROGRESS:30,
"WebGPU painterly parity or excise"), W18 is `planned`. So the headline pass-3 directive — "**execute the
W43 SOTA research NOW, not mid-tranche**" (USER-DEFECTS-pass3:20, the single bolded process directive) —
is contradicted by W43's own structure: the SOTA research (§7, `:184-216`) is explicitly DEFERRED to the
drive window ("**The fourier-field SOTA research is NOT a now/pre-drive task**", `:187`), gated behind a
`planned` W14 that may `excise` WebGPU entirely. The user said pull it UP and run it NOW; the spec keeps it
mid-tranche behind two un-landed deps. The research corpus already exists (a `W43-fourier-field-SOTA.md`
inventory file is in the git status as modified) — so the "deferred" framing is doubly stale: the research
the user demanded NOW is being re-deferred behind a WebGPU wave that might never land. The deferral
RATIONALE ("lands on a settled GPU substrate", `:189`) is sound engineering but directly defies the
user's explicit "NOW" precedence bump.

### C5 — W29's chassis-retire is a 6-RED-witness × ~28-edit-site MEGA-PRUNE gated on a `planned` cross-repo receive

W29 (668 lines) prunes 5 component dirs + 1 @utility + 1 dock variant across ~28 enumerated edit sites
(barrel/subpath/api/package.json/5 gate scripts/CSS/tokens/demo/manifest/MIGRATION.md/CLAUDE.md), with a
strict EDIT-ORDER INVARIANT (`:175-179`) where ANY misorder yields a dangling `export *` build-break. Its
repatriate-prune half is **HARD-gated on W28's `proof:repatriate-local` being GREEN** (`:248-251`) — and
**W28 is `planned`** (PROGRESS:46), as is W29 itself. The cross-repo receive (speedtest + muster land native
copies) is a two-app coordination that has not begun. The speedtest sibling EXISTS on disk
(`../speedtest`), so the receive is *possible*, but the entire W29 prune cannot start until W28 lands +
greens its sibling-side gate + W21 lands the MIGRATION.md un-retired truth + the `/metric-pill` subpath
disposition is ratified. This is a THREE-wave serial chain (W21 → W28 → W29) with a cross-repo hinge in
the middle — exactly the chronic-deferral shape (D12 chassis-retire has been "confirmed REMOVE" since
USER-DEFECTS pass-3 `:16` but is still `planned` two passes later). The risk: W29's born-RED witnesses
(the families on the full surface) are correct TODAY, but the wave's complexity + cross-repo gate make it a
prime candidate to slip to the tranche tail and never close, leaving the confirmed-REMOVE chassis shipping.

### C6 — W22 (`complete`) carries a RATIFY-gated witness whose disposition is NOT recorded in the audit JSON

W22 is marked `complete` (PROGRESS:38) and its band landed live-verified. BUT its RED witness 2 (the
Fraunces substrate-without-consumer, `AX.W22:39-49`) was **RATIFY-gated** between path (a) excise the face
+ `proof:font-axes` vs path (b) wire it into a live display surface (`:63-65` "the wave does NOT proceed
past Cadence step 1 until the adjudication is recorded"). The PROGRESS W22 close note (PROGRESS:158-160)
records "no preset opt-out, no Fraunces default-undone-by-preset" + `proof:font-cascade-live` GREEN — but
does NOT state WHICH path (a/b) landed for the ~67KB Fraunces face. A `complete` mark over an
unrecorded RATIFY disposition is a soundness gap: a future reader cannot tell if the 67KB
`fraunces-latin.woff2` was excised (path a) or wired (path b) without re-reading the diff. Verify the
`W22-font-register-reconciliation.json` records the path; if Fraunces still ships at `src/fonts/fraunces/`
with no live renderer, the substrate-without-consumer witness is NOT actually closed and `complete` is
inflated.

### C7 — W36 (forced-colors) + W39 (lighthouse) are pure-deferred close-tail a11y/perf with no live capture owed yet

Both are `planned` (PROGRESS:54,57) and sit in Batch 6 (W36) / Batch 9 (W39) of the DAG — the close tail.
Neither has a born-RED audit JSON in `audit/` (only the 24 landed-wave JSONs exist). These are legitimate
deferrals (they need the page-redesign + IA waves to settle first so the route matrix is stable), but they
are the classic "a11y/perf swept to the end" pattern that recurs across tranches — and the cardinal-lesson
risk is acute: W39's "lighthouse perf/a11y route matrix" is precisely the kind of wave that gets marked
`complete` on a headless lighthouse-CI run over routes that render broken live (the exact
headless-green-over-broken class AX exists to kill). When they land, the close gate MUST require a captured
per-route DELTA, not a lighthouse JSON score.

### C8 — W48/W49 demo-reauthors are SOUND but carry the SAME meta-class they each decline to fix

W48 (glass-material) + W49 (math-paper) are well-specified, born-RED-honest (verified: `OUTLINE_PEAK_ALPHA`
ships, latex-paper not a dep, `glass-btn !h-12 !w-44` abuse present). Each EXPLICITLY records the meta-class
— "a demo authored against a prior behaviour and never rewired after the library moved underneath it"
(`W48:128-136`) — and each EXPLICITLY declines to fix it ("RECORDS the meta-class for the W33 close … does
NOT author the cross-story class-guard"). That is the correct altitude call, BUT it means the
class-guard (a `proof` that EVERY substrate/composition story exercises the seams it narrates) is deferred
to W33 — and W33 is the close wave already carrying the gate-fleet + readmes + overfitting + FINAL. The
risk: the cross-story class-guard is the highest-leverage fix (it would catch glass-material, math-paper,
blob-mood D7, AND the card-story all at once) and it is parked in the most overloaded wave. It should be
its OWN early wave, not a W33 rider — otherwise the demo-rot class recurs in the next tranche.

### C9 — W51's retro-reconcile is correct but the `--dock-scale` coarse block is a LIVE double-scale hazard

W51 honestly records the inverted sequencing (`AX.W51:4` — "W45 already shipped `--dock-scale`; W51 is a
RETRO-RECONCILE"). Live-verified: `--dock-scale: 1` at `tokens.css:1111`, `--dock-scale:
var(--dock-mobile-scale, 1.5)` at `dock.css:1634` — both calc-FREE (no `var(--ui-scale)` factor), so the
born-RED witness 5 holds. The hazard the spec under-flags: when W51 re-homes `--dock-scale` to
`calc(var(--ui-scale) * var(--dock-local-scale, 1))` AND lifts the coarse default to `:root { --ui-scale:
1.5 }`, the dock's EXISTING `dock.css:1634` coarse block (`--dock-scale: var(--dock-mobile-scale, 1.5)`)
becomes a DOUBLE-scale unless it is simultaneously rewritten — 1.5 (global) × 1.5 (dock-local) = 2.25× on
touch. W51 fold 6 (`:204-214`) flags the recommendation (the dock "drops its own coarse override entirely")
but defers it to a §Open-questions RATIFY. A retro-reconcile that lands the global coarse default WITHOUT
atomically rewriting the dock coarse block ships a 2.25× touch dock — a live regression. This MUST be a
single atomic edit, gated by a live coarse-pointer DELTA showing the dock at 1.5× not 2.25×.

---

## CHRONIC deferrals (with slip history)

- **D12 chassis-retire (W28→W29).** "REMOVE confirmed" since USER-DEFECTS pass-3 (`:16`, 2026-06-08); the
  `_DECISION.md` "instrument chassis is not general enough" predates AX entirely (AV/AW were blocked on the
  ≥2-consumer wall). Now a 3-wave serial chain (W21→W28→W29) all `planned`, cross-repo-gated. Slipped
  AV → AW → AX; at risk of slipping past AX close given the 28-edit-site complexity + the `planned` W28.
- **The fourier SOTA research "NOW" directive (W43).** User said "pull up + execute NOW" (pass3:20,38, the
  ONE bolded process directive); the W43 spec re-defers it to mid-tranche behind a `planned` W14 that may
  excise WebGPU. The research corpus inventory file (`W43-fourier-field-SOTA.md`) is in the working-tree
  modified set — so the research partly exists but is structurally re-deferred. A direct user-directive ↔
  spec contradiction.
- **The demo-rot class-guard (W48/W49 → W33).** The cross-story "every story exercises the seams it
  narrates" guard is named in W48 (`:128`) + implied by the D7/card-story pattern, and parked in the
  overloaded W33 close. The class (glass-material D8, math-paper D16, blob-mood D7, card-story) recurs every
  pass; the guard that would kill the whole class is perennially deferred to "the close."
- **a11y/perf to the tail (W36 forced-colors, W39 lighthouse).** The recurring "sweep a11y/perf to the end"
  pattern; both `planned`, both close-tail, neither with a born-RED JSON yet.

---

## HARDENING ACTIONS (planning only — to perfect this)

1. **AMEND W42's spec before it drives (mandatory).** Re-run the W00 live-re-diagnosis: (a) replace RED
   witness 1 with the ACTUAL born-RED state — `dockMorphContext.ts` exists (W02) but is dock-PRIVATE and
   no GENERAL `MorphGroup`/`useLiquidMorph`/`--morph-t` exists; the witness is "the dock orchestrator is
   not lifted to a general substrate + no non-dock consumer reads it," not "MorphGroup absent"; (b)
   RE-CHOOSE the second consumer from the SURVIVING surface — the tab-indicator is gone (W53 owns it via
   `useTabIndicator`), so pick the **card→detail expand** (`<Card>` self-reshape) or a **Dialog/Popover
   materialize**, and explicitly retire the `BouncyToggle`/`UnderlineTabs` candidates; (c) add a
   Disjointness §vs-W53 clause (does `useTabIndicator`'s squish-engine fold ONTO `useLiquidMorph`, or stay
   separate? — ratify, because two morph engines in the tree is the one-path violation W42 exists to kill).
2. **Run a W42-vs-W53 unification prototype.** Before W42 lands, prototype whether `useTabIndicator`'s
   `--stretch` glide+squish CAN be re-expressed as a `useLiquidMorph` consumer (the `axes` declaration +
   the 3-state lifecycle). If yes, W53's engine becomes the third consumer and the substrate is real; if no
   (the squish physics diverge), W42 must pick a genuinely independent second consumer AND record that the
   tab-indicator is a deliberate separate engine (the glass-cohesion ONE-model question for motion).
3. **Fix W43's RED witness 4 grep + resolve the SOTA "NOW" contradiction.** Change the api-seat gate to
   assert the TYPE BLOCK absence, not `grep -c "Fourier" = 0` (which trips the existing comment). Escalate
   the user-directive contradiction: either pull the SOTA research OUT of the W14-gated drive window and run
   it NOW on the Canvas2D parity-floor (honoring the user "NOW"), or surface to the user that the WebGPU
   substrate gate inverts their precedence — do not silently re-defer.
4. **Split the demo-rot class-guard into its OWN early wave.** A `proof:story-exercises-seams` gate that
   every substrate/composition story binds the tokens/composables it narrates — authored EARLY (before the
   page-redesign waves re-author stories), not parked in W33. It folds glass-material/math-paper/blob-mood/
   card-story into ONE class-fix and prevents the recurrence.
5. **Make W51's `--dock-scale` reconcile a single ATOMIC edit + a coarse-pointer DELTA.** The global coarse
   default + the dock coarse-block rewrite MUST land in one commit, gated by a live coarse-pointer capture
   proving the dock paints 1.5× (not 2.25×) on touch. Add the double-scale case to `proof:ui-scale` as a
   RED-witness (a synthetic coarse render that asserts the dock's computed scale equals the global default,
   not its product).
6. **Audit W22's RATIFY disposition in its JSON + de-inflate if Fraunces still ships dead.** Confirm
   `W22-…json` records path (a) excise vs (b) wire; if `fraunces-latin.woff2` still ships with no live
   renderer, witness 2 is NOT closed and W22 should be `complete_with_misses`, not `complete`.
7. **When W36/W39 land, require a per-route captured DELTA, not a lighthouse/axe JSON score.** Encode the
   cardinal lesson into their close gate so a headless-green a11y/perf score over a broken live route cannot
   close them.
