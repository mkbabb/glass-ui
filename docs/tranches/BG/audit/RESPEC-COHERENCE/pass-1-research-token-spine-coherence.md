# PASS 1 — TOKEN-SPINE-COHERENCE research (BG cross-wave coherence audit)

**Lens:** DESIGN-TOKEN SPINE COHERENCE — the unified glass blur/tint/specular/parallax/grain spine across WS3 (glass
standardization), WS8 (glass-deep / C-SAFARI refraction), WS9 (paper-deep / grain), + the 3 landed live-fixes
(D-1 constellation parallax, D-2 paper-grain warmth, D-3 dock blur).
**Date:** 2026-06-30 · **Baseline HEAD:** `4c761b64` (the re-spec FOLD; pkg 4.2.0) · **Branch:** tranche/BG
**Pass:** 1 of N (establish the baseline). **Fence honored:** read-only under glass-ui; `verify-siblings-intact` exit 0
before + after.

## Method

Read SEED-CONTEXT + AMENDED-WAVE-PLAN + the WS3/WS8/WS9 build-map specs + resolve-G1-csafari, then read the ACTUAL
token definitions on disk those waves touch (`src/styles/tokens/{glass,glass-fx,glass-deep,dark-arm}.css`,
`src/styles/glass/{ladder,surfaces,glass-refract}.css`, `src/styles/dock/shell.css`,
`src/composables/glass/webgpu/glassShader.wgsl`, the constellation/paper-grain/dock sources) + traced the landed-vs-spike
git state. The question answered per the seed: do the PLANNED mechanisms compose against the REAL current tokens, or does a
later wave reach for a name a sibling wave renamed/retired/repurposed?

## Landed-state baseline (what is actually on disk at `4c761b64`)

Three WS3 waves already LANDED (committed, PAINT-PENDING) before the audit pause — the seed's "zero new code since the
fold" is true only of code since `4c761b64`; these predate it:
- `BG.W-CARTOON-INK-GAMUT` (3857b33b) · `BG.W-GLASS-BLUR-PEER` (cd9ce46c) · `BG.W-GLASS-IDIOM-FACTOR` (6ec81deb DONE).
- After BLUR-PEER: `--glass-blur-resting-radius: 8px` (glass.css:88); `--glass-blur-btn` is an alias of
  `--glass-blur-resting` (glass.css:188); the dock reads `--dock-surface-blur: var(--glass-blur-resting)`
  (dock/shell.css:29→159). `.glass-deep` still re-points `--glass-blur-btn`→`--glass-blur-deep` for the hero.
- G4 `BG.W-CLOSEFIX-9SITE` is an UNMERGED SPIKE (c0f6e1ee, NOT an ancestor of HEAD) — the `--glass-blur-dock` chain is
  STILL LIVE in HEAD (glass.css:166, dark-arm.css:286, bridges.css:334), as the plan expects (G4 re-implements at resume).
- Carve targets confirmed >500: `glass/ladder.css`=527L, `dock/shell.css`=510L.

---

## FINDINGS — cross-wave token/mechanism conflicts

### F1 [HIGH] — The C-SAFARI "ship operator" `uChromatic` is a CONVERGE-PROTOTYPE name; the genuinely-shipped Tier-2 WGSL uses a DIFFERENT operator + constants, and the dual-stack is left UNRECONCILED.

**Waves:** WS8 `BG.W-GLASS-REFRACT-WEBGL` / `BG.W-GLASS-BACKDROP-SAMPLE` / WS7 `BG.W-SAFARI-PARITY-GATE` (G1).

The AMENDED-WAVE-PLAN (§2.G1 line 163) and `resolve-G1-csafari.md` (§1a line 21: *"the ship operator, verbatim from
`glass-field-shaders.json`, the artifact … the source-of-truth"*) assert the ship splits R/B by
`ca = inward·rim·uChromatic·0.0045` and re-point the whole C-SAFARI fence/gate/token/π onto **`uChromatic`**.

**On disk:** `uChromatic` appears NOWHERE in `src/` — only in `docs/tranches/**` planning prose and in
`docs/tranches/BG/audit/glass-field-shaders.json`, which is a **converge-phase GLSL PROTOTYPE**, not shipped code.
The genuinely-shipped refraction shader — the Tier-2 WGSL the build-map (line 623) itself lists WS8 §2 editing —
is `src/composables/glass/webgpu/glassShader.wgsl`, and it uses DIFFERENT names + magnitudes:
- `glassShader.wgsl:13` `chromatic_aberration: f32` and `:130-135` `aberration_dir = … * u.chromatic_aberration * 0.003`
  (vs the planned `uChromatic·0.0045` — ~1.5× the magnitude).
- `glassShader.wgsl:12` `refraction_strength` `:106` `* u.refraction_strength * 0.02` (vs planned `uRefractionStrength·0.045` — 2.25×).

**The conflict:** the resolve §5 F3 fence ("operator-is-`uChromatic` source-scan") scans only the NEW
`glass-refract.glsl.ts` (Tier-1 GLSL ported from the JSON). Neither the build-map nor the resolve reconciles
`glassShader.wgsl`'s existing `chromatic_aberration`→`uChromatic` rename, nor fences the WGSL. So the Tier-1 WebGL2 floor
and the Tier-2 WGSL would refract/disperse at DIFFERENT magnitudes — a **dual-stack parity break** against the §1.5
"WebGL2+WGSL dual-stack" identity fence (and the `proof:gpu-substrate-single` ΔE bar would red at build, or worse, the
WGSL keeps the wrong constants un-fenced because F3 never reads it).

**The friction recurrence:** this is the EXACT wrong-uniform class the RESPEC claims it FIXED (the seed: "C-SAFARI keyed
to invented `uDispersion` not ship `uChromatic`"). The correction swapped one non-ship name (`uDispersion`) for another
that exists only in a converge prototype (`uChromatic`); the ACTUAL shipped uniform (`chromatic_aberration`) was never
examined. Both names are equally absent from `src/`. The fence is keyed on an operator the ship doesn't yet carry.

**Note (mitigating):** the GLSL Tier-1 is NEW, so building it from the JSON is internally fine; the conflict is purely
the unreconciled Tier-2 WGSL + the inaccurate "ship/source-of-truth" provenance label (a prototype labelled as ship).

### F2 [MEDIUM] — `--glass-edge-dispersion` is a CSS `box-shadow` value, not a scalar; "`--glass-edge-dispersion`→`uChromatic` token" is a token-TYPE collision.

**Waves:** WS8 `BG.W-GLASS-REFRACT-WEBGL` (G1).

Build-map line 647 says the new shader carries "the `ca = inward·rim·uChromatic·0.0045` operator +
`--glass-edge-dispersion`→`uChromatic` token"; resolve §1b: "the live retune token `--glass-edge-dispersion` maps directly
to `uChromatic`".

**On disk:** `--glass-edge-dispersion` (glass-fx.css:305-307) is a TWO-INSET-RING `box-shadow` value
(`inset 0.75px 0 0 0 var(--glass-fringe-warm), inset -0.75px 0 0 0 var(--glass-fringe-cool)`), consumed AS a `box-shadow`
at surfaces.css:417 (`.glass-chromatic { box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim) }`). A
box-shadow list cannot drive a shader float uniform `uChromatic` (target 0.20-0.30). WS8 must EITHER mint a new scalar
token (and the build-map's "→`uChromatic` token" label is a mis-spec) OR repurpose `--glass-edge-dispersion` as a scalar
(breaking the `.glass-chromatic` box-shadow consumer). The plan flags neither — a latent token-semantics collision in the
single most-watched (★★★) wave.

### F3 [MEDIUM] — D-2 paper-grain band-aid ↔ WS9 GRAIN-REAL: the demo-local warm substrate is not reconciled when WS9 warms the LIBRARY grain → double-warm.

**Waves:** live-fix `BG.W-PAPER-GRAIN-WARM-SUBSTRATE` (D-2) ↔ WS9 `BG.W-PAPER-GRAIN-REAL`.

D-2 (e40e5095) added a DEMO-LOCAL warm substrate BEHIND the gray library grain (`demo/stories/foundations/paper-glass.vue`,
`paper-texture.vue`, `story-hero.css`), explicitly "library grain utility BYTE-UNTOUCHED" (build-map line 944). Confirmed
on disk: `--paper-grain-tooth` (paper.css:44) is STILL the gray `feTurbulence` (`feColorMatrix saturate=0` + symmetric
R=G=B `feFuncR/G/B` = pure gray).

WS9 `BG.W-PAPER-GRAIN-REAL` (build-map line 697) REPLACES that gray speckle with a warm `feDiffuseLighting` LIT tooth in
the LIBRARY (`paper.css` `--paper-grain-tooth`, warm-hue floor ≥0.020). When WS9 lands, the demo panels carry BOTH the
D-2 warm substrate AND the now-warm grain → over-warm / double-tint on exactly the surfaces D-2 patched. NEITHER the WS9
build-map spec NOR EXECUTION-PROGRESS notes retiring/retuning the D-2 band-aid (grep for D-2/substrate/reconcile in the
WS9 rows = empty). The root-fix and the band-aid coexist with no hand-off.

### F4 [MEDIUM] — D-3 dock-collapse directional fix ↔ WS2 DOCK-MORPH-UNIFY: the unification rewrites the exact orchestrator the D-3 fix lives in, with no preservation note and a narrower gate set.

**Waves:** live-fix `BG.W-DOCK-COLLAPSE-DIR` (D-3) ↔ WS2 `BG.W-DOCK-MORPH-UNIFY` (row 4.1, PENDING).

D-3 (8947288a): the `--dock-live` SIZE scalar reads the DIRECTIONAL `--dock-expand-t` (not the raw `--dock-morph-t`) —
killing the 440px collapse-balloon reversal; `proof:dock-engine` E4 tightened to red-on-revert (build-map line 945). The
directional read lives in `dockMorphMeasure.ts:25` / `dockMorphContext.ts`.

WS2 `BG.W-DOCK-MORPH-UNIFY` consolidates 5 `SpringProgress` sites → ONE `useDockSpring`, "fold useLayerTransition →
orchestrator (measure-free)" (build-map line 220) — editing the EXACT `dockMorphContext.ts`/`dockMorphMeasure.ts` the D-3
fix lives in. WS2's per-wave gate (EXECUTION-PROGRESS row 4.1) is `proof:dock-orchestrator-single` (1 SpringProgress),
NOT `proof:dock-engine` E4 (the D-3 protector). No build-map note that the unification must preserve the directional
`--dock-expand-t` read. Risk: WS2 greens its narrow gate while silently regressing D-3; the protector only re-fires at
the cut's `--run full` (if E4 ∈ battery), not at WS2 build — a headless-green/visually-broken shaped gap on a fix that
was found live, invisible to device-free gates.

### F5 [LOW-MEDIUM] — WS3 GLASS-DYNAMICS "strengthens W-LENSING" then WS8 SOTA-LADDER deletes the lensing path — wasted-work / ambiguous-target risk.

**Waves:** WS3 `BG.W-GLASS-DYNAMICS` (Phase 3) ↔ WS8 `BG.W-GLASS-SUFFUSE-UNIVERSAL` (§1) + `BG.W-GLASS-SOTA-LADDER` (§4).

WS3 GLASS-DYNAMICS (build-map line 205, earlier in the DAG): "strengthen W-LENSING squircle refraction + NEUTRAL specular
hairline." WS8 §1 (line 617) RETIRES `proof:lensing`; WS8 §4 (lines 678-681) DELETES `.glass-lens` / `glass-refract.css`
(exists at `src/styles/glass-refract.css`) + `useSpecularPointer.ts`. So WS3 invests in the CSS-SVG lensing that WS8 then
supersedes (GL refraction) and retires. The plan does NOT disambiguate whether GLASS-DYNAMICS edits the to-be-deleted
`glass-refract.css`/`.glass-lens` (wasted) or only the surviving token / `useSpecularTracking` specular path. If the
former, WS8 clobbers WS3's strengthening.

### F6 [LOW] — Build-map names a wrong WGSL path `src/glassShader.wgsl` (actual: `src/composables/glass/webgpu/glassShader.wgsl`).

Build-map line 649 lists `src/glassShader.wgsl` as a WS8 §2 file; that path is ABSENT (the real file is under
`src/composables/glass/webgpu/`). Minor wrong-anchor/path reference — the seed's named friction class — that would send a
build agent groping for a non-existent file.

---

## CLEAN results (no conflict found — useful negatives for the baseline)

- **The seed's headline worry is CLEAN.** WS8's `uChromatic` refraction does NOT read the `--glass-blur-*` primitives G4
  carves: it is a GL shader sampling the shell-field FBO (`uField`), reading no CSS backdrop-filter token. WS8 §1's bevel
  reads `--glass-saturate-*` / `--glass-blur-deep` — both UNTOUCHED by the G4 retirement, which only retires the dead
  `--glass-blur-dock` chain (0 readers after BLUR-PEER landed: dock reads `--dock-surface-blur`→`--glass-blur-resting`).
  No later wave reaches for a dead pre-carve blur name.
- **The tint-family rename is coherent.** `--glass-ambient-hue/-strength` (liquid-morph.css:34-35, written by useBloomUp)
  → WS3 TINT-UNIFY `--glass-tint-bias-*`; `--glass-fill-tint` (glass-atom.css/icon-chip.css) folded by GLASS-CONSUMER-BAND;
  `--glass-plate-tinted` declared ONCE (ladder.css:67) by the LANDED GLASS-IDIOM-FACTOR and read at 7 sites — TINT-UNIFY
  (pending) composes onto it cleanly. The WS1+WS3 `useGlassBackdropLuminance.ts:448` double-edit is CORRECTLY flagged as
  needing ONE coordinated diff (build-map line 181-183) — a noted coordination requirement, not a gap.
- The G4 carve assertions are accurate against disk (ladder.css 527, dock/shell.css 510; both >500).

## Recurring friction classes touched by these findings

- **Wrong-uniform / wrong-anchor** (F1, F2, F6) — the SAME class the RESPEC G1 corrected, recurring one level up: the
  "ship operator" is a converge prototype, the "token" is the wrong CSS type, the file path is wrong.
- **Band-aid not reconciled with the root-fix** (F3) — a live-fix demo-local patch left to collide with the later
  library root-fix.
- **Narrow-gate-misses-regression / headless-green** (F4) — a wave rewrites the file a live-found fix lives in, gated only
  by a structural gate that can't see the directional-read regression.
- **Strengthen-then-delete wasted work** (F5) — an earlier wave invests in a mechanism a later wave retires.

## Open items for PASS 2 (deepen / confirm)

1. Confirm whether WS8 §2 actually intends to rewrite `glassShader.wgsl`'s `chromatic_aberration`→`uChromatic` (read the
   converge SPEC-pass4 + the M6 WGSL-shape gate) — does any gate fence the WGSL operator, or is F1 a true gap?
2. Read the actual `--glass-edge-dispersion` intended consumer in WS8 (the C17 calibration capture script) to see if a new
   scalar token is implicitly minted (resolving F2) or if the box-shadow token is genuinely repurposed.
3. Trace whether GLASS-DYNAMICS's edit set (Phase-3) touches `glass-refract.css`/`.glass-lens` (confirming/clearing F5).
4. Confirm `proof:dock-engine` E4's tag set (`[local,ci,release]`?) to size the F4 regression window (cut-only vs never).
