# Final AW/H harden — the convergence fix-list (6 lanes)

## SYNTHESIS

I now have complete, verified evidence for every contested claim. The decisive findings:

1. **W22 line 39 says the dormant pointer seam is "owned by W23 card work"** — but W23 is `glass-material-sota` (NO card work); the card wave is W24. This is the proximate cause of the W22↔W24 collision.
2. **W22 carves the `glass-specular-track` class string OUT of Card.vue (lines 19, 39)** while W24 (line 21) reads `Card.vue:77` as still carrying it.
3. **W22 promises dock specular/rim inheritance (line 8 gate, line 18 §3.3) but `dock.css` is ABSENT from W22's File Bounds (lines 31-40)** — and `.glass-dock` hand-rolls its own surface + already has `::before`/`::after`.
4. **W22 line 18 hedges on `--glass-edge-light-{wash..overlay}` "if present"** — confirmed phantom (tokens has only `--glass-edge-light`).
5. **W26 line 74 has the off-by-one wave map** (W23=card, W24=geometry, W25=tap-squish) and shares `badge/toggle/Toast` with W25.
6. **W27 lines 17/66/79 gate-attribution off-by-one** (glass-card-tiers→W23, primitive-affordance→W24/W25).
7. **W12 light-dark gate is born-GREEN** (zero matches at HEAD).

I have everything. Producing the synthesis.

---

# AW/H FINAL HARDEN — CONVERGENCE FIX-LIST

The six reviews concur on the headline: the glass-atoms band (W22-W26) is genuinely DRY-consolidation that routes onto the committed component spine (W12/W13/W18/W20) with disjoint file-bounds — **the feared "glass-atoms re-does the component band" duplication does NOT materialize.** H is a pure consumer, clean. But the band carries a real **W22-unify-mechanism failure** that doesn't survive contact with HEAD source, plus a single **digest→file renumber** that leaked stale wave-number maps into three docs. Verified every contested claim against source.

## (1) BLOCKER FIX-LIST — grouped by wave

### W22 (glass-material-unify) — the unify mechanism does not survive HEAD source

**B1 — W22 promises dock specular/rim inheritance it has NO write access to deliver.**
The Hard Gate (W22:8) and §3.3 (W22:18) assert "the dock tier's rim becomes a `.glass-material` inheritance" and mount the dock in the band-uniformity matrix (gate 2/3). This is structurally false: `dock.css:84-90` shows `.glass-dock` does NOT compose any `.glass-*` ladder rung — it hand-rolls `background: var(--glass-bg-dock…)`, `backdrop-filter: var(--dock-surface-blur)`, its own border, `box-shadow: var(--glass-edge-light), var(--shadow-dock)` as a **parallel sixth surface** with its own `--glass-*-dock` token family. For the dock to inherit `.glass-material`, W22 must edit `dock.css` — but `dock.css` is **absent from W22's File Bounds (W22:31-40)**. The gate cannot pass without write access W22 doesn't have. **Fix:** EITHER add `src/styles/dock.css` to W22 File Bounds as `modify-carve` (compose `.glass-material` onto `.glass-dock`, retire its local rim at `dock.css:90`), OR drop the dock from the band matrix (gates 2/3) and acknowledge the dock keeps its parallel surface. Pick one; the spec currently promises both inheritance and no-dock-edit.

**B2 — Folding the specular `::before` onto `.glass-dock` collides with two existing dock pseudo-elements.** (Contingent on B1's option-A.)
If the dock is brought under `.glass-material` (B1 path a), the mixin's specular `::before` collides head-on with `dock.css:352` `.glass-dock.variant-instrument-strip::before` (the engraved-bezel inner stroke) — same pseudo, same element. The triumvirate trigger (W22:28) names a `::after`/content-`::before` collision but misses this live `::before`. DockIconButton avoids it today by carrying the specular on the **button**, not the shell. **Fix:** the spec must decide the dock specular lives on `.dock-icon-button` (the control, as today), NOT `.glass-dock` (the shell). Gate 2's "dock" matrix target must mount `dock-icon-button`, not the dock shell, for the specular assertion. (If B1 path b — drop the dock — this resolves itself.)

**B3 — The Card specular carve directly contradicts W24's Card specular wiring, driven by W22's stale wave-number ref.**
W22:19 + File Bounds (W22:39) + gate 4 retire the `glass-specular-track` class string from `Card.vue:77`. But W24:21 wires the dormant pointer seam *on that exact class*: "the root already carries `glass-specular-track` (`Card.vue:77`)… Add the ≤6-LOC `pointermove` listener," and W24:47 says do-NOT-touch `glass-specular-track.css` because "W24 only adds the consumer-side pointer write." W24 opens after W22 and reads a seam W22 deleted. **The proximate cause:** W22:39 hands the pointer seam to **"W23 card work"** — but W23 is `glass-material-sota` (refract/squircle/tint, NO card work); the card wave is **W24**. **Fix (two coupled edits):** (a) W22:39 — change "owned by W23 card work" → "owned by W24 card work"; (b) W22 must NOT carve the Card `glass-specular-track` string at all — drop `Card.vue` from W22's §3.4 / File Bounds (W22:39) / gate-4 carve set. W22 retires only the Button + DockIconButton opt-ins. The Card class string stays until W24 owns the Card material pass; W24 then adds ONLY the pointer-WRITE seam over the (now ladder-OR-class-supplied) specular. The mixin-on-tier and the explicit Card class are NOT mutually exclusive on the same element.

### W27 (close) — gate→wave attribution off-by-one (close-manifest integrity)

**B4 — Three glass-atoms gates are mis-attributed to the wrong waves in the close registration.**
W27:17, :66, :79 register the band as `proof:glass-material-unified + -sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. The realized wave-file ids are: **W22**=`proof:glass-material-unified`, **W23**=`proof:glass-material-sota`, **W24**=`proof:glass-card-tiers`, **W25**=`proof:primitive-affordance`, **W26**=`proof:reka-binding-idiom`. W27 collapses W22+W23's two gates onto W22, slides card-tiers to W23, and folds W24/W25 into one slot. The five gate-NAME set is complete (so `gates:verify-ci` presence-check passes), but W27's own §3 says "The authoritative gate names are the WAVE-FILE ids" — the parenthetical map next to them is the digest map, not the wave-file map. Since the close contract is "a green run-id PER WAVE" (W27 inv-27), the FINAL.md D-row→wave→gate crosswalk is built on a wrong map. **Fix:** correct the attributions at W27:17, :66, :79 to `unified(W22) / sota(W23) / card-tiers(W24) / primitive-affordance(W25) / reka-binding-idiom(W26)`.

### W26 (reka-idiom) — false disjointness conceals a real same-file/same-token write conflict

**B5 — W26's "fully disjoint" + "shares NO modify path with W25" is false; three files collide with W25, one with a contradictory target value.**
W26:6 ("fully disjoint file bounds from W22-W25") and W26:74 ("shares NO `modify` path with… W25") are contradicted by both File Bounds tables:
- `badge/index.ts` — W25:60 sets `transition-colors`→`transition-control`; W26:47 sets `transition-colors`→`transition-all`. **Same token, mutually-exclusive target values** — a semantic contradiction, not a different-line race.
- `toggle/index.ts` — W25:59 (`transition-colors`→`transition-control`) vs W26:48 (base icon-sizing+gap), same base CVA string.
- `toast/Toast.vue` — W25:61 (material→`glass-floating`+tone rows) vs W26:43 (forward-emits refactor + drop provider nesting). W25's own §3a:37 flags this; W26:74 denies it.

W26:74 also carries the digest off-by-one: it names "W23(card subcomponents+cards.css), W24(radius/Switch/Checkbox geometry), W25(tap-squish)" — but realized W23=material-sota, W24=cards, W25=primitives. **Fix:** (a) delete the false "fully disjoint"/"shares NO modify path with W25" assertions; (b) decide one owner of the `badge`/`toggle` `transition-colors` token — recommend **W25 owns the `transition-control` migration** (it owns the transition-discipline sweep), so W26 drops "`transition-colors`→`transition-all`" on badge and adds ONLY icon-sizing/gap composing onto W25's `transition-control`; (c) sequence `Toast.vue` explicitly (W26.a after W25's material carve); (d) re-label W26:74's wave-number map to the realized roles.

## (2) REFINE LIST — grouped by wave

**W12 (glass-panel-fix) — born-GREEN no-op gate; the digest already struck this.**
W12 scope item 3 (W12:19) + Hard Gate condition 3 (W12:59, `grep -c 'light-dark(\s*light-dark(' … returns 0`) demand collapsing a double-nested `light-dark(light-dark())`. **Verified: that construct does NOT exist at HEAD** — the grep returns 0 trivially. This is born-GREEN, not born-RED — it proves nothing and violates born-RED discipline. W24:104 explicitly disavows it as stale; the digest struck it three times. **Fix:** strike W12 scope item 3 + Hard Gate condition 3 (W12:19, :59) + the §4 `tokens.css` modify-carve line if it exists only for this. W12's other four conditions (svg-filter per-rung collapse) are real and born-RED.

**W23 (glass-material-sota) — re-home `.glass-refract` off the W22-folded compound selector + reconcile the runtime filter-id source.**
(a) At HEAD `glass-specular-track.css:146` binds `.glass-refract` to the compound `.glass-specular-track.glass-refract`. W22 folds/aliases `glass-specular-track` into `.glass-material`, so the compound's left operand goes stale and the refraction rule stops matching. W23 §3.1 treats `.glass-refract` as standalone but doesn't name the re-home. **Fix:** W23 must re-home `.glass-specular-track.glass-refract` → `.glass-material.glass-refract` (or standalone `.glass-refract`), and the gate must probe the *consuming selector* resolves, not just the `#glass-refract` filter node. (b) HEAD already generates `glass-refract-${counter}` ids at runtime in `useGlassRenderer.ts:146`; W23 walls off `composables/glass/` yet ships a *static* `#glass-refract` node — two filter-id sources. **Fix:** add a §3 note reconciling the static asset against the runtime generator (one source).

**W23 (glass-material-sota) — strike the inconsistent `@supports`-gating story on the chromatic fringe.**
W23 State (line 8) gates the fringe on `prefers-reduced-transparency`; §3.3 says "`@supports`-feasible AND dropped under reduce." There is no specific `@supports` feature the fringe needs (`color-mix(in oklab)` + a gradient ring are both Baseline). **Fix:** strike "`@supports`-feasible" from §3.3; the fringe is gated solely on `prefers-reduced-transparency`.

**W22 (glass-material-unify) — strike the phantom per-rung edge-light family + state the uniform-rim + centred-static design intent.**
(a) W22:18 hedges "alpha may still step per rung via the existing `--glass-edge-light-{wash..overlay}` family if present." **Verified phantom** — `tokens.css` carries only `--glass-edge-light` + `--glass-edge-light-dark`. **Fix:** strike "if present"; state the rim is uniform (single `--glass-edge-light`) across all rungs by design; no per-rung family is minted (minting one would trip the do-NOT-touch-tokens.css clause). (b) Once `.glass-floating` composes `.glass-material`, every floating surface (Dialog/Sheet/Popover) gets the specular `::before` with no pointer-write seam. **Fix:** W22 §2a/gate-2 must state "non-pointer-wired surfaces resolve the centred-static catch-light via the `var(--mouse-x,50%)` floor; this is intended," confirming a centred catch-light on a Dialog is design, not regression.

**W24 (glass-cards) — undeclared 3-wave shared write on the card story + re-baseline two gates against post-W22 HEAD.**
(a) `demo/stories/primitives/card.vue` is written by W12 (stages backdrop), W20 (ToggleGroup re-roll, W20:46), and W24 (W24:45). W24 §4a:51 falsely claims "the card story is W24's" and omits W20. Sequencing serializes them (opens-after chain), so it's not a race — but the disjointness contract is wrong. **Fix:** W24 §4a must name `primitives/card.vue` as shared with W12+W20, state it EXTENDS the post-W12/W20 story (must not clobber W20's ToggleGroup bite), and add W20 to §10 Depends-on (currently lists only W12+W23). (b) W24 gate 6's cream-read "sub-3:1 at HEAD" floor must be re-baselined: W22 moves `--glass-edge-light` into `.glass-material` so every rung resolves the rim before W24 runs — W24's ring composes OVER W22's rim. **Fix:** measure gate 6 born-RED against post-W22 HEAD. (c) Name the per-rung alpha/blur delta floor for gate 1 (the digest ladder gives a ≥0.10α adjacent-rung step) rather than an unthresholded "stated margin."

**W26 (reka-idiom) — narrow the aria-invalid carve; it's redundant for Input/Textarea.**
W26 §6/gate-3 claims "W18 widens the selector; W26 supplies the paint." For Input+Textarea this is wrong: both consume `.input-pill`, and `glass.css:328-342` ALREADY paints the destructive border + bg + ring; W18 widens that rule's trigger to `[aria-invalid]`. Post-W18, Input/Textarea already paint with no W26 edit. The genuine gap is only the 3 non-`input-pill` controls (SelectTrigger, NumberFieldInput, ComboboxInput). **Fix:** narrow W26 §6 + File Bounds to those three; drop Input/Textarea from the carve (or reframe as "verify W18's widened ring covers them, no new paint class") — else W26 double-declares a redundant aria-invalid ring against the `.input-pill` rule.

**W26 (reka-idiom) — add a Toast open-change render sub-gate + pin the text-shadow `@theme inline` arm.**
(a) The Toast `useForwardPropsEmits` swap + provider hoist is a real fix, but the gate only greps "zero manual `@swipe*`." **Fix:** add a sub-gate asserting auto-dismiss/open-change still fires after the swap (the store's `onOpenChange` channel survives) — exactly the binding-no-op class the wave guards. (b) W26 §3.7 adds `--text-shadow-*` to `@theme`; AV.W16 (landed) split `@theme inline` (var-referencing) from plain `@theme` (literals). The new rungs are `--shadow-color`-derived `color-mix` → var-referencing. **Fix:** specify they land in the `@theme inline` arm.

## (3) CONVERGENCE VERDICT

**NOT CONVERGED. 5 blockers, 9 refines.**

Routing summary by wave:
- **W22** — 3 blockers (B1 dock-inheritance-no-write-access, B2 dock `::before` collision, B3 Card-carve↔W24 collision + stale "W23 card work" ref) + 2 refines (phantom edge-light family, centred-static intent). **The unify mechanism needs the most rework.**
- **W23** — 0 blockers, 2 refines (`.glass-refract` re-home off the W22-folded compound + runtime filter-id reconcile; strike `@supports` fringe-gating).
- **W24** — 0 blockers, 1 refine (3-wave card-story shared write + re-baseline gates 1/6 against post-W22).
- **W25** — 0 blockers (clean; W25 owns the `transition-control` migration in the B5 resolution).
- **W26** — 1 blocker (B5 false disjointness + `transition-control` vs `transition-all` token contradiction + digest off-by-one map) + 2 refines (narrow aria-invalid carve, Toast open-change sub-gate + `@theme inline` arm).
- **W27** — 1 blocker (B4 gate→wave attribution off-by-one at :17/:66/:79).
- **W12** — 1 refine (born-GREEN light-dark no-op gate — strike).

What is SOUND (do not re-litigate): the band↔component DRY is clean — W22-W26 compose OVER W13(affordance)/W18(aria-invalid selector)/W12(backdrop) on disjoint declarations, no wave re-does a committed wave's surface. W23's four SOTA folds are genuinely born-RED (no `corner-shape`, no `--glass-tint-source`, no static `#glass-refract` node, no chromatic fringe at HEAD), warm-cream/NCSU-red biased not iOS-blue. W25 vs W13 is clean (re-assert-not-re-own). AV.W15-overlap resolves (W22 is a legitimate promotion of AV.W15's opt-in tokens, not a re-do). H (W1-W10) is **CONVERGED** — pure consumer, no AW-primitive re-implementation (W4 constellation is AW.W17's 2nd consumer; W10 single-sources onto `StatusDot` and forbids any glass-ui `src/` edit).

The 5 blockers are all intra-band (W22's unify meeting real source) + close-manifest (W27/W26 stale renumber maps) — NONE are the W12/W13 duplication the directive feared, and none change the substantive wave designs except W22's dock/Card scope.

**HEADLINE: AW glass-atoms band is true DRY-consolidation with clean component-band disjointness — but W22's unify mechanism (dock-not-a-ladder-rung + Card-carve↔W24 collision, both rooted in a stale "W23 card work" ref) and the digest→file renumber off-by-one in W26/W27 must be reconciled. NOT CONVERGED — 5 blockers, 9 refines (W22×3, W26×1, W27×1 blocking; H clean and converged).**

---

## Lane reviews

### Review 1

Now I have the final critical finding. **`.glass-dock` does NOT compose any `.glass-*` ladder rung** — it hand-rolls its own `background`, `backdrop-filter`, `border`, `box-shadow` (with its own `--glass-bg-dock`/`--glass-border-dock`/`--glass-blur-dock` token family and `--shadow-dock`). It is a parallel sixth surface, not a ladder rung. So W22's claim that "the dock tier's rim becomes a `.glass-material` inheritance, not a dock-local re-declaration" (§3.3) and "a glass-tier Button already composes `.glass-floating`/`.glass-wash`" is **structurally false for the dock** — the dock would need to either compose `.glass-material` directly or W22 must edit `dock.css`, which is NOT in W22's file bounds (`dock.css` is absent from the W22 File Bounds table).

Also `.glass-dock::after` exists (line 231) AND `.glass-dock.variant-instrument-strip::before` exists (line 352) — so folding the specular `::before` onto the dock surface via `.glass-material` collides with the instrument-strip `::before`.

I have enough for a decisive adversarial review.

CONVERGED? No. Here is the fix-list.

---

## ADVERSARIAL REVIEW — Lane "glass-material" (W22 + W23)

Verdict: **NOT CONVERGED.** Two blockers (a direct cross-wave contradiction with the committed-in-plan W24, and a structurally-false dock-inheritance mechanism that falls outside W22's file bounds), plus refine/nit items. The waves are well-researched and the SOTA folds (W23) are sound and genuinely born-RED, but W22's central DRY mechanism does not survive contact with the actual HEAD source.

### BLOCKERS

**B1 — {W22, blocker} The Card specular carve directly contradicts W24's Card specular wiring.**
W22 §3.4 + §4 File Bounds + Gate 4 retire the `glass-specular-track` opt-in string from `src/components/ui/card/Card.vue` (`Card.vue:77`). But `AW.W24-glass-cards.md:21` (§3.5) wires the dormant pointer seam *on that exact class*: "the root already carries `glass-specular-track` (`Card.vue:77`)... Add the ≤6-LOC `pointermove` listener," and `W24:47` explicitly says do-NOT-touch `glass-specular-track.css` because "W24 only adds the consumer-side pointer write." W24 opens after W22 and reads `Card.vue:77` as still present. After W22's carve, the class string is gone from the template — W24's mechanism references a seam W22 deleted. Either W22 must NOT carve Card (leave the Card opt-in, since the mixin-on-tier and the explicit class are not mutually exclusive on the SAME element — see B2), or W24 must be rewritten to wire the pointer seam against the tier-inherited specular. As written they collide. *Fix:* drop `Card.vue` from W22's §3.4/§4/Gate-4 carve set; W22 retires only the Button + DockIconButton opt-ins; the Card class string stays until W24 owns the Card material pass holistically. Cite `AW.W22-glass-material-unify.md:19,39,62` vs `AW.W24-glass-cards.md:21,47`.

**B2 — {W22, blocker} The "dock tier's rim becomes a `.glass-material` inheritance" mechanism is structurally impossible within W22's file bounds.**
W22 §3.3 asserts "The dock tier's rim becomes a `.glass-material` inheritance, not a dock-local re-declaration," and §2a/§3.4 assume every glass surface "composes whichever ladder rung they already carry." This is false for the dock. `dock.css:52-91` shows `.glass-dock` does NOT compose any `.glass-*` ladder rung — it hand-rolls `background: var(--glass-bg-dock, var(--glass-bg-resting))`, `backdrop-filter: var(--dock-surface-blur)`, its own border, and `box-shadow: var(--glass-edge-light), var(--shadow-dock...)` as a *parallel sixth surface* with its own `--glass-*-dock` token family. For the dock to inherit `.glass-material`, either (a) `.glass-dock` must add `.glass-material` composition — which requires editing `dock.css`, a file **absent from W22's File Bounds table** (§4), or (b) W22 must add a `.glass-dock` selector to the `.glass-material` mixin group — same file-bounds problem. W22's Gate 2/3 mount the dock in the band matrix and assert it resolves the unified specular `::before` + rim; that gate **cannot pass** without touching `dock.css`. *Fix:* either add `src/styles/dock.css` to W22 File Bounds as `modify-carve` (compose `.glass-material` onto `.glass-dock`, retire its local `--glass-edge-light` re-declaration at `dock.css:90`), or drop the dock from the band-uniformity matrix and acknowledge the dock keeps its parallel surface. The current spec promises dock inheritance it has no write access to deliver. Cite `dock.css:52,85-90` vs `AW.W22:18,35` (File Bounds omits `dock.css`).

**B3 — {W22, blocker} Folding the specular `::before` onto the dock surface collides with two existing dock pseudo-elements; the triumvirate trigger names the `::after` case but misses the live `::before`.**
W22 §3a names "a rung that paints a grain/curvature `::after` or a content `::before` collides" as a triumvirate trigger. The grain `::after` is genuinely shared across all five tiers (`glass.css:145-160`) and rides fine since specular is `::before`. But `dock.css:352` already defines `.glass-dock.variant-instrument-strip::before` (the engraved-bezel inner stroke), and `dock.css:231` defines `.glass-dock::after`. If the dock is brought under `.glass-material` (per B2), the mixin's specular `::before` and the instrument-strip `::before` are the SAME pseudo on the same element — a hard collision, not a triumvirate-recoverable diagnostic. DockIconButton avoids this today because it carries the specular `::before` on the *button*, not the dock shell. *Fix:* the spec must decide the dock specular lives on `.dock-icon-button` (the control, as today) and NOT on `.glass-dock` (the shell) — which means the "every named band surface incl. dock" gate-2 matrix must mount the dock-icon-button, not the dock shell, for the specular assertion. Reconcile Gate 2's "dock" target with the `::before`-ownership reality. Cite `dock.css:352`, `AW.W22:28` (trigger names `::after`/content-`::before` but not the instrument-strip `::before`).

### REFINE

**R1 — {W23, refine} W23 ships a NEW `#glass-refract` asset but never reckons with the HEAD `.glass-refract` being bound to the compound selector `.glass-specular-track.glass-refract`.**
At HEAD (`glass-specular-track.css:146`), `.glass-refract` only applies when the element ALSO carries `.glass-specular-track`: the rule is `.glass-specular-track.glass-refract { backdrop-filter: ... url("#glass-refract") }`. W22 retires/aliases `glass-specular-track` (folding it into `.glass-material`). W23 §3.1 ships the filter and says "keep the existing `@supports` gate" but treats `.glass-refract` as a standalone class. After W22's fold, the compound selector's left operand (`.glass-specular-track`) is gone or aliased — so the HEAD refraction rule either dangles or stops matching. W23 must explicitly re-home `.glass-refract` onto `.glass-material` (or make it standalone) and state that it is decoupling from the `.glass-specular-track` compound. As written, W23 grep-asserts the `#glass-refract` *node* exists but does not assert the *consuming selector* survives W22's fold. *Fix:* W23 §3.1 + Gate 1/2 must name the `.glass-specular-track.glass-refract` → `.glass-material.glass-refract` (or standalone `.glass-refract`) re-home, and the gate must probe the consuming class resolves, not just the filter node. Cite `glass-specular-track.css:146`, `AW.W23:16`.

**R2 — {W22, refine} The per-rung `--glass-edge-light-{wash..overlay}` family the spec hedges on does NOT exist; "alpha may still step per rung... if present" is a phantom.**
W22 §3.3: "alpha may still step per rung via the existing `--glass-edge-light-{wash..overlay}` family if present." Grep confirms no such family exists (`tokens.css:700-701` carries only `--glass-edge-light` + `--glass-edge-light-dark`). The hedge reads as if a per-rung family might exist; it doesn't. Either the rim is genuinely uniform across rungs (one token — fine, and what the wave should commit to) or minting a per-rung family is a NEW token set, which trips the §4 do-NOT-touch-tokens.css clause and is a triumvirate trigger. *Fix:* strike the "if present" hedge; state the rim is uniform (single `--glass-edge-light`) across all rungs by design, and that no per-rung edge-light family is minted. Cite `tokens.css:700-701`, `AW.W22:18`.

**R3 — {W22, refine} Gate 2 born-RED claim is partially false: dialog/sheet/popover/overlay are NOT a uniform "no specular" set — they already resolve the floating tier, so the carve is real but the gate's pre-fix prediction needs precision.**
W22 Gate 2 + Archaeology assert the pre-fix probe "surfaces band surfaces with NO `::before` specular (dialog/sheet/popover/overlay)." Verified: `DialogContent.vue:85` renders `glass-floating`, sheet/popover likewise. They carry the floating tier but NOT `glass-specular-track`, so the specular `::before` is indeed absent — the gate's RED prediction is correct in outcome. BUT the mechanism that fixes it is "make `.glass-floating` compose `.glass-material`," which means the moment `.glass-floating` gets the specular `::before`, EVERY floating surface (dialog, sheet, popover, the floating Card tier, glass Buttons) gets a pointer-tracked catch-light with NO pointer-write seam — pinning it centred-static everywhere (the consumer writes `--mouse-x/--mouse-y` only on opt-in hosts). The wave should state that the uniform specular is centred-static on non-opt-in surfaces (acceptable — the `var(--mouse-x,50%)` floor handles it) and confirm a centred catch-light on a Dialog is the INTENDED design, not a regression. This is a design assertion the wave silently assumes. *Fix:* W22 §2a/Gate-2 should explicitly state "non-pointer-wired surfaces resolve the centred-static catch-light via the `var(--mouse-x,50%)` floor; this is intended." Cite `glass-specular-track.css:48`, `AW.W22:60`.

**R4 — {W23, refine} The chromatic-fringe gating is internally inconsistent between the State line and Gate 4 / §3.3.**
W23 State (line 8) gates the fringe `prefers-reduced-transparency: no-preference`. §3.3 says "Gated `@supports`-feasible AND dropped under `prefers-reduced-transparency: reduce`." Gate 4 says "composes... under `no-preference` and is DROPPED under `reduce`." The `@supports`-feasible phrasing in §3.3 is vague — there is no specific `@supports` feature the fringe needs (it's `color-mix(in oklab)` + a gradient ring, both Baseline Widely). The fringe is purely transparency-preference-gated, not `@supports`-gated. *Fix:* strike "`@supports`-feasible" from §3.3; the fringe is gated solely on `prefers-reduced-transparency`. Keep one consistent gating story. Cite `AW.W23:18`.

### NITS

**N1 — {W22, nit} W22 §6 Gate-6 + W23 §3.5 both claim `demo/stories/substrates/glass-material.vue` (W22 create, W23 modify), but the directory already holds `glass-panel.vue` from W12.** No collision (different filenames), but W12's `card.vue`/`glass-panel.vue` backdrop staging and W22's `glass-material.vue` matrix both stage the band over Aurora/PaperBackdrop — three near-duplicate substrate stories. Worth a one-line note that the glass-material story is the band-matrix superset and the W12 stories stay component-scoped, to avoid demo-story proliferation flagged by the overfitting audit. Cite `AW.W22:21`, `demo/stories/substrates/`.

**N2 — {W22/W23, nit} The digest's §5 names ONE wave "W22 — Glass-material unify + extend" carrying BOTH the unify AND all four SOTA folds; the actual files split into W22 (unify) + W23 (SOTA).** The split is sound (unify-then-extend, clean dependency) and arguably better than the digest's single wave. But the digest's §5 W23 is "Glass-card perfection" — which is the ACTUAL W24. The wave numbering diverged from the digest by one across the whole band (digest W23-card = file W24-card, etc.). The waves are internally consistent (W27 close registers the realized names), but anyone tracing a wave back to the digest §5 will mis-map. A one-line "renumber note: digest §5 W22-extend split into file W22+W23; digest W23-W26 → file W24-W27" in either wave's Archaeology would close the trace gap. Cite `glass-atoms-digest.md:104-114`.

**N3 — {W23, nit} Gate 5 grep "no `oklch(from … l …)` lightness-shift" is correct per mwg, but the digest already notes the `--glass-curvature-overlay` and existing tokens are clean — confirm the grep scopes to the NEW tint recipe only, else it may false-trip on an unrelated future `oklch(from)` use.** Minor; the gate is sound in intent. Cite `AW.W23:63`.

---

### What is SOUND (credit where due)
- W23's four folds are genuinely born-RED and verified: no `corner-shape` decl anywhere, no `--glass-tint-source`, no `#glass-refract` node, no chromatic fringe at HEAD (all confirmed via grep). The `@supports`-gating + clean-fallback discipline is correct and matches the gated-Baseline precept.
- The AV.W15-overlap challenge resolves cleanly: AV.W15 shipped the specular/rim/refraction-garnish as OPT-IN tokens+class; W22 is a legitimate DRY *promotion* of those into the ladder (not a re-do), and W23 ships the *missing asset half* (the `#glass-refract` filter node AV.W15 deliberately deferred per AV.W15 §3.5 "DEFER-as-garnish"). No duplication of AV.W15's token-mint work — verified `--glass-edge-light`, `@property --specular-*`, the specular `::before` all already exist and are correctly cited as inputs, not re-created.
- W23 vs W12: disjoint (W12 = GlassPanel svg-filter tier + `tokens.css §8`; W23 = `tokens.css` §11/§18 tint/fringe rungs). No overlap.
- W23 vs W13: disjoint (W13 = `.input-pill` border + slider + button text; W23 = card/pill/rim/tint). Confirmed.
- W22's blur-as-substrate / refraction-as-PE-garnish framing is correct and matches the digest + WebKit-bug-245510 reality.

The blockers are all in W22's *unify mechanism* meeting the real source (dock is not a ladder rung; Card carve collides with W24; dock `::before` collision). W23 is closer to converged — its issues (R1, R4) are refinements, not blockers. Fix B1-B3 + R1-R4 and re-submit; the SOTA-fold half (W23) is otherwise sound.

---

### Review 2

All born-RED claims verified: `.glass-floating` exists (W25 §7 target valid), `--radius-field`/`--radius-control` don't exist (W25 §4 born-RED valid), `CollapsibleTrigger.vue` has no focus-ring (W25 §2 born-RED valid), SelectTrigger uses `rounded-pill` (W25 single-line-keeps-pill valid).

I now have everything needed. Let me synthesize the adversarial review.

## Summary of analysis

**The core DRY question — W24 vs W12:** Not duplicated. W12 owns `GlassPanel.vue` + `tokens.css §8` + *stages* the backdrop in the card story. W24 owns the `card/` package + card-specific `cards.css` rungs and *consumes* W12's backdrop staging. Clean band↔component split. **However**, both edit `demo/stories/primitives/card.vue` — W12 §3 scope item 5 stages it over the backdrop, W24 §3 item 7 / §4 also lists it as `modify`. Since W24 opens after W12, this is sequential not concurrent, but the file-bounds note in W24 doesn't acknowledge W12's prior write to the same story.

**W25 vs W13:** Clean extension, well-guarded. W13 owns the three point-fixes; W25 §10 explicitly RE-ASSERTS-not-re-owns and the gate language is careful. Disjoint lines documented.

**The real blocker is W24 vs W22** (not W12). Let me write the fix-list.

---

FIX-LIST (adversarial review, lane cards-primitives, READ-ONLY):

**[BLOCKER] {W24, specular-seam ownership collision with the COMMITTED W22}** — `AW.W24-glass-cards.md:21` (§3 item 5) and `:62` (§5 mechanism) and `:74` (gate 5) all assert: "the root already carries `glass-specular-track` (`Card.vue:77`)... Add the ≤6-LOC `pointermove` listener... gated behind the `hover`/`interactive` opt-in." But W22 (`AW.W22-glass-material-unify.md:39`, §4 File Bounds) **carves that exact class string OUT of `Card.vue`**: "drop the per-component specular opt-in class only." W24 opens after W22 (`AW.W24:6`). So at W24's execution time, `Card.vue:77`'s `glass-specular-track` is GONE — folded into the `.glass-material` mixin the ladder composes (W22 §3 items 1-4). W24's born-RED gate 5 cites a line that W22 has already deleted, and its §3 item 5 mechanism ("the root already carries `glass-specular-track`") is false post-W22. THE FIX: rewrite W24 §3 item 5 + §5 + gate 5 to (a) drop the "already carries `glass-specular-track`" premise; the specular `::before` now comes from the ladder rung via W22's `.glass-material`; (b) scope W24 to add ONLY the pointer-WRITE seam (the `pointermove` → `--mouse-x/--mouse-y` JS listener) behind the `hover` opt-in — the CSS half is W22-owned. Verified at `Card.vue:77` (HEAD has `glass-specular-track`) + `glass-specular-track.css:1-23` (header comment: "DockIconButton wires it; Button glass + Card hover opt in" — the pointer WRITE, not the class, is what W24 adds).

**[BLOCKER] {W22, stale wave-number citation that misroutes W24's ownership}** — `AW.W22-glass-material-unify.md:39` says the dormant pointer seam is "owned by **W23** card work." In the committed renumber, W23 is `glass-material-sota` (refraction/squircle/dispersion/tint — NO card work); the card wave is **W24**. So W22 hands the pointer-seam to a wave that doesn't do card work, and W24 (the actual card wave) believes it inherits an `glass-specular-track`-bearing root that W22 stripped. This stale ref is the proximate cause of the W24 blocker above. THE FIX (W22 side, flagged for the reconciler since W22 is committed): the §4 note "owned by W23 card work" must read "owned by W24 card work" — and W24 must be the wave that adds the pointer-write seam over the ladder-composed specular. Cite: `AW.W22:39` vs the band order in `AW.W27-close.md:6` (W22-W26 band) + `AW.W24:1` (glass-cards is W24).

**[BLOCKER] {W24/W25, gate-id mismatch vs the COMMITTED W27 close manifest}** — `AW.W27-close.md:17` (§3 gate-fleet) registers `proof:glass-card-tiers` against **W23** and `proof:primitive-affordance` against **W24/W25**. But the actual wave files are: W24 mints `proof:glass-card-tiers` (`AW.W24:8,66`) and W25 mints `proof:primitive-affordance` (`AW.W25:8,87`). W27's manifest says "W23"/"W24/W25" — off-by-one from the realized files. W27 §3 is the authoritative gate registry (`gates:verify-ci` fails closed on drift, `AW.W27:79`). If the wave→gate map in W27 doesn't match the wave files, the close gate-fleet registration is inconsistent and `proof:aw-final` cannot certify honestly. THE FIX: reconcile W27 §3's wave-number annotations to `proof:glass-card-tiers`(W24) + `proof:primitive-affordance`(W25). (W27 is committed; flag for reconciler — but W24/W25 must confirm their gate ids match what W27 will register.)

**[REFINE] {W24, undeclared shared-write of `demo/stories/primitives/card.vue` with the COMMITTED W12}** — W12 §3 item 5 (`AW.W12:21`) edits `demo/stories/primitives/card.vue` to "stage the Card tier matrix... over the same shipped backdrop." W24 §4 File Bounds (`AW.W24:45`) lists the same file as `modify` and §3 item 7 (`AW.W24:23`) re-stages "the five-tier ladder staged over the W12 Aurora/PaperBackdrop." W24 opens after W12, so it's sequential — but W24's §4a Disjointness (`AW.W24:51`) claims "the card story is W24's" without acknowledging W12's prior write to it. Two waves both author the same story over the same backdrop is a redundant-write smell. THE FIX: W24 §4a/§3-item-7 must state it EXTENDS W12's already-staged `card.vue` (adds the hover/CardAction/data-size rows), not re-stages the backdrop W12 already added; cross-reference `AW.W12:21`.

**[REFINE] {W25 §1 vs W22 §3-item-5, the press/hover interaction-light is double-claimed}** — W22 §3 item 5 (`AW.W22:20`) lands "the press/hover intensity hook... material-light fires in lockstep with the existing scale-press squish across every glass surface." W25 §1 (`AW.W25:19`) universalizes `.tap-squish` (the scale-press) onto the press-less atoms including Switch-thumb/SelectTrigger and "moves [Button's press] onto the canonical spring channel." These are adjacent but not conflicting (W22 = the specular-intensity coupling on GLASS surfaces; W25 = the scale-transform on INTERACTIVE atoms, most of which aren't glass surfaces). But W22's "across every glass surface" and W25's "every interactive atom" overlap on the glass Button + Switch-thumb. Neither wave cites the other on this axis. THE FIX: W25 §1 should note that the specular-intensity half of the press coupling is W22-owned (glass surfaces) and W25 owns only the scale-transform half (the `--scale-press*` channel) — so the two press-feedback axes (light + motion) have one owner each, no double-write of the press state machine on the shared Button/Switch.

**[NIT] {W24, "perceptible margin" gates lack a stated numeric floor}** — `AW.W24:8` + gate 1 (`:70`) assert tiers "separate by a stated margin on (alpha ∨ blur ∨ per-rung under-shadow)" but no concrete margin is named (unlike W13's explicit "≥4.5:1" or W24 gate 6's "≥3:1"). A "sampled-pixel or computed-style differential" with no threshold is a soft gate. THE FIX: name the per-rung alpha/blur delta floor (the digest gives the ladder: 0.30→0.50→0.65→0.80→0.95α at `glass-atoms-digest.md:234-236`, so a ≥0.10α step between adjacent rungs is a concrete floor).

**[NIT] {W24, cream-read gate 6 may not be born-RED as stated}** — Gate 6 (`AW.W24:75`) claims the resting border is "the 8-12%α cream-matching glass border at HEAD, sub-3:1." But W22 moves the `--glass-edge-light` rim into `.glass-material` (`AW.W22:18`, §3 item 3) so EVERY rung resolves the rim, and W24 opens after W22. The cream-read floor may already be partially lifted by W22's uniform rim before W24 runs. THE FIX: re-verify gate 6's born-RED state is measured against post-W22 HEAD (the rim is uniform by then), not raw HEAD — the W24 cream-read ring composes OVER W22's rim, so the ≥3:1 floor must be re-baselined.

**Verified SOUND (no action):**
- W25 vs W13 DRY: clean. W25 §10 (`:28`) + §11 (`:127`) explicitly re-assert-not-re-own; disjoint-lines documented (`:70`); all born-RED claims hold at HEAD (Checkbox.vue:29 `<Check>`, Textarea `input-pill`, Switch `transition-colors`/`transition-transform`, Alert default/destructive-only, Toast `bg-background`/`shadow-modal`, Command `bg-popover`, AccordionTrigger no focus-ring, `--radius-field`/`--radius-control` absent, `.glass-floating` present). W25 vs W24: genuinely disjoint atom sets (`:66`). W25's gate is real + runtime (grep+computed-style), not grep-only.
- W24's `--card-spacing`/`CardAction`/`data-size` idiom band is real born-RED (CardContent/Footer `p-6`, CardHeader `gap-y-1.5 p-6`, no `card-action` slot at HEAD) and design-cogent (shadcn-2025 per digest `:249-253`). Hover-elevation reuses the cartoon `translate`+`box-shadow` mechanism (verified `cards.css:33-48`), no fork.
- Both waves are canonical per WAVE_SPEC (all 11 sections present, paired goal+gate, triumvirate triggers, file-bounds, commit plan).

VERDICT: **NOT CONVERGED** — 3 blockers (the W24↔W22 specular-seam ownership collision driven by W22's stale "W23 card work" ref; the W27 gate-id off-by-one) must be resolved before these waves are sound. The band↔component DRY (W24 vs W12, W25 vs W13) is otherwise clean; the blockers are intra-band (W22→W24) and close-manifest (W27) mis-wirings, not the W12/W13 duplication the directive feared.

---

### Review 3

This is the **central blocker, now fully confirmed**. W26 line 74 explicitly asserts: *"W26 shares NO `modify` path with ... W25 (`.tap-squish`/`transition-control`/`glass-floating`/tone-parity)."* This is **factually false**:

- **`src/components/ui/badge/index.ts`**: W25 File Bounds line 60 (`transition-colors → transition-control`), W26 File Bounds line 47 (`base icon-sizing + transition-colors → transition-all`). Same file, same `transition-colors` token, **conflicting target values** (`transition-control` vs `transition-all`).
- **`src/components/ui/toggle/index.ts`**: W25 line 59 (`transition-colors → transition-control`), W26 line 48 (`base icon-sizing + gap`). Same file, same base CVA string.
- **`src/components/ui/toast/Toast.vue`**: W25 line 61 (material → `glass-floating` + tone rows), W26 line 43 (forward-emits refactor + drop nesting). Same file. W25's own §3a (line 37) flags this collision; W26's boundary note **denies it**.

W26's "fully disjoint file bounds from W22-W25" (line 6) and "shares NO modify path with W25" (line 74) are both contradicted by the File Bounds tables. This is a `WAVE_SPEC.md §4a` Disjointness violation and a "No hidden cross-wave write conflicts" prohibition breach.

I have everything I need for the verdict.

---

**ADVERSARIAL REVIEW — AW.W26 (reka/shadcn/Tailwind-v4.3 idiom + binding-correctness guard)**

NOT CONVERGED. The wave is mostly sound and idiomatic, but it carries one **blocker** (a false disjointness claim hiding a real same-file/same-token write conflict with the committed-band sibling W25) and two **refine**-level defects (an aria-invalid paint claim that is largely redundant against the already-painting `.input-pill` rule that W18 widens, and an internal value conflict on `badge transition-*`). The binding-regression spec is sound and honestly scoped (it locks the ABSENCE of a canary, not a live bug). No overlap with the shipped AV.W16 Tailwind-v4 wave.

Fix-list:

**1. [BLOCKER] {W26} — False disjointness claim conceals a real cross-wave write conflict with W25 on three shared files.**
`AW.W26 line 6` ("fully disjoint file bounds from W22-W25") and `line 74` ("W26 shares NO `modify` path with ... W25") are factually false. Three files appear in BOTH wave File Bounds:
- `badge/index.ts` — W25:60 sets `transition-colors`→`transition-control`; W26:47 sets `transition-colors`→`transition-all`. Same token, **mutually exclusive target values** — not a "different line" race, a semantic contradiction.
- `toggle/index.ts` — W25:59 (`transition-colors`→`transition-control`) vs W26:48 (base icon-sizing+gap), same base CVA string at `toggle/index.ts:25`.
- `toast/Toast.vue` — W25:61 (material→`glass-floating`+tone rows) vs W26:43 (forward-emits refactor + drop provider nesting). W25's OWN §3a:37 flags this collision; W26 denies it.
Precise fix: delete the false "fully disjoint"/"shares NO modify path with W25" assertions; add an explicit sequencing/ownership contract. Decide the single owner of the badge/toggle `transition-colors` token (recommend: W25 owns the `transition-control` migration since it owns the transition-discipline sweep; W26 then drops "`transition-colors`→`transition-all`" on badge and adds ONLY icon-sizing/gap, composing onto W25's `transition-control`). Toast.vue must be sequenced (W26.a after W25's Toast material carve, or fold). Until the badge target value is reconciled, the two waves cannot both close as written.

**2. [REFINE] {W26} — The aria-invalid "paint" scope (§6) is redundant for Input+Textarea; it duplicates the `.input-pill` rule W18 already widens.**
W26 §6/Gate-3 claims "W18 widens the selector; W26 supplies the paint — disjoint declarations." This is wrong for Input and Textarea: both consume `.input-pill` (verified), and `glass.css:328-342` ALREADY paints the destructive border + `color-mix` bg + focus ring; W18 widens that rule's trigger to `[aria-invalid="true"]`. So post-W18, Input and Textarea **already paint on `[aria-invalid]`** with no W26 edit. The genuine gap is only the three NON-`input-pill` controls: SelectTrigger (no input-pill/no rounded-input), NumberFieldInput (`bg-background`/`rounded-input`), ComboboxInput (`rounded-input`). Precise fix: narrow §6 + File Bounds to those three controls (drop `input/Input.vue` and `textarea/Textarea.vue` from the aria-invalid carve, or reframe them as "verify W18's widened `.input-pill` ring already covers them, add a sub-gate assert, no new paint class"). As written, the wave would add a second redundant aria-invalid border/ring to Input/Textarea that double-declares against the `.input-pill` rule — a cn()/cascade collision and a DRY violation, not the claimed "disjoint declaration."

**3. [REFINE] {W26} — Toast §3 over-states what is broken; reconcile with the actual `Toaster.vue` topology.**
The Toast refactor is real (`Toast.vue:33,55` DO nest a per-toast `<ToastProvider>`+`<ToastViewport>` inside `Toaster.vue`'s own singleton provider — verified), so the fix is legitimate. But §3/Gate-5 also lists removing `@update:open` from the manual re-emit, while `Toaster.vue` binds toasts via `v-bind="toast"` and the `onOpenChange` prop path exists on `ToastProps:15` — the forward-emits swap must preserve the open-change channel the `use-toast` store relies on. Precise fix: add a sub-gate clause asserting the toast auto-dismiss/open-change still fires after the `useForwardPropsEmits` swap (not just "zero manual `@swipe*`"), so the refactor doesn't silently sever the store's open tracking. This is exactly the §11-cited binding-no-op class the wave is meant to guard against — the refactor must be covered by its own render spec, not only grep.

**4. [NIT] {W26} — Gate-naming drift vs the W27 close registry.**
W27:17 registers W26's gate as `proof:reka-binding-idiom` (matches W26 §State/§6 — good), but registers W24/W25 under `proof:primitive-affordance` while the digest §(5) named those `proof:form-canon`/`proof:atoms-cohesion`. W26 itself is internally consistent; flag only that the close (W27) must be the single source for the realized gate id, and W26's §10 "Blocks: W27" correctly defers `gates.mjs` registration. No W26 change needed beyond confirming the id `proof:reka-binding-idiom` is the one W27 expects (it is).

**5. [NIT] {W26} — §State "Opens after W25" + "MAY run in parallel once main is clean" is self-contradictory given the shared files.**
The two clauses can't both hold while badge/toggle/toast are shared with W25. Once fix #1 reconciles ownership, drop the "MAY run in parallel" clause (it opens-after-W25 and writes post-W25 SFCs — strictly serial on those three files).

Sound, non-overlapping, idiomatic elements (no fix needed, recorded so they aren't re-litigated): the `data-slot` blanket sweep is correctly born-RED (verified 37 roots, 4 carry data-slot; Button binds only `:data-size` at `Button.vue:33`); the CVA icon-sizing modernization is correct and the `cn()` `/^size-/` false-merge VERIFICATION is well-founded (cn.ts:108 bucket is real; the arbitrary `[&_svg…]:size-4` token passes through untouched, so the host-`size-9`+icon-`size-4` survival gate is the right check); the SelectContent transform-origin gap is genuine (`SelectContent.vue:46/55` has no `origin-(--reka-select-content-transform-origin)`; ComboboxList:24 does); the text-shadow `@theme` bridge is genuinely absent (`theme.css` has zero `text-shadow`; `utilities.css:236`/`typography.css:489` hand-roll literals) and does NOT overlap AV.W16 (which lifted SelectContent/ComboboxList paren shorthand + killed `theme()` but never touched text-shadow); the binding-regression spec is honest (§11 states bindings are CLEAN at HEAD — it locks a future-regression canary, not a live bug) and correctly switched from the digest's "Playwright spec" to vitest+happy-dom (`@vue/test-utils ^2.4.10` + `happy-dom ^20.9.0` in devDeps; `proof:dock-a11y-contract` is the cited render-probe precedent — no Playwright dep, the no-grep-only-gate prohibition is honored). The Hard Gate is born-RED and falsifiable across all six sub-fixes. Wave shape conforms to WAVE_SPEC.md (all required sections present).

---

### Review 4

I now have complete, precise evidence for my adversarial review. The verdict and fix-list follow.

The `demo/stories/primitives/card.vue` story is written by THREE waves — W12 (modify, stages backdrop), W20 (modify-carve, ToggleGroup re-roll), W24 (modify, extends with the four new affordances). All three are sequenceable (W20 opens-after-W12; W24 opens-after-W12). But W24's §4a explicitly and **falsely** asserts "It shares NO `modify` path with W12 ... the card story is W24's" and never mentions W20 at all — a real disjointness-statement defect, not a real write race (the opens-after chain serializes them). This is the concrete cross-cutting DRY hit the directive asked me to map.

---

# AW/H cross-cutting DRY adversarial review — cross-dry lane

**Scope swept:** AW glass-atoms band W22-W26 (read in full) vs the committed component band W12/W13/W14/W15/W20 (read in full), plus AV.W16 (the prior Tailwind-v4 idiom wave), W27 close, and the slides-H consumer tranche W1-W10 (read in full). Traced every fix to the glass-atoms digest. The four named overlap axes — W12/W24 backdrop staging, W13/W25 affordance floors, AV.W16/W26 Tailwind idiom, H-vs-AW-primitive — all checked at file:line.

**Headline finding:** the band is **substantively DRY and well-bounded** — the actual `modify` file-bounds are disjoint (W24=card/+cards.css, W25=primitive-SFCs+`.input-pill` radius+tokens.css radius rungs, W26=data-slot+CVA-bases+theme.css text-shadow), each fix cites a distinct digest finding, and every overlap-prone seam carries an explicit owner-and-sequence clause (W13 owns affordance floors, W25 re-asserts not re-owns; W12 stages backdrop, W24 reads it; W22 mints the mixin, W23 composes onto it). The headline-risk "glass-atoms duplicates the component band" does NOT materialize at the file-bound level. The defects are **stale internal wave-number cross-references** (the digest synthesis numbers waves differently from the realized files, and that mis-numbering leaked into three docs) plus **one false disjointness claim** on the shared card story.

**Verdict: CONVERGED, with 4 refine + 2 nit fixes below. No blockers.**

---

## Fix-list

### REFINE-1 — `demo/stories/primitives/card.vue` is a 3-wave shared write; W24 §4a falsely says it shares no path with W12 and omits W20

`AW.W24-glass-cards.md:51` states: *"It shares NO `modify` path with W12 (W12 owns ... `substrates/glass-panel.vue` — **the card story is W24's**)."* This is wrong. `primitives/card.vue` is `modify` in **W12** (`AW.W12-glass-panel-fix.md:38`, stages the backdrop), `modify-carve` in **W20** (`AW.W20-styling-assay.md:46`, ToggleGroup re-roll bite), and `modify` in **W24** (`AW.W24-glass-cards.md:45`). Three writers, one file.

It is not a real write-race — the opens-after chain serializes them (W12 first → W20 opens-after-W12 → W24 opens-after-W12). But the §4a disjointness statement is the canonical contract the orchestrator reads to schedule, and it asserts sole ownership that does not hold. **Fix:** W24 §4a must (a) drop the "the card story is W24's" claim, (b) name `primitives/card.vue` as a shared surface with W12 + W20, and (c) state the sequence: W24 extends the *post-W12/W20* card story (W12's backdrop staging + W20's ToggleGroup tier-control must already be on it, since W24's gate probes "the W12 Aurora/PaperBackdrop story" at `AW.W24-glass-cards.md:70` and must not clobber W20's ToggleGroup bite at `AW.W20-styling-assay.md:76`). Cite the sequence in §10 Depends-on (currently lists only W12+W23, not W20).

### REFINE-2 — W26 §4a carries a stale gate-to-wave map: it thinks W23=cards, W24=radius/Switch/Checkbox

`AW.W26-reka-shadcn-tailwind-idiom.md:74`: *"W26 shares NO `modify` path with W22 (glass.css/tokens.css material ladder), **W23 (card subcomponents + cards.css)**, **W24 (radius/Switch/Checkbox geometry)**, or W25..."* The realized files are **W23 = glass-material-SOTA** (refract/squircle/tint), **W24 = glass-cards** (card subcomponents + cards.css), **W25 = primitives** (radius/Switch/Checkbox). W26's boundary note has the W23/W24/W25 roles shifted by one — it is the digest-synthesis numbering (digest §5 maps W23→card, W24/W25→primitive) leaking into the realized wave file. The boundary conclusion ("disjoint paths") is still *correct*, but the labels are wrong, so a reader reconciling the boundary against the actual W23/W24 files will find the cited concerns don't match. **Fix:** re-label W26 §4a to the realized roles — W23=material-SOTA, W24=card-subcomponents+cards.css, W25=radius/Switch/Checkbox+`.tap-squish`.

### REFINE-3 — W27 gate-fleet registration mis-attributes three glass-atoms gates to the wrong waves

`AW.W27-close.md:17` and `:79` register the band as: `proof:glass-material-unified + proof:glass-material-sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. The realized wave files own: **W22** `proof:glass-material-unified`; **W23** `proof:glass-material-sota`; **W24** `proof:glass-card-tiers`; **W25** `proof:primitive-affordance`; **W26** `proof:reka-binding-idiom`. W27 collapses W22+W23's two gates onto W22, slides `glass-card-tiers` to W23, and labels `primitive-affordance` as "W24/W25". W27's own §3 line `:17` even claims *"The authoritative gate names are the WAVE-FILE ids"* — but the wave→gate mapping next to them is the digest map, not the wave-file map. The *gate-name set* registered is complete and correct (all five names present); only the parenthetical wave attribution is stale. Because the close's whole contract is "green run-id **per wave**" (`:84`, inv-27), a wrong wave→gate map will mis-cite which gate proves which wave in `FINAL.md`. **Fix:** correct the attributions to W22/W23/W24/W25/W26 = unified/sota/card-tiers/primitive-affordance/reka-binding-idiom at both `:17` and `:79`.

### REFINE-4 — W23 re-seeds the stale `light-dark(light-dark())` claim the digest explicitly struck; verify W23/W24's tokens.css carves don't touch the §8 block W12 owns

The digest synthesis (`glass-atoms-digest.md:5,17`) is explicit: *"the double-nest does not exist — strike that sub-item from W12 and do not re-seed it."* W12 still carries it as scope item 3 (`AW.W12-glass-panel-fix.md:19`, "Resolve the double-nested `light-dark(light-dark(...))`") and a hard-gate clause (`:59`, `grep -c 'light-dark(\s*light-dark(' ... returns 0`). Since the construct does not exist at HEAD, that grep returns 0 trivially — the clause is a **no-op gate that is born-GREEN, not born-RED**, violating the born-RED discipline (WAVE_SPEC §6 / the tranche's own born-RED requirement). W24 §11 correctly disavows the stale claim (`AW.W24-glass-cards.md:104`), and W23 §4a correctly scopes its tokens.css carve to the §11/§18 specular/tint rungs disjoint from §8 (`AW.W23-glass-material-sota.md:46`) — so there's no *file* collision. **Fix (W12, the owner):** drop W12 scope item 3 + its gate clause `:59` (the digest struck it); W12's real born-RED work (the svg-filter per-rung collapse, gates 1-2) stands. This is a W12 edit, not a glass-atoms-band edit — flagging it here because the band waves (W23/W24) correctly avoid re-seeding it and the one-owner fix lives in W12.

### NIT-1 — W23 `--glass-tint-source` (oklab tint) and W26 §9 "oklab-tint rationale" are adjacent but correctly disjoint; add a one-line cross-ref so they're not read as duplicate oklab work

W23 mints `--glass-tint-source` + a `color-mix(in oklab,…)` *adaptive-tint recipe* on the glass-material rim (`AW.W23-glass-material-sota.md:19`, tokens.css §11/§18). W26 §9 (`AW.W26-reka-shadcn-tailwind-idiom.md:25`) decides the *surface-tint* generation (`--surface-tint-*` in utilities.css) — migrate-to-oklab-OR-document-srgb. These are **two different tint families** (glass-material adaptive tint vs the `--surface-tint-*` house rung) in two different files — genuinely disjoint, no duplication. But both say "oklab tint" and a reviewer could read them as the same fold. **Fix:** add a one-line note in W26 §9 that the `--glass-tint-source` oklab recipe is W23-owned and W26's oklab decision is scoped to `--surface-tint-*` only, so the band has one owner per tint family.

### NIT-2 — W26 text-shadow `@theme` add must confirm compatibility with AV.W16's landed `@theme inline` migration

W26 §3.7 adds `--text-shadow-{2xs..lg}` to `theme.css @theme` (`AW.W26-reka-shadcn-tailwind-idiom.md:23`). AV.W16 (already landed) migrated the `@theme` block's *var-reference bridges* to `@theme inline` and KEPT plain `@theme` for directly-authored literals (`AV.W16-modern-tailwind.md:22`). The new `--text-shadow-*` rungs are `--shadow-color`-derived `color-mix` values — i.e. var-referencing, so they belong in the `@theme inline` arm, not a fresh plain `@theme` block, or they'll double the override surface AV.W16 just collapsed. W26 doesn't say which arm. **Fix:** W26 §3.7 should specify the text-shadow rungs land in the `@theme inline` arm (consistent with AV.W16's migration), and the cadence should run `proof:tailwind-v4-idiom` (AV.W16's gate, which asserts `@theme` completeness) — W26 §7 already lists it (`:134`), good; just pin the inline-arm placement in §3.7.

---

## H-tranche convergence (slides W1-W10): CLEAN — no AW-primitive re-implementation

The slides-H tranche is a **pure consumer** (writes only slides `src/` + `docs/tranches/H/`; reads glass-ui as the published `^3.4.0` registry artifact — `H.md:119-121`). Every primitive-touching wave consumes the shipped AW primitive rather than re-rolling it:

- **H.W4 constellation** (`H.W4-constellation-visibility.md:32-34`) — explicitly forbids re-rolling the engine: *"Do NOT pre-emptively re-roll the engine — the AW component is the home"*; it is AW.W17's **2nd consumer** (the unblock), swaps onto `useRAFLoop`+`useIntersectionPause`+`prng.ts`, keeps only the slides-brand anomaly skin. Correct convergence direction.
- **H.W10 de-dup** (`H.W10-dedup.md:27,65`) — single-sources the 3-way-forked pulse-dot onto glass-ui `StatusDot`, and §3a/Hard-Gate-5 **forbid any glass-ui `src/` edit** ("any library change books to AW, not executed in H"). No new slides primitive below the ≥2-consumer bar.
- **H.W1/W2 DeckProgress** (`H.md:95-97`) — consumes the AW.W16 `DeckProgress` *math* via the bump; the `position:fixed` chrome stays deck-local. No re-implementation.

No H wave re-implements an AW primitive. The cross-repo edge (H.W4 RAF-swap flips the AW.W17 ≥2-consumer gate) is a named-and-watched horn signal, not a duplication.

---

**Bottom line:** the glass-atoms band routes every atom onto the existing spine with disjoint file-bounds and one-owner-per-fix discipline intact — no real duplication vs the committed W12/W13/W14/W15/W20 component waves, no real duplication within the band, no H-side re-implementation. The six fixes above are **doc-consistency corrections** (stale wave-number maps from the digest synthesis leaking into W26/W27, one false disjointness claim on the shared card story, one born-GREEN no-op gate to drop in W12, and two tint/`@theme` cross-refs to pin) — none change the substantive wave design. Apply them and the band is sound. **CONVERGED** modulo the fix-list.

---

### Review 5

I have all the evidence needed. The Toast write-conflict between W25 (material carve onto `glass-floating`) and W26 (`useForwardPropsEmits` + provider hoist) IS flagged in both waves with explicit sequencing (W26 opens after W25), but W26's §4a Disjointness boundary note does NOT name the `Toast.vue` material lines W25 already wrote — it says W26.a "owns toast/Toast.vue" and "no other unit writes these," which is true within W26 but glosses that W25 wrote a different region of the same file first. That's a nit (W26 opens after W25 so it's a sequential write, not a race), and the §3a/dependency notes do flag it. The lock-removal (H.W6) is a slides-tranche concern not present in this glass-ui AW band — the prompt conflated the two repos; there is no H.W6 lock-removal wave to review here (H.W2/W10 are referenced as cross-repo consumers only).

Cross-cogency review complete. Here is the fix-list.

---

**CROSS-COGENCY REVIEW — AW glass-atoms band (W22-W27) + whole-AW design-language coherence**

Verdict: the band coheres into ONE language. Not CONVERGED — two real cross-wave defects (one blocker-adjacent labeling error in the close, one stale born-GREEN gate in the W12 boundary the band's own digest already flagged as a no-op).

**DESIGN-COGENCY (warm-cream + iOS-26 + NCSU-red; reka ^2.9 + CVA + Tailwind v4.3): SOUND.** W23 explicitly biases the chromatic fringe + adaptive tint "warm-cream/NCSU-red NOT iOS-blue" (W23:18-19,62-63) with a born-RED gate asserting "the warm-edge channel resolves a warm hue, not iOS-blue." No cold-blue dissonance anywhere in the band. The material spine (W22 single `.glass-material` mixin), the squircle/refraction/dispersion folds (W23, all `@supports`-gated PE over a clean fallback), the shadcn-2025 card idiom (W24 `--card-spacing`/`CardAction`/`data-size`), the press-spring/radius/glass-vocab sweep (W25), and the reka-2.9/CVA/`data-slot`/Tailwind-v4.1 idiom (W26) all trace cleanly to the digest and to reka 2.9.7 / CVA 0.7 / Tailwind 4.3 as installed. DRY-vs-committed-waves is clean: W22-W26 compose OVER W13 (affordance) / W18 (aria-invalid selector) / W12 (backdrop staging) on disjoint declarations, with explicit boundary notes; no new wave re-does a committed wave's surface.

---

**FIX-LIST**

1. **{W27, refine}** — Gate→wave mapping is wrong in the close registration. W27 §3 (line 17), §5 (line 66), §6 (line 79) list the band as `proof:glass-material-unified + -sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. The ACTUAL wave-file gate ids are: W22=`proof:glass-material-unified`, **W23=`proof:glass-material-sota`**, **W24=`proof:glass-card-tiers`**, **W25=`proof:primitive-affordance`**, W26=`proof:reka-binding-idiom` (verified per file). So W27 mis-collapses `proof:glass-material-sota` onto W22, mis-attributes `proof:glass-card-tiers` to W23, and folds W24/W25 into one slot. The five gate IDS are all named (so `gates:verify-ci` presence-check still passes), but the FINAL.md per-wave run-id crosswalk W27 §6/inv-27 promises ("a green run-id per wave," "D-row → wave → green-gate") is built on a wrong map. Fix: re-state the band mapping in `AW.W27-close.md:17,66,79` as `proof:glass-material-unified (W22)`, `proof:glass-material-sota (W23)`, `proof:glass-card-tiers (W24)`, `proof:primitive-affordance (W25)`, `proof:reka-binding-idiom (W26)`.

2. **{W12, refine — boundary wave, cross-cogency dissonance}** — W12 §3 scope bullet 3 (`AW.W12-glass-panel-fix.md:19`) and Hard Gate condition 3 (line 59: `grep -c 'light-dark(\s*light-dark(' ... returns 0`) demand collapsing a double-nested `light-dark(light-dark())` on the §8 `--glass-bg-*` tokens. This double-nest **does not exist at HEAD** — verified: `grep -c` returns 0 already; `tokens.css:645-651` carries single `color-mix(--card …)` and `--card` is one `light-dark()`. The band's own digest flags this three times as stale-and-strike (digest SYNTHESIS:5,17; Lane 2:261; and W24's own archaeology at `AW.W24-glass-cards.md:104` explicitly says "does NOT exist at HEAD… does not re-seed the stale claim"). W12 gate condition 3 is therefore **born-GREEN (a no-op), not born-RED** — it passes trivially and proves nothing, violating the WAVE_SPEC born-RED discipline. Fix: strike scope bullet 3 and Hard Gate condition 3 from W12 (the other four W12 conditions are real and born-RED). The whole-AW dissonance is that W24 knows the claim is stale but the committed W12 still carries it.

3. **{W26, nit}** — W26 §4a (line 69) states unit-a "owns toast/Toast.vue… No other unit writes these," which is true WITHIN W26 but elides that **W25 §3 bullet 7 also writes `Toast.vue`** (the flat→`glass-floating` material carve). The sequencing IS sound (W26 opens after W25; W25 §3a:37, §4a:70, §10:123 and W26 §10:161 all flag the boundary), so this is a sequential write not a race — but W26's §4a disjointness paragraph should name the W25-then-W26 `Toast.vue` two-pass to match the rigor of its other boundary notes (e.g. its `button/index.ts` vs W13 note at line 74). Cheap clarity fix.

4. **{scope note — NOT a defect}** — The prompt's "lock-removal (H.W6)" is a **slides-tranche (H) concern, absent from this glass-ui AW band.** AW references H only as cross-repo CONSUMERS (H.W1 consumes `DeckProgress` per W16; H.W2 `DeckGate` consumes the widened `[aria-invalid]` ring per W18:118; H.W10 constellation per W17). There is no H.W6 lock-removal wave in this repo to review; the deck-lock/`DeckGate` lock-glyph stays consumer-local (W18:118 "keeps its own lock-glyph"). If the lock-removal review is needed, it belongs to the slides repo, not the glass-ui AW tranche. Flagging so the orchestrator routes it correctly — no AW change.

**Born-RED check (band):** W22 gate (specular `::before` + rim absent on dialog/sheet/popover/overlay at HEAD), W23 (none of the four assets exist), W24 (Textarea-class — card has no `--card-spacing`, `CardAction`, hover-lift, or pointer-write; resting border sub-3:1), W25 (5+ atoms have no press transform, Checkbox always `<Check>`, Textarea `9999px`), W26 (36/37 roots lack `data-slot`, `--text-shadow-sm` is `(none)`, Toast re-emits six events + per-toast provider) — all REAL and born-RED, each with a runtime/render probe, not grep-only. Only W12 condition 3 (boundary wave) is born-GREEN per fix #2.

Files: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W27-close.md` (lines 17, 66, 79), `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W12-glass-panel-fix.md` (lines 19, 59), `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W26-reka-shadcn-tailwind-idiom.md` (line 69).

---

### Review 6

The picture is complete. Key observations on uniqueness:

- **W1 and W2 both own `proof:dock-animation-live`** — this is intentional (W1 establishes it for collapse-morph, W2 *widens the same gate* with opacity-lockstep conditions). This is the documented "ONE size authority across both paths" architecture, not a name collision. The W2 file body also introduces `proof:dock-opacity-lockstep`/`proof:dock-motion-parity` as additional gate names that the table doesn't surface — a sub-gate sprawl, but not a uniqueness violation (each names a distinct condition).
- **No two waves own conflicting headline gates** — uniqueness holds at the headline level. `proof:offscreen-pause` and `proof:blob-color-equivalence` recur across waves but as *inherited/stay-green* gates (W7/W8/W10 all keep `proof:offscreen-pause` green; W9/W11 both touch `proof:blob-color-equivalence`), which is correct (a pre-existing gate that multiple waves must not break).
- **W14 file does NOT disclaim orphan/metric-cell scope.** AW.md D-10 (line 45) and §2 W14 row (line 138) both assert "the `AW.W14-datatable-split.md` file is DataTable-split ONLY — it carries no orphan/metric-cell scope." The W14 file grep returned zero hits for orphan/metric — which actually *confirms* the file correctly carries no orphan scope. That's consistent (the absence IS the disclaimer-by-construction). Fine.

I now have everything. Let me compile the final conformance fix-list.

## CONFORMANCE FIX-LIST — AW + H tranche convergence review (READ-ONLY)

**Scope verified:** AW W0-W20 + W22-W27 (W21 retired, no file — correct) and H W1-W10. All 26 AW + 10 H wave files carry the full canonical WAVE_SPEC §1-11 section set (2a Goal, 3 Scope, 3a Triumvirate, 4 File Bounds, 4a Disjointness, 5 Agent Units, 6 Hard Gate, 7 Lint Cadence, 8 Verification Artefacts, 9 Commit Plan, 10 Dependencies all present). Born-RED claims for the band-F gates spot-verified against HEAD (Textarea 9999px pill, Checkbox always-`<Check>`, specular opt-in on exactly 3 sites, data-slot absent on family roots, no `corner-shape`/`glass-tint-source`). ≥2-consumer justification sound for DeckProgress / Constellation / gate-pattern; `.glass-material` is an internal DRY mixin (not a ≥2-consumer surface — correctly framed). W21-retired-in-renumber note consistent between AW.md (118-119) and W27 (116). No RECAP request uncovered. Gate-name uniqueness holds at the headline level.

The directive's check (2) — "each row's gate matches the wave's Hard-Gate (the recurring divergence — confirm it's now closed)" — is **NOT fully closed**. Four table-vs-file gate divergences survive in the `AW.md §2` charter table, and the W27 close (116) *acknowledges* the table had "fabricated names" yet defers reconciliation to gate-registration rather than fixing the table.

---

**BLOCKER — AW.W16 · table gate name is stale/wrong**
The `AW.md §2` table (`AW.md:140`) names W16's gate `proof:deck-progress-math`; the realized wave file declares `proof:deck-progress-rail` (`AW.W16-deckprogress.md:8`) and **explicitly deletes** the `deckProgress(index,total)` math helper + `/deck` subpath the old `-math` name implied (Archaeology §11, `AW.W16-deckprogress.md:116`). The table row body still describes the retired shape ("a `deckProgress(index, total)` total helper"). Fix: rewrite the `AW.md:140` W16 row — gate → `proof:deck-progress-rail`, and the "What" cell drop the `deckProgress()` helper + the "0-based index → 0..100 total function" language, replacing it with the `.glass-progress-rail` recipe + `:value`-only wrapper shape.

**BLOCKER — AW.W0 · table cites the wrong retire wave**
The `AW.md §2` W0 row (`AW.md:124`) says the spot-verify ledger records its verdict "for every **W14** retire candidate." The retire wave is **W19** (orphan-prune); W14 is DataTable-split-only (asserted by AW.md's own D-10 at `:45` and §2 W14 at `:138`). The W0 file is correct (`AW.W0-spot-verify.md:8` says "W19 retire candidate"). Fix: `AW.md:124` change "W14 retire candidate" → "W19 retire candidate."

**REFINE — AW.W12 · the table names a gate the wave file never declares**
`AW.md §2` (`AW.md:136`) names W12's gate `proof:glass-panel-tiers`, but that token appears **only** in AW.md — the W12 file's Hard-gate State line (`AW.W12-glass-panel-fix.md:8`) is a descriptive condition with **no `proof:*` id**, and `proof:glass-panel-tiers` is not declared anywhere in the file. Either the wave is missing its named gate (WAVE_SPEC §2 wants a one-line evidence summary; the §6 Hard Gate should carry the falsifiable id the table promises) or the table over-names. Fix: add the `proof:glass-panel-tiers` gate id to the W12 file's State Hard-gate line + §6 (matching the table), OR strike the name from `AW.md:136` and state W12's gate descriptively like W14/W15. Recommend the former (a real proof script for the 5-distinct-`--glass-bg` render-capture).

**REFINE — AW.W1/W2 dock band · gate-name sprawl unreconciled in the charter table**
The W2 file body introduces `proof:dock-opacity-lockstep` (`AW.W2:166,215`) and `proof:dock-motion-parity` (`AW.W2:168`); the W1 file references `proof:dock-motion-single-source` (`AW.W1:161`) — none of which appear in the `AW.md §2` W1/W2 rows (which name only `proof:dock-animation-live` ± `proof:spring-tokens-synced`). The W27 close (`AW.W27:116`) openly states the table carried "fabricated names" that "are reconciled to the realized gates" at registration — but the charter table is the artifact the directive asks to be matched, and it is **not** reconciled. This is the "recurring divergence" the directive flags. Fix: reconcile the `AW.md §2` W1/W2/W16/W12 gate cells to the realized wave-file ids before close (the W27 deferral to `gates.mjs` registration does not satisfy "the table's gate matches the wave's Hard-Gate").

**REFINE — AW.W23 · two-source-of-truth on the refraction filter (DRY, vs HEAD)**
W23 ships a *static* `#glass-refract` SVG filter node, but HEAD already generates `glass-refract-${filterCounter++}` ids at runtime in `useGlassRenderer.ts:146`, and `glass-specular-track.css:151` consumes the un-suffixed `url("#glass-refract")`. W23's "Do NOT touch: `src/composables/glass/`" (`AW.W23:42`) walls off the renderer, so the wave lands a second refraction-filter source without reconciling which `#glass-refract` the CSS resolves against (the static node vs the counter-suffixed runtime ids). Per inv-P4 (DRY) + inv-P1 (no parallel source), W23 should either (a) note `useGlassRenderer`'s runtime generator as the existing single source and ship the static node as its canonical extraction, or (b) explicitly scope the reconciliation. Fix: add a §3 scope bullet (or Archaeology note) reconciling the static `#glass-refract` asset with the `useGlassRenderer.ts:146` runtime `glass-refract-N` generator — one filter-id source, not two. (Born-RED itself is sound: no *static shipped* node exists at HEAD.)

**NIT — AW.W23 born-RED wording precision**
The W23 gate says "none of the four assets exist ... no shipped `#glass-refract` node" (`AW.W23:8`). True for the *static shipped* node, but `.glass-refract` (the class), the `@supports (backdrop-filter: url("#glass-refract"))` gate, and a runtime filter generator **do** exist at HEAD (`glass-specular-track.css:144`, `useGlassRenderer.ts:146`). The wording is defensible (the digest at `glass-atoms-digest.md:27,146` characterizes it identically) but a reader could mis-read "no node exists." Fix (optional): tighten to "no *static library-shipped* `#glass-refract` node (the HEAD `.glass-refract` garnish requires the runtime-mounted/consumer-mounted filter)."

---

**Adversarial verdict on the band-F substance (challenge (a)-(f)):** the five glass-atoms waves (W22-W26) trace cleanly to the digest SYNTHESIS, fix the cited HEAD defects (each born-RED verified against source), and are genuinely DRY-consolidation (route-onto-existing-spine, not rewrite) — they do **not** re-do W12 glass-panel-fix / W13 affordance / W14 datatable / W15 hygiene: W22-W26 explicitly sequence *after* and *compose over* W13's affordance tokens and W12's backdrop (`AW.md:168-176`, `AW.W22:46`, `AW.W25` re-asserts W13 floors uniformly rather than re-owning them). The named affordance bugs stay owned by W13/W18 (no double-ownership). Design-cogency holds (warm-cream + iOS-26 + NCSU-red-consumer-layered; Tailwind-v4.3-not-v5 recorded at `AW.md:49,283`; reka ^2.9.7 idiom-only). Canonical shape holds (all sections present). The only convergence defects are the four charter-table gate divergences above — the recurring table-vs-file drift is **real and not yet closed in the AW.md charter**.

Fix the two BLOCKERs (W16 + W0 table cells) and the W12/dock-band gate-name reconciliation (REFINE) and this converges. The H tranche is **CONVERGED** (10/10 canonical sections, table gates match the evidence-check descriptions, no `proof:*`-runner mismatch since H ships none, ≥2-consumer + lock-removal supersession all consistent with RECAP ADDENDUM 2).
