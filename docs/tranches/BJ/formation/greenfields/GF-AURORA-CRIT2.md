# GF-AURORA — CRITIQUE 2 (fresh Fable critic over GF-AURORA-PASS1)

Mode: TRANCHE-DEVELOPMENT. No source touched, no browser. Every claim below is file:line at
HEAD (`codex/bi-p-q-execution`). Default assumption: the spec is wrong until the disk agrees.
The one load-bearing test the prompt set — *does the route HONESTLY cost the WGSL stroke-body
port, or hand-wave it (the elegant-reduction trap)?* — is answered first, because it moves the
score.

---

## 0. Verdict on the central test (the WGSL 3/5/6/7→Kuwahara collapse)

**The collapse fact is REAL and correctly located.** `applyMedium` (`aurora-mediums.wgsl.ts:387`)
routes `medium == 3 || 5 || 6 || 7` to `mediumKuwahara` at line 400 (the branch condition is at
:398; the doc's ":399-400" points at the right region, off by one line on the `if`). oil/vangogh/
oil-pastel/kuwahara render byte-identically on the WebGPU primary. `useAurora.ts:24-27` confirms
WebGPU-first. P2a stands. round-2/round-2b stand.

**But the route does NOT honestly cost the port — it relocates the elegant-reduction trap rather
than avoiding it.** The doc names the expensive arm (oil's bristle cascade) and quarantines it
honestly as a perf-gated either/or (W4). Good. Then it declares the OTHER arm — van-Gogh, the
"cheap pilot" that anchors W1 and the entire cost-stratification thesis — **"derivative-free →
1:1 WGSL port, no `fwidth`/`dFdx`, CHEAP"** (§2:99, §2:68-72, W1 row :221). That claim is FALSE
for the artifact W1 actually ports. See Finding 1. The trap didn't get avoided; it got moved from
oil (where the doc confesses it) to van-Gogh (where the doc denies it).

So: honest for oil, self-deceived for van-Gogh. The cheap-pilot premise is cracked, and it is the
premise the wave ordering and the "cost-stratified, not monolithic" headline rest on.

---

## 1. On-disk verification ledger

| doc claim | evidence | verdict |
|---|---|---|
| WGSL collapses 3/5/6/7→Kuwahara | `aurora-mediums.wgsl.ts:398-400` | **TRUE** |
| WebGPU is the preferred backend | `useAurora.ts:24-27` | **TRUE** |
| oil-pastel = `profileFor(MEDIUM_OILPASTEL)` skin of oil | `mediums.glsl.ts:493-496` vs `:376-382`; `oil-modes.glsl.ts:53-91` | **TRUE** |
| `vangoghDab` primitive is derivative-free | `vangogh-medium.glsl.ts:39,83-87` (smoothstep AA, no fwidth) | **TRUE of the DAB** |
| van-Gogh medium is derivative-free / 1:1 / cheapest | `mediumVangogh` calls `relightImpasto` at `vangogh:226`; `relightImpasto` uses `dFdx/dFdy` at `brush.glsl:273` | **FALSE of the MEDIUM** (Finding 1) |
| the WGSL foundation is "ALREADY ported" (§2 SURVIVES :62-67) | `paintOver`/`paintOverOklab`/`relightImpasto`/`vangoghDab`/`paintStrokeLayers`/`bestOil` are absent from every `.wgsl.ts`; zero `dpdx`/`dpdy`/`fwidth` in any WGSL file today | **PARTLY FALSE** (Finding 1) |
| `mediumCrayon` is dual-ported | `aurora-mediums.wgsl.ts:204` (WGSL body exists) | **TRUE** |
| `uniformBridge.ts:76-79` comment is stale/wrong | comment says "smooth core for every painterly id (1-7)"; disk renders real bodies for 1/2/4 and Kuwahara for 3/5/6/7 (`:388-402`) | **TRUE** — and it also mis-claims kuwahara(7) "degrades to smooth core" when 7 renders `mediumKuwahara` |
| preset cluster line-spans (oil-pastel trio, sun trio, SPEEDTEST) | `presets.ts:320/360/462` (oil-pastel), `:591/624/656` (sun trio), `:406` (SPEEDTEST) | **TRUE** (small drift from cited numbers, all resolve) |
| A13 = "REAL van-Gogh/oil-pastel/crayon modes or nothing" | `REGISTRY.md:144-146` | **TRUE** (charter faithful) |
| V-A95 rides this band, ACTIVE RED, carried | `REGISTRY.md:146`; `CHRONIC-ADJUDICATION.md:55-56` | **TRUE** |

Net: the diagnosis (§1-§2 problem statement) is almost entirely correct on disk. The *cost model*
(§2 THE PORT COST, §4.2, W1) is where a load-bearing fact is mis-drawn.

---

## 2. Findings (ranked)

### F1 — [load-bearing] The "cheap derivative-free van-Gogh pilot" is mis-costed; W1 silently drags in the first WGSL derivative use

The doc's cost-stratification (§2:98-109) partitions the port into "van-Gogh cheap (derivative-free
1:1)" vs "oil expensive (fwidth/dFdx cascade)". W1 (`:221`) ports **`vangoghDab`/`mediumVangogh`**
and calls it "the cheap pilot."

The dab primitive is derivative-free (`vangogh:83-87`). The **medium is not**. `mediumVangogh`
(`vangogh-medium.glsl.ts:116-256`) composes three `paintOver` calls (`:165,174,189`) and one
`relightImpasto` (`:226`). `relightImpasto` (`brush.glsl.ts:269-292`) is built on
`dFdx(h)`/`dFdy(h)` at `:273` — the height-gradient normal that makes each dab read as a *raised
loaded mark* (`vangogh:223-224`). The doc even lists `relightImpasto:269-292 with dFdx/dFdy:273`
in its OWN oil-cascade cost line (`§2:104`) — it knows the function uses derivatives; it just fails
to notice that van-Gogh calls the same function.

Consequences the spec does not reckon with:
1. **The "derivative-free 1:1" framing is false for W1's target.** Van-Gogh's WGSL port must port
   `paintOver` + `paintOverOklab` + `relightImpasto` — none of which exist in any `.wgsl.ts`
   (confirmed: absent; the WGSL pipeline uses `dpdx`/`dpdy`/`fwidth` **zero** times today). This is
   the FIRST screen-space-derivative use introduced to the WGSL fragment module, unproven on
   Safari 26/WebKit — exactly the kind of unknown a "cheap pilot" is supposed to not have.
2. **The dependency graph is mis-attributed.** §2 SURVIVES (`:62-67`) claims the shared substrate is
   "ALREADY ported" and lists the ported foundation, but `paintOver`/`relightImpasto` are NOT in
   that list and NOT on disk in WGSL. The relight cost the doc charges entirely to the oil arm (W4)
   is in fact a *shared* substrate cost that W1 pays first.
3. **A forced fork the doc never states:** either W1 ports `relightImpasto` (first WGSL derivative
   use, the exact perf/uniformity unknown that motivated the collapse — see F4), OR it drops the
   impasto crown and van-Gogh's dabs stop reading as raised marks, which fails π-VANGOGH-PRIMARY and
   G-PARITY-BODY(vangogh) against the WebGL2 twin. The "cheap" story requires a fork it doesn't own.

This does not kill β — WGSL supports derivatives in the fragment stage (`applyMedium` is
concatenated into `aurora.wgsl.ts` which is `@fragment` at `:348`). It kills the *cheap-pilot
premise* and the "cost is neatly stratified" reassurance. W1 must be re-costed as "port the shared
paint substrate (paintOver + relightImpasto, first WGSL derivative use) + the dab," not "port a
derivative-free dab."

### F2 — [major] The W4 relabel arm, as worded, IS the masking fallback it claims to kill

The no-masking-fallback law (memory: `feedback_no_masking_fallback`) — *primary works in paint or
fails loud; no fallback that hides a dead primary* — is β's stated core (§6:317-320). But W4's ELSE
branch (§3:157-158) reads: "relabel oil-on-primary as the anisotropic-Kuwahara painterly finish …
demote oil toward a preset of kuwahara — the WGSL collapse SHRINKS from {3,5,6,7} to **at most
{3,7}**."

`{3,7}` means `medium == 3` STILL routes to `mediumKuwahara` in `applyMedium`. A user selecting
`medium:"oil"` (still listed in `mediumOptions`, `options.ts`) still gets a Kuwahara operator on
the primary. A code-comment "relabel" does not cure a user-facing lie — that is precisely a mode
silently becoming a different operator, i.e. the masking fallback the law forbids and that β's whole
thesis is built to kill. §6:317-320 tries to pre-empt this ("honestly relabeled … never a masked
skin"), but a relabel that leaves the enum selectable and the render swapped is still masked.

The law admits exactly two compliant W4 outcomes: (a) port the cascade (medium 3 renders its real
body), or (b) **KILL the mode** — delete enum 3 from the selectable mediums and re-express oil
presets as `kuwahara` + palette. The honest terminal set is `{7}`, never `{3,7}`. The doc must
choose one and delete the `{3,7}` wording; leaving both is an internal contradiction with its own
cardinal law.

### F3 — [major] β overrides round-2b's oil-pastel disposition and cites round-2b as if it endorsed the override

The doc recruits round-2b for β: "the round-2b verdict names oil-pastel as the exact skin to
replace" (§3:160). round-2b finding 3's **proposed remedy** is the opposite disposition:
"oil-pastel is the strongest merge candidate into **oil-as-a-mode** (an 'oil-pastel' strokeMode),
since it already shares the entire cascade" (round-2b-confirm/f08…-s.md, finding 3 Proposed). That
is a γ-flavored MERGE/DEMOTE, not "author a new dedicated burnish body." round-2 finding 4 says the
same ("treat oil and oil-pastel as one rendering family").

β's decision to author a NEW oil-pastel body (W2) is defensible — it is driven by A13/P2c ("proper
oil-pastel brush mode … real modes or nothing," `REGISTRY:144-145`), which outranks a preset-audit's
merge suggestion. But the doc should OWN that it overrides round-2b on user-order grounds, not
claim round-2b's skin-diagnosis (true) implies round-2b's remedy is β's remedy (false). As written
it launders a γ recommendation into β endorsement. One honest sentence fixes it: "round-2b diagnoses
the skin and recommends *merge*; A13 overrides that toward *author a real body*."

### F4 — [moderate] "1:1 transliteration, fwidth→fwidth" is naive about WGSL uniformity

α's mechanism (§3:128-131) and the oil-cascade note (§2:105) assume `fwidth`→`fwidth`,
`dFdx/dFdy`→`dpdx/dpdy` is a syntactic swap. WGSL is stricter than GLSL here: derivative builtins
must be called in **uniform control flow**; a derivative inside data-dependent branching is a
shader-creation error, not undefined-but-tolerated as in GLSL. `curvedStroke` uses `fwidth` at
`brush.glsl:122,139-140` inside the per-stroke accumulation, and `bestOil` (`brush.glsl:302-384`)
is a best-of-9 with data-dependent selection. A verbatim port may simply fail to compile until the
derivative calls are hoisted or gradients precomputed. This is real porting work the "MECHANICAL
but LARGE" framing (§2:108) understates, and it compounds F1 (van-Gogh's `relightImpasto` is at
least called unconditionally, so it is the safer of the two — but it is still the first test of
this constraint in the pipeline).

### F5 — [moderate] The single-source-dispatch ruling collides with W4's cascade port; boot-diet unaddressed

`CHRONIC-ADJUDICATION.md:34-36` RETIRES the aurora-medium lazy-split: "the single-source medium
dispatch is the shipped identity; perf concerns ride family E's boot-diet." So there is no
lazy-load escape hatch. W4's port arm therefore appends the full ~38KB stroke cascade to the ONE
always-compiled `@fragment` module (`aurora.wgsl.ts`), inflating compile time and shader size on
every aurora mount — including the smooth/atmospheric default that needs none of it. The doc treats
W4's cost as a runtime-perf question (frame time) and never touches the compile-size/boot-diet
tension the family-E ruling flags. W4 should budget shader-module size, not just fps.

### F6 — [minor] KEEP list is 11-12, above the "17→~10" headline

§4.4 KEEP enumerates 11 (`≈11`, honestly stated) and W5 (`:225`) may add a kuwahara exemplar →
12. round-2 landed at 9-10 and marked DELIBERATIVE and DUSK as *optional* keeps; β promotes both to
firm keeps on the "now the bodies are real" rationale — which is sound for VANGOGH/OILPASTEL/CRAYON
(they become genuinely-distinct renders) but does NOT apply to DELIBERATIVE (pastel, already real)
or DUSK (smooth, a palette note). The headline "17→~10" and the roster "≈11-12" should be
reconciled; the doc is honest about the count, so this is presentation, not deception.

### F7 — [minor, in β's favor] The oil-pastel BURNISH body may re-introduce derivatives

§4.2/§4.4 specify the new oil-pastel body as "broad smear + **overlap-height-gated burnish specular
sheen** + tooth-skip deposit." An overlap-height-gated sheen is a height-gradient relight — the same
`relightImpasto` family (dFdx/dFdy). The "ports cheap by construction, no derivatives" claim (§2:100)
is not yet guaranteed by the spec's own body design. Not disqualifying (a new body CAN be authored
derivative-free), but the "cheap by construction" assertion is unearned until the sheen model is
pinned to avoid a screen-space gradient.

---

## 3. Route re-scoring

- **α BACKEND-PARITY PORT — BANKED-ALIVE (correct disposition, optimistic mechanism).** The banked
  role (fallback if β's authorship stalls; source of the parity-ΔE gate) is right. Its "1:1
  transliteration" mechanism is under-costed by F4. As the honest floor it holds: any port strictly
  beats the collapse.
- **β DEDICATED-BODY-PER-MODE — LEADING, but the cost model needs surgery, not just a caveat.** The
  decomposition (mode ⊥ palette ⊥ backend, §4.1) is clean, repo-grounded, and the correct reading of
  A13. It stays the leader — γ contradicts P2c, α under-serves "proper." But the cheap/expensive
  stratification that makes β look *tractable* is drawn on a mis-attributed dependency graph (F1),
  its W4 escape arm violates its own cardinal law as worded (F2), and it recruits round-2b against
  round-2b's own remedy (F3). β is the right destination reached by a map with a wrong scale.
- **γ HONEST-TO-PRIMARY REDUCTION — BANKED-ALIVE (correct), and it has more claim on oil-pastel than
  credited.** Its cull is adopted; its cost logic feeds W4. Note F3: round-2b's actual oil-pastel
  remedy (merge/demote) IS γ — so on oil-pastel specifically, γ is not merely banked, it is the
  incumbent recommendation β must argue past, which β should state.

---

## 4. Convergence re-score

Pass-1 claimed **48%**. That number was calibrated against three named gaps (aesthetic unproven,
zero paint, oil-perf unmeasured) plus four carried unknowns — an honest accounting of what the seat
KNEW it hadn't earned. This critique surfaces a class the self-crit MISSED: a load-bearing cost
claim (van-Gogh derivative-free / cheap pilot) that is falsifiable on disk and IS falsified (F1),
plus a self-contradiction with β's cardinal law (F2). A pass-1 self-critique whose §6 explicitly
audits "elegant-reduction / and-then-the-hard-part" (`:311-316`) and still ships "van-Gogh is the
cheap derivative-free pilot" has a blind spot precisely at the prompt's central test.

**Earned convergence post-critique: 40%.** The architecture (§4.1 decomposition, the skins-vs-modes
invariant, the born-RED gate design, the honest oil-arm quarantine) is sound and survives — that is
most of the 40. The deduction from 48 is for: (a) the cracked cheap-pilot premise that the wave
ordering rests on (F1, −5), (b) the masking-fallback self-contradiction in W4 (F2, −2), (c) the
round-2b citation slant (F3, −1). None is fatal; all are pass-3 repairable; none touches the core
thesis that a mode must be a dual-ported dedicated body. The number goes DOWN because the seat's own
gap list did not contain its sharpest gap.

---

## 5. Pass-3 deliverables (what closes the gap, in priority order)

1. **Re-cost W1 against the real dependency closure.** Trace `mediumVangogh`'s full call graph
   (`paintOver`, `paintOverOklab`, `relightImpasto`, and the already-ported `brokenColorJitter`/
   `saturate3`/`vnoise`). Re-state W1 as: port the shared paint substrate `paintOver` +
   `relightImpasto` (the FIRST WGSL derivative use) THEN the dab. Prove `dpdx`/`dpdy` compiles under
   WGSL uniformity in `@fragment` and capture a WebKit paint. Delete "derivative-free / 1:1 / cheap
   pilot" from §2:99, §2:68-72, and W1 — replace with the substrate-first cost. (Closes F1.)
2. **Resolve W4 to a compliant terminal set.** Specify the relabel arm as DELETE enum 3 + re-express
   oil presets as `kuwahara`+palette (terminal `{7}`), never `{3,7}`. Or commit to the port arm.
   Either way, remove the `{3,7}` wording that contradicts the no-masking law. (Closes F2.)
3. **Own the round-2b override in one sentence.** State that round-2b's proposed oil-pastel remedy
   is merge-into-oil (γ), and A13 overrides it toward a real body — do not cite round-2b as β's
   endorsement. (Closes F3.)
4. **Budget WGSL uniformity + module-size for the oil cascade (W4).** Note the derivative-hoisting
   restructure `curvedStroke`/`bestOil` will need; reconcile the always-compiled fragment-module
   growth with the family-E boot-diet ruling (single-source dispatch is fixed, no lazy split).
   (Closes F4, F5.)
5. **Pin the oil-pastel sheen model derivative-free** (or admit it needs `dpdx`/`dpdy` and fold it
   into the substrate cost of #1). (Closes F7.)
6. **Carry the pass-1 gaps that remain honest:** measure the oil bristle-cascade WGSL perf to fire
   the W4 branch; pin ε against a captured cross-backend baseline; capture a paired π on the
   oil-pastel body vs the "awful" extant; put ONE user question on crayon-only vs crayon+ink scope
   (gap 5). Reconcile the KEEP count with the 17→~10 headline (F6).

---

## 6. What holds (so pass-3 does not over-correct)

- The P1/P2a/P2b/P2c/V-A95 diagnosis is correct on disk. Do not re-litigate it.
- β is the right leader. The fix is to the cost model and two wave specs, not the route.
- The born-RED gate suite (§4.5) is well-formed: each names a RED-at-HEAD file:line, G-PARITY-BODY
  is a numeric ΔE, G-NO-SKIN-MODE is a structural function-identity check. Keep it.
- The `uniformBridge.ts:76-79` stale-comment finding is TRUE and sharper than the doc states (it
  also mis-claims kuwahara(7) degrades to smooth core). W4's comment-fix is warranted.
- V-A95 parked as W6 confirm-or-replace is consistent with `REGISTRY:146` / `CHRONIC:55-56` ("GF-
  AURORA carries it; reported plainly as a shipping defect"). No over-reach.
