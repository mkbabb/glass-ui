# Critique — VIZ-DAG.md fold re-validation (RUTHLESS / ADVERSARIAL)

**Lane** BD viz / dag-fold · **Branch** `prototype/liquid-dock` · **Method** read VIZ-DAG.md + VIZ-BAND-PLAN.md (D1-D9 + critique-fold passes 1/1b) + the 6 critique-fold docs (gpu-only · field-engine · blob-redevelop · dock-hub-generality · generalize-no-hardcoded · design-language-congruence) + the converged union `EXECUTION-DAG.md` / `UNIFIED-ROSTER.md` + the HEAD codebase. PLANNING audit — zero `src/` edits.

**One-line verdict.** VIZ-DAG.md is **STALE** — it was last written at 16:17, BEFORE the critique-folds landed (16:22–16:23) and before VIZ-BAND-PLAN's pass-1b (16:25). NONE of the fold-mandated structural changes (the blob 4-SPLIT, the waveFieldMath-FIRST prerequisite, the dock re-architecture, the D8 W-DESIGN-LANGUAGE-CONGRUENCE mint, the D7 W-NO-HARDCODED-REF generalize wave) is in the DAG. The acyclicity claim is therefore VACUOUS (it validates a graph that no longer exists), the count is DISHONEST ("~12 net-new" still lists the un-split god-wave + the app-named V-rows the renames killed), and the terminal `W-REFLECT-ALL` node literally RE-CREATES the BB single-terminal-reflect disease its own prose claims to forbid.

---

## 0 · THE LOAD-BEARING FINDING — the DAG predates every fold it must encode

| Artefact | mtime | Encodes |
|---|---|---|
| `VIZ-DAG.md` | **16:17** | the PRE-fold graph (passes 1/1b NOT applied) |
| `critique/{blob,field,gpu}` | 16:16 | pass-1 findings |
| `critique/{dock-hub,generalize,design-language}` | 16:22–16:23 | pass-1b findings |
| `VIZ-BAND-PLAN.md` | 16:25 | folds 1 + 1b INTO the band-plan |

The brief asks me to "re-validate VIZ-DAG NOW that the critique-folds landed." The answer is: **the folds landed in VIZ-BAND-PLAN, NOT in VIZ-DAG.** VIZ-DAG is a frozen snapshot of the pre-critique plan. Every question the brief poses (is it acyclic WITH the new waves; is the count honest NOW; does the terminal reflect re-create the disease) resolves the same way — **the new waves are not in the DAG at all**, so it cannot be acyclic-with-them, the count cannot be honest, and the terminal node is the un-revised pre-fold form. The DAG is not "subtly wrong"; it is a stale document masquerading as the locked topo order. **This is a CHALLENGE-class gap: re-author VIZ-DAG from VIZ-BAND-PLAN's post-fold state before the DAG can be claimed "locked."**

---

## 1 · MISSING WAVES — the fold mandates that never reached the DAG

Grepped VIZ-DAG.md for each fold-mandated node:

- **The blob 4-SPLIT is ABSENT.** `blob-redevelop.md` (the landed pass-1 fold) + VIZ-BAND-PLAN pass-1 mandate SPLIT `W-BLOB-REDEVELOP` → `W-BLOB-RENAME · W-BLOB-MULTICORE · W-BLOB-EMOTION · W-BLOB-LAVA` (a god-wave of 5 unrelated concerns, no clean rollback). VIZ-DAG line 26 STILL carries the single un-split `W-BLOB-REDEVELOP` with the OLD edge set (`← W-LAVA-FIELD + W-EMOTION-PRIMITIVE + W-VIZ-INTERACTION-SPINE`) and the OLD "LIFT the GOO-REDRESS cage + re-baseline proof:blob-page/render" prose the fold REVERSED (the cage STAYS the default; lava is opt-in with its own looser π — never a re-baseline). The DAG encodes the exact over-reach the fold killed.
- **The waveFieldMath-FIRST prerequisite is NOT a node.** `field-engine.md` §7 ask #1: "Numeric round-trip FIRST, not a clause. Build the JS-oracle↔shader eval harness; gate-RED on a `2.02→2.0`/sign-flip mutation. **No hoist before it.**" VIZ-DAG line 15 lists `waveFieldMath.ts` as an INLINE deliverable INSIDE `W-FIELD-ENGINE`, with NO prerequisite sub-wave and NO DAG edge `W-FIELD-ENGINE ← W-WAVE-FIELD-MATH`. Until the numeric net is a SEPARATE upstream node the field-engine hoist is a net SAFETY regression (7 individually-gated surfaces → 1 surface gated by a regex). The DAG does not encode the safety prerequisite.
- **`W-DESIGN-LANGUAGE-CONGRUENCE` is ABSENT.** `design-language-congruence.md` §4 + VIZ-BAND-PLAN pass-1b D8 MINT a new wave + `proof:design-language-congruence` (DLC-1..6). Grep of VIZ-DAG: **zero hits.** The D8 pillars (paper · audacious-√φ-type · golden-ratio) have NO node, NO tier position, NO edge in the DAG.
- **`W-NO-HARDCODED-REF` is ABSENT.** `generalize-no-hardcoded.md` §3 + VIZ-BAND-PLAN pass-1b D7 mandate a GENERALIZE WAVE (not just a gate) that finishes the renames + covers the UNION + removes the Walmart trademark + RE-ARCHITECTS the dock steady-state to consumer-supplied data. Grep of VIZ-DAG: **zero hits.** Worse, VIZ-DAG line 54 STILL lists `DOCK-ALBUM-STAGE` and `MAPS-CARD-EXPAND` as net-new V-waves — the exact dual-name no-legacy violation `proof:no-hardcoded-ref` NC2/NC3 is born-RED on (the census names `VIZ-DAG.md:54` as a load-bearing offender, A/C-tier).
- **The dock re-architecture (D9 H2/H3/H5) is ABSENT.** `dock-hub-generality.md` mandates: demote `DockSplitContext = "search"|"media"|"nav"` + `DockSilhouetteKind = "bar"|"bar+pill"|"split"|"search"` to a `vector`-keyed SHAPE + consumer DATA; prove ≥3 distinct surface KINDS; COLLAPSE the two bloom engines (`useLiquidReveal` + `useLiquidMorph`). VIZ-DAG VT3 still carries `W-DOCK-WIRE` whose prose says "export the STRANDED `useDockContextSilhouette`" — but HEAD shows that composable already has **15 exports** and a live demo consumer (`demo/stories/dock/examples/AppSwitcher.vue`), so "stranded zero-exports" is FALSE at HEAD (the D5 audit premise is itself stale). The DAG carries neither the enum-demotion node nor the bloom-engine collapse.

---

## 2 · THE FOLD-CONFLICT — VIZ-DAG's dock band vs the UNION's dock band (a real collision)

VIZ-DAG VT3 invents `W-DOCK-WIRE` ("compose engines INTO GlassDock · export the stranded silhouette · mint useDockLink") as "the hallmark PREREQUISITE." But the converged UNION already owns this work across THREE T2 waves:

- `W-SILHOUETTE-REALIZE` (UNIFIED-ROSTER:39) — "DECIDE-don't-rebook `useDockContextSilhouette`: wire bar/bar+pill/split/search … OWNS the descriptor state-machine + fuse-meld + `setSilhouette` wiring."
- `W-DOCK-LINK-API` (UNIFIED-ROSTER:42) — "`useDockLink(...)` — toSurface/split/silhouette/receive as VERBS … composes the shipped `useElementBloom`."
- `W-DOCK-INTEGRATE` (UNIFIED-ROSTER:35) — "wire fission/goo/bloom into a real SFC."

**`W-DOCK-WIRE` is a fourth name for the union's T2 dock-integrate band — a DUPLICATE wave the no-legacy/no-silent-drop law forbids.** VIZ-BAND-PLAN D5 even re-derives it. Either VIZ-DAG's `W-DOCK-WIRE` IS `W-DOCK-INTEGRATE`+`W-DOCK-LINK-API`+`W-SILHOUETTE-REALIZE` (then it must DEDUP onto them, not invent a new node) or it is a genuine 4th wave (then it collides). The fold did NOT reconcile this — the V-expansion's dock band and the union's dock band are two un-merged plans. Compounding it: VIZ-DAG's `W-DOCK-CONTENT-FIELD ← W-AUR-ALBUM(union)` and `W-DOCK-SEARCH-FIELD ← W-DOCK-WIRE` consume union waves that the D7 census RENAMES (`W-AUR-ALBUM`→`W-AUR-PROTAGONIST`; the `search` silhouette arm is admitted-DEAD per dock-hub §2b) — so the DAG's cross-tier edges point at soon-to-be-renamed-or-cut targets.

---

## 3 · THE COUNT IS DISHONEST

VIZ-DAG line 54: "~73 waves = 61 union + ~12 net-new." Three problems:

1. **The "~12 net-new" list is the PRE-fold enumeration.** It names `BLOB-REDEVELOP` (now 4 waves → +3), omits `W-WAVE-FIELD-MATH` (the field harness prerequisite, +1), omits `W-DESIGN-LANGUAGE-CONGRUENCE` (+1), omits `W-NO-HARDCODED-REF` (+1), and STILL counts `DOCK-ALBUM-STAGE` + `MAPS-CARD-EXPAND` (the killed app-names). Post-fold the net-new V-count is **~16–17, not ~12** — the count drifts by 4-5 in the wrong direction (the splits ADD, the renames don't subtract count, the new gate-waves ADD).
2. **The blob/lava/dot fold collides with the union's OWN viz tails.** The union carries `W-VIZ-TAILS`, `W-AURORA-WGSL-CURL`, `W-AURORA-KUWAHARA-MULTIPASS`, `W-GOOBLOB-SAT-SHADE`, `W-GOOBLOB-SQUIRCLE-REFRACT`, `W-BLOB-MOTION-TUNE` (all in UNIFIED-ROSTER). The V-expansion's `W-BLOB-MULTICORE`/`W-AUR-METAL`/`W-DOT-UNIFY` overlap these — the "61 union + 12 V" arithmetic double-counts unless the overlap is deduped, which the DAG never does. The "exact enrolled count is set when the critique-fleet confirms the fold" hedge (line 54) is an admission the count was never honest.
3. **The "1 superseded-arm" accounting is undercounted per gpu-only.md.** `gpu-only.md` H4 found the GPU-only inversion strands `proof:gpu-substrate-single` clause **B AND C** (not just B), AND the `auroraFallbackGround` swraster-cert delete must DEFER (cross-repo speedtest CI dependency) rather than land in-wave — so the "1 superseded" becomes a multi-clause inversion + a deferred-with-trigger split. The DAG's "1 superseded-arm" is a single-line approximation of a 5-fix surface.

---

## 4 · THE TERMINAL `W-REFLECT-ALL` RE-CREATES THE BB DISEASE

VIZ-DAG line 8: "the whole ~73-wave set closes against ONE terminal `W-REFLECT-ALL`." Line 50 then claims "Every painting V-wave closes against its OWN fresh π (no rides-W-REFLECT deferral — the BB-disease law)." **These two sentences contradict each other, and the DAG node structure sides with the disease.** `W-REFLECT-ALL` is literally specified (line 44) as "flip EVERY gestalt row — union + V-expansion — on fresh captures … ← all" — a SINGLE terminal node every painting wave's verdict funnels into. That IS the BB single-terminal-reflect deferral, the named disease (LESSONS Entry 1).

Contrast the converged UNION's T10, which got this RIGHT: `W-REFLECT` is explicitly "the union CONFIRMATION sweep over already-GREEN rows, NOT the place verdicts first flip … each painting wave ALREADY self-verified at its own close." The union encodes the anti-disease invariant in its node SEMANTICS (W-REFLECT confirms; it does not first-flip). VIZ-DAG's `W-REFLECT-ALL` prose has the disclaimer but the NODE is the disease shape — "← all" + "flip EVERY row" reads as the terminal-first-flip the union banned. The DAG must adopt the union's CONFIRMATION-not-first-flip semantics verbatim, and every V painting wave must carry its own `proof:ba-gestalt` + webkit-π row in the DAG (today they are named in prose, not enrolled as per-wave close gates in the tier structure).

---

## 5 · ACYCLICITY — un-assessable as written; the new edges are not drawn

The DAG's acyclicity claim (line 47, "Zero back-edges: VT0→VT1→VT2→VT3→VT-CLOSE") validates the PRE-fold tier graph. It cannot be re-validated because the fold-mandated nodes/edges are absent. The edges that MUST be drawn + checked once the re-author lands:

- `W-FIELD-ENGINE ← W-WAVE-FIELD-MATH` (the numeric-harness-first prerequisite). Forward, acyclic — fine ONCE drawn.
- `W-BLOB-MULTICORE/EMOTION/LAVA ← W-BLOB-RENAME` (the atomic rename BEFORE the redevelops; AND the rename is a DAG edge BEFORE D4's `W-DOT-UNIFY` goo-dot-matrix `sceneDistG` re-home — blob-redevelop.md flags this collision). The rename has TWO downstream fan-outs (the 3 blob waves + the dot-unify fold) — both forward, but the DAG must SEQUENCE the rename before BOTH or the dot-unify `sceneDistG` splice breaks. Currently NEITHER edge exists.
- `W-DESIGN-LANGUAGE-CONGRUENCE ← {every V demo-surface wave}` (it reads them upstream, lands beside W-DEMO-BREADTH, before W-REFLECT). Forward.
- `W-NO-HARDCODED-REF` covers the UNION too (D7 fix) — it is a generalize wave touching union canonical waves, so it must sequence so its renames land before the union's `W-AUR-ALBUM`/`W-DOCK-NOWPLAYING-PILL`/`W-MAPS-CARD` ship their app-named artefacts (or those waves adopt the renamed names directly). This is a CROSS-PLAN edge (V-wave → union waves) the DAG has no mechanism to express today.
- The bloom-engine collapse (dock-hub H5: `useLiquidMorph`→`useLiquidReveal`) conflicts with the union's T1 `W-FLIP-SPINE`/`W-SPIKE-DELETE` which ALREADY delete `useLiquidMorph` (UNIFIED-ROSTER:31 — "Delete the `useLiquidMorph` spike"). So D9's "collapse the two bloom engines" is ALREADY a union T1 wave — the V-expansion re-derives a fold the union owns. Another un-reconciled overlap (good news: it's a dedup, not a conflict — but the DAG must record it as SUBSUMED, not re-invent it).

---

## VERDICT (7 lines)

VIZ-DAG.md is STALE — written at 16:17, BEFORE the critique-folds (16:22-23) and VIZ-BAND-PLAN's pass-1b (16:25) — so it encodes the PRE-critique graph and answers every brief question by omission: the blob 4-SPLIT, the waveFieldMath-FIRST prerequisite node, `W-DESIGN-LANGUAGE-CONGRUENCE`, and `W-NO-HARDCODED-REF` are ALL ABSENT, and line 54 STILL lists the killed app-names (`DOCK-ALBUM-STAGE`/`MAPS-CARD-EXPAND`) plus the un-split god-wave (`W-BLOB-REDEVELOP` with the reversed "lift-the-cage" prose). The count is dishonest: "~12 net-new" is the pre-fold number — post-fold it is ~16-17 (the +3 blob split, +3 new gate/harness waves), and it never dedups the V-viz tails against the union's own `W-VIZ-TAILS`/`W-AURORA-WGSL-*`/`W-GOOBLOB-*`. There is a real fold-CONFLICT: VIZ-DAG's `W-DOCK-WIRE` is a 4th name for the union's already-owned T2 dock band (`W-DOCK-INTEGRATE`+`W-DOCK-LINK-API`+`W-SILHOUETTE-REALIZE`) — a duplicate the no-silent-drop law forbids — and its premise ("export the STRANDED silhouette") is false at HEAD (15 exports, a live demo consumer). The terminal `W-REFLECT-ALL` NODE ("flip EVERY row ← all") IS the BB single-terminal-reflect disease, contradicting line 50's own anti-disease claim — the union got this right (W-REFLECT confirms already-GREEN rows; never first-flips) and the DAG must adopt that semantics verbatim. Acyclicity is un-assessable as written (the new edges aren't drawn); the ones that MUST be added (`FIELD-ENGINE←WAVE-FIELD-MATH`, the 3 blob waves + dot-unify←`BLOB-RENAME`, the cross-plan `NO-HARDCODED-REF`→union-app-named-waves) are all forward IF drawn, but the blob-rename's dual fan-out (3 redevelops + the dot-unify sceneDistG re-home) and the V↔union dock-band merge are un-reconciled today. BINDING FIX: re-author VIZ-DAG from VIZ-BAND-PLAN's post-fold state — enroll the 4 missing nodes, dedup `W-DOCK-WIRE` onto the union T2 band, re-count honestly with the V↔union viz-tail overlap resolved, draw + re-check the new edges, and replace `W-REFLECT-ALL` with the union's CONFIRMATION-not-first-flip W-REFLECT + per-wave own-π enrollment.
