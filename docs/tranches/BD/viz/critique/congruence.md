# BD viz/glass/dock EXPANSION — CRITIQUE: WHOLE-EXPANSION CONGRUENCE (the gestalt-hardening)

**Lane** BD viz / critique / congruence · **Status** ADVERSARIAL CRITIQUE 2026-06-22 · **Branch** `prototype/liquid-dock` · **Scope** PLANNING AUDIT — zero `src/` edits, WRITE-only.
**Audited:** `VIZ-BAND-PLAN.md` (D1-D9 + V0-V4 + critique-fold pass 1/1b) · `VIZ-DAG.md` · `fleet2/*` · `research/*` · `audit/*` · `critique/{field-engine,dock-hub-generality,gpu-only,blob-redevelop,generalize-no-hardcoded,design-language-congruence}.md` · the converged **BD union** `union/{SEED,UNIFIED-ROSTER,EXECUTION-DAG,DEFERRED-CENSUS}.md` · CLAUDE.md · the on-disk codebase (`src/composables/motion/`, `src/composables/glass/`, the dock + aurora + goo-blob trees).
**Verdict bar:** is the WHOLE V-expansion CONGRUENT to the converged BD union + the full design language, or does it introduce dissonance (a SECOND parallel tranche, DRY/KISS/no-legacy breaks, encapsulation violations)?

---

## 0. The one-line verdict

**The V-expansion is a SECOND, UN-FOLDED TRANCHE living beside the converged 61-wave union — the exact two-parallel-systems disease the union was built to kill, recurring one level up at the tranche-roster axis.** None of the 12 net-new V-waves appear in the canonical `UNIFIED-ROSTER.md`/`EXECUTION-DAG.md`/`SEED.md`; the "~73-wave union" headline is a count claim with NO executed fold. Worse, the V-band CONTRADICTS the union at the mechanism level (it composes an engine the union DELETES), DOUBLE-OWNS the dock-wire work the union already canonicalized, and re-introduces the dual-name no-legacy breaks the union's own `W-SPIKE-DELETE`/`W-FOLD-LEDGER` discipline forbids. The internal critiques (field-engine, dock-hub, generalize, design-language) each found a real local incongruence; this critique finds the SYSTEMIC one they each saw a face of: **the expansion was never reconciled into the converged set — it is dissonant by construction.**

---

## 1. THE CARDINAL INCONGRUENCE — the V-expansion is not folded; it is a parallel roster

The `VIZ-DAG.md:3` headline asserts "~73-wave unified tranche = the converged BD union (61) + the V-expansion (~12 net-new)." **This fold was DECLARED, never EXECUTED — verbatim the D7-disease the generalize critique already condemned, applied to the WHOLE expansion.**

Grep-verified against the canonical union docs (`UNIFIED-ROSTER.md` + `EXECUTION-DAG.md` + `SEED.md`):

| V-wave (net-new) | hits in the union canonical set |
|---|---|
| `W-GPU-ONLY-SPINE` | **0** |
| `W-FIELD-ENGINE` | **0** |
| `W-EMOTION-PRIMITIVE` | **0** |
| `W-LAVA-FIELD` | **0** |
| `W-VIZ-INTERACTION-SPINE` | **0** |
| `W-VIZ-CONFIGURATOR` | **0** |
| `W-DOT-UNIFY` | **0** |
| `W-BLOB-REDEVELOP` | **0** |
| `W-CONCENTRIC-LEVELSET` | **0** |
| `W-AUR-METAL` | **0** |
| `W-DOCK-WIRE` | **0** |
| `W-DOCK-SEQUENCE` | **0** |

Every single net-new V-wave is ABSENT from the union roster, DAG, and SEED. The `union/DEFERRED-CENSUS.md` — the no-silent-drop machine that is SUPPOSED to DECIDE every deferred/chronic item — has **ZERO rows** for field-engine, emotional-state, lava-field, viz-interaction, viz-configurator, dot-unify, or VizStudio. The entire VT0/VT1 framework band (the most architecturally-load-bearing waves: the GPU-only spine, the shared field engine, the two reusable primitives, the interaction facade, the studio chassis) is un-reconciled against the converged set. The union's own charter (`SEED.md §charter 1`: "rename everywhere in ONE pass; no alias/shim/dual-path") is violated by the existence of two rosters that disagree.

**This is not a documentation lag — it is a structural fork.** The union was converged through "research → plan → tranche-write → ruthless hardening → 2-consecutive-clean" (`SEED.md`). The V-expansion ran its OWN parallel research→plan→critique loop in `viz/` and produced a SECOND wave set that overlaps, contradicts, and double-owns the first. The honest state is ONE of: (a) the V-expansion SUPERSEDES the union's viz/dock bands (then the union roster MUST be re-cut, not left stale), or (b) the V-expansion FOLDS in (then every V-wave needs a `UNIFIED-ROSTER.md` row + a `DEFERRED-CENSUS.md` disposition + a DAG node). The current "~73" headline picks NEITHER — it asserts the fold happened while the canonical artifacts prove it did not.

**FIX:** ONE roster. Either re-cut `UNIFIED-ROSTER.md` to the ~73-wave set (every V-wave a canonical row, every union viz-band wave reconciled against its V-counterpart) OR demote the V-band to an amendment-layer with a per-wave fold-disposition in `DEFERRED-CENSUS.md`. The `~73` count cannot stand until exactly ONE artifact is the authority and it enumerates all of them.

---

## 2. NO-LEGACY — the V-expansion CONTRADICTS the union's clean-break decisions

### INC-1 (the smoking gun) — the V-band composes `useLiquidMorph`, which the union DELETES

This is the cleanest, most load-bearing dissonance:

- **Union `W-SPIKE-DELETE` (T1, `UNIFIED-ROSTER.md:29` + `EXECUTION-DAG.md:20`):** *"Delete the `useLiquidMorph` spike; relocate `liquid-morph.css` to `demo/`; `proof:no-dual-path` GREEN."* The union's #1 charter (no-legacy / one FLIP runner) DELETES `useLiquidMorph` and folds onto the ONE `useElementBloom`/`useLiquidReveal` spine in T1, before any wiring.
- **V `W-CARD-SHEET-EXPAND` (`VIZ-DAG.md:38` + `VIZ-BAND-PLAN.md:87,95`):** *"`useLiquidMorph.expand` + `--maps-backdrop-dim`"* — composes `useLiquidMorph` as its expand engine, in a tier AFTER T1.

**The V-expansion builds a feature on an engine the union has already deleted.** A wave cannot compose `useLiquidMorph.expand` in VT3 when T1 relocated `useLiquidMorph` to `demo/` and `proof:no-dual-path` is GREEN against its absence. The dock-hub critique (`critique/dock-hub-generality.md §3,§5 H5`) and the VIZ-BAND-PLAN's own pass-1b D9(c) already flagged "two bloom engines (`useLiquidReveal` vs `useLiquidMorph`) is a DRY violation" — but the union RESOLVED it (delete `useLiquidMorph`), and the V-DAG IGNORED the resolution and re-asserted the deleted engine. On-disk confirms 4 bloom-ish rAF runners (`useLiquidReveal`, `useLiquidMorph`, `useBloomUp`, `useDockCtaReceive`) — the union collapses to ONE; the V-band keeps the second alive.

**FIX:** `W-CARD-SHEET-EXPAND` MUST compose the union's surviving spine (`useElementBloom`/`useLiquidReveal` — the source-rect bloom over a reserved footprint is expressible as a `useLiquidReveal` preset). Strike `useLiquidMorph` from every V-doc. The "reserved-footprint expand" is a `useLiquidReveal` OPTION, not a second engine (this is exactly the FLIP-SPINE one-runner fence the union T1 enforces).

### INC-2 — the dual-name no-legacy breaks the generalize critique flagged are STILL in the V-DAG

The generalize critique (`critique/generalize-no-hardcoded.md §0,C1-C3`) found `W-MAPS-CARD-EXPAND`/`W-DOCK-ALBUM-STAGE`/`--maps-backdrop-dim` coexisting with their renamed forms. **Re-verified at HEAD: still live.** `VIZ-DAG.md:38` carries `--maps-backdrop-dim` AND `VIZ-DAG.md:35` carries `W-DOCK-ALBUM-STAGE`/`album-art field` AND `VIZ-DAG.md:54`'s authoritative net-new count STILL lists `MAPS-CARD-EXPAND` + `DOCK-ALBUM-STAGE`. The pass-1b D7 finding ("kill the dual-name coexistence in VIZ-DAG.md — no-legacy") was WRITTEN INTO THE PLAN but never EXECUTED on the DAG. A plan that records "fix the dual-name" and then keeps the dual-name in its own authoritative count is the disease eating its own tail.

**FIX:** purge the old names from `VIZ-DAG.md` (the authoritative count line :54 especially) IN THE SAME PASS that mints the generalized names. A rename that leaves the old name in the count is not a rename.

### INC-3 — the no-legacy-hunt audit CONTRADICTS D1/the union on the `.glsl` twins

`audit/no-legacy-hunt.md` (TIER 2 S2/S3, TIER 4 D2) mandates DELETING every `.glsl.ts` WebGL2 shader twin + retiring `proof:gpu-substrate-single` ("ONE shader per viz, not two"). `VIZ-BAND-PLAN.md` D1 + `VIZ-DAG.md:7,51` + `gpu-only.md:41` explicitly KEEP the `.wgsl`↔`.glsl` twins ("Safari-first absolute — the WebGL2 arm IS the Safari path, NOT deletable"). **Two BD-viz planning docs give OPPOSITE clean-break instructions on the single highest-blast-radius decision (purge vs keep the WebGL2 backend).** The gpu-only critique sided with KEEP (`gpu-only.md:41`), but `no-legacy-hunt.md` was never reconciled to that verdict — it still reads as a binding audit mandating the delete. An executor reading `no-legacy-hunt.md` first deletes the Safari path and breaks the absolute fence.

**FIX:** reconcile `no-legacy-hunt.md` to the KEEP verdict (the twins are TWO GPU backends, both in-mandate; only the Canvas2D/CSS/swraster CPU tier is the legacy). Strike S2/S3/D2's "delete the .glsl twin" — they fight D1 and the Safari-absolute fence. The no-legacy-hunt's TIER-1 Canvas2D deletes are correct; its TIER-2 twin-deletes are the over-reach.

---

## 3. DRY — two waves minting the same, two waves owning the same dock work

### INC-4 (double-ownership) — D5's `W-DOCK-WIRE` duplicates the union's `W-SILHOUETTE-REALIZE` + `W-DOCK-LINK-API`

The V-expansion mints `W-DOCK-WIRE` (D5, `VIZ-DAG.md:34`) to *"compose engines INTO GlassDock · export the STRANDED `useDockContextSilhouette` · mint `useDockLink`."* **Every one of those three jobs is ALREADY a canonical union wave:**

- "export the stranded `useDockContextSilhouette`" ≡ union `W-SILHOUETTE-REALIZE` (T2, `UNIFIED-ROSTER.md:39`: *"DECIDE-don't-rebook `useDockContextSilhouette`: wire bar/bar+pill/split/search … OR retire"*). On-disk confirms the silhouette IS stranded (the function is `export`ed but the grep for call-sites is empty) — but the union already OWNS the decide-or-retire.
- "mint `useDockLink`" ≡ union `W-DOCK-LINK-API` (T2, `UNIFIED-ROSTER.md:42`: *"`useDockLink(dockRef, { fission, silhouette })` — toSurface/split/silhouette/receive over the ONE FLIP spine"*). The union's version is STRICTER (it FORBIDS the `[data-reka-popper-content-wrapper]` internal-selector path, composes the shipped `useElementBloom` not an inline `runBloom`, and carries the C5 living-census). The V-version is a thinner re-description.
- "compose engines INTO GlassDock" ≡ union `W-DOCK-INTEGRATE` (T2) + `W-JUBILANCE-WIRE` (T2, wires the dead haptic/celebration/idle engines onto real call-sites).

So `W-DOCK-WIRE` is THREE union waves wearing one V-name. It is a DRY violation at the wave-roster level: two waves (V `W-DOCK-WIRE` + union `W-SILHOUETTE-REALIZE`/`W-DOCK-LINK-API`) mint/wire the same composables. The dock-hub critique already proved D9's "consumers" don't call the hub; this critique adds that D9's PREREQUISITE wave is itself a duplicate of work the union canonicalized.

**FIX:** DELETE `W-DOCK-WIRE`. Its three jobs are union `W-SILHOUETTE-REALIZE` + `W-DOCK-LINK-API` + `W-DOCK-INTEGRATE`/`W-JUBILANCE-WIRE` — sequence the V dock-hallmark waves (`W-DOCK-SEQUENCE`, `W-DOCK-CONTENT-FIELD`) AFTER those existing union T2 waves, not after a duplicate prereq. The union's `W-DOCK-LINK-API` is the stricter spec — keep it, adopt the dock-hub critique's H1-H5 hardening into IT.

### INC-5 — `useVizInteraction` vs `usePointerVelocityField` (the framework critique double-checks)

`W-VIZ-INTERACTION-SPINE` mints `useVizInteraction` (a "facade: pointer + keyboard + the 6 primitives," `VIZ-DAG.md:22`). On-disk, `usePointerVelocityField` ALREADY IS the shared viz-pointer-physics field (position+velocity+acceleration+flick-burst, root-barrel-published, consumed by fourier-field, paper-grid, concentric, goo-dot-matrix — the ≥2-consumer bar long met, per CLAUDE.md §"The shared viz-pointer-physics field"). The V-spec frames `useVizInteraction` as composing pointer + keyboard, but the pointer half EXISTS and is wired into 6 viz; the only genuinely-new half is `useVizKeyboard` (`W-VIZ-KEYBOARD`, "the zero-keyboard suite gap"). A facade that RE-WRAPS a shipped, already-≥2-consumer primitive to add a second concern (keyboard) is a KISS smell: the keyboard primitive should compose BESIDE `usePointerVelocityField`, not a god-facade subsuming it. The dock-hub critique's "no fifth rAF / compose the shipped spine" fence applies: `useVizInteraction` must COMPOSE `usePointerVelocityField` (not re-derive pointer dynamics), and the keyboard arm is the only net-new code. As specced ("the unified pointer + keyboard"), it risks re-forking the pointer field the suite already shares.

**FIX:** scope `W-VIZ-INTERACTION-SPINE` to "compose the SHIPPED `usePointerVelocityField` + the new `useVizKeyboard`" — the facade owns ZERO pointer-dynamics code, it WIRES the two. Assert it in the gate (a re-derived pointer-velocity sampler inside `useVizInteraction` REDs — the createSpecularWriter single-source precedent).

### INC-6 — `useEmotionalState` vs `useBlobMood` / `useLavaField` (the hoist + the contrived consumer)

Two DRY-adjacent findings the blob critique already proved, restated as congruence dissonance:
- `useEmotionalState` HOISTS `useBlobMood` (`D3`, on-disk `goo-blob/composables/useBlobMood.ts`). The hoist is a clean-break, but the blob critique (`critique/blob-redevelop.md`) found the affect surface drives ALL motion off `arousal` ALONE (CALM≈MELANCHOLY) — so the hoist promotes a 1-axis speed-dial as if it were the "4 creatures ≥3-axis" framework. Hoisting a primitive whose own implementation doesn't honor its contract is a congruence break: the framework's PROMISE (4 separable circumplex quadrants) is not in the code it hoists.
- `useLavaField`'s ≥2-consumer bar is CONTRIVED (blob critique §4): the named 2nd consumer (the dock "goo-split") is a CSS `feGaussianBlur` SVG filter, an INCOMPATIBLE mechanism for a GPU smin field. The honest count is ONE (the blob) → fails J-inv-10. The real 2nd GPU-SDF consumer is goo-dot-matrix (`sceneDistG` splice), which the plan names elsewhere but not as the lava consumer.

**FIX:** (a) `W-EMOTION-PRIMITIVE` must RE-AUTHOR the valence→motion wiring (not just hoist), so the hoisted primitive honors the 4-creature contract before it ships as a framework; (b) `W-LAVA-FIELD`'s 2nd consumer is goo-dot-matrix (the real GPU-SDF consumer), NOT the dock CSS-filter goo-split — or do not abstract `useLavaField` as a shipped primitive (keep the lava read blob-local).

---

## 4. KISS — is the framework band worth its complexity?

The VT1 framework band (`W-EMOTION-PRIMITIVE` · `W-LAVA-FIELD` · `W-VIZ-CONFIGURATOR`/`<VizStudio>` · `W-VIZ-KEYBOARD` · `W-VIZ-INTERACTION-SPINE`/`useVizInteraction`) is FIVE new reusable abstractions minted at once. The KISS test (charter 4) is per-abstraction:

- **`useEmotionalState` — JUSTIFIED IF re-authored** (≥2 real consumers blob+aurora named, a genuine shared affect vocabulary). KEEP, conditional on INC-6(a).
- **`useLavaField` — NOT JUSTIFIED as specced** (1 honest consumer; the 2nd is incompatible). Either re-point to goo-dot-matrix or keep blob-local. The blob critique's verdict stands.
- **`<VizStudio>` (`W-VIZ-CONFIGURATOR`) — OVER-ENGINEERED RISK.** The design-language critique (`critique/design-language-congruence.md INC-5`) already found VizStudio risks a two-live-GL-context breach + is golden-ratio/paper-blind. The deeper KISS question: the suite ALREADY has a configurator pattern (the existing studios compose `<Configurator>` + `StoryPage`). A NEW schema-driven `<VizStudio>` chassis wrapping the EXISTING `<Configurator>` is a second configurator abstraction. Is the schema-fan-out worth a new chassis, or is it `<Configurator>` + a per-viz schema CONSTANT? The plan never proves the new chassis earns its keep over the shipped `<Configurator>` it wraps — the AZ.W-HIERARCHY golden vocabulary already lives in `<Configurator>`; VizStudio re-wrapping it risks a parallel hierarchy. CONDITIONAL: prove `<VizStudio>` is not a redundant wrapper over `<Configurator>` (it must add the schema fan-out WITHOUT re-authoring the configurator's golden hierarchy — compose, don't re-mint).
- **`useVizKeyboard` — JUSTIFIED** (genuine zero-keyboard suite gap, composes `/keyboard`). KEEP.
- **`useVizInteraction` — JUSTIFIED ONLY as a thin compose-facade** (INC-5) — owns zero pointer code, wires the shipped field + the new keyboard. A god-facade re-deriving pointer dynamics is NOT justified.

**Net:** the framework band is ~60% justified, ~40% over-reach. The KISS fence (charter 4 "one facade per facility") is met by `useVizKeyboard`/`useEmotionalState` (re-authored), AT RISK on `useVizInteraction` (compose-not-subsume), and FAILS on `useLavaField` (contrived consumer) + `<VizStudio>` (un-proven over the shipped `<Configurator>`).

---

## 5. ENCAPSULATION — the feature-dir violation the plan half-sees

The field-engine critique (`critique/field-engine.md §5`) found `procedural-color.wgsl.ts` lives under `aurora/constants/shaders/` — a SHARED color chunk cross-imported from a FEATURE dir. **On-disk confirmed:** the GLSL twin is correctly homed (`src/composables/glass/webgl/shaders/procedural-color.glsl.ts`) but the WGSL twin is mis-homed (`src/components/custom/aurora/constants/shaders/procedural-color.wgsl.ts`). So the "shared" color math has ONE arm in the shared dir and ONE arm buried in aurora's feature-dir — a split-home encapsulation violation (charter 5: "feature-dir colocation; every engine ships into a real SFC"). The `W-FIELD-ENGINE` plan proposes to MINT `field/{noise,wave,flow,color}` in the shared dir but does NOT first FIX the existing mis-home — it builds the new shared engine BESIDE a shared chunk that is itself mis-encapsulated.

A second encapsulation concern the framework band raises: charter 5 says "every engine ships into a real SFC." `useEmotionalState`/`useLavaField`/`useVizInteraction` are minted as VT1 primitives — the plan must prove each ships into a REAL SFC at birth (not a demo-only exerciser), or it is substrate-without-consumer (J-inv-10). `useLavaField` already FAILS this (INC-6); the others need the ≥2-SFC binding named at mint.

**FIX:** (a) re-home `procedural-color.wgsl.ts` → `src/composables/glass/webgl/shaders/` (or the new `field/`) as its OWN clean-break step BEFORE `W-FIELD-ENGINE` mints beside it (the field-engine critique's §7.5 ask — make it a prerequisite, not an "optional" rider); (b) every VT1 primitive names its ≥2 real-SFC consumers at mint, gate-asserted.

---

## 6. CONGRUENCE TO THE FULL DESIGN LANGUAGE (D8) — defer to the standing critique, add the union angle

The design-language critique (`critique/design-language-congruence.md`) already ruled D8 PAPER-BLIND / TYPE-INCIDENTAL / GOLDEN-RATIO-SILENT and proposed `W-DESIGN-LANGUAGE-CONGRUENCE` + the clause-designed gate. I do not re-litigate it; I ADD the union-congruence dimension it could not see (it audited the V-docs, not the union fold):

- **The union ALREADY carries the golden/type/paper hardening the V-band drops.** The union's `W-DEMO-BREADTH` (T9) modernizes the demo pages (data-band drain, page-header fold, off-token sweep) and the BC baseline ships the golden card-pad ladder, the −1.5% Apple tracking, the suffusion proportion. The V-band's all-glass myopia is not just a D8 miss — it is a REGRESSION against work the union's own breadth band already canonicalized. The freshest hardening (recency-weighted, D8's second half) lives in the UNION; the V-band ignoring it is the union/V dissonance at the design-language axis.
- **The hallmark "richer-than-reference" bar (`dock-sequence-hallmark.md`) omits the union's breadth.** The union's identity is glass+paper+audacious-type+golden-ratio; the V hallmark bar measures glass/motion only. The richer-than-Apple claim IS the other pillars — which the union holds and the V-band's hallmark bar drops.

**FIX:** adopt the standing `critique/design-language-congruence.md §4` `proof:design-language-congruence` (DLC-1..6) AND scope it to read the UNION's golden/type/paper registers as the bar (not a V-local re-mint). The congruence gate measures the V-surfaces against the union's EXISTING design-language tokens — congruence to the converged set, not a parallel design language.

---

## 7. WHAT IS CONGRUENT (fairness)

- **The GPU-only spine direction is sound** (`gpu-only.md` CONDITIONAL-ACCEPT): the async-select de-overload + the Canvas2D/CSS/swraster purge are the right clean-break, and the `.wgsl`↔`.glsl` twin-KEEP is correct (modulo INC-3's reconcile of `no-legacy-hunt.md`).
- **The field-engine DRY debt is genuine** (`field-engine.md §1`): the `9.81`/`CURL_EPS`/noise-basis forks are real; the shared-chunk precedent is sound. The hoist is RIGHT in principle (narrowed per that critique).
- **`toSurface`→`useLiquidReveal` IS surface-agnostic** (`dock-hub-generality.md §1`): the half of D9 that holds is genuinely the union's one-FLIP-runner model done right.
- **The dot-unify (D4) is a clean DRY win** in principle (3 dot vizzes → ONE projection×target) — provided it folds into the union's roster as a canonical wave (INC-1).
- **The per-viz redevelopments (concentric-levelset, papergrid-warp, blob-redevelop split) are sound engineering** once their over-reaches (field-engine §3 wave-defer, blob §SPLIT) are folded.

The expansion is NOT a write-off — it is well-researched and the per-wave engineering is mostly sound. The dissonance is at the ROSTER/FOLD axis, not the engineering axis.

---

## 8. THE BINDING REMEDIATION (what the fold must fix before 2-consecutive-clean)

1. **ONE roster (INC-1, cardinal).** Re-cut `UNIFIED-ROSTER.md`/`EXECUTION-DAG.md`/`DEFERRED-CENSUS.md` to enumerate ALL ~73 waves with a disposition per V-wave, OR demote the V-band to an amendment layer with per-wave fold-rows. The `~73` count cannot stand on a stale 61-wave union. ONE authority.
2. **Strike `useLiquidMorph` from the V-band (INC-1/INC-4).** `W-CARD-SHEET-EXPAND` composes the union's surviving `useLiquidReveal`/`useElementBloom` spine (reserved-footprint = a preset, not a second engine). The union's `W-SPIKE-DELETE` is binding.
3. **DELETE `W-DOCK-WIRE` (INC-4).** Its three jobs are union `W-SILHOUETTE-REALIZE` + `W-DOCK-LINK-API` + `W-DOCK-INTEGRATE`/`W-JUBILANCE-WIRE`; adopt the dock-hub critique's H1-H5 into the union's `W-DOCK-LINK-API`, sequence the V dock-hallmark waves after the union T2 dock band.
4. **Purge the dual-names from VIZ-DAG.md (INC-2).** Especially the authoritative count line :54 — execute the pass-1b D7 rename, don't just record it.
5. **Reconcile `no-legacy-hunt.md` to the twin-KEEP verdict (INC-3).** Strike S2/S3/D2's ".glsl twin delete" — they fight D1 and Safari-absolute. Keep its correct Canvas2D TIER-1 deletes.
6. **Scope the framework band to compose-not-subsume (INC-5/INC-6, §4).** `useVizInteraction` composes the shipped `usePointerVelocityField`; `useEmotionalState` re-authors valence→motion before it ships; `useLavaField`'s 2nd consumer is goo-dot-matrix or it stays blob-local; prove `<VizStudio>` isn't a redundant `<Configurator>` wrapper.
7. **Re-home `procedural-color.wgsl.ts` as a prerequisite (§5).** The shared chunk lands in the shared dir before `W-FIELD-ENGINE` mints beside it; every VT1 primitive names its ≥2 SFC consumers at mint.
8. **Adopt `proof:design-language-congruence` scoped to the UNION registers (§6).** Congruence to the converged set's golden/type/paper tokens, not a V-local design language.

---

## VERDICT (5-7 lines)

The V-expansion is a SECOND, UN-FOLDED tranche living beside the converged 61-wave union — the two-parallel-systems disease the union exists to kill, recurring at the roster axis. ALL 12 net-new V-waves are ABSENT from the canonical `UNIFIED-ROSTER.md`/`EXECUTION-DAG.md`/`DEFERRED-CENSUS.md`; the "~73-wave" headline is a fold DECLARED but never EXECUTED (zero V-waves enrolled, zero deferred-census dispositions). The dissonance is mechanism-deep: `W-CARD-SHEET-EXPAND` composes `useLiquidMorph` — the EXACT engine the union's T1 `W-SPIKE-DELETE` DELETES (no-legacy break, two bloom engines where the union mandates ONE), and `W-DOCK-WIRE` (D5's prereq) DOUBLE-OWNS the union's `W-SILHOUETTE-REALIZE` + `W-DOCK-LINK-API` + `W-DOCK-INTEGRATE` (three canonical waves wearing one V-name, a roster-level DRY violation). The dual-name no-legacy breaks the generalize critique flagged (`W-MAPS-CARD-EXPAND`/`W-DOCK-ALBUM-STAGE`/`--maps-backdrop-dim`) are STILL in `VIZ-DAG.md`'s authoritative count, and `no-legacy-hunt.md` CONTRADICTS D1/the union on the highest-blast-radius call (delete vs KEEP the `.glsl` Safari twins). KISS: the VT1 framework band is ~40% over-reach (`useLavaField` contrived consumer, `useVizInteraction` risks re-forking the shipped `usePointerVelocityField`, `<VizStudio>` un-proven over the shipped `<Configurator>`). Encapsulation: `procedural-color.wgsl.ts` is mis-homed in aurora's feature-dir, un-fixed before `W-FIELD-ENGINE` mints beside it. The engineering is sound; the FOLD is not — FIX is §8: ONE roster, strike `useLiquidMorph`, delete `W-DOCK-WIRE`, purge the dual-names, reconcile the twin verdict, compose-not-subsume the framework band, and scope congruence to the union's own design-language registers.
