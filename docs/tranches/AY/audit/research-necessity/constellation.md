# Research-necessity audit — lane: constellation

**Verdict: SETTLED** (no fresh external research warranted; every residual item is execution debt
already specced in the existing corpus, most of it in-flight). **README: STALE in spots** — the
in-flight finisher updated the freeze/anomaly sections but not the API table.

**Read-only audit; working-tree state as of 2026-06-09. NOTE:** the Batch-2 finisher workflow is
CONCURRENTLY writing constellation source — the working tree already carries W-CON2 (gravity-well +
numeric token cohort) and W-CON3 (`?freeze` + anomaly recipe) content while `AY/PROGRESS.md:63-64`
still reads `planned` for both rows. Line-cites below are working-tree and may shift under the
finisher; the corpus cites are stable.

---

## 1 — The existing corpus (already-researched/synthesized)

| Artefact | What it settles |
|---|---|
| `src/components/custom/constellation/README.md` (512 lines) | the component model: proximity-graph, neutral/skin split, warp thesis, tokens, freeze, anomaly recipe |
| `docs/tranches/AX/waves/AX.W17-constellation-tokens-warp-slides-adopt.md` | the warp thesis (focal-node first-class, FORBID-useSpring integrator, LIVE-target tracking, PRM policy) + the 12-finding design corpus (`AX/audit/constellation-analysis-corpus.json` result[18]) |
| `docs/tranches/AY/waves/AY.W-CON1.md` (incl. §0 RE-GROUND RG1–RG4) | refit + wander + alpha, AS-BUILT re-ground; RG2 re-capture + RG3 shear-arm debt |
| `docs/tranches/AY/waves/AY.W-CON2.md` (incl. §0 RG-A/RG-B) | warp VERIFY, ω-reconcile vs keyframes.js, decided-scope eggs (well SHIP / supernova DEMO / flock CUT), numeric token cohort |
| `docs/tranches/AY/waves/AY.W-CON3.md` | `?freeze` seam, anomaly `drawOverlay` recipe (no domain props), slides-side gate spec (§5, copy-in-ready) |
| `docs/tranches/AY/audit/hardening/H-constellation.md` | the 6 findings (refit BLOCKER, drift-source, eggs, gate mis-home, README meta, god-module) + convergence criteria |
| `docs/tranches/AY/audit/hardening/H-proto-constellation-warp.md` | the algorithm-level prototype recipe + the ω semantics analysis + the egg risk ledger |
| `docs/tranches/AY/audit/hardening/b2/B2-con1.md` | the adversarial as-built grade of W-CON1 (engine sound; DELTA garbage; coverage tautology; 24px settle band CLEARED) |
| `docs/tranches/AY/audit/hardening/b2/B2-gestalt.md` | "constellation IS the bar" (the set's convergent-optimum reference) + D3/F4 recession-prop 3-of-4 parity gap |
| `docs/tranches/AY/waves/AY.W-COHERE.md` §E3 | the `opacityCeiling` recession-envelope assignment (W-COHERE's, NOT a W-CON wave's) |
| `docs/tranches/AY/audit/visual/W-CON{1,2,3}-DELTA.md` + 33 PNGs | the captured DELTA set (W-CON1's mobile arm defective per RG2; W-CON2/3 sets in-flight but real) |
| `docs/tranches/AY/audit/AUDIT-LEDGER.md:29-31` | rows re-stamped DONE-VERIFY (the H-constellation stale-ledger fix landed) |

This corpus is deep, adversarially challenged twice (H-pass + B2-pass), and internally convergent.

## 2 — As-built state (working tree)

- **W-CON1 — LANDED, live-verified** (`PROGRESS.md:62`): `refitField`, the wander cadence on the ONE
  warp spring, `warpSettled`/`pickWanderTarget`, both-mode alpha π readback. B2-con1 grades the
  engine logic sound (FINDING 5 cleared the 24px `WARP_SETTLE_BAND` as a TRUE fix).
- **W-CON2 — content PRESENT (in-flight):** `stepWell` with both mandatory safety floors
  (`constellationField.ts:607` `Math.max(sqrt(d2), cfg.soften)` singularity floor; `:593` `maxSpeed`
  cap; the always-on `|v|→speed` ease-back per `:496`), `ConstellationWarpConfig`/`WellConfig` +
  `readInteractionConfig` token reads (`:348-364`), `gravityWell` prop + held-timer + PRM
  state-reset-on-edge (`Constellation.vue:242-260`, `:361-368`), the FULL numeric token cohort
  declared ONCE in `:root` (`tokens.css:524-532` — warp-response/zeta, well-gain/reach/ramp/
  max-speed/hold-ms, wander-idle/jitter; the RG-B "W-CON2 owns the entire cohort" correction
  honoured), the ω-reconcile doc (`constellationField.ts:650-660` — "ANGULAR period, NOT a
  settle-duration"), `tests-visual/constellation-egg-live.spec.ts` + `scripts/proof-constellation-egg-live.mjs`,
  `W-CON2-DELTA.md` + 16 PNGs incl. the 5-frame rest→held→peak→release→cooled series.
- **W-CON3 — content PRESENT (in-flight):** `freeze` prop + the raw-vnode-prop tri-state probe +
  `isFrozen` folded into the ONE static predicate (`Constellation.vue:134-207`, `:350-368`), the
  frozen `now` to `drawOverlay`, README "Deterministic-capture freeze" + "Anomaly skin recipe"
  sections (`README.md:246-371`), `__constellationFreeze` demo handle
  (`demo/stories/substrates/constellation.vue:267`), `tests-visual/constellation-freeze-live.spec.ts`
  + `scripts/proof-constellation-freeze-live.mjs`, `W-CON3-DELTA.md` + 4 PNGs (real 390×844@2×
  mobile — the protocol the W-CON1 RG2 re-capture should reuse).
- **Barrel** (`index.ts`) re-exports the full grown surface (stepWell, refitField,
  readInteractionConfig, warpSettled, pickWanderTarget, the Well/Wander/Config types).

## 3 — README vs as-built: STALE (specific spots)

Accurate: the model, warp/focal section, freeze section, anomaly recipe, color-token table,
determinism, performance, a11y. Stale:

1. **Props table (`README.md:142-152`) is missing `wander` and `gravityWell` rows** — both exist in
   `defineProps` (`Constellation.vue:68`, `:123`, wander cluster ~`:95-117`), and the README's own
   example at `:363` uses `wander`. Internally inconsistent.
2. **Tokens section (`:375-403`) omits the 9-member numeric interaction cohort**
   (`tokens.css:524-532`) — only the 6 color/alpha tokens are tabled.
3. **Architecture blurb (`:481-485`)** describes `constellationField.ts` as "the four neutral passes
   + the focal seam" — now also the well force, the wander cadence, the config readers.
4. **Provenance blockquote (`:15-25`)** ("Research-backed … AV.W8 … AX.W17") + the stale `AW.W17`
   tag (`index.ts:1`) — the H-constellation FINDING 5 meta-language; W-DOC1 (`PROGRESS.md:81`,
   planned) owns the strip.

## 4 — Divined refinements (NO research needed; all corpus+code-derivable)

1. **W-CON1 RG2 re-capture (owed, specced):** the four `W-CON1-*-mobile-*.png` are STILL 1280×721
   desktop shots (`file(1)` verified) showing a sparse left column with no focal — re-shoot at a real
   mobile viewport per `AY.W-CON1.md §0 RG2`; the W-CON3 mobile protocol (390×844@2× element clip,
   `W-CON3-DELTA.md:17-19`) is the working template.
2. **W-CON1 RG3 shear arm (owed, specced):** `tests-visual/constellation-refit-live.spec.ts` has no
   portrait→landscape transpose arm (`grep shear|portrait|landscape` → 0) — the coverage gate stays a
   uniform-scale tautology (B2-con1 FINDING 4) until the `sx≠sy` arm + its capture land.
3. **Gate wiring:** `package.json` (`:652-661`) has NO `proof:constellation-egg-live` /
   `proof:constellation-freeze-live` script entries while both `.mjs` drivers + both π specs exist on
   disk — W-CON2 §6 / W-CON3 Leg 1 each require the entry. (Likely the in-flight finisher's remaining
   step; binary to verify.)
4. **PROGRESS/DELTA mismatch:** `W-CON2-DELTA.md`/`W-CON3-DELTA.md` self-stamp `live-verified` while
   `PROGRESS.md:63-64` still reads `planned` — flip the rows (or `complete` + VISUAL-ALLOWLIST) once
   the gates run, per the `proof:live-verified-ledger:ay` mechanics both wave specs quote.
5. **README API sync (W-DOC1 scope):** add the `wander` + `gravityWell` prop rows + the numeric
   token table + the architecture blurb update (§3.1–3.3 above); strip the provenance blockquote +
   the `AW.W17` tag (§3.4).
6. **W-COHERE E3 `opacityCeiling` (assigned, unbuilt):** `Constellation.vue` has no
   `opacityCeiling` (grep → 0; `StoryHero.vue:112` threads `:opacity-ceiling` to aurora and
   `:intensity` to fourier only) — the 3-of-4 recession-parity gap (B2-gestalt D3). Fully specced in
   `AY.W-COHERE.md §E3` (scale the painted alpha OVER `--constellation-alpha`, default 1
   byte-identical); no design question remains.
7. **W-GOD1 re-grade (the carve target moved AGAIN):** `constellationField.ts` is now **959** lines
   and `Constellation.vue` **597** — BOTH over `proof:no-god-module`'s 500 HARD_LIMIT (the gate scans
   `.ts` AND `.vue`, `proof-no-god-module.mjs:20,47`). The W-GOD1 plan grades the field file at
   510→653; the true target is 959 + a second violation in the SFC. The carve SHAPE is already
   specced (H-constellation FINDING 6: split the warp cluster; now also the well/wander/config/freeze
   clusters) — re-grade, don't re-research.
8. **Edge-floor (H-constellation F2.4) — CLOSED by construction, record it:** the engine's
   `--constellation-edge-alpha` model + the H.W4-floor fallbacks (`constellationField.ts:293-302`)
   absorb the slides `--constellation-edge-floor` concern; B2-gestalt ratifies the lattice as the
   set's legibility bar on cream. The slides red-edge multiplier stays consumer-skin (L.W-ADOPT).

## 5 — Research gaps

**None.** The one genuinely research-shaped question this lane ever had — the `response` semantics of
the warp ω-derivation vs the keyframes.js `(response, dampingFraction)` model — was resolved
IN-CORPUS from `keyframes.d.ts:860-882` (H-proto-constellation-warp PART A.2 → W-CON2 D2) and is now
recorded at the token (`tokens.css:520-525`) and the const (`constellationField.ts:650-660`). The
egg-scope ≥2-consumer decision is ratified (W-CON2 §2.3: well SHIP / supernova DEMO-ONLY / flock
CUT). The remaining cross-repo work (slides adoption, `proof:no-bespoke-constellation`) is execution
in L.W-ADOPT with a copy-in-ready gate spec (`AY.W-CON3.md §5`). A fresh SOTA pass on
particle-network/proximity-graph idioms would re-tread the AX.W17 12-finding design corpus — churn.

## 6 — Bottom line

The constellation lane is **corpus-complete**: refit/wander/warp/eggs/freeze are all either landed
(W-CON1), in-flight at the working tree (W-CON2/W-CON3 — engine + tokens + specs + DELTAs present;
gate wiring + PROGRESS flips pending), or assigned to a downstream wave with an exact spec (W-COHERE
`opacityCeiling`, W-DOC1 README sync/strip, W-GOD1 carve at the re-graded 959/597). The component is
effectively SETTLED pending the in-flight finisher, the W-CON1 RG2 re-capture + RG3 shear arm, and
those three assigned waves. No iterative SOTA research pass is warranted.
