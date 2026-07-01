# LENS C2 — BG plan critique: WS4 · WS5 · WS6

**Audit:** RESPEC-GESTALT pass-1 · **Branch:** `tranche/BG` · **HEAD:** `976dc890` · **Base:** v4.2.0 · **Date:** 2026-07-01
**Charge:** verdict-per-wave over WS4 (components/demo/encapsulation, 25 rows), WS5 (viz refinement, 9+2 booked),
WS6 (Siri capabilities, 4 rows). Extra attention: WS5 viz/subpath work, WS6 dependency-floor/peer moves, and any
wave whose spec **predates the two audit folds** and now half-duplicates a fold amendment. All claims verified on disk.

---

## VERDICT

The three workstreams are **directionally correct and mostly well-shaped** — WS5 and the WS4 motion-collapse band
are the *anti*-over-contrivance direction the mandate wants (WS5 deletes ≥2500 LOC of WebGPU viz duplication; WS4's
`FLIP-ONE` folds three FLIP composables onto one runner; the splits drain real god-modules). This is not a
disaster band. But three quality defects sit inside it that are exactly the user's named failure modes:

1. **`BG.W-DEAD-COMPOSABLE-CUT` (WS4 10.5) is ~90% a double-claim shell.** All three of its named delete targets
   are owned by *other* waves — `useLiquidMorph` → `BG.W-SPIKE-DELETE` (WS7), `useVizChoreography` →
   `BG.W-VIZ-REVEAL-BLOOM` (WS5), `useDockContextSilhouette` → `BG.W-DOCK-CUT` (WS2) — and its `useMorphField`
   gut-and-rehome is *also* SPIKE-DELETE's. Its spec text predates the G7-P1 coherence fold that reassigned
   ownership and was never rewritten. A build agent reading row 10.5 verbatim re-attempts deletes already done by
   three sibling waves. This is wave-granularity-as-disease + the "spec predates the fold" class made concrete.

2. **WS6 mints a whole new component family + a net-new WebGL viz + 4 new gates for a user directive that said
   "AUGMENT the GlassDock (not a new component)."** The Siri work is genuinely user-requested (C-SIRI ★★), but the
   build-map realization contradicts its own directive on the island's encapsulation and ships an 18th-aurora-class
   viz gate (`proof:siri-waveform`) for a decorative flourish whose ≥2-consumer bar is un-evidenced.

3. **The dead-primitive prune is incomplete and one of its adjudications is false-on-disk.** `useCelebrationBurst`
   (0 real consumers) is KEPT by `BG.W-JUBILANCE-DECIDE` claiming "2 consumers" — disk shows zero. The
   pointer-physics 5-way duplication (B7 F4) is untouched by any WS4-6 wave. Neither the dead-cut wave (10.5) nor
   the split band closes them.

The dependency-floor/peer axis I was told to scrutinize is, by contrast, **well-calibrated** — the coherence folds
(G4/G6) already caught the live kf-`snap:`-vs-`^5.0.0` gap and the value.js `^1.1.1` floor-lift, centralized the
sole `package.json` writer in BH B2.1-swap, and own the enforcement clause in `BG.W-GATE-FIELD-AURORA`. One
residual: the gap is **live and un-gated at HEAD** and rides the entire tranche unenforced until WS7.

---

## FINDINGS (ranked by severity)

### F1 — MAJOR (over-contrivance / stale-spec): `BG.W-DEAD-COMPOSABLE-CUT` (WS4 10.5) triple-duplicates three sibling waves; spec never rewritten after the G7-P1 fold

Row 10.5 (`bg-build-map.md:442-445`) reads: *"`useLiquidMorph` + `useVizChoreography` + `useDockContextSilhouette`
DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts`; delete `morph-field.css`."* Every named target
except one is owned by a different wave:

| target | claimed by 10.5 | actual owner | evidence |
|---|---|---|---|
| `useLiquidMorph` (462L) delete | yes | **`BG.W-SPIKE-DELETE`** (WS7 12.1) | `bg-build-map.md:644` — *"`useLiquidMorph` (462L) delete"* |
| `useMorphField` gut → `morphSignatures.ts` | yes | **`BG.W-SPIKE-DELETE`** (WS7 12.1) | `bg-build-map.md:644-645` — *"`useMorphField` gut-and-rehome (`morphSignatures.ts` + 5 re-points)"* |
| `useVizChoreography` (425L) | yes | **`BG.W-VIZ-REVEAL-BLOOM`** (WS5 6.4) | `bg-build-map.md:364` — its *gate* IS `useVizChoreography.ts DEFINITION-ABSENT`; row 10.5 own precond names *"`useVizChoreography` WS5-first"* (`:444`) |
| `useDockContextSilhouette` (551L) | yes | **`BG.W-DOCK-CUT`** (WS2 4.3) | `bg-build-map.md:274` — *"delete `useDockContextSilhouette` (551L, 0 consumers)"*; row 10.5 precond names *"`useDockContextSilhouette` WS2-coord"* (`:445`) |
| delete `morph-field.css` | yes | **10.5 (the sole unique residue)** | `src/styles/motion/morph-field.css` exists on disk; no other wave names it |

The G7-P1 coherence fold (`bg-build-map.md:236`) explicitly states *"`liquid-morph.css` double-ownership resolved
to ONE wave"* and made SPIKE-DELETE *"the WHOLE-FILE move owner"* — but it resolved only the CSS file, not the
`useLiquidMorph`/`useMorphField` **symbol** deletes, and it never touched row 10.5's text. Note also that
`useMorphField` is **not dead** — it is imported live by `useGooMorph.ts`, `useDockFission.ts`, and `GooFilter.vue`
(`grep -rln useMorphField src/`), so 10.5's "DEFINITION-ABSENT" framing is wrong on that symbol regardless; it is a
gut-to-signatures refactor, correctly owned once by SPIKE-DELETE.

**Net:** row 10.5's entire unique deliverable is *delete `morph-field.css` + a post-deletion DEFINITION-ABSENT
verify + the MIGRATION/no-touch-`proof:liquid-morph` coordination row*. As written it is a fourth wave restating
three others' work — the "N waves where one seam suffices" pathology, and precisely a spec that predates its own
folds.

### F2 — MAJOR (over-contrivance / directive-vs-spec): WS6 mints a new SiriIsland component family, contradicting the C-SIRI directive's "AUGMENT the dock, NOT a new component"

The directive is unambiguous. `DIRECTIVE-LEDGER.md:181` (WS6-01): *"deftly AUGMENT the GlassDock (not a new
component)."* The build-map realization (`bg-build-map.md:2`, WS6.2 `BG.W-SIRI-ISLAND`) mints a **full standalone
component family**: `src/components/custom/siri-island/{SiriIsland.vue, composables/useSiriIsland.ts, constants.ts,
index.ts, README.md}` + `src/subpaths/siri-island.ts` + an `api/index.ts` entry + a published subpath. That is the
exact opposite of "not a new component."

It is defensible that a descending answer-pill over content is a *distinct surface*, not dock chrome — but the plan
never reconciles the tension; it silently overrides the directive. Given the user's verbatim critique names
*over-contrivance* and *poor encapsulation*, a wave that mints a new subpath-published component where the directive
asked for a dock capability is exactly the shape to flag. At minimum the plan must record the reconciliation
(why the island is its own surface and not a `GlassDock` mode) rather than contradict the directive by omission.

Contrast the well-shaped sibling waves that DO honor the directive's composition intent: `BG.W-SIRI-ISLAND` composes
`useDockSpring` + `useLiquidReveal` ElementMorph with **zero `new SpringProgress`** (`bg-build-map.md`, S1-S7 gate),
and `BG.W-SIRI-DOCK-INTEGRATION` composes the EXISTING `useDockSearch` (ONE pipeline) and *retires the cloned
`DynamicIslandCall.vue` demo* (verified present: `demo/stories/dock/examples/DynamicIslandCall.vue`). The
composition discipline is right; the new-primitive framing is the miscalibration.

### F3 — MAJOR (over-contrivance): WS6 ships a net-new WebGL viz + its own gate with no ≥2-consumer evidence

`BG.W-SIRI-WAVEFORM` (WS6.3) mints a WebGL2 viz (`SiriWaveform.vue` + `useSiriWaveform.ts` +
`shaders/siri-waveform.glsl.ts` + `constants.ts` + subpath) and a fresh `proof:siri-waveform` gate. B2's lens
already established the gate corpus is 360 scripts growing ~1-per-wave with 18 aurora + 19 blob gates for two viz
components; WS6 adds a 20th viz-class gate. The ≥2-consumer bar (J-inv-10) is **un-evidenced in the plan**: `grep`
for a siri-waveform consumer-evidence booking or a named 2nd consumer in `bg-build-map.md` + `PLAN.md` returns
nothing. Its only plausible consumers are the SiriIsland surface (1) + the demo (a demo is not a binary consumer
under the precept). This is the "single-consumer primitive shipped as API" vector the mandate condemns.

Separately, **WS6 mints 4 new gates for 4 waves** (`proof:glass-blur-engage`, `proof:siri-island`,
`proof:siri-waveform`, `proof:siri-dock-integration` — verified in `bg-build-map.md`). This is the per-wave gate
explosion B2 F2 names, reproduced net-new. A single `proof:siri` family gate (island + waveform + blur-engage +
dock-integration arms) would lock the same surface at a fraction of the permanent CI cost — the family-gate
consolidation B2 recommends, applied at birth rather than retrofitted.

### F4 — MAJOR (encapsulation / dead-code): the dead-primitive prune is incomplete and `JUBILANCE-DECIDE`'s "KEEP useCelebrationBurst (2 consumers)" is false on disk

`useCelebrationBurst` has **zero real consumers** on disk: `grep -rn useCelebrationBurst src/ demo/` returns only
its own definition (`src/composables/motion/useCelebrationBurst.ts`), a CSS comment (`styles/jubilance.css:10`), and
a type re-export (`api/types-extra.ts:71-85`). Yet `BG.W-JUBILANCE-DECIDE` (WS7 12.2) records *"KEEP
`useCelebrationBurst` (2 consumers)"* (`bg-build-map.md:648`). The "2 consumers" claim is not backed by any live
call-site. This is the same unverified-consumer-doc vector B2 F5 caught on `useHaptic` (whose consumer-evidence doc
`docs/consumer-evidence/use-haptic.md:17-19` cites `pulse()` couplings in `useDragMorph.ts`/`useDockFission.ts` that
do not exist — the `pulse()` grep-hits are goo-blob's *own* unrelated `pulse()` at `GooBlob.vue:244`).

The WS4 dead-cut wave (`BG.W-DEAD-COMPOSABLE-CUT`, 10.5) does **not** name `useCelebrationBurst` or `useHaptic` —
those are split into WS7's `JUBILANCE-DECIDE`, which correctly retires `useHaptic` but wrongly keeps
`useCelebrationBurst`. So across the whole tranche one confirmed-dead primitive survives on a false consumer count.
The dead-cut should be *complete and in one place*: `useCelebrationBurst` belongs in the same clean-break cut as its
dead siblings, not preserved by a stale "2 consumers" annotation.

### F5 — MAJOR (encapsulation): pointer-physics 5-way duplication (B7 F4) is untouched by any WS4-6 wave

Four pointer-velocity implementations coexist on disk (verified `ls`):
`src/composables/motion/usePointerVelocityField.ts` (the minted "ONE"), `aurora/composables/cursorModel.ts`,
`goo-blob/composables/useBlobPointer.ts`, `composables/dom/useDragVelocity.ts` (single consumer `Slider.vue`).
CLAUDE.md openly books the aurora/blob fold as a "successor IFF byte-faithful" that never lands. No WS4-6 wave
consolidates them — the WS4 motion-collapse band (10.5-10.10) touches FLIP/press/spring-register/scroll-reader but
not pointer physics. This is "the ONE field is aspirational" left standing through another tranche — the
encapsulation critique persisting because the plan doesn't schedule its close.

### F6 — MAJOR (gestalt cohesion): the disclosure-chevron 3-register divergence (B6 F1) is closed by NO WS4-6 wave

The same gesture — a chevron rotating 180° on open — paints in three registers: Select spring-clock+cartoon-punch
(`SelectTrigger.vue:138`), Configurator spring-curve-wrong-clock (`ConfiguratorLayer.vue:202`), and **Accordion a
FLAT `transition-transform duration-200` snap** (`AccordionTrigger.vue:35`, verified on disk — no spring, no
weight). `grep -in "chevron|disclosure|transition-disclosure|--disclosure" bg-build-map.md` returns **nothing**: no
wave mints a shared disclosure register. `BG.W-12-LAWS-UNIVERSAL` (10.24) is a prose law wave —
*"liquid-weight/inertia/bounce on ALL restored motion"* — with no enforcement floor and no per-register unify; B6
F2 confirms `proof:spring-ease` cannot even *see* the Tailwind-utility `transition-transform duration-200`. So the
liquid-weight-UNIVERSAL mandate's flagship cohesion defect rides through WS4 as a prose promise. FLIP-ONE (10.6)
correctly unifies the *FLIP/reveal* family but the *disclosure* gesture is a separate un-unified register.

### F7 — MINOR (double-claim): `selectableChipVariants` deletion is claimed by both WS4 CHIP-ALIAS-KILL and WS7 SPIKE-DELETE

`BG.W-CHIP-ALIAS-KILL` (WS4 10.19, `bg-build-map.md:488`) = *"delete `selectableChipVariants.ts` + re-point
(ATOMIC)"*; `BG.W-SPIKE-DELETE` (WS7, `:645`) = *"…+ `selectableChipVariants` alias…"*. One wave must own the delete
(the `[ATOMIC]` tag argues for CHIP-ALIAS-KILL); the other's mention should be struck. Same stale-spec class as F1,
lower blast radius.

### F8 — MINOR (dependency-floor, live + un-gated): kf `snap:` API used against a `^5.0.0` peer floor at HEAD

`src/composables/motion/useDragMorph.ts:20-25` uses `kf 5.1.0 DragOptions.snap` (its own comment: *"THE NATIVE SNAP
(kf 5.1.0 `DragOptions.snap`)"*), but `package.json:1078` pins the peer floor at `@mkbabb/keyframes.js: ^5.0.0`. A
consumer installing at the floor gets a kf without `snap` → the drag-snap silently no-ops (the binding-verification
memory class). `proof:peer-conformance` **PASSES at HEAD** (verified) because it checks the value-singleton /
destraddle, not the kf-API-vs-floor.

The plan handles this correctly but **late**: `BG.W-GATE-FIELD-AURORA` (WS7) adds the born-RED
`proof:peer-conformance` clause *"kf floor ≥ 5.1.0 WHEN `useDragMorph` references `snap:`"* (`bg-build-map.md:722`),
and BH `B2.1-swap` (WS12) bumps the floor to `^5.1.0` (`bh-interleave-map.md:40`). The value.js `^1.0.0 → ^1.1.1`
bump is **well-justified**, not speculative — its consumer is `proof:field-aurora-aa`'s `wcagContrastRatio`
hard-import (`bg-build-map.md:717`), landing in the same WS7 wave (`grep wcagContrastRatio src/` is empty at HEAD =
the consumer is genuinely inbound). The single-writer discipline (one `package.json` writer, BH B2.1-swap) is the
right calibration. **Residual:** the live gap is un-gated for the whole WS1→WS7 span — a build that touches
`useDragMorph` mid-tranche has no floor catching a floor-vs-API regression until GATE-FIELD-AURORA lands.

---

## WS5 assessment (viz refinement) — WELL-SHAPED, minor coordination notes

WS5 is the *model* consolidation band and should be defended, not pruned:
- `BG.W-VIZ-DEMIGRATE` (6.3) deletes ≥13 files / ≥2500 LOC of WebGPU duplication from fourier-field + constellation
  onto `useCanvas2D` (verified: both dirs carry live `*WGPUSetup.ts` + `*.wgsl.ts` + `uniformBridgeWGPU.ts` on
  disk). This *shrinks* the machine — the anti-over-contrivance direction.
- `BG.W-VIZ-SUBSTRATE-DELETE` (6.7) correctly and de-dup'd-ly owns the `proof-gpu-substrate-single.mjs:177-181`
  gate edit (G7-P3 fold moved it entirely here; 6.3 is source-only + leaves the gate GREEN). Clean fold integration.
- The G5 protector is a real, un-landed deliverable correctly specced: `DEFAULT_PARALLAX === 0` is on disk
  (`constants.ts:146`) but `grep -c DEFAULT_PARALLAX scripts/proof-constellation-gen.mjs` = **0** — the born-RED
  arm genuinely does not exist yet, so the "HARD non-optional WS5 build deliverable" framing is accurate.
- The G7 subpath disposition is correctly a **CONFIRM-step, not a rename**: the `/constellation` + `/fourier-field`
  keys are preserved (internal WGSL→Canvas2D swap), so no by-name ask is owed — only a visual re-baseline. Verified
  the plan routes this to the `W5-viz-disposition` clause (NOT the W4 content-only fence). Well-integrated.

Two coordination notes (not defects): (a) `useVizChoreography` is deleted by VIZ-REVEAL-BLOOM (6.4) but double-listed
by DEAD-COMPOSABLE-CUT (see F1); (b) `BG.W-VIZ-PREVIEW-LIVE` (6.5, 11 live GL previews) and
`BG.W-SPECIMEN-PER-STORY` (WS4 10.3, 12 non-GL component specimens, `canvas=0`) both rewrite the bento preview
system from opposite ends (GL viz cards vs component category cards) — they are complementary, not overlapping, but
both descend from D-category-previews/D11 and both touch `SectionPreviewCard.vue`; a one-line coordination note
would prevent a merge race.

---

## FOLD CANDIDATES (for the AMENDED-GESTALT-PLAN)

### FC1 — **prune-wave / amend-wave:** collapse `BG.W-DEAD-COMPOSABLE-CUT` to its unique residue (F1)
**Gestalt approach:** the dead-cut is not a wave, it is a *coordination checkpoint*. Rewrite row 10.5 to own ONLY:
(a) delete `src/styles/motion/morph-field.css`, (b) a post-deletion `DEFINITION-ABSENT` *verify* of the three
symbols already deleted by SPIKE-DELETE/VIZ-REVEAL-BLOOM/DOCK-CUT, (c) the MIGRATION row + `no-touch
proof:liquid-morph`. Strike `useLiquidMorph` / `useMorphField` / `morphSignatures` / `useVizChoreography` /
`useDockContextSilhouette` from its deliverable list (they are named in their owners). Re-tag `[H]`→verify-only.
This removes the triple-duplication a build agent would otherwise re-execute, and closes the "spec predates the
fold" gap the G7-P1 fold left open.

### FC2 — **amend-wave / plan-doc-edit:** reconcile SiriIsland's new-component framing against the C-SIRI directive (F2)
**Gestalt approach:** the directive said "augment the dock, not a new component." Either (a) reframe SIRI-ISLAND as
a `GlassDock` *capability* (a dock-owned surface reached through the existing `#rail`/`.glass-dock-frame` escape,
no new subpath, no `api/index.ts` entry) — the idiomatic reading of "augment"; or (b) if the descending answer-pill
is genuinely a distinct surface, record the explicit reconciliation in the wave spec (one sentence: why it is its
own component and not a dock mode) so the plan does not silently contradict its own directive. Option (a) is the
lower-contrivance choice and removes a published-subpath expansion.

### FC3 — **merge-waves:** fold WS6's 4 gates into ONE `proof:siri` family gate; scope `SiriWaveform` demo-private-or-2nd-consumer (F3)
**Gestalt approach:** mint `proof:siri` with arms {blur-engage · island · waveform · dock-integration} instead of
four separate scripts — the family-gate pattern B2 prescribes, applied at birth. And apply the ≥2-consumer bar to
`SiriWaveform` honestly: either name/book a real 2nd binary consumer, or ship it **demo-private** (off the public
subpath, the `useGlassBackdropLuminance` demo-private precedent) until a 2nd consumer lands. Do not publish a
single-consumer viz as API.

### FC4 — **amend-wave:** complete the dead-cut — add `useCelebrationBurst` to the clean break; fix the false "2 consumers" (F4)
**Gestalt approach:** move `useCelebrationBurst` from `JUBILANCE-DECIDE`'s KEEP into a RETIRE (it has zero live
consumers on disk; the "2 consumers" annotation is false and should be struck, not trusted). Delete the
`useHaptic` consumer-evidence doc as part of its retire (it asserts couplings that never existed — an unverified
doc must not survive its subject). One clean-break cut for the whole jubilance/haptic/celebration dead set, in one
place (fold `JUBILANCE-DECIDE` + the celebration arm together), rather than split across WS4/WS7 with a stale
count.

### FC5 — **new-wave:** the disclosure-register unify + its machine floor (F6)
**Gestalt approach:** mint ONE `transition-disclosure` utility (or `--disclosure-rotate` spring token pair) on the
100-120ms quick-control register `scheme-motion.css:87` already names, and re-point Select / Configurator /
Accordion chevrons onto it (a register substitution, not three per-site edits — the substitution-over-redeclaration
discipline). Pair it with the enforcement hole B6 F2 names: extend the abrupt-spatial detector to see
Tailwind-utility spatial transitions (`transition-transform duration-200` in `.vue` templates), so a future flat
snap-rotate reds. This is the liquid-weight-UNIVERSAL mandate's flagship cohesion defect; it deserves a real wave,
not a buried per-site line in WS10 de-shadcn.

### FC6 — **new-wave (small) / defer-honest:** the pointer-physics consolidation (F5)
**Gestalt approach:** either schedule the aurora/blob `usePointerVelocityField` fold as a real WS5-adjacent wave
(byte-faithful transpose of `cursorModel.ts` + `useBlobPointer.ts` onto the ONE field, retire the two forks +
`useDragVelocity`'s single-consumer duplication) — the consolidation the mandate wants — or, if genuinely
out-of-budget for this tranche, **defer-honest**: strike the "the ONE pointer field" prose from CLAUDE.md and record
the 4-way reality with a real trigger, rather than carrying an aspirational "successor IFF byte-faithful" booking a
fifth time.

### FC7 — **plan-doc-edit (low sev):** resolve the `selectableChipVariants` double-claim (F7) and add the VIZ-PREVIEW-LIVE ↔ SPECIMEN-PER-STORY coordination line (WS5 note b)
**Gestalt approach:** strike `selectableChipVariants` from SPIKE-DELETE's deliverable list (CHIP-ALIAS-KILL owns it,
`[ATOMIC]`); add a one-line "coordinate at `SectionPreviewCard.vue` granularity" note between 6.5 and 10.3.
