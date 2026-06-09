# CH-tabs-motion — adversarial red-team of W05 (spring vocab) + W53 (tabs-unify)

**Lane** CH-tabs-motion · **Mode** red-team / planning only (NO code) · **HEAD** ~89edffc (3.8.0 published) ·
**Targets** AX.W05 (one iOS-spring vocabulary) + AX.W53 (tabs-unify → `SegmentedTabs`).
**Verdict** WEAK — the architecture is sound and idiomatic, but the lane ships a **live-falsifiable squish bug**
(underline never squishes), an **undelivered Apple-number AUGMENT** (the research's whole net-add), an
**ungated press track** (W05's own HardGate clause never shipped), and a **god-module spillover** (683 lines)
that the convergence master-plan already names (W26) but the inventory dismissed as "architecturally DONE."
None of the four close on a captured live DELTA — they close on a HandOff checklist + self-gated headless arms.

---

## The bar, applied

The lane brief asks four falsifiable things: (1) are the Apple preset NUMBERS pinned correctly? (2) is the
squish restrained enough? (3) is the 683-line god-module a real spillover? (4) is the motion vocabulary
coherent? The honest answers below — two of the four FIND a real weakness, and the squish question surfaces a
**different, worse** bug than "too strong": the squish does not run at all on one of the three variants.

---

## CHALLENGE 1 — the underline variant NEVER squishes (live-falsifiable; the HandOff check #4 would FAIL)

**The challenge.** The W53 HandOff (`W53-tabs-unified.json` liveArmNotes §4 + the wave doc §HandOff #4) asserts:
*"confirm pill + underline both glide+squish; the underline `::before` reads `scale: var(--stretch) 1`
(X-only width flex)."* This is **false in the shipped source.**

**The source proof.**
- `SegmentedTabs.vue:356` — the indicator `<div ref="indicatorRef">` renders only under `v-if="!isUnderline && !isMulti"`. For `variant="underline"` **no indicator element exists** (the underline indicator is the container `::before` pseudo, `SegmentedTabs.vue:620-632`).
- `useTabIndicator.ts:152-157` — `squishOnTravel(toIdx)` first line: `const el = indicatorRef.value; if (multiSelect.value || !el) { lastIdx = toIdx; return; }`. For underline, `indicatorRef.value === null` → **early return, no `--stretch` write, ever.**
- `useTabIndicator.ts:188` — the only `--stretch` write is `el.style.setProperty("--stretch", …)` on the indicator `<div>`. The underline `::before` (line 631, `scale: var(--stretch) 1`) reads `--stretch` from the **`.segmented-tabs` ROOT cascade**, whose value is the static `--stretch: 1` declared at `SegmentedTabs.vue:441`. Even if the write fired, it writes to the wrong element — the indicator div, not the root the pseudo inherits from.

**Net:** the underline variant's squish CSS is fully wired (`@media (prefers-reduced-motion: no-preference) .segmented-tabs--underline::before { transition: … scale … }`, line 634-640) but the JS driver can never reach it. The underline rule glides (the anchor `inset` interpolation runs) but **stays at `scale: 1 1` for all time** — the elastic squish the user explicitly named for "the tabs/underline" is absent on exactly the panel-nav variant. Two independent confirmations of the same defect: (a) the write-target is gated out for underline, (b) the read-target (root cascade) is not the write-target (indicator div) anyway.

**Why nobody caught it.** `proof:tabs-unified`'s SOURCE arm checks the `--tab-indicator-max-stretch` token presence, the reciprocal-`scale` pairing PRESENCE in CSS, the `useTabIndicator` `--stretch`-writer PRESENCE, and the PRM gate — all PRESENCE checks. None assert the writer actually REACHES the underline pseudo. The π LIVE arm probes only `/navigation/tabs` for `--stretch > 1` mid-travel on the DEFAULT segmented strip; it never selects the underline section. And the binding live chrome-devtools-mcp audit (HandOff #4) **was never captured** — `W53-tabs-unified.json` records the 7-point checklist as the orchestrator HANDOFF, not an executed capture (no paired-π artefact, `gatesRun` lists only self-gated device-free arms + the π arm "befitting-silent on the no-workspace runner"). The cardinal lesson exactly: a green headless proof over an un-run live audit.

**Falsifiable test (for the fix).** Live: select between two far tabs on the `variant="underline"` section; `getComputedStyle(<the ::before owner>).getPropertyValue('--stretch')` stays `1` (today) vs must exceed `1` mid-travel (fixed). Headless gate-able: assert that for the underline branch the `--stretch` write reaches the `::before`'s owning element (write `--stretch` on `containerRef` for the underline/anchor path, not `indicatorRef`).

---

## CHALLENGE 2 — the Apple NUMBERS: perceptually in-band, but the research's whole AUGMENT was DEFERRED

**The challenge.** "Are the Apple preset numbers pinned correctly?" Split answer, both halves source-grounded.

**Half A — the perceptual overshoots are SOUND (the springs are NOT mis-pinned).** Measured peaks from the shipped `tokens.css` `linear()` stops vs Apple's confirmed bands (`R-apple-liquid.md` §2/§5):

| preset | shipped peak | shipped (response, ζ) | Apple band | verdict |
|---|---|---|---|---|
| smooth | **+0.50%** (`1.00502`) | (0.5, 0.86) | bounce 0 → ~0% | overshoots where Apple is strictly 0 — minor |
| snappy | **+6.80%** (`1.06804`) | (0.35, 0.65) | ~+4–7% | **in band ✓** |
| bouncy | **+20.48%** (`1.20482`) | (0.5, 0.45) | ~+15–20% | marginally over (≈+0.5pt) |
| dock | **+4.50%** (`1.04501`) | (0.32, 0.7) | snappy↔interactiveSpring | **in band ✓** |
| gentle | **0%** (`1.00000`) | (0.7, 1.0) | bounce 0 | **✓** |

So the lane brief's implied worry ("are they pinned wrong?") is largely NEGATIVE — the *perceptual result* lands in Apple's bands. The control register the tabs glide on (`--spring-snappy`, +6.8%) is correctly inside Apple's snappy band. This is the SOUND half and should be stated plainly so the hardening doesn't "fix" a non-bug.

**Half B — but the research's named AUGMENT is the unfinished net-add, and it is the lane's whole SOTA contribution.** `R-apple-liquid.md` §2 + §5 + the DEDUP table row state the W05 AUGMENT precisely: *"pin the regen PRESETS to the confirmed Apple defaults — `smooth=(0.5s, bounce 0)`, `snappy=(0.5s, bounce 0.15)`, `bouncy=(0.5s, bounce 0.3)` — so the registers MAP to named Apple presets, not hand-tuned ζ that drifts."* W05's own §SOTA-deepening point 1 (`AX.W05.md:225-232`) and FileBounds (`AX.W05.md:304`) scope the `(perceptualDuration, bounce)` authoring-surface adoption. **It did not ship:** `regen-spring-tokens.mjs:54-81` still authors on the LEGACY `(response, dampingFraction)` surface (`smooth response=0.5 ζ=0.86`, `snappy response=0.35 ζ=0.65`, `bouncy response=0.5 ζ=0.45`, …). The FileBounds row was downgraded in practice to only "Extend the PRESETS `comment` strings" (`AX.W05.md:304` final form) — the authoring-surface re-expression the §SOTA-deepening mandated was dropped.

The concrete drifts the AUGMENT would have surfaced and the comment-only close masks:
- **snappy is authored at ζ=0.65 → formula-bounce ≈0.35**, more than double Apple's bounce 0.15. The *measured* +6.8% happens to land in-band because response=0.35 is short, but the AUTHORING numbers do not say "snappy" in Apple's vocabulary — a future retune editing the (response, ζ) pair has no Apple anchor to hold to. This is exactly the "hand-tuned ζ that drifts" the research names.
- **smooth at ζ=0.86 overshoots +0.5%** where Apple `smooth` is bounce-0 / critically damped (no overshoot). A "smooth" register that rings, however faintly, is mis-named against the Apple default the research says to pin.
- **bouncy formula-bounce ≈0.55 EXCEEDS the bounce≤0.4 "reads too exaggerated" ceiling** the research itself names (`R-apple-liquid.md:46`, `R-tabs-segmented.md:199`). The measured +20.5% is close to Apple's 0.3-bounce band, but the authoring ζ=0.45 is well past the stated ceiling.

**Verdict on the numbers:** the springs are *perceptually* sound (do not re-derive them blindly) but the lane's headline SOTA AUGMENT — re-author onto `(duration, bounce)` and pin to Apple's named literals — is **chronically deferred** (named in R-apple-liquid, scoped in W05, recorded NOT DONE in the W-tabs-motion inventory [D-3], still NOT DONE at HEAD). The RATIFY the inventory raises (adopt exact Apple ζ vs re-express hand-tuned ζ on the dial) is unmade.

---

## CHALLENGE 3 — the press track is DOUBLY UNGATED (W05's own HardGate clause never shipped)

**The challenge.** W05 §HardGate + FileBounds (`AX.W05.md:305`, `:408-415`, `:484-485`) mandate a NEW
**PRESS-KEYFRAME-SHAPE** assertion arm on `proof-animation-coherence.mjs`: *"parse `animatePress` — FAIL CLOSED
if any press keyframe is `>1` OR the press easing reads `--spring-bouncy` OR `duration` is a numeric literal."*
This is the gate that would lock the D3 fix (the BouncyToggle double-spring) against regression.

**The source proof it never shipped.**
- `proof-animation-coherence.mjs:98-110` — the surface set is `SURFACE_CSS` (dock.css, dock-controls.css, utilities.css) + `SURFACE_SFC` = **exactly `["Aurora.vue", "GooBlob.vue"]`**. `SegmentedTabs.vue` is **not in the surface set at all** — the press-fork detector never reads it.
- `proof-animation-coherence.mjs:170` — `PRESS_LITERAL_RE = /\bscale\s*:\s*(0?\.\d+)\b|\bscale\s*\(\s*(0?\.\d+)\b/g` matches **CSS `scale:` declarations**, not WAAPI keyframe arrays. The actual press track is a JS WAAPI call (`SegmentedTabs.vue:230-237` `btn.animate([{transform:"scale(1)"},{transform:\`scale(${press})\`,offset:0.4},{transform:"scale(1)"}], {duration:220, easing})`). No arm of the gate parses a `btn.animate(...)` keyframe array, the press easing token, or the `duration` literal.

**Net:** the D3 fix (the marquee defect the user called "the egregious/abrupt one") is source-CORRECT in `SegmentedTabs.vue` but **caught by NEITHER gate** — `proof:tabs-unified` gates only the GLIDE register + the squish PRESENCE + ARIA + deletion-proof (never the `animatePress` track), and W05's keyframe-shape arm was never authored. A regression that re-bakes a `>1` press keyframe or re-points the press to `--spring-bouncy` ships GREEN. The inventory ([D-1]) already flags this; it remains open. This is W05's one HardGate clause that did not ship — a self-declared deferral that the "complete" mark papers over.

**Sub-finding — `duration: 220` is a hardcoded literal (`SegmentedTabs.vue:236`).** W05 [MS] sub-step 10 + D3 §3 (`AX.W05.md:206-209`) mandate resolving the press duration from `--duration-normal` (0.3s/300ms) via the same `readToken` the file already uses for `--scale-press-btn`. The shipped value is the literal `220` (bumped from 200, still un-tokenized, ≠ the 300ms target). Minor in isolation, but it is the exact divergence gate-arm (c) would have bitten — and it is the visible evidence the gate is absent.

---

## CHALLENGE 4 — the 683-line god-module spillover is REAL (the inventory's "architecturally DONE" is too generous)

**The challenge.** The W-tabs-motion inventory PATH FORWARD declares: *"The tabs surface (W53) is architecturally DONE and idiomatic … No re-architecture is warranted; the W53 work is sound."* The master-plan's Batch 8 (`MASTER-PLAN.md:37`) **explicitly names** "the SegmentedTabs 683-line spillover" as a W26 target. These two are in tension, and the inventory understates it.

**The source proof.** `SegmentedTabs.vue` is **683 lines** (`wc -l` confirmed). `proof:no-god-module`'s 500-line ceiling (the W12/W26 gate, per PROGRESS.md:127-129 the 3-file carry: useMetaballRenderer 690, constellationField 510, GlassDock 505) is exceeded by 183 lines. The DO-NOT-SPLIT header (`SegmentedTabs.vue:1-7`) argues the toggle markup + anchor/JS indicator fallback + scoped track choreography are "one tightly-coupled spring-slider concern" — but that argument was inherited verbatim from the deleted `BouncyToggle.vue` (AW.W15 assay), and W53 then ADDED the variant axis (3 chromes × scoped CSS, lines 575-682), the responsive collapse (lines 159-196, 311-333), the multi-select indicators (366-373), and the squish wiring — none of which existed when the DO-NOT-SPLIT was first argued. The 683 is mostly the **scoped `<style>` block (262 lines, 422-683)** carrying three variant chromes + overflow + responsive media queries, which is a legitimate CSS-carve candidate (the W25b monolith-carve register) WITHOUT severing the anchor/measure seam the DO-NOT-SPLIT protects (that seam is the `<script>`, not the `<style>`).

**Net:** the inventory's "no re-architecture warranted" is true for the JS seam (don't split the script) but FALSE for the wave-budget gate — the file is a `proof:no-god-module` violator the master-plan already routes to W26/W25b, and the DO-NOT-SPLIT rationale is stale (it predates the variant/responsive/multi-select additions). The honest disposition: the `<style>` block carves to a sibling `SegmentedTabs.css` (or the three variants split into per-variant style partials) without touching the protected `<script>` seam, dropping the file under 500.

---

## CHRONIC deferrals (the slip history)

| item | first named | re-named | status at HEAD | slip count |
|---|---|---|---|---|
| **W05 PRESS-KEYFRAME-SHAPE gate arm** ([D-1]) | W05 §HardGate (AX.W05.md:305) — W05 first close | convergence D3 re-open [MS]; W-tabs-motion inventory [D-1] | NOT DONE — gate never authored; press doubly-ungated | **2+** (W05 close → D3 re-open → inventory → HEAD) |
| **`(perceptualDuration, bounce)` Apple-pin** ([D-3]) | W05 §SOTA-deepening pt1 (AX.W05.md:225) | R-apple-liquid §2 AUGMENT; inventory [D-3] | NOT DONE — regen still on legacy (response, ζ); RATIFY unmade | **2+** |
| **press `duration` token-resolve** ([D-2]) | W05 [MS] sub-step10 + D3 §3 | inventory [D-2] / W53 gap #1 | NOT DONE — `duration: 220` literal at SegmentedTabs.vue:236 | **2+** |
| **W53 live-verify paired-π capture** (gap #2) | AX.W00 cardinal precept | W53 HandOff; inventory W53 gap #2 | NOT CAPTURED — HandOff checklist only; "live-verified (DEVELOPED)" mark in PROGRESS.md:76 has no DELTA artefact; tabs NOT on the CONVERGENCE-PLAN-2 §47-50 re-verify list | **1** (and the underline-squish bug below is what an actual capture would have caught) |
| **W05 ledger doc-staleness** | convergence D3 | inventory GAPS §1 | NOT FLIPPED — AX.W05.md still spec's the press fix against the DELETED `BouncyToggle.vue:125-155`; W05 audit-json `liveArmNotes` still carries the pre-D3 *"BouncyToggle still bounces (PLAYFUL — overshoot survives the map)"* note (the exact string D3 was opened to INVERT) | **1** |
| **SegmentedTabs 683-line god-module** | W12 carry (PROGRESS.md:127) generalised | master-plan Batch 8 W26 (MASTER-PLAN.md:37) | NOT CARVED — file at 683, gate-violating; inventory calls it "DONE" | **1** (and growing — W53 ADDED to it) |

The recurring class: **W05's own HardGate + SOTA-deepening half was deferred at its first close, re-opened as D3, re-catalogued by the inventory, and is STILL open at HEAD** — three passes, no landing. The behaviour (the press fix, the spring overshoots) is correct; the *gate + generator + ledger* tail is the chronic miss. This is the "headless-green-over-an-unfinished-spec" recurrence in miniature.

---

## Coherence verdict (the lane brief's "is the motion vocabulary coherent?")

**Mostly coherent, with two seams.**
- COHERENT: one `--spring-*` register family, the bezier `--ease-apple-spring` cleanly excised (0 survivors in src), the tabs glide + press both on `--spring-snappy` (CONTROL), the squish capped LOW at `1.08`, the §6 easing-doctrine (surface→bezier, transform→spring) is recorded and the buttons obey it. The W53 unification (5 artefacts → 1 component) is genuinely the right architecture.
- INCOHERENT seam 1 — **the squish is claimed across all three variants but reaches only segmented/pill** (Challenge 1). "One indicator grammar" is the stated goal; the underline indicator silently opts out.
- INCOHERENT seam 2 — **the press track lives outside the governance the rest of the vocabulary enjoys** (Challenge 3): every CSS press surface resolves from `--scale-press*` and is gated; the WAAPI `animatePress` resolves from `--scale-press-btn` correctly BUT its register/duration/topology are ungoverned (un-gated, literal duration). The vocabulary is coherent in CSS and incoherent at the one JS WAAPI press site.

---

## HARDENING actions (to PERFECT this — planning only)

1. **FIX the underline squish (Challenge 1) — the one real code bug.** Route `squishOnTravel`'s `--stretch` write to the element the active indicator actually reads from per-variant: segmented/pill → the indicator `<div>` (as today); underline → `containerRef` (the `::before`'s owning element). Drop the `!el` early-return for the underline branch; guard on `containerRef` instead. Add a born-RED gate arm to `proof:tabs-unified`: assert the underline branch's `--stretch` write target equals the `::before` owner. Live-verify all three variants' `--stretch > 1` mid-travel and CAPTURE the paired-π DELTA (this is the missing W53 close artefact).

2. **Land W05's spec'd PRESS-KEYFRAME-SHAPE gate arm + the duration token-resolve as ONE born-RED commit ([D-1]+[D-2]).** Add `SegmentedTabs.vue` to `proof-animation-coherence.mjs`'s SFC surface set; author a WAAPI-aware `detectPressKeyframeShape` that parses the `btn.animate([...], {...})` array (FAIL on a `>1` transform keyframe, on `--spring-bouncy` press easing, on a numeric-literal `duration`). The gate is born-RED on the current `duration: 220` literal; GREEN once `SegmentedTabs.vue:236` reads `readToken("--duration-normal","0.3s")` parsed to ms. One commit, self-bite-tested.

3. **Decide the Apple-pin RATIFY, then land [D-3] as one generator refactor — do NOT re-derive blindly.** The measured overshoots are in-band; the AUGMENT is an authoring-surface re-expression. Re-author `regen-spring-tokens.mjs` onto the `(perceptualDuration, bounce)` dial with the closed-form map (`bounce=1−ζ`, `stiffness=(2π/d)²`, `damping=(1−bounce)·4π/d`); RATIFY whether to (a) keep the hand-tuned ζ and merely re-EXPRESS (byte-stable `linear()`, cosmetic) or (b) re-derive `smooth→bounce 0` (kill the +0.5% overshoot) + `snappy→bounce 0.15` + `bouncy→bounce 0.3` to the exact Apple literals (a visual change requiring a π live-verify on every `--spring-*` consumer). Recommend (a) for the registers that are in-band, (b) ONLY for `smooth` (a register named "smooth" should not ring). Keep the set at 5 (the F5 census justified it; Apple ships 3 — note the divergence is deliberate, not drift).

4. **Carve the 683-line `<style>` block ([Challenge 4], W25b/W26 fold).** Split `SegmentedTabs.vue`'s scoped `<style>` (lines 422-683, the three variant chromes + overflow + responsive media) into a sibling `SegmentedTabs.css` (or per-variant partials) imported by the SFC — WITHOUT touching the `<script>` anchor/measure seam the DO-NOT-SPLIT protects. Drops the file under the 500 ceiling, satisfies `proof:no-god-module`, and the DO-NOT-SPLIT rationale stays honest (it guards the script seam, which is untouched). Update the inventory's "architecturally DONE" to "JS-seam done, CSS-carve owed to W25b."

5. **Flip the stale W05 ledger (doc-currency, P-inv-28).** Refresh `AX.W05.md`'s `BouncyToggle.vue:125-155` references → `SegmentedTabs.vue:220-237`; flip the `W05-one-ios-spring-vocabulary.json` `liveArmNotes` carry from *"BouncyToggle still bounces (PLAYFUL — overshoot survives the map)"* to the actual close criterion (*"press settles smoothly on CONTROL — single governed overshoot, no double-spring"*). The fix is real; the ledger lies. The W33 close will otherwise flag it.

---

## What is SOUND (so the hardening does not over-reach)

The W53 architecture is correct and should NOT be re-designed: ONE component, one `variant` axis, ARIA-role-per-variant (load-bearing, correct), clean break with no alias, the `BouncyToggle/BouncyTabs/UnderlineTabs/ResponsiveTabs` 4-artefact collapse is genuine simplification, the reka `ui/tabs` panel primitive correctly stays separate, the squish cap (`1.08`) is correctly restrained per the Apple/Comeau/Material restraint doctrine, and the spring overshoots are perceptually in-band. The bezier excise (W05 F4) is complete (0 survivors). The findings above are a real bug (underline squish), a deferred AUGMENT (Apple-pin), an ungated track (press), a budget-gate violation (683 lines), and a stale ledger — NOT an architectural failure.
