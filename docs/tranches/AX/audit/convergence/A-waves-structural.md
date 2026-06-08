# A-waves-structural — convergence audit of the structural/close/cross-repo waves

**Lane:** W25a/b · W26 · W27a/b · W28 · W29 · W33 · W34 · W35 · W41 + the D16 math-paper note.
**HEAD audited:** `f2fc614` ("fix(release-gates): unblock the 3.8.0 publish") — i.e. the 3.8.0
release commit. NOT the wave-spec anchor `eaba94f` and NOT the PROGRESS anchor `cdcf331`. The drift
between the spec baselines and live HEAD is the headline finding of this lane.

**Verdict (lane-level):** `audit-note`. All ten structural/close/cross-repo waves remain VALID and
born-RED at live HEAD — none is already-fixed, none needs re-scoping by deletion. BUT the post-session
god-module growth has opened a **net-new coverage gap** (two TS god-modules with no owning split wave)
and re-quantified every carry-forward upward. The fix direction is to AUGMENT the existing waves with
the corrected counts + assign the orphaned god-modules, not to mint a parallel wave set.

---

## 1. Live re-verification of every lane witness (the W00 cardinal "re-verify before acting")

Every wave in this lane was authored against `eaba94f`. The session then SHIPPED W00-W24 + bands and
the god-modules/comment-debris GREW. The witnesses do not just still hold — they hold HARDER.

### 1.1 W25a / W25b — CSS god-module gate + carves (VALID, counts grew)

`scripts/proof-no-god-module.mjs:47` STILL collects only `.ts`/`.vue` (`.css`-blind). `gates.mjs:336-339`
STILL tags `proof:no-god-module` `["local"]` only — confirmed ABSENT from `.github/workflows/ci.yml`
(`grep -c no-god-module ci.yml` → 0). The four CSS god-modules grew past their spec'd counts:

| file | spec (eaba94f) | LIVE (f2fc614) | owner |
|---|---|---|---|
| `tokens.css` | 1728 | **1835** | W25b |
| `dock.css` | 1227 | **1418** | W06 |
| `utilities.css` | 1119 | **1120** | W25b |
| `glass.css` | 691 | **750** | W25b (cohesion-not-length adjudication — NOT carved) |

W25a's two RED witnesses (gate `.css`-blind + local-only; dist `@source "../components"` deadlink)
both hold. The dist `@source` deadlink was NOT touched this session. **W25a/W25b are VALID and
born-RED; the only augment is the corrected line counts in their audit jsons.**

### 1.2 W26 — TS god-module + state encapsulation (VALID, but its single-file scope is now INSUFFICIENT)

`proof:no-god-module` (TS arm) now reports **THREE** `✗ OVER`, not the one the spec names:

```
690  ✗ OVER  src/components/custom/goo-blob/composables/useMetaballRenderer.ts   (spec: 569 → W26 owns split)
513  ✗ OVER  src/components/custom/dock/GlassDock.vue                            (spec: 476 warn-band → NO split owner)
510  ✗ OVER  src/components/custom/constellation/constellationField.ts           (spec: warn/absent → NO split owner)
```

W26's FileBounds **explicitly only touch `useMetaballRenderer.ts`** and explicitly route `GlassDock.vue`
to "the W01 dock rewrite owns the warn-band split." But:

- **GlassDock.vue is 513 now — OVER the 500 ceiling, no longer warn-band.** W01 is marked COMPLETE in
  PROGRESS and W01 only MODIFIES GlassDock.vue (removes the collapse VT call) — it does NOT decompose it.
  So when W25a flips the gate to `ci`, the TS arm REDs on GlassDock.vue and **no wave owns the split**.
- **constellationField.ts is 510 now — OVER the ceiling.** W17 OWNS the file but its FileBounds scope it
  to token-reads + the focal-node `warpStep`/`nearestNode` ADDITIONS (W17 GREW the file to 510). W37/W30
  only READ the seam. **No wave's FileBounds own the >500-line DECOMPOSITION of constellationField.ts.**

This is the concrete realization of the W25a/W26 staging contract going wrong: W25a turns the gate ON
(`["local","ci"]`), W26 clears ONE of three RED TS files, and two ship structurally-RED with no owner.
The five LATENT encapsulation traps W26 names (dock hand-sync 19/13, `if(!ctx)` falsy-coerce, speculative
`useOptionalDockLayerGroupContext` export, sidebar rAF island, keyboard version-counter) — all five still
present at HEAD (not re-verified line-by-line here, but the W26 spec's structural greps are unchanged-tree).
**W26 is VALID; the augment is to either widen W26's FileBounds to claim GlassDock.vue + constellationField.ts,
or assign them to W01/W17 follow-splits, before W25a's ci-flip lands.**

### 1.3 W27a / W27b — legacy gate-hardening + commentary sweep (VALID, GREW substantially)

`proof:no-legacy-commentary` is RED at HEAD with **6** barrel violations (spec named 3):
`src/api/index.ts:213,216,290,304` + `src/index.ts:130,173` — the W37 re-home (AX.W37) accreted new
`AX.W37`/`AX.W17` refs into both barrels this session. The full-tree census grew enormously:

| census | spec (eaba94f) | LIVE (f2fc614) |
|---|---|---|
| barrel refs (W27a) | 3 | **6** |
| `src/` tranche-letter refs (W27b) | 878 in 209 files | **1042 in 222 files** |
| `scripts/` refs (W27b) | 429 | **535** |

`proof:tag-parity` (W27a step 3) and `proof:no-dead-arbitrary` (W27a step 4) STILL do not exist
(`ls scripts/proof-tag-parity.mjs` / `proof-no-dead-arbitrary.mjs` → No such file). The 2 mis-tagged
legacy gates are STILL `["local"]` (`grep -c 'tags: ["local"]' gates.mjs` → 5). The carousel dead
`scale-[var(--scale-hover)]` instance is now EXCISED (line 73 is only a comment referencing it) —
consistent with W23 having landed; the W27a CLASS-sweep + guard gate is still needed. **W27a/W27b VALID
and born-RED; augment with the grown counts.**

### 1.4 W28 / W29 — speedtest native-first receive + repatriation-prune (VALID, unchanged)

- **W28:** speedtest STILL imports `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}`
  across App.vue/ResultStack.vue/ResultDetailSheet.vue/useRouteTransition.ts; muster STILL imports the
  three across **8** files. No `proof:repatriate-local` exists on either sibling, no native copies exist.
  The inv-16' native-first DAG has not run. **VALID, born-RED, unchanged.**
- **W29:** every repatriated family STILL ships on the full surface — `instrument-chassis` + `instrument-rail`
  + `metric-pill` dirs all PRESENT, `instrument-chassis` on the root barrel (`src/index.ts` → 1 match),
  `metric-pill` on the barrel. W29 dependsOn W28 (native-first), so it correctly cannot clear until the
  sibling sessions land. **VALID, born-RED, unchanged.**

### 1.5 W33 — close (VALID, witnesses hold; one improved)

- `proof:ax-final` does NOT exist; `FINAL.md` does NOT exist (PROGRESS.md DOES now exist — that leg of
  witness 1 is satisfied; the spec named all three absent, so PROGRESS is a partial improvement).
- The `proof-*.mjs`↔package.json meta-gate REDs on **11** orphans now (spec named 12) —
  `proof:deck-progress-rail` got registered (W24 landed), the rest persist:
  `proof:affordance-contrast`, `proof:composable-return-types`, `proof:consumers-static`,
  `proof:datatable-split`, `proof:dock-big-dock`, `proof:dock-controls-split`, `proof:frostshader-deleted`,
  `proof:glass-panel-tiers`, `proof:resolution-contract`, `proof:supports-post-task-wired`, `proof:theme-style`.
- **ci.yml drift (carry-forward, now QUANTIFIED):** **15** ci-tagged gates in `gates.mjs` are ABSENT from
  `.github/workflows/ci.yml` (spec said "14+"). The list:
  `proof:aurora-painterly-statistics`, `proof:aurora-noise-hash-equivalence`,
  `proof:constellation-substrate-single`, `proof:canvas2d-substrate`, `proof:resolve-canvas-color`,
  `proof:text-highlight`, `proof:constellation-field`, `proof:input-invalid-aria`, `proof:styling-hygiene`,
  `proof:dock-orchestrator-single`, `proof:dock-hold-contract`, `proof:dock-wrap-content-driven`,
  `proof:slider-two-only`, `proof:carousel-glass-atoms`, `proof:deck-progress-rail`. These are all the
  AX-band gates W00-W24 authored that never got a ci.yml step — W33's gate-fleet/ci-integration is the
  home. **VALID; augment the W33 close-fleet roster with the 15-gate ci.yml drift list + the 11 orphans.**

### 1.6 W34 / W35 — cross-constellation idiom + keyframes prune DAG (VALID, unchanged)

- **W34:** `coordination/CONSTELLATION.md` does NOT exist; the §16 directive is unrouted. The speedtest
  apple-spring census (the carry-forward routed here from W05) HOLDS — `../speedtest` carries live
  `var(--ease-apple-spring)` reads in `MeterColumn.vue:281,291,292` + `SpeedtestResults.vue:842`
  (the 3-read W05 census, still 3+ stale reads). **VALID, born-RED, unchanged.**
- **W35:** keyframes.js `EditorShell.vue` STILL imports `@mkbabb/glass-ui/header-ribbon`; no
  `proof:off-headerribbon` exists. W35 dependsOn W19/W20 (migrate-before-prune). **VALID, born-RED,
  unchanged.** (Not re-verified against the live keyframes tree this pass — the spec's live witness
  stands; flag for the sibling session.)

### 1.7 W41 — publisher cross-repo build supplier-edge (VALID, unchanged)

`build:watch` is STILL JS-only (`package.json:537` `vite build --watch`, no emit-types arm); the devDep
floors STILL drift below the peer ranges (peer keyframes `^2.2.0||^3.0.0||^4.0.0` vs devDep `^2.2.0`;
peer value.js `^0.10.0||^0.11.0` vs devDep `^0.10.0`); `proof:peer-conformance` is STILL an untagged
orphan (absent from `gates.mjs`). Note W27b step 5 ALSO claims the devDep-vs-peer RANGE parity — W41
and W27b BOTH touch this; the disjointness is W27b does the dev==peer RANGE restore, W41 does the
supplier-edge gates + the build:watch dts arm. **VALID, born-RED, unchanged; the W27b/W41 devDep overlap
is real and already documented in both specs.**

### 1.8 D16 — math-paper / latex-paper (already covered by D16.md → net-new W44)

`docs/tranches/AX/audit/convergence/D16.md` already exists and fully covers this with verdict
`net-new-wave` (suggest W44). The `../latex-paper` sibling is present (`@mkbabb/latex-paper@0.2.1`,
built dist). `demo/stories/compositions/math-paper.vue` is the hand-rolled Unicode-glyph mock. **I do
NOT re-author this — D16.md is authoritative; my lane note references it.**

---

## 2. The net-new coverage gap (the only finding that is not "augment with grown counts")

**Two TS god-modules over the 500 ceiling have NO owning split wave:**

1. **`GlassDock.vue` (513).** W01 (COMPLETE) modified it but did not decompose it; it crossed the
   ceiling post-session. W26 explicitly routes its split to "W01" — but W01 is done and never owned the
   split. **No owner.**
2. **`src/components/custom/constellation/constellationField.ts` (510).** W17 (COMPLETE) GREW it to 510
   via the focal-node/warp additions; W17's FileBounds are token-reads + `warpStep`/`nearestNode`, NOT a
   decomposition. W37/W30 only read the seam. **No owner.**

When W25a flips `proof:no-god-module` to `["local","ci"]`, the CI TS arm will RED on all three TS files,
W26 clears only the metaball, and these two ship structurally-RED into a gate that now runs in CI.

**Gestalt fix direction:** do NOT mint a third god-module wave. Two clean options, both AUGMENTS:

- **Widen W26's FileBounds** to claim the cohesive split of `GlassDock.vue` (extract the
  pointer/focus/density-attr orchestration into a `useDockChrome` colocated composable — GlassDock already
  delegates state to `useDockState` and morph to `useLayerTransition`, so the residual 513 is event-wiring
  + template that splits by concern) AND `constellationField.ts` (the file is a render-pass module:
  `readPalette` + the focal-node integrator + the paint passes split into a pure `constellationPaint.ts`
  leaf + the field-state/warp orchestrator, the same program-build/upload split W26 already does for the
  metaball). This keeps W26's "TS god-module + encapsulation" charter coherent — all three TS god-modules
  in one wave.
- **OR** assign a `constellationField.ts` split to W17 (the file's owner) and a `GlassDock.vue` split to
  the dock band, each as a tight follow-leg. Less clean (W17/W01 are COMPLETE), so the W26-widen is
  preferred.

Either way the assignment MUST land in a FileBounds before W25a's ci-flip, or the staging contract
(W25a turns on → W25b/W06/W26 clear) is violated on the TS arm.

---

## 3. Dedup ledger — how each item folds WITHOUT duplicating an existing wave

| item | disposition | fold target |
|---|---|---|
| CSS god-module gate `.css`-blind + local-only | augment counts | **W25a** (tokens 1728→1835, dock 1227→1418, glass 691→750) |
| dist `@source "../components"` deadlink | unchanged | **W25a** |
| CSS monolith carves | augment counts | **W25b** (+ W06 for dock) |
| metaball god-module 569→690 | augment count | **W26** |
| **GlassDock.vue 513 split (no owner)** | **NET-NEW gap → augment** | **W26 FileBounds widen** (or dock-band follow) |
| **constellationField.ts 510 split (no owner)** | **NET-NEW gap → augment** | **W26 FileBounds widen** (or W17 follow) |
| 5 latent encapsulation traps | unchanged | **W26** |
| barrel legacy refs 3→6 | augment count | **W27a** |
| `proof:tag-parity` + `proof:no-dead-arbitrary` authorship | unchanged | **W27a** |
| full-tree refs 878→1042 src, 429→535 scripts | augment count | **W27b** |
| Card stale-prop shim + scripts test-boundary | unchanged | **W27b** |
| devDep-vs-peer RANGE parity | unchanged (W27b/W41 split documented) | **W27b** (range) + **W41** (supplier-edge) |
| speedtest/muster native-first receive | unchanged | **W28** |
| repatriation/orphan prune | unchanged | **W29** |
| `proof:ax-final` + FINAL absent | unchanged (PROGRESS now exists) | **W33** |
| meta-gate orphans 12→11 | augment count | **W33** |
| **ci.yml drift 15 ci-tagged gates absent** | augment with explicit list | **W33** (gate-fleet/ci-integration) |
| CONSTELLATION.md + §16 + speedtest apple-spring census | unchanged | **W34** |
| keyframes prune DAG | unchanged | **W35** |
| build:watch dts + supplier-edge gates | unchanged | **W41** |
| math-paper/latex-paper | covered | **D16.md → net-new W44** |

---

## 4. Severity rationale

Lane verdict `audit-note` / `major`. All waves remain valid and born-RED — none is broken, so this is
not a blocker. But the two ownerless TS god-modules (§2) are a structural staging hazard that WILL red
CI the moment W25a lands, with no clearing wave — that is the one item that, left unaddressed, breaks
the W25a→W26 contract. It is an AUGMENT (widen W26's FileBounds), not a net-new wave, so it does not
warrant its own row in the wave set. The remaining items are pure count-corrections (the spec baselines
drifted ~30% upward across the session) that the orchestrator should refresh in each wave's audit json
at execution time per the W00 "re-verify before acting" ritual — which this note has now done.
