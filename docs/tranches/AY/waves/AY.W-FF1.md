# AY.W-FF1 — Fourier-field research-rebase: re-land the born-RED AX.W43 spec + the cross-repo math-leaf decision + the PINNED resting-paint alpha

**Wave** `AY.W-FF1` · **Band** A (perfect-at-the-root) · **State** RESEARCH · **Repo** glass-ui
· **Kind** research-rebase (writes a rebased wave-spec artefact + a recorded cross-repo decision; writes NO `src/` component code — that is `AY.W-FF2`)
· **Blocks** `AY.W-FF2` (consumes the rebased spec's edit-sites + the PINNED alpha target the visibility gate measures + the math-leaf disposition the deletion/promotion follows)
· **Depends on** `AY.W0-REGROUND` (the stale-ledger correction — ledger row #8 re-stamped "DONE-VERIFY (element) · OPEN (W43 intensity NEVER landed)") + `AY.W-DAG` (the spec-inventory coherence pass this file is authored under)
· **Hardening inputs** `audit/hardening/H-fourier.md` (the GAPS-FOUND red-team — the W43-never-landed headline + the live cross-repo duplication + the three-substrate parity break + the §2.2 0.55-vs-0.35 hedge), `audit/hardening/H-overfitting.md` Finding 2 (the dead `evalFourier` export — routed to W-FF2's deletion) + `waveSpecInputs` 2
· **Source corpus** `docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md` (the 56 KB born-RED spec, authored-but-stopped — the thing this wave REBASES), `docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` (the EXECUTED SOTA research — the recipe the rebased spec folds), the live sibling `/Users/mkbabb/Programming/fourier-analysis/web/src/lib/{evaluators,bases,types}.ts` (the byte-equivalent math duplication the leaf decision resolves)

---

## Defect (source-grounded, file:line — verified against HEAD `fba6262` on `at-dock-convergence`)

The AY.W-FF1 SEED verb is wrong, and the seed's three sub-claims are each verified REAL at HEAD. The
defect is NOT "fold the research into a path-forward doc" — the path forward **already exists TWICE**
(the AX.W43 born-RED spec, 56 KB, fully authored; AND the EXECUTED `W43-fourier-field-SOTA.md`
research with the concrete 3-pass recipe + the §2.2 bundle table). Producing a THIRD doc is the
chronic-miss the hardening names (`H-fourier.md §8` — the W43 intensity model carried across TWO
tranches without landing). The actual defect is threefold:

1. **The born-RED AX.W43 spec was authored but NEVER landed — it is stale-anchored, not stale-content.**
   The AX.W43 spec (`docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md`) is born-RED against
   HEAD `cdcf331` (the AX line) and carries a DEFERRED-mid-tranche research disposition (§7) that the
   `W43-fourier-field-SOTA.md` pull-up SUPERSEDED. It is also dependsOn-anchored to AX waves
   (W00/W07/W14/W18/W37) that no longer exist as AY blockers. Every born-RED witness is STILL TRUE at
   the AY HEAD `fba6262` (re-verified, not taken on the spec's word):
   - `grep -rn "OUTLINE_PEAK_ALPHA" src/ | wc -l` → **5** (NOT 0). `FourierField.vue:103` declares
     `const OUTLINE_PEAK_ALPHA = 0.24;`; consumed at `:237` (`*0.6*0.5`), `:242` (`*0.6`), `:282`
     (the quadratic trail `* age * age`), `:294` (the head glow — NOT the strongest layer).
   - `grep -c -i "fourier" src/api/index.ts` → **1** (a prose comment only; NO exported props/variant type).
   - `ls src/components/custom/fourier-field/README.md` → **No such file** (sibling
     aurora/goo-blob/constellation each ship a README; verified `aurora/README.md`,
     `constellation/README.md`, `goo-blob/README.md` exist, fourier-field's does not).
   - `ls tests/components/custom/fourier-field/` → **absent** (no mount-smoke under the mirrored tree).
   - `ls scripts/*fourier*` + `grep fourier package.json` → only the `/fourier-field` subpath export +
     `typesVersions` entry resolve; **NO `proof:fourier-*` gate** exists.
   The component RENDERS but the `final` preset (epicycles OFF, `FourierField.vue:96`) draws ONLY the
   0.24-quadratic comet trail → a corner stub. Captured truth:
   `docs/tranches/AX/audit/visual/W18-fourier-field-desktop-{light,dark}.png` (both present, both show
   the near-invisible whisper). **So AY.W-FF1's job is to REBASE the spec to the AY HEAD + AY dependency
   graph, fold the EXECUTED SOTA research's disposition (Canvas2D-is-correct, the deferral dissolved),
   and hand W-FF2 a clean, current edit-site set — NOT re-research, NOT re-author a born-RED narrative
   that re-litigates the W00/W07/W14 dependency chain.**

2. **The cross-repo math duplication is LIVE — the AX.W43 / SOTA-research "keep-book" disposition is
   STALE against the live dependency.** `W43-fourier-field-SOTA.md §5` closes "keep-book, do not mint a
   speculative shared-math subpath now … fine at 2 repos." That disposition was written BEFORE the live
   dependency was checked. Verified at HEAD:
   - `fourier-analysis/web/package.json:14` → `"@mkbabb/glass-ui": "^3.1.0"` (the sibling ALREADY
     depends on glass-ui — the consumer relationship is established, not hypothetical).
   - `fourier-analysis/web/src/lib/evaluators.ts:9-26` `evaluateFourier` is **byte-equivalent** (modulo
     `let re = 0, im = 0` comma-vs-newline whitespace) to glass-ui's `math.ts:39-56` `evalFourier`.
   - `fourier-analysis/web/src/lib/bases.ts:27-46` `fourierPositionsAt` is **byte-equivalent** to
     glass-ui's `math.ts:64-83` `positionsAt`.
   This is the slides-`constellation.ts`-class bespoke-copy-in-consumer the AY HEADLINE exists to KILL
   (`AY.md:1-30` — "consumers compose fully-abstracted glass-ui components with NO bespoke copies").
   The AY row `W-FF1` (`AY.md:151`) already names this — "decide the cross-repo math-leaf duplication" —
   but leaves the DECISION as a hand-wave (`promote a /fourier-math leaf … OR book with a concrete
   dependency-bump trigger`). This wave RESOLVES it with the live dependency as the deciding evidence
   AND the bounding nuance below.

3. **The §2.2 SOTA-research bundle table carries a 0.55-vs-0.35 hedge that NO gate can assert.** The
   `W43-fourier-field-SOTA.md §2.2` bundle table gives `hero peakAlpha = 0.55` / `headGlowAlpha = 0.62`,
   while its closing paragraph and the AX.W43 FileBounds say "hero peak≈0.55, **trail head ≈0.35**" and
   then explicitly instructs "record BOTH readings in the W43 audit so the gate measures the right one"
   (`W43-fourier-field-SOTA.md:175-179`). That "record both" instruction is the defect: the 0.35 reading
   is reconciled only by "the value AFTER the `intensity` default ride at a recessed hero loudness" —
   which is CIRCULAR, since `intensity` defaults to `1` (no ride) and the §2.2 table is itself the
   resting bundle. A two-reading hedge is an unbindable threshold (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`
   — a gate is valid only when an artefact can verify it; "measure 0.55 OR 0.35" can never fail). W-FF2's
   `proof:fourier-field-visibility-live` must measure ONE defined number. This wave PINS that number.

---

## Goal criterion (the aim)

After this wave, the fourier-field re-land is **un-blocked and un-ambiguous**: a fresh W-FF2 implementer
opens ONE current spec (`AY.W-FF2.md`, whose edit-sites this wave's rebased material populates) that
points at the AY HEAD file:lines, folds the EXECUTED SOTA recipe (3-pass phosphor-comet, Canvas2D-is-
correct, the deferral dissolved), carries a SINGLE pinned resting-paint alpha target the visibility gate
measures, and routes the cross-repo math duplication to a RECORDED decision (promote-the-leaf-the-
sibling-imports, OR book-with-a-concrete-trigger) so W-FF2 either deletes-and-exports or books — never
re-litigates. No third research doc is produced; no born-RED narrative re-relives the retired AX
dependency chain.

## Completion criterion (the artefact)

The HARD GATE below verifies. The rebased material is recorded in `AY.W-FF2.md` (the impl wave this
wave un-blocks) + a `docs/tranches/AY/audit/W-FF1-fourier-rebase.md` decision record carrying: (a) the
five born-RED witnesses re-confirmed at HEAD `fba6262` with the exact grep counts; (b) the AX→AY
dependency-graph rebase (which AX blockers dissolve, which fold into AY waves); (c) the PINNED resting-
paint alpha bundle (ONE number per field, `intensity=1`); (d) the cross-repo math-leaf DECISION with
its concrete trigger or promotion shape. The decision is RECORDED, not hand-waved — a fresh auditor reads
the disposition and the trigger from the artefact alone.

---

## Objective — REBASE (not re-research) + DECIDE the math leaf + PIN one alpha

This wave writes NO `src/` and NO `FourierField.vue` edit. It produces the rebased spec material + the
recorded decision that un-blocks `AY.W-FF2`. Concretely, four deliverables:

### 1. Rebase the born-RED AX.W43 spec onto the AY HEAD + dependency graph

The AX.W43 spec is the SOURCE; the rebase carries its intensity-model scope FORWARD but re-anchors it:

- **Re-anchor the dependency graph.** AX.W43 dependsOn W00/W07/W14/W18/W37. At the AY HEAD these are
  SETTLED or dissolved: the SOTA research (`W43-fourier-field-SOTA.md §4`) RESOLVED that Canvas2D is the
  correct render at this scale (≤64 phasors, ≤200-point trail — two orders of magnitude below the
  WebGPU-worth-it line), so the W07/W14 GPU-substrate dependency that motivated the AX.W43 §7 DEFERRAL
  **DISSOLVES** — the research lands NOW on the Canvas2D parity-floor; WebGPU is recorded as a future
  additive enhancement, not a now-blocker. The W00 π-lane and W18 IA seat are landed at AX (the demo
  story `demo/stories/substrates/fourier-field.vue` + `manifest.ts:141` EXIST per `H-fourier.md §1`).
  W37 (`useCanvas2D` substrate + `resolveCanvasColor`) is landed (`FourierField.vue:3` composes
  `useCanvas2D`; `:108-126` carries the inline `var()`/`light-dark()` resolve). So the AY dependency set
  reduces to: `AY.W-FF1` (this rebase) → `AY.W-FF2` (the impl). No GPU-band wait, no IA-seat wait.
- **Fold the EXECUTED SOTA recipe as the W-FF2 render half.** The `W43-fourier-field-SOTA.md` recipe
  (the 3-pass phosphor-comet, §2.1; the per-variant bundle, §2.2; the `intensity` prop, §2.3; the
  zero-alloc hoist, §3; the R1 amplitude-descending sort, §1.3) is the concrete W-FF2 paint recipe. The
  rebase carries the §2.1 dark/light blend fork forward as load-bearing: `ctx.globalCompositeOperation =
  isDark ? "lighter" : "source-over"` — the Canvas2D 2D-context `lighter` op (universally supported, no
  Safari quirk, NO `@supports` gate; distinct from W52's CSS `mix-blend-mode` path) on the ink ground;
  plain alpha on cream (additive over cream blows the trail to white).
- **Carry the citizenship scope.** README (research-backed, the SOTA doc deepens it) + the
  `api/index.ts` fourier-field block + the mount-smoke + the two gates (`proof:fourier-field-intensity`
  static + `proof:fourier-field-visibility-live` device) — all AUTHORED at W-FF2 (the AX.W43 spec
  authored NONE; that is why it never landed).
- **Strip the AX-era meta.** The rebased material carries NO "deferred to mid-tranche" / "the I-session
  lifted" / "born-RED at `cdcf331`" version-history language (greenfield-no-meta, MEMORY
  `feedback_greenfield_no_meta`). It is a forward impl spec anchored at the AY HEAD.

### 2. DECIDE the cross-repo math-leaf duplication — RECORD the disposition + its trigger

The decision must resolve `H-fourier.md §3`'s bounded nuance (verified at HEAD): the sibling's
`evaluateFourier`/`fourierPositionsAt` (the fourier arm) ARE byte-equivalent to glass-ui's
`evalFourier`/`positionsAt`, BUT the sibling's `lib/bases.ts:10` ALSO carries `evaluateBasis` — a
dispatch over `fourier | chebyshev | legendre` — and the polynomial arms (`evaluators.ts:29` chebyshev,
`:61` legendre) are sibling-LOCAL (glass-ui correctly ships ONLY the fourier arm). The sibling's
`BasisComponent` type lives in its own `lib/types.ts:1-6` and is SHARED across the fourier arm, the
polynomial bases, the SVG pipeline (`svg-fourier.ts`), and `BasisDecomposition`/`EpicycleData`. So the
shared leaf is the **fourier-only** `{evalFourier, positionsAt, comp, BasisComponent}` core; the
sibling's polynomial bases + SVG pipeline stay sibling-local.

The decision is BOUNDED by this real friction: glass-ui's `BasisComponent` (`math.ts:14-19`) is
STRUCTURALLY IDENTICAL to the sibling's `types.ts:1-6` (`{index, coefficient:[number,number],
amplitude, phase}`) — so a promotion IS feasible (the sibling would import glass-ui's
`evalFourier`/`positionsAt`/`BasisComponent` for the fourier arm and keep its own polynomial
evaluators + its `BasisDecomposition`/`EpicycleData` types, which structurally reference the same
`BasisComponent` shape). RECORD ONE of:

- **(a) PROMOTE the math leaf the sibling imports (the root fix — preferred if the friction is low).**
  glass-ui already EXPORTS `evalFourier`/`positionsAt`/`comp`/`BasisComponent` via the `/fourier-field`
  subpath (`index.ts:2-9`) — so NO new subpath is needed for the promotion; the sibling can
  `import { fourierPositionsAt as positionsAt, evaluateFourier as evalFourier } from "@mkbabb/glass-ui/fourier-field"`
  TODAY (the dependency `^3.1.0` already resolves it). BUT `/fourier-field` drags the `FourierField.vue`
  component + the elliptic-spectrum generators into the sibling's bundle for a math-only consumer — the
  substrate-isolation concern. So the promotion shape, if chosen, is to mint a **`/fourier-math`** flat
  subpath (a `src/subpaths/fourier-math.ts` → `export * from "../components/custom/fourier-field/math"`
  mirror — the AV.W5.A trivial-mirror pattern; the `math.ts` leaf is already Vue-free + DOM-free by
  construction, `math.ts:1-7`) so the sibling imports the pure math without the component. The sibling's
  fourier arm in `evaluators.ts`/`bases.ts` is then DELETED and re-pointed; the polynomial arm stays. THIS
  closes the duplication at the root. **Note:** the cross-repo MATH-LEAF promotion (minting `/fourier-math`
  + the sibling re-point) is itself a `W-FF2`/`L`-arm edit-site, NOT this wave's — this wave RECORDS the
  shape + decides; W-FF2 mints the subpath glass-ui-side if (a) fires, and the sibling re-point is a
  fourier-analysis-repo edit booked to its own tranche.

- **(b) BOOK with a CONCRETE dependency-bump trigger (the disciplined keep-book — if the promotion
  friction outweighs the duplication cost).** The sibling carries an INDEPENDENT verbatim port today; at
  2 repos this is tolerable PER the ≥2-consumer bar ONLY if the duplication is recorded with an exact
  trigger (NOT "keep-book" alone, which `H-fourier.md §3` flags as stale-hand-wave). The trigger:
  **"when fourier-analysis next bumps `@mkbabb/glass-ui` past its `^3.1.0` pin, replace its
  `lib/evaluators.ts` `evaluateFourier` + `lib/bases.ts` `fourierPositionsAt` bodies with
  `import { evalFourier, positionsAt } from '@mkbabb/glass-ui/fourier-math'` (minting the subpath
  glass-ui-side at that point), keeping its polynomial `evaluateChebyshev`/`evaluateLegendre` +
  `evaluateBasis` dispatch + its `BasisComponent` type local."** This is a NAMED successor with an exact
  edit-site + an exact firing condition, not a deferral.

**THE WAVE PICKS ONE and records WHY** (the live dependency + the bounding polynomial-arm/`BasisComponent`-
sharing nuance are the deciding evidence). The recommended disposition, grounded in the headline
("consumers compose abstracted glass-ui with NO bespoke copies") + the live `^3.1.0` dependency: **(a)
PROMOTE — mint `/fourier-math` glass-ui-side at W-FF2, book the sibling re-point to fourier-analysis's
own tranche with the trigger above as its acceptance bar.** The promotion is the root fix the AY headline
demands; the book-fallback (b) is the named successor if W-FF2's `/fourier-math` mint reveals a
type-incompatibility the structural-identity check missed.

### 3. PIN ONE unambiguous resting-paint alpha target (resolve the 0.55-vs-0.35 hedge)

Resolve the `W43-fourier-field-SOTA.md §2.2` two-reading hedge to ONE defined number per field, measured
at `intensity = 1` (the resting paint, NO ride). The PINNED bundle (the §2.2 table values are the
anchors; the pin DECIDES the disputed `headGlowAlpha`/`peakAlpha`/trail-head relationship):

| Field | hero | final | The pin (what the gate measures) |
|-------|------|-------|----------------------------------|
| `peakAlpha` (comet-trail head segment, `intensity=1`) | **0.55** | **0.45** | the youngest trail segment paints at `peakAlpha·1.0` |
| `headGlowAlpha` (head-glow layer — the STRONGEST) | **0.62** | **0.50** | `headGlowAlpha > peakAlpha` by construction (head-forward) |
| `headGlowBlur` (px) | **16** | **14** | shadow-blur bloom radius |
| `epicycleRatios.{circle, arm}` (÷ peak, hero only) | `{0.18, 0.30}` | `{0, 0}` | scaffolding BELOW the outline |
| `trailFadeExp` (soft, not quadratic) | **1.4** | **1.5** | `pow(age, trailFadeExp)`, NOT `age*age` |
| `trailFloor` (÷ peak — body survives) | **0.10** | **0.08** | `max(a, peak·trailFloor)` |

**The pin (binding for W-FF2's `proof:fourier-field-visibility-live`):** the hero head-glow paints at
**0.62** (the strongest layer), the hero comet head at **0.55**, both at `intensity = 1`. The "trail
head ≈0.35" reading from §2.2 is RETIRED as the circular post-intensity-ride value — it is NOT the
resting target and W-FF2's gate does NOT measure it. The visibility floor the gate asserts:
**hero head-glow peak readback ≥ 0.45** (a band below the 0.62 paint target to absorb canvas
anti-aliasing + sampling + the `lighter`-blend accumulation, while sitting far ABOVE the 0.24 build's
whisper — the 0.24-ceiling render reads BELOW this floor, the born-RED witness). hero vs final must be
MEASURABLY distinct (a per-variant coverage/peak delta ≥ a stated minimum the gate names). This pin is
the ONE number `proof:fourier-field-visibility-live` reads — no "record both."

### 4. Restore the three-substrate hero parity (record the StoryHero thread for W-FF2)

`H-fourier.md §4` (verified): `StoryHero.vue:112` threads `:opacity-ceiling="opacityCeiling"` into
`<Aurora>`; `:116-123` `<Constellation>` carries its own tuned alpha; but `:124-132` `<FourierField>`
gets NO loudness knob (`variant="hero" color=… :color-resolver=… seed=…` — no `:intensity`). The
`opacityCeiling` computed (`StoryHero.vue:64-70`, hero 0.6 / page 0.4 or a declared `intensity`) is the
parity seam the fourier hero is missing. The rebase RECORDS the W-FF2 edit: once the `intensity?: number`
prop lands on `FourierField`, `StoryHero.vue:124` threads `:intensity="opacityCeiling"` so the fourier
hero RECEDES at parity with the aurora hero (P7/Q9 — the hero card stays legible over the recessed
field). This is a W-FF2 edit-site; this wave records it as a hard-gate clause of the impl wave.

---

## Edit-sites (exact)

This wave writes the rebased material into the impl wave it un-blocks + a decision record. It does NOT
write `FourierField.vue` (that is `AY.W-FF2`).

| # | file | edit |
|---|---|---|
| 1 | `docs/tranches/AY/waves/AY.W-FF2.md` | **AUTHOR / POPULATE** — the impl wave spec, carrying the rebased AX.W43 intensity-model scope (the per-variant bundle + the `intensity` prop), the EXECUTED SOTA render recipe (3-pass phosphor-comet + the dark/light `lighter`/`source-over` fork + R1 sort + zero-alloc hoist), the PINNED §3 alpha bundle as the visibility-gate target, the citizenship set (README + api seat + mount-smoke + the two `proof:*` gates), the StoryHero `:intensity` thread (§4), the `evalFourier` dead-export deletion (`H-overfitting.md` Finding 2), and the cross-repo math-leaf disposition the §2 decision selects. The exact `FourierField.vue` edit-sites (`:103` DELETE `OUTLINE_PEAK_ALPHA`, `:237/:242/:282/:294` re-point, `:59-99` `VariantPreset` extend, `:212-222` hoist) are enumerated for the implementer. |
| 2 | `docs/tranches/AY/audit/W-FF1-fourier-rebase.md` | **NEW** — the decision record: (a) the five born-RED witnesses re-confirmed at HEAD `fba6262` with the exact grep counts (the table above); (b) the AX→AY dependency-graph rebase (W07/W14 dissolved by the Canvas2D verdict, W00/W18/W37 landed); (c) the PINNED resting-paint alpha bundle (§3) + the retired 0.35 reading rationale; (d) the cross-repo math-leaf DECISION (promote `/fourier-math` OR book-with-trigger), the live `^3.1.0` dependency + the byte-equivalence + the polynomial-arm/`BasisComponent`-sharing nuance as the deciding evidence, and the named successor on the book-branch. |
| 3 | `docs/tranches/AY/AY.md:151` | reconcile the W-FF1 row's hard-gate text to point at the committed `W-FF1-fourier-rebase.md` decision record + the populated `AY.W-FF2.md` (the row already names the rebase + the math-leaf decision; this binds it to the artefacts). |

**Out of scope (named, so the wave does not drift):**
- **NO `FourierField.vue` edit** — the `OUTLINE_PEAK_ALPHA` deletion, the `VariantPreset` extension, the
  3-pass render, the `intensity` prop, the zero-alloc hoist are ALL `AY.W-FF2` edit-sites; this wave
  writes the TARGET + the recipe pointer, not the code.
- **NO `/fourier-math` subpath mint** — IF the §2 decision fires branch (a), the `src/subpaths/fourier-math.ts`
  + the `package.json` `./fourier-math` export are `AY.W-FF2` edit-sites (the substrate landed WITH its
  W-FF2 consumer wiring); this wave RECORDS the shape, does not mint it.
- **NO fourier-analysis-repo edit** — the sibling's `evaluators.ts`/`bases.ts` re-point (branch a) or the
  dependency-bump trigger (branch b) is a fourier-analysis-repo edit booked to ITS own tranche (glass-ui
  writes no sibling source — the hardened cross-repo clause); this wave records the booked successor.
- **NO third research doc** — the path forward exists twice (the AX.W43 spec + `W43-fourier-field-SOTA.md`);
  this wave REBASES, it does not re-research (the chronic-miss the gate forbids, `H-fourier.md §8`).
- **NO StoryHero edit** — `StoryHero.vue:124`'s `:intensity` thread is a `AY.W-FF2` edit-site (it needs
  the prop to exist first); this wave records it as a W-FF2 gate clause.

---

## House-keep guards (no precept drift)

- **No re-research of landed-twice material** (`H-fourier.md §8` chronic-miss): the path forward exists
  in TWO authored docs; this wave REBASES the spec + RECORDS the decision — it produces NO new research
  sweep, NO third path-forward doc. The gate forbids "produced a doc" as the close (the doc exists twice).
- **Root-not-consumer** (`H-overfitting.md` headline + MEMORY): the math-leaf decision DEFAULTS to the
  root fix (promote the leaf the sibling imports) — the consumer's verbatim copy is the divergence AY
  exists to close; the book-fallback carries a CONCRETE trigger + named successor, never an open-ended
  punt.
- **≥2-consumer bar** (the binding test): the `/fourier-math` promotion (branch a) is justified ONLY by
  the live `^3.1.0` sibling consumer + the demo/slides fourier-field consumers — it is NOT a speculative
  subpath. If branch (b) fires, NO subpath is minted (the duplication is booked, not papered over with a
  zero-consumer surface).
- **Greenfield-no-meta** (MEMORY `feedback_greenfield_no_meta`): the rebased `AY.W-FF2.md` carries NO
  "deferred to mid-tranche" / "the I-session lifted" / "born-RED at `cdcf331`" version-history language —
  it is a forward impl spec anchored at the AY HEAD `fba6262`. The decision record MAY cite the AX.W43
  spec + the SOTA research as INPUTS (an audit artefact, not the shipped spec).
- **The pin is ONE number** (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`): the §3 resting-paint alpha is a
  single defined target per field at `intensity=1`; the "record both readings" hedge is RETIRED so
  W-FF2's visibility gate measures a defined number, not an un-falsifiable OR.

---

## HARD GATE (evidence-backed)

The wave closes on a **document-reconciliation + decision-record artefact** (the precept-valid form for a
research-rebase wave per `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` — explicit document reconciliation +
recorded decision; NO `src/` runtime claim, which is W-FF2's gate), verified by ALL FOUR:

1. **The born-RED witnesses are re-confirmed at the AY HEAD** (not taken on the AX spec's word). Evidence:
   `docs/tranches/AY/audit/W-FF1-fourier-rebase.md` records the exact HEAD-`fba6262` grep counts —
   `grep -rn "OUTLINE_PEAK_ALPHA" src/ | wc -l` → 5, `grep -c -i fourier src/api/index.ts` → 1 (prose),
   `ls README.md` → absent, `ls tests/components/custom/fourier-field/` → absent, `ls scripts/*fourier*`
   → absent — re-run and recorded, not copied from the AX spec.

2. **`AY.W-FF2.md` is populated as a CURRENT impl spec** — it carries the rebased intensity-model scope +
   the EXECUTED SOTA render recipe (the 3-pass phosphor-comet + the `lighter`/`source-over` dark/light
   fork + R1 sort + zero-alloc hoist), the exact `FourierField.vue` edit-sites (the `:103`
   `OUTLINE_PEAK_ALPHA` deletion + the `:237/:242/:282/:294` re-points + the `VariantPreset` extension +
   the `:212-222` hoist), the citizenship set (README + api seat + mount-smoke + the two `proof:*`
   gates), the `StoryHero.vue:124` `:intensity` thread, and the `evalFourier` deletion — anchored at the
   AY HEAD with NO retired-AX-dependency (W07/W14) language. Evidence: the file is present and parses; it
   names the two `proof:*` gates W-FF2 authors + the PINNED alpha as the visibility target.

3. **The PINNED resting-paint alpha is ONE number per field, `intensity=1`** — the §3 table is recorded
   in `W-FF1-fourier-rebase.md` with the hero head-glow at **0.62** (strongest), hero comet head at
   **0.55**, the visibility-floor readback bar at **≥ 0.45**, and the "trail head ≈0.35" two-reading hedge
   EXPLICITLY RETIRED with its rationale. Evidence: the record carries the single bundle table + the
   retired-reading note; `grep -n "0.35\|record both" docs/tranches/AY/audit/W-FF1-fourier-rebase.md`
   resolves only the RETIREMENT note (the hedge is struck, not carried forward as a live target).

4. **The cross-repo math-leaf DECISION is RECORDED with its concrete trigger/promotion shape** — the
   record names ONE disposition (promote `/fourier-math` the sibling imports, OR book-with-the-exact-
   dependency-bump-trigger), cites the deciding evidence (the live `fourier-analysis/web/package.json:14`
   `^3.1.0` dependency + the byte-equivalence of `evaluators.ts:9`/`bases.ts:27` to `math.ts:39`/`:64` +
   the polynomial-arm + `BasisComponent`-sharing bounding nuance), states which branch fires, and names
   the successor (the W-FF2 `/fourier-math` mint + the fourier-analysis-repo re-point booked to its own
   tranche on the promote branch; the exact dependency-bump firing condition on the book branch).
   Evidence: the §4 decision section is present and names a branch + a trigger + a successor (NOT
   "keep-book" alone — `H-fourier.md §3` flags that as the stale hand-wave).

**The binding single condition (the close reads this):** `docs/tranches/AY/audit/W-FF1-fourier-rebase.md`
is present carrying the four recorded items (the re-confirmed born-RED witnesses + the AX→AY dependency
rebase + the PINNED single-number resting-paint alpha with the 0.35-hedge retired + the cross-repo
math-leaf decision with a named branch/trigger/successor), AND `AY.W-FF2.md` is populated as a current
impl spec carrying the rebased scope + the EXECUTED SOTA recipe + the exact `FourierField.vue` edit-sites
+ the PINNED alpha as the `proof:fourier-field-visibility-live` target + the `evalFourier` deletion +
the math-leaf disposition — so W-FF2 lands the fix and either mints-and-promotes or books, never
re-researches and never re-litigates the retired AX dependency chain.

---

## Named successor (on miss)

- **If the math-leaf promotion shape (branch a) reveals a type-incompatibility** the structural-identity
  check missed (glass-ui's `BasisComponent` and the sibling's `types.ts:1-6` diverge under W-FF2's actual
  `/fourier-math` mint): the decision record's named fallback FIRES — book-with-the-dependency-bump-
  trigger (branch b), with the incompatibility recorded as the reason the root fix could not land
  cleanly. The fallback is pre-recorded, not a fresh decision.
- **If `AY.W-FF2.md` cannot be populated as a clean current spec** because the EXECUTED SOTA recipe and
  the AX.W43 born-RED scope conflict on a concrete edit-site (e.g. the head-glow-strongest rule vs the
  AX.W43 `OUTLINE_PEAK_ALPHA`-shared-head): the SOTA recipe WINS (it is the executed, source-grounded
  research; the AX.W43 born-RED narrative is the input being rebased, not the authority) — the conflict
  is recorded in the decision record and the SOTA value is the pinned one.
- **If the pinned visibility floor (≥0.45 head-glow readback) proves un-measurable** at W-FF2 (the
  Canvas2D coverage/peak readback cannot resolve a per-layer alpha): that is a W-FF2 gate-design escalation
  (the diagnostic-loop trigger), NOT a W-FF1 miss — this wave PINS the target number; W-FF2 owns making it
  machine-checkable, and if it cannot, the triumvirate re-designs the visibility gate, not the pin.
